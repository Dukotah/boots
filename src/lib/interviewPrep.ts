// Interview Prep Hub — pure data, no React imports.
// Provides the curated prep plan, common behavioral questions, STAR framework
// explainer, and a StarAnswer type for the in-page builder.

// ─── Types ────────────────────────────────────────────────────────────────────

/** A Situation-Task-Action-Result answer assembled from four user-provided fields. */
export interface StarAnswer {
  situation: string;
  task: string;
  action: string;
  result: string;
}

/** Assemble a StarAnswer into a single readable paragraph. */
export function assembleStarAnswer(answer: StarAnswer): string {
  const parts: string[] = [];
  if (answer.situation.trim())
    parts.push(`Situation: ${answer.situation.trim()}`);
  if (answer.task.trim()) parts.push(`Task: ${answer.task.trim()}`);
  if (answer.action.trim()) parts.push(`Action: ${answer.action.trim()}`);
  if (answer.result.trim()) parts.push(`Result: ${answer.result.trim()}`);
  return parts.join("\n\n");
}

// ─── Deep-link helpers ────────────────────────────────────────────────────────

export interface LessonLink {
  label: string;
  href: string;
  blurb: string;
  xp: number;
}

export interface PrepSection {
  id: string;
  emoji: string;
  title: string;
  description: string;
  lessons: LessonLink[];
  /** Optional inline content blocks (STAR explainer, checklist, etc.) */
  extra?: PrepExtra[];
}

export type PrepExtra =
  | { kind: "star-explainer" }
  | { kind: "questions"; questions: BehavioralQuestion[] }
  | { kind: "checklist"; items: ChecklistItem[] };

export interface BehavioralQuestion {
  category: string;
  question: string;
  tip: string;
}

export interface ChecklistItem {
  label: string;
  detail: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

/** Deep links into the Coding Interview Prep module (slug: "interview"). */
export const CODING_LESSONS: LessonLink[] = [
  {
    label: "FizzBuzz",
    href: "/learn/interview/fizzbuzz",
    blurb: "The legendary warm-up every interviewer expects you to nail fast.",
    xp: 35,
  },
  {
    label: "Is Palindrome",
    href: "/learn/interview/is-palindrome",
    blurb: "Two-pointer thinking disguised as a simple string check.",
    xp: 35,
  },
  {
    label: "Two Sum",
    href: "/learn/interview/two-sum",
    blurb: "Hash-map O(n) solution — the canonical hashing interview problem.",
    xp: 45,
  },
  {
    label: "Valid Anagram",
    href: "/learn/interview/valid-anagram",
    blurb: "Sort or count — understand both approaches.",
    xp: 40,
  },
  {
    label: "Remove Duplicates",
    href: "/learn/interview/remove-duplicates",
    blurb: "Set-based deduplication while preserving order.",
    xp: 45,
  },
  {
    label: "First Non-Repeating Character",
    href: "/learn/interview/first-non-repeating",
    blurb: "Frequency map followed by a single scan.",
    xp: 50,
  },
  {
    label: "Maximum Subarray Sum",
    href: "/learn/interview/max-subarray-sum",
    blurb: "Kadane's algorithm — the classic dynamic programming one-liner.",
    xp: 60,
  },
];

/** Deep links into the Behavioral Interview Prep module (slug: "behavioral-interviews"). */
export const BEHAVIORAL_LESSONS: LessonLink[] = [
  {
    label: "Why Behavioral Interviews Matter",
    href: "/learn/behavioral-interviews/why-behavioral-interviews-matter",
    blurb:
      "Understand what interviewers are actually measuring beyond your résumé.",
    xp: 20,
  },
  {
    label: "The STAR Method",
    href: "/learn/behavioral-interviews/the-star-method",
    blurb:
      "Structure every story with Situation, Task, Action, Result — and avoid pitfalls.",
    xp: 22,
  },
  {
    label: "Tell Me About Yourself",
    href: "/learn/behavioral-interviews/tell-me-about-yourself",
    blurb: "Build a tight 90-second Present-Past-Future arc.",
    xp: 20,
  },
  {
    label: "Conflict & Difficult People",
    href: "/learn/behavioral-interviews/conflict-and-difficult-people",
    blurb:
      "Answer conflict questions without sounding defensive or a victim.",
    xp: 23,
  },
  {
    label: "Failure & Growth",
    href: "/learn/behavioral-interviews/failure-and-growth",
    blurb: "Turn failure questions into evidence of self-awareness and growth.",
    xp: 22,
  },
  {
    label: "Leadership & Influence",
    href: "/learn/behavioral-interviews/leadership-and-influence",
    blurb: "Drive outcomes when you don't have direct authority.",
    xp: 23,
  },
  {
    label: "Capstone: Build Your Story Bank",
    href: "/learn/behavioral-interviews/capstone-preparing-your-story-bank",
    blurb: "Leave with 8–10 reusable stories that cover every common question.",
    xp: 25,
  },
];

/** Deep links into the System Design module (slug: "system-design"). */
export const SYSTEM_DESIGN_LESSONS: LessonLink[] = [
  {
    label: "What Is System Design?",
    href: "/learn/system-design/what-is-system-design",
    blurb: "Architecture vocabulary and why it matters in interviews.",
    xp: 20,
  },
  {
    label: "Choosing a Database",
    href: "/learn/system-design/databases-101",
    blurb: "SQL vs NoSQL and the CAP theorem explained.",
    xp: 25,
  },
  {
    label: "Caching Strategies",
    href: "/learn/system-design/caching",
    blurb: "Cache-aside, write-through, LRU — implement your own LRU cache.",
    xp: 30,
  },
  {
    label: "REST API Design",
    href: "/learn/system-design/api-design",
    blurb: "Verbs, status codes, versioning — build APIs engineers love.",
    xp: 30,
  },
  {
    label: "Design: URL Shortener",
    href: "/learn/system-design/url-shortener-design",
    blurb: "Walk through a classic system design question from first principles.",
    xp: 45,
  },
  {
    label: "Scalability Patterns",
    href: "/learn/system-design/scalability-patterns",
    blurb: "Sharding, read replicas, queues, and microservices.",
    xp: 35,
  },
];

/** The 10 most common behavioral questions, grouped by category. */
export const BEHAVIORAL_QUESTIONS: BehavioralQuestion[] = [
  {
    category: "Intro",
    question: "Tell me about yourself.",
    tip: "Use the Present-Past-Future arc. Target 75–100 seconds.",
  },
  {
    category: "Challenge",
    question: "Tell me about a time you faced a significant technical challenge.",
    tip: "Emphasize your specific actions and the measurable result.",
  },
  {
    category: "Conflict",
    question: "Describe a disagreement you had with a colleague or manager.",
    tip: "Show you sought to understand their view before advocating yours.",
  },
  {
    category: "Failure",
    question: "Tell me about a time you failed. What did you learn?",
    tip: "Pick a real failure with real stakes. The growth is the point.",
  },
  {
    category: "Leadership",
    question: "Give me an example of a time you showed leadership.",
    tip: "Influence-without-authority stories beat pure management stories.",
  },
  {
    category: "Ambiguity",
    question: "Tell me about a time you had to make a decision with incomplete information.",
    tip: "Show structured thinking: what you knew, what you assumed, how you de-risked.",
  },
  {
    category: "Collaboration",
    question: "Describe a time you worked cross-functionally to ship something.",
    tip: "Highlight alignment work — syncing competing priorities across teams.",
  },
  {
    category: "Growth",
    question: "Tell me about a skill you've developed significantly in the last year.",
    tip: "Be specific: what triggered it, how you learned, where it shows up in your work.",
  },
  {
    category: "Impact",
    question: "What's the most impactful project you've contributed to?",
    tip: "Lead with the quantified result, then walk back to your specific contribution.",
  },
  {
    category: "Questions for them",
    question: "Do you have any questions for me?",
    tip: "Ask about 90-day success criteria, hardest unsolved problem, or how decisions get made.",
  },
];

/** Pre-interview checklist. */
export const PREP_CHECKLIST: ChecklistItem[] = [
  {
    label: "Complete the Coding Interview Prep module",
    detail:
      "Get all 7 auto-graded challenges green before your technical screen.",
  },
  {
    label: "Work through the Behavioral Interview Prep module",
    detail: "All 7 lessons give you the complete framework in under an hour.",
  },
  {
    label: "Build a story bank of 8–10 flexible career stories",
    detail:
      "Cover: challenge, conflict, failure, leadership, ambiguity, collaboration, growth, impact.",
  },
  {
    label: "Practice each story out loud — target 90–120 seconds",
    detail: "Reading notes is not the same as saying it. Time yourself.",
  },
  {
    label: "Complete the System Design fundamentals module",
    detail:
      "Even junior roles ask high-level system questions. Know the vocabulary.",
  },
  {
    label: "Prepare 3 strong questions to ask your interviewer",
    detail:
      "90-day success criteria, hardest unsolved problem, how decisions get made.",
  },
  {
    label: "Review your story bank the evening before",
    detail: "Do 2–3 out-loud run-throughs, then get enough sleep.",
  },
];

/** The full curated prep plan — three sections. */
export const PREP_PLAN: PrepSection[] = [
  {
    id: "coding",
    emoji: "💼",
    title: "Coding Interview Prep",
    description:
      "Classic whiteboard problems, auto-graded in-browser. Build real fluency on the patterns that show up most — hashing, two pointers, dynamic programming.",
    lessons: CODING_LESSONS,
  },
  {
    id: "behavioral",
    emoji: "🗣️",
    title: "Behavioral Interview Prep",
    description:
      "Technical chops get you in the room — behavioral interviews decide if you get the offer. Master the STAR framework, craft compelling career stories, and walk in with a battle-tested answer for every common question.",
    lessons: BEHAVIORAL_LESSONS,
    extra: [
      { kind: "star-explainer" },
      { kind: "questions", questions: BEHAVIORAL_QUESTIONS },
    ],
  },
  {
    id: "system-design",
    emoji: "🏗️",
    title: "System Design",
    description:
      "Every senior interview — and many mid-level ones — has a system design round. Learn the vocabulary, the classic trade-offs, and walk through a real design from first principles.",
    lessons: SYSTEM_DESIGN_LESSONS,
  },
];
