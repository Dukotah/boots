# Cantrip — Self-Improvement Brief (for the Claude desktop agent)

You are the lead engineer on Cantrip — a gamified, in-browser coding-education platform
(Duolingo-for-developers). Next.js App Router + TypeScript + Tailwind + Zustand + Supabase,
deployed on Vercel. Dark RPG theme (#0d0d14 bg, #13131f cards, purple #8b5cf6 accent,
gold #f59e0b for XP, green #22c55e for pass). All code runs client-side (JS in a Worker,
Python via Pyodide, SQL via sql.js). Game systems: XP, gold, levels (Intern→Archmage),
streaks/freezes, leagues, guilds, achievements, skill tree/talents, seasonal events,
Career Pack, daily quests. Copy uses RPG tone ("quest", "rank up", "archmage").

## Context — start here

There is an OPEN PR (#7, branch `feat/courses-and-lesson-ux`) adding React/Node/TypeScript
courses, a lesson progress sidebar + prev/next nav + first-pass confetti + "Explain this
to me" tutor button + richer test-result diffs, and a visual path roadmap. **Review it first:**
check correctness, that it matches current `main`'s conventions (inline `TutorPanel`, the
`hintCode`/`blocks` hint system, the access/paywall gate, `useGameStore` APIs), that new
lessons are auto-gradeable (`npm run check` must stay green), and a11y/mobile. Leave review
comments, fix anything broken, then merge if sound.

## Your mission — audit the whole app, then improve it. Work in three passes.

### Pass 1 — AUDIT (write findings to `AUDIT.md`, grouped by severity)
- **Correctness & bugs:** hydration mismatches, store race conditions, broken links,
  paywall/access leaks, Supabase sync edge cases, lesson graders that pass with wrong solutions.
- **Curriculum quality:** spot-check lessons for accuracy, difficulty ramp, dead-end tracks,
  lessons whose `solution` doesn't actually pass `tests`. Run `npm run check`.
- **UX & polish:** empty/loading/error states, mobile responsiveness on every page, keyboard
  nav + focus management, color contrast, motion-reduce support, consistent RPG copy.
- **Performance:** bundle size, client components that could be server, Pyodide/sql.js
  lazy-load, image/font loading, Lighthouse on `/`, `/learn`, a lesson page, `/dashboard`.
- **SEO** (stated priority — "SEO-first, monetize later"): metadata, OG images, sitemap,
  structured data, the how-to/cheatsheet/blog surfaces, internal linking.
- **Conversion/monetization:** the Free→Pro funnel, paywall placement, pricing clarity,
  where Pro value is shown vs hidden.
- **Consistency:** dead components, duplicated logic, drift between systems, half-migrations.

### Pass 2 — PROPOSE (append a prioritized `ROADMAP.md`)
Rank improvements by impact×effort. For each: problem, proposed change, files touched, rough
effort. Include both fixes and NEW features. Directions to consider (use judgment):
- Retention loops: daily challenge variety, streak recovery UX, push/email nudges, weekly recap.
- New content tracks the catalog lacks (Go, Rust, Docker, testing, Git deep-dive, DSA patterns,
  frontend system design) — only if auto-gradeable client-side.
- Social: shareable profile/certificate cards, guild activity, league promotion drama.
- Learning quality: spaced-repetition review mode, "boss fight" cumulative challenges,
  per-lesson difficulty feedback, AI tutor improvements.
- Accessibility & i18n groundwork.

### Pass 3 — IMPLEMENT
Take the top items you're confident in and build them. Rules:
- Branch per logical change; open a PR each with a clear description; **never force-push `main`**.
- Keep `npm run check` and `tsc --noEmit` green. Add/keep tests where they exist.
- Match existing conventions exactly — reuse `card`/`btn-primary` classes, the curriculum data
  format (`src/lib/curriculum/types.ts`), `useGameStore` actions, existing components.
  No new dependencies without justification.
- Every new lesson's `solution` MUST pass its own `tests` when run as JS — verify each.
- Mobile-responsive and dark-theme by default. RPG tone in all copy.
- Mock data is fine for new UI, but label it and prefer wiring real store/Supabase data.

## Deliverables
The merged/queued PRs, `AUDIT.md`, `ROADMAP.md`, and a short summary of what you changed,
what you found but deferred, and the **top 5 things a human should decide on**.
