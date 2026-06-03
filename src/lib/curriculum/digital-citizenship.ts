import type { Module } from "./types";

// Digital Citizenship — a quiz-based course on being a good, safe person online:
// kindness, thinking before posting, protecting privacy, spotting what's real,
// and respecting others' work. Friendly tone for kids and teens.
export const digitalCitizenship: Module = {
  slug: "digital-citizenship",
  title: "Digital Citizenship 🌟",
  emoji: "🌟",
  gradient: "from-teal-400/20 to-emerald-500/10",
  description:
    "Be awesome online! 🌟 Learn to treat people kindly, protect your privacy, think before you post, tell real from fake, and respect other people's work.",
  tagline:
    "A course on digital citizenship for kids and teens: kindness online, privacy, thinking before posting, spotting misinformation, and respecting others' work.",
  keywords: [
    "digital citizenship",
    "online safety for kids",
    "cyberbullying prevention",
    "think before you post",
    "internet manners",
  ],
  free: true,
  lessons: [
    {
      slug: "be-kind-online",
      title: "Be Kind Online 💬",
      blurb: "There's a real person on the other side of every screen.",
      xp: 25,
      kind: "quiz",
      content: `# Be Kind Online 💬

Behind every username and screen is a **real person** with real feelings. Being a
good digital citizen starts with one simple idea: **be as kind online as you'd be
in person.**

Sometimes people are meaner online than they'd ever be face-to-face, because they
can't see the other person's reaction. That doesn't make it okay. Mean messages,
leaving people out on purpose, or piling on someone is called **cyberbullying**,
and it really hurts.

If you see someone being bullied online, you can help by **not joining in**, being
kind to the person, and **telling a trusted adult**. And if it happens to you,
that's never your fault — save the message and tell a grown-up you trust.

**Things to remember:**
- There's a **real person** behind every screen — be kind to them
- Mean messages and leaving people out on purpose is **cyberbullying**
- If you see or feel bullying, **don't join in** and **tell a trusted adult**`,
      questions: [
        {
          prompt: "The golden rule of being online is:",
          options: [
            "Say whatever you want, no one's real",
            "Be as kind online as you would be in person",
            "Only be nice if someone is watching",
          ],
          answer: 1,
          explanation:
            "Real people are on the other side of the screen. Online kindness should match in-person kindness.",
        },
        {
          prompt: "Sending mean messages or purposely leaving someone out online is called:",
          options: ["Cyberbullying", "Multitasking", "Downloading"],
          answer: 0,
          explanation:
            "Cyberbullying is using online tools to hurt or exclude someone — and it genuinely hurts people.",
        },
        {
          prompt: "If you see someone being bullied online, a good response is to:",
          options: [
            "Join in so you're not next",
            "Don't pile on, be kind to the person, and tell a trusted adult",
            "Ignore it forever and tell no one",
          ],
          answer: 1,
          explanation:
            "Refusing to join in, supporting the person, and telling a trusted adult are the helpful, brave choices.",
        },
      ],
    },
    {
      slug: "think-before-you-post",
      title: "Think Before You Post 🤔",
      blurb: "Once it's online, it can be very hard to take back.",
      xp: 25,
      kind: "quiz",
      content: `# Think Before You Post 🤔

The internet has a long memory. Something you post — a message, a photo, a comment
— can be **copied, shared, and saved** by others, even if you delete your copy
later. This is sometimes called your **digital footprint**: the trail you leave
online.

So before you post, it's smart to pause and ask:
- Would I be okay with a **grown-up I respect** seeing this?
- Could this **hurt or embarrass** me or someone else?
- Am I sharing **private information** I should keep to myself?

If you're unsure, it's okay to **not** post, or to ask a trusted adult first.
There's never any rush — a post can always wait until you're sure.

**Things to remember:**
- Posts can be **copied and saved**, even after you delete them
- Your online trail is your **digital footprint**
- **Pause and think** before posting; when unsure, don't (or ask first)`,
      questions: [
        {
          prompt: "Why should you think carefully before posting something online?",
          options: [
            "It can be copied and saved by others, even if you delete it later",
            "Posting is against the rules everywhere",
            "The internet deletes everything after one minute",
          ],
          answer: 0,
          explanation:
            "Once something is shared, others can copy and keep it. Deleting your copy doesn't always erase it.",
        },
        {
          prompt: "Your 'digital footprint' is:",
          options: ["A shoe you wear online", "The trail of things you leave online over time", "A type of password"],
          answer: 1,
          explanation:
            "Your digital footprint is the lasting trail of posts, photos, and comments you leave behind online.",
        },
        {
          prompt: "A good question to ask yourself before posting is:",
          options: [
            "How many likes will this get no matter what?",
            "Would I be okay with a grown-up I respect seeing this, and could it hurt anyone?",
            "How fast can I post it?",
          ],
          answer: 1,
          explanation:
            "Checking whether you'd be comfortable with a respected adult seeing it — and whether it could hurt someone — is a great filter.",
        },
      ],
    },
    {
      slug: "protect-your-privacy",
      title: "Protect Your Privacy 🔒",
      blurb: "Strong passwords and careful sharing keep you safe.",
      xp: 25,
      kind: "quiz",
      content: `# Protect Your Privacy 🔒

Being a good digital citizen means protecting **your own** information too. Two
big habits help a lot.

First, **strong passwords**. A good password is **long** and hard to guess — not
your name, birthday, or "123456". And you **never share your password** with
friends or anyone who asks. (A grown-up who helps set up your accounts is the one
exception families sometimes make.)

Second, **careful sharing**. Keep private things — your full name, address,
school, and phone number — off public posts and away from strangers. Check your
app settings with a grown-up so only people you know can see what you share.

**Things to remember:**
- Use **long, hard-to-guess passwords** — never your name or "123456"
- **Don't share passwords** with friends or strangers
- Keep **private details** (address, school, phone) off public posts`,
      questions: [
        {
          prompt: "Which is the strongest, safest password?",
          options: ["123456", "Your first name", "A long phrase that's hard to guess and used only by you"],
          answer: 2,
          explanation:
            "Long, hard-to-guess passwords are far safer than your name, birthday, or simple number sequences.",
        },
        {
          prompt: "Who should you share your password with?",
          options: [
            "Your best friend",
            "Anyone who asks nicely",
            "Basically no one — keep it secret (a parent helping set up accounts is a family exception)",
          ],
          answer: 2,
          explanation:
            "Passwords stay secret. The only common exception is a parent/caregiver helping manage your accounts.",
        },
        {
          prompt: "Which detail is safest to keep OFF your public posts?",
          options: ["Your favorite color", "Your home address and school", "A drawing you made"],
          answer: 1,
          explanation:
            "Private details like your address and school should stay off public posts and away from strangers.",
        },
      ],
    },
    {
      slug: "spot-whats-real",
      title: "Spot What's Real 🔍",
      blurb: "Not everything online is true — learn to check.",
      xp: 30,
      kind: "quiz",
      content: `# Spot What's Real 🔍

Anyone can post anything online, which means **not everything you read or see is
true**. Some things are mistakes, some are jokes, and some are made up on purpose
to trick people. False information that spreads online is called
**misinformation**.

You can be a smart detective:
- **Check more than one source.** If it's true, trustworthy sites will say so too.
- **Look at who posted it.** Is it a known, reliable place, or a random account?
- **Be extra careful with shocking or "too amazing" claims** — those are designed
  to make you share before you think.
- **Pictures and videos can be faked or edited**, including by AI.

When something feels unbelievable, slow down and check before you believe it or
share it.

**Things to remember:**
- Anyone can post anything — **not all of it is true** (that's misinformation)
- **Check more than one trustworthy source** before believing or sharing
- **Shocking claims and "perfect" photos/videos** deserve extra doubt`,
      questions: [
        {
          prompt: "False information spread online is called:",
          options: ["Misinformation", "Multiplication", "A megabyte"],
          answer: 0,
          explanation:
            "Misinformation is false or misleading information that spreads online, whether by mistake or on purpose.",
        },
        {
          prompt: "A smart way to check if something online is true is to:",
          options: [
            "Believe it if it has lots of likes",
            "Check more than one trustworthy source and look at who posted it",
            "Share it fast before anyone else",
          ],
          answer: 1,
          explanation:
            "Cross-checking trustworthy sources and considering who posted it helps you tell real from fake.",
        },
        {
          prompt: "A photo or video that looks amazing or shocking:",
          options: [
            "Must be real because you can see it",
            "Could be edited or AI-made — it deserves extra checking",
            "Should always be shared right away",
          ],
          answer: 1,
          explanation:
            "Images and videos can be edited or generated by AI. Shocking content especially deserves a careful second look.",
        },
      ],
    },
    {
      slug: "respect-others-work",
      title: "Respect Others' Work ✍️",
      blurb: "Give credit, and don't copy someone's work as your own.",
      xp: 30,
      kind: "quiz",
      content: `# Respect Others' Work ✍️

People make things online — art, writing, music, videos, code — and that work
belongs to them. Being a good digital citizen means **respecting it**.

A few fair-play rules:
- **Don't copy someone's work and call it yours.** Doing that is called
  **plagiarism**, and it's not fair to the person who made it.
- **Give credit.** If you use or share someone's picture, words, or idea, say who
  made it.
- **Ask or check the rules.** Some things are free to use and share; others need
  permission. When in doubt, ask a grown-up or look for the creator's rules.

This goes for AI too: if AI helps you make something, be honest about it when the
rules ask you to be.

**Things to remember:**
- Copying someone's work and claiming it as yours is **plagiarism**
- **Give credit** to the person who made something you use or share
- When unsure if you can use something, **ask or check the creator's rules**`,
      questions: [
        {
          prompt: "Copying someone's writing or art and saying you made it is called:",
          options: ["Plagiarism", "Recycling", "Streaming"],
          answer: 0,
          explanation:
            "Plagiarism is passing off someone else's work as your own — unfair to the real creator.",
        },
        {
          prompt: "If you share a picture or idea that someone else made, you should:",
          options: ["Pretend you made it", "Give credit to the person who made it", "Change one tiny thing and call it yours"],
          answer: 1,
          explanation:
            "Crediting the creator respects their work. Tiny changes don't make someone else's work your own.",
        },
        {
          prompt: "When you're not sure if you're allowed to use something online, the best move is to:",
          options: [
            "Use it anyway and hope it's fine",
            "Ask a grown-up or check the creator's rules first",
            "Delete the internet",
          ],
          answer: 1,
          explanation:
            "Checking the rules or asking a trusted adult keeps you fair and on the right side of using others' work.",
        },
      ],
    },
  ],
};
