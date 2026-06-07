import type { Module } from "./types";

// Public Speaking for Techies — a quiz-only module for developers, engineers,
// and technical professionals who need to communicate clearly with humans:
// team standups, demos, conference talks, stakeholder briefings, and beyond.
export const publicSpeakingTech: Module = {
  slug: "public-speaking-tech",
  title: "Public Speaking for Techies",
  description:
    "Most technical professionals can build anything but freeze when it's time to present. This module covers the specific communication skills engineers need: translating complexity, running tight demos, handling live Q&A, owning the room at standups, and delivering a conference talk without dying inside.",
  emoji: "🎤",
  gradient: "from-rose-500/20 to-pink-500/10",
  tagline:
    "Stop hiding behind the slide deck. Learn to present technical work with clarity, confidence, and zero jargon spiral.",
  keywords: [
    "public speaking for developers",
    "technical presentations",
    "how to present to non-technical audiences",
    "conference talk tips",
    "standup communication",
    "engineering communication skills",
    "demo presentation skills",
    "presenting technical work",
  ],
  lessons: [
    {
      slug: "why-techies-struggle-to-present",
      title: "Why Techies Struggle to Present",
      blurb: "The specific patterns that trip up technical communicators — and what to do instead.",
      xp: 20,
      kind: "quiz",
      content: `# Why Techies Struggle to Present

Technical professionals are trained to be precise. That same precision, applied directly to a presentation, often produces the opposite of clarity for a general audience.

A few patterns that reliably derail technical presenters:

**The Completeness Trap.** Engineers feel obligated to mention every caveat, edge case, and exception. Audiences experience this as noise that buries the point. You can be complete in the docs; in a talk, be *complete enough*.

**Jargon Comfort Zone.** Acronyms and technical terms feel natural to you because they're precise. To mixed audiences, they're a wall. The fix isn't to "dumb it down" — it's to translate without losing accuracy.

**Leading with How, Not What or Why.** Technical people instinctively explain how something works before saying what it does or why anyone should care. Audiences need the "what" and "why" first, or they have no frame to hang the "how" on.

**The Slide Safety Blanket.** Dense slides let you avoid eye contact and feel covered. But if the audience is reading, they're not listening. Slides are a visual aid, not a script.

**Fear of Simplification.** Worrying that simplifying is dishonest. It isn't — it's translation. A great technical communicator chooses the right level of abstraction for the room.

The good news: these are all habits, not personality traits. Every one of them is fixable with deliberate practice.`,
      questions: [
        {
          prompt: "A developer is presenting a new API to a group of product managers and sales staff. She covers every authentication edge case in detail before explaining what the API does. What is the core mistake?",
          options: [
            "Leading with 'how' before 'what' and 'why' — the audience has no frame for the detail yet",
            "Using too many slides",
            "Speaking too quickly",
          ],
          answer: 0,
          explanation:
            "Audiences need context before detail. Stating what the thing does and why it matters first gives listeners a frame to hang the technical specifics on. Detail without context reads as noise.",
        },
        {
          prompt: "An engineer simplifies a complex distributed system to 'three services that talk to each other' for a non-technical executive briefing. A colleague says that's dishonest. Who is right?",
          options: [
            "The colleague — you must always present the full technical picture",
            "The engineer — choosing the right level of abstraction for the audience is good communication, not dishonesty",
            "Both are wrong; you should just hand out the architecture diagram",
          ],
          answer: 1,
          explanation:
            "Simplification is translation, not deception. The goal is accurate understanding, not exhaustive coverage. The right abstraction level depends on who is in the room and what decision they need to make.",
        },
        {
          prompt: "Which habit most often causes a technical presenter to lose a mixed audience early?",
          options: [
            "Making eye contact with different people in the room",
            "Starting with a clear statement of the problem being solved",
            "Using dense acronym-heavy language without defining terms",
          ],
          answer: 2,
          explanation:
            "Unexplained jargon creates a wall for non-specialists. Once an audience feels lost, they mentally check out. Defining terms or replacing them with plain language keeps everyone in the conversation.",
        },
      ],
      explanation:
        "Recognizing your own default patterns — completeness trap, jargon comfort zone, leading with 'how' — is the first step. All of them are habits, and habits change.",
    },
    {
      slug: "structuring-a-technical-talk",
      title: "Structuring a Technical Talk",
      blurb: "The frameworks that keep complex content followable from first slide to last.",
      xp: 22,
      kind: "quiz",
      content: `# Structuring a Technical Talk

Good structure is invisible — the audience just feels like they always knew where they were. Bad structure is visible — people look lost, questions come at the wrong times, and the ending feels like a cliff.

**The classic structure for technical talks:**

1. **Hook** — One sentence or image that makes the audience care. A bug that cost $1M. A screenshot of a 504 error at 2 AM. A stat.
2. **Problem** — What breaks, slows down, or costs resources without this? Establish stakes.
3. **Solution Overview** — What you built or decided, in plain terms. One sentence.
4. **How It Works** — The technical depth. This is where engineers live, but keep it bounded.
5. **Demo or Evidence** — Show, don't just tell. Results, benchmarks, a live run.
6. **Tradeoffs / Limitations** — Builds credibility. Audiences trust people who acknowledge constraints.
7. **Takeaway / Call to Action** — What should the audience do, think, or remember?

**Rule of three for key points.** Humans remember roughly three things from a talk. Identify your three and reinforce them. Everything else is scaffolding.

**Signposting.** Explicitly tell the audience where you are: "Now that we've seen the problem, let's look at the solution." Signposts feel obvious to the speaker and invaluable to the listener.

**The ending matters as much as the beginning.** Don't trail off into "any questions?" Land a crisp final sentence that restates your single most important point.`,
      questions: [
        {
          prompt: "In a technical talk structure, why should 'Tradeoffs / Limitations' be included rather than omitted to appear more confident?",
          options: [
            "Regulatory requirements often mandate it",
            "Acknowledging constraints builds audience trust and credibility; omitting them makes you seem unaware",
            "It fills time when the demo is short",
          ],
          answer: 1,
          explanation:
            "Technical audiences know every solution has tradeoffs. Pretending otherwise signals naivety. Addressing limitations proactively shows rigor and makes the rest of your claims more believable.",
        },
        {
          prompt: "A presenter ends their 20-minute architecture talk with: '...and yeah, so, that's basically it — any questions?' What should they do instead?",
          options: [
            "Add more slides so there's no need for Q&A",
            "Land a crisp final sentence restating the single most important point before opening Q&A",
            "Apologize for running long",
          ],
          answer: 1,
          explanation:
            "The ending is the last thing the audience hears and the part most likely to stick. A clear closing statement — 'This approach cut our deployment time in half; we're rolling it out next sprint' — leaves a clean impression before Q&A.",
        },
        {
          prompt: "Why do experienced presenters use signposting phrases like 'Now that we've covered the problem, let's look at the solution'?",
          options: [
            "To pad the talk to the allocated time",
            "Because it helps the audience track where they are in the structure and stay oriented",
            "To avoid technical questions mid-talk",
          ],
          answer: 1,
          explanation:
            "Signposts feel redundant to the speaker because they know the structure. For the audience, they're navigational landmarks that prevent the 'wait, where are we?' mental drift that causes people to lose the thread.",
        },
      ],
      explanation:
        "Hook, Problem, Solution, How, Evidence, Tradeoffs, Takeaway — plus three memorable points, clear signposts, and a crisp landing. That's the repeatable skeleton.",
    },
    {
      slug: "translating-tech-for-non-tech-audiences",
      title: "Translating Tech for Non-Tech Audiences",
      blurb: "Analogies, abstraction levels, and the mindset shift that makes it click.",
      xp: 22,
      kind: "quiz",
      content: `# Translating Tech for Non-Tech Audiences

The goal of a technical presentation to a non-technical audience is not to make them understand everything — it is to make them understand enough to make the decision or take the action you need from them.

**Know what they need to decide.** Before writing a single slide, ask: what does this audience need to do after this meeting? Approve budget? Prioritize the roadmap? Unblock a hire? Work backward from that decision to the minimum technical context required.

**Use analogies — but test them.** Analogies accelerate understanding dramatically, but a broken analogy (one that's technically inaccurate in ways that matter) can mislead. A good rule: use the analogy to build intuition, then briefly acknowledge where it breaks down.

Examples:
- A cache is like a sticky-note on your monitor: fast to check, but it gets stale.
- A database index is like the index at the back of a textbook — you look there first to find the page.
- An API is like a restaurant menu: you tell it what you want from a fixed set of options; it handles the kitchen.

**Avoid jargon, or define it immediately.** If you use a term the audience doesn't know and don't define it within the next sentence, you've lost that portion of the audience for the rest of the talk.

**The curse of knowledge.** Once you know something, it's nearly impossible to remember what it felt like not to know it. The cure: practice explaining to someone genuinely outside the domain. Their confusion tells you exactly where your gaps are.`,
      questions: [
        {
          prompt: "A senior engineer is about to present a microservices migration to the CFO and VP of Sales. What should she determine first?",
          options: [
            "The exact number of services and their dependencies",
            "What decision or action the audience needs to take, so she can provide the minimum context required",
            "Whether to use slides or a whiteboard",
          ],
          answer: 1,
          explanation:
            "Working backward from the audience's decision clarifies what technical detail is actually necessary. Everything else is noise for that room, no matter how important it is in a technical review.",
        },
        {
          prompt: "You explain database replication using the analogy 'it's like making photocopies of a document.' A colleague points out this misrepresents eventual consistency. What is the best response?",
          options: [
            "Drop the analogy entirely — any inaccuracy disqualifies it",
            "Use the analogy to build initial intuition, then briefly note where it breaks down",
            "Argue that the analogy is good enough and keep it",
          ],
          answer: 1,
          explanation:
            "A good analogy with an acknowledged limitation is more honest and more memorable than no analogy. Saying 'it's like photocopies — except there's a short delay before all copies are identical' gives intuition AND accuracy.",
        },
        {
          prompt: "What is 'the curse of knowledge' in the context of technical communication?",
          options: [
            "Knowing too many technologies to explain any one clearly",
            "Once you know something, it becomes very hard to remember what it felt like not to know it — causing you to skip steps that novices need",
            "The tendency to over-research before a presentation",
          ],
          answer: 1,
          explanation:
            "The curse of knowledge is one of the most reliable barriers to good teaching and presenting. The practical antidote is explaining to a real non-expert and observing where they get lost.",
        },
      ],
      explanation:
        "Decide what the audience needs to leave able to do. Work backward to the minimum context. Use tested analogies. Define or cut jargon. That's translation, not dumbing down.",
    },
    {
      slug: "running-a-great-demo",
      title: "Running a Great Demo",
      blurb: "Demos can make or break a technical presentation. Here's how to make them land.",
      xp: 23,
      kind: "quiz",
      content: `# Running a Great Demo

Live demos are the most compelling way to show technical work — and the highest-risk. A frozen screen or a missing env var two minutes before a product review has ended more than one engineer's afternoon. Here is how to give a demo that works.

**The golden rule: never demo against production.** Always have a stable, seeded demo environment. Production is live traffic, live bugs, and live surprises.

**Rehearse the exact path.** Know the seven clicks or commands you will make, in order. The demo environment should be in the exact state you need before you walk on. Tab pre-opened. Login pre-done. Sample data pre-loaded. Nothing should require setup in front of the audience.

**Have a video backup.** Screen-record the demo working correctly at normal speed. If the internet dies or something breaks, you run the video. You mention it's a recording. You lose almost nothing.

**Narrate actions as you take them.** "I'm clicking Save, and you can see the record appears in the table immediately — that's the optimistic update working." Don't go silent while clicking; silence creates anxiety and loses the thread.

**Show the happy path first.** Demonstrate the core value in the first 60 seconds. Edge cases and error states come after, if at all — most audiences only need the core flow.

**Slower than you think.** Presenters move through demos at their own reading and comprehension speed. Audiences are seeing it for the first time. Pause on screens. Let things land.`,
      questions: [
        {
          prompt: "During a key product demo, the WiFi in the conference room drops. You prepared well. What happens?",
          options: [
            "You apologize and reschedule",
            "You switch to your pre-recorded screen-capture backup and note it's a recording — the demo continues",
            "You describe the demo verbally from memory",
          ],
          answer: 1,
          explanation:
            "A video backup is standard practice for high-stakes demos. It insulates you from internet, environment, and service outages. Disclosing that it's a recording is honest and costs you almost nothing with a prepared audience.",
        },
        {
          prompt: "Why should you narrate your actions during a live demo rather than clicking in silence?",
          options: [
            "It slows you down and gives the audience time to catch up",
            "It keeps the audience's attention, connects actions to outcomes, and eliminates the anxiety silence creates",
            "It proves you memorized the product",
          ],
          answer: 1,
          explanation:
            "Narration ('I'm clicking X, and notice Y happens') is what links cause and effect for people watching for the first time. Silence during a demo invites distraction, confusion, and 'wait, what just happened?'",
        },
        {
          prompt: "Before a major demo, you should ensure the demo environment is:",
          options: [
            "Connected to the production database so data is realistic",
            "In the exact pre-loaded state you need — login done, sample data ready, relevant tabs open",
            "Fully reset to a blank slate so the audience sees the setup process",
          ],
          answer: 1,
          explanation:
            "Setup time in front of an audience wastes goodwill, introduces error risk, and signals poor preparation. Arrive at the start state before anyone enters the room.",
        },
      ],
      explanation:
        "Demo in a stable environment, know your exact path, narrate as you go, have a video backup, show the happy path first, and move slower than feels necessary. That's a demo that lands.",
    },
    {
      slug: "handling-qa-and-hard-questions",
      title: "Handling Q&A and Hard Questions",
      blurb: "Turn the most feared part of any talk into a strength.",
      xp: 23,
      kind: "quiz",
      content: `# Handling Q&A and Hard Questions

Most technical presenters fear Q&A more than the talk itself — because it's the part where preparation meets unpredictability. With the right techniques, it becomes the part where experts shine.

**The pause is your friend.** When a hard question lands, do not rush to answer. A visible two-second pause signals that you're thinking, not panicking. It also gives you time to make sure you understood the question.

**Repeat or rephrase the question.** This serves three purposes: it confirms your understanding, it gives the rest of the room the question (in case they didn't hear it), and it buys a few extra seconds to form your answer.

**It's okay to say "I don't know."** Technical people sometimes improvise answers they're not sure about rather than admit uncertainty. This is a major credibility risk — one wrong improvised technical claim can undermine everything you said before. "I don't know, but I'll find out and follow up" is the honest, professional move.

**Separate understanding a question from agreeing with it.** "That's a great point" is filler that patronizes. "I understand what you're asking" is neutral and accurate.

**Handling hostile or multi-part questions:**
- Acknowledge the concern without being defensive.
- Break a multi-part question into parts: "There are two things in there — let me take them one at a time."
- If a question is derailing the room, offer to continue offline: "This deserves a longer conversation — can we grab ten minutes after?"

**Prepare your own questions.** For a major talk, write down the ten hardest questions the audience might ask. Draft answers. You will not be surprised.`,
      questions: [
        {
          prompt: "An audience member asks a question about a system behavior you're genuinely uncertain about. The most credible response is:",
          options: [
            "Improvise a plausible-sounding answer to avoid looking unprepared",
            "Admit you're not certain and commit to following up with the correct answer",
            "Redirect to a different part of the talk",
          ],
          answer: 1,
          explanation:
            "Technical credibility depends on accuracy. One wrong improvised claim, if caught, damages everything else you said. 'I'll confirm and follow up' is trusted precisely because it's honest.",
        },
        {
          prompt: "An audience member asks a three-part question quickly and the room looks lost. What is the best technique?",
          options: [
            "Answer all three parts simultaneously to show you can handle complexity",
            "Politely break the question into parts out loud: 'There are a few things in there — let me take them one at a time'",
            "Ask the audience member to submit questions in writing next time",
          ],
          answer: 1,
          explanation:
            "Naming the parts publicly resets everyone — the questioner, the room, and you. It prevents confusion about which part is being answered and gives structure to a complex exchange.",
        },
        {
          prompt: "Why should you repeat or rephrase a question before answering it?",
          options: [
            "To appear more confident even if you didn't understand",
            "To confirm understanding, ensure the whole room heard the question, and buy a moment to form a clear answer",
            "To fill time when you don't know the answer",
          ],
          answer: 1,
          explanation:
            "Rephrasing achieves three real things at once: comprehension check, audience inclusion, and thinking time. It's a genuine technique, not a stall tactic.",
        },
      ],
      explanation:
        "Pause, rephrase, admit uncertainty honestly, handle multi-part questions one at a time, and prepare your hardest questions in advance. Q&A is winnable.",
    },
    {
      slug: "standups-and-internal-meetings",
      title: "Standups, Status Updates, and Internal Meetings",
      blurb: "Communicate your technical work clearly to your team without over-explaining or under-communicating.",
      xp: 20,
      kind: "quiz",
      content: `# Standups, Status Updates, and Internal Meetings

Daily standups and internal status meetings are where most engineers communicate most often — and where the most time is quietly wasted. Getting these right has outsized impact on team velocity and how your work is perceived by managers and peers.

**The standup formula that works.** Three sentences:
1. What I completed since last standup (done — concrete deliverable).
2. What I'm working on until next standup (in progress — specific task, not "working on the feature").
3. Any blockers — what I need from someone else to continue.

Avoid: "I've been kind of going through the auth stuff and also looking at some of the edge cases" — this communicates nothing actionable.

**Status ≠ activity.** "I worked on X all day" is an activity update. "I completed the read path; the write path is blocked on the schema decision" is a status update. Status answers: where is the work relative to done?

**Async updates in writing.** When writing a Slack or email status update, apply the same formula. One sentence of done, one of in-progress, one of blockers. Be specific. Vague updates create follow-up questions that take more time than a clear update would have.

**Escalate blockers early.** A blocker that sits unreported for a day is a blocker that could have been resolved. "I'm blocked on X" said on day one is a much smaller problem than "I was blocked all week" said on Friday.

**Meeting hygiene.** If you're running a technical meeting: have an agenda, timebox each item, end with explicit next actions and owners. Meetings without next actions are discussions that felt like decisions.`,
      questions: [
        {
          prompt: "Which standup update gives the most actionable information?",
          options: [
            "'Been heads-down on the pipeline stuff, making decent progress.'",
            "'Finished the ingestion worker; writing tests now; blocked on staging access from DevOps.'",
            "'Still working through some complexity in the backend architecture.'",
          ],
          answer: 1,
          explanation:
            "The second update covers all three standup dimensions — what's done, what's next, and a specific blocker with a named dependency. The others report activity, not status.",
        },
        {
          prompt: "What is the difference between an 'activity update' and a 'status update'?",
          options: [
            "An activity update is longer; a status update is shorter",
            "An activity update says what you did; a status update says where the work stands relative to completion",
            "Status updates are for managers; activity updates are for peers",
          ],
          answer: 1,
          explanation:
            "Teams need to know where work is, not just that people were busy. 'Worked on X all day' doesn't tell a PM or tech lead whether X is nearly done or stuck. Status answers 'where is it?' not 'what did I do?'",
        },
        {
          prompt: "You discover you're blocked on a dependency from another team. When should you raise it?",
          options: [
            "At the Friday retrospective, to avoid looking dependent on others",
            "Immediately — at the next standup or async if sooner — so it can be resolved as fast as possible",
            "Only after you've been blocked for two or more days",
          ],
          answer: 1,
          explanation:
            "Every day a blocker goes unreported is a day it could have been resolved. Raising it early is not a sign of weakness — it's the professional move that keeps delivery on track.",
        },
      ],
      explanation:
        "Done / In-progress / Blockers. Status not activity. Escalate blockers early. End meetings with explicit owners. Small habits, big impact on how your work reads to everyone around you.",
    },
    {
      slug: "capstone-deliver-a-conference-talk",
      title: "Capstone: Deliver a Conference Talk",
      blurb: "Put it all together — proposal, structure, slides, rehearsal, and the day of.",
      xp: 25,
      kind: "quiz",
      content: `# Capstone: Deliver a Conference Talk

A conference talk is the ultimate form of technical public speaking. It combines structure, translation, demo skills, Q&A handling, and slide craft into one prepared, time-boxed performance. Here's the full lifecycle.

**Step 1: The Proposal (CFP).**
Conference talks start with a Call for Proposals. A strong submission has:
- A specific, concrete title ("How We Cut API Latency by 60% with Edge Caching" beats "Performance Patterns")
- A clear abstract — what problem you solved, how, and what the audience will walk away knowing
- Takeaways stated explicitly — most CFPs ask for 3-5 bullet points of what attendees will learn

**Step 2: Build Your Narrative.**
Use the structure from Lesson 2: Hook → Problem → Solution → How → Evidence → Tradeoffs → Takeaway. Identify your three main points. Everything else is scaffolding.

**Step 3: Slides.**
One idea per slide. Large text (minimum 24pt, ideally larger). Diagrams over bullet walls. Code samples that are short enough to read across the room. Avoid the "let me read you this slide" trap.

**Step 4: Rehearse — Out Loud.**
Thinking through a talk is not rehearsal. Speaking it out loud, on your feet, timing it, is rehearsal. Do it at least three times. The first run reveals structure gaps; the second and third build fluency.

**Step 5: Day-of Protocol.**
- Arrive early; test the projector and audio
- Meet the session organizer so they know who you are
- Have water at the podium
- Know your opening two sentences cold — a confident start carries the first two minutes

**Step 6: During the Talk.**
Breathe. Pause deliberately. Make eye contact with individuals, not the back wall. Treat questions as opportunities, not threats.`,
      questions: [
        {
          prompt: "A conference proposal is more likely to be accepted when it has:",
          options: [
            "A vague, broad title to appeal to the widest audience",
            "A specific, concrete title and explicit bullet points stating what attendees will learn",
            "The speaker's full CV and publication list",
          ],
          answer: 1,
          explanation:
            "Program committees select talks that promise a clear, specific value to attendees. 'How We Cut API Latency by 60%' tells a committee exactly who will come and what they'll get. 'Performance Patterns' could mean anything.",
        },
        {
          prompt: "What is the most important difference between mentally reviewing your talk and actual rehearsal?",
          options: [
            "Mental review is for amateurs; rehearsal is for professionals",
            "Rehearsal means speaking out loud, on your feet, timed — thinking through it silently reveals almost none of the gaps speaking does",
            "Rehearsal should involve a live audience to simulate conference conditions",
          ],
          answer: 1,
          explanation:
            "Silent mental review feels smooth because your brain fills in the gaps. Speaking out loud forces every transition, every sentence, every awkward silence to become real. Structure problems, timing issues, and unclear passages only surface when you physically say the words.",
        },
        {
          prompt: "You finish your conference talk with two minutes left for Q&A. An audience member asks a detailed question about a configuration detail you didn't cover. The best response is:",
          options: [
            "Apologize for not covering it and end the session",
            "Acknowledge it's a good detail, give what you know accurately, and offer to continue the conversation with them after the session if they want more depth",
            "Tell them the answer is in the GitHub repo and move on",
          ],
          answer: 1,
          explanation:
            "Conference Q&A rewards honest, generous engagement. Giving what you know accurately, then offering to continue the conversation, is the professional standard. It respects the questioner and the rest of the audience's time equally.",
        },
      ],
      explanation:
        "Proposal → Narrative → Slides → Out-loud rehearsal → Day-of prep → Confident delivery. Every lesson in this module feeds into this workflow. Public speaking is a craft — you improve by doing it.",
    },
  ],
};
