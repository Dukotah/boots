# Go-live runbook

Everything in the app **graceful-degrades**: with no credentials it runs as a
local-only game (progress in `localStorage`, paid/email/push/GitHub features
hidden or no-op). This runbook turns the scaffolded-but-dormant systems on for
production. Work top to bottom — each section is independent, so you can enable
only what you want.

> Many steps require *your* secrets and live dashboards (Supabase project, Resend,
> Stripe, GitHub App). They can't be done from the codebase alone — this is the
> checklist to do them yourself.

---

## 0. Database migrations (do this first)

All gameplay sync depends on the `profiles` columns added by the migrations in
`supabase/migrations/`. **`0005` is the one most likely missing in prod** — it
adds `talents`, `cosmetics`, `equipped`, `streak_freezes`, `guild_id`,
`guild_name`, and `rev`. Without it, skill-tree/cosmetic sync and the new public
build card silently no-op (the writes are best-effort try/catch).

Two later migrations must also be applied:
- **`0006`** — referrals table (powers `/refer` + `/api/referrals`).
- **`0007`** — adds `goal`, `onboarded`, `daily_challenge_claimed`,
  `daily_challenge_streak`, `daily_challenge_best` to `profiles` so onboarding
  goal + Daily Challenge streak survive a device switch. Without it those fields
  stay localStorage-only (graceful — sync is best-effort try/catch).

> The `/teams` waitlist (`/api/teams-waitlist`) needs its own table (SQL in
> `docs/teams-design.md`) before it persists; until then it returns
> `{ ok: true, skipped: true }` harmlessly.

Apply them in order (`0001` → `0007`). Two ways:

**A. Supabase SQL editor (quickest):** open each file under
`supabase/migrations/`, paste into the SQL editor, run. All are idempotent
(`add column if not exists`, etc.), so re-running is safe.

**B. Supabase CLI:**
```bash
supabase link --project-ref <your-ref>
supabase db push           # applies every migration in supabase/migrations
```

Verify in the SQL editor:
```sql
select column_name from information_schema.columns
where table_name = 'profiles'
  and column_name in ('talents','cosmetics','equipped','streak_freezes','guild_name','rev',
                      'goal','onboarded','daily_challenge_streak','daily_challenge_best');
-- expect all 10 rows (the last 4 confirm migration 0007)
```

---

## 1. Core: Supabase auth + cloud progress

| Env | Where |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Project Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | same page (anon public key) |
| `SUPABASE_SERVICE_ROLE_KEY` | same page (service_role secret) — **server only**, used by every cron + admin job |

Test: sign up at `/login`, complete a lesson, reload — progress persists; the row
appears in `profiles`.

## 2. Payments (Stripe)

`STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PRICE_MONTHLY`,
`STRIPE_PRICE_ANNUAL`, `NEXT_PUBLIC_SITE_URL`. Create two recurring Prices, point
a webhook at `/api/stripe/webhook`, paste the signing secret. Test with a Stripe
test card; entitlement should flip in `profiles` (migration `0004`).

## 3. AI tutor (Anthropic)

`ANTHROPIC_API_KEY` (server only). Without it `/api/tutor` returns a friendly
"not configured". Test: open a lesson, ask "Ask Boots" a question.

## 4. Lifecycle email (Resend)

`RESEND_API_KEY`, `EMAIL_FROM` (a verified Resend sender/domain). Needs
`SUPABASE_SERVICE_ROLE_KEY` (§1) too. Manual test:
```bash
curl -H "Authorization: Bearer $CRON_SECRET" https://<site>/api/email/streak-reminder
# → {"ok":true,...}  (or {"skipped":true,"reason":"not configured"} if a key is missing)
```

## 5. Web Push (PWA)

Generate a keypair: `npx web-push generate-vapid-keys`.
`NEXT_PUBLIC_VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`, `VAPID_SUBJECT`
(`mailto:you@domain`). Plus service role. Test: enable notifications on the
dashboard (writes to `push_subscriptions`), then:
```bash
curl -H "Authorization: Bearer $CRON_SECRET" https://<site>/api/push/send
```

## 6. Crons (scheduling — required for §4, §5, and weekly Leagues)

The endpoints exist but need a scheduler. `vercel.json` (committed) declares:

| Path | Schedule (UTC) | Purpose |
| --- | --- | --- |
| `/api/email/streak-reminder` | `0 17 * * *` daily | streak-at-risk email |
| `/api/push/send` | `5 17 * * *` daily | streak-at-risk push |
| `/api/leagues/close-season` | `0 0 * * 1` weekly Mon | promotion/relegation + reset |

Set a **`CRON_SECRET`** env var in Vercel. Vercel Cron automatically sends it as
`Authorization: Bearer <CRON_SECRET>`, which is exactly what each route checks; an
unauthenticated hit gets `401`. (If `CRON_SECRET` is unset the routes allow all
callers — fine for dev, **set it in prod**.)

> ⚠️ **Vercel plan limits:** Hobby allows only daily cron frequency and a small
> number of jobs. The weekly `0 0 * * 1` League close and three total jobs need
> **Vercel Pro**. On Hobby, run `close-season` from an external scheduler
> (GitHub Actions `schedule:` calling the URL with the Bearer header) instead.

## 7. GitHub "coding journey" App

See `docs/github-journal.md` for App registration. Env: `GITHUB_APP_ID`,
`GITHUB_APP_PRIVATE_KEY` (one line, literal `\n`), `NEXT_PUBLIC_GITHUB_APP_SLUG`.
Needs migration `0002`. Untested against live GitHub — verify a real commit lands
on a test account before announcing.

## 8. Analytics (optional)

`NEXT_PUBLIC_PLAUSIBLE_DOMAIN` to enable the (cookieless) Plausible script.

## 9. Error tracking (optional, recommended)

Config files (`sentry.client.config.ts` / `sentry.server.config.ts`) are committed
and no-op until activated. To turn on: `npm i @sentry/nextjs` and set `SENTRY_DSN`
+ `NEXT_PUBLIC_SENTRY_DSN`. Full steps in [`observability.md`](./observability.md).

---

## Smoke test after deploy

1. `/dashboard` loads, stat cards + **talent build card** render.
2. Sign in → complete a lesson → reload → progress persists.
3. Buy a cosmetic, equip it, open `/u/<your-handle>` → cosmetic + build card show.
4. `curl` each cron URL with the Bearer header → `{"ok":true}` (not `skipped`).
5. Skill Tree `/skill-tree` shows all **four** branches incl. 📚 Scholar.
