import type { Module } from "./types";

// AI for Writers & Content Creators — practical, no-fluff guidance for anyone
// who uses words professionally: bloggers, journalists, copywriters, novelists,
// social-media managers, and marketers. All quiz lessons covering prompting for
// prose, editing workflows, fighting writer's block, SEO, ethics, and more.
export const aiForWriters: Module = {
  slug: "ai-for-writers",
  title: "AI for Writers & Content Creators",
  description:
    "Master AI as a writing partner — not a replacement. Learn to prompt for first drafts, sharpen your editing workflow, defeat writer's block, write SEO-smart content, navigate ethics and disclosure, and build a sustainable human-AI creative process that keeps your voice front and center.",
  emoji: "🖊️",
  gradient: "from-purple-500/20 to-pink-500/10",
  tagline:
    "Use AI to write faster, edit smarter, and create more — without losing your voice or your integrity.",
  keywords: [
    "AI for writers",
    "AI writing tools",
    "AI content creation",
    "how to use AI for writing",
    "AI copywriting",
    "AI blogging",
    "ChatGPT for writers",
    "Claude for writers",
    "AI content marketing",
    "AI editing",
  ],
  lessons: [
    {
      slug: "ai-as-writing-partner",
      title: "AI as Writing Partner, Not Ghost-Writer",
      blurb: "Understand what AI can and can't do for your writing — and why your voice still wins.",
      xp: 20,
      kind: "quiz",
      content: `# AI as Writing Partner, Not Ghost-Writer

The most important reframe: AI is not a ghost-writer you hand over your byline to.
It is a **writing partner** — fast, tireless, and always available — that you direct.

Here is what that means in practice:

**AI is excellent at:**
- Generating rough material so you are never staring at a blank page
- Trying multiple tones, angles, or structures on demand ("give me three
  different hooks for this piece")
- Mechanical tasks: expanding bullets into paragraphs, compressing long passages,
  checking sentence-level clarity
- Suggesting synonyms, transitions, and structural alternatives in seconds

**AI consistently struggles with:**
- Genuine novelty and original insight — it recombines what already exists
- Specific lived experience, reporting, and primary research (it has none)
- Maintaining a distinctive personal voice without careful coaching
- Long-form consistency: the longer the document, the more drift appears
- Up-to-the-minute facts (its training has a cutoff; as of 2026, most models
  are still months to a year behind real time)

The most productive writers in 2026 treat AI output as a **first draft to
react to**, not a finished product. Your job shifts from generating words to
curating, elevating, and injecting what only you know. That is still writing —
and it is the harder, more valuable part.`,
      questions: [
        {
          prompt: "What is the most accurate way to think about AI in a writer's workflow?",
          options: [
            "A ghost-writer who does all the work while you put your name on it",
            "A fast writing partner you direct — great for drafts and mechanics, but your judgment and voice complete the work",
            "A fact database that replaces research",
          ],
          answer: 1,
          explanation:
            "AI accelerates generation; you supply insight, experience, and the editorial judgment that turns raw material into something worth reading.",
        },
        {
          prompt: "Which task is AI genuinely weak at, even with good prompting?",
          options: [
            "Rewriting a paragraph in a more casual tone",
            "Generating three different opening hooks for the same article",
            "Providing up-to-the-minute news facts and original reporting",
          ],
          answer: 2,
          explanation:
            "AI has no live internet access by default and no firsthand experience. For current events or primary research, you still need real sources and legwork.",
        },
        {
          prompt: "After AI generates a first draft, your most valuable contribution is…",
          options: [
            "Posting it immediately to save time",
            "Curating, elevating, and adding what only you know — lived experience, insight, and voice",
            "Asking AI to rewrite it a second time without reading it yourself",
          ],
          answer: 1,
          explanation:
            "The irreplaceable human layer is specificity, originality, and authority. AI gives you material to react to; you make it real.",
        },
      ],
      explanation:
        "Think director, not dictation machine. You set the brief, react to the draft, and bring what AI cannot: actual experience and genuine point of view.",
    },
    {
      slug: "prompting-for-prose",
      title: "Prompting for Great Prose",
      blurb: "The specific prompting moves that produce usable writing — not generic filler.",
      xp: 25,
      kind: "quiz",
      content: `# Prompting for Great Prose

Generic prompts produce generic writing. Great writing prompts front-load four
things the model needs: **audience, purpose, tone, and constraints**.

## The four-part prompt formula

1. **Audience** — who is reading this, and what do they already know?
   "Written for small-business owners with no technical background."

2. **Purpose** — what should the reader *do or believe* after reading?
   "Convince them that email marketing still outperforms social media in 2026."

3. **Tone** — how should it sound?
   "Conversational, a little skeptical of hype, no corporate jargon."

4. **Constraints** — length, format, things to include or avoid.
   "Under 600 words, use one concrete example with real numbers, no bullet lists."

## Useful prompting moves for writers

- **Show a sample of your own writing** and ask it to match your style.
  "Here is a paragraph I wrote. Match this voice for the new piece: [paste]"

- **Give it a "from / to" brief.** "Rewrite this from dry and technical to punchy
  and direct. Keep every fact."

- **Ask for alternatives, not just one answer.** "Give me five different subject
  lines. Vary the angle each time."

- **Use it to pressure-test your ideas.** "Play devil's advocate against this
  argument: [your thesis]. What is the strongest objection?"

- **Ask for the structure first, content later.** "Outline a 1,500-word piece
  on [topic] for [audience]. Don't write the full text yet."

A well-crafted prompt takes 90 seconds. That investment cuts revision time by
more than it costs.`,
      questions: [
        {
          prompt: "Which prompt will produce the most usable first draft?",
          options: [
            "'Write a blog post about email marketing.'",
            "'Write a 600-word blog post for small-business owners with no tech background. Convince them email outperforms social media. Conversational tone, one concrete example with numbers, no bullet lists.'",
            "'Email marketing blog post please'",
          ],
          answer: 1,
          explanation:
            "Audience, purpose, tone, and constraints up front mean the model targets the right reader with the right content — reducing rewrites dramatically.",
        },
        {
          prompt: "You want AI output to sound like you, not like a generic AI. The best move is:",
          options: [
            "Just say 'write in my style' without examples",
            "Paste a paragraph of your own writing and ask the model to match that voice",
            "Use the longest, most detailed prompt possible",
          ],
          answer: 1,
          explanation:
            "Style is shown, not told. A concrete sample of your prose gives the model a target to calibrate against — abstract instructions like 'casual' or 'smart' are far less effective.",
        },
        {
          prompt: "What is the advantage of asking for an outline before asking for the full piece?",
          options: [
            "There is no advantage — full drafts are always better",
            "It lets you catch structural problems early, before words are generated, saving major revision time",
            "Outlines use fewer tokens so they are cheaper",
          ],
          answer: 1,
          explanation:
            "Structure problems are the most expensive to fix in a finished draft. Reviewing a short outline first keeps you in control of the architecture before the word count builds up.",
        },
      ],
      explanation:
        "Great prose prompts give the model audience, purpose, tone, and constraints — plus concrete examples of your own voice when style matters.",
    },
    {
      slug: "ai-editing-workflow",
      title: "AI as Your Editing Partner",
      blurb: "Use AI to cut, clarify, and strengthen — while keeping your edits reversible.",
      xp: 20,
      kind: "quiz",
      content: `# AI as Your Editing Partner

Editing is where AI earns its keep for writers. Unlike drafting — where AI
often produces generic content without strong direction — editing tasks are
well-bounded: the source material exists, and the goal is defined.

## High-value editing tasks for AI

- **Cut for clarity.** "Trim this to 300 words. Keep every specific fact and
  every concrete example. Remove throat-clearing and hedging."
- **Vary sentence rhythm.** "Rewrite this paragraph so the sentences aren't
  all the same length. Keep the meaning."
- **Shift reading level.** "Rewrite for a 10th-grade reader without dumbing
  down the argument."
- **Find weak spots.** "Read this draft and tell me: where is the logic
  weakest? Where does the writing lose energy?"
- **Headline and subject-line testing.** "Rate these five headlines 1–10 on
  clarity and curiosity. Explain each score."

## The revision workflow that protects your voice

1. **Always paste into a fresh chat** when switching from draft to edit mode —
   so earlier context doesn't contaminate the task.
2. **One task per prompt.** Don't say "fix everything." Say "just fix the
   transitions in section 2."
3. **Keep the original.** Never let AI overwrite your only copy. Version
   control — even just a dated file — lets you cherry-pick what you want and
   discard the rest.
4. **Read aloud after every AI edit.** Your ear catches drift from your voice
   faster than your eye does.

The goal is to use AI edits as *candidates*, not commands. You are the
editor-in-chief; AI is a very fast first reader.`,
      questions: [
        {
          prompt: "Which editing instruction will give AI the most useful result?",
          options: [
            "'Fix everything that's wrong with this.'",
            "'Trim to 300 words. Keep every specific fact and concrete example. Cut throat-clearing and hedging.'",
            "'Make it better.'",
          ],
          answer: 1,
          explanation:
            "Narrow, explicit editing tasks produce targeted results. 'Fix everything' is a vague instruction that leads to rewritten drafts that often discard what was working.",
        },
        {
          prompt: "After AI rewrites a section, how do you best protect your original voice?",
          options: [
            "Accept the edit immediately — AI knows best",
            "Read the edited version aloud and compare it to the original; keep your copy intact so you can cherry-pick",
            "Delete the original once AI has improved it",
          ],
          answer: 1,
          explanation:
            "Your ear detects voice drift before your eye does. Keeping the original and reading aloud lets you take only the improvements that actually sound like you.",
        },
        {
          prompt: "Why should you use 'one task per prompt' when editing with AI?",
          options: [
            "Because AI can only understand one word at a time",
            "Because focused tasks produce tighter, more controllable edits — 'fix everything' leads to rewrites that may discard what was working",
            "Because multiple tasks cost more money",
          ],
          answer: 1,
          explanation:
            "Compound editing prompts give the model license to change anything, which often means losing the parts that were already strong. Narrow scope, better output.",
        },
      ],
      explanation:
        "Use AI for one specific editing task at a time, keep your original, and read edits aloud. You stay the editor-in-chief.",
    },
    {
      slug: "defeating-writers-block",
      title: "Defeating Writer's Block with AI",
      blurb: "Practical techniques to get unstuck — from blank-page terror to mid-draft stalls.",
      xp: 20,
      kind: "quiz",
      content: `# Defeating Writer's Block with AI

Writer's block is usually one of three problems: **no material yet** (blank
page), **too much material** (can't find the through-line), or **stalled mid-
draft** (the next sentence won't come). AI has a different fix for each.

## Blank page: use AI to generate raw material fast

You don't need a good prompt to start. Use these:

- "List 20 possible angles on [topic]. Don't filter — include weird ones."
- "What questions does a curious reader have about [topic] that most articles
  fail to answer?"
- "I want to write about [topic]. Give me five surprising or counterintuitive
  facts that most people don't know."

None of this is your draft. It is kindling. One idea on that list sparks the
real piece — and you write that.

## Too much material: use AI to find the frame

- "Here are my notes. [paste] What is the single strongest through-line or
  argument hiding in here?"
- "I have these five points. Which two actually belong together and which one
  is the real core?"

## Mid-draft stall: use AI to loosen the jam

- "I'm stuck after this paragraph: [paste last paragraph]. Write three
  possible next sentences — different directions."
- "Summarize what I have written so far in one sentence. Then tell me what
  the reader is probably expecting next."

**The rule with all of these:** your job is to react, not accept. The AI's
suggestion is a pressure valve, not the answer. Often just reading its bad
suggestion tells you exactly what you actually want to say.`,
      questions: [
        {
          prompt: "You are staring at a blank page with no idea where to start. The most productive AI move is:",
          options: [
            "Ask AI to write the entire article for you",
            "Ask for 15–20 possible angles, including weird ones, then react to the list to find your spark",
            "Wait until you have a perfect prompt before asking anything",
          ],
          answer: 1,
          explanation:
            "Generating options quickly breaks the paralysis of the blank page. You are not looking for the AI's answer — you are using the list as kindling to find your own angle.",
        },
        {
          prompt: "You have a pile of notes and research but can't find the structure. The best AI prompt is:",
          options: [
            "'Write the article from my notes.'",
            "'Here are my notes. What is the single strongest through-line or argument hiding in here?'",
            "'What should I write about today?'",
          ],
          answer: 1,
          explanation:
            "When you have too much material, the blocking problem is framing, not words. Asking AI to identify the through-line is a diagnostic task — it surfaces structure without drafting for you.",
        },
        {
          prompt: "AI gives you a 'next sentence' suggestion you don't love. The best response is:",
          options: [
            "Use it anyway since you're stuck",
            "Discard it and try a totally different tool",
            "React to it — even a bad suggestion often clarifies what you actually want to say",
          ],
          answer: 2,
          explanation:
            "Writer's block is often resolved by reaction, not generation. A mediocre AI suggestion acts as a pressure valve: your disagreement with it frequently reveals your real intention.",
        },
      ],
      explanation:
        "Different blocks need different moves: generate angles for blank pages, find through-lines for overstuffed notes, and use next-sentence suggestions as pressure valves mid-draft.",
    },
    {
      slug: "seo-and-content-strategy",
      title: "AI for SEO & Content Strategy",
      blurb: "Research topics, cluster keywords, and plan content calendars — without guessing.",
      xp: 25,
      kind: "quiz",
      content: `# AI for SEO & Content Strategy

Search engines in 2026 reward content that genuinely helps a specific reader —
not content stuffed with keywords. AI can accelerate the research and planning
side of content strategy without replacing human editorial judgment.

## Where AI legitimately helps with SEO content

**Topic and angle discovery**
- "I run a blog about personal finance for freelancers. What questions does
  this audience have that most articles don't actually answer well?"
- "What are the common misconceptions about [topic] that keep showing up in
  forums and comment sections?"

**Keyword clustering**
- "Here is a list of 30 keywords. Group them into clusters by search intent —
  informational, navigational, commercial, transactional."

**Content briefs**
- "Write a content brief for a 1,200-word article targeting 'freelance invoice
  templates'. Include: target audience, core questions to answer, suggested
  headers, recommended word count per section."

**Content calendar scaffolding**
- "Plan 8 weeks of blog content for a small accounting firm. Each week: one
  pillar piece and two supporting pieces that link back to it."

## Important limits

- **AI cannot tell you actual search volumes or difficulty scores.** Use a
  dedicated tool (Ahrefs, Semrush, Google Search Console) for real data.
- **AI-generated content at scale often triggers quality filters.** Search
  engines are improving at detecting undifferentiated AI copy. Distinctive
  perspective and original data still matter.
- **Freshness matters.** AI's training cutoff means it may miss recent
  algorithm changes, trending topics, or newly popular search queries.

Use AI as a research accelerator and planning scaffold, not as an SEO oracle.`,
      questions: [
        {
          prompt: "What is AI genuinely useful for in a content strategy workflow?",
          options: [
            "Providing exact keyword search volumes and competition scores",
            "Discovering under-answered audience questions, clustering keywords by intent, and scaffolding content briefs and calendars",
            "Guaranteeing first-page rankings on Google",
          ],
          answer: 1,
          explanation:
            "AI excels at language-level planning tasks — finding angles, grouping by intent, drafting briefs. It has no access to live search data, so ranking metrics come from dedicated SEO tools.",
        },
        {
          prompt: "A content team publishes 50 AI-generated articles per week with minimal human editing. The likely risk is:",
          options: [
            "No risk — more content always means more traffic",
            "Search engines increasingly filter undifferentiated AI copy, and without distinctive perspective the content fails to rank or engage",
            "The articles will be too long",
          ],
          answer: 1,
          explanation:
            "Volume without differentiation is a losing strategy. Search quality systems in 2026 penalize thin, undifferentiated content regardless of how it was produced. Original data and point of view remain the moat.",
        },
        {
          prompt: "You ask AI which keywords are trending right now in your niche. You should:",
          options: [
            "Trust the answer completely — AI has real-time data",
            "Treat it as directional at best, then verify with a live tool like Google Search Console or an SEO platform",
            "Ignore keywords entirely",
          ],
          answer: 1,
          explanation:
            "AI training has a cutoff date and no live search index. For current trending queries, only tools with live data give you accurate signal.",
        },
      ],
      explanation:
        "AI accelerates topic discovery, intent clustering, and brief writing. Real search volumes and freshness checks still require dedicated SEO tools with live data.",
    },
    {
      slug: "ethics-voice-disclosure",
      title: "Ethics, Voice & Disclosure",
      blurb: "When to disclose AI use, how to keep your voice authentic, and where the lines are.",
      xp: 25,
      kind: "quiz",
      content: `# Ethics, Voice & Disclosure

AI writing tools create real ethical questions — and vague answers do no one
any favors. Here is how to think through the main issues clearly.

## Disclosure: when and how

There is no universal law requiring disclosure of AI use in most writing
contexts as of 2026 — but there are strong professional and ethical reasons to
be transparent:

- **Journalism:** most major outlets now require disclosure of AI-assisted
  drafting. Readers trust bylines; undisclosed AI use is a trust violation.
- **Academic work:** nearly all institutions have specific AI-use policies.
  Using AI without disclosure where prohibited is academic dishonesty.
- **Marketing and brand content:** disclosure rules are evolving. The FTC and
  equivalent bodies in other jurisdictions are increasingly active.
- **Personal blogging / creative writing:** the ethical standard is your own
  and your readers' expectations. If your brand is "my authentic voice" and AI
  is substantially ghostwriting, readers have a reasonable claim to know.

A good default: disclose if readers would feel deceived to learn AI was
significantly involved.

## Keeping your voice authentic

- **Write the thesis yourself before prompting.** Your actual opinion, not
  AI's average-of-the-internet opinion, should be the core argument.
- **Never publish an AI draft without genuine revision.** At minimum, read it
  aloud and rewrite every sentence that doesn't sound like you.
- **Don't outsource the hard thinking.** AI is fine for structure and words.
  The insight, the lived experience, the specific anecdote — that has to be
  real or the work is hollow.

## Copyright and originality

AI output has uncertain copyright status in most jurisdictions as of 2026.
Courts are still establishing precedent. The safest position: treat AI output
as uncopyrighted raw material you transform significantly through editing.`,
      questions: [
        {
          prompt: "A useful default rule for AI disclosure in writing is:",
          options: [
            "Never disclose — it makes you look less skilled",
            "Always disclose in every context regardless of the level of AI involvement",
            "Disclose if readers would feel deceived to learn AI was significantly involved in the work",
          ],
          answer: 2,
          explanation:
            "Disclosure norms vary by context, but the core ethical test is reader expectation. If your audience trusts a byline as original human work and AI substantially wrote it, they have a legitimate claim to know.",
        },
        {
          prompt: "The best way to keep your authentic voice when using AI drafting tools is:",
          options: [
            "Ask AI to 'write in my style' without giving examples",
            "Write your actual thesis and core argument yourself first, then use AI for structure and words — revising every sentence that doesn't sound like you",
            "Publish the AI draft directly to save time",
          ],
          answer: 1,
          explanation:
            "Voice and original point of view come from you, not the model. If you let AI generate the argument too, you risk publishing the average-of-the-internet opinion rather than your own.",
        },
        {
          prompt: "As of 2026, the safest legal position on AI-generated text and copyright is:",
          options: [
            "AI output is fully copyrighted to whoever prompted it",
            "AI output is fully copyrighted to the AI company",
            "Copyright status is unsettled — treat AI output as uncopyrighted raw material and transform it significantly through editing",
          ],
          answer: 2,
          explanation:
            "Courts in multiple jurisdictions are still establishing precedent. Heavy human editing and transformation is both the legally safer and artistically more honest approach.",
        },
      ],
      explanation:
        "Disclose where readers would feel deceived. Write your own argument first. Edit heavily — your voice and originality are what readers (and copyright law) actually care about.",
    },
    {
      slug: "building-a-sustainable-ai-workflow",
      title: "Building a Sustainable AI Writing Workflow",
      blurb: "Capstone: design a personal system that keeps output high, quality high, and burnout low.",
      xp: 25,
      kind: "quiz",
      content: `# Building a Sustainable AI Writing Workflow

You have now covered the foundations: what AI can and can't do, how to prompt
for prose and editing, how to defeat blocks, how to use it for content
strategy, and how to keep voice and ethics intact. This capstone lesson is
about turning those skills into a **repeatable system** that scales.

## The five-stage human-AI writing process

1. **Idea and thesis (human-led):** You decide what you want to say and why
   it matters. AI can surface angles, but the conviction has to be yours.

2. **Research (human-led, AI-assisted):** You gather real sources, data, and
   quotes. AI can help you identify questions, cluster information, and
   summarize long documents — but verify every fact it touches.

3. **Drafting (AI-assisted, human-directed):** Brief the AI with audience,
   purpose, tone, and constraints. React to the output immediately; don't let
   it sit or you'll be tempted to publish it unchanged.

4. **Editing (human-led, AI-assisted):** Use targeted AI editing tasks — cut,
   clarify, vary rhythm — but read aloud after every round. You make every
   final call.

5. **Publishing (human-led):** Final read is yours. Disclosure, formatting,
   and the publish button — all yours.

## Signs your workflow is off balance

- You are publishing drafts you have not genuinely read.
- Your work no longer has a discernible point of view.
- You are producing more content but getting less engagement.
- You feel vaguely dishonest after hitting publish.

## Signs your workflow is working

- AI handles the slow, mechanical parts; you handle the thinking.
- Your published pieces still surprise you — they have things in them only
  you would say.
- Your output volume is up and your quality bar hasn't dropped.
- You could defend every sentence if a reader challenged you on it.

The goal is not to produce more content. The goal is to produce content that
only you could produce — faster.`,
      questions: [
        {
          prompt: "In a healthy human-AI writing workflow, which stage should remain most firmly human-led?",
          options: [
            "Formatting and layout",
            "Generating synonyms and transitions",
            "The idea and thesis — deciding what you want to say and why it matters",
          ],
          answer: 2,
          explanation:
            "If AI picks your argument, you are publishing the average-of-the-internet. The conviction, the angle, the 'why this matters to me' — that is the irreplaceable human input that gives the work its reason to exist.",
        },
        {
          prompt: "Which is a warning sign that your AI writing workflow has drifted out of balance?",
          options: [
            "You are producing more content at the same quality level",
            "AI handles mechanical editing tasks while you focus on ideas and final reads",
            "You are publishing drafts you haven't genuinely read and your work has lost a discernible point of view",
          ],
          answer: 2,
          explanation:
            "Quantity without voice or conviction is the classic AI-workflow failure mode. If you can't defend every sentence and the work no longer sounds like you, the balance has tipped too far toward automation.",
        },
        {
          prompt: "The truest measure of a successful AI writing workflow is:",
          options: [
            "Publishing as many pieces as possible per week",
            "Producing content that only you could produce — faster, with AI handling the slow mechanical parts",
            "Using AI for every single step so no manual work remains",
          ],
          answer: 1,
          explanation:
            "The goal is to amplify your specific voice and judgment, not to replace them. If the output could have been written by anyone with the same prompt, the workflow is failing the most important test.",
        },
      ],
      explanation:
        "A sustainable workflow keeps humans in charge of ideas, research, and final editorial judgment — with AI accelerating the mechanical work in between. Volume is a side effect; distinctiveness is the goal.",
    },
  ],
};
