/* ------------------------------------------------------------------ */
/*  Quiz vibe tables                                                    */
/*                                                                      */
/*  Every answer maps to a key, and every key carries the panel that    */
/*  appears beside the question: an emoji, a headline, a line of copy,  */
/*  a background gradient, an accent, and — where it earns its place —  */
/*  a real Los Cabos photograph.                                        */
/*                                                                      */
/*  All imagery is ours, pulled from the main livingincabo.com library. */
/*  All copy is written for this quiz. Nothing here is borrowed.        */
/* ------------------------------------------------------------------ */

export interface Vibe {
  emoji: string;
  headline: string;
  line: string;
  gradient: string;
  accent: string;
  image?: string;
}

export type VibeTable = Record<string, Vibe>;

/* Brand-derived gradients. Cabo navy is the floor of all of them so the
   panel never fights the rest of the page; only the top end moves. */
const G = {
  deep: "linear-gradient(155deg, #061A2E 0%, #0A2540 100%)",
  sea: "linear-gradient(155deg, #0A2540 0%, #14566B 100%)",
  teal: "linear-gradient(155deg, #072435 0%, #17707E 100%)",
  gold: "linear-gradient(155deg, #0A2540 0%, #6B5326 100%)",
  dusk: "linear-gradient(155deg, #14213D 0%, #4A3468 100%)",
  sand: "linear-gradient(155deg, #0A2540 0%, #8A6A38 100%)",
} as const;

/* ---------------- Q1 · why Cabo ---------------- */
export const USE_CASE_VIBES: VibeTable = {
  retire: {
    emoji: "🌅",
    headline: "The long stay",
    line: "Winters you never have to shovel and a doctor twenty minutes away. We'll weight both.",
    gradient: G.gold,
    accent: "#E3C387",
  },
  "second-home": {
    emoji: "🏖️",
    headline: "Yours whenever you want it",
    line: "Lock the door, fly home, come back to it exactly as you left it.",
    gradient: G.sea,
    accent: "#6FD3E0",
  },
  rental: {
    emoji: "📈",
    headline: "Make it pay for itself",
    line: "Not every beautiful address rents well. We'll steer you to the ones that do.",
    gradient: G.teal,
    accent: "#5AD1B4",
  },
  relocate: {
    emoji: "✈️",
    headline: "All in",
    line: "Different question entirely — schools, internet, residency, real life. We'll go there.",
    gradient: G.dusk,
    accent: "#B9A7F0",
  },
  default: {
    emoji: "🧭",
    headline: "Let's find your Cabo",
    line: "Forty communities, eighty-two developments. We'll narrow it as you go.",
    gradient: G.deep,
    accent: "#8FA8BF",
  },
};

/* ---------------- Q2 · budget ---------------- */
export const BUDGET_VIBES: VibeTable = {
  entry: {
    emoji: "🔑",
    headline: "There's more here than people think",
    line: "El Tezal, Fonatur, the inland side of San José. Real homes, real neighbourhoods.",
    gradient: G.sea,
    accent: "#6FD3E0",
  },
  mid: {
    emoji: "🎯",
    headline: "The busiest part of the market",
    line: "The widest choice in Cabo sits right here — and the most competition for it.",
    gradient: G.teal,
    accent: "#5AD1B4",
  },
  upper: {
    emoji: "🌟",
    headline: "Now the gates open",
    line: "Golf communities, beach clubs, and the corridor addresses start coming into range.",
    gradient: G.gold,
    accent: "#E3C387",
  },
  luxury: {
    emoji: "🥂",
    headline: "The corridor is yours",
    line: "Palmilla, Querencia, Chileno Bay. Oceanfront stops being a stretch.",
    gradient: G.sand,
    accent: "#F0D7A6",
  },
  trophy: {
    emoji: "👑",
    headline: "Anything on the peninsula",
    line: "At this level it's not about price. It's about which twelve properties are worth seeing.",
    gradient: G.dusk,
    accent: "#D9C4F5",
  },
  open: {
    emoji: "🤑",
    headline: "No ceiling",
    line: "Then we judge on fit alone. Let's see what actually suits you.",
    gradient: G.deep,
    accent: "#8FA8BF",
  },
  default: {
    emoji: "💭",
    headline: "What's it worth to you?",
    line: "Be honest rather than optimistic — the shortlist gets sharper.",
    gradient: G.deep,
    accent: "#8FA8BF",
  },
};

/* ---------------- Q3 · setting (image reveal) ---------------- */
export const SETTING_VIBES: VibeTable = {
  beachfront: {
    emoji: "🌊",
    headline: "Sand out the front door",
    line: "Chileno, Palmilla, Santa María — the genuinely swimmable stretch of the peninsula.",
    gradient: G.sea,
    accent: "#6FD3E0",
    image: "/images/quiz/chileno-bay.jpg",
  },
  walkable: {
    emoji: "🚶",
    headline: "Everything on foot",
    line: "San José's old town — galleries, the Thursday art walk, dinner three blocks away.",
    gradient: G.sand,
    accent: "#F0D7A6",
    image: "/images/quiz/art-district.jpg",
  },
  golf: {
    emoji: "⛳",
    headline: "Inside the gates",
    line: "Fairways running to the water, beach club afterwards, somebody else handling the rest.",
    gradient: G.teal,
    accent: "#8ADFA0",
    image: "/images/quiz/el-dorado-golf.jpg",
  },
  hillside: {
    emoji: "🏔️",
    headline: "Up where the view is",
    line: "Pedregal and the hillsides above town — the whole bay from your terrace.",
    gradient: G.dusk,
    accent: "#C9B6F2",
    image: "/images/quiz/pedregal-cliffs.jpg",
  },
  offradar: {
    emoji: "🌵",
    headline: "Off the beaten track",
    line: "The East Cape and the quiet edges. Stars, space, and almost nobody.",
    gradient: G.gold,
    accent: "#E8B27E",
    image: "/images/quiz/zacatitos.jpg",
  },
  default: {
    emoji: "✨",
    headline: "Picture your Cabo",
    line: "Choose a setting and watch it come into focus.",
    gradient: G.deep,
    accent: "#8FA8BF",
    image: "/images/quiz/cabo-beach-aerial.jpg",
  },
};

/* ---------------- Q4 · perfect Saturday (image reveal) ---------------- */
export const VIBE_VIBES: VibeTable = {
  marina: {
    emoji: "🛥️",
    headline: "Marina life",
    line: "Boats out front, dinner on the water, and the night goes wherever it goes.",
    gradient: G.sea,
    accent: "#6FD3E0",
    image: "/images/quiz/marina-cabo.jpg",
  },
  resort: {
    emoji: "⛳",
    headline: "Golf, then the beach club",
    line: "Eighteen holes in the morning, a lounger and a menu by two.",
    gradient: G.teal,
    accent: "#8ADFA0",
    image: "/images/quiz/quivira.jpg",
  },
  artsy: {
    emoji: "🎨",
    headline: "Old town Saturday",
    line: "Cobblestones, farm-to-table, and a gallery you didn't mean to spend an hour in.",
    gradient: G.sand,
    accent: "#F0D7A6",
    image: "/images/quiz/san-jose-del-cabo.jpg",
  },
  surf: {
    emoji: "🏄",
    headline: "Dawn patrol",
    line: "Cerritos and Costa Azul. Board, tacos, barefoot until the sun goes.",
    gradient: G.gold,
    accent: "#E8B27E",
    image: "/images/quiz/cerritos-beach.jpg",
  },
  private: {
    emoji: "🔒",
    headline: "Nobody around",
    line: "Pool, book, and the sound of absolutely nothing.",
    gradient: G.dusk,
    accent: "#C9B6F2",
    image: "/images/quiz/pedregal-pool.jpg",
  },
  default: {
    emoji: "✨",
    headline: "How you'd actually spend it",
    line: "Answer honestly rather than aspirationally — the match gets better.",
    gradient: G.deep,
    accent: "#8FA8BF",
    image: "/images/quiz/east-cape.jpg",
  },
};

/* ---------------- Q7 · timeline ---------------- */
export const TIMELINE_VIBES: VibeTable = {
  "0-6": {
    emoji: "🔥",
    headline: "Then let's move",
    line: "Good inventory here goes quietly, before it ever hits a portal.",
    gradient: G.gold,
    accent: "#F0B27E",
  },
  "6-12": {
    emoji: "🌤️",
    headline: "That's the sweet spot",
    line: "Enough runway to walk it in person before you commit to anything.",
    gradient: G.sea,
    accent: "#6FD3E0",
  },
  "12plus": {
    emoji: "🗺️",
    headline: "The smart way to do it",
    line: "The buyers who do best down here started looking about a year out.",
    gradient: G.teal,
    accent: "#5AD1B4",
  },
  dreaming: {
    emoji: "🌙",
    headline: "Nothing wrong with that",
    line: "Half of Cabo started out as somebody's someday.",
    gradient: G.dusk,
    accent: "#C9B6F2",
  },
  default: {
    emoji: "⏳",
    headline: "So what's the plan?",
    line: "No wrong answer — it only changes how we pace things.",
    gradient: G.deep,
    accent: "#8FA8BF",
  },
};

/* Budget tier → vibe key. Kept here so QuizFlow doesn't carry the mapping. */
export function budgetKey(min?: number, max?: number): string {
  if (min == null || max == null) return "default";
  if (min === 0 && max >= 50_000_000) return "open";
  if (max <= 400_000) return "entry";
  if (max <= 700_000) return "mid";
  if (max <= 1_200_000) return "upper";
  if (max <= 3_000_000) return "luxury";
  return "trophy";
}

export function pickVibe(table: VibeTable, key?: string | null): Vibe {
  return (key && table[key]) || table.default;
}
