import type { Module } from "./types";

// Coding Interview Prep — the canonical whiteboard problems, auto-graded in-browser.
// Progressively harder: warm-ups → hashing → the classic DP one-liner (Kadane's).
export const interview: Module = {
  slug: "interview",
  title: "Coding Interview Prep",
  description:
    "Practice the classic coding-interview questions that show up again and again. Each one is auto-graded so you can build real fluency before the real thing.",
  emoji: "💼",
  gradient: "from-indigo-400/20 to-violet-500/10",
  tagline: "practice classic coding interview questions in JavaScript",
  keywords: [
    "coding interview questions",
    "javascript interview prep",
    "leetcode practice",
    "technical interview",
  ],
  lessons: [
    {
      slug: "fizzbuzz",
      title: "FizzBuzz",
      blurb: "The legendary screening question.",
      xp: 35,
      content: `# FizzBuzz

The most famous warm-up in interviewing. For numbers \`1\` through \`n\`:
multiples of 3 become \`"Fizz"\`, multiples of 5 become \`"Buzz"\`, multiples of
both become \`"FizzBuzz"\`, everything else stays its own number (as a string).

\`\`\`js
15 % 3 === 0 && 15 % 5 === 0; // true → "FizzBuzz"
\`\`\`

## Your task
Write \`fizzBuzz(n)\` that returns an **array** of length \`n\`, where index \`i\`
holds the value for the number \`i + 1\`. Numbers that aren't Fizz/Buzz should be
strings (e.g. \`"1"\`, \`"2"\`).`,
      starterCode: `function fizzBuzz(n) {
  // build an array from 1..n applying the Fizz/Buzz rules
  return [];
}
`,
      solution: `function fizzBuzz(n) {
  const out = [];
  for (let i = 1; i <= n; i++) {
    if (i % 15 === 0) out.push("FizzBuzz");
    else if (i % 3 === 0) out.push("Fizz");
    else if (i % 5 === 0) out.push("Buzz");
    else out.push(String(i));
  }
  return out;
}`,
      tests: [
        {
          name: "first 5",
          code: `assertEquals(fizzBuzz(5), ["1","2","Fizz","4","Buzz"]);`,
        },
        {
          name: "hits FizzBuzz at 15",
          code: `assertEquals(fizzBuzz(15)[14], "FizzBuzz");`,
        },
        {
          name: "edge: n = 0 → empty array",
          code: `assertEquals(fizzBuzz(0), []);`,
        },
      ],
    },
    {
      slug: "is-palindrome",
      title: "Is Palindrome",
      blurb: "Reads the same both ways.",
      xp: 35,
      content: `# Is Palindrome

A **palindrome** reads identically forwards and backwards. Keep it simple here:
treat the input as-is (no stripping needed) and compare it to its reverse.

\`\`\`js
"racecar".split("").reverse().join(""); // "racecar"
\`\`\`

## Your task
Write \`isPalindrome(str)\` that returns \`true\` if \`str\` equals its reverse,
otherwise \`false\`. An empty string counts as \`true\`.`,
      starterCode: `function isPalindrome(str) {
  // compare the string to its reversed self
  return false;
}
`,
      solution: `function isPalindrome(str) {
  const reversed = str.split("").reverse().join("");
  return str === reversed;
}`,
      tests: [
        {
          name: '"racecar" → true',
          code: `assertEquals(isPalindrome("racecar"), true);`,
        },
        {
          name: '"hello" → false',
          code: `assertEquals(isPalindrome("hello"), false);`,
        },
        {
          name: "edge: empty string → true",
          code: `assertEquals(isPalindrome(""), true);`,
        },
      ],
    },
    {
      slug: "two-sum",
      title: "Two Sum",
      blurb: "Find the pair that adds to the target.",
      xp: 45,
      content: `# Two Sum

Given an array of numbers and a target, return the **indices** of the two
numbers that add up to the target. A hash map of \`value → index\` lets you
solve it in a single pass: for each number, check if its complement was seen.

\`\`\`js
const seen = new Map();
seen.set(2, 0); // value 2 was at index 0
seen.has(7);    // was 7 seen already?
\`\`\`

## Your task
Write \`twoSum(nums, target)\` returning \`[i, j]\` (i < j) for the pair that
sums to \`target\`. Exactly one solution exists. Return \`[]\` if none.`,
      starterCode: `function twoSum(nums, target) {
  // for each number, look for its complement among earlier numbers
  return [];
}
`,
      solution: `function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (seen.has(need)) return [seen.get(need), i];
    seen.set(nums[i], i);
  }
  return [];
}`,
      tests: [
        {
          name: "[2,7,11,15], 9 → [0,1]",
          code: `assertEquals(twoSum([2,7,11,15], 9), [0,1]);`,
        },
        {
          name: "[3,2,4], 6 → [1,2]",
          code: `assertEquals(twoSum([3,2,4], 6), [1,2]);`,
        },
        {
          name: "edge: no pair → []",
          code: `assertEquals(twoSum([1,2,3], 100), []);`,
        },
      ],
    },
    {
      slug: "valid-anagram",
      title: "Valid Anagram",
      blurb: "Same letters, rearranged.",
      xp: 40,
      content: `# Valid Anagram

Two strings are **anagrams** if one is a rearrangement of the other — same
letters, same counts. The quickest check: sort both strings' characters and
compare, or count letter frequencies.

\`\`\`js
"listen".split("").sort().join(""); // "eilnst"
\`\`\`

## Your task
Write \`isAnagram(a, b)\` that returns \`true\` if \`a\` and \`b\` are anagrams of
each other, otherwise \`false\`. Different lengths can never be anagrams.`,
      starterCode: `function isAnagram(a, b) {
  // compare the sorted characters of both strings
  return false;
}
`,
      solution: `function isAnagram(a, b) {
  if (a.length !== b.length) return false;
  const sort = (s) => s.split("").sort().join("");
  return sort(a) === sort(b);
}`,
      tests: [
        {
          name: '"listen" / "silent" → true',
          code: `assertEquals(isAnagram("listen", "silent"), true);`,
        },
        {
          name: '"rat" / "car" → false',
          code: `assertEquals(isAnagram("rat", "car"), false);`,
        },
        {
          name: "edge: different lengths → false",
          code: `assertEquals(isAnagram("a", "ab"), false);`,
        },
      ],
    },
    {
      slug: "remove-duplicates",
      title: "Remove Duplicates",
      blurb: "Keep first occurrences, preserve order.",
      xp: 45,
      content: `# Remove Duplicates

Given an array, return a **new** array with duplicates removed, keeping the
**first** occurrence of each value and preserving order. A \`Set\` tracks what
you've already seen.

\`\`\`js
const seen = new Set();
seen.has(3); // false → first time
seen.add(3);
\`\`\`

## Your task
Write \`removeDuplicates(arr)\` that returns a new array with duplicates removed,
in original order. Do not mutate the input.`,
      starterCode: `function removeDuplicates(arr) {
  // keep only the first time each value appears
  return arr;
}
`,
      solution: `function removeDuplicates(arr) {
  const seen = new Set();
  const out = [];
  for (const x of arr) {
    if (!seen.has(x)) {
      seen.add(x);
      out.push(x);
    }
  }
  return out;
}`,
      tests: [
        {
          name: "[1,2,2,3,1] → [1,2,3]",
          code: `assertEquals(removeDuplicates([1,2,2,3,1]), [1,2,3]);`,
        },
        {
          name: "preserves order",
          code: `assertEquals(removeDuplicates([3,1,3,2,1]), [3,1,2]);`,
        },
        {
          name: "edge: empty array → []",
          code: `assertEquals(removeDuplicates([]), []);`,
        },
      ],
    },
    {
      slug: "first-non-repeating",
      title: "First Non-Repeating Character",
      blurb: "The first character that appears only once.",
      xp: 50,
      content: `# First Non-Repeating Character

Find the **first** character in a string that appears exactly once. Count every
character's frequency first, then scan the string in order and return the first
one whose count is 1.

\`\`\`js
const counts = {};
counts["a"] = (counts["a"] || 0) + 1;
\`\`\`

## Your task
Write \`firstNonRepeating(str)\` that returns the first non-repeating character,
or \`""\` (empty string) if every character repeats.`,
      starterCode: `function firstNonRepeating(str) {
  // count characters, then find the first with a count of 1
  return "";
}
`,
      solution: `function firstNonRepeating(str) {
  const counts = {};
  for (const ch of str) counts[ch] = (counts[ch] || 0) + 1;
  for (const ch of str) {
    if (counts[ch] === 1) return ch;
  }
  return "";
}`,
      tests: [
        {
          name: '"leetcode" → "l"',
          code: `assertEquals(firstNonRepeating("leetcode"), "l");`,
        },
        {
          name: '"aabb" → ""',
          code: `assertEquals(firstNonRepeating("aabb"), "");`,
        },
        {
          name: "edge: empty string → \"\"",
          code: `assertEquals(firstNonRepeating(""), "");`,
        },
      ],
    },
    {
      slug: "max-subarray-sum",
      title: "Maximum Subarray Sum",
      blurb: "Kadane's algorithm — the classic DP.",
      xp: 60,
      content: `# Maximum Subarray Sum

Find the largest sum of any **contiguous** subarray. **Kadane's algorithm**
sweeps once: at each element decide whether to extend the running sum or restart
from the current element, tracking the best seen so far.

\`\`\`js
current = Math.max(num, current + num); // extend or restart
\`\`\`

## Your task
Write \`maxSubArray(nums)\` that returns the maximum contiguous subarray sum.
The array has at least one element (values may be negative).`,
      starterCode: `function maxSubArray(nums) {
  // track the best sum ending here, and the best overall
  return 0;
}
`,
      solution: `function maxSubArray(nums) {
  let current = nums[0];
  let best = nums[0];
  for (let i = 1; i < nums.length; i++) {
    current = Math.max(nums[i], current + nums[i]);
    best = Math.max(best, current);
  }
  return best;
}`,
      tests: [
        {
          name: "[-2,1,-3,4,-1,2,1,-5,4] → 6",
          code: `assertEquals(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]), 6);`,
        },
        {
          name: "all positive sums everything",
          code: `assertEquals(maxSubArray([1,2,3,4]), 10);`,
        },
        {
          name: "edge: all negative → largest single",
          code: `assertEquals(maxSubArray([-3,-1,-2]), -1);`,
        },
      ],
    },
  ],
};
