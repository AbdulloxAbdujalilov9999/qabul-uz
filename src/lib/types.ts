// Shared domain types. Mirrors db/schema.sql so the mock store (src/lib/db.ts)
// can be swapped for real Supabase queries later without touching callers.

export type Role = "student" | "parent" | "counselor" | "institution_admin" | "mentor";

export interface UserAccount {
  id: string;
  email: string;
  passwordHash: string;
  role: Role;
  createdAt: string;
}

export interface Profile {
  id: string; // == UserAccount.id
  fullName: string;
  username: string;
  role: Role;
  gradeLevel?: number; // 9-11 (maktab/litsey), or "abituriyent"
  gradYear?: number;
  highSchool?: string;
  archetypeId?: string;
  onboarded: boolean;
  institutionId?: string;
}

export type ProgramKind = "university" | "scholarship_program" | "exchange_program";

export interface SchoolDeadline {
  round: "early" | "priority" | "regular" | "rolling";
  label: string;
  date: string; // ISO date
}

export interface School {
  id: string;
  slug: string;
  name: string;
  kind: ProgramKind;
  country: string;
  city?: string;
  description: string;
  tags: string[];
  deadlines: SchoolDeadline[];
  featured?: boolean;
}

export type ListBucket = "reach" | "target" | "safety";

export interface CollegeListEntry {
  id: string;
  userId: string;
  schoolId: string;
  bucket: ListBucket;
  chosenRound?: string;
  status: "planning" | "in_progress" | "submitted" | "decided";
  createdAt: string;
}

export interface Archetype {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
}

export type QuizSlug = "arketip" | "moslik" | "grant";

export interface QuizOption {
  value: string;
  label: string;
  weights?: Record<string, number>; // vector/archetype -> weight
}

export interface QuizQuestion {
  id: string;
  order: number;
  prompt: string;
  type: "single" | "multi" | "scale";
  options: QuizOption[];
  sensitive?: boolean; // scored client-side only, never persisted
}

export interface QuizDef {
  slug: QuizSlug;
  title: string;
  description: string;
  questions: QuizQuestion[];
}

export interface QuizResponse {
  id: string;
  userId: string;
  quizSlug: QuizSlug;
  answers: Record<string, string | string[]>;
  result: unknown;
  createdAt: string;
}

export type LessonCategory =
  | "discovery"
  | "list_building"
  | "activities"
  | "essays"
  | "recs"
  | "submission";

export interface Lesson {
  id: string;
  slug: string;
  order: number;
  zone: number;
  category: LessonCategory;
  title: string;
  summary: string;
  body: string;
  isFree: boolean;
  // Where the lesson's actual task happens: a CTA to the relevant feature
  // (quiz, essay editor, college list, ...), or an inline reflection prompt
  // answered right on the lesson page. A lesson has at most one of these.
  action?: { label: string; href: string };
  reflectionPrompt?: string;
}

export type LessonStatus = "locked" | "available" | "in_progress" | "completed";

export interface LessonProgress {
  userId: string;
  lessonId: string;
  status: LessonStatus;
  completedAt?: string;
}

export interface LessonResponse {
  userId: string;
  lessonId: string;
  content: string;
  updatedAt: string;
}

export interface Streak {
  userId: string;
  current: number;
  longest: number;
  lastActiveOn?: string; // ISO date
  focusModeEnabled: boolean;
}

export interface SafetyNestContact {
  id: string;
  userId: string;
  name: string;
  phone: string;
  relationship: string;
  optedIn: boolean;
}

export interface JournalPrompt {
  id: string;
  prompt: string;
  theme: string;
}

export interface JournalEntry {
  id: string;
  userId: string;
  promptId?: string;
  content: string;
  createdAt: string;
}

export interface EssayTopicSuggestion {
  id: string;
  userId: string;
  title: string;
  rationale: string;
}

export interface Essay {
  id: string;
  userId: string;
  schoolId?: string;
  title: string;
  prompt: string;
  content: string;
  status: "drafting" | "submitted_for_review" | "reviewed";
  createdAt: string;
  updatedAt: string;
}

export interface EssayFeedback {
  id: string;
  essayId: string;
  score: number; // out of 10
  grammarNotes: string[];
  narrativeNotes: string[];
  lineComments: { excerpt: string; comment: string }[];
  createdAt: string;
}

export interface Extracurricular {
  id: string;
  userId: string;
  title: string;
  role: string;
  description: string;
  hoursPerWeek?: number;
  weeksPerYear?: number;
  aiRating?: number;
  aiFeedback?: string;
  order: number;
}

export interface Recommender {
  id: string;
  userId: string;
  name: string;
  relationship: string;
  email: string;
  bragSheet?: string;
  status: "requested" | "packet_sent" | "submitted";
}

export type ScholarshipType =
  | "national"
  | "need_based"
  | "interest_based"
  | "regional"
  | "school_specific";

export interface Scholarship {
  id: string;
  slug: string;
  name: string;
  type: ScholarshipType;
  amountText: string;
  deadline: string;
  eligibility: string[];
  description: string;
  sourceUrl?: string;
}

export interface ScholarshipMatch {
  userId: string;
  scholarshipId: string;
  score: number;
}

export interface CaseStudy {
  id: string;
  slug: string;
  schoolId: string;
  displayName: string;
  title: string;
  summary: string;
  body: string;
  tags: string[];
  acceptanceCount: number;
  rating: number;
  readCount: number;
  isPlaceholder: true;
}

export interface Mentor {
  id: string;
  displayName: string;
  schoolId: string;
  classYear: number;
  archetypeSlug: string;
  tagline: string;
  bio: string;
  tags: string[];
  acceptanceCount: number;
  rating: number | "new";
  priceRubies: number;
  isPlaceholder: true;
}

export interface Conversation {
  id: string;
  studentId: string;
  mentorId: string;
  status: "open" | "awaiting_reply" | "refunded";
  createdAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string; // profile id or mentor id
  senderKind: "student" | "mentor";
  body: string;
  rubiesCharged: number;
  createdAt: string;
}

export type PlanType = "free" | "monthly" | "annual";

export interface Subscription {
  userId: string;
  plan: PlanType;
  status: "active" | "none";
  currentPeriodEnd?: string;
  provider?: "click" | "payme" | "manual_demo";
}

export interface ParentPaymentLink {
  id: string;
  studentId: string;
  token: string;
  status: "pending" | "paid" | "expired";
  createdAt: string;
  paidAt?: string;
}

export interface Institution {
  id: string;
  name: string;
  rosterCode: string;
  plan: string;
  seats: number;
}

export interface Meeting {
  id: string;
  studentId: string;
  counselorId: string;
  topic: string;
  note: string;
  proposedTimes: string[];
  scheduledTime?: string;
  status: "requested" | "scheduled" | "completed";
}

export interface DraftReview {
  id: string;
  essayId: string;
  reviewerId: string;
  comments: { excerpt: string; comment: string }[];
  status: "open" | "returned";
}
