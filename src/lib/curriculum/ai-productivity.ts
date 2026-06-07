import type { Module } from "./types";

// AI Productivity Systems — a practical, concept-first course on building
// durable AI-powered workflows. No coding; all quiz/reading lessons.
// Covers the full arc from prompt strategy through task automation, personal
// knowledge management, and measuring real productivity gains.
export const aiProductivity: Module = {
  slug: "ai-productivity",
  title: "AI Productivity Systems",
  description:
    "Move beyond one-off prompts and build repeatable AI-powered systems for your work. Learn prompt strategy, task decomposition, AI-assisted knowledge management, workflow automation, output quality assurance, team collaboration with AI, and how to measure whether any of it actually saves you time.",
  emoji: "⚙️",
  gradient: "from-amber-500/20 to-orange-500/10",
  tagline:
    "Stop dabbling — start building AI workflows that save hours every week. Practical systems for individuals and teams, no coding required.",
  keywords: [
    "AI productivity",
    "AI workflow",
    "prompt strategy",
    "AI task automation",
    "AI knowledge management",
    "AI for teams",
    "AI time saving",
    "AI systems thinking",
  ],
  lessons: [
    {
      slug: "systems-vs-one-off-prompts",
      title: "Systems vs One-Off Prompts",
      blurb: "Why repeatable workflows beat clever prompts — and how to build them.",
      xp: 20,
      kind: "quiz",
      content: `# Systems vs One-Off Prompts

Most people use AI like a vending machine: type a request, get an output, move on.
That works fine for a one-time task. It breaks down the moment the same type of
task recurs — because next time, you start from scratch.

A **productivity system** flips this. Instead of thinking "what should I ask AI for
this?" you think "what kind of task is this, and what's my repeatable process for
handling it?" The difference compounds fast.

## What a system looks like

A minimal AI productivity system has three parts:

1. **A template or saved prompt** — the reusable scaffold you refine over time.
2. **A consistent input format** — what information you always feed in (context,
   goal, constraints, format).
3. **A review step** — a quick checklist for deciding what to keep, edit, or
   discard from the AI's output.

## The compounding advantage

Each time you run a system, you can tweak it. Prompts get sharper. Input formats
get tighter. Review steps get faster. After ten runs, a task that used to take
30 minutes may take five — not because AI got smarter, but because your system did.

## When not to systematize

Not every task is worth systematizing. A good rule: if you'll do this type of
task fewer than five times, a well-crafted one-off prompt is fine. If you'll do it
repeatedly (weekly reports, customer replies, content drafts, research summaries),
invest ten minutes building a system and save hours going forward.

The goal is not to automate everything — it's to make the recurring work invisible
so you can spend your attention on things only you can do.`,
      questions: [
        {
          prompt:
            "What is the core difference between a one-off prompt and an AI productivity system?",
          options: [
            "A system uses a more advanced AI model",
            "A system is a repeatable workflow — template, consistent inputs, and a review step — that gets better with each use",
            "A system requires coding to set up",
          ],
          answer: 1,
          explanation:
            "The power is repeatability, not technology. A system turns each run into an improvement on the last, compounding your efficiency over time.",
        },
        {
          prompt: "According to the systems-thinking framework, when is it NOT worth building a system?",
          options: [
            "When the task takes more than an hour",
            "When you'll do this type of task fewer than about five times — a good one-off prompt is enough",
            "When you're working alone rather than on a team",
          ],
          answer: 1,
          explanation:
            "Systematizing has an upfront cost. If a task genuinely won't recur, that cost isn't worth it. Reserve system-building for recurring work.",
        },
        {
          prompt: "Which habit best captures the 'compounding advantage' of AI systems?",
          options: [
            "Switching to a newer AI model after every task",
            "Tweaking your template and input format a little each run so the system improves over time",
            "Asking AI to improve itself on your behalf",
          ],
          answer: 1,
          explanation:
            "The AI doesn't improve — your system does. Small refinements each run add up; after ten iterations, a recurring task can shrink from thirty minutes to five.",
        },
      ],
      explanation:
        "Systems thinking is the highest-leverage AI skill. One great template used fifty times beats fifty clever one-off prompts.",
    },
    {
      slug: "task-decomposition",
      title: "Task Decomposition with AI",
      blurb: "Break big, fuzzy work into pieces AI can actually handle — and you can verify.",
      xp: 22,
      kind: "quiz",
      content: `# Task Decomposition with AI

One of the most common AI frustrations: you give it a big, complex task and the
output is too shallow, too generic, or misses the point. The cause is almost always
that the task was too large and underspecified for a single prompt.

**Decomposition** — breaking a task into smaller, clearly-scoped subtasks — is the
fix. It works for two reasons:

1. Smaller tasks have narrower success criteria, so the AI can do them well and you
   can verify each step.
2. The output of one step can become the input to the next, building toward a
   higher-quality whole.

## A practical decomposition process

Suppose the task is "write a competitive analysis report." Decomposed:

1. **Step 1 — Define scope:** Ask AI to list the five most relevant competitors
   to analyze and the five criteria that matter most to your audience.
   *Review: trim or add until the list is right.*
2. **Step 2 — Research summaries:** For each competitor, ask AI to summarize
   publicly available information against your criteria.
   *Review: spot-check for accuracy; add context you know.*
3. **Step 3 — Synthesis:** Feed the summaries back in, ask for a comparative
   table and a "key takeaways" paragraph.
   *Review: check the framing matches your audience.*
4. **Step 4 — Polish:** Ask AI to tighten the executive summary.

Each step is verifiable. Mistakes are caught early, not buried in a ten-page draft.

## The golden rule of decomposition

**Make each subtask completable in one AI turn with a verifiable output.** If you
can't describe what "done" looks like for a subtask, break it down further.`,
      questions: [
        {
          prompt:
            "Why does giving AI one large, complex task often produce a weak result?",
          options: [
            "Large tasks cost more API tokens, so the model cuts corners",
            "The task is too broad and underspecified — the AI has to guess at scope and criteria, and errors compound",
            "AI models have a maximum word count for responses",
          ],
          answer: 1,
          explanation:
            "Broad tasks mean vague success criteria. The AI makes reasonable guesses that may not match your intent, and there's no checkpoint to catch drift early.",
        },
        {
          prompt:
            "In the competitive analysis example, why is each decomposed step reviewed before moving on?",
          options: [
            "To bill the client for extra hours",
            "So mistakes are caught at each small step rather than buried in a large final draft",
            "AI requires human approval to continue to the next step",
          ],
          answer: 1,
          explanation:
            "Review at each step is a quality gate. Catching a wrong competitor list in step 1 is trivial; catching it after the full report is written is expensive.",
        },
        {
          prompt: "What is the 'golden rule' of task decomposition?",
          options: [
            "Always use at least seven steps for any complex task",
            "Make each subtask completable in one AI turn with a verifiable, describable output",
            "Decompose tasks only when the final output is longer than one page",
          ],
          answer: 1,
          explanation:
            "If you can't say what 'done' looks like for a step, it's still too large. Verifiability is the whole point — it's what turns AI output into something you can trust.",
        },
      ],
      explanation:
        "Break it down, verify each piece, feed outputs forward. Decomposition turns fuzzy complex tasks into a reliable pipeline.",
    },
    {
      slug: "prompt-templates-and-libraries",
      title: "Prompt Templates & Personal Libraries",
      blurb: "Save your best prompts, build a library, and stop reinventing the wheel.",
      xp: 20,
      kind: "quiz",
      content: `# Prompt Templates & Personal Libraries

If a prompt worked really well, it will work again — if you can find it. Most
people's prompt archive is "somewhere in a chat history," which is effectively
nowhere. A personal prompt library turns those wins into permanent assets.

## What belongs in a prompt template

A good template has five parts:

- **Role** — who the AI should be ("You are a senior editor focused on clarity…")
- **Task** — what you need ("Review the following draft and list specific edits…")
- **Context** — what the AI needs to know ("This is for a non-technical audience…")
- **Format** — how you want the output ("Return a numbered list, each item under
  15 words, actionable…")
- **Variable slots** — placeholders you fill each run ("[DRAFT]", "[AUDIENCE]",
  "[WORD LIMIT]")

## Building the library

You don't need special software. A simple notes app, a shared doc, or a plain
text file organized by category works fine. Common categories:

- Writing & editing
- Research & summarizing
- Planning & scheduling
- Data analysis & formatting
- Communication (emails, messages, proposals)

## Maintaining quality

The library only stays useful if you curate it. After any task, ask: "Did this
prompt perform well? Can I tweak it for next time?" A two-minute review before
closing the chat is enough. Delete prompts that consistently underperform. Promote
ones that reliably save you thirty minutes.

## Shared team libraries

When a team standardizes on a prompt library, the best prompts replace the
weakest ones organization-wide — not just in one person's workflow. This is one
of the highest-leverage AI investments a small team can make.`,
      questions: [
        {
          prompt: "Why is 'somewhere in a chat history' a poor place to store successful prompts?",
          options: [
            "Chat histories are deleted after 24 hours on most platforms",
            "They're effectively unfindable — a good prompt buried in history provides no value on the next similar task",
            "AI platforms charge extra to retrieve past chats",
          ],
          answer: 1,
          explanation:
            "Discoverability is the issue. Even a perfect prompt that you can't find or reuse is wasted. A library makes past wins instantly accessible.",
        },
        {
          prompt: "Which element of a prompt template makes it reusable across many inputs?",
          options: [
            "A very long, detailed task description",
            "Variable slots — labeled placeholders like [DRAFT] or [AUDIENCE] that you fill in each run",
            "Including the current date in the template",
          ],
          answer: 1,
          explanation:
            "Variable slots are what turn a one-time prompt into a reusable template. The structure stays constant; only the specific inputs change.",
        },
        {
          prompt: "What is the highest-leverage reason to build a shared prompt library for a team?",
          options: [
            "It prevents team members from using AI at all without approval",
            "The best-performing prompts replace the weakest ones across the whole organization, not just in one person's workflow",
            "It reduces the need to buy AI subscriptions",
          ],
          answer: 1,
          explanation:
            "Individual prompt improvement is linear. Team-level standardization is exponential — the best prompt wins for everyone, every time.",
        },
      ],
      explanation:
        "Treat your best prompts like code worth keeping: store, curate, and share them. A prompt library compounds in value the same way a codebase does.",
    },
    {
      slug: "ai-knowledge-management",
      title: "AI-Assisted Knowledge Management",
      blurb: "Capture, organize, and retrieve what you know — with AI doing the heavy lifting.",
      xp: 22,
      kind: "quiz",
      content: `# AI-Assisted Knowledge Management

Information piles up faster than anyone can organize it. Meeting notes, research
articles, project decisions, email threads, voice memos — most of it gets lost or
siloed. AI can help at every stage of the knowledge cycle: **capture, organize,
retrieve, and apply**.

## Capture

AI transcription and summarization tools can convert raw inputs — recordings,
long documents, web pages, PDFs — into structured notes in seconds. The habit:
whenever you finish something that generated knowledge (a meeting, a reading
session, a discovery), immediately paste or feed the raw content to AI and ask for
a structured summary with key decisions, action items, and open questions.

## Organize

AI can tag, categorize, and link information. Give it a collection of notes and
ask it to propose a folder structure, identify themes, or spot connections you
missed. It won't replace a thoughtful taxonomy, but it can draft one in seconds.

## Retrieve

Searching your own notes with AI (if your tool supports it) is far more powerful
than keyword search. You can ask "What did we decide about the pricing model in
Q3?" and get a synthesized answer across multiple documents rather than a list of
files to manually skim.

## Apply

The payoff is when stored knowledge feeds back into current work. Paste your
project notes into a prompt when drafting a status update. Feed your research
summaries into a report prompt. The AI uses your captured knowledge, not just its
training data.

## The critical habit: capture immediately

Knowledge management collapses without the capture habit. AI can organize and
retrieve what you give it; it cannot recover what you never recorded. The most
impactful change most people can make is simply closing the capture loop — before
leaving the meeting, before closing the tab.`,
      questions: [
        {
          prompt: "What is the most impactful single habit for AI-assisted knowledge management?",
          options: [
            "Using a premium note-taking app",
            "Capturing raw content immediately — summary, decisions, actions — before leaving the meeting or closing the tab",
            "Organizing all notes into a perfect folder hierarchy first",
          ],
          answer: 1,
          explanation:
            "AI can organize and retrieve whatever you give it, but it cannot recover what you never recorded. Capture is the foundation; everything else is downstream.",
        },
        {
          prompt: "How does AI-assisted retrieval differ from traditional keyword search?",
          options: [
            "It only works on documents shorter than one page",
            "It synthesizes an answer across many documents in response to a natural-language question, rather than returning a list of files to skim",
            "It requires an internet connection to your file storage",
          ],
          answer: 1,
          explanation:
            "Keyword search finds documents; AI retrieval answers questions. That shift from 'find' to 'synthesize' is what makes stored knowledge genuinely accessible.",
        },
        {
          prompt: "In the knowledge cycle, what does 'apply' mean?",
          options: [
            "Submitting your notes to a manager for approval",
            "Feeding your captured knowledge back into current prompts so AI uses your context, not just its training data",
            "Applying formatting styles to your documents",
          ],
          answer: 1,
          explanation:
            "The payoff of knowledge management is making past knowledge available to current tasks. Pasting project notes or research summaries into a prompt lets AI give context-specific answers rather than generic ones.",
        },
      ],
      explanation:
        "Capture, organize, retrieve, apply. AI turns this cycle from a discipline into a habit — but only if you close the capture loop consistently.",
    },
    {
      slug: "output-quality-and-verification",
      title: "Output Quality & Verification",
      blurb: "A fast personal QA process so you ship AI-assisted work with confidence.",
      xp: 25,
      kind: "quiz",
      content: `# Output Quality & Verification

Moving quickly with AI is the point — but "fast" and "careful" aren't opposites.
A lightweight, consistent verification step keeps quality high without adding
significant time. The goal is a personal QA process you can run in under two
minutes on most AI outputs.

## The four-step QA check

1. **Accuracy** — Does every specific claim, number, name, or date in this output
   need to be true? If yes, verify those specifically against a source. If the
   output is creative or structural (a draft outline, a rewrite), skip this.
2. **Completeness** — Does the output address the full scope of what you asked?
   Missing sections or skipped criteria are the most common gap.
3. **Tone and voice** — Does it sound like you (or your brand)? AI defaults to a
   slightly formal, hedged voice. Quick edits here are almost always needed.
4. **Downstream consequence** — What happens if this output is wrong? Low
   consequence (internal brainstorm) → light check. High consequence (customer
   communication, financial decision, published content) → full check per point 1.

## Calibrating your verification effort

Not all outputs deserve equal scrutiny. A tiered approach:

- **Tier 1 (internal, low-stakes):** Read once for completeness and tone.
- **Tier 2 (external, medium-stakes):** Full four-step check; fact-check key claims.
- **Tier 3 (public, high-stakes, or regulated):** Full check plus independent
  source verification and a human reviewer who wasn't part of drafting it.

## The cost of skipping

Most AI quality failures in professional settings aren't dramatic hallucinations —
they're subtle incompleteness, wrong tone, or a number slightly off. These slip
through when people skip verification because "AI usually gets it right." It
usually does. But "usually" is not a quality standard.`,
      questions: [
        {
          prompt:
            "Which type of AI output most requires checking specific facts against an external source?",
          options: [
            "A brainstormed list of project name ideas",
            "Content containing specific numbers, names, citations, or claims that will be acted on or published",
            "A rewritten paragraph where you just want a different tone",
          ],
          answer: 1,
          explanation:
            "Fact-checking effort should be proportional to how specific and consequential the claims are. Creative or structural outputs need tone/completeness checks, not fact-checks.",
        },
        {
          prompt:
            "According to the tiered approach, what does a Tier 3 (high-stakes/public) verification require beyond a standard four-step check?",
          options: [
            "Re-prompting AI until it produces a different answer",
            "Independent source verification plus a human reviewer who wasn't involved in drafting",
            "Publishing to a test audience first",
          ],
          answer: 1,
          explanation:
            "High-stakes outputs need a second set of eyes that is independent of the drafting process. The person who wrote the prompt is the worst person to spot its blind spots.",
        },
        {
          prompt: "What is the most common real-world AI quality failure in professional settings?",
          options: [
            "Dramatic hallucinations that are obviously false",
            "Subtle incompleteness, slightly wrong tone, or a number slightly off — slipping through because verification was skipped",
            "Outputs that are far too long to use",
          ],
          answer: 1,
          explanation:
            "Obvious errors get caught. Subtle ones don't. The 'AI usually gets it right' assumption is what lets small errors compound into real problems.",
        },
      ],
      explanation:
        "Fast verification, not no verification. Two minutes of calibrated checking protects the speed AI gives you — and the reputation you've built.",
    },
    {
      slug: "ai-for-teams-and-collaboration",
      title: "AI for Teams & Collaboration",
      blurb: "How teams multiply the value of AI — and avoid the pitfalls of inconsistency.",
      xp: 22,
      kind: "quiz",
      content: `# AI for Teams & Collaboration

When a single person uses AI well, they save their own time. When a team uses AI
well, they can change how the team works — faster iteration, more consistent
output, less time on low-value work. But teams also introduce coordination problems
that solo users don't have.

## The consistency problem

If every team member prompts AI differently for the same task type, outputs vary
wildly in quality, tone, and structure. Reviewing and integrating them costs more
time than the AI saved. The fix: **shared templates and agreed output formats**
for common recurring tasks.

## Roles for AI in team workflows

- **Meeting infrastructure** — transcription, structured action-item extraction,
  decision logs. AI can generate a draft minutes document within seconds of a
  recording being available.
- **Async communication** — AI can draft update posts, status summaries, or
  handoff notes from bullet points, reducing the writing burden on individual
  contributors.
- **Review and feedback** — feeding a shared document to AI and asking for a
  structured critique gives everyone a common starting point before human review.
- **Onboarding** — new team members can ask AI to explain project context,
  terminology, or past decisions if the team has documented them.

## What AI can't do for teams

AI cannot replace the social dynamics of good collaboration — trust, clear
ownership, psychological safety, and shared goals. Teams that paper over weak
processes with AI tooling usually find the problems resurface in the output.
Use AI to reduce the friction of good processes; fix broken processes the
old-fashioned way first.

## Governance basics

As of 2026, most organizations are developing AI use policies. Key points any
team should agree on: what data is safe to put into external AI tools, how AI-
assisted work is disclosed, and who is accountable for the accuracy of
AI-assisted outputs.`,
      questions: [
        {
          prompt:
            "What is the 'consistency problem' when teams use AI without coordination?",
          options: [
            "Different team members prefer different AI models",
            "Each person prompts AI differently for the same task type, producing wildly varying outputs that are costly to integrate",
            "AI gives the same answer to everyone, removing individual creativity",
          ],
          answer: 1,
          explanation:
            "Inconsistent prompting produces inconsistent output. The review and integration cost can erase the time AI saved. Shared templates are the solution.",
        },
        {
          prompt: "Which team use case does AI handle especially well out of the box?",
          options: [
            "Deciding who owns which deliverable",
            "Generating structured meeting minutes, action items, and decision logs from a recording or transcript",
            "Resolving interpersonal conflicts between team members",
          ],
          answer: 1,
          explanation:
            "Meeting infrastructure — transcription to structured output — is a high-value, low-risk AI task. The output is easy to review and saves disproportionate time.",
        },
        {
          prompt: "What is a key governance question every team should settle before widely using AI tools?",
          options: [
            "Which AI model has the most parameters",
            "What data is safe to put into external AI tools, how AI-assisted work is disclosed, and who is accountable for accuracy",
            "Whether to allow personal AI use on company devices",
          ],
          answer: 1,
          explanation:
            "Data sensitivity, disclosure norms, and accountability are the three pillars of team AI governance. Without agreement on these, teams face compliance and quality risks.",
        },
      ],
      explanation:
        "Teams amplify AI's value — but only when they coordinate. Shared templates, clear governance, and honest limits on what AI can fix are the foundation.",
    },
    {
      slug: "measuring-and-improving-your-ai-system",
      title: "Measuring & Improving Your AI System",
      blurb: "Capstone — close the loop: measure real gains, iterate deliberately, and keep improving.",
      xp: 25,
      kind: "quiz",
      content: `# Measuring & Improving Your AI System

You've learned to build systems, decompose tasks, maintain a prompt library,
manage knowledge, verify quality, and collaborate with teams. The final and most
important habit is **closing the feedback loop**: measuring whether your AI
systems are actually working and improving them deliberately.

## Why measurement matters

"I feel more productive" is not a measurement. It's easy to feel busy with AI
tools — generating more drafts, running more prompts — without actually finishing
more of what matters. Measurement makes the real signal visible.

## What to measure

Pick metrics that reflect the outcome you care about, not AI activity:

- **Time-to-draft** for a recurring task (before vs. after the AI system).
- **Revision rounds** needed before a deliverable is approved.
- **Error rate** in outputs that go through your QA process.
- **Task completion rate** — are you finishing more, or just starting more?

Avoid measuring "prompts per day" or "AI outputs generated." Those are activity
metrics, not outcome metrics.

## A simple improvement loop

Every two weeks (or monthly if you're just starting):

1. **Review** recent AI-assisted work: what worked, what needed heavy revision?
2. **Identify** the one task type that still feels slow or inconsistent.
3. **Update** the relevant template or system for that task type.
4. **Note** what you changed and why — a single line in your prompt library is enough.

## The honest limit

Some tasks don't get faster with AI. Writing that requires your unique voice and
perspective, decisions that require relationships and context AI can't have,
creative work where the struggle itself is the value — these may not benefit much.
Knowing what NOT to delegate to AI is itself a productivity gain: you stop
trying to optimize things that shouldn't be optimized.

## Looking ahead

AI models and tools will improve considerably over the coming years. The skills
that transfer are not tool-specific — they're systems thinking, clear
communication, critical evaluation, and the habit of measuring what matters.
These outlast any particular model or product.`,
      questions: [
        {
          prompt: "Why is 'prompts per day' a poor productivity metric for AI work?",
          options: [
            "It's too difficult to count accurately",
            "It measures activity, not outcomes — you can generate many prompts and still finish less of what actually matters",
            "AI platforms don't expose this data",
          ],
          answer: 1,
          explanation:
            "Activity metrics create the illusion of productivity. Outcome metrics — time-to-draft, revision rounds, task completion — tell you whether the system is actually working.",
        },
        {
          prompt:
            "In the simple improvement loop, what should you update after identifying a task that still feels slow?",
          options: [
            "Switch to a different AI model for that task",
            "The relevant template or prompt in your library, noting what you changed and why",
            "Your job description to remove that task type",
          ],
          answer: 1,
          explanation:
            "The loop is: review → identify → update template → note the change. The library becomes a living record of your system's evolution, not a static archive.",
        },
        {
          prompt: "Which type of task is honestly least likely to benefit from AI productivity systems?",
          options: [
            "Recurring research summaries for a weekly report",
            "Writing or creative work where your unique perspective and the process of struggling through it is itself the point",
            "Drafting routine customer communications",
          ],
          answer: 1,
          explanation:
            "Not everything should be delegated. Work where the thinking is the value — where your distinctive voice or hard-won perspective is what makes it worth anything — often suffers when AI does the heavy lifting.",
        },
      ],
      explanation:
        "Measure outcomes, not activity. Iterate on systems deliberately. Know what not to automate. These habits compound longer than any specific AI tool will last.",
    },
  ],
};
