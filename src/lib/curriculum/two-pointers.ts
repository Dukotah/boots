import type { Module } from "./types";

// Two Pointers & Sliding Window — the two patterns that turn O(n²) brute force
// into clean O(n) solutions. Interview bread and butter. Auto-graded in-browser.
export const twoPointers: Module = {
  slug: "two-pointers",
  title: "Two Pointers & Sliding Window",
  description:
    "Two of the highest-leverage interview patterns. Walk an array from both ends, or slide a window across it, to solve in one pass what brute force does in many.",
  emoji: "👉",
  gradient: "from-orange-400/20 to-red-500/10",
  tagline:
    "Learn the two pointers and sliding window patterns: pair sums, in-place reversal, palindromes, max subarray, and longest unique substring.",
  keywords: ["two pointers", "sliding window", "coding interview patterns", "longest substring"],
  lessons: [
    {
      slug: "pair-sum",
      title: "Pair Sum (Sorted)",
      blurb: "Close in from both ends.",
      xp: 40,
      content: `# Pair Sum (Sorted)

In a **sorted** array, start one pointer at each end. If the pair sums too low,
move the left pointer up; too high, move the right pointer down. One pass, no
nested loop.

## Your task
Write \`pairSum(nums, target)\` (nums is sorted ascending) that returns the
\`[lowIndex, highIndex]\` of two numbers that add up to \`target\`, or \`null\` if
none exist.`,
      starterCode: `function pairSum(nums, target) {
  // two pointers from both ends; return [i, j] or null
}
`,
      solution: `function pairSum(nums, target) {
  let lo = 0;
  let hi = nums.length - 1;
  while (lo < hi) {
    const sum = nums[lo] + nums[hi];
    if (sum === target) return [lo, hi];
    if (sum < target) lo++;
    else hi--;
  }
  return null;
}`,
      tests: [
        { name: "finds the pair", code: `assertEquals(pairSum([1, 2, 3, 4, 6], 6), [1, 3]);` },
        { name: "first and last", code: `assertEquals(pairSum([2, 3, 4], 6), [0, 2]);` },
        { name: "no pair → null", code: `assertEquals(pairSum([1, 2], 10), null);` },
      ],
    },
    {
      slug: "reverse-in-place",
      title: "Reverse In Place",
      blurb: "Swap from the outside in.",
      xp: 35,
      content: `# Reverse In Place

Swap the outermost elements, then step both pointers inward until they meet. No
extra array needed.

## Your task
Write \`reverseInPlace(arr)\` that reverses \`arr\` **in place** (mutating it) and
returns it.`,
      starterCode: `function reverseInPlace(arr) {
  // swap with two pointers, then return arr
}
`,
      solution: `function reverseInPlace(arr) {
  let lo = 0;
  let hi = arr.length - 1;
  while (lo < hi) {
    const tmp = arr[lo];
    arr[lo] = arr[hi];
    arr[hi] = tmp;
    lo++;
    hi--;
  }
  return arr;
}`,
      tests: [
        { name: "odd length", code: `assertEquals(reverseInPlace([1, 2, 3]), [3, 2, 1]);` },
        { name: "even length", code: `assertEquals(reverseInPlace([1, 2, 3, 4]), [4, 3, 2, 1]);` },
      ],
    },
    {
      slug: "palindrome-check",
      title: "Palindrome Check",
      blurb: "Compare ends moving inward.",
      xp: 35,
      content: `# Palindrome Check

A palindrome reads the same forwards and backwards. Compare the characters at
both pointers; if any pair differs, it's not a palindrome.

## Your task
Write \`isPalindrome(s)\` using two pointers. An empty string is a palindrome.`,
      starterCode: `function isPalindrome(s) {
  // two pointers comparing characters
}
`,
      solution: `function isPalindrome(s) {
  let lo = 0;
  let hi = s.length - 1;
  while (lo < hi) {
    if (s[lo] !== s[hi]) return false;
    lo++;
    hi--;
  }
  return true;
}`,
      tests: [
        { name: '"racecar" → true', code: `assertEquals(isPalindrome("racecar"), true);` },
        { name: '"hello" → false', code: `assertEquals(isPalindrome("hello"), false);` },
        { name: "empty → true", code: `assertEquals(isPalindrome(""), true);` },
      ],
    },
    {
      slug: "max-window-sum",
      title: "Max Window Sum",
      blurb: "Slide a fixed-size window.",
      xp: 45,
      content: `# Max Window Sum

To find the largest sum of \`k\` consecutive numbers, compute the first window,
then **slide**: add the entering element and subtract the leaving one. O(n)
instead of O(n·k).

## Your task
Write \`maxWindowSum(nums, k)\` returning the maximum sum of any \`k\` consecutive
elements.`,
      starterCode: `function maxWindowSum(nums, k) {
  // sum the first window, then slide it across
}
`,
      solution: `function maxWindowSum(nums, k) {
  let sum = 0;
  for (let i = 0; i < k; i++) sum += nums[i];
  let best = sum;
  for (let i = k; i < nums.length; i++) {
    sum += nums[i] - nums[i - k];
    best = Math.max(best, sum);
  }
  return best;
}`,
      tests: [
        { name: "window of 3", code: `assertEquals(maxWindowSum([2, 1, 5, 1, 3, 2], 3), 9);` },
        { name: "window of 1", code: `assertEquals(maxWindowSum([1, 4, 2], 1), 4);` },
      ],
    },
    {
      slug: "longest-unique",
      title: "Longest Unique Substring",
      blurb: "A window that grows and shrinks.",
      xp: 50,
      content: `# Longest Unique Substring

A **variable** sliding window: expand the right edge, and when you hit a repeat,
shrink from the left until the window has unique characters again. Track the best
length seen.

## Your task
Write \`longestUnique(s)\` returning the length of the longest substring with no
repeating characters.`,
      starterCode: `function longestUnique(s) {
  // grow/shrink a window of unique characters
}
`,
      solution: `function longestUnique(s) {
  const seen = new Set();
  let lo = 0;
  let best = 0;
  for (let hi = 0; hi < s.length; hi++) {
    while (seen.has(s[hi])) {
      seen.delete(s[lo]);
      lo++;
    }
    seen.add(s[hi]);
    best = Math.max(best, hi - lo + 1);
  }
  return best;
}`,
      tests: [
        { name: '"abcabcbb" → 3', code: `assertEquals(longestUnique("abcabcbb"), 3);` },
        { name: '"bbbb" → 1', code: `assertEquals(longestUnique("bbbb"), 1);` },
        { name: '"pwwkew" → 3', code: `assertEquals(longestUnique("pwwkew"), 3);` },
        { name: "empty → 0", code: `assertEquals(longestUnique(""), 0);` },
      ],
    },
  ],
};
