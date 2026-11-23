"use client";

import { useState } from "react";
import type { School } from "@/lib/types";

function nextDeadline(school: School) {
  const d = [...school.deadlines].sort((a, b) => a.date.localeCompare(b.date))[0];
  if (!d) return "Belgilanmagan";
  const [y, m, day] = d.date.split("-");
  return `${day}.${m}.${y} (${d.label})`;
}

export function CompareTable({ schools }: { schools: School[] }) {
  const [selected, setSelected] = useState<string[]>(schools.slice(0, Math.min(3, schools.length)).map((s) => s.id));
  const picked = schools.filter((s) => selected.includes(s.id));

  function toggle(id: string) {
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  }

  const rows: [string, (s: School) => string][] = [
    ["Davlat / shahar", (s) => s.city ? `${s.city}, ${s.country}` : s.country],
    ["Eng yaqin muddat", nextDeadline],
    ["Qanday topshiriladi", (s) => s.applySystem ?? "Ma'lumot yo'q"],
    ["Talablar", (s) => (s.requirements?.length ? `${s.requirements.length} ta hujjat` : "Ma'lumot yo'q")],
    ["Yo'nalishlar", (s) => s.tags.join(", ")],
  ];

  return (
    <div className="mt-6">
      <div className="flex flex-wrap gap-2">
        {schools.map((s) => {
          const on = selected.includes(s.id);
          const disabled = !on && selected.length >= 3;
          return (
            <button
              key={s.id}
              disabled={disabled}
              onClick={() => toggle(s.id)}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                on ? "border-brand-700 bg-brand-700 text-white" : disabled ? "cursor-not-allowed border-ink-900/10 bg-ink-50 text-ink-400" : "border-ink-900/15 bg-white text-ink-600 hover:border-brand-500"
              }`}
            >
              {s.name}
            </button>
          );
        })}
      </div>
      <p className="mt-2 text-xs text-ink-500">3 tagacha tanlang.</p>

      {picked.length === 0 ? (
        <p className="mt-6 text-sm text-ink-500">Solishtirish uchun yuqoridan dastur tanlang.</p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-ink-900/8 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ink-900/8 text-left text-xs uppercase tracking-wide text-ink-500">
                <th className="px-4 py-3">Mezon</th>
                {picked.map((s) => (
                  <th key={s.id} className="px-4 py-3 font-semibold text-ink-900">{s.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(([label, fn]) => (
                <tr key={label} className="border-b border-ink-900/8 last:border-0">
                  <td className="px-4 py-3 font-medium text-ink-600">{label}</td>
                  {picked.map((s) => (
                    <td key={s.id} className="px-4 py-3 text-ink-800">{fn(s)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
