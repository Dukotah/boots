// Shared types for the Boots AI tutor. Both engines (BYOK Anthropic + in-browser
// local model) run entirely client-side, so the platform owner never spends a
// token — cost is either the learner's own API key or their own device's compute.

export type TutorProvider = "anthropic" | "local";

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

// Context the tutor is given about what the student is working on right now.
export type TutorContext = {
  lessonTitle: string;
  lessonGoal: string; // plain-text summary of the lesson body
  code: string; // the student's current editor contents
  testSummary: string; // pass/fail + errors, or "not run yet"
};

export type AnthropicModel =
  | "claude-haiku-4-5-20251001"
  | "claude-sonnet-4-6"
  | "claude-opus-4-8";

// A curated short-list of small instruct models that run in-browser via WebGPU.
// IDs must match @mlc-ai/web-llm's prebuilt model list.
export type LocalModelId =
  | "Qwen2.5-0.5B-Instruct-q4f16_1-MLC"
  | "Llama-3.2-1B-Instruct-q4f16_1-MLC"
  | "Llama-3.2-3B-Instruct-q4f16_1-MLC";

export const ANTHROPIC_MODELS: { id: AnthropicModel; label: string }[] = [
  { id: "claude-haiku-4-5-20251001", label: "Claude Haiku 4.5 — fast & cheap" },
  { id: "claude-sonnet-4-6", label: "Claude Sonnet 4.6 — balanced" },
  { id: "claude-opus-4-8", label: "Claude Opus 4.8 — most capable" },
];

export const LOCAL_MODELS: { id: LocalModelId; label: string }[] = [
  { id: "Qwen2.5-0.5B-Instruct-q4f16_1-MLC", label: "Qwen2.5 0.5B — tiny, ~0.5GB" },
  { id: "Llama-3.2-1B-Instruct-q4f16_1-MLC", label: "Llama 3.2 1B — ~0.9GB (recommended)" },
  { id: "Llama-3.2-3B-Instruct-q4f16_1-MLC", label: "Llama 3.2 3B — smarter, ~2.3GB" },
];
