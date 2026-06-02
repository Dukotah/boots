import type { Module } from "./types";

// HTML Basics. These lessons are graded by the htmlRunner (lib/htmlRunner.ts):
// the student's markup is rendered in a sandboxed iframe and tests inspect the
// resulting DOM via `doc` (the document) with `assert` / `assertEquals`.
export const html: Module = {
  slug: "html",
  title: "HTML Basics",
  description:
    "The skeleton of every web page. Learn to structure content with real HTML tags — headings, links, images, lists, forms, and semantic layout.",
  emoji: "🌐",
  gradient: "from-orange-400/20 to-amber-500/10",
  tagline: "Learn HTML from scratch with interactive, auto-graded exercises.",
  language: "html",
  keywords: ["learn html", "html for beginners", "html tutorial"],
  lessons: [
    // 1 ──────────────────────────────────────────────────────────────────────
    {
      slug: "headings-paragraphs",
      title: "Headings & Paragraphs",
      blurb: "The most basic building blocks of any page.",
      xp: 20,
      content: `# Headings & Paragraphs

HTML is made of **tags** that wrap your content. A heading uses \`<h1>\` … \`<h6>\`
(\`<h1>\` is the biggest, most important), and a paragraph uses \`<p>\`.

\`\`\`html
<h1>My Blog</h1>
<p>Welcome to my little corner of the web.</p>
\`\`\`

Every tag opens (\`<p>\`) and closes (\`</p>\`), with your text in between.

## Your task
Add an \`<h1>\` containing the text **Welcome** and a \`<p>\` containing
**Hello there**.`,
      starterCode: `<!-- Add an h1 and a p below -->
`,
      solution: `<h1>Welcome</h1>
<p>Hello there</p>`,
      tests: [
        { name: "There is an <h1>", code: `assert(doc.querySelector('h1'), 'Add an <h1> element');` },
        {
          name: 'The <h1> says "Welcome"',
          code: `assertEquals(doc.querySelector('h1').textContent.trim(), 'Welcome');`,
        },
        { name: "There is a <p>", code: `assert(doc.querySelector('p'), 'Add a <p> element');` },
        {
          name: 'The <p> says "Hello there"',
          code: `assertEquals(doc.querySelector('p').textContent.trim(), 'Hello there');`,
        },
      ],
      hints: [
        "Wrap your heading text in `<h1>` … `</h1>`.",
        "Below it, wrap your sentence in `<p>` … `</p>`.",
      ],
      explanation: `\`<h1>\` marks the page's main heading and \`<p>\` marks a paragraph of body text. Browsers (and screen readers) use these tags to understand the structure of your content — not just to make text big or small.`,
    },

    // 2 ──────────────────────────────────────────────────────────────────────
    {
      slug: "links",
      title: "Links",
      blurb: "Connect pages together with anchors.",
      xp: 25,
      content: `# Links

A link is an **anchor** tag, \`<a>\`. The \`href\` attribute says *where* it goes,
and the text between the tags is what the user clicks.

\`\`\`html
<a href="https://example.com">Visit Example</a>
\`\`\`

## Your task
Create a link that points to \`https://example.com\` with the clickable text
**Click here**.`,
      starterCode: `<!-- Add an <a> with an href -->
<a>Click here</a>
`,
      solution: `<a href="https://example.com">Click here</a>`,
      tests: [
        {
          name: "There is a link with an href",
          code: `assert(doc.querySelector('a[href]'), 'Add an <a> with an href attribute');`,
        },
        {
          name: "It points to example.com",
          code: `assertEquals(doc.querySelector('a').getAttribute('href'), 'https://example.com');`,
        },
        {
          name: 'The link text is "Click here"',
          code: `assertEquals(doc.querySelector('a').textContent.trim(), 'Click here');`,
        },
      ],
      hints: [
        "Add an `href` attribute inside the opening tag: `<a href=\"...\">`.",
        "The URL goes in quotes: `href=\"https://example.com\"`.",
      ],
      explanation: `The \`href\` (hypertext reference) is what turns text into a working link. Without it, an \`<a>\` is just text — the browser only navigates when it knows the destination.`,
    },

    // 3 ──────────────────────────────────────────────────────────────────────
    {
      slug: "images",
      title: "Images & alt text",
      blurb: "Show pictures — and describe them for everyone.",
      xp: 25,
      content: `# Images & alt text

The \`<img>\` tag embeds a picture. It needs a \`src\` (where the image lives) and
an \`alt\` (a text description for screen readers and when the image fails to load).

\`\`\`html
<img src="cat.jpg" alt="A sleepy orange cat" />
\`\`\`

\`<img>\` is *self-closing* — it has no separate closing tag.

## Your task
Add an image with \`src="logo.png"\` and meaningful \`alt\` text
(use **Company logo**).`,
      starterCode: `<!-- Add an <img> with src and alt -->
<img src="logo.png" />
`,
      solution: `<img src="logo.png" alt="Company logo" />`,
      tests: [
        { name: "There is an <img>", code: `assert(doc.querySelector('img'), 'Add an <img> element');` },
        {
          name: 'The src is "logo.png"',
          code: `assertEquals(doc.querySelector('img').getAttribute('src'), 'logo.png');`,
        },
        {
          name: "The image has alt text",
          code: `assert(doc.querySelector('img').getAttribute('alt'), 'Images need alt text for accessibility');`,
        },
        {
          name: 'The alt is "Company logo"',
          code: `assertEquals(doc.querySelector('img').getAttribute('alt'), 'Company logo');`,
        },
      ],
      hints: [
        "Add an `alt` attribute alongside `src`.",
        "Describe the image: `alt=\"Company logo\"`.",
      ],
      explanation: `\`alt\` text is read aloud by screen readers and shown if the image can't load. Every meaningful image should have it — it's one of the easiest accessibility wins in HTML.`,
    },

    // 4 ──────────────────────────────────────────────────────────────────────
    {
      slug: "lists",
      title: "Lists",
      blurb: "Group related items with <ul> and <li>.",
      xp: 25,
      content: `# Lists

An **unordered list** \`<ul>\` holds **list items** \`<li>\` — perfect for bullet
points. (Use \`<ol>\` instead when order matters.)

\`\`\`html
<ul>
  <li>Coffee</li>
  <li>Tea</li>
</ul>
\`\`\`

## Your task
Make a \`<ul>\` with exactly **three** \`<li>\` items: **Red**, **Green**, and
**Blue**.`,
      starterCode: `<ul>
  <li>Red</li>
</ul>
`,
      solution: `<ul>
  <li>Red</li>
  <li>Green</li>
  <li>Blue</li>
</ul>`,
      tests: [
        { name: "There is a <ul>", code: `assert(doc.querySelector('ul'), 'Add a <ul> element');` },
        {
          name: "It has exactly 3 <li> items",
          code: `assert(doc.querySelectorAll('ul li').length === 3, 'Need exactly 3 list items');`,
        },
        {
          name: "The items are Red, Green, Blue",
          code: `assertEquals(Array.from(doc.querySelectorAll('ul li')).map(li => li.textContent.trim()), ['Red','Green','Blue']);`,
        },
      ],
      hints: [
        "Each bullet is its own `<li>` … `</li>`.",
        "You need three `<li>` elements inside the one `<ul>`.",
      ],
      explanation: `A \`<ul>\` is the container and each \`<li>\` is one bullet. Grouping items in a real list (instead of plain lines) tells assistive tech "these belong together," and announces how many items there are.`,
    },

    // 5 ──────────────────────────────────────────────────────────────────────
    {
      slug: "page-structure",
      title: "Page structure",
      blurb: "Write a complete little HTML document.",
      xp: 30,
      content: `# Page structure

A full HTML page has a \`<head>\` (metadata like the \`<title>\`) and a \`<body>\`
(everything you see). The \`<title>\` is what shows in the browser tab.

\`\`\`html
<!DOCTYPE html>
<html>
  <head>
    <title>My Page</title>
  </head>
  <body>
    <h1>Hi!</h1>
  </body>
</html>
\`\`\`

## Your task
Write a document whose \`<title>\` is **My Site** and whose \`<body>\` contains an
\`<h1>\` that says **Home**.`,
      starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title></title>
  </head>
  <body>
  </body>
</html>
`,
      solution: `<!DOCTYPE html>
<html>
  <head>
    <title>My Site</title>
  </head>
  <body>
    <h1>Home</h1>
  </body>
</html>`,
      tests: [
        {
          name: 'The page <title> is "My Site"',
          code: `assertEquals(doc.title, 'My Site');`,
        },
        {
          name: "The body has an <h1>",
          code: `assert(doc.querySelector('body h1'), 'Put an <h1> inside the <body>');`,
        },
        {
          name: 'The <h1> says "Home"',
          code: `assertEquals(doc.querySelector('body h1').textContent.trim(), 'Home');`,
        },
      ],
      hints: [
        "Type the page title between the `<title>` tags in the `<head>`.",
        "Add an `<h1>Home</h1>` inside the `<body>`.",
      ],
      explanation: `The \`<head>\` holds information *about* the page (like its \`<title>\`, shown in the browser tab) while the \`<body>\` holds the content people actually see. \`document.title\` reads back whatever you put in \`<title>\`.`,
    },

    // 6 ──────────────────────────────────────────────────────────────────────
    {
      slug: "forms",
      title: "Forms & inputs",
      blurb: "Collect input with labels, fields, and a button.",
      xp: 35,
      content: `# Forms & inputs

A \`<form>\` collects user input. A \`<label>\` describes a field, an \`<input>\`
captures the value, and a \`<button>\` submits it. Linking a label to its input
(via \`for\`/\`id\`) makes the form accessible.

\`\`\`html
<form>
  <label for="email">Email</label>
  <input id="email" type="email" />
  <button type="submit">Sign up</button>
</form>
\`\`\`

## Your task
Build a form with a \`<label>\` (text **Name**), a text \`<input>\`, and a
\`<button>\` that says **Submit**.`,
      starterCode: `<form>
  <!-- add a label, an input, and a button -->
</form>
`,
      solution: `<form>
  <label for="name">Name</label>
  <input id="name" type="text" />
  <button type="submit">Submit</button>
</form>`,
      tests: [
        { name: "There is a <form>", code: `assert(doc.querySelector('form'), 'Add a <form>');` },
        {
          name: 'There is a <label> saying "Name"',
          code: `assert(doc.querySelector('form label'), 'Add a <label>'); assertEquals(doc.querySelector('form label').textContent.trim(), 'Name');`,
        },
        {
          name: "There is an <input>",
          code: `assert(doc.querySelector('form input'), 'Add an <input>');`,
        },
        {
          name: 'There is a <button> saying "Submit"',
          code: `assert(doc.querySelector('form button'), 'Add a <button>'); assertEquals(doc.querySelector('form button').textContent.trim(), 'Submit');`,
        },
      ],
      hints: [
        "Put a `<label>Name</label>` inside the form.",
        "Add an `<input />` and a `<button>Submit</button>` too.",
      ],
      explanation: `Forms pair a \`<label>\` with an \`<input>\` so users (and screen readers) know what each field is for, and a \`<button type="submit">\` sends the data. Together they're the foundation of every sign-up, search box, and checkout on the web.`,
    },

    // 7 ──────────────────────────────────────────────────────────────────────
    {
      slug: "semantic",
      title: "Semantic layout",
      blurb: "Describe page regions with header, nav, main, footer.",
      xp: 35,
      content: `# Semantic layout

Instead of wrapping everything in generic \`<div>\`s, HTML5 gives you **semantic**
tags that describe a region's *purpose*: \`<header>\`, \`<nav>\`, \`<main>\`, and
\`<footer>\`.

\`\`\`html
<header>…</header>
<nav>…</nav>
<main>…</main>
<footer>…</footer>
\`\`\`

These help search engines and assistive tech understand your page layout.

## Your task
Lay out a page with a \`<header>\`, a \`<nav>\`, a \`<main>\`, and a \`<footer>\` —
one of each.`,
      starterCode: `<header></header>
<main></main>
`,
      solution: `<header>My Site</header>
<nav>Home · About</nav>
<main>Welcome!</main>
<footer>© 2026</footer>`,
      tests: [
        { name: "There is a <header>", code: `assert(doc.querySelector('header'), 'Add a <header>');` },
        { name: "There is a <nav>", code: `assert(doc.querySelector('nav'), 'Add a <nav>');` },
        { name: "There is a <main>", code: `assert(doc.querySelector('main'), 'Add a <main>');` },
        { name: "There is a <footer>", code: `assert(doc.querySelector('footer'), 'Add a <footer>');` },
      ],
      hints: [
        "You're missing a `<nav>` and a `<footer>` — add them.",
        "Use each tag once: `<header>`, `<nav>`, `<main>`, `<footer>`.",
      ],
      explanation: `Semantic elements name the *role* of each region — banner, navigation, main content, and footer — so browsers, search engines, and screen readers can navigate the page structure instead of guessing what each \`<div>\` means.`,
    },

    // 8 ──────────────────────────────────────────────────────────────────────
    {
      slug: "tables",
      title: "Tables",
      blurb: "Show rows and columns of data.",
      xp: 30,
      content: `# Tables

A \`<table>\` displays data in rows and columns. Use \`<tr>\` for a table row,
\`<th>\` for header cells, and \`<td>\` for data cells.

\`\`\`html
<table>
  <tr><th>Name</th><th>Score</th></tr>
  <tr><td>Ada</td><td>99</td></tr>
</table>
\`\`\`

## Your task
Build a table with a header row of two \`<th>\` cells (**Name** and **Age**) and
one data row of two \`<td>\` cells (**Ada** and **36**).`,
      starterCode: `<table>
  <tr>
    <th>Name</th>
  </tr>
</table>
`,
      solution: `<table>
  <tr>
    <th>Name</th>
    <th>Age</th>
  </tr>
  <tr>
    <td>Ada</td>
    <td>36</td>
  </tr>
</table>`,
      tests: [
        { name: "There is a <table>", code: `assert(doc.querySelector('table'), 'Add a <table>');` },
        {
          name: "There are 2 header cells (<th>)",
          code: `assert(doc.querySelectorAll('table th').length === 2, 'Need two <th> header cells');`,
        },
        {
          name: "The headers are Name and Age",
          code: `assertEquals(Array.from(doc.querySelectorAll('table th')).map(c => c.textContent.trim()), ['Name','Age']);`,
        },
        {
          name: "There are 2 data cells (<td>)",
          code: `assert(doc.querySelectorAll('table td').length === 2, 'Need two <td> data cells');`,
        },
        {
          name: "The data is Ada and 36",
          code: `assertEquals(Array.from(doc.querySelectorAll('table td')).map(c => c.textContent.trim()), ['Ada','36']);`,
        },
      ],
      hints: [
        "Add a second `<th>` for the Age column.",
        "Then add a new `<tr>` with two `<td>` cells: Ada and 36.",
      ],
      explanation: `Tables structure tabular data: \`<tr>\` is a row, \`<th>\` marks header cells (announced as headers by screen readers), and \`<td>\` holds the data. Use tables for genuine data — not for page layout.`,
    },
  ],
};
