import type { Metadata } from "next";
import Link from "next/link";
import { COMMUNITIES } from "@/data/quiz-communities";
import { BEACH_COPY, money, developmentsIn } from "@/lib/guide";

export const metadata: Metadata = {
  title: { absolute: "All 40 Los Cabos neighbourhoods — honest guides | Living In Cabo" },
  description:
    "A guide to every one of the 40 Los Cabos communities we track: real price bands, swim safety, airport times, rental performance, and what you'd be trading away in each.",
  alternates: { canonical: "https://quiz.livingincabo.com/neighborhoods" },
};

/** Regions in the order a buyer would drive them, tip first. */
const ORDER = ["Cabo San Lucas", "The Corridor", "San Jose del Cabo", "East Cape", "Pacific Side"];

export default function NeighborhoodIndex() {
  const byRegion = ORDER.map((region) => ({
    region,
    items: COMMUNITIES.filter((c) => c.region === region).sort((a, b) => a.price[0] - b.price[0]),
  })).filter((g) => g.items.length);

  return (
    <div className="flex-1 bg-sand-light">
      <header className="bg-cabo-navy bg-grain py-16 md:py-24">
        <div className="max-w-[1180px] mx-auto px-5 md:px-8">
          <h1 className="heading-display text-white text-[clamp(2.4rem,6vw,4rem)] leading-[1.03] max-w-[20ch]">
            Every Los Cabos neighbourhood, honestly.
          </h1>
          <p className="text-white/70 text-lg leading-relaxed max-w-[58ch] mt-5">
            Forty communities, each with what it gets right and what it would cost you. Real price
            bands, swim safety, airport times and rental performance — our own library, not a
            listing feed.
          </p>
          <Link
            href="/quiz"
            className="inline-flex items-center gap-3 rounded-full bg-sand-gold px-7 py-3.5 font-semibold text-cabo-navy mt-8 transition-colors hover:bg-sand-gold-light"
          >
            Find which one fits you
          </Link>
        </div>
      </header>

      <div className="max-w-[1180px] mx-auto px-5 md:px-8 py-14 md:py-20 space-y-16">
        {byRegion.map((group) => (
          <section key={group.region}>
            <div className="flex items-baseline justify-between gap-4 border-b border-divider pb-3 mb-6">
              <h2 className="heading-display text-cabo-navy text-[clamp(1.6rem,3vw,2.2rem)]">
                {group.region}
              </h2>
              <span className="text-text-muted text-[13px] tabular-nums">
                {group.items.length} {group.items.length === 1 ? "community" : "communities"}
              </span>
            </div>

            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {group.items.map((c) => {
                const devs = developmentsIn(c.slug).length;
                return (
                  <li key={c.slug}>
                    <Link
                      href={`/neighborhoods/${c.slug}`}
                      className="group block h-full overflow-hidden rounded-[1.35rem] bg-white ring-1 ring-cabo-navy/[0.06] shadow-[0_1px_2px_rgba(10,37,64,.04)] transition-shadow duration-500 hover:shadow-[0_18px_40px_-24px_rgba(10,37,64,.35)]"
                    >
                      <div className="relative h-[172px] overflow-hidden">
                        <img
                          src={`/images/quiz/strip/${c.slug}.jpg`}
                          alt={c.name}
                          loading="lazy"
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.05]"
                        />
                        <div
                          aria-hidden
                          className="absolute inset-0"
                          style={{ background: "linear-gradient(to top, rgba(4,17,31,.72) 0%, rgba(4,17,31,0) 60%)" }}
                        />
                        <p className="absolute bottom-3 left-4 right-4 text-white font-semibold text-[16px] leading-tight">
                          {c.name}
                        </p>
                      </div>
                      <div className="p-4">
                        <p className="text-cabo-slate text-[13.5px] leading-snug line-clamp-2">{c.tagline}</p>
                        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-text-muted">
                          <span className="tabular-nums">{money(c.price[0])}–{money(c.price[1])}</span>
                          <span aria-hidden>·</span>
                          <span>{c.airportMin} min</span>
                          <span aria-hidden>·</span>
                          <span>{BEACH_COPY[c.beach]}</span>
                          {devs > 0 && (
                            <>
                              <span aria-hidden>·</span>
                              <span className="text-sand-gold-dark">{devs} project{devs === 1 ? "" : "s"}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
