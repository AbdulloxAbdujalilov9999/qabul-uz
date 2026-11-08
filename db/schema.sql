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
