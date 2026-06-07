import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

// Invite crawlers in everywhere except private app surfaces; point them at the
// sitemap so all lesson pages get discovered.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Private / signed-in app surfaces render as empty client shells to a
      // crawler — keep them out of the index so they don't dilute crawl budget or
      // surface thin pages. (Public profiles at /u/* stay crawlable — shareable,
      // with their own OG card.)
      disallow: [
        "/api/",
        "/login",
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
