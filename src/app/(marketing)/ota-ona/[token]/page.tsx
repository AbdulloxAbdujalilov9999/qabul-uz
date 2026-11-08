import { notFound } from "next/navigation";
import { getParentLinkByToken, getProfile } from "@/lib/db";
import { Container, Card, Badge } from "@/components/ui";
import { simulateParentPayment } from "@/lib/actions/billing";

export default async function ParentPayPage(props: PageProps<"/ota-ona/[token]">) {
  const { token } = await props.params;
  const link = await getParentLinkByToken(token);
  if (!link) notFound();

  const student = await getProfile(link.studentId);

  return (
    <Container className="max-w-md py-16 text-center">
      <Badge tone="brand">OTA-ONA UCHUN TO&apos;LOV</Badge>
      <h1 className="mt-4 text-2xl font-extrabold text-ink-950">
        {student?.fullName ?? "Farzandingiz"} Qabulda o&apos;qimoqda.
      </h1>
      <p className="mt-3 text-ink-700">
        Ular ariza jarayonini Qabul orqali olib bormoqda - kunlik reja, insho tahlili, grant mosligi va mentorlar.
        To&apos;liq reja uchun yillik to&apos;lovni shu yerdan amalga oshirishingiz mumkin.
      </p>

      <Card className="mt-8">
        {link.status === "paid" ? (
          <p className="font-semibold text-brand-700">✓ To&apos;lov qabul qilindi. Hisob faollashtirildi.</p>
        ) : (
          <>
            <p className="text-3xl font-extrabold text-ink-950">1,500,000 so&apos;m</p>
            <p className="text-sm text-ink-500">12 oylik reja, bir martalik to&apos;lov</p>
            <form action={simulateParentPayment.bind(null, token)} className="mt-6">
              <button className="w-full rounded-full bg-brand-700 px-6 py-3 font-medium text-white hover:bg-brand-800">
                To&apos;lash (demo)
              </button>
            </form>
            <p className="mt-3 text-xs text-ink-400">
              Namunaviy loyihada haqiqiy to&apos;lov tizimi (Click/Payme) ulanmagan - bu tugma faqat oqimni ko&apos;rsatadi.
            </p>
          </>
        )}
      </Card>
    </Container>
  );
}
