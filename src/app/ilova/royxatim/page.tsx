import { TriangleAlert } from "lucide-react";
import { getSessionUserId } from "@/lib/session";
import { getCollegeList } from "@/lib/db";
import { schools } from "@/lib/seed-data";
import { Card, Badge, Eyebrow } from "@/components/ui";
import { AddToListButtons, RemoveFromListButton } from "@/components/college-list-controls";

const bucketTone = { reach: "accent", target: "brand", safety: "ink" } as const;
const bucketLabel = { reach: "Reach", target: "Target", safety: "Safety" } as const;

export default async function CollegeListPage() {
  const userId = (await getSessionUserId())!;
  const entries = await getCollegeList(userId);
  const addedIds = new Set(entries.map((e) => e.schoolId));

  const withDeadlines = entries
    .map((e) => {
      const school = schools.find((s) => s.id === e.schoolId)!;
      const nextDeadline = [...school.deadlines].sort((a, b) => a.date.localeCompare(b.date))[0];
      return { entry: e, school, nextDeadline };
    })
    .sort((a, b) => (a.nextDeadline?.date ?? "9999").localeCompare(b.nextDeadline?.date ?? "9999"));

  const counts = { reach: 0, target: 0, safety: 0 };
  for (const e of entries) counts[e.bucket ?? "target"]++;

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="text-2xl font-extrabold text-ink-950">Dasturlarim ro&apos;yxati</h1>
      <p className="mt-1 text-sm text-ink-600">Eng yaqin muddat tepada.</p>

      <div className="mt-4 flex gap-3 text-sm">
        <span className="rounded-full bg-accent-100 px-3 py-1 text-accent-800">Reach: {counts.reach}</span>
        <span className="rounded-full bg-brand-100 px-3 py-1 text-brand-800">Target: {counts.target}</span>
        <span className="rounded-full bg-ink-100 px-3 py-1 text-ink-700">Safety: {counts.safety}</span>
        {counts.reach > 0 && counts.safety === 0 && (
          <span className="flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-red-700"><TriangleAlert className="h-3.5 w-3.5" /> Safety dastur yo&apos;q</span>
        )}
      </div>

      <div className="mt-6 space-y-3">
        {withDeadlines.length === 0 && <p className="text-sm text-ink-500">Hali hech narsa qo&apos;shilmagan. Pastdan tanlang.</p>}
        {withDeadlines.map(({ entry, school, nextDeadline }) => (
          <Card key={entry.id} className="flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Badge tone={bucketTone[entry.bucket ?? "target"]}>{bucketLabel[entry.bucket ?? "target"]}</Badge>
                <p className="font-semibold text-ink-900">{school.name}</p>
              </div>
              <p className="mt-1 text-xs text-ink-500">
                {nextDeadline ? `Muddat: ${new Date(nextDeadline.date).toLocaleDateString("uz-UZ")} (${nextDeadline.label})` : "Muddat belgilanmagan"}
              </p>
            </div>
            <RemoveFromListButton entryId={entry.id} />
          </Card>
        ))}
      </div>

      <div className="mt-10">
        <Eyebrow>KATALOGDAN QO&apos;SHISH</Eyebrow>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {schools.filter((s) => !addedIds.has(s.id)).map((s) => (
            <Card key={s.id} className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-ink-900">{s.name}</p>
                <p className="text-xs text-ink-500">{s.country}</p>
              </div>
              <AddToListButtons schoolId={s.id} />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
