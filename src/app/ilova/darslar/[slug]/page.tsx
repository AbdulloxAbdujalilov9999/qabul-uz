import { notFound, redirect } from "next/navigation";
import { CircleCheck } from "lucide-react";
import { getSessionUserId } from "@/lib/session";
import { getLessonProgress, getSubscription, getLessonResponse } from "@/lib/db";
import { lessons } from "@/lib/seed-data";
import { Container, Badge, Button } from "@/components/ui";
import { CompleteLessonButton } from "@/components/complete-lesson-button";
import { BackButton } from "@/components/back-button";
import { LessonResponseEditor } from "@/components/lesson-response-editor";

export default async function LessonPage(props: PageProps<"/ilova/darslar/[slug]">) {
  const { slug } = await props.params;
  const lesson = lessons.find((l) => l.slug === slug);
  if (!lesson) notFound();

  const userId = (await getSessionUserId())!;
  const subscription = await getSubscription(userId);
  if (!lesson.isFree && subscription.plan === "free") redirect("/narxlar");

  const progress = await getLessonProgress(userId);
  const done = progress.some((p) => p.lessonId === lesson.id && p.status === "completed");
  const response = lesson.reflectionPrompt ? await getLessonResponse(userId, lesson.id) : "";

  const categoryLabel: Record<string, string> = {
    discovery: "Kashfiyot", list_building: "Ro'yxat", activities: "Faoliyatlar",
    essays: "Insho", recs: "Tavsiyanoma", submission: "Topshirish",
  };

  return (
    <Container className="max-w-2xl py-6">
      <BackButton className="mb-4" />
      <Badge tone="brand">{categoryLabel[lesson.category]}</Badge>
      <h1 className="mt-3 text-3xl font-extrabold text-ink-950">{lesson.title}</h1>
      <p className="mt-2 text-ink-600">{lesson.summary}</p>
      <div className="mt-6 rounded-2xl border border-ink-900/8 bg-white p-6 leading-relaxed text-ink-800">
        {lesson.body}
      </div>

      {lesson.reflectionPrompt && (
        <LessonResponseEditor lessonId={lesson.id} prompt={lesson.reflectionPrompt} initialContent={response} />
      )}

      {lesson.action && (
        <div className="mt-6">
          <Button href={lesson.action.href}>{lesson.action.label} →</Button>
        </div>
      )}

      <div className="mt-8 flex items-center gap-3">
        {done ? (
          <p className="flex items-center gap-1.5 font-medium text-brand-700">
            <CircleCheck className="h-5 w-5" /> Tugallangan
          </p>
        ) : (
          <CompleteLessonButton lessonId={lesson.id} />
        )}
        <Button href="/ilova" variant="outline">Xaritaga qaytish</Button>
      </div>
    </Container>
  );
}
