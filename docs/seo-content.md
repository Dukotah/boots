# SEO Content Pipeline — SOP

This document covers the workflow for creating and publishing blog posts at Cantrip, the post data shape, and the keyword backlog mapped to existing curriculum modules.

---

## Content Pipeline: AI-draft → human-edit → link → publish

### Step 1 — Identify a high-intent keyword

Pull from the backlog below (or add a new one). Prioritize queries that:
- Already have a matching module in `/learn` or a path in `/paths`
- Signal learning intent ("how to", "what is", "explained", "for beginners")
- Have search volume but limited authoritative competition

### Step 2 — AI draft

Prompt an LLM with:
```
Write a blog post for Cantrip (a coding academy). Target keyword: "[keyword]".
Length: 600–900 words of real body text. Include:
- At least 3 working code examples in fenced blocks
- Internal links to the matching /learn/[module] and /paths/[path]
- H2 and H3 headings
- A summary paragraph at the end with a CTA linking to the lesson
Do NOT pad with generic intro paragraphs. Start with substance.
```

### Step 3 — Human edit checklist

Before publishing, verify:
- [ ] All code examples compile and produce the stated output
- [ ] Internal links resolve to real routes in the app (`/learn/python`, `/paths/frontend`, `/cheatsheet`, `/playground`, etc.)
- [ ] Reading time estimate looks right (roughly 200 words/minute)
- [ ] Tags are from the existing tag vocabulary (see below)
- [ ] `date` is set to today's ISO date string (YYYY-MM-DD)
- [ ] No filler phrases like "In this post we will explore…"

### Step 4 — Create the post file

1. Create `src/content/posts/<slug>.ts` exporting a default `BlogPost` object.
2. Add a one-line `// WHY` comment at the top explaining the SEO target.
3. Import and re-export from `src/content/blog.ts` (see wiring snippet in this repo's agent output).

### Step 5 — Publish

Register the post in `src/content/blog.ts` by importing the new file and spreading it into the `POSTS` array. The sitemap and blog index pick it up automatically from `POSTS`.

---

## Post Data Shape

All posts must match the `BlogPost` type exported from `src/content/blog.ts`:

```typescript
export type BlogPost = {
  slug: string;          // URL-safe, kebab-case, matches the filename
  title: string;         // Full title as it appears on the page
  description: string;   // 1-2 sentence meta description, 120–160 chars ideal
  date: string;          // Fixed ISO date string, e.g. "2026-06-04"
  readingMinutes: number; // Whole number; estimate at ~200 words/minute
  tags: string[];        // 2–4 tags from the vocabulary below
  body: string;          // Raw Markdown — rendered via ReactMarkdown, no MDX
};
```

### Tag vocabulary (use existing tags; add sparingly)

`beginners` · `python` · `javascript` · `sql` · `algorithms` · `interview` · `concepts` · `backend` · `frontend` · `roadmap` · `career` · `motivation` · `habit` · `projects` · `practice` · `data` · `strings` · `free` · `resources` · `ai` · `digital-safety` · `security` · `everyone`

### Body Markdown conventions

- Use `##` and `###` for headings — never `#` (the page title is already an `<h1>`)
- Code blocks use triple-backtick fences with language tags: ` ```python `, ` ```sql `, ` ```javascript `
- Tables are fine (ReactMarkdown renders them)
- Internal links use relative paths: `[Python track](/learn/python)`, `[cheat sheet](/cheatsheet)`
- Escape template literals in code with `\`\`` when inside a JS/TS string

---

## Keyword Backlog — 15 targets mapped to curriculum modules

| # | Target keyword | Intent | Matching module / path |
|---|---|---|---|
| 1 | `python list comprehension explained` | Learn | `/learn/python` |
| 2 | `what is a variable in programming` | Learn | `/learn/python` or `/learn/javascript` |
| 3 | `for loop vs while loop python` | Learn | `/learn/python` |
| 4 | `how to use async await javascript` | Learn | `/paths/frontend` |
| 5 | `what is a function in python` | Learn | `/learn/python` |
| 6 | `sql where clause examples` | Learn | `/learn/sql` |
| 7 | `how to use git for beginners` | Learn | cheatsheet (git) |
| 8 | `javascript array methods cheat sheet` | Reference | `/paths/frontend` + cheatsheet |
| 9 | `what is recursion in programming` | Learn | `/learn/algorithms` |
| 10 | `python dictionary vs list` | Learn | `/learn/python` |
| 11 | `how to debug code beginners` | Learn | `/playground` + `/learn` |
| 12 | `what is a REST API` | Learn | `/paths/backend` |
| 13 | `css flexbox explained` | Learn | `/paths/frontend` |
| 14 | `how to read an error message` | Practical | `/learn` + `/playground` |
| 15 | `what is a database (SQL vs NoSQL)` | Learn | `/learn/sql` + `/paths/backend` |

### Prioritization notes

- Items 1–6 target very high search volume in Python/JS fundamentals — high priority.
- Item 7 (git) has a cheatsheet already; a post linking to it would capture "how to use git" traffic with minimal new content.
- Items 11 and 14 are evergreen "meta-skill" posts useful for all learners; good for internal linking within the existing posts.
- Items 12 and 15 complement the existing "What Is an API" post and "Learn SQL" roadmap post respectively — publish after those are indexed.
