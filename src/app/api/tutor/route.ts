import Anthropic from "@anthropic-ai/sdk";
import { getSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { rateLimit } from "@/lib/rateLimit";

// "Ask Cantrip" — the Socratic AI tutor. Server-side so the API key never reaches
// the browser. Streams hints back as plain text. Pro-gated and token-capped.
//
// Cost control (gameplan §6 — the tutor is the main ongoing cost):
//  - max_tokens capped low (hints are short by design)
//  - thinking disabled (a hint doesn't need a reasoning budget)
//  - prompt caching on the frozen system prompt (shared across every request)
//    and on the per-lesson context (reused across a student's questions on one
//    lesson). The student's live code stays in the volatile user turn so typing
//    never invalidates the cached lesson prefix.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MODEL = "claude-opus-4-8";
const MAX_TOKENS = 1024;
const MAX_HISTORY = 12; // keep the transcript bounded

// Cost/abuse brake: cap tutor requests per caller per rolling window.
const RATE_LIMIT = 20;
const RATE_WINDOW_MS = 60_000;

// Frozen, byte-identical across every request → one shared cache entry app-wide.
const SOCRATIC_SYSTEM = `You are "Cantrip", the friendly mascot and AI tutor for the Cantrip coding academy. You help students learn to code through the Socratic method.

Your rules — follow them strictly:
1. NEVER write the full solution or hand over working code that completes the student's task. This is the most important rule.
2. Guide with questions, hints, and small nudges. Help the student discover the answer themselves.
3. You MAY show tiny, generic syntax snippets (e.g. how a for-loop is written in general) when a student is stuck on syntax — but never the specific lines that solve their exercise.
4. If a student asks you to "just give me the answer", warmly refuse and offer the next hint instead.
5. Point out what's promising in their current attempt before suggesting what to reconsider.
6. Keep replies short and encouraging — usually 2-5 sentences. Use plain text, no LaTeX.
7. Respond directly with your hint. Do not narrate your reasoning or restate the question.

You are encouraging, concise, and never condescending. A great hint leaves the student with a clear next step they can take on their own.`;

type ChatMessage = { role: "user" | "assistant"; content: string };

type TutorRequest = {
  moduleTitle?: string;
  lessonTitle?: string;
  lessonContent?: string;
  language?: string;
  code?: string;
  messages?: ChatMessage[];
};

/** Verify the caller may use the tutor (Pro-gated) and return their id for
 *  rate-limit keying. */
async function authorize(): Promise<{ allowed: boolean; userId: string | null }> {
  // Without a backend we can't verify Pro. In dev that's fine (allow, so the
  // feature is testable), but in production we must FAIL CLOSED — otherwise a
  // misconfigured deploy would hand free, anonymous access to the paid AI tutor
  // and burn the Anthropic key on IP-keyed limits only.
  const devOpen = process.env.NODE_ENV !== "production";
  if (!isSupabaseConfigured) return { allowed: devOpen, userId: null };

  const sb = getSupabaseServerClient();
  if (!sb) return { allowed: devOpen, userId: null };

  const {
    data: { user },
  } = await sb.auth.getUser();
  if (!user) return { allowed: false, userId: null };

  const { data } = await sb
    .from("profiles")
    .select("is_pro")
    .eq("id", user.id)
    .maybeSingle();
  const isPro = Boolean((data as { is_pro?: boolean } | null)?.is_pro);
  return { allowed: isPro, userId: user.id };
}

/** Best-effort client IP for rate-limiting anonymous/dev callers. */
function clientKey(req: Request, userId: string | null): string {
  if (userId) return `tutor:user:${userId}`;
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  return `tutor:ip:${ip}`;
}

export async function POST(req: Request) {
  const { allowed, userId } = await authorize();
  if (!allowed) {
    return Response.json(
      { error: "The AI tutor is a Pro feature." },
      { status: 403 },
    );
  }

  // Throttle before doing any paid work.
  const limit = rateLimit(clientKey(req, userId), RATE_LIMIT, RATE_WINDOW_MS);
  if (!limit.ok) {
    return Response.json(
      { error: "You're asking very fast — give me a moment and try again." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json(
      { error: "The AI tutor isn't configured yet (missing ANTHROPIC_API_KEY)." },
      { status: 503 },
    );
  }

  let body: TutorRequest;
  try {
    body = (await req.json()) as TutorRequest;
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const history = (body.messages ?? [])
    .filter((m) => m && (m.role === "user" || m.role === "assistant") && m.content?.trim())
    .slice(-MAX_HISTORY);

  if (history.length === 0 || history[history.length - 1].role !== "user") {
    return Response.json(
      { error: "Send at least one user message." },
      { status: 400 },
    );
  }

  // Per-lesson context — stable across a student's questions on this lesson, so
  // we give it its own cache breakpoint. Code is NOT here (it changes as they type).
  const lessonContext = [
    `The student is working on this lesson.`,
    `Course: ${body.moduleTitle ?? "Unknown"}`,
    `Lesson: ${body.lessonTitle ?? "Unknown"}`,
    `Language: ${body.language ?? "js"}`,
    ``,
    `Lesson material (Markdown):`,
    body.lessonContent ?? "(not provided)",
  ].join("\n");

  // Inject the student's current code into the latest user turn (volatile).
  const messages: Anthropic.MessageParam[] = history.map((m, i) => {
    if (i === history.length - 1 && body.code?.trim()) {
      return {
        role: m.role,
        content: `Here is my current code:\n\n\`\`\`${body.language ?? ""}\n${body.code}\n\`\`\`\n\n${m.content}`,
      };
    }
    return { role: m.role, content: m.content };
  });

  const client = new Anthropic();

  try {
    const stream = client.messages.stream({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      thinking: { type: "disabled" },
      system: [
        {
          type: "text",
          text: SOCRATIC_SYSTEM,
          cache_control: { type: "ephemeral" }, // shared across all requests
        },
        {
          type: "text",
          text: lessonContext,
          cache_control: { type: "ephemeral" }, // reused within a lesson session
        },
      ],
      messages,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream<Uint8Array>({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              controller.enqueue(encoder.encode(event.delta.text));
            }
          }
        } catch {
          controller.enqueue(
            encoder.encode("\n\n(Sorry — I hit a snag. Try asking again.)"),
          );
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    if (err instanceof Anthropic.RateLimitError) {
      return Response.json(
        { error: "The tutor is busy right now — try again in a moment." },
        { status: 429 },
      );
    }
    const message = err instanceof Error ? err.message : "Unknown error";
    return Response.json({ error: message }, { status: 500 });
  }
}
