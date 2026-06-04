// Guilds — team-based competition. Members share XP goals and compete on the
// guild leaderboard. Joining / leaving is free, cosmetics are earned together.
// This is purely client-side data (static guild definitions) plus Supabase
// for member counts and weekly XP aggregation when the backend is configured.

export type GuildTier = "iron" | "bronze" | "silver" | "gold" | "platinum" | "diamond";

export type Guild = {
  id: string;
  name: string;
  description: string;
  icon: string;
  tier: GuildTier;
  focus: string[];
  weeklyXpGoal: number;
  color: string;
};

export const GUILDS: Guild[] = [
  {
    id: "byte-brigade",
    name: "Byte Brigade",
    description: "Speed-learners who sprint through lessons every day. Discipline is the meta.",
    icon: "⚡",
    tier: "gold",
    focus: ["streaks", "daily-grind"],
    weeklyXpGoal: 2000,
    color: "from-yellow-500 to-amber-600",
  },
  {
    id: "algorithm-knights",
    name: "Algorithm Knights",
    description: "We solve hard problems. CS fundamentals, data structures, and interview prep.",
    icon: "⚔️",
    tier: "platinum",
    focus: ["algorithms", "data-structures", "interview"],
    weeklyXpGoal: 3000,
    color: "from-purple-500 to-indigo-600",
  },
  {
    id: "ai-collective",
    name: "The AI Collective",
    description: "Building the future. LLMs, agents, embeddings, and prompt engineering.",
    icon: "🤖",
    tier: "silver",
    focus: ["ai-llms", "ai-agents", "prompt-engineering"],
    weeklyXpGoal: 1500,
    color: "from-cyan-500 to-blue-600",
  },
  {
    id: "full-stack-forge",
    name: "Full Stack Forge",
    description: "Front to back — JS, Python, SQL, and everything in between.",
    icon: "🥞",
    tier: "gold",
    focus: ["javascript", "python", "sql"],
    weeklyXpGoal: 2500,
    color: "from-green-500 to-emerald-600",
  },
  {
    id: "night-owls",
    name: "Night Owls",
    description: "We code after midnight. No morning standup, just vibes and XP.",
    icon: "🦉",
    tier: "bronze",
    focus: ["streaks", "any"],
    weeklyXpGoal: 1000,
    color: "from-slate-500 to-gray-700",
  },
  {
    id: "security-syndicate",
    name: "Security Syndicate",
    description: "Hackers (ethical). CTF, web security, and digital citizenship.",
    icon: "🔒",
    tier: "silver",
    focus: ["web-security", "ctf-intro", "digital-safety"],
    weeklyXpGoal: 1200,
    color: "from-red-500 to-rose-700",
  },
  {
    id: "open-source-order",
    name: "Open Source Order",
    description: "Git, collaboration, and contributing to real projects.",
    icon: "🌳",
    tier: "bronze",
    focus: ["git-github", "open-source"],
    weeklyXpGoal: 800,
    color: "from-teal-500 to-green-600",
  },
  {
    id: "data-druids",
    name: "Data Druids",
    description: "SQL, data structures, and the art of working with information.",
    icon: "🌿",
    tier: "silver",
    focus: ["sql", "data-structures", "algorithms"],
    weeklyXpGoal: 1500,
    color: "from-lime-500 to-green-600",
  },
];

export const GUILD_TIERS: Record<GuildTier, { label: string; color: string; minMembers: number }> = {
  iron:     { label: "Iron",     color: "text-gray-400",   minMembers: 0   },
  bronze:   { label: "Bronze",   color: "text-amber-600",  minMembers: 5   },
  silver:   { label: "Silver",   color: "text-gray-300",   minMembers: 15  },
  gold:     { label: "Gold",     color: "text-yellow-400", minMembers: 30  },
  platinum: { label: "Platinum", color: "text-cyan-300",   minMembers: 50  },
  diamond:  { label: "Diamond",  color: "text-blue-400",   minMembers: 100 },
};

export function getGuild(id: string): Guild | undefined {
  return GUILDS.find((g) => g.id === id);
}

/** Deterministic seeded member count for display when no backend is available. */
export function seededMemberCount(guildId: string): number {
  let hash = 0;
  for (const c of guildId) hash = (hash * 31 + c.charCodeAt(0)) | 0;
  return 12 + (Math.abs(hash) % 88);
}

/** Deterministic seeded weekly XP total for display. */
export function seededWeeklyXp(guildId: string): number {
  let hash = 0;
  for (const c of guildId) hash = (hash * 17 + c.charCodeAt(0)) | 0;
  return 800 + (Math.abs(hash) % 3200);
}
