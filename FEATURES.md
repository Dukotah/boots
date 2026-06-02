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

### G. Competitor-inspired systems (HTB · TryHackMe · Codewars · LeetCode · Exercism · Duolingo)
Features the leading practice platforms have that we don't yet — adapted to Boots.

**Competition & seasons**
31. **Seasons** — 13-week competitive seasons with a tiered ladder, season-only challenges, and end-of-season prizes/badges (HTB Seasons). Distinct from our standing leagues.
32. **Timed contests** — weekly/biweekly live contests with real-time ranking (LeetCode contests).
33. **Seasonal narrative event** — an annual story-driven event (e.g. an "Advent of Code"-style December calendar) for a big re-engagement spike (THM Advent of Cyber).

**Practice & mastery**
34. **Practice mode** — train by **topic tag + difficulty** outside the linear paths (Codewars "train", LeetCode filters).
35. **Study plans** — short, goal-based curated collections ("30 Days of JS", "Top Interview 75") layered on top of paths (LeetCode study plans).
36. **Company-tagged interview problems** — tag interview-track problems by company (Google/Amazon/Meta) (LeetCode).
37. **Concept vs practice split** — separate "learn the concept" exercises from "practice the skill" reps (Exercism).
38. **Difficulty + community pass-rate** — show each lesson's difficulty and a live acceptance/pass-rate stat (LeetCode/Codewars).
39. **Submission history & percentile** — keep past submissions; show a performance/clarity percentile vs other learners (LeetCode).

**Guidance & community**
40. **Guided vs Challenge mode** — per-lesson toggle: step-by-step scaffolding, or a bare prompt for the confident (HTB guided mode).
41. **Community solutions + voting** — after solving, browse others' solutions and upvote "clever"/"best practices" (Codewars; extends #19).
42. **Mentorship / code review** — request human or AI review of a passing solution for idioms & quality (Exercism mentoring; extends #4).
43. **Official walkthroughs** — unlock an official text/video walkthrough after completing (or paying for) a lesson (HTB writeups).
44. **Honor & contributor privileges** — earn the right to author, curate, and moderate content as your honor grows (Codewars; pairs with #10).

**Social & groups**
45. **Clans / study groups** — join a clan; a combined clan leaderboard and group streaks (Codewars clans, Duolingo friends quests).
46. **Classrooms for educators** — teacher dashboards, assigned paths, due dates, and per-student progress (THM for Education; deeper than #22 Teams).

**Environment & rewards**
47. **Persistent cloud workspace** — a saved, full multi-file IDE/sandbox per learner, not just the per-lesson editor (HTB Pwnbox analog; extends #5).
48. **Real-world rewards / swag** — mail a coin/sticker at top ranks; a gold-funded swag store (HTB prizes; gameplan §4).

---

## Suggested next 3 (highest leverage)
1. **#16 Certificates on public profiles** — cheap, makes the certs we built visible & shareable.
2. **#24 + #25 Analytics + lifecycle email** — the retention/measurement foundation everything else compounds on.
3. **#1 Hint system** — strong learning-UX win that also creates a gold sink for the economy.

From the competitor set, the highest-leverage adaptations are **#31 Seasons**,
**#34 Practice mode**, and **#41 Community solutions** — they directly mirror what
keeps HTB / TryHackMe / Codewars users coming back daily.

---

### Sources (competitor research)
- [HTB Seasons](https://www.hackthebox.com/hacker/seasons) · [HTB XP / progression](https://www.hackthebox.com/blog/XP-Points) · [HTB VIP perks](https://www.hackthebox.com/blog/new-additions-for-vip-users)
- [TryHackMe overview & paths](https://hackerdna.com/blog/what-is-tryhackme) · [TryHackMe pricing/features](https://hackerdna.com/blog/tryhackme-pricing)
- [Codewars kata ranking (kyu/dan, honor)](https://www.codewars.com/topics/kata-ranking)
- [LeetCode vs Codewars vs HackerRank (contests, company tags, daily)](https://www.coursefacts.com/guides/leetcode-vs-hackerrank-vs-codewars-2026)
- Exercism mentoring & tracks (concept vs practice exercises)
