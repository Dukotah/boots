import type { Module } from "./types";

// Portfolio Systems — production-grade primitives that prove you understand
// how real infrastructure works under the hood. Each project is a standalone
// data-structure or algorithm used daily in backend and systems engineering.
export const portfolioSystems: Module = {
  slug: "portfolio-systems",
  title: "Systems Primitives",
  description:
    "Build the building blocks of production software: rate limiters, event buses, retry logic, key-value stores, and more. Pure logic, fully testable, resume-ready.",
  emoji: "⚙️",
  gradient: "from-violet-400/20 to-indigo-500/10",
  tagline: "implement the primitives powering real production systems",
  language: "js",
  keywords: [
    "systems programming",
    "javascript data structures",
    "rate limiter",
    "event emitter",
    "pub sub pattern",
    "retry backoff",
    "in-memory cache",
    "portfolio projects",
  ],
  lessons: [
    // ── 1. Token-Bucket Rate Limiter ─────────────────────────────────────────
    {
      slug: "token-bucket",
      title: "Token-Bucket Rate Limiter",
      blurb: "Control traffic with the algorithm powering Stripe, Twilio, and AWS.",
      xp: 40,
      language: "js",
      content: `## What you're building

A **token-bucket rate limiter** — the most common algorithm for API throttling used by Stripe, Twilio, Cloudflare, and virtually every production API gateway.

## How it works

Imagine a bucket that holds tokens:
- The bucket starts **full** (capacity \`N\`).
- Each accepted request **consumes one token**.
- Tokens **refill at a steady rate** (e.g. 2 tokens per second).
- If the bucket is empty, the request is **rejected**.

Unlike a fixed window, this naturally handles bursts up to the bucket size while enforcing a sustained average.

## Requirements

Build a \`TokenBucket\` class that accepts \`(capacity, refillPerSecond)\`:

- \`consume(key)\` — attempt to take one token for the given key. Return \`true\` (allowed) or \`false\` (throttled).
- Each key gets its own independent bucket.
- Refill is **virtual** — compute how many tokens have accrued since the last request using elapsed time; do **not** use \`setInterval\`.
- Bucket never exceeds \`capacity\`.

## Stretch goals

- \`consumeN(key, n)\` — consume N tokens in a single call (batch requests).
- \`peek(key)\` — return the current approximate token count without consuming.

## What this proves

You understand token-bucket theory, floating-point time math, per-key state management, and can implement throttling without side-effecting timers — the same approach used in Nginx's \`limit_req\` module.`,
      starterCode: `class TokenBucket {
  constructor(capacity, refillPerSecond) {
    this.capacity = capacity;
    this.refillPerSecond = refillPerSecond;
    this.buckets = new Map(); // key → { tokens, lastMs }
  }

  _getBucket(key) {
    if (!this.buckets.has(key)) {
      this.buckets.set(key, { tokens: this.capacity, lastMs: Date.now() });
    }
    return this.buckets.get(key);
  }

  consume(key) {
    // 1. Get or initialise the bucket for this key.
    // 2. Compute elapsed seconds since lastMs.
    // 3. Add refillPerSecond * elapsed to tokens (cap at capacity).
    // 4. Update lastMs.
    // 5. If tokens >= 1, subtract 1 and return true. Otherwise return false.
    // TODO: implement
    return false;
  }
}
`,
      solution: `class TokenBucket {
  constructor(capacity, refillPerSecond) {
    this.capacity = capacity;
    this.refillPerSecond = refillPerSecond;
    this.buckets = new Map();
  }
  _getBucket(key) {
    if (!this.buckets.has(key)) {
      this.buckets.set(key, { tokens: this.capacity, lastMs: Date.now() });
    }
    return this.buckets.get(key);
  }
  consume(key) {
    const now = Date.now();
    const b = this._getBucket(key);
    const elapsed = (now - b.lastMs) / 1000;
    b.tokens = Math.min(this.capacity, b.tokens + elapsed * this.refillPerSecond);
    b.lastMs = now;
    if (b.tokens >= 1) {
      b.tokens -= 1;
      return true;
    }
    return false;
  }
}`,
      tests: [
        {
          name: "fresh bucket allows up to capacity",
          code: `const tb = new TokenBucket(3, 1);
assertEquals(tb.consume("u1"), true);
assertEquals(tb.consume("u1"), true);
assertEquals(tb.consume("u1"), true);`,
        },
        {
          name: "bucket blocks when empty",
          code: `const tb = new TokenBucket(2, 0.001);
tb.consume("u1");
tb.consume("u1");
assertEquals(tb.consume("u1"), false);`,
        },
        {
          name: "independent keys do not share tokens",
          code: `const tb = new TokenBucket(1, 0.001);
tb.consume("a");
assertEquals(tb.consume("b"), true);`,
        },
        {
          name: "returns false not undefined when empty",
          code: `const tb = new TokenBucket(1, 0);
tb.consume("x");
const result = tb.consume("x");
assertEquals(result, false);`,
        },
      ],
      hints: [
        "Use `Date.now()` (milliseconds) and divide by 1000 to get seconds elapsed.",
        "Cap with `Math.min(this.capacity, b.tokens + accrued)` before checking.",
        "Store `lastMs` on each bucket object, not globally — each key refills independently.",
      ],
    },

    // ── 2. In-Memory KV Store with TTL ───────────────────────────────────────
    {
      slug: "kv-store-ttl",
      title: "In-Memory KV Store with TTL",
      blurb: "Build the core of Redis: get, set, delete, and expiring keys.",
      xp: 40,
      language: "js",
      content: `## What you're building

A lightweight **key-value store with time-to-live (TTL)** expiry — the core primitive behind Redis, Memcached, and every in-memory cache.

## Requirements

Build a \`KVStore\` class:

- \`set(key, value, ttlMs)\` — store a value. If \`ttlMs\` is provided (> 0), the entry expires after that many milliseconds. If \`ttlMs\` is omitted or 0, the entry lives forever.
- \`get(key)\` — return the value, or \`undefined\` if missing or expired. Expired entries should be treated as absent.
- \`delete(key)\` — remove a key. Return \`true\` if it existed (and had not expired), \`false\` otherwise.
- \`has(key)\` — return \`true\` if the key exists and has not expired.
- \`size()\` — return the count of non-expired keys.

Expiry is **lazy**: check at access time using \`Date.now()\`. No \`setInterval\` or timers.

## Stretch goals

- \`keys()\` — return an array of all non-expired keys.
- \`flush()\` — delete all entries.

## What this proves

You can model time-sensitive state, understand lazy evaluation vs. eager cleanup, and implement the exact pattern Redis uses for key expiry. Every caching layer in a web app relies on this.`,
      starterCode: `class KVStore {
  constructor() {
    this.store = new Map(); // key → { value, expiresAt }  (expiresAt = null means no expiry)
  }

  set(key, value, ttlMs = 0) {
    // Store { value, expiresAt } where expiresAt = ttlMs > 0 ? Date.now() + ttlMs : null
    // TODO: implement
  }

  _isExpired(entry) {
    // Return true if entry has an expiresAt AND Date.now() is past it
    // TODO: implement
    return false;
  }

  get(key) {
    // Return value if key exists and is not expired; else return undefined
    // TODO: implement
    return undefined;
  }

  delete(key) {
    // Remove the key. Return true if it existed and was not expired.
    // TODO: implement
    return false;
  }

  has(key) {
    // Return true if key exists and is not expired
    // TODO: implement
    return false;
  }

  size() {
    // Count non-expired entries
    // TODO: implement
    return 0;
  }
}
`,
      solution: `class KVStore {
  constructor() {
    this.store = new Map();
  }
  set(key, value, ttlMs = 0) {
    const expiresAt = ttlMs > 0 ? Date.now() + ttlMs : null;
    this.store.set(key, { value, expiresAt });
  }
  _isExpired(entry) {
    return entry.expiresAt !== null && Date.now() > entry.expiresAt;
  }
  get(key) {
    const entry = this.store.get(key);
    if (!entry || this._isExpired(entry)) return undefined;
    return entry.value;
  }
  delete(key) {
    const entry = this.store.get(key);
    if (!entry || this._isExpired(entry)) return false;
    this.store.delete(key);
    return true;
  }
  has(key) {
    const entry = this.store.get(key);
    return !!entry && !this._isExpired(entry);
  }
  size() {
    let count = 0;
    for (const entry of this.store.values()) {
      if (!this._isExpired(entry)) count++;
    }
    return count;
  }
}`,
      tests: [
        {
          name: "set and get a value",
          code: `const kv = new KVStore();
kv.set("name", "alice");
assertEquals(kv.get("name"), "alice");`,
        },
        {
          name: "missing key returns undefined",
          code: `const kv = new KVStore();
assertEquals(kv.get("nope"), undefined);`,
        },
        {
          name: "delete returns true then false",
          code: `const kv = new KVStore();
kv.set("x", 42);
assertEquals(kv.delete("x"), true);
assertEquals(kv.delete("x"), false);`,
        },
        {
          name: "size counts only live keys",
          code: `const kv = new KVStore();
kv.set("a", 1);
kv.set("b", 2);
kv.delete("a");
assertEquals(kv.size(), 1);`,
        },
      ],
      hints: [
        "Store `{ value, expiresAt }` per key — `expiresAt = null` means immortal.",
        "Call `_isExpired` inside every public method that reads, not just `get`.",
        "`size()` must iterate the Map and skip expired entries — a simple counter won't do.",
      ],
    },

    // ── 3. Pub/Sub Message Bus ───────────────────────────────────────────────
    {
      slug: "pubsub-bus",
      title: "Pub/Sub Message Bus",
      blurb: "The backbone of microservices — build your own message broker.",
      xp: 50,
      language: "js",
      content: `## What you're building

A **publish/subscribe message bus** — the pattern at the core of Kafka, Redis Pub/Sub, Google Cloud Pub/Sub, and every microservices event system.

Unlike a plain event emitter, a pub/sub bus separates **topics** from **subscribers**, supports **multiple subscriber groups**, and can replay missed messages.

## Requirements

Build a \`PubSubBus\` class:

- \`subscribe(topic, handler)\` — register a handler for a topic. Return an unsubscribe function.
- \`publish(topic, message)\` — deliver \`message\` to all handlers subscribed to \`topic\`. Return the count of handlers called.
- \`unsubscribeAll(topic)\` — remove every subscriber for a topic.
- \`subscriberCount(topic)\` — return how many handlers are active for a topic.

The bus must support **wildcard topics**: if a handler subscribes to \`"*"\`, it receives messages from **every** topic.

## Stretch goals

- Message history: store the last N messages per topic (configurable). New subscribers can request a replay.
- Async handlers: detect returned Promises and await them before returning from \`publish\`.

## What this proves

You understand decoupled architecture, fan-out delivery, and the observer pattern at scale. Any senior backend interview may ask you to sketch a pub/sub system.`,
      starterCode: `class PubSubBus {
  constructor() {
    this.subscribers = new Map(); // topic → Set of handlers
  }

  subscribe(topic, handler) {
    // Register handler under topic.
    // Return a function that, when called, removes this handler.
    // TODO: implement
    return () => {};
  }

  publish(topic, message) {
    // Call all handlers for this exact topic AND all handlers for "*".
    // Return the total number of handlers called.
    // TODO: implement
    return 0;
  }

  unsubscribeAll(topic) {
    // Remove every subscriber for the given topic.
    // TODO: implement
  }

  subscriberCount(topic) {
    // Return how many handlers are subscribed to this topic (not including "*").
    // TODO: implement
    return 0;
  }
}
`,
      solution: `class PubSubBus {
  constructor() {
    this.subscribers = new Map();
  }
  _getSet(topic) {
    if (!this.subscribers.has(topic)) this.subscribers.set(topic, new Set());
    return this.subscribers.get(topic);
  }
  subscribe(topic, handler) {
    this._getSet(topic).add(handler);
    return () => this._getSet(topic).delete(handler);
  }
  publish(topic, message) {
    let count = 0;
    const topicHandlers = this.subscribers.get(topic) || new Set();
    const wildcardHandlers = topic !== "*" ? (this.subscribers.get("*") || new Set()) : new Set();
    for (const h of topicHandlers) { h(message, topic); count++; }
    for (const h of wildcardHandlers) { h(message, topic); count++; }
    return count;
  }
  unsubscribeAll(topic) {
    this.subscribers.delete(topic);
  }
  subscriberCount(topic) {
    return (this.subscribers.get(topic) || new Set()).size;
  }
}`,
      tests: [
        {
          name: "publish delivers to subscribers",
          code: `const bus = new PubSubBus();
let received = null;
bus.subscribe("orders", msg => { received = msg; });
bus.publish("orders", { id: 1 });
assertEquals(received.id, 1);`,
        },
        {
          name: "publish returns handler count",
          code: `const bus = new PubSubBus();
bus.subscribe("ping", () => {});
bus.subscribe("ping", () => {});
const count = bus.publish("ping", "hello");
assertEquals(count, 2);`,
        },
        {
          name: "unsubscribe function stops delivery",
          code: `const bus = new PubSubBus();
let calls = 0;
const unsub = bus.subscribe("news", () => calls++);
bus.publish("news", "a");
unsub();
bus.publish("news", "b");
assertEquals(calls, 1);`,
        },
        {
          name: "wildcard * receives all topics",
          code: `const bus = new PubSubBus();
let topics = [];
bus.subscribe("*", (msg, topic) => topics.push(topic));
bus.publish("a", 1);
bus.publish("b", 2);
assertEquals(topics.length, 2);
assertEquals(topics[0], "a");
assertEquals(topics[1], "b");`,
        },
      ],
      hints: [
        "Use `Map<string, Set<Function>>` so duplicate handler registrations don't silently stack.",
        "The returned unsubscribe closure must close over the exact `handler` reference.",
        "When publishing, collect topic handlers and wildcard handlers separately to avoid iterating a set you're modifying.",
      ],
    },

    // ── 4. Retry-with-Backoff ────────────────────────────────────────────────
    {
      slug: "retry-backoff",
      title: "Retry with Exponential Backoff",
      blurb: "Make flaky operations resilient — the pattern in every HTTP client.",
      xp: 50,
      language: "js",
      content: `## What you're building

A **retry scheduler with exponential backoff** — the algorithm that makes every production HTTP client, database connector, and job queue resilient to transient failures.

AWS SDKs, Axios retry plugins, PostgreSQL connection pools, and Kubernetes pod restart policies all implement this exact pattern.

## The algorithm

\`\`\`
attempt 1: immediate
attempt 2: wait baseMs * 2^0  (= baseMs)
attempt 3: wait baseMs * 2^1
attempt 4: wait baseMs * 2^2
...
cap each wait at maxMs
add optional jitter (±20%) to prevent thundering herd
\`\`\`

## Requirements

Build a **pure, synchronous** \`BackoffSchedule\` class (no async, no setTimeout — the sandbox is sync-only).

\`BackoffSchedule(maxAttempts, baseMs, maxMs)\`:

- \`nextDelay(attemptIndex)\` — given attempt index (0 = first retry after initial failure), return the delay in milliseconds that should be waited before this retry. Return \`-1\` if \`attemptIndex >= maxAttempts\`.
- \`shouldRetry(attemptIndex)\` — return \`true\` if another attempt is allowed.
- \`delays()\` — return an array of all scheduled delays (length = maxAttempts).

No jitter required for tests (keep it deterministic). Keep all delays between \`baseMs\` and \`maxMs\`.

## Stretch goals

- Add optional \`jitter\` factor (0–1) that randomises delay by ±(factor * delay).
- \`totalWaitMs()\` — sum of all delays.

## What this proves

You understand exponential backoff math, boundary clamping, and how to design retry policies that are both safe and testable without timers.`,
      starterCode: `class BackoffSchedule {
  constructor(maxAttempts, baseMs, maxMs) {
    this.maxAttempts = maxAttempts;
    this.baseMs = baseMs;
    this.maxMs = maxMs;
  }

  nextDelay(attemptIndex) {
    // Return -1 if attemptIndex >= maxAttempts.
    // Otherwise return Math.min(baseMs * 2^attemptIndex, maxMs).
    // TODO: implement
    return -1;
  }

  shouldRetry(attemptIndex) {
    // Return true if attemptIndex < maxAttempts
    // TODO: implement
    return false;
  }

  delays() {
    // Return array of all delays for attempts 0 .. maxAttempts-1
    // TODO: implement
    return [];
  }
}
`,
      solution: `class BackoffSchedule {
  constructor(maxAttempts, baseMs, maxMs) {
    this.maxAttempts = maxAttempts;
    this.baseMs = baseMs;
    this.maxMs = maxMs;
  }
  nextDelay(attemptIndex) {
    if (attemptIndex >= this.maxAttempts) return -1;
    return Math.min(this.baseMs * Math.pow(2, attemptIndex), this.maxMs);
  }
  shouldRetry(attemptIndex) {
    return attemptIndex < this.maxAttempts;
  }
  delays() {
    const result = [];
    for (let i = 0; i < this.maxAttempts; i++) {
      result.push(this.nextDelay(i));
    }
    return result;
  }
}`,
      tests: [
        {
          name: "first retry uses baseMs",
          code: `const bs = new BackoffSchedule(4, 100, 10000);
assertEquals(bs.nextDelay(0), 100);`,
        },
        {
          name: "delays double each attempt",
          code: `const bs = new BackoffSchedule(4, 100, 10000);
assertEquals(bs.nextDelay(1), 200);
assertEquals(bs.nextDelay(2), 400);
assertEquals(bs.nextDelay(3), 800);`,
        },
        {
          name: "delay is capped at maxMs",
          code: `const bs = new BackoffSchedule(5, 1000, 3000);
assertEquals(bs.nextDelay(4), 3000);`,
        },
        {
          name: "nextDelay returns -1 past maxAttempts",
          code: `const bs = new BackoffSchedule(3, 100, 10000);
assertEquals(bs.nextDelay(3), -1);
assertEquals(bs.shouldRetry(3), false);`,
        },
      ],
      hints: [
        "`2^attemptIndex` in JS is `Math.pow(2, attemptIndex)` or `2 ** attemptIndex`.",
        "Always clamp with `Math.min(..., this.maxMs)` — the cap applies even on the very first attempt if baseMs > maxMs.",
        "`delays()` can just call `nextDelay` in a bounded `for` loop from 0 to maxAttempts.",
      ],
    },

    // ── 5. Observable State (Reactive Store) ─────────────────────────────────
    {
      slug: "reactive-store",
      title: "Reactive State Store",
      blurb: "Build the core of Redux and Zustand — observable state from scratch.",
      xp: 60,
      language: "js",
      content: `## What you're building

A **reactive state store** — the primitive at the heart of Redux, Zustand, MobX, and Svelte's store contract. When state changes, all subscribers are notified automatically.

## Requirements

Build a \`Store\` class that accepts an initial state object:

- \`getState()\` — return the current state (a plain object). Return a **shallow copy** so callers cannot mutate internal state directly.
- \`setState(partial)\` — merge \`partial\` into current state (like React's \`setState\`). Notify all subscribers after the merge.
- \`subscribe(listener)\` — register a \`listener(newState, prevState)\` callback. Return an unsubscribe function.
- \`reset()\` — restore state to the original initial value and notify subscribers.
- \`select(selectorFn)\` — return \`selectorFn(currentState)\` (derived value, no subscription).

Subscribers must receive **copies**, not references to internal state, so mutating the argument has no effect on the store.

## Stretch goals

- Middleware support: accept an array of middleware functions that intercept \`setState\` calls.
- Computed/memoised selectors: \`createSelector\` that only recomputes when relevant slice changes.

## What this proves

You understand immutability, shallow merging, the observer pattern, and why frameworks like Redux enforce pure reducers. This is senior-level frontend/fullstack territory on any interview.`,
      starterCode: `class Store {
  constructor(initialState) {
    this._initial = Object.assign({}, initialState);
    this._state = Object.assign({}, initialState);
    this._listeners = new Set();
  }

  getState() {
    // Return a shallow copy of current state
    // TODO: implement
    return {};
  }

  setState(partial) {
    // Save prevState (copy), merge partial into _state, notify all listeners.
    // Listeners receive (newStateCopy, prevStateCopy).
    // TODO: implement
  }

  subscribe(listener) {
    // Add listener to _listeners.
    // Return a function that removes it.
    // TODO: implement
    return () => {};
  }

  reset() {
    // Restore _state to _initial and notify subscribers.
    // TODO: implement
  }

  select(selectorFn) {
    // Return selectorFn applied to current state.
    // TODO: implement
    return undefined;
  }
}
`,
      solution: `class Store {
  constructor(initialState) {
    this._initial = Object.assign({}, initialState);
    this._state = Object.assign({}, initialState);
    this._listeners = new Set();
  }
  getState() {
    return Object.assign({}, this._state);
  }
  setState(partial) {
    const prev = Object.assign({}, this._state);
    Object.assign(this._state, partial);
    const next = Object.assign({}, this._state);
    for (const fn of this._listeners) fn(next, prev);
  }
  subscribe(listener) {
    this._listeners.add(listener);
    return () => this._listeners.delete(listener);
  }
  reset() {
    const prev = Object.assign({}, this._state);
    this._state = Object.assign({}, this._initial);
    const next = Object.assign({}, this._state);
    for (const fn of this._listeners) fn(next, prev);
  }
  select(selectorFn) {
    return selectorFn(Object.assign({}, this._state));
  }
}`,
      tests: [
        {
          name: "getState returns initial values",
          code: `const s = new Store({ count: 0, name: "boots" });
assertEquals(s.getState().count, 0);
assertEquals(s.getState().name, "boots");`,
        },
        {
          name: "setState merges and notifies",
          code: `const s = new Store({ count: 0, flag: false });
let received = null;
s.subscribe((next) => { received = next; });
s.setState({ count: 5 });
assertEquals(received.count, 5);
assertEquals(received.flag, false);`,
        },
        {
          name: "unsubscribe stops notifications",
          code: `const s = new Store({ x: 1 });
let calls = 0;
const unsub = s.subscribe(() => calls++);
s.setState({ x: 2 });
unsub();
s.setState({ x: 3 });
assertEquals(calls, 1);`,
        },
        {
          name: "reset restores initial state",
          code: `const s = new Store({ score: 0 });
s.setState({ score: 99 });
s.reset();
assertEquals(s.getState().score, 0);`,
        },
      ],
      hints: [
        "Use `Object.assign({}, this._state)` for shallow copies — never hand out the real reference.",
        "In `setState`, capture `prev` BEFORE the merge so listeners get an accurate before/after pair.",
        "`reset` should copy `_initial` (not use it directly) so repeated resets always restore the original values.",
      ],
    },
  ],
};
