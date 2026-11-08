import { getSessionUserId } from "@/lib/session";
import { getRubyBalance, getSubscription, getParentLink } from "@/lib/db";
import { Card, Badge, Button, Eyebrow } from "@/components/ui";
import { CopyLink } from "@/components/copy-link";
import { demoTopUpRubies, generateParentLink, demoActivateSubscription } from "@/lib/actions/billing";

const topUps = [
  { amount: 10, price: "15,000 so'm" },
  { amount: 25, price: "35,000 so'm" },
  { amount: 60, price: "75,000 so'm" },
];

export default async function WalletPage() {
  const userId = (await getSessionUserId())!;
  const [balance, subscription, parentLink] = await Promise.all([
    getRubyBalance(userId),
    getSubscription(userId),
    getParentLink(userId),
  ]);

  return (
    <div className="mx-auto max-w-2xl space-y-10">
      <div>
        <h1 className="text-2xl font-extrabold text-ink-950">Hamyon</h1>
        <p className="mt-1 text-sm text-ink-600">Rubin faqat mentorlarga xabar yozish uchun ishlatiladi.</p>
      </div>

      <Card>
        <p className="text-xs font-semibold uppercase text-ink-500">Joriy balans</p>
        <p className="mt-1 text-4xl font-extrabold text-accent-700">{balance} 💎</p>
        <div className="mt-5 grid grid-cols-3 gap-3">
          {topUps.map((t) => (
            <form key={t.amount} action={demoTopUpRubies.bind(null, t.amount)}>
              <button className="w-full rounded-xl border border-ink-900/10 px-3 py-3 text-center hover:border-brand-500">
                <p className="font-bold text-ink-950">+{t.amount} 💎</p>
                <p className="text-xs text-ink-500">{t.price}</p>
              </button>
            </form>
          ))}
        </div>
        <p className="mt-3 text-xs text-ink-400">To&apos;lov tizimi hozircha ulanmagan - bu tugmalar demo rejimda ishlaydi.</p>
      </Card>

      <div>
        <Eyebrow>Obuna</Eyebrow>
        <Card className="mt-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-ink-900">{subscription.plan === "free" ? "Bepul reja" : subscription.plan === "annual" ? "Yillik reja" : "Oylik reja"}</p>
              {subscription.currentPeriodEnd && <p className="text-xs text-ink-500">Amal qiladi: {new Date(subscription.currentPeriodEnd).toLocaleDateString("uz-UZ")}gacha</p>}
            </div>
            <Badge tone={subscription.status === "active" ? "brand" : "ink"}>{subscription.status === "active" ? "Faol" : "Bepul"}</Badge>
          </div>
          {subscription.plan === "free" && (
            <div className="mt-4 flex gap-3">
              <form action={demoActivateSubscription.bind(null, "monthly")}>
                <button className="rounded-full border border-ink-900/15 px-4 py-2 text-sm font-medium hover:border-brand-500">150,000/oy faollashtirish (demo)</button>
              </form>
              <form action={demoActivateSubscription.bind(null, "annual")}>
                <button className="rounded-full bg-brand-700 px-4 py-2 text-sm font-medium text-white hover:bg-brand-800">1,500,000/yil faollashtirish (demo)</button>
              </form>
            </div>
          )}
        </Card>
      </div>

      <div>
        <Eyebrow>Ota-onadan so&apos;rash</Eyebrow>
        <Card className="mt-3">
          <p className="text-sm text-ink-600">Ota-onangizga havola yuboring - ular to&apos;lagach, hisobingiz avtomatik yillik rejaga o&apos;tadi.</p>
          {parentLink ? (
            <div className="mt-4">
              <CopyLink path={`/ota-ona/${parentLink.token}`} />
              <Badge tone={parentLink.status === "paid" ? "brand" : "accent"}>{parentLink.status === "paid" ? "To'langan" : "Kutilmoqda"}</Badge>
            </div>
          ) : (
            <form action={generateParentLink} className="mt-4">
              <Button type="submit">Havola yaratish</Button>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
}
