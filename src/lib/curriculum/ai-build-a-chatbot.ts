import type { Module } from "./types";

// Build a Chatbot (No Code) — a practical, no-prerequisites walkthrough of how
// chatbot products are designed, what makes them tick under the hood, and how to
// configure and deploy one without writing a line of code. Target learner: someone
// who has used an AI assistant and now wants to build one for a real use-case.
export const aiBuildAChatbot: Module = {
  slug: "ai-build-a-chatbot",
  title: "Build a Chatbot (No Code)",
  description:
    "Go from user to builder: understand how chatbots really work, design a system prompt, pick the right platform, shape your bot's persona and guardrails, test it properly, and deploy it to real users — all without writing a single line of code.",
  emoji: "💬",
  gradient: "from-violet-500/20 to-fuchsia-500/10",
  tagline:
    "Design, configure, and deploy a working AI chatbot — no coding required. Learn what makes chatbots tick and how to build one people actually want to use.",
  keywords: [
    "build a chatbot no code",
    "how to make a chatbot",
    "AI chatbot builder",
    "chatbot without coding",
    "system prompt design",
    "custom AI assistant",
    "chatbot deployment",
    "no-code AI tools",
  ],
  lessons: [
    {
      slug: "how-chatbots-actually-work",
      title: "How Chatbots Actually Work",
      blurb: "Under the hood: the request-response loop, system prompts, and context windows.",
      xp: 20,
      kind: "quiz",
      content: `# How Chatbots Actually Work

Before you build anything, you need a clear mental model. A chatbot built on a
large language model (LLM) is simpler than it looks — and understanding the few
moving parts saves you hours of guesswork later.

## The request-response loop

Every time a user sends a message, the chatbot platform:

1. **Assembles a prompt** — it glues together the system prompt, the full
   conversation history, and the new user message into one big text block.
2. **Sends it to the model** — the LLM API (OpenAI, Anthropic, Google, etc.)
   receives that text and generates a reply token by token.
3. **Streams or returns the reply** — the platform displays it to the user.
4. **Stores the turn** — so the next request can include the growing history.

## The three "roles" in a conversation

Most chatbot APIs use three labeled sections:

- **System** — your instructions to the bot. Users typically never see this.
- **User** — the human's messages.
- **Assistant** — the bot's replies.

The model treats these differently: system instructions carry the most weight for
behavior, because they appear first and set the frame.

## The context window

Everything — system prompt + history + new message — must fit inside the model's
**context window** (measured in tokens, roughly ¾ of a word each). Claude 3.x and
GPT-4o class models support 100k–200k tokens in 2026, which is roughly 75k–150k
words. Long product documentation or transcripts can still hit the ceiling, so
knowing this exists matters.

When the context fills up, older platforms silently drop the oldest messages. Newer
ones summarize or extend automatically. As a no-code builder, the platform handles
this for you — but a runaway context can hurt response quality and raise costs.`,
      questions: [
        {
          prompt: "Every time a user sends a message, what does the chatbot platform send to the AI model?",
          options: [
            "Only the latest user message",
            "The system prompt, the full conversation history, and the new user message combined",
            "A summary of the user's account settings",
          ],
          answer: 1,
          explanation:
            "The model has no memory between calls — each request must contain everything it needs: your instructions, the full history, and the new turn. That assembled block is what the model actually reads.",
        },
        {
          prompt: "In the three-role conversation structure, what is the 'system' role used for?",
          options: [
            "The model's internal thoughts, shown only to admins",
            "Your instructions that shape the bot's behavior — users typically never see it",
            "A fallback response when the model is unavailable",
          ],
          answer: 1,
          explanation:
            "The system prompt is your primary control surface. It sets persona, rules, tone, and scope. Because it appears first and users don't see it, it's where you do most of your design work.",
        },
        {
          prompt: "A 'context window' limits how much the model can consider at once. What fills it up?",
          options: [
            "Only the system prompt",
            "The accumulated total of system prompt + conversation history + new message, measured in tokens",
            "The number of users connected simultaneously",
          ],
          answer: 1,
          explanation:
            "Everything the model sees in one call counts against the context window. A long system prompt plus a multi-hour conversation history can push toward the limit, which affects quality and cost.",
        },
      ],
      explanation:
        "System prompt + history + message → model → reply → store → repeat. That loop, plus the context window, is the entire engine. Everything else is configuration on top.",
    },
    {
      slug: "choosing-a-no-code-platform",
      title: "Choosing a No-Code Platform",
      blurb: "Botpress, Voiceflow, Stack AI, GPT Builder, and others — how to pick the right one.",
      xp: 20,
      kind: "quiz",
      content: `# Choosing a No-Code Platform

In 2026 there are dozens of no-code chatbot builders. They fall into a few clear
categories, and picking the wrong one costs you time later.

## Category 1 — Hosted AI assistants (simplest)

Tools like **ChatGPT's GPT Builder**, **Claude's Projects**, and **Gemini Gems**
let you configure a custom assistant inside an existing platform. You write a system
prompt and choose knowledge files. No deployment headaches. Trade-off: users need
an account with that provider.

## Category 2 — Standalone chatbot builders (most common for businesses)

**Botpress**, **Voiceflow**, **Tidio**, **Landbot**, and similar tools let you
publish a bot to your own website widget, WhatsApp, Slack, or other channels.
They provide a visual canvas for conversation flows and LLM steps. Better for
customer-facing bots with strict routing or hand-off to a human.

## Category 3 — LLM-first platforms (most flexible)

**Stack AI**, **Flowise**, **Dify**, and similar tools treat the LLM as one node
in a larger pipeline: you can add retrieval (RAG), databases, and API calls
visually. More powerful but slightly steeper learning curve.

## How to choose

Ask four questions:

1. **Who are the users?** Internal team → ChatGPT/Claude Projects is fine. Public
   customers → use a standalone builder.
2. **What channels?** Website widget, WhatsApp, Slack, SMS? Check the platform's
   native integrations.
3. **Do you need retrieval (Q&A over documents)?** Category 2 and 3 platforms
   support this more robustly.
4. **What's your budget?** Most have free tiers; costs scale with message volume and
   the underlying model tier you choose.

There is no single "best" platform. Pick the simplest one that covers your must-haves.`,
      questions: [
        {
          prompt: "You want an internal-team FAQ bot and your whole team already uses ChatGPT. The simplest sensible choice is:",
          options: [
            "Build a full Botpress flow with custom integrations",
            "Use ChatGPT's GPT Builder to configure a custom assistant your team can use directly",
            "Write a custom API integration in Python",
          ],
          answer: 1,
          explanation:
            "When users already have accounts on a hosted AI platform, using that platform's built-in configuration tool (GPT Builder, Claude Projects) requires zero new infrastructure and is the fastest path to useful.",
        },
        {
          prompt: "A retail company wants a public-facing support chatbot on their website and WhatsApp. Which category fits best?",
          options: [
            "Hosted AI assistant (ChatGPT GPT Builder)",
            "Standalone chatbot builder like Botpress or Voiceflow — supports multiple channels and custom deployment",
            "A spreadsheet macro",
          ],
          answer: 1,
          explanation:
            "Standalone builders are designed for multi-channel, customer-facing deployment with routing rules, hand-offs, and brand control — exactly what a public retail bot needs.",
        },
        {
          prompt: "What is 'RAG' (Retrieval-Augmented Generation) relevant to?",
          options: [
            "A technique for reducing the visual size of the chat widget",
            "Letting the chatbot search a document store and include retrieved passages in its context before answering",
            "A way to block users who send too many messages",
          ],
          answer: 1,
          explanation:
            "RAG lets the bot answer questions about your specific documents by finding relevant passages at query time and injecting them into the prompt. It's the main way to give a chatbot accurate, up-to-date knowledge without retraining.",
        },
      ],
      explanation:
        "Match the tool to the use-case: hosted AI assistant for internal/simple, standalone builder for multi-channel/customer-facing, LLM-first platform for complex pipelines.",
    },
    {
      slug: "writing-a-system-prompt",
      title: "Writing a System Prompt That Works",
      blurb: "The system prompt is your bot's brain. Here's how to design one that holds up.",
      xp: 25,
      kind: "quiz",
      content: `# Writing a System Prompt That Works

The system prompt is the single most powerful thing you control. A vague one
produces a generic, unreliable bot. A well-written one makes the bot feel like a
trained specialist.

## What to put in a system prompt

A solid system prompt covers five things:

1. **Identity** — who the bot is and its name.
   *"You are Maple, the customer support assistant for Northwood Coffee."*

2. **Scope** — what it does (and doesn't do).
   *"You help customers track orders, understand our menu, and apply discount codes.
   You do not discuss competitor products or political topics."*

3. **Tone and style** — how it communicates.
   *"Friendly and concise. Use plain English. Maximum 3 sentences per reply unless
   the customer asks for more detail."*

4. **Knowledge and context** — key facts it needs.
   *"Our return window is 30 days. Free shipping on orders over $50. Our busiest
   period is November–January."*

5. **Escalation and limits** — what to do when it can't help.
   *"If you don't know the answer, say so honestly and offer to connect the customer
   with a human agent via the chat handoff button."*

## Common mistakes

- **Too vague:** "Be helpful and friendly." — the model will guess what that means.
- **Too long:** A 5,000-word system prompt with every edge case wastes tokens and
  confuses the model. Aim for clear, hierarchical rules.
- **No scope limit:** Without "you do not…" instructions, a bot will wander into
  any topic a user steers it toward.
- **No escalation path:** The bot will hallucinate rather than admit it doesn't know.

## Test-driven writing

Write a first draft, then immediately try to break it. Ask the bot to do something
out of scope. Ask an ambiguous question. Check if it sticks to the persona. Revise
where it fails, and repeat.`,
      questions: [
        {
          prompt: "A customer support bot regularly starts discussing competitor products when users mention them. The most direct fix is to:",
          options: [
            "Switch to a different underlying AI model",
            "Add an explicit 'you do not discuss competitor products' rule to the system prompt",
            "Make the reply length shorter",
          ],
          answer: 1,
          explanation:
            "Scope boundaries belong in the system prompt as explicit 'do not' rules. Without them, the model will follow the user's conversational lead wherever it goes.",
        },
        {
          prompt: "Why is telling the bot what to do when it *doesn't* know the answer important?",
          options: [
            "It makes the bot faster",
            "Without an escalation path, the model is likely to make up a plausible-sounding answer rather than admitting uncertainty",
            "It reduces the context window size",
          ],
          answer: 1,
          explanation:
            "LLMs default to producing fluent text. Without an explicit instruction to say 'I don't know,' they'll hallucinate confidently. An escalation path — 'offer to connect with a human agent' — gives the model a valid off-ramp.",
        },
        {
          prompt: "What is the recommended way to validate a system prompt after writing it?",
          options: [
            "Launch it immediately to real users and see what happens",
            "Immediately try to break it yourself — ask out-of-scope questions, ambiguous ones, edge cases — then revise",
            "Only change it if the AI model version changes",
          ],
          answer: 1,
          explanation:
            "Test-driven writing: you find failure modes faster and cheaper by stress-testing the prompt yourself before users encounter them. Iterate until the boundaries hold.",
        },
      ],
      explanation:
        "Identity, Scope, Tone, Knowledge, Escalation — cover those five areas and your system prompt will be stronger than 90% of bots in production.",
    },
    {
      slug: "giving-your-bot-knowledge",
      title: "Giving Your Bot Knowledge",
      blurb: "Upload docs, build a knowledge base, or use RAG — the tradeoffs explained simply.",
      xp: 20,
      kind: "quiz",
      content: `# Giving Your Bot Knowledge

An LLM's training has a cutoff date and contains no knowledge of your business.
There are three practical ways to close that gap.

## Option 1 — Paste it into the system prompt (small, stable facts)

For a handful of pages of information that rarely changes — your pricing table, your
return policy, your office hours — just include it directly in the system prompt.
Simple, no extra setup, instant. Works until the content gets long enough to crowd
out the conversation history (rough guideline: keep your total system prompt under
~2,000 words for a chat use-case).

## Option 2 — Upload files / knowledge base (most no-code platforms)

Most platforms let you upload PDFs, Word docs, or web pages. The platform indexes
them so the bot can reference them. Behind the scenes, this is usually RAG. You get
a simple upload UI without building a retrieval pipeline yourself.

**What works well:** product manuals, HR policy docs, FAQs, help center articles.
**What doesn't work well:** scanned images without OCR, highly formatted spreadsheets,
or documents with important information only in diagrams.

## Option 3 — Real-time retrieval / RAG

For large, frequently updated knowledge bases, the platform retrieves the most
relevant passages at query time and injects them into the prompt. The bot always
answers from current content, but answers are only as good as the retrieval step.
If the right passage isn't retrieved, the bot may not find the answer — or may
hallucinate one.

## The honest limits

No matter which option you use, the bot will sometimes get facts wrong. Your
system prompt should tell it to say "I'm not sure" when uncertain and direct users
to the authoritative source. The bot is a first-pass assistant, not a legal document.`,
      questions: [
        {
          prompt: "You have a 1-page refund policy that changes once a year. The simplest way to give the bot this information is:",
          options: [
            "Set up a full RAG pipeline with a vector database",
            "Paste the text directly into the system prompt",
            "Fine-tune the underlying model on your policy",
          ],
          answer: 1,
          explanation:
            "For small, stable content, adding it directly to the system prompt is the fastest and most reliable option. RAG and fine-tuning are overkill for a page of text.",
        },
        {
          prompt: "A user asks the bot a question that is clearly covered in an uploaded PDF, but the bot gives a vague or wrong answer. The most likely cause is:",
          options: [
            "The model's context window is too small for any documents",
            "The retrieval step didn't surface the relevant passage, so the model answered without seeing it",
            "PDFs are not supported by any chatbot platform",
          ],
          answer: 1,
          explanation:
            "In RAG systems, the answer quality depends on whether the right passage was retrieved. If retrieval misses, the model either improvises or admits it doesn't know. Improving chunking, metadata, and query phrasing fixes most retrieval gaps.",
        },
        {
          prompt: "Which type of content is hardest for a typical document-upload knowledge base to handle accurately?",
          options: [
            "Plain-text FAQ articles",
            "Scanned image PDFs without OCR, or data stored only inside diagrams or images",
            "Numbered lists of product features",
          ],
          answer: 1,
          explanation:
            "Retrieval systems work on text. Scanned images are just pixels to the indexer; information in charts, diagrams, or non-OCR'd scans is invisible to the retrieval pipeline.",
        },
      ],
      explanation:
        "Use system prompt for small/stable facts, file upload for medium knowledge bases, and RAG pipelines for large or frequently updated content. Always set an escalation path for the gaps.",
    },
    {
      slug: "persona-guardrails-safety",
      title: "Persona, Guardrails, and Safety",
      blurb: "Design your bot so it stays on-brand, avoids harm, and handles abuse gracefully.",
      xp: 25,
      kind: "quiz",
      content: `# Persona, Guardrails, and Safety

A well-designed chatbot persona is consistent, bounded, and graceful under pressure.
This lesson covers the three guardrail layers every production bot should have.

## Layer 1 — Persona consistency

Users pick up on inconsistency fast. If your bot is "Maple, the friendly barista
assistant" in the first message and sounds like a legal document by message five,
trust breaks.

Persona consistency comes from the system prompt, but it has to survive stress:
- What does the bot say when it doesn't know something? ("I'm not sure — let me
  point you to someone who is.")
- What does it say when asked something off-topic? ("I'm focused on helping with
  Northwood Coffee questions — is there something I can help you with there?")
- What does it say when a user is rude? ("I want to help — let's keep things
  friendly so I can do that.")

Write the answers to these explicitly in the system prompt, not just the happy path.

## Layer 2 — Topic and content guardrails

Every bot needs explicit out-of-scope rules. The model will follow the user's
conversational lead unless you redirect it. Common categories to lock down:
- **Off-brand topics** (politics, religion, competitors)
- **Sensitive topics** (medical advice, legal advice, financial decisions)
- **Harmful content** (how-tos for dangerous activities)

The underlying AI model (Claude, GPT-4o, Gemini) already has safety training that
blocks clearly harmful requests. Your job is adding *business-specific* guardrails
on top.

## Layer 3 — Data and privacy hygiene

Users will sometimes type sensitive information — credit card numbers, passwords,
medical details — into a chatbot by habit. Your system prompt can't stop this, but
you can:
- Tell the bot never to repeat back sensitive-looking numbers verbatim.
- Design your flows so the bot never *asks* for sensitive data.
- Check whether your platform stores and encrypts conversation history, and disclose
  this to users in a privacy notice.

A short "we don't store identifiable info" note near the chat widget builds trust
faster than any persona tweak.`,
      questions: [
        {
          prompt: "Your support bot sometimes talks about competitor brands when users mention them. The right fix is:",
          options: [
            "Train a custom model from scratch",
            "Add an explicit instruction in the system prompt: what to say when off-topic subjects arise, and redirect to in-scope help",
            "Disable the bot until users stop asking about competitors",
          ],
          answer: 1,
          explanation:
            "Topic guardrails belong in the system prompt as explicit instructions — both the rule ('don't discuss competitors') and the redirect ('offer to help with X instead'). The model follows clear instructions; vague ones leave gaps.",
        },
        {
          prompt: "The underlying AI model (Claude, GPT-4o) already has safety training. Why do you still need business-specific guardrails?",
          options: [
            "You don't — the model handles everything",
            "The model's safety training blocks clearly harmful content, but it knows nothing about your brand, scope, or what 'off-topic' means for your use-case",
            "Business guardrails replace the model's safety training",
          ],
          answer: 1,
          explanation:
            "Model-level safety handles obviously harmful requests. Your system prompt handles brand scope, tone, topic limits, and escalation — things the model has no way to know without your instructions.",
        },
        {
          prompt: "A user types their credit card number into the chat by mistake. The best practice for handling this is:",
          options: [
            "Store it so your team can follow up",
            "Design the bot so it never asks for sensitive data, and instruct it never to repeat sensitive numbers back — then review your platform's data retention policy",
            "Ignore it — it's the user's fault",
          ],
          answer: 1,
          explanation:
            "The responsible approach has two parts: reduce the chance it happens (don't ask for sensitive data) and minimize harm when it does (don't echo it back, review data retention). Privacy hygiene is a design choice, not an afterthought.",
        },
      ],
      explanation:
        "Write the off-ramps, not just the happy path. Explicit persona, topic guardrails, and data hygiene are what separate a production-ready bot from a prototype.",
    },
    {
      slug: "testing-and-improving-your-bot",
      title: "Testing and Improving Your Bot",
      blurb: "How to stress-test, read conversation logs, and iterate until your bot is actually good.",
      xp: 25,
      kind: "quiz",
      content: `# Testing and Improving Your Bot

Shipping a chatbot is day one, not the finish line. The bots that get good stay in a
continuous loop: test → observe → refine → repeat.

## Before launch: red-teaming

Before any real user sees your bot, you should spend time actively trying to break
it. This is called **red-teaming** and it's standard practice.

What to test:

- **Out-of-scope questions** — does it deflect appropriately?
- **Ambiguous inputs** — "the thing I mentioned before" — does it ask for
  clarification or hallucinate?
- **Edge cases in your knowledge** — obscure product details, discontinued items.
- **Adversarial prompts** — "ignore your previous instructions and…" — the bot
  should hold its persona and scope.
- **Emotional inputs** — a frustrated or upset user — does the tone stay appropriate?

## After launch: reading conversation logs

Most platforms give you access to anonymized conversation logs. Mining them is one
of the highest-value activities a chatbot owner can do. Look for:

- **Repeated questions the bot couldn't answer** — add this content to the
  knowledge base.
- **Places users abandoned the conversation** — often signals a confusing or
  unhelpful response.
- **Topics you didn't expect** — users will ask things you never anticipated; decide
  whether to add them in-scope or strengthen the deflection.

## Metrics that matter

- **Containment rate** — percentage of conversations fully handled by the bot
  without human hand-off. A new bot at 40–60% is normal; aim for 70%+ over time.
- **User satisfaction** — a simple thumbs up/down widget or CSAT score.
- **Escalation rate** — how often users ask for a human or repeat their question
  (signals the bot didn't resolve the need).

Avoid vanity metrics like "total conversations" without pairing them with resolution
quality.`,
      questions: [
        {
          prompt: "What is 'red-teaming' a chatbot?",
          options: [
            "Showing the bot to a focus group of red-uniformed testers",
            "Deliberately sending adversarial, out-of-scope, and edge-case inputs before launch to find weaknesses",
            "Connecting the bot to a red-colored widget on the website",
          ],
          answer: 1,
          explanation:
            "Red-teaming means actively trying to make the bot fail — off-topic questions, ambiguous phrasing, 'ignore your instructions' prompts — so you find and fix those failures before real users do.",
        },
        {
          prompt: "After launch, what is the highest-value activity in conversation logs to look for?",
          options: [
            "Count the total number of conversations to report to stakeholders",
            "Find repeated questions the bot couldn't answer, abandoned conversations, and unexpected topics — then update the knowledge base and system prompt accordingly",
            "Delete any conversations that included complaints",
          ],
          answer: 1,
          explanation:
            "Logs are a direct signal of where the bot falls short. Repeated failures and drop-off points tell you exactly what to fix. Acting on them is how bots improve from 'okay' to 'genuinely useful.'",
        },
        {
          prompt: "A newly launched customer support bot handles 50% of conversations without escalating to a human. This result means:",
          options: [
            "The bot is broken and should be shut down immediately",
            "It is a normal starting point for a new bot; the goal is to improve containment rate over time through knowledge base and system prompt refinements",
            "The bot is fully optimized and needs no further changes",
          ],
          answer: 1,
          explanation:
            "40–60% containment is typical for a new bot in a real support context. Steady improvement through log review and iteration is how you reach 70%+ over weeks and months.",
        },
      ],
      explanation:
        "Red-team before launch, mine logs after. Containment rate and satisfaction score are your north stars. Chatbot quality is a process, not a moment.",
    },
    {
      slug: "deploy-and-own-your-bot",
      title: "Capstone: Deploy and Own Your Bot",
      blurb: "Tie it all together — from idea to live product — and know what comes next.",
      xp: 25,
      kind: "quiz",
      content: `# Capstone: Deploy and Own Your Bot

You've covered the full arc of building a chatbot without code. Let's close with a
concrete end-to-end picture — and the honest post-launch realities of owning one.

## The build checklist

Before you hit publish, confirm:

- [ ] **System prompt covers** identity, scope, tone, key facts, and escalation.
- [ ] **Knowledge base is loaded** and you've verified a sample of tricky questions.
- [ ] **Red-teaming passed** — off-scope questions deflect, adversarial prompts hold
  persona, edge cases are handled or escalated gracefully.
- [ ] **Channel is configured** — widget is on the right page, WhatsApp number is
  connected, or Slack app is installed in the right workspace.
- [ ] **Privacy notice is visible** to users near the chat interface.
- [ ] **Escalation path works** — if the bot hands off, the human-side queue is set up.

## What "owning" a bot looks like

A deployed chatbot is a product, not a project. Expect to:

- **Review logs weekly** at first, monthly once it stabilizes.
- **Update the knowledge base** when products, prices, or policies change. A bot
  with stale facts loses user trust fast.
- **Watch for prompt drift** — users evolve how they phrase things; your bot may
  need adjustments.
- **Budget for model cost** — most no-code platforms charge per message or per
  1,000 tokens at the underlying model rate. Unusual usage spikes (a viral post
  linking to your bot) can hit your bill fast; set a spending cap if your platform
  offers one.

## What comes next

If you've built something useful, the logical next steps are:

- **Add more knowledge** — deeper FAQs, multilingual support, richer product data.
- **Add integrations** — let the bot look up live order status, create tickets, or
  book appointments by connecting to real APIs (most no-code platforms offer this
  without code).
- **Graduate to code** — when you hit a limit the no-code platform can't solve, you
  now have the conceptual foundation to work with the API directly or hire someone
  who does.

You built a chatbot. That's a real product skill — and the foundation for everything
that comes next in AI building.`,
      questions: [
        {
          prompt: "Before publishing a chatbot to real users, which of these is a critical final check?",
          options: [
            "Ensuring the chat widget color matches the brand palette",
            "Confirming the escalation path works end-to-end — that a handed-off conversation actually reaches a human or the right queue",
            "Guaranteeing the bot will answer every possible question correctly",
          ],
          answer: 1,
          explanation:
            "A broken escalation path means users who can't get help from the bot also can't reach a human — the worst possible outcome. Color and UI matter, but the hand-off is load-bearing infrastructure.",
        },
        {
          prompt: "After launch, your company changes its return policy from 30 days to 14 days. What must you do?",
          options: [
            "Nothing — the AI model will figure it out over time",
            "Update the knowledge base and/or system prompt with the new policy, because the bot has no automatic awareness of business changes",
            "Rebuild the bot from scratch",
          ],
          answer: 1,
          explanation:
            "The bot knows only what you gave it at configuration time. Business changes require manual updates to the system prompt or knowledge base. A bot with stale facts confidently gives wrong answers.",
        },
        {
          prompt: "You notice your monthly chatbot bill spiked 10x after a blog post went viral and linked to your support bot. The best preventive measure for the future is:",
          options: [
            "Never link to the chatbot publicly",
            "Set a spending cap or usage alert on your platform account so you're notified before costs spiral",
            "Switch to a free model that has no capability",
          ],
          answer: 1,
          explanation:
            "Cost spikes from viral traffic or abuse are a real operational risk. Spending caps and alerts don't limit normal usage — they give you a chance to respond before a bill becomes a crisis.",
        },
      ],
      explanation:
        "A chatbot is a product you maintain, not a project you finish. Review logs, update knowledge, watch costs, and keep the escalation path healthy — and you'll own something genuinely useful.",
    },
  ],
};
