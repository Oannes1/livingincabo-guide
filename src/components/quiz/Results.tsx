"use client";

import { useState } from "react";
import type { Scored } from "@/lib/match";
import type { Answers } from "@/lib/match";
import { matchDevelopments } from "@/lib/match";

export interface AiBrief {
  headline: string;
  readMe: string;
  ranked: { slug: string; why: string[]; tradeoff: string; watchOut: string }[];
  developments: { slug: string; why: string }[];
  tension: string;
  nextStep: string;
}

const money = (n: number) =>
  n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}M` : `$${Math.round(n / 1000)}K`;

const BEACH_LABEL: Record<string, string> = {
  swimmable: "Swimmable beach",
  surf: "Surf beach (not for swimming)",
  variable: "Swim conditions vary",
  none: "No beach on site",
};

export default function Results({
  ranked, answers, firstName, brief, aiLoading,
}: {
  ranked: Scored[]; answers: Answers; firstName: string;
  brief?: AiBrief | null; aiLoading?: boolean;
}) {
  const devs = matchDevelopments(answers, ranked.slice(0, 10).map((r) => r.c.slug)).slice(0, 4);
  const aiFor = (slug: string) => brief?.ranked.find((r) => r.slug === slug);
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
        {/* Safe to promise the inbox now: the "Cabo Quiz" tag fires the
            "Cabo Quiz Nurture" Action Plan in Follow Up Boss, whose first step
            sends immediately. Note we promise the GUIDE, not "a copy of your
            shortlist" — FUB templates are static and can't list their matches. */}
        <p className="text-xs text-text-muted mt-3">
          Worth bookmarking this page. We&apos;ve also emailed you our 33-page buying guide to go
          with it, and one of our Ronival agents will follow up with what&apos;s actually on the
          market in these communities.
        </p>
      </div>

      {/* live AI brief */}
      {aiLoading && !brief && (
        <div className="bg-white rounded-md shadow-lg p-6 flex items-center gap-3">
          <span className="w-4 h-4 rounded-full border-2 border-sand-gold border-t-transparent animate-spin" />
          <p className="text-cabo-slate text-sm">
            Reading your answers against all 40 communities and 82 developments…
          </p>
        </div>
      )}

      {brief && (
        <div className="bg-cabo-navy bg-grain rounded-md p-7 md:p-9">
          <p className="label-caps text-sand-gold text-[10px] mb-3">Your analysis</p>
          <p className="heading-editorial text-xl md:text-2xl text-white italic leading-relaxed mb-4">
            {brief.headline}
          </p>
          <p className="text-white/80 leading-relaxed">{brief.readMe}</p>

          {brief.tension && (
            <div className="mt-5 bg-sunset-coral/15 border-l-4 border-sunset-coral rounded p-4">
              <p className="label-caps text-sunset-coral text-[10px] mb-1">Worth resolving</p>
              <p className="text-white/90 text-sm leading-relaxed">{brief.tension}</p>
            </div>
          )}

          {brief.nextStep && (
            <div className="mt-5 pt-5 border-t border-white/10">
              <p className="label-caps text-sand-gold text-[10px] mb-1">Do this next</p>
              <p className="text-white/90 text-sm leading-relaxed">{brief.nextStep}</p>
            </div>
          )}
        </div>
      )}

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
                {aiFor(m.c.slug) && (
                  <div className="md:col-span-2 bg-cream border-l-4 border-cabo-navy rounded-md p-4">
                    <p className="label-caps text-cabo-navy text-[10px] mb-2">Read on this one</p>
                    <ul className="space-y-1.5 mb-3">
                      {aiFor(m.c.slug)!.why.map((w, i) => (
                        <li key={i} className="text-sm text-cabo-slate flex gap-2"><span className="text-cabo-navy">→</span>{w}</li>
                      ))}
                    </ul>
                    <p className="text-sm text-cabo-slate"><strong>Watch out:</strong> {aiFor(m.c.slug)!.watchOut}</p>
                  </div>
                )}
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

      {/* matched developments */}
      {devs.length > 0 && (
        <div className="bg-white rounded-md shadow-lg p-7">
          <p className="label-caps text-sand-gold-dark mb-1">Specific projects worth a look</p>
          <p className="text-cabo-slate text-sm mb-5">
            Actual developments inside your matched areas — including what stage they&apos;re at and who&apos;s building them.
          </p>
          <div className="space-y-3">
            {devs.map((s2) => {
              const ai = brief?.developments.find((x) => x.slug === s2.d.slug);
              return (
                <div key={s2.d.slug} className="border border-stone rounded-md p-5">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="min-w-0">
                      <p className="heading-display text-lg text-cabo-navy">{s2.d.name}</p>
                      <p className="text-cabo-slate text-sm mt-0.5">{s2.d.tagline}</p>
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded flex-shrink-0 ${
                      s2.d.attrs.preConstruction ? "bg-ocean-teal text-white" : "bg-cream text-cabo-slate border border-divider"
                    }`}>
                      {s2.d.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <Tag>{money(s2.d.price[0])} – {money(s2.d.price[1])}</Tag>
                    {s2.d.delivery && <Tag>Delivery {s2.d.delivery}</Tag>}
                    {s2.d.developer && <Tag>{s2.d.developer}</Tag>}
                    {s2.d.hoa && <Tag>HOA {s2.d.hoa}</Tag>}
                  </div>
                  {ai && <p className="text-sm text-cabo-slate mt-3 italic">{ai.why}</p>}
                </div>
              );
            })}
          </div>
        </div>
      )}

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
