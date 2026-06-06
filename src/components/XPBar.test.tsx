import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { XPBar } from "./XPBar";
import { levelFromXp } from "@/lib/levels";

describe("XPBar", () => {
  it("renders the rank, level, and XP-into-level from a real LevelInfo", () => {
    const info = levelFromXp(250);
    render(<XPBar info={info} />);
    expect(
      screen.getByText(new RegExp(`Lvl ${info.level}`)),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${info.xpIntoLevel}/${info.xpForLevel} XP`),
    ).toBeInTheDocument();
    expect(screen.getByText(new RegExp(info.rank.name))).toBeInTheDocument();
  });

  it("renders for a brand-new learner at 0 XP without crashing", () => {
    const info = levelFromXp(0);
    render(<XPBar info={info} />);
    expect(screen.getByText(/Lvl 1/)).toBeInTheDocument();
  });
});
