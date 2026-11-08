"use client";

import { useState } from "react";
import type { QuizDef } from "@/lib/types";
import { Container, Button } from "./ui";

export function QuizRunner({
  quiz,
  renderResult,
}: {
  quiz: QuizDef;
  renderResult: (answers: Record<string, string>) => React.ReactNode;
}) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const done = step >= quiz.questions.length;
  const q = quiz.questions[step];

  function choose(value: string) {
    setAnswers((a) => ({ ...a, [q.id]: value }));
    setTimeout(() => setStep((s) => s + 1), 150);
  }

  if (done) {
    return (
      <Container className="max-w-2xl py-16">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">Natija tayyor</p>
        <div className="mt-4">{renderResult(answers)}</div>
        <div className="mt-8 flex gap-3">
          <Button variant="outline" onClick={() => { setStep(0); setAnswers({}); }}>
            Qaytadan topshirish
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="max-w-2xl py-16">
      <div className="mb-6 h-2 w-full overflow-hidden rounded-full bg-ink-100">
        <div
          className="h-full rounded-full bg-brand-600 transition-all"
          style={{ width: `${(step / quiz.questions.length) * 100}%` }}
        />
      </div>
      <p className="text-sm font-medium text-ink-500">
        Savol {step + 1} / {quiz.questions.length}
        {q.sensitive && <span className="ml-2 text-xs text-accent-700">· bu javob faqat brauzeringda qoladi</span>}
      </p>
      <h1 className="mt-3 text-2xl font-bold text-ink-950">{q.prompt}</h1>
      <div className="mt-6 space-y-3">
        {q.options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => choose(opt.value)}
            className="block w-full rounded-xl border border-ink-900/10 bg-white px-5 py-4 text-left font-medium text-ink-900 transition-colors hover:border-brand-500 hover:bg-brand-50"
          >
            {opt.label}
          </button>
        ))}
      </div>
      {step > 0 && (
        <button onClick={() => setStep((s) => s - 1)} className="mt-6 text-sm text-ink-500 hover:text-ink-900">
          ← Orqaga
        </button>
      )}
    </Container>
  );
}
