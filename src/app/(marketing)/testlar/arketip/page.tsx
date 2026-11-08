"use client";

import { QuizRunner } from "@/components/quiz-runner";
import { SaveQuizResult } from "@/components/save-quiz-result";
import { Card, Badge } from "@/components/ui";
import { quizzes } from "@/lib/seed-data";
import { scoreArketip } from "@/lib/scoring";

const quiz = quizzes.find((q) => q.slug === "arketip")!;

export default function ArketipQuizPage() {
  return (
    <QuizRunner
      quiz={quiz}
      renderResult={(answers) => {
        const { top, runnerUp } = scoreArketip(answers);
        return (
          <div className="space-y-4">
            <Card className="border-2 border-brand-600 bg-brand-50/40">
              <Badge>Sening arketiping</Badge>
              <p className="mt-3 text-2xl font-extrabold text-ink-950">{top.name}</p>
              <p className="mt-1 text-sm font-medium text-brand-700">{top.tagline}</p>
              <p className="mt-3 text-sm text-ink-700">{top.description}</p>
            </Card>
            {runnerUp && (
              <Card>
                <p className="text-xs font-semibold uppercase text-ink-500">Ikkinchi eng yaqin</p>
                <p className="mt-2 font-bold text-ink-900">{runnerUp.name}</p>
                <p className="mt-1 text-sm text-ink-600">{runnerUp.description}</p>
              </Card>
            )}
            <SaveQuizResult quizSlug="arketip" answers={answers} result={{ top, runnerUp }} />
          </div>
        );
      }}
    />
  );
}
