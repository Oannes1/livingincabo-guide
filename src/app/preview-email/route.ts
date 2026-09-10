import { buildGuideEmail } from "@/lib/email";

/** Dev-only. ?which=guide (default) or ?which=agent. */
export async function GET(request: Request) {
  const q = new URL(request.url).searchParams;
  const name = q.get("name") || "Dana";

  if (q.get("which") === "agent") {
    const mod = await import("@/lib/email");
    const rows: [string, string][] = [
      ["Top match", "San Jose del Cabo · 91%"],
      ["Timeline", "6–12 months"],
      ["Why now", "Somewhere warm for the winters"],
      ["Budget", "$700K – $1.2M"],
      ["Email", "dana.whitfield@example.com"],
      ["Phone", "not given yet"],
    ];
    void mod;
    const html = `<!doctype html><html><body style="margin:0;background:#F5F2ED;font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif">
<div style="max-width:520px;margin:0 auto;padding:24px 20px">
  <p style="margin:0 0 14px;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:#A8893D">Living In Cabo · New quiz lead</p>
  <div style="background:#0A2540;border-radius:14px;padding:22px">
    <p style="margin:0;color:#fff;font-size:22px;font-weight:600">Dana Whitfield</p>
    <p style="margin:6px 0 0;color:rgba(255,255,255,.62);font-size:14px">wants San Jose del Cabo · 91%</p>
  </div>
  <table style="width:100%;border-collapse:collapse;margin-top:8px">
    ${rows.map(([k,v])=>`<tr><td style="padding:11px 0;border-bottom:1px solid #E0D6CA;font-size:12px;color:#5A7491">${k}</td><td style="padding:11px 0;border-bottom:1px solid #E0D6CA;font-size:14px;color:#0A2540;text-align:right;font-weight:500">${v}</td></tr>`).join("")}
  </table>
  <a href="#" style="display:block;margin-top:20px;background:#C9A96E;color:#0A2540;text-decoration:none;text-align:center;padding:15px;border-radius:999px;font-weight:600;font-size:15px">Open the full brief</a>
  <p style="margin:14px 0 0;font-size:12px;color:#8BA3BD;text-align:center">Their answers, why each community matched, what to raise, and a first text you can copy.</p>
</div></body></html>`;
    return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
  }

  const { html } = buildGuideEmail(name);
  return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
}
