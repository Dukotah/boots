import type { Module } from "./types";

// Time Management for Developers — practical, quiz-only module covering how
// software engineers can take ownership of their time: planning systems, deep
// work, async communication, meetings, context-switching, burnout prevention,
// and sustainable throughput. No coding exercises — all quiz/reading lessons.
export const timeManagementDevs: Module = {
  slug: "time-management-devs",
  title: "Time Management for Developers",
  description:
    "Shipping code is partly a skill problem and partly a time problem. Learn how to plan sprints and days, protect deep-work blocks, handle async communication without constant interruption, run leaner meetings, recover from context-switching, and build habits that compound over a career — without burning out.",
  emoji: "⏱️",
  gradient: "from-blue-500/20 to-indigo-500/10",
  tagline:
    "Protect your deep-work hours, cut meeting overhead, and build sustainable habits that let you ship more without burning out.",
  keywords: [
    "time management for developers",
    "deep work programming",
    "developer productivity",
    "how to focus as a programmer",
    "avoid burnout software engineer",
    "async communication developer",
    "sprint planning tips",
    "context switching developers",
  ],
  lessons: [
    {
      slug: "why-time-feels-broken",
      title: "Why Time Feels Broken for Developers",
      blurb:
        "Coding demands long unbroken focus — but most workplaces are built to shatter it. Here's the mismatch.",
      xp: 20,
      kind: "quiz",
      content: `# Why Time Feels Broken for Developers

Writing software is a **depth-first** activity. To hold a complex system in your head —
data flowing through layers, edge cases, state — you need sustained, unbroken focus.
Researchers and practitioners often call this **deep work**: cognitively demanding
tasks that push your cognitive capacity and create real value.

The problem is that most workplaces are organised for **coordination**, not depth.
Slack pings, stand-ups, PR review requests, ad-hoc questions, and calendar invites
all fragment the day into dozens of short slots — exactly what deep work cannot use.

A few numbers that put the damage in perspective:

- Studies on knowledge workers consistently find it takes **15–25 minutes** to
  reach a state of full focus after an interruption.
- A developer interrupted just **4 times in a morning** may never reach peak
  concentration at all.
- **Context-switching** between tasks compounds the problem: the brain carries
  residue from the previous task into the new one, degrading both.

Understanding this mismatch is the first step. The goal isn't to eliminate
communication — it's to **batch and buffer** it so your deep-work periods stay
protected while collaboration still happens effectively.`,
      questions: [
        {
          prompt:
            "A developer is interrupted 4 times before lunch. What is the most likely outcome?",
          options: [
            "They complete the same amount of deep work as usual, just more efficiently.",
            "They may never reach full concentration during that morning at all.",
            "Interruptions have no measurable effect on developer output.",
          ],
          answer: 1,
          explanation:
            "Each interruption resets the ramp-up clock. Four interruptions in a morning can consume most of the available focus budget before genuine deep work begins.",
        },
        {
          prompt: "Why is writing software particularly sensitive to interruptions?",
          options: [
            "Developers are less experienced at multitasking than other knowledge workers.",
            "It requires holding a large, complex mental model in working memory — which an interruption collapses.",
            "Programming languages are too verbose, making restarts slow.",
          ],
          answer: 1,
          explanation:
            "The mental model of a non-trivial codebase is large and fragile. Rebuilding it after a disruption costs significant time, which is why unbroken focus is essential.",
        },
        {
          prompt: "What does 'context-switching residue' mean for a developer?",
          options: [
            "Leftover memory consumed by browser tabs.",
            "The cognitive cost of carrying mental threads from one task into the next, degrading focus on both.",
            "Git branches that were never merged.",
          ],
          answer: 1,
          explanation:
            "When you switch tasks, your brain doesn't cleanly wipe the previous task. That residual mental load impairs performance on the new task — the cost is paid on both ends.",
        },
      ],
      explanation:
        "The core insight: deep work and constant availability are fundamentally incompatible. Recognising this mismatch is what makes every productivity technique in this module make sense.",
    },
    {
      slug: "planning-your-week-and-day",
      title: "Planning Your Week and Day",
      blurb:
        "Weekly intent-setting and daily time-blocking keep your effort aimed at what actually matters.",
      xp: 20,
      kind: "quiz",
      content: `# Planning Your Week and Day

Effective developer time management starts at **two horizons**: the week and the day.

## Weekly Planning (15–30 minutes, usually Monday morning)

1. **Review your commitments** — sprint tickets, deadlines, meetings already booked.
2. **Identify the 1–3 things** that, if done, would make the week a clear success.
3. **Block time for them first.** Calendar slots for focused work are appointments
   with yourself — treat them as seriously as a meeting with your manager.
4. **Leave buffer.** Unplanned work (production incidents, urgent reviews) always
   arrives; 20–30% unscheduled time absorbs it without derailing your week.

## Daily Planning (5–10 minutes, start of day)

- Scan your calendar and task list; decide what the **single most important thing**
  is to finish today.
- Group shallow tasks (emails, Slack, PR approvals) into **batched slots** rather
  than spreading them throughout the day.
- Choose a **hard stop** time — open-ended days expand to fill the space and
  accelerate burnout.

## The Shutdown Ritual

End each workday with a brief ritual: update your task list, confirm tomorrow's
first task, close your editor. This signals to your brain that work is done, which
genuinely improves cognitive recovery outside work hours.`,
      questions: [
        {
          prompt:
            "When blocking time on your calendar for focused development work, you should treat those blocks as:",
          options: [
            "Suggestions that can be moved whenever a meeting request arrives.",
            "Real appointments — as firm as a meeting with your manager.",
            "Purely aspirational; real developers work reactively.",
          ],
          answer: 1,
          explanation:
            "If deep-work blocks yield to every meeting request, they never happen. Treating them as firm appointments is what makes protected focus time real rather than theoretical.",
        },
        {
          prompt: "Why is leaving 20–30% of the week unscheduled a good idea?",
          options: [
            "To give yourself permission to slack off.",
            "Because unplanned work (incidents, urgent reviews) always arrives and needs room without wrecking committed plans.",
            "Managers prefer to see open calendar slots.",
          ],
          answer: 1,
          explanation:
            "A fully packed schedule has zero slack. Any surprise — an incident, an urgent code review, a colleague needing help — immediately overruns the plan. Buffer is a load-bearing feature, not wasted time.",
        },
        {
          prompt: "What is the main benefit of a daily 'shutdown ritual' at the end of the workday?",
          options: [
            "It logs your hours automatically in JIRA.",
            "It gives your brain a clear signal that work is done, improving recovery and mental separation outside work.",
            "It prevents your computer from running background updates.",
          ],
          answer: 1,
          explanation:
            "Without a deliberate close, work thoughts bleed into evenings, degrading rest and recovery. A brief ritual — task list updated, tomorrow's first task confirmed — creates a psychological boundary.",
        },
      ],
      explanation:
        "Two horizons, two rituals: a weekly plan that locks in your most important work first, and a daily shutdown that ends work on purpose rather than letting it drift.",
    },
    {
      slug: "protecting-deep-work",
      title: "Protecting Deep Work",
      blurb:
        "Unbroken focus blocks are your most valuable asset — learn to create and defend them.",
      xp: 25,
      kind: "quiz",
      content: `# Protecting Deep Work

Once you know when your peak focus hours are (most developers are sharpest in the
**morning before many interruptions begin**), the goal is simple: **get those hours
into the calendar and defend them**.

## Practical tactics

**Batch async communication.** Designate 2–3 check-in windows per day — for
example, 9:00 am, 1:00 pm, 4:30 pm — and close Slack and email outside those
windows. Most messages are not emergencies; a 2–3 hour response time is
professionally fine and still leaves urgent channels (a phone call, a direct ping)
open.

**Communicate your system.** Tell your team: "I'm offline 9–12 to finish the auth
refactor; urgent? ping me on mobile." Transparency is what makes async gaps feel
collaborative rather than rude.

**Use 'Do Not Disturb' deliberately.** Every modern OS and communication tool has
a DND mode. Use it during focus blocks, not just when you happen to remember.

**Work in long blocks.** Research and practitioner reports consistently show that
cognitively complex tasks (a hard algorithm, a new architecture, a gnarly bug)
require at least **90 minutes** to enter genuine flow. Schedule 90-minute minimum
blocks, not 30-minute slivers between meetings.

**Have a 'start-up ritual.'** A short, consistent sequence (brew coffee, open
your notes from yesterday, read the task for two minutes) signals to your brain
that a focus session has begun, shortening the ramp-up time.`,
      questions: [
        {
          prompt:
            "Why do most productivity experts recommend at least 90-minute focus blocks for complex development tasks?",
          options: [
            "JIRA sprint cycles are two weeks, so 90 minutes is proportional.",
            "Cognitively demanding work requires sufficient ramp-up plus sustained depth — 30-minute slivers rarely allow either.",
            "Shorter blocks cause more merge conflicts.",
          ],
          answer: 1,
          explanation:
            "It takes 15–25 minutes just to rebuild the mental model after starting a session. Add the work itself and you need at least 90 minutes for a block to pay off — less than that, and you're mostly just warming up before you have to stop.",
        },
        {
          prompt:
            "A developer batches Slack to three check-in windows per day and communicates this to their team. The most likely outcome is:",
          options: [
            "Colleagues find them unresponsive and escalate to management.",
            "Most messages get answered within a few hours, and the developer gains large uninterrupted focus periods.",
            "Response time improves because they read Slack more carefully.",
          ],
          answer: 1,
          explanation:
            "Most Slack messages are not genuinely urgent. A 2–3 hour response window is professionally standard and rarely causes real problems, while protecting large blocks of deep work.",
        },
        {
          prompt: "What is the main purpose of a personal 'start-up ritual' before a focus block?",
          options: [
            "To log hours for billing purposes.",
            "To signal to your brain that a deep-work session is beginning, shortening the mental ramp-up time.",
            "To review your manager's calendar for conflicts.",
          ],
          answer: 1,
          explanation:
            "A consistent pre-work sequence conditions the brain to enter focus mode faster — the same principle as an athlete's warm-up routine. It reduces the wasted first 10–15 minutes of every session.",
        },
      ],
      explanation:
        "Deep work is a resource you create by design, not something that happens when you happen to have spare time. Batching communication, booking long blocks, and using rituals are the three levers.",
    },
    {
      slug: "async-communication",
      title: "Async-First Communication",
      blurb:
        "Write more, meet less — how async communication compounds developer productivity.",
      xp: 20,
      kind: "quiz",
      content: `# Async-First Communication

**Synchronous** communication (meetings, calls, real-time chat) requires both parties
to be present at the same moment. That's fine when real-time coordination is
genuinely needed — but most developer communication doesn't require it.

**Asynchronous** communication (written messages, comments, tickets, recorded
walkthroughs) lets the recipient respond when it fits their schedule — including
*after* a focus block, not *instead of* one.

## When to use which

| Situation | Preferred mode |
|---|---|
| Architecture decision, high ambiguity | Real-time (meeting or call) |
| Code review feedback | Async (inline comments) |
| Status updates | Async (ticket or doc) |
| Blocked and time-sensitive | Real-time (direct ping) |
| Knowledge sharing | Async (doc + optional recorded demo) |

## Writing async messages that work

- **Lead with the ask.** State what you need in the first sentence.
- **Provide context.** Don't make the reader ask three follow-up questions.
- **Specify the urgency.** "No rush — before Friday" vs "blocking me now."
- **Prefer docs over threads.** A shared doc with comments scales; a Slack thread
  gets buried and lost.

The best async cultures produce better written artefacts (decisions are documented,
reasoning is captured) and give every team member — especially those in different
time zones — an equal voice.`,
      questions: [
        {
          prompt:
            "Which of these situations is best handled synchronously (a real-time meeting or call)?",
          options: [
            "Sharing a weekly status update with the team.",
            "Making a high-ambiguity architectural decision where immediate back-and-forth is needed.",
            "Leaving feedback on a pull request.",
          ],
          answer: 1,
          explanation:
            "High-ambiguity decisions benefit from real-time dialogue because many small clarifications happen fast. Status updates and code review feedback are well-suited to async: they don't require instant exchange.",
        },
        {
          prompt:
            "What is the most important structural element of a well-written async message?",
          options: [
            "A formal greeting and sign-off.",
            "Leading with the ask so the reader immediately knows what is needed.",
            "A full summary of every decision made in the past week.",
          ],
          answer: 1,
          explanation:
            "Burying the ask at the end forces the reader to read everything before knowing what to do. Leading with the ask respects the reader's time and reduces the chance of them missing the point.",
        },
        {
          prompt:
            "Why do async-first teams tend to produce better documentation as a side effect?",
          options: [
            "Async tools automatically export chat logs to a wiki.",
            "Writing decisions and reasoning down — because that's how you communicate async — creates a natural, searchable record.",
            "Async teams have fewer meetings, so they have more time to write docs.",
          ],
          answer: 1,
          explanation:
            "In a sync-heavy culture, decisions live in people's heads or in un-searchable meeting recordings. Writing is the primary async medium, so decisions, rationale, and context get captured as a natural byproduct.",
        },
      ],
      explanation:
        "Default to async; escalate to sync only when genuine real-time back-and-forth is needed. Good async writing is a skill — clear ask, enough context, stated urgency — and it compounds into a better-documented, more inclusive team.",
    },
    {
      slug: "meetings-and-calendar-hygiene",
      title: "Meetings and Calendar Hygiene",
      blurb:
        "Every meeting is a context-switch. Run fewer, shorter, better ones — or decline the rest.",
      xp: 20,
      kind: "quiz",
      content: `# Meetings and Calendar Hygiene

A one-hour meeting for a five-person team costs the organisation five hours of
human time — and for each attendee, likely costs another 15–25 minutes of
re-entry time on either side. That's a high price; it should be worth paying.

## The meeting quality checklist

Before accepting or scheduling a meeting, ask:

1. **Is there a clear outcome?** "Discuss X" is not an outcome. "Decide between
   option A and B" is.
2. **Could this be a document?** Status updates, announcements, and one-way
   briefings don't need a meeting.
3. **Who genuinely needs to be there?** Every extra attendee who is there
   "just in case" or "to stay in the loop" is paying the fragmentation cost.

## Practical tactics

- **Decline meetings that have no agenda.** A no-agenda meeting has no clear
  outcome and can't be prepared for.
- **Protect mornings.** Try to keep your best focus hours free of recurring
  meetings; cluster meetings in the afternoon when energy dips.
- **Use 25- and 50-minute meetings** instead of 30 and 60. The 5–10 minutes
  between meetings give everyone a break and a buffer — and meetings end on time.
- **End with decisions and owners.** Every meeting should close with a written
  summary: what was decided, who owns what, and by when. If nobody writes this
  down, the meeting may as well not have happened.`,
      questions: [
        {
          prompt:
            "A recurring weekly team meeting has no agenda and usually ends without documented decisions. The best response is to:",
          options: [
            "Attend anyway — declining would be politically risky.",
            "Propose adding a written agenda and decision log, or suggest replacing it with a written async update.",
            "Schedule a separate meeting to discuss the meeting.",
          ],
          answer: 1,
          explanation:
            "A no-agenda meeting can't produce decisions efficiently. Proposing an agenda (or an async replacement) directly addresses the root problem rather than working around it.",
        },
        {
          prompt: "Why are 25- and 50-minute meetings preferable to 30 and 60?",
          options: [
            "Shorter meetings look better in productivity reports.",
            "The buffer between meetings gives attendees time to decompress and transition, which reduces cognitive cost and keeps meetings from running over.",
            "Most calendar apps only support those durations.",
          ],
          answer: 1,
          explanation:
            "Hard-stopping at the top of the hour leads to back-to-back meetings with no transition time. A 5–10 minute gap is enough to reset, use the bathroom, and arrive at the next meeting present rather than frazzled.",
        },
        {
          prompt:
            "Every meeting should close with:",
          options: [
            "A slide deck summarising the discussion.",
            "A written record of decisions made, actions owned, and deadlines.",
            "An invitation to a follow-up meeting to review progress.",
          ],
          answer: 1,
          explanation:
            "Without written decisions and owners, meetings are conversation with no durability. A short written close (even three bullet points in the meeting chat) transforms the meeting into a reference document.",
        },
      ],
      explanation:
        "Good meeting hygiene is not antisocial — it's respectful of everyone's time. Clear agendas, right-sized attendee lists, and written closes make meetings rare, short, and actually useful.",
    },
    {
      slug: "burnout-and-sustainable-pace",
      title: "Burnout and Sustainable Pace",
      blurb:
        "Burning bright today means burning out tomorrow. Sustainable throughput beats heroic sprints.",
      xp: 25,
      kind: "quiz",
      content: `# Burnout and Sustainable Pace

Developer burnout is a genuine occupational hazard. It's not weakness — it's
the predictable result of sustained high cognitive load without adequate recovery.

## What burnout actually is

Burnout (in the clinical sense popularised by researchers Maslach and Leiter)
has three dimensions:

1. **Exhaustion** — depleted emotional and cognitive reserves.
2. **Cynicism/Detachment** — growing distance from the work and the team.
3. **Reduced efficacy** — feeling that your efforts no longer make a difference.

It develops gradually, often while a developer is being praised for their output.
By the time burnout is obvious, it typically takes weeks or months to recover fully.

## Sustainable pace practices

- **Respect the sprint plan.** Agile's sustainable pace principle means teams
  deliver a consistent velocity, not sprinting until exhausted and crashing.
- **End work at a set time.** Chronic overwork is not dedication — it's debt.
  Every extra hour today reduces cognitive capacity tomorrow.
- **Protect recovery time.** Sleep is a performance variable, not a luxury.
  Rest, hobbies, and physical movement restore the cognitive capacity that work
  depletes. They are not in competition with productivity — they enable it.
- **Surface problems early.** Burnout accelerates when developers feel they
  can't speak up about an unrealistic workload. A culture where scope concerns
  can be raised early prevents the silent crunch that leads to burnout.
- **Take PTO — fully.** A vacation where you're checking email is not recovery.`,
      questions: [
        {
          prompt:
            "Burnout in developers is best described as:",
          options: [
            "A sign of insufficient technical skills that causes frustration.",
            "A predictable outcome of sustained high cognitive load without adequate recovery, characterised by exhaustion, cynicism, and reduced efficacy.",
            "A temporary motivation slump that resolves after a long weekend.",
          ],
          answer: 1,
          explanation:
            "Burnout has a clinical definition — three specific dimensions — and develops over time regardless of skill level. It typically takes weeks or months to recover from, not days.",
        },
        {
          prompt:
            "A developer regularly works two to three hours of overtime every day to 'stay on top of things.' What is the most likely long-term outcome?",
          options: [
            "They permanently increase their baseline productivity.",
            "They accrue cognitive debt that reduces daily capacity, increasing the risk of burnout and errors.",
            "Overtime above a certain threshold activates enhanced focus.",
          ],
          answer: 1,
          explanation:
            "Chronic overwork reduces, not increases, sustainable output. Each extra hour depletes cognitive reserves used the next day. The net effect over weeks is lower quality, slower work, and higher burnout risk.",
        },
        {
          prompt:
            "In an Agile context, 'sustainable pace' means:",
          options: [
            "Working as fast as possible until the sprint deadline, then resting.",
            "Maintaining a consistent, predictable velocity the team can sustain indefinitely without degradation.",
            "Completing 80% of sprint tickets and carrying 20% into the next sprint as a buffer.",
          ],
          answer: 1,
          explanation:
            "Agile's sustainable pace principle explicitly rejects heroic sprinting followed by recovery. The goal is a tempo teams can maintain every sprint — which produces better long-run output than boom-and-bust cycles.",
        },
      ],
      explanation:
        "Sustainable pace is a professional skill, not a personal indulgence. Respecting cognitive limits, ending work on time, and protecting recovery are what allow a developer to ship high-quality work year after year rather than burning out in months.",
    },
    {
      slug: "time-management-capstone",
      title: "Capstone: Building Your Time System",
      blurb:
        "Pull all seven lessons together into a personal time system you can start using Monday.",
      xp: 25,
      kind: "quiz",
      content: `# Capstone: Building Your Time System

You've covered the landscape. Now the goal is to **build one coherent system**
that fits your actual context — your role, your team's culture, your energy
patterns — rather than cherry-picking tactics that sound good but never stick.

## The five-layer time system for developers

1. **Horizon 1 — Week:** Sunday or Monday, set your 1–3 must-win outcomes.
   Block deep-work time for them before anything else fills the calendar.
2. **Horizon 2 — Day:** Morning micro-plan (5 min). One top task, batched
   async windows, a hard stop time.
3. **Protection layer:** Async-first by default. DND during focus blocks.
   A communicated schedule your team knows and respects.
4. **Meeting hygiene:** Only attend meetings with a clear outcome. Propose
   async alternatives for status and announcements. End every meeting with
   written decisions and owners.
5. **Recovery layer:** Set stop times. Protect sleep, exercise, and genuine
   off time. Surface scope concerns early. Take PTO fully.

## Making it stick

The research on habit formation is clear: **implementation intentions** — if-then
plans ("when X happens, I will do Y") — are far more effective than vague
resolutions. Map your blockers:

- "When a meeting invite arrives with no agenda, I will reply asking for one."
- "When my morning focus block is over, I will open Slack for the first time."
- "When I feel the urge to check email one more time at 8 pm, I will close the
  laptop instead."

Your system doesn't need to be perfect on day one — it needs to be **running**.
Adjust weekly. A 10% improvement in how you use your 40 hours is worth more than
any single productivity tool.`,
      questions: [
        {
          prompt:
            "A developer wants to build a sustainable time system. Which starting point has the highest leverage?",
          options: [
            "Installing a new task management app.",
            "Booking weekly and daily planning slots on the calendar before the week fills up, and blocking protected focus time.",
            "Declining every meeting indefinitely.",
          ],
          answer: 1,
          explanation:
            "The structural moves — weekly intent-setting and protected focus blocks — create the container that all other tactics fit into. Apps and tactics without structure tend to get abandoned because the calendar still controls the day.",
        },
        {
          prompt:
            "What makes 'implementation intentions' more effective than general productivity resolutions?",
          options: [
            "They are written down, which legally binds you to follow through.",
            "They specify a concrete trigger and a concrete response — removing the decision from the moment of friction.",
            "They are shorter and easier to remember.",
          ],
          answer: 1,
          explanation:
            "A vague resolution ('I'll manage my time better') fails at the first obstacle because there is no plan for that obstacle. An implementation intention ('when an agenda-less invite arrives, I will ask for an agenda') pre-loads the decision, making the right action automatic.",
        },
        {
          prompt:
            "Which statement best captures what 'sustainable throughput' means for a developer's career?",
          options: [
            "Shipping as much as possible in the next quarter regardless of cost.",
            "Maintaining a consistent, high-quality output over years by protecting cognitive capacity, not just maximising short-term hours.",
            "Working at a slow pace to avoid any risk of burnout.",
          ],
          answer: 1,
          explanation:
            "Sustainable throughput is not about working slowly — it is about working at a pace that compounds over a career. Burning out, quitting, or producing low-quality work from exhaustion are all throughput failures. Protecting cognitive capacity is what makes high output durable.",
        },
      ],
      explanation:
        "A time system is not a collection of tips — it is a set of structures and if-then responses you run consistently. Weekly intent, daily plans, async-first defaults, lean meetings, and genuine recovery: five layers that compound into a career's worth of sustainable output.",
    },
  ],
};
