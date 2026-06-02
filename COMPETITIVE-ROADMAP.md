# Boots — Competitive Roadmap & Operating Playbook

> How we move from "impressive prototype" to a platform that out-executes
> boot.dev, Codecademy, freeCodeCamp, LeetCode, and Duolingo — not just on
> features, but on the **systems and SOPs** that make those companies work.

This complements [`GAMEPLAN.md`](./GAMEPLAN.md) (the original strategy). That doc
asked "what do we build?" — this one asks **"how do the winners operate, and how
do we beat them at it?"**

---

## 1. Where we stand vs. the field

| Capability | boot.dev | Codecademy | freeCodeCamp | LeetCode | Duolingo | **Boots (today)** |
|---|---|---|---|---|---|---|
| Interactive auto-graded lessons | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Multi-language | ⚠️ backend | ✅ | ✅ | ✅ | n/a | ✅ **(19 courses)** |
| RPG gamification | ✅ | ⚠️ | ❌ | ⚠️ | ✅✅ | ✅ XP/leagues/shop/quests |
| AI tutor | ✅ | ✅ | ❌ | ⚠️ | ✅ | ✅ **(BYOK + local, $0 to us)** |
| Auth + subscriptions | ✅ | ✅ | free | ✅ | ✅ | ✅ Supabase + Stripe |
| Public profiles / sharing | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ `/u/[username]` |
| SEO content engine | ✅ | ✅✅ | ✅✅ | ✅ | ✅ | ⚠️ basics done |
| Certificates / credentials | ✅ | ✅ | ✅✅ | ⚠️ | n/a | ❌ |
| Projects + portfolio | ✅ | ✅ | ✅✅ | ❌ | n/a | ❌ |
| Community (Discord/forum) | ✅✅ | ✅ | ✅✅ | ✅ | ✅ | ❌ |
| Mobile / habit loop | ⚠️ | ✅ app | ⚠️ | ✅ app | ✅✅ | ❌ |
| B2B / Teams / Education | ✅ | ✅✅ | ❌ | ✅ | ✅ | ❌ |
| Retention engine (email/push) | ✅ | ✅ | ⚠️ | ✅ | ✅✅ | ❌ |
| Analytics + A/B testing | ✅ | ✅✅ | ✅ | ✅ | ✅✅ | ❌ |
| Server-side grading / anti-cheat | ✅ | ✅ | ⚠️ | ✅✅ | ✅ | ❌ (client-side) |

**Read:** We've matched the *product surface* of the leaders remarkably fast. The
gap now is **operational maturity** — the retention, analytics, content,
community, integrity, and B2B systems that turn a product into a business. That's
where this roadmap focuses.

---

## 2. The five strategic bets (how we actually win)

1. **Best gamified UX, period.** Duolingo proved gamification compounds. We
   already have the bones; we win by out-juicing everyone and running the
   retention engine they run.
2. **Multi-language breadth = SEO domination.** boot.dev ranks for "learn Go."
   We can rank for "learn Python," "learn SQL," "learn JavaScript," "regex,"
   "dynamic programming," etc. More doors than any single-stack competitor.
3. **AI tutor that costs us nothing.** Our BYOK + on-device model is a structural
   margin advantage — competitors eat the inference bill; we don't.
4. **Credential + portfolio that employers trust.** The endgame of learning is a
   job. Certificates, real projects, and a shareable portfolio close the loop.
5. **B2B as the revenue multiplier.** Consumer subs are the funnel; Teams/Education
   licensing is the margin. Codecademy's enterprise arm dwarfs its consumer revenue.

---

## 3. Phased roadmap

### NOW (next 2–4 weeks) — integrity, retention hooks, conversion
The point of this phase: make what we have **trustworthy, sticky, and monetizing**.

- [ ] **Server-authoritative progress & XP** (Supabase RPC / edge functions).
  Today grading + XP are client-side — fine for learning, fatal for leaderboards
  and certs. Move scoring validation server-side so leagues/certs can't be faked.
- [ ] **Analytics + event tracking** (PostHog — open-source, generous free tier).
  Instrument the funnel: signup → first lesson → first "all green" → day-2 return
  → paywall hit → purchase. *You can't optimize what you don't measure.*
- [ ] **Lifecycle email** (Resend + React Email): welcome, streak-at-risk,
  "you're 1 lesson from level up," win-back at 7/14/30 days. This is the single
  highest-ROI retention lever every competitor runs.
- [ ] **Onboarding flow**: goal selection ("get a job" / "learn Python" / "interview
  prep"), a 60-second first win, then a personalized path recommendation.
- [ ] **Paywall & pricing experiments**: free-trial, annual-default, coupon codes,
  Stripe dunning (failed-payment recovery), Stripe Tax. Instrument conversion.
- [ ] **Error tracking + uptime** (Sentry + a status check). Table stakes ops.

### NEXT (1–3 months) — credentials, community, projects, mobile habit
- [ ] **Certificates**: per-course completion certs with a verifiable public URL
  and "Add to LinkedIn." freeCodeCamp's growth engine in a box.
- [ ] **Projects & portfolio**: guided capstone projects (build a CLI, an API, a
  game), auto-checked, that publish to the user's `/u/[username]` portfolio.
- [ ] **Community**: launch a Discord; add per-lesson "community solutions" and
  comments (Exercism/LeetCode pattern). Seed it; community is a retention moat.
- [ ] **PWA + push notifications**: installable app, streak reminders. Duolingo's
  habit loop lives on push. A PWA gets 80% of the value at 10% of native cost.
- [ ] **Referral program**: "give a month, get a month." Built-in viral loop.
- [ ] **SEO content engine**: a blog/cheatsheet system (AI-drafted, human-edited)
  targeting long-tail "how to X in Python" queries → top-of-funnel at near-zero CAC.
- [ ] **Daily challenge**: one shared problem per day, global stats, social share —
  a recurring re-engagement surface (LeetCode/Brilliant pattern).

### LATER (3–6+ months) — B2B, scale, defensibility
- [ ] **Teams / Education plans**: org accounts, seat management, admin dashboard
  with cohort progress, SSO (SAML/Google Workspace), invoicing. The revenue
  multiplier.
- [ ] **Career services**: job board, employer partnerships, interview-prep track,
  resume/profile review. Monetize the "I got a job" outcome.
- [ ] **Mentorship marketplace** (Exercism-style): paid 1:1 or peer mentoring.
- [ ] **Compiled languages** (Go, Rust, C) via a server sandbox (Judge0/Firecracker)
  with strict isolation — the one place we'll need real execution infra.
- [ ] **Localization (i18n)** for international growth.
- [ ] **Compliance**: WCAG 2.1 AA accessibility, GDPR/CCPA, and SOC 2 (required to
  sell to enterprise).

---

## 4. Operating systems & SOPs (the "how we run it" playbooks)

Features get copied; **operational discipline is the moat.** These are the
standard operating procedures the leaders run that we should institutionalize.

### A. Content pipeline (mirror boot.dev's open curriculum)
- **Lessons-as-data + PR review** (we already author as data — formalize it).
- A **CI gate** that runs `scripts/check-curriculum` so every reference solution
  must pass its tests before merge. *No broken lesson ever ships.*
- A **content style guide** (tone, difficulty curve, XP weighting) + a lesson
  template, so contributors and AI drafts are consistent.
- A **contributor program** (community-authored courses, credited) — scales
  content for free, like freeCodeCamp.

### B. Experimentation SOP (mirror Duolingo)
- Every growth change ships behind a **feature flag** and an **A/B test**.
- A weekly **metrics review** against the North Star (below). Ship-or-kill based
  on data, not opinion.

### C. Release / engineering SOP
- **Trunk-based + preview deploys** (already on Vercel — every branch gets a URL).
- **CI**: typecheck + build + curriculum check + lint on every PR. Block merge on red.
- **Staging environment** + smoke tests before production promotes.
- **On-call lite**: Sentry alerts → triage rota.

### D. Trust, safety & integrity SOP
- Server-side score verification + **anti-cheat** (rate limits, anomaly detection
  on XP gain) so leagues/certs stay credible.
- **Moderation** for community UGC (reports, automod, ban tooling).
- **Plagiarism awareness** on shared solutions.

### E. Support / CS SOP
- Help center (self-serve docs) + a ticketing inbox with response SLAs.
- In-product "report a bug on this lesson" → routes to the content pipeline.

### F. Security & compliance SOP
- Secrets in env (never in repo), least-privilege Supabase RLS policies, regular
  dependency audits, periodic security review (we have a `/security-review` flow).

---

## 5. Metrics that matter (instrument these first)

**North Star:** *Weekly Active Learners who complete ≥1 lesson* (engaged learning,
not vanity signups).

**The funnel to optimize:**
`Visit → Signup → First lesson started → First "all tests green" (the magic moment)
→ Day-2 return → Streak ≥3 → Paywall hit → Trial → Paid → Retained (M1/M3)`

**Core KPIs:** activation rate (% who hit first green), D1/D7/D30 retention,
free→paid conversion, trial→paid, MRR, churn, CAC vs LTV, and **streak
distribution** (Duolingo's leading indicator of revenue).

---

## 6. Where the durable moats are

1. **Content depth + breadth** (19 courses and a contributor engine → hard to catch).
2. **The retention/gamification machine** (compounds; hard to clone the polish).
3. **Zero-marginal-cost AI tutoring** (structural margin edge).
4. **SEO surface area** (a long-tail content moat that grows over time).
5. **Community + credentials + employer network** (network effects; the thing
   competitors can't copy by shipping a feature).

---

## 7. Recommended immediate next step

From the **NOW** phase, the highest-leverage single move is **analytics +
lifecycle email**, because:
- It's cheap (PostHog + Resend, both free to start).
- It immediately tells us where users drop off (so every later bet is informed).
- Lifecycle email is the proven #1 retention lever, and we have *zero* today.

A close second is **server-authoritative XP/grading**, because it unblocks
trustworthy leagues *and* certificates — two big retention/credibility features.

> Say the word and I'll start on the analytics + email lifecycle system, or on
> server-side scoring — both are scoped and ready to build.

---

### Sources / references
- boot.dev model & gamification: see citations in [`GAMEPLAN.md`](./GAMEPLAN.md)
- Competitor patterns referenced: Codecademy (paths, Teams/Enterprise, certs),
  freeCodeCamp (free certifications, projects, forum), LeetCode (contests,
  company tags, discuss), Duolingo (streaks, leagues, lifecycle, experimentation),
  Exercism (mentorship, community solutions).
