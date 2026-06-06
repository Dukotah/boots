# A/B Testing & Feature Flags — Cantrip Experiment Framework

## Overview

Cantrip's experiment framework provides deterministic, sticky bucketing for A/B tests and feature flags. It underpins pricing experiments, onboarding variants, and any future controlled rollout. The billing system itself (Stripe) is unchanged — this layer only decides *which variant* a given user sees.

---

## Defining an Experiment

Add an entry to the `EXPERIMENTS` registry in `src/lib/experiments.ts`:

```ts
export const EXPERIMENTS = {
  // ...existing experiments...

  my_new_flag: {
    key: "my_new_flag",
    variants: ["on", "off"],            // first variant is the "default/control"
    weights: [20, 80],                  // 20 % on, 80 % off (optional; equal split when omitted)
    description: "Gate the new XP bonus feature to 20 % of users.",
  },
} as const satisfies Record<string, Experiment>;
```

Rules:
- `key` must be a unique string, all lowercase with underscores.
- `variants` must be a non-empty tuple. The first variant is treated as "control" in analysis.
- `weights` is optional. When omitted every variant gets equal weight. Length must match `variants` when supplied.
- Add a `description` — it shows up in dashboards and the git blame.

---

## How Bucketing Works

1. **Unit id**: when the user is signed in, pass their Supabase `user.id`; otherwise the framework auto-generates a random 16-char hex id and persists it to `localStorage` under `cantrip_anon_id`. The same id is reused across sessions until the user clears storage, so assignments are sticky.

2. **Hash**: `FNV-1a 32-bit` over the string `"<experimentKey>:<unitId>"`. FNV-1a is fast, parameter-free, and produces near-uniform distribution across short strings — ideal for bucketing at our scale.

3. **Bucket**: `hash % sum(weights)` → walk the weights array to find the assigned variant. The result is fully deterministic: given the same key + unitId you always get the same variant, on any device, in any order.

4. **Sticky across sign-in**: if the user is anonymous, the anon id stays in localStorage. After sign-in, pass `user.id` explicitly via `getVariant(key, user.id)` or the `unitId` argument of `useExperiment`. The bucket for their user id may differ from their anon id — this is expected and acceptable for most experiments (only affects the sign-in boundary, not ongoing sessions).

---

## Using an Experiment in a React Component

```tsx
"use client";
import { useExperiment } from "@/hooks/useExperiment";

export function PricingPlans() {
  const variant = useExperiment("pricing_annual_default");
  //    ^ null on server / first render → show default (control)

  // Default to 'annual_first' until mounted (avoids hydration mismatch).
  const defaultCycle = variant === "monthly_first" ? "monthly" : "annual";

  // ... rest of component
}
```

The hook returns `null` until mounted. Always treat `null` as "show the control/default experience" so the page renders correctly server-side and on the first hydration pass.

---

## Using `getVariant` Outside React (Server Components, Route Handlers)

`getVariant` is a pure function and works anywhere:

```ts
import { getVariant } from "@/lib/experiments";

// In a Server Component — pass the user id explicitly (no localStorage on server).
const variant = getVariant("pricing_annual_default", userId);
```

On the server there is no localStorage, so always pass `unitId` explicitly. If `unitId` is unknown (truly anonymous server request), use a stable identifier from a cookie or session token.

---

## Reading Results in Plausible

Every exposure fires an `experiment_exposure` Plausible event with two custom properties:

| Property  | Value                                      |
|-----------|--------------------------------------------|
| `key`     | The experiment key (e.g. `pricing_annual_default`) |
| `variant` | The assigned variant (e.g. `annual_first`) |

To analyze results:

1. Open your Plausible dashboard → **Custom Events** → `experiment_exposure`.
2. Filter by `key = pricing_annual_default`.
3. Break down the **Goal Completions** (e.g. `checkout_started`, `pro_subscribed`) by the `variant` property.
4. Compare conversion rates per variant. Plausible doesn't do significance testing natively — export the counts and run a two-proportion z-test or use an online calculator.

> Tip: keep experiments short (2–4 weeks), ship winning variant as default, then clean up the registry entry and remove the branching code.

---

## QA Override Syntax

Override any experiment for testing without touching the database or needing a specific user account.

### URL query parameter (highest priority)

```
https://cantrip.dev/pricing?exp_pricing_annual_default=monthly_first
```

Pattern: `?exp_<key>=<variant>`

Multiple overrides can be stacked:
```
?exp_pricing_annual_default=monthly_first&exp_onboarding_skip_visible=on
```

### localStorage override (secondary)

Open DevTools → Application → Local Storage, then set:

```
Key:   cantrip_exp_pricing_annual_default
Value: monthly_first
```

Pattern: `cantrip_exp_<key>` = `<variant value>`

### Priority order

1. URL query param (`?exp_<key>=<variant>`)
2. localStorage (`cantrip_exp_<key>`)
3. Deterministic bucket (normal flow)

Overrides only accept variant values that exist in the experiment's `variants` array — unknown values fall through to the normal bucket.

### Resetting an override

Remove the localStorage key or remove the URL param. The user will then receive their normal deterministic bucket.

---

## Adding an Exposure to a Custom Event Type

The `experiment_exposure` event is fired via `trackExposure()` from `src/lib/experiments.ts`, which dynamically imports `@/lib/analytics/track`. The sibling agent that owns `track` needs to add `"experiment_exposure"` to the event union (see followups in the build notes). Until that union is updated, the exposure fires correctly at runtime — TypeScript just casts it loosely.
