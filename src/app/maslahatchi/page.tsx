import Link from "next/link";
import { TriangleAlert } from "lucide-react";
import { getInstitutionRoster } from "@/lib/db";
import { institutionDemo, lessons } from "@/lib/seed-data";
import { Card, Badge, Eyebrow } from "@/components/ui";

export default async function CounselorRosterPage() {
  const roster = await getInstitutionRoster(institutionDemo.id);
  const students = [...roster].sort((a, b) => b.behind - a.behind);

  const behindStudents = students.filter((s) => s.behind >= 4);
  const activeThisWeek = students.filter((s) => s.behind <= 7).length;
  const essaysAnalyzed = students.reduce((sum, s) => sum + s.essays.length, 0);

  const draftQueue = students
    .flatMap((s) => s.essays.map((essay) => ({ student: s.profile, essay, feedback: s.latestFeedback })))
    .filter((d) => d.feedback)
    .sort((a, b) => (a.feedback?.score ?? 10) - (b.feedback?.score ?? 10));

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-ink-950">{institutionDemo.name}</h1>
      <p className="mt-1 text-sm text-ink-600">{institutionDemo.seats} o&apos;rin · {institutionDemo.rosterCode}</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <Card><p className="text-xs font-semibold uppercase text-ink-500">Bu hafta faol</p><p className="mt-1 text-3xl font-extrabold text-ink-950">{activeThisWeek}</p></Card>
        <Card><p className="text-xs font-semibold uppercase text-ink-500">4+ kun ortda</p><p className="mt-1 text-3xl font-extrabold text-red-600">{behindStudents.length}</p></Card>
        <Card><p className="text-xs font-semibold uppercase text-ink-500">Tahlil qilingan insho</p><p className="mt-1 text-3xl font-extrabold text-ink-950">{essaysAnalyzed}</p></Card>
      </div>

      {behindStudents.length > 0 && (
        <div className="mt-6 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" />
          {behindStudents.map((s) => s.profile.fullName).join(", ")} 4+ kundan beri faol emas.
        </div>
      )}

      {students.length === 0 && (
        <p className="mt-10 text-sm text-ink-500">Hali hech kim ro&apos;yxatdan o&apos;tmagan. Yangi o&apos;quvchilar ro&apos;yxatdan o&apos;tganda bu yerda paydo bo&apos;ladi.</p>
      )}

      {draftQueue.length > 0 && (
        <div className="mt-10">
          <Eyebrow>Insho navbati</Eyebrow>
          <div className="mt-4 space-y-2">
            {draftQueue.map(({ student, essay, feedback }) => (
              <Link key={essay.id} href={`/maslahatchi/${student.id}`}>
                <Card className="flex items-center justify-between hover:shadow-md">
                  <div>
                    <p className="font-medium text-ink-900">{student.fullName}</p>
                    <p className="text-xs text-ink-500">{essay.title}</p>
                  </div>
                  <Badge tone={((feedback?.score ?? 0) < 5) ? "accent" : "brand"}>{feedback?.score}/10</Badge>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}

      {students.length > 0 && (
        <div className="mt-10">
          <Eyebrow>Kontingent ({students.length})</Eyebrow>
          <div className="mt-4 overflow-x-auto rounded-2xl border border-ink-900/8 bg-white">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="bg-ink-50 text-ink-500">
                <tr>
                  <th className="px-4 py-3 font-semibold">O&apos;quvchi</th>
                  <th className="px-4 py-3 font-semibold">Progress</th>
                  <th className="px-4 py-3 font-semibold">Ortda</th>
                  <th className="px-4 py-3 font-semibold">So&apos;nggi insho bali</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s.profile.id} className="border-t border-ink-900/8">
                    <td className="px-4 py-3">
                      <Link href={`/maslahatchi/${s.profile.id}`} className="font-medium text-ink-900 hover:text-brand-700">{s.profile.fullName}</Link>
                    </td>
                    <td className="px-4 py-3 text-ink-600">{s.progress} / {lessons.length}</td>
                    <td className="px-4 py-3">
                      <Badge tone={s.behind >= 4 ? "accent" : "ink"}>{s.behind} kun</Badge>
                    </td>
                    <td className="px-4 py-3 text-ink-600">{s.latestFeedback ? `${s.latestFeedback.score}/10` : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
