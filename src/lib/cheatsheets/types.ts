// Cheatsheets are data — keyword-rich reference pages rendered from these
// structures. Each is a permanent, indexable SEO asset ("javascript cheat sheet").
export type CheatItem = {
  /** A short code snippet or syntax example. */
  code: string;
  /** One-line explanation of what it does. */
  desc: string;
};

export type CheatSection = {
  title: string;
  items: CheatItem[];
};

export type CheatSheet = {
  slug: string; // "javascript"
  title: string; // "JavaScript Cheat Sheet"
  language: string; // "JavaScript"
  emoji: string;
  description: string;
  keywords: string[];
  sections: CheatSection[];
};
