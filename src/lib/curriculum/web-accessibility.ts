import type { Module } from "./types";

// Web Accessibility Basics — conceptual/practical course for developers and
// designers who want to build inclusive products. All quiz/reading lessons.
// Covers the "why", WCAG standards, semantic HTML, ARIA, keyboard navigation,
// color/contrast, assistive tech, and testing. Accurate as of 2026.
export const webAccessibility: Module = {
  slug: "web-accessibility",
  title: "Web Accessibility Basics",
  description:
    "Learn to build websites everyone can use. Understand WCAG guidelines, semantic HTML, ARIA, keyboard navigation, color contrast, screen readers, and how to test for accessibility — practical skills that are legally required in many markets and make your products better for all users.",
  emoji: "♿",
  gradient: "from-blue-500/20 to-cyan-500/10",
  tagline:
    "Build websites that work for everyone — blind users, keyboard navigators, people with motor or cognitive differences — with the WCAG standards and modern tooling used in production teams.",
  keywords: [
    "web accessibility",
    "WCAG",
    "ARIA",
    "screen reader",
    "keyboard navigation",
    "color contrast",
    "accessible web design",
    "a11y",
    "inclusive design",
    "semantic HTML accessibility",
  ],
  lessons: [
    {
      slug: "why-accessibility-matters",
      title: "Why Accessibility Matters",
      blurb: "The moral case, the legal reality, and the hidden UX upside of building inclusively.",
      xp: 20,
      kind: "quiz",
      content: `# Why Accessibility Matters

Roughly **1 in 6 people worldwide** lives with some form of disability — visual,
auditory, motor, cognitive, or speech-related. Many more experience **situational
limitations**: a broken arm, bright sunlight on a phone screen, a noisy environment
where captions are essential.

When a website isn't accessible, real people can't apply for jobs, access healthcare,
buy products, or participate in civic life. That isn't a niche edge case — it's a
large slice of every audience.

## The Legal Reality

Accessibility is not optional in many markets. Laws and regulations that mandate it
include:

- **ADA (Americans with Disabilities Act)** — US courts have repeatedly ruled that
  websites are covered. Businesses face lawsuits when digital properties are
  inaccessible.
- **Section 508** — US federal agencies and federally funded organizations must
  meet accessibility standards.
- **EN 301 549 / European Accessibility Act (EAA)** — EU requirements phased in
  through 2025–2030, covering most public-facing digital services and products.
- **AODA (Canada), DDA (UK)**, and equivalents in dozens of other countries.

## The Business and UX Upside

Accessible products are better products:

- **SEO improves** — accessible HTML (semantic structure, alt text, clear headings)
  is exactly what search engines index best.
- **Larger addressable market** — you reach users you'd otherwise exclude.
- **Lower legal risk** — proactive compliance avoids expensive litigation.
- **Better for everyone** — captions help people in noisy gyms; high contrast helps
  people in sunlight; keyboard nav helps power users everywhere.

The phrase "curb cut effect" comes from wheelchair ramps that turned out to help
cyclists, parents with strollers, and delivery workers. Accessibility is a forcing
function for better design.`,
      questions: [
        {
          prompt: "Approximately what share of people worldwide lives with some form of disability?",
          options: [
            "About 1 in 100 — a very small minority",
            "About 1 in 6 — a significant portion of any audience",
            "Only people born with conditions, which is under 1%",
          ],
          answer: 1,
          explanation:
            "The World Health Organization estimates around 1 in 6 people globally has a significant disability. Add situational impairments (bright sun, broken arm, noise) and accessibility affects far more of your audience than most teams realize.",
        },
        {
          prompt: "Which best describes the legal status of web accessibility in the United States?",
          options: [
            "It's purely voluntary — no US law currently applies to websites",
            "The ADA has been applied to websites through court rulings, creating real legal exposure for inaccessible sites",
            "Only government websites must comply; private businesses are exempt",
          ],
          answer: 1,
          explanation:
            "US federal courts have repeatedly held that websites are places of public accommodation under the ADA. Private businesses — especially those with physical locations — face ongoing litigation risk for inaccessible digital properties.",
        },
        {
          prompt: "The 'curb cut effect' refers to:",
          options: [
            "The cost savings from fixing accessibility issues early rather than retrofitting",
            "How accessibility features designed for one group end up benefiting a much wider population",
            "The legal requirement to install physical ramps before launching a website",
          ],
          answer: 1,
          explanation:
            "Curb cuts were designed for wheelchair users but turned out to help cyclists, parents with strollers, delivery workers, and travelers with luggage. Digital equivalents (captions, high contrast, keyboard nav) follow the same pattern — they help everyone.",
        },
      ],
      explanation:
        "Accessibility is not a niche feature: it's a legal requirement in most major markets, it improves SEO and UX, and it reflects the reality that 1 in 6 people has a disability.",
    },
    {
      slug: "wcag-and-the-standards",
      title: "WCAG & the Standards",
      blurb: "What WCAG is, what the levels mean, and how POUR gives you a mental model for everything.",
      xp: 22,
      kind: "quiz",
      content: `# WCAG & the Standards

The globally accepted benchmark for web accessibility is **WCAG — the Web Content
Accessibility Guidelines**, published by the W3C (the body that standardizes the
web). Most national laws either reference WCAG directly or adopt it by name.

## WCAG Versions

- **WCAG 2.1** (2018) — the baseline that most legal frameworks currently reference.
  Adds mobile, low vision, and cognitive improvements over 2.0.
- **WCAG 2.2** (2023) — the current stable version. Adds nine new success criteria,
  especially around focus indicators, authentication, and dragging alternatives.
- **WCAG 3.0** — a major rethink in progress; not expected to replace 2.x as a
  legal reference for some years.

When in doubt: target **WCAG 2.2 AA** — that's the level most regulations require
and most enterprise clients will ask for.

## Conformance Levels

WCAG has three levels:

| Level | What it means |
|-------|---------------|
| **A** | Minimum — removes the most critical barriers |
| **AA** | Standard — what laws and procurement typically require |
| **AAA** | Enhanced — aspirational; not required as a blanket target |

## The POUR Principles

Every WCAG success criterion maps to one of four principles. If you learn POUR,
you have a mental model for the entire standard:

1. **Perceivable** — users can perceive all content (not just visually).
   *Example: providing text alternatives for images.*
2. **Operable** — the UI can be operated by everyone.
   *Example: all functionality works with a keyboard.*
3. **Understandable** — content and navigation are clear and predictable.
   *Example: error messages explain what the user needs to fix.*
4. **Robust** — content works with current and future assistive technologies.
   *Example: valid HTML that screen readers can parse reliably.*`,
      questions: [
        {
          prompt: "What conformance level do most accessibility laws and enterprise procurement requirements specify?",
          options: [
            "WCAG Level A — the minimum baseline",
            "WCAG Level AA — the standard that balances coverage and feasibility",
            "WCAG Level AAA — the highest level, required everywhere",
          ],
          answer: 1,
          explanation:
            "WCAG Level AA is what regulations like the EAA, Section 508 technical standards, and most enterprise contracts specify. AAA is aspirational; A alone is insufficient.",
        },
        {
          prompt: "Which WCAG version is the current stable standard as of 2026?",
          options: [
            "WCAG 2.0 — the original 2008 version still in force",
            "WCAG 2.2 — published in 2023, the current stable version most teams target",
            "WCAG 3.0 — the newest, fully replacing 2.x",
          ],
          answer: 1,
          explanation:
            "WCAG 2.2 is the current stable standard. WCAG 3.0 is in development but not yet a legal reference. WCAG 2.1 is still widely cited, but 2.2 is the forward target.",
        },
        {
          prompt: "The 'O' in POUR stands for Operable. Which scenario violates this principle?",
          options: [
            "An image has no alt text",
            "A dropdown menu that can only be opened by hovering with a mouse, with no keyboard alternative",
            "An error message that is written in complex legal language",
          ],
          answer: 1,
          explanation:
            "Operable means every function must be accessible via keyboard (and other input methods). Hover-only interactions lock out keyboard and switch-access users. Missing alt text is a Perceivable issue; unclear error messages are an Understandable issue.",
        },
      ],
      explanation:
        "Target WCAG 2.2 AA. Memorize POUR — Perceivable, Operable, Understandable, Robust — and you have a mental model for every accessibility success criterion.",
    },
    {
      slug: "semantic-html-and-structure",
      title: "Semantic HTML & Page Structure",
      blurb: "The right element is the most powerful accessibility tool you have — before ARIA, before JS.",
      xp: 22,
      kind: "quiz",
      content: `# Semantic HTML & Page Structure

The single highest-leverage accessibility skill is **using the correct HTML element
for the job**. Browsers and assistive technologies already know how to handle
\`<button>\`, \`<nav>\`, \`<h1>\`, and \`<label>\`. When you use a \`<div>\` instead,
you throw away all of that built-in behavior and have to rebuild it manually —
usually imperfectly.

## Landmark Elements

Screen reader users often navigate a page by jumping between **landmarks** — major
sections that communicate page structure:

| Element | Role |
|---------|------|
| \`<header>\` | Banner region |
| \`<nav>\` | Navigation region |
| \`<main>\` | Main content (only one per page) |
| \`<aside>\` | Complementary content |
| \`<footer>\` | Content info region |
| \`<section>\` | Generic region (needs an accessible name) |

## Heading Hierarchy

Screen reader users frequently navigate by headings, jumping from \`h1\` to \`h2\` to
\`h3\` to scan the page. Rules:

- **One \`<h1>\` per page**, matching the page title.
- **Don't skip levels** — don't jump from \`h1\` to \`h4\`; a screen reader user will
  assume they missed a section.
- **Headings convey structure, not size** — use CSS for visual sizing; never pick
  a heading level just because it "looks right."

## Interactive Elements

- Use \`<button>\` for actions and \`<a href>\` for navigation. A \`<div>\` with a click
  handler gets no keyboard focus, no role announcement, and no enter/space activation.
- Use \`<label>\` (or \`aria-label\`) with every form field — \`placeholder\` text
  disappears when the user starts typing and is not a substitute for a label.
- Use \`<table>\` with \`<th scope="col/row">\` for data tables, not for layout.

## Skip Navigation

Provide a **"Skip to main content"** link as the first focusable element on the page.
Keyboard users (and screen reader users who tab through pages) shouldn't have to
traverse the entire nav on every page load.`,
      questions: [
        {
          prompt: "A developer builds a clickable card using `<div class='card' onclick='...'>`. What accessibility problem does this create?",
          options: [
            "None — div elements work the same as button elements when given an onclick handler",
            "The div gets no keyboard focus, no semantic role, and no built-in enter/space activation, excluding keyboard and screen reader users",
            "The problem is only cosmetic — it looks different in high-contrast mode",
          ],
          answer: 1,
          explanation:
            "A plain <div> is not in the tab order, announces no role to assistive tech, and doesn't respond to Enter/Space by default. A <button> gives all of that for free. Using the correct element is always preferred over ARIA workarounds.",
        },
        {
          prompt: "Which heading structure is correct for an accessible page?",
          options: [
            "h1 → h3 → h4 (skipping h2 because the design called for a smaller heading)",
            "h1 → h2 → h3 (sequential, never skipping levels)",
            "Multiple h1 elements on every page so screen reader users have more jumping points",
          ],
          answer: 1,
          explanation:
            "Heading levels must be sequential. Skipping levels confuses screen reader users who rely on heading navigation. Only one h1 per page is the standard practice, matching the page title.",
        },
        {
          prompt: "Why is `placeholder` text alone not an acceptable substitute for a `<label>` on a form field?",
          options: [
            "It is acceptable — placeholders are read by all screen readers the same way labels are",
            "Placeholder text disappears as soon as the user starts typing, leaving them with no persistent description of the field",
            "The only issue is that placeholder text is usually gray and low-contrast",
          ],
          answer: 1,
          explanation:
            "Once the user types, the placeholder vanishes. If they pause or look away, they can't tell what field they're in. A visible, persistent <label> (or a visually hidden one with aria-label) is required.",
        },
      ],
      explanation:
        "Use the correct HTML element before reaching for ARIA or JavaScript. Semantic landmarks, sequential headings, proper labels, and real buttons eliminate most accessibility failures before testing even begins.",
    },
    {
      slug: "aria-and-roles",
      title: "ARIA: Filling the Gaps",
      blurb: "When native HTML isn't enough, ARIA adds roles, states, and properties — but there's a golden rule.",
      xp: 23,
      kind: "quiz",
      content: `# ARIA: Filling the Gaps

**ARIA (Accessible Rich Internet Applications)** is a set of HTML attributes that
let you communicate semantics to assistive technologies when native HTML elements
alone aren't sufficient.

The W3C's golden rule for ARIA: **"No ARIA is better than bad ARIA."** ARIA can
actively break the experience for screen reader users if misused. Always prefer
a native HTML element; reach for ARIA only when you need to fill a genuine gap.

## The Three Pillars of ARIA

**1. Roles** — what an element *is*. Added with \`role="..."\`:
- \`role="dialog"\` on a modal overlay
- \`role="tablist"\`, \`role="tab"\`, \`role="tabpanel"\` on a tab widget
- \`role="alert"\` on a live error message (announces immediately)

**2. Properties** — stable characteristics. Added as \`aria-*\` attributes:
- \`aria-label="Close dialog"\` — provides an accessible name when visible text isn't available
- \`aria-labelledby="heading-id"\` — links an element to a visible label elsewhere
- \`aria-describedby="hint-id"\` — links to additional descriptive text

**3. States** — dynamic values that change as the user interacts:
- \`aria-expanded="true/false"\` — on an accordion or dropdown
- \`aria-checked="true/false"\` — on a custom toggle
- \`aria-disabled="true"\` — signals disabled state without removing focus
- \`aria-hidden="true"\` — hides decorative elements from the accessibility tree

## Common Patterns

- **Live regions** (\`aria-live="polite"\` or \`aria-live="assertive"\`) announce dynamic
  content changes — like search results loading or a form submission success message —
  to screen readers without requiring focus to move.
- **aria-required="true"** complements HTML \`required\` for older assistive tech.
- Never use \`aria-hidden="true"\` on a focusable element; it hides from AT but
  keyboard focus can still reach it, creating a confusing invisible element.`,
      questions: [
        {
          prompt: "The W3C's golden rule for ARIA is:",
          options: [
            "Always add ARIA roles to every element so screen readers have maximum information",
            "No ARIA is better than bad ARIA — prefer native HTML and only add ARIA to fill genuine gaps",
            "ARIA is required on every interactive element, even native buttons and links",
          ],
          answer: 1,
          explanation:
            "Incorrect ARIA usage actively breaks the screen reader experience. The guidance is: use native HTML first; add ARIA only when native semantics fall short, and do so correctly.",
        },
        {
          prompt: "A custom dropdown chevron icon (purely decorative) is added to the DOM. What ARIA attribute should it have?",
          options: [
            "aria-label describing what the icon looks like",
            "aria-hidden=\"true\" so assistive technology ignores it",
            "role=\"img\" so screen readers know it is a graphic",
          ],
          answer: 1,
          explanation:
            "Decorative images and icons carry no meaningful information and should be hidden from the accessibility tree with aria-hidden=\"true\". Announcing them adds noise that makes screen reader use harder.",
        },
        {
          prompt: "An accordion section can be expanded or collapsed. Which ARIA attribute correctly communicates its current state?",
          options: [
            "aria-expanded=\"true\" or aria-expanded=\"false\" on the trigger button",
            "aria-checked=\"true\" or aria-checked=\"false\" — the same attribute used for checkboxes",
            "aria-disabled=\"true\" when the section is closed",
          ],
          answer: 0,
          explanation:
            "aria-expanded is the correct state for elements that toggle open/closed (accordions, dropdowns, disclosure widgets). aria-checked is specifically for checkbox and radio patterns; aria-disabled means the element cannot be interacted with.",
        },
      ],
      explanation:
        "ARIA fills gaps native HTML can't cover — roles name what an element is, properties describe stable traits, and states reflect dynamic changes. Use it sparingly and correctly; wrong ARIA is worse than no ARIA.",
    },
    {
      slug: "keyboard-and-focus",
      title: "Keyboard & Focus Management",
      blurb: "Every interactive feature must be operable with a keyboard — and focus must always be visible and logical.",
      xp: 23,
      kind: "quiz",
      content: `# Keyboard & Focus Management

Many people cannot use a mouse: people with motor disabilities, power users who
prefer keyboard efficiency, and anyone using a switch device or keyboard emulator.
**Full keyboard accessibility is not a bonus — it is a WCAG AA requirement.**

## The Fundamental Rules

1. **Every interactive element must be reachable by Tab** and operable with Enter
   or Space (for buttons) or arrow keys (for grouped components like menus, tabs,
   and radio buttons).
2. **Focus order must be logical** — the tab sequence should follow the reading
   order of the page. Reordering elements with CSS flex/grid order or
   \`position: absolute\` can break this silently.
3. **Focus must always be visible** — WCAG 2.2 added SC 2.4.11 (Minimum) and
   2.4.12 (Enhanced) specifically for focus indicators. Never write
   \`outline: none\` or \`outline: 0\` on focused elements without providing a
   clear custom indicator.

## The Tab Index

- \`tabindex="0"\` — adds an element to the natural tab order (use for custom
  interactive elements that aren't natively focusable).
- \`tabindex="-1"\` — makes an element programmatically focusable via JavaScript
  \`.focus()\` but removes it from the tab order (use to manage focus in dialogs
  and custom widgets without cluttering Tab flow).
- \`tabindex="1"\` or higher — **almost always wrong**. Positive tabindex overrides
  the natural order and creates confusing, hard-to-maintain tab sequences. Don't use it.

## Modal Focus Traps

When a modal dialog opens, keyboard focus must be **trapped inside it** until the
dialog closes. If focus can escape a modal, a keyboard user will interact with
hidden background content. On close, return focus to the element that triggered
the dialog (usually the button that opened it).

## Skip Links

A "Skip to main content" anchor at the top of the page lets keyboard users bypass
repetitive navigation. It can be visually hidden until it receives focus (which is
acceptable and common), but it must be visible and functional when focused.`,
      questions: [
        {
          prompt: "A developer writes `button:focus { outline: none; }` in their CSS. What does this cause?",
          options: [
            "No accessibility problem — modern browsers draw their own focus styles regardless",
            "Keyboard users lose the visible focus indicator, making it impossible to tell which element is active",
            "The button becomes non-focusable and is removed from the tab order",
          ],
          answer: 1,
          explanation:
            "Removing the outline without providing a custom replacement makes focused elements visually indistinguishable from unfocused ones. WCAG 2.2 SC 2.4.11 explicitly requires a minimum visible focus indicator.",
        },
        {
          prompt: "What is the correct use of `tabindex=\"-1\"`?",
          options: [
            "Making an element the first stop in the tab order",
            "Allowing JavaScript to programmatically focus an element without adding it to the natural tab sequence",
            "Permanently disabling keyboard access to an element",
          ],
          answer: 1,
          explanation:
            "tabindex=\"-1\" is the right tool for elements you need to focus programmatically (like a modal container or an error summary) without polluting the Tab flow for users navigating through the page.",
        },
        {
          prompt: "A modal dialog opens. Where should keyboard focus go next, and what should happen when the modal closes?",
          options: [
            "Focus stays wherever it was; users navigate back to the dialog themselves",
            "Focus moves into the dialog and is trapped there; on close, focus returns to the element that triggered the modal",
            "Focus jumps to the browser address bar, then users tab back into the page",
          ],
          answer: 1,
          explanation:
            "Focus trapping inside the modal prevents keyboard users from interacting with hidden background content. Returning focus to the trigger on close preserves their place in the page — a critical step most custom dialogs omit.",
        },
      ],
      explanation:
        "Every interaction must be keyboard-reachable, focus must always be visible, and modal dialogs require explicit focus trapping and restoration. These three rules cover the bulk of keyboard accessibility failures.",
    },
    {
      slug: "color-contrast-and-visuals",
      title: "Color, Contrast & Visual Design",
      blurb: "Contrast ratios, color-not-alone, and text sizing — the visual rules that unlock readability for millions.",
      xp: 22,
      kind: "quiz",
      content: `# Color, Contrast & Visual Design

Visual design choices — color, contrast, text size — are among the most common
sources of accessibility failures, and among the easiest to check and fix early.

## Contrast Ratios (WCAG AA)

WCAG defines minimum contrast between text and its background:

| Content type | WCAG AA minimum | WCAG AAA |
|--------------|-----------------|----------|
| Normal text (< 18pt / < 14pt bold) | **4.5:1** | 7:1 |
| Large text (≥ 18pt, or ≥ 14pt bold) | **3:1** | 4.5:1 |
| UI components & graphics (non-text) | **3:1** | — |

Tools like the **WebAIM Contrast Checker**, browser DevTools, and design tool
plugins (Figma, Sketch) calculate this for you instantly. There is no excuse for
shipping low-contrast designs when checking takes seconds.

## Color Is Not Enough

WCAG SC 1.4.1: **"Do not use color as the only visual means of conveying
information."** If a form shows errors in red and success in green, a colorblind
user sees two indistinguishable states. Fix: always pair color with an icon, a
text label, or a pattern.

- Error: red border **+** error icon **+** "Error: field is required" text.
- Required fields: red asterisk **+** a legend that says "* indicates required."

## Text Sizing and Spacing (WCAG 1.4.4 and 1.4.12)

- Text must remain readable when browser text zoom is set to **200%** without
  overlapping or horizontal scroll. Use relative units (\`rem\`, \`em\`) not \`px\`
  for font sizes.
- WCAG 1.4.12 (Text Spacing) requires that user-defined spacing overrides
  (line height, letter spacing, word spacing) do not break layout or clip content.
  Design with flexible containers, not fixed pixel heights.

## Motion and Flashing

- WCAG 2.3.1: no content may flash more than **3 times per second** (risk of
  seizures in photosensitive users).
- WCAG 2.3.3 (AAA): provide a way to disable non-essential animations. The
  \`prefers-reduced-motion\` CSS media query lets you respect the OS-level setting
  that many users with vestibular disorders rely on.`,
      questions: [
        {
          prompt: "Normal body text must meet which minimum contrast ratio against its background to pass WCAG AA?",
          options: [
            "2:1 — just slightly different from the background color",
            "4.5:1 — the WCAG AA threshold for normal-sized text",
            "7:1 — the AAA threshold is required for all text",
          ],
          answer: 1,
          explanation:
            "WCAG AA requires 4.5:1 for normal text and 3:1 for large text (18pt+ or 14pt+ bold). 7:1 is the AAA enhanced level. Most teams target AA as the minimum.",
        },
        {
          prompt: "A form marks required fields with a red asterisk only. A colorblind user submits the form without filling required fields. What WCAG principle does this violate?",
          options: [
            "Robustness — the HTML is invalid",
            "Perceivable — specifically SC 1.4.1, which prohibits using color as the only means of conveying information",
            "Understandable — the label text is too complex",
          ],
          answer: 1,
          explanation:
            "SC 1.4.1 (Use of Color) requires that any information conveyed by color is also available through another means — text, icon, pattern, or shape. A legend like '* indicates required' plus the asterisk satisfies this.",
        },
        {
          prompt: "Why should font sizes use `rem` or `em` instead of `px` for accessibility?",
          options: [
            "Pixel values are not supported in modern browsers",
            "Relative units scale with the user's browser text-size preference, while px values do not, breaking WCAG 1.4.4 (Resize Text)",
            "rem and em values look better in developer tools",
          ],
          answer: 1,
          explanation:
            "WCAG 1.4.4 requires text to remain readable at 200% browser text zoom. Fixed px sizes ignore the user's font preferences. Relative units (rem based on root font size, em based on parent) scale correctly.",
        },
      ],
      explanation:
        "Check contrast with a tool (4.5:1 for body text, 3:1 for large text and UI). Never use color alone to convey meaning. Use relative font units so text scales with user preferences.",
    },
    {
      slug: "testing-and-shipping-accessible-products",
      title: "Testing & Shipping Accessible Products",
      blurb: "Capstone: combine automated tools, manual keyboard checks, and screen reader testing into a workflow that catches real issues before users do.",
      xp: 25,
      kind: "quiz",
      content: `# Testing & Shipping Accessible Products

You now understand the why, the standards, semantic HTML, ARIA, keyboard
behavior, and visual requirements. The final skill is turning that knowledge
into a **repeatable testing workflow** that catches issues before they ship.

## Automated Testing (catches ~30–40% of issues)

Automated tools are fast and catch obvious failures — missing alt text, contrast
failures, missing labels. They cannot catch most interaction or logic problems.

- **axe DevTools** (browser extension) — the industry standard. Also available as
  a Playwright/Cypress plugin for CI integration.
- **Lighthouse** (built into Chrome DevTools) — quick accessibility audit alongside
  performance.
- **ESLint jsx-a11y** — static analysis catches common patterns in React/JSX at
  write time.
- **WAVE** (WebAIM) — visual overlay that annotates errors directly on the page.

## Manual Testing (catches the other 60–70%)

**1. Keyboard-only test** — unplug your mouse. Tab through every page and workflow.
Verify: focus is always visible, tab order is logical, modals trap focus, nothing
requires hover, every action has a keyboard equivalent.

**2. Screen reader testing** — the most important manual check. Common combinations:
- **NVDA + Firefox** (Windows, free)
- **JAWS + Chrome** (Windows, enterprise standard)
- **VoiceOver + Safari** (macOS/iOS, built-in — press Cmd+F5)
- **TalkBack** (Android, built-in)

You don't need to be an expert: navigate by headings (H key in NVDA/JAWS), by
landmarks (D key), and by links/buttons (K key). Can you understand the page?
Can you complete the main tasks?

**3. Zoom to 200%** — browser text zoom, not page zoom. Check that text and
containers reflow without clipping or overflow.

**4. Disable CSS** or use the WCAG color contrast checker to spot reliance on
color alone.

## Fitting Accessibility into Your Workflow

- **Design phase**: use contrast-checking plugins in Figma/Sketch; flag keyboard
  flows in wireframes; specify focus styles explicitly.
- **Development phase**: lint with jsx-a11y; run axe in your PR CI pipeline; add
  keyboard testing to your local checklist.
- **QA phase**: include a dedicated keyboard and screen reader pass; treat
  accessibility bugs with the same severity as functional bugs.
- **Ongoing**: set up automated axe scans against production on a schedule.

No single tool catches everything. The combination of automated scanning +
keyboard test + at least one screen reader pass covers the vast majority of
real-world issues.`,
      questions: [
        {
          prompt: "Automated accessibility tools like axe and Lighthouse typically catch what proportion of real-world accessibility issues?",
          options: [
            "Nearly 100% — if an automated audit passes, the page is accessible",
            "Roughly 30–40% — mostly obvious structural failures; interaction and logic issues require manual testing",
            "Under 5% — automated tools are not useful and should be skipped",
          ],
          answer: 1,
          explanation:
            "Automated tools excel at catching structural issues (missing alt text, contrast failures, missing labels) but cannot understand interaction flows, focus management logic, or whether a screen reader experience makes sense. Both automated and manual testing are required.",
        },
        {
          prompt: "During a keyboard-only test you discover that a date-picker widget can be opened by tabbing to the trigger button, but closing it requires clicking the X with a mouse. This is:",
          options: [
            "Acceptable — complex widgets are exempt from keyboard requirements",
            "A WCAG failure — all functionality, including closing the widget, must be operable via keyboard",
            "Only a problem for blind users, not keyboard users",
          ],
          answer: 1,
          explanation:
            "WCAG SC 2.1.1 (Keyboard) requires all functionality to be available via keyboard unless the action is inherently pointer-based (like freehand drawing). Closing a dialog is not inherently pointer-based — Escape key support is the standard solution.",
        },
        {
          prompt: "When in a pull-request review workflow, at what stage should accessibility be verified?",
          options: [
            "Only after the product launches, as a post-launch audit",
            "Throughout: contrast and focus states in the design phase, linting and automated axe in development, and a keyboard/screen reader pass in QA",
            "Accessibility review replaces QA — you don't need both",
          ],
          answer: 1,
          explanation:
            "Shifting accessibility left — into design and development rather than only QA — is far cheaper. Catching a missing focus indicator in a Figma spec costs minutes; fixing it post-launch in a shipped component costs hours. Integrate at every stage.",
        },
      ],
      explanation:
        "No single tool covers everything. Combine automated scanning (axe, Lighthouse) with keyboard-only testing and at least one screen reader pass. Integrate accessibility at every stage — design, development, QA, and ongoing production monitoring.",
    },
  ],
};
