"use client";

/**
 * Pinned above every question. The point is that the buyer never forgets
 * there's a person on the other end of this — and can reach him without
 * finishing the quiz first.
 */

const AGENT = {
  name: "Aaron Cuha",
  quote: "Tell me how you want to live down here and I'll tell you where it actually is.",
  photo: "/images/agent/aaron.jpg",
  /* E.164, no punctuation — some mobile browsers drop sms: links otherwise. */
  phone: "+526241234567",
  smsBody: "Hi Aaron — I'm going through the Cabo neighborhood quiz.",
};

export default function AgentHeader() {
  const smsHref = `sms:${AGENT.phone}${
    /iPad|iPhone|iPod/.test(typeof navigator === "undefined" ? "" : navigator.userAgent)
      ? "&"
      : "?"
  }body=${encodeURIComponent(AGENT.smsBody)}`;

  return (
    <header className="mb-5">
      <div className="bg-white/95 backdrop-blur border border-stone rounded-full pl-2 pr-2 py-2 flex items-center gap-3 sm:gap-4 shadow-sm">
        <img
          src={AGENT.photo}
          alt={AGENT.name}
          width={56}
          height={56}
          className="h-12 w-12 sm:h-14 sm:w-14 rounded-full object-cover object-top ring-2 ring-sand-gold/45 flex-shrink-0"
        />

        <div className="min-w-0 flex-1">
          <p className="font-semibold text-cabo-navy leading-tight text-sm sm:text-base">
            {AGENT.name}
          </p>
          <p className="text-cabo-slate text-xs sm:text-[13px] italic leading-snug truncate-2">
            &ldquo;{AGENT.quote}&rdquo;
          </p>
        </div>

        <a
          href={smsHref}
          className="flex-shrink-0 inline-flex items-center gap-2 rounded-full bg-cabo-navy px-4 sm:px-5 py-2.5 text-white text-xs sm:text-sm font-semibold hover:bg-cabo-navy/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-sand-gold focus-visible:ring-offset-2 transition-colors"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
            />
          </svg>
          <span className="hidden xs:inline">Text Aaron</span>
          <span className="xs:hidden">Text</span>
        </a>
      </div>

      <style jsx>{`
        .truncate-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </header>
  );
}
