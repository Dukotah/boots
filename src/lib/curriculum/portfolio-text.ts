import type { Module } from "./types";

// Portfolio Text — five portfolio-ready string-processing projects.
// Each lesson is a complete mini-project: spec → build → test → ship.
export const portfolioText: Module = {
  slug: "portfolio-text",
  title: "Text & String Tools",
  description:
    "Build five real string-processing utilities that belong on your resume. Word rankers, anagram groupers, slug generators — the kind of tools that show up in interviews and production codebases alike.",
  emoji: "✂️",
  gradient: "from-violet-400/20 to-purple-500/10",
  tagline: "build text processing tools for your portfolio",
  language: "js",
  keywords: [
    "javascript string projects",
    "text processing javascript",
    "portfolio projects beginner",
    "anagram grouper",
    "slugify javascript",
  ],
  lessons: [
    {
      slug: "word-frequency-ranker",
      title: "Word Frequency Ranker",
      blurb: "Count and rank every word in a block of text — a search-engine staple.",
      xp: 40,
      language: "js",
      content: `## What you're building

A \`wordRank(text)\` function that takes a plain-text string and returns an array of
\`{ word, count }\` objects sorted from most-frequent to least-frequent.

## Requirements

- Convert the input to lowercase before counting.
- Strip all non-alphabetic characters (punctuation, numbers) so \`"don't"\` becomes \`"dont"\`.
- Ignore empty strings produced by splitting.
- Return an array of \`{ word: string, count: number }\` objects.
- Sort descending by count; ties may appear in any order.

## Stretch goals

- Accept a second argument \`n\` and return only the top-N words.
- Treat a configurable list of stop-words (the, a, an, is…) as invisible.

## What this proves

You can normalize messy real-world text, aggregate with a hash map, and sort by
value — three skills that appear in data engineering, NLP pipelines, and technical
interviews.`,
      starterCode: `function wordRank(text) {
  // 1. Lowercase + strip non-alpha characters
  // 2. Split on whitespace, filter empties
  // 3. Count each word in an object
  // 4. Convert to [{word, count}] and sort descending by count
  return [];
}
`,
      solution: `function wordRank(text) {
  const words = text
    .toLowerCase()
    .replace(/[^a-z\\s]/g, "")
    .split(/\\s+/)
    .filter(w => w.length > 0);
  const counts = {};
  for (const w of words) counts[w] = (counts[w] || 0) + 1;
  return Object.entries(counts)
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count);
}`,
      tests: [
        {
          name: "returns ranked array",
          code: `const result = wordRank("cat bat cat cat bat dog");
assertEquals(result[0].word, "cat");
assertEquals(result[0].count, 3);
assertEquals(result[1].word, "bat");
assertEquals(result[1].count, 2);`,
        },
        {
          name: "case insensitive",
          code: `const result = wordRank("Hello hello HELLO world");
assertEquals(result[0].word, "hello");
assertEquals(result[0].count, 3);`,
        },
        {
          name: "strips punctuation",
          code: `const result = wordRank("wait, wait. wait!");
assertEquals(result[0].word, "wait");
assertEquals(result[0].count, 3);`,
        },
        {
          name: "empty string returns empty array",
          code: `const result = wordRank("   ");
assertEquals(result.length, 0);`,
        },
      ],
      hints: [
        "Use `.replace(/[^a-z\\s]/g, '')` after `.toLowerCase()` to strip punctuation.",
        "Split with `/\\s+/` so multiple spaces don't create empty tokens.",
        "Build a plain object `{}` as a counter, then use `Object.entries()` to convert it to an array.",
      ],
    },
    {
      slug: "anagram-grouper",
      title: "Anagram Grouper",
      blurb: "Group words that are scrambled versions of each other — a classic interview problem.",
      xp: 50,
      language: "js",
      content: `## What you're building

A \`groupAnagrams(words)\` function that takes an array of strings and returns an
array of groups, where each group contains words that are anagrams of each other.

## Requirements

- Two words are anagrams when they contain the same letters in any order
  (e.g. \`"listen"\` and \`"silent"\`, \`"eat"\` and \`"tea"\`).
- Comparison is case-insensitive; store original casing in the output.
- Each group is an array of strings. The order of groups and the order within each
  group do not matter for the tests.
- Words that share no anagram partners appear in a group of their own.

## Stretch goals

- Accept a second argument \`minSize\` and omit groups smaller than that.
- Handle multi-word phrases (sort letters ignoring spaces).

## What this proves

You can derive a canonical key from data (sorted characters), use it as a hash-map
key to bucket items, and return structured grouped output — a pattern that appears
in database grouping, file deduplication, and compiler symbol tables.`,
      starterCode: `function groupAnagrams(words) {
  // Hint: the canonical key for a word is its letters sorted alphabetically.
  // Use a Map: key → [words that share that key]
  // Return Array.from(map.values())
  return [];
}
`,
      solution: `function groupAnagrams(words) {
  const map = new Map();
  for (const word of words) {
    const key = word.toLowerCase().split("").sort().join("");
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(word);
  }
  return Array.from(map.values());
}`,
      tests: [
        {
          name: "groups basic anagrams",
          code: `const groups = groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]);
assertEquals(groups.length, 3);
// find the group that contains "eat"
const eatGroup = groups.find(g => g.includes("eat"));
assert(eatGroup !== undefined, "group with 'eat' not found");
assertEquals(eatGroup.length, 3);
assert(eatGroup.includes("tea"), "expected 'tea' in eat group");
assert(eatGroup.includes("ate"), "expected 'ate' in eat group");`,
        },
        {
          name: "solo words form their own group",
          code: `const groups = groupAnagrams(["dog", "log", "cat"]);
const catGroup = groups.find(g => g.includes("cat"));
assert(catGroup !== undefined, "no group for 'cat'");
assertEquals(catGroup.length, 1);`,
        },
        {
          name: "single word input",
          code: `const groups = groupAnagrams(["hello"]);
assertEquals(groups.length, 1);
assertEquals(groups[0][0], "hello");`,
        },
      ],
      hints: [
        "Sort a word's characters: `word.toLowerCase().split('').sort().join('')`.",
        "Use a `Map` where the sorted-characters string is the key.",
        "Return `Array.from(map.values())` to get the list of groups.",
      ],
    },
    {
      slug: "slugify",
      title: "URL Slug Generator",
      blurb: "Turn any blog title into a clean, SEO-friendly URL slug.",
      xp: 40,
      language: "js",
      content: `## What you're building

A \`slugify(title)\` function that converts a human-readable title into a URL-safe
slug — the same transformation every CMS does when you publish a post.

## Requirements

- Lowercase the entire string.
- Replace any run of whitespace with a single hyphen \`-\`.
- Remove all characters that are not lowercase letters, digits, or hyphens.
- Strip leading and trailing hyphens from the result.
- An empty or whitespace-only input should return an empty string \`""\`.

Examples:
\`\`\`
"Hello, World!"          → "hello-world"
"  My First Blog Post  " → "my-first-blog-post"
"C++ is Awesome!!!"      → "c-is-awesome"
"---"                    → ""
\`\`\`

## Stretch goals

- Transliterate common accented characters (é → e, ü → u) before slugifying.
- Accept an optional \`maxLength\` argument and truncate at a word boundary.

## What this proves

You can chain string transformations, write clear regex replacements, and handle
edge cases — fundamental skills for any web, CMS, or API project.`,
      starterCode: `function slugify(title) {
  // 1. Lowercase
  // 2. Replace runs of whitespace with "-"
  // 3. Remove anything that's not a-z, 0-9, or "-"
  // 4. Strip leading/trailing hyphens
  // 5. Return "" for blank input
  return "";
}
`,
      solution: `function slugify(title) {
  const result = title
    .toLowerCase()
    .replace(/\\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/^-+|-+$/g, "");
  return result;
}`,
      tests: [
        {
          name: "basic title",
          code: `assertEquals(slugify("Hello, World!"), "hello-world");`,
        },
        {
          name: "trims surrounding spaces",
          code: `assertEquals(slugify("  My First Blog Post  "), "my-first-blog-post");`,
        },
        {
          name: "strips special characters",
          code: `assertEquals(slugify("C++ is Awesome!!!"), "c-is-awesome");`,
        },
        {
          name: "returns empty string for blank input",
          code: `assertEquals(slugify("   "), "");
assertEquals(slugify("---"), "");`,
        },
      ],
      hints: [
        "Chain your transformations: lowercase → replace spaces → strip bad chars → trim hyphens.",
        "Use `replace(/\\s+/g, '-')` to collapse runs of whitespace into one hyphen.",
        "Use `replace(/^-+|-+$/g, '')` to strip hyphens from both ends.",
      ],
    },
    {
      slug: "template-fill",
      title: "Template Engine",
      blurb: "Build the mini template engine that powers every mail-merge and notification system.",
      xp: 50,
      language: "js",
      content: `## What you're building

A \`fillTemplate(template, data)\` function that replaces \`{{key}}\` placeholders
in a template string with corresponding values from a data object.

## Requirements

- Placeholders are written as \`{{key}}\` (double curly braces, any key name).
- Replace every placeholder whose key exists in \`data\`; leave unknown placeholders
  as-is (do not delete them).
- The same placeholder may appear multiple times; replace all occurrences.
- Whitespace inside the braces should be stripped: \`{{ name }}\` and \`{{name}}\`
  are both valid and refer to the same key.
- Values in \`data\` are always strings or numbers; coerce them with \`String()\`.

Example:
\`\`\`
fillTemplate("Hi {{name}}, your order #{{id}} is ready!", { name: "Alex", id: 42 })
// → "Hi Alex, your order #42 is ready!"
\`\`\`

## Stretch goals

- Support dot-notation keys like \`{{user.name}}\` for nested objects.
- Add a strict mode that throws when an unknown key is encountered.

## What this proves

You can use regex with a replacer function, handle dynamic key lookups, and build
an extensible utility — the same pattern used by Handlebars, Mustache, and every
notification pipeline.`,
      starterCode: `function fillTemplate(template, data) {
  // Use template.replace() with a regex that matches {{...}}
  // The replacer function receives the full match and the captured key
  // Return the value from data[key.trim()], or the original match if not found
  return template;
}
`,
      solution: `function fillTemplate(template, data) {
  return template.replace(/\\{\\{\\s*([^}]+?)\\s*\\}\\}/g, (match, key) => {
    const trimmed = key.trim();
    return Object.prototype.hasOwnProperty.call(data, trimmed)
      ? String(data[trimmed])
      : match;
  });
}`,
      tests: [
        {
          name: "replaces known placeholders",
          code: `const result = fillTemplate("Hello, {{name}}!", { name: "Alex" });
assertEquals(result, "Hello, Alex!");`,
        },
        {
          name: "leaves unknown placeholders intact",
          code: `const result = fillTemplate("Hello, {{name}} and {{other}}!", { name: "Sam" });
assertEquals(result, "Hello, Sam and {{other}}!");`,
        },
        {
          name: "handles whitespace inside braces",
          code: `const result = fillTemplate("Order #{{ id }} is ready", { id: 99 });
assertEquals(result, "Order #99 is ready");`,
        },
        {
          name: "replaces same key multiple times",
          code: `const result = fillTemplate("{{x}} + {{x}} = ?", { x: "5" });
assertEquals(result, "5 + 5 = ?");`,
        },
      ],
      hints: [
        "Use `String.prototype.replace` with a regex and a replacer function (second argument).",
        "The regex `/\\{\\{\\s*([^}]+?)\\s*\\}\\}/g` captures the key inside the braces.",
        "Inside the replacer, check `Object.prototype.hasOwnProperty.call(data, key)` before substituting.",
      ],
    },
    {
      slug: "line-diff",
      title: "Simple Line Diff",
      blurb: "Compare two text files line-by-line and report what changed — like a miniature git diff.",
      xp: 60,
      language: "js",
      content: `## What you're building

A \`lineDiff(original, revised)\` function that compares two multi-line strings and
returns a structured list of changes — the core of every version-control diff tool.

## Requirements

- Split both strings on newline (\`"\\n"\`).
- Return an array of change objects, one per line that differs.
- Each change object must have the shape:
  \`{ line: number, type: "added" | "removed" | "changed", original?: string, revised?: string }\`
  where \`line\` is the 1-based line index in the *longer* of the two strings.
- A line is **removed** if it exists in \`original\` but has no counterpart in
  \`revised\` (revised is shorter at that index).
- A line is **added** if it exists in \`revised\` but has no counterpart in
  \`original\` (original is shorter at that index).
- A line is **changed** if both versions have a line at that index but the content differs.
- Lines that are identical produce no entry.
- This is a positional diff (line N vs line N), NOT a Myers diff — no LCS needed.

Example:
\`\`\`
original: "hello\\nworld"
revised:  "hello\\nearth\\nextra"
→ [
    { line: 2, type: "changed", original: "world", revised: "earth" },
    { line: 3, type: "added", revised: "extra" }
  ]
\`\`\`

## Stretch goals

- Add a \`context\` option that includes N unchanged lines around each change.
- Render the output as a unified diff string (with \`+\`/\`-\` prefixes).

## What this proves

You can iterate two collections in lockstep, handle length mismatches gracefully,
and emit structured diagnostic output — skills that appear in code review tools,
deployment pipelines, and config management systems.`,
      starterCode: `function lineDiff(original, revised) {
  const origLines = original.split("\\n");
  const revLines  = revised.split("\\n");
  const changes = [];
  const maxLen = Math.max(origLines.length, revLines.length);

  // TODO: iterate from index 0 to maxLen - 1
  // For each position i:
  //   - if both lines exist and differ → push { line: i+1, type: "changed", ... }
  //   - if only original has a line   → push { line: i+1, type: "removed", ... }
  //   - if only revised has a line    → push { line: i+1, type: "added",   ... }

  return changes;
}
`,
      solution: `function lineDiff(original, revised) {
  const origLines = original.split("\\n");
  const revLines  = revised.split("\\n");
  const changes = [];
  const maxLen = Math.max(origLines.length, revLines.length);

  for (let i = 0; i < maxLen; i++) {
    const o = origLines[i];
    const r = revLines[i];
    if (o !== undefined && r !== undefined) {
      if (o !== r) changes.push({ line: i + 1, type: "changed", original: o, revised: r });
    } else if (o !== undefined) {
      changes.push({ line: i + 1, type: "removed", original: o });
    } else {
      changes.push({ line: i + 1, type: "added", revised: r });
    }
  }
  return changes;
}`,
      tests: [
        {
          name: "identical strings return no changes",
          code: `const result = lineDiff("hello\\nworld", "hello\\nworld");
assertEquals(result.length, 0);`,
        },
        {
          name: "detects changed line",
          code: `const result = lineDiff("hello\\nworld", "hello\\nearth");
assertEquals(result.length, 1);
assertEquals(result[0].type, "changed");
assertEquals(result[0].line, 2);
assertEquals(result[0].original, "world");
assertEquals(result[0].revised, "earth");`,
        },
        {
          name: "detects added lines",
          code: `const result = lineDiff("hello", "hello\\nextra\\nmore");
assertEquals(result.length, 2);
assertEquals(result[0].type, "added");
assertEquals(result[0].line, 2);
assertEquals(result[1].type, "added");
assertEquals(result[1].line, 3);`,
        },
        {
          name: "detects removed lines",
          code: `const result = lineDiff("a\\nb\\nc", "a");
assertEquals(result.length, 2);
assertEquals(result[0].type, "removed");
assertEquals(result[0].original, "b");
assertEquals(result[1].type, "removed");
assertEquals(result[1].original, "c");`,
        },
      ],
      hints: [
        "Split with `'\\n'` (a literal newline), not `'\\\\n'`.",
        "Walk from `i = 0` to `Math.max(origLines.length, revLines.length) - 1`.",
        "Check `o !== undefined` and `r !== undefined` separately to distinguish added vs removed.",
      ],
    },
  ],
};
