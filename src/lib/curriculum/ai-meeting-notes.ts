import type { Module } from "./types";

// AI for Meetings & Notes — practical, all-quiz module covering how to use AI
// to prepare for meetings, take and clean up notes, extract action items, draft
// follow-ups, and keep a searchable knowledge base. No coding required.
export const aiMeetingNotes: Module = {
  slug: "ai-meeting-notes",
  title: "AI for Meetings & Notes",
  description:
    "Stop drowning in meeting prep, messy notes, and missed action items. Learn how to use AI to prepare agendas, clean up raw notes, extract decisions and to-dos, write follow-up emails, and build a searchable record of what was said — all in minutes.",
  emoji: "📝",
  gradient: "from-indigo-500/20 to-violet-500/10",
  tagline:
    "Use AI to prepare, capture, and follow up on meetings — so nothing falls through the cracks.",
  keywords: [
    "AI meeting notes",
    "AI for meetings",
    "meeting summary AI",
    "AI action items",
    "meeting follow-up AI",
    "AI note taking",
    "AI agenda generator",
    "meeting productivity AI",
  ],
  lessons: [
    {
      slug: "why-meetings-need-ai",
      title: "Why Meetings Need AI",
      blurb: "The hidden cost of bad meetings — and where AI actually helps.",
      xp: 20,
      kind: "quiz",
      content: `# Why Meetings Need AI

Meetings are expensive. A one-hour meeting with five people costs five hours of
collective focus time. When prep is thin, notes are incomplete, and action items
disappear after the call, that cost is pure waste.

AI can't fix a culture of pointless meetings — but it can sharpen the three phases
where most value leaks:

1. **Before:** Unclear agendas lead to unfocused discussions. AI can draft a crisp
   agenda in under a minute when you give it the meeting goal and attendees.

2. **During:** Human memory and handwriting are unreliable under pressure. Transcription
   tools (built into Zoom, Teams, Google Meet, or third-party tools like Otter.ai)
   capture every word so you can be fully present.

3. **After:** Raw transcripts are overwhelming. AI can transform a 40-minute transcript
   into a tight summary, a clean decision log, and a numbered action-item list —
   formatted and ready to send — in seconds.

The skill in this module is learning to **brief AI well** at each phase. The better
context you give it (meeting purpose, attendees' roles, expected decisions), the more
useful the output.

One important caveat: before you paste a transcript into any AI tool, check your
company's data policy and inform participants. Many meeting assistant tools process
audio on their own servers; public AI chatbots do too. When in doubt, redact names
and strip identifying detail before pasting.`,
      questions: [
        {
          prompt:
            "Which three phases of a meeting does AI add the most value to?",
          options: [
            "Scheduling a room, ordering catering, and sending calendar invites",
            "Preparing the agenda, capturing content during, and turning raw notes into summaries and action items after",
            "Deciding who gets invited, running the video call, and billing attendees",
          ],
          answer: 1,
          explanation:
            "AI is a language tool — it shines at drafting agendas before, supporting note-capture during, and transforming messy transcripts into clean outputs after. Logistics like room booking are handled by other tools.",
        },
        {
          prompt:
            "Before pasting a meeting transcript into a public AI chatbot, you should:",
          options: [
            "Always paste immediately — chatbots never store anything",
            "Check your company's data policy and consider redacting names or sensitive detail",
            "Only paste if the meeting was fewer than 30 minutes",
          ],
          answer: 1,
          explanation:
            "Public AI services may store inputs. Company policies often restrict what data can leave internal systems. Redacting sensitive detail is a safe baseline.",
        },
        {
          prompt:
            "What single factor most determines the quality of AI-generated meeting prep or summaries?",
          options: [
            "The length of the original transcript",
            "How well you brief the AI — the context, goal, and structure you provide",
            "Which day of the week the meeting was held",
          ],
          answer: 1,
          explanation:
            "AI output quality tracks input quality. A vague prompt ('summarize this') yields a vague summary. A specific brief ('extract decisions and open questions for a product team') yields something immediately usable.",
        },
      ],
      explanation:
        "AI doesn't fix bad meeting culture, but it eliminates the prep, capture, and follow-up friction that makes good meetings hard to sustain.",
    },
    {
      slug: "drafting-agendas",
      title: "Drafting Agendas with AI",
      blurb: "Turn a meeting goal into a focused, timed agenda in under a minute.",
      xp: 20,
      kind: "quiz",
      content: `# Drafting Agendas with AI

A good agenda answers three questions before the meeting starts: **What are we
deciding or accomplishing? Who needs to be there? How long does each item get?**

Without those anchors, meetings drift. With them, attendees come prepared and
facilitators stay on track.

AI can draft a solid agenda the moment you give it those anchors. Compare:

> ❌ "Write an agenda for my Monday meeting."

> ✅ "Write a 45-minute agenda for a product-team kickoff. Attendees: PM, two
> engineers, one designer. Goal: align on scope for the Q3 feature release and
> assign the first two milestones. We need to leave with concrete owners and dates."

The second prompt produces an agenda with timed slots, a clear objective, and a
decision section — ready to paste into a calendar invite.

**Useful additions to the prompt:**

- *"Include a 5-minute check-in at the start."*
- *"Add a parking-lot item at the end for anything that runs over."*
- *"Flag which items are decisions vs. updates."*
- *"Leave space for a 5-minute buffer before the next meeting."*

**After the AI drafts it, review it yourself.** Does the time allocation match
reality? Are the decision-makers actually invited? Is there an item that doesn't
belong and should be async instead? A two-minute human review is the last step before
it goes out.`,
      questions: [
        {
          prompt:
            "What three pieces of context make an AI agenda prompt most effective?",
          options: [
            "The meeting room number, the WiFi password, and the catering order",
            "The meeting goal, who's attending and in what roles, and how long the meeting is",
            "The date, the timezone, and the calendar app being used",
          ],
          answer: 1,
          explanation:
            "Goal, attendees/roles, and duration are the anchors AI needs to produce a focused, appropriately scoped agenda. Logistics like room or timezone don't affect content quality.",
        },
        {
          prompt:
            "Which prompt will produce a more usable agenda?",
          options: [
            "'Write a meeting agenda'",
            "'Write a 30-minute agenda for a weekly engineering standup — goal: surface blockers and align on sprint priorities. Three engineers, one lead. Mark each item as update or decision.'",
            "Both will produce equally useful agendas",
          ],
          answer: 1,
          explanation:
            "Specificity drives quality. The detailed prompt gives the model everything it needs to produce timed slots, differentiate item types, and match the team's actual context.",
        },
        {
          prompt:
            "After AI generates an agenda draft, the right next step is to:",
          options: [
            "Send it directly to all attendees without reading it",
            "Review it yourself — check timing, confirm the right people are on it, and cut anything that should be async",
            "Run it through a second AI to verify it",
          ],
          answer: 1,
          explanation:
            "A quick human review catches misaligned time estimates, missing stakeholders, or items that don't actually need synchronous discussion. The AI drafts; you decide.",
        },
      ],
      explanation:
        "Give AI the goal, attendees, and duration — then review the output. That two-step habit turns agenda prep from a chore into a 90-second task.",
    },
    {
      slug: "capturing-notes-live",
      title: "Capturing Notes Live",
      blurb: "Transcription tools, how to use them, and their real limitations.",
      xp: 20,
      kind: "quiz",
      content: `# Capturing Notes Live

The best notes come from being fully present in the conversation — not from
frantically typing while half-listening. AI-powered transcription tools solve this
by capturing the audio so you don't have to.

**Built-in options:**

- **Microsoft Teams** — live transcription in the meeting; generates a downloadable
  transcript and (with Copilot) a meeting recap.
- **Google Meet** — live captions and a transcript saved to Google Drive (transcript
  requires a Workspace plan).
- **Zoom** — built-in transcription via Zoom AI Companion or the classic cloud
  recording + transcript download.

**Third-party tools:**

- **Otter.ai** — joins the call as a bot participant and produces a live transcript
  with speaker labels. Integrates with Zoom, Teams, and Google Meet.
- **Fireflies.ai**, **Fathom**, **Tactiq** — similar category; each has different
  pricing and privacy models.

**What transcription does and doesn't do:**

- It produces a verbatim record — not a summary. Raw transcripts are long, messy,
  and full of filler. You still need a summarization step after.
- Speaker labeling helps but is imperfect, especially on calls with background noise
  or strong accents.
- Accuracy varies. Technical jargon, proper nouns, and acronyms are common stumbling
  points; always scan for errors before sending a transcript to anyone.

**Consent matters.** In many places, recording a call without notifying participants
is illegal. Most meeting platforms notify attendees when recording starts, but check
the rules in your region and your organization's policy.`,
      questions: [
        {
          prompt:
            "What is the primary benefit of using a transcription tool during a meeting?",
          options: [
            "It automatically sends follow-up emails for you",
            "It captures a verbatim record so you can be fully present instead of frantically typing",
            "It edits the transcript into a polished summary in real time",
          ],
          answer: 1,
          explanation:
            "Transcription frees you from split-attention note-taking. The summarization and clean-up happen afterward — the live tool just captures everything accurately.",
        },
        {
          prompt:
            "A raw transcript from a 45-minute meeting is long and hard to read. Why?",
          options: [
            "Transcription tools always produce bad output",
            "Transcription is verbatim — it captures every word including filler, tangents, and interruptions; summarization is a separate step",
            "The tool recorded the wrong meeting",
          ],
          answer: 1,
          explanation:
            "Verbatim capture is a feature, not a flaw — it's the complete record. Turning that into a clean, readable summary is the next AI task (covered in the next lesson).",
        },
        {
          prompt:
            "Before recording a meeting with a transcription bot, you should:",
          options: [
            "Start recording silently — participants don't need to know",
            "Notify participants, confirm consent, and check your regional laws and company policy on recording",
            "Only record meetings where you are the host",
          ],
          answer: 1,
          explanation:
            "Consent and legal compliance are non-negotiable. Most platforms notify attendees automatically, but it's your responsibility to confirm you're operating within the rules.",
        },
      ],
      explanation:
        "Transcription tools give you a complete record without splitting your attention. The key tradeoffs: verbatim output needs summarization, and consent is always required.",
    },
    {
      slug: "summarizing-transcripts",
      title: "Summarizing Transcripts with AI",
      blurb: "Turn 40 minutes of raw transcript into a 5-line summary that actually gets read.",
      xp: 25,
      kind: "quiz",
      content: `# Summarizing Transcripts with AI

A raw transcript is evidence. A summary is communication. Almost nobody reads a
full transcript — but a tight 5-line summary gets forwarded, acted on, and
remembered.

AI can transform a long transcript into a summary in seconds. The quality of the
output depends almost entirely on how clearly you define what "good" looks like.

**A weak prompt:**

> "Summarize this transcript."

This produces a generic paragraph that tries to be everything and serves no one.

**A strong prompt:**

> "You are summarizing a 45-minute product planning meeting. Attendees were the PM,
> two engineers, and the design lead. Please produce:
> 1. A 3–5 sentence executive summary of what was decided and why.
> 2. A bulleted list of the 3–5 most important discussion points.
> 3. Any open questions that were raised but not resolved.
> 4. Do NOT include action items — those go in a separate section.
> [TRANSCRIPT BELOW]"

By separating concerns (summary vs. action items vs. open questions), you get
clean, scannable sections instead of a blob.

**Additional techniques:**

- Ask for a **one-line subject line** you can use as the email subject.
- Ask it to **flag any commitments made** (someone said they'd do something).
- Ask it to **surface any disagreements** that were papered over but not resolved.
- For a long transcript, paste it in **chunks** with a note: "This is part 1 of 2;
  don't summarize yet." Then prompt the summary after the last chunk.`,
      questions: [
        {
          prompt:
            "Why does 'Summarize this transcript' often produce a disappointing result?",
          options: [
            "AI cannot process transcripts",
            "It's too vague — the model doesn't know whether you want decisions, discussion points, open questions, or all three, or how long or structured the output should be",
            "Transcripts are always too short for AI to work with",
          ],
          answer: 1,
          explanation:
            "Vague prompts produce vague outputs. A clear prompt that defines structure, length, and what to include vs. exclude lets the model produce something immediately usable.",
        },
        {
          prompt:
            "What is the advantage of asking AI to produce separate sections (summary, decisions, open questions) rather than one paragraph?",
          options: [
            "It makes the output longer, which means more detail",
            "Each section serves a different reader and use case — a manager skims the summary; an engineer tracks the action items; a PM watches the open questions",
            "AI can only work with clearly numbered requests",
          ],
          answer: 1,
          explanation:
            "Separating concerns makes the output scannable and actionable. Different people need different parts, and a structured format makes it easy to forward just the relevant section.",
        },
        {
          prompt:
            "A meeting transcript is very long and might exceed the AI's context limit. A practical approach is to:",
          options: [
            "Summarize only the first few minutes and discard the rest",
            "Paste the transcript in labeled chunks, telling the AI to wait to summarize until the last chunk is submitted",
            "Retype the transcript by hand to make it shorter",
          ],
          answer: 1,
          explanation:
            "Chunking with explicit instructions (e.g., 'this is part 1 of 3 — hold off on summarizing') lets you feed long transcripts without losing content. Summarize only after all parts are in.",
        },
      ],
      explanation:
        "Define the structure you want before pasting the transcript. Separate sections for summary, decisions, and open questions produces output people will actually read.",
    },
    {
      slug: "extracting-action-items",
      title: "Extracting Action Items",
      blurb: "Get a clean, owner-assigned to-do list from any transcript or notes.",
      xp: 25,
      kind: "quiz",
      content: `# Extracting Action Items

The most common meeting failure is not bad discussion — it's good discussion that
produces no follow-through. Action items get lost because they were mentioned once,
captured vaguely, and never assigned a clear owner or deadline.

AI is very good at combing a transcript for commitments. A well-formed action item
has three parts: **who, what, and by when.** A prompt that asks for all three forces
both you and the AI to surface missing information.

**A strong extraction prompt:**

> "Read this meeting transcript and extract every action item. For each one, produce:
> - Owner (name or role if no name given)
> - Task (one clear sentence — what exactly needs to happen)
> - Due date or timeframe (use 'not specified' if none was mentioned)
> Format as a numbered list. [TRANSCRIPT BELOW]"

**What to watch for in the output:**

- **Vague owners:** "The team will…" is not an owner. Flag these for the meeting
  facilitator to resolve.
- **Missing deadlines:** "We'll look into that" is not a deadline. Mark as TBD and
  follow up.
- **Implied commitments:** Someone says "I can handle that" mid-conversation. AI
  should catch these, but scan for any it missed.
- **Hallucinated items:** Occasionally the model infers an action that wasn't
  actually committed to. Read the list and cross-check anything that feels unfamiliar.

After generating the list, send it to attendees for confirmation before treating it
as official. A one-line note — "Here's what I captured — please flag anything
missing or incorrect" — surfaces corrections fast.`,
      questions: [
        {
          prompt: "A well-formed action item includes which three components?",
          options: [
            "The meeting date, the attendee count, and the room number",
            "Who owns it, what exactly needs to happen, and by when",
            "The topic area, the presenter's name, and the slide number",
          ],
          answer: 1,
          explanation:
            "Owner + task + deadline is the minimum for an actionable item. Missing any one of those three means the item will likely not get done.",
        },
        {
          prompt:
            "The AI extraction produces the item: 'The team will look into pricing.' What's the problem?",
          options: [
            "Nothing — that's a perfectly actionable item",
            "Both 'the team' (no specific owner) and 'look into' (no clear outcome or deadline) make this unactionable as written",
            "The item should have been assigned to the PM",
          ],
          answer: 1,
          explanation:
            "Vague owner and vague task are the two most common failure modes. This item needs a named person, a concrete deliverable, and a date before it can be tracked.",
        },
        {
          prompt:
            "Before treating the AI-generated action item list as official, you should:",
          options: [
            "Publish it immediately — AI output is always accurate",
            "Send it to attendees with a note asking them to flag anything missing or wrong, then confirm",
            "Delete any items marked 'not specified' since they can't be tracked",
          ],
          answer: 1,
          explanation:
            "A quick confirmation round surfaces missed items, corrects misattributions, and gives owners a chance to push back on deadlines — all before anyone starts working from a bad list.",
        },
      ],
      explanation:
        "Prompt for owner + task + deadline, watch for vague ownership and implied commitments, and confirm with attendees before treating the list as official.",
    },
    {
      slug: "writing-followup-emails",
      title: "Writing Follow-Up Emails with AI",
      blurb: "Draft a clear, complete follow-up in under two minutes using the meeting output.",
      xp: 20,
      kind: "quiz",
      content: `# Writing Follow-Up Emails with AI

The follow-up email is the meeting's paper trail. Done well, it closes the loop,
confirms shared understanding, and gives everyone a reference for action items and
decisions. Done poorly — or not at all — it leaves room for misremembering.

AI makes this fast. Once you have a summary and an action-item list, drafting the
email is a one-minute task.

**A reliable prompt:**

> "Write a follow-up email for the meeting described below. The audience is the
> attendees (internal team). Tone: professional but friendly, not stiff. Include:
> a one-sentence reminder of what the meeting was for, the key decisions made, the
> action items (formatted as a bulleted list with owner and due date), and any
> follow-up meeting scheduled. Keep it under 200 words. Sign off as [your name].
>
> SUMMARY: [paste your AI-generated summary]
> ACTION ITEMS: [paste your AI-generated list]"

**Adjusting tone and audience:**

- For an external client: *"Tone: polished and formal. Do not mention internal
  disagreements. Focus on next steps and our commitments."*
- For an async team: *"Add a TL;DR at the top so people can skip the detail."*
- For a large group: *"Omit names of specific owners — link to a shared task tracker
  instead."*

**One practical tip:** include the raw action item list in the email (not just in
the summary). People scan emails quickly. A visible, numbered list of who-does-what
is far more likely to be acted on than a paragraph that buries the commitments.`,
      questions: [
        {
          prompt:
            "What makes a follow-up email worth sending rather than just archiving the transcript?",
          options: [
            "Follow-up emails are required by law after every meeting",
            "They close the loop, confirm shared understanding, and give everyone a single reference for decisions and next steps",
            "They replace the need to have the meeting at all",
          ],
          answer: 1,
          explanation:
            "The follow-up email is where spoken commitments become written ones. It surfaces misalignments, gives owners a visible to-do, and creates a record everyone agreed to.",
        },
        {
          prompt:
            "Which approach makes action items more likely to be completed after the follow-up email is sent?",
          options: [
            "Describing them in a paragraph buried at the bottom",
            "Formatting them as a visible bulleted or numbered list with owner and due date near the top",
            "Attaching the full transcript so people can find them themselves",
          ],
          answer: 1,
          explanation:
            "People scan emails. A formatted list with owner + deadline is visible at a glance. Burying commitments in prose or in an attachment means most people will miss them.",
        },
        {
          prompt:
            "You're writing a follow-up for a meeting with an external client. How should you adjust the AI prompt?",
          options: [
            "No adjustment needed — internal and external emails are the same",
            "Specify a more formal tone, omit internal disagreements, and focus on your team's commitments and next steps",
            "Make it longer to show more effort",
          ],
          answer: 1,
          explanation:
            "External emails carry different stakes — tone, confidentiality, and what you surface all matter more. Adjusting the prompt with those constraints produces a client-safe draft rather than an internal candid one.",
        },
      ],
      explanation:
        "Pass your AI-generated summary and action items into a well-scoped email prompt. The result: a clear, structured follow-up in under two minutes.",
    },
    {
      slug: "meeting-notes-capstone",
      title: "Capstone: Your Full Meeting Workflow",
      blurb: "End-to-end: from agenda to archive — and knowing when AI helps vs. hinders.",
      xp: 25,
      kind: "quiz",
      content: `# Capstone: Your Full Meeting Workflow

You now have the pieces. Let's assemble them into a repeatable workflow and stress-test
your judgment on where AI helps and where to be careful.

**The full workflow:**

1. **24 hours before:** Paste the meeting goal, attendees, and duration into AI.
   Get an agenda draft. Review and distribute.

2. **At the start:** Enable transcription (or a meeting assistant bot). Notify
   participants that the call is being transcribed.

3. **During:** Be present. Let the tool capture. Take only minimal notes for your
   own reference — names, quick decisions, anything the transcript might miss.

4. **Within 30 minutes after:** Paste the transcript (or your rough notes) into AI.
   Prompt for: executive summary, key decisions, action items (owner + task + date),
   and open questions. Review all four sections.

5. **Send the follow-up:** Prompt AI to draft the email using the output from step 4.
   Adjust tone for audience. Send within two hours while context is fresh.

6. **Archive:** Save the transcript and the structured notes to a shared folder or
   knowledge base. Tag by date, project, and participants so it's searchable later.

**Where AI helps most:** Drafting, extracting, and formatting — all the rote
language work that is tedious but not judgment-intensive.

**Where humans must stay in the loop:** Deciding what matters, catching hallucinated
action items, setting the right tone for sensitive communications, protecting
confidential content, and ensuring owners actually know they own something.

The goal is not to automate meetings — it's to eliminate the busywork around them
so the human parts get more attention.`,
      questions: [
        {
          prompt:
            "In the full meeting workflow, which step is most important for ensuring action items are followed through?",
          options: [
            "Using the most expensive transcription tool available",
            "Reviewing the AI-extracted action items for accuracy — checking owners, tasks, and deadlines — and confirming with attendees before treating the list as official",
            "Sending the follow-up email at exactly the right time of day",
          ],
          answer: 1,
          explanation:
            "Technology captures; humans decide. Reviewing and confirming the action-item list is the moment where spoken intent becomes verified commitment. Skipping it is where follow-through breaks down.",
        },
        {
          prompt:
            "Which task in the meeting workflow should remain primarily a human judgment call rather than being handed entirely to AI?",
          options: [
            "Formatting the action item list as bullets",
            "Deciding what information is sensitive and should not be included in the client-facing follow-up",
            "Generating a first draft of the agenda from the meeting goal",
          ],
          answer: 1,
          explanation:
            "AI can draft and format; it can't reliably judge organizational politics, confidentiality obligations, or which details would damage a client relationship. Those calls belong to you.",
        },
        {
          prompt:
            "Two weeks after a meeting, a teammate asks what was decided about the feature scope. Your best response time comes from:",
          options: [
            "Asking the original meeting organizer to remember what was said",
            "Searching your archived meeting notes — the tagged transcript and structured summary saved right after the meeting",
            "Re-running the meeting to reconstruct the decision",
          ],
          answer: 1,
          explanation:
            "The archive step (saving tagged transcripts and structured notes) turns one-time meetings into a searchable organizational memory. Without it, decisions evaporate within weeks.",
        },
      ],
      explanation:
        "Prep, capture, summarize, extract, follow up, archive. AI handles the rote work at each step — you handle the judgment. That division makes the whole workflow sustainable.",
    },
  ],
};
