"use client";

import { useRef, useState } from "react";
import SpamFields, { type SpamFieldsRef } from "../SpamFields";
import { track } from "@/lib/analytics";

/**
 * The gate on a neighbourhood guide.
 *
 * The page above it is public on purpose — it has to be findable, and a
 * buyer who arrives from a search should get something real before being
 * asked for anything. What is gated is the written deep-dive: the streets
 * worth walking, what the HOA actually covers, the thing to verify before
 * making an offer on this particular community.
 *
 * Same lead pipeline as the quiz, tagged by community so Follow Up Boss
 * shows which neighbourhood pulled them in.
 */
export default function GuideUnlock({
  communityName,
  slug,
}: {
  communityName: string;
  slug: string;
}) {
  const spamRef = useRef<SpamFieldsRef>(null);
  const [state, setState] = useState<"idle" | "busy" | "done">("idle");
  const [err, setErr] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr("");
    const fd = new FormData(e.currentTarget);
    const firstName = String(fd.get("firstName") || "").trim();
    const email = String(fd.get("email") || "").trim();
    if (!firstName) return setErr("Your first name, so I know who I'm writing to.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setErr("That email doesn't look right.");

    setState("busy");
    const spam = spamRef.current?.getValues() || { _website: "", _loaded: 0 };
    track("guide_offer_accept", { topMatch: communityName });

    try {
      const r = await fetch("/api/quiz-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadType: "neighborhood-guide",
          firstName,
          lastName: "",
          email,
          phone: "",
          quiz: { guideFor: slug },
          matches: [{ slug, name: communityName, score: 100 }],
          _website: spam._website,
          _loaded: spam._loaded,
        }),
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok || j?.success === false) {
        setState("idle");
        setErr(j?.error || "That didn't go through. Try once more?");
        return;
      }
      setState("done");
    } catch {
      setState("idle");
      setErr("Couldn't reach us just then. Try once more?");
    }
  }

  if (state === "done") {
    return (
      <div className="rounded-[1.5rem] bg-cream p-6 ring-1 ring-sand-gold/40">
        <p className="label-caps text-ocean-teal text-[10px] mb-2">On its way</p>
        <p className="text-cabo-navy text-[15px] leading-relaxed">
          The full {communityName} guide is heading to your inbox. If anything in it raises a
          question, reply to that email — it comes to me directly.
        </p>
      </div>
    );
  }

  const input =
    "w-full rounded-[1.15rem] bg-white/[0.07] px-4 py-3 text-white placeholder:text-white/40 ring-1 ring-white/15 focus:outline-none focus:ring-2 focus:ring-sand-gold transition-shadow";

  return (
    <div className="rounded-[1.5rem] bg-cabo-navy p-6 ring-1 ring-sand-gold/25">
      <p className="label-caps text-sand-gold text-[10px] mb-2.5">The full guide</p>
      <h2 className="heading-display text-white text-[1.5rem] leading-tight mb-3">
        The long version on {communityName}
      </h2>
      <p className="text-white/65 text-[14px] leading-relaxed mb-5">
        Which streets are worth walking and which aren&apos;t, what the HOA actually covers, how the
        rental season really runs, and the one thing I&apos;d verify before anyone makes an offer here.
      </p>

      <form onSubmit={submit}>
        <SpamFields ref={spamRef} />
        <input name="firstName" placeholder="First name" autoComplete="given-name" className={input + " mb-2.5"} />
        <input name="email" type="email" placeholder="Email" autoComplete="email" className={input + " mb-4"} />
        {err && (
          <p role="alert" className="mb-3 rounded-[1rem] bg-sunset-coral/15 px-3 py-2 text-sunset-coral text-[13px]">
            {err}
          </p>
        )}
        <button
          type="submit"
          disabled={state === "busy"}
          className="w-full rounded-full bg-sand-gold py-3.5 font-semibold text-cabo-navy transition-colors hover:bg-sand-gold-light disabled:opacity-60"
        >
          {state === "busy" ? "Sending…" : `Send me the ${communityName} guide`}
        </button>
        <p className="text-white/35 text-[11.5px] text-center mt-3">
          One email from a person. No sequence, no calls unless you ask.
        </p>
      </form>
    </div>
  );
}
