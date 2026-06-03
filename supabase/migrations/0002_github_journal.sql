-- ============================================================================
-- 0002 — GitHub "coding journey" integration
-- ============================================================================
-- Links a learner's profile to a GitHub App installation + target repo, so
-- completing lessons can commit their solutions + a progress README to a repo
-- they own (lighting up their contribution graph with real learning activity).
--
-- Only the user may write these columns (existing RLS "users update own profile"
-- already covers it). The installation id alone grants no access without the
-- App's private key, which lives server-side only.
-- ============================================================================

alter table public.profiles
  add column if not exists github_login           text,
  add column if not exists github_installation_id bigint,
  add column if not exists github_repo            text;
