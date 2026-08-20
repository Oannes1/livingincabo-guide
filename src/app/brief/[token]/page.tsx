import { notFound } from "next/navigation";
import { readBrief } from "@/lib/brief-token";
import { matchCommunities, type Answers } from "@/lib/match";
import CopyButton from "@/components/quiz/CopyButton";

export const metadata = {
  title: { absolute: "Lead Brief | Living In Cabo" },
  robots: { index: false, follow: false },
};

const LABEL: Record<string, Record<string, string>> = {
  useCase: { retire: "Retiring / semi-retiring", "second-home": "Second home", rental: "Investment & rental income", relocate: "Full relocation" },
  setting: { beachfront: "Steps from the sand", walkable: "Walk to town", golf: "Golf & beach club", hillside: "Hillside view", offradar: "Quiet / off the radar" },
  vibe: { marina: "Marina & nightlife", resort: "Golf then beach club", artsy: "Art walk & farm-to-table", surf: "Surf, barefoot", private: "Total quiet" },
  homeType: { condo: "Lock-and-leave condo", villa: "Home / villa", estate: "Estate / trophy", branded: "Branded residence", land: "Land to build" },
  timeline: { "0-6": "Within 6 months", "6-12": "6–12 months", "12plus": "1–2 years", dreaming: "Just exploring" },
  must: { gated: "Gated security", swimmable: "Swimmable beach", walkable: "Walkable", golf: "Golf on site", rental: "Rental income", newBuild: "New construction", airport: "Close to airport", medical: "Medical nearby" },
};
const money = (n?: number) => (n == null ? "?" : n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(1)}M` : `$${Math.round(n / 1000)}K`);

export default async function BriefPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const b = readBrief(decodeURIComponent(token));
  if (!b) notFound();

  const q = b.quiz as Answers & { timeline?: string };
  const ranked = matchCommunities(q);
  const top = ranked[0];
  const musts = (q.mustHaves ?? []) as string[];
  const name = [b.firstName, b.lastName].filter(Boolean).join(" ");
  const urgent = q.timeline === "0-6";

  const summary =
    `${name} is ${LABEL.useCase[q.useCase ?? ""]?.toLowerCase() ?? "exploring Cabo"}, ` +
    `budget ${money(q.budgetMin)}–${money(q.budgetMax)}, ` +
    `wants ${LABEL.setting[q.setting ?? ""]?.toLowerCase() ?? "a good fit"}` +
    `${musts.length ? ` with ${musts.map((m) => (LABEL.must[m] ?? m).toLowerCase()).join(" and ")} as dealbreakers` : ""}. ` +
    `${top ? `Strongest match is ${top.c.name} at ${top.score}%. ` : ""}` +
    `Timeline: ${(LABEL.timeline[q.timeline ?? ""] ?? "unknown").toLowerCase()}. ` +
    `${top ? "Open there — say why it fit, then ask what would make them rule it out." : ""}`;

  const firstText =
    `Hi ${b.firstName}, it's Aaron from Living in Cabo. I went through your neighborhood quiz results — ` +
    `${top ? `${top.c.name} came back as your strongest match` : "a few communities came back strong"}` +
    `${musts.length ? `, mostly because you flagged ${(LABEL.must[musts[0]] ?? musts[0]).toLowerCase()} as a must-have` : ""}. ` +
    `No rush at all, but I can send over what's actually on the market there whenever you want a look.`;

  return (
    <div className="min-h-screen bg-sand-light py-8 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <p className="label-caps text-sand-gold-dark text-[11px] mb-4">Living In Cabo · Lead Brief</p>

        {/* 3-second summary */}
        <div className="bg-cabo-navy rounded-md p-6 md:p-8 mb-5">
          <p className="label-caps text-sand-gold text-[10px] mb-3">3-Second Summary · keep this open during your call</p>
          <p className="text-white text-lg md:text-xl leading-relaxed">{summary}</p>
        </div>

        {/* identity + actions */}
        <div className="bg-white rounded-md border border-stone p-6 mb-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="heading-display text-3xl text-cabo-navy">{name}</h1>
                {urgent && <span className="bg-sunset-coral text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">Hot · 6 months</span>}
              </div>
              <p className="text-cabo-slate text-sm mt-1">
                {b.email}{b.phone ? ` · ${b.phone}` : ""} · submitted {new Date(b.at).toLocaleString()}
              </p>
            </div>
            {top && (
              <div className="text-right">
                <p className="type-massive text-4xl text-sand-gold-dark leading-none">{top.score}%</p>
                <p className="label-caps text-[10px] text-text-muted">Top match</p>
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-2 mt-5">
            {b.phone && <A href={`tel:${b.phone}`}>Call</A>}
            {b.phone && <A href={`sms:${b.phone}`}>Text</A>}
            <A href={`mailto:${b.email}`}>Email</A>
          </div>
        </div>

        {/* fact strip */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-5">
          <Fact k="Timeline" v={LABEL.timeline[q.timeline ?? ""] ?? "—"} />
          <Fact k="Why Cabo" v={LABEL.useCase[q.useCase ?? ""] ?? "—"} />
          <Fact k="Budget" v={`${money(q.budgetMin)}–${money(q.budgetMax)}`} />
          <Fact k="Top match" v={top ? top.c.name : "—"} />
          <Fact k="#1 dealbreaker" v={musts.length ? LABEL.must[musts[0]] ?? musts[0] : "none"} />
        </div>

        {/* what they told us */}
        <Panel title="What they told us">
          <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
            <Row k="Why Cabo" v={LABEL.useCase[q.useCase ?? ""] ?? "—"} />
            <Row k="Budget" v={`${money(q.budgetMin)} – ${money(q.budgetMax)}`} />
            <Row k="Setting" v={LABEL.setting[q.setting ?? ""] ?? "—"} />
            <Row k="Vibe" v={LABEL.vibe[q.vibe ?? ""] ?? "—"} />
            <Row k="Home type" v={LABEL.homeType[q.homeType ?? ""] ?? "—"} />
            <Row k="Timeline" v={LABEL.timeline[q.timeline ?? ""] ?? "—"} />
            <Row k="Dealbreakers" v={musts.length ? musts.map((m) => LABEL.must[m] ?? m).join(", ") : "none given"} />
            <Row k="Phone" v={b.phone || "not provided"} />
          </dl>
        </Panel>

        {/* matches */}
        <Panel title="Top matches — why, and what to raise">
          <div className="space-y-5">
            {ranked.slice(0, 5).map((m, i) => (
              <div key={m.c.slug} className="border border-divider rounded-md p-5">
                <div className="flex items-baseline justify-between gap-3 mb-3">
                  <p className="heading-display text-lg text-cabo-navy">
                    {i + 1}. {m.c.name}
                    <span className="text-text-muted text-xs font-normal ml-2">· {m.c.region}</span>
                  </p>
                  <span className="text-sand-gold-dark font-bold">{m.score}%</span>
                </div>
                <p className="text-xs text-text-muted mb-3">
                  {money(m.c.price[0])}–{money(m.c.price[1])} · {m.c.airportMin} min to airport · {m.c.beachNote || "—"}
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="label-caps text-ocean-teal text-[10px] mb-2">Why it matched</p>
                    <ul className="space-y-1.5">
                      {[...m.reasons, ...m.c.pros].slice(0, 4).map((r, j) => (
                        <li key={j} className="text-sm text-cabo-slate flex gap-2"><span className="text-ocean-teal">✓</span>{r}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="label-caps text-sunset-coral text-[10px] mb-2">Tradeoffs to raise</p>
                    <ul className="space-y-1.5">
                      {m.c.tradeoffs.map((t, j) => (
                        <li key={j} className="text-sm text-cabo-slate flex gap-2"><span className="text-sunset-coral">•</span>{t}</li>
                      ))}
                      {m.misses.slice(0, 2).map((t, j) => (
                        <li key={`x${j}`} className="text-sm text-cabo-slate flex gap-2">
                          <span className="text-sunset-coral">•</span>Missing their must-have: {t.toLowerCase()}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                {q.useCase === "rental" && m.c.rental?.annualRevenue && (
                  <p className="text-xs text-cabo-slate mt-3 bg-cream rounded px-3 py-2">
                    Rental: {m.c.rental.avgNightlyRate}/night · {m.c.rental.occupancyRate} occupancy · {m.c.rental.annualRevenue}/yr gross
                  </p>
                )}
              </div>
            ))}
          </div>
        </Panel>

        {ranked.length > 5 && (
          <Panel title="Honorable mentions">
            <div className="grid sm:grid-cols-2 gap-2">
              {ranked.slice(5, 12).map((m) => (
                <div key={m.c.slug} className="flex justify-between border border-divider rounded px-3 py-2">
                  <span className="text-sm text-cabo-navy">{m.c.name}</span>
                  <span className="text-sm text-sand-gold-dark font-semibold">{m.score}%</span>
                </div>
              ))}
            </div>
          </Panel>
        )}

        <Panel title="Suggested first text">
          <p className="text-cabo-slate text-sm leading-relaxed bg-cream rounded-md p-4 mb-3">{firstText}</p>
          <CopyButton text={firstText} />
        </Panel>

        <p className="text-xs text-text-muted text-center py-6">
          Living In Cabo · private link, don&apos;t forward outside your team.
        </p>
      </div>
    </div>
  );
}

function A({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="bg-cabo-navy hover:bg-cabo-navy-deep text-white text-sm font-semibold px-5 py-2.5 rounded-md transition-colors">
      {children}
    </a>
  );
}
function Fact({ k, v }: { k: string; v: string }) {
  return (
    <div className="bg-white border border-stone rounded-md p-3">
      <p className="label-caps text-[9px] text-text-muted mb-1">{k}</p>
      <p className="text-sm font-semibold text-cabo-navy leading-snug">{v}</p>
    </div>
  );
}
function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-divider pb-2">
      <dt className="text-xs uppercase tracking-wider text-text-muted">{k}</dt>
      <dd className="text-sm text-cabo-navy font-medium text-right">{v}</dd>
    </div>
  );
}
function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="bg-white rounded-md border border-stone p-6 mb-5">
      <h2 className="label-caps text-sand-gold-dark mb-4">{title}</h2>
      {children}
    </section>
  );
}
