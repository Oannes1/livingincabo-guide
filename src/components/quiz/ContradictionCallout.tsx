"use client";

import type { Contradiction } from "@/lib/contradictions";

/**
 * When a buyer asks Cabo for two things it cannot give at once.
 *
 * Deliberately not styled as an error. It's Aaron leaning in with something
 * useful, and the two buttons make the trade explicit rather than silently
 * ranking one preference over the other behind their back.
 */
export default function ContradictionCallout({
  c,
  onKeep,
  onDismiss,
}: {
  c: Contradiction;
  onKeep: (which: "a" | "b") => void;
  onDismiss: () => void;
}) {
  return (
    <div
      className="mt-5 rounded-md border border-sand-gold/50 bg-white overflow-hidden shadow-sm"
      role="group"
      aria-label="Worth knowing"
    >
      <div className="bg-cabo-navy px-5 py-2.5 flex items-center gap-2">
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-sand-gold flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
        </svg>
        <p className="label-caps text-sand-gold text-[10px]">Worth knowing</p>
        <span className="ml-auto label-caps text-white/45 text-[10px] tabular-nums">
          {c.count === 0 ? "0 of 40 do both" : `${c.count} of 40 do both`}
        </span>
      </div>

      <div className="px-5 py-4">
        <p className="text-cabo-navy text-[15px] leading-relaxed mb-4">{c.message}</p>

        <p className="label-caps text-text-muted text-[10px] mb-2.5">
          Which matters more?
        </p>
        <div className="grid sm:grid-cols-2 gap-2.5">
          <button
            onClick={() => onKeep("a")}
            className="text-left px-4 py-3 rounded-md border border-stone hover:border-sand-gold hover:bg-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-sand-gold transition-colors"
          >
            <span className="block font-semibold text-cabo-navy text-sm">{c.keepA}</span>
            <span className="block text-xs text-text-muted mt-0.5">
              I&apos;ll give up {c.labelB}
            </span>
          </button>
          <button
            onClick={() => onKeep("b")}
            className="text-left px-4 py-3 rounded-md border border-stone hover:border-sand-gold hover:bg-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-sand-gold transition-colors"
          >
            <span className="block font-semibold text-cabo-navy text-sm">{c.keepB}</span>
            <span className="block text-xs text-text-muted mt-0.5">
              I&apos;ll give up {c.labelA}
            </span>
          </button>
        </div>

        <button
          onClick={onDismiss}
          className="mt-3 text-xs text-text-muted hover:text-cabo-navy focus:outline-none focus-visible:underline"
        >
          Neither — show me the compromises
        </button>
      </div>
    </div>
  );
}
