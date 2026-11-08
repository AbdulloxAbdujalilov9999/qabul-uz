// Scoring/matching logic for quizzes, essays, extracurriculars and scholarships.
// These are deterministic heuristics so the product is fully functional without
// a live AI API key. Each function is written so a real model call can replace
// the body later (see essayFeedback) without touching callers.

import { archetypes, quizzes, scholarships, schools } from "./seed-data";
import type { Scholarship } from "./types";

// ---------- Archetype quiz ----------

export function scoreArketip(answers: Record<string, string>) {
  const quiz = quizzes.find((q) => q.slug === "arketip")!;
  const tally: Record<string, number> = {};
  for (const q of quiz.questions) {
    const chosen = answers[q.id];
    const opt = q.options.find((o) => o.value === chosen);
    if (!opt?.weights) continue;
    for (const [slug, weight] of Object.entries(opt.weights)) {
      tally[slug] = (tally[slug] ?? 0) + weight;
    }
  }
  const ranked = Object.entries(tally).sort((a, b) => b[1] - a[1]);
  const topSlug = ranked[0]?.[0];
  const top = archetypes.find((a) => a.slug === topSlug) ?? archetypes[0];
  const runnerUp = ranked[1] ? archetypes.find((a) => a.slug === ranked[1][0]) : undefined;
  return { top, runnerUp, tally };
}

// ---------- College / program match quiz ----------

export interface MatchVectors {
  structure: number;
  urban: number;
  fundingSensitive: number;
  stem: number;
  englishReady: number;
  supportNeed: number;
}

export function scoreMoslik(answers: Record<string, string>): MatchVectors {
  const quiz = quizzes.find((q) => q.slug === "moslik")!;
  const v: MatchVectors = { structure: 0, urban: 0, fundingSensitive: 0, stem: 0, englishReady: 0, supportNeed: 0 };
  for (const q of quiz.questions) {
    const chosen = answers[q.id];
    const opt = q.options.find((o) => o.value === chosen);
    if (!opt?.weights) continue;
    for (const [key, weight] of Object.entries(opt.weights)) {
      if (key in v) v[key as keyof MatchVectors] += weight;
    }
  }
  return v;
}

export function matchSchools(vectors: MatchVectors) {
  const scored = schools.map((school) => {
    let score = 50; // baseline
    const tags = school.tags.join(" ").toLowerCase();
    if (vectors.stem > 0 && tags.includes("stem")) score += 15;
    if (vectors.stem < 0 && (tags.includes("biznes") || tags.includes("gumanitar"))) score += 10;
    if (vectors.fundingSensitive > 0 && school.kind === "scholarship_program") score += 20;
    if (vectors.fundingSensitive <= 0 && school.kind === "university") score += 5;
    if (vectors.urban > 0 && (school.city === "Seul" || school.city === "Toshkent")) score += 8;
    if (vectors.englishReady < 0 && school.country === "O'zbekiston") score += 10;
    if (vectors.supportNeed > 0 && school.country === "O'zbekiston") score += 6;
    score += Math.random() * 6 - 3; // small jitter so results don't feel mechanical
    const pct = Math.max(35, Math.min(97, Math.round(score)));
    return { school, pct };
  });
  scored.sort((a, b) => b.pct - a.pct);
  return scored.map((s, i) => ({
    ...s,
    bucket: i < 2 ? ("reach" as const) : i < 5 ? ("target" as const) : ("safety" as const),
  }));
}

// ---------- Scholarship quiz ----------

export interface GrantVectors {
  usa: number;
  uk: number;
  eu: number;
  korea: number;
  local: number;
  needBased: number;
  meritBased: number;
  stemInterest: number;
  socialInterest: number;
  artsInterest: number;
  stageEarly: number;
  stageLate: number;
  stageExchange: number;
}

export function scoreGrant(answers: Record<string, string>): GrantVectors {
  const quiz = quizzes.find((q) => q.slug === "grant")!;
  const v: GrantVectors = {
    usa: 0, uk: 0, eu: 0, korea: 0, local: 0,
    needBased: 0, meritBased: 0,
    stemInterest: 0, socialInterest: 0, artsInterest: 0,
    stageEarly: 0, stageLate: 0, stageExchange: 0,
  };
  for (const q of quiz.questions) {
    const chosen = answers[q.id];
    const opt = q.options.find((o) => o.value === chosen);
    if (!opt?.weights) continue;
    for (const [key, weight] of Object.entries(opt.weights)) {
      if (key in v) v[key as keyof GrantVectors] += weight;
    }
  }
  return v;
}

export function matchScholarships(vectors: GrantVectors): { scholarship: Scholarship; score: number }[] {
  const scored = scholarships.map((sch) => {
    let score = 40;
    if (sch.type === "need_based") score += vectors.needBased * 8;
    if (sch.type === "national") score += vectors.meritBased * 6;
    if (sch.type === "interest_based") score += (vectors.stemInterest + vectors.artsInterest) * 4;
    if (sch.type === "regional") score += vectors.needBased * 4;
    if (sch.type === "school_specific") score += vectors.stageLate * 5;
    if (sch.name.includes("Fulbright")) score += vectors.usa * 10;
    if (sch.name.includes("Chevening")) score += vectors.uk * 10;
    if (sch.name.includes("DAAD")) score += vectors.eu * 10;
    if (sch.name.includes("GKS") || sch.name.includes("Korea")) score += vectors.korea * 10;
    if (sch.name.includes("El-Yurt")) score += (vectors.usa + vectors.uk + vectors.eu + vectors.korea) * 3;
    return { scholarship: sch, score: Math.max(10, Math.round(score)) };
  });
  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return new Date(a.scholarship.deadline).getTime() - new Date(b.scholarship.deadline).getTime();
  });
  return scored;
}

// ---------- Essay feedback (heuristic baseline; swap for a real LLM call) ----------

export interface EssayFeedbackResult {
  score: number;
  grammarNotes: string[];
  narrativeNotes: string[];
  lineComments: { excerpt: string; comment: string }[];
}

export function scoreEssay(content: string): EssayFeedbackResult {
  const text = content.trim();
  const words = text.split(/\s+/).filter(Boolean);
  const sentences = text.split(/[.!?]+/).map((s) => s.trim()).filter(Boolean);
  const grammarNotes: string[] = [];
  const narrativeNotes: string[] = [];
  const lineComments: { excerpt: string; comment: string }[] = [];

  if (words.length < 150) grammarNotes.push("Matn juda qisqa - fikrni rivojlantirish uchun kamida 250-350 so'z kerak.");
  if (words.length > 700) grammarNotes.push("Matn juda uzun - asosiy hikoyani qisqartirib, keraksiz qismlarni olib tashla.");
  if (/  +/.test(text)) grammarNotes.push("Ba'zi joylarda ortiqcha probel bor.");
  if (text.length > 0 && !/^[A-ZА-ЯЁ]/.test(text)) grammarNotes.push("Matn bosh harf bilan boshlanishi kerak.");

  const avgSentenceLen = sentences.length ? words.length / sentences.length : 0;
  if (avgSentenceLen > 28) narrativeNotes.push("Gaplar juda uzun - o'quvchi uchun ba'zilarini qisqa gaplarga bo'l.");
  if (sentences.length >= 3) {
    const lens = sentences.map((s) => s.split(/\s+/).length);
    const variance = Math.max(...lens) - Math.min(...lens);
    if (variance < 3) narrativeNotes.push("Deyarli barcha gaplar bir xil uzunlikda - ritmni xilma-xil qil.");
  }

  const firstPerson = (text.match(/\b(men|o'zim|o'zimning)\b/gi) ?? []).length;
  if (firstPerson < 2) narrativeNotes.push("Hikoya ko'proq tashqi tasvirga o'xshaydi - o'z fikr va his-tuyg'ularingni ko'proq qo'sh.");

  const hasNumber = /\d/.test(text);
  if (!hasNumber) narrativeNotes.push("Aniq natija yoki raqam yo'q - ta'sirni ko'rsatish uchun kichik bir raqam qo'shsang kuchliroq bo'ladi.");

  if (sentences[0]) {
    lineComments.push({
      excerpt: sentences[0].slice(0, 80),
      comment: "Kirish jumlasi o'quvchini darrov voqea ichiga tortishi kerak - savol yoki aniq lahza bilan boshlashni sina.",
    });
  }
  const lastSentence = sentences[sentences.length - 1];
  if (lastSentence) {
    lineComments.push({
      excerpt: lastSentence.slice(0, 80),
      comment: "Yakun qismida bu tajriba seni qanday o'zgartirgani yoki nimani anglaganing yana bir bor ta'kidlansa kuchli yopiladi.",
    });
  }

  let score = 6.5;
  score -= grammarNotes.length * 0.4;
  score -= narrativeNotes.length * 0.3;
  score = Math.max(2, Math.min(9.5, Math.round(score * 10) / 10));

  return { score, grammarNotes, narrativeNotes, lineComments };
}

// ---------- Extracurricular rating ----------

export function rateExtracurricular(description: string): { rating: number; feedback: string } {
  const text = description.trim();
  if (!text) return { rating: 1, feedback: "Tavsif bo'sh - rol, davomiylik va natijani yoz." };
  const hasNumbers = /\d/.test(text);
  const hasLeadershipWord = /(tashkil|rahbar|boshchilik|yetakchi|asos solgan)/i.test(text);
  const hasImpactWord = /(natija|o'sdi|oshdi|g'alaba|ishtirokchi|a'zo)/i.test(text);
  let rating = 5;
  const notes: string[] = [];
  if (hasNumbers) { rating += 1.5; } else { notes.push("aniq raqam (necha kishi, necha soat, necha %) qo'sh"); }
  if (hasLeadershipWord) { rating += 1.5; } else { notes.push("o'z rolingni aniqroq ko'rsat"); }
  if (hasImpactWord) { rating += 1; } else { notes.push("bu faoliyat nimaga olib kelganini yoz"); }
  if (text.length > 200) rating += 0.5;
  rating = Math.max(1, Math.min(10, Math.round(rating * 10) / 10));
  const feedback = notes.length
    ? `Kuchaytirish uchun: ${notes.join("; ")}.`
    : "Yaxshi yozilgan - rol, raqam va natija bor.";
  return { rating, feedback };
}
