import type { Module } from "./types";

// CSS Basics. Each lesson is a complete little HTML document containing an inline
// <style> block plus an element to style. The htmlRunner (lib/htmlRunner.ts)
// renders it in a sandboxed iframe and grades via the `css` helper, which returns
// the element's *computed* style. IMPORTANT: computed values are normalized by
// the browser — colors come back as `rgb(r, g, b)` and lengths in `px` — so every
// assertion below is written against that computed form.
//
// This module is dialed down for total beginners (ages 9–13 and non-technical
// adults), mirroring the kids-logic on-ramp: a no-typing quiz cold-open, an
// "anatomy of a CSS rule" walkthrough, a predict-the-output quiz before any
// typing, and every code lesson scaffolded with drag-in `blocks` plus step-by-step
// `hintCode`. Bigger ideas (like flexbox centering) are introduced one property at
// a time with progressive hints so nobody bounces off.
export const css: Module = {
  slug: "css",
  title: "CSS Basics",
  description:
    "Make the web beautiful. Learn to style HTML with colors, fonts, spacing, borders, and modern layout using flexbox.",
  emoji: "🎨",
  gradient: "from-sky-400/20 to-blue-500/10",
  tagline: "Learn CSS from scratch with interactive, auto-graded exercises.",
  language: "html",
  keywords: ["learn css", "css for beginners", "flexbox", "css grid"],
  lessons: [
    // 1 ── No-typing cold open: what CSS is ────────────────────────────────────
    {
      slug: "what-is-css",
      title: "What Is CSS? 🎨",
      blurb: "CSS is how you give a web page its colors, fonts, and style.",
      xp: 10,
      kind: "quiz",
      content: `# What Is CSS? 🎨

Welcome! 👋 You're about to make web pages **beautiful**. We'll go one tiny step
at a time, and you can't break anything.

A web page is built from **HTML** — the words, headings, and buttons. But plain
HTML looks a bit boring: black text on a white page. **CSS** is the *paint and
decoration* you add on top. 🖌️

Think of it like a coloring book:

- **HTML** draws the outlines — a heading here, a paragraph there.
- **CSS** colors them in — make the heading red, make the text bigger, add a box.

You write CSS as little **rules**, like "make every heading blue." The browser
reads your rules and repaints the page to match.

That's the whole idea! Let's check you've got it. 👇`,
      questions: [
        {
          prompt: "What does CSS do?",
          options: [
            "It styles a web page — colors, sizes, spacing, and layout",
            "It connects your computer to the internet",
            "It is a kind of video game",
          ],
          answer: 0,
          explanation:
            "CSS is the paint on top of HTML. It decides how things look: color, size, spacing, and where they sit.",
        },
        {
          prompt: "HTML is to CSS as…",
          options: [
            "the coloring-book outlines are to the colors you fill in",
            "a sandwich is to a bicycle",
            "the sun is to the moon",
          ],
          answer: 0,
          explanation:
            "HTML draws the outlines (the structure); CSS colors them in (the style).",
        },
        {
          prompt: "If you want every heading on a page to be red, you would write…",
          options: ["a CSS rule", "a phone number", "a grocery list"],
          answer: 0,
          explanation:
            "A CSS rule like `h1 { color: red; }` tells the browser exactly how to paint your headings.",
        },
      ],
    },

    // 2 ── No-typing: anatomy of a CSS rule ───────────────────────────────────
    {
      slug: "anatomy-of-a-rule",
      title: "Anatomy of a Rule 🔎",
      blurb: "Learn the four parts of every CSS rule before you write one.",
      xp: 10,
      kind: "quiz",
      content: `# Anatomy of a Rule 🔎

Before you write any CSS, let's read one slowly. Every CSS rule has the **same
four parts**, every single time:

\`\`\`css
h1 { color: blue; }
\`\`\`

Let's name them:

- \`h1\` is the **selector** — *which* elements to style (here, every \`<h1>\`).
- \`color\` is the **property** — *what* you want to change (the text color).
- \`blue\` is the **value** — *how* you want it (blue!).
- The \`{ }\` **curly braces** hold the property and value together, and the
  \`:\` and \`;\` are the punctuation: \`property: value;\`.

Read it out loud like a sentence: *"For every h1, set the color to blue."* 🗣️

Once you can spot these four parts, you can read **any** CSS rule. Try it below. 👇`,
      questions: [
        {
          prompt: "In `p { font-size: 24px; }`, what is the **selector**?",
          options: ["`p`", "`font-size`", "`24px`"],
          answer: 0,
          explanation:
            "The selector comes first and says *which* elements to style — here, every `<p>`.",
        },
        {
          prompt: "In `p { font-size: 24px; }`, what is the **property** (what you're changing)?",
          options: ["`p`", "`font-size`", "`24px`"],
          answer: 1,
          explanation:
            "The property is the name of the thing you want to change — here, `font-size`.",
        },
        {
          prompt: "In `p { font-size: 24px; }`, what is the **value**?",
          options: ["`p`", "`font-size`", "`24px`"],
          answer: 2,
          explanation:
            "The value comes after the colon and says *how* — here, 24 pixels.",
        },
        {
          prompt: "Which punctuation goes between the property and value?",
          options: ["a colon `:`", "a question mark `?`", "a star `*`"],
          answer: 0,
          explanation:
            "It's always `property: value;` — a colon between them and a semicolon at the end.",
        },
      ],
    },

    // 3 ── First edit: text color (fill-the-blank, fully scaffolded) ──────────
    {
      slug: "text-color",
      title: "Text color 🔴",
      blurb: "Paint your text with the color property.",
      xp: 20,
      content: `# Text color 🔴

Time to write your very first CSS! 🎉 Remember the four parts of a rule:
*selector*, *property*, *value*, and the \`{ }\` braces around them.

\`\`\`css
h1 { color: blue; }
\`\`\`

Read it as: *"For every \`h1\`, set the \`color\` to \`blue\`."*

Below, the \`h1 { }\` rule is empty. You only need to add **one line** inside the
braces. You can drag the blocks in, in order, or type it yourself.

## Your task
Make the \`<h1>\` **red** by adding \`color: red;\` inside the rule.

> 💡 Don't be surprised later: the browser likes to repeat colors back as
> \`rgb(...)\` numbers, so \`red\` becomes \`rgb(255, 0, 0)\`. That's totally normal —
> it's the same color, just written in the browser's own handwriting. 🤝`,
      starterCode: `<style>
  h1 {
    /* add your one line here */
  }
</style>
<h1>Hello</h1>
`,
      blocks: ["color", ": ", "red", ";"],
      solution: `<style>
  h1 {
    color: red;
  }
</style>
<h1>Hello</h1>`,
      tests: [
        {
          name: "The <h1> text is red",
          code: `assertEquals(css('h1').color, 'rgb(255, 0, 0)', 'Set the h1 color to red');`,
        },
      ],
      hints: [
        "Inside the `h1 { }` rule, add a line: `color: red;`.",
        "Remember the pattern `property: value;` — the property is `color`, the value is `red`, then a semicolon.",
      ],
      hintCode: [
        `<style>
  h1 {
    color: red;
  }
</style>
<h1>Hello</h1>
`,
        undefined,
      ],
      explanation: `🎉 Your first CSS rule works! The selector \`h1\` targets every \`<h1>\`, and \`color: red\` paints its text. The browser normalizes the keyword \`red\` to its computed form \`rgb(255, 0, 0)\`, which is what \`getComputedStyle\` reports — same color, browser handwriting.`,
    },

    // 4 ── Predict the output quiz (no typing) ────────────────────────────────
    {
      slug: "predict-the-color",
      title: "Predict the Color 🔮",
      blurb: "Read a CSS rule and guess what the page will look like.",
      xp: 10,
      kind: "quiz",
      content: `# Predict the Color 🔮

Good coders **read** code and picture the result in their head *before* running
it. Let's practice with the rule you just learned.

Here's a tiny page:

\`\`\`html
<style>
  h1 { color: green; }
</style>
<h1>Hi there!</h1>
\`\`\`

Read it like a sentence: *"For every \`h1\`, set the \`color\` to \`green\`."*

Picture the page in your mind, then answer below. 👇`,
      questions: [
        {
          prompt: "What color will the `<h1>` text be?",
          options: ["green", "red", "blue"],
          answer: 0,
          explanation:
            "The rule says `color: green;`, so the heading text is painted green.",
        },
        {
          prompt:
            "Now this rule:\n\n```css\np { color: purple; }\n```\n\nWhat color will the `<p>` text be?",
          options: ["purple", "black", "white"],
          answer: 0,
          explanation:
            "The value after `color:` is `purple`, so the paragraph text is purple.",
        },
        {
          prompt:
            "Which rule would make a `<p>` orange?",
          options: ["`p { color: orange; }`", "`p { orange: color; }`", "`orange { p: color; }`"],
          answer: 0,
          explanation:
            "The shape is always `selector { property: value; }` — so `p { color: orange; }`.",
        },
      ],
    },

    // 5 ──────────────────────────────────────────────────────────────────────
    {
      slug: "font-size",
      title: "Font size 🔠",
      blurb: "Make text bigger or smaller.",
      xp: 20,
      content: `# Font size 🔠

The \`font-size\` property controls how big text is. Sizes are usually in
**pixels** (\`px\`) — a pixel is one tiny dot on the screen.

\`\`\`css
p { font-size: 18px; }
\`\`\`

Read it as: *"For every \`p\`, set the \`font-size\` to 18 pixels."* Same four
parts as always — only the property and value changed.

## Your task
Give the \`<p>\` a \`font-size\` of **24px**. Drag the blocks in, or type the line
yourself.

> 💡 Don't forget the \`px\` — the number needs its unit, like \`24px\`.`,
      starterCode: `<style>
  p {
    /* add your one line here */
  }
</style>
<p>Read me</p>
`,
      blocks: ["font-size", ": ", "24px", ";"],
      solution: `<style>
  p {
    font-size: 24px;
  }
</style>
<p>Read me</p>`,
      tests: [
        {
          name: "The paragraph font-size is 24px",
          code: `assertEquals(css('p').fontSize, '24px', 'Set the p font-size to 24px');`,
        },
      ],
      hints: [
        "Add `font-size: 24px;` inside the `p { }` rule.",
        "Don't forget the `px` unit — `24` alone won't work, it needs to be `24px`.",
      ],
      hintCode: [
        `<style>
  p {
    font-size: 24px;
  }
</style>
<p>Read me</p>
`,
        undefined,
      ],
      explanation: `\`font-size: 24px\` sets the text to 24 pixels tall. Computed font sizes are always reported in \`px\`, even if you'd written them in other units like \`em\` or \`rem\`.`,
    },

    // 6 ──────────────────────────────────────────────────────────────────────
    {
      slug: "text-align",
      title: "Text alignment 🎯",
      blurb: "Center or align your text.",
      xp: 20,
      content: `# Text alignment 🎯

\`text-align\` positions text inside its box: \`left\`, \`right\`, \`center\`, or
\`justify\`.

\`\`\`css
.box { text-align: center; }
\`\`\`

Notice the selector here is \`.box\` with a **dot** in front. A dot means
"class" — it matches any element with \`class="box"\`. So \`.box\` reads as
*"every element labeled box."*

## Your task
Center the text inside \`.box\`. Drag the blocks in, or type the line yourself.`,
      starterCode: `<style>
  .box {
    /* add your one line here */
  }
</style>
<div class="box">Center me</div>
`,
      blocks: ["text-align", ": ", "center", ";"],
      solution: `<style>
  .box {
    text-align: center;
  }
</style>
<div class="box">Center me</div>`,
      tests: [
        {
          name: "The .box text is centered",
          code: `assertEquals(css('.box').textAlign, 'center', 'Set text-align to center');`,
        },
      ],
      hints: [
        "Add `text-align: center;` inside the `.box` rule.",
        "The selector already has the dot (`.box`) for you — you just add the one line inside the braces.",
      ],
      hintCode: [
        `<style>
  .box {
    text-align: center;
  }
</style>
<div class="box">Center me</div>
`,
        undefined,
      ],
      explanation: `\`.box\` is a *class selector* — the leading dot means it matches any element with \`class="box"\`. \`text-align: center\` then centers the text inside that element's box.`,
    },

    // 7 ──────────────────────────────────────────────────────────────────────
    {
      slug: "background-color",
      title: "Background color 🟦",
      blurb: "Fill an element's box with color.",
      xp: 25,
      content: `# Background color 🟦

\`color\` paints the **text**. \`background-color\` paints the **area behind** it —
like a highlighter under the words.

\`\`\`css
.card { background-color: black; }
\`\`\`

## Your task
Give \`.card\` a **blue** background. Drag the blocks in, or type the line.

> 💡 Just like \`color\`, the browser repeats the background back as \`rgb(...)\`, so
> \`blue\` becomes \`rgb(0, 0, 255)\`. Same color, browser handwriting. 🤝`,
      starterCode: `<style>
  .card {
    /* add your one line here */
  }
</style>
<div class="card">A card</div>
`,
      blocks: ["background-color", ": ", "blue", ";"],
      solution: `<style>
  .card {
    background-color: blue;
  }
</style>
<div class="card">A card</div>`,
      tests: [
        {
          name: "The .card background is blue",
          code: `assertEquals(css('.card').backgroundColor, 'rgb(0, 0, 255)', 'Set background-color to blue');`,
        },
      ],
      hints: [
        "Add `background-color: blue;` inside the `.card` rule.",
        "It's the same shape as `color`, just a longer property name: `background-color: blue;`.",
      ],
      hintCode: [
        `<style>
  .card {
    background-color: blue;
  }
</style>
<div class="card">A card</div>
`,
        undefined,
      ],
      explanation: `\`background-color\` fills the element's entire box behind the text — think of it as a highlighter. Like \`color\`, the keyword \`blue\` is reported in computed form as \`rgb(0, 0, 255)\`.`,
    },

    // 8 ──────────────────────────────────────────────────────────────────────
    {
      slug: "padding-margin",
      title: "Padding & margin 📦",
      blurb: "Add space inside and around a box.",
      xp: 30,
      content: `# Padding & margin 📦

Every box has two kinds of space:

- **\`padding\`** — the cushion *inside* the box, between the text and the edge.
- **\`margin\`** — the gap *outside* the box, pushing other things away.

\`\`\`css
.box {
  padding: 16px;  /* space inside */
  margin: 8px;    /* space outside */
}
\`\`\`

This rule has **two** lines instead of one — but each line is the same
\`property: value;\` shape you already know.

## Your task
Give \`.box\` **20px** of padding and **10px** of margin. Drag the blocks in
order, or type both lines.`,
      starterCode: `<style>
  .box {
    /* add two lines: padding, then margin */
  }
</style>
<div class="box">Spaced out</div>
`,
      blocks: ["padding", ": ", "20px", ";", "\n    margin", ": ", "10px", ";"],
      solution: `<style>
  .box {
    padding: 20px;
    margin: 10px;
  }
</style>
<div class="box">Spaced out</div>`,
      tests: [
        {
          name: "Padding is 20px on all sides",
          code: `assertEquals(css('.box').paddingTop, '20px'); assertEquals(css('.box').paddingLeft, '20px');`,
        },
        {
          name: "Margin is 10px on all sides",
          code: `assertEquals(css('.box').marginTop, '10px'); assertEquals(css('.box').marginLeft, '10px');`,
        },
      ],
      hints: [
        "First line: `padding: 20px;` — the cushion inside.",
        "Second line: `margin: 10px;` — the gap outside. One value applies to all four sides.",
      ],
      hintCode: [
        `<style>
  .box {
    padding: 20px;
  }
</style>
<div class="box">Spaced out</div>
`,
        `<style>
  .box {
    padding: 20px;
    margin: 10px;
  }
</style>
<div class="box">Spaced out</div>
`,
      ],
      explanation: `\`padding\` is the cushion *inside* the box; \`margin\` is the gap *outside* it, pushing neighbors away. The shorthand \`20px\` applies to all four sides, which is why the computed \`paddingTop\` and \`paddingLeft\` both read \`20px\`.`,
    },

    // 9 ──────────────────────────────────────────────────────────────────────
    {
      slug: "border",
      title: "Borders 🟫",
      blurb: "Outline a box with a visible edge.",
      xp: 25,
      content: `# Borders 🟫

A \`border\` draws a visible edge around a box. It needs **three** things at once:
a **width** (how thick), a **style** (like \`solid\`), and a **color**. You can set
all three in one line:

\`\`\`css
.box { border: 2px solid black; }
\`\`\`

Read it as: *"a 2-pixel, solid, black border."* The order is width → style →
color, with spaces between.

> 💡 A border needs a **style** like \`solid\` to show up at all — without it,
> there's nothing to draw.

## Your task
Give \`.box\` a border that is **2px solid black**. Drag the blocks in, or type
the line.

> \`black\` computes to \`rgb(0, 0, 0)\`.`,
      starterCode: `<style>
  .box {
    /* add your one line here */
  }
</style>
<div class="box">Boxed in</div>
`,
      blocks: ["border", ": ", "2px", " ", "solid", " ", "black", ";"],
      solution: `<style>
  .box {
    border: 2px solid black;
  }
</style>
<div class="box">Boxed in</div>`,
      tests: [
        {
          name: "The border style is solid",
          code: `assertEquals(css('.box').borderTopStyle, 'solid', 'Use a solid border style');`,
        },
        {
          name: "The border is 2px wide",
          code: `assertEquals(css('.box').borderTopWidth, '2px', 'Make the border 2px wide');`,
        },
        {
          name: "The border is black",
          code: `assertEquals(css('.box').borderTopColor, 'rgb(0, 0, 0)', 'Make the border black');`,
        },
      ],
      hints: [
        "Use the shorthand: `border: 2px solid black;` — width, then style, then color.",
        "Without a style like `solid`, the border won't appear at all.",
      ],
      hintCode: [
        `<style>
  .box {
    border: 2px solid black;
  }
</style>
<div class="box">Boxed in</div>
`,
        undefined,
      ],
      explanation: `The \`border\` shorthand sets width, style, and color for all four sides at once. A border only renders once it has a *style* (\`solid\`), which is why the computed \`borderTopStyle\` must be \`solid\` and the width \`2px\`.`,
    },

    // 10 ── Flexbox split into a gentle, three-step lesson ─────────────────────
    {
      slug: "flexbox-center",
      title: "Centering with flexbox 🎯",
      blurb: "The modern way to center anything — one property at a time.",
      xp: 40,
      content: `# Centering with flexbox 🎯

Centering something perfectly in the middle used to be tricky. **Flexbox** makes
it easy with three steps. We'll add them one line at a time — tap the hint to
reveal each step.

\`\`\`css
.container {
  display: flex;            /* step 1: turn on flexbox */
  justify-content: center;  /* step 2: center left-to-right */
  align-items: center;      /* step 3: center top-to-bottom */
}
\`\`\`

Three short lines, each one the same \`property: value;\` shape you already know:

1. \`display: flex;\` turns the box into a **flex container**.
2. \`justify-content: center;\` centers the children **horizontally**.
3. \`align-items: center;\` centers the children **vertically**.

## Your task
Make \`.container\` a flexbox that centers its content both ways. Drag the blocks
in order, or tap the hint to fill it in one step at a time.`,
      starterCode: `<style>
  .container {
    height: 200px;
    /* add the three flexbox lines here */
  }
</style>
<div class="container">
  <span>Center me</span>
</div>
`,
      blocks: [
        "display",
        ": ",
        "flex",
        ";",
        "\n    justify-content",
        ": ",
        "center",
        ";",
        "\n    align-items",
        ": ",
        "center",
        ";",
      ],
      solution: `<style>
  .container {
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
<div class="container">
  <span>Center me</span>
</div>`,
      tests: [
        {
          name: "The container is a flexbox",
          code: `assert(css('.container').display === 'flex', 'Set display: flex');`,
        },
        {
          name: "Content is centered horizontally",
          code: `assertEquals(css('.container').justifyContent, 'center', 'Set justify-content: center');`,
        },
        {
          name: "Content is centered vertically",
          code: `assertEquals(css('.container').alignItems, 'center', 'Set align-items: center');`,
        },
      ],
      hints: [
        "Step 1 — turn on flexbox: add `display: flex;`.",
        "Step 2 — center left-to-right: add `justify-content: center;`.",
        "Step 3 — center top-to-bottom: add `align-items: center;`. Now all three lines are in place!",
      ],
      hintCode: [
        `<style>
  .container {
    height: 200px;
    display: flex;
  }
</style>
<div class="container">
  <span>Center me</span>
</div>
`,
        `<style>
  .container {
    height: 200px;
    display: flex;
    justify-content: center;
  }
</style>
<div class="container">
  <span>Center me</span>
</div>
`,
        `<style>
  .container {
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
<div class="container">
  <span>Center me</span>
</div>
`,
      ],
      explanation: `\`display: flex\` makes the element lay out its children along an axis. \`justify-content: center\` centers them along the main (horizontal) axis and \`align-items: center\` along the cross (vertical) axis — the classic recipe for perfectly centering anything.`,
    },

    // 11 ──────────────────────────────────────────────────────────────────────
    {
      slug: "button-style",
      title: "Style a button ✨",
      blurb: "Combine everything into a polished button.",
      xp: 40,
      content: `# Style a button ✨

You've learned color, background, padding, and rounded edges. A real button is
just those properties working together! \`border-radius\` is the new one — it
softens the corners.

\`\`\`css
button {
  background-color: green;
  color: white;
  padding: 12px;
  border-radius: 8px;
}
\`\`\`

Four lines, each the same \`property: value;\` shape. You've got this. 💪

## Your task
Style the \`<button>\` with a **blue** background, **white** text, **12px** of
padding, and an **8px** \`border-radius\`. Drag the blocks in order, or tap the
hint to build it up.`,
      starterCode: `<style>
  button {
    /* add four lines to make this button look nice */
  }
</style>
<button>Click me</button>
`,
      blocks: [
        "background-color",
        ": ",
        "blue",
        ";",
        "\n    color",
        ": ",
        "white",
        ";",
        "\n    padding",
        ": ",
        "12px",
        ";",
        "\n    border-radius",
        ": ",
        "8px",
        ";",
      ],
      solution: `<style>
  button {
    background-color: blue;
    color: white;
    padding: 12px;
    border-radius: 8px;
  }
</style>
<button>Click me</button>`,
      tests: [
        {
          name: "Background is blue",
          code: `assertEquals(css('button').backgroundColor, 'rgb(0, 0, 255)', 'Give the button a blue background');`,
        },
        {
          name: "Text is white",
          code: `assertEquals(css('button').color, 'rgb(255, 255, 255)', 'Make the text white');`,
        },
        {
          name: "Padding is 12px",
          code: `assertEquals(css('button').paddingTop, '12px', 'Add 12px of padding');`,
        },
        {
          name: "Corners are rounded (8px)",
          code: `assertEquals(css('button').borderTopLeftRadius, '8px', 'Set border-radius to 8px');`,
        },
      ],
      hints: [
        "Start with the colors: `background-color: blue;` and `color: white;`.",
        "Then add the spacing and corners: `padding: 12px;` and `border-radius: 8px;`.",
      ],
      hintCode: [
        `<style>
  button {
    background-color: blue;
    color: white;
  }
</style>
<button>Click me</button>
`,
        `<style>
  button {
    background-color: blue;
    color: white;
    padding: 12px;
    border-radius: 8px;
  }
</style>
<button>Click me</button>
`,
      ],
      explanation: `A good button is just a few properties working together: \`background-color\` and \`color\` for contrast, \`padding\` to give the label breathing room, and \`border-radius\` to soften the corners. The computed \`borderTopLeftRadius\` reflects the \`8px\` from the \`border-radius\` shorthand.`,
    },
  ],
};
