"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export function BackButton({ className = "", tone = "default" }: { className?: string; tone?: "default" | "inverted" }) {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => router.back()}
      className={`inline-flex items-center gap-1.5 text-sm font-medium transition-colors ${
        tone === "inverted" ? "text-white/85 hover:text-white" : "text-ink-600 hover:text-ink-900"
      } ${className}`}
    >
      <ArrowLeft className="h-4 w-4" />
      Orqaga
    </button>
  );
}
