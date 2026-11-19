"use client";

import Image from "next/image";
import { useId, useRef, useState } from "react";
import SpamFields, { type SpamFieldsRef } from "./SpamFields";

type Status = "idle" | "submitting" | "success" | "error";

/* Same rule the server enforces in src/lib/validation.ts. */
const phoneOk = (s: string) => {
  const digits = s.replace(/\D/g, "");
  return /^[\d\s()+.\-]+$/.test(s) && digits.length >= 7 && digits.length <= 15;
};

/**
 * The one form on the page. Three fields, because every extra field costs
 * conversions; phone is required because a buyer lead with no number is a
 * lead Aaron cannot call. Rendered twice (hero and closing section), so ids
 * come from useId.
 */
export default function GuideForm({ heading = "Get the free guide" }: { heading?: string }) {
  const uid = useId();
  const spamRef = useRef<SpamFieldsRef>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const spam = spamRef.current?.getValues() || { _website: "", _loaded: 0 };
    const payload = {
      leadType: "buyer",
      firstName: String(formData.get("firstName") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      _website: spam._website,
      _loaded: spam._loaded,
    };

    if (!payload.firstName || !payload.email || !payload.phone) {
      setStatus("error");
      setErrorMsg("Please fill in your first name, email and phone.");
      return;
    }
    if (!phoneOk(payload.phone)) {
      setStatus("error");
      setErrorMsg("Please enter a valid phone number, including area code.");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") return <Delivered />;

  const field =
    "w-full rounded-lg border border-stone bg-white px-4 py-3.5 text-base text-cabo-navy placeholder:text-text-muted/70 focus:border-cabo-navy focus:outline-none focus:ring-2 focus:ring-cabo-navy/15";
  const label = "mb-1.5 block text-sm font-semibold text-cabo-navy";

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-2xl bg-white p-6 shadow-[0_30px_80px_-20px_rgba(4,17,31,0.45)] ring-1 ring-black/5 sm:p-8"
    >
      <div className="mb-5 flex items-center gap-4">
        <Image
          src="/images/guide/page-1.jpg"
          alt="Cover of the Buying Property in Mexico guide"
          width={64}
          height={83}
          className="h-[83px] w-16 flex-shrink-0 rounded-sm object-cover shadow-md ring-1 ring-black/10"
        />
        <div>
          <p className="font-display text-2xl font-semibold leading-tight text-cabo-navy">{heading}</p>
          <p className="mt-1 text-sm text-cabo-slate">33-page PDF. Free. In your inbox in about a minute.</p>
        </div>
      </div>

      <SpamFields ref={spamRef} />

      <div className="space-y-4">
        <div>
          <label htmlFor={`${uid}-first`} className={label}>First name</label>
          <input id={`${uid}-first`} name="firstName" type="text" required autoComplete="given-name" className={field} />
        </div>
        <div>
          <label htmlFor={`${uid}-email`} className={label}>Email</label>
          <input id={`${uid}-email`} name="email" type="email" required autoComplete="email" inputMode="email" className={field} />
        </div>
        <div>
          <label htmlFor={`${uid}-phone`} className={label}>Mobile phone</label>
          <input
            id={`${uid}-phone`}
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            inputMode="tel"
            placeholder="(555) 555-0123"
            className={field}
          />
          <p className="mt-1.5 text-xs text-text-muted">So our team can answer your questions. We never sell or share it.</p>
        </div>
      </div>

      {status === "error" && errorMsg && (
        <p role="alert" className="mt-4 rounded-lg bg-cta/10 px-3 py-2.5 text-sm font-medium text-cta-dark">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-5 w-full rounded-lg bg-cta px-6 py-4 text-lg font-bold text-white shadow-lg shadow-cta/30 transition hover:bg-cta-dark focus:outline-none focus-visible:ring-4 focus-visible:ring-cta/40 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "submitting" ? "Sending your guide..." : "Send Me the Free Guide"}
      </button>

      <p className="mt-3 text-center text-xs text-text-muted">
        No cost, no obligation. Unsubscribe from emails anytime.
      </p>
    </form>
  );
}

/* The thank-you step. A fresh lead is at peak intent, so the next rung of
   the ladder (a call with Aaron) sits right under the download. */
function Delivered() {
  return (
    <div className="rounded-2xl bg-white p-6 text-center shadow-[0_30px_80px_-20px_rgba(4,17,31,0.45)] ring-1 ring-black/5 sm:p-8">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-ocean-teal/15">
        <svg className="h-7 w-7 text-ocean-teal" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <p className="font-display text-3xl font-semibold text-cabo-navy">Your guide is ready.</p>
      <p className="mx-auto mt-2 max-w-sm text-cabo-slate">
        Download it now. A copy is on its way to your inbox too.
      </p>
      <a
        href="/downloads/buying-property-in-mexico-guide.pdf"
        download
        className="mt-6 block rounded-lg bg-cta px-6 py-4 text-lg font-bold text-white transition hover:bg-cta-dark"
      >
        Download the Guide (PDF)
      </a>

      <div className="mt-6 border-t border-divider pt-6 text-left">
        <p className="font-semibold text-cabo-navy">Want a straight answer on your situation?</p>
        <p className="mt-1 text-sm text-cabo-slate">
          Book a free Cabo strategy call. Bring your budget and your questions.
        </p>
        <a
          href="https://www.livingincabo.com/contact"
          className="mt-4 block rounded-lg bg-cabo-navy px-6 py-3.5 text-center font-semibold text-white transition hover:bg-cabo-navy-deep"
        >
          Book my free call
        </a>
      </div>
    </div>
  );
}
