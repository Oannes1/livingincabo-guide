"use client";

import { useEffect, useRef, useState } from "react";
import SpamFields, { type SpamFieldsRef } from "../SpamFields";
import { track } from "@/lib/analytics";
import type { Scored } from "@/lib/match";

/**
 * Name and email, before the shortlist.
 *
 * The honest version of a gate shows the buyer what they are trading for.
 * So the strongest match is named and scored in full, in the open — then the
 * remaining four are withheld. They can see the quality of the answer before
 * deciding whether it is worth an email, which is the difference between a
 * fair trade and a hostage.
 *
 * Two fields, both real. No phone here: that is asked for later, once they
 * have something in hand, and it stays skippable.
 */
export default function UnlockGate({
  top,
  remaining,
  onUnlock,
  onDone,
}: {
  top?: Scored;
  remaining: number;
  onUnlock: (d: { firstName: string; lastName: string; email: string }) => Promise<{ ok: boolean; error?: string }>;
  onDone: () => void;
}) {
  const spamRef = useRef<SpamFieldsRef>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const seen = useRef(false);

  useEffect(() => {
    if (seen.current) return;
    seen.current = true;
    track("gate_view", { topMatch: top?.c.name, topScore: top?.score });
  }, [top]);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr("");
    const fd = new FormData(e.currentTarget);
    const firstName = String(fd.get("firstName") || "").trim();
    const email = String(fd.get("email") || "").trim();

    if (!firstName) return setErr("Your first name, so I know who I'm writing to.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setErr("That email doesn't look right — mind checking it?");

    setBusy(true);
    track("gate_submit", { topMatch: top?.c.name, topScore: top?.score });
    const res = await onUnlock({ firstName, lastName: String(fd.get("lastName") || "").trim(), email });
    setBusy(false);

    if (!res.ok) {
      setErr(res.error || "That didn't go through. Try once more?");
      track("gate_error");
      return;
    }
    onDone();
  }

  const input =
    "w-full rounded-[1.15rem] bg-white/[0.06] px-4 py-3.5 text-white placeholder:text-white/40 ring-1 ring-white/15 focus:outline-none focus:ring-2 focus:ring-sand-gold transition-shadow";

  return (
    <div className="bg-cabo-navy bg-grain rounded-[1.75rem] p-7 md:p-10 ring-1 ring-sand-gold/20">
      <p className="label-caps text-sand-gold text-[10px] mb-3">Your matches are ready</p>

      {/* the trade, made visible */}
      {top && (
        <div className="rounded-[1.25rem] bg-white/[0.07] ring-1 ring-sand-gold/30 p-6 mb-4">
          <div className="flex items-start justify-between gap-5">
            <div className="min-w-0">
              <p className="label-caps text-sand-gold text-[10px] mb-1.5">Your strongest match</p>
              <p className="heading-display text-white text-[1.9rem] leading-tight">{top.c.name}</p>
              <p className="text-white/60 text-sm mt-1.5">{top.c.tagline}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="heading-display text-sand-gold text-[2.6rem] leading-none tabular-nums">{top.score}%</p>
              <p className="label-caps text-white/40 text-[9px] mt-1">Match</p>
            </div>
          </div>
        </div>
      )}

      {remaining > 0 && (
        <div className="relative mb-7">
          <div aria-hidden className="grid gap-2 select-none blur-[6px]">
            {Array.from({ length: remaining }).map((_, i) => (
              <div key={i} className="flex items-center justify-between rounded-[1rem] bg-white/[0.05] px-5 py-3.5">
                <span className="h-3 w-40 rounded-full bg-white/25" />
                <span className="h-3 w-10 rounded-full bg-sand-gold/50" />
              </div>
            ))}
          </div>
          <div className="absolute inset-0 grid place-items-center">
            <span className="rounded-full bg-cabo-navy px-4 py-2 text-xs font-semibold text-white ring-1 ring-sand-gold/30">
              {remaining} more {remaining === 1 ? "community" : "communities"}, plus the tradeoffs on each
            </span>
          </div>
        </div>
      )}

      <form onSubmit={submit}>
        <SpamFields ref={spamRef} />
        <p className="text-white/70 text-[15px] leading-relaxed mb-5 max-w-[52ch]">
          Tell me where to send the full ranked list. You&apos;ll get the neighbourhood guide for
          your top three as well — the long version, with what each one would cost you.
        </p>

        <div className="grid sm:grid-cols-2 gap-3 mb-3">
          <input name="firstName" placeholder="First name" autoComplete="given-name" className={input} />
          <input name="lastName" placeholder="Last name" autoComplete="family-name" className={input} />
        </div>
        <input name="email" type="email" placeholder="Email" autoComplete="email" className={input + " mb-5"} />

        {err && (
          <p role="alert" className="mb-4 rounded-[1rem] bg-sunset-coral/15 px-4 py-2.5 text-sunset-coral text-sm">
            {err}
          </p>
        )}

        <button
          type="submit"
          disabled={busy}
          className="group w-full inline-flex items-center justify-center gap-3 rounded-full bg-sand-gold py-4 font-semibold text-cabo-navy transition-all duration-500 ease-[cubic-bezier(.32,.72,0,1)] hover:bg-sand-gold-light active:scale-[.99] disabled:opacity-60"
        >
          {busy ? "Scoring your shortlist…" : "Show me all my matches"}
          {!busy && (
            <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          )}
        </button>
        <p className="text-white/40 text-xs text-center mt-3">
          No account. One email from a person, not a sequence. Unsubscribe anytime.
        </p>
      </form>
    </div>
  );
}
