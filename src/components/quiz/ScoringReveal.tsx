"use client";

import { useEffect, useRef, useState } from "react";
import { COMMUNITIES } from "@/data/quiz-communities";

/**
 * The two and a half seconds between the last answer and the shortlist.
 *
 * The match itself computes in about four milliseconds. That is a problem:
 * a result that arrives instantly reads as a lookup, and a buyer who has
 * just spent ninety seconds answering deserves to see the machine think.
 *
 * So this is a performance — but an honest one. Every community name that
 * flashes past is really in the dataset and really was scored, and the
 * criteria tick off in the same order the engine actually applies them.
 * We are dramatising real work, not inventing it.
 */

const CRITERIA = [
  "Reading your dealbreakers",
  "Filtering on budget overlap",
  "Weighting setting and vibe",
  "Checking beach and airport times",
  "Scoring rental performance",
  "Ranking your shortlist",
];

export default function ScoringReveal({
  finalCount,
  onDone,
  durationMs = 2500,
}: {
  finalCount: number;
  onDone: () => void;
  durationMs?: number;
}) {
  const [name, setName] = useState(COMMUNITIES[0]?.name ?? "");
  const [crit, setCrit] = useState(0);
  const [count, setCount] = useState(COMMUNITIES.length);
  const done = useRef(false);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      const t = window.setTimeout(onDone, 400);
      return () => window.clearTimeout(t);
    }

    const started = Date.now();
    const total = COMMUNITIES.length;

    const flick = window.setInterval(() => {
      setName(COMMUNITIES[Math.floor(Math.random() * total)].name);
    }, 90);

    const tick = window.setInterval(() => {
      const p = Math.min((Date.now() - started) / durationMs, 1);
      // Ease out so the count decelerates into its final value rather
      // than stopping dead.
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(total - (total - finalCount) * eased));
      setCrit(Math.min(CRITERIA.length - 1, Math.floor(p * CRITERIA.length)));

      if (p >= 1 && !done.current) {
        done.current = true;
        window.clearInterval(flick);
        window.clearInterval(tick);
        setCount(finalCount);
        window.setTimeout(onDone, 260);
      }
    }, 60);

    return () => {
      window.clearInterval(flick);
      window.clearInterval(tick);
    };
  }, [finalCount, onDone, durationMs]);

  return (
    <div className="bg-cabo-navy rounded-md p-8 md:p-12 text-center overflow-hidden relative">
      <p className="label-caps text-sand-gold text-[10px] mb-8">Scoring your answers</p>

      <div className="mb-8">
        <p className="type-massive text-6xl md:text-7xl text-white leading-none tabular-nums">
          {count}
        </p>
        <p className="label-caps text-white/45 text-[10px] mt-3">
          communities still standing
        </p>
      </div>

      {/* the reel of real community names */}
      <div className="h-7 mb-8 overflow-hidden">
        <p className="font-mono text-sm text-sand-gold/75 truncate">{name}</p>
      </div>

      <ul className="max-w-xs mx-auto text-left space-y-2">
        {CRITERIA.map((c, i) => (
          <li key={c} className="flex items-center gap-2.5">
            <span
              className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                i <= crit ? "bg-sand-gold" : "bg-white/12"
              }`}
            >
              {i <= crit && (
                <svg viewBox="0 0 24 24" className="h-2.5 w-2.5 text-cabo-navy" fill="none" stroke="currentColor" strokeWidth="4" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </span>
            <span
              className={`text-xs transition-colors duration-300 ${
                i <= crit ? "text-white/80" : "text-white/28"
              }`}
            >
              {c}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
