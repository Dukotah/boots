import type { ChatMessage, TutorContext } from "./types";
import { buildSystemPrompt } from "./prompt";
import { streamAnthropic } from "./anthropic";
import { streamLocal, type LoadProgress } from "./local";

type EngineSettings = {
  provider: "anthropic" | "local";
  anthropicKey: string;
  anthropicModel: import("./types").AnthropicModel;
  localModel: import("./types").LocalModelId;
};

// Unified entry point. Picks the right client based on settings; both stream
// tokens through `onToken`. The local provider also reports download progress.
export async function streamTutorReply(opts: {
  settings: EngineSettings;
  context: TutorContext;
  messages: ChatMessage[];
  onToken: (delta: string) => void;
  onProgress?: (p: LoadProgress) => void;
  signal?: AbortSignal;
}): Promise<void> {
  const system = buildSystemPrompt(opts.context);

  if (opts.settings.provider === "anthropic") {
    if (!opts.settings.anthropicKey.trim()) {
      throw new Error("Add your Anthropic API key in tutor settings first.");
    }
    return streamAnthropic({
      apiKey: opts.settings.anthropicKey.trim(),
      model: opts.settings.anthropicModel,
      system,
      messages: opts.messages,
      onToken: opts.onToken,
      signal: opts.signal,
    });
  }

  return streamLocal({
    model: opts.settings.localModel,
    system,
    messages: opts.messages,
    onToken: opts.onToken,
    onProgress: opts.onProgress,
  });
}
