import type { Module } from "./types";

// Using AI Safely & Honestly — the trust layer of the "AI for Everyone" track.
//
// A companion to AI Foundations: where that module teaches *how* to talk to AI,
// this one teaches how to use it *responsibly* — protecting your private data,
// verifying what it tells you, accounting for bias, disclosing when you've used
// it, spotting AI-powered fakes, and keeping your own skills sharp. Like the rest
// of the track there is no code editor: `quiz` lessons mix reading with a
// decision check, and `project` lessons send the learner to do real work in a
// real AI tool and grade what they bring back with a client-side rubric. Free,
// because safety and honesty are a public good — this is a lead-magnet module.
export const aiResponsible: Module = {
  slug: "ai-responsible",
  title: "Using AI Safely & Honestly",
  description:
    "How to use AI without getting burned: what never to paste, how your data and chat history are used, fact-checking what AI tells you, accounting for bias, disclosing AI use honestly, spotting AI-powered scams, and keeping your own judgment sharp. No coding required.",
  emoji: "🛡️",
  gradient: "from-sky-500/20 to-indigo-500/10",
  tagline:
    "Use AI tools like ChatGPT, Claude, and Gemini the smart way — protect your privacy, verify the facts, watch for bias, disclose honestly, and spot AI fakes.",
  keywords: [
    "ai safety for beginners",
    "is chatgpt safe",
    "ai privacy",
    "how to fact check ai",
    "ai bias",
    "disclosing ai use",
    "spot ai scams deepfakes",
    "using ai responsibly",
  ],
  // Public-good lead magnet — every lesson fully interactive for free.
  free: true,
  lessons: [
    // ── 1 ── concept (quiz)
    {
      slug: "what-never-to-paste",
      title: "What to Never Paste Into AI",
      blurb: "The short, memorable list of things that should never go in a prompt.",
      xp: 25,
      kind: "quiz",
      content: `# What to Never Paste Into AI

An AI chatbot feels like a private conversation. It usually isn't. Your messages
travel to a company's servers, may be stored, and — depending on the tool and your
settings — may be **read by people or used to train future models**. So before you
paste, ask one question: *would I be okay if this showed up somewhere I didn't
choose?*

Here's the short list that should basically **never** go into a normal chatbot:

- **Passwords, PINs, and 2FA codes.** Ever. No real task needs them.
- **Full payment details** — complete card numbers, CVVs, bank account and routing
  numbers.
- **Government IDs** — your Social Security number, passport, or national ID number.
- **Other people's private data** — a friend's medical history, a customer's home
  address, someone's messages. It's not yours to share.
- **Confidential work material** — unreleased code, contracts, client lists, or
  anything under an NDA, unless your employer has approved a specific tool for it.

### You can still get help — just sanitize first
The trick isn't to avoid AI; it's to **strip the sensitive bits and keep the
shape of the problem**. AI almost never needs the real values to help you.

> ❌ "Here's my credit card statement, account 4012-8888-8888-1881, help me budget."

> ✅ "Here's a list of my monthly expenses by category with the amounts. Help me
> build a budget."

Replace real names with "Person A," swap real numbers for fake ones, and remove
anything that identifies a specific person. You lose nothing — and you stay safe.`,
      questions: [
        {
          prompt:
            "Which of these is safe to paste into a normal AI chatbot?",
          options: [
            "Your online banking password so it can 'check' your account",
            "A coworker's full medical history to help you write a sympathy note",
            "A list of your monthly expenses by category, with no account numbers, to help you budget",
            "Your full 16-digit credit card number and the CVV on the back",
          ],
          answer: 2,
          explanation:
            "Categories and amounts with no identifying numbers are fine. Passwords, full card details, and other people's private medical data should never go in.",
        },
        {
          prompt:
            "You want AI's help reviewing a confidential contract from work. The best move is to…",
          options: [
            "Paste the whole signed contract, including names and dollar figures",
            "First check whether your employer approved a specific AI tool for confidential work; if not, don't paste it",
            "Email it to yourself first, then paste it — that makes it safe",
            "Paste it but add 'please keep this private' at the top",
          ],
          answer: 1,
          explanation:
            "Confidential and NDA-covered material should only go into tools your organization has cleared. A polite 'keep this private' note does nothing — the data still leaves your control.",
        },
        {
          prompt:
            "What's the smartest way to get AI help on a sensitive personal document?",
          options: [
            "Paste everything exactly as-is so the AI has full context",
            "Strip or fake the sensitive values (names, IDs, account numbers) and keep just the shape of the problem",
            "Avoid AI entirely for anything personal, forever",
            "Type it in all capital letters so it's treated as confidential",
          ],
          answer: 1,
          explanation:
            "Sanitizing — removing or faking identifying details while keeping the structure — lets you get real help without exposing anything that matters.",
        },
      ],
    },

    // ── 2 ── concept (quiz)
    {
      slug: "your-data-and-chat-history",
      title: "Your Data & Chat History",
      blurb: "How prompts can be used to train models — and the settings that change that.",
      xp: 25,
      kind: "quiz",
      content: `# Your Data & Chat History

Now that you know *what* not to paste, here's *why* it matters: what actually
happens to your messages after you hit send.

It varies by tool and plan, but the honest general picture is:

- **Your chats are usually stored** in your account history so you can return to
  them.
- **They may be used to train future models** — meaning your words can become part
  of what the next version learns from — depending on the product and your settings.
- **Some chats can be reviewed by humans**, often to check safety or quality.

None of this is sinister, but it does mean a chatbot is **not** a private diary or
a secure vault. Treat it like writing on a company's whiteboard, not whispering to
a friend.

### The controls you actually have
Most major tools now give you real options — learn where they live:

- **Training opt-out.** Look in *Settings → Data controls* (wording varies) for a
  switch like "improve the model for everyone." Turning it off means your future
  chats aren't used for training.
- **Temporary / incognito chats.** A mode that doesn't save to your history and
  isn't used for training — perfect for a one-off sensitive question.
- **Delete history.** You can usually delete individual chats or wipe everything.

### Protect the account itself
Your AI account holds your whole conversation history, so secure it like email:

- Use a **strong, unique password** and a **password manager**.
- Turn on **two-factor authentication (2FA)**.
- Be wary on shared or public computers — **log out** when you're done.

These few minutes of setup are the difference between "a tool I use" and "a
searchable record of everything I ever asked."`,
      questions: [
        {
          prompt:
            "Which statement about your AI chat history is the most accurate?",
          options: [
            "Chats are always 100% private and are never stored or reviewed by anyone",
            "Chats are typically stored, may be used to train future models, and can sometimes be reviewed — depending on the tool and your settings",
            "Everything you type is immediately published publicly",
            "Chats are deleted automatically the second you close the tab",
          ],
          answer: 1,
          explanation:
            "The realistic picture is in the middle: usually stored, potentially used for training, sometimes human-reviewed — and adjustable through settings.",
        },
        {
          prompt:
            "You have a one-off sensitive question and don't want it saved or used for training. The best built-in tool is…",
          options: [
            "Typing 'do not save this' before your question",
            "Using a temporary / incognito chat mode that doesn't save to history or train on it",
            "Asking the question twice so it cancels out",
            "Deleting your entire account afterward",
          ],
          answer: 1,
          explanation:
            "Temporary or incognito chat modes exist precisely for this: the conversation isn't kept in your history and isn't used for training.",
        },
        {
          prompt:
            "Why is it worth turning on two-factor authentication (2FA) for your AI account?",
          options: [
            "It makes the AI's answers more accurate",
            "It's required by law for all AI tools",
            "Your account holds your whole conversation history, so it deserves the same protection as your email",
            "It lets the AI remember you across different websites",
          ],
          answer: 2,
          explanation:
            "Your account is a record of everything you've asked. 2FA stops someone who steals your password from reading all of it.",
        },
      ],
    },

    // ── 3 ── PROJECT: run a verification pass
    {
      slug: "run-a-verification-pass",
      title: "Run a Verification Pass",
      blurb: "Take an AI answer full of facts and actually fact-check it.",
      xp: 40,
      kind: "project",
      content: `# Run a Verification Pass

In AI Foundations you learned *that* AI hallucinates. In this project you'll build
the habit that protects you from it: **a verification pass.** You'll get an AI
answer packed with specific facts, then treat it as a confident first draft and
check it — the exact move that separates people who get burned by AI from people
who trust it appropriately.

Pick a topic where details matter and you can verify them: a bit of history, a
health or nutrition claim, how a law or benefit works, the specs of a product, a
famous quote. You're not trying to "catch" the AI — you're learning to trust but
verify.`,
      steps: [
        {
          instruction:
            "**Ask a fact-rich question.** In a real AI tool, ask something that produces specific claims — dates, numbers, names, or a quote. E.g. `Give me 5 key facts about the history of the Eiffel Tower, including dates and figures.`",
          tool: "ChatGPT / Claude / Gemini",
          hint: "You want concrete, checkable details, not opinions. Numbers and dates are perfect.",
        },
        {
          instruction:
            "**Ask the AI to show its sources.** Reply with: `For each claim, give me the source you're basing it on, with a link if you can.` Notice whether the links are real and actually say what was claimed.",
          hint: "Hallucinated citations are common — a link that 404s or doesn't mention the claim is a red flag.",
        },
        {
          instruction:
            "**Cross-check independently.** Open a search engine or a trusted reference (an official site, an encyclopedia, a primary source) and verify at least three of the specific claims *yourself* — don't take the AI's word for its own sources.",
          tool: "Web search",
          hint: "Independent confirmation is the whole point. One reliable outside source beats the AI repeating itself.",
        },
        {
          instruction:
            "**Write up what you found.** Note which claims checked out, which were wrong or couldn't be confirmed, and what you'd do differently before trusting this AI on facts again.",
          hint: "Even 'all five were correct' is a valid finding — you proved it instead of assuming it.",
        },
      ],
      checkpoint: {
        prompt:
          "**Write up your verification pass** in a few sentences: what you asked, which specific claims you checked, what held up, and what (if anything) was wrong or unverifiable. The checklist updates live as your write-up covers each part.",
        placeholder:
          "I asked the AI for facts about … I checked the claim that … against … I found that …",
        rubric: [
          {
            label: "A real, specific write-up (at least 40 words)",
            test: "minWords",
            value: "40",
          },
          {
            label:
              "Mentions checking, verifying, or sourcing the claims (e.g. \"verified\", \"checked\", \"source\")",
            test: "includesAny",
            value:
              "verif, check, source, confirm, cross-check, fact-check, double-check, looked up, searched",
          },
          {
            label:
              "References a specific claim you tested — a date, number, name, or quote (contains a digit or a quoted phrase)",
            test: "regex",
            value: "[0-9]|\\\"[^\\\"]+\\\"|'[^']+'",
          },
        ],
      },
    },

    // ── 4 ── concept (quiz)
    {
      slug: "bias-and-blind-spots",
      title: "Bias & Blind Spots",
      blurb: "Why AI can be subtly unfair — and how to account for it.",
      xp: 25,
      kind: "quiz",
      content: `# Bias & Blind Spots

AI learns from enormous amounts of human-written text. That's its superpower — and
the source of a quiet problem: it also **absorbs the biases, gaps, and stereotypes
baked into that text.** The model isn't trying to be unfair. It's reflecting
patterns in what it read, and what it read was written by us.

This shows up in ordinary, easy-to-miss ways:

- **Default assumptions.** Ask for "a picture of a CEO" or "a story about a nurse"
  and the result may quietly lean toward one gender, age, or ethnicity — because
  that's what the training data over-represented.
- **Whose voice is centered.** It often reflects the perspectives, languages, and
  cultures it saw most, and underserves those it saw least.
- **Stale views.** Training data is a snapshot of the past, so outdated attitudes
  can slip through as if they were current consensus.
- **Confident on thin ice.** It can give a fluent, authoritative answer on a topic
  where the underlying evidence is genuinely contested.

### How to account for it
You don't need to be an expert — just a little skeptical in the right places:

1. **Notice the defaults.** When AI fills in a gap you left blank, ask whose
   assumptions it's making, and whether they fit your situation.
2. **Ask for the other side.** *"What's a different perspective?"* or *"Who might
   disagree, and why?"* surfaces what a single answer flattened.
3. **Be specific to override defaults.** Spell out the people, cultures, or
   contexts you actually mean instead of letting the model guess.
4. **Be extra careful on high-stakes, human judgments** — hiring, lending,
   discipline, medical, legal. Bias does the most damage exactly there.

The goal isn't to distrust everything. It's to remember that a fluent answer is
still a *reflection of its training*, not a neutral oracle.`,
      questions: [
        {
          prompt:
            "Why can an AI produce biased or stereotyped output even when no one programmed it to be unfair?",
          options: [
            "It has personal opinions and chooses to be unfair",
            "It learns patterns from human-written text, so it absorbs the biases and gaps already present in that data",
            "Bias only happens when the AI is broken",
            "It deliberately favors whoever pays the most",
          ],
          answer: 1,
          explanation:
            "Bias is inherited from the training data, not deliberately coded. The model reflects patterns — including unfair ones — in the human text it learned from.",
        },
        {
          prompt:
            "Which is a good, practical way to account for AI bias in an answer?",
          options: [
            "Always assume the first answer is perfectly neutral",
            "Ask for a different perspective and be specific about the people or context you actually mean",
            "Only use AI written in your own language so it can't be biased",
            "Refuse to use AI for anything involving people",
          ],
          answer: 1,
          explanation:
            "Asking 'what's another perspective?' and spelling out your real context overrides hidden defaults and surfaces what a single answer flattened.",
        },
        {
          prompt:
            "Where does AI bias tend to do the MOST damage?",
          options: [
            "When brainstorming names for a pet",
            "When summarizing a recipe",
            "In high-stakes human judgments like hiring, lending, or medical decisions",
            "When translating a casual text message",
          ],
          answer: 2,
          explanation:
            "Low-stakes creative tasks can absorb a little bias harmlessly. Decisions about people's jobs, money, and health are exactly where unfairness causes real harm.",
        },
      ],
    },

    // ── 5 ── concept (quiz)
    {
      slug: "honesty-and-disclosure",
      title: "Honesty & Disclosure",
      blurb: "When to tell people you used AI — and where the line on integrity sits.",
      xp: 25,
      kind: "quiz",
      content: `# Honesty & Disclosure

Using AI isn't cheating. **Hiding that you used it when it matters** can be. The
difference is about honesty and the expectations of the people relying on your
work — not about the tool itself.

A simple test: **would the person reading this feel misled if they knew how it was
made?** If yes, disclose. If no, you're probably fine.

### Where disclosure usually matters
- **School.** Follow your school's specific policy — it's the rule that governs
  you. Many courses allow AI for brainstorming but not for writing the final work,
  and submitting AI text as your own original writing is typically **plagiarism**.
  When unsure, ask the instructor *before*, not after.
- **Work.** Check your employer's policy. Be transparent about AI in anything
  where accuracy and accountability matter — a report, a legal or medical
  document, a client deliverable. *You* are still responsible for what you sign
  off on.
- **Publishing.** Many platforms, journals, and contests now require you to
  disclose AI-generated or AI-assisted content. Passing off AI work as wholly your
  own, where originality is the point, breaks that trust.

### Where it usually doesn't
Nobody expects a disclosure because AI helped you fix grammar, draft a routine
email, or brainstorm ideas you then made your own — any more than they'd expect a
footnote for using spell-check or a calculator.

### The integrity bottom line
- **You own the output.** "The AI wrote it" is never a valid excuse for something
  false, harmful, or plagiarized that you sent out under your name.
- **AI assists your thinking; it doesn't replace your responsibility.**
- **When in doubt, a quick, honest "I used AI to help with this" costs you
  nothing** — and protects your credibility far more than getting caught hiding it.`,
      questions: [
        {
          prompt:
            "What's a reliable test for whether you should disclose that you used AI?",
          options: [
            "Disclose only if someone directly asks you",
            "Ask whether the person relying on the work would feel misled if they knew how it was made",
            "Never disclose — it makes you look less capable",
            "Always disclose for every single use, including spell-check",
          ],
          answer: 1,
          explanation:
            "The 'would they feel misled?' test cuts through the gray area: it focuses on the expectations of the people depending on your work.",
        },
        {
          prompt:
            "You're a student and you're not sure whether AI is allowed on an assignment. The right move is to…",
          options: [
            "Use it anyway and hope no one notices",
            "Assume it's fine because the tool is publicly available",
            "Check your school's policy and ask the instructor before submitting if it's unclear",
            "Use it but change a few words so it can't be detected",
          ],
          answer: 2,
          explanation:
            "Your school's policy is the rule that governs you. Asking first protects you; submitting AI work as your own where it's barred is typically plagiarism.",
        },
        {
          prompt:
            'Which situation does NOT normally require disclosing AI use?',
          options: [
            "Submitting an AI-written essay as your own original work for a graded class",
            "Using AI to fix the grammar in an email you wrote yourself",
            "Publishing an AI-generated article in a journal that requires disclosure",
            "Handing a client a report with AI-generated facts you never verified",
          ],
          answer: 1,
          explanation:
            "Light editing help — like grammar fixes — is on par with spell-check and needs no footnote. The others involve passing off, unverified facts, or breaking a disclosure rule.",
        },
      ],
    },

    // ── 6 ── PROJECT: spot AI fakes
    {
      slug: "spot-ai-fakes",
      title: "Spot AI Fakes",
      blurb: "Practice catching AI-generated scams, deepfakes, and phishing.",
      xp: 40,
      kind: "project",
      content: `# Spot AI Fakes

AI doesn't just help good people work faster — it helps scammers, too. The same
tools that write a friendly email can write a flawless **phishing message**, clone
a voice from a few seconds of audio, or generate a **deepfake** photo or video of
someone who never did the thing shown. The old advice ("watch for bad grammar")
is dead: AI fakes are clean, confident, and personalized.

In this project you'll deliberately study AI-generated fakes so your eye gets
sharper, then write down your own list of tells. Knowing the patterns is the best
defense there is.`,
      steps: [
        {
          instruction:
            "**See how easy it is.** Ask a real AI tool: `What are the current telltale signs of an AI-generated image, an AI voice clone, and an AI phishing email?` Read its answer — you're learning the tells from the inside.",
          tool: "ChatGPT / Claude / Gemini",
          hint: "Look for cues like odd hands or text in images, flat/uncanny audio, and urgency + a payment or login request in messages.",
        },
        {
          instruction:
            "**Study real examples.** Search for a reputable guide on spotting deepfakes and AI scams (a bank, a consumer-protection agency, or a major newspaper). Find at least three concrete, current tells you didn't already know.",
          tool: "Web search",
          hint: "Trusted sources keep these guides up to date as the fakes improve — much better than guessing.",
        },
        {
          instruction:
            "**Learn the verification reflex.** Note the one move that beats almost every fake: stop, and **confirm through a separate, trusted channel.** If 'your bank' emails, call the number on your card — not the one in the message. If a 'relative' calls in a panic for money, hang up and call them back directly.",
          hint: "Urgency is the scammer's favorite weapon. Slowing down and switching channels defeats it.",
        },
        {
          instruction:
            "**Build your personal tell-sheet.** Write down the specific warning signs you'll now watch for across images, audio/video, and messages — the list you'd teach a family member.",
          hint: "Make it concrete and yours: 'asks for urgency + payment', 'voice sounds slightly flat', 'verify by calling back'.",
        },
      ],
      checkpoint: {
        prompt:
          "**Write your personal tell-sheet** for spotting AI fakes: at least three specific warning signs across images, audio/video, or messages, plus how you'll verify something before trusting it. The checklist updates live as you cover each part.",
        placeholder:
          "Warning signs I'll watch for: 1) … 2) … 3) … And before I trust it, I'll verify by …",
        rubric: [
          {
            label: "A real, specific tell-sheet (at least 35 words)",
            test: "minWords",
            value: "35",
          },
          {
            label:
              "Names at least one type of AI fake (deepfake, voice clone, phishing, scam, fake image…)",
            test: "includesAny",
            value:
              "deepfake, voice, clone, phishing, scam, fake, manipulat, impersonat, spoof",
          },
          {
            label:
              "Includes a verification step (verify, confirm, call back, separate channel, double-check…)",
            test: "includesAny",
            value:
              "verify, confirm, call back, call them, separate channel, double-check, hang up, check directly, slow down",
          },
        ],
      },
    },

    // ── 7 ── concept (quiz)
    {
      slug: "healthy-reliance",
      title: "Healthy Reliance",
      blurb: "Get the leverage of AI without letting your own skills go rusty.",
      xp: 25,
      kind: "quiz",
      content: `# Healthy Reliance

AI is a fantastic assistant and a terrible crutch. The risk isn't dramatic — it's
quiet: leaning on it so reflexively that your own thinking, writing, and judgment
slowly go soft. The goal of this whole module comes down to one balance: **let AI
amplify your skills, not replace them.**

### The warning signs of over-reliance
- You **can't start anything** without asking AI first.
- You **accept answers without understanding** them — copying, not learning.
- Skills you used to have — mental math, drafting, navigating, remembering — feel
  **rustier** than they used to.
- You'd be **stuck** if the tool vanished tomorrow.

### How to stay sharp
1. **Try first, then ask.** Take your own swing at the problem before reaching for
   AI. Use it to check, extend, or unstick you — not to start every time.
2. **Use it to learn, not just to finish.** Ask it to *explain* its answer so you
   could do it yourself next time. "Teach me" beats "do it for me."
3. **Keep a no-AI muscle.** Deliberately do some things by hand — write the first
   draft, do the arithmetic, find your own way — so the skill stays alive.
4. **Own the final call.** On anything that matters, *you* decide. AI informs your
   judgment; it doesn't get to be your judgment.

Used well, AI is like a calculator for thinking: it frees you from the grunt work
so you can do *more*, at a higher level. The people who thrive with it aren't the
ones who lean hardest — they're the ones who stay in the driver's seat.`,
      questions: [
        {
          prompt:
            "Which is a warning sign of unhealthy over-reliance on AI?",
          options: [
            "Using AI to check a draft you already wrote yourself",
            "Accepting answers you don't understand and feeling unable to start anything without asking AI first",
            "Asking AI to explain its reasoning so you can learn",
            "Occasionally choosing to do a task by hand to stay sharp",
          ],
          answer: 1,
          explanation:
            "Copying answers you don't understand and being unable to begin without AI are the classic signs your own skills are atrophying.",
        },
        {
          prompt:
            "What's a healthy habit for keeping your own skills sharp while using AI?",
          options: [
            "Always let AI produce the very first draft so you never struggle",
            "Take your own swing first, then use AI to check or extend your work",
            "Avoid understanding the answers so you can move faster",
            "Use AI for every decision, large and small",
          ],
          answer: 1,
          explanation:
            "'Try first, then ask' keeps your own ability engaged and turns AI into an amplifier rather than a replacement.",
        },
        {
          prompt:
            "What's the healthiest overall way to think about relying on AI?",
          options: [
            "Hand over as much of your thinking as possible to save effort",
            "Distrust it completely and never use it",
            "Let it amplify your skills and do the grunt work, while you keep the understanding and the final judgment",
            "Use it only when you're certain it will never make a mistake",
          ],
          answer: 2,
          explanation:
            "The sweet spot is leverage with ownership: AI handles the heavy lifting, but you keep the understanding and stay in charge of the decisions that matter.",
        },
      ],
    },
  ],
};
