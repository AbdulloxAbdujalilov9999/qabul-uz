import Link from "next/link";
import { TriangleAlert, Users, FileText } from "lucide-react";
import { getSessionUserId } from "@/lib/session";
import { getCollegeList, getEssays, getExtracurriculars, getRecommenders } from "@/lib/db";
import { schools, mentors } from "@/lib/seed-data";
import { Card, Badge, Eyebrow } from "@/components/ui";
import { AddToListButtons, RemoveFromListButton, CollegeStatusSelect } from "@/components/college-list-controls";
import { STATUS_META, STEP_LABELS } from "@/lib/application-status";

const bucketTone = { reach: "accent", target: "brand", safety: "ink" } as const;
const bucketLabel = { reach: "Reach", target: "Target", safety: "Safety" } as const;

export default async function CollegeListPage() {
  const userId = (await getSessionUserId())!;
  const [entries, essays, activities, recommenders] = await Promise.all([
    getCollegeList(userId),
    getEssays(userId),
    getExtracurriculars(userId),
    getRecommenders(userId),
  ]);
  const addedIds = new Set(entries.map((e) => e.schoolId));

  // Shared "common profile" checklist -- same three pieces feed every
  // application, same idea as a Common App profile reused across schools.
  const checklist = [
    { label: "Shaxsiy insho", done: essays.some((e) => e.content.trim().length > 40) },
    { label: "Faoliyatlar", done: activities.length > 0 },
    { label: "Tavsiyanoma", done: recommenders.length > 0 },
  ];
  const checklistDone = checklist.filter((c) => c.done).length;

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

      <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
        <span className="rounded-full bg-accent-100 px-3 py-1 text-accent-800">Reach: {counts.reach}</span>
        <span className="rounded-full bg-brand-100 px-3 py-1 text-brand-800">Target: {counts.target}</span>
        <span className="rounded-full bg-ink-100 px-3 py-1 text-ink-700">Safety: {counts.safety}</span>
        {counts.reach > 0 && counts.safety === 0 && (
          <span className="flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-red-700"><TriangleAlert className="h-3.5 w-3.5" /> Safety dastur yo&apos;q</span>
        )}
      </div>

      {entries.length > 0 && (
        <Card className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-ink-900">Umumiy profil: {checklistDone}/{checklist.length} tayyor</p>
            <p className="text-xs text-ink-500">Bu uchta narsa har bir arizangizda qayta ishlatiladi.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {checklist.map((c) => (
              <Link
                key={c.label}
                href={c.label === "Shaxsiy insho" ? "/ilova/insholarim" : c.label === "Faoliyatlar" ? "/ilova/faoliyatlarim" : "/ilova/tavsiyanoma"}
                className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${c.done ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-ink-900/15 bg-white text-ink-500 hover:border-brand-500"}`}
              >
                {c.done ? "✓" : "○"} {c.label}
              </Link>
            ))}
          </div>
        </Card>
      )}

      <div className="mt-6 space-y-3">
        {withDeadlines.length === 0 && <p className="text-sm text-ink-500">Hali hech narsa qo&apos;shilmagan. Pastdan tanlang.</p>}
        {withDeadlines.map(({ entry, school, nextDeadline }) => {
          const schoolMentors = mentors.filter((m) => m.schoolId === school.id);
          const meta = STATUS_META[entry.status];
          return (
            <Card key={entry.id}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge tone={bucketTone[entry.bucket ?? "target"]}>{bucketLabel[entry.bucket ?? "target"]}</Badge>
                    <Badge tone={meta.tone}>{meta.label}</Badge>
                    <p className="font-semibold text-ink-900">{school.name}</p>
                  </div>
                  <p className="mt-1 text-xs text-ink-500">
                    {nextDeadline ? `Muddat: ${new Date(nextDeadline.date).toLocaleDateString("uz-UZ")} (${nextDeadline.label})` : "Muddat belgilanmagan"}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <CollegeStatusSelect entryId={entry.id} status={entry.status} />
                  <RemoveFromListButton entryId={entry.id} />
                </div>
              </div>

              <div className="mt-3 flex gap-1">
                {STEP_LABELS.map((label, i) => (
                  <div key={label} className={`h-1.5 flex-1 rounded-full ${i <= meta.step ? "bg-brand-600" : "bg-ink-100"}`} />
                ))}
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-3 text-xs">
                <Link href={`/dasturlar/${school.slug}`} className="flex items-center gap-1 font-medium text-brand-700 hover:underline">
                  <FileText className="h-3.5 w-3.5" /> Talablar va tayyorgarlik
                </Link>
                {schoolMentors.length > 0 && (
                  <Link href={`/mentorlar/${schoolMentors[0].id}`} className="flex items-center gap-1 font-medium text-brand-700 hover:underline">
                    <Users className="h-3.5 w-3.5" /> Mos mentor: {schoolMentors[0].displayName}
                  </Link>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {entries.length > 1 && (
        <p className="mt-4 text-sm text-ink-500">
          <Link href="/ilova/solishtirish" className="font-medium text-brand-700 hover:underline">Ro&apos;yxatdagilarni solishtiring &rarr;</Link>
        </p>
      )}

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
