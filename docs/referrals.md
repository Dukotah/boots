# Referral Programme — "Give a Month, Get a Month"

## Overview

Cantrip's referral loop is simple: every subscriber gets a shareable link. When
a friend clicks that link, signs up, and starts a paid subscription, **both
parties receive one free month of Pro**. There is no cap on invites — each
qualifying conversion earns both sides a month.

---

## Database Schema

**Table: `public.referrals`**

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` | PK, `gen_random_uuid()` |
| `referrer_id` | `uuid` | FK → `profiles.id` (the sharer) |
| `code` | `text` | Short, unique, URL-safe (8-char hex prefix of the user's UUID) |
| `referred_id` | `uuid \| null` | FK → `profiles.id` (the new learner). NULL on the seed row. |
| `status` | `text` | `'pending'` → `'completed'` on qualifying conversion |
| `reward_granted` | `boolean` | Flipped to `true` by the Stripe webhook after coupon is applied |
| `created_at` | `timestamptz` | Auto-set |
| `completed_at` | `timestamptz` | Set by the webhook when `status` → `completed` |

**Indexes:**
- `referrals_code_idx` — unique on `code` (enforces one code per user)
- `referrals_referred_idx` — unique on `referred_id` (prevents double dipping)
- `referrals_referrer_idx` — fast lookup of a referrer's rows

**Helper function:**
```sql
public.referrer_id_for_code(p_code text) → uuid
```
Used by the API route to resolve a code to a referrer before inserting the
redemption row.

---

## Fraud Prevention

1. **No self-referral.** A `CHECK (referrer_id != referred_id)` constraint in
   the DB plus an early guard in both the lib helper and the API route.

2. **One redemption per referred user.** The unique index on `referred_id`
   (filtered to non-null rows) means a new learner can only be credited to one
   referrer. If they hit the endpoint twice, the second insert fails with
   `23505` (unique_violation) and returns a friendly error.

3. **Reward only on `status = 'completed'`.** The reward is never pre-granted at
   sign-up time; `reward_granted` is only flipped by the Stripe webhook after a
   `customer.subscription.created` (or `invoice.paid`) event is confirmed. The
   client cannot write `reward_granted` — RLS only allows insert of pending rows
   where `reward_granted = false`.

4. **`reward_granted` is service-role-only.** Similar to `is_pro` in
   `0004_billing_entitlements.sql`, only the service-role key (used by the
   webhook) can update this column. The anon/user Supabase JWT cannot flip it.

---

## How Reward Fulfillment Ties Into Billing Entitlements

### On Subscription Created (Stripe webhook)

When `customer.subscription.created` fires, the webhook already maps the Stripe
customer back to a `profiles` row via `stripe_customer_id`. Add the following
logic to `src/app/api/stripe/route.ts` (the existing Stripe webhook handler):

```typescript
// Inside the 'customer.subscription.created' (or 'invoice.paid') handler:

// 1. Look up whether the new subscriber was referred.
const { data: referralRow } = await adminSb
  .from("referrals")
  .select("id, referrer_id")
  .eq("referred_id", subscriberUserId)
  .eq("status", "pending")
  .maybeSingle();

if (referralRow) {
  // 2. Mark the referral completed.
  await adminSb
    .from("referrals")
    .update({ status: "completed", completed_at: new Date().toISOString() })
    .eq("id", referralRow.id);

  // 3. Grant one free month to the referred user.
  //    Option A — Stripe coupon (apply before first charge):
  await stripe.subscriptions.update(stripeSubscriptionId, {
    coupon: "FREE_MONTH_COUPON_ID", // Create once in Stripe Dashboard: 100% off, 1 month
  });

  // 4. Grant one free month to the referrer.
  //    Look up their Stripe customer id from profiles and add a coupon:
  const { data: referrerProfile } = await adminSb
    .from("profiles")
    .select("stripe_customer_id")
    .eq("id", referralRow.referrer_id)
    .maybeSingle();

  if (referrerProfile?.stripe_customer_id) {
    // Find their active subscription and apply the coupon:
    const referrerSubs = await stripe.subscriptions.list({
      customer: referrerProfile.stripe_customer_id,
      status: "active",
      limit: 1,
    });
    if (referrerSubs.data[0]) {
      await stripe.subscriptions.update(referrerSubs.data[0].id, {
        coupon: "FREE_MONTH_COUPON_ID",
      });
    }
  }

  // 5. Flip reward_granted on both rows.
  await adminSb
    .from("referrals")
    .update({ reward_granted: true })
    .or(`id.eq.${referralRow.id},and(referrer_id.eq.${referralRow.referrer_id},referred_id.is.null)`);
}
```

### Stripe Coupon Setup

Create a coupon in the Stripe Dashboard (or via CLI):
- **Duration:** `once`
- **Percent off:** `100`
- **Apply to:** the first invoice of the month

Store its ID as `STRIPE_REFERRAL_COUPON_ID` in `.env.local`.

### Alternative: Entitlement Extension (no Stripe coupon)

If you want to extend entitlement without Stripe (e.g. for manually-managed
Pro users), update `profiles.pro_since` using the service-role client to push
the expiry date back 30 days. This requires a `pro_expires_at` column (not yet
in the schema — add as part of `0007_pro_expiry.sql` if you go this route).

---

## URL Capture on Landing

The `?ref=CODE` parameter is set when a referred user clicks a referral link.
To capture it, add a `useEffect` in `src/components/features/marketing/Landing.tsx`
(or a `RefCapture` client component mounted in `src/app/layout.tsx`) that reads
`new URLSearchParams(window.location.search).get("ref")` and stores it in
`sessionStorage` under the key `cantrip_ref`. On sign-up completion (the
Supabase `onAuthStateChange` SIGNED_IN event), read the key and call
`POST /api/referrals` with `{ code: stored_code }` to create the redemption row.

See the `wiringSnippets` in the agent output for the exact code to add.

---

## File Map

| File | Purpose |
|---|---|
| `supabase/migrations/0006_referrals.sql` | Schema, indexes, RLS, helper fn |
| `src/lib/referrals.ts` | `getOrCreateMyCode`, `getMyReferralStats`, `redeemCode` |
| `src/app/api/referrals/route.ts` | GET (code+stats) + POST (redeem) |
| `src/app/refer/page.tsx` | Full referral page |
| `src/components/features/referral/ReferralCard.tsx` | Dashboard card |
