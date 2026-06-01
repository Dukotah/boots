// Access policy — the monetization mechanic, expressed as pure functions.
//
// Model (from GAMEPLAN §6): *content is always readable*; the **interactive**
// part (run + auto-grade) is the paid value. Every course gives a free taste —
// the first N lessons are fully interactive — and Pro unlocks the rest.
//
// This file has zero dependencies on auth or the store so it can be unit-tested
// and reused on the server (e.g. to authorize a grade request later).

/** How many lessons at the start of each course are interactive for free. */
export const FREE_PREVIEW_LESSONS = 2;

/** A lesson is part of the free taste if it's within the preview window. */
export function isFreePreview(lessonIndex: number): boolean {
  return lessonIndex < FREE_PREVIEW_LESSONS;
}

/** Can this user run/grade this lesson? Pro unlocks everything. */
export function canInteract(args: {
  isPro: boolean;
  lessonIndex: number;
}): boolean {
  return args.isPro || isFreePreview(args.lessonIndex);
}
