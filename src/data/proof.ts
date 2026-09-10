/* ------------------------------------------------------------------ */
/*  Proof                                                              */
/*                                                                     */
/*  Every claim on the landing page lives here with its source, so no  */
/*  number ever reaches a buyer without one. Invented social proof —   */
/*  ghost logos, round subscriber counts, unattributed five-star       */
/*  quotes — is the fastest way to read as a template. Everything      */
/*  below is real and attributable.                                    */
/*                                                                     */
/*  VERIFY BEFORE A PAID CAMPAIGN: the "two of every three             */
/*  transactions" figure is Ronival's own claim on ronival.com/about-us*/
/*  and is the biggest number on the page. Confirm it is current.      */
/* ------------------------------------------------------------------ */

export interface Testimonial {
  /** Trimmed to fit in a glance; the full text is on ronival.com/testimonials. */
  quote: string;
  name: string;
  /** Buyer, seller or guest, as the review makes clear. Never name-only. */
  role: string;
  agent?: string;
}

/** From ronival.com/testimonials — real names, lightly trimmed to fit, never composites. */
export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "The most amazing experience. Humberto walked me through the real estate transaction with ease.",
    name: "Sharon Walters", role: "bought through Ronival", agent: "Humberto",
  },
  {
    quote: "We can't say enough about Sergio at Ronival. Responsive, knowledgeable, and supportive.",
    name: "Matt Nolan", role: "buyer", agent: "Sergio",
  },
  {
    quote: "Cid knew the area so well and found us our new home in Mexico. We now call them family.",
    name: "Faythe Arias", role: "bought a home in Cabo", agent: "Cid",
  },
  {
    quote: "Amazing service, the best one in all La Baja. Love the YouTube channel.",
    name: "Mariana", role: "client",
  },
  {
    quote: "Brent showed me the whole Cabo area: local restaurants, neighborhood amenities, the beaches.",
    name: "David Willeumier", role: "buyer", agent: "Brent",
  },
  {
    quote: "You did a great job in every step of selling a house, and in a very professional manner.",
    name: "Mike Cechovic", role: "sold through Ronival",
  },
];

export interface ProofStat {
  figure: string;
  label: string;
  /** Where this came from. Shown in the code, not on the page. */
  source: string;
}

export const CREDENTIALS: ProofStat[] = [
  {
    figure: "2 of 3",
    label: "Los Cabos transactions handled by Ronival",
    source: "ronival.com/about-us",
  },
  {
    figure: "10",
    label: "HGTV episodes — Mexico Life and Beachfront Bargain Hunt",
    source: "ronival.com — 8 Mexico Life + 2 Beachfront Bargain Hunt",
  },
  {
    figure: "2010",
    label: "Selling Baja since",
    source: "ronival.com/about-us — founded by Nick Fong",
  },
];

/** Named outlets only. No ghost logos. */
export const PRESS = ["FOX News", "USA Today", "Benzinga", "Digital Journal"];

/** Our own dataset — the part nobody else can claim. */
export const DATASET: ProofStat[] = [
  { figure: "40", label: "communities scored", source: "src/data/quiz-communities.ts" },
  { figure: "82", label: "developments tracked", source: "src/data/quiz-developments.ts" },
  { figure: "33", label: "still pre-construction", source: "derived from developments" },
];

/**
 * Live market context. Gives the buyer a reason to act now that is true,
 * rather than a fake countdown.
 */
export const MARKET = [
  { figure: "$1.59B", label: "Baja California Sur sales volume, 2025" },
  { figure: "+12%", label: "year over year" },
  { figure: "5–6 mo", label: "average time on market" },
  { figure: "22–45 mo", label: "inventory, depending on price band" },
  { figure: "6–7%", label: "typical gap between list and sale price" },
  { figure: "2–4 mo", label: "to close once a fideicomiso is involved" },
];
