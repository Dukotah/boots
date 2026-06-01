import type { Module } from "./types";

export const regex: Module = {
  slug: "regex",
  title: "Regular Expressions",
  description:
    "Master pattern matching in JavaScript. Test, extract, capture, and replace text using regular expressions.",
  emoji: "🔍",
  gradient: "from-violet-400/20 to-violet-500/10",
  tagline: "Learn regex in JavaScript: test, match, capture, and replace text patterns.",
  keywords: [
    "learn regex",
    "javascript regular expressions",
    "regex tutorial",
    "regex match replace",
  ],
  lessons: [
    {
      slug: "test-a-pattern",
      title: "Testing a Pattern",
      blurb: "Check whether a string contains a pattern.",
      xp: 25,
      content: `# Testing a Pattern

A regular expression describes a pattern of text. The simplest thing you can do is ask: *does this string contain the pattern?* Use \`.test()\`, which returns a boolean.

\`\`\`js
const pattern = /cat/;
pattern.test("concatenate"); // true
pattern.test("dog");         // false
\`\`\`

## Your task
Write \`hasDigit(str)\` that returns \`true\` if the string contains at least one digit (0-9), and \`false\` otherwise. The character class \`\\d\` matches any digit.`,
      starterCode: `function hasDigit(str) {
  // TODO: return true if str contains a digit
}
`,
      solution: `function hasDigit(str) {
  return /\\d/.test(str);
}`,
      tests: [
        { name: "string with a digit", code: `assertEquals(hasDigit("abc4"), true);` },
        { name: "no digits", code: `assertEquals(hasDigit("hello"), false);` },
        { name: "digit in the middle", code: `assertEquals(hasDigit("a1b"), true);` },
        { name: "empty string", code: `assertEquals(hasDigit(""), false);` },
      ],
    },
    {
      slug: "first-match",
      title: "The First Match",
      blurb: "Pull out the first piece of text that matches.",
      xp: 30,
      content: `# The First Match

\`String.match(regex)\` returns an array describing the first match (or \`null\` if there is none). Element \`[0]\` is the matched text.

\`\`\`js
"order #4821 shipped".match(/\\d+/); // ["4821", index: 7, ...]
"no numbers here".match(/\\d+/);     // null
\`\`\`

## Your task
Write \`firstNumber(str)\` that returns the first run of digits as a **string**, or \`""\` (empty string) if there are none. \`\\d+\` matches one or more digits.`,
      starterCode: `function firstNumber(str) {
  // TODO: return the first run of digits as a string
}
`,
      solution: `function firstNumber(str) {
  const m = str.match(/\\d+/);
  return m ? m[0] : "";
}`,
      tests: [
        { name: "single number", code: `assertEquals(firstNumber("abc123def"), "123");` },
        { name: "first of several", code: `assertEquals(firstNumber("12 and 34"), "12");` },
        { name: "no digits", code: `assertEquals(firstNumber("none"), "");` },
        { name: "leading number", code: `assertEquals(firstNumber("7up"), "7");` },
      ],
    },
    {
      slug: "all-matches",
      title: "All The Matches",
      blurb: "Collect every match using the global flag.",
      xp: 35,
      content: `# All The Matches

Add the global flag \`g\` and \`match\` returns an array of *all* matches (or \`null\` if none).

\`\`\`js
"a1 b2 c3".match(/\\d+/g); // ["1", "2", "3"]
"abc".match(/\\d+/g);      // null
\`\`\`

## Your task
Write \`allNumbers(str)\` that returns an **array of strings**, one for each run of digits. If there are none, return an empty array \`[]\`.`,
      starterCode: `function allNumbers(str) {
  // TODO: return an array of all digit runs
}
`,
      solution: `function allNumbers(str) {
  return str.match(/\\d+/g) || [];
}`,
      tests: [
        { name: "several numbers", code: `assertEquals(allNumbers("a1 b22 c333"), ["1", "22", "333"]);` },
        { name: "no digits", code: `assertEquals(allNumbers("none here"), []);` },
        { name: "one number", code: `assertEquals(allNumbers("x42"), ["42"]);` },
        { name: "empty string", code: `assertEquals(allNumbers(""), []);` },
      ],
    },
    {
      slug: "capture-groups",
      title: "Capture Groups",
      blurb: "Grab just the part of a match you care about.",
      xp: 45,
      content: `# Capture Groups

Parentheses \`( )\` create a *capture group*. The match array holds the full match at \`[0]\` and each group after it at \`[1]\`, \`[2]\`, and so on.

\`\`\`js
const m = "2026-06-01".match(/(\\d{4})-(\\d{2})-(\\d{2})/);
m[1]; // "2026"  (the year)
m[2]; // "06"    (the month)
\`\`\`

## Your task
Write \`getYear(str)\` that, given a date in \`YYYY-MM-DD\` format, returns the 4-digit year as a **string**. If the string is not a valid date in that format, return \`""\`.`,
      starterCode: `function getYear(str) {
  // TODO: capture and return the year
}
`,
      solution: `function getYear(str) {
  const m = str.match(/^(\\d{4})-(\\d{2})-(\\d{2})$/);
  return m ? m[1] : "";
}`,
      tests: [
        { name: "valid date", code: `assertEquals(getYear("2026-06-01"), "2026");` },
        { name: "another year", code: `assertEquals(getYear("1999-12-31"), "1999");` },
        { name: "bad format", code: `assertEquals(getYear("June 1, 2026"), "");` },
        { name: "partial", code: `assertEquals(getYear("2026-06"), "");` },
      ],
    },
    {
      slug: "replace-pattern",
      title: "Replace With A Pattern",
      blurb: "Swap out every match for something new.",
      xp: 45,
      content: `# Replace With A Pattern

\`String.replace(regex, replacement)\` returns a new string with matches swapped out. Use the \`g\` flag to replace *every* match, not just the first.

\`\`\`js
"a-b-c".replace(/-/g, "_"); // "a_b_c"
"hi   there".replace(/\\s+/g, " "); // "hi there"
\`\`\`

## Your task
Write \`redactDigits(str)\` that replaces every digit with the character \`#\`. For example, \`"call 5551234"\` becomes \`"call #######"\`.`,
      starterCode: `function redactDigits(str) {
  // TODO: replace each digit with "#"
}
`,
      solution: `function redactDigits(str) {
  return str.replace(/\\d/g, "#");
}`,
      tests: [
        { name: "phone number", code: `assertEquals(redactDigits("call 5551234"), "call #######");` },
        { name: "mixed", code: `assertEquals(redactDigits("a1b2c3"), "a#b#c#");` },
        { name: "no digits", code: `assertEquals(redactDigits("hello"), "hello");` },
        { name: "all digits", code: `assertEquals(redactDigits("007"), "###");` },
      ],
    },
    {
      slug: "validate-zip",
      title: "Anchors & Validation",
      blurb: "Use anchors to validate an entire string.",
      xp: 50,
      content: `# Anchors & Validation

To validate a *whole* string, anchor your pattern: \`^\` matches the start and \`$\` matches the end. Without them, a pattern can match just a piece of the string.

\`\`\`js
/^\\d{5}$/.test("90210");   // true
/^\\d{5}$/.test("9021");    // false (only 4 digits)
/^\\d{5}$/.test("90210x");  // false (extra char at end)
\`\`\`

## Your task
Write \`isZip(str)\` that returns \`true\` only if the string is **exactly** 5 digits, and \`false\` otherwise. \`\\d{5}\` means exactly five digits.`,
      starterCode: `function isZip(str) {
  // TODO: return true only for exactly 5 digits
}
`,
      solution: `function isZip(str) {
  return /^\\d{5}$/.test(str);
}`,
      tests: [
        { name: "valid zip", code: `assertEquals(isZip("90210"), true);` },
        { name: "too short", code: `assertEquals(isZip("9021"), false);` },
        { name: "too long", code: `assertEquals(isZip("902100"), false);` },
        { name: "non-digit", code: `assertEquals(isZip("9021a"), false);` },
        { name: "empty", code: `assertEquals(isZip(""), false);` },
      ],
    },
  ],
};
