// Plan catalog. Display data lives here; the actual Stripe price IDs come from
// env so they differ per environment (test vs live). Pricing matches GAMEPLAN §6
// — undercut boot.dev ($49/mo) and win on value early.

export type PlanId = "monthly" | "annual";

export type Plan = {
  id: PlanId;
  label: string;
  /** Headline price shown to the user. */
  price: string;
  /** Sub-line under the price. */
  cadence: string;
  /** Small note (e.g. effective monthly when billed annually). */
  note?: string;
  /** Env var that holds the Stripe price ID for this plan. */
  priceEnv: string;
};

export const PLANS: Record<PlanId, Plan> = {
  monthly: {
    id: "monthly",
    label: "Monthly",
    price: "$19",
    cadence: "/month",
    priceEnv: "STRIPE_PRICE_MONTHLY",
  },
  annual: {
    id: "annual",
    label: "Annual",
    price: "$9",
    cadence: "/month",
    note: "$108 billed yearly — save 53%",
    priceEnv: "STRIPE_PRICE_ANNUAL",
  },
};

export function getStripePriceId(plan: PlanId): string | undefined {
  return process.env[PLANS[plan].priceEnv];
}
