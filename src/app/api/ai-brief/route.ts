import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { matchCommunities, matchDevelopments, type Answers } from "@/lib/match";

/* ------------------------------------------------------------------ */
/*  Live AI match brief                                                */
/*                                                                     */
/*  Two-stage by design. The deterministic engine does the arithmetic  */
/*  (budget overlap, dealbreakers) and hands Claude a shortlist of      */
/*  real records. Claude does the judgement a formula can't: which of   */
/*  these actually suits this person, what they're trading away, and    */
/*  what to look at next. Claude never invents communities or numbers   */
/*  — it may only rank and explain the candidates it is given.          */
/* ------------------------------------------------------------------ */

export const maxDuration = 60;

const Brief = z.object({
  headline: z.string().describe("One sentence, second person, naming their strongest fit and why. No greeting."),
  readMe: z.string().describe("2-3 sentences of honest orientation: what their answers imply, including any tension between them."),
  ranked: z.array(z.object({
    slug: z.string().describe("Must be one of the candidate community slugs provided."),
    why: z.array(z.string()).min(2).max(4).describe("Concrete reasons tied to THIS buyer's answers and the record's real data."),
    tradeoff: z.string().describe("The most important honest downside for this specific buyer."),
    watchOut: z.string().describe("One thing to verify before making an offer here."),
  })).min(3).max(5),
  developments: z.array(z.object({
    slug: z.string().describe("Must be one of the candidate development slugs provided."),
    why: z.string().describe("One sentence on why this specific project fits them."),
  })).max(4),
  tension: z.string().describe("The clearest conflict in their answers, named plainly, or empty string if none."),
  nextStep: z.string().describe("One specific action for the next 7 days."),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const a = (body.answers ?? {}) as Answers;

    const communities = matchCommunities(a).slice(0, 10);
    const commSlugs = communities.map((c) => c.c.slug);
    const developments = matchDevelopments(a, commSlugs).slice(0, 8);

    if (!communities.length) {
      return NextResponse.json({ ok: false, error: "no-candidates" }, { status: 200 });
    }

    // No key configured → the UI falls back to deterministic copy. Never 500.
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({ ok: false, error: "ai-unconfigured" }, { status: 200 });
    }

    const candidateBlock = communities.map((s) => {
      const c = s.c;
      return [
        `SLUG: ${c.slug}`,
        `Name: ${c.name} (${c.region})`,
        `Engine score: ${s.score}`,
        `Price band: $${c.price[0].toLocaleString()}–$${c.price[1].toLocaleString()}`,
        `Beach: ${c.beachNote || c.beach}`,
        `Airport: ${c.airportMin} min`,
        `Vibe: ${c.vibe}`,
        `Gated: ${c.attrs.gated} | Golf: ${c.attrs.golf} | Walkable: ${c.attrs.walkable}`,
        c.rental?.annualRevenue ? `Rental gross/yr: ${c.rental.annualRevenue} (occupancy ${c.rental.occupancyRate ?? "n/a"})` : "",
        `Known tradeoffs: ${c.tradeoffs.join(" | ")}`,
        `Unmet must-haves for this buyer: ${s.misses.length ? s.misses.join(", ") : "none"}`,
      ].filter(Boolean).join("\n");
    }).join("\n\n");

    const devBlock = developments.map((s) => {
      const d = s.d;
      return [
        `SLUG: ${d.slug}`,
        `${d.name} — ${d.type} in ${d.community} (${d.region})`,
        `Status: ${d.status}${d.delivery ? ` | Delivery: ${d.delivery}` : ""}`,
        d.developer ? `Developer: ${d.developer}` : "",
        `Price: $${d.price[0].toLocaleString()}–$${d.price[1].toLocaleString()}`,
        d.hoa ? `HOA: ${d.hoa}` : "",
        `Amenities: ${d.amenities.slice(0, 6).join(", ")}`,
      ].filter(Boolean).join("\n");
    }).join("\n\n");

    const answersBlock = JSON.stringify(a, null, 2);

    const client = new Anthropic();

    const response = await client.messages.parse({
      model: "claude-opus-5",
      max_tokens: 8000,
      thinking: { type: "adaptive" },
      output_config: { effort: "medium", format: zodOutputFormat(Brief) },
      system: [
        {
          type: "text",
          text: `You advise buyers on Los Cabos real estate for Living in Cabo, in partnership with Ronival.

Your job: take a buyer's quiz answers and a shortlist of REAL candidate communities and developments, then produce an honest, specific match brief.

Hard rules:
- Only ever reference candidates from the list you are given. Never invent a community, development, price, HOA figure, or delivery date.
- Every number you cite must come from the candidate records verbatim.
- Be honest about downsides. A buyer who is told only good things does not trust you. Each ranked pick must carry a real tradeoff drawn from that record.
- If the buyer's answers conflict (e.g. wants walkable AND totally private; wants swimmable beach AND Pacific surf; budget too low for the amenities requested), name the tension plainly in the 'tension' field. That candour is the most valuable thing you produce.
- Write in second person, plainly, like a knowledgeable local friend. No hype, no "nestled", no "paradise", no exclamation marks.
- Do not greet the buyer or sign off. No "Hi" or "Best regards".`,
          cache_control: { type: "ephemeral" },
        },
      ],
      messages: [
        {
          role: "user",
          content: `BUYER'S QUIZ ANSWERS:
${answersBlock}

CANDIDATE COMMUNITIES (ranked by our scoring engine — you may reorder based on judgement):
${candidateBlock}

CANDIDATE DEVELOPMENTS (specific projects, may be pre-construction):
${devBlock || "(none in range)"}

Produce the match brief.`,
        },
      ],
    });

    if (!response.parsed_output) {
      return NextResponse.json({ ok: false, error: "parse-failed" }, { status: 200 });
    }

    return NextResponse.json({ ok: true, brief: response.parsed_output });
  } catch (err) {
    console.error("[ai-brief] error:", err);
    // Degrade to the deterministic results rather than breaking the quiz.
    return NextResponse.json({ ok: false, error: "ai-error" }, { status: 200 });
  }
}
