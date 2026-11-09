import Link from "next/link";
import { PartyPopper, Check, GraduationCap, CircleDollarSign, PenLine } from "lucide-react";
import { getSessionUserId } from "@/lib/session";
import { getLessonProgress, getStreak, getSubscription, getProfile } from "@/lib/db";
import { lessons } from "@/lib/seed-data";
import { Card, Badge, Button } from "@/components/ui";
import { FocusModeToggle } from "@/components/focus-mode-toggle";

export default async function TodayPage() {
  const userId = (await getSessionUserId())!;
  const [profile, progress, streak, subscription] = await Promise.all([
    getProfile(userId),
    getLessonProgress(userId),
    getStreak(userId),
    getSubscription(userId),
  ]);
  const completedIds = new Set(progress.filter((p) => p.status === "completed").map((p) => p.lessonId));

  const sorted = [...lessons].sort((a, b) => a.order - b.order);
  const nextLesson = sorted.find((l) => !completedIds.has(l.id));
  const completedCount = completedIds.size;
  const zones = Array.from(new Set(sorted.map((l) => l.zone)));

  return (
    <div className="mx-auto max-w-4xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-ink-950">Salom, {profile?.fullName.split(" ")[0]}!</h1>
          <p className="mt-1 text-sm text-ink-600">{completedCount} / {lessons.length} dars tugallangan</p>
        </div>
        <FocusModeToggle enabled={streak.focusModeEnabled} />
      </div>

      {nextLesson ? (
        <Card className="mt-6 border-2 border-brand-600 bg-brand-50/40">
          <Badge tone={nextLesson.isFree ? "brand" : "accent"}>{nextLesson.isFree ? "Bepul dars" : "To'liq reja"}</Badge>
          <p className="mt-3 text-xl font-bold text-ink-950">{nextLesson.title}</p>
          <p className="mt-1 text-sm text-ink-600">{nextLesson.summary}</p>
          {!nextLesson.isFree && subscription.plan === "free" ? (
            <div className="mt-4">
              <Button href="/narxlar">To&apos;liq rejaga o&apos;tish →</Button>
            </div>
          ) : (
            <div className="mt-4">
              <Button href={`/ilova/darslar/${nextLesson.slug}`}>Darsni boshlash →</Button>
            </div>
          )}
        </Card>
      ) : (
        <Card className="mt-6 border-2 border-brand-600 bg-brand-50/40">
          <p className="flex items-center gap-2 font-bold text-ink-950"><PartyPopper className="h-5 w-5 text-accent-500" /> Barcha darslarni tugatding!</p>
          <p className="mt-1 text-sm text-ink-600">Insholaringni va dasturlar ro&apos;yxatini yangilab turishni unutma.</p>
        </Card>
      )}

      <div className="mt-10">
        <p className="text-sm font-semibold uppercase tracking-wide text-ink-500">Xarita</p>
        <div className="mt-4 space-y-6">
          {zones.map((zone) => (
            <div key={zone}>
              <p className="mb-2 text-xs font-bold uppercase text-brand-700">{zone}-hudud</p>
              <div className="flex flex-wrap gap-3">
                {sorted.filter((l) => l.zone === zone).map((l) => {
                  const done = completedIds.has(l.id);
                  const isNext = l.id === nextLesson?.id;
                  return (
                    <Link
                      key={l.id}
                      href={`/ilova/darslar/${l.slug}`}
                      title={l.title}
                      className={`grid h-12 w-12 place-items-center rounded-full text-sm font-bold transition-transform hover:scale-105 ${
                        done
                          ? "bg-brand-600 text-white"
                          : isNext
                          ? "bg-accent-400 text-ink-950 ring-4 ring-accent-200"
                          : "bg-ink-100 text-ink-400"
                      }`}
                    >
                      {done ? <Check className="h-5 w-5" /> : l.order}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <Link href="/ilova/royxatim"><Card className="hover:shadow-md"><p className="flex items-center gap-2 font-semibold text-ink-900"><GraduationCap className="h-4 w-4 text-brand-600" /> Dasturlarim</p><p className="mt-1 text-sm text-ink-600">Ro&apos;yxat va muddatlar</p></Card></Link>
        <Link href="/ilova/grantlar"><Card className="hover:shadow-md"><p className="flex items-center gap-2 font-semibold text-ink-900"><CircleDollarSign className="h-4 w-4 text-brand-600" /> Grantlarim</p><p className="mt-1 text-sm text-ink-600">Senga mos stipendiyalar</p></Card></Link>
        <Link href="/ilova/insholarim"><Card className="hover:shadow-md"><p className="flex items-center gap-2 font-semibold text-ink-900"><PenLine className="h-4 w-4 text-brand-600" /> Insholarim</p><p className="mt-1 text-sm text-ink-600">Qoralama va fikr-mulohaza</p></Card></Link>
      </div>
    </div>
  );
}
