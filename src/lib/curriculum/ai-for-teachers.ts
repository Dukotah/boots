import type { Module } from "./types";

// AI for Teachers & Educators — a practical, all-quiz module for K–12 and higher
// ed instructors who want to use AI confidently in their professional practice.
// Covers pedagogy, policy, assessment integrity, accessibility, and responsible
// use — no coding or technical background required.
export const aiForTeachers: Module = {
  slug: "ai-for-teachers",
  title: "AI for Teachers & Educators",
  description:
    "A practical guide to AI in the classroom — for educators at any level. Learn to use AI tools to save prep time, differentiate instruction, give richer feedback, and navigate the real challenges: academic integrity, bias, privacy, and policy. No technical background required.",
  emoji: "🍎",
  gradient: "from-red-500/20 to-rose-500/10",
  tagline:
    "Use AI to plan lessons faster, give better feedback, and tackle academic integrity honestly — a practical guide for K–12 and higher ed teachers.",
  keywords: [
    "AI for teachers",
    "AI in the classroom",
    "AI lesson planning",
    "AI academic integrity",
    "AI feedback for students",
    "ChatGPT for teachers",
    "AI education tools",
    "AI differentiated instruction",
  ],
  lessons: [
    {
      slug: "why-ai-matters-for-educators",
      title: "Why AI Matters for Educators",
      blurb:
        "AI isn't replacing teachers — but it is changing what the job looks like. Here's the honest picture.",
      xp: 20,
      kind: "quiz",
      content: `# Why AI Matters for Educators

The arrival of capable AI assistants like Claude, Gemini, and ChatGPT is the
biggest shift in educational technology since the internet. That's not hype —
it's a reason to understand what's actually happening before deciding how to
respond.

**What AI can do right now (as of 2026):**

- Generate a full lesson plan draft in seconds
- Produce differentiated reading passages at multiple grade levels on demand
- Give detailed written feedback on a student essay in moments
- Answer student questions in dozens of languages
- Create practice quizzes, rubrics, discussion prompts, and parent communications
  from a brief description

**What AI cannot do:**

- Know your students — their histories, needs, relationships, and motivations
- Build the classroom culture and trust that drives learning
- Make judgment calls that require human values, ethics, and professional expertise
- Replace the irreplaceable: the human relationship between teacher and learner

The most useful frame: AI is an **assistant that handles drafting and routine
cognitive work**, freeing educators to do the parts of the job only humans can do.

Teachers who engage with AI now — understanding what it is, where it helps, and
where it fails — will be better positioned to guide students and schools through
a world where AI literacy is a core life skill.`,
      questions: [
        {
          prompt:
            "Which of the following best describes AI's role relative to teachers?",
          options: [
            "AI is a direct replacement for teachers in most classroom functions",
            "AI handles drafting and routine cognitive work so teachers can focus on relationship and judgment",
            "AI is only useful for administrative tasks outside the classroom",
          ],
          answer: 1,
          explanation:
            "AI accelerates the drafting and generation work — lesson plans, feedback, differentiated materials — but the irreplaceable parts of teaching (relationships, culture, professional judgment) remain human.",
        },
        {
          prompt:
            "A colleague says 'AI can't do anything meaningful in education.' Which counterpoint is most accurate?",
          options: [
            "AI can now fully teach any subject without a human teacher",
            "AI can generate differentiated materials, draft feedback, and answer questions in multiple languages — saving real preparation time",
            "AI is only useful for technology or computer science classes",
          ],
          answer: 1,
          explanation:
            "These capabilities are real and available today. The colleague's skepticism is understandable but misses concrete, immediate value AI delivers for lesson prep and student support.",
        },
        {
          prompt:
            "Why should educators engage with AI now rather than waiting?",
          options: [
            "Because AI will make the teaching profession obsolete within a year",
            "Because understanding AI helps educators guide students and institutions through a world where AI literacy is a core life skill",
            "Because schools require teachers to use AI tools by law",
          ],
          answer: 1,
          explanation:
            "Educators who understand AI's strengths and limits can make better decisions for their students and advocate effectively in school policy conversations — a professional responsibility, not a tech trend.",
        },
      ],
      explanation:
        "The goal isn't to be enthusiastic or fearful about AI — it's to be informed. Teachers who understand what AI actually does are better equipped to use it wisely and teach about it credibly.",
    },
    {
      slug: "lesson-planning-and-prep",
      title: "AI-Powered Lesson Planning & Prep",
      blurb:
        "Cut hours off your weekly prep by using AI to draft, iterate, and differentiate — while keeping your professional judgment in the driver's seat.",
      xp: 25,
      kind: "quiz",
      content: `# AI-Powered Lesson Planning & Prep

Lesson planning is where most educators see the fastest, most concrete return from
AI. A task that once took an hour can produce a usable first draft in two minutes —
leaving you time to refine it into something genuinely good.

## What to ask for

Be specific. The more context you give, the better the output:

- Grade level and subject
- Learning objectives (or ask AI to suggest some from a standard)
- Class duration
- Any constraints: mixed reading levels, students with IEPs, available materials

**Weak request:** "Write a lesson plan about the Civil War."

**Strong request:** "Write a 45-minute 8th-grade lesson plan on the economic
causes of the Civil War. Students have already covered the political timeline.
Include a 10-minute warm-up discussion, a primary-source analysis activity with
guiding questions, and an exit ticket. Two students are English language learners
— include a vocabulary scaffold."

## What to hand to AI vs what to keep yourself

AI is excellent at **structure, drafting, and variation**. You own **curriculum
alignment, classroom context, and final judgment** about what's actually right for
your students. Think of AI output as a starting draft, not a finished product.

## Efficiency moves

- Use AI to generate 3 versions of a bell-ringer and pick your favorite
- Ask for common student misconceptions on a topic before you teach it
- Generate a week's worth of exit ticket questions in one prompt
- Produce parent-ready summaries of what students are learning this unit`,
      questions: [
        {
          prompt:
            "You want AI to generate a lesson plan for a chemistry unit. Which request will produce the most useful first draft?",
          options: [
            "'Write a lesson plan about chemical reactions.'",
            "'Write a 50-minute 10th-grade lesson on balancing chemical equations. Students know atomic structure but haven't seen stoichiometry. Include a worked example, pair practice, and a 5-question formative check.'",
            "'What is a chemical reaction?'",
          ],
          answer: 1,
          explanation:
            "Specificity — grade, duration, prior knowledge, desired activities — gives the AI the constraints it needs to produce something usable rather than generic.",
        },
        {
          prompt:
            "After AI generates a lesson plan, what is the educator's most important next step?",
          options: [
            "Use it exactly as written to save time",
            "Delete it and write the plan from scratch",
            "Review it critically, adjust for classroom context, and verify alignment with actual curriculum standards",
          ],
          answer: 2,
          explanation:
            "AI output is a strong first draft, not a finished product. Professional judgment about what's right for your specific students and standards is what makes the lesson actually work.",
        },
        {
          prompt:
            "Which of the following is a high-value use of AI during lesson prep?",
          options: [
            "Having AI decide which students are ready to move on to the next unit",
            "Asking AI to list common student misconceptions about a topic before you teach it",
            "Letting AI select which standards are most important for your grade level",
          ],
          answer: 1,
          explanation:
            "Anticipating misconceptions is a research-backed practice that helps you plan for student thinking. AI can generate a solid list quickly — you then validate it against your own experience with students.",
        },
      ],
      explanation:
        "Specificity in your request plus professional review of the output is the formula. AI handles drafting volume; you handle curriculum alignment and classroom fit.",
    },
    {
      slug: "differentiation-and-accessibility",
      title: "Differentiation & Accessibility",
      blurb:
        "Generate materials at multiple reading levels, in multiple languages, and adapted for diverse learners — in minutes instead of hours.",
      xp: 25,
      kind: "quiz",
      content: `# Differentiation & Accessibility

Differentiated instruction is widely recognized as best practice and widely
acknowledged as exhausting to execute. Preparing three versions of a reading
passage, a simplified explanation for ELL students, and an extension challenge
for advanced learners — all for the same lesson — used to take significant extra
time. AI changes this.

## Differentiation by reading level

Ask AI to rewrite a passage at a specific Lexile range, grade level, or in
"plain language." You can go from one article to three differentiated versions
in minutes. Always read the result — AI can oversimplify or introduce errors
when condensing complex text.

## Differentiation by language

AI can produce working translations and simplified explanations in dozens of
languages. This is especially valuable for newcomer students and parent
communications. Note that AI translation quality varies by language — for
high-stakes communications, have a fluent speaker review the output.

## Accessibility supports

- **Vocabulary scaffolds:** "List the 10 most difficult words in this passage
  and define each at a 5th-grade level"
- **Chunking:** "Break this into 5 shorter sections with a comprehension
  question after each"
- **Visual description:** "Write an alt-text description of this graph for
  a student with visual impairment"
- **Simplified instructions:** "Rewrite these lab safety rules for a student
  with reading difficulties"

## What to watch for

AI may not perfectly match accessibility standards (like WCAG for digital
content). Use AI output as a draft — review it against guidelines and have
students with the relevant needs give feedback when possible.`,
      questions: [
        {
          prompt:
            "A teacher has one science reading passage and needs versions for 5th-grade readers, 8th-grade readers, and English language learners. How should they use AI?",
          options: [
            "Ask AI to create all three versions in a single prompt, specifying each target audience",
            "Only use the original passage — adapting materials is the reading specialist's job",
            "Use AI only for the ELL version and write the others manually",
          ],
          answer: 0,
          explanation:
            "This is exactly the kind of high-volume differentiation task where AI delivers immediate, practical value. One well-structured prompt can produce three drafts to review and refine.",
        },
        {
          prompt:
            "A teacher uses AI to translate a parent newsletter into Spanish. What is the most responsible next step?",
          options: [
            "Send it immediately — AI translation is highly accurate",
            "Have a fluent Spanish speaker review it before sending, especially for important communications",
            "Skip it — AI should never be used for translation in a school context",
          ],
          answer: 1,
          explanation:
            "AI translation quality is generally good but varies by language and context. For communications that carry real stakes — medical forms, disciplinary notices — a human review is the responsible standard.",
        },
        {
          prompt:
            "Which prompt will produce the most useful accessibility support for a complex reading passage?",
          options: [
            "'Make this easier.'",
            "'List the 10 most difficult vocabulary words in this passage and define each at a 5th-grade level, then rewrite the passage's first paragraph in plain language.'",
            "'Translate this passage into simpler English.'",
          ],
          answer: 1,
          explanation:
            "Specific, structured requests produce usable outputs. Asking for both the vocabulary scaffold and a rewritten sample gives you something concrete to evaluate and adapt.",
        },
      ],
      explanation:
        "AI turns differentiation from a time-prohibitive ideal into a realistic practice. The key discipline is reviewing AI output against your knowledge of the students it's meant to serve.",
    },
    {
      slug: "feedback-and-assessment",
      title: "Feedback, Grading & Assessment",
      blurb:
        "Use AI to give faster, richer feedback — while understanding where the grading judgment still belongs to you.",
      xp: 25,
      kind: "quiz",
      content: `# Feedback, Grading & Assessment

Feedback is one of the highest-leverage activities in education — and one of the
most time-consuming. AI can dramatically reduce the friction of giving written
feedback while keeping you in control of the evaluative judgment.

## What AI does well here

- **Drafting written feedback** on student work based on a rubric you provide
- **Generating rubrics** from a learning objective or assignment description
- **Creating formative assessment items** — multiple choice, short answer,
  discussion prompts, exit tickets — aligned to specific standards
- **Flagging potential areas of concern** in a writing sample (you verify)

## How to use AI for feedback ethically

The workflow that works:

1. Share the assignment description and your rubric with AI
2. Paste the student's work (removing the student's name — use a placeholder)
3. Ask for draft feedback aligned to each rubric criterion
4. **Read and revise the feedback yourself** before returning it to the student

The AI draft gets you 60–80% of the way there quickly. Your revisions add the
specificity, encouragement, and context that makes feedback actually stick.

## What AI cannot do in assessment

- **Make final grade decisions** — that requires professional judgment,
  knowledge of the student's context, and accountability.
- **Detect AI-generated work reliably** — current AI detection tools have
  meaningful false-positive rates. Do not use them as sole evidence of academic
  dishonesty.
- **Understand growth over time** — AI sees a single snapshot; you know the
  student's trajectory.

## Formative vs summative

AI is especially powerful for **formative** assessment: generating practice
questions, checking for understanding, and giving low-stakes feedback quickly.
For **summative** (final, graded) assessment, AI can help with creation and
feedback drafts, but the evaluative call is yours.`,
      questions: [
        {
          prompt:
            "A teacher wants to use AI to give written feedback on student essays. What is the most responsible workflow?",
          options: [
            "Paste student work, take AI output verbatim, and return it directly to students",
            "Provide the rubric and assignment description, get draft feedback, then read and revise it before returning it to the student",
            "AI should never be involved in student feedback under any circumstances",
          ],
          answer: 1,
          explanation:
            "The AI draft accelerates the time-consuming part; the teacher's review adds specificity, accuracy, and the human judgment that makes feedback meaningful and fair.",
        },
        {
          prompt:
            "A teacher suspects a student submitted AI-generated work. An AI detection tool flags it as 80% AI-written. What should the teacher do?",
          options: [
            "Immediately record a zero — the tool's output is sufficient evidence",
            "Treat the detection result as one signal among many, and follow the school's academic integrity process before taking action",
            "Ignore the detection result entirely — AI detectors are never useful",
          ],
          answer: 1,
          explanation:
            "Current AI detection tools have documented false-positive rates — meaning human-written work is sometimes flagged. Using the result as sole evidence risks penalizing honest students. Due process matters.",
        },
        {
          prompt:
            "For which assessment type is AI most immediately and safely useful?",
          options: [
            "Formative assessment — practice questions, exit tickets, and low-stakes feedback drafts",
            "Final grades and summative evaluations, which AI can calculate objectively",
            "Standardized test scoring, which requires no teacher involvement",
          ],
          answer: 0,
          explanation:
            "Formative assessment is low-stakes and high-volume — exactly where AI's speed shines. Summative and grading decisions carry more consequence and require professional accountability.",
        },
      ],
      explanation:
        "AI is a powerful drafting partner for feedback and assessment creation — not a replacement for the professional judgment that grades, growth knowledge, and student relationships require.",
    },
    {
      slug: "academic-integrity-in-the-ai-era",
      title: "Academic Integrity in the AI Era",
      blurb:
        "The rules have changed. Here's how to rethink what 'original work' means and build policies that actually hold up.",
      xp: 25,
      kind: "quiz",
      content: `# Academic Integrity in the AI Era

The fundamental challenge is real: students have access to tools that can produce
competent first drafts of almost any writing assignment. Policies written before
2022 likely need updating. This lesson is about thinking through that update
clearly.

## The core tension

Most traditional assessments were designed to measure what a student could
produce alone. AI doesn't change the learning objectives — it changes what "alone"
means and what can be produced with minimal effort. The question isn't whether to
panic but **what you actually want to measure**.

## Assignment redesign: the most durable solution

If you don't want AI to answer your essay prompt, the most effective response is
to change the prompt so AI can't answer it (well):

- **Specificity to class content:** "Using the primary source we analyzed on
  Tuesday and our discussion of X, argue…"
- **Personal experience and reflection:** AI can mimic this but it's easier to
  detect and harder to fake convincingly
- **Process documentation:** drafts, annotations, revision memos — AI can fake
  a final product but not a visible thinking process
- **In-class, timed writing** where the context is controlled
- **Oral defense or discussion** of written work

## When to allow AI, how to allow it

Many schools and districts are moving toward **permitted use with citation** —
treating AI like a calculator or grammar checker with disclosure requirements.
This mirrors how AI is used in most workplaces. A clear policy answers:

- Which tasks is AI permitted for?
- What citation or disclosure is required?
- What does "doing the thinking" still require of the student?

## What doesn't work well

- Blanket bans without enforcement mechanisms (unenforceable and may disadvantage
  students who follow the rules over those who don't)
- Sole reliance on AI detection tools (false-positive rates harm honest students)
- Treating every AI interaction as cheating when some uses are genuinely educational`,
      questions: [
        {
          prompt:
            "A teacher's essay prompt can be fully answered by AI in 30 seconds. The most durable long-term response is to…",
          options: [
            "Threaten students with severe punishment for using AI",
            "Redesign the assignment to require specificity to class content, personal experience, or a documented process that AI can't plausibly fake",
            "Require all essays to be handwritten in class with no changes allowed",
          ],
          answer: 1,
          explanation:
            "Punishment-first approaches are enforcement nightmares. Redesigning assignments to measure thinking processes that AI can't replicate is what assessment experts call 'assessment-proofing' — it focuses on what students can actually do.",
        },
        {
          prompt:
            "A school is designing a new AI policy. Which approach is most aligned with how AI is used in professional workplaces?",
          options: [
            "Complete prohibition on any AI use by students",
            "Permitted use with clear citation requirements, transparency about how it was used, and tasks that still require student thinking",
            "Unlimited AI use with no disclosure — students will learn to use it anyway",
          ],
          answer: 1,
          explanation:
            "Professional workplaces are rapidly normalizing AI use with attribution and transparency. Policies that mirror this reality prepare students for life after school while maintaining intellectual honesty standards.",
        },
        {
          prompt:
            "Which practice is most likely to undermine academic integrity policy credibility?",
          options: [
            "Allowing AI use on some assignments but not others with clear rationale",
            "Using AI detection tools as the sole basis for academic dishonesty charges without other evidence",
            "Asking students to document their drafting process",
          ],
          answer: 1,
          explanation:
            "Documented false positives in AI detection tools mean they cannot be the sole evidence in disciplinary proceedings. Using them this way risks punishing honest students and invites justified challenges to the process.",
        },
      ],
      explanation:
        "The strongest academic integrity response to AI is redesigning assessments to measure thinking processes AI can't replicate — not simply trying to catch and punish students after the fact.",
    },
    {
      slug: "bias-privacy-and-responsible-use",
      title: "Bias, Privacy & Responsible Use",
      blurb:
        "AI systems reflect the data they were trained on. Knowing where bias appears — and how to protect student privacy — is a professional responsibility.",
      xp: 20,
      kind: "quiz",
      content: `# Bias, Privacy & Responsible Use

Using AI responsibly in an educational context means understanding two risks that
don't come with a warning label on the tool itself.

## Bias in AI systems

AI models are trained on large amounts of human-generated text and media. That
data reflects the world as it has been — including historical inequities,
underrepresentation of certain groups, and cultural assumptions that skew toward
dominant perspectives.

In practice, this can mean:

- Curriculum materials generated by AI may center certain cultural experiences
  and omit or misrepresent others
- AI feedback on student writing may subtly favor dominant academic language
  conventions over diverse linguistic backgrounds
- Images generated by AI may stereotype or underrepresent certain demographics

**What to do:** Apply your professional lens. Ask: whose perspective is centered
here? What's missing? Whose linguistic or cultural norms are being treated as
default? A critical review of AI output is the same practice you'd apply to a
textbook or a film.

## Student data and privacy

**Never paste personally identifiable student information into a public AI tool.**
This includes names, student ID numbers, grades, disciplinary records, and
anything protected by FERPA (in the US) or equivalent privacy law in your
jurisdiction.

Safe practice:
- Use placeholders: "Student A" or "[NAME]"
- Redact all identifying details before sharing any student work
- Check whether your school has an enterprise agreement with an AI provider
  that covers student data — some do; many don't

## Institution and district policy

Before using AI with student data or for official assessment, check your district
or institution's AI use policy. As of 2026, many have issued guidance; some
require specific approved tools; some explicitly prohibit certain uses.`,
      questions: [
        {
          prompt:
            "A teacher uses AI to generate a reading passage about family structures for a culturally diverse class. What professional review is most important?",
          options: [
            "Check the word count and readability score only",
            "Review whose cultural perspective is centered, what may be missing or stereotyped, and whether the content reflects the actual diversity of the class",
            "No review needed — AI is trained on diverse data and is unbiased",
          ],
          answer: 1,
          explanation:
            "AI reflects its training data, which skews toward dominant cultural perspectives. A critical content review for representation is the same professional judgment educators apply to any curricular material.",
        },
        {
          prompt:
            "A teacher wants AI feedback on a student essay. What must they do before pasting the student's work?",
          options: [
            "Nothing — AI tools are private by design",
            "Remove or replace the student's name and any other identifying information with a placeholder",
            "Share the student's full file including grades and IEP notes for context",
          ],
          answer: 1,
          explanation:
            "Student data is protected by privacy law (FERPA in the US and equivalents globally). Pasting identifiable student information into a public AI tool is a potential legal and ethical violation.",
        },
        {
          prompt:
            "Before using an AI tool for an official school activity involving student work, the most important first step is to…",
          options: [
            "Try the tool personally and decide based on your own judgment",
            "Check your school or district's AI use policy to understand what is permitted and what tools are approved",
            "Ask students whether they want you to use AI",
          ],
          answer: 1,
          explanation:
            "Institutional policy governs what teachers can do with school data and in official capacities. Using an unapproved tool, even with good intentions, can expose the teacher and school to liability.",
        },
      ],
      explanation:
        "Two disciplines matter most: apply your professional content lens to catch bias in AI output, and never put identifiable student data into tools not vetted for student privacy. Both are professional responsibilities, not optional extras.",
    },
    {
      slug: "teaching-ai-literacy-capstone",
      title: "Teaching AI Literacy: Capstone",
      blurb:
        "Capstone: pull it all together and build your own approach — as a practitioner and as a teacher of students who need AI literacy to navigate the world ahead.",
      xp: 25,
      kind: "quiz",
      content: `# Teaching AI Literacy: Capstone

You've covered the landscape: what AI can and can't do, how to use it for lesson
planning and differentiation, how to give richer feedback faster, how to rethink
academic integrity, and how to navigate bias and privacy. This final lesson is
about synthesis — your practice and your students' futures.

## Your practice: the durable principles

Whatever tools exist and however they evolve, a few principles hold:

- **AI handles volume and drafting; you handle judgment and relationships.**
  The tasks that require knowing your students, caring about their growth, and
  making values-laden calls remain irreducibly human.

- **Specificity gets results.** Whether you're generating a lesson plan or
  a rubric, the more context you provide, the more usable the output.

- **Review everything.** AI is wrong sometimes, biased sometimes, and
  inappropriate for your context sometimes. Your professional lens is the
  quality filter.

- **Policy evolves; principles don't.** Keep up with your institution's
  guidance, but your core responsibilities — to student growth, fairness, and
  privacy — predate AI and outlast any particular tool.

## Your students: AI literacy as a learning goal

Students in your classroom today will work, create, and live in a world where
AI is a standard professional tool. Helping them understand it — what it is,
where it helps, where it misleads, and how to use it ethically — is now a
genuine educational goal alongside reading, writing, and numeracy.

This doesn't require a technology class. It can be embedded:

- In English/Language Arts: analyzing AI-generated text for quality and bias
- In Social Studies: examining AI's societal impact and who makes decisions
  about it
- In Science: exploring how AI systems are trained and where they fail
- In any class: modeling transparent, honest AI use and discussing it openly

## The honest ask

AI is neither the end of education nor a magic solution. It's a powerful tool
that shifts what's easy and what's hard. Teachers who engage with it honestly
— using it where it helps, critiquing it where it falls short, and teaching
students to do the same — are the professionals this moment needs.`,
      questions: [
        {
          prompt:
            "A colleague argues that teaching AI literacy should be left to computer science teachers only. What is the strongest counterargument?",
          options: [
            "Only computer science teachers understand AI well enough to teach it",
            "AI's societal impact, ethical use, and critical evaluation of AI output are relevant across every subject — English teachers analyzing AI writing, science teachers examining AI training data failures, and all teachers modeling honest use",
            "AI literacy will become irrelevant in a few years anyway",
          ],
          answer: 1,
          explanation:
            "AI literacy crosses disciplinary lines. Evaluating AI output is a critical thinking skill; examining societal impacts is a social studies concern; understanding training data is a science question. Every teacher contributes.",
        },
        {
          prompt:
            "Which principle best describes the long-term role of teacher judgment in an AI-augmented classroom?",
          options: [
            "Teacher judgment becomes less important as AI improves",
            "AI handles volume and drafting; teacher judgment remains the essential filter for accuracy, fairness, student context, and values",
            "Teachers should aim to use AI for all instructional decisions to stay current",
          ],
          answer: 1,
          explanation:
            "AI's capability growth doesn't eliminate the need for professional judgment — it raises the value of it. Knowing when to trust AI output, when to revise it, and when to override it is the core skill.",
        },
        {
          prompt:
            "A student asks: 'Can I use AI to help write my essay?' The most educationally sound response begins with…",
          options: [
            "'No, AI use is always cheating.'",
            "'Let's talk about what the assignment is actually trying to develop, and where AI can support your thinking versus substitute for it.'",
            "'Yes, use it however you want — you'll need it in the real world.'",
          ],
          answer: 1,
          explanation:
            "Grounding the conversation in learning goals — what skill or thinking the assignment develops — is the framework that produces honest, educationally coherent answers. It respects both the student's question and the purpose of the work.",
        },
      ],
      explanation:
        "The through-line of this course: AI is a powerful, fallible tool that works best with specific requests, critical review, and human judgment in the loop. For educators, that combination — and modeling it for students — is the professional practice this era calls for.",
    },
  ],
};
