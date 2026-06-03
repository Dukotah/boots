-- ============================================================================
-- 0003 — Gamification expansion
--   • server-authoritative weekly league fields on profiles
--   • web push subscriptions
--   • social: follows + duels
-- ============================================================================

-- ── Leagues: weekly XP + tier live on the profile (synced by the client; the
--    close-season cron resets them and applies promotion/relegation). ──
alter table public.profiles
  add column if not exists weekly_xp    integer not null default 0 check (weekly_xp >= 0),
  add column if not exists league_tier  integer not null default 0 check (league_tier >= 0),
  add column if not exists season_start text;

create index if not exists profiles_weekly_xp_idx on public.profiles (weekly_xp desc);

-- ── Web push subscriptions (one per device endpoint) ──
create table if not exists public.push_subscriptions (
  id         uuid primary key default uuid_generate_v4(),
  user_id    uuid not null references public.profiles (id) on delete cascade,
  endpoint   text unique not null,
  p256dh     text not null,
  auth       text not null,
  created_at timestamptz not null default now()
);
create index if not exists push_subs_user_idx on public.push_subscriptions (user_id);

alter table public.push_subscriptions enable row level security;

drop policy if exists "users manage own push subs" on public.push_subscriptions;
create policy "users manage own push subs"
  on public.push_subscriptions for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ── Social graph: follows ──
create table if not exists public.follows (
  follower_id  uuid not null references public.profiles (id) on delete cascade,
  following_id uuid not null references public.profiles (id) on delete cascade,
  created_at   timestamptz not null default now(),
  primary key (follower_id, following_id),
  check (follower_id <> following_id)
);
create index if not exists follows_following_idx on public.follows (following_id);

alter table public.follows enable row level security;

-- Follows are public (friend lists / counts); you may only create/remove your own.
drop policy if exists "follows are viewable" on public.follows;
create policy "follows are viewable" on public.follows for select using (true);

drop policy if exists "users create own follows" on public.follows;
create policy "users create own follows"
  on public.follows for insert with check (auth.uid() = follower_id);

drop policy if exists "users delete own follows" on public.follows;
create policy "users delete own follows"
  on public.follows for delete using (auth.uid() = follower_id);

-- ── Duels: a head-to-head "first to N lessons" challenge ──
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

alter table public.duels enable row level security;

-- A participant may read their duels; the challenger creates them; either party
-- may update progress/status.
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
