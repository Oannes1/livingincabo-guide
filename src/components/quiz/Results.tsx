"use client";

import { useState } from "react";
import type { Scored } from "@/lib/match";
import type { Answers } from "@/lib/match";

const money = (n: number) =>
  n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}M` : `$${Math.round(n / 1000)}K`;

const BEACH_LABEL: Record<string, string> = {
  swimmable: "Swimmable beach",
  surf: "Surf beach (not for swimming)",
  variable: "Swim conditions vary",
  none: "No beach on site",
};

export default function Results({
  ranked, answers, firstName,
}: { ranked: Scored[]; answers: Answers; firstName: string }) {
  const [open, setOpen] = useState<string | null>(ranked[0]?.c.slug ?? null);
  const top5 = ranked.slice(0, 5);
  const honorable = ranked.slice(5, 12);

  return (
    <div className="space-y-6">
      {/* headline */}
      <div className="bg-white rounded-md shadow-2xl p-7 md:p-10">
        <p className="label-caps text-sand-gold-dark mb-2">Your Matches</p>
        <h2 className="heading-display text-3xl md:text-4xl text-cabo-navy leading-tight mb-3">
          {firstName ? `${firstName}, here's your Cabo shortlist` : "Here's your Cabo shortlist"}
        </h2>
        <p className="text-cabo-slate leading-relaxed">
          We scored all 40 Los Cabos communities against your budget, setting, vibe and dealbreakers.
          Every match below shows <strong>why it fits</strong> and — just as importantly —{" "}
          <strong>what you'd be trading away</strong>. That second part is what most buyers only find out after they've closed.
        </p>
        {/* No email promise here until the "Cabo Quiz" Action Plan exists in
            Follow Up Boss — promising an inbox delivery that never arrives is
            exactly how the guide funnel lost trust. */}
        <p className="text-xs text-text-muted mt-3">
          Worth bookmarking this page. One of our Ronival agents will follow up with what&apos;s
          actually on the market in these communities.
        </p>
      </div>

      {/* ranked matches */}
      {top5.map((m, i) => {
        const isOpen = open === m.c.slug;
        return (
          <div key={m.c.slug} className="bg-white rounded-md shadow-lg overflow-hidden border border-stone">
            <button
              onClick={() => setOpen(isOpen ? null : m.c.slug)}
              className="w-full text-left p-6 flex items-start gap-4 hover:bg-cream/60 transition-colors"
            >
              <span className="type-massive text-3xl text-sand-gold leading-none w-10 flex-shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 min-w-0">
                <span className="flex items-baseline gap-3 flex-wrap">
                  <span className="heading-display text-xl md:text-2xl text-cabo-navy">{m.c.name}</span>
                  <span className="label-caps text-[10px] text-text-muted">{m.c.region}</span>
                </span>
                <span className="block text-cabo-slate text-sm mt-1">{m.c.tagline}</span>
                <span className="flex flex-wrap gap-2 mt-3">
                  <Tag>{money(m.c.price[0])} – {money(m.c.price[1])}</Tag>
                  <Tag>{BEACH_LABEL[m.c.beach]}</Tag>
                  <Tag>{m.c.airportMin} min to airport</Tag>
                  {m.c.attrs.gated && <Tag>Gated</Tag>}
                  {m.c.attrs.golf && <Tag>Golf</Tag>}
                </span>
              </span>
              <span className="text-right flex-shrink-0">
                <span className="block type-massive text-3xl text-sand-gold-dark leading-none">{m.score}%</span>
                <span className="label-caps text-[9px] text-text-muted">Match</span>
              </span>
            </button>

            {isOpen && (
              <div className="px-6 pb-6 pt-1 border-t border-divider grid md:grid-cols-2 gap-6">
                <div>
                  <p className="label-caps text-ocean-teal text-[10px] mb-3">Why it matched</p>
                  <ul className="space-y-2">
                    {[...m.reasons, ...m.c.pros].slice(0, 5).map((r, idx) => (
                      <li key={idx} className="flex gap-2 text-sm text-cabo-slate">
                        <span className="text-ocean-teal flex-shrink-0">✓</span>{r}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="label-caps text-sunset-coral text-[10px] mb-3">What you'd trade away</p>
                  <ul className="space-y-2">
                    {m.c.tradeoffs.map((t, idx) => (
                      <li key={idx} className="flex gap-2 text-sm text-cabo-slate">
                        <span className="text-sunset-coral flex-shrink-0">•</span>{t}
                      </li>
                    ))}
                    {m.misses.map((t, idx) => (
                      <li key={`m${idx}`} className="flex gap-2 text-sm text-cabo-slate">
                        <span className="text-sunset-coral flex-shrink-0">•</span>
                        Doesn&apos;t deliver: {t.toLowerCase()}
                      </li>
                    ))}
                  </ul>
                </div>
                {answers.useCase === "rental" && m.c.rental?.annualRevenue && (
                  <div className="md:col-span-2 bg-cream rounded-md p-4">
                    <p className="label-caps text-sand-gold-dark text-[10px] mb-1">Rental snapshot</p>
                    <p className="text-sm text-cabo-slate">
                      {m.c.rental.avgNightlyRate && <>Nightly {m.c.rental.avgNightlyRate}. </>}
                      {m.c.rental.occupancyRate && <>Occupancy {m.c.rental.occupancyRate}. </>}
                      {m.c.rental.annualRevenue && <>Gross annual {m.c.rental.annualRevenue}.</>}
                    </p>
                  </div>
                )}
                <div className="md:col-span-2">
                  <a
                    href={`https://livingincabo.com/communities/${m.c.slug}`}
                    className="inline-flex items-center gap-2 text-cabo-navy font-semibold text-sm hover:text-sand-gold-dark transition-colors"
                  >
                    Explore {m.c.name} →
                  </a>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* honorable mentions */}
      {honorable.length > 0 && (
        <div className="bg-white rounded-md shadow-lg p-7">
          <p className="label-caps text-sand-gold-dark mb-1">Also worth comparing</p>
          <p className="text-cabo-slate text-sm mb-5">
            These scored close behind. Buyers who search too narrowly usually miss them.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {honorable.map((m) => (
              <div key={m.c.slug} className="border border-stone rounded-md px-4 py-3 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-semibold text-cabo-navy text-sm truncate">{m.c.name}</p>
                  <p className="text-xs text-text-muted truncate">{m.c.region}</p>
                </div>
                <span className="text-sand-gold-dark font-bold text-sm flex-shrink-0">{m.score}%</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="bg-cabo-navy bg-grain rounded-md p-8 md:p-10 text-center">
        <h3 className="heading-display text-2xl md:text-3xl text-white mb-3">
          Want to walk these communities with someone who lives here?
        </h3>
        <p className="text-white/75 mb-6 max-w-xl mx-auto">
          We'll map your shortlist to actual listings on the market right now, and tell you honestly
          which of these you should skip.
        </p>
        <a
          href="https://www.livingincabo.com/contact"
          className="inline-block bg-sand-gold hover:bg-sand-gold-dark text-cabo-navy font-semibold px-8 py-4 rounded-md transition-colors"
        >
          Book a Free Cabo Strategy Call →
        </a>
      </div>
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-[11px] bg-cream text-cabo-slate border border-divider rounded-full px-2.5 py-1">
      {children}
    </span>
  );
}
