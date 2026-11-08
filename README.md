# Qabul

A college/scholarship application coaching platform for Uzbek students applying
abroad — quizzes, a gamified daily lesson plan, an essay coach, scholarship
matching, a mentor marketplace, parent-pay, and a counselor dashboard. Built
with Next.js 16 (App Router, Server Actions) and Supabase (Postgres, Auth, RLS).

Case studies, mentor profiles, and the counselor dashboard's demo roster are
fictional example content written to make the product feel fully populated —
swap for real local students before any real launch.

## Stack

- Next.js 16 / React 19 / TypeScript / Tailwind CSS v4
- Supabase: Postgres + Auth + Row Level Security (schema in `db/schema.sql`)
- Catalog content (schools, scholarships, mentors, lessons, quizzes,
  archetypes) ships as static data in `src/lib/seed-data.ts`; everything
  user-generated lives in Postgres.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in your Supabase project URL + publishable key
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Database

Apply `db/schema.sql` to a Supabase project (base schema + the follow-up
migrations appended at the end: catalog FK loosening, RLS policies on every
table, and the `on_auth_user_created` trigger that auto-provisions a profile
on signup). Then, optionally, run `db/seed-demo-roster.sql` once to populate
the counselor dashboard with a realistic ~25-student caseload.

In Supabase → Authentication → Sign In / Providers → Email, turn off
**Confirm email** for instant signup (matches the product's "start free in a
minute" flow); leave it on if you've configured real outbound email instead.

## Known gaps

- Payments are a demo flow (no real Click/Payme integration yet) — kept
  honestly labeled as demo in the UI, unlike the example-student content
- The "doomscroll blocker" is a toggle, not real OS-level app blocking — that
  needs a native iOS/Android app
- Case studies, mentors, and the counselor roster are fictional example
  content, not real students
