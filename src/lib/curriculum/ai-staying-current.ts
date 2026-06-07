import type { Module } from "./types";

// Staying Current with AI — a practical field guide for anyone who already
// uses AI and wants to keep pace with a fast-moving landscape. Covers how to
// track meaningful changes, evaluate new tools without hype, understand model
// versioning and capability jumps, curate reliable sources, and think clearly
// about what "new" actually means. All quiz/reading lessons (no coding).
export const aiStayingCurrent: Module = {
  slug: "ai-staying-current",
  title: "Staying Current with AI",
  description:
    "AI moves fast — but most of the noise is hype. Learn how to track what actually matters: model releases, capability jumps, reliable sources, and a personal system for filtering signal from noise without drowning in your feed.",
  emoji: "📡",
  gradient: "from-cyan-500/20 to-blue-500/10",
  tagline:
    "Build a durable system for following AI's rapid evolution — cut the hype, find the signal, and stay genuinely up to date without burnout.",
  keywords: [
    "staying current with AI",
    "AI news",
    "how to follow AI developments",
    "AI model releases",
    "AI hype vs reality",
    "best AI newsletters",
    "AI benchmarks explained",
    "AI learning 2026",
  ],
  lessons: [
    {
      slug: "why-staying-current-is-hard",
      title: "Why Staying Current Is Hard",
      blurb: "The AI news cycle is relentless — and mostly noise. Here's how to keep your bearings.",
      xp: 20,
      kind: "quiz",
      content: `# Why Staying Current Is Hard

The AI field moves faster than almost any technology in history. Major model
releases, new research papers, product launches, and media breathlessness arrive
daily. If you tried to read everything, you'd drown — and still miss what matters.

A few structural problems make this especially hard:

**The hype cycle is extreme.** Every release gets "AGI by next Tuesday" headlines
from some corners and dismissal from others. Neither extreme is useful. The truth
usually lands somewhere quieter.

**Capability claims outrun reality.** Benchmarks are gamed, demos cherry-pick
best cases, and "state of the art" means something only in a specific narrow
context. A model that tops a coding benchmark may be mediocre at the thing you
actually need.

**The landscape is genuinely fragmented.** There are now dozens of capable models
from multiple labs, open-source projects, and specialized providers. Tracking them
all is a job, not a hobby.

**The shelf-life of "current" is short.** Something that was the best model three
months ago may now be mid-tier. Skills and mental models age more slowly than
specific product comparisons.

The goal of this module isn't to track every release — it's to build a **system**
that keeps you genuinely informed without consuming you. You'll learn to identify
signal, evaluate claims skeptically, and update your understanding at a
sustainable pace.`,
      questions: [
        {
          prompt: "Why is it impractical to try to read every piece of AI news as it appears?",
          options: [
            "AI news is locked behind expensive paywalls",
            "The volume is enormous and most of it is hype or repetition — the signal-to-noise ratio is low",
            "AI developments only happen once per year",
          ],
          answer: 1,
          explanation:
            "The AI news cycle is relentless and heavily amplified. Reading everything is exhausting and mostly useless; a curated system beats raw consumption.",
        },
        {
          prompt: "A new model 'tops the coding benchmark.' What's the most measured response?",
          options: [
            "Immediately switch to it — benchmarks are definitive",
            "Treat it as a useful data point, not proof it will be better for your specific tasks",
            "Ignore it entirely — benchmarks are always meaningless",
          ],
          answer: 1,
          explanation:
            "Benchmarks are useful signals but easily gamed and narrowly scoped. A model that wins one benchmark may underperform on your actual use cases. Test it yourself.",
        },
        {
          prompt: "Which ages more slowly and is therefore more worth investing in?",
          options: [
            "Which specific model version is currently 'best'",
            "Mental models for evaluating AI capabilities and spotting hype",
            "The exact price of each AI subscription tier",
          ],
          answer: 1,
          explanation:
            "Specific product rankings flip every few months. The ability to evaluate claims, read benchmarks critically, and test tools yourself compounds over years.",
        },
      ],
      explanation:
        "Recognizing that most AI news is noise is the first step. The rest of this module builds the filtering system.",
    },
    {
      slug: "how-models-evolve",
      title: "How Models Actually Evolve",
      blurb: "Understand versioning, capability jumps, and what 'better' really means.",
      xp: 22,
      kind: "quiz",
      content: `# How Models Actually Evolve

Knowing a little about how AI models are developed and versioned helps you make
sense of release announcements without getting lost in the jargon.

## Naming and versioning

Labs name models differently. Some use numbers (GPT-4, GPT-4o, GPT-4.5),
some use code names or tiers (Claude Sonnet, Claude Opus, Claude Haiku), and
open-source projects often follow their own conventions (Llama 3, Llama 3.1,
Llama 3.2). A higher number doesn't always mean dramatically better — sometimes
it's an incremental update; sometimes it's a generational leap.

## What actually changes between versions

- **Context window** — how much text (or images, audio, etc.) the model can
  process in one go. Expanding this unlocks entire new use cases like analyzing
  long documents or whole codebases at once.
- **Reasoning ability** — newer training techniques (including extended thinking
  before responding) have significantly improved math, logic, and multi-step
  problem solving.
- **Multimodality** — models now routinely handle images, audio, and video
  alongside text. This is a real expansion of what's possible, not just a gimmick.
- **Speed and cost** — the same capability often gets cheaper and faster over
  time. Tasks that required the largest model a year ago may run fine on a
  smaller, cheaper one now.
- **Fine-tuning and specialization** — base models are increasingly customized
  for specific domains (medicine, law, coding). A specialized model can outperform
  a general one in its niche even if its raw benchmark scores are lower.

## What rarely changes

The fundamental mechanism — predicting likely next tokens from learned patterns —
hasn't changed. The core strengths (fluency, breadth of knowledge, helpful
pattern-matching) and core weaknesses (hallucination, no real-time knowledge by
default, susceptibility to sycophancy) persist across versions. Each generation
reduces these weaknesses, but they don't disappear.`,
      questions: [
        {
          prompt: "A new model release doubles the context window. Why does this matter practically?",
          options: [
            "It makes the model smarter at all tasks",
            "It lets you feed in much longer documents or codebases in a single conversation",
            "It makes the model cheaper to run",
          ],
          answer: 1,
          explanation:
            "Context window size directly determines how much input the model can 'see' at once. A larger window unlocks use cases like analyzing full books, legal contracts, or whole codebases — not just raw intelligence.",
        },
        {
          prompt: "Which of these is a genuine, persistent weakness even in the most advanced models as of 2026?",
          options: [
            "They can only process English",
            "They hallucinate — stating false information confidently",
            "They can't do any math at all",
          ],
          answer: 1,
          explanation:
            "Hallucination (confident but wrong output) remains a real limitation across all major models. Newer models reduce it but don't eliminate it — human verification of important facts is still necessary.",
        },
        {
          prompt: "A smaller, specialized model scores lower on general benchmarks than the top general model. For its specific domain, it might still be:",
          options: [
            "Always worse — higher benchmark score means better at everything",
            "Better — fine-tuning for a domain can outperform a general model on domain tasks",
            "Unusable — specialized models are experimental and unreliable",
          ],
          answer: 1,
          explanation:
            "Specialization through fine-tuning can make a smaller model outperform a larger general one on targeted tasks. General benchmarks don't capture this.",
        },
      ],
    },
    {
      slug: "reading-benchmarks-critically",
      title: "Reading Benchmarks Critically",
      blurb: "Benchmarks are marketing as much as measurement. Here's how to read them honestly.",
      xp: 22,
      kind: "quiz",
      content: `# Reading Benchmarks Critically

Every major model release comes with a benchmark table. Labs compare their new
model against competitors on tasks like coding challenges, math exams, reading
comprehension, and factual question-answering. These tables are useful — and
routinely misleading.

## What benchmarks actually measure

A benchmark is a fixed, standardized test. When a model scores 92% on a coding
benchmark, it means it answered 92% of that specific test's questions correctly
under the conditions of that test. It doesn't mean it will be 92% reliable at
*your* coding tasks.

## How benchmark scores get inflated

**Training data contamination.** If a model was trained on text that included
the benchmark questions and answers, its score reflects memorization, not
reasoning. Labs are improving at preventing this, but it remains a concern.

**Cherry-picking.** A lab may report the best-of-N score, use a favorable prompt
template, or choose which benchmarks to feature based on where their model shines.

**Benchmark saturation.** When every top model scores 90%+ on a benchmark, the
benchmark stops distinguishing them. The field constantly needs new, harder tests.

**Narrow coverage.** A model that aces a math reasoning benchmark may be mediocre
at the nuanced, open-ended writing your job requires. Benchmarks are narrow by
design.

## What actually works

- **Test on your own tasks.** Give a new model the things you do every day and see
  how it performs. This is the most reliable signal.
- **Look at independent evals.** Organizations like HELM, BIG-bench, and community
  leaderboards like LMSYS Chatbot Arena (which uses human preference votes) are
  less incentivized to favor any one model.
- **Track capability categories, not decimal points.** The difference between 87%
  and 89% on a benchmark is noise. The difference between "can't write working code"
  and "reliably writes working code" is real.`,
      questions: [
        {
          prompt: "A lab reports their model scored 95% on a popular coding benchmark. What's the most appropriate reaction?",
          options: [
            "Assume it will solve 95% of your coding problems",
            "Treat it as a useful data point, then test the model on your actual coding tasks",
            "Dismiss it — benchmarks are always rigged and useless",
          ],
          answer: 1,
          explanation:
            "Benchmark scores are real signals but narrow ones. The only way to know how a model performs on your work is to test it on your work.",
        },
        {
          prompt: "What is 'training data contamination' in the context of benchmarks?",
          options: [
            "A model that was trained on harmful data",
            "A model that was exposed to the benchmark questions during training, inflating its score",
            "A benchmark that contains factual errors",
          ],
          answer: 1,
          explanation:
            "If a model saw the benchmark's questions (and answers) during training, high scores may reflect memorization rather than genuine capability — a significant validity problem.",
        },
        {
          prompt: "Which evaluation approach is most resistant to a lab's incentive to make their model look good?",
          options: [
            "The lab's own benchmark table in their press release",
            "An independent leaderboard based on human preference votes across many models",
            "The score on the single hardest benchmark the lab selected to feature",
          ],
          answer: 1,
          explanation:
            "Independent evaluations — especially human-preference arenas where users vote on real outputs across many models — have much weaker incentives to favor any one lab's model.",
        },
      ],
      explanation:
        "Read benchmark tables with curiosity and skepticism in equal measure. Your own task-specific tests are the ground truth.",
    },
    {
      slug: "building-your-information-diet",
      title: "Building Your Information Diet",
      blurb: "Which sources actually signal, and how to build a sustainable reading habit.",
      xp: 23,
      kind: "quiz",
      content: `# Building Your Information Diet

Staying current doesn't mean reading everything — it means reading the right
things at a sustainable pace. Think of it as an information diet: you want
nutrition, not just calories.

## Tiers of sources

**Primary sources (highest signal):**
- Lab blogs and research posts (Anthropic, OpenAI, Google DeepMind, Meta AI,
  Mistral, etc.) — these are the announcements straight from the source.
- Academic preprints (arXiv) — for people comfortable with research papers;
  this is where the underlying science surfaces first.
- Official changelogs and model cards — the actual technical documentation.

**Curated secondary sources (high signal, lower time cost):**
- Weekly or bi-weekly newsletters written by thoughtful AI practitioners who
  filter primary sources for you. A few hours per week of reading, distilled.
- Podcast transcripts or episode summaries from shows that interview researchers
  rather than hype-chasers.
- Leaderboards and independent eval trackers.

**Social and real-time sources (useful but noisy):**
- AI researchers and engineers on Twitter/X and LinkedIn — the fastest surface for
  early signal, but heavy on opinions and hot takes.
- Community forums like r/MachineLearning or Hugging Face's community hub — good
  for practitioner perspectives.

**Low-signal sources to deprioritize:**
- General tech news sites often report AI with a hype or fear frame, missing
  technical nuance.
- Viral "AI will/won't do X" takes without links to the underlying work.

## A sustainable weekly rhythm

- Skim **one or two curated newsletters** to catch the week's major moves.
- Read **one primary source** (lab blog post or paper abstract) on the topic that
  interests you most.
- Spend **15-30 minutes trying a new model or feature** hands-on rather than just
  reading about it.
- Let go of the rest. You won't read everything — and that's fine.`,
      questions: [
        {
          prompt: "You want the highest-signal, lowest-spin update on a new model. Where should you look first?",
          options: [
            "The first news site that shows up in your feed",
            "The lab's own blog post or official model card",
            "The most-liked tweet about the release",
          ],
          answer: 1,
          explanation:
            "Lab blog posts and model cards are the original source — written by the people who built the model, with actual technical detail. Secondary coverage adds interpretation and occasionally distortion.",
        },
        {
          prompt: "Which habit gives you the most reliable sense of whether a new model is actually useful to you?",
          options: [
            "Memorizing its benchmark scores",
            "Spending 15-30 minutes using it on tasks you actually do",
            "Waiting six months for consensus reviews to appear",
          ],
          answer: 1,
          explanation:
            "Hands-on testing on your own work is irreplaceable. Scores and reviews are useful context; personal experience is the ground truth.",
        },
        {
          prompt: "A general tech news headline reads 'New AI can now do EVERYTHING.' What's the most useful response?",
          options: [
            "Share it immediately — this is important",
            "Click through to see if it links to primary sources, and read those before forming a view",
            "Dismiss it — tech news never covers AI accurately",
          ],
          answer: 1,
          explanation:
            "Extreme claims from secondary sources deserve a source-check, not immediate amplification or reflexive dismissal. Good epistemics means tracing claims to their origin.",
        },
      ],
    },
    {
      slug: "evaluating-new-tools",
      title: "Evaluating New Tools Without the Hype",
      blurb: "A practical framework for deciding whether a new AI tool actually belongs in your workflow.",
      xp: 23,
      kind: "quiz",
      content: `# Evaluating New Tools Without the Hype

New AI tools launch constantly. Agentic assistants, coding copilots, image
generators, meeting summarizers, writing aids, research tools — each one arrives
with promises of 10x productivity. Most won't change your life. Some will.
Telling them apart quickly is a learnable skill.

## A five-question evaluation framework

**1. Does it solve a problem I actually have?**
The first filter is relevance. If you don't regularly write code, a coding
assistant isn't urgent. Don't let a good demo distract you from your actual work.

**2. How does it handle failure?**
Every AI tool makes mistakes. The important question is: how does it fail? Does it
fail gracefully (telling you it's uncertain) or silently (giving wrong output with
full confidence)? Test it on edge cases, not just the examples in the demo.

**3. What's the real time cost?**
"Saves you 2 hours per week" claims require a close look. Setup time, learning
curve, prompt iteration, and reviewing/correcting output all eat into the claimed
savings. Track your actual time for the first week.

**4. What's the data and privacy situation?**
Does using this tool require sending your work, your clients' data, or proprietary
information to a third-party server? Check the privacy policy and your employer's
policy before making it part of your workflow.

**5. Will this still be worth using in 6 months?**
The tool graveyard is large. Small startups launch on top of large models —
and disappear when those models add the same feature natively, or when the
startup runs out of funding. Evaluate sustainability and moat.

## The 30-minute trial

Before committing, give a new tool 30 minutes on real work — not a tutorial,
not the demo, your actual tasks. By the end you'll know more than any review
could tell you.`,
      questions: [
        {
          prompt: "You see a demo of a new AI meeting summarizer. What's the most important first question?",
          options: [
            "What famous companies are using it?",
            "Do I have a real problem with meeting notes that this would solve?",
            "What's the most impressive thing it can do?",
          ],
          answer: 1,
          explanation:
            "Relevance is the first filter. A tool that solves a problem you don't have is a distraction, no matter how impressive it is in the demo.",
        },
        {
          prompt: "When testing a new AI tool, why is it especially important to test edge cases and difficult inputs?",
          options: [
            "Edge cases are the only inputs that matter",
            "Demos always show the best cases; failure behavior reveals what the tool is actually like to use daily",
            "All AI tools perform equally on typical inputs",
          ],
          answer: 1,
          explanation:
            "Marketing demos cherry-pick favorable cases. How a tool handles ambiguity, unusual inputs, or its own uncertainty tells you what it's really like to rely on it.",
        },
        {
          prompt: "A startup tool promises to save you two hours per week. What's the most rigorous way to evaluate that claim?",
          options: [
            "Trust the claim — startups wouldn't exaggerate",
            "Track your actual time savings during a real trial week, accounting for setup and correction overhead",
            "Ask other users online — their experience is identical to yours",
          ],
          answer: 1,
          explanation:
            "Productivity claims need personal measurement. Setup, learning curve, and reviewing AI output all eat into advertised savings — only tracking your own time reveals the real number.",
        },
      ],
    },
    {
      slug: "understanding-ai-narratives",
      title: "Understanding AI Narratives",
      blurb: "Why the same event gets framed as apocalypse, salvation, and boring — and how to think through it.",
      xp: 22,
      kind: "quiz",
      content: `# Understanding AI Narratives

The same AI development often gets reported through radically different frames
simultaneously. Being able to recognize common narrative patterns helps you
extract the factual core from any coverage.

## The five recurring frames

**Utopian / acceleration frame:** AI will solve cancer, climate, and poverty
within the decade. Every release is a step toward a new era of human flourishing.
Strengths: motivates ambition, captures real positive potential. Weakness: ignores
timelines, second-order effects, and distributional questions.

**Doom / extinction frame:** Superintelligent AI will escape human control and
end civilization. Current systems are the early tremors. Strengths: takes
long-run risks seriously. Weakness: can collapse complex policy questions into
a single existential frame that's hard to reason about practically.

**Hype / bubble frame:** AI is mostly a repackaged product cycle selling cloud
compute. The demos are impressive; the real-world value is narrow. Strengths:
appropriate skepticism of overclaiming. Weakness: misses genuine, documented
productivity gains.

**Labor disruption frame:** AI automates jobs, concentrates power, and harms
workers. Strengths: labor impacts are real and deserve attention. Weakness:
historical technology transitions show complex net effects, not simple replacement.

**Pragmatic / practitioner frame:** Here's what this specific model can and
can't do, how to use it well, and what changed from the last version. Usually
the least viral, most useful.

## Reading for frame

When you read an AI piece, a useful habit is to identify: *which frame is driving
this story?* The same facts can generate five different articles. Once you see the
frame, you can ask: what would someone coming from a different frame notice that
this author didn't?

This isn't cynicism — it's triangulation. Reading across frames gives you a fuller
picture than any single perspective.`,
      questions: [
        {
          prompt: "Two outlets cover the same AI model release: one says it 'could cure diseases within years,' another says it 'will eliminate knowledge worker jobs.' What's likely happening?",
          options: [
            "One of them is lying",
            "Each is applying a different narrative frame to the same factual event",
            "One of them has better access to the lab",
          ],
          answer: 1,
          explanation:
            "Multiple contradictory-seeming stories can all be based on the same facts, filtered through different frames (utopian, labor disruption, etc.). Recognizing the frame is the first step to useful interpretation.",
        },
        {
          prompt: "Which type of AI coverage is typically the least viral but the most practically useful?",
          options: [
            "Extinction-risk analysis pieces",
            "Practitioner-level coverage: what specifically changed, what it can and can't do",
            "Pieces arguing AI is mostly hype",
          ],
          answer: 1,
          explanation:
            "Practical, specific coverage — what the model actually does, tested results, real limitations — doesn't generate the emotional response that drives shares, but it's the most actionable.",
        },
        {
          prompt: "A useful habit when reading any AI article is to ask:",
          options: [
            "Is this author certified in AI?",
            "Which narrative frame is driving this piece, and what would a different frame notice?",
            "How many likes does this article have?",
          ],
          answer: 1,
          explanation:
            "Frame-awareness enables triangulation. Asking what a different framing would emphasize helps you find the parts of the story any single article left out.",
        },
      ],
    },
    {
      slug: "your-personal-current-system",
      title: "Building Your Personal 'Stay Current' System",
      blurb: "Capstone: design a sustainable, personalized system for staying genuinely informed without burnout.",
      xp: 25,
      kind: "quiz",
      content: `# Building Your Personal 'Stay Current' System

You've covered the why and the what. This capstone is about the how — designing a
system you'll actually maintain. The goal is to stay meaningfully informed about
the AI developments that matter to your work and life, without spending hours a
day chasing every announcement.

## The three-layer system

**Layer 1: Passive awareness (daily, low effort)**
A small set of high-signal social follows — a handful of AI researchers or
practitioners whose judgment you trust. Skim these in idle moments. Don't try to
read everything; just catch the things that rise to the top organically. Budget:
5-10 minutes.

**Layer 2: Weekly digest (once a week, moderate effort)**
One or two curated newsletters or digest sources. Read with a notebook or
bookmark tool open — if something is interesting enough to re-read, save it.
Budget: 20-30 minutes.

**Layer 3: Deliberate exploration (once a month, higher effort)**
Pick one specific topic — a new model, a capability area, an application domain —
and go deep. Read the primary sources. Try the tool hands-on. Write down what you
actually think. This is where your real mental models get updated. Budget: 1-2
hours.

## Managing the feeling of falling behind

The AI field moves fast enough that everyone feels behind. This feeling is
structural, not personal. A few mindsets that help:

- **Depth beats breadth.** Understanding one thing well is more useful than
  surface-level awareness of twenty things.
- **Your use cases, not the field.** You only need to be current on what you
  actually use or plan to use.
- **Skills compound; product rankings don't.** The ability to evaluate, test, and
  integrate new AI tools compounds across time. A skill you build this month pays
  off in every future release cycle.
- **It's okay to catch up later.** Not every release requires immediate attention.
  Waiting a few weeks often means better community reviews, documented edge cases,
  and real user feedback — more signal, less noise.

## The review habit

Every quarter, spend 30 minutes asking: which tools have I kept using? Which did I
drop? What changed my workflow? What sources have consistently been right? This
review is where the system improves itself.`,
      questions: [
        {
          prompt: "In the three-layer system, what's the purpose of the monthly 'deliberate exploration' layer?",
          options: [
            "To skim as many new AI tools as possible in a month",
            "To go deep on one topic — trying it hands-on and reading primary sources — to genuinely update your mental model",
            "To replace the weekly newsletter so you only need one habit",
          ],
          answer: 1,
          explanation:
            "Surface-level awareness of many tools is less useful than deep understanding of a few. The monthly exploration layer is where real learning and mental model updates happen.",
        },
        {
          prompt: "The feeling that you're 'falling behind' in AI is best understood as:",
          options: [
            "A personal failure to read enough",
            "A structural feature of a genuinely fast-moving field — it's normal, not personal",
            "A sign you should stop following AI news entirely",
          ],
          answer: 1,
          explanation:
            "Even full-time AI researchers feel behind at times. The pace is genuinely fast. A sustainable system means accepting you won't catch everything, and focusing on what matters to your work.",
        },
        {
          prompt: "Why is a quarterly review of your information system worth doing?",
          options: [
            "To find more sources to add",
            "To see which sources and tools actually delivered value — so the system gets more accurate over time",
            "To make sure you've read every major release",
          ],
          answer: 1,
          explanation:
            "The review loop is how a personal system compounds. Noticing what sources were right, what tools you kept, and what you dropped lets you prune noise and invest more in signal over time.",
        },
      ],
      explanation:
        "A three-layer system — passive daily awareness, weekly digest, monthly deep dive — gives you genuine currency without burnout. Review it quarterly and it improves itself.",
    },
  ],
};
