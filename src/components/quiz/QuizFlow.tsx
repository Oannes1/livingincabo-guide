"use client";

import { useMemo, useRef, useState } from "react";
import RouteRail from "./RouteRail";
import SpamFields, { type SpamFieldsRef } from "../SpamFields";
import { matchCommunities, inPlayCount, type Answers } from "@/lib/match";
import Results, { type AiBrief } from "./Results";

const money = (n: number) =>
  n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}M` : `$${Math.round(n / 1000)}K`;

type Opt = { value: string; label: string; sub?: string; icon?: string };

const Q = {
  useCase: {
    stop: "Why Cabo",
    title: "What's actually bringing you to Cabo?",
    hint: "This shapes everything else — a rental buyer and a retiree get different answers.",
    opts: [
      { value: "retire", icon: "🌅", label: "Retiring or semi-retiring here", sub: "Full or part-time, sun year round" },
      { value: "second-home", icon: "🏖️", label: "A second home we escape to", sub: "Ours whenever we want it" },
      { value: "rental", icon: "📈", label: "Investment and rental income", sub: "Appreciation plus nightly returns" },
      { value: "relocate", icon: "✈️", label: "Moving here full time", sub: "Work, life, the whole thing" },
    ] as Opt[],
  },
  setting: {
    stop: "Setting",
    title: "Where do you picture yourself waking up?",
    hint: "Cabo is five very different worlds. Pick the one that pulls at you.",
    opts: [
      { value: "beachfront", icon: "🌊", label: "Steps from the sand", sub: "Beach out the door" },
      { value: "walkable", icon: "🚶", label: "Walk to dinner and coffee", sub: "Town at your feet, no car needed" },
      { value: "golf", icon: "⛳", label: "Inside a golf and beach club", sub: "Gates, greens, and service" },
      { value: "hillside", icon: "🏔️", label: "Up high with the big view", sub: "Hillside, ocean panorama" },
      { value: "offradar", icon: "🌵", label: "Somewhere quieter, off the radar", sub: "Space, stars, fewer people" },
    ] as Opt[],
  },
  vibe: {
    stop: "Vibe",
    title: "Your perfect Saturday in Cabo looks like…",
    hint: "Be honest, not aspirational. The match is better when you are.",
    opts: [
      { value: "marina", icon: "🛥️", label: "Marina, boats, dinner out, some nightlife" },
      { value: "resort", icon: "⛳", label: "Golf in the morning, beach club after" },
      { value: "artsy", icon: "🎨", label: "Art walk, farm-to-table, old town streets" },
      { value: "surf", icon: "🏄", label: "Surf at dawn, tacos, barefoot all day" },
      { value: "private", icon: "🔒", label: "Nobody around. Pool, book, total quiet" },
    ] as Opt[],
  },
  homeType: {
    stop: "Home",
    title: "What kind of place are you picturing?",
    hint: "You can change your mind later — this just tunes the shortlist.",
    opts: [
      { value: "condo", icon: "🏢", label: "Lock-and-leave condo", sub: "Zero maintenance when you're away" },
      { value: "villa", icon: "🏡", label: "Single-family home or villa", sub: "Space, privacy, your own pool" },
      { value: "estate", icon: "🏛️", label: "Estate or trophy property", sub: "Best of the best" },
      { value: "branded", icon: "🛎️", label: "Branded residence", sub: "Hotel service, rental program" },
      { value: "land", icon: "📐", label: "Land — I want to build", sub: "Exactly what I want" },
    ] as Opt[],
  },
} as const;

const BUILD_STAGE: Opt[] = [
  { value: "presale", icon: "📐", label: "Pre-construction", sub: "Best pricing and unit choice, you wait for it" },
  { value: "underConstruction", icon: "🏗️", label: "Under construction", sub: "Going up now, delivery in sight" },
  { value: "ready", icon: "🔑", label: "Move-in ready", sub: "Walk it, buy it, use it this season" },
  { value: "any", icon: "🤷", label: "Open to any of it", sub: "Show me the best fit regardless" },
];

const HOA: Opt[] = [
  { value: "low", label: "Keep it lean — under ~$500/mo" },
  { value: "medium", label: "Mid — up to ~$1,200/mo is fine" },
  { value: "high", label: "Don't care — I want the services" },
  { value: "dontcare", label: "Not sure yet" },
];

const AMENITIES: Opt[] = [
  { value: "branded", icon: "🛎️", label: "Branded operator (Four Seasons, Aman, St. Regis…)" },
  { value: "spa", icon: "💆", label: "Spa and wellness on site" },
  { value: "golf", icon: "⛳", label: "Golf on site" },
  { value: "marina", icon: "🛥️", label: "Marina access" },
  { value: "concierge", icon: "🧾", label: "Concierge and a rental program" },
  { value: "family", icon: "👨‍👩‍👧", label: "Kids and family facilities" },
  { value: "pool", icon: "🏊", label: "Serious pool situation" },
  { value: "gym", icon: "🏋️", label: "Real fitness center" },
];

const MUSTS: Opt[] = [
  { value: "gated", icon: "🔒", label: "Gated with real security" },
  { value: "swimmable", icon: "🏊", label: "A genuinely swimmable beach" },
  { value: "walkable", icon: "🚶", label: "Walk to restaurants and shops" },
  { value: "golf", icon: "⛳", label: "Golf on site" },
  { value: "rental", icon: "💰", label: "Strong rental income" },
  { value: "newBuild", icon: "🔨", label: "New construction" },
  { value: "airport", icon: "✈️", label: "Close to the airport" },
  { value: "medical", icon: "🏥", label: "Quality medical care nearby" },
];

const BUDGETS = [
  { min: 0, max: 400_000, label: "Under $400K", tier: "Entry" },
  { min: 400_000, max: 700_000, label: "$400K – $700K", tier: "Mid" },
  { min: 700_000, max: 1_200_000, label: "$700K – $1.2M", tier: "Upper" },
  { min: 1_200_000, max: 3_000_000, label: "$1.2M – $3M", tier: "Luxury" },
  { min: 3_000_000, max: 50_000_000, label: "$3M+", tier: "Trophy" },
  { min: 0, max: 50_000_000, label: "No limit — show me everything", tier: "🤑" },
];

const TIMELINES: Opt[] = [
  { value: "0-6", label: "Within 6 months" },
  { value: "6-12", label: "6–12 months" },
  { value: "12plus", label: "1–2 years" },
  { value: "dreaming", label: "Just exploring for now" },
];

export default function QuizFlow() {
  const spamRef = useRef<SpamFieldsRef>(null);
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [a, setA] = useState<Answers>({});
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [brief, setBrief] = useState<AiBrief | null>(null);
  const [aiLoading, setAiLoading] = useState(false);

  const ranked = useMemo(() => matchCommunities(a), [a]);
  const inPlay = useMemo(() => inPlayCount(a), [a]);
  const top = ranked[0];

  const set = (patch: Partial<Answers>) => setA((p) => ({ ...p, ...patch }));
  /* Functional updater: two fast clicks must not compute from stale state,
     otherwise a dealbreaker silently disappears — and dealbreakers carry the
     heaviest weight in the match. */
  const toggleAmenity = (v: string) =>
    setA((p) => {
      const cur = p.amenities ?? [];
      return { ...p, amenities: cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v] };
    });
  const toggleMust = (v: string) =>
    setA((p) => {
      const cur = p.mustHaves ?? [];
      return { ...p, mustHaves: cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v] };
    });
  const next = () => setStep((s) => s + 1);
  const pick = (patch: Partial<Answers>) => { set(patch); setTimeout(next, 180); };

  /* ---------------- intro ---------------- */
  if (!started) {
    return (
      <div className="max-w-3xl mx-auto text-center">
        <button
          onClick={() => setStarted(true)}
          className="inline-flex items-center gap-2 bg-sand-gold hover:bg-sand-gold-dark text-cabo-navy font-semibold px-10 py-5 rounded-md transition-colors shadow-xl text-lg"
        >
          Start the Quiz — 90 Seconds
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
        <p className="text-white/60 text-sm mt-4">Free · No account · 8 questions, then your AI-analysed shortlist</p>
      </div>
    );
  }

  const card = "bg-white rounded-md shadow-2xl p-7 md:p-10";
  const optBtn =
    "w-full text-left border border-stone rounded-md px-5 py-4 hover:border-sand-gold hover:bg-sand-gold-subtle transition-colors flex items-start gap-4 group";

  const Header = ({ stop, title, hint }: { stop: string; title: string; hint?: string }) => (
    <div className="mb-6">
      <p className="label-caps text-sand-gold-dark mb-2">{stop}</p>
      <h2 className="heading-display text-2xl md:text-3xl text-cabo-navy leading-snug">{title}</h2>
      {hint && <p className="text-cabo-slate text-sm mt-2">{hint}</p>}
    </div>
  );

  const MatchCheck = () =>
    step > 0 && inPlay > 0 ? (
      <div className="mt-6 bg-cream border-l-4 border-ocean-teal rounded-md px-5 py-3">
        <p className="label-caps text-ocean-teal text-[10px] mb-1">Match Check</p>
        <p className="text-cabo-navy text-sm">
          <strong>{inPlay}</strong> of 40 Cabo communities are still in play
          {step < 5 ? " — plenty of room to get picky." : " — dialing in."}
        </p>
      </div>
    ) : null;

  const Choice = ({ q, onPick }: { q: { stop: string; title: string; hint: string; opts: readonly Opt[] }; onPick: (v: string) => void }) => (
    <div className={card}>
      <Header stop={q.stop} title={q.title} hint={q.hint} />
      <div className="grid gap-3">
        {q.opts.map((o) => (
          <button key={o.value} onClick={() => onPick(o.value)} className={optBtn}>
            <span className="text-2xl leading-none mt-0.5">{o.icon}</span>
            <span>
              <span className="block font-semibold text-cabo-navy">{o.label}</span>
              {o.sub && <span className="block text-sm text-cabo-slate mt-0.5">{o.sub}</span>}
            </span>
          </button>
        ))}
      </div>
      <MatchCheck />
      {step > 0 && (
        <button onClick={() => setStep((s) => s - 1)} className="mt-6 text-sm text-text-muted hover:text-cabo-navy">
          ← Back
        </button>
      )}
    </div>
  );

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true); setErr("");
    const fd = new FormData(e.currentTarget);
    const spam = spamRef.current?.getValues() || { _website: "", _loaded: 0 };
    const name = String(fd.get("firstName") || "").trim();
    const payload = {
      leadType: "quiz",
      firstName: name,
      lastName: String(fd.get("lastName") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      phone: String(fd.get("phone") || "").trim(),
      quiz: { ...a, timeline: String(fd.get("timeline") || "") },
      matches: ranked.slice(0, 5).map((m) => ({ slug: m.c.slug, name: m.c.name, score: m.score })),
      _website: spam._website,
      _loaded: spam._loaded,
    };
    if (!payload.firstName || !payload.email) {
      setBusy(false); setErr("First name and email are required."); return;
    }
    try {
      const r = await fetch("/api/quiz-submit", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload),
      });
      if (!r.ok) throw new Error((await r.json().catch(() => ({}))).error || "Something went wrong.");
      setFirstName(name.split(" ")[0]);
      setUnlocked(true);
      setStep(9);

      // Live AI brief. Runs after unlock so the buyer sees results immediately
      // and the analysis fills in; a failure here never blocks the results.
      setAiLoading(true);
      fetch("/api/ai-brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: { ...a, timeline: String(fd.get("timeline") || "") } }),
      })
        .then((r) => r.json())
        .then((j) => { if (j?.ok && j.brief) setBrief(j.brief as AiBrief); })
        .catch(() => {})
        .finally(() => setAiLoading(false));
    } catch (e2) {
      setErr(e2 instanceof Error ? e2.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  const input =
    "w-full px-4 py-3 border border-stone rounded-md focus:outline-none focus:border-sand-gold focus:ring-2 focus:ring-sand-gold/20 text-cabo-navy bg-white";

  return (
    <div className="grid lg:grid-cols-[240px_1fr] gap-6 max-w-5xl mx-auto">
      <div className="hidden lg:block"><RouteRail step={step} /></div>

      <div>
        {step === 0 && <Choice q={Q.useCase} onPick={(v) => pick({ useCase: v })} />}

        {step === 1 && (
          <div className={card}>
            <Header stop="Budget" title="What's your honest budget?" hint="All-in purchase price in USD. Closing costs run 4–8% on top." />
            <div className="grid gap-3">
              {BUDGETS.map((b) => (
                <button
                  key={b.label}
                  onClick={() => pick({ budgetMin: b.min, budgetMax: b.max })}
                  className={optBtn + " justify-between items-center"}
                >
                  <span className="font-semibold text-cabo-navy">{b.label}</span>
                  <span className="label-caps text-sand-gold-dark text-[10px]">{b.tier}</span>
                </button>
              ))}
            </div>
            <MatchCheck />
            <button onClick={() => setStep(0)} className="mt-6 text-sm text-text-muted hover:text-cabo-navy">← Back</button>
          </div>
        )}

        {step === 2 && <Choice q={Q.setting} onPick={(v) => pick({ setting: v })} />}
        {step === 3 && <Choice q={Q.vibe} onPick={(v) => pick({ vibe: v })} />}
        {step === 4 && <Choice q={Q.homeType} onPick={(v) => pick({ homeType: v })} />}

        {step === 5 && (
          <div className={card}>
            <Header stop="Stage" title="New build, or something you can use this season?"
              hint="This is the single biggest fork in Cabo right now — 33 of the projects we track are still pre-construction." />
            <div className="grid gap-3">
              {BUILD_STAGE.map((o) => (
                <button key={o.value} onClick={() => set({ buildStage: o.value })}
                  className={`${optBtn} ${a.buildStage === o.value ? "border-ocean-teal bg-ocean-teal/10" : ""}`}>
                  <span className="text-2xl leading-none mt-0.5">{o.icon}</span>
                  <span>
                    <span className="block font-semibold text-cabo-navy">{o.label}</span>
                    {o.sub && <span className="block text-sm text-cabo-slate mt-0.5">{o.sub}</span>}
                  </span>
                </button>
              ))}
            </div>

            <p className="label-caps text-sand-gold-dark mt-7 mb-3 text-[11px]">And the monthly carry?</p>
            <div className="grid sm:grid-cols-2 gap-2">
              {HOA.map((o) => (
                <button key={o.value} onClick={() => set({ hoaTolerance: o.value })}
                  className={`text-left border rounded-md px-4 py-3 text-sm transition-colors ${
                    a.hoaTolerance === o.value ? "border-ocean-teal bg-ocean-teal/10 text-cabo-navy font-medium" : "border-stone hover:border-sand-gold text-cabo-slate"
                  }`}>
                  {o.label}
                </button>
              ))}
            </div>

            <MatchCheck />
            <div className="flex items-center gap-3 mt-6">
              <button onClick={() => setStep(4)} className="text-sm text-text-muted hover:text-cabo-navy">← Back</button>
              <button onClick={next} disabled={!a.buildStage}
                className="ml-auto bg-cabo-navy hover:bg-cabo-navy-deep text-white font-semibold px-7 py-3 rounded-md transition-colors disabled:opacity-40">
                Continue →
              </button>
            </div>
          </div>
        )}

        {step === 6 && (
          <div className={card}>
            <Header stop="Amenities" title="What do you actually want on site?"
              hint="Pick what you'd genuinely use. This is matched against 82 real Los Cabos developments." />
            <div className="grid sm:grid-cols-2 gap-3">
              {AMENITIES.map((m) => {
                const on = (a.amenities ?? []).includes(m.value);
                return (
                  <button key={m.value} onClick={() => toggleAmenity(m.value)}
                    className={`text-left border rounded-md px-4 py-3 flex items-center gap-3 transition-colors ${
                      on ? "border-ocean-teal bg-ocean-teal/10" : "border-stone hover:border-sand-gold"
                    }`}>
                    <span className="text-xl">{m.icon}</span>
                    <span className="font-medium text-cabo-navy text-sm">{m.label}</span>
                    {on && <span className="ml-auto text-ocean-teal font-bold">✓</span>}
                  </button>
                );
              })}
            </div>
            <MatchCheck />
            <div className="flex items-center gap-3 mt-6">
              <button onClick={() => setStep(5)} className="text-sm text-text-muted hover:text-cabo-navy">← Back</button>
              <button onClick={next} className="ml-auto bg-cabo-navy hover:bg-cabo-navy-deep text-white font-semibold px-7 py-3 rounded-md transition-colors">
                Continue →
              </button>
            </div>
          </div>
        )}

        {step === 7 && (
          <div className={card}>
            <Header stop="Must-Haves" title="What are your actual dealbreakers?" hint="Pick as many as truly matter. These get weighted hardest — we protect them first." />
            <div className="grid sm:grid-cols-2 gap-3">
              {MUSTS.map((m) => {
                const on = (a.mustHaves ?? []).includes(m.value);
                return (
                  <button
                    key={m.value}
                    onClick={() => toggleMust(m.value)}
                    className={`text-left border rounded-md px-4 py-3 flex items-center gap-3 transition-colors ${
                      on ? "border-ocean-teal bg-ocean-teal/10" : "border-stone hover:border-sand-gold"
                    }`}
                  >
                    <span className="text-xl">{m.icon}</span>
                    <span className="font-medium text-cabo-navy text-sm">{m.label}</span>
                    {on && <span className="ml-auto text-ocean-teal font-bold">✓</span>}
                  </button>
                );
              })}
            </div>
            <MatchCheck />
            <div className="flex items-center gap-3 mt-6">
              <button onClick={() => setStep(6)} className="text-sm text-text-muted hover:text-cabo-navy">← Back</button>
              <button
                onClick={next}
                className="ml-auto bg-cabo-navy hover:bg-cabo-navy-deep text-white font-semibold px-7 py-3 rounded-md transition-colors"
              >
                See my matches →
              </button>
            </div>
          </div>
        )}

        {/* ---------- THE CLOSER: tease #1, gate the rest ---------- */}
        {step === 8 && (
          <div className={card}>
            <p className="label-caps text-sand-gold-dark mb-2">The Closer</p>
            <h2 className="heading-display text-2xl md:text-3xl text-cabo-navy leading-snug mb-1">
              Your matches are ready.
            </h2>
            <p className="text-cabo-slate text-sm mb-6">
              We scored all 40 Los Cabos communities against your answers. Here's your top one:
            </p>

            {top && (
              <div className="relative overflow-hidden rounded-md border-2 border-sand-gold bg-cream p-6 mb-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="label-caps text-sand-gold-dark text-[10px] mb-1">Your #1 Match</p>
                    <p className="heading-display text-2xl text-cabo-navy">{top.c.name}</p>
                    <p className="text-cabo-slate text-sm mt-1">{top.c.tagline}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="type-massive text-4xl text-sand-gold-dark leading-none">{top.score}%</p>
                    <p className="label-caps text-[10px] text-text-muted mt-1">Match</p>
                  </div>
                </div>
              </div>
            )}

            <div className="relative mb-6">
              <div className="grid gap-2 blur-[5px] select-none pointer-events-none" aria-hidden>
                {ranked.slice(1, 5).map((m) => (
                  <div key={m.c.slug} className="flex justify-between border border-stone rounded px-4 py-3">
                    <span className="font-semibold text-cabo-navy">{m.c.name}</span>
                    <span className="text-sand-gold-dark font-bold">{m.score}%</span>
                  </div>
                ))}
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-cabo-navy text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg">
                  🔒 Your other {Math.min(4, Math.max(0, ranked.length - 1))} matches + honest tradeoffs
                </span>
              </div>
            </div>

            <form onSubmit={submit}>
              <SpamFields ref={spamRef} />
              <p className="text-sm text-cabo-slate mb-4">
                Tell us where to send the full ranked list — including what's <em>wrong</em> with each community, not just what's right.
              </p>
              <div className="grid sm:grid-cols-2 gap-3 mb-3">
                <input name="firstName" placeholder="First name *" required autoComplete="given-name" className={input} />
                <input name="lastName" placeholder="Last name" autoComplete="family-name" className={input} />
              </div>
              <input name="email" type="email" placeholder="Email *" required autoComplete="email" className={input + " mb-3"} />
              <input name="phone" type="tel" placeholder="Phone (optional)" autoComplete="tel" className={input + " mb-3"} />
              <select name="timeline" defaultValue="" required className={input + " mb-4"}>
                <option value="" disabled>When would you want keys in hand? *</option>
                {TIMELINES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>

              {err && (
                <div className="mb-4 p-3 bg-sunset-coral/10 border-l-4 border-sunset-coral rounded text-sunset-coral text-sm">{err}</div>
              )}

              <button
                type="submit"
                disabled={busy}
                className="w-full bg-sand-gold hover:bg-sand-gold-dark text-cabo-navy font-semibold py-4 rounded-md transition-colors disabled:opacity-60"
              >
                {busy ? "Scoring your matches…" : "Unlock My Full Match Report →"}
              </button>
              <p className="text-xs text-text-muted text-center mt-3">No spam. Unsubscribe anytime.</p>
            </form>

            <button onClick={() => setStep(7)} className="mt-5 text-sm text-text-muted hover:text-cabo-navy">← Back</button>
          </div>
        )}

        {step >= 9 && unlocked && (
          <Results ranked={ranked} answers={a} firstName={firstName} brief={brief} aiLoading={aiLoading} />
        )}
      </div>
    </div>
  );
}
