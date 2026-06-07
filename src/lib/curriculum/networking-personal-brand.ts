import type { Module } from "./types";

export const networkingPersonalBrand: Module = {
  slug: "networking-personal-brand",
  title: "Networking & Personal Brand for Devs",
  description:
    "Most jobs aren't found on job boards — they come through people. Learn how to build a visible, credible online presence, make genuine professional connections, contribute to communities that matter in tech, and turn conversations into opportunities without feeling slimy about it.",
  emoji: "🌐",
  gradient: "from-emerald-500/20 to-teal-500/10",
  tagline:
    "Build the professional reputation and network that get you hired, promoted, and referred — without faking who you are.",
  keywords: [
    "developer networking",
    "personal brand for developers",
    "LinkedIn for developers",
    "GitHub profile",
    "tech community",
    "developer career",
    "open source networking",
    "how to get a tech job",
  ],
  lessons: [
    {
      slug: "why-networking-works",
      title: "Why Networking Actually Works",
      blurb:
        "Most roles are filled before they're posted. Understand the hidden job market and why relationships are the real pipeline.",
      xp: 20,
      kind: "quiz",
      content: `# Why Networking Actually Works

Most developers imagine job hunting as: write resume → apply to posting → wait. In
practice, a large share of roles — estimates regularly put it above 50% — are filled
through referrals or internal connections before a job board listing ever appears.
This is sometimes called the **hidden job market**.

Why does this happen?

- Hiring is slow and expensive. A referral from a trusted employee reduces risk for
  the employer and cuts sourcing time dramatically.
- Managers often already know who they want. They post publicly because HR requires
  it, but the decision is often already leaning toward someone in the network.
- Referrals get moved to the top of the stack. A resume attached to a name the
  recruiter knows goes through a different (faster) pile.

This doesn't mean job boards are useless — they're a legitimate channel, especially
for early-career devs. But relying on them exclusively is like fishing with one rod
in a big lake.

**Networking is not schmoozing.** It is simply building relationships with people
who do work you're interested in. Done genuinely, it:

- Gets you information you can't Google (what it's really like to work there)
- Gets you visibility before a role exists
- Gets you a human advocate in the hiring process

The best time to build a network is before you need one. Start now, even if you're
not job hunting.`,
      questions: [
        {
          prompt:
            "Why do many roles get filled before they are publicly posted?",
          options: [
            "Companies want to exclude anyone who didn't go to a top university",
            "Referrals reduce hiring risk and cost, so managers often move quickly on trusted connections",
            "Job boards are too slow to upload listings in time",
          ],
          answer: 1,
          explanation:
            "Referrals lower risk and speed up the process from the employer's side. This creates a hidden market where relationships matter more than a posted application.",
        },
        {
          prompt: "When is the best time to start building a professional network?",
          options: [
            "Only after you've been laid off or are actively job hunting",
            "Before you need one — relationships built under no pressure are more genuine and durable",
            "After you have five or more years of experience",
          ],
          answer: 1,
          explanation:
            "Reaching out when you're desperate signals desperation. A network built while you're stable — out of genuine curiosity and connection — is far more useful when you eventually do need it.",
        },
        {
          prompt: "Which best describes what developer networking actually is?",
          options: [
            "Handing business cards to strangers at conferences",
            "Building genuine relationships with people doing work you're interested in",
            "Following as many developers as possible on social media",
          ],
          answer: 1,
          explanation:
            "Networking done well is just relationships — being curious about people's work, offering help, and staying in touch. It doesn't require a conference badge or a rehearsed elevator pitch.",
        },
      ],
      explanation:
        "The hidden job market is real, referrals beat cold applications, and the antidote to both is genuine relationships built over time — not last-minute schmoozing.",
    },
    {
      slug: "github-profile-that-speaks",
      title: "A GitHub Profile That Speaks for You",
      blurb:
        "Your GitHub is a living portfolio. Learn what hiring managers and other devs actually look at.",
      xp: 22,
      kind: "quiz",
      content: `# A GitHub Profile That Speaks for You

GitHub is the default public portfolio for developers. Whether you're applying to
jobs, contributing to open source, or just building a reputation, it's often the
first place another developer or recruiter will look after your name.

**What actually matters on a GitHub profile:**

1. **Profile README** — A \`README.md\` in a repo named exactly like your username
   renders at the top of your profile. Use it to introduce yourself: who you are,
   what you're building, what you're interested in, and links to your best work or
   site. Keep it concise — three to five sections, no life story.

2. **Pinned repositories** — You can pin up to six repos. Pin projects that show
   your range or depth, have a clear README explaining what the project does and
   how to run it, and (ideally) are actually working. A pinned repo with an empty
   README is a missed opportunity.

3. **Commit history** — Recruiters do look at contribution graphs, but don't
   obsess. What matters more is that commits inside projects tell a story of
   iteration, not just a single giant dump. Meaningful commit messages matter.

4. **README quality** — For every project you want someone to see: What does it
   do? Why does it exist? How do I run it? Screenshots or a demo link if possible.
   This alone puts you ahead of most candidates.

**What doesn't matter much:**

- Raw number of stars on your repos (unless in the thousands)
- Daily green squares at all costs (pushing empty commits to look active is worse
  than a quiet month of real work)
- Having a perfect profile before you start — iterate it like code

A GitHub profile is a professional document. Treat it like one.`,
      questions: [
        {
          prompt:
            "What is a GitHub profile README and how do you create one?",
          options: [
            "A README.md inside any public repository",
            "A README.md in a repository named exactly the same as your GitHub username — it renders at the top of your profile",
            "A special file uploaded through GitHub's settings page",
          ],
          answer: 1,
          explanation:
            "Create a public repo with the same name as your username (e.g., github.com/yourname/yourname) and add a README.md. GitHub automatically renders it on your profile page.",
        },
        {
          prompt:
            "A recruiter is looking at your pinned repository. What's the single most important thing for that repo to have?",
          options: [
            "At least 50 stars",
            "A clear README explaining what the project does, why it exists, and how to run it",
            "A perfect commit graph with no gaps",
          ],
          answer: 1,
          explanation:
            "Most devs skip READMEs. A clear, well-written README that answers 'what, why, how' instantly signals professionalism and communication skill — both of which hiring managers value.",
        },
        {
          prompt:
            "A developer pushes empty commits every day to keep their contribution graph green. Is this a good strategy?",
          options: [
            "Yes — hiring managers always check the graph and it looks impressive",
            "No — it signals gaming the metric rather than real work, and anyone who looks closely will notice",
            "It doesn't matter either way because no one looks at contribution graphs",
          ],
          answer: 1,
          explanation:
            "Contribution graphs are one signal, not the signal. Experienced reviewers look inside the commits. Empty or trivial commits to inflate the graph actually hurt credibility.",
        },
      ],
      explanation:
        "Profile README, pinned repos with real READMEs, and meaningful commit messages are the levers. Polish those before worrying about stars or daily streaks.",
    },
    {
      slug: "linkedin-for-developers",
      title: "LinkedIn Without the Cringe",
      blurb:
        "LinkedIn works when you treat it like a professional tool, not a highlight reel. Here's what to optimize.",
      xp: 20,
      kind: "quiz",
      content: `# LinkedIn Without the Cringe

LinkedIn has a reputation for performative posts and recruiter spam, and some of
that reputation is earned. But it remains the primary database recruiters search
when filling technical roles, and showing up well there is a practical advantage —
not optional vanity.

**Profile basics that move the needle:**

- **Headline** — Defaults to your job title. Change it to say what you do and for
  whom, or what you're building toward. "Full-stack developer | React + Node |
  building tools for small teams" is more useful than "Software Engineer at XYZ."
- **About section** — Three to four sentences in first person. What you build, what
  you're interested in, what you're looking for or open to. No mission statements.
- **Experience** — Describe impact, not job duties. "Built a data pipeline that
  reduced report generation from 4 hours to 8 minutes" beats "Responsible for
  data infrastructure."
- **Skills + endorsements** — List the actual tools you use. Recruiters use skill
  filters.
- **Open to Work** — You can enable this visibly (green banner) or privately
  (recruiters-only). Use the private setting if you're employed and discreet matters.

**Using LinkedIn actively:**

- Connect with people you actually interact with — colleagues, classmates, speakers
  you saw at meetups, people whose posts taught you something.
- Engage with posts by leaving a real comment, not just a like. Comments put you
  in front of the poster's whole network.
- Post occasionally about what you're learning or building. You don't need viral
  content — a concise "I ran into this problem and solved it this way" post adds
  real value and is noticed.

You don't need to be a LinkedIn influencer. You need a clear profile and occasional
genuine engagement.`,
      questions: [
        {
          prompt:
            "Which LinkedIn headline is most effective for a developer?",
          options: [
            "Software Engineer",
            "Full-stack developer | React + Node | building tools for small teams",
            "Passionate about technology and making a difference",
          ],
          answer: 1,
          explanation:
            "A specific headline tells recruiters exactly what you do and what keywords to match. Vague titles and generic phrases are filtered out before a human ever sees them.",
        },
        {
          prompt:
            "In the Experience section, which description is stronger?",
          options: [
            "'Responsible for data infrastructure and reporting systems'",
            "'Built a pipeline that reduced monthly report generation from 4 hours to 8 minutes'",
            "'Worked on various backend projects as part of the data team'",
          ],
          answer: 1,
          explanation:
            "Quantified impact is the currency of résumé and LinkedIn bullets. Responsibilities describe a job description; results describe your actual contribution.",
        },
        {
          prompt:
            "You see a post by a developer you respect that teaches you something new. What's the highest-value action?",
          options: [
            "Like the post and move on",
            "Leave a genuine comment explaining what you learned or asking a follow-up question",
            "Repost it without adding any text",
          ],
          answer: 1,
          explanation:
            "Comments extend your visibility to the poster's entire network, start real conversations, and signal that you're thoughtful — all from one 30-second action.",
        },
      ],
      explanation:
        "A clear headline, impact-focused experience bullets, and occasional genuine engagement put you in the top tier of developer LinkedIn profiles without requiring daily content creation.",
    },
    {
      slug: "building-in-public",
      title: "Building in Public",
      blurb:
        "Sharing your work while you build it is one of the fastest ways to grow an audience and a reputation simultaneously.",
      xp: 22,
      kind: "quiz",
      content: `# Building in Public

"Building in public" means narrating your work as you do it — sharing progress,
lessons, failures, and decisions on social media, a blog, or GitHub, rather than
waiting until something is finished and polished.

**Why it works:**

- **Accountability** — Publishing your progress makes you more likely to keep going.
- **Feedback early** — You get real reactions before you've sunk months into the
  wrong direction.
- **Reputation compounds** — Each post is a data point. Over time, people who
  follow your journey trust you because they've seen you work.
- **Inbound opportunities** — Recruiters, collaborators, and potential clients find
  you through the trail of content you leave.

**What to share:**

- What you're building and why you chose to build it
- Problems you hit and how you solved them (or that you're stuck — people help)
- Decisions you made and why (architecture, tech choices, tradeoffs)
- Milestones, even small ones ("shipped the auth flow today")
- Failures and pivots — these often get the most engagement because they're honest

**What platforms work:**

- **Twitter/X or Bluesky** — Good for quick updates and reaching other devs.
- **GitHub** — Commit messages and project README updates are a form of building
  in public, even if low-visibility.
- **A personal blog** — Long-form posts rank on search and have a longer shelf life.
- **Dev.to / Hashnode** — Developer-specific platforms with built-in audiences.

You don't need to post daily. One honest post a week about what you're working on
adds up to 52 data points about who you are in a year.`,
      questions: [
        {
          prompt:
            "What is the core idea behind 'building in public'?",
          options: [
            "Only releasing open-source software instead of closed-source",
            "Narrating your work — progress, problems, decisions — as you do it rather than waiting until it's finished",
            "Streaming yourself coding live every day on Twitch",
          ],
          answer: 1,
          explanation:
            "Building in public is about the narration, not the medium. Blog posts, tweets, GitHub notes — any channel where you share the real process counts.",
        },
        {
          prompt:
            "A post about a bug that took you three days to debug — is this worth sharing?",
          options: [
            "No — only share wins and finished products so you look competent",
            "Yes — problem-solving posts are highly valuable; they show process and often help others with the same issue",
            "Only if the bug was in a well-known framework",
          ],
          answer: 1,
          explanation:
            "Debugging posts are among the highest-value content a developer can share: they're searchable, helpful to others, and demonstrate real technical depth better than 'look at my finished app' posts.",
        },
        {
          prompt:
            "Which of these is the most sustainable posting cadence for building in public?",
          options: [
            "Multiple times per day to stay in the algorithm",
            "One honest, specific post per week about what you're actually working on",
            "One massive post per month covering everything",
          ],
          answer: 1,
          explanation:
            "Consistency over volume. One genuine post per week is manageable long-term and produces 52 posts a year — enough to build a real presence without burning out.",
        },
      ],
      explanation:
        "Building in public works because it turns your learning process into visible proof of your thinking. One honest post per week compounds into a reputation over months.",
    },
    {
      slug: "communities-open-source",
      title: "Communities & Open Source as Networking",
      blurb:
        "The best professional connections happen where real work is being done — open-source repos, Discord servers, and local meetups.",
      xp: 22,
      kind: "quiz",
      content: `# Communities & Open Source as Networking

The highest-leverage networking happens inside communities where work is being done —
not at events specifically labeled 'networking.' When you contribute something real,
you meet people through shared context, which is a far stronger foundation than
handing someone a card.

**Where to find good communities:**

- **Discord servers** — Most major open-source projects and frameworks (React, Rust,
  Python, etc.) have active Discord communities. Join the one for the tools you use;
  answer questions when you know the answer.
- **GitHub Issues and Discussions** — Commenting thoughtfully on issues in projects
  you use gets you in front of maintainers and other active contributors.
- **Local meetups** — Meetup.com and local tech calendars list language-specific and
  general dev meetups. Monthly attendance at one meetup will introduce you to more
  useful contacts than most resume blasts.
- **Virtual conferences and hackathons** — Lower barrier than in-person; team-based
  hackathons in particular force rapid collaboration with new people.

**Contributing to open source:**

You don't need to fix a core bug to benefit. Start with:

- **Documentation fixes** — Typos, unclear sections, missing examples. Maintainers
  love these. Good first issue.
- **Reproducing bug reports** — Confirm a reported bug, add more context, narrow
  the repro case.
- **Answering questions in issues** — If you know the answer to someone's open
  question, say so. Maintainers notice.
- **Small feature contributions** — Pick an issue labeled \`good first issue\` and
  work through the contribution process end-to-end.

The goal isn't to pad your résumé with logos — it's to be a recognizable, helpful
presence in a community where the people who might hire or refer you are also active.`,
      questions: [
        {
          prompt:
            "Why does networking inside a community (like an open-source project) tend to be more effective than attending a generic 'networking event'?",
          options: [
            "Because community events are always free",
            "Because shared work creates genuine context — you meet people through something real rather than small talk",
            "Because generic networking events are always poorly organized",
          ],
          answer: 1,
          explanation:
            "Shared context is the foundation of durable professional relationships. When someone has seen you debug an issue or write a clear PR, they know something real about you — far more than a 30-second elevator pitch communicates.",
        },
        {
          prompt:
            "You're new to open source. Which type of contribution is the best starting point?",
          options: [
            "Rewriting the project's core module in a new language",
            "Fixing documentation — typos, unclear sections, or missing examples",
            "Opening a feature request for a major new capability",
          ],
          answer: 1,
          explanation:
            "Documentation contributions are welcomed by almost every project, require no deep codebase knowledge, and teach you the contribution workflow (fork, branch, PR, review). They're the right first step.",
        },
        {
          prompt:
            "You join an open-source project's Discord and someone asks a question you know the answer to. What should you do?",
          options: [
            "Wait — only the maintainers should answer",
            "Answer it clearly and helpfully",
            "Ask them to open a GitHub Issue instead",
          ],
          answer: 1,
          explanation:
            "Answering questions is one of the most visible and appreciated contributions you can make. Maintainers notice who is helpful in their community — and it's genuine proof of your knowledge.",
        },
      ],
      explanation:
        "Contributing inside communities — even through docs, answers, and issue triage — is one of the best forms of networking because it produces real evidence of your skills and personality simultaneously.",
    },
    {
      slug: "the-informational-interview",
      title: "The Informational Interview",
      blurb:
        "A 20-minute conversation with someone doing work you want to do is worth more than a hundred cold applications.",
      xp: 22,
      kind: "quiz",
      content: `# The Informational Interview

An **informational interview** is a short, informal conversation — usually 20–30
minutes — where you ask someone about their work, career path, or company. You
are not asking for a job. You are asking for their experience and perspective.

This is one of the most underused and highest-return moves in career development:

- You learn what a role or company is actually like (vs. the marketing copy)
- You build a relationship before a vacancy exists
- If a role does open, you're no longer a cold applicant — you're someone they know
- People generally like being asked for their expertise and are more willing to help
  than most assume

**How to ask:**

Reach out on LinkedIn or email. Keep it short. Lead with a genuine reason you're
reaching out to them specifically — something from their work, not generic flattery.

> "Hi [Name], I came across your post on [topic] / your work on [project] and found
> it genuinely useful. I'm a developer working on [brief context]. Would you be open
> to a 20-minute call sometime to talk about [specific thing you want to learn]?
> Totally understand if your schedule is full."

The "totally understand if your schedule is full" line matters — it gives them an
easy out, which paradoxically makes people more likely to say yes.

**What to ask during the call:**

- How did you get into this role / company?
- What does a typical week look like for you?
- What skills or experiences do you wish you had coming in?
- What would you do differently if you were starting over?
- Is there anyone else you'd suggest I talk to?

That last question extends your network one conversation at a time.

**After the call:** Send a short thank-you message within 24 hours. No ask, just
gratitude. Stay in touch occasionally — share something relevant, comment on their
posts. Don't disappear and reappear only when you need something.`,
      questions: [
        {
          prompt:
            "What is the primary goal of an informational interview?",
          options: [
            "To directly ask for a job or referral at the end of the call",
            "To learn about someone's work and build a genuine relationship — not to ask for a job",
            "To practice answering technical interview questions",
          ],
          answer: 1,
          explanation:
            "The moment you turn an informational interview into a job pitch, the dynamic shifts and most people shut down. The goal is genuine curiosity and connection — job opportunities emerge from that, not the other way around.",
        },
        {
          prompt:
            "When reaching out to request an informational interview, which approach is most likely to get a response?",
          options: [
            "'Hi, I'm looking for a job and would love to pick your brain.'",
            "A short message with a genuine, specific reason you're reaching out to them plus an easy-out line like 'totally understand if your schedule is full'",
            "A detailed cover letter explaining your full background and asking for 60 minutes",
          ],
          answer: 1,
          explanation:
            "Specificity shows you did your homework; brevity respects their time; the easy-out reduces the social pressure of saying no — all of which make a 'yes' more likely.",
        },
        {
          prompt:
            "What should you do immediately after an informational interview?",
          options: [
            "Send a LinkedIn connection request asking if they're hiring",
            "Send a short thank-you message within 24 hours — no ask, just genuine gratitude",
            "Wait a month and then follow up asking for a referral",
          ],
          answer: 1,
          explanation:
            "A timely thank-you closes the loop professionally and reinforces the relationship. The rule is: no ask in the follow-up. You already got what you came for — treat it accordingly.",
        },
      ],
      explanation:
        "Ask for perspective, not a job. A short, genuine conversation built on specific curiosity converts strangers into advocates over time — one 20-minute call at a time.",
    },
    {
      slug: "networking-personal-brand-capstone",
      title: "Capstone: Your Networking & Brand Plan",
      blurb:
        "Put it all together: audit your current presence, identify your gaps, and leave with a concrete 30-day action plan.",
      xp: 25,
      kind: "quiz",
      content: `# Capstone: Your Networking & Brand Plan

You've covered the mechanics. Now let's integrate them into a practical plan you
can actually follow — not a 40-point framework that lives in a notebook forever.

**The audit: where do you stand today?**

Answer these honestly:

- Is your GitHub profile README live and up to date?
- Do your top 3 pinned repos have clear READMEs?
- Does your LinkedIn headline say something specific?
- Have you posted publicly about your work in the last 90 days?
- Have you had an informational interview in the last 6 months?
- Are you active in any developer community?

If you answered "no" to most of these, you have high-leverage, low-effort work
ahead of you. These are one-time or low-frequency actions, not a daily grind.

**The 30-day sprint:**

| Week | Focus |
|------|-------|
| 1 | GitHub: profile README + update 2–3 pinned repo READMEs |
| 2 | LinkedIn: rewrite headline + rewrite 2–3 experience bullets with impact |
| 3 | Community: join one relevant Discord or forum; answer one question |
| 4 | Outreach: send one informational interview request |

That's it. Four focused actions across four weeks. Not viral content, not a personal
brand strategy deck — just the smallest set of moves that compound over time.

**The long game:**

- Consistency beats intensity. One post, one answer, one connection per week
  outperforms a burst month followed by silence.
- Your network is not the people you know — it's the people who know your work.
  Make your work visible.
- Help first. People who give without immediate expectation of return become
  trusted connectors. That trust eventually routes opportunities back to them.

The developers who land the best roles aren't always the best coders. They're often
the ones who made their skills, judgment, and character visible — and built
relationships before they needed them.`,
      questions: [
        {
          prompt:
            "You have one hour this week for networking activities. Which is the highest-leverage use of that hour?",
          options: [
            "Scrolling LinkedIn and liking as many developer posts as possible",
            "Writing a clear README for your best project and updating your GitHub pinned repos",
            "Creating accounts on every developer platform available",
          ],
          answer: 1,
          explanation:
            "A clear README on a good project is permanent — every person who visits your profile sees it. Likes vanish and multi-platform account creation spreads you thin. Quality public artifacts compound.",
        },
        {
          prompt:
            "Which statement best describes the long-term networking mindset?",
          options: [
            "Build connections aggressively only when actively job hunting",
            "Help first, consistently, and let trust and reputation accumulate before you need them",
            "Focus on collecting the most LinkedIn connections to maximize visibility",
          ],
          answer: 1,
          explanation:
            "The developers with the strongest networks are those who built them by being genuinely helpful over time — not those who extracted value from a large contact list. Trust, not volume, is the asset.",
        },
        {
          prompt:
            "A developer posts consistently about their work for three months and then stops completely for six months. What is the likely impact?",
          options: [
            "Their audience will remain exactly the same",
            "Their visibility and momentum will drop — consistency over time beats bursts of activity followed by silence",
            "The burst of posts at the start is enough to sustain their reputation indefinitely",
          ],
          answer: 1,
          explanation:
            "Presence is maintained through consistency. A three-month sprint is a good start, but professional reputation is built over years of regular, genuine engagement — not campaigns.",
        },
      ],
      explanation:
        "One focused action per week — a README update, a thoughtful comment, a connection request, an informational interview — compounds into a strong professional network and reputation over 12 months. Start the sprint.",
    },
  ],
};
