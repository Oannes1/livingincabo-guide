import type { Metadata } from "next";
import QuizFlow from "@/components/quiz/QuizFlow";
import HeroVideo from "@/components/quiz/HeroVideo";
import MarketTicker from "@/components/quiz/MarketTicker";
import ProofSection from "@/components/quiz/ProofSection";
import { COMMUNITIES } from "@/data/quiz-communities";
import { DEVELOPMENTS } from "@/data/quiz-developments";

export const metadata: Metadata = {
  // absolute: this subdomain is its own product, so bypass the guide title template
  title: { absolute: "Which Cabo Neighborhood Fits You? | Living In Cabo" },
  description:
    "Answer 8 questions and get an AI-analysed shortlist of Los Cabos communities and developments — matched to your budget, build stage and dealbreakers, with the honest tradeoffs most buyers only discover after they move in.",
  alternates: { canonical: "https://quiz.livingincabo.com" },
};

const NAMES = COMMUNITIES.map((c) => c.name);

export default function QuizPage() {
  return (
    <div id="top" className="flex-1 bg-sand-light">
      <section className="relative bg-cabo-navy bg-grain overflow-hidden">
        {/* Land's End from the air, golden hour. Real Cabo, not a gradient. */}
        <div className="absolute inset-x-0 top-0 h-[560px]">
          <HeroVideo />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(8,26,46,.40) 0%, rgba(9,32,54,.68) 46%, rgba(10,37,64,.97) 92%, rgba(10,37,64,1) 100%)",
            }}
          />
        </div>
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-sand-gold to-transparent" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 pt-16 pb-20 md:pt-20 md:pb-24 text-center">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-sand-gold" />
            <p className="label-caps text-sand-gold">Living In Cabo · Neighborhood Match</p>
            <div className="h-px w-8 bg-sand-gold" />
          </div>

          <h1 className="heading-display text-white leading-[1.02] mb-6 text-[clamp(2.5rem,7vw,4.75rem)]">
            Let&apos;s Find <span className="text-gradient-gold heading-editorial italic">Your Cabo</span>
          </h1>

          <p className="text-lg md:text-xl text-white/80 font-light leading-relaxed mb-4 max-w-2xl mx-auto">
            Forty communities and five completely different worlds — and the one that actually suits
            you is rarely the one you&apos;d have picked off a listing site.
          </p>
          <p className="text-white/55 text-[15px] leading-relaxed mb-10 max-w-xl mx-auto">
            Eight questions. We score every community and all 82 developments against your answers,
            then tell you what each one would cost you — not just what it gets right.
          </p>

        </div>

        <div className="relative z-10 max-w-[1180px] mx-auto px-5 md:px-8 pb-20 md:pb-24 text-left">
          <QuizFlow />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 pb-20 md:pb-24 text-center">

          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 pt-12 mt-12 border-t border-white/10">
            <Stat n="2 of 3" l="Los Cabos deals — Ronival" />
            <Divider />
            <Stat n={String(DEVELOPMENTS.length)} l="Developments tracked" />
            <Divider />
            <Stat n="33" l="Pre-construction now" />
            <Divider />
            <Stat n="90s" l="To your shortlist" />
          </div>
        </div>
      </section>

      <MarketTicker />

      <section className="py-16 md:py-20 bg-sand-light">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-3 gap-6">
            <Card n="01" t="A ranked shortlist, free and unlocked"
              b="Your top communities in order, with a match score and the reasoning behind each. No email needed to see it — it's on screen the moment you finish." />
            <Card n="02" t="What each one would cost you"
              b="The part nobody else will tell you: what you'd be trading away in each place. Higher dues, a beach you can't swim, a drive to the hospital, a street that empties in September." />
            <Card n="03" t="Where your own answers disagree"
              b="Ask Cabo for walkable and silent, or golf and a village high street, and it can't give you both. We say so while you're choosing — and tell you which one to keep." />
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
              Matched across <span className="heading-editorial italic text-sand-gold-dark">40 communities</span> and 82 developments
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

      <ProofSection />

      <section className="bg-cabo-navy bg-grain py-20 md:py-28">
        <div className="max-w-[1180px] mx-auto px-5 md:px-8">
          <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] gap-12 lg:gap-16">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-10 bg-sand-gold" />
                <p className="label-caps text-sand-gold text-[11px]">Before you start</p>
              </div>
              <h2 className="heading-display text-white text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.08] mb-5 max-w-[16ch]">
                The things people ask before they&apos;ll spend the ninety seconds.
              </h2>
              <p className="text-white/60 text-[15.5px] leading-relaxed max-w-[46ch]">
                Answered plainly, because a quiz that hides its terms is not a good start to a
                relationship that ends in a cross-border purchase.
              </p>
            </div>

            <dl className="space-y-7">
              <Faq
                q="Do I have to give my email to see the result?"
                a="No. The ranked shortlist appears on screen the moment you finish, unlocked. We ask for an email afterwards, and only for the written guide to your own three communities — the long version that doesn't fit on a results page."
              />
              <Faq
                q="Will someone call me?"
                a="Not unless you give us a number and ask for it. The phone step is separate, comes after the email, and has a skip link. Most people taking this are six months out; nobody needs a call at six months out."
              />
              <Faq
                q="Is this just a form to capture leads?"
                a="It scores your answers against 40 communities and 82 developments — real price bands, swim safety, airport times, HOA dues, build stage. That's why it can tell you what a place gets wrong. A form can't do that."
              />
              <Faq
                q="How long does it really take?"
                a="Around ninety seconds if you answer quickly, three or four minutes if you read. Eight questions. You can leave and come back — your answers are saved on this device."
              />
            </dl>
          </div>

          <div className="mt-16 pt-12 border-t border-white/10 text-center">
            <p className="heading-display text-white text-[clamp(1.6rem,3vw,2.4rem)] leading-tight mb-6 max-w-[24ch] mx-auto">
              Find out which part of Cabo is actually yours.
            </p>
            <a
              href="#top"
              className="group inline-flex items-center gap-3 rounded-full bg-sand-gold pl-7 pr-2 py-2 text-cabo-navy font-semibold transition-all duration-500 ease-[cubic-bezier(.32,.72,0,1)] hover:bg-sand-gold-dark active:scale-[.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-sand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-cabo-navy"
            >
              Start the quiz
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cabo-navy/10 transition-transform duration-500 ease-[cubic-bezier(.32,.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-[1px]">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </a>
            <p className="text-white/40 text-xs mt-4">
              Free · no account · your shortlist is yours whether or not you leave an email
            </p>
          </div>
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
function Faq({ q, a }: { q: string; a: string }) {
  return (
    <div className="border-t border-white/10 pt-6">
      <dt className="text-white font-semibold text-[16px] mb-2 leading-snug">{q}</dt>
      <dd className="text-white/60 text-[14.5px] leading-relaxed max-w-[60ch]">{a}</dd>
    </div>
  );
}
function Card({ n, t, b }: { n: string; t: string; b: string }) {
  return (<div className="bg-white p-7 rounded-md border border-stone card-hover">
    <p className="type-massive text-sand-gold text-4xl mb-3">{n}</p>
    <h3 className="heading-display text-lg text-cabo-navy mb-2 leading-snug">{t}</h3>
    <p className="text-cabo-slate text-sm leading-relaxed">{b}</p></div>);
}
