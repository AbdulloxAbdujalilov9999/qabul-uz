"use server";

import { revalidatePath } from "next/cache";
import { getSessionUserId } from "@/lib/session";
import { addJournalEntryDb } from "@/lib/db";

export async function addJournalEntry(promptId: string, formData: FormData) {
  const userId = await getSessionUserId();
  if (!userId) return;
  const content = String(formData.get("content") ?? "").trim();
  if (!content) return;
  await addJournalEntryDb(userId, promptId, content);
  revalidatePath("/ilova/kundalik");
}
