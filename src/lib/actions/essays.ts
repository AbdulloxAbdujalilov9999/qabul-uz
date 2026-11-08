"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getSessionUserId } from "@/lib/session";
import { createEssayDb, saveEssayContentDb, saveEssayFeedbackDb, getEssay } from "@/lib/db";
import { scoreEssay } from "@/lib/scoring";

export async function createEssay() {
  const userId = await getSessionUserId();
  if (!userId) return;
  const essay = await createEssayDb(userId);
  redirect(`/ilova/insholarim/${essay.id}`);
}

export async function saveEssayContent(essayId: string, title: string, content: string) {
  const userId = await getSessionUserId();
  if (!userId) return;
  await saveEssayContentDb(essayId, userId, title, content);
  revalidatePath(`/ilova/insholarim/${essayId}`);
}

export async function requestEssayFeedback(essayId: string) {
  const userId = await getSessionUserId();
  if (!userId) return;
  const essay = await getEssay(essayId, userId);
  if (!essay) return;
  const result = scoreEssay(essay.content);
  await saveEssayFeedbackDb(essayId, result);
  revalidatePath(`/ilova/insholarim/${essayId}`);
}
