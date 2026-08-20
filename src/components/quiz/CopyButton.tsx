"use client";
import { useState } from "react";

export default function CopyButton({ text }: { text: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      onClick={async () => {
        try { await navigator.clipboard.writeText(text); setDone(true); setTimeout(() => setDone(false), 2000); } catch {}
      }}
      className="bg-sand-gold hover:bg-sand-gold-dark text-cabo-navy text-sm font-semibold px-5 py-2.5 rounded-md transition-colors"
    >
      {done ? "Copied ✓" : "Copy text"}
    </button>
  );
}
