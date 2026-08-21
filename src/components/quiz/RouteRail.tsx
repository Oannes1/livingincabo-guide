"use client";

const STOPS = [
  "Why Cabo", "Budget", "Setting", "Vibe", "Home",
  "Stage", "Amenities", "Must-Haves", "The Closer", "Your Matches",
];

export default function RouteRail({ step }: { step: number }) {
  return (
    <aside className="bg-white/95 backdrop-blur border border-stone rounded-md p-5 lg:sticky lg:top-6">
      <div className="flex items-baseline justify-between mb-5">
        <p className="label-caps text-cabo-navy text-[11px]">Your Route</p>
        <p className="label-caps text-sand-gold-dark text-[11px]">
          Stop {Math.min(step + 1, STOPS.length)}/{STOPS.length}
        </p>
      </div>

      <ol className="relative">
        {STOPS.map((label, i) => {
          const done = i < step;
          const here = i === step;
          return (
            <li key={label} className="relative flex items-center gap-3 pb-5 last:pb-0">
              {/* dotted route line */}
              {i < STOPS.length - 1 && (
                <span
                  aria-hidden
                  className={`absolute left-[9px] top-5 h-full border-l-2 border-dotted ${
                    done ? "border-sand-gold" : "border-stone"
                  }`}
                />
              )}
              {/* map pin */}
              <span
                className={`relative z-10 flex-shrink-0 w-5 h-5 rounded-full border-2 transition-all duration-300 ${
                  here
                    ? "bg-cabo-navy border-cabo-navy scale-110 shadow-lg"
                    : done
                    ? "bg-sand-gold border-sand-gold"
                    : "bg-white border-stone"
                }`}
              >
                {done && (
                  <svg viewBox="0 0 24 24" className="w-full h-full p-[3px] text-cabo-navy" fill="none" stroke="currentColor" strokeWidth="4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
                {here && <span className="absolute inset-0 rounded-full bg-cabo-navy animate-ping opacity-40" />}
              </span>
              <span
                className={`text-[11px] uppercase tracking-[0.14em] font-semibold transition-colors ${
                  here ? "text-cabo-navy" : done ? "text-sand-gold-dark" : "text-text-muted"
                }`}
              >
                {label}
              </span>
            </li>
          );
        })}
      </ol>
    </aside>
  );
}
