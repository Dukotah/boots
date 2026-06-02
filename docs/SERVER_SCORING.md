# Server-Authoritative Scoring (#7)

Make XP and lesson completions **trustworthy** so leagues, leaderboards, and
certificates can't be gamed — without breaking the instant, optimistic UI.

## The problem
Originally the browser computed XP and upserted it straight into `profiles`
(RLS lets a user edit their own row). A determined user could forge XP.

## The model
1. **Canonical XP lives in the database.** `courses` + `lessons` are seeded from
   the repo curriculum (`npm run seed:sql` → `supabase/seed.sql`), so every
   lesson's XP matches the code.
2. **A SECURITY DEFINER RPC awards it.** `public.complete_lesson(course_slug,
   lesson_slug)` (migration `supabase/migrations/0001_authoritative_scoring.sql`):
   - looks up the lesson's XP from `lessons` (ignores any client-supplied amount),
   - records the completion in `user_progress` (unique per user+lesson),
   - awards XP/gold **only on the first** completion (detected via `xmax = 0`),
   - returns the XP awarded.
3. **The client calls it best-effort.** On a passing run, `LessonView` calls
   `recordCompletion(courseSlug, lessonSlug)` (`src/lib/scoring.ts`). It no-ops
   when Supabase isn't configured or the user is signed out, so local-only play
   still works. The Zustand store remains the instant optimistic UI.

## Setup (on a live Supabase project)
```bash
# 1. Apply the base schema (if not already)
#    supabase/schema.sql
# 2. Seed canonical courses + lessons
npm run seed:sql           # regenerates supabase/seed.sql
#    then run supabase/seed.sql in the SQL editor (or `supabase db push`)
# 3. Apply the scoring RPC
#    supabase/migrations/0001_authoritative_scoring.sql
```
Re-run `npm run seed:sql` whenever the curriculum changes so DB XP stays in sync.

## Hardening (final lock-down)
Once the client fully relies on the RPC, revoke direct XP writes so `profiles.xp`
can **only** change via `complete_lesson` (commented at the bottom of the
migration):
```sql
revoke update on public.profiles from authenticated;
grant  update (username, display_name, avatar_url) on public.profiles to authenticated;
```
After this, `useGameStore`'s profile upsert should stop sending `xp/gold/completed`
(let the RPC own them) and instead pull the authoritative totals back.

## Out of scope (next layer)
This makes the **XP amount** and **dedup** authoritative. It does **not** yet
re-execute the learner's code on the server to verify they actually solved it —
that needs a sandboxed execution service (Judge0 / Firecracker) and is the
natural follow-on for fully tamper-proof grading.
