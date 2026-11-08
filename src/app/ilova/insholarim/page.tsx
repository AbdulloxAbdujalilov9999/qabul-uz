import Link from "next/link";
import { getSessionUserId } from "@/lib/session";
import { getEssays, getAllFeedbackForEssays } from "@/lib/db";
import { Card, Badge, Button } from "@/components/ui";
import { createEssay } from "@/lib/actions/essays";

export default async function EssaysListPage() {
  const userId = (await getSessionUserId())!;
  const essays = await getEssays(userId);
  const feedbackMap = await getAllFeedbackForEssays(essays.map((e) => e.id));

  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-ink-950">Insholarim</h1>
        <form action={createEssay}>
          <Button type="submit">+ Yangi insho</Button>
        </form>
      </div>

      <div className="mt-6 space-y-3">
        {essays.length === 0 && <p className="text-sm text-ink-500">Hali inshong yo&apos;q. Yangisini boshla.</p>}
        {essays.map((e) => {
          const feedback = feedbackMap.get(e.id);
          return (
            <Link key={e.id} href={`/ilova/insholarim/${e.id}`}>
              <Card className="flex items-center justify-between hover:shadow-md">
                <div>
                  <p className="font-semibold text-ink-900">{e.title}</p>
                  <p className="mt-1 text-xs text-ink-500">{e.content.trim().split(/\s+/).filter(Boolean).length} so&apos;z · {e.status === "reviewed" ? "Tahlil qilingan" : "Qoralama"}</p>
                </div>
                {feedback && <Badge tone="brand">{feedback.score}/10</Badge>}
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
