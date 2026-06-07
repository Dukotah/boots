import type { Module } from "./types";

// Portfolio Algorithms — five substantial algorithm projects that produce
// real, demonstrable code worth putting on a resume or in a GitHub repo.
// Each lesson is a guided project brief: spec → implement → prove it works.
export const portfolioAlgorithms: Module = {
  slug: "portfolio-algorithms",
  title: "Algorithm Projects",
  description:
    "Go beyond toy exercises — build five complete algorithm projects that show real CS depth. BFS mazes, Dijkstra paths, Sudoku validation, A* grid search, and a sorting visualiser backend.",
  emoji: "🧩",
  gradient: "from-violet-400/20 to-indigo-500/10",
  tagline: "build algorithm projects that prove real CS knowledge",
  language: "js",
  keywords: [
    "algorithm projects",
    "javascript algorithms",
    "BFS maze solver",
    "dijkstra shortest path javascript",
    "sudoku validator javascript",
    "a star pathfinding javascript",
    "sorting algorithm steps javascript",
    "portfolio algorithms",
  ],
  lessons: [
    // ── 1. BFS Maze Solver ─────────────────────────────────────────────────
    {
      slug: "maze-solver-bfs",
      title: "Maze Solver (BFS)",
      blurb: "Find the shortest path through a 2-D grid using Breadth-First Search.",
      xp: 40,
      language: "js",
      content: `## What you're building

A \`solveMaze(grid, start, end)\` function that finds the **shortest path** from \`start\` to \`end\` through a 2-D grid, using **Breadth-First Search (BFS)**.

The grid is an array of strings. Each character is either \`" "\` (open) or \`"#"\` (wall). Coordinates are \`[row, col]\`.

\`\`\`
const grid = [
  "S . . #",
  "# # . #",
  ". . . E",
];
\`\`\`

## Requirements

- Accept \`grid\` (array of strings), \`start\` (\`[row,col]\`), \`end\` (\`[row,col]\`).
- Return an array of \`[row, col]\` pairs representing the shortest path from start (inclusive) to end (inclusive).
- Return \`null\` if no path exists.
- Move in 4 directions: up, down, left, right — no diagonals.
- Never walk into a \`"#"\` cell; never walk outside the grid bounds.
- Each cell in the path must be a distinct coordinate (no revisits).

## Stretch goals

- Support diagonal movement with cost \`√2\`.
- Return all shortest paths, not just one.
- Animate the frontier expansion (store a snapshot per BFS level).

## What this proves

BFS is the canonical shortest-path algorithm on unweighted graphs. Implementing it on a grid is a direct analogy to network routing, map navigation, and social-graph traversal. Interviewers love this problem because it cleanly separates graph thinking from data-structure mechanics.`,
      starterCode: `function solveMaze(grid, start, end) {
  // BFS shortest path on a 2-D grid.
  // grid: array of strings, "#" = wall, anything else = open.
  // start/end: [row, col].
  // Returns array of [row,col] pairs (shortest path), or null if unreachable.

  const rows = grid.length;
  const cols = grid[0].length;

  // TODO: implement BFS
  return null;
}
`,
      solution: `function solveMaze(grid, start, end) {
  const rows = grid.length;
  const cols = grid[0].length;
  const key = (r, c) => r + "," + c;
  const dirs = [[-1,0],[1,0],[0,-1],[0,1]];

  // Queue entries: [row, col, path-so-far]
  const queue = [[start[0], start[1], [start]]];
  const visited = new Set([key(start[0], start[1])]);

  // Bounded by grid size — at most rows*cols iterations
  let limit = rows * cols + 1;
  while (queue.length > 0 && limit-- > 0) {
    const [r, c, path] = queue.shift();
    if (r === end[0] && c === end[1]) return path;
    for (const [dr, dc] of dirs) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;
      if (grid[nr][nc] === "#") continue;
      if (visited.has(key(nr, nc))) continue;
      visited.add(key(nr, nc));
      queue.push([nr, nc, [...path, [nr, nc]]]);
    }
  }
  return null;
}`,
      tests: [
        {
          name: "finds path in open grid",
          code: `const grid = ["   ", "   ", "   "];
const path = solveMaze(grid, [0,0], [2,2]);
assert(path !== null, "expected a path");
assertEquals(path[0][0], 0);
assertEquals(path[0][1], 0);
assertEquals(path[path.length-1][0], 2);
assertEquals(path[path.length-1][1], 2);`,
        },
        {
          name: "returns null when blocked",
          code: `const grid = ["   ", "###", "   "];
const path = solveMaze(grid, [0,0], [2,0]);
assertEquals(path, null);`,
        },
        {
          name: "single-cell path (start === end)",
          code: `const grid = ["   "];
const path = solveMaze(grid, [0,1], [0,1]);
assert(path !== null, "expected a path");
assertEquals(path.length, 1);`,
        },
        {
          name: "shortest path length is correct",
          code: `// 1-row corridor, must go straight across
const grid = ["     "];
const path = solveMaze(grid, [0,0], [0,4]);
assert(path !== null, "expected a path");
assertEquals(path.length, 5);`,
        },
      ],
      hints: [
        "A BFS queue stores [row, col, pathSoFar]. Dequeue from the front, enqueue neighbors at the back.",
        "Use a Set of 'row,col' strings to track visited cells so you never process the same cell twice.",
        "When you dequeue a cell that matches `end`, return its path immediately — BFS guarantees it's the shortest.",
      ],
    },

    // ── 2. Dijkstra Shortest Path ──────────────────────────────────────────
    {
      slug: "dijkstra-shortest-path",
      title: "Dijkstra's Shortest Path",
      blurb: "Find cheapest routes in a weighted graph — the algorithm behind GPS navigation.",
      xp: 50,
      language: "js",
      content: `## What you're building

A \`dijkstra(graph, start)\` function that computes the **shortest distance** from \`start\` to every reachable node in a weighted directed graph.

The graph is an adjacency list: \`{ nodeId: [[neighborId, weight], ...] }\`.

\`\`\`js
const graph = {
  A: [["B", 1], ["C", 4]],
  B: [["C", 2], ["D", 5]],
  C: [["D", 1]],
  D: [],
};
dijkstra(graph, "A");
// { A: 0, B: 1, C: 3, D: 4 }
\`\`\`

## Requirements

- Accept \`graph\` (adjacency list object) and \`start\` (string node id).
- Return an object mapping each reachable node to its minimum cost from \`start\`.
- Unreachable nodes should be omitted (or mapped to \`Infinity\` — both are valid).
- All edge weights are non-negative integers.
- Use a greedy approach: always process the unvisited node with the smallest known distance.

## Stretch goals

- Return the actual shortest path (not just distances) using a \`previous\` map.
- Implement a proper min-heap for O((V+E) log V) performance instead of the naive O(V²) scan.
- Add support for bidirectional edges.

## What this proves

Dijkstra is the foundation of GPS routing, network packet forwarding (OSPF), and game AI pathfinding. Implementing it from scratch demonstrates mastery of greedy algorithms and graph traversal — a staple of technical interviews at every level.`,
      starterCode: `function dijkstra(graph, start) {
  // graph: { nodeId: [[neighborId, weight], ...] }
  // start: string node id
  // Returns: { nodeId: minDistance, ... }

  const dist = {};
  // TODO: initialize distances and run Dijkstra's algorithm
  return dist;
}
`,
      solution: `function dijkstra(graph, start) {
  const dist = {};
  const visited = new Set();

  // Initialise all known nodes to Infinity
  for (const node of Object.keys(graph)) dist[node] = Infinity;
  dist[start] = 0;

  // Naive O(V^2) implementation — good enough for interview-sized graphs
  // Upper bound: one pass per node in the graph
  const nodeCount = Object.keys(graph).length;
  for (let i = 0; i < nodeCount; i++) {
    // Pick the unvisited node with the smallest distance
    let u = null;
    let best = Infinity;
    for (const node of Object.keys(dist)) {
      if (!visited.has(node) && dist[node] < best) {
        best = dist[node];
        u = node;
      }
    }
    if (u === null) break; // all remaining nodes are unreachable

    visited.add(u);
    for (const [v, w] of (graph[u] || [])) {
      if (dist[v] === undefined) dist[v] = Infinity;
      const alt = dist[u] + w;
      if (alt < dist[v]) dist[v] = alt;
    }
  }

  // Strip unreachable nodes for a clean return value
  const result = {};
  for (const [k, v] of Object.entries(dist)) {
    if (v < Infinity) result[k] = v;
  }
  return result;
}`,
      tests: [
        {
          name: "basic shortest distances",
          code: `const graph = {
  A: [["B", 1], ["C", 4]],
  B: [["C", 2], ["D", 5]],
  C: [["D", 1]],
  D: [],
};
const d = dijkstra(graph, "A");
assertEquals(d["A"], 0);
assertEquals(d["B"], 1);
assertEquals(d["C"], 3);
assertEquals(d["D"], 4);`,
        },
        {
          name: "start node has distance 0",
          code: `const graph = { X: [["Y", 7]], Y: [] };
const d = dijkstra(graph, "X");
assertEquals(d["X"], 0);`,
        },
        {
          name: "unreachable node is omitted",
          code: `const graph = { A: [], B: [] };
const d = dijkstra(graph, "A");
assert(d["B"] === undefined || d["B"] === Infinity, "B should be unreachable");`,
        },
        {
          name: "prefers cheaper path",
          code: `// Direct A→C costs 10; A→B→C costs 3
const graph = {
  A: [["B", 1], ["C", 10]],
  B: [["C", 2]],
  C: [],
};
const d = dijkstra(graph, "A");
assertEquals(d["C"], 3);`,
        },
      ],
      hints: [
        "Start by setting dist[start] = 0 and every other known node to Infinity.",
        "Each iteration, pick the unvisited node with the smallest dist value — that's the greedy choice.",
        "For each neighbor of the chosen node, check if going through this node gives a shorter path.",
      ],
    },

    // ── 3. Sudoku Validator ────────────────────────────────────────────────
    {
      slug: "sudoku-validator",
      title: "Sudoku Validator",
      blurb: "Validate a 9×9 Sudoku board using sets — a Google/Meta interview classic.",
      xp: 40,
      language: "js",
      content: `## What you're building

A \`validateSudoku(board)\` function that checks whether a **partially-filled 9×9 Sudoku board** is valid.

The board is a 9-element array of 9-element arrays. Each cell is either a digit 1–9 (number) or \`0\` meaning empty.

\`\`\`js
validateSudoku([
  [5,3,0, 0,7,0, 0,0,0],
  [6,0,0, 1,9,5, 0,0,0],
  // ... 7 more rows
]); // true or false
\`\`\`

## Requirements

- Return \`true\` if the current (possibly partial) board state is valid.
- Return \`false\` if any row, column, or 3×3 box contains a duplicate non-zero digit.
- Empty cells (value \`0\`) are ignored — they don't cause a violation on their own.
- Do **not** require the board to be fully solved — just validate what is filled in.

## Stretch goals

- Return a list of all violations (e.g. \`"row 2 has duplicate 5"\`) instead of a boolean.
- Write a Sudoku solver that uses backtracking on top of this validator.
- Generate a random valid partially-filled puzzle.

## What this proves

This problem is a favourite at FAANG-level interviews. It cleanly exercises 2-D array traversal, modular indexing for the 3×3 boxes, and the "use a Set to detect duplicates" pattern — skills that transfer directly to matrix and grid problems across interviews.`,
      starterCode: `function validateSudoku(board) {
  // board: 9x9 array of numbers, 0 = empty cell.
  // Return true if no row, column, or 3x3 box has a duplicate non-zero digit.

  // TODO: check rows
  // TODO: check columns
  // TODO: check 3x3 boxes (top-left corners: rows 0,3,6 × cols 0,3,6)
  return false;
}
`,
      solution: `function validateSudoku(board) {
  function hasDuplicate(cells) {
    const seen = new Set();
    for (const v of cells) {
      if (v === 0) continue;
      if (seen.has(v)) return true;
      seen.add(v);
    }
    return false;
  }

  for (let i = 0; i < 9; i++) {
    // Row i
    if (hasDuplicate(board[i])) return false;
    // Column i
    const col = [];
    for (let r = 0; r < 9; r++) col.push(board[r][i]);
    if (hasDuplicate(col)) return false;
  }

  // 3x3 boxes
  for (let br = 0; br < 3; br++) {
    for (let bc = 0; bc < 3; bc++) {
      const box = [];
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          box.push(board[br * 3 + r][bc * 3 + c]);
        }
      }
      if (hasDuplicate(box)) return false;
    }
  }

  return true;
}`,
      tests: [
        {
          name: "valid partial board",
          code: `const board = [
  [5,3,0, 0,7,0, 0,0,0],
  [6,0,0, 1,9,5, 0,0,0],
  [0,9,8, 0,0,0, 0,6,0],
  [8,0,0, 0,6,0, 0,0,3],
  [4,0,0, 8,0,3, 0,0,1],
  [7,0,0, 0,2,0, 0,0,6],
  [0,6,0, 0,0,0, 2,8,0],
  [0,0,0, 4,1,9, 0,0,5],
  [0,0,0, 0,8,0, 0,7,9],
];
assertEquals(validateSudoku(board), true);`,
        },
        {
          name: "detects duplicate in row",
          code: `const board = Array.from({length:9}, () => Array(9).fill(0));
board[0][0] = 5;
board[0][4] = 5; // duplicate 5 in row 0
assertEquals(validateSudoku(board), false);`,
        },
        {
          name: "detects duplicate in column",
          code: `const board = Array.from({length:9}, () => Array(9).fill(0));
board[0][0] = 3;
board[5][0] = 3; // duplicate 3 in column 0
assertEquals(validateSudoku(board), false);`,
        },
        {
          name: "detects duplicate in 3x3 box",
          code: `const board = Array.from({length:9}, () => Array(9).fill(0));
board[0][0] = 7;
board[2][2] = 7; // both in top-left 3x3 box
assertEquals(validateSudoku(board), false);`,
        },
      ],
      hints: [
        "Write a helper `hasDuplicate(cells)` that uses a Set — reuse it for rows, columns, and boxes.",
        "The top-left corner of box (br, bc) is at row=br*3, col=bc*3. Iterate br and bc from 0 to 2.",
        "Skip zeroes: only add a value to the Set when it is non-zero.",
      ],
    },

    // ── 4. A* Pathfinding ──────────────────────────────────────────────────
    {
      slug: "astar-grid",
      title: "A* Pathfinding on a Grid",
      blurb: "The algorithm that powers game AI and Google Maps — smarter than BFS.",
      xp: 60,
      language: "js",
      content: `## What you're building

A \`astar(grid, start, end)\` function that finds the **shortest path** on a 2-D grid using the **A* algorithm** — a heuristic-guided search that outperforms BFS on large grids.

A* is BFS with a priority queue and a heuristic:

\`\`\`
f(n) = g(n) + h(n)
  g(n) = actual cost from start to n
  h(n) = estimated cost from n to end (Manhattan distance)
\`\`\`

## Requirements

- Accept the same interface as the BFS lesson: \`grid\` (array of strings), \`start\` and \`end\` as \`[row, col]\`.
- Return the shortest path as \`[[row,col], ...]\` (inclusive of start and end), or \`null\` if unreachable.
- Use **Manhattan distance** as the heuristic: \`|r1-r2| + |c1-c2|\`.
- Move in 4 directions only (up, down, left, right).
- Walls are \`"#"\`; all other cells are open, each with a movement cost of 1.

## Stretch goals

- Support diagonal movement (cost \`√2\` for diagonals, 1 for cardinal).
- Support weighted tiles (e.g. \`"~"\` = cost 3 for swamp).
- Visualise the open/closed sets at each step.

## What this proves

A* is the industry standard for game pathfinding (Unity NavMesh, Unreal AI), robotics motion planning, and any domain where you need guaranteed-shortest paths faster than BFS. Implementing it shows you understand heuristics, priority queues, and the trade-off between exploration breadth and goal-directedness.`,
      starterCode: `function astar(grid, start, end) {
  // grid: array of strings, "#" = wall.
  // start/end: [row, col].
  // Returns shortest path as [[row,col],...] or null.

  const rows = grid.length;
  const cols = grid[0].length;

  function heuristic(r, c) {
    // Manhattan distance to end
    return Math.abs(r - end[0]) + Math.abs(c - end[1]);
  }

  // TODO: implement A* with an open set (min-heap by fScore)
  // Hint: use a simple sorted array as a priority queue for correctness;
  //       sort by fScore = gScore + heuristic.
  return null;
}
`,
      solution: `function astar(grid, start, end) {
  const rows = grid.length;
  const cols = grid[0].length;
  const key = (r, c) => r + "," + c;
  const dirs = [[-1,0],[1,0],[0,-1],[0,1]];

  function heuristic(r, c) {
    return Math.abs(r - end[0]) + Math.abs(c - end[1]);
  }

  // Each entry: { r, c, g, f, path }
  // Open set as a sorted array (simple; fine for grid sizes tested here)
  const open = [{ r: start[0], c: start[1], g: 0, f: heuristic(start[0], start[1]), path: [start] }];
  const closed = new Set();

  // Safety cap (prevents any infinite loop) — generous because a cell can be
  // pushed once per incoming edge (≤4) before it's closed, so pops can exceed
  // rows*cols. 8*rows*cols+10 is a safe upper bound that never interferes.
  let limit = rows * cols * 8 + 10;
  while (open.length > 0 && limit-- > 0) {
    // Pop node with lowest f
    open.sort((a, b) => a.f - b.f);
    const cur = open.shift();

    if (cur.r === end[0] && cur.c === end[1]) return cur.path;

    const ck = key(cur.r, cur.c);
    if (closed.has(ck)) continue;
    closed.add(ck);

    for (const [dr, dc] of dirs) {
      const nr = cur.r + dr;
      const nc = cur.c + dc;
      if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;
      if (grid[nr][nc] === "#") continue;
      const nk = key(nr, nc);
      if (closed.has(nk)) continue;
      const ng = cur.g + 1;
      open.push({ r: nr, c: nc, g: ng, f: ng + heuristic(nr, nc), path: [...cur.path, [nr, nc]] });
    }
  }
  return null;
}`,
      tests: [
        {
          name: "finds path in open grid",
          code: `const grid = ["   ", "   ", "   "];
const path = astar(grid, [0,0], [2,2]);
assert(path !== null, "expected a path");
assertEquals(path[0][0], 0);
assertEquals(path[0][1], 0);
assertEquals(path[path.length-1][0], 2);
assertEquals(path[path.length-1][1], 2);`,
        },
        {
          name: "returns null when fully blocked",
          code: `const grid = ["   ", "###", "   "];
const path = astar(grid, [0,0], [2,0]);
assertEquals(path, null);`,
        },
        {
          name: "single-step path",
          code: `const grid = ["  "];
const path = astar(grid, [0,0], [0,1]);
assert(path !== null, "expected a path");
assertEquals(path.length, 2);`,
        },
        {
          name: "shortest path length matches BFS",
          code: `const grid = ["     "];
const path = astar(grid, [0,0], [0,4]);
assert(path !== null, "expected a path");
assertEquals(path.length, 5);`,
        },
      ],
      hints: [
        "Maintain an `open` list of nodes to explore, sorted ascending by f = g + heuristic. Always expand the node with the lowest f.",
        "Use a `closed` Set of 'row,col' string keys to skip nodes you've already fully explored.",
        "Store the path along with each node entry so you can return it immediately when you reach `end`.",
      ],
    },

    // ── 5. Sorting Steps Generator ─────────────────────────────────────────
    {
      slug: "sorting-steps",
      title: "Sorting Steps Generator",
      blurb: "Produce every swap step of a sort — the back-end for a sorting visualiser.",
      xp: 50,
      language: "js",
      content: `## What you're building

A \`sortingSteps(arr, algorithm)\` function that returns **every intermediate state** of a sorting algorithm, not just the final result. This is the data layer behind any sorting visualiser (like visualgo.net).

Supported algorithms: \`"bubble"\`, \`"selection"\`, \`"insertion"\`.

\`\`\`js
sortingSteps([3,1,2], "bubble");
// [
//   [3,1,2],  // initial
//   [1,3,2],  // after swap
//   [1,2,3],  // after swap
//   [1,2,3],  // (final pass, no swaps)
// ]
\`\`\`

## Requirements

- Accept \`arr\` (array of numbers) and \`algorithm\` (string: \`"bubble"\`, \`"selection"\`, or \`"insertion"\`).
- Return an array of snapshots — each snapshot is a copy of the array at that moment.
- The **first** snapshot is always the original array.
- The **last** snapshot is always the fully sorted array.
- Do **not** mutate the input array.
- Intermediate snapshots: record the array state **after each swap or insertion**.

## Stretch goals

- Add \`"merge"\` and \`"quick"\` sort with their split/merge snapshots.
- Include metadata with each step: which indices were compared/swapped.
- Build a React component that replays the steps with a slider.

## What this proves

This project shows you can implement classic sorting algorithms and think about algorithm state — not just the output. It's a visualiser backend: a real, deployable tool. It also proves you understand the mechanics of O(n²) sorts well enough to instrument them.`,
      starterCode: `function sortingSteps(arr, algorithm) {
  // Returns an array of array-snapshots showing each step of the sort.
  // First snapshot = original order. Last = fully sorted.
  // Do NOT mutate the input arr.

  const steps = [];
  const a = [...arr];
  steps.push([...a]);

  if (algorithm === "bubble") {
    // TODO: implement bubble sort, push a snapshot after every swap
  } else if (algorithm === "selection") {
    // TODO: implement selection sort, push a snapshot after every swap
  } else if (algorithm === "insertion") {
    // TODO: implement insertion sort, push a snapshot after every shift+insert
  }

  return steps;
}
`,
      solution: `function sortingSteps(arr, algorithm) {
  const steps = [];
  const a = [...arr];
  steps.push([...a]);

  if (algorithm === "bubble") {
    const n = a.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - 1 - i; j++) {
        if (a[j] > a[j + 1]) {
          [a[j], a[j + 1]] = [a[j + 1], a[j]];
          steps.push([...a]);
        }
      }
    }
  } else if (algorithm === "selection") {
    const n = a.length;
    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
      for (let j = i + 1; j < n; j++) {
        if (a[j] < a[minIdx]) minIdx = j;
      }
      if (minIdx !== i) {
        [a[i], a[minIdx]] = [a[minIdx], a[i]];
        steps.push([...a]);
      }
    }
  } else if (algorithm === "insertion") {
    const n = a.length;
    for (let i = 1; i < n; i++) {
      const key = a[i];
      let j = i - 1;
      // Bounded: j goes from i-1 down to 0 at most i steps
      while (j >= 0 && a[j] > key) {
        a[j + 1] = a[j];
        j--;
      }
      a[j + 1] = key;
      steps.push([...a]);
    }
  }

  // Guarantee the last snapshot is the sorted array
  const lastStep = steps[steps.length - 1];
  const sorted = [...arr].sort((x, y) => x - y);
  const alreadySorted = sorted.every((v, i) => v === lastStep[i]);
  if (!alreadySorted) steps.push([...sorted]);

  return steps;
}`,
      tests: [
        {
          name: "first step is original, last step is sorted",
          code: `const input = [3,1,2];
const steps = sortingSteps(input, "bubble");
assert(steps.length >= 2, "need at least 2 steps");
assertEquals(steps[0].join(","), "3,1,2");
assertEquals(steps[steps.length-1].join(","), "1,2,3");`,
        },
        {
          name: "input array is not mutated",
          code: `const input = [4,2,3,1];
sortingSteps(input, "selection");
assertEquals(input.join(","), "4,2,3,1");`,
        },
        {
          name: "selection sort produces sorted output",
          code: `const steps = sortingSteps([5,3,4,1,2], "selection");
assertEquals(steps[steps.length-1].join(","), "1,2,3,4,5");`,
        },
        {
          name: "insertion sort produces sorted output",
          code: `const steps = sortingSteps([9,7,8,6], "insertion");
assertEquals(steps[steps.length-1].join(","), "6,7,8,9");`,
        },
      ],
      hints: [
        "Push a snapshot (`[...a]`) right after every swap or insertion — that's the key instrumentation step.",
        "For bubble sort: two nested loops; swap adjacent elements when out of order.",
        "For selection sort: find the minimum in the unsorted portion, then swap it into position i.",
        "For insertion sort: take element i, shift larger elements right one slot, then place the key in the gap.",
      ],
    },
  ],
};
