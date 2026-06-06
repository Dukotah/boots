# Accessibility Audit — Cantrip (WCAG 2.1 AA)

Audited files: `src/components/Navbar.tsx`, `src/components/features/navigation/Sidebar.tsx`,
`src/components/LessonView.tsx`, `src/components/LessonSidebar.tsx`,
`src/app/account/page.tsx`, `src/app/login/page.tsx`,
`src/components/CodeEditor.tsx`, `src/components/layout/AppShell.tsx`,
`src/app/globals.css`, `tailwind.config.ts`, and supporting components
(`LevelUpToast`, `XPBar`, `DailyQuests`, `Playground`, `RegexTester`, `PathQuiz`, `ProGate`).

Date: 2026-06-06

---

## P0 — Critical (breaks keyboard/AT users completely)

### A1 · Sidebar mobile drawer: no focus trap
**File:** `src/components/features/navigation/Sidebar.tsx`, lines 74–108  
**Criterion:** WCAG 2.1 SC 2.1.2 No Keyboard Trap (also industry best practice for modal drawers per ARIA Authoring Practices Guide dialog pattern)

When the mobile drawer is open (`open === true`), keyboard focus is not trapped inside the `<aside>`. Tabbing past the last link inside the drawer moves focus to content behind the backdrop, which is both invisible and covered by the backdrop overlay. Screen-reader users hear phantom content with no way to dismiss the drawer by keyboard.

**Fix:** Wrap the open aside in a focus-trap mechanism. Minimal implementation using the `focus-trap-react` package (already has zero additional bundle cost because it is a tiny wrapper around native DOM APIs):

```tsx
// Install: npm i focus-trap-react  (package.json change — flag for integrator)
import FocusTrap from "focus-trap-react";

// Replace the <aside> block when open:
<FocusTrap active={open} focusTrapOptions={{ allowOutsideClick: true }}>
  <aside ...>
    {/* existing content */}
  </aside>
</FocusTrap>
```

Alternatively, implement manually: collect all focusable children on mount, add a `keydown` listener that catches `Tab`/`Shift+Tab` at the boundary and wraps focus, and remove it on close.

---

### A2 · LessonSidebar mobile drawer: no focus trap, no Escape-to-close
**File:** `src/components/LessonSidebar.tsx`, lines 160–194  
**Criterion:** WCAG 2.1 SC 2.1.2; ARIA APG modal drawer pattern

The `AnimatePresence`-driven off-canvas course-map drawer has the same focus-trap gap as A1. Additionally, there is no `keydown` listener for `Escape` to close it; the only close affordance is the `X` button (mouse/touch-only).

**Fix — add Escape handler and focus trap:**

```tsx
// Inside the AnimatePresence block, on the inner motion.div panel:
<motion.div
  ...
  onKeyDown={(e) => { if (e.key === "Escape") setOpenMobile(false); }}
  // then wrap with FocusTrap as in A1, or the manual approach
>
```

Also move focus to the first interactive element (the close button) when the drawer opens. Use a `useEffect` + `ref.current?.focus()` on `openMobile` becoming true.

---

### A3 · Account page delete modal: no focus trap, no `role="dialog"`
**File:** `src/app/account/page.tsx`, lines 238–330  
**Criterion:** WCAG 2.1 SC 2.1.2; ARIA `dialog` role required (SC 4.1.2)

The delete-confirmation modal (`motion.div key="modal-backdrop"` > `motion.div key="modal-panel"`) is visually correct but missing all modal semantics:

1. No `role="dialog"` on the panel element.
2. No `aria-modal="true"` (needed to suppress background content from virtual cursor in many screen readers).
3. No `aria-labelledby` pointing at the "Confirm deletion" heading.
4. No focus trap — tabbing exits the modal into the page behind it.
5. No Escape handler on the panel (Escape on the backdrop's `onClick` only fires on backdrop clicks, not keyboard).

**Fix:**

```tsx
<motion.div
  key="modal-panel"
  role="dialog"
  aria-modal="true"
  aria-labelledby="delete-modal-title"
  onKeyDown={(e) => {
    if (e.key === "Escape") {
      setDeleteOpen(false);
      setDeleteConfirm("");
      setDeleteStatus("idle");
    }
  }}
  ...
>
  {/* existing close button */}
  <h3 id="delete-modal-title" className="text-lg font-bold text-white">
    Confirm deletion
  </h3>
  {/* rest unchanged */}
</motion.div>
```

Wrap the panel in a `FocusTrap` (or manual trap) and return focus to the "Delete my account" trigger button on close.

---

## P1 — High (colour contrast failures, missing labels on interactive elements)

### B1 · Contrast: `text-gray-400` / `text-gray-500` on dark backgrounds
**Files:** Multiple — `Navbar.tsx` line 72, `Sidebar.tsx` lines 146, 169, 177, `LessonSidebar.tsx` lines 73, 99, `globals.css` (prose-lesson p, ul)  
**Criterion:** WCAG 2.1 SC 1.4.3 Contrast (Minimum)

Tailwind's `gray-400` resolves to `#9ca3af` and `gray-500` to `#6b7280`. Against the canvas (`#0a0a12`) or surface (`#12121f`) backgrounds:

| Token | Hex | Against `canvas` | Against `surface` | Passes AA (4.5:1)? |
|---|---|---|---|---|
| `gray-400` | `#9ca3af` | ~5.9:1 | ~5.4:1 | Yes (body text OK) |
| `gray-500` | `#6b7280` | ~3.7:1 | ~3.4:1 | **No — fails for body text** |
| `gray-600` | `#4b5563` | ~2.5:1 | ~2.3:1 | **No** |

`gray-500` is used as body/label text in many places. `gray-600` appears in `LessonSidebar` (lesson number prefix, line 73) and `Sidebar` (inactive icons, line 142). Both fail SC 1.4.3 for normal text.

**Fix:** Promote `gray-500` body text to `gray-400` minimum. Promote `gray-600` icon-only or decorative text to `gray-500` (still marginal — prefer `gray-400`). Apply globally via `globals.css` baseline or fix at each callsite.

Specific callsites to fix:
- `Sidebar.tsx:146` — badge text `text-gray-400` is borderline; acceptable.
- `Sidebar.tsx:169–177` — XP fraction text `text-gray-500` → `text-gray-400`.
- `LessonSidebar.tsx:73` — lesson index `text-[10px] font-mono text-gray-600` → at minimum `text-gray-500`; but at 10 px these are below the 18 px large-text threshold so the 4.5:1 normal-text ratio applies. Change to `text-gray-400`.
- `globals.css` `.prose-lesson p`, `.prose-lesson ul` use `text-gray-300` (#d1d5db) — this passes at ~10.5:1 against canvas. OK.

### B2 · Dashboard stat pill in Navbar: no accessible label for streak/level counts
**File:** `src/components/Navbar.tsx`, lines 80–93  
**Criterion:** WCAG 2.1 SC 1.1.1 Non-text Content, SC 4.1.2 Name, Role, Value

The `<Link href="/dashboard">` pill contains `<Flame>` and `<Zap>` icon components followed by bare numbers. The icons have no `aria-label` and are not `aria-hidden`. Screen readers will announce "Flame 7 Zap Lv 3" with no context.

**Fix:**

```tsx
<Link
  href="/dashboard"
  aria-label={`Dashboard — ${streak} day streak, level ${info.level}`}
  className="..."
>
  <span className="flex items-center gap-1 text-sm font-semibold text-gold" aria-hidden="true">
    <Flame size={15} />
    {streak}
  </span>
  <span className="flex items-center gap-1 text-sm font-semibold text-accent-soft" aria-hidden="true">
    <Zap size={15} />
    Lv {info.level}
  </span>
</Link>
```

### B3 · Sidebar player panel: decorative emoji and stat icons without labels
**File:** `src/components/features/navigation/Sidebar.tsx`, lines 156–201  
**Criterion:** WCAG 2.1 SC 1.1.1, SC 4.1.2

The player panel `<Link href="/profile">` contains:
- Rank emoji `info.rank.emoji` rendered bare in a div (read as a Unicode character name by most screen readers — e.g. "seedling" for 🌱).
- `<Coins>` icon next to gold count with no label.
- `<Flame>` icon next to streak count with no label.

Screen reader output: "seedling Intern Level 1 XP 0 slash 80 (progress bar announced as "0%") seedling 0 fire 0" — no semantic meaning.

**Fix:** Add `aria-label` on the Link describing the panel purpose and hide the decorative sub-elements:

```tsx
<Link
  href="/profile"
  aria-label={`View profile — Level ${info.level} ${info.rank.name}, ${gold} gold, ${streak} day streak`}
  ...
>
  {/* suppress all decorative icons/emojis from AT */}
  <div aria-hidden="true"> ...existing content... </div>
</Link>
```

### B4 · LessonView: Reset and Hint buttons have no accessible label beyond visual text
**File:** `src/components/LessonView.tsx`, lines 244–269  
**Criterion:** WCAG 2.1 SC 4.1.2

The Reset button (line 244) and Hint button (line 257) contain icon + text and are functional, but the icon `<RotateCcw>` and `<Lightbulb>` are not hidden from AT. This results in "rotate CCW Reset" and "lightbulb Hint 3" being announced. Not a blocker but adds noise.

**Fix:** Add `aria-hidden="true"` to the `<RotateCcw>` and `<Lightbulb>` icons inside these buttons:

```tsx
<RotateCcw size={13} aria-hidden="true" /> Reset
<Lightbulb size={13} aria-hidden="true" />
```

### B5 · LessonView: "Run & Test" button missing `aria-busy` during run
**File:** `src/components/LessonView.tsx`, lines 314–326  
**Criterion:** WCAG 2.1 SC 4.1.3 Status Messages (live region), SC 4.1.2

When `running` is true the button shows a spinner but there is no live region announcing progress to screen-reader users. AT users have no feedback that the code is executing.

**Fix:**

```tsx
<button
  onClick={handleRun}
  disabled={running}
  aria-busy={running}
  aria-label={running ? "Running tests, please wait" : "Run and test your code"}
  className="btn-primary disabled:opacity-60"
>
  {running ? <Loader2 size={16} className="animate-spin" aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}
  {running ? "Running…" : "Run & Test"}
</button>
```

Also add a visually-hidden live region near the test results:

```tsx
<div role="status" aria-live="polite" className="sr-only">
  {outcome !== null
    ? `${outcome.results.filter(r => r.pass).length} of ${outcome.results.length} tests passed`
    : ""}
</div>
```

### B6 · RegexTester flag toggle buttons not announcing selected state
**File:** `src/components/features/tools/RegexTester.tsx`, lines 78–91  
**Criterion:** WCAG 2.1 SC 4.1.2 Name, Role, Value

The flag buttons (g, i, m, s) toggle on/off but use no `aria-pressed` attribute. Screen readers cannot convey their state.

**Fix:**

```tsx
<button
  key={f.key}
  onClick={() => toggleFlag(f.key)}
  aria-pressed={flags.includes(f.key)}
  className={...}
>
  {f.key} · {f.label}
</button>
```

### B7 · Login: email input has no explicit `<label>` element
**File:** `src/app/login/page.tsx`, lines 127–133  
**Criterion:** WCAG 2.1 SC 1.3.1 Info and Relationships, SC 4.1.2

The email `<input>` relies solely on `placeholder="you@example.com"` to communicate its purpose. Placeholders disappear on input and are not reliably announced as accessible labels by all screen readers/browser combinations.

**Fix:** Add an explicit label. Use `sr-only` styling to keep the visual design unchanged:

```tsx
<label htmlFor="login-email" className="sr-only">Email address</label>
<input
  id="login-email"
  type="email"
  ...
/>
```

### B8 · Account page delete modal: confirmation input has no label
**File:** `src/app/account/page.tsx`, lines 285–295  
**Criterion:** WCAG 2.1 SC 1.3.1, SC 4.1.2

The "Type DELETE to confirm" `<input>` uses only a `placeholder` for its label. Same issue as B7.

**Fix:**

```tsx
<label htmlFor="delete-confirm" className="sr-only">
  Type DELETE to confirm account deletion
</label>
<input
  id="delete-confirm"
  type="text"
  ...
/>
```

---

## P2 — Medium (keyboard navigation gaps, focus ring gaps)

### C1 · No `focus-visible` ring on most interactive elements
**File:** `src/app/globals.css` (`.btn`, `.btn-primary`, `.btn-ghost`, `.card`); also Navbar, Sidebar, LessonView  
**Criterion:** WCAG 2.1 SC 2.4.7 Focus Visible

The `.btn`, `.btn-primary`, and `.btn-ghost` utility classes in `globals.css` (lines 25–37) contain no `focus-visible:` ring. Keyboard users tabbing through the UI see no visible indicator of focus position, which fails SC 2.4.7 and the stricter SC 2.4.11 (WCAG 2.2 Focus Appearance, advisory for AA).

The only incidental ring visible is the browser's default outline, which `globals.css` does not suppress — but the dark backgrounds (`canvas: #0a0a12`, `surface: #12121f`) render the default Chrome/Firefox blue outline nearly invisible.

**Fix — add to globals.css:**

```css
@layer components {
  .btn {
    @apply inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2
      font-medium transition-all duration-150 active:scale-95
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas;
  }
}
```

Also add to anchor/Link elements that are styled without `.btn`:

```css
/* Global anchor focus ring */
a:focus-visible {
  @apply outline-none ring-2 ring-accent ring-offset-2 ring-offset-canvas rounded;
}
```

### C2 · Sidebar: active nav item uses `motion.span` as sole active indicator (color only)
**File:** `src/components/features/navigation/Sidebar.tsx`, lines 128–135  
**Criterion:** WCAG 2.1 SC 1.4.1 Use of Color

The active sidebar item is distinguished only by the animated `motion.span` glow background and `text-white` color vs `text-gray-400`. Users who perceive color poorly cannot distinguish the active page. There is no `aria-current="page"` on the active link.

**Fix:** Add `aria-current`:

```tsx
<Link
  href={item.href}
  aria-current={active ? "page" : undefined}
  ...
>
```

`aria-current="page"` also communicates active state to screen readers without any visual change.

### C3 · LessonSidebar desktop collapse button: no focus ring, tiny hit target
**File:** `src/components/LessonSidebar.tsx`, lines 122–129, 135–144  
**Criterion:** WCAG 2.1 SC 2.5.5 Target Size (Advisory AA), SC 2.4.7 Focus Visible

The `<PanelLeftClose>` / `<PanelLeftOpen>` toggle buttons use `text-gray-500 hover:text-white` with no focus ring. The collapsed state button is only the icon width (~18 px) — below the recommended 44×44 px target size.

**Fix:**

```tsx
<button
  onClick={() => setOpenDesktop(false)}
  aria-label="Collapse course map"
  className="rounded-lg p-2 text-gray-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
>
  <PanelLeftClose size={16} />
</button>
```

Increase collapsed-state button padding: `className="card sticky top-20 flex flex-col items-center gap-2 p-3 ..."`.

### C4 · Navbar: mobile menu has no `aria-modal` or focus trap
**File:** `src/components/Navbar.tsx`, lines 118–145  
**Criterion:** WCAG 2.1 SC 2.1.2

The mobile nav (`id="mobile-nav"`) is revealed below the header as a slide-in panel but lacks a focus trap. When open, tabbing can pass through to page content beneath the backdrop (if any overlay existed — in this case there is no backdrop at all). Additionally there is no Escape-to-close handler.

**Fix:** Add a `keydown` handler and either a lightweight focus trap or at minimum restrict natural tab order by appending `tabIndex={-1}` to any content scrolled behind the menu. Also add `aria-label` on the containing `<div>`:

```tsx
<div
  id="mobile-nav"
  role="menu"
  aria-label="Site navigation"
  ...
>
```

And on the nav links inside, add `role="menuitem"`. Alternatively, model the structure as a plain `<nav>` (already has a parent `<nav>`) and just add Escape-close:

```tsx
// On the wrapping header element, add:
onKeyDown={(e) => { if (e.key === "Escape" && open) setOpen(false); }}
```

### C5 · XPBar: progress bar has no accessible label or value
**File:** `src/components/XPBar.tsx`, lines 17–24  
**Criterion:** WCAG 2.1 SC 4.1.2 Name, Role, Value

The `<div>` progress bar has no ARIA role. Screen readers read only the surrounding text (rank/level) and skip the bar entirely. The bar gives no machine-readable progress value.

**Fix:**

```tsx
<div
  role="progressbar"
  aria-label="XP progress"
  aria-valuenow={info.xpIntoLevel}
  aria-valuemin={0}
  aria-valuemax={info.xpForLevel}
  className="h-3 w-full overflow-hidden rounded-full border border-line bg-surface-2"
>
  <motion.div ... />
</div>
```

Same fix applies to the mini XP bar in `Sidebar.tsx` (lines 183–189) and the progress bar in `LessonSidebar.tsx` (lines 101–109) — use `role="progressbar"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`.

### C6 · DailyQuests: progress bars missing ARIA roles
**File:** `src/components/features/quests/DailyQuests.tsx`, lines 51–59  
**Criterion:** WCAG 2.1 SC 4.1.2

Same issue as C5. The `motion.div` inner bars are purely visual. Add `role="progressbar"` with `aria-label={q.title}`, `aria-valuenow={progress}`, `aria-valuemin={0}`, `aria-valuemax={q.goal}` on the outer track div.

### C7 · Playground: language tabs have no `role="tab"` or `aria-selected`
**File:** `src/components/features/playground/Playground.tsx`, lines 66–79  
**Criterion:** WCAG 2.1 SC 4.1.2

The three language selector buttons (JS / Python / SQL) function as tabs but carry no ARIA tab-group semantics. They should use `role="tablist"` + `role="tab"` + `aria-selected`.

**Fix:**

```tsx
<div role="tablist" aria-label="Programming language" className="flex items-center gap-2">
  {ORDER.map((l) => (
    <button
      key={l}
      role="tab"
      aria-selected={l === lang}
      onClick={() => switchLang(l)}
      className={...}
    >
      {LANGUAGES[l].label}
    </button>
  ))}
  ...
</div>
```

---

## P3 — Low (reduced-motion, minor UX, and advisory)

### D1 · Framer Motion animations: most transitions lack `prefers-reduced-motion` guards
**Files:** `Sidebar.tsx` lines 76–83, 130–133, 184–188; `LessonSidebar.tsx` lines 163–174; `LessonView.tsx` lines 273–277, 341–363; `LevelUpToast.tsx` lines 25–31; `PathQuiz.tsx` lines 70–124; `account/page.tsx` lines 239–257  
**Criterion:** WCAG 2.1 SC 2.3.3 Animation from Interactions (Level AAA advisory; however failure to accommodate can cause vestibular harm)

`celebrate.ts` correctly checks `prefers-reduced-motion` (line 9) and skips confetti. `CodeEditor.tsx` correctly disables `smoothScrolling` and uses `cursorBlinking: "solid"` when reduced motion is set. However the Framer Motion animations throughout the app — the sidebar active-item spring, drawer slide-in, toast pop-in, and hint fade — do not check `prefers-reduced-motion`.

**Fix (global — preferred approach):** Add a Framer Motion global config in a client provider component:

```tsx
// src/components/MotionConfig.tsx (new file)
"use client";
import { MotionConfig } from "framer-motion";

export function ReducedMotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      {children}
    </MotionConfig>
  );
}
```

Wrap the app in this provider (in `layout.tsx` — flagged for integrator). With `reducedMotion="user"`, Framer Motion respects the OS preference and removes transition durations automatically.

**Integration note:** Add `<ReducedMotionProvider>` around children in `layout.tsx`.

### D2 · LevelUpToast: spring animation not gated on reduced-motion
**File:** `src/components/LevelUpToast.tsx`, lines 25–31  
**Criterion:** Same as D1

This component specifically uses `type: "spring"` entry/exit animations. Covered by the global fix in D1, but isolated here for completeness. If the MotionConfig provider approach is not used, add:

```tsx
// At component top:
const reduced = typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

// On motion.div:
transition={{ type: reduced ? "tween" : "spring", duration: reduced ? 0 : undefined, stiffness: 200, damping: 18 }}
```

### D3 · `pop-in` CSS animation in tailwind.config.ts not guarded by `prefers-reduced-motion`
**File:** `tailwind.config.ts`, lines 31–37  
**Criterion:** WCAG 2.1 SC 2.3.3 (advisory)

The `pop-in` keyframe animation (`animation: "pop-in 0.25s ease-out"`) is defined globally. Any element using `.animate-pop-in` will animate regardless of system preference.

**Fix — add to globals.css:**

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

This is the standard WCAG-recommended blanket approach and also covers any third-party CSS that slips through.

### D4 · ProGate: `motion.div` entry animation, no reduced-motion guard
**File:** `src/components/features/billing/ProGate.tsx`, lines 19–23  
**Criterion:** Same as D1 — covered by the global MotionConfig fix in D1.

### D5 · AppShell mobile header: hamburger button returns focus to nothing on sidebar close
**File:** `src/components/layout/AppShell.tsx`, lines 27–34  
**Criterion:** WCAG 2.1 SC 2.4.3 Focus Order

When the mobile sidebar is closed (e.g., the user navigates to a link inside it), focus is not explicitly returned to the hamburger `<Menu>` button that opened it. Focus lands on the `<body>` or is lost, requiring the user to re-navigate from the top.

**Fix:** Store a ref to the trigger button and call `.focus()` on sidebar close:

```tsx
const triggerRef = useRef<HTMLButtonElement>(null);

// Pass onClose callback that also returns focus:
<AnimatePresence>
  {open && (
    <Sidebar
      open
      onClose={() => {
        setOpen(false);
        triggerRef.current?.focus();
      }}
    />
  )}
</AnimatePresence>

<button ref={triggerRef} onClick={() => setOpen(true)} ...>
```

### D6 · `<main>` landmark missing `id` for skip link
**File:** `src/app/layout.tsx`, line 73  
**Criterion:** WCAG 2.1 SC 2.4.1 Bypass Blocks

There is no skip-navigation link. Users who navigate by keyboard (and especially screen-reader users who prefer linear navigation) must tab through the full Navbar on every page load before reaching main content. The `<main>` element in `layout.tsx` has no `id`, so a skip link cannot target it.

**Fix:** Add a skip link as the very first element in `<body>`, and an `id` on `<main>`:

```tsx
// In layout.tsx (flagged for integrator — file is reserved):
<body>
  <a
    href="#main-content"
    className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-2 focus:left-2 focus:rounded-lg focus:bg-surface focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:ring-2 focus:ring-accent"
  >
    Skip to main content
  </a>
  ...
  <main id="main-content" className="min-h-[60vh]">{children}</main>
</body>
```

**Integration note:** Both changes are in the reserved `layout.tsx` — document as integrator action.

### D7 · `<html lang="en">` — present and correct
**File:** `src/app/layout.tsx`, line 67  
No action needed. `lang="en"` is set.

### D8 · PathQuiz step transitions: no announcement for step change
**File:** `src/components/features/marketing/PathQuiz.tsx`, lines 69–168  
**Criterion:** WCAG 2.1 SC 4.1.3 Status Messages

When the user picks a goal and the view transitions to the language step, nothing announces the change to screen-reader users (no live region). The `AnimatePresence` swap is visual-only.

**Fix:** Add a `role="status"` element that reflects current step:

```tsx
<div role="status" aria-live="polite" className="sr-only">
  {!goal ? "Step 1 of 2: choose your goal" : !lang ? "Step 2 of 2: choose your language" : `Recommended path: ${path?.title}`}
</div>
```

---

## Summary Table

| ID | Severity | Criterion | Component | Issue |
|---|---|---|---|---|
| A1 | P0 Critical | SC 2.1.2 | Sidebar | No focus trap in mobile drawer |
| A2 | P0 Critical | SC 2.1.2 | LessonSidebar | No focus trap or Escape close in mobile drawer |
| A3 | P0 Critical | SC 2.1.2, 4.1.2 | account/page | Delete modal: no dialog role, no focus trap, no Escape |
| B1 | P1 High | SC 1.4.3 | Global | `gray-500`/`gray-600` text fails contrast ratio |
| B2 | P1 High | SC 1.1.1, 4.1.2 | Navbar | Streak/level pill has no accessible label |
| B3 | P1 High | SC 1.1.1, 4.1.2 | Sidebar | Player panel stats unlabelled |
| B4 | P1 High | SC 4.1.2 | LessonView | Icon elements in buttons not hidden from AT |
| B5 | P1 High | SC 4.1.3, 4.1.2 | LessonView | Run button missing `aria-busy`, no live region for results |
| B6 | P1 High | SC 4.1.2 | RegexTester | Flag toggles missing `aria-pressed` |
| B7 | P1 High | SC 1.3.1, 4.1.2 | login/page | Email input: placeholder only, no `<label>` |
| B8 | P1 High | SC 1.3.1, 4.1.2 | account/page | DELETE confirm input: placeholder only, no `<label>` |
| C1 | P2 Medium | SC 2.4.7 | globals.css | No `focus-visible` ring on `.btn`/`.btn-primary`/`.btn-ghost` |
| C2 | P2 Medium | SC 1.4.1 | Sidebar | Active nav item: color-only distinction, no `aria-current` |
| C3 | P2 Medium | SC 2.5.5, 2.4.7 | LessonSidebar | Collapse button: no focus ring, undersized target |
| C4 | P2 Medium | SC 2.1.2 | Navbar | Mobile menu: no Escape close |
| C5 | P2 Medium | SC 4.1.2 | XPBar | Progress bar missing `role="progressbar"` and value attributes |
| C6 | P2 Medium | SC 4.1.2 | DailyQuests | Quest progress bars missing ARIA roles |
| C7 | P2 Medium | SC 4.1.2 | Playground | Language selector missing tab/tablist roles |
| D1 | P3 Low | SC 2.3.3 | Global | Framer Motion animations not gated on `prefers-reduced-motion` |
| D2 | P3 Low | SC 2.3.3 | LevelUpToast | Spring animation not guarded |
| D3 | P3 Low | SC 2.3.3 | globals.css | No blanket `prefers-reduced-motion` CSS rule |
| D4 | P3 Low | SC 2.3.3 | ProGate | Entry animation not guarded |
| D5 | P3 Low | SC 2.4.3 | AppShell | Focus not returned to trigger on sidebar close |
| D6 | P3 Low | SC 2.4.1 | layout.tsx | No skip-to-content link; `<main>` has no id |
| D8 | P3 Low | SC 4.1.3 | PathQuiz | No live-region announcement on step change |
