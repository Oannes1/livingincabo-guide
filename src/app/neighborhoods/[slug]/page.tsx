import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ALL_SLUGS, BEACH_COPY, communityBySlug, developmentsIn,
  money, neighboursOf, summaryFor, verdictFor,
} from "@/lib/guide";
import GuideUnlock from "@/components/quiz/GuideUnlock";

/* One guide per community, generated at build time from the same records
   the quiz scores against — so a guide can never contradict the shortlist
   that sent the buyer here. */

export function generateStaticParams() {
  return ALL_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = communityBySlug(slug);
  if (!c) return { title: { absolute: "Not found | Living In Cabo" } };
  return {
    title: { absolute: `${c.name} — the honest guide | Living In Cabo` },
    description: summaryFor(c),
    alternates: { canonical: `https://quiz.livingincabo.com/neighborhoods/${slug}` },
    openGraph: { images: [`/images/quiz/guide/${slug}.jpg`], title: `${c.name}, Los Cabos` },
  };
}

export default async function NeighborhoodGuide({
  params,
}: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = communityBySlug(slug);
  if (!c) notFound();

  const devs = developmentsIn(slug);
  const near = neighboursOf(c);
  const { suits, doesNot } = verdictFor(c);

  const facts: [string, string][] = [
    ["Price band", `${money(c.price[0])} – ${money(c.price[1])}`],
    ["Airport", `${c.airportMin} min`],
    ["Beach", BEACH_COPY[c.beach]],
    ["Region", c.region],
  ];

  return (
    <article className="flex-1 bg-sand-light">
      {/* ---------- the place ---------- */}
      <header className="relative min-h-[440px] md:min-h-[560px] overflow-hidden bg-cabo-navy">
        <img
          src={`/images/quiz/guide/${slug}.jpg`}
          alt={c.name}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(4,17,31,.97) 4%, rgba(4,17,31,.74) 42%, rgba(4,17,31,.42) 78%, rgba(4,17,31,.62) 100%)",
          }}
        />
        <div className="relative max-w-[1180px] mx-auto px-5 md:px-8 pt-14 md:pt-20 pb-10">
          <Link
            href="/neighborhoods"
            className="label-caps inline-flex items-center rounded-full bg-cabo-navy/55 px-3 py-1.5 text-sand-gold text-[10px] ring-1 ring-sand-gold/25 backdrop-blur-sm transition-colors hover:bg-cabo-navy/75 hover:text-sand-gold-light focus:outline-none focus-visible:ring-2 focus-visible:ring-sand-gold"
          >
            &larr; All 40 neighbourhoods
          </Link>
          <p className="text-white/55 text-sm mt-8">{c.region}</p>
          <h1 className="heading-display text-white text-[clamp(2.6rem,7vw,4.6rem)] leading-[1.02] mt-1">
            {c.name}
          </h1>
          <p className="text-white/75 text-lg md:text-xl mt-3 max-w-[46ch]">{c.tagline}</p>

          <dl className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-[720px]">
            {facts.map(([k, v]) => (
              <div key={k} className="border-l border-sand-gold/45 pl-4">
                <dt className="label-caps text-white/45 text-[9.5px]">{k}</dt>
                <dd className="text-white text-[17px] font-semibold mt-1.5 leading-snug">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <div className="max-w-[1180px] mx-auto px-5 md:px-8 py-14 md:py-20">
        <div className="grid lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] gap-12 lg:gap-16">
          <div>
            {/* ---------- what it actually is ---------- */}
            <section>
              <h2 className="heading-display text-cabo-navy text-[clamp(1.7rem,3vw,2.4rem)] leading-tight mb-4">
                What {c.name} actually is
              </h2>
              <p className="text-cabo-slate text-[17px] leading-relaxed max-w-[62ch]">{c.unique}</p>
              <p className="text-cabo-slate text-[15.5px] leading-relaxed max-w-[62ch] mt-4">{c.vibe}.</p>
            </section>

            {/* ---------- the trade ---------- */}
            <section className="mt-12 grid sm:grid-cols-2 gap-5">
              <div className="rounded-[1.5rem] bg-white p-6 ring-1 ring-cabo-navy/[0.06]">
                <p className="label-caps text-ocean-teal text-[10px] mb-4">Why people choose it</p>
                <ul className="space-y-3">
                  {c.pros.map((p) => (
                    <li key={p} className="flex gap-2.5 text-cabo-navy text-[14.5px] leading-relaxed">
                      <span aria-hidden className="text-ocean-teal flex-shrink-0">✓</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[1.5rem] bg-cabo-navy p-6">
                <p className="label-caps text-sand-gold text-[10px] mb-4">What you&apos;d trade away</p>
                <ul className="space-y-3">
                  {c.tradeoffs.map((t) => (
                    <li key={t} className="flex gap-2.5 text-white/80 text-[14.5px] leading-relaxed">
                      <span aria-hidden className="text-sand-gold flex-shrink-0">·</span>
                      <span>{t}</span>
                    </li>
                  ))}
                  {c.beachNote && (
                    <li className="flex gap-2.5 text-white/80 text-[14.5px] leading-relaxed">
                      <span aria-hidden className="text-sand-gold flex-shrink-0">·</span>
                      <span>Water: {c.beachNote.toLowerCase()}</span>
                    </li>
                  )}
                </ul>
              </div>
            </section>

            {/* ---------- the verdict ---------- */}
            <section className="mt-12">
              <h2 className="heading-display text-cabo-navy text-[clamp(1.7rem,3vw,2.4rem)] leading-tight mb-6">
                Who it suits, and who it doesn&apos;t
              </h2>
              <div className="grid sm:grid-cols-2 gap-x-10 gap-y-6">
                <div>
                  <p className="label-caps text-text-muted text-[10px] mb-3">It fits if</p>
                  <ul className="space-y-2.5">
                    {suits.map((v) => (
                      <li key={v} className="text-cabo-slate text-[14.5px] leading-relaxed border-t border-divider pt-2.5">
                        {v}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="label-caps text-text-muted text-[10px] mb-3">Look elsewhere if</p>
                  <ul className="space-y-2.5">
                    {doesNot.map((v) => (
                      <li key={v} className="text-cabo-slate text-[14.5px] leading-relaxed border-t border-divider pt-2.5">
                        {v}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* ---------- what's being built ---------- */}
            {devs.length > 0 && (
              <section className="mt-12">
                <h2 className="heading-display text-cabo-navy text-[clamp(1.7rem,3vw,2.4rem)] leading-tight mb-2">
                  What&apos;s being built here
                </h2>
                <p className="text-cabo-slate text-[15.5px] mb-6">
                  {devs.length} {devs.length === 1 ? "project" : "projects"} we track in {c.name}.
                </p>
                <ul className="space-y-3">
                  {devs.map((d) => (
                    <li key={d.slug} className="rounded-[1.25rem] bg-white p-5 ring-1 ring-cabo-navy/[0.06]">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        <p className="font-semibold text-cabo-navy text-[15.5px]">{d.name}</p>
                        <p className="text-sand-gold-dark text-[13.5px] font-medium tabular-nums">
                          {d.price ? `${money(d.price[0])} – ${money(d.price[1])}` : "Price on request"}
                        </p>
                      </div>
                      <p className="text-cabo-slate text-[14px] mt-1.5 leading-relaxed">{d.tagline}</p>
                      <p className="text-text-muted text-[12.5px] mt-2.5">
                        {[d.status, d.delivery && `delivery ${d.delivery}`, d.developer, d.hoa && `HOA ${d.hoa}`]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          {/* ---------- the ask, and the neighbours ---------- */}
          <aside className="lg:sticky lg:top-6 self-start space-y-5">
            <GuideUnlock communityName={c.name} slug={c.slug} />

            <div className="rounded-[1.5rem] bg-white p-6 ring-1 ring-cabo-navy/[0.06]">
              <p className="label-caps text-text-muted text-[10px] mb-3">If it earns while you&apos;re away</p>
              <dl className="space-y-2.5">
                {c.rental?.avgNightlyRate && (
                  <div className="flex justify-between gap-4 text-[14px]">
                    <dt className="text-cabo-slate">Nightly</dt>
                    <dd className="text-cabo-navy font-medium text-right">{c.rental.avgNightlyRate}</dd>
                  </div>
                )}
                {c.rental?.occupancyRate && (
                  <div className="flex justify-between gap-4 text-[14px]">
                    <dt className="text-cabo-slate">Occupancy</dt>
                    <dd className="text-cabo-navy font-medium text-right">{c.rental.occupancyRate}</dd>
                  </div>
                )}
                {c.rental?.annualRevenue && (
                  <div className="flex justify-between gap-4 text-[14px]">
                    <dt className="text-cabo-slate">Annual</dt>
                    <dd className="text-cabo-navy font-medium text-right">{c.rental.annualRevenue}</dd>
                  </div>
                )}
              </dl>
              <p className="text-text-muted text-[11.5px] mt-4 leading-relaxed">
                Ranges from properties we track here. Yours depends on the specific home, how it&apos;s
                furnished and who manages it.
              </p>
            </div>

            {near.length > 0 && (
              <div className="rounded-[1.5rem] bg-cream p-6 ring-1 ring-cabo-navy/[0.06]">
                <p className="label-caps text-text-muted text-[10px] mb-3">Worth comparing</p>
                <ul className="space-y-2">
                  {near.map((n) => (
                    <li key={n.slug}>
                      <Link
                        href={`/neighborhoods/${n.slug}`}
                        className="group flex items-baseline justify-between gap-3 border-t border-divider pt-2.5"
                      >
                        <span className="text-cabo-navy text-[14.5px] font-medium group-hover:text-sand-gold-dark transition-colors">
                          {n.name}
                        </span>
                        <span className="text-text-muted text-[12.5px] tabular-nums whitespace-nowrap">
                          {money(n.price[0])}+
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </div>

      {/* ---------- back to the quiz ---------- */}
      <section className="bg-cabo-navy-deep py-16 md:py-20">
        <div className="max-w-[1180px] mx-auto px-5 md:px-8 text-center">
          <p className="heading-display text-white text-[clamp(1.6rem,3vw,2.4rem)] leading-tight max-w-[26ch] mx-auto mb-6">
            Not sure {c.name} is the one? Find out in ninety seconds.
          </p>
          <Link
            href="/quiz"
            className="inline-flex items-center gap-3 rounded-full bg-sand-gold px-8 py-4 font-semibold text-cabo-navy transition-colors hover:bg-sand-gold-light"
          >
            Take the neighbourhood quiz
          </Link>
        </div>
      </section>
    </article>
  );
}
