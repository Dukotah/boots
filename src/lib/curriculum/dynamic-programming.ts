import type { Module } from "./types";

// Dynamic Programming — the art of trading memory for speed by remembering
// subproblem answers. Progresses from memoized recursion (top-down) to
// tabulation (bottom-up) across the classic DP problems, auto-graded in-browser.
export const dynamicProgramming: Module = {
  slug: "dynamic-programming",
  title: "Dynamic Programming",
  description:
    "Turn slow, repeated recursion into fast solutions by caching subproblem answers. Learn both memoization (top-down) and tabulation (bottom-up) through the classic DP problems.",
  emoji: "🧠",
  gradient: "from-violet-400/20 to-purple-500/10",
  tagline:
    "learn dynamic programming in JavaScript: memoization and tabulation",
  keywords: [
    "learn dynamic programming",
    "dynamic programming javascript",
    "memoization",
    "tabulation dp",
  ],
  lessons: [
    {
      slug: "memoized-fibonacci",
      title: "Memoized Fibonacci",
      blurb: "Cache subproblems to kill exponential recursion.",
      xp: 40,
      content: `# Memoized Fibonacci

Naive \`fib(n) = fib(n-1) + fib(n-2)\` recomputes the same values over and over,
which is exponentially slow. **Memoization** fixes this: keep a cache, and before
computing a result, check whether you've already stored it.

\`\`\`js
function fib(n, cache = {}) {
  if (n < 2) return n;
  if (n in cache) return cache[n];
  return (cache[n] = fib(n - 1, cache) + fib(n - 2, cache));
}
\`\`\`

## Your task
Write \`fib(n)\` that returns the nth Fibonacci number (\`fib(0) = 0\`,
\`fib(1) = 1\`). Use a cache so it stays fast for larger \`n\`.`,
      starterCode: `function fib(n) {
  // base cases: fib(0) = 0, fib(1) = 1
  // use a cache object to remember results
}
`,
      solution: `function fib(n, cache = {}) {
  if (n < 2) return n;
  if (n in cache) return cache[n];
  return (cache[n] = fib(n - 1, cache) + fib(n - 2, cache));
}`,
      tests: [
        { name: "fib(0) = 0", code: `assertEquals(fib(0), 0);` },
        { name: "fib(1) = 1", code: `assertEquals(fib(1), 1);` },
        { name: "fib(10) = 55", code: `assertEquals(fib(10), 55);` },
        { name: "fib(20) = 6765", code: `assertEquals(fib(20), 6765);` },
      ],
    },
    {
      slug: "climbing-stairs",
      title: "Climbing Stairs",
      blurb: "Count the ways up taking 1 or 2 steps.",
      xp: 45,
      content: `# Climbing Stairs

You climb a staircase of \`n\` steps, taking **1 or 2** steps at a time. How many
distinct ways can you reach the top? The ways to reach step \`i\` is the sum of the
ways to reach \`i-1\` and \`i-2\` — the same recurrence as Fibonacci.

\`\`\`js
// ways[i] = ways[i-1] + ways[i-2]
let a = 1, b = 1; // ways to reach step 0 and step 1
\`\`\`

## Your task
Write \`climbStairs(n)\` returning the number of distinct ways to reach step \`n\`.
\`climbStairs(0)\` is \`1\` (one way: stay put).`,
      starterCode: `function climbStairs(n) {
  // ways to reach a step = ways(prev) + ways(prev-prev)
}
`,
      solution: `function climbStairs(n) {
  let a = 1, b = 1;
  for (let i = 0; i < n; i++) {
    const next = a + b;
    a = b;
    b = next;
  }
  return a;
}`,
      tests: [
        { name: "n=0 → 1", code: `assertEquals(climbStairs(0), 1);` },
        { name: "n=1 → 1", code: `assertEquals(climbStairs(1), 1);` },
        { name: "n=2 → 2", code: `assertEquals(climbStairs(2), 2);` },
        { name: "n=5 → 8", code: `assertEquals(climbStairs(5), 8);` },
        { name: "n=10 → 89", code: `assertEquals(climbStairs(10), 89);` },
      ],
    },
    {
      slug: "coin-change",
      title: "Coin Change",
      blurb: "Fewest coins to make an amount.",
      xp: 55,
      content: `# Coin Change

Given coin denominations and a target \`amount\`, find the **minimum number of
coins** needed to make exactly that amount. Return \`-1\` if it's impossible.

Build a table \`dp\` where \`dp[a]\` is the fewest coins for amount \`a\`. Start with
\`dp[0] = 0\` and fill upward: for each amount, try every coin.

\`\`\`js
// dp[a] = min over coins c of dp[a - c] + 1
const dp = new Array(amount + 1).fill(Infinity);
dp[0] = 0;
\`\`\`

## Your task
Write \`coinChange(coins, amount)\` returning the minimum number of coins, or
\`-1\` if the amount can't be made.`,
      starterCode: `function coinChange(coins, amount) {
  // dp[a] = fewest coins to make amount a; dp[0] = 0
  // return -1 if unreachable
}
`,
      solution: `function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let a = 1; a <= amount; a++) {
    for (const c of coins) {
      if (c <= a && dp[a - c] + 1 < dp[a]) {
        dp[a] = dp[a - c] + 1;
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}`,
      tests: [
        { name: "[1,2,5], 11 → 3", code: `assertEquals(coinChange([1, 2, 5], 11), 3);` },
        { name: "[2], 3 → -1", code: `assertEquals(coinChange([2], 3), -1);` },
        { name: "amount 0 → 0", code: `assertEquals(coinChange([1, 2, 5], 0), 0);` },
        { name: "[1,3,4], 6 → 2", code: `assertEquals(coinChange([1, 3, 4], 6), 2);` },
      ],
    },
    {
      slug: "house-robber",
      title: "House Robber",
      blurb: "Max loot without robbing adjacent houses.",
      xp: 50,
      content: `# House Robber

Houses sit in a row, each holding some money. You can't rob two **adjacent**
houses (alarms!). Maximize your total loot.

For each house you choose: skip it (keep the previous best) or rob it (its money
plus the best up to two houses back). Track those two running bests.

\`\`\`js
// best so far = max(skip = prev, rob = prevPrev + nums[i])
let prevPrev = 0, prev = 0;
\`\`\`

## Your task
Write \`rob(nums)\` returning the maximum money you can rob. An empty array
returns \`0\`.`,
      starterCode: `function rob(nums) {
  // for each house: max(skip it, rob it + best two-back)
}
`,
      solution: `function rob(nums) {
  let prevPrev = 0, prev = 0;
  for (const money of nums) {
    const best = Math.max(prev, prevPrev + money);
    prevPrev = prev;
    prev = best;
  }
  return prev;
}`,
      tests: [
        { name: "[] → 0", code: `assertEquals(rob([]), 0);` },
        { name: "[5] → 5", code: `assertEquals(rob([5]), 5);` },
        { name: "[1,2,3,1] → 4", code: `assertEquals(rob([1, 2, 3, 1]), 4);` },
        { name: "[2,7,9,3,1] → 12", code: `assertEquals(rob([2, 7, 9, 3, 1]), 12);` },
      ],
    },
    {
      slug: "longest-common-subsequence",
      title: "Longest Common Subsequence",
      blurb: "Length of the longest shared subsequence.",
      xp: 60,
      content: `# Longest Common Subsequence

A **subsequence** keeps characters in order but may skip some. The LCS of two
strings is the longest sequence appearing (in order) in both. \`"abcde"\` and
\`"ace"\` share \`"ace"\`, length \`3\`.

Use a 2D table: if the current characters match, extend the diagonal; otherwise
take the best of dropping one character from either string.

\`\`\`js
// match: dp[i+1][j+1] = dp[i][j] + 1
// else:  dp[i+1][j+1] = max(dp[i][j+1], dp[i+1][j])
\`\`\`

## Your task
Write \`lcs(a, b)\` returning the **length** of the longest common subsequence.`,
      starterCode: `function lcs(a, b) {
  // build a (a.length+1) x (b.length+1) table
  // match → diagonal + 1, else → max of left/up
}
`,
      solution: `function lcs(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (a[i] === b[j]) {
        dp[i + 1][j + 1] = dp[i][j] + 1;
      } else {
        dp[i + 1][j + 1] = Math.max(dp[i][j + 1], dp[i + 1][j]);
      }
    }
  }
  return dp[m][n];
}`,
      tests: [
        { name: '"abcde","ace" → 3', code: `assertEquals(lcs("abcde", "ace"), 3);` },
        { name: '"abc","abc" → 3', code: `assertEquals(lcs("abc", "abc"), 3);` },
        { name: '"abc","def" → 0', code: `assertEquals(lcs("abc", "def"), 0);` },
        { name: 'empty → 0', code: `assertEquals(lcs("", "anything"), 0);` },
        { name: '"AGGTAB","GXTXAYB" → 4', code: `assertEquals(lcs("AGGTAB", "GXTXAYB"), 4);` },
      ],
    },
    {
      slug: "grid-min-path-sum",
      title: "Grid Min Path Sum",
      blurb: "Cheapest path through a grid, moving right/down.",
      xp: 60,
      content: `# Grid Min Path Sum

You start at the **top-left** of a grid of numbers and want to reach the
**bottom-right**, moving only **right or down**. Minimize the sum of the cells
you step on.

Each cell's best cost is its own value plus the cheaper of the cell above or to
the left. The edges only have one way in.

\`\`\`js
// dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1])
\`\`\`

## Your task
Write \`minPathSum(grid)\` returning the minimum path sum from top-left to
bottom-right.`,
      starterCode: `function minPathSum(grid) {
  // dp[i][j] = grid value + cheaper of (up, left)
}
`,
      solution: `function minPathSum(grid) {
  const rows = grid.length, cols = grid[0].length;
  const dp = Array.from({ length: rows }, () => new Array(cols).fill(0));
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (i === 0 && j === 0) {
        dp[i][j] = grid[i][j];
      } else if (i === 0) {
        dp[i][j] = grid[i][j] + dp[i][j - 1];
      } else if (j === 0) {
        dp[i][j] = grid[i][j] + dp[i - 1][j];
      } else {
        dp[i][j] = grid[i][j] + Math.min(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  return dp[rows - 1][cols - 1];
}`,
      tests: [
        {
          name: "[[1,3,1],[1,5,1],[4,2,1]] → 7",
          code: `assertEquals(minPathSum([[1, 3, 1], [1, 5, 1], [4, 2, 1]]), 7);`,
        },
        {
          name: "[[1,2,3],[4,5,6]] → 12",
          code: `assertEquals(minPathSum([[1, 2, 3], [4, 5, 6]]), 12);`,
        },
        { name: "single cell [[5]] → 5", code: `assertEquals(minPathSum([[5]]), 5);` },
        {
          name: "single row [[1,2,3]] → 6",
          code: `assertEquals(minPathSum([[1, 2, 3]]), 6);`,
        },
      ],
    },
  ],
};
