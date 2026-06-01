import type { Module } from "./types";

// Data Structures — the containers every program is built from. Implemented and
// auto-graded in plain JS so the concepts stick.
export const dataStructures: Module = {
  slug: "data-structures",
  title: "Data Structures",
  description:
    "Stacks, queues, linked lists, hash maps, sets, and trees — the building blocks behind every program. Implement them yourself to truly understand them.",
  emoji: "🗃️",
  gradient: "from-orange-400/20 to-rose-500/10",
  tagline:
    "Implement queues, linked lists, hash maps, sets and trees from scratch in JavaScript.",
  lessons: [
    {
      slug: "queue",
      title: "Build a Queue",
      blurb: "First in, first out.",
      xp: 35,
      content: `# Build a Queue

A **queue** is FIFO — first in, first out, like a line at a coffee shop. You
\`enqueue\` to the back and \`dequeue\` from the front.

\`\`\`js
const q = new Queue();
q.enqueue("a");
q.dequeue(); // "a"
\`\`\`

## Your task
Build a class \`Queue\` with \`enqueue(x)\`, \`dequeue()\` (removes and returns the
front item), and a \`size\` getter.`,
      starterCode: `class Queue {
  // constructor, enqueue(x), dequeue(), size getter
}
`,
      solution: `class Queue {
  constructor() {
    this.items = [];
  }
  enqueue(x) {
    this.items.push(x);
  }
  dequeue() {
    return this.items.shift();
  }
  get size() {
    return this.items.length;
  }
}`,
      tests: [
        {
          name: "FIFO order",
          code: `const q = new Queue(); q.enqueue(1); q.enqueue(2); assertEquals(q.dequeue(), 1); assertEquals(q.size, 1);`,
        },
        { name: "starts empty", code: `const q = new Queue(); assertEquals(q.size, 0);` },
      ],
    },
    {
      slug: "unique-with-set",
      title: "Deduplicate with a Set",
      blurb: "Sets hold each value once.",
      xp: 35,
      content: `# Deduplicate with a Set

A **Set** stores unique values. Wrapping an array in a \`Set\` and spreading it
back out is the cleanest way to remove duplicates while preserving order.

\`\`\`js
[...new Set([1, 1, 2])]; // [1, 2]
\`\`\`

## Your task
Write \`unique(arr)\` returning a new array with duplicates removed, order
preserved.`,
      starterCode: `function unique(arr) {
  // remove duplicates using a Set
}
`,
      solution: `function unique(arr) {
  return [...new Set(arr)];
}`,
      tests: [
        { name: "numbers", code: `assertEquals(unique([1, 2, 2, 3, 3, 3]), [1, 2, 3]);` },
        { name: "empty", code: `assertEquals(unique([]), []);` },
        { name: "strings", code: `assertEquals(unique(["a", "a", "b"]), ["a", "b"]);` },
      ],
    },
    {
      slug: "set-intersection",
      title: "Set Intersection",
      blurb: "What two collections share.",
      xp: 40,
      content: `# Set Intersection

Find the items present in **both** arrays. Put one array in a \`Set\` for O(1)
lookups, then filter the other by membership.

## Your task
Write \`intersection(a, b)\` returning the values that appear in both arrays, in
the order they appear in \`a\`, without duplicates from \`a\`'s perspective.`,
      starterCode: `function intersection(a, b) {
  // return values present in both a and b
}
`,
      solution: `function intersection(a, b) {
  const setB = new Set(b);
  return a.filter((x) => setB.has(x));
}`,
      tests: [
        { name: "overlap", code: `assertEquals(intersection([1, 2, 3], [2, 3, 4]), [2, 3]);` },
        { name: "no overlap", code: `assertEquals(intersection([1, 2], [3, 4]), []);` },
      ],
    },
    {
      slug: "frequency-map",
      title: "Frequency Counter",
      blurb: "How many times does each item appear?",
      xp: 40,
      content: `# Frequency Counter

Counting occurrences is one of the most useful patterns in programming. Build a
plain object mapping each value to its count.

## Your task
Write \`frequencies(arr)\` returning an object whose keys are the items and whose
values are how many times each appears.`,
      starterCode: `function frequencies(arr) {
  // count how many times each item appears
}
`,
      solution: `function frequencies(arr) {
  const out = {};
  for (const x of arr) {
    out[x] = (out[x] || 0) + 1;
  }
  return out;
}`,
      tests: [
        { name: "letters", code: `assertEquals(frequencies(["a", "b", "a"]), { a: 2, b: 1 });` },
        { name: "empty", code: `assertEquals(frequencies([]), {});` },
        { name: "repeats", code: `assertEquals(frequencies([1, 1, 1]), { 1: 3 });` },
      ],
    },
    {
      slug: "group-by",
      title: "Group By",
      blurb: "Bucket items by a key.",
      xp: 45,
      content: `# Group By

A workhorse of data wrangling: split a list into buckets keyed by some function
of each item (e.g. group people by city).

## Your task
Write \`groupBy(arr, keyFn)\` returning an object mapping each key (the result of
\`keyFn(item)\`) to the array of items with that key, in their original order.`,
      starterCode: `function groupBy(arr, keyFn) {
  // bucket items by keyFn(item)
}
`,
      solution: `function groupBy(arr, keyFn) {
  const out = {};
  for (const item of arr) {
    const key = keyFn(item);
    if (!out[key]) out[key] = [];
    out[key].push(item);
  }
  return out;
}`,
      tests: [
        {
          name: "odd / even",
          code: `assertEquals(groupBy([1, 2, 3, 4], (n) => (n % 2 === 0 ? "even" : "odd")), { odd: [1, 3], even: [2, 4] });`,
        },
        {
          name: "by first letter",
          code: `assertEquals(groupBy(["apple", "banana", "avocado"], (s) => s[0]), { a: ["apple", "avocado"], b: ["banana"] });`,
        },
      ],
    },
    {
      slug: "linked-list",
      title: "Linked List",
      blurb: "Nodes that point to the next node.",
      xp: 50,
      content: `# Linked List

A **linked list** is a chain of nodes, each holding a value and a pointer to the
\`next\` node. Unlike arrays, there's no index — you follow the chain.

\`\`\`js
{ value: 1, next: { value: 2, next: null } }
\`\`\`

## Your task
Build a class \`LinkedList\` with \`push(value)\` (append to the end) and
\`toArray()\` (return all values in order as an array).`,
      starterCode: `class LinkedList {
  // constructor (head = null), push(value), toArray()
}
`,
      solution: `class LinkedList {
  constructor() {
    this.head = null;
  }
  push(value) {
    const node = { value, next: null };
    if (!this.head) {
      this.head = node;
      return;
    }
    let cur = this.head;
    while (cur.next) cur = cur.next;
    cur.next = node;
  }
  toArray() {
    const out = [];
    let cur = this.head;
    while (cur) {
      out.push(cur.value);
      cur = cur.next;
    }
    return out;
  }
}`,
      tests: [
        {
          name: "push then toArray",
          code: `const l = new LinkedList(); l.push(1); l.push(2); l.push(3); assertEquals(l.toArray(), [1, 2, 3]);`,
        },
        { name: "empty list", code: `const l = new LinkedList(); assertEquals(l.toArray(), []);` },
      ],
    },
    {
      slug: "tree-sum",
      title: "Sum a Binary Tree",
      blurb: "Recursion over a tree.",
      xp: 50,
      content: `# Sum a Binary Tree

A **binary tree** node has a \`value\` and up to two children, \`left\` and
\`right\` (each a node or \`null\`). Recursion is the natural tool: a node's total
is its value plus the totals of both subtrees.

\`\`\`js
{ value: 1, left: { value: 2, left: null, right: null }, right: null }
\`\`\`

## Your task
Write \`treeSum(node)\` returning the sum of all values. An empty tree
(\`null\`) sums to \`0\`.`,
      starterCode: `function treeSum(node) {
  // base case for null, then recurse into left and right
}
`,
      solution: `function treeSum(node) {
  if (!node) return 0;
  return node.value + treeSum(node.left) + treeSum(node.right);
}`,
      tests: [
        { name: "empty → 0", code: `assertEquals(treeSum(null), 0);` },
        {
          name: "single node",
          code: `assertEquals(treeSum({ value: 1, left: null, right: null }), 1);`,
        },
        {
          name: "three nodes → 6",
          code: `assertEquals(treeSum({ value: 1, left: { value: 2, left: null, right: null }, right: { value: 3, left: null, right: null } }), 6);`,
        },
      ],
    },
    {
      slug: "matrix-transpose",
      title: "Transpose a Matrix",
      blurb: "Flip rows and columns.",
      xp: 45,
      content: `# Transpose a Matrix

Transposing turns rows into columns: the value at \`[r][c]\` moves to \`[c][r]\`.
A 2×3 matrix becomes 3×2.

\`\`\`js
[[1, 2, 3],
 [4, 5, 6]]
// transposes to
[[1, 4],
 [2, 5],
 [3, 6]]
\`\`\`

## Your task
Write \`transpose(matrix)\` returning the transposed matrix. An empty matrix
returns \`[]\`.`,
      starterCode: `function transpose(matrix) {
  // turn rows into columns
}
`,
      solution: `function transpose(matrix) {
  if (matrix.length === 0) return [];
  return matrix[0].map((_, col) => matrix.map((row) => row[col]));
}`,
      tests: [
        {
          name: "2x3 → 3x2",
          code: `assertEquals(transpose([[1, 2, 3], [4, 5, 6]]), [[1, 4], [2, 5], [3, 6]]);`,
        },
        { name: "1x1", code: `assertEquals(transpose([[1]]), [[1]]);` },
        { name: "empty", code: `assertEquals(transpose([]), []);` },
      ],
    },
  ],
};
