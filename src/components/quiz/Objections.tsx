import Reveal from "./Reveal";

/**
 * The four things people ask before they'll spend the ninety seconds.
 *
 * Vertical stack, not a split header: one message per section. Sits over the
 * tail of a photograph so the page never drops back to flat navy, and hands
 * off directly to the final ask.
 */
const FAQ = [
  {
    q: "Do I have to give my email?",
    a: "For the full ranked list, yes. You see your strongest match and its score before we ask, so you can judge the answer first. The email also brings the written guide to your top three.",
  },
  {
    q: "Will someone call me?",
    a: "Not unless you leave a number and ask for it. That step is separate, comes after the email, and has a skip link. Most people taking this are six months out.",
  },
  {
    q: "Is this just a form to capture leads?",
    a: "It scores your answers against 40 communities and 82 developments. Real price bands, swim safety, airport times, HOA dues. That's why it can tell you what a place gets wrong.",
  },
  {
    q: "How long does it really take?",
    a: "Ninety seconds if you answer quickly, three or four minutes if you read. Eight questions. Leave and come back; your answers are saved on this device.",
  },
];

export default function Objections() {
  return (
    <section className="relative bg-cabo-navy-deep overflow-hidden">
      <img
        src="/images/quiz/land/el-dorado.jpg"
        alt="El Dorado Golf & Beach Club at dusk"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover object-center opacity-[0.28]"
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(4,17,31,.55) 0%, rgba(4,17,31,.9) 55%, rgba(4,17,31,1) 100%)",
        }}
      />

      <div className="relative max-w-[1180px] mx-auto px-5 md:px-8 py-16 md:py-24">
        <Reveal>
          <h2 className="heading-display text-white text-[clamp(2rem,4.2vw,3.4rem)] leading-[1.04] tracking-[-0.01em] max-w-[18ch] mb-10 md:mb-14">
            Asked before starting, answered before you have to.
          </h2>
        </Reveal>

        <dl className="grid md:grid-cols-2 gap-x-12 gap-y-8 max-w-[980px]">
          {FAQ.map((f, i) => (
            <Reveal key={f.q} delay={i * 80}>
              <div className="border-t border-white/12 pt-5">
                <dt className="text-white font-semibold text-[16.5px] leading-snug mb-2">{f.q}</dt>
                <dd className="text-white/62 text-[14.5px] leading-relaxed">{f.a}</dd>
              </div>
            </Reveal>
          ))}
        </dl>

        <Reveal delay={200}>
          <div className="mt-16 md:mt-20 pt-12 border-t border-white/10">
            <p className="heading-display text-white text-[clamp(1.8rem,3.4vw,2.7rem)] leading-tight max-w-[22ch] mb-7">
              Find out which part of Cabo is actually yours.
            </p>
            <a
              href="#top"
              className="group inline-flex items-center gap-3 rounded-full bg-sand-gold pl-7 pr-2 py-2 text-cabo-navy font-semibold transition-all duration-500 ease-[cubic-bezier(.32,.72,0,1)] hover:bg-sand-gold-light active:scale-[.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-sand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-cabo-navy-deep"
            >
              Start the quiz
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cabo-navy/10 transition-transform duration-500 ease-[cubic-bezier(.32,.72,0,1)] group-hover:translate-x-0.5">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
