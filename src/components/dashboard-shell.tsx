import Link from "next/link";
import { Map, GraduationCap, PenLine, Star, NotebookText, CircleDollarSign, MessageCircle, Gem, Settings, Flame } from "lucide-react";
import { getRubyBalance, getStreak } from "@/lib/db";
import { logOutAction } from "@/lib/actions/auth";
import type { Profile } from "@/lib/types";

const navItems = [
  { href: "/ilova", label: "Bugungi reja", icon: Map },
  { href: "/ilova/royxatim", label: "Dasturlarim", icon: GraduationCap },
  { href: "/ilova/insholarim", label: "Insholarim", icon: PenLine },
  { href: "/ilova/faoliyatlarim", label: "Faoliyatlarim", icon: Star },
  { href: "/ilova/kundalik", label: "Kundalik", icon: NotebookText },
  { href: "/ilova/grantlar", label: "Grantlarim", icon: CircleDollarSign },
  { href: "/ilova/xabarlar", label: "Xabarlar", icon: MessageCircle },
  { href: "/ilova/hamyon", label: "Hamyon", icon: Gem },
  { href: "/ilova/sozlamalar", label: "Sozlamalar", icon: Settings },
];

export async function DashboardShell({ profile, children }: { profile: Profile; children: React.ReactNode }) {
  const [streak, rubies] = await Promise.all([getStreak(profile.id), getRubyBalance(profile.id)]);

  return (
    <div className="flex min-h-screen bg-paper">
      <aside className="hidden w-64 shrink-0 border-r border-ink-900/8 bg-white p-5 lg:flex lg:flex-col">
        <Link href="/" className="flex items-center gap-2 text-lg font-extrabold text-ink-950">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-700 text-sm text-white">Q</span>
          Qabul
        </Link>
        <nav className="mt-8 flex-1 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-ink-700 hover:bg-brand-50 hover:text-brand-800"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="space-y-2 border-t border-ink-900/8 pt-4 text-xs text-ink-500">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5"><Flame className="h-3.5 w-3.5 text-accent-500" /> Streak</span>
            <span className="font-semibold text-ink-900">{streak.current} kun</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5"><Gem className="h-3.5 w-3.5 text-brand-600" /> Rubin</span>
            <span className="font-semibold text-ink-900">{rubies}</span>
          </div>
          <form action={logOutAction} className="mt-2">
            <button type="submit" className="block w-full text-left text-ink-500 hover:text-ink-900">Chiqish</button>
          </form>
        </div>
      </aside>

      <div className="flex-1">
        <header className="flex items-center justify-between border-b border-ink-900/8 bg-white px-5 py-3 lg:hidden">
          <Link href="/" className="font-extrabold text-ink-950">Qabul</Link>
          <div className="flex items-center gap-3 text-xs text-ink-600">
            <span className="flex items-center gap-1"><Flame className="h-3.5 w-3.5 text-accent-500" /> {streak.current}</span>
            <span className="flex items-center gap-1"><Gem className="h-3.5 w-3.5 text-brand-600" /> {rubies}</span>
          </div>
        </header>
        <nav className="flex gap-1 overflow-x-auto border-b border-ink-900/8 bg-white px-3 py-2 text-xs lg:hidden">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="flex shrink-0 items-center gap-1 rounded-full px-3 py-1.5 font-medium text-ink-600 hover:bg-brand-50">
              <item.icon className="h-3.5 w-3.5" /> {item.label}
            </Link>
          ))}
        </nav>
        <main className="p-5 lg:p-10">{children}</main>
      </div>
    </div>
  );
}
