import type { Module } from "./types";

// Big-O & Complexity Analysis — measure, classify, and predict algorithmic growth.
// Auto-graded in-browser via Web Worker (language: "js").
export const bigOComplexity: Module = {
  slug: "big-o-complexity",
  title: "Big-O & Complexity Analysis",
  description:
    "Stop guessing whether your code is fast enough. Learn to classify algorithms by growth rate — O(1), O(log n), O(n), O(n log n), O(n²) — then measure, predict, and choose the right approach at interview time.",
  emoji: "📈",
  gradient: "from-violet-400/20 to-indigo-500/10",
  tagline:
    "Learn Big-O notation: classify algorithm complexity, measure runtime growth, and write efficient JavaScript code for technical interviews.",
  keywords: [
    "big o notation",
    "time complexity",
    "space complexity",
    "algorithm analysis",
    "javascript algorithms",
    "technical interview prep",
    "O(n) O(log n) O(n squared)",
  ],
  language: "js",
  lessons: [
    // ── Lesson 1 ── What is Big-O? (quiz)
    {
      slug: "what-is-big-o",
      title: "What Is Big-O Notation?",
      blurb: "A vocabulary for describing how algorithms scale.",
      xp: 20,
      kind: "quiz",
      content: `# What Is Big-O Notation?

When code runs slowly, the culprit is usually **how it scales** — not the constant
overhead, but how the work grows as the input grows.

**Big-O notation** is a mathematical shorthand that answers:
> "If the input size doubles, how does the runtime (or memory) change?"

We always describe the **worst-case** behaviour and drop constants and
lower-order terms.  So \`3n² + 5n + 7\` simplifies to **O(n²)**.

## The most common classes (fastest → slowest)

| Class | Name | Doubles input → |
|---|---|---|
| O(1) | Constant | No change |
| O(log n) | Logarithmic | +1 step |
| O(n) | Linear | Double work |
| O(n log n) | Linearithmic | Just over double |
| O(n²) | Quadratic | 4× work |
| O(2ⁿ) | Exponential | Explodes |

The key insight: **O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ)**

Big-O ignores hardware, language, and small constants — it captures the
*shape* of growth that dominates at scale.`,
      questions: [
        {
          prompt:
            "What does Big-O notation primarily describe?",
          options: [
            "The exact number of milliseconds a function takes",
            "How the runtime or memory usage grows relative to input size",
            "Whether a function has bugs",
          ],
          answer: 1,
          explanation:
            "Big-O expresses the growth rate — how much more work is done as input scales — not a precise wall-clock time.",
        },
        {
          prompt:
            "You have an expression `4n² + 100n + 500`. What is its Big-O class?",
          options: ["O(4n²)", "O(n² + n)", "O(n²)"],
          answer: 2,
          explanation:
            "We drop constants (4) and lower-order terms (100n + 500). The dominant term is n², so the class is O(n²).",
        },
        {
          prompt: "Rank these from fastest to slowest: O(n²), O(log n), O(n), O(1)",
          options: [
            "O(1) < O(log n) < O(n) < O(n²)",
            "O(log n) < O(1) < O(n) < O(n²)",
            "O(n) < O(1) < O(log n) < O(n²)",
          ],
          answer: 0,
          explanation:
            "O(1) is constant (best), O(log n) grows slowly, O(n) is linear, and O(n²) grows quadratically (worst of the four).",
        },
        {
          prompt:
            "Why does Big-O drop constant factors like the '3' in `3n`?",
          options: [
            "Constants only matter on slow hardware",
            "At large n the growth shape dominates; constants become negligible",
            "Mathematicians just prefer simpler expressions",
          ],
          answer: 1,
          explanation:
            "When n is huge, multiplying by 3 is irrelevant compared to whether the algorithm is O(n) vs O(n²). Big-O focuses on the growth shape.",
        },
      ],
    },

    // ── Lesson 2 ── O(1) Constant Time
    {
      slug: "constant-time",
      title: "O(1) — Constant Time",
      blurb: "Operations that take the same time no matter the input size.",
      xp: 25,
      content: `# O(1) — Constant Time

An **O(1)** operation takes the same amount of work regardless of input size.
Array index access, hash-map lookup, and arithmetic are all O(1).

\`\`\`js
function getFirst(arr) {
  return arr[0]; // always one operation, no matter arr.length
}
\`\`\`

## Counting steps

The key: count the number of *significant operations* as a function of \`n\`.
If that count never changes as \`n\` grows, you have O(1).

\`\`\`js
function addFirstAndLast(arr) {
  const first = arr[0];       // 1 op
  const last  = arr[arr.length - 1]; // 1 op
  return first + last;        // 1 op
}
// Total: 3 ops, regardless of arr.length → O(1)
\`\`\`

## Your task

Write \`headAndTail(arr)\` that returns an object \`{ head, tail }\` where
\`head\` is the first element and \`tail\` is the last element of the array.
Your function must run in **O(1)** time (no loops allowed).`,
      starterCode: `function headAndTail(arr) {
  // Return { head: first element, tail: last element }
  // No loops — must be O(1)
}
`,
      solution: `function headAndTail(arr) {
  return { head: arr[0], tail: arr[arr.length - 1] };
}`,
      tests: [
        {
          name: "returns head and tail of [1,2,3]",
          code: `const r = headAndTail([1, 2, 3]);
assertEquals(r.head, 1);
assertEquals(r.tail, 3);`,
        },
        {
          name: "single-element array",
          code: `const r = headAndTail([42]);
assertEquals(r.head, 42);
assertEquals(r.tail, 42);`,
        },
        {
          name: "strings work too",
          code: `const r = headAndTail(["a", "b", "c", "d"]);
assertEquals(r.head, "a");
assertEquals(r.tail, "d");`,
        },
      ],
      hints: [
        "Access `arr[0]` for the head and `arr[arr.length - 1]` for the tail.",
        "Return a plain object literal: `{ head: ..., tail: ... }`.",
      ],
      explanation:
        "Indexing an array at a known position is always one operation. No matter if the array has 3 or 3 million elements, `arr[0]` and `arr[arr.length - 1]` are both O(1).",
    },

    // ── Lesson 3 ── O(n) Linear Time
    {
      slug: "linear-time",
      title: "O(n) — Linear Time",
      blurb: "One pass through the input: work grows proportionally.",
      xp: 30,
      content: `# O(n) — Linear Time

An **O(n)** algorithm visits each element a constant number of times.
A single loop over the input is the canonical example.

\`\`\`js
function sum(arr) {
  let total = 0;
  for (const n of arr) total += n; // n iterations
  return total;
}
\`\`\`

Double the input → double the work. That's linear growth.

## Recognising O(n)

- One loop over the input (or two sequential loops — still O(n), not O(2n))
- Each iteration does O(1) work

\`\`\`js
// Two sequential loops — still O(n)
function maxAndMin(arr) {
  let max = -Infinity;
  for (const n of arr) if (n > max) max = n;  // O(n)
  let min =  Infinity;
  for (const n of arr) if (n < min) min = n;  // O(n)
  return { max, min };                         // O(n) total
}
\`\`\`

## Your task

Write \`countOccurrences(arr, target)\` that returns how many times \`target\`
appears in \`arr\`.  Your solution must be **O(n)** — one pass, no built-in
\`.filter\` + \`.length\` chain allowed; use a loop and a counter.`,
      starterCode: `function countOccurrences(arr, target) {
  // Count how many times target appears in arr
  // Use a single loop — O(n)
}
`,
      solution: `function countOccurrences(arr, target) {
  let count = 0;
  for (const item of arr) {
    if (item === target) count++;
  }
  return count;
}`,
      tests: [
        {
          name: "counts a repeated element",
          code: `assertEquals(countOccurrences([1, 2, 3, 2, 2], 2), 3);`,
        },
        {
          name: "target not present returns 0",
          code: `assertEquals(countOccurrences([1, 2, 3], 9), 0);`,
        },
        {
          name: "empty array returns 0",
          code: `assertEquals(countOccurrences([], 5), 0);`,
        },
        {
          name: "all elements match",
          code: `assertEquals(countOccurrences([7, 7, 7], 7), 3);`,
        },
      ],
      hints: [
        "Create a `count` variable initialised to 0.",
        "Loop over `arr`; increment `count` whenever the current element `=== target`.",
        "Return `count` after the loop.",
      ],
      explanation:
        "A single `for...of` loop visits every element once — O(n). Each iteration does constant work (one comparison, one possible increment), so the total is proportional to the array length.",
    },

    // ── Lesson 4 ── O(n²) Quadratic Time
    {
      slug: "quadratic-time",
      title: "O(n²) — Quadratic Time",
      blurb: "Nested loops multiply — beware at scale.",
      xp: 35,
      content: `# O(n²) — Quadratic Time

When you put a loop **inside** another loop, and each loop runs \`n\` times,
you get **n × n = n²** operations total.

\`\`\`js
function allPairs(arr) {
  const pairs = [];
  for (let i = 0; i < arr.length; i++) {       // n times
    for (let j = 0; j < arr.length; j++) {     // n times per outer
      pairs.push([arr[i], arr[j]]);
    }
  }
  return pairs; // n² pairs
}
\`\`\`

Double the input → **four times** the work. At n = 10 000 that's 100 million ops.

## Why it matters

Bubble sort, selection sort, and many naïve search algorithms are O(n²).
They're fine for small data; catastrophic for large data.

## Your task

Write \`hasDuplicate(arr)\` that returns \`true\` if **any** two elements in
\`arr\` are equal, and \`false\` otherwise.

Use the **O(n²) brute-force approach**: compare every pair with nested loops.
(We'll beat it later with a Set.)`,
      starterCode: `function hasDuplicate(arr) {
  // Check every pair with two nested loops — O(n²)
  // Return true if any two elements are equal, false otherwise
}
`,
      solution: `function hasDuplicate(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) return true;
    }
  }
  return false;
}`,
      tests: [
        {
          name: "finds a duplicate",
          code: `assertEquals(hasDuplicate([1, 2, 3, 2]), true);`,
        },
        {
          name: "no duplicates returns false",
          code: `assertEquals(hasDuplicate([1, 2, 3, 4]), false);`,
        },
        {
          name: "empty array returns false",
          code: `assertEquals(hasDuplicate([]), false);`,
        },
        {
          name: "single element returns false",
          code: `assertEquals(hasDuplicate([99]), false);`,
        },
        {
          name: "all same elements",
          code: `assertEquals(hasDuplicate([5, 5, 5]), true);`,
        },
      ],
      hints: [
        "Outer loop: `for (let i = 0; i < arr.length; i++)`",
        "Inner loop starts at `j = i + 1` to avoid comparing an element with itself.",
        "If `arr[i] === arr[j]`, return `true` immediately. After both loops finish, return `false`.",
      ],
      explanation:
        "Starting `j` at `i + 1` compares each unique pair exactly once: n*(n-1)/2 comparisons. Big-O still drops constants → O(n²). Early return means best-case is O(1) but worst-case (no duplicate) is always O(n²).",
    },

    // ── Lesson 5 ── O(log n) Logarithmic Time
    {
      slug: "logarithmic-time",
      title: "O(log n) — Logarithmic Time",
      blurb: "Halving the problem each step: how binary search works.",
      xp: 40,
      content: `# O(log n) — Logarithmic Time

**Logarithmic** algorithms eliminate half the remaining candidates each step.
Binary search is the classic example.

\`\`\`
Array of 1 024 elements
Step 1 → 512 remain
Step 2 → 256 remain
...
Step 10 → 1 remains   (log₂(1024) = 10)
\`\`\`

Doubling the input adds only **one extra step**. Even for n = 1 billion,
binary search takes only ~30 comparisons.

## How binary search works

1. Compare the target with the **middle** element.
2. If equal → found it.
3. If target is smaller → discard the right half.
4. If target is larger → discard the left half.
5. Repeat until found or the range is empty.

## Your task

Write \`binarySearch(sortedArr, target)\` that returns the **index** of
\`target\` in the sorted array, or \`-1\` if not found.`,
      starterCode: `function binarySearch(sortedArr, target) {
  let lo = 0;
  let hi = sortedArr.length - 1;

  // TODO: loop while lo <= hi.
  //   const mid = Math.floor((lo + hi) / 2);
  //   compare sortedArr[mid] with target, then either return mid
  //   or move lo/hi to discard the half that can't contain target.

  return -1; // not found
}
`,
      solution: `function binarySearch(sortedArr, target) {
  let lo = 0;
  let hi = sortedArr.length - 1;

  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (sortedArr[mid] === target) return mid;
    if (sortedArr[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }

  return -1;
}`,
      tests: [
        {
          name: "finds element in middle",
          code: `assertEquals(binarySearch([1, 3, 5, 7, 9], 5), 2);`,
        },
        {
          name: "finds first element",
          code: `assertEquals(binarySearch([2, 4, 6, 8], 2), 0);`,
        },
        {
          name: "finds last element",
          code: `assertEquals(binarySearch([2, 4, 6, 8], 8), 3);`,
        },
        {
          name: "returns -1 when not found",
          code: `assertEquals(binarySearch([1, 3, 5], 4), -1);`,
        },
        {
          name: "empty array returns -1",
          code: `assertEquals(binarySearch([], 1), -1);`,
        },
      ],
      hints: [
        "Calculate `mid = Math.floor((lo + hi) / 2)`.",
        "If `sortedArr[mid] === target`, return `mid`.",
        "If `sortedArr[mid] < target`, the target is in the right half: set `lo = mid + 1`.",
        "Otherwise the target is in the left half: set `hi = mid - 1`.",
      ],
      explanation:
        "Each iteration halves the search space. For an array of n elements, the loop runs at most log₂(n) times — that's O(log n). Contrast with linear search's O(n) for unsorted data.",
    },

    // ── Lesson 6 ── O(n) vs O(n²): Optimise with a Set
    {
      slug: "optimise-with-set",
      title: "O(n²) → O(n): Use a Hash Set",
      blurb: "Trade memory for speed: shrink duplicate detection from quadratic to linear.",
      xp: 40,
      content: `# O(n²) → O(n): Use a Hash Set

In the previous lesson you wrote an O(n²) duplicate checker with nested loops.
A JavaScript \`Set\` gives O(1) \`has\` and \`add\` operations, so we can do the
same check in **O(n)** — one pass.

\`\`\`js
// O(n²) — nested loops
function hasDuplicateSlow(arr) {
  for (let i = 0; i < arr.length; i++)
    for (let j = i + 1; j < arr.length; j++)
      if (arr[i] === arr[j]) return true;
  return false;
}

// O(n) — one pass with a Set
function hasDuplicateFast(arr) {
  const seen = new Set();
  for (const item of arr) {
    if (seen.has(item)) return true;
    seen.add(item);
  }
  return false;
}
\`\`\`

The trade-off: we use O(n) **extra memory** for the Set in exchange for
eliminating the inner loop.

## Your task

Write \`firstDuplicate(arr)\` that returns the **first element** that appears
more than once (in order of second occurrence), or \`null\` if there are none.
Use a \`Set\` for O(n) time.

Example: \`firstDuplicate([2, 3, 2, 1, 3])\` → \`2\` (2 is repeated first).`,
      starterCode: `function firstDuplicate(arr) {
  // Use a Set to track seen elements
  // Return the first element you see a second time, or null
}
`,
      solution: `function firstDuplicate(arr) {
  const seen = new Set();
  for (const item of arr) {
    if (seen.has(item)) return item;
    seen.add(item);
  }
  return null;
}`,
      tests: [
        {
          name: "returns first duplicate",
          code: `assertEquals(firstDuplicate([2, 3, 2, 1, 3]), 2);`,
        },
        {
          name: "no duplicates returns null",
          code: `assertEquals(firstDuplicate([1, 2, 3, 4]), null);`,
        },
        {
          name: "empty array returns null",
          code: `assertEquals(firstDuplicate([]), null);`,
        },
        {
          name: "adjacent duplicates",
          code: `assertEquals(firstDuplicate([5, 5, 1, 2]), 5);`,
        },
        {
          name: "duplicate at end",
          code: `assertEquals(firstDuplicate([1, 2, 3, 1]), 1);`,
        },
      ],
      hints: [
        "Create `const seen = new Set()` before the loop.",
        "For each `item`, check `seen.has(item)` — if true, return `item`.",
        "Otherwise call `seen.add(item)` and continue.",
        "After the loop, return `null`.",
      ],
      explanation:
        "Each `Set.has` and `Set.add` call is O(1) (amortised). The single loop runs n times, giving O(n) total. The O(n²) brute-force approach is completely replaced — same result, dramatically less work at scale.",
    },

    // ── Lesson 7 ── Space Complexity
    {
      slug: "space-complexity",
      title: "Space Complexity",
      blurb: "Big-O applies to memory too — know when you're trading space for speed.",
      xp: 35,
      content: `# Space Complexity

Big-O isn't just for time — it describes **memory** growth too.

| Extra memory used | Space complexity |
|---|---|
| A few variables (no structures) | O(1) |
| One array/set proportional to input | O(n) |
| 2D matrix of size n×n | O(n²) |

## In-place vs out-of-place

An **in-place** algorithm uses O(1) extra space (it modifies the input or uses
only a constant number of variables).  An **out-of-place** algorithm allocates
new memory proportional to the input.

\`\`\`js
// Out-of-place: O(n) space — creates a new array
function doubled(arr) {
  return arr.map((n) => n * 2);
}

// In-place: O(1) extra space — modifies the original
function doubleInPlace(arr) {
  for (let i = 0; i < arr.length; i++) arr[i] *= 2;
  return arr;
}
\`\`\`

## Your task

Write \`reverseInPlace(arr)\` that reverses the array **in place** (O(1) extra
space — no new array, no slice, no spread).  Return the same array reference.`,
      starterCode: `function reverseInPlace(arr) {
  // Reverse arr in place using only a few variables (O(1) space)
  // Swap elements from both ends toward the middle
  // Return arr
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
        {
          name: "reverses [1,2,3,4,5]",
          code: `assertEquals(JSON.stringify(reverseInPlace([1,2,3,4,5])), JSON.stringify([5,4,3,2,1]));`,
        },
        {
          name: "reverses even-length array",
          code: `assertEquals(JSON.stringify(reverseInPlace([1,2,3,4])), JSON.stringify([4,3,2,1]));`,
        },
        {
          name: "single element is unchanged",
          code: `assertEquals(JSON.stringify(reverseInPlace([7])), JSON.stringify([7]));`,
        },
        {
          name: "empty array is unchanged",
          code: `assertEquals(JSON.stringify(reverseInPlace([])), JSON.stringify([]));`,
        },
        {
          name: "returns the same array reference",
          code: `const a = [1,2,3]; const b = reverseInPlace(a); assertEquals(a, b);`,
        },
      ],
      hints: [
        "Use two pointers: `lo = 0` and `hi = arr.length - 1`.",
        "While `lo < hi`, swap `arr[lo]` and `arr[hi]`, then increment `lo` and decrement `hi`.",
        "You only need one temporary variable for the swap — that's O(1) extra space.",
      ],
      explanation:
        "Two-pointer reversal uses only `lo`, `hi`, and `tmp` — a constant number of variables regardless of input size. That's O(1) space. Time is O(n) because we touch each element once.",
    },

    // ── Lesson 8 ── Recognising Complexity in the Wild
    {
      slug: "recognise-complexity",
      title: "Classify the Complexity",
      blurb: "Given a function, name its Big-O class.",
      xp: 30,
      kind: "quiz",
      content: `# Classify the Complexity

Recognising Big-O at a glance is a core interview skill. Here are the patterns:

\`\`\`js
// O(1) — no loops, no recursion on n
function peek(arr) { return arr[0]; }

// O(log n) — halves the search space each step
function binarySearch(arr, t) { /* ... */ }

// O(n) — one loop proportional to n
function linearSearch(arr, t) {
  for (const x of arr) if (x === t) return true;
  return false;
}

// O(n log n) — divide-and-conquer sorts (merge sort, quicksort avg)
arr.sort((a, b) => a - b);

// O(n²) — nested loops both proportional to n
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++)
    for (let j = 0; j < arr.length - i - 1; j++)
      if (arr[j] > arr[j+1]) [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
}
\`\`\`

## Quick mental checklist

1. Count loop nesting levels.
2. Does any loop halve its range? → logarithmic factor.
3. Are the loops sequential or nested? Sequential → add; nested → multiply.`,
      questions: [
        {
          prompt:
            "What is the time complexity of this function?\n```js\nfunction f(arr) {\n  return arr[Math.floor(arr.length / 2)];\n}\n```",
          options: ["O(1)", "O(log n)", "O(n)"],
          answer: 0,
          explanation:
            "A single array index access is O(1). `Math.floor` and the division are also O(1). No loops involved.",
        },
        {
          prompt:
            "What is the time complexity of two **sequential** (not nested) loops each running n times?",
          options: ["O(n²)", "O(n)", "O(2n)"],
          answer: 1,
          explanation:
            "Sequential loops add: O(n) + O(n) = O(2n). We drop the constant, so it's O(n). Nested loops would multiply to O(n²).",
        },
        {
          prompt:
            "Merge sort has time complexity:",
          options: ["O(n)", "O(n log n)", "O(n²)"],
          answer: 1,
          explanation:
            "Merge sort splits the array in half repeatedly (log n levels) and merges each level in O(n) work, giving O(n log n) total.",
        },
        {
          prompt:
            "A function searches a sorted array by halving the range each step. The complexity is:",
          options: ["O(n)", "O(n²)", "O(log n)"],
          answer: 2,
          explanation:
            "Halving the search space each step is the hallmark of O(log n). Binary search is the classic example.",
        },
      ],
    },

    // ── Lesson 9 ── Two-Sum: O(n²) vs O(n)
    {
      slug: "two-sum",
      title: "Two Sum — From O(n²) to O(n)",
      blurb: "The classic interview problem, solved two ways.",
      xp: 50,
      content: `# Two Sum — From O(n²) to O(n)

**Problem:** Given an array \`nums\` and a number \`target\`, return the indices
of the two numbers that add up to \`target\`.  Assume exactly one solution exists
and you may not use the same element twice.

## Approach 1 — Brute force: O(n²)

Check every pair:

\`\`\`js
function twoSumSlow(nums, target) {
  for (let i = 0; i < nums.length; i++)
    for (let j = i + 1; j < nums.length; j++)
      if (nums[i] + nums[j] === target) return [i, j];
}
\`\`\`

## Approach 2 — Hash map: O(n)

For each number, check if its **complement** (\`target - nums[i]\`) is already
in a map:

\`\`\`js
function twoSumFast(nums, target) {
  const seen = new Map(); // value → index
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen.has(complement)) return [seen.get(complement), i];
    seen.set(nums[i], i);
  }
}
\`\`\`

One pass, O(1) map lookups — **O(n) total**.

## Your task

Implement \`twoSum(nums, target)\` using the **O(n) hash map approach**.
Return \`[i, j]\` where \`i < j\`.`,
      starterCode: `function twoSum(nums, target) {
  const seen = new Map(); // maps value → index
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    // TODO: if complement is in seen, return the two indices
    // Otherwise, record nums[i] → i in seen
  }
}
`,
      solution: `function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen.has(complement)) return [seen.get(complement), i];
    seen.set(nums[i], i);
  }
}`,
      tests: [
        {
          name: "basic case [2,7,11,15] target 9 → [0,1]",
          code: `assertEquals(JSON.stringify(twoSum([2,7,11,15], 9)), JSON.stringify([0,1]));`,
        },
        {
          name: "[3,2,4] target 6 → [1,2]",
          code: `assertEquals(JSON.stringify(twoSum([3,2,4], 6)), JSON.stringify([1,2]));`,
        },
        {
          name: "[3,3] target 6 → [0,1]",
          code: `assertEquals(JSON.stringify(twoSum([3,3], 6)), JSON.stringify([0,1]));`,
        },
        {
          name: "negative numbers [-1,-2,-3,-4,-5] target -8 → [2,4]",
          code: `assertEquals(JSON.stringify(twoSum([-1,-2,-3,-4,-5], -8)), JSON.stringify([2,4]));`,
        },
      ],
      hints: [
        "Calculate `complement = target - nums[i]` at each step.",
        "If `seen.has(complement)` is true, you found your pair: return `[seen.get(complement), i]`.",
        "Otherwise store the current number: `seen.set(nums[i], i)`.",
      ],
      explanation:
        "The Map stores each number we've seen so far. When we encounter `nums[i]`, we ask: 'Is the number I need to complete the sum already recorded?' A Map lookup is O(1), so the single loop gives O(n) overall — a massive improvement over the O(n²) brute force.",
    },
  ],
};
