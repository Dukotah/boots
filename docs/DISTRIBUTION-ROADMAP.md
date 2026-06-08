# Distribution Roadmap — Cantrip (2026-06)

How to get Cantrip in front of people and convert them. The product is deep and
fast; the bottleneck is now **distribution + turning the business on**. This is the
plan: what to wire in, which channels, the timeline, and exactly where AI/Claude
helps vs. where it's on you.

The wedge: **"learn to USE AI" / vibe coding** is the hottest education search trend
of the year, and we're the only product pairing it with deep gamification + a career
layer. Lead with that.

---

## 0. What's already built (lean on it — don't rebuild)
- **Analytics funnel** (`src/lib/analytics/track.ts`, Plausible, cookieless): signup →
  lesson_started → first_all_green → paywall_viewed → checkout_started → purchase, plus
  referral_shared/redeemed, streak_milestone, onboarding_goal_selected.
- **SEO infra:** `sitemap.ts`, `robots.ts`, `/api/og` (dynamic share images), per-page
  OG on the top public pages, JSON-LD on content, ~30 SEO blog posts incl. the
  vibe-coding cluster.
- **Viral surfaces:** referral system (`/refer`, two-sided), share buttons on Wrapped /
  certificates / recap / daily.
- **Lifecycle email** (Resend, Day-3/7/14), **reverse trial** (14-day), **launch copy**
  in `docs/launch-kit.md`.

---

## 1. Tie-ins to set up BEFORE launch ("what you need wired in")

### A. Revenue + measurement (Tier 0 — do first; without these a launch wastes traffic)
| Tie-in | Why | Where |
|---|---|---|
| Supabase migrations 0005–0008 | accounts, sync, social, referrals | `docs/go-live.md §0` |
| **Stripe** live keys + 2 prices | the trial can actually convert | `go-live.md §2` |
| `RESEND_API_KEY` + `CRON_SECRET` | lifecycle/win-back emails fire | `go-live.md §4,6` |
| **`NEXT_PUBLIC_PLAUSIBLE_DOMAIN`** | **measure the whole launch funnel** | `go-live.md §8` |
| `SENTRY_DSN` | catch launch-day errors before users do | `go-live.md §9` |
| `NEXT_PUBLIC_SITE_URL` | correct OG/referral/magic-link URLs | `go-live.md` |

### B. Search (free, high-ROI, set up once)
- **Google Search Console** — verify the domain, submit `/sitemap.xml`, watch impressions/queries.
- **Bing Webmaster Tools** — same; also feeds ChatGPT/Copilot search.
- (Plausible above is your real-time traffic/funnel view.)

### C. Accounts to create (the channels)
- **Product Hunt** (launch event), **Hacker News** (Show HN), **Reddit** (r/learnprogramming,
  r/learnpython, r/webdev, r/artificial, r/ChatGPT, r/SideProject — read rules first),
  **Indie Hackers**.
- **X/Twitter** + **LinkedIn** (founder voice), **YouTube + TikTok/Reels** (short-form),
  a **Discord** (community + retention).

### D. AI / automation tooling — the "Claude browser or whatever else"
This is where AI does the heavy lifting. Realistic options, by job:
- **Claude Code (me, in this repo)** → all in-product distribution machinery: SEO pages,
  landing pages, OG images, JSON-LD, share features, referral surfacing, funnel
  instrumentation. *No extra setup — just ask.*
- **claude.ai (chat) + web search** → research (which subreddits/keywords/communities,
  competitor angles), and drafting/tailoring every post, the PH copy, video scripts,
  reply templates. *This is the workhorse for content + research.*
- **Claude with browser / "computer use"** (Claude in Chrome / the computer-use API) →
  semi-automated research and prep: pull subreddit rules, gather competitor/keyword data,
  monitor mentions, queue drafts. **Caveat:** posting *to your accounts* needs your
  login and human review — don't fully automate account actions (ToS/spam risk + it reads
  as inauthentic). Use it to *prepare*, you hit publish.
- **A social scheduler** (Typefully / Buffer) → queue X/LinkedIn threads; Claude drafts,
  scheduler posts on cadence.
- **Optional Zapier/Make** → automations (e.g. new Pro signup → Slack ping; new blog
  post → auto-share draft).

> Connect Plausible **goals** to the existing events (signup, purchase, referral_shared)
> so every channel's conversion is measurable from day one.

---

## 2. Channels, ranked by fit
1. **Programmatic SEO + AEO** (our moat). Compounding, cheap, on-trend. Scale the
   vibe-coding / learn-to-use-AI clusters + per-course/per-path landing pages. AI writes
   these in-repo (me). *Long game, start now.*
2. **Short-form video** (YouTube Shorts / TikTok / Reels). Fastest organic for "learn
   AI / vibe coding" right now. "I built X in 60s", "1 AI trick", → link in bio. Founder
   on camera or screen-recordings. Claude scripts; you record.
3. **Launch events** (Product Hunt + Show HN + Reddit + IH). One-time traffic spikes +
   backlinks + first users. `launch-kit.md` is ready.
4. **Referral / viral loops** (built). Surface harder: prompt to refer after a win,
   shareable Wrapped/cert cards. Every share = free acquisition.
5. **Community** (Discord + helpful Reddit/forum presence). Slow but sticky; powers
   retention + word of mouth.
6. **Email lifecycle** (built). Re-engages signups into the trial → paid.

---

## 3. Phased timeline

### Phase 0 — Foundation (this week)
- Do **Tier-0 config** (§1A). Verify the funnel end-to-end (sign up → complete a lesson →
  trial → test-mode purchase shows in Plausible).
- **Search Console + Bing** verified, sitemap submitted.
- Create the channel accounts (§1C). Pick the AI tooling (§1D).

### Phase 1 — Pre-launch (1–2 weeks)
- **SEO velocity:** I ship the per-course/path landing pages + 10–20 more long-tail posts
  (vibe coding, "how to use [tool]", "learn X in 2026"). Submit to Search Console.
- **Build a tiny audience:** start posting short-form 3–5×/week (Claude-scripted) and
  X/LinkedIn build-in-public threads. Seed value in 2–3 communities (don't spam).
- **Beta:** get 10–30 real users, watch the funnel, fix the top drop-off.
- Prep PH assets (gallery, video, first comment) from `launch-kit.md`.

### Phase 2 — Launch week
- **Product Hunt** (Tue–Thu, 12:01am PT) + **Show HN** + **Reddit** (r/SideProject + a
  fitting niche sub) + **IH**, same day. Rally your audience to upvote/comment early.
- Founder posts across X/LinkedIn; reply to everything.
- Watch Plausible + Sentry live; hotfix fast (I'm on call).

### Phase 3 — Post-launch (compounding)
- **SEO flywheel:** keep publishing; track which posts rank; double down.
- **Short-form cadence** stays weekly. Repurpose winners.
- **Referral + email** do the retention/viral work automatically.
- **Iterate on funnel data:** the biggest drop-off is the next thing I build.

---

## 4. Where Claude/AI plugs in (cheat sheet)
| Job | Tool | Who hits "go" |
|---|---|---|
| In-product SEO pages, landing pages, OG, share features | Claude Code (me) | me → you merge |
| Research keywords/subreddits/competitors | claude.ai + web search (or Claude browser) | you, guided |
| Draft posts / PH copy / video scripts / replies | claude.ai chat | you edit + post |
| Monitor mentions, gather community rules, prep queues | Claude browser / computer-use | you supervise |
| Schedule + post on cadence | Typefully/Buffer (Claude drafts) | you/scheduler |
| Automations (signup pings, auto-share drafts) | Zapier/Make | you |

**Honest line:** AI removes ~80% of the *grind* (research, drafting, building) but not the
*authenticity* — the on-camera presence, the genuine community replies, and clicking
publish on your accounts are yours. Don't fully automate posting; it backfires.

---

## 5. Metrics (all measurable via the existing funnel)
- **Acquisition:** visits by source (Plausible), Search Console impressions/clicks.
- **Activation:** signup → first_all_green rate (the "first win"). Target ≥ 40% of signups.
- **Monetization:** trial starts → purchase. Target trial-to-paid ≥ 10–15%.
- **Virality:** referral_shared → referral_redeemed; shares per active user.
- **Retention:** D1/D7 return, streak_milestone counts.

---

## 6. What I can build next (code) vs. what's on you
**Me (next distribution swarm, if you want):**
- Per-course + per-path **landing pages** with `Course`/`FAQ` JSON-LD + custom OG.
- **Shareability everywhere** (one-tap share on every win) + referral surfacing.
- **Homepage-conversion** polish (above-the-fold value prop + first CTA).
- More long-tail **SEO posts** at volume.
- Plausible **goal wiring** + a simple internal funnel dashboard.

**You (no code):**
- Tier-0 config + Search Console.
- The launch (PH/HN/Reddit), short-form video, community presence — AI-assisted but
  founder-fronted.
