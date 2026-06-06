# Cantrip for Teams — Design Document

## Overview

Cantrip for Teams is the B2B/cohort offering layered on top of the existing
individual product. An **org admin** buys a seat bundle, invites learners via
email or SSO, and sees cohort progress in an admin dashboard. The individual
game loop (XP, streaks, boss battles) is unchanged — Teams just adds a managed
access layer and reporting.

---

## Data Model

### Table: `public.orgs`

The root tenant entity. One per company / bootcamp / team.

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` | PK, `gen_random_uuid()` |
| `name` | `text` | Display name ("Acme Corp", "Dev Bootcamp Cohort 4") |
| `slug` | `text` | URL-safe unique identifier used in admin URLs |
| `plan` | `text` | `'trial' \| 'teams'` — future: `'enterprise'` |
| `seats_purchased` | `int4` | Total paid seats; nullable = unlimited (enterprise) |
| `seats_used` | `int4` | Maintained by trigger or computed view |
| `billing_email` | `text` | Org-level billing contact (not the admin's personal email) |
| `stripe_customer_id` | `text` | Nullable until first payment |
| `sso_domain` | `text` | Nullable; reserved for future SAML/OIDC domain claim |
| `sso_provider` | `text` | Nullable; e.g. `'google'`, `'okta'`, `'azure'` |
| `created_at` | `timestamptz` | Auto-set |
| `trial_ends_at` | `timestamptz` | Null after plan upgrade |

**Indexes:** unique on `slug`; index on `stripe_customer_id`; index on `sso_domain` for future SSO claim resolution.

---

### Table: `public.org_memberships`

Join table between users (profiles) and orgs.

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` | PK |
| `org_id` | `uuid` | FK → `orgs.id` ON DELETE CASCADE |
| `user_id` | `uuid` | FK → `profiles.id` ON DELETE CASCADE |
| `role` | `text` | `'admin' \| 'member'` |
| `status` | `text` | `'active' \| 'invited' \| 'suspended'` |
| `invited_email` | `text` | Set when status = 'invited' (pre-signup) |
| `invited_at` | `timestamptz` | |
| `joined_at` | `timestamptz` | Set when status flips to 'active' |
| `created_at` | `timestamptz` | |

**Indexes:** unique on `(org_id, user_id)`; index on `invited_email`; index on `org_id` for admin queries.

**Roles:**
- `admin` — can invite/remove members, view cohort progress, manage billing.
- `member` — full Pro access (seat consumed), no admin views.

Multiple admins per org are allowed (no single-owner constraint).

---

### Table: `public.org_invites`

Short-lived invite tokens sent via email. Separate from memberships so
unauthenticated users can accept before creating their account.

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` | PK |
| `org_id` | `uuid` | FK → `orgs.id` ON DELETE CASCADE |
| `email` | `text` | The invited address |
| `role` | `text` | `'admin' \| 'member'` |
| `token` | `text` | Secure random token (32-char hex, unique) |
| `created_by` | `uuid` | FK → `profiles.id` — the admin who invited |
| `expires_at` | `timestamptz` | Default: now() + interval '7 days' |
| `accepted_at` | `timestamptz` | Null until redeemed |

**Indexes:** unique on `token`; index on `(org_id, email)`.

---

### teams_waitlist Table (MVP — pre-launch)

Used by the `/api/teams-waitlist` route before the full org system ships.

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` | PK, `gen_random_uuid()` |
| `email` | `text` | Waitlisted address; unique |
| `team_size` | `text` | Optional freeform ("5–10", "50+") |
| `created_at` | `timestamptz` | Auto-set |

**No PII is logged server-side.** The email is stored only in the DB row.

---

## Roles & Permissions

| Action | member | admin | service_role |
|---|---|---|---|
| Read own profile | yes | yes | yes |
| View cohort progress | no | yes | yes |
| Invite members | no | yes | yes |
| Remove members | no | yes | yes |
| Change org settings | no | yes | yes |
| Grant Pro via seat | no | auto | yes |
| Access billing portal | no | yes | yes |

**RLS policy sketch:**
- `orgs`: admins of an org can SELECT/UPDATE their own row.
- `org_memberships`: members can SELECT rows for their own org. Admins can INSERT/DELETE.
- `org_invites`: admins can INSERT; anyone can SELECT by token (for accept flow).

---

## Seat Consumption & Pro Entitlement

When a membership is created with `status = 'active'`, a DB trigger (or edge
function) sets `profiles.is_pro = true` for that user. When a seat is revoked
(status → 'suspended' or row deleted), the trigger reverts `is_pro` **only if**
the user has no active individual subscription (check `profiles.stripe_subscription_status`
before flipping).

`seats_used` on `orgs` is maintained by a trigger that counts active memberships,
keeping it cheap at query time.

---

## Admin Dashboard — Route Plan

All admin routes are nested under `/teams/[slug]/` and protected by a
server-side RLS check that validates the session user is an admin of that org.

| Route | Purpose |
|---|---|
| `/teams` | Marketing landing + waitlist (this sprint) |
| `/teams/[slug]` | Org home — seat usage, quick stats |
| `/teams/[slug]/members` | Paginated member list; invite + remove actions |
| `/teams/[slug]/progress` | Cohort progress: course completion %, avg XP, streak leaders |
| `/teams/[slug]/settings` | Org name, billing email, SSO config (future) |
| `/teams/[slug]/billing` | Stripe customer portal redirect |
| `/api/teams/[slug]/members` | POST invite, DELETE remove |
| `/api/teams/[slug]/progress` | GET cohort aggregates |

Route guards: a `requireOrgAdmin(slug)` helper (mirroring `getSupabaseServerClient`)
calls `sb.auth.getUser()` then queries `org_memberships` for `role = 'admin'`.
Returns 403 if not found.

---

## Cohort Progress View

The `/teams/[slug]/progress` page shows per-member and aggregate stats:

- **Per-member table:** avatar, display name, total XP, streak, courses started,
  courses completed, last active date.
- **Aggregate strip:** avg XP, median streak, total lessons completed, % of
  members active this week.
- **Course completion heatmap:** matrix of member × course, showing % complete
  per course (useful for bootcamps tracking a prescribed curriculum).

Data sourced from existing tables: `profiles` (xp, streak), `user_lessons`
(completion), `user_courses`. No new tracking tables required.

---

## SSO — Deferred Design

The `sso_domain` and `sso_provider` columns are reserved now. When SSO ships:

1. An admin claims a domain (e.g. `acme.com`) — we verify via DNS TXT record.
2. Any user who signs in via Google/Okta/Azure with a matching email domain is
   auto-provisioned into the org as a member.
3. Provider config (client ID, secret, issuer URL) stored in `org_sso_configs`
   (separate table, service-role-only reads).

Supabase supports custom SAML providers via the Auth admin API — plug in there.

---

## Migration Files (to apply when Supabase is wired)

```
supabase/migrations/0010_orgs.sql          -- orgs table, RLS
supabase/migrations/0011_memberships.sql   -- org_memberships, org_invites, triggers
supabase/migrations/0012_teams_waitlist.sql -- teams_waitlist table
```

### `0012_teams_waitlist.sql` (minimal, ship now)

```sql
create table if not exists public.teams_waitlist (
  id          uuid primary key default gen_random_uuid(),
  email       text not null unique,
  team_size   text,
  created_at  timestamptz not null default now()
);

-- No user-facing RLS needed — this table is write-only via service_role in
-- the API route. Reads happen only in the admin dashboard (service_role).
alter table public.teams_waitlist enable row level security;

-- Allow the anon/authenticated key to insert (waitlist form is public).
create policy "insert_waitlist" on public.teams_waitlist
  for insert with check (true);
```

---

## Pricing Model (draft)

| Tier | Price | Seats | Notes |
|---|---|---|---|
| Teams Starter | $49/mo | 5 | Billed monthly; cohort dashboard |
| Teams Growth | $149/mo | 20 | All courses, AI tutor per seat |
| Teams Scale | $399/mo | 60 | Priority support |
| Enterprise | Custom | Unlimited | SSO, dedicated CSM |

Annual billing: 2 months free (same as individual).

---

## File Map

| File | Purpose |
|---|---|
| `docs/teams-design.md` | This document |
| `src/app/teams/page.tsx` | Marketing landing + waitlist form |
| `src/app/api/teams-waitlist/route.ts` | Waitlist POST handler |
| `supabase/migrations/0012_teams_waitlist.sql` | Waitlist table (apply manually) |
| `src/app/teams/[slug]/page.tsx` | Org home (future) |
| `src/app/teams/[slug]/members/page.tsx` | Member management (future) |
| `src/app/teams/[slug]/progress/page.tsx` | Cohort progress (future) |
| `src/app/teams/[slug]/settings/page.tsx` | Org settings (future) |
| `src/lib/teams.ts` | Shared helpers: requireOrgAdmin, seatHelpers (future) |
| `src/app/api/teams/[slug]/members/route.ts` | Member CRUD API (future) |
| `src/app/api/teams/[slug]/progress/route.ts` | Cohort aggregates API (future) |
