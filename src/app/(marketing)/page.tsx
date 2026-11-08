import Link from "next/link";
import { Container, Button, Badge, Card, Eyebrow, FAQItem } from "@/components/ui";
import { caseStudies, mentors, schools } from "@/lib/seed-data";

export default function HomePage() {
  const previewCases = caseStudies.slice(0, 3);
  const previewMentors = mentors.slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="overflow-hidden bg-gradient-to-b from-brand-50 to-paper py-20">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Eyebrow>YULDUZ — SENING SHAXSIY MENTORING</Eyebrow>
            <h1 className="mt-3 text-4xl font-extrabold leading-tight text-ink-950 sm:text-5xl">
              Orzuyingdagi grant yoki universitetga kir.
            </h1>
            <p className="mt-5 max-w-lg text-lg text-ink-700">
              Senga mos stipendiyalar, ko&apos;zga tashlanadigan faoliyatlar ro&apos;yxati, har bir insho qoralamasiga
              fikr-mulohaza va barcha muddatlar - kuniga bitta kichik dars orqali.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href="/royxatdan-otish" size="lg">Bepul boshlash</Button>
              <Button href="/kirish" variant="outline" size="lg">Kirish</Button>
            </div>
            <p className="mt-4 text-sm text-ink-500">Bepul boshlash · karta kerak emas · birinchi 10 dars bizdan</p>
            <div className="mt-6 flex gap-6 text-sm">
              <Link href="/ota-onalar" className="font-medium text-brand-700 hover:underline">Men ota-onaman →</Link>
              <Link href="/maktablar" className="font-medium text-brand-700 hover:underline">Men maslahatchiman →</Link>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-3xl border border-ink-900/8 bg-white p-6 shadow-xl">
              <p className="text-sm font-semibold text-ink-500">Bugungi reja</p>
              <ul className="mt-4 space-y-3">
                {["Arketip testini yakunlash", "Ro'yxatga 2 dastur qo'shish", "Kundalikka yozish"].map((t) => (
                  <li key={t} className="flex items-center gap-3 rounded-xl bg-brand-50 px-4 py-3 text-sm font-medium text-ink-900">
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-brand-600 text-xs text-white">✓</span>
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex items-center justify-between rounded-xl bg-accent-50 px-4 py-3 text-sm">
                <span className="font-medium text-accent-800">🔥 7 kunlik streak</span>
                <span className="text-accent-700">Diqqat rejimi yoqilgan</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Feature: scholarship matching */}
      <FeatureRow
        eyebrow="GRANT MOSLIGI"
        title="Senga mos grantlarni top."
        body="Qisqa test - profilingdan to'ldirilgan - seni milliy stipendiyalar, ehtiyojga asoslangan to'liq grantlar, qiziqishlaringga mos tanlovlar va mintaqaviy dasturlarga moslaydi. Muddati yaqinlashganlari yuqorida turadi."
        cta={{ href: "/testlar/grant", label: "Grantimni toping" }}
        bullets={["Moliya va shaxsiy savollar faqat brauzeringda baholanadi, saqlanmaydi.", "Har bir grant muddati bilan tartiblangan."]}
      />

      <FeatureRow
        reverse
        eyebrow="FAOLIYATLAR"
        title="Qilgan ishlaringni kuchli ro'yxatga aylantir."
        body="Faoliyatlar ro'yxatini tuz va baholat, har bir yozuvni qanday kuchaytirishni bil. Senga mos imkoniyatlarni - tadqiqot, amaliyot, jamoat ishlari - top va tavsiyanoma uchun o'qituvchilarga tayyor paket yubor."
        cta={{ href: "/royxatdan-otish", label: "Bepul boshlash" }}
      />

      <FeatureRow
        eyebrow="YOZISH murabbiyi"
        title="Insholaring bo'yicha ma'noli fikr ol."
        body="Har bir qoralama grammatika, mantiq, hikoya kuchi va tasvir bo'yicha baholanadi - qaysi joy kuchli, qaysi joyni kuchaytirish kerak, qator-qator sharhlar bilan. Hech qachon qayta yozib bermaydi - bu sening so'zlaring bo'lib qoladi."
        cta={{ href: "/amaliyotlar", label: "Haqiqiy keyslarni o'qing" }}
      />

      <FeatureRow
        reverse
        eyebrow="KUNLIK REJA"
        title="Butun ariza jarayoni - o'yinga aylangan."
        body="Har bir muddat avtomatik tortib olinadi, har bir kun kichik darsga bo'linadi - dastur tanlashdan topshirishgacha. Diqqat rejimi yoqilganda ijtimoiy tarmoqlar darsni tugatmaguningcha eslatma bilan to'xtatib turadi."
        bullets={["Illyustratsiyali xarita bo'ylab yurish", "Diqqat rejimi (Focus Mode) orqali chalg'ituvchi ilovalarni eslatma bilan to'xtatish", "Yaqinlaringga avtomatik signal (Himoya tizimi)"]}
      />

      {/* How it works */}
      <section className="bg-white py-20">
        <Container>
          <Eyebrow>QANDAY ISHLAYDI</Eyebrow>
          <h2 className="mt-3 max-w-2xl text-3xl font-extrabold text-ink-950">&quot;Qayerdan boshlashni bilmayman&quot;dan topshirishgacha.</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-4">
            {[
              { step: "1", tag: "BEPUL", title: "Testlarni top", body: "Arketip, dastur mosligi va grant testlarini yakunla." },
              { step: "2", tag: "BEPUL", title: "Ro'yxatingni tuz", body: "Har bir dastur muddati avtomatik kunlik rejaga aylanadi." },
              { step: "3", tag: "10 TA BEPUL", title: "Kuniga bitta dars", body: "Kundalik yoz, faoliyatlarni kuchaytir, insho yoz." },
              { step: "4", tag: "TO'LIQ REJA", title: "Ishonch bilan topshir", body: "Har bir insho tahlil qilingan, muddatlar bajarilgan." },
            ].map((s) => (
              <Card key={s.step}>
                <Badge tone="accent">{s.tag}</Badge>
                <p className="mt-4 text-3xl font-extrabold text-brand-700">{s.step}</p>
                <p className="mt-2 font-semibold text-ink-900">{s.title}</p>
                <p className="mt-1 text-sm text-ink-600">{s.body}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Case studies preview */}
      <section className="bg-brand-50/60 py-20">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow>HAQIQIY KEYSLAR</Eyebrow>
              <h2 className="mt-3 max-w-xl text-3xl font-extrabold text-ink-950">Oddiy o&apos;quvchilar qanday qilib qabul qilinadi?</h2>
            </div>
            <Button href="/amaliyotlar" variant="outline">Barcha keyslarni ko&apos;rish</Button>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {previewCases.map((c) => (
              <Link key={c.id} href={`/amaliyotlar/${c.slug}`}>
                <Card className="h-full transition-shadow hover:shadow-md">
                  <Badge tone="placeholder">Namuna</Badge>
                  <p className="mt-3 font-bold text-ink-950">{c.title}</p>
                  <p className="mt-2 text-sm text-ink-600">{c.summary}</p>
                  <div className="mt-4 flex gap-2 text-xs text-ink-500">
                    <span>{c.acceptanceCount} taklif</span>
                    <span>·</span>
                    <span>★ {c.rating.toFixed(1)}</span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Mentors preview */}
      <section className="bg-white py-20">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow>MENTORLAR</Eyebrow>
              <h2 className="mt-3 max-w-xl text-3xl font-extrabold text-ink-950">Qabul qilingan talabalardan bevosita so&apos;ra.</h2>
            </div>
            <Button href="/mentorlar" variant="outline">Barcha mentorlarni ko&apos;rish</Button>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-4">
            {previewMentors.map((m) => {
              const school = schools.find((s) => s.id === m.schoolId);
              return (
                <Link key={m.id} href={`/mentorlar/${m.id}`}>
                  <Card className="h-full text-center transition-shadow hover:shadow-md">
                    <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand-100 text-lg font-bold text-brand-700">
                      {m.displayName[0]}
                    </div>
                    <p className="mt-3 font-semibold text-ink-900">{m.displayName}</p>
                    <p className="text-xs text-ink-500">{school?.name} · {m.classYear}</p>
                    <p className="mt-2 text-xs text-ink-600">{m.tagline}</p>
                    <Badge tone="accent">{m.priceRubies} 💎</Badge>
                  </Card>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Pricing preview */}
      <section className="bg-ink-950 py-20 text-white">
        <Container className="text-center">
          <Eyebrow>NARXLAR OSHKORA</Eyebrow>
          <h2 className="mt-3 text-3xl font-extrabold">Oyiga bir fast-fud kombosi narxida.</h2>
          <p className="mx-auto mt-4 max-w-xl text-ink-100/80">
            Xususiy maslahatchilar soatiga $50-200 oladi. Qabul butun jarayon uchun oyiga atigi bitta narx.
          </p>
          <div className="mt-8">
            <Button href="/narxlar" variant="secondary" size="lg">Narxlarni ko&apos;rish</Button>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="bg-paper py-20">
        <Container className="max-w-3xl">
          <Eyebrow>TEZ-TEZ SO&apos;RALADIGAN SAVOLLAR</Eyebrow>
          <h2 className="mt-3 text-3xl font-extrabold text-ink-950">Savollaringga javoblar</h2>
          <div className="mt-8 space-y-3">
            <FAQItem
              q="Insholarimni AI yozib beradimi?"
              a="Yo'q. Yulduz har bir qoralamani o'qib, ball, grammatik tuzatish va kuchaytirish yo'llarini beradi - lekin hech qachon qayta yozib bermaydi. Grant beruvchi tashkilot sening so'zlaringni o'qiydi."
            />
            <FAQItem
              q="Qabul qancha turadi?"
              a="Birinchi 10 dars, barcha testlar va barcha keyslar bepul. To'liq reja oyiga belgilangan narxda - istalgan oy bekor qilish mumkin. Narxlar sahifasida to'liq tafsilot bor."
            />
            <FAQItem
              q="Mentor bilan gaplashish qanday ishlaydi?"
              a="Har bir mentorning profilini va to'liq keysini o'qish bepul. Bevosita xabar yozish esa rubin (ichki valyuta) orqali to'lanadi - mentor javob bermasa, rubinlaring qaytariladi."
            />
            <FAQItem
              q="Bu keyslar va mentorlar haqiqiymi?"
              a="Hozircha bu namunaviy (placeholder) ma'lumotlar - loyihani ko'rsatish uchun. Haqiqiy abituriyentlar va bitiruvchilar qo'shilgandan so'ng, har bir profil aniq belgilanadi."
            />
          </div>
        </Container>
      </section>
    </div>
  );
}

function FeatureRow({
  eyebrow,
  title,
  body,
  cta,
  bullets,
  reverse,
}: {
  eyebrow: string;
  title: string;
  body: string;
  cta?: { href: string; label: string };
  bullets?: string[];
  reverse?: boolean;
}) {
  return (
    <section className="py-16">
      <Container className={`grid items-center gap-10 lg:grid-cols-2 ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
        <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-brand-100 to-accent-100" />
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h3 className="mt-3 text-2xl font-extrabold text-ink-950 sm:text-3xl">{title}</h3>
          <p className="mt-4 text-ink-700">{body}</p>
          {bullets && (
            <ul className="mt-4 space-y-2 text-sm text-ink-700">
              {bullets.map((b) => (
                <li key={b} className="flex gap-2">
                  <span className="text-brand-600">✓</span>
                  {b}
                </li>
              ))}
            </ul>
          )}
          {cta && (
            <div className="mt-6">
              <Button href={cta.href}>{cta.label} →</Button>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
