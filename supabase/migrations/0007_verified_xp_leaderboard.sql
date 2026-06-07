-- ============================================================================
-- Boots — Server-authoritative leaderboard XP — migration 0007
-- ============================================================================
-- Closes the residual from Pass 3: the all-time leaderboard ranked by `profiles.xp`,
-- which the client can still write directly (achievement/quest bonuses are awarded
-- client-side, so `xp` can't simply be locked without reworking the whole economy).
--
-- Fix: add `verified_xp` — the sum of XP the SERVER actually awarded for completed
-- lessons (via complete_lesson). It is locked from client writes (only the
-- SECURITY DEFINER RPC and service role may change it) and the all-time leaderboard
-- ranks by it. This mirrors how `weekly_xp` already works for the league ladder:
-- the competitive metric reflects verified lesson effort, not forgeable client totals.
--
-- The cosmetic `xp`/`gold` totals (which include achievement/quest bonuses) stay
-- client-mirrored — forging them only inflates a user's own level display and
-- affects no ranking or entitlement. `gold` is a soft currency (earned, never sold),
-- so it is intentionally left client-trusted.
--
-- Apply with `supabase db push` or the SQL editor. Idempotent. Requires 0006.
-- ============================================================================

-- 1) The verified, server-only XP total.
alter table public.profiles
  add column if not exists verified_xp integer not null default 0 check (verified_xp >= 0);

-- 2) Backfill from the authoritative completion record so existing players keep
--    their real standing.
update public.profiles p
  set verified_xp = coalesce((
    select sum(up.xp_awarded)
    from public.user_progress up
    where up.user_id = p.id and up.status = 'completed'
  ), 0);

-- 3) complete_lesson now also accumulates verified_xp (re-declared in full with the
--    paywall gate + weekly bump from 0006, plus the verified_xp line).
create or replace function public.complete_lesson(
  p_course_slug text,
  p_lesson_slug text
)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid       uuid := auth.uid();
  v_lesson_id uuid;
  v_xp        integer;
  v_sort      integer;
  v_free      boolean;
  v_is_pro    boolean;
  v_streak    integer;
  v_limit     integer;
  v_key       text := p_course_slug || '/' || p_lesson_slug;
  v_inserted  boolean := false;
begin
  if v_uid is null then
    raise exception 'not authenticated';
  end if;

  select l.id, l.xp, l.sort_order, c.free
    into v_lesson_id, v_xp, v_sort, v_free
  from public.lessons l
  join public.courses c on c.id = l.course_id
  where c.slug = p_course_slug and l.slug = p_lesson_slug;

  if not found then
    return 0;
  end if;

  select is_pro, streak into v_is_pro, v_streak
  from public.profiles where id = v_uid;

  v_limit := 3 + least(6, greatest(0, coalesce(v_streak, 0)));
  if not (coalesce(v_is_pro, false) or coalesce(v_free, false) or v_sort < v_limit) then
    return 0;
  end if;

  insert into public.user_progress (user_id, lesson_id, status, attempts, xp_awarded, completed_at)
  values (v_uid, v_lesson_id, 'completed', 1, v_xp, now())
  on conflict (user_id, lesson_id) do update
    set attempts = public.user_progress.attempts + 1
  returning (xmax = 0) into v_inserted;

  if v_inserted then
    update public.profiles
      set xp = xp + v_xp,
          verified_xp = verified_xp + v_xp,   -- server-authoritative leaderboard total
          gold = gold + round(v_xp * 0.5),
          weekly_xp = weekly_xp + v_xp,
          completed = case
            when v_key = any(completed) then completed
            else array_append(completed, v_key)
          end,
          last_active_day = current_date
      where id = v_uid;
    return v_xp;
  end if;

  return 0;
end $$;

grant execute on function public.complete_lesson(text, text) to authenticated;

-- 4) Lock verified_xp from client writes too (alongside weekly_xp/completed/league_tier).
create or replace function public.protect_ranking_columns()
returns trigger language plpgsql as $$
begin
  if current_user not in ('service_role', 'postgres', 'supabase_admin') then
    new.weekly_xp   := old.weekly_xp;
    new.verified_xp := old.verified_xp;
    new.completed   := old.completed;
    new.league_tier := old.league_tier;
  end if;
  return new;
end $$;

drop trigger if exists trg_profiles_protect_ranking on public.profiles;
create trigger trg_profiles_protect_ranking
  before update on public.profiles
  for each row execute function public.protect_ranking_columns();
