import { describe, it, expect } from "vitest";
import {
  TRIAL_DAYS,
  trialActive,
  trialExpired,
  trialDaysLeft,
} from "./useEntitlements";

const DAY = 24 * 60 * 60 * 1000;
const ago = (ms: number) => Date.now() - ms;

describe("reverse-trial helpers", () => {
  it("a never-started trial is neither active nor expired", () => {
    expect(trialActive({ trialStartedAt: null })).toBe(false);
    expect(trialExpired({ trialStartedAt: null })).toBe(false);
    expect(trialDaysLeft({ trialStartedAt: null })).toBe(0);
  });

  it("a freshly started trial is active with ~TRIAL_DAYS left", () => {
    const s = { trialStartedAt: Date.now() };
    expect(trialActive(s)).toBe(true);
    expect(trialExpired(s)).toBe(false);
    expect(trialDaysLeft(s)).toBe(TRIAL_DAYS);
  });

  it("a mid-trial start is active with fewer days left", () => {
    const s = { trialStartedAt: ago(10 * DAY) };
    expect(trialActive(s)).toBe(true);
    expect(trialDaysLeft(s)).toBe(TRIAL_DAYS - 10);
  });

  it("a trial past its window is expired, not active, 0 days left", () => {
    const s = { trialStartedAt: ago((TRIAL_DAYS + 1) * DAY) };
    expect(trialActive(s)).toBe(false);
    expect(trialExpired(s)).toBe(true);
    expect(trialDaysLeft(s)).toBe(0);
  });

  it("active and expired are mutually exclusive", () => {
    for (const days of [0, 1, 7, TRIAL_DAYS - 1, TRIAL_DAYS + 1, 100]) {
      const s = { trialStartedAt: ago(days * DAY) };
      expect(trialActive(s) && trialExpired(s)).toBe(false);
    }
  });
});
