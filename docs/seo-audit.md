# SEO Audit — Cantrip

Audit date: 2026-06-06. All file paths are relative to `src/`.

---

## P0 — Bugs that actively hurt ranking or share cards

### 1. Duplicate title suffix on the blog index

**File:** `app/blog/page.tsx` line 7

The `title` field is set to the literal string `"Blog — Learn to Code Guides & Tips"`.
The root layout's template is `"%s | Cantrip"`, so the rendered `<title>` becomes:

```
Blog — Learn to Code Guides & Tips | Cantrip
```

That is acceptable but could be tighter. The real problem is the `how-to` index
at `app/how-to/page.tsx` line 7:

```
"How-To Coding Guides — Step-by-Step Solutions"
```

rendered as:

```
How-To Coding Guides — Step-by-Step Solutions | Cantrip
```

Both are fine in isolation, but the cheatsheet index (`app/cheatsheet/page.tsx` line 7)
already includes "Cantrip" in the keyword description rather than the title, so this
is consistent.

**Real duplicate-suffix issue (P0):** `app/blog/[slug]/page.tsx` line 29 and
`app/how-to/[slug]/page.tsx` line 33 and `app/learn/[module]/page.tsx` line 30 and
`app/cheatsheet/[slug]/page.tsx` line 22 and `app/tools/[slug]/page.tsx` line 33 all
manually append `| Cantrip` inside the OG `title` field:

```ts
// blog/[slug]/page.tsx line 29
title: `${post.title} | ${SITE.name}`,
```

Meanwhile the Next.js `<title>` tag is also built via the template `"%s | Cantrip"`,
which applies to the `title` metadata field (not the OG title). These OG values are
therefore correct as-is (OG title should be the full readable title). However, if
anyone sets `title` and `openGraph.title` to the same string — and they do for
module pages (`app/learn/[module]/page.tsx` line 30: `title: \`${title} — Cantrip\``)
— then the `<title>` tag will be `"JavaScript Basics — Cantrip | Cantrip"`.

**Fix for `app/learn/[module]/page.tsx` line 30:**
```ts
// BEFORE
title: `${title} — Cantrip`,
// AFTER
title: `${title} — Cantrip`,  // remove — this is the OG field; keep it as-is.
```

Wait — let me be precise. In `app/learn/[module]/page.tsx` the metadata is:

```ts
// line 21–22
const title = module.title;
return {
  title,                             // becomes: "<module.title> | Cantrip" in <title>
  ...
  openGraph: {
    title: `${title} — Cantrip`,     // OG is fine: full human-readable form
  },
};
```

The `<title>` result here is `"JavaScript Basics | Cantrip"` — correct.
The OG title is `"JavaScript Basics — Cantrip"` — also acceptable.
No real double-suffix here.

**Actual double-suffix — `app/learn/[module]/[lesson]/page.tsx` lines 25, 33:**

```ts
const title = `${lesson.title} — ${module.title}`;  // e.g. "Variables — JavaScript Basics"
...
title,                    // <title> = "Variables — JavaScript Basics | Cantrip"  ✓
...
openGraph: {
  title: `${title} | Cantrip`,  // OG = "Variables — JavaScript Basics | Cantrip"  ✓
}
```

This is fine — the OG title includes the suffix but is not rendered in `<title>`.
No double-suffix.

**Summary of title-suffix issue:** No actual double-suffix exists today. The audit
is clear on this point.

---

## P1 — High-impact missing or weak metadata

### 2. Missing `robots: noindex` on private/authenticated pages

**Files and lines:**

| Route | File | Issue |
|---|---|---|
| `/dashboard` | `app/dashboard/page.tsx` — no metadata export | No `noindex` directive |
| `/profile` | `app/profile/page.tsx` — no metadata export | No `noindex` directive |
| `/account` | `app/account/page.tsx` — no metadata export | No `noindex` directive |
| `/career` | `app/career/page.tsx` — no metadata export | No `noindex` directive |
| `/login` | `app/login/page.tsx` — no metadata export | No `noindex` directive |
| `/onboarding` | has metadata, but no `robots: noindex` | Should not be indexed |
| `/refer` | `app/refer/page.tsx` — no metadata export | No `noindex` directive |
| `/review` | no metadata found | No `noindex` directive |
| `/shop` | no metadata found | No `noindex` directive |
| `/achievements` | `app/achievements/page.tsx` — no metadata export | No `noindex` directive |
| `/leaderboard` | `app/leaderboard/page.tsx` — no metadata export | No `noindex` directive |
| `/friends` | no metadata found | No `noindex` directive |
| `/guilds` | no metadata found | No `noindex` directive |
| `/events` | no metadata found | No `noindex` directive |
| `/leagues` | no metadata found | No `noindex` directive |
| `/boss` | no metadata found | No `noindex` directive |
| `/quests` | no metadata found | No `noindex` directive |
| `/daily` | no metadata found | No `noindex` directive |
| `/skill-tree` | no metadata found | No `noindex` directive |
| `/teams` | no metadata found | No `noindex` directive |
| `/projects` | no metadata found | No `noindex` directive |
| `/offline` | no metadata found | No `noindex` directive |

`robots.ts` only disallows `/dashboard` and `/api/` — all other private/game pages are
crawlable. Googlebot will crawl and try to index pages like `/profile`, `/career`,
`/leaderboard`, and `/shop`. These are app-shell pages with no server-rendered content,
so they will appear thin/empty and may accumulate crawl budget without benefit.

**Fix — add a metadata export to each "app shell" page:**
```ts
// example for app/dashboard/page.tsx (already "use client" — export from a
// sibling layout.tsx or add a metadata.ts in the same directory)
export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};
```

Because these are `"use client"` files, metadata must be exported from a
co-located `layout.tsx` or from a thin server wrapper. The simplest fix per page:

```ts
// app/dashboard/layout.tsx  (new file)
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
```

Apply the same pattern for every route in the table above.

### 3. Missing canonical on several public pages

**Files and lines:**

| Route | File | Missing |
|---|---|---|
| `/map` | `app/map/page.tsx` line 5 | No `alternates.canonical` |
| `/pricing` | `app/pricing/page.tsx` line 4 | No `alternates.canonical` |
| `/about` | `app/about/page.tsx` line 7 | Has canonical `/about` — OK |
| `/certificate/[module]` | `app/certificate/[module]/page.tsx` line 21 | Has canonical — OK |

**`/map` fix (`app/map/page.tsx`):**
Add to the metadata export:
```ts
alternates: { canonical: "/map" },
```

**`/pricing` fix (`app/pricing/page.tsx`):**
Add to the metadata export:
```ts
alternates: { canonical: "/pricing" },
robots: { index: true, follow: true },
```

### 4. Missing OG image on most content pages

The root layout sets a default branded OG image (`/api/og?title=Cantrip&subtitle=…`).
Child pages that don't override it will share-preview as the generic Cantrip card, not
a content-specific card. This is a soft issue but hurts click-through on social shares.

**Pages that override OG image:** `/certificate/[module]` (line 26) — custom OG per module.

**Pages that do not override OG image:**
- `app/blog/[slug]/page.tsx` — no `images` in `openGraph` (line 27–34). Blog posts
  should get a per-post card. The `articleJsonLd` has `headline` and `datePublished`
  but the `<meta og:image>` will be the generic root card.
- `app/learn/[module]/page.tsx` — no OG image.
- `app/learn/[module]/[lesson]/page.tsx` — no OG image.
- `app/how-to/[slug]/page.tsx` — no OG image.
- `app/cheatsheet/[slug]/page.tsx` — no OG image.
- `app/tools/[slug]/page.tsx` — no OG image.
- `app/paths/[slug]/page.tsx` — no OG image.
- `app/rooms/[slug]/page.tsx` — no OG image.

**Fix (highest-ROI: blog posts and learn pages):**
The `/api/og` endpoint already accepts `title` and `subtitle` params. Add an `images`
entry to each `generateMetadata` return value:

```ts
// app/blog/[slug]/page.tsx — inside generateMetadata, add:
const og = `/api/og?title=${encodeURIComponent(post.title)}&subtitle=${encodeURIComponent(post.description)}`;
openGraph: {
  ...existingFields,
  images: [{ url: og, width: 1200, height: 630 }],
},
twitter: { card: "summary_large_image", images: [og] },
```

Apply the same pattern using `module.title`/`module.tagline` for learn pages, etc.

---

## P2 — Structural / structural-data issues

### 5. Sitemap missing `/about` and all legal/utility pages

**File:** `app/sitemap.ts`

The `staticPages` array (lines 14–27) does not include:
- `/about` — a public content page that should be indexed
- `/privacy` — technically optional but search engines can discover it
- `/terms` — same
- `/onboarding` — could be excluded (noindex preferred over sitemap omission)

**Fix — add to `staticPages` in `app/sitemap.ts`:**
```ts
{ url: absoluteUrl("/about"), changeFrequency: "monthly", priority: 0.5 },
```

Privacy and terms are low-priority but harmless to include:
```ts
{ url: absoluteUrl("/privacy"), changeFrequency: "yearly", priority: 0.2 },
{ url: absoluteUrl("/terms"),   changeFrequency: "yearly", priority: 0.2 },
```

### 6. Sitemap includes `/certificate/[module]` but these should be noindex

**File:** `app/sitemap.ts` lines 41–45

Certificate pages at `/certificate/[module]` are generated for all modules (line 41–45)
and have a priority of 0.4. However these pages are only meaningful for learners who
have completed the module — they render an empty/locked certificate for everyone else.
Including them in the sitemap sends crawlers to thin, duplicate-ish pages.

**Fix:** Either remove `certificatePages` from the sitemap return value (line 87), or
add `robots: { index: false }` to the `app/certificate/[module]/page.tsx` metadata.
The path-certificate variant (`/certificate/path/[slug]`) is a pure `"use client"`
component with no server metadata at all — it should definitely not be in the sitemap
and should get `noindex`. It is not currently in the sitemap (correct), but it has no
metadata protection either.

### 7. `app/certificate/path/[slug]/page.tsx` has no metadata at all

**File:** `app/certificate/path/[slug]/page.tsx` (entire file is `"use client"`)

There is no `metadata` export and no co-located layout. This page will be indexed by
Googlebot using the root default title ("Cantrip — Learn to Code & Build with AI,
Gamified") which is incorrect.

**Fix — add `app/certificate/path/[slug]/layout.tsx`:**
```ts
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Path Certificate",
  robots: { index: false, follow: false },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
```

### 8. `lessonJsonLd` uses `LearningResource` but omits `dateCreated`/`dateModified`

**File:** `lib/seo.ts` lines 52–72

The `LearningResource` schema is valid but Google's rich-results documentation for
`LearningResource` recommends `dateCreated` and `dateModified`. The `Lesson` type
likely doesn't carry dates, so this can only be addressed if the curriculum model grows
date fields. Low impact but noted.

### 9. `courseJsonLd` uses `numberOfCredits` incorrectly

**File:** `lib/seo.ts` line 31

```ts
numberOfCredits: module.lessons.length,
```

`numberOfCredits` in schema.org refers to academic credit units, not lesson count.
Using it with a lesson count is technically incorrect and could confuse validators.
Use a custom property or remove it.

**Fix:**
```ts
// remove numberOfCredits line; add:
educationalCredentialAwarded: `${module.title} Certificate of Completion`,
```

### 10. OG `url` fields use relative paths, not absolute

**Files and lines:**

| File | Line | Current value |
|---|---|---|
| `app/blog/[slug]/page.tsx` | 31 | `url: \`/blog/${post.slug}\`` |
| `app/learn/[module]/page.tsx` | 32 | `url: \`/learn/${module.slug}\`` |
| `app/learn/[module]/[lesson]/page.tsx` | 36 | `url: path` (relative) |
| `app/how-to/[slug]/page.tsx` | 37 | `url: \`/how-to/${h.slug}\`` |
| `app/cheatsheet/[slug]/page.tsx` | 26 | `url: \`/cheatsheet/${c.slug}\`` |
| `app/tools/[slug]/page.tsx` | 45 | `url: \`/tools/${tool.slug}\`` |
| `app/paths/[slug]/page.tsx` | 32 | `url: \`/paths/${path.slug}\`` |
| `app/rooms/[slug]/page.tsx` | 33 | `url: \`/rooms/${room.slug}\`` |

Next.js resolves relative OG `url` values against `metadataBase` (set to `SITE.url` in
the root layout), so in practice these render correctly. However the `certificate` page
already uses an absolute URL pattern via `absoluteUrl()`. For consistency and
defensiveness (in case `metadataBase` changes), prefer absolute URLs everywhere.

**Fix — in each `generateMetadata`, replace relative url with:**
```ts
url: absoluteUrl(`/blog/${post.slug}`),
```

---

## P3 — Missing structured data for key page types

### 11. No `WebSite` schema with `SearchAction` on the homepage

**File:** `app/page.tsx`

The homepage has no JSON-LD at all. Adding a `WebSite` schema with a
`SearchAction` sitelink search box enables Google to show an in-SERP search field
for cantrip.dev.

**Fix — add to `app/page.tsx`:**
```ts
// In the page component JSX:
<JsonLd data={{
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  url: SITE.url,
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${SITE.url}/how-to?q={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
}} />
```

### 12. No `Organization` schema anywhere

No page emits an `Organization` JSON-LD block, which is the standard way to tell
Google about the brand entity (name, logo, social profiles, contact).

**Fix — add to `app/page.tsx`:**
```ts
<JsonLd data={{
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  url: SITE.url,
  logo: `${SITE.url}/logo.png`,  // ensure logo exists at this path
  sameAs: [`https://twitter.com/cantripdev`],
}} />
```

### 13. Cheatsheet pages emit breadcrumb JSON-LD but no `DefinedTermSet` schema

**File:** `app/cheatsheet/[slug]/page.tsx`

Cheat sheets are reference tables — a `DefinedTermSet` or `ItemList` schema would
give Google additional signal about the content type and could unlock rich results.
Currently only `BreadcrumbList` is emitted. Low priority but easy win.

### 14. `app/paths/[slug]/page.tsx` emits `ItemList` but no `EducationalOccupationalProgram`

**File:** `app/paths/[slug]/page.tsx` lines 57–68

An `EducationalOccupationalProgram` wrapping each path would align better with
Google's understanding of a learning pathway leading to a credential/career.

---

## P4 — Minor / polish

### 15. `app/about/page.tsx` — description is weak (line 8)

Current: `"What Cantrip is and why it exists — learn to code the fun way."`

This is under 70 characters and doesn't include keywords. The meta description
influences CTR in SERPs even though it's not a ranking signal.

**Fix:**
```ts
description: `Cantrip is a gamified coding academy: interactive, auto-graded lessons in JavaScript, Python, SQL, and AI. Learn the fun way — earn XP, keep streaks, level up from Intern to Archmage.`,
```

### 16. `app/map/page.tsx` — description uses internal jargon (line 8)

Current: `"Your interactive skill tree. Clear each node to unlock the next, earn XP and gold, and climb the ranks from Intern to Archmage."`

The `/map` page should probably be `noindex` (it is an authenticated, personal
progress view) — see finding #2. If it is kept public, the description is fine for
existing users but opaque to search engine users.

### 17. `app/onboarding/page.tsx` — should be `noindex`

**File:** `app/onboarding/page.tsx` line 4

This page exists to collect user intent; it should not appear in search results.
Add `robots: { index: false }` to its metadata (line 4).

### 18. `robots.ts` — does not disallow gamification routes

**File:** `app/robots.ts` line 11

Current `disallow`:
```ts
disallow: ["/dashboard", "/api/"],
```

It should also disallow authenticated/private routes to save crawl budget:
```ts
disallow: [
  "/dashboard",
  "/api/",
  "/account",
  "/profile",
  "/career",
  "/onboarding",
  "/review",
  "/shop",
  "/achievements",
  "/leaderboard",
  "/friends",
  "/guilds",
  "/events",
  "/leagues",
  "/boss",
  "/quests",
  "/daily",
  "/skill-tree",
  "/teams",
  "/projects",
  "/refer",
  "/offline",
],
```

This is the complement of finding #2 — both `robots.txt` disallow and `noindex`
headers should be set; relying on only one is fragile.

---

## Summary table — prioritized

| Priority | Finding | Files |
|---|---|---|
| P0 | No actual double-suffix found — cleared | — |
| P1 | Missing `noindex` on ~20 private/app-shell pages | `app/*/page.tsx` (client-only pages listed in §2) |
| P1 | Missing `robots.txt` disallow for private routes | `app/robots.ts` line 11 |
| P1 | Missing OG image on all dynamic content pages | `app/blog/[slug]`, `app/learn/[module]`, `app/learn/[module]/[lesson]`, `app/how-to/[slug]`, `app/cheatsheet/[slug]`, `app/tools/[slug]`, `app/paths/[slug]`, `app/rooms/[slug]` |
| P1 | `/about` missing from sitemap | `app/sitemap.ts` line 14 |
| P2 | Missing canonical on `/pricing` and `/map` | `app/pricing/page.tsx` line 4, `app/map/page.tsx` line 5 |
| P2 | `certificate/path/[slug]` has no metadata at all | `app/certificate/path/[slug]/page.tsx` |
| P2 | `certificatePages` in sitemap should be removed or the pages noindexed | `app/sitemap.ts` lines 41–45 |
| P2 | OG `url` fields use relative paths | 8 files listed in §10 |
| P2 | `numberOfCredits` misused in courseJsonLd | `lib/seo.ts` line 31 |
| P3 | No `WebSite` + `SearchAction` schema on homepage | `app/page.tsx` |
| P3 | No `Organization` schema anywhere | `app/page.tsx` |
| P3 | Cheatsheet pages lack `DefinedTermSet` or `ItemList` schema | `app/cheatsheet/[slug]/page.tsx` |
| P3 | Path pages could use `EducationalOccupationalProgram` | `app/paths/[slug]/page.tsx` |
| P4 | `/about` description is thin | `app/about/page.tsx` line 8 |
| P4 | `/onboarding` missing `noindex` | `app/onboarding/page.tsx` line 4 |
| P4 | `/map` description uses internal jargon | `app/map/page.tsx` line 8 |
