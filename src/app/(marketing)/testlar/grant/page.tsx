"use client";

import { QuizRunner } from "@/components/quiz-runner";
import { SaveQuizResult } from "@/components/save-quiz-result";
import { Card, Badge } from "@/components/ui";
import { quizzes } from "@/lib/seed-data";
import { scoreGrant, matchScholarships } from "@/lib/scoring";

const quiz = quizzes.find((q) => q.slug === "grant")!;

export default function GrantQuizPage() {
  return (
    <QuizRunner
      quiz={quiz}
      renderResult={(answers) => {
        const vectors = scoreGrant(answers);
        const matches = matchScholarships(vectors).slice(0, 6);
        return (
          <div className="space-y-3">
            <p className="text-sm text-ink-600">Muddatigacha kam qolganlar yuqorida. Sanalar taxminiy - rasmiy manbada tekshiring.</p>
            {matches.map(({ scholarship, score }) => (
              <Card key={scholarship.id}>
                <div className="flex items-center justify-between">
                  <p className="font-bold text-ink-950">{scholarship.name}</p>
                  <Badge tone="accent">{score}% mos</Badge>
                </div>
                <p className="mt-1 text-sm text-ink-600">{scholarship.description}</p>
                <div className="mt-2 flex flex-wrap gap-3 text-xs text-ink-500">
                  <span>Miqdor: {scholarship.amountText}</span>
                  <span>Muddat: {new Date(scholarship.deadline).toLocaleDateString("uz-UZ")}</span>
                </div>
              </Card>
            ))}
            <SaveQuizResult quizSlug="grant" answers={answers} result={{ vectors, matches: matches.map((m) => ({ scholarshipId: m.scholarship.id, score: m.score })) }} />
          </div>
        );
      }}
    />
  );
}
