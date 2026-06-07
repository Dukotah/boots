import type { Module } from "./types";

// AI for Business & Side Income — a practical, honest guide for non-technical
// people who want to use AI to run or grow a small business, freelance, or build
// side income. Every lesson is a quiz (reading + questions). Tone: grounded and
// practical — no hype, no inflated income claims, emphasis on real value creation,
// ethics, client disclosure, and not over-trusting AI output.
export const aiForBusiness: Module = {
  slug: "ai-for-business",
  title: "AI for Business & Side Income",
  description:
    "A practical, hype-free guide to using AI in your business or side hustle — automate the boring stuff, deliver better work, and grow income responsibly. Covers content, customer service, freelancing, building a product, managing costs, and the ethics every serious operator needs to know.",
  emoji: "💼",
  gradient: "from-emerald-500/20 to-teal-500/10",
  tagline:
    "Use AI to run a leaner, faster small business or side hustle — without the hype, without the shortcuts that backfire.",
  keywords: [
    "AI for small business",
    "AI side hustle",
    "AI freelancing",
    "how to make money with AI",
    "AI business tools",
    "AI for entrepreneurs",
    "AI content marketing",
    "AI customer service",
    "AI product ideas",
    "AI ethics business",
  ],
  lessons: [
    {
      slug: "where-ai-creates-real-value",
      title: "Where AI Creates Real Business Value",
      blurb:
        "Separate the hype from the genuine upside — automate the boring, augment the skilled.",
      xp: 20,
      kind: "quiz",
      content: `# Where AI Creates Real Business Value

The honest answer to "can AI make me money?" is: **yes — if you use it to create
genuine value for real people, not to cut corners and hope no one notices.**

Here's what AI is demonstrably good at in a business context:

**Automating repetitive drafting** — first drafts of emails, social posts, proposals,
FAQ documents, job postings. These tasks used to eat hours; they now take minutes.

**Speeding up research and summarizing** — reading a long document, a competitor's
website, or a pile of customer reviews and extracting the key points.

**Augmenting skilled work** — a graphic designer using AI for initial concepts; a
consultant using AI to draft the first cut of a report; a developer using it for
boilerplate. The human still brings expertise, taste, and accountability.

**Generating options** — brainstorming names, taglines, pricing tiers, feature ideas,
or survey questions faster than any solo session could.

**What AI is NOT good at:**

- Making real business decisions for you (it has no skin in the game)
- Replacing the trusted relationship between you and a client
- Guaranteeing accuracy on facts, regulations, or numbers
- Producing polished final output without a human editing pass

Realistic expectation: AI probably saves a skilled operator **a few hours per week**
on administrative and drafting work. That's meaningful — but it's a productivity
multiplier, not a money-printing machine.

The businesses that benefit most treat AI as a **junior collaborator** — useful,
fast, but always supervised.`,
      questions: [
        {
          prompt:
            "Which of the following is a realistic, genuine use case for AI in a small business?",
          options: [
            "Letting AI make all pricing and hiring decisions autonomously",
            "Using AI to draft first-cut emails and proposals, then editing them before sending",
            "Replacing client relationships entirely with AI-generated communication",
          ],
          answer: 1,
          explanation:
            "AI excels at first drafts and repetitive text tasks. Final judgment, client trust, and accountability stay with you — that's what clients are actually paying for.",
        },
        {
          prompt:
            "A realistic expectation for how much time AI saves a skilled solo operator is…",
          options: [
            "It replaces virtually all of their work immediately",
            "A few hours per week on drafting and repetitive tasks — a real but modest multiplier",
            "Zero — AI has no practical business use yet",
          ],
          answer: 1,
          explanation:
            "A few hours a week is meaningful and compounds over time, but anyone promising it will replace most of your work is overselling. The human skill, judgment, and relationships remain essential.",
        },
        {
          prompt:
            "Where does AI create the LEAST reliable value in a business context?",
          options: [
            "Drafting a brainstorm list of product name ideas",
            "Summarizing a long supplier contract into key points",
            "Guaranteeing the accuracy of tax figures or regulatory requirements you'll act on",
          ],
          answer: 2,
          explanation:
            "AI can hallucinate numbers, dates, and legal details with complete confidence. Anything with real financial or legal stakes must be verified against authoritative sources.",
        },
      ],
      explanation:
        "AI is a productivity multiplier for skilled people doing real work — not a magic revenue machine. Use it to do more of what you're already good at, faster.",
    },
    {
      slug: "ai-for-content-and-marketing",
      title: "AI for Content & Marketing",
      blurb:
        "Draft copy, social posts, emails, and SEO content faster — then make it yours.",
      xp: 22,
      kind: "quiz",
      content: `# AI for Content & Marketing

Content is one of the most time-consuming parts of running any business, and it's
where AI delivers some of the most immediate, practical wins. But there's a right
way to use it — and a way that quietly hurts your brand.

## What AI does well here

- **Email drafts** — newsletters, follow-ups, launch announcements. Give it the key
  points and the desired tone; it hands back a workable draft in seconds.
- **Social media** — first cuts of captions, thread ideas, hashtag sets. Never post
  raw AI output verbatim — your voice is your differentiator.
- **SEO content** — outlines, section drafts, meta descriptions, FAQ pages. AI can
  hit keyword coverage quickly; a human ensures it says something true and useful.
- **Repurposing** — turning a blog post into an email, a podcast transcript into a
  summary, a long report into three social posts.

## The human editing pass is non-negotiable

Raw AI content tends to be generic. It doesn't know your specific story, your
customer's actual language, or the small detail that makes your business yours. The
editing pass is where you:

1. Fix anything inaccurate (AI invents specifics).
2. Add your voice, a concrete example, or a real anecdote.
3. Check that any claims — especially numbers or statistics — are true.

## Brand voice matters

If you have an established brand voice, brief the AI on it: "Write in a casual,
slightly sarcastic style. Avoid corporate buzzwords. Our audience is small restaurant
owners." The output gets far closer to usable. You can also paste in examples of
past content you liked and ask it to match the style.

## A note on SEO

Google's guidelines focus on **helpful, original content for humans** — not on
whether AI was involved. Content that's accurate, useful, and written with your
expertise does fine. Thin AI-spun content produced at volume to game search rankings
is a different story and a reputation risk.`,
      questions: [
        {
          prompt:
            "You use AI to draft a newsletter for your bakery. What's the most important step before sending?",
          options: [
            "Send it immediately — AI copy is always accurate and on-brand",
            "Do a human editing pass: fix inaccuracies, add your voice, and verify any specific claims",
            "Have the AI proofread its own output and send that version",
          ],
          answer: 1,
          explanation:
            "AI drafts are starting points. The editing pass is where you catch invented details, add your real voice, and make sure claims are true — all things that protect your reputation.",
        },
        {
          prompt:
            "How do you get AI-generated content that sounds like your brand instead of generic?",
          options: [
            "AI always matches your brand voice automatically",
            "Brief it explicitly: describe your tone, your audience, and paste examples of content you liked",
            "Just ask it to 'be creative'",
          ],
          answer: 1,
          explanation:
            "AI follows instructions. The more specifically you describe your voice, audience, and style — with examples — the closer the first draft lands.",
        },
        {
          prompt:
            "Which content strategy is most likely to hurt your business's long-term reputation?",
          options: [
            "Using AI to draft a weekly email that you then edit and personalize before sending",
            "Publishing large volumes of thin, AI-generated articles designed to rank in search without adding real value",
            "Having AI brainstorm 20 blog topic ideas and then writing one of them yourself",
          ],
          answer: 1,
          explanation:
            "Volume-without-value is a short-term tactic with long-term costs: search engines demote thin content, and readers who notice leave. Using AI to support genuine content creation is sustainable; using it to spam is not.",
        },
      ],
      explanation:
        "AI is a fast, capable content collaborator — but your voice, accuracy, and honest value are what build a brand. Edit everything before it goes out.",
    },
    {
      slug: "ai-for-customer-service-and-ops",
      title: "AI for Customer Service & Operations",
      blurb:
        "FAQs, drafted replies, scheduling, summaries — and where a human must stay in the loop.",
      xp: 22,
      kind: "quiz",
      content: `# AI for Customer Service & Operations

Day-to-day operations involve a lot of low-complexity, high-volume communication:
answering common questions, drafting replies, summarizing threads, scheduling. AI
handles these well — as long as you stay in the loop on anything that matters.

## High-value applications

**FAQ drafting** — give AI your most common customer questions and let it draft the
answers. You review for accuracy and brand voice, then publish. Beats staring at a
blank doc.

**Drafting replies** — paste in a customer's email and ask AI to draft a professional
response. Edit it before sending. This alone can cut reply time significantly for
high-volume inboxes.

**Summarizing long threads** — paste a chain of emails or support tickets and ask
for the key points. Useful when picking up a case mid-conversation.

**Internal templates** — standard operating procedures, employee onboarding docs,
meeting agendas. AI gives you a solid first draft in the same framework each time.

**Scheduling assistance** — some tools integrate AI to handle scheduling back-and-
forth. Useful for solo operators who spend too much time on logistics.

## Where a human MUST stay in the loop

- **Complaints with any real financial or legal dimension** — refunds, contract
  disputes, liability claims. These need human judgment and your actual policy.
- **Sensitive or emotional conversations** — a customer who is distressed, grieving,
  or angry needs a human response. AI can draft, but a person should read and decide.
- **Anything you'll be legally accountable for** — don't let AI commit your business
  to terms it doesn't understand.
- **Escalations** — when a customer asks to speak to a human, honor that.

The rule of thumb: use AI to handle the **speed and volume** problem; keep humans on
the **judgment and trust** problem.`,
      questions: [
        {
          prompt:
            "Which of these is a good use of AI in your customer service workflow?",
          options: [
            "Having AI autonomously send final replies to all customer complaints without review",
            "Using AI to draft a reply to a common question, then editing and sending it yourself",
            "Letting AI decide your refund policy and communicate it to customers",
          ],
          answer: 1,
          explanation:
            "AI drafts are great. Unsupervised AI sending final replies — especially to complaints — is a liability and a reputation risk. You draft, you review, you send.",
        },
        {
          prompt:
            "A customer emails saying they're devastated because a product arrived damaged right before a family event. You should…",
          options: [
            "Have AI auto-send a templated response and move on",
            "Use AI to help draft a compassionate reply, then read it yourself, personalize it, and make the right call on the resolution",
            "Ignore it — emotional customers are too hard to handle",
          ],
          answer: 1,
          explanation:
            "Emotionally charged situations need a human hand on the wheel. AI can help you find the right words, but the decision, the empathy, and the accountability are yours.",
        },
        {
          prompt:
            "The best way to think about AI's role in operations is:",
          options: [
            "AI handles the judgment and trust problems; humans handle speed and volume",
            "AI handles the speed and volume problem; humans handle judgment and trust",
            "AI fully replaces customer service staff in any business under 10 employees",
          ],
          answer: 1,
          explanation:
            "AI scales the mechanical parts of service (drafting, summarizing, templating). Human judgment, empathy, and accountability are what customers ultimately rely on.",
        },
      ],
      explanation:
        "AI makes customer service faster. Humans make it trustworthy. The combination — AI doing drafts, humans doing decisions — is where the real operational leverage lives.",
    },
    {
      slug: "offering-ai-assisted-services",
      title: "Offering AI-Assisted Services",
      blurb:
        "Freelance faster with AI — price for value, disclose to clients, and build skills that last.",
      xp: 25,
      kind: "quiz",
      content: `# Offering AI-Assisted Services

One of the fastest ways to generate income with AI is to use it in service work you
already know how to do — or can learn. The output is yours to deliver; AI just
compresses how long it takes.

## What this can look like

- **Copywriter** who uses AI for first drafts and spends their time on editing,
  strategy, and client communication
- **Social media manager** who uses AI for idea generation and caption drafts
- **Virtual assistant** who uses AI to summarize, draft emails, and organize information
- **Bookkeeper** who uses AI to draft SOPs and client communications
- **Consultant** who uses AI to produce research summaries and presentation outlines

In each case, AI handles repetitive creation; your expertise handles quality control,
judgment, and the client relationship.

## Price for value, not hours

If AI lets you produce a proposal in one hour that used to take four, the four-hour
rate still reflects the value delivered — not the time spent. Shifting to value-based
pricing (per project, per deliverable) rather than hourly billing lets you capture
that efficiency gain rather than penalize yourself for being faster.

## Disclosure: the honest answer

The expectations around disclosure are evolving, and different clients have different
preferences. The practical and ethical approach:

- **When in doubt, tell them.** Something like: "I use AI tools to help with initial
  drafts, which I then edit carefully for accuracy and your brand voice."
- **If a client asks**, tell the truth. Actively lying about AI use when asked is a
  trust-destroying move that no short-term win is worth.
- **Check the contract.** Some clients (especially in publishing, academic work, or
  heavily regulated industries) explicitly prohibit AI-generated content. Read it.

## Build skills, not just speed

The freelancers who will thrive long-term are the ones building genuine expertise in
their domain — and using AI to amplify it — not the ones using AI to fake expertise
they don't have. Clients eventually notice the difference.`,
      questions: [
        {
          prompt:
            "You use AI to draft a client's email campaign in 1 hour instead of 4. How should you think about pricing?",
          options: [
            "Only charge for 1 hour — you must always bill actual time spent",
            "Consider value-based pricing (per deliverable) so your efficiency gain isn't a penalty",
            "Charge 4x your normal rate to compensate for the time saved",
          ],
          answer: 1,
          explanation:
            "Value-based pricing reflects what the deliverable is worth to the client, not clock time. Hourly billing penalizes you for being faster — project pricing lets you keep the efficiency gain.",
        },
        {
          prompt:
            "A client directly asks: 'Did you use AI to help write this?' You should…",
          options: [
            "Deny it to protect the relationship",
            "Tell the truth — explain how you used AI and what your editing process looked like",
            "Avoid the question and change the subject",
          ],
          answer: 1,
          explanation:
            "Lying about AI use when directly asked is a relationship-ending move if discovered. Honesty, paired with a clear explanation of your process and quality control, builds trust.",
        },
        {
          prompt:
            "Which freelancer is best positioned for long-term success with AI?",
          options: [
            "Someone using AI to fake expertise they don't have, since clients rarely notice",
            "Someone with genuine domain expertise who uses AI to produce work faster and at higher volume",
            "Someone who refuses to use AI at all",
          ],
          answer: 1,
          explanation:
            "Real expertise is what clients are paying for. AI amplifies it. Using AI to substitute for expertise you lack produces work that skilled clients will eventually see through.",
        },
      ],
      explanation:
        "AI-assisted freelancing works when you bring real skill and AI brings speed. Price for the value you deliver, be honest about your process, and keep building your expertise.",
    },
    {
      slug: "building-an-ai-powered-product",
      title: "Building an AI-Powered Product or Side Project",
      blurb:
        "From idea to a real small offering — validate first, build lean, and be honest about what's AI.",
      xp: 25,
      kind: "quiz",
      content: `# Building an AI-Powered Product or Side Project

You don't need to be a developer to create a product that uses AI. But you do need
a real problem worth solving — that part hasn't changed.

## The idea stage: validate before building

The most common mistake is spending weeks on a tool before knowing if anyone will
pay for it. The AI era makes it easier than ever to test demand cheaply:

- **Talk to potential users first.** What are they actually struggling with? What
  would they pay to fix?
- **Build a 'landing page first'** — describe the product, have a way to capture
  email or a pre-order, and see if people sign up before you build.
- **Start with a manual version.** Before automating anything, do the thing manually
  for one or two real customers. You learn faster and spend nothing.

## Types of AI products non-technical builders have launched

- A newsletter or report that uses AI to research and summarize a niche topic weekly
- A prompt library or "AI kit" for a specific profession (e.g., "50 vetted prompts
  for real estate agents")
- A consulting or coaching offer where AI helps you deliver faster
- A small tool built on top of an AI API (with some technical help or a no-code
  platform like Make, Zapier, or Bubble)
- A course or guide teaching others to use AI for their specific industry

## "Vibe coding" and building with AI assistance

Tools like Cursor, GitHub Copilot, and Claude can help a non-developer build simple
web apps, scripts, and automations with less code knowledge than before. This is
real — but set expectations honestly: you still need to understand what you're
building, test it carefully, and take responsibility for what it does. "I let AI
build it" is not a defense when something goes wrong for a customer.

## Honest about what's AI, honest about what works

If your product is AI-generated content, an AI-assisted service, or powered by a
third-party AI model — say so. Customers who learn it later feel deceived, and the
trust cost is higher than any short-term gain from obscuring it.`,
      questions: [
        {
          prompt:
            "What's the best first step when you have an idea for an AI-powered product?",
          options: [
            "Immediately start building the full product",
            "Validate the idea first — talk to potential users and test if people will actually pay before investing heavily",
            "File a patent and then build",
          ],
          answer: 1,
          explanation:
            "Validation before building is the most important lean-startup principle. AI makes it easier to build — which makes it even more tempting to build before checking if anyone wants it. Don't skip this step.",
        },
        {
          prompt:
            "A non-technical person wants to build a small AI-powered tool. Which is the most realistic starting point?",
          options: [
            "Hire a full engineering team immediately",
            "Start with a manual version for one or two real customers to learn what's needed, then explore no-code tools or AI coding assistants",
            "Give up — only developers can build products",
          ],
          answer: 1,
          explanation:
            "A manual version teaches you the real workflow before you automate anything. No-code tools and AI coding assistants (used carefully) can get you further than you might expect without traditional coding skills.",
        },
        {
          prompt:
            "If your product is substantially powered by an AI model, what should you do?",
          options: [
            "Keep it secret to seem more impressive",
            "Disclose it clearly to customers — transparency builds the trust that becomes your actual competitive advantage",
            "Only disclose it if someone asks directly",
          ],
          answer: 1,
          explanation:
            "Customers who discover hidden AI use feel deceived. Clear disclosure, paired with a strong 'here's how we ensure quality,' builds the reputation that lasts.",
        },
      ],
      explanation:
        "Validate, start small, be honest. The product graveyard is full of AI tools nobody needed. The winners solved a real problem and were upfront about how they work.",
    },
    {
      slug: "costs-tools-and-margins",
      title: "Costs, Tools & Margins",
      blurb:
        "Free tiers, API costs, picking the right tools — and staying profitable.",
      xp: 20,
      kind: "quiz",
      content: `# Costs, Tools & Margins

AI is a business input, and like any input, it has a cost. Getting the cost-benefit
right is what determines whether AI actually improves your margins or quietly erodes
them.

## The tool landscape (as of mid-2026)

Most leading AI assistants — Claude, ChatGPT, Gemini — offer:

- **A free tier** that is genuinely useful for learning, occasional drafting, and
  low-volume work.
- **A paid subscription** (typically $20–$30/month per seat) that adds speed, higher
  usage limits, and access to the newest models.
- **API access** for building products, billed per unit of text processed (tokens).
  API costs range from tiny (a fraction of a cent per request on efficient models) to
  meaningful at scale.

There are also category-specific tools: writing assistants, image generators, video
tools, SEO tools, design tools. Each has its own pricing.

## Thinking like a business about AI spend

- **Start with free tiers** until you hit a real limit. Don't pay for capacity you
  don't use.
- **Track what you're actually paying.** It's easy to sign up for five tools and not
  notice $150/month draining quietly.
- **Match the model to the task.** Smaller, faster, cheaper models are often good
  enough for simple tasks. You don't need the most powerful (and most expensive) model
  to draft a subject line.
- **Build API costs into your pricing.** If you're building a product that calls an
  AI API, estimate the per-customer cost and factor it into what you charge. A product
  where each user's activity costs $0.10 and you charge $5/month has healthy margins;
  one where it costs $4.50 does not.
- **Free tools have tradeoffs too.** Your prompts may be used to improve the model,
  and free tiers often have usage caps or slower responses that can slow down
  production work.

## Avoiding tool sprawl

The productivity gain from AI is real. The temptation to subscribe to every shiny
new tool is also real — and can eat your gains. Pick a small set of tools you
actually use, learn them well, and be skeptical of anything that promises to "10x"
your business for $97/month.`,
      questions: [
        {
          prompt:
            "You're just starting to use AI in your freelance work. What's the smart spending approach?",
          options: [
            "Subscribe immediately to every tool at the highest tier",
            "Start with free tiers, only upgrade when you hit a real limit that's costing you time or money",
            "Avoid all paid AI tools forever",
          ],
          answer: 1,
          explanation:
            "Free tiers are genuinely capable and the right place to start. Upgrade when a specific limit is actually costing you — not because a tool sounds impressive.",
        },
        {
          prompt:
            "You're building a product that calls an AI API for each user action. Each call costs $0.08. You charge $10/month and expect 50 calls per user per month. What's the concern?",
          options: [
            "No concern — API costs are always negligible",
            "At $4.00 in API costs per user against $10 in revenue, margins are thin before any other expenses",
            "The product will definitely fail because API costs are too high",
          ],
          answer: 1,
          explanation:
            "At $4/user in API costs and $10/user in revenue, you have $6 left to cover hosting, support, payment processing, and your own time. That's workable but tight — and worth modeling before you scale. Ignoring per-user API costs is a common early mistake.",
        },
        {
          prompt:
            "Which is the best approach to choosing AI tools for your business?",
          options: [
            "Subscribe to every tool you see advertised — more tools equals more productivity",
            "Pick a small set of tools you genuinely use, learn them well, and audit what you're paying quarterly",
            "Only use free tools no matter what, even if it's costing you hours each week",
          ],
          answer: 1,
          explanation:
            "Tool sprawl is a real cost — in money and in the mental overhead of juggling a dozen logins. A small, well-understood stack beats a large, underused one.",
        },
      ],
      explanation:
        "AI spend is a business cost. Start lean, track what you pay, match the tool to the task, and build API costs into your pricing before you scale.",
    },
    {
      slug: "pitfalls-ethics-and-trust",
      title: "Pitfalls, Ethics & Trust",
      blurb:
        "Accuracy, liability, disclosure, copyright, client data privacy — and why trust is the real moat.",
      xp: 25,
      kind: "quiz",
      content: `# Pitfalls, Ethics & Trust

This is the capstone lesson because trust is the foundation every other lesson is
built on. Businesses that use AI well and honestly build something durable. Businesses
that cut corners quietly accumulate risk — to their reputation, to their clients, and
sometimes legally.

## Accuracy and liability

When AI gets something wrong and you've passed it on to a client as your own work,
**you are responsible** — not the AI, not the AI company. This matters most in:

- Professional advice (legal, financial, medical, accounting)
- Technical specifications, measurements, or safety-relevant information
- Quotes, citations, or attributed claims

The fix: verify before delivering, especially for anything with real stakes.

## Disclosure

We covered this in the freelancing lesson, but it bears repeating at a broader level.
As of 2026, disclosure expectations vary by industry:

- **Publishing and journalism** — many outlets require disclosure or prohibit AI-
  generated text entirely.
- **Academic work** — most institutions have explicit AI use policies. Using AI in
  ways that violate them is academic dishonesty.
- **Regulated industries** (law, finance, medicine) — there may be professional
  ethics rules governing AI use in client deliverables. Know your industry's rules.
- **General business** — no universal legal requirement, but your contract may have
  one. And your clients may have preferences. When in doubt: disclose.

## Copyright and IP

AI image and text generators have been trained on existing work, and the copyright
situation for AI-generated output remains legally unsettled in many jurisdictions. What
is clear:

- Don't instruct AI to copy a specific person's style so closely it produces what
  looks like their actual work.
- Don't use AI to reproduce copyrighted text verbatim.
- Be thoughtful about using AI-generated images in commercial contexts — check the
  terms of service of the tool you used.

## Privacy of client data

When you paste client information — customer lists, internal documents, private
conversations — into a public AI tool, you may be violating your own obligations to
that client. Before doing so, ask:

- Does my contract with this client restrict how I use their data?
- Does the AI tool I'm using store or train on this data?
- Would the client be comfortable knowing I shared this?

The safest approach: redact or anonymize before pasting. Or use a tool with enterprise
privacy guarantees if your work regularly involves sensitive client data.

## Trust is the moat

In a world where AI makes it easier to produce more content, more proposals, and more
product — the scarce resource is **trust**. The businesses that will thrive long-term
are the ones known for accuracy, honesty, and doing what they say. Use AI to serve
that goal, not to shortcut it.`,
      questions: [
        {
          prompt:
            "You use AI to draft a financial summary for a client. The AI includes an incorrect figure that you don't catch, and the client makes a decision based on it. Who bears responsibility?",
          options: [
            "The AI company — they made the tool",
            "You — you delivered it as your work, so the accuracy was your responsibility",
            "The client — they should have verified it themselves",
          ],
          answer: 1,
          explanation:
            "When you deliver work, you own it — errors included. AI companies explicitly disclaim responsibility for how outputs are used. The verification step is yours, especially for anything with financial or legal stakes.",
        },
        {
          prompt:
            "A client's contract says their project data is confidential. You want to paste it into a public AI tool to help summarize it. What should you do?",
          options: [
            "Paste it in — AI tools are private by default",
            "Anonymize or redact the sensitive parts first, or check whether the tool has enterprise privacy terms that satisfy your obligation",
            "Ignore the confidentiality clause — it only applies to humans",
          ],
          answer: 1,
          explanation:
            "Confidentiality clauses cover how you use client data, regardless of the tool. Pasting identifiable client data into a public AI service without authorization could breach the contract and the client's trust.",
        },
        {
          prompt:
            "In a marketplace where AI makes it easy for everyone to produce more content and more services, what becomes the real competitive advantage?",
          options: [
            "Using the most AI possible and producing the highest volume",
            "Trust — being known for accuracy, honesty, and doing what you say",
            "Keeping your AI use completely secret from all clients",
          ],
          answer: 1,
          explanation:
            "When production gets cheap, trust gets scarce. The businesses that build a reputation for honest, accurate, disclosed AI use will have something competitors can't easily copy.",
        },
      ],
      explanation:
        "You're responsible for what you deliver, regardless of how it was made. Disclose where it matters, protect client data, and use AI to build trust — not to erode it. That's the whole module in two sentences.",
    },
  ],
};
