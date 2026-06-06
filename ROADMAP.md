# Cantrip — Roadmap

Phased path from the current state (mature, branch-only, not yet live) to **fully
functional** and then into **polish & growth**. Each phase has milestones and a
clear Definition of Done (DoD). Granular backlogs live in
[`docs/ROADMAP-100.md`](./docs/ROADMAP-100.md) and
[`COMPETITIVE-ROADMAP.md`](./COMPETITIVE-ROADMAP.md); the earlier prioritized list
is archived at [`docs/roadmap-archive-pass2.md`](./docs/roadmap-archive-pass2.md).
This file is the operating plan. Day-to-day task state is in [`TASKS.md`](./TASKS.md).

Legend: ✅ done · �doing · ⬜ todo · ⚠️ owner-gated (needs secrets/live services).

---

## Phase 0 — Foundation (DONE)
The platform itself: engine, curriculum, gamification, billing, analytics, tutor,
PWA, server scoring, CI, unit tests. **DoD met:** tsc clean, 191 unit tests +
1738 curriculum tests green, build = 1490 static pages.

## Phase 1 — Production Hardening  🔓 (current)
Make it **trustworthy, fast, and provably correct** — the floor for shipping.

- **Perf:** strip curriculum content from client bundles (lesson page is the worst
  offender, ~638 kB); on-demand editor + runtimes (done). Target: lesson route
  first-load well under 500 kB.
- **Integrity:** server-validate quiz/HTML completion (code lessons already do);
  basic XP anti-cheat (rate/anomaly guard); cross-device sync correctness (0007).
- **Test coverage:** component tests for core UI (XP bar, test results, daily
  challenge, projects) + a coverage script; CI keeps gating on `npm test`.
- **Robustness:** loading/empty/error states on every primary route; error
  boundaries report (Sentry-ready).
- **Go-live readiness:** runbook complete & current (migrations 0005–0007, env,
  crons); every external dep graceful-degrades.

**DoD:** CI green; lesson route < 500 kB first-load; quiz/HTML scoring
server-checked; component tests cover the core loop; `docs/go-live.md` is a
push-button runbook.

## Phase 2 — Launch & Funnel
Convert visitors. Onboarding 60-sec first-win polish; paywall/pricing experiment
readouts; SEO completeness (titles, sitemaps, structured data, cheatsheets/how-to);
lifecycle email wired; certificates "Add to LinkedIn."

**DoD:** signup→first-lesson→first-green→day-2 funnel fully instrumented and each
step measured; pricing experiment has a readout; SEO audit passes.

## Phase 3 — Retention & Depth
Daily-challenge v2 (tiers/leaderboard), in-app notifications center, weekly recap,
per-lesson community solutions (moderated), guild depth, friend-duel runtime.

**DoD:** D1/D7 retention instrumented with ≥1 shipped lever per surface; community
solutions live behind a pass-gate.

## Phase 4 — B2B / Teams (revenue multiplier)
Org accounts, seat management, admin + cohort-progress dashboards, bulk invite,
SSO (later). Scaffold exists (`/teams`, waitlist API, design doc).

**DoD:** an org can be created, seats assigned, and a cohort's progress viewed.

## Phase 5 — Scale & Compliance
i18n framework, WCAG 2.1 AA pass, GDPR/CCPA (export+delete shipped — extend),
compiled languages (Go/Rust/C) via a server sandbox, perf at scale (indexes, edge
cache).

**DoD:** AA audit passes; one additional locale renders; data-rights flows verified.

---

## IMPROVEMENTS (continuous — built as they prove worth it)
Owner-driven upgrades beyond the phase plan; promoted into a phase when picked up.

- 🔄 Curriculum-data split so NO client route ships lesson content it doesn't render. *(Phase 1, in progress)*
- ⬜ Lazy-load heavy below-the-fold sections where it measurably helps.
- ⬜ Achievement progress for time-of-day/collector badges (needs new stat tracking).
- ⬜ Résumé PDF via a real renderer if print-CSS fidelity proves insufficient.
- ⬜ Server-backed friends/guild leaderboards once profiles are queried at scale.
- ⬜ Tutor: unify Local/Key/Pro into one provider-toggle panel.
- ⬜ Finish the Cantrip/Boots brand policy sweep (2 leaks fixed; keep watch).
- ⬜ `test:coverage` baseline + ratchet in CI.
- ⚠️ Apply migrations 0005/0006/0007 live; `npm i @sentry/nextjs` + DSN; Stripe
  referral coupon; exercise email/push/GitHub against live creds.
