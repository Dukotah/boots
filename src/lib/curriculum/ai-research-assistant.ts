import type { Module } from "./types";

// AI as a Research Assistant — practical, conceptual module for anyone who
// wants to use AI to find, evaluate, and synthesize information more effectively.
// All quiz/reading lessons (no coding). Covers workflow, source evaluation,
// bias-checking, deep-dive prompting, and synthesizing across sources.
export const aiResearchAssistant: Module = {
  slug: "ai-research-assistant",
  title: "AI as a Research Assistant",
  description:
    "Learn to use AI as a genuine research partner: speed up literature reviews, interrogate sources, surface gaps, triangulate claims, and produce well-structured summaries — without being misled by confident-sounding hallucinations.",
  emoji: "🔬",
  gradient: "from-teal-500/20 to-cyan-500/10",
  tagline:
    "Use AI to research faster and smarter — find sources, evaluate evidence, spot bias, and synthesize findings across any domain.",
  keywords: [
    "AI research assistant",
    "how to use AI for research",
    "AI literature review",
    "research with ChatGPT",
    "research with Claude",
    "AI fact checking",
    "AI source evaluation",
    "AI for students",
    "AI for analysts",
  ],
  lessons: [
    {
      slug: "research-ai-strengths-and-limits",
      title: "What AI Can (and Cannot) Do for Research",
      blurb:
        "Know where AI shines and where it misleads so you invest trust wisely.",
      xp: 20,
      kind: "quiz",
      content: `# What AI Can (and Cannot) Do for Research

Before you recruit AI as a research partner, map its real capabilities — then you
can hand it the right tasks instead of the wrong ones.

## Where AI genuinely helps

- **Generating starting-point questions.** "What are the main debates in X?" surfaces
  angles you might not have considered.
- **Explaining concepts quickly.** Complex terminology, historical context, or
  competing theories become navigable in minutes.
- **Summarizing and restructuring.** Paste a long report and ask for a structured
  summary, a pros/cons list, or a comparison table.
- **Identifying search angles.** "What terms do researchers use for this?" helps you
  formulate better database queries on Google Scholar, PubMed, or similar.
- **Drafting and outlining.** First drafts of literature reviews, abstracts, or
  research notes can move at AI speed.

## Where it fails badly — and why

AI is a **pattern predictor**, not an archive. It has a training-data cutoff and
no live connection to databases (unless a tool explicitly adds web search). This
means:

- **It cannot reliably cite real papers.** It will produce plausible-sounding
  citations — authors, journals, volumes, page numbers — that are simply invented.
  This phenomenon is called *hallucination*, and it is especially dangerous in
  academic contexts.
- **It can be behind on recent events.** Anything after its knowledge cutoff may be
  absent, guessed at, or wrong.
- **It reflects training-data biases.** Topics with sparse or one-sided training
  coverage get correspondingly skewed summaries.

## The research rule of thumb

Use AI to **generate hypotheses and starting points**; use authoritative databases,
primary sources, and subject-matter experts to **verify them**. Never cite something
an AI told you without tracing it back to a real, retrievable source.`,
      questions: [
        {
          prompt:
            "A student asks an AI to list five peer-reviewed papers about sleep deprivation and memory. The AI produces five detailed citations with authors, journal names, and DOIs. What should the student do?",
          options: [
            "Trust the citations — AI cannot fabricate specific numbers like DOIs",
            "Verify each citation in a real database like PubMed or Google Scholar before using it",
            "Use the citations immediately; AI research assistants are connected to academic databases by default",
          ],
          answer: 1,
          explanation:
            "AI can and does fabricate DOIs, author names, and journal details with full confidence. Every citation must be traced to a real, retrievable source before being used in any research context.",
        },
        {
          prompt:
            "Which of these tasks is AI genuinely well-suited for in a research workflow?",
          options: [
            "Providing an up-to-the-minute count of publications on a topic from the last 30 days",
            "Generating a list of sub-questions and search angles to kick-start a literature review",
            "Guaranteeing that a summary of a report is free of bias",
          ],
          answer: 1,
          explanation:
            "Generating starting-point questions, angles, and terminology is exactly where AI excels. Real-time database access and bias-free summaries are not reliable AI capabilities.",
        },
        {
          prompt:
            "An analyst summarizes a niche technical topic using AI and notices the summary feels oddly one-sided. The most likely explanation is:",
          options: [
            "AI is deliberately deceiving the analyst",
            "The topic had sparse or one-sided coverage in the training data, skewing the output",
            "The analyst used the wrong model brand",
          ],
          answer: 1,
          explanation:
            "AI reflects the distribution of its training data. Niche or contested topics often have lopsided coverage in training corpora, which produces lopsided summaries. Cross-checking primary sources fixes this.",
        },
      ],
      explanation:
        "Map AI's real strengths (generating angles, explaining concepts, restructuring text) against its real limits (fabricated citations, stale knowledge, training bias). Then route tasks accordingly.",
    },
    {
      slug: "prompting-for-research-depth",
      title: "Prompting for Research Depth",
      blurb:
        "Layered, structured prompts pull out far richer analysis than a single vague question.",
      xp: 22,
      kind: "quiz",
      content: `# Prompting for Research Depth

A generic question gets a generic answer. Researchers need **depth, nuance, and
structure** — and you get those by crafting the prompt accordingly.

## Give AI a role and an audience

"You are a senior policy analyst. Summarize the evidence on X for a technically
literate audience that is skeptical of overstated claims." The role anchors the
register and the audience prevents fluff.

## Specify what you actually want

Rather than "tell me about climate tipping points," try:

- "List the five most frequently cited climate tipping points in the scientific
  literature, with a one-sentence description of each mechanism and why researchers
  are uncertain about the threshold."
- "Compare the position of the IPCC with that of its major critics on feedback loop
  timelines. Use a comparison table."
- "What are the strongest arguments *against* the mainstream view on X?"

## Use follow-up prompts aggressively

Research depth comes from iteration:

1. "Expand on point 3 — what does the evidence say?"
2. "Steelman the opposing view."
3. "What would a researcher who disagreed with this summary point out?"
4. "Identify the gaps: what does this summary leave out?"

## Ask for structure

Bullet points, numbered lists, comparison tables, and argument maps each reveal
different things. Explicitly requesting a format often improves clarity: "Give me
a table with columns: Claim | Evidence for | Evidence against | Confidence level."

## Set the calibration bar

Ask the AI to flag its own uncertainty: "Where are you confident, where are you
guessing, and what should I verify?" This single instruction dramatically improves
the signal-to-noise ratio.`,
      questions: [
        {
          prompt:
            "Which prompt will produce the most useful research output on a contested topic?",
          options: [
            "'Tell me about gene editing ethics.'",
            "'You are a bioethicist writing for a scientific journal. Summarize the three strongest arguments for and against germline gene editing, noting where expert consensus is thin. Flag anything I should verify independently.'",
            "'Gene editing ethics pros cons fast please'",
          ],
          answer: 1,
          explanation:
            "Role, audience, specific structure (three strongest arguments for/against), and a verification flag all sharpen the output dramatically. The vague prompt and the keyword-style query both leave the AI to guess what you need.",
        },
        {
          prompt:
            "After getting an AI summary, you suspect it has left out a key counterargument. The best follow-up is:",
          options: [
            "Accept the summary as complete — AI is thorough by default",
            "Ask: 'Steelman the opposing view' or 'What would a researcher who disagreed with this point out?'",
            "Start a brand-new chat and repeat the original question",
          ],
          answer: 1,
          explanation:
            "Iterative follow-up prompts are the research superpower. Asking AI to actively steelman alternatives or identify omissions surfaces the gaps that a first-pass summary misses.",
        },
        {
          prompt:
            "Why is it valuable to ask AI 'Where are you confident and where are you guessing?'",
          options: [
            "It has no value — AI is either right or wrong, not partly confident",
            "It signals which claims need independent verification, dramatically improving your research judgment",
            "It makes the AI produce shorter answers",
          ],
          answer: 1,
          explanation:
            "AI can distinguish between well-supported patterns in its training data and shakier extrapolations. Prompting it to surface that distinction lets you focus verification effort where it matters most.",
        },
      ],
      explanation:
        "Role, audience, explicit structure, aggressive follow-ups, and a calibration flag transform shallow answers into genuinely useful research inputs.",
    },
    {
      slug: "evaluating-ai-sourced-claims",
      title: "Evaluating Claims AI Gives You",
      blurb:
        "A claim is only as good as the source behind it — here is how to trace one.",
      xp: 22,
      kind: "quiz",
      content: `# Evaluating Claims AI Gives You

AI delivers claims at confidence levels that feel uniform — but the underlying
reliability varies wildly. Developing a fast, reliable evaluation habit is the
single most important skill in AI-assisted research.

## The claim triage framework

Sort every claim into one of three buckets:

1. **Verifiable facts** — dates, statistics, study results, legal texts, named
   people or organizations. *Must be traced to a primary source.*
2. **Conceptual explanations** — how a mechanism works, what a term means,
   how schools of thought differ. *Low-medium risk; cross-check if stakes are high.*
3. **Analysis and framing** — "the mainstream view is…", "critics argue…", "the
   most important factor is…". *Always verify framing with primary literature;
   AI inherits the biases of its training corpus.*

## Tracing a claim to a source

When AI makes a verifiable claim:

1. Ask it: "What is the primary source for this claim?"
2. Then go find that source yourself — in Google Scholar, PubMed, government
   databases, or official reports.
3. Check: Does the source actually exist? Does it say what the AI said it says?
   Are any numbers or dates quoted accurately?

## The danger of circular verification

Do not verify an AI claim by asking a *different* AI — both are drawing on
overlapping training data. You need a **primary or authoritative secondary source**
that exists independently of any AI system.

## Calibrated skepticism, not blanket rejection

The goal is not to distrust everything AI says. Conceptual explanations of
well-established fields are usually reliable starting points. The discipline
is in knowing *which* claims carry enough stakes to warrant the extra step.`,
      questions: [
        {
          prompt:
            "AI tells you: 'A 2021 WHO report found that X causes a 34% increase in Y.' How should you handle this claim?",
          options: [
            "Accept it — WHO statistics are too specific to be invented",
            "Ask AI for the source, then independently verify that the WHO report exists and contains that figure",
            "Verify it by asking a second AI model",
          ],
          answer: 1,
          explanation:
            "Specific statistics are high-hallucination territory. The verification step requires tracing back to the actual WHO document — not asking another AI, which shares training data and can repeat the same error.",
        },
        {
          prompt:
            "Which type of AI-provided content carries the lowest risk for a researcher to use as a starting point without immediate deep verification?",
          options: [
            "A specific statistic from a named study",
            "A conceptual explanation of how photosynthesis works in a well-established biology context",
            "An assertion that a specific law was passed on a specific date",
          ],
          answer: 1,
          explanation:
            "Well-established conceptual explanations (mechanisms, definitions, historical overviews of stable fields) tend to reflect reliable patterns in training data. Specific statistics, dates, and legal facts all require primary-source verification.",
        },
        {
          prompt:
            "Why is verifying a claim by asking a second AI model unreliable?",
          options: [
            "The second model is always less capable",
            "Both models draw on overlapping training data and can repeat the same hallucination",
            "You should verify with three AI models minimum, not just two",
          ],
          answer: 1,
          explanation:
            "AI models share large overlaps in training data. If one hallucinated a plausible-sounding claim, another trained on similar data may reproduce it. Only an independent, authoritative source breaks the cycle.",
        },
      ],
      explanation:
        "Triage every claim by type, trace verifiable ones to primary sources, and never use another AI as your verification step. Calibrated skepticism — not blanket rejection — is the working stance.",
    },
    {
      slug: "literature-review-workflow",
      title: "Building a Literature Review with AI",
      blurb:
        "Use AI to map a field, find search terms, and structure what you find — while keeping humans on citations.",
      xp: 25,
      kind: "quiz",
      content: `# Building a Literature Review with AI

A literature review is one of the most labor-intensive research tasks — and one
where AI can dramatically compress the early stages without compromising rigor,
*if* you use it correctly.

## Phase 1: Map the territory

Start by asking AI to orient you:

- "What are the major schools of thought on X?"
- "Who are the most-cited researchers in this area as of your training data?"
- "What terminology do researchers use for this concept? What are the synonyms
  used across disciplines?"

This gives you **a vocabulary and a map**, not a verified bibliography.

## Phase 2: Build your real search query

Take the terminology from Phase 1 into a real academic database — Google Scholar,
PubMed, JSTOR, ERIC, or domain-specific repositories. AI gave you the words;
the database gives you the actual papers.

Use AI to help refine search strings: "Translate this into a Google Scholar
advanced search query with Boolean operators."

## Phase 3: Use AI to process papers you've retrieved

Once you have real papers, AI becomes a powerful processor:

- Paste the abstract (or full text if it's short) and ask: "What is the main
  claim, methodology, and key limitation of this study?"
- "How does this paper's findings compare to [another paper]?"
- "Does this paper support or challenge the mainstream view you summarized earlier?"

## Phase 4: Synthesize under your editorial control

Use AI to draft a synthesis section — but you must read the underlying sources and
decide whether the synthesis is accurate. Treat the AI draft as an editable scaffold,
not a finished product.

## What never to outsource to AI

Deciding which sources are authoritative, catching methodological flaws in studies,
and making the final judgment calls about what the evidence means — these remain
human tasks. AI can surface; you must judge.`,
      questions: [
        {
          prompt:
            "In a literature review workflow, what is the correct role of AI in the citation-gathering phase?",
          options: [
            "Generate the full bibliography directly — AI citation output is reliable enough for academic use",
            "Provide terminology and search angles so you can run better queries in real academic databases",
            "Replace database searches entirely; AI has indexed all academic literature",
          ],
          answer: 1,
          explanation:
            "AI is excellent at producing vocabulary, synonyms, and search angles. The actual papers must come from real databases — PubMed, Google Scholar, JSTOR — because AI citation output is notoriously unreliable.",
        },
        {
          prompt:
            "You have retrieved a real paper from PubMed. How can you productively use AI at this stage?",
          options: [
            "Ask AI to write the final literature review section without you reading the paper",
            "Paste the abstract and ask AI to extract the main claim, methodology, and key limitation — then verify by reading",
            "Skip AI at this stage; it's only useful before you have real papers",
          ],
          answer: 1,
          explanation:
            "Once you have a real paper, AI is a powerful processing tool: extracting key points, comparing studies, checking alignment with prior summaries. But you validate those extractions against the actual text.",
        },
        {
          prompt:
            "Which tasks should always remain under the researcher's direct judgment and never be fully outsourced to AI?",
          options: [
            "Drafting a first-pass summary of an abstract",
            "Deciding which sources are authoritative and making final judgments about what the evidence means",
            "Generating Boolean search strings for database queries",
          ],
          answer: 1,
          explanation:
            "Evaluating source authority, spotting methodological flaws, and interpreting what evidence means are irreducibly human analytical tasks. AI can scaffold; the researcher must judge.",
        },
      ],
      explanation:
        "AI maps the territory and processes papers you retrieve; real databases supply the actual sources; and the researcher makes every judgment call about quality and meaning.",
    },
    {
      slug: "bias-and-blind-spots",
      title: "Spotting Bias and Blind Spots",
      blurb:
        "AI research summaries inherit the biases of their training data — here is how to detect and correct for them.",
      xp: 22,
      kind: "quiz",
      content: `# Spotting Bias and Blind Spots

Every AI research summary is a reflection of the text it was trained on. That
training data has a language, a geography, a time period, and a set of dominant
viewpoints — and your summaries inherit all of them.

## Common bias patterns in AI research output

**Publication bias.** Academic databases over-represent studies with significant
positive results. AI trained on those databases may present a more optimistic
picture of an intervention than the full evidence base supports.

**Anglophone and Western-centric bias.** Research published in English and produced
in North America or Europe dominates most training corpora. AI may be unaware of,
or systematically underweight, research from other regions.

**Recency and novelty bias.** Topics that generated a wave of online discussion
(tech, AI itself, certain health trends) are over-represented relative to their
actual evidence weight.

**Framing bias.** The way a topic is framed in mainstream sources gets absorbed
and reproduced. Ask about "illegal immigration" vs. "undocumented migrants" and
you may get subtly different framings from the same model.

## Practical detection moves

1. **Ask for the contrarian view directly.** "What would researchers who disagree
   with this summary argue? What evidence do they cite?"
2. **Ask about geographic and linguistic gaps.** "Is the evidence base predominantly
   from specific countries or institutions? What might be missing?"
3. **Ask about publication bias.** "Are there known null or negative results in
   this area that aren't well-represented?"
4. **Cross-check with a specialist.** Domain experts immediately spot when a
   summary over-represents one school of thought.

## Structural humility

The bias is not a bug unique to AI — human researchers carry the same biases.
AI just delivers them at greater speed and with more confidence, which is why
explicit bias-checking must become a habitual step, not an afterthought.`,
      questions: [
        {
          prompt:
            "An AI summary of clinical trial results on a new drug sounds very positive. What should a careful researcher consider?",
          options: [
            "AI only includes successful trials, so the summary is guaranteed to be accurate",
            "Publication bias means positive-result studies are over-represented; negative or null results may be absent from the summary",
            "Clinical trial data is always perfectly balanced in AI training data",
          ],
          answer: 1,
          explanation:
            "Publication bias is real in academic databases and inherited by AI. Trials with positive results are far more likely to be published and therefore over-represented in any AI summary. A complete picture requires actively seeking out null and negative results.",
        },
        {
          prompt:
            "You need a global perspective on childhood nutrition policy. What bias should you specifically probe for in an AI summary?",
          options: [
            "The summary is probably biased toward over-representing research from North America and Europe, and may miss non-English literature",
            "AI is globally neutral because it has been trained on data from every country equally",
            "The only relevant bias is time — older studies may be missing",
          ],
          answer: 0,
          explanation:
            "Most large-scale training corpora are dominated by English-language, Anglophone-institution sources. For a genuinely global policy topic, explicitly prompting for geographic gaps and seeking out regional databases is essential.",
        },
        {
          prompt:
            "Which prompt best helps a researcher detect framing bias in an AI-generated summary?",
          options: [
            "'Summarize this topic again but longer'",
            "'What would researchers who disagree with this framing argue? What language or terminology do they use?'",
            "'Who is the most famous expert on this topic?'",
          ],
          answer: 1,
          explanation:
            "Directly asking for the contrarian framing and alternative terminology forces AI to surface the discourse it may have under-weighted in its default summary, making the bias visible rather than invisible.",
        },
      ],
      explanation:
        "AI research output inherits publication bias, geographic skew, novelty bias, and framing bias from its training data. Explicit prompts for contrarian views, geographic gaps, and null results are the antidote.",
    },
    {
      slug: "synthesizing-across-sources",
      title: "Synthesizing Across Multiple Sources",
      blurb:
        "AI can weave findings from several documents into coherent themes — when you supply the documents.",
      xp: 25,
      kind: "quiz",
      content: `# Synthesizing Across Multiple Sources

Research synthesis — identifying where sources agree, where they conflict, and
what patterns emerge — is one of AI's most genuinely powerful research applications,
provided you supply the real source material.

## The paste-and-synthesize technique

Paste the key excerpts or abstracts from several real papers (or reports) and ask:

- "Across these four abstracts, what do the authors agree on? Where do they conflict?"
- "Summarize the methodological differences between these studies."
- "What theme is present in all three of these reports that I might use as a
  framework for my analysis?"

This approach sidesteps the hallucination problem because you are feeding the AI
the text — it is doing analysis on material *you* have verified, not inventing
sources.

## Handling contradictory findings

Research often contains genuine disagreement. When AI surfaces a conflict, prompt
further:

- "What might explain the different results between Study A and Study B?"
- "Is this a methodological difference, a definitional difference, or a genuine
  empirical contradiction?"
- "What study design would best resolve this conflict?"

## Building a synthesis matrix

Ask AI to produce a structured comparison:

"Create a table with columns: Author/Year | Main Claim | Methodology | Sample Size |
Key Limitation | Agrees or Disagrees with [Claim X]."

Then populate the table by pasting each abstract, one at a time. The result is an
analysis scaffold you could not produce as fast by hand.

## Staying in the driver's seat

Synthesis AI produces is a draft. You must verify that the characterization of each
paper's position is accurate — AI can misread tone, overstate certainty, or collapse
a nuanced position into a strawman. Read the sections AI cites and confirm they say
what the synthesis claims.`,
      questions: [
        {
          prompt:
            "What makes the 'paste-and-synthesize' technique more reliable than asking AI to summarize a research area from memory?",
          options: [
            "AI works faster when you paste text",
            "You supply verified source material, so AI is analyzing real content rather than potentially fabricating sources",
            "Pasted text bypasses the model's word limit",
          ],
          answer: 1,
          explanation:
            "When you supply the actual text, AI performs analysis rather than pattern-generating from training data. The hallucination risk drops because the source material exists and you have verified it.",
        },
        {
          prompt:
            "Two studies you retrieved reach contradictory conclusions about the same intervention. What is the most productive AI-assisted next step?",
          options: [
            "Discard both studies — contradiction means neither can be trusted",
            "Paste both abstracts and ask AI to identify whether the conflict is methodological, definitional, or a genuine empirical contradiction",
            "Ask AI which study is correct",
          ],
          answer: 1,
          explanation:
            "Contradiction is often diagnostic. Asking AI to categorize the nature of the disagreement (methodology, definitions, or real empirical difference) gives you a structured path forward — and the answer often points to what further evidence is needed.",
        },
        {
          prompt:
            "You ask AI to build a synthesis matrix from five abstracts you pasted. You receive a polished table. The critical next step is:",
          options: [
            "Submit the table as your final analysis — it came from real papers",
            "Read each characterization in the table against the actual abstract to confirm AI accurately represented each paper's position",
            "Ask AI to add more rows from its own knowledge",
          ],
          answer: 1,
          explanation:
            "AI can misread tone, collapse nuance, or overstate certainty even when working from real text. Each cell in the synthesis matrix should be cross-checked against the source. The table is a scaffold, not a finished product.",
        },
      ],
      explanation:
        "Supply real, verified source material and AI becomes a powerful synthesis engine. Use it to map agreements, contradictions, and themes — then verify every characterization against the original text.",
    },
    {
      slug: "research-assistant-capstone",
      title: "Capstone: Your Research Workflow",
      blurb:
        "Bring it all together: a repeatable, rigorous process for AI-assisted research on any topic.",
      xp: 25,
      kind: "quiz",
      content: `# Capstone: Your Research Workflow

You have covered the full toolkit. Let's close by assembling the pieces into a
repeatable workflow and testing your judgment on realistic scenarios.

## The five-stage AI research workflow (as of 2026)

**Stage 1 — Orient.** Use AI to map the field: major schools of thought,
contested claims, key terminology, and search angles. Treat the output as a
hypothesis about the landscape, not a verified map.

**Stage 2 — Search.** Take the terminology into real academic databases, official
reports, and primary sources. AI identifies what to look for; databases tell you
what actually exists.

**Stage 3 — Process.** Paste real papers and reports back to AI. Extract key
claims, methodologies, limitations, and comparisons. Verify each extraction
against the source text.

**Stage 4 — Check for bias.** Explicitly probe for publication bias, geographic
skew, framing bias, and missing perspectives. Ask for the contrarian view.

**Stage 5 — Synthesize under your control.** Use AI to produce a draft synthesis —
a comparison table, a themed summary, a structured outline. Then edit it yourself,
reading the primary sources to confirm every material claim.

## What good AI-assisted research looks like in practice

- The researcher is the decision-maker at every stage.
- AI accelerates the mechanical parts: mapping, processing, comparing, drafting.
- Every factual claim that matters is traceable to a primary source the researcher
  has personally inspected.
- The final output is something the researcher can fully defend — not a black box
  they trusted.

## The meta-skill

The most durable skill is calibration: knowing, for any given claim on any given
topic, how much verification effort is warranted. Not everything needs a primary
source check. High-stakes facts do. Building that judgment — and adjusting it as
AI capabilities and your domain knowledge evolve — is what separates effective
AI-assisted researchers from people who are merely fast.`,
      questions: [
        {
          prompt:
            "A journalist is writing an investigative piece on a pharmaceutical company. She used AI to build an initial research map, retrieved real documents from public databases, and processed them with AI assistance. She is about to publish. Which final check is most important?",
          options: [
            "Run the draft through another AI model to catch any remaining errors",
            "Personally trace every material factual claim in the piece to a primary source she has directly read",
            "Ask AI to evaluate whether the piece is balanced",
          ],
          answer: 1,
          explanation:
            "In high-stakes investigative work, every material claim must be traceable to a primary source the journalist has personally read. Another AI cannot substitute for this — it may reproduce the same errors. Final editorial responsibility is non-delegable.",
        },
        {
          prompt:
            "Which statement best describes the correct division of labor between AI and the researcher?",
          options: [
            "AI produces the research; the researcher's job is to format it nicely",
            "AI accelerates orientation, processing, and drafting; the researcher decides what is true, authoritative, and worth including",
            "The researcher should do all research manually — AI introduces too much risk at any stage",
          ],
          answer: 1,
          explanation:
            "AI is a powerful accelerant for the mechanical stages — not a replacement for researcher judgment. Deciding what is authoritative, what the evidence means, and what belongs in the final output are irreducibly human responsibilities.",
        },
        {
          prompt:
            "An AI summary on a medical topic seems authoritative and well-structured, but the stakes of acting on it are high. What distinguishes a skilled AI-assisted researcher's response from a naive one?",
          options: [
            "The skilled researcher accepts it because a well-structured summary signals accuracy",
            "The skilled researcher identifies which claims are high-stakes facts, traces those to primary sources, and checks for publication bias and geographic gaps before relying on the summary",
            "The skilled researcher rewrites the summary in their own words to make it their own",
          ],
          answer: 1,
          explanation:
            "Calibrated verification — knowing which claims warrant primary-source checks, and actively probing for bias — is the meta-skill of AI-assisted research. Structure and fluency are style, not accuracy. High-stakes facts always require independent verification.",
        },
      ],
      explanation:
        "Orient with AI, search real databases, process real sources with AI, check for bias, and synthesize under your own editorial control. Calibration — knowing how much verification each claim warrants — is the durable skill that makes all of this work.",
    },
  ],
};
