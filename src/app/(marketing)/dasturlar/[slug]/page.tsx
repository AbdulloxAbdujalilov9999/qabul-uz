import { notFound } from "next/navigation";
import Link from "next/link";
import { Container, Badge, Card, Eyebrow } from "@/components/ui";
import { schools, caseStudies, mentors } from "@/lib/seed-data";

export function generateStaticParams() {
  return schools.map((s) => ({ slug: s.slug }));
}

const roundLabel = { early: "Erta qabul", priority: "Birinchi navbat", regular: "Umumiy", rolling: "Davomiy" } as const;

export default async function SchoolDetailPage(props: PageProps<"/dasturlar/[slug]">) {
  const { slug } = await props.params;
  const school = schools.find((s) => s.slug === slug);
  if (!school) notFound();

  const relatedCases = caseStudies.filter((c) => c.schoolId === school.id);
  const relatedMentors = mentors.filter((m) => m.schoolId === school.id);

  return (
    <Container className="max-w-3xl py-16">
      <Badge tone="ink">{school.country}</Badge>
      <h1 className="mt-3 text-3xl font-extrabold text-ink-950">{school.name}</h1>
      <p className="mt-2 text-ink-700">{school.description}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {school.tags.map((t) => (
          <span key={t} className="rounded-full bg-ink-50 px-2.5 py-1 text-xs text-ink-600">{t}</span>
        ))}
      </div>

      <section className="mt-10">
        <Eyebrow>MUDDATLAR</Eyebrow>
        <div className="mt-4 space-y-2">
          {school.deadlines.map((d) => (
            <div key={d.label} className="flex items-center justify-between rounded-xl border border-ink-900/8 bg-white px-4 py-3 text-sm">
              <span className="font-medium text-ink-900">{roundLabel[d.round]} · {d.label}</span>
              <span className="text-ink-600">{new Date(d.date).toLocaleDateString("uz-UZ")}</span>
            </div>
          ))}
          <p className="text-xs text-ink-500">Sanalar taxminiy - albatta rasmiy manbada tekshiring.</p>
        </div>
      </section>

      {relatedCases.length > 0 && (
        <section className="mt-10">
          <Eyebrow>BU DASTURDAGI KEYSLAR</Eyebrow>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {relatedCases.map((c) => (
              <Link key={c.id} href={`/amaliyotlar/${c.slug}`}>
                <Card className="h-full hover:shadow-md">
                  <p className="font-semibold text-ink-900">{c.title}</p>
                  <p className="mt-1 text-sm text-ink-600">{c.summary}</p>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}

      {relatedMentors.length > 0 && (
        <section className="mt-10">
          <Eyebrow>BU DASTURDAN MENTORLAR</Eyebrow>
          <div className="mt-4 flex flex-wrap gap-3">
            {relatedMentors.map((m) => (
              <Link key={m.id} href={`/mentorlar/${m.id}`} className="rounded-full border border-ink-900/10 bg-white px-4 py-2 text-sm font-medium text-ink-900 hover:border-brand-500">
                {m.displayName}
              </Link>
            ))}
          </div>
        </section>
      )}
    </Container>
  );
}
