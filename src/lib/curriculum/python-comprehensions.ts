import type { Module } from "./types";

// Python Comprehensions — the Pythonic way to build lists, dicts, and sets in a
// single expression. Runs in the browser via Pyodide; tests use `assert_equals`.
export const pythonComprehensions: Module = {
  slug: "python-comprehensions",
  title: "Python: Comprehensions",
  description:
    "Write less, do more. List, dict, and set comprehensions turn loops into one clean, fast expression — the most Pythonic skill there is.",
  emoji: "🐍",
  gradient: "from-lime-400/20 to-green-500/10",
  language: "py",
  tagline:
    "Learn Python list, dict, and set comprehensions: map, filter, nesting, and flattening.",
  keywords: [
    "python comprehensions",
    "list comprehension",
    "dict comprehension",
    "python one-liners",
  ],
  lessons: [
    {
      slug: "squares",
      title: "List Comprehension",
      blurb: "[expr for x in items].",
      xp: 30,
      content: `# List Comprehension

A **list comprehension** builds a list in one expression:

\`\`\`py
[n * 2 for n in [1, 2, 3]]  # [2, 4, 6]
\`\`\`

## Your task
Write \`squares(nums)\` that returns a list of each number squared.`,
      starterCode: `def squares(nums):
    pass
`,
      solution: `def squares(nums):
    return [n * n for n in nums]`,
      tests: [
        { name: "[1,2,3] → [1,4,9]", code: `assert_equals(squares([1, 2, 3]), [1, 4, 9])` },
        { name: "empty → []", code: `assert_equals(squares([]), [])` },
      ],
    },
    {
      slug: "evens",
      title: "Filtering in a Comprehension",
      blurb: "Add an if clause.",
      xp: 35,
      content: `# Filtering in a Comprehension

Add \`if\` to keep only some items:

\`\`\`py
[n for n in nums if n > 0]
\`\`\`

## Your task
Write \`evens(nums)\` that returns only the even numbers, in order.`,
      starterCode: `def evens(nums):
    pass
`,
      solution: `def evens(nums):
    return [n for n in nums if n % 2 == 0]`,
      tests: [
        { name: "keeps evens", code: `assert_equals(evens([1, 2, 3, 4]), [2, 4])` },
        { name: "none even → []", code: `assert_equals(evens([1, 3, 5]), [])` },
      ],
    },
    {
      slug: "lengths",
      title: "Transforming Items",
      blurb: "Map each value.",
      xp: 30,
      content: `# Transforming Items

The expression on the left can be any function of the item.

## Your task
Write \`lengths(words)\` that returns a list of the length of each word.`,
      starterCode: `def lengths(words):
    pass
`,
      solution: `def lengths(words):
    return [len(w) for w in words]`,
      tests: [
        { name: "word lengths", code: `assert_equals(lengths(["a", "bb", "ccc"]), [1, 2, 3])` },
      ],
    },
    {
      slug: "dict-comprehension",
      title: "Dict Comprehension",
      blurb: "{key: value for ...}.",
      xp: 40,
      content: `# Dict Comprehension

Build a dictionary in one expression:

\`\`\`py
{w: len(w) for w in words}
\`\`\`

## Your task
Write \`word_lengths(words)\` that returns a dict mapping each word to its length.`,
      starterCode: `def word_lengths(words):
    pass
`,
      solution: `def word_lengths(words):
    return {w: len(w) for w in words}`,
      tests: [
        {
          name: "maps word → length",
          code: `assert_equals(word_lengths(["a", "bb"]), {"a": 1, "bb": 2})`,
        },
      ],
    },
    {
      slug: "flatten",
      title: "Nested Comprehension",
      blurb: "Flatten a 2D list.",
      xp: 45,
      content: `# Nested Comprehension

Two \`for\` clauses flatten nested data — read them left-to-right like nested
loops:

\`\`\`py
[x for row in matrix for x in row]
\`\`\`

## Your task
Write \`flatten(matrix)\` that turns a list of lists into a single flat list.`,
      starterCode: `def flatten(matrix):
    pass
`,
      solution: `def flatten(matrix):
    return [x for row in matrix for x in row]`,
      tests: [
        { name: "flattens rows", code: `assert_equals(flatten([[1, 2], [3, 4]]), [1, 2, 3, 4])` },
        { name: "single row", code: `assert_equals(flatten([[9]]), [9])` },
      ],
    },
  ],
};
