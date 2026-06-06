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
  (robustness states). Then plan Phase 2.

## 2026-06-06 (fleet round 2 — 7 agents)
- Ran a 7-agent fleet (disjoint ownership). Integrated all:
  - **NOTIFS:** in-app notifications center (derived feed + bell) → /notifications.
  - **RECAP:** "Your week in code" → /recap.
  - **CERTS:** Add-to-LinkedIn + verify link + Credential ID (Phase 2 credential).
  - **DAILY v2:** difficulty/tags/est-time/milestone copy (additive).
  - **TESTS:** +94 → **suite now 312 tests** (fixed 2 blind-test bugs).
  - **SEO + A11Y audits** → docs/seo-audit.md, docs/a11y-audit.md.
- Applied highest-value single-file audit wins: focus-visible ring on buttons +
  global prefers-reduced-motion (CSS) + framer MotionConfig; skip-to-content link
  + main landmark; robots.ts now disallows all private routes; /about in sitemap.
- Deferred (documented in audits): per-page noindex layouts (~20 files),
  focus-trap-react for drawers/modals (new dep), per-page OG images, JSON-LD
  Website/Organization. Founder call: ship single-file wins, log the rest.
- Green: tsc, 312 tests, build = 1492 static pages. Pushed to PR #17.

## 2026-06-06 (fleet round 3 — audit follow-ups, 5 agents)
- Cleared the deferred SEO + a11y audit items via 5 disjoint agents + integration:
  - **A11y focus traps:** dep-free `useFocusTrap` hook → mobile Sidebar drawer,
    lesson course-map drawer, account delete modal (role=dialog + aria-modal +
    Escape + focus restore). aria-current on active nav; progressbar roles on
    XP/quest bars; aria-pressed on regex flags; explicit input labels; aria-label
    on the streak pill; Escape-closes the mobile menu.
  - **SEO noindex:** 21 co-located `layout.tsx` with `robots: noindex` for private
    routes (+ I added /login). robots.ts now also disallows /login.
  - **SEO OG images:** per-page OG/Twitter cards via /api/og on 8 content routes;
    absolute OG urls.
  - **Structured data:** WebSite+SearchAction & Organization JSON-LD on the
    homepage; fixed courseJsonLd (dropped misused numberOfCredits); canonical on
    /pricing. Fixed the org logo ref to the real asset (/icon.svg).
- Green: tsc, 312 tests, clean build. (First build hit a transient OOM; `rm -rf
  .next` rebuild passed.) Pushed to PR #17.
