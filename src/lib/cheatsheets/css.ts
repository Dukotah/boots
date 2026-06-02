import type { CheatSheet } from "./types";

export const cssCheatsheet: CheatSheet = {
  slug: "css",
  title: "CSS Cheat Sheet",
  language: "CSS",
  emoji: "🎨",
  description:
    "A quick-reference CSS cheat sheet covering selectors, the box model, flexbox, grid, colors, typography, and transitions.",
  keywords: [
    "css cheat sheet",
    "css reference",
    "flexbox cheat sheet",
    "css grid cheat sheet",
    "css selectors",
  ],
  sections: [
    {
      title: "Selectors",
      items: [
        { code: "p { ... }", desc: "Selects all elements by tag name." },
        { code: ".btn { ... }", desc: "Selects elements with the class btn." },
        { code: "#main { ... }", desc: "Selects the element with id main." },
        { code: "* { ... }", desc: "Universal selector, matches every element." },
        { code: "nav a { ... }", desc: "Descendant: any a inside a nav." },
        { code: "ul > li { ... }", desc: "Child: direct li children of a ul." },
        { code: "a:hover { ... }", desc: "Pseudo-class for the hover state." },
        { code: "li:nth-child(2n) { ... }", desc: "Selects every even list item." },
      ],
    },
    {
      title: "Box Model",
      items: [
        { code: "margin: 16px;", desc: "Space outside the element's border." },
        { code: "padding: 8px 12px;", desc: "Space inside the border (vertical horizontal)." },
        { code: "border: 1px solid #ccc;", desc: "Border width, style, and color." },
        { code: "box-sizing: border-box;", desc: "Include padding and border in width/height." },
        { code: "width: 100%;", desc: "Sets the content/box width." },
        { code: "height: 240px;", desc: "Sets a fixed element height." },
      ],
    },
    {
      title: "Display & Position",
      items: [
        { code: "display: block;", desc: "Element takes full line width." },
        { code: "display: inline;", desc: "Flows inline; ignores width/height." },
        { code: "display: none;", desc: "Removes the element from layout." },
        { code: "position: relative;", desc: "Offsets relative to its normal spot." },
        { code: "position: absolute;", desc: "Positions vs nearest positioned ancestor." },
        { code: "position: fixed;", desc: "Pins to the viewport while scrolling." },
        { code: "position: sticky; top: 0;", desc: "Sticks once it reaches the offset." },
        { code: "z-index: 10;", desc: "Stacking order for overlapping elements." },
      ],
    },
    {
      title: "Flexbox",
      items: [
        { code: "display: flex;", desc: "Creates a flex container." },
        { code: "flex-direction: column;", desc: "Stacks items vertically instead of in a row." },
        { code: "justify-content: space-between;", desc: "Distributes items along the main axis." },
        { code: "align-items: center;", desc: "Aligns items on the cross axis." },
        { code: "gap: 16px;", desc: "Spacing between flex items." },
        { code: "flex-wrap: wrap;", desc: "Allows items to wrap onto new lines." },
        { code: "flex: 1;", desc: "Item grows to fill available space." },
      ],
    },
    {
      title: "Grid",
      items: [
        { code: "display: grid;", desc: "Creates a grid container." },
        { code: "grid-template-columns: 1fr 1fr;", desc: "Defines two equal-width columns." },
        { code: "grid-template-columns: repeat(3, 1fr);", desc: "Three equal columns via repeat()." },
        { code: "grid-template-rows: auto 1fr;", desc: "Sizes rows; 1fr fills remaining space." },
        { code: "gap: 24px;", desc: "Spacing between grid tracks." },
        { code: "grid-column: span 2;", desc: "Makes an item span two columns." },
        { code: "grid-area: header;", desc: "Places an item into a named area." },
      ],
    },
    {
      title: "Typography",
      items: [
        { code: "font-family: system-ui, sans-serif;", desc: "Sets the typeface stack." },
        { code: "font-size: 1.125rem;", desc: "Sets the text size." },
        { code: "font-weight: 600;", desc: "Sets boldness (100 to 900)." },
        { code: "line-height: 1.5;", desc: "Vertical spacing between lines." },
        { code: "text-align: center;", desc: "Aligns inline text horizontally." },
        { code: "letter-spacing: 0.05em;", desc: "Adjusts spacing between letters." },
        { code: "text-transform: uppercase;", desc: "Forces casing of the text." },
      ],
    },
    {
      title: "Colors & Backgrounds",
      items: [
        { code: "color: #1a1a1a;", desc: "Sets text color via hex." },
        { code: "background: #f5f5f5;", desc: "Sets a solid background color." },
        { code: "color: rgb(34, 102, 255);", desc: "Color using red/green/blue values." },
        { code: "color: hsl(210, 90%, 55%);", desc: "Color via hue, saturation, lightness." },
        { code: "background: linear-gradient(90deg, #06f, #0cf);", desc: "Left-to-right gradient fill." },
        { code: "opacity: 0.6;", desc: "Sets element transparency (0 to 1)." },
      ],
    },
    {
      title: "Spacing & Sizing Units",
      items: [
        { code: "padding: 16px;", desc: "Absolute pixels, fixed size." },
        { code: "font-size: 1.2em;", desc: "Relative to the parent's font size." },
        { code: "margin: 2rem;", desc: "Relative to the root font size." },
        { code: "width: 50%;", desc: "Percentage of the parent's size." },
        { code: "width: 100vw;", desc: "Percentage of the viewport width." },
        { code: "height: 100vh;", desc: "Percentage of the viewport height." },
      ],
    },
    {
      title: "Transitions & Transforms",
      items: [
        { code: "transition: all 0.2s ease;", desc: "Animates property changes smoothly." },
        { code: "transform: translate(10px, 0);", desc: "Moves an element along x/y." },
        { code: "transform: scale(1.05);", desc: "Scales the element's size." },
        { code: "transform: rotate(45deg);", desc: "Rotates the element." },
        { code: "@keyframes spin { to { transform: rotate(360deg); } }", desc: "Defines an animation sequence." },
        { code: "animation: spin 1s linear infinite;", desc: "Runs a named keyframe animation." },
      ],
    },
    {
      title: "Responsive",
      items: [
        { code: "@media (min-width: 768px) { ... }", desc: "Applies styles at tablet width and up." },
        { code: "@media (min-width: 1024px) { ... }", desc: "Targets desktop-sized viewports." },
        { code: "@media (max-width: 640px) { ... }", desc: "Targets small/mobile viewports." },
        { code: "@media (prefers-color-scheme: dark) { ... }", desc: "Styles for dark mode preference." },
        { code: "img { max-width: 100%; height: auto; }", desc: "Makes images scale responsively." },
      ],
    },
  ],
};
