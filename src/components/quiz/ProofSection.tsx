import { TESTIMONIALS, CREDENTIALS, PRESS } from "@/data/proof";
import Reveal from "./Reveal";

/**
 * Why you'd trust the answer.
 *
 * Two movements. First, the credentials set into a single full-bleed
 * photograph, the numbers doing the talking. Second, the reviews as an
 * editorial quote rail rather than a column of white cards.
 *
 * Every quote is real and named, verbatim from ronival.com/testimonials,
 * trimmed to fit in a glance. Every figure is sourced in src/data/proof.ts.
 */
export default function ProofSection() {
  return (
    <section className="bg-cabo-navy">
      {/* the argument, in the landscape */}
      <div className="relative min-h-[520px] md:min-h-[600px] overflow-hidden">
        <img
          src="/images/quiz/land/twin-dolphin-club.jpg"
          alt="Twin Dolphin, the corridor between Cabo San Lucas and San José"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(10,37,64,.94) 0%, rgba(10,37,64,.86) 38%, rgba(10,37,64,.35) 72%, rgba(10,37,64,.15) 100%)",
          }}
        />
        <div className="relative max-w-[1180px] mx-auto px-5 md:px-8 py-16 md:py-24">
          <Reveal>
            <h2 className="heading-display text-white text-[clamp(2rem,4.2vw,3.4rem)] leading-[1.04] tracking-[-0.01em] max-w-[16ch] mb-5">
              The quiz is ours. The market knowledge is Ronival&apos;s.
            </h2>
            <p className="text-white/70 text-[16px] leading-relaxed max-w-[52ch] mb-10">
              Living In Cabo is built with Ronival Real Estate, founded in Cabo San Lucas in 2010 by
              Nick Fong. That partnership is why the shortlist can tell you what a community gets
              wrong as readily as what it gets right.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <dl className="grid grid-cols-1 sm:grid-cols-3 gap-7 sm:gap-5 max-w-[720px]">
              {CREDENTIALS.map((c) => (
                <div key={c.label} className="border-l border-sand-gold/50 pl-4">
                  <dt className="heading-display text-white text-[clamp(2.2rem,4.4vw,3rem)] leading-none tabular-nums">
                    {c.figure}
                  </dt>
                  <dd className="text-white/60 text-[13px] leading-snug mt-2 max-w-[20ch]">{c.label}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-9 text-white/40 text-[12.5px]">
              Covered by {PRESS.join(" · ")}
            </p>
          </Reveal>
        </div>
      </div>

      {/* the evidence */}
      <div className="max-w-[1180px] mx-auto px-5 md:px-8 py-14 md:py-20">
        <div className="grid md:grid-cols-3 gap-x-10 gap-y-10">
          {TESTIMONIALS.slice(0, 3).map((t, i) => (
            <Reveal key={t.name} delay={i * 90}>
              <figure className="border-t border-white/12 pt-6">
                <blockquote className="heading-display text-white text-[1.3rem] md:text-[1.42rem] leading-[1.3]">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-4 text-white/50 text-[13px]">
                  <span className="text-sand-gold">{t.name}</span> · {t.role}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
