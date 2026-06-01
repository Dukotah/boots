import type { Module } from "./types";

export const strings: Module = {
  slug: "strings",
  title: "Strings & Text",
  description:
    "Text is everywhere in programming, from names to messages to file paths. Learn the JavaScript string methods that let you read, slice, search, and reshape text with confidence.",
  emoji: "🔤",
  gradient: "from-sky-400/20 to-cyan-500/10",
  tagline: "learn JavaScript string methods and text processing",
  keywords: [
    "javascript strings",
    "string methods javascript",
    "text processing",
    "split join slice",
  ],
  lessons: [
    {
      slug: "length-and-access",
      title: "Length & Access",
      blurb: "Measure a string and grab a single character.",
      xp: 25,
      content: `# Length & Access

A string is a sequence of characters. \`.length\` tells you how many there are, and
square-bracket indexing reads a single character. The first character is at index
\`0\`, and the last is at index \`.length - 1\`.

\`\`\`js
const word = "boots";
word.length;      // 5
word[0];          // "b"
word[word.length - 1]; // "s"
\`\`\`

## Your task
Write a function \`lastChar\` that returns the **last character** of the given string \`s\`.`,
      starterCode: `function lastChar(s) {
  // return the last character of s
}
`,
      solution: `function lastChar(s) {
  return s[s.length - 1];
}`,
      tests: [
        { name: 'lastChar("boots") === "s"', code: `assertEquals(lastChar("boots"), "s");` },
        { name: 'lastChar("a") === "a"', code: `assertEquals(lastChar("a"), "a");` },
        { name: 'lastChar("hello!") === "!"', code: `assertEquals(lastChar("hello!"), "!");` },
      ],
    },
    {
      slug: "case-and-trim",
      title: "Case & Trim",
      blurb: "Normalize messy user input.",
      xp: 28,
      content: `# Case & Trim

User input is messy: stray spaces and inconsistent capitalization. \`.trim()\`
removes whitespace from both ends, and \`.toLowerCase()\` / \`.toUpperCase()\`
change the case. Chaining them is a common way to normalize text.

\`\`\`js
"  Hello ".trim();           // "Hello"
"Hello".toLowerCase();       // "hello"
"  HeLLo ".trim().toLowerCase(); // "hello"
\`\`\`

## Your task
Write a function \`normalize\` that trims the string \`s\` and returns it in **lowercase**.`,
      starterCode: `function normalize(s) {
  // trim s and return it lowercased
}
`,
      solution: `function normalize(s) {
  return s.trim().toLowerCase();
}`,
      tests: [
        { name: 'normalize("  Hello ") === "hello"', code: `assertEquals(normalize("  Hello "), "hello");` },
        { name: 'normalize("BOOTS") === "boots"', code: `assertEquals(normalize("BOOTS"), "boots");` },
        { name: 'normalize("  MixED CaSe  ") === "mixed case"', code: `assertEquals(normalize("  MixED CaSe  "), "mixed case");` },
      ],
    },
    {
      slug: "includes-indexof",
      title: "Searching Text",
      blurb: "Check whether a string contains something.",
      xp: 30,
      content: `# Searching Text

\`.includes(part)\` returns \`true\` or \`false\` depending on whether \`part\`
appears anywhere in the string. \`.indexOf(part)\` returns the position of the
first match, or \`-1\` if it isn't found.

\`\`\`js
"hello world".includes("world"); // true
"hello world".includes("xyz");   // false
"hello world".indexOf("world");  // 6
\`\`\`

## Your task
Write a function \`hasCat\` that returns \`true\` if the string \`s\` contains the
word \`"cat"\`, and \`false\` otherwise.`,
      starterCode: `function hasCat(s) {
  // return true if s contains "cat"
}
`,
      solution: `function hasCat(s) {
  return s.includes("cat");
}`,
      tests: [
        { name: 'hasCat("the cat sat") === true', code: `assertEquals(hasCat("the cat sat"), true);` },
        { name: 'hasCat("dogs only") === false', code: `assertEquals(hasCat("dogs only"), false);` },
        { name: 'hasCat("concatenate") === true', code: `assertEquals(hasCat("concatenate"), true);` },
      ],
    },
    {
      slug: "slice-substring",
      title: "Extracting a Portion",
      blurb: "Pull a substring out of a larger string.",
      xp: 32,
      content: `# Extracting a Portion

\`.slice(start, end)\` returns the characters from index \`start\` up to (but not
including) \`end\`. Leave off \`end\` to go to the finish, and use negative numbers
to count from the end.

\`\`\`js
"javascript".slice(0, 4);  // "java"
"javascript".slice(4);     // "script"
"javascript".slice(-6);    // "script"
\`\`\`

## Your task
Write a function \`firstThree\` that returns the **first three characters** of the
string \`s\`.`,
      starterCode: `function firstThree(s) {
  // return the first 3 characters of s
}
`,
      solution: `function firstThree(s) {
  return s.slice(0, 3);
}`,
      tests: [
        { name: 'firstThree("javascript") === "jav"', code: `assertEquals(firstThree("javascript"), "jav");` },
        { name: 'firstThree("boots") === "boo"', code: `assertEquals(firstThree("boots"), "boo");` },
        { name: 'firstThree("hi") === "hi"', code: `assertEquals(firstThree("hi"), "hi");` },
      ],
    },
    {
      slug: "split-join",
      title: "Split & Join",
      blurb: "Break text into parts and put it back together.",
      xp: 35,
      content: `# Split & Join

\`.split(sep)\` chops a string into an **array** wherever \`sep\` appears.
\`.join(sep)\` does the reverse, gluing an array back into a string. Together
they're perfect for counting words or swapping delimiters.

\`\`\`js
"a,b,c".split(",");        // ["a", "b", "c"]
["a", "b", "c"].join("-"); // "a-b-c"
"one two three".split(" ").length; // 3
\`\`\`

## Your task
Write a function \`wordCount\` that returns the number of words in the sentence
\`s\` (words are separated by single spaces).`,
      starterCode: `function wordCount(s) {
  // return how many words are in s
}
`,
      solution: `function wordCount(s) {
  return s.split(" ").length;
}`,
      tests: [
        { name: 'wordCount("hello world") === 2', code: `assertEquals(wordCount("hello world"), 2);` },
        { name: 'wordCount("one two three four") === 4', code: `assertEquals(wordCount("one two three four"), 4);` },
        { name: 'wordCount("solo") === 1', code: `assertEquals(wordCount("solo"), 1);` },
      ],
    },
    {
      slug: "pad-and-repeat",
      title: "Padding & Repeating",
      blurb: "Zero-pad a number to a fixed width.",
      xp: 38,
      content: `# Padding & Repeating

\`.padStart(width, fill)\` adds \`fill\` characters to the front until the string
reaches \`width\`. \`.repeat(n)\` makes \`n\` copies. These are handy for formatting
numbers, IDs, and aligned output.

\`\`\`js
"7".padStart(3, "0");  // "007"
"42".padStart(3, "0"); // "042"
"ab".repeat(3);        // "ababab"
\`\`\`

## Your task
Write a function \`zeroPad\` that takes a number \`n\` and returns it as a string
padded with leading zeros to a width of **4** (e.g. \`7\` → \`"0007"\`).`,
      starterCode: `function zeroPad(n) {
  // return n as a string, zero-padded to width 4
}
`,
      solution: `function zeroPad(n) {
  return String(n).padStart(4, "0");
}`,
      tests: [
        { name: 'zeroPad(7) === "0007"', code: `assertEquals(zeroPad(7), "0007");` },
        { name: 'zeroPad(42) === "0042"', code: `assertEquals(zeroPad(42), "0042");` },
        { name: 'zeroPad(1234) === "1234"', code: `assertEquals(zeroPad(1234), "1234");` },
      ],
    },
    {
      slug: "reverse-words",
      title: "Reverse the Words",
      blurb: "Combine split, reverse, and join.",
      xp: 42,
      content: `# Reverse the Words

Now put it all together. To reverse the **order of words** in a sentence,
\`.split(" ")\` into an array, \`.reverse()\` the array, then \`.join(" ")\` it back
into a string.

\`\`\`js
"the quick fox".split(" ");        // ["the", "quick", "fox"]
["the", "quick", "fox"].reverse(); // ["fox", "quick", "the"]
["fox", "quick", "the"].join(" "); // "fox quick the"
\`\`\`

## Your task
Write a function \`reverseWords\` that reverses the order of words in the sentence
\`s\` (e.g. \`"hello world"\` → \`"world hello"\`).`,
      starterCode: `function reverseWords(s) {
  // reverse the order of words in s
}
`,
      solution: `function reverseWords(s) {
  return s.split(" ").reverse().join(" ");
}`,
      tests: [
        { name: 'reverseWords("hello world") === "world hello"', code: `assertEquals(reverseWords("hello world"), "world hello");` },
        { name: 'reverseWords("the quick brown fox") === "fox brown quick the"', code: `assertEquals(reverseWords("the quick brown fox"), "fox brown quick the");` },
        { name: 'reverseWords("solo") === "solo"', code: `assertEquals(reverseWords("solo"), "solo");` },
      ],
    },
  ],
};
