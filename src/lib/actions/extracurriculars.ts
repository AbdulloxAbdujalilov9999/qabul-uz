"use server";

import { revalidatePath } from "next/cache";
import { getSessionUserId } from "@/lib/session";
import { addExtracurricularDb, removeExtracurricularDb } from "@/lib/db";
import { rateExtracurricular } from "@/lib/scoring";

export async function addExtracurricular(formData: FormData) {
  const userId = await getSessionUserId();
  if (!userId) return;
  const title = String(formData.get("title") ?? "").trim();
  const role = String(formData.get("role") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  if (!title) return;
  const { rating, feedback } = rateExtracurricular(description);
  await addExtracurricularDb(userId, title, role, description, rating, feedback);
  revalidatePath("/ilova/faoliyatlarim");
}

export async function removeExtracurricular(id: string) {
  const userId = await getSessionUserId();
  if (!userId) return;
  await removeExtracurricularDb(userId, id);
  revalidatePath("/ilova/faoliyatlarim");
}
