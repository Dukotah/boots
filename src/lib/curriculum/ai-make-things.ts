import type { Module } from "./types";

// Make Things with AI — the flagship "use AI to create" module of the
// "AI for Everyone" track.
//
// Modeled on `ai-foundations.ts` (the gold-standard reference): a mix of `quiz`
// lessons (reading + comprehension/decision checks) and project-HEAVY `project`
// lessons where the learner actually makes something in a real tool — images,
// a one-page site, a custom assistant, a brand kit, a content series — and
// ships one of them for real. There is no code editor here: the learner uses
// AI tools, they don't program with APIs. Grading is 100% client-side. Not
// free — this is paid, premium content that sits above the foundations funnel.
export const aiMakeThings: Module = {
  slug: "ai-make-things",
  title: "Make Things with AI",
  description:
    "Turn ideas into real things — images, a live one-page website, your own custom AI assistant, a personal brand kit, and a week of content — using free AI tools and plain English. No coding required. By the end you'll have published something real.",
  emoji: "🎨",
  gradient: "from-fuchsia-500/20 to-pink-500/10",
  tagline:
    "Use AI tools like ChatGPT, Gemini, v0, and Claude to create images, websites, brands, and content — and actually ship something, with zero code.",
  keywords: [
    "make things with ai",
    "ai image generation for beginners",
    "build a website with ai no code",
    "how to make a custom gpt",
    "ai for creators",
    "create with ai no coding",
  ],
  lessons: [
    // ── 1 ── concept (quiz): the maker's mindset
    {
      slug: "the-makers-mindset",
      title: "The Maker's Mindset",
      blurb: "What AI can actually create — and how to describe what you want.",
      xp: 25,
      kind: "quiz",
      content: `# The Maker's Mindset

In the last course you learned to *talk* to AI. Now you're going to *make things*
with it. The shift is small but huge: you stop asking AI for answers and start
asking it to **produce** — pictures, web pages, a logo, a brand, a week of posts.

Here's the part most people miss: modern AI tools don't just write text anymore.
Depending on the tool, you can generate:

- **Text** — emails, stories, plans, scripts, captions. (Every chatbot.)
- **Images** — art, logos, mockups, photos that never existed. (ChatGPT/DALL·E, Google Gemini, free tools like Bing Image Creator or Leonardo.ai.)
- **Websites** — a real, working page from a description. (v0.dev, Claude artifacts, ChatGPT canvas.)
- **Audio & voice** — narration, music, sound. (ElevenLabs, Suno.)

You don't need any of them installed today. You need one idea — *"the thing I
wish existed"* — and the willingness to describe it clearly.

## Describing what you want is the whole skill
Making things with AI is mostly **good description plus iteration**. A vague ask
gives you a generic result; a specific ask gives you *your* result. The same four
ingredients from AI Foundations still apply, but for making things, three matter
most:

1. **Subject** — what is it? *"A logo for a coffee cart called Tidewater."*
2. **Style & mood** — how should it feel? *"Minimal, hand-drawn, navy and cream, calm."*
3. **Constraints** — the must-haves. *"No text in the image, square, lots of whitespace."*

> ❌ "make me a logo"

> ✅ "A minimal hand-drawn logo for a beach-town coffee cart called *Tidewater*.
> Navy and cream, a single small wave motif, lots of whitespace, no text, square."

Then you **iterate**: look at what came back, change one thing, run it again. The
first result is never the goal — it's the start of a conversation. That mindset —
*describe, look, adjust, repeat* — is what the rest of this module is built on.`,
      questions: [
        {
          prompt:
            "Which of these can a modern AI tool actually generate for you?",
          options: [
            "Only plain text answers, nothing else",
            "Text, images, working web pages, and even audio — depending on the tool",
            "Only images, and only if you can draw",
            "Nothing you can keep — everything disappears after you close the tab",
          ],
          answer: 1,
          explanation:
            "Different tools specialize, but across them you can generate text, images, working websites, and audio. The trick is picking the right tool for the thing you want to make.",
        },
        {
          prompt:
            "You ask an image tool to 'make me a logo' and hate the result. What's the most useful next move?",
          options: [
            "Give up — AI can't do logos",
            "Run the exact same prompt again and hope for better luck",
            "Add specifics (subject, style, mood, constraints) and iterate — change one thing and run it again",
            "Switch to a completely different topic",
          ],
          answer: 2,
          explanation:
            "Making things with AI is describe → look → adjust → repeat. A vague prompt gives a generic result; adding specifics and iterating steers it toward what you actually pictured.",
        },
        {
          prompt:
            "For making things (not just chatting), which three ingredients matter most in a prompt?",
          options: [
            "Spelling, grammar, and punctuation",
            "Subject, style/mood, and constraints",
            "Your name, the date, and the weather",
            "Length, font, and file size",
          ],
          answer: 1,
          explanation:
            "Subject (what it is), style/mood (how it should feel), and constraints (the must-haves) are what turn a generic output into *your* output.",
        },
      ],
    },

    // ── 2 ── PROJECT: image prompting
    {
      slug: "generate-the-image-you-imagined",
      title: "Generate the Image You Imagined",
      blurb: "Turn a picture in your head into a real image — and iterate on it.",
      xp: 40,
      kind: "project",
      content: `# Generate the Image You Imagined

Everyone has an image in their head they wish they could conjure — a poster for a
party, art for a wall, a header for a newsletter, a character from a story. Today
you're going to pull one out of your imagination and onto the screen.

You'll use a **free image generator**. Any of these work:

- **ChatGPT** (free tier) — just ask it to "make an image of…".
- **Google Gemini** ([gemini.google.com](https://gemini.google.com)) — free image generation built in.
- **Bing Image Creator** ([bing.com/create](https://www.bing.com/create)) — free, powered by DALL·E.

The whole game is **describe → look → adjust → repeat**. Your first image won't be
perfect. That's not failure — that's step one.`,
      steps: [
        {
          instruction:
            "**Open a free image generator** — ChatGPT, [Gemini](https://gemini.google.com), or [Bing Image Creator](https://www.bing.com/create) — and sign in.",
          tool: "ChatGPT / Gemini / Bing Image Creator",
          hint: "All three are free. Bing Image Creator needs only a Microsoft account.",
        },
        {
          instruction:
            "**Write a rich first prompt** using the three ingredients: *subject*, *style & mood*, and *constraints*. Be specific — name colors, a setting, a feeling, and an art style (photo, watercolor, 3D render, flat illustration…).",
          hint: "Try: 'A cozy watercolor of a tiny bookshop on a rainy street at dusk, warm glowing windows, muted blues and ambers, soft and nostalgic, no text.'",
        },
        {
          instruction:
            "**Generate it and really look.** What's right? What's off? Pick exactly ONE thing to change — the color, the angle, the mood, the style — don't change everything at once.",
          hint: "Changing one variable at a time teaches you what each word does.",
        },
        {
          instruction:
            "**Iterate at least twice.** Re-run with your one change. Then again. Watch the image move toward the picture in your head. Save the version you like best.",
          hint: "Phrases like 'same as before but…' or 'make it more minimal / warmer / wider' work great.",
        },
      ],
      checkpoint: {
        prompt:
          "**Paste the final image prompt you landed on** — the one that produced your favorite version. (We can't see your image, so the checklist grades your *prompt* for specificity: a strong subject, a style or mood, and a constraint.)",
        placeholder:
          "A cozy watercolor of a tiny bookshop on a rainy street at dusk, warm glowing windows, muted blues and ambers, soft and nostalgic, no text…",
        rubric: [
          {
            label: "A specific, detailed prompt (at least 12 words)",
            test: "minWords",
            value: "12",
          },
          {
            label:
              "Names a style or medium (photo, watercolor, illustration, 3D, sketch, minimal, cinematic…)",
            test: "includesAny",
            value:
              "photo, photograph, watercolor, illustration, illustrated, 3d, render, sketch, drawing, painting, minimal, flat, cinematic, pixel, cartoon, realistic, vector",
          },
          {
            label:
              "Sets a mood, color, or constraint (a feeling, a color, lighting, 'no text', a shape…)",
            test: "includesAny",
            value:
              "cozy, warm, calm, moody, bright, dark, soft, vibrant, muted, pastel, blue, red, green, navy, glowing, lighting, no text, square, wide, whitespace, dusk, night",
          },
        ],
      },
    },

    // ── 3 ── PROJECT: one-page website with no code
    {
      slug: "build-a-one-page-site",
      title: "Build a One-Page Website (No Code)",
      blurb: "Describe a page and get a real, working website back — no code.",
      xp: 45,
      kind: "project",
      content: `# Build a One-Page Website (No Code)

This is the lesson that makes people gasp. You're going to describe a website in
plain English and get a **real, working page** — buttons, sections, styling, the
lot — without writing a single line of code.

Pick something real you'd actually want a page for: a personal landing page, a
page for your side project, an event invite, a portfolio, a "link in bio" page.

Use a free AI site builder:

- **v0.dev** (by Vercel) — [v0.dev](https://v0.dev). Describe a page, get a live preview you can keep refining. Free to start.
- **Claude artifacts** — [claude.ai](https://claude.ai). Ask Claude to "build a one-page website for…" and it renders a live page beside the chat.
- **ChatGPT canvas** — describe a page and it builds an editable, previewable version.

You'll *describe* the site, *preview* it, and *refine it by talking* — exactly the
describe-look-adjust loop, now for whole web pages.`,
      steps: [
        {
          instruction:
            "**Open a free AI site builder** — [v0.dev](https://v0.dev) or [claude.ai](https://claude.ai) — and sign in.",
          tool: "v0.dev / Claude",
          hint: "v0 is purpose-built for this; Claude artifacts work great too. Either is fine.",
        },
        {
          instruction:
            "**Describe your page in one rich paragraph.** Say *what it's for*, *the sections* it needs (hero, about, a button/call-to-action, contact), and the *vibe* (modern, playful, dark, minimal). Name your colors if you have them.",
          hint: "Try: 'A clean, modern one-page site for a dog-walking service called Paws & Co. Hero with a headline and a Book Now button, a 3-feature section, friendly green-and-cream colors, rounded corners.'",
        },
        {
          instruction:
            "**Preview the live result.** It renders an actual page. Look at it like a visitor: is the headline clear? Does the button stand out? Is anything missing?",
          hint: "You're judging it as a real user, not a critic. What would confuse a first-time visitor?",
        },
        {
          instruction:
            "**Refine it by chatting.** Ask for changes in plain English — 'make the hero bigger', 'change the button to say Get Started', 'try a dark theme', 'add a testimonials section'. Iterate until you're proud of it.",
          hint: "You never touch code. You just describe the change and it rebuilds.",
        },
      ],
      checkpoint: {
        prompt:
          "**Paste the description you gave the builder** (your richest version — what the site is for, its sections, and its vibe). The checklist grades it for completeness.",
        placeholder:
          "A clean, modern one-page site for a dog-walking service called Paws & Co. Hero with a headline and a Book Now button, a 3-feature section, friendly green-and-cream colors…",
        rubric: [
          {
            label: "A complete, detailed brief (at least 25 words)",
            test: "minWords",
            value: "25",
          },
          {
            label:
              "Mentions at least one concrete section or element (hero, button, contact, footer, gallery, CTA, form…)",
            test: "includesAny",
            value:
              "hero, button, call to action, cta, contact, footer, header, section, gallery, form, testimonial, pricing, about, navbar, menu, link",
          },
          {
            label:
              "Describes a style or vibe (modern, minimal, playful, dark, clean, bold, a color…)",
            test: "includesAny",
            value:
              "modern, minimal, playful, dark, light, clean, bold, friendly, elegant, professional, fun, sleek, colorful, color, theme, vibe, rounded",
          },
        ],
      },
    },

    // ── 4 ── PROJECT: custom AI assistant
    {
      slug: "build-your-own-ai-assistant",
      title: "Build Your Own Custom AI Assistant",
      blurb: "Create a reusable AI helper tuned for a task you do all the time.",
      xp: 45,
      kind: "project",
      content: `# Build Your Own Custom AI Assistant

So far you've been re-explaining what you want every single time. Now you'll
**bottle it once** — build a custom assistant that already knows its job, so next
time you just hand it the task and go.

Every major platform lets you do this for free or cheap:

- **Custom GPT** — ChatGPT → "Explore GPTs" → "Create". Give it a name, instructions, and a personality.
- **Claude Project** — [claude.ai](https://claude.ai) → Projects. Add custom instructions and reference files it always sees.
- **Gemini Gem** — Gemini → "Gems" → "New Gem". Same idea, Google's flavor.

Pick a **recurring task** — something you (or a friend) do over and over:

> Reply to customer emails in a warm, on-brand tone · Turn rough notes into clean
> meeting summaries · Draft Instagram captions in your voice · Plan weekly meals
> from a list of ingredients · Explain legal jargon in plain English.

The magic is the **instructions**: you're writing the assistant's permanent job
description — its role, how it should behave, and the format it should always use.`,
      steps: [
        {
          instruction:
            "**Open the builder** — Custom GPT (ChatGPT), a Claude Project, or a Gemini Gem — and start a new one. Give it a clear name like *Caption Coach* or *Meeting Summarizer*.",
          tool: "Custom GPT / Claude Project / Gemini Gem",
          hint: "The name is just for you — pick something that says what it does.",
        },
        {
          instruction:
            "**Write its instructions** — the permanent brief. Cover: its *role* ('You are a…'), *how it behaves* (tone, rules, what to always/never do), and the *format* of its output. Be specific; this is the whole assistant.",
          hint: "Example: 'You are a friendly social media writer for a small bakery. Always write 3 caption options, each under 150 characters, warm and a little playful, with 2 relevant hashtags. Never use corporate jargon.'",
        },
        {
          instruction:
            "**Test it on a real task.** Hand it an actual input and see if it nails the job without you re-explaining anything.",
          hint: "If it drifts off-brief, that tells you exactly which instruction to tighten.",
        },
        {
          instruction:
            "**Refine the instructions and save.** Adjust anything that came out wrong, then save it. You now have a reusable assistant you can return to anytime.",
          hint: "Treat the instructions like a recipe you keep improving each time you use it.",
        },
      ],
      checkpoint: {
        prompt:
          "**Paste the instructions you wrote for your assistant** (its permanent brief). A strong brief gives it a clear *role*, rules for *how it behaves*, and an output *format*.",
        placeholder:
          "You are a friendly social media writer for a small bakery. Always write 3 caption options, each under 150 characters, warm and a little playful, with 2 relevant hashtags. Never use corporate jargon…",
        rubric: [
          {
            label: "A substantial set of instructions (at least 30 words)",
            test: "minWords",
            value: "30",
          },
          {
            label:
              'Gives the assistant a clear role (e.g. "you are…", "act as…", "your job is…")',
            test: "regex",
            value: "you('?re| are)|act as|your (job|role|task) is|as an? ",
          },
          {
            label:
              "Sets behavior or format rules (tone, 'always', 'never', a length, a structure…)",
            test: "includesAny",
            value:
              "tone, always, never, format, length, under, bullet, list, steps, options, friendly, professional, formal, casual, warm, concise, hashtags",
          },
        ],
      },
    },

    // ── 5 ── PROJECT: personal brand kit
    {
      slug: "design-a-personal-brand-kit",
      title: "Design a Personal Brand Kit",
      blurb: "Name, tagline, colors, and a logo concept — a whole brand in an hour.",
      xp: 40,
      kind: "project",
      content: `# Design a Personal Brand Kit

Got a project, a side hustle, a podcast, a newsletter, or just *you* as a creator?
A brand makes it feel real. Designers charge thousands for this. You're going to
sketch a credible **brand kit** in an afternoon, using AI as your creative
director.

A brand kit has four pieces, and AI can help with all of them:

1. **Name** — a short, memorable name (and a free .com to match, ideally).
2. **Tagline** — one line that says what you do and why it matters.
3. **Color palette** — 3–5 colors that set the mood.
4. **Logo concept** — a simple visual idea (you can generate a draft with an image tool).

Use a **chat tool** (ChatGPT, Claude, or Gemini) for the names, tagline, and
palette, and an **image tool** for the logo concept. This is brainstorming on
steroids — your job is to *choose and refine*, not to settle for the first idea.`,
      steps: [
        {
          instruction:
            "**Brainstorm names.** In a chat tool, describe your project and ask for *15 name ideas* in a specific style (modern, playful, one-word, made-up, etc.). Pick a favorite — or mix two.",
          tool: "ChatGPT / Claude / Gemini",
          hint: "Ask for variety: 'Give me 15 names — 5 modern one-word, 5 playful, 5 made-up — for a newsletter about urban gardening.'",
        },
        {
          instruction:
            "**Write the tagline.** Ask for *8 tagline options* under 8 words each, then pick or remix. A good tagline is clear first, clever second.",
          hint: "Follow up: 'Make option 3 warmer and shorter.' Iterate just like with images.",
        },
        {
          instruction:
            "**Build a color palette.** Ask for a palette of 4–5 colors that match your brand's mood, *with the hex codes*. Ask it to explain what each color signals.",
          hint: "Hex codes look like #1E3A5F. Having them means you can use the colors anywhere — site, slides, posts.",
        },
        {
          instruction:
            "**Generate a logo concept.** Move to an image tool and describe a simple logo using your name, mood, and palette. Keep it minimal — strong logos are simple. Iterate a couple of times.",
          tool: "ChatGPT / Gemini / Bing Image Creator",
          hint: "Try: 'A minimal logo mark for an urban-gardening newsletter called Sprout, single leaf motif, deep green and warm cream, flat, no text.'",
        },
      ],
      checkpoint: {
        prompt:
          "**Paste your brand kit so far** — your chosen *name*, your *tagline*, and your *color palette* (include the hex codes, which look like `#1E3A5F`). The checklist confirms you've got the core pieces.",
        placeholder:
          "Name: Sprout\nTagline: Grow more in less space.\nPalette: #2F5D3A deep green, #F4ECD8 warm cream, #E08D3C amber…",
        rubric: [
          {
            label: "A real, fleshed-out brand kit (at least 20 words)",
            test: "minWords",
            value: "20",
          },
          {
            label: "Includes at least one hex color code (like #1E3A5F)",
            test: "regex",
            value: "#[0-9a-f]{3}([0-9a-f]{3})?\\b",
          },
          {
            label:
              "Labels the core pieces (name, tagline, palette/colors)",
            test: "includesAny",
            value: "name, tagline, slogan, palette, color, colour",
          },
        ],
      },
    },

    // ── 6 ── PROJECT: content series
    {
      slug: "make-a-content-series",
      title: "Make a Content Series from One Idea",
      blurb: "Turn a single idea into a week of posts or a short newsletter.",
      xp: 40,
      kind: "project",
      content: `# Make a Content Series from One Idea

The hardest part of creating online isn't writing one post — it's writing the
*next* one, and the next. AI is brilliant here: feed it **one strong idea** and it
helps you spin a whole series, so you're never staring at a blank page.

Pick a format that fits you:

- **A week of social posts** — 5–7 short posts on one theme for Instagram, LinkedIn, X, or TikTok captions.
- **A short newsletter issue** — a headline, a 200-word body, and a sign-off.
- **A mini content calendar** — a topic per day with a hook for each.

Use any chat tool. The trick is to **plan first, then write** — ask AI to outline
the series before drafting any single piece, so the whole set hangs together
instead of feeling random.`,
      steps: [
        {
          instruction:
            "**Pick one core idea and audience.** Tell the AI your topic and who it's for (e.g. 'beginner houseplant tips for busy renters'). Ask it to suggest *5–7 angles* on that one idea.",
          tool: "ChatGPT / Claude / Gemini",
          hint: "Angles are different doors into the same room — one idea, many takes.",
        },
        {
          instruction:
            "**Turn the angles into a plan.** Ask for a simple series outline — one post per angle, each with a *hook* (the first line that grabs attention) and a one-line summary.",
          hint: "Ask: 'Lay this out as a 5-day plan: Day, hook, and what each post covers.'",
        },
        {
          instruction:
            "**Draft the full series in your voice.** Ask it to write all the posts, matching a tone you specify (friendly, punchy, expert-but-casual). Give it a sample of how you write if you can.",
          hint: "Paste two sentences you've actually written and say 'match this voice' — it helps a lot.",
        },
        {
          instruction:
            "**Edit and make it yours.** Read every piece, cut the fluff, fix anything that doesn't sound like you, and add a personal detail or two. AI drafts; *you* publish.",
          hint: "The 10% you change is what makes it feel human. Never ship a draft untouched.",
        },
      ],
      checkpoint: {
        prompt:
          "**Paste your series plan** — your core idea, your audience, and the list of posts/angles (with their hooks). This proves you turned one idea into a real, structured series.",
        placeholder:
          "Idea: houseplant care for busy renters.\nDay 1 — Hook: 'Killing every plant? It's not you, it's the light.' Covers picking plants by window direction…",
        rubric: [
          {
            label: "A real, developed plan (at least 30 words)",
            test: "minWords",
            value: "30",
          },
          {
            label:
              "Shows a series of multiple pieces (days, posts, parts, or a numbered/structured list)",
            test: "regex",
            value: "day ?\\d|post ?\\d|part ?\\d|\\b[1-7][\\).:]|issue ?\\d|week",
          },
          {
            label:
              "Names the audience or topic clearly (who it's for / what it's about)",
            test: "minLength",
            value: "60",
          },
        ],
      },
    },

    // ── 7 ── concept (quiz): owning what you make
    {
      slug: "owning-what-you-make",
      title: "Owning What You Make",
      blurb: "Usefulness, originality, fact-checking, and being honest it's AI-assisted.",
      xp: 30,
      kind: "quiz",
      content: `# Owning What You Make

AI just helped you make a pile of things. Before you put them into the world,
there's a short, important conversation about doing it *well* and *honestly*.

This isn't about rules for their own sake — it's about your reputation. People who
use AI thoughtfully build trust; people who paste raw AI output and pretend it's
all them eventually get caught out.

### 1. Usefulness over volume
AI makes it trivial to produce *more*. The win isn't more — it's **better**. One
post that genuinely helps someone beats ten generic ones nobody finishes reading.
Ask of everything you make: *does this actually help, move, or delight someone?*

### 2. Make it original — add yourself
AI gives you a strong, *average* starting point — because it's drawn from
everything. Your job is to make it **specifically yours**: your story, your
example, your opinion, your voice. The draft is the AI's; the soul is yours.

### 3. Check the facts
Everything from AI Foundations still applies. AI can state wrong dates, fake
statistics, and invented quotes with total confidence. If you're publishing a
claim, a number, or a citation, **verify it** before your name is attached to it.

### 4. Be honest it's AI-assisted
You don't need a disclaimer on every caption. But **don't actively deceive** — don't
present an AI image as a real photo of a real event, don't claim AI writing is
fully your own hard-won expertise, and follow the disclosure rules of any platform
or client you work with. Honesty is cheap insurance for your credibility.

> The goal isn't to hide that you used AI. It's to use it so well, and add so much
> of yourself, that the result is unmistakably *good* — and unmistakably *yours*.`,
      questions: [
        {
          prompt:
            "AI lets you publish ten times as much content. What actually builds your reputation?",
          options: [
            "Posting as much as possible — volume always wins",
            "Making fewer things that are genuinely useful and clearly yours",
            "Posting raw AI output untouched to save time",
            "Never telling anyone you used AI under any circumstances",
          ],
          answer: 1,
          explanation:
            "More isn't the win — better is. Useful, original work that you've shaped builds trust; a flood of generic AI output erodes it.",
        },
        {
          prompt:
            "You used AI to draft a newsletter that includes a striking statistic. Before you send it, you should…",
          options: [
            "Send it immediately — the AI sounded confident",
            "Verify the statistic from a reliable source, since your name is attached to it",
            "Delete the statistic out of fear and never use numbers",
            "Ask the AI 'are you sure?' and trust whatever it says next",
          ],
          answer: 1,
          explanation:
            "AI can fabricate confident, wrong facts. Anything you publish under your name — especially numbers, dates, and quotes — should be verified first.",
        },
        {
          prompt:
            "Which approach to AI honesty is the healthiest?",
          options: [
            "Present AI-generated images as real photos of real events to seem impressive",
            "Claim AI-written work is entirely your own deep expertise",
            "Don't actively deceive, follow any platform/client disclosure rules, and add enough of yourself that the work is genuinely yours",
            "Refuse to use AI at all so you never have to think about it",
          ],
          answer: 2,
          explanation:
            "You don't need a disclaimer on everything, but you shouldn't deceive. Be honest, follow the rules that apply, and make the work genuinely yours.",
        },
      ],
    },

    // ── 8 ── PROJECT: ship something tiny & real (capstone)
    {
      slug: "ship-something-tiny-and-real",
      title: "Ship Something Tiny & Real",
      blurb: "Take one thing you made and actually publish it where someone can see it.",
      xp: 50,
      kind: "project",
      content: `# Ship Something Tiny & Real

You've made images, a website, an assistant, a brand, a content series. Here's the
lesson that separates dabblers from makers: **you're going to put one of them into
the world** where a real person can see it.

Not perfect. Not big. **Real.** Shipping a tiny, imperfect thing teaches you more
than perfecting a thing you never share — and the rush of "I made that and it's
*live*" is the whole reason people fall in love with creating.

Pick **one** creation from this module and ship it:

- **The website** — publish it (v0 and Claude let you share a live link) and send it to one friend.
- **An image** — post it, set it as a banner, or print it.
- **The brand** — claim the name (a free social handle), or put the logo on a profile.
- **The content series** — *actually post the first piece.* Today.
- **The assistant** — share your Custom GPT/Gem link with someone who'd use it.

The bar is deliberately low: one creation, one place, one real viewer. Done beats
perfect. Let's ship.`,
      steps: [
        {
          instruction:
            "**Choose exactly one thing to ship** from this module, and decide *where* it goes (a post, a live link, a profile, a shared link, a printed copy).",
          hint: "Pick the one that's closest to done. Momentum beats ambition here.",
        },
        {
          instruction:
            "**Do one final polish pass.** Fix the one thing that's been bugging you, double-check any facts or names, and make sure it represents you well. Then *stop* polishing.",
          hint: "Set a 15-minute timer for this. The goal is shipped, not flawless.",
        },
        {
          instruction:
            "**Publish or share it for real.** Hit post. Send the link. Claim the handle. Make it exist somewhere a real human can encounter it.",
          hint: "If your brain says 'just one more tweak', that's the signal to ship instead.",
        },
        {
          instruction:
            "**Tell one person.** Send it to a friend, post it, or share the link — and notice how it feels to have made something real with AI and put your name on it.",
          hint: "Saying 'I made this' out loud to someone makes it count.",
        },
      ],
      checkpoint: {
        prompt:
          "**Write your ship note (2–4 sentences):** What did you make, *where did you publish or share it*, and how does it feel? If it's live, paste the link too. This is your finish line — say what you shipped and where it now lives.",
        placeholder:
          "I built a one-page site for my dog-walking idea with v0 and published it — here's the link… I shared it with my sister. It feels real now…",
        rubric: [
          {
            label: "A real reflection on what you shipped (at least 25 words)",
            test: "minWords",
            value: "25",
          },
          {
            label:
              "Says WHERE it went live or was shared (posted, published, link, sent, profile, handle…)",
            test: "includesAny",
            value:
              "publish, published, posted, post, shared, share, link, sent, live, profile, handle, printed, uploaded, instagram, linkedin, tiktok, http",
          },
          {
            label:
              "Names what you made (website, image, brand, post, assistant, logo, newsletter…)",
            test: "includesAny",
            value:
              "website, site, page, image, logo, brand, post, series, newsletter, assistant, gpt, gem, palette, tagline, caption",
          },
        ],
      },
    },
  ],
};
