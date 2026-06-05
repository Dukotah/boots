import type { Module } from "./types";

// Greedy Algorithms — interval scheduling, activity selection, knapsack, jump
// game, and Huffman-style frequency greedy. Auto-graded in-browser via Web Worker.
export const greedyAlgorithms: Module = {
  slug: "greedy-algorithms",
  title: "Greedy Algorithms",
  description:
    "Master the greedy mindset: make the locally optimal choice at each step and prove it leads to a global optimum. Covers coin change, interval scheduling, fractional knapsack, jump game, task scheduling, and Huffman-style encoding — all in JavaScript with instant feedback.",
  emoji: "🪙",
  gradient: "from-amber-400/20 to-orange-500/10",
  tagline:
    "Learn greedy algorithms in JavaScript: coin change, interval scheduling, activity selection, fractional knapsack, jump game, and Huffman encoding.",
  keywords: [
    "greedy algorithms javascript",
    "interval scheduling",
    "activity selection problem",
    "fractional knapsack",
    "jump game algorithm",
    "huffman encoding javascript",
    "greedy vs dynamic programming",
  ],
  language: "js",
  lessons: [
    {
      slug: "greedy-intro-coins",
      title: "The Greedy Mindset — Coin Change",
      blurb: "Make the biggest safe choice at each step to minimise coin count.",
      xp: 25,
      content: `# The Greedy Mindset — Coin Change

A **greedy algorithm** makes the **locally optimal choice** at each step without
reconsidering past decisions, hoping (and often proving) that a sequence of local
bests leads to a global best.

The classic intro is making change with the US coin system (quarters 25¢, dimes
10¢, nickels 5¢, pennies 1¢). The greedy rule: always pick the **largest coin
that still fits**.

\`\`\`js
// Give change for 41 cents:
// 25¢ → remainder 16
// 10¢ → remainder 6
// 5¢  → remainder 1
// 1¢  → remainder 0
// Result: [25, 10, 5, 1]  (4 coins)
\`\`\`

> **Why greedy works here:** US coins have the *canonical* property — no combination
> of smaller coins can ever beat the greedy choice. (This breaks for arbitrary coin
> sets — that's where Dynamic Programming steps in.)

## Your task

Write \`greedyChange(amount)\` that receives an integer number of cents and returns
an array of coin denominations used (largest first, repeated as needed).

\`\`\`
greedyChange(41)  // [25, 10, 5, 1]
greedyChange(30)  // [25, 5]
greedyChange(0)   // []
\`\`\`
`,
      starterCode: `function greedyChange(amount) {
  const coins = [25, 10, 5, 1];
  // TODO: greedily pick coins from largest to smallest
}
`,
      solution: `function greedyChange(amount) {
  const coins = [25, 10, 5, 1];
  const result = [];
  for (const coin of coins) {
    while (amount >= coin) {
      result.push(coin);
      amount -= coin;
    }
  }
  return result;
}`,
      tests: [
        {
          name: "greedyChange(41) → [25,10,5,1]",
          code: `assertEquals(JSON.stringify(greedyChange(41)), JSON.stringify([25,10,5,1]));`,
        },
        {
          name: "greedyChange(30) → [25,5]",
          code: `assertEquals(JSON.stringify(greedyChange(30)), JSON.stringify([25,5]));`,
        },
        {
          name: "greedyChange(0) → []",
          code: `assertEquals(JSON.stringify(greedyChange(0)), JSON.stringify([]));`,
        },
        {
          name: "greedyChange(1) → [1]",
          code: `assertEquals(JSON.stringify(greedyChange(1)), JSON.stringify([1]));`,
        },
        {
          name: "greedyChange(100) → [25,25,25,25]",
          code: `assertEquals(JSON.stringify(greedyChange(100)), JSON.stringify([25,25,25,25]));`,
        },
      ],
      hints: [
        "Loop over each coin denomination from largest to smallest.",
        "For each coin, use a while loop: while amount >= coin, push the coin and subtract it from amount.",
      ],
      explanation: `The outer \`for\` loop visits denominations from largest to smallest. The inner
\`while\` loop greedily uses as many of the current coin as possible before moving
to the next. Each subtraction brings \`amount\` closer to zero, so the loops always
terminate.`,
    },

    {
      slug: "activity-selection",
      title: "Activity Selection — Interval Scheduling",
      blurb: "Fit the most non-overlapping activities in a day.",
      xp: 40,
      content: `# Activity Selection — Interval Scheduling

You have a room and a list of activities, each with a **start** and **end** time.
Only one activity can run at a time. Your goal: schedule as **many activities as
possible** (maximise count, not duration).

**Greedy insight:** always pick the activity that **finishes earliest** among those
that don't conflict with already-chosen activities. An early finish leaves maximum
room for future activities.

\`\`\`
Activities: [{s:1,e:4},{s:3,e:5},{s:0,e:6},{s:5,e:7},{s:3,e:9},{s:5,e:9},{s:6,e:10},{s:8,e:11}]
Sort by end:  e=4,5,6,7,9,9,10,11
Pick e=4  (starts 1, no conflict)
Pick e=7  (starts 5 >= 4 ✓)
Pick e=11 (starts 8 >= 7 ✓)
Answer: 3 activities
\`\`\`

## Your task

Write \`maxActivities(activities)\` that accepts an array of \`{s, e}\` objects and
returns the **maximum number** of non-overlapping activities.

An activity \`b\` is compatible with the last chosen activity \`a\` when \`b.s >= a.e\`.
`,
      starterCode: `function maxActivities(activities) {
  // 1. Sort activities by end time
  // 2. Greedily pick each compatible activity
}
`,
      solution: `function maxActivities(activities) {
  const sorted = [...activities].sort((a, b) => a.e - b.e);
  let count = 0;
  let lastEnd = -Infinity;
  for (const act of sorted) {
    if (act.s >= lastEnd) {
      count++;
      lastEnd = act.e;
    }
  }
  return count;
}`,
      tests: [
        {
          name: "classic 8-activity example → 3",
          code: `const acts = [{s:1,e:4},{s:3,e:5},{s:0,e:6},{s:5,e:7},{s:3,e:9},{s:5,e:9},{s:6,e:10},{s:8,e:11}];
assertEquals(maxActivities(acts), 3);`,
        },
        {
          name: "no activities → 0",
          code: `assertEquals(maxActivities([]), 0);`,
        },
        {
          name: "single activity → 1",
          code: `assertEquals(maxActivities([{s:2,e:5}]), 1);`,
        },
        {
          name: "all non-overlapping → all selected",
          code: `assertEquals(maxActivities([{s:0,e:1},{s:2,e:3},{s:4,e:5}]), 3);`,
        },
        {
          name: "all overlapping → 1",
          code: `assertEquals(maxActivities([{s:0,e:10},{s:1,e:9},{s:2,e:8}]), 1);`,
        },
      ],
      hints: [
        "Sort the activities array by end time (`a.e - b.e`). Use a copy so you don't mutate the input.",
        "Keep track of `lastEnd` (initialise to -Infinity). For each activity, if `act.s >= lastEnd` it is compatible — count it and update `lastEnd`.",
      ],
      explanation: `Sorting by earliest finish ensures each greedy pick maximises remaining time.
The proof: any optimal solution can be transformed into the greedy solution by
swapping its first pick with the greedy first pick — the result is never worse.
This exchange argument extends inductively to every subsequent pick.`,
    },

    {
      slug: "fractional-knapsack",
      title: "Fractional Knapsack",
      blurb: "Maximise value when you can take fractions of each item.",
      xp: 40,
      content: `# Fractional Knapsack

You have a knapsack of capacity \`W\` and a list of items, each with a \`weight\` and
\`value\`. Unlike the 0/1 knapsack (where you must take all or nothing), here you
can take a **fraction** of any item.

**Greedy insight:** sort items by **value-per-unit-weight** (descending). Take as
much of the best item as you can, then the next, and so on until the bag is full.

\`\`\`
Items: [{w:10,v:60},{w:20,v:100},{w:30,v:120}]  capacity=50
Ratios: 6, 5, 4
Take all of item 0 (w=10, v=60)  → remaining=40
Take all of item 1 (w=20, v=100) → remaining=20
Take 20/30 of item 2             → value += 120*(20/30) = 80
Total value = 240
\`\`\`

## Your task

Write \`fractionalKnapsack(items, capacity)\` where each item is \`{w, v}\`.
Return the maximum total value as a **number** (fractions are allowed).
`,
      starterCode: `function fractionalKnapsack(items, capacity) {
  // 1. Sort by value/weight ratio descending
  // 2. Greedily fill the knapsack
}
`,
      solution: `function fractionalKnapsack(items, capacity) {
  const sorted = [...items].sort((a, b) => b.v / b.w - a.v / a.w);
  let totalValue = 0;
  let remaining = capacity;
  for (const item of sorted) {
    if (remaining <= 0) break;
    const take = Math.min(item.w, remaining);
    totalValue += (take / item.w) * item.v;
    remaining -= take;
  }
  return totalValue;
}`,
      tests: [
        {
          name: "classic 3-item example → 240",
          code: `const items = [{w:10,v:60},{w:20,v:100},{w:30,v:120}];
assertEquals(fractionalKnapsack(items, 50), 240);`,
        },
        {
          name: "capacity 0 → 0",
          code: `assertEquals(fractionalKnapsack([{w:5,v:50}], 0), 0);`,
        },
        {
          name: "capacity exceeds all items → sum of all values",
          code: `assertEquals(fractionalKnapsack([{w:10,v:100},{w:20,v:200}], 100), 300);`,
        },
        {
          name: "single item, partial take",
          code: `assertEquals(fractionalKnapsack([{w:20,v:100}], 10), 50);`,
        },
      ],
      hints: [
        "Compute the ratio `v/w` for each item. Sort descending by this ratio (use a spread copy).",
        "Track `remaining` capacity. For each item, `take = Math.min(item.w, remaining)`. Add `(take/item.w)*item.v` to the total.",
      ],
      explanation: `Taking the highest value-density items first is optimal because you can always
substitute a lower-density fraction for a higher-density one to improve the total.
This exchange argument shows no other order can do better.`,
    },

    {
      slug: "jump-game",
      title: "Jump Game — Can You Reach the End?",
      blurb: "Track the farthest reachable index to decide if escape is possible.",
      xp: 35,
      content: `# Jump Game — Can You Reach the End?

Given an array \`nums\` where \`nums[i]\` is the **maximum jump length** from index
\`i\`, determine if you can reach the **last index** starting from index \`0\`.

**Greedy insight:** keep track of \`maxReach\` — the farthest index reachable so
far. At each index \`i\`, if \`i > maxReach\` you are stuck. Otherwise update
\`maxReach = Math.max(maxReach, i + nums[i])\`.

\`\`\`
nums = [2,3,1,1,4]
i=0: maxReach = max(0, 0+2) = 2
i=1: maxReach = max(2, 1+3) = 4  ← reached end ✓

nums = [3,2,1,0,4]
i=0: maxReach=3
i=1: maxReach=3
i=2: maxReach=3
i=3: maxReach=3
i=4: 4>3 → stuck, return false
\`\`\`

## Your task

Write \`canJump(nums)\` that returns \`true\` if you can reach the last index, or
\`false\` otherwise.
`,
      starterCode: `function canJump(nums) {
  // Track maxReach greedily; return false if ever stuck
}
`,
      solution: `function canJump(nums) {
  let maxReach = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i > maxReach) return false;
    maxReach = Math.max(maxReach, i + nums[i]);
  }
  return true;
}`,
      tests: [
        {
          name: "[2,3,1,1,4] → true",
          code: `assertEquals(canJump([2,3,1,1,4]), true);`,
        },
        {
          name: "[3,2,1,0,4] → false",
          code: `assertEquals(canJump([3,2,1,0,4]), false);`,
        },
        {
          name: "single element → true",
          code: `assertEquals(canJump([0]), true);`,
        },
        {
          name: "[0,1] → false",
          code: `assertEquals(canJump([0,1]), false);`,
        },
        {
          name: "[1,0,1,0] → false",
          code: `assertEquals(canJump([1,0,1,0]), false);`,
        },
        {
          name: "[2,0,0] → true",
          code: `assertEquals(canJump([2,0,0]), true);`,
        },
      ],
      hints: [
        "Initialise `maxReach = 0`. Loop with index `i` from 0 to `nums.length - 1`.",
        "If `i > maxReach` at any point, you cannot proceed — return `false`. Otherwise `maxReach = Math.max(maxReach, i + nums[i])`.",
      ],
      explanation: `The algorithm is O(n) with O(1) space. It never needs to backtrack because
\`maxReach\` captures the best possible position from all previously seen jumps.
If \`i\` ever exceeds \`maxReach\`, there is no way to move forward regardless of future array values.`,
    },

    {
      slug: "meeting-rooms",
      title: "Meeting Rooms — Minimum Rooms Needed",
      blurb: "Count peak overlapping intervals to find the minimum room count.",
      xp: 40,
      content: `# Meeting Rooms — Minimum Rooms Needed

Given a list of meeting intervals \`[start, end]\`, find the **minimum number of
conference rooms** required so that no two overlapping meetings share a room.

**Greedy insight:** split start times and end times into separate sorted arrays.
Use two pointers. A new room is needed when a meeting starts before the earliest
ongoing meeting ends.

\`\`\`
Meetings: [[0,30],[5,10],[15,20]]
starts: [0, 5,15]   ends: [10,20,30]

i=0,j=0: start 0 < end 10 → rooms++ (rooms=1), i++
i=1,j=0: start 5 < end 10 → rooms++ (rooms=2), i++
i=2,j=0: start 15 >= end 10 → free a room (rooms=1), j++
         start 15 < end 20 → rooms++ (rooms=2), i++
Answer: 2
\`\`\`

## Your task

Write \`minMeetingRooms(intervals)\` where each interval is \`[start, end]\`.
Return the minimum number of rooms required.
`,
      starterCode: `function minMeetingRooms(intervals) {
  // Split into sorted starts and ends arrays, then use two pointers
}
`,
      solution: `function minMeetingRooms(intervals) {
  if (intervals.length === 0) return 0;
  const starts = intervals.map(([s]) => s).sort((a, b) => a - b);
  const ends = intervals.map(([, e]) => e).sort((a, b) => a - b);
  let rooms = 0;
  let j = 0;
  for (let i = 0; i < starts.length; i++) {
    if (starts[i] < ends[j]) {
      rooms++;
    } else {
      j++;
    }
  }
  return rooms;
}`,
      tests: [
        {
          name: "[[0,30],[5,10],[15,20]] → 2",
          code: `assertEquals(minMeetingRooms([[0,30],[5,10],[15,20]]), 2);`,
        },
        {
          name: "[[7,10],[2,4]] → 1",
          code: `assertEquals(minMeetingRooms([[7,10],[2,4]]), 1);`,
        },
        {
          name: "empty → 0",
          code: `assertEquals(minMeetingRooms([]), 0);`,
        },
        {
          name: "all same time → all rooms",
          code: `assertEquals(minMeetingRooms([[1,5],[1,5],[1,5]]), 3);`,
        },
        {
          name: "sequential → 1 room",
          code: `assertEquals(minMeetingRooms([[1,2],[3,4],[5,6]]), 1);`,
        },
      ],
      hints: [
        "Extract two arrays: `starts` (all start times sorted) and `ends` (all end times sorted).",
        "Use a pointer `j` into `ends`. For each start in order: if `starts[i] < ends[j]`, a new room is needed (`rooms++`). Otherwise a room is freed (`j++`).",
      ],
      explanation: `Separating starts and ends lets you count overlapping intervals without matching
specific pairs. The two-pointer sweep is O(n log n) due to sorting, O(n) space.
At any moment, \`rooms\` reflects how many meetings are running simultaneously.`,
    },

    {
      slug: "huffman-frequencies",
      title: "Greedy Encoding — Huffman Frequencies",
      blurb: "Assign shorter codes to more frequent characters using a greedy merge.",
      xp: 45,
      content: `# Greedy Encoding — Huffman Frequencies

**Huffman coding** compresses data by giving shorter bit-codes to frequent
characters and longer codes to rare ones. The algorithm is entirely greedy:

1. Build a **min-priority queue** (min-heap) of all characters by frequency.
2. Repeatedly merge the two **lowest-frequency** nodes into a parent whose
   frequency is their sum.
3. Repeat until one node remains — that is the Huffman tree root.

The **total bits** used equals the sum of each character's frequency multiplied by
its depth (code length) in the tree.

For this lesson you won't implement a full heap. Instead, simulate the greedy
merge using a sorted array:

\`\`\`js
freqs = [5, 9, 12, 13, 16, 45]
Merge 5+9=14  → [12,13,14,16,45]
Merge 12+13=25 → [14,16,25,45]
Merge 14+16=30 → [25,30,45]
Merge 25+30=55 → [45,55]
Merge 45+55=100 → [100]
// Sum of all internal node weights = 14+25+30+55+100 = 224
// That is the total weighted path length (total bits for one pass of the data).
\`\`\`

## Your task

Write \`huffmanCost(freqs)\` that takes an array of positive integer frequencies,
simulates the greedy Huffman merges, and returns the **total merge cost** (the sum
of every merged value — equivalent to the weighted path length of the tree).

Return \`0\` for an empty or single-element array (no merges needed).
`,
      starterCode: `function huffmanCost(freqs) {
  // Simulate greedy merges: always merge the two smallest
  // Hint: sort, merge smallest two, re-insert sum, keep going
}
`,
      solution: `function huffmanCost(freqs) {
  if (freqs.length <= 1) return 0;
  const heap = [...freqs].sort((a, b) => a - b);
  let totalCost = 0;
  while (heap.length > 1) {
    const a = heap.shift();
    const b = heap.shift();
    const merged = a + b;
    totalCost += merged;
    // Insert merged value in sorted position
    let pos = 0;
    while (pos < heap.length && heap[pos] < merged) pos++;
    heap.splice(pos, 0, merged);
  }
  return totalCost;
}`,
      tests: [
        {
          name: "[5,9,12,13,16,45] → 224",
          code: `assertEquals(huffmanCost([5,9,12,13,16,45]), 224);`,
        },
        {
          name: "[] → 0",
          code: `assertEquals(huffmanCost([]), 0);`,
        },
        {
          name: "[7] → 0",
          code: `assertEquals(huffmanCost([7]), 0);`,
        },
        {
          name: "[1,1] → 2",
          code: `assertEquals(huffmanCost([1,1]), 2);`,
        },
        {
          name: "[1,2,3] → 9",
          code: `assertEquals(huffmanCost([1,2,3]), 9);`,
        },
      ],
      hints: [
        "Sort the array ascending. Each iteration: remove the first two elements (smallest), compute their sum, add to `totalCost`, then re-insert the sum in sorted order.",
        "Use `heap.shift()` twice to get `a` and `b`. Then find the insertion position with a while loop and use `heap.splice(pos, 0, merged)`.",
      ],
      explanation: `Every merge step contributes its cost to the total — each original frequency is
added once per level of depth it ends up at in the tree. Always merging the two
smallest nodes minimises the depth of high-cost characters, which is provably
optimal (Huffman's 1952 proof by exchange argument).

Verify [1,2,3]:
- Merge 1+2=3, cost=3. Heap: [3,3]
- Merge 3+3=6, cost=6. Heap: [6]
- Total: 3+6 = 9 ✓`,
    },

    {
      slug: "greedy-vs-dp",
      title: "When Greedy Works — and When It Doesn't",
      blurb: "Greedy is fast but only correct for problems with the greedy-choice property.",
      xp: 30,
      content: `# When Greedy Works — and When It Doesn't

Greedy algorithms are elegant and efficient (usually O(n log n) or better), but
they only produce an optimal answer when the problem has two properties:

**1. Greedy-choice property** — a globally optimal solution can always be reached
by making the locally optimal choice at each step. No future decision can make a
past greedy choice look wrong.

**2. Optimal substructure** — an optimal solution to the problem contains optimal
solutions to its sub-problems (shared with Dynamic Programming).

### Famous failures

| Problem | Greedy result | Why it fails |
|---|---|---|
| 0/1 Knapsack | suboptimal | Can't take fractions; greedy ignores combinations |
| Coin change (arbitrary coins) | wrong | e.g. coins=[1,3,4], amount=6: greedy picks 4+1+1=3 coins; DP finds 3+3=2 coins |
| Shortest path (negative edges) | wrong | A "cheap" early edge can block a cheaper overall path |

### Famous successes

- **US coin change** — canonical coin system guarantees greedy optimality
- **Activity selection** — earliest-finish-first is provably optimal
- **Fractional knapsack** — fractions allowed, so ratio sorting wins
- **Huffman coding** — exchange argument proves greedy merge is optimal
- **Minimum spanning tree** (Kruskal/Prim) — greedily add cheapest safe edges
- **Dijkstra's algorithm** — greedy on non-negative edge weights

The key question to ask yourself: *"If I make the greedy choice now, is there any
way a future step could prove that choice was wrong?"* If yes — reach for DP or
another approach.
`,
      kind: "quiz",
      questions: [
        {
          prompt: "Which property guarantees that a locally optimal choice always leads to a globally optimal solution?",
          options: [
            "Optimal substructure only",
            "Greedy-choice property",
            "Memoisation",
            "Divide-and-conquer",
          ],
          answer: 1,
          explanation:
            "The greedy-choice property is the defining guarantee: picking the local best at every step leads to the global best. Optimal substructure is also needed, but it's shared with DP — the greedy-choice property is what distinguishes greedy from DP.",
        },
        {
          prompt: "You have coins [1, 3, 4] and need to make change for 6. Greedy picks 4+1+1 (3 coins). What is the optimal answer and why does greedy fail?",
          options: [
            "3 coins — greedy is correct here",
            "2 coins (3+3) — greedy fails because it takes a large coin that blocks a better combination",
            "1 coin — greedy should always pick the only option",
            "Greedy always works for coin problems",
          ],
          answer: 1,
          explanation:
            "With coins [1,3,4] and amount 6: greedy picks 4 first (remainder 2), then 1+1 = 3 coins total. But 3+3 = 2 coins is better. Non-canonical coin sets break the greedy-choice property — you need Dynamic Programming.",
        },
        {
          prompt: "Why does the greedy activity-selection algorithm always work?",
          options: [
            "It tries all possible schedules and picks the best",
            "Earliest-finish guarantees maximum remaining time for future activities (exchange argument)",
            "It uses memoisation to avoid re-checking intervals",
            "It works because activities never overlap",
          ],
          answer: 1,
          explanation:
            "Choosing the activity that finishes earliest leaves the most time open for subsequent choices. An exchange argument shows you can always swap any other first choice for the earliest-finish one without reducing the total count.",
        },
        {
          prompt: "The fractional knapsack is solvable by greedy, but the 0/1 knapsack is not. Why?",
          options: [
            "0/1 knapsack items weigh more",
            "In 0/1 knapsack you must take whole items, so a high-ratio item could waste capacity that smaller items would fill better — greedy-choice property breaks",
            "Fractional knapsack has more items",
            "Both are solvable by greedy — 0/1 just needs a different ratio",
          ],
          answer: 1,
          explanation:
            "When items are indivisible, taking the highest-ratio item can leave unused capacity that a different combination of items would fill more profitably. The greedy-choice property no longer holds, so Dynamic Programming is needed for 0/1 knapsack.",
        },
        {
          prompt: "Huffman coding greedily merges the two lowest-frequency nodes. What guarantees this is optimal?",
          options: [
            "It always produces a balanced binary tree",
            "An exchange argument: swapping any other pair for the two lowest-frequency nodes can never decrease total cost",
            "Lower frequencies always appear at the root",
            "Huffman coding uses Dynamic Programming under the hood",
          ],
          answer: 1,
          explanation:
            "The exchange argument shows that if you had an optimal tree where the two least frequent symbols were not the deepest leaves, you could swap them with the deepest leaves and the total cost would not increase. Therefore merging the two smallest first is always safe.",
        },
      ],
    },
  ],
};
