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
- Next: P1.3/P1.4 server-validate quiz/HTML completion (integrity), then P1.2
  bundle analysis. Opening the Phase-1 PR now.
