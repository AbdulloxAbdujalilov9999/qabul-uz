import { notFound } from "next/navigation";
import { getSessionUserId } from "@/lib/session";
import { getEssay, getLatestFeedback } from "@/lib/db";
import { Container, Card, Badge, Eyebrow } from "@/components/ui";
import { EssayEditor } from "@/components/essay-editor";
import { BackButton } from "@/components/back-button";

export default async function EssayDetailPage(props: PageProps<"/ilova/insholarim/[id]">) {
  const { id } = await props.params;
  const userId = (await getSessionUserId())!;
  const essay = await getEssay(id, userId);
  if (!essay) notFound();

  const feedback = await getLatestFeedback(essay.id);

  return (
    <Container className="max-w-3xl py-6">
      <BackButton className="mb-4" />
      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <EssayEditor essay={essay} />

        <aside>
          <Eyebrow>Yulduz tahlili</Eyebrow>
          {!feedback ? (
            <p className="mt-3 text-sm text-ink-500">Hali tahlil yo&apos;q. &quot;Yulduzdan fikr olish&quot; tugmasini bos.</p>
          ) : (
            <div className="mt-3 space-y-4">
              <Card className="text-center">
                <p className="text-xs font-semibold uppercase text-ink-500">Ball</p>
                <p className="text-4xl font-extrabold text-brand-700">{feedback.score}<span className="text-base text-ink-400">/10</span></p>
              </Card>
              {feedback.grammarNotes.length > 0 && (
                <Card>
                  <Badge tone="ink">Grammatika</Badge>
                  <ul className="mt-2 space-y-1.5 text-sm text-ink-700">
                    {feedback.grammarNotes.map((n, i) => <li key={i}>• {n}</li>)}
                  </ul>
                </Card>
              )}
              {feedback.narrativeNotes.length > 0 && (
                <Card>
                  <Badge tone="brand">Hikoya</Badge>
                  <ul className="mt-2 space-y-1.5 text-sm text-ink-700">
                    {feedback.narrativeNotes.map((n, i) => <li key={i}>• {n}</li>)}
                  </ul>
                </Card>
              )}
              {feedback.lineComments.length > 0 && (
                <Card>
                  <Badge tone="accent">Qator bo&apos;yicha</Badge>
                  <ul className="mt-2 space-y-3 text-sm">
                    {feedback.lineComments.map((c, i) => (
                      <li key={i}>
                        <p className="italic text-ink-500">&quot;{c.excerpt}...&quot;</p>
                        <p className="mt-1 text-ink-700">{c.comment}</p>
                      </li>
                    ))}
                  </ul>
                </Card>
              )}
            </div>
          )}
        </aside>
      </div>
    </Container>
  );
}
