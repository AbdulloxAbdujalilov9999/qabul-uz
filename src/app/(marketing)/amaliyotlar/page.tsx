import Link from "next/link";
import { Container, Card, Badge, Eyebrow } from "@/components/ui";
import { caseStudies, schools } from "@/lib/seed-data";

export const metadata = { title: "Keyslar" };

export default function CaseStudiesPage() {
  return (
    <div>
      <section className="bg-gradient-to-b from-brand-50 to-paper py-16">
        <Container className="max-w-2xl">
          <Eyebrow>HAQIQIY KEYSLAR</Eyebrow>
          <h1 className="mt-3 text-4xl font-extrabold text-ink-950">Oddiy o&apos;quvchilar qanday qabul qilinadi?</h1>
          <p className="mt-4 text-ink-700">
            Har bir keys - to&apos;liq ariza tarixi: hikoya, faoliyatlar va nima ishlagani.
          </p>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <p className="mb-6 text-sm font-semibold text-ink-500">{caseStudies.length} TA KEYS</p>
          <div className="grid gap-6 md:grid-cols-3">
            {caseStudies.map((c) => {
              const school = schools.find((s) => s.id === c.schoolId);
              return (
                <Link key={c.id} href={`/amaliyotlar/${c.slug}`}>
                  <Card className="h-full transition-shadow hover:shadow-md">
                    <Badge tone="ink">{school?.name}</Badge>
                    <p className="mt-3 font-bold text-ink-950">{c.title}</p>
                    <p className="mt-2 text-sm text-ink-600">{c.summary}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {c.tags.slice(0, 3).map((t) => (
                        <span key={t} className="rounded-full bg-ink-50 px-2 py-0.5 text-xs text-ink-600">{t}</span>
                      ))}
                    </div>
                    <div className="mt-4 flex gap-2 text-xs text-ink-500">
                      <span>{c.acceptanceCount} taklif</span>
                      <span>·</span>
                      <span>★ {c.rating.toFixed(1)}</span>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>
    </div>
  );
}
