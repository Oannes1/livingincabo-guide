import { buildGuideEmail } from "@/lib/email";

/** Dev-only. ?which=guide (default) | agent */
export async function GET(request: Request) {
  const q = new URL(request.url).searchParams;
  if (q.get("which") !== "agent") {
    const { html } = buildGuideEmail(q.get("name") || "Dana");
    return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
  }

  /* Renders through the real sendAgentNewLead path by stubbing Resend out:
     no key set in dev, so we rebuild the same markup the function sends. */
  const { renderAgentNewLead } = await import("@/lib/email");
  const html = renderAgentNewLead({
    firstName: "Dana", lastName: "Whitfield",
    email: "dana.whitfield@example.com", phone: "+1 555 0142",
    answers: [
      ["Why Cabo", "Retiring / semi-retiring"],
      ["Budget", "$700K – $1.2M"],
      ["Setting", "Walk to town"],
      ["Vibe", "Art walk & farm-to-table"],
      ["Home type", "Home / villa"],
      ["Build stage", "Move-in ready"],
      ["Monthly carry", "Mid — up to ~$1,200/mo"],
      ["Amenities", "Spa & wellness, Concierge & rental program"],
      ["Dealbreakers", "Gated with real security, Quality medical care nearby"],
      ["Timeline", "6–12 months"],
      ["Why now", "Somewhere warm for the winters"],
    ],
    matches: [
      { name: "San Jose del Cabo", score: 91 },
      { name: "Fonatur (Hotel Zone)", score: 86 },
      { name: "Puerto Los Cabos", score: 83 },
      { name: "Palmilla", score: 79 },
      { name: "El Tezal", score: 74 },
    ],
    briefUrl: "https://quiz.livingincabo.com/brief/…",
    submittedAt: "Sep 10, 2026, 12:40 PM",
  });
  return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
}
