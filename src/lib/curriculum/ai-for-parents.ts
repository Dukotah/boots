import type { Module } from "./types";

// AI for Parents & Families — practical, jargon-free guidance for parents who
// want to understand AI tools, protect their children online, and use AI
// confidently at home. All quiz/reading lessons (no coding required).
export const aiForParents: Module = {
  slug: "ai-for-parents",
  title: "AI for Parents & Families",
  description:
    "AI is already in your kids' schools, games, and devices. Learn what it actually does, how to set sensible guardrails, how to talk to your children about it, and how to use it yourself to save time on family life.",
  emoji: "👨‍👩‍👧",
  gradient: "from-pink-500/20 to-rose-500/10",
  tagline:
    "Understand AI tools your kids are using, set smart guardrails, and put AI to work for your family — no tech background needed.",
  keywords: [
    "AI for parents",
    "kids and AI",
    "parental controls AI",
    "AI safety for children",
    "ChatGPT for parents",
    "AI at school",
    "family tech guide",
    "AI and teenagers",
  ],
  lessons: [
    {
      slug: "what-ai-actually-is",
      title: "What AI Actually Is (Plain English)",
      blurb:
        "Strip away the hype: what AI chatbots really do, and why that matters for your family.",
      xp: 20,
      kind: "quiz",
      content: `# What AI Actually Is (Plain English)

When your child says "I asked the AI," they almost certainly mean a **chatbot** —
an app that reads what you type and generates a response in natural language.
The main ones you'll encounter:

- **ChatGPT** (OpenAI) — the one that went mainstream and is everywhere in schools
- **Claude** (Anthropic) — known for careful, detailed responses; popular in education
- **Gemini** (Google) — baked into Google Search, Gmail, and Android
- **Copilot** (Microsoft) — built into Windows, Edge, and Office

Under the hood, all of them are **large language models (LLMs)**. An LLM has
processed an enormous amount of text and learned to predict what words are likely
to come next. That's it. It's a very sophisticated pattern-matcher — not a
conscious mind, not a search engine, not a database of verified facts.

**Why this matters for parents:**

- AI can produce wrong information in fluent, confident language — a child who
  trusts it without checking can act on bad advice.
- AI has no memory of past conversations by default, but *some* apps layer
  persistent memory on top — read the product's privacy policy.
- The same tool that helps with homework can generate inappropriate content if a
  child knows how to ask (this is why guardrails matter — covered later).

Knowing the basics puts you in a much better position to have useful conversations
with your kids and to evaluate the tools they're using.`,
      questions: [
        {
          prompt:
            "At its core, what is a chatbot like ChatGPT or Claude actually doing?",
          options: [
            "Looking up answers in a verified fact database",
            "Predicting likely next words based on patterns learned from huge amounts of text",
            "Thinking and reasoning the same way a human does",
          ],
          answer: 1,
          explanation:
            "LLMs generate text by prediction, not lookup. There's no verified database and no consciousness — which is why they can be wrong even when they sound confident.",
        },
        {
          prompt:
            "Which of the following is a practical reason parents should understand how AI works?",
          options: [
            "So they can fix the AI when it breaks",
            "So they can recognize when a child might trust fluent-sounding but incorrect AI output",
            "So they can code their own AI at home",
          ],
          answer: 1,
          explanation:
            "AI produces confident-sounding text that can be wrong. A parent who knows this can help their child develop the habit of verifying important information.",
        },
        {
          prompt:
            "A child says 'the AI told me this is true, so it must be.' What's the problem?",
          options: [
            "AI is always truthful, so there's no problem",
            "AI can produce plausible but incorrect information — confidence is not the same as accuracy",
            "The child should only use AI at school, not home",
          ],
          answer: 1,
          explanation:
            "Fluency and confidence are built into how LLMs work — they always sound credible. That's why fact-checking matters especially for consequential information.",
        },
      ],
      explanation:
        "AI is a powerful pattern-predictor, not an oracle. Understanding this one fact unlocks every other parenting decision about AI tools.",
    },
    {
      slug: "where-kids-encounter-ai",
      title: "Where Kids Already Encounter AI",
      blurb:
        "Homework helpers, games, social feeds, and school software — AI is already everywhere in your child's day.",
      xp: 20,
      kind: "quiz",
      content: `# Where Kids Already Encounter AI

Parents often think of AI as something a child has to *seek out*. In 2026,
that's no longer true. AI is embedded in tools kids already use every day:

**School**
- Many districts allow or even encourage AI writing assistants (ChatGPT, Gemini,
  Canva AI, Grammarly) for drafting and brainstorming.
- Some learning platforms (Khan Academy's Khanmigo, Duolingo, Photomath) use
  AI tutors to guide students step by step.
- Some teachers use AI to generate quiz questions or rubrics.

**Gaming & Entertainment**
- AI-driven NPCs (non-player characters) can now hold full conversations.
- Roblox, Minecraft, and other platforms are adding AI content-generation tools.
- YouTube and TikTok algorithms are AI — they decide what video comes next.

**Social and Creative Apps**
- Snapchat's "My AI" is a built-in chatbot that all users see by default.
- Image generators (Adobe Firefly, DALL-E inside ChatGPT) let kids make pictures
  from text descriptions.
- AI music tools let kids create songs from a short prompt.

**Everyday Devices**
- Siri, Google Assistant, and Alexa now layer LLM capabilities on top of their
  older voice interfaces.

The upshot: the question isn't *whether* your child will use AI — it's
*how thoughtfully* they use it. That starts with you knowing where it lives.`,
      questions: [
        {
          prompt:
            "Which statement best describes how children encounter AI today?",
          options: [
            "Only when they deliberately open a specific AI app",
            "Through many tools they already use — school platforms, games, social apps, and devices",
            "Only in high school computer science classes",
          ],
          answer: 1,
          explanation:
            "AI is embedded in recommendation feeds, school software, gaming platforms, and social apps — not just stand-alone chatbots.",
        },
        {
          prompt: "Snapchat's 'My AI' is significant for parents because:",
          options: [
            "It requires a paid subscription children need to request",
            "It is a built-in chatbot that appears by default for all Snapchat users, including teens",
            "It only works for users over 18",
          ],
          answer: 1,
          explanation:
            "My AI is on by default, so many teens are chatting with it without parents even knowing the feature exists. Awareness is the first step.",
        },
        {
          prompt:
            "What is the most useful framing for a parent when it comes to kids and AI?",
          options: [
            "Block all AI tools to keep kids safe",
            "Accept that kids will encounter AI and focus on how thoughtfully they engage with it",
            "Let kids manage AI entirely on their own — they're digital natives",
          ],
          answer: 1,
          explanation:
            "Blanket blocking is both impractical and counter-productive. Thoughtful engagement — supported by parental guidance — produces better long-term outcomes.",
        },
      ],
      explanation:
        "AI is ambient in a child's digital day. Knowing where it lives is the foundation for having informed conversations with your kids about it.",
    },
    {
      slug: "ai-and-homework",
      title: "AI & Homework: Help or Harm?",
      blurb:
        "When AI assistance builds skills, when it undermines them, and how to set expectations that actually work.",
      xp: 22,
      kind: "quiz",
      content: `# AI & Homework: Help or Harm?

This is the question parents ask most. The answer is: **it depends on how it's used.**

**Where AI genuinely helps learning:**
- Explaining a concept multiple ways until one clicks ("explain photosynthesis like I'm 10")
- Generating practice questions on a topic
- Giving feedback on a draft the child wrote themselves ("what's unclear in this paragraph?")
- Researching background context (with verification of key facts)
- Translating academic language into plain terms

**Where AI undermines learning:**
- Writing the assignment for the child from a one-line prompt
- Solving math problems without the child understanding the steps
- Replacing reading with a summary (especially if comprehension is being assessed)

**Why the distinction matters:** Learning builds mental models that transfer to new
problems. If the AI builds the model instead, the child passes the assignment but
doesn't gain the capability. Over time this creates a skills gap — especially in
writing, reasoning, and math.

**Practical guidance for parents:**
1. Ask your child to *explain* the work — if they can't, they probably didn't do it.
2. Teach them to use AI as a tutor: ask *why*, not just *what*.
3. Check their school's AI policy — many now specify when AI is permitted and how
   to cite it.
4. Model the behavior yourself: use AI to *help* you think, not to think for you.`,
      questions: [
        {
          prompt:
            "Which way of using AI on a math homework is most likely to support genuine learning?",
          options: [
            "Pasting the problem in and copying the answer",
            "Asking the AI to explain the concept step by step, then trying similar problems independently",
            "Having the AI generate a completed worksheet to copy",
          ],
          answer: 1,
          explanation:
            "Using AI as a tutor — asking it to explain — keeps the student as the active learner. Copying answers skips the mental-model building that makes math useful later.",
        },
        {
          prompt:
            "A child hands in a well-written essay but can't explain a single paragraph when asked. This most likely indicates:",
          options: [
            "The child is shy and just needs encouragement",
            "The AI wrote the essay and the child lacks ownership of the ideas",
            "The essay is too advanced and should be marked down",
          ],
          answer: 1,
          explanation:
            "The ability to explain your own work is a reliable signal of genuine understanding. If the child can't explain it, they probably didn't write it.",
        },
        {
          prompt:
            "What should parents do before assuming their child is violating rules by using AI for homework?",
          options: [
            "Confiscate all devices immediately",
            "Check what the school's AI policy actually says — many now allow or even encourage appropriate AI use",
            "Nothing — schools handle all of that",
          ],
          answer: 1,
          explanation:
            "School AI policies vary widely. Some ban AI outright; others require citation; others encourage it for specific tasks. Know your school's stance before reacting.",
        },
      ],
      explanation:
        "AI as tutor = learning accelerator. AI as ghostwriter = learning shortcut that costs the child later. The difference is who is doing the thinking.",
    },
    {
      slug: "privacy-and-safety-for-kids",
      title: "Privacy & Safety: What Kids Share Without Knowing",
      blurb:
        "What AI apps do with your child's data, what to keep private, and how to have the safety conversation.",
      xp: 22,
      kind: "quiz",
      content: `# Privacy & Safety: What Kids Share Without Knowing

When a child types into an AI chatbot, where does that text go?

**The general picture:**
- Most commercial AI services store conversation logs, at least temporarily.
- Some use conversations to improve future models (often opt-outable).
- Enterprise and school-licensed versions often have stricter data agreements.
- Chats are typically tied to an account — meaning everything is logged by user.

**What children commonly over-share:**
- Full name, school name, age, city ("I'm Sophia, 13, at Riverside Middle...")
- Personal problems they wouldn't tell a parent (depression, conflict, relationships)
- Photos if the AI app accepts images — faces, home interiors, school ID
- Other people's information (a friend's situation shared in detail)

**Age requirements:**
Most major AI services require users to be at least 13 (COPPA in the US). Some
require 18 without parental consent. These limits exist for legal data-privacy
reasons — they're often not enforced technically, meaning an underage child can
sign up if they give a false birth date.

**How to have the safety conversation:**
- Frame it positively: "These tools are useful, and there are smart habits."
- Teach children to treat AI chat like a public space, not a diary.
- Explain that a friendly-seeming AI is not a confidant — it's software.
- Review privacy settings together in the apps they actually use.

Children who understand *why* a boundary exists follow it far better than those
who are simply told no.`,
      questions: [
        {
          prompt:
            "What should children understand about information they type into AI chatbots?",
          options: [
            "It is completely private and deleted immediately",
            "It is typically stored and may be used to improve the service — treat it like a public space, not a diary",
            "It is visible to their school teacher in real time",
          ],
          answer: 1,
          explanation:
            "AI chat logs are generally stored. The safe default is to share nothing you'd be uncomfortable seeing in a data breach or review.",
        },
        {
          prompt:
            "A 10-year-old creates a ChatGPT account by entering a fake birth year. What is the key risk here?",
          options: [
            "ChatGPT will immediately detect the fake age and delete the account",
            "The child is using a service that has no COPPA protections in place for them, and their data is collected without parental consent",
            "There is no risk — age limits are just suggestions",
          ],
          answer: 1,
          explanation:
            "Most AI services are legally required to handle minors' data differently. A fake age bypasses those protections entirely, leaving the child without COPPA safeguards.",
        },
        {
          prompt:
            "Which approach is most effective when explaining AI privacy rules to a child?",
          options: [
            "Simply saying 'don't use it' without explanation",
            "Explaining why the boundary exists and framing it as a smart habit, not just a rule",
            "Letting them figure it out when something goes wrong",
          ],
          answer: 1,
          explanation:
            "Children who understand the reasoning behind a safety rule are far more likely to apply it consistently, including in situations a parent didn't anticipate.",
        },
      ],
      explanation:
        "AI chats are not private by default. Teaching children to treat them like a public space — not a diary — is one of the most protective habits you can instill.",
    },
    {
      slug: "guardrails-and-settings",
      title: "Guardrails: Parental Controls That Actually Work",
      blurb:
        "Screen time limits are not enough. Learn what controls exist, what they miss, and the one thing that beats all of them.",
      xp: 22,
      kind: "quiz",
      content: `# Guardrails: Parental Controls That Actually Work

Parents often look for a technical fix that makes AI safe for children. There are
useful tools, but none of them fully replace parental engagement.

**What actually exists:**

- **Family Link (Google)** — controls which apps a child can install, sets screen
  time limits, and can restrict Gemini to age-appropriate responses on managed
  devices.
- **Screen Time (Apple)** — similar app controls, content restrictions, and
  communication limits on iOS and Mac.
- **SafeSearch / YouTube Restricted Mode** — reduces explicit content in Google
  results and YouTube; does not cover AI chatbots.
- **School-managed accounts** — many districts issue Google Workspace for Education
  or Microsoft 365 EDU accounts with stricter AI content policies built in.
- **ChatGPT's Family Plan (launched 2025)** — allows a parent account to manage
  child sub-accounts with content filters enabled.

**What these controls miss:**
- A child who uses a friend's device or an unmanaged school computer
- Apps that get around filters by operating as websites (no app = no App Store control)
- Social AI features embedded in games (Roblox AI, in-game chat NPCs)
- A determined teenager who can research workarounds faster than filters are patched

**The durable guardrail: relationship and media literacy.**
Children who can articulate *why* something is risky make better decisions than
children who are technically blocked at every turn. The goal is a child who
self-governs because they understand the stakes, not one who's managed by software.

Combine technical controls with ongoing conversations, and you cover both the
short-term risk and the long-term capability.`,
      questions: [
        {
          prompt:
            "A parent sets up Google Family Link and feels their child is fully protected from problematic AI content. What's the gap in this thinking?",
          options: [
            "Family Link actually doesn't work at all",
            "Controls only cover managed devices and apps — a determined child can access AI via a friend's device, school computer, or browser-based tools",
            "Family Link blocks every website automatically",
          ],
          answer: 1,
          explanation:
            "Technical controls are valuable but partial. Device-level tools can't follow a child to every screen they encounter.",
        },
        {
          prompt:
            "Which of the following is the most durable long-term protection for a child using AI?",
          options: [
            "Maximum parental controls on every device they own",
            "Media literacy and an open relationship — a child who understands the risks and can talk to you about them",
            "Banning all AI use until age 18",
          ],
          answer: 1,
          explanation:
            "Self-governance, built through understanding and trust, transfers across devices, schools, and friends' homes in ways that software controls never can.",
        },
        {
          prompt:
            "ChatGPT's Family Plan (available since 2025) primarily helps parents by:",
          options: [
            "Preventing children from ever using ChatGPT",
            "Allowing a parent account to manage child sub-accounts with content filters enabled",
            "Giving parents full transcripts of their child's chats in real time",
          ],
          answer: 1,
          explanation:
            "The Family Plan provides managed child accounts with content policies applied — a middle ground between full access and a blanket ban.",
        },
      ],
      explanation:
        "Technical controls reduce exposure; ongoing conversations build the judgment that protects a child everywhere. Use both.",
    },
    {
      slug: "ai-tools-for-family-life",
      title: "AI Tools That Actually Help at Home",
      blurb:
        "Meal planning, scheduling, research, communication — practical ways parents save time with AI today.",
      xp: 20,
      kind: "quiz",
      content: `# AI Tools That Actually Help at Home

Once you've thought through the safety side, it's worth remembering: AI can
genuinely make family life easier. A sampler of what parents use it for every day:

**Planning & Logistics**
- Meal planning from what's actually in the fridge: "I have chicken, rice, a bell
  pepper, and basic spices — give me three dinners for a family of four."
- Packing lists for trips or sports seasons
- Scheduling and task breakdowns: "Turn this soccer tournament schedule into a
  week-by-week plan with who picks up who."

**Communication**
- Drafting difficult emails (to teachers, insurance companies, landlords)
- Translating school notices or medical paperwork into plain language
- Writing thank-you notes, RSVPs, and event announcements

**Research & Decision-Making**
- Comparing options: "Compare a 529 vs a UGMA for college savings in plain English."
- Summarizing long documents you'd otherwise procrastinate on
- Understanding a medical term or diagnosis (always verify with your doctor)

**Learning Together**
- Explaining a news event to a curious child at their level
- Quiz your child on their homework topics (ask the AI to generate questions)
- Exploring a child's interest deeply: "My 8-year-old is obsessed with volcanoes —
  give me 10 fascinating facts she probably doesn't know."

**One key habit:** use AI as a starting draft or thinking partner, then apply your
own judgment before acting. The five minutes of verification saves the hour of
cleanup when the AI was confidently wrong about something important.`,
      questions: [
        {
          prompt:
            "Which is a realistic and safe everyday use of AI for a busy parent?",
          options: [
            "Having AI manage all family finances autonomously",
            "Drafting a firm email to a school principal and then editing it yourself before sending",
            "Letting AI make all medical decisions based on symptoms you describe",
          ],
          answer: 1,
          explanation:
            "Using AI to produce a draft you then review and refine is the ideal pattern — fast and efficient, with the parent's judgment in the loop before anything important happens.",
        },
        {
          prompt:
            "A parent asks AI to summarize a complex medical diagnosis in plain English. What's the right follow-up step?",
          options: [
            "Treat the summary as complete medical advice",
            "Use the summary to prepare better questions, then verify with your doctor",
            "Share the summary with other parents as authoritative information",
          ],
          answer: 1,
          explanation:
            "AI can translate jargon usefully, but medical accuracy requires a qualified professional. The summary is a prep tool, not a diagnosis.",
        },
        {
          prompt:
            "What is the most useful way to think about AI for family-life tasks?",
          options: [
            "A system that replaces all decision-making",
            "A fast first draft and thinking partner — you apply judgment before acting",
            "An expert that's always more reliable than a human professional",
          ],
          answer: 1,
          explanation:
            "AI as a draft-and-think-partner is the pattern that captures the speed benefit while keeping a human in the loop on what actually matters.",
        },
      ],
      explanation:
        "AI is a practical time-saver for family planning, communication, and research. Use it as a starting point and apply your own judgment before anything important.",
    },
    {
      slug: "raising-ai-literate-kids",
      title: "Raising AI-Literate Kids (Capstone)",
      blurb:
        "The conversation framework, skills to build by age, and a practical family agreement to walk away with.",
      xp: 25,
      kind: "quiz",
      content: `# Raising AI-Literate Kids (Capstone)

The goal of everything in this module is a child who can use AI **effectively and
critically** — not one who avoids it or one who trusts it blindly.

**The three skills of AI literacy:**

1. **Knowing what AI can and can't do.** Prediction engine, not oracle. Useful for
   drafts and exploration; unreliable for high-stakes facts.
2. **Thinking critically about AI output.** "Does this sound right? What would I
   check? Who benefits if I believe this?"
3. **Using AI intentionally.** Choosing *when* it helps vs. when it gets in the way
   of building a real skill.

**Skills by rough age:**

| Age | Focus |
|-----|-------|
| 6–9 | AI is a tool, not magic. It can be wrong. We check important things. |
| 10–12 | Privacy basics, school policies, the difference between "helped me draft" and "wrote it for me." |
| 13–15 | Deeper critical evaluation, understanding recommendation algorithms, recognizing AI-generated content. |
| 16+ | Source verification, ethical use, consent for AI-generated images of real people, career implications. |

**A simple family AI agreement covers:**
- Which tools are allowed and on which devices
- What stays private (full name, school, location, passwords, others' information)
- How to cite AI help on schoolwork (follow school policy)
- What to do if something feels wrong: tell a trusted adult, no judgment

**The most important thing you can do:** model curiosity and healthy skepticism
yourself. Children who see a parent ask "is this really true? Let me check" learn
that habit faster than any lesson can teach it.`,
      questions: [
        {
          prompt:
            "Which of the following best describes an 'AI-literate' child?",
          options: [
            "One who refuses to use AI tools because they're dangerous",
            "One who uses AI effectively and critically — knowing its limits and applying their own judgment",
            "One who accepts AI output as truth because computers are accurate",
          ],
          answer: 1,
          explanation:
            "AI literacy is the middle path: neither avoidance nor blind trust. It's the ability to use the tool well and think critically about what it produces.",
        },
        {
          prompt:
            "For a 10–12 year old, which AI-literacy focus is most age-appropriate?",
          options: [
            "Understanding advanced machine learning architecture",
            "Privacy basics, school policies, and distinguishing between getting help drafting vs. having AI write the work",
            "Career implications of AI in the workforce",
          ],
          answer: 1,
          explanation:
            "At 10–12, the practical skills — privacy, school rules, honest use of AI tools — are both age-appropriate and immediately relevant to their daily lives.",
        },
        {
          prompt:
            "A family AI agreement should include which of the following?",
          options: [
            "Only a list of banned apps, nothing else",
            "Allowed tools and devices, privacy boundaries, how to cite AI on schoolwork, and what to do if something feels wrong",
            "A requirement that children never use AI without a parent in the room",
          ],
          answer: 1,
          explanation:
            "A useful agreement is positive and practical, not just a ban list. It sets expectations across the key areas — tools, privacy, school honesty, and safety reporting — without being so restrictive it breeds workarounds.",
        },
      ],
      explanation:
        "AI literacy is a learnable, teachable skill. The parents who model curiosity and healthy skepticism raise children who carry those habits into every new technology they encounter.",
    },
  ],
};
