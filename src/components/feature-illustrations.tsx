// Original hand-drawn inline SVG illustrations for the homepage feature
// rows - not generated raster images, matching the Yulduz mascot's style.
// Each sits in an aspect-[4/3] card and carries a couple of purely
// decorative floating/pulsing bits (no links, nothing to click).

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-gradient-to-br from-brand-100 to-accent-100">
      {children}
    </div>
  );
}

export function ScholarshipMatchIllustration() {
  return (
    <Card>
      <svg viewBox="0 0 400 300" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="330" cy="50" r="10" className="fill-accent-300 animate-pulse" style={{ animationDuration: "3s" }} />
        <circle cx="60" cy="230" r="7" className="fill-brand-300 animate-pulse" style={{ animationDuration: "2.4s" }} />

        <g transform="translate(90 70)">
          <rect x="0" y="0" width="180" height="150" rx="16" className="fill-white" stroke="var(--color-brand-700)" strokeWidth="5" />
          <rect x="24" y="30" width="100" height="12" rx="6" className="fill-brand-200" />
          <rect x="24" y="58" width="132" height="10" rx="5" className="fill-ink-100" />
          <rect x="24" y="78" width="132" height="10" rx="5" className="fill-ink-100" />
          <rect x="24" y="98" width="80" height="10" rx="5" className="fill-ink-100" />
          <g transform="translate(24 16)">
            <path d="M0 10 L4 0 L8 10 L18 10 L10 16 L13 26 L4 20 L-5 26 L-2 16 L-10 10 Z" className="fill-accent-400" />
          </g>
        </g>

        <g className="origin-center" style={{ animation: "float-scholarship 4s ease-in-out infinite" }}>
          <circle cx="285" cy="195" r="34" className="fill-accent-400" stroke="var(--color-accent-600)" strokeWidth="5" />
          <path d="M273 195 L282 204 L300 184" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </g>

        <style>{`
          @keyframes float-scholarship {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
          }
        `}</style>
      </svg>
    </Card>
  );
}

export function ActivitiesListIllustration() {
  return (
    <Card>
      <svg viewBox="0 0 400 300" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="60" r="8" className="fill-brand-300 animate-pulse" style={{ animationDuration: "2.8s" }} />

        <g transform="translate(110 46)">
          <rect x="0" y="0" width="180" height="210" rx="18" className="fill-white" stroke="var(--color-brand-700)" strokeWidth="5" />
          {[0, 1, 2, 3].map((i) => (
            <g key={i} transform={`translate(22 ${36 + i * 44})`}>
              <rect
                x="0"
                y="0"
                width="22"
                height="22"
                rx="6"
                className={i < 3 ? "fill-brand-600" : "fill-ink-100"}
                stroke={i < 3 ? "var(--color-brand-700)" : "var(--color-ink-300)"}
                strokeWidth="3"
              />
              {i < 3 && <path d="M4 11 L9 16 L18 5" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />}
              <rect x="34" y="4" width="112" height="14" rx="7" className={i < 3 ? "fill-ink-100" : "fill-ink-50"} />
            </g>
          ))}
        </g>

        <g style={{ animation: "float-activities 3.6s ease-in-out infinite" }}>
          <circle cx="314" cy="80" r="30" className="fill-accent-400" stroke="var(--color-accent-600)" strokeWidth="5" />
          <path
            d="M314 64 L320 76 L333 78 L324 87 L326 100 L314 94 L302 100 L304 87 L295 78 L308 76 Z"
            className="fill-white"
          />
        </g>

        <style>{`
          @keyframes float-activities {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-6px) rotate(4deg); }
          }
        `}</style>
      </svg>
    </Card>
  );
}

export function EssayCoachIllustration() {
  return (
    <Card>
      <svg viewBox="0 0 400 300" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="70" cy="240" r="8" className="fill-accent-300 animate-pulse" style={{ animationDuration: "3.2s" }} />

        <g transform="translate(96 54) rotate(-4)">
          <rect x="0" y="0" width="150" height="190" rx="10" className="fill-white" stroke="var(--color-brand-700)" strokeWidth="5" />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <rect key={i} x="20" y={30 + i * 24} width={i === 5 ? 70 : 110} height="8" rx="4" className="fill-ink-100" />
          ))}
        </g>

        <g style={{ animation: "write-bob 2.2s ease-in-out infinite" }}>
          <g transform="translate(248 150) rotate(42)">
            <rect x="-9" y="-70" width="18" height="70" rx="5" className="fill-accent-400" stroke="var(--color-accent-600)" strokeWidth="4" />
            <path d="M-9 -70 L0 -92 L9 -70 Z" className="fill-ink-900" />
          </g>
        </g>

        <g style={{ animation: "float-essay 3.4s ease-in-out infinite" }}>
          <path d="M290 50 Q330 40 340 70 Q344 90 322 96 L326 112 L304 94 Q276 86 280 64 Q282 54 290 50 Z" className="fill-brand-600" />
          <circle cx="302" cy="70" r="3.5" fill="white" />
          <circle cx="312" cy="70" r="3.5" fill="white" />
          <circle cx="322" cy="70" r="3.5" fill="white" />
        </g>

        <style>{`
          @keyframes write-bob {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-5px) rotate(-2deg); }
          }
          @keyframes float-essay {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-7px); }
          }
        `}</style>
      </svg>
    </Card>
  );
}

export function DailyPlanIllustration() {
  return (
    <Card>
      <svg viewBox="0 0 400 300" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="340" cy="60" r="7" className="fill-brand-300 animate-pulse" style={{ animationDuration: "2.6s" }} />

        <path
          d="M60 240 C 110 240, 110 180, 160 180 S 210 120, 260 120 S 310 70, 340 70"
          stroke="var(--color-brand-400)"
          strokeWidth="5"
          strokeDasharray="2 14"
          strokeLinecap="round"
          fill="none"
        />

        {[
          { cx: 60, cy: 240, done: true },
          { cx: 160, cy: 180, done: true },
          { cx: 260, cy: 120, done: false },
        ].map((p, i) => (
          <g key={i} transform={`translate(${p.cx} ${p.cy})`}>
            <circle r="18" className={p.done ? "fill-brand-600" : "fill-white"} stroke="var(--color-brand-700)" strokeWidth="5" />
            {p.done && <path d="M-7 0 L-2 6 L8 -7" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />}
          </g>
        ))}

        <g style={{ animation: "float-plan 3s ease-in-out infinite" }} transform="translate(340 70)">
          <circle r="22" className="fill-accent-400" stroke="var(--color-accent-600)" strokeWidth="5" />
          <path d="M0 -10 L0 2 L8 8" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </g>

        <style>{`
          @keyframes float-plan {
            0%, 100% { transform: translate(340px, 70px) scale(1); }
            50% { transform: translate(340px, 62px) scale(1.06); }
          }
        `}</style>
      </svg>
    </Card>
  );
}
