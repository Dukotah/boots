import type { Module } from "./types";

// AI for Email & Inbox — practical, no-nonsense guide to using AI to write,
// triage, summarize, and manage email. All quiz/reading lessons (no coding).
export const aiEmailInbox: Module = {
  slug: "ai-email-inbox",
  title: "AI for Email & Inbox",
  description:
    "Take control of your inbox with AI. Learn to draft faster, triage ruthlessly, summarize long threads, write better subject lines, handle difficult messages, and build repeatable templates — all without sounding like a robot.",
  emoji: "📧",
  gradient: "from-cyan-500/20 to-sky-500/10",
  tagline:
    "Draft faster, reply smarter, and cut inbox time in half using AI — practical techniques that work in Gmail, Outlook, or any email client.",
  keywords: [
    "AI email",
    "AI for email",
    "write emails with AI",
    "AI inbox management",
    "email drafting AI",
    "ChatGPT email",
    "Claude email",
    "email productivity AI",
    "AI email templates",
  ],
  lessons: [
    {
      slug: "email-ai-fundamentals",
      title: "How AI Fits Into Email",
      blurb: "Understand what AI can and can't do for your inbox before you start.",
      xp: 20,
      kind: "quiz",
      content: `# How AI Fits Into Email

AI assistants are text-in, text-out tools. Email is almost entirely text. That
match makes email one of the clearest wins for everyday AI use — but it helps to
know the landscape before diving in.

**What AI does well for email:**

- **Drafting from a bullet list** — you give the key points, it turns them into
  polished prose. Much faster than starting from a blank page.
- **Tone adjustment** — instantly rewrite "this is late and that's not acceptable"
  into something firm but professional, or vice versa.
- **Summarizing long threads** — paste a 20-message chain and ask "what's the
  current situation and what's outstanding?"
- **Generating subject lines** — given the body, ask for five options in different
  registers (urgent, neutral, friendly).
- **Spotting missing pieces** — ask "what important point did I forget to include?"

**What AI doesn't do (without extra tools):**

- **Access your inbox directly** — a plain chatbot like Claude or ChatGPT has no
  connection to Gmail or Outlook unless you grant it explicit integration access.
- **Remember past conversations** — each new chat starts fresh; it doesn't know
  your history with this contact.
- **Guarantee the facts are right** — if you say the meeting is Thursday, it
  repeats Thursday. It doesn't check your calendar.

**Two broad modes of use:**

1. **Manual paste-and-ask** — copy email content into a chat window, ask your
   question, copy the reply back. Works everywhere, no setup.
2. **Native integrations** — Gmail's "Help me write," Outlook's Copilot, and
   third-party plugins (like Superhuman's AI) are built into the compose window.
   Faster but limited to what the integration exposes.

Start with the manual approach. It makes the skill transferable regardless of
which email client or AI tool you use.`,
      questions: [
        {
          prompt:
            "What is the fastest way to start using AI for email, without any setup or integrations?",
          options: [
            "Install a browser extension that reads your inbox automatically",
            "Copy email content into a chat window, ask your question, then paste the result back",
            "Wait until your email client adds a built-in AI button",
          ],
          answer: 1,
          explanation:
            "Manual paste-and-ask works in any email client with any AI tool and teaches the core skill. Integrations are convenient shortcuts once you know what you're doing.",
        },
        {
          prompt:
            "You paste a 30-message thread into Claude and ask it to summarize. What should you verify before acting on the summary?",
          options: [
            "Nothing — AI summaries of raw text are always accurate",
            "That the key facts (dates, names, commitments) match what's actually in the thread",
            "That the summary is at least 500 words long",
          ],
          answer: 1,
          explanation:
            "AI summarizes what you give it accurately most of the time, but it can mis-emphasize or misread ambiguous phrasing. Spot-check facts before forwarding or acting.",
        },
        {
          prompt:
            "A colleague tells you 'AI sent a reply from my Gmail account without me clicking send.' What actually happened?",
          options: [
            "Standard AI chatbots can access and send email on their own",
            "They are using an integration or plugin with explicit send permission — a plain chatbot cannot access your inbox",
            "This is impossible — AI cannot write emails at all",
          ],
          answer: 1,
          explanation:
            "Base AI chatbots have no inbox access. Auto-send requires an explicit integration (like a plugin or automation) that the user set up and granted permission to act on their behalf.",
        },
      ],
      explanation:
        "Manual paste-and-ask is the foundation. Once you've built the habit, layer in integrations — but the judgment of when and how to use AI stays yours.",
    },
    {
      slug: "drafting-from-bullets",
      title: "Drafting Emails From Bullet Points",
      blurb: "Never stare at a blank compose window again — lead with your points, let AI do the prose.",
      xp: 22,
      kind: "quiz",
      content: `# Drafting Emails From Bullet Points

The most reliable AI email technique is the simplest: **you supply the substance,
AI supplies the sentences**.

Write your key points as a quick bullet list — don't worry about order or wording.
Then give the AI the context it needs to match your intent.

**A prompt template that works:**

> Draft a professional email from the following bullets. Recipient: [who]. Context:
> [one sentence of situation]. Tone: [formal / friendly / direct / warm]. Length:
> [short / medium / around X words].
>
> - [Bullet 1]
> - [Bullet 2]
> - [Bullet 3]

**Why bullets beat a vague request:**

- "Write me an email about the project delay" forces the AI to invent facts.
- A bullet list pins the facts; the AI focuses on structure and language.

**The five things to always specify:**

1. **Recipient type** — client, coworker, boss, stranger.
2. **Your relationship** — first contact, ongoing, post-conflict.
3. **Tone** — formal, casual, firm, conciliatory.
4. **Desired outcome** — inform, request, apologize, persuade.
5. **Length** — short (under 100 words), medium (100–200), detailed (200+).

**After the first draft, iterate:**

- "Make it more concise."
- "The second paragraph sounds passive-aggressive — soften it."
- "Add a clear call-to-action at the end."
- "Rewrite the opening so it doesn't start with 'I'."

One or two follow-up messages usually turns a solid draft into a send-ready one.`,
      questions: [
        {
          prompt:
            "Why is giving AI a bullet list of facts better than asking it to 'write an email about X'?",
          options: [
            "Bullets make the AI work faster",
            "Bullets give AI the actual substance to work with, so it stops inventing facts and focuses on language and structure",
            "AI can only read bullet-point format",
          ],
          answer: 1,
          explanation:
            "Vague prompts force the AI to invent details, which can be wrong. Bullet lists pin the real facts so the AI only has to do the job you actually want: turn your points into good prose.",
        },
        {
          prompt:
            "You got a usable draft but the tone is slightly too formal for the recipient. What's the fastest fix?",
          options: [
            "Discard it and write a new bullet list with 'informal' added",
            "Follow up in the same chat: 'Make this a bit more casual — we have an ongoing working relationship'",
            "Send it anyway and apologize later",
          ],
          answer: 1,
          explanation:
            "Tone iteration in the same chat is much faster than starting over. The model already has all your facts; one follow-up adjusts only the register.",
        },
        {
          prompt:
            "Which of these is the most complete, useful prompt for drafting an email?",
          options: [
            "'Write an email about the invoice.'",
            "'Draft a professional email. Recipient: new client. Context: their invoice is 14 days overdue. Tone: firm but courteous. Under 120 words. Bullets: — Invoice #1042, due May 15 — No payment received — Please confirm payment date or contact us.'",
            "'Invoice overdue email please'",
          ],
          answer: 1,
          explanation:
            "The complete prompt specifies recipient, context, tone, length, and actual facts. The AI has everything it needs to produce a send-ready draft on the first try.",
        },
      ],
      explanation:
        "Bullets plus context equals a draft you can send. Every word you spend specifying tone and outcome saves two rounds of revision.",
    },
    {
      slug: "tone-and-rewriting",
      title: "Rewriting for Tone",
      blurb: "Turn a terse frustration into a professional message — or firm up a too-polite draft.",
      xp: 22,
      kind: "quiz",
      content: `# Rewriting for Tone

The single most-used AI email trick among professionals is **tone rewriting**: you
write what you mean, bluntly, and ask the AI to make it appropriate.

This works in both directions:

- **Soften** — "This is clearly your team's fault and I need it fixed today" →
  professional escalation that doesn't burn a relationship.
- **Firm up** — "I just wanted to follow up again, sorry to be a bother, but
  whenever you have a moment…" → a clear, confident request with a deadline.

**Useful tone labels to try:**

| You want | Ask for |
|---|---|
| Clear and assertive | "Direct but courteous" |
| Executive-level brevity | "C-suite tone, under 80 words" |
| Warm partnership feel | "Collaborative, collegial" |
| Damage control | "Apologetic but forward-looking" |
| Cold close | "Formal, closing a matter" |

**A reliable rewrite prompt:**

> Rewrite this email. Keep all the facts. Change the tone to [X].
> Here's the original:
> [paste email]

**One important caveat:** the AI will keep the facts you give it. If the original
email contains a factual error (wrong date, wrong amount), the rewrite will too.
Fix facts *before* the rewrite, not after — or explicitly tell the AI to change them.

**What AI does NOT fix automatically:**
- A promise you shouldn't have made
- A factual claim that was wrong in the original
- Context the recipient already has that changes meaning

Read every rewrite before you send it. It's your name on the email.`,
      questions: [
        {
          prompt:
            "You draft an angry email to a vendor that you'd never actually send. What's the best AI move?",
          options: [
            "Delete the angry draft and start fresh — never show AI emotional text",
            "Paste it and ask: 'Rewrite this to be firm and professional. Keep all the facts.'",
            "Send the original — honesty is always the best policy",
          ],
          answer: 1,
          explanation:
            "Angry drafts are actually a useful input: they contain all your real points. AI can preserve the substance while stripping the heat — that's a strength of the rewrite workflow.",
        },
        {
          prompt:
            "You asked AI to rewrite an email 'to sound more confident.' The rewrite has the wrong project deadline. What happened?",
          options: [
            "The AI changed the date on purpose to make the email stronger",
            "The original email had the wrong deadline — AI kept the facts it was given",
            "AI cannot handle dates",
          ],
          answer: 1,
          explanation:
            "AI preserves the facts in the text you provide. If the source text is wrong, the output is wrong. Always correct factual errors in the original before rewriting.",
        },
        {
          prompt:
            "A colleague keeps sending over-apologetic follow-up emails that get ignored. What would you suggest?",
          options: [
            "Have them write the follow-up normally and then ask AI to 'firm it up: make the request clear and add a specific deadline'",
            "Tell them to stop using AI entirely",
            "Have the AI write the email from scratch with no input from them",
          ],
          answer: 0,
          explanation:
            "Firming up — removing excessive hedging and making the ask explicit — is one of AI's most practical email uses. Writing the email themselves first ensures the facts are accurate.",
        },
      ],
      explanation:
        "Write what you mean, then let AI adjust the register. You stay in control of facts and intent; AI handles the professional packaging.",
    },
    {
      slug: "summarizing-threads",
      title: "Summarizing Long Threads",
      blurb: "Catch up on a tangled email chain in 30 seconds — then reply from a position of clarity.",
      xp: 22,
      kind: "quiz",
      content: `# Summarizing Long Threads

Long email threads are one of the most common productivity traps: 15 replies,
three different sub-topics, and you need to add value in two minutes. AI fixes this.

**Basic summary prompt:**

> Here is an email thread. Please summarize: (1) what the current situation is,
> (2) what decisions have been made, (3) what is still open or needed from whom.
>
> [paste thread]

**Variations worth knowing:**

- **"What are my action items?"** — focuses the summary on what *you* specifically
  need to do, which is often more useful than a general recap.
- **"What's the disagreement between [Person A] and [Person B]?"** — cuts through
  noise when two people are clearly talking past each other.
- **"Write a one-sentence status update I can paste into a Slack message."** — turns
  a thread into a briefing artifact instantly.
- **"What questions would a newcomer need answered before they could contribute?"**
  — useful when onboarding a new person to an ongoing thread.

**Pasting tips:**

- Include headers (From, To, Date) when you paste — they help the AI attribute
  who said what.
- If the thread is very long, paste the most recent 8–10 messages; the AI will
  usually have what it needs.
- If confidentiality matters, redact names and company-specific identifiers before
  pasting into a public AI tool.

**Limits:**

Summaries compress, which means nuance can drop. If the thread involves a subtle
disagreement or implied subtext, the AI summary may miss it. Read the summary
skeptically when the stakes are high.`,
      questions: [
        {
          prompt:
            "You need to respond to a 20-message email thread but you're short on time. What's the fastest responsible approach with AI?",
          options: [
            "Reply without reading, since AI will cover for any gaps",
            "Paste the thread and ask AI for current status, decisions made, and open items — then review and reply",
            "Forward the whole thread to a colleague instead",
          ],
          answer: 1,
          explanation:
            "Structured summary (situation / decisions / open items) gives you a reliable briefing in seconds. Reviewing it before replying keeps you responsible for the accuracy.",
        },
        {
          prompt:
            "The AI summary of a sensitive negotiation thread seems to miss some tension between two parties. What should you do?",
          options: [
            "Trust the summary — AI always catches interpersonal dynamics",
            "Ask a more targeted question: 'What is the disagreement between [A] and [B] based on this thread?'",
            "Discard the summary and never use AI for important threads",
          ],
          answer: 1,
          explanation:
            "Targeted follow-up prompts dig deeper. Generic summaries compress; a specific question about the tension forces the AI to surface the subtext it glossed over.",
        },
        {
          prompt:
            "Before pasting a long internal email thread into a public AI chatbot, what step is most important?",
          options: [
            "Format the thread into a specific XML structure",
            "Redact names, company identifiers, and other confidential details you wouldn't want stored externally",
            "Make sure the thread is at least 10 messages long",
          ],
          answer: 1,
          explanation:
            "Public AI tools may store inputs. Redacting sensitive identifiers before pasting protects your company's confidential information while still letting you get the summary you need.",
        },
      ],
      explanation:
        "Paste, prompt for structure, verify the key facts. A 30-second AI briefing beats a 15-minute re-read of a chaotic thread — as long as you spot-check before acting.",
    },
    {
      slug: "subject-lines-and-openers",
      title: "Subject Lines & Openers That Get Read",
      blurb: "The two lines that decide whether your email gets opened and read to the end.",
      xp: 20,
      kind: "quiz",
      content: `# Subject Lines & Openers That Get Read

Most email is lost at two gates: the subject line (does it get opened?) and the
first sentence (does the reader keep going?). AI is excellent at generating options
for both.

**Subject lines:**

Good subject lines are specific, scannable, and signal what's needed from the reader.

Ask for options: *"Give me five subject-line options for this email: [paste body].
Vary the tone — urgent, neutral, specific, question-format, and action-request."*

What separates strong subject lines from weak ones:

| Weak | Strong |
|---|---|
| "Update" | "Q3 report ready — one decision needed by Friday" |
| "Meeting" | "30-min call to unblock the API launch — Thu 2 pm?" |
| "Following up" | "Invoice #1042 — payment confirmation needed" |
| "Hi" | "Intro: Jane Lee, new head of product at Acme" |

Strong subject lines state the topic, the status, and (when relevant) what action
is needed.

**Openers:**

The opener should tell the reader *immediately* why the email exists. Avoid the
slow warm-up ("I hope this email finds you well in these challenging times…").

Useful prompt: *"Rewrite the opening of this email so the first sentence states
clearly why I'm writing and what I need. Cut anything that's just filler."*

**Common opener upgrades:**

- "I hope you're well" → cut it entirely, or move it to a brief P.S.
- "I wanted to reach out because…" → "I'm writing about [X]."
- "As per my previous email…" → "Following up on [specific topic] from [date]:"

**When to keep the warm opener:**
Genuine relationship messages (condolences, congratulations, thank-you notes)
are different — a personal opener is the point. Don't optimize humanity out of
emails that are meant to be human.`,
      questions: [
        {
          prompt: "Which subject line is most likely to get opened and acted on?",
          options: [
            "\"Update\"",
            "\"Contract renewal — signature needed by June 20\"",
            "\"Hi there!\"",
          ],
          answer: 1,
          explanation:
            "The strong subject line names the topic (contract renewal), the action (signature), and the deadline (June 20). The reader knows immediately what's needed without opening the email.",
        },
        {
          prompt: "You asked AI for five subject-line options. Why ask for multiple instead of one?",
          options: [
            "AI refuses to write just one",
            "Having options lets you pick the right register for the relationship — urgent, neutral, question-format, etc.",
            "More options means one of them will be perfect without any review",
          ],
          answer: 1,
          explanation:
            "No single subject line is right for every recipient. Generating a few variants lets you match the register to your relationship with that specific person.",
        },
        {
          prompt:
            "When is it appropriate to keep a warm, personal opener like 'Congratulations on the promotion'?",
          options: [
            "Never — always cut straight to the point",
            "When the email's purpose is genuinely relational (congratulations, condolences, thank-you) — warmth is the content",
            "Only in emails to your manager",
          ],
          answer: 1,
          explanation:
            "Not every email is a transaction. Relational messages are meant to connect, not just inform. Optimizing humanity out of those emails defeats their purpose.",
        },
      ],
      explanation:
        "A specific subject line and a direct opener are two of the highest-leverage edits in any email. AI can generate multiple options in seconds — you pick the one that fits.",
    },
    {
      slug: "difficult-email-scenarios",
      title: "Handling Difficult Email Scenarios",
      blurb: "Complaints, apologies, pushback, and awkward requests — AI helps you find the right words.",
      xp: 22,
      kind: "quiz",
      content: `# Handling Difficult Email Scenarios

Some emails sit in your drafts for days because the situation is emotionally charged
or the stakes are high. AI is particularly useful here: it takes your rough draft
and turns it into something you can actually send.

**Common difficult scenarios and AI approaches:**

**Complaint response** — you need to acknowledge a problem without admitting
liability or overpromising.

> "Draft a complaint response. The customer is upset about a delayed shipment. We
> apologize once, give the updated delivery window (June 15), explain one reason
> (supplier delay), and offer a 10% credit. Tone: empathetic but not groveling.
> Under 150 words."

**Pushing back on an unreasonable request** — you need to decline or redirect
without sounding obstructionist.

> "Rewrite this email so I'm declining the deadline extension request while keeping
> the relationship intact. Suggest an alternative (phased delivery by June 10,
> remainder by June 20). Keep it under 100 words."

**Requesting something sensitive** — asking for a raise, reporting a concern,
ending a vendor contract.

> "Draft a professional email requesting a salary review. Context: I've taken on
> X, Y, Z responsibilities beyond my original role in the last 6 months. Tone:
> confident, matter-of-fact, not apologetic."

**Apology email** — you need to own a mistake without over-apologizing or
assigning blame elsewhere.

> "Write a brief apology email for missing the Tuesday deadline. Acknowledge the
> impact, don't blame external factors, state the new delivery date (Friday noon).
> Tone: accountable, forward-looking, under 80 words."

**The key across all of these:** you supply the facts and the desired outcome. AI
supplies the professional language. Never let AI invent facts for a high-stakes email.`,
      questions: [
        {
          prompt:
            "You're responding to an angry customer complaint. What must you include in your AI prompt to get a useful draft?",
          options: [
            "Just say 'respond to angry customer' — the AI will figure it out",
            "The specific complaint, what you'll do about it, any offer you're making, and the tone you need",
            "The customer's full email history with your company",
          ],
          answer: 1,
          explanation:
            "For high-stakes emails, every fact matters. If you don't specify the resolution and tone, the AI invents them — and an invented promise to an angry customer can make things worse.",
        },
        {
          prompt:
            "You need to decline a colleague's request but keep the relationship strong. Which AI prompt is most effective?",
          options: [
            "'Write a no email.'",
            "'Rewrite this draft so I'm declining the request, keeping the tone collaborative, and suggesting a specific alternative: [state the alternative].'",
            "'Tell them they are wrong.'",
          ],
          answer: 1,
          explanation:
            "Providing the decline reason, the tone goal, and a specific alternative gives AI the structure to write something that preserves the relationship — a vague 'no email' prompt produces a generic, blunt response.",
        },
        {
          prompt:
            "When writing a high-stakes apology email with AI, what is the most important human step?",
          options: [
            "Send it immediately without reading — speed matters in apologies",
            "Read every word before sending: verify the facts are correct and the tone is genuinely yours",
            "Have the AI send it directly from your account",
          ],
          answer: 1,
          explanation:
            "A misattributed fact or an off-key tone in an apology can make a bad situation worse. Always read the draft as if you received it — then decide if it sounds like you.",
        },
      ],
      explanation:
        "Difficult emails need the most human review, not the least. Use AI to break through the drafting paralysis, then read every word as if you were the recipient.",
    },
    {
      slug: "email-inbox-capstone",
      title: "Capstone: Build Your Email AI Toolkit",
      blurb: "Put it all together — triage, templates, and a repeatable system you'll actually use.",
      xp: 25,
      kind: "quiz",
      content: `# Capstone: Build Your Email AI Toolkit

You've learned to draft, rewrite, summarize, sharpen subject lines, and handle hard
scenarios. The final step is turning those techniques into a **repeatable system**
so AI delivers value every day, not just when you remember to use it.

**The three-prompt toolkit (save these):**

**1. Quick draft**
> "Draft a [formal / friendly / direct] email to [recipient type]. Context: [one
> sentence]. Bullets: [list your facts]. Under [N] words."

**2. Thread briefing**
> "Summarize this thread: (1) current situation, (2) decisions made, (3) open items
> and who owns them. [paste thread]"

**3. Tone rewrite**
> "Rewrite this email. Keep all facts. Change tone to [X]. [paste email]"

**Building templates you reuse:**

For emails you send regularly (weekly status updates, follow-ups, meeting requests,
onboarding instructions), build a refined AI-generated template once, then keep it
in a notes app or email draft. Future sends are fill-in-the-blank in 30 seconds.

**Triage with AI:**

When your inbox is overwhelming, paste a list of subject lines and ask:
> "Which of these require a decision or response from me vs. which are informational
> only? Here's the list: [paste]"

This works even better with a summary of each email's first line.

**Where to draw the line:**

AI is a drafting tool, not an autonomous emailer. Before sending any AI-assisted
email, ask yourself:
1. Are all the facts correct?
2. Does this sound like me?
3. Am I comfortable if the recipient knows AI helped draft it?

Most AI-polished emails pass all three — you were going to write the same thing
anyway, just slower. But question 3 is a meaningful gut-check for highly personal
or sensitive messages.

**The compounding effect:**

Once AI-assisted drafting becomes a habit, even five minutes saved per email adds
up to hours a week. The bigger gain is the mental overhead — no more dreading the
blank compose window.`,
      questions: [
        {
          prompt:
            "You need to send a 'weekly project status' email every Friday. What's the most efficient long-term AI approach?",
          options: [
            "Write a full prompt from scratch every Friday",
            "Build a refined template once using AI, then use it as a fill-in-the-blank each week",
            "Have AI write a different format every week to stay creative",
          ],
          answer: 1,
          explanation:
            "One-time template creation is the compounding win: you do the careful prompting once, refine the output to match your voice, then reuse it. Repeatable emails become 30-second tasks.",
        },
        {
          prompt:
            "Your inbox has 40 unread emails on Monday morning. What's a practical AI triage move?",
          options: [
            "Paste each email's full text one at a time and ask AI to reply to each",
            "Paste a list of subject lines (or subject + first sentence) and ask AI to distinguish decision/response items from informational ones",
            "Ignore AI — inbox triage must be done manually",
          ],
          answer: 1,
          explanation:
            "Subject-line triage is fast: paste the list, get a prioritized split in seconds, and focus your attention on the items that actually need a response. This doesn't require AI to read every email — just the metadata.",
        },
        {
          prompt:
            "Before sending any AI-drafted email, which three checks matter most?",
          options: [
            "Word count, sentence length, and reading level score",
            "Are the facts correct? Does it sound like me? Am I comfortable if the recipient knows AI helped?",
            "Spell check, grammar check, and emoji count",
          ],
          answer: 1,
          explanation:
            "Fact accuracy keeps you trustworthy. Voice authenticity keeps the relationship real. The third check is a meaningful gut-check for personal or sensitive messages — most AI-polished emails pass it easily, but the question is worth asking.",
        },
      ],
      explanation:
        "Three saved prompts, a library of reusable templates, and a habit of reading before sending — that's the whole system. The compounding return is hours per week and a much calmer inbox.",
    },
  ],
};
