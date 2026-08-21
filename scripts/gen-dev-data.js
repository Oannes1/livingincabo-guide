const fs=require('fs');
const all=require('./developments.json');

const money=(n)=>n>=1e6?`$${(n/1e6).toFixed(n%1e6===0?0:1)}M`:`$${Math.round(n/1000)}K`;
const txt=(d)=>[d.name,d.tagline,d.type,(d.amenities||[]).join(' ')].join(' ').toLowerCase();

// Parse "Starting $1,700/month" / "$800-$1,200/month" -> midpoint USD/mo
const hoaMid=(d)=>{const s=d.hoaFees||'';const n=(s.match(/[\d,]+/g)||[]).map(x=>Number(x.replace(/,/g,''))).filter(x=>x>50&&x<20000);
  return n.length?Math.round((Math.max(...n)+Math.min(...n))/2):null};

const out=all.map(d=>{
  const t=txt(d);
  const has=(re)=>re.test(t);
  return {
    slug:d.slug, name:d.name, community:d.community, region:d.region, type:d.type,
    tagline:d.tagline, price:[d.priceRange.min,d.priceRange.max],
    status:d.status, delivery:d.delivery||null, developer:d.developer||null,
    units:d.units||null, bedrooms:d.bedrooms||null,
    hoa:d.hoaFees||null, hoaMid:hoaMid(d),
    website:d.website||null, image:d.image,
    amenities:(d.amenities||[]).slice(0,8),
    attrs:{
      branded: has(/four seasons|st\.? regis|aman|montage|ritz|waldorf|one&only|rosewood|park hyatt|soho|auberge|nobu|hyatt|marriott|hilton|kerzner/),
      golf: has(/golf/),
      beachfront: has(/beachfront|beach access|oceanfront|on the beach/),
      marina: has(/marina/),
      spa: has(/spa|wellness/),
      gym: has(/fitness|gym/),
      concierge: has(/concierge|resort service|rental program|turnkey/),
      pool: has(/pool/),
      petFriendly: has(/pet/),
      family: has(/kids|family|playground|playroom/),
      preConstruction: d.status==='Pre-Sale'||d.status==='Under Construction',
      moveInReady: d.status==='Move-In Ready'||d.status==='Established',
    },
  };
});

const ts=`// AUTO-GENERATED from livingincabo.com src/data/developments.ts — do not hand-edit.
// Regenerate with scripts/gen-dev-data.js
export interface QuizDevelopment {
  slug: string; name: string; community: string; region: string; type: string;
  tagline: string; price: [number, number];
  status: "Pre-Sale" | "Under Construction" | "Move-In Ready" | "Established";
  delivery: string | null; developer: string | null; units: string | null;
  bedrooms: string | null; hoa: string | null; hoaMid: number | null;
  website: string | null; image: string; amenities: string[];
  attrs: Record<string, boolean>;
}
export const DEVELOPMENTS: QuizDevelopment[] = ${JSON.stringify(out,null,2)};
export const DEVELOPERS = ${JSON.stringify([...new Set(out.map(d=>d.developer).filter(Boolean))].sort(),null,2)};
`;
fs.writeFileSync('quiz-developments.ts',ts);
const c=(k)=>out.filter(x=>x.attrs[k]).length;
console.log('developments:',out.length);
console.log('branded',c('branded'),'| golf',c('golf'),'| beachfront',c('beachfront'),'| spa',c('spa'),'| concierge',c('concierge'),'| preConstruction',c('preConstruction'),'| moveInReady',c('moveInReady'));
console.log('with hoaMid:',out.filter(x=>x.hoaMid).length,'| price range:',money(Math.min(...out.map(x=>x.price[0]))),'-',money(Math.max(...out.map(x=>x.price[1]))));
