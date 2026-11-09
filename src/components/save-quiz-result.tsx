"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { saveQuizResult } from "@/lib/actions/quiz";
import type { QuizSlug } from "@/lib/types";
import { Button } from "./ui";

export function SaveQuizResult({ quizSlug, answers, result }: { quizSlug: QuizSlug; answers: Record<string, string>; result: unknown }) {
  const [pending, startTransition] = useTransition();
  const [status, setStatus] = useState<"idle" | "saved" | "need_login">("idle");

  function save() {
    startTransition(async () => {
      const res = await saveQuizResult(quizSlug, answers, result);
      setStatus(res.saved ? "saved" : "need_login");
    });
  }

  if (status === "saved") {
    return <p className="flex items-center gap-1.5 text-sm font-medium text-brand-700"><Check className="h-4 w-4" /> Natija profilingga saqlandi.</p>;
  }
  if (status === "need_login") {
    return (
      <p className="text-sm text-ink-600">
        Saqlash uchun <Link href="/royxatdan-otish" className="font-semibold text-brand-700">ro&apos;yxatdan o&apos;ting</Link> (bepul).
      </p>
    );
  }
  return (
    <Button variant="outline" onClick={save}>
      {pending ? "Saqlanmoqda..." : "Natijani profilimga saqlash"}
    </Button>
  );
}
