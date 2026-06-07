import type { Module } from "./types";

// Portfolio Data Structures — each lesson is a complete, hireable implementation
// of a classic data structure. Students walk away with real code they can demo,
// explain in interviews, and drop into real projects.
export const portfolioDataStructures: Module = {
  slug: "portfolio-data-structures",
  title: "Data Structure Builds",
  description:
    "Build the data structures that power real systems — from browser caches to autocomplete engines. Each project is a complete, tested implementation you can show in interviews.",
  emoji: "🏗️",
  gradient: "from-violet-400/20 to-indigo-500/10",
  tagline: "implement the data structures behind real software",
  language: "js",
  keywords: [
    "data structures javascript",
    "lru cache javascript",
    "trie autocomplete",
    "binary heap javascript",
    "union find disjoint set",
    "circular buffer ring buffer",
    "portfolio data structures",
    "coding interview data structures",
  ],
  lessons: [
    // ── 1. LRU Cache ────────────────────────────────────────────────────────
    {
      slug: "lru-cache",
      title: "LRU Cache",
      blurb: "Build the eviction strategy behind every browser and CDN cache.",
      xp: 40,
      language: "js",
      content: `## What you're building

An **LRU (Least Recently Used) cache** — a fixed-capacity key/value store that automatically evicts the least-recently-used item when it runs out of space.

LRU caches are inside your browser (page cache), every CDN (CloudFront, Fastly), Redis, and countless database query caches.

## Requirements

- \`new LRUCache(capacity)\` — create a cache that holds at most \`capacity\` items
- \`get(key)\` — return the value for \`key\`, or \`-1\` if not found; **marks the key as recently used**
- \`put(key, value)\` — insert or update a key; if over capacity, evict the **least recently used** key first
- Both \`get\` and \`put\` must run in **O(1)** time (use a Map — JS Maps preserve insertion order, so you can delete + re-insert to move a key to "most recent")

## Stretch goals

- Add a \`keys()\` method returning current keys from least-recently-used to most-recently-used
- Track hit/miss stats with a \`stats()\` method returning \`{ hits, misses }\`

## What this proves

You understand cache eviction, O(1) data structure design, and how JavaScript's Map preserves insertion order — a pattern used in production Node.js services.`,
      starterCode: `class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map(); // key → value, insertion order = LRU order
  }

  get(key) {
    // Return -1 if key is not in the cache.
    // If found: move the key to "most recently used" position and return its value.
    // Hint: delete the key then re-insert it to move it to the end of the Map.
    // TODO: implement
    return -1;
  }

  put(key, value) {
    // If key already exists, update it (and mark as recently used).
    // If adding a new key would exceed capacity, evict the least-recently-used
    // key first (the first key in the Map).
    // TODO: implement
  }
}
`,
      solution: `class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }
  get(key) {
    if (!this.cache.has(key)) return -1;
    const val = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, val);
    return val;
  }
  put(key, value) {
    if (this.cache.has(key)) this.cache.delete(key);
    else if (this.cache.size >= this.capacity) {
      this.cache.delete(this.cache.keys().next().value);
    }
    this.cache.set(key, value);
  }
}`,
      tests: [
        {
          name: "get returns -1 for missing key",
          code: `const c = new LRUCache(2);
assertEquals(c.get("a"), -1);`,
        },
        {
          name: "put and get basic",
          code: `const c = new LRUCache(2);
c.put("x", 10);
c.put("y", 20);
assertEquals(c.get("x"), 10);
assertEquals(c.get("y"), 20);`,
        },
        {
          name: "evicts least recently used",
          code: `const c = new LRUCache(2);
c.put("a", 1);
c.put("b", 2);
c.get("a");       // "a" is now most recent; "b" is LRU
c.put("c", 3);    // should evict "b"
assertEquals(c.get("b"), -1);
assertEquals(c.get("a"), 1);
assertEquals(c.get("c"), 3);`,
        },
        {
          name: "update existing key keeps capacity",
          code: `const c = new LRUCache(2);
c.put("a", 1);
c.put("b", 2);
c.put("a", 99);   // update — should not evict anything
assertEquals(c.get("a"), 99);
assertEquals(c.get("b"), 2);`,
        },
      ],
      hints: [
        "A JavaScript Map remembers insertion order. The first key in the Map is the least-recently-used one.",
        "To 'touch' a key (mark it most-recent): delete it from the Map, then re-set it with the same value.",
        "To evict the LRU key: `this.cache.keys().next().value` gives you the first (oldest) key.",
      ],
    },

    // ── 2. Trie Autocomplete ────────────────────────────────────────────────
    {
      slug: "trie-autocomplete",
      title: "Trie Autocomplete",
      blurb: "Build the prefix-search engine behind every search box.",
      xp: 50,
      language: "js",
      content: `## What you're building

A **Trie** (prefix tree) — a tree where each node represents one character, and every path from root to a marked leaf spells out a word. Tries power:

- Search box autocomplete (Google, VS Code)
- Spell-checkers
- IP routing tables
- Autocorrect on your phone keyboard

## Requirements

- \`insert(word)\` — add a word to the trie
- \`search(word)\` — return \`true\` if the exact word was inserted
- \`startsWith(prefix)\` — return \`true\` if any inserted word begins with \`prefix\`
- \`autocomplete(prefix)\` — return an array of all inserted words that start with \`prefix\` (any order, max 10 results)

## Stretch goals

- Add a \`delete(word)\` method that removes a word without breaking other words sharing its prefix
- Weight words by insertion frequency and return \`autocomplete\` results sorted by frequency

## What this proves

You can implement tree traversal, recursive DFS, and understand a core data structure used in production search infrastructure.`,
      starterCode: `class TrieNode {
  constructor() {
    this.children = {}; // char → TrieNode
    this.isEnd = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    // Walk from root, creating nodes for each character, then mark isEnd = true
    // TODO: implement
  }

  search(word) {
    // Walk the trie; return true only if you reach the final node AND isEnd is true
    // TODO: implement
    return false;
  }

  startsWith(prefix) {
    // Walk the trie for each char in prefix; return true if you don't fall off
    // TODO: implement
    return false;
  }

  autocomplete(prefix) {
    // 1. Navigate to the node at the end of prefix (return [] if not found)
    // 2. DFS from that node, collecting all words that have isEnd = true
    // Return up to 10 results
    // TODO: implement
    return [];
  }
}
`,
      solution: `class TrieNode {
  constructor() {
    this.children = {};
    this.isEnd = false;
  }
}
class Trie {
  constructor() { this.root = new TrieNode(); }
  insert(word) {
    let node = this.root;
    for (const ch of word) {
      if (!node.children[ch]) node.children[ch] = new TrieNode();
      node = node.children[ch];
    }
    node.isEnd = true;
  }
  _find(str) {
    let node = this.root;
    for (const ch of str) {
      if (!node.children[ch]) return null;
      node = node.children[ch];
    }
    return node;
  }
  search(word) {
    const node = this._find(word);
    return node !== null && node.isEnd;
  }
  startsWith(prefix) { return this._find(prefix) !== null; }
  autocomplete(prefix) {
    const node = this._find(prefix);
    if (!node) return [];
    const results = [];
    const stack = [[node, prefix]];
    while (stack.length > 0 && results.length < 10) {
      const [cur, word] = stack.pop();
      if (cur.isEnd) results.push(word);
      for (const ch of Object.keys(cur.children)) {
        stack.push([cur.children[ch], word + ch]);
      }
    }
    return results;
  }
}`,
      tests: [
        {
          name: "search finds inserted words",
          code: `const t = new Trie();
t.insert("apple");
t.insert("app");
assertEquals(t.search("apple"), true);
assertEquals(t.search("app"), true);
assertEquals(t.search("ap"), false);`,
        },
        {
          name: "startsWith prefix matching",
          code: `const t = new Trie();
t.insert("banana");
assertEquals(t.startsWith("ban"), true);
assertEquals(t.startsWith("bana"), true);
assertEquals(t.startsWith("xyz"), false);`,
        },
        {
          name: "autocomplete returns all words with prefix",
          code: `const t = new Trie();
t.insert("cat");
t.insert("car");
t.insert("card");
t.insert("dog");
const results = t.autocomplete("ca");
results.sort();
assertEquals(results.length, 3);
assertEquals(results[0], "car");
assertEquals(results[1], "card");
assertEquals(results[2], "cat");`,
        },
        {
          name: "autocomplete returns empty for unknown prefix",
          code: `const t = new Trie();
t.insert("hello");
assertEquals(t.autocomplete("xyz").length, 0);`,
        },
      ],
      hints: [
        "Each TrieNode's `children` is a plain object mapping one character to the next TrieNode.",
        "For `_find`, loop over each character and descend into `children[ch]`. Return `null` if any character is missing.",
        "For `autocomplete`, start a DFS (stack or recursion) from the node at the end of the prefix, and collect every word where `isEnd === true`.",
      ],
    },

    // ── 3. Binary Min-Heap ──────────────────────────────────────────────────
    {
      slug: "binary-min-heap",
      title: "Binary Min-Heap",
      blurb: "Power priority queues, Dijkstra's algorithm, and real-time scheduling.",
      xp: 50,
      language: "js",
      content: `## What you're building

A **binary min-heap** — a complete binary tree stored in an array where every parent is smaller than its children. The minimum element is always at index 0.

Heaps underpin:
- Priority queues (process schedulers, task runners)
- Dijkstra's shortest-path algorithm
- Median maintenance
- Top-K problems

## Requirements

- \`insert(val)\` — add a value and restore the heap property (bubble up)
- \`extractMin()\` — remove and return the minimum value; restore heap (bubble down)
- \`peek()\` — return the minimum without removing it
- \`size()\` — return the number of elements

Parent/child index math (0-based array):
- Parent of \`i\`: \`Math.floor((i - 1) / 2)\`
- Left child of \`i\`: \`2 * i + 1\`
- Right child of \`i\`: \`2 * i + 2\`

## Stretch goals

- Convert to a max-heap by flipping comparisons, or accept a comparator in the constructor
- Implement \`heapify(array)\` to build a heap from an unsorted array in O(n)

## What this proves

You understand array-backed trees, index arithmetic, and the invariant maintenance (sift-up / sift-down) that makes heap operations O(log n).`,
      starterCode: `class MinHeap {
  constructor() {
    this.data = [];
  }

  size() { return this.data.length; }

  peek() {
    // Return the minimum element (index 0) without removing it, or null if empty
    return this.data.length > 0 ? this.data[0] : null;
  }

  insert(val) {
    // 1. Push val to the end of data
    // 2. Bubble it up: while it is smaller than its parent, swap them
    // TODO: implement
  }

  extractMin() {
    // 1. If empty, return null
    // 2. Swap data[0] with the last element, pop the last element (that's the min)
    // 3. Bubble the new root down: swap with the smaller child until heap is valid
    // 4. Return the extracted minimum
    // TODO: implement
    return null;
  }
}
`,
      solution: `class MinHeap {
  constructor() { this.data = []; }
  size() { return this.data.length; }
  peek() { return this.data.length > 0 ? this.data[0] : null; }
  _parent(i) { return Math.floor((i - 1) / 2); }
  _left(i) { return 2 * i + 1; }
  _right(i) { return 2 * i + 2; }
  _swap(a, b) { [this.data[a], this.data[b]] = [this.data[b], this.data[a]]; }
  insert(val) {
    this.data.push(val);
    let i = this.data.length - 1;
    while (i > 0 && this.data[i] < this.data[this._parent(i)]) {
      this._swap(i, this._parent(i));
      i = this._parent(i);
    }
  }
  extractMin() {
    if (this.data.length === 0) return null;
    if (this.data.length === 1) return this.data.pop();
    const min = this.data[0];
    this.data[0] = this.data.pop();
    let i = 0;
    const n = this.data.length;
    // Loop is bounded by tree height — at most n steps
    for (let step = 0; step < n; step++) {
      const l = this._left(i);
      const r = this._right(i);
      let smallest = i;
      if (l < n && this.data[l] < this.data[smallest]) smallest = l;
      if (r < n && this.data[r] < this.data[smallest]) smallest = r;
      if (smallest === i) break;
      this._swap(i, smallest);
      i = smallest;
    }
    return min;
  }
}`,
      tests: [
        {
          name: "peek returns minimum",
          code: `const h = new MinHeap();
h.insert(5);
h.insert(3);
h.insert(8);
assertEquals(h.peek(), 3);`,
        },
        {
          name: "extractMin returns values in sorted order",
          code: `const h = new MinHeap();
const vals = [4, 1, 7, 2, 9, 3];
for (const v of vals) h.insert(v);
const out = [];
const n = h.size();
for (let i = 0; i < n; i++) out.push(h.extractMin());
assertEquals(out.join(","), "1,2,3,4,7,9");`,
        },
        {
          name: "size tracks count",
          code: `const h = new MinHeap();
h.insert(10);
h.insert(20);
assertEquals(h.size(), 2);
h.extractMin();
assertEquals(h.size(), 1);`,
        },
        {
          name: "extractMin on empty returns null",
          code: `const h = new MinHeap();
assertEquals(h.extractMin(), null);`,
        },
      ],
      hints: [
        "Store everything in `this.data` as a flat array. The root (minimum) lives at index 0.",
        "Bubble-up: after inserting at the end, compare with the parent and swap upward as long as the child is smaller.",
        "Bubble-down: after placing the last element at index 0, compare with both children and swap with the smaller one, then repeat.",
        "The loop in extractMin is bounded by the height of the tree (at most `data.length` steps), so it always terminates.",
      ],
    },

    // ── 4. Union-Find ───────────────────────────────────────────────────────
    {
      slug: "union-find",
      title: "Union-Find",
      blurb: "Track connected components — the algorithm behind social networks and Kruskal's MST.",
      xp: 60,
      language: "js",
      content: `## What you're building

A **Union-Find** (Disjoint Set Union) data structure that tracks which elements belong to the same connected group. Real uses:

- "Are Alice and Bob connected on LinkedIn?" (social graph reachability)
- Kruskal's minimum spanning tree algorithm
- Detecting cycles in a graph
- Pixel flood-fill / image segmentation
- Network cluster detection

## Requirements

- \`new UnionFind(n)\` — create a structure for elements \`0..n-1\`, each in its own set
- \`find(x)\` — return the **root** (representative) of the set containing \`x\`; use **path compression** (flatten the tree as you traverse)
- \`union(x, y)\` — merge the sets containing \`x\` and \`y\`; use **union by rank** (attach the smaller tree under the larger)
- \`connected(x, y)\` — return \`true\` if \`x\` and \`y\` are in the same set
- \`componentCount()\` — return how many disjoint sets currently exist

## Stretch goals

- Return \`false\` from \`union\` when \`x\` and \`y\` are already in the same set (useful for cycle detection)
- Add a \`getComponents()\` method returning an array of arrays, each being the members of one set

## What this proves

You can implement a near-O(1) amortized structure with two classic optimizations (path compression + union by rank), and you understand how graph connectivity is tracked efficiently at scale.`,
      starterCode: `class UnionFind {
  constructor(n) {
    // parent[i] = i means i is its own root
    this.parent = Array.from({ length: n }, (_, i) => i);
    // rank[i] tracks the approximate depth of the tree rooted at i
    this.rank = new Array(n).fill(0);
    this.count = n; // number of disjoint components
  }

  find(x) {
    // Return the root of x's set.
    // Apply path compression: while finding the root, point every node
    // directly to the root (so future finds are faster).
    // TODO: implement
    return x;
  }

  union(x, y) {
    // Merge the sets containing x and y using union by rank.
    // Attach the root with lower rank under the root with higher rank.
    // If ranks are equal, attach one under the other and increment the winner's rank.
    // Decrement this.count when a merge actually happens.
    // TODO: implement
  }

  connected(x, y) {
    return this.find(x) === this.find(y);
  }

  componentCount() {
    return this.count;
  }
}
`,
      solution: `class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = new Array(n).fill(0);
    this.count = n;
  }
  find(x) {
    if (this.parent[x] !== x) this.parent[x] = this.find(this.parent[x]);
    return this.parent[x];
  }
  union(x, y) {
    const rx = this.find(x);
    const ry = this.find(y);
    if (rx === ry) return;
    if (this.rank[rx] < this.rank[ry]) this.parent[rx] = ry;
    else if (this.rank[rx] > this.rank[ry]) this.parent[ry] = rx;
    else { this.parent[ry] = rx; this.rank[rx]++; }
    this.count--;
  }
  connected(x, y) { return this.find(x) === this.find(y); }
  componentCount() { return this.count; }
}`,
      tests: [
        {
          name: "all elements start disconnected",
          code: `const uf = new UnionFind(4);
assertEquals(uf.componentCount(), 4);
assertEquals(uf.connected(0, 1), false);`,
        },
        {
          name: "union merges components",
          code: `const uf = new UnionFind(5);
uf.union(0, 1);
uf.union(1, 2);
assertEquals(uf.connected(0, 2), true);
assertEquals(uf.componentCount(), 3);`,
        },
        {
          name: "connected returns false for separate sets",
          code: `const uf = new UnionFind(4);
uf.union(0, 1);
uf.union(2, 3);
assertEquals(uf.connected(0, 2), false);
assertEquals(uf.connected(1, 3), false);`,
        },
        {
          name: "full merge reaches one component",
          code: `const uf = new UnionFind(4);
uf.union(0, 1);
uf.union(2, 3);
uf.union(0, 3);
assertEquals(uf.componentCount(), 1);
assertEquals(uf.connected(1, 2), true);`,
        },
      ],
      hints: [
        "Path compression: inside `find`, if `this.parent[x] !== x`, recursively find the root and then set `this.parent[x]` directly to the root before returning.",
        "Union by rank: always attach the shorter tree (lower rank) under the taller one. Only increment rank when two equal-rank trees merge.",
        "Decrement `this.count` inside `union` only when `rx !== ry` (a real merge happened).",
      ],
    },

    // ── 5. Circular Buffer ──────────────────────────────────────────────────
    {
      slug: "circular-buffer",
      title: "Circular Buffer",
      blurb: "Fixed-memory streaming data — the backbone of audio, video, and OS I/O queues.",
      xp: 60,
      language: "js",
      content: `## What you're building

A **circular buffer** (ring buffer) — a fixed-size queue that reuses its own memory. When the write pointer reaches the end of the array, it wraps back to the start. Used everywhere memory allocation must be bounded:

- Audio/video streaming (jitter buffers)
- OS kernel I/O queues (stdin, network packets)
- Log rotation (keep the last N events in memory)
- Producer/consumer pipelines in real-time systems

## Requirements

- \`new CircularBuffer(capacity)\` — allocate a fixed array of \`capacity\` slots
- \`write(val)\` — enqueue a value; **throw** \`new Error("Buffer full")\` if the buffer is at capacity
- \`read()\` — dequeue the oldest value; **throw** \`new Error("Buffer empty")\` if empty
- \`isEmpty()\` — return \`true\` if no items are stored
- \`isFull()\` — return \`true\` if the buffer is at capacity
- \`size()\` — return the current number of stored items

Track the read head, write head, and count. Use modular arithmetic (\`% capacity\`) to wrap indices instead of shifting the array.

## Stretch goals

- Add \`peek()\` — return the next item to be read without removing it
- Add \`overwrite\` mode: when full, silently drop the oldest item instead of throwing

## What this proves

You can manage fixed-memory data structures with pointer arithmetic — a fundamental systems programming skill interviewers love.`,
      starterCode: `class CircularBuffer {
  constructor(capacity) {
    this.capacity = capacity;
    this.buf = new Array(capacity);
    this.readHead = 0;   // index of the next item to read
    this.writeHead = 0;  // index of the next slot to write into
    this.count = 0;
  }

  isEmpty() { return this.count === 0; }
  isFull()  { return this.count === this.capacity; }
  size()    { return this.count; }

  write(val) {
    // If full, throw new Error("Buffer full")
    // Otherwise write val at writeHead, advance writeHead (wrap with %),
    // and increment count.
    // TODO: implement
  }

  read() {
    // If empty, throw new Error("Buffer empty")
    // Otherwise read the value at readHead, advance readHead (wrap with %),
    // decrement count, and return the value.
    // TODO: implement
  }
}
`,
      solution: `class CircularBuffer {
  constructor(capacity) {
    this.capacity = capacity;
    this.buf = new Array(capacity);
    this.readHead = 0;
    this.writeHead = 0;
    this.count = 0;
  }
  isEmpty() { return this.count === 0; }
  isFull()  { return this.count === this.capacity; }
  size()    { return this.count; }
  write(val) {
    if (this.isFull()) throw new Error("Buffer full");
    this.buf[this.writeHead] = val;
    this.writeHead = (this.writeHead + 1) % this.capacity;
    this.count++;
  }
  read() {
    if (this.isEmpty()) throw new Error("Buffer empty");
    const val = this.buf[this.readHead];
    this.readHead = (this.readHead + 1) % this.capacity;
    this.count--;
    return val;
  }
}`,
      tests: [
        {
          name: "read returns values in FIFO order",
          code: `const cb = new CircularBuffer(4);
cb.write(1);
cb.write(2);
cb.write(3);
assertEquals(cb.read(), 1);
assertEquals(cb.read(), 2);
assertEquals(cb.read(), 3);`,
        },
        {
          name: "isFull and isEmpty flags",
          code: `const cb = new CircularBuffer(2);
assertEquals(cb.isEmpty(), true);
cb.write("a");
cb.write("b");
assertEquals(cb.isFull(), true);
cb.read();
assertEquals(cb.isFull(), false);`,
        },
        {
          name: "write throws when full",
          code: `const cb = new CircularBuffer(2);
cb.write(1);
cb.write(2);
let threw = false;
try { cb.write(3); } catch(e) { threw = true; }
assertEquals(threw, true);`,
        },
        {
          name: "wraps around correctly after read+write cycle",
          code: `const cb = new CircularBuffer(3);
cb.write(10);
cb.write(20);
cb.read();          // drain slot 0
cb.write(30);       // wraps to slot 0
cb.write(40);       // slot 1 still free? no — slot 2 is next
assertEquals(cb.size(), 3);
assertEquals(cb.read(), 20);
assertEquals(cb.read(), 30);
assertEquals(cb.read(), 40);`,
        },
      ],
      hints: [
        "Use modular arithmetic: `this.writeHead = (this.writeHead + 1) % this.capacity` — this wraps the index back to 0 when it reaches the end.",
        "Track `this.count` separately from the head indices. `isFull` is `count === capacity`; `isEmpty` is `count === 0`.",
        "The write and read heads can overlap — that's fine as long as you use `count` (not head equality) to detect full/empty.",
      ],
    },
  ],
};
