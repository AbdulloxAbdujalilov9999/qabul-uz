import Link from "next/link";
import { getSessionUserId } from "@/lib/session";
import { getProfile } from "@/lib/db";
import { logOutAction } from "@/lib/actions/auth";
import { Container, Button } from "./ui";
import { Logo } from "./logo";

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
        <Link href="/">
          <Logo />
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
              <form action={logOutAction}>
                <button type="submit" className="text-sm text-ink-500 hover:text-ink-900">
                  Chiqish
                </button>
              </form>
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
