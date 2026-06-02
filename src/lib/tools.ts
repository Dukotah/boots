// Free developer micro-tools — indexable lead-magnet pages that rank for
// high-traffic "X online" queries and funnel visitors into courses. Pure data;
// each tool's UI is a client component, registered to a route by slug.
export type Tool = {
  slug: string;
  title: string; // SEO <title>
  name: string; // short label
  emoji: string;
  description: string; // meta description
  blurb: string; // one-liner for the index card
  keywords: string[];
};

export const TOOLS: Tool[] = [
  {
    slug: "regex",
    title: "Regex Tester — Test Regular Expressions Online",
    name: "Regex Tester",
    emoji: "🔍",
    description:
      "Free online regex tester. Build and debug regular expressions with live match highlighting and capture groups — runs in your browser.",
    blurb: "Test patterns live, with match highlighting and capture groups.",
    keywords: ["regex tester", "regex online", "test regular expressions", "regex match tester"],
  },
  {
    slug: "json",
    title: "JSON Formatter & Validator — Format JSON Online",
    name: "JSON Formatter",
    emoji: "📋",
    description:
      "Free online JSON formatter, validator, and beautifier. Paste JSON to pretty-print, minify, or find the syntax error — instantly, in your browser.",
    blurb: "Pretty-print, minify, and validate JSON instantly.",
    keywords: ["json formatter", "json validator", "json beautifier", "format json online"],
  },
  {
    slug: "base64",
    title: "Base64 Encode & Decode Online",
    name: "Base64 Encoder",
    emoji: "🔐",
    description:
      "Free online Base64 encoder and decoder. Convert text to Base64 and back, with full Unicode support — all in your browser.",
    blurb: "Encode and decode Base64 text (Unicode-safe).",
    keywords: ["base64 encode", "base64 decode", "base64 online", "base64 converter"],
  },
  {
    slug: "uuid",
    title: "UUID Generator — Generate UUID v4 Online",
    name: "UUID Generator",
    emoji: "🆔",
    description:
      "Free online UUID/GUID generator. Generate random version-4 UUIDs in bulk and copy them with one click.",
    blurb: "Generate random v4 UUIDs in bulk, copy with one click.",
    keywords: ["uuid generator", "guid generator", "generate uuid", "uuid v4 online"],
  },
];

export function getTool(slug: string): Tool | undefined {
  return TOOLS.find((t) => t.slug === slug);
}
