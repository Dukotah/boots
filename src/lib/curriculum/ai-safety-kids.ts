import type { Module } from "./types";

// AI Safety for Young Minds — a gentle, quiz-based course helping kids use AI
// tools wisely: what AI is, that it can be wrong, that it isn't a person, keeping
// private things private, and checking with a trusted adult. Plain, kind language.
export const aiSafetyKids: Module = {
  slug: "ai-safety-kids",
  title: "AI Safety for Young Minds 🤖",
  emoji: "🤖",
  gradient: "from-violet-400/20 to-pink-500/10",
  description:
    "AI helpers are everywhere! 🤖 Learn what AI is, why it can be wrong, and how to use it safely and kindly — with simple ideas any young coder can follow.",
  tagline:
    "A kid-friendly intro to using AI safely: what AI is, why it can make mistakes, keeping private info private, and asking a trusted adult.",
  keywords: [
    "ai safety for kids",
    "ai for kids explained",
    "is ai safe for children",
    "kids and chatbots",
    "using ai responsibly kids",
  ],
  free: true,
  lessons: [
    {
      slug: "what-is-ai",
      title: "What Is AI? 🤖",
      blurb: "A computer helper that learns patterns from lots of examples.",
      xp: 20,
      kind: "quiz",
      content: `# What Is AI? 🤖

**AI** stands for **Artificial Intelligence**. It's a kind of computer program
that has looked at a *huge* number of examples and learned the **patterns** in
them. That's how it can do things like answer questions, draw pictures, or help
finish a sentence.

Here's the important part: AI doesn't "know" things the way you do, and it isn't
alive or thinking like a person. It's really good at guessing what usually comes
next, based on all the examples it saw.

Think of it like a very fast pattern-guesser. That makes it helpful — but also
means it can guess **wrong**, which is what the next lesson is all about!

**Things to remember:**
- **AI** = a program that learned patterns from lots of examples
- It **guesses** what comes next — it doesn't truly "know" or think
- It can be helpful, but it's **not alive** and **not always right**`,
      questions: [
        {
          prompt: "What does AI mainly do?",
          options: [
            "It learned patterns from lots of examples and uses them to guess answers",
            "It magically knows everything perfectly",
            "It is a living robot brain",
          ],
          answer: 0,
          explanation:
            "AI learns patterns from many examples and guesses based on them. It isn't alive and doesn't truly 'know' things.",
        },
        {
          prompt: "A good way to picture AI is as:",
          options: ["A super-fast pattern guesser", "A real human friend", "A wizard with magic powers"],
          answer: 0,
          explanation:
            "AI predicts what usually comes next from patterns it learned — a fast guesser, not a person or magic.",
        },
        {
          prompt: "Is AI alive or thinking like a person?",
          options: ["Yes, exactly like a person", "No — it's a program that guesses from patterns", "Yes, it has feelings"],
          answer: 1,
          explanation:
            "AI is a computer program. It isn't alive and doesn't have thoughts or feelings like a person.",
        },
      ],
    },
    {
      slug: "ai-can-be-wrong",
      title: "AI Can Be Wrong 🤔",
      blurb: "It sounds sure of itself — but it still makes mistakes.",
      xp: 25,
      kind: "quiz",
      content: `# AI Can Be Wrong 🤔

Because AI is *guessing* what comes next, it sometimes gives answers that **sound
confident but are actually wrong**. It might make up a fact, get its math mixed
up, or invent something that isn't true at all.

The tricky part is that it says wrong answers in the same sure voice as right
ones — so you can't tell just by how confident it sounds.

That's why the smart habit is to **double-check important things**: ask a grown-up,
look in a book, or check a website you trust. AI is great for ideas, help, and
fun — but for things that really matter (like homework facts or anything about
your health or safety), always check.

**Things to remember:**
- AI **guesses**, so it can be **wrong** even when it sounds sure
- You **can't tell** it's wrong just from its confident voice
- **Double-check** important facts with a grown-up or a trusted source`,
      questions: [
        {
          prompt: "If an AI gives you an answer for your homework, you should:",
          options: [
            "Always trust it because it sounds smart",
            "Double-check important facts with a grown-up, a book, or a trusted website",
            "Never use AI for anything",
          ],
          answer: 1,
          explanation:
            "AI can sound confident but be wrong. For things that matter, verify with a trusted source or adult.",
        },
        {
          prompt: "Why is it tricky when AI is wrong?",
          options: [
            "It says wrong answers in the same confident voice as right ones",
            "It always warns you first",
            "It turns red",
          ],
          answer: 0,
          explanation:
            "AI sounds equally sure whether right or wrong, so confidence isn't proof. That's why we check.",
        },
        {
          prompt: "AI is a great helper for:",
          options: [
            "Ideas, help, and fun — as long as you check the important stuff",
            "Deciding everything in your life with no checking",
            "Nothing at all",
          ],
          answer: 0,
          explanation:
            "AI is wonderful for brainstorming and help; just verify the things that really matter.",
        },
      ],
    },
    {
      slug: "keep-private-things-private",
      title: "Keep Private Things Private 🔒",
      blurb: "Some information is just for you and your family.",
      xp: 25,
      kind: "quiz",
      content: `# Keep Private Things Private 🔒

When you type to an AI, your words may be **sent to a company's computers**. So
just like talking to a stranger, you should **never share private information**.

Private things include:
- Your **full name, address, or school**
- Your **phone number** or your family's
- **Passwords** (those are never shared with anyone or anything!)
- Photos of yourself or where you live

If an AI (or anyone online) asks for private details, that's a sign to **stop and
tell a trusted grown-up**. A safe rule: if you wouldn't shout it out to strangers
in a park, don't type it to an AI.

**Things to remember:**
- Your words to an AI may go to a **company's computers**
- **Never share** your name, address, school, phone number, or passwords
- If something asks for private info, **stop and tell a grown-up**`,
      questions: [
        {
          prompt: "Which of these should you NOT type to an AI chatbot?",
          options: [
            "A made-up story about a dragon",
            "Your home address and school name",
            "A math question",
          ],
          answer: 1,
          explanation:
            "Private details like your address and school should stay private. Stories and math questions are fine.",
        },
        {
          prompt: "A good rule for sharing online is:",
          options: [
            "Share anything, it's all private anyway",
            "If you wouldn't shout it to strangers in a park, don't type it to an AI",
            "Only share your password with chatbots",
          ],
          answer: 1,
          explanation:
            "The 'park rule' is a great test: keep private things private, and never share passwords with anyone or anything.",
        },
        {
          prompt: "If a chatbot or website asks for your private information, you should:",
          options: ["Give it right away", "Stop and tell a trusted grown-up", "Make up a story and keep chatting"],
          answer: 1,
          explanation:
            "Being asked for private info is a signal to pause and check with a trusted adult.",
        },
      ],
    },
    {
      slug: "its-not-your-friend",
      title: "It's a Tool, Not a Friend 💬",
      blurb: "AI can be friendly, but it doesn't really know or care about you.",
      xp: 25,
      kind: "quiz",
      content: `# It's a Tool, Not a Friend 💬

AI chatbots can be **friendly and fun** to talk to. But remember from Lesson 1:
AI isn't alive. It doesn't have real feelings, it doesn't truly *know* you, and it
can't keep you safe the way a real person can.

So it's a wonderful **tool** — like a calculator or a really clever notebook — but
it's not a replacement for real friends, family, or grown-ups you trust. If you're
ever feeling sad, scared, or unsure about something, the best thing is to talk to
a **real person** who cares about you, not a chatbot.

Enjoy AI for help and creativity, and keep your real-life people close for the
things that matter most.

**Things to remember:**
- AI can *seem* friendly, but it has **no real feelings** and doesn't truly know you
- It's a helpful **tool**, not a replacement for real friends and family
- For big feelings or worries, talk to a **trusted real person**`,
      questions: [
        {
          prompt: "Even when a chatbot is friendly, the truth is:",
          options: [
            "It's a tool — it doesn't have real feelings or truly know you",
            "It's secretly a real person",
            "It loves you like family",
          ],
          answer: 0,
          explanation:
            "Chatbots can be pleasant, but they're tools without real feelings or genuine knowledge of you.",
        },
        {
          prompt: "If you feel sad, scared, or worried, the best choice is to:",
          options: [
            "Only tell the chatbot",
            "Talk to a trusted real person like a parent, teacher, or caregiver",
            "Keep it to yourself",
          ],
          answer: 1,
          explanation:
            "Real, caring people can truly help and keep you safe. A chatbot can't replace them for the things that matter.",
        },
        {
          prompt: "AI is best thought of as:",
          options: ["A helpful tool, like a clever notebook or calculator", "Your closest friend", "A grown-up in charge of you"],
          answer: 0,
          explanation:
            "AI is a tool that helps with ideas and tasks — useful, but not a friend or a caregiver.",
        },
      ],
    },
    {
      slug: "be-kind-and-ask",
      title: "Be Kind & Ask a Grown-Up 💛",
      blurb: "Use AI to create good things, and check in when you're unsure.",
      xp: 30,
      kind: "quiz",
      content: `# Be Kind & Ask a Grown-Up 💛

Two last ideas to be a safe, smart AI user.

First, **be kind**. Don't use AI to make mean messages, to copy someone's whole
project and call it yours, or to make pictures that could hurt or embarrass
someone. The same kindness rules from real life count online too.

Second, **ask a grown-up when you're unsure**. If an AI says something confusing,
scary, or that just feels *off* — or if you're not sure whether you're allowed to
use it for something (like schoolwork) — checking with a trusted adult is always
the right move. Good coders ask questions; it's a sign of being smart, not silly.

**Things to remember:**
- **Be kind** with AI — no mean messages, copying, or hurtful pictures
- Follow your **school's rules** about using AI for schoolwork
- When something feels confusing or wrong, **ask a trusted grown-up**`,
      questions: [
        {
          prompt: "A kind way to use AI is to:",
          options: [
            "Make mean messages about a classmate",
            "Create helpful, fun, and positive things — never hurtful ones",
            "Copy someone's whole project and say it's yours",
          ],
          answer: 1,
          explanation:
            "Kindness online matters just like in real life. Use AI to make good things, not to hurt or copy others.",
        },
        {
          prompt: "If an AI says something scary, confusing, or that feels wrong, you should:",
          options: ["Keep it secret", "Tell a trusted grown-up", "Believe it no matter what"],
          answer: 1,
          explanation:
            "When something feels off, checking with a trusted adult is always the safe and smart choice.",
        },
        {
          prompt: "Before using AI to help with schoolwork, the right thing is to:",
          options: [
            "Use it however you want, rules don't matter",
            "Follow your teacher's or school's rules about AI",
            "Hide that you used it",
          ],
          answer: 1,
          explanation:
            "Schools have rules about AI help. Following them (and being honest) keeps you on the right track.",
        },
      ],
    },
  ],
};
