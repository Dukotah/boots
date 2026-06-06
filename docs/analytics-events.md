# Cantrip — Analytics Event Dictionary

All events are sent to **Plausible Analytics** via `window.plausible(name, {props})`.
Plausible is cookieless, collects no PII, and requires no consent banner.
This is intentional: Cantrip has under-13 learners (COPPA scope).

**Code reference:** `src/lib/analytics/track.ts`

---

## How to read events in Plausible

1. Open your Plausible dashboard at `https://plausible.io/<your-domain>`.
2. Scroll to the **Custom Events** section (bottom of the main dashboard).
3. Click any event name to filter the whole dashboard to sessions that include it.
4. To break down an event by a prop: click the event → **Properties** → select the prop name.

> Plausible aggregates props as top-N lists. You will see, e.g., the top goals
> selected, the top lesson IDs completed, and the plan chosen at checkout.

---

## Funnel overview

```
signup
  └─ onboarding_goal_selected
       └─ lesson_started → lesson_completed → first_all_green
            └─ streak_milestone (7 / 30 / 100)
                 └─ paywall_viewed → checkout_started → purchase
```

`referral_shared` and `referral_redeemed` are standalone.

---

## Event dictionary

### `signup`

**When it fires:** Immediately after a user successfully initiates OAuth (GitHub)
or requests a magic-link OTP on the login page.

| Prop | Type | Example | Notes |
|------|------|---------|-------|
| `method` | string | `"github"`, `"magic_link"` | Sign-in provider chosen |

**Plausible tip:** Break down by `method` to see which auth path converts better.

---

### `onboarding_goal_selected`

**When it fires:** When `OnboardingFlow` calls `setGoal(id)` — i.e. the learner
taps a goal card on the welcome screen. Does NOT fire on "Skip".

| Prop | Type | Example | Notes |
|------|------|---------|-------|
| `goal` | string | `"frontend"`, `"data"`, `"kids-and-teens"` | Goal id from `lib/goals` |

**Plausible tip:** Shows which paths drive the most learner intent.

---

### `lesson_started`

**When it fires:** When a learner navigates to an interactive lesson page and
the editor mounts. Typically wired at the lesson page component mount.

| Prop | Type | Example | Notes |
|------|------|---------|-------|
| `lesson_id` | string | `"javascript/variables"` | `moduleSlug/lessonSlug` |

---

### `lesson_completed`

**When it fires:** Inside `useGameStore.completeLesson()` on a **fresh** completion
(not a re-complete). The store is the authoritative moment because it fires
regardless of which UI triggered the completion.

| Prop | Type | Example | Notes |
|------|------|---------|-------|
| `lesson_id` | string | `"javascript/variables"` | `moduleSlug/lessonSlug` |
| `xp` | number | `10` | XP awarded for this lesson |

**Plausible tip:** High completions on a `lesson_id` = popular entry point.
Low completions relative to `lesson_started` = drop-off point to investigate.

---

### `first_all_green`

**When it fires:** Immediately after `lesson_completed`, when all test cases
pass for the very first time on that lesson (tracked by the store: the lesson
is not already in `completed[]` at the time of the call).

| Prop | Type | Example | Notes |
|------|------|---------|-------|
| `lesson_id` | string | `"javascript/variables"` | `moduleSlug/lessonSlug` |

**Plausible tip:** This is the "aha" moment — the learner shipped working code.
High correlation between `first_all_green` and retention is expected.
If a lesson has many `lesson_started` but few `first_all_green`, the puzzle
may be too hard or the instructions unclear.

---

### `daily_challenge_completed`

**When it fires:** When a learner claims the daily-challenge bonus on `/daily`
or the dashboard card. Only fires on a genuine claim — the store requires that
day's challenge lesson to be in `completed[]` first (`claimDailyChallenge`).

| Prop | Type | Example | Notes |
|------|------|---------|-------|
| `streak` | number | `1`, `5`, `30` | Daily-challenge streak length after this claim |

**Plausible tip:** The daily challenge is a re-engagement surface (LeetCode /
Brilliant pattern). Rising `streak` values mean the loop is sticky; a fat tail
at `streak=1` with few repeats means people try it once and don't return.

---

### `streak_milestone`

**When it fires:** After a lesson completion when the learner's streak crosses
a notable threshold (7, 30, 100 days). Should only fire once per threshold.

| Prop | Type | Example | Notes |
|------|------|---------|-------|
| `streak` | number | `7`, `30`, `100` | Current streak length |

**Plausible tip:** Tracks how many learners build habits. A large spike at 7
and a sharp drop at 30 means the 30-day habit is a conversion cliff.

---

### `paywall_viewed`

**When it fires:** When a learner lands on the pricing page or a `ProGate`
component renders the upgrade prompt.

| Prop | Type | Example | Notes |
|------|------|---------|-------|
| `source` | string | `"pricing_page"`, `"pro_gate"`, `"upgrade_modal"` | Where the paywall appeared |

**Plausible tip:** Compare `paywall_viewed` → `checkout_started` rate across
sources to find which touchpoints convert best.

---

### `checkout_started`

**When it fires:** Inside `UpgradeButton.go()`, just before `startCheckout(plan)`
is called. Means the learner clicked "Go Pro" and the network request is in flight.

| Prop | Type | Example | Notes |
|------|------|---------|-------|
| `plan` | string | `"monthly"`, `"annual"` | Plan chosen |

**Plausible tip:** Plan distribution at checkout vs. at `purchase` reveals
Stripe friction. If annual is chosen more but monthly completes more, there
may be a price-anxiety moment at Stripe.

---

### `purchase`

**When it fires:** On the Stripe checkout success redirect (success page or
webhook confirmation page). Wire this in the post-checkout success page.

| Prop | Type | Example | Notes |
|------|------|---------|-------|
| `plan` | string | `"monthly"`, `"annual"` | Plan purchased |

---

### `referral_shared`

**When it fires:** When a learner copies or shares their referral link.
No props (the referral code is not included to avoid identifiability).

---

### `referral_redeemed`

**When it fires:** When a new learner signs up via a referral link and the
referral is credited.
No props.

---

## Privacy notes

- **No PII ever.** No user IDs, emails, names, or any value that could
  identify an individual are passed as props. This is enforced in
  `src/lib/analytics/track.ts` via TypeScript prop types.
- **Plausible is cookieless.** No consent banner is needed (GDPR-friendly,
  COPPA-safe for under-13 learners).
- **No cross-site tracking.** Plausible does not fingerprint or share data
  with any advertising network.
- If a PII-aware analytics tool is added in the future, it must be
  age-gated at the Supabase auth layer and documented separately.
