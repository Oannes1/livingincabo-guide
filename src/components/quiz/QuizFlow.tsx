"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import RouteRail from "./RouteRail";
import AgentHeader from "./AgentHeader";
import VibeCard from "./VibeCard";
import CompanionTip, { narrowingLine } from "./CompanionTip";
import ContradictionCallout from "./ContradictionCallout";
import ScoringReveal from "./ScoringReveal";
import GuideOffer from "./GuideOffer";
import FlyingMap from "./FlyingMap";
import UnlockGate from "./UnlockGate";
import { findContradiction, type Contradiction } from "@/lib/contradictions";
import { track, markStepEntered, msOnStep, trackAbandonOnce } from "@/lib/analytics";
import {
  USE_CASE_VIBES, BUDGET_VIBES, SETTING_VIBES, VIBE_VIBES, TIMELINE_VIBES,
  budgetKey, pickVibe, type Vibe,
} from "@/data/quiz-vibes";
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

const WHY_NOW: Opt[] = [
  { value: "winters", icon: "\u2600\ufe0f", label: "Somewhere warm for the winters" },
  { value: "stretch", icon: "\ud83d\udcb5", label: "My money goes further here than at home" },
  { value: "family", icon: "\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67", label: "People we know already came down" },
  { value: "use-it", icon: "\ud83c\udfd6\ufe0f", label: "I want somewhere we'd actually use, not just own" },
  { value: "lifestyle", icon: "\ud83c\udf0a", label: "The life down here \u2014 water, golf, outdoors" },
  { value: "income", icon: "\ud83d\udcc8", label: "It has to earn while we're not in it" },
  { value: "youtube", icon: "\ud83d\udcfa", label: "Honestly? I got hooked on the videos" },
  { value: "curious", icon: "\ud83d\udc40", label: "Just nosy \u2014 what does my money actually buy here?" },
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
  /* Contradictions the buyer has already ruled on — never nag twice. */
  const [settled, setSettled] = useState<string[]>([]);
  const [scoring, setScoring] = useState(false);
  /* Shown once after a contradiction is settled. inPlayCount is a score
     threshold, so a re-rank does not always move the number — without this
     the buyer makes a choice and appears to get nothing back. */
  const [settledNote, setSettledNote] = useState("");
  const [captured, setCaptured] = useState<{ firstName: string; email: string } | null>(null);
  const [contactId, setContactId] = useState<number | null>(null);

  const ranked = useMemo(() => matchCommunities(a), [a]);
  const inPlay = useMemo(() => inPlayCount(a), [a]);

  /* Which panel sits beside the question. Once the buyer has told us how
     they want to spend a Saturday we keep that photograph up for the rest
     of the run — it's the most evocative thing we have on them. */
  const vibe: Vibe = useMemo(() => {
    if (step === 0) return pickVibe(USE_CASE_VIBES, a.useCase);
    if (step === 1) return pickVibe(BUDGET_VIBES, budgetKey(a.budgetMin, a.budgetMax));
    if (step === 2) return pickVibe(SETTING_VIBES, a.setting);
    if (step === 8) return pickVibe(TIMELINE_VIBES, a.timeline);
    if (a.vibe) return pickVibe(VIBE_VIBES, a.vibe);
    if (a.setting) return pickVibe(SETTING_VIBES, a.setting);
    return VIBE_VIBES.default;
  }, [step, a.useCase, a.budgetMin, a.budgetMax, a.setting, a.vibe, a.timeline]);

  const clash: Contradiction | null = useMemo(
    () => (step > 0 && step < 8 ? findContradiction(a, settled) : null),
    [a, settled, step]
  );

  const STEP_KEYS = [
    "useCase", "budget", "setting", "vibe", "homeType",
    "stage", "amenities", "mustHaves", "closer", "results",
  ];

  /* One view event per screen, plus dwell time on the next event. */
  useEffect(() => {
    if (!started) return;
    markStepEntered();
    track("question_view", { step, stepKey: STEP_KEYS[step] ?? String(step), inPlay });
    return trackAbandonOnce(step, STEP_KEYS[step] ?? String(step), inPlay);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, started]);

  const shownClashes = useRef<Set<string>>(new Set());
  useEffect(() => {
    if (!clash || shownClashes.current.has(clash.id)) return;
    shownClashes.current.add(clash.id);
    track("contradiction_shown", {
      contradictionId: clash.id,
      step,
      pairCount: clash.count,   // communities doing BOTH — not inPlay
      inPlay,
    });
  }, [clash, step, inPlay]);

  const vibeLabel =
    step === 0 ? "Why Cabo" :
    step === 1 ? "Your budget" :
    step === 2 ? "Your setting" :
    step === 8 ? "Your timeline" : "Your Cabo";
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
  const pick = (patch: Partial<Answers>) => {
    const [k, v] = Object.entries(patch)[0] ?? [];
    track("question_answer", {
      step, stepKey: STEP_KEYS[step] ?? String(step),
      answer: `${k}=${String(v)}`, msOnStep: msOnStep(), inPlay,
    });
    set(patch);
    setTimeout(next, 180);
  };

  /* Two-part screens advance once both halves are answered, in either order,
     so a single-select never behaves differently from screen to screen. */
  /* ── LIE 4 · the page promised "your shortlist stays here" while a refresh,
     a back-swipe or its own off-site CTA erased everything. Answers now
     survive all three. Rehydration runs once, before first paint of the
     intro, so a returning buyer never sees the quiz reset itself. */
  const SAVE_KEY = "lic_quiz_v1";
  const restored = useRef(false);

  useEffect(() => {
    if (restored.current) return;
    restored.current = true;
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw) as { a?: Answers; step?: number; settled?: string[] };
      if (saved.a && Object.keys(saved.a).length) {
        setA(saved.a);
        setSettled(saved.settled ?? []);
        setStep(Math.min(saved.step ?? 0, 8));
        setStarted(true);
      }
    } catch { /* corrupt or blocked storage is not worth a broken quiz */ }
  }, []);

  useEffect(() => {
    if (!restored.current || !started) return;
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify({ a, step, settled }));
    } catch { /* private mode — the quiz still works, it just won't resume */ }
  }, [a, step, settled, started]);

  const showResults = step >= 9 && unlocked && !scoring;

  /* Focus and viewport follow the question. Without this a keyboard or
     screen-reader user is dropped at the top of the document on every
     answer, and a mouse user clicks Start and sees nothing move. */
  const cardRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!started) return;
    const el = cardRef.current;
    if (!el) return;
    const h = el.querySelector<HTMLElement>("h2");
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ block: "start", behavior: reduced ? "auto" : "smooth" });
    if (h) {
      h.tabIndex = -1;
      h.focus({ preventScroll: true });
    }
  }, [step, started]);
  const pairAdvanced = useRef(false);
  const pickPair = (patch: Partial<Answers>) => {
    const [k, v] = Object.entries(patch)[0] ?? [];
    track("question_answer", {
      step, stepKey: STEP_KEYS[step] ?? String(step),
      answer: `${k}=${String(v)}`, msOnStep: msOnStep(), inPlay,
    });
    /* Advance decided OUTSIDE the updater. Scheduling it inside means React's
       dev double-invoke runs it twice and the quiz skips a stop. The ref is a
       second belt: one advance per screen, whatever the render count. */
    const merged = { ...a, ...patch };
    setA(merged);
    if (merged.buildStage && merged.hoaTolerance && !pairAdvanced.current) {
      pairAdvanced.current = true;
      setTimeout(next, 220);
    }
  };

  /* The buyer picked a side in a contradiction. We drop the losing want
     rather than silently down-weighting it — they told us plainly, so the
     shortlist should visibly change. */
  function resolveClash(which: "a" | "b") {
    if (!clash) return;
    track("contradiction_resolved", { contradictionId: clash.id, kept: which, step });
    setSettled((p) => [...p, clash.id]);

    const drop = which === "a" ? clash.labelB : clash.labelA;
    const keep = which === "a" ? clash.labelA : clash.labelB;
    setSettledNote(
      `Got it — ${keep} stays, ${drop} comes off. I've re-ranked your shortlist around that.`
    );
    window.setTimeout(() => setSettledNote(""), 9000);

    const dropMust = (m: string) =>
      setA((p) => ({ ...p, mustHaves: (p.mustHaves ?? []).filter((x) => x !== m) }));

    if (/walk/i.test(drop)) {
      dropMust("walkable");
      setA((p) => (p.setting === "walkable" ? { ...p, setting: undefined } : p));
    } else if (/golf/i.test(drop)) {
      dropMust("golf");
      setA((p) => (p.setting === "golf" ? { ...p, setting: undefined } : p));
    } else if (/gate/i.test(drop)) {
      dropMust("gated");
    } else if (/medical/i.test(drop)) {
      dropMust("medical");
    } else if (/swimmable/i.test(drop)) {
      dropMust("swimmable");
    } else if (/new construction/i.test(drop)) {
      dropMust("newBuild");
    } else if (/rental|income/i.test(drop)) {
      dropMust("rental");
    } else if (/quiet|solitude|radar/i.test(drop)) {
      setA((p) => ({
        ...p,
        vibe: p.vibe === "private" ? undefined : p.vibe,
        setting: p.setting === "offradar" ? undefined : p.setting,
      }));
    } else if (/nightlife|buzz|marina/i.test(drop)) {
      setA((p) => ({ ...p, vibe: p.vibe === "marina" ? undefined : p.vibe }));
    } else if (/art|old town/i.test(drop)) {
      setA((p) => ({ ...p, vibe: p.vibe === "artsy" ? undefined : p.vibe }));
    } else if (/surf/i.test(drop)) {
      setA((p) => ({ ...p, vibe: p.vibe === "surf" ? undefined : p.vibe }));
    }
  }

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
      </div>
    );
  }

  /* Outer shell / inner core. The card sits in a tray rather than flat on the
     ground, which is what stops it reading as a generic white rectangle. */
  const card =
    "bg-white rounded-[1.75rem] p-7 md:p-10 ring-1 ring-cabo-navy/[0.06] " +
    "shadow-[0_1px_2px_rgba(10,37,64,.04),0_24px_56px_-28px_rgba(10,37,64,.28)]";
  const optBtn =
    "w-full text-left rounded-[1.15rem] px-5 py-4 flex items-start gap-4 group " +
    "bg-white ring-1 ring-cabo-navy/[0.07] hover:ring-sand-gold/70 hover:bg-sand-gold-subtle " +
    "shadow-[0_1px_1px_rgba(10,37,64,.03)] hover:shadow-[0_6px_18px_-8px_rgba(10,37,64,.22)] " +
    "transition-all duration-500 ease-[cubic-bezier(.32,.72,0,1)] active:scale-[.99]";

  const Header = ({ stop, title, hint }: { stop: string; title: string; hint?: string }) => (
    <div className="mb-6">
      <p className="label-caps text-sand-gold-dark mb-2">{stop}</p>
      <h2 className="heading-display text-2xl md:text-3xl text-cabo-navy leading-snug">{title}</h2>
      {hint && <p className="text-cabo-slate text-sm mt-2">{hint}</p>}
    </div>
  );

  const MatchCheck = () =>
    step > 0 ? (
      <>
        <CompanionTip text={settledNote || narrowingLine(inPlay, step)} />
        {clash && (
          <ContradictionCallout
            c={clash}
            onKeep={resolveClash}
            onDismiss={() => setSettled((p) => [...p, clash.id])}
          />
        )}
      </>
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

  /* Stage one of the offer: name + email buys the written guide.
     Fires the same /api/quiz-submit the gate used to, so Follow Up Boss,
     the tags, the note and the guide email are all unchanged. */
  async function captureLead(data: { firstName: string; lastName: string; email: string }) {
    const spam = spamRef.current?.getValues() || { _website: "", _loaded: 0 };
    track("gate_submit", { topMatch: top?.c.name, topScore: top?.score });

    try {
      const r = await fetch("/api/quiz-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadType: "quiz",
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: "",
          quiz: a,
          matches: ranked.slice(0, 5).map((m) => ({ slug: m.c.slug, name: m.c.name, score: m.score })),
          _website: spam._website,
          _loaded: spam._loaded,
        }),
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok || j?.success === false) {
        return { ok: false, error: j?.error || "Something went wrong. Try once more?" };
      }
      setFirstName(data.firstName.split(" ")[0]);
      setCaptured({ firstName: data.firstName, email: data.email });
      if (typeof j?.contactId === "number") setContactId(j.contactId);
      return { ok: true };
    } catch {
      return { ok: false, error: "Couldn't reach us just then. Try once more?" };
    }
  }

  /* Stage two: the number, offered rather than demanded. Re-posts the same
     contact so Follow Up Boss dedupes by email and simply gains the phone. */
  async function addPhone(phone: string) {
    if (!captured) return;
    const spam = spamRef.current?.getValues() || { _website: "", _loaded: 0 };
    try {
      await fetch("/api/quiz-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadType: "quiz",
          firstName: captured.firstName,
          lastName: "",
          email: captured.email,
          phone,
          contactId,
          quiz: a,
          matches: ranked.slice(0, 5).map((m) => ({ slug: m.c.slug, name: m.c.name, score: m.score })),
          _website: spam._website,
          _loaded: spam._loaded,
        }),
      });
    } catch { /* the lead is already safe; the number is a bonus */ }
  }

  const input =
    "w-full px-4 py-3 border border-stone rounded-md focus:outline-none focus:border-sand-gold focus:ring-2 focus:ring-sand-gold/20 text-cabo-navy bg-white";

  return (
    <div className="max-w-[1180px] mx-auto">
      <AgentHeader />

      {/* The rail and the panel earn their space while there are questions
          left. On the results they don't: a completed rail stretched into a
          3,400px white column beside the one thing the buyer came for. */}
      <div
        className={
          showResults
            ? "grid grid-cols-1"
            : "grid lg:grid-cols-[200px_minmax(560px,1fr)_300px] gap-6 items-stretch"
        }
      >
        {!showResults && <div className="hidden lg:block"><RouteRail step={step} /></div>}

        <div ref={cardRef} className="scroll-mt-24">
          {!showResults && (
            <div className="lg:hidden mb-3 flex items-center gap-3" aria-label="Progress">
              <div className="h-1 flex-1 rounded-full bg-white/15 overflow-hidden">
                <div
                  className="h-full rounded-full bg-sand-gold transition-[width] duration-500 ease-[cubic-bezier(.22,1,.36,1)]"
                  style={{ width: `${Math.round(((step + 1) / 10) * 100)}%` }}
                />
              </div>
              <span className="label-caps text-sand-gold text-[10px] tabular-nums">Stop {step + 1}/10</span>
            </div>
          )}
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
                <button key={o.value} onClick={() => pickPair({ buildStage: o.value })}
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
                <button key={o.value} onClick={() => pickPair({ hoaTolerance: o.value })}
                  className={`text-left border rounded-md px-4 py-3 text-sm transition-colors ${
                    a.hoaTolerance === o.value ? "border-ocean-teal bg-ocean-teal/10 text-cabo-navy font-medium" : "border-stone hover:border-sand-gold text-cabo-slate"
                  }`}>
                  {o.label}
                </button>
              ))}
            </div>

            <MatchCheck />
            <button onClick={() => setStep(4)} className="mt-6 text-sm text-text-muted hover:text-cabo-navy">
              ← Back
            </button>
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

        {/* ---------- THE CLOSER ----------
             No gate here any more. The shortlist is theirs. This step earns
             the last two things worth knowing — when, and why — while they
             are at peak investment, and then we show them everything. */}
        {step === 8 && (
          <div className={card}>
            <Header
              stop="The Closer"
              title="Last two, then your shortlist."
              hint="These change how we read everything you've told us — and they're the two things I'd ask on a first call anyway."
            />

            <p className="label-caps text-text-muted text-[10px] mb-3">When would you want keys in hand?</p>
            <div className="grid sm:grid-cols-2 gap-2.5 mb-7">
              {TIMELINES.map((t) => (
                <button
                  key={t.value}
                  onClick={() => {
                    track("question_answer", { step, stepKey: "timeline", answer: t.value, msOnStep: msOnStep() });
                    set({ timeline: t.value });
                  }}
                  className={
                    "text-left px-4 py-3 rounded-md border transition-colors " +
                    (a.timeline === t.value
                      ? "border-sand-gold bg-cream"
                      : "border-stone hover:border-sand-gold/60")
                  }
                >
                  <span className="font-semibold text-cabo-navy text-sm">{t.label}</span>
                </button>
              ))}
            </div>

            <p className="label-caps text-text-muted text-[10px] mb-3">And what's really behind it?</p>
            <div className="grid gap-2.5">
              {WHY_NOW.map((o) => (
                <button
                  key={o.value}
                  onClick={() => {
                    track("question_answer", { step, stepKey: "whyNow", answer: o.value, msOnStep: msOnStep() });
                    setA((p) => ({ ...p, whyNow: o.value } as Answers));
                  }}
                  className={
                    "text-left flex items-start gap-3 px-4 py-3 rounded-md border transition-colors " +
                    ((a as Record<string, unknown>).whyNow === o.value
                      ? "border-sand-gold bg-cream"
                      : "border-stone hover:border-sand-gold/60")
                  }
                >
                  <span className="text-xl leading-none mt-0.5">{o.icon}</span>
                  <span className="font-semibold text-cabo-navy text-sm">{o.label}</span>
                </button>
              ))}
            </div>

            <button
              disabled={!a.timeline}
              onClick={() => {
                track("gate_view", { inPlay, topMatch: top?.c.name, topScore: top?.score });
                setStep(9);
              }}
              className="mt-7 w-full bg-sand-gold hover:bg-sand-gold-dark text-cabo-navy font-semibold py-4 rounded-md transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {a.timeline ? "See my matches \u2192" : "Pick a timeline to finish"}
            </button>

            <button onClick={() => setStep(7)} className="mt-5 text-sm text-text-muted hover:text-cabo-navy">
              &larr; Back
            </button>
          </div>
        )}

        {/* ---------- THE GATE ----------
             Reversed on 2026-09-10. The shortlist used to be free and the
             email was earned afterwards. The call now is that a buyer who
             will not leave a name and an email is not a lead, and the data
             is the point of the exercise. They still see their strongest
             match first, so the trade is visible before it is asked for. */}
        {step === 9 && !unlocked && !scoring && (
          <UnlockGate
            top={top}
            remaining={Math.max(0, Math.min(ranked.length, 5) - 1)}
            onUnlock={captureLead}
            onDone={() => {
              setScoring(true);
              track("scoring_started", { inPlay, topMatch: top?.c.name, topScore: top?.score });
            }}
          />
        )}

        {/* ---------- THE REVEAL ---------- */}
        {step === 9 && scoring && (
          <ScoringReveal
            finalCount={Math.max(1, inPlay)}
            onDone={() => {
              setScoring(false);
              setUnlocked(true);
              track("result_view", { topMatch: top?.c.name, topScore: top?.score, inPlay });
              /* The written analysis fills in behind the shortlist. A failure
                 here must never hold up the result. */
              setAiLoading(true);
              fetch("/api/ai-brief", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ answers: a }),
              })
                .then((r) => r.json())
                .then((j) => { if (j?.ok && j.brief) setBrief(j.brief as AiBrief); })
                .catch(() => {})
                .finally(() => setAiLoading(false));
            }}
          />
        )}

        {step >= 9 && unlocked && !scoring && (
          <>
            <Results ranked={ranked} answers={a} firstName={firstName} brief={brief} aiLoading={aiLoading} />
            <GuideOffer
              topNames={ranked.slice(0, 3).map((m) => m.c.name)}
              firstName={firstName}
              onPhone={addPhone}
            />
          </>
        )}
        </div>

        {/* On desktop this is the third column; on mobile the grid collapses
            and it lands directly under the question, which is where it wants
            to be on a phone anyway. */}
        {!showResults && (
          <div className="lg:sticky lg:top-6 lg:self-stretch">
            {step >= 2 ? (
              <FlyingMap ranked={ranked} label={step === 8 ? "Your shortlist" : "Still in play"} />
            ) : (
              <VibeCard vibe={vibe} label={vibeLabel} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
