import Image from "next/image";
import GuideForm from "@/components/GuideForm";
import StickyCta from "@/components/StickyCta";
import HeroVideo from "@/components/quiz/HeroVideo";
import { CREDENTIALS, TESTIMONIALS } from "@/data/proof";

/* ------------------------------------------------------------------ */
/*  guide.livingincabo.com: a lead squeeze page with one job.          */
/*                                                                     */
/*  Hook (hero), story (Aaron), offer (the guide), and nothing that    */
/*  leaks the visitor elsewhere before they opt in. Every claim on the */
/*  page is either in the PDF itself or sourced in src/data/proof.ts.  */
/* ------------------------------------------------------------------ */

const FORM_TOP = "get-the-guide";
const FORM_BOTTOM = "get-the-guide-final";

/* Straight from Chapter 7 of the guide: the mistakes, and what's true. */
const MISTAKES = [
  {
    belief: "“I’ll sort out the legal side once I find the house.”",
    truth:
      "How you hold title (a fideicomiso bank trust or a Mexican corporation) decides what you can do with the property. Choose it before you make an offer, not after.",
  },
  {
    belief: "“Closing costs will be about what I’d pay back home.”",
    truth:
      "In Mexico the buyer pays them, and they run 4 to 8 percent. On a $500,000 condo that is $20,000 to $40,000 you need on top of the price.",
  },
  {
    belief: "“I’ll just wire the deposit to the seller.”",
    truth:
      "Money should move through licensed escrow, with a notario público overseeing the closing. Nearly every horror story skips one of those steps.",
  },
];

const PAGES = [
  { src: "/images/guide/page-14.jpg", caption: "Every closing cost, in dollars" },
  { src: "/images/guide/page-16.jpg", caption: "The 5 regions, with real prices" },
  { src: "/images/guide/page-29.jpg", caption: "The 27-point pre-offer checklist" },
];

const CHAPTERS = [
  "Can Americans legally own property in Mexico?",
  "The fideicomiso, explained in plain English",
  "The restricted zone and why it matters",
  "The step-by-step buying process, offer to keys",
  "Closing costs and fees: the real numbers",
  "Where to buy: the 5 regions of Los Cabos",
  "The 10 most expensive mistakes buyers make",
  "What life actually costs once you live there",
  "Myths that cost buyers money",
  "Checklists: your 30-60-90 day plan and the 27-point pre-offer filter",
];

const REGIONS = [
  { name: "Cabo San Lucas", note: "Marina, nightlife, walk to everything", img: "/images/quiz/guide/cabo-san-lucas.jpg" },
  { name: "The Corridor", note: "Resorts, golf and the calmest beaches", img: "/images/quiz/guide/palmilla.jpg" },
  { name: "San José del Cabo", note: "Art district, old town, closest to the airport", img: "/images/quiz/guide/san-jose-del-cabo.jpg" },
  { name: "East Cape", note: "Quiet, wild, off the grid", img: "/images/quiz/guide/east-cape.jpg" },
  { name: "Pacific Side", note: "Surf towns and Todos Santos", img: "/images/quiz/guide/todos-santos.jpg" },
];

const FAQS = [
  {
    q: "Can Americans and Canadians really own property in Cabo?",
    a: "Yes, legally, with full rights to sell, rent, remodel and leave it to your heirs. Because Los Cabos is in Mexico’s coastal restricted zone, foreigners hold title through a fideicomiso (a renewable bank trust) or a Mexican corporation. Chapters 1 to 3 explain both.",
  },
  {
    q: "What are closing costs in Los Cabos?",
    a: "Plan on roughly 4 to 8 percent of the price, covering acquisition tax, notario fees, trust setup, escrow and registration. Chapter 5 breaks it down line by line.",
  },
  {
    q: "Is buying in Mexico safe?",
    a: "It is when the title is verified, the money moves through licensed escrow and a notario público oversees the closing. The 27-point checklist in Chapter 10 makes sure none of those get skipped.",
  },
  {
    q: "Can I finance, or is it cash only?",
    a: "Most purchases are cash, but developer financing and cross-border mortgages exist. The guide covers when each makes sense.",
  },
  {
    q: "Why do you ask for my phone number?",
    a: "Most buyers end up with a question the guide can’t answer for their exact situation. Your number lets our team answer it. We never sell or share it.",
  },
];

export default function Home() {
  const quotes = [TESTIMONIALS[0], TESTIMONIALS[2], TESTIMONIALS[1]];

  return (
    <div className="flex-1 bg-sand-light pb-24 lg:pb-0">
      {/* ─── HERO: the hook, with the form on the first screen ─── */}
      <section className="relative isolate overflow-hidden bg-cabo-navy-deep">
        <HeroVideo className="-z-10" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-cabo-navy-deep/80 via-cabo-navy-deep/55 to-cabo-navy-deep/90 lg:bg-gradient-to-r lg:from-cabo-navy-deep/90 lg:via-cabo-navy-deep/60 lg:to-cabo-navy-deep/30" />

        <div className="mx-auto max-w-6xl px-4 pb-14 pt-6 sm:px-6 lg:px-10 lg:pb-24 lg:pt-8">
          <p className="mb-10 text-sm font-semibold tracking-wide text-white/90 lg:mb-16">
            Living In Cabo <span className="font-normal text-white/60">with Ronival Real Estate</span>
          </p>

          <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
            <div>
              <p className="mb-4 inline-block rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-white ring-1 ring-white/20 backdrop-blur">
                Free guide for US and Canadian buyers
              </p>
              <h1 className="font-display text-[2.4rem] font-semibold leading-[1.05] text-white sm:text-5xl lg:text-[3.6rem]">
                Buying in Cabo? Read this before you wire a single dollar.
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/85 lg:text-xl">
                The 33-page guide we hand every client: how foreigners legally own beachfront, what
                closing really costs, and the 27-point checklist we run before anyone signs.
              </p>

              <ul className="mt-7 hidden space-y-3 text-white/90 lg:block">
                {[
                  "How the fideicomiso works, and why it’s safer than it sounds",
                  "Every closing cost itemized, so the notario holds no surprises",
                  "The land and title red flags that have cost buyers everything",
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <Check />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div id={FORM_TOP} className="scroll-mt-6">
              <GuideForm />
            </div>
          </div>
        </div>
      </section>

      {/* ─── PROOF BAR ─── */}
      <section className="border-b border-divider bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-1 divide-y divide-divider px-4 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-6 lg:px-10">
          {CREDENTIALS.map((c) => (
            <div key={c.label} className="flex items-baseline gap-3 py-5 sm:flex-col sm:items-center sm:gap-1 sm:text-center">
              <p className="w-20 flex-shrink-0 whitespace-nowrap font-display text-3xl font-semibold text-cabo-navy sm:w-auto">{c.figure}</p>
              <p className="text-sm text-cabo-slate">{c.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FALSE BELIEFS ─── */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10">
          <h2 className="max-w-3xl font-display text-3xl font-semibold leading-tight text-cabo-navy lg:text-[2.75rem]">
            Three beliefs that cost buyers the most money in Mexico
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-cabo-slate">
            All three are on the guide&apos;s list of the ten most expensive mistakes buyers make.
          </p>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {MISTAKES.map((m) => (
              <div key={m.belief} className="rounded-2xl bg-white p-6 ring-1 ring-divider lg:p-7">
                <p className="text-lg font-semibold leading-snug text-cabo-navy">{m.belief}</p>
                <p className="mt-4 border-t border-divider pt-4 text-[15px] leading-relaxed text-cabo-slate">
                  <span className="font-semibold text-ocean-teal">What&apos;s actually true: </span>
                  {m.truth}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── LOOK INSIDE: the real pages, not a mockup ─── */}
      <section className="bg-cream py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <h2 className="font-display text-3xl font-semibold leading-tight text-cabo-navy lg:text-[2.75rem]">
                Look inside the guide
              </h2>
              <p className="mt-4 text-lg text-cabo-slate">
                Written by the team that closes these deals, with real 2026 numbers. Ten chapters:
              </p>
              <ol className="mt-6 space-y-2.5">
                {CHAPTERS.map((c, i) => (
                  <li key={c} className="flex gap-3 text-cabo-navy">
                    <span className="w-6 flex-shrink-0 text-right font-semibold text-sand-gold-dark">{i + 1}.</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ol>
              <a
                href={`#${FORM_TOP}`}
                className="mt-8 inline-block rounded-lg bg-cta px-7 py-4 text-lg font-bold text-white shadow-lg shadow-cta/25 transition hover:bg-cta-dark"
              >
                Send me the free guide
              </a>
            </div>

            <div className="order-first grid grid-cols-3 gap-3 sm:gap-5 lg:order-none">
              {PAGES.map((p, i) => (
                <figure key={p.src} className={i === 1 ? "sm:-translate-y-6" : ""}>
                  <Image
                    src={p.src}
                    alt={`Page from the guide: ${p.caption}`}
                    width={935}
                    height={1210}
                    sizes="(min-width: 1024px) 220px, 30vw"
                    className="h-auto w-full rounded-md bg-white shadow-xl ring-1 ring-black/10"
                  />
                  <figcaption className="mt-2 text-center text-xs font-medium text-cabo-slate sm:text-sm">
                    {p.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── STORY: a real person ─── */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto grid max-w-5xl items-center gap-10 px-4 sm:px-6 md:grid-cols-[260px_1fr] lg:px-10">
          <Image
            src="/images/agent/aaron.jpg"
            alt="Aaron Cuha"
            width={480}
            height={480}
            sizes="260px"
            className="mx-auto h-52 w-52 rounded-full object-cover shadow-xl ring-4 ring-white md:h-64 md:w-64"
          />
          <div>
            <h2 className="font-display text-3xl font-semibold leading-tight text-cabo-navy lg:text-4xl">
              Why we wrote this down
            </h2>
            <div className="mt-5 space-y-4 text-lg leading-relaxed text-cabo-slate">
              <p>
                Most buyers I talk to have done their homework. They have watched the videos and read the
                blogs. What trips them up is the part nobody explains in one place: how title actually
                works here, what closing really costs, and which red flags matter.
              </p>
              <p>
                So we put everything we walk our own clients through into one guide, and made it free.
                Read it before your first showing and you will ask better questions than most agents do.
              </p>
            </div>
            <p className="mt-6 font-semibold text-cabo-navy">Aaron Cuha</p>
            <p className="text-sm text-cabo-slate">Living In Cabo, in partnership with Ronival Real Estate</p>
          </div>
        </div>
      </section>

      {/* ─── REGIONS: real photos ─── */}
      <section className="bg-cabo-navy py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10">
          <h2 className="max-w-3xl font-display text-3xl font-semibold leading-tight text-white lg:text-[2.75rem]">
            Five regions. Very different lives. Chapter 6 tells you which one fits.
          </h2>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
            {REGIONS.map((r, i) => (
              <div
                key={r.name}
                className={`relative aspect-[3/4] overflow-hidden rounded-xl ${i === 0 ? "col-span-2 aspect-[16/10] lg:col-span-1 lg:aspect-[3/4]" : ""}`}
              >
                <Image src={r.img} alt={r.name} fill sizes="(min-width: 1024px) 230px, 50vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                  <p className="font-semibold text-white">{r.name}</p>
                  <p className="mt-0.5 text-xs leading-snug text-white/80 sm:text-sm">{r.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS: real, named ─── */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10">
          <h2 className="font-display text-3xl font-semibold leading-tight text-cabo-navy lg:text-[2.75rem]">
            What Ronival buyers say
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {quotes.map((t) => (
              <figure key={t.name} className="flex flex-col rounded-2xl bg-white p-6 ring-1 ring-divider">
                <span className="font-display text-5xl leading-none text-sand-gold" aria-hidden>&ldquo;</span>
                <blockquote className="mt-1 flex-1 text-lg leading-relaxed text-cabo-navy">{t.quote}</blockquote>
                <figcaption className="mt-5 text-sm">
                  <span className="font-semibold text-cabo-navy">{t.name}</span>
                  <span className="text-cabo-slate">, {t.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-4 text-sm text-text-muted">Reviews from ronival.com, lightly trimmed.</p>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="bg-cream py-16 lg:py-24">
        <div className="faq mx-auto max-w-3xl px-4 sm:px-6 lg:px-10">
          <h2 className="font-display text-3xl font-semibold leading-tight text-cabo-navy lg:text-[2.75rem]">
            Questions buyers ask first
          </h2>
          <div className="mt-8 divide-y divide-divider border-y border-divider">
            {FAQS.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-lg font-semibold text-cabo-navy">
                  {f.q}
                  <span className="faq-plus mt-0.5 text-2xl leading-none text-sand-gold-dark transition-transform" aria-hidden>
                    +
                  </span>
                </summary>
                <p className="mt-3 leading-relaxed text-cabo-slate">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CLOSE: the offer again ─── */}
      <section className="relative isolate overflow-hidden py-16 lg:py-24">
        <Image
          src="/images/quiz/guide/chileno-bay.jpg"
          alt=""
          fill
          sizes="100vw"
          className="-z-10 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-cabo-navy-deep/75" />
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-10">
          <div>
            <h2 className="font-display text-3xl font-semibold leading-tight text-white lg:text-5xl">
              Walk into your first showing knowing more than most agents.
            </h2>
            <p className="mt-4 text-lg text-white/85">
              33 pages. Free. Read it on the flight down.
            </p>
          </div>
          <div id={FORM_BOTTOM} className="scroll-mt-6">
            <GuideForm heading="Send me the guide" />
          </div>
        </div>
      </section>

      <footer className="bg-cabo-navy-deep px-4 py-10 text-center">
        <p className="text-sm text-white/70">
          &copy; 2026 Living In Cabo, in partnership with Ronival Real Estate.
        </p>
        <p className="mx-auto mt-3 max-w-2xl text-xs leading-relaxed text-white/45">
          General information about buying real estate in Mexico, not legal, tax or investment advice.
          Confirm specifics with a licensed notario p&uacute;blico and a cross-border tax professional.
        </p>
      </footer>

      <StickyCta watch={[FORM_TOP, FORM_BOTTOM]} />
    </div>
  );
}

function Check() {
  return (
    <svg className="mt-1 h-5 w-5 flex-shrink-0 text-sand-gold" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}
