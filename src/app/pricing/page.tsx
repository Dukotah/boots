import Link from "next/link";
import type { Metadata } from "next";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing | Boots",
  description:
    "Start free. Go Pro for the full game: every interactive lesson, the AI tutor, leagues, and boss battles.",
};

const tiers = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    cta: "Start learning",
    href: "/learn",
    highlight: false,
    features: [
      "Read every lesson",
      "First lessons of each course, interactive",
      "Track XP & streak",
    ],
  },
  {
    name: "Pro",
    price: "$15",
    period: "/month, billed annually",
    cta: "Go Pro",
    href: "/learn",
    highlight: true,
    features: [
      "Every interactive, auto-graded lesson",
      "Boots AI tutor (Socratic mode)",
      "Leagues & boss battles",
      "Loot chests, streak freezes",
      "All languages & future courses",
    ],
  },
  {
    name: "Teams",
    price: "Custom",
    period: "per seat",
    cta: "Contact us",
    href: "/learn",
    highlight: false,
    features: [
      "Everything in Pro",
      "Centralized billing",
      "Team leaderboard & progress",
      "For bootcamps, schools & companies",
    ],
  },
];

export default function Pricing() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white">Simple pricing</h1>
        <p className="mt-2 text-gray-400">
          Content is free. You pay for the interactive game loop and the AI tutor
          — the stuff that actually makes it stick.
        </p>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {tiers.map((t) => (
          <div
            key={t.name}
            className={`card flex flex-col ${
              t.highlight ? "border-accent shadow-glow" : ""
            }`}
          >
            {t.highlight && (
              <span className="mb-2 w-fit rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white">
                Most popular
              </span>
            )}
            <h2 className="text-lg font-semibold text-white">{t.name}</h2>
            <div className="mt-2">
              <span className="text-3xl font-bold text-white">{t.price}</span>
              <span className="ml-1 text-sm text-gray-400">{t.period}</span>
            </div>
            <ul className="mt-5 flex-1 space-y-2">
              {t.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
                  <Check size={16} className="mt-0.5 shrink-0 text-success" />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href={t.href}
              className={`mt-6 ${t.highlight ? "btn-primary" : "btn-ghost"} w-full`}
            >
              {t.cta}
            </Link>
          </div>
        ))}
      </div>

      <p className="mt-8 text-center text-xs text-gray-500">
        Pricing is illustrative for this proof of concept — payments aren&apos;t
        wired up yet (Stripe is on the roadmap).
      </p>
    </div>
  );
}
