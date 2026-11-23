"use server";

import { revalidatePath } from "next/cache";
import { getSessionUserId } from "@/lib/session";
import { addToCollegeListDb, removeFromCollegeListDb, updateCollegeListStatusDb } from "@/lib/db";
import type { CollegeListEntry, ListBucket } from "@/lib/types";

export async function addToCollegeList(schoolId: string, bucket: ListBucket) {
  const userId = await getSessionUserId();
  if (!userId) return;
  await addToCollegeListDb(userId, schoolId, bucket);
  revalidatePath("/ilova/royxatim");
}

export async function removeFromCollegeList(entryId: string) {
  const userId = await getSessionUserId();
  if (!userId) return;
  await removeFromCollegeListDb(userId, entryId);
  revalidatePath("/ilova/royxatim");
}

export async function updateCollegeListStatus(entryId: string, status: CollegeListEntry["status"]) {
  const userId = await getSessionUserId();
  if (!userId) return;
  await updateCollegeListStatusDb(userId, entryId, status);
  revalidatePath("/ilova/royxatim");
}
