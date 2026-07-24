"use client";

import { useRef, useState } from "react";
import SpamFields, { type SpamFieldsRef } from "./SpamFields";

type Status = "idle" | "submitting" | "success" | "error";

export default function SellerForm() {
  const spamRef = useRef<SpamFieldsRef>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const spam = spamRef.current?.getValues() || { _website: "", _loaded: 0 };

    const payload = {
      leadType: "seller",
      firstName: String(formData.get("firstName") || "").trim(),
      lastName: String(formData.get("lastName") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      propertyLocation: String(formData.get("propertyLocation") || "").trim(),
      _website: spam._website,
      _loaded: spam._loaded,
    };

    if (!payload.firstName || !payload.email || !payload.propertyLocation) {
      setStatus("error");
      setErrorMsg("First name, email, and property location are required.");
      return;
    }

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

  const inputCls =
    "w-full px-4 py-3 border border-stone rounded-md focus:outline-none focus:border-sand-gold focus:ring-2 focus:ring-sand-gold/20 text-cabo-navy bg-white";

  if (status === "success") {
    return (
      <div className="bg-white border-l-4 border-sand-gold p-8 rounded-md shadow-lg text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-sand-gold/20 mb-4">
          <svg className="w-7 h-7 text-sand-gold-dark" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="heading-display text-2xl text-cabo-navy mb-3">Request received.</h3>
        <p className="text-cabo-slate max-w-md mx-auto">
          Your valuation is being prepared — expect it within 48 hours, along with what
          you need to know about capital gains tax before you list.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="bg-white p-8 md:p-10 rounded-md shadow-2xl border border-stone">
      <div className="mb-6">
        <p className="label-caps text-sand-gold-dark mb-2">Free · No Obligation · 48-Hour Turnaround</p>
        <h3 className="heading-display text-2xl md:text-3xl text-cabo-navy leading-tight">
          Get your free valuation
        </h3>
      </div>

      <SpamFields ref={spamRef} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input name="firstName" type="text" required placeholder="First name *" autoComplete="given-name" className={inputCls} />
        <input name="lastName" type="text" placeholder="Last name" autoComplete="family-name" className={inputCls} />
      </div>
      <div className="mb-4">
        <input name="email" type="email" required placeholder="Email *" autoComplete="email" className={inputCls} />
      </div>
      <div className="mb-4">
        <input name="phone" type="tel" placeholder="Phone (optional)" autoComplete="tel" className={inputCls} />
      </div>
      <div className="mb-6">
        <input name="propertyLocation" type="text" required placeholder="Community / development (e.g. Pedregal) *" className={inputCls} />
      </div>

      {status === "error" && errorMsg && (
        <div className="mb-4 p-3 bg-sunset-coral/10 border-l-4 border-sunset-coral rounded text-sunset-coral text-sm">
          {errorMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full bg-ocean-teal hover:bg-cabo-navy text-white font-semibold py-4 rounded-md transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? "Sending..." : "Get My Free Valuation →"}
      </button>

      <p className="text-xs text-text-muted text-center mt-4">
        No obligation. No pressure. Ever.
      </p>
    </form>
  );
}
