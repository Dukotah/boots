import type { Module } from "./types";

// AI for Everyday Life — the "do real things at home" wing of the
// "AI for Everyone" track.
//
// Where AI Foundations teaches *how AI works*, this module is project-heavy:
// learners use ChatGPT / Claude / Gemini to plan a trip, untangle a hard
// message, decode a confusing bill, meal-plan on a budget, and shop smarter.
// No code editor — these lessons teach *using* AI for personal life, with
// privacy and verification woven in throughout. Paid wing (no `free: true`).
export const aiEverydayLife: Module = {
  slug: "ai-everyday-life",
  title: "AI for Everyday Life",
  description:
    "Use ChatGPT, Claude, and Gemini for the real stuff: plan a trip or party, decode a confusing bill or lease, soften a hard message, meal-plan on a budget, and shop smarter — safely, with no coding required.",
  emoji: "🏡",
  gradient: "from-amber-500/20 to-orange-500/10",
  tagline:
    "Practical, personal ways to use AI tools at home — planning, learning, writing tricky messages, decoding documents, and budgeting — with privacy built in.",
  keywords: [
    "ai for everyday life",
    "how to use chatgpt at home",
    "ai trip planner",
    "ai meal planner",
    "use ai to write emails",
    "ai for everyone",
    "is it safe to use chatgpt",
  ],
  lessons: [
    // ── 1 ── PROJECT: plan something real
    {
      slug: "plan-something-real",
      title: "Plan Something Real",
      blurb: "Turn a vague idea into a real plan — a trip, a party, a weekend.",
      xp: 40,
      kind: "project",
      content: `# Plan Something Real

Planning is one of the things AI is genuinely *great* at. It never gets
overwhelmed, it's happy to redo the whole thing when one detail changes, and it's
brilliant at turning a fuzzy idea ("a fun weekend somewhere not too far") into a
concrete, hour-by-hour plan you can actually follow.

In this project you'll plan **one real thing** you're actually trying to make
happen — a weekend trip, a birthday party, a day out, a move, a reunion. Anything
with moving parts.

The secret is to **give it your constraints up front**. AI can't read your mind:
it doesn't know your budget, who's coming, or that one guest is gluten-free. The
more of the real situation you hand it, the more the plan feels made *for you*.

> ❌ "plan a birthday party"

> ✅ "Help me plan a 6th birthday party for my daughter. Budget around $200, about
> 12 kids plus parents, in our backyard, Saturday afternoon, dinosaur theme. Two
> kids have nut allergies. Give me a timeline, a shopping list, and 3 activity ideas."

One more trick: **plans are conversations, not one-shots.** When the AI gives you
a plan, push back — "that's too expensive," "make it rain-proof," "we only have 3
hours." It will happily revise. That back-and-forth is where the magic is.`,
      steps: [
        {
          instruction:
            "**Open a free AI chatbot** — [chatgpt.com](https://chatgpt.com), [claude.ai](https://claude.ai), or [gemini.google.com](https://gemini.google.com) — and decide on the one real thing you want to plan.",
          tool: "ChatGPT / Claude / Gemini",
          hint: "Pick something you actually have to do soon — the payoff is real, not pretend.",
        },
        {
          instruction:
            "**Dump your constraints in one message.** Tell it the budget, the date, who's involved, the location, and any must-haves or must-avoids. Then ask for a plan in a specific shape — a timeline, a checklist, or a packing/shopping list.",
          hint: "More constraints = a more personal plan. Don't hold back details to 'keep it simple.'",
        },
        {
          instruction:
            "**Push back at least twice.** Reply to the plan with real objections — 'too pricey,' 'we have a toddler,' 'what if it rains?' Watch it revise without starting over.",
          hint: "This is the part most people skip. The second and third versions are usually far better than the first.",
        },
        {
          instruction:
            "**Sanity-check the facts.** If the plan names specific opening hours, prices, or that a venue exists, verify those yourself — AI can confidently invent details. The *structure* is reliable; the *specifics* need a quick check.",
          hint: "Treat AI as your planner, not your fact source. A 30-second search confirms the bits that would actually ruin your day if wrong.",
        },
      ],
      checkpoint: {
        prompt:
          "**Paste the message where you gave the AI your constraints** (step 2). A strong planning prompt names the budget or scale, the people or place, and asks for the answer in a specific shape. The checklist updates live.",
        placeholder:
          "Help me plan … Budget around … About … people … on … Give me a timeline / checklist / shopping list …",
        rubric: [
          {
            label: "A real, detailed request (at least 25 words)",
            test: "minWords",
            value: "25",
          },
          {
            label:
              "Includes a real constraint — a budget, a date, a number of people, or a place",
            test: "regex",
            value:
              "\\$\\d|\\d+\\s*(people|guests|kids|nights|days|hours|dollars|budget)|budget|monday|tuesday|wednesday|thursday|friday|saturday|sunday|weekend",
          },
          {
            label:
              "Asks for the answer in a specific shape (timeline, checklist, itinerary, shopping list…)",
            test: "includesAny",
            value:
              "timeline, checklist, itinerary, schedule, shopping list, packing list, plan, steps, agenda, list",
          },
        ],
      },
    },

    // ── 2 ── QUIZ: AI as a patient tutor
    {
      slug: "ai-as-a-patient-tutor",
      title: "Your Infinitely Patient Tutor",
      blurb: "Learn any skill or idea — explained at exactly your level.",
      xp: 25,
      kind: "quiz",
      content: `# Your Infinitely Patient Tutor

Maybe the most underrated use of AI: it's a tutor that never sighs, never makes
you feel dumb, and will happily explain the same thing five different ways until
it clicks. Want to understand compound interest, how a mortgage works, what a
"401(k)" is, or how to read sheet music? You have a private tutor on call.

The trick is to **tell it who you are and how you learn.** The same question gets
a wildly different answer depending on the framing:

> ✅ "Explain how compound interest works **like I'm 12**, using a real example
> with actual numbers. Then check I understood by asking me one question."

> ✅ "I learn best with analogies. Explain what a VPN is using an everyday
> comparison, then give me the slightly more technical version."

Powerful tutoring moves you can ask for:

- **"Explain it like I'm five"** (or twelve, or a beginner) — set the level.
- **"Use an analogy"** — bridges new ideas to things you already know.
- **"Quiz me"** — turns passive reading into active recall, which is how you
  actually remember.
- **"I didn't get that — try again differently"** — a great tutor re-explains; so
  will the AI, endlessly, without judgment.
- **"What should I learn next?"** — it can map out a whole learning path.

### One honest caveat
For **facts, dates, and exact figures**, the AI can be confidently wrong. As a
tutor for *concepts* and *intuition*, it's superb. For anything you're staking
money or a grade on, verify the specifics against a trusted source.`,
      questions: [
        {
          prompt:
            "You want AI to teach you a new concept in the way that helps you most. What's the single most useful thing to add to your question?",
          options: [
            "Ask it to make the answer as long as possible",
            "Tell it your level and how you learn — e.g. 'explain like I'm 12, using an analogy'",
            "Demand that it never use any examples",
            "Insist it answer in exactly one word",
          ],
          answer: 1,
          explanation:
            "Setting the level and learning style ('like I'm 12,' 'use an analogy,' 'quiz me') is what turns a generic explanation into one tailored to you.",
        },
        {
          prompt:
            "Why is asking the AI to 'quiz me' such an effective study move?",
          options: [
            "It makes the AI respond faster",
            "It forces active recall — testing yourself is how you actually remember, not just re-reading",
            "It guarantees the AI's facts are correct",
            "It hides the parts you got wrong",
          ],
          answer: 1,
          explanation:
            "Active recall — retrieving an answer from memory — cements learning far better than passive re-reading. Asking the AI to quiz you builds that in for free.",
        },
        {
          prompt:
            "You're using AI to study for a certification exam. Where should you be most careful?",
          options: [
            "When asking it to explain a concept in simpler terms",
            "When asking it for an analogy to understand an idea",
            "When relying on it for exact facts, dates, or figures that will be on the test",
            "When asking it to quiz you on the material",
          ],
          answer: 2,
          explanation:
            "AI is excellent at explaining concepts and quizzing you, but specific facts and figures can be confidently wrong — verify those against your official course material.",
        },
      ],
    },

    // ── 3 ── PROJECT: untangle a tricky personal message
    {
      slug: "untangle-a-tricky-message",
      title: "Untangle a Tricky Message",
      blurb: "Draft the hard email or text — then get the tone exactly right.",
      xp: 40,
      kind: "project",
      content: `# Untangle a Tricky Message

We all have *that* message we keep putting off: telling a friend you can't make
their wedding, pushing back on a boss, asking a neighbor to keep the noise down,
declining an invitation without burning a bridge. The hard part usually isn't the
facts — it's the **tone**.

This is a perfect job for AI, because rewriting and re-toning text you provide is
one of the things it's most reliable at (it's working *from your words*, not
inventing facts).

The workflow that works:

1. **Brain-dump the raw version.** Don't be polite yet — just tell the AI exactly
   what you want to say, messy and blunt. *"I'm furious my landlord still hasn't
   fixed the heat and I want my money back."*
2. **Tell it the relationship and the tone you want.** *"Rewrite this as a firm
   but professional email to my landlord — I want to sound reasonable, not angry,
   but make clear this is serious."*
3. **Adjust the dial.** Too cold? "Warmer." Too soft? "More direct." Too long?
   "Cut it in half." You're tuning, not rewriting.

> ❌ "write an email to my landlord"

> ✅ "Here's what I really want to say: [blunt version]. Rewrite it as a calm,
> professional email. I've been a good tenant for 3 years and want to keep the
> relationship okay, but the heat has been broken for two weeks and I need it
> fixed this week. Keep it under 6 sentences."

A quiet bonus: writing the blunt version first is genuinely cathartic — and then
the AI helps you send the version you won't regret.`,
      steps: [
        {
          instruction:
            "**Pick one real message you've been avoiding** and open a free AI chatbot.",
          tool: "ChatGPT / Claude / Gemini",
          hint: "The messier the feelings, the more this helps. Choose something you actually need to send.",
        },
        {
          instruction:
            "**Brain-dump the blunt version.** Tell the AI exactly what you want to say with no filter, then add the context: who it's to, your relationship, and the outcome you want.",
          hint: "You're not sending this raw version — it's raw material. Honesty here makes the polished version better.",
        },
        {
          instruction:
            "**Ask for a re-toned rewrite.** Name the tone explicitly: 'firm but warm,' 'professional and brief,' 'kind but clear.' Read it out loud — does it sound like *you*?",
          hint: "Generic tone words like 'nice' are weak. 'Warm but firm' or 'apologetic but final' steer much better.",
        },
        {
          instruction:
            "**Tune the dial once or twice**, then make it yours. Tweak any line that doesn't sound like how you actually talk before you send it. Never send AI text you haven't read and approved.",
          hint: "The goal is *your* message, made easier — not a robot's message with your name on it.",
        },
      ],
      checkpoint: {
        prompt:
          "**Paste the instruction you gave the AI to re-tone your message** (step 3) — the part where you described the tone you wanted. A good re-tone request names a clear tone and gives the AI the real context. The checklist updates live.",
        placeholder:
          "Rewrite this as a calm, professional email … I've been a tenant for 3 years … keep it warm but firm …",
        rubric: [
          {
            label: "A real instruction with context (at least 20 words)",
            test: "minWords",
            value: "20",
          },
          {
            label:
              "Names a specific tone or feeling (warm, firm, professional, kind, apologetic, direct…)",
            test: "includesAny",
            value:
              "warm, firm, professional, kind, polite, apologetic, direct, gentle, friendly, calm, casual, formal, reassuring, sincere, brief, concise",
          },
          {
            label:
              "Asks the AI to rewrite, reword, or change the tone (rather than write from scratch)",
            test: "includesAny",
            value: "rewrite, reword, revise, soften, rephrase, re-tone, adjust the tone, change the tone, make it",
          },
        ],
      },
    },

    // ── 4 ── PROJECT: make sense of a confusing document
    {
      slug: "decode-a-confusing-document",
      title: "Decode a Confusing Document",
      blurb: "Paste a baffling bill, lease clause, or letter — and finally get it.",
      xp: 45,
      kind: "project",
      content: `# Decode a Confusing Document

A medical bill full of codes. A lease clause written by a lawyer for other
lawyers. A dense letter from the IRS or an insurance company. These are designed
to be hard to read — and they're exactly where AI shines, because when you **paste
the real text**, the AI works *from* it instead of guessing.

You can ask it to:

- **Translate the jargon** — "explain this lease clause in plain English."
- **Summarize the gist** — "what is this letter actually telling me to do?"
- **Spot what matters** — "what are the deadlines, amounts, and anything that
  could cost me money?"
- **Arm you with questions** — "what should I ask before I sign / pay this?"

> ✅ "I'm going to paste a clause from my apartment lease. Explain in plain English
> what it means for me as a tenant, flag anything unusual or risky, and tell me
> what to ask my landlord about it."

## ⚠️ The privacy rule you must follow
Before you paste, **strip out the secrets.** A chatbot doesn't need your full
account number, full Social Security number, full card number, or login details to
explain a document — and you shouldn't hand those to any website you don't have to.

Safe practice:
- **Black out / delete** full account numbers, SSNs, card numbers, and passwords.
  Leave the *last four digits* if it helps you keep track — never the whole thing.
- **Keep the parts that matter** — the dates, the amounts, the legal wording, the
  instructions. That's what the AI actually needs.
- **Remember it's still a confident guesser.** For a serious bill, lease, or legal
  letter, use AI to *understand* it and form questions — then confirm anything
  high-stakes with the actual company, a lawyer, or an official source.

Done right, this turns a page of intimidating gibberish into "okay, here's what
this means and here's my next move" in about thirty seconds.`,
      steps: [
        {
          instruction:
            "**Find one real confusing document** — a bill, a lease clause, a benefits letter, a contract paragraph — and open a free AI chatbot.",
          tool: "ChatGPT / Claude / Gemini",
          hint: "Even one baffling paragraph is enough. You don't need the whole document.",
        },
        {
          instruction:
            "**Redact the secrets first.** Before pasting anything, remove full account numbers, full SSNs, full card numbers, and any passwords or logins. Last-four digits are fine; the whole number is not.",
          hint: "Quick rule: if a scammer could use it, the chatbot doesn't need it. Delete it before you paste.",
        },
        {
          instruction:
            "**Paste the redacted text and ask for plain English** — plus the deadlines, the amounts, anything risky, and what you should ask before you act.",
          hint: "Try: 'Explain this in plain English, list every date and dollar amount, and flag anything I should be worried about.'",
        },
        {
          instruction:
            "**Verify the high-stakes parts.** If money, a deadline, or a legal obligation is involved, confirm the AI's reading against the original document and, for anything serious, the company or a professional.",
          hint: "AI gives you a fast, confident first read. For a real bill or contract, that's a starting point — not the final word.",
        },
      ],
      checkpoint: {
        prompt:
          "**Paste the question you asked about your document** (step 3) — *not* the document itself, and definitely no account numbers. A strong ask requests plain English and the parts that matter (dates, amounts, risks). The checklist updates live.",
        placeholder:
          "Explain this in plain English, list every deadline and amount, and flag anything risky or unusual …",
        rubric: [
          {
            label: "A real, specific question (at least 12 words)",
            test: "minWords",
            value: "12",
          },
          {
            label:
              "Asks for plain English or a clear explanation / summary",
            test: "includesAny",
            value:
              "plain english, plain language, simple terms, explain, summarize, summarise, in simple, what does this mean, break down",
          },
          {
            label:
              "No full account / card / SSN number pasted (avoid long digit strings)",
            test: "regex",
            value: "^(?!.*\\d{9,}).*$",
          },
        ],
      },
    },

    // ── 5 ── QUIZ: smart shopping & decisions
    {
      slug: "smart-shopping-and-decisions",
      title: "Smart Shopping & Decisions",
      blurb: "Use AI to compare options and weigh pros and cons — within its limits.",
      xp: 25,
      kind: "quiz",
      content: `# Smart Shopping & Decisions

"Should I get the cheaper one or pay more for the better one?" "Which of these
three phones fits how I actually use a phone?" "Is leasing or buying smarter for
me?" AI is a fantastic **thinking partner** for decisions like these — as long as
you know exactly where its help ends.

### What AI is great at here
- **Structuring the decision** — turning a vague worry into a clean pros-and-cons
  list or a side-by-side comparison.
- **Surfacing factors you forgot** — "what should I be considering that I haven't
  thought of?"
- **Matching options to *you*** — tell it how you'll actually use the thing and it
  tailors the recommendation. *"I take photos of my kids and hate charging my
  phone — which of these three matters most for me?"*
- **Explaining trade-offs** — why OLED vs LCD, term vs whole life, etc., in plain
  language.

### Where it falls short (this is the important part)
- **It does NOT know today's prices.** Unless the specific tool is actively
  browsing the web, its price and "what's on sale" knowledge is stale or invented.
  Never trust an AI's quoted price — check the actual store.
- **It doesn't know this week's reviews or stock.** Fresh, real-world info needs a
  real source.
- **It can sound certain about a "best" pick** that's really just a guess. Use it
  to *understand the trade-offs*, then make the call with current, real data.

The pro move: let AI build the **framework** (what to compare, what matters for
you), then fill in the **live facts** — today's price, current reviews,
availability — from the actual retailer.`,
      questions: [
        {
          prompt:
            "You ask an AI chatbot, 'What's the cheapest price for this laptop right now?' Why should you be skeptical of its answer?",
          options: [
            "Because AI never knows anything about laptops",
            "Because, unless it's actively browsing the web, it doesn't know today's prices — its answer may be stale or invented",
            "Because asking about prices is against the rules",
            "Because the AI will always quote a price that's too high",
          ],
          answer: 1,
          explanation:
            "A standard chatbot's pricing knowledge is frozen at its training cutoff and can be hallucinated. Live prices must come from the actual store.",
        },
        {
          prompt:
            "What's the smartest way to use AI when choosing between three products?",
          options: [
            "Ask it which is 'the best' and buy that one immediately",
            "Have it build a pros-and-cons comparison based on how you'll actually use the product, then check live prices and current reviews yourself",
            "Ask it for the exact current price and trust it completely",
            "Avoid AI entirely — it's useless for shopping",
          ],
          answer: 1,
          explanation:
            "AI excels at structuring the decision and tailoring it to your needs. The live facts — price, stock, recent reviews — you verify against real, current sources.",
        },
      ],
    },

    // ── 6 ── PROJECT: meal-plan + budget for a week
    {
      slug: "meal-plan-on-a-budget",
      title: "Meal-Plan a Week on a Budget",
      blurb: "A full week of meals around your diet, budget, and what you'll actually eat.",
      xp: 45,
      kind: "project",
      content: `# Meal-Plan a Week on a Budget

Deciding what's for dinner, seven nights in a row, while juggling a budget,
picky eaters, and a dietary restriction — that's a genuinely hard puzzle, and it's
the kind of structured, constraint-juggling task AI is built for. Hand it the
constraints and it'll produce a full week of meals *plus* a single organized
shopping list, in seconds.

The constraints that make or break the plan:

- **Budget** — "around $80 for the week for two people."
- **Diet & restrictions** — vegetarian, gluten-free, nut allergy, low-sodium,
  halal, kosher, diabetic-friendly. *Be specific — this is the one to never skip.*
- **Reality** — how much time you have to cook, what you hate, what's already in
  your pantry, how many leftovers you'll tolerate.

> ✅ "Make me a 7-dinner meal plan for 2 adults. Budget about $80 total.
> Vegetarian, and one of us is gluten-free. Weeknight dinners need to be under 30
> minutes. We're sick of pasta. Then give me one organized shopping list grouped
> by grocery aisle, and estimate the total cost."

Power moves once you have a plan:

- **"Reuse ingredients across meals"** so nothing rots in the fridge — cheaper and
  less waste.
- **"Group the shopping list by aisle"** so you're not crisscrossing the store.
- **"Swap Thursday — we don't like that"** — regenerate one night without redoing
  the week.
- **"Add up the estimated cost"** — but treat it as a *ballpark*: the AI doesn't
  know your store's real prices, so the final total comes from the register.

### Safety notes
- For a **medical diet** (diabetes, allergies, kidney issues, pregnancy), use the
  plan as a starting point and confirm specifics with a doctor or dietitian — and
  always **double-check ingredient labels yourself** for allergens. A confident AI
  is not a substitute for a label or a professional.`,
      steps: [
        {
          instruction:
            "**Open a free AI chatbot** and decide who you're planning for and roughly what you can spend this week.",
          tool: "ChatGPT / Claude / Gemini",
          hint: "Even a rough budget ('about $80') and head-count gives the AI something concrete to plan around.",
        },
        {
          instruction:
            "**Ask for a 7-day plan with all your constraints in one go** — budget, every dietary restriction, cooking time, and foods you're sick of. Request the meals *and* one organized shopping list.",
          hint: "Don't skip allergies or restrictions to keep it short — that's the most important input of all.",
        },
        {
          instruction:
            "**Tighten it with one or two follow-ups** — 'reuse ingredients so less goes to waste,' 'swap the night we won't eat,' 'group the list by aisle,' or 'estimate the total cost.'",
          hint: "Each follow-up makes the plan cheaper and more usable. This is where a generic plan becomes *your* plan.",
        },
        {
          instruction:
            "**Check the labels and the math yourself.** If anyone has an allergy or medical diet, verify ingredients against real labels, and treat the cost estimate as a ballpark — the register has the final say.",
          hint: "AI plans the menu; you confirm allergens and the real total. That split keeps it both useful and safe.",
        },
      ],
      checkpoint: {
        prompt:
          "**Paste the meal-plan request you wrote** (step 2). A strong one states a budget, the dietary needs, and asks for both meals and a shopping list. The checklist updates live.",
        placeholder:
          "Make me a 7-dinner meal plan for 2 adults, budget about $80, vegetarian and gluten-free … then one shopping list grouped by aisle …",
        rubric: [
          {
            label: "A detailed request (at least 25 words)",
            test: "minWords",
            value: "25",
          },
          {
            label:
              "States a budget or dollar amount (e.g. '$80', 'around 80 dollars', 'cheap')",
            test: "regex",
            value: "\\$\\d|\\d+\\s*dollars|\\bbudget\\b|\\bcheap\\b|\\bspend\\b|\\bunder\\s*\\$?\\d",
          },
          {
            label:
              "Names a dietary need or restriction (vegetarian, gluten-free, allergy, etc.)",
            test: "includesAny",
            value:
              "vegetarian, vegan, gluten, allergy, allergic, nut, dairy, lactose, low-sodium, low sodium, halal, kosher, diabetic, keto, pescatarian, dietary",
          },
          {
            label: "Asks for a shopping or grocery list",
            test: "includesAny",
            value: "shopping list, grocery list, ingredient list, shopping, groceries",
          },
        ],
      },
    },

    // ── 7 ── QUIZ: privacy gut-check
    {
      slug: "privacy-gut-check",
      title: "Privacy Gut-Check",
      blurb: "What's safe — and what's not — to type into a chatbot.",
      xp: 30,
      kind: "quiz",
      content: `# Privacy Gut-Check

You've seen the privacy warnings sprinkled through this whole module. Here's the
one lesson that ties them together, because using AI well at home means being
relaxed about the everyday stuff and careful about the few things that matter.

### The core idea
When you type into a free AI chatbot, your message **leaves your device and goes
to a company's servers.** Depending on the tool and your settings, it may be
stored, reviewed by humans to improve the product, or retained for a while. That's
fine for most things — and a real reason to think twice about a few.

### 🚫 Don't paste these into a chatbot
- **Passwords and login details** — full stop.
- **Full Social Security / national ID numbers.**
- **Full credit/debit card numbers** (and never the security code on the back).
- **Full bank account or routing numbers.**
- **Other people's private data** you wouldn't want shared — someone else's medical
  info, a friend's address, a leaked document.
- **Confidential work material** your employer hasn't cleared for AI tools.

### ✅ Almost always fine
- General questions, learning, brainstorming, planning.
- Drafting and rewriting your own messages.
- Documents **with the secret bits removed** (recall: keep the dates and amounts,
  delete the full account number — last-four is okay).

### Smart habits that shrink your risk
- **Redact before you paste** — strip the secret, keep the substance.
- **Check your settings** — most tools let you turn off "use my chats to train the
  model" and let you delete your history.
- **Use a "would I email this to a stranger?" gut-check.** If the answer is no,
  don't paste it either.
- **Prefer official apps over random "free AI" sites** — sketchy clones can harvest
  whatever you type.

The goal isn't fear — it's a quick instinct that lets you use AI freely for the
99% while protecting the 1% that could actually hurt you.`,
      questions: [
        {
          prompt:
            "Which of these is genuinely safe to type into a normal AI chatbot?",
          options: [
            "Your online banking password so it can 'check your balance'",
            "Your full credit card number to compare two deals",
            "A draft birthday message to your sister that you'd like reworded",
            "A coworker's full medical record for 'a second opinion'",
          ],
          answer: 2,
          explanation:
            "Rewording your own message is exactly what AI is for. Passwords, full card numbers, and other people's private data should never be pasted.",
        },
        {
          prompt:
            "You want AI to explain a medical bill, but it has your full account number on it. What's the right move?",
          options: [
            "Paste the whole thing — the AI needs every detail",
            "Don't use AI at all; it can never help with bills",
            "Delete the full account number (last-four is fine) and paste the rest — the dates, codes, and amounts",
            "Replace your name with a fake one but keep the account number",
          ],
          answer: 2,
          explanation:
            "Redact the secret, keep the substance. The AI needs the amounts, dates, and wording to explain the bill — it does not need your full account number.",
        },
        {
          prompt:
            "Why is it worth checking a chatbot's privacy settings and using official apps instead of random 'free AI' websites?",
          options: [
            "Because official apps are always slower",
            "Because most real tools let you turn off training-on-your-chats and delete history, while sketchy clone sites can harvest whatever you type",
            "Because settings make the AI smarter",
            "Because random sites are always cheaper and that's all that matters",
          ],
          answer: 1,
          explanation:
            "Reputable tools give you controls over training and history; unknown clone sites offer no such guarantees and may exist to collect what you enter.",
        },
      ],
    },
  ],
};
