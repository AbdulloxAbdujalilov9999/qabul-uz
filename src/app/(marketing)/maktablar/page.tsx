import { Container, Button, Card, Badge, Eyebrow, FAQItem } from "@/components/ui";

export default function SchoolsPage() {
  return (
    <div>
      <section className="bg-gradient-to-b from-brand-50 to-paper py-16">
        <Container className="max-w-3xl">
          <Eyebrow>MAKTAB VA LITSEYLAR UCHUN</Eyebrow>
          <h1 className="mt-3 text-4xl font-extrabold text-ink-950">
            Maslahatchingiz 300 o&apos;quvchini eslab qololmaydi. UniSprint eslab qoladi.
          </h1>
          <p className="mt-4 text-ink-700">
            Maslahatchi paneli har bir o&apos;quvchining progressini, qaysi insho qoralamasi tiqilib qolganini va
            kim orqada qolayotganini bir ekranda ko&apos;rsatadi.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="mailto:hello@qabul.uz?subject=Pilot%20so%27rovi" size="lg">Pilot so&apos;rash</Button>
            <Badge tone="ink">O&apos;quvchi boshiga yiliga 800,000 - 3,000,000 so&apos;m</Badge>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <Eyebrow>MASLAHATCHI NIMANI KO&apos;RADI</Eyebrow>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Card>
              <p className="font-semibold text-ink-900">Kim ortda qolgan, aniq nimada</p>
              <p className="mt-2 text-sm text-ink-600">Har bir o&apos;quvchining progress halqasi va necha kun ortda qolgani - 4+ kun ortda qolganlar yuqorida qizil chiziqda chiqadi.</p>
            </Card>
            <Card>
              <p className="font-semibold text-ink-900">Ikkita navbat - uchrashuv va insho</p>
              <p className="mt-2 text-sm text-ink-600">Uchrashuv so&apos;rovlari taklif qilingan vaqtlar bilan, insho qoralamalari dastur va AI bali bilan belgilangan holda keladi.</p>
            </Card>
            <Card>
              <p className="font-semibold text-ink-900">Qoralamani o&apos;qi, belgila, qaytar</p>
              <p className="mt-2 text-sm text-ink-600">O&apos;quvchi yozgan tahrirchining aynan o&apos;zida - matnni belgilab izoh yoz, AI tahlili yon panelda turadi.</p>
            </Card>
            <Card>
              <p className="font-semibold text-ink-900">Butun o&apos;quvchi - bir ekranda</p>
              <p className="mt-2 text-sm text-ink-600">Har bir ismni bossang - barcha insholar, test natijalari, dastur ro&apos;yxati va muvozanati (reach/target/safety) ochiladi.</p>
            </Card>
          </div>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container>
          <Eyebrow>MAVJUD TIZIMLAR BILAN MUNOSABAT</Eyebrow>
          <h2 className="mt-3 text-2xl font-extrabold text-ink-950">Bu almashtirish emas, ustiga qo&apos;shimcha.</h2>
          <p className="mt-4 max-w-2xl text-ink-700">
            UniSprint kontingent reestri yoki baholash jurnalini almashtirmaydi. Biz o&apos;quvchining ariza bo&apos;yicha
            amalga oshirgan ishini - insho, mavzu, ro&apos;yxat - saqlaymiz, chunki bu ish aynan shu yerda bajariladi.
          </p>
        </Container>
      </section>

      <section className="py-16">
        <Container className="max-w-3xl">
          <Eyebrow>SAVOLLAR</Eyebrow>
          <div className="mt-6 space-y-3">
            <FAQItem q="Narxi qancha?" a="O'quvchi soniga qarab yiliga 800,000 - 3,000,000 so'm. Aniq taklif uchun o'quvchilar sonini yuboring." />
            <FAQItem q="Pilot qanday boshlanadi?" a="Bitta sinf yoki bitta maslahatchi yukini bir chorak davomida sinab ko'rasiz - keyin kengaytirasiz." />
            <FAQItem q="Ma'lumotlar xavfsizmi?" a="Har bir maslahatchi faqat o'z maktabiga biriktirilgan o'quvchilarni ko'radi. Pilotdan oldin ma'lumotlarni qanday saqlashimiz yozma ravishda kelishiladi." />
          </div>
        </Container>
      </section>
    </div>
  );
}
