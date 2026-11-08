import Link from "next/link";
import { getSessionUserId } from "@/lib/session";
import { getConversations, getMessages } from "@/lib/db";
import { mentors, schools } from "@/lib/seed-data";
import { Card, Badge, Button } from "@/components/ui";

export default async function MessagesListPage() {
  const userId = (await getSessionUserId())!;
  const conversations = await getConversations(userId);
  const lastMessages = await Promise.all(conversations.map((c) => getMessages(c.id)));

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-extrabold text-ink-950">Xabarlar</h1>

      {conversations.length === 0 ? (
        <Card className="mt-6">
          <p className="text-sm text-ink-600">Hali mentor bilan suhbating yo&apos;q.</p>
          <div className="mt-4"><Button href="/mentorlar">Mentorlarni ko&apos;rish</Button></div>
        </Card>
      ) : (
        <div className="mt-6 space-y-3">
          {conversations.map((c, i) => {
            const mentor = mentors.find((m) => m.id === c.mentorId)!;
            const school = schools.find((s) => s.id === mentor.schoolId);
            const lastMsg = lastMessages[i].at(-1);
            return (
              <Link key={c.id} href={`/ilova/xabarlar/${c.id}`}>
                <Card className="flex items-center justify-between hover:shadow-md">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-full bg-brand-100 font-bold text-brand-700">{mentor.displayName[0]}</div>
                    <div>
                      <p className="font-semibold text-ink-900">{mentor.displayName}</p>
                      <p className="text-xs text-ink-500">{school?.name}</p>
                      {lastMsg && <p className="mt-0.5 max-w-xs truncate text-xs text-ink-400">{lastMsg.body}</p>}
                    </div>
                  </div>
                  <Badge tone={c.status === "awaiting_reply" ? "accent" : "brand"}>
                    {c.status === "awaiting_reply" ? "Javob kutilmoqda" : "Faol"}
                  </Badge>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
