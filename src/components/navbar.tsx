import Link from "next/link";
import { getSessionUserId } from "@/lib/session";
import { getProfile } from "@/lib/db";
import { Container, Button } from "./ui";

const links = [
  { href: "/testlar", label: "Testlar" },
  { href: "/amaliyotlar", label: "Keyslar" },
  { href: "/dasturlar", label: "Dasturlar" },
  { href: "/mentorlar", label: "Mentorlar" },
  { href: "/narxlar", label: "Narxlar" },
];

export async function Navbar() {
  const userId = await getSessionUserId();
  const profile = userId ? await getProfile(userId) : undefined;

  return (
    <header className="sticky top-0 z-40 border-b border-ink-900/8 bg-paper/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-lg font-extrabold text-ink-950">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-700 text-sm text-white">Q</span>
          Qabul
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-ink-700 md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-brand-700">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          {profile ? (
            <>
              <span className="hidden text-sm text-ink-500 sm:inline">Salom, {profile.fullName.split(" ")[0]}</span>
              <Button href="/ilova" size="sm">
                Boshqaruv panelim
              </Button>
              <Link href="/chiqish" className="text-sm text-ink-500 hover:text-ink-900">
                Chiqish
              </Link>
            </>
          ) : (
            <>
              <Link href="/kirish" className="text-sm font-medium text-ink-700 hover:text-brand-700">
                Kirish
              </Link>
              <Button href="/royxatdan-otish" size="sm">
                Bepul boshlash
              </Button>
            </>
          )}
        </div>
      </Container>
    </header>
  );
}
