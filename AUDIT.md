# Cantrip — Audit (Pass 1)

Full-app audit by the lead-engineer agent. Findings are grouped by severity. Line/file references are to `main` after merging PR #7 (React/Node/TS courses + lesson UX). Verified live on the Vercel preview and by reading source on GitHub.

## Severity legend

P0 Critical = data loss, security/paywall leak, broken core flow. P1 High = wrong/misleading behavior, conversion or SEO damage. P2 Medium = polish, perf, consistency. P3 Low = cosmetic.

---

## P0 — Critical

None found. The core engine is solid. `useGameStore` persistence is two-layered (localStorage optimistic cache + Supabase upsert) with a `rev` last-writer-wins counter and union-merge for additive sets, so progress is not lost across devices. The paywall (`lib/access.canInteract`) is enforced client-side (Run disabled when `gated`) AND re-verified server-side via `verifyCompletion`. No paywall leak observed.

---

## P1 — High

1. Pricing copy contradicts the code. The Free tier said "First 2 lessons per course, interactive" but `lib/access.ts` grants 3 (`FREE_PREVIEW_LESSONS = 3`), growing with streak. Under-sells the free tier and hides a conversion lever. FIXED in PR #8.

2. 2. How-to SEO page titles are ungrammatical. `/how-to/node-middleware` renders the H1/title as "How to middleware in JavaScript" — the generator inserts the concept noun without a verb. Many of the ~1,700 sitemap URLs are these how-to pages, so this hurts the stated "SEO-first" priority at scale. Needs a verb-aware title (e.g. "How to write Express middleware in JavaScript") or a per-lesson `howToTitle` field.
  
   3. 3. Doubled metadata title suffix. `/pricing` renders `<title>Pricing | Cantrip | Cantrip</title>` — the page sets `title: "Pricing | Cantrip"` while the root layout template already appends "| Cantrip". Audit every page that hard-codes the brand in its own title; rely on the layout template instead. Bad for SERP snippets.
     
      4. 4. PROMPT.md (the agent self-improvement brief) shipped to the repo root in PR #7. `.gitignore` was updated but the file itself is tracked. It's internal scaffolding that shouldn't be in the production tree. Remove from the branch/repo. (Flagged in the PR #7 review.)
        
         5. ---
        
         6. ## P2 — Medium
        
         7. 1. "More courses" fallback track is overloaded. `/learn` groups courses by `tracks.ts`, but 15 live courses (TypeScript, closures, sets-maps, async, web-apis, csv, python-strings/comprehensions/oop/algorithms, sql-aggregations, sql-subqueries, etc.) are unassigned and dumped into the catch-all "More courses" section. The fallback is a good safety net, but a 15-card miscellaneous bucket reads as unfinished. File these into existing/new tracks.
           
            2. 2. Monaco editor blocks the main thread on first run (~1,097 ms INP, observed via the Vercel toolbar's live INP warning on a lesson page). First Run compiles the JS worker and Monaco; consider warming the worker on idle, or showing a clearer "compiling runtime…" state. Affects perceived responsiveness of the single most important interaction.
              
               3. 3. Quiz lessons may lack a visual badge in course lists. `react.ts` lesson 1 and `node.ts` lessons 1 & 8 are `kind: "quiz"` but the course-detail list shows only XP, no quiz indicator. Verify the list/sidebar distinguishes quiz vs code lessons (other tracks may already).
                 
                  4. 4. Lesson URL slugs are non-obvious. `/learn/javascript-foundations/1` 404s; the real route is `/learn/javascript/variables` (module slug + lesson slug). Internal links are correct, but any hand-shared or guessed numeric URL dead-ends on the (nice) 404. Consider a numeric-index redirect for resilience and shareability.
                    
                     5. 5. CI runner uses deprecated Node 20 GitHub Actions (`actions/checkout@v4`, `actions/setup-node@v4`). Not a code bug, but the runner warns these break after 2026-06-16. Bump to v5 / Node 24.
                       
                        6. ---
                       
                        7. ## P3 — Low
                       
                        8. ## P3 — Low
                       
                        9. Minor RPG-copy drift (some pages say "course", others "quest"); decorative emoji occasionally renders as a missing glyph on the course header; the dev-only Pro toggle is correctly gated to `NODE_ENV==='development'`.
                       
                        10. ---
                       
                        11. ## Curriculum quality
                       
                        12. Spot-checked React, Node, TypeScript, JS Foundations, and several how-to surfaces. New PR #7 lessons are accurate and every coding solution provably passes its own tests when run as JS (e.g. `runMiddleware` = reduce, `route` = lookup table, `increment`/`shouldRun`/`handleToggle` all trivially correct). The "explain real React/Node in prose, grade a deterministic pure-JS shape" approach is sound given the Worker has no DOM/Node runtime, and the prose is explicit about the modelling so it won't mislead. Difficulty ramp is reasonable (3 free → Pro). Empirically verified grading: a wrong `greeting` value yields "0/2 passing" with clear failures, so graders are not rubber-stamping. `npm run check` (824 tests) is green in CI.
                       
                        13. Catalog is large: 59 courses / 381 lessons / 13 career paths. No dead-end tracks found, but the "More courses" bucket (15 unfiled courses) is the weakest seam.
                       
                        14. ---
                       
                        15. ## What's strong (keep)
                       
                        16. SEO infrastructure is genuinely good: ~1,700-URL sitemap, robots.txt, JSON-LD (lesson + breadcrumb + ItemList), per-lesson canonical + OpenGraph, and the how-to/cheatsheet/certificate content surfaces. The store's offline-first + last-writer-wins sync is well-reasoned and documented. The access policy as pure, server-reusable functions is the right shape. The 404 page is on-brand. PR #7's lesson UX (collapsible course map, prev/next, first-pass-only confetti, richer expected-vs-actual diffs) is a real quality lift and reconciles cleanly with main's inline tutor + hint system.
                       
                        17. ---
                       
                        18. ## Verification method
                       
                        19. Live preview clicked through (home, /learn, /paths, /skill-tree, /pricing, /dashboard, /playground, a lesson, a how-to). Source read on GitHub for store, access, runner, curriculum types, tracks, and all PR #7 files. Grading verified by running a deliberately wrong solution. PR #7 reviewed and merged; PR #8 (pricing fix) opened.
                        20. 
