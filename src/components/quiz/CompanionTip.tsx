"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Aaron, leaning in.
 *
 * This used to sit inline under the options, where it read as a status bar.
 * It now flies in over the corner, types itself, holds, and leaves — so the
 * buyer feels spoken to rather than reported at. On a phone it docks to the
 * bottom, where a message belongs.
 *
 * It never covers the options: on desktop it sits in the gutter beside the
 * card, on mobile it reserves its own space above the fold line.
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

const HOLD_MS = 7000;

export default function CompanionTip({ text }: { text: string }) {
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);
  const [visible, setVisible] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    if (!text) {
      setVisible(false);
      return;
    }

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    setVisible(true);
    setDone(false);

    if (reduced) {
      setTyped(text);
      setDone(true);
    } else {
      setTyped("");
      let i = 0;
      const id = window.setInterval(() => {
        i += 1;
        setTyped(text.slice(0, i));
        if (i >= text.length) {
          window.clearInterval(id);
          setDone(true);
        }
      }, 16);
      timers.current.push(id);
    }

    /* Say it, then get out of the way. */
    timers.current.push(window.setTimeout(() => setVisible(false), HOLD_MS));

    return () => {
      timers.current.forEach(clearTimeout);
      timers.current.forEach(clearInterval);
      timers.current = [];
    };
  }, [text]);

  if (!text) return null;

  return (
    <div
      className={`quip pointer-events-none z-30 ${visible ? "quip-in" : "quip-out"}`}
      role="status"
      aria-live="polite"
    >
      <div className="pointer-events-auto flex items-start gap-3 rounded-[1.15rem] bg-cabo-navy/95 backdrop-blur px-4 py-3.5 ring-1 ring-sand-gold/25 shadow-[0_18px_44px_-18px_rgba(3,14,26,.75)]">
        <span className="relative mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-sand-gold/15 ring-1 ring-sand-gold/35">
          <span className="flex items-end gap-[2px] h-3.5" aria-hidden>
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className={`w-[2px] rounded-full bg-sand-gold ${done ? "" : "wave"}`}
                style={{ height: done ? 5 : 6, animationDelay: `${i * 0.13}s` }}
              />
            ))}
          </span>
        </span>

        <div className="min-w-0 flex-1">
          <p className="label-caps text-[9px] text-sand-gold mb-1">Aaron</p>
          <p className="text-white/90 text-[13.5px] leading-relaxed">
            {typed}
            {!done && <span className="inline-block w-[6px] animate-pulse">▍</span>}
          </p>
        </div>
      </div>

      <style jsx>{`
        .quip {
          position: fixed;
          left: 1rem;
          right: 1rem;
          bottom: 1rem;
          max-width: 26rem;
          margin-inline: auto;
          transition: opacity 0.5s cubic-bezier(0.32, 0.72, 0, 1),
            transform 0.5s cubic-bezier(0.32, 0.72, 0, 1);
        }
        @media (min-width: 1024px) {
          .quip {
            left: auto;
            right: 1.75rem;
            bottom: 1.75rem;
            margin-inline: 0;
          }
        }
        .quip-in {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        .quip-out {
          opacity: 0;
          transform: translateY(14px) scale(0.97);
        }
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
          .quip {
            transition: none;
          }
          .wave {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
