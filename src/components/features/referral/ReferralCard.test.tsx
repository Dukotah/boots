/**
 * ReferralCard — unit tests.
 *
 * The component fetches /api/referrals on mount and renders based on the
 * response. We mock global.fetch per test to control what the API returns.
 * Next.js <Link> is mocked so jsdom never touches the App Router.
 * navigator.clipboard is mocked to test the copy interaction.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor, fireEvent, act } from "@testing-library/react";

// ── Next.js Link mock ──────────────────────────────────────────────────────────
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

import { ReferralCard } from "./ReferralCard";

// ── helpers ───────────────────────────────────────────────────────────────────

type ReferralData = {
  skipped?: boolean;
  code?: string;
  invited?: number;
  completed?: number;
  monthsEarned?: number;
  error?: string;
};

function mockFetch(data: ReferralData) {
  vi.spyOn(global, "fetch").mockResolvedValueOnce({
    json: () => Promise.resolve(data),
  } as Response);
}

function mockFetchError() {
  vi.spyOn(global, "fetch").mockRejectedValueOnce(new Error("network error"));
}

beforeEach(() => {
  // jsdom's navigator has no `clipboard`, so a getter spy throws. Define it
  // directly instead (configurable so afterEach/restore can replace it).
  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: { writeText: vi.fn().mockResolvedValue(undefined), readText: vi.fn() },
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});

// ── hidden states ─────────────────────────────────────────────────────────────

describe("ReferralCard — hidden when data is unavailable", () => {
  it("renders nothing while the fetch is in-flight (null state)", () => {
    // Never resolve the fetch so the component stays in null state.
    vi.spyOn(global, "fetch").mockReturnValueOnce(new Promise(() => {}));
    const { container } = render(<ReferralCard />);
    expect(container.firstChild).toBeNull();
  });

  it("renders nothing when the API returns skipped=true", async () => {
    mockFetch({ skipped: true });
    const { container } = render(<ReferralCard />);
    await waitFor(() => {
      expect(container.firstChild).toBeNull();
    });
  });

  it("renders nothing when the API returns an error field", async () => {
    mockFetch({ error: "unauthenticated" });
    const { container } = render(<ReferralCard />);
    await waitFor(() => {
      expect(container.firstChild).toBeNull();
    });
  });

  it("renders nothing when the API returns no code", async () => {
    mockFetch({ invited: 2, completed: 1, monthsEarned: 1 });
    const { container } = render(<ReferralCard />);
    await waitFor(() => {
      expect(container.firstChild).toBeNull();
    });
  });

  it("renders nothing when fetch throws (graceful degradation)", async () => {
    mockFetchError();
    const { container } = render(<ReferralCard />);
    await waitFor(() => {
      expect(container.firstChild).toBeNull();
    });
  });
});

// ── visible state ─────────────────────────────────────────────────────────────

const GOOD_DATA: ReferralData = {
  code: "BOOTS42",
  invited: 3,
  completed: 1,
  monthsEarned: 1,
};

describe("ReferralCard — visible when code is present", () => {
  it("renders the heading when a valid code is returned", async () => {
    mockFetch(GOOD_DATA);
    render(<ReferralCard />);
    await waitFor(() => {
      expect(screen.getByText(/you both earn free pro/i)).toBeInTheDocument();
    });
  });

  it("shows the referral URL containing the code", async () => {
    mockFetch(GOOD_DATA);
    render(<ReferralCard />);
    await waitFor(() => {
      expect(screen.getByText(/\?ref=BOOTS42/)).toBeInTheDocument();
    });
  });

  it("shows the invited count", async () => {
    mockFetch(GOOD_DATA);
    render(<ReferralCard />);
    await waitFor(() => {
      expect(screen.getByText("invited")).toBeInTheDocument();
      // The count '3' appears as a sibling <span> before 'invited'.
      expect(screen.getByText("3")).toBeInTheDocument();
    });
  });

  it("shows the completed (subscribed) count", async () => {
    mockFetch(GOOD_DATA);
    render(<ReferralCard />);
    await waitFor(() => {
      expect(screen.getByText("subscribed")).toBeInTheDocument();
    });
  });

  it("shows the months earned", async () => {
    mockFetch(GOOD_DATA);
    render(<ReferralCard />);
    await waitFor(() => {
      expect(screen.getByText("months earned")).toBeInTheDocument();
    });
  });

  it("renders the 'Details →' link pointing to /refer", async () => {
    mockFetch(GOOD_DATA);
    render(<ReferralCard />);
    await waitFor(() => {
      const link = screen.getByRole("link", { name: /details/i });
      expect(link).toHaveAttribute("href", "/refer");
    });
  });

  it("renders a Copy button", async () => {
    mockFetch(GOOD_DATA);
    render(<ReferralCard />);
    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /copy referral link/i }),
      ).toBeInTheDocument();
    });
  });
});

// ── copy interaction ──────────────────────────────────────────────────────────

describe("ReferralCard — copy interaction", () => {
  it("shows 'Copied' text after clicking the copy button", async () => {
    mockFetch(GOOD_DATA);
    render(<ReferralCard />);

    const copyBtn = await screen.findByRole("button", {
      name: /copy referral link/i,
    });
    await act(async () => {
      fireEvent.click(copyBtn);
    });
    expect(screen.getByText("Copied")).toBeInTheDocument();
  });

  it("calls navigator.clipboard.writeText with the referral URL", async () => {
    mockFetch(GOOD_DATA);
    render(<ReferralCard />);

    const copyBtn = await screen.findByRole("button", {
      name: /copy referral link/i,
    });
    await act(async () => {
      fireEvent.click(copyBtn);
    });
    const writeSpy = navigator.clipboard.writeText as ReturnType<typeof vi.fn>;
    expect(writeSpy).toHaveBeenCalledOnce();
    expect(writeSpy.mock.calls[0][0]).toMatch(/\?ref=BOOTS42/);
  });
});
