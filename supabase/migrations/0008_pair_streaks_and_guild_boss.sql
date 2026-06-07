-- ============================================================================
-- 0008 — Pair streaks (study_buddies) + co-op weekly boss (guild_boss)
-- ============================================================================
-- study_buddies: two learners who study together accumulate a shared streak.
--   Each user owns their own side of the relationship (user_id = auth.uid()).
--   The client advances pair_streak and records last_advanced in the same
--   day-key format used by profiles.last_active_day ("YYYY-M-D"). No RPC
--   is needed — direct CRUD under RLS is fine because only the row owner
--   ever writes their side.
--
-- guild_boss: one shared row per (guild_id, week) representing the co-op
--   target that guild members chip away at together. All writes are funneled
--   through contribute_guild_boss_damage (SECURITY DEFINER) so clients can
--   never directly manipulate total_damage or defeated. The function uses an
--   INSERT … ON CONFLICT upsert to initialise the row on first hit and
--   atomically accumulate damage thereafter.
--
-- Idempotent — safe to re-run.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- study_buddies
-- ---------------------------------------------------------------------------
create table if not exists public.study_buddies (
  id            uuid        primary key default gen_random_uuid(),
  user_id       uuid        not null,
  buddy_id      uuid        not null,
  pair_streak   int         not null default 0,
  last_advanced text,
  created_at    timestamptz default now(),
  -- Inline unique constraint (ALTER TABLE … ADD CONSTRAINT IF NOT EXISTS is not
  -- supported by Postgres; inlining keeps the migration idempotent).
  constraint study_buddies_user_buddy_unique unique (user_id, buddy_id)
);

-- RLS: each user can only see and modify their own side of the pair.
alter table public.study_buddies enable row level security;

drop policy if exists "study_buddies_select_own" on public.study_buddies;
create policy "study_buddies_select_own"
  on public.study_buddies for select
  using (user_id = auth.uid());

drop policy if exists "study_buddies_insert_own" on public.study_buddies;
create policy "study_buddies_insert_own"
  on public.study_buddies for insert
  with check (user_id = auth.uid());

drop policy if exists "study_buddies_update_own" on public.study_buddies;
create policy "study_buddies_update_own"
  on public.study_buddies for update
  using (user_id = auth.uid());

drop policy if exists "study_buddies_delete_own" on public.study_buddies;
create policy "study_buddies_delete_own"
  on public.study_buddies for delete
  using (user_id = auth.uid());

-- ---------------------------------------------------------------------------
-- guild_boss
-- ---------------------------------------------------------------------------
create table if not exists public.guild_boss (
  id            uuid        primary key default gen_random_uuid(),
  guild_id      text        not null,
  week          text        not null,
  boss_id       text        not null,
  total_damage  int         not null default 0,
  defeated      boolean     not null default false,
  created_at    timestamptz default now(),
  -- Inline unique constraint — see note above.
  constraint guild_boss_guild_week_unique unique (guild_id, week)
);

-- RLS: any authenticated user can read the shared board; writes go through
-- the SECURITY DEFINER RPC only (no direct insert/update policy).
alter table public.guild_boss enable row level security;

drop policy if exists "guild_boss_select_authenticated" on public.guild_boss;
create policy "guild_boss_select_authenticated"
  on public.guild_boss for select
  to authenticated
  using (true);

-- ---------------------------------------------------------------------------
-- contribute_guild_boss_damage RPC
-- ---------------------------------------------------------------------------
-- Atomically adds p_damage to the running total for (guild_id, week),
-- creating the boss row if it does not yet exist. Negative damage is
-- silently clamped to 0 via greatest(). Returns the new total_damage.
-- SECURITY DEFINER allows the function to bypass RLS and write guild_boss
-- even though there is no client-facing insert/update policy.
-- ---------------------------------------------------------------------------
create or replace function public.contribute_guild_boss_damage(
  p_guild_id  text,
  p_week      text,
  p_boss_id   text,
  p_damage    int
)
returns int
language plpgsql
security definer
as $$
declare
  v_new_total int;
begin
  insert into public.guild_boss (guild_id, week, boss_id, total_damage)
  values (p_guild_id, p_week, p_boss_id, greatest(0, p_damage))
  on conflict (guild_id, week) do update
    set total_damage = guild_boss.total_damage + greatest(0, p_damage)
  returning total_damage into v_new_total;

  return v_new_total;
end;
$$;

grant execute on function public.contribute_guild_boss_damage(text, text, text, int)
  to authenticated;
