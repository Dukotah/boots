import type { Module } from "./types";

// AI Foundations — the no-jargon on-ramp for the "AI for Everyone" track.
//
// This is the gold-standard reference module for the new `project` lesson kind:
// it mixes `quiz` lessons (reading + a comprehension/decision check) with
// `project` lessons (do real work in a real AI tool + a client-side rubric).
// There is no code editor here — these lessons teach *using* AI, not building
// with APIs. Free, because it's the top-of-funnel lead magnet.
export const aiFoundations: Module = {
  slug: "ai-foundations",
  title: "AI Foundations: Your First Steps",
  description:
    "What AI actually is, what it's brilliant and terrible at, and how to talk to it — in plain English, no coding required. Your first real conversations with ChatGPT, Claude, and Gemini.",
  emoji: "🌱",
  gradient: "from-emerald-500/20 to-teal-500/10",
  tagline:
    "Learn how to use AI tools like ChatGPT, Claude, and Gemini — what they can do, why they sometimes lie, and how to get great answers.",
  keywords: [
    "how to use ai",
    "ai for beginners",
    "how to use chatgpt",
    "what is an llm",
    "ai for everyone",
    "learn to use ai tools",
  ],
  // Top-of-funnel lead magnet — fully interactive for free.
  free: true,
  lessons: [
    // ── 1 ── concept (quiz)
    {
      slug: "what-is-ai-really",
      title: "What Is AI, Really?",
      blurb: "Strip away the hype: what a modern AI chatbot actually is.",
      xp: 20,
      kind: "quiz",
      content: `# What Is AI, Really?

You've heard "AI" attached to everything from spam filters to self-driving cars.
The kind that exploded into everyone's life — **ChatGPT, Claude, Gemini** — is a
specific thing called a **large language model**, or **LLM**.

Here's the honest, jargon-free version:

> An LLM is a program that has read a staggering amount of text and learned the
> patterns in it. When you type something, it predicts what words should come
> next — one piece at a time — to form a helpful response.

That's it. It's not looking things up in a database. It's not conscious. It
doesn't "know" facts the way a person does. It's an extraordinarily good
**pattern-completer** that has read so much that its completions are often
genuinely useful, creative, and correct.

Why this matters: once you picture it as "a brilliant, well-read assistant that's
making its best guess," everything else in this course makes sense — including
why it's so good at writing, and why it sometimes confidently makes things up.

## The big three (and they're free to start)
- **ChatGPT** (OpenAI) — the one that started the wave.
- **Claude** (Anthropic) — known for careful, thoughtful writing.
- **Gemini** (Google) — built into Google's products.

You don't need to pick a favorite yet. By the end of this course you'll have
talked to at least one of them yourself.`,
      questions: [
        {
          prompt:
            "Which description of a large language model (LLM) is the most accurate?",
          options: [
            "A database that stores and looks up the correct answer to every question",
            "A program that predicts likely next words based on patterns it learned from huge amounts of text",
            "A conscious digital brain that understands the world like a human does",
            "A search engine that copies answers directly from websites",
          ],
          answer: 1,
          explanation:
            "An LLM generates text by predicting likely continuations from learned patterns — it isn't a lookup table, a search engine, or a conscious mind.",
        },
        {
          prompt: "Why is it useful to think of an LLM as a 'pattern-completer'?",
          options: [
            "Because it explains why it's great at writing but can also confidently make things up",
            "Because it means the AI is always right",
            "Because it proves the AI is alive",
            "Because it means you never need to check its work",
          ],
          answer: 0,
          explanation:
            "The same mechanism that makes it fluent and creative also lets it produce confident-sounding but wrong answers — a theme we'll return to.",
        },
      ],
    },

    // ── 2 ── concept (quiz)
    {
      slug: "tokens-and-prediction",
      title: 'How a Chatbot "Thinks"',
      blurb: "Word-by-word prediction, and why that explains so much.",
      xp: 20,
      kind: "quiz",
      content: `# How a Chatbot "Thinks"

When you send a message, the AI doesn't compose a whole answer in its head and
then type it out. It writes **one small piece at a time**, and each piece is its
best guess for what should come next given everything so far.

Those small pieces are called **tokens** — roughly a word or part of a word.
"Unbelievable" might be three tokens: \`un\`, \`believ\`, \`able\`.

This one fact explains a lot:

- **It "warms up" as it goes.** Asking it to *think step by step* genuinely helps,
  because each token it writes becomes context for the next one.
- **It has a memory limit.** It can only "see" so many tokens at once (its
  *context window*). Very long conversations can push the earliest details out of
  view — which is why a chatbot sometimes "forgets" what you said an hour ago.
- **More words cost more.** Paid AI tools bill by the token. Concise prompts and
  concise answers are literally cheaper.

You'll feel all three of these the moment you start using AI for real work.`,
      questions: [
        {
          prompt: "An AI chatbot generates its response by…",
          options: [
            "Writing the entire answer instantly, all at once",
            "Predicting one token (a word or word-part) at a time, each based on everything so far",
            "Searching the internet and pasting the top result",
            "Randomly choosing sentences from its training data",
          ],
          answer: 1,
          explanation:
            "Responses are built token-by-token, each one conditioned on the prompt plus everything generated so far.",
        },
        {
          prompt:
            "Your AI assistant seems to 'forget' something you told it much earlier in a very long chat. The most likely reason is…",
          options: [
            "It's broken and should be restarted",
            "It's ignoring you on purpose",
            "The earliest messages fell outside its limited context window",
            "It never read your message in the first place",
          ],
          answer: 2,
          explanation:
            "Models can only attend to a limited number of tokens at once. In long chats, early details can drop out of the context window.",
        },
      ],
    },

    // ── 3 ── concept (quiz)
    {
      slug: "why-ai-makes-things-up",
      title: "Why AI Makes Things Up",
      blurb: "Hallucinations explained — and how to protect yourself.",
      xp: 25,
      kind: "quiz",
      content: `# Why AI Makes Things Up

Sometimes an AI will tell you, with total confidence, about a book that doesn't
exist, a court case that never happened, or a quote nobody ever said. This is
called a **hallucination**, and it's the single most important thing to
understand before you rely on AI.

Remember: the model predicts *plausible* text, not *true* text. When it doesn't
actually "know" something, it doesn't stop — it generates the most likely-sounding
answer, which can be a confident, well-formatted fabrication.

It's most likely to happen when you ask for:

- **Specific facts** — dates, statistics, prices, citations, legal references.
- **Niche or very recent topics** it has little reliable training data on.
- **Anything where being precise matters more than sounding good.**

### How to protect yourself
1. **Verify anything that matters.** Treat AI output as a confident first draft,
   not a final source.
2. **Ask for sources** — then actually check the links exist and say what's claimed.
3. **Give it the facts.** If you paste in the real document, it works *from* that
   instead of guessing.
4. **Use it where being wrong is cheap** (brainstorming, drafting, explaining) and
   double-check where being wrong is expensive (medical, legal, financial, factual).

This isn't a reason to avoid AI. It's the difference between people who get
burned by it and people who get enormous value from it.`,
      questions: [
        {
          prompt:
            'In AI terms, what is a "hallucination"?',
          options: [
            "When the AI refuses to answer a question",
            "When the AI generates confident, plausible-sounding information that is actually false",
            "When the AI takes a long time to respond",
            "When the AI asks you a clarifying question",
          ],
          answer: 1,
          explanation:
            "A hallucination is fabricated-but-plausible output — a direct consequence of predicting likely text rather than retrieving verified facts.",
        },
        {
          prompt:
            "You're using AI to research a medical decision. What's the responsible move?",
          options: [
            "Trust the answer completely — it sounds very confident",
            "Use it to understand the topic and form questions, then verify with a doctor and reliable sources",
            "Assume everything it says is wrong and ignore it",
            "Ask it the same question twice and trust the second answer",
          ],
          answer: 1,
          explanation:
            "AI is great for orienting yourself and forming questions, but high-stakes facts must be verified with authoritative sources.",
        },
        {
          prompt: "Which task is AI LEAST likely to hallucinate on?",
          options: [
            "The exact population of a small town in 2023",
            "A specific legal case citation with a docket number",
            "Rewriting an email you wrote to sound more polite",
            "The precise stock price on a particular historical date",
          ],
          answer: 2,
          explanation:
            "Rewriting text you provided is low-risk: the AI works from your words. Specific facts, figures, and citations are where fabrication is most likely.",
        },
      ],
    },

    // ── 4 ── concept (quiz)
    {
      slug: "anatomy-of-a-good-request",
      title: "The Anatomy of a Good Request",
      blurb: "The four ingredients that turn a vague ask into a great answer.",
      xp: 25,
      kind: "quiz",
      content: `# The Anatomy of a Good Request

Most people get mediocre answers from AI because they type the way they'd type
into Google: a few keywords. AI rewards the opposite — **talk to it like a smart
new assistant who needs context.**

A strong request usually has four ingredients:

1. **Role / perspective** — who should it be? *"You're an experienced nurse…"*
2. **Task** — what exactly do you want? *"…explain what this lab result means…"*
3. **Context** — the details only you know. *"…to my 70-year-old dad who gets
   anxious about numbers."*
4. **Format** — the shape of the answer. *"Give me 3 short bullet points, plain
   language, no jargon."*

Compare:

> ❌ "explain blood pressure"

> ✅ "You're a friendly nurse. Explain what a blood pressure of 150/95 means to my
> 70-year-old dad who gets anxious about health. Keep it to 3 short, reassuring
> bullet points in plain language, and end with one simple next step."

Same topic. Wildly different answer. You don't always need all four — but every
one you add steers the response closer to what you actually wanted.

In the next lesson, you'll try this for real.`,
      questions: [
        {
          prompt:
            "Which request is most likely to get a genuinely useful answer?",
          options: [
            '"resume tips"',
            '"You\'re a senior tech recruiter. Review the bullet points below from my résumé and rewrite each one to lead with impact and a number. Keep them under 20 words. Here they are: …"',
            '"how do I make my resume better please"',
            '"is my resume good"',
          ],
          answer: 1,
          explanation:
            "It supplies a role, a clear task, the actual context (the bullets), and a format constraint — all four ingredients.",
        },
        {
          prompt:
            'In the ingredient list, what does "context" mean?',
          options: [
            "The font and color of the answer",
            "The specific details only you know that the AI needs to do the job well",
            "The website the AI should copy from",
            "How long the AI should take to respond",
          ],
          answer: 1,
          explanation:
            "Context is the situation-specific information — your audience, your goal, your constraints — that the AI can't know unless you tell it.",
        },
      ],
    },

    // ── 5 ── PROJECT: first real conversation
    {
      slug: "your-first-conversation",
      title: "Your First Real Conversation",
      blurb: "Open a real AI tool and put the four ingredients to work.",
      xp: 40,
      kind: "project",
      content: `# Your First Real Conversation

Enough theory — let's actually talk to an AI. In this project you'll open a real
tool and use the **four ingredients** (role, task, context, format) from the last
lesson on something that matters to *you*.

Pick anything real: a tricky email you need to send, a topic you want explained,
a plan you're trying to make, a decision you're weighing. The goal is to feel the
difference a well-built request makes.`,
      steps: [
        {
          instruction:
            "**Open a free AI chatbot** in your browser — [chatgpt.com](https://chatgpt.com), [claude.ai](https://claude.ai), or [gemini.google.com](https://gemini.google.com). Sign in with a free account.",
          tool: "ChatGPT / Claude / Gemini",
          hint: "All three have a free tier. Any of them works fine for this.",
        },
        {
          instruction:
            "**Start lazy on purpose.** Type a vague, keyword-style request about your real topic (e.g. `email to landlord`). Read the answer.",
          hint: "This is your 'before' — we want to see how generic a vague ask is.",
        },
        {
          instruction:
            "**Now rebuild it with all four ingredients** — give it a *role*, a clear *task*, real *context* about your situation, and a *format* for the answer. Send it.",
          hint: "Example shape: 'You're a calm, professional tenant. Write a short email to my landlord asking to fix a leaking tap that's been dripping for a week. Polite but firm, 4 sentences max.'",
        },
        {
          instruction:
            "**Iterate once.** Reply to the AI asking for one change — shorter, warmer, more formal, add a detail. Notice that you can just *talk* to refine it.",
          hint: "You don't restart — you steer. Try: 'Make it warmer and add that I've been a tenant for 3 years.'",
        },
      ],
      checkpoint: {
        prompt:
          "**Paste the improved prompt you wrote in step 3** (the one with all four ingredients). The checklist below updates live as your prompt hits each mark.",
        placeholder:
          "Paste your role + task + context + format prompt here…",
        rubric: [
          {
            label: "It's a real, detailed request (at least 20 words)",
            test: "minWords",
            value: "20",
          },
          {
            label: 'Gives the AI a role or perspective (e.g. "you are…", "act as…", "as a…")',
            test: "regex",
            value: "you('?re| are)|act as|as an? ",
          },
          {
            label: "Specifies a format or length (bullets, sentences, words, short, list, email…)",
            test: "includesAny",
            value: "bullet, sentence, word, short, list, email, paragraph, steps, plain language, tone",
          },
        ],
      },
    },

    // ── 6 ── concept (quiz)
    {
      slug: "what-ai-cant-do",
      title: "What AI Can't Do (Yet)",
      blurb: "Match the tool to the job — and know its blind spots.",
      xp: 25,
      kind: "quiz",
      content: `# What AI Can't Do (Yet)

The fastest way to be disappointed by AI is to use it for the wrong job. Here's
an honest map.

### AI is excellent at
- **Transforming text** — summarizing, rewriting, translating, changing tone.
- **Drafting from scratch** — emails, outlines, plans, brainstorms, first drafts.
- **Explaining** — turning something complex into something simple, at any level.
- **Structured thinking** — pros/cons, checklists, step-by-step plans.

### AI is risky or weak at
- **Current events** — unless the tool can browse the web, its knowledge has a
  cutoff date and won't know what happened recently.
- **Exact facts & math** — specific numbers, citations, and arithmetic can be
  confidently wrong (this is where it hallucinates).
- **Truly personal judgment** — it doesn't know your life, your relationships, or
  your values. It can help you *think*; it shouldn't decide *for* you.
- **Anything it can't see** — it only knows what's in your prompt and its training.
  It can't read your mind, your files, or your screen unless you give it access.

### The golden rule
**Use AI for the first draft and the heavy lifting. Keep the final judgment for
yourself** — especially when the stakes are high.`,
      questions: [
        {
          prompt:
            "Which of these is the BEST use of a standard AI chatbot?",
          options: [
            "Getting today's exact weather and news headlines",
            "Turning your messy notes into a clean, organized summary",
            "Calculating your precise tax bill to the cent",
            "Deciding whether you should quit your job",
          ],
          answer: 1,
          explanation:
            "Reorganizing and summarizing text you provide is squarely in AI's strength zone. Live data, exact math, and deeply personal decisions are not.",
        },
        {
          prompt:
            "Why might an AI not know about something that happened last week?",
          options: [
            "It chooses to ignore recent events",
            "Its training data has a cutoff date, and it can't browse the web unless the tool specifically allows it",
            "Recent events are too small to matter",
            "It deletes recent information for privacy",
          ],
          answer: 1,
          explanation:
            "A model's built-in knowledge stops at its training cutoff. It only knows newer events if the specific tool can search the web.",
        },
      ],
    },

    // ── 7 ── PROJECT: build your toolbox
    {
      slug: "pick-your-ai-toolbox",
      title: "Pick Your AI Toolbox",
      blurb: "Try two tools on the same task and feel the difference.",
      xp: 40,
      kind: "project",
      content: `# Pick Your AI Toolbox

There's no single "best" AI — they have different personalities and strengths,
and they're all improving constantly. The pros don't argue about which is best;
they keep two or three open and reach for whichever fits the moment.

In this project you'll run the **exact same request** through two different tools
and form your own opinion.`,
      steps: [
        {
          instruction:
            "**Write one request** you genuinely care about — use the four ingredients. Keep it in a note so you can paste it identically into each tool.",
          hint: "Reuse or improve the prompt from your last project.",
        },
        {
          instruction:
            "**Run it in tool #1** (say, ChatGPT). Read the answer and notice its tone and structure.",
          tool: "ChatGPT",
        },
        {
          instruction:
            "**Run the identical request in tool #2** (say, Claude or Gemini). Compare: which was clearer? Warmer? More useful for *your* taste?",
          tool: "Claude / Gemini",
          hint: "There's no right answer — you're calibrating your own preference.",
        },
        {
          instruction:
            "**Bookmark your favorite** and make a tiny mental note of when you'd reach for each. You now have a toolbox, not just a tool.",
        },
      ],
      checkpoint: {
        prompt:
          "**Write 2–3 sentences comparing the two tools** on your request. Which did you prefer, and why? (This is just for you — there are no wrong answers, the checklist only nudges you to reflect specifically.)",
        placeholder:
          "I ran the same prompt through ChatGPT and Claude. I preferred … because …",
        rubric: [
          {
            label: "A real reflection (at least 25 words)",
            test: "minWords",
            value: "25",
          },
          {
            label: "Names at least one tool you tried (ChatGPT, Claude, or Gemini)",
            test: "includesAny",
            value: "chatgpt, claude, gemini, openai, copilot",
          },
          {
            label: 'States a preference or comparison (e.g. "preferred", "better", "clearer", "because")',
            test: "includesAny",
            value: "prefer, better, clearer, because, liked, more useful, warmer, worse",
          },
        ],
      },
    },
  ],
};
