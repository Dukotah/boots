// Evergreen "learn hub" blog posts. Stored as plain TS data and rendered with
// ReactMarkdown (no MDX tooling). `date` is a fixed ISO string per post — never
// computed at runtime — so the sitemap and metadata stay deterministic across
// builds. `body` is real Markdown: H2/H3 headings, lists, and internal links to
// live Cantrip routes that pull readers toward the courses.

// Long-tail SEO posts authored as individual files under ./posts. They use a
// type-only import of BlogPost (erased at build → no runtime import cycle).
import reverseStringPost from "./posts/how-to-reverse-a-string-in-python";
import bigOPost from "./posts/what-is-big-o-notation";
import sqlJoinsPost from "./posts/sql-joins-explained";
import closurePost from "./posts/what-is-a-closure-in-javascript";
import whatIsVibeCodingPost from "./posts/what-is-vibe-coding";
import howToStartVibeCodingPost from "./posts/how-to-start-vibe-coding";
import bestAiCodingTools2026Post from "./posts/best-ai-coding-tools-2026";
import vibeCodingVsTraditionalPost from "./posts/vibe-coding-vs-traditional-coding";
import isVibeCodingWorthItPost from "./posts/is-vibe-coding-worth-it";
import bestFreeWaysToLearnToCode2026Post from "./posts/best-free-ways-to-learn-to-code-2026";
import codecademyAlternativesPost from "./posts/codecademy-alternatives";
import freecodecampAlternativesPost from "./posts/freecodecamp-alternatives";
import howToLearnToUseAi2026Post from "./posts/how-to-learn-to-use-ai-2026";
import chatgptVsClaudeVsGeminiPost from "./posts/chatgpt-vs-claude-vs-gemini";
import howToLearnPython2026Post from "./posts/how-to-learn-python-2026";
import bestAiToolsForStudents2026Post from "./posts/best-ai-tools-for-students-2026";
import howToBuildADeveloperPortfolioPost from "./posts/how-to-build-a-developer-portfolio";
import practicalPromptEngineeringGuidePost from "./posts/practical-prompt-engineering-guide";
import canYouLearnToCodeForFreePost from "./posts/can-you-learn-to-code-for-free";
import isLearningToCodeWorthIt2026Post from "./posts/is-learning-to-code-worth-it-2026";
import howSmallBusinessesUseAiPost from "./posts/how-small-businesses-use-ai";
import howToUseClaude from "./posts/how-to-use-claude";
import aiForBeginnersCompleteGuide from "./posts/ai-for-beginners-complete-guide";
import howToUseGemini from "./posts/how-to-use-gemini";
import bestProgrammingLanguages2026 from "./posts/best-programming-languages-2026";
import aiJobsAndSkills2026 from "./posts/ai-jobs-and-skills-2026";
import howToLearnSql2026 from "./posts/how-to-learn-sql-2026";
import howToLearnJavascript2026 from "./posts/how-to-learn-javascript-2026";
import cantripVsBootdev from "./posts/cantrip-vs-bootdev";
import aiSideHustles2026 from "./posts/ai-side-hustles-2026";
import howToStayRelevantAiEra from "./posts/how-to-stay-relevant-ai-era";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingMinutes: number;
  tags: string[];
  body: string;
};

export const POSTS: BlogPost[] = [
  {
    slug: "how-to-learn-to-code-in-2026",
    title: "How to Learn to Code in 2026 (A Beginner's Roadmap)",
    description:
      "A clear, no-nonsense roadmap for learning to code from scratch in 2026 — what to learn first, how to practice, and how to avoid tutorial limbo.",
    date: "2026-05-28",
    readingMinutes: 8,
    tags: ["beginners", "roadmap", "career"],
    body: `Learning to code can feel overwhelming before you start. There are dozens of languages, thousands of tutorials, and no shortage of strong opinions about the "right" way to begin. The good news: the fundamentals are simpler than the noise suggests, and almost everyone who codes today started exactly where you are.

This roadmap walks you through a sensible path for 2026 — one that prioritizes building real understanding over collecting tutorials.

## Step 1: Pick one language and stick with it

Beginners often jump between languages, convinced the next one will be easier. It rarely is. Programming concepts — variables, loops, functions, conditionals — transfer across almost every language, so the first one you learn is mostly a vehicle for those ideas.

For most people, the two best starting points are **Python** and **JavaScript**:

- **Python** reads almost like English and is forgiving for newcomers. If you're unsure, start here. Our [Python track](/learn/python) is built specifically for first-timers.
- **JavaScript** runs in every browser and is the language of the web. If you already know you want to build websites, it's a great first choice.

Pick one. You can always learn the other later, and it'll be far easier the second time.

## Step 2: Learn by doing, not just watching

The single biggest mistake beginners make is *passive learning* — watching hours of video without writing code. It feels productive, but knowledge that isn't applied fades fast.

Instead, write code from day one. Type out every example yourself, break it on purpose, and fix it. Interactive, auto-graded lessons help here because they force you to produce working code before moving on. That's the whole design philosophy behind [Cantrip's lessons](/learn).

### A simple daily loop

1. Learn one small concept.
2. Write three or four tiny programs that use it.
3. Tweak them until they break, then repair them.

Twenty focused minutes of this beats two passive hours.

## Step 3: Follow a structured path

Random tutorials leave gaps. A structured path makes sure each concept builds on the last. Decide roughly what you want to build and choose a direction:

- Websites and interfaces? Start with the [frontend path](/paths/frontend).
- Servers, APIs, and data? Try the [backend path](/paths/backend).

If you're not sure yet, browse all the [learning paths](/paths) and pick whichever sounds most fun. Motivation matters more than picking "optimally" at this stage.

## Step 4: Build small projects early

Tutorials teach syntax; projects teach problem-solving. You don't need anything ambitious. A number-guessing game, a to-do list, or a tip calculator all force you to combine concepts on your own.

When you get stuck — and you will — that struggle *is* the learning. Use a [playground](/playground) to experiment freely without setup, and keep a running list of small ideas to attempt.

## Step 5: Get comfortable being stuck

Every programmer, at every level, spends a large chunk of their time confused. That's normal and permanent. What separates people who succeed isn't talent; it's a willingness to sit with a problem, read error messages carefully, and try again.

A few habits that help:

- Read the error message slowly. It usually tells you exactly what's wrong.
- Change one thing at a time so you know what fixed it.
- Keep a [cheat sheet](/cheatsheet) open for syntax you haven't memorized yet.

## A realistic timeline

You can write useful programs within a few weeks of consistent practice. Becoming comfortable enough to build projects independently typically takes a few months. Job-ready skill is usually a matter of six months to a year of steady effort — though that varies a lot by goal and background.

The exact number matters less than the direction. Show up regularly, write real code, and build things. That's the whole roadmap. Ready to begin? [Start your first lesson](/learn) — it's free.`,
  },
  {
    slug: "how-long-does-it-take-to-learn-programming",
    title: "How Long Does It Really Take to Learn Programming?",
    description:
      "An honest look at how long it takes to learn to code — from your first program to job-ready — and the factors that speed it up or slow it down.",
    date: "2026-05-22",
    readingMinutes: 7,
    tags: ["beginners", "career", "motivation"],
    body: `"How long until I can actually code?" is one of the first questions every beginner asks. The honest answer is: it depends — but not as wildly as you might fear. Let's break it down into realistic stages instead of a single misleading number.

## The short version

- **Write your first working program:** your first day.
- **Feel comfortable with the basics:** a few weeks of regular practice.
- **Build small projects on your own:** two to four months.
- **Reach a job-ready level:** roughly six months to a year of steady effort.

These are ranges, not promises. Your pace depends on how often you practice, how you practice, and what "done" means to you.

## What "learning to code" actually means

Part of why the question is hard is that "learning to code" isn't one finish line. There are several:

### Stage 1: Syntax and fundamentals

Variables, loops, conditionals, functions. This is the most concrete stage and the fastest to see progress. Most people grasp the core ideas within a few weeks of consistent practice. A structured path like our [Python course](/learn/python) keeps these concepts in a sensible order.

### Stage 2: Problem-solving

This is where many learners stall. Knowing what a loop *is* differs from knowing *when* to reach for one. Problem-solving only develops by building things and getting stuck. Expect this stage to take a couple of months — and to never fully "end."

### Stage 3: Building real projects

Combining everything to make something that works end to end. This is where the [playground](/playground) and small personal projects earn their keep. Plan on several months before independent projects feel natural.

## What speeds it up

A few factors make a real difference:

- **Consistency over intensity.** Thirty minutes a day beats a six-hour weekend cram. Code is a skill, and skills compound through repetition. Here's [how to build a daily habit](/blog/build-a-daily-coding-habit).
- **Active practice.** Writing code, not just watching it, is the single biggest accelerator.
- **A clear goal.** "I want to build a website" focuses your learning far more than "I want to learn to code." Browse the [learning paths](/paths) to anchor on one.

## What slows it down

- **Tutorial hopping** — endlessly starting new courses without finishing any.
- **Passive watching** without writing code yourself.
- **Comparing your week one to someone else's year three.**

## The "10,000 hours" myth

You may have heard it takes 10,000 hours to master a skill. That figure is about world-class *mastery*, not competence. You don't need to be world-class to build useful software or get a first job. Plenty of people become productive in months, not years.

## A more useful way to measure

Instead of counting calendar time, count what you can do. Can you write a function from scratch without copying it? Can you read an error message and fix it yourself? Can you build a small project end to end? Those milestones tell you far more than any timeline.

## The bottom line

You'll be writing real code on day one and building small things within months. The timeline is far less important than the direction — and the only way to move along it is to keep going. [Start a free lesson](/learn) and begin stacking up days.`,
  },
  {
    slug: "best-way-to-learn-python-from-scratch",
    title: "The Best Way to Learn Python from Scratch",
    description:
      "A practical, beginner-friendly guide to learning Python the right way — what to focus on, what to skip at first, and how to build real momentum.",
    date: "2026-05-18",
    readingMinutes: 8,
    tags: ["python", "beginners", "roadmap"],
    body: `Python is one of the best languages to learn first. Its syntax is clean and readable, it's used everywhere from web apps to data science, and the community has produced endless beginner resources. But that abundance can be paralyzing. Here's a focused way to learn Python from scratch without getting lost.

## Why Python is a great first language

Python reads almost like plain English. Compare printing text in Python to many other languages and you'll see far less ceremony — no semicolons to forget, no curly braces to balance. That low friction means you spend your early energy on *ideas* rather than fighting syntax.

It's also genuinely useful. Python powers data analysis, automation, web backends, and AI tooling, so the skills you build transfer to real work.

## Start with the fundamentals

Resist the urge to jump straight to a flashy project. Build a solid base first:

1. **Variables and data types** — strings, numbers, booleans.
2. **Lists and dictionaries** — Python's everyday data structures.
3. **Conditionals** — \`if\`, \`elif\`, \`else\`.
4. **Loops** — \`for\` and \`while\`.
5. **Functions** — packaging logic you can reuse.

These five concepts cover most of what you'll do day to day. Our [Python track](/learn/python) walks through them in order with auto-graded exercises, so you write real code at every step instead of just reading about it.

## Learn actively, not passively

The fastest way to *not* learn Python is to watch videos all day. The fastest way to learn it is to type code, run it, and see what happens.

### A simple practice routine

- Read one short concept.
- Open a [playground](/playground) and rewrite the example from memory.
- Change something and predict the result before you run it.
- Run it. If you were wrong, figure out why.

That prediction step is where real understanding forms. It turns passive reading into active problem-solving.

## What to skip at the start

Beginners often get derailed by advanced topics that don't matter yet. For your first few weeks, you can safely ignore:

- Virtual environments and package managers
- Object-oriented programming
- Decorators, generators, and metaclasses

None of these help you learn the fundamentals, and all of them are easier once the basics are second nature. Come back to them later.

## Build tiny projects early

Once you know variables, loops, and functions, start building. Small is good:

- A number-guessing game
- A simple tip or unit-conversion calculator
- A program that counts words in a sentence

Each one forces you to combine concepts and solve problems on your own — which is the actual skill you're after. Keep a [Python cheat sheet](/cheatsheet) open while you work so you're not memorizing syntax under pressure.

## Get comfortable with errors

Python's error messages are unusually friendly. When something breaks, read the message from the bottom up — the last line usually names the problem. Errors aren't failures; they're feedback. Every Python developer reads them constantly.

## Where Python can take you

Once the fundamentals click, Python branches out fast. You might move toward:

- **Backend development** — building servers and APIs. See the [backend path](/paths/backend).
- **Data and automation** — scripting repetitive tasks away.
- **General problem-solving** — a foundation for nearly anything else.

## The bottom line

The best way to learn Python from scratch isn't a secret resource — it's a simple loop: learn one concept, write code that uses it, break it, fix it, repeat. Do that consistently and you'll be surprised how quickly it adds up. [Start the free Python track](/learn/python) and write your first program today.`,
  },
  {
    slug: "javascript-vs-python-which-to-learn-first",
    title: "JavaScript vs Python: Which Should You Learn First?",
    description:
      "JavaScript or Python for your first language? A straightforward comparison to help you choose based on your goals — without the hype.",
    date: "2026-05-15",
    readingMinutes: 7,
    tags: ["javascript", "python", "beginners"],
    body: `It's the classic beginner crossroads: JavaScript or Python? Both are excellent first languages, both are in huge demand, and you genuinely can't make a wrong choice. But they suit slightly different goals, so let's compare them honestly so you can pick with confidence and move on.

## The short answer

- **Want to build websites and see visual results fast?** Learn **JavaScript**.
- **Want a gentle on-ramp, or are eyeing data, automation, or AI?** Learn **Python**.
- **Genuinely unsure?** Python is the slightly easier starting point — but you'll likely learn both eventually.

The most important thing is to pick one and commit. Switching languages every few weeks is what actually slows people down.

## How they compare

### Readability

Python wins here. Its syntax is minimal and reads almost like English — no semicolons, no curly braces, just clean indentation. JavaScript isn't hard, but it has more punctuation and a few quirks that can trip up beginners early on.

### Where they run

JavaScript runs in every web browser, which makes it uniquely powerful for the web. If you want to build something you can immediately see and click in a browser, JavaScript gets you there with the least setup.

Python runs on servers and your own machine. It's the go-to language for data analysis, automation, scientific computing, and a lot of AI tooling.

### What you can build

| Goal | Better first pick |
| --- | --- |
| Interactive websites | JavaScript |
| Web servers and APIs | Either |
| Data analysis | Python |
| Automating boring tasks | Python |
| Browser games and UI | JavaScript |

## Let your goal decide

The cleanest way to choose is to ask what you actually want to build.

If your answer involves **websites, interfaces, or anything visual in a browser**, JavaScript is the natural fit. Our [frontend path](/paths/frontend) is built around it.

If your answer involves **servers, data, automation, or you just want the friendliest possible start**, go with Python. The [backend path](/paths/backend) leans on it, and our [Python course](/learn/python) is designed for total beginners.

Still torn? Browse all the [learning paths](/paths) and pick whichever project list sounds most fun. Enjoyment keeps you practicing, and practice is what actually matters.

## What they share

Here's the reassuring part: the *concepts* are nearly identical. Variables, loops, conditionals, functions, and arrays/lists all exist in both languages. Learn them in one and you've learned them in both. That's why your second language is always dramatically faster to pick up.

So whichever you choose, you're not locking yourself in — you're building a foundation that transfers.

## Don't overthink it

People spend weeks agonizing over this decision when they could have spent those weeks actually coding. Both languages are beginner-friendly, widely used, and richly supported. The "best" choice is the one that gets you writing code today.

Flip a coin if you have to. Then [start a free lesson](/learn) and begin. You can always learn the other one next — and you probably will.`,
  },
  {
    slug: "should-you-still-learn-to-code-in-the-ai-era",
    title: "Should You Still Learn to Code in the AI Era?",
    description:
      "With AI writing code, is learning to program still worth it? A grounded take on why coding skills matter more than ever — and how to learn with AI, not against it.",
    date: "2026-05-10",
    readingMinutes: 7,
    tags: ["ai", "career", "motivation"],
    body: `It's a fair question. AI tools can now generate working code from a plain-English description, so it's natural to wonder whether learning to program is still worth your time. The short answer: yes — and arguably more than before. But *how* you learn matters. Let's separate the hype from reality.

## AI generates code. It doesn't replace understanding.

AI coding assistants are genuinely impressive. They can scaffold a function, suggest fixes, and explain unfamiliar syntax. But they also confidently produce code that's subtly wrong, insecure, or doesn't fit the problem. Someone has to read that output, judge whether it's correct, and fix it when it isn't.

That someone needs to understand code. If you can't read what the AI wrote, you can't tell good suggestions from bad ones — and you certainly can't debug them when they break in production.

## What actually changes

AI shifts *what* coding work looks like, more than whether it exists:

- **Writing boilerplate** gets faster. That's a win.
- **Reading and reviewing code** becomes more important, not less.
- **Knowing what to build and why** — the judgment part — becomes the real differentiator.

In other words, the mechanical part of coding gets cheaper, and the thinking part gets more valuable. The thinking part is exactly what learning to code builds.

## Coding teaches more than syntax

Even if you never write production software, learning to code rewires how you approach problems. It teaches you to:

- Break a big, fuzzy problem into small, precise steps.
- Spot edge cases before they bite you.
- Reason about cause and effect with discipline.

These skills transfer to almost any field. They're also exactly the skills you need to *direct* AI well — to write clear instructions and catch when the output is off.

## Learn with AI, not instead of it

The smartest approach isn't to avoid AI or to lean on it blindly. It's to learn the fundamentals yourself, then use AI as a tool you can supervise.

A healthy way to study:

1. **Write the code yourself first.** Struggle a little — that's where learning happens. Interactive lessons like those on [Cantrip](/learn) make you produce working code before moving on.
2. **Use AI to explain, not to replace.** Ask it *why* something works, then verify the answer.
3. **Always read what AI gives you.** If you don't understand a line, that's a gap to close, not skip.

If you let AI do all the thinking early on, you'll never build the judgment that makes you valuable. Use it as a tutor, not a crutch.

## A note on safety and skepticism

The AI era also rewards a healthy dose of skepticism — about generated code *and* about the flood of AI-driven scams and misinformation that comes with it. Learning to think critically about what's in front of you is a skill worth building deliberately. Our [digital safety lessons](/learn/digital-safety) are a good place to sharpen that instinct.

## The bottom line

AI hasn't made coding obsolete; it's raised the value of people who understand code well enough to direct it. The fundamentals — how programs work, how to break down problems, how to spot a mistake — are more useful than ever.

So yes, learn to code. Just learn it actively, and treat AI as a powerful assistant you keep on a short leash. [Start a free lesson](/learn) and build the understanding that makes the tools work for you.`,
  },
  {
    slug: "how-to-prepare-for-a-coding-interview",
    title: "How to Prepare for a Coding Interview",
    description:
      "A practical, calm guide to preparing for a coding interview — what to study, how to practice, and how to think out loud under pressure.",
    date: "2026-05-05",
    readingMinutes: 8,
    tags: ["interview", "career", "practice"],
    body: `Coding interviews intimidate almost everyone, but they're far more learnable than they look. They reward preparation and clear thinking more than raw talent. Here's a grounded plan for getting ready — without burning out or memorizing your way to nowhere.

## Understand what's actually being tested

A coding interview isn't really checking whether you've memorized algorithms. Interviewers want to see:

- **How you break a problem down** before writing code.
- **Whether you can communicate** your thinking clearly.
- **How you handle being stuck** — calmly, or in a panic.
- **Whether your code is correct** and handles edge cases.

Once you see it as a thinking-and-communication test, not a memory test, the whole thing gets less scary.

## Step 1: Solidify the fundamentals

Before any fancy practice, make sure the basics are second nature: variables, loops, conditionals, functions, arrays, and dictionaries/objects. If you have to think hard about syntax, you'll have no mental space left for the actual problem.

If any of that feels shaky, shore it up first. A focused run through the [core lessons](/learn) or a quick [cheat sheet](/cheatsheet) review pays off here.

## Step 2: Learn the common patterns

Most interview problems are variations on a handful of patterns:

- **Two pointers** — walking through a list from both ends.
- **Hash maps** — trading memory for fast lookups.
- **Sliding window** — efficient work over subarrays.
- **Recursion and trees** — problems that break into smaller copies of themselves.
- **Basic sorting and searching.**

You don't need to memorize solutions. You need to recognize which pattern a problem fits. That recognition comes from practice, not cramming.

## Step 3: Practice out loud

This is the step people skip, and it's the most important. In a real interview you have to *talk* while you think. So practice that way:

1. Read the problem aloud and restate it in your own words.
2. Talk through your approach **before** writing any code.
3. Narrate as you code — what you're doing and why.
4. Walk through your solution with a small example at the end.

Silent practice trains the wrong muscle. Use a [playground](/playground) and literally speak as you solve, even alone. It feels awkward at first and pays off enormously.

## Step 4: Handle getting stuck gracefully

You *will* get stuck in interviews. That's expected. What matters is how you respond:

- Say what you're thinking — silence reads worse than struggle.
- Try a simpler version of the problem first.
- Use a concrete example to find the pattern.
- Ask clarifying questions; it shows maturity, not weakness.

Interviewers often care more about how you navigate a hard moment than whether you nail the optimal solution.

## Step 5: Don't neglect the basics of communication

Two candidates can write identical code and get different outcomes based on how they explained themselves. Practice describing your reasoning simply. Avoid jargon for its own sake. Check in with your interviewer. These soft skills are very learnable and often the deciding factor.

## A realistic study plan

- **Weeks 1–2:** Lock down fundamentals until syntax is automatic.
- **Weeks 3–4:** Learn the common patterns, one at a time.
- **Weeks 5+:** Practice full problems out loud, simulating real conditions.

Consistency beats marathon sessions. A few problems a day, done thoughtfully and out loud, will get you further than a weekend cram.

## The bottom line

Coding interviews reward clear thinking, solid fundamentals, and calm communication — all of which you can build with steady practice. Start by making the basics automatic, then layer on patterns and out-loud reps. [Sharpen your fundamentals here](/learn) and practice freely in the [playground](/playground).`,
  },
  {
    slug: "learn-sql-beginner-roadmap",
    title: "Learn SQL: A Practical Beginner's Roadmap",
    description:
      "A step-by-step roadmap for learning SQL from scratch — the handful of commands that matter, in the order that makes them click.",
    date: "2026-04-30",
    readingMinutes: 7,
    tags: ["sql", "beginners", "data"],
    body: `SQL is one of the highest-leverage skills you can learn. It's the language of data, it's used in nearly every company that stores information, and — refreshingly — it's small enough to become genuinely useful within days. Here's a practical roadmap for learning it from scratch.

## Why learn SQL

SQL (Structured Query Language) is how you ask questions of a database. "Which customers signed up last month?" "What were our top ten products?" "How many users are active?" — these are all SQL queries.

What makes SQL special for beginners:

- It's **declarative** — you describe *what* you want, not step-by-step *how* to get it.
- It's **compact** — a few commands cover most real work.
- It's **everywhere** — analysts, engineers, marketers, and product folks all use it.

You can start answering real questions with data faster than with almost any other technical skill.

## The roadmap

### Step 1: SELECT and FROM

Every query starts here. \`SELECT\` chooses columns; \`FROM\` names the table. This is the foundation everything else builds on, so get comfortable pulling raw data before anything fancy.

### Step 2: WHERE — filtering rows

\`WHERE\` lets you narrow results to the rows that matter: customers in a certain city, orders above a certain amount, signups after a certain date. Filtering is where SQL starts feeling powerful.

### Step 3: ORDER BY and LIMIT

Sort your results and cap how many you get back. Together these answer "top N" questions — top products, most recent orders, biggest accounts.

### Step 4: Aggregations — COUNT, SUM, AVG

This is where SQL really earns its keep. Aggregate functions collapse many rows into a single answer: how many users, total revenue, average order size. Pair them with \`GROUP BY\` to get those answers *per category* — revenue per month, signups per country.

### Step 5: JOINs

Real data lives across multiple tables — customers in one, orders in another. \`JOIN\` stitches them together so you can ask questions that span both. Joins feel tricky at first, but they unlock the majority of real analysis, so it's worth slowing down here.

## How to actually learn it

Reading about SQL is nearly useless; writing queries is everything. The skill is entirely in the practice.

The best loop:

1. Learn one command.
2. Write several queries that use it against real-ish data.
3. Change the question slightly and adjust your query.

Our [SQL track](/learn/sql) is built around exactly this — auto-graded queries against sample data, so you get instant feedback on whether your query is right. Keep a [SQL cheat sheet](/cheatsheet) open while you work so you're not stuck memorizing syntax.

## A few beginner tips

- **Read queries inside-out.** Start with the \`FROM\`, then the \`WHERE\`, then the \`SELECT\`.
- **Build queries incrementally.** Get \`SELECT *\` working first, then add filters and sorting one piece at a time.
- **Expect joins to take a few tries.** They click eventually for everyone.

## Where SQL fits in

SQL pairs beautifully with other skills. If you're heading toward [backend development](/paths/backend), you'll use it constantly to store and retrieve data. If you're into analysis, it's often the *only* tool you need to start delivering insights.

## The bottom line

SQL is small, powerful, and unusually beginner-friendly. Learn the handful of commands above in order, practice by writing real queries, and you'll be answering genuine data questions within a week. [Start the free SQL track](/learn/sql) and run your first query today.`,
  },
  {
    slug: "what-is-an-api-plain-english",
    title: "What Is an API? A Plain-English Explanation",
    description:
      "APIs explained simply, no jargon — what they are, how they work, and why nearly every app you use depends on them.",
    date: "2026-04-24",
    readingMinutes: 6,
    tags: ["beginners", "concepts", "backend"],
    body: `"API" is one of those terms that gets thrown around constantly in tech without anyone stopping to explain it. If you've nodded along while quietly wondering what it actually means — this is for you. By the end you'll understand APIs well enough to explain them to someone else.

## The restaurant analogy

Imagine you're at a restaurant. You don't walk into the kitchen and cook your own meal. Instead, you give your order to a waiter, who takes it to the kitchen and brings back your food.

An **API** is that waiter.

You (an app) make a request. The API carries it to some system (the kitchen) and brings back a response. You never need to know *how* the kitchen works — you just need to know how to place an order.

API stands for **Application Programming Interface**. That's a mouthful, but the idea is simple: it's a defined way for two pieces of software to talk to each other.

## A concrete example

When a weather app shows you tomorrow's forecast, it didn't measure the weather itself. It sent a request to a weather service's API — something like "give me the forecast for this city" — and the API sent back the data, which the app displayed.

The same thing happens constantly:

- A travel site checks flight prices through airline APIs.
- A "Log in with Google" button uses Google's API.
- A map inside another app is usually a maps API.

Almost every app you use is quietly making API requests behind the scenes.

## How an API request works

The basic flow has four parts:

1. **A request** — an app asks for something specific.
2. **The API** — receives the request and passes it along.
3. **The system** — does the work (looks up data, saves something, runs a calculation).
4. **A response** — the answer travels back to the app.

Most web APIs follow predictable patterns. A request typically includes:

- **An address** (the URL of what you want).
- **A method** — \`GET\` to fetch data, \`POST\` to send data, and a few others.
- **Sometimes data** — details the system needs to fulfill the request.

And the response usually comes back as **JSON**, a simple text format that's easy for programs to read.

## Why APIs matter

APIs are what let software build on other software. Without them, every app would have to do everything itself. With them, you can plug in maps, payments, weather, messaging, and more — without rebuilding any of it.

For developers, this is enormously freeing. You focus on your app's unique value and let APIs handle the rest. It's also why "knowing how to work with APIs" is such a common, practical skill.

## Where this fits in learning to code

You don't need to understand APIs deeply on day one, but they show up early — especially in web and [backend development](/paths/backend), where you'll both *use* other APIs and *build* your own. When you're ready, building a small app that calls a public API is one of the most satisfying beginner projects there is.

## The bottom line

An API is just a structured way for software to ask other software for something — the waiter between your app and a kitchen you never have to see. Once that clicks, a lot of how modern apps work suddenly makes sense.

Want to start building toward this? [Explore the backend path](/paths/backend) or [start a free lesson](/learn) and lay the groundwork.`,
  },
  {
    slug: "5-beginner-coding-projects",
    title: "5 Beginner Coding Projects to Build Your Skills",
    description:
      "Five beginner-friendly coding projects that teach real skills — what each one builds, why it matters, and how to start.",
    date: "2026-04-18",
    readingMinutes: 7,
    tags: ["projects", "beginners", "practice"],
    body: `There's a point in every beginner's journey where tutorials stop being enough. You know the syntax, but you're not sure how to *use* it. The fix is projects — small ones you build yourself. Here are five classic beginner projects, why each is worth doing, and what it teaches.

## Why projects matter

Tutorials hand you the steps. Projects make you find the steps yourself, which is the actual skill of programming. When you build something from scratch, you have to combine concepts, make decisions, and debug your own mistakes. That's where real learning happens.

Don't worry about projects being impressive. Worry about finishing them. A small, complete project teaches more than a big, abandoned one.

## 1. A number-guessing game

**What it is:** The program picks a random number; the player guesses; the program says "higher" or "lower" until they get it.

**What it teaches:**

- Generating random numbers
- Loops (keep asking until correct)
- Conditionals (compare the guess)
- Reading user input

It's small enough to finish in a sitting and uses nearly every fundamental at once. A perfect first project. Build it in a [playground](/playground) with no setup.

## 2. A to-do list

**What it is:** Add tasks, view them, mark them done, remove them.

**What it teaches:**

- Working with lists/arrays
- Adding and removing items
- Looping to display data
- Organizing code into functions

The to-do list is a rite of passage for a reason: it captures the core of so many real apps — store some items, show them, change them.

## 3. A simple calculator

**What it is:** Take two numbers and an operation, return the result.

**What it teaches:**

- Handling user input and converting types
- Conditionals or a lookup for each operation
- Edge cases (what about dividing by zero?)

Calculators look trivial until you handle the messy inputs. That edge-case wrangling is exactly the muscle you want to build.

## 4. A word/character counter

**What it is:** Take a chunk of text and report how many words, characters, or sentences it has.

**What it teaches:**

- String manipulation — splitting, counting, scanning
- Loops over text
- Thinking about edge cases (extra spaces, punctuation)

Text processing is everywhere, and this project makes strings feel a lot less mysterious. If you're learning Python, it pairs perfectly with the [Python track](/learn/python).

## 5. A quiz game

**What it is:** Ask a series of questions, check answers, keep score, and show a final result.

**What it teaches:**

- Storing structured data (questions and answers)
- Loops to run through questions
- Keeping and updating a score
- Tying multiple concepts into one program

The quiz game is a great "graduation" project — it's the most involved of the five and combines everything else you've practiced.

## How to approach any project

A few habits that make projects far less frustrating:

1. **Start with the smallest version that works.** Get *anything* running, then add features.
2. **Build one piece at a time.** Don't write the whole thing before testing.
3. **Expect to get stuck.** That's the project working as intended.
4. **Keep a [cheat sheet](/cheatsheet) handy** so syntax doesn't slow you down.

## The bottom line

Tutorials teach you the rules; projects teach you the game. Pick the first project on this list, build the tiniest working version, and grow it from there. Then move to the next. [Open a playground](/playground) and start building, or [brush up on the fundamentals](/learn) first if you need them.`,
  },
  {
    slug: "build-a-daily-coding-habit",
    title: "How to Build a Daily Coding Habit (and Actually Stick to It)",
    description:
      "Motivation fades; habits don't. A practical guide to building a daily coding habit that survives busy weeks and bad days.",
    date: "2026-04-12",
    readingMinutes: 6,
    tags: ["habit", "motivation", "beginners"],
    body: `Most people don't fail to learn to code because it's too hard. They fail because they stop. Motivation is unreliable — it shows up some days and vanishes on others. The people who succeed don't rely on motivation; they build a habit. Here's how to make coding a daily habit that actually sticks.

## Why habits beat motivation

Motivation is an emotion, and emotions come and go. Some mornings you'll feel inspired; many you won't. If your practice depends on feeling like it, you'll skip the hard days — and the hard days are exactly when consistency matters most.

A habit removes the decision. You don't ask "do I feel like coding today?" You just code, the way you brush your teeth without debating it.

## Start absurdly small

The biggest mistake beginners make is committing to an hour a day. It sounds ambitious and collapses within a week. Instead, start so small it feels almost silly:

- **Code for 15 minutes a day.** That's it.

Fifteen minutes is short enough that you can do it on a busy day, tired, or unmotivated. And here's the trick: most days you'll do more, because starting is the hard part. But on bad days, you only owe yourself fifteen minutes — and you'll keep your streak alive.

## Attach it to something you already do

New habits stick best when they're anchored to existing ones. This is called *habit stacking*:

- "After my morning coffee, I code for 15 minutes."
- "After dinner, I do one lesson."

By tying coding to a routine that already exists, you borrow its stability instead of relying on willpower.

## Make starting frictionless

Every bit of friction is an excuse waiting to happen. Remove it in advance:

- Bookmark exactly where you left off so there's no "where do I start?" moment.
- Use tools with **zero setup** — interactive lessons and a [playground](/playground) you can open and code in instantly, with nothing to install.
- Decide *what* you'll work on the night before.

The easier it is to begin, the more likely you'll begin.

## Track your streak

There's real psychological power in not breaking a chain. When you can see a string of days you've shown up, you don't want to ruin it. Many learners find that a visible streak is more motivating than any goal.

Cantrip is built around this idea — [the lessons](/learn) track your progress and streak so each day visibly builds on the last. Watching that number climb turns consistency into a small daily reward.

## Plan for the days you'll miss

You *will* miss a day eventually. The danger isn't the missed day — it's the spiral of "I broke my streak, so why bother." Decide in advance how you'll respond:

> **The rule: never miss twice.**

One missed day is an accident. Two is the start of quitting. If you skip a day, just make sure you show up the next one. That single rule protects almost everyone from falling off entirely.

## Focus on showing up, not on progress

Some days your fifteen minutes will feel productive; others will feel like spinning your wheels. That's fine. Early on, the *act of showing up* matters more than what you accomplish on any given day. The progress compounds quietly in the background.

## The bottom line

You don't need more motivation. You need a small, frictionless habit, anchored to your routine, protected by the "never miss twice" rule. Do fifteen honest minutes a day and the months will take care of themselves. [Start today's lesson](/learn) and begin your streak.`,
  },
  {
    slug: "how-to-spot-a-scam",
    title: "How to Spot a Scam: A Quick Guide for Everyone",
    description:
      "A simple, practical guide to recognizing scams — the warning signs, the common tricks, and the habits that keep you and your money safe.",
    date: "2026-04-06",
    readingMinutes: 7,
    tags: ["digital-safety", "security", "everyone"],
    body: `Scams aren't just an "old people" problem or a "tech illiterate" problem. Modern scams are sophisticated, well-funded, and designed by people who study human psychology for a living. Anyone can be caught off guard. The good news: almost every scam shares a handful of warning signs. Learn them and you'll spot the vast majority before they cost you anything.

## The two feelings every scam tries to create

Nearly every scam works by triggering one of two emotions:

1. **Urgency** — "Act now or lose access / face a fine / miss out."
2. **Fear or excitement** — a threat that scares you, or a prize that thrills you.

Both have the same goal: to make you act *before you think*. The moment you feel a sudden jolt of panic or excitement pushing you to do something immediately, slow down. That feeling is the scam working.

## Common warning signs

You don't need to memorize every scam. You need to recognize the patterns. Be suspicious whenever you see:

- **Pressure to act immediately.** Legitimate organizations give you time. Scammers don't want you to think.
- **Requests for unusual payment.** Gift cards, wire transfers, and cryptocurrency are favorites because they're hard to reverse. No real company asks for gift cards.
- **Requests for passwords or codes.** No legitimate company will ask for your password or a one-time verification code. Ever.
- **Too good to be true.** Surprise lottery wins, unexpected inheritances, and guaranteed returns are classic bait.
- **Slightly-off details.** Misspelled addresses, odd grammar, or an email that's *almost* the real company's.

## The most common scam types

### Phishing

A message — email, text, or call — pretends to be from a bank, retailer, or government agency. It contains a link to a fake login page that steals your details. **The tell:** it pushes you to click a link and "verify" something urgently.

### Impersonation

Someone pretends to be a person or institution you trust: your bank, a delivery service, tech support, even a family member in trouble. **The tell:** they reach out to *you* unexpectedly and ask for money or information.

### Prize and investment scams

"You've won!" or "Guaranteed 40% returns!" The catch is always a fee, your bank details, or both. **The tell:** unexpected winnings or returns that sound too good to be true — because they are.

## The habits that protect you

A few simple rules stop most scams cold:

1. **Slow down.** Urgency is the scammer's main weapon. Refusing to rush defuses it.
2. **Verify independently.** Don't use the phone number or link they gave you. Look up the official contact yourself and reach out directly.
3. **Never share passwords or codes.** Treat anyone who asks as a scammer by default.
4. **When in doubt, ask someone.** A quick second opinion has saved countless people. Scammers rely on isolation.

## If you think you've been scammed

Don't panic, and don't feel ashamed — these schemes fool sharp, careful people every day. Act quickly: contact your bank, change affected passwords, and report it to the relevant authorities. Speed limits the damage.

## Build the instinct

Spotting scams is a skill, and like any skill it improves with practice. The more you train yourself to pause and question, the more automatic it becomes. Our [digital safety lessons](/learn/digital-safety) walk through real-world examples so you can build that instinct deliberately — useful whether or not you ever write a line of code.

## The bottom line

Almost every scam relies on urgency and a moment of not-thinking. Slow down, verify independently, never hand over passwords or codes, and ask for a second opinion when something feels off. Those few habits will protect you and the people you care about. [Sharpen your instincts with the digital safety lessons](/learn/digital-safety).`,
  },
  {
    slug: "free-ways-to-learn-to-code",
    title: "Free Ways to Learn to Code That Actually Work",
    description:
      "You don't need to spend money to learn to code. A practical guide to the free resources and habits that genuinely work — and the traps to avoid.",
    date: "2026-03-30",
    readingMinutes: 7,
    tags: ["free", "beginners", "resources"],
    body: `Here's a fact that should be encouraging: you can learn to code without spending a cent. Some of the best resources in the world are free, and plenty of working developers learned entirely on a budget of zero. The catch isn't money — it's knowing which free paths actually work and avoiding the ones that waste your time.

## Free is enough to get hired

Let's settle this first: a free education can absolutely take you to a job-ready level. Paid bootcamps and courses can add structure and support, but none of them have a secret ingredient you can't find for free. What they sell is convenience and accountability — both of which you can recreate on your own.

So if cost is your barrier, set that worry aside. The real question is how to use free resources well.

## What actually works for free

### Interactive, hands-on lessons

The single most effective free resource is anything that makes you *write code*, not just watch it. Interactive lessons with instant feedback keep you actively practicing, which is where real learning happens.

This is exactly what [Cantrip's lessons](/learn) are built for — auto-graded, interactive exercises across [Python](/learn/python), [SQL](/learn/sql), and more, free to start. You write real code from the first lesson and find out immediately whether it works.

### A free code playground

A [playground](/playground) lets you experiment with no installation and no setup. Try ideas, break things, and see results instantly. For beginners, removing the setup friction is a genuine accelerator — there's nothing between you and writing code.

### Structured free paths

The biggest risk with free learning is aimlessness — bouncing between random tutorials and never building a foundation. A structured path fixes that. Our [learning paths](/paths) lay out concepts in a sensible order, including dedicated tracks for the [frontend](/paths/frontend) and [backend](/paths/backend), so you always know what to learn next.

### Free reference material

You don't need to memorize syntax — you need to *find* it quickly. Free [cheat sheets](/cheatsheet) and official documentation cover this. Keep one open while you practice and you'll move faster without paying for anything.

## The free-learning traps to avoid

Free resources are powerful, but a few common traps quietly stall beginners:

- **Tutorial hopping.** Starting endless free courses without finishing any. Pick one path and stick with it.
- **Passive watching.** Free video is everywhere, and it's easy to mistake watching for learning. Always write the code yourself.
- **Collector's mode.** Bookmarking fifty resources "for later" instead of using one now. You need depth, not a library.
- **No projects.** Free tutorials can keep you in a comfortable bubble. Break out and [build small projects](/blog/5-beginner-coding-projects) to develop real problem-solving.

## A simple free roadmap

Putting it together, here's a no-cost plan that genuinely works:

1. **Pick one language and one path.** Commit to it.
2. **Do interactive lessons daily.** Even 15 minutes counts — [build the habit](/blog/build-a-daily-coding-habit).
3. **Practice in a playground.** Rewrite examples from memory and experiment.
4. **Build small projects** once you know the basics.
5. **Keep a cheat sheet handy** so syntax never slows you down.

None of those steps cost anything. All of them are how people actually learn.

## The bottom line

The barrier to learning to code was never money — it's consistency and focus. Free resources are more than good enough; the trick is to use them actively, follow a structured path, and build real things. [Start learning for free](/learn) and prove it to yourself.`,
  },
  reverseStringPost,
  bigOPost,
  sqlJoinsPost,
  closurePost,
  whatIsVibeCodingPost,
  howToStartVibeCodingPost,
  bestAiCodingTools2026Post,
  vibeCodingVsTraditionalPost,
  isVibeCodingWorthItPost,
  bestFreeWaysToLearnToCode2026Post,
  codecademyAlternativesPost,
  freecodecampAlternativesPost,
  howToLearnToUseAi2026Post,
  chatgptVsClaudeVsGeminiPost,
  howToLearnPython2026Post,
  bestAiToolsForStudents2026Post,
  howToBuildADeveloperPortfolioPost,
  practicalPromptEngineeringGuidePost,
  canYouLearnToCodeForFreePost,
  isLearningToCodeWorthIt2026Post,
  howSmallBusinessesUseAiPost,
  howToUseClaude,
  aiForBeginnersCompleteGuide,
  howToUseGemini,
  bestProgrammingLanguages2026,
  aiJobsAndSkills2026,
  howToLearnSql2026,
  howToLearnJavascript2026,
  cantripVsBootdev,
  aiSideHustles2026,
  howToStayRelevantAiEra,
];

/** Look up a single post by its slug. Returns undefined if not found. */
export function getPost(slug: string): BlogPost | undefined {
  return POSTS.find((p) => p.slug === slug);
}
