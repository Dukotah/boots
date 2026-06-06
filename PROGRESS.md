# Progress Log

Running log, newest first. Glance here anytime.

## 2026-06-06
- **Owner-operator mode engaged.** Read the codebase; wrote `VISION.md`,
  `ROADMAP.md` (phased), `TASKS.md` (Phase 1), `DECISIONS.md`, this log.
- Read: mature platform (93 modules/656 lessons, full gamification + billing +
  tutor + CI + 191 unit tests). Gap = last mile (trustworthy, fast, live, tested).
- Diagnosed the #1 perf issue: lesson route ships ~638 kB because lesson client
  components import `lessonId` from the curriculum barrel, dragging in all 93
  lesson-content files. Starting Phase 1 with that fix (P1.1).
- Prior session work already on this branch (not yet merged): Daily Challenge,
  Portfolio Projects, ROADMAP-100, roadmap batch A–M (13 agents), CI test-gate +
  Monaco split, lesson-page code-splitting.
- **P1.1 done (honest):** split `lessonId` into `curriculum/ids.ts`. Expected a
  bundle drop; got none — webpack already tree-shook `MODULES`. Kept it as a
  guard. Real First-Load drivers are app-wide deps → re-scoped as P1.2.
- **P1.6 done:** added 9 component tests (XPBar, TestResults, AchievementProgressBar)
  + `test:coverage` script; fixed the vitest JSX runtime. **Suite now 200 tests, all
  green.** tsc clean, build 1490 pages.
- **Phase-1 PR opened: #17** (base `main`). CI running; verified green locally.
  Per DECISIONS, do not merge until migrations 0005–0007 are applied live.
- **P1.8 done:** go-live runbook reconciled to migrations 0001→0007 (+0006/0007
  notes, updated verify query, /teams table note, §9 Sentry pointer).
- Phase-1 status: P1.1 ✅ (guard), P1.6 ✅ (200 tests), P1.8 ✅. Remaining:
  P1.2 (bundle analysis), P1.3/P1.4 (server-validate quiz/HTML), P1.5 (XP
  anti-cheat), P1.7 (robustness states), P1.6b (store-connected component tests).
- Next up: P1.3/P1.4 server integrity (the core "trustworthy" DoD item).

## 2026-06-06 (cont.)
- **P1.3 done:** quiz completion is now server-validated. `/api/verify` checks
  submitted answers against the key via pure `lib/quizGrade.ts`; `QuizView` sends
  answers through new `verifyQuizCompletion`. Forgeable quiz XP is closed. Added 6
  unit tests → **suite 206**. tsc + build green (1490 pages).
- **P1.4 deferred (documented):** HTML grading uses computed styles in a rendered
  iframe; jsdom can't replicate CSS layout → a server grader would false-negative.
  Needs Playwright (future infra). HTML stays optimistic-record like Python/SQL.
- Remaining P1: P1.2 (bundle analysis), P1.5 (XP rate guard, low pri), P1.7
  (robustness states), P1.6b (store-connected component tests). Then plan Phase 2.
