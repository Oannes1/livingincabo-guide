import { COMMUNITIES, type QuizCommunity } from "@/data/quiz-communities";
import type { Answers } from "./match";

/* ------------------------------------------------------------------ */
/*  The contradiction engine                                           */
/*                                                                     */
/*  When a buyer asks for two things Los Cabos cannot give them at     */
/*  once, we say so on the spot and make them choose. No competitor    */
/*  does this, because none of them know the market well enough to be  */
/*  sure. We do.                                                       */
/*                                                                     */
/*  Design rule: a rule never hardcodes "0 communities". It declares   */
/*  the two predicates and the live count is computed against the      */
/*  current data. If we enrich a community tomorrow and the conflict   */
/*  stops being real, the callout disappears on its own instead of     */
/*  telling a buyer something false.                                   */
/* ------------------------------------------------------------------ */

type Pred = (c: QuizCommunity) => boolean;

const attr = (k: string): Pred => (c) => !!c.attrs[k];
const beachIs = (b: string): Pred => (c) => c.beach === b;

export interface ContradictionRule {
  id: string;
  /** Is this pair of wants active, given what they've told us? */
  active: (a: Answers) => boolean;
  /** The two things that fight. */
  a: { label: string; pred: Pred };
  b: { label: string; pred: Pred };
  /** Aaron's line. `n` is the live count of communities doing both. */
  say: (n: number) => string;
  /** What we offer them: give up one, gain the other. */
  choose: { keepA: string; keepB: string };
}

const has = (list: string[] | undefined, v: string) => !!list?.includes(v);

export const RULES: ContradictionRule[] = [
  {
    id: "golf-walkable",
    active: (a) => has(a.mustHaves, "golf") && (a.setting === "walkable" || has(a.mustHaves, "walkable")),
    a: { label: "golf on site", pred: attr("golf") },
    b: { label: "walking to town", pred: attr("walkable") },
    say: () =>
      "Here's an honest one. Cabo's golf communities were built out on the corridor, and the walkable towns were built long before anyone thought about fairways. There is nowhere that does both.",
    choose: { keepA: "Keep the golf", keepB: "Keep the walkability" },
  },
  {
    id: "quiet-walkable",
    active: (a) => a.vibe === "private" && (a.setting === "walkable" || has(a.mustHaves, "walkable")),
    a: { label: "total quiet", pred: attr("quiet") },
    b: { label: "walking to dinner", pred: attr("walkable") },
    say: (n) =>
      `You've asked for total quiet and for dinner within walking distance. In Cabo those pull hard against each other — ${
        n === 0 ? "nowhere manages both" : `only ${n} of our 40 come close`
      }. Worth deciding which one you'd actually miss more.`,
    choose: { keepA: "Quiet matters more", keepB: "Walkability matters more" },
  },
  {
    id: "quiet-nightlife",
    active: (a) => a.vibe === "private" && (a.setting === "walkable" || has(a.amenities, "marina")),
    a: { label: "quiet", pred: attr("quiet") },
    b: { label: "nightlife on the doorstep", pred: attr("nightlife") },
    say: () =>
      "Quiet and nightlife are the two ends of the same street here. Nothing sits in the middle.",
    choose: { keepA: "I want the quiet", keepB: "I want the buzz" },
  },
  {
    id: "gated-walkable",
    active: (a) => has(a.mustHaves, "gated") && (a.setting === "walkable" || has(a.mustHaves, "walkable")),
    a: { label: "a real gate", pred: attr("gated") },
    b: { label: "walkability", pred: attr("walkable") },
    say: (n) =>
      `Gates and sidewalks rarely coexist in Cabo — a guard house usually means you drive everywhere. ${
        n === 0 ? "Nowhere does both." : `Only ${n} of the 40 manage both, and they're worth talking about specifically.`
      }`,
    choose: { keepA: "Security first", keepB: "Walkability first" },
  },
  {
    id: "gated-artsy",
    active: (a) => has(a.mustHaves, "gated") && a.vibe === "artsy",
    a: { label: "guard-gated", pred: attr("gated") },
    b: { label: "the art-district life", pred: attr("artsy") },
    say: () =>
      "The art district is San José's old town — galleries, cobblestones, open streets. That's the opposite of a guarded gate, and no community here offers both.",
    choose: { keepA: "Keep the gate", keepB: "Keep the old town" },
  },
  {
    id: "quiet-rental",
    active: (a) => a.vibe === "private" && (has(a.mustHaves, "rental") || a.useCase === "rental"),
    a: { label: "genuine quiet", pred: attr("quiet") },
    b: { label: "strong rental income", pred: attr("strongRental") },
    say: (n) =>
      `The places that rent hardest are the places people want to be around other people. ${
        n === 0 ? "Nothing here is both quiet and a strong rental." : `Only ${n} community is both.`
      } If the income matters more, we should look somewhere livelier.`,
    choose: { keepA: "Quiet — it's for us", keepB: "Income — it's an investment" },
  },
  {
    id: "quiet-medical",
    active: (a) => a.vibe === "private" && has(a.mustHaves, "medical"),
    a: { label: "off the radar", pred: attr("quiet") },
    b: { label: "medical care nearby", pred: attr("medical") },
    say: () =>
      "The hospitals are in the two towns. Every genuinely quiet spot in Cabo puts you a real drive from one — which is fine at 55 and a serious question at 75.",
    choose: { keepA: "I'll take the drive", keepB: "Medical access wins" },
  },
  {
    id: "quiet-swimmable",
    active: (a) => a.vibe === "private" && has(a.mustHaves, "swimmable"),
    a: { label: "solitude", pred: attr("quiet") },
    b: { label: "a swimmable beach", pred: beachIs("swimmable") },
    say: () =>
      "Only a handful of Cabo beaches are genuinely swimmable, and that's exactly why none of them are quiet. The empty beaches are empty because you can't get in the water.",
    choose: { keepA: "Solitude", keepB: "Swimmable water" },
  },
  {
    id: "newbuild-walkable",
    active: (a) => has(a.mustHaves, "newBuild") && (a.setting === "walkable" || has(a.mustHaves, "walkable")),
    a: { label: "new construction", pred: attr("newBuild") },
    b: { label: "a walkable neighbourhood", pred: attr("walkable") },
    say: (n) =>
      `The walkable parts of Cabo were finished decades ago; the new construction is going up where there was nothing. ${
        n === 0 ? "Nowhere is both." : `${n} places straddle it.`
      }`,
    choose: { keepA: "New build", keepB: "Walkable" },
  },
  {
    id: "surf-gated",
    active: (a) => a.vibe === "surf" && has(a.mustHaves, "gated"),
    a: { label: "surf out front", pred: beachIs("surf") },
    b: { label: "a gated community", pred: attr("gated") },
    say: (n) =>
      `Surf breaks and guard gates mostly don't overlap here — ${n} of the 40 do both. Worth knowing before you fall for one.`,
    choose: { keepA: "The surf", keepB: "The gate" },
  },
];

export interface Contradiction {
  id: string;
  count: number;
  message: string;
  keepA: string;
  keepB: string;
  labelA: string;
  labelB: string;
}

/** How many communities genuinely satisfy both halves of a rule. */
export function pairCount(rule: ContradictionRule): number {
  return COMMUNITIES.filter((c) => rule.a.pred(c) && rule.b.pred(c)).length;
}

/**
 * The sharpest live contradiction, or null.
 *
 * Only fires at 3 or fewer — above that the tension is real but survivable
 * and calling it out would be crying wolf. `skip` carries ids the buyer has
 * already answered so we never nag twice.
 */
export function findContradiction(a: Answers, skip: string[] = []): Contradiction | null {
  let best: Contradiction | null = null;

  for (const rule of RULES) {
    if (skip.includes(rule.id)) continue;
    if (!rule.active(a)) continue;

    const count = pairCount(rule);
    if (count > 3) continue;

    const found: Contradiction = {
      id: rule.id,
      count,
      message: rule.say(count),
      keepA: rule.choose.keepA,
      keepB: rule.choose.keepB,
      labelA: rule.a.label,
      labelB: rule.b.label,
    };
    // Fewest options = sharpest conflict = the one worth raising.
    if (!best || count < best.count) best = found;
  }

  return best;
}
