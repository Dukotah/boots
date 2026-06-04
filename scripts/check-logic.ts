// Unit tests for the pure business logic that gates money and content. These
// have no DOM/network deps, so they run in plain Node. Run with:
//   npm run check:logic
import {
  freeLessonLimit,
  isFreePreview,
  canInteract,
  FREE_PREVIEW_LESSONS,
  MAX_STREAK_UNLOCK,
} from "../src/lib/access.ts";
import { lessonLanguage, langMeta, LANGUAGES } from "../src/lib/curriculum/lang.ts";
import { PLANS, getStripePriceId } from "../src/lib/billing/plans.ts";
import type { Lesson, Module } from "../src/lib/curriculum/types.ts";

let failures = 0;
function check(name: string, cond: boolean, detail?: string) {
  if (cond) console.log(`  ✓ ${name}`);
  else {
    failures++;
    console.log(`  ✗ ${name}${detail ? ` — ${detail}` : ""}`);
  }
}

// ── access policy: the free window ──
{
  check("no streak → base free window", freeLessonLimit(0) === FREE_PREVIEW_LESSONS);
  check("streak grows the window", freeLessonLimit(3) === FREE_PREVIEW_LESSONS + 3);
  check(
    "window caps at MAX_STREAK_UNLOCK",
    freeLessonLimit(9999) === FREE_PREVIEW_LESSONS + MAX_STREAK_UNLOCK,
  );
  check("negative streak floors at base", freeLessonLimit(-5) === FREE_PREVIEW_LESSONS);

  check("lesson 0 is a free preview", isFreePreview(0, 0) === true);
  check(
    "lesson just past the window is locked",
    isFreePreview(FREE_PREVIEW_LESSONS, 0) === false,
  );
  check("negative index is never free", isFreePreview(-1, 0) === false);
}

// ── access policy: canInteract (the paywall decision) ──
{
  check(
    "free course is open to everyone",
    canInteract({ isPro: false, lessonIndex: 50, free: true, streak: 0 }) === true,
  );
  check(
    "pro unlocks any lesson",
    canInteract({ isPro: true, lessonIndex: 50, streak: 0 }) === true,
  );
  check(
    "non-pro is locked past the free window",
    canInteract({ isPro: false, lessonIndex: 50, streak: 0 }) === false,
  );
  check(
    "non-pro inside the free window can interact",
    canInteract({ isPro: false, lessonIndex: 0, streak: 0 }) === true,
  );
  check(
    "streak extends interaction to later lessons",
    canInteract({ isPro: false, lessonIndex: FREE_PREVIEW_LESSONS, streak: 2 }) === true,
  );
  check(
    "invalid index is locked",
    canInteract({ isPro: false, lessonIndex: -1, streak: 0 }) === false,
  );
}

// ── language metadata: effective language resolution ──
{
  const mod = { language: "py" } as Module;
  const lessonNoLang = {} as Lesson;
  const lessonTs = { language: "ts" } as Lesson;
  check("lesson language overrides module", lessonLanguage(lessonTs, mod) === "ts");
  check("falls back to module language", lessonLanguage(lessonNoLang, mod) === "py");
  check("defaults to js with no info", lessonLanguage({} as Lesson) === "js");
}

// ── language metadata: comment syntax (used to drop hints into the editor) ──
{
  check("js line comment is //", langMeta("js").comment.open === "//");
  check("py line comment is #", langMeta("py").comment.open === "#");
  check("sql line comment is --", langMeta("sql").comment.open === "--");
  check("html comment opens with <!--", langMeta("html").comment.open === "<!--");
  check("html comment has a closer", langMeta("html").comment.close === " -->");
  check(
    "every language defines comment syntax",
    Object.values(LANGUAGES).every((l) => typeof l.comment.open === "string" && l.comment.open.length > 0),
  );
  check(
    "every language has a filename + runtime",
    Object.values(LANGUAGES).every((l) => Boolean(l.filename) && Boolean(l.runtime)),
  );
}

// ── billing plans ──
{
  check("monthly + annual plans exist", Boolean(PLANS.monthly) && Boolean(PLANS.annual));
  check(
    "each plan names its price env var",
    PLANS.monthly.priceEnv === "STRIPE_PRICE_MONTHLY" &&
      PLANS.annual.priceEnv === "STRIPE_PRICE_ANNUAL",
  );
  // getStripePriceId reads from env at call time.
  delete process.env.STRIPE_PRICE_MONTHLY;
  check("price id is undefined when env unset", getStripePriceId("monthly") === undefined);
  process.env.STRIPE_PRICE_MONTHLY = "price_test_123";
  check("price id is read from env when set", getStripePriceId("monthly") === "price_test_123");
}

if (failures) {
  console.log(`\n❌ logic: ${failures} check(s) failed.`);
  process.exit(1);
}
console.log("\n✅ business logic OK — all checks passed.");
