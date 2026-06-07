import type { Metadata } from "next";
import { OnboardingFlow } from "@/components/features/onboarding/OnboardingFlow";

export const metadata: Metadata = {
  title: "Get Started — Your First Win in 60 Seconds",
  description:
    "Pick your coding goal and we'll build your personal path. Most learners are writing real code in under a minute.",
  alternates: { canonical: "/onboarding" },
};

export default function OnboardingPage() {
  return <OnboardingFlow />;
}
