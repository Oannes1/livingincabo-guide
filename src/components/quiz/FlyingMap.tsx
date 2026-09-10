"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { BAJA_COAST } from "@/data/baja-coast";
import { COMMUNITIES } from "@/data/quiz-communities";
import type { Scored } from "@/lib/match";

/**
 * The peninsula, narrowing.
 *
 * No tile provider and no API key: the coastline is Natural Earth public
 * domain data projected ourselves, which means it renders in brand colours,
 * costs 10KB, and can never rate-limit or bill us.
 *
 * The camera flies because the viewBox is interpolated frame by frame toward
 * the bounding box of whatever still matches. SVG viewBox is not animatable
 * in CSS, so it is driven by requestAnimationFrame with an ease-out curve.
 *
 * Communities that survive the buyer's answers hold their colour and grow a
 * halo. Communities that have been ruled out do not vanish — they dim to a
 * ghost, because seeing what you excluded is the point.
 */

/* Equirectangular, x corrected by cos(lat) at the centre of the frame, which
   is accurate to a fraction of a pixel over one degree of latitude. */
const LAT0 = 23.3;
const KX = Math.cos((LAT0 * Math.PI) / 180);
const px = (lng: number) => lng * KX * 1000;
const py = (lat: number) => -lat * 1000;

interface Box { x: number; y: number; w: number; h: number }

function boxOf(points: { lat: number; lng: number }[], padRatio = 0.28): Box {
  if (!points.length) return { x: px(-110.4), y: py(23.6), w: 1000, h: 800 };
  const xs = points.map((p) => px(p.lng));
  const ys = points.map((p) => py(p.lat));
  const minX = Math.min(...xs), maxX = Math.max(...xs);
  const minY = Math.min(...ys), maxY = Math.max(...ys);
  /* Never let a single surviving community zoom to a meaningless pinpoint. */
  const w = Math.max(maxX - minX, 60);
  const h = Math.max(maxY - minY, 48);
  const padX = w * padRatio, padY = h * padRatio;
  return { x: minX - padX, y: minY - padY, w: w + padX * 2, h: h + padY * 2 };
}

/** Fit a box to the panel's aspect so nothing is squashed. */
function toAspect(b: Box, aspect: number): Box {
  const cur = b.w / b.h;
  if (cur > aspect) {
    const h = b.w / aspect;
    return { x: b.x, y: b.y - (h - b.h) / 2, w: b.w, h };
  }
  const w = b.h * aspect;
  return { x: b.x - (w - b.w) / 2, y: b.y, w, h: b.h };
}

const COAST_PATH = (() => {
  let d = "";
  BAJA_COAST.forEach(([lng, lat], i) => {
    d += `${i === 0 ? "M" : "L"}${px(lng).toFixed(1)} ${py(lat).toFixed(1)}`;
  });
  return d + "Z";
})();

const ALL_POINTS = COMMUNITIES.map((c) => ({ lat: c.coords.lat, lng: c.coords.lng }));

export default function FlyingMap({
  ranked,
  label = "Your map",
  aspect = 300 / 440,
}: {
  /** Scored communities, best first. Anything at or above the cut is "live". */
  ranked: Scored[];
  label?: string;
  aspect?: number;
}) {
  const live = useMemo(() => {
    const set = new Set(ranked.filter((r) => r.score >= 55).map((r) => r.c.slug));
    return set.size ? set : new Set(ranked.slice(0, 6).map((r) => r.c.slug));
  }, [ranked]);

  const target = useMemo(() => {
    const lead = ranked.filter((r) => live.has(r.c.slug)).slice(0, 8);
    const pts = (lead.length ? lead.map((r) => r.c) : COMMUNITIES).map((c) => ({
      lat: c.coords.lat,
      lng: c.coords.lng,
    }));
    return toAspect(boxOf(pts.length ? pts : ALL_POINTS), aspect);
  }, [ranked, live, aspect]);

  const [view, setView] = useState<Box>(() => toAspect(boxOf(ALL_POINTS), aspect));
  const raf = useRef<number | null>(null);
  const from = useRef<Box>(view);
  const t0 = useRef(0);

  useEffect(() => {
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setView(target);
      return;
    }
    from.current = view;
    t0.current = performance.now();
    const DUR = 1150;

    const step = (now: number) => {
      const p = Math.min((now - t0.current) / DUR, 1);
      const e = 1 - Math.pow(1 - p, 3); // ease-out cubic: fast away, gentle arrival
      const a = from.current;
      setView({
        x: a.x + (target.x - a.x) * e,
        y: a.y + (target.y - a.y) * e,
        w: a.w + (target.w - a.w) * e,
        h: a.h + (target.h - a.h) * e,
      });
      if (p < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
    // `view` intentionally excluded: it is the animation's own output.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target.x, target.y, target.w, target.h]);

  /* Dot and label sizes are expressed in map units, so they must scale with
     the zoom or they balloon as the camera closes in. */
  const k = view.w / 1000;
  const r = Math.max(2.6, 7 * k);

  const liveCount = COMMUNITIES.filter((c) => live.has(c.slug)).length;

  return (
    <aside
      className="relative h-full min-h-[340px] lg:min-h-full overflow-hidden rounded-[1.75rem] ring-1 ring-cabo-navy/10 shadow-[0_1px_2px_rgba(10,37,64,.04),0_24px_56px_-28px_rgba(10,37,64,.28)]"
      style={{ background: "linear-gradient(160deg, #04121F 0%, #071C30 60%, #0A2540 100%)" }}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox={`${view.x} ${view.y} ${view.w} ${view.h}`}
        preserveAspectRatio="xMidYMid slice"
        role="img"
        aria-label={`Map of Los Cabos with ${liveCount} matching communities highlighted`}
      >
        <defs>
          <radialGradient id="fm-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#C9A96E" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#C9A96E" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Land sits clearly above the water, or the peninsula reads as a
            smudge. The stroke is the shoreline, so it stays crisp at any zoom. */}
        <path
          d={COAST_PATH}
          fill="#1E4463"
          stroke="#5E93B8"
          strokeWidth={Math.max(0.8, 1.8 * k)}
          strokeLinejoin="round"
        />

        {COMMUNITIES.map((c) => {
          const on = live.has(c.slug);
          const x = px(c.coords.lng);
          const y = py(c.coords.lat);
          return (
            <g key={c.slug} style={{ transition: "opacity .55s cubic-bezier(.22,1,.36,1)" }} opacity={on ? 1 : 0.22}>
              {on && <circle cx={x} cy={y} r={r * 3.4} fill="url(#fm-halo)" />}
              <circle
                cx={x}
                cy={y}
                r={on ? r : r * 0.62}
                fill={on ? "#C9A96E" : "#5C7690"}
                stroke={on ? "#F0DCB4" : "none"}
                strokeWidth={on ? r * 0.28 : 0}
              />
            </g>
          );
        })}
      </svg>

      {/* Names are HTML, not SVG, so they never scale with the zoom. Only the
          strongest few are labelled — forty labels is a phone book. */}
      <div className="pointer-events-none absolute inset-0">
        {ranked
          .filter((s) => live.has(s.c.slug))
          .slice(0, 4)
          .map((s) => {
            const left = ((px(s.c.coords.lng) - view.x) / view.w) * 100;
            const top = ((py(s.c.coords.lat) - view.y) / view.h) * 100;
            if (left < 4 || left > 96 || top < 6 || top > 94) return null;
            return (
              <span
                key={s.c.slug}
                className="absolute -translate-x-1/2 whitespace-nowrap rounded-full bg-cabo-navy/80 px-2 py-0.5 text-[10.5px] font-medium text-white/90 ring-1 ring-sand-gold/25 backdrop-blur-sm"
                style={{ left: `${left}%`, top: `calc(${top}% + 12px)` }}
              >
                {s.c.name}
              </span>
            );
          })}
      </div>

      <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5">
        <span className="label-caps rounded-full border border-sand-gold/40 px-3 py-1 text-[10px] text-sand-gold">
          {label}
        </span>
        <span className="rounded-full bg-cabo-navy/70 px-2.5 py-1 text-[11px] tabular-nums text-white/70 backdrop-blur-sm">
          {liveCount} of 40
        </span>
      </div>
    </aside>
  );
}
