"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Below-the-fold sections arrive rather than appear.
 *
 * Content is never parked invisible: the hide is applied only after this
 * component mounts and confirms it can observe, so a crawler, a screenshot,
 * or a browser with JavaScript blocked sees the page at rest. Reduced motion
 * never hides anything.
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) return;

    el.classList.add("reveal-armed");
    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (en.isIntersecting) {
            el.classList.add("reveal-in");
            io.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
      <style jsx>{`
        .reveal-armed {
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1),
            transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .reveal-armed.reveal-in {
          opacity: 1;
          transform: none;
        }
      `}</style>
    </div>
  );
}
