import type { Module } from "./types";

// AI for Data Analysis (No Code) — practical, concept-first introduction to
// using AI tools for data work without writing a single line of code. Covers
// workflow, prompt design, data interpretation, common failure modes, and how
// AI fits alongside spreadsheets, BI tools, and human judgment.
export const aiDataAnalysis: Module = {
  slug: "ai-data-analysis",
  title: "AI for Data Analysis (No Code)",
  description:
    "Learn to turn raw data into insight using AI — no coding required. You'll master prompt strategies for analysis tasks, understand how AI interprets charts and tables, spot its statistical blind spots, and build a repeatable workflow for data-driven decisions.",
  emoji: "📈",
  gradient: "from-emerald-500/20 to-teal-500/10",
  tagline:
    "From spreadsheet headaches to clear insights — use AI to analyze data, spot trends, and make better decisions without writing a line of code.",
  keywords: [
    "AI for data analysis",
    "no code data analysis",
    "ChatGPT data analysis",
    "Claude for spreadsheets",
    "AI business intelligence",
    "data analysis without coding",
    "AI for Excel",
    "AI pivot tables",
    "prompt engineering for data",
  ],
  lessons: [
    {
      slug: "what-ai-can-do-with-data",
      title: "What AI Can (and Can't) Do with Data",
      blurb:
        "Set the right expectations: AI is a powerful analyst's sidekick, not a magic oracle.",
      xp: 20,
      kind: "quiz",
      content: `# What AI Can (and Can't) Do with Data

Before you start sending spreadsheets to an AI, it's worth understanding exactly
what you're working with — and where the limits are.

## What AI is good at

- **Summarizing and describing datasets** — given a table, it can tell you what
  the columns mean, what range the values fall in, and what patterns are visible.
- **Writing formulas and SQL queries in plain English** — "give me a formula that
  sums sales where the region is 'North'" is enough.
- **Explaining what a chart or result *means*** — interpreting a trend, flagging
  an anomaly, suggesting a hypothesis.
- **Structuring your analysis** — recommending which questions to ask first, which
  comparisons matter, and how to slice the data.
- **Cleaning tasks in prose** — "here are 50 rows of messy addresses; standardize
  them to City, State format" works surprisingly well on small datasets.

## Where it struggles

- **Very large datasets** — most AI chat tools can handle tens of thousands of
  rows when you paste text, but they are not a database. For millions of rows, use
  a real analytics tool and bring AI in for the reasoning layer.
- **Live or real-time data** — AI has no connection to your company's systems
  unless you build one. It works on what you paste.
- **Guaranteed arithmetic** — AI can make arithmetic mistakes, especially on
  multi-step calculations. Always sanity-check numeric outputs.
- **Causal claims from correlations** — AI will happily point out correlations; it
  takes human judgment (and sometimes a controlled experiment) to decide if a
  pattern is causal.

Think of AI as a **brilliant analytical collaborator** who has never seen your
data before and can't access anything you don't share. Your job is to give it
the right context and then verify its conclusions.`,
      questions: [
        {
          prompt:
            "You paste 200 rows of sales data and ask an AI to summarize the top trends. Which outcome is most realistic?",
          options: [
            "The AI will query your live CRM and return a verified report",
            "The AI will describe patterns visible in the pasted data and may suggest hypotheses — you still need to verify",
            "The AI will refuse because data analysis requires a coding environment",
          ],
          answer: 1,
          explanation:
            "AI works on what you give it in the conversation. It can describe and reason about pasted data well, but it has no live data connection and its numeric outputs should be sanity-checked.",
        },
        {
          prompt:
            "An AI finds a strong positive correlation between two columns in your dataset. What does that mean?",
          options: [
            "One column is definitely causing changes in the other",
            "The two columns move together in your data — causation still requires separate investigation",
            "The data is wrong and should be discarded",
          ],
          answer: 1,
          explanation:
            "Correlation is not causation. AI is good at spotting patterns; determining whether a relationship is causal requires domain knowledge, study design, or experimentation.",
        },
        {
          prompt:
            "Which task is AI best suited for in a data workflow?",
          options: [
            "Replacing a production database that handles millions of real-time transactions",
            "Acting as an analytical collaborator — structuring your approach, writing formulas, and interpreting results",
            "Guaranteeing arithmetic correctness with no human review",
          ],
          answer: 1,
          explanation:
            "AI shines as a reasoning layer: framing questions, translating plain English into formulas, and interpreting what results mean. It complements real data tools rather than replacing them, and numeric outputs should always be spot-checked.",
        },
      ],
      explanation:
        "AI is a powerful analytical sidekick, not a database. Bring it the right data, give it context, and verify its numbers.",
    },
    {
      slug: "sharing-data-with-ai",
      title: "How to Share Data with AI Effectively",
      blurb:
        "Paste, describe, or upload — the format you use shapes the quality of the analysis.",
      xp: 20,
      kind: "quiz",
      content: `# How to Share Data with AI Effectively

The quality of an AI's analysis depends almost entirely on how clearly you
hand it the data. Here are the three main methods and when to use each.

## 1. Paste as plain text or CSV

Copy rows directly from a spreadsheet and paste them into the chat. This is the
fastest path for small-to-medium tables (a few hundred to a few thousand rows).
Make sure to include the **header row** — column names are the AI's map.

**Tip:** Add a sentence before the data explaining what it is:
> *"Here is a CSV of customer orders from Q1 2026. Each row is one order."*

## 2. Upload a file

Many AI tools (Claude, ChatGPT, Gemini) accept CSV, Excel (.xlsx), and even PDF
uploads. Uploading preserves formatting and lets the AI inspect structure before
you ask questions. Still add a one-line context note.

## 3. Describe the data schema

When data is too large or sensitive to paste, describe it:
> *"I have a table called \`orders\` with columns: order_id (int), customer_id
> (int), total_usd (decimal), region (text), created_at (date). It has 4 million
> rows."*

Then ask the AI to write a SQL or spreadsheet formula you'll run yourself. This
keeps sensitive data off third-party servers and handles any scale.

## Privacy first

Before pasting or uploading, **redact** personally identifiable information
(customer names, emails, IDs). Replace real values with [NAME], [EMAIL], or
synthetic stand-ins. The AI can analyze structure and patterns without needing
real people's data.

## Context is everything

Always tell the AI:
- What the dataset **is** (what it tracks, the time range, the source)
- What you're **trying to learn** from it
- Any **known quirks** (e.g., "the 'refund' column uses −1 instead of a negative number")`,
      questions: [
        {
          prompt:
            "You have a 300-row CSV of website traffic data. What's the most effective way to start an AI analysis?",
          options: [
            "Paste the raw data with no explanation and see what the AI notices",
            "Add a sentence explaining what the dataset is and what you want to learn, then paste the CSV",
            "Only describe the data in prose — never paste actual numbers",
          ],
          answer: 1,
          explanation:
            "Context dramatically improves AI analysis. Telling the AI what the data represents and what question you're trying to answer focuses its reasoning and saves you correction rounds.",
        },
        {
          prompt:
            "Your dataset contains real customer email addresses but you need AI help analyzing purchase patterns. Best approach?",
          options: [
            "Paste everything — AI providers promise full privacy",
            "Redact the emails (replace with [EMAIL] or fake values) before pasting; the AI doesn't need real addresses to analyze patterns",
            "Skip AI analysis entirely if any PII exists in the dataset",
          ],
          answer: 1,
          explanation:
            "Redacting PII before sharing is the professional standard. The AI needs column structure and values to analyze patterns — real email addresses add privacy risk without adding analytical value.",
        },
        {
          prompt:
            "Your production database has 10 million rows and you need AI to help write a query. What's the right approach?",
          options: [
            "Paste all 10 million rows — AI can handle any size",
            "Describe the table schema in prose and ask the AI to write the SQL you'll run yourself",
            "AI can't help with large datasets at all",
          ],
          answer: 1,
          explanation:
            "For large or sensitive data, describe the schema and let AI write the query or formula. You run it against the real data. This scales to any size and keeps sensitive data off third-party systems.",
        },
      ],
      explanation:
        "Context note + clean headers + redacted PII = the formula for effective data sharing with AI. When data is large, describe the schema and let AI write the query.",
    },
    {
      slug: "prompting-for-analysis",
      title: "Prompting AI for Data Analysis",
      blurb:
        "Vague questions get vague answers. Learn the prompt patterns that produce sharp, actionable analysis.",
      xp: 25,
      kind: "quiz",
      content: `# Prompting AI for Data Analysis

A data analysis prompt is a question with a job to do. The more precisely you
state the job, the better the output. Here are the key patterns.

## State the analysis goal, not just the data

Bad: *"Analyze this data."*
Good: *"Identify the top three product categories by revenue and explain whether
their share has grown or shrunk over the past four quarters."*

The goal constrains the output. Without one, the AI produces generic summaries.

## Ask for a specific output format

- **"Summarize in 3 bullet points"** — quick executive brief
- **"Give me a table with columns: Category, Q1, Q2, Q3, Q4, Trend"** — structured
  for easy export
- **"Write the Excel formula I need to..."** — directly actionable
- **"List the anomalies and explain each one"** — exception-driven analysis

## Use the role frame

Prefacing with a role tightens the reasoning:
> *"You are an analyst reviewing monthly sales data for a consumer goods company.
> Identify any months that deviate more than 15% from the trailing 3-month
> average and suggest possible causes."*

This isn't magic — it just tells the AI the level of rigor and domain you expect.

## Ask follow-up questions

Data analysis is iterative. After the first response:
- *"Drill down on the November spike — what could explain it?"*
- *"Restate that for a non-technical executive."*
- *"Now compare this to the industry benchmark I'm about to give you."*

## Request uncertainty flags

Ask the AI to tell you where it's less confident:
> *"Flag any conclusions where you're reasoning from incomplete data or making an
> assumption I should verify."*

This turns a confident-sounding answer into a trustworthy one.`,
      questions: [
        {
          prompt:
            "Which prompt will produce the most useful analysis of a quarterly sales dataset?",
          options: [
            "'Analyze this data.'",
            "'Identify the top three product categories by revenue and describe whether their share grew or shrank over the four quarters.'",
            "'Tell me something interesting.'",
          ],
          answer: 1,
          explanation:
            "A prompt with a specific goal, metric (revenue), and time comparison gives the AI a concrete job. Generic prompts produce generic summaries.",
        },
        {
          prompt:
            "After getting an initial analysis, you want to understand a specific anomaly more deeply. What's the right move?",
          options: [
            "Start a new chat from scratch each time you want more detail",
            "Ask a follow-up in the same chat: 'Drill down on that spike — what could explain it?'",
            "Accept the first answer — AI can't do multi-step analysis",
          ],
          answer: 1,
          explanation:
            "Data analysis is inherently iterative. The AI remembers everything in the conversation, so follow-up questions progressively deepen the analysis without losing context.",
        },
        {
          prompt:
            "You want to know where the AI is guessing versus where it's confident. What should you add to your prompt?",
          options: [
            "Nothing — AI is always equally confident in everything it says",
            "'Flag any conclusions where you're reasoning from incomplete data or making an assumption I should verify.'",
            "Ask it to remove all uncertain conclusions",
          ],
          answer: 1,
          explanation:
            "Explicitly asking for uncertainty flags surfaces the assumptions baked into the analysis. This makes the output more trustworthy and tells you exactly where to focus your verification effort.",
        },
      ],
      explanation:
        "Specific goal + output format + uncertainty flag = the core of a strong analysis prompt. Iterate from there.",
    },
    {
      slug: "ai-and-spreadsheets",
      title: "AI as Your Spreadsheet Superpower",
      blurb:
        "Write complex formulas, untangle pivot tables, and automate repetitive cleanup — all in plain English.",
      xp: 20,
      kind: "quiz",
      content: `# AI as Your Spreadsheet Superpower

Spreadsheets are where most no-code data work happens, and AI has made them
dramatically more accessible. You no longer need to memorize formula syntax —
you just describe what you want.

## Writing formulas

Just explain the goal:
> *"I have sales data in column B and region names in column A. Write an Excel
> formula that sums all sales where the region is 'West'."*

The AI will return \`=SUMIF(A:A,"West",B:B)\` — and explain why it works. You
can ask for Google Sheets vs. Excel, and it will adjust syntax accordingly.

For complex nested formulas (INDEX-MATCH, XLOOKUP, array formulas), describe
the lookup in plain language and let AI handle the nesting.

## Pivot table guidance

Pivot tables intimidate many people. With AI, you can describe what you want:
> *"I want a pivot table that shows total revenue by region and quarter, sorted
> by region A–Z. Walk me through setting it up in Excel."*

The AI gives step-by-step instructions, field placements, and even explains
what each setting does.

## Data cleaning

> *"Here are 40 messy address entries. Clean them to 'City, State' format and
> flag any you're uncertain about."*

Paste the raw data and AI will produce a cleaned version — fast. Always spot-check
a sample before trusting a full cleanup.

## Conditional formatting and charts

> *"Tell me how to set up conditional formatting in Google Sheets that highlights
> any cell in column C that is more than 20% above the column average."*

AI walks you through the menu steps. This works for chart creation too — describe
what you want to visualize and it will suggest the chart type and guide setup.

## Know the limits

- AI returns a formula; **you must paste it in and verify** the output on your
  real data. Formulas that look correct can behave unexpectedly with edge cases
  (blank cells, text where numbers are expected).
- For massive automation (thousands of formula operations, macros), you're moving
  into scripting territory. AI can write those scripts, but that's a step beyond
  "no code."`,
      questions: [
        {
          prompt:
            "You need to sum all values in column C where column A says 'Approved'. How should you use AI?",
          options: [
            "Ask it: 'Write an Excel SUMIF formula that sums column C where column A equals Approved'",
            "AI can't help with spreadsheet formulas — that requires a data scientist",
            "Type random formulas until one works, then ask AI to explain it",
          ],
          answer: 0,
          explanation:
            "Plain-English formula requests are one of AI's strongest spreadsheet skills. Describe the goal and columns, and it returns the correct formula with an explanation.",
        },
        {
          prompt:
            "AI gives you a formula for your spreadsheet. What should you do before using it on your full dataset?",
          options: [
            "Trust it completely — AI-generated formulas never have edge case issues",
            "Paste it into a test range and verify the output against a few known values before applying it broadly",
            "The formula only works if you paid for a premium AI subscription",
          ],
          answer: 1,
          explanation:
            "AI-generated formulas are an excellent starting point, but they can behave unexpectedly with blank cells, mixed data types, or edge cases. Spot-checking on a small sample before full rollout is standard practice.",
        },
        {
          prompt:
            "You're confused about how to build a pivot table showing revenue by region per quarter. The best AI prompt is:",
          options: [
            "'pivot table'",
            "'I want a pivot table showing total revenue by region and quarter in Excel. Walk me through setting it up step by step, including which fields go where.'",
            "'Fix my spreadsheet'",
          ],
          answer: 1,
          explanation:
            "Specificity unlocks step-by-step guidance. Describing the desired output and asking for a walkthrough gets you field placement instructions, not just a vague description.",
        },
      ],
      explanation:
        "Plain-English formula requests, pivot table walkthroughs, and data cleaning are spreadsheet superpowers AI delivers out of the box. Verify the output — then ship it.",
    },
    {
      slug: "reading-charts-and-interpreting-results",
      title: "Using AI to Interpret Charts and Results",
      blurb:
        "Upload a chart or paste a result set and let AI explain what it actually means for your decision.",
      xp: 22,
      kind: "quiz",
      content: `# Using AI to Interpret Charts and Results

Getting data into a chart is the easy part. Knowing what the chart is *telling you*
— and what decisions it supports — is where most people get stuck. This is where
AI is genuinely useful.

## Describing a chart you've already made

If your AI tool accepts image uploads, upload the chart and ask:
> *"What trend does this line chart show? Are there any anomalies or periods of
> unusual growth or decline?"*

If it doesn't accept images, describe the chart in prose:
> *"I have a bar chart showing monthly website visitors from Jan to Dec 2025.
> The bars are roughly flat through August, then spike sharply in September and
> October before dropping back to baseline in November. What could explain this?"*

AI will offer a list of plausible explanations and suggest which data you'd need
to confirm each one.

## Interpreting a result table

Paste a result table (from SQL, Excel, or a BI tool) and ask:
> *"Here is a table of customer churn rates by plan tier over 6 months. Which tier
> has the most concerning trend, and what follow-up questions would you investigate
> first?"*

This is the step most analysts skip — the AI helps you move from *data* to
*question* to *decision*.

## What AI interpretation is and isn't

- It is: **hypothesis generation** — here are plausible explanations worth testing.
- It is NOT: **causal proof** — you still need domain knowledge and potentially
  controlled data to confirm causation.
- It is: **communication help** — "restate this finding for a non-technical
  executive" is a great follow-up.
- It is NOT: **a substitute for knowing your own business context**. AI doesn't
  know that your September spike was a product launch unless you tell it.

Always give the AI **business context**: what happened in the period, what levers
you control, what "good" looks like in your domain. The richer the context, the
sharper the interpretation.`,
      questions: [
        {
          prompt:
            "You have a bar chart showing a sharp spike in sales in one month. How should you ask AI to help?",
          options: [
            "Upload or describe the chart and ask: 'What could explain this spike, and what data would confirm each hypothesis?'",
            "AI can't help with visual chart interpretation — only raw numbers",
            "Just accept that the spike happened and don't investigate further",
          ],
          answer: 0,
          explanation:
            "AI excels at hypothesis generation from chart descriptions. Asking for both explanations and the data needed to confirm them turns curiosity into an actionable investigation plan.",
        },
        {
          prompt:
            "AI interprets your chart and identifies a pattern. What does that interpretation represent?",
          options: [
            "A proven causal relationship requiring no further investigation",
            "A set of plausible hypotheses worth testing — causation still needs domain knowledge and evidence",
            "A guaranteed forecast of future performance",
          ],
          answer: 1,
          explanation:
            "AI interpretation is hypothesis generation, not causal proof. The pattern is real; why it exists requires your domain context and often additional data or experiment.",
        },
        {
          prompt:
            "You want AI to explain a churn rate table to your CEO. What follow-up should you add after the initial analysis?",
          options: [
            "'Restate this finding for a non-technical executive in three sentences.'",
            "Nothing — the technical version is fine for everyone",
            "'Delete all the numbers and just say something nice.'",
          ],
          answer: 0,
          explanation:
            "Reframing analysis for a non-technical audience is one of AI's strongest communication skills. A single follow-up transforms a data-heavy table into an executive-ready narrative.",
        },
      ],
      explanation:
        "Describe the chart, give business context, ask for hypotheses — then use domain knowledge to decide which ones to test. AI moves you from data to decision, not from data to certainty.",
    },
    {
      slug: "ai-analysis-failure-modes",
      title: "AI Analysis Failure Modes (and How to Catch Them)",
      blurb:
        "Confident, plausible, and wrong: learn the patterns that trip up AI analysis so you can verify before you act.",
      xp: 25,
      kind: "quiz",
      content: `# AI Analysis Failure Modes (and How to Catch Them)

AI analysis can be wrong in ways that don't look wrong. The output is fluent,
logical-sounding, and occasionally completely mistaken. Here are the failure modes
that matter most in data work — and how to catch them.

## 1. Arithmetic drift

AI is not a calculator. On simple sums it's usually fine; on multi-step percentage
calculations, compound growth, or comparisons across many numbers it can quietly
produce wrong figures. It will state them with the same confidence as correct ones.

**Catch it:** Spot-check 3–5 specific numbers against your source. Never trust a
calculation that "looks about right."

## 2. Hallucinated statistics

If you ask a general question like "what's the typical churn rate for SaaS
companies?" without providing data, the AI may state a specific-sounding figure
that doesn't match any real benchmark — or that it invented entirely.

**Catch it:** For external benchmarks, always verify against a named source
(industry report, published study). If you provided the data, the AI should
cite the column and row — if it can't, it may be generating rather than reading.

## 3. Spurious pattern recognition

AI is very good at finding patterns. It is sometimes too good — it finds patterns
that are noise, especially in small samples, and can spin a plausible story around
them.

**Catch it:** Ask "how many data points support this conclusion?" and "is this
pattern statistically significant or could it be noise in a small sample?" If the
AI can't answer, that's a flag.

## 4. Context bleed

In a long conversation, the AI may mix context from earlier in the chat — applying
assumptions from a previous dataset to your current one.

**Catch it:** For a new analysis, start a new chat. At the start of complex
analyses, explicitly state the dataset boundaries.

## 5. Confident confabulation

AI sometimes fills gaps in the data with plausible-sounding inferences instead of
saying "I don't have enough information." It can describe trends in columns you
never provided.

**Catch it:** Ask "are you inferring this from the data I gave you, or are you
making an assumption?" A good model will distinguish — a weak answer is a flag.

## The golden rule

**Treat every AI output as a draft, not a deliverable.** The faster you build the
habit of spot-checking numbers, asking "where does this come from?", and testing
conclusions against your own knowledge, the more valuable AI becomes as an
analytical tool.`,
      questions: [
        {
          prompt:
            "AI gives you a specific-sounding industry benchmark ('the average churn rate for SaaS is 6.2%') but you didn't provide that data. What should you do?",
          options: [
            "Use it — AI has up-to-date access to all published research",
            "Verify it against a named source before quoting it; the AI may have confabulated the figure",
            "Round it to 6% and move on",
          ],
          answer: 1,
          explanation:
            "AI can produce convincing-sounding statistics that don't correspond to any real study. External benchmarks must be verified against a named, authoritative source.",
        },
        {
          prompt:
            "After a long conversation analyzing one dataset, you paste a second, unrelated dataset. What risk should you be aware of?",
          options: [
            "The AI will refuse to analyze two datasets in one session",
            "Context bleed — the AI may apply assumptions from the first dataset to the second",
            "No risk — AI always treats each message independently",
          ],
          answer: 1,
          explanation:
            "Long conversations carry context forward. Starting a new chat for a new dataset is the cleanest way to avoid the AI mixing up assumptions between analyses.",
        },
        {
          prompt:
            "AI identifies a strong pattern in a dataset of 12 rows. What's the right response?",
          options: [
            "Act on it immediately — AI pattern recognition is always reliable",
            "Ask whether the pattern is robust given the small sample size before drawing conclusions",
            "Discard the analysis — AI can't find real patterns in any dataset",
          ],
          answer: 1,
          explanation:
            "Small samples are prone to spurious patterns. Asking the AI to address statistical robustness — and applying your own judgment about sample size — prevents acting on noise.",
        },
      ],
      explanation:
        "Arithmetic drift, hallucinated benchmarks, and spurious patterns are the key failure modes. Spot-check numbers, verify external claims, and always ask 'where does this come from?'",
    },
    {
      slug: "building-an-ai-data-workflow",
      title: "Building Your AI Data Workflow (Capstone)",
      blurb:
        "Pull it all together: a repeatable, trustworthy process for AI-assisted analysis from question to decision.",
      xp: 25,
      kind: "quiz",
      content: `# Building Your AI Data Workflow (Capstone)

You've covered the concepts. Now let's assemble them into a repeatable workflow
you can apply to any data question — with or without a data team behind you.

## The 5-step AI data workflow

### 1. Define the question first
Before touching any data or AI, write one sentence:
> *"I want to know [X] so that I can decide [Y]."*

This keeps you from drowning in analysis that doesn't connect to a decision.

### 2. Prepare and contextualize your data
- Redact PII
- Include the header row
- Add a context paragraph (what the data is, the time range, any known quirks)
- Choose your sharing method: paste, upload, or schema description

### 3. Run the analysis in layers
Start broad, then drill:
1. *"Describe what this dataset contains and flag anything unusual."* (orientation)
2. *"Answer [your specific question] using this data."* (targeted analysis)
3. *"Drill down on [the most surprising finding]."* (depth)
4. *"Flag any conclusions you're uncertain about."* (calibration)

### 4. Verify before you act
- Spot-check 3–5 specific numbers against the source
- Test any formula on a small range before applying it broadly
- For external benchmarks, confirm the source exists and says what AI claims

### 5. Communicate the insight
- *"Summarize the key finding in two sentences for a non-technical stakeholder."*
- *"Give me three bullet points I can use in a slide."*
- *"What's the one number that best captures this trend?"*

## How AI fits in a larger data stack

AI analysis doesn't replace BI dashboards, SQL databases, or data warehouses.
It fits in as a **reasoning and communication layer**:

| Layer | Tool |
|---|---|
| Store & query large data | SQL database, data warehouse |
| Visualize & monitor | BI tool (Tableau, Looker, Power BI) |
| Reason, interpret, communicate | AI assistant |
| Decide & act | Human |

As of 2026, many BI tools have begun embedding AI assistants natively — so the
boundary is blurring. The skills you've built in this course transfer directly:
good questions, clear context, and healthy skepticism work regardless of which
interface the AI lives in.

## The meta-skill

The most important thing isn't any single prompt or technique. It's the habit of
**asking better questions** — of your data, of the AI, and of yourself about what
decision you're actually trying to make. AI makes that habit cheaper to exercise.
Use it boldly.`,
      questions: [
        {
          prompt:
            "What is the most important thing to do BEFORE opening an AI tool to analyze data?",
          options: [
            "Choose the fanciest chart type for the eventual output",
            "Write a one-sentence question: 'I want to know [X] so I can decide [Y]'",
            "Convert all data to PDF format",
          ],
          answer: 1,
          explanation:
            "Defining the decision question first prevents the most common analysis trap: producing interesting insights that don't connect to any action. The question shapes everything that follows.",
        },
        {
          prompt:
            "In the recommended 5-step workflow, why is verification (step 4) listed before communication (step 5)?",
          options: [
            "Communication is optional and most analysts skip it",
            "You must confirm the analysis is trustworthy before you stake your reputation on presenting it",
            "AI automatically verifies its own outputs in step 3",
          ],
          answer: 1,
          explanation:
            "Presenting an unverified AI output as a conclusion is a professional risk. Spot-checking numbers and testing formulas before communicating results is what separates a reliable analyst from a lucky one.",
        },
        {
          prompt:
            "How does AI best fit into a data stack that already includes a SQL database and a BI tool?",
          options: [
            "It replaces both — you no longer need databases or dashboards",
            "It acts as a reasoning and communication layer: interpreting results, framing insights, and translating findings for stakeholders",
            "It can only be used if you have no other tools",
          ],
          answer: 1,
          explanation:
            "AI complements the data stack rather than replacing it. Storage and visualization tools do what they do best; AI adds the reasoning and communication layer that turns raw results into decisions.",
        },
      ],
      explanation:
        "Define the question, prepare the data, analyze in layers, verify before acting, communicate clearly. That workflow — plus healthy skepticism — is the whole course in five steps.",
    },
  ],
};
