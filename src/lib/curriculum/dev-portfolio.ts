import type { Module } from "./types";

// Build a Developer Portfolio — a fully quiz-based module teaching developers
// how to plan, create, and ship a portfolio site that actually lands them work.
// Covers strategy, content, design principles, project selection, storytelling,
// technical hosting, and the ongoing maintenance that keeps a portfolio alive.
export const devPortfolio: Module = {
  slug: "dev-portfolio",
  title: "Build a Developer Portfolio",
  description:
    "Your portfolio is your most powerful career asset — but most developer portfolios actively hurt their owners. Learn how to plan, design, write, and ship a portfolio that hiring managers and clients actually want to read, then keep it working for you over time.",
  emoji: "🗂️",
  gradient: "from-indigo-500/20 to-blue-500/10",
  tagline:
    "Stop sending broken GitHub links. Build a portfolio that shows what you can do, tells your story, and earns callbacks.",
  keywords: [
    "developer portfolio",
    "how to build a portfolio website",
    "portfolio for developers",
    "software engineer portfolio",
    "portfolio tips",
    "how to get a dev job",
    "showcase projects",
    "portfolio case study",
  ],
  lessons: [
    {
      slug: "why-portfolios-matter",
      title: "Why Portfolios Win (and Most Fail)",
      blurb:
        "Understand what a portfolio is actually for and why the typical developer portfolio backfires.",
      xp: 20,
      kind: "quiz",
      content: `# Why Portfolios Win (and Most Fail)

A developer portfolio is not a resume in a different format. It is **evidence**:
proof that you can build real things, solve real problems, and communicate the
results to another human being.

Most developer portfolios fail for one of three reasons:

1. **Nothing to look at** — a "skills" list and some lorem-ipsum placeholders
   where projects should be. The reader bounces in ten seconds.
2. **No story** — a grid of GitHub cards. What did you build, why, what was hard?
   Nobody knows. Nobody clicks.
3. **Broken things** — dead links, a to-do list app that 500s, a "coming soon"
   section that was never coming. This signals you don't maintain your own work.

The bar is actually low. Because most portfolios fail, a thoughtful one stands out
immediately. Hiring managers and clients look at dozens of them; something that
works, explains itself, and shows personality is memorable.

**Who looks at portfolios?**

- **Technical recruiters** — scanning quickly for signal. Do the projects exist?
  Does the person seem real?
- **Hiring managers / senior engineers** — looking for depth. What problems did
  they actually solve?
- **Potential clients / freelance buyers** — asking "can this person do *my* thing?"

Each audience is slightly different, but all of them reward the same things:
working projects, clear writing, and honest specifics.

**The core job of a portfolio in 2026:** get a human to decide it is worth
spending thirty more minutes on you. That's it. It doesn't have to contain
everything you've ever done — it has to make a strong case with the best you have.`,
      questions: [
        {
          prompt:
            "What is the primary job of a developer portfolio?",
          options: [
            "List every technology and language you have ever used",
            "Provide enough evidence to convince a reader to spend more time on you — a callback, a DM, an interview",
            "Replace your resume entirely",
          ],
          answer: 1,
          explanation:
            "A portfolio is evidence, not a catalogue. Its goal is a next step — a conversation, an interview, a contract — not a complete record of your history.",
        },
        {
          prompt:
            "Which is the most common reason a developer portfolio fails?",
          options: [
            "It uses the wrong color palette",
            "It contains placeholder content, dead links, or broken demos — signaling neglect",
            "It lists too many projects",
          ],
          answer: 1,
          explanation:
            "Broken or empty portfolios are the norm, not the exception. A portfolio that actually works and explains itself stands out almost by default.",
        },
        {
          prompt:
            "A technical recruiter is scanning your portfolio for the first time. What are they primarily looking for?",
          options: [
            "A full accounting of your education history",
            "Quick signal: do real projects exist, does the person seem real, is anything broken?",
            "Your opinion on programming language wars",
          ],
          answer: 1,
          explanation:
            "Recruiters scan fast. They want confirmation that you are real, that you have built things, and that nothing is obviously wrong. Depth comes later with the hiring manager.",
        },
      ],
      explanation:
        "The standard is low. A portfolio that works, explains itself clearly, and shows real projects will beat the majority of the field without being fancy.",
    },
    {
      slug: "what-to-include",
      title: "What to Include (and What to Cut)",
      blurb:
        "Choose your projects strategically — quality over quantity, and context over screenshots.",
      xp: 22,
      kind: "quiz",
      content: `# What to Include (and What to Cut)

The question "how many projects should I include?" has a simple answer: **as many
as you'd be proud to walk a hiring manager through in detail.** For most people
early in their career, that is two to four. For experienced developers, it can be
three to six with greater depth.

## What makes a project portfolio-worthy?

- **It is finished (or has a working, stable version).** A half-built CRUD app is
  worse than no project — it signals you don't ship.
- **It solves a real problem** or demonstrates a meaningful technical concept.
  "I built a to-do list" is table stakes. "I built a tool that does X for Y
  reason, and here's what I learned" is a story.
- **You can talk about it.** If you copy-pasted your way through a tutorial and
  can't explain the code, put it in a private repo, not your portfolio.

## Choosing your best projects

Prioritize projects that show:
- **Complexity** — non-trivial logic, an interesting architecture decision, or
  something you had to figure out.
- **Relevance** — if you're applying for frontend roles, backend-only projects
  count for less. Tailor where you can.
- **Outcome** — did anyone use it? Did it do something real? Even "my mom uses
  this every week" is a compelling outcome.

## What to cut

- Tutorials you followed step by step with no meaningful additions.
- Unmaintained projects where the demo is broken.
- Projects that duplicate each other (three different to-do lists).
- Anything you can't discuss knowledgeably in an interview.

A portfolio is a curated highlight reel, not a GitHub mirror. Fewer great projects
beat many mediocre ones every time.`,
      questions: [
        {
          prompt:
            "How many projects should a typical early-career developer feature in their portfolio?",
          options: [
            "As many as possible — quantity signals productivity",
            "Two to four that are polished, finished, and explainable in depth",
            "Only one, to keep focus",
          ],
          answer: 1,
          explanation:
            "Quality beats quantity. Two solid, well-documented projects with real outcomes are more persuasive than ten half-finished repos.",
        },
        {
          prompt:
            "Which project should you remove from a portfolio?",
          options: [
            "A side project that only three friends use",
            "A tutorial you followed step by step that you cannot explain in your own words",
            "An older project that uses a framework version that is no longer current",
          ],
          answer: 1,
          explanation:
            "If you can't walk an interviewer through the decisions you made, the project works against you. Tutorial clones also signal you haven't gone beyond guided learning.",
        },
        {
          prompt:
            "You built an app that solves a real problem for a small group of users. In your portfolio, what framing is strongest?",
          options: [
            "'A full-stack application built with React and Node.'",
            "'Built for a team of nurses who needed X — it has been in daily use for six months. Here's the hardest problem I solved.'",
            "A screenshot with a link to the GitHub repo and no further explanation.",
          ],
          answer: 1,
          explanation:
            "Outcome, audience, and a specific challenge beat a tech-stack label every time. Real users and a real problem make a project memorable.",
        },
      ],
      explanation:
        "Curate ruthlessly. Two polished, explainable projects with real outcomes will outperform ten tutorials and placeholder pages.",
    },
    {
      slug: "writing-case-studies",
      title: "Writing Project Case Studies",
      blurb:
        "Turn a project into a story: problem, process, solution, and what you learned.",
      xp: 25,
      kind: "quiz",
      content: `# Writing Project Case Studies

A project card with a screenshot and a tech-stack list is not a case study. A case
study answers a hiring manager's real questions: **What was the problem? What did
you decide and why? What was hard? What did you learn?**

## The four-part structure

1. **Problem** — what gap or need started this project? Be specific. "I needed a
   better way to track freelance invoices" is better than "I wanted to practice
   React."
2. **Process** — what did you build, and what decisions did you make? This is where
   you demonstrate technical judgment. Talk about what you *chose not to do* and
   why. Mention one thing that didn't work and how you handled it.
3. **Result** — what did you ship? Is it live? Do people use it? Even a small,
   honest outcome is worth stating.
4. **What you learned** — one or two specific things. Not "I learned a lot" — "I
   learned that optimistic UI updates require careful error-state rollback, and I
   refactored the store twice before it felt solid."

## Length and format

A strong case study is **250–500 words** per project, not a blog post. Use short
paragraphs. A few bullet points are fine. Include:

- One good screenshot or a short GIF of the actual thing working.
- A link to the live demo *and* the GitHub repo (if it's public and clean).
- The tech stack — at the *end*, not the headline.

## Tone

Write like a professional, not like you're filling out a form. First person is
fine. "I struggled with X and solved it by doing Y" is more engaging and honest
than a passive-voice project summary. Readers can tell the difference.`,
      questions: [
        {
          prompt:
            "What is the most important thing a project case study should answer?",
          options: [
            "The exact version numbers of every dependency used",
            "What the problem was, what decisions were made and why, what was hard, and what you learned",
            "A complete commit history summary",
          ],
          answer: 1,
          explanation:
            "Case studies demonstrate judgment and communication, not just execution. Hiring managers want to see how you think, not just what you built.",
        },
        {
          prompt:
            "Where in a case study should you list the tech stack?",
          options: [
            "As the headline — it's the most important signal",
            "At the end, after the problem, process, and result are clear",
            "You should not include it at all",
          ],
          answer: 1,
          explanation:
            "Tech stacks give context, but they don't tell the story. Leading with 'React / Node / PostgreSQL' before any context buries the interesting part.",
        },
        {
          prompt:
            "Which case study excerpt is stronger?",
          options: [
            "'This project was built to improve my skills in full-stack development using modern technologies.'",
            "'My freelance clients were losing track of invoices in email threads. I built a lightweight invoicing tool — 40 invoices sent in the first month, zero support questions.'",
            "'A CRUD application demonstrating RESTful API design patterns.'",
          ],
          answer: 1,
          explanation:
            "Specific problem, real outcome, honest metric. This excerpt answers why the project exists and whether it worked, which is what a reader actually wants to know.",
        },
      ],
      explanation:
        "Problem, process, result, learning. Four parts, 250–500 words, one honest screenshot. That's a case study that gets read.",
    },
    {
      slug: "design-and-ux",
      title: "Design & UX for Developers",
      blurb:
        "You don't need to be a designer. You need to not make common mistakes that sink credibility.",
      xp: 22,
      kind: "quiz",
      content: `# Design & UX for Developers

Your portfolio's design is itself a signal. A developer portfolio that is hard to
read, visually cluttered, or broken on mobile tells the viewer something — and it's
not something good. You do not need to be a designer, but you do need to avoid the
mistakes that kill credibility.

## The non-negotiables

- **Readable typography.** Dark text on a light background (or careful dark mode)
  at a size that doesn't require squinting. 16px body text is a reasonable minimum.
- **Mobile-friendly.** Hiring managers review portfolios on phones. If yours breaks
  at 375px, you've lost that conversation.
- **Fast load time.** A 10MB hero image, unoptimized. A slow site implies you don't
  think about performance — a real concern for a frontend or full-stack role.
- **Clear navigation.** The reader should find your projects in under five seconds.
  No maze of dropdowns, no parallax that fights scrolling.

## Common mistakes

- **The hero section that says nothing.** "I am a passionate developer who loves
  building things." Okay. What kind of things? For whom? In one sentence, tell them
  what you do and who you help.
- **Dark glassmorphism everything.** Trendy in the early 2020s, now a cliché, and
  often hard to read. Use design trends thoughtfully, not as a default.
- **Autoplay videos and music.** Never.
- **A contact form that doesn't work.** Test it. Then test it again.

## What actually signals good taste

- Consistent spacing — pick a spacing scale and stick to it.
- A limited color palette — two or three colors, used with purpose.
- Images that are compressed and alt-tagged.
- A design that gets out of the way of the content.

You can use a template or a framework like Tailwind — there is no shame in
standing on good infrastructure. The goal is a site that reads well and loads fast,
not a design award.`,
      questions: [
        {
          prompt:
            "Why does mobile responsiveness matter for a developer portfolio?",
          options: [
            "Google penalizes non-mobile sites in search rankings, which is the main concern",
            "Hiring managers and clients often review portfolios on phones — a broken layout ends the conversation",
            "Mobile traffic only matters for consumer apps, not professional sites",
          ],
          answer: 1,
          explanation:
            "A portfolio that breaks on a phone signals either inattention to detail or that you don't test your own work — both are concerning signals for a developer.",
        },
        {
          prompt:
            "Your portfolio hero section currently reads: 'Passionate developer who loves building innovative solutions.' What should you change it to?",
          options: [
            "Remove it entirely and start with the projects grid",
            "A specific one-sentence statement: what you build, for whom, with what specialty — e.g., 'Full-stack developer building data-heavy tools for logistics teams'",
            "Add more adjectives to make it more compelling",
          ],
          answer: 1,
          explanation:
            "'Passionate' and 'innovative' tell the reader nothing they can act on. A specific claim — your focus, your audience, your specialty — is memorable and searchable.",
        },
        {
          prompt:
            "Which of these is always acceptable on a developer portfolio?",
          options: [
            "Autoplay background music that sets the mood",
            "A template or UI framework like Tailwind, as long as the result reads well and loads fast",
            "A 'Coming Soon' projects section while you finish building",
          ],
          answer: 1,
          explanation:
            "Using a template or framework is completely professional. The goal is communication, not bespoke design. Autoplay audio is universally unwelcome, and placeholder sections actively hurt you.",
        },
      ],
      explanation:
        "Readable, fast, mobile-friendly, and easy to navigate. Design for a portfolio is about removing obstacles, not impressing judges.",
    },
    {
      slug: "hosting-and-domain",
      title: "Hosting, Domains, and Going Live",
      blurb:
        "Get your portfolio on a real URL with a custom domain, HTTPS, and a deployment pipeline.",
      xp: 22,
      kind: "quiz",
      content: `# Hosting, Domains, and Going Live

A portfolio is not a portfolio until it is live on the internet, on a URL you can
share. This lesson covers the practical decisions around hosting and domains.

## Hosting options (as of 2026)

For most developer portfolios, a static-site host is the right answer. The leaders
remain:

- **Vercel** — excellent for Next.js and React. Free tier is generous and covers
  most personal sites. Push to main, it deploys automatically.
- **Netlify** — similar to Vercel, strong for static sites and JAMstack. Free tier
  available.
- **GitHub Pages** — free, simple, limited (no server-side rendering). Good for
  pure HTML/CSS/JS or a Jekyll site.
- **Cloudflare Pages** — fast edge network, free tier. Worth considering if
  performance is a priority.

All of these include HTTPS automatically. There is no reason in 2026 to serve a
portfolio over plain HTTP.

## Custom domains

A custom domain (yourname.dev or firstlastdev.com) signals professionalism
immediately. A shared subdomain (yourname.github.io, yourname.vercel.app) is
functional but forgettable. Domains cost roughly $10–20/year and are worth it.

Tips:
- **Choose a domain you can keep.** Your name, or name + "dev" or "codes".
- **Avoid creative spellings.** You will say it aloud. Make it easy to type.
- **.dev** is clean and developer-specific. **.com** is still fine.
- **Set up the www and apex records correctly** — check that both the naked domain
  and www redirect to the same place.

## Deployment pipeline basics

The correct workflow: **push to git → auto-deploy → live in under a minute.** Set
this up on day one. If deploying your portfolio requires manual FTP, fix that.
Automatic deploys mean you'll actually keep the site updated.

Test after every deploy: open an incognito window, check the live URL, click every
link, submit the contact form.`,
      questions: [
        {
          prompt:
            "Which hosting approach is best suited to most developer portfolios in 2026?",
          options: [
            "A traditional managed VPS or bare-metal server for full control",
            "A static-site host like Vercel, Netlify, or Cloudflare Pages — automatic HTTPS, free tier, push-to-deploy",
            "Shared cPanel hosting purchased from a budget provider",
          ],
          answer: 1,
          explanation:
            "Static-site hosts handle HTTPS, CDN, and auto-deploys for free. A VPS is over-engineering for a portfolio; budget shared hosting often lacks automatic HTTPS and modern deploy tooling.",
        },
        {
          prompt:
            "Why is a custom domain worth the roughly $10–20/year cost for a developer portfolio?",
          options: [
            "Custom domains improve Google search ranking more than any other factor",
            "It signals professionalism, is memorable, and is yours regardless of which host you use",
            "Free subdomains are penalized by applicant tracking systems",
          ],
          answer: 1,
          explanation:
            "A custom domain is host-independent (you can move hosts without changing the URL) and reads as intentional. It's a small investment that removes a subtle credibility gap.",
        },
        {
          prompt:
            "What is the correct deployment workflow for a developer portfolio?",
          options: [
            "Manually FTP files to the server after each change",
            "Push to a git branch, which triggers an automatic build and deploy, live in under a minute",
            "Deploy only when a major change is ready, to avoid showing work in progress",
          ],
          answer: 1,
          explanation:
            "Automatic git-triggered deploys remove friction, making you more likely to keep the site updated. Manual FTP is error-prone and slow; delaying deploys means the site stays stale.",
        },
      ],
      explanation:
        "Static host, custom domain, HTTPS, automatic deploys. That's the setup. Get it right once and maintaining the site becomes easy.",
    },
    {
      slug: "networking-and-visibility",
      title: "Getting Your Portfolio Seen",
      blurb:
        "A portfolio nobody finds is just a website. Connect it to where opportunities actually live.",
      xp: 22,
      kind: "quiz",
      content: `# Getting Your Portfolio Seen

Building the portfolio is half the job. Making sure the right people encounter it
is the other half.

## The connection layer

Your portfolio's URL needs to be on every surface where professionals look for you:

- **LinkedIn** — in the "Website" field, in the About section summary, and linked
  from each relevant job entry. LinkedIn is where most recruiters start.
- **GitHub profile** — your pinned repos should link to the live demos and your
  portfolio site. Your GitHub bio should include the portfolio URL.
- **Email signature** — every email you send to someone professional.
- **Resume PDF** — near your name, hyperlinked in the PDF.
- **Twitter / X, Bluesky, or wherever your professional community lives** — in
  your bio.

## Being findable via search

If your portfolio has good content — real project descriptions, clear writing, your
name — it will index. Don't stuff keywords, but do use descriptive \`<title>\` tags,
proper \`<meta>\` descriptions, and meaningful \`alt\` attributes on images.

Your name + "developer" or "engineer" is the search query you want to rank for.
A brief, plain-English "About" page with your focus area helps significantly.

## Active sharing

Passive visibility (sitting on a URL) gets you some traffic. Active sharing gets
you more:

- Share a new project writeup on LinkedIn or Bluesky when you ship it.
- Submit your portfolio to community showcases (dev.to, Hacker News "Who's Hiring,"
  relevant Discord communities).
- When commenting helpfully in technical discussions, your profile/link is there.

The goal is that when someone hears about you and types your name, the portfolio
is the first result and the first impression.`,
      questions: [
        {
          prompt:
            "Which surface is the most important for making your portfolio URL visible to professional recruiters?",
          options: [
            "Instagram bio",
            "LinkedIn — in the Website field, the About section, and linked from job entries",
            "A personal subreddit",
          ],
          answer: 1,
          explanation:
            "Recruiters start with LinkedIn. Your portfolio URL on LinkedIn gives them a one-click path from profile to evidence. Other surfaces matter too, but LinkedIn is the primary professional discovery layer.",
        },
        {
          prompt:
            "What is the most effective SEO practice for a developer portfolio?",
          options: [
            "Repeat your name and skills as many times as possible on every page",
            "Write clear, descriptive page titles and meta descriptions, and meaningful alt text — then let real content do the work",
            "Submit your site to every link directory you can find",
          ],
          answer: 1,
          explanation:
            "Keyword stuffing hurts. Descriptive metadata and genuine content (real project writeups) rank well and serve readers. Search engines in 2026 are good at distinguishing authentic content from spam.",
        },
        {
          prompt:
            "You just shipped a significant new project and added it to your portfolio. What should you do next?",
          options: [
            "Wait for recruiters to find it organically",
            "Share the project writeup on LinkedIn and any relevant professional communities, with a link to the portfolio entry",
            "Email your entire contacts list",
          ],
          answer: 1,
          explanation:
            "Shipping without sharing means only passive traffic. A short LinkedIn post or community share puts the project in front of people who are already interested in your work — and often triggers profile visits.",
        },
      ],
      explanation:
        "LinkedIn, GitHub, email signature, resume PDF. Put the URL everywhere once. Then stay active: share new work when you ship it.",
    },
    {
      slug: "maintaining-and-evolving",
      title: "Keeping Your Portfolio Alive",
      blurb:
        "Capstone: a portfolio that earns you opportunities six months from now needs a maintenance habit, not a redesign spiral.",
      xp: 25,
      kind: "quiz",
      content: `# Keeping Your Portfolio Alive

You built it, you launched it, you got the URL everywhere. Now what? Most
developers update their portfolio in a panic before a job search. The ones who
get consistent opportunities update it as a habit.

## The portfolio rot problem

A portfolio that was great six months ago can become a liability. Projects go
offline. Technologies listed become dated. The bio still says you're looking for
your first role when you're now two years into your second job. Broken demos are
worse than no demos.

A brief monthly check — five minutes — prevents most of this:
- Open every demo link in incognito mode. Does it load?
- Is the most recent work represented?
- Is anything in the bio or "about" section factually outdated?

## When to do a proper update

- When you finish a significant project worth featuring.
- When you take on a substantially different role or focus area.
- When a project you've featured is shut down or becomes unmaintainable (remove it).
- Before any intentional job search — at least two weeks before, not the night
  before.

## The redesign trap

Redesigning the portfolio is a form of productive procrastination. A fresh coat
of paint feels like progress, but a site that has been redesigned three times
without new projects is still a site with nothing interesting to show. New work
beats new design, almost always.

## What a mature, maintained portfolio looks like

- Two to five projects, all working, all with current case studies.
- An "about" section that reflects who you actually are right now.
- A bio that states your current role and what you're interested in.
- A contact method that works (test it quarterly).
- A last-updated date if projects are dated, so readers know the work is current.

The developers who get consistent inbound — interesting work finds them, rather
than them scrambling — almost always have a portfolio that is modest, honest,
current, and functional. That combination is rarer than it should be.`,
      questions: [
        {
          prompt:
            "What is the most common way a once-good portfolio becomes a liability?",
          options: [
            "The design becomes dated as trends change",
            "Projects go offline, the bio becomes outdated, and broken demos are never fixed",
            "Too many projects make it overwhelming",
          ],
          answer: 1,
          explanation:
            "Portfolio rot is about accuracy and functionality, not aesthetics. A broken demo or a bio that still says 'looking for first role' after two years actively signals inattention.",
        },
        {
          prompt:
            "What is the 'redesign trap' in the context of portfolio maintenance?",
          options: [
            "Using a framework that becomes difficult to update later",
            "Repeatedly redesigning the visual style instead of adding new, meaningful work — a form of productive procrastination",
            "Making the design so distinctive that it overshadows the content",
          ],
          answer: 1,
          explanation:
            "Redesigning feels productive without the discomfort of actually shipping new work. New projects and updated case studies have far more impact than a fresh color scheme.",
        },
        {
          prompt:
            "How long before an intentional job search should you update your portfolio?",
          options: [
            "The night before sending applications",
            "At least two weeks before — so you have time to add a project, fix broken links, and refine the writing without rushing",
            "A year in advance, to give search engines time to index it",
          ],
          answer: 1,
          explanation:
            "Night-before updates are rushed, broken, and often make things worse. Two weeks gives you time to write a proper case study, test every link, and have someone else read it before it matters.",
        },
      ],
      explanation:
        "Five minutes a month keeps portfolio rot away. New projects beat redesigns. Update before you need to, not during the panic of a job search.",
    },
  ],
};
