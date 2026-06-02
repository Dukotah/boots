import type { CheatSheet } from "./types";

export const htmlCheatsheet: CheatSheet = {
  slug: "html",
  title: "HTML Cheat Sheet",
  language: "HTML",
  emoji: "🌐",
  description:
    "A quick-reference HTML cheat sheet covering tags, structure, forms, links, images, and semantic elements.",
  keywords: [
    "html cheat sheet",
    "html tags list",
    "html reference",
    "html for beginners",
  ],
  sections: [
    {
      title: "Document Structure",
      items: [
        { code: "<!DOCTYPE html>", desc: "Declares an HTML5 document" },
        { code: "<html lang='en'></html>", desc: "Root element with language" },
        { code: "<head></head>", desc: "Metadata container (not rendered)" },
        { code: "<body></body>", desc: "Visible page content" },
        {
          code: "<meta charset='utf-8'>",
          desc: "Sets character encoding",
        },
        {
          code: "<meta name='viewport' content='width=device-width, initial-scale=1'>",
          desc: "Responsive viewport for mobile",
        },
        { code: "<title>Page Title</title>", desc: "Tab and bookmark title" },
        {
          code: "<link rel='stylesheet' href='style.css'>",
          desc: "Links an external stylesheet",
        },
      ],
    },
    {
      title: "Text & Headings",
      items: [
        { code: "<h1>Main Heading</h1>", desc: "Top-level heading" },
        { code: "<h2>...</h2> ... <h6>...</h6>", desc: "Subheadings h2 to h6" },
        { code: "<p>Paragraph text.</p>", desc: "Block of paragraph text" },
        { code: "<strong>Important</strong>", desc: "Strong importance (bold)" },
        { code: "<em>Emphasis</em>", desc: "Emphasized text (italic)" },
        { code: "<br>", desc: "Line break" },
        { code: "<hr>", desc: "Thematic horizontal rule" },
        { code: "<blockquote>Quoted text</blockquote>", desc: "Block quotation" },
      ],
    },
    {
      title: "Lists",
      items: [
        { code: "<ul><li>Item</li></ul>", desc: "Unordered (bulleted) list" },
        { code: "<ol><li>Item</li></ol>", desc: "Ordered (numbered) list" },
        { code: "<li>List item</li>", desc: "A single list item" },
        { code: "<ol start='5'>...</ol>", desc: "Start numbering at a value" },
        { code: "<dl></dl>", desc: "Description list container" },
        { code: "<dt>Term</dt>", desc: "Term in a description list" },
        { code: "<dd>Definition</dd>", desc: "Definition of the term" },
      ],
    },
    {
      title: "Links & Images",
      items: [
        { code: "<a href='/'>Home</a>", desc: "Hyperlink to a URL or path" },
        {
          code: "<a href='https://x.com' target='_blank' rel='noopener'>External</a>",
          desc: "Open in a new tab safely",
        },
        { code: "<a href='#section'>Jump</a>", desc: "Anchor to an in-page id" },
        { code: "<a href='mailto:hi@x.com'>Email</a>", desc: "Email link" },
        {
          code: "<img src='photo.jpg' alt='A description'>",
          desc: "Image with required alt text",
        },
        {
          code: "<img src='small.jpg' srcset='large.jpg 2x'>",
          desc: "Responsive image sources",
        },
      ],
    },
    {
      title: "Tables",
      items: [
        { code: "<table></table>", desc: "Table container" },
        { code: "<thead></thead>", desc: "Groups header rows" },
        { code: "<tbody></tbody>", desc: "Groups body rows" },
        { code: "<tr></tr>", desc: "Table row" },
        { code: "<th scope='col'>Name</th>", desc: "Header cell" },
        { code: "<td>Value</td>", desc: "Standard data cell" },
        {
          code: "<td colspan='2'>Wide</td>",
          desc: "Cell spanning multiple columns",
        },
      ],
    },
    {
      title: "Forms",
      items: [
        {
          code: "<form action='/submit' method='post'></form>",
          desc: "Form that submits data",
        },
        {
          code: "<label for='name'>Name</label>",
          desc: "Label linked to an input id",
        },
        { code: "<input type='text' id='name' name='name'>", desc: "Text input" },
        {
          code: "<input type='email' required>",
          desc: "Email input with validation",
        },
        {
          code: "<input type='checkbox' name='ok'>",
          desc: "Checkbox; also radio, date, file",
        },
        { code: "<textarea rows='4'></textarea>", desc: "Multi-line text input" },
        {
          code: "<select><option value='a'>A</option></select>",
          desc: "Dropdown with options",
        },
        { code: "<button type='submit'>Send</button>", desc: "Submit button" },
      ],
    },
    {
      title: "Semantic Layout",
      items: [
        { code: "<header></header>", desc: "Introductory content or banner" },
        { code: "<nav></nav>", desc: "Navigation links" },
        { code: "<main></main>", desc: "Primary unique page content" },
        { code: "<section></section>", desc: "Thematic grouping of content" },
        { code: "<article></article>", desc: "Self-contained, reusable content" },
        { code: "<aside></aside>", desc: "Sidebar or tangential content" },
        { code: "<footer></footer>", desc: "Footer for its nearest section" },
        {
          code: "<figure><figcaption>Caption</figcaption></figure>",
          desc: "Media with a caption",
        },
      ],
    },
    {
      title: "Media & Embeds",
      items: [
        {
          code: "<audio src='song.mp3' controls></audio>",
          desc: "Audio player with controls",
        },
        {
          code: "<video src='clip.mp4' controls></video>",
          desc: "Video player with controls",
        },
        {
          code: "<source src='clip.webm' type='video/webm'>",
          desc: "Alternate media source",
        },
        {
          code: "<track kind='captions' src='caps.vtt'>",
          desc: "Captions for video or audio",
        },
        {
          code: "<iframe src='https://x.com' title='Embed'></iframe>",
          desc: "Embeds another page",
        },
      ],
    },
    {
      title: "Common Attributes",
      items: [
        { code: "<div id='main'></div>", desc: "Unique element identifier" },
        { code: "<div class='card box'></div>", desc: "Space-separated CSS classes" },
        {
          code: "<p style='color:red'>Hi</p>",
          desc: "Inline CSS styling",
        },
        { code: "<div data-user-id='42'></div>", desc: "Custom data-* attribute" },
        { code: "<a href='/path'>Link</a>", desc: "Destination URL for links" },
        { code: "<img src='pic.png' alt='Pic'>", desc: "Resource source and alt text" },
        {
          code: "<input title='Helpful hint'>",
          desc: "Tooltip text on hover",
        },
      ],
    },
  ],
};
