import type { Module } from "./types";

// "Learn to use LLMs" — high-SEO, on-theme, and fully runnable in-browser.
// Concepts are taught through small JS exercises (token estimating, prompt
// templating, message arrays) so they auto-grade with the same engine.
export const aiLlms: Module = {
  slug: "ai-llms",
  title: "Learn AI: Build with LLMs",
  description:
    "Understand how large language models actually work and learn to prompt, structure messages, and design AI features — through hands-on code.",
  emoji: "🤖",
  gradient: "from-violet-500/20 to-fuchsia-500/10",
  tagline:
    "Learn to use LLMs and build AI apps: tokens, prompt engineering, chat messages, few-shot, and system prompts.",
  lessons: [
    {
      slug: "what-is-an-llm",
      title: "What Is an LLM? (Tokens)",
      blurb: "Models read text as tokens, not words.",
      xp: 25,
      content: `# What Is an LLM?

A **Large Language Model (LLM)** like Claude or GPT predicts the next chunk of
text given everything before it. It doesn't see words — it sees **tokens**
(roughly word-pieces). Token count drives both **cost** and **context limits**,
so estimating tokens is a real-world skill.

A crude-but-useful rule of thumb: **~1 token per word** for plain English. We'll
use a simple word-count estimate.

## Your task
Write a function \`estimateTokens\` that takes a string and returns the number of
whitespace-separated words. An empty (or whitespace-only) string is \`0\`.`,
      starterCode: `function estimateTokens(text) {
  // return the number of words in text
}
`,
      solution: `function estimateTokens(text) {
  const trimmed = text.trim();
  if (trimmed === "") return 0;
  return trimmed.split(/\\s+/).length;
}`,
      tests: [
        { name: '"hello world" → 2', code: `assertEquals(estimateTokens("hello world"), 2);` },
        { name: 'empty string → 0', code: `assertEquals(estimateTokens(""), 0);` },
        { name: 'whitespace only → 0', code: `assertEquals(estimateTokens("   "), 0);` },
        {
          name: "handles extra spaces",
          code: `assertEquals(estimateTokens("  write   clean   code "), 3);`,
        },
      ],
    },
    {
      slug: "prompt-engineering",
      title: "Prompt Engineering Basics",
      blurb: "Give the model a role and a clear task.",
      xp: 30,
      content: `# Prompt Engineering Basics

The quality of an LLM's output depends heavily on the **prompt**. A reliable
pattern is: **state a role, then the task.** Clear structure beats clever wording.

We want prompts shaped exactly like:

\`\`\`
You are a helpful assistant.
Task: Summarize the meeting notes.
\`\`\`

## Your task
Write \`buildPrompt(role, task)\` that returns a string in this exact format:

\`You are {role}.\\nTask: {task}\`

(That's a newline between the two lines.)`,
      starterCode: `function buildPrompt(role, task) {
  // return "You are {role}.\\nTask: {task}"
}
`,
      solution: `function buildPrompt(role, task) {
  return "You are " + role + ".\\nTask: " + task;
}`,
      tests: [
        {
          name: "formats role and task",
          code: `assertEquals(buildPrompt("a helpful assistant", "Summarize the notes"), "You are a helpful assistant.\\nTask: Summarize the notes");`,
        },
        {
          name: "works with other inputs",
          code: `assertEquals(buildPrompt("an expert chef", "Write a recipe"), "You are an expert chef.\\nTask: Write a recipe");`,
        },
      ],
    },
    {
      slug: "chat-messages",
      title: "The Chat Messages Format",
      blurb: "How conversations are sent to an API.",
      xp: 30,
      content: `# The Chat Messages Format

Modern LLM APIs (Anthropic, OpenAI) take a **list of messages**. Each message has
a \`role\` (\`"user"\` or \`"assistant"\`) and \`content\`. The model continues the
conversation.

\`\`\`js
[
  { role: "user", content: "Hi!" },
  { role: "assistant", content: "Hello! How can I help?" }
]
\`\`\`

## Your task
Write \`toMessages(turns)\` that takes an array of plain strings and returns a
messages array. The **first** string is from the \`"user"\`, and roles then
**alternate** user → assistant → user → ...`,
      starterCode: `function toMessages(turns) {
  // alternate roles starting with "user"
}
`,
      solution: `function toMessages(turns) {
  return turns.map((content, i) => ({
    role: i % 2 === 0 ? "user" : "assistant",
    content,
  }));
}`,
      tests: [
        {
          name: "alternates roles",
          code: `assertEquals(toMessages(["hi", "hello", "thanks"]), [{ role: "user", content: "hi" }, { role: "assistant", content: "hello" }, { role: "user", content: "thanks" }]);`,
        },
        {
          name: "empty input → empty array",
          code: `assertEquals(toMessages([]), []);`,
        },
      ],
    },
    {
      slug: "few-shot",
      title: "Few-Shot Prompting",
      blurb: "Teach by example inside the prompt.",
      xp: 35,
      content: `# Few-Shot Prompting

**Few-shot** prompting shows the model a handful of input→output examples so it
infers the pattern, then gives it a new input. It's one of the most powerful
techniques for steering output format.

We want output like:

\`\`\`
Input: hello
Output: HELLO

Input: bye
Output: BYE

Input: cat
Output:
\`\`\`

## Your task
Write \`fewShot(examples, query)\` where \`examples\` is an array of
\`{ input, output }\` objects. Render each example as \`Input: x\\nOutput: y\`,
join examples with a **blank line** (\`\\n\\n\`), then append the new query block
\`\\n\\nInput: {query}\\nOutput:\` (note: nothing after \`Output:\`).`,
      starterCode: `function fewShot(examples, query) {
  // build a few-shot prompt ending with the new query
}
`,
      solution: `function fewShot(examples, query) {
  const shots = examples
    .map((e) => "Input: " + e.input + "\\nOutput: " + e.output)
    .join("\\n\\n");
  return shots + "\\n\\nInput: " + query + "\\nOutput:";
}`,
      tests: [
        {
          name: "builds a two-shot prompt",
          code: `assertEquals(fewShot([{ input: "hello", output: "HELLO" }, { input: "bye", output: "BYE" }], "cat"), "Input: hello\\nOutput: HELLO\\n\\nInput: bye\\nOutput: BYE\\n\\nInput: cat\\nOutput:");`,
        },
      ],
    },
    {
      slug: "system-prompt",
      title: "System Prompts & Requests",
      blurb: "Assemble a real API request object.",
      xp: 35,
      content: `# System Prompts & Requests

A **system prompt** sets persistent behavior/persona for the whole conversation.
A request to an LLM API bundles the model name, the system prompt, the messages,
and sampling settings like **temperature** (higher = more creative/random).

## Your task
Write \`buildRequest(system, messages)\` that returns an object:

\`\`\`js
{
  model: "claude-opus-4-8",
  system: system,
  messages: messages,
  temperature: 0.7
}
\`\`\`

Use exactly those keys and that default temperature.`,
      starterCode: `function buildRequest(system, messages) {
  // return the request object described above
}
`,
      solution: `function buildRequest(system, messages) {
  return {
    model: "claude-opus-4-8",
    system,
    messages,
    temperature: 0.7,
  };
}`,
      tests: [
        {
          name: "assembles the request",
          code: `assertEquals(buildRequest("Be concise.", [{ role: "user", content: "hi" }]), { model: "claude-opus-4-8", system: "Be concise.", messages: [{ role: "user", content: "hi" }], temperature: 0.7 });`,
        },
      ],
    },
    {
      slug: "temperature",
      title: "Temperature & Sampling",
      blurb: "Control how creative the model is.",
      xp: 30,
      content: `# Temperature & Sampling

**Temperature** controls randomness: \`0\` is focused and deterministic (great for
extraction), higher values are more creative. Different providers use different
ranges — Anthropic caps at \`1\`, OpenAI allows up to \`2\` — so a safe wrapper
clamps user input into a sensible range.

## Your task
Write \`clampTemperature(t)\` that limits \`t\` to the range \`[0, 2]\`.`,
      starterCode: `function clampTemperature(t) {
  // keep t within 0..2
}
`,
      solution: `function clampTemperature(t) {
  return Math.max(0, Math.min(2, t));
}`,
      tests: [
        { name: "in range", code: `assertEquals(clampTemperature(0.7), 0.7);` },
        { name: "too high", code: `assertEquals(clampTemperature(5), 2);` },
        { name: "negative", code: `assertEquals(clampTemperature(-1), 0);` },
      ],
    },
    {
      slug: "token-cost",
      title: "Estimating Cost",
      blurb: "Tokens are billed per million.",
      xp: 35,
      content: `# Estimating Cost

LLM pricing is quoted **per million tokens**. To budget a feature you convert a
token count into dollars:

\`\`\`
cost = (tokens / 1,000,000) × pricePerMillion
\`\`\`

## Your task
Write \`costDollars(tokens, pricePerMillion)\` returning the cost in dollars,
rounded to 4 decimal places.`,
      starterCode: `function costDollars(tokens, pricePerMillion) {
  // (tokens / 1e6) * pricePerMillion, rounded to 4 decimals
}
`,
      solution: `function costDollars(tokens, pricePerMillion) {
  return Math.round((tokens / 1000000) * pricePerMillion * 10000) / 10000;
}`,
      tests: [
        { name: "1M tokens at $3", code: `assertEquals(costDollars(1000000, 3), 3);` },
        { name: "500k at $10", code: `assertEquals(costDollars(500000, 10), 5);` },
        { name: "zero tokens", code: `assertEquals(costDollars(0, 15), 0);` },
      ],
    },
    {
      slug: "context-window",
      title: "The Context Window",
      blurb: "Models can only see so much at once.",
      xp: 35,
      content: `# The Context Window

An LLM can only attend to a limited **context window**. For long chats you keep
the most **recent** messages and drop older ones. A simple sliding window keeps
the last N turns.

\`\`\`js
messages.slice(-3); // the last 3 messages
\`\`\`

## Your task
Write \`recentMessages(messages, maxCount)\` returning the last \`maxCount\`
messages (or all of them if there are fewer).`,
      starterCode: `function recentMessages(messages, maxCount) {
  // keep only the most recent maxCount messages
}
`,
      solution: `function recentMessages(messages, maxCount) {
  return messages.slice(-maxCount);
}`,
      tests: [
        { name: "keeps last 2", code: `assertEquals(recentMessages([1, 2, 3, 4], 2), [3, 4]);` },
        { name: "fewer than max", code: `assertEquals(recentMessages([1, 2], 5), [1, 2]);` },
        { name: "empty", code: `assertEquals(recentMessages([], 3), []);` },
      ],
    },
    {
      slug: "cosine-similarity",
      title: "Embeddings & Similarity",
      blurb: "How semantic search ranks results.",
      xp: 45,
      content: `# Embeddings & Similarity

LLMs turn text into **embeddings** — vectors of numbers. Similar meanings have
vectors pointing the same way, measured by **cosine similarity**:

\`\`\`
cosine(a, b) = dot(a, b) / (|a| × |b|)
\`\`\`

Result ranges from \`1\` (identical direction) to \`-1\` (opposite direction), with
\`0\` meaning unrelated. In practice, text embedding vectors are non-negative, so
similarity scores land in \`[0, 1]\`. This is the math behind semantic search and RAG.

## Your task
Write \`cosine(a, b)\` for two equal-length vectors, rounded to 2 decimals.`,
      starterCode: `function cosine(a, b) {
  // dot product / (magnitude a * magnitude b), rounded to 2 decimals
}
`,
      solution: `function cosine(a, b) {
  let dot = 0;
  let magA = 0;
  let magB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }
  const denom = Math.sqrt(magA) * Math.sqrt(magB);
  return Math.round((dot / denom) * 100) / 100;
}`,
      tests: [
        { name: "identical direction → 1", code: `assertEquals(cosine([1, 0], [1, 0]), 1);` },
        { name: "orthogonal → 0", code: `assertEquals(cosine([1, 0], [0, 1]), 0);` },
        { name: "[3,4] vs [4,3] → 0.96", code: `assertEquals(cosine([3, 4], [4, 3]), 0.96);` },
      ],
    },
    {
      slug: "chunking",
      title: "Chunking for RAG",
      blurb: "Split documents before embedding them.",
      xp: 40,
      content: `# Chunking for RAG

Retrieval-Augmented Generation (RAG) splits long documents into **chunks** small
enough to embed and retrieve. A simple strategy: group every N words together.

## Your task
Write \`chunkWords(text, size)\` that splits \`text\` (space-separated words) into
chunks of at most \`size\` words, returning an array of chunk strings.`,
      starterCode: `function chunkWords(text, size) {
  // split into chunks of \`size\` words each
}
`,
      solution: `function chunkWords(text, size) {
  const words = text.split(" ");
  const chunks = [];
  for (let i = 0; i < words.length; i += size) {
    chunks.push(words.slice(i, i + size).join(" "));
  }
  return chunks;
}`,
      tests: [
        { name: "chunks of 2", code: `assertEquals(chunkWords("a b c d e", 2), ["a b", "c d", "e"]);` },
        { name: "fewer than size", code: `assertEquals(chunkWords("one two", 5), ["one two"]);` },
        { name: "chunks of 1", code: `assertEquals(chunkWords("a b c", 1), ["a", "b", "c"]);` },
      ],
    },
    {
      slug: "tool-schema",
      title: "Tool / Function Calling",
      blurb: "Describe a tool the model can call.",
      xp: 40,
      content: `# Tool / Function Calling

Modern LLMs can call **tools** you define. Each tool is described by a schema: a
\`name\`, a \`description\`, and an \`input_schema\` (JSON Schema) telling the model
what arguments it accepts.

\`\`\`js
{ name: "get_weather", description: "...", input_schema: { type: "object", properties: {} } }
\`\`\`

## Your task
Write \`buildTool(name, description)\` that returns a tool object with those exact
keys and an empty-properties object schema.`,
      starterCode: `function buildTool(name, description) {
  // return { name, description, input_schema: { type: "object", properties: {} } }
}
`,
      solution: `function buildTool(name, description) {
  return {
    name,
    description,
    input_schema: { type: "object", properties: {} },
  };
}`,
      tests: [
        {
          name: "builds the schema",
          code: `assertEquals(buildTool("get_weather", "Get the weather"), { name: "get_weather", description: "Get the weather", input_schema: { type: "object", properties: {} } });`,
        },
      ],
    },
  ],
};
