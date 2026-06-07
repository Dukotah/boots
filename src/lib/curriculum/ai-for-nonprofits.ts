import type { Module } from "./types";

// AI for Nonprofits — practical AI literacy for mission-driven organizations.
// Every lesson is a quiz so staff at any technical level can complete it.
export const aiForNonprofits: Module = {
  slug: "ai-for-nonprofits",
  title: "AI for Nonprofits",
  description:
    "Practical AI skills for mission-driven teams. Learn where AI saves real staff hours, how to write better donor communications with AI assistance, how to stay compliant with funder and data-privacy rules, and how to pilot a tool without blowing your tech budget.",
  emoji: "🤝",
  gradient: "from-sky-500/20 to-blue-500/10",
  tagline:
    "Use AI to stretch your nonprofit's capacity — smarter grant writing, donor outreach, volunteer coordination, and ethical data practices.",
  keywords: [
    "AI for nonprofits",
    "nonprofit technology",
    "grant writing AI",
    "donor communications AI",
    "nonprofit automation",
    "ChatGPT for nonprofits",
    "Claude for nonprofits",
    "nonprofit AI tools",
  ],
  lessons: [
    {
      slug: "why-ai-for-nonprofits",
      title: "Why AI Matters for Nonprofits",
      blurb: "Capacity gaps, burnout, and how AI can stretch a small team without replacing it.",
      xp: 20,
      kind: "quiz",
      content: `# Why AI Matters for Nonprofits

Most nonprofits run lean. A development director also writes the newsletter. The
program manager also recruits volunteers. The executive director also answers
grant RFPs on weekends. This is the **capacity problem** — the mission is large
and the staff is small.

AI assistants like Claude, ChatGPT, and Gemini can help absorb repetitive,
language-heavy work:

- **Drafting** — a first pass at a grant narrative, donor thank-you letter,
  board report, or social post takes seconds instead of hours.
- **Summarizing** — paste a 30-page funder report and get a one-page summary.
- **Reformatting** — turn a program evaluation into a fact sheet or a slide deck
  outline.
- **Brainstorming** — generate 10 event name ideas, 5 volunteer recognition
  approaches, or 3 email subject-line options in one shot.

A few grounding truths:

- **AI is a capacity multiplier, not a replacement.** A human still decides what
  sounds right, what aligns with your values, and what gets sent.
- **Speed is real but quality needs review.** Drafts come fast; they also need
  editing by someone who knows the program.
- **The learning curve is low.** If a staff member can write an email, they can
  use AI. No coding or technical background required.

The nonprofits getting the most from AI in 2026 are not the biggest — they are
the ones that have built a habit of reaching for it on small, repetitive tasks.`,
      questions: [
        {
          prompt: "What is the primary reason AI is especially valuable for nonprofits?",
          options: [
            "Nonprofits can use AI to replace program staff and cut payroll costs",
            "Most nonprofits have a capacity problem — large missions, small teams — and AI absorbs repetitive language-heavy tasks",
            "AI generates guaranteed grant funding automatically",
          ],
          answer: 1,
          explanation:
            "AI's main nonprofit value is stretching limited staff time. It handles first drafts, summaries, and reformatting so humans can focus on judgment and relationships.",
        },
        {
          prompt: "Which task is AI most reliably useful for in a nonprofit setting?",
          options: [
            "Making final decisions about whether a program should continue",
            "Producing a first draft of a donor thank-you letter or grant narrative for a human to review and edit",
            "Replacing relationship-based major gift conversations",
          ],
          answer: 1,
          explanation:
            "AI excels at generating first drafts quickly. A human must still review for accuracy, tone, and alignment with organizational values before anything is sent.",
        },
        {
          prompt: "What level of technical skill does a nonprofit staff member need to start using AI tools?",
          options: [
            "Advanced programming knowledge",
            "No special technical background — if you can write an email, you can use AI",
            "A data science degree",
          ],
          answer: 1,
          explanation:
            "The leading AI assistants are chat-based. If you can type a question or paste text, you can use them productively from day one.",
        },
      ],
      explanation:
        "AI is a practical capacity multiplier for lean nonprofit teams — not magic, not a staff replacement, but a genuine time-saver on drafting and summarizing work.",
    },
    {
      slug: "grant-writing-with-ai",
      title: "Grant Writing with AI",
      blurb: "Speed up narratives, logic models, and budgets while keeping your authentic voice.",
      xp: 22,
      kind: "quiz",
      content: `# Grant Writing with AI

Grant writing is one of the highest-leverage places to use AI in a nonprofit.
A typical RFP response requires: a needs statement, a program narrative, a logic
model, an evaluation plan, and a budget narrative — often due in two to four weeks
alongside everything else you do.

**Where AI helps most:**

- **Needs statement drafts** — give AI your statistics and target population, ask
  it to draft a compelling paragraph, then edit for accuracy and voice.
- **Logic model language** — describe your program in plain English; ask AI to
  convert it into inputs → activities → outputs → outcomes format.
- **Budget narrative** — explain each line item to AI, ask for a paragraph that
  justifies it to a funder unfamiliar with your field.
- **Proofreading and tightening** — "shorten this by 20%, keep all key evidence"
  is a command that works well.

**What AI cannot do for you:**

- Verify that your statistics are current and from credible sources. AI may
  produce outdated or hallucinated figures — always check against the source.
- Know your funder's priorities better than you do. Relationships and research
  are still how you tailor a proposal.
- Submit the application. Most portals still require a human login and review.

**Practical prompt:** *"Here is the RFP's stated priority: [paste funder language].
Here is our program's theory of change: [describe it]. Draft a 200-word narrative
showing alignment. Use a professional but warm tone."*

After the draft: fact-check every number, replace any generic phrasing with
specific examples from your work, and read it aloud — if it doesn't sound like
your organization, keep editing.`,
      questions: [
        {
          prompt: "A program officer asks why you need $45,000 for staff time. Which AI task is most appropriate here?",
          options: [
            "Ask AI to invent a justification that sounds convincing",
            "Give AI the actual FTE breakdown and ask it to write a clear, funder-facing paragraph explaining the staffing costs",
            "Let AI submit the budget directly to the funder's portal",
          ],
          answer: 1,
          explanation:
            "AI is excellent at translating real data into clear explanatory prose. Always feed it accurate numbers; never let it fabricate justifications.",
        },
        {
          prompt: "You paste a needs statement draft into Claude and it includes a statistic you don't recognize. What should you do?",
          options: [
            "Trust it — Claude is connected to the latest research databases",
            "Verify the statistic against the original source before including it in the submission",
            "Remove all statistics from the proposal",
          ],
          answer: 1,
          explanation:
            "AI can hallucinate statistics with full confidence. Any number in an AI draft must be verified against a credible, citable source before submission.",
        },
        {
          prompt: "What does AI NOT replace in the grant-writing process?",
          options: [
            "Drafting the first version of a needs statement",
            "Converting program descriptions into logic model language",
            "Researching funder priorities and building the relationship with a program officer",
          ],
          answer: 2,
          explanation:
            "Funder relationships and targeted research are human work. AI speeds up the writing — it cannot learn what a specific funder cares about this cycle.",
        },
      ],
      explanation:
        "AI is a powerful first-draft machine for grant writing, but fact-checking statistics and knowing your funder remain irreplaceable human tasks.",
    },
    {
      slug: "donor-communications",
      title: "Donor Communications at Scale",
      blurb: "Personalized thank-yous, appeals, and stewardship letters — without the copy-paste fatigue.",
      xp: 22,
      kind: "quiz",
      content: `# Donor Communications at Scale

Donor retention is built on making donors feel seen and valued. The problem:
personalizing hundreds (or thousands) of thank-you letters, renewal appeals, and
impact reports takes more time than most development shops have.

AI makes **segment-level personalization** practical:

- **Segmented thank-you letters** — give AI your donor segments (first-time,
  recurring, lapsed, major) and your impact data, ask for a distinct letter per
  segment. Each will have a different opening and emphasis.
- **Renewal appeal drafts** — provide last year's results and this year's ask;
  AI drafts the narrative, you add a specific story or testimonial.
- **Impact summaries** — paste your annual report data, ask AI to write a
  two-paragraph donor-facing version that ties numbers to real lives.

**Prompt pattern for donor letters:**

> *"Write a 150-word thank-you letter from a food bank to a first-time online
> donor who gave $50. Warm and specific — mention that their gift covers 15
> meals. Include a one-sentence line about what's coming next year. Sign off
> from 'The Programs Team.'"*

**What still needs you:**

- The specific human story, quote, or photo that makes the piece memorable.
- Final personalization (Dear Maria vs. Dear Supporter) unless your CRM merges
  fields automatically.
- Approval before anything goes to a major donor — relationships at that level
  are not draft-and-send.

**A note on authenticity:** donors can sense a generic, impersonal letter. The
goal is to use AI for the structural work so you have more time for the specific
story that makes the letter feel real.`,
      questions: [
        {
          prompt: "A development associate needs to write 4 different thank-you letters for donor segments. How can AI help most efficiently?",
          options: [
            "Ask AI to write one generic letter and blast it to all segments unchanged",
            "Provide AI with each segment's profile and giving data, and ask for a tailored draft per segment",
            "Have AI access your donor database and send letters automatically",
          ],
          answer: 1,
          explanation:
            "Segment-specific prompts get segment-specific drafts. Giving AI the relevant context for each group produces distinct, appropriate letters far faster than writing from scratch.",
        },
        {
          prompt: "Which element should a human add AFTER AI produces a donor impact letter draft?",
          options: [
            "The word count",
            "The mailing address formatting",
            "A specific story, testimonial, or photo that makes the impact feel real",
          ],
          answer: 2,
          explanation:
            "AI can build a solid structural draft but lacks the authentic human story that makes donor communications memorable. That's the human's contribution.",
        },
        {
          prompt: "When is it NOT appropriate to use an AI draft directly for donor communication?",
          options: [
            "For a first-time online donor's automated thank-you email",
            "For a major donor stewardship letter where the relationship is personal and high-stakes",
            "For a general year-end appeal to a broad list",
          ],
          answer: 1,
          explanation:
            "Major donor relationships require personal attention and careful human review. A draft-and-send approach is appropriate for high-volume transactional messages, not high-touch major gift stewardship.",
        },
      ],
      explanation:
        "AI handles structural donor writing at scale; humans supply the authentic story and personal touch that builds lasting relationships.",
    },
    {
      slug: "volunteer-and-program-ops",
      title: "AI in Volunteer & Program Operations",
      blurb: "Recruitment posts, onboarding docs, schedules, and meeting summaries — faster.",
      xp: 20,
      kind: "quiz",
      content: `# AI in Volunteer & Program Operations

Program and volunteer coordinators are often the most overstretched staff in a
nonprofit. AI can cut hours off recurring operational writing tasks.

**Volunteer recruitment:**

- **Position descriptions** — describe the role in plain English; AI formats it
  into a clear, appealing listing with responsibilities and time commitment.
- **Outreach posts** — give AI the key facts and ask for three social media
  versions (Instagram caption, LinkedIn post, Facebook post) tuned to each
  platform's length and tone.

**Volunteer onboarding:**

- **FAQ documents** — tell AI the 10 questions new volunteers always ask; it
  drafts a readable FAQ you can drop into your orientation packet.
- **Orientation scripts** — outline the key points; AI writes a conversational
  script. Your coordinator edits for accuracy, then uses it as a guide.

**Program operations:**

- **Meeting agendas and summaries** — paste raw meeting notes; ask AI to turn
  them into a structured summary with action items, owners, and due dates.
- **Data interpretation** — paste a program outcome table; ask AI to explain
  what the numbers mean in plain English for a board presentation.
- **Policy plain-language versions** — paste a dense policy document; ask AI
  to rewrite it at a 7th-grade reading level for client-facing use.

**Realistic limits:** AI cannot verify that your volunteer screening process
meets your state's requirements, and it cannot manage the human dynamics of a
volunteer conflict. It handles paperwork; you handle people.`,
      questions: [
        {
          prompt: "A coordinator needs Instagram, LinkedIn, and Facebook posts for the same volunteer opening. The best AI approach is to:",
          options: [
            "Write one post and copy it identically to all platforms",
            "Ask AI for three platform-tuned versions in a single prompt, providing the key role details",
            "Use AI only for Instagram because other platforms are too formal",
          ],
          answer: 1,
          explanation:
            "AI can produce platform-appropriate variations in one prompt. Instagram captions, LinkedIn posts, and Facebook updates have different optimal lengths and tones.",
        },
        {
          prompt: "After a staff meeting, a program manager pastes raw notes into Claude and asks for a structured summary with action items. This is:",
          options: [
            "An inappropriate use — meeting notes are confidential and should never be pasted anywhere",
            "A good use — AI can organize unstructured notes into a clear summary with owners and due dates",
            "Only appropriate if the notes have fewer than 50 words",
          ],
          answer: 1,
          explanation:
            "Summarizing meeting notes is a high-value, low-risk AI task. Use judgment about sensitivity (avoid pasting names linked to personal data), but for standard operational notes it works well.",
        },
        {
          prompt: "What should a coordinator do if AI produces an orientation script that contains a policy claim they're not sure about?",
          options: [
            "Trust it — AI has been trained on nonprofit policy documents",
            "Verify the claim against your actual policy documents before using the script",
            "Remove all policy references from orientation materials",
          ],
          answer: 1,
          explanation:
            "AI drafts must be fact-checked against authoritative internal sources, especially when they describe policies or legal requirements that affect volunteers.",
        },
      ],
      explanation:
        "AI turns hours of operational writing into minutes. The coordinator's job shifts from drafting to reviewing, fact-checking, and making the human calls AI can't make.",
    },
    {
      slug: "data-privacy-compliance",
      title: "Data, Privacy & Funder Compliance",
      blurb: "What you can and can't paste into AI tools — and how to protect donor and client data.",
      xp: 25,
      kind: "quiz",
      content: `# Data, Privacy & Funder Compliance

Nonprofits handle sensitive data: donor giving history, client case files, health
information, minor demographics, and sometimes confidential funder strategy. The
convenience of AI tools creates real risk if you treat them as fully private.

**The default rule: assume what you paste may be stored.**

Most consumer AI tools (free tiers of Claude, ChatGPT, Gemini) log conversations
and may use them to improve models, depending on settings. Enterprise or API tiers
typically offer stronger privacy controls and data processing agreements — but
defaults matter, and staff often use free tools.

**What should never go into a public AI chat:**

- **Client personally identifiable information (PII)** — names, addresses,
  case numbers, health diagnoses, income, immigration status.
- **Donor full giving records** linked to names and contact info.
- **Confidential funder communications** — some grant agreements explicitly
  prohibit sharing proposal content with third parties.
- **Employee HR data** — performance records, compensation, disciplinary notes.

**How to get AI's help without sharing sensitive data:**

- **Redact first** — replace [CLIENT NAME] and [CASE NUMBER] with placeholders.
  AI can still help with the structure and language of a case note template.
- **Use aggregate, de-identified data** — "We served 320 clients last quarter,
  45% under age 18" is safe. "Here is the full dataset with names" is not.
- **Check your grant agreement** — some funders restrict what tools you may use
  to process program data. When in doubt, ask your program officer.

**Sector-specific laws to know:**

- **HIPAA** applies if you provide health or behavioral health services.
- **COPPA** applies if you collect data on children under 13.
- **State privacy laws** vary; consult counsel for your specific state.

Building a simple one-page AI Acceptable Use Policy for your organization closes
most of the gap before a problem occurs.`,
      questions: [
        {
          prompt: "A case manager wants AI to help write a progress note. The case file includes the client's full name and diagnosis. What should they do?",
          options: [
            "Paste the full file — AI tools are HIPAA compliant by default",
            "Redact the name and diagnosis to placeholders like [CLIENT] and [DIAGNOSIS] before pasting",
            "Avoid using AI for any case-related work entirely",
          ],
          answer: 1,
          explanation:
            "Redaction lets you get AI's writing assistance without exposing protected health information. Consumer AI tools are not HIPAA compliant by default; enterprise agreements are needed for PHI.",
        },
        {
          prompt: "Which of these is safest to paste into a free public AI chat tool?",
          options: [
            "A spreadsheet of donor names, addresses, and giving amounts",
            "Aggregate, de-identified program outcome data: 'We served 320 clients, 45% under 18'",
            "A client's case history with their immigration status noted",
          ],
          answer: 1,
          explanation:
            "Aggregate, de-identified figures carry no individual privacy risk and are safe to share. PII and case details must be redacted before use in consumer AI tools.",
        },
        {
          prompt: "Before using an AI tool to draft content related to a restricted grant program, a development director should:",
          options: [
            "Assume all AI tools are acceptable — grant agreements don't cover technology",
            "Check the grant agreement for any restrictions on third-party tools or data handling",
            "Only check if the grant is over $100,000",
          ],
          answer: 1,
          explanation:
            "Some funders explicitly restrict how grantees may process or share program data. Reading the agreement — and asking the program officer when unclear — prevents a compliance violation.",
        },
      ],
      explanation:
        "Redact before you paste, use aggregate data where possible, check your grant agreements, and build a simple AI Acceptable Use Policy to protect clients, donors, and your organization.",
    },
    {
      slug: "picking-and-piloting-tools",
      title: "Picking & Piloting AI Tools on a Nonprofit Budget",
      blurb: "Evaluate tools without a big IT department, run a low-cost pilot, and build staff buy-in.",
      xp: 22,
      kind: "quiz",
      content: `# Picking & Piloting AI Tools on a Nonprofit Budget

Most nonprofits can't afford a full IT department to vet every new tool. Here is
a practical, budget-conscious approach to adopting AI without creating chaos.

**Step 1 — Define the problem first.**

Do not start with "let's try AI." Start with: "Our grant writers spend 6 hours on
logic model language every proposal cycle — what could cut that in half?" A
specific problem leads to a testable solution.

**Step 2 — Start with free tiers.**

Claude.ai, ChatGPT, and Gemini all have usable free tiers. Run a 30-day internal
pilot with 2–3 staff on the specific task before spending anything.

**Step 3 — Evaluate on three axes:**

1. **Quality** — does the output require less editing than writing from scratch?
2. **Privacy** — does the tool offer a data processing agreement (DPA)? Is it
   appropriate for the data you'll feed it?
3. **Adoption** — will the staff who need it actually use it? Involve them in
   the pilot, not just the decision.

**Step 4 — Check for nonprofit discounts.**

Many AI vendors offer nonprofit pricing. Anthropic, OpenAI, Google, and Microsoft
all have nonprofit or social-sector programs. TechSoup is still a good starting
point for discounts and donated licenses in 2026.

**Step 5 — Document and share what works.**

Write a one-paragraph summary of what prompt worked, what task it helped with, and
what still needed human editing. Shared in Slack or a team doc, this becomes the
team's playbook in weeks, not months.

**Red flags to avoid:**

- Any tool that promises to "fully automate" grant writing or donor outreach —
  quality review is not optional.
- Vendors that cannot produce a data processing agreement for sensitive data.
- Rushing to sign an annual contract before a free pilot confirms the tool works
  for your specific use cases.`,
      questions: [
        {
          prompt: "Before spending money on an AI tool subscription, what should a nonprofit do first?",
          options: [
            "Sign an annual contract immediately to lock in nonprofit pricing",
            "Run a 30-day pilot with 2–3 staff using a free tier on the specific task to confirm value",
            "Wait until every staff member agrees it is needed",
          ],
          answer: 1,
          explanation:
            "A low-cost pilot on the free tier validates whether the tool actually solves your specific problem before committing budget.",
        },
        {
          prompt: "A vendor promises their AI tool will 'fully automate your grant writing.' This should be treated as:",
          options: [
            "A clear sign the tool is worth buying immediately",
            "A red flag — quality review of AI-generated content is not optional in grant work",
            "A standard feature all AI tools offer",
          ],
          answer: 1,
          explanation:
            "No tool fully automates grant writing responsibly. Claims of full automation signal either marketing hype or a product that skips the human review step that keeps submissions accurate.",
        },
        {
          prompt: "Where should a nonprofit look for reduced-cost AI tool licenses?",
          options: [
            "Only through direct negotiation with each vendor's sales team",
            "Nonprofit programs at Anthropic, OpenAI, Google, and Microsoft, plus TechSoup for donated licenses",
            "AI tools do not offer nonprofit discounts",
          ],
          answer: 1,
          explanation:
            "Major AI vendors have nonprofit or social-sector pricing tiers, and TechSoup aggregates software donations and discounts. Checking these before paying full price is standard practice.",
        },
      ],
      explanation:
        "Define the problem first, pilot free before paying, check for nonprofit discounts, and document what works so the whole team benefits from early wins.",
    },
    {
      slug: "ai-nonprofits-capstone",
      title: "Capstone: Building Your Nonprofit AI Strategy",
      blurb: "Tie it all together — ethics, prioritization, staff culture, and your 90-day plan.",
      xp: 25,
      kind: "quiz",
      content: `# Capstone: Building Your Nonprofit AI Strategy

You now have the building blocks. This capstone lesson turns them into a coherent
plan you can actually take back to your team.

**The four-part nonprofit AI strategy:**

1. **Use cases** — which tasks eat the most staff time and involve the most
   repetitive writing? Start there. Grant narratives, donor letters, volunteer
   recruitment posts, meeting summaries, and board reports are common first wins.

2. **Guardrails** — what can staff paste and what can't they? Write one page.
   Cover: no client PII in consumer tools, no confidential funder communications
   without a DPA, aggregate-only donor data. Make it practical, not a ban.

3. **Pilot and learn** — pick one use case, two to three staff, 30 days. Measure:
   time saved, editing effort, output quality, and whether staff like using it.

4. **Culture** — frame AI as a tool that *serves the mission*, not a replacement
   for the people who carry it. Early adopters sharing wins ("this saved me 2
   hours on the Kresge narrative") build momentum faster than any top-down mandate.

**Ethical questions your board and leadership should discuss:**

- Should AI-assisted content be disclosed to funders? (Most don't require it yet,
  but transparency is good practice in the sector.)
- How do you ensure AI outputs don't introduce bias into program materials or
  client communications?
- What happens when AI makes a factual error that reaches a major donor or funder?
  Who is accountable?

**Your 90-day starting plan:**

- Week 1–2: Identify top 3 use cases, draft a one-page acceptable use policy.
- Week 3–4: Set up free-tier accounts for 2–3 staff, run the first pilot task.
- Week 5–8: Collect feedback, document winning prompts, share broadly.
- Week 9–12: Evaluate whether a paid tier or specialized tool is warranted.
  Apply for nonprofit pricing if so.

You don't need a technology strategy. You need a specific problem, a specific
experiment, and a team that shares what it learns.`,
      questions: [
        {
          prompt: "A nonprofit's leadership asks which AI use case to tackle first. The best answer is:",
          options: [
            "The most technically impressive tool available",
            "The task that eats the most staff time and involves the most repetitive writing — common examples include grant narratives and donor letters",
            "Whatever other nonprofits in the sector are doing",
          ],
          answer: 1,
          explanation:
            "Starting with the highest-pain, highest-frequency writing task maximizes the return on the learning investment and makes early wins visible to skeptical staff.",
        },
        {
          prompt: "When an AI draft contains a factual error that a donor reads in a year-end report, who is accountable?",
          options: [
            "The AI vendor — they produced the error",
            "The nonprofit staff member who reviewed and approved the content before it was sent",
            "No one — AI errors are considered force majeure",
          ],
          answer: 1,
          explanation:
            "AI is a drafting assistant; the human who approves and sends content is accountable for its accuracy. This is why review steps are non-negotiable.",
        },
        {
          prompt: "What is the most effective way to build AI adoption culture in a nonprofit team?",
          options: [
            "A top-down mandate that all staff must use AI immediately",
            "Early adopters sharing concrete wins — 'this saved me 2 hours on the Kresge narrative' — so others see practical value",
            "Restricting AI use to the executive director only",
          ],
          answer: 1,
          explanation:
            "Peer stories of real time saved are the most persuasive adoption driver in any organization. Mandates create resistance; visible wins create curiosity.",
        },
      ],
      explanation:
        "A nonprofit AI strategy needs four things: clear use cases, practical guardrails, a low-cost pilot, and a culture where staff share what works. Start small, document wins, and grow from there.",
    },
  ],
};
