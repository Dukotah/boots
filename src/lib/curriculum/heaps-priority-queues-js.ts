import type { Module } from "./types";

// Heaps & Priority Queues in JavaScript — build a min/max heap from scratch,
// then wrap it in a clean priority-queue API. Core interview pattern and
// prerequisite for Dijkstra's algorithm.
export const heapsPriorityQueuesJs: Module = {
  slug: "heaps-priority-queues-js",
  title: "Heaps & Priority Queues in JavaScript",
  description:
    "Build a min-heap and max-heap from scratch using array indexing, implement heapify-up and heapify-down, then wrap everything in a clean PriorityQueue class — the essential data structure behind Dijkstra, task schedulers, and top-K interview problems.",
  emoji: "⛏️",
  gradient: "from-orange-400/20 to-amber-500/10",
  tagline:
    "Learn heaps and priority queues in JavaScript: build min/max heaps, heapify, and a full PriorityQueue class for interviews.",
  language: "js",
  keywords: [
    "heap javascript",
    "priority queue javascript",
    "min heap javascript",
    "max heap javascript",
    "heapify javascript",
    "dijkstra prerequisite",
    "interview data structures",
  ],
  lessons: [
    {
      slug: "heap-array-indexing",
      title: "The Heap's Secret: Array Indexing",
      blurb: "A heap is just an array — no pointers needed.",
      xp: 25,
      content: `# The Heap's Secret: Array Indexing

A **heap** looks like a binary tree, but it is stored as a plain array.  The
relationships between nodes are expressed with index arithmetic — no \`left\` or
\`right\` pointers required.

For a node at index \`i\` (0-based):

| Relationship | Formula |
|---|---|
| Left child  | \`2 * i + 1\` |
| Right child | \`2 * i + 2\` |
| Parent      | \`Math.floor((i - 1) / 2)\` |

\`\`\`js
// Heap array: [1, 3, 2, 7, 4, 5, 6]
//
//        1         ← index 0
//       / \\
//      3   2       ← indices 1, 2
//     / \\ / \\
//    7  4 5  6     ← indices 3, 4, 5, 6
\`\`\`

## Your task

Implement three pure functions:
- \`leftChild(i)\` — returns the index of the left child of node \`i\`
- \`rightChild(i)\` — returns the index of the right child of node \`i\`
- \`parent(i)\` — returns the index of the parent of node \`i\``,
      starterCode: `function leftChild(i) {
  // TODO
}

function rightChild(i) {
  // TODO
}

function parent(i) {
  // TODO
}
`,
      solution: `function leftChild(i) {
  return 2 * i + 1;
}

function rightChild(i) {
  return 2 * i + 2;
}

function parent(i) {
  return Math.floor((i - 1) / 2);
}`,
      tests: [
        {
          name: "leftChild(0) === 1",
          code: `assertEquals(leftChild(0), 1);`,
        },
        {
          name: "leftChild(1) === 3",
          code: `assertEquals(leftChild(1), 3);`,
        },
        {
          name: "rightChild(0) === 2",
          code: `assertEquals(rightChild(0), 2);`,
        },
        {
          name: "rightChild(2) === 6",
          code: `assertEquals(rightChild(2), 6);`,
        },
        {
          name: "parent(1) === 0",
          code: `assertEquals(parent(1), 0);`,
        },
        {
          name: "parent(2) === 0",
          code: `assertEquals(parent(2), 0);`,
        },
        {
          name: "parent(6) === 2",
          code: `assertEquals(parent(6), 2);`,
        },
      ],
      explanation: `The formulas are derived from the complete binary tree structure: each level doubles the node count, so left child of node \`i\` lands at \`2*i+1\` and right at \`2*i+2\`. Parent reverses that: \`(i-1)/2\` floored.`,
    },
    {
      slug: "min-heap-property",
      title: "The Min-Heap Property",
      blurb: "Every parent is smaller than or equal to its children.",
      xp: 25,
      content: `# The Min-Heap Property

A **min-heap** enforces one invariant: every node is **≤ both its children**.
The root is always the minimum element.

\`\`\`js
// Valid min-heap:    [1, 3, 2, 7, 4, 5, 6]
// Invalid (3 > 2 child-parent relationship broken):
//                    [3, 1, 2, 7, 4, 5, 6]
\`\`\`

To check validity we verify the property at every index that has a parent.

## Your task

Write \`isMinHeap(arr)\` that returns \`true\` if \`arr\` satisfies the min-heap
property, \`false\` otherwise.

Every element at index \`i > 0\` must satisfy:
\`arr[parent(i)] <= arr[i]\`

You can inline the parent formula or define a helper.`,
      starterCode: `function isMinHeap(arr) {
  // Check that every non-root node satisfies arr[parent] <= arr[i]
}
`,
      solution: `function isMinHeap(arr) {
  for (let i = 1; i < arr.length; i++) {
    const p = Math.floor((i - 1) / 2);
    if (arr[p] > arr[i]) return false;
  }
  return true;
}`,
      tests: [
        {
          name: "valid min-heap returns true",
          code: `assertEquals(isMinHeap([1, 3, 2, 7, 4, 5, 6]), true);`,
        },
        {
          name: "invalid heap returns false",
          code: `assertEquals(isMinHeap([3, 1, 2]), false);`,
        },
        {
          name: "single element is valid",
          code: `assertEquals(isMinHeap([42]), true);`,
        },
        {
          name: "empty array is valid",
          code: `assertEquals(isMinHeap([]), true);`,
        },
        {
          name: "two-element valid",
          code: `assertEquals(isMinHeap([1, 5]), true);`,
        },
        {
          name: "two-element invalid",
          code: `assertEquals(isMinHeap([5, 1]), false);`,
        },
      ],
      explanation: `We only need to walk from index 1 upward. Each node's parent is at \`floor((i-1)/2)\`. If any parent is strictly greater than its child, the min-heap property is broken.`,
    },
    {
      slug: "heapify-up",
      title: "Heapify-Up (Bubble Up)",
      blurb: "Restore the heap after inserting a new element.",
      xp: 40,
      content: `# Heapify-Up (Bubble Up)

When we **insert** into a min-heap, we append the new value to the end of the
array, then repeatedly swap it with its parent while it is smaller than its
parent.  This is called **heapify-up** (or "bubble up" / "sift up").

\`\`\`
Insert 0 into [1, 3, 2, 7, 4, 5, 6]:
  → [1, 3, 2, 7, 4, 5, 6, 0]   (append at index 7)
  → parent(7) = 3  →  arr[3]=7 > 0  →  swap
  → [1, 3, 2, 0, 4, 5, 6, 7]
  → parent(3) = 1  →  arr[1]=3 > 0  →  swap
  → [1, 0, 2, 3, 4, 5, 6, 7]
  → parent(1) = 0  →  arr[0]=1 > 0  →  swap
  → [0, 1, 2, 3, 4, 5, 6, 7]   ✓
\`\`\`

## Your task

Write \`heapInsert(heap, value)\` that:
1. Pushes \`value\` to the end of \`heap\` (mutates in place).
2. Runs heapify-up from the last index until the heap property is restored.
3. Returns the modified \`heap\` array.`,
      starterCode: `function heapInsert(heap, value) {
  // 1. Append value
  // 2. Bubble up
  // 3. Return heap
}
`,
      solution: `function heapInsert(heap, value) {
  heap.push(value);
  let i = heap.length - 1;
  while (i > 0) {
    const p = Math.floor((i - 1) / 2);
    if (heap[p] <= heap[i]) break;
    [heap[p], heap[i]] = [heap[i], heap[p]];
    i = p;
  }
  return heap;
}`,
      tests: [
        {
          name: "insert into empty heap",
          code: `assertEquals(JSON.stringify(heapInsert([], 5)), JSON.stringify([5]));`,
        },
        {
          name: "insert smaller value bubbles to root",
          code: `const h = [3]; heapInsert(h, 1); assertEquals(h[0], 1);`,
        },
        {
          name: "heap property preserved after insert",
          code: `
const h = [1, 3, 2, 7, 4, 5, 6];
heapInsert(h, 0);
// verify min-heap property
let valid = true;
for (let i = 1; i < h.length; i++) {
  const p = Math.floor((i - 1) / 2);
  if (h[p] > h[i]) { valid = false; break; }
}
assertEquals(valid, true);
`,
        },
        {
          name: "insert larger value stays at bottom",
          code: `const h = [1, 3, 2]; heapInsert(h, 10); assertEquals(h[0], 1);`,
        },
      ],
      explanation: `After appending, we walk up the tree swapping with the parent whenever the child is smaller. The loop stops when we reach the root (\`i === 0\`) or the parent is already \`<=\` the child.`,
    },
    {
      slug: "heapify-down",
      title: "Heapify-Down (Sink Down)",
      blurb: "Restore the heap after removing the minimum.",
      xp: 45,
      content: `# Heapify-Down (Sink Down)

To **extract the minimum** (the root), we:
1. Swap the root with the **last** element.
2. Pop (remove) the last element — that is our answer.
3. **Heapify-down**: repeatedly swap the new root with its **smaller child**
   until it is smaller than both children (or has no children).

\`\`\`
Extract min from [1, 3, 2, 7, 4, 5, 6]:
  → swap root with last: [6, 3, 2, 7, 4, 5, 1]  then pop 1
  → heap = [6, 3, 2, 7, 4, 5]
  → children of 0: arr[1]=3, arr[2]=2  → smaller is 2 at index 2 → swap
  → [2, 3, 6, 7, 4, 5]
  → children of 2: arr[5]=5, no right child in range → 5 < 6 → swap
  → [2, 3, 5, 7, 4, 6]  ✓ min-heap restored
\`\`\`

## Your task

Write \`heapExtractMin(heap)\` that:
1. Saves \`heap[0]\` as the result.
2. Moves the last element to position 0 and pops the end.
3. Heapify-down from index 0.
4. Returns the saved minimum value (or \`undefined\` if heap is empty).`,
      starterCode: `function heapExtractMin(heap) {
  // Handle empty
  // Swap root with last, pop
  // Heapify-down
  // Return min
}
`,
      solution: `function heapExtractMin(heap) {
  if (heap.length === 0) return undefined;
  const min = heap[0];
  const last = heap.pop();
  if (heap.length > 0) {
    heap[0] = last;
    let i = 0;
    while (true) {
      const l = 2 * i + 1;
      const r = 2 * i + 2;
      let smallest = i;
      if (l < heap.length && heap[l] < heap[smallest]) smallest = l;
      if (r < heap.length && heap[r] < heap[smallest]) smallest = r;
      if (smallest === i) break;
      [heap[i], heap[smallest]] = [heap[smallest], heap[i]];
      i = smallest;
    }
  }
  return min;
}`,
      tests: [
        {
          name: "extract from single-element heap",
          code: `assertEquals(heapExtractMin([5]), 5);`,
        },
        {
          name: "returns undefined for empty heap",
          code: `assertEquals(heapExtractMin([]), undefined);`,
        },
        {
          name: "extracts minimum value",
          code: `assertEquals(heapExtractMin([1, 3, 2, 7, 4, 5, 6]), 1);`,
        },
        {
          name: "heap property preserved after extraction",
          code: `
const h = [1, 3, 2, 7, 4, 5, 6];
heapExtractMin(h);
let valid = true;
for (let i = 1; i < h.length; i++) {
  const p = Math.floor((i - 1) / 2);
  if (h[p] > h[i]) { valid = false; break; }
}
assertEquals(valid, true);
`,
        },
        {
          name: "repeated extraction gives sorted order",
          code: `
const h = [3, 1, 4, 1, 5, 9, 2, 6];
// build a proper min-heap first by inserting one by one
const heap = [];
function ins(arr, v) {
  arr.push(v);
  let i = arr.length - 1;
  while (i > 0) {
    const p = Math.floor((i - 1) / 2);
    if (arr[p] <= arr[i]) break;
    [arr[p], arr[i]] = [arr[i], arr[p]];
    i = p;
  }
}
h.forEach(v => ins(heap, v));
const out = [];
const n = heap.length;
for (let k = 0; k < n; k++) out.push(heapExtractMin(heap));
assertEquals(JSON.stringify(out), JSON.stringify([1,1,2,3,4,5,6,9]));
`,
        },
      ],
      explanation: `Heapify-down picks the smaller of the two children at each step. If the current node is already the smallest, we stop. Otherwise we swap with the smallest child and continue from that child's position.`,
    },
    {
      slug: "build-heap",
      title: "Build a Heap in O(n)",
      blurb: "Turn any array into a heap faster than repeated insertion.",
      xp: 45,
      content: `# Build a Heap in O(n)

Inserting \`n\` elements one at a time costs **O(n log n)**.  There is a faster
approach: start from the last non-leaf node and heapify-down each one.

\`\`\`
Last non-leaf index = Math.floor(n / 2) - 1
\`\`\`

Because all leaves are already valid one-element heaps, we only need to process
internal nodes — from the bottom up.

\`\`\`js
// buildMinHeap([4, 10, 3, 5, 1]):
//   Start at index 1 (= floor(5/2)-1)
//   Sink down each internal node in reverse order
//   Result: [1, 4, 3, 5, 10]  — valid min-heap
\`\`\`

This runs in **O(n)** (proven via geometric series on work done per level).

## Your task

Write \`buildMinHeap(arr)\` that:
1. Works **in-place** (mutates and returns \`arr\`).
2. Uses the "Floyd's algorithm" approach: loop from \`Math.floor(arr.length / 2) - 1\`
   down to \`0\`, calling a \`siftDown(arr, i)\` helper on each.

Implement both \`siftDown\` and \`buildMinHeap\`.`,
      starterCode: `function siftDown(arr, i) {
  // Heapify-down from index i within arr
}

function buildMinHeap(arr) {
  // Floyd's algorithm: loop from last internal node down to 0
  return arr;
}
`,
      solution: `function siftDown(arr, i) {
  const n = arr.length;
  while (true) {
    const l = 2 * i + 1;
    const r = 2 * i + 2;
    let smallest = i;
    if (l < n && arr[l] < arr[smallest]) smallest = l;
    if (r < n && arr[r] < arr[smallest]) smallest = r;
    if (smallest === i) break;
    [arr[i], arr[smallest]] = [arr[smallest], arr[i]];
    i = smallest;
  }
}

function buildMinHeap(arr) {
  for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
    siftDown(arr, i);
  }
  return arr;
}`,
      tests: [
        {
          name: "buildMinHeap produces valid min-heap",
          code: `
const arr = [4, 10, 3, 5, 1];
buildMinHeap(arr);
let valid = true;
for (let i = 1; i < arr.length; i++) {
  const p = Math.floor((i - 1) / 2);
  if (arr[p] > arr[i]) { valid = false; break; }
}
assertEquals(valid, true);
`,
        },
        {
          name: "root is minimum after buildMinHeap",
          code: `
const arr = [9, 7, 5, 3, 1, 8, 6];
buildMinHeap(arr);
assertEquals(arr[0], 1);
`,
        },
        {
          name: "already sorted array still produces valid heap",
          code: `
const arr = [1, 2, 3, 4, 5];
buildMinHeap(arr);
assertEquals(arr[0], 1);
let valid = true;
for (let i = 1; i < arr.length; i++) {
  const p = Math.floor((i - 1) / 2);
  if (arr[p] > arr[i]) { valid = false; break; }
}
assertEquals(valid, true);
`,
        },
        {
          name: "single element unchanged",
          code: `
const arr = [42];
buildMinHeap(arr);
assertEquals(arr[0], 42);
`,
        },
        {
          name: "empty array unchanged",
          code: `
const arr = [];
buildMinHeap(arr);
assertEquals(arr.length, 0);
`,
        },
      ],
      explanation: `Floyd's algorithm works bottom-up. By the time we sift down a node, both its subtrees are already valid heaps — so sift-down only needs one pass per node. The total work is O(n) because lower levels have more nodes but less work to do.`,
    },
    {
      slug: "priority-queue-class",
      title: "PriorityQueue Class",
      blurb: "Wrap the min-heap in a clean, reusable API.",
      xp: 50,
      content: `# PriorityQueue Class

With \`insert\` and \`extractMin\` working, we can expose a clean class:

\`\`\`js
class PriorityQueue {
  constructor() { this._heap = []; }
  push(value)      { /* heapify-up */ }
  pop()            { /* extractMin + heapify-down */ }
  peek()           { return this._heap[0]; }
  get size()       { return this._heap.length; }
  get isEmpty()    { return this._heap.length === 0; }
}
\`\`\`

This is the data structure used inside Dijkstra's algorithm, Prim's MST,
scheduling systems, and the classic "top-K elements" interview problem.

## Your task

Implement the full \`PriorityQueue\` class with:
- \`push(value)\` — insert with heapify-up
- \`pop()\` — extract minimum with heapify-down, return the value
- \`peek()\` — return the minimum without removing it
- \`size\` getter — number of elements
- \`isEmpty\` getter — \`true\` when empty`,
      starterCode: `class PriorityQueue {
  constructor() {
    this._heap = [];
  }

  push(value) {
    // TODO: append and heapify-up
  }

  pop() {
    // TODO: extract min and heapify-down
  }

  peek() {
    // TODO: return minimum without removing
  }

  get size() {
    // TODO
  }

  get isEmpty() {
    // TODO
  }
}
`,
      solution: `class PriorityQueue {
  constructor() {
    this._heap = [];
  }

  push(value) {
    this._heap.push(value);
    let i = this._heap.length - 1;
    while (i > 0) {
      const p = Math.floor((i - 1) / 2);
      if (this._heap[p] <= this._heap[i]) break;
      [this._heap[p], this._heap[i]] = [this._heap[i], this._heap[p]];
      i = p;
    }
  }

  pop() {
    if (this._heap.length === 0) return undefined;
    const min = this._heap[0];
    const last = this._heap.pop();
    if (this._heap.length > 0) {
      this._heap[0] = last;
      let i = 0;
      while (true) {
        const l = 2 * i + 1;
        const r = 2 * i + 2;
        let smallest = i;
        if (l < this._heap.length && this._heap[l] < this._heap[smallest]) smallest = l;
        if (r < this._heap.length && this._heap[r] < this._heap[smallest]) smallest = r;
        if (smallest === i) break;
        [this._heap[i], this._heap[smallest]] = [this._heap[smallest], this._heap[i]];
        i = smallest;
      }
    }
    return min;
  }

  peek() {
    return this._heap[0];
  }

  get size() {
    return this._heap.length;
  }

  get isEmpty() {
    return this._heap.length === 0;
  }
}`,
      tests: [
        {
          name: "isEmpty on new queue",
          code: `const pq = new PriorityQueue(); assertEquals(pq.isEmpty, true);`,
        },
        {
          name: "size after pushes",
          code: `const pq = new PriorityQueue(); pq.push(3); pq.push(1); pq.push(2); assertEquals(pq.size, 3);`,
        },
        {
          name: "peek returns minimum",
          code: `const pq = new PriorityQueue(); pq.push(5); pq.push(1); pq.push(3); assertEquals(pq.peek(), 1);`,
        },
        {
          name: "pop returns minimum and removes it",
          code: `const pq = new PriorityQueue(); pq.push(5); pq.push(1); pq.push(3); assertEquals(pq.pop(), 1); assertEquals(pq.size, 2);`,
        },
        {
          name: "pop returns elements in sorted order",
          code: `
const pq = new PriorityQueue();
const vals = [5, 2, 8, 1, 9, 3];
vals.forEach(v => pq.push(v));
const out = [];
for (let k = 0; k < vals.length; k++) out.push(pq.pop());
assertEquals(JSON.stringify(out), JSON.stringify([1,2,3,5,8,9]));
`,
        },
        {
          name: "pop on empty returns undefined",
          code: `const pq = new PriorityQueue(); assertEquals(pq.pop(), undefined);`,
        },
      ],
      explanation: `The class is just a thin wrapper around the heap array. Exposing \`push\`/\`pop\`/\`peek\` hides the internal index arithmetic and gives callers a familiar queue-like interface.`,
    },
    {
      slug: "max-heap",
      title: "Max-Heap: Flip the Comparator",
      blurb: "One sign change converts a min-heap into a max-heap.",
      xp: 40,
      content: `# Max-Heap: Flip the Comparator

A **max-heap** has the opposite property: every parent is **≥** both children,
so the root holds the **maximum** element.

The only change from a min-heap: swap \`<\` for \`>\` in every comparison.

\`\`\`js
// Min-heap bubble-up condition:
if (heap[p] > heap[i]) swap  // move smaller value up

// Max-heap bubble-up condition:
if (heap[p] < heap[i]) swap  // move larger value up
\`\`\`

A common interview trick: to use JavaScript's built-in \`sort\` as a max-heap,
negate values before pushing and negate again when popping (only works for
numbers).

## Your task

Implement \`MaxPriorityQueue\` — same API as before (\`push\`, \`pop\`, \`peek\`,
\`size\`, \`isEmpty\`) but \`pop()\` returns the **maximum** element.`,
      starterCode: `class MaxPriorityQueue {
  constructor() {
    this._heap = [];
  }

  push(value) {
    // append and heapify-up (max version)
  }

  pop() {
    // extract max and heapify-down (max version)
  }

  peek() {
    // return max without removing
  }

  get size() {
    return this._heap.length;
  }

  get isEmpty() {
    return this._heap.length === 0;
  }
}
`,
      solution: `class MaxPriorityQueue {
  constructor() {
    this._heap = [];
  }

  push(value) {
    this._heap.push(value);
    let i = this._heap.length - 1;
    while (i > 0) {
      const p = Math.floor((i - 1) / 2);
      if (this._heap[p] >= this._heap[i]) break;
      [this._heap[p], this._heap[i]] = [this._heap[i], this._heap[p]];
      i = p;
    }
  }

  pop() {
    if (this._heap.length === 0) return undefined;
    const max = this._heap[0];
    const last = this._heap.pop();
    if (this._heap.length > 0) {
      this._heap[0] = last;
      let i = 0;
      while (true) {
        const l = 2 * i + 1;
        const r = 2 * i + 2;
        let largest = i;
        if (l < this._heap.length && this._heap[l] > this._heap[largest]) largest = l;
        if (r < this._heap.length && this._heap[r] > this._heap[largest]) largest = r;
        if (largest === i) break;
        [this._heap[i], this._heap[largest]] = [this._heap[largest], this._heap[i]];
        i = largest;
      }
    }
    return max;
  }

  peek() {
    return this._heap[0];
  }

  get size() {
    return this._heap.length;
  }

  get isEmpty() {
    return this._heap.length === 0;
  }
}`,
      tests: [
        {
          name: "peek returns maximum",
          code: `const pq = new MaxPriorityQueue(); pq.push(3); pq.push(9); pq.push(1); assertEquals(pq.peek(), 9);`,
        },
        {
          name: "pop returns maximum",
          code: `const pq = new MaxPriorityQueue(); pq.push(3); pq.push(9); pq.push(1); assertEquals(pq.pop(), 9);`,
        },
        {
          name: "pop returns elements in descending order",
          code: `
const pq = new MaxPriorityQueue();
const vals = [5, 2, 8, 1, 9, 3];
vals.forEach(v => pq.push(v));
const out = [];
for (let k = 0; k < vals.length; k++) out.push(pq.pop());
assertEquals(JSON.stringify(out), JSON.stringify([9,8,5,3,2,1]));
`,
        },
        {
          name: "size decrements on pop",
          code: `const pq = new MaxPriorityQueue(); pq.push(1); pq.push(2); pq.pop(); assertEquals(pq.size, 1);`,
        },
      ],
      explanation: `Every comparison is flipped. Where the min-heap moves a smaller value up, the max-heap moves a larger value up. The structural logic (indexing, swap, loop) is identical.`,
    },
    {
      slug: "custom-comparator",
      title: "Custom Comparator: Objects in the Queue",
      blurb: "Prioritize objects by a key using a comparator function.",
      xp: 45,
      content: `# Custom Comparator: Objects in the Queue

Real-world priority queues hold **objects**, not raw numbers.  A graph node
might be \`{ id: "A", dist: 5 }\` — we want to order by \`dist\`.

The standard pattern: accept a \`comparator(a, b)\` in the constructor.
- Return **negative** if \`a\` has higher priority (comes first).
- Return **positive** if \`b\` has higher priority.
- Return \`0\` for equal priority.

\`\`\`js
// Min-heap by .dist (Dijkstra style):
const pq = new ComparatorPriorityQueue((a, b) => a.dist - b.dist);
pq.push({ id: "A", dist: 5 });
pq.push({ id: "B", dist: 2 });
pq.pop(); // { id: "B", dist: 2 }
\`\`\`

## Your task

Implement \`ComparatorPriorityQueue\` that accepts a comparator in its
constructor.  Use \`this._cmp(a, b) < 0\` (meaning \`a\` has higher priority) as
the "should swap upward" condition.`,
      starterCode: `class ComparatorPriorityQueue {
  constructor(comparator) {
    this._heap = [];
    this._cmp = comparator;
  }

  push(value) {
    // append and heapify-up using this._cmp
  }

  pop() {
    // extract top priority and heapify-down using this._cmp
  }

  peek() {
    return this._heap[0];
  }

  get size() {
    return this._heap.length;
  }

  get isEmpty() {
    return this._heap.length === 0;
  }
}
`,
      solution: `class ComparatorPriorityQueue {
  constructor(comparator) {
    this._heap = [];
    this._cmp = comparator;
  }

  push(value) {
    this._heap.push(value);
    let i = this._heap.length - 1;
    while (i > 0) {
      const p = Math.floor((i - 1) / 2);
      if (this._cmp(this._heap[p], this._heap[i]) <= 0) break;
      [this._heap[p], this._heap[i]] = [this._heap[i], this._heap[p]];
      i = p;
    }
  }

  pop() {
    if (this._heap.length === 0) return undefined;
    const top = this._heap[0];
    const last = this._heap.pop();
    if (this._heap.length > 0) {
      this._heap[0] = last;
      let i = 0;
      while (true) {
        const l = 2 * i + 1;
        const r = 2 * i + 2;
        let best = i;
        if (l < this._heap.length && this._cmp(this._heap[l], this._heap[best]) < 0) best = l;
        if (r < this._heap.length && this._cmp(this._heap[r], this._heap[best]) < 0) best = r;
        if (best === i) break;
        [this._heap[i], this._heap[best]] = [this._heap[best], this._heap[i]];
        i = best;
      }
    }
    return top;
  }

  peek() {
    return this._heap[0];
  }

  get size() {
    return this._heap.length;
  }

  get isEmpty() {
    return this._heap.length === 0;
  }
}`,
      tests: [
        {
          name: "min by number (acts as min PQ)",
          code: `
const pq = new ComparatorPriorityQueue((a, b) => a - b);
[5, 1, 3, 2].forEach(v => pq.push(v));
assertEquals(pq.pop(), 1);
`,
        },
        {
          name: "max by number (acts as max PQ)",
          code: `
const pq = new ComparatorPriorityQueue((a, b) => b - a);
[5, 1, 3, 9, 2].forEach(v => pq.push(v));
assertEquals(pq.pop(), 9);
`,
        },
        {
          name: "objects ordered by .dist",
          code: `
const pq = new ComparatorPriorityQueue((a, b) => a.dist - b.dist);
pq.push({ id: "A", dist: 5 });
pq.push({ id: "B", dist: 2 });
pq.push({ id: "C", dist: 8 });
assertEquals(pq.pop().id, "B");
`,
        },
        {
          name: "objects by .priority descending",
          code: `
const pq = new ComparatorPriorityQueue((a, b) => b.priority - a.priority);
pq.push({ task: "low", priority: 1 });
pq.push({ task: "high", priority: 10 });
pq.push({ task: "mid", priority: 5 });
assertEquals(pq.pop().task, "high");
`,
        },
      ],
      explanation: `By injecting the comparator, one class covers min-heap, max-heap, and any object ordering. The condition \`cmp(parent, child) <= 0\` means "parent has equal or higher priority — no swap needed". When \`cmp(parent, child) > 0\` the child has higher priority and bubbles up.`,
    },
    {
      slug: "top-k-elements",
      title: "Interview Pattern: Top-K Elements",
      blurb: "Find the K largest numbers in O(n log k) using a min-heap.",
      xp: 50,
      content: `# Interview Pattern: Top-K Elements

**Problem:** Given an array of \`n\` numbers, find the **K largest** elements.

**Naive approach:** sort descending, take first K — O(n log n).

**Heap approach:** maintain a **min-heap of size K**.
- For each number, push it onto the heap.
- If the heap grows past size K, pop the minimum.
- The heap always holds the K largest seen so far.

This runs in **O(n log k)** — much faster when K is small.

\`\`\`js
topK([3, 1, 4, 1, 5, 9, 2, 6], 3);
// → [4, 5, 6, 9] ...wait, heap order varies; return sorted: [4, 5, 6] ← wrong example
// Actually K=3 largest: 9, 6, 5 → returned sorted ascending: [5, 6, 9]
\`\`\`

## Your task

Write \`topK(arr, k)\` that returns an array of the **K largest** values in
**ascending order**.

Use the \`PriorityQueue\` class you built (min-heap).  You may redefine it here
or rely on the version from the previous lesson being in scope.`,
      starterCode: `// Min-heap PriorityQueue is available from the previous lesson,
// or redefine a minimal version here if needed.

function topK(arr, k) {
  // Use a min-heap of size k to track the k largest elements
  // Return the results sorted ascending
}
`,
      solution: `class PriorityQueue {
  constructor() { this._heap = []; }
  push(value) {
    this._heap.push(value);
    let i = this._heap.length - 1;
    while (i > 0) {
      const p = Math.floor((i - 1) / 2);
      if (this._heap[p] <= this._heap[i]) break;
      [this._heap[p], this._heap[i]] = [this._heap[i], this._heap[p]];
      i = p;
    }
  }
  pop() {
    if (this._heap.length === 0) return undefined;
    const min = this._heap[0];
    const last = this._heap.pop();
    if (this._heap.length > 0) {
      this._heap[0] = last;
      let i = 0;
      while (true) {
        const l = 2 * i + 1;
        const r = 2 * i + 2;
        let s = i;
        if (l < this._heap.length && this._heap[l] < this._heap[s]) s = l;
        if (r < this._heap.length && this._heap[r] < this._heap[s]) s = r;
        if (s === i) break;
        [this._heap[i], this._heap[s]] = [this._heap[s], this._heap[i]];
        i = s;
      }
    }
    return min;
  }
  get size() { return this._heap.length; }
  get isEmpty() { return this._heap.length === 0; }
}

function topK(arr, k) {
  const pq = new PriorityQueue();
  for (const val of arr) {
    pq.push(val);
    if (pq.size > k) pq.pop();
  }
  const result = [];
  while (!pq.isEmpty) result.push(pq.pop());
  return result; // min-heap pops in ascending order
}`,
      tests: [
        {
          name: "top 3 of [3,1,4,1,5,9,2,6]",
          code: `assertEquals(JSON.stringify(topK([3,1,4,1,5,9,2,6], 3)), JSON.stringify([5,6,9]));`,
        },
        {
          name: "top 1 returns max",
          code: `assertEquals(JSON.stringify(topK([3,1,4,1,5,9,2,6], 1)), JSON.stringify([9]));`,
        },
        {
          name: "k equals array length returns all sorted",
          code: `assertEquals(JSON.stringify(topK([3,1,2], 3)), JSON.stringify([1,2,3]));`,
        },
        {
          name: "handles duplicates",
          code: `assertEquals(JSON.stringify(topK([5,5,5,1,2], 2)), JSON.stringify([5,5]));`,
        },
      ],
      explanation: `Maintaining a size-K min-heap means the root is always the smallest of the top-K candidates. When a new value beats the smallest in our window (i.e., pushes the heap over size K and then pops the min), we keep only the K largest. Final drain of the heap returns them in ascending order.`,
    },
  ],
};
