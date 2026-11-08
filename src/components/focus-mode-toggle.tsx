"use client";

import { useTransition } from "react";
import { toggleFocusMode } from "@/lib/actions/lessons";

export function FocusModeToggle({ enabled }: { enabled: boolean }) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      onClick={() => startTransition(() => toggleFocusMode())}
      disabled={pending}
      className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
        enabled ? "border-accent-400 bg-accent-50 text-accent-800" : "border-ink-900/15 text-ink-500"
      }`}
    >
      <span className={`h-2.5 w-2.5 rounded-full ${enabled ? "bg-accent-500" : "bg-ink-300"}`} />
      Diqqat rejimi {enabled ? "yoqilgan" : "o'chirilgan"}
    </button>
  );
}
