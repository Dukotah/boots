-- ============================================================================
-- Boots — Authoritative scoring (server-side XP) — migration 0001
-- ============================================================================
-- Problem: today the browser computes XP and upserts it straight into
-- `profiles` (RLS lets a user update their own row), so a determined user could
-- forge XP and game the leaderboard / certificates.
--
-- Fix: award XP from a SECURITY DEFINER function that reads the *canonical* XP
-- from the `lessons` table (seeded from the repo curriculum — see
-- scripts/seed-curriculum-sql.ts) rather than trusting any client-supplied
-- amount, and records each completion exactly once in `user_progress`.
--
-- Apply with the Supabase SQL editor or `supabase db push`, after seeding
-- courses + lessons (supabase/seed.sql).
-- ============================================================================

create or replace function public.complete_lesson(
  p_course_slug text,
  p_lesson_slug text
)
returns integer            -- XP actually awarded (0 if already completed / unknown)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid       uuid := auth.uid();
  v_lesson    public.lessons%rowtype;
  v_key       text := p_course_slug || '/' || p_lesson_slug;
  v_inserted  boolean := false;
begin
  if v_uid is null then
    raise exception 'not authenticated';
  end if;

  -- Canonical lesson (and its XP) — the source of truth is the DB, not the client.
  select l.* into v_lesson
  from public.lessons l
  join public.courses c on c.id = l.course_id
  where c.slug = p_course_slug and l.slug = p_lesson_slug;

  if not found then
    return 0;  -- unknown lesson → award nothing
  end if;

  -- Record the completion. `xmax = 0` is true only for a fresh INSERT, so we can
  -- tell a first completion from a repeat and never double-award.
  insert into public.user_progress (user_id, lesson_id, status, attempts, xp_awarded, completed_at)
  values (v_uid, v_lesson.id, 'completed', 1, v_lesson.xp, now())
  on conflict (user_id, lesson_id) do update
    set attempts = public.user_progress.attempts + 1
  returning (xmax = 0) into v_inserted;

  if v_inserted then
    update public.profiles
      set xp = xp + v_lesson.xp,
          gold = gold + round(v_lesson.xp * 0.5),
          completed = case
            when v_key = any(completed) then completed
            else array_append(completed, v_key)
          end,
          last_active_day = current_date
      where id = v_uid;
    return v_lesson.xp;
  end if;

  return 0;
end $$;

grant execute on function public.complete_lesson(text, text) to authenticated;

-- ============================================================================
-- Hardening (enable once the client fully routes completions through the RPC):
-- Restrict the columns a client can write directly so XP/gold/completed can ONLY
-- change via complete_lesson(). The function is SECURITY DEFINER so it bypasses
-- this. Until then we leave the existing "users update own profile" policy in
-- place so the optimistic client mirror keeps working.
--
--   revoke update on public.profiles from authenticated;
--   grant update (username, display_name, avatar_url) on public.profiles to authenticated;
-- ============================================================================
