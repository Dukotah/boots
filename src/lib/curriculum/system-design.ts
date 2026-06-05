import type { Module } from "./types";

export const systemDesign: Module = {
  slug: "system-design",
  title: "System Design Fundamentals",
  description:
    "Learn how to design scalable, reliable systems. The interview round every senior engineer faces — covered from first principles.",
  emoji: "🏗️",
  gradient: "from-sky-400/20 to-blue-500/10",
  tagline: "ace the system design interview",
  keywords: [
    "system design interview",
    "scalability",
    "distributed systems",
    "backend architecture",
  ],
  lessons: [
    {
      slug: "what-is-system-design",
      title: "What Is System Design?",
      blurb: "Why system design matters for every software engineer.",
      xp: 20,
      kind: "quiz",
      content: `# What Is System Design?

System design is the process of defining the **architecture** of a software system to meet given requirements.

In interviews, you're asked to design things like:
- A URL shortener (like bit.ly)
- A social media feed (like Twitter/X)
- A ride-sharing service (like Uber)

## Why It Matters

Every real-world application needs to handle:
- **Scale** — millions of users, not 10
- **Reliability** — what happens when a server crashes?
- **Latency** — users expect < 200ms responses
- **Cost** — efficient use of compute and storage

## Key Vocabulary

| Term | Meaning |
|------|---------|
| **Client** | The device/app making a request |
| **Server** | The machine handling the request |
| **Database** | Persistent data storage |
| **Cache** | Fast, temporary storage |
| **Load Balancer** | Spreads traffic across servers |
| **CDN** | Serves static files close to users |

A great system design starts with understanding the **requirements** before jumping to solutions.`,
      questions: [
        {
          prompt: "What is the PRIMARY goal of system design?",
          options: [
            "Write code as fast as possible",
            "Define architecture to meet functional and non-functional requirements",
            "Choose the most popular programming language",
            "Avoid using databases",
          ],
          answer: 1,
          explanation:
            "System design is about architecture — how components fit together to meet requirements for scale, reliability, and performance.",
        },
        {
          prompt: "What does a Load Balancer do?",
          options: [
            "Stores user passwords securely",
            "Compresses images for faster loading",
            "Distributes incoming traffic across multiple servers",
            "Caches database queries",
          ],
          answer: 2,
          explanation:
            "A load balancer sits in front of your servers and distributes traffic so no single server is overwhelmed.",
        },
        {
          prompt: "Which component serves static assets (images, CSS, JS) closer to users globally?",
          options: ["Database", "Load Balancer", "CDN", "Message Queue"],
          answer: 2,
          explanation:
            "A Content Delivery Network (CDN) has servers around the world and serves static files from the location closest to the user.",
        },
      ],
    },
    {
      slug: "databases-101",
      title: "Choosing a Database",
      blurb: "SQL vs NoSQL — when to use each.",
      xp: 25,
      kind: "quiz",
      content: `# Choosing a Database

The database is almost always the bottleneck. Choosing the right type matters.

## SQL (Relational Databases)
Examples: PostgreSQL, MySQL, SQLite

**Use when:**
- You need **strong consistency** (financial transactions)
- Data has clear **relationships** (users → orders → products)
- You need **complex queries** (JOINs, aggregations)

\`\`\`sql
SELECT users.name, COUNT(orders.id) as order_count
FROM users
JOIN orders ON users.id = orders.user_id
GROUP BY users.id;
\`\`\`

## NoSQL (Non-Relational Databases)
Examples: MongoDB, DynamoDB, Redis, Cassandra

**Use when:**
- You need **massive scale** (billions of writes/day)
- Data is **unstructured** or changes shape often
- You need **extreme speed** (Redis for caching)

## The CAP Theorem

You can only guarantee **2 of 3**:
- **C**onsistency — every read gets the latest write
- **A**vailability — every request gets a response
- **P**artition Tolerance — survives network splits

SQL databases typically choose CP. Many NoSQL choose AP.`,
      questions: [
        {
          prompt: "You're building a banking system that processes transfers. Which database type fits best?",
          options: [
            "NoSQL (e.g., MongoDB) for speed",
            "SQL (e.g., PostgreSQL) for strong consistency",
            "A flat CSV file for simplicity",
            "A key-value store like Redis",
          ],
          answer: 1,
          explanation:
            "Banking requires strong consistency — you can't have a transfer partially succeed. SQL databases with ACID transactions are the right choice.",
        },
        {
          prompt: "You need to store 500 million social media posts with flexible schemas. What fits best?",
          options: [
            "A single MySQL table",
            "A NoSQL document store like MongoDB or DynamoDB",
            "An Excel spreadsheet",
            "A SQL database with strict schemas",
          ],
          answer: 1,
          explanation:
            "At massive scale with flexible/varied data shapes, NoSQL document stores excel. They're built for horizontal scaling.",
        },
        {
          prompt: "What does CAP theorem state?",
          options: [
            "You can achieve Consistency, Availability, AND Partition Tolerance simultaneously",
            "You can only guarantee 2 of 3: Consistency, Availability, Partition Tolerance",
            "All databases must be consistent",
            "Caching always improves availability",
          ],
          answer: 1,
          explanation:
            "CAP theorem says distributed systems must trade off between these three guarantees. No system gets all three.",
        },
      ],
    },
    {
      slug: "caching",
      title: "Caching Strategies",
      blurb: "Make your app 100x faster with smart caching.",
      xp: 30,
      content: `# Caching Strategies

Caching is storing expensive computation results temporarily so you don't recompute them.

## Why Cache?

- Database query: ~10ms
- Cache hit: ~0.1ms
- That's **100x faster**

## Cache Aside (Lazy Loading)

The most common pattern:

\`\`\`
function getUser(id) {
  // 1. Check cache first
  const cached = cache.get("user:" + id);
  if (cached) return cached;

  // 2. Cache miss — hit the database
  const user = db.query("SELECT * FROM users WHERE id = ?", id);

  // 3. Store in cache for next time
  cache.set("user:" + id, user, 3600); // third arg = TTL in seconds (1 hour)

  return user;
}
\`\`\`

## Write-Through Caching

Write to cache AND database simultaneously.
- Pros: Cache always fresh
- Cons: Every write is slower

## Cache Eviction Policies

When the cache is full, what gets removed?
- **LRU** (Least Recently Used) — most common
- **LFU** (Least Frequently Used)
- **FIFO** — first in, first out

## TTL (Time To Live)

Every cache entry should expire. If you cache a user's profile for 1 hour, stale data is at most 1 hour old.

## Your Task

Implement a simple LRU cache:`,
      starterCode: `class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map(); // Map preserves insertion order
  }

  get(key) {
    // Return the value for key, or -1 if it isn't cached.
    // On a hit, mark key as most-recently-used by moving it to the end
    // (delete it, then set it again).
    // TODO: implement
    return -1;
  }

  put(key, value) {
    // Insert or update key=value. If the cache is full, first evict the
    // least-recently-used entry — the FIRST key in the Map.
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
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }
}`,
      tests: [
        {
          name: "basic get/put",
          code: `const cache = new LRUCache(2);
cache.put(1, 1);
cache.put(2, 2);
assertEquals(cache.get(1), 1);`,
        },
        {
          name: "evicts LRU",
          code: `const cache = new LRUCache(2);
cache.put(1, 1);
cache.put(2, 2);
cache.get(1); // access 1, making 2 the LRU
cache.put(3, 3); // evicts 2
assertEquals(cache.get(2), -1); // 2 is gone`,
        },
        {
          name: "returns -1 for missing keys",
          code: `const cache = new LRUCache(2);
assertEquals(cache.get(99), -1);`,
        },
      ],
    },
    {
      slug: "api-design",
      title: "REST API Design",
      blurb: "Build APIs that other engineers love to use.",
      xp: 30,
      content: `# REST API Design

A REST API is how your frontend talks to your backend — and how services talk to each other.

## The 5 HTTP Methods

| Method | Use | Example |
|--------|-----|---------|
| **GET** | Read data | \`GET /users/123\` |
| **POST** | Create data | \`POST /users\` |
| **PUT** | Replace data | \`PUT /users/123\` |
| **PATCH** | Update part of data | \`PATCH /users/123\` |
| **DELETE** | Remove data | \`DELETE /users/123\` |

## URL Design Principles

✅ Good:
\`\`\`
GET  /users          — list all users
GET  /users/123      — get user 123
POST /users          — create a user
PUT  /users/123      — update user 123
DELETE /users/123    — delete user 123
\`\`\`

❌ Bad:
\`\`\`
GET /getAllUsers
POST /createNewUser
GET /deleteUser?id=123
\`\`\`

## HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK |
| 201 | Created |
| 400 | Bad Request (client error) |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Internal Server Error |

## Versioning

Always version your API:
\`\`\`
/api/v1/users
/api/v2/users
\`\`\`

This lets you make breaking changes without destroying existing clients.

## Your Task

Write a function that validates a REST endpoint definition:`,
      starterCode: `function isValidEndpoint(method, path) {
  // Valid methods: GET, POST, PUT, PATCH, DELETE
  // Valid paths: must start with /, no spaces, no query strings
  const validMethods = ["GET", "POST", "PUT", "PATCH", "DELETE"];

  // TODO: return true if both method and path are valid
  return false;
}
`,
      solution: `function isValidEndpoint(method, path) {
  const validMethods = ["GET", "POST", "PUT", "PATCH", "DELETE"];
  if (!validMethods.includes(method)) return false;
  if (!path.startsWith("/")) return false;
  if (path.includes(" ")) return false;
  if (path.includes("?")) return false;
  return true;
}`,
      tests: [
        {
          name: "valid GET",
          code: `assertEquals(isValidEndpoint("GET", "/users/123"), true);`,
        },
        {
          name: "invalid method",
          code: `assertEquals(isValidEndpoint("FETCH", "/users"), false);`,
        },
        {
          name: "path must start with /",
          code: `assertEquals(isValidEndpoint("POST", "users"), false);`,
        },
        {
          name: "no query strings in path",
          code: `assertEquals(isValidEndpoint("GET", "/users?id=1"), false);`,
        },
      ],
    },
    {
      slug: "url-shortener-design",
      title: "Design: URL Shortener",
      blurb: "Walk through designing a real system from scratch.",
      xp: 45,
      kind: "quiz",
      content: `# Design: URL Shortener

Let's design a URL shortener like **bit.ly** or **tinyurl.com**.

## Requirements

**Functional:**
- Given a long URL, return a short URL (e.g. \`boots.ly/abc123\`)
- Given a short URL, redirect to the original long URL
- Short URLs should be unique

**Non-functional:**
- 100 million new URLs/day (high write)
- 10 billion redirects/day (very high read)
- Low latency (< 50ms to redirect)
- URLs should never expire (unless user deletes)

## Estimation

- 100M writes/day = ~1,200 writes/second
- 10B reads/day = ~116,000 reads/second
- Read:Write ratio = ~100:1 → **read-heavy system**

## Core Components

\`\`\`
User → Load Balancer → App Servers → Cache (Redis)
                                   ↓ (cache miss)
                                 Database (PostgreSQL)
\`\`\`

## Generating Short Codes

6-character alphanumeric = 62^6 ≈ **56 billion** unique codes.

Options:
1. **Random + collision check** — simple but needs DB lookup
2. **Base62 encode an auto-increment ID** — no collisions, but sequential (guessable)
3. **Hash the long URL** — deterministic but needs deduplication

Most production systems use option 2 or 3.

## Database Schema

\`\`\`sql
CREATE TABLE urls (
  id         BIGINT PRIMARY KEY AUTO_INCREMENT,
  short_code VARCHAR(8)   NOT NULL UNIQUE,
  long_url   TEXT         NOT NULL,
  created_at TIMESTAMP    DEFAULT NOW(),
  click_count BIGINT      DEFAULT 0
);

CREATE INDEX idx_short_code ON urls(short_code);
\`\`\`

## Caching

Since reads dominate, cache the \`short_code → long_url\` mapping in Redis.
TTL of ~24 hours covers 99% of traffic (hot links stay hot).`,
      questions: [
        {
          prompt: "Our URL shortener has 100x more reads than writes. What should we optimize for?",
          options: [
            "Write throughput — more URLs per second",
            "Read latency — fast redirects via caching",
            "Storage size — compress every URL",
            "CPU usage — avoid expensive operations",
          ],
          answer: 1,
          explanation:
            "With 100:1 read/write ratio, the bottleneck is redirect speed. A Redis cache in front of the database means most reads never hit the DB.",
        },
        {
          prompt: "Which short code generation strategy guarantees no collisions?",
          options: [
            "Random 6-character string",
            "MD5 hash of the long URL",
            "Base62 encoding of an auto-increment database ID",
            "UUID v4",
          ],
          answer: 2,
          explanation:
            "Base62-encoding a monotonically increasing ID guarantees uniqueness since each ID is unique. Random strings and hashes can collide.",
        },
        {
          prompt: "Why add an index on short_code in the database?",
          options: [
            "To save disk space",
            "To make INSERT faster",
            "To make SELECT WHERE short_code = 'abc' much faster",
            "Required for all VARCHAR columns",
          ],
          answer: 2,
          explanation:
            "Without an index, every redirect requires a full table scan. With an index on short_code, lookups are O(log n) — essential at billions of redirects/day.",
        },
      ],
    },
    {
      slug: "scalability-patterns",
      title: "Scalability Patterns",
      blurb: "Horizontal scaling, sharding, and microservices.",
      xp: 35,
      kind: "quiz",
      content: `# Scalability Patterns

How do you handle 10x more traffic without rewriting everything?

## Vertical vs Horizontal Scaling

**Vertical (scale up):** Bigger machine — more CPU, RAM.
- Simple but has limits. A single machine can only get so big.

**Horizontal (scale out):** More machines.
- Requires a load balancer. Stateless services scale best.

## Stateless Services

A **stateless** service doesn't store anything between requests. All state lives in:
- A database
- A cache (Redis)
- A cookie/JWT the client sends

Stateless services can be cloned infinitely — just add more servers.

## Database Sharding

Split your database across multiple machines by a **shard key**.

Example — shard users by user_id:
- Shard 0: user_ids 0–999,999
- Shard 1: user_ids 1,000,000–1,999,999
- ...

Each shard is smaller and faster. Queries must include the shard key.

## Read Replicas

One **primary** database handles all writes.
Multiple **replicas** handle all reads.

For read-heavy workloads (social feeds, dashboards), this massively reduces primary load.

## Message Queues

Decouple producers from consumers:
\`\`\`
User uploads photo →  Queue  → Resize worker
                              → Thumbnail worker
                              → AI tagging worker
\`\`\`

If one worker crashes, messages stay in the queue. Classic queues: RabbitMQ, SQS, Kafka.

## Microservices

Split a monolith into small, independent services:
- **Auth Service** — handles login/JWT
- **User Service** — user profiles
- **Feed Service** — generates social feeds
- **Notification Service** — sends emails/push

Each service deploys independently, scales independently, and can use different tech stacks.`,
      questions: [
        {
          prompt: "You have a stateless web server with high CPU usage. What's the easiest way to handle 3x traffic?",
          options: [
            "Rewrite in a faster language",
            "Add a larger database",
            "Add more server instances behind a load balancer",
            "Enable HTTP/2",
          ],
          answer: 2,
          explanation:
            "Stateless services are trivially horizontally scalable. Add more instances behind a load balancer — no code changes needed.",
        },
        {
          prompt: "Your database is the bottleneck — 95% reads. What helps most?",
          options: [
            "Switch to NoSQL",
            "Add read replicas and cache frequently-read data",
            "Use a faster hard drive",
            "Enable database compression",
          ],
          answer: 1,
          explanation:
            "Read replicas let you spread SELECT queries across many machines. Caching (Redis) prevents most SELECTs from hitting the DB at all.",
        },
        {
          prompt: "What is the main benefit of a message queue?",
          options: [
            "It makes queries faster",
            "It decouples producers from consumers, improving reliability",
            "It replaces the need for a database",
            "It automatically scales your servers",
          ],
          answer: 1,
          explanation:
            "Message queues absorb traffic spikes and allow async processing. If a consumer crashes, messages wait — nothing is lost.",
        },
      ],
    },
  ],
};
