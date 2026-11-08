"use server";

import { redirect } from "next/navigation";
import { getSessionUserId } from "@/lib/session";
import { getRubyBalance, spendRubies, findOrCreateConversation, addMessage, setConversationStatus } from "@/lib/db";
import { mentors } from "@/lib/seed-data";

export interface MessageState {
  error?: string;
}

export async function startConversation(mentorId: string, _prev: MessageState, formData: FormData): Promise<MessageState> {
  const userId = await getSessionUserId();
  if (!userId) return { error: "Xabar yozish uchun avval ro'yxatdan o'ting." };

  const mentor = mentors.find((m) => m.id === mentorId);
  if (!mentor) return { error: "Mentor topilmadi." };

  const body = String(formData.get("body") ?? "").trim();
  if (!body) return { error: "Xabar bo'sh bo'lishi mumkin emas." };

  if ((await getRubyBalance(userId)) < mentor.priceRubies) {
    return { error: `Yetarli rubin yo'q - kerak: ${mentor.priceRubies} 💎. Hamyoningizni to'ldiring.` };
  }

  const conversation = await findOrCreateConversation(userId, mentorId);
  await spendRubies(userId, mentor.priceRubies);
  await addMessage(conversation.id, userId, body, mentor.priceRubies, "student");
  await setConversationStatus(conversation.id, "awaiting_reply");

  redirect(`/ilova/xabarlar/${conversation.id}`);
}
