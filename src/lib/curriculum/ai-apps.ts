import type { Module } from "./types";

// Building AI-Powered Apps — the plumbing around the model call: safely parsing
// output, retrying, streaming, trimming history, and caching. Pure JS so every
// lesson runs and grades in-browser.
export const aiApps: Module = {
  slug: "ai-apps",
  title: "Building AI-Powered Apps",
  description:
    "The engineering around the model call: parse JSON output safely, retry failed requests, stream tokens, trim conversation history, and cache to cut cost.",
  emoji: "🛠️",
  gradient: "from-indigo-500/20 to-violet-500/10",
  tagline:
    "Build AI apps: parse LLM JSON safely, handle retries, stream responses, manage chat history, and reduce token cost.",
  keywords: [
    "build ai app",
    "llm app development",
    "parse llm json",
    "stream llm response",
    "ai app architecture",
  ],
  lessons: [
    {
      slug: "safe-json-parse",
      title: "Parse Model Output Safely",
      blurb: "Never let a malformed response crash your app.",
      xp: 30,
      content: `# Parse Model Output Safely

Even when you ask for JSON, a model can occasionally return something that won't
parse. In a real app a thrown \`SyntaxError\` shouldn't take down the request — you
want a **safe** parse that falls back to a default.

## Your task
Write \`safeParse(text, fallback)\` that returns \`JSON.parse(text)\` if it
succeeds, or \`fallback\` if parsing throws.`,
      starterCode: `function safeParse(text, fallback) {
  // try to parse; return fallback on failure
}
`,
      solution: `function safeParse(text, fallback) {
  try {
    return JSON.parse(text);
  } catch {
    return fallback;
  }
}`,
      tests: [
        {
          name: "parses valid JSON",
          code: `assertEquals(safeParse('{"ok":true}', null), { ok: true });`,
        },
        {
          name: "returns fallback on garbage",
          code: `assertEquals(safeParse("not json {", { error: true }), { error: true });`,
        },
        {
          name: "fallback can be an array",
          code: `assertEquals(safeParse("", []), []);`,
        },
      ],
      hints: [
        "Wrap `JSON.parse` in a `try/catch`.",
        "In the `catch`, just `return fallback;`.",
      ],
      explanation:
        "Treat model output like any untrusted input: parse defensively. A safe parse with a sensible fallback keeps one bad generation from becoming a 500 error.",
    },
    {
      slug: "extract-json-block",
      title: "Extract JSON From Chatter",
      blurb: "Pull the JSON out even when the model adds prose around it.",
      xp: 35,
      content: `# Extract JSON From Chatter

Sometimes the model wraps its JSON in friendly text: *"Sure! Here's the data:
{...} Hope that helps!"*. A robust app finds the JSON object inside the noise by
grabbing everything from the first \`{\` to the last \`}\`.

## Your task
Write \`extractJson(text)\` that returns the substring from the first \`{\` to the
last \`}\` (inclusive). If there's no \`{\`, return \`""\`.`,
      starterCode: `function extractJson(text) {
  // return the substring between the first { and last }
}
`,
      solution: `function extractJson(text) {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end < start) return "";
  return text.slice(start, end + 1);
}`,
      tests: [
        {
          name: "pulls JSON out of prose",
          code: `assertEquals(extractJson('Sure! Here: {"a":1} Hope that helps!'), '{"a":1}');`,
        },
        {
          name: "handles no braces",
          code: `assertEquals(extractJson("no json here"), "");`,
        },
        {
          name: "spans nested braces",
          code: `assertEquals(extractJson('x {"a":{"b":2}} y'), '{"a":{"b":2}}');`,
        },
      ],
      hints: [
        "`indexOf('{')` finds the start; `lastIndexOf('}')` finds the end.",
        "Use `slice(start, end + 1)` — slice's end index is exclusive.",
      ],
      explanation:
        "Grabbing from the first brace to the last is a pragmatic way to recover JSON from a chatty reply. Pair it with safeParse and you handle most real-world model output.",
    },
    {
      slug: "retry-with-backoff",
      title: "Compute Retry Backoff",
      blurb: "Wait longer after each failed attempt.",
      xp: 35,
      content: `# Compute Retry Backoff

LLM APIs return rate-limit and transient errors. The standard fix is to **retry
with exponential backoff**: wait longer after each failure so you don't hammer
the server. Attempt 0 waits the base delay, attempt 1 waits double, attempt 2
quadruple, and so on.

\`\`\`
delay = base × 2^attempt
\`\`\`

## Your task
Write \`backoffDelay(attempt, base)\` returning \`base × 2^attempt\`.`,
      starterCode: `function backoffDelay(attempt, base) {
  // base * 2^attempt
}
`,
      solution: `function backoffDelay(attempt, base) {
  return base * Math.pow(2, attempt);
}`,
      tests: [
        { name: "attempt 0 → base", code: `assertEquals(backoffDelay(0, 500), 500);` },
        { name: "attempt 1 → double", code: `assertEquals(backoffDelay(1, 500), 1000);` },
        { name: "attempt 3 → 8x", code: `assertEquals(backoffDelay(3, 250), 2000);` },
      ],
      hints: [
        "`Math.pow(2, attempt)` doubles for each step.",
        "Multiply that by `base`.",
      ],
      explanation:
        "Exponential backoff is the polite, reliable way to handle rate limits and blips. Real clients also add a little random 'jitter' so many clients don't retry in lockstep.",
    },
    {
      slug: "trim-history",
      title: "Trim Conversation History",
      blurb: "Keep recent turns but always preserve the system prompt.",
      xp: 40,
      content: `# Trim Conversation History

Long chats overflow the context window, so apps drop old turns. But you must
**always keep the system message** (index 0) — it defines the assistant's
behavior. So: keep message 0, plus the most recent \`maxTurns\` of the rest.

## Your task
Write \`trimHistory(messages, maxTurns)\`. \`messages[0]\` is the system message
and is always kept. From the remaining messages, keep only the last
\`maxTurns\`. Return the new array.`,
      starterCode: `function trimHistory(messages, maxTurns) {
  // always keep messages[0], then the last maxTurns of the rest
}
`,
      solution: `function trimHistory(messages, maxTurns) {
  const [system, ...rest] = messages;
  return [system, ...rest.slice(-maxTurns)];
}`,
      tests: [
        {
          name: "keeps system + last 2",
          code: `assertEquals(trimHistory(["sys", "a", "b", "c", "d"], 2), ["sys", "c", "d"]);`,
        },
        {
          name: "keeps all when under limit",
          code: `assertEquals(trimHistory(["sys", "a"], 5), ["sys", "a"]);`,
        },
      ],
      hints: [
        "Split off the system message: `const [system, ...rest] = messages;`.",
        "`rest.slice(-maxTurns)` keeps only the most recent turns.",
      ],
      explanation:
        "Pinning the system prompt while sliding a window over the conversation is the simplest history strategy that doesn't break the assistant's persona. Fancier apps summarize the dropped turns.",
    },
    {
      slug: "stream-accumulate",
      title: "Accumulate a Streamed Response",
      blurb: "Token chunks arrive one at a time — stitch them together.",
      xp: 35,
      content: `# Accumulate a Streamed Response

Streaming APIs send the answer as a series of small text **chunks** so the UI can
render words as they arrive. Your job is to join the chunks back into the full
message.

## Your task
Write \`accumulate(chunks)\` that concatenates an array of string chunks into one
string. An empty array returns \`""\`.`,
      starterCode: `function accumulate(chunks) {
  // join all chunks into one string
}
`,
      solution: `function accumulate(chunks) {
  return chunks.join("");
}`,
      tests: [
        {
          name: "joins chunks",
          code: `assertEquals(accumulate(["Hel", "lo, ", "world"]), "Hello, world");`,
        },
        { name: "empty stream", code: `assertEquals(accumulate([]), "");` },
      ],
      hints: [
        "`Array.prototype.join` with an empty separator does it in one call.",
        '`chunks.join("")`',
      ],
      explanation:
        "Streaming is just chunks over time; the client's job is to append them. Joining with an empty string reconstructs the full response while the UI shows it growing live.",
    },
    {
      slug: "cache-key",
      title: "Cache Identical Requests",
      blurb: "Skip the API call when you've seen the exact prompt before.",
      xp: 40,
      content: `# Cache Identical Requests

If two requests have the **same model and same prompt**, they'll (at temperature
0) produce the same answer — so you can cache the result and skip paying for it
twice. The foundation of a cache is a stable **key**.

## Your task
Write \`cacheKey(model, prompt)\` that returns \`"{model}::{prompt}"\`. Then write
\`getCached(cache, model, prompt)\` that returns \`cache[key]\` if present, else the
string \`"MISS"\`.`,
      starterCode: `function cacheKey(model, prompt) {
  // return "model::prompt"
}

function getCached(cache, model, prompt) {
  // return cache[cacheKey(...)] or "MISS"
}
`,
      solution: `function cacheKey(model, prompt) {
  return model + "::" + prompt;
}

function getCached(cache, model, prompt) {
  const key = cacheKey(model, prompt);
  return key in cache ? cache[key] : "MISS";
}`,
      tests: [
        {
          name: "builds the key",
          code: `assertEquals(cacheKey("opus", "hi"), "opus::hi");`,
        },
        {
          name: "returns a hit",
          code: `assertEquals(getCached({ "opus::hi": "hello!" }, "opus", "hi"), "hello!");`,
        },
        {
          name: "returns MISS",
          code: `assertEquals(getCached({}, "opus", "bye"), "MISS");`,
        },
      ],
      hints: [
        "Join model and prompt with a separator that won't appear in either, like `::`.",
        "Use `key in cache` to check for a hit before reading `cache[key]`.",
      ],
      explanation:
        "A deterministic cache key (model + prompt) lets you dedupe identical calls — a real cost saver for repeated queries. Providers also offer 'prompt caching' for reusing big shared prefixes.",
    },
  ],
};
