import type { AnthropicModel, ChatMessage } from "./types";

// BYOK client. Calls Anthropic directly from the browser using the learner's own
// key — so the platform owner is never billed. Streams tokens via SSE.
//
// The `anthropic-dangerous-direct-browser-access` header opts into CORS for
// browser calls. The key lives only in the learner's localStorage and is sent
// only to api.anthropic.com.
export async function streamAnthropic(opts: {
  apiKey: string;
  model: AnthropicModel;
  system: string;
  messages: ChatMessage[];
  onToken: (delta: string) => void;
  signal?: AbortSignal;
}): Promise<void> {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": opts.apiKey,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    signal: opts.signal,
    body: JSON.stringify({
      model: opts.model,
      max_tokens: 400,
      system: opts.system,
      stream: true,
      messages: opts.messages,
    }),
  });

  if (!res.ok || !res.body) {
    const text = await res.text().catch(() => "");
    throw new Error(parseAnthropicError(res.status, text));
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    // SSE frames are separated by blank lines.
    const frames = buffer.split("\n\n");
    buffer = frames.pop() ?? "";

    for (const frame of frames) {
      const dataLine = frame
        .split("\n")
        .find((l) => l.startsWith("data:"));
      if (!dataLine) continue;
      const json = dataLine.slice(5).trim();
      if (!json || json === "[DONE]") continue;

      try {
        const evt = JSON.parse(json);
        if (
          evt.type === "content_block_delta" &&
          evt.delta?.type === "text_delta" &&
          typeof evt.delta.text === "string"
        ) {
          opts.onToken(evt.delta.text);
        } else if (evt.type === "error") {
          throw new Error(evt.error?.message ?? "Anthropic stream error");
        }
      } catch {
        // ignore keep-alive / non-JSON frames
      }
    }
  }
}

function parseAnthropicError(status: number, body: string): string {
  if (status === 401) return "Invalid API key. Check your Anthropic key in tutor settings.";
  if (status === 429) return "Rate limited by Anthropic. Wait a moment and try again.";
  if (status === 400) {
    try {
      const j = JSON.parse(body);
      return j.error?.message ?? "Bad request to Anthropic.";
    } catch {
      return "Bad request to Anthropic.";
    }
  }
  return `Anthropic request failed (HTTP ${status}).`;
}
