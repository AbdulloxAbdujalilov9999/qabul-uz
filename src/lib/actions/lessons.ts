"use server";

import { revalidatePath } from "next/cache";
import { getSessionUserId } from "@/lib/session";
import { completeLesson, getStreak, setFocusMode, addSafetyNestContactDb } from "@/lib/db";

export async function completeLessonAction(lessonId: string) {
  const userId = await getSessionUserId();
  if (!userId) return;
  await completeLesson(userId, lessonId);
  revalidatePath("/ilova");
}

export async function toggleFocusMode() {
  const userId = await getSessionUserId();
  if (!userId) return;
  const streak = await getStreak(userId);
  await setFocusMode(userId, !streak.focusModeEnabled);
  revalidatePath("/ilova");
}

export async function addSafetyNestContact(formData: FormData) {
  const userId = await getSessionUserId();
  if (!userId) return;
  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const relationship = String(formData.get("relationship") ?? "").trim();
  if (!name || !phone) return;
  await addSafetyNestContactDb(userId, name, phone, relationship);
  revalidatePath("/ilova/sozlamalar");
}
