/**
 * StreakHeatmap — unit tests.
 *
 * The component reads `activeDays` from the game store and `useMounted()` to
 * guard against SSR hydration mismatches. Both are mocked here so the tests
 * run in a deterministic, store-free environment.
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

// ── Mocks (registered before the component import) ───────────────────────────

// useMounted: default to mounted=true so we see the real heatmap content.
// Individual tests override this via mockReturnValueOnce where needed.
const mockUseMounted = vi.fn(() => true);
vi.mock("@/hooks/useMounted", () => ({
  useMounted: () => mockUseMounted(),
}));

// useGameStore: we mock the whole module so the component gets whatever
// activeDays we inject per test.
const mockActiveDays: string[] = [];
vi.mock("@/store/useGameStore", () => ({
  useGameStore: (selector: (s: { activeDays: string[] }) => unknown) =>
    selector({ activeDays: mockActiveDays }),
}));

import { StreakHeatmap } from "./StreakHeatmap";

// Helper: produce a local day-key in the same format the store/heatmap uses
// (year-month-date, 0-indexed month).
function keyFor(d: Date): string {
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

beforeEach(() => {
  // Reset activeDays between tests.
  mockActiveDays.length = 0;
  mockUseMounted.mockReturnValue(true);
});

// ── pre-mount skeleton ────────────────────────────────────────────────────────

describe("StreakHeatmap — pre-mount (SSR skeleton)", () => {
  it("renders a placeholder div when not yet mounted", () => {
    mockUseMounted.mockReturnValueOnce(false);
    const { container } = render(<StreakHeatmap />);
    // The skeleton is a plain <div className="card h-32" />.
    const skeleton = container.querySelector(".card.h-32");
    expect(skeleton).not.toBeNull();
  });

  it("does NOT render the 'Your activity' heading when not mounted", () => {
    mockUseMounted.mockReturnValueOnce(false);
    render(<StreakHeatmap />);
    expect(screen.queryByText("Your activity")).not.toBeInTheDocument();
  });
});

// ── mounted, no active days ───────────────────────────────────────────────────

describe("StreakHeatmap — mounted, zero active days", () => {
  it("renders the 'Your activity' heading", () => {
    render(<StreakHeatmap />);
    expect(screen.getByText("Your activity")).toBeInTheDocument();
  });

  it("shows '0 active days' counter", () => {
    render(<StreakHeatmap />);
    expect(screen.getByText(/0 active days/i)).toBeInTheDocument();
  });

  it("renders exactly 119 cell divs", () => {
    const { container } = render(<StreakHeatmap />);
    // The grid is a direct parent; cells have either bg-accent or bg-surface-2.
    const cells = container.querySelectorAll(".h-3.w-3");
    expect(cells.length).toBe(119);
  });

  it("all cells have bg-surface-2 (none active) when activeDays is empty", () => {
    const { container } = render(<StreakHeatmap />);
    const activeCells = container.querySelectorAll(".bg-accent");
    expect(activeCells.length).toBe(0);
  });
});

// ── mounted, some active days ─────────────────────────────────────────────────

describe("StreakHeatmap — mounted, with active days", () => {
  it("counts active days correctly and shows singular 'day'", () => {
    const today = new Date();
    mockActiveDays.push(keyFor(today));
    render(<StreakHeatmap />);
    expect(screen.getByText(/1 active day ·/i)).toBeInTheDocument();
  });

  it("uses plural 'days' for more than one active day", () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    mockActiveDays.push(keyFor(today), keyFor(yesterday));
    render(<StreakHeatmap />);
    expect(screen.getByText(/2 active days ·/i)).toBeInTheDocument();
  });

  it("marks today's cell as active (bg-accent) when today is in activeDays", () => {
    const today = new Date();
    mockActiveDays.push(keyFor(today));
    const { container } = render(<StreakHeatmap />);
    const activeCells = container.querySelectorAll(".bg-accent");
    // Exactly one cell should be active.
    expect(activeCells.length).toBe(1);
  });

  it("active cells have title='Practiced'", () => {
    const today = new Date();
    mockActiveDays.push(keyFor(today));
    render(<StreakHeatmap />);
    const practiced = screen.getAllByTitle("Practiced");
    expect(practiced.length).toBe(1);
  });

  it("inactive cells have title='No practice'", () => {
    const today = new Date();
    mockActiveDays.push(keyFor(today));
    render(<StreakHeatmap />);
    const inactive = screen.getAllByTitle("No practice");
    // 119 cells total, 1 active → 118 inactive.
    expect(inactive.length).toBe(118);
  });

  it("days outside the 119-day window are not counted as active", () => {
    // A very old key (well outside the 17-week window) should not be active.
    mockActiveDays.push("2000-0-1");
    render(<StreakHeatmap />);
    expect(screen.getByText(/0 active days/i)).toBeInTheDocument();
  });

  it("shows the '· last 17 weeks' suffix in the counter", () => {
    render(<StreakHeatmap />);
    expect(screen.getByText(/last 17 weeks/i)).toBeInTheDocument();
  });
});
