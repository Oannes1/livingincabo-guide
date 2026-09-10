"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The note from Aaron that types itself out after an answer.
 *
 * It exists to make the search feel like it's tightening in real time, and
 * to teach — gently — that preferences have consequences. It never leaves
 * the buyer at a dead end: when the pool empties, the copy says how to get
 * options back.
 */

export function narrowingLine(count: number, step: number): string {
  if (!Number.isFinite(count)) return "";
  if (count === 0) {
    return "Nothing matches all of that at once yet — ease one preference and the options come straight back.";
  }
  if (count <= 4) {
    return `Down to ${count} ${count === 1 ? "community" : "communities"}. That's a real shortlist — loosen one thing if you want more to compare.`;
  }
  if (count <= 10) {
    return `${count} communities still fit everything you've picked. This is the sharp end — nice work.`;
  }
  if (step <= 2) {
    return `${count} of our 40 Cabo communities are still in play. Plenty of room to get picky.`;
  }
  return `${count} communities still fit everything so far. We can go tighter.`;
}

export default function CompanionTip({
  text,
  onDismiss,
}: {
  text: string;
  onDismiss?: () => void;
}) {
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (reduced || !text) {
      setTyped(text);
      setDone(true);
      return;
    }

    setTyped("");
    setDone(false);
    let i = 0;
    timer.current = window.setInterval(() => {
      i += 1;
      setTyped(text.slice(0, i));
      if (i >= text.length) {
        if (timer.current) window.clearInterval(timer.current);
        setDone(true);
      }
    }, 16);

    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [text]);

  if (!text) return null;

  return (
    <div
      className="mt-5 flex items-start gap-3 rounded-md border border-ocean-teal/25 bg-cream px-4 py-3.5"
      role="status"
      aria-live="polite"
    >
      <span className="relative flex-shrink-0 mt-0.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cabo-navy">
          {/* waveform — settles once the line has finished typing */}
          <span className="flex items-end gap-[2px] h-3.5" aria-hidden>
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className={`w-[2px] rounded-full bg-sand-gold ${done ? "" : "wave"}`}
                style={{
                  height: done ? 5 : 6,
                  animationDelay: `${i * 0.13}s`,
                }}
              />
            ))}
          </span>
        </span>
      </span>

      <div className="min-w-0 flex-1">
        <p className="label-caps text-[10px] text-ocean-teal mb-1">Aaron</p>
        <p className="text-cabo-navy text-sm leading-relaxed">
          {typed}
          {!done && <span className="inline-block w-[6px] animate-pulse">▍</span>}
        </p>
      </div>

      {onDismiss && (
        <button
          onClick={onDismiss}
          aria-label="Dismiss"
          className="flex-shrink-0 text-text-muted hover:text-cabo-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-sand-gold rounded"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      )}

      <style jsx>{`
        .wave {
          animation: wv 1.1s ease-in-out infinite;
        }
        @keyframes wv {
          0%,
          100% {
            height: 5px;
          }
          50% {
            height: 14px;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .wave {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
