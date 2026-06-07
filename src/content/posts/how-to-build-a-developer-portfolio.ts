// Targets "how to build a developer portfolio" / "developer portfolio that gets you hired" —
// high-intent career post. AEO-optimised: 40-60 word direct-answer opener, question H2s,
// comparison table, FAQ block, and internal links to /learn, /paths/work-with-ai,
// /learn/ai-for-everyone, /pricing.

import type { BlogPost } from "../blog";

const post: BlogPost = {
  slug: "how-to-build-a-developer-portfolio",
  title: "How to Build a Developer Portfolio That Gets You Hired",
  description:
    "A practical guide to building a developer portfolio that actually impresses hiring managers — what to include, how many projects you need, and the mistakes that quietly sink most portfolios.",
  date: "2026-06-07",
  readingMinutes: 10,
  tags: ["career", "portfolio", "job-search", "beginners"],
  body: `A developer portfolio that gets you hired has three to five projects that solve real problems, clean code on GitHub with genuine commit history, and a short bio that tells a recruiter exactly what you can do. Quality beats quantity every time. You don't need ten projects — you need two or three that demonstrate you can build something useful from start to finish.

## Why does a portfolio matter more than a degree?

Hiring managers in software development face a fundamental problem: a résumé tells them almost nothing about whether someone can actually write code. A portfolio solves that. It's proof — not a claim.

This matters especially for career changers, self-taught developers, and bootcamp graduates who don't have a traditional CS degree to lean on. A strong portfolio can outweigh a missing degree at the majority of entry-level and junior roles because it answers the question interviewers are really asking: "Can this person ship something?"

Even for developers with degrees, portfolios differentiate. Two candidates with identical credentials but one polished GitHub profile and deployed projects are not equally competitive.

## How many projects do you actually need?

Three to five is the standard advice, and it's right — with a catch: the projects have to be substantive. A portfolio of three well-built projects beats a portfolio of ten unfinished or trivially simple ones.

A practical target for a junior developer:

- **One anchor project** — your best work, ideally something with a real use case, that you'd be proud to walk through in an interview.
- **One to two supporting projects** — demonstrate breadth or a specific technical skill relevant to your target roles.
- **One "learning" project** — can be simpler, shows you're actively building and growing.

That's it. More is fine, but don't pad. Recruiters scan portfolios quickly, and weak projects drag the whole thing down.

## What makes a portfolio project actually impressive?

Most beginners make the same mistake: they build the same to-do list and weather app as everyone else. Those projects aren't wrong to learn on — but they rarely differentiate in a portfolio.

### Solve a real problem

The strongest portfolio projects solve a problem someone actually has — even a small one. A tool that automates something tedious, a site that does something useful for a community you're part of, a script that saves you an hour a week. The "realness" is what interviewers remember.

### Show your process, not just the result

A good repository tells a story. That means:

- A clear \`README.md\` that explains what the project does and how to run it.
- A commit history that shows real iterative development — not one giant commit.
- Comments and documentation where the code is non-obvious.
- Evidence that you thought about edge cases and errors.

### Deploy it

A live URL is worth far more than a screenshot. If your project runs in a browser, deploy it. Free tiers on Vercel, Netlify, and Railway cover most beginner projects. There's no excuse in 2026 for a web project that only exists on your local machine.

### Use real data or real users if possible

A portfolio app that a few friends actually use, or that pulls from a public API, is immediately more credible than one that runs on hardcoded dummy data.

## What tech stack should you use?

Use whatever you're learning seriously — but be aware of the market. In 2026, the most broadly hireable combinations for entry-level roles are:

| Goal | Recommended stack |
| --- | --- |
| Frontend roles | React (or Next.js) + TypeScript + Tailwind |
| Backend roles | Node.js or Python + PostgreSQL or SQLite |
| Full-stack roles | Next.js + a database (Prisma/Drizzle + Postgres) |
| Data/analytics roles | Python + pandas/SQL + a visualization library |
| AI-adjacent roles | Python + an LLM API (OpenAI, Anthropic) + basic web layer |

Avoid framework-hopping. Pick one and build two or three projects in it so you demonstrate depth, not just breadth.

If you're still building foundational skills, the [learning paths on Cantrip](/learn) let you pick a direction — frontend, backend, or the [Work with AI path](/paths/work-with-ai) — and get structured practice before your portfolio projects.

## What should your portfolio site itself include?

A portfolio site isn't just a project list. It's also a piece of evidence — does this developer pay attention to detail? Can they ship something polished?

Keep it simple. The essentials:

- **Your name and a one-sentence bio** that says what kind of work you do and what you're looking for.
- **A projects section** with a short description, tech stack, live link, and GitHub link for each project.
- **A contact method** — email or a link to your LinkedIn/GitHub profile.
- **No broken links, no placeholder text, no "coming soon" sections.**

What to skip: long autobiographies, skill bars (they communicate nothing meaningful), and clip art.

## How do AI skills factor into a portfolio in 2026?

Increasingly, hiring managers — especially at startups and smaller companies — want to see that candidates know how to work with AI tools effectively. This isn't just vibe coding hype: developers who can integrate AI APIs, build AI-assisted workflows, or use AI tools productively are more valuable than those who can't.

If you're building in this direction, a project that integrates an LLM (even a simple chatbot, a text summarizer, or an AI-assisted form) is a genuine differentiator right now. The [AI for Everyone module](/learn/ai-for-everyone) and the [Work with AI path](/paths/work-with-ai) are designed to get you there with the right foundations.

## GitHub: the hidden portfolio layer

Your GitHub profile is a portfolio within your portfolio. Recruiters and hiring managers often look at it directly, even before your portfolio site. A few things that matter:

- **Green squares.** A contribution graph that shows regular activity signals someone actively coding. You don't need daily commits, but gaps of months read as inactive.
- **Pinned repositories.** Pin your best three to six projects so they're the first thing anyone sees.
- **Readable READMEs.** Every pinned repo should have a clear description, setup instructions, and at least a screenshot or demo GIF.
- **No junk repos.** Unfinished experiments are fine privately; your public profile should only show things you'd stand behind.

## What about open source contributions?

Contributing to open source is valuable but not required for a first job. If you have the time and find a project that interests you, even small contributions — fixing a typo in docs, reporting a bug, submitting a minimal fix — demonstrate that you can work in a real codebase and collaborate with other developers.

It's better to have one genuinely good portfolio project than to force an open source contribution that doesn't feel authentic.

## The résumé and portfolio connection

Your portfolio and résumé should reinforce each other, not repeat each other. The résumé names the project and the stack; the portfolio shows the work. On your résumé:

- Link to both your portfolio site and your GitHub profile.
- For each project, include one sentence on the problem it solves and one sentence on the technical approach.
- List the technologies you used — recruiters and ATSs scan for these.

If you're using Cantrip's Pro tier, the career layer includes a résumé export and job-readiness score that ties your completed skills directly to portfolio and résumé context. [Check the details at /pricing](/pricing).

## Common portfolio mistakes to avoid

**Too many half-finished projects.** Five incomplete projects is worse than two complete ones. Finish before you publish.

**No live demo.** If you're building for the web, deploy it. Full stop.

**Copied tutorial projects without modification.** If your project is the exact app from a tutorial, either extend it significantly or don't include it. Hiring managers recognize tutorial projects.

**Ignoring mobile.** In 2026, if your web project is broken on a phone, that's a red flag. Test responsiveness.

**Generic "about me" text.** "Passionate developer who loves learning and solving problems" is meaningless. Say what you've built and what you're targeting.

---

## Frequently asked questions

### How long does it take to build a portfolio worth showing?

With consistent practice, most people are ready to start their first real portfolio project after two to three months of learning. A portfolio worth sharing — three solid projects with READMEs and live demos — is typically achievable within six months of starting from scratch. The [learning paths on Cantrip](/learn) provide a structured route to get there.

### Can I include personal or non-professional projects?

Yes, and they're often more memorable than generic demos. A project you built because you actually needed it — a tool for a hobby, a site for a community you're part of, a script that automates something annoying in your life — tells an interviewer something real about you.

### Should I build a portfolio site from scratch or use a template?

Either is fine. A hand-built site demonstrates frontend skill; a template lets you focus time on projects. If you use a template, customize it enough that it doesn't look like a template. The content matters more than the design.

### What if I'm still learning — should I start a portfolio now?

Yes, but set realistic expectations. A portfolio during learning should be framed as "here's what I'm building" rather than "here's my professional work." The habit of publishing and the commit history you build now are both assets later.

### Does Cantrip provide portfolio support?

The Pro tier includes a career layer with a job-readiness score, résumé export, and skill certificates you can reference. The 14-day Pro trial gives full access to this before you decide whether to pay. [Start the trial at /pricing](/pricing) or [explore the learning paths](/learn) to build the skills first.`,
};

export default post;
