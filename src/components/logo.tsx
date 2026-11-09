import Image from "next/image";

const sizeMap = {
  sm: { icon: 22, text: "text-base" },
  md: { icon: 28, text: "text-lg" },
  lg: { icon: 34, text: "text-xl" },
};

// UniSprint wordmark: icon mark + two-tone "Uni" (ink, or white on dark backgrounds) / "Sprint" (electric blue).
export function Logo({ size = "md", tone = "default" }: { size?: keyof typeof sizeMap; tone?: "default" | "inverted" }) {
  const { icon, text } = sizeMap[size];
  return (
    <span className={`inline-flex items-center gap-2 font-extrabold tracking-tight ${text}`}>
      <Image src="/logo/icon.png" alt="" width={icon} height={icon} className="shrink-0" priority />
      <span className={tone === "inverted" ? "text-white" : "text-ink-950"}>
        Uni<span className={tone === "inverted" ? "text-brand-400" : "text-brand-600"}>Sprint</span>
      </span>
    </span>
  );
}
