// Colorful monogram marks standing in for school/program logos. Original
// marks (a letter-mark on a solid color), not a reproduction of any
// institution's actual logo or trademark.
const palette: Record<string, { abbr: string; bg: string }> = {
  sch_elyurt: { abbr: "EYU", bg: "#0F6E68" },
  sch_fulbright: { abbr: "FB", bg: "#1D4ED8" },
  sch_chevening: { abbr: "CHV", bg: "#7C2D92" },
  sch_daad: { abbr: "DAAD", bg: "#B91C1C" },
  sch_gks: { abbr: "GKS", bg: "#0E7490" },
  sch_erasmus: { abbr: "E+", bg: "#4338CA" },
  sch_mit: { abbr: "MIT", bg: "#1F2937" },
  sch_oxford: { abbr: "OX", bg: "#1E3A8A" },
  sch_ethz: { abbr: "ETH", bg: "#0369A1" },
  sch_snu: { abbr: "SNU", bg: "#DC2626" },
  sch_nu: { abbr: "NU", bg: "#047857" },
  sch_wiut: { abbr: "WIUT", bg: "#92400E" },
  sch_inha: { abbr: "INHA", bg: "#BE123C" },
  sch_kaist: { abbr: "KST", bg: "#0891B2" },
  sch_tum: { abbr: "TUM", bg: "#2563EB" },
  sch_epfl: { abbr: "EPFL", bg: "#9D174D" },
  sch_toronto: { abbr: "UofT", bg: "#312E81" },
  sch_nus: { abbr: "NUS", bg: "#B45309" },
  sch_anu: { abbr: "ANU", bg: "#065F46" },
  sch_turkiye_burslari: { abbr: "TB", bg: "#C2410C" },
  sch_mext: { abbr: "MEXT", bg: "#BE185D" },
  sch_tsue: { abbr: "TSUE", bg: "#0D9488" },
  sch_newuz: { abbr: "NUZ", bg: "#15803D" },
  sch_amity: { abbr: "AMT", bg: "#6D28D9" },
};

const fallbackColors = ["#0F6E68", "#1D4ED8", "#B91C1C", "#7C2D92", "#047857", "#B45309", "#0E7490", "#BE123C"];

// Official logos, sourced from each institution's own press/brand assets or
// Wikimedia Commons, used only to identify that institution's own program on
// its own page/card (never implying sponsorship or a partnership with us).
// Where no reliably-sourced logo was available, SchoolBadge falls back to the
// colored monogram above instead of guessing.
export const realLogos: Record<string, string> = {
  sch_fulbright: "/logos/sch_fulbright.svg",
  sch_daad: "/logos/sch_daad.svg",
  sch_mit: "/logos/sch_mit.svg",
  sch_oxford: "/logos/sch_oxford.png",
  sch_ethz: "/logos/sch_ethz.svg",
  sch_snu: "/logos/sch_snu.svg",
  sch_inha: "/logos/sch_inha.png",
  sch_kaist: "/logos/sch_kaist.svg",
  sch_tum: "/logos/sch_tum.svg",
  sch_epfl: "/logos/sch_epfl.svg",
  sch_tsue: "/logos/sch_tsue.png",
  sch_newuz: "/logos/sch_newuz.jpg",
};

export function getSchoolMark(schoolId: string): { abbr: string; bg: string } {
  if (palette[schoolId]) return palette[schoolId];
  const letters = schoolId.replace("sch_", "").slice(0, 3).toUpperCase();
  let hash = 0;
  for (const ch of schoolId) hash = (hash * 31 + ch.charCodeAt(0)) % fallbackColors.length;
  return { abbr: letters, bg: fallbackColors[hash] };
}

const sizeClasses = {
  xs: "h-6 w-6 text-[8px] rounded-md",
  sm: "h-9 w-9 text-[10px] rounded-lg",
  md: "h-12 w-12 text-xs rounded-xl",
  lg: "h-16 w-16 text-sm rounded-xl",
};

const logoPadding = {
  xs: "p-1",
  sm: "p-1.5",
  md: "p-2",
  lg: "p-2.5",
};

export function SchoolBadge({ schoolId, size = "md" }: { schoolId: string; size?: keyof typeof sizeClasses }) {
  const logo = realLogos[schoolId];
  if (logo) {
    return (
      <div
        className={`grid shrink-0 place-items-center border border-ink-900/8 bg-white shadow-sm ${sizeClasses[size]} ${logoPadding[size]}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} alt={schoolId} className="h-full w-full object-contain" />
      </div>
    );
  }
  const { abbr, bg } = getSchoolMark(schoolId);
  return (
    <div
      className={`grid shrink-0 place-items-center font-extrabold tracking-tight text-white shadow-sm ${sizeClasses[size]}`}
      style={{ backgroundColor: bg }}
    >
      {abbr}
    </div>
  );
}
