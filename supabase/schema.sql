-- ============================================================================
-- Boots — Supabase schema (PostgreSQL)
-- ============================================================================
-- Run this in the Supabase SQL editor (or `supabase db push`). It is idempotent
-- where practical so you can re-run during development.
--
-- Model overview:
--   auth.users (Supabase-managed)
--     └─ profiles            1:1 identity + aggregate game stats (xp, gold, streak)
--   courses                  curriculum modules (mirrors src/lib/curriculum)
--     └─ lessons             ordered lessons within a course
--   user_progress            per-user, per-lesson completion (the core loop record)
--   achievements             catalog (mirrors src/lib/achievements)
--   user_achievements        which user unlocked which achievement, when
--
-- The repo remains the source of truth for *lesson content*; these tables track
-- *player state* and let content also be queried relationally (SEO, analytics).
-- ============================================================================

-- Extensions ----------------------------------------------------------------
create extension if not exists "uuid-ossp";

-- Enums ---------------------------------------------------------------------
do $$ begin
  create type lesson_status as enum ('in_progress', 'completed');
exception when duplicate_object then null; end $$;

do $$ begin
  create type achievement_rarity as enum ('common', 'rare', 'epic', 'legendary');
exception when duplicate_object then null; end $$;

-- updated_at helper ---------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

-- ============================================================================
-- profiles  (the "users" table — 1:1 with auth.users)
-- ============================================================================
create table if not exists public.profiles (
  id             uuid primary key references auth.users (id) on delete cascade,
  username       text unique,
  display_name   text,
  avatar_url     text,
  -- aggregate game state (authoritative copy; client mirrors it in useGameStore)
  xp             integer not null default 0 check (xp >= 0),
  gold           integer not null default 0 check (gold >= 0),
  streak         integer not null default 0 check (streak >= 0),
  last_active_day date,
  -- denormalized live snapshot the client syncs in one upsert (useGameStore).
  -- The relational tables below remain for analytics / SEO queries.
  completed      text[] not null default '{}',
  achievements   text[] not null default '{}',
  active_quest   text,
  -- GitHub "coding journey" link (see migration 0002). The installation id is
  -- useless without the App private key, which is server-side only.
  github_login           text,
  github_installation_id bigint,
  github_repo            text,
  -- Weekly league fields (see migration 0003); reset by the close-season cron.
  weekly_xp      integer not null default 0 check (weekly_xp >= 0),
  league_tier    integer not null default 0 check (league_tier >= 0),
  season_start   text,
  -- Billing entitlement (see migration 0004). Written ONLY by the Stripe webhook
  -- via the service-role client; the protect_billing_columns trigger blocks
  -- client writes so a learner can't grant itself Pro.
  is_pro             boolean not null default false,
  stripe_customer_id text,
  pro_since          timestamptz,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create unique index if not exists profiles_stripe_customer_idx
  on public.profiles (stripe_customer_id)
  where stripe_customer_id is not null;

-- Block client writes to billing columns (service role bypasses this).
create or replace function public.protect_billing_columns()
returns trigger language plpgsql as $$
begin
  if current_user not in ('service_role', 'postgres', 'supabase_admin') then
    new.is_pro             := old.is_pro;
    new.stripe_customer_id := old.stripe_customer_id;
    new.pro_since          := old.pro_since;
  end if;
  return new;
end $$;

drop trigger if exists trg_profiles_protect_billing on public.profiles;
create trigger trg_profiles_protect_billing
  before update on public.profiles
  for each row execute function public.protect_billing_columns();

-- Stripe webhook idempotency ledger (see migration 0004).
create table if not exists public.stripe_events (
  id          text primary key,
  type        text not null,
  received_at timestamptz not null default now()
);
alter table public.stripe_events enable row level security;

drop trigger if exists trg_profiles_updated_at on public.profiles;
create trigger trg_profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- Auto-create a profile row whenever a new auth user signs up.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, display_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data ->> 'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================================
-- courses  (curriculum modules)
-- ============================================================================
create table if not exists public.courses (
  id           uuid primary key default uuid_generate_v4(),
  slug         text unique not null,
  title        text not null,
  description  text not null default '',
  emoji        text not null default '📦',
  -- tailwind gradient classes for the course accent (mirrors Module.gradient)
  gradient     text not null default '',
  tagline      text not null default '',
  sort_order   integer not null default 0,
  is_published boolean not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

drop trigger if exists trg_courses_updated_at on public.courses;
create trigger trg_courses_updated_at
  before update on public.courses
  for each row execute function public.set_updated_at();

-- ============================================================================
-- lessons
-- ============================================================================
create table if not exists public.lessons (
  id          uuid primary key default uuid_generate_v4(),
  course_id   uuid not null references public.courses (id) on delete cascade,
  slug        text not null,
  title       text not null,
  blurb       text not null default '',
  -- rewards
  xp          integer not null default 20 check (xp >= 0),
  gold        integer not null default 0 check (gold >= 0),
  -- ordering controls unlock sequence on the Campaign Map
  sort_order  integer not null default 0,
  -- optional: persisted markdown content (repo stays source of truth for now)
  content     text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  unique (course_id, slug)
);

create index if not exists lessons_course_order_idx
  on public.lessons (course_id, sort_order);

drop trigger if exists trg_lessons_updated_at on public.lessons;
create trigger trg_lessons_updated_at
  before update on public.lessons
  for each row execute function public.set_updated_at();

-- ============================================================================
-- user_progress  (per-user, per-lesson — the core loop record)
-- ============================================================================
create table if not exists public.user_progress (
  id           uuid primary key default uuid_generate_v4(),
  user_id      uuid not null references public.profiles (id) on delete cascade,
  lesson_id    uuid not null references public.lessons (id) on delete cascade,
  status       lesson_status not null default 'in_progress',
  attempts     integer not null default 0,
  xp_awarded   integer not null default 0,
  best_code    text,
  completed_at timestamptz,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  unique (user_id, lesson_id)
);

create index if not exists user_progress_user_idx on public.user_progress (user_id);

drop trigger if exists trg_user_progress_updated_at on public.user_progress;
create trigger trg_user_progress_updated_at
  before update on public.user_progress
  for each row execute function public.set_updated_at();

-- ============================================================================
-- achievements  (catalog)
-- ============================================================================
create table if not exists public.achievements (
  id          uuid primary key default uuid_generate_v4(),
  slug        text unique not null,
  title       text not null,
  description text not null default '',
  icon        text not null default '🏆',
  rarity      achievement_rarity not null default 'common',
  reward_xp   integer not null default 0,
  reward_gold integer not null default 0,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now()
);

-- ============================================================================
-- user_achievements  (join: who unlocked what, when)
-- ============================================================================
create table if not exists public.user_achievements (
  user_id        uuid not null references public.profiles (id) on delete cascade,
  achievement_id uuid not null references public.achievements (id) on delete cascade,
  unlocked_at    timestamptz not null default now(),
  primary key (user_id, achievement_id)
);

-- ============================================================================
-- push_subscriptions / follows / duels  (see migration 0003)
-- ============================================================================
create table if not exists public.push_subscriptions (
  id         uuid primary key default uuid_generate_v4(),
  user_id    uuid not null references public.profiles (id) on delete cascade,
  endpoint   text unique not null,
  p256dh     text not null,
  auth       text not null,
  created_at timestamptz not null default now()
);
create index if not exists push_subs_user_idx on public.push_subscriptions (user_id);

create table if not exists public.follows (
  follower_id  uuid not null references public.profiles (id) on delete cascade,
  following_id uuid not null references public.profiles (id) on delete cascade,
  created_at   timestamptz not null default now(),
  primary key (follower_id, following_id),
  check (follower_id <> following_id)
);
create index if not exists follows_following_idx on public.follows (following_id);

create table if not exists public.duels (
  id                  uuid primary key default uuid_generate_v4(),
  challenger_id       uuid not null references public.profiles (id) on delete cascade,
  opponent_id         uuid not null references public.profiles (id) on delete cascade,
  goal_lessons        integer not null default 5 check (goal_lessons > 0),
  challenger_progress integer not null default 0,
  opponent_progress   integer not null default 0,
  status              text not null default 'active',
  ends_at             timestamptz not null,
  created_at          timestamptz not null default now()
);
create index if not exists duels_participants_idx
  on public.duels (challenger_id, opponent_id);

-- ============================================================================
-- Row Level Security
-- ============================================================================
alter table public.profiles          enable row level security;
alter table public.courses           enable row level security;
alter table public.lessons           enable row level security;
alter table public.user_progress     enable row level security;
alter table public.achievements      enable row level security;
alter table public.user_achievements enable row level security;
alter table public.push_subscriptions enable row level security;
alter table public.follows            enable row level security;
alter table public.duels              enable row level security;

-- profiles: everyone can read (leaderboards); you may only edit your own.
drop policy if exists "profiles are viewable by everyone" on public.profiles;
create policy "profiles are viewable by everyone"
  on public.profiles for select using (true);

drop policy if exists "users update own profile" on public.profiles;
create policy "users update own profile"
  on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);

-- courses & lessons & achievements: public read (content is indexable / SEO).
drop policy if exists "courses are public" on public.courses;
create policy "courses are public" on public.courses for select using (true);

drop policy if exists "lessons are public" on public.lessons;
create policy "lessons are public" on public.lessons for select using (true);

drop policy if exists "achievements are public" on public.achievements;
create policy "achievements are public" on public.achievements for select using (true);

-- user_progress: a user may only see and mutate their own rows.
drop policy if exists "users read own progress" on public.user_progress;
create policy "users read own progress"
  on public.user_progress for select using (auth.uid() = user_id);

drop policy if exists "users write own progress" on public.user_progress;
create policy "users write own progress"
  on public.user_progress for insert with check (auth.uid() = user_id);

drop policy if exists "users update own progress" on public.user_progress;
create policy "users update own progress"
  on public.user_progress for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- user_achievements: a user may only see and insert their own unlocks.
drop policy if exists "users read own achievements" on public.user_achievements;
create policy "users read own achievements"
  on public.user_achievements for select using (auth.uid() = user_id);

drop policy if exists "users write own achievements" on public.user_achievements;
create policy "users write own achievements"
  on public.user_achievements for insert with check (auth.uid() = user_id);

-- push_subscriptions: a user fully manages their own rows.
drop policy if exists "users manage own push subs" on public.push_subscriptions;
create policy "users manage own push subs"
  on public.push_subscriptions for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- follows: public read; you only create/remove your own.
drop policy if exists "follows are viewable" on public.follows;
create policy "follows are viewable" on public.follows for select using (true);

drop policy if exists "users create own follows" on public.follows;
create policy "users create own follows"
  on public.follows for insert with check (auth.uid() = follower_id);

drop policy if exists "users delete own follows" on public.follows;
create policy "users delete own follows"
  on public.follows for delete using (auth.uid() = follower_id);

-- duels: participants read + update; challenger creates.
drop policy if exists "participants read duels" on public.duels;
create policy "participants read duels"
  on public.duels for select
  using (auth.uid() = challenger_id or auth.uid() = opponent_id);

drop policy if exists "challenger creates duels" on public.duels;
create policy "challenger creates duels"
  on public.duels for insert with check (auth.uid() = challenger_id);

drop policy if exists "participants update duels" on public.duels;
create policy "participants update duels"
  on public.duels for update
  using (auth.uid() = challenger_id or auth.uid() = opponent_id);
