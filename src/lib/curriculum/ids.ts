// Pure curriculum id helpers — intentionally free of any lesson-content imports.
//
// Client components (LessonView, LessonSidebar, QuizView, HtmlLessonView) need a
// stable lesson id but must NOT import from the curriculum barrel (index.ts):
// that barrel statically imports all ~93 lesson-content modules to build MODULES,
// so a single helper import drags the entire curriculum into the browser bundle.
// Importing from here keeps that content out of the client.

/** Canonical completion id for a lesson: "moduleSlug/lessonSlug". */
export function lessonId(moduleSlug: string, lessonSlug: string): string {
  return `${moduleSlug}/${lessonSlug}`;
}
