import type { Module } from "./types";

// Portfolio Projects — guided capstone builds that produce real, shareable code.
// Each lesson walks through a meaningful mini-project: spec → build → test → ship.
// These are the "I built this" items that go on resumes and GitHub profiles.
export const portfolioProjects: Module = {
  slug: "portfolio-projects",
  title: "Portfolio Projects",
  description:
    "Build real things you can ship and show. Each project is a complete mini-app: working code, tests, and something worth putting on your resume.",
  emoji: "🛠️",
  gradient: "from-emerald-400/20 to-teal-500/10",
  tagline: "build real projects for your portfolio",
  keywords: [
    "portfolio projects",
    "coding projects for beginners",
    "javascript projects",
    "build your portfolio",
  ],
  lessons: [
    {
      slug: "todo-app",
      title: "Build a To-Do List",
      blurb: "The classic first project — done right.",
      xp: 40,
      content: `# Build a To-Do List

Every developer has built a to-do app. The difference is *how* you build it.

A solid to-do list demonstrates:
- **CRUD operations** (Create, Read, Update, Delete)
- **State management** (adding, removing, toggling)
- **Data structures** (arrays of objects)
- **Clean function design**

## The Spec

Build a \`TodoList\` class with:
- \`add(text)\` — add a new item
- \`complete(id)\` — mark item as done
- \`remove(id)\` — delete an item
- \`getAll()\` — return all items
- \`getPending()\` — return only incomplete items

Each item: \`{ id, text, done: boolean }\`

## Why This Matters

Every CRUD app (Twitter, GitHub, Gmail) is fundamentally this:
- Users → tweets, repos, emails
- Add, read, update, delete

Nail this pattern and you understand 80% of web development.`,
      starterCode: `class TodoList {
  constructor() {
    this.items = [];
    this.nextId = 1;
  }

  add(text) {
    // Add an item with { id, text, done: false }
    // Return the new item
  }

  complete(id) {
    // Mark the item with this id as done: true
    // Return true if found, false otherwise
  }

  remove(id) {
    // Remove the item with this id from the list
    // Return true if removed, false if not found
  }

  getAll() {
    // Return all items
  }

  getPending() {
    // Return only items where done === false
  }
}
`,
      solution: `class TodoList {
  constructor() {
    this.items = [];
    this.nextId = 1;
  }
  add(text) {
    const item = { id: this.nextId++, text, done: false };
    this.items.push(item);
    return item;
  }
  complete(id) {
    const item = this.items.find(i => i.id === id);
    if (!item) return false;
    item.done = true;
    return true;
  }
  remove(id) {
    const idx = this.items.findIndex(i => i.id === id);
    if (idx === -1) return false;
    this.items.splice(idx, 1);
    return true;
  }
  getAll() { return this.items; }
  getPending() { return this.items.filter(i => !i.done); }
}`,
      tests: [
        {
          name: "add returns item with id",
          code: `const list = new TodoList();
const item = list.add("Buy milk");
assertEquals(item.id, 1);
assertEquals(item.text, "Buy milk");
assertEquals(item.done, false);`,
        },
        {
          name: "complete marks done",
          code: `const list = new TodoList();
const item = list.add("Walk dog");
assertEquals(list.complete(item.id), true);
assertEquals(list.getAll()[0].done, true);`,
        },
        {
          name: "remove deletes item",
          code: `const list = new TodoList();
const item = list.add("Exercise");
list.remove(item.id);
assertEquals(list.getAll().length, 0);`,
        },
        {
          name: "getPending filters done items",
          code: `const list = new TodoList();
list.add("Task 1");
const t2 = list.add("Task 2");
list.complete(t2.id);
assertEquals(list.getPending().length, 1);
assertEquals(list.getPending()[0].text, "Task 1");`,
        },
      ],
    },
    {
      slug: "calculator",
      title: "Build a Calculator",
      blurb: "State machines and edge cases — a deceptively hard classic.",
      xp: 45,
      content: `# Build a Calculator

A real calculator is harder than it looks. You need to manage:
- **State** (what was the last operation?)
- **Edge cases** (dividing by zero, multiple decimals)
- **Operator chaining** — like a basic pocket calculator, evaluated left-to-right (press 3, +, 4, =, ×, 2, = → 14), not with math precedence

## The Spec

Build a \`Calculator\` class with:
- \`input(char)\` — accepts digit, operator (\`+\`, \`-\`, \`*\`, \`/\`), decimal, or \`=\`
- \`getDisplay()\` — returns the current display string
- \`clear()\` — reset everything

## The Challenge

The tricky part is handling chained operations:
\`\`\`
input("3") → display: "3"
input("+") → display: "3"
input("4") → display: "4"
input("=") → display: "7"
input("*") → display: "7"
input("2") → display: "2"
input("=") → display: "14"
\`\`\`

Build this step by step. Start simple, then handle edge cases.`,
      starterCode: `class Calculator {
  constructor() {
    this.display = "0";
    this.stored = null;
    this.operator = null;
    this.fresh = true; // true = next digit starts a new number
  }

  input(char) {
    // Handle four kinds of input:
    //  - digit "0"-"9": append to display (or start fresh after an operator)
    //  - ".": add a decimal point (only one allowed)
    //  - operator "+","-","*","/": apply any pending op, then store this one
    //  - "=": apply the pending operation
    // TODO: implement, then return this (so calls can chain)
    return this;
  }

  _apply() {
    // If there's a stored value AND an operator, combine the stored value
    // with the current display value and write the result back to display.
    // TODO: implement
  }

  getDisplay() { return this.display; }

  clear() {
    this.display = "0";
    this.stored = null;
    this.operator = null;
    this.fresh = true;
  }
}
`,
      solution: `class Calculator {
  constructor() {
    this.display = "0";
    this.stored = null;
    this.operator = null;
    this.fresh = true;
  }
  input(char) {
    if (char >= "0" && char <= "9") {
      if (this.fresh) { this.display = char === "0" ? "0" : char; this.fresh = false; }
      else { this.display = this.display === "0" ? char : this.display + char; }
    } else if (char === ".") {
      if (this.fresh) { this.display = "0."; this.fresh = false; }
      else if (!this.display.includes(".")) this.display += ".";
    } else if (["+", "-", "*", "/"].includes(char)) {
      this._apply(); this.stored = parseFloat(this.display); this.operator = char; this.fresh = true;
    } else if (char === "=") {
      this._apply(); this.operator = null; this.stored = null; this.fresh = true;
    }
    return this;
  }
  _apply() {
    if (this.operator === null || this.stored === null) return;
    const cur = parseFloat(this.display);
    const ops = { "+": (a,b)=>a+b, "-": (a,b)=>a-b, "*": (a,b)=>a*b, "/": (a,b)=>b===0?Infinity:a/b };
    this.display = String(ops[this.operator](this.stored, cur));
  }
  getDisplay() { return this.display; }
  clear() { this.display = "0"; this.stored = null; this.operator = null; this.fresh = true; }
}`,
      tests: [
        {
          name: "basic addition",
          code: `const c = new Calculator();
c.input("3").input("+").input("4").input("=");
assertEquals(c.getDisplay(), "7");`,
        },
        {
          name: "chained operations",
          code: `const c = new Calculator();
c.input("1").input("0").input("-").input("3").input("=");
assertEquals(c.getDisplay(), "7");`,
        },
        {
          name: "clear resets",
          code: `const c = new Calculator();
c.input("9").clear();
assertEquals(c.getDisplay(), "0");`,
        },
        {
          name: "multiplication",
          code: `const c = new Calculator();
c.input("6").input("*").input("7").input("=");
assertEquals(c.getDisplay(), "42");`,
        },
      ],
    },
    {
      slug: "word-frequency",
      title: "Word Frequency Counter",
      blurb: "Text analysis — a staple data engineering interview question.",
      xp: 50,
      content: `# Word Frequency Counter

Text analysis shows up everywhere: search engines, recommendation systems, spam filters.

This project teaches you:
- String manipulation
- Hash maps (objects / Maps) for counting
- Sorting by value
- Text normalization

## The Spec

Build a \`WordFrequency\` class that:
- \`analyze(text)\` — process a string of text
- \`getTopN(n)\` — return the top N most frequent words as \`[{word, count}]\`
- \`getCount(word)\` — return how many times a word appears
- \`getUnique()\` — return how many unique words exist

Rules:
- Case-insensitive ("The" and "the" are the same)
- Strip punctuation (commas, periods, etc.)
- Ignore empty strings after cleaning

## Real-World Applications

- **SEO tools** — what words appear most on a page?
- **Chatbots** — what topics do users ask about?
- **Spam detection** — "free", "win", "click" patterns`,
      starterCode: `class WordFrequency {
  constructor() {
    this.counts = {};
  }

  analyze(text) {
    // Normalize and count words
    // Hint: text.toLowerCase(), replace punctuation, split on spaces
    const words = text
      .toLowerCase()
      .replace(/[^a-z0-9\\s]/g, "")
      .split(/\\s+/)
      .filter(w => w.length > 0);

    // TODO: count each word in this.counts
  }

  getTopN(n) {
    // Return [{word, count}] sorted by count descending, take first n
    return [];
  }

  getCount(word) {
    return this.counts[word.toLowerCase()] || 0;
  }

  getUnique() {
    return Object.keys(this.counts).length;
  }
}
`,
      solution: `class WordFrequency {
  constructor() { this.counts = {}; }
  analyze(text) {
    const words = text.toLowerCase().replace(/[^a-z0-9\\s]/g,"").split(/\\s+/).filter(w=>w.length>0);
    for (const w of words) this.counts[w] = (this.counts[w] || 0) + 1;
  }
  getTopN(n) {
    return Object.entries(this.counts).map(([word,count])=>({word,count})).sort((a,b)=>b.count-a.count).slice(0,n);
  }
  getCount(word) { return this.counts[word.toLowerCase()] || 0; }
  getUnique() { return Object.keys(this.counts).length; }
}`,
      tests: [
        {
          name: "counts words",
          code: `const wf = new WordFrequency();
wf.analyze("the cat sat on the mat the cat");
assertEquals(wf.getCount("the"), 3);
assertEquals(wf.getCount("cat"), 2);`,
        },
        {
          name: "case insensitive",
          code: `const wf = new WordFrequency();
wf.analyze("Hello hello HELLO");
assertEquals(wf.getCount("hello"), 3);`,
        },
        {
          name: "getTopN returns sorted",
          code: `const wf = new WordFrequency();
wf.analyze("a a a b b c");
const top = wf.getTopN(2);
assertEquals(top[0].word, "a");
assertEquals(top[0].count, 3);
assertEquals(top[1].word, "b");`,
        },
        {
          name: "getUnique counts distinct words",
          code: `const wf = new WordFrequency();
wf.analyze("one two two three three three");
assertEquals(wf.getUnique(), 3);`,
        },
      ],
    },
    {
      slug: "event-emitter",
      title: "Build an Event Emitter",
      blurb: "The pattern behind Node.js, React, and every UI framework.",
      xp: 50,
      content: `# Build an Event Emitter

The Event Emitter pattern is **everywhere** in software:
- Node.js \`EventEmitter\` — HTTP servers, file streams
- React — synthetic event system
- DOM — \`addEventListener\`
- Vue/Angular — component communication

Understanding it proves you understand **observer pattern**, **pub/sub**, and **callback-based async**.

## The Spec

Build an \`EventEmitter\` class:
- \`on(event, listener)\` — subscribe to an event
- \`off(event, listener)\` — unsubscribe
- \`emit(event, ...args)\` — fire all listeners for an event
- \`once(event, listener)\` — subscribe for only the NEXT occurrence
- \`listenerCount(event)\` — how many listeners for this event

## Why It Matters

Most async patterns are built on this:
\`\`\`js
const server = http.createServer();
server.on("request", handleRequest);   // built-in EventEmitter
server.on("close", cleanup);
server.emit("custom", { data: 123 });
\`\`\`

Building your own forces you to think about:
- Data structures for listeners (Map of arrays)
- Cleanup (memory leaks from uncleaned listeners)
- Error handling`,
      starterCode: `class EventEmitter {
  constructor() {
    this.listeners = new Map(); // event → [fn, fn, ...]
  }

  on(event, listener) {
    // Add listener to this event's array (create the array if it's missing)
    // TODO: implement
    return this; // allows chaining
  }

  off(event, listener) {
    // Remove this exact listener function from the event's array
    // TODO: implement
    return this;
  }

  emit(event, ...args) {
    // Call every listener registered for this event, passing ...args
    // TODO: implement
    return this;
  }

  once(event, listener) {
    // Subscribe a wrapper that calls listener once, then removes itself
    // TODO: implement
    return this;
  }

  listenerCount(event) {
    // Return how many listeners are registered for this event
    // TODO: implement
    return 0;
  }
}
`,
      solution: `class EventEmitter {
  constructor() { this.listeners = new Map(); }
  on(event, listener) {
    if (!this.listeners.has(event)) this.listeners.set(event, []);
    this.listeners.get(event).push(listener);
    return this;
  }
  off(event, listener) {
    const fns = this.listeners.get(event);
    if (fns) this.listeners.set(event, fns.filter(fn => fn !== listener));
    return this;
  }
  emit(event, ...args) {
    (this.listeners.get(event) || []).forEach(fn => fn(...args));
    return this;
  }
  once(event, listener) {
    const w = (...args) => { listener(...args); this.off(event, w); };
    return this.on(event, w);
  }
  listenerCount(event) { return (this.listeners.get(event) || []).length; }
}`,
      tests: [
        {
          name: "on + emit fires listener",
          code: `const ee = new EventEmitter();
let called = 0;
ee.on("click", () => called++);
ee.emit("click");
assertEquals(called, 1);`,
        },
        {
          name: "off removes listener",
          code: `const ee = new EventEmitter();
let called = 0;
const fn = () => called++;
ee.on("click", fn);
ee.off("click", fn);
ee.emit("click");
assertEquals(called, 0);`,
        },
        {
          name: "once fires only once",
          code: `const ee = new EventEmitter();
let called = 0;
ee.once("ping", () => called++);
ee.emit("ping");
ee.emit("ping");
assertEquals(called, 1);`,
        },
        {
          name: "emit passes args",
          code: `const ee = new EventEmitter();
let result = null;
ee.on("data", (x, y) => { result = x + y; });
ee.emit("data", 3, 4);
assertEquals(result, 7);`,
        },
      ],
    },
    {
      slug: "rate-limiter",
      title: "Build a Rate Limiter",
      blurb: "Used in every production API — implement the sliding window algorithm.",
      xp: 60,
      content: `# Build a Rate Limiter

Rate limiting is one of the most important patterns in production systems. It prevents:
- API abuse
- DDoS attacks
- Runaway scripts hammering your database

Every major API (Twitter, GitHub, OpenAI) uses rate limiting.

## The Sliding Window Algorithm

**Fixed window** (naive): 100 requests per minute, reset at :00.
Problem: A user could send 100 at :59 and 100 more at :01 — 200 in 2 seconds.

**Sliding window** (better): Track timestamps of recent requests. Only allow requests where the count in the last N milliseconds < limit.

\`\`\`
timestamps = [t1, t2, t3, ...]
windowStart = now - windowMs
validRequests = timestamps.filter(t => t > windowStart)
if (validRequests.length < limit) → allow
else → deny
\`\`\`

## The Spec

\`\`\`js
const limiter = new RateLimiter(5, 1000); // limit=5, windowMs=1000
limiter.isAllowed("user123"); // true (1st request)
// ... after 5 requests in 1 second:
limiter.isAllowed("user123"); // false (rate limited)
\`\`\`

- Each **key** (user id, IP) has its own window
- Multiple keys are independent`,
      starterCode: `class RateLimiter {
  constructor(limit, windowMs) {
    this.limit = limit;
    this.windowMs = windowMs;
    this.requests = new Map(); // key → [timestamp, ...]
  }

  isAllowed(key) {
    // Sliding window algorithm:
    //  1. Drop timestamps older than (now - windowMs) for this key
    //  2. If the remaining count is below the limit, record now and allow
    //  3. Otherwise, deny
    // Hint: const now = Date.now(); this.requests holds key to [timestamp,...]
    // TODO: implement
    return false;
  }
}
`,
      solution: `class RateLimiter {
  constructor(limit, windowMs) {
    this.limit = limit;
    this.windowMs = windowMs;
    this.requests = new Map();
  }
  isAllowed(key) {
    const now = Date.now();
    const windowStart = now - this.windowMs;
    const timestamps = (this.requests.get(key) || []).filter(t => t > windowStart);
    if (timestamps.length < this.limit) {
      timestamps.push(now);
      this.requests.set(key, timestamps);
      return true;
    }
    this.requests.set(key, timestamps);
    return false;
  }
}`,
      tests: [
        {
          name: "allows requests under limit",
          code: `const rl = new RateLimiter(3, 10000);
assertEquals(rl.isAllowed("user1"), true);
assertEquals(rl.isAllowed("user1"), true);
assertEquals(rl.isAllowed("user1"), true);`,
        },
        {
          name: "blocks requests over limit",
          code: `const rl = new RateLimiter(3, 10000);
rl.isAllowed("user1");
rl.isAllowed("user1");
rl.isAllowed("user1");
assertEquals(rl.isAllowed("user1"), false);`,
        },
        {
          name: "different keys are independent",
          code: `const rl = new RateLimiter(2, 10000);
rl.isAllowed("user1");
rl.isAllowed("user1");
assertEquals(rl.isAllowed("user2"), true);`,
        },
      ],
    },
  ],
};
