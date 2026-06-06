import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AchievementProgressBar } from "./AchievementProgressBar";

describe("AchievementProgressBar", () => {
  it("renders current / goal with thousands separators", () => {
    render(<AchievementProgressBar current={1500} goal={5000} />);
    expect(screen.getByText("1,500 / 5,000")).toBeInTheDocument();
  });

  it("clamps current to the goal so it never shows over 100%", () => {
    render(<AchievementProgressBar current={9000} goal={5000} />);
    // Clamped display.
    expect(screen.getByText("5,000 / 5,000")).toBeInTheDocument();
  });

  it("does not divide by zero when goal is 0", () => {
    render(<AchievementProgressBar current={0} goal={0} />);
    expect(screen.getByText("0 / 0")).toBeInTheDocument();
  });
});
