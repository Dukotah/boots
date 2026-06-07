import type { Module } from "./types";

// AI Conversations — the craft layer of the "AI for Everyone" track.
//
// Foundations teaches *what* an AI chatbot is; this module teaches *how* to get
// genuinely great results out of it. It's one level past the on-ramp: real
// prompting technique — context, examples, output control, iteration, working
// from a source, and reusable templates — taught in plain English with no code
// editor. Like Foundations it mixes `quiz` lessons (reading + comprehension
// checks) with `project` lessons (do real work in a real AI tool + a
// client-side rubric). Paid track: do NOT set `free` — the platform paywalls
// later lessons automatically.
export const aiConversations: Module = {
  slug: "ai-conversations",
  title: "Talking to AI: Everyday Prompting",
  description:
    "The craft of getting great answers from ChatGPT, Claude, and Gemini. Give context, show examples, control the output, and refine through follow-ups — practical prompting for everyday work, no coding required.",
  emoji: "💬",
  gradient: "from-violet-500/20 to-fuchsia-500/10",
  tagline:
    "Go from okay answers to great ones. Learn the everyday prompting moves the pros use — context, examples, output control, and iteration — in plain English.",
  keywords: [
    "how to prompt chatgpt",
    "prompt engineering for beginners",
    "better ai answers",
    "how to talk to ai",
    "few-shot examples",
    "ai prompting tips",
    "reusable ai prompts",
  ],
  lessons: [
    // ── 1 ── concept (quiz)
    {
      slug: "give-it-context",
      title: "Give It Context",
      blurb: "The AI only knows what you put in the message — so put it there.",
      xp: 22,
      kind: "quiz",
      content: `# Give It Context

The single biggest reason people get bland, generic answers from AI is also the
easiest to fix: **they don't tell it enough.**

An AI chatbot starts every conversation knowing nothing about you. It can't see
your job, your audience, your deadline, your last email, or what "good" looks
like to you. It only knows **the words in your message.** Whatever you leave out,
it fills in with a safe, average guess — and average is exactly what you don't
want.

> ❌ "Write a product description for my candle."

> ✅ "Write a product description for my hand-poured soy candle, scent: fig &
> sea salt. Audience: people buying a small luxury gift. Brand voice: warm,
> a little playful, not fancy. About 50 words."

Same task. The second one can't *not* be better, because you handed the AI the
exact details it was otherwise going to invent.

## What counts as context
- **Who it's for** — your audience and what they care about.
- **Your situation** — the backstory only you know.
- **Your goal** — what a *successful* answer actually does for you.
- **Constraints** — length, deadline, things to avoid, your brand or voice.

## A simple habit
Before you hit send, glance at your message and ask: *"Could this have been
written by a stranger about anyone?"* If yes, you've left out the context that
makes it yours. Add one or two specifics and try again.

You are not bothering the AI by over-explaining. The opposite is true: the more
relevant context you give, the less it has to guess.`,
      questions: [
        {
          prompt:
            "Why do vague requests tend to produce generic AI answers?",
          options: [
            "The AI is being lazy and needs to be told to try harder",
            "The AI fills in anything you leave out with a safe, average guess",
            "The AI can secretly see your files but chooses to ignore them",
            "Generic answers cost the company less money to produce",
          ],
          answer: 1,
          explanation:
            "The model only has the words in your message to work from. Missing details get replaced with the most average, plausible filler — which reads as generic.",
        },
        {
          prompt:
            "Which addition would most improve the request \"write me a cover letter\"?",
          options: [
            "Asking it to write the cover letter twice",
            "Telling it the specific job, company, and one or two things that make you a strong fit",
            "Saying \"please\" and \"thank you\"",
            "Requesting that it answer as fast as possible",
          ],
          answer: 1,
          explanation:
            "The job, the company, and your specific strengths are context only you can supply — and they're exactly what turns a template into a tailored letter.",
        },
        {
          prompt:
            "What's a quick test for whether you've given enough context?",
          options: [
            "The message is at least three paragraphs long",
            "It uses formal, professional language",
            "Ask: could a stranger have written this about anyone? If yes, add specifics",
            "It contains the word \"context\" somewhere",
          ],
          answer: 2,
          explanation:
            "If your request could apply to anyone, it's too generic. Adding the details unique to your situation is what steers the answer toward what you actually want.",
        },
      ],
    },

    // ── 2 ── concept (quiz)
    {
      slug: "show-dont-tell",
      title: "Show, Don't Just Tell",
      blurb: "One good example beats a paragraph of instructions.",
      xp: 25,
      kind: "quiz",
      content: `# Show, Don't Just Tell

You can describe what you want in words — *"make it punchy and friendly"* — and
the AI will take a stab at it. But there's a far more reliable trick:
**show it an example of the result you want.** Pros call this *few-shot
prompting*, but you don't need the jargon. You just need to paste a sample.

Imagine training a new hire. You could explain your email style for ten
minutes, or you could forward them two emails and say *"write the next one like
these."* The second is faster and lands better. AI is exactly the same.

> "Here are two product titles in my store's style:
>
> - *Sunday Morning Linen Shirt — soft, slow, yours*
> - *The 5pm Negroni Glass — for the good part of the day*
>
> Write 3 more titles in the same style for a wool throw blanket."

Notice what the examples did: they communicated tone, length, structure, and
that little "•— tagline" pattern **without you naming any of it.** That's the
power of showing.

## When examples are worth it
- **Matching a voice or style** — your brand, your tone, a person's way of writing.
- **Enforcing a format** — "format each entry exactly like this one."
- **Fuzzy tasks** — anything easier to demonstrate than to describe.

## How many?
Even **one** example helps a lot. **Two or three** is the sweet spot for nailing
a pattern. You rarely need more — and each one you add quietly teaches the AI
something a sentence of instructions couldn't.

Keep this in your back pocket: whenever you catch yourself struggling to
*describe* what you want, stop and ask whether you could just **show one.**`,
      questions: [
        {
          prompt:
            "In plain terms, what does \"show, don't just tell\" (few-shot prompting) mean?",
          options: [
            "Giving the AI one or more examples of the kind of output you want",
            "Telling the AI to show its work step by step",
            "Sending the same prompt several times in a row",
            "Asking the AI to draw a picture instead of writing text",
          ],
          answer: 0,
          explanation:
            "Few-shot prompting means including sample outputs in your request so the AI can copy the pattern, instead of relying on description alone.",
        },
        {
          prompt:
            "You want AI to write headlines in your newsletter's distinctive voice. What's the most reliable approach?",
          options: [
            "Describe your voice with lots of adjectives and hope it understands",
            "Paste two or three real headlines from past issues and ask for more in that style",
            "Tell it to be \"creative\" and let it decide",
            "Ask it to guess your voice from your topic",
          ],
          answer: 1,
          explanation:
            "Real examples carry tone, length, and structure that adjectives can't fully capture. A couple of samples teach the pattern far better than a description.",
        },
        {
          prompt:
            "Roughly how many examples do you usually need to lock in a pattern?",
          options: [
            "At least ten, or it won't work",
            "Exactly one, always",
            "One to three is plenty; more rarely helps much",
            "You should never use examples — just describe",
          ],
          answer: 2,
          explanation:
            "One example already helps a lot; two or three is the sweet spot. Beyond that you get diminishing returns for the effort.",
        },
      ],
    },

    // ── 3 ── PROJECT: have the AI interview you
    {
      slug: "let-ai-interview-you",
      title: "Let the AI Interview You",
      blurb: "Make it ask questions before answering — and watch quality jump.",
      xp: 40,
      kind: "project",
      content: `# Let the AI Interview You

Here's a move that feels backwards but works brilliantly: instead of dumping a
request and hoping you included everything, **ask the AI to interview you first.**

Left alone, AI answers immediately even when it's missing half the picture — and
it guesses to fill the gaps. But if you tell it to *ask you clarifying questions
before answering*, it surfaces exactly what it needs to know. You answer a few
quick questions, and the final result is built on real details instead of
assumptions.

This is the secret behind a lot of "wow, how did it write that so well" moments.
You're not writing a better prompt — you're letting the AI pull the context out
of you.

In this project you'll run a real task this way and feel the difference.`,
      steps: [
        {
          instruction:
            "**Pick a real task** with some complexity — a wedding toast, a tricky work email, a 3-day trip itinerary, a plan to ask for a raise. Something where the details matter.",
          hint: "Choose something you'd actually use the answer for. It makes the difference obvious.",
        },
        {
          instruction:
            "**Open a free AI chatbot** ([chatgpt.com](https://chatgpt.com), [claude.ai](https://claude.ai), or [gemini.google.com](https://gemini.google.com)) and paste this exact instruction, then your task: `Before you answer, ask me up to 5 clarifying questions, one batch, that would help you do this really well. Then wait for my answers.`",
          tool: "ChatGPT / Claude / Gemini",
          hint: "The phrase \"then wait for my answers\" stops it from answering its own questions and barreling ahead.",
        },
        {
          instruction:
            "**Answer its questions** honestly and specifically. Don't overthink it — even short answers give it far more to work with than it had before.",
          hint: "If a question doesn't apply, just say \"skip that one\" — you're in control.",
        },
        {
          instruction:
            "**Let it produce the final result**, then compare it (in your head) to what you'd have gotten from a one-line request. Notice how much of *your* situation made it into the answer.",
        },
      ],
      checkpoint: {
        prompt:
          "**Paste the instruction you used to make the AI interview you** (your version of the \"ask me clarifying questions first\" prompt, plus your task). The checklist updates live as it hits each mark.",
        placeholder:
          "Before you answer, ask me a few clarifying questions that would help you… then write…",
        rubric: [
          {
            label: "It's a real, fleshed-out request (at least 15 words)",
            test: "minWords",
            value: "15",
          },
          {
            label: "Explicitly asks the AI to ask YOU questions first",
            test: "includesAny",
            value: "ask me, ask you, clarifying question, questions before, question first, interview me, what do you need to know",
          },
          {
            label: "Tells it to hold off / wait before answering (so it doesn't answer itself)",
            test: "regex",
            value: "wait|before (you )?answer|don'?t answer yet|then (i'?ll|i will)|once i (answer|reply|respond)",
          },
        ],
      },
    },

    // ── 4 ── concept (quiz)
    {
      slug: "control-the-output",
      title: "Control the Output",
      blurb: "Format, length, tone — and the magic words \"respond only with…\".",
      xp: 25,
      kind: "quiz",
      content: `# Control the Output

By default, AI tends toward a particular shape of answer: medium-length,
friendly, a little wordy, often with a preamble like *"Sure! Here's a great
option for you:"* and a wrap-up at the end. Fine sometimes — annoying when you
just want the thing.

The fix is simple: **tell it the shape you want.** You're the director; the AI
will happily hit any mark you set.

## The four dials
- **Format** — *"as a bulleted list," "in a table with columns X and Y," "as a
  short email," "numbered steps."*
- **Length** — *"in one sentence," "about 50 words," "exactly 3 bullets,"
  "keep it under a tweet."*
- **Tone** — *"warm and casual," "formal and concise," "playful," "no emojis,"
  "like you're explaining to a smart 12-year-old."*
- **Point of view** — *"write it as me," "address it to my boss," "first person."*

## The most underused phrase: "respond only with…"
When you want a clean result with no chatter, say so:

> "Rewrite this sentence to sound more confident. **Respond only with the
> rewritten sentence — no explanation, no preamble.**"

This kills the *"Sure! Here's…"* fluff and gives you something you can paste
straight where it needs to go. Variations that work great:

- *"Reply with just the list, nothing else."*
- *"Give me the answer first, then the reasoning below it."*
- *"No introductions or summaries — get straight to it."*

## Why it matters
Controlling the output isn't fussiness — it's what makes AI output **usable**
without cleanup. A request that says *"3 bullets, plain language, no preamble"*
saves you the editing pass every single time.`,
      questions: [
        {
          prompt:
            "You want a result you can paste directly into a form, with no \"Sure, here's…\" intro. What should you add?",
          options: [
            "\"Please be helpful\"",
            "\"Respond only with the answer — no preamble or explanation\"",
            "\"Take your time\"",
            "\"Make it longer\"",
          ],
          answer: 1,
          explanation:
            "Asking it to respond only with the result strips the chatty intro and wrap-up, giving you something ready to use as-is.",
        },
        {
          prompt:
            "Which request gives you the most control over the *shape* of the answer?",
          options: [
            "\"Tell me about good morning routines\"",
            "\"Give me a morning routine as exactly 5 numbered steps, one short line each, no intro\"",
            "\"Morning routine?\"",
            "\"I'd love to hear your thoughts on morning routines\"",
          ],
          answer: 1,
          explanation:
            "It pins down format (numbered steps), length (5 steps, one line each), and structure (no intro) — leaving little to chance.",
        },
      ],
    },

    // ── 5 ── PROJECT: iterate, don't restart
    {
      slug: "iterate-dont-restart",
      title: "Iterate, Don't Restart",
      blurb: "Refine an answer through follow-ups instead of starting over.",
      xp: 42,
      kind: "project",
      content: `# Iterate, Don't Restart

The most common beginner mistake isn't writing a bad prompt — it's **throwing
away a good start.** They get an answer that's 80% there, don't love it, and open
a brand-new chat to try again from scratch.

Don't. The AI remembers everything in the current conversation. That means you
can **steer** the answer with small follow-ups, exactly like giving notes to a
writer:

> *"Good start. Make it shorter and warmer."*
> *"Cut the second paragraph. Add a line thanking them for their patience."*
> *"Keep this version but make the ending stronger."*

Each follow-up keeps everything good and changes only what you asked. Five quick
nudges will get you somewhere a single perfect prompt almost never does — because
you're reacting to a real draft, not imagining one.

In this project you'll take one answer from rough to right using **only**
follow-ups.`,
      steps: [
        {
          instruction:
            "**Get a first draft.** Open an AI chatbot and ask it to write something real — a bio, a complaint email, a birthday message, an event invite. Don't perfect the prompt; just get a starting point.",
          tool: "ChatGPT / Claude / Gemini",
          hint: "An imperfect first draft is exactly what you want here — you're practicing the fixing.",
        },
        {
          instruction:
            "**Give it one specific note** as a reply — change *one* thing. \"Make it shorter.\" \"More formal.\" \"Add a sentence about X.\" Send it and read the new version.",
          hint: "Specific beats vague: \"make the tone warmer\" works better than \"make it better.\"",
        },
        {
          instruction:
            "**Keep steering — at least 3 follow-ups total.** Notice you never re-explain the whole task; you just adjust. Try asking it to keep one part and change another: \"Keep the opening, rewrite the rest.\"",
          hint: "If it changes something you liked, just say \"go back to the previous version of that part.\"",
        },
        {
          instruction:
            "**Stop when it's right**, not when you're tired. Compare your final version to the very first draft and see how far small nudges took you.",
        },
      ],
      checkpoint: {
        prompt:
          "**Paste 3 of the follow-up messages you sent** to refine the answer (the short notes — one per line is fine). The checklist rewards specific, varied steering.",
        placeholder:
          "Make it shorter and warmer.\nKeep the first paragraph but rewrite the ending.\nAdd a line thanking them for their time.",
        rubric: [
          {
            label: "You wrote real follow-up notes (at least 12 words across them)",
            test: "minWords",
            value: "12",
          },
          {
            label: "At least one note adjusts tone, length, or structure",
            test: "includesAny",
            value: "shorter, longer, warmer, formal, casual, friendly, concise, tone, add, remove, cut, rewrite, stronger, simpler",
          },
          {
            label: "Shows you steered rather than restarted (kept part / changed part / referred to \"it\")",
            test: "regex",
            value: "keep|instead|now|but |make it|that |this |the (opening|ending|first|second|last)|previous",
          },
        ],
      },
    },

    // ── 6 ── concept (quiz)
    {
      slug: "work-from-a-source",
      title: "Work From a Source",
      blurb: "Paste in your own document so the AI stops guessing.",
      xp: 25,
      kind: "quiz",
      content: `# Work From a Source

There's a bright line between AI's two modes, and knowing it changes how much you
can trust the output.

- **Guessing mode** — you ask about something and it answers from its general
  training. Fluent, fast, and *capable of confidently making things up.*
- **Source mode** — you **paste in the actual material** and ask it to work
  *from that*. Now it's reading your text, not reciting from memory.

The fix for "the AI made something up" is very often just: **give it the source.**

> ❌ "What's the refund policy for online orders?" *(it guesses — maybe wrong)*

> ✅ "Here is our refund policy: [paste]. A customer asks if they can return an
> opened item after 40 days. Answer using ONLY the policy above. If it doesn't
> say, reply 'the policy doesn't cover this.'"

That last line is the trick that makes source mode reliable: **tell it to answer
only from what you gave it, and to admit when the source doesn't say.** Without
that instruction, it may quietly blend in its own guesses.

## What you can paste in
- A document, contract, or policy you need explained or applied.
- An article or report you want summarized — *its* facts, not the AI's memory.
- A long email thread you want caught up on.
- Notes, a transcript, a spreadsheet's worth of rows.

## Why this is the pro move
When the facts live **in your message**, hallucination drops sharply — the AI is
transforming text it can see, which is its single strongest skill. Whenever
accuracy matters, don't ask the AI what it *remembers*. Hand it the source and
ask it to work from that.`,
      questions: [
        {
          prompt:
            "You need an accurate answer about your company's specific policy. What's the most reliable approach?",
          options: [
            "Ask the AI from memory and trust its confident answer",
            "Paste the actual policy in and tell it to answer using only that text",
            "Ask the same question in three different AI tools and average them",
            "Ask it to search its training data harder",
          ],
          answer: 1,
          explanation:
            "Pasting the real policy moves the AI into \"source mode\" — it works from text it can see, which is accurate and low-risk, instead of guessing from memory.",
        },
        {
          prompt:
            "Why add \"answer using only the text above, and say so if it doesn't cover this\"?",
          options: [
            "It makes the AI respond faster",
            "It stops the AI from quietly blending in its own guesses, and lets it admit gaps",
            "It's just politeness with no real effect",
            "It forces the AI to make the answer longer",
          ],
          answer: 1,
          explanation:
            "That instruction keeps the AI anchored to your source and gives it permission to say \"not covered\" instead of inventing an answer to fill the gap.",
        },
        {
          prompt:
            "Pasting your source into the prompt reduces hallucination because…",
          options: [
            "The AI is afraid of being caught with the document present",
            "It turns the task into transforming text the AI can see — its strongest skill",
            "Longer prompts are always more accurate",
            "It permanently teaches the AI your information",
          ],
          answer: 1,
          explanation:
            "With the facts in front of it, the AI summarizes or applies text it can actually read, rather than reconstructing facts from memory where it tends to slip.",
        },
      ],
    },

    // ── 7 ── PROJECT: build a reusable prompt template
    {
      slug: "build-a-prompt-template",
      title: "Build a Reusable Prompt Template",
      blurb: "Turn a task you do often into a fill-in-the-blank prompt you keep.",
      xp: 45,
      kind: "project",
      content: `# Build a Reusable Prompt Template

By now you know the moves: give context, show examples, control the output, work
from a source. The final skill is **not rebuilding all that from scratch every
time.**

If there's a task you do repeatedly — replying to customer emails, writing social
captions, summarizing meetings, drafting status updates — you can capture a great
prompt **once** as a *template* with blanks you fill in. Then every future time
is a 10-second paste-and-fill instead of a fresh wrestling match.

> **Template — Customer reply**
> *You're a friendly, calm support rep for [my business]. A customer wrote:
> [paste their message]. Reply in 4–6 sentences. Tone: warm and genuinely
> helpful, never defensive. If we're at fault, own it plainly. End with one clear
> next step. Respond only with the email body.*

See the \`[brackets]\`? Those are your blanks. The role, tone, length, and rules
are baked in, so you get a consistent, on-brand result every time — and you can
keep tuning the one template instead of re-inventing it.

In this project you'll build and save your own.`,
      steps: [
        {
          instruction:
            "**Name a task you do over and over** with AI (or wish you did). Replies, captions, summaries, outreach, rewrites — pick the one that would save you the most time.",
          hint: "Repetition is the whole point. The more often you do it, the more a template pays off.",
        },
        {
          instruction:
            "**Write the template** with the ingredients baked in — a *role*, the *tone* and *length* you want, any *rules*, and the desired *format*. Use `[BRACKETS]` to mark the parts you'll swap in each time (like `[paste customer message]`).",
          tool: "ChatGPT / Claude / Gemini",
          hint: "Reuse what you learned: control the output (\"respond only with…\"), and tell it to work from the pasted material.",
        },
        {
          instruction:
            "**Test it for real.** Fill in the blanks with an actual example, run it, and see if the output is usable as-is. If not, tweak the *template* (not just this one answer) so next time is better too.",
          hint: "Each fix you make to the template improves every future use — that's the leverage.",
        },
        {
          instruction:
            "**Save it somewhere you'll find it** — a notes app, a doc, or your AI tool's saved-prompts feature if it has one. A template you can't find isn't reusable.",
        },
      ],
      checkpoint: {
        prompt:
          "**Paste your finished template** (the reusable version with `[BRACKETS]` for the parts you swap in). The checklist rewards a real, well-built, reusable prompt.",
        placeholder:
          "You're a [role] for [my business]. Here is [paste material]. Write a [format] that… Tone: … Respond only with …",
        rubric: [
          {
            label: "A substantial template (at least 25 words)",
            test: "minWords",
            value: "25",
          },
          {
            label: "Has at least one fill-in-the-blank placeholder (e.g. [brackets] or ___ )",
            test: "regex",
            value: "\\[[^\\]]+\\]|_{2,}|\\{[^}]+\\}|<[^>]+>",
          },
          {
            label: "Bakes in a role or perspective (\"you're a…\", \"act as…\", \"as a…\")",
            test: "regex",
            value: "you('?re| are)|act as|as an? |your job is",
          },
          {
            label: "Specifies tone, length, or format so results stay consistent",
            test: "includesAny",
            value: "tone, sentence, word, bullet, list, format, short, concise, paragraph, respond only, steps, email, warm, formal, casual",
          },
        ],
      },
    },
  ],
};
