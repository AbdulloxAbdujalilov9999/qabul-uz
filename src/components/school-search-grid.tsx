"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { SchoolCard } from "./school-card";

export interface SchoolCardData {
  id: string;
  slug: string;
  name: string;
  country: string;
  caseStudyCount: number;
  readCount: number;
  people: string[];
}

export function SchoolSearchGrid({ schools }: { schools: SchoolCardData[] }) {
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState<string | null>(null);

  const countries = useMemo(() => {
    const counts = new Map<string, number>();
    for (const s of schools) counts.set(s.country, (counts.get(s.country) ?? 0) + 1);
    return Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
  }, [schools]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return schools.filter((s) => {
      const matchesQuery = !q || s.name.toLowerCase().includes(q) || s.country.toLowerCase().includes(q);
      const matchesCountry = !country || s.country === country;
      return matchesQuery && matchesCountry;
    });
  }, [schools, query, country]);

  return (
    <div>
      <div className="relative max-w-md">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Dasturlarni qidirish..."
          className="w-full rounded-full border border-ink-900/15 bg-white py-3 pl-11 pr-4 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
        />
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          onClick={() => setCountry(null)}
          className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
            country === null ? "bg-brand-700 text-white" : "bg-white text-ink-600 ring-1 ring-ink-900/10 hover:bg-brand-50"
          }`}
        >
          Barcha davlatlar
        </button>
        {countries.map(([c, count]) => (
          <button
            key={c}
            onClick={() => setCountry(c === country ? null : c)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
              country === c ? "bg-brand-700 text-white" : "bg-white text-ink-600 ring-1 ring-ink-900/10 hover:bg-brand-50"
            }`}
          >
            {c} <span className="opacity-60">{count}</span>
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((s) => (
          <SchoolCard
            key={s.id}
            schoolId={s.id}
            slug={s.slug}
            name={s.name}
            caseStudyCount={s.caseStudyCount}
            readCount={s.readCount}
            people={s.people}
          />
        ))}
      </div>

      {filtered.length === 0 && <p className="mt-10 text-center text-sm text-ink-500">Hech narsa topilmadi.</p>}
    </div>
  );
}
