import type { Module } from "./types";

// AI for Your Job Search — practical, no-code module for anyone using AI to
// land a job in 2026. Covers resume and cover letter optimization, interview
// prep, research, networking outreach, salary negotiation, and a capstone
// that ties the whole workflow together.
export const aiForJobSearch: Module = {
  slug: "ai-for-job-search",
  title: "AI for Your Job Search",
  description:
    "Use AI to write sharper resumes, prep for interviews, research companies, draft compelling outreach, and negotiate offers — practical techniques for every stage of the modern job hunt, as of 2026.",
  emoji: "💼",
  gradient: "from-blue-500/20 to-sky-500/10",
  tagline:
    "Put AI to work on your job search — smarter resumes, interview prep, company research, and outreach that actually gets replies.",
  keywords: [
    "AI job search",
    "AI resume writing",
    "AI cover letter",
    "AI interview prep",
    "how to use AI for job hunting",
    "AI salary negotiation",
    "job search tips 2026",
    "AI for career",
  ],
  lessons: [
    {
      slug: "ai-job-search-overview",
      title: "The AI-Powered Job Search Playbook",
      blurb: "Map every stage of your search to an AI workflow before diving in.",
      xp: 20,
      kind: "quiz",
      content: `# The AI-Powered Job Search Playbook

Most job seekers use AI for one thing — maybe polishing a resume — and leave
enormous value on the table. Used well, AI can help at **every stage** of the
modern search:

1. **Discovery** — generating target company lists, decoding job descriptions,
   spotting which postings actually match your background.
2. **Materials** — tailoring resumes and cover letters to specific roles, fast.
3. **Research** — learning a company's business model, culture signals, and
   recent news before you apply or interview.
4. **Interview prep** — practicing answers, anticipating questions, getting
   instant feedback on your stories.
5. **Outreach** — drafting personalized LinkedIn notes and cold emails that
   don't feel like templates.
6. **Offer evaluation** — researching market rates, building a counter-offer
   argument, stress-testing your reasoning.

As of 2026, the candidates who stand out are not necessarily the most qualified
on paper — they're the ones who show up better prepared. AI is the fastest way
to close the preparation gap.

**A word of caution upfront:** AI output is a *draft*, never a final product.
Every resume, email, and talking point you generate still needs your eyes, your
judgment, and your authentic voice before it goes anywhere. Treat AI as a tireless
research assistant and first-draft machine, not a ghostwriter you trust blindly.`,
      questions: [
        {
          prompt:
            "At which stages of a job search can AI realistically provide meaningful help?",
          options: [
            "Only when polishing grammar in a finished resume",
            "At every stage — discovery, materials, research, interview prep, outreach, and offer evaluation",
            "Only after you already have an offer to negotiate",
          ],
          answer: 1,
          explanation:
            "AI adds value from the very beginning (finding target companies, understanding job descriptions) all the way through negotiation. Limiting it to grammar polishing is the single biggest missed opportunity.",
        },
        {
          prompt:
            "Why do well-prepared candidates stand out more than ever in 2026?",
          options: [
            "Because hiring has become fully automated and humans no longer interview",
            "Because AI has raised the floor on preparation quality — candidates who use it thoughtfully show up noticeably more ready",
            "Because resumes are no longer used",
          ],
          answer: 1,
          explanation:
            "AI has compressed the effort required to research, tailor, and prepare. Candidates who leverage it arrive to interviews knowing the company's recent news, having rehearsed likely questions, and carrying a well-targeted resume — which stands out against those who don't.",
        },
        {
          prompt:
            "What is the most important thing to do with any content AI generates for your job search?",
          options: [
            "Submit it immediately to maximize speed",
            "Review it carefully and ensure it reflects your authentic voice and accurate experience before using it",
            "Always reject it and start over from scratch",
          ],
          answer: 1,
          explanation:
            "AI drafts can be confident but wrong, generic but smooth, or slightly off on your specific experience. Every piece of content it generates needs a human review and personal edit before it represents you to an employer.",
        },
      ],
      explanation:
        "The biggest unlock is seeing AI as a full-search partner, not a single-task tool. Each lesson in this course maps to one stage of that playbook.",
    },
    {
      slug: "decoding-job-descriptions",
      title: "Decoding Job Descriptions",
      blurb: "Extract what a posting really wants — and whether you're actually a fit.",
      xp: 20,
      kind: "quiz",
      content: `# Decoding Job Descriptions

Job descriptions are written by committees, filled with buzzwords, and often
describe a fantasy candidate. AI can cut through the noise fast.

## What to paste in and ask

Copy the full job description and try these prompts:

- **"Summarize the top 5 must-have skills from this JD."** — Separates the
  real requirements from the wish list.
- **"What does this role actually do day-to-day? Ignore the corporate language."**
  — Translates jargon into plain English.
- **"Given my background [paste resume summary], which requirements am I missing
  and which are strong matches?"** — A quick gap analysis before you apply.
- **"What questions should I ask at the end of the interview given this JD?"**
  — Turns the description into useful conversation prep.

## The "must-have vs. nice-to-have" problem

Research consistently shows that many applicants — especially women and
under-represented candidates — only apply when they meet close to 100% of listed
requirements. AI can help you reframe: ask it "Which of these requirements are
truly blocking (I cannot do this job without them) vs. learnable on the job?"

## Red flags AI can help you spot

Paste a JD and ask: *"What does this description suggest about the work culture
or team situation?"* Watch for: role open for more than 90 days, responsibilities
that span 3+ different jobs, vague scope, and a list of 20+ required skills for
a mid-level role. None of these are automatic disqualifiers, but knowing them
helps you ask the right questions.`,
      questions: [
        {
          prompt:
            "You paste a job description into AI and ask 'summarize the top 5 must-have skills.' What is the main benefit of this approach?",
          options: [
            "It lets you skip reading the full posting",
            "It separates the real requirements from the wish list and tells you exactly what to emphasize in your application",
            "It guarantees you'll be shortlisted",
          ],
          answer: 1,
          explanation:
            "Most JDs inflate requirements. Asking AI to distill the true must-haves lets you focus your resume and cover letter on what will actually move the needle for that specific role.",
        },
        {
          prompt:
            "You meet 70% of a job description's listed requirements. AI tells you 4 of the 'missing' skills are learnable on the job and not blocking. What is the most useful next step?",
          options: [
            "Do not apply because you don't meet 100% of requirements",
            "Apply, and use your cover letter or interview to directly address how you'd close the gaps",
            "Apply but hide that you're missing any skills",
          ],
          answer: 1,
          explanation:
            "Many listed requirements are aspirational. Addressing a gap proactively — 'I haven't used X directly, but I've done Y which is the same underlying skill' — is far more persuasive than avoiding the subject or not applying at all.",
        },
        {
          prompt:
            "Which of these is a useful thing to ask AI when analyzing a job description?",
          options: [
            "'Apply to this job on my behalf.'",
            "'What does this description suggest about the work culture or team situation?'",
            "'Tell me my chances of getting hired.'",
          ],
          answer: 1,
          explanation:
            "AI cannot apply for you or predict hiring odds, but it can read signals in language. Red flags like scope creep, 20+ requirements for a mid-level role, or vague responsibilities are worth surfacing before you invest application time.",
        },
      ],
      explanation:
        "Pasting the JD into AI and asking targeted questions is 10 minutes of work that sharpens every piece of your application and your interview prep.",
    },
    {
      slug: "resume-and-cover-letter",
      title: "Resume & Cover Letter Tailoring",
      blurb: "Stop sending the same resume everywhere. Tailor fast, tailor well.",
      xp: 25,
      kind: "quiz",
      content: `# Resume & Cover Letter Tailoring

Generic resumes get generic results. Every serious application deserves a
tailored version — and AI makes that practical at scale.

## Resume tailoring in practice

The workflow: paste your current resume (or a bullet-point summary) plus the
job description, then ask:

> *"Rewrite these three bullet points to highlight the skills most relevant to
> this role. Keep them truthful; don't add experience I didn't have."*

The key instruction: **truthful, don't add experience I didn't have.** AI will
happily invent plausible-sounding bullets if you don't constrain it. You're
asking for reframing and emphasis, not fabrication.

Other effective prompts:
- **"Which of my resume bullets are weakest for this role? Suggest rewrites."**
- **"What keywords from this JD should appear in my resume but currently don't?"**
- **"Suggest a one-line professional summary tailored to this posting."**

## Cover letters that don't sound like AI wrote them

The single biggest mistake: asking AI to "write my cover letter" with no input.
The output will be generic, formal, and obviously templated.

Better approach:
1. Tell AI 3 specific things you want to convey (a relevant accomplishment, why
   this company, one connection to the role).
2. Ask for a draft.
3. Read it out loud — does it sound like you? Edit until it does.

Alternatively: write a rough, unpolished version of the letter yourself first,
then ask AI to *"polish this while keeping my voice and every specific detail."*
Your rough draft, their polish, your review.

## ATS and keywords

Many companies use Applicant Tracking Systems (ATS) that scan resumes before a
human ever sees them. Ask AI: *"What terms from this JD should I make sure appear
verbatim in my resume for ATS purposes?"* Then work those in naturally, not as a
keyword-stuffed block at the bottom.`,
      questions: [
        {
          prompt:
            "You ask AI to 'rewrite my resume bullets to match this job posting.' What critical instruction should you always include?",
          options: [
            "'Make me sound as impressive as possible, even if you need to add experience I don't have.'",
            "'Keep them truthful — reframe and emphasize, but don't add experience I didn't have.'",
            "'Use as many keywords as possible regardless of accuracy.'",
          ],
          answer: 1,
          explanation:
            "Without the truthfulness constraint, AI will fabricate plausible-sounding bullets. Misrepresenting your experience on a resume is both an ethical problem and a practical one — it can get you fired after hire when you can't do the thing you claimed.",
        },
        {
          prompt:
            "What's the most effective approach for getting a cover letter that sounds authentically like you?",
          options: [
            "Ask AI to write the whole thing from scratch with no input",
            "Write a rough, unpolished draft with your real thoughts and specific details, then ask AI to polish it while preserving your voice",
            "Copy the AI output word-for-word without editing",
          ],
          answer: 1,
          explanation:
            "Your rough draft provides the authentic details and voice; AI's polish improves flow. The reverse — AI draft, then you edit — is slower and produces something that still sounds like AI trying to sound like you.",
        },
        {
          prompt:
            "What does asking AI 'What terms from this JD should appear verbatim in my resume for ATS purposes?' accomplish?",
          options: [
            "It guarantees you will pass the ATS and get an interview",
            "It helps you identify keywords that automated screening systems scan for, so you can include them naturally in your resume",
            "Nothing useful — ATS systems don't use keywords",
          ],
          answer: 1,
          explanation:
            "ATS systems do keyword-match, and missing exact terminology can filter out an otherwise strong resume. AI is good at spotting the gap between your language and the JD's language — then you weave those terms in naturally.",
        },
      ],
      explanation:
        "Tailor every serious application. The workflow is: paste resume + JD, ask for targeted rewrites, enforce truthfulness, and edit until the result sounds like you.",
    },
    {
      slug: "company-research",
      title: "Researching Companies Like a Pro",
      blurb: "Show up to every interview knowing more than the average candidate.",
      xp: 20,
      kind: "quiz",
      content: `# Researching Companies Like a Pro

Interviewers notice the candidates who clearly did their homework. AI won't
replace primary source research, but it dramatically accelerates the synthesis.

## The research stack

Before an interview, you want to understand:

1. **Business model** — How does the company make money? Who are its customers?
2. **Competitive position** — Who are the main competitors? What's the company's
   stated differentiation?
3. **Recent news** — Funding rounds, layoffs, product launches, leadership
   changes, regulatory issues in the past 12 months.
4. **Culture signals** — Glassdoor sentiment, leadership communication style on
   LinkedIn, how the company talks about its people in job postings.
5. **The team** — Who will you be interviewing with? What can LinkedIn tell you
   about their background and how long people stay in this role?

## Where AI fits in

AI (especially models with web access) can synthesize a lot quickly. Ask:

> *"Give me a business overview of [Company], including their main products,
> revenue model, and top competitors, as of [current year]."*

Then verify the key facts directly on the company's website, their investor
relations page, or a recent credible news source. AI's knowledge can lag and
it can hallucinate details about private companies especially.

For culture research, don't rely on AI alone — read actual Glassdoor reviews and
pay attention to patterns, not individual posts.

## Turning research into interview gold

After your research, ask AI:
> *"Based on everything I know about [Company], what are 3 thoughtful questions
> I could ask at the end of the interview that would show genuine business
> understanding?"*

Questions that demonstrate you understand the company's actual situation —
not just "what does a day in the life look like" — land very differently.`,
      questions: [
        {
          prompt:
            "You ask AI for a business overview of a company before your interview. What must you do with the output?",
          options: [
            "Trust it completely — AI is always accurate on company facts",
            "Verify key facts against the company's own website, investor pages, or recent credible news",
            "Ignore it and rely only on the company's LinkedIn page",
          ],
          answer: 1,
          explanation:
            "AI can hallucinate company details — especially for private companies or rapidly-changing situations. Use AI to get oriented quickly, then confirm specifics at authoritative sources before you cite them in an interview.",
        },
        {
          prompt:
            "Which type of end-of-interview question leaves a stronger impression?",
          options: [
            "'What does a typical day look like in this role?'",
            "'I read that you recently expanded into [market] — how is that affecting the team's priorities this year?'",
            "'When will you make your hiring decision?'",
          ],
          answer: 1,
          explanation:
            "Questions that demonstrate you've done real research — specific to the company's actual situation — signal genuine interest and business acumen. Generic questions signal you haven't prepared.",
        },
        {
          prompt: "For researching a company's culture before an interview, which approach is most reliable?",
          options: [
            "Ask AI to describe the culture and take the answer at face value",
            "Read patterns across many real employee reviews on sites like Glassdoor alongside AI-synthesized information",
            "Only ask the recruiter, who will give an unbiased view",
          ],
          answer: 1,
          explanation:
            "AI can synthesize surface-level signals but doesn't have access to the texture of real employee experience. Glassdoor and similar sources give you patterns from actual people — look for themes, not single data points.",
        },
      ],
      explanation:
        "Use AI to accelerate synthesis, verify facts at primary sources, and turn your research into specific, impressive interview questions.",
    },
    {
      slug: "interview-prep",
      title: "Interview Prep with AI",
      blurb: "Practice answers, anticipate curveballs, and sharpen your stories before you go live.",
      xp: 25,
      kind: "quiz",
      content: `# Interview Prep with AI

Interview prep used to mean rehearsing in a mirror or with a friend who didn't
know what questions to ask. AI gives you an infinitely patient practice partner
that can ask role-appropriate questions, evaluate your answers, and push back.

## The STAR method and why AI is great at it

Most behavioral questions ("Tell me about a time when...") are best answered with
the **STAR framework**: Situation, Task, Action, Result.

Paste a work story you plan to use and ask:
> *"Evaluate this answer using the STAR framework. Is the Result specific and
> measurable? Does the Action clearly show my contribution vs. the team's?"*

AI will flag vague results ("we improved performance" → "by how much?"), unclear
ownership ("we did X" → "what specifically did YOU do?"), and situations that
lack stakes.

## Generating the right questions to practice

Tell AI the role, level, and company, and ask:
> *"Generate 10 likely behavioral and situational interview questions for a
> [mid-level / senior] [job title] role at a [industry] company."*

Then practice answering them out loud — say your answer, then paste it into AI
for feedback.

## Technical and case interview prep

For technical roles, AI is good for:
- Explaining concepts in plain language ("explain eventual consistency like I'm
  preparing to discuss it in an interview, not a textbook")
- Generating practice problems at a specific difficulty level
- Explaining where your approach went wrong after you attempt a problem

For case interviews (consulting, operations), ask AI to walk you through a
practice case and give you feedback on your structure.

## What AI can't replace

AI can't assess your eye contact, pace, energy, or how nervous you seem. Record
yourself answering a question on video at least once before the real interview.
AI feedback on the content + your own video review of the delivery is more
valuable than either alone.`,
      questions: [
        {
          prompt:
            "You paste a behavioral interview answer into AI and ask it to evaluate using the STAR framework. What is AI most useful for flagging?",
          options: [
            "Your body language and eye contact",
            "Vague results ('we improved things'), unclear personal contribution, and situations without real stakes",
            "Whether your answer is too honest",
          ],
          answer: 1,
          explanation:
            "AI reads text — it can't assess physical presence. But it excels at spotting weak STAR structures: unquantified results, 'we did X' when interviewers want 'I did X', and stories that lack real stakes or decisions.",
        },
        {
          prompt:
            "What is the most effective way to use AI for mock behavioral interview practice?",
          options: [
            "Ask AI to write your answers for you, then memorize them",
            "Ask AI to generate likely questions, answer them out loud, then paste your answer for AI feedback on content",
            "Read AI-generated answers silently without practicing speaking them",
          ],
          answer: 1,
          explanation:
            "Speaking your answer out loud builds the muscle memory and surfaces stumbles that silent reading hides. AI feedback on the pasted content improves the substance. Memorizing AI-written answers sounds like a script, not a person.",
        },
        {
          prompt:
            "What is something AI-based interview prep genuinely cannot replace?",
          options: [
            "Generating practice questions tailored to a specific role",
            "Evaluating the content and structure of your answers",
            "Assessing your pacing, energy, and how you come across on video",
          ],
          answer: 2,
          explanation:
            "AI works with text. Your delivery — pacing, energy, nervous habits, eye contact — only shows up on video. Combine AI content feedback with self-review of a recorded practice session for the fullest prep.",
        },
      ],
      explanation:
        "AI is a great STAR framework coach and question generator. Pair its content feedback with your own video review for complete interview prep.",
    },
    {
      slug: "networking-and-outreach",
      title: "Networking Outreach That Gets Replies",
      blurb: "Write personalized messages that don't feel like copy-paste — at scale.",
      xp: 20,
      kind: "quiz",
      content: `# Networking Outreach That Gets Replies

Most cold outreach gets ignored because it's obviously templated, asks for too
much too soon, or leads with the sender's needs rather than offering value or
genuine curiosity. AI can help you write messages that feel personal — as long
as you give it personal inputs.

## The personalization paradox

AI can write a better generic template, but a better generic template is still
a template. The fix: **you provide the specific details, AI provides the polish.**

Before asking AI to draft a message, answer these:
- What specifically drew you to this person (a talk they gave, an article, a
  career path you admire)?
- What one thing do you want to learn or ask?
- What's your ask? (Explicit: "15-minute call." Not: "any guidance you might have.")

Then prompt: *"Write a short, warm LinkedIn connection note. I want to mention [X
specific thing], ask about [Y topic], and request [Z explicit ask]. Keep it under
100 words. Don't use the phrase 'I hope this message finds you well.'"*

## What makes outreach work

- **Short.** Under 100 words for a first message; people read on mobile.
- **Specific.** One real reason you're reaching out, not a generic compliment.
- **Low ask.** "15-minute call" beats "coffee" or "any time you can spare."
- **Clear about what you want.** Vague asks force the recipient to do the work
  of figuring out how to help you.

## Follow-ups

If you don't hear back in 7–10 days, a single follow-up is appropriate. Ask AI:
*"Write a brief follow-up to this message [paste original]. One sentence, not
apologetic, adds one new piece of value or context."*

## Referral requests

If you want a warm introduction through a mutual connection, give AI: the mutual
connection's name, the target person, and your relationship with the connector.
Ask for a draft you could send to the connector asking them to make the intro.`,
      questions: [
        {
          prompt:
            "Your LinkedIn outreach message was drafted entirely by AI with no specific personal input. What is the most likely result?",
          options: [
            "High reply rate — AI writes better than most people",
            "Low reply rate — it reads as a template, which recipients recognize and ignore",
            "Guaranteed a reply because it's professionally worded",
          ],
          answer: 1,
          explanation:
            "Recipients — especially those with large networks — have seen every AI-generated template. Without specific, personalized details that only you could know, your message joins a pile. The specific details are what make it worth responding to.",
        },
        {
          prompt:
            "Which cold outreach message is most likely to get a reply?",
          options: [
            "'Hi [Name], I would love to connect and learn from your experience in [Industry]. Any guidance you might have would be so appreciated!'",
            "'Hi [Name], I heard your talk on [specific topic] at [specific event] — your point about [specific insight] changed how I think about X. I'd love a 15-minute call to ask how you navigated the transition from [A] to [B].'",
            "'Hi, I am looking for a job and was wondering if you could help.'",
          ],
          answer: 1,
          explanation:
            "The second message demonstrates you did real homework, asks one specific thing, and makes a concrete, low-burden request. Specificity is respect for the recipient's time.",
        },
        {
          prompt:
            "How long should your first cold outreach message typically be?",
          options: [
            "As long as necessary to explain your full background",
            "Under 100 words — people read on mobile and will not scroll through a wall of text from a stranger",
            "At least 500 words to show you're serious",
          ],
          answer: 1,
          explanation:
            "Short messages get read. Long first messages signal poor social calibration and usually get skimmed or ignored. Save depth for when someone has already replied and wants to know more.",
        },
      ],
      explanation:
        "Personalized inputs + AI polish + short and specific = outreach that stands out. Give AI the specific details; let it handle the prose.",
    },
    {
      slug: "offer-evaluation-and-negotiation",
      title: "Offer Evaluation & Negotiation",
      blurb: "Research, reason, and counter with confidence — the capstone of your AI job search.",
      xp: 25,
      kind: "quiz",
      content: `# Offer Evaluation & Negotiation

Salary negotiation is one of the highest-leverage conversations of your career.
A single 15-minute negotiation can be worth tens of thousands of dollars over
the life of a job. AI can help you research the market, build your case, and
practice the conversation before you have it.

## Researching market rate

Start by asking AI:
> *"What is the typical total compensation range for a [job title] with [X years
> of experience] in [city or remote] in [current year]? Include base, bonus, and
> equity if applicable."*

Use AI output as a starting orientation, then cross-reference with:
- **Levels.fyi** — for tech roles especially, granular comp data by company and level
- **Glassdoor / LinkedIn Salary** — broader ranges by role and location
- **Payscale / Blind** — additional data points

The goal is to triangulate a credible range, not to find a single number. AI
synthesizes quickly; real salary databases give you the specificity to back up
a number in a conversation.

## Building the counter-offer case

Once you have a market range and your competing offers (if any), prompt AI:
> *"I have an offer of [$X] for [role] in [city]. Based on market data showing
> [$Y–$Z] range, I want to counter at [$A]. Help me build the argument for why
> [$A] is justified and draft the actual language I could use in the conversation."*

Strong counter-offers cite: your market research, your specific experience or
skills that command a premium, and competing interest (if you have it). AI can
help you phrase this without sounding aggressive or apologetic — the tone is
confident and collaborative.

## Practicing the conversation

Ask AI to roleplay as the recruiter:
> *"Act as the recruiter. I'm going to counter at [$A]. Push back realistically
> and I'll practice responding."*

Then practice until the conversation feels natural, not rehearsed.

## Total compensation, not just base

Negotiation isn't only salary. Ask AI: *"Given this offer, what non-salary items
are commonly negotiable at a company like this?"* Candidates often leave signing
bonuses, extra PTO, remote flexibility, equity vesting schedules, and professional
development budgets on the table because they only focused on base salary.

## When to get outside help

For senior roles or complex equity packages, AI is not a substitute for a
recruiter or financial advisor with real expertise in your industry. Use AI to
get educated and practice; bring in a human expert for high-stakes specifics.`,
      questions: [
        {
          prompt:
            "You use AI to research market salary for a role, and it gives you a range. What should you do next?",
          options: [
            "Use the AI number as the definitive figure in your negotiation",
            "Cross-reference with real salary databases (Levels.fyi, Glassdoor, LinkedIn Salary) to triangulate a credible, specific range",
            "Ignore it and just accept whatever the employer offers",
          ],
          answer: 1,
          explanation:
            "AI gives a fast orientation but can be off — especially on specific companies, levels, and locations. Backing your ask with data from recognized salary sources makes your counter-offer credible and hard to dismiss.",
        },
        {
          prompt:
            "Besides base salary, what should you think about negotiating?",
          options: [
            "Nothing — base salary is the only thing that matters",
            "Signing bonus, extra PTO, remote flexibility, equity vesting schedules, and professional development budget",
            "Only equity, never anything else",
          ],
          answer: 1,
          explanation:
            "Total compensation includes many levers. Companies often have more flexibility on signing bonuses and PTO than on base salary bands. Candidates who only negotiate salary often leave meaningful value behind.",
        },
        {
          prompt:
            "What is the best way to use AI to prepare for the live negotiation conversation?",
          options: [
            "Have AI write a script to read word-for-word during the call",
            "Ask AI to roleplay as the recruiter pushing back, and practice until the conversation feels natural",
            "Skip practice — just go into the call and improvise",
          ],
          answer: 1,
          explanation:
            "Roleplay practice builds fluency and surfaces objections you haven't thought through. Going in unrehearsed means your first version of the conversation is the live one — a much riskier approach when the stakes are this high.",
        },
      ],
      explanation:
        "Research the market, build a reasoned case, practice the conversation, and look beyond base salary. AI makes all four of these practical — and negotiation is almost always worth the 15-minute conversation.",
    },
  ],
};
