# Cantrip / Boots — 100 Improvements Roadmap

A grounded backlog of 100 concrete things to **add, improve, or change**, derived
from the current codebase state (not generic advice). Complements
[`COMPETITIVE-ROADMAP.md`](./COMPETITIVE-ROADMAP.md) (strategy) and
[`GAMEPLAN.md`](./GAMEPLAN.md) (original vision).

**Legend**
- Effort: `S` ≈ <½ day · `M` ≈ 1–2 days · `L` ≈ multi-day / needs infra
- ⚠️ = needs the owner (secrets, external accounts, billing, or a live dashboard);
  cannot be fully built/verified by an agent alone.

**Recommended next 10** (highest value, fully buildable now): #10, #11, #19, #38,
#44, #46, #48, #76, #88, #98.

---

## A. Integrity, anti-cheat & data correctness
*Leaderboards/certs are only as trustworthy as the grading. Today grading +
several fields are client-authoritative.*

1. Extend server-authoritative grading to **quiz & HTML** lessons (code lessons
   already verify via `/api/verify`; quiz/HTML record but aren't recomputed). `M`
2. **Anti-cheat**: rate-limit + anomaly detection on XP/gold gain (flag
   impossible XP-per-minute) so leagues/certs stay credible. `M`
3. Sync `goal` / `onboarded` / daily-challenge fields into the profile snapshot
   (currently localStorage-only → lost across devices). Needs migration `0007`. `M`
4. Per-field **last-writer-wins** (or `updated_at`) audit across all synced
   fields to kill the gold-refund-dupe class of bugs for good. `M`
5. Server-validate cosmetic purchases & talent spends (client currently trusts
   localStorage gold). `M`
6. Reconcile offline-earned gold edge case on sign-in. `S`
7. Propagate `reset()` across devices (current `rev` scheme can't). `S`
8. ⚠️ Supabase **RLS least-privilege** policy review across every table. `M`
9. ⚠️ Apply pending migrations `0005`/`0006` to live Supabase + smoke test. `S`

## B. Testing & engineering SOP
*There are currently **no** unit/integration tests for app logic — only the
curriculum checker. This is the single biggest risk surface.*

10. Stand up a **unit test harness** (Vitest) wired into the repo. `L`
11. Unit-test the store engine: XP/level/streak/season/claims/sync-merge. `M`
12. Unit-test `lib/career` (readiness + `buildResume`). `S`
13. Unit-test `lib/daily`, `lib/projects`, `lib/leagues`, `lib/talents`, `lib/shop`. `M`
14. Component tests (Testing Library) for the `LessonView` grading flow. `M`
15. E2E smoke (Playwright): signup → lesson → all-green → dashboard. `L`
16. Extend `ci.yml` to run tsc + curriculum check + build + tests on every PR. `S`
17. Enforce ESLint + Prettier in CI (block on red). `S`
18. Storybook + visual-regression for the design system. `L`

## C. Curriculum & content
19. CI gate: assert each lesson's **starter fails** and **solution passes** its
    tests (prevents pre-solved starters — a bug we've hit twice). `S`
20. Difficulty-curve + XP-weighting consistency audit across all 93 modules. `M`
21. Add **Python & SQL capstones** to `portfolio-projects` (all 5 are JS today). `M`
22. ⚠️ Compiled-language track (Go/Rust/C) via a server sandbox (Judge0/Firecracker). `L`
23. Per-lesson "**Report a problem**" button → routes into the content pipeline. `S`
24. Community-authored lesson flow: PR template + content style guide. `M`
25. Lesson-chrome i18n scaffolding (separate from lesson body). `L`
26. Ensure every module feeds `/review` spaced repetition (coverage check). `S`
27. Expand interview-prep: timed mode + company-tagged problems. `M`
28. "Explain my error" — synthesize a hint from the failing test output. `M`
29. Animated/code-along walkthroughs for the hardest lessons. `L`
30. Complete cheatsheet ↔ lesson cross-linking. `S`

## D. Retention & gamification depth
31. Daily challenge v2: difficulty tiers, language filter, "perfect week" bonus. `M`
32. Streak-freeze auto-buy toggle + smoother streak-repair UX. `S`
33. Daily-challenge leaderboard (streak / speed) — server-backed. `M`
34. ⚠️ Wire push campaigns to real triggers (streak-at-risk, league close). `M`
35. Seasonal events calendar expansion + event-exclusive cosmetics. `M`
36. Guild depth: shared goals, guild leaderboard, lightweight chat. `L`
37. Friend duels: an async timed-challenge runtime. `L`
38. Achievement **progress bars** (show % toward locked badges). `S`
39. "Comeback" mechanic / dedicated win-back path after a broken streak. `S`
40. Time-limited XP boosts / "power hours". `S`
41. Deeper profile customization (themes, pinned projects, layout). `M`
42. In-app **notifications center** (achievements / league / friends). `M`
43. Weekly recap ("your week in code") as a screen + optional email. `M`

## E. Credentials & career
44. Certificates: one-click **"Add to LinkedIn"** + polished verifiable URL. `S`
45. Public verifiable cert page (QR + employer verification lookup). `M`
46. Portfolio: let users **pin/reorder** projects + add a custom blurb. `S`
47. ⚠️ Auto-built **portfolio GitHub repo** (the open journal sub-layer). `M`
48. Résumé **PDF export** (currently Markdown only). `M`
49. Placement / skills-assessment test → readiness baseline. `M`
50. ⚠️ Job board + employer partnerships surface. `L`
51. Interview simulator (timed problems + rubric scoring). `L`
52. Map readiness to real job titles + salary ranges. `S`

## F. Community & social
53. Per-lesson **community solutions** gallery (unlocked after you pass). `M`
54. Moderated per-lesson discussion/comments. `M`
55. ⚠️ Launch Discord + role sync from profile rank. `M`
56. Leaderboard filters (friends / guild / global / language). `S`
57. Follow feed: friends' level-ups & achievements. `M`
58. ⚠️ Mentorship marketplace (paid or peer). `L`
59. UGC moderation tooling (reports, automod, ban). `M`

## G. Monetization & growth
60. ⚠️ Stripe **referral coupon** fulfillment (deferred — needs coupon id). `S`
61. ⚠️ Stripe **dunning** / failed-payment recovery emails. `M`
62. ⚠️ Stripe **Tax** + invoicing. `M`
63. Free-trial flow + trial→paid nudges. `M`
64. Read out the annual-default pricing experiment and iterate. `S`
65. Gift subscriptions / team gifting. `M`
66. Paywall placement experiments (fire `paywall_viewed` at every gate). `S`
67. ⚠️ Win-back campaign for churned subscribers. `M`
68. Pricing localization (purchasing-power parity by region). `M`
69. ⚠️ Affiliate / creator program. `L`

## H. B2B / Teams / Education
70. Org accounts + seat management + admin dashboard. `L`
71. Cohort-progress dashboard for instructors. `M`
72. ⚠️ SSO (SAML / Google Workspace). `L`
73. Classroom mode (assignments, due dates, grade export). `L`
74. Bulk invite + license provisioning. `M`
75. White-label / co-brand for partners. `L`

## I. AI tutor
76. Unify the two tutors behind one **Local / Key / Pro** provider toggle. `M`
77. Feed the tutor live context (current editor code + failing tests). `S`
78. Add **prompt caching** to the Pro tutor server path (margin). `S`
79. Tutor rate limits + abuse guardrails. `S`
80. Tutor modes: "explain this concept" / "review my solution". `M`

## J. Accessibility, i18n & compliance
81. WCAG 2.1 **AA audit** (contrast, focus rings, ARIA) — nits already deferred. `M`
82. Full keyboard navigation (editor, nav, modals). `M`
83. Screen-reader pass on lesson grading feedback. `M`
84. i18n framework (next-intl) + extract UI strings. `L`
85. ⚠️ GDPR/CCPA: data export + **delete-my-account** flow. `M`
86. Consent management aligned with the (cookieless) analytics. `S`
87. ⚠️ COPPA: verify under-13 handling end-to-end (age gate at signup). `M`

## K. Performance & scale
88. Bundle audit — first load ~539 kB; code-split heavy routes. `M`
89. Lazy-load Pyodide / sql.js only when a py/sql lesson opens. `S`
90. Build is 1486 static pages — move how-to/blog to ISR/on-demand. `M`
91. Image optimization pipeline for OG/scraped images. `S`
92. Supabase index/query review for leaderboard at scale. `M`
93. Edge-cache public profiles + `/api/badge`. `S`

## L. Observability & ops
94. ⚠️ Install `@sentry/nextjs` to activate the scaffolded error reporting. `S`
95. ⚠️ Uptime monitor + status page wired to `/api/health`. `S`
96. Structured logging + request tracing on API routes. `M`
97. ⚠️ Alerting rota (Sentry → channel). `S`

## M. Product polish & IA
98. Resolve the **brand duality** (Cantrip vs Boots) — pick one, sweep the UI. `S`
99. True signup-free **60-second first-win** demo on the landing page. `M`
100. Dashboard information-architecture pass (it's getting dense). `M`

---

_Last updated 2026-06-06. Counts at time of writing: 93 modules / 656 lessons /
1738 tests; build = 1486 static pages._
