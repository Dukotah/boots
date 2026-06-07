import type { Module } from "./types";

// AI for Marketing & Growth — a practical, no-hype guide for marketers, founders,
// and growth professionals who want to use AI tools to produce better campaigns,
// understand their audience, and move faster. All quiz/reading lessons (no coding).
export const aiForMarketing: Module = {
  slug: "ai-for-marketing",
  title: "AI for Marketing & Growth",
  description:
    "Use AI to write sharper copy, research audiences, run smarter campaigns, and make data-informed decisions — without needing a data science degree. Practical techniques for marketers, founders, and growth professionals working with today's tools.",
  emoji: "📣",
  gradient: "from-fuchsia-500/20 to-purple-500/10",
  tagline:
    "Write better copy, understand your audience, and grow faster — a marketer's hands-on guide to AI tools in 2026.",
  keywords: [
    "AI for marketing",
    "AI copywriting",
    "AI content marketing",
    "AI growth hacking",
    "AI SEO",
    "AI email marketing",
    "AI for marketers",
    "ChatGPT for marketing",
    "Claude for marketing",
    "AI audience research",
    "AI ad copy",
    "marketing automation AI",
  ],
  lessons: [
    {
      slug: "ai-marketing-foundations",
      title: "AI in Marketing: What It Actually Does",
      blurb: "Understand what AI can and can't do for marketing before you touch a tool.",
      xp: 20,
      kind: "quiz",
      content: `# AI in Marketing: What It Actually Does

Before picking a tool or firing off a prompt, it pays to understand *why* AI
works well for marketing — and where it will let you down.

## What AI is good at in marketing

AI language models are, at their core, excellent at **producing and transforming
text at speed**. That maps directly to a huge slice of marketing work:

- **Drafting** — first passes at copy, subject lines, ad variations, blog posts.
- **Remixing** — taking one piece of content and adapting it for five channels,
  audiences, or reading levels in minutes.
- **Brainstorming** — generating angles, hooks, positioning options, or campaign
  concepts to react to rather than starting from a blank page.
- **Research scaffolding** — summarizing competitor content, synthesizing
  customer reviews, identifying themes in survey responses.
- **Personalization at scale** — templated personalization where the structure is
  fixed but the variables (name, company, pain point) are dynamic.

## Where AI falls short

- **Brand voice and novelty.** AI generates statistically likely output — it
  defaults toward the average. Truly distinctive, unexpected creative ideas
  usually come from a human, with AI helping execute them.
- **Real-time data.** AI models are trained up to a knowledge cutoff; they don't
  know today's search trends, your live campaign metrics, or what just went viral.
  Use the right tool for live data (analytics platforms, real-time search tools).
- **Accuracy on specific facts.** AI can confidently hallucinate statistics,
  competitor details, or market figures. Verify any factual claims before they
  ship in copy.
- **Strategic judgment.** AI can outline a strategy but can't tell you whether
  *your* positioning is differentiated enough, or whether the market timing is
  right. That's still human work.

## The right mental model

Think of AI as a **fast, tireless, mediocre-to-good junior copywriter** who knows
a lot about what's already been written but has no taste for what's truly new.
Your job is to direct, edit, and elevate — not to accept the first draft.`,
      questions: [
        {
          prompt: "Which marketing task is AI genuinely well-suited for?",
          options: [
            "Predicting next month's ad auction prices in real time",
            "Quickly generating five subject-line variations to A/B test",
            "Telling you whether your brand positioning is truly differentiated",
          ],
          answer: 1,
          explanation:
            "AI excels at producing and varying text fast — drafting copy variations is exactly the repetitive, language-based task it handles well. Real-time pricing prediction and strategic judgment are outside its lane.",
        },
        {
          prompt: "A marketer uses AI to write a blog post that cites a competitor's market share figure. What should they do before publishing?",
          options: [
            "Publish immediately — AI is connected to live market data",
            "Verify the figure against a real primary source; AI can hallucinate specific statistics",
            "Add a disclaimer that the figure came from AI",
          ],
          answer: 1,
          explanation:
            "AI models are not connected to live market databases and can fabricate plausible-sounding statistics. Any specific factual claim — especially competitor data or market figures — must be verified before it ships.",
        },
        {
          prompt: "Why does AI marketing copy often feel generic or 'average'?",
          options: [
            "AI intentionally avoids creative language to stay safe",
            "AI generates statistically likely output, which tends toward the mean of what's been written before",
            "AI is programmed only to write informational text, not persuasive copy",
          ],
          answer: 1,
          explanation:
            "Because AI learns from patterns in existing text, it gravitates toward combinations that have appeared before — which is useful for speed, but not for breakthrough creative work. Distinctive voice and novel angles still need a human hand.",
        },
      ],
      explanation:
        "AI is a fast, language-capable collaborator, not a strategy engine or a live data source. Use it to accelerate execution; keep your judgment on the wheel for positioning, facts, and creativity.",
    },
    {
      slug: "audience-research-with-ai",
      title: "Audience Research with AI",
      blurb: "Use AI to mine reviews, synthesize personas, and find the language your customers actually use.",
      xp: 22,
      kind: "quiz",
      content: `# Audience Research with AI

The best marketing copy doesn't invent language — it **mirrors the words your
audience already uses** to describe their problems. AI can dramatically accelerate
the research that surfaces those words.

## Mining customer language

The richest source of authentic customer language is what customers write
*unprompted*: reviews, forum posts, social comments, support tickets, survey
open-ends. AI lets you work with that raw material at scale.

**Paste in a batch of reviews and ask:**
- "What are the three most common complaints, and what exact phrases do customers
  use to describe each one?"
- "What outcomes do customers mention feeling happy about? Quote examples."
- "What language do customers use to describe the problem *before* they found this
  product?"

This gives you the vocabulary for ads, landing pages, and emails — in the voice
of real buyers, not marketing-speak.

## Building research-backed personas

AI can synthesize a persona from raw data you provide, rather than guessing.
Supply it with themes from your review mining, demographic info you know, and
behavioral patterns from your analytics, then ask:

> "Based on this research, draft a buyer persona — include their goal, their
> biggest obstacle, and how they describe both to a friend."

The key is **you supply the data, AI synthesizes the prose**. A persona built on
real customer quotes is far more useful than one the AI invents.

## Competitive gap research

Paste competitor positioning copy and ask AI to identify:
- What claims everyone is making (table stakes — differentiation is impossible here)
- What angles no one is using (opportunities)
- What objections the copy does *not* address (gaps a challenger could exploit)

## What AI can't replace here

AI cannot run surveys, conduct interviews, or observe actual user behavior. The
research inputs still have to be real. AI is the analyst, not the fieldwork.`,
      questions: [
        {
          prompt: "What is the most effective way to use AI for customer language research?",
          options: [
            "Ask AI to invent what your customers probably care about based on your industry",
            "Paste real customer reviews into AI and ask it to identify recurring phrases and themes",
            "Use AI to rewrite your existing copy in a more customer-centric style",
          ],
          answer: 1,
          explanation:
            "AI is a powerful text-analysis tool — it can extract patterns and surface recurring language from large volumes of real customer text. Having it *invent* what customers care about defeats the purpose and risks reflecting AI's priors rather than your actual audience.",
        },
        {
          prompt: "A marketer builds a buyer persona by asking AI to 'create a typical persona for a B2B SaaS buyer' with no other input. What's the main risk?",
          options: [
            "AI is not capable of writing personas",
            "The persona will reflect AI's generic training data rather than actual customers of this product",
            "The persona will be too detailed to be useful",
          ],
          answer: 1,
          explanation:
            "Without real data as input, AI invents a persona from its training distribution — a composite of what it has seen in marketing content generally. That's often accurate at the broadest level but misses the specific pains, words, and contexts of your actual buyers.",
        },
        {
          prompt: "When using AI to analyze competitor positioning copy, what is the most actionable output to ask for?",
          options: [
            "A rewritten version that sounds better",
            "The claims everyone makes (table stakes) and the angles no one addresses (opportunities)",
            "A score out of 10 for each competitor's copy quality",
          ],
          answer: 1,
          explanation:
            "Understanding what's already saturated tells you where differentiation is impossible; spotting the gaps and un-addressed objections shows you where a new entrant can stand out. That's strategic intelligence, not just editing.",
        },
      ],
      explanation:
        "The input quality determines the output quality. Feed AI real customer language — reviews, open-ends, forum posts — and it becomes an extremely capable analyst. Ask it to invent research, and it gives you generic guesses.",
    },
    {
      slug: "ai-copywriting-that-converts",
      title: "AI Copywriting That Actually Converts",
      blurb: "Prompting frameworks for ads, landing pages, and emails — plus how to edit AI output into something great.",
      xp: 25,
      kind: "quiz",
      content: `# AI Copywriting That Actually Converts

AI can produce a first draft in seconds. The difference between a mediocre AI
output and a great piece of copy is almost always in the prompt and the edit —
not the model.

## The four levers of a strong copy prompt

**1. Role and context**
Tell the AI who it is and what it knows.
> "You are a direct-response copywriter for a strength training app targeting
> women over 40. The brand voice is encouraging and no-nonsense — we don't
> shame, we don't hype."

**2. The job to be done**
Be specific about format, length, and channel.
> "Write three Facebook ad variations. Each has a single-sentence hook (under
> 15 words), a 2–3 sentence body, and a CTA. Hook must name the problem, not
> the product."

**3. The customer insight**
Give it one concrete thing you know about your buyer.
> "Our best customers say the thing they hate most is routines that feel like
> punishment. Use that angle."

**4. Constraints and things to avoid**
> "Don't use 'transform', 'journey', or 'unleash'. No exclamation marks."

## Editing AI copy: the real work

AI copy is usually 60–80% there. The edit is where it becomes yours:

- **Replace generic words** — AI loves "powerful", "seamless", "game-changer".
  Swap them for specifics.
- **Add proof and specificity** — "lose weight" → "down 12 lbs in 8 weeks".
- **Cut the warm-up.** AI often starts with preamble. Delete the first sentence
  or two and see if the copy is stronger.
- **Read it aloud.** If you'd never say it, rewrite it.

## A/B testing AI variations

AI's real superpower here is volume: ask for 10 subject lines, not 1. Then use
judgment to pick 2–3 to test. You move from blank-page paralysis to selection
mode — a far faster and more creative mental posture.`,
      questions: [
        {
          prompt: "Which copy prompt will produce the most useful output for a Facebook ad?",
          options: [
            "'Write a Facebook ad for my fitness app.'",
            "'Write 3 Facebook ad variations for a strength training app targeting women over 40. Each has a hook under 15 words that names the problem, a 2–3 sentence body, and a CTA. Tone: encouraging, no-nonsense, no shame.'",
            "'Make the best Facebook ad you can.'",
          ],
          answer: 1,
          explanation:
            "Specificity in role, format, audience, constraints, and tone gives the model everything it needs to produce usable first drafts. Vague prompts produce vague output.",
        },
        {
          prompt: "After getting an AI-drafted email, you notice it starts with 'In today's fast-paced world…' What should you do?",
          options: [
            "Keep it — AI knows what works",
            "Delete it; AI often starts with filler preamble that weakens the copy",
            "Add more context after it to make it stronger",
          ],
          answer: 1,
          explanation:
            "AI frequently opens with generic warm-up lines. Cutting the first sentence or two almost always tightens the copy. 'In today's fast-paced world' is one of the most common AI clichés — a reliable signal to delete.",
        },
        {
          prompt: "What is the most effective way to use AI for generating ad copy options?",
          options: [
            "Generate one polished version and publish it directly",
            "Generate 10 variations, use judgment to select 2–3 for A/B testing",
            "Generate as many as possible and run all of them simultaneously",
          ],
          answer: 1,
          explanation:
            "AI's speed advantage is in volume. Generating 10 variations and curating down to the best candidates shifts you from blank-page paralysis to selection mode — faster, more creative, and more testable than writing one or running everything.",
        },
      ],
      explanation:
        "Great prompts include role, format, a concrete customer insight, and explicit constraints. Then edit ruthlessly: replace generics, add specifics, cut the preamble, and read it aloud. AI writes the draft; you make it great.",
    },
    {
      slug: "ai-seo-and-content-strategy",
      title: "AI for SEO & Content Strategy",
      blurb: "Keyword clustering, content briefs, and topical authority — how AI fits into a modern SEO workflow.",
      xp: 22,
      kind: "quiz",
      content: `# AI for SEO & Content Strategy

SEO has evolved well past individual keyword stuffing. As of 2026, the dominant
search quality signals reward **topical authority** — covering a subject
comprehensively enough that search engines trust your site as a primary source.
AI accelerates nearly every stage of the content workflow that builds it.

## Where AI helps in SEO

**Keyword clustering and intent mapping**
Paste a list of raw keywords into an AI and ask it to group them by search intent
(informational, navigational, commercial, transactional) and by topic cluster.
This takes an hour of spreadsheet work and reduces it to minutes.

**Content briefs**
Given a target keyword and a target audience, AI can produce a structured content
brief: suggested H2s, questions to answer, competing angles to address, related
terms to include. It gives a human writer a scaffold, not a substitute.

**Gap analysis**
Describe your existing content library and ask: "What high-intent questions would
a buyer in this space ask that my library doesn't answer?" This surfaces topical
gaps faster than manual audits.

**Internal linking suggestions**
Paste a new piece of content and your list of existing articles. Ask AI to suggest
relevant internal links and the anchor text. A task that previously required deep
familiarity with the whole library becomes instant.

## What AI does NOT help with in SEO

- **Real keyword volume and competition data.** AI doesn't have access to live
  search console, Ahrefs, or Semrush data. You still need those tools for actual
  search volume, keyword difficulty, and click data.
- **Writing SEO content that ranks by itself.** AI-generated content that doesn't
  add genuine expertise, experience, or insight will not outperform well-researched
  human content. Search quality systems increasingly reward genuine helpfulness and
  first-hand knowledge — called "experience" in the E-E-A-T framework.

## The right workflow

Use AI to accelerate the *planning and structure* phase. Bring human expertise —
original research, first-hand experience, distinct opinion — to fill that structure.
The combination beats either alone.`,
      questions: [
        {
          prompt: "What is the most effective use of AI in an SEO keyword research workflow?",
          options: [
            "Getting live search volume data for each keyword",
            "Grouping a list of raw keywords by topic cluster and search intent",
            "Predicting which keywords Google will rank you for based on domain authority",
          ],
          answer: 1,
          explanation:
            "AI is excellent at organizing and categorizing text — clustering keywords by topic and intent is pure classification work that takes minutes with AI vs. hours manually. Live search metrics still require dedicated SEO tools.",
        },
        {
          prompt: "Why won't AI-generated blog posts automatically rank well in search as of 2026?",
          options: [
            "Search engines can always detect AI-generated text and penalize it automatically",
            "Search quality systems increasingly reward genuine expertise, first-hand experience, and original insight — things AI alone cannot provide",
            "AI-generated content is always too short to rank",
          ],
          answer: 1,
          explanation:
            "Modern search ranking rewards helpfulness and E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness). Content that lacks original expertise or first-hand experience — whether AI-written or not — tends to underperform content that provides genuine value. The issue isn't detection, it's quality.",
        },
        {
          prompt: "A content team has 200 existing blog posts and wants to find topical gaps. How can AI help?",
          options: [
            "AI cannot analyze an existing content library",
            "Describe the library's topics and ask AI to identify high-intent questions in the space that aren't covered",
            "Ask AI to write 200 new posts covering different keywords",
          ],
          answer: 1,
          explanation:
            "Gap analysis is a reasoning task AI handles well — given the landscape of existing content, it can infer which questions a target audience would still want answered. This surfaces opportunities faster than manual auditing.",
        },
      ],
      explanation:
        "AI accelerates the planning and structural work in SEO — clustering, briefing, gap analysis, linking suggestions. Real search volume data still needs SEO tools, and ranking still needs genuine human expertise woven into the content.",
    },
    {
      slug: "ai-email-and-lifecycle-marketing",
      title: "AI for Email & Lifecycle Marketing",
      blurb: "Write better sequences, personalize at scale, and use AI to diagnose why emails underperform.",
      xp: 22,
      kind: "quiz",
      content: `# AI for Email & Lifecycle Marketing

Email is one of the highest-ROI channels in marketing — and one of the most
labor-intensive to execute well. AI changes that ratio significantly.

## Where AI saves the most time in email

**Subject line generation**
This is the single highest-leverage use. A weak subject line kills an otherwise
great email. Ask AI for 15–20 subject line options with different angles (curiosity,
specificity, urgency, social proof, humor) — then pick and test the best two.

**Sequence drafting**
Map out the logic of a lifecycle sequence (welcome, onboarding, re-engagement,
win-back) and have AI draft each email in the sequence. It's far faster than
writing from scratch, and the consistency of tone across a long sequence is easier
to manage when you're editing rather than originating.

**Personalization variables**
AI can generate the variable copy for personalized emails at scale. For example:
provide a list of five customer segments with their defining characteristics and
ask AI to write a tailored "pain statement" opening sentence for each one. Slot
that into your template.

**Diagnosing underperformance**
Paste an underperforming email into AI and ask: "What three things could be causing
a low open rate?" or "What objections does this email fail to address before asking
for a click?" This gives you diagnostic hypotheses to test — faster than staring
at the email alone.

## Email copy principles AI often ignores (your edit checklist)

- **One email, one job.** AI tends to pack in multiple CTAs. Cut to one.
- **Preview text matters.** AI rarely drafts it. Write it yourself or explicitly ask.
- **Mobile first.** Long paragraphs that look fine in a brief look terrible on
  mobile. Break at 2–3 sentences max.
- **Plain > fancy.** High-performing emails often look like a message from a real
  person, not a designed newsletter template.`,
      questions: [
        {
          prompt: "Why is subject line generation one of the highest-leverage AI use cases in email marketing?",
          options: [
            "Subject lines are harder to write than body copy, so AI saves more time there",
            "The subject line determines whether the email is read at all — improving it compounds across every send",
            "AI is specifically trained on email subject lines, so it's more accurate there",
          ],
          answer: 1,
          explanation:
            "Subject lines gate everything else. A weak subject line means zero body copy performance, regardless of quality. Generating many options and testing the best ones is a high-leverage habit with large compound returns.",
        },
        {
          prompt: "You paste an underperforming email into an AI and ask 'what three things could be causing a low click rate?' What is this technique?",
          options: [
            "Using AI as a live analytics platform to measure clicks",
            "Using AI as a diagnostic thinking partner to generate hypotheses you then test",
            "Using AI to automatically fix the email and re-send it",
          ],
          answer: 1,
          explanation:
            "AI cannot access your actual email performance data, but it can reason about email copy to surface common failure patterns — buried CTA, mismatched expectations, weak value prop — giving you concrete hypotheses to test.",
        },
        {
          prompt: "AI drafts a welcome email with three different calls-to-action: watch a demo, start a trial, and book a call. What should you do?",
          options: [
            "Keep all three — more options increase the chance of a click",
            "Cut to one CTA; AI tends to add multiple, but one email should do one job",
            "Replace all three with a survey asking which action the reader prefers",
          ],
          answer: 1,
          explanation:
            "Multiple CTAs split attention and consistently underperform a single, clear ask. AI drafts tend toward comprehensiveness; your edit should enforce focus. One email, one job.",
        },
      ],
      explanation:
        "Email is where AI's volume advantage is most immediately testable — generate subject line variants, draft sequences, and produce personalized copy at scale. Then edit for the principles AI consistently overlooks: one CTA, preview text, and mobile-friendly length.",
    },
    {
      slug: "ai-data-and-campaign-analysis",
      title: "AI for Campaign Analysis & Reporting",
      blurb: "Turn raw performance data into insights, narratives, and next actions — without a data team.",
      xp: 25,
      kind: "quiz",
      content: `# AI for Campaign Analysis & Reporting

Marketing teams often drown in data and starve for insight. AI is a genuinely
useful bridge — it can't access your live dashboards, but it can do a lot with
data you bring to it.

## What you can actually do

**Interpreting raw tables**
Export a CSV or paste a table of campaign performance metrics. Ask AI to:
- Identify the top 3 and bottom 3 performers and what they have in common
- Spot any metrics that look anomalous and suggest what might explain them
- Translate the numbers into a plain-English narrative for a stakeholder update

**Writing the story, not just the numbers**
Reporting is communication. AI is good at translating a table of numbers into a
clear narrative: "What does this data say happened, and what should we do next?"
Give it the context (what you expected, what actually happened) and ask for a
draft summary — then fact-check it against the original data.

**Generating hypotheses**
Describe a performance problem (e.g., "email open rates dropped 18% this month
compared to last quarter") and ask AI to generate a list of plausible explanations.
You get a structured troubleshooting agenda rather than gut-feeling guessing.

**Drafting next-step recommendations**
Given a campaign post-mortem, ask AI to draft the "what we'd do differently"
section. It provides a structured starting point you can confirm, challenge, or
expand based on what you know about context AI doesn't have.

## Critical limitations

- **AI does not see your live data.** It works with what you paste. Keep that
  data minimal if it includes anything sensitive (customer PII, confidential
  revenue figures).
- **AI can fabricate insights.** If you give it thin data, it will fill gaps with
  plausible-sounding reasoning that isn't grounded in your actual numbers. Always
  sanity-check conclusions against the source.
- **Correlation is not causation.** AI will surface associations in data, but
  determining why something happened requires your knowledge of what else changed
  (new creative, a competitor's move, a seasonality effect).`,
      questions: [
        {
          prompt: "You paste a month's campaign metrics into AI and ask for a summary. What is the most important thing to do after reading its response?",
          options: [
            "Publish the summary directly — AI analysis is objective",
            "Sanity-check the AI's conclusions against your actual source data",
            "Ask AI to generate a second summary and compare the two",
          ],
          answer: 1,
          explanation:
            "AI can generate plausible-sounding insights that don't accurately reflect thin or ambiguous data. Every conclusion AI draws from your numbers should be cross-checked against the source before it's shared or acted on.",
        },
        {
          prompt: "Email open rates dropped 18% month-over-month. You ask AI to list possible explanations. What is this technique best described as?",
          options: [
            "Root cause confirmation — AI can tell you exactly why the drop happened",
            "Hypothesis generation — AI surfaces plausible explanations that you then investigate",
            "Anomaly correction — AI fixes the underlying issue",
          ],
          answer: 1,
          explanation:
            "AI doesn't know your send list, deliverability history, or recent creative changes — so it can't confirm causation. What it can do is efficiently generate a structured list of plausible explanations, giving you an investigation agenda.",
        },
        {
          prompt: "Before pasting campaign data into a public AI tool, what should a marketer check?",
          options: [
            "Whether AI has seen this type of data before",
            "Whether the data contains customer PII or confidential revenue figures that should be redacted or are prohibited by company policy",
            "Whether the data is formatted as a CSV or a table",
          ],
          answer: 1,
          explanation:
            "Marketing data often contains customer information or sensitive revenue figures. Data governance matters: redact PII before pasting, and check whether your organization's policy permits sharing business data with external AI tools.",
        },
      ],
      explanation:
        "AI converts data tables into narratives and generates hypotheses — valuable when you bring the data, apply the context, and verify the conclusions. It cannot access live dashboards, doesn't know your business context, and can fill thin data with plausible-sounding fiction.",
    },
    {
      slug: "ai-marketing-capstone",
      title: "Building an AI-Powered Marketing Workflow",
      blurb: "Capstone: assemble the pieces into a repeatable system — and avoid the traps that burn teams.",
      xp: 25,
      kind: "quiz",
      content: `# Building an AI-Powered Marketing Workflow

You've covered research, copy, SEO, email, and analysis. The final skill is
**integration** — turning individual AI wins into a system that compounds.

## A repeatable content production workflow

1. **Research** — mine customer reviews, synthesize themes, build a real persona.
2. **Brief** — use AI to draft a content brief with H2 structure and questions to
   answer. A human expert reviews and approves.
3. **Draft** — AI writes a first pass. The human adds expertise, first-hand
   examples, original opinion, and fact-checked data.
4. **Edit** — replace AI clichés, tighten length, verify all claims. Read aloud.
5. **Distribute** — AI remixes the finished piece: 5 social captions, 2 email
   teasers, 3 subject line options.
6. **Analyze** — post-performance, use AI to draft the post-mortem narrative and
   next-step recommendations.

Each step is faster with AI, but every step has a human checkpoint. This is the
pattern of durable, high-quality output.

## The traps that burn marketing teams

**The volume trap.** Publishing 10x more AI content and getting 10x lower quality
per piece. More is not better if it dilutes brand trust. Maintain quality
standards — AI is there to make good content faster, not to flood channels.

**The hallucination-in-print trap.** Publishing AI-drafted copy that contains an
invented statistic, a wrong product claim, or a misquoted customer. A single
credibility mistake can cost more than the time savings AI provides. Verify facts.

**The brand-drift trap.** Letting AI's median-of-the-internet voice gradually
replace your brand voice. Give AI a style guide, review AI output against it, and
periodically read a month's output as a stack to catch drift before it sets in.

**The over-automation trap.** Automating so many steps that no human reads the
final output before it publishes. Full automation without human checkpoints is
where brand and factual disasters happen.

## What separates good AI marketing from bad

The teams getting the most from AI as of 2026 are not the ones using it most.
They're the ones using it with **clear human checkpoints, brand standards, and a
discipline of verification** — treating AI as a multiplier on good human judgment,
not a replacement for it.`,
      questions: [
        {
          prompt: "A marketing team doubles their content output using AI but receives feedback that their content now feels generic and inconsistent with their brand. What most likely caused this?",
          options: [
            "They used the wrong AI model",
            "They fell into the brand-drift trap — AI's default voice gradually replaced theirs without a style guide or periodic review",
            "They published too frequently for search engines to index the content",
          ],
          answer: 1,
          explanation:
            "Without a clear style guide given to AI and a periodic review process, AI's median-of-the-internet voice creeps into brand output over time. Catching drift requires reading accumulated output as a set, not just individual pieces.",
        },
        {
          prompt: "Which AI marketing workflow has the lowest risk of brand and factual disasters?",
          options: [
            "Full automation: AI researches, writes, and publishes with no human in the loop",
            "AI at each stage with human checkpoints for review, fact verification, and approval before publishing",
            "Using AI only for brainstorming and writing everything else manually",
          ],
          answer: 1,
          explanation:
            "Human checkpoints at key stages — especially before publishing — are the primary safeguard against hallucinated facts, off-brand tone, and errors. Full automation removes the safety net; manual-only work gives up the speed advantage. Human-in-the-loop at each stage is the durable middle path.",
        },
        {
          prompt: "What most distinguishes high-performing marketing teams using AI from those seeing disappointing results, as of 2026?",
          options: [
            "High-performing teams use the most advanced and expensive AI models",
            "High-performing teams publish the highest volume of AI content",
            "High-performing teams use AI as a multiplier on good human judgment — with brand standards, verification habits, and clear checkpoints",
          ],
          answer: 2,
          explanation:
            "Tool choice and volume are not the differentiators. The teams winning with AI have clear processes: they bring quality inputs, maintain brand standards, verify facts, and keep humans meaningfully in the loop. AI multiplies the quality of the judgment you apply to it.",
        },
      ],
      explanation:
        "A sustainable AI marketing workflow treats AI as a speed multiplier at each stage with human checkpoints throughout. The traps — volume-over-quality, hallucinated facts, brand drift, over-automation — all share one root cause: removing human judgment from the loop.",
    },
  ],
};
