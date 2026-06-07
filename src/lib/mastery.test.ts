/**
 * mastery.ts — unit tests for the FSRS-lite scheduler and legacy helpers.
 *
 * All functions under test are pure; no mocks required.
 */

import { describe, it, expect } from "vitest";
import {
  intervalForBox,
  nextBox,
  isReviewDue,
  fsrsMigrate,
  fsrsSchedule,
  recallProbability,
  REVIEW_INTERVALS,
  MAX_BOX,
  type ReviewRecord,
  type Rating,
} from "./mastery";

// ── intervalForBox ────────────────────────────────────────────────────────────

describe("intervalForBox", () => {
  it("returns 1 day for box 0", () => {
    expect(intervalForBox(0)).toBe(1);
  });

  it("returns the correct intervals for all boxes", () => {
    REVIEW_INTERVALS.forEach((interval, i) => {
      expect(intervalForBox(i)).toBe(interval);
    });
  });

  it("clamps below 0 to box 0", () => {
    expect(intervalForBox(-1)).toBe(REVIEW_INTERVALS[0]);
  });

  it("clamps above MAX_BOX to MAX_BOX interval", () => {
    expect(intervalForBox(MAX_BOX + 5)).toBe(REVIEW_INTERVALS[MAX_BOX]);
  });
});

// ── nextBox ───────────────────────────────────────────────────────────────────

describe("nextBox", () => {
  it("increments by 1", () => {
    expect(nextBox(0)).toBe(1);
    expect(nextBox(2)).toBe(3);
  });

  it("caps at MAX_BOX", () => {
    expect(nextBox(MAX_BOX)).toBe(MAX_BOX);
    expect(nextBox(MAX_BOX + 10)).toBe(MAX_BOX);
  });
});

// ── isReviewDue (legacy path) ─────────────────────────────────────────────────

describe("isReviewDue — legacy Leitner records", () => {
  const legacyRec = (box: number): ReviewRecord => ({ box, last: "2020-0-1" });

  it("box 0 is due after 1 day", () => {
    expect(isReviewDue(legacyRec(0), 1)).toBe(true);
  });

  it("box 0 is NOT due on day 0 (same day)", () => {
    expect(isReviewDue(legacyRec(0), 0)).toBe(false);
  });

  it("box 4 is due after 35 days", () => {
    expect(isReviewDue(legacyRec(4), 35)).toBe(true);
  });

  it("box 4 is NOT due after 34 days", () => {
    expect(isReviewDue(legacyRec(4), 34)).toBe(false);
  });
});

// ── isReviewDue (FSRS path) ───────────────────────────────────────────────────

describe("isReviewDue — FSRS records", () => {
  const fsrsRec = (stability: number): ReviewRecord => ({
    box: 1,
    last: "2020-0-1",
    stability,
    difficulty: 5,
    reps: 1,
  });

  it("due when elapsed >= stability * 0.95 (lower fuzz bound)", () => {
    const rec = fsrsRec(10);
    // threshold = round(10 * 0.95) = 10
    expect(isReviewDue(rec, 10)).toBe(true);
  });

  it("not due when elapsed < threshold", () => {
    const rec = fsrsRec(10);
    expect(isReviewDue(rec, 9)).toBe(false);
  });

  it("stability 1 → threshold 1 → due after 1 day", () => {
    expect(isReviewDue(fsrsRec(1), 1)).toBe(true);
    expect(isReviewDue(fsrsRec(1), 0)).toBe(false);
  });

  it("large stability delays reviews appropriately", () => {
    const rec = fsrsRec(100);
    // threshold = round(100 * 0.95) = 95
    expect(isReviewDue(rec, 94)).toBe(false);
    expect(isReviewDue(rec, 95)).toBe(true);
  });
});

// ── fsrsMigrate ───────────────────────────────────────────────────────────────

describe("fsrsMigrate", () => {
  it("maps box 0 → stability 1, difficulty 5, reps 0", () => {
    const result = fsrsMigrate({ box: 0, last: "2020-0-1" });
    expect(result.stability).toBe(1);
    expect(result.difficulty).toBe(5);
    expect(result.reps).toBe(0);
  });

  it("maps box 4 → stability 35 (last Leitner interval)", () => {
    const result = fsrsMigrate({ box: 4, last: "2020-0-1" });
    expect(result.stability).toBe(35);
    expect(result.reps).toBe(4);
  });
});

// ── fsrsSchedule ──────────────────────────────────────────────────────────────

describe("fsrsSchedule — first review (reps=0)", () => {
  const freshRecord: ReviewRecord = {
    box: 0,
    last: "2020-0-1",
    stability: 1,
    difficulty: 5,
    reps: 0,
  };
  const today = "2020-0-2";

  it("Again on first review → short stability, reps stays at 0", () => {
    const result = fsrsSchedule(freshRecord, "again", today);
    expect(result.reps).toBe(0);
    expect(result.stability).toBeGreaterThan(0);
    expect(result.nextInterval).toBeGreaterThanOrEqual(1);
  });

  it("Good on first review → reps becomes 1", () => {
    const result = fsrsSchedule(freshRecord, "good", today);
    expect(result.reps).toBe(1);
  });

  it("Easy on first review → longer stability than Good", () => {
    const good = fsrsSchedule(freshRecord, "good", today);
    const easy = fsrsSchedule(freshRecord, "easy", today);
    expect(easy.stability).toBeGreaterThan(good.stability!);
  });

  it("Again on first review → shorter stability than Good", () => {
    const again = fsrsSchedule(freshRecord, "again", today);
    const good = fsrsSchedule(freshRecord, "good", today);
    expect(again.stability).toBeLessThan(good.stability!);
  });
});

describe("fsrsSchedule — mature card (reps > 0)", () => {
  const matureRecord: ReviewRecord = {
    box: 3,
    last: "2020-0-1",
    stability: 20,
    difficulty: 5,
    reps: 5,
  };

  it("Good review increases stability", () => {
    const result = fsrsSchedule(matureRecord, "good", "2020-0-21");
    expect(result.stability).toBeGreaterThan(matureRecord.stability!);
  });

  it("Easy review grows stability more than Good", () => {
    const good = fsrsSchedule(matureRecord, "good", "2020-0-21");
    const easy = fsrsSchedule(matureRecord, "easy", "2020-0-21");
    expect(easy.stability).toBeGreaterThan(good.stability!);
  });

  it("Hard review grows stability less than Good", () => {
    const hard = fsrsSchedule(matureRecord, "hard", "2020-0-21");
    const good = fsrsSchedule(matureRecord, "good", "2020-0-21");
    expect(hard.stability).toBeLessThan(good.stability!);
  });

  it("nextInterval is always at least 1", () => {
    const ratings: Rating[] = ["again", "hard", "good", "easy"];
    for (const rating of ratings) {
      const result = fsrsSchedule(matureRecord, rating, "2020-0-21");
      expect(result.nextInterval).toBeGreaterThanOrEqual(1);
    }
  });

  it("stability never exceeds 365 days", () => {
    // Extremely stable card — growth should be capped.
    const superMature: ReviewRecord = {
      box: 4,
      last: "2020-0-1",
      stability: 300,
      difficulty: 2,
      reps: 50,
    };
    const result = fsrsSchedule(superMature, "easy", "2021-0-1");
    expect(result.stability).toBeLessThanOrEqual(365);
  });

  it("reps increments on non-Again ratings", () => {
    const result = fsrsSchedule(matureRecord, "good", "2020-0-21");
    expect(result.reps).toBe(matureRecord.reps! + 1);
  });

  it("difficulty clamps between 1 and 10", () => {
    const ratings: Rating[] = ["again", "hard", "good", "easy"];
    for (const rating of ratings) {
      const result = fsrsSchedule(matureRecord, rating, "2020-0-21");
      expect(result.difficulty).toBeGreaterThanOrEqual(1);
      expect(result.difficulty).toBeLessThanOrEqual(10);
    }
  });
});

describe("fsrsSchedule — legacy (no FSRS fields) migration", () => {
  const legacyRecord: ReviewRecord = { box: 2, last: "2020-0-1" };

  it("works without crashing on a legacy record", () => {
    expect(() => fsrsSchedule(legacyRecord, "good", "2020-0-8")).not.toThrow();
  });

  it("produces a valid next interval for a legacy record", () => {
    const result = fsrsSchedule(legacyRecord, "good", "2020-0-8");
    expect(result.nextInterval).toBeGreaterThanOrEqual(1);
    expect(result.stability).toBeGreaterThan(0);
  });
});

// ── recallProbability ─────────────────────────────────────────────────────────

describe("recallProbability", () => {
  const rec: ReviewRecord = {
    box: 1,
    last: "2020-0-1",
    stability: 10,
    difficulty: 5,
    reps: 1,
  };

  it("returns 1.0 (full recall) on day 0 (just reviewed)", () => {
    // elapsed = 0 → 0.9^(0/10) = 0.9^0 = 1
    const p = recallProbability(rec, "2020-0-1");
    expect(p).toBeCloseTo(1.0, 5);
  });

  it("returns ~0.9 at stability days elapsed", () => {
    // elapsed = stability (10) → 0.9^(10/10) = 0.9
    const p = recallProbability(rec, "2020-0-11");
    expect(p).toBeCloseTo(0.9, 2);
  });

  it("decays toward 0 at far future dates", () => {
    const p = recallProbability(rec, "2022-0-1"); // ~730 days out
    expect(p).toBeLessThan(0.01);
  });

  it("higher stability → slower decay", () => {
    const stable: ReviewRecord = { ...rec, stability: 100 };
    const unstable: ReviewRecord = { ...rec, stability: 5 };
    const stableP = recallProbability(stable, "2020-0-11");
    const unstableP = recallProbability(unstable, "2020-0-11");
    expect(stableP).toBeGreaterThan(unstableP);
  });
});
