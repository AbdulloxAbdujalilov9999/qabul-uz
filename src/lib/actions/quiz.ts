"use server";

import { getSessionUserId } from "@/lib/session";
import { saveQuizResponseDb, updateProfile } from "@/lib/db";
import { archetypes } from "@/lib/seed-data";
import type { QuizSlug } from "@/lib/types";

export async function saveQuizResult(quizSlug: QuizSlug, answers: Record<string, string>, result: unknown) {
  const userId = await getSessionUserId();
  if (!userId) return { saved: false as const, reason: "no_session" as const };

  await saveQuizResponseDb(userId, quizSlug, answers, result);

  if (quizSlug === "arketip" && result && typeof result === "object" && "top" in result) {
    const top = (result as { top: { slug: string } }).top;
    const archetype = archetypes.find((a) => a.slug === top.slug);
    if (archetype) await updateProfile(userId, { archetypeId: archetype.id });
  }

  return { saved: true as const };
}
