import { notFound } from "next/navigation";
import { getSessionUserId } from "@/lib/session";
import { getConversation, getMessages } from "@/lib/db";
import { mentors, schools } from "@/lib/seed-data";
import { Container, Badge } from "@/components/ui";
import { sendFollowUpMessage, simulateMentorReply } from "@/lib/actions/messages";

export default async function ConversationPage(props: PageProps<"/ilova/xabarlar/[id]">) {
  const { id } = await props.params;
  const userId = (await getSessionUserId())!;
  const conversation = await getConversation(id, userId);
  if (!conversation) notFound();

  const mentor = mentors.find((m) => m.id === conversation.mentorId)!;
  const school = schools.find((s) => s.id === mentor.schoolId);
  const messages = await getMessages(conversation.id);

  return (
    <Container className="max-w-2xl py-0">
      <div className="flex items-center gap-3 border-b border-ink-900/8 pb-4">
        <div className="grid h-10 w-10 place-items-center rounded-full bg-brand-100 font-bold text-brand-700">{mentor.displayName[0]}</div>
        <div>
          <p className="font-semibold text-ink-900">{mentor.displayName}</p>
          <p className="text-xs text-ink-500">{school?.name}</p>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {messages.map((m) => (
          <div key={m.id} className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${m.senderKind === "student" ? "ml-auto bg-brand-700 text-white" : "bg-ink-100 text-ink-900"}`}>
            {m.body}
            {m.rubiesCharged > 0 && <p className="mt-1 text-xs opacity-70">−{m.rubiesCharged} 💎</p>}
          </div>
        ))}
      </div>

      {conversation.status === "awaiting_reply" && (
        <form action={simulateMentorReply.bind(null, conversation.id)} className="mt-4">
          <button className="w-full rounded-xl border border-dashed border-ink-900/20 py-2 text-xs text-ink-500 hover:border-brand-400 hover:text-brand-700">
            <Badge tone="placeholder">Namuna</Badge> Javobni simulyatsiya qilish (demo)
          </button>
        </form>
      )}

      <form action={sendFollowUpMessage.bind(null, conversation.id)} className="mt-4 flex gap-2">
        <input name="body" required placeholder="Xabar yozing..." className="flex-1 rounded-full border border-ink-900/15 px-4 py-2.5 text-sm outline-none focus:border-brand-500" />
        <button className="rounded-full bg-brand-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-800">Yuborish</button>
      </form>
      <p className="mt-2 text-center text-xs text-ink-400">Qo&apos;shimcha xabarlar shu suhbatda bepul.</p>
    </Container>
  );
}
