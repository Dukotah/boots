import type { Metadata } from "next";
import { AppShell } from "@/components/layout/AppShell";
import { CampaignMap } from "@/components/features/map/CampaignMap";

export const metadata: Metadata = {
  title: "Campaign Map — Your Quest Line",
  description:
    "Your interactive skill tree. Clear each node to unlock the next, earn XP and gold, and climb the ranks from Intern to Archmage.",
};

export default function MapPage() {
  return (
    <AppShell>
      <CampaignMap />
    </AppShell>
  );
}
