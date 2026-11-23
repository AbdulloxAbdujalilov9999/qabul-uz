"use server";

import { revalidatePath } from "next/cache";
import { getSessionUserId } from "@/lib/session";
import { addRecommenderDb, removeRecommenderDb, setRecommenderStatusDb } from "@/lib/db";
import type { Recommender } from "@/lib/types";

export async function addRecommender(formData: FormData) {
  const userId = await getSessionUserId();
  if (!userId) return;
  const name = String(formData.get("name") ?? "").trim();
  const relationship = String(formData.get("relationship") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  if (!name || !email) return;
  await addRecommenderDb(userId, name, relationship, email);
  revalidatePath("/ilova/tavsiyanoma");
}

export async function setRecommenderStatus(id: string, status: Recommender["status"]) {
  const userId = await getSessionUserId();
  if (!userId) return;
  await setRecommenderStatusDb(userId, id, status);
  revalidatePath("/ilova/tavsiyanoma");
  revalidatePath("/ilova/royxatim");
}

export async function removeRecommender(id: string) {
  const userId = await getSessionUserId();
  if (!userId) return;
  await removeRecommenderDb(userId, id);
  revalidatePath("/ilova/tavsiyanoma");
}
