import { notFound } from "next/navigation";
import Link from "next/link";
import { Container, Badge, Card, Eyebrow } from "@/components/ui";
import { MessageMentorForm } from "@/components/message-mentor-form";
import { mentors, schools, archetypes, caseStudies } from "@/lib/seed-data";

export function generateStaticParams() {
  return mentors.map((m) => ({ id: m.id }));
}

export default async function MentorDetailPage(props: PageProps<"/mentorlar/[id]">) {
  const { id } = await props.params;
  const mentor = mentors.find((m) => m.id === id);
  if (!mentor) notFound();

  const school = schools.find((s) => s.id === mentor.schoolId);
  const archetype = archetypes.find((a) => a.slug === mentor.archetypeSlug);
  const relatedCase = caseStudies.find((c) => c.displayName === mentor.displayName);

  return (
    <Container className="max-w-3xl py-16">
      <div className="grid gap-8 md:grid-cols-[1fr_280px]">
        <div>
          <div className="flex items-center gap-2">
            <Badge tone="ink">{school?.name}</Badge>
            <Badge tone="placeholder">Namuna profil</Badge>
          </div>
          <div className="mt-4 flex items-center gap-4">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-brand-100 text-2xl font-bold text-brand-700">
              {mentor.displayName[0]}
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-ink-950">{mentor.displayName}</h1>
              <p className="text-sm text-ink-500">{school?.name} · {mentor.classYear}</p>
            </div>
          </div>
          {archetype && <p className="mt-3 text-sm font-medium text-brand-700">{archetype.name} arketipi</p>}
          <p className="mt-4 text-ink-700">{mentor.bio}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {mentor.tags.map((t) => (
              <span key={t} className="rounded-full bg-ink-50 px-2.5 py-1 text-xs text-ink-600">{t}</span>
            ))}
          </div>

          {relatedCase && (
            <div className="mt-6">
              <Link href={`/amaliyotlar/${relatedCase.slug}`} className="text-sm font-semibold text-brand-700 hover:underline">
                To&apos;liq keysini o&apos;qish (bepul) →
              </Link>
            </div>
          )}
        </div>

        <div>
          <Card>
            <Eyebrow>Xabar yozish</Eyebrow>
            <p className="mt-2 text-xs text-ink-500">Narx: {mentor.priceRubies} 💎 / xabar · javob bermasa qaytariladi</p>
            <div className="mt-4">
              <MessageMentorForm mentorId={mentor.id} priceRubies={mentor.priceRubies} />
            </div>
          </Card>
        </div>
      </div>
    </Container>
  );
}
