# Decisions

One line per meaningful decision, newest first. Why, not just what.

- **2026-06-06** — Do NOT auto-merge to `main` / deploy to prod yet. Open clean,
  CI-green PRs per phase, but gate the actual merge on owner-only go-live steps
  (apply migrations 0005–0007, set service secrets). *Why: merging triggers a
  Vercel prod deploy; deploying before the DB migrations are applied would break
  prod. A PR is reviewable and safe without deploying.*
- **2026-06-06** — Restructured `ROADMAP.md` into a phased plan; archived the old
  prioritized "Pass 2" list to `docs/roadmap-archive-pass2.md`. *Why: the owner
  brief asked for phases→DoD; the old list was mostly shipped/superseded and its
  unique ideas live on in the archive + COMPETITIVE-ROADMAP.*
- **2026-06-06** — Kept the `curriculum/ids.ts` split even though it didn't move
  the bundle. *Why: I expected the barrel `lessonId` import to drag all lesson
  content into the lesson route, but the build was already tree-shaking `MODULES`
  out — the route stayed 638 kB. The split is still correct (a zero-cost guard
  against a real future footgun), so it stays; the actual First-Load drivers are
  app-wide deps and get a properly-instrumented task (P1.2). Reported honestly
  rather than claiming a win.*
- **2026-06-06** — Wired vitest to React's automatic JSX runtime
  (`esbuild.jsx: "automatic"`) instead of adding `@vitejs/plugin-react`. *Why:
  fixes "React is not defined" in `.tsx` tests with zero new dependencies.*
- **2026-06-06** — Continue building on the existing `curriculum-and-go-live-2026-06-04`
  branch rather than cutting a fresh one. *Why: it already carries 11 commits of
  green, unmerged work; a parallel branch would fragment the PR.*
