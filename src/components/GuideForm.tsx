"use client";

import { useEffect, useRef, useState } from "react";
import SpamFields, { type SpamFieldsRef } from "./SpamFields";

type Status = "idle" | "submitting" | "success" | "error";

export default function GuideForm() {
  const spamRef = useRef<SpamFieldsRef>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const spam = spamRef.current?.getValues() || { _website: "", _loaded: 0 };

    const payload = {
      firstName: String(formData.get("firstName") || "").trim(),
      lastName: String(formData.get("lastName") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      _website: spam._website,
      _loaded: spam._loaded,
    };

    if (!payload.firstName || !payload.email) {
      setStatus("error");
      setErrorMsg("First name and email are required.");
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

      // Open the PDF in a new tab so they still get the file immediately,
      // then redirect the main window to the primary site after a short beat.
      try {
        window.open("/downloads/buying-property-in-mexico-guide.pdf", "_blank");
      } catch {
        // ignore popup blocker — the success screen still has a download link
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return <SuccessRedirect />;
  }

  return (
    <form onSubmit={onSubmit} className="bg-white p-8 md:p-10 rounded-md shadow-2xl border border-stone">
      <div className="mb-6">
        <p className="label-caps text-sand-gold-dark mb-2">Free Download · 31 Pages · PDF</p>
        <h3 className="heading-display text-3xl md:text-4xl text-cabo-navy leading-tight">
          Get the guide
        </h3>
        <p className="text-cabo-slate mt-2 text-sm">
          No spam. We&apos;ll email you the PDF immediately.
        </p>
      </div>

      <SpamFields ref={spamRef} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="firstName" className="block text-xs font-semibold text-cabo-slate mb-1.5 uppercase tracking-wider">
            First name <span className="text-sunset-coral">*</span>
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            autoComplete="given-name"
            className="w-full px-4 py-3 border border-stone rounded-md focus:outline-none focus:border-sand-gold focus:ring-2 focus:ring-sand-gold/20 text-cabo-navy"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-xs font-semibold text-cabo-slate mb-1.5 uppercase tracking-wider">
            Last name
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            autoComplete="family-name"
            className="w-full px-4 py-3 border border-stone rounded-md focus:outline-none focus:border-sand-gold focus:ring-2 focus:ring-sand-gold/20 text-cabo-navy"
          />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-xs font-semibold text-cabo-slate mb-1.5 uppercase tracking-wider">
          Email <span className="text-sunset-coral">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full px-4 py-3 border border-stone rounded-md focus:outline-none focus:border-sand-gold focus:ring-2 focus:ring-sand-gold/20 text-cabo-navy"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="phone" className="block text-xs font-semibold text-cabo-slate mb-1.5 uppercase tracking-wider">
          Phone <span className="text-text-muted normal-case font-normal tracking-normal">(optional — so we can follow up)</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          className="w-full px-4 py-3 border border-stone rounded-md focus:outline-none focus:border-sand-gold focus:ring-2 focus:ring-sand-gold/20 text-cabo-navy"
        />
      </div>

      {status === "error" && errorMsg && (
        <div className="mb-4 p-3 bg-sunset-coral/10 border-l-4 border-sunset-coral rounded text-sunset-coral text-sm">
          {errorMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full bg-cabo-navy hover:bg-cabo-navy-deep text-white font-semibold py-4 rounded-md transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? "Sending your guide..." : "Send Me the Guide →"}
      </button>

      <p className="text-xs text-text-muted text-center mt-4">
        We respect your inbox. Unsubscribe anytime. Read our privacy policy at livingincabo.com.
      </p>
    </form>
  );
}

function SuccessRedirect() {
  const REDIRECT_MS = 3000;
  const [secondsLeft, setSecondsLeft] = useState(Math.ceil(REDIRECT_MS / 1000));

  useEffect(() => {
    const tick = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    const timer = setTimeout(() => {
      window.location.href = "https://livingincabo.com";
    }, REDIRECT_MS);
    return () => {
      clearInterval(tick);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="bg-white border-l-4 border-sand-gold p-8 rounded-md shadow-lg text-center">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-sand-gold/20 mb-4">
        <svg className="w-7 h-7 text-sand-gold-dark" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 className="heading-display text-3xl text-cabo-navy mb-3">Your guide is on the way.</h3>
      <p className="text-cabo-slate mb-2 max-w-md mx-auto">
        Your PDF just opened in a new tab. Check your inbox too — we emailed you a copy.
      </p>
      <p className="text-text-muted text-sm mb-6">
        Taking you to LivingInCabo.com in {secondsLeft}…
      </p>
      <a
        href="https://livingincabo.com"
        className="inline-block bg-cabo-navy hover:bg-cabo-navy-deep text-white font-semibold px-8 py-3 rounded-md transition-colors"
      >
        Go to LivingInCabo.com now
      </a>
    </div>
  );
}
