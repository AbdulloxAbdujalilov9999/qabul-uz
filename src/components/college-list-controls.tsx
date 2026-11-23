"use client";

import { useTransition } from "react";
import { addToCollegeList, removeFromCollegeList, updateCollegeListStatus } from "@/lib/actions/college-list";
import type { CollegeListEntry, ListBucket } from "@/lib/types";
import { STATUS_ORDER, STATUS_META } from "@/lib/application-status";

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

export function CollegeStatusSelect({ entryId, status }: { entryId: string; status: CollegeListEntry["status"] }) {
  const [pending, startTransition] = useTransition();
  return (
    <select
      value={status}
      disabled={pending}
      onChange={(e) => startTransition(() => updateCollegeListStatus(entryId, e.target.value as CollegeListEntry["status"]))}
      className="rounded-full border border-ink-900/15 bg-white px-2.5 py-1 text-xs font-medium text-ink-700 outline-none focus:border-brand-500"
    >
      {STATUS_ORDER.map((s) => (
        <option key={s} value={s}>{STATUS_META[s].label}</option>
      ))}
    </select>
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
