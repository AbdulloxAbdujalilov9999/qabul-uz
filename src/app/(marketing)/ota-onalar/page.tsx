import { Container, Button, Card, Eyebrow, FAQItem } from "@/components/ui";

export default function ParentsPage() {
  return (
    <div>
      <section className="bg-gradient-to-b from-brand-50 to-paper py-16">
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <Eyebrow>OTA-ONALAR UCHUN</Eyebrow>
            <h1 className="mt-3 text-4xl font-extrabold text-ink-950">Farzandingiz uchun yiliga bitta narx.</h1>
            <p className="mt-4 text-ink-700">
              UniSprint har bir muddatni rejalashtiradi, insho qoralamalarini tahlil qiladi, grantlarga moslaydi va
              faoliyatlar ro&apos;yxatini kuchaytiradi - kuniga bitta kichik dars orqali.
            </p>
            <div className="mt-6">
              <Button href="/royxatdan-otish" size="lg">Farzandim bepul boshlasin</Button>
            </div>
          </div>
          <Card>
            <p className="text-sm font-semibold text-ink-500">Narx</p>
            <p className="mt-2 text-3xl font-extrabold text-ink-950">1,500,000 so&apos;m/yil</p>
            <p className="text-sm text-ink-500">yoki 150,000 so&apos;m/oy</p>
            <p className="mt-4 text-sm text-ink-700">Bitta xususiy repetitor darsidan arzon - butun yil uchun.</p>
          </Card>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <Eyebrow>QANDAY TO&apos;LANADI</Eyebrow>
          <h2 className="mt-3 text-2xl font-extrabold text-ink-950">Farzandingiz uchun to&apos;lash 3 bosqich</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              { n: "1", t: "Ular bepul boshlaydi", d: "Farzandingiz ro'yxatdan o'tadi va testlar, keyslar, birinchi 10 darsni bepul oladi." },
              { n: "2", t: "Sizga havola yuboriladi", d: "Ilovadagi 'ota-onadan so'rash' tugmasi orqali tushuntiruvchi havola yuboriladi." },
              { n: "3", t: "Siz to'laysiz", d: "Havola orqali bir marta to'laysiz, hisob darhol faollashadi - alohida login kerak emas." },
            ].map((s) => (
              <Card key={s.n}>
                <p className="text-3xl font-extrabold text-brand-700">{s.n}</p>
                <p className="mt-2 font-semibold text-ink-900">{s.t}</p>
                <p className="mt-1 text-sm text-ink-600">{s.d}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container className="max-w-3xl">
          <Eyebrow>SAVOLLAR</Eyebrow>
          <div className="mt-6 space-y-3">
            <FAQItem q="AI farzandim o'rniga insho yozadimi?" a="Yo'q. Yulduz har bir qoralamani baholaydi va kuchaytirish yo'llarini ko'rsatadi, lekin hech qachon qayta yozib bermaydi." />
            <FAQItem q="Farzandim ortda qolsa bilib olamanmi?" a="Himoya tizimiga qo'shilsangiz, u orqada qolganda sizga xabar yuboriladi (roziligi bilan)." />
            <FAQItem q="Maktab to'lab bersa kerakmi?" a="Ba'zi maktablar butun sinf uchun to'laydi va maslahatchi panelidan foydalanadi - bu holatda alohida to'lashingiz shart emas." />
          </div>
        </Container>
      </section>
    </div>
  );
}
