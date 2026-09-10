"use client";

import { useEffect, useRef, useState } from "react";
import SpamFields, { type SpamFieldsRef } from "../SpamFields";
import { track } from "@/lib/analytics";

/**
 * The offer that follows the gift.
 *
 * The shortlist above this is already theirs — free, unblurred, no trade.
 * This asks for an email in exchange for something that genuinely does not
 * fit on a results page: a written guide to the three communities they
 * actually matched, with the tradeoffs on each.
 *
 * Two stages on purpose. Email buys the guide. The phone number is asked
 * for afterwards, once they've said yes to something, and it is skippable —
 * a buyer six months out has no reason to hand over a number under
 * pressure, and asking for one under pressure is how you get a fake one.
 */

export interface GuideOfferResult {
  ok: boolean;
  error?: string;
}

export default function GuideOffer({
  topNames,
  onSubmit,
  onPhone,
}: {
  topNames: string[];
  onSubmit: (data: { firstName: string; lastName: string; email: string }) => Promise<GuideOfferResult>;
  onPhone: (phone: string) => Promise<void>;
}) {
  const spamRef = useRef<SpamFieldsRef>(null);
  const [stage, setStage] = useState<"email" | "phone" | "done">("email");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [name, setName] = useState("");

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

  async function handleEmail(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr("");
    const fd = new FormData(e.currentTarget);
    const firstName = String(fd.get("firstName") || "").trim();
    const email = String(fd.get("email") || "").trim();

    if (!firstName || !email) {
      setErr("First name and email, and it's on its way.");
      return;
    }

    setBusy(true);
    track("guide_offer_accept", { topMatch: topNames[0] });
    const res = await onSubmit({
      firstName,
      lastName: String(fd.get("lastName") || "").trim(),
      email,
    });
    setBusy(false);

    if (!res.ok) {
      setErr(res.error || "That didn't go through. Try once more?");
      track("gate_error", { topMatch: topNames[0] });
      return;
    }
    setName(firstName);
    setStage("phone");
  }

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
    "w-full px-4 py-3 border border-stone rounded-md focus:outline-none focus:border-sand-gold focus:ring-2 focus:ring-sand-gold/20 text-cabo-navy bg-white";

  /* ---------------- stage 1 · the guide ---------------- */
  if (stage === "email") {
    return (
      <div className="mt-8 bg-cabo-navy bg-grain rounded-md p-7 md:p-9">
        <p className="label-caps text-sand-gold text-[10px] mb-3">One more thing</p>
        <h3 className="heading-display text-white text-2xl md:text-3xl leading-tight mb-3">
          Want the long version on {named}?
        </h3>
        <p className="text-white/70 text-[15px] leading-relaxed mb-6 max-w-[54ch]">
          The shortlist above is yours either way. But there&apos;s a lot that
          doesn&apos;t fit on this page — what each of these actually costs to hold
          each month, which streets are worth walking and which aren&apos;t, what the
          HOA really covers, and the one thing I&apos;d check on each before anyone
          makes an offer. I&apos;ll write it up for your three specifically and email it over.
        </p>

        <form onSubmit={handleEmail}>
          <SpamFields ref={spamRef} />
          <div className="grid sm:grid-cols-2 gap-3 mb-3">
            <input name="firstName" placeholder="First name" autoComplete="given-name" className={input} />
            <input name="lastName" placeholder="Last name" autoComplete="family-name" className={input} />
          </div>
          <input name="email" type="email" placeholder="Email" autoComplete="email" className={input + " mb-4"} />

          {err && (
            <p className="mb-4 text-sunset-coral text-sm bg-white/10 rounded px-3 py-2">{err}</p>
          )}

          <button
            type="submit"
            disabled={busy}
            className="w-full bg-sand-gold hover:bg-sand-gold-dark text-cabo-navy font-semibold py-4 rounded-md transition-colors disabled:opacity-60"
          >
            {busy ? "Writing it up…" : "Send me the guide →"}
          </button>
          <p className="text-xs text-white/40 text-center mt-3">
            One email, written by a person. Unsubscribe anytime.
          </p>
        </form>
      </div>
    );
  }

  /* ---------------- stage 2 · earn the number ---------------- */
  if (stage === "phone") {
    return (
      <div className="mt-8 bg-cream border border-sand-gold/40 rounded-md p-7 md:p-9">
        <p className="label-caps text-ocean-teal text-[10px] mb-3">On its way</p>
        <h3 className="heading-display text-cabo-navy text-2xl leading-tight mb-3">
          Done — that&apos;s heading to your inbox, {name}.
        </h3>
        <p className="text-cabo-slate text-[15px] leading-relaxed mb-6 max-w-[54ch]">
          Most people looking at Cabo are six months out, and six months is exactly
          the right amount of time to do this properly. If you want, leave a number
          and I&apos;ll text you when something worth seeing comes up in these three —
          not a listing feed, just the ones I&apos;d actually walk you through.
        </p>

        <form onSubmit={handlePhone} className="flex flex-col sm:flex-row gap-3">
          <input
            name="phone"
            type="tel"
            placeholder="Mobile (optional)"
            autoComplete="tel"
            className={input + " sm:flex-1"}
          />
          <button
            type="submit"
            disabled={busy}
            className="bg-cabo-navy hover:bg-cabo-navy/90 text-white font-semibold px-6 py-3 rounded-md transition-colors disabled:opacity-60 whitespace-nowrap"
          >
            {busy ? "Saving…" : "That's fine"}
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

  /* ---------------- stage 3 · what happens next ---------------- */
  return (
    <div className="mt-8 bg-cream border border-stone rounded-md p-7 md:p-9">
      <p className="label-caps text-ocean-teal text-[10px] mb-3">What happens next</p>
      <p className="text-cabo-navy text-[15px] leading-relaxed max-w-[56ch]">
        I&apos;ll look at these myself tonight, and you&apos;ll get a note from me with
        the one thing I&apos;d check on each before you fall in love with any of them.
        No pressure and no sequence — if you want to talk, you&apos;ll know where I am.
      </p>
      <p className="text-cabo-slate text-sm mt-4">
        Worth bookmarking this page. Your shortlist stays here.
      </p>
    </div>
  );
}
