import { Mail } from "lucide-react";
import { getSessionUserId } from "@/lib/session";
import { getRecommenders } from "@/lib/db";
import { Card, Badge, Button, Eyebrow } from "@/components/ui";
import { addRecommender } from "@/lib/actions/recommenders";
import { RecommenderStatusSelect, RemoveRecommenderButton } from "@/components/recommender-controls";

const statusTone = { requested: "ink", packet_sent: "accent", submitted: "good" } as const;

export default async function RecommendersPage() {
  const userId = (await getSessionUserId())!;
  const recommenders = await getRecommenders(userId);

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-extrabold text-ink-950">Tavsiyanomalar</h1>
      <p className="mt-1 text-sm text-ink-600">
        O&apos;qituvchi yoki maslahatchingizni bir marta taklif qiling — ularning xati har bir arizangizda qayta ishlatiladi.
      </p>

      <div className="mt-6 space-y-3">
        {recommenders.length === 0 && (
          <p className="text-sm text-ink-500">Hali hech kim taklif qilinmagan. Pastdan qo&apos;shing.</p>
        )}
        {recommenders.map((r) => (
          <Card key={r.id} className="flex items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-ink-900">{r.name}{r.relationship ? ` · ${r.relationship}` : ""}</p>
              <p className="flex items-center gap-1.5 text-xs text-ink-500"><Mail className="h-3 w-3" /> {r.email}</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge tone={statusTone[r.status]}>
                {r.status === "requested" ? "So'rov yuborildi" : r.status === "packet_sent" ? "Paket yuborildi" : "Topshirdi"}
              </Badge>
              <RecommenderStatusSelect id={r.id} status={r.status} />
              <RemoveRecommenderButton id={r.id} />
            </div>
          </Card>
        ))}
      </div>

      <Card className="mt-8">
        <Eyebrow>Yangi tavsiyachi qo&apos;shish</Eyebrow>
        <form action={addRecommender} className="mt-4 space-y-3">
          <input name="name" required placeholder="To'liq ism" className="w-full rounded-lg border border-ink-900/15 px-3 py-2.5 text-sm outline-none focus:border-brand-500" />
          <input name="relationship" placeholder="Munosabat (masalan: fan o'qituvchisi, maktab maslahatchisi)" className="w-full rounded-lg border border-ink-900/15 px-3 py-2.5 text-sm outline-none focus:border-brand-500" />
          <input name="email" type="email" required placeholder="Email" className="w-full rounded-lg border border-ink-900/15 px-3 py-2.5 text-sm outline-none focus:border-brand-500" />
          <Button type="submit">Taklif qo&apos;shish</Button>
        </form>
        <p className="mt-3 text-xs text-ink-500">Hozircha email avtomatik yuborilmaydi — tavsiyachiga o&apos;zingiz murojaat qiling va holatini shu yerda belgilang.</p>
      </Card>
    </div>
  );
}
