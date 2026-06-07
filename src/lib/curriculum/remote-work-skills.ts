import type { Module } from "./types";

// Thriving as a Remote Developer — all quiz lessons covering the mindset,
// habits, tooling, communication, and career patterns that separate remote
// developers who flourish from those who drift. Practical, no hype, grounded
// in what actually works as of 2026.
export const remoteWorkSkills: Module = {
  slug: "remote-work-skills",
  title: "Thriving as a Remote Developer",
  emoji: "🏠",
  gradient: "from-sky-500/20 to-cyan-500/10",
  description:
    "Remote work is a skill, not just a perk. Master async communication, visible progress, deep focus, remote-first tooling, and the career habits that let distributed developers do their best work — and get credit for it.",
  tagline:
    "The communication, focus, and visibility habits that let remote developers thrive long-term.",
  keywords: [
    "remote work for developers",
    "async communication",
    "remote developer habits",
    "work from home developer",
    "distributed team",
    "remote developer career",
    "remote work tips",
  ],
  lessons: [
    {
      slug: "async-first-mindset",
      title: "The Async-First Mindset",
      blurb: "Why defaulting to async communication makes distributed teams faster, not slower.",
      xp: 20,
      kind: "quiz",
      content: `# The Async-First Mindset

The biggest shift in remote work isn't the location — it's **time**. When your
teammates span time zones, synchronous (real-time) communication becomes the
bottleneck. Async-first teams move faster precisely because they resist defaulting
to meetings.

**Async-first means:**
- Write things down so others can consume them when it fits *their* schedule.
- Treat meetings as a last resort for decisions that genuinely need real-time
  alignment — not as the default way to share information.
- Give context up front, because you can't rely on instant back-and-forth to
  clarify.

**The biggest async-first habits:**

1. **Write complete messages.** Include what you need, why you need it, what
   you've already tried, and when you need it by. Assume you won't get a reply for
   hours.
2. **Make decisions visible.** Record what was decided and why in a place the whole
   team can find it later (docs, tickets, PR descriptions — not just DMs).
3. **Separate "I am blocked" from "I need a meeting."** Being blocked is urgent;
   most information-sharing is not.

Async-first doesn't mean never meeting. It means every meeting must earn its
timeslot by being a problem that genuinely needs a group conversation to solve.`,
      questions: [
        {
          prompt:
            "Your team lead shares a project update. In an async-first culture, what's the right default channel for this?",
          options: [
            "A video call so everyone can hear it at the same time",
            "A written post in a shared doc or channel that teammates can read when they're available",
            "A series of DMs sent one by one to each person",
          ],
          answer: 1,
          explanation:
            "Async-first means information is written down and accessible on each reader's schedule. Video calls require every person to be free simultaneously, which is a heavy coordination cost.",
        },
        {
          prompt: "What should a well-written async message include?",
          options: [
            "Just the question — keep it short to respect people's time",
            "What you need, why you need it, what you've already tried, and your deadline",
            "Nothing — call instead so there's no ambiguity",
          ],
          answer: 1,
          explanation:
            "Because you can't rely on instant back-and-forth, complete context up front eliminates the round-trips that make async slow. A bare question often takes three exchanges to resolve what one complete message could have settled.",
        },
        {
          prompt: "When is a synchronous meeting actually the right call?",
          options: [
            "Whenever you need to share information with more than two people",
            "For decisions that genuinely require real-time group alignment — not for routine updates",
            "Whenever the topic feels complicated",
          ],
          answer: 1,
          explanation:
            "Meetings earn their place when the decision process itself benefits from live back-and-forth — navigating disagreement, nuanced trade-offs. Sharing information that can be read doesn't meet that bar.",
        },
      ],
      explanation:
        "Async-first is a communication discipline, not a ban on talking. Defaulting to written, complete messages keeps distributed teams fast and reduces time-zone friction.",
    },
    {
      slug: "making-work-visible",
      title: "Making Your Work Visible",
      blurb: "Out of sight is out of mind — here's how remote developers stay seen without self-promotion theater.",
      xp: 20,
      kind: "quiz",
      content: `# Making Your Work Visible

In an office, presence is automatic. You're seen at your desk, overheard in
hallways, noticed in the kitchen. Remote work strips all of that out. If you don't
actively make your work visible, your manager and teammates will underestimate what
you're shipping — not because they don't care, but because they literally can't see it.

**Visibility is not bragging.** It's providing the information your team needs to
coordinate and your manager needs to support you and advocate for you in reviews.

**Practical visibility habits:**

- **Daily or weekly written updates.** A short Slack/Teams post or standup note:
  what you shipped, what you're on next, anything blocking you. Takes two minutes;
  pays dividends for months.
- **Descriptive PR and commit messages.** Your git history is a searchable record
  of your judgment and output. "Fix bug" tells no story; "Fix null deref when user
  has no billing address — closes #482" does.
- **Document decisions, not just outcomes.** When you make a non-obvious call,
  leave a note in the PR, the ticket, or a shared doc explaining *why*. Future you
  and future teammates will thank you.
- **Surface wins without waiting to be asked.** If you solved a gnarly bug, cut
  load time significantly, or unblocked a teammate — say so in the team channel.
  Once. Briefly. Then move on.

Visibility compounds. A consistent lightweight signal over months builds a
reputation that survives re-orgs, new managers, and performance cycles.`,
      questions: [
        {
          prompt:
            "A remote developer ships solid work every week but never mentions it. What's the likely outcome over time?",
          options: [
            "Their manager will notice and reward them anyway",
            "Their contributions will be underestimated — not from malice, but because there's no signal",
            "Nothing changes; output is the only thing that matters",
          ],
          answer: 1,
          explanation:
            "Visibility in remote work is infrastructure. Without it, even strong output is invisible during performance reviews, project planning, and reorg decisions.",
        },
        {
          prompt: "Which commit message actually makes work visible?",
          options: [
            "'fix bug'",
            "'Fix null deref when user has no billing address — closes #482'",
            "'wip'",
          ],
          answer: 1,
          explanation:
            "A descriptive commit message turns your git history into a readable record of what you reasoned about and why. 'Fix bug' tells no story and helps no one — including yourself six months later.",
        },
        {
          prompt: "When you solve a significant problem, when should you mention it?",
          options: [
            "Never — mentioning your own work is self-promotion and unprofessional",
            "Once, briefly, in the appropriate team channel — then move on",
            "Repeatedly, to make sure everyone has seen it",
          ],
          answer: 1,
          explanation:
            "One clear, brief mention surfaces the information your team needs to coordinate and gives your manager the signal to advocate for you. Repeated mentions turn into noise.",
        },
      ],
      explanation:
        "Visibility is not theater — it's the communication infrastructure that replaces office presence. Brief, consistent signals over time build a durable professional reputation.",
    },
    {
      slug: "deep-focus-remote",
      title: "Deep Focus in a Remote Environment",
      blurb: "Your home office is designed to distract you. Here's how to reclaim the unbroken hours that hard problems require.",
      xp: 22,
      kind: "quiz",
      content: `# Deep Focus in a Remote Environment

Hard programming problems — the kind that move products forward — require **deep
work**: extended, uninterrupted stretches where you hold a complex system in your
head and make real progress. The remote environment, ironically, is optimized to
destroy this.

The threats:
- **Infinite notification surfaces** — Slack, email, GitHub, calendar pings,
  phone, browser tabs. Each one costs not just the interruption but the 15-20
  minutes it takes to re-enter the flow state.
- **The always-available trap** — because teammates know you're "just there," the
  implicit pressure to respond immediately is higher than in an office.
- **Home environment bleed** — laundry, deliveries, household members, the absence
  of the social cue that a desk is for work.

**What works:**

1. **Block time explicitly.** Put 2-3 hour "focus blocks" on your calendar and
   treat them like meetings you can't cancel. Teams that see busy time won't ping.
2. **Batch notifications.** Set Slack/email to notify you at scheduled intervals
   (e.g., top of each hour) rather than instantly. Most messages are not emergencies.
3. **Separate your communication context.** When you're in a focus block, close
   email and Slack. When you're in a communication window, respond fully. Don't
   blend the two.
4. **Use visual or status signals.** A clear status ("Deep work until 3pm — will
   respond after") sets expectations without you having to actively manage every
   conversation.
5. **Protect your peak hours.** Know when your cognition is sharpest and defend
   those hours from meetings.`,
      questions: [
        {
          prompt:
            "A notification interrupts you mid-task. Beyond the moment it takes to read it, what's the main hidden cost?",
          options: [
            "None — you can pick up exactly where you left off immediately",
            "It takes roughly 15-20 minutes to fully re-enter the deep focus state you were in",
            "It only matters if the notification is from your manager",
          ],
          answer: 1,
          explanation:
            "Research on interruption recovery consistently shows it takes 15-20 minutes to rebuild the mental context needed for complex work. A small number of interruptions can wipe out most of a day's deep work capacity.",
        },
        {
          prompt:
            "What's the most effective way to handle incoming Slack messages during a focus block?",
          options: [
            "Respond to each one immediately to show you're engaged",
            "Batch notifications to scheduled check-in times and set a clear status showing when you'll be back",
            "Quit Slack permanently",
          ],
          answer: 1,
          explanation:
            "Batching gives you uninterrupted stretches while still being reliably responsive. A clear status manages expectations so teammates don't feel ignored.",
        },
        {
          prompt: "What does 'protecting your peak hours' mean in practice?",
          options: [
            "Always starting work at the same time every morning",
            "Knowing when your cognition is sharpest and scheduling deep work there instead of meetings",
            "Working more hours to produce more output",
          ],
          answer: 1,
          explanation:
            "Most people have a 2-4 hour window of peak focus each day. Filling that window with meetings squanders your highest-leverage time. Scheduling hard work in peak hours and meetings in lower-energy slots can double effective output.",
        },
      ],
      explanation:
        "Deep work is what moves hard problems forward — and it requires active defense against the notification economy. Block, batch, and signal so uninterrupted stretches become a reliable resource.",
    },
    {
      slug: "remote-communication-written",
      title: "Written Communication as a Core Skill",
      blurb: "Remote work runs on writing. Strong written communication is not soft — it's what gets things done.",
      xp: 22,
      kind: "quiz",
      content: `# Written Communication as a Core Skill

In a distributed team, your words on a screen represent you more than your voice in
a meeting does. **Writing is your primary collaboration interface.** It's how you
clarify thinking, persuade teammates, unblock others, and get decisions made across
time zones.

The gap between developers who write clearly and those who don't becomes enormous
in remote teams — because there's no in-person channel to compensate.

**Principles of strong remote writing:**

**Lead with the ask.** Put what you need in the first sentence. Don't bury a
request in three paragraphs of context. "I need a decision on X by Thursday" → then
give the context.

**Structure for skimming.** Teammates are busy. Use headers, bullet points, and
bold text for the key points. Dense paragraphs get skimmed badly or skipped.

**State uncertainty explicitly.** "I'm not sure if Y is the right call — does
anyone have context on Z?" is far more useful than presenting a decision with false
confidence or hiding that you're stuck.

**Distinguish status, questions, and decisions.** These are different things that
need different responses. Label them clearly: "Status update:", "Question:", "Need
a decision on:".

**Avoid ambiguous pronouns and vague timelines.** "Can you fix it soon?" gives
no information. "Can you fix the login timeout bug (#391) by end of Thursday?" is
actionable.

Good remote writing takes practice. The payoff is a team that moves fast without
constant follow-up — and a reputation for clarity that compounds over time.`,
      questions: [
        {
          prompt:
            "You need a teammate to review a PR before a Friday deploy. Which message is most effective?",
          options: [
            "'Hey, when you get a chance, could you maybe look at my PR?'",
            "'Need a review on PR #214 (auth timeout fix) before Thursday EOD so we can deploy Friday — takes about 10 min.'",
            "'Please review my PR when possible, thanks!'",
          ],
          answer: 1,
          explanation:
            "The effective version names the specific PR, states the deadline, explains why, and gives a time estimate. Every piece removes a follow-up question and makes it trivial to say yes.",
        },
        {
          prompt: "Why should remote messages lead with the ask rather than burying it at the end?",
          options: [
            "Style preference only — it doesn't affect outcomes",
            "Teammates are often skimming; if the request is buried, it gets missed or deferred",
            "It's considered more polite to provide context before asking",
          ],
          answer: 1,
          explanation:
            "Async readers often make a quick scan decision about whether to act now or defer. If the action isn't visible immediately, deferral wins. Leading with the ask forces it into that first scan.",
        },
        {
          prompt: "What does 'state uncertainty explicitly' mean in remote writing?",
          options: [
            "Never send a message until you're 100% confident in the content",
            "Label when you don't know something or aren't sure of the right call, so others know where input is needed",
            "Use hedging phrases like 'maybe' and 'sort of' frequently",
          ],
          answer: 1,
          explanation:
            "Explicit uncertainty is actionable — it tells teammates exactly where to contribute their context or judgment. Hidden uncertainty blocks progress because no one knows help is needed.",
        },
      ],
      explanation:
        "Written clarity is not polish — it's velocity. Teams with strong writers spend less time in follow-up loops and make decisions faster across time zones.",
    },
    {
      slug: "remote-tooling",
      title: "Remote Developer Tooling",
      blurb: "Know which tools solve which problems — and why the wrong tool for the job creates invisible friction.",
      xp: 20,
      kind: "quiz",
      content: `# Remote Developer Tooling

The right tooling stack removes friction from distributed collaboration. The wrong
one creates slow, invisible drag that compounds over months. You don't need to use
every tool — you need to understand what each category is *for*.

**Communication tools by type:**

- **Persistent chat** (Slack, Teams): good for quick questions, team pulse, low-stakes
  decisions. Not good for long-form discussion or decisions that need to be found later.
- **Long-form docs** (Notion, Confluence, Google Docs): decisions, design docs, RFCs,
  onboarding guides, anything that needs to be referenced more than once.
- **Video calls** (Zoom, Google Meet): complex alignment, sensitive conversations,
  team rituals. Not for information that could be a doc.
- **Project tracking** (Linear, Jira, GitHub Issues): the single source of truth for
  what's being built, by whom, and in what state.

**Developer-specific tools:**

- **Version control** (Git / GitHub / GitLab): non-negotiable; PR descriptions and
  review comments are async collaboration infrastructure.
- **CI/CD**: removes the "works on my machine" problem; forces code through shared
  validation on every push.
- **Cloud dev environments** (GitHub Codespaces, Gitpod): eliminate local setup
  drift; a new teammate can contribute on day one.
- **Time zone tools** (World Time Buddy, Cron calendar overlaps): know when your
  teammates are actually available before scheduling anything.

**The anti-pattern to avoid:** using chat for decisions. When a decision is buried in
a 200-message Slack thread, it effectively doesn't exist — no one can find it, and
it gets relitigated endlessly. Decisions belong in docs, tickets, or PR descriptions.`,
      questions: [
        {
          prompt:
            "Your team just made a significant architectural decision in a Slack thread. What's the problem with leaving it there?",
          options: [
            "Slack isn't secure enough for technical decisions",
            "It effectively disappears — new teammates can't find it, and the decision will be relitigated",
            "There's no problem; Slack threads are searchable",
          ],
          answer: 1,
          explanation:
            "Chat is ephemeral in practice. Decisions buried in threads get missed by newcomers and forgotten by existing members. Moving them to a doc, ticket, or PR description makes them durable and findable.",
        },
        {
          prompt: "Why are cloud dev environments (like GitHub Codespaces) particularly useful for remote teams?",
          options: [
            "They're faster than local machines",
            "They eliminate local setup drift so new contributors can start coding without a multi-day environment setup",
            "They're cheaper than paying for developer laptops",
          ],
          answer: 1,
          explanation:
            "Local environment setup is invisible friction that disproportionately hits remote onboarding. A reproducible cloud environment means everyone is on the same baseline from day one.",
        },
        {
          prompt: "What is project-tracking software (Linear, Jira, GitHub Issues) primarily for?",
          options: [
            "Monitoring developer activity and productivity",
            "Serving as the single source of truth for what's being built, by whom, and in what state",
            "Replacing code reviews",
          ],
          answer: 1,
          explanation:
            "Project tracking gives the whole team — across time zones — a shared, up-to-date view of work state. Without it, remote teams spend disproportionate time on alignment calls that exist only to answer 'what is everyone working on?'",
        },
      ],
      explanation:
        "Each tool category serves a purpose. The key discipline is keeping decisions out of chat and into durable, findable places — that single habit eliminates most remote coordination pain.",
    },
    {
      slug: "boundaries-and-wellbeing",
      title: "Boundaries, Routines, and Sustainable Pace",
      blurb: "Remote work's biggest long-term risk isn't isolation — it's never stopping.",
      xp: 22,
      kind: "quiz",
      content: `# Boundaries, Routines, and Sustainable Pace

The freedom of remote work contains a trap: **the workday has no natural edges.**
No commute bookends it. No office closing sends you home. Teammates message across
time zones. The laptop is always in the next room.

The result, if you're not deliberate, is a slow drift toward overwork —
always-on availability, late-night pings, weekends that blur into the week. This
feels like dedication but produces burnout, degraded output quality, and eventually
exit.

**Structural habits that create sustainable pace:**

**Define a stopping ritual.** Something physically distinct — close the laptop, take
a walk, change rooms — that marks the end of the workday. Without a commute, you
must manufacture the transition.

**Set notification hours.** Configure Slack and email to deliver messages only
during your work window. The goal: no phone buzzing at 11pm because a US colleague
just messaged you. Most modern tools support this natively.

**Separate your work space if at all possible.** Even a dedicated desk that you
leave at EOD is meaningfully better than working from the couch or the bed. Physical
separation creates psychological separation.

**Communicate your hours explicitly.** Post them in your Slack profile or team doc.
Set your time zone correctly everywhere. This tells teammates what to expect without
you having to decline every late-evening message individually.

**Protect days off like deadlines.** Vacation days that aren't used don't bank — they
disappear. Treat recovery time as a delivery requirement, not a reward you haven't
earned yet.`,
      questions: [
        {
          prompt:
            "Why is overwork a bigger long-term risk in remote work than it is in office work?",
          options: [
            "Remote developers are lazier and need more work to compensate",
            "There are no natural edges to the workday — no commute, no office close, no physical separation",
            "Remote managers are more demanding",
          ],
          answer: 1,
          explanation:
            "In an office, the environment itself enforces a daily rhythm. Remote workers must manufacture those edges deliberately, or the workday expands to fill all available time — with compounding effects on health and output quality.",
        },
        {
          prompt: "What is a 'stopping ritual' and why does it matter?",
          options: [
            "A formal team standup at the end of the day",
            "A physically distinct action that marks the end of the workday, replacing the transition that a commute provides",
            "A daily email to your manager summarizing what you did",
          ],
          answer: 1,
          explanation:
            "Without a commute, the transition between 'work mode' and 'personal time' doesn't happen naturally. A deliberate ritual — any action that's distinct and repeatable — creates the psychological boundary that makes recovery possible.",
        },
        {
          prompt: "Communicating your working hours explicitly in your Slack profile or team doc achieves what?",
          options: [
            "It lets you bill for overtime legally",
            "It sets clear expectations so teammates know when you're reachable without you having to manage each late-night message individually",
            "It prevents your manager from assigning you work outside those hours",
          ],
          answer: 1,
          explanation:
            "Explicit hours reduce the implicit pressure to respond at all hours. Teammates know what to expect, late pings drop, and your mental off-switch actually works.",
        },
      ],
      explanation:
        "Sustainable remote work requires manufactured structure. The people who thrive long-term are those who design their workday edges as intentionally as they design their code.",
    },
    {
      slug: "remote-career-capstone",
      title: "Capstone: Remote Developer Career",
      blurb: "Pull everything together — visibility, trust, growth, and how to advance your career without an office presence.",
      xp: 25,
      kind: "quiz",
      content: `# Capstone: Remote Developer Career

Remote work changes how careers develop — not for worse, but differently. The
promotions-from-proximity effect (being seen, being liked, being in the room) is
reduced. In its place: **output quality, written influence, and reputation across
the codebase**.

**What remote career growth actually looks like:**

**Reputation through code.** Your commits, PR reviews, RFC comments, and design doc
contributions are visible to anyone on the team. Strong technical output and good
judgment exercised publicly across these surfaces builds a reputation that travels
farther than any hallway conversation.

**Growing influence without authority.** Write proposals that get adopted. Review
PRs that make the code better. Answer questions in public channels so others can
benefit. This is how remote developers build the influence that leads to tech lead
and staff roles — by demonstrating judgment at scale, not by being loudest in a room.

**Staying current without a physical office culture.** Follow your industry through
technical blogs, papers, community Discords, and conferences (many are hybrid or
virtual). Bring what you learn back to the team via short write-ups or lunch-and-learns.

**Managing the isolation risk.** Remote loneliness is real. Counter it deliberately:
coffee chats with colleagues, local dev meetups, co-working occasionally, or even
just a shared playlist in a team voice channel. Connection takes intention.

**Negotiating and advancing.** Remote workers should over-communicate their
achievements at review time. Keep a "brag doc" — a private running list of wins,
impact, and decisions — that you draw from when it's time to discuss compensation
or promotion. Your manager may not have seen everything you shipped.

The remote developer who communicates clearly, ships visibly, protects their focus,
and keeps building relationships will outperform in-office counterparts long-term —
not despite the lack of an office, but because of the discipline it demands.`,
      questions: [
        {
          prompt:
            "In a remote company, what most directly builds a developer's reputation and influence?",
          options: [
            "Being online the most hours",
            "Visible, high-quality output: commits, PR reviews, design doc contributions, and public technical judgment",
            "Having the most meetings on their calendar",
          ],
          answer: 1,
          explanation:
            "Remote reputation is built through the codebase and written communication. Quality contributions that others can read and rely on travel farther than office presence, and they compound over time.",
        },
        {
          prompt: "What is a 'brag doc' and why should remote developers maintain one?",
          options: [
            "A public page on your team wiki listing your skills",
            "A private running log of wins, impact, and decisions — used to advocate for yourself at review time",
            "A daily report sent to your manager",
          ],
          answer: 1,
          explanation:
            "Remote managers can't observe everything you ship. A brag doc ensures you can speak concretely about your contributions at review time rather than relying on your manager's incomplete visibility.",
        },
        {
          prompt:
            "A remote developer wants to grow toward a tech lead role. Which approach best demonstrates the judgment that role requires?",
          options: [
            "Scheduling more one-on-ones with senior engineers to ask about promotion",
            "Writing proposals, doing thorough PR reviews, and answering technical questions publicly so judgment is visible at scale",
            "Working longer hours to ship more features",
          ],
          answer: 1,
          explanation:
            "Tech lead and staff roles reward judgment exercised at team scale — not just personal output. Public proposals, quality reviews, and visible technical reasoning show you can operate at that level before you're given the title.",
        },
      ],
      explanation:
        "Remote career growth is structured around output and written influence. Build a brag doc, contribute visibly across the codebase, and invest in the relationships and learning that don't happen automatically without an office.",
    },
  ],
};
