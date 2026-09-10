"use client";

import { TESTIMONIALS, CREDENTIALS, PRESS } from "@/data/proof";

/**
 * Why you'd trust the answer.
 *
 * Every quote is a real, named review from ronival.com/testimonials and every
 * figure is sourced in src/data/proof.ts. No ghost logos, no invented
 * subscriber counts, no unattributed five stars — the fastest way to look
 * like a template is to fake the proof.
 *
 * Laid out as an asymmetric editorial block rather than a row of identical
 * cards: the credential column is the argument, the quotes are the evidence.
 */
export default function ProofSection() {
  return (
    <section className="bg-cream py-20 md:py-28">
      <div className="max-w-[1180px] mx-auto px-5 md:px-8">
        <div className="grid lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] gap-12 lg:gap-16">
          {/* the argument */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-10 bg-sand-gold-dark" />
              <p className="label-caps text-sand-gold-dark text-[11px]">Who&apos;s behind the answer</p>
            </div>

            <h2 className="heading-display text-cabo-navy text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.08] mb-6 max-w-[20ch]">
              The quiz is ours. The{" "}
              <span className="heading-editorial italic text-sand-gold-dark">market knowledge</span>{" "}
              is Ronival&apos;s.
            </h2>

            <p className="text-cabo-slate text-[16.5px] leading-relaxed max-w-[58ch] mb-10">
              Living In Cabo is built in partnership with Ronival Real Estate, founded in Cabo San
              Lucas in 2010 by Nick Fong. That partnership is the reason this quiz can tell you what
              a community gets wrong as readily as what it gets right — the shortlist is scored
              against fifteen years of transactions, not a listing feed.
            </p>

            <dl className="grid sm:grid-cols-3 gap-8 sm:gap-6 border-t border-cabo-navy/10 pt-8">
              {CREDENTIALS.map((c) => (
                <div key={c.label}>
                  <dt className="heading-display text-cabo-navy text-[clamp(2rem,4vw,2.75rem)] leading-none tabular-nums">
                    {c.figure}
                  </dt>
                  <dd className="text-cabo-slate text-[13.5px] leading-snug mt-2.5 max-w-[22ch]">
                    {c.label}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-9 pt-7 border-t border-cabo-navy/10">
              <p className="label-caps text-text-muted text-[10px] mb-3">Covered by</p>
              <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
                {PRESS.map((p) => (
                  <span
                    key={p}
                    className="heading-display text-cabo-navy/45 text-lg tracking-tight"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* the evidence */}
          <div>
            <p className="label-caps text-text-muted text-[10px] mb-5">
              From Ronival&apos;s reviews
            </p>
            <ul className="space-y-5">
              {TESTIMONIALS.slice(0, 4).map((t) => (
                <li
                  key={t.name}
                  className="bg-white rounded-[1.25rem] p-6 ring-1 ring-cabo-navy/[0.06] shadow-[0_1px_2px_rgba(10,37,64,.04),0_18px_40px_-26px_rgba(10,37,64,.25)]"
                >
                  <div aria-label="Five stars" className="flex gap-0.5 mb-3">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <svg
                        key={i}
                        viewBox="0 0 20 20"
                        className="h-3.5 w-3.5 text-sand-gold"
                        fill="currentColor"
                        aria-hidden
                      >
                        <path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L10 14.9l-5.3 2.7 1-5.8L1.5 7.7l5.9-.9z" />
                      </svg>
                    ))}
                  </div>
                  <blockquote className="text-cabo-navy text-[14.5px] leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <p className="text-text-muted text-[12.5px] mt-3">
                    {t.name}
                    {t.agent && <span className="text-cabo-slate"> · worked with {t.agent}</span>}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
