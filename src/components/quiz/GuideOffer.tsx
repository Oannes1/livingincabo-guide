"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "@/lib/analytics";

/**
 * The offer that follows the gift.
 *
 * The shortlist above is now unlocked, and the neighbourhood guide for
 * their own three communities is already sending.
 *
 * The email is taken at the gate now, so this opens on the number — asked
 * for once they already hold the shortlist, and always skippable. A buyer
 * six months out has no reason to surrender a number under pressure, and
 * pressure is how you collect fake ones.
 */

export default function GuideOffer({
  topNames,
  firstName,
  onPhone,
}: {
  topNames: string[];
  firstName: string;
  onPhone: (phone: string) => Promise<void>;
}) {
  const [stage, setStage] = useState<"phone" | "done">("phone");
  const [busy, setBusy] = useState(false);

  const viewLogged = useRef(false);
  useEffect(() => {
    if (viewLogged.current) return;
    viewLogged.current = true;
    track("guide_offer_view", { topMatch: topNames[0] });
  }, [topNames]);

  const named =
    topNames.length >= 3
      ? `${topNames[0]}, ${topNames[1]} and ${topNames[2]}`
      : topNames.join(" and ") || "your matches";

  async function handlePhone(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const phone = String(fd.get("phone") || "").trim();
    if (phone) {
      setBusy(true);
      await onPhone(phone);
      setBusy(false);
      track("phone_captured");
    }
    setStage("done");
  }

  const input =
    "w-full px-4 py-3 border border-stone rounded-[1.15rem] focus:outline-none focus:border-sand-gold focus:ring-2 focus:ring-sand-gold/20 text-cabo-navy bg-white";

  /* ---------------- the number, offered rather than demanded ---------------- */
  if (stage === "phone") {
    return (
      <div className="mt-8 bg-cream border border-sand-gold/40 rounded-[1.75rem] p-7 md:p-9">
        <p className="label-caps text-ocean-teal text-[10px] mb-3">On its way</p>
        <h3 className="heading-display text-cabo-navy text-2xl leading-tight mb-3">
          {firstName ? `That's heading to your inbox, ${firstName}.` : "That's heading to your inbox."}
        </h3>
        <p className="text-cabo-slate text-[15px] leading-relaxed mb-6 max-w-[54ch]">
          The neighbourhood guide for {named} is on its way. Most people looking at Cabo are six
          months out, and six months is exactly the right amount of time to do this properly. Leave
          a number and I&apos;ll text you when something worth seeing comes up in these three. Not a
          listing feed, just the ones I&apos;d actually walk you through.
        </p>

        <form onSubmit={handlePhone} className="flex flex-col sm:flex-row gap-3">
          <input name="phone" type="tel" placeholder="Mobile (optional)" autoComplete="tel" className={input + " sm:flex-1"} />
          <button
            type="submit"
            disabled={busy}
            className="rounded-full bg-cabo-navy px-6 py-3 font-semibold text-white transition-colors hover:bg-cabo-navy/90 disabled:opacity-60 whitespace-nowrap"
          >
            {busy ? "Saving…" : "Text me when something comes up"}
          </button>
        </form>
        <button
          onClick={() => setStage("done")}
          className="mt-3 text-xs text-text-muted hover:text-cabo-navy focus:outline-none focus-visible:underline"
        >
          Skip — email is enough for now
        </button>
      </div>
    );
  }

  /* ---------------- what happens next ---------------- */
  return (
    <div className="mt-8 bg-cream border border-stone rounded-[1.75rem] p-7 md:p-9">
      <p className="label-caps text-ocean-teal text-[10px] mb-3">What happens next</p>
      <p className="text-cabo-navy text-[15px] leading-relaxed max-w-[56ch]">
        I&apos;ll look at these myself tonight, and you&apos;ll get a note from me with the one thing
        I&apos;d check on each before you fall in love with any of them. No pressure and no sequence
        — if you want to talk, you&apos;ll know where I am.
      </p>
      <p className="text-cabo-slate text-sm mt-4">
        Worth bookmarking this page. Your shortlist stays here.
      </p>
    </div>
  );
}
