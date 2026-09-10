import Reveal from "./Reveal";

/**
 * What you walk away with — three photographic panels, not three text cards.
 *
 * Each deliverable sits at the foot of a real Los Cabos photograph. The
 * middle panel is deliberately taller and starts lower, so the row has a
 * horizon line instead of three identical rectangles.
 */
const PANELS = [
  {
    img: "/images/quiz/land/cerritos-beach.jpg",
    n: "One",
    t: "A ranked shortlist, free and unlocked",
    b: "Your top communities in order, scored and reasoned. On screen the moment you finish. No email to see it.",
    place: "Cerritos, Pacific side",
  },
  {
    img: "/images/quiz/land/cabo-del-sol.jpg",
    n: "Two",
    t: "What each one would cost you",
    b: "The part nobody else says out loud: higher dues, a beach you can't swim, a drive to the hospital, a street that empties in September.",
    place: "Cabo del Sol, the corridor",
    tall: true,
  },
  {
    img: "/images/quiz/land/maravilla.jpg",
    n: "Three",
    t: "Where your own answers disagree",
    b: "Ask Cabo for walkable and silent, or golf and a village high street, and it can't give you both. We say so as you choose.",
    place: "Maravilla, Cabo San Lucas",
  },
];

export default function Triptych() {
  return (
    <section className="bg-cabo-navy-deep py-16 md:py-24">
      <div className="max-w-[1180px] mx-auto px-5 md:px-8">
        <Reveal>
          <h2 className="heading-display text-white text-[clamp(2rem,4.2vw,3.4rem)] leading-[1.04] tracking-[-0.01em] max-w-[18ch] mb-10 md:mb-14">
            Ninety seconds in. Here&apos;s what you leave with.
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-4 md:gap-5 md:items-end">
          {PANELS.map((p, i) => (
            <Reveal key={p.n} delay={i * 110}>
              <article
                className={`group relative overflow-hidden rounded-[1.5rem] ring-1 ring-white/10 ${
                  p.tall ? "h-[440px] md:h-[560px]" : "h-[440px] md:h-[480px]"
                }`}
              >
                <img
                  src={p.img}
                  alt={p.place}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(4,17,31,.96) 0%, rgba(4,17,31,.78) 34%, rgba(4,17,31,.15) 62%, rgba(4,17,31,0) 100%)",
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                  <p className="heading-editorial italic text-sand-gold text-lg mb-2">{p.n}</p>
                  <h3 className="heading-display text-white text-[1.55rem] md:text-[1.7rem] leading-[1.12] mb-2.5">
                    {p.t}
                  </h3>
                  <p className="text-white/68 text-[14px] leading-relaxed">{p.b}</p>
                  <p className="text-white/35 text-[11px] mt-4 tracking-wide">{p.place}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
