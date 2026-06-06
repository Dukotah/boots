-- ============================================================================
-- 0007 — Client-state sync: goal, onboarding flag, daily-challenge fields
-- ============================================================================
-- `goal`, `onboarded`, `daily_challenge_claimed`, `daily_challenge_streak`, and
-- `daily_challenge_best` were persisted to localStorage only — they silently
-- vanished whenever a learner switched devices or cleared storage. This migration
-- adds the five missing columns to `profiles` so the store can round-trip them.
--
-- Design notes:
--   • `goal` is the LearnerGoal id the learner picked (or null = skipped /
--     not yet set). It is a short opaque text id — not an enum — so adding new
--     goal options later never requires a schema migration.
--   • `onboarded` is a simple flag; once true it can never go back to false,
--     so last-writer-wins is safe (the pull merge uses `local.onboarded ||
--     remote.onboarded`).
--   • `daily_challenge_claimed` is the local day-key ("YYYY-M-D" format) on
--     which the learner last claimed the challenge bonus. Null = never claimed.
--   • `daily_challenge_streak` and `daily_challenge_best` are monotonically
--     interesting: the streak can fall (a missed day resets it), so the merge
--     uses last-writer-wins (rev); `best` is a high-water mark so the merge
--     uses Math.max like xp/league_tier.
--
-- All five columns are client-writable under the existing "users update own
-- profile" policy — none of them are billing columns, so the protect_billing
-- trigger ignores them. Idempotent — safe to re-run.
-- ============================================================================

alter table public.profiles
  add column if not exists goal                    text,
  add column if not exists onboarded               boolean not null default false,
  add column if not exists daily_challenge_claimed text,
  add column if not exists daily_challenge_streak  integer not null default 0,
  add column if not exists daily_challenge_best    integer not null default 0;
