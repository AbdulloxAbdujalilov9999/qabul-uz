// Colorful monogram badges standing in for school/program logos. Original
// marks (a letter-mark on a solid color), not a reproduction of any
// institution's actual logo or trademark.
const palette: Record<string, { abbr: string; bg: string }> = {
  sch_elyurt: { abbr: "EYU", bg: "#0F6E68" },
  sch_fulbright: { abbr: "FB", bg: "#1D4ED8" },
  sch_chevening: { abbr: "CHV", bg: "#7C2D92" },
  sch_daad: { abbr: "DAAD", bg: "#B91C1C" },
  sch_gks: { abbr: "GKS", bg: "#0E7490" },
  sch_erasmus: { abbr: "E+", bg: "#1E40AF" },
  sch_mit: { abbr: "MIT", bg: "#111827" },
  sch_oxford: { abbr: "OX", bg: "#1E3A8A" },
  sch_ethz: { abbr: "ETH", bg: "#0369A1" },
  sch_snu: { abbr: "SNU", bg: "#1D4ED8" },
  sch_nu: { abbr: "NU", bg: "#047857" },
  sch_wiut: { abbr: "WIUT", bg: "#92400E" },
  sch_inha: { abbr: "INHA", bg: "#B91C1C" },
  sch_kaist: { abbr: "KST", bg: "#0E7490" },
  sch_tum: { abbr: "TUM", bg: "#1D4ED8" },
  sch_epfl: { abbr: "EPFL", bg: "#BE123C" },
  sch_toronto: { abbr: "UofT", bg: "#1E3A8A" },
  sch_nus: { abbr: "NUS", bg: "#B45309" },
  sch_anu: { abbr: "ANU", bg: "#1D4ED8" },
  sch_turkiye_burslari: { abbr: "TB", bg: "#B91C1C" },
  sch_mext: { abbr: "MEXT", bg: "#BE123C" },
  sch_tsue: { abbr: "TSUE", bg: "#0F6E68" },
  sch_newuz: { abbr: "NUZ", bg: "#047857" },
  sch_amity: { abbr: "AMT", bg: "#7C2D92" },
};

const fallbackColors = ["#0F6E68", "#1D4ED8", "#B91C1C", "#7C2D92", "#047857", "#B45309", "#0E7490", "#BE123C"];

function fallback(schoolId: string): { abbr: string; bg: string } {
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

export function SchoolBadge({ schoolId, size = "md" }: { schoolId: string; size?: keyof typeof sizeClasses }) {
  const { abbr, bg } = palette[schoolId] ?? fallback(schoolId);
  return (
    <div
      className={`grid shrink-0 place-items-center font-extrabold tracking-tight text-white shadow-sm ${sizeClasses[size]}`}
      style={{ backgroundColor: bg }}
    >
      {abbr}
    </div>
  );
}
