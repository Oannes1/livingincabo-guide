import type { Metadata } from "next";
import QuizFlow from "@/components/quiz/QuizFlow";
import { COMMUNITIES } from "@/data/quiz-communities";

export const metadata: Metadata = {
  // absolute: this subdomain is its own product, so bypass the guide title template
  title: { absolute: "Which Cabo Neighborhood Fits You? | Living In Cabo" },
  description:
    "Answer 6 quick questions and get a ranked shortlist of Los Cabos communities matched to your budget, setting and dealbreakers — plus the honest tradeoffs most buyers only discover after they move in.",
  alternates: { canonical: "https://quiz.livingincabo.com" },
};

const NAMES = COMMUNITIES.map((c) => c.name);

export default function QuizPage() {
  return (
    <div className="flex-1 bg-sand-light">
      <section className="relative bg-cabo-navy bg-grain overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-sand-gold to-transparent" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 pt-16 pb-20 md:pt-20 md:pb-24 text-center">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-sand-gold" />
            <p className="label-caps text-sand-gold">Living In Cabo · Neighborhood Match</p>
            <div className="h-px w-8 bg-sand-gold" />
          </div>

          <h1 className="heading-display text-4xl md:text-6xl text-white leading-[1.05] mb-6">
            Let&apos;s Find <span className="text-gradient-gold heading-editorial italic">Your Cabo</span>
          </h1>

          <p className="text-lg md:text-xl text-white/80 font-light leading-relaxed mb-10 max-w-2xl mx-auto">
            Answer six quick questions and get a ranked shortlist of Los Cabos communities matched to your
            budget, setting, and dealbreakers — plus the local tradeoffs most buyers only discover after
            they&apos;ve already bought.
          </p>

          <QuizFlow />

          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 pt-12 mt-12 border-t border-white/10">
            <Stat n="40" l="Communities scored" />
            <Divider />
            <Stat n="5" l="Regions covered" />
            <Divider />
            <Stat n="60s" l="To your shortlist" />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-sand-light">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-3 gap-6">
            <Card n="01" t="A real match engine, not a personality quiz"
              b="Your dealbreakers are protected first, then budget, setting, vibe and property type are weighted together — the same way we'd shortlist for a client in person." />
            <Card n="02" t="Scored against real community data"
              b="Every match runs against our own enriched records for 40 Los Cabos communities: real price bands, swim safety, airport times, security reality, and rental performance." />
            <Card n="03" t="The tradeoffs, not just the highlights"
              b="Each match tells you what you'd be giving up — the beach that isn't swimmable, the 50-minute airport run, the community you'll need a car to live in." />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-cream overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="max-w-3xl mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="line-accent" />
              <p className="label-caps text-sand-gold-dark">Coverage</p>
            </div>
            <h2 className="heading-display text-3xl md:text-4xl text-cabo-navy leading-tight">
              Matched across <span className="heading-editorial italic text-sand-gold-dark">40 communities</span> in Los Cabos
            </h2>
            <p className="text-cabo-slate mt-4 text-lg">
              From downtown Cabo San Lucas to the East Cape and the Pacific side — every match is scored against
              our own community library, not generic listing data.
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="flex gap-3 animate-marquee whitespace-nowrap w-max">
            {[...NAMES, ...NAMES].map((n, i) => (
              <span key={i} className="inline-block flex-shrink-0 bg-white border border-stone rounded-full px-5 py-2 text-sm text-cabo-slate">
                {n}
              </span>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-cream to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-cream to-transparent" />
        </div>
      </section>

      <footer className="bg-cabo-navy-deep py-10 text-center">
        <p className="heading-display text-xl text-white mb-1">Living In Cabo</p>
        <p className="text-sand-gold text-sm mb-4">In partnership with Ronival Real Estate</p>
        <p className="text-white/40 text-xs max-w-2xl mx-auto px-6 leading-relaxed">
          Match results are guidance based on your answers and our community research — not legal, tax, or
          investment advice. Always confirm specifics with a licensed notario público and a cross-border tax professional.
        </p>
      </footer>
    </div>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (<div><p className="type-massive text-sand-gold text-3xl">{n}</p>
    <p className="text-white/60 text-xs uppercase tracking-wider mt-1">{l}</p></div>);
}
function Divider() { return <div className="h-10 w-px bg-white/10 hidden md:block" />; }
function Card({ n, t, b }: { n: string; t: string; b: string }) {
  return (<div className="bg-white p-7 rounded-md border border-stone card-hover">
    <p className="type-massive text-sand-gold text-4xl mb-3">{n}</p>
    <h3 className="heading-display text-lg text-cabo-navy mb-2 leading-snug">{t}</h3>
    <p className="text-cabo-slate text-sm leading-relaxed">{b}</p></div>);
}
