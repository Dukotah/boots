# Data Rights — GDPR / CCPA Export & Erasure

This document describes how Cantrip honours user data-access and deletion
requests, and the technical implementation behind `/account`.

---

## Rights covered

| Right | Regulation | Implementation |
|---|---|---|
| Right of access / portability | GDPR Art. 15, 20 · CCPA §1798.110 | Export as JSON from `/account` |
| Right to erasure ("right to be forgotten") | GDPR Art. 17 · CCPA §1798.105 | Delete account from `/account` |

---

## Export flow

1. The user visits `/account` (authenticated or anonymous) and clicks **Export as JSON**.
2. The page assembles a snapshot **client-side** from the Zustand store (`boots-progress` in localStorage). No server roundtrip is required for anonymous users.
3. When the user is signed in and Supabase is configured, the page additionally fetches the `profiles` row via the browser Supabase client and merges it into the bundle.
4. The result is serialised to a `.json` file and downloaded in-browser via a `<a download>` element — no file ever touches our servers.

### Bundle contents

```jsonc
{
  "exportedAt": "ISO-8601 timestamp",
  "source": "Cantrip",
  "userId": "uuid or null",
  "email": "user@example.com or null",
  "progress": {
    "xp": 0,
    "gold": 0,
    "streak": 0,
    "completed": [],        // lesson ids
    "achievements": [],     // achievement ids
    "activeDays": [],       // local day keys with activity
    "cosmetics": [],        // owned cosmetic ids
    "equipped": {},         // flair / title / banner / border
    "talents": [],          // purchased talent ids
    "guildId": null,
    "guildName": null,
    "goal": null,
    "reviews": {},          // spaced-repetition Leitner records
    "rev": 0                // sync revision
  },
  "remoteProfile": { /* raw Supabase profiles row, or null */ }
}
```

---

## Erasure flow

1. The user clicks **Delete my account** on `/account`.
2. A confirmation modal requires typing `DELETE` verbatim before the button becomes active.
3. On confirm, the browser calls `DELETE /api/account/delete`.

### Route: `DELETE /api/account/delete`

| Step | Action |
|---|---|
| Auth check | Reads the caller's session via the server (anon-key) Supabase client. Returns `401` if no valid session. |
| Profile row | Deletes the `profiles` row for the authenticated `userId` using the service-role client (bypasses RLS). |
| Auth user | Calls `auth.admin.deleteUser(userId)` via the service-role client, removing the Supabase Auth record and cascading to any linked auth tables. |
| Local store | The client then calls `useGameStore.getState().reset()` and signs out, clearing `localStorage`. |
| Redirect | Browser is redirected to `/?deleted=1`. |

**Graceful degradation:** When `SUPABASE_SERVICE_ROLE_KEY` is absent (local dev without a backend), the route returns `{ skipped: true }` and the client falls back to resetting the local store only.

---

## Data residency

- **localStorage** (`boots-progress`): stored in the user's own browser; never transmitted unless the user is signed in.
- **Supabase `profiles` table**: single row per user; region set in your Supabase project settings.
- **Supabase Auth**: managed by Supabase; deletion via `auth.admin.deleteUser` removes the record from their managed infrastructure.

---

## Honoring requests without a Cantrip account

Users who played without signing in have no server-side data. Their progress exists only in `localStorage`. Clearing browser site data (or using the Export button) is the only action needed.

---

## Retention after deletion

Once `auth.admin.deleteUser` succeeds:
- The `profiles` row is gone immediately.
- Supabase Auth purges the auth user record.
- Server-sent email/push logs (if any) are deleted on their respective provider's retention schedule (typically ≤ 30 days).
- Stripe subscription records (if any) are retained by Stripe per their own policy for legal/financial compliance; Cantrip does not re-associate them with any new account.

---

## Contact

For manual erasure requests or questions, email **privacy@cantrip.dev** (or the
address shown in the Privacy Policy). Requests will be processed within 30 days.
