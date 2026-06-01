import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

// Invite crawlers in everywhere except private app surfaces; point them at the
// sitemap so all lesson pages get discovered.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard", "/api/"],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
