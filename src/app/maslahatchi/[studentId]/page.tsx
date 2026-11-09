import { notFound } from "next/navigation";
import { Flame } from "lucide-react";
import { getProfile, getStreak, daysBehind, getLessonProgress, getEssays, getAllFeedbackForEssays, getCollegeList } from "@/lib/db";
import { lessons, schools } from "@/lib/seed-data";
import { Card, Badge, Eyebrow } from "@/components/ui";
import { BackButton } from "@/components/back-button";

export default async function StudentDrawerPage(props: PageProps<"/maslahatchi/[studentId]">) {
  const { studentId } = await props.params;
  const profile = await getProfile(studentId);
  if (!profile) notFound();

  const [streak, progressRows, essays, collegeList] = await Promise.all([
    getStreak(studentId),
    getLessonProgress(studentId),
    getEssays(studentId),
    getCollegeList(studentId),
  ]);
  const behind = daysBehind(streak);
  const progress = progressRows.filter((p) => p.status === "completed").length;
  const feedbackMap = await getAllFeedbackForEssays(essays.map((e) => e.id));
  const counts = { reach: 0, target: 0, safety: 0 };
  for (const e of collegeList) counts[e.bucket ?? "target"]++;

  return (
    <div className="mx-auto max-w-3xl">
      <BackButton className="mb-4" />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-ink-950">{profile.fullName}</h1>
          <p className="text-sm text-ink-500">@{profile.username}</p>
        </div>
        <Badge tone={behind >= 4 ? "accent" : "brand"}>{behind} kun ortda</Badge>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <Card><p className="text-xs font-semibold uppercase text-ink-500">Darslar</p><p className="mt-1 text-2xl font-extrabold text-ink-950">{progress}/{lessons.length}</p></Card>
        <Card><p className="text-xs font-semibold uppercase text-ink-500">Streak</p><p className="mt-1 flex items-center gap-1.5 text-2xl font-extrabold text-ink-950"><Flame className="h-5 w-5 text-accent-500" /> {streak.current}</p></Card>
        <Card>
          <p className="text-xs font-semibold uppercase text-ink-500">Ro&apos;yxat muvozanati</p>
          <p className="mt-1 text-sm text-ink-700">R:{counts.reach} T:{counts.target} S:{counts.safety}</p>
          {counts.reach > 0 && counts.safety === 0 && <p className="mt-1 text-xs text-red-600">Safety yo&apos;q</p>}
        </Card>
      </div>

      <div className="mt-8">
        <Eyebrow>Insholar</Eyebrow>
        <div className="mt-3 space-y-2">
          {essays.length === 0 && <p className="text-sm text-ink-500">Hali insho yo&apos;q.</p>}
          {essays.map((e) => {
            const fb = feedbackMap.get(e.id);
            return (
              <Card key={e.id}>
                <div className="flex items-center justify-between">
                  <p className="font-medium text-ink-900">{e.title}</p>
                  {fb && <Badge tone="brand">{fb.score}/10</Badge>}
                </div>
                <p className="mt-2 text-sm text-ink-600">{e.content}</p>
              </Card>
            );
          })}
        </div>
      </div>

      <div className="mt-8">
        <Eyebrow>Dasturlar ro&apos;yxati</Eyebrow>
        <div className="mt-3 flex flex-wrap gap-2">
          {collegeList.length === 0 && <p className="text-sm text-ink-500">Hali ro&apos;yxat yo&apos;q.</p>}
          {collegeList.map((e) => {
            const school = schools.find((s) => s.id === e.schoolId);
            return <Badge key={e.id} tone="ink">{school?.name}</Badge>;
          })}
        </div>
      </div>
    </div>
  );
}
