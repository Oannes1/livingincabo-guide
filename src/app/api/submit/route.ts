import { NextResponse } from "next/server";
import { checkForSpam } from "@/lib/spam-protection";
import { createFUBContact } from "@/lib/fub";

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

    const firstName = String(body.firstName || "").trim();
    const lastName = String(body.lastName || "").trim();
    const email = String(body.email || "").trim().toLowerCase();
    const phone = String(body.phone || "").trim();

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

    // Push to Follow Up Boss
    // FUB has an automation trigger on source="Buying Property in Mexico Guide"
    // that sends the PDF delivery email to the lead.
    const fubResult = await createFUBContact({
      firstName,
      lastName,
      email,
      phone,
      source: "Buying Property in Mexico Guide",
      tags: ["Lead Magnet", "Buying Guide PDF", "guide.livingincabo.com"],
      note: `Downloaded "Buying Property in Mexico Guide" from guide.livingincabo.com on ${new Date().toISOString()}. Phone: ${phone || "not provided"}.`,
    });

    if (!fubResult.success && !fubResult.skipped) {
      console.error("[submit] FUB failed:", fubResult.error);
      // Still return success to the user — we don't want to block lead delivery
      // The form shows a direct download link on success, so they still get the PDF
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
