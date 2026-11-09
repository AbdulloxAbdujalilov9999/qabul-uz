// Yulduz ("star") - UniSprint's original mascot. Hand-drawn inline SVG, not a
// generated raster image: a friendly five-point star wearing a tiny mortarboard.
export function Mascot({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* soft shadow */}
      <ellipse cx="100" cy="178" rx="46" ry="8" className="fill-ink-900/10" />

      {/* star body */}
      <path
        d="M100 18
           L118 72
           L176 72
           L130 106
           L148 162
           L100 128
           L52 162
           L70 106
           L24 72
           L82 72
           Z"
        className="fill-accent-400"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinejoin="round"
        style={{ color: "var(--color-accent-600)" }}
      />

      {/* cheeks */}
      <circle cx="76" cy="104" r="7" className="fill-accent-200" opacity="0.8" />
      <circle cx="124" cy="104" r="7" className="fill-accent-200" opacity="0.8" />

      {/* eyes */}
      <circle cx="84" cy="92" r="6" className="fill-ink-950" />
      <circle cx="116" cy="92" r="6" className="fill-ink-950" />
      <circle cx="86.5" cy="89.5" r="1.8" fill="white" />
      <circle cx="118.5" cy="89.5" r="1.8" fill="white" />

      {/* smile */}
      <path d="M86 106 Q100 118 114 106" stroke="#11212E" strokeWidth="4" strokeLinecap="round" fill="none" />

      {/* mortarboard */}
      <g transform="translate(100 44) rotate(-8)">
        <rect x="-30" y="-4" width="60" height="8" rx="2" className="fill-brand-800" />
        <path d="M-34 0 L0 -14 L34 0 L0 14 Z" className="fill-brand-700" />
        <line x1="24" y1="2" x2="30" y2="26" stroke="var(--color-accent-500)" strokeWidth="3" strokeLinecap="round" />
        <circle cx="30" cy="28" r="3.5" className="fill-accent-500" />
      </g>
    </svg>
  );
}
