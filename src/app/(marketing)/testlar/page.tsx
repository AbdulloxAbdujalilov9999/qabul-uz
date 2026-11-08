import { Container, Button, Card, Eyebrow } from "@/components/ui";
import { quizzes } from "@/lib/seed-data";

const meta: Record<string, { href: string; cta: string }> = {
  arketip: { href: "/testlar/arketip", cta: "Arketipimni toping" },
  moslik: { href: "/testlar/moslik", cta: "Mosligimni toping" },
  grant: { href: "/testlar/grant", cta: "Grantimni toping" },
};

export default function QuizHubPage() {
  return (
    <div>
      <section className="bg-gradient-to-b from-brand-50 to-paper py-16">
        <Container className="max-w-2xl">
          <Eyebrow>BEPUL TESTLAR</Eyebrow>
          <h1 className="mt-3 text-4xl font-extrabold text-ink-950">O&apos;zingni ariza beruvchi sifatida tani.</h1>
          <p className="mt-4 text-ink-700">
            Qayerdan boshlashni bilmaysanmi? Yolg&apos;iz emassan. Shu testlar sening kuchli tomoningni, senga mos
            dasturlarni va qaysi grantlarga mos kelishingni ko&apos;rsatadi - insho yozishdan oldin.
          </p>
        </Container>
      </section>

      <section className="py-16">
        <Container className="grid gap-6 md:grid-cols-3">
          {quizzes.map((q) => (
            <Card key={q.slug}>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">{q.questions.length} ta savol</p>
              <p className="mt-3 text-lg font-bold text-ink-950">{q.title}</p>
              <p className="mt-2 text-sm text-ink-600">{q.description}</p>
              <div className="mt-6">
                <Button href={meta[q.slug].href} className="w-full">{meta[q.slug].cta}</Button>
              </div>
            </Card>
          ))}
        </Container>
      </section>
    </div>
  );
}
