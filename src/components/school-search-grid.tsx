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

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return schools;
    return schools.filter((s) => s.name.toLowerCase().includes(q) || s.country.toLowerCase().includes(q));
  }, [schools, query]);

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
