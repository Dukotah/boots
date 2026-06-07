# Cantrip — Audit & Self-Improve (Pass 3)

Fresh full-app audit (security, core flow, SEO, performance, a11y) on top of the
shipped Pass 2 roadmap. Findings were verified against source, then fixed in this
pass. Severity legend matches AUDIT.md (P0 critical → P3 cosmetic).

## ⚠️ Action required to activate the security fixes

`supabase/migrations/0006_paywall_and_ranking_lockdown.sql` must be applied to the
live database (`supabase db push`, or paste into the Supabase SQL editor). Until
it runs, the server-side paywall gate in the RPC and the anti-forge column lock
are not active. The app keeps working without it; the hardening just isn't live.

## Fixed in this pass

### P0 — Server-side paywall enforcement  [SECURITY] [REVENUE]
`/api/verify` awarded XP for any lesson to any signed-in user, and `complete_lesson`
didn't gate either — so a learner could claim locked (Pro) lessons by calling the
RPC or POSTing to the route. Now both enforce the same rule as `lib/access.ts`
(free course OR Pro OR within the streak-extended free-preview window). The route
also refuses locked lessons before running the sandbox.
Files: `src/app/api/verify/route.ts`, `migrations/0006`, `src/lib/access.ts` (reused).

### P0 — Ranking columns locked against client forgery  [SECURITY]
The "users update own profile" RLS policy let the browser write `weekly_xp`,
`completed`, and `league_tier` directly (the optimistic mirror upserted them), so
the weekly league ladder and certificate-eligibility could be forged. Migration
0006 adds a trigger that reverts client writes to those three columns; only
`complete_lesson` (SECURITY DEFINER) and the close-season cron (service role) can
change them. `complete_lesson` now also bumps `weekly_xp` so the ladder reflects
real lesson effort. The client stopped sending those columns.
Files: `migrations/0006`, `src/store/useGameStore.ts`, `scripts/seed-curriculum-sql.ts`.
**Residual:** all-time `xp` and `gold` remain client-mirrored (achievement/quest
rewards are still client-side), so the all-time XP leaderboard is still
soft-trusted. Closing it = moving achievement/quest awards into SECURITY DEFINER
RPCs, then locking `xp`. Tracked as the follow-up.

### P1 — Grading sandbox hardened  [SECURITY]
`gradeJsOrTs` ran untrusted code in a bare `node:vm` (escapable) with secrets in
`process.env` and no memory cap. It now runs in a dedicated `worker_thread` with
an **empty env** (a vm escape can't read the service-role/Stripe keys) and
`resourceLimits` (a memory bomb is killed, not OOM), keeping the fresh vm context
+ per-test timeout + a wall-clock terminate.
File: `src/lib/serverGrade.ts`.

### P1 — SQL grader empty-set false-pass  [CORRECTNESS]
A no-op/empty query could "match" a reference query that also returned nothing.
Degenerate (empty) student results now never pass.
File: `src/lib/runner.ts`.

### P0/P1 — Code-runner latency  [PERF]
The JS worker was spawned and torn down on every Run (the ~1.1s first-Run INP).
It's now a single long-lived worker, warmed on lesson mount and reused via
id-correlated messages (rebuilt only after a timeout). Monaco is loaded via
`next/dynamic` (ssr:false), and `canvas-confetti` + `sucrase` are imported on
demand — all out of the lesson's initial bundle.
Files: `src/lib/runner.ts`, `src/workers/codeRunner.ts`, `src/components/LessonView.tsx`,
`src/lib/celebrate.ts`.

### P1 — Accessibility  [A11Y]
Global `<MotionConfig reducedMotion="user">` honours OS reduce-motion for every
framer-motion animation. The mobile course-map drawer is now a proper modal:
`role="dialog"`/`aria-modal`, focus moved in on open, focus trapped on Tab, closed
on Escape, background scroll locked, focus restored to the toggle on close.
Files: `src/components/MotionProvider.tsx` (new), `src/app/layout.tsx`,
`src/components/LessonSidebar.tsx`.

### P2 — Leagues & streak economy
- Idle high-tier players now relegate (close-season no longer skips `weekly_xp = 0`).
- Quest / weekly-quest / chain-step XP no longer feeds `weekly_xp` (league = lesson
  effort only — also now enforced server-side).
- A broken-streak repair expires a day or two after the break (`lostStreakDay`),
  so a stale streak can't be bought back weeks later.
Files: `src/app/api/leagues/close-season/route.ts`, `src/store/useGameStore.ts`.

### P2 — SEO
- `robots.ts` now disallows the signed-in app shells (dashboard, profile, shop,
  quests, leaderboard, friends, guilds, leagues, events, boss, career, review,
  skill-tree, achievements, offline) so thin client-only pages don't get indexed.
  Public profiles at `/u/*` stay crawlable (shareable, have OG cards).
- Sitewide `Organization` + `WebSite` JSON-LD added in the root layout.
Files: `src/app/robots.ts`, `src/app/layout.tsx`.

### P1/P2/P3 — Second batch (SEO polish, replay hardening, UX)
- **Thin certificate pages** (`/certificate/[module]`, ~22 near-identical gated
  shells) are now `noindex` and removed from the sitemap — still shareable (OG
  card intact), no longer diluting crawl budget.
- **Missing canonicals** added to `/pricing` and `/map`; `/about` (a real content
  page) added to the sitemap.
- **Stripe webhook replay window** — the signature's timestamp must now be within
  5 minutes, so a captured valid webhook can't be replayed (e.g. a stale
  `subscription.deleted` flipping Pro off after a re-subscribe).
- **Route loading skeletons** — `loading.tsx` for the lesson, course, and
  dashboard routes so navigation shows on-brand skeletons instead of a blank gap.
Files: `src/app/certificate/[module]/page.tsx`, `src/app/sitemap.ts`,
`src/app/pricing/page.tsx`, `src/app/map/page.tsx`,
`src/app/api/stripe/webhook/route.ts`, `src/app/{learn/[module],learn/[module]/[lesson],dashboard}/loading.tsx`.

## Verified already-resolved (no action)
How-to title grammar (`howToTitle`/`buildHowtoTitle`), numeric-index lesson
redirect, quiz/project badges in lists, per-page canonicals on content surfaces,
and the doubled-suffix metadata bug are all fixed in prior passes.

## Verification
`tsc --noEmit` clean · `next build` succeeds · `npm run check` (915 tests),
`check:logic`, `check:quality`, `check:viz` all green.

### P0/P1 — Third batch (closing the residual security loopholes)
- **All-time leaderboard forge closed** (migration 0007). Added `verified_xp` — the
  server-summed XP for completed lessons, locked from client writes — and the
  all-time board now ranks by it. Forging the cosmetic `xp` total only inflates a
  user's own level display; it no longer affects rankings. (Same principle already
  applied to `weekly_xp` for leagues.) `gold` stays client-trusted by design (soft
  currency, never sold).
  Files: `migrations/0007`, `src/store/useGameStore.ts`, `src/app/leaderboard/page.tsx`,
  `src/types/database.ts`.
- **Python/SQL unverified-award hole closed** (migration 0008). Those languages run
  in browser WASM we don't host server-side, so they can't be re-graded. They now
  award via `complete_lesson_client` — cosmetic credit only (xp/gold/completed for
  level + cross-device progress + certificates), never the competitive
  `verified_xp`/`weekly_xp`. A self-claimed Python/SQL completion can't touch the
  leaderboard or league.
  Files: `migrations/0008`, `src/lib/scoring.ts`.

## Deferred (next pass)
Server-side Python/SQL *grading* (host Pyodide/sql.js in a function) to restore
full competitive credit for those languages — until then they earn cosmetic credit
only. Certificate eligibility for Python/SQL remains client-asserted (a personal,
non-competitive achievement — low severity). The `pullFromServer` client-`rev`
race (P1) and per-instance tutor rate limiter (P3, needs Upstash) also remain.
