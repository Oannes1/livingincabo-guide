"use client";

import { useRef, useState } from "react";
import SpamFields, { type SpamFieldsRef } from "./SpamFields";

type QuizKey = "goal" | "budget" | "vibe" | "timeline";
type Answers = Partial<Record<QuizKey, string>>;

const QUESTIONS: {
  key: QuizKey;
  title: string;
  options: { value: string; label: string; sub?: string }[];
}[] = [
  {
    key: "goal",
    title: "What's drawing you to Cabo?",
    options: [
      { value: "retire", label: "🌅 Retiring or semi-retiring here", sub: "Full or part-time living in the sun" },
      { value: "second-home", label: "🏖️ A second home / vacation escape", sub: "A place that's ours, whenever we want it" },
      { value: "investment", label: "📈 Investment & rental income", sub: "Appreciation plus short-term rental returns" },
      { value: "relocate", label: "✈️ Full relocation", sub: "Moving our life (and maybe work) to Baja" },
    ],
  },
  {
    key: "budget",
    title: "What's your comfortable budget?",
    options: [
      { value: "under400", label: "Under $400K USD" },
      { value: "400-700", label: "$400K – $700K USD" },
      { value: "700-1200", label: "$700K – $1.2M USD" },
      { value: "1200plus", label: "$1.2M+ USD" },
    ],
  },
  {
    key: "vibe",
    title: "Pick your perfect Saturday:",
    options: [
      { value: "marina", label: "🛥️ Walk to the marina, dinner out, nightlife close by" },
      { value: "resort", label: "⛳ Golf, beach club, resort amenities, lock-and-leave" },
      { value: "artsy", label: "🎨 Art walk, farm-to-table, historic town charm" },
      { value: "quiet", label: "🌊 Empty beach, surf, stars at night, off the radar" },
    ],
  },
  {
    key: "timeline",
    title: "When do you want keys in hand?",
    options: [
      { value: "0-6", label: "Within 6 months" },
      { value: "6-12", label: "6–12 months" },
      { value: "12plus", label: "1–2 years" },
      { value: "dreaming", label: "Just exploring for now" },
    ],
  },
];

const MATCHES: Record<string, { name: string; desc: string }[]> = {
  marina: [
    { name: "Marina / Downtown Cabo San Lucas", desc: "Walk to the marina, restaurants, and nightlife. Condos with rental upside and lock-and-leave ease." },
    { name: "Pedregal", desc: "Cabo's iconic gated hillside enclave — privacy and Pacific views minutes from downtown." },
  ],
  resort: [
    { name: "The Tourist Corridor (Cabo del Sol, Chileno Bay)", desc: "Golf, beach clubs, and resort-branded communities between the two Cabos." },
    { name: "Palmilla / Querencia", desc: "The Corridor's blue-chip addresses — golf, service, and long-term value." },
  ],
  artsy: [
    { name: "San Jose del Cabo — Historic District & El Encanto", desc: "Art walk Thursdays, farm-to-table dining, and authentic town charm." },
    { name: "Puerto Los Cabos", desc: "Marina-and-golf master plan on the San Jose side, quieter pace, strong new construction." },
  ],
  quiet: [
    { name: "East Cape (La Ribera / Costa Palmas area)", desc: "Mile-long beaches, swimmable sea, and the region's biggest growth story." },
    { name: "Todos Santos / Pescadero", desc: "Pacific-side surf-town living, boho art scene, an hour from the airport corridor." },
  ],
};

type Status = "idle" | "submitting" | "error";

export default function QuizSection() {
  const spamRef = useRef<SpamFieldsRef>(null);
  const [step, setStep] = useState(0); // 0-3 questions, 4 gate, 5 results
  const [answers, setAnswers] = useState<Answers>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [firstName, setFirstName] = useState("");

  const totalSteps = QUESTIONS.length + 1; // + email gate
  const progress = Math.min(((step + 1) / (totalSteps + 1)) * 100, 100);

  function pick(key: QuizKey, value: string) {
    setAnswers((a) => ({ ...a, [key]: value }));
    setStep((s) => s + 1);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const spam = spamRef.current?.getValues() || { _website: "", _loaded: 0 };
    const name = String(formData.get("firstName") || "").trim();

    const payload = {
      leadType: "buyer-quiz",
      firstName: name,
      email: String(formData.get("email") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      quiz: answers,
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
      setFirstName(name.split(" ")[0]);
      setStatus("idle");
      setStep(QUESTIONS.length + 1); // results
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  const inputCls =
    "w-full px-4 py-3 border border-stone rounded-md focus:outline-none focus:border-sand-gold focus:ring-2 focus:ring-sand-gold/20 text-cabo-navy bg-white";

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-md shadow-2xl p-8 md:p-10">
      {/* Progress bar */}
      <div className="h-1.5 bg-cream rounded-full overflow-hidden mb-8">
        <div
          className="h-full bg-sand-gold rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Questions */}
      {QUESTIONS.map((q, i) =>
        step === i ? (
          <div key={q.key}>
            <h3 className="heading-display text-2xl md:text-3xl text-cabo-navy mb-6 leading-snug">
              {q.title}
            </h3>
            <div className="grid gap-3">
              {q.options.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => pick(q.key, opt.value)}
                  className="text-left border border-stone rounded-md px-5 py-4 hover:border-sand-gold hover:bg-sand-gold-subtle transition-colors"
                >
                  <span className="font-semibold text-cabo-navy">{opt.label}</span>
                  {opt.sub && (
                    <span className="block text-sm text-cabo-slate mt-0.5">{opt.sub}</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        ) : null
      )}

      {/* Email gate */}
      {step === QUESTIONS.length && (
        <div>
          <h3 className="heading-display text-2xl md:text-3xl text-cabo-navy mb-2 leading-snug">
            Your matches are ready 🎉
          </h3>
          <p className="text-cabo-slate mb-6 text-sm">
            Enter your details and we&apos;ll show your matched communities instantly — plus
            email you the 33-page guide with pricing for every region.
          </p>
          <form onSubmit={onSubmit}>
            <SpamFields ref={spamRef} />
            <div className="grid gap-4 mb-4">
              <input name="firstName" type="text" required placeholder="First name" autoComplete="given-name" className={inputCls} />
              <input name="email" type="email" required placeholder="Email address" autoComplete="email" className={inputCls} />
              <input name="phone" type="tel" placeholder="Phone (optional — so we can follow up)" autoComplete="tel" className={inputCls} />
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
              {status === "submitting" ? "Finding your matches..." : "Show My Cabo Matches →"}
            </button>
            <p className="text-xs text-text-muted text-center mt-4">
              Instant results. No spam, ever.
            </p>
          </form>
        </div>
      )}

      {/* Results */}
      {step > QUESTIONS.length && (
        <div>
          <h3 className="heading-display text-2xl md:text-3xl text-cabo-navy mb-2 leading-snug">
            {firstName ? `${firstName}, here are your Cabo matches` : "Your Cabo matches"}
          </h3>
          <p className="text-cabo-slate mb-6 text-sm">
            Based on your goals, budget, and pace — start your search in these communities:
          </p>
          <div className="grid gap-3 mb-6">
            {(MATCHES[answers.vibe || "marina"] || MATCHES.marina).map((m) => (
              <div key={m.name} className="border-l-4 border-sand-gold bg-cream rounded-md px-5 py-4">
                <p className="font-semibold text-cabo-navy">{m.name}</p>
                <p className="text-sm text-cabo-slate mt-1">{m.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-cabo-slate mb-6">
            📬 The 33-page guide — with pricing and detail on every region — is on its way to
            your inbox right now.
          </p>
          <a
            href="https://www.livingincabo.com/contact"
            className="block w-full text-center bg-sand-gold hover:bg-sand-gold-dark text-cabo-navy font-semibold py-4 rounded-md transition-colors"
          >
            Book a Free Cabo Strategy Call →
          </a>
        </div>
      )}
    </div>
  );
}
