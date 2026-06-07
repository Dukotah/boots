import type { Module } from "./types";

// Advanced Prompt Patterns — a practical deep-dive for learners who already know
// how to use AI and want to move from "it sort of works" to reliably excellent
// results. All quiz/reading lessons: the concepts are the product, not the code.
export const aiPromptPatterns: Module = {
  slug: "ai-prompt-patterns",
  title: "Advanced Prompt Patterns",
  description:
    "Move from ad-hoc prompting to deliberate craft. Learn the patterns that separate power users from everyone else: role framing, chain-of-thought, few-shot examples, structured output, self-critique loops, and decomposition. Each pattern is explained, illustrated, and pressure-tested with real scenarios — then the capstone teaches you how to diagnose which pattern a situation calls for.",
  emoji: "🧠",
  gradient: "from-fuchsia-500/20 to-violet-500/10",
  tagline:
    "Master the prompt patterns that turn a capable AI into a reliable thinking partner — role framing, chain-of-thought, few-shot, structured output, and more.",
  keywords: [
    "advanced prompt engineering",
    "prompt patterns",
    "chain of thought prompting",
    "few-shot prompting",
    "role prompting",
    "structured output AI",
    "AI power user",
    "prompt design",
    "meta-prompting",
  ],
  lessons: [
    {
      slug: "role-framing",
      title: "Role Framing",
      blurb: "Give the model a persona and watch the quality ceiling rise.",
      xp: 20,
      kind: "quiz",
      content: `# Role Framing

Most prompts start with a task. The best prompts start with a **role**: a concise
statement of who the model is for this conversation, what it knows, and how it
should behave.

> "You are a senior technical writer who specialises in API documentation. You
> write for developers — precise, scannable, no marketing fluff."

That single sentence shifts everything that follows: vocabulary, tone, depth,
what the model chooses to include or omit. Without it, the model defaults to a
generic helpful assistant voice, which is fine for casual use and mediocre for
professional work.

**What makes a role effective?**

- **Expertise level** — "senior data scientist", "10-year emergency-room nurse",
  "junior copywriter still learning the craft" all produce different outputs.
- **Audience awareness** — "you write for non-technical executives" focuses the
  model on clarity over jargon.
- **Constraints and values** — "you never recommend an action without citing a
  specific risk" builds caution into every response.
- **Tone and style** — "direct, no hedging, bullet points preferred" eliminates
  filler prose.

Role framing works because the training data contains millions of examples of
experts writing in their domain. The role activates that cluster of patterns.

**One pitfall to avoid**: roles don't override facts. A role that says "you are
an expert who never admits uncertainty" will produce confidently wrong answers.
Build epistemic honesty into the role: "you flag when you're uncertain or when a
professional consultation is warranted."`,
      questions: [
        {
          prompt:
            "Why does assigning a specific role to the model improve output quality?",
          options: [
            "It gives the model access to a different, more accurate database",
            "It activates patterns from the model's training on how experts in that role actually write and reason",
            "It forces the model to be shorter and therefore more accurate",
          ],
          answer: 1,
          explanation:
            "LLMs learn from text produced by real experts. A role steers the model toward the vocabulary, depth, and style of that expert cluster — not a separate data source.",
        },
        {
          prompt:
            "You're generating medical summaries for patients. Which role framing is MOST appropriate?",
          options: [
            "You are an all-knowing medical AI that always gives definitive diagnoses.",
            "You are a clinical communicator who explains findings in plain language and always recommends the patient discuss specifics with their physician.",
            "You are a doctor — answer without caveats so patients aren't confused.",
          ],
          answer: 1,
          explanation:
            "Building epistemic honesty and a referral-to-professional habit into the role is critical for high-stakes domains. A role that forbids uncertainty will confidently hallucinate.",
        },
        {
          prompt:
            "A role that says 'you are a senior copywriter, direct and concise, bullet points preferred' is primarily controlling…",
          options: [
            "The factual accuracy of the response",
            "The tone, format, and communication style of the response",
            "Which version of the model runs behind the scenes",
          ],
          answer: 1,
          explanation:
            "Role framing shapes how the model communicates, not what facts it has access to. Accuracy still requires good context and verification.",
        },
      ],
      explanation:
        "A single role sentence is often worth more than a dozen lines of instructions — it shifts the model's entire register before you type your first task.",
    },
    {
      slug: "chain-of-thought",
      title: "Chain-of-Thought Prompting",
      blurb: "Ask the model to reason step by step before it answers.",
      xp: 25,
      kind: "quiz",
      content: `# Chain-of-Thought Prompting

Language models generate text sequentially — each token is influenced by what
came before. This means **making the model reason before it concludes** produces
better conclusions, because the reasoning steps it writes down actually shape what
it says next.

This is chain-of-thought (CoT) prompting. Instead of:

> "What's the right database index strategy for this schema?"

You write:

> "Think through the query patterns, read/write ratios, and cardinality of each
> column step by step, then recommend an indexing strategy."

Or even simpler: add **"Think step by step"** to any complex question. Research
consistently shows this phrase alone substantially improves accuracy on reasoning
tasks — not because the words are magic, but because they direct the model to
produce intermediate reasoning that feeds forward.

**When CoT helps most:**

- Multi-step math, logic, or planning problems
- Decisions with several competing factors
- Debugging — "trace through the execution step by step"
- Any task where the answer depends on a chain of inferences

**When CoT is overkill:**

- Simple, factual lookups ("What year was the Eiffel Tower built?")
- Single-step transformations ("Translate this sentence to Spanish")
- Situations where you need a short, direct answer and reasoning is noise

**Zero-shot vs few-shot CoT:** "Think step by step" is zero-shot — no examples
needed. For harder tasks, you can prime the pattern with one worked example that
itself shows step-by-step reasoning (see the Few-Shot lesson).

**Important caveat:** visible reasoning improves the *final answer* but doesn't
guarantee correctness. A chain of plausible-sounding steps can still reach a wrong
conclusion. Always sanity-check outputs on high-stakes problems.`,
      questions: [
        {
          prompt:
            "Why does asking a model to 'think step by step' improve accuracy on reasoning tasks?",
          options: [
            "It triggers a separate, slower reasoning engine inside the model",
            "The intermediate steps the model writes become context for subsequent tokens, improving the quality of the final conclusion",
            "It makes the model slower and therefore more careful",
          ],
          answer: 1,
          explanation:
            "Models generate text sequentially. When reasoning steps are written out, they influence what comes next — the conclusion is conditioned on the reasoning, not produced blindly.",
        },
        {
          prompt:
            "For which task is chain-of-thought prompting LEAST likely to add value?",
          options: [
            "Deciding which cloud architecture fits a set of requirements",
            "Translating a single sentence from English to French",
            "Debugging a subtle race condition by tracing execution order",
          ],
          answer: 1,
          explanation:
            "Single-step, low-complexity transformations don't benefit from explicit reasoning chains. CoT shines on multi-step inference and decisions; it's overkill (and adds noise) for simple lookups.",
        },
        {
          prompt:
            "A model produces a detailed, step-by-step argument that leads to a confident final answer. This means the answer is…",
          options: [
            "Guaranteed to be correct — the reasoning steps prove it",
            "More likely correct than a guess, but still requires sanity-checking on high-stakes problems",
            "Automatically verified against external databases",
          ],
          answer: 1,
          explanation:
            "CoT raises accuracy but doesn't guarantee it. A chain of plausible steps can still reach a wrong conclusion. Visible reasoning is a quality signal, not a proof.",
        },
      ],
      explanation:
        "Chain-of-thought is one of the highest-leverage prompt patterns: a single phrase can substantially improve reasoning quality, especially on multi-step problems.",
    },
    {
      slug: "few-shot-examples",
      title: "Few-Shot Examples",
      blurb: "Show, don't just tell — one or two worked examples beat a page of instructions.",
      xp: 22,
      kind: "quiz",
      content: `# Few-Shot Examples

Describing what you want is hard. Showing it is easy. That's the entire premise of
**few-shot prompting**: you provide one to five worked input→output pairs before
your actual request, and the model infers the pattern.

**Zero-shot** (no examples):

> "Classify customer feedback as Positive, Neutral, or Negative."
> Input: "The checkout was painless but the delivery was late."

**Few-shot** (two examples first):

> Input: "Fast shipping, exactly what I ordered." → Positive
> Input: "Wrong size sent. Never ordering again." → Negative
> Input: "The checkout was painless but the delivery was late." → ?

The model now has a concrete definition of your classification scheme — not your
words, but your *behavior*. It will match mixed-signal sentences to your example
"Neutral" precisely because you showed how you handle ambiguity, even if you never
explained your rule.

**What few-shot examples control:**

- **Format** — show it with a JSON object and it will respond in JSON; show it
  with a numbered list and it will number its list.
- **Tone and style** — one example email written in your brand voice is worth
  more than a paragraph telling it to "sound like us."
- **Decision boundaries** — where exactly Positive ends and Neutral begins.
- **Level of detail** — terse examples produce terse outputs; rich examples
  produce rich outputs.

**Selecting good examples:**

- Cover the edge cases, not just the easy ones.
- Use real examples from your own work when possible — they carry your actual
  style.
- 2–5 examples usually saturates the benefit; more rarely helps and wastes
  context.

**One pitfall**: if your examples are biased (all one label, one length, one
format), the model will pick up on that bias. Diversity in examples = diversity
in outputs.`,
      questions: [
        {
          prompt:
            "You want the model to classify support tickets using your team's proprietary categories. What's the most effective approach?",
          options: [
            "Write a detailed text description of what each category means",
            "Provide 3–5 example tickets with their correct labels before your actual request",
            "Use chain-of-thought and ask it to reason about categories from scratch",
          ],
          answer: 1,
          explanation:
            "Examples communicate your actual decision boundary — not your approximation of it in words. For proprietary or nuanced categories, a handful of real labeled examples beats any amount of description.",
        },
        {
          prompt:
            "You show the model three example API responses in JSON format, then ask it to produce a new one. The model will most likely…",
          options: [
            "Ignore the JSON examples and respond in plain prose",
            "Mirror the JSON structure and field names from your examples",
            "Ask you to confirm the schema before proceeding",
          ],
          answer: 1,
          explanation:
            "Few-shot examples strongly constrain format. The model treats your examples as implicit format instructions — JSON in, JSON out.",
        },
        {
          prompt:
            "You have 20 labeled examples available. How many should you include in a few-shot prompt?",
          options: [
            "All 20 — more examples always produce better results",
            "2–5, chosen to cover edge cases; beyond that the benefit rarely justifies the context cost",
            "Exactly 1, to keep the prompt as short as possible",
          ],
          answer: 1,
          explanation:
            "Returns on additional examples diminish sharply after a handful. Curate for coverage of tricky cases, not volume — extra examples waste token budget and can dilute the signal.",
        },
      ],
      explanation:
        "A few well-chosen examples are often more powerful than a paragraph of instructions. Show the model your taste; it will match it.",
    },
    {
      slug: "structured-output",
      title: "Structured Output & Format Control",
      blurb: "Guarantee parseable JSON, tables, or any schema — reliably.",
      xp: 22,
      kind: "quiz",
      content: `# Structured Output & Format Control

Getting AI into a production workflow often requires its output to be machine-
readable, not just human-readable. Structured output prompting closes that gap.

**The basic approach — declare the schema in your prompt:**

> "Respond ONLY with a JSON object matching this schema, no prose before or after:
> \`{ "summary": string, "sentiment": "positive"|"neutral"|"negative", "urgency": 1-5 }\`"

Models in 2026 follow explicit schemas well, especially when you:

1. Show the schema in the same format as the desired output (JSON looks like JSON,
   not a prose description of JSON).
2. Include a filled-in example if the structure is complex.
3. Say "no prose before or after" — otherwise the model may wrap the JSON in a
   friendly sentence, breaking your parser.

**Layered format control:**

Beyond JSON, you can control output structure in many ways:

- **Tables** — "respond with a Markdown table with columns: Feature | Our Product | Competitor"
- **Lists** — "return exactly 5 bullet points, no sub-bullets"
- **Fixed sections** — "use exactly these headers: ## Summary, ## Risks, ## Next Steps"
- **Length** — "under 100 words" or "3 sentences max"

**API-level structured output (2026):** Most major model APIs now offer a
\`response_format\` parameter that enforces a JSON schema at the infrastructure
level — the model is constrained to emit valid JSON matching the schema, not just
asked nicely. If you're calling an API directly, prefer this over prompt-only
enforcement for reliability.

**Common failure modes:**

- The model wraps JSON in a markdown code fence (\`\`\`json ... \`\`\`). Fix: add
  "do not wrap in a code fence" or strip the fence in your parser.
- Extra commentary before or after the JSON. Fix: "respond ONLY with the JSON object."
- Schema drift on long conversations. Fix: restate the schema in your final message
  if a multi-turn conversation has drifted.`,
      questions: [
        {
          prompt:
            "You ask the model for JSON output but it keeps wrapping the result in a markdown code fence. What's the simplest fix?",
          options: [
            "Switch to a different AI model that handles JSON better",
            "Add 'do not wrap in a code fence' to your prompt, or strip the fence in your parsing code",
            "Ask for XML instead, which models never wrap",
          ],
          answer: 1,
          explanation:
            "The fence is a formatting habit the model applies by default when it detects code. Explicitly prohibiting it — or stripping it downstream — resolves this reliably.",
        },
        {
          prompt:
            "For a production pipeline ingesting AI output, what gives the strongest guarantee of valid, schema-conforming JSON?",
          options: [
            "Prompt-only enforcement: 'respond only with JSON'",
            "API-level structured output / response_format parameter, which constrains the model at the infrastructure level",
            "Running the output through a grammar checker",
          ],
          answer: 1,
          explanation:
            "Prompt-only enforcement is probabilistic — the model usually complies but can drift. API-level schema enforcement constrains token generation itself, making invalid JSON structurally impossible to emit.",
        },
        {
          prompt:
            "In a long multi-turn conversation, the model has started deviating from the JSON schema you set up at the start. Best practice?",
          options: [
            "Start a brand new conversation from scratch",
            "Restate the schema in your next message to re-anchor the model's format",
            "Accept the drift and adjust your downstream parser each time",
          ],
          answer: 1,
          explanation:
            "Long conversations dilute early instructions as they move further from the current context window focus. Restating format constraints periodically is a practical fix without losing conversational history.",
        },
      ],
      explanation:
        "Structured output transforms AI from a conversational tool into a reliable pipeline component. Declare the schema, forbid prose wrappers, and prefer API-level enforcement when building production systems.",
    },
    {
      slug: "self-critique-loops",
      title: "Self-Critique & Iterative Refinement",
      blurb: "Make the model review its own answer before you read it.",
      xp: 23,
      kind: "quiz",
      content: `# Self-Critique & Iterative Refinement

A single prompt-response cycle is rarely the best the model can do. Self-critique
prompting adds a second (or third) pass where the model evaluates and improves its
own output — all within one conversation or even one prompt.

**Two-pass pattern (separate messages):**

1. First message: generate a draft. "Write a product positioning statement for…"
2. Second message: "Review that positioning statement. Identify any claims that are
   vague, unprovable, or that competitors could also make. Then rewrite it, fixing
   every issue you found."

The rewrite is almost always stronger because the model approaches it with a
critic's eye — noticing what it glossed over the first time.

**One-prompt self-critique:**

> "Write a persuasive email about X. Then, wearing a skeptic's hat, list the three
> weakest points in your email. Finally, rewrite the email addressing those
> weaknesses."

All in a single prompt — the model produces draft, critique, and revision in one
shot.

**Assigning a critic persona:**

You can make the critique more rigorous by giving it a specific lens:

- "Critique this as a lawyer looking for liability risk"
- "Critique this as a confused 14-year-old who doesn't know the jargon"
- "Critique this as a competitor trying to poke holes in our argument"

**Why it works:** The generation and critique tasks activate different patterns.
Writing tends toward fluency and completion; critique tends toward gap-finding.
Forcing both produces outputs that pass a higher bar before they reach you.

**Limits:** Self-critique can't catch what the model doesn't know it doesn't know.
It will notice vagueness and logical gaps, but it won't catch factual errors it
believes are true. External verification still matters for facts.`,
      questions: [
        {
          prompt:
            "You ask the model to write a business proposal, then in a follow-up ask it to 'identify the three weakest arguments in that proposal and rewrite it fixing them.' This is an example of…",
          options: [
            "Few-shot prompting",
            "Self-critique and iterative refinement",
            "Chain-of-thought prompting",
          ],
          answer: 1,
          explanation:
            "Having the model review and improve its own output is self-critique. It shifts the model from generation mode (fluency-focused) to evaluation mode (gap-finding), producing a stronger result.",
        },
        {
          prompt:
            "What does self-critique reliably catch that standard single-pass prompting often misses?",
          options: [
            "Factual errors the model believes to be true",
            "Vague claims, logical gaps, and weak arguments in its own output",
            "Hallucinated citations",
          ],
          answer: 1,
          explanation:
            "Self-critique is excellent at surface-level argumentation quality: spotting vagueness, unsupported claims, and structural weaknesses. It cannot catch factual errors it genuinely believes, which is why external verification still matters.",
        },
        {
          prompt:
            "You want the model to critique a customer-facing explanation 'as a confused first-time user who doesn't know the jargon.' This technique is called…",
          options: [
            "Role-based critique — assigning a specific evaluator persona to focus the critique",
            "Zero-shot chain-of-thought",
            "Structured output enforcement",
          ],
          answer: 0,
          explanation:
            "Giving the critic a specific persona focuses the critique on a particular failure mode — in this case, clarity and jargon. It's the same role-framing principle applied to the evaluation pass.",
        },
      ],
      explanation:
        "Build a second pass into your workflow. Whether you do it in a follow-up message or a single prompt, self-critique consistently raises the quality ceiling before the output reaches you.",
    },
    {
      slug: "task-decomposition",
      title: "Task Decomposition",
      blurb: "Break complex work into steps the model can handle reliably, one at a time.",
      xp: 22,
      kind: "quiz",
      content: `# Task Decomposition

Complex tasks fail not because the model is incapable, but because a single large
prompt asks it to hold too many constraints in mind simultaneously. **Decomposition**
splits the work into a sequence of focused sub-tasks, each with a clear input and
output.

**Example — writing a technical blog post:**

Instead of: "Write a 1,500-word technical blog post about vector databases for an
audience of senior engineers, including an intro, three use-case sections, code
examples, and a conclusion with recommendations."

Do it in stages:

1. "List five concrete use cases for vector databases that would resonate with
   senior engineers. Just the list, no prose."
2. "Pick the three strongest from this list and write a one-paragraph pitch for
   each."
3. "For use case #2, write the full section: context, how vector search applies,
   a pseudocode example, and a real-world analogy."
4. (Repeat for the other sections)
5. "Write an intro and conclusion that frames the three sections I'll paste."
6. Assemble.

**Why decomposition works:**

- Each sub-task gets the model's full attention without context interference from
  other requirements.
- You can review and correct at each stage before it compounds.
- You can swap in your own content, reroute mid-flow, or stop early.
- Errors stay local — a weak section 2 doesn't corrupt section 3.

**When to decompose:**

- Outputs longer than ~600 words that need structural coherence
- Multi-step reasoning where each step feeds the next
- Workflows combining research, synthesis, and formatting
- Any task where a bad early assumption would poison the whole answer

**When NOT to decompose:** Simple tasks done end-to-end are faster and waste less
context. Decomposition has overhead; use it when complexity justifies it.`,
      questions: [
        {
          prompt:
            "You ask the model to research, outline, write, and format a 10-page report in one prompt. The output is unfocused and misses several requirements. The most likely cause is…",
          options: [
            "The model has a bug when handling long outputs",
            "Too many competing constraints in a single prompt — the model can't hold all of them with equal attention",
            "You didn't use enough technical jargon in the prompt",
          ],
          answer: 1,
          explanation:
            "Complex single prompts dilute attention across all constraints simultaneously. Decomposing the task lets each sub-step get the model's full focus and allows you to catch errors before they propagate.",
        },
        {
          prompt:
            "Which is the PRIMARY advantage of reviewing output at each decomposition step instead of at the end?",
          options: [
            "It forces the model to be more creative in later steps",
            "Errors stay local — a bad early step doesn't corrupt everything downstream",
            "It reduces the total number of tokens used in the session",
          ],
          answer: 1,
          explanation:
            "In a pipeline, errors compound. Catching and correcting a weak section 2 before it informs section 3 keeps quality consistent throughout — you're not rewriting everything because of one early mistake.",
        },
        {
          prompt:
            "For which task is decomposition LEAST justified?",
          options: [
            "Drafting a 15-section technical specification with interdependent sections",
            "Asking the model to translate a single paragraph from English to Japanese",
            "Building a multi-step research synthesis combining five different source documents",
          ],
          answer: 1,
          explanation:
            "Single-step, low-complexity tasks have no need for decomposition — the overhead costs more than it saves. Decomposition earns its keep on long, structurally complex work.",
        },
      ],
      explanation:
        "Complex tasks broken into focused steps consistently outperform the same task in one big prompt. Decompose when complexity justifies it; stay end-to-end when it doesn't.",
    },
    {
      slug: "capstone-pattern-selection",
      title: "Capstone: Choosing the Right Pattern",
      blurb: "Put it all together — diagnose a prompt problem and prescribe the right pattern.",
      xp: 25,
      kind: "quiz",
      content: `# Capstone: Choosing the Right Pattern

You've covered six core prompt patterns. The real skill isn't knowing each one
individually — it's **recognising which pattern (or combination) a given situation
calls for**.

Here's a quick decision map:

| Problem you're experiencing | Pattern to reach for |
|---|---|
| Output has the wrong tone, depth, or voice | **Role framing** |
| Model reaches a wrong answer on a complex reasoning problem | **Chain-of-thought** |
| Model doesn't match your exact format, style, or categories | **Few-shot examples** |
| Output isn't parseable / integration keeps breaking | **Structured output** |
| First draft is almost good but has fixable gaps | **Self-critique** |
| Output is incoherent or misses requirements at scale | **Decomposition** |

**Patterns compound.** A production-grade prompt for a complex task often uses
several at once:

1. **Role** — set the expert persona and tone.
2. **Decompose** — split the task into manageable sub-tasks.
3. **CoT** — instruct each sub-task to reason before concluding.
4. **Few-shot** — anchor format and style with examples.
5. **Structured output** — enforce a parseable schema on final results.
6. **Self-critique** — have the model review its own output before you consume it.

**The meta-skill: prompt iteration.** Even experts rarely write a perfect prompt
first try. The practice is:

1. Write a reasonable prompt and run it.
2. Identify the specific failure mode in the output.
3. Map that failure to a pattern.
4. Apply the pattern and compare.
5. Repeat until the output consistently meets the bar.

**What distinguishes a prompt engineer from a prompt user** is not knowing more
tricks — it's the habit of diagnosing failures precisely and applying targeted
fixes instead of rewriting everything and hoping for better luck.

As of 2026, the models themselves keep improving, which gradually automates the
routine prompting work. That makes the meta-skill — **deliberate diagnosis and
targeted pattern application** — more valuable, not less: the humans who stay
ahead are the ones who understand *why* a prompt works, not just that it does.`,
      questions: [
        {
          prompt:
            "Your AI integration keeps breaking because the model sometimes adds a friendly sentence before the JSON. Which single pattern most directly fixes this?",
          options: [
            "Chain-of-thought — ask the model to think through the schema step by step",
            "Structured output — explicitly instruct 'respond ONLY with the JSON object, no prose before or after'",
            "Self-critique — ask the model to review its JSON for errors",
          ],
          answer: 1,
          explanation:
            "The failure mode is format pollution — extra prose surrounding the target output. Structured output constraints (prompt-level or API-level) directly address this.",
        },
        {
          prompt:
            "A model produces a technically correct but flat, generic analysis that doesn't match your firm's sharp, opinionated style. The most targeted fix is…",
          options: [
            "Role framing — assign a specific expert persona that carries your firm's voice and values",
            "Decomposition — break the analysis into smaller tasks",
            "Chain-of-thought — ask it to reason step by step",
          ],
          answer: 0,
          explanation:
            "Tone and voice problems are role problems. Decomposition and CoT fix structural and reasoning issues, not stylistic register — that's what role framing is for.",
        },
        {
          prompt:
            "As AI models improve over time, the skill of advanced prompting becomes…",
          options: [
            "Irrelevant — models will write their own perfect prompts",
            "More valuable, because diagnosing *why* a prompt fails and applying targeted fixes is a durable, transferable skill that compounds with model capability",
            "Less important than knowing which model to subscribe to",
          ],
          answer: 1,
          explanation:
            "Better models raise the ceiling; deliberate prompting lets you reach it. The meta-skill of precise diagnosis and pattern selection compounds with model capability rather than being replaced by it.",
        },
      ],
      explanation:
        "You now have a toolkit of six patterns and, more importantly, a diagnostic habit: see the failure mode, name the pattern, apply it, measure. That loop is what separates a prompt engineer from someone who just types at an AI.",
    },
  ],
};
