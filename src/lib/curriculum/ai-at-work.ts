import type { Module } from "./types";

// AI at Work — the "10x your day job" module of the "AI for Everyone" track.
//
// Built for knowledge workers and professionals who already grasp the basics
// (see `ai-foundations`) and now want to fold AI into real office work: email,
// meeting notes, summaries, light data analysis, slide outlines, and decision
// docs. Like the rest of the track there is no code editor — `quiz` lessons
// teach + check judgment, `project` lessons have learners do real work in a
// real AI tool and grade what they bring back with a client-side rubric.
//
// Two themes run through every lesson because they're where professionals get
// burned: (1) verify facts, numbers, and quotes before you forward them, and
// (2) never paste confidential or customer data into tools your company hasn't
// approved. Not free — this is paid, post-funnel content.
export const aiAtWork: Module = {
  slug: "ai-at-work",
  title: "AI at Work",
  description:
    "Use AI to do real professional work faster — triage email, turn messy meeting notes into action items, summarize long documents faithfully, read a table for trends, outline a talk, and draft a decision doc. With the guardrails that keep you out of trouble: verify the facts, protect the data.",
  emoji: "💼",
  gradient: "from-blue-500/20 to-indigo-500/10",
  tagline:
    "Practical AI for knowledge workers: draft replies, summarize docs, analyze data, build slides, and write decision docs in a fraction of the time — without leaking data or shipping made-up numbers.",
  keywords: [
    "ai for work",
    "ai for productivity",
    "ai for knowledge workers",
    "ai email assistant",
    "ai meeting notes",
    "ai for professionals",
    "chatgpt for work",
    "ai prompts for work",
  ],
  lessons: [
    // ── 1 ── policy & privacy (quiz)
    {
      slug: "ai-at-work-responsibly",
      title: "Using AI at Work, Responsibly",
      blurb: "Know the rules before you paste — data privacy and company policy.",
      xp: 25,
      kind: "quiz",
      content: `# Using AI at Work, Responsibly

AI can make you dramatically faster — but at work, *what you type into it*
carries risk a personal chat never does. Before this module teaches you the fun
parts, learn the two rules that keep professionals out of trouble.

### Rule 1 — Check your company's AI policy first
Many employers have an explicit policy: an *approved* tool (often an enterprise
account with a data-protection agreement), a list of *banned* tools, and rules
about what you may and may not paste. A free, public chatbot and your company's
licensed enterprise account are **not** the same thing — the enterprise version
usually promises not to train on your data. If you don't know your policy, that's
your first question for IT or your manager, not a guess.

### Rule 2 — Never paste confidential or customer data into public tools
Treat a public AI tool like a postcard, not a vault. Assume anything you type
*could* be seen or retained. That means **no**:

- Customer names, emails, account numbers, or anything personally identifying.
- Unreleased financials, strategy, source code, or trade secrets.
- Anything covered by an NDA, contract, or regulation (health, legal, payment).

### The safe pattern: anonymize, then ask
You can still get the AI's help — just **strip the sensitive parts first**.

> ❌ "Draft a reply to Jane Doe at Acme Corp who's furious her invoice #4471 for
> $82,300 is wrong."

> ✅ "Draft a reply to an upset client whose invoice amount was wrong. Apologize,
> confirm we're investigating, and promise a corrected invoice within 2 business
> days."

Same useful draft. No confidential data left the building. When in doubt, leave
it out — and ask before you paste.`,
      questions: [
        {
          prompt:
            "Your team wants to use AI to speed up customer replies. What should you do FIRST?",
          options: [
            "Paste a few real customer tickets into a free chatbot to test it",
            "Check your company's AI policy to learn which tools are approved and what data is allowed",
            "Email the whole company asking everyone to start using ChatGPT",
            "Assume it's fine because lots of people use AI now",
          ],
          answer: 1,
          explanation:
            "Policy first. Approved tools and data rules vary by employer — guessing can expose customer data or breach a contract. Confirm before you paste anything sensitive.",
        },
        {
          prompt:
            "Which of these is safe to paste into a public AI chatbot your company has NOT approved?",
          options: [
            "A spreadsheet of customer names, emails, and account balances",
            "Next quarter's unreleased revenue numbers",
            "A generic, anonymized version of a problem with all names and figures removed",
            "Your company's confidential product roadmap",
          ],
          answer: 2,
          explanation:
            "Anonymize first. A generic version with identifying details stripped out lets the AI help without ever exposing confidential or personal data.",
        },
        {
          prompt:
            "Why isn't a free public chatbot necessarily the same as your company's enterprise AI account?",
          options: [
            "The enterprise version is just a different color",
            "Enterprise accounts usually come with a data agreement (e.g. not training on your data); free public tools may retain or use what you type",
            "There is no difference at all",
            "The free version is always more secure",
          ],
          answer: 1,
          explanation:
            "Enterprise and approved tools typically carry contractual data protections. A free public tool may retain inputs — which is exactly why policy decides where confidential work can go.",
        },
      ],
    },

    // ── 2 ── PROJECT: inbox triage + reply
    {
      slug: "inbox-zero-faster",
      title: "Inbox Zero, Faster",
      blurb: "Triage a thread and draft a clear, on-tone reply in minutes.",
      xp: 35,
      kind: "project",
      content: `# Inbox Zero, Faster

Email eats hours. AI is excellent at the two slow parts: **figuring out what a
thread is actually asking for**, and **drafting a clear reply you can fire off
after a quick edit.** In this project you'll do both on a real (but anonymized)
message.

**Privacy first:** pick a message with nothing confidential, or strip out names,
companies, and numbers before you paste — exactly like the last lesson. The AI
doesn't need real identities to help you write.`,
      steps: [
        {
          instruction:
            "**Find a real email thread you owe a reply to.** Anonymize it: replace real names with `[Client]`, companies with `[Company]`, and any sensitive figures with `[amount]`.",
          hint: "If your whole inbox is sensitive, make up a realistic thread instead — the skill transfers.",
        },
        {
          instruction:
            "**Ask the AI to triage it.** Paste the thread and prompt: `Summarize what this thread is asking of me in one sentence, then list every open question or action I need to address.`",
          tool: "ChatGPT / Claude / Gemini",
          hint: "This catches the buried 'oh, they also asked about X' you'd otherwise miss.",
        },
        {
          instruction:
            "**Draft the reply with role + task + context + format.** e.g. `You're me — a calm, helpful project manager. Write a reply that answers all the open questions above, proposes Tuesday for the call, and stays under 120 words. Warm but professional.`",
          hint: "Tell it your tone and a length cap. 'Under 120 words' alone fixes most rambly drafts.",
        },
        {
          instruction:
            "**Edit and verify before sending.** Check any dates, numbers, names, or commitments the AI wrote — it can invent plausible-but-wrong details. Fix the voice so it sounds like *you*, then send.",
          hint: "Never send an AI draft un-read. You're the one whose name is on it.",
        },
      ],
      checkpoint: {
        prompt:
          "**Paste the reply-drafting prompt you wrote in step 3** — the one that gives the AI a role, the task, your context, and a format/length constraint. The live checklist below shows what it's still missing.",
        placeholder:
          "You're me — a calm, helpful … Write a reply that … keep it under … words …",
        rubric: [
          {
            label: "A real, detailed instruction (at least 20 words)",
            test: "minWords",
            value: "20",
          },
          {
            label: 'Gives the AI a role or voice (e.g. "you\'re me", "you are", "act as", "as a…")',
            test: "regex",
            value: "you('?re| are)|act as|as an? |write as",
          },
          {
            label: "Sets a length or format constraint (words, sentences, short, bullets, under…)",
            test: "includesAny",
            value: "word, sentence, short, bullet, under, paragraph, concise, brief, tone",
          },
        ],
      },
    },

    // ── 3 ── PROJECT: meeting notes → minutes + action items
    {
      slug: "notes-to-action-items",
      title: "From Messy Notes to Action Items",
      blurb: "Turn raw meeting scribbles into clean minutes with owners and dates.",
      xp: 40,
      kind: "project",
      content: `# From Messy Notes to Action Items

The value of a meeting often leaks away in the hour after it ends, because nobody
turns the scribbles into **decisions, owners, and deadlines**. This is a perfect
AI job: it's pure text transformation, and being precise about *who does what by
when* is exactly what AI structures well — as long as you verify the names.

**Privacy first:** internal meeting notes can be sensitive. Use a non-sensitive
meeting, or replace real names with initials before you paste.`,
      steps: [
        {
          instruction:
            "**Grab your raw notes** from a recent meeting — bullet fragments, half-sentences, whatever you actually typed. Don't clean them up first; messy is the point.",
          hint: "No notes handy? Write 8–10 messy bullets from a meeting you remember.",
        },
        {
          instruction:
            "**Ask for structured minutes.** Prompt: `Turn these raw notes into meeting minutes with three sections: Decisions made, Action items (as a table: Task | Owner | Due date), and Open questions. Only use what's in my notes — don't invent anything.`",
          tool: "ChatGPT / Claude / Gemini",
          hint: "The 'don't invent anything' instruction reduces made-up tasks. You'll still verify.",
        },
        {
          instruction:
            "**Verify the action items against your notes.** Check every owner and due date the AI assigned — did it guess an owner you never named? Did it invent a deadline? Correct anything that drifted.",
          hint: "AI loves to 'helpfully' assign an owner. If your notes didn't say who, the cell should read TBD, not a name.",
        },
        {
          instruction:
            "**Ask for a one-line summary to send.** `Now write a 2-sentence recap I can paste at the top of the email to the team.` Drop minutes + recap into your email and send.",
        },
      ],
      checkpoint: {
        prompt:
          "**Paste your final action-items list** (the Task / Owner / Due-date lines you'll send). The checklist confirms it's structured and assigns ownership — the things that make minutes actually get done.",
        placeholder:
          "Action items:\n- Send revised budget | Owner: A.K. | Due: Fri\n- Book vendor call | Owner: TBD | Due: next week\n…",
        rubric: [
          {
            label: "A substantive list, not a stub (at least 25 words)",
            test: "minWords",
            value: "25",
          },
          {
            label: 'Assigns ownership (an "owner", "assigned to", a name/initials, or "TBD")',
            test: "includesAny",
            value: "owner, assigned, responsible, tbd, lead, by ",
          },
          {
            label: "Includes a due date or deadline (a day, a date, or words like by/due)",
            test: "regex",
            value: "due|deadline|by |mon|tue|wed|thu|fri|\\d{1,2}[/-]\\d{1,2}",
          },
        ],
      },
    },

    // ── 4 ── faithful summaries (quiz)
    {
      slug: "summarize-like-a-pro",
      title: "Summarize Like a Pro",
      blurb: "Get faithful summaries of long docs without losing what matters.",
      xp: 25,
      kind: "quiz",
      content: `# Summarize Like a Pro

Summarizing is one of AI's best skills — and one of the easiest to get *subtly*
wrong. A bad summary isn't gibberish; it's a confident, well-written paragraph
that quietly drops the one caveat that mattered, or softens a hard number. Here's
how professionals get faithful summaries.

### Give it the actual document
The single biggest upgrade: **paste the real text** (or use a tool that can open
the file). When the AI summarizes *from* your document, it can't fall back on
guessing what a document like this "probably" says.

### Steer the summary to your purpose
"Summarize this" is vague. Tell it *who it's for* and *what you'll do with it*:

> "Summarize this 12-page vendor contract for a busy manager who needs to decide
> whether to sign. Lead with the cost, the term length, and any auto-renewal or
> cancellation traps. Flag anything unusual. 6 bullets max."

### Demand fidelity, then spot-check
- Ask it to **quote or cite the section** for any key claim, so you can jump back
  and confirm.
- Ask **"what did you leave out that a careful reader might want?"** to surface
  dropped caveats.
- **Spot-check the load-bearing facts** — the price, the date, the obligation —
  against the source. Summaries are where important numbers quietly mutate.

### Watch the length trap
Asking for an extremely short summary of a complex doc *forces* the AI to drop
detail. If accuracy matters more than brevity, allow more room — or summarize in
layers (one-line → one-paragraph → section-by-section).`,
      questions: [
        {
          prompt:
            "What's the most reliable way to summarize a long report accurately?",
          options: [
            "Ask the AI what it already remembers about reports like this one",
            "Paste the actual report text (or use a tool that reads the file) so it summarizes from the real source",
            "Ask for the shortest possible summary to save time",
            "Tell it to make the summary sound impressive",
          ],
          answer: 1,
          explanation:
            "Summaries are only as faithful as their source. Giving the AI the real text stops it from guessing what such a document 'probably' contains.",
        },
        {
          prompt:
            "You ask for a one-sentence summary of a dense 40-page policy. What's the main risk?",
          options: [
            "The AI will refuse to answer",
            "Forcing extreme brevity drops important detail — key exceptions and caveats get squeezed out",
            "It will take far too long to generate",
            "The summary will be too detailed to read",
          ],
          answer: 1,
          explanation:
            "Brevity and completeness trade off. For complex material, give the summary room — or build it in layers — so the load-bearing caveats survive.",
        },
        {
          prompt:
            "After getting a summary you'll forward to your boss, what's the responsible final step?",
          options: [
            "Send it immediately — AI summaries are always accurate",
            "Spot-check the key facts (prices, dates, obligations) against the source and ask what was left out",
            "Make it longer so it looks more thorough",
            "Run it through a second AI and trust whichever is shorter",
          ],
          answer: 1,
          explanation:
            "Numbers and caveats are exactly where summaries drift. Verify the load-bearing facts against the original, and probe for anything important that was dropped.",
        },
      ],
    },

    // ── 5 ── PROJECT: analyze a table without formulas
    {
      slug: "analyze-data-no-formulas",
      title: "Analyze Data Without Formulas",
      blurb: "Paste a small table, ask for the trends — then verify the numbers.",
      xp: 40,
      kind: "project",
      content: `# Analyze Data Without Formulas

You don't need to know a single spreadsheet formula to get a first read on a
table. Paste it, ask plain-English questions, and let the AI surface trends,
outliers, and "huh, that's odd" moments. The catch: **AI arithmetic can be
confidently wrong**, so this is a "generate hypotheses, then verify" tool — not a
calculator you trust blindly.

**Privacy first:** real business data is often confidential. Use public or
made-up figures, or strip identifying labels (replace "Acme — Q3 churn" with
"Customer A"). Numbers without context are far safer to paste.`,
      steps: [
        {
          instruction:
            "**Get a small table** (about 5–15 rows). Sales by month, survey scores, expenses by category — anything. Paste it as plain text or a simple `Column | Column` layout.",
          hint: "Copy a range straight out of a spreadsheet; pasted cells usually arrive readable.",
        },
        {
          instruction:
            "**Ask for the story, not just the math.** Prompt: `Here's a table. In plain English: what are the top 3 trends, any outliers, and what would you investigate next? Don't speculate beyond the data.`",
          tool: "ChatGPT / Claude / Gemini",
          hint: "Asking 'what would you investigate next' turns a flat readout into something actually useful.",
        },
        {
          instruction:
            "**Verify any number it states.** Pick the two or three figures it leans on — a total, an average, a percentage change — and check them yourself (even on a calculator). AI math drifts more than its prose.",
          hint: "If a claimed total doesn't add up, say so: `Recheck that total, it doesn't match my sum.` It'll often correct itself.",
        },
        {
          instruction:
            "**Pressure-test the conclusion.** Ask: `What's an alternative explanation for this trend?` and `What's missing from this data that I'd need to be sure?` Then write your own one-line takeaway.",
        },
      ],
      checkpoint: {
        prompt:
          "**Write your verified takeaway** (2–4 sentences): the main trend you found, and the specific number or percentage you checked yourself. Show that you *verified*, not just trusted.",
        placeholder:
          "The main trend is … I checked the figure myself: the total/average/change of … confirms it. One thing still missing is …",
        rubric: [
          {
            label: "A real analysis, not a stub (at least 30 words)",
            test: "minWords",
            value: "30",
          },
          {
            label: "References a specific figure (a number, %, or amount)",
            test: "regex",
            value: "\\d|percent|%|average|total|median",
          },
          {
            label: 'Shows you verified or questioned the AI (e.g. "checked", "verified", "doesn\'t add up", "missing")',
            test: "includesAny",
            value: "check, verif, confirm, recalc, doesn't add, mismatch, missing, alternative, investigate",
          },
        ],
      },
    },

    // ── 6 ── PROJECT: slide outline / talk track
    {
      slug: "slide-outline-and-talk-track",
      title: "Outline a Presentation",
      blurb: "Go from a goal to a slide-by-slide outline and a talk track.",
      xp: 35,
      kind: "project",
      content: `# Outline a Presentation

The hardest part of a talk isn't the slides — it's the *structure*: what's the
arc, what goes on each slide, and what you'll actually say. AI is a great
thinking partner here. It won't know your topic better than you, but it will turn
your scattered points into a clean narrative spine you can edit.

You'll build a **slide-by-slide outline** plus a short **talk track** (the words
you'd speak) for a real presentation you need to give.`,
      steps: [
        {
          instruction:
            "**Brief the AI like a speechwriter.** Give it the topic, the audience, how long you have, and the one thing you want people to remember. e.g. `15-min update to non-technical execs; takeaway: the migration is on track but needs one more hire.`",
          tool: "ChatGPT / Claude / Gemini",
          hint: "Audience + time limit + single takeaway is what shapes a good deck. Don't skip them.",
        },
        {
          instruction:
            "**Ask for a slide-by-slide outline.** `Propose a slide-by-slide outline. For each slide: a title, 2–3 bullets, and a one-line note on what I should say. Keep it to the time limit — fewer, clearer slides beat more.`",
          hint: "Push back if it gives you 20 slides for a 10-minute talk: `That's too many — cut to 6 strong slides.`",
        },
        {
          instruction:
            "**Develop the talk track for your key slide.** Pick the most important slide and ask: `Write a 30-second talk track for this slide in my voice — plain, confident, no buzzwords.` Read it aloud; tweak what doesn't sound like you.",
          hint: "Reading it out loud is the test. If you stumble, ask for shorter sentences.",
        },
        {
          instruction:
            "**Fact-check anything you'll claim on stage.** Any statistic, date, or competitor claim the AI suggested must be verified against a real source before it goes in your deck.",
          hint: "A wrong number on a slide in front of execs is the kind of mistake people remember. Check it.",
        },
      ],
      checkpoint: {
        prompt:
          "**Paste your presentation brief** — the prompt from step 1. A good brief names the audience, the time you have, and the single takeaway. The checklist shows what's still missing.",
        placeholder:
          "Audience: … | Length: … minutes | Takeaway: I want them to remember that …",
        rubric: [
          {
            label: "A real brief with enough to work from (at least 20 words)",
            test: "minWords",
            value: "20",
          },
          {
            label: "Names the audience (execs, team, clients, board, customers…)",
            test: "includesAny",
            value: "audience, exec, team, client, board, customer, manager, stakeholder, investor, student",
          },
          {
            label: "States a time limit or a clear takeaway/goal",
            test: "includesAny",
            value: "minute, min, takeaway, goal, remember, key message, objective, hour",
          },
        ],
      },
    },

    // ── 7 ── prompt patterns for work (quiz)
    {
      slug: "prompt-patterns-for-work",
      title: "Prompt Patterns for Work",
      blurb: "Role + task + constraints + examples — and when to start fresh.",
      xp: 30,
      kind: "quiz",
      content: `# Prompt Patterns for Work

By now you've used the same skeleton several times. Let's make it explicit so you
can reach for it on autopilot, plus a few patterns that matter specifically at
work.

### The workhorse pattern: Role · Task · Constraints · Examples
- **Role** — who the AI should be. *"You're a meticulous financial analyst."*
- **Task** — the exact job. *"Review this expense summary for anomalies."*
- **Constraints** — the guardrails. *"Plain English. Don't speculate beyond the
  data. Flag, don't fix."*
- **Examples** — the highest-leverage trick people skip. Show one example of the
  output you want, and the AI matches its shape and tone almost every time.

> "Here's the format I want, using a made-up row:
> *Anomaly: Travel up 340% in March — Likely cause: conference — Confidence: low.*
> Now do that for my real data below."

This is called **giving it a few-shot example**, and it's the difference between
explaining what you want and *showing* it.

### When to start a fresh chat
A chat accumulates context — helpful, until it isn't. **Start a new conversation
when:**
- You're switching to an **unrelated task** (so old context doesn't bleed in and
  confuse the answer).
- The chat has gotten **long and the AI seems to be "forgetting"** earlier
  instructions (the context window is full).
- The AI has gone down a **wrong path** and keeps repeating the mistake — a clean
  slate beats arguing with a derailed thread.

**Keep the same chat when** you're iterating on *one* thing — refining a draft,
narrowing a summary — because the built-up context is exactly what's helping.

### Save what works
When a prompt nails it, **save it.** A personal library of "my email-reply
prompt," "my meeting-minutes prompt," and "my data-readout prompt" is what turns a
one-time trick into a genuine 10x habit.`,
      questions: [
        {
          prompt:
            "Which addition most reliably gets the AI to match the exact output format you want?",
          options: [
            "Typing in all capital letters",
            "Including a short example of the output you want (a few-shot example)",
            "Saying 'please' more times",
            "Making the prompt as short as possible",
          ],
          answer: 1,
          explanation:
            "Showing beats telling. One concrete example of the desired output — its structure and tone — gets matched far more reliably than describing it in words.",
        },
        {
          prompt:
            "You've been refining one email draft for 10 messages and now want help with an unrelated budget question. What's the best move?",
          options: [
            "Ask the budget question in the same chat to save the context",
            "Start a fresh chat so the long email context doesn't bleed into the budget answer",
            "Delete the AI app and reinstall it",
            "Repeat the budget question five times until it switches topics",
          ],
          answer: 1,
          explanation:
            "Unrelated task = fresh chat. Old context that helped the email can confuse a budget answer. Keep one chat only while iterating on a single thing.",
        },
        {
          prompt:
            "When does it make MORE sense to keep using the same conversation?",
          options: [
            "When you're iteratively refining the same draft or summary",
            "When you switch to a completely different project",
            "When the AI keeps repeating the same wrong answer",
            "When the chat is so long the AI is forgetting your early instructions",
          ],
          answer: 0,
          explanation:
            "Iterating on one thing is exactly when accumulated context helps. Switching tasks, a derailed thread, or a full context window are all reasons to start fresh.",
        },
      ],
    },

    // ── 8 ── PROJECT: one-page decision doc
    {
      slug: "one-page-decision-doc",
      title: "Write a One-Page Decision Doc",
      blurb: "Turn rough bullets into a crisp proposal that gets a yes.",
      xp: 45,
      kind: "project",
      content: `# Write a One-Page Decision Doc

When you want a decision — budget, a hire, a direction — a rambling email loses.
A tight **one-page decision doc** wins: it states the decision asked for, the
options, a recommendation, and the trade-offs, so a busy leader can say yes in
two minutes. AI is superb at imposing this structure on your rough thinking.

You'll feed in messy bullet points and walk out with a clean, persuasive
one-pager — fully fact-checked and in your own voice.

**Privacy first:** if the proposal involves confidential numbers or names,
anonymize them while drafting, then add the real figures back into *your* copy
after the AI has done the structuring.`,
      steps: [
        {
          instruction:
            "**Dump your raw thinking.** Write 6–12 messy bullets: the decision you want, why now, rough options, costs, risks, your gut recommendation. Don't organize — just get it out.",
          hint: "Incomplete is fine. The AI's job is to structure it and show you the gaps.",
        },
        {
          instruction:
            "**Ask for the decision-doc structure.** Prompt: `Turn these bullets into a one-page decision doc with these sections: Decision requested, Background, Options (with pros/cons), Recommendation, Risks & mitigations, and Next steps. Flag anything I left unanswered. Keep it to one page.`",
          tool: "ChatGPT / Claude / Gemini",
          hint: "The 'flag anything I left unanswered' line is gold — it surfaces the holes a reviewer would poke.",
        },
        {
          instruction:
            "**Fill the gaps and verify the facts.** Answer every gap the AI flagged. Then verify every number, date, and external claim — a decision doc with a wrong cost figure destroys your credibility.",
          hint: "Don't let the AI invent a cost or a stat to fill a blank. If you don't know it, the doc should say 'TBD — needs confirming,' not a made-up figure.",
        },
        {
          instruction:
            "**Tighten the recommendation in your voice.** Ask: `Rewrite the Recommendation section to be more direct and confident, in plain professional English — make the ask unmistakable.` Edit until it sounds like you, then ship it.",
        },
      ],
      checkpoint: {
        prompt:
          "**Paste your decision doc** (or its core: the decision requested, your recommendation, and the key trade-offs). The checklist confirms it has the bones of a doc that actually gets a decision.",
        placeholder:
          "Decision requested: …\nRecommendation: …\nOptions / trade-offs: …\nRisks: …\nNext steps: …",
        rubric: [
          {
            label: "A genuine one-pager, not a sketch (at least 60 words)",
            test: "minWords",
            value: "60",
          },
          {
            label: "States a clear decision or recommendation",
            test: "includesAny",
            value: "recommend, decision, propose, request, approve, i suggest, we should, ask",
          },
          {
            label: "Weighs trade-offs or risks (options, pros/cons, risks, alternatives…)",
            test: "includesAny",
            value: "risk, trade-off, tradeoff, pros, cons, option, alternative, downside, mitigation",
          },
        ],
      },
    },
  ],
};
