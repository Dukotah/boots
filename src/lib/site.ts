// Single source of truth for site-wide identity used by metadata, sitemap,
// robots, and JSON-LD. Set NEXT_PUBLIC_SITE_URL in the environment once a domain
// is live; until then this placeholder keeps absolute URLs well-formed.
export const SITE = {
  name: "Boots",
  // The full product name used in titles/structured data.
  longName: "Boots — Gamified Coding Academy",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://boots.academy").replace(/\/$/, ""),
  description:
    "Learn to code the fun way. Interactive, auto-graded lessons in JavaScript, Python, SQL, and AI/LLMs — earn XP, keep your streak, and level up from Intern to Archmage.",
  twitter: "@bootsacademy",
} as const;

/** Build an absolute URL from a site-relative path. */
export function absoluteUrl(path = "/"): string {
  return `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
}
