"use client";

import { useTransition } from "react";
import { addToCollegeList, removeFromCollegeList } from "@/lib/actions/college-list";
import type { ListBucket } from "@/lib/types";

const buckets: { value: ListBucket; label: string }[] = [
  { value: "reach", label: "Reach" },
  { value: "target", label: "Target" },
  { value: "safety", label: "Safety" },
];

export function AddToListButtons({ schoolId }: { schoolId: string }) {
  const [pending, startTransition] = useTransition();
  return (
    <div className="flex gap-1.5">
      {buckets.map((b) => (
        <button
          key={b.value}
          disabled={pending}
          onClick={() => startTransition(() => addToCollegeList(schoolId, b.value))}
          className="rounded-full border border-ink-900/15 px-2.5 py-1 text-xs font-medium text-ink-600 hover:border-brand-500 hover:text-brand-700"
        >
          + {b.label}
        </button>
      ))}
    </div>
  );
}

export function RemoveFromListButton({ entryId }: { entryId: string }) {
  const [pending, startTransition] = useTransition();
  return (
    <button
      disabled={pending}
      onClick={() => startTransition(() => removeFromCollegeList(entryId))}
      className="text-xs font-medium text-ink-400 hover:text-red-600"
    >
      olib tashlash
    </button>
  );
}
