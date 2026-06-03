import type { Module } from "./types";

// AI Ethics & Bias — a conceptual, quiz-based course (no code). Plain-language
// explainers on bias, hallucination, privacy, transparency, and responsible use,
// each followed by practice questions. Free, like the public-good track.
export const aiEthics: Module = {
  slug: "ai-ethics",
  title: "AI Ethics & Bias",
  description:
    "Understand the real-world risks of AI — bias, hallucination, privacy, and accountability — and the habits that make you a responsible builder and user.",
  emoji: "⚖️",
  gradient: "from-rose-400/20 to-amber-500/10",
  tagline:
    "Learn AI ethics: how bias creeps in, why models hallucinate, privacy risks, transparency, and responsible AI use.",
  keywords: [
    "ai ethics",
    "ai bias explained",
    "responsible ai",
    "ai hallucination",
    "ai privacy",
  ],
  free: true,
  lessons: [
    {
      slug: "where-bias-comes-from",
      title: "Where Bias Comes From",
      blurb: "Models learn from data — including the data's blind spots.",
      xp: 25,
      kind: "quiz",
      content: `# Where Bias Comes From

An AI model learns patterns from the **data it's trained on**. If that data
reflects human bias — historical, cultural, or simply who got represented and who
didn't — the model can **absorb and repeat** that bias, sometimes amplifying it.

A famous example: a hiring tool trained on a company's past résumés learned to
favor men, because the company had historically hired mostly men. The model
wasn't "trying" to discriminate — it faithfully copied the pattern in its data.

The key idea: **AI is not neutral by default.** It mirrors its training data. That
makes the *choice of data* — and checking who it leaves out — an ethical decision,
not just a technical one.

**Things to remember:**
- Bias usually enters through **biased or unrepresentative training data**
- Models can **amplify**, not just repeat, the patterns they're shown
- "The algorithm decided" is not an excuse — humans choose the data and the goals`,
      questions: [
        {
          prompt:
            "A résumé-screening AI starts rejecting qualified women. The most likely root cause is:",
          options: [
            "The model personally dislikes women",
            "It was trained on historical hiring data that favored men, so it learned that pattern",
            "Computers can't read résumés",
          ],
          answer: 1,
          explanation:
            "Models copy patterns in their training data. Biased historical data produces biased predictions — no intent required.",
        },
        {
          prompt: "Which statement about AI and neutrality is most accurate?",
          options: [
            "AI is always objective because it's just math",
            "AI reflects its training data, so it can carry and even amplify human bias",
            "AI removes all human bias automatically",
          ],
          answer: 1,
          explanation:
            "Being 'just math' doesn't make a model neutral — it learns whatever bias exists in its data, sometimes amplifying it.",
        },
        {
          prompt: "The most direct way bias enters a model is through:",
          options: [
            "The programming language used",
            "Biased or unrepresentative training data and goals chosen by people",
            "The color of the user interface",
          ],
          answer: 1,
          explanation:
            "Data and objectives are chosen by humans. Those choices are where bias most often enters.",
        },
      ],
    },
    {
      slug: "hallucinations",
      title: "Why Models Make Things Up",
      blurb: "Confident answers aren't always correct answers.",
      xp: 25,
      kind: "quiz",
      content: `# Why Models Make Things Up

A language model predicts **likely-sounding text** — it does not look up facts in
a database. So it can produce a **hallucination**: a fluent, confident answer that
is simply **wrong**. It might invent a citation, a court case, a quote, or a
statistic that never existed.

This matters because the output *sounds* authoritative. People have submitted
fake AI-generated legal citations to courts and trusted made-up medical advice.

The responsible habit: **verify anything that matters.** Treat the model as a fast,
fallible assistant — great for drafts and ideas, never the final word on facts,
law, health, or money without a human check against a real source.

**Things to remember:**
- Models generate plausible text, not guaranteed facts
- A confident tone is **not** evidence of correctness
- Always **verify** high-stakes claims against a trustworthy source`,
      questions: [
        {
          prompt:
            "An AI gives you a specific legal case citation to support an argument. Before relying on it you should:",
          options: [
            "Trust it — the AI sounded certain",
            "Verify the case actually exists in a real legal database",
            "Assume citations are always real because they look formatted",
          ],
          answer: 1,
          explanation:
            "Models can fabricate realistic-looking citations. Confidence and formatting are not proof — verify against a real source.",
        },
        {
          prompt: "A 'hallucination' in an AI model means:",
          options: [
            "The model is overheating",
            "The model produced fluent text that is factually wrong or made up",
            "The user typed the prompt incorrectly",
          ],
          answer: 1,
          explanation:
            "Hallucination is confident, plausible-sounding output that isn't true — a side effect of predicting likely text rather than looking up facts.",
        },
        {
          prompt: "For high-stakes topics (medical, legal, financial), the safest use of AI is:",
          options: [
            "Follow its advice directly to save time",
            "Use it for a first draft or ideas, then verify with a qualified human or real source",
            "Never read anything it says",
          ],
          answer: 1,
          explanation:
            "AI is a useful assistant for drafts and brainstorming, but high-stakes facts need verification by a real source or expert.",
        },
      ],
    },
    {
      slug: "privacy-and-data",
      title: "Privacy & Your Data",
      blurb: "What you paste into an AI tool may not stay private.",
      xp: 25,
      kind: "quiz",
      content: `# Privacy & Your Data

When you type something into an AI tool, that text may be **sent to a company's
servers** and, depending on the product, used to improve future models. Pasting
in a customer list, a friend's private message, medical records, or secret
company code can leak data you had no right to share.

There's a second risk for builders: an AI feature in *your* app might
accidentally reveal one user's data to another, or store sensitive inputs in logs
that aren't protected.

The habit: **don't put in what you couldn't safely post publicly** — unless you
know the tool's data policy and have permission to share that information.

**Things to remember:**
- Assume your input may be **stored or used for training** unless told otherwise
- Don't paste **other people's** private data or company secrets without permission
- If you build with AI, protect user data in **logs, storage, and outputs** too`,
      questions: [
        {
          prompt:
            "You want help rewriting an email that contains a customer's full name, address, and account number. The safest move is:",
          options: [
            "Paste it all in — it's just an email",
            "Remove or fake the personal details before asking, or use a tool approved for that data",
            "Post it publicly first to see if anyone objects",
          ],
          answer: 1,
          explanation:
            "Strip or anonymize personal data before sharing it with a tool, unless you know it's approved and permitted for that information.",
        },
        {
          prompt: "A reasonable default assumption about text you enter into a public AI tool is:",
          options: [
            "It is instantly deleted and never seen by anyone",
            "It may be stored on company servers and possibly used to improve models",
            "It stays only on your own computer",
          ],
          answer: 1,
          explanation:
            "Unless a policy says otherwise, assume inputs can be stored and potentially used for training. Treat them accordingly.",
        },
        {
          prompt: "If you build an AI feature into an app, a privacy risk to watch for is:",
          options: [
            "The model writing code comments",
            "Sensitive user inputs leaking into logs or being shown to the wrong user",
            "Using too many emojis in responses",
          ],
          answer: 1,
          explanation:
            "Builders must protect inputs end to end — including logs and outputs — so one user's data never reaches another or sits unprotected.",
        },
      ],
    },
    {
      slug: "transparency-and-disclosure",
      title: "Transparency & Disclosure",
      blurb: "People deserve to know when they're dealing with AI.",
      xp: 25,
      kind: "quiz",
      content: `# Transparency & Disclosure

Trust depends on honesty about when and how AI is used. Passing off AI-written
work as fully your own, running a chatbot that pretends to be a human, or using
AI to generate reviews or images without saying so can mislead people and, in
some places, break the law or platform rules.

**Disclosure** is the fix: tell people when content is AI-generated or
AI-assisted, especially when it could affect a decision they make — a purchase, a
vote, who they trust. In school or work, follow the stated rules on whether and
how AI help must be acknowledged.

**Things to remember:**
- Don't let AI **impersonate a real human** without disclosure
- **Label** AI-generated content when it could mislead (reviews, news, images)
- Follow your school's or employer's rules on **acknowledging AI assistance**`,
      questions: [
        {
          prompt:
            "You run a customer-support chatbot. Ethically, you should:",
          options: [
            "Let users believe they're always talking to a human",
            "Make it clear they're talking to an AI assistant, and offer a path to a human",
            "Hide that it's AI so people behave more politely",
          ],
          answer: 1,
          explanation:
            "People should know when they're dealing with AI. Disclosure plus an escalation path to a human keeps it honest.",
        },
        {
          prompt: "Posting AI-generated product reviews as if real customers wrote them is:",
          options: [
            "Fine, since the words are well written",
            "Deceptive — it misleads buyers and often violates platform rules or law",
            "Required by most websites",
          ],
          answer: 1,
          explanation:
            "Fake reviews mislead people making decisions and frequently break platform policies and consumer-protection law.",
        },
        {
          prompt: "When AI-generated content could influence an important decision, the right habit is to:",
          options: [
            "Disclose that it's AI-generated or AI-assisted",
            "Never tell anyone, to seem more impressive",
            "Disclose only if someone specifically asks",
          ],
          answer: 0,
          explanation:
            "Proactive disclosure — not waiting to be asked — is what preserves trust when AI content can sway a real decision.",
        },
      ],
    },
    {
      slug: "responsible-use",
      title: "Being a Responsible Builder",
      blurb: "Put the principles together into everyday habits.",
      xp: 30,
      kind: "quiz",
      content: `# Being a Responsible Builder

You've seen the main risks: **bias** from data, **hallucinations** stated
confidently, **privacy** leaks, and a lack of **transparency**. Responsible AI
isn't a single rule — it's a set of habits you apply every time you build or use
these tools.

Keep a human **accountable** for outcomes (you can't blame "the algorithm").
**Test** for who your system might harm or exclude, not just whether it works on
average. Give people a way to **appeal or correct** AI decisions that affect them.
And match the **level of care to the stakes** — a meme generator and a loan-approval
model deserve very different scrutiny.

**Quick checklist:**
- Could biased data make this unfair to a group? **Test for it.**
- Could a confident-but-wrong answer cause harm? **Add verification.**
- Am I handling people's data responsibly? **Minimize and protect it.**
- Are people told when AI is involved? **Disclose it.**
- Who is **accountable** if it goes wrong? **A human, always.**`,
      questions: [
        {
          prompt:
            "Your AI system makes a decision that wrongly denies someone a service. The responsible design includes:",
          options: [
            "Telling them the algorithm is final and can't be questioned",
            "A way for a human to review, appeal, and correct the decision",
            "Blaming the model so no person is responsible",
          ],
          answer: 1,
          explanation:
            "People affected by AI decisions deserve a human appeal/correction path. Accountability always rests with people, not 'the algorithm.'",
        },
        {
          prompt: "How much scrutiny should an AI feature get?",
          options: [
            "The same minimal review for everything",
            "Proportional to the stakes — higher stakes (health, money, safety) demand far more care",
            "None, as long as it works in a demo",
          ],
          answer: 1,
          explanation:
            "Match care to consequences. A loan model or medical tool needs far deeper testing than a casual, low-stakes feature.",
        },
        {
          prompt:
            "Which combination best summarizes responsible AI habits?",
          options: [
            "Ship fast, ignore edge cases, hide that it's AI",
            "Test for bias, verify important outputs, protect data, disclose AI use, keep a human accountable",
            "Trust the model fully and remove human oversight",
          ],
          answer: 1,
          explanation:
            "Responsible AI is the bundle: check for bias, verify high-stakes output, protect privacy, disclose AI use, and keep a human accountable.",
        },
      ],
    },
  ],
};
