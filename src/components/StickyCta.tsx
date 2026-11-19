"use client";

import { useEffect, useState } from "react";

/**
 * Phone-only bar that keeps the offer one tap away. It hides while either
 * form is on screen, so it never covers the thing it points to.
 */
export default function StickyCta({ watch }: { watch: string[] }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const els = watch.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    if (!els.length) return;
    const visible = new Set<Element>();
    let scrolledPast = false;

    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) visible.add(e.target);
        else visible.delete(e.target);
        if (e.target === els[0] && !e.isIntersecting && e.boundingClientRect.top < 0) scrolledPast = true;
        if (e.target === els[0] && e.isIntersecting) scrolledPast = false;
      }
      setShow(scrolledPast && visible.size === 0);
    });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [watch]);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-black/10 bg-white/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur transition-transform duration-300 lg:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!show}
    >
      <a
        href={`#${watch[0]}`}
        tabIndex={show ? 0 : -1}
        className="block rounded-lg bg-cta py-3.5 text-center text-base font-bold text-white shadow-lg shadow-cta/30"
      >
        Get the free buyer&apos;s guide
      </a>
    </div>
  );
}
