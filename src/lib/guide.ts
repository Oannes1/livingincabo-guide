import { COMMUNITIES, type QuizCommunity } from "@/data/quiz-communities";
import { DEVELOPMENTS, type QuizDevelopment } from "@/data/quiz-developments";

/* ------------------------------------------------------------------ */
/*  Neighbourhood guides                                               */
/*                                                                     */
/*  One page per community, built from the same records the quiz       */
/*  scores against — so a guide can never drift from the shortlist     */
/*  that recommended it.                                               */
/*                                                                     */
/*  Everything here is derived, never invented. Where we do not hold   */
/*  a fact we say nothing rather than filling the space, because a     */
/*  guide that pads is a guide nobody trusts on the second read.       */
/* ------------------------------------------------------------------ */

export const money = (n: number) =>
  n >= 1_000_000
    ? `$${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}M`
    : `$${Math.round(n / 1000)}K`;

export const BEACH_COPY: Record<string, string> = {
  swimmable: "Swimmable",
  surf: "Surf break, not for swimming",
  variable: "Varies by season",
  none: "No beach on site",
};

export function communityBySlug(slug: string): QuizCommunity | undefined {
  return COMMUNITIES.find((c) => c.slug === slug);
}

export function developmentsIn(slug: string): QuizDevelopment[] {
  return DEVELOPMENTS.filter((d) => d.community === slug);
}

/** Communities in the same region, nearest price band first. */
export function neighboursOf(c: QuizCommunity, n = 3): QuizCommunity[] {
  const mid = (x: QuizCommunity) => (x.price[0] + x.price[1]) / 2;
  return COMMUNITIES.filter((x) => x.slug !== c.slug && x.region === c.region)
    .sort((a, b) => Math.abs(mid(a) - mid(c)) - Math.abs(mid(b) - mid(c)))
    .slice(0, n);
}

export interface Verdict { suits: string[]; doesNot: string[] }

/**
 * Who this place is for, and who it isn't.
 *
 * Derived strictly from flags we hold. The negative column is the point:
 * every guide on the internet tells you who a place suits, and almost none
 * will tell you who should walk away.
 */
export function verdictFor(c: QuizCommunity): Verdict {
  const a = c.attrs;
  const suits: string[] = [];
  const doesNot: string[] = [];

  if (a.gated) suits.push("You want a gate and a guard, and you're happy to drive to dinner");
  if (a.walkable) suits.push("You'd rather walk to dinner than drive to it");
  if (a.golf) suits.push("Golf is part of the week, not an occasional outing");
  if (a.marina) suits.push("Boats, water access and the marina scene matter to you");
  if (a.quiet) suits.push("You're after genuine quiet and you'll trade convenience for it");
  if (a.artsy) suits.push("Galleries, old-town streets and farm-to-table are your Saturday");
  if (c.beach === "swimmable") suits.push("You actually want to swim, not just look at the water");
  if (a.strongRental) suits.push("It needs to earn while you're not in it");
  if (a.retiree) suits.push("You're retiring or semi-retiring and want an established community");
  if (a.family) suits.push("Children or grandchildren will be here regularly");

  if (!a.walkable) doesNot.push("You don't want to depend on a car for every errand");
  if (!a.gated) doesNot.push("A manned gate is non-negotiable for you");
  if (c.beach === "surf") doesNot.push("You picture swimming off the beach — this is a surf break");
  if (c.beach === "none") doesNot.push("You want sand at the end of the street");
  if (!a.strongRental) doesNot.push("The rental income has to carry the purchase");
  if (c.airportMin > 40) doesNot.push(`You'll fly in often — the airport is ${c.airportMin} minutes away`);
  if (!a.medical) doesNot.push("Being minutes from a hospital is a requirement, not a preference");
  if (a.nightlife) doesNot.push("You're looking for somewhere quiet in the evenings");

  return { suits: suits.slice(0, 5), doesNot: doesNot.slice(0, 4) };
}

/** The one-line honest summary used in the index and in metadata. */
export function summaryFor(c: QuizCommunity): string {
  const band = `${money(c.price[0])}–${money(c.price[1])}`;
  return `${c.tagline}. ${band}, ${c.airportMin} minutes from the airport, ${BEACH_COPY[c.beach].toLowerCase()}.`;
}

export const ALL_SLUGS = COMMUNITIES.map((c) => c.slug);
