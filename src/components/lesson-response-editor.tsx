"use client";

import { useState, useTransition } from "react";
import { Check } from "lucide-react";
import { saveLessonResponse } from "@/lib/actions/lessons";

export function LessonResponseEditor({ lessonId, prompt, initialContent }: { lessonId: string; prompt: string; initialContent: string }) {
  const [content, setContent] = useState(initialContent);
  const [saved, setSaved] = useState(true);
  const [, startTransition] = useTransition();

  function save(value: string) {
    startTransition(async () => {
      await saveLessonResponse(lessonId, value);
      setSaved(true);
    });
  }

  return (
    <div className="mt-6 rounded-2xl border border-ink-900/8 bg-white p-6">
      <p className="font-medium text-ink-900">{prompt}</p>
      <textarea
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
          setSaved(false);
        }}
        onBlur={() => save(content)}
        rows={6}
        placeholder="Javobingni shu yerga yoz..."
        className="mt-4 w-full resize-y rounded-xl border border-ink-900/10 p-4 leading-relaxed text-ink-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
      />
      <div className="mt-2 flex items-center gap-1.5 text-xs text-ink-500">
        {saved && content.trim() && <Check className="h-3.5 w-3.5 text-brand-600" />}
        <span>{saved ? (content.trim() ? "Saqlangan" : "") : "Saqlanmoqda..."}</span>
      </div>
    </div>
  );
}
