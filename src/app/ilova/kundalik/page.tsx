import { getSessionUserId } from "@/lib/session";
import { getJournalEntries } from "@/lib/db";
import { journalPrompts } from "@/lib/seed-data";
import { Card, Badge, Button, Eyebrow } from "@/components/ui";
import { addJournalEntry } from "@/lib/actions/journal";

export default async function JournalPage() {
  const userId = (await getSessionUserId())!;
  const entries = await getJournalEntries(userId);
  const answeredPromptIds = new Set(entries.map((e) => e.promptId));
  const nextPrompt = journalPrompts.find((p) => !answeredPromptIds.has(p.id)) ?? journalPrompts[entries.length % journalPrompts.length];

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-extrabold text-ink-950">Kundalik</h1>
      <p className="mt-1 text-sm text-ink-600">Yoz - Yulduz bu yerdan insho mavzularini topadi.</p>

      <Card className="mt-6 border-2 border-brand-600 bg-brand-50/40">
        <Badge tone="accent">{nextPrompt.theme}</Badge>
        <p className="mt-3 font-semibold text-ink-900">{nextPrompt.prompt}</p>
        <form action={addJournalEntry.bind(null, nextPrompt.id)} className="mt-4 space-y-3">
          <textarea name="content" required rows={5} placeholder="Yoz..." className="w-full rounded-lg border border-ink-900/15 px-3 py-2.5 text-sm outline-none focus:border-brand-500" />
          <Button type="submit">Saqlash</Button>
        </form>
      </Card>

      {entries.length > 0 && (
        <div className="mt-10">
          <Eyebrow>Insho mavzusi takliflari</Eyebrow>
          <p className="mt-1 text-xs text-ink-500">Kundaliklaringdan ajratib olingan - har biri potentsial insho mavzusi.</p>
          <div className="mt-4 space-y-3">
            {entries.slice(0, 5).map((e) => {
              const prompt = journalPrompts.find((p) => p.id === e.promptId);
              const snippet = e.content.length > 140 ? e.content.slice(0, 140) + "…" : e.content;
              return (
                <Card key={e.id}>
                  {prompt && <Badge tone="ink">{prompt.theme}</Badge>}
                  <p className="mt-2 text-sm text-ink-700">{snippet}</p>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
