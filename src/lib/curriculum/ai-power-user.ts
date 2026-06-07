import type { Module } from "./types";

// AI Power Moves — the advanced module for the "AI for Everyone" track.
//
// Same shape and ethos as `ai-foundations.ts` (the gold-standard reference):
// `quiz` lessons (reading + a comprehension/decision check) mixed with
// `project` lessons (do real work in a real AI tool + a client-side rubric).
// Still no code editor and no programming — but this one is aimed at daily AI
// users who want expert technique: reusable prompt templates, self-critique
// loops, multi-turn workflows, model selection, no-code automation, and
// fact-checking systems. Not free — this is paid, deeper-end content.
export const aiPowerUser: Module = {
  slug: "ai-power-user",
  title: "AI Power Moves",
  description:
    "Expert-level technique for people who already use AI every day: reusable prompt templates, self-critiquing AI, multi-turn workflows, picking the right model per task, no-code automation, and a fact-checking system that catches hallucinations.",
  emoji: "⚡",
  gradient: "from-violet-500/20 to-purple-500/10",
  tagline:
    "Advanced AI prompting and workflows for power users — prompt templates, chain-of-thought, AI self-critique, model selection, no-code automation, and hallucination-proof fact-checking.",
  keywords: [
    "advanced ai prompting",
    "prompt engineering techniques",
    "chain of thought prompting",
    "ai workflow automation no code",
    "how to choose an ai model",
    "ai fact checking workflow",
    "reusable prompt templates",
  ],
  lessons: [
    // ── 1 ── concept (quiz): the repeatable prompt formula
    {
      slug: "think-in-patterns",
      title: "Think in Patterns, Not Prompts",
      blurb: "Turn lucky one-off prompts into a formula you can repeat.",
      xp: 30,
      kind: "quiz",
      content: `# Think in Patterns, Not Prompts

You already know that detail beats keywords. The power-user shift is this: **stop
writing prompts and start writing _patterns_ you can reuse.** A great answer you
got once by accident is worth almost nothing if you can't reproduce it on demand.

Here's the formula nearly every strong prompt follows:

> **Role + Task + Context + Format + Examples**

You met the first four in Foundations. The fifth — **examples** — is the upgrade
that separates daily users from experts.

### Why examples are the cheat code
Showing the model *one or two examples of exactly the output you want* steers it
far more reliably than describing that output in words. This is often called
**few-shot prompting**: a "shot" is an example.

> ✅ "Rewrite each task into the format \`<verb> <object> — <why it matters>\`.
> Example: 'email Sara' → 'Email Sara to confirm the venue — unblocks catering.'
> Now do these: …"

One example pinned the *shape*, the *tone*, and the *length* all at once — no
paragraph of instructions needed.

### Chain-of-thought, in plain terms
For anything with reasoning, math, or multiple steps, add a simple instruction:

> **"Think it through step by step before giving your final answer."**

Because the model writes one piece at a time and each piece becomes context for
the next, *making it reason out loud* genuinely improves the answer. It's not
magic — you're giving it room to work before it commits.

The mindset: every time a prompt works well, **save the pattern**, not just the
result. That's exactly what you'll build in the next lesson.`,
      questions: [
        {
          prompt:
            'A colleague says "few-shot prompting." What does that mean in plain terms?',
          options: [
            "Sending the AI several prompts in quick succession",
            "Including one or two examples of the exact output you want, so the model copies the pattern",
            "Limiting the AI to a few words of output",
            "Using the cheapest, fastest model to save money",
          ],
          answer: 1,
          explanation:
            "A 'shot' is an example. Showing the model the shape of a good answer steers it far more reliably than describing that shape in words.",
        },
        {
          prompt:
            'Why does "think it through step by step" actually improve answers on reasoning tasks?',
          options: [
            "It makes the AI slow down so it pays more attention",
            "It unlocks a hidden expert mode in the model",
            "Each step the model writes becomes context for the next, so reasoning out loud gives it room to work before committing to an answer",
            "It forces the AI to search the web for the right answer",
          ],
          answer: 2,
          explanation:
            "The model generates one piece at a time, conditioned on everything so far. Reasoning out loud builds up useful context before the final answer, reducing snap mistakes.",
        },
        {
          prompt:
            "What's the core mindset shift this lesson is pushing?",
          options: [
            "Always use the most powerful model available",
            "When a prompt works well, save the reusable *pattern*, not just the one-off result",
            "Write the longest prompt you possibly can",
            "Never reuse a prompt — write each one fresh",
          ],
          answer: 1,
          explanation:
            "Power users build a library of repeatable patterns (role + task + context + format + examples) so good output is reproducible on demand, not accidental.",
        },
      ],
    },

    // ── 2 ── PROJECT: build a reusable prompt template library
    {
      slug: "build-a-prompt-library",
      title: "Build Your Prompt Template Library",
      blurb: "Turn your three most-repeated AI tasks into fill-in-the-blank templates.",
      xp: 50,
      kind: "project",
      content: `# Build Your Prompt Template Library

Power users don't re-type prompts from scratch. They keep a small **library of
templates** — reusable prompts with \`[BLANKS]\` you fill in — for the tasks they
do over and over. In this project you'll build your first three.

A template is just a strong prompt where the situation-specific parts are marked
as variables:

> **Role:** You are a senior editor.
> **Task:** Tighten the draft below without changing its meaning or voice.
> **Context:** Audience is \`[WHO]\`. It must keep \`[KEY POINT]\`.
> **Format:** Return the edited version, then a 1-line note on what you cut.
> **Draft:** \`[PASTE DRAFT]\`

Once it's written, every future edit is a 10-second paste instead of a blank page.`,
      steps: [
        {
          instruction:
            "**List your top 3 recurring AI tasks.** Be honest about what you actually reach for the AI to do — e.g. *reply to customer emails*, *summarize long docs*, *turn rough notes into a plan*.",
          hint: "Look at your AI chat history. The tasks you've done 3+ times are your templates.",
        },
        {
          instruction:
            "**Write template #1** using the full formula — Role, Task, Context, Format, and at least one `[BLANK]` for the part that changes each time. Add a one-line example of good output so the model locks onto the shape.",
          tool: "ChatGPT / Claude / Gemini",
          hint: "Mark variables clearly, like `[PASTE EMAIL HERE]` or `[CUSTOMER NAME]`, so future-you knows what to swap in.",
        },
        {
          instruction:
            "**Test it for real.** Fill in the blanks with a genuine example, run it, and tweak the template until the *first* output is good enough to use with only light edits.",
          hint: "If you keep fixing the same thing by hand, bake that fix into the template wording.",
        },
        {
          instruction:
            "**Save all three** somewhere you'll actually find them — a pinned note, a doc, or your tool's saved-prompts / custom-instructions feature. Give each a short name.",
          hint: "ChatGPT 'Custom Instructions', Claude 'Projects', or a simple Notes file all work. The point is one-click reuse.",
        },
      ],
      checkpoint: {
        prompt:
          "**Paste your best template here** — the full Role / Task / Context / Format prompt with at least one `[BLANK]`. The checklist updates live as it hits each mark.",
        placeholder:
          "Role: You are a … \nTask: … \nContext: audience is [WHO] … \nFormat: … \nExample: …",
        rubric: [
          {
            label: "A real, fleshed-out template (at least 40 words)",
            test: "minWords",
            value: "40",
          },
          {
            label: "Contains at least one reusable [BLANK] variable in brackets",
            test: "regex",
            value: "\\[[^\\]]+\\]",
          },
          {
            label: "Covers the formula — gives a role/task plus a format or example",
            test: "includesAny",
            value: "role, task, context, format, example, you are, act as, return, output",
          },
        ],
      },
    },

    // ── 3 ── concept (quiz): make the AI grade itself
    {
      slug: "make-the-ai-grade-itself",
      title: "Make the AI Grade Itself",
      blurb: "Hand the model a rubric and let it critique its own draft before you do.",
      xp: 35,
      kind: "quiz",
      content: `# Make the AI Grade Itself

Most people accept the AI's first answer or fix it by hand. Power users do
something smarter: **they make the AI critique its own work against a rubric, then
revise.** The model is often a better editor of its draft than it was an author of
it — if you give it a standard to measure against.

### The self-critique loop
1. **Get a first draft.** Normal prompt, normal output.
2. **Give it a rubric and ask it to score itself.**

> "Here's a rubric: (1) Is it under 150 words? (2) Does it open with the benefit,
> not the feature? (3) Is the tone warm but professional? (4) Is there a clear
> call to action? Score your draft 1–5 on each, quote the weakest line, and
> explain what's wrong."

3. **Ask it to revise** based on its own critique: *"Now rewrite it to fix every
   issue you found and re-score."*

### Why this works so well
You're forcing the model to **separate generating from judging**. A fresh,
critical pass — with explicit criteria — catches vagueness, missing structure,
and weak openings that a single-shot answer glides right past.

### Pro variations
- **Adversarial review:** *"Be a harsh skeptic. What's the strongest objection to
  this draft?"*
- **Persona panel:** *"Critique this as (a) a busy executive, (b) a lawyer, (c) a
  first-time customer. Where do they disagree?"*
- **Numeric bar:** *"Don't show me the result until it scores at least 4/5 on
  every rubric item."*

The rubric is the secret. A vague *"make it better"* gets you vague improvements.
A specific standard gets you a specific, measurable upgrade.`,
      questions: [
        {
          prompt:
            "What's the key reason asking an AI to critique its own draft against a rubric improves the result?",
          options: [
            "It tricks the model into using a more powerful version of itself",
            "It separates generating from judging and gives the model explicit criteria to measure against",
            "It makes the response longer, which is always better",
            "It forces the AI to browse the web for better wording",
          ],
          answer: 1,
          explanation:
            "A dedicated critical pass with explicit criteria catches weaknesses a single-shot answer glides past. The model is often a better editor than author.",
        },
        {
          prompt:
            'Which instruction will get the most useful self-critique?',
          options: [
            '"Make this better."',
            '"Is this good?"',
            '"Score this 1–5 against these criteria — under 150 words, opens with the benefit, has a clear call to action — quote the weakest line, then revise to fix every issue."',
            '"Try again."',
          ],
          answer: 2,
          explanation:
            "A specific rubric plus a request to quote the weakest part and revise produces a measurable, targeted upgrade. Vague asks get vague improvements.",
        },
      ],
    },

    // ── 4 ── PROJECT: chain steps into a workflow
    {
      slug: "chain-a-workflow",
      title: "Chain a Multi-Turn Workflow",
      blurb: "Outline → draft → critique → polish across separate turns, not one mega-prompt.",
      xp: 50,
      kind: "project",
      content: `# Chain a Multi-Turn Workflow

Beginners cram everything into one giant prompt and hope. Power users **break a
real deliverable into a chain of turns**, where each step's output feeds the next:

> **Outline → Draft → Critique → Polish**

Each turn does one job well. You inspect (and can correct) the output between
steps, so errors don't compound. The model also stays focused — one clear task per
turn beats one overloaded task every time.

In this project you'll produce something real — a cover letter, a blog post, a
project plan, a tricky message — using a four-turn chain in a single conversation.`,
      steps: [
        {
          instruction:
            "**Turn 1 — Outline.** Ask only for a structured outline of your deliverable. Don't let it write the full thing yet. Read it and fix the structure before moving on.",
          tool: "ChatGPT / Claude / Gemini",
          hint: "Try: 'Give me a bullet outline only — sections and one line each. No prose yet.'",
        },
        {
          instruction:
            "**Turn 2 — Draft.** In the same chat, say `Now write the full draft from that outline.` It already has the structure as context, so the draft stays on track.",
          hint: "Staying in one conversation means each turn remembers the last — that's the whole point of chaining.",
        },
        {
          instruction:
            "**Turn 3 — Critique.** Hand it a rubric and make it score and critique its own draft (the move from the last lesson). Ask it to quote its weakest passage.",
          hint: "Reuse a rubric: clarity, length, tone, a strong opening, a clear ask.",
        },
        {
          instruction:
            "**Turn 4 — Polish.** Say `Rewrite to fix every issue you raised, and tighten by 15%.` Compare the final version to the Turn 2 draft — the lift from chaining should be obvious.",
          hint: "Skim Turn 2 vs Turn 4 side by side. Feeling that gap is the lesson.",
        },
      ],
      checkpoint: {
        prompt:
          "**Describe the workflow you built.** What was the deliverable, and what did each of the four turns do? Then say what improved between your first draft and your final polished version.",
        placeholder:
          "I built a [deliverable]. Turn 1 outlined …, Turn 2 drafted …, Turn 3 critiqued …, Turn 4 polished … Between the draft and the final version, …",
        rubric: [
          {
            label: "A genuine write-up of your chain (at least 45 words)",
            test: "minWords",
            value: "45",
          },
          {
            label: "References the staged workflow (outline, draft, critique, or polish)",
            test: "includesAny",
            value: "outline, draft, critique, critiqued, polish, revise, score, turn",
          },
          {
            label: "Reflects on what changed between draft and final",
            test: "includesAny",
            value: "improved, better, tighter, clearer, stronger, fixed, difference, sharper",
          },
        ],
      },
    },

    // ── 5 ── concept (quiz): right model, right job
    {
      slug: "right-model-right-job",
      title: "Right Model, Right Job",
      blurb: "Reasoning vs fast, browsing vs not, long-context, image tools — choose on purpose.",
      xp: 35,
      kind: "quiz",
      content: `# Right Model, Right Job

Every major AI app now offers *several* models, and most people just use whatever
the default is. Power users pick deliberately, because the right choice can be the
difference between a 3-second answer and a 3-minute one — or between a confident
guess and a sourced fact.

Here's the practical map.

### Reasoning models vs fast models
- **Fast / standard models** — instant, cheap, great for everyday writing,
  summarizing, rewriting, brainstorming. Use these 80% of the time.
- **Reasoning models** ("thinking" modes, often labeled with terms like *reasoning*,
  *think*, or a brain/clock icon) — slower and pricier, but they work through hard
  problems step by step before answering. Reach for these on **multi-step logic,
  tricky math, planning, debugging, and analysis**.

> Rule of thumb: **if a smart human would need to stop and think, switch to the
> reasoning model.** If they'd answer instantly, the fast model is fine.

### Web browsing vs not
- A model with **web search / browsing** can pull in *current* information and
  cite live sources. Use it for news, prices, recent releases, "what's the latest…".
- A model **without** browsing answers only from training data with a cutoff date.
  Faster, but blind to anything recent — and more prone to making up specifics.

### Long context
Some models accept **huge inputs** — entire books, long transcripts, many
documents at once. When you need the AI to reason across a *lot* of material
without losing the early parts, pick the long-context option.

### Beyond text
- **Image generation** for visuals; **vision** (image *understanding*) to analyze
  a screenshot, chart, or photo you upload; **voice** for hands-free.
- Matching the *modality* to the task is as important as matching the model size.

The skill isn't memorizing model names — those change monthly. It's asking, every
time: **does this task need speed, deep reasoning, fresh facts, lots of context, or
a different sense entirely?**`,
      questions: [
        {
          prompt:
            "You need to plan a complex, multi-step project budget with dependencies and trade-offs. Which model type fits best?",
          options: [
            "The fastest, cheapest model — speed is everything",
            "A reasoning / 'thinking' model that works through the problem step by step",
            "Any model — the choice never matters",
            "An image-generation model",
          ],
          answer: 1,
          explanation:
            "Multi-step logic, planning, and trade-offs are exactly what reasoning models are for. If a smart human would need to stop and think, switch to the reasoning model.",
        },
        {
          prompt:
            'You ask, "What were the headline results from yesterday\'s product launch?" What does the task most require?',
          options: [
            "A long-context model",
            "An image generator",
            "A model with live web browsing / search, since this is recent information",
            "A reasoning model — it's a logic puzzle",
          ],
          answer: 2,
          explanation:
            "Recent, real-world facts demand web access. A model answering only from training data has a cutoff and may fabricate specifics about events it never saw.",
        },
        {
          prompt:
            "What's the real, durable skill in choosing a model?",
          options: [
            "Memorizing the current model names and version numbers",
            "Always picking the largest, most expensive model",
            "Asking what the task needs — speed, deep reasoning, fresh facts, lots of context, or a different modality — and matching to that",
            "Sticking to one model forever for consistency",
          ],
          answer: 2,
          explanation:
            "Model names change monthly; the durable skill is diagnosing the task's needs (speed vs reasoning vs browsing vs context vs modality) and choosing on purpose.",
        },
      ],
    },

    // ── 6 ── PROJECT: set up a no-code AI automation
    {
      slug: "no-code-ai-automation",
      title: "Set Up a No-Code AI Automation",
      blurb: "Wire AI into a trigger with Zapier or Make — no programming, real leverage.",
      xp: 55,
      kind: "project",
      content: `# Set Up a No-Code AI Automation

The biggest power-user jump is going from *chatting with AI* to *AI running on its
own*. No-code automation tools let you connect a **trigger** ("when X happens") to
an **AI step** ("ask the AI to do Y") to an **action** ("then put the result in
Z") — all by clicking, no programming.

> **Trigger → AI step → Action**
>
> *Example:* When a new email lands in a label → send its text to the AI to
> draft a reply and tag the urgency → save the draft and notify you in Slack.

Common tools: **Zapier**, **Make** (formerly Integromat), and **n8n**. Most have a
free tier big enough to build and test one real automation.

You don't need anything fancy. The goal is to *feel* the shift from doing the task
to designing the system that does it.`,
      steps: [
        {
          instruction:
            "**Pick one repetitive, rules-based task** you do that involves text. Good candidates: summarizing form responses, drafting replies, categorizing incoming messages, turning saved articles into notes.",
          hint: "The best first automation is small, frequent, and low-stakes — something annoying you do weekly.",
        },
        {
          instruction:
            "**Open a no-code tool** ([zapier.com](https://zapier.com) or [make.com](https://make.com)), create a free account, and start a new automation (Zapier calls it a *Zap*, Make calls it a *Scenario*).",
          tool: "Zapier / Make",
          hint: "Both have huge template galleries — search 'AI' and start from one to skip the blank-canvas stage.",
        },
        {
          instruction:
            "**Wire up the three pieces:** choose your *trigger* (the 'when'), add an *AI / ChatGPT* step in the middle with a clear prompt (reuse a template from lesson 2!), and pick the *action* that does something with the AI's output.",
          hint: "The AI step is just a prompt box. Feed it the trigger's data with the tool's variable picker, e.g. 'Summarize this: {{email body}}'.",
        },
        {
          instruction:
            "**Test it with one real example, then turn it on.** Run a single test, check the AI output is sane, fix the prompt if needed, and only then enable it to run automatically.",
          hint: "Always test on one real item before going live. A bad prompt running unattended makes mistakes at scale.",
        },
      ],
      checkpoint: {
        prompt:
          "**Describe the automation flow you built** in plain English: the trigger, the AI step (what you asked it to do), and the final action. What manual work does it now save you?",
        placeholder:
          "When [trigger] happens, the AI [does what], and then [action]. This saves me from …",
        rubric: [
          {
            label: "A real, specific flow described (at least 35 words)",
            test: "minWords",
            value: "35",
          },
          {
            label: "Describes the trigger → AI → action structure",
            test: "includesAny",
            value: "trigger, when, then, ai step, action, automatically, zap, scenario, workflow",
          },
          {
            label: "Names a no-code tool you used",
            test: "includesAny",
            value: "zapier, make, integromat, n8n, automation",
          },
        ],
      },
    },

    // ── 7 ── concept (quiz): a fact-checking workflow
    {
      slug: "fact-checking-workflow",
      title: "Catch the Hallucination",
      blurb: "A repeatable system power users run to verify AI claims before trusting them.",
      xp: 35,
      kind: "quiz",
      content: `# Catch the Hallucination

You already know AI makes things up. Power users don't just *worry* about it — they
run a **repeatable verification workflow** on anything that matters. Confidence in
the AI's tone means nothing; a fabrication sounds exactly as sure as a fact.

### The power-user fact-check
1. **Ask for sources up front.** *"After each claim, cite a specific, real source
   I can check — name, publication, and date."* A model that can't name a real
   source is often guessing.
2. **Actually open the sources.** Hallucinated citations are common: the link is
   dead, or real but doesn't say what was claimed. *The check is verifying the
   source, not just requesting one.*
3. **Cross-check the specifics.** Numbers, dates, names, and quotes get a second
   set of eyes — a search engine, the original document, or a *second* AI with
   web access. Agreement across independent sources raises your confidence.
4. **Run the killer question:** **"What would have to be true for this to be
   wrong? What's the strongest case against it?"** Forcing the model to argue the
   other side surfaces shaky assumptions and overstated certainty.

### Red flags that scream "verify me"
- Oddly *specific* figures with no source (*"sales rose 23.4% in Q3"*).
- Citations that are suspiciously perfect or that you can't find.
- Confident answers about **recent events** from a model with no web access.
- Anything in a **high-stakes** domain — legal, medical, financial, safety.

The mindset isn't paranoia — it's leverage. **Use AI to draft and explore at full
speed; gate anything you'll act on or publish behind a 60-second verification
pass.** That single habit is what separates people who get burned from people who
get enormous value.`,
      questions: [
        {
          prompt:
            "Asking the AI for sources is good — but why isn't requesting them *enough*?",
          options: [
            "Sources slow the answer down too much",
            "AI can hallucinate citations too — a link may be dead or real-but-irrelevant, so you must actually open and verify them",
            "Sources are always made up, so they're useless",
            "Only paid models can provide sources",
          ],
          answer: 1,
          explanation:
            "Fabricated citations are common. The real check is opening the source and confirming it exists and actually says what was claimed — not just that a citation appeared.",
        },
        {
          prompt:
            'What does the "What would have to be true for this to be wrong?" question accomplish?',
          options: [
            "It makes the AI apologize",
            "It forces the model to argue the opposing case, surfacing shaky assumptions and overstated certainty",
            "It deletes the original answer",
            "It guarantees the answer is correct",
          ],
          answer: 1,
          explanation:
            "Making the model build the strongest case against its own claim exposes weak assumptions and false confidence that a one-sided answer hides.",
        },
        {
          prompt:
            "Which AI output most urgently needs a verification pass before you act on it?",
          options: [
            "A reworded version of an email you wrote",
            "A brainstorm of fun team-outing ideas",
            "A specific legal precedent with a case number, cited to support a real decision",
            "A casual analogy explaining how Wi-Fi works",
          ],
          answer: 2,
          explanation:
            "High-stakes, specific, checkable claims — especially legal/medical/financial citations — are exactly where hallucinations are both most likely and most costly. Rewrites and brainstorms are low-risk.",
        },
      ],
    },

    // ── 8 ── PROJECT: design your personal AI operating system
    {
      slug: "personal-ai-operating-system",
      title: "Design Your Personal AI Operating System",
      blurb: "Combine your tools, templates, and a weekly routine into one written system.",
      xp: 55,
      kind: "project",
      content: `# Design Your Personal AI Operating System

You've built templates, learned to chain workflows, picked models on purpose,
automated a task, and set up a fact-check. The final power move is to **stop
treating these as separate tricks and write them into one personal system** — your
AI operating system.

A system beats willpower. When your tools, go-to prompts, and routines are written
down, you stop reinventing the wheel every Monday and start compounding.

Your AI OS has four parts:

> 1. **Tools** — which AI(s) you keep open, and what each is your go-to for.
> 2. **Templates** — your reusable prompts, somewhere one click away.
> 3. **Automations** — the things AI now does without you.
> 4. **Routine** — a weekly rhythm (review, prune, add one new thing).

This is the capstone: you'll write yours down so it's real.`,
      steps: [
        {
          instruction:
            "**Map your tools.** List the 2–3 AI tools you'll actually keep open and, for each, one sentence on what you reach for it for (e.g. fast model for email, reasoning model for analysis, a browsing tool for research).",
          hint: "Don't list every tool that exists — list the few you'll truly use, and their job.",
        },
        {
          instruction:
            "**Collect your templates and automations** into one home — a single doc, note, or your tool's saved-prompts area. Add the three templates from lesson 2 and the automation from lesson 6.",
          tool: "Notes / Docs",
          hint: "One findable location is the whole game. If you can't find a template in 5 seconds, you won't use it.",
        },
        {
          instruction:
            "**Define a weekly routine.** Write a tiny recurring ritual: e.g. *every Friday, review what I used AI for, prune one template that isn't working, and add one new prompt or automation.*",
          hint: "Keep it to 10 minutes. The point is steady improvement, not a big overhaul.",
        },
        {
          instruction:
            "**Write the whole thing down as one short document** titled 'My AI Operating System' with the four sections. Put it somewhere you'll see it. This is your system — revise it as you grow.",
          hint: "A half-page is plenty. A written system you actually follow beats a perfect one in your head.",
        },
      ],
      checkpoint: {
        prompt:
          "**Paste your AI Operating System here.** Include all four parts: your **tools** (and what each is for), your **templates'** home, your **automation(s)**, and your **weekly routine**. This is your capstone — make it genuinely yours.",
        placeholder:
          "TOOLS: I keep … open for … and … for …\nTEMPLATES: stored in …\nAUTOMATIONS: …\nWEEKLY ROUTINE: every Friday I …",
        rubric: [
          {
            label: "A complete, written system (at least 60 words)",
            test: "minWords",
            value: "60",
          },
          {
            label: "Covers tools and templates",
            test: "includesAny",
            value: "tool, template, prompt, chatgpt, claude, gemini, model",
          },
          {
            label: "Includes a recurring routine or rhythm",
            test: "regex",
            value: "weekly|every (week|friday|monday|day)|routine|each week|review|ritual",
          },
        ],
      },
    },
  ],
};
