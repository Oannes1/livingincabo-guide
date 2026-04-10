/* ------------------------------------------------------------------ */
/*  Transactional Email via Resend                                     */
/*  https://resend.com/docs/api-reference/emails/send-email            */
/* ------------------------------------------------------------------ */

import { Resend } from "resend";

const PDF_URL =
  "https://guide.livingincabo.com/downloads/buying-property-in-mexico-guide.pdf";

const SITE_URL = "https://www.livingincabo.com";

export interface SendGuideEmailParams {
  firstName: string;
  email: string;
}

export interface SendGuideEmailResult {
  success: boolean;
  id?: string;
  skipped?: boolean;
  error?: string;
}

/**
 * Send the "Buying Property in Mexico Guide" delivery email.
 * Triggered from /api/submit immediately after the lead lands in FUB.
 */
export async function sendGuideEmail(
  params: SendGuideEmailParams
): Promise<SendGuideEmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[email] No RESEND_API_KEY — skipping guide email");
    return { success: true, skipped: true };
  }

  const fromAddress =
    process.env.EMAIL_FROM || "Living In Cabo <onboarding@resend.dev>";
  const replyTo = process.env.EMAIL_REPLY_TO || "aaron@livingincabo.com";

  const resend = new Resend(apiKey);
  const firstName = params.firstName?.trim() || "friend";

  const subject = "Your Buying Property in Mexico Guide (31 pages inside)";

  const { html, text } = buildGuideEmail(firstName);

  try {
    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: [params.email],
      replyTo,
      subject,
      html,
      text,
      tags: [
        { name: "source", value: "guide_livingincabo_com" },
        { name: "lead_magnet", value: "buying_property_mexico_guide" },
      ],
    });

    if (error) {
      console.error("[email] Resend error:", error);
      return { success: false, error: String(error.message || error) };
    }

    return { success: true, id: data?.id };
  } catch (err) {
    console.error("[email] send failed:", err);
    return { success: false, error: "Failed to send guide email" };
  }
}

function buildGuideEmail(firstName: string): { html: string; text: string } {
  const text = `Hi ${firstName},

Your copy of "Buying Property in Mexico — The Complete Guide" is ready.

Download it here:
${PDF_URL}

What's inside (31 pages):

- Can Americans and Canadians actually buy property in Mexico? (Yes — here's how.)
- The fideicomiso explained without the legal jargon
- The "restricted zone" — what it is and why it's not what you think
- The full buying process, step by step, with realistic timelines
- Closing costs broken down in dollars, not percentages
- 10 mistakes that cost buyers real money — and how to sidestep every one
- Cost of living numbers for 2026, not recycled 2019 blog stats
- The 5 regions of Los Cabos and which one actually fits you

Read it tonight. Don't skim it.

When you're ready to talk to someone who lives and works this market every
day, hit reply and we'll put you in front of the right Ronival agent for
your situation. No pressure, no spam — just a conversation.

— Aaron and the Living In Cabo team
${SITE_URL}

P.S. This guide pairs with every article at ${SITE_URL}/blog. If you
want a specific question answered, search the site or just reply to this
email.
`;

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Your Buying Property in Mexico Guide</title>
  </head>
  <body style="margin:0;padding:0;background:#F5F2ED;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#0A2540;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#F5F2ED;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:6px;overflow:hidden;box-shadow:0 2px 8px rgba(10,37,64,0.08);">
            <!-- Header -->
            <tr>
              <td style="background:#0A2540;padding:32px 40px;text-align:left;">
                <div style="color:#C9A96E;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:8px;">Living In Cabo · Buyer's Guide</div>
                <div style="color:#ffffff;font-family:Georgia,'Times New Roman',serif;font-size:28px;line-height:1.2;font-weight:600;">Your guide is ready.</div>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:36px 40px 8px 40px;font-size:16px;line-height:1.65;color:#1B3A5C;">
                <p style="margin:0 0 18px 0;">Hi ${escapeHtml(firstName)},</p>
                <p style="margin:0 0 18px 0;">Here's your copy of <strong>Buying Property in Mexico — The Complete Guide</strong>. 31 pages, zero fluff.</p>
              </td>
            </tr>

            <!-- CTA -->
            <tr>
              <td align="center" style="padding:12px 40px 28px 40px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="background:#C9A96E;border-radius:4px;">
                      <a href="${PDF_URL}" style="display:inline-block;padding:16px 32px;font-size:16px;font-weight:700;color:#0A2540;text-decoration:none;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
                        Download the Guide (PDF)
                      </a>
                    </td>
                  </tr>
                </table>
                <div style="font-size:12px;color:#5A7A9A;margin-top:12px;">31 pages · PDF · Save it to your phone</div>
              </td>
            </tr>

            <!-- What's inside -->
            <tr>
              <td style="padding:8px 40px 24px 40px;font-size:15px;line-height:1.7;color:#1B3A5C;">
                <div style="color:#A8893D;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:12px;">What's inside</div>
                <ul style="margin:0;padding:0 0 0 20px;">
                  <li style="margin-bottom:8px;">Can Americans &amp; Canadians actually buy in Mexico? (Yes — here's how.)</li>
                  <li style="margin-bottom:8px;">The fideicomiso explained without the legal jargon</li>
                  <li style="margin-bottom:8px;">The &ldquo;restricted zone&rdquo; — what it really is</li>
                  <li style="margin-bottom:8px;">Full buying process, step by step, with realistic timelines</li>
                  <li style="margin-bottom:8px;">Closing costs in dollars, not percentages</li>
                  <li style="margin-bottom:8px;">10 expensive mistakes — and how to sidestep every one</li>
                  <li style="margin-bottom:8px;">2026 cost-of-living numbers (not recycled 2019 stats)</li>
                  <li style="margin-bottom:0;">The 5 regions of Los Cabos and which one actually fits you</li>
                </ul>
              </td>
            </tr>

            <!-- Divider -->
            <tr>
              <td style="padding:0 40px;">
                <div style="border-top:1px solid #E0D6CA;"></div>
              </td>
            </tr>

            <!-- Soft CTA -->
            <tr>
              <td style="padding:24px 40px 32px 40px;font-size:15px;line-height:1.65;color:#1B3A5C;">
                <p style="margin:0 0 14px 0;">Read it tonight. Don't skim it.</p>
                <p style="margin:0 0 14px 0;">When you're ready to talk to someone who lives and works this market every day, just hit reply. We'll put you in front of the right Ronival agent for your situation — no pressure, no spam, just a conversation.</p>
                <p style="margin:18px 0 0 0;">— Aaron and the Living In Cabo team</p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:#04111F;padding:24px 40px;text-align:center;">
                <a href="${SITE_URL}" style="color:#C9A96E;font-size:13px;text-decoration:none;font-weight:700;letter-spacing:1px;">LIVINGINCABO.COM</a>
                <div style="color:#5A7A9A;font-size:11px;margin-top:10px;line-height:1.6;">
                  You received this because you requested the guide at guide.livingincabo.com.<br />
                  Reply to unsubscribe or just tell us to get lost — we'll take the hint.
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return { html, text };
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
