import type { Module } from "./types";

// AI for Seniors: Getting Started — a no-jargon, all-quiz module aimed at
// adults 60+ who want to use AI chatbots confidently in everyday life.
// Covers what AI is, which tools to try, staying safe, spotting scams,
// communicating better with AI, and building lasting habits.
export const aiForSeniors: Module = {
  slug: "ai-for-seniors",
  title: "AI for Seniors: Getting Started",
  description:
    "Designed for adults 60 and older who are curious about AI but haven't taken the leap yet. No jargon, no coding, no prior experience needed. You'll learn what AI chatbots can do, how to talk to them naturally, how to stay safe, and how to weave them into everyday life — from writing letters to planning trips.",
  emoji: "🧓",
  gradient: "from-teal-500/20 to-green-500/10",
  tagline:
    "A gentle, practical introduction to AI chatbots for older adults — what they are, how to use them safely, and how they can make daily life a little easier.",
  keywords: [
    "AI for seniors",
    "AI for older adults",
    "how to use AI chatbots",
    "ChatGPT for seniors",
    "Claude for older adults",
    "AI beginner guide",
    "technology for seniors",
    "AI safety tips",
  ],
  lessons: [
    {
      slug: "what-is-a-chatbot",
      title: "What Is a Chatbot?",
      blurb: "Plain-language explanation of what AI chatbots are and how they actually work.",
      xp: 20,
      kind: "quiz",
      content: `# What Is a Chatbot?

You may have heard a lot of buzz about "AI" lately. Let's cut through it.

An **AI chatbot** — tools like Claude, ChatGPT, and Gemini — is a computer program
you chat with by typing (or sometimes speaking). You type a question or request,
and it types back a thoughtful reply.

Under the hood, these programs learned by reading an enormous amount of written
text — books, articles, websites, conversations — and became very good at
**predicting useful, helpful responses**. Think of them as an extremely well-read
pen pal who never sleeps and never gets impatient.

A few honest truths upfront:

- **They are not human.** They don't have feelings, families, or personal opinions,
  even if they sound like they do.
- **They can be wrong.** Because they predict language rather than look up facts in
  a verified database, they occasionally say something inaccurate with confidence.
  You stay the person in charge.
- **They are not "the internet."** A chatbot is separate from Google Search. It
  draws on what it learned during training, not live websites (unless a feature
  explicitly adds that).
- **They are a tool you control.** You decide what to ask, what to do with the
  answer, and when to stop.

The simplest frame: imagine a very capable assistant who has read almost everything
ever written, is always available, and charges you nothing to ask a question.
That's the upside. The check on you is that you keep a healthy, friendly skepticism
and verify the things that matter.`,
      questions: [
        {
          prompt: "What is an AI chatbot, in the simplest terms?",
          options: [
            "A live human expert hired by a tech company to answer questions",
            "A computer program you chat with by typing, trained on large amounts of text to give helpful replies",
            "A special version of Google Search that talks back",
          ],
          answer: 1,
          explanation:
            "AI chatbots are programs — not people. They learned patterns from enormous amounts of text and use those patterns to generate replies. They are separate from search engines.",
        },
        {
          prompt: "Why might an AI chatbot sometimes give an answer that is wrong?",
          options: [
            "It is lying on purpose to confuse you",
            "It predicts likely language rather than looking things up in a verified database, so confident-sounding errors are possible",
            "It can only be wrong if you ask the question badly",
          ],
          answer: 1,
          explanation:
            "AI generates plausible text — it doesn't fact-check against a verified source every time. That's why you should verify important facts yourself.",
        },
        {
          prompt: "Which statement about AI chatbots is true?",
          options: [
            "They are the same as doing a Google search",
            "They have genuine feelings and personal opinions",
            "You are always in control — you decide what to ask and whether to act on the answer",
          ],
          answer: 2,
          explanation:
            "You are always the decision-maker. The chatbot is a tool you point at a problem, not an authority figure you must obey.",
        },
      ],
      explanation:
        "A chatbot is a very well-read computer assistant — helpful, occasionally wrong, and always under your control.",
    },
    {
      slug: "which-tool-to-try",
      title: "Which Tool Should You Try First?",
      blurb: "A plain-English tour of Claude, ChatGPT, Gemini, and Copilot — and how to get started.",
      xp: 20,
      kind: "quiz",
      content: `# Which Tool Should You Try First?

Several AI chatbots are available today. You don't need to try all of them — just
pick one and get comfortable. Here's a quick tour of the main ones:

**Claude** (claude.ai) — Made by Anthropic. Known for thoughtful, careful replies
and being patient with follow-up questions. A good first choice if you want
responses that feel clear and unhurried.

**ChatGPT** (chatgpt.com) — Made by OpenAI, the tool that made AI chatbots
mainstream. Has a very large user community, which means lots of beginner guides
exist online.

**Gemini** (gemini.google.com) — Made by Google. If you already use Gmail or
Google Docs, Gemini is built into those, so it may feel familiar.

**Copilot** (copilot.microsoft.com) — Made by Microsoft. Built into Windows 11 and
Microsoft Office on many computers, so you may already have it.

**Practical tips for starting out:**

- All four have a **free tier** — you do not need to pay anything to get started.
- All four are available on a **phone or tablet** as well as a computer.
- You sign up with an email address. No technical knowledge is required.
- Start simple: type one thing you're curious about, like "Explain what Medicare
  Part B covers in plain language." Read the reply. Ask a follow-up.
- If one tool doesn't suit you, try another — they're all free to explore.

The best AI tool is the one you actually open and practice with.`,
      questions: [
        {
          prompt: "Do you need to pay money before you can try any of the major AI chatbots?",
          options: [
            "Yes — all of them require a paid subscription from the start",
            "No — Claude, ChatGPT, Gemini, and Copilot all have free tiers you can start with",
            "Only Gemini is free; the others require payment",
          ],
          answer: 1,
          explanation:
            "All four major chatbots offer a free tier. Paid plans add speed and higher usage limits, but the free version is plenty for learning and everyday tasks.",
        },
        {
          prompt: "Someone already uses Gmail and Google Docs every day. Which chatbot might feel most natural to them?",
          options: [
            "ChatGPT, because it was first",
            "Gemini, because it is built into Google's products they already use",
            "Claude, because it is the only one that connects to email",
          ],
          answer: 1,
          explanation:
            "Gemini is Google's AI and integrates with Gmail, Docs, and other Google services, making it a low-friction choice for people already in the Google ecosystem.",
        },
        {
          prompt: "What is the single most important thing for making progress with AI tools?",
          options: [
            "Choosing the 'best' tool based on expert rankings",
            "Paying for a premium subscription immediately",
            "Picking one tool and actually practicing with it regularly",
          ],
          answer: 2,
          explanation:
            "Consistency beats tool selection. Regular practice with any one of the major tools will teach you more than reading about all of them.",
        },
      ],
    },
    {
      slug: "having-a-real-conversation",
      title: "Having a Real Conversation",
      blurb: "Talk naturally, follow up, and steer — this is how you get genuinely useful answers.",
      xp: 20,
      kind: "quiz",
      content: `# Having a Real Conversation

The most important thing to know: **talk to an AI chatbot the way you'd talk to a
helpful person, not the way you type a Google search.**

Google: you type a few keywords. "medicare part b cost 2026."
Chatbot: you write a sentence or two. "Can you explain what Medicare Part B covers
and roughly what it costs, in plain language?"

The more naturally you write, the better the reply. You don't need to use special
commands or learn a technique.

**What to do when the first reply isn't quite right:**

The chatbot remembers everything you've said in the current conversation, so you
can simply reply and refine:

- "That's helpful, but can you make it simpler?"
- "I'm 72 and live in California — does that change anything?"
- "Can you give me that as a short list instead of paragraphs?"
- "I didn't understand the second point — can you explain it a different way?"

This back-and-forth is where the real value comes from. Your first question is a
starting point; the conversation that follows is where you get to the answer that
truly fits your situation.

**A few small habits that help:**

- **Be specific.** "Help me write a thank-you note to my neighbor who brought
  dinner while I was recovering" beats "write a thank-you note."
- **Say who it's for.** "Explain this as if I've never used a computer."
- **Ask one thing at a time.** Long lists of questions in one message often get
  partial answers.
- **Start a fresh chat** when you move to a completely new topic.`,
      questions: [
        {
          prompt: "How should you phrase a question to an AI chatbot?",
          options: [
            "Use short keywords like a Google search — 'medicare part b cost'",
            "Write in natural sentences, the way you would explain your question to a helpful person",
            "Use only single words to keep it simple",
          ],
          answer: 1,
          explanation:
            "Chatbots are designed for natural-language conversation, not keyword search. A full sentence with context gets a much more useful reply.",
        },
        {
          prompt: "The chatbot's first answer covers Medicare but is confusing. What is the best next step?",
          options: [
            "Close the window and give up",
            "Start a brand-new chat and ask the exact same question again",
            "Reply in the same chat — 'Can you explain that more simply?' or 'I didn't follow the second part'",
          ],
          answer: 2,
          explanation:
            "The chatbot remembers the whole conversation, so a quick follow-up reply is the fastest way to get a clearer answer — no need to start over.",
        },
        {
          prompt: "Which request is most likely to produce a useful, specific reply?",
          options: [
            "'Write a thank-you note to my neighbor who brought dinner while I was recovering from knee surgery — warm but not too long'",
            "'thank you note'",
            "'Write something nice'",
          ],
          answer: 0,
          explanation:
            "Specific context — who it's for, what happened, and what tone you want — gives the chatbot everything it needs to write something you can actually use.",
        },
      ],
      explanation:
        "Natural sentences, specific context, and follow-up replies are the three moves that turn a chatbot into a genuinely helpful tool.",
    },
    {
      slug: "staying-safe-online",
      title: "Staying Safe with AI",
      blurb: "What to share, what to protect, and how to tell a real AI tool from a scam.",
      xp: 25,
      kind: "quiz",
      content: `# Staying Safe with AI

AI chatbots are useful — but like any online service, a little caution goes a
long way. Here's the practical guide.

**What is safe to share:**
- General questions ("What is gout?", "How do I write a letter to my landlord?")
- Fictional or hypothetical scenarios
- Public information you'd discuss with a friend

**What to keep private:**
- Social Security number, Medicare or Medicaid ID numbers
- Bank account, credit card, or pension account numbers
- Passwords or security question answers
- Another person's private medical or financial information

A good rule of thumb: **don't type into a chatbot anything you wouldn't write on a
postcard.** If a piece of information would cause real harm if a stranger read it,
keep it out.

**Spotting fake "AI" tools (scams):**
AI's popularity has attracted scammers. Watch out for:

- A website or phone call offering a "free AI assistant" but asking for your credit
  card or Social Security number up front.
- A pop-up ad that looks like ChatGPT or Claude but has a slightly different web
  address (e.g., "chatgpt-free-access.com" instead of "chatgpt.com").
- An email claiming your AI subscription needs to be renewed — if you never signed
  up for a paid plan, this is a scam.

**How to find the real tools:**
Go directly to the official websites: **claude.ai**, **chatgpt.com**,
**gemini.google.com**, **copilot.microsoft.com**. Or download the official apps from
the Apple App Store or Google Play Store. Never follow a link in an unsolicited email
or text.`,
      questions: [
        {
          prompt: "Which of the following is safe to type into an AI chatbot?",
          options: [
            "Your Social Security number, so it can help you with a benefits question",
            "A general question like 'What are common side effects of metformin?' without sharing your personal details",
            "Your bank account number and PIN, to get help balancing your checkbook",
          ],
          answer: 1,
          explanation:
            "General questions are fine. Personal identifiers like Social Security numbers, bank details, and passwords should never be typed into a chatbot — or any online service you don't fully trust.",
        },
        {
          prompt: "You receive an email saying your 'AI subscription' is expiring and you need to click a link to renew it. You never signed up for a paid AI plan. This is most likely…",
          options: [
            "A legitimate reminder from the AI company",
            "A phishing scam trying to get your payment information",
            "A standard update notification that is safe to click",
          ],
          answer: 1,
          explanation:
            "If you never signed up for a paid plan, a renewal email is a classic phishing attempt. Never click links in unsolicited emails — go directly to the official website instead.",
        },
        {
          prompt: "What is the safest way to find and open a real AI chatbot tool?",
          options: [
            "Click the first link that appears in a Google search ad for 'free AI chatbot'",
            "Type the official address directly into your browser — claude.ai, chatgpt.com, gemini.google.com — or use the official app from a trusted app store",
            "Follow a link sent by a friend in a text message",
          ],
          answer: 1,
          explanation:
            "Going directly to the known official address or the official app store listing removes the risk of landing on a scam imitation site.",
        },
      ],
      explanation:
        "Keep personal identifiers private, go directly to official websites, and treat unsolicited 'AI renewal' emails as the scams they almost always are.",
    },
    {
      slug: "practical-everyday-uses",
      title: "Practical Everyday Uses",
      blurb: "From writing letters to understanding medical jargon — real tasks AI handles well.",
      xp: 20,
      kind: "quiz",
      content: `# Practical Everyday Uses

You don't need a complex use case to get value from an AI chatbot. Some of the most
appreciated uses are the smallest, most everyday ones.

**Writing and communication**
- Draft a letter to your doctor asking about a medication change.
- Write a firm but polite message to a business about a billing error.
- Compose a birthday message, a condolence note, or a thank-you card.
- Translate a letter from a foreign-language sender into English.

**Understanding confusing language**
- "Can you explain what my Medicare Explanation of Benefits letter means?"
- "My doctor mentioned 'atrial fibrillation' — what is that in plain English?"
- "What does this insurance policy clause actually say in simple terms?"

**Planning and organizing**
- "Help me make a packing list for a ten-day cruise to Alaska in September."
- "What questions should I ask when touring an assisted living community?"
- "Give me a simple weekly meal plan that avoids high sodium."

**Learning and curiosity**
- "Explain how the stock market works as if I'm hearing about it for the first time."
- "What was happening in the world in 1965?"
- "Tell me about the history of jazz music."

**Technology help**
- "How do I send a photo from my iPhone to my granddaughter?"
- "My printer is showing 'offline' — what usually causes that and how do I fix it?"

The key mindset: **if you'd call someone to ask it, you can ask the chatbot first.**
You'll often get a clear answer in seconds, and you can always follow up with the
human expert afterward.`,
      questions: [
        {
          prompt: "Which of the following is a realistic, practical use of an AI chatbot for everyday life?",
          options: [
            "Asking it to physically mail a letter on your behalf",
            "Asking it to draft a polite complaint letter about a billing error and explain what your Medicare EOB letter means",
            "Asking it to predict whether your new medication will work for you specifically",
          ],
          answer: 1,
          explanation:
            "AI excels at drafting text and explaining confusing language. It cannot take physical actions or replace personalized medical advice from your own doctor.",
        },
        {
          prompt: "Your doctor mentioned 'atrial fibrillation' and you didn't want to ask for a longer explanation in the office. What can you do?",
          options: [
            "Nothing — only a doctor can explain medical terms, so you must call the office",
            "Ask a chatbot: 'Can you explain atrial fibrillation in plain English?' — then bring any follow-up questions back to your doctor",
            "Search for the term in a dictionary",
          ],
          answer: 1,
          explanation:
            "Chatbots are excellent at explaining medical or technical jargon in plain language. They don't replace your doctor's personalized advice, but they help you walk in prepared.",
        },
        {
          prompt: "A good rule of thumb for deciding whether to ask an AI chatbot:",
          options: [
            "Only ask it things you already know the answer to",
            "If you'd call a friend or family member to ask it, try the chatbot first — you'll often get a helpful answer in seconds",
            "Only use it for things related to computers",
          ],
          answer: 1,
          explanation:
            "The chatbot is available 24/7 and covers almost any topic. Treat it as a first stop for information, then verify or follow up with the relevant person or professional.",
        },
      ],
    },
    {
      slug: "checking-what-you-get",
      title: "Checking What You Get",
      blurb: "How to tell a reliable AI answer from one that needs a second opinion.",
      xp: 25,
      kind: "quiz",
      content: `# Checking What You Get

An AI chatbot is genuinely helpful — but it can also be confidently wrong. Knowing
when to trust a reply and when to double-check is one of the most valuable skills
you can develop.

**The main risk: "hallucinations"**

This is the technical term for when an AI states something false with full
confidence. It might cite a statistic that doesn't exist, name a medication dosage
incorrectly, or describe a government benefit that has changed. It sounds just as
fluent and certain when it's wrong as when it's right.

**Low-risk answers (usually fine to use as-is):**
- A draft email or letter — you'll read it before sending anyway.
- An explanation of a general concept ("how does compound interest work?").
- A brainstormed list of gift ideas or questions to ask.
- Help rewording something you've already written.

**Higher-risk answers (always verify before acting):**
- Specific drug dosages, interactions, or medical advice.
- Legal rights, benefit amounts, deadlines.
- Specific statistics, dates, or historical facts you plan to repeat to others.
- Financial figures — account limits, tax rules, exact costs.

**Simple ways to verify:**
1. Ask the chatbot: *"How confident are you? What should I double-check?"*
2. Go to the primary source — Medicare.gov, SSA.gov, your insurer's website, or
   your doctor's office.
3. Search the specific claim using Google or another search engine.
4. Ask a trusted person (pharmacist, librarian, family member who works in the field).

The goal is not distrust — it's informed trust. AI is best treated like a very
knowledgeable friend whose advice you're grateful for, but still verify before you
act on anything that really matters.`,
      questions: [
        {
          prompt: "An AI tells you confidently that a certain medication costs $12 per month under Medicare Part D. You plan to make a financial decision based on this. What should you do?",
          options: [
            "Act on it immediately — AI is accurate about specific costs",
            "Verify it on Medicare.gov or by calling 1-800-MEDICARE before making any decision",
            "Disregard it entirely — AI can never help with Medicare questions",
          ],
          answer: 1,
          explanation:
            "Specific costs and coverage details change frequently. Always verify financial or health benefit figures against the primary government source or your plan documents before acting.",
        },
        {
          prompt: "Which type of AI output is generally safe to use without a second source?",
          options: [
            "A specific drug dosage it recommends for your condition",
            "A draft birthday card you will read, edit, and send yourself",
            "A specific statistic ('73% of people over 65 experience X') you plan to repeat to others",
          ],
          answer: 1,
          explanation:
            "Drafts for communication are low-risk: you review them before using them, and they don't carry factual stakes. Specific statistics and medical figures need verification.",
        },
        {
          prompt: "What is an AI 'hallucination'?",
          options: [
            "When the AI's screen flickers or shows an error message",
            "A confident, fluent false statement — wrong information delivered in exactly the same tone as correct information",
            "When the AI refuses to answer your question",
          ],
          answer: 1,
          explanation:
            "Hallucinations are the trickiest AI failure because they sound just as sure as true answers. Healthy skepticism on high-stakes facts is always warranted.",
        },
      ],
      explanation:
        "Low-stakes drafts are fine to use as-is; high-stakes facts — health, law, money — always deserve a second source. Informed trust is the goal.",
    },
    {
      slug: "building-a-lasting-habit",
      title: "Building a Lasting Habit",
      blurb: "Capstone: put it all together and make AI a natural part of your daily routine.",
      xp: 25,
      kind: "quiz",
      content: `# Building a Lasting Habit

You've covered a lot. Let's close by putting it into practice and making it stick.

**The only way to get comfortable is to use it.**

You do not need to wait until you have a "good enough" question. Start small:

- Ask it to explain something you read in the news that confused you.
- Have it help you write a short email to reschedule an appointment.
- Ask it to suggest a gift for a grandchild who loves dinosaurs.
- Have it give you a simple explanation of a term on a medical bill.

**What experienced users know:**

- **Iteration is the skill.** The first answer is a starting point. Follow up,
  refine, and push back — that's where the value is.
- **You won't break it.** You can't ask a "wrong" question. If a reply isn't
  helpful, just ask for a different approach.
- **Your privacy is always in your hands.** You control what you share.
- **It gets easier fast.** After a week of daily use — even five minutes — most
  people wonder how they did without it.

**A simple daily routine to build the habit:**

1. Think of one thing you'd normally Google, call a family member about, or just
   leave unanswered.
2. Open the chatbot and ask it naturally.
3. Read the reply, ask one follow-up if needed.
4. Done — you've used AI today.

**What AI is (and isn't):**

It is a capable, patient, always-available assistant for information and writing.
It is not a replacement for your doctor, lawyer, financial adviser, or the people
you love. Those relationships stay irreplaceable. AI just handles some of the
smaller friction in between.

You finished the course. You now know what AI is, which tools to try, how to talk
to them, how to stay safe, what they're useful for, and how to check what they
give you. That's everything you need to start.`,
      questions: [
        {
          prompt: "What is the most effective way to get comfortable with AI chatbots?",
          options: [
            "Read articles about AI until you feel fully prepared, then try it",
            "Start using it today for small, low-stakes tasks and build from there through regular practice",
            "Wait until a family member can sit with you and supervise every session",
          ],
          answer: 1,
          explanation:
            "Comfort comes from doing, not reading about doing. Small, daily tasks build skill and confidence faster than any preparation.",
        },
        {
          prompt: "You ask a chatbot for gift ideas and the first list doesn't feel right. What should you do?",
          options: [
            "Conclude that AI is not useful for gift ideas and never try again",
            "Reply with more details: 'She's 8 and loves animals — can you try again with something under $30?'",
            "Start a completely new chat and repeat the same original question",
          ],
          answer: 1,
          explanation:
            "Adding more specific context in a follow-up reply is the standard path to a better answer. The chatbot remembers the conversation and adjusts.",
        },
        {
          prompt: "Which statement best describes what AI chatbots can and cannot replace?",
          options: [
            "AI replaces the need for doctors, lawyers, and family conversations",
            "AI is a helpful assistant for information and writing tasks, but it does not replace your doctor, lawyer, financial adviser, or personal relationships",
            "AI is only useful for people who already know a lot about technology",
          ],
          answer: 1,
          explanation:
            "AI handles information and writing friction well. It complements your professional advisers and loved ones — it doesn't replace them.",
        },
      ],
      explanation:
        "Start today, start small, iterate often. After a week of practice, most people find AI feels natural and genuinely saves them time.",
    },
  ],
};
