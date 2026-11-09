import { Container, Eyebrow } from "@/components/ui";
import { SchoolSearchGrid, type SchoolCardData } from "@/components/school-search-grid";
import { schools, caseStudies, mentors } from "@/lib/seed-data";

export const metadata = { title: "Dasturlar" };

export default function SchoolsDirectoryPage() {
  const cards: SchoolCardData[] = schools.map((s) => {
    const relatedCases = caseStudies.filter((c) => c.schoolId === s.id);
    const relatedMentors = mentors.filter((m) => m.schoolId === s.id);
    const peopleNames = Array.from(new Set([...relatedCases.map((c) => c.displayName), ...relatedMentors.map((m) => m.displayName)]));
    return {
      id: s.id,
      slug: s.slug,
      name: s.name,
      country: s.country,
      caseStudyCount: relatedCases.length,
      readCount: relatedCases.reduce((sum, c) => sum + c.readCount, 0),
      people: peopleNames,
    };
  });

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
        <Container>
          <SchoolSearchGrid schools={cards} />
        </Container>
      </section>
    </div>
  );
}
