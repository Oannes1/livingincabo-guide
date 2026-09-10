import { NextResponse } from "next/server";

/* ------------------------------------------------------------------ */
/*  Quiz event collector                                               */
/*                                                                     */
/*  Writes one structured line per event to the Vercel runtime log.    */
/*  That is deliberately the cheapest thing that works: it needs no    */
/*  database, survives third-party blockers, and the funnel can be     */
/*  rebuilt with a log query filtered on [quiz-ev].                    */
/*                                                                     */
/*  When volume justifies it this is the single place to swap in a     */
/*  real store — nothing upstream changes.                             */
/* ------------------------------------------------------------------ */

/** Events the client is allowed to record. Anything else is dropped. */
const ALLOWED = new Set([
  "quiz_start", "question_view", "question_answer", "question_back",
  "contradiction_shown", "contradiction_resolved",
  "scoring_started", "result_view",
  "gate_view", "gate_submit", "gate_error",
  "guide_offer_view", "guide_offer_accept", "phone_captured",
  "share_click", "quiz_abandon",
]);

/** Never log anything that could carry a lead's identity. */
const PII = new Set(["email", "phone", "firstName", "lastName", "name"]);

const MAX_BODY = 4_000;

export async function POST(request: Request) {
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY) {
      return NextResponse.json({ ok: true });
    }

    const body = JSON.parse(raw) as Record<string, unknown>;
    const event = String(body.event || "");
    if (!ALLOWED.has(event)) {
      return NextResponse.json({ ok: true });
    }

    const clean: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(body)) {
      if (PII.has(k)) continue;
      if (v === undefined || v === null) continue;
      if (typeof v === "object") continue;
      clean[k] = typeof v === "string" ? v.slice(0, 120) : v;
    }

    // One line, one event, greppable.
    console.log(`[quiz-ev] ${JSON.stringify(clean)}`);

    return NextResponse.json({ ok: true });
  } catch {
    // Instrumentation must never surface an error to the buyer.
    return NextResponse.json({ ok: true });
  }
}
