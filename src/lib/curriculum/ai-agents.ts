import type { Module } from "./types";

// Agents & Tool Use — how a model goes from "predict text" to "take actions":
// describing tools, dispatching tool calls, feeding results back, and the agent
// loop. Pure JS so the mechanics grade in-browser without a live model.
export const aiAgents: Module = {
  slug: "ai-agents",
  title: "AI Agents & Tool Use",
  description:
    "Turn a chat model into an agent: define tools, route the model's tool calls to real functions, feed results back, and run the think-act-observe loop.",
  emoji: "🦾",
  gradient: "from-purple-500/20 to-indigo-500/10",
  tagline:
    "Learn AI agents and tool use: tool schemas, dispatching tool calls, tool results, and the agent loop (ReAct).",
  keywords: [
    "ai agents",
    "llm tool use",
    "function calling",
    "react agent",
    "agentic ai",
  ],
  lessons: [
    {
      slug: "define-a-tool",
      title: "Describe a Tool",
      blurb: "A tool is a name, a description, and a parameter list.",
      xp: 30,
      content: `# Describe a Tool

An agent can only use tools you **describe** to it. Each tool definition tells
the model the tool's \`name\`, what it does (\`description\`), and which
\`parameters\` it accepts — so the model knows when and how to call it.

## Your task
Write \`defineTool(name, description, params)\` where \`params\` is an array of
parameter-name strings. Return:

\`\`\`js
{ name, description, parameters: params }
\`\`\``,
      starterCode: `function defineTool(name, description, params) {
  // return { name, description, parameters: params }
}
`,
      solution: `function defineTool(name, description, params) {
  return { name, description, parameters: params };
}`,
      tests: [
        {
          name: "builds the tool definition",
          code: `assertEquals(defineTool("get_weather", "Look up the weather", ["city"]), { name: "get_weather", description: "Look up the weather", parameters: ["city"] });`,
        },
        {
          name: "supports multiple params",
          code: `assertEquals(defineTool("add", "Add two numbers", ["a", "b"]), { name: "add", description: "Add two numbers", parameters: ["a", "b"] });`,
        },
      ],
      hints: [
        "Shorthand `{ name, description }` uses the variable names as keys.",
        "Rename the last key: `parameters: params`.",
      ],
      explanation:
        "A clear tool description is itself a prompt — the model decides whether to call a tool from its name and description, so write them like instructions, not code comments.",
    },
    {
      slug: "parse-tool-call",
      title: "Read the Model's Tool Call",
      blurb: "The model asks to call a tool — pull out the name and arguments.",
      xp: 35,
      content: `# Read the Model's Tool Call

When a model decides to use a tool, it returns a structured **tool call** instead
of a final answer — something like \`{ type: "tool_use", name: "...", input: {...} }\`.
Your runtime inspects it to decide what to do next.

## Your task
Write \`isToolCall(message)\` that returns \`true\` only when \`message.type\` is
exactly \`"tool_use"\`.`,
      starterCode: `function isToolCall(message) {
  // true only when message.type === "tool_use"
}
`,
      solution: `function isToolCall(message) {
  return message.type === "tool_use";
}`,
      tests: [
        {
          name: "detects a tool call",
          code: `assertEquals(isToolCall({ type: "tool_use", name: "add", input: {} }), true);`,
        },
        {
          name: "plain text is not a tool call",
          code: `assertEquals(isToolCall({ type: "text", text: "hi" }), false);`,
        },
      ],
      hints: [
        "Compare with `===` (strict equality).",
        'Only `"tool_use"` counts — `"text"` and others are `false`.',
      ],
      explanation:
        "An agent loop branches on this check every turn: tool call → run the tool; otherwise → it's the final answer. Getting the discriminator right is the heart of the loop.",
    },
    {
      slug: "dispatch-tool",
      title: "Dispatch to the Right Tool",
      blurb: "Map the tool name to the actual function and run it.",
      xp: 40,
      content: `# Dispatch to the Right Tool

Once you know which tool the model wants, you look it up in a **registry** (a map
of name → function) and run it with the model's arguments. If the name isn't
registered, you return an error the model can read and recover from.

## Your task
Write \`dispatch(registry, name, args)\`. If \`registry[name]\` exists, call it with
\`args\` and return the result. Otherwise return the string
\`"Unknown tool: {name}"\`.`,
      starterCode: `function dispatch(registry, name, args) {
  // call registry[name](args) if it exists, else return "Unknown tool: {name}"
}
`,
      solution: `function dispatch(registry, name, args) {
  const tool = registry[name];
  if (typeof tool !== "function") return "Unknown tool: " + name;
  return tool(args);
}`,
      tests: [
        {
          name: "runs a registered tool",
          code: `assertEquals(dispatch({ double: (a) => a.n * 2 }, "double", { n: 21 }), 42);`,
        },
        {
          name: "reports an unknown tool",
          code: `assertEquals(dispatch({}, "ghost", {}), "Unknown tool: ghost");`,
        },
      ],
      hints: [
        "Look the function up by name, then check `typeof tool === 'function'`.",
        "Call it with the args object: `tool(args)`.",
      ],
      explanation:
        "The registry is your safety boundary: the model can only ever invoke functions you've explicitly registered, and unknown calls become a recoverable message instead of a crash.",
    },
    {
      slug: "tool-result-message",
      title: "Feed the Result Back",
      blurb: "Wrap the tool's output so the model can read it next turn.",
      xp: 35,
      content: `# Feed the Result Back

After running a tool, you append its output to the conversation as a
**tool_result** message, tagged with the same id as the call so the model knows
which result belongs to which call.

## Your task
Write \`toolResult(id, output)\` that returns:

\`\`\`js
{ type: "tool_result", tool_use_id: id, content: String(output) }
\`\`\`

Note \`content\` must be a **string** (coerce the output with \`String(...)\`).`,
      starterCode: `function toolResult(id, output) {
  // return a tool_result message with content as a string
}
`,
      solution: `function toolResult(id, output) {
  return { type: "tool_result", tool_use_id: id, content: String(output) };
}`,
      tests: [
        {
          name: "wraps a numeric result",
          code: `assertEquals(toolResult("call_1", 42), { type: "tool_result", tool_use_id: "call_1", content: "42" });`,
        },
        {
          name: "keeps strings as-is",
          code: `assertEquals(toolResult("call_2", "sunny"), { type: "tool_result", tool_use_id: "call_2", content: "sunny" });`,
        },
      ],
      hints: [
        "Use the key `tool_use_id` for the id.",
        "Coerce with `String(output)` so numbers/booleans become text.",
      ],
      explanation:
        "Tool results re-enter the conversation as a new message. Matching the tool_use_id lets the model line up each result with the call it made — essential when it fires several tools at once.",
    },
    {
      slug: "agent-step",
      title: "One Step of the Agent Loop",
      blurb: "Either we have the answer, or we run a tool and continue.",
      xp: 45,
      content: `# One Step of the Agent Loop

An agent runs a loop: ask the model, and if it returns a tool call, run the tool
and loop again; if it returns text, that's the **final answer** and we stop. Here
you'll write the decision for a single step.

## Your task
Write \`step(message, registry)\`:
- If \`message.type === "tool_use"\`, return
  \`{ done: false, result: dispatch(registry, message.name, message.input) }\`.
- Otherwise return \`{ done: true, result: message.text }\`.

A \`dispatch(registry, name, args)\` function is already available (same as the
earlier lesson).`,
      starterCode: `function step(message, registry) {
  // tool_use → { done: false, result: <tool output> }
  // otherwise → { done: true, result: message.text }
}
`,
      solution: `function dispatch(registry, name, args) {
  const tool = registry[name];
  if (typeof tool !== "function") return "Unknown tool: " + name;
  return tool(args);
}

function step(message, registry) {
  if (message.type === "tool_use") {
    return { done: false, result: dispatch(registry, message.name, message.input) };
  }
  return { done: true, result: message.text };
}`,
      tests: [
        {
          name: "runs a tool and continues",
          code: `assertEquals(step({ type: "tool_use", name: "double", input: { n: 4 } }, { double: (a) => a.n * 2 }), { done: false, result: 8 });`,
        },
        {
          name: "final text answer stops the loop",
          code: `assertEquals(step({ type: "text", text: "All done!" }, {}), { done: true, result: "All done!" });`,
        },
      ],
      hints: [
        "Branch on `message.type === 'tool_use'`.",
        "On a tool call, `done` is false and you keep looping; on text, `done` is true.",
      ],
      explanation:
        "This is the whole agent in miniature: think (model), act (tool), observe (result), repeat until done. Real agents wrap this in a loop with a max-steps guard so they can't spin forever.",
    },
  ],
};
