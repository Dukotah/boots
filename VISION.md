# Cantrip — Vision

## What this is
**Cantrip** (codename/mascot "Boots") is a gamified, multi-language coding
academy — think **boot.dev × Duolingo**. Learners work through interactive,
auto-graded lessons in JavaScript, TypeScript, Python, SQL, and HTML, earning XP,
gold, levels, streaks, and climbing competitive leagues, while an AI tutor coaches
them Socratically. It runs as a Next.js 14 (App Router) app on Supabase + Stripe,
with all code execution happening **client-side** (JS in a Web Worker, Python via
Pyodide/WASM, SQL via sql.js) — so there is no server sandbox to operate and our
inference bill for the on-device/BYOK tutor is effectively zero.

## Who it's for
- **Primary:** self-driven beginners-to-intermediate developers who want to *get a
  job* or level up — motivated by progress, streaks, and a portfolio they can show.
- **Secondary:** younger learners (there's a Kids track; COPPA-aware analytics) and,
  eventually, **teams/bootcamps/schools** (B2B is the revenue multiplier).

## Current state (honest read)
This is a **mature, feature-rich platform**, not a prototype. As of this writing:
93 curriculum modules / 656 lessons / 1738 reference tests, all green; production
build = ~1490 static pages. Shipped systems include: RPG engine (XP/levels/gold/
streaks), real 7-day **Leagues**, **Quests** (daily/weekly/chains), **Achievements**
(55+), **Talents/skill-tree**, **Shop** (no pay-to-win), **Boss battles**,
**Guilds**, **Daily Challenge**, **Spaced-repetition Review**, **Portfolio
Projects**, **Career Pack** (readiness score + résumé), **Certificates**, **public
profiles**, **Referrals**, **Analytics** (Plausible) + **A/B experiments**,
**lifecycle email** (Resend), **PWA + push**, **Stripe billing**, **server-side
scoring** for code lessons, and a **191-case unit-test suite** with CI.

**The gap is not features — it's the last mile to trustworthy, fast, live, and
converting.** The app currently lives on an unmerged dev branch and is not
deployed to production; several go-live steps are owner-gated (apply DB
migrations, set service secrets).

## The bar: what "fully functional" means
1. **Trustworthy** — scoring/XP that gates leagues & certs is server-validated;
   no client can forge progress. Sync is correct across devices.
2. **Fast** — initial JS per route is lean; heavy runtimes/editor load on demand.
3. **Tested & green** — unit coverage on all core logic + key UI; CI gates every
   push; the build never breaks.
4. **Live-ready** — every external dependency (DB migrations, email, push, Stripe,
   Sentry) is wired with graceful degradation and a clear, complete runbook.
5. **The funnel works** — a new visitor can go signup → first lesson → first
   "all green" → return, and every step is instrumented.

## Winning (beyond functional)
- **Best gamified learning UX, period** — the loop is so satisfying people come
  back daily; streaks and leagues drive retention like Duolingo's.
- **SEO domination via breadth** — we rank for "learn X" across many languages and
  topics; long-tail how-to/cheatsheet pages are top-of-funnel at ~zero CAC.
- **A credential employers trust** — certificates + a real portfolio of shipped
  projects that closes the loop to a job.
- **B2B as the multiplier** — teams/education licensing on top of the consumer
  funnel.
- **Structural margin advantage** — BYOK/on-device tutor means we don't eat the
  inference bill our competitors do.

## Non-negotiables
- **Integrity:** never fabricate progress (e.g. GitHub journal commits only on
  genuine completion). Gold can never buy power (no pay-to-win).
- **Kids safety:** analytics stay cookieless/PII-free; age-gate at auth.
- **No broken commits:** build + tests green before anything is "done."
