import { SchoolBadge } from "./school-badge";

// Continuously auto-scrolling strip of partner/program logos. The list is
// rendered twice back to back and the whole track is animated exactly one
// copy's width to the left, so the loop is seamless.
export function LogoMarquee({ schoolIds }: { schoolIds: string[] }) {
  const track = [...schoolIds, ...schoolIds];
  return (
    <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div
        className="flex w-max items-center gap-8 py-1 [animation:marquee_32s_linear_infinite] group-hover:[animation-play-state:paused]"
      >
        {track.map((id, i) => (
          <SchoolBadge key={`${id}-${i}`} schoolId={id} size="lg" />
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
