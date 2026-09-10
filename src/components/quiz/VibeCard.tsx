"use client";

import { useEffect, useRef, useState } from "react";
import type { Vibe } from "@/data/quiz-vibes";

/**
 * The panel beside the question. It rewrites itself every time the buyer
 * answers — new gradient, new headline, and where the answer has a place
 * attached to it, a photograph of that place fading in behind.
 *
 * The image crossfade is done with two stacked layers rather than swapping
 * one src, so the buyer never sees a flash of empty box while the new
 * photograph decodes.
 */
export default function VibeCard({
  vibe,
  label = "Your Cabo",
}: {
  vibe: Vibe;
  label?: string;
}) {
  const [shown, setShown] = useState<Vibe>(vibe);
  const [prevImage, setPrevImage] = useState<string | null>(null);
  const [imageReady, setImageReady] = useState(true);
  const firstRun = useRef(true);

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      setShown(vibe);
      return;
    }
    if (vibe.image && vibe.image !== shown.image) {
      /* Hold the outgoing photo underneath until the incoming one has
         actually decoded, then drop it. */
      setPrevImage(shown.image ?? null);
      setImageReady(false);
      const img = new Image();
      img.src = vibe.image;
      const done = () => {
        setImageReady(true);
        window.setTimeout(() => setPrevImage(null), 420);
      };
      img.decode ? img.decode().then(done).catch(done) : (img.onload = done);
    }
    setShown(vibe);
  }, [vibe, shown.image]);

  return (
    <aside
      className="relative overflow-hidden rounded-md min-h-[340px] lg:min-h-[440px] flex flex-col justify-end p-6 lg:p-7 transition-[background] duration-700"
      style={{ background: shown.gradient }}
    >
      {/* outgoing photo */}
      {prevImage && (
        <img
          src={prevImage}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-45"
        />
      )}

      {/* incoming photo */}
      {shown.image && (
        <img
          src={shown.image}
          alt=""
          aria-hidden
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            imageReady ? "opacity-45" : "opacity-0"
          }`}
        />
      )}

      {/* legibility scrim — the copy has to hold over any photograph */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(6,20,34,.94) 0%, rgba(6,20,34,.62) 42%, rgba(6,20,34,.18) 100%)",
        }}
      />

      <div className="relative">
        <p
          className="label-caps text-[10px] mb-3 inline-flex items-center gap-2 rounded-full border px-3 py-1"
          style={{ color: shown.accent, borderColor: `${shown.accent}55` }}
        >
          {label}
        </p>

        <div key={shown.headline} className="vibe-enter">
          <div className="text-4xl leading-none mb-3" aria-hidden>
            {shown.emoji}
          </div>
          <h3 className="heading-display text-white text-2xl lg:text-3xl leading-tight mb-2">
            {shown.headline}
          </h3>
          <p className="text-white/72 text-sm leading-relaxed max-w-[34ch]">
            {shown.line}
          </p>
        </div>
      </div>

      <style jsx>{`
        .vibe-enter {
          animation: vibeIn 0.42s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @keyframes vibeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .vibe-enter {
            animation: none;
          }
        }
      `}</style>
    </aside>
  );
}
