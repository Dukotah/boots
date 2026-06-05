import type { Module } from "./types";

// Graphs in JavaScript — adjacency-list graphs, BFS, DFS, and classic interview problems.
// Auto-graded in-browser via Web Worker (language: "js").
export const graphsJs: Module = {
  slug: "graphs-js",
  title: "Graphs in JavaScript",
  description:
    "Build adjacency-list graphs from scratch, then master Breadth-First Search, Depth-First Search, path-finding, and cycle detection — the graph skills every JavaScript developer needs for technical interviews.",
  emoji: "🕸️",
  gradient: "from-violet-400/20 to-indigo-500/10",
  tagline:
    "Learn graphs in JavaScript: adjacency lists, BFS, DFS, shortest path, and cycle detection — built from scratch.",
  keywords: [
    "graphs javascript",
    "adjacency list javascript",
    "bfs javascript",
    "dfs javascript",
    "graph interview questions javascript",
    "breadth first search javascript",
    "depth first search javascript",
  ],
  lessons: [
    {
      slug: "graph-concepts",
      title: "What is a Graph?",
      blurb: "Nodes, edges, directed vs undirected — the mental model.",
      xp: 20,
      kind: "quiz",
      content: `# What is a Graph?

A **graph** is a collection of **nodes** (also called vertices) connected by **edges**.
Unlike arrays or linked lists, a graph has no single "start" — any node can connect to any other.

## Directed vs Undirected

| Type | Edge meaning | Example |
|------|-------------|---------|
| **Undirected** | A–B means you can travel either way | Road map |
| **Directed** | A→B means you can only go A to B | Twitter follows |

## Weighted vs Unweighted

Edges can carry a **weight** (distance, cost, latency).  Unweighted graphs treat all edges equally.

## Representing graphs in code

Two common representations:

- **Adjacency matrix** — 2-D boolean array, O(V²) space
- **Adjacency list** — each node stores a list of its neighbors, O(V + E) space

The adjacency list is the standard choice for sparse graphs (most real-world graphs) and is what you'll use throughout this module.

\`\`\`js
// Adjacency list as a plain object / Map
const graph = {
  A: ["B", "C"],
  B: ["A", "D"],
  C: ["A"],
  D: ["B"],
};
\`\`\`

Each key is a node; its value is an array of **neighbors**.`,
      questions: [
        {
          prompt: "In an **undirected** graph, if there is an edge between node A and node B, which statement is true?",
          options: [
            "You can travel from A to B, but not from B to A",
            "You can travel from A to B and from B to A",
            "A and B are the same node",
          ],
          answer: 1,
          explanation:
            "Undirected edges go both ways — A–B implies B–A. A directed edge A→B would only allow travel from A to B.",
        },
        {
          prompt: "Which graph representation uses O(V + E) space — making it efficient for sparse graphs?",
          options: [
            "Adjacency matrix",
            "Adjacency list",
            "Both use the same space",
          ],
          answer: 1,
          explanation:
            "An adjacency list stores only the edges that exist. An adjacency matrix allocates V² cells regardless of edge count.",
        },
        {
          prompt: "A social-media 'follow' graph (A follows B does NOT mean B follows A) is best modeled as:",
          options: ["Undirected graph", "Directed graph", "A linked list"],
          answer: 1,
          explanation:
            "Follow relationships are one-way — that's the definition of a directed graph.",
        },
      ],
    },
    {
      slug: "build-adjacency-list",
      title: "Build an Adjacency List",
      blurb: "Represent a graph as a Map of neighbor arrays.",
      xp: 30,
      content: `# Build an Adjacency List

The most practical way to store a graph in JavaScript is a \`Map\` where each key
is a node value and each value is an **array of neighbors**.

\`\`\`js
const graph = new Map();
graph.set("A", ["B", "C"]);
graph.set("B", ["A"]);
graph.set("C", ["A"]);
\`\`\`

## Your task

Write a class \`Graph\` with:

- A constructor that creates an empty \`Map\` at \`this.adjacencyList\`.
- A method \`addNode(node)\` that adds \`node\` to the map with an empty array if it
  doesn't already exist (ignore duplicate calls).

We'll add edges in the next lesson — for now, just build the scaffolding.`,
      starterCode: `class Graph {
  constructor() {
    // create this.adjacencyList as a new Map
  }

  addNode(node) {
    // add node → [] to adjacencyList if not already present
  }
}
`,
      solution: `class Graph {
  constructor() {
    this.adjacencyList = new Map();
  }

  addNode(node) {
    if (!this.adjacencyList.has(node)) {
      this.adjacencyList.set(node, []);
    }
  }
}`,
      tests: [
        {
          name: "constructor creates a Map",
          code: `const g = new Graph(); assert(g.adjacencyList instanceof Map, "adjacencyList should be a Map");`,
        },
        {
          name: "addNode stores node with empty array",
          code: `const g = new Graph(); g.addNode("A"); assertEquals(JSON.stringify(g.adjacencyList.get("A")), JSON.stringify([]));`,
        },
        {
          name: "duplicate addNode is ignored",
          code: `const g = new Graph(); g.addNode("A"); g.adjacencyList.get("A").push("X"); g.addNode("A"); assertEquals(g.adjacencyList.get("A").length, 1);`,
        },
        {
          name: "multiple nodes stored independently",
          code: `const g = new Graph(); g.addNode("A"); g.addNode("B"); assert(g.adjacencyList.has("A") && g.adjacencyList.has("B"), "both nodes should exist");`,
        },
      ],
      hints: [
        "Use `this.adjacencyList = new Map()` in the constructor.",
        "In addNode, check `this.adjacencyList.has(node)` before setting.",
      ],
      explanation: `The \`Map\` is ideal here because node values can be any type (strings, numbers, objects).
\`has\` + \`set\` gives O(1) average-case operations for both checking and inserting.`,
    },
    {
      slug: "add-edges",
      title: "Add Edges (Directed & Undirected)",
      blurb: "Connect nodes with directed or undirected edges.",
      xp: 35,
      content: `# Add Edges

An **edge** links two nodes.

- **Directed edge** A→B: push B into A's list only.
- **Undirected edge** A–B: push B into A's list AND push A into B's list.

\`\`\`js
// Directed: A → B
graph.get("A").push("B");

// Undirected: A — B
graph.get("A").push("B");
graph.get("B").push("A");
\`\`\`

## Your task

Extend the \`Graph\` class (already has \`addNode\`) with two methods:

- \`addDirectedEdge(from, to)\` — adds a one-way edge from → to.
- \`addUndirectedEdge(u, v)\` — adds edges in both directions.

Both methods should **auto-add** any missing nodes before inserting the edge.`,
      starterCode: `class Graph {
  constructor() {
    this.adjacencyList = new Map();
  }

  addNode(node) {
    if (!this.adjacencyList.has(node)) {
      this.adjacencyList.set(node, []);
    }
  }

  addDirectedEdge(from, to) {
    // auto-add missing nodes, then push 'to' into from's list
  }

  addUndirectedEdge(u, v) {
    // auto-add missing nodes, then push each into the other's list
  }
}
`,
      solution: `class Graph {
  constructor() {
    this.adjacencyList = new Map();
  }

  addNode(node) {
    if (!this.adjacencyList.has(node)) {
      this.adjacencyList.set(node, []);
    }
  }

  addDirectedEdge(from, to) {
    this.addNode(from);
    this.addNode(to);
    this.adjacencyList.get(from).push(to);
  }

  addUndirectedEdge(u, v) {
    this.addNode(u);
    this.addNode(v);
    this.adjacencyList.get(u).push(v);
    this.adjacencyList.get(v).push(u);
  }
}`,
      tests: [
        {
          name: "directed edge: from→to only",
          code: `const g = new Graph();
g.addDirectedEdge("A", "B");
assert(g.adjacencyList.get("A").includes("B"), "A should list B as neighbor");
assert(!g.adjacencyList.get("B").includes("A"), "B should NOT list A (directed)");`,
        },
        {
          name: "directed edge auto-creates missing nodes",
          code: `const g = new Graph();
g.addDirectedEdge("X", "Y");
assert(g.adjacencyList.has("X") && g.adjacencyList.has("Y"), "both nodes created");`,
        },
        {
          name: "undirected edge: both directions",
          code: `const g = new Graph();
g.addUndirectedEdge("A", "B");
assert(g.adjacencyList.get("A").includes("B"), "A lists B");
assert(g.adjacencyList.get("B").includes("A"), "B lists A");`,
        },
        {
          name: "undirected edge auto-creates missing nodes",
          code: `const g = new Graph();
g.addUndirectedEdge("P", "Q");
assert(g.adjacencyList.has("P") && g.adjacencyList.has("Q"), "both nodes created");`,
        },
      ],
      hints: [
        "Call `this.addNode(from)` and `this.addNode(to)` at the top of `addDirectedEdge` — `addNode` already handles duplicates.",
        "For undirected, call `addDirectedEdge` twice, or push manually in both directions.",
      ],
    },
    {
      slug: "get-neighbors",
      title: "Neighbors & Degree",
      blurb: "Query a node's connections and count its edges.",
      xp: 25,
      content: `# Neighbors & Degree

Two fundamental graph queries:

- **Neighbors** — which nodes are directly connected to a given node?
- **Degree** — how many edges does a node have?
  - In a directed graph: **in-degree** (edges pointing in) vs **out-degree** (edges going out).
  - In an undirected graph: just **degree** (count of adjacent nodes).

\`\`\`js
const neighbors = graph.get("A"); // ["B", "C"]
const degree = neighbors.length;  // 2
\`\`\`

## Your task

Add two methods to the \`Graph\` class:

- \`getNeighbors(node)\` — returns the array of neighbors for \`node\`, or \`[]\` if
  the node doesn't exist.
- \`degree(node)\` — returns the number of neighbors (length of the neighbor array),
  or \`0\` if the node doesn't exist.`,
      starterCode: `class Graph {
  constructor() {
    this.adjacencyList = new Map();
  }

  addNode(node) {
    if (!this.adjacencyList.has(node)) {
      this.adjacencyList.set(node, []);
    }
  }

  addUndirectedEdge(u, v) {
    this.addNode(u);
    this.addNode(v);
    this.adjacencyList.get(u).push(v);
    this.adjacencyList.get(v).push(u);
  }

  getNeighbors(node) {
    // return neighbor array, or [] if node missing
  }

  degree(node) {
    // return neighbor count, or 0 if node missing
  }
}
`,
      solution: `class Graph {
  constructor() {
    this.adjacencyList = new Map();
  }

  addNode(node) {
    if (!this.adjacencyList.has(node)) {
      this.adjacencyList.set(node, []);
    }
  }

  addUndirectedEdge(u, v) {
    this.addNode(u);
    this.addNode(v);
    this.adjacencyList.get(u).push(v);
    this.adjacencyList.get(v).push(u);
  }

  getNeighbors(node) {
    return this.adjacencyList.get(node) ?? [];
  }

  degree(node) {
    return (this.adjacencyList.get(node) ?? []).length;
  }
}`,
      tests: [
        {
          name: "getNeighbors returns correct neighbors",
          code: `const g = new Graph();
g.addUndirectedEdge("A", "B");
g.addUndirectedEdge("A", "C");
const n = g.getNeighbors("A").sort();
assertEquals(JSON.stringify(n), JSON.stringify(["B","C"]));`,
        },
        {
          name: "getNeighbors returns [] for missing node",
          code: `const g = new Graph();
assertEquals(JSON.stringify(g.getNeighbors("Z")), JSON.stringify([]));`,
        },
        {
          name: "degree returns correct count",
          code: `const g = new Graph();
g.addUndirectedEdge("A", "B");
g.addUndirectedEdge("A", "C");
assertEquals(g.degree("A"), 2);`,
        },
        {
          name: "degree returns 0 for missing node",
          code: `const g = new Graph();
assertEquals(g.degree("Z"), 0);`,
        },
      ],
    },
    {
      slug: "bfs",
      title: "Breadth-First Search (BFS)",
      blurb: "Explore a graph level-by-level using a queue.",
      xp: 50,
      content: `# Breadth-First Search (BFS)

BFS explores a graph **level by level** — first all nodes 1 hop away, then 2
hops, then 3, and so on.  It uses a **queue** (FIFO).

\`\`\`
Start at source → enqueue it → mark visited
While queue not empty:
  dequeue a node → record it → enqueue each unvisited neighbor → mark them visited
\`\`\`

\`\`\`js
function bfs(graph, start) {
  const visited = new Set([start]);
  const queue = [start];
  const order = [];
  while (queue.length > 0) {
    const node = queue.shift();   // dequeue from front
    order.push(node);
    for (const neighbor of graph.get(node) ?? []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);     // enqueue at back
      }
    }
  }
  return order;
}
\`\`\`

> **Interview tip:** \`queue.shift()\` is O(n) for a plain array.  For
> performance-critical code use a proper queue or pointer trick, but for
> interviews a plain array is fine.

## Your task

Write a standalone function \`bfs(adjacencyList, start)\` that accepts a plain
\`Map\` (adjacency list) and a start node, and returns an array of nodes in BFS
visit order.  Only visit nodes reachable from \`start\`.`,
      starterCode: `function bfs(adjacencyList, start) {
  // use a queue (array) and a visited Set
  // return the array of nodes in BFS visit order
}
`,
      solution: `function bfs(adjacencyList, start) {
  const visited = new Set([start]);
  const queue = [start];
  const order = [];
  while (queue.length > 0) {
    const node = queue.shift();
    order.push(node);
    for (const neighbor of adjacencyList.get(node) ?? []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  return order;
}`,
      tests: [
        {
          name: "BFS from A visits all reachable nodes",
          code: `const g = new Map([
  ["A", ["B", "C"]],
  ["B", ["A", "D"]],
  ["C", ["A"]],
  ["D", ["B"]],
]);
const result = bfs(g, "A");
assertEquals(JSON.stringify(result.sort()), JSON.stringify(["A","B","C","D"]));`,
        },
        {
          name: "BFS respects level order: A before its neighbors",
          code: `const g = new Map([
  ["A", ["B", "C"]],
  ["B", ["D"]],
  ["C", []],
  ["D", []],
]);
const result = bfs(g, "A");
assertEquals(result[0], "A");
assert(result.indexOf("B") < result.indexOf("D"), "B should come before D");`,
        },
        {
          name: "BFS on single node",
          code: `const g = new Map([["X", []]]);
assertEquals(JSON.stringify(bfs(g, "X")), JSON.stringify(["X"]));`,
        },
        {
          name: "BFS does not visit unreachable nodes",
          code: `const g = new Map([
  ["A", ["B"]],
  ["B", []],
  ["C", []],
]);
const result = bfs(g, "A");
assert(!result.includes("C"), "C is not reachable from A");`,
        },
      ],
      hints: [
        "Initialize `visited = new Set([start])` and `queue = [start]` before the loop.",
        "Use `queue.shift()` to dequeue and `queue.push(neighbor)` to enqueue.",
        "Only add a neighbor to the queue if it is NOT already in `visited` — add it to `visited` at the same time you enqueue it.",
      ],
      explanation: `Marking nodes visited **when enqueued** (not when dequeued) is critical.
If you wait until dequeue to mark them, the same node can be enqueued multiple times,
causing redundant work or infinite loops on cyclic graphs.`,
    },
    {
      slug: "dfs",
      title: "Depth-First Search (DFS)",
      blurb: "Dive deep along one path before backtracking.",
      xp: 50,
      content: `# Depth-First Search (DFS)

DFS explores as **deep as possible** along each branch before backtracking.
There are two common implementations:

### Recursive DFS
\`\`\`js
function dfsRecursive(graph, node, visited = new Set()) {
  visited.add(node);
  for (const neighbor of graph.get(node) ?? []) {
    if (!visited.has(neighbor)) dfsRecursive(graph, neighbor, visited);
  }
  return [...visited];
}
\`\`\`

### Iterative DFS (uses a **stack**)
\`\`\`js
function dfs(graph, start) {
  const visited = new Set();
  const stack = [start];
  const order = [];
  while (stack.length > 0) {
    const node = stack.pop();   // pop from top
    if (visited.has(node)) continue;
    visited.add(node);
    order.push(node);
    for (const neighbor of graph.get(node) ?? []) {
      if (!visited.has(neighbor)) stack.push(neighbor);
    }
  }
  return order;
}
\`\`\`

The key difference from BFS: use a **stack** (push/pop) instead of a queue (push/shift).

## Your task

Write an **iterative** \`dfs(adjacencyList, start)\` that returns the array of
nodes in DFS visit order, using a stack.  Only visit nodes reachable from
\`start\`.`,
      starterCode: `function dfs(adjacencyList, start) {
  // use a stack (array with push/pop) and a visited Set
  // return the array of nodes in DFS visit order
}
`,
      solution: `function dfs(adjacencyList, start) {
  const visited = new Set();
  const stack = [start];
  const order = [];
  while (stack.length > 0) {
    const node = stack.pop();
    if (visited.has(node)) continue;
    visited.add(node);
    order.push(node);
    for (const neighbor of adjacencyList.get(node) ?? []) {
      if (!visited.has(neighbor)) {
        stack.push(neighbor);
      }
    }
  }
  return order;
}`,
      tests: [
        {
          name: "DFS visits all reachable nodes",
          code: `const g = new Map([
  ["A", ["B", "C"]],
  ["B", ["A", "D"]],
  ["C", ["A"]],
  ["D", ["B"]],
]);
const result = dfs(g, "A");
assertEquals(JSON.stringify(result.sort()), JSON.stringify(["A","B","C","D"]));`,
        },
        {
          name: "DFS starts at start node",
          code: `const g = new Map([
  ["A", ["B"]],
  ["B", ["C"]],
  ["C", []],
]);
const result = dfs(g, "A");
assertEquals(result[0], "A");`,
        },
        {
          name: "DFS on single node",
          code: `const g = new Map([["Z", []]]);
assertEquals(JSON.stringify(dfs(g, "Z")), JSON.stringify(["Z"]));`,
        },
        {
          name: "DFS does not visit unreachable nodes",
          code: `const g = new Map([
  ["A", ["B"]],
  ["B", []],
  ["C", []],
]);
const result = dfs(g, "A");
assert(!result.includes("C"), "C is not reachable from A");`,
        },
      ],
      hints: [
        "Use `stack.pop()` (not `shift`) — that's what makes it DFS not BFS.",
        "In iterative DFS, mark a node visited when you **pop** it (after the `continue` check), not when you push it.",
        "Check `if (visited.has(node)) continue;` right after the pop to skip already-visited nodes.",
      ],
      explanation: `Iterative DFS marks nodes visited **at pop time** (after the \`continue\` guard),
unlike BFS which marks at enqueue time.  That's why neighbors are pushed even if they
might already be visited — the \`continue\` guard handles duplicates on the stack safely.`,
    },
    {
      slug: "has-path",
      title: "Has Path — BFS Edition",
      blurb: "Determine whether two nodes are connected.",
      xp: 40,
      content: `# Has Path — BFS Edition

A fundamental graph question: **is there a path from node A to node B?**

We can answer it with a small modification to BFS: return \`true\` as soon as we
dequeue the target, or \`false\` if the queue empties without finding it.

\`\`\`js
function hasPath(graph, start, end) {
  if (start === end) return true;
  const visited = new Set([start]);
  const queue = [start];
  while (queue.length > 0) {
    const node = queue.shift();
    if (node === end) return true;
    for (const neighbor of graph.get(node) ?? []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  return false;
}
\`\`\`

## Your task

Write \`hasPath(adjacencyList, start, end)\` that returns \`true\` if there is a
path (of any length) from \`start\` to \`end\` in the directed graph, or \`false\`
otherwise.  A node is considered reachable from itself.`,
      starterCode: `function hasPath(adjacencyList, start, end) {
  // BFS from start; return true if end is reached, false if queue empties
}
`,
      solution: `function hasPath(adjacencyList, start, end) {
  if (start === end) return true;
  const visited = new Set([start]);
  const queue = [start];
  while (queue.length > 0) {
    const node = queue.shift();
    if (node === end) return true;
    for (const neighbor of adjacencyList.get(node) ?? []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  return false;
}`,
      tests: [
        {
          name: "direct neighbor is reachable",
          code: `const g = new Map([["A",["B"]],["B",[]]]);
assertEquals(hasPath(g, "A", "B"), true);`,
        },
        {
          name: "multi-hop path is reachable",
          code: `const g = new Map([["A",["B"]],["B",["C"]],["C",[]]]);
assertEquals(hasPath(g, "A", "C"), true);`,
        },
        {
          name: "unreachable node returns false",
          code: `const g = new Map([["A",["B"]],["B",[]],["C",[]]]);
assertEquals(hasPath(g, "A", "C"), false);`,
        },
        {
          name: "start === end returns true",
          code: `const g = new Map([["A",["B"]],["B",[]]]);
assertEquals(hasPath(g, "A", "A"), true);`,
        },
        {
          name: "directed: reverse direction is not reachable",
          code: `const g = new Map([["A",["B"]],["B",[]]]);
assertEquals(hasPath(g, "B", "A"), false);`,
        },
      ],
      hints: [
        "Handle the `start === end` edge case first — return `true` immediately.",
        "This is almost identical to BFS. The only difference is the early-return `if (node === end) return true;` inside the loop.",
      ],
    },
    {
      slug: "cycle-detection",
      title: "Detect a Cycle (Undirected Graph)",
      blurb: "Find whether a graph contains a loop using DFS coloring.",
      xp: 50,
      content: `# Detect a Cycle in an Undirected Graph

A **cycle** exists when you can start at a node and return to it by following edges.

### DFS approach with parent tracking

For undirected graphs, the trick is to track the **parent** (where you came from)
so you don't mistake the back-edge to the parent as a cycle.

\`\`\`js
function hasCycle(graph) {
  const visited = new Set();

  function dfsVisit(node, parent) {
    visited.add(node);
    for (const neighbor of graph.get(node) ?? []) {
      if (!visited.has(neighbor)) {
        if (dfsVisit(neighbor, node)) return true;
      } else if (neighbor !== parent) {
        return true; // visited neighbor that isn't our parent = cycle
      }
    }
    return false;
  }

  for (const node of graph.keys()) {
    if (!visited.has(node)) {
      if (dfsVisit(node, null)) return true;
    }
  }
  return false;
}
\`\`\`

The outer loop handles **disconnected graphs** (multiple components).

## Your task

Write \`hasCycle(adjacencyList)\` that returns \`true\` if the **undirected** graph
(passed as a \`Map\`) contains a cycle, or \`false\` if it is acyclic (a forest/tree).`,
      starterCode: `function hasCycle(adjacencyList) {
  // DFS with parent tracking across all components
  // return true if any cycle exists, false otherwise
}
`,
      solution: `function hasCycle(adjacencyList) {
  const visited = new Set();

  function dfsVisit(node, parent) {
    visited.add(node);
    for (const neighbor of adjacencyList.get(node) ?? []) {
      if (!visited.has(neighbor)) {
        if (dfsVisit(neighbor, node)) return true;
      } else if (neighbor !== parent) {
        return true;
      }
    }
    return false;
  }

  for (const node of adjacencyList.keys()) {
    if (!visited.has(node)) {
      if (dfsVisit(node, null)) return true;
    }
  }
  return false;
}`,
      tests: [
        {
          name: "triangle graph has a cycle",
          code: `const g = new Map([
  ["A", ["B", "C"]],
  ["B", ["A", "C"]],
  ["C", ["A", "B"]],
]);
assertEquals(hasCycle(g), true);`,
        },
        {
          name: "simple path (no cycle)",
          code: `const g = new Map([
  ["A", ["B"]],
  ["B", ["A", "C"]],
  ["C", ["B"]],
]);
assertEquals(hasCycle(g), false);`,
        },
        {
          name: "single isolated node has no cycle",
          code: `const g = new Map([["A", []]]);
assertEquals(hasCycle(g), false);`,
        },
        {
          name: "disconnected graph with one cyclic component",
          code: `const g = new Map([
  ["A", ["B"]],
  ["B", ["A"]],
  ["C", ["D", "E"]],
  ["D", ["C", "E"]],
  ["E", ["C", "D"]],
]);
assertEquals(hasCycle(g), true);`,
        },
        {
          name: "two-node pair (no cycle)",
          code: `const g = new Map([["X", ["Y"]], ["Y", ["X"]]]);
assertEquals(hasCycle(g), false);`,
        },
      ],
      hints: [
        "Define an inner `dfsVisit(node, parent)` function that returns `true` if it detects a cycle.",
        "A visited neighbor is only a cycle if it is NOT the parent you just came from — check `neighbor !== parent`.",
        "Wrap `dfsVisit` in a `for...of` loop over all nodes to handle disconnected components.",
      ],
      explanation: `The parent check is the key insight: in an undirected graph, every edge A–B creates
a back-edge in both directions.  When DFS visits B from A, B's adjacency list includes A.
Without tracking the parent, we'd incorrectly flag A as a "cycle."
The \`neighbor !== parent\` guard filters out this trivial back-edge.`,
    },
    {
      slug: "shortest-path-bfs",
      title: "Shortest Path with BFS",
      blurb: "BFS naturally finds the fewest-hops path in an unweighted graph.",
      xp: 45,
      content: `# Shortest Path with BFS

In an **unweighted** graph, BFS is guaranteed to find the **shortest path**
(fewest edges) between two nodes, because it explores all nodes at distance
\`k\` before any at distance \`k+1\`.

To reconstruct the path, track each node's **predecessor** in a \`Map\`:

\`\`\`js
function shortestPath(graph, start, end) {
  if (start === end) return [start];
  const prev = new Map([[start, null]]);
  const queue = [start];
  while (queue.length > 0) {
    const node = queue.shift();
    for (const neighbor of graph.get(node) ?? []) {
      if (!prev.has(neighbor)) {
        prev.set(neighbor, node);    // record who we came from
        if (neighbor === end) {
          // reconstruct path by walking prev backwards
          const path = [];
          let cur = end;
          while (cur !== null) { path.push(cur); cur = prev.get(cur); }
          return path.reverse();
        }
        queue.push(neighbor);
      }
    }
  }
  return null; // no path
}
\`\`\`

## Your task

Write \`shortestPath(adjacencyList, start, end)\` that returns an array of node
values representing the shortest path from \`start\` to \`end\` (inclusive), or
\`null\` if no path exists.  If \`start === end\`, return \`[start]\`.`,
      starterCode: `function shortestPath(adjacencyList, start, end) {
  // BFS with predecessor map
  // return path array (start → ... → end), or null if unreachable
}
`,
      solution: `function shortestPath(adjacencyList, start, end) {
  if (start === end) return [start];
  const prev = new Map([[start, null]]);
  const queue = [start];
  while (queue.length > 0) {
    const node = queue.shift();
    for (const neighbor of adjacencyList.get(node) ?? []) {
      if (!prev.has(neighbor)) {
        prev.set(neighbor, node);
        if (neighbor === end) {
          const path = [];
          let cur = end;
          while (cur !== null) {
            path.push(cur);
            cur = prev.get(cur);
          }
          return path.reverse();
        }
        queue.push(neighbor);
      }
    }
  }
  return null;
}`,
      tests: [
        {
          name: "direct neighbor: path length 2",
          code: `const g = new Map([["A",["B","C"]],["B",[]],["C",[]]]);
assertEquals(JSON.stringify(shortestPath(g,"A","B")), JSON.stringify(["A","B"]));`,
        },
        {
          name: "multi-hop shortest path",
          code: `const g = new Map([
  ["A",["B","C"]],
  ["B",["D"]],
  ["C",["D"]],
  ["D",[]],
]);
const p = shortestPath(g, "A", "D");
assertEquals(p.length, 3);
assertEquals(p[0], "A");
assertEquals(p[p.length-1], "D");`,
        },
        {
          name: "start === end returns [start]",
          code: `const g = new Map([["A",["B"]],["B",[]]]);
assertEquals(JSON.stringify(shortestPath(g,"A","A")), JSON.stringify(["A"]));`,
        },
        {
          name: "unreachable node returns null",
          code: `const g = new Map([["A",["B"]],["B",[]],["C",[]]]);
assertEquals(shortestPath(g,"A","C"), null);`,
        },
      ],
      hints: [
        "Use `prev = new Map([[start, null]])` as both your visited tracker AND predecessor map — checking `prev.has(neighbor)` replaces the visited set.",
        "Once you find the target, walk backwards: `let cur = end; while (cur !== null) { path.push(cur); cur = prev.get(cur); }` then reverse.",
      ],
      explanation: `Using \`prev\` as the visited tracker is a clean two-for-one: you avoid a separate \`visited\` Set,
and you have everything needed to reconstruct the path.
BFS guarantees that the first time a node is discovered (added to \`prev\`), it is via the shortest route.`,
    },
  ],
};
