"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { PLANS, type PlanId } from "@/lib/billing/plans";
import { UpgradeButton } from "./UpgradeButton";
import {
  useEntitlements,
  useTrialStatus,
  TRIAL_DAYS,
} from "@/store/useEntitlements";
import { useMounted } from "@/hooks/useMounted";
import { track } from "@/lib/analytics/track";
import { useExperiment } from "@/hooks/useExperiment";

export function PricingPlans() {
  const [cycle, setCycle] = useState<PlanId>("annual");
  const plan = PLANS[cycle];

  // A/B: which billing cycle is selected by default on first view?
  const pricingVariant = useExperiment("pricing_annual_default");
  useEffect(() => {
    if (pricingVariant === "monthly_first") setCycle("monthly");
    else if (pricingVariant === "annual_first") setCycle("annual");
  }, [pricingVariant]);

  // Funnel: the learner saw the paywall (fires once on mount).
  useEffect(() => {
    track("paywall_viewed", { source: "pricing_page" });
  }, []);

  return (
    <div className="mt-10">
      <TrialNotice />

      {/* billing cycle toggle */}
      <div className="mx-auto flex w-fit items-center gap-1 rounded-full border border-line bg-surface p-1">
        {(["monthly", "annual"] as PlanId[]).map((id) => (
          <button
            key={id}
            onClick={() => setCycle(id)}
            className={[
              "relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              cycle === id ? "text-white" : "text-gray-400 hover:text-white",
            ].join(" ")}
          >
            {cycle === id && (
              <motion.span
                layoutId="cycle-pill"
                className="absolute inset-0 -z-10 rounded-full bg-accent/20 ring-1 ring-accent/40"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            {PLANS[id].label}
            {id === "annual" && (
              <span className="ml-1.5 rounded-full bg-success/15 px-1.5 py-0.5 text-[10px] font-semibold text-success">
                -53%
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {/* Free */}
        <Tier name="Free" price="$0" cadence="forever">
          <Features
            items={[
                "Read every lesson",
                "First 3 lessons of every course, interactive",
                "+1 free lesson per day of streak (up to 6 more)",
              "XP, gold, streak & level tracking",
              "Public profile & activity heatmap",
              "Daily quests & achievements",
              "Join guilds",
            ]}
          />
          <Link href="/learn" className="btn-ghost mt-6 w-full">
            Start learning
          </Link>
        </Tier>

        {/* Pro (highlighted) */}
        <Tier
          name="Pro"
          price={plan.price}
          cadence={plan.cadence}
          note={plan.note}
          // On the annual view, anchor the discounted /mo price against the real
          // monthly price so the "save 53%" claim has a visible reference on load.
          anchorPrice={cycle === "annual" ? PLANS.monthly.price : undefined}
          highlight
        >
          <Features
            items={[
              "Every interactive, auto-graded lesson",
              "System Design & Portfolio Projects courses",
              "All 55+ achievements — including Career badges",
              "Weekly boss battles & league seasons",
              "Seasonal events with exclusive cosmetics",
              "Premium cosmetics (banners, borders, titles)",
              "Cantrip AI tutor (Socratic mode)",
              "Streak freezes & loot chests",
              "All languages & future courses",
            ]}
          />
          <div className="mt-6">
            <UpgradeButton plan={cycle}>Go Pro</UpgradeButton>
            <p className="mt-3 text-center text-xs text-gray-500">
              30-day money-back guarantee · cancel anytime
            </p>
          </div>
        </Tier>

        {/* Teams */}
        <Tier name="Teams" price="Custom" cadence="per seat">
          <Features
            items={[
              "Everything in Pro",
              "Private guild for your team",
              "Team leaderboard & XP progress",
              "Cohort certificates & progress reports",
              "For bootcamps, schools & companies",
            ]}
          />
          <a href="mailto:hello@cantrip.dev" className="btn-ghost mt-6 w-full">
            Contact us
          </a>
        </Tier>
      </div>

      <DevProToggle />
    </div>
  );
}

function Tier({
  name,
  price,
  cadence,
  note,
  anchorPrice,
  highlight,
  children,
}: {
  name: string;
  price: string;
  cadence: string;
  note?: string;
  /** Optional struck-through "regular" price to anchor a discount against. */
  anchorPrice?: string;
  highlight?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`card flex flex-col ${highlight ? "border-accent shadow-glow" : ""}`}
    >
      {highlight && (
        <span className="mb-2 w-fit rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white">
          Most popular
        </span>
      )}
      <h2 className="text-lg font-semibold text-white">{name}</h2>
      <div className="mt-2 flex flex-wrap items-baseline gap-x-1.5 gap-y-0">
        {anchorPrice && (
          <span className="text-lg font-medium text-gray-400 line-through decoration-gray-500">
            <span className="sr-only">Regular price </span>
            {anchorPrice}
            <span aria-hidden="true">/mo</span>
          </span>
        )}
        <span className="text-3xl font-bold text-white">{price}</span>
        <span className="text-sm text-gray-400">{cadence}</span>
      </div>
      <p className="mt-1 h-4 text-xs text-gold">{note ?? ""}</p>
      <div className="mt-4 flex flex-1 flex-col">{children}</div>
    </div>
  );
}

function Features({ items }: { items: string[] }) {
  return (
    <ul className="flex-1 space-y-2">
      {items.map((f) => (
        <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
          <Check size={16} className="mt-0.5 shrink-0 text-success" />
          {f}
        </li>
      ))}
    </ul>
  );
}

/** Ties the pricing page to the reverse trial: reassures during, converts after. */
function TrialNotice() {
  const mounted = useMounted();
  const { paid, active, expired, daysLeft } = useTrialStatus();
  if (!mounted || paid) return null;

  if (active) {
    return (
      <p className="mx-auto mb-6 w-fit rounded-full border border-accent/30 bg-accent/5 px-4 py-1.5 text-center text-sm text-gray-200">
        ✨ You&apos;re on a {TRIAL_DAYS}-day Pro trial — {daysLeft} day
        {daysLeft === 1 ? "" : "s"} left. Lock in a plan to keep full access.
      </p>
    );
  }
  if (expired) {
    return (
      <p className="mx-auto mb-6 w-fit rounded-full border border-gold/40 bg-gold/5 px-4 py-1.5 text-center text-sm text-gray-200">
        👑 Your Pro trial has ended — pick a plan to pick up right where you left off.
      </p>
    );
  }
  return null;
}

/** Dev-only helper to flip Pro on/off without Stripe, for testing the paywall. */
function DevProToggle() {
  const mounted = useMounted();
  const isPro = useEntitlements((s) => s.isPro);
  const setPro = useEntitlements((s) => s.setPro);

  if (process.env.NODE_ENV !== "development" || !mounted) return null;

  return (
    <div className="mt-10 flex items-center justify-center gap-3 text-xs text-gray-500">
      <span>dev:</span>
      <button
        onClick={() => setPro(!isPro)}
        className="rounded-full border border-line bg-surface px-3 py-1 hover:border-accent/60"
      >
        {isPro ? "✓ Pro is ON — turn off" : "Simulate Pro (on)"}
      </button>
    </div>
  );
}
