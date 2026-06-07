/**
 * DailyChallenge — unit tests.
 *
 * The component reads four slices from useGameStore (completed, dailyChallengeClaimed,
 * dailyChallengeStreak, claimDailyChallenge) and calls three @/lib/daily helpers
 * (todayDailyKey, pickDaily, deriveDailyMeta). All are mocked so the suite is
 * store-free, clock-free, and curriculum-free.
 *
 * Three mounted states under test:
 *   1. Not yet started — lesson link present, XP badge visible, no claim UI.
 *   2. Done but not claimed — claim button visible.
 *   3. Done and claimed — "Bonus claimed" confirmation visible.
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

// ── Next.js Link mock ─────────────────────────────────────────────────────────
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

// ── useMounted mock ───────────────────────────────────────────────────────────
const mockUseMounted = vi.fn(() => true);
vi.mock("@/hooks/useMounted", () => ({
  useMounted: () => mockUseMounted(),
}));

// ── useGameStore mock ─────────────────────────────────────────────────────────
// Mutable per-test state; individual tests override fields as needed.
const mockState = {
  completed: [] as string[],
  dailyChallengeClaimed: null as string | null,
  dailyChallengeStreak: 0,
  claimDailyChallenge: vi.fn(),
};

vi.mock("@/store/useGameStore", () => ({
  useGameStore: (
    selector: (s: typeof mockState) => unknown,
  ) => selector(mockState),
}));

// ── @/lib/daily mock ─────────────────────────────────────────────────────────
const MOCK_TODAY = "2026-5-7"; // fixed day key (June 7, 0-indexed month)
const MOCK_LESSON_ID = "python-basics/first-function";
const MOCK_LESSON_HREF = "/learn/python-basics/first-function";
const MOCK_LESSON_XP = 20;
const MOCK_LESSON_TITLE = "Your First Function";
const MOCK_LESSON_BLURB = "Define a function and call it.";
const MOCK_PICK = {
  module: { emoji: "🐍", language: "py", keywords: ["python", "functions"] },
  lesson: {
    title: MOCK_LESSON_TITLE,
    blurb: MOCK_LESSON_BLURB,
    xp: MOCK_LESSON_XP,
  },
  id: MOCK_LESSON_ID,
  href: MOCK_LESSON_HREF,
};
const MOCK_META = {
  difficulty: "Medium",
  difficultyColor: "bg-yellow-500/20 text-yellow-400",
  tags: ["Python", "Functions"],
  estimatedMinutes: 6,
};
const MOCK_BONUS_GOLD = 20;

vi.mock("@/lib/daily", () => ({
  todayDailyKey: () => MOCK_TODAY,
  pickDaily: () => MOCK_PICK,
  deriveDailyMeta: () => MOCK_META,
  // Primitive export: must be inlined (vi.mock factories are hoisted before
  // const declarations, causing TDZ errors if a raw variable is used here).
  DAILY_BONUS_GOLD: 20,
}));

// Import AFTER all mocks are registered.
import { DailyChallenge } from "./DailyChallenge";

// ── helpers ───────────────────────────────────────────────────────────────────

function resetState() {
  mockState.completed = [];
  mockState.dailyChallengeClaimed = null;
  mockState.dailyChallengeStreak = 0;
  mockState.claimDailyChallenge = vi.fn();
  mockUseMounted.mockReturnValue(true);
}

beforeEach(resetState);

// ── pre-mount (SSR skeleton) ──────────────────────────────────────────────────

describe("DailyChallenge — pre-mount skeleton", () => {
  it("renders a card placeholder div when not yet mounted", () => {
    mockUseMounted.mockReturnValueOnce(false);
    const { container } = render(<DailyChallenge />);
    const skeleton = container.querySelector(".card.h-28");
    expect(skeleton).not.toBeNull();
  });

  it("does not render the challenge heading when not mounted", () => {
    mockUseMounted.mockReturnValueOnce(false);
    render(<DailyChallenge />);
    expect(screen.queryByText(/challenge of the day/i)).not.toBeInTheDocument();
  });
});

// ── mounted, lesson not yet completed ────────────────────────────────────────

describe("DailyChallenge — not yet started", () => {
  it("renders the 'Challenge of the day' heading", () => {
    render(<DailyChallenge />);
    expect(screen.getByText(/challenge of the day/i)).toBeInTheDocument();
  });

  it("shows the lesson title", () => {
    render(<DailyChallenge />);
    expect(screen.getByText(MOCK_LESSON_TITLE)).toBeInTheDocument();
  });

  it("shows the lesson blurb", () => {
    render(<DailyChallenge />);
    expect(screen.getByText(MOCK_LESSON_BLURB)).toBeInTheDocument();
  });

  it("renders the difficulty badge", () => {
    render(<DailyChallenge />);
    expect(screen.getByText("Medium")).toBeInTheDocument();
  });

  it("renders the estimated time", () => {
    render(<DailyChallenge />);
    expect(screen.getByText(/~6 min/)).toBeInTheDocument();
  });

  it("renders a link to the lesson page", () => {
    render(<DailyChallenge />);
    const link = screen.getByRole("link", { name: /your first function/i });
    expect(link).toHaveAttribute("href", MOCK_LESSON_HREF);
  });

  it("shows the XP reward badge", () => {
    render(<DailyChallenge />);
    expect(screen.getByText(`+${MOCK_LESSON_XP} XP`)).toBeInTheDocument();
  });

  it("renders a 'View' link to /daily", () => {
    render(<DailyChallenge />);
    const viewLink = screen.getByRole("link", { name: /^view$/i });
    expect(viewLink).toHaveAttribute("href", "/daily");
  });

  it("does not show the claim button when not done", () => {
    render(<DailyChallenge />);
    expect(
      screen.queryByRole("button", { name: /claim/i }),
    ).not.toBeInTheDocument();
  });

  it("does not show the 'Bonus claimed' message when not done", () => {
    render(<DailyChallenge />);
    expect(screen.queryByText(/bonus claimed/i)).not.toBeInTheDocument();
  });
});

// ── streak badge ──────────────────────────────────────────────────────────────

describe("DailyChallenge — streak badge", () => {
  it("does not render the streak badge when streak is 0", () => {
    mockState.dailyChallengeStreak = 0;
    render(<DailyChallenge />);
    expect(
      screen.queryByTitle("Daily-challenge streak"),
    ).not.toBeInTheDocument();
  });

  it("shows the streak count when streak > 0", () => {
    mockState.dailyChallengeStreak = 5;
    render(<DailyChallenge />);
    const badge = screen.getByTitle("Daily-challenge streak");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent("5");
  });

  it("shows streak of 1 correctly", () => {
    mockState.dailyChallengeStreak = 1;
    render(<DailyChallenge />);
    expect(screen.getByTitle("Daily-challenge streak")).toHaveTextContent("1");
  });
});

// ── done but not claimed ──────────────────────────────────────────────────────

describe("DailyChallenge — completed, bonus not yet claimed", () => {
  beforeEach(() => {
    mockState.completed = [MOCK_LESSON_ID];
    mockState.dailyChallengeClaimed = null;
  });

  it("shows the claim button", () => {
    render(<DailyChallenge />);
    expect(
      screen.getByRole("button", { name: /claim/i }),
    ).toBeInTheDocument();
  });

  it("claim button label includes the gold amount", () => {
    render(<DailyChallenge />);
    expect(
      screen.getByRole("button", { name: /claim \+20 gold/i }),
    ).toBeInTheDocument();
  });

  it("calls claimDailyChallenge when the claim button is clicked", () => {
    render(<DailyChallenge />);
    fireEvent.click(screen.getByRole("button", { name: /claim/i }));
    expect(mockState.claimDailyChallenge).toHaveBeenCalledOnce();
  });

  it("does not show the 'Bonus claimed' confirmation yet", () => {
    render(<DailyChallenge />);
    expect(screen.queryByText(/bonus claimed/i)).not.toBeInTheDocument();
  });

  it("hides the XP badge once the lesson is done", () => {
    render(<DailyChallenge />);
    expect(
      screen.queryByText(`+${MOCK_LESSON_XP} XP`),
    ).not.toBeInTheDocument();
  });
});

// ── done and claimed ──────────────────────────────────────────────────────────

describe("DailyChallenge — completed and claimed", () => {
  beforeEach(() => {
    mockState.completed = [MOCK_LESSON_ID];
    mockState.dailyChallengeClaimed = MOCK_TODAY;
  });

  it("shows the 'Bonus claimed' confirmation", () => {
    render(<DailyChallenge />);
    expect(screen.getByText(/bonus claimed/i)).toBeInTheDocument();
  });

  it("includes the 'back tomorrow' prompt", () => {
    render(<DailyChallenge />);
    expect(screen.getByText(/back tomorrow/i)).toBeInTheDocument();
  });

  it("does not show the claim button once claimed", () => {
    render(<DailyChallenge />);
    expect(
      screen.queryByRole("button", { name: /claim/i }),
    ).not.toBeInTheDocument();
  });
});
