import type { Module } from "./types";

// CSS Basics. Each lesson is a complete little HTML document containing an inline
// <style> block plus an element to style. The htmlRunner (lib/htmlRunner.ts)
// renders it in a sandboxed iframe and grades via the `css` helper, which returns
// the element's *computed* style. IMPORTANT: computed values are normalized by
// the browser — colors come back as `rgb(r, g, b)` and lengths in `px` — so every
// assertion below is written against that computed form.
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
    // 1 ──────────────────────────────────────────────────────────────────────
    {
      slug: "text-color",
      title: "Text color",
      blurb: "Paint your text with the color property.",
      xp: 20,
      content: `# Text color

CSS lives in a \`<style>\` block (or a separate file). You pick elements with a
**selector** and set **properties**. The \`color\` property sets text color.

\`\`\`html
<style>
  h1 { color: blue; }
</style>
<h1>Hi</h1>
\`\`\`

## Your task
Make the \`<h1>\` **red**.

> Tip: the browser reports colors as \`rgb(...)\`, so \`red\` becomes
> \`rgb(255, 0, 0)\` — that's what the test checks.`,
      starterCode: `<style>
  h1 {
    /* set the color */
  }
</style>
<h1>Hello</h1>
`,
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
        "Inside the `h1 { }` rule, add `color: red;`.",
        "You can write `red`, `#ff0000`, or `rgb(255, 0, 0)` — all compute to the same thing.",
      ],
      explanation: `The selector \`h1\` targets every \`<h1>\`, and \`color: red\` sets its text color. The browser normalizes the keyword \`red\` to its computed form \`rgb(255, 0, 0)\`, which is what \`getComputedStyle\` reports.`,
    },

    // 2 ──────────────────────────────────────────────────────────────────────
    {
      slug: "font-size",
      title: "Font size",
      blurb: "Make text bigger or smaller.",
      xp: 20,
      content: `# Font size

The \`font-size\` property controls how big text is. Sizes are usually in
**pixels** (\`px\`).

\`\`\`html
<style>
  p { font-size: 18px; }
</style>
\`\`\`

## Your task
Give the \`<p>\` a \`font-size\` of **24px**.`,
      starterCode: `<style>
  p {
    /* set the font size */
  }
</style>
<p>Read me</p>
`,
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
        "Don't forget the `px` unit.",
      ],
      explanation: `\`font-size: 24px\` sets the text to 24 pixels tall. Computed font sizes are always reported in \`px\`, even if you'd written them in other units like \`em\` or \`rem\`.`,
    },

    // 3 ──────────────────────────────────────────────────────────────────────
    {
      slug: "text-align",
      title: "Text alignment",
      blurb: "Center or align your text.",
      xp: 20,
      content: `# Text alignment

\`text-align\` positions inline content (like text) within its box: \`left\`,
\`right\`, \`center\`, or \`justify\`.

\`\`\`html
<style>
  .box { text-align: center; }
</style>
<div class="box">Centered</div>
\`\`\`

A \`class\` selector starts with a dot: \`.box\` matches \`class="box"\`.

## Your task
Center the text inside \`.box\`.`,
      starterCode: `<style>
  .box {
    /* align the text */
  }
</style>
<div class="box">Center me</div>
`,
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
        "Use the `.box` class selector (note the leading dot).",
        "Add `text-align: center;` inside it.",
      ],
      explanation: `\`.box\` is a *class selector* — it matches any element with \`class="box"\`. \`text-align: center\` then centers the inline text inside that element's box.`,
    },

    // 4 ──────────────────────────────────────────────────────────────────────
    {
      slug: "background-color",
      title: "Background color",
      blurb: "Fill an element's box with color.",
      xp: 25,
      content: `# Background color

\`background-color\` paints the area behind an element's content.

\`\`\`html
<style>
  .card { background-color: black; }
</style>
\`\`\`

## Your task
Give \`.card\` a **blue** background.

> Computed colors are \`rgb(...)\`, so \`blue\` becomes \`rgb(0, 0, 255)\`.`,
      starterCode: `<style>
  .card {
    /* set the background color */
  }
</style>
<div class="card">A card</div>
`,
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
        "`blue` computes to `rgb(0, 0, 255)`.",
      ],
      explanation: `\`background-color\` fills the element's entire box (content + padding) behind the text. Like \`color\`, the keyword \`blue\` is reported in computed form as \`rgb(0, 0, 255)\`.`,
    },

    // 5 ──────────────────────────────────────────────────────────────────────
    {
      slug: "padding-margin",
      title: "Padding & margin",
      blurb: "Add space inside and around a box.",
      xp: 30,
      content: `# Padding & margin

The box model has space *inside* the border (\`padding\`) and *outside* it
(\`margin\`).

\`\`\`html
<style>
  .box {
    padding: 16px;  /* space inside */
    margin: 8px;    /* space outside */
  }
</style>
\`\`\`

## Your task
Give \`.box\` **20px** of padding and **10px** of margin.`,
      starterCode: `<style>
  .box {
    /* add padding and margin */
  }
</style>
<div class="box">Spaced out</div>
`,
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
        "Add `padding: 20px;` — it applies to all four sides.",
        "Add `margin: 10px;` the same way.",
      ],
      explanation: `\`padding\` is the cushion *inside* the box, between the content and the edge; \`margin\` is the gap *outside* the box, pushing other elements away. The shorthand \`20px\` applies to all four sides, which is why the computed \`paddingTop\` and \`paddingLeft\` both read \`20px\`.`,
    },

    // 6 ──────────────────────────────────────────────────────────────────────
    {
      slug: "flexbox-center",
      title: "Centering with flexbox",
      blurb: "The modern way to center anything.",
      xp: 40,
      content: `# Centering with flexbox

\`display: flex\` turns an element into a **flex container**. Then
\`justify-content: center\` centers its children horizontally and
\`align-items: center\` centers them vertically.

\`\`\`html
<style>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
\`\`\`

## Your task
Make \`.container\` a flexbox that centers its content both horizontally and
vertically.`,
      starterCode: `<style>
  .container {
    height: 200px;
    /* make it a centered flexbox */
  }
</style>
<div class="container">
  <span>Center me</span>
</div>
`,
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
        "Start with `display: flex;`.",
        "Then add `justify-content: center;` and `align-items: center;`.",
      ],
      explanation: `\`display: flex\` makes the element lay out its children along an axis. \`justify-content: center\` centers them along the main (horizontal) axis and \`align-items: center\` along the cross (vertical) axis — the classic recipe for perfectly centering anything.`,
    },

    // 7 ──────────────────────────────────────────────────────────────────────
    {
      slug: "border",
      title: "Borders",
      blurb: "Outline a box with a visible edge.",
      xp: 25,
      content: `# Borders

The \`border\` shorthand sets a border's width, style, and color at once.

\`\`\`html
<style>
  .box { border: 2px solid black; }
</style>
\`\`\`

A border needs a **style** (like \`solid\`) to show up at all.

## Your task
Give \`.box\` a border that is **2px solid black**.

> \`black\` computes to \`rgb(0, 0, 0)\`.`,
      starterCode: `<style>
  .box {
    /* add a border */
  }
</style>
<div class="box">Boxed in</div>
`,
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
        "Use the shorthand: `border: 2px solid black;`.",
        "Without a style like `solid`, the border won't appear.",
      ],
      explanation: `The \`border\` shorthand expands to width, style, and color for all four sides. A border only renders once it has a *style* (\`solid\`), which is why the computed \`borderTopStyle\` must be \`solid\` and the width \`2px\`.`,
    },

    // 8 ──────────────────────────────────────────────────────────────────────
    {
      slug: "button-style",
      title: "Style a button",
      blurb: "Combine everything into a polished button.",
      xp: 40,
      content: `# Style a button

Real buttons combine several properties: a background color, white text, some
padding, and rounded corners (\`border-radius\`).

\`\`\`html
<style>
  button {
    background-color: green;
    color: white;
    padding: 12px;
    border-radius: 8px;
  }
</style>
\`\`\`

## Your task
Style the \`<button>\` with a **blue** background, **white** text, **12px** of
padding, and an **8px** \`border-radius\`.`,
      starterCode: `<style>
  button {
    /* make this button look nice */
  }
</style>
<button>Click me</button>
`,
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
        "Set `background-color: blue;` and `color: white;`.",
        "Then add `padding: 12px;` and `border-radius: 8px;`.",
      ],
      explanation: `A good button is just a few properties working together: \`background-color\` and \`color\` for contrast, \`padding\` to give the label breathing room, and \`border-radius\` to soften the corners. The computed \`borderTopLeftRadius\` reflects the \`8px\` from the \`border-radius\` shorthand.`,
    },
  ],
};
