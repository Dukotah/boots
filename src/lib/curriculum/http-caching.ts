import type { Module } from "./types";

// HTTP Caching — Cache-Control directives, ETags, 304 flows, Vary headers.
// All code lessons run in-browser JS (no server needed); students build and
// inspect plain objects that model real HTTP header logic.
export const httpCaching: Module = {
  slug: "http-caching",
  title: "HTTP Caching",
  description:
    "Master the headers that make the web fast: Cache-Control directives, ETags, 304 Not Modified flows, and Vary. Build runnable models of real caching logic in JavaScript.",
  emoji: "⚡",
  gradient: "from-amber-400/20 to-orange-500/10",
  tagline:
    "Learn HTTP caching: Cache-Control, max-age, ETags, 304 Not Modified, stale-while-revalidate, and Vary headers.",
  keywords: [
    "http caching",
    "cache-control",
    "etag",
    "304 not modified",
    "vary header",
    "stale-while-revalidate",
    "web performance",
    "http headers",
  ],
  language: "js",
  lessons: [
    // ── Lesson 1: Cache-Control basics ────────────────────────────────────────
    {
      slug: "cache-control-basics",
      title: "Cache-Control Basics",
      blurb: "Set max-age and no-store to tell browsers how long to cache.",
      xp: 25,
      content: `# Cache-Control Basics

The \`Cache-Control\` response header is the primary tool for controlling how long
a resource stays in cache.

## Key directives

| Directive | Meaning |
|---|---|
| \`max-age=N\` | Cache is fresh for N seconds |
| \`no-store\` | Never cache — always fetch fresh |
| \`no-cache\` | Cache the response, but always revalidate before reuse |
| \`public\` | Any cache (CDN or browser) may store it |
| \`private\` | Only the end-user's browser may store it |

\`\`\`
Cache-Control: public, max-age=3600
\`\`\`

This tells every cache along the way: "Keep this for 1 hour."

## Your task

Write a function \`buildCacheControl(options)\` that accepts an object with these
optional boolean/number fields and returns a \`Cache-Control\` header string:

- \`noStore\` → include \`"no-store"\`
- \`noCache\` → include \`"no-cache"\`
- \`isPublic\` → include \`"public"\`; if falsy, include \`"private"\`
- \`maxAge\` (number) → include \`"max-age=<N>"\`

Directives are joined with \`", "\`.  When \`noStore\` is true, return **only**
\`"no-store"\` (all other directives are meaningless alongside it).

Examples:
\`\`\`js
buildCacheControl({ noStore: true })
// "no-store"

buildCacheControl({ isPublic: true, maxAge: 3600 })
// "public, max-age=3600"

buildCacheControl({ noCache: true, isPublic: false, maxAge: 0 })
// "private, no-cache, max-age=0"
\`\`\``,
      starterCode: `function buildCacheControl(options) {
  // TODO: build the Cache-Control header string from options
}
`,
      solution: `function buildCacheControl(options) {
  if (options.noStore) return "no-store";
  const parts = [];
  parts.push(options.isPublic ? "public" : "private");
  if (options.noCache) parts.push("no-cache");
  if (options.maxAge !== undefined) parts.push("max-age=" + options.maxAge);
  return parts.join(", ");
}`,
      tests: [
        {
          name: "noStore returns only 'no-store'",
          code: `assertEquals(buildCacheControl({ noStore: true }), "no-store");`,
        },
        {
          name: "public + max-age",
          code: `assertEquals(buildCacheControl({ isPublic: true, maxAge: 3600 }), "public, max-age=3600");`,
        },
        {
          name: "private + no-cache + max-age=0",
          code: `assertEquals(buildCacheControl({ noCache: true, isPublic: false, maxAge: 0 }), "private, no-cache, max-age=0");`,
        },
        {
          name: "noStore ignores other flags",
          code: `assertEquals(buildCacheControl({ noStore: true, maxAge: 86400, isPublic: true }), "no-store");`,
        },
        {
          name: "public only (no maxAge)",
          code: `assertEquals(buildCacheControl({ isPublic: true }), "public");`,
        },
      ],
      hints: [
        "Start with the noStore early-return.",
        "Build an array of strings and join with ', ' at the end.",
        "Check options.maxAge !== undefined so max-age=0 is included.",
      ],
    },

    // ── Lesson 2: Freshness calculation ───────────────────────────────────────
    {
      slug: "freshness",
      title: "Is the Cache Fresh?",
      blurb: "Calculate whether a cached response is still within its max-age.",
      xp: 30,
      content: `# Is the Cache Fresh?

A cached response is **fresh** when the time elapsed since it was stored is less
than \`max-age\`.

\`\`\`
age = currentTime - dateStored
isFresh = age < maxAge
\`\`\`

Once the age exceeds \`max-age\`, the entry is **stale** — the browser must either
revalidate with the server or fetch a new copy.

The \`Age\` response header (set by CDNs) tells you how many seconds old the
response already is when it arrives.  So the effective remaining life is:

\`\`\`
remaining = maxAge - age
\`\`\`

## Your task

Write \`isFresh(maxAge, ageSeconds)\` that returns \`true\` when the cached entry
is still fresh (age is **strictly less than** max-age) and \`false\` when stale.

Then write \`remainingTtl(maxAge, ageSeconds)\` that returns how many seconds of
freshness remain.  It should never return a negative number — clamp to \`0\`.`,
      starterCode: `function isFresh(maxAge, ageSeconds) {
  // return true if ageSeconds < maxAge
}

function remainingTtl(maxAge, ageSeconds) {
  // return maxAge - ageSeconds, clamped to 0
}
`,
      solution: `function isFresh(maxAge, ageSeconds) {
  return ageSeconds < maxAge;
}

function remainingTtl(maxAge, ageSeconds) {
  return Math.max(0, maxAge - ageSeconds);
}`,
      tests: [
        {
          name: "fresh when age < maxAge",
          code: `assertEquals(isFresh(3600, 100), true);`,
        },
        {
          name: "stale when age === maxAge",
          code: `assertEquals(isFresh(3600, 3600), false);`,
        },
        {
          name: "stale when age > maxAge",
          code: `assertEquals(isFresh(60, 120), false);`,
        },
        {
          name: "remainingTtl returns seconds left",
          code: `assertEquals(remainingTtl(3600, 100), 3500);`,
        },
        {
          name: "remainingTtl clamps to 0 when stale",
          code: `assertEquals(remainingTtl(60, 200), 0);`,
        },
      ],
      hints: [
        "isFresh is a single comparison: ageSeconds < maxAge.",
        "Use Math.max(0, ...) to avoid negative remainingTtl.",
      ],
    },

    // ── Lesson 3: ETags ────────────────────────────────────────────────────────
    {
      slug: "etags",
      title: "ETags — Fingerprint Your Resources",
      blurb: "Generate and compare ETags to detect content changes.",
      xp: 35,
      content: `# ETags — Fingerprint Your Resources

An **ETag** (entity tag) is an opaque identifier the server attaches to a
response.  It uniquely represents the current version of a resource — like a
fingerprint.

\`\`\`
HTTP/1.1 200 OK
ETag: "abc123"
\`\`\`

On the next request the browser sends it back:

\`\`\`
If-None-Match: "abc123"
\`\`\`

The server compares the ETag.  If the resource **hasn't changed**, it replies
with **304 Not Modified** (no body, saving bandwidth).  If it changed, it sends
the new content with a new ETag.

## Weak vs strong ETags

| Type | Syntax | Meaning |
|---|---|---|
| Strong | \`"abc123"\` | Byte-for-byte identical |
| Weak | \`W/"abc123"\` | Semantically equivalent |

## Your task

Write \`generateETag(content)\` that returns a **strong ETag** string (quoted)
based on the content's **length + a simple hash**: sum all char codes mod 65536,
format as hex, then combine as \`"<length>-<hex>"\`.

Write \`etagMatches(etag, ifNoneMatch)\` that returns \`true\` when the ETag in the
response matches the \`If-None-Match\` header value (exact string comparison).

\`\`\`js
generateETag("hello")       // e.g. "5-1f4" (5 chars, sum of char codes mod 65536 in hex)
etagMatches('"5-1f4"', '"5-1f4"')  // true
etagMatches('"5-1f4"', '"abc"')     // false
\`\`\``,
      starterCode: `function generateETag(content) {
  // 1. compute charcode sum mod 65536, convert to hex
  // 2. return quoted string: "<length>-<hex>"
}

function etagMatches(etag, ifNoneMatch) {
  // return true if etag === ifNoneMatch
}
`,
      solution: `function generateETag(content) {
  let sum = 0;
  for (let i = 0; i < content.length; i++) {
    sum = (sum + content.charCodeAt(i)) % 65536;
  }
  const hex = sum.toString(16);
  return '"' + content.length + "-" + hex + '"';
}

function etagMatches(etag, ifNoneMatch) {
  return etag === ifNoneMatch;
}`,
      tests: [
        {
          name: "generateETag returns a quoted string",
          code: `const tag = generateETag("hello"); assertEquals(tag[0], '"'); assertEquals(tag[tag.length-1], '"');`,
        },
        {
          name: "generateETag encodes length",
          code: `const tag = generateETag("hello"); assertEquals(tag.startsWith('"5-'), true);`,
        },
        {
          name: "same content produces same ETag",
          code: `assertEquals(generateETag("abc"), generateETag("abc"));`,
        },
        {
          name: "different content produces different ETag",
          code: `const a = generateETag("hello"); const b = generateETag("world"); assertEquals(a === b, false);`,
        },
        {
          name: "etagMatches: identical tags",
          code: `assertEquals(etagMatches('"5-1f4"', '"5-1f4"'), true);`,
        },
        {
          name: "etagMatches: different tags",
          code: `assertEquals(etagMatches('"5-1f4"', '"abc"'), false);`,
        },
      ],
      hints: [
        "Loop over content with charCodeAt(i) to sum char codes.",
        "Use Number.prototype.toString(16) to convert to hex.",
        "Wrap the final result in double-quote characters.",
        "etagMatches is simply ===.",
      ],
    },

    // ── Lesson 4: 304 Not Modified flow ───────────────────────────────────────
    {
      slug: "304-not-modified",
      title: "304 Not Modified Flow",
      blurb: "Model the conditional GET that saves bandwidth when nothing changed.",
      xp: 40,
      content: `# 304 Not Modified Flow

When a cached response is **stale**, the browser doesn't just throw it away.  It
can do a **conditional GET** — it sends the old ETag back to the server and asks:
"Has this changed?"

\`\`\`
GET /logo.png HTTP/1.1
If-None-Match: "abc123"
\`\`\`

The server logic:

1. Look up the current ETag for the resource.
2. If it **matches** → respond \`304 Not Modified\` (no body).
3. If it **doesn't match** → respond \`200 OK\` with the new content + new ETag.

A 304 saves the entire response body over the wire.  The browser reuses the
cached body it already has, but refreshes the freshness timer.

## Your task

Write \`handleConditionalGet(storedEtag, ifNoneMatch)\` that returns:

- \`{ status: 304 }\` when the ETags match
- \`{ status: 200, etag: storedEtag }\` when they don't match (or \`ifNoneMatch\` is absent)`,
      starterCode: `function handleConditionalGet(storedEtag, ifNoneMatch) {
  // return { status: 304 } on ETag match
  // return { status: 200, etag: storedEtag } otherwise
}
`,
      solution: `function handleConditionalGet(storedEtag, ifNoneMatch) {
  if (ifNoneMatch && ifNoneMatch === storedEtag) {
    return { status: 304 };
  }
  return { status: 200, etag: storedEtag };
}`,
      tests: [
        {
          name: "matching ETags → 304",
          code: `assertEquals(handleConditionalGet('"abc"', '"abc"').status, 304);`,
        },
        {
          name: "304 response has no etag field",
          code: `const r = handleConditionalGet('"abc"', '"abc"'); assertEquals(r.etag, undefined);`,
        },
        {
          name: "mismatched ETags → 200",
          code: `assertEquals(handleConditionalGet('"abc"', '"old"').status, 200);`,
        },
        {
          name: "200 response includes etag",
          code: `assertEquals(handleConditionalGet('"abc"', '"old"').etag, '"abc"');`,
        },
        {
          name: "no If-None-Match → 200",
          code: `assertEquals(handleConditionalGet('"abc"', undefined).status, 200);`,
        },
      ],
      hints: [
        "Check if ifNoneMatch exists before comparing.",
        "Return a plain object literal for each case.",
      ],
    },

    // ── Lesson 5: stale-while-revalidate ──────────────────────────────────────
    {
      slug: "stale-while-revalidate",
      title: "stale-while-revalidate",
      blurb: "Serve stale content instantly while refreshing in the background.",
      xp: 40,
      content: `# stale-while-revalidate

\`stale-while-revalidate=N\` extends the caching story beyond \`max-age\`.

\`\`\`
Cache-Control: max-age=60, stale-while-revalidate=300
\`\`\`

This means:
- **0–60 s**: fresh — serve from cache with no network request.
- **60–360 s**: stale, but serve the old response **immediately** while the
  browser fetches a new one in the background.
- **> 360 s**: must wait for a fresh response.

The user always gets a fast response; the staleness window is bounded.

## Your task

Write \`cacheDecision(maxAge, swr, ageSeconds)\` that returns one of three strings:

- \`"fresh"\` — age is within max-age
- \`"stale-while-revalidate"\` — age is beyond max-age but within max-age + swr
- \`"must-revalidate"\` — age exceeds max-age + swr`,
      starterCode: `function cacheDecision(maxAge, swr, ageSeconds) {
  // "fresh" | "stale-while-revalidate" | "must-revalidate"
}
`,
      solution: `function cacheDecision(maxAge, swr, ageSeconds) {
  if (ageSeconds < maxAge) return "fresh";
  if (ageSeconds < maxAge + swr) return "stale-while-revalidate";
  return "must-revalidate";
}`,
      tests: [
        {
          name: "within max-age → fresh",
          code: `assertEquals(cacheDecision(60, 300, 30), "fresh");`,
        },
        {
          name: "exactly at max-age → stale-while-revalidate",
          code: `assertEquals(cacheDecision(60, 300, 60), "stale-while-revalidate");`,
        },
        {
          name: "inside swr window → stale-while-revalidate",
          code: `assertEquals(cacheDecision(60, 300, 200), "stale-while-revalidate");`,
        },
        {
          name: "exactly at max-age + swr → must-revalidate",
          code: `assertEquals(cacheDecision(60, 300, 360), "must-revalidate");`,
        },
        {
          name: "well past window → must-revalidate",
          code: `assertEquals(cacheDecision(60, 300, 9999), "must-revalidate");`,
        },
      ],
      hints: [
        "Three ranges: [0, maxAge), [maxAge, maxAge+swr), [maxAge+swr, ∞).",
        "Use two if checks, fall through to return the last string.",
      ],
    },

    // ── Lesson 6: Vary header ─────────────────────────────────────────────────
    {
      slug: "vary-header",
      title: "Vary — Cache Keys Beyond the URL",
      blurb: "Understand how Vary creates separate cache entries per header value.",
      xp: 35,
      content: `# Vary — Cache Keys Beyond the URL

By default the cache key is just the URL.  But sometimes the same URL returns
different content depending on a request header — for example, a compressed
response for clients that send \`Accept-Encoding: gzip\`, or a localised response
for \`Accept-Language: fr\`.

The \`Vary\` response header tells the cache to **include named request headers in
the cache key**:

\`\`\`
Vary: Accept-Encoding
Vary: Accept-Encoding, Accept-Language
\`\`\`

If you cache \`/data\` once for \`Accept-Encoding: gzip\` and the next request sends
\`Accept-Encoding: br\`, the cache treats them as **different entries** and fetches
fresh.

## Your task

Write \`varyCacheKey(url, varyHeaders, requestHeaders)\` that:

1. Starts with the URL as the key.
2. For each header name listed in \`varyHeaders\` (an array of lowercase strings),
   appends \`|<name>=<value>\` using the value from \`requestHeaders\` (or
   \`""\` if absent).
3. Returns the combined cache-key string.

\`\`\`js
varyCacheKey(
  "/data",
  ["accept-encoding", "accept-language"],
  { "accept-encoding": "gzip", "accept-language": "en" }
)
// "/data|accept-encoding=gzip|accept-language=en"
\`\`\``,
      starterCode: `function varyCacheKey(url, varyHeaders, requestHeaders) {
  // start with url, append |name=value for each vary header
}
`,
      solution: `function varyCacheKey(url, varyHeaders, requestHeaders) {
  let key = url;
  for (const name of varyHeaders) {
    key += "|" + name + "=" + (requestHeaders[name] || "");
  }
  return key;
}`,
      tests: [
        {
          name: "no vary headers → just the URL",
          code: `assertEquals(varyCacheKey("/data", [], {}), "/data");`,
        },
        {
          name: "single vary header present",
          code: `assertEquals(varyCacheKey("/data", ["accept-encoding"], {"accept-encoding": "gzip"}), "/data|accept-encoding=gzip");`,
        },
        {
          name: "two vary headers",
          code: `assertEquals(varyCacheKey("/data", ["accept-encoding", "accept-language"], {"accept-encoding": "gzip", "accept-language": "en"}), "/data|accept-encoding=gzip|accept-language=en");`,
        },
        {
          name: "missing header value defaults to empty string",
          code: `assertEquals(varyCacheKey("/data", ["accept-language"], {}), "/data|accept-language=");`,
        },
        {
          name: "different header values produce different keys",
          code: `const k1 = varyCacheKey("/x", ["ae"], {"ae": "gzip"}); const k2 = varyCacheKey("/x", ["ae"], {"ae": "br"}); assertEquals(k1 === k2, false);`,
        },
      ],
      hints: [
        "Start with key = url and concatenate in a loop.",
        "Use (requestHeaders[name] || '') as the fallback for missing headers.",
      ],
    },

    // ── Lesson 7: Cache-Control immutable + versioned URLs ────────────────────
    {
      slug: "immutable-versioned",
      title: "Immutable Assets & Versioned URLs",
      blurb: "Cache hashed filenames forever with the immutable directive.",
      xp: 30,
      content: `# Immutable Assets & Versioned URLs

For static assets bundlers produce content-hashed filenames like
\`main.a3f9b2.js\`.  The hash changes whenever the content changes, so the URL
is unique per version.  This lets you cache the file **forever**:

\`\`\`
Cache-Control: public, max-age=31536000, immutable
\`\`\`

\`immutable\` tells the browser: "I promise this URL's content will never change —
don't even bother with a conditional revalidation while it's fresh."

For the HTML page itself (which must always be fresh to load the right JS/CSS),
use:

\`\`\`
Cache-Control: no-cache
\`\`\`

This pattern — **aggressively cache assets, never cache the HTML** — is the
standard for modern SPAs.

## Your task

Write \`cacheHeaderForAsset(filename)\` that returns the appropriate
\`Cache-Control\` header string:

- If the filename contains a content hash (a hex segment of **6–20 lowercase
  hex chars** preceded by a dot and followed by a dot or end-of-string), return
  \`"public, max-age=31536000, immutable"\`.
- Otherwise return \`"no-cache"\`.

A content hash looks like: \`main.a3f9b2.js\`, \`chunk.abc123def456.css\`,
\`logo.1a2b3c4d.png\`.

Hint: use a regex to detect the hash pattern.`,
      starterCode: `function cacheHeaderForAsset(filename) {
  // detect content-hash pattern and return appropriate Cache-Control
}
`,
      solution: `function cacheHeaderForAsset(filename) {
  const hashPattern = /\\.[0-9a-f]{6,20}(\\.|$)/;
  if (hashPattern.test(filename)) {
    return "public, max-age=31536000, immutable";
  }
  return "no-cache";
}`,
      tests: [
        {
          name: "hashed JS file → immutable",
          code: `assertEquals(cacheHeaderForAsset("main.a3f9b2.js"), "public, max-age=31536000, immutable");`,
        },
        {
          name: "hashed CSS file → immutable",
          code: `assertEquals(cacheHeaderForAsset("styles.abc123def456.css"), "public, max-age=31536000, immutable");`,
        },
        {
          name: "hashed PNG → immutable",
          code: `assertEquals(cacheHeaderForAsset("logo.1a2b3c4d.png"), "public, max-age=31536000, immutable");`,
        },
        {
          name: "plain HTML → no-cache",
          code: `assertEquals(cacheHeaderForAsset("index.html"), "no-cache");`,
        },
        {
          name: "un-hashed JS → no-cache",
          code: `assertEquals(cacheHeaderForAsset("app.js"), "no-cache");`,
        },
      ],
      hints: [
        "Use a regular expression that matches a dot, 6-20 lowercase hex chars, then a dot or end of string.",
        "In a JS string template, write \\\\. for a literal dot in a regex.",
        "\\\\.[0-9a-f]{6,20}(\\\\.|$) is the core pattern.",
      ],
    },

    // ── Lesson 8: Putting it all together — cache simulation ──────────────────
    {
      slug: "cache-simulation",
      title: "Mini Cache Simulation",
      blurb: "Build a tiny in-memory HTTP cache that handles all the flows.",
      xp: 50,
      content: `# Mini Cache Simulation

Time to wire everything together.  You'll implement a tiny in-memory HTTP cache
that handles:

1. **Cache miss** — entry absent → return \`null\` (caller should fetch from origin).
2. **Fresh hit** — entry present and still fresh → return cached entry.
3. **Stale, ETag revalidation** — entry stale and has an ETag → return the
   ETag so the caller can do a conditional GET.

The cache stores entries as \`{ body, etag, maxAge, storedAt }\` where
\`storedAt\` is a timestamp (seconds).

## Your task

Write a \`SimpleCache\` class with:

- \`set(url, body, etag, maxAge, now)\` — stores the entry.
- \`get(url, now)\` — returns one of:
  - \`{ hit: "fresh", body }\` — fresh hit
  - \`{ hit: "stale", etag }\` — stale, has ETag for revalidation (etag may be \`null\`)
  - \`{ hit: "miss" }\` — not in cache`,
      starterCode: `class SimpleCache {
  constructor() {
    this.store = {};
  }

  set(url, body, etag, maxAge, now) {
    // store the entry
  }

  get(url, now) {
    // return { hit: "fresh", body } | { hit: "stale", etag } | { hit: "miss" }
  }
}
`,
      solution: `class SimpleCache {
  constructor() {
    this.store = {};
  }

  set(url, body, etag, maxAge, now) {
    this.store[url] = { body, etag, maxAge, storedAt: now };
  }

  get(url, now) {
    const entry = this.store[url];
    if (!entry) return { hit: "miss" };
    const age = now - entry.storedAt;
    if (age < entry.maxAge) return { hit: "fresh", body: entry.body };
    return { hit: "stale", etag: entry.etag };
  }
}`,
      tests: [
        {
          name: "miss when empty",
          code: `const c = new SimpleCache(); assertEquals(c.get("/x", 0).hit, "miss");`,
        },
        {
          name: "fresh hit within max-age",
          code: `const c = new SimpleCache(); c.set("/x", "hello", '"abc"', 60, 0); const r = c.get("/x", 10); assertEquals(r.hit, "fresh"); assertEquals(r.body, "hello");`,
        },
        {
          name: "stale when age >= max-age",
          code: `const c = new SimpleCache(); c.set("/x", "hello", '"abc"', 60, 0); assertEquals(c.get("/x", 60).hit, "stale");`,
        },
        {
          name: "stale result includes etag",
          code: `const c = new SimpleCache(); c.set("/x", "hello", '"abc"', 60, 0); assertEquals(c.get("/x", 100).etag, '"abc"');`,
        },
        {
          name: "fresh hit returns correct body",
          code: `const c = new SimpleCache(); c.set("/page", "content", null, 3600, 1000); assertEquals(c.get("/page", 1500).body, "content");`,
        },
        {
          name: "different URLs cached independently",
          code: `const c = new SimpleCache(); c.set("/a", "A", null, 60, 0); c.set("/b", "B", null, 60, 0); assertEquals(c.get("/a", 10).body, "A"); assertEquals(c.get("/b", 10).body, "B");`,
        },
      ],
      hints: [
        "Store entries in a plain object keyed by URL.",
        "Compute age = now - entry.storedAt inside get().",
        "Return { hit: 'stale', etag: entry.etag } — etag may be null, that's fine.",
      ],
    },

    // ── Lesson 9: Concepts quiz ────────────────────────────────────────────────
    {
      slug: "caching-concepts-quiz",
      title: "Caching Concepts Quiz",
      blurb: "Test your grasp of ETags, 304s, Vary, and cache directives.",
      xp: 25,
      kind: "quiz",
      content: `# Caching Concepts Quiz

You've learned all the major HTTP caching primitives.  Let's check how well they
stuck.  Each question covers a real scenario you'll encounter when building or
debugging web apps.`,
      questions: [
        {
          prompt:
            "A browser has a stale cached response with an ETag of `\"v2\"`. It sends `If-None-Match: \"v2\"` and the server's current ETag is still `\"v2\"`. What does the server respond?",
          options: [
            "200 OK with the full response body",
            "304 Not Modified with no body",
            "404 Not Found",
            "412 Precondition Failed",
          ],
          answer: 1,
          explanation:
            "The ETags match, so the resource hasn't changed. The server sends 304 Not Modified — no body needed, saving bandwidth.",
        },
        {
          prompt:
            "Which `Cache-Control` directive tells a CDN and the browser to cache a response, but to always revalidate it with the server before serving it?",
          options: [
            "no-store",
            "private",
            "no-cache",
            "max-age=0, must-revalidate",
          ],
          answer: 2,
          explanation:
            "`no-cache` means: store the response, but send a conditional request to the server before each use. `no-store` means don't cache at all. `max-age=0, must-revalidate` is functionally equivalent but more verbose.",
        },
        {
          prompt:
            "Your API returns different JSON depending on the `Accept-Language` request header. Which response header prevents different users' responses from being mixed up in a shared CDN cache?",
          options: [
            "Cache-Control: private",
            "Vary: Accept-Language",
            "ETag: language",
            "Content-Type: application/json",
          ],
          answer: 1,
          explanation:
            "`Vary: Accept-Language` instructs the CDN to include the `Accept-Language` header in the cache key, so English and French responses are stored as separate entries.",
        },
        {
          prompt:
            "You deploy `main.3a7f12.js` with `Cache-Control: public, max-age=31536000, immutable`. Six months later you change the JS — what must you do to ensure users get the new file?",
          options: [
            "Set a shorter max-age",
            "Remove the immutable directive",
            "Change the filename (new content hash)",
            "Tell users to clear their cache",
          ],
          answer: 2,
          explanation:
            "Because the URL is cached forever, the only way to deliver new content is to change the URL — which is exactly what content-hash filenames do automatically.",
        },
        {
          prompt:
            "With `Cache-Control: max-age=60, stale-while-revalidate=120`, a response that is 100 seconds old is served to a user. What happens?",
          options: [
            "The browser blocks and fetches a new response before serving",
            "The browser serves the stale response and revalidates in the background",
            "The browser discards the response and shows an error",
            "The browser sends a 304 request",
          ],
          answer: 1,
          explanation:
            "100 seconds is beyond max-age (60 s) but within max-age + swr (180 s), so the stale response is served immediately while a background revalidation happens — the user notices no delay.",
        },
      ],
    },
  ],
};
