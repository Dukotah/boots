# Boots — Feature Backlog

A living list of implementable features. Complements `GAMEPLAN.md` (strategy) and
`COMPETITIVE-ROADMAP.md` (positioning). Check items off as they ship.

## ✅ Already shipped
- Core loop: in-browser editor + auto-graded lessons (JS/TS/Python/SQL)
- 34 modules · 222 lessons · 572 tests, with a CI quality gate
- Pathways (role-based tracks) + path-completion **certificates** + share OG images
- Gamification: XP, levels, ranks, streaks, quests, leagues, shop, chests, achievements
- Boots **AI tutor** (BYOK Anthropic + in-browser local model) — $0 to operator
- Auth (Supabase) + Stripe subscriptions + paywall
- **Server-authoritative scoring**: canonical-XP RPC + server-side JS/TS re-verification
- Public profiles, dashboard, campaign map, SEO (sitemap/robots/JSON-LD), recommended-path quiz

---

## 🎯 Proposed features (grouped)

### A. Learning experience
1. **Hint system** — progressive, per-lesson hints (cost gold / streak-safe) before revealing the solution.
2. **Spaced repetition review** — resurface previously solved concepts as quick "review" challenges.
3. **In-editor inline test runner** — show expected vs actual inline at the failing line.
4. **"Explain my error"** — one-click send of the failing test + code to the AI tutor.
5. **Code playground** — a free-form sandbox (JS/TS/Py/SQL) outside lessons.
6. **Multi-file / project lessons** — capstone projects spanning several files, graded as a unit.

### B. Content & languages
7. **Server-side Python/SQL verification** — extend `/api/verify` (Pyodide/sql.js on a Node worker or Judge0) so all languages are server-graded.
8. **Compiled languages** — Go / Rust / C via a Judge0/Firecracker sandbox.
9. **New tracks** — Data Structures deep-dive, System Design basics, Testing (unit tests), Shell/Bash.
10. **Community-authored lessons** — a contributor flow + review pipeline (lessons-as-data PRs).

### C. Gamification & retention
11. **Boss battles** — shared seasonal events with a community HP bar.
12. **Achievements v2** — breadth badges ("solved in 4 languages"), path-master badges.
13. **Daily challenge** — one shared problem/day with global stats + share card.
14. **Leaderboard filters** — friends, country, league, all-time vs weekly.
15. **Streak repair & reminders** — email/push "your streak is at risk" (needs lifecycle email).

### D. Social & credibility
16. **Certificates on public profile** — render earned certs on `/u/[username]` with verify links.
17. **Server-verifiable certificates** — issue a signed/DB-backed verification record (depends on #7-class scoring).
18. **Follow / friends** — follow other learners; activity feed.
19. **Shareable solution snippets** — opt-in "share my solution" gallery per lesson.

### E. Monetization & growth
20. **Free-trial + annual-default** pricing experiments (instrument conversion).
21. **Referral program** — give-a-month/get-a-month with tracked invite links.
22. **Teams/Education plans** — org accounts, seat management, admin cohort dashboard, SSO.
23. **Gift subscriptions** + coupon codes.

### F. Platform & ops
24. **Analytics + funnel events** (PostHog): signup → first-green → D2 return → paywall → paid.
25. **Lifecycle email** (Resend + React Email): welcome, streak-at-risk, win-back.
26. **Error tracking + uptime** (Sentry + status checks).
27. **Rate limiting** on `/api/verify` and AI endpoints (abuse protection).
28. **Real sandbox** for server verification (isolated-vm / Judge0) — harden beyond `node:vm`.
29. **Accessibility pass** (WCAG 2.1 AA) + full keyboard navigation in the editor flow.
30. **i18n** — translatable UI + localized landing pages for international SEO.

---

## Suggested next 3 (highest leverage)
1. **#16 Certificates on public profiles** — cheap, makes the certs we built visible & shareable.
2. **#24 + #25 Analytics + lifecycle email** — the retention/measurement foundation everything else compounds on.
3. **#1 Hint system** — strong learning-UX win that also creates a gold sink for the economy.
