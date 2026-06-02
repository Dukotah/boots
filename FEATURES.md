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

### H. HTB / TryHackMe systems v2 (net-new)
The pieces that most define the HTB/THM *feel* and aren't yet captured above.
49. **"Capture the output" flags** — clear a challenge by submitting the program's output/return value as a *flag*, THM-style, not only by passing hidden tests. Cheap to add, instantly CTF-flavored.
50. **Rooms / self-contained challenge boxes** — a single page: intro → ordered tasks → answer fields, separate from the linear course path (THM "rooms").
51. **Hack-the-bug debugging challenges** — ship intentionally broken code; the goal is to *find and fix the flaw* (maps onto HTB's "find the vuln" loop).
52. **Beginner cybersecurity track** — in-browser web-security / OWASP / crypto / regex-forensics puzzles. The most literal HTB/THM borrow and a fresh SEO wedge ("learn ethical hacking").
53. **First-blood bonuses** — extra XP + a badge for the *first* solver of each new challenge. The strongest CTF re-engagement hook.
54. **King-of-the-Hill / 1v1 code duels** — timed head-to-head with live ranking (HTB Battlegrounds). Distinct from scheduled contests (#32).
55. **Skill assessments / placement tests** — graded checkpoints that certify a level and *unlock* harder content (HTB skill assessments); doubles as onboarding.
56. **Rank tiers that gate content** — named ranks (Script Kiddie → … → Elite) where rank unlocks tougher "machines," not just cosmetic XP.
57. **Per-challenge + global leaderboards** — weekly/all-time and per-room boards (extends leaderboard filters #14; pairs with #53).
58. **VIP tier (above Pro)** — early access to seasonal challenges, exclusive rooms, cosmetic flair (HTB VIP/VIP+); a second monetization rung.

### I. Round-2 upgrades (depth, habit, integrity)
A second pass beyond the competitor mirror — leaning on our on-device/BYOK AI and the editor as differentiators.

**Learning depth**
59. **Adaptive / mastery-based difficulty** — tune the next lesson's difficulty to recent performance instead of a fixed ramp (Khan/DreamBox pattern).
60. **Step-through code visualizer** — animate execution line-by-line for loops, recursion, and data structures (Python Tutor style). A standout learning aid.
61. **Code-quality & complexity feedback** — go beyond pass/fail: score style, name a solution's Big-O, and suggest refactors (extends #38/#39).
62. **AI-generated personalized practice** — use the on-device/BYOK tutor to generate extra reps targeting the exact concepts a learner failed (builds on the tutor we shipped).
63. **Interview simulator** — a timed mock interview where the AI plays interviewer (coding + behavioral) with a post-mortem (extends the interview track + #4).

**Habit & feel**
64. **Full offline PWA** — cache lessons *and* the on-device model so a learner can practice with AI help on a plane (compounds the local tutor).
65. **Focus / study-session mode** — built-in Pomodoro + "lo-fi study" ambience and session goals, with anti-burnout caps (Duolingo-style, but kinder).
66. **Sound design & juice** — SFX on a passing test, level-up stings, optional music. Gameplan §5 "juice" — cheap, huge on *feel*, and great short-form marketing.
67. **Skill-tree / knowledge-graph map** — a visual mastery map of concepts and how they connect, showing strengths and gaps (HTB skill tree).

**Social & collaborative**
68. **Real-time pair programming** — a shared CRDT (Yjs) editor for study buddies or mentor sessions.
69. **Regional / school leaderboards & study squads** — country/university/company tags and small private squads with group streaks (THM university boards; extends #45).
70. **Self-serve challenge creator** — an in-app builder so learners author and share their own challenges (the UGC engine behind #10/#44).

**Credibility & integrity**
71. **Auto-generated dev portfolio** — assemble completed projects + certs into a shareable `/u/[username]` portfolio with "Add to LinkedIn" (closes the job loop; extends #6/#16).
72. **Plagiarism / anti-cheat on solutions** — similarity + paste-burst detection to keep leaderboards and certs credible (depends on server-side scoring #7).
73. **Integrations & API** — outbound webhooks, Discord role sync on rank-up, and a read-only public progress API (turns achievements into status elsewhere).

---

## Suggested next 3 (highest leverage)
1. **#16 Certificates on public profiles** — cheap, makes the certs we built visible & shareable.
2. **#24 + #25 Analytics + lifecycle email** — the retention/measurement foundation everything else compounds on.
3. **#1 Hint system** — strong learning-UX win that also creates a gold sink for the economy.

From the competitor set, the highest-leverage adaptations are **#31 Seasons**,
**#34 Practice mode**, and **#41 Community solutions** — they directly mirror what
keeps HTB / TryHackMe / Codewars users coming back daily.

From the v2 / round-2 sets, the highest-leverage are **#49 Capture-the-output flags**
and **#50 Rooms** (small build, big format shift toward the HTB/THM feel),
**#53 First-blood** (cheap, addictive), **#60 Step-through visualizer** (a genuine
learning edge), and **#62 AI-generated practice** (compounds the tutor we just shipped).

---

### Sources (competitor research)
- [HTB Seasons](https://www.hackthebox.com/hacker/seasons) · [HTB XP / progression](https://www.hackthebox.com/blog/XP-Points) · [HTB VIP perks](https://www.hackthebox.com/blog/new-additions-for-vip-users)
- [TryHackMe overview & paths](https://hackerdna.com/blog/what-is-tryhackme) · [TryHackMe pricing/features](https://hackerdna.com/blog/tryhackme-pricing)
- [Codewars kata ranking (kyu/dan, honor)](https://www.codewars.com/topics/kata-ranking)
- [LeetCode vs Codewars vs HackerRank (contests, company tags, daily)](https://www.coursefacts.com/guides/leetcode-vs-hackerrank-vs-codewars-2026)
- Exercism mentoring & tracks (concept vs practice exercises)
- [HTB Battlegrounds (PvP / KotH)](https://www.hackthebox.com/blog/battlegrounds-overview) · [HTB skill assessments](https://help.hackthebox.com/en/articles/6457719-academy-skill-assessments)
- [Python Tutor — step-through code visualization](https://pythontutor.com/) · [Yjs — CRDT for collaborative editing](https://github.com/yjs/yjs)
