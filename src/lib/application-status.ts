import type { CollegeListEntry } from "./types";

type Status = CollegeListEntry["status"];

export const STATUS_META: Record<Status, { label: string; tone: "ink" | "brand" | "accent" | "good" | "bad"; step: number }> = {
  planning: { label: "Rejalashtirilmoqda", tone: "ink", step: 0 },
  in_progress: { label: "Tayyorlanmoqda", tone: "brand", step: 0 },
  submitted: { label: "Topshirildi", tone: "accent", step: 1 },
  under_review: { label: "Ko'rib chiqilmoqda", tone: "accent", step: 2 },
  admitted: { label: "Qabul qilindi", tone: "good", step: 3 },
  waitlisted: { label: "Kutish ro'yxatida", tone: "accent", step: 3 },
  declined: { label: "Rad etildi", tone: "bad", step: 3 },
};

export const STATUS_ORDER: Status[] = ["planning", "in_progress", "submitted", "under_review", "admitted", "waitlisted", "declined"];

export const STEP_LABELS = ["Tayyorlanmoqda", "Topshirildi", "Ko'rib chiqilmoqda", "Qaror"];
