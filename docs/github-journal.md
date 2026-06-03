# GitHub "Coding Journey" integration

Let learners commit their solutions + a live progress `README` to a repo **they
own** as they complete lessons. Because the commits are real (one per lesson
actually solved), their GitHub contribution graph reflects genuine learning — a
signal recruiters value.

This integration is **optional**. With no env vars set, the feature stays hidden
and the app behaves exactly as before.

> **Integrity:** commits only ever happen when a learner genuinely completes a
> lesson. We never backdate or fabricate commits to fake the contribution graph.

## How it works

1. Learner clicks **Connect GitHub** on `/profile` → installs the Boots GitHub
   App on **one repo** of their choosing.
2. GitHub redirects to `/api/github/setup`, which stores the `installation_id`
   and their GitHub login on their `profiles` row.
3. On each first-time lesson completion, the browser calls `/api/github/commit`.
   The server mints a short-lived installation token and commits:
   - `solutions/<course>/<lesson>.<ext>` — the passing solution
   - `README.md` — an auto-updated progress dashboard (level, XP, streak, per-course bars)

Tokens are never stored — they're minted per request from the App private key,
which lives server-side only. The stored `installation_id` is useless without it.

## One-time setup

### 1. Register a GitHub App

GitHub → **Settings → Developer settings → GitHub Apps → New GitHub App**.

- **Homepage URL:** your site URL
- **Callback / Setup URL:** `https://<your-domain>/api/github/setup`
  and tick **“Redirect on update”**
- **Webhook:** can be disabled (we don't use webhooks)
- **Repository permissions:** **Contents → Read & write** (nothing else)
- **Where can this app be installed:** *Any account*

Then generate a **private key** (downloads a `.pem`).

### 2. Environment variables

```bash
GITHUB_APP_ID=123456
# Paste the PEM on one line, newlines as literal \n:
GITHUB_APP_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\nMIIE...\n-----END RSA PRIVATE KEY-----"
# The App's public slug (from github.com/apps/<slug>):
NEXT_PUBLIC_GITHUB_APP_SLUG=your-app-slug
```

### 3. Database

Run the new migration (adds three columns to `profiles`):

```sql
-- supabase/migrations/0002_github_journal.sql
alter table public.profiles
  add column if not exists github_login           text,
  add column if not exists github_installation_id bigint,
  add column if not exists github_repo            text;
```

Existing RLS (`users update own profile`) already restricts these columns to
their owner.

## Files

| File | Role |
|---|---|
| `src/lib/github/app.ts` | Server App client: JWT, installation tokens, `commitFile` |
| `src/lib/github/journal.ts` | Pure builders for solution files + the README |
| `src/lib/github/link.ts` | Reads the signed-in user's GitHub link off their profile |
| `src/lib/github/journalClient.ts` | Fire-and-forget client trigger |
| `src/app/api/github/route.ts` | Status (GET) + repo selection (POST) |
| `src/app/api/github/setup/route.ts` | Post-install callback |
| `src/app/api/github/repos/route.ts` | List installable repos |
| `src/app/api/github/commit/route.ts` | Commit a completed lesson |
| `src/components/features/github/GithubJournalCard.tsx` | Connect / pick-repo UI |

## Not yet wired (next steps)

- **Disconnect** button (a `DELETE` that clears the three columns).
- **Repo auto-create** — currently the learner selects an existing repo at
  install time; we could create `coding-journey` for them via the App.
- **Batch/daily commits** to reduce noise for very fast learners.
