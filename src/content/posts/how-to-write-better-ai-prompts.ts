// Long-tail SEO post targeting "how to write better AI prompts" / "prompt writing
// techniques". 10 specific, actionable techniques. Links to /paths/work-with-ai,
// /learn/ai-for-everyone, /learn/vibe-coding, /learn.

import type { BlogPost } from "../blog";

const post: BlogPost = {
  slug: "how-to-write-better-ai-prompts",
  title: "How to Write Better AI Prompts (10 Techniques)",
  description:
    "Ten concrete techniques for writing AI prompts that get useful results — with before/after examples for each. Works with Claude, ChatGPT, Gemini, and other major LLMs.",
  date: "2026-06-07",
  readingMinutes: 11,
  tags: ["ai", "prompting", "tools", "productivity"],
  body: `The gap between a mediocre AI output and a genuinely useful one is almost always in the prompt, not the model. Better prompts produce dramatically better results — and the techniques aren't complicated. Here are ten that work across Claude, ChatGPT, Gemini, and most other large language models.

## Why prompting matters more than most people think

AI models don't read your mind. They respond to exactly what you wrote, filling in gaps with their best statistical guess at what you probably meant. A vague prompt gets a vague answer. A precise prompt that specifies role, context, format, and constraints gets something you can actually use.

Most people improve their prompting dramatically within a few weeks of deliberate practice. The techniques below give you a framework to accelerate that.

---

## Technique 1: Assign a role

Tell the model who it is before you ask it anything.

**Weak:** "Give me feedback on this marketing email."

**Better:** "You are a direct-response copywriter with 10 years of B2B SaaS experience. Give me feedback on this marketing email. Focus on whether the value proposition is clear and whether the CTA is strong."

Why it works: the role shapes how the model frames its response — the vocabulary it uses, the criteria it applies, the level of depth it targets.

## Technique 2: Specify the audience

Tell the model who will read or use the output.

**Weak:** "Explain how APIs work."

**Better:** "Explain how APIs work to a non-technical marketing manager who needs to understand what the engineering team is building, but has no programming background."

Why it works: the same topic explained to different audiences needs different language, analogies, and depth. Without knowing the audience, the model makes a guess that's often wrong.

## Technique 3: Define the exact output format

Describe what you want back — length, structure, format, style.

**Weak:** "Write a job description for a senior engineer role."

**Better:** "Write a job description for a senior backend engineer role. Format: one paragraph about the company (3 sentences), a bulleted list of 5-7 responsibilities, a bulleted list of 4-6 required qualifications, and one sentence about compensation. Total length: under 400 words. Tone: direct and specific, not corporate."

Why it works: without format guidance, models default to generic structures. Format constraints produce outputs that actually fit where you need to put them.

## Technique 4: Provide an example

Show the model what a good response looks like, even briefly.

**Weak:** "Write a product description for noise-canceling headphones."

**Better:** "Write a product description for noise-canceling headphones in the same style as this example: [paste an example you like]. Same tone and length."

Why it works: examples dramatically reduce the model's uncertainty about what you want. A single well-chosen example often does more than a paragraph of instructions.

## Technique 5: Set explicit constraints

State what the output should and shouldn't include.

**Weak:** "Summarize this document."

**Better:** "Summarize this document in exactly 150 words. Include the three most important conclusions. Do not include background context from the first two sections — assume the reader already knows it."

Why it works: constraints prevent common failure modes — outputs that are too long, include irrelevant sections, or miss the specific thing you cared about. Think of constraints as fences, not walls.

## Technique 6: Ask for reasoning, not just answers

When accuracy matters, ask the model to show its work.

**Weak:** "Is this business plan viable?"

**Better:** "Evaluate this business plan for viability. For each major assumption, state whether it seems reasonable, what evidence supports it, and what would have to be true for it to be wrong. Then give your overall assessment."

Why it works: asking for reasoning makes errors easier to spot. A model that explains its logic is easier to verify and correct than one that just states conclusions. For any output where the reasoning matters, make showing it mandatory.

## Technique 7: Iterate, don't just start over

Treat AI output as a first draft, not a final answer.

After you get a response, follow up:
- "Make this more concise. Cut at least 30%."
- "This paragraph is unclear — rewrite it more directly."
- "Add a section on [specific gap]."
- "Rewrite this in a less formal tone."

Why it works: the model holds context across the conversation. Follow-up prompts let you sculpt the output incrementally rather than trying to write a perfect prompt on the first attempt. Most genuinely useful AI outputs come from three to five iterations, not one.

## Technique 8: Tell it to be critical

When you want honest evaluation, ask for it explicitly.

**Weak:** "Is my plan good?"

**Better:** "Review this plan and tell me what's wrong with it. Be direct. I want the three most significant weaknesses, even if they're uncomfortable to hear. Don't soften it."

Why it works: AI models are trained to be helpful, which makes them prone to affirmation. If you ask "does this seem right?" you'll often get yes. If you ask "what's wrong with this?" you'll get a different and more useful answer.

## Technique 9: Use the "step back" prompt for complex reasoning

For tasks requiring careful analysis, ask the model to reason before answering.

**Weak:** "Should we expand into the European market?"

**Better:** "Before answering whether we should expand into the European market, think through: what information would be necessary to make this decision, what assumptions would undermine it, and what the strongest argument against expansion would be. Then give your recommendation."

Why it works: forcing the model to reason from first principles — rather than pattern-matching to a familiar answer — produces more careful analysis and surfaces considerations you might miss.

## Technique 10: Give context about the situation

The more the model knows about your actual situation, the more useful its response.

**Weak:** "Write me a cold email."

**Better:** "Write me a cold email to the VP of Operations at a mid-size manufacturing company. I'm selling project management software. We have two customers in their industry with measurable results. Our differentiator is that implementation takes two weeks, not three months. The recipient doesn't know me. The goal is a 20-minute discovery call."

Why it works: context collapses ambiguity. Every sentence of specific context eliminates a class of generic responses.

---

## How these techniques work together

The strongest prompts combine several of these techniques. A good framework for any important task:

1. **Role** — who is the AI in this situation?
2. **Context** — what's the situation, what do I know, what does the reader know?
3. **Audience** — who is this output for?
4. **Task** — what exactly do I want?
5. **Format** — how should it be structured?
6. **Constraints** — what should and shouldn't be included?

Not every prompt needs all six. A quick task might only need two or three. But for anything important, running through the list takes 30 seconds and often doubles the quality of the output.

Cantrip's [Work with AI path](/paths/work-with-ai) is built around exactly this kind of guided, practical iteration — not just reading about prompting but practicing it on real tasks with feedback. The [AI for Everyone module](/learn/ai-for-everyone) is the right starting point if you're newer to AI tools. Both are free to start on [Cantrip](/learn).

---

## Frequently asked questions

### Do these techniques work for coding prompts too?

Yes. For coding specifically, the most important techniques are: give it the error message when debugging (technique 10 — context), ask it to explain its reasoning (technique 6), and iterate to improve the solution (technique 7). The [vibe coding module](/learn/vibe-coding) on Cantrip covers AI coding prompts in depth.

### Does it matter which AI I use — Claude, ChatGPT, Gemini?

The techniques work across all of them. There are minor differences: Claude tends to be more precise about following formatting instructions; ChatGPT integrates well with browsing and code execution; Gemini is strongest on Google Workspace content. For most general tasks, the prompt quality matters more than which model you pick.

### Is there a downside to writing very long prompts?

Very long prompts with conflicting or redundant instructions can confuse the model. More important than length is clarity and specificity. A 50-word precise prompt usually beats a 300-word vague one.

### How do I get faster at prompting?

Practice on real tasks, not hypothetical ones. Pick tasks you actually do every week and use AI for them deliberately. After each output, ask yourself: what was vague in my prompt that led to this gap? Iterate. Twenty real-task iterations will teach you more than reading ten articles. The [Work with AI path](/paths/work-with-ai) provides structured practice if you want a faster ramp.

### Should I save prompts that work well?

Absolutely. When you find a prompt that consistently produces useful output for a recurring task — summarizing meeting notes, drafting a specific kind of email, reviewing code for a certain issue — save it. That becomes your prompt library, and it's one of the highest-leverage things you can build as an AI user.`,
};

export default post;
