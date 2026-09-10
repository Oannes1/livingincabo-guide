"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Land's End at golden hour, from the air.
 *
 * The poster paints first and never unmounts, so there is no black flash
 * before the first frame and no layout shift — the video simply fades over
 * the top once it can actually play.
 *
 * The clip is a palindrome (forward then reversed) so the loop has no seam.
 * A slow drone orbit cutting back to frame one is the single most obvious
 * tell of a cheap hero video.
 *
 * Anyone who has asked for less motion, or is on a metered connection, keeps
 * the still and never downloads the video at all.
 */
export default function HeroVideo({
  poster = "/images/quiz/hero-poster.jpg",
  className = "",
}: {
  poster?: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const conn = (navigator as unknown as { connection?: { saveData?: boolean } }).connection;
    if (reduced || conn?.saveData) return;
    setAllowed(true);
  }, []);

  useEffect(() => {
    if (!allowed) return;
    const v = ref.current;
    if (!v) return;
    /* Some browsers reject autoplay even when muted. Failing here is fine —
       the poster is already the finished state, not a placeholder. */
    v.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  }, [allowed]);

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <img
        src={poster}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      {allowed && (
        <video
          ref={ref}
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
          className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-[1200ms] ease-[cubic-bezier(.32,.72,0,1)] ${
            playing ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src="/videos/cabo-hero-720.mp4" type="video/mp4" media="(max-width: 768px)" />
          <source src="/videos/cabo-hero-1080.mp4" type="video/mp4" />
        </video>
      )}
    </div>
  );
}
