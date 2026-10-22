import { NextResponse } from "next/server";
import { checkBotId } from "botid/server";
import { checkForSpam } from "@/lib/spam-protection";
import { createFUBContact } from "@/lib/fub";
import { sendLeadAlertEmail, sendGuideEmail, sendAgentNewLead } from "@/lib/email";
import { signBrief } from "@/lib/brief-token";
import { quizSubmitSchema, validationMessage } from "@/lib/validation";

const LABEL: Record<string, Record<string, string>> = {
  useCase: {
    retire: "Retiring / semi-retiring",
    "second-home": "Second home / escape",
    rental: "Investment & rental income",
    relocate: "Full relocation",
  },
  setting: {
    beachfront: "Steps from the sand",
    walkable: "Walk to town",
    golf: "Golf & beach club",
    hillside: "Hillside with a view",
    offradar: "Quiet / off the radar",
  },
  vibe: {
    marina: "Marina & nightlife",
    resort: "Golf then beach club",
    artsy: "Art walk & farm-to-table",
    surf: "Surf and barefoot",
    private: "Total quiet",
  },
  homeType: {
    condo: "Lock-and-leave condo",
    villa: "Home / villa",
    estate: "Estate / trophy",
    branded: "Branded residence",
    land: "Land to build",
  },
  timeline: {
    "0-6": "Within 6 months",
    "6-12": "6–12 months",
    "12plus": "1–2 years",
    dreaming: "Just exploring",
  },
  buildStage: {
    presale: "Pre-construction",
    underConstruction: "Under construction",
    ready: "Move-in ready",
    any: "Open to any stage",
  },
  hoaTolerance: {
    low: "Lean — under ~$500/mo",
    medium: "Mid — up to ~$1,200/mo",
    high: "Doesn't care — wants the services",
    dontcare: "Not sure yet",
  },
  amenities: {
    branded: "Branded operator",
    spa: "Spa & wellness",
    golf: "Golf on site",
    marina: "Marina access",
    concierge: "Concierge & rental program",
    family: "Family facilities",
    pool: "Serious pool",
    gym: "Real fitness center",
  },
  whyNow: {
    winters: "Somewhere warm for the winters",
    stretch: "Money goes further than at home",
    family: "People they know already moved down",
    "use-it": "Wants somewhere they'd actually use",
    lifestyle: "The lifestyle — water, golf, outdoors",
    income: "It has to earn while empty",
    youtube: "Came from the YouTube videos",
    curious: "Curious what their money buys",
  },
  mustHaves: {
    gated: "Gated security",
    swimmable: "Swimmable beach",
    walkable: "Walkable to restaurants",
    golf: "Golf on site",
    rental: "Strong rental income",
    newBuild: "New construction",
    airport: "Close to airport",
    medical: "Medical care nearby",
  },
};

const money = (n?: number) =>
  n == null ? "?" : n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(1)}M` : `$${Math.round(n / 1000)}K`;

export async function POST(request: Request) {
  try {
    // This route emails whatever address it is given, so automated
    // traffic is turned away before anything is sent.
    const verdict = await checkBotId();
    if (verdict.isBot) {
      return NextResponse.json(
        { success: false, error: "We couldn't verify that request. Please refresh and try again." },
        { status: 403 }
      );
    }

    const body = await request.json();

    const spam = checkForSpam(request, body);
    if (!spam.ok) {
      console.warn(`[quiz] spam rejected (${spam.reason})`);
      return NextResponse.json({ success: true });
    }

    const parsed = quizSubmitSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: validationMessage(parsed.error) },
        { status: 400 }
      );
    }
    const { firstName, lastName, email, phone, quiz, matches } = parsed.data;

    /* A guide request is a lighter lead than a completed quiz: one community,
       no answers. It still goes through the same pipeline so nothing is lost. */
    const isGuide = parsed.data.leadType === "neighborhood-guide";
    const guideName = matches[0]?.name || "Los Cabos";

    const at = new Date().toISOString();
    const L = (k: string, v: unknown) => LABEL[k]?.[String(v)] || String(v ?? "n/a");
    const musts = quiz.mustHaves ?? [];

    const top = matches[0];
    const briefToken = signBrief({ firstName, lastName, email, phone, quiz, matches, at });
    const briefUrl = briefToken
      ? `https://quiz.livingincabo.com/brief/${briefToken}`
      : "(brief link unavailable: BRIEF_SECRET is not set in Vercel)";

    /* Built once and used by BOTH the Follow Up Boss note and the email to
       Aaron. They used to be written separately, which is how the email ended
       up thinner than the CRM note nobody reads first. */
    const amenityList = quiz.amenities ?? [];
    const answerRows: [string, string][] = [
      ["Why Cabo", L("useCase", quiz.useCase)],
      ["Budget", `${money(quiz.budgetMin)} – ${money(quiz.budgetMax)}`],
      ["Setting", L("setting", quiz.setting)],
      ["Vibe", L("vibe", quiz.vibe)],
      ["Home type", L("homeType", quiz.homeType)],
      ["Build stage", L("buildStage", quiz.buildStage)],
      ["Monthly carry", L("hoaTolerance", quiz.hoaTolerance)],
      [
        "Amenities",
        amenityList.length
          ? amenityList.map((x) => LABEL.amenities[x] || x).join(", ")
          : "none picked",
      ],
      [
        "Dealbreakers",
        musts.length ? musts.map((m) => LABEL.mustHaves[m] || m).join(", ") : "none given",
      ],
      ["Timeline", L("timeline", quiz.timeline)],
      ["Why now", L("whyNow", quiz.whyNow)],
    ];

    const note = [
      `NEIGHBORHOOD MATCH QUIZ — completed ${at}`,
      ``,
      top ? `TOP MATCH: ${top.name} (${top.score}%)` : `TOP MATCH: none scored`,
      matches.length > 1
        ? `THEN: ${matches.slice(1, 5).map((m) => `${m.name} ${m.score}%`).join(" · ")}`
        : ``,
      ``,
      `WHAT THEY TOLD US`,
      ...answerRows.map(([k, v]) => `  ${k.padEnd(15, ".")} ${v}`),
      `  Phone.......... ${phone || "not provided"}`,
      ``,
      `AGENT LEAD BRIEF (private link — how to open the call, why each match fit,`,
      `tradeoffs to raise, and a first text you can copy):`,
      briefUrl,
    ]
      .filter(Boolean)
      .join("\n");

    // Write the lead to FUB and send the guide email in parallel — the same
    // shape /api/submit uses. The results page promises the buyer an email,
    // so this route has to actually send one. Leaning on a FUB tag to fire an
    // Action Plan is exactly what silently dropped every guide lead before
    // 87400eb; don't reintroduce it here.
    //
    // Independent failure paths: if FUB errors the guide still goes out, if
    // Resend errors FUB still has the lead, and either failure alerts so a
    // broken send never vanishes silently.
    const [fub, delivery] = await Promise.all([
      createFUBContact({
        firstName,
        lastName,
        email,
        phone,
        source: isGuide
          ? `Neighborhood Guide — ${guideName}`
          : "Cabo Neighborhood Match Quiz",
        /* Tagged apart so Follow Up Boss can tell a guide request from a
           finished quiz. They are different intents: one asked about a
           specific place, the other doesn't know where they want to be. */
        tags: isGuide
          ? ["Lead Magnet", "Neighborhood Guide", guideName, "quiz.livingincabo.com"]
          : ["Lead Magnet", "Cabo Quiz", "quiz.livingincabo.com"],
        note,
      }),
      sendGuideEmail({ firstName, email }),
    ]);

    /* Tell Aaron a lead landed. This is the happy path, which previously
       notified nobody — the only agent mail was the FUB-failure alert. */
    const agent = await sendAgentNewLead({
      firstName, lastName, email, phone,
      answers: answerRows,
      matches: matches.slice(0, 5).map((m) => ({ name: m.name, score: m.score })),
      briefUrl,
      submittedAt: new Date(at).toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      }),
    });
    if (!agent.success && !agent.skipped) {
      console.error("[quiz] agent alert failed:", agent.error);
    }

    if (!fub.success && !fub.skipped) {
      console.error("[quiz] FUB failed:", fub.error);
      await sendLeadAlertEmail({
        leadType: "quiz",
        firstName,
        lastName,
        email,
        phone,
        detail: note,
        error: fub.error || "unknown",
      });
    }

    if (!delivery.success && !delivery.skipped) {
      console.error("[quiz] guide email failed:", delivery.error);
      await sendLeadAlertEmail({
        leadType: "quiz — guide email FAILED to send",
        firstName,
        lastName,
        email,
        phone,
        detail: note,
        error: delivery.error || "unknown",
      });
    }

    // The brief link is for the agent only; it is not echoed back to the browser.
    return NextResponse.json({ success: true, contactId: fub.contactId });
  } catch (error) {
    console.error("[quiz] error:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
