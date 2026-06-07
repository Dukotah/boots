import type { Module } from "./types";

// Behavioral Interview Prep — a practical, all-quiz module covering the STAR
// method, common question categories, self-promotion, difficult situations, and
// offer negotiation. Aimed at developers who know how to code but freeze when
// the interview turns conversational.
export const behavioralInterviews: Module = {
  slug: "behavioral-interviews",
  title: "Behavioral Interview Prep",
  description:
    "Technical chops get you in the room — behavioral interviews decide if you get the offer. Learn the STAR framework, how to structure stories about conflict, failure, and leadership, how to answer 'tell me about yourself' without rambling, and how to turn 'do you have any questions?' into a competitive advantage.",
  emoji: "🗣️",
  gradient: "from-rose-500/20 to-pink-500/10",
  tagline:
    "Master the STAR method, craft compelling career stories, and walk into any behavioral interview with a battle-tested answer for every common question.",
  keywords: [
    "behavioral interview",
    "STAR method",
    "interview prep",
    "tell me about yourself",
    "situational interview questions",
    "Amazon leadership principles",
    "conflict at work interview",
    "software engineer interview",
    "job interview tips",
    "career stories",
  ],
  lessons: [
    {
      slug: "why-behavioral-interviews-matter",
      title: "Why Behavioral Interviews Matter",
      blurb: "Understand what interviewers are actually measuring — and why past behavior predicts future performance.",
      xp: 20,
      kind: "quiz",
      content: `# Why Behavioral Interviews Matter

Most technical candidates over-invest in LeetCode and under-invest in behavioral
prep. That's a mistake. At many companies, behavioral interviews carry **equal or
greater weight** than technical rounds — and at senior levels they often matter more.

## What interviewers are actually measuring

Behavioral interviews are built on one core idea: **past behavior predicts future
behavior**. An interviewer asking "Tell me about a time you handled a conflict with
a colleague" isn't curious about that one story — they're building a model of how
you'll behave at their company.

They're evaluating across several dimensions at once:

- **Self-awareness** — Do you understand your own strengths, weaknesses, and impact?
- **Judgment** — Did you make good calls under pressure or ambiguity?
- **Communication** — Can you tell a clear, organized story without rambling?
- **Cultural fit** — Do your values and work style match the company's?
- **Growth mindset** — Do you learn from failure, or deflect blame?

## The stakes in 2026

Hiring has become more selective. Engineering teams at well-funded startups and
large tech companies routinely run two to four behavioral rounds. Getting the
technical bar is table stakes — behavioral interviews are where candidates
differentiate themselves.

Companies like Amazon, Google, and Meta explicitly grade behavioral interviews
against published frameworks (Amazon's Leadership Principles, Google's CRAFT
criteria, etc.). Even companies without formal frameworks are doing the same
evaluation informally.

## The good news

Unlike algorithms, behavioral interviews are **learnable and repeatable**. The
same 15–20 questions come up in almost every interview, the scoring rubrics follow
predictable patterns, and preparation directly compounds into better answers.`,
      questions: [
        {
          prompt: "Why do companies use behavioral interviews instead of just asking hypothetical questions like 'What would you do if…'?",
          options: [
            "Behavioral questions are shorter and faster to ask",
            "Past behavior is a more reliable predictor of future behavior than hypothetical answers",
            "Hypothetical questions are illegal in most jurisdictions",
          ],
          answer: 1,
          explanation:
            "Hypothetical answers reveal what candidates think sounds good; behavioral stories reveal what they actually did. Real experience — including its messy details — is far more predictive.",
        },
        {
          prompt: "Which of these is NOT typically a dimension evaluated in a behavioral interview?",
          options: [
            "Self-awareness and ability to reflect on past decisions",
            "Whether the candidate's IDE shortcuts match the company standard",
            "Communication clarity and story structure",
          ],
          answer: 1,
          explanation:
            "Behavioral interviews assess judgment, communication, growth mindset, cultural fit, and self-awareness — not tool preferences or trivia.",
        },
        {
          prompt: "A senior engineer with strong technical skills but weak behavioral prep should expect:",
          options: [
            "That behavioral rounds will be waived at senior levels",
            "That behavioral interviews often carry more weight at senior levels, not less",
            "That one bad behavioral round will always be overridden by a perfect coding round",
          ],
          answer: 1,
          explanation:
            "Seniority raises the bar on leadership, judgment, and influence — all behavioral dimensions. Expecting a technical pass to compensate is a common and costly mistake.",
        },
      ],
    },
    {
      slug: "the-star-method",
      title: "The STAR Method",
      blurb: "Structure every story with Situation, Task, Action, Result — and avoid the common pitfalls.",
      xp: 22,
      kind: "quiz",
      content: `# The STAR Method

The STAR framework is the standard structure for behavioral answers. Interviewers
are trained to listen for it. When your answer fits it, it's easy to follow, easy
to score, and signals preparation.

## The four parts

**Situation** — Set the scene with just enough context. Your interviewer doesn't
work at your company and doesn't know your team. Give them what they need to
understand the stakes: company stage, team size, timeline, what was at risk.

> "We were a team of four engineers shipping a mobile redesign to 2 million users.
> Three weeks before launch, our QA lead flagged a performance regression that only
> appeared on older Android devices."

**Task** — Clarify your specific role. What were *you* responsible for, as distinct
from the team's shared responsibility?

> "As the engineer who owned the rendering pipeline, it fell to me to diagnose and
> fix the issue — without slipping the launch date."

**Action** — This is where you spend the most time. Detail *what you specifically
did*: your reasoning, the options you considered, the tradeoffs you made, and how
you executed. Use "I" not "we" — the interviewer is evaluating you.

> "I profiled the app on a Pixel 3, isolated the bottleneck to an unoptimized image
> scaling loop, and implemented a lazy-load pattern that cut render time by 60%…"

**Result** — Quantify where you can. Did the launch ship? What was the impact?
What did you learn?

> "We shipped on schedule. The regression went to zero across all device tiers.
> That fix became a team-wide pattern we've reused three times since."

## Common pitfalls

- **Too much Situation, too little Action.** Interviewers care most about what you did.
- **"We" all the way through.** Collaborative context is fine; credit-sharing is not.
- **No result.** A story without an outcome feels incomplete and unverifiable.
- **Too long.** A strong STAR answer runs 90–150 seconds out loud. Practice timing.`,
      questions: [
        {
          prompt: "A candidate spends three minutes on context and company background, then wraps up the Action and Result in 20 seconds. What's the main problem?",
          options: [
            "The Situation section should be even longer to give full context",
            "They've inverted the weight — Action is where interviewers gather the most signal; it should get the most time",
            "They should not include a Result unless the outcome was positive",
          ],
          answer: 1,
          explanation:
            "Situation and Task are scaffolding. Action is the payload — what you did, why, and how. Burying it under too much setup is one of the most common STAR errors.",
        },
        {
          prompt: "You're describing a team project. You keep saying 'we designed', 'we built', 'we shipped'. What should you change?",
          options: [
            "Switch to 'I' for your specific contributions — interviewers are assessing you, not the team",
            "Nothing — using 'we' shows you're a team player",
            "Replace all 'we' with 'I' even for decisions the whole team made together",
          ],
          answer: 0,
          explanation:
            "Collaborative context is fine, but you must clearly own your individual actions. 'I designed the caching layer while my teammate handled the API schema' is better than vague 'we' throughout.",
        },
        {
          prompt: "Which STAR result statement is strongest?",
          options: [
            "'It went pretty well and people seemed happy.'",
            "'The fix shipped on time and cut our p95 error rate from 4% to 0.2% over the next two weeks.'",
            "'We probably avoided some problems that would have come up later.'",
          ],
          answer: 1,
          explanation:
            "Quantified, time-bound results are far more credible and memorable than vague sentiments. Numbers signal that you understand impact, not just activity.",
        },
      ],
      explanation:
        "STAR is the skeleton — Situation and Task set the stage quickly, Action gets the most depth, and Result closes with evidence. Practice until the structure is automatic.",
    },
    {
      slug: "tell-me-about-yourself",
      title: "Tell Me About Yourself",
      blurb: "The most-asked question in any interview — and the most fumbled. Build a tight 90-second arc.",
      xp: 20,
      kind: "quiz",
      content: `# Tell Me About Yourself

"Tell me about yourself" opens nearly every interview. It's deceptively casual.
Candidates who treat it as small talk wander through their resume chronologically,
burn three minutes, and leave interviewers with no strong impression.

Candidates who treat it as a **strategic narrative** set the frame for the whole
interview.

## What interviewers want

They're not asking for your biography. They want to know:

1. Can you communicate clearly and concisely?
2. Is your career trajectory coherent — does it make sense that you're here?
3. What's your hook — the thing that makes you memorable?

## The Present-Past-Future arc

A clean structure that works for nearly everyone:

**Present** — where you are now and what you do. One sentence.

> "I'm a backend engineer at a Series B fintech, where I own the payments
> infrastructure serving about 500,000 monthly active users."

**Past** — the one or two experiences that most explain *how you got here*. Not
a resume walkthrough — the highlights that built the skills relevant to this role.

> "Before that I spent three years at a smaller startup where I wore a lot of hats —
> I was the first dedicated backend hire, so I built everything from the ground up.
> That's where I got deep on distributed systems and learned to operate under real
> scale pressure."

**Future** — why this role, at this company, now. Connect the dots explicitly.

> "I'm looking for a larger team with stronger infrastructure discipline — somewhere
> I can go deeper on reliability engineering, which is exactly what drew me to this
> role."

## Length and tone

Target 75–100 seconds. Conversational, not recited. End with a forward-looking
sentence so the interviewer knows you're done — it invites them to engage rather
than waiting for an awkward pause.

Practice it out loud. Reading it is not the same as saying it.`,
      questions: [
        {
          prompt: "An interviewer asks 'Tell me about yourself.' The strongest response structure is:",
          options: [
            "Chronological resume walkthrough from college to present",
            "Present role, relevant past highlights, and why this role/company now",
            "Personal hobbies and life story to build rapport first",
          ],
          answer: 1,
          explanation:
            "The Present-Past-Future arc is concise, coherent, and ends with a clear thesis about why you're here — which is exactly what interviewers are listening for.",
        },
        {
          prompt: "Your 'tell me about yourself' answer is running four minutes. What should you cut?",
          options: [
            "The 'Future' section — why you want the role isn't relevant",
            "Chronological detail that doesn't directly connect to the role — aim for 75–100 seconds total",
            "The 'Present' section — interviewers already have your resume",
          ],
          answer: 1,
          explanation:
            "Four minutes burns goodwill and buries your hook. Cut anything that doesn't strengthen the narrative thread from your background to this opportunity.",
        },
        {
          prompt: "Why should you practice your 'tell me about yourself' answer out loud rather than just reading notes?",
          options: [
            "Spoken delivery reveals pacing, filler words, and whether it sounds natural — reading notes doesn't",
            "Reading notes during an interview is against most companies' rules",
            "Out-loud practice is only necessary for non-native speakers",
          ],
          answer: 0,
          explanation:
            "A polished answer on paper can sound stilted or rushed when spoken. Out-loud reps expose timing issues, awkward transitions, and word choices that work in text but not in conversation.",
        },
      ],
    },
    {
      slug: "conflict-and-difficult-people",
      title: "Conflict & Difficult People",
      blurb: "How to answer conflict questions without looking defensive, a victim, or passive-aggressive.",
      xp: 23,
      kind: "quiz",
      content: `# Conflict & Difficult People

Questions about conflict are among the most loaded in behavioral interviews.
Candidates either dodge them (which reads as evasive) or overcorrect by making the
other person sound terrible (which reads as a red flag). Neither lands well.

## Why interviewers ask conflict questions

They're trying to learn three things:

1. **Do you recognize conflict as normal and productive?** Healthy disagreement is
   essential at high-performing teams. Someone who claims "I've never really had
   conflict" is either lying or conflict-avoidant — both are bad.
2. **Do you take any ownership, or do you always externalize blame?**
3. **Can you resolve disagreement without escalating unnecessarily?**

## The anatomy of a strong conflict answer

A strong answer has three moves:

**Establish legitimate disagreement.** The conflict should be substantive — a real
difference in approach, priority, or judgment — not a personality clash or gossip.

> "We disagreed about whether to prioritize shipping the feature on time or
> delaying to address a known architectural debt that would slow us down later."

**Show your effort to understand their perspective.** Before you describe how you
resolved it, show that you genuinely tried to see the other side.

> "I set up a one-on-one with my colleague to understand their constraints.
> It turned out they were worried about a dependency I hadn't factored in."

**Describe the resolution — and what you took from it.** Whether you changed your
mind, found a middle path, or escalated appropriately, the key is showing maturity.

> "We agreed on a phased approach. I was wrong about the timeline — their concern
> was valid. We shipped on a modified schedule and avoided a painful refactor later."

## What to avoid

- Painting the other person as unreasonable or incompetent
- A resolution that amounts to "I was right and they eventually agreed"
- Stories where you went around the person instead of engaging them
- Claiming you can't think of any conflict (implausible and suspicious)`,
      questions: [
        {
          prompt: "A candidate answers a conflict question by describing how their colleague was clearly wrong, difficult to deal with, and eventually came around. What's the problem?",
          options: [
            "They should have picked a conflict with higher stakes",
            "The answer positions them as blameless and superior, which is a red flag for self-awareness and collaboration",
            "Conflict questions should always end with the candidate being wrong",
          ],
          answer: 1,
          explanation:
            "An answer where you're fully right and the other person fully wrong signals low self-awareness. Interviewers look for candidates who can acknowledge their own role in tension.",
        },
        {
          prompt: "When asked 'Tell me about a conflict with a coworker,' what's wrong with answering: 'I genuinely can't think of any — I get along with everyone'?",
          options: [
            "Nothing — showing you're agreeable is a strength",
            "It signals either dishonesty or conflict avoidance, both of which concern interviewers at high-performing teams",
            "You should only discuss conflicts with managers, not coworkers",
          ],
          answer: 1,
          explanation:
            "High-performing teams require productive disagreement. Claiming zero conflict reads as avoidance or unawareness. Everyone has had substantive professional disagreements worth discussing.",
        },
        {
          prompt: "Before describing how you resolved a conflict, what's the most important step to include?",
          options: [
            "Explaining the org chart so the interviewer knows who had authority",
            "Showing that you genuinely tried to understand the other person's perspective before acting",
            "Documenting that you sent a follow-up email about the disagreement",
          ],
          answer: 1,
          explanation:
            "Demonstrating that you sought to understand before advocating is the key signal of maturity. Conflict answers without this step make you look reactive rather than collaborative.",
        },
      ],
    },
    {
      slug: "failure-and-growth",
      title: "Failure & Growth",
      blurb: "Use failure questions to demonstrate self-awareness, accountability, and learning — not damage control.",
      xp: 22,
      kind: "quiz",
      content: `# Failure & Growth

"Tell me about a time you failed" is one of the most valuable questions an
interviewer can ask — and one of the most mishandled.

The instinct is to minimize: pick a "failure" that was actually someone else's
fault, frame it as a near-miss, or choose something trivially small. Interviewers
see this constantly. It signals low self-awareness and a defensive posture.

## What a great failure answer signals

- **Accountability** — you can own your part without catastrophizing or deflecting.
- **Self-awareness** — you understand what went wrong and why.
- **Growth** — you changed something as a result. The failure wasn't wasted.

## How to choose the right story

Pick a real failure where:

- The stakes were meaningful (not trivial)
- You had genuine agency — you made the call that contributed to the outcome
- You can clearly articulate what you learned and what changed afterward

Avoid:

- Failures that are actually disguised successes ("I worked too hard…")
- Failures caused entirely by someone else that you describe as yours
- Failures so massive they'd raise red flags about judgment (shipping a security
  breach to production with no peer review, for example)

## The structure

**Own the failure cleanly.** Don't hedge. Say what went wrong and your part in it.

> "I underestimated the complexity of a third-party API integration and gave my
> manager a two-week estimate that turned into six weeks."

**Explain your reasoning at the time.** You made the call based on available
information — describe what you knew and what you missed.

> "I hadn't yet done an integration of this type. I extrapolated from internal
> API work, which turned out to be a poor analogy."

**Describe the impact and what you changed.**

> "The slip delayed a customer delivery. After that I built a habit of scoping
> any external dependency with a proof-of-concept before committing to a timeline.
> My estimates have been within 20% since then."`,
      questions: [
        {
          prompt: "A candidate describes their 'failure' as: 'I sometimes care too much about quality and it made me a bit slow.' What's the problem with this answer?",
          options: [
            "Quality focus is not relevant in behavioral interviews",
            "It's a disguised strength framed as a failure — it signals low self-awareness and is unconvincing",
            "The answer is too short",
          ],
          answer: 1,
          explanation:
            "Interviewers recognize fake failures immediately. The 'I'm a perfectionist' trope is one of the most overused dodges. It signals defensiveness rather than honest self-reflection.",
        },
        {
          prompt: "After describing a real failure where you gave a bad estimate that delayed a project, what's the most important thing to include?",
          options: [
            "An apology for bringing up something negative",
            "What specifically changed in your process or behavior as a result",
            "A list of colleagues who could verify the story",
          ],
          answer: 1,
          explanation:
            "The growth is the point. An interview isn't a confession — it's a demonstration that you extract learning from experience and apply it. Without what changed, the story has no payoff.",
        },
        {
          prompt: "Which failure story is the best candidate for a behavioral interview?",
          options: [
            "A trivial task you forgot that had no real consequences",
            "A meaningful miss where you had real agency, can explain your reasoning, and changed something afterward",
            "A failure caused entirely by a manager's bad decision that you had no role in",
          ],
          answer: 1,
          explanation:
            "Real agency, meaningful stakes, and demonstrated growth are the three ingredients. Trivial failures bore; external blame deflects; the middle option shows exactly what interviewers are looking for.",
        },
      ],
    },
    {
      slug: "leadership-and-influence",
      title: "Leadership & Influence Without Authority",
      blurb: "Demonstrate impact beyond your job description — driving outcomes without a reporting line.",
      xp: 23,
      kind: "quiz",
      content: `# Leadership & Influence Without Authority

At senior levels, almost every behavioral interview touches leadership — and
interviewers rarely mean "were you a manager." They're asking: can you drive
outcomes when you don't have direct authority to make people do things?

This matters because most of the interesting work in software engineering crosses
team lines, involves stakeholders with competing priorities, and requires building
consensus rather than issuing directives.

## What leadership looks like without a title

- **Proposing and driving adoption of a new standard** — a testing convention, a
  code review checklist, an on-call process — because you saw a gap.
- **Mentoring** a junior engineer through a hard problem, even though it wasn't
  formally assigned.
- **Running a project across teams** — aligning engineers, PMs, and design toward
  a shared goal without being anyone's manager.
- **Raising a concern early** — and convincing the team to take it seriously
  before it became an incident.

## The key behaviors to highlight

Influence without authority requires specific skills:

- **Building trust first.** People follow your lead when they trust your judgment.
  Show how you earned credibility before you asked for anything.
- **Making the case with data and framing.** You can't order alignment — you have
  to construct it. Show how you assembled evidence, framed trade-offs, and made the
  path of agreement easier than disagreement.
- **Accepting pushback gracefully.** Effective influencers listen to objections and
  incorporate them, rather than steamrolling or giving up.

## Senior vs. staff vs. principal

As your level rises, interviewers expect proportionally larger scope: a senior
engineer led a project team; a staff engineer aligned multiple teams; a principal
engineer shaped organizational direction. Match your story's scope to your target
level.`,
      questions: [
        {
          prompt: "An interviewer asks a senior engineer candidate: 'Tell me about a time you showed leadership.' The candidate describes managing direct reports at a previous company. Is this a strong answer?",
          options: [
            "Yes — any management experience counts as leadership",
            "It depends — management examples are valid, but interviewers often prefer influence-without-authority stories that show persuasion rather than formal power",
            "No — senior engineers should never describe management experience",
          ],
          answer: 1,
          explanation:
            "Management stories are acceptable but weaker at IC levels, because the interesting skill is aligning people who don't report to you. Influence-without-authority stories are more diagnostic and more impressive.",
        },
        {
          prompt: "What's the first thing you need to establish before you can effectively influence a team or stakeholder without formal authority?",
          options: [
            "A detailed slide deck with data",
            "Trust and credibility — people follow someone whose judgment they've seen proven",
            "Sign-off from senior leadership",
          ],
          answer: 1,
          explanation:
            "Influence is built on trust. No amount of data or framing works if the audience doesn't believe you know what you're talking about. Credibility first, then the ask.",
        },
        {
          prompt: "A staff engineer candidate is asked about leadership. Which story best matches the expected scope?",
          options: [
            "Helping one junior teammate debug a hard problem over an afternoon",
            "Aligning three product teams around a shared infrastructure strategy, navigating competing roadmap priorities over two quarters",
            "Fixing a production bug before anyone else noticed it",
          ],
          answer: 1,
          explanation:
            "Scope scales with level. Staff-level leadership involves multi-team coordination and organizational alignment over extended timelines — not individual heroics or one-on-one mentoring alone.",
        },
      ],
    },
    {
      slug: "capstone-preparing-your-story-bank",
      title: "Capstone: Build Your Story Bank",
      blurb: "Leave with a reusable library of 8–10 stories that cover every common behavioral question.",
      xp: 25,
      kind: "quiz",
      content: `# Capstone: Build Your Story Bank

The best-prepared candidates don't memorize answers to individual questions — they
build a **story bank**: a small library of 8–10 flexible career stories, each
rich enough to answer multiple question types.

## Why a story bank beats memorized Q&A

Behavioral interviews are unpredictable in phrasing but predictable in themes.
The same story can answer "Tell me about a conflict," "Tell me about a time you had
to influence without authority," and "Tell me about a difficult technical decision"
— depending on which angle you emphasize. A story bank gives you flexible raw
material rather than brittle pre-matched answers.

## The eight question categories to cover

Map at least one strong story to each:

1. **Challenge / perseverance** — something hard you pushed through
2. **Conflict** — disagreement with a colleague or stakeholder
3. **Failure** — something that didn't go as planned and what changed
4. **Leadership / influence** — driving an outcome beyond your job description
5. **Ambiguity** — navigating a situation with incomplete information
6. **Collaboration** — working across teams or functions toward a shared goal
7. **Growth / learning** — a skill or area you developed significantly
8. **Impact / achievement** — your clearest evidence of outsized contribution

## How to prepare each story

For each story, write out the full STAR arc in a doc. Then compress it to six
bullet points. Then practice saying it out loud until it runs 90–120 seconds
without notes. The bullet version is for review the night before — you never
read from it in the interview.

## Questions for them

"Do you have any questions for me?" is not a formality — it's evaluated. Strong
candidates ask about:

- Team dynamics and how decisions get made
- What success looks like in the first 90 days
- What's the hardest unsolved problem on the team right now

Weak candidates ask about salary (save it for the recruiter), vacation policy, or
say "I think you covered everything."

## The day before

Review your story bank, do two or three out-loud run-throughs of your toughest
stories, and get enough sleep. Fatigue is the most common cause of rambling and
losing the thread mid-answer.`,
      questions: [
        {
          prompt: "Why is a 'story bank' more effective than memorizing one answer per question?",
          options: [
            "Because interviewers penalize candidates who seem over-prepared",
            "Because behavioral questions vary in phrasing but follow predictable themes — one strong story can address multiple question types depending on emphasis",
            "Because story banks allow you to avoid preparing for failure questions",
          ],
          answer: 1,
          explanation:
            "Flexibility beats rigid memorization. A rich story about a cross-functional project can answer conflict, leadership, ambiguity, or collaboration questions — you just adjust the lens.",
        },
        {
          prompt: "Which of these is the weakest response to 'Do you have any questions for me?'",
          options: [
            "'What does success look like in the first 90 days for someone in this role?'",
            "'I think you covered everything — I'm good, thanks.'",
            "'What's the hardest unsolved problem your team is wrestling with right now?'",
          ],
          answer: 1,
          explanation:
            "Saying 'I'm good' signals low curiosity and low engagement. Asking substantive questions about the team, the role, or real challenges shows you're evaluating the opportunity seriously — which is a positive signal.",
        },
        {
          prompt: "You have one hour the evening before a behavioral interview. What's the highest-leverage use of that hour?",
          options: [
            "Doing three more LeetCode mediums to stay sharp technically",
            "Reviewing your story bank, doing out-loud run-throughs of two or three stories, and sleeping adequately",
            "Writing new stories from scratch for question types you haven't covered",
          ],
          answer: 1,
          explanation:
            "Fresh preparation the day before is low-value; rehearsal of well-developed stories is high-value. And sleep is not optional — fatigue kills story recall and narrative coherence mid-answer.",
        },
      ],
      explanation:
        "Build the bank once, maintain it, and practice out loud. Eight categories, 90-second stories, and genuine questions for them — that's the whole system.",
    },
  ],
};
