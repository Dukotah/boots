# 🥾 Boots

A **gamified, multi-language coding academy** — learn to code (and to build with
AI) like it's an RPG. Write real, auto-graded code in your browser, earn XP, keep
your streak, and level up from Intern to Wizard.

This is the working proof of concept. The product strategy lives in
[`GAMEPLAN.md`](./GAMEPLAN.md).

---

## ✨ What works right now

- **Interactive lessons** — read on the left, code on the right (Monaco editor).
- **Instant auto-grading** — your code runs in a sandboxed **Web Worker** and is
  checked against test cases. No backend, no infra, fully in-browser.
- **Gamification** — XP, levels, named ranks, daily **streaks** (with forgiving
  logic), level-up celebrations. Progress persists in `localStorage`.
- **Two modules:**
  - 🟨 **JavaScript Foundations** — variables → functions → conditionals → arrays → objects
  - 🤖 **Learn AI: Build with LLMs** — tokens, prompt engineering, chat messages,
    few-shot, system prompts (high-SEO, on-theme, taught through real code)
- **Dashboard** — streak, XP, rank, per-course progress, "continue learning".
- **Landing + pricing pages** — the free→Pro story from the gameplan.

## 🚀 Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (also typechecks everything)
```

## ▲ Deploy on Vercel (work fully online)

This repo deploys to Vercel with **zero config** (Next.js is auto-detected, no
env vars required yet). One-time setup:

1. Go to **[vercel.com/new](https://vercel.com/new)** and sign in with GitHub.
2. **Import** the `dukotah/boots` repository.
3. Leave everything default (Framework: Next.js) and click **Deploy**.

Vercel deploys the repo's **default branch** as production — which is the branch
this project lives on. After that, **every push auto-deploys**: pushes to the
default branch ship to production, and any other branch gets a preview URL. So
all further work can happen online (e.g. in Claude Code on the web) and go live
automatically.

## 🧱 Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router) + TypeScript |
| Styling | Tailwind CSS + custom design tokens |
| Editor | Monaco (`@monaco-editor/react`) |
| Code execution | Sandboxed Web Worker (`src/workers/codeRunner.ts`) |
| State | Zustand + `persist` (localStorage) |
| Animation | Framer Motion |
| Content | Lessons-as-data (typed objects in `src/lib/curriculum`) |

## 🗂️ Project structure

```
src/
  app/                      # routes (App Router)
    page.tsx                # landing
    learn/                  # course index, module pages, lesson pages
    dashboard/              # progress dashboard
    pricing/                # pricing tiers
  components/               # UI (CodeEditor, LessonView, XPBar, Navbar, ...)
  lib/
    curriculum/             # ⭐ all course content lives here (as data)
      types.ts              # Lesson / Module shape
      javascript.ts         # JS module
      ai-llms.ts            # Learn-AI module
      index.ts              # registry + helpers
    runner.ts               # spawns the worker, handles timeouts
    levels.ts               # XP → level/rank math
    progress.ts             # Zustand store (XP, streak, completion)
  workers/
    codeRunner.ts           # the sandbox that runs & grades student code
```

## ➕ Add a lesson (the main thing you'll do)

Lessons are just data. Open `src/lib/curriculum/javascript.ts` (or any module) and
add an entry to its `lessons` array:

```ts
{
  slug: "my-lesson",            // URL: /learn/javascript/my-lesson
  title: "My Lesson",
  blurb: "One-line teaser.",
  xp: 25,
  content: `# Markdown body\n\nExplain the concept here.`,
  starterCode: `function solve() {\n  // ...\n}\n`,
  solution: `function solve() { return 42; }`,
  tests: [
    { name: "returns 42", code: `assertEquals(solve(), 42);` },
  ],
}
```

**How tests work:** each test's `code` runs *right after* the student's code in
the same scope, inside the worker. You get three helpers injected:

- `assertEquals(actual, expected, msg?)` — deep-equals via JSON
- `assert(condition, msg?)` — truthy check
- `console.log(...)` — captured and shown under the test

Throw (or fail an assert) to mark the test failed.

## ➕ Add a whole module

1. Create `src/lib/curriculum/my-module.ts` exporting a `Module`.
2. Register it in `src/lib/curriculum/index.ts` (`MODULES` array).

It automatically appears on the landing page, `/learn`, the dashboard, and gets
its own routes + SEO metadata.

## 🧪 Sanity-check your lessons

Every reference `solution` should pass its own `tests`. Quick check:

```bash
node --experimental-strip-types scripts/check-curriculum.ts
```

## 🗺️ Roadmap (see GAMEPLAN.md for the full plan)

- [x] Core loop: read → code → run → auto-grade → XP
- [x] Gamification v1: XP, levels, ranks, streaks
- [x] JavaScript + Learn-AI modules
- [ ] Auth + server-side progress (Supabase/Clerk)
- [ ] Stripe subscriptions + free/Pro gating
- [ ] Boots AI tutor (Claude API, Socratic prompt, cached)
- [ ] Leagues, quests, loot chests, boss battles
- [ ] More languages (Python via Pyodide; compiled langs via Judge0)
- [ ] Leaderboards + community

---

Built as a vibe-coding project. Keep shipping. 🥾
