import { getSessionUserId } from "@/lib/session";
import { getLatestQuizResponse } from "@/lib/db";
import { scholarships } from "@/lib/seed-data";
import { matchScholarships, type GrantVectors } from "@/lib/scoring";
import { Card, Badge, Button, Eyebrow } from "@/components/ui";

export default async function GrantsPage() {
  const userId = (await getSessionUserId())!;
  const latest = await getLatestQuizResponse(userId, "grant");

  if (!latest) {
    return (
      <div className="mx-auto max-w-xl text-center">
        <Eyebrow>GRANTLARIM</Eyebrow>
        <h1 className="mt-3 text-2xl font-extrabold text-ink-950">Hali testdan o&apos;tmagansan.</h1>
        <p className="mt-2 text-sm text-ink-600">Grant testini yakunlasang, senga mos stipendiyalar shu yerda chiqadi.</p>
        <div className="mt-6">
          <Button href="/testlar/grant">Grant testini boshlash →</Button>
        </div>
      </div>
    );
  }

  const vectors = (latest.result as { vectors: GrantVectors }).vectors;
  const matches = matchScholarships(vectors);

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-extrabold text-ink-950">Grantlarim</h1>
      <p className="mt-1 text-sm text-ink-600">Test natijalaring asosida, muddatigacha kam qolganlar yuqorida.</p>
      <div className="mt-6 space-y-3">
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
      </div>
      <p className="mt-4 text-xs text-ink-500">{scholarships.length} ta grant bazasidan tanlandi. Yangilash uchun testni qaytadan topshir.</p>
      <div className="mt-4">
        <Button href="/testlar/grant" variant="outline">Testni qaytadan topshirish</Button>
      </div>
    </div>
  );
}
