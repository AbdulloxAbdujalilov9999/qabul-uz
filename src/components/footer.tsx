import Link from "next/link";
import { Container } from "./ui";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-ink-900/8 bg-white">
      <Container className="grid gap-10 py-12 text-sm text-ink-700 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 text-base font-extrabold text-ink-950">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand-700 text-xs text-white">Q</span>
            Qabul
          </div>
          <p className="mt-3 text-ink-500">
            O&apos;zbek o&apos;quvchilari xorijdagi va grant orqali o&apos;qish imkoniyatlarini topishi uchun.
          </p>
        </div>
        <div>
          <p className="font-semibold text-ink-900">Mahsulot</p>
          <ul className="mt-3 space-y-2">
            <li><Link href="/testlar" className="hover:text-brand-700">Testlar</Link></li>
            <li><Link href="/amaliyotlar" className="hover:text-brand-700">Keyslar</Link></li>
            <li><Link href="/mentorlar" className="hover:text-brand-700">Mentorlar</Link></li>
            <li><Link href="/narxlar" className="hover:text-brand-700">Narxlar</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-ink-900">Kimlar uchun</p>
          <ul className="mt-3 space-y-2">
            <li><Link href="/ota-onalar" className="hover:text-brand-700">Ota-onalar</Link></li>
            <li><Link href="/maktablar" className="hover:text-brand-700">Maktab va litseylar</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-ink-900">Huquqiy</p>
          <ul className="mt-3 space-y-2">
            <li><Link href="/maxfiylik" className="hover:text-brand-700">Maxfiylik siyosati</Link></li>
            <li><Link href="/shartlar" className="hover:text-brand-700">Foydalanish shartlari</Link></li>
          </ul>
        </div>
      </Container>
      <Container className="border-t border-ink-900/8 py-6 text-xs text-ink-500">
        © 2026 Qabul. Barcha huquqlar himoyalangan. Namunaviy loyiha - haqiqiy xizmat emas.
      </Container>
    </footer>
  );
}
