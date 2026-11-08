import Link from "next/link";
import { Container, Card, Badge, Eyebrow } from "@/components/ui";
import { schools, caseStudies } from "@/lib/seed-data";

export const metadata = { title: "Dasturlar" };

const kindLabel = { university: "Universitet", scholarship_program: "Grant dasturi", exchange_program: "Almashinuv" } as const;

export default function SchoolsDirectoryPage() {
  return (
    <div>
      <section className="bg-gradient-to-b from-brand-50 to-paper py-16">
        <Container className="max-w-2xl">
          <Eyebrow>DASTURLAR KATALOGI</Eyebrow>
          <h1 className="mt-3 text-4xl font-extrabold text-ink-950">Universitetlar va grant dasturlari.</h1>
          <p className="mt-4 text-ink-700">Kim qabul qilingan, qanday ariza bergan - har bir dastur sahifasida ko&apos;rasan.</p>
        </Container>
      </section>
      <section className="py-16">
        <Container className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {schools.map((s) => {
            const count = caseStudies.filter((c) => c.schoolId === s.id).length;
            return (
              <Link key={s.id} href={`/dasturlar/${s.slug}`}>
                <Card className="h-full transition-shadow hover:shadow-md">
                  <Badge tone="ink">{kindLabel[s.kind]}</Badge>
                  <p className="mt-3 font-bold text-ink-950">{s.name}</p>
                  <p className="text-sm text-ink-500">{s.country}{s.city ? ` · ${s.city}` : ""}</p>
                  <p className="mt-3 text-xs font-semibold text-ink-500">
                    {count > 0 ? `${count} ta keys` : "Tez orada keyslar"}
                  </p>
                </Card>
              </Link>
            );
          })}
        </Container>
      </section>
    </div>
  );
}
