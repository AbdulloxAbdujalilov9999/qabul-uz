import { getSessionUserId } from "@/lib/session";
import { getProfile, getSafetyNestContacts } from "@/lib/db";
import { Card, Badge, Button, Eyebrow } from "@/components/ui";
import { addSafetyNestContact } from "@/lib/actions/lessons";

export default async function SettingsPage() {
  const userId = (await getSessionUserId())!;
  const profile = (await getProfile(userId))!;
  const contacts = await getSafetyNestContacts(userId);

  return (
    <div className="mx-auto max-w-xl space-y-10">
      <div>
        <h1 className="text-2xl font-extrabold text-ink-950">Sozlamalar</h1>
        <Card className="mt-4">
          <p className="text-sm text-ink-500">Ism</p>
          <p className="font-medium text-ink-900">{profile.fullName}</p>
          <p className="mt-3 text-sm text-ink-500">Foydalanuvchi nomi</p>
          <p className="font-medium text-ink-900">@{profile.username}</p>
        </Card>
      </div>

      <div>
        <Eyebrow>Himoya tizimi (Safety Nest)</Eyebrow>
        <p className="mt-1 text-sm text-ink-600">Orqada qolsang, shu kishilarga avtomatik xabar boradi.</p>
        <div className="mt-4 space-y-2">
          {contacts.map((c) => (
            <Card key={c.id} className="flex items-center justify-between">
              <div>
                <p className="font-medium text-ink-900">{c.name}</p>
                <p className="text-xs text-ink-500">{c.relationship} · {c.phone}</p>
              </div>
              <Badge tone={c.optedIn ? "brand" : "ink"}>{c.optedIn ? "Faol" : "Kutilmoqda"}</Badge>
            </Card>
          ))}
        </div>
        <Card className="mt-4">
          <form action={addSafetyNestContact} className="space-y-3">
            <input name="name" required placeholder="Ism" className="w-full rounded-lg border border-ink-900/15 px-3 py-2.5 text-sm outline-none focus:border-brand-500" />
            <input name="relationship" placeholder="Munosabat (ota, aka...)" className="w-full rounded-lg border border-ink-900/15 px-3 py-2.5 text-sm outline-none focus:border-brand-500" />
            <input name="phone" required placeholder="Telefon raqami" className="w-full rounded-lg border border-ink-900/15 px-3 py-2.5 text-sm outline-none focus:border-brand-500" />
            <Button type="submit">Qo&apos;shish</Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
