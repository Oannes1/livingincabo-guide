import { COMMUNITIES, type QuizCommunity } from "@/data/quiz-communities";

/* ------------------------------------------------------------------ */
/*  Cabo Neighborhood Match Engine                                     */
/*  Deterministic scoring over 40 curated communities. Hard            */
/*  dealbreakers filter first, then weighted preferences — the same    */
/*  shape as a mortgage underwriter, not a personality quiz.           */
/* ------------------------------------------------------------------ */

export interface Answers {
  useCase?: string;      // retire | second-home | rental | relocate
  budgetMin?: number;
  budgetMax?: number;
  setting?: string;      // walkable | beachfront | golf | hillside | offradar
  vibe?: string;         // marina | resort | artsy | surf | private
  homeType?: string;     // condo | villa | estate | land | branded
  mustHaves?: string[];  // gated swimmable walkable golf rental newBuild airport medical
  timeline?: string;
}

export interface Scored {
  c: QuizCommunity;
  score: number;
  reasons: string[];
  misses: string[];
}

const clamp = (n: number, lo = 0, hi = 100) => Math.max(lo, Math.min(hi, n));

/** Does the community's price band overlap what the buyer can spend? */
function budgetOverlap(c: QuizCommunity, min?: number, max?: number) {
  if (min == null || max == null) return 1;
  const [lo, hi] = c.price;
  if (hi < min * 0.85) return 0;          // everything here is below their range
  if (lo > max * 1.15) return 0;          // entry price is out of reach
  const overlap = Math.min(hi, max) - Math.max(lo, min);
  const span = Math.max(1, max - min);
  return clamp(overlap / span, 0.25, 1);  // partial overlap still counts
}

const MUST_HAVE_LABEL: Record<string, string> = {
  gated: "Gated with real security",
  swimmable: "A swimmable beach",
  walkable: "Walk to restaurants and shops",
  golf: "Golf on site",
  rental: "Strong short-term rental income",
  newBuild: "New construction",
  airport: "Close to the airport",
  medical: "Quality medical care nearby",
};

function satisfiesMustHave(c: QuizCommunity, m: string): boolean {
  switch (m) {
    case "gated": return !!c.attrs.gated;
    case "swimmable": return c.beach === "swimmable";
    case "walkable": return !!c.attrs.walkable;
    case "golf": return !!c.attrs.golf;
    case "rental": return !!c.attrs.strongRental;
    case "newBuild": return !!c.attrs.newBuild;
    case "airport": return c.airportMin <= 30;
    case "medical": return !!c.attrs.medical;
    default: return false;
  }
}

const SETTING_FIT: Record<string, (c: QuizCommunity) => number> = {
  walkable: (c) => (c.attrs.walkable ? 1 : c.attrs.marina ? 0.5 : 0),
  beachfront: (c) => (c.beach === "swimmable" ? 1 : c.attrs.beachfront ? 0.7 : 0.1),
  golf: (c) => (c.attrs.golf ? 1 : 0.1),
  hillside: (c) => (/hill|cliff|view|ridge|mountain/i.test(c.vibe + c.tagline) ? 1 : 0.3),
  offradar: (c) => (c.attrs.quiet ? 1 : /east cape|pacific/i.test(c.region) ? 0.8 : 0.15),
};

const VIBE_FIT: Record<string, (c: QuizCommunity) => number> = {
  marina: (c) => (c.attrs.marina || c.attrs.nightlife ? 1 : 0.2),
  resort: (c) => (c.attrs.golf && c.attrs.gated ? 1 : c.attrs.golf ? 0.75 : 0.2),
  artsy: (c) => (c.attrs.artsy ? 1 : 0.2),
  surf: (c) => (c.beach === "surf" || /surf/i.test(c.vibe) ? 1 : c.attrs.quiet ? 0.6 : 0.15),
  private: (c) => (c.attrs.quiet || c.attrs.gated ? 1 : 0.2),
};

const HOME_FIT = (c: QuizCommunity, want?: string) => {
  if (!want) return 0.5;
  const t = c.types.join(" ").toLowerCase();
  const map: Record<string, RegExp> = {
    condo: /condo|residence|apartment/,
    villa: /villa|single-family|home/,
    estate: /estate|mansion|custom home/,
    land: /lot|homesite|land/,
    branded: /branded|resort residence|hotel residence|private residence/,
  };
  return map[want]?.test(t) ? 1 : 0.35;
};

const USE_CASE_FIT = (c: QuizCommunity, want?: string) => {
  switch (want) {
    case "retire": return c.attrs.retiree ? 1 : 0.45;
    case "rental": return c.attrs.strongRental ? 1 : c.yieldMid > 55000 ? 0.7 : 0.3;
    case "relocate": return (c.attrs.medical ? 0.5 : 0.15) + (c.attrs.remoteWork ? 0.3 : 0.1) + (c.attrs.walkable ? 0.2 : 0.05);
    case "second-home": return c.attrs.gated || c.attrs.beachfront ? 0.9 : 0.5;
    default: return 0.5;
  }
};

export function matchCommunities(a: Answers): Scored[] {
  const musts = a.mustHaves ?? [];

  const scored = COMMUNITIES.map((c) => {
    const budget = budgetOverlap(c, a.budgetMin, a.budgetMax);

    // Hard dealbreakers are weighted first and hardest, like the buyer means it.
    const hit = musts.filter((m) => satisfiesMustHave(c, m));
    const mustScore = musts.length ? hit.length / musts.length : 1;

    const setting = a.setting ? (SETTING_FIT[a.setting]?.(c) ?? 0.4) : 0.5;
    const vibe = a.vibe ? (VIBE_FIT[a.vibe]?.(c) ?? 0.4) : 0.5;
    const home = HOME_FIT(c, a.homeType);
    const use = USE_CASE_FIT(c, a.useCase);

    const raw =
      budget * 26 +
      mustScore * 30 +
      setting * 16 +
      vibe * 12 +
      use * 10 +
      home * 6;

    // A community the buyer literally can't afford should never surface.
    // Cap at 98: this is a well-weighted heuristic, not omniscience, and a
    // "100% match" overstates what six questions can actually know.
    const score = budget === 0 ? 0 : Math.min(98, clamp(Math.round(raw)));

    const reasons: string[] = [];
    hit.forEach((m) => reasons.push(MUST_HAVE_LABEL[m]));
    if (budget >= 0.75) reasons.push("Priced inside your range");
    if (setting >= 0.9) reasons.push("Matches the setting you pictured");
    if (vibe >= 0.9) reasons.push("Fits how you want to spend your weekends");
    if (a.useCase === "rental" && c.attrs.strongRental && c.rental?.annualRevenue)
      reasons.push(`Rental income around ${c.rental.annualRevenue}/yr`);

    const misses = musts.filter((m) => !satisfiesMustHave(c, m)).map((m) => MUST_HAVE_LABEL[m]);

    return { c, score, reasons: reasons.slice(0, 4), misses };
  })
    .filter((s) => s.score > 0)
    .sort((x, y) => y.score - x.score || x.c.price[0] - y.c.price[0]);

  return scored;
}

/** Live "how many are still in play" counter, mirroring the Vegas match-check. */
export function inPlayCount(a: Answers): number {
  return matchCommunities(a).filter((s) => s.score >= 55).length;
}

export const MUST_HAVES = MUST_HAVE_LABEL;
