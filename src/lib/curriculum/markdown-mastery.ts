import type { Module } from "./types";

// Markdown for Everyone — a practical, all-quiz module teaching Markdown from
// first principles to real-world power-user habits. No coding environment needed:
// Markdown is a writing format, and learning it is purely conceptual + applied.
export const markdownMastery: Module = {
  slug: "markdown-mastery",
  title: "Markdown for Everyone",
  description:
    "Markdown is the plain-text formatting language behind GitHub READMEs, documentation sites, note-taking apps, and AI chat inputs. Learn the full syntax — headings, emphasis, links, images, tables, code blocks — and the habits that make your writing cleaner and more portable across every tool that speaks Markdown.",
  emoji: "📝",
  gradient: "from-gray-500/20 to-slate-500/10",
  tagline:
    "Master the plain-text formatting language used in GitHub, Notion, Obsidian, and AI tools — write once, render everywhere.",
  keywords: [
    "learn markdown",
    "markdown tutorial",
    "markdown syntax",
    "markdown for beginners",
    "github markdown",
    "how to format text in markdown",
    "markdown cheat sheet",
    "readme markdown",
  ],
  lessons: [
    {
      slug: "what-is-markdown",
      title: "What Is Markdown?",
      blurb: "Plain text with a few punctuation tricks — and it renders beautifully everywhere.",
      xp: 20,
      kind: "quiz",
      content: `# What Is Markdown?

Markdown is a **lightweight markup language** created by John Gruber in 2004. The
core idea is simple: write plain text with a handful of punctuation conventions,
and any Markdown-aware tool will turn it into clean, formatted output.

A \`#\` at the start of a line becomes a heading. \`**bold**\` becomes **bold**. A
hyphen at the start of a line becomes a bullet. That's the whole game.

**Why does it matter in 2026?**

- **GitHub** renders Markdown in READMEs, issues, pull requests, and wikis.
- **Notion, Obsidian, Bear, Logseq** all use Markdown or a Markdown-compatible format.
- **AI chatbots** (Claude, ChatGPT, Gemini) both *accept* and *output* Markdown.
- **Documentation tools** like MkDocs, Docusaurus, and VitePress build entire sites
  from Markdown files.
- **Slack, Discord, and Linear** support Markdown-style shortcuts in messages.

Because it's plain text, Markdown files are:

- **Portable** — open them in any editor on any OS, forever.
- **Diffable** — version control shows exactly what changed, character by character.
- **Fast to write** — no toolbar clicking; your hands stay on the keyboard.

The tradeoff: Markdown has dialects. "CommonMark" is the standardized baseline.
"GitHub Flavored Markdown" (GFM) adds tables, task lists, and strikethrough on top.
Most tools you'll encounter use GFM or something close to it.`,
      questions: [
        {
          prompt: "What is Markdown, at its core?",
          options: [
            "A programming language for building websites",
            "A plain-text writing format that uses punctuation conventions to indicate formatting",
            "A proprietary feature exclusive to GitHub",
          ],
          answer: 1,
          explanation:
            "Markdown is just plain text with a small set of conventions (# for headings, ** for bold, etc.) that tools translate into formatted output. It's not code, not proprietary, and not tied to any single platform.",
        },
        {
          prompt: "Which of these is a real advantage of storing content as Markdown plain text?",
          options: [
            "It requires a special viewer to read at all",
            "Version control tools like Git can show exactly what changed, character by character",
            "It automatically syncs to the cloud without any app",
          ],
          answer: 1,
          explanation:
            "Because Markdown is plain text, Git diffs are human-readable line by line. Binary formats (Word docs, PDFs) produce unreadable diffs — a major reason technical writers and developers prefer Markdown.",
        },
        {
          prompt: "\"GitHub Flavored Markdown\" (GFM) differs from standard CommonMark by…",
          options: [
            "Removing support for headings and bold",
            "Adding features like tables, task lists, and strikethrough on top of the baseline",
            "Only working inside GitHub.com and nowhere else",
          ],
          answer: 1,
          explanation:
            "GFM extends CommonMark (the standardized Markdown spec) with practical extras. Most tools you use daily — GitHub, VS Code preview, many note apps — support at least GFM's table and task-list syntax.",
        },
      ],
      explanation:
        "Markdown is plain text plus punctuation conventions. Its portability and version-control friendliness are why it's the default writing format across most of the technical world.",
    },
    {
      slug: "headings-and-paragraphs",
      title: "Headings & Paragraphs",
      blurb: "Structure your document with six levels of headings and simple paragraph rules.",
      xp: 20,
      kind: "quiz",
      content: `# Headings & Paragraphs

## Headings

Markdown gives you six heading levels using \`#\` symbols:

\`\`\`
# H1 — Page title (use once per document)
## H2 — Major section
### H3 — Sub-section
#### H4 — Rarely needed in most docs
##### H5
###### H6
\`\`\`

The number of \`#\` characters sets the level. Always put a **space** between the
\`#\` and the text — some parsers require it, and all of them accept it.

**Heading best practices:**

- Use **H1 once**, at the very top, as the document title.
- Use **H2** for major sections; **H3** for sub-sections within those.
- Don't skip levels (H1 → H3 with no H2) — it confuses screen readers and outlines.
- Keep headings short and descriptive; they often appear in tables of contents.

## Paragraphs

A paragraph is simply one or more lines of text with a **blank line between them**.

\`\`\`
This is the first paragraph.

This is the second paragraph.
\`\`\`

A single line break inside a paragraph does *not* create a new paragraph — the two
lines flow together. To force a line break without a new paragraph, end the line
with **two spaces** (or use \`<br>\` in HTML-aware renderers). Most writers avoid the
two-space trick because trailing whitespace is invisible and frustrating to debug;
restructuring the sentence is usually cleaner.`,
      questions: [
        {
          prompt: "You want a top-level page title in Markdown. Which syntax is correct?",
          options: [
            "## My Title",
            "# My Title",
            "### My Title",
          ],
          answer: 1,
          explanation:
            "A single # produces an H1 — the highest-level heading. ## is H2, ### is H3. Use H1 once per document as the page title.",
        },
        {
          prompt: "How do you create a new paragraph in Markdown?",
          options: [
            "Press Enter once after a sentence",
            "Leave a blank line between blocks of text",
            "Use a <p> tag",
          ],
          answer: 1,
          explanation:
            "In Markdown a single line break is ignored — the text flows together. A blank line (two presses of Enter) is what separates one paragraph from the next.",
        },
        {
          prompt: "A document jumps from an H1 heading directly to an H3 with no H2 in between. What's the problem?",
          options: [
            "The Markdown will fail to parse and show an error",
            "It breaks the logical hierarchy, which hurts accessibility (screen readers) and auto-generated outlines",
            "Nothing — heading levels are purely cosmetic and the order doesn't matter",
          ],
          answer: 1,
          explanation:
            "Skipping heading levels (H1 → H3) is a real accessibility issue. Screen readers and document outline tools use heading levels to let users navigate — a skipped level breaks that structure. It won't crash the renderer, but it's poor practice.",
        },
      ],
      explanation:
        "One # = H1 (use once). Blank lines separate paragraphs. Don't skip heading levels — structure matters for accessibility and navigability.",
    },
    {
      slug: "emphasis-and-inline-formatting",
      title: "Emphasis & Inline Formatting",
      blurb: "Bold, italic, code, strikethrough — and when to actually use each one.",
      xp: 20,
      kind: "quiz",
      content: `# Emphasis & Inline Formatting

These are the formatting marks you'll reach for inside a sentence.

## Bold and Italic

| Syntax | Result |
|--------|--------|
| \`**bold**\` or \`__bold__\` | **bold** |
| \`*italic*\` or \`_italic_\` | *italic* |
| \`***bold and italic***\` | ***bold and italic*** |

**Convention in the wild:** Most style guides (and most linters) prefer
\`**\` for bold and \`*\` for italic. The underscore variants (\`__\`, \`_\`) can
cause ambiguity inside words like \`snake_case_names\`, so asterisks are safer.

## Inline Code

Wrap text in backticks to mark it as code: \`const x = 1\` renders as \`const x = 1\`.

Use inline code for:
- Variable names (\`userId\`), file names (\`README.md\`), or commands (\`npm install\`)
- Short snippets that shouldn't be styled as prose

## Strikethrough

\`~~old text~~\` renders as ~~old text~~. This is a GFM extension (not in CommonMark),
supported by GitHub, Notion, and most modern tools.

## When to use what

- **Bold**: truly critical information, UI labels (click **Save**), warnings.
- *Italic*: introducing a new term, book titles, light emphasis.
- \`Code\`: anything a user would type literally or that's a technical identifier.
- ~~Strikethrough~~: showing a correction, a removed feature, or something deprecated.

Over-formatting is a real problem. A page where *everything* is **bold** or *italic*
means nothing stands out. Save emphasis for what genuinely matters.`,
      questions: [
        {
          prompt: "Why do most Markdown style guides prefer `**` over `__` for bold text?",
          options: [
            "`**` is faster to type on most keyboards",
            "Underscores can be ambiguous inside words like `snake_case_names`, causing unexpected rendering",
            "`__bold__` is deprecated and no longer supported",
          ],
          answer: 1,
          explanation:
            "Most parsers won't apply bold to the underscores inside `some_function_name`, but the ambiguity varies across tools. Asterisks (`**`) are unambiguous and are the near-universal convention.",
        },
        {
          prompt: "You're writing a tutorial and want to mark a file name (`package.json`) as technical, not prose. Which formatting is most appropriate?",
          options: [
            "**package.json** (bold)",
            "`package.json` (inline code)",
            "*package.json* (italic)",
          ],
          answer: 1,
          explanation:
            "Inline code (backticks) is the right choice for anything a reader might type or that is a literal technical identifier — file names, commands, variable names, config keys. Bold and italic are for prose-level emphasis.",
        },
        {
          prompt: "Strikethrough (`~~text~~`) is part of which Markdown specification?",
          options: [
            "Original CommonMark — available everywhere",
            "GitHub Flavored Markdown (GFM) — a widely supported extension, not the CommonMark baseline",
            "HTML only — Markdown has no strikethrough",
          ],
          answer: 1,
          explanation:
            "Strikethrough is a GFM extension. It's supported by GitHub, most note apps, and many renderers, but it's not in the core CommonMark spec. In a strict CommonMark-only context it will render as literal tildes.",
        },
      ],
      explanation:
        "Bold for critical info, italic for light emphasis, backticks for anything technical. Prefer `**` over `__`. Strikethrough is GFM. Don't over-format — emphasis loses meaning when everything is emphasized.",
    },
    {
      slug: "links-and-images",
      title: "Links & Images",
      blurb: "Embed hyperlinks, reference URLs cleanly, and add images with alt text that matters.",
      xp: 22,
      kind: "quiz",
      content: `# Links & Images

## Inline Links

The basic link syntax is: \`[link text](URL)\`

\`\`\`
[Visit GitHub](https://github.com)
[See the README](./README.md)
\`\`\`

The text in \`[brackets]\` is what the reader clicks; the URL in \`(parentheses)\` is
where they go. URLs can be absolute (\`https://...\`) or relative (\`../docs/setup.md\`).

## Reference-Style Links

When a document has many links, inline URLs clutter the prose. Reference-style links
separate the destination:

\`\`\`
Read the [contributing guide][contrib] before opening a pull request.
Check [the changelog][changelog] for recent updates.

[contrib]: https://github.com/example/repo/blob/main/CONTRIBUTING.md
[changelog]: https://github.com/example/repo/blob/main/CHANGELOG.md
\`\`\`

All the URLs live at the bottom (or anywhere outside the paragraph), keeping the
prose readable.

## Images

Images use the same syntax as links, with a leading \`!\`:

\`\`\`
![Alt text describing the image](./screenshot.png)
![Cantrip logo](https://example.com/logo.png "Optional title tooltip")
\`\`\`

**The alt text matters.** It is:
- Read aloud by screen readers for users who can't see the image.
- Displayed when the image fails to load.
- Indexed by search engines.

Write alt text that describes *what the image conveys*, not just "image" or the
file name. A screenshot of a login form: \`![Login form with email and password fields]\`.

## Avoid bare URLs in prose

\`Click here: https://example.com\` is harder to read and less accessible than
\`[Visit Example](https://example.com)\`. Descriptive link text also helps users who
skim with screen readers, which may read every link label aloud.`,
      questions: [
        {
          prompt: "What is the correct Markdown syntax to create a hyperlink with the text \"Read the docs\" pointing to `https://docs.example.com`?",
          options: [
            "(Read the docs)[https://docs.example.com]",
            "[Read the docs](https://docs.example.com)",
            "<Read the docs: https://docs.example.com>",
          ],
          answer: 1,
          explanation:
            "The Markdown link pattern is `[visible text](URL)` — brackets first, then parentheses. Reversing them or using angle brackets produces literal text, not a link.",
        },
        {
          prompt: "Why is reference-style link syntax useful in a long document?",
          options: [
            "It makes links open in a new tab automatically",
            "It moves URLs out of the prose to the bottom of the file, keeping paragraphs readable",
            "It prevents links from ever breaking",
          ],
          answer: 1,
          explanation:
            "When a paragraph is dense with long URLs, inline links become unreadable. Reference-style links (`[text][label]` + `[label]: url` elsewhere) let you write clean prose and manage all URLs in one place.",
        },
        {
          prompt: "You add an image to your README with: `![](./chart.png)`. What problem does this create?",
          options: [
            "The image won't render — a file path can't be used, only a URL",
            "The empty alt text means screen readers have nothing to convey, and search engines can't index it",
            "The `!` prefix will cause a parse error",
          ],
          answer: 1,
          explanation:
            "Empty alt text (`![]()`) leaves screen reader users with no information about the image, and search engines can't index it. Always write descriptive alt text that explains what the image shows or communicates.",
        },
      ],
      explanation:
        "Links: `[text](url)`. Images: `![alt](url)`. Write real alt text — it's an accessibility requirement, not decoration. Use reference-style links to keep long documents readable.",
    },
    {
      slug: "lists-and-task-lists",
      title: "Lists & Task Lists",
      blurb: "Bullet lists, numbered lists, nested items, and the checkbox syntax that powers kanban-style tracking.",
      xp: 22,
      kind: "quiz",
      content: `# Lists & Task Lists

## Unordered Lists

Start each item with \`-\`, \`*\`, or \`+\` (pick one and be consistent):

\`\`\`
- First item
- Second item
- Third item
\`\`\`

**Convention:** \`-\` is the near-universal choice. Mixing \`-\` and \`*\` in the same list
creates subtly inconsistent rendering in some tools — just pick one.

## Ordered Lists

Start each item with a number and a period. The numbers don't need to be sequential
— most renderers auto-number from the first value. Many writers use \`1.\` for every
item intentionally (easier to reorder):

\`\`\`
1. Install dependencies
1. Configure environment variables
1. Run the dev server
\`\`\`

## Nested Lists

Indent by **two or four spaces** (CommonMark requires four; GFM accepts two) to nest:

\`\`\`
- Project setup
  - Clone the repo
  - Install dependencies
- Running locally
  - Start the server
  - Open the browser
\`\`\`

Keep nesting shallow — more than two levels deep is usually a sign the content
should be reorganized, not indented further.

## Task Lists (GFM)

A GFM extension lets you create interactive checkboxes in GitHub issues and PRs:

\`\`\`
- [x] Write the README
- [x] Add contributing guide
- [ ] Set up CI/CD
- [ ] Publish to npm
\`\`\`

\`[x]\` = checked; \`[ ]\` = unchecked. On GitHub these are *clickable* in issues and
pull request descriptions, making them a lightweight kanban column.`,
      questions: [
        {
          prompt: "You're writing a step-by-step setup guide where order matters. Which list type is the right choice?",
          options: [
            "An unordered (bullet) list with `-`",
            "An ordered (numbered) list",
            "A task list with checkboxes",
          ],
          answer: 1,
          explanation:
            "Ordered lists signal sequence — step 1, then step 2, then step 3. Unordered lists imply the items are interchangeable. Task lists are for to-do tracking, not sequential instructions.",
        },
        {
          prompt: "A colleague's Markdown file mixes `-` and `*` as bullet markers within the same list. Why is this a problem?",
          options: [
            "The file will fail to parse entirely",
            "Some renderers treat them as separate nested levels, causing inconsistent or unexpected output",
            "There is no problem — they are completely interchangeable with no side effects",
          ],
          answer: 1,
          explanation:
            "While most renderers accept all three markers (`-`, `*`, `+`), mixing them in a single list can trigger unintended nesting or break rendering in stricter parsers. Consistency is the safe habit.",
        },
        {
          prompt: "What does the GFM task list item `- [ ] Deploy to production` mean, and where are these checkboxes interactive?",
          options: [
            "A broken bullet point; task lists are not real Markdown",
            "An unchecked to-do item; on GitHub, checkboxes in issues and PR descriptions are clickable without editing the source",
            "A checked item; `[ ]` means 'done' and `[x]` means 'pending'",
          ],
          answer: 1,
          explanation:
            "`[ ]` is unchecked (pending); `[x]` is checked (done). GitHub renders these as real, clickable checkboxes in issues and PR bodies — no manual editing needed. In other renderers they appear as styled list items but may not be interactive.",
        },
      ],
      explanation:
        "Use `-` for bullets, numbered lists for sequences. Keep nesting shallow. GFM task lists (`- [x]`) are interactive on GitHub — a lightweight project-tracking tool built into your Markdown.",
    },
    {
      slug: "code-blocks-and-tables",
      title: "Code Blocks & Tables",
      blurb: "Display multi-line code with syntax highlighting, and organize data with GFM tables.",
      xp: 25,
      kind: "quiz",
      content: `# Code Blocks & Tables

## Fenced Code Blocks

For multi-line code, wrap it in triple backticks and specify the language:

\`\`\`
\`\`\`python
def greet(name):
    return f"Hello, {name}!"
\`\`\`
\`\`\`

The language hint (e.g., \`python\`, \`js\`, \`sql\`, \`bash\`, \`json\`, \`yaml\`) enables
**syntax highlighting** in GitHub, VS Code previews, and most documentation sites.
Without it, the block still renders as monospace code — but you lose the color.

Common language tags: \`js\` / \`javascript\`, \`ts\` / \`typescript\`, \`py\` / \`python\`,
\`bash\` / \`sh\`, \`sql\`, \`json\`, \`yaml\`, \`html\`, \`css\`, \`go\`, \`rust\`, \`diff\`.

The \`diff\` language tag is especially useful in documentation — lines starting with
\`+\` render green (added) and lines starting with \`-\` render red (removed).

## Tables (GFM)

Tables use pipe characters (\`|\`) and a separator row of hyphens:

\`\`\`
| Column A | Column B | Column C |
|----------|----------|----------|
| Row 1 A  | Row 1 B  | Row 1 C  |
| Row 2 A  | Row 2 B  | Row 2 C  |
\`\`\`

**Alignment** is controlled in the separator row:

| Syntax | Alignment |
|--------|-----------|
| \`|---||\` | Default (left) |
| \`|:---|\` | Left |
| \`|---:|\` | Right |
| \`|:---:|\` | Center |

Keep tables simple: Markdown tables have no merged cells and no multi-line cells.
If your data needs that complexity, consider an HTML table or a different format.

**Tip:** Most editors (VS Code with extensions, Neovim, Obsidian) can auto-format
Markdown tables so columns stay neatly aligned — you don't have to count spaces.`,
      questions: [
        {
          prompt: "You're writing a README that includes a shell command. Which Markdown produces the best output?",
          options: [
            "Wrapping the command in single backticks: `npm install`",
            "A fenced code block with a `bash` language tag",
            "Putting the command in bold: **npm install**",
          ],
          answer: 1,
          explanation:
            "For a multi-word shell command users will copy and run, a fenced code block is clearest. The `bash` tag enables syntax highlighting. Inline backticks are fine for very short snippets inline in a sentence; bold is never right for code.",
        },
        {
          prompt: "What does specifying a language after the opening triple-backtick (e.g., ```python) actually do?",
          options: [
            "It executes the code automatically in the browser",
            "It gives the renderer a hint to apply syntax highlighting for that language",
            "It prevents anyone from copying the code block",
          ],
          answer: 1,
          explanation:
            "The language tag is a hint for the renderer's syntax highlighter — it colorizes keywords, strings, and comments. It has no effect on execution; the code is still just formatted text.",
        },
        {
          prompt: "In a GFM table separator row, what does `|---:|` in a column mean?",
          options: [
            "The column has no content and will be hidden",
            "The column's content is right-aligned",
            "The column is required and cannot be left blank",
          ],
          answer: 1,
          explanation:
            "The colon position in the separator row controls alignment: `|:---|` = left, `|---:|` = right, `|:---:|` = center, `|---|` = default (usually left). Right-alignment is conventionally used for numeric columns.",
        },
      ],
      explanation:
        "Fenced code blocks with a language tag give you syntax highlighting. GFM tables use pipes and a separator row; colons in the separator control column alignment. Keep tables simple — Markdown tables don't support merged cells.",
    },
    {
      slug: "markdown-in-practice",
      title: "Markdown in Practice",
      blurb: "Capstone: real-world habits, common mistakes, and writing Markdown that holds up everywhere.",
      xp: 25,
      kind: "quiz",
      content: `# Markdown in Practice

You've covered the full core syntax. The last skill is knowing how to *apply* it
well. Here are the habits that separate a readable, maintainable Markdown document
from a messy one.

## Write for the reader, not the renderer

Markdown's purpose is communication. Use formatting to clarify — not to decorate.
If removing a bold or a heading makes the text just as clear, remove it.

## Consistency over cleverness

- Use one bullet marker (\`-\`) throughout.
- Use one heading style (ATX: \`# H1\`) not the underline-style (Setext).
- Use fenced code blocks, not indented code blocks (four-space indent) — fenced
  blocks are more widely supported and let you add a language tag.

## Linting Markdown

Tools like **markdownlint** (a VS Code extension and CLI) enforce rules: consistent
heading levels, no trailing spaces, no bare URLs, blank lines around headings. In a
team context, a markdownlint config in the repo is the same idea as an ESLint config
for JavaScript — it keeps the whole doc suite consistent.

## Portability traps

Not every renderer supports every extension. Before relying on a GFM feature
(tables, task lists, strikethrough), check that your target tool supports it.
CommonMark is the safe portable baseline; GFM works on GitHub and most modern tools.

## The README is the front door

On GitHub (and most platforms) the README.md in a repo's root is rendered
automatically. It is the first thing a visitor sees. A good README includes:

1. A one-line description of what the project does.
2. Installation/setup instructions (numbered list + code blocks).
3. A usage example (code block with language tag).
4. Links to contributing guide, license, and any documentation.

## AI and Markdown

As of 2026, every major AI assistant outputs Markdown by default. Understanding
Markdown syntax helps you read AI output accurately, prompt AI to format responses
the way you want ("respond in a numbered list with code blocks for each example"),
and paste AI-generated Markdown into your own docs without surprises.`,
      questions: [
        {
          prompt: "Your team's Markdown files use a mix of `-`, `*`, and `+` bullets, both ATX (`# H1`) and Setext (`H1 / ===`) headings, and sometimes indented code blocks. What's the most practical fix?",
          options: [
            "Rewrite every file from scratch in a different format",
            "Add a markdownlint config and run it as a linter in CI, just as you would ESLint for JavaScript",
            "Accept the inconsistency — Markdown was never meant to be consistent",
          ],
          answer: 1,
          explanation:
            "Markdownlint (or similar) enforces a consistent style across the whole doc suite automatically. Running it in CI catches new inconsistencies before they merge, the same way ESLint keeps JavaScript consistent.",
        },
        {
          prompt: "A colleague pastes a GFM task list (`- [x] Done`) into a docs site built on a strict CommonMark parser. What happens?",
          options: [
            "It renders as an interactive checkbox, as always",
            "It may render as a literal `[x]` inside a bullet point, because task lists are a GFM extension, not CommonMark",
            "The site crashes — CommonMark can't parse square brackets",
          ],
          answer: 1,
          explanation:
            "Task lists are GFM-only. A CommonMark-only renderer doesn't know what `[x]` means inside a list item — it renders the brackets literally. Always check which Markdown dialect your target tool supports before using extensions.",
        },
        {
          prompt: "As of 2026, why is Markdown fluency increasingly valuable for anyone who uses AI tools?",
          options: [
            "AI tools require you to write prompts in Markdown syntax or they won't respond",
            "Major AI assistants output Markdown by default, and knowing the syntax helps you read, direct, and reuse that output accurately",
            "Markdown is the file format AI models are trained on, so knowing it trains better models",
          ],
          answer: 1,
          explanation:
            "Claude, ChatGPT, Gemini, and others format their responses in Markdown. Recognizing `**bold**` vs `# heading` vs ` ```code``` ` lets you read AI output correctly, ask for specific formatting, and paste responses into docs without confusion.",
        },
      ],
      explanation:
        "Write for clarity, not decoration. Be consistent. Lint your Markdown in CI. Know which dialect your tools support. And as AI output is almost always Markdown, fluency pays double — in your own docs and in reading what AI produces.",
    },
  ],
};
