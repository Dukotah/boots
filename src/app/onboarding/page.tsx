import type { Metadata } from "next";
import { OnboardingFlow } from "@/components/features/onboarding/OnboardingFlow";

export const metadata: Metadata = {
  title: "Get Started — Find Your Coding Path",
  description:
    "Tell us your goal and we'll sequence the right courses and start you on your first lesson in under a minute.",
  alternates: { canonical: "/onboarding" },
};

export default function OnboardingPage() {
  return <OnboardingFlow />;
}
