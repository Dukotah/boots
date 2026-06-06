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
- ✅ **P1.3** Server-validate quiz completion. `/api/verify` now checks submitted
  answers against the key (pure `lib/quizGrade.ts`, 6 unit tests) and awards XP
  only on all-correct; `QuizView` sends answers via `verifyQuizCompletion`.
- ⛔ **P1.4** Server-validate HTML completion — **deferred (documented).** HTML
  tests use `getComputedStyle` on a rendered iframe; jsdom can't replicate CSS
  layout, so a server grader would false-negative and wrongly block XP. Needs a
  headless browser (Playwright) — a separate infra task. HTML stays in the
  optimistic-record bucket with Python/SQL until then.
- ⬜ **P1.5** Basic XP anti-cheat: rate/anomaly guard. (Lower priority — the
  `complete_lesson` RPC already awards canonical XP server-side and dedupes, so
  XP isn't inflatable per lesson; the residual vector is bulk-completion speed.)

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
- ✅ **P1.8** Reconciled `docs/go-live.md`: migrations now `0001→0007` (added 0006
  referrals + 0007 client-state with an updated verify query), `/teams` waitlist
  table note, and a §9 Sentry activation pointer.

---
_When Phase 1 tasks are all ✅ and the DoD is met, plan Phase 2 here._
