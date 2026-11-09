import { Lightbulb } from "lucide-react";
import { getSessionUserId } from "@/lib/session";
import { getExtracurriculars } from "@/lib/db";
import { Card, Badge, Button, Eyebrow } from "@/components/ui";
import { addExtracurricular, removeExtracurricular } from "@/lib/actions/extracurriculars";

export default async function ExtracurricularsPage() {
  const userId = (await getSessionUserId())!;
  const items = await getExtracurriculars(userId);

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-extrabold text-ink-950">Faoliyatlarim</h1>
      <p className="mt-1 text-sm text-ink-600">Har bir yozuv avtomatik baholanadi va kuchaytirish yo&apos;li beriladi.</p>

      <div className="mt-6 space-y-3">
        {items.map((e) => (
          <Card key={e.id}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-ink-900">{e.title}</p>
                <p className="text-xs text-ink-500">{e.role}</p>
              </div>
              {e.aiRating && <Badge tone="brand">{e.aiRating}/10</Badge>}
            </div>
            <p className="mt-2 text-sm text-ink-700">{e.description}</p>
            {e.aiFeedback && (
              <p className="mt-2 flex items-start gap-1.5 rounded-lg bg-accent-50 px-3 py-2 text-xs text-accent-800">
                <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0" /> {e.aiFeedback}
              </p>
            )}
            <form action={removeExtracurricular.bind(null, e.id)} className="mt-3">
              <button className="text-xs font-medium text-ink-400 hover:text-red-600">olib tashlash</button>
            </form>
          </Card>
        ))}
      </div>

      <Card className="mt-8">
        <Eyebrow>Yangi faoliyat qo&apos;shish</Eyebrow>
        <form action={addExtracurricular} className="mt-4 space-y-3">
          <input name="title" required placeholder="Masalan: Robototexnika to'garagi" className="w-full rounded-lg border border-ink-900/15 px-3 py-2.5 text-sm outline-none focus:border-brand-500" />
          <input name="role" placeholder="Rol (masalan: asoschi, a'zo)" className="w-full rounded-lg border border-ink-900/15 px-3 py-2.5 text-sm outline-none focus:border-brand-500" />
          <textarea name="description" rows={3} placeholder="Nima qilding, qancha vaqt, qanday natija?" className="w-full rounded-lg border border-ink-900/15 px-3 py-2.5 text-sm outline-none focus:border-brand-500" />
          <Button type="submit">Qo&apos;shish va baholash</Button>
        </form>
      </Card>
    </div>
  );
}
