import type { Module } from "./types";

// Build Custom AI Assistants — for someone who can use chatbots and wants to
// build reusable, configured assistants for recurring tasks. All quiz/reading
// lessons; no coding required.
export const aiCustomAssistants: Module = {
  slug: "ai-custom-assistants",
  title: "Build Custom AI Assistants",
  description:
    "Stop re-explaining yourself to AI every single time. Learn to build reusable custom assistants — with tailored instructions, injected knowledge, and a consistent personality — that handle recurring jobs the way you want them handled, every time.",
  emoji: "🧩",
  gradient: "from-indigo-500/20 to-violet-500/10",
  tagline:
    "Design AI assistants that know your context, follow your rules, and get better with each iteration.",
  keywords: [
    "custom AI assistant",
    "Custom GPT",
    "Claude Projects",
    "system prompt",
    "AI agent design",
    "AI workflow automation",
    "prompt engineering",
  ],
  lessons: [
    {
      slug: "what-is-a-custom-assistant",
      title: "What Is a Custom Assistant?",
      blurb: "One-off prompts vs. configured assistants — why the difference matters for recurring work.",
      xp: 20,
      kind: "quiz",
      content: `# What Is a Custom Assistant?

Every time you open a fresh chat with an AI, it knows nothing about you: your name,
your job, your preferences, your standards. You start from scratch. For a quick
one-off question, that's fine. For work you do repeatedly, it's unnecessary friction.

**A custom assistant is a configured version of an AI model** — one you've given
a specific identity, a set of instructions it always follows, and sometimes
background knowledge it always has access to. You do the setup once; every
conversation that uses it starts already "briefed."

## Where custom assistants live

Different platforms call them different things, but the concept is the same:

- **OpenAI's Custom GPTs** — built in ChatGPT, shareable via a link.
- **Claude Projects** — a workspace in Claude where you write persistent
  instructions and upload context files; every conversation in that project
  inherits them.
- **System prompts via API** — if you're using AI through a developer interface
  or third-party app, the "system prompt" is the invisible set of instructions
  that frames every interaction.
- **Saved "memory" or "custom instructions" features** — most major platforms
  now have some version of user-level preferences that persist across chats.

## What they're actually doing

All of these boil down to the same mechanism: some text is injected at the start
of every conversation, before you say a word. That text tells the model who it is,
what it should focus on, how it should respond, and what constraints it should
follow. You write that text; the model reads and follows it.

The skill of building a great custom assistant is the skill of writing that text
well — which the rest of this course teaches you.`,
      questions: [
        {
          prompt: "What is the fundamental mechanism behind every custom assistant, Custom GPT, or Claude Project?",
          options: [
            "A separate AI model trained specifically for your use case",
            "A block of instructions injected at the start of every conversation that tells the model how to behave",
            "A recording of previous conversations the AI replays",
          ],
          answer: 1,
          explanation:
            "All forms of custom assistants — Custom GPTs, Claude Projects, system prompts — work by prepending your written instructions to every conversation. The base model is the same; the framing changes its behavior.",
        },
        {
          prompt: "When does a custom assistant provide the most value over a plain chat?",
          options: [
            "For one-time questions you'll never ask again",
            "For recurring tasks where you'd otherwise re-explain your context, role, preferences, and standards every single time",
            "When you want the AI to forget everything after each session",
          ],
          answer: 1,
          explanation:
            "Setup cost is fixed; the benefit compounds every time you use it. Custom assistants pay off for work you do more than once — especially if context, tone, or constraints are consistent across sessions.",
        },
        {
          prompt: "Which of these is NOT a form of custom assistant configuration?",
          options: [
            "A system prompt in an API-based app",
            "Claude's persistent project instructions",
            "The model's training data from before it was released",
          ],
          answer: 2,
          explanation:
            "Training data is baked into the model and can't be changed by users. System prompts, project instructions, and custom GPT configurations are all user-controlled layers that sit on top of the base model.",
        },
      ],
    },
    {
      slug: "designing-a-great-system-prompt",
      title: "Designing a Great System Prompt",
      blurb: "Identity, task, constraints, tone: the four pillars of instructions that actually work.",
      xp: 25,
      kind: "quiz",
      content: `# Designing a Great System Prompt

The system prompt — the instructions your assistant always follows — is the most
important design decision you'll make. A weak one produces generic, inconsistent
output. A strong one makes the assistant feel like it was built specifically for
your work.

## The four pillars

**1. Identity — who is this assistant?**
Give it a clear role. "You are a sharp, no-fluff copy editor" is better than
"You help with writing." A specific identity constrains behavior in all the right
ways: tone, priorities, what it pushes back on.

**2. Task — what does it primarily do?**
State the core job clearly. What input does it receive? What should it produce?
What does a great output look like versus a mediocre one?

**3. Constraints — what should it never do?**
Explicit constraints are as important as explicit permissions. "Never invent
statistics," "Don't rewrite the user's voice unless asked," "Always ask for
context before giving legal or medical information."

**4. Tone and format — how should it respond?**
Should it be terse or expansive? Use bullet points or prose? Confirm before
proceeding, or just do it? Defaults here save enormous back-and-forth.

## Common mistakes

- **Too short**: "You are a helpful assistant for my business." Every AI is
  already this. It tells the model nothing useful.
- **Too long and contradictory**: instructions that conflict produce inconsistent
  behavior. Resolve contradictions before you write them in.
- **All rules, no judgment**: a great prompt gives the AI enough context to make
  sensible decisions in cases you didn't anticipate, not just a rigid rulebook.

## A template to start from

> You are [specific role] for [context]. Your primary job is [core task].
> Always [key behavior]. Never [key constraint]. Respond in [format/tone].
> When unsure, [default behavior].

Fill in those blanks with specifics and you have a working first draft.`,
      questions: [
        {
          prompt: "Which system prompt opening is most likely to produce consistent, specific behavior?",
          options: [
            "'You are a helpful AI assistant.'",
            "'You are a terse technical writer who turns dense documentation into clear, scannable how-to guides for non-technical readers. Never use jargon without immediately defining it.'",
            "'Do your best with whatever the user sends you.'",
          ],
          answer: 1,
          explanation:
            "A specific role, a defined output format, a target audience, and one clear constraint give the model everything it needs to behave consistently. Vague openers give it nothing to anchor to.",
        },
        {
          prompt: "Why are explicit constraints ('never do X') as important as instructions about what to do?",
          options: [
            "They are not important — models always know what not to do",
            "They prevent the model from defaulting to behaviors that are natural for a general assistant but wrong for your specific use case",
            "They make the prompt longer, which always improves quality",
          ],
          answer: 1,
          explanation:
            "Base models are trained to be maximally helpful in a general sense. Explicit constraints override those defaults for your specific context — 'don't invent statistics' is different from what a general assistant would do when pressed.",
        },
        {
          prompt: "What's wrong with a system prompt that has many detailed rules but little context about who the assistant is and what 'good' looks like?",
          options: [
            "Nothing — more rules always mean better behavior",
            "The model can't make sensible judgment calls in unanticipated situations; it will either refuse or produce inconsistent output at the edges",
            "It makes the assistant faster",
          ],
          answer: 1,
          explanation:
            "Rules cover the cases you imagined; context and a clear sense of 'good output' helps the model navigate the cases you didn't. Both are necessary.",
        },
      ],
    },
    {
      slug: "giving-it-knowledge",
      title: "Giving Your Assistant Knowledge",
      blurb: "Upload files, paste context, and understand what the model actually does with it.",
      xp: 20,
      kind: "quiz",
      content: `# Giving Your Assistant Knowledge

A custom assistant can be told *how* to behave. It can also be given *what to know*:
documents, reference material, your company's style guide, product specs, a FAQ —
anything you'd hand to a new hire on their first day.

## How knowledge injection works

Most platforms support some version of this:

- **File uploads in Claude Projects** — PDF, text, code, or document files you
  upload sit in the project's knowledge base. Every conversation can reference them.
- **Custom GPT knowledge files** — similar: uploaded files become searchable
  context the GPT can draw on.
- **Pasting context into the system prompt** — for shorter reference material,
  you can simply paste it directly into your instructions. A style guide, a list
  of approved responses, a glossary — anything under a few thousand words fits
  comfortably here.

## What the model does with it

It doesn't "memorize" files the way you memorize a phone number. It reads them
as part of the context window — the block of text it processes when generating
a response. Treat it like handing someone a document to consult, not something
they've internalized.

Practical implications:

- **Be specific about how to use the material.** "When answering support questions,
  always check the uploaded FAQ first before composing an answer" is better than
  just uploading the FAQ and hoping for the best.
- **Shorter, cleaner documents work better.** Dense, poorly formatted files are
  harder for the model to extract useful information from.
- **Stale knowledge is a real risk.** Files you uploaded six months ago may no
  longer be accurate. Decide on a review cadence and stick to it.

## What knowledge injection can't do

- It can't give the model real-time information (prices, live inventory, today's
  news) unless you're using a tool that fetches live data.
- It can't guarantee the model will always surface the right part of a large
  document. For critical workflows, test edge cases.`,
      questions: [
        {
          prompt: "When you upload a document to a Claude Project or Custom GPT, what is the model actually doing with it?",
          options: [
            "Permanently memorizing every word, like a database lookup",
            "Reading it as part of its context window — consulting it when generating responses, rather than internalizing it",
            "Ignoring it unless you explicitly copy-paste from it in each message",
          ],
          answer: 1,
          explanation:
            "Uploaded files extend the context the model can draw on, not its permanent memory. It's closer to 'handing someone a document to reference' than 'teaching them a fact they'll always know.'",
        },
        {
          prompt: "You upload a product FAQ to your support assistant but get inconsistent results. What's the most effective fix?",
          options: [
            "Upload the file multiple times so the model reads it more",
            "Add an explicit instruction in the system prompt: 'Always check the uploaded FAQ first before composing any support reply'",
            "Shorten all your user queries to force the model to use the document",
          ],
          answer: 1,
          explanation:
            "The model needs to be told how to use knowledge, not just given it. Explicit instructions about when and how to consult uploaded material significantly improve consistency.",
        },
        {
          prompt: "Why is 'stale knowledge' a meaningful risk for custom assistants that use uploaded files?",
          options: [
            "Old files crash the platform",
            "The model will present outdated information as current because it has no way to know the file is no longer accurate",
            "Files automatically delete themselves after 30 days",
          ],
          answer: 1,
          explanation:
            "The model can only work with what you've given it. If your uploaded style guide, FAQ, or pricing sheet is six months out of date, the assistant will confidently produce answers based on that outdated information.",
        },
      ],
    },
    {
      slug: "when-assistants-beat-one-offs",
      title: "When Assistants Beat One-Off Prompts",
      blurb: "The honest calculus: when setup overhead pays off and when it doesn't.",
      xp: 20,
      kind: "quiz",
      content: `# When Assistants Beat One-Off Prompts

Building a custom assistant takes time. Writing good instructions, uploading
knowledge, and testing behavior is a real investment. So when is it worth it?

## Situations where a custom assistant wins

**Repetition.** If you do the same type of task more than a few times a week —
customer support replies, social post drafts, code reviews in a specific style,
summarizing the same kind of report — a configured assistant removes setup friction
and improves consistency.

**Shared standards.** When multiple people on a team need to produce output that
meets the same bar (tone, format, length, vocabulary), a shared assistant enforces
those standards without a style guide lecture every time.

**Sensitive context.** If your task always requires context that's sensitive to
re-type in a fresh chat — a client's situation, a legal constraint, a technical
architecture — an assistant that already holds that context protects both efficiency
and accuracy.

**Consistency over time.** One-off prompts vary depending on your mood, how tired
you are, and how much you remember to include. A configured assistant is stable;
its behavior is the same whether you use it on Monday morning or Friday afternoon.

## Situations where a one-off chat is better

**Genuinely novel tasks.** A complex, unusual problem benefits from you explaining
it fully and engaging flexibly. A rigid assistant can constrain exactly when you
need breadth.

**Exploration and brainstorming.** When you're figuring out what you want, wide-open
conversation is more productive than an assistant that's been told what "good" looks
like.

**Low frequency.** If you'll do something twice in your life, the setup cost doesn't
pay back.

The right question is: "Will I do this again, do I always want it done the same way,
and does the context take effort to re-establish?" Three yeses means build the
assistant.`,
      questions: [
        {
          prompt: "Which scenario is the best candidate for a custom assistant rather than a fresh chat each time?",
          options: [
            "A unique, one-time research question about a topic you've never explored before",
            "Writing weekly client status update emails that always follow the same structure and tone",
            "A spontaneous creative brainstorm with no constraints",
          ],
          answer: 1,
          explanation:
            "Repetition, consistent standards, and stable context are the three signals that justify setup investment. Weekly structured emails hit all three; one-time research and open brainstorming do not.",
        },
        {
          prompt: "Why can a rigid custom assistant actually be a disadvantage for exploratory tasks?",
          options: [
            "Custom assistants can't handle open-ended questions",
            "When you're figuring out what you want, the constraints you've baked in can narrow exactly when you need broad, flexible thinking",
            "They are too slow for real-time brainstorming",
          ],
          answer: 1,
          explanation:
            "Instructions optimized for a specific task shape the model toward that task. In open exploration, that shaping can exclude the surprising or lateral directions that produce genuine insight.",
        },
        {
          prompt: "The honest three-question test for whether to build a custom assistant is:",
          options: [
            "Is it complex? Does it involve code? Will others use it?",
            "Will I do it again? Do I want it done the same way each time? Does re-establishing context take real effort?",
            "Is it free to set up? Can I share it? Does it replace a human?",
          ],
          answer: 1,
          explanation:
            "Repetition, consistency, and context cost are the three factors that drive ROI on assistant setup. If the answer to all three is yes, building the assistant will pay back quickly.",
        },
      ],
    },
    {
      slug: "testing-and-iterating",
      title: "Testing & Iterating Your Assistant",
      blurb: "How to find what's wrong with your instructions before your users do.",
      xp: 25,
      kind: "quiz",
      content: `# Testing & Iterating Your Assistant

Writing the first draft of your assistant's instructions is the start, not the
finish. A system prompt that sounds good in your head will often surprise you in
practice. Structured testing before you rely on it — or share it — is the difference
between an assistant you trust and one that quietly embarrasses you.

## What to test

**The common case.** Run the five or ten most typical inputs you expect the assistant
to handle. Does it produce the right kind of output, in the right format, at the
right length?

**Edge cases.** What happens with an unusual request? A very short message? A very
long one? A topic that's adjacent but outside scope? A hostile or nonsensical input?

**Constraint tests.** Deliberately try to get it to violate its own rules. If you
told it "never invent statistics," give it a prompt where inventing a statistic
would be tempting. If you said "always ask for context before advising," ask it
something vague and see if it does.

**Output format.** Does it consistently use the format you specified (bullets, prose,
numbered steps, table)? Or does it drift depending on the input?

## How to iterate

Keep a simple log: input → what went wrong → what you changed in the instructions.
This prevents you from going in circles. Common patterns to watch for:

- **Vague instruction → inconsistent output.** Make the instruction more specific.
- **Too many conflicting rules.** Remove the weaker rule or reconcile the conflict.
- **Missing a common case.** Add an explicit example or rule for it.

## The diminishing returns trap

Perfecting your instructions is a form of procrastination. Aim for "good enough to
deploy" quickly, then improve based on real usage. Real edge cases are more
informative than imagined ones.`,
      questions: [
        {
          prompt: "Why is it important to test 'constraint violations' — deliberately trying to get the assistant to break its own rules?",
          options: [
            "To confuse the model so it learns to be more careful",
            "To find out whether your instructions actually enforce what you think they enforce, before real use cases expose the gaps",
            "Because models are designed to follow instructions only when tested",
          ],
          answer: 1,
          explanation:
            "Instructions that look airtight often have gaps. Actively probing them before deployment means you discover failures in a controlled setting rather than when a real user encounters them.",
        },
        {
          prompt: "You notice your assistant gives bullet-point responses sometimes and paragraphs other times, despite your instructions. The most likely fix is:",
          options: [
            "Rebuild the assistant from scratch with a different platform",
            "Make the format instruction more specific — add an example of exactly what a correct response looks like",
            "Accept inconsistency as an inherent limitation of AI",
          ],
          answer: 1,
          explanation:
            "Format drift usually means the instruction is underspecified. Adding a concrete example ('respond like this: ...') anchors the model far more reliably than an abstract rule.",
        },
        {
          prompt: "What is the 'diminishing returns trap' in assistant iteration?",
          options: [
            "Spending too little time testing before deployment",
            "Over-refining instructions indefinitely instead of deploying and learning from real usage",
            "Running out of space in the system prompt",
          ],
          answer: 1,
          explanation:
            "Imagined edge cases can keep you refining forever. Real usage surfaces the edge cases that actually matter. Deploy when it's good enough, then improve based on what you observe.",
        },
      ],
    },
    {
      slug: "sharing-and-deploying-responsibly",
      title: "Sharing & Deploying Responsibly",
      blurb: "Access controls, transparency, and what your users are entitled to know.",
      xp: 20,
      kind: "quiz",
      content: `# Sharing & Deploying Responsibly

When you build an assistant for yourself, the only person affected by its failures
is you. When you share or deploy it for others — teammates, customers, the public —
you take on new responsibilities.

## Access and permissions

**Who can use it?** Most platforms let you set access: private, shared with a link,
shared with a workspace, or fully public. Match access level to sensitivity. An
assistant with uploaded client data should not be public-link accessible.

**What can it do?** Some assistants can take actions (send emails, search the web,
run code). The more capability an assistant has, the more important it is to scope
it carefully and test failure modes.

## Transparency with users

People using your assistant deserve to know:

- **They're talking to an AI.** Never deploy an assistant that impersonates a
  human and actively denies being an AI when asked directly.
- **What it can and can't do.** A support assistant that doesn't handle refunds
  should say so clearly rather than making users feel unheard.
- **How their data is handled.** If user conversations feed into a platform's
  training data, or are logged by your organization, that's worth disclosing.

## The instructions-as-policy framing

When you write a system prompt that many people use, you're writing policy, not
just configuration. The defaults you choose, the constraints you set, and the
cases you didn't handle will all play out across many interactions. Think through
the implications before you deploy, not after.

## Maintenance is part of the job

A deployed assistant isn't done. The information in its knowledge files goes stale.
Platform updates can change how instructions are interpreted. User patterns will
reveal gaps in your design. Plan to revisit it periodically — at minimum whenever
the underlying context (product, policy, workflow) changes significantly.`,
      questions: [
        {
          prompt: "You've built a customer-facing support assistant with uploaded internal pricing files. Which access setting is appropriate?",
          options: [
            "Public link — anyone should be able to use it",
            "Restricted access that only verified users can reach, since it contains sensitive business data",
            "Private to you only — customers shouldn't use AI at all",
          ],
          answer: 1,
          explanation:
            "Access level should match data sensitivity. Internal pricing files in a public-link assistant means anyone who finds the link can query your pricing data and potentially extract it.",
        },
        {
          prompt: "A user talking to your deployed assistant directly asks, 'Am I talking to a human or a bot?' What should the assistant do?",
          options: [
            "Deny being an AI to maintain the persona",
            "Clearly acknowledge that it is an AI assistant",
            "Refuse to answer the question",
          ],
          answer: 1,
          explanation:
            "Actively deceiving users about the nature of what they're interacting with is an ethical line most platforms prohibit and most users would consider a fundamental breach of trust.",
        },
        {
          prompt: "What does the 'instructions-as-policy' framing mean for someone deploying a shared assistant?",
          options: [
            "Instructions only apply to the first person who uses the assistant",
            "The defaults, constraints, and gaps in your design play out across every interaction — so you're effectively writing policy for all users, not just configuring a personal tool",
            "Instructions must be written in formal policy language to be effective",
          ],
          answer: 1,
          explanation:
            "At scale, your design choices are what users experience. An omission or a poorly chosen default that affects one in ten interactions becomes a pattern across thousands of conversations.",
        },
      ],
    },
    {
      slug: "capstone-design-an-assistant",
      title: "Capstone: Design a Real Assistant",
      blurb: "Apply everything: pick a recurring job, write instructions, plan knowledge, and define success.",
      xp: 25,
      kind: "quiz",
      content: `# Capstone: Design a Real Assistant

The best way to consolidate everything in this course is to design a real assistant
for a job you actually do repeatedly. This lesson walks you through the design
process — you can apply it immediately after finishing.

## Step 1 — Pick the job

Choose something you do at least weekly that involves producing similar outputs:
drafting a type of message, reviewing a category of content, summarizing a specific
kind of document, answering a recurring category of questions.

Good signal: you've re-explained the same context to a chatbot more than twice.

## Step 2 — Write the identity and task

Fill in the template:

> You are [specific role] for [context/organization/purpose].
> Your primary job is [core task — be specific about input and output].

Then ask yourself: if a new person read only this, would they know what "good" looks
like? If not, keep adding specifics.

## Step 3 — Define the constraints

List three to five things this assistant should *never* do or should *always* do.
Constraints are often clearer to define after you've imagined what could go wrong.

## Step 4 — Identify the knowledge it needs

What background information should every conversation start with? List the documents,
facts, or context. Then decide: does each piece go in the system prompt (short and
stable) or as an uploaded file (longer, occasionally updated)?

## Step 5 — Define success

Write two or three concrete examples of a great output. If you can't describe a
great output, you can't evaluate whether your assistant is producing one. These
examples can also go in the system prompt as illustrations.

## Step 6 — Test, deploy, maintain

Run the common cases, the edge cases, the constraint violations. Deploy when it's
good enough. Set a reminder to revisit the knowledge and instructions when the
underlying context changes.

You now have a complete assistant-building framework. Use it.`,
      questions: [
        {
          prompt: "In the capstone design process, why is 'define success' a dedicated step rather than something you figure out as you go?",
          options: [
            "It's a formality required by the platform before publishing",
            "Without a concrete picture of what 'great output' looks like, you have no basis for evaluating whether your assistant is working or knowing what to fix",
            "Success is always obvious once you deploy and see real results",
          ],
          answer: 1,
          explanation:
            "Iteration requires a target. If you can't describe a great output before you start, you'll mistake 'different' for 'better' and fail to recognize when you've actually improved the assistant.",
        },
        {
          prompt: "You're deciding whether to put a piece of reference material in the system prompt or in an uploaded knowledge file. The best guide is:",
          options: [
            "Always use an uploaded file — files are always better than text in prompts",
            "Short and stable content belongs in the system prompt; longer or periodically-updated content belongs as an uploaded file",
            "Put everything in both places for redundancy",
          ],
          answer: 1,
          explanation:
            "System prompt space is limited and best used for stable, high-priority context. Uploaded files handle longer reference material that may need updating without rewriting the entire prompt.",
        },
        {
          prompt: "After deploying your assistant, the product it supports releases a major update that changes several workflows. What should you do?",
          options: [
            "Nothing — the assistant will figure it out from user messages",
            "Revisit and update the knowledge files and instructions to reflect the new workflows, since stale context produces confidently wrong guidance",
            "Delete the assistant and start over from scratch",
          ],
          answer: 1,
          explanation:
            "Maintenance is part of the job. An assistant confidently answering based on outdated information is often worse than no assistant at all — it produces incorrect answers that feel authoritative.",
        },
      ],
    },
  ],
};
