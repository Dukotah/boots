# Cantrip — Roadmap (Pass 2)

Prioritized improvements from the Pass 1 audit, ranked by impact x effort. Each item lists the problem, the proposed change, files touched, and rough effort (S = <0.5 day, M = ~1-2 days, L = 3+ days). Mix of fixes and net-new features. "Status" notes anything already shipped in this pass.

Ranking key: do the top of each tier first. Effort is for one engineer.

## Tier 1 — High impact, low effort (do now)

### 1.1 Pricing copy accuracy + streak-unlock nudge  [FIX] [SHIPPED]
Problem: Free tier advertised "2 lessons" but code grants 3 + streak unlocks. Change: corrected the copy and surfaced the streak unlock. Files: `src/components/features/billing/PricingPlans.tsx`. Effort: S. Status: shipped in PR #8.

### 1.2 Fix how-to page titles  [FIX] [SEO]
Problem: titles like "How to middleware in JavaScript" are ungrammatical across ~hundreds of indexed pages. Change: add an optional `howToTitle` (or `verb`) field to the lesson type and use it in the how-to generator; fall back to a verb-prefixed template ("How to use X", "How to build X"). Files: `src/lib/curriculum/types.ts`, the how-to page generator under `src/app/how-to/`, and a one-time pass over lesson data. Effort: M. Impact: high for SEO-first strategy.

### 1.3 De-duplicate metadata title suffix  [FIX] [SEO]
Problem: `/pricing` renders "Pricing | Cantrip | Cantrip". Change: audit pages that hard-code the brand and let the root layout `title.template` own the suffix. Files: `src/app/pricing/page.tsx` and any other page metadata; `src/app/layout.tsx` (verify template). Effort: S.

### 1.4 Remove PROMPT.md from the tree  [FIX]
Problem: the agent self-brief shipped in PR #7. Change: `git rm PROMPT.md` (already gitignored). Files: `PROMPT.md`. Effort: S.

### 1.5 File the 15 "More courses" into tracks  [CONSISTENCY]
Problem: a 15-card miscellaneous bucket reads as unfinished. Change: assign TypeScript/async/closures/etc. to existing tracks (Foundations, JS Deep Dives) or add a "Modern JS" + "Python Deep Dives" + "SQL Deep Dives" track. Files: `src/lib/curriculum/tracks.ts` only (data). Effort: S.


## Tier 2 — High impact, medium effort (next)

### 2.1 Spaced-repetition Review Mode  [FEATURE] [LEARNING]
Problem: the store ALREADY tracks Leitner `reviews` + `dueReviews()`, but there's no UI to do a review session. Change: a `/review` page that pulls `dueReviews()`, re-presents those lessons' tests, and pays the Scholar `reviewGold`. Pure win — the data layer exists. Files: new `src/app/review/page.tsx`, reuse `LessonView`/runner, a dashboard "Reviews due" card. Effort: M. Impact: huge retention lever, low risk.

### 2.2 "Boss fight" cumulative challenges  [FEATURE] [LEARNING]
Problem: leagues have a boss, but there's no skills boss that tests a track's cumulative concepts. Change: per-track capstone that pulls 3-5 auto-graded tasks from across the track into one timed gauntlet. Files: new curriculum `kind: "boss"` or a `bosses.ts`, a runner wrapper, results screen. Effort: L. Reuses the JS worker; no new infra.

### 2.3 Streak-recovery UX  [FEATURE] [RETENTION]
Problem: missing a day silently resets the streak (unless a freeze is held). Change: a one-tap "repair streak" on next visit (cost: gold or watch a value moment), plus a clear "you have N freezes" surface on the dashboard. Files: `useGameStore` (a `repairStreak` action), dashboard streak card. Effort: M.

### 2.4 Shareable profile / certificate cards  [FEATURE] [SOCIAL] [SEO]
Problem: profiles exist at `/u/:name` and certificates at `/certificate/:slug`, but there's no OG-image share card. Change: dynamic OG images (`opengraph-image.tsx`) for profile + certificate so a LinkedIn/Twitter share renders a branded card with rank/%/trophies. Files: `src/app/u/[name]/opengraph-image.tsx`, `src/app/certificate/[slug]/opengraph-image.tsx`. Effort: M. Doubles as growth + SEO.

### 2.5 New auto-gradeable tracks: Go, Rust, Docker basics  [CONTENT]
Problem: catalog lacks Go/Rust/Docker. Constraint: must be client-side gradeable. Change: model them like the React/Node lessons — teach the language in prose, grade a deterministic pure-JS shape (or, for Docker, a quiz + "predict the command output" string task). Go/Rust syntax lessons can be quiz-heavy; logic exercises stay JS-modelled. Files: new curriculum modules + tracks entry. Effort: L. Only do once 1.5 lands so the catalog reads clean.


## Tier 3 — Polish & infrastructure

### 3.1 Warm the code runner to cut first-run latency  [PERF]
Problem: first Run blocks ~1s compiling the JS worker. Change: prefetch/instantiate the worker on lesson mount (idle), show a "compiling runtime" state. Files: `src/lib/runner.ts`, worker bootstrap, `LessonView`. Effort: M.

### 3.2 Numeric-index lesson redirect  [POLISH]
Problem: `/learn/:course/1` 404s. Change: catch a numeric segment and redirect to the Nth lesson slug. Files: lesson route. Effort: S.

### 3.3 Quiz badge in course lists  [POLISH]
Problem: quiz lessons aren't visually distinguished. Change: render a small "Quiz" chip when `kind==='quiz'`. Files: `LessonList`, `LessonSidebar`. Effort: S.

### 3.4 Bump CI to Node 24 actions  [INFRA]
Problem: deprecated Node 20 actions. Change: `actions/checkout@v5`, `actions/setup-node@v5`. Files: `.github/workflows/ci.yml`. Effort: S.

### 3.5 Accessibility & i18n groundwork  [A11Y]
Problem: no i18n scaffolding; verify focus management on the lesson drawer and reduced-motion on confetti/framer animations. Change: audit `prefers-reduced-motion`, ensure the mobile course-map drawer traps focus and restores it on close, add an i18n string-extraction seam. Files: `LessonSidebar`, `celebrate`, motion components. Effort: M (a11y) + L (i18n, deferred).

---

## Tier 4 — Bigger bets (validate first)

Weekly email/push recap (the `push` feature scaffold exists), league promotion/relegation "drama" notifications, guild activity feed, per-lesson difficulty feedback (thumbs up/down feeding a difficulty signal), and frontend system-design lessons as quiz + diagram-reasoning tasks. Each is M-L and worth a design spike before building.

---

## Already shipped this pass

PR #7 merged (React + Node.js + TypeScript courses, lesson UX: progress sidebar, prev/next, first-pass confetti, richer test diffs, path roadmap). PR #8 opened (pricing free-tier copy fix). See AUDIT.md for the full Pass 1 findings.
