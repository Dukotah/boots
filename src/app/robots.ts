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
      // crawler — keep them out of the index so they don't dilute crawl budget
      // or surface thin pages. (Public profiles at /u/* stay crawlable: they're
      // meant to be shared and carry their own OG card.)
      disallow: [
        "/api/",
        "/dashboard",
        "/profile",
        "/login",
        "/shop",
        "/quests",
        "/leaderboard",
        "/friends",
        "/guilds",
        "/leagues",
        "/events",
        "/boss",
        "/career",
        "/review",
        "/skill-tree",
        "/achievements",
        "/offline",
      ],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
