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
  ],
};
