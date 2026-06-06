import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

// Invite crawlers in everywhere except private app surfaces; point them at the
// sitemap so all lesson pages get discovered.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Private/app-shell surfaces render as empty hydration shells to crawlers —
      // keep them out of the index so crawl budget goes to real content.
      disallow: [
        "/api/",
        "/dashboard",
        "/account",
        "/profile",
        "/career",
        "/leaderboard",
        "/achievements",
        "/shop",
        "/guilds",
        "/events",
        "/leagues",
        "/boss",
        "/friends",
        "/quests",
        "/skill-tree",
        "/projects",
        "/review",
        "/refer",
        "/recap",
        "/notifications",
        "/onboarding",
        "/offline",
      ],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
