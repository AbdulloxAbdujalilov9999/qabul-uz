import {
  Gamepad2,
  CalendarCheck,
  ShieldOff,
  Users,
  Compass,
  Rocket,
  PenLine,
  Bell,
  HeartHandshake,
} from "lucide-react";
import { Container, Eyebrow } from "./ui";

const features = [
  { icon: Gamepad2, bg: "#EF4444", title: "O'yinlashtirilgan darslar", body: "Illyustratsiyali xarita bo'ylab yur - kuniga bitta kichik dars har bir muddatga ulgurishingni ta'minlaydi." },
  { icon: CalendarCheck, bg: "#2563EB", title: "Muddatlar boshqaruvi", body: "Har bir dasturning bosqichi - ED, EA, REA, umumiy - bitta xaritada kuzatiladi." },
  { icon: ShieldOff, bg: "#16A34A", title: "Diqqat rejimi", body: "Instagram, TikTok, YouTube va X kunlik darsni tugatmaguningcha eslatma bilan to'xtatiladi." },
  { icon: HeartHandshake, bg: "#EA580C", title: "Himoya tizimi", body: "Orqada qolsang, yaqinlaringga avtomatik signal boradi - rozilik bilan." },
  { icon: Users, bg: "#9333EA", title: "Haqiqiy mentorlar", body: "Qabul qilingan talabalarga xabar yoz, to'liq ariza tarixini bepul o'qi." },
  { icon: Compass, bg: "#0891B2", title: "Moslik testlari", body: "Arketip, dastur mosligi va grant testlari qayerda yutib chiqishingni ko'rsatadi." },
  { icon: Rocket, bg: "#D97706", title: "Erta boshla, erta g'alaba", body: "Tadqiqot, amaliyot va jamoat ishlari - 9-sinfdan boshlaganlar uchun yo'l-yo'riq." },
  { icon: PenLine, bg: "#DB2777", title: "Hikoya-markazli insholar", body: "Kundaligingni o'qib, bo'sh sahifaga qarashdan oldin yozish mumkin bo'lgan voqealarni topadi." },
  { icon: Bell, bg: "#CA8A04", title: "Eslatma va signallar", body: "Bildirishnomalar streakni tirik saqlaydi va hech narsa unutilib qolmasligini ta'minlaydi." },
];

export function FeatureGrid() {
  return (
    <section className="bg-paper py-20">
      <Container>
        <Eyebrow>HAMMASI BIR JOYDA</Eyebrow>
        <h2 className="mt-3 max-w-xl text-3xl font-extrabold text-ink-950">Butun ariza jarayoni uchun kerak bo&apos;lgan hamma narsa.</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="rounded-2xl border border-ink-900/8 bg-white p-6 transition-shadow hover:shadow-md">
              <div
                className="grid h-11 w-11 place-items-center rounded-xl text-white"
                style={{ backgroundColor: f.bg }}
              >
                <f.icon className="h-5 w-5" strokeWidth={2.25} />
              </div>
              <p className="mt-4 font-semibold text-ink-950">{f.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-600">{f.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
