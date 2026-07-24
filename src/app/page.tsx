import GuideForm from "@/components/GuideForm";
import QuizSection from "@/components/QuizSection";
import SellerForm from "@/components/SellerForm";

const CHAPTERS = [
  { num: "01", title: "Can Americans Legally Own Property in Mexico?", desc: "The short answer is yes. The long answer is the framework that's protected over 1 million American owners since 1971." },
  { num: "02", title: "The Fideicomiso, Explained Like You're Five", desc: "The 3-party bank trust structure, what it costs, what happens if the bank fails, and why it's not a loophole." },
  { num: "03", title: "The Restricted Zone and Why It Matters", desc: "The 50-kilometer rule, where it applies, and how to navigate it as a coastal buyer." },
  { num: "04", title: "The Step-by-Step Buying Process", desc: "From accepted offer to keys in hand in 40-45 days. Every step, every document, every gotcha." },
  { num: "05", title: "Closing Costs and Fees — The Real Numbers", desc: "A full itemized breakdown of the 4-8% closing costs. No surprises at the notary's office." },
  { num: "06", title: "Where to Buy — The 5 Regions of Los Cabos", desc: "Cabo San Lucas, the Corridor, San Jose del Cabo, East Cape, and Pacific Side. Pricing, lifestyle, and who each region is for." },
  { num: "07", title: "The 10 Most Expensive Mistakes Buyers Make", desc: "Every one of them learned the hard way by someone else. Don't be the next one." },
  { num: "08", title: "What Life Actually Costs Once You Live There", desc: "The real monthly budget for a comfortable life in Cabo — housing, food, healthcare, and the gotchas nobody mentions." },
  { num: "09", title: "Myths That Cost Buyers Money", desc: "Seven stubborn misconceptions about Mexican real estate — and what's actually true." },
  { num: "10", title: "Checklists: 30-60-90 Plan + the 27-Point Pre-Offer Filter", desc: "Your purchase timeline, plus the exact 27 items our team verifies on every property before a client signs anything." },
];

const PAIN_POINTS = [
  {
    title: "You've read a dozen articles and you're more confused than when you started.",
    body: "Every travel blog says something different about fideicomisos, closing costs, and restricted zones. You need one source that actually knows.",
  },
  {
    title: "You're worried you'll get taken advantage of as a foreigner.",
    body: "The Mexican legal system has real protections for foreign buyers — but only if you know what to ask for and who to work with.",
  },
  {
    title: "You don't want to waste a trip and a small fortune figuring this out the hard way.",
    body: "The buyers who get burned are the ones who show up unprepared. This guide is the preparation.",
  },
];

const FAQS = [
  {
    q: "Can Americans and Canadians really own property in Cabo?",
    a: "Yes — 100% legally, with full rights to sell, rent, remodel, and pass to heirs. Because Los Cabos sits in Mexico's coastal \"restricted zone,\" foreigners hold title through a fideicomiso (a renewable bank trust) or a Mexican corporation. Chapters 1-3 of the guide explain both in plain English.",
  },
  {
    q: "What are closing costs in Los Cabos?",
    a: "Plan for roughly 4-8% of the purchase price, covering acquisition tax, notario fees, trust setup, escrow, and registration. Chapter 5 breaks it down line by line, in dollars.",
  },
  {
    q: "Is buying in Mexico safe?",
    a: "It is when the title is verified, the money moves through licensed escrow, and a notario publico oversees closing. Nearly every horror story traces back to skipping one of those three steps — the 27-point checklist in Chapter 10 makes sure you never do.",
  },
  {
    q: "Can I finance, or is it cash only?",
    a: "Most purchases are cash, but developer financing and cross-border mortgage options exist. The guide covers when each makes sense.",
  },
];

export default function Home() {
  return (
    <div className="flex-1 bg-sand-light">
      {/* ─── HERO with form above the fold ─── */}
      <section className="relative bg-cabo-navy bg-grain overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-sand-gold to-transparent" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 pt-16 pb-20 md:pt-20 md:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-12 items-center">
            {/* Left: pitch */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="line-accent" />
                <p className="label-caps text-sand-gold">Living In Cabo · Buyer&apos;s Guide</p>
              </div>

              <h1 className="heading-display text-4xl md:text-6xl text-white leading-[1.05] mb-6">
                Buy Your Cabo Home the{" "}
                <span className="text-gradient-gold heading-editorial italic">Safe</span> Way —
                Not the Expensive Way
              </h1>

              <p className="text-lg md:text-xl text-white/80 font-light leading-relaxed mb-8 max-w-xl">
                The No-BS Guide to Buying Property in Mexico: 33 pages covering every legal
                step, every closing cost, and every mistake buyers make — including the
                27-point pre-offer checklist we run with every client.
              </p>

              <ul className="space-y-3 mb-10">
                {[
                  ["The fideicomiso, finally explained", "how foreigners hold beachfront title and why it's safer than you think"],
                  ["True closing costs in dollars", "every fee itemized, so nothing surprises you at the notario"],
                  ["The 27-point pre-offer checklist", "including the ejido land red flags that have cost buyers everything"],
                  ["The 5 regions of Los Cabos", "what your budget buys and which region actually fits you"],
                ].map(([bold, rest]) => (
                  <li key={bold} className="flex items-start gap-3 text-white/90">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-ocean-teal flex items-center justify-center mt-0.5">
                      <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>
                      <strong className="text-white">{bold}</strong> — {rest}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Social proof bar */}
              <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-6 border-t border-white/10">
                <div>
                  <p className="type-massive text-sand-gold text-3xl">1M+</p>
                  <p className="text-white/60 text-xs uppercase tracking-wider mt-1">Americans own in Mexico</p>
                </div>
                <div className="h-10 w-px bg-white/10 hidden md:block" />
                <div>
                  <p className="type-massive text-sand-gold text-3xl">50+</p>
                  <p className="text-white/60 text-xs uppercase tracking-wider mt-1">Years of legal protection</p>
                </div>
                <div className="h-10 w-px bg-white/10 hidden md:block" />
                <div>
                  <p className="type-massive text-sand-gold text-3xl">#1</p>
                  <p className="text-white/60 text-xs uppercase tracking-wider mt-1">Brokerage partner in Baja</p>
                </div>
              </div>
            </div>

            {/* Right: the form, above the fold */}
            <div id="get-the-guide">
              <GuideForm />
            </div>
          </div>
        </div>
      </section>

      {/* ─── PAIN POINTS ─── */}
      <section className="py-20 md:py-24 bg-sand-light">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="max-w-3xl mb-14">
            <div className="flex items-center gap-3 mb-4">
              <div className="line-accent" />
              <p className="label-caps text-sand-gold-dark">The Problem</p>
            </div>
            <h2 className="heading-display text-4xl md:text-5xl text-cabo-navy leading-tight">
              Most buyers show up to Mexico with a cashier&apos;s check and a vague idea of what they&apos;re doing.
            </h2>
            <p className="text-cabo-slate mt-6 text-lg leading-relaxed">
              Then they spend the next three months learning expensive lessons the hard way. This guide is the antidote.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PAIN_POINTS.map((point, i) => (
              <div key={i} className="bg-white p-8 rounded-md border border-stone border-inset card-hover">
                <p className="type-massive text-sand-gold text-5xl mb-4">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="heading-display text-xl text-cabo-navy mb-3 leading-snug">{point.title}</h3>
                <p className="text-cabo-slate text-sm leading-relaxed">{point.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHAT'S INSIDE ─── */}
      <section className="py-20 md:py-24 bg-cream">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="max-w-3xl mb-14">
            <div className="flex items-center gap-3 mb-4">
              <div className="line-accent" />
              <p className="label-caps text-sand-gold-dark">What&apos;s Inside</p>
            </div>
            <h2 className="heading-display text-4xl md:text-5xl text-cabo-navy leading-tight">
              Ten chapters. <span className="heading-editorial italic text-sand-gold-dark">Zero fluff.</span>
            </h2>
            <p className="text-cabo-slate mt-6 text-lg leading-relaxed">
              Everything you need to know before making an offer on a property in Mexico — written by a team that has closed hundreds of these transactions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {CHAPTERS.map((chapter) => (
              <div key={chapter.num} className="flex gap-5 group">
                <div className="flex-shrink-0">
                  <p className="heading-display text-3xl text-sand-gold leading-none">{chapter.num}</p>
                </div>
                <div className="flex-1 border-t border-stone pt-2">
                  <h3 className="font-semibold text-cabo-navy mb-1 leading-snug">{chapter.title}</h3>
                  <p className="text-cabo-slate text-sm leading-relaxed">{chapter.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-14">
            <a
              href="#get-the-guide"
              className="inline-flex items-center gap-2 bg-sand-gold hover:bg-sand-gold-dark text-cabo-navy font-semibold px-8 py-4 rounded-md transition-colors shadow-xl"
            >
              Get the Free Guide
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ─── QUIZ ─── */}
      <section id="quiz" className="py-20 md:py-24 bg-cabo-navy bg-grain relative overflow-hidden">
        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="h-px w-10 bg-sand-gold" />
              <p className="label-caps text-sand-gold">The 60-Second Quiz</p>
              <div className="h-px w-10 bg-sand-gold" />
            </div>
            <h2 className="heading-display text-4xl md:text-5xl text-white leading-tight max-w-3xl mx-auto">
              Not sure where in Cabo you belong?
            </h2>
            <p className="text-white/70 text-lg mt-4 max-w-2xl mx-auto">
              Answer four questions and we&apos;ll match you with the communities that fit your
              budget, lifestyle, and timeline.
            </p>
          </div>

          <QuizSection />
        </div>
      </section>

      {/* ─── SOCIAL PROOF ─── */}
      <section className="py-20 md:py-24 bg-cream">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <div className="bg-white border border-stone rounded-md p-8 md:p-12">
            <p className="heading-editorial text-2xl md:text-3xl text-cabo-navy italic leading-relaxed mb-6">
              &ldquo;Living In Cabo partners with Ronival — the largest and most trusted real estate brokerage in Baja California Sur. Our team has guided hundreds of Americans and Canadians through the buying process in Los Cabos, and every chapter of this guide is built on what we&apos;ve seen work and what we&apos;ve seen fail.&rdquo;
            </p>
            <div className="flex items-center gap-4 pt-6 border-t border-divider">
              <div className="w-12 h-12 rounded-full bg-sand-gold flex items-center justify-center text-cabo-navy font-bold text-lg">
                LC
              </div>
              <div>
                <p className="text-cabo-navy font-semibold">Living In Cabo</p>
                <p className="text-sand-gold-dark text-sm">In partnership with Ronival Real Estate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SELLERS ─── */}
      <section id="sellers" className="py-20 md:py-24 bg-sand-warm">
        <div className="max-w-6xl mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="line-accent" />
              <p className="label-caps text-sand-gold-dark">For Cabo Homeowners</p>
            </div>
            <h2 className="heading-display text-4xl md:text-5xl text-cabo-navy leading-tight mb-6">
              Already own in Cabo? Find out what it&apos;s worth — <span className="heading-editorial italic text-sand-gold-dark">and what the taxman takes.</span>
            </h2>
            <p className="text-cabo-slate text-lg leading-relaxed mb-6">
              Get a free, no-obligation valuation of your Los Cabos property, plus what every
              foreign seller needs to know before listing:
            </p>
            <ul className="space-y-3 text-cabo-slate">
              {[
                "What buyers are paying right now in your community",
                "How Mexican capital gains tax (ISR) really works — and the legal ways sellers reduce it",
                "How to sell remotely from the US or Canada, start to finish",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-sand-gold-dark text-lg leading-6">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <SellerForm />
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-20 md:py-24 bg-sand-light">
        <div className="max-w-3xl mx-auto px-6 md:px-10">
          <div className="text-center mb-12">
            <h2 className="heading-display text-4xl md:text-5xl text-cabo-navy leading-tight">Quick answers</h2>
          </div>
          <div>
            {FAQS.map((f) => (
              <div key={f.q} className="border-b border-divider py-6">
                <h3 className="font-semibold text-cabo-navy text-lg mb-2">{f.q}</h3>
                <p className="text-cabo-slate leading-relaxed text-[15px]">{f.a}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <a
              href="#get-the-guide"
              className="inline-flex items-center gap-2 bg-cabo-navy hover:bg-cabo-navy-deep text-white font-semibold px-8 py-4 rounded-md transition-colors"
            >
              Download the Free Guide
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-cabo-navy-deep py-12">
        <div className="max-w-6xl mx-auto px-6 md:px-10 text-center">
          <p className="heading-display text-2xl text-white mb-2">Living In Cabo</p>
          <p className="text-sand-gold text-sm mb-6">In partnership with Ronival Real Estate</p>
          <div className="h-px w-24 bg-sand-gold/30 mx-auto mb-6" />
          <p className="text-white/60 text-sm mb-2">&copy; 2026 Living In Cabo. All rights reserved.</p>
          <p className="text-white/40 text-xs">
            <a href="https://livingincabo.com" className="hover:text-sand-gold transition-colors">livingincabo.com</a>
            {" · "}
            <a href="https://www.youtube.com/@livingincabo" className="hover:text-sand-gold transition-colors">YouTube</a>
          </p>
          <p className="text-white/30 text-xs mt-4 max-w-2xl mx-auto leading-relaxed">
            This site provides general information about purchasing real estate in Mexico and does not
            constitute legal, tax, or investment advice. Always confirm specifics with a licensed notario
            publico and a cross-border tax professional.
          </p>
        </div>
      </footer>
    </div>
  );
}
