// Language display names — shared by the résumé builder (lib/career) and the
// portfolio (lib/projects). Kept in its own neutral module so those two don't
// import each other (avoids a cycle). Breadth records languages by short code
// (lib/progress); map the codes our curriculum uses to résumé-worthy names, and
// title-case anything unknown.
const LANGUAGE_NAMES: Record<string, string> = {
  js: "JavaScript",
  ts: "TypeScript",
  py: "Python",
  sql: "SQL",
  html: "HTML & CSS",
  bash: "Shell / Bash",
};

export function languageName(code: string): string {
  return LANGUAGE_NAMES[code] ?? code.charAt(0).toUpperCase() + code.slice(1);
}
