const fs=require('fs');
const all=require('./communities.json');
const EXCLUDE=new Set(['pacific-side']); // pure region overview page
const src=all.filter(c=>!EXCLUDE.has(c.slug));

// Curated, self-describing fields only. description/whatMakesItUnique/demographics
// talk about the surrounding area too ("minutes from the gated communities of...",
// "close to championship golf"), which produced false positives.
const txt=(c)=>[c.tagline,c.lifestyleVibe,(c.highlights||[]).join(' '),
  (c.propertyTypes||[]).join(' ')].join(' ').toLowerCase();
const secTxt=(c)=>[c.securityInfo||'',c.tagline,c.lifestyleVibe,(c.highlights||[]).join(' ')].join(' ').toLowerCase();
const golfTxt=(c)=>[c.tagline,c.lifestyleVibe,(c.highlights||[]).join(' ')].join(' ').toLowerCase();

const airportMin=(c)=>{const s=c.proximity&&c.proximity.airport||'';const n=(s.match(/\d+/g)||[]).map(Number);
  return n.length?Math.max(...n):45};

const beach=(c)=>{const s=(c.beachInfo&&c.beachInfo.swimSafety||'').toLowerCase();
  if(!s) return 'variable';
  if(/no beach|no on-site beach|n\/a|hilltop|hillside/.test(s)) return 'none';
  if(/varies|variable|depends/.test(s)) return 'variable';
  if(/not safe|not generally safe|strong current|surfers only/.test(s)) return 'surf';
  if(/caution|moderate/.test(s)) return 'variable';
  if(/excellent|swimmable|^safe|safe —|good —|calm|protected|blue flag|generally safe/.test(s)) return 'swimmable';
  return 'variable'};

// rental yield tier from real annualRevenue data (all 41 records have it)
const yieldMid=(c)=>{const s=(c.rentalData&&c.rentalData.annualRevenue)||'';
  const n=(s.match(/\d+/g)||[]).map(Number); if(!n.length) return 0;
  const k=s.includes('K')||s.includes('k'); const mult=k?1000:1;
  return (Math.max(...n)+Math.min(...n))/2*mult};


/* ------------------------------------------------------------------ *
 * Curated overrides. gated/golf/walkable drive the buyer's hard
 * dealbreakers, and deriving them from prose produced false positives
 * (downtown Cabo read as "gated" because its area copy mentions nearby
 * gated communities; golfCourses[] lists NEARBY courses). These three
 * are set by hand against each community's own description.
 * ------------------------------------------------------------------ */
const GATED = new Set(['pedregal','diamante','quivira','palmilla','querencia','puerto-los-cabos',
  'chileno-bay','cabo-del-sol','cabo-real','costa-palmas','el-dorado','maravilla','twin-dolphin',
  'montage-los-cabos','rancho-san-lucas','club-campestre','cabo-bello','punta-ballena',
  'cresta-del-mar','rancho-cerro-colorado','rancho-paraiso','hacienda-beach','las-ventanas',
  'espiritu-del-mar']);
const GOLF = new Set(['diamante','quivira','palmilla','querencia','puerto-los-cabos','chileno-bay',
  'cabo-del-sol','cabo-real','fonatur','costa-palmas','el-dorado','maravilla','twin-dolphin',
  'rancho-san-lucas','club-campestre']);
// Only where the community's own proximity/description says you can walk to town.
const WALKABLE = new Set(['cabo-san-lucas','el-medano','marina-cabo','pedregal','hacienda-beach',
  'san-jose-del-cabo','la-playita','todos-santos','cerritos-beach','los-barriles']);

const out=src.map(c=>{
  const t=txt(c), am=airportMin(c), b=beach(c);
  const has=(re)=>re.test(t);
  const a={
    gated: GATED.has(c.slug),
    golf: GOLF.has(c.slug),
    walkable: WALKABLE.has(c.slug),
    marina: has(/marina/),
    nightlife: has(/nightlife|bars|clubs|party/),
    artsy: has(/art walk|galler|art district|bohemian|boho|artist/),
    quiet: has(/quiet|secluded|tranquil|peaceful|serene|off the beaten|low[- ]key|sleepy/),
    newBuild: has(/new construction|pre[- ]construction|newly built|brand[- ]new|under construction/),
    strongRental: yieldMid(c)>=90000,
    retiree: /retire|55\+|active adult|snowbird/.test(((c.demographics||'')+' '+c.lifestyleVibe).toLowerCase()),
    family: (c.schools&&c.schools.length>0)||has(/famil|kid|school/),
    remoteWork: has(/fiber|high[- ]speed internet|starlink|remote work|digital nomad/),
    medical: has(/hospital|medical center|clinic/),
    beachfront: has(/beachfront|oceanfront|beach access|on the beach/),
    luxury: c.priceRange.min>=1500000,
    entry: c.priceRange.min<=350000,
  };

  // ── honest tradeoffs, derived from real fields ──
  const tr=[];
  if(b==='surf') tr.push("The beach here isn't swimmable — strong currents make it a surf-and-walk beach.");
  else if(b==='variable') tr.push("Swim conditions vary by beach and season — worth checking the specific stretch.");
  else if(b==='none') tr.push(/hill/i.test((c.beachInfo&&c.beachInfo.swimSafety)||'')
      ? "The community sits inland on the hillside — the beach is a short drive."
      : "No beach directly on site — you'll drive to the water.");
  if(am>=45) tr.push(`It's roughly ${am} minutes from the airport — a real factor if you'll fly in often.`);
  if(!a.walkable) tr.push("You'll need a car for nearly everything — this isn't a walk-to-dinner area.");
  if(a.luxury) tr.push("Entry pricing starts high; this is a luxury tier, not a starter market.");
  if(a.gated&&a.luxury) tr.push("HOA dues and carrying costs run above the Cabo average.");
  if(a.nightlife) tr.push("It gets busy and loud in high season — great for some, not for everyone.");
  if(has(/built out|limited inventory|scarcit|rarely comes|finite/)) tr.push("Inventory is scarce — the right listing doesn't come up often.");
  if(/east cape|pacific/i.test(c.region)&&!a.medical) tr.push("Medical care and big-box shopping are a drive away.");
  if(tr.length===0) tr.push("Popular enough that the best listings move quickly.");

  return {
    slug:c.slug, name:c.name, region:c.region, tagline:c.tagline,
    vibe:c.lifestyleVibe, image:c.heroImage, coords:c.coordinates,
    price:[c.priceRange.min,c.priceRange.max],
    airportMin:am, beach:b, attrs:a,
    types:(c.propertyTypes||[]).slice(0,5),
    pros:(c.highlights||[]).slice(0,3),
    tradeoffs:tr.slice(0,3),
    unique:c.whatMakesItUnique||c.tagline,
    rental:c.rentalData||null,
    yieldMid:Math.round(yieldMid(c)),
    beachNote:(c.beachInfo&&c.beachInfo.swimSafety)||'',
  };
});

const ts=`// AUTO-GENERATED from livingincabo.com src/data/communities.ts — do not hand-edit.
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
export const COMMUNITIES: QuizCommunity[] = ${JSON.stringify(out,null,2)};
export const REGIONS = ${JSON.stringify([...new Set(out.map(c=>c.region))],null,2)};
`;
fs.writeFileSync('quiz-communities.ts',ts);
console.log('communities:',out.length);
const cnt=(k)=>out.filter(c=>c.attrs[k]).length;
console.log('gated',cnt('gated'),'| golf',cnt('golf'),'| walkable',cnt('walkable'),'| rental',cnt('rental'),'| retiree',cnt('retiree'),'| newBuild',cnt('newBuild'),'| beachfront',cnt('beachfront'));
console.log('strongRental',cnt('strongRental'));
console.log('beach:',JSON.stringify(out.reduce((m,c)=>(m[c.beach]=(m[c.beach]||0)+1,m),{})));
console.log('\nSAMPLE TRADEOFFS (todos-santos):',JSON.stringify(out.find(c=>c.slug==='todos-santos').tradeoffs,null,1));
