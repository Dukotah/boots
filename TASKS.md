# Tasks — Phase 1: Production Hardening

Status: ⬜ todo · 🔄 doing · ✅ done · ⚠️ owner-gated

## Perf
- ✅ **P1.1** Extracted `lessonId` into a content-free module (`curriculum/ids.ts`)
  so lesson client components no longer import the barrel. *Outcome: kept as an
  architectural guard, but webpack was already tree-shaking `MODULES` out — the
  lesson route stayed 638 kB, so this was NOT the bundle culprit (honest result).*
- ⬜ **P1.2** Add `@next/bundle-analyzer`, identify the real First-Load drivers
  (suspected: `framer-motion` + `@supabase/supabase-js` via the store +
  `react-markdown`, all app-wide), and target them. Re-aim the < 500 kB goal here.

## Integrity
- ⬜ **P1.3** Server-validate quiz completion (extend `/api/verify` + `scoring`).
- ⬜ **P1.4** Server-validate HTML-lesson completion.
- ⬜ **P1.5** Basic XP anti-cheat: clamp/flag impossible XP rate on the server path.

## Test coverage
- ✅ **P1.6** Component tests for core presentational UI: `XPBar`, `TestResults`,
  `AchievementProgressBar` (9 tests). Added `test:coverage` script. Wired the
  React automatic JSX runtime into vitest so `.tsx` tests work. Suite: 200 tests.
- ⬜ **P1.6b** Extend component tests to store-connected UI (`DailyChallenge`,
  projects hub) — needs store-rendering harness.

## Robustness
- ⬜ **P1.7** Verify loading/empty/error states on primary routes (dashboard,
  lesson, learn, leaderboard, account, teams).

## Go-live readiness
- ⬜ **P1.8** Reconcile `docs/go-live.md` with migrations 0005–0007 and the new
  routes/crons; confirm every external dep graceful-degrades.

---
_When Phase 1 tasks are all ✅ and the DoD is met, plan Phase 2 here._
