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
  {
    slug: "url",
    title: "URL Encoder & Decoder Online",
    name: "URL Encoder",
    emoji: "🔗",
    description:
      "Free online URL encoder and decoder. Percent-encode text for query strings or decode an encoded URL — instantly, in your browser.",
    blurb: "Percent-encode and decode URLs and query strings.",
    keywords: ["url encoder", "url decoder", "url encode online", "percent encoding"],
  },
  {
    slug: "hash",
    title: "Hash Generator — SHA-256, SHA-1, SHA-512 Online",
    name: "Hash Generator",
    emoji: "#️⃣",
    description:
      "Free online hash generator. Compute SHA-1, SHA-256, SHA-384, and SHA-512 hashes of any text right in your browser via the Web Crypto API.",
    blurb: "Compute SHA-1/256/384/512 hashes of any text.",
    keywords: ["hash generator", "sha256 generator", "sha512 hash", "online hash"],
  },
  {
    slug: "epoch",
    title: "Unix Timestamp Converter — Epoch to Date Online",
    name: "Epoch Converter",
    emoji: "🕑",
    description:
      "Free online Unix timestamp (epoch) converter. Convert epoch seconds or milliseconds to a human-readable UTC, local, and ISO date.",
    blurb: "Convert Unix timestamps to UTC, local, and ISO dates.",
    keywords: ["epoch converter", "unix timestamp converter", "timestamp to date", "epoch to date"],
  },
];

export function getTool(slug: string): Tool | undefined {
  return TOOLS.find((t) => t.slug === slug);
}
