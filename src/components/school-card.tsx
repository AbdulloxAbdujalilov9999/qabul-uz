import Link from "next/link";
import { getSchoolMark } from "./school-badge";

export function SchoolCard({
  schoolId,
  name,
  caseStudyCount,
  readCount,
  people,
}: {
  schoolId: string;
  name: string;
  caseStudyCount: number;
  readCount: number;
  people: string[]; // display names of related case studies/mentors, for the avatar stack
}) {
  const { abbr, bg } = getSchoolMark(schoolId);
  const shown = people.slice(0, 3);
  const extra = people.length - shown.length;

  return (
    <Link href={`/dasturlar/${schoolId}`} className="group block">
      <div
        className="relative h-44 overflow-hidden rounded-2xl p-5 text-white shadow-sm transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:shadow-lg"
        style={{ backgroundColor: bg }}
      >
        {/* watermark monogram */}
        <span
          aria-hidden
          className="pointer-events-none absolute -right-3 -top-3 select-none text-7xl font-black italic tracking-tighter text-white/15"
        >
          {abbr}
        </span>

        <p className="relative text-lg font-extrabold leading-snug drop-shadow-sm">{name}</p>

        {caseStudyCount === 0 ? (
          <span className="absolute bottom-5 left-5 rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wide backdrop-blur-sm">
            Tez orada
          </span>
        ) : (
          <>
            <div className="absolute bottom-5 left-5 flex items-center">
              {shown.map((p, i) => (
                <div
                  key={p + i}
                  className="grid h-8 w-8 place-items-center rounded-full border-2 bg-white text-xs font-bold text-ink-900"
                  style={{ borderColor: bg, marginLeft: i === 0 ? 0 : -10 }}
                >
                  {p[0]}
                </div>
              ))}
              {extra > 0 && (
                <div
                  className="grid h-8 w-8 place-items-center rounded-full border-2 bg-white/30 text-xs font-bold backdrop-blur-sm"
                  style={{ borderColor: bg, marginLeft: -10 }}
                >
                  +{extra}
                </div>
              )}
            </div>

            <div className="absolute bottom-5 right-5 flex flex-col items-end gap-1.5">
              <span className="rounded-full bg-white/20 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide backdrop-blur-sm">
                {caseStudyCount} keys
              </span>
              <span className="rounded-full bg-white/20 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide backdrop-blur-sm">
                {readCount} o&apos;qildi
              </span>
            </div>
          </>
        )}
      </div>
    </Link>
  );
}
