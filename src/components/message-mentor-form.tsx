"use client";

import { useActionState } from "react";
import { Gem } from "lucide-react";
import { startConversation, type MessageState } from "@/lib/actions/mentors";
import { Button } from "./ui";

const initialState: MessageState = {};

export function MessageMentorForm({ mentorId, priceRubies }: { mentorId: string; priceRubies: number }) {
  const action = startConversation.bind(null, mentorId);
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="space-y-3">
      <textarea
        name="body"
        required
        rows={4}
        placeholder="Nima haqida so'ramoqchisiz?"
        className="w-full rounded-xl border border-ink-900/15 px-3 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
      />
      {state.error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</p>}
      <Button type="submit" className="w-full">
        {pending ? "Yuborilmoqda..." : <>Yuborish — {priceRubies} <Gem className="h-3.5 w-3.5" /></>}
      </Button>
      <p className="text-center text-xs text-ink-500">Javob kelmasa, rubinlaringiz avtomatik qaytariladi.</p>
    </form>
  );
}
