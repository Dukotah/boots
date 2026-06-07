// Mock Interview — pure data and helpers, no React imports.
// Provides roles, question banks, and the system-prompt builder that tells
// /api/tutor to act as a technical interviewer rather than a Socratic tutor.

// ─── Types ────────────────────────────────────────────────────────────────────

export type InterviewType = "behavioral" | "coding-concept" | "system-design";

export interface InterviewRole {
  id: string;
  label: string;
  emoji: string;
  blurb: string;
}

export interface InterviewQuestion {
  id: string;
  type: InterviewType;
  text: string;
  /** Optional follow-up the AI may probe with after a satisfactory first answer. */
  followUp?: string;
}

// ─── Role list ────────────────────────────────────────────────────────────────

export const ROLES: InterviewRole[] = [
  {
    id: "frontend",
    label: "Frontend Engineer",
    emoji: "🖥️",
    blurb: "React, CSS, performance, accessibility",
  },
  {
    id: "backend",
    label: "Backend Engineer",
    emoji: "⚙️",
    blurb: "APIs, databases, scalability, security",
  },
  {
    id: "fullstack",
    label: "Full-Stack Engineer",
    emoji: "🔗",
    blurb: "End-to-end feature ownership",
  },
  {
    id: "data",
    label: "Data / ML Engineer",
    emoji: "📊",
    blurb: "Pipelines, modeling, Python, SQL",
  },
  {
    id: "devops",
    label: "DevOps / SRE",
    emoji: "🚀",
    blurb: "CI/CD, reliability, infrastructure",
  },
  {
    id: "mobile",
    label: "Mobile Engineer",
    emoji: "📱",
    blurb: "iOS, Android, React Native",
  },
  {
    id: "general",
    label: "General / Early Career",
    emoji: "🎓",
    blurb: "Fundamentals, CS concepts, team fit",
  },
];

// ─── Question bank ────────────────────────────────────────────────────────────

/** Keyed by role id → array of questions for that role. */
const QUESTIONS: Record<string, InterviewQuestion[]> = {
  frontend: [
    // behavioral
    {
      id: "fe-b1",
      type: "behavioral",
      text: "Tell me about a time you shipped a UI that turned out to be inaccessible. What happened and what did you change?",
      followUp: "How do you catch accessibility issues earlier now?",
    },
    {
      id: "fe-b2",
      type: "behavioral",
      text: "Describe a situation where you had to push back on a design decision due to technical constraints. How did you handle it?",
    },
    {
      id: "fe-b3",
      type: "behavioral",
      text: "Walk me through the last time you improved the performance of a page significantly. What tools did you use and what did you measure?",
    },
    // coding-concept
    {
      id: "fe-c1",
      type: "coding-concept",
      text: "Explain the difference between `null` and `undefined` in JavaScript, and give me a real bug you've seen caused by that confusion.",
      followUp: "When would you explicitly set something to `null` vs letting it be `undefined`?",
    },
    {
      id: "fe-c2",
      type: "coding-concept",
      text: "What is the browser's event loop and how does it affect the way you write async code in the UI layer?",
    },
    {
      id: "fe-c3",
      type: "coding-concept",
      text: "How does React's reconciliation algorithm decide what to re-render, and what are the most common ways developers accidentally hurt performance?",
    },
    {
      id: "fe-c4",
      type: "coding-concept",
      text: "Walk me through the CSS box model. How does `box-sizing: border-box` change layout math?",
    },
    // system-design
    {
      id: "fe-s1",
      type: "system-design",
      text: "Design a reusable data-table component that handles 10,000 rows, sortable columns, and pagination. What are the key decisions?",
    },
    {
      id: "fe-s2",
      type: "system-design",
      text: "You need to build a real-time notifications feed (like GitHub's) on the frontend. How do you architect the data flow and update the UI without full page refreshes?",
    },
  ],

  backend: [
    {
      id: "be-b1",
      type: "behavioral",
      text: "Tell me about an incident you were on-call for. Walk me through how you diagnosed and resolved it.",
      followUp: "What did your post-mortem uncover and what changed afterward?",
    },
    {
      id: "be-b2",
      type: "behavioral",
      text: "Describe a time you had to migrate a production database with zero downtime. What was your strategy?",
    },
    {
      id: "be-c1",
      type: "coding-concept",
      text: "What is an N+1 query problem and how do you detect and fix it without rewriting every query by hand?",
    },
    {
      id: "be-c2",
      type: "coding-concept",
      text: "Explain idempotency in the context of REST APIs. Why does it matter for payment endpoints specifically?",
    },
    {
      id: "be-c3",
      type: "coding-concept",
      text: "How does database indexing work under the hood? When does an index hurt rather than help?",
    },
    {
      id: "be-s1",
      type: "system-design",
      text: "Design a rate-limiting system for a public API that needs to support per-user and per-IP limits across multiple servers.",
    },
    {
      id: "be-s2",
      type: "system-design",
      text: "A key table in your Postgres database is growing to 500M rows and queries are slowing down. Walk me through your remediation plan.",
    },
  ],

  fullstack: [
    {
      id: "fs-b1",
      type: "behavioral",
      text: "Tell me about a feature you owned end-to-end — from the database schema to the pixel on screen. What tradeoffs did you make?",
    },
    {
      id: "fs-b2",
      type: "behavioral",
      text: "Describe a situation where the frontend and backend requirements conflicted. How did you resolve it?",
    },
    {
      id: "fs-c1",
      type: "coding-concept",
      text: "What is the difference between server-side rendering, static generation, and client-side rendering? When do you pick each?",
    },
    {
      id: "fs-c2",
      type: "coding-concept",
      text: "How do cookies, sessions, and JWTs differ for authentication? What are the security tradeoffs?",
    },
    {
      id: "fs-s1",
      type: "system-design",
      text: "Design a comments system for a blog that supports nested replies, real-time updates, and spam detection. Cover both the data model and the API shape.",
    },
  ],

  data: [
    {
      id: "da-b1",
      type: "behavioral",
      text: "Tell me about a data pipeline you built that broke in production. How did you find the failure and what did you add to prevent recurrence?",
    },
    {
      id: "da-b2",
      type: "behavioral",
      text: "Walk me through a time you had to push back on a stakeholder who wanted to draw conclusions from bad or insufficient data.",
    },
    {
      id: "da-c1",
      type: "coding-concept",
      text: "What is the difference between a star schema and a snowflake schema? When would you prefer one over the other in a data warehouse?",
    },
    {
      id: "da-c2",
      type: "coding-concept",
      text: "Explain overfitting in machine learning. What techniques do you use to detect and mitigate it?",
    },
    {
      id: "da-s1",
      type: "system-design",
      text: "Design a real-time fraud-detection pipeline for credit card transactions processing 10,000 events per second.",
    },
  ],

  devops: [
    {
      id: "do-b1",
      type: "behavioral",
      text: "Tell me about the worst outage you were involved in. What was your role in the response, and what did you learn?",
    },
    {
      id: "do-b2",
      type: "behavioral",
      text: "Describe a CI/CD pipeline you built or significantly improved. What was broken before and what metrics moved after?",
    },
    {
      id: "do-c1",
      type: "coding-concept",
      text: "What is the difference between blue-green deployment and canary deployment? When do you choose each?",
    },
    {
      id: "do-c2",
      type: "coding-concept",
      text: "Explain how Kubernetes handles pod scheduling. What happens when a node goes down?",
    },
    {
      id: "do-s1",
      type: "system-design",
      text: "Design a deployment pipeline for a monorepo with 20 microservices that needs to support independent releases with automatic rollback.",
    },
  ],

  mobile: [
    {
      id: "mo-b1",
      type: "behavioral",
      text: "Tell me about a time a mobile app you shipped had a critical crash in production. How did you triage and hotfix it?",
    },
    {
      id: "mo-b2",
      type: "behavioral",
      text: "Describe a situation where you had to optimize a mobile app for a very low-end device or poor network. What techniques did you use?",
    },
    {
      id: "mo-c1",
      type: "coding-concept",
      text: "What is the difference between the main thread and background threads on mobile, and why does it matter for UI responsiveness?",
    },
    {
      id: "mo-c2",
      type: "coding-concept",
      text: "Explain how push notifications work end-to-end, from the server sending a message to the user seeing it on their lock screen.",
    },
    {
      id: "mo-s1",
      type: "system-design",
      text: "Design an offline-first note-taking app that syncs when connectivity is restored. How do you handle conflicts?",
    },
  ],

  general: [
    {
      id: "ge-b1",
      type: "behavioral",
      text: "Tell me about yourself and why you want to work in software engineering.",
      followUp: "What drew you specifically to this kind of role rather than others in tech?",
    },
    {
      id: "ge-b2",
      type: "behavioral",
      text: "Describe a project (personal, academic, or professional) you're genuinely proud of. What was your contribution and what did you learn?",
    },
    {
      id: "ge-b3",
      type: "behavioral",
      text: "Tell me about a time you had to learn a new technology quickly. How did you approach it?",
    },
    {
      id: "ge-c1",
      type: "coding-concept",
      text: "What is the difference between a stack and a queue? Give me a real-world example where each is the right data structure.",
    },
    {
      id: "ge-c2",
      type: "coding-concept",
      text: "Explain time and space complexity in plain English, then tell me the Big-O of a binary search and why.",
    },
    {
      id: "ge-c3",
      type: "coding-concept",
      text: "What happens, step by step, when you type a URL into your browser and press Enter?",
    },
    {
      id: "ge-s1",
      type: "system-design",
      text: "Design a URL shortener like bit.ly. Cover the data model, the redirect flow, and how you'd handle 1 million links.",
    },
  ],
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Return questions for a role + type, shuffled so repeats feel fresh. */
export function getQuestions(
  roleId: string,
  type: InterviewType,
): InterviewQuestion[] {
  const bank = QUESTIONS[roleId] ?? QUESTIONS["general"];
  const filtered = bank.filter((q) => q.type === type);
  // Fisher-Yates shuffle
  const arr = [...filtered];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const INTERVIEW_TYPE_LABELS: Record<InterviewType, string> = {
  behavioral: "Behavioral",
  "coding-concept": "Coding Concepts",
  "system-design": "System Design",
};

export const INTERVIEW_TYPE_DESCRIPTIONS: Record<InterviewType, string> = {
  behavioral:
    "Situational and past-experience questions. Use STAR format: Situation, Task, Action, Result.",
  "coding-concept":
    "Explain how something works under the hood. Clarity and depth matter more than jargon.",
  "system-design":
    "Design a system from scratch. Cover requirements, key components, and major tradeoffs.",
};

// ─── System-prompt builder ────────────────────────────────────────────────────

/**
 * Build the system-prompt text that overrides the Socratic tutor persona and
 * turns /api/tutor into a mock interviewer. Passed via the `lessonContent`
 * field so the route's caching tiers still apply correctly.
 *
 * The route always injects SOCRATIC_SYSTEM as the first cache block, but the
 * second block (lessonContext) is fully controlled by the client via
 * `lessonContent`. We use that slot to deliver the interviewer instructions.
 */
export function buildInterviewerContext(
  role: InterviewRole,
  type: InterviewType,
): string {
  return [
    `OVERRIDE PERSONA: You are no longer "Cantrip the tutor". For this session you are a senior engineering interviewer at a top-tier tech company.`,
    ``,
    `Role being interviewed for: ${role.label} (${role.blurb})`,
    `Interview type: ${INTERVIEW_TYPE_LABELS[type]} — ${INTERVIEW_TYPE_DESCRIPTIONS[type]}`,
    ``,
    `Your job in this mock interview:`,
    `1. Ask one interview question at a time. Wait for the candidate's answer before moving on.`,
    `2. After the candidate answers, give honest, constructive feedback: what was strong, what was missing or vague, and one concrete tip to improve.`,
    `3. Then ask the next question or a relevant follow-up.`,
    `4. Keep your feedback specific and actionable — not generic praise. If an answer is weak, say so kindly but clearly.`,
    `5. After 4–5 questions, offer a brief summary: overall strengths, biggest gap, and the single most impactful thing to practice before a real interview.`,
    `6. Use plain text. No LaTeX. Keep feedback to 3–6 sentences unless the answer warrants more detail.`,
    `7. You may ask clarifying follow-ups to probe depth, exactly as a real interviewer would.`,
    ``,
    `The candidate has sent the first message. If it looks like a greeting or "let's start", ask your first question immediately.`,
    `If the message is already an answer to a question you posed, give feedback first, then the next question.`,
  ].join("\n");
}

/** Human-readable label for a question type pill. */
export function typePill(type: InterviewType): string {
  const MAP: Record<InterviewType, string> = {
    behavioral: "Behavioral",
    "coding-concept": "Coding Concept",
    "system-design": "System Design",
  };
  return MAP[type];
}
