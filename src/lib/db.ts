// Data access layer backed by Supabase/Postgres (see db/schema.sql). Catalog
// content (schools, scholarships, mentors, lessons, quizzes, archetypes,
// case studies) stays static in seed-data.ts; everything here is
// user-generated/mutable data. Every function opens its own request-scoped
// client via createClient() (cheap -- cookies() is cached per request) so
// call sites stay a plain `await getX(...)`.

import { createClient } from "@/lib/supabase/server";
import type {
  CollegeListEntry,
  Conversation,
  Essay,
  EssayFeedback,
  Extracurricular,
  JournalEntry,
  ListBucket,
  Message,
  ParentPaymentLink,
  Profile,
  QuizSlug,
  Role,
  SafetyNestContact,
  Streak,
  Subscription,
} from "./types";

export function nowIso() {
  return new Date().toISOString();
}

// ---- Profiles ----

function toProfile(row: Record<string, unknown>): Profile {
  return {
    id: row.id as string,
    fullName: (row.full_name as string) ?? "",
    username: (row.username as string) ?? "",
    role: row.role as Role,
    gradeLevel: (row.grade_level as number) ?? undefined,
    gradYear: (row.grad_year as number) ?? undefined,
    highSchool: (row.high_school as string) ?? undefined,
    archetypeId: (row.archetype_id as string) ?? undefined,
    onboarded: Boolean(row.onboarded),
    institutionId: undefined,
  };
}

export async function getProfile(userId: string): Promise<Profile | undefined> {
  const supabase = await createClient();
  const { data } = await supabase.from("profiles").select("*").eq("id", userId).maybeSingle();
  return data ? toProfile(data) : undefined;
}

export async function updateProfile(userId: string, patch: Partial<Profile>) {
  const supabase = await createClient();
  await supabase
    .from("profiles")
    .update({
      ...(patch.archetypeId !== undefined && { archetype_id: patch.archetypeId }),
      ...(patch.onboarded !== undefined && { onboarded: patch.onboarded }),
      updated_at: nowIso(),
    })
    .eq("id", userId);
}

// ---- Streak ----

function toStreak(row: Record<string, unknown>): Streak {
  return {
    userId: row.user_id as string,
    current: (row.current_streak as number) ?? 0,
    longest: (row.longest_streak as number) ?? 0,
    lastActiveOn: (row.last_active_on as string) ?? undefined,
    focusModeEnabled: row.focus_mode_enabled !== false,
  };
}

export async function getStreak(userId: string): Promise<Streak> {
  const supabase = await createClient();
  const { data } = await supabase.from("streaks").select("*").eq("user_id", userId).maybeSingle();
  if (data) return toStreak(data);
  await supabase.from("streaks").insert({ user_id: userId }).select().maybeSingle();
  return { userId, current: 0, longest: 0, focusModeEnabled: true };
}

export async function touchStreak(userId: string) {
  const supabase = await createClient();
  const streak = await getStreak(userId);
  const today = new Date().toISOString().slice(0, 10);
  if (streak.lastActiveOn === today) return streak;
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  const current = streak.lastActiveOn === yesterday ? streak.current + 1 : 1;
  const longest = Math.max(streak.longest, current);
  await supabase
    .from("streaks")
    .update({ current_streak: current, longest_streak: longest, last_active_on: today })
    .eq("user_id", userId);
  return { ...streak, current, longest, lastActiveOn: today };
}

export async function setFocusMode(userId: string, enabled: boolean) {
  const supabase = await createClient();
  await supabase.from("streaks").update({ focus_mode_enabled: enabled }).eq("user_id", userId);
}

export function daysBehind(streak: Streak): number {
  if (!streak.lastActiveOn) return 99;
  const last = new Date(streak.lastActiveOn + "T00:00:00").getTime();
  const today = new Date(new Date().toISOString().slice(0, 10) + "T00:00:00").getTime();
  return Math.max(0, Math.round((today - last) / 86400000));
}

// ---- Lesson progress ----

export async function getLessonProgress(userId: string): Promise<{ lessonId: string; status: string }[]> {
  const supabase = await createClient();
  const { data } = await supabase.from("lesson_progress").select("lesson_id, status").eq("user_id", userId);
  return (data ?? []).map((r) => ({ lessonId: r.lesson_id as string, status: r.status as string }));
}

export async function completeLesson(userId: string, lessonId: string) {
  const supabase = await createClient();
  await supabase
    .from("lesson_progress")
    .upsert({ user_id: userId, lesson_id: lessonId, status: "completed", completed_at: nowIso() }, { onConflict: "user_id,lesson_id" });
  await touchStreak(userId);
}

export async function getLessonResponse(userId: string, lessonId: string): Promise<string> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("lesson_responses")
    .select("content")
    .eq("user_id", userId)
    .eq("lesson_id", lessonId)
    .maybeSingle();
  return (data?.content as string) ?? "";
}

export async function saveLessonResponseDb(userId: string, lessonId: string, content: string) {
  const supabase = await createClient();
  await supabase
    .from("lesson_responses")
    .upsert({ user_id: userId, lesson_id: lessonId, content, updated_at: nowIso() }, { onConflict: "user_id,lesson_id" });
}

// ---- College list ----

function toCollegeListEntry(row: Record<string, unknown>): CollegeListEntry {
  return {
    id: row.id as string,
    userId: row.user_id as string,
    schoolId: row.school_id as string,
    bucket: row.bucket as ListBucket,
    status: row.status as CollegeListEntry["status"],
    createdAt: row.created_at as string,
  };
}

export async function getCollegeList(userId: string): Promise<CollegeListEntry[]> {
  const supabase = await createClient();
  const { data } = await supabase.from("college_list_entries").select("*").eq("user_id", userId);
  return (data ?? []).map(toCollegeListEntry);
}

export async function addToCollegeListDb(userId: string, schoolId: string, bucket: ListBucket) {
  const supabase = await createClient();
  await supabase.from("college_list_entries").insert({ user_id: userId, school_id: schoolId, bucket }).select();
}

export async function removeFromCollegeListDb(userId: string, entryId: string) {
  const supabase = await createClient();
  await supabase.from("college_list_entries").delete().eq("id", entryId).eq("user_id", userId);
}

// ---- Essays ----

function toEssay(row: Record<string, unknown>): Essay {
  return {
    id: row.id as string,
    userId: row.user_id as string,
    schoolId: (row.school_id as string) ?? undefined,
    title: (row.title as string) ?? "",
    prompt: (row.prompt as string) ?? "",
    content: (row.content as string) ?? "",
    status: row.status as Essay["status"],
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  };
}

function toEssayFeedback(row: Record<string, unknown>): EssayFeedback {
  return {
    id: row.id as string,
    essayId: row.essay_id as string,
    score: Number(row.score),
    grammarNotes: (row.grammar_notes as string[]) ?? [],
    narrativeNotes: (row.narrative_notes as string[]) ?? [],
    lineComments: (row.line_comments as { excerpt: string; comment: string }[]) ?? [],
    createdAt: row.created_at as string,
  };
}

export async function getEssays(userId: string): Promise<Essay[]> {
  const supabase = await createClient();
  const { data } = await supabase.from("essays").select("*").eq("user_id", userId).order("updated_at", { ascending: false });
  return (data ?? []).map(toEssay);
}

export async function getEssay(essayId: string, userId: string): Promise<Essay | undefined> {
  const supabase = await createClient();
  const { data } = await supabase.from("essays").select("*").eq("id", essayId).eq("user_id", userId).maybeSingle();
  return data ? toEssay(data) : undefined;
}

export async function createEssayDb(userId: string): Promise<Essay> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("essays")
    .insert({ user_id: userId, title: "Nomsiz insho", content: "" })
    .select()
    .single();
  return toEssay(data);
}

export async function saveEssayContentDb(essayId: string, userId: string, title: string, content: string) {
  const supabase = await createClient();
  await supabase
    .from("essays")
    .update({ title: title || "Nomsiz insho", content, updated_at: nowIso() })
    .eq("id", essayId)
    .eq("user_id", userId);
}

export async function getLatestFeedback(essayId: string): Promise<EssayFeedback | undefined> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("essay_feedback")
    .select("*")
    .eq("essay_id", essayId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  return data ? toEssayFeedback(data) : undefined;
}

export async function getAllFeedbackForEssays(essayIds: string[]): Promise<Map<string, EssayFeedback>> {
  if (essayIds.length === 0) return new Map();
  const supabase = await createClient();
  const { data } = await supabase
    .from("essay_feedback")
    .select("*")
    .in("essay_id", essayIds)
    .order("created_at", { ascending: true });
  const map = new Map<string, EssayFeedback>();
  for (const row of data ?? []) map.set(row.essay_id as string, toEssayFeedback(row));
  return map;
}

export async function saveEssayFeedbackDb(essayId: string, result: { score: number; grammarNotes: string[]; narrativeNotes: string[]; lineComments: { excerpt: string; comment: string }[] }) {
  const supabase = await createClient();
  await supabase.from("essay_feedback").insert({
    essay_id: essayId,
    score: result.score,
    grammar_notes: result.grammarNotes,
    narrative_notes: result.narrativeNotes,
    line_comments: result.lineComments,
  });
  await supabase.from("essays").update({ status: "reviewed" }).eq("id", essayId);
}

// ---- Extracurriculars ----

export async function getExtracurriculars(userId: string): Promise<Extracurricular[]> {
  const supabase = await createClient();
  const { data } = await supabase.from("extracurriculars").select("*").eq("user_id", userId).order("order_index");
  return (data ?? []).map((r) => ({
    id: r.id, userId: r.user_id, title: r.title, role: r.role ?? "", description: r.description ?? "",
    aiRating: r.ai_rating ? Number(r.ai_rating) : undefined, aiFeedback: r.ai_feedback ?? undefined, order: r.order_index,
  }));
}

export async function addExtracurricularDb(userId: string, title: string, role: string, description: string, rating: number, feedback: string) {
  const supabase = await createClient();
  const { count } = await supabase.from("extracurriculars").select("id", { count: "exact", head: true }).eq("user_id", userId);
  await supabase.from("extracurriculars").insert({
    user_id: userId, title, role, description, ai_rating: rating, ai_feedback: feedback, order_index: count ?? 0,
  });
}

export async function removeExtracurricularDb(userId: string, id: string) {
  const supabase = await createClient();
  await supabase.from("extracurriculars").delete().eq("id", id).eq("user_id", userId);
}

// ---- Journal ----

export async function getJournalEntries(userId: string): Promise<JournalEntry[]> {
  const supabase = await createClient();
  const { data } = await supabase.from("journal_entries").select("*").eq("user_id", userId).order("created_at", { ascending: false });
  return (data ?? []).map((r) => ({ id: r.id, userId: r.user_id, promptId: r.prompt_id ?? undefined, content: r.content, createdAt: r.created_at }));
}

export async function addJournalEntryDb(userId: string, promptId: string, content: string) {
  const supabase = await createClient();
  await supabase.from("journal_entries").insert({ user_id: userId, prompt_id: promptId, content });
}

// ---- Quiz responses ----

export async function getLatestQuizResponse(userId: string, quizSlug: QuizSlug) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("quiz_responses")
    .select("*")
    .eq("user_id", userId)
    .eq("quiz_id", quizSlug)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  return data ? { answers: data.answers, result: data.result, createdAt: data.created_at as string } : undefined;
}

export async function saveQuizResponseDb(userId: string, quizSlug: QuizSlug, answers: Record<string, unknown>, result: unknown) {
  const supabase = await createClient();
  await supabase.from("quiz_responses").insert({ user_id: userId, quiz_id: quizSlug, answers, result });
}

// ---- Scholarship matches (cache of the last grant-quiz result; grantlar page reads quiz_responses directly) ----

// ---- Rubies ----

export async function getRubyBalance(userId: string): Promise<number> {
  const supabase = await createClient();
  const { data } = await supabase.from("ruby_wallets").select("balance").eq("user_id", userId).maybeSingle();
  if (data) return data.balance as number;
  await supabase.from("ruby_wallets").insert({ user_id: userId, balance: 0 });
  return 0;
}

export async function grantRubies(userId: string, amount: number, type: "purchase" | "grant" | "refund" = "grant") {
  const supabase = await createClient();
  const balance = await getRubyBalance(userId);
  const next = balance + amount;
  await supabase.from("ruby_wallets").update({ balance: next }).eq("user_id", userId);
  await supabase.from("ruby_transactions").insert({ user_id: userId, amount, type });
  return next;
}

export async function spendRubies(userId: string, amount: number) {
  const supabase = await createClient();
  const balance = await getRubyBalance(userId);
  if (balance < amount) throw new Error("Hamyonda yetarli rubin yo'q");
  const next = balance - amount;
  await supabase.from("ruby_wallets").update({ balance: next }).eq("user_id", userId);
  await supabase.from("ruby_transactions").insert({ user_id: userId, amount: -amount, type: "spend" });
  return next;
}

// ---- Conversations / messages ----

function toConversation(row: Record<string, unknown>): Conversation {
  return {
    id: row.id as string, studentId: row.student_id as string, mentorId: row.mentor_id as string,
    status: row.status as Conversation["status"], createdAt: row.created_at as string,
  };
}

export async function getConversations(userId: string): Promise<Conversation[]> {
  const supabase = await createClient();
  const { data } = await supabase.from("conversations").select("*").eq("student_id", userId).order("created_at", { ascending: false });
  return (data ?? []).map(toConversation);
}

export async function getConversation(conversationId: string, userId: string): Promise<Conversation | undefined> {
  const supabase = await createClient();
  const { data } = await supabase.from("conversations").select("*").eq("id", conversationId).eq("student_id", userId).maybeSingle();
  return data ? toConversation(data) : undefined;
}

export async function findOrCreateConversation(userId: string, mentorId: string): Promise<Conversation> {
  const supabase = await createClient();
  const { data: existing } = await supabase.from("conversations").select("*").eq("student_id", userId).eq("mentor_id", mentorId).maybeSingle();
  if (existing) return toConversation(existing);
  const { data } = await supabase.from("conversations").insert({ student_id: userId, mentor_id: mentorId }).select().single();
  return toConversation(data);
}

export async function setConversationStatus(conversationId: string, status: Conversation["status"]) {
  const supabase = await createClient();
  await supabase.from("conversations").update({ status }).eq("id", conversationId);
}

export async function getMessages(conversationId: string): Promise<Message[]> {
  const supabase = await createClient();
  const { data } = await supabase.from("messages").select("*").eq("conversation_id", conversationId).order("created_at");
  return (data ?? []).map((r) => ({
    id: r.id, conversationId: r.conversation_id, senderId: r.sender_id,
    senderKind: (r.sender_kind as "student" | "mentor") ?? "student",
    body: r.body, rubiesCharged: r.rubies_charged, createdAt: r.created_at,
  }));
}

export async function addMessage(conversationId: string, senderId: string, body: string, rubiesCharged: number, senderKind: "student" | "mentor" = "student") {
  const supabase = await createClient();
  await supabase.from("messages").insert({ conversation_id: conversationId, sender_id: senderId, body, rubies_charged: rubiesCharged, sender_kind: senderKind });
}

// ---- Safety Nest ----

export async function getSafetyNestContacts(userId: string): Promise<SafetyNestContact[]> {
  const supabase = await createClient();
  const { data } = await supabase.from("safety_nest_contacts").select("*").eq("user_id", userId);
  return (data ?? []).map((r) => ({ id: r.id, userId: r.user_id, name: r.contact_name, phone: r.phone, relationship: r.relationship ?? "", optedIn: r.opted_in }));
}

export async function addSafetyNestContactDb(userId: string, name: string, phone: string, relationship: string) {
  const supabase = await createClient();
  await supabase.from("safety_nest_contacts").insert({ user_id: userId, contact_name: name, phone, relationship, opted_in: true });
}

// ---- Subscriptions ----

function toSubscription(row: Record<string, unknown> | null, userId: string): Subscription {
  if (!row) return { userId, plan: "free", status: "none" };
  return {
    userId, plan: row.plan as Subscription["plan"], status: row.status as Subscription["status"],
    currentPeriodEnd: (row.current_period_end as string) ?? undefined, provider: (row.payment_provider as Subscription["provider"]) ?? undefined,
  };
}

export async function getSubscription(userId: string): Promise<Subscription> {
  const supabase = await createClient();
  const { data } = await supabase.from("subscriptions").select("*").eq("user_id", userId).maybeSingle();
  return toSubscription(data, userId);
}

export async function activateSubscription(userId: string, plan: "monthly" | "annual") {
  const supabase = await createClient();
  const periodDays = plan === "annual" ? 365 : 30;
  const current_period_end = new Date(Date.now() + periodDays * 86400000).toISOString();
  await supabase
    .from("subscriptions")
    .upsert({ user_id: userId, plan, status: "active", current_period_end, payment_provider: "manual_demo" }, { onConflict: "user_id" });
}

// ---- Parent payment links ----

function toParentLink(row: Record<string, unknown>): ParentPaymentLink {
  return {
    id: row.id as string, studentId: row.student_id as string, token: row.token as string,
    status: row.status as ParentPaymentLink["status"], createdAt: row.created_at as string, paidAt: (row.paid_at as string) ?? undefined,
  };
}

export async function getParentLink(userId: string): Promise<ParentPaymentLink | undefined> {
  const supabase = await createClient();
  const { data } = await supabase.from("parent_payment_links").select("*").eq("student_id", userId).order("created_at", { ascending: false }).limit(1).maybeSingle();
  return data ? toParentLink(data) : undefined;
}

export async function getParentLinkByToken(token: string): Promise<ParentPaymentLink | undefined> {
  const supabase = await createClient();
  const { data } = await supabase.from("parent_payment_links").select("*").eq("token", token).maybeSingle();
  return data ? toParentLink(data) : undefined;
}

export async function createParentLink(userId: string) {
  const supabase = await createClient();
  await supabase.from("parent_payment_links").insert({ student_id: userId });
}

export async function markParentLinkPaid(token: string) {
  const supabase = await createClient();
  const { data } = await supabase.from("parent_payment_links").update({ status: "paid", paid_at: nowIso() }).eq("token", token).eq("status", "pending").select().maybeSingle();
  if (data) await activateSubscription(data.student_id as string, "annual");
}

// ---- Counselor roster (demo: any authenticated user can view, see RLS notes) ----

export async function getInstitutionRoster(institutionId: string) {
  const supabase = await createClient();
  const { data: links } = await supabase.from("institution_students").select("student_id").eq("institution_id", institutionId);
  const studentIds = (links ?? []).map((l) => l.student_id as string);
  if (studentIds.length === 0) return [];

  const [{ data: profiles }, { data: streaks }, { data: progress }, { data: essays }] = await Promise.all([
    supabase.from("profiles").select("*").in("id", studentIds),
    supabase.from("streaks").select("*").in("user_id", studentIds),
    supabase.from("lesson_progress").select("user_id, status").in("user_id", studentIds).eq("status", "completed"),
    supabase.from("essays").select("*").in("user_id", studentIds),
  ]);

  const essayIds = (essays ?? []).map((e) => e.id as string);
  const feedbackMap = await getAllFeedbackForEssays(essayIds);

  return (profiles ?? []).map((p) => {
    const streakRow = (streaks ?? []).find((s) => s.user_id === p.id);
    const streak = streakRow ? toStreak(streakRow) : { userId: p.id, current: 0, longest: 0, focusModeEnabled: true };
    const lessonsDone = (progress ?? []).filter((pr) => pr.user_id === p.id).length;
    const studentEssays = (essays ?? []).filter((e) => e.user_id === p.id).map(toEssay);
    const latestFeedback = studentEssays.flatMap((e) => (feedbackMap.has(e.id) ? [feedbackMap.get(e.id)!] : [])).at(-1);
    return { profile: toProfile(p), behind: daysBehind(streak), progress: lessonsDone, essays: studentEssays, latestFeedback, streak };
  });
}
