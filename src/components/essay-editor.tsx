"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { saveEssayContent, requestEssayFeedback } from "@/lib/actions/essays";
import { Button } from "./ui";
import type { Essay } from "@/lib/types";

export function EssayEditor({ essay }: { essay: Essay }) {
  const [title, setTitle] = useState(essay.title);
  const [content, setContent] = useState(essay.content);
  const [pending, startTransition] = useTransition();
  const [saved, setSaved] = useState(true);
  const router = useRouter();

  function save() {
    startTransition(async () => {
      await saveEssayContent(essay.id, title, content);
      setSaved(true);
    });
  }

  function getFeedback() {
    startTransition(async () => {
      await saveEssayContent(essay.id, title, content);
      await requestEssayFeedback(essay.id);
      router.refresh();
    });
  }

  return (
    <div>
      <input
        value={title}
        onChange={(e) => { setTitle(e.target.value); setSaved(false); }}
        onBlur={save}
        className="w-full border-b border-ink-900/10 pb-2 text-xl font-bold text-ink-950 outline-none focus:border-brand-500"
      />
      <textarea
        value={content}
        onChange={(e) => { setContent(e.target.value); setSaved(false); }}
        onBlur={save}
        rows={16}
        placeholder="Qoralamangizni shu yerga yozing..."
        className="mt-4 w-full resize-y rounded-xl border border-ink-900/10 p-4 leading-relaxed text-ink-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
      />
      <div className="mt-2 flex items-center justify-between text-xs text-ink-500">
        <span>{content.trim() ? content.trim().split(/\s+/).length : 0} so&apos;z</span>
        <span>{saved ? "Saqlangan" : "Saqlanmoqda..."}</span>
      </div>
      <div className="mt-4 flex gap-3">
        <Button onClick={getFeedback}>{pending ? "Tahlil qilinmoqda..." : "Yulduzdan fikr olish"}</Button>
        <Button variant="outline" onClick={save}>Saqlash</Button>
      </div>
    </div>
  );
}
