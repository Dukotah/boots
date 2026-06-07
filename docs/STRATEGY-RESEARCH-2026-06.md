# Cantrip — Market Research & Implementation Backlog (2026-06)

Synthesis of a multi-agent web research sweep (competitors · "learn to use AI" market ·
gamification/learning-science · growth/SEO/conversion) plus an internal UX/polish audit.
Sources are cited in the agent reports; key links collected at the bottom.

## The one-line takeaway

We're early to the single hottest education trend of the moment — **"learn to USE AI"
and "vibe coding"** — and we're the **only** product combining it with deep
gamification, interactive auto-grading, and a career layer. The strategy writes itself:
**double down on the AI path as the wedge, then convert with a reverse trial and
credentials.**

---

## Validated market signals (why the AI path is the bet)

- **"Vibe coding" was Collins Dictionary Word of the Year 2025**; searches up ~2,400%
  since Jan 2025. The AI-code-gen market is ~$4–7B and growing ~38%/yr.
- **AI skills carry a ~56% wage premium** (PwC 2025, up from 25% the year before);
  AI-skill job postings grew while overall postings fell.
- **Udemy AI enrollments 5×'d in a year (>11M)**; Skillsoft AI completions +261–994% YoY.
- Nobody teaching this is **gamified or interactive** — they're video + static quizzes
  with ~20% completion. Gamified platforms hit ~90% completion. **That gap is ours.**
- Content gaps we can own: the **beginner→builder bridge** (power user → automator →
  app builder → shipper), **vibe coding for non-developers with business outcomes**,
  **AI media as a workflow** (not art theory), and a **"staying current with AI"** meta-module.

## Where we already lead (defend + market it)

- Full gamification stack (XP, gold, **weekly leagues w/ promotion-relegation**, quests,
  boss battles, skill tree, guilds, achievements, spaced repetition) — boot.dev is the
  only competitor close, and it's backend-only at $399/yr (we're ~$108/yr annual).
- A **career layer** (job-readiness score + résumé + certificates) nobody else bundles.
- A **free on-device AI tutor** — every competitor's AI is server-side and paywalled.

---

## Implementation backlog (ranked, cross-referenced across all reports)

Tags: [I]mpact / [E]ffort — H/M/L. ✅ = already done this session.

### Tier 1 — highest leverage, do first
1. **Reverse trial** (7–14 days full Pro on signup, then downgrade to free). EdTech
   freemium converts ~2.6%; trial-to-paid ~25%. This is the single biggest revenue lever. `[I:H E:M]`
2. **Define + instrument the Week-1 activation moment** ("I built/ran something that
   worked" in session 1, <15 min). 90% of users churn in week 1 without a first win.
   We have `/onboarding` + goal routing — measure it and tighten to first-run execution. `[I:H E:M]`
3. **"Vibe coding" SEO cluster**: a pillar page + ~10 cluster how-tos, FAQPage/Article/
   BreadcrumbList schema, 40–60 word lead answers (for AI Overviews). First-mover on a
   trending, low-competition keyword. `[I:H E:M]`
4. **Annual plan as pricing default** + "Save 53%" badge + 30-day money-back guarantee.
   Near-zero effort, ~19% annual-adoption lift, up to 34% conversion lift from guarantee. `[I:H E:L]`
5. **LinkedIn-shareable completion certificate** (share on free = acquisition loop; the
   verified credential = Pro upgrade trigger at the highest-intent moment). `[I:H E:M]`

### Tier 2 — strong retention/learning wins
6. **Upgrade spaced repetition from Leitner → FSRS** (open-source `ts-fsrs`). Directly
   improves the core learning outcome; advertise "smarter review queue". `[I:H E:M]`
7. **True retrieval practice in reviews** (type/construct the answer before reveal, not
   recognition). The testing effect ≈ +50% retention vs. re-study. `[I:H E:L]`
8. **Bilateral "Study Buddy" pair streaks** (both must hit daily goal). Duolingo's friend
   streaks: +22% daily completion. Tighter accountability than guilds. `[I:H E:M]`
9. **Streak decay instead of hard reset** (lose a day → −10 days, not →0) + a "minimum
   viable streak action" (e.g., 3 review cards) for busy days. Leniency *increases*
   long-term engagement; hard resets are the #1 churn trigger. `[I:M E:L]`
10. **Intentional interleaving** in quest chains (every 5th lesson revisits an older
    mastered skill). Improves transfer to real projects. `[I:M E:M]`
11. **Variable-reward boss "loot chest"** (spin-reveal within tier) instead of fixed
    rewards — fixed rewards habituate to ~0 dopamine in 3–5 reps. `[I:M E:M]`
12. **Goal-gradient nudge at ~85% to level-up** ("3 more exercises → [Level]!" + 1-tap
    shortcut). Effort spikes near a visible goal. `[I:M E:L]`

### Tier 3 — growth/curriculum/ops
13. **Comparison + "alternative to" pages** ("Cantrip vs Codecademy/freeCodeCamp", "best
    free coding courses 2026"). Proven high-intent traffic. `[I:M E:L]`
14. **Personalized notifications**: per-user send-time, frequency cap (≤1 behavioral
    push/day, none 10pm–8am), Day-3/7/14 re-engagement cadence. Recovers 10–25% of
    lapsers; >2–5/wk causes 46% to opt out. `[I:M E:M]`
15. **XP double-weekend events** (2× XP biweekly + Friday-9am prime). Duolingo saw +50%
    activity. `[I:M E:L]`
16. **League pool segmentation by activity tier** + weight league XP by lesson difficulty
    (kills XP-farming; keeps mid-tier competitive). `[I:M E:M]`
17. **Two-sided referral**: referrer gets a free Pro month, referee gets an extended
    trial. Product-aligned viral loop. `[I:M E:M]`
18. **"Cantrip Wrapped"** year-in-review (XP, longest streak, bosses slain, gold, hours)
    — Spotify-Wrapped-style shareable. Huge organic moment for an RPG-coded academy. `[I:M E:L]`
19. **New AI modules** (from the market report): AI Power User multi-model lab, AI
    Automation w/o code, Custom GPTs/Assistants, AI Video & Voice, "Staying Current with
    AI" meta-module, "Build & Sell an AI Product" capstone. (We already shipped
    ai-for-everyone, ai-power-user, ai-image-generation, ai-integrations, vibe-coding,
    ai-for-business this week.) `[I:H E:M]`
20. **Guild-vs-guild co-op boss battles** (members' lesson completions combine to damage
    a shared boss; top guilds get badges). No competitor does this. `[I:H E:H]`

### Risks to avoid (learning-science report)
- **Streak anxiety / dark patterns** — keep leniency; add a "streak health" nudge if a
  user only ever does minimum-viable actions for 60+ days.
- **League demotion stress** — offer an opt-out "solo learning lane" (compete with self).
- **Extrinsic overload** — for 60+ day engaged users, shift UI emphasis toward mastery
  maps/projects over points (over-justification effect harms intrinsic motivation).
- **Accuracy drift in AI lessons** — model names, pricing, and tool leaders change
  monthly. Frame claims as "as of [date]", teach *how to evaluate* tools, and review
  AI-path content quarterly. Include a "review & test AI-generated code" lesson (45% of
  AI code fails OWASP benchmarks) — already covered in vibe-coding's debug lesson. ✅

---

## Done this session (from this research + the QA list)
- ✅ Flagship "Work with AI" path (12 modules, beginner→builder), led on homepage.
- ✅ 6 new AI modules: ai-for-everyone (free), ai-power-user, ai-image-generation,
  ai-integrations, vibe-coding, ai-for-business.
- ✅ Course catalog search; lesson editor height; project XP monotonic; blank-flash
  skeletons; mobile-nav hardening; footer/branding leak; friends/guilds/recap polish +
  a11y (aria-live, labels, contrast, table overflow, duplicate-duel guard).

## Key sources
Competitors: boot.dev, Codecademy, Scrimba, Mimo, DataCamp, Brilliant, CodeSignal Cosmo.
AI market: Collins WOTY 2025, PwC AI Jobs Barometer 2025, Taskade/Hostinger vibe-coding
stats, OpenAI Academy, Anthropic courses, DeepLearning.AI, Google AI Essentials.
Learning science: Duolingo eng blog, FSRS (domenic.me/fsrs), Nature interleaving study,
Wiley 2025 gamification meta-analysis, Amplitude time-to-value.
Growth: Artisan SaaS benchmarks 2026, GTM Strategist reverse-trial, Frase/Zensciences AEO,
Velir topical authority, Monetizely annual-pricing psychology.
(Full URL lists are in the session's agent reports.)
