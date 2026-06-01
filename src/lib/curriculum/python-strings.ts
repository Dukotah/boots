import type { Module } from "./types";

// Python Strings — slicing, methods, and common text tasks. Runs in the browser
// via Pyodide; tests are Python with `assert_equals`.
export const pythonStrings: Module = {
  slug: "python-strings",
  title: "Python: Strings",
  description:
    "Master text in Python: case methods, slicing, counting, reversing, and splitting. The everyday string skills behind real scripts. Runs in your browser.",
  emoji: "🐍",
  gradient: "from-amber-400/20 to-yellow-500/10",
  language: "py",
  tagline:
    "Learn Python strings: upper/lower, slicing, count, reverse, title case, and split.",
  keywords: ["python strings", "python string methods", "python slicing", "python split"],
  lessons: [
    {
      slug: "shout",
      title: "Uppercase It",
      blurb: "String methods like .upper().",
      xp: 30,
      content: `# Uppercase It

Python strings have handy methods: \`.upper()\`, \`.lower()\`, \`.strip()\`, and
more. They return a **new** string.

\`\`\`py
"boots".upper()  # "BOOTS"
\`\`\`

## Your task
Write \`shout(text)\` that returns \`text\` in UPPERCASE with a \`"!"\` added on the
end — e.g. \`shout("hi")\` → \`"HI!"\`.`,
      starterCode: `def shout(text):
    pass
`,
      solution: `def shout(text):
    return text.upper() + "!"`,
      tests: [
        { name: 'shout("hi") == "HI!"', code: `assert_equals(shout("hi"), "HI!")` },
        { name: 'shout("boots") == "BOOTS!"', code: `assert_equals(shout("boots"), "BOOTS!")` },
      ],
    },
    {
      slug: "count-char",
      title: "Counting Characters",
      blurb: "Use .count().",
      xp: 30,
      content: `# Counting Characters

\`text.count(ch)\` returns how many times \`ch\` appears in \`text\`.

## Your task
Write \`count_char(text, ch)\` that returns the number of times \`ch\` appears in
\`text\`.`,
      starterCode: `def count_char(text, ch):
    pass
`,
      solution: `def count_char(text, ch):
    return text.count(ch)`,
      tests: [
        { name: '"banana", "a" → 3', code: `assert_equals(count_char("banana", "a"), 3)` },
        { name: '"hello", "z" → 0', code: `assert_equals(count_char("hello", "z"), 0)` },
      ],
    },
    {
      slug: "reverse",
      title: "Reverse with Slicing",
      blurb: "The [::-1] trick.",
      xp: 35,
      content: `# Reverse with Slicing

Python slicing \`text[start:stop:step]\` is powerful. A step of \`-1\` walks the
string backwards:

\`\`\`py
"abc"[::-1]  # "cba"
\`\`\`

## Your task
Write \`reverse(text)\` that returns \`text\` reversed.`,
      starterCode: `def reverse(text):
    pass
`,
      solution: `def reverse(text):
    return text[::-1]`,
      tests: [
        { name: '"abc" → "cba"', code: `assert_equals(reverse("abc"), "cba")` },
        { name: '"boots" → "stoob"', code: `assert_equals(reverse("boots"), "stoob")` },
      ],
    },
    {
      slug: "is-palindrome",
      title: "Palindrome?",
      blurb: "Compare a string to its reverse.",
      xp: 35,
      content: `# Palindrome?

A palindrome reads the same forwards and backwards. With slicing it's a
one-liner: compare the string to \`text[::-1]\`.

## Your task
Write \`is_palindrome(text)\` that returns \`True\` if \`text\` is a palindrome,
else \`False\`.`,
      starterCode: `def is_palindrome(text):
    pass
`,
      solution: `def is_palindrome(text):
    return text == text[::-1]`,
      tests: [
        { name: '"racecar" → True', code: `assert_equals(is_palindrome("racecar"), True)` },
        { name: '"hello" → False', code: `assert_equals(is_palindrome("hello"), False)` },
      ],
    },
    {
      slug: "title-case",
      title: "Title Case",
      blurb: "Capitalize each word.",
      xp: 30,
      content: `# Title Case

\`text.title()\` capitalizes the first letter of every word.

## Your task
Write \`title_case(text)\` that returns \`text\` with each word capitalized — e.g.
\`title_case("hello world")\` → \`"Hello World"\`.`,
      starterCode: `def title_case(text):
    pass
`,
      solution: `def title_case(text):
    return text.title()`,
      tests: [
        { name: '"hello world" → "Hello World"', code: `assert_equals(title_case("hello world"), "Hello World")` },
        { name: '"boots rocks" → "Boots Rocks"', code: `assert_equals(title_case("boots rocks"), "Boots Rocks")` },
      ],
    },
    {
      slug: "count-words",
      title: "Counting Words",
      blurb: "Split on whitespace.",
      xp: 30,
      content: `# Counting Words

\`text.split()\` with no arguments splits on any run of whitespace and ignores
leading/trailing spaces — perfect for counting words.

## Your task
Write \`count_words(text)\` that returns the number of words in \`text\`. An empty
string has \`0\` words.`,
      starterCode: `def count_words(text):
    pass
`,
      solution: `def count_words(text):
    return len(text.split())`,
      tests: [
        { name: '"a b c" → 3', code: `assert_equals(count_words("a b c"), 3)` },
        { name: "empty → 0", code: `assert_equals(count_words(""), 0)` },
        { name: "extra spaces", code: `assert_equals(count_words("  hi   there  "), 2)` },
      ],
    },
  ],
};
