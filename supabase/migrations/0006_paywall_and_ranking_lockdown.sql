-- ============================================================================
-- Boots — Server-side paywall + ranking-column lockdown — migration 0006
-- ============================================================================
-- Closes two integrity holes found in the Pass 3 audit:
--
--   P0a  The paywall lived only in the client. `complete_lesson` awarded XP for
--        ANY lesson to ANY signed-in user, so a learner could call the RPC (or
--        POST /api/verify) for a locked lesson and collect XP without Pro. We now
--        gate the award inside the RPC using the same rule as src/lib/access.ts:
--        free course OR Pro OR within the streak-extended free-preview window.
--
--   P0b  The weekly league ladder + lesson-completion record were client-writable
--        (the "users update own profile" policy lets a browser UPDATE any column),
--        so weekly_xp / league_tier / completed could be forged. We make those
--        three columns server-authoritative: only complete_lesson (SECURITY
--        DEFINER) and the close-season cron (service role) may change them; direct
--        client writes are silently reverted to their old values.
--
--   Also: complete_lesson now bumps weekly_xp by the lesson's canonical XP, so the
--   league signal reflects *lesson effort only* (quest/achievement XP no longer
--   leaks into league standings — the invariant the achievements code already
--   protected, now enforced for every path).
--
-- NOTE: `xp` (all-time total) and `gold` remain client-writable for now because
-- achievement/quest rewards are still awarded client-side. The all-time XP
-- leaderboard is therefore still soft-trusted; moving achievement/quest awards
-- into SECURITY DEFINER RPCs (and then locking `xp`) is the follow-up to fully
-- close that. The competitive *weekly* ladder and certificates are hardened here.
--
-- Apply with the Supabase SQL editor or `supabase db push`. Idempotent.
-- ============================================================================

-- 1) Mark which courses are free (public-good lead magnets). Mirrors `free: true`
--    in the repo curriculum. Seeded explicitly so the gate is correct even if
--    you haven't re-run scripts/seed-curriculum-sql.ts.
alter table public.courses
  add column if not exists free boolean not null default false;

update public.courses set free = true where slug in (
  'ai-foundations', 'ai-responsible', 'ai-ethics',
  'digital-safety', 'hacker-mindset', 'network-security',
  'internet-for-kids', 'ai-safety-kids', 'digital-citizenship', 'kids-logic'
);

-- 2) Authoritative completion: gate on the paywall, award canonical XP/gold, and
--    bump the weekly league signal — all from the DB, none of it client-trusted.
create or replace function public.complete_lesson(
  p_course_slug text,
  p_lesson_slug text
)
returns integer            -- XP actually awarded (0 if gated / already done / unknown)
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

  -- Canonical lesson (XP, position) + whether its course is free. Source of
  -- truth is the DB, not the client.
  select l.id, l.xp, l.sort_order, c.free
    into v_lesson_id, v_xp, v_sort, v_free
  from public.lessons l
  join public.courses c on c.id = l.course_id
  where c.slug = p_course_slug and l.slug = p_lesson_slug;

  if not found then
    return 0;  -- unknown lesson → award nothing
  end if;

  -- Paywall gate — mirrors canInteract() / freeLessonLimit() in src/lib/access.ts:
  --   free preview = first 3 lessons, +1 per streak day up to +6.
  select is_pro, streak into v_is_pro, v_streak
  from public.profiles where id = v_uid;

  v_limit := 3 + least(6, greatest(0, coalesce(v_streak, 0)));
  if not (coalesce(v_is_pro, false) or coalesce(v_free, false) or v_sort < v_limit) then
    return 0;  -- locked lesson, no Pro → award nothing (paywall enforced)
  end if;

  -- Record the completion. `xmax = 0` is true only for a fresh INSERT, so we can
  -- tell a first completion from a repeat and never double-award.
  insert into public.user_progress (user_id, lesson_id, status, attempts, xp_awarded, completed_at)
  values (v_uid, v_lesson_id, 'completed', 1, v_xp, now())
  on conflict (user_id, lesson_id) do update
    set attempts = public.user_progress.attempts + 1
  returning (xmax = 0) into v_inserted;

  if v_inserted then
    update public.profiles
      set xp = xp + v_xp,
          gold = gold + round(v_xp * 0.5),
          weekly_xp = weekly_xp + v_xp,   -- league signal = lesson effort only
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

-- 3) Lock the ranking/entitlement columns from direct client writes. The
--    SECURITY DEFINER complete_lesson() and the service-role close-season cron
--    both run as a privileged role, so they bypass this; the browser
--    (authenticated role) cannot forge the weekly ladder or completion record.
create or replace function public.protect_ranking_columns()
returns trigger language plpgsql as $$
begin
  if current_user not in ('service_role', 'postgres', 'supabase_admin') then
    new.weekly_xp   := old.weekly_xp;
    new.completed   := old.completed;
    new.league_tier := old.league_tier;
  end if;
  return new;
end $$;

drop trigger if exists trg_profiles_protect_ranking on public.profiles;
create trigger trg_profiles_protect_ranking
  before update on public.profiles
  for each row execute function public.protect_ranking_columns();
