"use client";

import { MARKET } from "@/data/proof";

/**
 * The market, moving.
 *
 * Sits directly under the hero as the first thing after the headline. Its job
 * is to answer "why now" with facts instead of a fake countdown — a buyer who
 * learns that inventory runs 22–45 months and closings take 2–4 has just been
 * told, truthfully, that six months out is exactly the right time to start.
 *
 * Duplicated once and translated by half its own width, so the loop is
 * seamless regardless of how many entries there are. Pauses on hover so a
 * figure can actually be read, and stops entirely under reduced motion.
 */
export default function MarketTicker() {
  const row = [...MARKET, ...MARKET];

  return (
    <div className="relative overflow-hidden border-y border-white/[0.09] bg-cabo-navy-deep/60 py-3.5">
      <div className="ticker flex w-max items-center gap-10 px-6">
        {row.map((m, i) => (
          <span key={i} className="flex items-baseline gap-2.5 whitespace-nowrap">
            <span className="font-semibold text-sand-gold text-[15px] tabular-nums">
              {m.figure}
            </span>
            <span className="text-white/45 text-[12.5px]">{m.label}</span>
            <span aria-hidden className="ml-6 h-1 w-1 rounded-full bg-white/20" />
          </span>
        ))}
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-24"
        style={{ background: "linear-gradient(to right, #071729, rgba(7,23,41,0))" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-24"
        style={{ background: "linear-gradient(to left, #071729, rgba(7,23,41,0))" }}
      />

      <style jsx>{`
        .ticker {
          animation: slide 44s linear infinite;
        }
        .ticker:hover {
          animation-play-state: paused;
        }
        @keyframes slide {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .ticker {
            animation: none;
            flex-wrap: wrap;
            width: auto;
          }
        }
      `}</style>
    </div>
  );
}
