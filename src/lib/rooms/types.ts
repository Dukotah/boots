// Rooms — HackTheBox / TryHackMe-style challenge "boxes". A room is a small,
// self-contained page: an intro, then a list of tasks you clear by submitting a
// "flag" (the program's output, an extracted value, a payload) rather than by
// writing graded code. Flags are checked entirely client-side, like our lessons.
//
// Authored as data (one file per room) so rooms ship via PRs, mirroring the
// curriculum. Add a room file, register it in `index.ts`, and it appears in the
// catalog and gets its own static route automatically.

export type RoomDifficulty = "easy" | "medium" | "hard";

export type RoomTask = {
  // Stable within a room; used to build the completion id.
  slug: string;
  // The question, in markdown.
  prompt: string;
  // Optional snippet shown in a code block above the answer box.
  code?: string;
  // A nudge revealed on demand (no penalty — this is a learning tool).
  hint?: string;
  // The flag the learner must submit. Matching trims + collapses inner
  // whitespace and is case-insensitive unless `caseSensitive` is set.
  answer: string;
  // Extra accepted answers (e.g. equivalent SQLi payloads).
  acceptable?: string[];
  caseSensitive?: boolean;
  // XP awarded the first time this flag is captured.
  xp: number;
};

export type Room = {
  slug: string;
  title: string;
  emoji: string;
  // Tailwind gradient classes for the card accent (matches module cards).
  gradient: string;
  difficulty: RoomDifficulty;
  // Topic tags for filtering + SEO ("regex", "security", "sql"…).
  tags: string[];
  // One-liner for the catalog card.
  blurb: string;
  // Markdown shown at the top of the room.
  intro: string;
  tasks: RoomTask[];
};
