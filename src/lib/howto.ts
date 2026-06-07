// Programmatic-SEO layer: derive a public "how to X" solution page for every
// eligible code lesson in the curriculum. Pure data over MODULES — no React.
//
// "Eligible" = a code lesson (kind !== "quiz") that has a reference `solution`.
// Quiz lessons (e.g. Digital Safety) and any solution-less lessons are skipped.
// Languages in play are js / py / sql (there is no "html" language), so the
// language guard is a no-op today but keeps the intent explicit for the future.
import { MODULES } from "./curriculum";
import { lessonLanguage, langMeta } from "./curriculum/lang";
import type { Lesson } from "./curriculum/types";

export type Howto = {
  slug: string;
  title: string;
  moduleSlug: string;
  lessonSlug: string;
  language: string;
  lessonTitle: string;
  blurb: string;
};

// Common imperative verbs that lesson titles already start with ("Reverse a
// String", "Build a Queue", "Compose Two Functions"). When a title begins with
// one of these, "How to <title>" already reads grammatically and we keep the
// title's wording. Matched (lowercased) against the first word of the title.
const LEADING_VERBS = new Set([
  "accumulate", "add", "apply", "await", "boil", "build", "cache", "cast",
  "catch", "center", "check", "compose", "compute", "count", "crack", "create",
  "decode", "dedupe", "deduplicate", "describe", "detect", "dispatch", "drink",
  "encode", "estimate", "explore", "extract", "feed", "fetch", "find", "fix",
  "flatten", "format", "group", "handle", "hash", "implement", "iterate",
  "join", "keep", "load", "loop", "make", "map", "memoize", "merge",
  "normalize", "parse", "pick", "pipe", "pluck", "print", "protect", "query",
  "read", "reduce", "remove", "render", "reverse", "roll", "run", "scale",
  "search", "select", "set", "sort", "split", "store", "style", "sum", "throw",
  "transform", "transpose", "trim", "update", "use", "validate", "write",
]);

// Gerund-led titles ("Handling Failures", "Making a Commit", "Reading the
// Log") read badly after "How to …". Map the common leading gerunds back to a
// base imperative so we get "How to handle failures", "How to make a commit".
const GERUND_TO_BASE: Record<string, string> = {
  awaiting: "await",
  building: "build",
  catching: "catch",
  centering: "center",
  composing: "compose",
  handling: "handle",
  making: "make",
  reading: "read",
  running: "run",
  using: "use",
  writing: "write",
};

// Strip emoji / pictographic decoration (lessons like "Roll the Dice 🎲" or
// "Cast a Spell 🔮"). SEO titles stay plain and search-friendly.
function stripDecoration(s: string): string {
  return s
    // Astral-plane pictographs (emoji) are UTF-16 surrogate pairs; also drop the
    // common BMP symbol ranges plus the variation selector (FE0F) and ZWJ (200D).
    // Written without the /u flag so it compiles at the project's TS target.
    .replace(
      /[\uD800-\uDBFF][\uDC00-\uDFFF]|[←-⇿⌀-➿⬀-⯿️‍]/g,
      "",
    )
    .replace(/\s{2,}/g, " ")
    .trim();
}

/**
 * Turn a lesson title into a grammatical "how to …" phrase (without the
 * "How to " prefix or the language suffix). Original Title Case is preserved
 * so acronyms and proper nouns (JSX, LLM, Node.js, FizzBuzz) stay intact; we
 * only ever add a leading verb. The goal is plain, search-friendly copy that
 * never reads as "How to <bare-noun>".
 *
 *  - "Middleware"          → "use Middleware"
 *  - "Routing"            → "use Routing"
 *  - "Reverse a String"   → "Reverse a String"   (already imperative)
 *  - "Handling Failures"  → "handle Failures"     (gerund → base verb)
 *  - "Variables & Values" → "use Variables & Values"
 *  - "Capstone: FizzBuzz" → "build FizzBuzz"
 *  - "What is React?"      → "use React"
 */
function howToPhrase(title: string): string {
  const t = stripDecoration(title);

  // "Capstone: FizzBuzz" → frame the part after the colon as something to build.
  const capstone = /^capstone:\s*(.+)$/i.exec(t);
  if (capstone) return `build ${capstone[1]}`;

  // "What is React?" / "What Is an LLM? (Tokens)" → "use React": drop the
  // question framing and any trailing parenthetical aside.
  const whatIs = /^what\s+is\s+(?:an?\s+)?(.+?)\??\s*(?:\([^)]*\))?$/i.exec(t);
  if (whatIs) return `use ${whatIs[1].trim()}`;

  const [first, ...rest] = t.split(" ");
  const firstLower = first.toLowerCase();

  // Gerund lead ("Handling Failures") → base verb ("handle Failures").
  if (GERUND_TO_BASE[firstLower]) {
    return [GERUND_TO_BASE[firstLower], ...rest].join(" ");
  }

  // Already imperative ("Reverse a String") → keep wording, lowercasing only
  // the leading verb so it flows after "How to ".
  if (LEADING_VERBS.has(firstLower)) {
    return [firstLower, ...rest].join(" ");
  }

  // Otherwise it's a noun phrase ("Middleware", "Variables & Values") — prefix
  // a sensible verb so it reads grammatically. Drop a leading article first so
  // we get "use the Result Object" → "use a Result Object"-free wording, e.g.
  // "The Dot Product" → "use the dot product" reads better as "use dot product".
  const noun = t.replace(/^(?:the|an|a)\s+/i, "");
  return `use ${noun}`;
}

/**
 * Build the public "How to … in <Language>" title for a lesson. A lesson can
 * override the middle clause with `howToTitle` (e.g. "write Express middleware"
 * → "How to write Express middleware in JavaScript"); otherwise we derive a
 * grammatical phrase from the lesson title.
 */
function buildHowtoTitle(lesson: Lesson, langLabel: string): string {
  const phrase = lesson.howToTitle?.trim() || howToPhrase(lesson.title);
  return `How to ${phrase} in ${langLabel}`;
}

/**
 * Build a how-to entry for every eligible lesson, in MODULES order (deterministic).
 * Slug = `${moduleSlug}-${lessonSlug}`, which is already unique because lesson
 * slugs are unique within a module and module slugs are globally unique.
 */
export function getHowtos(): Howto[] {
  const out: Howto[] = [];
  for (const module of MODULES) {
    for (const lesson of module.lessons) {
      // Only code lessons with a reference solution become how-to pages.
      if (lesson.kind === "quiz" || lesson.kind === "project") continue;
      if (!lesson.solution) continue;

      const lang = lessonLanguage(lesson, module);
      // Guard against any non-runtime language slipping in (e.g. a future "html").
      if (lang !== "js" && lang !== "py" && lang !== "sql") continue;

      const langLabel = langMeta(lang).label;
      out.push({
        slug: `${module.slug}-${lesson.slug}`,
        title: buildHowtoTitle(lesson, langLabel),
        moduleSlug: module.slug,
        lessonSlug: lesson.slug,
        language: langLabel,
        lessonTitle: lesson.title,
        blurb: lesson.blurb,
      });
    }
  }
  return out;
}

export function getHowto(slug: string): Howto | undefined {
  return getHowtos().find((h) => h.slug === slug);
}
