import type { Module } from "./types";

// Algorithms & Problem Solving — the classic interview/freeCodeCamp/LeetCode-style
// challenges, auto-graded in-browser. Builds the "I can solve problems" muscle.
export const algorithms: Module = {
  slug: "algorithms",
  title: "Algorithms & Problem Solving",
  description:
    "The classic coding challenges every developer should know — string manipulation, searching, sorting, and recursion. Build real problem-solving instincts.",
  emoji: "🧩",
  gradient: "from-emerald-400/20 to-teal-500/10",
  tagline:
    "Master coding-interview classics: palindromes, two-sum, binary search, sorting, Fibonacci, and more.",
  lessons: [
    {
      slug: "reverse-string",
      title: "Reverse a String",
      blurb: "The quintessential warm-up.",
      xp: 30,
      content: `# Reverse a String

A staple of every coding interview. Strings have no built-in \`reverse\`, but
arrays do — so the trick is: **split → reverse → join**.

\`\`\`js
"abc".split("");          // ["a","b","c"]
["a","b","c"].reverse();  // ["c","b","a"]
\`\`\`

## Your task
Write \`reverseString(str)\` that returns the string reversed.`,
      starterCode: `function reverseString(str) {
  // split into characters, reverse, join back
}
`,
      solution: `function reverseString(str) {
  return str.split("").reverse().join("");
}`,
      tests: [
        { name: '"hello" → "olleh"', code: `assertEquals(reverseString("hello"), "olleh");` },
        { name: 'empty string', code: `assertEquals(reverseString(""), "");` },
        { name: '"Boots" → "stooB"', code: `assertEquals(reverseString("Boots"), "stooB");` },
      ],
    },
    {
      slug: "is-palindrome",
      title: "Palindrome Check",
      blurb: "Reads the same forwards and backwards.",
      xp: 35,
      content: `# Palindrome Check

A **palindrome** reads the same both ways ("racecar"). Real inputs have mixed
case and punctuation, so normalize first: lowercase and strip non-alphanumerics.

\`\`\`js
"A man, a plan...".toLowerCase().replace(/[^a-z0-9]/g, "");
\`\`\`

## Your task
Write \`isPalindrome(str)\` that returns \`true\` if the string is a palindrome,
ignoring case, spaces, and punctuation. An empty string counts as \`true\`.`,
      starterCode: `function isPalindrome(str) {
  // normalize, then compare to its reverse
}
`,
      solution: `function isPalindrome(str) {
  const clean = str.toLowerCase().replace(/[^a-z0-9]/g, "");
  return clean === clean.split("").reverse().join("");
}`,
      tests: [
        { name: '"racecar" → true', code: `assertEquals(isPalindrome("racecar"), true);` },
        { name: '"hello" → false', code: `assertEquals(isPalindrome("hello"), false);` },
        {
          name: "ignores case & punctuation",
          code: `assertEquals(isPalindrome("A man, a plan, a canal: Panama"), true);`,
        },
      ],
    },
    {
      slug: "count-vowels",
      title: "Count the Vowels",
      blurb: "Practice with regex and counting.",
      xp: 30,
      content: `# Count the Vowels

Counting characters that match a set is a common subtask. A regex with the
global + case-insensitive flags finds them all:

\`\`\`js
"Hello".match(/[aeiou]/gi); // ["e","o"]
\`\`\`

\`.match\` returns \`null\` when there are no matches, so guard with \`|| []\`.

## Your task
Write \`countVowels(str)\` that returns the number of vowels (a, e, i, o, u),
case-insensitive.`,
      starterCode: `function countVowels(str) {
  // count a, e, i, o, u (any case)
}
`,
      solution: `function countVowels(str) {
  return (str.match(/[aeiou]/gi) || []).length;
}`,
      tests: [
        { name: '"hello" → 2', code: `assertEquals(countVowels("hello"), 2);` },
        { name: '"xyz" → 0', code: `assertEquals(countVowels("xyz"), 0);` },
        { name: '"AEIOU" → 5', code: `assertEquals(countVowels("AEIOU"), 5);` },
      ],
    },
    {
      slug: "title-case",
      title: "Title Case",
      blurb: "Capitalize every word.",
      xp: 35,
      content: `# Title Case

Transform a sentence so each word starts uppercase and the rest is lowercase —
"hello WORLD" → "Hello World". Split on spaces, transform each word, rejoin.

\`\`\`js
"hello".charAt(0).toUpperCase() + "hello".slice(1); // "Hello"
\`\`\`

## Your task
Write \`titleCase(str)\` that capitalizes the first letter of each
space-separated word and lowercases the rest.`,
      starterCode: `function titleCase(str) {
  // capitalize the first letter of each word
}
`,
      solution: `function titleCase(str) {
  return str
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}`,
      tests: [
        { name: '"hello world"', code: `assertEquals(titleCase("hello world"), "Hello World");` },
        { name: "mixed case", code: `assertEquals(titleCase("the QUICK brown"), "The Quick Brown");` },
      ],
    },
    {
      slug: "fibonacci",
      title: "Fibonacci",
      blurb: "Each number is the sum of the previous two.",
      xp: 40,
      content: `# Fibonacci

The Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8, 13… Each term is the sum of the two
before it. An **iterative** approach is far faster than naive recursion.

\`\`\`js
let a = 0, b = 1;
// roll the pair forward n times
\`\`\`

## Your task
Write \`fib(n)\` that returns the n-th Fibonacci number (0-indexed: \`fib(0)\` is
\`0\`, \`fib(1)\` is \`1\`).`,
      starterCode: `function fib(n) {
  // return the n-th Fibonacci number (iteratively)
}
`,
      solution: `function fib(n) {
  if (n < 2) return n;
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) {
    const next = a + b;
    a = b;
    b = next;
  }
  return b;
}`,
      tests: [
        { name: "fib(0) === 0", code: `assertEquals(fib(0), 0);` },
        { name: "fib(1) === 1", code: `assertEquals(fib(1), 1);` },
        { name: "fib(7) === 13", code: `assertEquals(fib(7), 13);` },
        { name: "fib(10) === 55", code: `assertEquals(fib(10), 55);` },
      ],
    },
    {
      slug: "sum-digits",
      title: "Sum of Digits",
      blurb: "Break a number into its digits.",
      xp: 35,
      content: `# Sum of Digits

Add up every digit of a number: 123 → 1 + 2 + 3 = 6. Convert to a string, split,
and reduce. Use \`Math.abs\` so negatives work too.

## Your task
Write \`sumDigits(n)\` that returns the sum of the digits of \`n\`.`,
      starterCode: `function sumDigits(n) {
  // add up each digit of n
}
`,
      solution: `function sumDigits(n) {
  return String(Math.abs(n))
    .split("")
    .reduce((total, d) => total + Number(d), 0);
}`,
      tests: [
        { name: "sumDigits(123) === 6", code: `assertEquals(sumDigits(123), 6);` },
        { name: "sumDigits(0) === 0", code: `assertEquals(sumDigits(0), 0);` },
        { name: "sumDigits(99) === 18", code: `assertEquals(sumDigits(99), 18);` },
      ],
    },
    {
      slug: "two-sum",
      title: "Two Sum",
      blurb: "The most famous interview question.",
      xp: 45,
      content: `# Two Sum

Given an array and a target, return the **indices** of the two numbers that add
up to the target. The naive double-loop is O(n²); a hash map of "value → index"
gets it to O(n): for each number, check if its **complement** was already seen.

## Your task
Write \`twoSum(nums, target)\` returning a 2-element array of indices
\`[i, j]\` (i before j). Return \`[]\` if no pair exists.`,
      starterCode: `function twoSum(nums, target) {
  // return indices of the two numbers that sum to target
}
`,
      solution: `function twoSum(nums, target) {
  const seen = {};
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (seen[need] !== undefined) return [seen[need], i];
    seen[nums[i]] = i;
  }
  return [];
}`,
      tests: [
        { name: "[2,7,11,15], 9 → [0,1]", code: `assertEquals(twoSum([2, 7, 11, 15], 9), [0, 1]);` },
        { name: "[3,2,4], 6 → [1,2]", code: `assertEquals(twoSum([3, 2, 4], 6), [1, 2]);` },
        { name: "no pair → []", code: `assertEquals(twoSum([1, 2], 10), []);` },
      ],
    },
    {
      slug: "is-anagram",
      title: "Anagram Check",
      blurb: "Same letters, different order.",
      xp: 40,
      content: `# Anagram Check

Two strings are **anagrams** if they contain the same letters in any order
("listen" / "silent"). Normalize (lowercase, strip non-letters), sort the
characters, and compare.

## Your task
Write \`isAnagram(a, b)\` returning \`true\` if the two strings are anagrams,
ignoring case and spaces.`,
      starterCode: `function isAnagram(a, b) {
  // do both strings contain the same letters?
}
`,
      solution: `function isAnagram(a, b) {
  const norm = (s) =>
    s.toLowerCase().replace(/[^a-z0-9]/g, "").split("").sort().join("");
  return norm(a) === norm(b);
}`,
      tests: [
        { name: "listen / silent", code: `assertEquals(isAnagram("listen", "silent"), true);` },
        { name: "hello / world", code: `assertEquals(isAnagram("hello", "world"), false);` },
        {
          name: "ignores case & spaces",
          code: `assertEquals(isAnagram("Dormitory", "dirty room"), true);`,
        },
      ],
    },
    {
      slug: "binary-search",
      title: "Binary Search",
      blurb: "Halve the haystack every step.",
      xp: 45,
      content: `# Binary Search

On a **sorted** array you don't scan linearly — you jump to the middle and throw
away half each step (O(log n)). Track \`lo\` and \`hi\` pointers and move them
toward the target.

## Your task
Write \`binarySearch(sorted, target)\` returning the **index** of \`target\` in
the sorted array, or \`-1\` if it's not present.`,
      starterCode: `function binarySearch(sorted, target) {
  // return the index of target, or -1
}
`,
      solution: `function binarySearch(sorted, target) {
  let lo = 0;
  let hi = sorted.length - 1;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (sorted[mid] === target) return mid;
    if (sorted[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}`,
      tests: [
        { name: "finds 7 at index 3", code: `assertEquals(binarySearch([1, 3, 5, 7, 9], 7), 3);` },
        { name: "missing → -1", code: `assertEquals(binarySearch([1, 3, 5, 7, 9], 2), -1);` },
        { name: "single element", code: `assertEquals(binarySearch([10], 10), 0);` },
      ],
    },
    {
      slug: "bubble-sort",
      title: "Bubble Sort",
      blurb: "Implement a sort from scratch.",
      xp: 45,
      content: `# Bubble Sort

Sorting is built in, but implementing one teaches how they work. **Bubble sort**
repeatedly walks the list, swapping adjacent out-of-order pairs until none remain.
Work on a **copy** so you don't mutate the input.

## Your task
Write \`bubbleSort(arr)\` that returns a new array sorted ascending.`,
      starterCode: `function bubbleSort(arr) {
  // return a new, ascending-sorted array (don't mutate the input)
}
`,
      solution: `function bubbleSort(arr) {
  const a = [...arr];
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a.length - 1 - i; j++) {
      if (a[j] > a[j + 1]) {
        const tmp = a[j];
        a[j] = a[j + 1];
        a[j + 1] = tmp;
      }
    }
  }
  return a;
}`,
      tests: [
        { name: "[3,1,2] → [1,2,3]", code: `assertEquals(bubbleSort([3, 1, 2]), [1, 2, 3]);` },
        { name: "empty", code: `assertEquals(bubbleSort([]), []);` },
        { name: "reversed", code: `assertEquals(bubbleSort([5, 4, 3, 2, 1]), [1, 2, 3, 4, 5]);` },
      ],
    },
    {
      slug: "flatten",
      title: "Flatten an Array",
      blurb: "One level deep.",
      xp: 35,
      content: `# Flatten an Array

Turn \`[[1, 2], [3], [4, 5]]\` into \`[1, 2, 3, 4, 5]\`. \`reduce\` + \`concat\`
merges each sub-array into an accumulator.

## Your task
Write \`flatten(arr)\` that flattens an array of arrays by **one** level.`,
      starterCode: `function flatten(arr) {
  // merge each sub-array into one flat array
}
`,
      solution: `function flatten(arr) {
  return arr.reduce((acc, sub) => acc.concat(sub), []);
}`,
      tests: [
        { name: "basic", code: `assertEquals(flatten([[1, 2], [3], [4, 5]]), [1, 2, 3, 4, 5]);` },
        { name: "with empties", code: `assertEquals(flatten([[1], [], [2]]), [1, 2]);` },
        { name: "empty", code: `assertEquals(flatten([]), []);` },
      ],
    },
    {
      slug: "most-frequent",
      title: "Most Frequent Element",
      blurb: "Tally with a lookup object.",
      xp: 40,
      content: `# Most Frequent Element

Find the value that appears most often. Tally counts in an object as you go, and
track the current leader.

## Your task
Write \`mostFrequent(arr)\` returning the element that appears most often. The
input always has at least one element; if there's a tie, return the one that
reached the top count first.`,
      starterCode: `function mostFrequent(arr) {
  // tally counts, return the most common element
}
`,
      solution: `function mostFrequent(arr) {
  const counts = {};
  let best = arr[0];
  let bestCount = 0;
  for (const x of arr) {
    counts[x] = (counts[x] || 0) + 1;
    if (counts[x] > bestCount) {
      bestCount = counts[x];
      best = x;
    }
  }
  return best;
}`,
      tests: [
        { name: "numbers", code: `assertEquals(mostFrequent([1, 2, 2, 3, 2]), 2);` },
        { name: "strings", code: `assertEquals(mostFrequent(["a", "b", "a"]), "a");` },
        { name: "single", code: `assertEquals(mostFrequent([7]), 7);` },
      ],
    },
  ],
};
