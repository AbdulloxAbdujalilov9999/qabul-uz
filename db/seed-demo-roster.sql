-- Optional: populates the counselor dashboard (src/app/maslahatchi) with a
-- realistic 25+ student caseload. These are display-only demo profiles with
-- no matching auth.users row (requires the allow_demo_profiles migration in
-- schema.sql to have already dropped profiles_id_fkey) -- nobody can log in
-- as them, they just give the counselor view something to show. Run once,
-- after schema.sql, against your own Supabase project's SQL editor.

create temp table demo_people (
  id uuid default gen_random_uuid(),
  essay_id uuid default gen_random_uuid(),
  full_name text,
  username text,
  lessons_done int,
  days_behind int,
  school_id text,
  bucket text,
  essay_score numeric,
  essay_title text
);

insert into demo_people (full_name, username, lessons_done, days_behind, school_id, bucket, essay_score, essay_title) values
('Xurshid Tillaboyev', 'xurshid_t', 12, 0, 'sch_mit', 'target', 8.4, 'Robototexnika loyihasi haqida'),
('Sabina Qodirova', 'sabina_q', 7, 1, 'sch_oxford', 'reach', 7.1, 'Debat klubi tajribasi'),
('Elyor Mahmudov', 'elyor_m', 15, 0, 'sch_kaist', 'target', 9.1, 'Dasturlash safari'),
('Gavhar Niyozova', 'gavhar_n', 3, 6, 'sch_chevening', 'reach', 5.4, 'Jurnalistika tajribam'),
('Sanjar Bekmuradov', 'sanjar_b', 10, 2, 'sch_daad', 'target', 7.8, 'Muhandislik startapi'),
('Ruxshona Davronova', 'ruxshona_d', 5, 4, 'sch_gks', 'target', 6.5, 'Til o''rganish yo''lim'),
('Ulug''bek Sharipov', 'ulugbek_s', 14, 0, 'sch_ethz', 'reach', 8.9, 'Suv tozalash loyihasi'),
('Madina Erkinova', 'madina_e', 8, 1, 'sch_elyurt', 'target', 7.3, 'Magistratura orzusi'),
('Botir Qahhorov', 'botir_q', 2, 9, 'sch_wiut', 'safety', 4.2, 'Biznes klubi tajribam'),
('Ziyoda Raximova', 'ziyoda_r', 11, 0, 'sch_fulbright', 'reach', 8.0, 'Qishloq xo''jaligi loyihasi'),
('Dostonbek Nurmatov', 'dostonbek_n', 6, 3, 'sch_toronto', 'target', 6.8, 'O''quvchilar kengashi'),
('Shaxnoza Yunusova', 'shaxnoza_y', 13, 0, 'sch_nus', 'target', 8.6, 'Iqtisodiyot tadqiqotim'),
('Iskandar Tojiboyev', 'iskandar_t', 4, 5, 'sch_anu', 'reach', 5.9, 'Astronomiya klubim'),
('Mavluda Saidova', 'mavluda_s', 9, 2, 'sch_erasmus', 'target', 7.0, 'Fan olimpiadalarim'),
('Asadbek Jo''rayev', 'asadbek_j', 15, 0, 'sch_tum', 'reach', 9.3, 'Avtomexanika tajribam'),
('Sojida Ergasheva', 'sojida_e', 1, 10, 'sch_inha', 'safety', 3.8, 'IT ga birinchi qadamlarim'),
('Dilshod Xolmatov', 'dilshod_x', 7, 3, 'sch_turkiye_burslari', 'target', 6.6, 'Yoshlar markazi loyihasi'),
('Nargiza Abdusamatova', 'nargiza_a', 12, 1, 'sch_mext', 'reach', 8.2, 'Yapon tili sayohatim'),
('Komil Mirzayev', 'komil_m', 10, 0, 'sch_tsue', 'target', 7.5, 'Iqtisodiyot olimpiadasi'),
('Umida Nazarova', 'umida_n', 3, 7, 'sch_newuz', 'safety', 4.9, 'Ilmiy jamiyat tajribam'),
('Sardorbek G''ofurov', 'sardorbek_g', 14, 0, 'sch_amity', 'target', 8.7, 'Sport va o''qish muvozanati'),
('Latofat Islomova', 'latofat_i', 6, 4, 'sch_snu', 'reach', 6.3, 'Maktab gazetasi tajribam'),
('Jaxongir Po''latov', 'jaxongir_p', 8, 2, 'sch_epfl', 'reach', 7.4, 'Kimyo laboratoriyasi'),
('Mukaddam Sattorova', 'mukaddam_s', 5, 8, 'sch_nu', 'target', 5.6, 'Startap tajribam'),
('Behruz Qurbonov', 'behruz_q', 11, 0, 'sch_mit', 'reach', 8.5, 'Fizika tadqiqotim'),
('Zebiniso Tashkentova', 'zebiniso_t', 9, 1, 'sch_oxford', 'target', 7.9, 'She''riyat daftarim');

insert into profiles (id, full_name, username, role, onboarded)
select id, full_name, username, 'student', true from demo_people;

insert into streaks (user_id, current_streak, longest_streak, last_active_on, focus_mode_enabled)
select id, greatest(0, 10 - days_behind), greatest(14, 10 - days_behind), (current_date - (days_behind || ' days')::interval)::date, true
from demo_people;

insert into lesson_progress (user_id, lesson_id, status, completed_at)
select dp.id, 'l' || gs.n, 'completed', now() - (random() * 20 || ' days')::interval
from demo_people dp
cross join lateral generate_series(1, dp.lessons_done) as gs(n);

insert into college_list_entries (user_id, school_id, bucket, status)
select id, school_id, bucket::list_bucket, 'in_progress' from demo_people;

insert into essays (id, user_id, title, content, status)
select essay_id, id, essay_title, 'Qoralama matni - ariza uchun tayyorlanmoqda.', 'reviewed' from demo_people;

insert into essay_feedback (essay_id, score, grammar_notes, narrative_notes, line_comments)
select essay_id, essay_score, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb from demo_people;

insert into ruby_wallets (user_id, balance)
select id, (random() * 20)::int from demo_people;

insert into institution_students (institution_id, student_id)
select 'inst_demo', id from demo_people;
