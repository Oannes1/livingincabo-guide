import FlyingMap from "@/components/quiz/FlyingMap";
import { matchCommunities } from "@/lib/match";

/** Dev-only harness: the map at four stages of narrowing, side by side. */
const STAGES = [
  { label: "Nothing chosen", a: {} },
  { label: "Beachfront", a: { setting: "beachfront" } },
  { label: "+ walkable, gated", a: { setting: "walkable", mustHaves: ["gated", "walkable"] } },
  { label: "+ surf, East Cape", a: { setting: "offradar", vibe: "surf", mustHaves: ["swimmable"] } },
];

export default function MapPreview() {
  return (
    <div className="min-h-screen bg-sand-light p-8">
      <h1 className="heading-display text-cabo-navy text-3xl mb-6">Map narrowing</h1>
      <div className="grid grid-cols-4 gap-5" style={{ height: 560 }}>
        {STAGES.map((s) => (
          <div key={s.label} className="flex flex-col gap-2">
            <p className="label-caps text-cabo-navy text-[10px]">{s.label}</p>
            <div className="flex-1">
              <FlyingMap ranked={matchCommunities(s.a)} label={s.label} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
