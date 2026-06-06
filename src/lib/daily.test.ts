import { describe, it, expect } from "vitest";
import {
  dayKeyOf,
  todayDailyKey,
  pickDaily,
  recentDailyPicks,
  dailyShareText,
  DAILY_BONUS_GOLD,
  DAILY_BONUS_XP,
} from "./daily";

// ── Constants ─────────────────────────────────────────────────────────────────

describe("daily reward constants", () => {
  it("DAILY_BONUS_GOLD is a positive integer", () => {
    expect(DAILY_BONUS_GOLD).toBeGreaterThan(0);
    expect(Number.isInteger(DAILY_BONUS_GOLD)).toBe(true);
  });

  it("DAILY_BONUS_XP is a positive integer", () => {
    expect(DAILY_BONUS_XP).toBeGreaterThan(0);
    expect(Number.isInteger(DAILY_BONUS_XP)).toBe(true);
  });
});

// ── dayKeyOf ──────────────────────────────────────────────────────────────────

describe("dayKeyOf", () => {
  it("formats a known date correctly", () => {
    // Month is 0-indexed in the format, so Jan = 0.
    const d = new Date(2024, 0, 15); // Jan 15 2024
    expect(dayKeyOf(d)).toBe("2024-0-15");
  });

  it("formats December correctly (month index 11)", () => {
    const d = new Date(2024, 11, 31);
    expect(dayKeyOf(d)).toBe("2024-11-31");
  });

  it("two identical days produce the same key", () => {
    expect(dayKeyOf(new Date(2025, 5, 1))).toBe(dayKeyOf(new Date(2025, 5, 1)));
  });

  it("two different days produce different keys", () => {
    expect(dayKeyOf(new Date(2025, 5, 1))).not.toBe(dayKeyOf(new Date(2025, 5, 2)));
  });
});

// ── todayDailyKey ─────────────────────────────────────────────────────────────

describe("todayDailyKey", () => {
  it("matches dayKeyOf(new Date())", () => {
    // Sample immediately so the date can't flip midnight between calls.
    const now = new Date();
    const expected = dayKeyOf(now);
    // Allow a 1-second window for clock ticks between the two calls.
    expect(todayDailyKey()).toBe(expected);
  });
});

// ── pickDaily ─────────────────────────────────────────────────────────────────

describe("pickDaily", () => {
  it("returns a DailyPick with the expected shape", () => {
    const pick = pickDaily("2025-5-6");
    expect(pick).toHaveProperty("module");
    expect(pick).toHaveProperty("lesson");
    expect(pick).toHaveProperty("id");
    expect(pick).toHaveProperty("href");
  });

  it("id is 'moduleSlug/lessonSlug'", () => {
    const pick = pickDaily("2025-5-6");
    expect(pick.id).toBe(`${pick.module.slug}/${pick.lesson.slug}`);
  });

  it("href is '/learn/moduleSlug/lessonSlug'", () => {
    const pick = pickDaily("2025-5-6");
    expect(pick.href).toBe(`/learn/${pick.module.slug}/${pick.lesson.slug}`);
  });

  it("is deterministic — the same day key always returns the same lesson", () => {
    const key = "2025-5-6";
    expect(pickDaily(key).id).toBe(pickDaily(key).id);
  });

  it("two different day keys almost always produce different lessons", () => {
    // Very unlikely for all three to collide, since the pool has 100s of lessons.
    const picks = ["2025-0-1", "2025-1-1", "2025-6-15"].map(pickDaily);
    const ids = picks.map((p) => p.id);
    const unique = new Set(ids).size;
    expect(unique).toBeGreaterThanOrEqual(2);
  });

  it("never returns an undefined module or lesson", () => {
    const keys = [
      "2025-0-1",
      "2025-3-15",
      "2025-6-30",
      "2024-11-31",
      "2026-0-1",
    ];
    for (const key of keys) {
      const { module, lesson } = pickDaily(key);
      expect(module).toBeDefined();
      expect(lesson).toBeDefined();
    }
  });
});

// ── recentDailyPicks ──────────────────────────────────────────────────────────

describe("recentDailyPicks", () => {
  const anchor = new Date(2025, 5, 10); // June 10 2025

  it("returns exactly n entries", () => {
    expect(recentDailyPicks(5, anchor)).toHaveLength(5);
  });

  it("offset 0 is today (the anchor)", () => {
    const picks = recentDailyPicks(3, anchor);
    expect(picks[0].offset).toBe(0);
    expect(picks[0].dayKey).toBe(dayKeyOf(anchor));
  });

  it("offsets are sequential (0, 1, 2, …)", () => {
    const picks = recentDailyPicks(4, anchor);
    picks.forEach((p, i) => expect(p.offset).toBe(i));
  });

  it("each entry has a valid DailyPick", () => {
    for (const { pick } of recentDailyPicks(3, anchor)) {
      expect(pick.id).toContain("/");
      expect(pick.href).toMatch(/^\/learn\//);
    }
  });

  it("days go backwards from the anchor", () => {
    const picks = recentDailyPicks(3, anchor);
    const d1 = new Date(anchor.getFullYear(), anchor.getMonth(), anchor.getDate() - 1);
    expect(picks[1].dayKey).toBe(dayKeyOf(d1));
  });

  it("n=1 returns only today", () => {
    const picks = recentDailyPicks(1, anchor);
    expect(picks).toHaveLength(1);
    expect(picks[0].offset).toBe(0);
  });
});

// ── dailyShareText ────────────────────────────────────────────────────────────

describe("dailyShareText", () => {
  it("includes the word 'Cantrip'", () => {
    expect(dailyShareText(0)).toContain("Cantrip");
  });

  it("includes a flame emoji and streak count when streak > 0", () => {
    const text = dailyShareText(5);
    expect(text).toContain("🔥");
    expect(text).toContain("5");
  });

  it("omits the flame emoji when streak is 0", () => {
    expect(dailyShareText(0)).not.toContain("🔥");
  });

  it("returns a non-empty string in all cases", () => {
    expect(dailyShareText(0).length).toBeGreaterThan(0);
    expect(dailyShareText(99).length).toBeGreaterThan(0);
  });
});
