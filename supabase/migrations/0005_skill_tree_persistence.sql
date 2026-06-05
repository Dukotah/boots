-- ============================================================================
-- 0005 — Skill tree & cosmetic persistence + sync revision
-- ============================================================================
-- The client syncs xp/gold/streak/completed/achievements/league to profiles,
-- but talents, cosmetics, the equipped loadout, streak freezes, and guild
-- membership were localStorage-only — so a gold-bought cosmetic or a built-out
-- skill tree silently vanished on a new device. Add the missing columns.
--
-- `rev` is a monotonically increasing sync revision the client bumps on every
-- write. On sign-in the client compares revisions to resolve last-writer-wins
-- for consumable/preference fields (gold, streak_freezes, equipped) instead of
-- the old Math.max merge, which could refund already-spent gold.
--
-- All columns are client-writable under the existing "users update own profile"
-- policy (they are NOT billing columns, so the protect_billing trigger ignores
-- them). Idempotent — safe to re-run.
-- ============================================================================

alter table public.profiles
  add column if not exists cosmetics      text[]  not null default '{}',
  add column if not exists talents        text[]  not null default '{}',
  add column if not exists equipped       jsonb   not null default '{}'::jsonb,
  add column if not exists streak_freezes integer not null default 0 check (streak_freezes >= 0),
  add column if not exists guild_id       text,
  add column if not exists guild_name     text,
  add column if not exists rev            integer not null default 0;
