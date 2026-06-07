import type { Module } from "./types";

// No-Code & Low-Code Tools — a practical survey of the modern no-code/low-code
// landscape: builders, automation, databases, and AI-powered tools. All quiz
// lessons, no coding required. Accurate as of mid-2026.
export const noCodeTools: Module = {
  slug: "no-code-tools",
  title: "No-Code & Low-Code Tools",
  description:
    "Build real apps, automate workflows, and ship products without writing traditional code. Learn how to pick the right platform for every job — from website builders and internal tools to database apps and AI-powered automations.",
  emoji: "🧱",
  gradient: "from-fuchsia-500/20 to-purple-500/10",
  tagline:
    "Ship faster with no-code and low-code: websites, databases, automations, and AI tools — no programming background required.",
  keywords: [
    "no-code tools",
    "low-code platforms",
    "build without code",
    "Webflow",
    "Bubble",
    "Airtable",
    "Zapier",
    "Make",
    "no-code automation",
    "app builder",
  ],
  lessons: [
    {
      slug: "no-code-landscape",
      title: "The No-Code Landscape",
      blurb: "What no-code and low-code actually mean, and why the line between them matters.",
      xp: 20,
      kind: "quiz",
      content: `# The No-Code Landscape

**No-code** platforms let you build software through visual interfaces — drag, drop,
configure, connect — with zero hand-written code required. **Low-code** platforms do
the same but expose an escape hatch: you can drop into real code when the visual
tools hit their ceiling.

Both exist on a spectrum. A landing page builder is firmly no-code. An enterprise
workflow platform with a Python scripting layer is firmly low-code. Many tools sit
in the middle and call themselves whatever sounds better for marketing.

## Why this matters now

For most of computing history, "build software" meant "hire a developer." That
changed fast. The categories have matured enough that:

- **Small teams and solo founders** ship real SaaS products without engineers.
- **Operations, marketing, and HR professionals** automate their own workflows
  in hours instead of waiting weeks for an IT ticket.
- **Developers** use no-code for the boring scaffolding so they can focus on
  the logic that actually needs code.

## The four main categories

| Category | What it builds | Example tools |
|---|---|---|
| **Site/app builders** | Websites, web apps, landing pages | Webflow, Framer, Bubble |
| **Database/spreadsheet hybrids** | Structured data + views + automations | Airtable, Notion, NocoDB |
| **Automation/iPaaS** | Connects apps and runs workflows | Zapier, Make, n8n |
| **Internal tools** | Admin panels, dashboards, forms | Retool, AppSmith, Glide |

Knowing which category to reach for first saves enormous time.`,
      questions: [
        {
          prompt: "What is the key practical difference between 'no-code' and 'low-code' platforms?",
          options: [
            "No-code is free; low-code always costs money",
            "Low-code adds an option to write real code when visual tools aren't enough, while no-code does not",
            "No-code only works for websites; low-code works for everything else",
          ],
          answer: 1,
          explanation:
            "The defining distinction is the escape hatch: low-code lets you drop into real code when you hit the ceiling. No-code keeps everything visual. Pricing and use-case scope vary independently of this.",
        },
        {
          prompt: "A startup team wants to build an admin dashboard that connects to their database — no design work, just internal ops. Which category of tool fits best?",
          options: [
            "Site/app builders like Webflow or Framer",
            "Internal tool builders like Retool or AppSmith",
            "Automation platforms like Zapier or Make",
          ],
          answer: 1,
          explanation:
            "Internal tool builders (Retool, AppSmith, Glide) are purpose-built for admin panels, dashboards, and ops forms. Site builders are for public-facing sites; automation platforms connect apps and run workflows.",
        },
        {
          prompt: "Which statement best describes how professional developers use no-code tools?",
          options: [
            "They avoid them entirely — real engineers write everything by hand",
            "They use them for routine scaffolding so they can focus code on the logic that actually needs it",
            "They use them only when budgets are too small to afford real development",
          ],
          answer: 1,
          explanation:
            "No-code handles boilerplate (landing pages, admin UIs, simple workflows) efficiently. Developers increasingly treat them as productivity multipliers, not competition.",
        },
      ],
      explanation:
        "No-code vs low-code is a spectrum, not a binary. Knowing the four main tool categories — builders, databases, automation, internal tools — lets you pick the right one before you start building.",
    },
    {
      slug: "website-and-app-builders",
      title: "Website & App Builders",
      blurb: "Webflow, Framer, Bubble, and Wix — what each is actually good at.",
      xp: 20,
      kind: "quiz",
      content: `# Website & App Builders

Site and app builders span a wide range. Choosing wrong wastes weeks of work.

## Pure site builders (mostly marketing/content)

- **Wix / Squarespace** — consumer-friendly, hosted, lowest barrier. Good for
  small business sites, portfolios, and simple e-commerce. Limited custom logic.
- **Framer** — design-first, excellent component control, popular with product
  and SaaS marketing sites. Exports clean code; has a CMS.
- **Webflow** — the professional's choice for marketing sites. Full CSS/layout
  control visually, CMS for dynamic content, and e-commerce. Steep learning curve
  but production-grade output.

## Web app builders (actual user-facing products)

- **Bubble** — the most capable no-code web app platform. Handles user auth,
  databases, APIs, and complex workflows. Used to build real SaaS companies.
  Significant learning investment up front.
- **Softr / Glide** — faster to launch than Bubble, designed to wrap an existing
  data source (Airtable, Google Sheets) in a polished UI. Best for internal tools
  and simple client portals.

## How to choose

Ask three questions:
1. Is it **public-facing** (marketing, content) or **functional** (users log in, do things)?
2. Does it need a **custom database**, or will an existing sheet/table work?
3. How complex is the **business logic** (if/then rules, calculations, multi-step flows)?

More "yes" answers → more capable (and complex) tool required.`,
      questions: [
        {
          prompt: "A founder wants to launch a real SaaS product — users sign up, log in, manage projects, and pay for subscriptions. Which tool is the best fit?",
          options: [
            "Squarespace",
            "Bubble",
            "Framer",
          ],
          answer: 1,
          explanation:
            "Bubble handles user auth, databases, business logic, and API integrations — the full stack of a web app. Squarespace and Framer are for content/marketing sites, not functional SaaS products.",
        },
        {
          prompt: "A design agency wants a stunning marketing site with a blog CMS and full layout control. They are willing to invest time in learning. Best pick?",
          options: [
            "Webflow",
            "Bubble",
            "Softr",
          ],
          answer: 0,
          explanation:
            "Webflow offers professional-grade visual CSS control and a CMS, making it the standard choice for high-quality marketing sites. Bubble is for web apps; Softr is for portals backed by existing data sources.",
        },
        {
          prompt: "What is Softr/Glide best suited for, compared to Bubble?",
          options: [
            "Larger, more complex SaaS products with custom databases",
            "Simple portals and internal tools that wrap an existing data source like Airtable or Google Sheets",
            "Static marketing websites with no user accounts",
          ],
          answer: 1,
          explanation:
            "Softr and Glide shine when you already have data in a spreadsheet or Airtable and want to wrap it in a polished UI quickly. They trade Bubble's power for significantly faster time-to-launch.",
        },
      ],
    },
    {
      slug: "database-and-spreadsheet-hybrids",
      title: "Databases & Spreadsheet Hybrids",
      blurb: "Airtable, Notion, and NocoDB turn structured data into living apps.",
      xp: 20,
      kind: "quiz",
      content: `# Databases & Spreadsheet Hybrids

A plain spreadsheet is great for lists but collapses when data gets relational,
teams grow, or you need views, automations, and forms. A traditional database is
powerful but requires SQL knowledge and engineering time. **Spreadsheet-database
hybrids** fill the gap.

## Key tools

### Airtable
The category pioneer. A relational database with a spreadsheet-like UI, multiple
view types (grid, kanban, calendar, gallery, form), native automations, and a
rich API. Used for CRM, content calendars, project tracking, product roadmaps,
and as the data layer behind Softr/Glide portals. Generous free tier; paid tiers
unlock record limits and advanced automations.

### Notion
Started as a wiki/docs tool but added databases with linked views and formulas.
Stronger for knowledge management and team wikis than pure data-crunching.
Its API is fully capable but the database features are simpler than Airtable's.

### NocoDB / Baserow (open-source)
Self-hostable Airtable alternatives. NocoDB connects to an existing Postgres,
MySQL, or SQLite database and layers a spreadsheet UI on top — useful when you
already have a real database and want non-technical users to interact with it
safely. No vendor lock-in.

## When to use which

| Need | Best fit |
|---|---|
| Team knowledge base + light DB | Notion |
| Structured data, automations, API | Airtable |
| Own DB, no SaaS lock-in | NocoDB / Baserow |`,
      questions: [
        {
          prompt: "Why are spreadsheet-database hybrids useful compared to a plain spreadsheet like Google Sheets?",
          options: [
            "They are always cheaper than Google Sheets",
            "They support relational data, multiple view types, automations, and APIs that plain spreadsheets lack",
            "They let you write SQL queries directly",
          ],
          answer: 1,
          explanation:
            "Hybrids like Airtable add relational links between tables, views (kanban, calendar, gallery), built-in automations, and a proper API — closing the gap between a spreadsheet and a real application.",
        },
        {
          prompt: "A company already has a Postgres production database. They want non-technical staff to view and edit certain records safely. Which tool fits best?",
          options: [
            "Airtable",
            "Notion",
            "NocoDB",
          ],
          answer: 2,
          explanation:
            "NocoDB (and Baserow) connect directly to existing SQL databases and layer a spreadsheet UI on top. No data migration, no vendor lock-in — exactly what this scenario needs.",
        },
        {
          prompt: "Notion is generally the stronger choice over Airtable when your primary need is:",
          options: [
            "Complex relational data with automations and a rich API",
            "Team documentation, wikis, and knowledge management with light database use",
            "Replacing a production SQL database",
          ],
          answer: 1,
          explanation:
            "Notion began as a wiki/docs platform and remains best for knowledge management. Airtable is stronger for structured, relational data with heavy automation and API needs.",
        },
      ],
    },
    {
      slug: "automation-platforms",
      title: "Automation Platforms",
      blurb: "Zapier, Make, and n8n connect your apps and eliminate repetitive manual work.",
      xp: 22,
      kind: "quiz",
      content: `# Automation Platforms

An **automation platform** (also called iPaaS — integration Platform as a Service)
connects software tools and triggers actions between them without writing code.
The core concept is always the same:

**Trigger → Action(s)**

Something happens in App A → something happens in App B (and C and D).

Examples:
- New row in Airtable → send a Slack message + create a Notion page
- Form submission → add to a mailing list + notify a Slack channel + create a task in Asana
- Every Monday at 9am → pull data from a spreadsheet → send a summary email

## The major platforms

### Zapier
The most popular, widest app library (7,000+ integrations). Very beginner-friendly
visual interface. "Zaps" are the workflows. Most expensive at scale; limited free tier.

### Make (formerly Integromat)
Visual flow editor where you see data moving between modules — great for complex
multi-branch logic and transforming data mid-flow. More powerful than Zapier for
advanced scenarios; steeper learning curve; better pricing at volume.

### n8n
Open-source, self-hostable, and free to self-deploy. Supports code nodes (JavaScript
or Python) for anything the visual tools can't express. Used by technical teams that
want control and privacy. Cloud version also available.

## Choosing

- **Just starting out, need something that works today** → Zapier
- **Complex multi-step logic, better pricing** → Make
- **Self-hosted, privacy-sensitive, code needed** → n8n`,
      questions: [
        {
          prompt: "What is the core pattern all automation platforms share?",
          options: [
            "A drag-and-drop website builder",
            "Trigger → Action: something happens in one app, causing something to happen in others",
            "A visual SQL query editor",
          ],
          answer: 1,
          explanation:
            "Every automation platform — Zapier, Make, n8n — is built on the same trigger-then-action model. An event in one app kicks off one or more actions in other apps.",
        },
        {
          prompt: "A marketing team wants to connect their form tool, CRM, and Slack with minimal technical investment. Which platform is the most appropriate starting point?",
          options: [
            "n8n self-hosted",
            "Zapier",
            "Make",
          ],
          answer: 1,
          explanation:
            "Zapier has the widest app library, the most beginner-friendly interface, and the lowest barrier to a working automation. It's the natural first choice for non-technical teams.",
        },
        {
          prompt: "n8n's main advantage over Zapier and Make is:",
          options: [
            "It has more pre-built integrations than either competitor",
            "It is open-source, self-hostable, and supports code nodes for custom logic",
            "It is the cheapest SaaS option at any volume",
          ],
          answer: 1,
          explanation:
            "n8n's key differentiators are self-hosting (data stays on your infrastructure), open-source licensing, and code nodes that let you drop into JavaScript or Python when visual tools aren't enough.",
        },
      ],
    },
    {
      slug: "internal-tools-and-portals",
      title: "Internal Tools & Client Portals",
      blurb: "Retool, AppSmith, and Glide turn databases into usable dashboards in hours.",
      xp: 22,
      kind: "quiz",
      content: `# Internal Tools & Client Portals

Almost every team has a spreadsheet that has grown into a monster: color-coded tabs,
manual copy-paste between tabs, everyone editing at the same time. **Internal tool
builders** replace these with proper UIs without requiring a full engineering project.

## What internal tools do

- **Dashboards** — pull data from a database or API and display it in charts/tables
- **Admin panels** — let staff view, edit, or approve records safely (with access control)
- **Client portals** — give external users a view into relevant data (their orders, invoices, projects)
- **Operations forms** — structured input that writes directly to a database

## The major platforms

### Retool
The established leader for internal tools. Connects to virtually any database
(Postgres, MySQL, MongoDB, REST APIs, GraphQL). Build by dragging components
(table, form, chart) and binding them to queries. Low-code: JavaScript expressions
can live inside any property. Enterprise pricing; generous free tier for small teams.

### AppSmith
Open-source Retool alternative. Self-hostable or cloud. Slightly steeper learning
curve; strong for teams that want data sovereignty.

### Glide
Takes a Google Sheet or Airtable and turns it into a polished mobile-first app in
minutes. Less powerful than Retool but dramatically faster for simple portals and
field-worker apps. No SQL required.

## Access control matters
Internal tools often show sensitive data. All three platforms support role-based
access — make sure you configure who can see and edit what before sharing broadly.`,
      questions: [
        {
          prompt: "Which of these is the most fitting use case for an internal tool builder like Retool?",
          options: [
            "A public-facing e-commerce storefront",
            "An admin panel where customer support staff can view and update customer records",
            "A personal portfolio website",
          ],
          answer: 1,
          explanation:
            "Internal tool builders shine for admin panels, dashboards, and ops workflows where staff interact with structured data. Public storefronts and portfolios belong in site builders.",
        },
        {
          prompt: "What makes Glide the fastest option for a simple client portal, compared to Retool?",
          options: [
            "Glide connects to more databases than Retool",
            "Glide builds directly from a Google Sheet or Airtable with no SQL or query-writing needed",
            "Glide is always free with no limits",
          ],
          answer: 1,
          explanation:
            "Glide's speed advantage is its data source: if your data is already in Sheets or Airtable, Glide wraps it in a polished app in minutes. Retool requires connecting to a database and writing queries.",
        },
        {
          prompt: "Before sharing an internal tool with a team, what configuration step is most important for security?",
          options: [
            "Choosing a color scheme that matches the company brand",
            "Setting up role-based access control so staff only see and edit data they should",
            "Enabling Google Analytics on every page",
          ],
          answer: 1,
          explanation:
            "Internal tools often display sensitive records. Role-based access — controlling who can view vs. edit vs. delete — is the critical security step before wide distribution.",
        },
      ],
    },
    {
      slug: "ai-powered-no-code",
      title: "AI-Powered No-Code",
      blurb: "Copilots, AI builders, and agents are reshaping what 'no-code' means in 2026.",
      xp: 23,
      kind: "quiz",
      content: `# AI-Powered No-Code

The no-code landscape shifted significantly when AI was embedded directly into
builders. As of 2026, almost every major platform has an AI layer — but they work
in meaningfully different ways.

## What AI adds to no-code platforms

### AI copilots inside existing tools
Most major platforms (Webflow, Airtable, Bubble, Retool, Zapier) now have
in-editor AI assistants. You describe what you want in plain language and the
copilot generates a workflow, formula, component, or query. You review and confirm.
This dramatically reduces the time to learn each platform's specific syntax.

### AI-first app generators
A newer category: you describe an app in a prompt and the platform generates a
working first version — schema, views, and basic logic included. Examples include
**Lovable**, **Bolt.new**, and **v0** (by Vercel). Output is editable code or a
live no-code project. Useful for rapid prototyping; production readiness varies.

### AI workflow steps
Automation platforms now include native AI action steps. A Zapier or Make workflow
can call an LLM mid-flow to classify, summarize, extract, or generate content
from data passing through the automation. No API setup required.

## Realistic expectations

- **AI generators are great for scaffolding**, not finished products. Expect to
  spend time cleaning up what they produce.
- **Copilots reduce the learning curve** but don't replace understanding the
  platform — you still need to know what's possible to ask for it.
- **AI steps in automations are genuinely production-ready** — classify a support
  ticket, extract a date from an email, summarize a document — these work well today.`,
      questions: [
        {
          prompt: "What does an 'AI copilot' inside a no-code platform like Airtable or Retool typically do?",
          options: [
            "It fully builds and deploys the final application autonomously",
            "It generates formulas, queries, or workflow steps from a plain-language description that you then review",
            "It replaces all visual drag-and-drop with a command-line interface",
          ],
          answer: 1,
          explanation:
            "AI copilots are assistants inside the existing editor. You describe what you want; they generate a starting point you review and refine. They accelerate work but don't remove you from the loop.",
        },
        {
          prompt: "An AI-first app generator like Lovable or Bolt.new is best used for:",
          options: [
            "Replacing professional engineering for a production-critical application from day one",
            "Rapid prototyping and scaffolding — getting a working first version quickly before refining it",
            "Self-hosting a database with full SQL access",
          ],
          answer: 1,
          explanation:
            "AI generators are excellent at collapsing the time from idea to first working version. They are not yet reliable enough to ship production applications without human review and cleanup.",
        },
        {
          prompt: "Which AI-in-no-code use case is most reliable and production-ready today?",
          options: [
            "Using an AI to fully design, build, and deploy a SaaS product from a single prompt",
            "Adding an AI action step to an automation that classifies support tickets or extracts data from emails",
            "Having AI write all your database schema and business logic without review",
          ],
          answer: 1,
          explanation:
            "AI steps embedded in automation workflows — classifying, summarizing, extracting structured data — are well-tested, low-risk, and widely deployed in production. Fully autonomous app building is still early and requires significant human oversight.",
        },
      ],
    },
    {
      slug: "no-code-capstone",
      title: "Capstone: Choosing the Right Tool",
      blurb: "Apply everything: match real scenarios to the right platform category.",
      xp: 25,
      kind: "quiz",
      content: `# Capstone: Choosing the Right Tool

The most valuable skill in the no-code world isn't mastering any single platform —
it's knowing **which category of tool** to reach for first. The wrong choice costs
days or weeks of rebuilding.

## A decision framework

**Step 1 — Who uses it?**
- Internal team only → internal tool builder or database hybrid
- External public → site/app builder or web app builder

**Step 2 — What's the core action?**
- Browse content / read marketing → site builder (Webflow, Framer)
- Create accounts, do things, save data → web app builder (Bubble)
- View and edit structured records → internal tool (Retool) or DB hybrid (Airtable)
- Connect two apps and trigger actions → automation platform (Zapier, Make, n8n)

**Step 3 — How complex is the logic?**
- Simple (mostly display, one-step triggers) → no-code tools
- Moderate (branching logic, data transforms) → Make, Bubble, Retool
- High (custom algorithms, novel integrations) → low-code tools with code nodes, or hand-written code

**Step 4 — What are the data and privacy constraints?**
- Sensitive/regulated data or data-sovereignty requirement → self-hosted (n8n, NocoDB, AppSmith)
- Standard business data → any SaaS tool fits

The framework does not give a perfect answer every time, but it eliminates most
wrong answers fast — which is all you need to start evaluating the shortlist.`,
      questions: [
        {
          prompt: "A nonprofit wants to give volunteers a simple mobile app to log their hours. The data already lives in a Google Sheet. Speed of deployment is the top priority. Best fit?",
          options: [
            "Bubble",
            "Glide",
            "n8n",
          ],
          answer: 1,
          explanation:
            "Glide turns an existing Google Sheet into a polished mobile-first app in minutes — exactly what this scenario needs. Bubble would require building a whole data layer from scratch; n8n is an automation tool, not an app builder.",
        },
        {
          prompt: "A legal firm needs to automate sending a contract summary email each time a new row is added to their case-tracking Airtable. The email must include a one-paragraph AI-generated summary of the case notes field. Best approach?",
          options: [
            "Build a custom app in Bubble with its own email system",
            "A Make or Zapier automation that triggers on the new Airtable row, passes the case notes to an AI step, and sends the result via email",
            "Use Webflow's CMS automation",
          ],
          answer: 1,
          explanation:
            "This is a textbook automation + AI step pattern: Airtable trigger → AI summarization action → email action. Make or Zapier handle this natively without custom code or a separate app platform.",
        },
        {
          prompt: "A healthcare startup handles patient data and needs an internal admin panel. Their legal team requires that no patient data leave their own infrastructure. Which tool category is most appropriate?",
          options: [
            "Zapier cloud automations",
            "A self-hosted internal tool builder such as AppSmith or a self-hosted n8n instance",
            "Airtable or Notion on their standard cloud plans",
          ],
          answer: 1,
          explanation:
            "Data-sovereignty requirements mean the tool must run on the company's own infrastructure. Self-hosted options (AppSmith, n8n, NocoDB) are the only category that satisfies this constraint. Cloud SaaS tools send data to third-party servers.",
        },
      ],
      explanation:
        "The right no-code tool is the one that matches your user, your data, your logic complexity, and your privacy constraints — not the one with the best marketing. Work through the four-step framework before you start building.",
    },
  ],
};
