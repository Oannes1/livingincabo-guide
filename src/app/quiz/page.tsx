import type { Metadata } from "next";
import QuizFlow from "@/components/quiz/QuizFlow";
import HeroVideo from "@/components/quiz/HeroVideo";
import MarketTicker from "@/components/quiz/MarketTicker";
import ProofSection from "@/components/quiz/ProofSection";
import Triptych from "@/components/quiz/Triptych";
import Filmstrip from "@/components/quiz/Filmstrip";
import Objections from "@/components/quiz/Objections";
import { DEVELOPMENTS } from "@/data/quiz-developments";

export const metadata: Metadata = {
  // absolute: this subdomain is its own product, so bypass the guide title template
  title: { absolute: "Which Cabo Neighborhood Fits You? | Living In Cabo" },
  description:
    "Answer 8 questions and get an AI-analysed shortlist of Los Cabos communities and developments — matched to your budget, build stage and dealbreakers, with the honest tradeoffs most buyers only discover after they move in.",
  alternates: { canonical: "https://quiz.livingincabo.com" },
};


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

          <p className="text-lg md:text-xl text-white/80 font-light leading-relaxed mb-10 max-w-xl mx-auto">
            Forty communities, five different worlds. The one that suits you is rarely the one a
            listing site would show you.
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

      <Triptych />
      <Filmstrip />
      <ProofSection />
      <Objections />

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
