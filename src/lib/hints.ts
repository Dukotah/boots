import type { Lesson, LessonLanguage } from "./curriculum/types";
import { langMeta } from "./curriculum/lang";

// A hint ladder is two parallel arrays: the text shown for each step, and an
// optional editor snapshot to load when that step is revealed. When hintCode[i]
// is a string, clicking the hint replaces the editor contents with it (and the
// changed lines get highlighted); when undefined, the hint is dropped in as a
// comment instead. See LessonView.dropHint.
export type HintLadder = { hints: string[]; hintCode: (string | undefined)[] };

const nonEmpty = (s: string) => s.trim().length > 0;

const sameCode = (a: string | undefined, b: string) =>
  a !== undefined && a.trim() === b.trim();

/**
 * Build the hint ladder for a lesson.
 *
 * Every code lesson with a `solution` gets a usable ladder — even when the
 * author wrote no hints — so the Hint button is always there and its final step
 * drops the real solution into the code box, right where the code should go:
 *
 *  - Authored hints are kept as-is, and (unless the author already ends by
 *    loading the full solution) a final "reveal the full solution" step is
 *    appended so a stuck learner can always see the answer in the editor.
 *  - With no authored hints, we synthesize a progressive reveal: short
 *    solutions get one decisive reveal; longer ones reveal in thirds and then
 *    in full. Each non-final step shows part of the solution and leaves a
 *    comment marking where more is hidden.
 */
export function deriveHintLadder(
  lesson: Lesson,
  language: LessonLanguage,
): HintLadder {
  const authoredHints = lesson.hints ?? [];
  const authoredCode = lesson.hintCode ?? [];
  const solution = (lesson.solution ?? "").trimEnd();

  // Quiz lessons and lessons with no reference solution: just pass through
  // whatever the author wrote (usually nothing).
  if (lesson.kind === "quiz" || !solution) {
    return {
      hints: [...authoredHints],
      hintCode: authoredHints.map((_, i) => authoredCode[i]),
    };
  }

  // --- No authored hints: synthesize a progressive reveal from the solution ---
  if (authoredHints.length === 0) {
    const lines = solution.split("\n");
    const codeLines = lines.filter(nonEmpty).length;
    const { open, close } = langMeta(language).comment;
    const more = `${open} … (use the next hint to reveal more)${close ?? ""}`;

    if (codeLines <= 4) {
      return {
        hints: [
          "Reveal the full solution — then read it line by line so each part makes sense.",
        ],
        hintCode: [solution],
      };
    }

    const cuts = [Math.ceil(lines.length / 3), Math.ceil((2 * lines.length) / 3)];
    const hints: string[] = [];
    const hintCode: (string | undefined)[] = [];
    cuts.forEach((upto, i) => {
      hints.push(
        i === 0
          ? "Reveal the first part of the solution and try to finish the rest yourself."
          : "Reveal more of the solution.",
      );
      hintCode.push([...lines.slice(0, upto), more].join("\n"));
    });
    hints.push("Reveal the full solution — study how every line fits together.");
    hintCode.push(solution);
    return { hints, hintCode };
  }

  // --- Authored hints: keep them, append the full solution as the last step ---
  const hints = [...authoredHints];
  const hintCode: (string | undefined)[] = authoredHints.map((_, i) => authoredCode[i]);
  if (!sameCode(hintCode[hintCode.length - 1], solution)) {
    hints.push("Still stuck? Reveal the full solution.");
    hintCode.push(solution);
  }
  return { hints, hintCode };
}

/** True when revealing step `index` will load the full solution into the editor. */
export function isSolutionStep(
  ladder: HintLadder,
  index: number,
  lesson: Lesson,
): boolean {
  return sameCode(ladder.hintCode[index], (lesson.solution ?? "").trimEnd());
}
