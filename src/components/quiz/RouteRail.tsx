"use client";

/**
 * The route down the left of the quiz.
 *
 * Drawn as one continuous curved path rather than a stack of list items, so
 * it reads as a road being travelled rather than a progress bar. The stretch
 * already driven is solid; the road ahead stays dotted. The current stop
 * carries a real map pin.
 */

const STOPS = [
  "Why Cabo", "Budget", "Setting", "Vibe", "Home",
  "Stage", "Amenities", "Must-Haves", "The Closer", "Your Matches",
];

const ROW = 46;          // vertical distance between stops
const TOP = 14;          // padding above the first stop
const SWAY = 13;         // how far the road wanders left and right
const X = 24;            // centre line

const yAt = (i: number) => TOP + i * ROW;
const xAt = (i: number) => X + Math.sin(i * 0.9) * SWAY;

/** One smooth path through every stop, using midpoint quadratic curves. */
function buildPath(count: number) {
  let d = `M ${xAt(0)} ${yAt(0)}`;
  for (let i = 1; i < count; i++) {
    const px = xAt(i - 1), py = yAt(i - 1);
    const cx = xAt(i), cy = yAt(i);
    const my = (py + cy) / 2;
    d += ` C ${px} ${my}, ${cx} ${my}, ${cx} ${cy}`;
  }
  return d;
}

export default function RouteRail({ step }: { step: number }) {
  const count = STOPS.length;
  const height = TOP + (count - 1) * ROW + TOP;
  const d = buildPath(count);

  /* Fraction of the road already driven. Approximated by stop index, which
     is close enough on a path this regular and avoids measuring in JS. */
  const progress = Math.min(Math.max(step / (count - 1), 0), 1);

  return (
    <aside className="bg-white/95 rounded-[1.75rem] p-6 ring-1 ring-cabo-navy/[0.06] shadow-[0_1px_2px_rgba(10,37,64,.04),0_24px_56px_-28px_rgba(10,37,64,.28)] lg:sticky lg:top-6 h-full">
      <div className="flex items-baseline justify-between mb-4">
        <p className="label-caps text-cabo-navy text-[11px]">Your Route</p>
        <p className="label-caps text-sand-gold-dark text-[11px] tabular-nums">
          Stop {Math.min(step + 1, count)}/{count}
        </p>
      </div>

      <div className="relative" style={{ height }}>
        <svg
          className="absolute inset-0 overflow-visible"
          width="48"
          height={height}
          viewBox={`0 0 48 ${height}`}
          fill="none"
          aria-hidden
        >
          {/* road ahead */}
          <path
            d={d}
            stroke="currentColor"
            className="text-stone"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="1 7"
          />
          {/* road already driven */}
          <path
            d={d}
            stroke="currentColor"
            className="text-sand-gold"
            strokeWidth="2.5"
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1 - progress}
            style={{ transition: "stroke-dashoffset .6s cubic-bezier(.22,1,.36,1)" }}
          />
        </svg>

        {STOPS.map((label, i) => {
          const done = i < step;
          const here = i === step;
          const cx = xAt(i), cy = yAt(i);

          return (
            <div
              key={label}
              className="absolute flex items-center gap-3"
              style={{ left: 0, top: cy, transform: "translateY(-50%)" }}
            >
              <span
                className="relative flex items-center justify-center"
                style={{ width: 48, marginLeft: cx - 24 }}
              >
                {here ? (
                  /* map pin, dropped */
                  <span className="relative pin-drop">
                    <svg viewBox="0 0 24 24" className="h-7 w-7 text-cabo-navy drop-shadow" fill="currentColor" aria-hidden>
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                      <circle cx="12" cy="9" r="2.6" fill="#C9A96E" />
                    </svg>
                  </span>
                ) : done ? (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-sand-gold">
                    <svg viewBox="0 0 24 24" className="h-3 w-3 text-cabo-navy" fill="none" stroke="currentColor" strokeWidth="4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                ) : (
                  <span className="h-3.5 w-3.5 rounded-full border-2 border-stone bg-white" />
                )}
              </span>

              <span
                className={`text-[11px] uppercase tracking-[0.14em] font-semibold transition-colors whitespace-nowrap ${
                  here ? "text-cabo-navy" : done ? "text-sand-gold-dark" : "text-text-muted"
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .pin-drop {
          animation: drop 0.42s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @keyframes drop {
          from {
            opacity: 0;
            transform: translateY(-8px) scale(0.85);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .pin-drop {
            animation: none;
          }
        }
      `}</style>
    </aside>
  );
}
