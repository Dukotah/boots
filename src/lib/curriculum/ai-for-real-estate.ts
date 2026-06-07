import type { Module } from "./types";

// AI for Real Estate — practical AI literacy for agents, brokers, investors,
// and buyers/sellers. All quiz/reading lessons (no coding required).
export const aiForRealEstate: Module = {
  slug: "ai-for-real-estate",
  title: "AI for Real Estate",
  description:
    "Use AI to work smarter in every phase of a real estate transaction — from prospecting and market research to listing copy, client communication, negotiation prep, and closing paperwork. No coding needed, just practical workflows.",
  emoji: "🏡",
  gradient: "from-emerald-500/20 to-teal-500/10",
  tagline:
    "Practical AI skills for agents, brokers, and investors — write listings faster, research smarter, and close more deals.",
  keywords: [
    "AI for real estate agents",
    "AI for realtors",
    "real estate AI tools",
    "AI listing copy",
    "AI property research",
    "ChatGPT for real estate",
    "AI for property investors",
  ],
  lessons: [
    {
      slug: "re-ai-landscape",
      title: "The AI Landscape for Real Estate",
      blurb: "Which AI tools are actually useful in real estate — and which are hype.",
      xp: 20,
      kind: "quiz",
      content: `# The AI Landscape for Real Estate

AI tools have arrived in real estate from multiple directions. Understanding the
landscape helps you invest time in tools that genuinely move the needle.

**General-purpose chatbots** (Claude, ChatGPT, Gemini) are the workhorses. They
write listing copy, draft emails, summarize documents, explain contract clauses,
and help you prep for client conversations — right now, for free or very low cost.

**Real estate–specific AI tools** layer on top: CMA assistants that pull MLS data,
AI-powered lead-scoring CRMs, automated offer-analysis tools, and virtual staging
apps that swap furniture in a photo.

**What AI does well in real estate:**
- Drafts and rewrites (listings, emails, social posts, bio copy)
- Research summaries (neighborhood demographics, school ratings, zoning basics)
- Explaining complex concepts in plain language (cap rate, 1031 exchange)
- Generating checklists, scripts, and templates

**What AI does not do (yet) reliably:**
- Access live MLS data on its own (it has a training cutoff; verify comps yourself)
- Predict prices with precision — the market is too local and fluid
- Replace your fiduciary judgment or legal/compliance review

The most effective agents in 2026 use AI as a **force-multiplier for the hours they
already put in** — not a replacement for local expertise.`,
      questions: [
        {
          prompt: "Which task is general-purpose AI (Claude, ChatGPT) best suited to handle for a real estate agent?",
          options: [
            "Pulling live, up-to-the-minute MLS comparable sales",
            "Drafting listing descriptions, client emails, and offer summaries",
            "Automatically submitting offers to escrow systems",
          ],
          answer: 1,
          explanation:
            "General-purpose chatbots excel at writing and summarizing. They do not have live MLS access — you must pull comps yourself and feed them to the AI.",
        },
        {
          prompt: "An agent asks an AI chatbot to predict next quarter's median home price in their city. What should they expect?",
          options: [
            "A precise, reliable forecast they can quote to clients",
            "A rough directional summary based on training data — useful context, not a guarantee",
            "Real-time data pulled from current market feeds",
          ],
          answer: 1,
          explanation:
            "AI chatbots have a knowledge cutoff and no live market feed. Their output gives useful background context, but should never be quoted as a price prediction to clients.",
        },
        {
          prompt: "What does 'AI as a force-multiplier' mean in a real estate context?",
          options: [
            "AI replaces agents entirely for routine transactions",
            "AI handles the repetitive writing and research so the agent can spend more time on high-value client work",
            "AI multiplies the number of listings an MLS will accept",
          ],
          answer: 1,
          explanation:
            "Force-multiplier means AI takes the time-consuming, repeatable tasks off the agent's plate — so local expertise and relationship work can scale further.",
        },
      ],
    },
    {
      slug: "re-listing-copy",
      title: "Writing Listing Descriptions with AI",
      blurb: "Turn raw property notes into compelling, SEO-friendly listings in minutes.",
      xp: 22,
      kind: "quiz",
      content: `# Writing Listing Descriptions with AI

A well-crafted listing description is one of the highest-leverage writing tasks in
real estate. AI can turn bullet-point property notes into polished, buyer-focused
copy in seconds — if you give it the right inputs.

**The inputs that matter:**
- Property type, beds/baths, square footage, lot size
- Year built, notable updates (roof, HVAC, kitchen remodel)
- Unique features (mountain views, pool, original hardwood, ADU)
- Neighborhood highlights (walkability, school district, proximity to transit)
- Target buyer persona (first-time buyer, downsizer, investor, luxury buyer)
- Tone (warm/lifestyle vs. crisp/data-driven vs. luxury/aspirational)
- Word count limit (MLS fields typically cap at 1,000 characters)

**A strong prompt structure:**
> "Write a listing description for a [style/type] home. [Key facts]. Features include
> [list]. The neighborhood offers [highlights]. Target buyer is [persona]. Tone:
> [tone]. MLS character limit: [N]."

**After the first draft:**
- Ask for a shorter version, a longer version, or a version that leads with a
  different feature
- Ask it to remove any Fair Housing red flags (avoid neighborhood characterizations
  that imply demographics)
- Ask it to punch up the headline or opening sentence

**Fair Housing note:** AI can inadvertently include phrases that imply protected
class information. Always read the final copy yourself before publishing.`,
      questions: [
        {
          prompt: "Which detail, when included in your AI prompt, most improves listing description quality?",
          options: [
            "The agent's personal commission rate",
            "The target buyer persona (e.g., first-time buyer, downsizer, investor)",
            "The MLS system's internal property ID number",
          ],
          answer: 1,
          explanation:
            "Knowing who the copy is speaking to lets the AI emphasize the right features — school district for a family buyer, low-maintenance for a downsizer, cap rate for an investor.",
        },
        {
          prompt: "After AI produces a first listing draft, what should you always do before publishing?",
          options: [
            "Publish immediately — AI copy is Fair Housing compliant by design",
            "Read it yourself to catch any Fair Housing red flags or neighborhood characterizations implying protected classes",
            "Send it directly to MLS without edits to preserve AI formatting",
          ],
          answer: 1,
          explanation:
            "AI can inadvertently use phrases that imply protected class information. The agent is responsible for Fair Housing compliance — a quick human review is non-negotiable.",
        },
        {
          prompt: "An agent wants three different tone variations of the same listing description. The fastest approach is to:",
          options: [
            "Write three separate prompts from scratch each time",
            "Ask the AI to rewrite the first draft with a different tone specified in a follow-up message",
            "Hire a copywriter for the additional variations",
          ],
          answer: 1,
          explanation:
            "AI remembers the conversation context. A follow-up like 'rewrite this in a luxury/aspirational tone' is faster than starting over and produces consistent facts across versions.",
        },
      ],
    },
    {
      slug: "re-client-communication",
      title: "Client Communication at Scale",
      blurb: "Draft buyer and seller emails, follow-ups, and updates without starting from a blank page.",
      xp: 22,
      kind: "quiz",
      content: `# Client Communication at Scale

Client communication is where most agents lose hours each week. AI turns 'I need to
write that email' from a 20-minute task into a 3-minute task — without sounding
robotic, if you prompt correctly.

**High-volume emails AI can draft for you:**
- Buyer introduction / welcome email with next-steps checklist
- Showing feedback request after a tour
- Offer presentation summary to the seller (multiple-offer scenario)
- Counteroffer explanation to the buyer — translating legalese to plain English
- Transaction milestone updates ('we're in escrow, here's what happens next')
- Post-closing thank-you and referral ask

**Keeping it personal:**
Include the client's name, the property address, and one specific detail from your
last interaction. Prompting "mention that we talked about her concern about the
school district" turns a generic draft into something that feels handwritten.

**Batch drafting:**
You can give AI a list of clients and situations and ask for a version of the same
email personalized for each scenario. This works especially well for market-update
newsletters where each paragraph stays the same but the opening and closing vary.

**Tone calibration:**
Ask for 'warm and reassuring' for an anxious first-time buyer, 'crisp and
data-forward' for an investor, or 'professional but celebratory' for a closing
thank-you. AI adjusts instantly.`,
      questions: [
        {
          prompt: "What single addition to an AI-drafted client email makes it feel least generic?",
          options: [
            "A longer signature block with all the agent's awards",
            "A specific detail from the last real conversation with that client",
            "Switching to a different AI tool for each email",
          ],
          answer: 1,
          explanation:
            "Specificity is what makes AI copy feel personal. One real detail — a concern they raised, a feature they loved — transforms a template into a genuine note.",
        },
        {
          prompt: "An agent has 12 clients who all need a market-update email this month. The most efficient AI workflow is:",
          options: [
            "Write one email by hand and copy-paste it 12 times",
            "Draft the core email in AI, then use follow-up prompts to personalize the opening/closing for each client segment",
            "Ask AI to write 12 completely different emails from scratch, one at a time",
          ],
          answer: 1,
          explanation:
            "Batch-drafting a shared core and then personalizing edges is faster than either manual copy-paste or 12 from-scratch drafts — and produces more consistent quality.",
        },
        {
          prompt: "Which tone instruction to AI is most appropriate when drafting a counteroffer explanation for a first-time buyer who is feeling nervous?",
          options: [
            "'Crisp and data-forward with minimal explanation'",
            "'Warm and reassuring, translate legalese to plain English'",
            "'Aggressive and urgent to push the buyer to decide quickly'",
          ],
          answer: 1,
          explanation:
            "Matching tone to the client's emotional state is good communication. An anxious buyer needs clarity and reassurance, not jargon or pressure.",
        },
      ],
    },
    {
      slug: "re-market-research",
      title: "Market Research and Neighborhood Analysis",
      blurb: "Use AI to synthesize public data into buyer-ready neighborhood summaries.",
      xp: 22,
      kind: "quiz",
      content: `# Market Research and Neighborhood Analysis

Buyers expect agents to be local experts on demand. AI helps you synthesize public
data into clear, credible neighborhood summaries faster than manual research.

**What AI can do with market and neighborhood data:**
- Summarize US Census demographic data you paste in (population trends, household
  income, age distribution)
- Explain school rating systems (GreatSchools, Niche) and what they measure
- Generate a pros/cons comparison of two neighborhoods based on criteria you provide
- Draft a neighborhood overview page for your website or buyer packet
- Explain zoning codes in plain English when you paste them in

**What AI cannot do:**
- Access live MLS data, Zillow estimates, or Redfin trends on its own
- Pull school ratings, crime statistics, or walk scores in real time
- Replace your personal knowledge of micro-neighborhoods (that block that backs up to
  the freeway, the HOA with the pending lawsuit)

**The hybrid workflow:**
1. Pull your own data from public sources (Census, school rating sites, county GIS,
   your MLS's market stats report)
2. Paste the raw numbers or key facts into AI
3. Ask it to summarize, compare, or turn the data into buyer-facing prose

This approach gets you accurate, current data (your job) packaged in polished,
readable copy (AI's job).`,
      questions: [
        {
          prompt: "An agent wants AI to summarize neighborhood demographics. The correct approach is to:",
          options: [
            "Ask AI to look up the demographics on its own — it has internet access",
            "Pull Census or public data yourself, paste it in, and ask AI to summarize and write it up",
            "Make up plausible-sounding statistics and have AI format them nicely",
          ],
          answer: 1,
          explanation:
            "AI chatbots do not reliably access live public databases. Paste your own sourced data in; the AI's job is synthesis and writing, not data retrieval.",
        },
        {
          prompt: "Which is an example of 'micro-neighborhood knowledge' that AI cannot replace?",
          options: [
            "The city's overall median list price",
            "Knowing that one particular block backs up to a noisy freight rail line",
            "A general explanation of what a homeowner's association does",
          ],
          answer: 1,
          explanation:
            "Hyper-local nuance — the noisy street, the pending HOA litigation, the flood-prone cul-de-sac — is exactly where agent expertise is irreplaceable. AI has no knowledge of these specifics.",
        },
        {
          prompt: "What does the 'hybrid workflow' for neighborhood research mean?",
          options: [
            "Alternating between two different AI tools for each research step",
            "The agent sources accurate current data, then uses AI to package it into polished, buyer-facing prose",
            "Letting AI do all steps — research, writing, and publishing — without agent input",
          ],
          answer: 1,
          explanation:
            "The hybrid approach plays to each party's strength: the agent handles accuracy (live data), AI handles presentation (clear, readable copy). Neither alone is as effective.",
        },
      ],
    },
    {
      slug: "re-offers-negotiation",
      title: "Offer Analysis and Negotiation Prep",
      blurb: "Let AI help you frame, compare, and explain offers — so you negotiate with clarity.",
      xp: 23,
      kind: "quiz",
      content: `# Offer Analysis and Negotiation Prep

Negotiation is where agents earn their commission. AI won't negotiate for you, but
it can sharpen your thinking before you walk into the conversation.

**Offer summary for sellers:**
In a multiple-offer situation, paste the key terms from each offer and ask AI to
produce a clean comparison table: purchase price, down payment, loan type,
contingencies, close-of-escrow date, and any unusual terms. This gives sellers a
decision-ready summary instead of three dense PDFs.

**Translating contract language:**
Paste a confusing addendum or contingency clause and ask AI to "explain this in
plain English for a first-time seller." This saves time and reduces
misunderstandings without replacing the advice of a real estate attorney.

**Preparing negotiation talking points:**
Describe the situation: the buyer's position, the seller's priorities, and any
known objections. Ask AI to draft counterarguments, talking points, or a list of
likely concessions each party might accept. Think of it as a brainstorming
sparring partner.

**Counter-offer math:**
If a seller wants net proceeds of $X and the buyer is at $Y, describe the gap and
ask AI to model out different scenarios — seller credit, price adjustment, closing
cost split — in plain arithmetic. Check the math yourself before using it.

**Important limits:**
AI does not know your specific jurisdiction's laws or your MLS's contract forms.
For legal questions about specific contract terms, refer clients to their attorney.`,
      questions: [
        {
          prompt: "In a multiple-offer situation, how can AI help a listing agent present options clearly to the seller?",
          options: [
            "AI automatically contacts each buyer's agent and requests best-and-final offers",
            "The agent pastes key terms from each offer; AI produces a comparison table the seller can read at a glance",
            "AI reviews the MLS rules to determine which offer must be accepted",
          ],
          answer: 1,
          explanation:
            "A clean comparison table — price, financing, contingencies, COE — lets sellers make an informed choice without wading through multiple PDFs. This is exactly what AI drafting is good at.",
        },
        {
          prompt: "An agent pastes a confusing contingency clause and asks AI to explain it in plain English. What is the correct follow-up?",
          options: [
            "Share the AI's explanation as formal legal advice to the client",
            "Use the plain-English summary to help the client understand, and refer specific legal questions to their attorney",
            "Skip the attorney — AI explanations are legally binding interpretations",
          ],
          answer: 1,
          explanation:
            "AI is useful for plain-language comprehension. It is not a substitute for legal counsel and should never be positioned as such.",
        },
        {
          prompt: "Why should an agent always check AI-generated counter-offer math manually?",
          options: [
            "AI refuses to do any arithmetic",
            "AI can make arithmetic errors and has no knowledge of local closing cost norms — verifying protects the agent and client",
            "Checking the math is required by NAR ethics rules",
          ],
          answer: 1,
          explanation:
            "AI can produce plausible-looking but incorrect calculations. In a transaction where dollar differences are large, a five-minute manual check is essential before any figure goes to a client.",
        },
      ],
    },
    {
      slug: "re-social-and-marketing",
      title: "Social Media and Marketing Content",
      blurb: "Build a consistent content presence without spending hours writing from scratch.",
      xp: 22,
      kind: "quiz",
      content: `# Social Media and Marketing Content

Consistent social presence builds brand and generates referrals — but most agents
are too busy with transactions to keep up. AI turns 'I need to post something' into
a 10-minute weekly workflow instead of an all-afternoon project.

**Content types AI drafts quickly:**
- Instagram/Facebook caption for a just-listed property (include: 3 hero features,
  neighborhood hook, call to action, relevant hashtags)
- 'Just sold' post — milestone for the client, social proof for you
- Market update carousel slide copy (one insight per slide, under 40 words)
- LinkedIn article draft on a local market trend you've observed
- Short-form video script (45–60 seconds) for a neighborhood walk-through or
  buyer-tip reel
- Monthly newsletter intro paragraph that ties to a season or local event

**Maintaining your voice:**
AI defaults to polished-but-generic. To keep your voice, paste one or two of your
own past posts and say "match this tone." The model will mirror your cadence,
vocabulary, and personality far better than starting cold.

**Batch content sessions:**
Block one hour per month. Tell AI your upcoming listings, recent closings, and any
market observations. Ask for a full month's content calendar — captions, post types,
posting days. You edit and approve; AI does the first-draft lift.

**Compliance reminder:**
Real estate marketing is regulated. Do not use AI to generate testimonials,
fabricate endorsements, or imply guarantees about home values. Review all content
against your brokerage's advertising guidelines before publishing.`,
      questions: [
        {
          prompt: "How do you get AI-generated social copy to sound like you rather than a generic agent?",
          options: [
            "Use a more expensive AI model",
            "Paste one or two of your own past posts and ask the AI to match that tone",
            "Always write social posts by hand — AI can never match personal voice",
          ],
          answer: 1,
          explanation:
            "Giving AI examples of your own writing is the fastest way to calibrate voice. It mirrors cadence, word choice, and personality from real samples.",
        },
        {
          prompt: "What is the most efficient way for a busy agent to use AI for a full month of social media content?",
          options: [
            "Write one post per day, submitting a fresh AI prompt each morning",
            "Block one hour per month, feed AI upcoming listings and market observations, and request a full content calendar at once",
            "Pay a social media assistant to manually post once the AI generates content",
          ],
          answer: 1,
          explanation:
            "Batch sessions are dramatically more efficient than daily one-off prompts. One focused session produces a month of content to review, approve, and schedule.",
        },
        {
          prompt: "Which type of AI-generated real estate marketing content poses a compliance risk?",
          options: [
            "A just-listed caption with the property address and three hero features",
            "AI-fabricated client testimonials or implied guarantees about future home value",
            "A market update post summarizing publicly available median price data",
          ],
          answer: 1,
          explanation:
            "Fabricated testimonials and value guarantees violate advertising regulations and NAR Code of Ethics. AI makes it trivially easy to generate them — which is exactly why you must not.",
        },
      ],
    },
    {
      slug: "re-ai-capstone",
      title: "Putting It All Together",
      blurb: "Capstone: design your own AI-powered real estate workflow from prospecting to closing.",
      xp: 25,
      kind: "quiz",
      content: `# Putting It All Together

You now have a working toolkit for AI in real estate. Let's close by mapping the
full transaction lifecycle and identifying where each skill you've built slots in —
and where human judgment remains irreplaceable.

**Pre-listing:**
- Listing presentation prep: AI drafts the market analysis narrative from your own
  CMA data; you bring the local expertise.
- Listing description: AI writes; you edit for accuracy and Fair Housing compliance.

**Active listing:**
- Social/marketing: AI drafts captions, newsletter intro, video scripts; you approve.
- Showing follow-ups: AI drafts feedback request emails; you send.

**Under contract:**
- Offer comparison table: AI formats the terms; you advise on which to recommend.
- Contract clause translation: AI explains; attorney advises.
- Transaction milestone updates: AI drafts the emails; you personalize and send.

**Closing and beyond:**
- Closing thank-you: AI drafts a warm note with a referral ask; you add the
  personal touch.
- Post-close nurture: AI drafts quarterly market update emails for your sphere; you
  review and send.

**The non-negotiables — what AI never replaces:**
1. Your fiduciary duty and ethical judgment
2. Local market knowledge (the block, the builder, the HOA)
3. Relationship trust built through real human presence
4. Legal and compliance review
5. Final decision-making authority in any negotiation

The agents who thrive in an AI-augmented market will be the ones who pair great
AI habits with irreplaceable local expertise and client relationships. You now have
the foundation to do both.`,
      questions: [
        {
          prompt: "During an active listing, where in the showing process does AI most naturally fit?",
          options: [
            "AI physically unlocks the property for showings using smart-lock integration",
            "AI drafts post-showing feedback request emails that the agent reviews and sends",
            "AI tells buyers whether to make an offer based on their tour notes",
          ],
          answer: 1,
          explanation:
            "Drafting the showing feedback email is a perfect AI task — it's repetitive, structured, and benefits from a warm tone. The agent sends it; AI just wrote the first draft.",
        },
        {
          prompt: "Which of the following is an example of something AI genuinely cannot replace in a real estate transaction?",
          options: [
            "Drafting a first version of a just-listed Instagram caption",
            "Translating a contract clause into plain English for a client",
            "Knowing that a specific HOA has a pending special assessment that will affect buyers",
          ],
          answer: 2,
          explanation:
            "Hyper-local, real-time knowledge — like a pending HOA special assessment — lives in the agent's network and experience, not in any AI training dataset. This is where local expertise is irreplaceable.",
        },
        {
          prompt: "An agent wants to build a sustainable AI workflow across their whole business. The best mindset is:",
          options: [
            "Use AI for everything and reduce agent involvement as much as possible",
            "Pair strong AI habits (speed, consistency, drafts) with irreplaceable local expertise and real client relationships",
            "Avoid AI entirely to differentiate from tech-forward competitors",
          ],
          answer: 1,
          explanation:
            "The most effective agents use AI to amplify their time and consistency — then show up with the local knowledge and human presence that AI can never replicate. Both together win.",
        },
      ],
      explanation:
        "From listing description to closing thank-you, AI handles the repeatable first drafts so you can focus on the irreplaceable: judgment, relationships, and local expertise.",
    },
  ],
};
