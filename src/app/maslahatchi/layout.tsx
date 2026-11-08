import { redirect } from "next/navigation";
import Link from "next/link";
import { getSessionUserId } from "@/lib/session";
import { Container, Badge } from "@/components/ui";

export default async function CounselorLayout({ children }: LayoutProps<"/maslahatchi">) {
  const userId = await getSessionUserId();
  if (!userId) redirect("/kirish?return_to=/maslahatchi");

  return (
    <div className="min-h-screen bg-paper">
      <header className="border-b border-ink-900/8 bg-ink-950 text-white">
        <Container className="flex items-center justify-between py-4">
          <Link href="/maslahatchi" className="flex items-center gap-2 font-extrabold">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand-600 text-sm">Q</span>
            Qabul · Maslahatchi paneli
          </Link>
          <div className="flex items-center gap-3">
            <Badge tone="placeholder">Demo rejim</Badge>
            <Link href="/ilova" className="text-sm text-ink-100/80 hover:text-white">O&apos;quvchi ilovasiga qaytish</Link>
          </div>
        </Container>
      </header>
      <Container className="py-8">{children}</Container>
    </div>
  );
}
