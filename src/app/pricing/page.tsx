import type { Metadata } from "next";
import { PricingPlans } from "@/components/features/billing/PricingPlans";
import { absoluteUrl } from "@/lib/site";

const OG = absoluteUrl(
  `/api/og?title=${encodeURIComponent("Cantrip Pro — the full game")}&subtitle=${encodeURIComponent("Every interactive lesson, the AI tutor, leagues & boss battles. From $9/mo. 14-day Pro trial.")}`,
);

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Start free. Go Pro for the full game: every interactive lesson, the AI tutor, leagues, and boss battles. From $9/mo billed annually.",
  alternates: { canonical: "/pricing" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    title: "Pricing — Cantrip",
    description:
      "Start free. Go Pro for every interactive lesson, the AI tutor, leagues & boss battles. From $9/mo, 14-day trial.",
    url: absoluteUrl("/pricing"),
    images: [{ url: OG, width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: [OG] },
};

export default function Pricing() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white">
          Simple pricing
        </h1>
        <p className="mx-auto mt-2 max-w-xl text-pretty text-gray-400">
          Content is free. You pay for the interactive game loop and the AI tutor
          — the stuff that actually makes it stick.
        </p>
      </div>

      <PricingPlans />

      <p className="mt-10 text-center text-xs text-gray-500">
        Secure checkout via Stripe. Cancel anytime. Prices in USD.
      </p>
    </div>
  );
}
