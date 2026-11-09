import { Check } from "lucide-react";
import { Container, Button, Badge, Card, Eyebrow, FAQItem } from "@/components/ui";

const compareRows = [
  { label: "Narx", qabul: "150,000 so'm/oy · 1,500,000/yil", tutor: "300,000-800,000/soat", agency: "15,000,000-80,000,000", point: "250,000-450,000/oy" },
  { label: "Qamrov", qabul: "Butun jarayon, 9-11 sinf", tutor: "Pul yetganicha", agency: "Butun jarayon", point: "Faqat 1-2 funksiya" },
  { label: "Inson yordami", qabul: "Mentorlar - keysini bepul o'qi, rubin bilan yoz", tutor: "Bitta repetitor", agency: "Jamoa, bir martalik to'lov", point: "Yo'q - faqat AI" },
  { label: "Amalda qildiradi", qabul: "Kunlik dars, diqqat rejimi, Himoya tizimi", tutor: "Faqat dars vaqtida", agency: "Ha, lekin qimmat", point: "Yo'q" },
  { label: "Narx ochiqmi?", qabul: "Ha, hech qanday qo'ng'iroqsiz", tutor: "Yo'q", agency: "Deyarli hech qachon", point: "Ha" },
];

export default function PricingPage() {
  return (
    <div>
      <section className="bg-gradient-to-b from-brand-50 to-paper py-16">
        <Container className="text-center">
          <Eyebrow>NARXLAR OSHKORA</Eyebrow>
          <h1 className="mx-auto mt-3 max-w-2xl text-4xl font-extrabold text-ink-950">
            Oyiga bitta narx. $20,000 emas.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-ink-700">
            Xususiy maslahatchilar 15-80 million so&apos;m oladi. Alohida AI vositalar faqat insho uchun oyiga
            300,000+ so&apos;m. UniSprint butun jarayon uchun bitta oddiy narx.
          </p>
        </Container>
      </section>

      <section className="py-16">
        <Container className="grid gap-6 md:grid-cols-2">
          <Card className="border-2 border-ink-900/10">
            <p className="text-sm font-semibold text-ink-500">BEPUL</p>
            <p className="mt-2 text-4xl font-extrabold text-ink-950">0 so&apos;m</p>
            <p className="mt-1 text-sm text-ink-500">Karta kerak emas</p>
            <ul className="mt-6 space-y-3 text-sm text-ink-700">
              {["Arketip, moslik va grant testlari", "Barcha keyslarni o'qish", "Birinchi 10 ta shaxsiy dars", "Dastur ro'yxati va muddatlar"].map((f) => (
                <li key={f} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />{f}</li>
              ))}
            </ul>
            <div className="mt-8">
              <Button href="/royxatdan-otish" variant="outline" className="w-full">Bepul boshlash</Button>
            </div>
          </Card>

          <Card className="border-2 border-brand-600 bg-brand-50/40">
            <Badge tone="accent">ENG MASHHUR</Badge>
            <p className="mt-2 text-4xl font-extrabold text-ink-950">150,000 so&apos;m<span className="text-base font-medium text-ink-500">/oy</span></p>
            <p className="mt-1 text-sm text-ink-500">yoki 1,500,000 so&apos;m/yil (2 oy tekin)</p>
            <p className="mt-4 text-sm font-semibold text-ink-900">Bepul rejadagi hamma narsa, qo&apos;shimcha:</p>
            <ul className="mt-3 space-y-3 text-sm text-ink-700">
              {[
                "Har bir insho qoralamasiga Yulduz fikri",
                "Grant mosligi - shaxsiylashtirilgan",
                "Faoliyatlar ro'yxatini baholash va kuchaytirish",
                "Tavsiyanoma paketi va brag sheet",
                "To'liq kunlik reja, diqqat rejimi, Himoya tizimi",
              ].map((f) => (
                <li key={f} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />{f}</li>
              ))}
            </ul>
            <div className="mt-8">
              <Button href="/royxatdan-otish" className="w-full">To&apos;liq rejani boshlash</Button>
            </div>
            <p className="mt-3 text-center text-xs text-ink-500">Mentor bilan xabarlashish alohida - rubin orqali to&apos;lanadi.</p>
          </Card>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container>
          <Eyebrow>TAQQOSLASH</Eyebrow>
          <h2 className="mt-3 text-2xl font-extrabold text-ink-950">UniSprint boshqalarga nisbatan</h2>
          <div className="mt-8 overflow-x-auto rounded-2xl border border-ink-900/8">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-ink-50 text-ink-500">
                <tr>
                  <th className="px-4 py-3 font-semibold">Mezon</th>
                  <th className="px-4 py-3 font-semibold text-brand-700">UniSprint</th>
                  <th className="px-4 py-3 font-semibold">Repetitor</th>
                  <th className="px-4 py-3 font-semibold">Konsalting agentligi</th>
                  <th className="px-4 py-3 font-semibold">Faqat-insho AI</th>
                </tr>
              </thead>
              <tbody>
                {compareRows.map((r) => (
                  <tr key={r.label} className="border-t border-ink-900/8">
                    <td className="px-4 py-3 font-medium text-ink-900">{r.label}</td>
                    <td className="px-4 py-3 font-semibold text-brand-700">{r.qabul}</td>
                    <td className="px-4 py-3 text-ink-600">{r.tutor}</td>
                    <td className="px-4 py-3 text-ink-600">{r.agency}</td>
                    <td className="px-4 py-3 text-ink-600">{r.point}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-ink-500">Raqamlar bozor o&apos;rtachasiga asoslangan taxminiy ko&apos;rsatkich.</p>
        </Container>
      </section>

      <section className="py-16">
        <Container className="max-w-3xl">
          <Eyebrow>SAVOLLAR</Eyebrow>
          <div className="mt-6 space-y-3">
            <FAQItem q="Oyiga bekor qilsam bo'ladimi?" a="Ha, oylik to'lov istalgan vaqt bekor qilinadi. Yillik reja esa bir martalik to'lov, avtomatik yangilanmaydi." />
            <FAQItem q="Mentor bilan yozishish narxga kiradimi?" a="Yo'q - bu alohida, rubin orqali to'lanadi. Har bir mentor o'z narxini belgilaydi, u javob bermasa rubinlaring qaytadi." />
            <FAQItem q="Ota-onam to'lashi mumkinmi?" a="Ha - ilovada 'ota-onadan so'rash' tugmasi orqali havola yuborasan, ular to'lov sahifasida bir marta to'laydi." />
            <FAQItem q="Maktabim to'lab bera oladimi?" a="Ha - maktab va litseylar uchun o'quvchi boshiga yillik narx bor, maslahatchi paneli bilan birga. Maktablar sahifasida batafsil." />
          </div>
        </Container>
      </section>
    </div>
  );
}
