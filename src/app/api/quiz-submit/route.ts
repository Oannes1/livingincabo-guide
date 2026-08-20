import { NextResponse } from "next/server";
import { checkForSpam } from "@/lib/spam-protection";
import { createFUBContact } from "@/lib/fub";
import { sendLeadAlertEmail } from "@/lib/email";
import { signBrief } from "@/lib/brief-token";

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
    const body = await request.json();

    const spam = checkForSpam(request, body);
    if (!spam.ok) {
      console.warn(`[quiz] spam rejected (${spam.reason}) — email=${String(body.email || "")}`);
      return NextResponse.json({ success: true });
    }

    const firstName = String(body.firstName || "").trim();
    const lastName = String(body.lastName || "").trim();
    const email = String(body.email || "").trim().toLowerCase();
    const phone = String(body.phone || "").trim();
    const quiz = (body.quiz ?? {}) as Record<string, unknown>;
    const matches = (Array.isArray(body.matches) ? body.matches : []) as {
      slug: string; name: string; score: number;
    }[];

    if (!firstName || !email) {
      return NextResponse.json(
        { success: false, error: "First name and email are required." },
        { status: 400 }
      );
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const at = new Date().toISOString();
    const L = (k: string, v: unknown) => LABEL[k]?.[String(v)] || String(v ?? "n/a");
    const musts = Array.isArray(quiz.mustHaves) ? (quiz.mustHaves as string[]) : [];

    const top = matches[0];
    const briefToken = signBrief({ firstName, lastName, email, phone, quiz, matches, at });
    const briefUrl = `https://quiz.livingincabo.com/brief/${briefToken}`;

    const note = [
      `NEIGHBORHOOD MATCH QUIZ — completed ${at}`,
      ``,
      top ? `TOP MATCH: ${top.name} (${top.score}%)` : `TOP MATCH: none scored`,
      matches.length > 1
        ? `THEN: ${matches.slice(1, 5).map((m) => `${m.name} ${m.score}%`).join(" · ")}`
        : ``,
      ``,
      `WHAT THEY TOLD US`,
      `  Why Cabo ....... ${L("useCase", quiz.useCase)}`,
      `  Budget ......... ${money(quiz.budgetMin as number)} – ${money(quiz.budgetMax as number)}`,
      `  Setting ........ ${L("setting", quiz.setting)}`,
      `  Vibe ........... ${L("vibe", quiz.vibe)}`,
      `  Home type ...... ${L("homeType", quiz.homeType)}`,
      `  Dealbreakers ... ${musts.length ? musts.map((m) => LABEL.mustHaves[m] || m).join(", ") : "none given"}`,
      `  Timeline ....... ${L("timeline", quiz.timeline)}`,
      `  Phone .......... ${phone || "not provided"}`,
      ``,
      `AGENT LEAD BRIEF (private link — how to open the call, why each match fit,`,
      `tradeoffs to raise, and a first text you can copy):`,
      briefUrl,
    ]
      .filter(Boolean)
      .join("\n");

    const fub = await createFUBContact({
      firstName,
      lastName,
      email,
      phone,
      source: "Cabo Neighborhood Match Quiz",
      tags: ["Lead Magnet", "Cabo Quiz", "quiz.livingincabo.com"],
      note,
    });

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

    return NextResponse.json({ success: true, contactId: fub.contactId, briefUrl });
  } catch (error) {
    console.error("[quiz] error:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
