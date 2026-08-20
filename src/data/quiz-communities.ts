// AUTO-GENERATED from livingincabo.com src/data/communities.ts — do not hand-edit.
// Regenerate with scripts/gen-quiz-data.js
export type Beach = "swimmable" | "surf" | "variable" | "none";
export interface QuizCommunity {
  slug: string; name: string; region: string; tagline: string; vibe: string;
  image: string; coords: { lat: number; lng: number }; price: [number, number];
  airportMin: number; beach: Beach; attrs: Record<string, boolean>;
  types: string[]; pros: string[]; tradeoffs: string[]; unique: string;
  rental: { avgNightlyRate?: string; occupancyRate?: string; annualRevenue?: string } | null;
  yieldMid: number; beachNote: string;
}
export const COMMUNITIES: QuizCommunity[] = [
  {
    "slug": "cabo-san-lucas",
    "name": "Downtown Cabo San Lucas",
    "region": "Cabo San Lucas",
    "tagline": "The social and entertainment epicenter of Los Cabos",
    "vibe": "High-energy nightlife, walkable tourist hub, beach clubs, marina culture, year-round social scene",
    "image": "/images/communities/cabo-san-lucas.jpg",
    "coords": {
      "lat": 22.8905,
      "lng": -109.9167
    },
    "price": [
      159000,
      2500000
    ],
    "airportMin": 45,
    "beach": "swimmable",
    "attrs": {
      "gated": false,
      "golf": false,
      "walkable": true,
      "marina": true,
      "nightlife": true,
      "artsy": false,
      "quiet": false,
      "newBuild": true,
      "strongRental": false,
      "retiree": true,
      "family": true,
      "remoteWork": false,
      "medical": false,
      "beachfront": false,
      "luxury": false,
      "entry": true
    },
    "types": [
      "Condominiums",
      "Townhomes",
      "Pre-construction developments",
      "Commercial/mixed-use"
    ],
    "pros": [
      "Most walkable area in Los Cabos",
      "Steps from Medano Beach -- Cabo's only swimmable beach in town",
      "Strongest short-term rental income potential in the region"
    ],
    "tradeoffs": [
      "It's roughly 45 minutes from the airport — a real factor if you'll fly in often.",
      "It gets busy and loud in high season — great for some, not for everyone."
    ],
    "unique": "Downtown Cabo is the only area where you can walk to a swimmable beach, world-class dining, shopping, and nightlife all within minutes. It offers the most affordable entry into Cabo real estate while producing the strongest short-term rental yields due to constant tourist foot traffic.",
    "rental": {
      "avgNightlyRate": "$120-$250",
      "occupancyRate": "65-80%",
      "annualRevenue": "$30K-$65K"
    },
    "yieldMid": 47500,
    "beachNote": "Safe — the only swimmable beach in downtown Cabo"
  },
  {
    "slug": "pedregal",
    "name": "Pedregal de Cabo San Lucas",
    "region": "Cabo San Lucas",
    "tagline": "Cabo's most prestigious address since the beginning",
    "vibe": "Ultra-exclusive gated community, old-money prestige, dramatic cliffside living, quiet and secure, iconic stone archway",
    "image": "/images/communities/pedregal.jpg",
    "coords": {
      "lat": 22.8785,
      "lng": -109.9275
    },
    "price": [
      495000,
      14999000
    ],
    "airportMin": 40,
    "beach": "variable",
    "attrs": {
      "gated": true,
      "golf": false,
      "walkable": true,
      "marina": false,
      "nightlife": false,
      "artsy": false,
      "quiet": true,
      "newBuild": false,
      "strongRental": true,
      "retiree": true,
      "family": true,
      "remoteWork": false,
      "medical": false,
      "beachfront": true,
      "luxury": false,
      "entry": false
    },
    "types": [
      "Luxury single-family homes",
      "Cliffside estates",
      "Oceanfront villas",
      "Condominiums",
      "Custom homesites"
    ],
    "pros": [
      "Most prestigious address in Cabo San Lucas",
      "24/7 gated security with guard stations",
      "Iconic cliffside positioning above the Pacific Ocean"
    ],
    "tradeoffs": [
      "Swim conditions vary by beach and season — worth checking the specific stretch.",
      "Inventory is scarce — the right listing doesn't come up often."
    ],
    "unique": "Pedregal is the founding luxury enclave of Cabo San Lucas with decades of proven prestige. The combination of cliffside Pacific views, gated security, walkability to downtown, and extreme inventory scarcity makes it irreplaceable. Properties are priced on replacement cost because nothing else replicates this positioning.",
    "rental": {
      "avgNightlyRate": "$500-$2,500+",
      "occupancyRate": "70-85% peak season",
      "annualRevenue": "$80K-$200K+"
    },
    "yieldMid": 140000,
    "beachNote": "Moderate — Pacific-facing, variable conditions"
  },
  {
    "slug": "el-medano",
    "name": "El Medano Beach",
    "region": "Cabo San Lucas",
    "tagline": "Where Cabo's beach culture comes alive",
    "vibe": "Active beach lifestyle, party-meets-resort atmosphere, water sports, beach clubs, swimmable year-round",
    "image": "/images/communities/el-medano.jpg",
    "coords": {
      "lat": 22.886,
      "lng": -109.908
    },
    "price": [
      595000,
      6250000
    ],
    "airportMin": 45,
    "beach": "swimmable",
    "attrs": {
      "gated": false,
      "golf": false,
      "walkable": true,
      "marina": false,
      "nightlife": true,
      "artsy": false,
      "quiet": false,
      "newBuild": false,
      "strongRental": false,
      "retiree": false,
      "family": false,
      "remoteWork": false,
      "medical": false,
      "beachfront": true,
      "luxury": false,
      "entry": false
    },
    "types": [
      "Beachfront condominiums",
      "Resort residences",
      "Penthouses",
      "Beach villas"
    ],
    "pros": [
      "Cabo's only major swimmable beach",
      "Iconic views of Land's End and the Arch",
      "Walking distance to downtown Cabo"
    ],
    "tradeoffs": [
      "It's roughly 45 minutes from the airport — a real factor if you'll fly in often.",
      "It gets busy and loud in high season — great for some, not for everyone."
    ],
    "unique": "El Medano is the only stretch of swimmable beach in Cabo San Lucas proper, making it the epicenter for both tourists and residents. Properties command premium prices for direct beach access, strong rental yields, and iconic Arch views. Inventory is perpetually tight because of limited beachfront land.",
    "rental": {
      "avgNightlyRate": "$150-$600",
      "occupancyRate": "70-85%",
      "annualRevenue": "$40K-$100K"
    },
    "yieldMid": 70000,
    "beachNote": "Safe — Cabo's premier swimmable beach"
  },
  {
    "slug": "diamante",
    "name": "Diamante",
    "region": "Cabo San Lucas",
    "tagline": "Pacific dune luxury with Tiger Woods golf",
    "vibe": "Ultra-luxury resort community, world-class golf, dramatic Pacific dune landscape, crystal lagoon lifestyle, active outdoor adventure",
    "image": "/images/communities/diamante.jpg",
    "coords": {
      "lat": 22.8625,
      "lng": -109.9525
    },
    "price": [
      1500000,
      15000000
    ],
    "airportMin": 50,
    "beach": "surf",
    "attrs": {
      "gated": true,
      "golf": true,
      "walkable": false,
      "marina": false,
      "nightlife": false,
      "artsy": false,
      "quiet": false,
      "newBuild": false,
      "strongRental": true,
      "retiree": false,
      "family": true,
      "remoteWork": false,
      "medical": false,
      "beachfront": false,
      "luxury": true,
      "entry": false
    },
    "types": [
      "Custom estate homesites",
      "Single-family luxury homes",
      "Golf course residences",
      "Beach estates"
    ],
    "pros": [
      "1,500 acres of Pacific coastline and dunes",
      "Tiger Woods TGR Design golf course",
      "Davis Love III-designed course"
    ],
    "tradeoffs": [
      "The beach here isn't swimmable — strong currents make it a surf-and-walk beach.",
      "It's roughly 50 minutes from the airport — a real factor if you'll fly in often.",
      "You'll need a car for nearly everything — this isn't a walk-to-dinner area."
    ],
    "unique": "Diamante is distinguished by its Tiger Woods-designed golf course (one of the few in the world), 10-acre crystal lagoon, and dramatic dune landscape unlike anything else in Los Cabos. The 1,500-acre scale allows for true estate-sized properties with unobstructed Pacific views.",
    "rental": {
      "avgNightlyRate": "$500-$2,500",
      "occupancyRate": "55-70%",
      "annualRevenue": "$85K-$350K"
    },
    "yieldMid": 217500,
    "beachNote": "Not safe for swimming — strong Pacific currents and undertow"
  },
  {
    "slug": "quivira",
    "name": "Quivira Los Cabos",
    "region": "Cabo San Lucas",
    "tagline": "Pacific sunset living with Jack Nicklaus golf",
    "vibe": "Master-planned resort community, Pacific sunset lifestyle, golf and beach club oriented, family-friendly, branded luxury (Pueblo Bonito, St. Regis)",
    "image": "/images/communities/quivira.jpg",
    "coords": {
      "lat": 22.8695,
      "lng": -109.9445
    },
    "price": [
      748000,
      3990000
    ],
    "airportMin": 50,
    "beach": "surf",
    "attrs": {
      "gated": true,
      "golf": true,
      "walkable": false,
      "marina": false,
      "nightlife": false,
      "artsy": false,
      "quiet": false,
      "newBuild": false,
      "strongRental": true,
      "retiree": false,
      "family": true,
      "remoteWork": false,
      "medical": false,
      "beachfront": false,
      "luxury": false,
      "entry": false
    },
    "types": [
      "Condominiums (Copala, Mavila)",
      "Villas",
      "Resort residences",
      "Branded residences (St. Regis)"
    ],
    "pros": [
      "Jack Nicklaus Signature golf course",
      "Anchored by Pueblo Bonito Sunset and Pacifica resorts",
      "New St. Regis Los Cabos"
    ],
    "tradeoffs": [
      "The beach here isn't swimmable — strong currents make it a surf-and-walk beach.",
      "It's roughly 50 minutes from the airport — a real factor if you'll fly in often.",
      "You'll need a car for nearly everything — this isn't a walk-to-dinner area."
    ],
    "unique": "Quivira offers a Jack Nicklaus golf course, Pacific Ocean setting, multiple branded resort anchors (Pueblo Bonito and St. Regis), and a range of price points making luxury Pacific-side living more accessible than Diamante. The resort rental program provides hassle-free income generation.",
    "rental": {
      "avgNightlyRate": "$300-$1,500",
      "occupancyRate": "60-75%",
      "annualRevenue": "$60K-$150K"
    },
    "yieldMid": 105000,
    "beachNote": "Not safe for swimming — strong Pacific currents and dramatic surf"
  },
  {
    "slug": "marina-cabo",
    "name": "Cabo San Lucas Marina",
    "region": "Cabo San Lucas",
    "tagline": "Yacht views, sportfishing, and Cabo's most accessible real estate",
    "vibe": "Yacht culture and marina lifestyle, tourist-oriented waterfront, sportfishing hub, cosmopolitan and social",
    "image": "/images/communities/marina-cabo.jpg",
    "coords": {
      "lat": 22.8835,
      "lng": -109.9115
    },
    "price": [
      250000,
      1500000
    ],
    "airportMin": 45,
    "beach": "none",
    "attrs": {
      "gated": false,
      "golf": false,
      "walkable": true,
      "marina": true,
      "nightlife": false,
      "artsy": false,
      "quiet": false,
      "newBuild": false,
      "strongRental": false,
      "retiree": false,
      "family": false,
      "remoteWork": false,
      "medical": false,
      "beachfront": false,
      "luxury": false,
      "entry": true
    },
    "types": [
      "Condominiums",
      "Studio apartments",
      "Marina-front residences",
      "Mixed commercial/residential"
    ],
    "pros": [
      "Marina-front living with yacht views",
      "Strongest cap rates in Cabo (low price, high demand)",
      "Walking distance to downtown and Medano Beach"
    ],
    "tradeoffs": [
      "No beach directly on site — you'll drive to the water.",
      "It's roughly 45 minutes from the airport — a real factor if you'll fly in often."
    ],
    "unique": "The Marina area provides the most accessible entry point to Cabo San Lucas real estate while offering prime location near the tourist heart. Studio and one-bedroom condos produce strong rental yields from the constant flow of tourists for sportfishing, dining, and boat tours.",
    "rental": {
      "avgNightlyRate": "$100-$400",
      "occupancyRate": "60-75%",
      "annualRevenue": "$25K-$60K"
    },
    "yieldMid": 42500,
    "beachNote": "No beach — marina waterfront area"
  },
  {
    "slug": "el-tezal",
    "name": "El Tezal",
    "region": "Cabo San Lucas",
    "tagline": "Best value in greater Cabo for full-time living",
    "vibe": "Residential suburb with local feel, quieter than downtown, expat-popular, good value, growing commercial infrastructure",
    "image": "/images/communities/el-tezal.jpg",
    "coords": {
      "lat": 22.8965,
      "lng": -109.8985
    },
    "price": [
      159000,
      2500000
    ],
    "airportMin": 40,
    "beach": "none",
    "attrs": {
      "gated": false,
      "golf": false,
      "walkable": false,
      "marina": false,
      "nightlife": false,
      "artsy": false,
      "quiet": true,
      "newBuild": false,
      "strongRental": false,
      "retiree": true,
      "family": true,
      "remoteWork": false,
      "medical": false,
      "beachfront": false,
      "luxury": false,
      "entry": true
    },
    "types": [
      "Condominiums",
      "Single-family homes",
      "Villas",
      "Development land"
    ],
    "pros": [
      "Best value in greater Cabo San Lucas",
      "5 minutes from downtown Cabo",
      "Most popular neighborhood for full-time expat residents"
    ],
    "tradeoffs": [
      "No beach directly on site — you'll drive to the water.",
      "You'll need a car for nearly everything — this isn't a walk-to-dinner area."
    ],
    "unique": "El Tezal offers the convenience of being 5 minutes from downtown and the Corridor, with prices significantly below beachfront communities. It is the most popular neighborhood for full-time expat residents who want to live in Cabo year-round without paying resort-community premiums.",
    "rental": {
      "avgNightlyRate": "$80-$250",
      "occupancyRate": "50-65%",
      "annualRevenue": "$15K-$35K"
    },
    "yieldMid": 25000,
    "beachNote": "No beach — residential neighborhood"
  },
  {
    "slug": "palmilla",
    "name": "Palmilla",
    "region": "The Corridor",
    "tagline": "The gold standard of Los Cabos luxury real estate",
    "vibe": "Original luxury corridor community, old-guard elegance, resort-caliber amenities, Jack Nicklaus golf, One&Only resort anchor",
    "image": "/images/communities/palmilla.jpg",
    "coords": {
      "lat": 22.9625,
      "lng": -109.8165
    },
    "price": [
      790000,
      24950000
    ],
    "airportMin": 20,
    "beach": "swimmable",
    "attrs": {
      "gated": true,
      "golf": true,
      "walkable": false,
      "marina": false,
      "nightlife": false,
      "artsy": false,
      "quiet": false,
      "newBuild": false,
      "strongRental": true,
      "retiree": false,
      "family": true,
      "remoteWork": false,
      "medical": false,
      "beachfront": false,
      "luxury": false,
      "entry": false
    },
    "types": [
      "Luxury single-family homes",
      "Estate properties",
      "Condominiums",
      "Townhomes",
      "Residential lots"
    ],
    "pros": [
      "Home to the iconic One&Only Palmilla resort",
      "27-hole Jack Nicklaus golf course",
      "Multiple sub-communities at different price tiers"
    ],
    "tradeoffs": [
      "You'll need a car for nearly everything — this isn't a walk-to-dinner area."
    ],
    "unique": "Palmilla set the template that every subsequent Corridor development has tried to replicate. The combination of the One&Only resort, Jack Nicklaus golf, multiple price-tier neighborhoods, and decades of proven appreciation makes it the safest blue-chip real estate investment in Los Cabos.",
    "rental": {
      "avgNightlyRate": "$600-$3,000+",
      "occupancyRate": "65-80% peak",
      "annualRevenue": "$100K-$400K+"
    },
    "yieldMid": 250000,
    "beachNote": "Generally safe — protected cove"
  },
  {
    "slug": "querencia",
    "name": "Querencia",
    "region": "The Corridor",
    "tagline": "The premier private golf and social club in Los Cabos",
    "vibe": "Private members-only club, world-class Tom Fazio golf, desert foothill setting with Sea of Cortez views, family-oriented, exclusive and tight-knit",
    "image": "/images/communities/querencia.jpg",
    "coords": {
      "lat": 22.955,
      "lng": -109.825
    },
    "price": [
      500000,
      12000000
    ],
    "airportMin": 25,
    "beach": "none",
    "attrs": {
      "gated": true,
      "golf": true,
      "walkable": false,
      "marina": false,
      "nightlife": false,
      "artsy": false,
      "quiet": false,
      "newBuild": false,
      "strongRental": true,
      "retiree": false,
      "family": true,
      "remoteWork": false,
      "medical": false,
      "beachfront": false,
      "luxury": false,
      "entry": false
    },
    "types": [
      "Luxury custom homes",
      "Condominiums",
      "Custom homesites",
      "Golf villas",
      "Club residences"
    ],
    "pros": [
      "1,800 acres of desert foothills overlooking Sea of Cortez",
      "Tom Fazio 18-hole championship golf course",
      "Private Beach Club"
    ],
    "tradeoffs": [
      "No beach directly on site — you'll drive to the water.",
      "You'll need a car for nearly everything — this isn't a walk-to-dinner area."
    ],
    "unique": "Querencia functions as an exclusive private club with a Tom Fazio course ranked among Mexico's finest. The 1,800-acre scale, seven restaurants, beach club, and family programming create a self-contained lifestyle that members rarely need to leave. It attracts buyers who value privacy, community, and world-class golf above all else.",
    "rental": {
      "avgNightlyRate": "$800-$4,000",
      "occupancyRate": "50-65%",
      "annualRevenue": "$100K-$300K"
    },
    "yieldMid": 200000,
    "beachNote": "N/A — no on-site beach"
  },
  {
    "slug": "puerto-los-cabos",
    "name": "Puerto Los Cabos",
    "region": "The Corridor",
    "tagline": "Megayacht marina meets championship golf",
    "vibe": "Marina and golf destination, megayacht culture, championship golf (Nicklaus + Norman), gateway to East Cape, mix of resort luxury and marina lifestyle",
    "image": "/images/communities/puerto-los-cabos.jpg",
    "coords": {
      "lat": 23.04,
      "lng": -109.695
    },
    "price": [
      1000000,
      15000000
    ],
    "airportMin": 20,
    "beach": "variable",
    "attrs": {
      "gated": true,
      "golf": true,
      "walkable": false,
      "marina": true,
      "nightlife": false,
      "artsy": false,
      "quiet": false,
      "newBuild": false,
      "strongRental": false,
      "retiree": false,
      "family": true,
      "remoteWork": false,
      "medical": false,
      "beachfront": false,
      "luxury": false,
      "entry": false
    },
    "types": [
      "Single-family homes",
      "Townhomes",
      "Estate properties",
      "Marina residences",
      "Golf course homes"
    ],
    "pros": [
      "Marina with 200 slips for up to 250-foot megayachts",
      "27 holes: Jack Nicklaus Signature + Greg Norman Signature",
      "Ritz Carlton Reserve (The Enclaves)"
    ],
    "tradeoffs": [
      "Swim conditions vary by beach and season — worth checking the specific stretch.",
      "You'll need a car for nearly everything — this isn't a walk-to-dinner area."
    ],
    "unique": "Puerto Los Cabos uniquely combines megayacht-capable marina facilities, dual-signature championship golf (Nicklaus and Norman), and a Ritz Carlton Reserve into one 2,000-acre master plan. Its gateway position to the East Cape gives residents access to both Corridor polish and raw natural beauty.",
    "rental": {
      "avgNightlyRate": "$200-$800",
      "occupancyRate": "55-70%",
      "annualRevenue": "$40K-$100K"
    },
    "yieldMid": 70000,
    "beachNote": "Caution — variable conditions, calmer areas near protected coves"
  },
  {
    "slug": "chileno-bay",
    "name": "Chileno Bay",
    "region": "The Corridor",
    "tagline": "The pinnacle of Corridor luxury by Discovery Land Company",
    "vibe": "Ultra-exclusive Discovery Land Company community, Tom Fazio golf, 1.2 miles of private beach, contemporary design, global jet-set clientele",
    "image": "/images/communities/chileno-bay.jpg",
    "coords": {
      "lat": 22.935,
      "lng": -109.845
    },
    "price": [
      6000000,
      29000000
    ],
    "airportMin": 25,
    "beach": "swimmable",
    "attrs": {
      "gated": true,
      "golf": true,
      "walkable": false,
      "marina": false,
      "nightlife": false,
      "artsy": false,
      "quiet": false,
      "newBuild": false,
      "strongRental": true,
      "retiree": false,
      "family": false,
      "remoteWork": false,
      "medical": false,
      "beachfront": false,
      "luxury": true,
      "entry": false
    },
    "types": [
      "Custom estate homes",
      "Custom homesites",
      "Contemporary turnkey residences",
      "Auberge-branded resort residences (resale only)"
    ],
    "pros": [
      "Discovery Land Company development",
      "Tom Fazio 18-hole members-only golf course",
      "1.2 miles of private Blue Flag certified beach"
    ],
    "tradeoffs": [
      "You'll need a car for nearly everything — this isn't a walk-to-dinner area.",
      "Entry pricing starts high; this is a luxury tier, not a starter market.",
      "HOA dues and carrying costs run above the Cabo average."
    ],
    "unique": "Chileno Bay is Discovery Land Company's flagship Los Cabos community. The combination of 1.2 miles of private beach, members-only Tom Fazio golf, Auberge resort services, and a strict 599-residence cap creates artificial scarcity. The Auberge residences sold out in record time, and the community maintains some of the highest per-square-foot values in all of Mexico.",
    "rental": {
      "avgNightlyRate": "$1,000-$5,000",
      "occupancyRate": "60-75%",
      "annualRevenue": "$150K-$500K"
    },
    "yieldMid": 325000,
    "beachNote": "Excellent — protected cove, Blue Flag certified"
  },
  {
    "slug": "cabo-del-sol",
    "name": "Cabo del Sol",
    "region": "The Corridor",
    "tagline": "Where desert meets the Sea of Cortez on championship greens",
    "vibe": "Established championship golf community, desert-meets-ocean aesthetic, resort services, central Corridor location, proven track record",
    "image": "/images/communities/cabo-del-sol.jpg",
    "coords": {
      "lat": 22.925,
      "lng": -109.855
    },
    "price": [
      600000,
      10000000
    ],
    "airportMin": 25,
    "beach": "variable",
    "attrs": {
      "gated": true,
      "golf": true,
      "walkable": false,
      "marina": false,
      "nightlife": false,
      "artsy": false,
      "quiet": false,
      "newBuild": false,
      "strongRental": true,
      "retiree": true,
      "family": false,
      "remoteWork": false,
      "medical": false,
      "beachfront": false,
      "luxury": false,
      "entry": false
    },
    "types": [
      "Condominiums",
      "Townhomes",
      "Custom estate homesites",
      "Luxury villas",
      "Golf course homes"
    ],
    "pros": [
      "Jack Nicklaus Ocean Course",
      "Tom Weiskopf Desert Course",
      "Central Corridor location between both towns"
    ],
    "tradeoffs": [
      "Swim conditions vary by beach and season — worth checking the specific stretch.",
      "You'll need a car for nearly everything — this isn't a walk-to-dinner area."
    ],
    "unique": "Cabo del Sol is one of the original landmark golf communities on the Corridor, with two championship courses (Nicklaus and Weiskopf) and a decades-long track record of stable appreciation. Its central location and proven reputation make it a perennial favorite for buyers who want established Corridor luxury at more accessible prices than the ultra-premium communities.",
    "rental": {
      "avgNightlyRate": "$400-$2,000",
      "occupancyRate": "55-70%",
      "annualRevenue": "$70K-$200K"
    },
    "yieldMid": 135000,
    "beachNote": "Caution — oceanfront beach with variable conditions, limited swimming"
  },
  {
    "slug": "cabo-real",
    "name": "Cabo Real",
    "region": "The Corridor",
    "tagline": "Established Corridor living with panoramic Sea of Cortez views",
    "vibe": "Established Corridor residential community, Robert Trent Jones II golf, panoramic ocean views, mature landscaping, proven value",
    "image": "/images/communities/cabo-real.jpg",
    "coords": {
      "lat": 22.94,
      "lng": -109.84
    },
    "price": [
      400000,
      5000000
    ],
    "airportMin": 25,
    "beach": "variable",
    "attrs": {
      "gated": true,
      "golf": true,
      "walkable": false,
      "marina": false,
      "nightlife": false,
      "artsy": false,
      "quiet": false,
      "newBuild": false,
      "strongRental": false,
      "retiree": true,
      "family": true,
      "remoteWork": false,
      "medical": false,
      "beachfront": false,
      "luxury": false,
      "entry": false
    },
    "types": [
      "Condominiums",
      "Single-family homes",
      "Estate properties",
      "Golf course homes",
      "Oceanview lots"
    ],
    "pros": [
      "Robert Trent Jones II golf course",
      "Central Corridor location",
      "Panoramic Sea of Cortez views"
    ],
    "tradeoffs": [
      "Swim conditions vary by beach and season — worth checking the specific stretch.",
      "You'll need a car for nearly everything — this isn't a walk-to-dinner area."
    ],
    "unique": "Cabo Real delivers the Corridor lifestyle -- golf, ocean views, and central location -- at more accessible prices than the ultra-luxury neighbors. Its established infrastructure and decades of appreciation history make it one of the safest mid-luxury investments on the Corridor.",
    "rental": {
      "avgNightlyRate": "$200-$800",
      "occupancyRate": "55-70%",
      "annualRevenue": "$40K-$100K"
    },
    "yieldMid": 70000,
    "beachNote": "Caution — Corridor beach with open-ocean conditions, exercise caution when swimming"
  },
  {
    "slug": "san-jose-del-cabo",
    "name": "San Jose del Cabo",
    "region": "San Jose del Cabo",
    "tagline": "The cultural soul of Los Cabos",
    "vibe": "Cultural and artistic heart, famous Thursday Art Walk, colonial architecture, galleries and farm-to-table dining, sophisticated and quieter",
    "image": "/images/communities/san-jose-del-cabo.jpg",
    "coords": {
      "lat": 23.0587,
      "lng": -109.7017
    },
    "price": [
      350000,
      2500000
    ],
    "airportMin": 15,
    "beach": "surf",
    "attrs": {
      "gated": false,
      "golf": false,
      "walkable": true,
      "marina": false,
      "nightlife": false,
      "artsy": true,
      "quiet": true,
      "newBuild": true,
      "strongRental": false,
      "retiree": true,
      "family": false,
      "remoteWork": false,
      "medical": false,
      "beachfront": false,
      "luxury": false,
      "entry": true
    },
    "types": [
      "Condominiums (new construction and pre-sale)",
      "Historic colonial homes",
      "Boutique commercial/residential",
      "Townhomes"
    ],
    "pros": [
      "Famous Art District with weekly Thursday Art Walk",
      "Colonial architecture and authentic Mexican town feel",
      "Strongest condo appreciation in Los Cabos (10% YoY in 2025)"
    ],
    "tradeoffs": [
      "The beach here isn't swimmable — strong currents make it a surf-and-walk beach."
    ],
    "unique": "Downtown San Jose del Cabo is the cultural soul of Los Cabos. The Art District, colonial architecture, Thursday Art Walk, and farm-to-table dining scene attract sophisticated buyers who value authenticity. It offers the strongest condo appreciation rates in Los Cabos and is just 15 minutes from the airport.",
    "rental": {
      "avgNightlyRate": "$100-$400",
      "occupancyRate": "55-70%",
      "annualRevenue": "$25K-$65K"
    },
    "yieldMid": 45000,
    "beachNote": "Caution — strong currents, not consistently safe for swimming"
  },
  {
    "slug": "la-playita",
    "name": "La Playita",
    "region": "San Jose del Cabo",
    "tagline": "Authentic fishing village next to ultra-luxury",
    "vibe": "Authentic Mexican fishing village, rapidly evolving, blend of traditional and modern, laid-back and genuine, calm family-friendly beach",
    "image": "/images/communities/la-playita.jpg",
    "coords": {
      "lat": 23.046,
      "lng": -109.685
    },
    "price": [
      128000,
      1900000
    ],
    "airportMin": 20,
    "beach": "variable",
    "attrs": {
      "gated": false,
      "golf": false,
      "walkable": true,
      "marina": true,
      "nightlife": false,
      "artsy": false,
      "quiet": false,
      "newBuild": false,
      "strongRental": false,
      "retiree": false,
      "family": true,
      "remoteWork": false,
      "medical": false,
      "beachfront": false,
      "luxury": false,
      "entry": true
    },
    "types": [
      "Residential lots",
      "Traditional Mexican homes",
      "Upgraded waterfront properties",
      "Commercial properties"
    ],
    "pros": [
      "Last authentic fishing village feel near San Jose",
      "Adjacent to Puerto Los Cabos marina and Ritz Carlton",
      "Lowest entry prices near luxury infrastructure"
    ],
    "tradeoffs": [
      "Swim conditions vary by beach and season — worth checking the specific stretch."
    ],
    "unique": "La Playita sits right next to the multi-billion-dollar Puerto Los Cabos development while maintaining traditional fishing village pricing. This juxtaposition creates a unique investment opportunity: village-level entry prices with proximity to ultra-luxury amenities. As Puerto Los Cabos expands, La Playita properties are expected to see significant appreciation.",
    "rental": {
      "avgNightlyRate": "$60-$200",
      "occupancyRate": "40-55%",
      "annualRevenue": "$10K-$25K"
    },
    "yieldMid": 17500,
    "beachNote": "Caution — variable conditions, good for experienced swimmers"
  },
  {
    "slug": "fonatur",
    "name": "Fonatur (Hotel Zone)",
    "region": "San Jose del Cabo",
    "tagline": "Government-planned living with the widest range of price points",
    "vibe": "Master-planned tourism zone, golf-oriented (Vidanta Golf), hotel zone proximity, family-friendly suburban feel, diverse sub-communities",
    "image": "/images/communities/fonatur.jpg",
    "coords": {
      "lat": 23.05,
      "lng": -109.715
    },
    "price": [
      59000,
      6000000
    ],
    "airportMin": 20,
    "beach": "surf",
    "attrs": {
      "gated": false,
      "golf": true,
      "walkable": false,
      "marina": false,
      "nightlife": false,
      "artsy": false,
      "quiet": false,
      "newBuild": false,
      "strongRental": false,
      "retiree": false,
      "family": true,
      "remoteWork": false,
      "medical": false,
      "beachfront": false,
      "luxury": false,
      "entry": true
    },
    "types": [
      "Condominiums",
      "Single-family homes",
      "Vacant lots (various sizes)",
      "Golf course properties",
      "Luxury estates"
    ],
    "pros": [
      "Planned by Mexico's National Tourism Development Fund",
      "12+ distinct sub-communities at different price points",
      "Vidanta Golf course on-site"
    ],
    "tradeoffs": [
      "The beach here isn't swimmable — strong currents make it a surf-and-walk beach.",
      "You'll need a car for nearly everything — this isn't a walk-to-dinner area."
    ],
    "unique": "Fonatur is the government-planned tourism zone offering the widest variety of sub-communities and price points ($59K-$6M) of any single area in Los Cabos. The Vidanta Golf course and hotel zone proximity make it attractive for both residential living and vacation rental investment.",
    "rental": {
      "avgNightlyRate": "$80-$300",
      "occupancyRate": "50-65%",
      "annualRevenue": "$15K-$40K"
    },
    "yieldMid": 27500,
    "beachNote": "Caution — strong currents in most areas, check local flags"
  },
  {
    "slug": "san-jose-beach",
    "name": "San Jose del Cabo Beach",
    "region": "San Jose del Cabo",
    "tagline": "Nature-oriented beach living near the estuary preserve",
    "vibe": "Resort beach lifestyle, calmer than Cabo beaches, nature-oriented (estuary, bird watching), hotel zone amenities, upscale but accessible",
    "image": "/images/communities/san-jose-beach.jpg",
    "coords": {
      "lat": 23.055,
      "lng": -109.695
    },
    "price": [
      400000,
      5000000
    ],
    "airportMin": 20,
    "beach": "surf",
    "attrs": {
      "gated": false,
      "golf": false,
      "walkable": false,
      "marina": false,
      "nightlife": false,
      "artsy": true,
      "quiet": false,
      "newBuild": false,
      "strongRental": false,
      "retiree": true,
      "family": false,
      "remoteWork": false,
      "medical": false,
      "beachfront": true,
      "luxury": false,
      "entry": false
    },
    "types": [
      "Beachfront condominiums",
      "Hotel zone residences",
      "Beach villas",
      "Resort properties"
    ],
    "pros": [
      "San Jose del Cabo Estuary nature preserve",
      "Less crowded than Cabo San Lucas beaches",
      "Hotel zone services and restaurants"
    ],
    "tradeoffs": [
      "The beach here isn't swimmable — strong currents make it a surf-and-walk beach.",
      "You'll need a car for nearly everything — this isn't a walk-to-dinner area."
    ],
    "unique": "San Jose's beach communities offer a more nature-oriented, refined beach experience compared to Cabo San Lucas. The estuary nature preserve creates a unique ecological setting found nowhere else in Los Cabos, attracting buyers who value environmental beauty alongside resort amenities.",
    "rental": {
      "avgNightlyRate": "$100-$400",
      "occupancyRate": "55-70%",
      "annualRevenue": "$20K-$50K"
    },
    "yieldMid": 35000,
    "beachNote": "Caution — strong currents in most areas, always check flags"
  },
  {
    "slug": "east-cape",
    "name": "East Cape",
    "region": "East Cape",
    "tagline": "Baja's last frontier of raw beauty and untapped potential",
    "vibe": "Raw natural beauty, adventure lifestyle, emerging luxury (Costa Palmas), off-grid to ultra-premium, Sea of Cortez marine life",
    "image": "/images/communities/east-cape.jpg",
    "coords": {
      "lat": 23.35,
      "lng": -109.55
    },
    "price": [
      100000,
      40000000
    ],
    "airportMin": 90,
    "beach": "variable",
    "attrs": {
      "gated": false,
      "golf": false,
      "walkable": false,
      "marina": false,
      "nightlife": false,
      "artsy": false,
      "quiet": false,
      "newBuild": false,
      "strongRental": false,
      "retiree": true,
      "family": true,
      "remoteWork": false,
      "medical": false,
      "beachfront": true,
      "luxury": false,
      "entry": true
    },
    "types": [
      "Beachfront lots",
      "Single-family homes",
      "Off-grid eco-properties",
      "Branded luxury residences (Four Seasons, Aman)",
      "Surf and fishing properties"
    ],
    "pros": [
      "Baja's last major untapped coastal region",
      "Costa Palmas: Four Seasons + Aman mega-development",
      "Sea of Cortez -- Cousteau's 'aquarium of the world'"
    ],
    "tradeoffs": [
      "Swim conditions vary by beach and season — worth checking the specific stretch.",
      "It's roughly 90 minutes from the airport — a real factor if you'll fly in often.",
      "You'll need a car for nearly everything — this isn't a walk-to-dinner area."
    ],
    "unique": "The East Cape is being transformed from a sleepy fishing coast into a world-class destination by Costa Palmas (Four Seasons + Aman). Early investors are positioning for the same appreciation wave the Corridor experienced decades ago. The raw natural beauty of the Sea of Cortez -- Cousteau's 'aquarium of the world' -- cannot be replicated.",
    "rental": {
      "avgNightlyRate": "$80-$300",
      "occupancyRate": "40-55%",
      "annualRevenue": "$15K-$40K"
    },
    "yieldMid": 27500,
    "beachNote": "Varies — some safe coves with calm water, some beaches with strong currents"
  },
  {
    "slug": "los-barriles",
    "name": "Los Barriles",
    "region": "East Cape",
    "tagline": "Windsurfing capital with Baja's best expat community",
    "vibe": "Windsurfing and kiteboarding capital, small-town community, year-round expat life, outdoor adventure, laid-back authentic, growing but uncrowded",
    "image": "/images/communities/los-barriles.jpg",
    "coords": {
      "lat": 23.5524,
      "lng": -109.6959
    },
    "price": [
      105000,
      17650000
    ],
    "airportMin": 45,
    "beach": "swimmable",
    "attrs": {
      "gated": false,
      "golf": false,
      "walkable": true,
      "marina": false,
      "nightlife": false,
      "artsy": false,
      "quiet": false,
      "newBuild": false,
      "strongRental": false,
      "retiree": true,
      "family": true,
      "remoteWork": false,
      "medical": false,
      "beachfront": true,
      "luxury": false,
      "entry": true
    },
    "types": [
      "Single-family homes",
      "Beachfront properties",
      "Vacant land and lots",
      "Ocean view estates",
      "Off-grid properties"
    ],
    "pros": [
      "World-class windsurfing and kiteboarding (consistent winds)",
      "Largest East Cape expat community",
      "Sea of Cortez deep-sea fishing (marlin, tuna, dorado)"
    ],
    "tradeoffs": [
      "It's roughly 45 minutes from the airport — a real factor if you'll fly in often.",
      "Medical care and big-box shopping are a drive away."
    ],
    "unique": "Los Barriles is internationally renowned as one of the world's premier windsurfing and kiteboarding destinations. The combination of an established expat community, world-class water sports, Sea of Cortez fishing, and prices still a fraction of Cabo makes it the smartest value play in the region.",
    "rental": {
      "avgNightlyRate": "$80-$250",
      "occupancyRate": "45-60%",
      "annualRevenue": "$12K-$30K"
    },
    "yieldMid": 21000,
    "beachNote": "Generally safe — calm Sea of Cortez waters with gentle slope"
  },
  {
    "slug": "costa-palmas",
    "name": "Costa Palmas",
    "region": "East Cape",
    "tagline": "Four Seasons and Aman on 1,000 acres of East Cape coastline",
    "vibe": "Ultra-luxury destination, Four Seasons + Aman resort brands, private marina, championship golf, East Cape natural beauty with five-star services",
    "image": "/images/communities/costa-palmas.jpg",
    "coords": {
      "lat": 23.4725,
      "lng": -109.665
    },
    "price": [
      850000,
      40000000
    ],
    "airportMin": 60,
    "beach": "swimmable",
    "attrs": {
      "gated": true,
      "golf": true,
      "walkable": false,
      "marina": true,
      "nightlife": false,
      "artsy": false,
      "quiet": false,
      "newBuild": false,
      "strongRental": false,
      "retiree": false,
      "family": false,
      "remoteWork": false,
      "medical": false,
      "beachfront": true,
      "luxury": false,
      "entry": false
    },
    "types": [
      "Four Seasons branded residences",
      "Aman branded residences",
      "Marina residences",
      "Beachfront villas and estates",
      "Golf course homes"
    ],
    "pros": [
      "Four Seasons Resort and Residences",
      "Aman Resort and Residences (Amanvari)",
      "1,000 acres on 2-mile East Cape coastline"
    ],
    "tradeoffs": [
      "It's roughly 60 minutes from the airport — a real factor if you'll fly in often.",
      "You'll need a car for nearly everything — this isn't a walk-to-dinner area.",
      "Medical care and big-box shopping are a drive away."
    ],
    "unique": "Having both Four Seasons and Aman in a single 1,000-acre development is unprecedented in Mexico. The Robert Trent Jones II golf course, private marina, and 2-mile beachfront create a self-contained ultra-luxury ecosystem that rivals the finest resort communities globally. It is single-handedly transforming the East Cape economy.",
    "rental": {
      "avgNightlyRate": "$1,500 - $8,000+ (varies by residence type)",
      "occupancyRate": "65-75% (high season driven — November through April)",
      "annualRevenue": "$250,000 - $1,200,000+ (Four Seasons branded units command premium)"
    },
    "yieldMid": 125,
    "beachNote": "Swimmable year-round — protected Sea of Cortez shoreline"
  },
  {
    "slug": "zacatitos",
    "name": "Zacatitos",
    "region": "East Cape",
    "tagline": "From surf shacks to luxury estates -- Baja's most unique community",
    "vibe": "Surf culture epicenter, off-grid tradition evolving to luxury, no HOA, independent and self-reliant, dramatic mix from simple to ultra-luxury",
    "image": "/images/communities/zacatitos.jpg",
    "coords": {
      "lat": 23.095,
      "lng": -109.635
    },
    "price": [
      200000,
      10000000
    ],
    "airportMin": 30,
    "beach": "variable",
    "attrs": {
      "gated": false,
      "golf": false,
      "walkable": false,
      "marina": false,
      "nightlife": false,
      "artsy": false,
      "quiet": false,
      "newBuild": false,
      "strongRental": false,
      "retiree": false,
      "family": true,
      "remoteWork": false,
      "medical": false,
      "beachfront": true,
      "luxury": false,
      "entry": true
    },
    "types": [
      "Single-family homes (modest to mega-luxury)",
      "Beachfront lots",
      "Hillside properties",
      "Off-grid eco-builds",
      "Surf compounds"
    ],
    "pros": [
      "Punta Perfecta -- world-class point break surf",
      "No HOA (community-managed security)",
      "8 miles from San Jose del Cabo"
    ],
    "tradeoffs": [
      "Swim conditions vary by beach and season — worth checking the specific stretch.",
      "You'll need a car for nearly everything — this isn't a walk-to-dinner area.",
      "Medical care and big-box shopping are a drive away."
    ],
    "unique": "Zacatitos is Baja's most unique community: $10 million luxury estates sit alongside surf shacks, there is no HOA, and the legendary Punta Perfecta surf break draws riders worldwide. The self-reliant, solar-powered community culture and 30+ year history create an atmosphere found nowhere else in Los Cabos.",
    "rental": {
      "avgNightlyRate": "$100-$400",
      "occupancyRate": "35-50%",
      "annualRevenue": "$12K-$35K"
    },
    "yieldMid": 23500,
    "beachNote": "Variable — surf break areas have strong currents; some protected coves are calmer"
  },
  {
    "slug": "cabo-pulmo",
    "name": "Cabo Pulmo",
    "region": "East Cape",
    "tagline": "UNESCO marine park and the world's best conservation success story",
    "vibe": "Conservation-first community, National Marine Park setting, world-class diving and snorkeling, off-grid eco-oriented, community-governed",
    "image": "/images/communities/cabo-pulmo.jpg",
    "coords": {
      "lat": 23.4425,
      "lng": -109.4225
    },
    "price": [
      150000,
      2000000
    ],
    "airportMin": 90,
    "beach": "swimmable",
    "attrs": {
      "gated": false,
      "golf": false,
      "walkable": false,
      "marina": false,
      "nightlife": false,
      "artsy": false,
      "quiet": false,
      "newBuild": false,
      "strongRental": false,
      "retiree": true,
      "family": false,
      "remoteWork": false,
      "medical": false,
      "beachfront": true,
      "luxury": false,
      "entry": true
    },
    "types": [
      "Low-density conservation properties",
      "Eco-luxury homes",
      "Beachfront lots",
      "Casitas",
      "Off-grid properties"
    ],
    "pros": [
      "Adjacent to UNESCO World Heritage Marine Park",
      "20,000-year-old coral reef (oldest on Pacific coast of North America)",
      "450%+ increase in marine biomass through conservation"
    ],
    "tradeoffs": [
      "It's roughly 90 minutes from the airport — a real factor if you'll fly in often.",
      "You'll need a car for nearly everything — this isn't a walk-to-dinner area.",
      "Inventory is scarce — the right listing doesn't come up often."
    ],
    "unique": "Cabo Pulmo is the only community in Los Cabos adjacent to a UNESCO World Heritage Marine Park. Strict environmental protections, off-grid requirements, and limited permitting create extreme artificial scarcity. The 450% marine biomass increase is one of the world's most successful conservation stories, making ownership here both ecologically meaningful and inherently scarce.",
    "rental": {
      "avgNightlyRate": "$60-$200",
      "occupancyRate": "30-45%",
      "annualRevenue": "$8K-$20K"
    },
    "yieldMid": 14000,
    "beachNote": "Safe in designated areas — world-class reef with protected swim and snorkel zones"
  },
  {
    "slug": "cerritos-beach",
    "name": "Cerritos Beach",
    "region": "Pacific Side",
    "tagline": "Baja's surf capital with the only swimmable Pacific beach",
    "vibe": "Surf culture capital, laid-back bohemian beach community, eco-conscious, international surf community, farm-to-table nearby",
    "image": "/images/communities/cerritos-beach.jpg",
    "coords": {
      "lat": 23.3275,
      "lng": -110.165
    },
    "price": [
      98000,
      4770000
    ],
    "airportMin": 75,
    "beach": "swimmable",
    "attrs": {
      "gated": false,
      "golf": false,
      "walkable": true,
      "marina": false,
      "nightlife": false,
      "artsy": true,
      "quiet": false,
      "newBuild": false,
      "strongRental": false,
      "retiree": true,
      "family": true,
      "remoteWork": false,
      "medical": false,
      "beachfront": true,
      "luxury": false,
      "entry": true
    },
    "types": [
      "Condominiums (surf residences)",
      "Single-family homes",
      "Beachfront lots",
      "Vacation rental properties",
      "Eco-builds"
    ],
    "pros": [
      "Only swimmable beach on Pacific side of southern Baja",
      "World-class surf for all levels",
      "$50-70M annually in surf-focused property investment"
    ],
    "tradeoffs": [
      "It's roughly 75 minutes from the airport — a real factor if you'll fly in often.",
      "Medical care and big-box shopping are a drive away."
    ],
    "unique": "Cerritos is the only swimmable surf beach on the Pacific side of southern Baja, making it the undisputed surf capital of the region. Consistent waves for all skill levels, bohemian community vibe, and eco-conscious development attract buyers who value surf culture over resort luxury. Annual $50-70M in surf-focused investment signals this area is transitioning from gem to destination.",
    "rental": {
      "avgNightlyRate": "$100-$350",
      "occupancyRate": "50-65%",
      "annualRevenue": "$20K-$50K"
    },
    "yieldMid": 35000,
    "beachNote": "Generally safe — one of few swimmable Pacific beaches"
  },
  {
    "slug": "todos-santos",
    "name": "Todos Santos",
    "region": "Pacific Side",
    "tagline": "Mexico's Pueblo Magico of art, culture, and Pacific beauty",
    "vibe": "Pueblo Magico (government-designated Magic Town), art colony, bohemian sophistication, organic farming and farm-to-table, slower pace, authentic Mexican life",
    "image": "/images/communities/todos-santos.jpg",
    "coords": {
      "lat": 23.4488,
      "lng": -110.2233
    },
    "price": [
      100000,
      2500000
    ],
    "airportMin": 75,
    "beach": "variable",
    "attrs": {
      "gated": false,
      "golf": false,
      "walkable": true,
      "marina": false,
      "nightlife": false,
      "artsy": true,
      "quiet": false,
      "newBuild": false,
      "strongRental": false,
      "retiree": true,
      "family": false,
      "remoteWork": false,
      "medical": false,
      "beachfront": false,
      "luxury": false,
      "entry": true
    },
    "types": [
      "Colonial-style historic homes",
      "Casitas",
      "Luxury ocean-view villas",
      "Agricultural/ranch land",
      "Boutique commercial (galleries, hotels)"
    ],
    "pros": [
      "Only Pueblo Magico in the Los Cabos region",
      "Thriving art scene with galleries and studios",
      "Historic colonial architecture"
    ],
    "tradeoffs": [
      "Swim conditions vary by beach and season — worth checking the specific stretch.",
      "It's roughly 75 minutes from the airport — a real factor if you'll fly in often.",
      "Medical care and big-box shopping are a drive away."
    ],
    "unique": "Todos Santos is the only Pueblo Magico in the Los Cabos region, carrying protected cultural status from the Mexican government. The combination of colonial architecture, world-class art scene, organic farming culture, and Pacific proximity creates a lifestyle that appeals to buyers seeking authenticity and culture over resort amenities. The current buyer's market creates favorable entry points.",
    "rental": {
      "avgNightlyRate": "$150-$500",
      "occupancyRate": "45-60%",
      "annualRevenue": "$25K-$60K"
    },
    "yieldMid": 42500,
    "beachNote": "Varies — Cerritos is swimmable; San Pedrito and Punta Lobos have strong currents (surfers only)"
  },
  {
    "slug": "el-pescadero",
    "name": "El Pescadero",
    "region": "Pacific Side",
    "tagline": "The agricultural heart of the Pacific corridor",
    "vibe": "Small farming and fishing town, organic agriculture heritage, surf-adjacent, rustic charm with growing amenities, strong community feel",
    "image": "/images/communities/el-pescadero.jpg",
    "coords": {
      "lat": 23.365,
      "lng": -110.185
    },
    "price": [
      200000,
      2000000
    ],
    "airportMin": 75,
    "beach": "surf",
    "attrs": {
      "gated": false,
      "golf": false,
      "walkable": false,
      "marina": false,
      "nightlife": false,
      "artsy": false,
      "quiet": false,
      "newBuild": false,
      "strongRental": false,
      "retiree": true,
      "family": true,
      "remoteWork": false,
      "medical": false,
      "beachfront": true,
      "luxury": false,
      "entry": true
    },
    "types": [
      "Single-family homes",
      "Condominiums",
      "Agricultural lots",
      "Beachfront properties",
      "Eco-builds"
    ],
    "pros": [
      "Known for organic farming (unique in Baja)",
      "8 km south of Todos Santos, adjacent to Cerritos Beach",
      "Vibrant street food and artisan scene"
    ],
    "tradeoffs": [
      "The beach here isn't swimmable — strong currents make it a surf-and-walk beach.",
      "It's roughly 75 minutes from the airport — a real factor if you'll fly in often.",
      "You'll need a car for nearly everything — this isn't a walk-to-dinner area."
    ],
    "unique": "El Pescadero is the agricultural heart of the Pacific corridor, known for organic farming in a way no other Baja community can claim. Its position between Todos Santos (art/culture) and Cerritos Beach (surf) makes it the practical center of Pacific-side living at lower prices than either neighbor.",
    "rental": {
      "avgNightlyRate": "$80-$250",
      "occupancyRate": "40-55%",
      "annualRevenue": "$12K-$30K"
    },
    "yieldMid": 21000,
    "beachNote": "Strong currents — the Pacific beaches near Pescadero are not generally safe for swimming; Cerritos Beach (10 min) is the exception"
  },
  {
    "slug": "el-dorado",
    "name": "El Dorado Golf & Beach Club",
    "region": "The Corridor",
    "tagline": "Discovery Land Company's original Cabo masterpiece -- ultra-exclusive since 1999",
    "vibe": "Ultra-exclusive Discovery Land Company, members-only, no rentals allowed, Jack Nicklaus golf, private beach, old-guard Cabo luxury",
    "image": "/images/communities/el-dorado.jpg",
    "coords": {
      "lat": 22.955,
      "lng": -109.805
    },
    "price": [
      2200000,
      15000000
    ],
    "airportMin": 25,
    "beach": "swimmable",
    "attrs": {
      "gated": true,
      "golf": true,
      "walkable": false,
      "marina": false,
      "nightlife": false,
      "artsy": false,
      "quiet": false,
      "newBuild": false,
      "strongRental": false,
      "retiree": false,
      "family": false,
      "remoteWork": false,
      "medical": false,
      "beachfront": true,
      "luxury": true,
      "entry": false
    },
    "types": [
      "Custom estate homesites",
      "Villas (2-7 bedrooms)",
      "Casitas",
      "Oceanfront estates"
    ],
    "pros": [
      "Discovery Land Company -- the gold standard of ultra-luxury communities",
      "Jack Nicklaus-designed private golf course with 6 oceanfront holes",
      "Strict no-hotel, no-rental policy -- owners only"
    ],
    "tradeoffs": [
      "You'll need a car for nearly everything — this isn't a walk-to-dinner area.",
      "Entry pricing starts high; this is a luxury tier, not a starter market.",
      "HOA dues and carrying costs run above the Cabo average."
    ],
    "unique": "El Dorado is Discovery Land Company's original Los Cabos community and the property that established Cabo as a destination for ultra-high-net-worth buyers. The strict no-hotel, no-rental policy means zero transient traffic. Combined with a private Jack Nicklaus golf course, members-only beach club, and 520 acres of pristine Sea of Cortez frontage, it delivers an exclusivity level that newer branded developments cannot match.",
    "rental": {
      "avgNightlyRate": "N/A — no rentals allowed",
      "occupancyRate": "N/A — no rentals allowed",
      "annualRevenue": "N/A — no rentals allowed"
    },
    "yieldMid": 0,
    "beachNote": "Good — protected Sea of Cortez frontage"
  },
  {
    "slug": "maravilla",
    "name": "Maravilla Los Cabos",
    "region": "The Corridor",
    "tagline": "Invitation-only oceanfront living for just 230 members",
    "vibe": "Invitation-only, 230-member cap, oceanfront on Santa Maria Bay, Fred Couples golf, sustainable luxury, ultra-private",
    "image": "/images/communities/maravilla.jpg",
    "coords": {
      "lat": 22.941,
      "lng": -109.828
    },
    "price": [
      3000000,
      15000000
    ],
    "airportMin": 20,
    "beach": "swimmable",
    "attrs": {
      "gated": true,
      "golf": true,
      "walkable": false,
      "marina": false,
      "nightlife": false,
      "artsy": false,
      "quiet": false,
      "newBuild": false,
      "strongRental": false,
      "retiree": false,
      "family": false,
      "remoteWork": false,
      "medical": false,
      "beachfront": true,
      "luxury": true,
      "entry": false
    },
    "types": [
      "Oceanfront villas",
      "Townhomes",
      "Custom estate homes",
      "Half-acre homesites"
    ],
    "pros": [
      "Invitation-only with a strict 230-member cap",
      "260 oceanfront acres on Santa Maria Bay and Las Viudas Beach",
      "Twin Dolphin Club with Fred Couples Signature golf course"
    ],
    "tradeoffs": [
      "You'll need a car for nearly everything — this isn't a walk-to-dinner area.",
      "Entry pricing starts high; this is a luxury tier, not a starter market.",
      "HOA dues and carrying costs run above the Cabo average."
    ],
    "unique": "Maravilla is the most selective residential community in Los Cabos with a strict 230-member invitation-only cap. The combination of two swimmable beaches, off-market sales only, Twin Dolphin Club golf membership, and pioneering sustainable technology creates a community unlike anything else in Mexico. This is not a resort -- it is a private members' club with real estate.",
    "rental": {
      "avgNightlyRate": "N/A — private members-only community",
      "occupancyRate": "N/A — not a rental market",
      "annualRevenue": "N/A — not a rental market"
    },
    "yieldMid": 0,
    "beachNote": "Excellent — two protected, swimmable bays"
  },
  {
    "slug": "twin-dolphin",
    "name": "Twin Dolphin",
    "region": "The Corridor",
    "tagline": "1,400-acre master plan encompassing Cabo's most legendary address",
    "vibe": "Historic landmark master plan, Fred Couples golf, mountain and beach adventures, encompasses Maravilla and Montage, custom estate homesites up to 9 acres",
    "image": "/images/communities/twin-dolphin.jpg",
    "coords": {
      "lat": 22.94,
      "lng": -109.825
    },
    "price": [
      4000000,
      20000000
    ],
    "airportMin": 20,
    "beach": "swimmable",
    "attrs": {
      "gated": true,
      "golf": true,
      "walkable": false,
      "marina": false,
      "nightlife": false,
      "artsy": false,
      "quiet": false,
      "newBuild": false,
      "strongRental": true,
      "retiree": false,
      "family": false,
      "remoteWork": false,
      "medical": false,
      "beachfront": true,
      "luxury": true,
      "entry": false
    },
    "types": [
      "Custom estate homesites (up to 9 acres)",
      "Montage branded residences",
      "Maravilla villas and townhomes",
      "Oceanfront homes"
    ],
    "pros": [
      "1,400-acre master-planned community -- largest luxury plan on the Corridor",
      "Fred Couples Signature 19-hole golf course at 180 meters elevation",
      "Historic site of the legendary Hotel Twin Dolphin"
    ],
    "tradeoffs": [
      "You'll need a car for nearly everything — this isn't a walk-to-dinner area.",
      "Entry pricing starts high; this is a luxury tier, not a starter market.",
      "HOA dues and carrying costs run above the Cabo average."
    ],
    "unique": "Twin Dolphin carries the legacy of the original Hotel Twin Dolphin, one of the most storied properties in Cabo history. The 1,400-acre master plan is the largest luxury development on the Corridor, and the Fred Couples Signature golf course at 180 meters elevation is the most dramatic course in Los Cabos. Homesites up to 9 acres offer estate-scale privacy that is unmatched anywhere in the region.",
    "rental": {
      "avgNightlyRate": "$1,500-$5,000+ (Montage managed program)",
      "occupancyRate": "65-80% (Montage residences only)",
      "annualRevenue": "$200K-$600K+ (Montage residences only)"
    },
    "yieldMid": 400000,
    "beachNote": "Excellent — protected marine sanctuary with calm waters"
  },
  {
    "slug": "montage-los-cabos",
    "name": "Montage Los Cabos",
    "region": "The Corridor",
    "tagline": "52 branded resort residences on Santa Maria Bay by Montage Hotels",
    "vibe": "Montage-branded resort living, turnkey furnished residences, Santa Maria Bay beachfront, Twin Dolphin Club golf, rental income potential",
    "image": "/images/communities/montage-los-cabos.jpg",
    "coords": {
      "lat": 22.938,
      "lng": -109.822
    },
    "price": [
      3950000,
      20000000
    ],
    "airportMin": 20,
    "beach": "swimmable",
    "attrs": {
      "gated": true,
      "golf": false,
      "walkable": false,
      "marina": false,
      "nightlife": false,
      "artsy": false,
      "quiet": false,
      "newBuild": false,
      "strongRental": true,
      "retiree": false,
      "family": false,
      "remoteWork": false,
      "medical": false,
      "beachfront": true,
      "luxury": true,
      "entry": false
    },
    "types": [
      "Two-bedroom resort residences",
      "Three-bedroom resort residences",
      "Penthouse residences",
      "Estate homes with private pools"
    ],
    "pros": [
      "Only 52 residences -- Montage's exclusive Los Cabos collection",
      "Fully furnished turnkey delivery with Montage service standards",
      "Twin Dolphin Club membership with Fred Couples golf included"
    ],
    "tradeoffs": [
      "You'll need a car for nearly everything — this isn't a walk-to-dinner area.",
      "Entry pricing starts high; this is a luxury tier, not a starter market.",
      "HOA dues and carrying costs run above the Cabo average."
    ],
    "unique": "Montage Los Cabos is the only Montage-branded residential product in Mexico. The combination of just 52 residences, Santa Maria Bay's world-class setting, Twin Dolphin Club golf, and Montage's institutional rental management program creates a branded residence offering that competes with Four Seasons and Aman globally. The turnkey furnished delivery means owners walk in and start living immediately.",
    "rental": {
      "avgNightlyRate": "$1,200-$4,500",
      "occupancyRate": "70-85%",
      "annualRevenue": "$200K-$500K+"
    },
    "yieldMid": 350000,
    "beachNote": "Excellent — protected bay with calm, crystal-clear waters"
  },
  {
    "slug": "rancho-san-lucas",
    "name": "Rancho San Lucas",
    "region": "Cabo San Lucas",
    "tagline": "834-acre Pacific resort community with Greg Norman golf",
    "vibe": "Pacific oceanfront resort community, Greg Norman golf, Solmar Group hospitality, gated security, broad price accessibility, dramatic desert-meets-ocean landscape",
    "image": "/images/communities/rancho-san-lucas.jpg",
    "coords": {
      "lat": 22.872,
      "lng": -109.945
    },
    "price": [
      689000,
      5000000
    ],
    "airportMin": 50,
    "beach": "surf",
    "attrs": {
      "gated": true,
      "golf": true,
      "walkable": false,
      "marina": false,
      "nightlife": false,
      "artsy": false,
      "quiet": false,
      "newBuild": false,
      "strongRental": true,
      "retiree": false,
      "family": true,
      "remoteWork": false,
      "medical": true,
      "beachfront": true,
      "luxury": false,
      "entry": false
    },
    "types": [
      "Norman Estates (branded luxury homes)",
      "The Villas (two-story single-family)",
      "Resort condominiums",
      "Homesites"
    ],
    "pros": [
      "Greg Norman Signature golf course (Solmar Golf Links) -- 7,210 yards",
      "834 acres with 1.2 miles of Pacific Ocean beachfront",
      "Grand Solmar at Rancho San Lucas resort on-site"
    ],
    "tradeoffs": [
      "The beach here isn't swimmable — strong currents make it a surf-and-walk beach.",
      "It's roughly 50 minutes from the airport — a real factor if you'll fly in often.",
      "You'll need a car for nearly everything — this isn't a walk-to-dinner area."
    ],
    "unique": "Rancho San Lucas is the only Los Cabos community with a Greg Norman Signature golf course and branded Norman Estates real estate product. The 834-acre Pacific-front master plan offers resort-scale amenities at a broader price range than Corridor communities, making it the most accessible luxury golf community in the region. The Solmar Group brings decades of established hospitality expertise to the ownership experience.",
    "rental": {
      "avgNightlyRate": "$200-$800",
      "occupancyRate": "60-75%",
      "annualRevenue": "$40K-$150K"
    },
    "yieldMid": 95000,
    "beachNote": "Use caution — Pacific-facing with strong currents; best for walks and surfing"
  },
  {
    "slug": "club-campestre",
    "name": "Club Campestre San Jose del Cabo",
    "region": "San Jose del Cabo",
    "tagline": "Jack Nicklaus golf and gated living in the heart of San Jose",
    "vibe": "Established Jack Nicklaus golf community, nine neighborhoods, beach club, convenient San Jose location, family-friendly, strong investment fundamentals",
    "image": "/images/communities/club-campestre.jpg",
    "coords": {
      "lat": 23.048,
      "lng": -109.715
    },
    "price": [
      400000,
      3000000
    ],
    "airportMin": 20,
    "beach": "swimmable",
    "attrs": {
      "gated": true,
      "golf": true,
      "walkable": false,
      "marina": false,
      "nightlife": false,
      "artsy": false,
      "quiet": false,
      "newBuild": false,
      "strongRental": false,
      "retiree": true,
      "family": true,
      "remoteWork": false,
      "medical": false,
      "beachfront": false,
      "luxury": false,
      "entry": false
    },
    "types": [
      "Condominiums",
      "Luxury villas with private pools",
      "Custom estate homes",
      "Golf-course homes",
      "Homesites"
    ],
    "pros": [
      "18-hole Jack Nicklaus-designed championship golf course",
      "550 acres with nine distinct residential neighborhoods",
      "Campestre Beach Club with Sea of Cortez access"
    ],
    "tradeoffs": [
      "You'll need a car for nearly everything — this isn't a walk-to-dinner area."
    ],
    "unique": "Club Campestre is the most established Jack Nicklaus golf community in San Jose del Cabo with decades of proven appreciation. The combination of nine diverse neighborhoods, a private beach club, full amenity package, and proximity to downtown San Jose and the airport creates a convenience factor that Corridor communities simply cannot match. The $400K-$3M price range makes it the most accessible Nicklaus golf community in Los Cabos.",
    "rental": {
      "avgNightlyRate": "$150-$600",
      "occupancyRate": "55-70%",
      "annualRevenue": "$30K-$100K"
    },
    "yieldMid": 65000,
    "beachNote": "Good — Sea of Cortez side with generally calm conditions"
  },
  {
    "slug": "cabo-bello",
    "name": "Cabo Bello",
    "region": "The Corridor",
    "tagline": "Gated beachfront living with swimmable shores on the Corridor",
    "vibe": "Established gated community, swimmable beach, family-friendly, diverse price points, corridor convenience",
    "image": "/images/communities/cabo-bello.jpg",
    "coords": {
      "lat": 22.9065,
      "lng": -109.8895
    },
    "price": [
      250000,
      1450000
    ],
    "airportMin": 40,
    "beach": "swimmable",
    "attrs": {
      "gated": true,
      "golf": false,
      "walkable": false,
      "marina": false,
      "nightlife": false,
      "artsy": false,
      "quiet": false,
      "newBuild": false,
      "strongRental": false,
      "retiree": true,
      "family": true,
      "remoteWork": false,
      "medical": false,
      "beachfront": true,
      "luxury": false,
      "entry": true
    },
    "types": [
      "Beachfront homes",
      "Single-family residences",
      "Condominiums",
      "Townhomes"
    ],
    "pros": [
      "Rare swimmable beach with great snorkeling on the Corridor",
      "One of the original master-planned Corridor communities",
      "Plaza Calafia condos provide accessible entry pricing"
    ],
    "tradeoffs": [
      "You'll need a car for nearly everything — this isn't a walk-to-dinner area."
    ],
    "unique": "Cabo Bello combines one of the Corridor's only swimmable beaches with an established, multi-neighborhood master plan that spans accessible condos to beachfront estates. The diversity of housing options within a single gated community is rare on the Corridor, attracting everyone from first-time Cabo buyers to long-term residents.",
    "rental": {
      "avgNightlyRate": "$100-$280",
      "occupancyRate": "55-70%",
      "annualRevenue": "$22K-$55K"
    },
    "yieldMid": 38500,
    "beachNote": "Safe — protected cove with calm water, excellent snorkeling"
  },
  {
    "slug": "punta-ballena",
    "name": "Punta Ballena",
    "region": "The Corridor",
    "tagline": "Ultra-luxury Corridor enclave anchored by Esperanza, Auberge Resorts",
    "vibe": "Ultra-luxury resort living, Auberge hospitality, intimate scale, world-class dining, cliffside ocean setting",
    "image": "/images/communities/punta-ballena.jpg",
    "coords": {
      "lat": 22.9015,
      "lng": -109.881
    },
    "price": [
      3000000,
      15000000
    ],
    "airportMin": 35,
    "beach": "variable",
    "attrs": {
      "gated": true,
      "golf": false,
      "walkable": false,
      "marina": false,
      "nightlife": false,
      "artsy": false,
      "quiet": false,
      "newBuild": false,
      "strongRental": true,
      "retiree": false,
      "family": true,
      "remoteWork": false,
      "medical": true,
      "beachfront": true,
      "luxury": true,
      "entry": false
    },
    "types": [
      "Luxury single-family homes",
      "Multi-family residences",
      "Oceanfront villas",
      "Whole-ownership resort residences"
    ],
    "pros": [
      "Anchored by Esperanza, an Auberge Resorts Collection property",
      "Only 53 homes — one of the most intimate luxury communities in Cabo",
      "Exclusive resident beach club with restaurant, bar, gym, and pools"
    ],
    "tradeoffs": [
      "Swim conditions vary by beach and season — worth checking the specific stretch.",
      "You'll need a car for nearly everything — this isn't a walk-to-dinner area.",
      "Entry pricing starts high; this is a luxury tier, not a starter market."
    ],
    "unique": "Punta Ballena combines the intimacy of just 53 homes with the full hospitality infrastructure of Esperanza, one of the world's most celebrated resort brands. The Auberge service standard, private beach club, and dramatic cliffside setting create an experience that rivals any ultra-luxury community in Los Cabos.",
    "rental": {
      "avgNightlyRate": "$800-$3,500+",
      "occupancyRate": "60-75% peak season",
      "annualRevenue": "$120K-$350K+"
    },
    "yieldMid": 235000,
    "beachNote": "Moderate — ocean-facing with variable conditions; beach club pool available"
  },
  {
    "slug": "cresta-del-mar",
    "name": "Cresta del Mar",
    "region": "The Corridor",
    "tagline": "Panoramic ocean-view ridge living with custom home possibilities",
    "vibe": "Custom hilltop homes, panoramic ocean and city views, design freedom, low HOA, boutique community feel",
    "image": "/images/communities/cresta-del-mar.jpg",
    "coords": {
      "lat": 22.913,
      "lng": -109.876
    },
    "price": [
      1500000,
      3000000
    ],
    "airportMin": 40,
    "beach": "none",
    "attrs": {
      "gated": true,
      "golf": false,
      "walkable": false,
      "marina": false,
      "nightlife": false,
      "artsy": false,
      "quiet": false,
      "newBuild": false,
      "strongRental": false,
      "retiree": true,
      "family": true,
      "remoteWork": false,
      "medical": false,
      "beachfront": false,
      "luxury": true,
      "entry": false
    },
    "types": [
      "Custom single-family homes",
      "Buildable lots",
      "Contemporary villas",
      "Traditional Mexican-style estates"
    ],
    "pros": [
      "270-degree panoramic views — ocean, city lights, and the Arch",
      "Oversized lots (many 20,000+ sq ft) for custom home building",
      "Remarkably low HOA fees ($216-$240/month for luxury Corridor)"
    ],
    "tradeoffs": [
      "The community sits inland on the hillside — the beach is a short drive.",
      "You'll need a car for nearly everything — this isn't a walk-to-dinner area.",
      "Entry pricing starts high; this is a luxury tier, not a starter market."
    ],
    "unique": "Cresta del Mar offers the best panoramic views on the Corridor from an elevated ridge with 270-degree vistas encompassing ocean, city lights, and the Arch. The emphasis on custom home building with oversized lots, combined with the lowest HOA fees among luxury Corridor communities, creates exceptional value for view-driven buyers.",
    "rental": {
      "avgNightlyRate": "$250-$600",
      "occupancyRate": "50-65%",
      "annualRevenue": "$40K-$90K"
    },
    "yieldMid": 65000,
    "beachNote": "Community is hilltop — drive to beaches (10-15 min)"
  },
  {
    "slug": "rancho-cerro-colorado",
    "name": "Rancho Cerro Colorado",
    "region": "The Corridor",
    "tagline": "Hilltop privacy with Sea of Cortez panoramas next to Palmilla",
    "vibe": "Hilltop privacy, hiking and equestrian trails, Sea of Cortez panoramas, nature-immersed living, adjacent to Palmilla",
    "image": "/images/communities/rancho-cerro-colorado.jpg",
    "coords": {
      "lat": 23,
      "lng": -109.7281
    },
    "price": [
      800000,
      3000000
    ],
    "airportMin": 30,
    "beach": "variable",
    "attrs": {
      "gated": true,
      "golf": false,
      "walkable": false,
      "marina": false,
      "nightlife": false,
      "artsy": false,
      "quiet": false,
      "newBuild": false,
      "strongRental": false,
      "retiree": true,
      "family": true,
      "remoteWork": false,
      "medical": false,
      "beachfront": true,
      "luxury": false,
      "entry": false
    },
    "types": [
      "Custom single-family homes",
      "Buildable lots",
      "Two-story estates",
      "Desert-contemporary villas"
    ],
    "pros": [
      "Adjacent to Palmilla — one of Cabo's most prestigious communities",
      "Panoramic Sea of Cortez views from hilltop elevation",
      "Hiking trails and equestrian-friendly terrain"
    ],
    "tradeoffs": [
      "Swim conditions vary by beach and season — worth checking the specific stretch.",
      "You'll need a car for nearly everything — this isn't a walk-to-dinner area."
    ],
    "unique": "Rancho Cerro Colorado combines hilltop Sea of Cortez panoramas with hiking and equestrian trails in a nature-immersed setting directly adjacent to Palmilla. The walking-distance beach access and proximity to Palmilla's world-class amenities, at a fraction of Palmilla's pricing, make it one of the best value propositions on the Corridor.",
    "rental": {
      "avgNightlyRate": "$300-$800",
      "occupancyRate": "50-65%",
      "annualRevenue": "$45K-$100K"
    },
    "yieldMid": 72500,
    "beachNote": "Variable — depends on specific beach accessed; Chileno Bay nearby is safe"
  },
  {
    "slug": "rancho-paraiso",
    "name": "Rancho Paraiso",
    "region": "The Corridor",
    "tagline": "No-rental gated community built for full-time living",
    "vibe": "Full-time residential, no short-term rentals, family-oriented, quiet hillside community, permanent expat neighborhood",
    "image": "/images/communities/rancho-paraiso.jpg",
    "coords": {
      "lat": 22.916,
      "lng": -109.8759
    },
    "price": [
      280000,
      1500000
    ],
    "airportMin": 40,
    "beach": "none",
    "attrs": {
      "gated": true,
      "golf": false,
      "walkable": false,
      "marina": false,
      "nightlife": false,
      "artsy": false,
      "quiet": true,
      "newBuild": false,
      "strongRental": false,
      "retiree": true,
      "family": true,
      "remoteWork": false,
      "medical": false,
      "beachfront": false,
      "luxury": false,
      "entry": true
    },
    "types": [
      "Custom single-family homes",
      "Buildable lots",
      "Family residences",
      "Hill-view homes"
    ],
    "pros": [
      "No short-term rentals allowed — rare in Los Cabos",
      "Genuinely residential atmosphere for full-time living",
      "24/7 gated security with enforced HOA standards"
    ],
    "tradeoffs": [
      "The community sits inland on the hillside — the beach is a short drive.",
      "You'll need a car for nearly everything — this isn't a walk-to-dinner area."
    ],
    "unique": "Rancho Paraiso's no-short-term-rental policy is virtually unique in Los Cabos, creating a genuine residential neighborhood rather than a revolving door of vacation guests. This policy, combined with affordable pricing and proximity to downtown Cabo, makes it the go-to community for permanent residents who want a real neighborhood.",
    "rental": {
      "avgNightlyRate": "N/A — short-term rentals not allowed",
      "occupancyRate": "N/A",
      "annualRevenue": "N/A — long-term rentals only"
    },
    "yieldMid": 0,
    "beachNote": "Community is hillside — drive to beaches"
  },
  {
    "slug": "hacienda-beach",
    "name": "Hacienda Beach Club & Residences",
    "region": "Cabo San Lucas",
    "tagline": "The only exclusive full-ownership community on Medano Beach",
    "vibe": "Exclusive beachfront resort living, Medano Beach lifestyle, full-ownership luxury, steps from downtown, private beach club",
    "image": "/images/communities/hacienda-beach.jpg",
    "coords": {
      "lat": 22.887,
      "lng": -109.9105
    },
    "price": [
      800000,
      5000000
    ],
    "airportMin": 45,
    "beach": "swimmable",
    "attrs": {
      "gated": true,
      "golf": false,
      "walkable": true,
      "marina": true,
      "nightlife": true,
      "artsy": false,
      "quiet": false,
      "newBuild": false,
      "strongRental": true,
      "retiree": false,
      "family": false,
      "remoteWork": false,
      "medical": false,
      "beachfront": true,
      "luxury": false,
      "entry": false
    },
    "types": [
      "Luxury condominiums",
      "Beachfront villas",
      "Penthouse residences",
      "Resort residences"
    ],
    "pros": [
      "Only exclusive full-ownership community on Medano Beach",
      "22-acre, $230M private beachfront development",
      "1,600 linear feet of swimmable beach frontage"
    ],
    "tradeoffs": [
      "It's roughly 45 minutes from the airport — a real factor if you'll fly in often.",
      "It gets busy and loud in high season — great for some, not for everyone."
    ],
    "unique": "Hacienda Beach Club is the only exclusive full-ownership residential community directly on Medano Beach. While numerous hotels and timeshares line the sand, Hacienda offers true deeded ownership with resort-level amenities on 22 acres of Cabo's most coveted beachfront real estate. The sold-out developer inventory means every unit is resale — underscoring scarcity.",
    "rental": {
      "avgNightlyRate": "$350-$1,500+",
      "occupancyRate": "70-85%",
      "annualRevenue": "$75K-$200K+"
    },
    "yieldMid": 137500,
    "beachNote": "Safe — Cabo's most famous swimmable beach with calm Sea of Cortez water"
  },
  {
    "slug": "las-ventanas",
    "name": "Las Ventanas al Paraiso Residences",
    "region": "The Corridor",
    "tagline": "Private luxury residences within the iconic Rosewood resort",
    "vibe": "Ultra-luxury Rosewood resort living, world-class dining and spa, oceanfront infinity pools, art-filled residences, personalized service",
    "image": "/images/communities/las-ventanas.jpg",
    "coords": {
      "lat": 22.962,
      "lng": -109.812
    },
    "price": [
      5000000,
      15000000
    ],
    "airportMin": 25,
    "beach": "variable",
    "attrs": {
      "gated": true,
      "golf": false,
      "walkable": false,
      "marina": false,
      "nightlife": false,
      "artsy": false,
      "quiet": false,
      "newBuild": false,
      "strongRental": true,
      "retiree": false,
      "family": false,
      "remoteWork": false,
      "medical": false,
      "beachfront": true,
      "luxury": true,
      "entry": false
    },
    "types": [
      "Oceanfront luxury villas",
      "Resort residences",
      "Private pool villas"
    ],
    "pros": [
      "Within Las Ventanas al Paraiso, a Rosewood Resort (since 1997)",
      "30 private villas with individual infinity-edge pools",
      "Handcrafted finishes with art sourced from Oaxaca, Chiapas, Guanajuato"
    ],
    "tradeoffs": [
      "Swim conditions vary by beach and season — worth checking the specific stretch.",
      "You'll need a car for nearly everything — this isn't a walk-to-dinner area.",
      "Entry pricing starts high; this is a luxury tier, not a starter market."
    ],
    "unique": "Las Ventanas al Paraiso is one of the most iconic resort brands in the world, and its private residences offer the rare opportunity to own within a property that has set the standard for luxury hospitality in Los Cabos for nearly three decades. The combination of Rosewood service, handcrafted artisan finishes, and private infinity pools creates an ownership experience that few properties anywhere can match.",
    "rental": {
      "avgNightlyRate": "$2,000-$8,000+",
      "occupancyRate": "55-70% peak season",
      "annualRevenue": "$250K-$600K+"
    },
    "yieldMid": 425000,
    "beachNote": "Moderate — Corridor positioning with variable conditions; resort pools available"
  },
  {
    "slug": "espiritu-del-mar",
    "name": "Espiritu del Mar",
    "region": "San Jose del Cabo",
    "tagline": "Double-gated hillside privacy within the Palmilla master plan",
    "vibe": "Double-gated hillside privacy, Palmilla amenity access, ocean-view estates, walking trails, exclusive enclave within an enclave",
    "image": "/images/communities/espiritu-del-mar.jpg",
    "coords": {
      "lat": 23.009,
      "lng": -109.708
    },
    "price": [
      1000000,
      8000000
    ],
    "airportMin": 20,
    "beach": "swimmable",
    "attrs": {
      "gated": true,
      "golf": false,
      "walkable": false,
      "marina": false,
      "nightlife": false,
      "artsy": false,
      "quiet": false,
      "newBuild": false,
      "strongRental": true,
      "retiree": false,
      "family": false,
      "remoteWork": false,
      "medical": false,
      "beachfront": false,
      "luxury": false,
      "entry": false
    },
    "types": [
      "Custom estate homes",
      "Casitas (2-5 bedrooms)",
      "Condominiums",
      "Buildable homesites",
      "Penthouses"
    ],
    "pros": [
      "Double-gated security within the Palmilla master plan",
      "22 homesites still available for custom builds",
      "28 acres of parks with 3+ miles of walking trails"
    ],
    "tradeoffs": [
      "You'll need a car for nearly everything — this isn't a walk-to-dinner area."
    ],
    "unique": "Espiritu del Mar offers double-gated security within the Palmilla master plan — gates within gates — providing a level of privacy unmatched in Los Cabos. The combination of hillside ocean views, 28 acres of community parks and walking trails, and full access to Palmilla's Club Ninety Six and Club Espiritu creates an enclave-within-an-enclave experience for discerning buyers.",
    "rental": {
      "avgNightlyRate": "$500-$2,000+",
      "occupancyRate": "55-70% peak season",
      "annualRevenue": "$80K-$200K+"
    },
    "yieldMid": 140000,
    "beachNote": "Safe — Palmilla Beach is one of Cabo's rare swimmable beaches"
  },
  {
    "slug": "costa-azul",
    "name": "Costa Azul",
    "region": "San Jose del Cabo",
    "tagline": "Surf culture meets beachfront living at Baja's premier break",
    "vibe": "Surf culture, active beach lifestyle, ocean sports, laid-back energy, cultural access to San Jose del Cabo",
    "image": "/images/communities/costa-azul.jpg",
    "coords": {
      "lat": 23.047,
      "lng": -109.703
    },
    "price": [
      300000,
      2000000
    ],
    "airportMin": 10,
    "beach": "variable",
    "attrs": {
      "gated": false,
      "golf": false,
      "walkable": false,
      "marina": false,
      "nightlife": false,
      "artsy": true,
      "quiet": false,
      "newBuild": false,
      "strongRental": false,
      "retiree": false,
      "family": false,
      "remoteWork": false,
      "medical": false,
      "beachfront": true,
      "luxury": false,
      "entry": true
    },
    "types": [
      "Beachfront condominiums",
      "Ocean-view condos",
      "Beach homes",
      "Luxury villas"
    ],
    "pros": [
      "Home to Zippers — Los Cabos' most famous surf break",
      "Hosts the annual World Surf League Los Cabos Open of Surf",
      "Mile-plus stretch of golden sand with multiple surf breaks"
    ],
    "tradeoffs": [
      "Swim conditions vary by beach and season — worth checking the specific stretch.",
      "You'll need a car for nearly everything — this isn't a walk-to-dinner area."
    ],
    "unique": "Costa Azul is the only dedicated surf community in Los Cabos, combining world-class waves, the legendary Zipper's beach scene, and proximity to both the airport and San Jose del Cabo's cultural heart. No other area in Cabo delivers this combination of active ocean lifestyle, cultural access, and real estate value.",
    "rental": {
      "avgNightlyRate": "$100-$350",
      "occupancyRate": "60-75%",
      "annualRevenue": "$25K-$65K"
    },
    "yieldMid": 45000,
    "beachNote": "Caution — surf beach with strong waves; not ideal for casual swimming"
  }
];
export const REGIONS = [
  "Cabo San Lucas",
  "The Corridor",
  "San Jose del Cabo",
  "East Cape",
  "Pacific Side"
];
