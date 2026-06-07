// Generates the lightweight client catalog (src/lib/curriculum/catalog.data.json)
// from the heavy MODULES list. Client components import the JSON (display metadata
// + lesson ids/titles only) instead of the curriculum barrel, which keeps all
// lesson bodies/tests/solutions OUT of the browser bundle.
//
// Run directly (`node --experimental-strip-types scripts/gen-catalog.ts`) to write
// the file, or import `generateCatalog()` — `npm run check` calls it so the
// committed JSON never goes stale when modules are added.

import { writeFileSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
// MODULES is reused from check-curriculum (which imports every module with a
// Node-resolvable .ts path); importing the barrel index.ts fails under Node ESM
// because it uses extensionless imports. check-curriculum guards its main() so
// importing it here has no side effects.
import { MODULES } from "./check-curriculum.ts";
import { groupByTrack } from "../src/lib/curriculum/tracks.ts";
import { lessonId } from "../src/lib/curriculum/ids.ts";

const OUT = join(
  dirname(fileURLToPath(import.meta.url)),
  "../src/lib/curriculum/catalog.data.json",
);

export function buildCatalogData() {
  // Map each module slug → its track id (for client-side grouping without the
  // heavy module objects).
  const trackOf = new Map<string, string>();
  for (const { track, modules } of groupByTrack(MODULES)) {
    for (const m of modules) trackOf.set(m.slug, track.id);
  }

  let lessonCount = 0;
  let xpAvailable = 0;
  const modules = MODULES.map((m) => {
    lessonCount += m.lessons.length;
    xpAvailable += m.lessons.reduce((s, l) => s + (l.xp ?? 0), 0);
    return {
      slug: m.slug,
      title: m.title,
      description: m.description,
      tagline: m.tagline,
      emoji: m.emoji,
      gradient: m.gradient,
      language: m.language ?? "js",
      keywords: m.keywords ?? [],
      trackId: trackOf.get(m.slug) ?? null,
      lessonCount: m.lessons.length,
      // Per-lesson metadata (NO bodies/tests/solutions) so client libs
      // (projects, career, paths) can derive from this instead of the barrel.
      lessons: m.lessons.map((l) => ({
        slug: l.slug,
        title: l.title,
        blurb: l.blurb,
        xp: l.xp ?? 0,
        language: l.language ?? m.language ?? "js",
        id: lessonId(m.slug, l.slug),
      })),
    };
  });

  return {
    totals: { moduleCount: MODULES.length, lessonCount, xpAvailable },
    modules,
  };
}

/** Write the JSON only if it changed (keeps git diffs/builds clean). Returns true if written. */
export function generateCatalog(): boolean {
  const json = JSON.stringify(buildCatalogData(), null, 0) + "\n";
  let current = "";
  try {
    current = readFileSync(OUT, "utf8");
  } catch {
    /* first run — file doesn't exist yet */
  }
  if (current === json) return false;
  writeFileSync(OUT, json, "utf8");
  return true;
}

// Run directly?
if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith("gen-catalog.ts")) {
  const wrote = generateCatalog();
  const data = buildCatalogData();
  console.log(
    `${wrote ? "✍️  wrote" : "✓ up-to-date"} catalog.data.json — ${data.totals.moduleCount} modules, ${data.totals.lessonCount} lessons`,
  );
}
