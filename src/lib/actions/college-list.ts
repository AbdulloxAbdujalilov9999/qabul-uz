"use server";

import { revalidatePath } from "next/cache";
import { getSessionUserId } from "@/lib/session";
import { addToCollegeListDb, removeFromCollegeListDb } from "@/lib/db";
import type { ListBucket } from "@/lib/types";

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
