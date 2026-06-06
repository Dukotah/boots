/**
 * TalentBuildCard — unit tests.
 *
 * The component is pure-presentational: it receives a talents[] array and renders
 * build identity, branch investment, active bonuses, and a navigation link.
 * Next.js <Link> is mocked so jsdom never touches the router.
 */

import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { TalentBuildCard } from "./TalentBuildCard";

// Mock next/link — in tests we only care that it renders an anchor with the
// correct href, not that the App Router's navigation fires.
vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    className,
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

// ── empty / no-talent state ───────────────────────────────────────────────────

describe("TalentBuildCard — empty talents", () => {
  it("shows 'Skill Tree' heading when no talents are owned", () => {
    render(<TalentBuildCard talents={[]} />);
    expect(screen.getByText("Skill Tree")).toBeInTheDocument();
  });

  it("shows the 'no talents yet' guidance text", () => {
    render(<TalentBuildCard talents={[]} />);
    expect(screen.getByText(/no talents yet/i)).toBeInTheDocument();
  });

  it("renders the 'Build →' link when no talents are owned (default href)", () => {
    render(<TalentBuildCard talents={[]} />);
    const link = screen.getByRole("link", { name: /build/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/skill-tree");
  });

  it("does NOT render 'SP to spend' badge when availableSp is 0", () => {
    render(<TalentBuildCard talents={[]} availableSp={0} />);
    expect(screen.queryByText(/sp to spend/i)).not.toBeInTheDocument();
  });
});

// ── with a single prospector talent ──────────────────────────────────────────

describe("TalentBuildCard — Prospector build", () => {
  // prospector-rush-1 (Gold Rush I, +10% gold-mult) is tier-0 with no prereqs.
  const talents = ["prospector-rush-1"];

  it("shows 'Prospector build' title when prospector dominates", () => {
    render(<TalentBuildCard talents={talents} />);
    expect(screen.getByText("Prospector build")).toBeInTheDocument();
  });

  it("renders the 'Skill Tree →' link when a build exists", () => {
    render(<TalentBuildCard talents={talents} />);
    const link = screen.getByRole("link", { name: /skill tree/i });
    expect(link).toHaveAttribute("href", "/skill-tree");
  });

  it("shows Prospector branch pill with SP count", () => {
    render(<TalentBuildCard talents={talents} />);
    // prospector-rush-1 costs 1 SP; use getAllByText since the heading also has "Prospector"
    expect(screen.getAllByText(/Prospector/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("1 SP")).toBeInTheDocument();
  });

  it("shows '+10% lesson gold' bonus when showBonuses is true (default)", () => {
    render(<TalentBuildCard talents={talents} />);
    expect(screen.getByText("+10% lesson gold")).toBeInTheDocument();
  });

  it("does NOT show bonuses when showBonuses=false", () => {
    render(<TalentBuildCard talents={talents} showBonuses={false} />);
    expect(screen.queryByText(/lesson gold/i)).not.toBeInTheDocument();
  });
});

// ── availableSp badge ─────────────────────────────────────────────────────────

describe("TalentBuildCard — SP to spend badge", () => {
  it("shows badge when availableSp > 0", () => {
    render(<TalentBuildCard talents={[]} availableSp={3} />);
    expect(screen.getByText("3 SP to spend")).toBeInTheDocument();
  });

  it("does NOT show badge when availableSp is undefined", () => {
    render(<TalentBuildCard talents={[]} />);
    expect(screen.queryByText(/sp to spend/i)).not.toBeInTheDocument();
  });
});

// ── custom href ───────────────────────────────────────────────────────────────

describe("TalentBuildCard — href prop", () => {
  it("uses a custom href when provided", () => {
    render(<TalentBuildCard talents={[]} href="/profile/build" />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/profile/build");
  });

  it("does NOT render a link when href=null", () => {
    render(<TalentBuildCard talents={[]} href={null} />);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});

// ── Sentinel talent ───────────────────────────────────────────────────────────

describe("TalentBuildCard — Sentinel talent", () => {
  const talents = ["sentinel-insurance"]; // +1 freeze/week

  it("shows 'Sentinel build' title", () => {
    render(<TalentBuildCard talents={talents} />);
    expect(screen.getByText("Sentinel build")).toBeInTheDocument();
  });

  it("shows '+1 freeze/wk' bonus chip", () => {
    render(<TalentBuildCard talents={talents} />);
    expect(screen.getByText("+1 freeze/wk")).toBeInTheDocument();
  });
});

// ── Scholar talent ────────────────────────────────────────────────────────────

describe("TalentBuildCard — Scholar talent", () => {
  const talents = ["scholar-recall-1"]; // +8 gold/review

  it("shows 'Scholar build' title", () => {
    render(<TalentBuildCard talents={talents} />);
    expect(screen.getByText("Scholar build")).toBeInTheDocument();
  });

  it("shows '+8 gold/review' bonus chip", () => {
    render(<TalentBuildCard talents={talents} />);
    expect(screen.getByText("+8 gold/review")).toBeInTheDocument();
  });
});

// ── Luminary talent (cosmetic) ────────────────────────────────────────────────

describe("TalentBuildCard — Luminary talent", () => {
  const talents = ["luminary-spark"]; // cosmetic unlock

  it("shows 'Luminary build' title", () => {
    render(<TalentBuildCard talents={talents} />);
    expect(screen.getByText("Luminary build")).toBeInTheDocument();
  });

  it("shows cosmetic count chip", () => {
    render(<TalentBuildCard talents={talents} />);
    expect(screen.getByText("1 exclusive cosmetic")).toBeInTheDocument();
  });
});

// ── Hybrid build ─────────────────────────────────────────────────────────────

describe("TalentBuildCard — Hybrid build", () => {
  // prospector-rush-1 (1 SP) + sentinel-insurance (1 SP) = equal split → Hybrid
  const talents = ["prospector-rush-1", "sentinel-insurance"];

  it("shows 'Hybrid build' when two branches are equally invested", () => {
    render(<TalentBuildCard talents={talents} />);
    expect(screen.getByText("Hybrid build")).toBeInTheDocument();
  });

  it("renders both branch pills", () => {
    render(<TalentBuildCard talents={talents} />);
    expect(screen.getByText(/Prospector/i)).toBeInTheDocument();
    expect(screen.getByText(/Sentinel/i)).toBeInTheDocument();
  });
});
