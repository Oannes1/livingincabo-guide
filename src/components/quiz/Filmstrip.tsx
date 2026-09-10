"use client";

import strip from "@/data/strip.json";

/**
 * The forty communities, as photographs instead of a list of names.
 *
 * This is the section that makes the depth claim believable. A row of text
 * chips said "we cover 40 places". A row of the actual places says it.
 *
 * Two rows travelling in opposite directions, offset by half a frame, so the
 * eye reads a landscape rather than a conveyor belt. Pauses on hover; under
 * reduced motion it simply becomes a scrollable strip.
 */
type Item = { slug: string; name: string; region: string };
const ALL = strip as Item[];
const A = ALL.filter((_, i) => i % 2 === 0);
const B = ALL.filter((_, i) => i % 2 === 1);

function Row({ items, reverse }: { items: Item[]; reverse?: boolean }) {
  const loop = [...items, ...items];
  return (
    <div className={`strip flex w-max gap-3 ${reverse ? "strip-rev" : ""}`}>
      {loop.map((c, i) => (
        <figure
          key={`${c.slug}-${i}`}
          className="relative h-[150px] w-[230px] md:h-[190px] md:w-[300px] flex-shrink-0 overflow-hidden rounded-[1rem] ring-1 ring-cabo-navy/10"
        >
          <img
            src={`/images/quiz/strip/${c.slug}.jpg`}
            alt={c.name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(4,17,31,.82) 0%, rgba(4,17,31,0) 55%)" }}
          />
          <figcaption className="absolute inset-x-0 bottom-0 p-3.5">
            <p className="text-white text-[13.5px] font-semibold leading-tight">{c.name}</p>
            <p className="text-white/55 text-[11px] mt-0.5">{c.region}</p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export default function Filmstrip() {
  return (
    <section className="bg-cream py-16 md:py-24 overflow-hidden">
      <div className="max-w-[1180px] mx-auto px-5 md:px-8 mb-9 md:mb-12">
        <h2 className="heading-display text-cabo-navy text-[clamp(2rem,4.2vw,3.4rem)] leading-[1.04] tracking-[-0.01em] max-w-[22ch]">
          Every one of the forty, scored against your answers.
        </h2>
        <p className="text-cabo-slate text-[16px] leading-relaxed max-w-[58ch] mt-4">
          Downtown Cabo San Lucas to the East Cape and round to the Pacific. Real price bands,
          swim safety, airport minutes, HOA dues. Our own library, not a listing feed.
        </p>
      </div>

      <div className="space-y-3 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        <Row items={A} />
        <Row items={B} reverse />
      </div>

      <style jsx>{`
        .strip {
          animation: go 70s linear infinite;
        }
        .strip-rev {
          animation-direction: reverse;
        }
        .strip:hover {
          animation-play-state: paused;
        }
        @keyframes go {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .strip {
            animation: none;
            overflow-x: auto;
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
