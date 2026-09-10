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
  quote: string;
  name: string;
  /** The Ronival agent they worked with, where the review names one. */
  agent?: string;
}

/** Verbatim from ronival.com/testimonials — real names, not composites. */
export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "The most amazing experience. I purchased my property from Ronival Real Estate. I connected with Humberto and he walked me through the real estate transaction with ease.",
    name: "Sharon Walters",
    agent: "Humberto",
  },
  {
    quote:
      "We can't say enough about Sergio at Ronival. We have had an exceptional relationship with him. He is responsive, knowledgeable, and supportive.",
    name: "Matt Nolan",
    agent: "Sergio",
  },
  {
    quote:
      "Cid knew the area so well and found us our new home in Mexico. We now call he and Carla family and friends.",
    name: "Faythe Arias",
    agent: "Cid",
  },
  {
    quote:
      "Amazing service, BEST one in all La Baja, love the YouTube Channel is very interesting.",
    name: "Mariana",
  },
  {
    quote:
      "Brent was great at showing me around the Cabo area including local restaurants, neighborhood amenities, and local beaches.",
    name: "David Willeumier",
    agent: "Brent",
  },
  {
    quote:
      "You and your company did a great job in all of the processes that need to be done to sell a house and in a very professional matter.",
    name: "Mike Cechovic",
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
