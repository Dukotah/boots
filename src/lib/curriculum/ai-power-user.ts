import type { Module } from "./types";

// AI Power User — the practical tier between "AI for Everyone" and building with
// AI. Takes someone who can hold a conversation with a chatbot and turns them into
// someone who gets real leverage out of it at work and in life: research, learning,
// long documents, structured output, and reusable personal workflows. Mostly
// judgment (quiz) with a couple of hands-on prompt-building exercises so it stays
// interactive and auto-grades with the JS engine (no API key, no network).
export const aiPowerUser: Module = {
  slug: "ai-power-user",
  title: "AI Power User",
  description:
    "Get real leverage from AI in work and life: research and verify, learn faster, tame long documents, force output you can actually use, and build reusable personal prompt workflows.",
  emoji: "⚡",
  gradient: "from-amber-500/20 to-orange-500/10",
  tagline:
    "Become an AI power user: practical workflows for research, learning, long documents, structured output, and reusable prompts.",
  keywords: [
    "how to use AI at work",
    "AI productivity",
    "AI for research",
    "AI for learning",
    "reusable prompts",
    "AI workflows",
  ],
  lessons: [
    {
      slug: "ai-as-a-thinking-partner",
      title: "AI as a Thinking Partner",
      blurb: "The mindset shift: from 'answer machine' to collaborator you push on.",
      xp: 20,
      kind: "quiz",
      content: `# AI as a Thinking Partner

Beginners ask AI for *the answer*. Power users use it as a **thinking partner** —
something to react to, argue with, and build on. That one shift unlocks most of
the value.

Concretely, that means using moves like:

- **"Give me 5 options, then your recommendation."** Divergent then convergent —
  far better than one safe answer.
- **"What am I missing?"** / **"Argue the opposite side."** The model is a tireless
  devil's advocate that never gets defensive.
- **"Critique this draft like a tough editor."** Honest feedback on demand.
- **"Ask me questions until you have enough to do this well."** Flip it: let the AI
  interview *you*.
- **"Explain your reasoning."** Especially for recommendations and judgment calls.

The throughline: you're not outsourcing your thinking, you're **amplifying** it.
You bring the goal, the taste, and the final decision. The AI brings speed,
breadth, and a second perspective that's available 24/7 and never tired.`,
      questions: [
        {
          prompt: "What's the key mindset shift that separates a power user from a beginner?",
          options: [
            "Using AI as a thinking partner to push on, not just an answer vending machine",
            "Only ever asking yes/no questions",
            "Trusting the first answer without reading it",
          ],
          answer: 0,
          explanation:
            "Treating AI as a collaborator — options, critiques, counterarguments — extracts far more value than asking for a single answer.",
        },
        {
          prompt: "Which prompt best uses AI as a thinking partner for a tough decision?",
          options: [
            "'Just tell me what to do.'",
            "'Give me 5 options with trade-offs, argue the opposite of my lean, then recommend one and explain why.'",
            "'idk help'",
          ],
          answer: 1,
          explanation:
            "Divergent options + a counterargument + a reasoned recommendation turns the AI into a genuine sounding board you still decide from.",
        },
        {
          prompt: "When AI acts as a thinking partner, who owns the final decision?",
          options: [
            "The AI — it knows best",
            "You — you bring the goal, taste, and judgment; it brings speed and a second view",
            "Nobody — it's automatic",
          ],
          answer: 1,
          explanation:
            "Amplify, don't outsource. The human stays responsible for the goal and the call; the AI accelerates getting there.",
        },
      ],
    },
    {
      slug: "research-and-verify",
      title: "Research & Verify",
      blurb: "Use AI to get oriented fast — then confirm before you rely on it.",
      xp: 20,
      kind: "quiz",
      content: `# Research & Verify

AI is a phenomenal **starting point** for research and a dangerous **ending point**.
Used right, it gets you oriented on a new topic in minutes; used naively, it feeds
you confident fiction.

A solid research workflow:

1. **Orient.** "I'm new to [topic]. Give me the 20% I need to understand 80% of it,
   plus the key terms and the main points of disagreement."
2. **Go deeper.** Ask follow-ups on the parts that matter to you.
3. **Get pointers, not just claims.** "What are the most authoritative sources on
   this, and what would I search to verify each claim?"
4. **Verify the load-bearing facts.** Anything you'll act on or repeat publicly —
   check against a primary or reputable source.

Two traps to avoid:

- **Fabricated sources.** Models can invent real-looking citations. Always confirm
  a source exists and actually says what's claimed.
- **Stale knowledge.** A model's training has a cutoff date. For recent events,
  prices, or fast-moving topics, prefer a tool with live web access — or check the
  web yourself.

The pro framing: AI gives you a fast, smart **first map** of the territory. You
still walk the ground before betting on the route.`,
      questions: [
        {
          prompt: "What role should AI play in serious research?",
          options: [
            "The final authority — whatever it says is fact",
            "A fast starting point to get oriented, with key facts verified before you rely on them",
            "Useless — never use it for research",
          ],
          answer: 1,
          explanation:
            "AI is a great first map but a risky last word. Orient quickly, then verify what's load-bearing.",
        },
        {
          prompt: "You need a figure from this month for a report. Why be cautious asking a model from memory?",
          options: [
            "Models refuse to discuss numbers",
            "Training has a cutoff date, so recent facts may be missing or outdated — use live-web access or check yourself",
            "Numbers are always made up",
          ],
          answer: 1,
          explanation:
            "Knowledge cutoffs make recent or fast-moving facts unreliable from memory. Use a web-connected tool or verify directly.",
        },
        {
          prompt: "The AI lists three 'authoritative sources' for a claim. The responsible next step is:",
          options: [
            "Cite them immediately",
            "Confirm each source exists and actually supports the claim before relying on it",
            "Assume they're fake and ignore the topic",
          ],
          answer: 1,
          explanation:
            "Citations can be fabricated as confidently as facts. Verifying them is the difference between research and repeating fiction.",
        },
      ],
    },
    {
      slug: "learn-faster",
      title: "Learn Anything Faster",
      blurb: "Turn AI into a personal tutor: explanations at your level, then active recall.",
      xp: 20,
      kind: "quiz",
      content: `# Learn Anything Faster

AI is the most patient tutor you'll ever have. It will re-explain the same idea ten
different ways, at any level, without sighing. The trick is to use proven learning
techniques, not just passive reading.

High-leverage learning moves:

- **Calibrate the level.** "Explain [concept] to me like I'm 12." Then "Okay, now
  at a college level." Climbing the ladder builds real understanding.
- **Use analogies.** "Give me an everyday analogy for [concept]." Analogies make
  abstract ideas stick.
- **Active recall — let it quiz you.** "Quiz me with 5 questions, one at a time.
  Wait for my answer before revealing the next." Retrieving beats re-reading.
- **Find your gaps.** "I think [my explanation]. What did I get wrong or miss?"
- **The Feynman move.** Explain it back in your own words and ask the AI to grade
  your explanation. Teaching reveals what you don't actually understand.

One caution: because AI can be confidently wrong, **don't learn high-stakes facts
from it alone** (exact medical, legal, or safety details). For *understanding* —
how something works, why it matters, how the pieces fit — it's superb.

The goal isn't to have AI know things *for* you. It's to help **you** learn faster
and remember more.`,
      questions: [
        {
          prompt: "Which technique uses AI for genuine learning rather than passive reading?",
          options: [
            "Asking it to summarize so you never have to think about it",
            "Having it quiz you one question at a time (active recall) and grade your explanations",
            "Copying its answer into your notes unread",
          ],
          answer: 1,
          explanation:
            "Active recall and explaining-it-back (the Feynman technique) are proven to build memory. AI is a tireless partner for both.",
        },
        {
          prompt: "Why ask the AI to explain a concept 'like I'm 12', then again at a higher level?",
          options: [
            "It's faster",
            "Climbing from simple to advanced builds real understanding from a solid base",
            "The simple version is the only correct one",
          ],
          answer: 1,
          explanation:
            "Calibrating the level — and then raising it — scaffolds understanding instead of dumping jargon you can't anchor.",
        },
        {
          prompt: "What should you NOT rely on AI alone to learn?",
          options: [
            "How a concept works at a high level",
            "Exact high-stakes facts (precise medical, legal, or safety details)",
            "Everyday analogies",
          ],
          answer: 1,
          explanation:
            "For understanding, AI is excellent. For precise high-stakes facts you'll act on, confirm with an authoritative source.",
        },
      ],
    },
    {
      slug: "structured-output",
      title: "Get Output You Can Actually Use",
      blurb: "Ask for the exact shape — checklist, table, email — and you'll get it.",
      xp: 30,
      content: `# Get Output You Can Actually Use

A power-user habit: don't just ask *what* — specify *how it's shaped*. "List the
steps" gives you a paragraph; "give me a numbered checklist I can tick off" gives
you something you can use immediately. The same applies to tables, email drafts,
JSON, bullet summaries, and more.

A reusable trick is to append a clear **format instruction** to your request. Let's
build that helper.

## Your task
Write \`asChecklist(task)\` that appends a checklist-format instruction. Return the
\`task\`, then a blank line, then the instruction — exactly:

\`{task}\\n\\nFormat the answer as a numbered checklist. One action per line. No intro or outro text.\``,
      starterCode: `function asChecklist(task) {
  // append the checklist format instruction after a blank line
}
`,
      solution: `function asChecklist(task) {
  return task + "\\n\\nFormat the answer as a numbered checklist. One action per line. No intro or outro text.";
}`,
      tests: [
        {
          name: "appends the checklist instruction",
          code: `assertEquals(asChecklist("How do I prepare for a job interview?"), "How do I prepare for a job interview?\\n\\nFormat the answer as a numbered checklist. One action per line. No intro or outro text.");`,
        },
        {
          name: "works for any task",
          code: `assertEquals(asChecklist("Plan a birthday party"), "Plan a birthday party\\n\\nFormat the answer as a numbered checklist. One action per line. No intro or outro text.");`,
        },
      ],
      hints: [
        "Join the task and the instruction with a blank line: `\\n\\n`.",
        'Append exactly: "Format the answer as a numbered checklist. One action per line. No intro or outro text."',
      ],
      explanation:
        "Specifying the output shape is one of the highest-leverage habits there is. The same move ('as a table', 'as a 3-sentence summary', 'as JSON') turns vague replies into something you can paste straight into your work.",
    },
    {
      slug: "personal-prompt-library",
      title: "Build a Personal Prompt Library",
      blurb: "Save your best prompts as fill-in-the-blank templates you reuse forever.",
      xp: 30,
      content: `# Build a Personal Prompt Library

Once you find a prompt that works, **don't reinvent it next time** — save it as a
reusable template with blanks to fill in. Power users keep a little library of these
(in a note, a doc, or a tool) for the tasks they do often: weekly updates, meeting
notes, emails, study sessions.

A template is just text with **placeholders** you swap in per use. Let's build the
fill-in step.

## Your task
Write \`applyTemplate(template, values)\` that replaces every \`[KEY]\` in
\`template\` with \`values[KEY]\`. Keys are uppercase words in square brackets. If a
key has no matching value, leave the \`[KEY]\` untouched.

Example: \`applyTemplate("Summarize [DOC] for [AUDIENCE].", { DOC: "this report", AUDIENCE: "my boss" })\`
→ \`"Summarize this report for my boss."\``,
      starterCode: `function applyTemplate(template, values) {
  // replace each [KEY] with values[KEY]; leave unknown keys as-is
}
`,
      solution: `function applyTemplate(template, values) {
  return template.replace(/\\[([A-Z]+)\\]/g, (match, key) =>
    key in values ? values[key] : match,
  );
}`,
      tests: [
        {
          name: "fills the placeholders",
          code: `assertEquals(applyTemplate("Summarize [DOC] for [AUDIENCE].", { DOC: "this report", AUDIENCE: "my boss" }), "Summarize this report for my boss.");`,
        },
        {
          name: "leaves unknown keys untouched",
          code: `assertEquals(applyTemplate("Email [NAME] about [TOPIC]", { NAME: "Sam" }), "Email Sam about [TOPIC]");`,
        },
      ],
      hints: [
        "A regex like `/\\[([A-Z]+)\\]/g` captures the KEY inside the brackets.",
        "In the replacer, return `values[key]` if it exists, otherwise the original `match`.",
      ],
      explanation:
        "A personal prompt library compounds: every reusable template you save makes the next similar task faster and more consistent. This is the same idea behind 'prompt templates' in real AI apps — just for your own life.",
    },
    {
      slug: "long-documents-and-files",
      title: "Tame Long Documents & Files",
      blurb: "Summaries, extraction, and Q&A over big PDFs, reports, and transcripts.",
      xp: 25,
      kind: "quiz",
      content: `# Tame Long Documents & Files

Many AI tools let you **upload files** — PDFs, docs, spreadsheets, even images — or
paste long text, then work over it. This is a quiet superpower for anyone who deals
with reports, contracts, research papers, or meeting transcripts.

What works well:

- **Summaries at the right altitude.** "Summarize this 40-page report in one page,
  then give me the 5 decisions a manager needs to make."
- **Targeted extraction.** "Pull every date, deadline, and dollar figure into a
  table." "List every action item and who owns it."
- **Q&A over the document.** "Does this contract say anything about cancellation
  fees? Quote the exact clause." Asking for **exact quotes** keeps it honest.
- **Comparison.** "Here are two proposals — compare them on price, timeline, and
  risk."

Things to watch:

- **Limits exist.** Extremely long documents may exceed what a model can hold at
  once (its "context window"). Split huge files into sections if needed.
- **Verify against the source.** For anything important, ask for the exact quote
  and confirm it appears in the document — don't trust a paraphrase blindly.
- **Privacy.** Don't upload confidential files to public tools without checking
  policy (revisit "Privacy & Staying Safe").

Done right, AI turns "I have to read 60 pages tonight" into "I have to *check* the
6 things that matter."`,
      questions: [
        {
          prompt: "What's a strong way to use AI on a long contract?",
          options: [
            "Ask it to 'make the contract good'",
            "Ask targeted questions and request the *exact quoted clause* so you can verify it",
            "Trust its paraphrase without checking the document",
          ],
          answer: 1,
          explanation:
            "Targeted Q&A plus exact quotes keeps the AI grounded in the actual text and lets you confirm what matters.",
        },
        {
          prompt: "Why might a very long document not work in one go?",
          options: [
            "AI can't read PDFs at all",
            "It may exceed the model's context window — the amount it can hold at once",
            "Long files are always confidential",
          ],
          answer: 1,
          explanation:
            "Every model has a finite context window. For huge files, split them into sections or use a tool designed for large documents.",
        },
        {
          prompt: "Before uploading a sensitive work PDF to a public AI tool, you should…",
          options: [
            "Check whether your employer's policy allows it",
            "Always upload — files are private",
            "Rename the file to hide it",
          ],
          answer: 0,
          explanation:
            "Uploaded files are still data handed to a company. Confidential work documents need a policy check first.",
        },
      ],
    },
    {
      slug: "the-refine-loop",
      title: "Iterate Like a Pro",
      blurb: "Capstone: the refine loop that turns a rough first answer into a great one.",
      xp: 25,
      kind: "quiz",
      content: `# Iterate Like a Pro

Everything in this course rests on one loop. Beginners send one prompt and accept
whatever comes back. Power users run the **refine loop**:

1. **Aim** — a clear request with context, specifics, and the format you want.
2. **Read critically** — what's good, what's off, what's missing?
3. **Steer** — give targeted feedback: "tighten the intro", "wrong tone", "add an
   example", "you misunderstood X, it's actually Y".
4. **Repeat** until it's genuinely good — usually 2–4 rounds.

Pro accelerators inside the loop:

- **Be specific in feedback.** "Make it better" is weak; "cut it to 100 words and
  lead with the benefit" is strong.
- **Let it self-critique.** "Before you answer, list what a great version needs,
  then write it." Or "rate your own draft 1–10 and improve the weakest part."
- **Keep what works.** "Keep paragraph 2 exactly; rewrite the rest."
- **Know when to stop.** Diminishing returns are real — ship the good-enough draft
  and add your final human polish.

That's the whole craft: **start, then steer, then ship.** You bring the goal and
the judgment; the loop does the rest. You're now an AI power user — next, you can
learn to *build* with it.`,
      questions: [
        {
          prompt: "What is the 'refine loop'?",
          options: [
            "Sending the exact same prompt over and over",
            "Aim → read critically → steer with specific feedback → repeat until it's genuinely good",
            "Accepting the first answer no matter what",
          ],
          answer: 1,
          explanation:
            "Iterating with targeted feedback over a few rounds is the core craft of getting excellent results from AI.",
        },
        {
          prompt: "Which feedback will improve a draft the most?",
          options: [
            "'Make it better.'",
            "'Cut it to 100 words and lead with the main benefit.'",
            "'No.'",
          ],
          answer: 1,
          explanation:
            "Specific, concrete feedback gives the model something to act on. Vague feedback gets vague improvement.",
        },
        {
          prompt: "A pro move *inside* the loop is to…",
          options: [
            "Ask the AI to critique or rate its own draft, then improve the weakest part",
            "Never give any feedback",
            "Start a new chat after every message",
          ],
          answer: 0,
          explanation:
            "Self-critique ('list what a great version needs, then write it') often lifts quality before you even add your own feedback.",
        },
      ],
      explanation:
        "Start, steer, ship. With the refine loop in hand, you're a genuine AI power user — ready to move from *using* AI to *building* with it.",
    },
  ],
};
