"use server";

import { revalidatePath } from "next/cache";
import { getSessionUserId } from "@/lib/session";
import { getConversation, addMessage, setConversationStatus } from "@/lib/db";
import { mentors } from "@/lib/seed-data";

export async function sendFollowUpMessage(conversationId: string, formData: FormData) {
  const userId = await getSessionUserId();
  if (!userId) return;
  const conversation = await getConversation(conversationId, userId);
  if (!conversation) return;
  const body = String(formData.get("body") ?? "").trim();
  if (!body) return;
  await addMessage(conversationId, userId, body, 0, "student");
  revalidatePath(`/ilova/xabarlar/${conversationId}`);
}

// Demo-only: since mentors are placeholder profiles with nobody behind them,
// this simulates a reply so the conversation UI can be shown end-to-end.
// Remove once real mentors are onboarded and answer for themselves.
export async function simulateMentorReply(conversationId: string) {
  const userId = await getSessionUserId();
  if (!userId) return;
  const conversation = await getConversation(conversationId, userId);
  if (!conversation) return;
  const mentor = mentors.find((m) => m.id === conversation.mentorId);
  await addMessage(
    conversationId,
    userId,
    `(Namuna javob) Savoling uchun rahmat! Bu ${mentor?.displayName ?? "mentor"}ning haqiqiy javobi emas - mentor tizimi namunaviy rejimda.`,
    0,
    "mentor"
  );
  await setConversationStatus(conversationId, "open");
  revalidatePath(`/ilova/xabarlar/${conversationId}`);
}
