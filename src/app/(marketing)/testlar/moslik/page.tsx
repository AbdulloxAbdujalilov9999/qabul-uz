"use client";

import { QuizRunner } from "@/components/quiz-runner";
import { SaveQuizResult } from "@/components/save-quiz-result";
import { Card, Badge } from "@/components/ui";
import { quizzes } from "@/lib/seed-data";
import { scoreMoslik, matchSchools } from "@/lib/scoring";

const quiz = quizzes.find((q) => q.slug === "moslik")!;
const bucketLabel = { reach: "Reach", target: "Target", safety: "Safety" } as const;
const bucketTone = { reach: "accent", target: "brand", safety: "ink" } as const;

export default function MoslikQuizPage() {
  return (
    <QuizRunner
      quiz={quiz}
      renderResult={(answers) => {
        const vectors = scoreMoslik(answers);
        const matches = matchSchools(vectors);
        return (
          <div className="space-y-3">
            <p className="text-sm text-ink-600">Natijalar reach/target/safety bo&apos;yicha tartiblangan.</p>
            {matches.map(({ school, pct, bucket }) => (
              <Card key={school.id} className="flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Badge tone={bucketTone[bucket]}>{bucketLabel[bucket]}</Badge>
                    <p className="font-bold text-ink-950">{school.name}</p>
                  </div>
                  <p className="mt-1 text-sm text-ink-600">{school.country}{school.city ? ` · ${school.city}` : ""}</p>
                </div>
                <p className="text-2xl font-extrabold text-brand-700">{pct}%</p>
              </Card>
            ))}
            <SaveQuizResult quizSlug="moslik" answers={answers} result={{ vectors, matches: matches.map((m) => ({ schoolId: m.school.id, pct: m.pct, bucket: m.bucket })) }} />
          </div>
        );
      }}
    />
  );
}
