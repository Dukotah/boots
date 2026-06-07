# Section Roadmaps — Skill Tree · Projects · Career (2026-06)

Deep-dive plans for three sections flagged for work. Each has: current state, the
problem, the target, phased work items (tagged `[impact/effort]`), and a
**multi-agent execution plan** noting what parallelizes cleanly vs. what must be
done by a single owner (the recurring lesson: anything editing one shared file —
a page, the game store — can't be safely fanned out in parallel).

---

## 1) SKILL TREE — *clarity redesign (the engine is good; the UX confuses)*

### Current state
- `src/lib/talents.ts`: 4 branches — **Prospector** (gold), **Sentinel** (streak),
  **Luminary** (cosmetics), **Scholar** (review gold). Talents have tier, cost (SP),
  prereqs, optional learning gates (modules/level), and effects that are strictly
  economy / QoL / cosmetic (never XP → leagues stay fair).
- `src/app/skill-tree/page.tsx`: renders all 4 branches as a dense `lg:grid-cols-4`
  wall of nodes with states (owned / available / prereq-locked / gate-locked),
  a respec button, and active-bonus chips. SP is derived from progress.

### The problem ("too confusing, but right direction")
- **Dense 4-column wall** — too much at once; prereq/connector relationships are
  hard to read, worse on mobile.
- **Abstract effects** — "chest-luck +40", "review-gold +14" don't tell a learner
  what they actually *get* or why it matters.
- **No guidance** — no recommended build, no "what should I pick first," which
  creates decision paralysis.
- **SP is opaque** — unclear how you earn it or how much a node is "worth."
- **Effects aren't felt** — you buy a talent and nothing visibly changes.

### Target
A legible "build your character" screen where, in 10 seconds, a learner understands
what each branch is for, what they can afford, what to pick, and what their current
build does — in plain language.

### Work items
- **ST-1** Focused-branch layout: one branch at a time (tabs/accordion on mobile,
  4 readable columns on desktop) with clear tier rows + connector lines for
  prereqs. `[H/M]`
- **ST-2** Plain-language nodes: each shows icon, name, a concrete effect line
  ("+10% gold from lessons"), SP cost, and state **with the reason** when locked
  ("Need 2 SP" / "Finish Prospector I" / "Reach Lvl 5"). `[H/M]`
- **ST-3** "How Skill Points work" explainer + prominent SP balance + a link to
  where SP comes from (completing modules/leveling). `[H/L]`
- **ST-4** Recommended builds / archetypes: 2–3 one-tap presets ("Gold Farmer",
  "Streak Keeper", "Scholar") that preview, then apply — kills decision paralysis. `[H/M]`
- **ST-5** "Your build" summary card (already partly exists as `TalentBuildCard`):
  surface active effects in plain language + total SP spent per branch. `[M/L]`
- **ST-6** Make effects *felt*: a toast/line when a talent earns you something
  ("📚 Scholar paid +14 gold for that review"); a weekly "your talents earned you
  +X" recap. `[M/M]`
- **ST-7** First-visit mini-walkthrough (3 coachmarks). `[M/L]`
- **ST-8** (depth, optional) more tiers / a 5th utility branch if the tree feels
  shallow once legible. `[M/H]`

### Multi-agent execution
**Mostly NOT swarm-friendly** — it's one cohesive redesign of a single page +
`talents.ts` helpers. Plan: **1 lead agent (or hand-built)** for ST-1/2/3/5 (the
page redesign), then **1 parallel agent** for ST-4 recommended-builds (new
`lib/talentBuilds.ts` + a preset picker — disjoint) and **1** for ST-6 effect
toasts (touches the store completion path — sequential/solo). Realistically: 2–3
agents max, largely sequential. Don't over-parallelize a single screen.

---

## 2) PROJECTS — *full multi-agent development sweep (this section is thin)*

### Current state
- `src/lib/projects.ts` derives projects from the `portfolio-projects` curriculum
  module — **only ~5 capstones, all JavaScript** (todo-app, calculator,
  word-frequency, event-emitter, rate-limiter) with showcase metadata.
- `src/app/projects/page.tsx`: a simple grid + a portfolio progress bar. Projects
  also surface on the public profile `/u/[username]` and feed the résumé.

### The problem
Too few projects, one language, no filtering/discovery, thin "brief," and the
"I built this" credential is underdeveloped. This is the only ❌-vs-competitors gap
that's also under-built on our side.

### Target
A real **portfolio hub**: dozens of projects across languages & domains, rich
briefs, filtering/discovery, a credible showcase, and a portfolio that genuinely
impresses a recruiter.

### Work items
- **PR-1 (the big content sweep)** Author **many new project builds** across
  languages (JS/TS/Python/SQL/HTML) and domains (UI widgets, data wrangling,
  algorithms, mini-APIs, games, AI-powered mini-apps), tiered Beginner→Advanced,
  each with tests + solution + showcase metadata. Target ~25–40 projects. `[H/H]`
- **PR-2** Rich project **briefs**: problem statement, requirements, stretch goals,
  est. time, "what this proves," tech tags — a `ProjectBrief` shape on top of the
  lesson. `[H/M]`
- **PR-3** Projects-hub **discovery**: search + filter by language / difficulty /
  domain, "in progress vs shipped," sort. `[H/M]`
- **PR-4** Project **detail/landing** pages (SEO-friendly): the brief, what you'll
  learn, tags, start CTA. `[M/M]`
- **PR-5** Categories / **collections** ("Frontend Portfolio", "Data Portfolio",
  "Backend Portfolio") that map to roles. `[M/M]`
- **PR-6** Stronger **showcase/credential**: richer profile project cards, a
  per-project shareable "shipped" badge, a "portfolio score," résumé integration
  (partly exists), and GitHub commit of project solutions (journal infra exists). `[H/M]`
- **PR-7** (stretch) Open-ended projects with a **rubric / AI review** (Pro),
  starter templates, "ship to GitHub." `[M/H]`

### Multi-agent execution (the real sweep)
- **Phase A — content (highly parallel):** N agents each author a batch of project
  lessons (new files / a new `portfolio-*` module per domain), then ONE integrator
  wires them. ⚠️ **Projects are CODE lessons, not quizzes** — `npm run check` runs
  them with NO timeout and also runs the *starter* against tests, so every agent
  MUST follow the hard rules: starter must FAIL, solution must PASS, **no unbounded
  loops** anywhere, test drain-loops bounded. Add a **verification agent** that
  runs `npm run check` and fixes any hang/fail before merge. Disjoint = new files.
- **Phase B — UX (parallel, disjoint files):** one agent for discovery/filter
  (`projects/page.tsx` + a client catalog), one for detail pages
  (`projects/[slug]`), one for showcase/profile cards. `lib/projects.ts` extended
  by ONE owner (it's shared).
- **Phase C — credential/showcase:** profile + résumé wiring (sequential where it
  touches shared profile/career files).

---

## 3) CAREER — *full dev sweep (good foundation, generic + shallow)*

### Current state
- `src/lib/career.ts`: `computeReadiness()` (5 generic factors: tracks 35 /
  languages 20 / courses 20 / practice 15 / consistency 10), `buildResume()` +
  `resumeMarkdown()`, `pathCredentials()`, `certVerifyCode()`.
- `src/app/career/page.tsx`: readiness dial + factor bars, skills, certificates
  gallery, a printable résumé sheet (print / copy-as-Markdown), name field.
  All client-derived from `completed[]` (no DB).

### The problem
- Readiness is **generic**, not tied to a target role, so it doesn't tell you "how
  ready am I for *Frontend*" or *what's missing*.
- No **skill-gap → next action** guidance.
- Résumé builder is **single template**, limited fields, no portfolio/projects
  integration depth, no recruiter-facing page.
- No **interview prep** or **job-targeting** layer (the highest-value career
  features per the research — e.g. a job-description gap checker).

### Target
A genuine **career accelerator**: pick a target role → role-specific readiness +
skill-gap plan → a polished résumé/portfolio → interview prep → job-targeting,
ending in a shareable, recruiter-ready credential.

### Work items
- **CA-1** **Role-targeted readiness**: choose a target role (Frontend / Backend /
  Data / AI Eng / Fullstack) → score against THAT role's expected skills with a
  concrete **skill-gap** breakdown and "next best lessons." Build on `lib/paths`. `[H/M]`
- **CA-2** **Next-action engine**: turn gaps into a ranked, deep-linked to-do
  ("Finish SQL Joins → +6 readiness"). `[H/M]`
- **CA-3** **Résumé/portfolio builder v2**: editable sections, contact fields, 2–3
  templates, cleaner PDF/print, deep projects integration (from §2). `[H/M]`
- **CA-4** **Recruiter-facing career page** (public, shareable) — readiness summary,
  projects, certs, skills; a link you can put on LinkedIn. `[H/M]`
- **CA-5** **Interview prep hub**: wire in the `interview` + `behavioral-interviews`
  modules into a "prep plan"; common-questions bank; STAR-answer builder. `[H/M]`
- **CA-6** **Job-targeting / gap checker**: paste a job description → parsed
  required skills vs. yours → match score + what to learn (the Codecademy-style
  feature; can be pure-client heuristic first, AI-assisted for Pro). `[H/H]`
- **CA-7** **Mock interview (Pro, AI)**: role-specific Q&A with feedback. `[M/H]`
- **CA-8** Certificates polish + verifiable credential page (LinkedIn share already
  exists). `[M/M]`

### Multi-agent execution
Moderately parallel — several pieces are disjoint new files:
- **Parallel:** CA-1/CA-2 role-readiness + gap engine (`lib/roleReadiness.ts`,
  pure) · CA-6 job-gap checker (`lib/jobMatch.ts` + a page) · CA-5 interview-prep
  page (new route + lib) · CA-3 résumé-template components (new components).
- **Single owner (shared files):** `lib/career.ts` and `career/page.tsx`
  integration (one agent or hand-wired) since multiple items converge there.
- ONE integrator for nav/wiring.

---

## Suggested execution order
1. **Skill Tree clarity** first (small, high-satisfaction, unblocks confusion) —
   2–3 mostly-sequential agents.
2. **Projects content sweep** (Phase A) — the biggest parallel win; run the content
   fleet + verification agent, then the hub UX.
3. **Career sweep** — role-readiness + job-gap + résumé v2 + interview prep, then
   integrate.

Each section ends with the standard gate before any prod merge: **tsc · npm run
check · full unit tests · production build**, only merging what's green.
