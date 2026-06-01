import type { MetadataRoute } from "next";
import { MODULES } from "@/lib/curriculum";
import { absoluteUrl } from "@/lib/site";

// Every module and lesson is an indexable page — the SEO flywheel. This emits the
// full URL set so search engines can crawl all "learn X" content automatically.
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/learn"), changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/pricing"), changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/map"), changeFrequency: "monthly", priority: 0.5 },
  ];

  const modulePages: MetadataRoute.Sitemap = MODULES.map((m) => ({
    url: absoluteUrl(`/learn/${m.slug}`),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const lessonPages: MetadataRoute.Sitemap = MODULES.flatMap((m) =>
    m.lessons.map((l) => ({
      url: absoluteUrl(`/learn/${m.slug}/${l.slug}`),
      changeFrequency: "monthly",
      priority: 0.7,
    })),
  );

  return [...staticPages, ...modulePages, ...lessonPages];
}
