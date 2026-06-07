import type { Module } from "./types";

// AI for Everyone — the no-prerequisites on-ramp. Written for someone who has
// never opened a chatbot, taking them to "I can confidently use Claude, Gemini,
// or ChatGPT in my daily life." All quiz/reading lessons (no coding), and the
// whole module is FREE: it's the top-of-funnel lead magnet and the platform's
// headline "learn to actually use AI" promise.
export const aiForEveryone: Module = {
  slug: "ai-for-everyone",
  title: "AI for Everyone",
  description:
    "Never used an AI chatbot? Start here. Understand what AI really is, meet the major models (Claude, Gemini, ChatGPT), learn to get genuinely useful answers, spot when it's wrong, and use it safely in everyday life — no coding, no jargon.",
  emoji: "🌍",
  gradient: "from-sky-500/20 to-emerald-500/10",
  tagline:
    "Learn to use AI like Claude, Gemini, and ChatGPT from scratch — what it is, how to talk to it, and how to use it safely in everyday life.",
  keywords: [
    "how to use AI",
    "how to use ChatGPT",
    "how to use Claude",
    "how to use Gemini",
    "AI for beginners",
    "what is AI",
    "AI for non-technical people",
  ],
  free: true,
  lessons: [
    {
      slug: "what-is-ai-really",
      title: "What Is AI, Really?",
      blurb: "Demystify the magic: AI predicts likely text, it doesn't 'know' or 'think'.",
      xp: 20,
      kind: "quiz",
      content: `# What Is AI, Really?

When people say "AI" today, they usually mean a **chatbot** like Claude, Gemini,
or ChatGPT. Underneath, these are **large language models** (LLMs): programs that
have read an enormous amount of text and learned to predict **what words are
likely to come next**.

That's the whole trick — a very, very good autocomplete. You type something, and
it generates a response one piece at a time, each piece chosen because it fits the
pattern of everything it has seen before.

This matters because it explains both the magic and the limits:

- **It feels like it understands** because human language has deep patterns, and
  the model has absorbed them. It can explain, summarize, translate, and write.
- **It doesn't actually "know" facts.** It has no database it looks things up in.
  It produces text that *sounds* right — which is usually right, but not always.
- **It isn't conscious, alive, or "out to get you."** It has no feelings, goals,
  or memory of you between conversations (unless a feature explicitly adds that).

Think of it as the world's most well-read, fast, eager intern: incredibly useful,
occasionally confidently wrong, and always needing a human to decide what matters.`,
      questions: [
        {
          prompt: "At its core, what is a chatbot like Claude or ChatGPT doing?",
          options: [
            "Looking up answers in a giant fact database",
            "Predicting likely next words based on patterns it learned from lots of text",
            "Thinking and reasoning the way a conscious person does",
          ],
          answer: 1,
          explanation:
            "LLMs generate text by predicting what's likely to come next. There's no lookup database and no consciousness — just a very capable pattern predictor.",
        },
        {
          prompt: "Why does an AI sometimes give a confident answer that's wrong?",
          options: [
            "It's lying on purpose",
            "It produces text that *sounds* right, which usually is right but isn't guaranteed to be true",
            "Its database is out of date",
          ],
          answer: 1,
          explanation:
            "Because it's predicting plausible text rather than retrieving verified facts, it can sound authoritative while being mistaken. That's why a human check matters.",
        },
        {
          prompt: "Which comparison best describes how to treat an AI assistant?",
          options: [
            "An all-knowing oracle that's never wrong",
            "A fast, well-read intern: super useful, but you make the final call",
            "A search engine that only returns links",
          ],
          answer: 1,
          explanation:
            "The 'fast, fallible intern' framing keeps expectations right: lean on it for speed and drafts, but you stay responsible for what's true and what ships.",
        },
      ],
      explanation:
        "Once you see AI as a powerful pattern-predictor rather than a magic brain, everything else — its strengths, its mistakes, and how to prompt it — makes sense.",
    },
    {
      slug: "meet-the-models",
      title: "Meet the Models",
      blurb: "Claude, Gemini, ChatGPT and friends — what they are and how to get to them.",
      xp: 20,
      kind: "quiz",
      content: `# Meet the Models

A handful of companies make the leading AI assistants. You don't need to memorize
specs — you just need to know they exist, they're broadly similar, and they're all
a free signup (or even no signup) away.

- **Claude** (by Anthropic) — known for thoughtful, careful writing and reasoning,
  long documents, and being a strong coding partner. Web app + apps.
- **ChatGPT** (by OpenAI) — the one that made AI mainstream; huge ecosystem.
- **Gemini** (by Google) — tightly tied into Google Search, Docs, and Android.
- **Copilot** (by Microsoft) — built into Windows and Office.
- Plus open models (like **Llama** and **Mistral**) you can even run yourself.

A few things that are true across all of them:

- **They're more alike than different** for everyday tasks. Pick one and start.
- **Most have a free tier** that's plenty to learn on; paid tiers add speed,
  higher limits, and the newest models.
- **They each have a phone app**, so AI fits in your pocket, not just your desk.
- **Newer = generally better**, but the *skill of using them well* matters far
  more than which logo is on the box.

The best model is the one you actually open and practice with.`,
      questions: [
        {
          prompt: "Which statement is most accurate about the major AI assistants?",
          options: [
            "Only one of them works; the rest are fakes",
            "For everyday tasks they're broadly similar — pick one and start practicing",
            "You must pay before you can try any of them",
          ],
          answer: 1,
          explanation:
            "Claude, ChatGPT, Gemini, and others overlap heavily for common tasks, and most have a usable free tier. Getting good at using one is what counts.",
        },
        {
          prompt: "Claude, made by Anthropic, is especially well known for…",
          options: [
            "Being the only AI that can do math",
            "Thoughtful writing/reasoning, long documents, and being a strong coding partner",
            "Only working inside Google products",
          ],
          answer: 1,
          explanation:
            "Claude is widely used for careful writing, working through long documents, and as a coding assistant — though all the top models can handle these to varying degrees.",
        },
        {
          prompt: "What matters most for getting value out of AI?",
          options: [
            "Always using the single 'best' model",
            "The skill of using it well — clear requests, follow-ups, and verifying",
            "Having the most expensive subscription",
          ],
          answer: 1,
          explanation:
            "Skill beats brand. A practiced user on a free model will outperform a beginner on the priciest one.",
        },
      ],
    },
    {
      slug: "your-first-conversation",
      title: "Your First Conversation",
      blurb: "It's a chat, not a search box. Talk normally, then keep going.",
      xp: 20,
      kind: "quiz",
      content: `# Your First Conversation

Using AI is just **typing a message and reading the reply** — then replying again.
The single biggest beginner mistake is treating it like Google: typing two keywords
and expecting magic. Instead, talk to it like a capable colleague.

**Just ask, in plain language.** "Help me write a birthday message for my mom who
loves gardening." "Explain how a mortgage works like I'm 15." "What should I cook
with chicken, rice, and whatever's usually in a pantry?"

**Then — and this is the superpower — keep the conversation going.** The model
remembers everything you've said *in this chat*, so you can refine:

- "Make it shorter."
- "More casual."
- "Actually, she prefers tea over coffee — redo it."
- "Give me three options instead."

This back-and-forth is where the quality comes from. Your first answer is a draft;
your third or fourth is usually great. You don't need perfect wording up front —
you need to **start, then steer**.

One more habit: when you start a brand-new topic, **open a new chat**. Each
conversation carries its own context, and a fresh chat keeps things focused.`,
      questions: [
        {
          prompt: "What's the most common beginner mistake when using AI?",
          options: [
            "Writing full sentences",
            "Treating it like a search box — a couple of keywords instead of a real request",
            "Saying 'please' and 'thank you'",
          ],
          answer: 1,
          explanation:
            "AI shines when you talk to it in natural language like a colleague. Keyword-style queries leave most of its ability on the table.",
        },
        {
          prompt: "After you get a first reply you don't love, the best move is to…",
          options: [
            "Give up — it can't do better",
            "Reply and refine: 'make it shorter', 'more casual', 'give me 3 options'",
            "Start a brand-new chat and retype everything",
          ],
          answer: 1,
          explanation:
            "The model remembers the conversation, so iterating with follow-ups is exactly how you get from a rough draft to a great answer.",
        },
        {
          prompt: "When should you start a new chat?",
          options: [
            "After every single message",
            "When you switch to an unrelated topic, to keep the context focused",
            "Never — one chat should hold your whole life",
          ],
          answer: 1,
          explanation:
            "Each chat carries its own context. A fresh chat for a new topic avoids confusing the model with unrelated earlier messages.",
        },
      ],
      explanation:
        "Start, then steer. Plain-language requests plus follow-up refinements are 90% of using AI well.",
    },
    {
      slug: "getting-great-answers",
      title: "Getting Great Answers",
      blurb: "Context, specifics, and 'what good looks like' turn okay replies into great ones.",
      xp: 25,
      kind: "quiz",
      content: `# Getting Great Answers

You don't need "prompt engineering" jargon to get great results. You need to give
the model what any human helper would need. Remember four simple moves — **Context,
Specifics, Format, Examples**:

1. **Context** — who it's for and why. *"I'm a nurse writing to a worried patient's
   family…"* tells the model the tone and stakes.
2. **Specifics** — the details that constrain the answer. *"…about 150 words, warm
   but professional, mention we'll call with updates."*
3. **Format** — how you want it shaped. *"Give me a bulleted checklist,"* or *"a
   table,"* or *"three subject-line options."*
4. **Examples** — show one if you have it. *"Match the style of this past email: …"*

Compare:

> ❌ "Write an email."
>
> ✅ "Write a short, reassuring email to a customer whose order is delayed two days.
> Apologize once, give the new date, offer 10% off their next order. Friendly,
> not corporate. Under 120 words."

The second one will be usable on the first try. A great rule of thumb: **if a new
human assistant would have to ask you a follow-up question, add that detail to your
request.** And if you're not sure what details matter, you can literally ask: *"What
do you need to know from me to do this well?"*`,
      questions: [
        {
          prompt: "Which request will produce the most useful answer?",
          options: [
            "'Write an email.'",
            "'Write a short, reassuring email about a 2-day delay — apologize once, give the new date, offer 10% off, under 120 words, friendly.'",
            "'email delay sorry'",
          ],
          answer: 1,
          explanation:
            "Context, specifics, and format up front mean the model nails it on the first try instead of guessing.",
        },
        {
          prompt: "A good rule of thumb for how much detail to include is:",
          options: [
            "As few words as possible to save time",
            "If a new human assistant would have to ask a follow-up, include that detail",
            "Always exactly one sentence",
          ],
          answer: 1,
          explanation:
            "The model can't read your mind any better than a brand-new assistant could. Pre-answering the obvious follow-ups gets you a great first draft.",
        },
        {
          prompt: "You don't know what details the AI needs. What can you do?",
          options: [
            "Nothing — just hope for the best",
            "Ask it: 'What do you need to know from me to do this well?'",
            "Send the same vague prompt repeatedly until it works",
          ],
          answer: 1,
          explanation:
            "Turning the question around is a pro move: the model will list what would help, and you fill in the blanks.",
        },
      ],
      explanation:
        "Context, Specifics, Format, Examples. Give the model what any good helper would need, and you'll rarely get a weak answer.",
    },
    {
      slug: "when-ai-is-wrong",
      title: "When AI Gets It Wrong",
      blurb: "Hallucinations are confident, fluent, and sometimes totally made up. Verify what matters.",
      xp: 25,
      kind: "quiz",
      content: `# When AI Gets It Wrong

Because AI generates plausible-sounding text rather than looking up facts, it can
**hallucinate**: state something false with total confidence. It might invent a
statistic, a book title, a quote, a legal case, or a "fact" about you — all in
fluent, authoritative language.

This has caused real harm: lawyers have submitted court filings citing cases the AI
made up, and people have followed invented medical or financial advice.

The fix isn't to distrust AI — it's to **verify the things that matter**:

- **Facts, numbers, names, dates, citations, law, health, money** → double-check
  against a real source before relying on them.
- **Drafts, brainstorms, explanations, summaries, rewrites** → low risk; the AI is
  great here and a quick read-through is enough.

Helpful habits:

- Ask **"How confident are you, and what should I double-check?"**
- Ask it to **show its sources** — then actually verify the sources exist and say
  what it claims (it can invent those too).
- For anything important, get it from a **second, authoritative source**.

Treat AI like a brilliant but unreliable narrator: wonderful for momentum, never
the final authority on anything that carries real consequences.`,
      questions: [
        {
          prompt: "A 'hallucination' in AI means…",
          options: [
            "The AI gets tired and stops working",
            "It states something false but plausible-sounding with full confidence",
            "It refuses to answer",
          ],
          answer: 1,
          explanation:
            "Hallucinations are fluent, confident, and wrong — invented facts, quotes, or citations. Confidence is not evidence.",
        },
        {
          prompt: "Which of these should you always verify against a real source?",
          options: [
            "A first draft of a casual birthday message",
            "A legal citation, a medical dosage, or a financial figure you'll act on",
            "A list of brainstorm ideas for a party theme",
          ],
          answer: 1,
          explanation:
            "High-stakes facts — law, health, money, names, citations — must be checked. Low-stakes drafts and brainstorms are exactly where AI is safe and strong.",
        },
        {
          prompt: "The AI gives you three sources for a claim. What should you do?",
          options: [
            "Trust them — sources are always real",
            "Check that the sources actually exist and say what it claims; it can invent those too",
            "Ignore them entirely",
          ],
          answer: 1,
          explanation:
            "Models can fabricate citations as confidently as facts. Verifying the source exists and supports the claim is the responsible step.",
        },
      ],
      explanation:
        "Verify what matters. AI is a brilliant, unreliable narrator — perfect for momentum, never the last word on high-stakes facts.",
    },
    {
      slug: "privacy-and-safety",
      title: "Privacy & Staying Safe",
      blurb: "What's safe to share, what isn't, and how to keep control of your data.",
      xp: 20,
      kind: "quiz",
      content: `# Privacy & Staying Safe

AI chats are incredibly useful, but you're typing into a service run by a company.
A little awareness keeps you safe without making you paranoid.

**Assume what you type may be stored — and sometimes reviewed or used to improve
models.** Many services let you turn off training on your chats or delete history,
but the safe default is: **don't paste anything you'd be upset to see leaked.**

Be careful with:

- **Personal identifiers** — full national ID numbers, passwords, bank/card numbers.
- **Other people's private info** — medical details, a friend's address, work
  secrets covered by an NDA.
- **Confidential work data** — many jobs forbid pasting internal documents into
  public AI tools. Check your employer's policy.

Safe and smart habits:

- **Redact before you paste** — swap real names/numbers for placeholders like
  "[NAME]" or "[ACCOUNT]". The AI can still help with the structure.
- **Use privacy settings** — turn off chat-history training if you prefer; delete
  conversations you don't need.
- **Be skeptical of "AI" links and apps** — scammers clone popular tools. Use the
  official website or app store listing.

You stay in control. AI is a tool you point at a problem — not a confessional.`,
      questions: [
        {
          prompt: "What's the safest default assumption about what you type into an AI chat?",
          options: [
            "It's 100% private and instantly deleted",
            "It may be stored and possibly reviewed — so don't paste anything you'd hate to see leaked",
            "It's broadcast publicly to everyone",
          ],
          answer: 1,
          explanation:
            "Treat it like data you're handing to a company. Many tools offer privacy controls, but the safe baseline is to avoid pasting secrets.",
        },
        {
          prompt: "You want AI's help rewriting a letter that contains a real account number. Best move?",
          options: [
            "Paste it exactly as-is",
            "Replace the sensitive bits with placeholders like [ACCOUNT] before pasting",
            "Don't use AI at all, ever",
          ],
          answer: 1,
          explanation:
            "Redacting with placeholders lets the AI help with wording and structure without ever seeing the sensitive data.",
        },
        {
          prompt: "Before pasting an internal company document into a public AI tool, you should…",
          options: [
            "Check your employer's policy — many forbid it",
            "Assume it's always fine",
            "Email it to yourself first",
          ],
          answer: 0,
          explanation:
            "Confidential work data is a common trap. Many organizations ban pasting internal docs into public tools; check the policy first.",
        },
      ],
      explanation:
        "Redact, use privacy settings, and skip the secrets. A few simple habits let you enjoy AI safely.",
    },
    {
      slug: "ai-in-everyday-life",
      title: "AI in Your Everyday Life",
      blurb: "Writing, learning, planning, images, and more — where AI actually saves you time.",
      xp: 25,
      kind: "quiz",
      content: `# AI in Your Everyday Life

The real unlock is realizing how many small, annoying tasks AI can take off your
plate. A sampler of what people use it for every day:

- **Writing & communication** — emails, messages, cover letters, complaint
  letters, toasts, captions. ("Make this firmer." "Make this kinder.")
- **Learning & understanding** — "Explain this like I'm 12." "Quiz me on this."
  "Summarize this article." "What questions should I ask my doctor about this?"
- **Planning & organizing** — trip itineraries, meal plans from your fridge,
  budgets, to-do breakdowns, decisions ("pros and cons of X vs Y for me").
- **Creativity** — brainstorming names, gift ideas, story plots, party themes.
- **Images** — many AIs can now *generate* images ("a watercolor of a fox in a
  teacup") and *read* images you upload ("what's wrong with this plant?").
- **Everyday tech help** — "Why won't my printer connect?" "Write a formula that
  sums column B where column A says 'paid'."

Two mindset shifts make all of this click:

1. **It's a starting point, not a final answer.** Use it to get unstuck and
   produce a draft, then add your judgment.
2. **When in doubt, just try.** The cost of asking is seconds. The worst case is a
   so-so answer you refine. There's no "dumb question" for an AI.

The people getting the most from AI aren't the most technical — they're the ones
who **build the habit of reaching for it**.`,
      questions: [
        {
          prompt: "Which is a realistic, everyday use of today's AI assistants?",
          options: [
            "Physically cleaning your house",
            "Drafting an email, explaining a topic simply, and planning meals from your fridge",
            "Predicting next week's lottery numbers",
          ],
          answer: 1,
          explanation:
            "AI excels at language and reasoning tasks — writing, explaining, planning, brainstorming. It can't act in the physical world or foresee random events.",
        },
        {
          prompt: "What's the healthiest way to think about an AI's output?",
          options: [
            "A finished product to use as-is, every time",
            "A strong starting point to refine with your own judgment",
            "Something to ignore",
          ],
          answer: 1,
          explanation:
            "Treating answers as drafts to refine — not gospel — is exactly how everyday users get reliable, high-quality results.",
        },
        {
          prompt: "What most separates people who get a lot out of AI from those who don't?",
          options: [
            "Being a programmer",
            "Building the habit of reaching for it on small everyday tasks",
            "Owning the newest phone",
          ],
          answer: 1,
          explanation:
            "It's a habit, not a credential. The biggest gains come from simply remembering to try AI for the little tasks that add up.",
        },
      ],
      explanation:
        "Writing, learning, planning, creating, even reading images — AI is a daily-life multiplier for anyone willing to build the habit of using it.",
    },
    {
      slug: "myths-vs-reality",
      title: "AI Myths vs Reality",
      blurb: "Capstone: separate the hype and fear from what's actually true.",
      xp: 25,
      kind: "quiz",
      content: `# AI Myths vs Reality

You've covered a lot. Let's close by clearing up the myths that confuse most
people — both the breathless hype and the needless fear.

**Myth: "AI is basically a person / it's conscious."**
Reality: It's a pattern predictor with no feelings, awareness, or agenda. It can
*sound* human; it isn't.

**Myth: "AI is always right because it's a computer."**
Reality: It's confidently wrong sometimes. Verify what matters.

**Myth: "Using AI is cheating / not a real skill."**
Reality: Using a tool well *is* a skill — like using a calculator, a search engine,
or a spreadsheet. The judgment of what to ask and what to keep is yours.

**Myth: "I'm not technical, so AI isn't for me."**
Reality: The best everyday users are often non-technical. If you can text a friend,
you can use AI.

**Myth: "It will instantly replace everyone."**
Reality: It changes how work gets done and automates pieces of jobs, but it's a
tool people *direct*. The people who thrive are the ones who learn to direct it —
which, by finishing this course, you've started doing.

The honest summary: AI is **a powerful, flawed, general-purpose assistant.** Stay
curious, stay a little skeptical, keep your hand on the wheel — and use it boldly.`,
      questions: [
        {
          prompt: "Which statement is TRUE?",
          options: [
            "AI is conscious and has its own goals",
            "AI is a powerful but flawed tool that humans direct and stay responsible for",
            "AI is always correct because computers don't make mistakes",
          ],
          answer: 1,
          explanation:
            "That's the whole course in one line: powerful, flawed, human-directed. Not conscious, not infallible.",
        },
        {
          prompt: "Is using AI well a 'real skill'?",
          options: [
            "No — it's cheating",
            "Yes — like using a calculator or search engine, the judgment of what to ask and keep is a learnable skill",
            "Only if you can code",
          ],
          answer: 1,
          explanation:
            "Tool fluency is a genuine, valuable skill. Knowing what to ask, how to refine, and what to trust is the craft you've been building.",
        },
        {
          prompt: "What's the best attitude to carry forward?",
          options: [
            "Total fear — avoid AI entirely",
            "Blind trust — accept everything it says",
            "Curious and a little skeptical — use it boldly, keep your hand on the wheel",
          ],
          answer: 2,
          explanation:
            "Bold but skeptical is the sweet spot: you capture the upside while staying the one in control.",
        },
      ],
      explanation:
        "You did it — you can now use AI confidently and safely. Next up: become a genuine power user, then learn to build with it.",
    },
  ],
};
