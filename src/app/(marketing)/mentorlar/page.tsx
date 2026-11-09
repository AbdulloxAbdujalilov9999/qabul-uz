import Link from "next/link";
import { Star, Gem } from "lucide-react";
import { Container, Card, Eyebrow } from "@/components/ui";
import { SchoolBadge } from "@/components/school-badge";
import { mentors, schools } from "@/lib/seed-data";

export const metadata = { title: "Mentorlar" };

export default function MentorsPage() {
  return (
    <div>
      <section className="bg-gradient-to-b from-brand-50 to-paper py-16">
        <Container className="max-w-2xl">
          <Eyebrow>MENTORLAR</Eyebrow>
          <h1 className="mt-3 text-4xl font-extrabold text-ink-950">Qabul qilingan talabalardan bevosita so&apos;ra.</h1>
          <p className="mt-4 text-ink-700">
            Har bir profilni va to&apos;liq keysini o&apos;qish bepul. Bevosita yozishish rubin (ichki valyuta) orqali -
            mentor javob bermasa, rubinlar qaytadi.
          </p>
        </Container>
      </section>
      <section className="py-16">
        <Container className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {mentors.map((m) => {
            const school = schools.find((s) => s.id === m.schoolId);
            return (
              <Link key={m.id} href={`/mentorlar/${m.id}`}>
                <Card className="h-full transition-shadow hover:shadow-md">
                  <div className="flex items-center gap-2.5">
                    <SchoolBadge schoolId={m.schoolId} size="sm" />
                    <span className="text-xs font-semibold text-ink-500">{school?.name}</span>
                  </div>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand-100 text-base font-bold text-brand-700">
                      {m.displayName[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-ink-900">{m.displayName}</p>
                      <p className="text-xs text-ink-500">{m.classYear}-yil bitiruvchi</p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-ink-600">{m.tagline}</p>
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="inline-flex items-center gap-1 text-ink-500">
                      {typeof m.rating === "number" ? <><Star className="h-3.5 w-3.5 fill-accent-400 text-accent-500" /> {m.rating.toFixed(1)}</> : "Yangi"}
                    </span>
                    <span className="inline-flex items-center gap-1 font-semibold text-accent-700">{m.priceRubies} <Gem className="h-3.5 w-3.5" /> / xabar</span>
                  </div>
                </Card>
              </Link>
            );
          })}
        </Container>
      </section>
    </div>
  );
}
