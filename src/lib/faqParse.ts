/**
 * parseFaqs — extracts FAQ entries from a markdown blog post body.
 *
 * Looks for a "## Frequently asked questions" section (case-insensitive) and
 * collects every question beneath it. Questions can be either:
 *   ### Question text?          (H3 heading — the dominant style)
 *   **Question text?**          (bold inline — tolerated as fallback)
 *
 * Answer text is everything between one question marker and the next question
 * marker or end of section. Markdown emphasis and links are stripped from
 * answers so schema.org receives plain text.
 *
 * Returns [] when no FAQ section is found or when parsing yields nothing.
 */
export function parseFaqs(
  markdownBody: string,
): { question: string; answer: string }[] {
  // Locate the FAQ section — from "## Frequently asked questions" to the next
  // ## heading or end of string. The (?=\n##|\s*$) lookahead keeps the
  // trailing ## available for other processing (it just stops ours here).
  const faqSectionMatch = markdownBody.match(
    /^##\s+Frequently asked questions[^\n]*\n([\s\S]*?)(?=\n##\s|$)/im,
  );
  if (!faqSectionMatch) return [];

  const section = faqSectionMatch[1];
  const faqs: { question: string; answer: string }[] = [];

  // Match each question block: either ### heading or **bold** on its own line.
  // DOTALL [\s\S] captures multi-paragraph answers until the next question/end.
  const questionBlockRe =
    /(?:^###\s+(.+?)\s*$|^\*\*(.+?)\*\*\s*$)([\s\S]*?)(?=(?:^###\s|^\*\*[^*])|$)/gm;

  let match: RegExpExecArray | null;
  while ((match = questionBlockRe.exec(section)) !== null) {
    // Group 1 = ### style, group 2 = **bold** style, group 3 = answer body
    const question = (match[1] ?? match[2] ?? "").trim();
    const rawAnswer = match[3] ?? "";
    const answer = stripMarkdown(rawAnswer).trim();
    if (question && answer) {
      faqs.push({ question, answer });
    }
  }

  return faqs;
}

/** Remove common markdown formatting so schema.org receives plain text. */
function stripMarkdown(text: string): string {
  return (
    text
      // Inline code: `code`
      .replace(/`([^`\n]+)`/g, "$1")
      // Bold-italic: ***text*** or ___text___
      .replace(/\*{3}([^*]+)\*{3}/g, "$1")
      .replace(/_{3}([^_]+)_{3}/g, "$1")
      // Bold: **text** or __text__
      .replace(/\*{2}([^*]+)\*{2}/g, "$1")
      .replace(/_{2}([^_]+)_{2}/g, "$1")
      // Italic: *text* or _text_
      .replace(/\*([^*\n]+)\*/g, "$1")
      .replace(/_([^_\n]+)_/g, "$1")
      // Markdown links: [label](url) → label
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      // Collapse lines — trim each, drop blanks, join with a space
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.length > 0)
      .join(" ")
  );
}
