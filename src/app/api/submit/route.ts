import { NextResponse } from "next/server";
import { checkForSpam } from "@/lib/spam-protection";
import { createFUBContact } from "@/lib/fub";
import { sendLeadAlertEmail } from "@/lib/email";

type LeadType = "buyer" | "buyer-quiz" | "seller";

const QUIZ_LABELS: Record<string, Record<string, string>> = {
  goal: {
    retire: "Retiring / semi-retiring",
    "second-home": "Second home / vacation",
    investment: "Investment & rental income",
    relocate: "Full relocation",
  },
  budget: {
    under400: "Under $400K",
    "400-700": "$400K–$700K",
    "700-1200": "$700K–$1.2M",
    "1200plus": "$1.2M+",
  },
  vibe: {
    marina: "Marina / downtown energy",
    resort: "Golf & resort communities",
    artsy: "San Jose art district charm",
    quiet: "East Cape / off the radar",
  },
  timeline: {
    "0-6": "Within 6 months",
    "6-12": "6–12 months",
    "12plus": "1–2 years",
    dreaming: "Just exploring",
  },
};

function describeQuiz(quiz: Record<string, string>): string {
  return (["goal", "budget", "vibe", "timeline"] as const)
    .map((k) => {
      const raw = String(quiz[k] || "");
      const label = QUIZ_LABELS[k]?.[raw] || raw || "n/a";
      return `${k}: ${label}`;
    })
    .join(" · ");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Spam check — honeypot + timing + rate limit only.
    // Gibberish detection on names was dropped because it false-positives
    // on legitimate short/consonant-heavy surnames.
    const spam = checkForSpam(request, body);

    if (!spam.ok) {
      console.warn(
        `[submit] spam rejected (${spam.reason}) — email=${String(
          body.email || ""
        )}`
      );
      // Return 200 to not reveal our spam logic to bots
      return NextResponse.json({ success: true });
    }

    const leadType: LeadType = ["buyer", "buyer-quiz", "seller"].includes(
      String(body.leadType)
    )
      ? (String(body.leadType) as LeadType)
      : "buyer";

    const firstName = String(body.firstName || "").trim();
    const lastName = String(body.lastName || "").trim();
    const email = String(body.email || "").trim().toLowerCase();
    const phone = String(body.phone || "").trim();
    const propertyLocation = String(body.propertyLocation || "").trim();
    const quiz =
      body.quiz && typeof body.quiz === "object"
        ? (body.quiz as Record<string, string>)
        : null;

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

    const stamp = new Date().toISOString();

    let source = "Buying Property in Mexico Guide";
    let tags = ["Lead Magnet", "Buying Guide PDF", "guide.livingincabo.com"];
    let note = `Downloaded "Buying Property in Mexico Guide" from guide.livingincabo.com on ${stamp}. Phone: ${phone || "not provided"}.`;

    if (leadType === "buyer-quiz") {
      tags = [...tags, "Cabo Buyer Quiz"];
      note = `Took the Cabo Buyer Quiz on guide.livingincabo.com on ${stamp}.\n${
        quiz ? describeQuiz(quiz) : "No answers recorded."
      }\nPhone: ${phone || "not provided"}. Guide PDF sent by email.`;
    } else if (leadType === "seller") {
      source = "Cabo Home Valuation Request";
      tags = ["Seller Lead", "Valuation Request", "guide.livingincabo.com"];
      note = `Requested a free home valuation on guide.livingincabo.com on ${stamp}.\nProperty location: ${
        propertyLocation || "not provided"
      }.\nPhone: ${phone || "not provided"}. Follow up within 48 hours.`;
    }

    // Follow Up Boss owns ALL lead email from here on. The tags written
    // below trigger FUB Automations, whose Action Plans send every message
    // — including the guide delivery — from Aaron's connected
    // ac@aaroncuha.com mailbox. Replies land in his inbox and every send is
    // logged on the contact timeline.
    //
    // The site no longer sends lead-facing mail itself. It used to go
    // through Resend, which silently delivered only to the Resend account
    // owner because no verified sending domain was configured, so real
    // leads never received the guide.
    const fubResult = await createFUBContact({
      firstName,
      lastName,
      email,
      phone,
      source,
      tags,
      note,
    });

    if (!fubResult.success && !fubResult.skipped) {
      console.error("[submit] FUB failed:", fubResult.error);
      // FUB is now the only delivery path, so a failure here means the lead
      // gets nothing. Alert the team out-of-band so it can be entered by hand.
      await sendLeadAlertEmail({
        leadType,
        firstName,
        lastName,
        email,
        phone,
        detail: note,
        error: fubResult.error || "unknown",
      });
    }

    return NextResponse.json({
      success: true,
      contactId: fubResult.contactId,
    });
  } catch (error) {
    console.error("[submit] error:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
