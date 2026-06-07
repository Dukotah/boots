import type { Module } from "./types";

// AI for Students: Study Smarter — a practical, no-code course for learners
// at any level (high school through university) who want to use AI as a genuine
// study tool. Covers everything from choosing the right tool for the task, to
// avoiding academic-integrity pitfalls, to building long-term study habits that
// survive the next model upgrade. All quiz/reading lessons (no coding required).
export const aiForStudents: Module = {
  slug: "ai-for-students",
  title: "AI for Students: Study Smarter",
  description:
    "Learn to use AI as a genuine study partner — not a shortcut that backfires. Covers reading comprehension, note-taking, essay drafting, exam prep, research, math help, and how to stay on the right side of your school's academic integrity policy.",
  emoji: "🎓",
  gradient: "from-sky-500/20 to-indigo-500/10",
  tagline:
    "Use AI to understand harder material faster, write better essays, and prepare for exams — without getting yourself in academic trouble.",
  keywords: [
    "AI for students",
    "AI study tips",
    "how to use AI for school",
    "ChatGPT for studying",
    "Claude for students",
    "AI homework help",
    "study smarter with AI",
    "AI academic integrity",
    "AI for college students",
  ],
  lessons: [
    {
      slug: "ai-as-your-study-partner",
      title: "AI as Your Study Partner",
      blurb: "Reframe AI from answer-machine to thinking partner — the shift that makes it actually useful.",
      xp: 20,
      kind: "quiz",
      content: `# AI as Your Study Partner

Most students pick up an AI tool for the first time because they're stuck on an
assignment and want a quick answer. That's understandable — but it's also the
lowest-value way to use the technology.

The highest-value framing is: **AI is a study partner who never runs out of
patience, never judges your questions, and can explain anything at any level.**

That reframe opens up a completely different set of moves:

- **Stuck on a concept?** Don't just ask for the answer — ask it to explain the
  idea three different ways until one clicks.
- **Need to check your understanding?** Say "quiz me on what I just read" and
  paste in the notes.
- **Confused by a textbook paragraph?** Paste it in and ask "explain this like
  I'm in 10th grade."
- **Writing feels hard?** Talk through what you're trying to argue, then ask it
  to reflect your ideas back as an outline.

The student who gets the most from AI is not the one who copy-pastes the most.
It's the one who **uses AI to think harder, not less**.

One thing to keep clearly in mind: AI can be wrong — confidently, fluently wrong.
For facts, statistics, citations, and anything in a graded assignment that really
matters, verify against your textbook, lecture notes, or a credible source. AI is
best as a *thinking scaffold*, not as a fact authority.`,
      questions: [
        {
          prompt: "Which student is getting the most educational value from AI?",
          options: [
            "Student A pastes the essay prompt and submits whatever comes back",
            "Student B explains their own argument to the AI and asks it to reflect it back as an outline to refine",
            "Student C only uses AI to check spelling",
          ],
          answer: 1,
          explanation:
            "Student B is using AI to scaffold their own thinking — the ideas stay theirs, the understanding deepens, and the final work is stronger. Student A gets a grade, not learning.",
        },
        {
          prompt: "You've read a textbook section three times and still don't get it. Best AI move?",
          options: [
            "Ask AI to summarize the chapter so you don't have to read it",
            "Paste the confusing passage and ask it to explain the concept three different ways until one clicks",
            "Ask AI if the chapter will be on the exam",
          ],
          answer: 1,
          explanation:
            "Asking for multiple explanations until one lands is one of AI's genuine superpowers — it has infinite patience and can change register, metaphor, or approach on demand.",
        },
        {
          prompt: "Why should you verify important facts AI gives you against your textbook or lecture notes?",
          options: [
            "Because AI tools are always slow to update their training data by exactly one semester",
            "Because AI generates plausible-sounding text and can be confidently wrong — especially on specific figures, citations, and technical details",
            "Because professors prefer students who cite physical books",
          ],
          answer: 1,
          explanation:
            "AI predicts likely text, not verified facts. It can state an incorrect statistic or misremember a detail with full confidence. Treat it as a scaffold, not an authority.",
        },
      ],
      explanation:
        "The best study-partner mindset: use AI to think harder and understand deeper, never to skip the thinking entirely. Verify what matters.",
    },
    {
      slug: "reading-and-comprehension",
      title: "Faster Reading, Deeper Understanding",
      blurb: "Techniques for using AI to unlock dense textbooks, papers, and long readings.",
      xp: 20,
      kind: "quiz",
      content: `# Faster Reading, Deeper Understanding

Dense academic texts — journal articles, legal cases, historical primary sources,
scientific papers — are slow even for experts. AI can dramatically cut the
friction without cutting the understanding.

**Before you read — prime your comprehension:**

Ask the AI for a 3-sentence overview of the topic. This gives you a mental map so
the details have somewhere to land when you read.

**While you read — interrogate the hard parts:**

Paste any passage that loses you and ask:

- "What is the author's main claim in this paragraph?"
- "Define [term] as it's used in this context."
- "Why does this matter for the broader argument?"

**After you read — test your understanding:**

Don't stop when you reach the end. Ask the AI to:

- "Give me five questions about this reading I should be able to answer."
- "What are the three strongest objections to the author's argument?"
- "Summarize this paper in one paragraph as if explaining to a curious 16-year-old."

**A word on summaries:** AI-generated summaries are useful orientation tools, not
replacements for reading. For courses where the details matter — lab reports,
close-reading essays, any graded discussion — do the reading and use the AI
to *deepen* it, not skip it. Your professor assigned the text for a reason.`,
      questions: [
        {
          prompt: "What's the most effective way to use an AI summary of a reading?",
          options: [
            "As a replacement — if AI can summarize it, you don't need to read it",
            "As orientation before reading — a mental map so the details have somewhere to land",
            "As the source to cite in your essay",
          ],
          answer: 1,
          explanation:
            "A pre-read summary primes comprehension. It's a scaffold, not a substitute — the actual reading builds the depth of understanding that summaries can't give you.",
        },
        {
          prompt: "You're reading a dense philosophy paper and lose the thread on page 4. Best move?",
          options: [
            "Skip to the conclusion and summarize that",
            "Paste the confusing paragraph and ask 'What is the author's main claim here, and why does it matter for the broader argument?'",
            "Ask AI to rewrite the entire paper more simply so you can read that version instead",
          ],
          answer: 1,
          explanation:
            "Targeted interrogation of the specific hard passage — not a wholesale rewrite — keeps you reading the real thing while AI removes the specific blocker.",
        },
        {
          prompt: "After finishing a reading, what's the highest-value AI follow-up?",
          options: [
            "Ask it to give you five questions you should be able to answer, then actually try to answer them",
            "Ask it to write your reflection essay for you",
            "Ask it if the reading was worth your time",
          ],
          answer: 0,
          explanation:
            "Self-testing immediately after reading is one of the most evidence-backed learning strategies. AI makes it effortless to generate good questions on any material.",
        },
      ],
      explanation:
        "Prime before, interrogate during, test after. AI transforms dense reading from a passive slog into an active dialogue.",
    },
    {
      slug: "note-taking-and-studying",
      title: "Smarter Notes & Active Recall",
      blurb: "Use AI to process your notes into flashcards, quizzes, and spaced-repetition fodder.",
      xp: 22,
      kind: "quiz",
      content: `# Smarter Notes & Active Recall

Taking notes is not studying. Passively re-reading notes is barely studying.
The evidence on learning consistently points to the same techniques: **retrieval
practice** (testing yourself) and **spaced repetition** (returning to material
across increasing intervals). AI makes both dramatically easier to set up.

**From raw notes to study material:**

After a lecture, paste your notes and ask:

- "Turn these into 10 flashcard-style Q&A pairs."
- "List the five most important concepts and give me a one-sentence definition of each."
- "What did I miss? Based on these notes, what would a student likely still be confused about?"

**Active recall sessions:**

Don't just review — get tested:

- "Quiz me on [topic]. Give me one question at a time and wait for my answer."
- "I think the answer is [X]. Am I right? What did I miss?"
- "Explain [concept] back to me and tell me if I've got it right."

**The Feynman technique, AI-powered:**

Try to explain the concept yourself in simple language, then ask the AI:
"I'll explain [topic] — tell me where my understanding breaks down."
This is one of the fastest ways to find exactly where your knowledge has holes.

**One caution:** AI-generated flashcards can contain errors, especially for
specialized or technical topics. Always scan them against your actual lecture notes
or textbook before trusting them as your only study source.`,
      questions: [
        {
          prompt: "Why is re-reading notes considered a weak study technique?",
          options: [
            "Because notes are always inaccurate",
            "Because it feels familiar without actually testing whether you can retrieve the information — which is what exams require",
            "Because professors don't allow it",
          ],
          answer: 1,
          explanation:
            "Familiarity is not the same as retrieval. Re-reading creates an illusion of knowing. Actual testing — where you try to produce the answer without looking — is what builds durable memory.",
        },
        {
          prompt: "You paste your lecture notes into an AI and ask it to quiz you. It gives you a question and you're not sure of the answer. Best move?",
          options: [
            "Ask the AI to just give you the answer immediately",
            "Make your best attempt, then ask the AI if you're right and what you missed",
            "Close the chat and read the notes passively again",
          ],
          answer: 1,
          explanation:
            "The effort of attempting an answer — even imperfectly — is where the learning happens. Giving up immediately skips the retrieval practice that makes the material stick.",
        },
        {
          prompt: "You want to find the exact gaps in your understanding before an exam. Which AI technique works best?",
          options: [
            "Ask it to write a study guide for the whole topic so you can read it",
            "Explain the concept yourself in plain language and ask AI to point out where your understanding breaks down",
            "Ask it which topics the exam will cover",
          ],
          answer: 1,
          explanation:
            "This is the Feynman technique: teaching forces precision, and AI can pinpoint exactly where your explanation goes fuzzy — which is exactly where to focus your review.",
        },
      ],
      explanation:
        "Notes are raw material. AI turns them into retrieval practice — the single most evidence-backed study method — in minutes.",
    },
    {
      slug: "essays-and-writing",
      title: "Writing Better Essays",
      blurb: "Use AI to brainstorm, outline, and edit — while keeping the ideas and voice genuinely yours.",
      xp: 25,
      kind: "quiz",
      content: `# Writing Better Essays

AI is most useful in the writing process at the **beginning** (getting unstuck,
building a structure) and the **end** (editing, sharpening). Least useful, and
most risky, in the **middle** — where your original thinking has to happen.

**Getting started (brainstorm and outline):**

- "My essay prompt is [X]. Help me brainstorm five angles I could take."
- "Here's the position I want to argue: [Y]. What are the strongest counterarguments
  I'll need to address?"
- "Turn my rough notes into a logical 5-paragraph outline."

Talk through your ideas *before* asking for an outline, so the structure reflects
your thinking, not a generic one.

**Drafting — stay in the driver's seat:**

Write your own draft first. It will be rough — that's fine. The point is that the
ideas and argument are yours. Then use AI for improvement, not creation:

- "Here's my intro. Does the thesis clearly state my position?"
- "My argument in paragraph 3 feels weak. Here's what I'm trying to say — how can
  I make it more persuasive?"
- "Does this essay have a logical flow? What's confusing or missing?"

**Editing pass:**

- "Check this for clarity and grammar without changing my voice or argument."
- "Flag any places where my claim is unsupported or vague."

**The critical rule:** Submitting AI-generated text as your own writing is
academic dishonesty at most institutions. Using AI to improve *your* writing is
generally accepted — but check your course's policy, because they vary. When
in doubt, ask your instructor.`,
      questions: [
        {
          prompt: "At which stage of the writing process does AI add the most value without academic risk?",
          options: [
            "Writing the entire draft for you to submit",
            "Brainstorming angles and counterarguments before you write, and editing for clarity after you've drafted",
            "Choosing your essay topic",
          ],
          answer: 1,
          explanation:
            "AI shines at scaffolding (before) and polishing (after). The middle — forming the argument, generating original analysis — is where your intellectual contribution must happen.",
        },
        {
          prompt: "You've written a paragraph but it feels unclear. The best way to use AI to fix it is:",
          options: [
            "Ask AI to rewrite the paragraph from scratch",
            "Paste your paragraph and explain what you were trying to say — ask it to help you say that more clearly",
            "Delete the paragraph and start a new topic",
          ],
          answer: 1,
          explanation:
            "Preserving your intent while improving clarity keeps the thinking yours. Asking AI to rewrite from scratch risks replacing your argument with a generic one.",
        },
        {
          prompt: "Your course policy is unclear on AI use. What should you do before submitting an AI-assisted essay?",
          options: [
            "Submit it anyway — if the policy isn't explicit, it's allowed",
            "Ask your instructor what level of AI assistance is acceptable for this assignment",
            "Use a private/incognito browser so the AI company can't tell",
          ],
          answer: 1,
          explanation:
            "Policies vary widely between courses, departments, and institutions. Asking is the only reliable way to stay on the right side — and most instructors appreciate the transparency.",
        },
      ],
      explanation:
        "AI is a writing coach, not a ghostwriter. Use it to structure your thinking and polish your prose — never to replace the thinking itself.",
    },
    {
      slug: "research-and-citations",
      title: "Research Help & Citation Traps",
      blurb: "How to use AI to orient your research — and why you must never cite AI as a source.",
      xp: 22,
      kind: "quiz",
      content: `# Research Help & Citation Traps

AI can dramatically accelerate the *discovery* phase of research while creating a
very specific trap: **hallucinated citations**. Understanding both is essential
for any student doing academic work.

**What AI is good for in research:**

- **Topic orientation** — "Give me a plain-language overview of [topic] and the
  key debates in the field." Use this as a starting point to know *what to search
  for*, not as the research itself.
- **Keyword generation** — "What search terms should I use to find academic papers
  on [topic]?" Then take those terms to Google Scholar, JSTOR, or your library.
- **Simplifying sources** — paste an abstract or excerpt and ask "what's the main
  claim and methodology in plain language?"
- **Structuring a lit review** — "Based on these sources [paste titles/abstracts],
  what are the common themes and tensions?"

**The citation trap:**

If you ask AI to list sources, it will often produce plausible-looking but
completely fabricated citations — real-sounding author names, journals, and dates,
for papers that do not exist. This has ended academic careers and caused
professional embarrassment.

**Rule: never cite a source you haven't read and verified yourself.**

Search Google Scholar or your library database for every source before citing it.
If you can't find it, it probably doesn't exist.

**A useful middle ground:** Ask AI to explain a concept, then find a real source
that confirms it, and cite the real source.`,
      questions: [
        {
          prompt: "You ask an AI for five academic sources on climate policy. It gives you five citations with authors, journals, and years. What should you do?",
          options: [
            "Cite all five — AI wouldn't make up real-looking citations",
            "Search for each one in Google Scholar or your library database and verify they exist and say what the AI claimed before citing any",
            "Trust the ones that look like reputable journals",
          ],
          answer: 1,
          explanation:
            "AI frequently fabricates citations that look completely plausible. The only safe rule is: if you haven't verified it exists and read it yourself, don't cite it.",
        },
        {
          prompt: "What is the best use of AI in the early stages of academic research?",
          options: [
            "Getting a plain-language orientation to the topic and generating search terms to use in real databases",
            "Building your entire bibliography from AI's suggestions",
            "Having AI read the sources so you don't have to",
          ],
          answer: 0,
          explanation:
            "AI excels at giving you a conceptual map and vocabulary so you know what to look for. The actual sources must come from verified academic databases — AI points the way, the library delivers.",
        },
        {
          prompt: "Can you cite an AI chatbot itself as a source in an academic paper?",
          options: [
            "Yes, always — it's a valid primary source like a website",
            "It depends: some fields allow it for specific purposes (e.g., studying AI output), but it is never a substitute for citing peer-reviewed research or primary sources",
            "No, never under any circumstances in any context",
          ],
          answer: 1,
          explanation:
            "Context matters. Citing AI as evidence for a factual claim is almost always inappropriate — AI output is not peer-reviewed. Some disciplines do allow citing AI for methodological transparency (e.g., 'this text was generated by…'). Check your style guide and instructor.",
        },
      ],
      explanation:
        "AI is a research navigator, not a source. Use it to find your way around, then verify everything in a real database before it touches your bibliography.",
    },
    {
      slug: "math-and-stem-help",
      title: "Math, Science & Problem-Solving",
      blurb: "How to use AI to understand STEM concepts — and the step-by-step trap to avoid.",
      xp: 23,
      kind: "quiz",
      content: `# Math, Science & Problem-Solving

AI is a genuinely useful tutor for STEM subjects — with one specific trap that
catches almost every student who uses it carelessly.

**Where AI helps:**

- **Concept explanations** — "Explain what a derivative actually represents
  geometrically" is a great prompt. AI can offer multiple framings until one lands.
- **Worked examples** — "Show me a worked example of [problem type] with the steps
  explained." Then do the next problem yourself.
- **Checking your reasoning** — "Here's my work for this integral. What step did I
  get wrong?" is a much better use than "Solve this integral for me."
- **Unit conversions, formula lookups, quick sanity checks** — safe and fast.
- **Physics/chemistry conceptual questions** — "Why does a heavier and a lighter
  ball hit the ground at the same time?" is a perfect AI question.

**The step-by-step trap:**

When you ask AI to solve a problem for you, it will produce a polished, step-by-step
solution. It feels like learning. It isn't. You've watched someone else solve it —
exactly like watching a lecturer work through an example without ever picking up a pen.

In a course where similar problems appear on the exam, you will fail to reproduce
the work. And if you submit AI's solution as your own, that's academic dishonesty.

**The right pattern:**

1. Attempt the problem yourself first, even if you get stuck.
2. Show AI *your attempt* and ask where you went wrong.
3. Understand the correction, then close the AI and redo the problem from scratch.

**One reliability note:** AI makes arithmetic and algebraic errors, especially on
multi-step problems. Always check numerical answers with a calculator.`,
      questions: [
        {
          prompt: "You're stuck on a calculus problem. Which is the best AI-assisted approach?",
          options: [
            "Ask AI to solve it fully, copy the solution, and move on",
            "Attempt the problem yourself, show AI your work, ask where you went wrong, then redo it from scratch once you understand",
            "Ask AI to explain calculus in general so you feel better about it",
          ],
          answer: 1,
          explanation:
            "Attempting first means you engage with the problem. Showing your work means AI targets the specific flaw in your reasoning. Redoing it closes the loop — now you can solve it, not just watch it be solved.",
        },
        {
          prompt: "AI gives you a multi-step algebra solution. You should:",
          options: [
            "Trust it completely — computers don't make arithmetic mistakes",
            "Verify numerical steps with a calculator, since AI does make arithmetic and algebraic errors on multi-step problems",
            "Assume it's wrong and redo it entirely without AI",
          ],
          answer: 1,
          explanation:
            "AI language models are not calculators. They can produce confident, wrong arithmetic. For any numerical result that matters, verify it independently.",
        },
        {
          prompt: "What does 'watching AI solve a problem' have in common with 'watching a lecturer work through an example'?",
          options: [
            "Nothing — AI explanations are always better than human ones",
            "Both feel like learning but don't build the retrieval ability needed to reproduce the work yourself on an exam",
            "Both are acceptable to submit as your own homework",
          ],
          answer: 1,
          explanation:
            "Passive observation — whether of a human or an AI — doesn't transfer into doing. The only way to build problem-solving skill is to actually solve problems, with the AI as a coach not a solution key.",
        },
      ],
      explanation:
        "Attempt first, get coached on your errors, redo it yourself. That loop turns AI into a STEM tutor instead of a solution-copying service.",
    },
    {
      slug: "ai-integrity-and-lifelong-learning",
      title: "Integrity, Policy & Learning That Lasts",
      blurb: "Capstone: navigate AI policies, build habits that survive the next model upgrade, and stay in control of your education.",
      xp: 25,
      kind: "quiz",
      content: `# Integrity, Policy & Learning That Lasts

You've covered the practical techniques. The capstone question is: **how do you use
AI in a way that actually makes you smarter over time — and doesn't put your
academic standing at risk?**

**Understanding the policy landscape (as of 2026):**

Academic AI policies vary enormously. Some instructors ban AI entirely. Some
require disclosure of any AI use. Some actively require AI as part of the workflow.
Many are still evolving.

The only reliable strategy is **ask before you assume.** "Is AI assistance
permitted on this assignment, and if so, to what degree?" is a completely reasonable
question to ask any instructor — and it shows you're thinking seriously about integrity.

**The core integrity principle:**

AI use becomes academic dishonesty when the *intellectual contribution* the
assignment was designed to elicit comes from the AI instead of you. A
few tests to ask yourself:

- If I submitted this, would I be able to explain every part of it in a conversation
  with my professor?
- Did using AI teach me something, or did it let me skip learning something?
- Would I be comfortable if my instructor knew exactly how I used AI?

If any answer is uncomfortable, revise your approach before submitting.

**Learning that lasts:**

AI tools will keep changing. The students who benefit most in 2030 won't be the
ones who are expert at a specific tool — they'll be the ones who can think
critically, form their own arguments, recognize what's wrong, and learn quickly.
Using AI as a thinking scaffold *builds* those skills. Using it as a shortcut
*atrophies* them.

You are training your own mind. Every assignment is a rep. Make it count.`,
      questions: [
        {
          prompt: "Your professor hasn't mentioned an AI policy for the upcoming essay. What should you do?",
          options: [
            "Assume anything is allowed since they didn't say otherwise",
            "Ask the professor directly what level of AI assistance is acceptable before you begin",
            "Use AI heavily but don't mention it — what they don't know won't hurt them",
          ],
          answer: 1,
          explanation:
            "Policies vary and are still evolving — silence doesn't mean permission. Asking before you start is the only reliable way to stay clearly within bounds, and instructors respect the initiative.",
        },
        {
          prompt: "Which of these is the clearest sign that an AI use has crossed into academic dishonesty?",
          options: [
            "Using AI to generate an outline for your essay",
            "Submitting an essay you couldn't explain or defend in a conversation with your professor because AI wrote the argument",
            "Asking AI to check your grammar after you've written a full draft",
          ],
          answer: 1,
          explanation:
            "The line is intellectual contribution. If the core thinking came from AI and you couldn't reproduce or defend it, the assignment's educational purpose has been circumvented — and that's the definition of academic dishonesty.",
        },
        {
          prompt: "Which student is best positioned to thrive academically as AI tools continue to evolve?",
          options: [
            "The student who has memorized the best prompts for every assignment type",
            "The student who uses AI to scaffold their own critical thinking and can form original arguments independently",
            "The student who refuses to use AI at all to stay pure",
          ],
          answer: 1,
          explanation:
            "Prompt tricks become outdated when tools change. Critical thinking, argument formation, and the ability to learn quickly are durable. AI used as a scaffold builds those. AI used as a shortcut erodes them.",
        },
      ],
      explanation:
        "Ask before you assume, keep the thinking yours, and treat every assignment as a practice rep for your own mind. The students who thrive long-term are the ones who use AI to grow — not to coast.",
    },
  ],
};
