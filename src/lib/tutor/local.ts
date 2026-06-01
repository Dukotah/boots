import type { ChatMessage, LocalModelId } from "./types";

// In-browser model via WebGPU (@mlc-ai/web-llm). Real generative AI, zero API
// cost — inference runs on the learner's own device. The library is loaded
// dynamically so it never touches the SSR/build path.

export type LoadProgress = { text: string; progress: number };

// Cache one engine per model so the (large) weights download only once.
let enginePromise: Promise<unknown> | null = null;
let loadedModel: string | null = null;

export function webgpuAvailable(): boolean {
  return typeof navigator !== "undefined" && "gpu" in navigator;
}

async function getEngine(
  model: LocalModelId,
  onProgress?: (p: LoadProgress) => void,
) {
  if (enginePromise && loadedModel === model) return enginePromise;

  const { CreateMLCEngine } = await import("@mlc-ai/web-llm");
  loadedModel = model;
  enginePromise = CreateMLCEngine(model, {
    initProgressCallback: (report: { text: string; progress: number }) =>
      onProgress?.({ text: report.text, progress: report.progress }),
  });
  return enginePromise;
}

export async function streamLocal(opts: {
  model: LocalModelId;
  system: string;
  messages: ChatMessage[];
  onToken: (delta: string) => void;
  onProgress?: (p: LoadProgress) => void;
}): Promise<void> {
  if (!webgpuAvailable()) {
    throw new Error(
      "WebGPU isn't available in this browser. Try Chrome or Edge, or use the API-key option.",
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const engine: any = await getEngine(opts.model, opts.onProgress);

  const chunks = await engine.chat.completions.create({
    stream: true,
    temperature: 0.6,
    messages: [
      { role: "system", content: opts.system },
      ...opts.messages,
    ],
  });

  for await (const chunk of chunks) {
    const delta = chunk?.choices?.[0]?.delta?.content;
    if (typeof delta === "string" && delta.length > 0) {
      opts.onToken(delta);
    }
  }
}
