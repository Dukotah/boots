import type { Module } from "./types";

// Sliding Window Patterns — fixed and variable window techniques for array/string problems.
// Auto-graded in-browser via Web Worker (language: "js").
export const slidingWindow: Module = {
  slug: "sliding-window",
  title: "Sliding Window Patterns",
  description:
    "Master fixed and variable sliding window techniques — the interview pattern that turns O(n²) brute-force solutions into elegant O(n) passes through arrays and strings.",
  emoji: "🪟",
  gradient: "from-orange-400/20 to-amber-500/10",
  tagline:
    "Learn sliding window patterns in JavaScript: fixed window, variable window, frequency maps, and classic interview problems.",
  keywords: [
    "sliding window algorithm",
    "sliding window javascript",
    "sliding window interview",
    "fixed window array",
    "variable window string",
    "two pointers sliding window",
    "maximum subarray sum",
    "longest substring without repeating",
  ],
  lessons: [
    {
      slug: "what-is-sliding-window",
      title: "What Is the Sliding Window Pattern?",
      blurb: "Turn O(n²) brute force into an O(n) single pass.",
      xp: 20,
      kind: "quiz",
      content: `# What Is the Sliding Window Pattern?

Imagine you need to find the **maximum sum of any 3 consecutive numbers** in an
array like \`[2, 1, 5, 1, 3, 2]\`.

**Brute force:** test every possible 3-element window — O(n²) or worse.

**Sliding window:** maintain a running total. When the window moves right,
**add the new element** on the right and **subtract the element that fell off**
the left. One pass — O(n).

\`\`\`
[2, 1, 5, 1, 3, 2]
 ↑_↑_↑             window sum = 8
    ↑_↑_↑           slide: +1 -2 = 7
       ↑_↑_↑        slide: +3 -1 = 9  ← max
          ↑_↑_↑     slide: +2 -5 = 6
\`\`\`

## Two flavours

| Type | Window size | Pointer movement |
|------|-------------|------------------|
| **Fixed** | Constant \`k\` | Right expands, left always trails by \`k\` |
| **Variable** | Grows/shrinks | Right expands to find a valid window; left shrinks when the window is invalid |

Sliding window is the highest-frequency interview topic after two pointers —
and the two patterns often combine.`,
      questions: [
        {
          prompt:
            "Why is the sliding window pattern faster than brute-force for subarray problems?",
          options: [
            "It uses recursion, which is always faster",
            "It reuses work from the previous window instead of recomputing from scratch",
            "It sorts the array first, reducing comparisons",
          ],
          answer: 1,
          explanation:
            "By adding the incoming element and subtracting the outgoing one, each window computation is O(1), giving an overall O(n) pass instead of O(n²).",
        },
        {
          prompt:
            "You need the longest substring where every character appears at most twice. Which window type fits best?",
          options: [
            "Fixed window — the size is constant",
            "Variable window — size expands and shrinks based on a condition",
            "Neither — this needs a hash table, not a window",
          ],
          answer: 1,
          explanation:
            "The constraint changes as you move through the string, so the window must grow and shrink dynamically — that's the variable window pattern.",
        },
        {
          prompt: "In a fixed window of size k, when you slide one step right:",
          options: [
            "You add the new right element and subtract the element that just left the window",
            "You recompute the entire window sum from scratch",
            "You add the new right element only; the left pointer never moves",
          ],
          answer: 0,
          explanation:
            "The key insight: subtract the element at index (right - k) and add the element at the new right index. That makes each slide O(1).",
        },
      ],
    },
    {
      slug: "max-subarray-sum-fixed",
      title: "Max Sum of k Consecutive Elements",
      blurb: "Fixed window: slide across the array in O(n) time.",
      xp: 30,
      content: `# Max Sum of k Consecutive Elements

Given an array \`nums\` and an integer \`k\`, return the **maximum sum** of any
\`k\` consecutive elements.

## Strategy (fixed window)

1. Compute the sum of the first \`k\` elements — that's your initial window.
2. Slide right: add \`nums[i]\`, subtract \`nums[i - k]\`.
3. Track the running maximum.

\`\`\`js
// Example: nums = [2, 1, 5, 1, 3, 2], k = 3
// Window sums:  8, 7, 9, 6  →  max = 9
\`\`\`

## Your task
Write \`maxWindowSum(nums, k)\` that returns the maximum sum of any contiguous
subarray of length \`k\`. Return \`0\` if the array has fewer than \`k\` elements.`,
      starterCode: `function maxWindowSum(nums, k) {
  // TODO: use a fixed sliding window of size k
}
`,
      solution: `function maxWindowSum(nums, k) {
  if (nums.length < k) return 0;

  // Build the first window
  let windowSum = 0;
  for (let i = 0; i < k; i++) {
    windowSum += nums[i];
  }

  let maxSum = windowSum;

  // Slide the window
  for (let i = k; i < nums.length; i++) {
    windowSum += nums[i] - nums[i - k];
    if (windowSum > maxSum) maxSum = windowSum;
  }

  return maxSum;
}`,
      tests: [
        {
          name: "basic example — max is 9",
          code: `assertEquals(maxWindowSum([2,1,5,1,3,2], 3), 9);`,
        },
        {
          name: "window fills entire array",
          code: `assertEquals(maxWindowSum([4,2,1], 3), 7);`,
        },
        {
          name: "k larger than array returns 0",
          code: `assertEquals(maxWindowSum([1,2], 5), 0);`,
        },
        {
          name: "all negative numbers",
          code: `assertEquals(maxWindowSum([-3,-1,-2,-4], 2), -3);`,
        },
        {
          name: "k === 1 returns max element",
          code: `assertEquals(maxWindowSum([3,7,2,9,1], 1), 9);`,
        },
      ],
      hints: [
        "Start by computing the sum of just the first k elements before the loop.",
        "For each position i from k onward: add nums[i] and subtract nums[i - k].",
      ],
      explanation: `**Why this works:** Instead of summing k elements fresh for each window (O(k) per step), we do one O(1) adjustment per step — add the element entering the window on the right, subtract the one falling off the left. Total: O(n).`,
    },
    {
      slug: "sliding-window-average",
      title: "Sliding Window Averages",
      blurb: "Produce a new array of rolling averages from a fixed window.",
      xp: 30,
      content: `# Sliding Window Averages

Return an array of the **average** of each contiguous window of size \`k\`.

\`\`\`js
// nums = [1, 3, 2, 6, -1, 4, 1, 8, 2], k = 5
// windows: [1,3,2,6,-1] → 2.2
//          [3,2,6,-1,4]  → 2.8
//          [2,6,-1,4,1]  → 2.4
//          [6,-1,4,1,8]  → 3.6
//          [-1,4,1,8,2]  → 2.8
// result: [2.2, 2.8, 2.4, 3.6, 2.8]
\`\`\`

The output array has **\`nums.length - k + 1\`** entries.

## Your task
Write \`slidingAverages(nums, k)\` that returns the array of window averages.
Return an empty array if the array has fewer than \`k\` elements.`,
      starterCode: `function slidingAverages(nums, k) {
  // TODO: return array of averages for each window of size k
}
`,
      solution: `function slidingAverages(nums, k) {
  if (nums.length < k) return [];

  const result = [];
  let windowSum = 0;

  // Build the first window
  for (let i = 0; i < k; i++) {
    windowSum += nums[i];
  }
  result.push(windowSum / k);

  // Slide
  for (let i = k; i < nums.length; i++) {
    windowSum += nums[i] - nums[i - k];
    result.push(windowSum / k);
  }

  return result;
}`,
      tests: [
        {
          name: "5-element window on 9-element array",
          code: `const res = slidingAverages([1,3,2,6,-1,4,1,8,2], 5);
assertEquals(res.length, 5);
assertEquals(Math.round(res[0] * 10) / 10, 2.2);
assertEquals(Math.round(res[3] * 10) / 10, 3.6);`,
        },
        {
          name: "k equals array length",
          code: `const res = slidingAverages([1,2,3,4], 4);
assertEquals(res.length, 1);
assertEquals(res[0], 2.5);`,
        },
        {
          name: "k larger than array returns empty array",
          code: `assertEquals(JSON.stringify(slidingAverages([1,2], 5)), JSON.stringify([]));`,
        },
        {
          name: "k === 1 returns a copy of the array as floats",
          code: `assertEquals(JSON.stringify(slidingAverages([4,5,6], 1)), JSON.stringify([4,5,6]));`,
        },
      ],
      hints: [
        "Reuse the fixed-window sum trick from the previous lesson — just divide by k before pushing.",
        "The result array should have nums.length - k + 1 entries.",
      ],
    },
    {
      slug: "longest-no-repeat",
      title: "Longest Substring Without Repeating Characters",
      blurb: "Variable window: expand right, shrink left when a duplicate appears.",
      xp: 40,
      content: `# Longest Substring Without Repeating Characters

This is one of the most common sliding window interview problems (LeetCode #3).

**Goal:** given a string \`s\`, return the **length** of the longest substring
that contains no duplicate characters.

\`\`\`
s = "abcabcbb"
     ^^^         "abc" length 3
         ^        'a' duplicates — shrink left until no dup
\`\`\`

## Variable window pattern

- Use a \`Set\` to track which characters are in the current window.
- **Right pointer** moves one step each iteration (expand).
- When \`s[right]\` is already in the set, **move left forward** until the
  duplicate is removed.
- Track the maximum window size seen.

## Your task
Write \`lengthOfLongestSubstring(s)\`.`,
      starterCode: `function lengthOfLongestSubstring(s) {
  // TODO: variable sliding window with a Set
}
`,
      solution: `function lengthOfLongestSubstring(s) {
  const seen = new Set();
  let left = 0;
  let maxLen = 0;

  for (let right = 0; right < s.length; right++) {
    // Shrink from the left until the duplicate is gone
    while (seen.has(s[right])) {
      seen.delete(s[left]);
      left++;
    }
    seen.add(s[right]);
    const windowSize = right - left + 1;
    if (windowSize > maxLen) maxLen = windowSize;
  }

  return maxLen;
}`,
      tests: [
        {
          name: '"abcabcbb" → 3',
          code: `assertEquals(lengthOfLongestSubstring("abcabcbb"), 3);`,
        },
        {
          name: '"bbbbb" → 1',
          code: `assertEquals(lengthOfLongestSubstring("bbbbb"), 1);`,
        },
        {
          name: '"pwwkew" → 3',
          code: `assertEquals(lengthOfLongestSubstring("pwwkew"), 3);`,
        },
        {
          name: "empty string → 0",
          code: `assertEquals(lengthOfLongestSubstring(""), 0);`,
        },
        {
          name: "all unique → full length",
          code: `assertEquals(lengthOfLongestSubstring("abcdef"), 6);`,
        },
      ],
      hints: [
        "Use a Set to track what's inside the current window.",
        "When s[right] is already in the Set, remove s[left] and increment left — repeat until the duplicate is gone.",
        "Window size at any point is right - left + 1.",
      ],
      explanation: `**Why O(n):** each character is added to the set once and removed at most once — so the total work across all window adjustments is O(n), not O(n²).`,
    },
    {
      slug: "min-subarray-sum",
      title: "Minimum Size Subarray Sum",
      blurb: "Variable window: find the shortest subarray whose sum meets a target.",
      xp: 40,
      content: `# Minimum Size Subarray Sum

Given an array of **positive integers** \`nums\` and a target \`target\`, return
the **minimum length** of a contiguous subarray whose sum is ≥ \`target\`.
Return \`0\` if no such subarray exists.

\`\`\`
nums = [2,3,1,2,4,3], target = 7
Subarray [4,3] has sum 7 and length 2 — the shortest.
\`\`\`

## Variable window strategy

Because all values are positive, growing the window always increases the sum
and shrinking it always decreases the sum.

1. Expand \`right\` one step at a time, adding \`nums[right]\` to \`windowSum\`.
2. While \`windowSum >= target\`, record the window length, then shrink from
   the left (subtract \`nums[left]\`, advance \`left\`).
3. Keep track of the minimum length seen.

## Your task
Write \`minSubarrayLen(target, nums)\`.`,
      starterCode: `function minSubarrayLen(target, nums) {
  // TODO: variable sliding window — expand right, shrink left when sum >= target
}
`,
      solution: `function minSubarrayLen(target, nums) {
  let left = 0;
  let windowSum = 0;
  let minLen = Infinity;

  for (let right = 0; right < nums.length; right++) {
    windowSum += nums[right];

    while (windowSum >= target) {
      const len = right - left + 1;
      if (len < minLen) minLen = len;
      windowSum -= nums[left];
      left++;
    }
  }

  return minLen === Infinity ? 0 : minLen;
}`,
      tests: [
        {
          name: "[2,3,1,2,4,3] target 7 → 2",
          code: `assertEquals(minSubarrayLen(7, [2,3,1,2,4,3]), 2);`,
        },
        {
          name: "[1,4,4] target 4 → 1",
          code: `assertEquals(minSubarrayLen(4, [1,4,4]), 1);`,
        },
        {
          name: "[1,1,1,1,1,1,1] target 11 → 0 (impossible)",
          code: `assertEquals(minSubarrayLen(11, [1,1,1,1,1,1,1]), 0);`,
        },
        {
          name: "single element equals target → 1",
          code: `assertEquals(minSubarrayLen(5, [5]), 1);`,
        },
        {
          name: "entire array needed",
          code: `assertEquals(minSubarrayLen(15, [1,2,3,4,5]), 5);`,
        },
      ],
      hints: [
        "Initialize minLen to Infinity so any valid window beats it.",
        "The inner while loop shrinks the window as long as the sum is still >= target — each shrink is a potential new minimum.",
        "Return 0 at the end if minLen is still Infinity (no valid window found).",
      ],
    },
    {
      slug: "count-anagrams",
      title: "Count Anagram Occurrences",
      blurb: "Fixed window with a frequency map to match character counts.",
      xp: 45,
      content: `# Count Anagram Occurrences

Given strings \`s\` and \`p\`, return the **number of positions** in \`s\` where a
substring of length \`p.length\` is an anagram of \`p\`.

An anagram has the same characters in any order.

\`\`\`
s = "cbaebabacd", p = "abc"
Anagram windows start at index 0 ("cba") and index 6 ("bac") → result: 2
\`\`\`

## Strategy

Use a **frequency map** (object keyed by character).  Build a map for \`p\` and
a sliding map for the current window of size \`p.length\` in \`s\`.

Two frequency maps match when every character count is equal.  Maintain a
counter \`matches\` (how many distinct characters currently have equal counts)
to avoid comparing the whole map each step.

\`\`\`
matches starts at the number of unique chars in p.
When a character's count in the window becomes equal to p's count: matches++
When it was equal and now differs: matches--
Window is an anagram when matches === unique chars in p.
\`\`\`

## Your task
Write \`countAnagramOccurrences(s, p)\`.`,
      starterCode: `function countAnagramOccurrences(s, p) {
  // TODO: fixed window of size p.length, frequency map, matches counter
}
`,
      solution: `function countAnagramOccurrences(s, p) {
  if (p.length > s.length) return 0;

  const k = p.length;
  const pFreq = {};
  const wFreq = {};

  // Build frequency map for p and the first window
  for (let i = 0; i < k; i++) {
    pFreq[p[i]] = (pFreq[p[i]] || 0) + 1;
    wFreq[s[i]] = (wFreq[s[i]] || 0) + 1;
  }

  // Count how many distinct chars in p have matching window counts
  const uniqueInP = Object.keys(pFreq).length;
  let matches = 0;
  for (const ch of Object.keys(pFreq)) {
    if (wFreq[ch] === pFreq[ch]) matches++;
  }

  let count = matches === uniqueInP ? 1 : 0;

  // Slide
  for (let right = k; right < s.length; right++) {
    const incoming = s[right];
    const outgoing = s[right - k];

    // Add incoming character
    wFreq[incoming] = (wFreq[incoming] || 0) + 1;
    if (pFreq[incoming] !== undefined) {
      if (wFreq[incoming] === pFreq[incoming]) matches++;
      else if (wFreq[incoming] === pFreq[incoming] + 1) matches--;
    }

    // Remove outgoing character
    wFreq[outgoing]--;
    if (pFreq[outgoing] !== undefined) {
      if (wFreq[outgoing] === pFreq[outgoing]) matches++;
      else if (wFreq[outgoing] === pFreq[outgoing] - 1) matches--;
    }

    if (matches === uniqueInP) count++;
  }

  return count;
}`,
      tests: [
        {
          name: '"cbaebabacd", "abc" → 2',
          code: `assertEquals(countAnagramOccurrences("cbaebabacd", "abc"), 2);`,
        },
        {
          name: '"abab", "ab" → 3',
          code: `assertEquals(countAnagramOccurrences("abab", "ab"), 3);`,
        },
        {
          name: "p longer than s → 0",
          code: `assertEquals(countAnagramOccurrences("ab", "abcd"), 0);`,
        },
        {
          name: "identical strings → 1",
          code: `assertEquals(countAnagramOccurrences("abc", "abc"), 1);`,
        },
        {
          name: "no anagram → 0",
          code: `assertEquals(countAnagramOccurrences("zzz", "abc"), 0);`,
        },
      ],
      hints: [
        "Build frequency maps for p and for the first window of size p.length in s.",
        "Track 'matches' — the count of characters whose frequency in the window equals their frequency in p.",
        "When matches equals the number of unique characters in p, the window is an anagram.",
      ],
      explanation: `**Key insight:** Comparing two full frequency maps every step would be O(26·n). The \`matches\` counter lets you track the difference in O(1) per slide — you only update the two characters that changed (the one entering and the one leaving).`,
    },
    {
      slug: "max-ones-with-k-flips",
      title: "Max Consecutive 1s with K Flips",
      blurb: "Variable window: allow up to k zeros inside the window.",
      xp: 45,
      content: `# Max Consecutive 1s with K Flips

Given a binary array \`nums\` and an integer \`k\`, return the **maximum number
of consecutive 1s** you can achieve if you may flip at most \`k\` zeros to ones.

\`\`\`
nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2
                                    ↑ flip
                    ↑ flip
→ longest window of 1s (with ≤ 2 flips): [0,0,0,1,1,1,1,0] → length 6
\`\`\`

## Variable window strategy

- Maintain a count of zeros inside the window.
- Expand \`right\` each step; if \`nums[right] === 0\`, increment the zero count.
- While the zero count exceeds \`k\`, shrink from the left.
- The answer is the maximum window size seen.

## Your task
Write \`maxOnesWithFlips(nums, k)\`.`,
      starterCode: `function maxOnesWithFlips(nums, k) {
  // TODO: variable window, track zeroCount inside the window
}
`,
      solution: `function maxOnesWithFlips(nums, k) {
  let left = 0;
  let zeroCount = 0;
  let maxLen = 0;

  for (let right = 0; right < nums.length; right++) {
    if (nums[right] === 0) zeroCount++;

    while (zeroCount > k) {
      if (nums[left] === 0) zeroCount--;
      left++;
    }

    const windowSize = right - left + 1;
    if (windowSize > maxLen) maxLen = windowSize;
  }

  return maxLen;
}`,
      tests: [
        {
          name: "[1,1,1,0,0,0,1,1,1,1,0] k=2 → 6",
          code: `assertEquals(maxOnesWithFlips([1,1,1,0,0,0,1,1,1,1,0], 2), 6);`,
        },
        {
          name: "[0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1] k=3 → 10",
          code: `assertEquals(maxOnesWithFlips([0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], 3), 10);`,
        },
        {
          name: "k=0 — no flips allowed",
          code: `assertEquals(maxOnesWithFlips([1,0,1,1,0,1], 0), 2);`,
        },
        {
          name: "all ones — k irrelevant",
          code: `assertEquals(maxOnesWithFlips([1,1,1,1], 1), 4);`,
        },
        {
          name: "k covers entire array",
          code: `assertEquals(maxOnesWithFlips([0,0,0], 3), 3);`,
        },
      ],
      hints: [
        "Count zeros inside the window with a variable zeroCount.",
        "If zeroCount > k, the window is invalid — shrink from the left.",
        "When shrinking, only decrement zeroCount if the element you're removing was a 0.",
      ],
    },
    {
      slug: "minimum-window-substring",
      title: "Minimum Window Substring",
      blurb: "Hard: find the smallest window in s that contains all chars of t.",
      xp: 50,
      content: `# Minimum Window Substring

**Hard.** Given strings \`s\` and \`t\`, return the **shortest substring of \`s\`**
that contains every character in \`t\` (including duplicates).
Return \`""\` if no such substring exists.

\`\`\`
s = "ADOBECODEBANC", t = "ABC"
→ "BANC"  (length 4 — the shortest window containing A, B, and C)
\`\`\`

## Strategy

This combines the **frequency map + matches counter** technique from the
anagram lesson with a **variable window**.

1. Build a frequency map for \`t\`.
2. Expand \`right\` until the window is **valid** (contains all of \`t\`).
3. Once valid, try to **shrink from the left** to minimise the window.
   Record the window if it beats the current best.
4. When shrinking makes the window invalid again, resume expanding.

Use a \`formed\` counter: increment when a character's window frequency
reaches the required frequency; decrement when it drops below.
Valid window: \`formed === required\` (number of unique chars in \`t\`).

## Your task
Write \`minWindowSubstring(s, t)\`.`,
      starterCode: `function minWindowSubstring(s, t) {
  // TODO: variable window + frequency maps
  // Return "" if no valid window exists
}
`,
      solution: `function minWindowSubstring(s, t) {
  if (s.length === 0 || t.length === 0) return "";

  const tFreq = {};
  for (const ch of t) {
    tFreq[ch] = (tFreq[ch] || 0) + 1;
  }

  const required = Object.keys(tFreq).length;
  let formed = 0;
  const wFreq = {};

  let left = 0;
  let bestLen = Infinity;
  let bestLeft = 0;

  for (let right = 0; right < s.length; right++) {
    const ch = s[right];
    wFreq[ch] = (wFreq[ch] || 0) + 1;

    if (tFreq[ch] !== undefined && wFreq[ch] === tFreq[ch]) {
      formed++;
    }

    // Window is valid — try to shrink
    while (formed === required) {
      const windowLen = right - left + 1;
      if (windowLen < bestLen) {
        bestLen = windowLen;
        bestLeft = left;
      }

      const leftCh = s[left];
      wFreq[leftCh]--;
      if (tFreq[leftCh] !== undefined && wFreq[leftCh] < tFreq[leftCh]) {
        formed--;
      }
      left++;
    }
  }

  return bestLen === Infinity ? "" : s.substring(bestLeft, bestLeft + bestLen);
}`,
      tests: [
        {
          name: '"ADOBECODEBANC", "ABC" → "BANC"',
          code: `assertEquals(minWindowSubstring("ADOBECODEBANC", "ABC"), "BANC");`,
        },
        {
          name: '"a", "a" → "a"',
          code: `assertEquals(minWindowSubstring("a", "a"), "a");`,
        },
        {
          name: '"a", "aa" → "" (not enough chars)',
          code: `assertEquals(minWindowSubstring("a", "aa"), "");`,
        },
        {
          name: "t not in s → empty string",
          code: `assertEquals(minWindowSubstring("abc", "xyz"), "");`,
        },
        {
          name: "duplicate chars in t handled correctly",
          code: `assertEquals(minWindowSubstring("aab", "aab"), "aab");`,
        },
        {
          name: "returns smallest of two valid windows",
          code: `assertEquals(minWindowSubstring("AABC", "ABC"), "ABC");`,
        },
      ],
      hints: [
        "Build a frequency map for t. Use 'required' = number of unique chars in t.",
        "Increment 'formed' only when a character's window count exactly reaches its required count.",
        "When formed === required, shrink from the left, recording the best window before each shrink.",
        "Decrement 'formed' when shrinking causes a character count to drop below its required count.",
      ],
      explanation: `**Time complexity: O(|s| + |t|).** Each character in s is added once and removed at most once — so the total pointer movements are O(|s|). Building the t frequency map is O(|t|). The \`formed\` counter prevents rescanning the whole map each step.`,
    },
  ],
};
