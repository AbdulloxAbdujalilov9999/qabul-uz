"use client";

import { useState } from "react";
import { Check } from "lucide-react";

export function CopyLink({ path }: { path: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <div className="flex items-center gap-2 rounded-lg border border-ink-900/15 bg-ink-50 px-3 py-2">
      <input readOnly value={path} className="flex-1 truncate bg-transparent text-xs text-ink-700 outline-none" />
      <button
        onClick={async () => {
          const fullUrl = `${window.location.origin}${path}`;
          try {
            await navigator.clipboard.writeText(fullUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          } catch {
            // clipboard unavailable, user can select-copy manually
          }
        }}
        className="flex shrink-0 items-center gap-1 rounded-md bg-brand-700 px-2.5 py-1 text-xs font-medium text-white hover:bg-brand-800"
      >
        {copied ? <>Nusxalandi <Check className="h-3 w-3" /></> : "Nusxalash"}
      </button>
    </div>
  );
}
