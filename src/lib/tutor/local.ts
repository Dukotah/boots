import type { ChatMessage, LocalModelId } from "./types";

// In-browser model via WebGPU (@mlc-ai/web-llm). Real generative AI, zero API
// cost — inference runs on the learner's own device. The library is loaded
// dynamically so it never touches the SSR/build path.

export type LoadProgress = { text: string; progress: number };

// Cache one engine per model so the (large) weights download only once.
let enginePromise: Promise<unknown> | null = null;
let loadedModel: string | null = null;

/** Cheap, synchronous gate for the UI. `true` only means the API surface exists
 *  — it does NOT guarantee a usable adapter (see `resolveRunnableModel`). */
export function webgpuAvailable(): boolean {
  return typeof navigator !== "undefined" && "gpu" in navigator;
}

type GpuLike = {
  requestAdapter: () => Promise<{ features?: { has?: (f: string) => boolean } } | null>;
};

/**
 * The real preflight. Phones routinely expose `navigator.gpu` but then either
 * (a) hand back no adapter, or (b) hand back an adapter without the `shader-f16`
 * feature that the `q4f16_1` model builds require — which is why the weights
 * would download and then init/inference would throw right after. We:
 *   1. fail early with an actionable message if there's no usable adapter, and
 *   2. transparently swap a `q4f16_1` model for its `q4f32_1` build (which does
 *      not need shader-f16) when the feature is missing.
 */
async function resolveRunnableModel(model: LocalModelId): Promise<LocalModelId> {
  const gpu = (navigator as unknown as { gpu?: GpuLike }).gpu;
  if (!gpu) {
    throw new Error(
      "This browser has no WebGPU, so the on-device model can't run. Try Chrome or Edge on desktop, or switch to the API-key option.",
    );
  }

  let adapter: Awaited<ReturnType<GpuLike["requestAdapter"]>> = null;
  try {
    adapter = await gpu.requestAdapter();
  } catch {
    adapter = null;
  }
  if (!adapter) {
    throw new Error(
      "Your device exposes WebGPU but no usable GPU adapter — common on phones. Switch to the API-key option, or try desktop Chrome/Edge.",
    );
  }

  const hasF16 = adapter.features?.has?.("shader-f16") ?? false;
  if (!hasF16 && model.includes("q4f16_1")) {
    return model.replace("q4f16_1", "q4f32_1") as LocalModelId;
  }
  return model;
}

async function getEngine(
  model: LocalModelId,
  onProgress?: (p: LoadProgress) => void,
) {
  const { CreateMLCEngine, prebuiltAppConfig } = await import("@mlc-ai/web-llm");

  // Pick a model this GPU can actually run, then make sure web-llm ships it.
  let runnable = await resolveRunnableModel(model);
  const known = new Set(prebuiltAppConfig.model_list.map((m) => m.model_id));
  if (!known.has(runnable)) {
    // The f32 fallback isn't in this build — fall back to the original if it
    // exists, otherwise surface a clear error instead of a cryptic crash.
    if (known.has(model)) runnable = model;
    else
      throw new Error(
        "This on-device model isn't available. Pick another model, or use the API-key option.",
      );
  }

  if (enginePromise && loadedModel === runnable) return enginePromise;

  loadedModel = runnable;
  const p = CreateMLCEngine(runnable, {
    initProgressCallback: (report: { text: string; progress: number }) =>
      onProgress?.({ text: report.text, progress: report.progress }),
  });
  // A failed init must NOT poison the cache: without this, the rejected promise
  // is replayed on every retry and the tutor can never recover without a reload.
  p.catch(() => {
    if (enginePromise === p) {
      enginePromise = null;
      loadedModel = null;
    }
  });
  enginePromise = p;
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
      "WebGPU isn't available in this browser. Try Chrome or Edge on desktop, or use the API-key option.",
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const engine: any = await getEngine(opts.model, opts.onProgress);

  let chunks;
  try {
    chunks = await engine.chat.completions.create({
      stream: true,
      temperature: 0.6,
      messages: [{ role: "system", content: opts.system }, ...opts.messages],
    });

    for await (const chunk of chunks) {
      const delta = chunk?.choices?.[0]?.delta?.content;
      if (typeof delta === "string" && delta.length > 0) {
        opts.onToken(delta);
      }
    }
  } catch (e) {
    // Generation can still fail (most often out-of-memory on phones). Give the
    // learner an actionable next step rather than a raw WebGPU stack trace.
    const detail = e instanceof Error && e.message ? ` (${e.message})` : "";
    throw new Error(
      `The on-device model couldn't generate a reply${detail}. On phones this is usually memory — try the smallest model, or use the API-key option.`,
    );
  }
}
