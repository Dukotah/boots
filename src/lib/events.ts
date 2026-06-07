// Seasonal events — time-limited campaigns with exclusive rewards.
// Events drive urgency, re-engagement, and collectible cosmetics that can
// never be bought outside the event window (FOMO without pay-to-win).

export type EventReward = {
  id: string;
  name: string;
  icon: string;
  description: string;
  kind: "cosmetic" | "xp" | "gold" | "title";
  value?: string | number;
  threshold: number; // event XP needed to unlock
};

export type SeasonalEvent = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  gradient: string;
  startDate: string; // ISO date string
  endDate: string;
  xpMultiplier: number; // bonus XP multiplier during event (1.0 = none, 1.5 = +50%)
  rewards: EventReward[];
  challengeIds: string[]; // lesson IDs that count double for event XP
  theme: {
    primary: string; // Tailwind color token
    accent: string;
    bg: string;
  };
};

export const SEASONAL_EVENTS: SeasonalEvent[] = [
  {
    id: "hackathon-week-2025",
    name: "Hackathon Week",
    tagline: "Code. Ship. Win.",
    description:
      "One week. Build fast, learn faster. Complete daily challenges to unlock exclusive Hackathon cosmetics and a permanent title. XP from JavaScript, Python, and algorithms lessons is doubled.",
    icon: "🚀",
    gradient: "from-violet-600 via-purple-600 to-indigo-700",
    startDate: "2026-06-01",
    endDate: "2026-06-08",
    xpMultiplier: 2.0,
    rewards: [
      {
        id: "hackathon-50",
        name: "Hacker Badge",
        icon: "💻",
        description: "Earned 50 event XP during Hackathon Week.",
        kind: "cosmetic",
        threshold: 50,
        value: "hackathon-2025",
      },
      {
        id: "hackathon-200",
        name: "Sprint Gold",
        icon: "🥇",
        description: "200 event XP — you went all in.",
        kind: "gold",
        threshold: 200,
        value: 500,
      },
      {
        id: "hackathon-500",
        name: "Title: Hackathon Hero",
        icon: "🦸",
        description: "Exclusive title for top performers.",
        kind: "title",
        threshold: 500,
        value: "Hackathon Hero",
      },
    ],
    challengeIds: ["javascript", "python", "algorithms"],
    theme: {
      primary: "text-purple-400",
      accent: "text-violet-300",
      bg: "bg-purple-950/40",
    },
  },
  {
    id: "ai-summit-2026",
    name: "AI Summit",
    tagline: "The machines are learning. Are you?",
    description:
      "A week dedicated to artificial intelligence. Crush AI, LLM, agents, and prompt engineering lessons for double XP and exclusive AI-themed cosmetics.",
    icon: "🤖",
    gradient: "from-cyan-600 via-blue-600 to-indigo-700",
    startDate: "2026-07-14",
    endDate: "2026-07-21",
    xpMultiplier: 2.0,
    rewards: [
      {
        id: "ai-summit-50",
        name: "AI Initiate Badge",
        icon: "🧠",
        description: "Started your AI Summit journey.",
        kind: "cosmetic",
        threshold: 50,
        value: "ai-summit-2026",
      },
      {
        id: "ai-summit-300",
        name: "Summit Gold",
        icon: "💰",
        description: "300 event XP — deep into the summit.",
        kind: "gold",
        threshold: 300,
        value: 600,
      },
      {
        id: "ai-summit-600",
        name: "Title: AI Pioneer",
        icon: "🚀",
        description: "Exclusive title for AI Summit finishers.",
        kind: "title",
        threshold: 600,
        value: "AI Pioneer",
      },
    ],
    challengeIds: ["ai-llms", "ai-agents", "prompt-engineering", "ai-apps"],
    theme: {
      primary: "text-cyan-400",
      accent: "text-blue-300",
      bg: "bg-blue-950/40",
    },
  },
  {
    id: "algorithm-arena-2026",
    name: "Algorithm Arena",
    tagline: "Prove your problem-solving chops.",
    description:
      "The hardest week of the year. Algorithms, data structures, and interview prep all doubled. Top finishers get a rare Arena Champion title.",
    icon: "⚔️",
    gradient: "from-orange-600 via-red-600 to-rose-700",
    startDate: "2026-08-18",
    endDate: "2026-08-25",
    xpMultiplier: 2.0,
    rewards: [
      {
        id: "arena-50",
        name: "Arena Entrant",
        icon: "🥊",
        description: "Entered the Algorithm Arena.",
        kind: "cosmetic",
        threshold: 50,
        value: "arena-2026",
      },
      {
        id: "arena-400",
        name: "Arena Gold",
        icon: "💰",
        description: "400 event XP — deep in the arena.",
        kind: "gold",
        threshold: 400,
        value: 750,
      },
      {
        id: "arena-800",
        name: "Title: Arena Champion",
        icon: "🏆",
        description: "The rarest title. Top performers only.",
        kind: "title",
        threshold: 800,
        value: "Arena Champion",
      },
    ],
    challengeIds: ["algorithms", "data-structures", "interview", "recursion"],
    theme: {
      primary: "text-orange-400",
      accent: "text-red-300",
      bg: "bg-red-950/40",
    },
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Double-XP Weekend — Duolingo-style recurring boost (Sat + Sun, every week).
// This is intentionally separate from the seasonal-event system: seasonal events
// are hand-curated, date-specific campaigns. Double-XP Weekend is a permanent,
// deterministic, calendar-driven feature. No state is stored — the function is
// pure and safe to call in any context (store, tests, SSR, etc.).
//
// Why weekends only? Weekend lesson completion historically spikes on Saturday
// mornings; showing a 2x banner on Friday evening primes learners to return
// Saturday. (Duolingo reported ~50 % DAU lift on double-XP days.)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Returns true when `date` falls on a Saturday (6) or Sunday (0) in the
 * user's LOCAL time zone — the same zone used by the rest of the store.
 * Deterministic and test-injectable via the optional `date` parameter.
 */
export function isDoubleXpActive(date = new Date()): boolean {
  const day = date.getDay(); // 0 = Sunday, 6 = Saturday
  return day === 0 || day === 6;
}

/** Returns the currently active event, if any, based on today's date. */
export function getActiveEvent(now = new Date()): SeasonalEvent | null {
  const today = now.toISOString().split("T")[0];
  return (
    SEASONAL_EVENTS.find((e) => e.startDate <= today && e.endDate >= today) ??
    null
  );
}

/** Returns the next upcoming event (soonest start after today). */
export function getNextEvent(now = new Date()): SeasonalEvent | null {
  const today = now.toISOString().split("T")[0];
  return (
    SEASONAL_EVENTS.filter((e) => e.startDate > today).sort((a, b) =>
      a.startDate.localeCompare(b.startDate),
    )[0] ?? null
  );
}

/** Days until an event starts (negative if already started). */
export function daysUntilEvent(event: SeasonalEvent, now = new Date()): number {
  const start = new Date(event.startDate);
  return Math.ceil((start.getTime() - now.getTime()) / 86_400_000);
}

/** Days remaining in the active event. */
export function daysLeftInEvent(event: SeasonalEvent, now = new Date()): number {
  const end = new Date(event.endDate);
  return Math.max(0, Math.ceil((end.getTime() - now.getTime()) / 86_400_000));
}
