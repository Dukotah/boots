import type { Module } from "./types";

// Vibe Coding — the flagship differentiator. Teaches how to build real software by
// directing AI, for people who are NOT (yet) expert programmers: describe what you
// want, let the AI write it, read/run/verify, debug together, keep your work safe,
// ship it, and grow into a real builder. Mostly conceptual (quiz) because the
// skill is judgment and workflow, with one hands-on "debug with AI" code lesson so
// the learner actually does the read-the-error-and-fix loop.
export const vibeCoding: Module = {
  slug: "vibe-coding",
  title: "Vibe Coding: Build with AI",
  description:
    "Build real software by directing AI — even if you're not (yet) a programmer. Describe what you want, read and run what the AI writes, debug together, keep your work safe, ship it, and grow into a genuine builder.",
  emoji: "🛠️",
  gradient: "from-violet-500/20 to-fuchsia-500/10",
  tagline:
    "Learn vibe coding: build apps and tools by directing AI assistants like Claude — from your first idea to a shipped, working project.",
  keywords: [
    "vibe coding",
    "how to build apps with AI",
    "build software with AI",
    "Claude Code",
    "AI coding assistant",
    "no-code AI coding",
    "build without being a programmer",
  ],
  lessons: [
    {
      slug: "what-is-vibe-coding",
      title: "What Is Vibe Coding?",
      blurb: "Describe what you want, let AI write the code, and you steer the result.",
      xp: 25,
      kind: "quiz",
      content: `# What Is Vibe Coding?

**Vibe coding** is building software by **describing what you want in plain
language** and letting an AI write the code, while you steer, test, and decide.
You're the director; the AI is the very fast programmer who actually types.

This is genuinely new. A few years ago, turning an idea into a working app meant
months of learning syntax first. Now a motivated beginner can build real,
useful things — a website, a tool, a script, a small app — by collaborating with
AI. (This very platform was built largely this way.)

What vibe coding **is**:

- **Idea-first.** You bring the vision and the judgment of whether it's good.
- **Conversational.** You ask, the AI builds, you react, it adjusts — the refine
  loop, applied to software.
- **Accessible.** You don't need to memorize a language to start.

What vibe coding **is not**:

- **Not "the AI does everything and you don't think."** You still decide what to
  build, check that it works, and own the result.
- **Not magic.** It gets stuck, makes mistakes, and needs a human to test and
  redirect — exactly the skills this course builds.
- **Not a reason to never learn fundamentals.** The more you understand, the better
  you can steer. Vibe coding is a powerful on-ramp, not a dead end.

The mindset to carry in: **you are the builder.** The AI is the most capable tool
you've ever pointed at a problem — but you're still the one holding it.`,
      questions: [
        {
          prompt: "Vibe coding is best described as…",
          options: [
            "The AI builds an app with zero human involvement",
            "You describe what you want in plain language and direct the AI that writes the code",
            "Memorizing a programming language before you build anything",
          ],
          answer: 1,
          explanation:
            "Vibe coding is human-directed: you bring the idea, vision, and judgment; the AI does the fast typing while you steer.",
        },
        {
          prompt: "Which statement about vibe coding is TRUE?",
          options: [
            "It means you never have to test or think",
            "You still decide what to build, verify it works, and own the result",
            "It guarantees bug-free software",
          ],
          answer: 1,
          explanation:
            "AI accelerates building, but humans still set direction, test, and take responsibility. It's collaboration, not abdication.",
        },
        {
          prompt: "How should a vibe coder think about learning programming fundamentals?",
          options: [
            "Pointless — AI replaced them forever",
            "A powerful complement: the more you understand, the better you can steer",
            "You must master everything before touching AI",
          ],
          answer: 1,
          explanation:
            "Vibe coding is a real on-ramp. Understanding the basics makes you a better director — it's an 'and', not an 'instead'.",
        },
      ],
      explanation:
        "You're the builder; AI is the tool. With that framing, the rest of this course is just learning to direct it well.",
    },
    {
      slug: "your-ai-coding-toolkit",
      title: "Your AI Coding Toolkit",
      blurb: "Chat assistants, AI editors, and agentic tools — what to use when.",
      xp: 20,
      kind: "quiz",
      content: `# Your AI Coding Toolkit

There's a spectrum of tools for building with AI, from "copy-paste in a chat" to
"the AI works across your whole project." You'll grow into the more powerful ones.

- **Chat assistants** (Claude, ChatGPT, Gemini in the browser). The simplest start:
  describe what you want, get code, paste it where it goes. Great for learning,
  small scripts, and snippets.
- **AI-powered editors** (e.g. Cursor, VS Code with AI). The AI lives *inside* your
  code editor, sees your files, and can edit them with you. A big step up for real
  projects.
- **Agentic coding tools** (e.g. Claude Code). You give a goal in plain language and
  the AI reads your project, writes across multiple files, runs commands, and tests
  — with you reviewing and approving. The most powerful, and how serious vibe coding
  happens today.

How to choose:

- **Starting out / tiny tasks** → a chat assistant. Lowest friction.
- **A real, growing project** → an AI editor or agentic tool that can see all your
  files, so you're not hand-shuttling code around.
- **Either way, the *skill* transfers.** Describing clearly, reviewing output, and
  debugging are the same no matter the tool.

Don't agonize over the choice. Pick one, build something small, and level up your
tools as your projects grow.`,
      questions: [
        {
          prompt: "What's the difference between a chat assistant and an agentic coding tool like Claude Code?",
          options: [
            "There is none",
            "An agentic tool can read your project, edit multiple files, and run commands; a chat assistant just returns text you paste yourself",
            "Chat assistants are more powerful for big projects",
          ],
          answer: 1,
          explanation:
            "Agentic tools work across your actual project with your approval, while chat assistants hand you code to place yourself — fine for small tasks, clunky for big ones.",
        },
        {
          prompt: "For a real, growing project, why prefer an AI editor or agentic tool over a browser chat?",
          options: [
            "It looks cooler",
            "It can see all your files, so you're not manually shuttling code back and forth",
            "Browser chats can't write code at all",
          ],
          answer: 1,
          explanation:
            "Once a project has many files, a tool with full project context saves enormous friction versus copy-pasting snippets.",
        },
        {
          prompt: "How much should a beginner agonize over picking the 'perfect' tool?",
          options: [
            "A lot — the wrong choice ruins everything",
            "Not much — pick one, build something small, and upgrade tools as projects grow; the core skills transfer",
            "You must use all of them at once",
          ],
          answer: 1,
          explanation:
            "Describing, reviewing, and debugging transfer across every tool. Starting beats optimizing the toolchain.",
        },
      ],
    },
    {
      slug: "describe-what-you-want",
      title: "Describe What You Want",
      blurb: "The clearer your spec, the better the build. Vague in, vague out.",
      xp: 25,
      kind: "quiz",
      content: `# Describe What You Want

The quality of what the AI builds is downstream of how well you describe it. "Make
me an app" gets you a confused mess. A clear, scoped description gets you something
that works.

A strong build request usually covers:

- **What it should do** — the actual feature, in concrete terms. *"A page where I
  paste a list of names and it picks one at random."*
- **Who it's for / the context** — *"for picking a raffle winner at a small event."*
- **Constraints** — *"runs in the browser, no signup, works on my phone."*
- **What 'done' looks like** — *"I can paste names, click a button, and see the
  winner big and clear."*

Two habits that separate good vibe coders:

1. **One thing at a time.** Don't ask for the whole app in one breath. Build the
   core, get it working, then add the next feature. Small steps = fewer ways to go
   wrong (the next lesson is all about this).
2. **Let the AI ask you questions.** End with *"Ask me anything you need before you
   start."* It'll surface decisions you hadn't considered — far better than it
   guessing wrong.

If you can clearly explain it to a smart friend who'll do exactly what you say (and
nothing you didn't), you can describe it to an AI. Clarity is the real skill.`,
      questions: [
        {
          prompt: "Which build request will produce the best result?",
          options: [
            "'Make me an app.'",
            "'A browser page, no signup, where I paste names and click a button to pick one random raffle winner shown big and clear.'",
            "'app thing for a party'",
          ],
          answer: 1,
          explanation:
            "Concrete behavior, context, constraints, and a clear 'done' give the AI everything it needs to build the right thing.",
        },
        {
          prompt: "Why build 'one thing at a time' instead of asking for the whole app at once?",
          options: [
            "It's slower on purpose",
            "Small steps mean fewer ways to go wrong, and you can confirm each piece works before adding more",
            "AI can only write one line at a time",
          ],
          answer: 1,
          explanation:
            "Incremental building keeps each change small and verifiable — the single biggest habit for not getting stuck in a broken mess.",
        },
        {
          prompt: "A great way to end a build request is:",
          options: [
            "'Figure it out.'",
            "'Ask me anything you need before you start.'",
            "'Do everything perfectly.'",
          ],
          answer: 1,
          explanation:
            "Inviting questions surfaces decisions up front, so the AI builds to your intent instead of guessing wrong.",
        },
      ],
      explanation:
        "Vague in, vague out. Clear, scoped, one-thing-at-a-time requests — plus letting the AI ask questions — are how you get builds that actually work.",
    },
    {
      slug: "build-in-small-steps",
      title: "Build in Small Steps",
      blurb: "Get a tiny version working, confirm it, then add the next piece.",
      xp: 25,
      kind: "quiz",
      content: `# Build in Small Steps

The #1 reason vibe coding projects fall apart: trying to do too much at once. When
twelve things change and something breaks, you have no idea which change caused it.
The fix is a rhythm professional developers swear by — and AI makes it easy.

**The loop: build small → run it → confirm it works → commit → next piece.**

1. **Smallest useful version first.** Not the whole app — the simplest thing that
   does *one* part. ("Just show the list of names on screen." Working? Good.)
2. **Run it and actually check.** Don't assume — open it, click it, see it work.
3. **Lock in the win.** Save/commit the working version (next lesson covers this)
   so you can always get back to it.
4. **Add the next piece.** One feature. Repeat.

Why this wins:

- **Bugs are obvious.** If it worked a minute ago and breaks now, the cause is the
  one thing you just changed.
- **You always have a working version** to fall back to.
- **Momentum.** A string of small wins beats a giant change that never quite works.

When the AI tries to do too much at once, **slow it down**: "Let's just get X
working first, then we'll add Y." You set the pace. Steady, verified steps build
real things; giant leaps build rubble.`,
      questions: [
        {
          prompt: "Why is building in small, verified steps so important?",
          options: [
            "It makes the project take longer for no reason",
            "When something breaks, you know it was the one small thing you just changed",
            "AI requires it for billing",
          ],
          answer: 1,
          explanation:
            "Small steps make cause and effect obvious and always leave you a working version to return to.",
        },
        {
          prompt: "The AI proposes rewriting half your app in one giant change. A good response is:",
          options: [
            "'Yes, do it all at once.'",
            "'Let's just get X working and confirmed first, then add Y.'",
            "Delete the project and start over",
          ],
          answer: 1,
          explanation:
            "You set the pace. Breaking a big change into verified steps keeps you in control and makes problems easy to isolate.",
        },
        {
          prompt: "After the AI makes a change, what should you do before moving on?",
          options: [
            "Assume it works and keep going",
            "Run it and actually confirm the change does what you wanted",
            "Immediately ask for ten more features",
          ],
          answer: 1,
          explanation:
            "Verifying each step is the whole point — 'it should work' is not the same as 'I saw it work'.",
        },
      ],
    },
    {
      slug: "debug-with-ai",
      title: "Debug With AI",
      blurb: "Hands-on: read the error, find the bug, and fix it — the core vibe-coding loop.",
      xp: 35,
      content: `# Debug With AI

Code breaks — for everyone, constantly. The skill isn't avoiding bugs; it's the
**debug loop**: read what went wrong, locate the cause, fix it, re-run. When you're
vibe coding, you do this *with* the AI: paste the exact error message and what you
expected, and it helps you pinpoint the fix. But you have to be able to **read the
result and confirm the fix is right** — so let's practice on a real one.

Below is a function meant to calculate a **20% discount** — given a price, it should
return the price *after* taking 20% off. A "user" reports a bug:

> 🐞 **Bug report:** "I entered 100 and it showed 120. It's making things *more*
> expensive, not less!"

Look at the code. The bug is that it **adds** the discount instead of subtracting
it. That's exactly the kind of one-character mistake AI (and humans) make — and
exactly the kind you'll catch by reading the output.

## Your task
Fix \`applyDiscount(price)\` so it returns the price with 20% taken **off**
(i.e. \`price * 0.8\`). Then the tests below will pass.`,
      starterCode: `function applyDiscount(price) {
  // BUG: this ADDS 20% instead of taking it off.
  return price + price * 0.2;
}
`,
      solution: `function applyDiscount(price) {
  return price - price * 0.2;
}`,
      tests: [
        {
          name: "100 → 80 (20% off)",
          code: `assertEquals(applyDiscount(100), 80);`,
        },
        {
          name: "50 → 40",
          code: `assertEquals(applyDiscount(50), 40);`,
        },
        {
          name: "0 → 0",
          code: `assertEquals(applyDiscount(0), 0);`,
        },
      ],
      hints: [
        "A discount makes the price go DOWN — you want subtraction, not addition.",
        "Taking 20% off leaves 80%: `price - price * 0.2` (which equals `price * 0.8`).",
      ],
      explanation:
        "That's the debug loop in miniature: a clear bug report, read the code, spot the wrong operator, fix, re-run, confirm. With AI you'd paste the report and the code and it would suggest this fix — but reading the error and verifying the result yourself is the skill that keeps you in control.",
    },
    {
      slug: "dont-lose-your-work",
      title: "Don't Lose Your Work",
      blurb: "Version control in plain terms: save working states so you can always go back.",
      xp: 20,
      kind: "quiz",
      content: `# Don't Lose Your Work

Picture this: your app works, you ask for "one more feature," and now *nothing*
works — and you can't remember what changed. Without a safety net, you're stuck.
**Version control** is that safety net, and it's the habit that lets you experiment
fearlessly.

The plain-language idea: every time things work, you take a **snapshot** (a
"commit"). If a later change breaks everything, you **roll back** to the last good
snapshot — instantly, completely. The tool most people use is **Git**, often with
**GitHub** to store snapshots in the cloud.

You don't need to master Git to benefit — the AI can run these for you. What you
need is the **habit**:

- **Commit when it works.** Got a feature working and verified? Snapshot it. A
  short message ("added the winner button") is enough.
- **Experiment freely.** With a snapshot saved, you can try a bold change knowing
  you can always undo it.
- **Roll back without shame.** "This change made things worse — let's go back to the
  last working version" is a normal, healthy move, not a failure.
- **Back it up to the cloud** (e.g. push to GitHub) so a dead laptop never erases
  weeks of work.

Vibe coding without version control is building on sand. With it, every working
state is a save point you can always return to.`,
      questions: [
        {
          prompt: "In plain terms, what does version control (like Git) give you?",
          options: [
            "Faster internet",
            "Snapshots of working versions you can roll back to if a later change breaks things",
            "A way to write code automatically",
          ],
          answer: 1,
          explanation:
            "Commits are save points. If something breaks, you restore the last good snapshot — that safety net is what lets you experiment boldly.",
        },
        {
          prompt: "When is the best time to take a snapshot (commit)?",
          options: [
            "Only when the whole project is 100% finished",
            "Whenever you get something working and verified — lock in the win",
            "Never; it's a waste of time",
          ],
          answer: 1,
          explanation:
            "Committing at each working state means you can always return to a version that worked, even after a risky change.",
        },
        {
          prompt: "A change broke your working app. What's the healthy response?",
          options: [
            "Panic and rebuild from scratch",
            "Roll back to the last working snapshot — a normal, smart move",
            "Keep adding more changes hoping it fixes itself",
          ],
          answer: 1,
          explanation:
            "Rolling back to a known-good version is exactly what version control is for. It's a routine tool, not an admission of failure.",
        },
      ],
    },
    {
      slug: "ship-it-and-beyond",
      title: "Ship It — and Beyond",
      blurb: "Capstone: get it in front of real people, then grow from vibe coder to builder.",
      xp: 30,
      kind: "quiz",
      content: `# Ship It — and Beyond

A project on your laptop helps no one. **Shipping** — putting it somewhere other
people can actually use — is where it becomes real, and it's more approachable than
ever.

**Getting it live (at a high level):**

- **Hosting** is just "putting your app on a computer that's always on, with a web
  address." Modern platforms (Vercel, Netlify, and others) make this close to
  one-click, and the AI can walk you through every step.
- **Start small and private.** Share with a friend or two first. Real users find
  things you never will.
- **Iterate from feedback.** Watch where people get confused, then run the refine
  loop on the rough edges.
- **Mind the basics before a wide launch.** Don't expose secrets (API keys), and be
  thoughtful with anyone's data (remember "Privacy & Staying Safe").

**From vibe coder to builder.** Vibe coding gets you building immediately. To go
further:

- **Learn fundamentals as you go.** Each concept you understand (how the web works,
  what a function is, what a database does) makes you a sharper director. That's
  exactly what the rest of this platform is for.
- **Read what the AI writes.** Over time you'll absorb patterns and start catching
  issues before they happen.
- **Build, ship, repeat.** Every finished project teaches more than a dozen
  tutorials. Real things, in front of real people.

You started not sure what AI even was. Now you can direct it to build and ship
software. Keep going — you're a builder now.`,
      questions: [
        {
          prompt: "What does 'shipping' a project mean?",
          options: [
            "Mailing a USB stick to someone",
            "Putting it somewhere real people can actually use it (e.g. hosting it online)",
            "Deleting it when you're done",
          ],
          answer: 1,
          explanation:
            "Shipping = getting it in front of real users. Modern hosting platforms make going live close to one-click, with the AI guiding you.",
        },
        {
          prompt: "What's a smart way to launch a first project?",
          options: [
            "Announce it to millions immediately",
            "Share with a friend or two first, then iterate from their feedback",
            "Never let anyone see it",
          ],
          answer: 1,
          explanation:
            "Small, private launches surface real problems safely. Feedback from a few real users is gold for the refine loop.",
        },
        {
          prompt: "How do you grow from vibe coder into a stronger builder?",
          options: [
            "Stop using AI entirely",
            "Learn fundamentals as you go, read what the AI writes, and keep building and shipping",
            "Only watch tutorials, never build",
          ],
          answer: 1,
          explanation:
            "Understanding more makes you a better director, and shipping real projects teaches faster than anything. Vibe coding is the on-ramp; building is the road.",
        },
      ],
      explanation:
        "From 'what is AI?' to shipping software you directed an AI to build — that's a real transformation. Keep building, keep learning the fundamentals, and keep shipping.",
    },
  ],
};
