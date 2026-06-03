import type { Module } from "./types";

// Prompt Engineering Fundamentals — the techniques that make LLM output reliable.
// Taught as small, pure string-building exercises so they auto-grade with the JS
// engine (no API key, no network). Each lesson is one concrete technique.
export const promptEngineering: Module = {
  slug: "prompt-engineering",
  title: "Prompt Engineering Fundamentals",
  description:
    "Go from vague prompts to reliable ones: roles, delimiters, output formats, few-shot examples, chain-of-thought, and reusable templates — all hands-on.",
  emoji: "✍️",
  gradient: "from-fuchsia-500/20 to-violet-500/10",
  tagline:
    "Learn prompt engineering: write clear instructions, use delimiters, enforce output formats, and build prompt templates.",
  keywords: [
    "prompt engineering",
    "how to write better prompts",
    "few-shot prompting",
    "chain of thought",
    "llm prompt template",
  ],
  lessons: [
    {
      slug: "role-and-context",
      title: "Give the Model a Role",
      blurb: "A clear persona and audience steer the whole response.",
      xp: 25,
      content: `# Give the Model a Role

The single cheapest way to improve output is to tell the model **who it is** and
**who it's talking to**. A model writing "for a 5-year-old" sounds nothing like
one writing "for a senior engineer" — same question, very different answer.

A reliable opener looks like:

\`\`\`
You are a patient math tutor. You are explaining to a 10-year-old.
\`\`\`

## Your task
Write \`systemPrompt(role, audience)\` that returns exactly:

\`You are {role}. You are explaining to {audience}.\``,
      starterCode: `function systemPrompt(role, audience) {
  // return "You are {role}. You are explaining to {audience}."
}
`,
      solution: `function systemPrompt(role, audience) {
  return "You are " + role + ". You are explaining to " + audience + ".";
}`,
      tests: [
        {
          name: "builds the persona line",
          code: `assertEquals(systemPrompt("a patient math tutor", "a 10-year-old"), "You are a patient math tutor. You are explaining to a 10-year-old.");`,
        },
        {
          name: "works with other inputs",
          code: `assertEquals(systemPrompt("a senior Go engineer", "a junior dev"), "You are a senior Go engineer. You are explaining to a junior dev.");`,
        },
      ],
      hints: [
        'Glue the pieces with `+`, and don\'t forget the periods.',
        'The format is `"You are " + role + ". You are explaining to " + audience + "."`',
      ],
      explanation:
        "A role + audience is the highest-leverage, lowest-effort prompt upgrade. It sets tone, vocabulary, and depth before you've even stated the task.",
    },
    {
      slug: "delimiters",
      title: "Separate Instructions from Data",
      blurb: "Wrap user content so the model can't confuse it with your instructions.",
      xp: 30,
      content: `# Separate Instructions from Data

When you paste user text straight into a prompt, the model can't always tell
**your instructions** apart from **the data to act on** — and a sneaky input can
even hijack the prompt (*prompt injection*). The fix: wrap the data in clear
**delimiters** like XML-style tags.

\`\`\`
<document>
...the user's text...
</document>
\`\`\`

## Your task
Write \`wrapInput(text)\` that wraps \`text\` in a \`document\` block, on its own lines:

\`<document>\\n{text}\\n</document>\``,
      starterCode: `function wrapInput(text) {
  // return "<document>\\n{text}\\n</document>"
}
`,
      solution: `function wrapInput(text) {
  return "<document>\\n" + text + "\\n</document>";
}`,
      tests: [
        {
          name: "wraps the text in tags",
          code: `assertEquals(wrapInput("Hello there"), "<document>\\nHello there\\n</document>");`,
        },
        {
          name: "handles multi-line text",
          code: `assertEquals(wrapInput("line 1\\nline 2"), "<document>\\nline 1\\nline 2\\n</document>");`,
        },
      ],
      hints: [
        "Use `\\n` for the line breaks before and after the text.",
        'Concatenate: `"<document>\\n" + text + "\\n</document>"`.',
      ],
      explanation:
        "Delimiters give the model an unambiguous boundary: everything inside is data, everything outside is instruction. It's your first line of defense against prompt injection.",
    },
    {
      slug: "output-format",
      title: "Demand a Strict Output Format",
      blurb: "Tell the model exactly how to shape its answer.",
      xp: 30,
      content: `# Demand a Strict Output Format

If you're going to *parse* the model's output in code, you must pin down the
**format**. "Respond only with JSON, no prose" turns a chatty paragraph into
something \`JSON.parse\` can actually read.

## Your task
Write \`requireJson(task)\` that appends a strict formatting instruction. Return:

\`{task}\\n\\nRespond ONLY with valid JSON. Do not include any other text.\`

(Two newlines between the task and the instruction.)`,
      starterCode: `function requireJson(task) {
  // append the JSON-only instruction after a blank line
}
`,
      solution: `function requireJson(task) {
  return task + "\\n\\nRespond ONLY with valid JSON. Do not include any other text.";
}`,
      tests: [
        {
          name: "appends the JSON instruction",
          code: `assertEquals(requireJson("Extract the name and age."), "Extract the name and age.\\n\\nRespond ONLY with valid JSON. Do not include any other text.");`,
        },
      ],
      hints: [
        "Join with a blank line: `\\n\\n`.",
        'The suffix is exactly `"Respond ONLY with valid JSON. Do not include any other text."`',
      ],
      explanation:
        "Models default to being helpful and chatty. When code consumes the output, an explicit 'only JSON, nothing else' instruction is what keeps your parser from choking.",
    },
    {
      slug: "few-shot-examples",
      title: "Show, Don't Just Tell",
      blurb: "A couple of labeled examples beat a paragraph of description.",
      xp: 35,
      content: `# Show, Don't Just Tell

**Few-shot** prompting hands the model a few input→output examples so it copies
the pattern. It's far more reliable than describing the format in words. The
trick is rendering the examples consistently.

## Your task
Write \`labelExamples(pairs)\` where \`pairs\` is an array of \`[input, label]\`
tuples. Render each as \`"{input}" => {label}\` and join them with newlines.

Example: \`[["good movie", "positive"], ["awful", "negative"]]\` →
\`"good movie" => positive\\n"awful" => negative\``,
      starterCode: `function labelExamples(pairs) {
  // render each [input, label] as: "input" => label
}
`,
      solution: `function labelExamples(pairs) {
  return pairs.map(([input, label]) => '"' + input + '" => ' + label).join("\\n");
}`,
      tests: [
        {
          name: "renders two examples",
          code: `assertEquals(labelExamples([["good movie", "positive"], ["awful", "negative"]]), '"good movie" => positive\\n"awful" => negative');`,
        },
        {
          name: "single example",
          code: `assertEquals(labelExamples([["meh", "neutral"]]), '"meh" => neutral');`,
        },
      ],
      hints: [
        "Destructure each pair: `pairs.map(([input, label]) => ...)`.",
        "Wrap the input in literal quote characters, then `.join(\"\\n\")`.",
      ],
      explanation:
        "Consistent, well-formatted examples are the backbone of few-shot prompting — the model latches onto the pattern you demonstrate far more readily than one you describe.",
    },
    {
      slug: "chain-of-thought",
      title: "Ask for Reasoning Steps",
      blurb: "Letting the model 'think out loud' improves hard answers.",
      xp: 30,
      content: `# Ask for Reasoning Steps

For math, logic, and multi-step problems, telling the model to reason **before**
answering measurably improves accuracy. This is **chain-of-thought** prompting.
The classic nudge is simply: *"Let's think step by step."*

## Your task
Write \`addThinking(question)\` that appends the reasoning nudge on a new line:

\`{question}\\nLet's think step by step.\``,
      starterCode: `function addThinking(question) {
  // append "Let's think step by step." on a new line
}
`,
      solution: `function addThinking(question) {
  return question + "\\nLet's think step by step.";
}`,
      tests: [
        {
          name: "appends the nudge",
          code: `assertEquals(addThinking("If a train leaves at 3pm..."), "If a train leaves at 3pm...\\nLet's think step by step.");`,
        },
      ],
      hints: [
        "Single newline `\\n` between the question and the nudge.",
        "The exact phrase is: Let's think step by step.",
      ],
      explanation:
        "Reasoning-first prompting gives the model room to work through intermediate steps instead of blurting a guess — a small phrase with an outsized effect on hard problems.",
    },
    {
      slug: "prompt-template",
      title: "Reusable Prompt Templates",
      blurb: "Fill {{placeholders}} to turn one prompt into many.",
      xp: 40,
      content: `# Reusable Prompt Templates

In a real app you don't hand-write each prompt — you keep a **template** with
\`{{placeholders}}\` and fill them per request. This keeps prompts consistent and
versionable.

\`\`\`
Translate "{{text}}" into {{language}}.
\`\`\`

## Your task
Write \`fillTemplate(template, vars)\` that replaces every \`{{key}}\` in
\`template\` with \`vars[key]\`. You can assume each key in \`vars\` appears at most
once. Leave any \`{{key}}\` with no matching var untouched.`,
      starterCode: `function fillTemplate(template, vars) {
  // replace each {{key}} with vars[key]
}
`,
      solution: `function fillTemplate(template, vars) {
  return template.replace(/\\{\\{(\\w+)\\}\\}/g, (match, key) =>
    key in vars ? vars[key] : match,
  );
}`,
      tests: [
        {
          name: "fills placeholders",
          code: `assertEquals(fillTemplate('Translate "{{text}}" into {{language}}.', { text: "hello", language: "French" }), 'Translate "hello" into French.');`,
        },
        {
          name: "leaves unknown keys untouched",
          code: `assertEquals(fillTemplate("Hi {{name}}, {{missing}}", { name: "Sam" }), "Hi Sam, {{missing}}");`,
        },
      ],
      hints: [
        "A regex like `/\\{\\{(\\w+)\\}\\}/g` captures the key between the braces.",
        "Use the replacer callback: return `vars[key]` if present, else the original `match`.",
      ],
      explanation:
        "Templates separate the stable structure of a prompt from the per-request data — the same idea as parameterized SQL. It's how prompt engineering scales past a single chat box.",
    },
  ],
};
