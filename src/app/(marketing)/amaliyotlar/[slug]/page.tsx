import { notFound } from "next/navigation";
import { Container, Button, Card } from "@/components/ui";
import { SchoolBadge } from "@/components/school-badge";
import { caseStudies, schools, mentors } from "@/lib/seed-data";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export default async function CaseStudyDetailPage(props: PageProps<"/amaliyotlar/[slug]">) {
  const { slug } = await props.params;
  const study = caseStudies.find((c) => c.slug === slug);
  if (!study) notFound();

  const school = schools.find((s) => s.id === study.schoolId);
  const mentor = mentors.find((m) => m.displayName === study.displayName && m.schoolId === study.schoolId);

  return (
    <Container className="max-w-3xl py-16">
      <div className="flex items-center gap-3">
        <SchoolBadge schoolId={study.schoolId} size="md" />
        <span className="font-semibold text-ink-700">{school?.name}</span>
      </div>
      <h1 className="mt-4 text-3xl font-extrabold text-ink-950">{study.title}</h1>
      <p className="mt-2 text-sm text-ink-500">{study.displayName} · {study.acceptanceCount} ta taklif oldi · ★ {study.rating.toFixed(1)}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {study.tags.map((t) => (
          <span key={t} className="rounded-full bg-ink-50 px-2.5 py-1 text-xs text-ink-600">{t}</span>
        ))}
      </div>

      <p className="mt-8 text-lg leading-relaxed text-ink-800">{study.summary}</p>
      <div className="mt-6 rounded-2xl border border-ink-900/8 bg-white p-6 text-sm leading-relaxed text-ink-700">
        {study.body}
      </div>

      {mentor && (
        <Card className="mt-10">
          <p className="text-sm font-semibold text-ink-500">Savollaring bormi?</p>
          <p className="mt-1 text-ink-800">{study.displayName} mentor sifatida ro&apos;yxatda - unga bevosita yozishing mumkin.</p>
          <div className="mt-4">
            <Button href={`/mentorlar/${mentor.id}`}>Mentor profiliga o&apos;tish →</Button>
          </div>
        </Card>
      )}
    </Container>
  );
}
