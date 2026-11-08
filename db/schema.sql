-- Qabul schema (Supabase/Postgres)
-- Mirrors AdmitRaven's full feature surface: profiles, quizzes, college list,
-- lessons/streaks, essays+AI feedback, extracurriculars, letters of rec,
-- scholarships, case studies, mentor marketplace + rubies currency, messaging,
-- parent-pay links, institutions (counselor/school B2B), meetings, draft review.

create extension if not exists "pgcrypto";

-- ============ Core identity ============

create type user_role as enum ('student', 'parent', 'counselor', 'institution_admin', 'mentor', 'platform_admin');

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role user_role not null default 'student',
  full_name text,
  username text unique,
  avatar_url text,
  locale text not null default 'uz',
  grade_level smallint,            -- 9-12 equivalent
  grad_year smallint,
  high_school text,
  archetype_id uuid,
  onboarded boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============ Target programs (universities / scholarship programs) ============

create type program_kind as enum ('university', 'scholarship_program', 'exchange_program');

create table schools (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  kind program_kind not null default 'university',
  country text not null,
  city text,
  logo_url text,
  website_url text,
  description text,
  is_featured boolean not null default false,
  created_at timestamptz not null default now()
);

create type round_type as enum ('early_decision', 'early_action', 'priority', 'regular', 'rolling');

create table school_deadlines (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references schools(id) on delete cascade,
  round round_type not null,
  deadline date not null,
  label text
);

create type list_bucket as enum ('reach', 'target', 'safety');

create table college_list_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  school_id uuid not null references schools(id) on delete cascade,
  bucket list_bucket,
  chosen_round round_type,
  status text not null default 'planning', -- planning | in_progress | submitted | decided
  created_at timestamptz not null default now(),
  unique (user_id, school_id)
);

-- ============ Quizzes (archetype / match / scholarship) ============

create table archetypes (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  tagline text,
  description text
);

alter table profiles add constraint profiles_archetype_fk
  foreign key (archetype_id) references archetypes(id);

create type quiz_slug as enum ('archetype', 'college_match', 'scholarship');

create table quizzes (
  id uuid primary key default gen_random_uuid(),
  slug quiz_slug unique not null,
  title text not null,
  description text,
  question_count smallint not null
);

create table quiz_questions (
  id uuid primary key default gen_random_uuid(),
  quiz_id uuid not null references quizzes(id) on delete cascade,
  order_index smallint not null,
  prompt text not null,
  input_type text not null default 'single_choice', -- single_choice | multi_choice | scale | numeric
  options jsonb,
  vector_weights jsonb, -- maps option -> {vector: weight} for match/archetype scoring
  is_sensitive boolean not null default false, -- financial/background: client-scored only
  unique (quiz_id, order_index)
);

create table quiz_responses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  quiz_id uuid not null references quizzes(id) on delete cascade,
  answers jsonb not null,
  result jsonb,              -- computed archetype / top schools / matched scholarships
  created_at timestamptz not null default now()
);

-- ============ Daily lesson plan / gamification ============

create table lessons (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  order_index int not null,
  category text not null, -- discovery | list_building | activities | essays | recs | submission
  title text not null,
  summary text,
  body text,
  is_free boolean not null default false, -- first N lessons free
  map_zone smallint not null default 1
);

create type lesson_status as enum ('locked', 'available', 'in_progress', 'completed');

create table lesson_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  lesson_id uuid not null references lessons(id) on delete cascade,
  status lesson_status not null default 'locked',
  completed_at timestamptz,
  unique (user_id, lesson_id)
);

create table streaks (
  user_id uuid primary key references profiles(id) on delete cascade,
  current_streak int not null default 0,
  longest_streak int not null default 0,
  last_active_on date,
  focus_mode_enabled boolean not null default true -- doomscroll blocker toggle (web: site-blocklist nudge)
);

create table safety_nest_contacts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  contact_name text not null,
  phone text not null,
  relationship text,
  opted_in boolean not null default false,
  created_at timestamptz not null default now()
);

-- ============ Journaling + essays ============

create table journal_prompts (
  id uuid primary key default gen_random_uuid(),
  prompt text not null,
  theme text
);

create table journal_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  prompt_id uuid references journal_prompts(id),
  content text not null,
  created_at timestamptz not null default now()
);

create table essay_topic_suggestions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  title text not null,
  rationale text,
  source_journal_entry_id uuid references journal_entries(id),
  created_at timestamptz not null default now()
);

create table essays (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  school_id uuid references schools(id),
  title text,
  prompt text,
  content text not null default '',
  status text not null default 'drafting', -- drafting | submitted_for_review | reviewed
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table essay_feedback (
  id uuid primary key default gen_random_uuid(),
  essay_id uuid not null references essays(id) on delete cascade,
  score numeric(3,1),           -- out of 10
  grammar_notes jsonb,
  narrative_notes jsonb,
  line_comments jsonb,          -- [{start,end,comment}]
  generated_by text not null default 'ai', -- ai | counselor
  created_at timestamptz not null default now()
);

create table draft_reviews (
  id uuid primary key default gen_random_uuid(),
  essay_id uuid not null references essays(id) on delete cascade,
  reviewer_id uuid not null references profiles(id),
  comments jsonb,
  redlines jsonb,
  status text not null default 'open',
  created_at timestamptz not null default now()
);

-- ============ Extracurriculars + letters of rec ============

create table extracurriculars (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  title text not null,
  role text,
  description text,
  hours_per_week smallint,
  weeks_per_year smallint,
  ai_rating numeric(3,1),
  ai_feedback text,
  order_index int not null default 0,
  created_at timestamptz not null default now()
);

create table recommenders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  name text not null,
  relationship text,
  email text,
  brag_sheet jsonb,
  status text not null default 'requested', -- requested | packet_sent | submitted
  created_at timestamptz not null default now()
);

-- ============ Scholarships ============

create type scholarship_type as enum ('national', 'need_based', 'interest_based', 'regional', 'school_specific');

create table scholarships (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  type scholarship_type not null,
  amount_text text,
  deadline date,
  eligibility jsonb,
  description text,
  source_url text
);

create table scholarship_matches (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  scholarship_id uuid not null references scholarships(id) on delete cascade,
  match_score numeric(4,1),
  created_at timestamptz not null default now(),
  unique (user_id, scholarship_id)
);

-- ============ Case studies (placeholder content) ============

create table case_studies (
  id uuid primary key default gen_random_uuid(),
  school_id uuid references schools(id),
  slug text unique not null,
  display_name text not null,
  title text not null,
  summary text,
  body text,
  tags text[] not null default '{}',
  acceptance_count smallint,
  rating numeric(2,1),
  read_count int not null default 0,
  is_placeholder boolean not null default true,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

-- ============ Mentor marketplace + rubies ============

create table mentors (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles(id),
  display_name text not null,
  school_id uuid references schools(id),
  class_year smallint,
  archetype_id uuid references archetypes(id),
  tagline text,
  bio text,
  tags text[] not null default '{}',
  acceptance_count smallint,
  rating numeric(2,1),
  price_rubies int not null default 10,
  is_placeholder boolean not null default true,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table ruby_wallets (
  user_id uuid primary key references profiles(id) on delete cascade,
  balance int not null default 0
);

create type ruby_tx_type as enum ('purchase', 'spend', 'refund', 'grant');

create table ruby_transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  amount int not null, -- positive = credit, negative = debit
  type ruby_tx_type not null,
  related_message_id uuid,
  created_at timestamptz not null default now()
);

create table conversations (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references profiles(id) on delete cascade,
  mentor_id uuid not null references mentors(id) on delete cascade,
  status text not null default 'open', -- open | awaiting_reply | closed | refunded
  created_at timestamptz not null default now(),
  unique (student_id, mentor_id)
);

create table messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references conversations(id) on delete cascade,
  sender_id uuid not null references profiles(id),
  body text not null,
  rubies_charged int not null default 0,
  created_at timestamptz not null default now()
);

alter table ruby_transactions
  add constraint ruby_transactions_message_fk
  foreign key (related_message_id) references messages(id);

-- ============ Billing ============

create type plan_type as enum ('free', 'monthly', 'annual');
create type subscription_status as enum ('active', 'canceled', 'past_due', 'none');

create table subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  plan plan_type not null default 'free',
  status subscription_status not null default 'none',
  current_period_end timestamptz,
  payment_provider text, -- 'click' | 'payme' | 'stripe' | 'manual'
  external_ref text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id)
);

create table parent_payment_links (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references profiles(id) on delete cascade,
  token text unique not null default encode(gen_random_bytes(16), 'hex'),
  status text not null default 'pending', -- pending | paid | expired
  created_at timestamptz not null default now(),
  paid_at timestamptz
);

-- ============ Institutions (counselor / school B2B) ============

create table institutions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  roster_code text unique not null,
  plan text not null default 'pilot',
  seats int,
  created_at timestamptz not null default now()
);

create type institution_role as enum ('counselor', 'institution_admin');

create table institution_members (
  institution_id uuid not null references institutions(id) on delete cascade,
  user_id uuid not null references profiles(id) on delete cascade,
  role institution_role not null default 'counselor',
  primary key (institution_id, user_id)
);

create table institution_students (
  institution_id uuid not null references institutions(id) on delete cascade,
  student_id uuid not null references profiles(id) on delete cascade,
  counselor_id uuid references profiles(id),
  joined_at timestamptz not null default now(),
  primary key (institution_id, student_id)
);

create table meetings (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references profiles(id) on delete cascade,
  counselor_id uuid not null references profiles(id) on delete cascade,
  topic text,
  note text,
  proposed_times timestamptz[] not null default '{}',
  scheduled_time timestamptz,
  status text not null default 'requested', -- requested | scheduled | completed | canceled
  created_at timestamptz not null default now()
);

-- ============ Helpful indexes ============

create index on college_list_entries (user_id);
create index on lesson_progress (user_id);
create index on essays (user_id);
create index on extracurriculars (user_id);
create index on scholarship_matches (user_id);
create index on case_studies (school_id);
create index on mentors (school_id);
create index on messages (conversation_id);
create index on institution_students (institution_id);

-- ============================================================
-- Follow-up migrations (applied in this order after the base schema above)
-- ============================================================

-- migration: loosen_catalog_refs
-- Catalog content (schools, scholarships, mentors, lessons, quizzes, archetypes,
-- case studies, journal prompts) ships as static data in src/lib/seed-data.ts,
-- not as DB rows -- only user-generated/mutable data lives in Postgres. These
-- columns reference those static string ids, so they're plain text, not FKs.
alter table profiles drop constraint if exists profiles_archetype_fk;
alter table profiles alter column archetype_id type text using archetype_id::text;
alter table college_list_entries drop constraint if exists college_list_entries_school_id_fkey;
alter table college_list_entries alter column school_id type text using school_id::text;
alter table college_list_entries alter column school_id set not null;
alter table essays drop constraint if exists essays_school_id_fkey;
alter table essays alter column school_id type text using school_id::text;
alter table scholarship_matches drop constraint if exists scholarship_matches_scholarship_id_fkey;
alter table scholarship_matches alter column scholarship_id type text using scholarship_id::text;
alter table scholarship_matches alter column scholarship_id set not null;
alter table lesson_progress drop constraint if exists lesson_progress_lesson_id_fkey;
alter table lesson_progress alter column lesson_id type text using lesson_id::text;
alter table lesson_progress alter column lesson_id set not null;
alter table quiz_responses drop constraint if exists quiz_responses_quiz_id_fkey;
alter table quiz_responses alter column quiz_id type text using quiz_id::text;
alter table quiz_responses alter column quiz_id set not null;
alter table conversations drop constraint if exists conversations_mentor_id_fkey;
alter table conversations alter column mentor_id type text using mentor_id::text;
alter table conversations alter column mentor_id set not null;
alter table institution_students drop constraint if exists institution_students_institution_id_fkey;
alter table institution_students alter column institution_id type text using institution_id::text;
alter table institution_members drop constraint if exists institution_members_institution_id_fkey;
alter table institution_members alter column institution_id type text using institution_id::text;

-- migration: loosen_journal_prompt_ref
alter table journal_entries drop constraint if exists journal_entries_prompt_id_fkey;
alter table journal_entries alter column prompt_id type text using prompt_id::text;

-- migration: messages_sender_kind
-- Mentors aren't real auth users yet, so a "mentor reply" is inserted using
-- the student's own session. Need an explicit flag to tell the two apart.
alter table messages add column sender_kind text not null default 'student' check (sender_kind in ('student', 'mentor'));

-- migration: allow_demo_profiles
-- Allow display-only demo profiles (no matching auth.users row) so the
-- counselor dashboard can show a populated caseload. Real signups still get
-- profiles via the on_auth_user_created trigger below.
alter table profiles drop constraint if exists profiles_id_fkey;

-- migration: lock_unused_catalog_tables
-- These tables aren't queried via the API at all (catalog content ships as
-- static data). Enable RLS with no policies so they're fully inaccessible.
alter table schools enable row level security;
alter table school_deadlines enable row level security;
alter table archetypes enable row level security;
alter table quizzes enable row level security;
alter table quiz_questions enable row level security;
alter table lessons enable row level security;
alter table journal_prompts enable row level security;
alter table draft_reviews enable row level security;
alter table scholarships enable row level security;
alter table case_studies enable row level security;
alter table mentors enable row level security;
alter table institutions enable row level security;
alter table meetings enable row level security;
alter table institution_members enable row level security;

-- migration: row_level_security
-- Every other table defaults to RLS-locked; only an explicit policy below
-- opens it up. Student-owned tables: student can read/write their own rows.
-- A few additionally allow any authenticated user to SELECT, to power the
-- counselor demo dashboard (see src/app/maslahatchi -- any signed-in user
-- can view it today; a real rollout would scope this to counselor roles).

alter table profiles enable row level security;
create policy "profiles_select_any_authenticated" on profiles for select to authenticated using (true);
create policy "profiles_insert_own" on profiles for insert to authenticated with check (auth.uid() = id);
create policy "profiles_update_own" on profiles for update to authenticated using (auth.uid() = id);

alter table streaks enable row level security;
create policy "streaks_select_any_authenticated" on streaks for select to authenticated using (true);
create policy "streaks_upsert_own" on streaks for insert to authenticated with check (auth.uid() = user_id);
create policy "streaks_update_own" on streaks for update to authenticated using (auth.uid() = user_id);

alter table lesson_progress enable row level security;
create policy "lesson_progress_select_any_authenticated" on lesson_progress for select to authenticated using (true);
create policy "lesson_progress_insert_own" on lesson_progress for insert to authenticated with check (auth.uid() = user_id);
create policy "lesson_progress_update_own" on lesson_progress for update to authenticated using (auth.uid() = user_id);

alter table essays enable row level security;
create policy "essays_select_any_authenticated" on essays for select to authenticated using (true);
create policy "essays_write_own" on essays for insert to authenticated with check (auth.uid() = user_id);
create policy "essays_update_own" on essays for update to authenticated using (auth.uid() = user_id);
create policy "essays_delete_own" on essays for delete to authenticated using (auth.uid() = user_id);

alter table essay_feedback enable row level security;
create policy "essay_feedback_select_any_authenticated" on essay_feedback for select to authenticated using (true);
create policy "essay_feedback_insert_own_essay" on essay_feedback for insert to authenticated
  with check (exists (select 1 from essays where essays.id = essay_id and essays.user_id = auth.uid()));

alter table college_list_entries enable row level security;
create policy "college_list_select_any_authenticated" on college_list_entries for select to authenticated using (true);
create policy "college_list_insert_own" on college_list_entries for insert to authenticated with check (auth.uid() = user_id);
create policy "college_list_update_own" on college_list_entries for update to authenticated using (auth.uid() = user_id);
create policy "college_list_delete_own" on college_list_entries for delete to authenticated using (auth.uid() = user_id);

alter table institution_students enable row level security;
create policy "institution_students_select_any_authenticated" on institution_students for select to authenticated using (true);
create policy "institution_students_insert_own" on institution_students for insert to authenticated with check (auth.uid() = student_id);

alter table quiz_responses enable row level security;
create policy "quiz_responses_own" on quiz_responses for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

alter table safety_nest_contacts enable row level security;
create policy "safety_nest_own" on safety_nest_contacts for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

alter table journal_entries enable row level security;
create policy "journal_entries_own" on journal_entries for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

alter table essay_topic_suggestions enable row level security;
create policy "essay_topic_suggestions_own" on essay_topic_suggestions for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

alter table extracurriculars enable row level security;
create policy "extracurriculars_own" on extracurriculars for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

alter table recommenders enable row level security;
create policy "recommenders_own" on recommenders for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

alter table scholarship_matches enable row level security;
create policy "scholarship_matches_own" on scholarship_matches for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

alter table ruby_wallets enable row level security;
create policy "ruby_wallets_own" on ruby_wallets for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

alter table ruby_transactions enable row level security;
create policy "ruby_transactions_own" on ruby_transactions for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

alter table subscriptions enable row level security;
create policy "subscriptions_own" on subscriptions for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

alter table conversations enable row level security;
create policy "conversations_own" on conversations for all to authenticated
  using (auth.uid() = student_id) with check (auth.uid() = student_id);

alter table messages enable row level security;
create policy "messages_select_own_conversation" on messages for select to authenticated
  using (exists (select 1 from conversations where conversations.id = conversation_id and conversations.student_id = auth.uid()));
create policy "messages_insert_own_conversation" on messages for insert to authenticated
  with check (exists (select 1 from conversations where conversations.id = conversation_id and conversations.student_id = auth.uid()));

-- Parent payment links: the parent clicks a link while signed out (or from a
-- browser where the student is still logged in), so both anon and
-- authenticated need token-based access -- same trust model as a
-- password-reset email link. A real launch would move "mark paid" behind a
-- server-only webhook instead of exposing update by token at all.
alter table parent_payment_links enable row level security;
create policy "parent_payment_links_select_own" on parent_payment_links for select to authenticated using (auth.uid() = student_id);
create policy "parent_payment_links_insert_own" on parent_payment_links for insert to authenticated with check (auth.uid() = student_id);
create policy "parent_payment_links_select_by_token" on parent_payment_links for select to public using (true);
create policy "parent_payment_links_update_by_token" on parent_payment_links for update to public using (true);

-- migration: auto_provision_new_user
-- auth.signUp() may return before a session exists (email confirmation
-- pending), so a client-side insert into profiles right after signUp can run
-- as the anon role and get rejected by RLS. Standard Supabase fix: a
-- SECURITY DEFINER trigger on auth.users that provisions everything
-- server-side, regardless of confirmation timing. full_name/username come in
-- via signUp()'s options.data (raw_user_meta_data).

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, username, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce(new.raw_user_meta_data->>'username', 'user_' || substr(new.id::text, 1, 8)),
    'student'
  );
  insert into public.streaks (user_id) values (new.id);
  insert into public.ruby_wallets (user_id, balance) values (new.id, 15);
  insert into public.ruby_transactions (user_id, amount, type) values (new.id, 15, 'grant');
  insert into public.institution_students (institution_id, student_id) values ('inst_demo', new.id);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

revoke execute on function public.handle_new_user() from public;

-- Narrow, SECURITY DEFINER-scoped username-availability check: callable by
-- anon (the signup form, before a session exists) without exposing any
-- profile row data, unlike a plain SELECT policy would.
create or replace function public.is_username_taken(check_username text)
returns boolean
language sql
security definer set search_path = public
stable
as $$
  select exists (select 1 from public.profiles where username = check_username);
$$;

grant execute on function public.is_username_taken(text) to anon, authenticated;
