import type { Module } from "./types";

// AI for Personal Knowledge Management — all-quiz module teaching learners how
// to use AI tools effectively to capture, organize, retrieve, and synthesize
// personal and professional knowledge. Practical, current as of 2026, no hype.
export const aiKnowledgeManagement: Module = {
  slug: "ai-knowledge-management",
  title: "AI for Personal Knowledge Management",
  description:
    "Learn how to use AI to build a second brain: capture fleeting ideas, organize notes at scale, resurface the right information at the right time, and synthesize knowledge across dozens of sources — without drowning in your own system.",
  emoji: "🧠",
  gradient: "from-purple-500/20 to-indigo-500/10",
  tagline:
    "Build a second brain with AI — capture ideas, organize notes, and synthesize knowledge faster than any folder system ever could.",
  keywords: [
    "AI knowledge management",
    "second brain AI",
    "AI note taking",
    "personal knowledge management",
    "PKM AI",
    "AI for notes",
    "AI Obsidian",
    "AI Notion",
    "knowledge base AI",
    "AI information management",
  ],
  lessons: [
    {
      slug: "what-is-pkm-and-where-ai-fits",
      title: "What Is PKM — and Where Does AI Fit?",
      blurb: "Understand what personal knowledge management is and why AI changes the game.",
      xp: 20,
      kind: "quiz",
      content: `# What Is PKM — and Where Does AI Fit?

**Personal Knowledge Management (PKM)** is the practice of deliberately capturing,
organizing, and retrieving information so it stays useful to you over time. Think
of it as gardening your own mind: without tending, good ideas rot, useful articles
vanish, and you rediscover the same things repeatedly.

Classic PKM tools — folders, notebooks, note apps — solve the *storage* problem.
The harder problems are **finding** what you stored and **connecting** ideas across
sources. That's where AI changes things dramatically.

AI adds three new abilities to PKM:

1. **Rapid capture** — dictate a rough idea and have it structured into clean notes
   instantly, without interrupting your train of thought.
2. **Semantic search** — retrieve notes by *meaning*, not just keywords. "What did
   I learn about negotiation?" surfaces relevant notes even if the word
   "negotiation" never appears.
3. **Synthesis** — ask AI to pull threads across dozens of notes and write a
   coherent summary, first draft, or decision brief.

AI doesn't replace your PKM system — it amplifies it. The better your system, the
more leverage AI can apply. A messy pile of unsorted notes is harder to surface
usefully than a well-tagged, consistently structured one.

The foundation: **capture first, organize second, synthesize third**. AI helps most
at steps one and three, but can also assist with step two.`,
      questions: [
        {
          prompt: "What is the primary problem that AI solves in personal knowledge management that folders and notebooks do NOT solve well?",
          options: [
            "Storing large files cheaply",
            "Finding and connecting ideas across sources by meaning, not just by keyword",
            "Printing notes in a readable format",
          ],
          answer: 1,
          explanation:
            "Classic tools solve storage. AI's unique contribution is semantic retrieval and synthesis — surfacing and connecting ideas even when exact words don't match.",
        },
        {
          prompt: "Which of the following is a realistic use of AI in a PKM workflow?",
          options: [
            "Automatically verifying every fact in your notes against primary sources",
            "Dictating a rough idea and having AI structure it into a clean, tagged note",
            "Replacing the need to ever capture or review your own notes",
          ],
          answer: 1,
          explanation:
            "Rapid, low-friction capture is where AI shines — turning messy voice or text into structured notes. AI can't fact-check for you, and it doesn't replace the review habit.",
        },
        {
          prompt: "Why does the quality of your underlying notes system still matter when you add AI?",
          options: [
            "It doesn't — AI works equally well on random piles of files",
            "A well-organized system gives AI better structure to work with, producing more useful synthesis",
            "AI only reads files that are alphabetically sorted",
          ],
          answer: 1,
          explanation:
            "AI amplifies what's there. Consistent structure, tags, and naming conventions mean the AI can draw cleaner connections and produce more accurate summaries.",
        },
      ],
      explanation:
        "PKM is the practice of making knowledge stay useful over time. AI accelerates capture and synthesis — but a solid underlying system still matters.",
    },
    {
      slug: "capture-without-friction",
      title: "Capture Without Friction",
      blurb: "Get ideas into your system instantly, before they evaporate.",
      xp: 20,
      kind: "quiz",
      content: `# Capture Without Friction

The biggest enemy of a good PKM system is **friction at capture time**. If saving
an idea takes more than a few seconds of mental effort, you won't do it consistently
— and an inconsistent system is nearly useless.

AI dramatically lowers capture friction in three ways:

**1. Voice-to-structured note**
Dictate a rambling thought into an AI chat or a voice-memo app that pipes to AI.
The AI extracts the key insight, writes a clean one-paragraph note, and suggests
tags. You review and save. Total time: under 30 seconds.

**2. Highlight + ask AI to summarize**
Paste a paragraph from an article and ask: *"Summarize this in two sentences and
tell me why it's worth saving."* The AI writes the note *for* you; you just confirm
it's accurate.

**3. Inbox-zero for notes**
Many modern PKM setups use an "inbox" — a single, unprocessed pile. AI can batch-
process your inbox: read a week's worth of rough captures and suggest titles, tags,
and folder placements all at once.

**Key principle: capture everything that surprises or repeats.** If a fact surprises
you, it's worth keeping. If you've thought the same thing three times this week,
write it down — recurrence is signal.

Avoid the trap of over-engineering capture. The perfect template you spend an hour
building is worse than the rough bullet you save in five seconds. Capture first;
refine with AI later.`,
      questions: [
        {
          prompt: "What is the most common reason people fail to maintain a PKM system over time?",
          options: [
            "Capture is too slow or effortful, so they stop doing it consistently",
            "Note apps are too expensive",
            "They capture too much and run out of storage",
          ],
          answer: 0,
          explanation:
            "Friction at capture time kills systems. If saving an idea takes real effort, it won't happen consistently — and an inconsistent system provides no value.",
        },
        {
          prompt: "You paste a paragraph from an article into an AI chat and ask it to summarize in two sentences and explain why it's worth saving. This is an example of:",
          options: [
            "Replacing reading with AI so you don't have to understand the material",
            "Using AI to lower the effort of writing a note, so you capture more consistently",
            "Asking AI to verify the article's claims against primary research",
          ],
          answer: 1,
          explanation:
            "The AI writes the note; you confirm accuracy. This removes the blank-page problem and keeps capture fast without sacrificing the act of reading and evaluating.",
        },
        {
          prompt: "Which captures are worth saving, according to a solid PKM habit?",
          options: [
            "Only formally written ideas that are fully thought through",
            "Anything that surprises you, or any idea that has recurred in your mind multiple times",
            "Only information from peer-reviewed academic sources",
          ],
          answer: 1,
          explanation:
            "Surprise and recurrence are strong signals of value. Rough captures refined later beat perfectly formatted notes never saved at all.",
        },
      ],
      explanation:
        "Friction kills consistency. AI lowers capture effort through voice summaries, highlight-to-note, and batch inbox processing — making the 'save it now' habit sustainable.",
    },
    {
      slug: "organizing-notes-at-scale",
      title: "Organizing Notes at Scale",
      blurb: "Tags, links, and folders — and how AI helps when you have thousands of notes.",
      xp: 22,
      kind: "quiz",
      content: `# Organizing Notes at Scale

Most people start a note system with folders. Folders work fine at 50 notes. At
500 notes, things get messy. At 5,000, folders become a maintenance burden.

The three main organization schemes — and their tradeoffs:

**Folders (hierarchical)**
- Intuitive, familiar, maps to filesystems
- Breaks down when a note belongs to two categories; forces an arbitrary choice

**Tags (flat)**
- A note can have many tags; great for cross-cutting themes like "productivity",
  "health", "book-notes"
- Gets noisy if you over-tag; discipline required

**Links (networked, like Obsidian or Roam)**
- Notes link to each other; a graph emerges
- Excellent for connecting ideas; higher upfront effort

**How AI helps with organization:**

- **Suggest tags**: paste a note, ask "what 3–5 tags would you add to this?"
- **Identify duplicates**: feed a batch of notes and ask "which of these cover
  overlapping topics?"
- **Rename for findability**: "Give me a specific, search-friendly title for
  this note." Vague titles like "Thoughts 2" don't surface in search.
- **Suggest links**: paste two notes and ask "does note A connect meaningfully
  to note B, and how?"

**The PARA method** (Projects, Areas, Resources, Archive) is a popular folder-light
scheme that pairs well with AI: Projects are time-boxed outcomes you're working
toward; Areas are ongoing responsibilities; Resources are reference material;
Archive is everything inactive. AI can quickly categorize a note into one of these
four buckets when asked.

The honest truth: the best organization system is the one you'll actually maintain.
AI lets you do *less* upfront organizing and recover structure later through
batch-processing, so even light organization pays off.`,
      questions: [
        {
          prompt: "What is the main weakness of a folder-only organization system as your note collection grows?",
          options: [
            "Folders are too slow to open on modern computers",
            "A note that belongs in two categories forces an arbitrary choice, making retrieval unreliable",
            "Folders can only hold ten files each",
          ],
          answer: 1,
          explanation:
            "Hierarchical folders break when ideas are genuinely cross-disciplinary. Tags and links solve this; AI can apply them automatically.",
        },
        {
          prompt: "You have a note titled 'Thoughts 2 — meeting stuff'. An AI suggests renaming it to 'Client Onboarding Checklist — Q3 2026'. Why is the AI's suggestion better?",
          options: [
            "Longer titles are always better for storage efficiency",
            "Specific, descriptive titles surface correctly in search and make the note's content obvious at a glance",
            "AI-generated titles are protected by copyright",
          ],
          answer: 1,
          explanation:
            "Vague titles vanish in search results and make scanning a list painful. Specific titles do the retrieval work for you months later.",
        },
        {
          prompt: "In the PARA method, where would you store a half-finished project proposal you're actively working on?",
          options: [
            "Archive",
            "Resources",
            "Projects",
          ],
          answer: 2,
          explanation:
            "Projects holds time-boxed work with a defined outcome — exactly what an active proposal is. Once delivered or cancelled, it moves to Archive.",
        },
      ],
      explanation:
        "At scale, folders alone break down. Tags, links, and consistent naming — applied quickly with AI help — keep a large collection searchable without hours of manual tending.",
    },
    {
      slug: "retrieval-and-search",
      title: "Retrieval and Search That Actually Works",
      blurb: "Stop losing notes you know you saved — search by meaning, not just keywords.",
      xp: 22,
      kind: "quiz",
      content: `# Retrieval and Search That Actually Works

Saving a note is only valuable if you can find it later. Traditional search is
**keyword-based**: it finds notes that contain the exact words you typed. If you
searched "persuasion techniques" and the note says "influence tactics", you get
nothing.

**Semantic search** — powered by AI embeddings — finds notes by *meaning*. "How do
I handle a difficult conversation?" might surface notes tagged #conflict-resolution,
a book note on "Crucial Conversations", and a personal log entry about a hard call
last year, none of which contain your exact search phrase.

Several PKM tools now offer built-in semantic search or AI assistants:

- **Notion AI** — ask questions over your workspace in natural language
- **Obsidian** with plugins (Copilot, Smart Connections) — local or cloud-based
  embedding search over your vault
- **Apple Notes Siri integration**, **Google Keep**, **mem.ai** — varying degrees
  of AI-assisted recall

When tools don't offer built-in semantic search, you can approximate it by pasting
a batch of notes into a long-context AI chat and asking: *"Which of these are
relevant to [topic]?"*

**Practical retrieval habits:**

1. **Search by question, not keyword.** "What did I learn about pricing strategy?"
   beats "pricing".
2. **Use AI to jog memory.** Ask: "I saved something about negotiation around
   mid-2025 — what might I have called it?" The AI won't know your notes, but
   can suggest likely titles and tags to search for.
3. **Review beats search.** A weekly or monthly review — quickly skimming recent
   notes — keeps relevant material in active memory so you don't need to search
   for it at all.

The retrieval habit that matters most: **make the note findable at save time.** A
specific title, two or three tags, and one sentence of context added at capture are
worth hours of searching later.`,
      questions: [
        {
          prompt: "What is the key advantage of semantic search over keyword search for notes?",
          options: [
            "Semantic search runs faster on older hardware",
            "It finds notes by meaning and concept, even when the exact words you search don't appear in the note",
            "It only searches note titles, making results more precise",
          ],
          answer: 1,
          explanation:
            "Semantic search uses embeddings to match intent and concept. A search for 'difficult conversations' can surface a note about 'conflict resolution' with no keyword overlap.",
        },
        {
          prompt: "When a PKM tool doesn't offer built-in AI search, what is a reasonable workaround for finding relevant notes on a topic?",
          options: [
            "Delete old notes to reduce clutter",
            "Paste a batch of notes into a long-context AI chat and ask which are relevant to your topic",
            "Search three times with different keyword spellings",
          ],
          answer: 1,
          explanation:
            "Long-context AI chats (which can hold many thousands of words) can serve as a manual semantic search when your tool doesn't provide one natively.",
        },
        {
          prompt: "Which retrieval habit reduces the need for search in the first place?",
          options: [
            "Keeping notes in a single giant document",
            "Regular review — skimming recent notes weekly or monthly keeps useful material in active memory",
            "Setting calendar reminders for every note you save",
          ],
          answer: 1,
          explanation:
            "A regular review habit keeps recent knowledge accessible without search. Many practitioners find they need to search far less after adopting a weekly review.",
        },
      ],
      explanation:
        "Semantic search finds notes by meaning. Pair it with question-based queries, consistent tagging at save time, and regular review — and retrieval stops being the weak link.",
    },
    {
      slug: "synthesizing-across-sources",
      title: "Synthesizing Knowledge Across Sources",
      blurb: "Turn a pile of notes into insight — without reading everything again.",
      xp: 25,
      kind: "quiz",
      content: `# Synthesizing Knowledge Across Sources

The real value of a PKM system isn't storage — it's **synthesis**: combining
ideas from multiple sources into something new. A book note plus a meeting insight
plus a podcast quote might together produce a decision, a pitch, or a framework
you couldn't have articulated from any one source alone.

Historically, synthesis was the hardest and most time-consuming step. AI makes it
tractable.

**How to synthesize with AI:**

1. **Paste and ask.** Collect 5–15 relevant notes and paste them into an AI chat.
   Ask: *"What patterns or tensions do you see across these? What's the single
   most important idea?"*

2. **Build a literature note.** When you finish a book or course, paste your
   highlights into AI and ask: *"Write a 300-word synthesis of the main arguments
   and how they connect."* This becomes a permanent, searchable artifact.

3. **Decision briefs.** Before a big decision, gather every relevant note and ask
   AI to write a two-page brief: context, options, tradeoffs, your own prior
   thinking. AI structures the material; you make the call.

4. **Weekly review digest.** Paste the week's captured notes and ask: *"What
   themes emerge? What should I follow up on?"* A five-minute AI synthesis beats
   re-reading everything.

**Important caveats:**

- AI synthesis can introduce subtle distortions. It may weight ideas unequally or
  smooth over genuine contradictions in your notes. Always read the output
  critically.
- Your notes are the source of truth; the synthesis is a tool for thinking, not a
  replacement for your own judgment.
- For high-stakes decisions, verify the AI-generated brief against the original
  notes before acting on it.`,
      questions: [
        {
          prompt: "You have 10 notes from different books all touching on the topic of habit formation. What is the most effective way to use AI to synthesize them?",
          options: [
            "Ask AI to pick the single 'best' note and discard the rest",
            "Paste all 10 notes and ask AI to identify patterns, tensions, and the single most important idea",
            "Ask AI to rewrite each note individually in a shorter form",
          ],
          answer: 1,
          explanation:
            "Synthesis is about finding what emerges across sources — patterns, contradictions, convergences. Pasting a batch and asking for cross-cutting insight is the core move.",
        },
        {
          prompt: "Why should you always read an AI-generated synthesis critically rather than accepting it as the final word?",
          options: [
            "AI refuses to synthesize notes it didn't write",
            "AI may weight ideas unequally or smooth over real contradictions in your original notes",
            "Synthesis only works on notes written in English",
          ],
          answer: 1,
          explanation:
            "AI is a thinking tool, not a judgment-replacement. Subtle distortions — omitted nuance, false consensus — can appear in synthesis that looks correct on the surface.",
        },
        {
          prompt: "What is a 'literature note' in a PKM context, and how can AI help create one?",
          options: [
            "A note about fiction only; AI can autocomplete the plot",
            "A synthesized summary of a book or source — AI can write it from your highlights, creating a permanent searchable artifact",
            "A bibliography exported from a reference manager",
          ],
          answer: 1,
          explanation:
            "A literature note distills the key arguments of a source into a reusable, searchable form. AI can draft it from raw highlights in seconds, replacing hours of manual writing.",
        },
      ],
      explanation:
        "Synthesis turns notes into insight. Paste batches into AI, ask for patterns and tensions, build literature notes and decision briefs — but always read the output critically.",
    },
    {
      slug: "ai-tools-and-workflows",
      title: "AI Tools and Workflows for PKM",
      blurb: "Which tools do what, and how to wire them into a practical daily workflow.",
      xp: 22,
      kind: "quiz",
      content: `# AI Tools and Workflows for PKM

The PKM tool landscape has shifted significantly with AI. Here's a practical map
of what exists and where AI adds the most value, as of 2026:

**Note apps with native AI:**

- **Notion AI** — ask questions over your pages and databases, auto-summarize,
  translate, generate content inline. Best for collaborative and structured notes.
- **Obsidian + plugins** — Copilot for AI chat over your vault, Smart Connections
  for semantic similarity links, Text Generator for drafts. Local-first, offline
  capable.
- **Mem** — built with AI-first retrieval; surfaces related memories automatically
  without tagging.
- **Apple Intelligence / Notes** — on-device summarization and search on Apple
  hardware; strong privacy properties.

**General AI assistants as PKM tools:**

Any large-context AI chat (Claude, Gemini, ChatGPT) can serve as a PKM tool when
you paste notes in. This requires no setup and works immediately; the downside is
no persistence — the AI doesn't remember between sessions.

**A practical daily workflow (15 minutes total):**

1. **Morning (2 min):** Check your capture inbox. Paste rough notes to AI, get
   clean structured versions, save them.
2. **During day (ongoing):** Capture immediately — voice memo, quick paste to AI,
   typed bullet. Don't organize now.
3. **Evening (5 min):** Paste the day's captures to AI: "Tag these, suggest titles,
   flag anything I should follow up on."
4. **Weekly (8 min):** Paste the week's notes to AI for a synthesis digest. Add
   any resulting action items to your task manager.

**Privacy note:** Pasting personal notes into cloud AI services means those notes
leave your device. If privacy is a priority, use local models (Ollama + a local
LLM) or an app with on-device AI.`,
      questions: [
        {
          prompt: "What is the main tradeoff when using a general AI chat (like Claude or ChatGPT) as your PKM tool instead of a dedicated app like Notion or Obsidian?",
          options: [
            "General AI chats are slower than note apps",
            "General AI chats have no memory between sessions, so context must be pasted fresh each time",
            "General AI chats can only handle notes shorter than 100 words",
          ],
          answer: 1,
          explanation:
            "Any large-context AI chat works immediately without setup — but it's stateless. Your notes aren't persisted, so you paste them in each session. Dedicated tools with AI solve this.",
        },
        {
          prompt: "A user cares deeply about note privacy and doesn't want personal notes sent to cloud servers. Which approach best fits their constraint?",
          options: [
            "Using Notion AI, which stores notes on Notion's servers",
            "Using a local model like Ollama with an LLM running entirely on their own machine",
            "Avoiding AI tools entirely",
          ],
          answer: 1,
          explanation:
            "Local models (Ollama + a capable open-weight LLM) run entirely on device. Notes never leave the machine — privacy preserved with functional AI capabilities.",
        },
        {
          prompt: "In the daily PKM workflow described, when is the best time to organize and tag notes?",
          options: [
            "Immediately at the moment of capture, before the thought is complete",
            "In a dedicated evening batch-processing step, not during active capture",
            "Only once a month during a full system review",
          ],
          answer: 1,
          explanation:
            "Organizing during capture breaks your train of thought and reduces what you actually capture. A batch step — when focus is lower stakes — keeps capture fast and organization consistent.",
        },
      ],
      explanation:
        "Notion AI, Obsidian with plugins, Mem, and local models each have distinct tradeoffs. A simple daily workflow — capture fast, batch-organize in the evening — outperforms any perfect tool with bad habits.",
    },
    {
      slug: "pkm-capstone",
      title: "Capstone: Build Your Second Brain",
      blurb: "Apply every PKM layer — from first capture to cross-source synthesis.",
      xp: 25,
      kind: "quiz",
      content: `# Capstone: Build Your Second Brain

You've covered the full stack of AI-assisted PKM: why it matters, how to capture
without friction, how to organize at scale, how to retrieve by meaning, how to
synthesize across sources, and which tools and workflows exist.

Let's tie it together with a practical framework you can start using today:

**The four-step AI PKM loop:**

1. **Capture** — Save everything that surprises you or recurs. Use voice, paste,
   or a quick bullet. Let AI clean it up.
2. **Process** — In a batch (daily or weekly), let AI suggest tags, titles, and
   links. File into your system.
3. **Retrieve** — Search by question, not keyword. Use semantic search where
   available; paste batches into AI chat when not.
4. **Synthesize** — Before decisions, projects, or writing, paste relevant notes
   and ask AI for patterns, contradictions, and the one key insight.

**Common failure modes and fixes:**

| Failure | Fix |
|---|---|
| Too much in inbox, never processed | Timebox processing: 5 min/day max |
| Notes saved but never used | Weekly review habit — just 8 minutes |
| System too complex to maintain | Simplify: one folder, tags, and AI to sort |
| Trusting AI synthesis blindly | Always read against source notes before acting |

**What "second brain" actually means:**

Your second brain is the externalized, searchable, AI-amplified extension of your
working memory. It captures what you can't reliably hold in your head, retrieves it
when relevant, and surfaces connections you'd never make manually across hundreds of
notes. It doesn't replace your judgment — it frees your cognitive bandwidth for the
thinking that only you can do.

The most important step is to start — imperfectly, with the tools you already have.
A system you actually use beats a perfect system you're still designing.`,
      questions: [
        {
          prompt: "A colleague has 800 notes saved but says 'I never look at them — the system feels useless.' Which fix addresses the root cause?",
          options: [
            "Delete all notes and start fresh",
            "Establish a weekly review habit — even 8 minutes of skimming surfaces what's relevant and keeps the system alive",
            "Switch to a different note app",
          ],
          answer: 1,
          explanation:
            "Storage without retrieval is a digital pile, not a PKM system. A short weekly review keeps material in active memory and makes the whole system feel worth maintaining.",
        },
        {
          prompt: "Before a major decision, you gather 12 notes on the topic and ask AI for a synthesis. The AI's brief looks polished and confident. What is the responsible next step?",
          options: [
            "Act on the brief immediately — AI-generated content is more reliable than your own notes",
            "Read the brief against your original source notes to check for distortions or omitted nuance before acting",
            "Share the AI-generated brief publicly as your own analysis",
          ],
          answer: 1,
          explanation:
            "AI synthesis is a thinking tool, not a final authority. Reading the brief against originals catches distortions — ideas weighted too heavily, contradictions smoothed over — before they influence a real decision.",
        },
        {
          prompt: "Which single habit, above all others, determines whether a PKM system remains useful over months and years?",
          options: [
            "Using the most advanced AI model available",
            "Capturing consistently and reviewing regularly — the system lives or dies on use, not tools",
            "Having a perfect folder taxonomy from day one",
          ],
          answer: 1,
          explanation:
            "Consistent capture and regular review are the load-bearing habits. Tools and AI amplify them — but no tool compensates for not using the system. Start imperfect; iterate from there.",
        },
      ],
      explanation:
        "The four-step loop — capture, process, retrieve, synthesize — is your operating system for a second brain. AI accelerates every step. The habit of using it is what makes it real.",
    },
  ],
};
