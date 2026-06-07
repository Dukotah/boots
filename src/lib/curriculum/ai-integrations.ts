import type { Module } from "./types";

// AI Integrations & Automation — for someone who can already use AI chatbots
// and wants to wire AI into their tools, apps, and workflows. Accessible,
// practical, light on jargon. Sits after "AI for Everyone" and "AI Power User"
// in the track sequence.
export const aiIntegrations: Module = {
  slug: "ai-integrations",
  title: "AI Integrations & Automation",
  description:
    "You know how to chat with AI — now make it work for you in the background. Connect AI to your existing tools with no-code automations, build reusable custom assistants, understand APIs at a practical level, and learn how modern AI agents access your data and apps safely.",
  emoji: "🔗",
  gradient: "from-cyan-500/20 to-blue-500/10",
  tagline:
    "Connect AI to your tools and automate your workflows — no coding required for most of it. Learn Zapier-style automations, custom assistants, APIs, RAG, and MCP connectors.",
  keywords: [
    "AI integrations",
    "AI automation",
    "connect AI to apps",
    "no-code AI automation",
    "Zapier AI",
    "custom GPT",
    "Claude Projects",
    "what is an API",
    "RAG retrieval augmented generation",
    "Model Context Protocol",
    "MCP",
    "AI workflow automation",
  ],
  lessons: [
    // ── Lesson 1: Beyond the Chat Box ───────────────────────────────────────
    {
      slug: "beyond-the-chat-box",
      title: "Beyond the Chat Box",
      blurb: "AI doesn't have to live in a browser tab — it can work inside your apps and automations.",
      xp: 20,
      kind: "quiz",
      content: `# Beyond the Chat Box

Most people experience AI through a chat interface: open a tab, type a message,
read the reply. That's powerful, but it's only the surface layer. Underneath,
the same AI models can run **inside** other software — without you ever opening
a chat window.

## Where AI actually lives once you connect it

- **Inside your apps.** Email clients that draft replies, Notion that summarizes
  pages, Google Docs that rewrites a paragraph — these use AI under the hood,
  triggered by a button or an automatic rule.
- **In automations.** Tools like Zapier, Make (formerly Integromat), and n8n let
  you chain events together: *"When I get a new lead in my CRM, summarize it and
  send me a Slack message."* AI is one step in that chain.
- **As a background worker.** A script or scheduled job can send data to an AI
  model and store the results — no human in the loop, running overnight or
  every five minutes.
- **Embedded in products.** The AI that moderates comments, suggests tags, or
  routes support tickets in a SaaS product is the same underlying technology,
  just wired differently.

## The key shift in mindset

In the chat box, you're the trigger — you type, it responds.

Once AI is integrated, **the trigger is an event**: a new file, a new row in a
spreadsheet, a new email arriving, a schedule firing. AI is just a powerful step
in a larger pipeline, the same way a formula or a filter is.

You don't need to code to get there. The next few lessons will show you exactly
how.`,
      questions: [
        {
          prompt: "What is the main difference between using AI in a chat box versus using it in an integration?",
          options: [
            "Integrated AI is always smarter than chat AI",
            "In a chat you are the trigger; in an integration an event (new email, new row, a schedule) triggers the AI automatically",
            "Integrations only work if you have a paid AI subscription",
          ],
          answer: 1,
          explanation:
            "The model is the same either way — what changes is the trigger. Integrations replace the human typing with an automated event, letting AI work in the background at scale.",
        },
        {
          prompt: "Which of these is a realistic example of AI running 'inside' an app rather than as a standalone chat?",
          options: [
            "Opening claude.ai in a browser tab and typing a question",
            "An email client that automatically drafts a reply based on the incoming message",
            "Copying and pasting text from a document into a chatbot",
          ],
          answer: 1,
          explanation:
            "When AI is embedded in a product (email drafting, Notion summaries, support routing), the user doesn't open a chat — the AI runs as part of the normal workflow.",
        },
        {
          prompt: "Do you need to write code to connect AI to many popular tools and automations?",
          options: [
            "Yes — you must write code for every integration",
            "No — no-code platforms like Zapier and Make let you connect AI to hundreds of apps visually",
            "Only if you want it to work reliably",
          ],
          answer: 1,
          explanation:
            "No-code automation platforms handle the wiring. You configure triggers and actions in a visual editor — the platform calls the AI model's API for you.",
        },
      ],
      explanation:
        "Once you see AI as 'a step in a pipeline' rather than 'a chat window', the world of automations and integrations opens up — and most of it requires no coding at all.",
    },

    // ── Lesson 2: No-Code Automation ────────────────────────────────────────
    {
      slug: "no-code-automation",
      title: "No-Code Automation",
      blurb: "Triggers + actions + AI steps: how Zapier, Make, and friends wire your tools together.",
      xp: 22,
      kind: "quiz",
      content: `# No-Code Automation

Platforms like **Zapier**, **Make** (formerly Integromat), and **n8n** let you
connect hundreds of apps together without writing a line of code. You build
**workflows** (sometimes called Zaps, Scenarios, or Flows) from two basic
building blocks:

## Triggers and Actions

- **Trigger** — the event that starts the workflow. Examples: *a new row is added
  to a Google Sheet*, *a form is submitted*, *an email arrives with a specific
  label*, *every day at 8 am*.
- **Action** — what happens in response. Examples: *create a Slack message*, *add
  a row to Airtable*, *send an email*, *call an AI model and store the result*.

You chain as many actions as you need. AI is just one type of action — these
platforms have built-in "Ask ChatGPT / Ask Claude" steps you drop in.

## A practical example

**Goal:** Every time a customer fills out a support form, automatically
draft a personalized reply and save it to a Google Doc.

1. **Trigger:** New form submission (Typeform, Tally, Google Forms…)
2. **Action:** Send the form content to an AI model: *"Summarize this issue
   and draft a warm, helpful reply."*
3. **Action:** Take the AI's output, append it to a Google Doc for the
   support team to review and send.

Total setup time: under 30 minutes, no code.

## Tips for reliable automations

- **Filter early.** Add a condition step to stop the workflow if the data
  doesn't match what you expect — avoids wasted AI calls on junk submissions.
- **Keep prompts in the step, not in your head.** Write the instruction
  directly in the AI step so it's documented and easy to update later.
- **Test with real data.** Most platforms let you run a workflow on a real
  sample before turning it on. Always do this.
- **Watch your usage.** Each AI call has a cost (tokens or credits). A
  high-volume trigger can add up fast — start with a filter.`,
      questions: [
        {
          prompt: "In a no-code automation, what is a 'trigger'?",
          options: [
            "The AI model that processes the data",
            "The event that starts the workflow, such as a new email arriving or a form being submitted",
            "The final output the automation produces",
          ],
          answer: 1,
          explanation:
            "A trigger is the 'when' — the event that kicks the workflow off. The actions that follow are the 'then do this' steps.",
        },
        {
          prompt: "You want to summarize every new support ticket and post it to Slack automatically. Which tool is best suited for this with no coding?",
          options: [
            "A spreadsheet formula",
            "A no-code automation platform like Zapier or Make, with an AI step in the middle",
            "You must hire a developer to build this",
          ],
          answer: 1,
          explanation:
            "No-code platforms connect apps visually. An AI 'summarize' step drops right into the middle of a trigger-to-Slack workflow — no code required.",
        },
        {
          prompt: "Why is it smart to add a filter step early in an automation that calls an AI?",
          options: [
            "Filters make the AI smarter",
            "They stop the workflow on data that doesn't match, avoiding unnecessary AI calls and cost",
            "Filters are required by law when using AI",
          ],
          answer: 1,
          explanation:
            "Every AI call costs tokens or credits. A filter that checks 'is this actually a real support ticket?' before the AI step prevents wasted spend on spam, test submissions, and irrelevant triggers.",
        },
      ],
      explanation:
        "Trigger + action + AI step = a working automation. No-code platforms handle the wiring; you supply the logic by configuring which apps connect and what the AI should do.",
    },

    // ── Lesson 3: Custom Assistants ─────────────────────────────────────────
    {
      slug: "custom-assistants",
      title: "Custom Assistants",
      blurb: "Save a persona, tone, and instructions once — get a specialist on demand, every time.",
      xp: 22,
      kind: "quiz",
      content: `# Custom Assistants

Every time you open a new chat, the AI starts fresh with no idea who you are,
what your business does, or how you like things worded. That's fine for one-off
questions, but it's inefficient for recurring jobs.

**Custom assistants** solve this by letting you save a set of instructions — a
**system prompt** — that runs silently before every conversation. The result is a
specialist that already knows the context.

## What each platform calls them

| Platform | Feature name |
|---|---|
| ChatGPT (OpenAI) | Custom GPTs |
| Claude (Anthropic) | Projects |
| Gemini (Google) | Gems |
| Generic / rolled your own | Saved system prompt |

They all do the same thing: store a set of permanent instructions so you don't
repeat yourself.

## What goes in a system prompt

- **Role and persona.** *"You are a professional copywriter specializing in
  short-form social media for a sustainable fashion brand."*
- **Business context.** Brand name, products, pricing, key facts the AI should
  always know.
- **Tone and formatting rules.** *"Always respond in British English. Use bullet
  points when listing more than three items."*
- **What to avoid.** *"Never make claims about delivery times. Never compare us
  to competitors by name."*

## Real examples of useful custom assistants

- **Customer support draft helper** — knows your product, return policy, and
  preferred tone; draft replies in seconds.
- **Meeting notes summarizer** — knows your team's name conventions and what
  you always want captured (action items, owner, deadline).
- **Job application tailoring assistant** — knows your CV; you paste a job
  description and it drafts a tailored cover letter.

## Sharing and collaboration

Custom GPTs and Claude Projects can be shared with a team or even published
publicly. That's how you build a shared, consistent AI tool for your whole
org without everyone having to prompt-engineer from scratch each time.`,
      questions: [
        {
          prompt: "What does a 'system prompt' in a custom assistant do?",
          options: [
            "It searches the internet for you before every reply",
            "It provides permanent background instructions the AI follows in every conversation, without you having to repeat them",
            "It limits the AI to only answering questions about one topic",
          ],
          answer: 1,
          explanation:
            "A system prompt runs silently before every conversation. It's how you give the AI persistent context — role, tone, business knowledge — so you never explain yourself twice.",
        },
        {
          prompt: "You run a small bakery and want an AI that always knows your menu, your brand voice, and that you don't offer nut-free options. What's the right tool?",
          options: [
            "Start a new chat each time and paste the menu at the top",
            "Build a custom assistant (Custom GPT, Claude Project, or Gem) with that information saved in the system prompt",
            "There is no way to do this without custom software",
          ],
          answer: 1,
          explanation:
            "That's exactly the use case custom assistants are built for: durable context that travels with every conversation, so you never paste the menu again.",
        },
        {
          prompt: "Your team of five all need the same customer-support AI assistant. What's the most efficient approach?",
          options: [
            "Have each person write and maintain their own system prompt",
            "Build one custom assistant and share it with the team — everyone gets the same consistent tool",
            "Custom assistants can only be used by one person",
          ],
          answer: 1,
          explanation:
            "Custom GPTs and Claude Projects are shareable. One well-crafted assistant, shared with the team, keeps output consistent and removes the maintenance burden from everyone individually.",
        },
      ],
      explanation:
        "A custom assistant is a reusable specialist — persona, tone, and context saved once. It's the bridge between 'using AI' and 'deploying AI as a reliable team tool'.",
    },

    // ── Lesson 4: What's an API? ─────────────────────────────────────────────
    {
      slug: "what-is-an-api",
      title: "What's an API? (Gently)",
      blurb: "How apps talk to AI models programmatically — and why an API key is the unlock.",
      xp: 20,
      kind: "quiz",
      content: `# What's an API? (Gently)

You don't need to be a developer to understand what an API is — and once you
do, you'll immediately see why it matters.

## The restaurant analogy

Think of an API (Application Programming Interface) as a **waiter**:

- **You** are the app or automation that wants something.
- **The kitchen** is the AI model (Claude, GPT-4, Gemini, etc.).
- **The waiter** is the API — it takes your order in a standard format, delivers
  it to the kitchen, and brings back the result.

You never go into the kitchen. You just place orders in the format the waiter
understands, and the kitchen handles the rest.

## What an AI API call actually looks like

When a developer (or a no-code tool) calls an AI API, they send a small,
structured message — basically a JSON object — that says:

- *Which model to use* (e.g., "claude-opus-4-5")
- *The conversation so far* (a list of messages with roles: "user", "assistant")
- *Any settings* (max length, temperature / creativity level)

The AI sends back a response in the same structured format.

## What is an API key?

Your **API key** is a secret password that tells the service "this request is
coming from my account." It's how usage gets tracked and billed.

Rules for API keys:
- **Never share them publicly.** Anyone with your key can use your quota and run
  up your bill.
- **Store them in environment variables or a secrets manager**, not in code you
  share or publish.
- **Rotate them** if you think they've been exposed — most providers let you
  revoke and regenerate instantly.

## Why the API unlocks scale

Chat interfaces are one-at-a-time. The API is **unlimited parallel**. A script
using the API can send a thousand documents to be summarized overnight. A
product can call the AI for every user, every second, without a human sitting
in the chat window. That's why developers and serious automation builders
go straight to the API.`,
      questions: [
        {
          prompt: "In the restaurant analogy, what does the API represent?",
          options: [
            "The kitchen (where the AI model lives)",
            "The waiter — the go-between that takes your structured request to the model and returns the result",
            "The menu (list of things the AI can do)",
          ],
          answer: 1,
          explanation:
            "The API is the standardized interface between your app/automation and the model. You never interact with the model directly — you send a structured request through the API.",
        },
        {
          prompt: "What is an AI API key, and what is the most important rule about it?",
          options: [
            "It's the model's 'brain' — share it freely so your team can learn from it",
            "It's a secret credential that authenticates your account — never share it publicly, or anyone can use your quota",
            "It's an optional feature only needed for enterprise customers",
          ],
          answer: 1,
          explanation:
            "An API key authenticates every request to your account. An exposed key means anyone can make calls billed to you. Treat it like a password.",
        },
        {
          prompt: "What can you do with an API that you cannot do in a chat interface?",
          options: [
            "Get smarter answers",
            "Run thousands of requests in parallel — summarizing a thousand documents overnight, or serving every user of your product simultaneously",
            "Access the AI for free",
          ],
          answer: 1,
          explanation:
            "Chat is one conversation at a time. The API enables bulk, parallel, programmatic access — that's what makes it the foundation of real products and serious automations.",
        },
      ],
      explanation:
        "An API is a standardized waiter between your app and the AI model. An API key is your account's password. Together they unlock scale that a chat window never could.",
    },

    // ── Lesson 5: Build an API Request Body (CODE) ──────────────────────────
    {
      slug: "build-api-request",
      title: "Build an API Request Body",
      blurb: "Write the function that assembles the JSON object every AI API call starts with.",
      xp: 30,
      content: `# Build an API Request Body

Every call to an AI API — whether you write the code yourself or a no-code tool
does it for you — sends a structured object with at least two things:

- **\`model\`** — which AI model to use (e.g. \`"claude-opus-4-5"\`)
- **\`messages\`** — the conversation history as an array of objects, each with a
  \`role\` (\`"user"\` or \`"assistant"\`) and \`content\` (the text)

A minimal request body looks like this:

\`\`\`js
{
  model: "claude-opus-4-5",
  messages: [
    { role: "user", content: "What is the capital of France?" }
  ]
}
\`\`\`

## Your task

Write \`buildChatRequest(model, userMessage)\` that takes a model name and a
user message string, and returns the request body object shown above.

The returned object must have:
- \`model\` — the model string you were given
- \`messages\` — an array with exactly one object: \`{ role: "user", content: userMessage }\``,
      starterCode: `function buildChatRequest(model, userMessage) {
  // return the API request body object
}
`,
      solution: `function buildChatRequest(model, userMessage) {
  return {
    model: model,
    messages: [{ role: "user", content: userMessage }],
  };
}`,
      tests: [
        {
          name: "returns correct model and messages",
          code: `const result = buildChatRequest("claude-opus-4-5", "Hello!");
assertEquals(result.model, "claude-opus-4-5");
assertEquals(result.messages.length, 1);
assertEquals(result.messages[0].role, "user");
assertEquals(result.messages[0].content, "Hello!");`,
        },
        {
          name: "works with a different model and message",
          code: `const r = buildChatRequest("gpt-4o", "What is 2 + 2?");
assertEquals(r.model, "gpt-4o");
assertEquals(r.messages[0].content, "What is 2 + 2?");`,
        },
      ],
      hints: [
        "Return an object literal `{ model: ..., messages: [...] }` directly.",
        "The messages array has one item: `{ role: \"user\", content: userMessage }`.",
      ],
      explanation:
        "This two-field object — model name plus a messages array — is the skeleton of every AI API call. Understanding it demystifies what no-code tools do behind the scenes, and it's the starting point if you ever write your own integration.",
    },

    // ── Lesson 6: Connecting AI to Your Data (RAG) ───────────────────────────
    {
      slug: "ai-and-your-data",
      title: "Connecting AI to Your Data",
      blurb: "How AI can answer from YOUR documents — the retrieval idea explained plainly.",
      xp: 22,
      kind: "quiz",
      content: `# Connecting AI to Your Data

Out of the box, an AI model knows what it was trained on — lots of general
knowledge, cut off at a point in time. It doesn't know your company's internal
wiki, your product manual, your customer history, or anything you haven't
explicitly told it in the conversation.

When you need AI to answer from **your own documents**, the standard approach is
called **RAG — Retrieval-Augmented Generation**.

## How RAG works (without the jargon)

1. **Store your documents.** Your files, PDFs, pages, or database records are
   pre-processed and stored in a special kind of searchable index (a "vector
   store" — think of it as a library with a very smart card catalog).

2. **When a question comes in**, the system first searches that index for the
   most relevant chunks of your documents. This is the **retrieval** step.

3. **Those chunks get sent to the AI** alongside the user's question, so the
   model is answering from *your* content, not just its training data. This is
   the **generation** step.

The AI never "reads" all your documents at once. It retrieves just the relevant
pieces per question — efficient, accurate, and up-to-date as long as your index is.

## Real-world examples

- A law firm's AI that answers questions using only their actual case files and
  templates — not general internet legal content.
- A customer support bot that answers from your product knowledge base and returns
  the exact policy page it used.
- An internal company assistant that finds the right HR policy, project notes, or
  vendor contract on demand.

## What you need to know as a non-developer

- **Many no-code tools now include RAG built in.** Notion AI, Guru, Glean, and
  products like CustomGPT.ai let you upload your documents and chat with them
  without writing code.
- **The quality of retrieval depends on the quality of your documents.** Well-
  structured, clearly written docs produce better answers than messy, inconsistent
  ones.
- **Citing sources matters.** A good RAG system tells you *which document* the
  answer came from — so you can verify it, just like you would with any AI output.`,
      questions: [
        {
          prompt: "What problem does RAG (Retrieval-Augmented Generation) solve?",
          options: [
            "It makes the AI model run faster",
            "It lets AI answer questions using your own documents and data, not just its general training",
            "It removes the need for an API key",
          ],
          answer: 1,
          explanation:
            "RAG bridges the gap between a general-purpose model and your specific knowledge base. The retrieval step finds your relevant docs; the generation step uses them to answer.",
        },
        {
          prompt: "In a RAG system, when does the AI read your documents?",
          options: [
            "It reads all documents in full before every question",
            "It retrieves only the most relevant chunks per question — not the whole library each time",
            "It reads them once during training and never again",
          ],
          answer: 1,
          explanation:
            "Retrieval is selective and per-query. The search index finds the right pieces; only those get sent to the model. This keeps it fast and accurate.",
        },
        {
          prompt: "A good RAG-powered chatbot should always do what after answering a question?",
          options: [
            "Ask you to rephrase your question",
            "Cite which document the answer came from, so you can verify it",
            "Delete the document it used",
          ],
          answer: 1,
          explanation:
            "Source citations let you verify the answer, just like checking a footnote. Without them, you have no way to know if the model retrieved the right document or invented the answer.",
        },
      ],
      explanation:
        "RAG = retrieve relevant chunks of your documents, then generate an answer from them. The result is an AI that answers from your knowledge base rather than the general internet — accurate, verifiable, and current.",
    },

    // ── Lesson 7: MCP & Tools ────────────────────────────────────────────────
    {
      slug: "mcp-and-tools",
      title: "MCP & Tools",
      blurb: "The modern standard for giving AI safe, structured access to your apps and data.",
      xp: 22,
      kind: "quiz",
      content: `# MCP & Tools

For most of AI's history, if you wanted an AI to take an action — look up a
calendar event, run a database query, send a message — you had to build a
custom, one-off integration. Every connection was its own engineering project.

In 2024, Anthropic published the **Model Context Protocol (MCP)**: an open
standard for how AI models connect to external tools, data sources, and services.
By 2026 it's widely adopted across the industry and supported in Claude, many
developer tools, and a growing ecosystem of third-party connectors.

## The core idea

Think of MCP as a **standardized electrical socket**. Before MCP, every appliance
(AI feature) needed a custom adapter for every wall (data source or tool). MCP
defines the shape of the socket once. Now any AI that speaks MCP can plug into
any tool that exposes an MCP connector — without custom wiring.

## What kinds of things MCP connectors give AI access to

- **Read data** — files on your computer, rows in a database, emails, calendar
  events, web pages
- **Take actions** — create a file, run a search, send a message, call an API
- **Respond to queries** — answer a question using a specialized data source

## Safety and permissions are built in

This is the important part: MCP is designed so that **you stay in control**.

- Every tool an AI can call is explicitly listed — the model can't secretly call
  something you haven't approved.
- Actions that modify data (write, delete, send) can require user confirmation
  before the AI proceeds.
- Each MCP server defines its own permission scope, so a connector that reads
  your calendar can't also read your files unless you explicitly grant it.

In practice: when you see a permission prompt like *"Claude wants to access your
filesystem — allow?"*, that's MCP working as designed. You grant least-privilege,
and the AI operates within that boundary.

## Why this matters for you

Even if you never write an MCP server yourself, you'll encounter this as a user:
AI assistants in IDEs (like Claude in Cursor or VS Code), AI agents in productivity
tools, and desktop AI apps all use MCP to safely reach your local files, calendar,
or web browsing — with your permission, within limits you set.`,
      questions: [
        {
          prompt: "What is the Model Context Protocol (MCP)?",
          options: [
            "A new AI model made by Anthropic",
            "An open standard that lets AI models connect to external tools and data sources in a structured, permission-based way",
            "A billing system for API usage",
          ],
          answer: 1,
          explanation:
            "MCP is a protocol — a common language for AI-to-tool connections. It replaces one-off custom integrations with a standardized socket that any compliant AI and tool can share.",
        },
        {
          prompt: "How does MCP handle safety when an AI wants to take an action like deleting a file?",
          options: [
            "The AI can do anything it decides is helpful without asking",
            "Write and delete actions can require explicit user confirmation before proceeding, and each connector only has permission for what you've approved",
            "MCP blocks all write actions permanently",
          ],
          answer: 1,
          explanation:
            "MCP was designed with least-privilege and user control at its core. Destructive or sensitive actions surface a confirmation prompt; the AI can't exceed the permissions you granted.",
        },
        {
          prompt: "You see a prompt: 'Claude wants to read files in your Documents folder — allow?' What's happening?",
          options: [
            "Your computer has a virus",
            "An MCP connector is requesting access to a specific resource — this is the permission system working as designed",
            "Claude is broken and needs to be reinstalled",
          ],
          answer: 1,
          explanation:
            "That permission prompt is MCP working correctly. You're being asked to explicitly grant access to a specific scope. Granting it means Claude can use that connector; denying it means it can't.",
        },
      ],
      explanation:
        "MCP is the standard socket that lets AI safely plug into your tools. You control what's connected and what actions require approval — the AI operates within that envelope, not outside it.",
    },
  ],
};
