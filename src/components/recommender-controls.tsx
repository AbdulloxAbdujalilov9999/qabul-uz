"use client";

import { useTransition } from "react";
import { removeRecommender, setRecommenderStatus } from "@/lib/actions/recommenders";
import type { Recommender } from "@/lib/types";

const statusOptions: { value: Recommender["status"]; label: string }[] = [
  { value: "requested", label: "So'rov yuborildi" },
  { value: "packet_sent", label: "Paket yuborildi" },
  { value: "submitted", label: "Topshirdi" },
];

export function RecommenderStatusSelect({ id, status }: { id: string; status: Recommender["status"] }) {
  const [pending, startTransition] = useTransition();
  return (
    <select
      value={status}
      disabled={pending}
      onChange={(e) => startTransition(() => setRecommenderStatus(id, e.target.value as Recommender["status"]))}
      className="rounded-full border border-ink-900/15 bg-white px-2.5 py-1 text-xs font-medium text-ink-700 outline-none focus:border-brand-500"
    >
      {statusOptions.map((s) => (
        <option key={s.value} value={s.value}>{s.label}</option>
      ))}
    </select>
  );
}

export function RemoveRecommenderButton({ id }: { id: string }) {
  const [pending, startTransition] = useTransition();
  return (
    <button
      disabled={pending}
      onClick={() => startTransition(() => removeRecommender(id))}
      className="text-xs font-medium text-ink-400 hover:text-red-600"
    >
      olib tashlash
    </button>
  );
}
