// Shared types for the on-device / BYOK AI tutor. Both engines (BYOK Anthropic +
// in-browser local model) run entirely client-side, so the platform owner never
// spends a token — cost is either the learner's own API key or their own device's
// compute. This is separate from the server-side "Ask Cantrip" tutor (Pro).

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
// IDs must match @mlc-ai/web-llm's prebuilt model list. We expose the `q4f16_1`
// builds (smaller, faster) but the runtime falls back to the matching `q4f32_1`
// build on GPUs without the `shader-f16` feature (very common on phones), so the
// f32 IDs are part of the type too.
export type LocalModelId =
  | "Qwen2.5-0.5B-Instruct-q4f16_1-MLC"
  | "Qwen2.5-0.5B-Instruct-q4f32_1-MLC"
  | "Llama-3.2-1B-Instruct-q4f16_1-MLC"
  | "Llama-3.2-1B-Instruct-q4f32_1-MLC"
  | "Llama-3.2-3B-Instruct-q4f16_1-MLC"
  | "Llama-3.2-3B-Instruct-q4f32_1-MLC";

export const ANTHROPIC_MODELS: { id: AnthropicModel; label: string }[] = [
  { id: "claude-haiku-4-5-20251001", label: "Claude Haiku 4.5 — fast & cheap" },
  { id: "claude-sonnet-4-6", label: "Claude Sonnet 4.6 — balanced" },
  { id: "claude-opus-4-8", label: "Claude Opus 4.8 — most capable" },
];

// The models surfaced in the picker. Smallest first — the 0.5B is the safest bet
// on phones, where memory (not download) is the real constraint.
export const LOCAL_MODELS: { id: LocalModelId; label: string }[] = [
  { id: "Qwen2.5-0.5B-Instruct-q4f16_1-MLC", label: "Qwen2.5 0.5B — tiny, best on mobile (~0.5GB)" },
  { id: "Llama-3.2-1B-Instruct-q4f16_1-MLC", label: "Llama 3.2 1B — balanced (~0.9GB)" },
  { id: "Llama-3.2-3B-Instruct-q4f16_1-MLC", label: "Llama 3.2 3B — smartest, desktop only (~2.3GB)" },
];
