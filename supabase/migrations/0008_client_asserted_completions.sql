-- ============================================================================
-- Boots — Client-asserted completions for non-server-graded languages — 0008
-- ============================================================================
-- Python and SQL run in browser WASM runtimes we don't host server-side, so the
-- server can't re-grade them. Previously the client called complete_lesson() for
-- those — awarding full competitive credit (verified_xp + weekly_xp) on the
-- client's say-so, which let a learner mark a Python/SQL lesson "done" without
-- actually solving it and inflate the verified leaderboard / league ladder.
--
-- Fix: a separate complete_lesson_client() for client-asserted passes. It still
-- enforces the paywall and dedups, and grants COSMETIC credit (xp, gold, and the
-- `completed` array so cross-device progress + certificates keep working), but it
-- does NOT touch verified_xp or weekly_xp — the competitive metrics stay reserved
-- for server-verified (JS/TS) work. Completion rows are flagged `verified = false`
-- so they're distinguishable for any future re-grade/backfill.
--
-- When server-side Python/SQL grading lands, route those through complete_lesson()
-- (or a verified variant) instead and the competitive credit follows automatically.
--
-- Apply with `supabase db push` or the SQL editor. Idempotent. Requires 0007.
-- ============================================================================

-- Distinguish server-verified completions from client-asserted ones.
alter table public.user_progress
  add column if not exists verified boolean not null default true;

create or replace function public.complete_lesson_client(
  p_course_slug text,
  p_lesson_slug text
)
returns integer            -- cosmetic XP awarded (0 if gated / already done / unknown)
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

  -- Same paywall gate as complete_lesson().
  select is_pro, streak into v_is_pro, v_streak
  from public.profiles where id = v_uid;

  v_limit := 3 + least(6, greatest(0, coalesce(v_streak, 0)));
  if not (coalesce(v_is_pro, false) or coalesce(v_free, false) or v_sort < v_limit) then
    return 0;
  end if;

  insert into public.user_progress (user_id, lesson_id, status, attempts, xp_awarded, completed_at, verified)
  values (v_uid, v_lesson_id, 'completed', 1, v_xp, now(), false)
  on conflict (user_id, lesson_id) do update
    set attempts = public.user_progress.attempts + 1
  returning (xmax = 0) into v_inserted;

  if v_inserted then
    -- Cosmetic credit only: xp/gold/completed (for level display, cross-device
    -- progress, and certificate eligibility). NOT verified_xp / weekly_xp.
    update public.profiles
      set xp = xp + v_xp,
          gold = gold + round(v_xp * 0.5),
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

grant execute on function public.complete_lesson_client(text, text) to authenticated;
