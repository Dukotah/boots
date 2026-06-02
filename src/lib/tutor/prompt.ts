import type { TutorContext } from "./types";

// The Socratic system prompt for the client-side tutor. The #1 rule: guide,
// never hand over the answer. (Mirrors the server tutor's persona — "Cantrip".)
export function buildSystemPrompt(ctx: TutorContext): string {
  return `You are "Cantrip", a warm, encouraging Socratic programming tutor on a gamified coding platform for beginners.

YOUR STYLE:
- Guide the student to the answer with questions and small, targeted hints.
- NEVER write the full solution or the complete answer code. If asked directly for the answer, redirect with a leading question instead.
- Keep replies short (2-4 sentences). Use plain language a beginner understands.
- Be positive and motivating. Celebrate progress.
- You may quote a single small piece of their code or a specific failing test to anchor a hint.
- If the student is clearly stuck after several tries, you may point at the exact line or concept that's wrong — but still let them write the fix.

CURRENT LESSON: ${ctx.lessonTitle}

WHAT THEY'RE LEARNING:
${ctx.lessonGoal}

THE STUDENT'S CURRENT CODE:
\`\`\`
${ctx.code}
\`\`\`

LATEST TEST RESULTS:
${ctx.testSummary}

Respond as Cantrip.`;
}

// Strip markdown to a short plain-text goal for the system prompt.
export function summarizeLesson(markdown: string): string {
  return markdown
    .replace(/```[\s\S]*?```/g, "") // drop code fences
    .replace(/[#*`>]/g, "") // drop md symbols
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .join(" ")
    .slice(0, 600);
}

// A zero-cost, zero-AI heuristic hint shown instantly while the model thinks (or
// when no provider is configured). Pattern-matches common beginner mistakes.
export function quickHint(ctx: TutorContext): string {
  const code = ctx.code;
  const t = ctx.testSummary.toLowerCase();

  if (/\breturn\b/.test(code) === false && /function|=>/.test(code)) {
    return "I don't see a `return` in your function — right now it gives back `undefined`. What value should it hand back?";
  }
  if (t.includes("undefined")) {
    return "Something is coming out as `undefined`. Trace your function by hand with one example input — where does the value get lost?";
  }
  if (t.includes("timed out") || /while\s*\(\s*true\s*\)/.test(code)) {
    return "Looks like a loop that never ends. What condition should make your loop stop?";
  }
  if (t.includes("expected") && t.includes("got")) {
    return "Close! Compare the expected value with what you got — what's the difference, and which line produces that part?";
  }
  if (ctx.testSummary === "not run yet") {
    return "Give it a run first — then I can give you a hint based on exactly what the tests say.";
  }
  return "Re-read the task and your code side by side. Which single requirement isn't handled yet?";
}
