// Tiny client helper: ask the server to commit a completed lesson to the
// learner's GitHub journey repo. Fire-and-forget — the server returns
// { skipped } when the integration isn't connected, so callers ignore the
// result and never block the UI on it.

export async function commitLessonToJournal(input: {
  courseSlug: string;
  lessonSlug: string;
  code: string;
}): Promise<void> {
  try {
    await fetch("/api/github/commit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
  } catch {
    // Best-effort; a learner's progress never depends on the commit succeeding.
  }
}
