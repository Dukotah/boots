"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Send, X, Settings, Square, Sparkles, KeyRound, Cpu } from "lucide-react";
import { MascotBoots } from "./MascotBoots";
import { useTutorSettings } from "@/lib/tutor/settings";
import { streamTutorReply } from "@/lib/tutor/engine";
import { quickHint } from "@/lib/tutor/prompt";
import { webgpuAvailable } from "@/lib/tutor/local";
import {
  ANTHROPIC_MODELS,
  LOCAL_MODELS,
  type ChatMessage,
  type TutorContext,
} from "@/lib/tutor/types";

export function TutorPanel({
  open,
  onClose,
  context,
}: {
  open: boolean;
  onClose: () => void;
  context: TutorContext;
}) {
  const settings = useTutorSettings();
  const [thread, setThread] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState<{ text: string; progress: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Open settings automatically if the chosen provider isn't ready.
  useEffect(() => {
    if (open && settings.provider === "anthropic" && !settings.anthropicKey) {
      setShowSettings(true);
    }
  }, [open, settings.provider, settings.anthropicKey]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [thread, progress]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || busy) return;
    setError(null);
    setInput("");

    const userMsg: ChatMessage = { role: "user", content };
    const history = [...thread, userMsg];
    // Add a placeholder assistant message we stream into.
    setThread([...history, { role: "assistant", content: "" }]);
    setBusy(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      await streamTutorReply({
        settings: {
          provider: settings.provider,
          anthropicKey: settings.anthropicKey,
          anthropicModel: settings.anthropicModel,
          localModel: settings.localModel,
        },
        context,
        messages: history,
        signal: controller.signal,
        onProgress: (p) => setProgress(p),
        onToken: (delta) => {
          setProgress(null);
          setThread((prev) => {
            const next = [...prev];
            next[next.length - 1] = {
              role: "assistant",
              content: next[next.length - 1].content + delta,
            };
            return next;
          });
        },
      });
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Something went wrong.";
      setError(msg);
      // Remove the empty assistant placeholder on hard failure.
      setThread((prev) =>
        prev[prev.length - 1]?.content === "" ? prev.slice(0, -1) : prev,
      );
    } finally {
      setBusy(false);
      setProgress(null);
      abortRef.current = null;
    }
  }

  function stop() {
    abortRef.current?.abort();
    setBusy(false);
    setProgress(null);
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-line bg-surface"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-line px-4 py-3">
              <div className="flex items-center gap-2">
                <MascotBoots size={30} />
                <div>
                  <p className="text-sm font-bold text-white">Boots</p>
                  <p className="text-[11px] text-gray-400">
                    {settings.provider === "anthropic"
                      ? "Your Anthropic key"
                      : "Local model (in-browser)"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setShowSettings((s) => !s)}
                  className="rounded-lg p-2 text-gray-400 hover:bg-surface-2 hover:text-white"
                  aria-label="Tutor settings"
                >
                  <Settings size={17} />
                </button>
                <button
                  onClick={onClose}
                  className="rounded-lg p-2 text-gray-400 hover:bg-surface-2 hover:text-white"
                  aria-label="Close tutor"
                >
                  <X size={17} />
                </button>
              </div>
            </div>

            {/* Settings */}
            <AnimatePresence>
              {showSettings && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden border-b border-line bg-surface-2"
                >
                  <div className="space-y-3 p-4 text-sm">
                    <div className="flex gap-2">
                      <ProviderButton
                        active={settings.provider === "anthropic"}
                        onClick={() => settings.setProvider("anthropic")}
                        icon={<KeyRound size={14} />}
                        label="Your API key"
                      />
                      <ProviderButton
                        active={settings.provider === "local"}
                        onClick={() => settings.setProvider("local")}
                        icon={<Cpu size={14} />}
                        label="Local model"
                      />
                    </div>

                    {settings.provider === "anthropic" ? (
                      <div className="space-y-2">
                        <label className="block text-xs text-gray-400">
                          Anthropic API key (stored only in your browser)
                        </label>
                        <input
                          type="password"
                          value={settings.anthropicKey}
                          onChange={(e) => settings.setAnthropicKey(e.target.value)}
                          placeholder="sk-ant-..."
                          className="w-full rounded-lg border border-line bg-canvas px-3 py-2 font-mono text-xs text-white outline-none focus:border-accent"
                        />
                        <select
                          value={settings.anthropicModel}
                          onChange={(e) =>
                            settings.setAnthropicModel(e.target.value as never)
                          }
                          className="w-full rounded-lg border border-line bg-canvas px-3 py-2 text-xs text-white outline-none focus:border-accent"
                        >
                          {ANTHROPIC_MODELS.map((m) => (
                            <option key={m.id} value={m.id}>
                              {m.label}
                            </option>
                          ))}
                        </select>
                        <p className="text-[11px] text-gray-500">
                          Calls go straight from your browser to Anthropic — the
                          platform never sees your key or pays for tokens.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <label className="block text-xs text-gray-400">
                          In-browser model (runs on your device via WebGPU)
                        </label>
                        <select
                          value={settings.localModel}
                          onChange={(e) =>
                            settings.setLocalModel(e.target.value as never)
                          }
                          className="w-full rounded-lg border border-line bg-canvas px-3 py-2 text-xs text-white outline-none focus:border-accent"
                        >
                          {LOCAL_MODELS.map((m) => (
                            <option key={m.id} value={m.id}>
                              {m.label}
                            </option>
                          ))}
                        </select>
                        {!webgpuAvailable() && (
                          <p className="text-[11px] text-danger">
                            WebGPU isn&apos;t available here — try Chrome/Edge, or
                            use the API-key option.
                          </p>
                        )}
                        <p className="text-[11px] text-gray-500">
                          First message downloads the model once (cached after).
                          No API cost to anyone.
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
              {/* Boots intro bubble (display-only) */}
              <Bubble role="assistant">
                <p className="font-medium text-white">
                  Hey! I&apos;m Boots 🐾
                </p>
                <p className="mt-1 text-gray-300">
                  I won&apos;t give you the answer — I&apos;ll help you find it.
                  Ask me anything, or tap a quick hint below.
                </p>
              </Bubble>

              {thread.map((m, i) => (
                <Bubble key={i} role={m.role}>
                  {m.content ||
                    (busy && i === thread.length - 1 ? (
                      <span className="text-gray-500">Boots is thinking…</span>
                    ) : (
                      ""
                    ))}
                </Bubble>
              ))}

              {progress && (
                <div className="rounded-lg border border-line bg-canvas p-3 text-xs text-gray-300">
                  <p className="mb-1 truncate">{progress.text}</p>
                  <div className="h-1.5 overflow-hidden rounded-full bg-surface-2">
                    <div
                      className="h-full bg-accent"
                      style={{ width: `${Math.round(progress.progress * 100)}%` }}
                    />
                  </div>
                </div>
              )}

              {error && (
                <div className="rounded-lg border border-danger/40 bg-danger/10 p-3 text-xs text-danger">
                  {error}
                </div>
              )}
            </div>

            {/* Quick actions + input */}
            <div className="border-t border-line p-3">
              <div className="mb-2 flex flex-wrap gap-2">
                <QuickChip onClick={() => send("I'm stuck. Give me a hint.")} disabled={busy}>
                  <Sparkles size={12} /> Hint
                </QuickChip>
                <QuickChip onClick={() => send("Why is my test failing?")} disabled={busy}>
                  Why is it failing?
                </QuickChip>
                <QuickChip
                  onClick={() =>
                    setThread((p) => [
                      ...p,
                      { role: "assistant", content: quickHint(context) },
                    ])
                  }
                  disabled={busy}
                >
                  Free quick hint
                </QuickChip>
              </div>
              <div className="flex items-end gap-2">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      send(input);
                    }
                  }}
                  rows={1}
                  placeholder="Ask Boots…"
                  className="max-h-28 flex-1 resize-none rounded-xl border border-line bg-canvas px-3 py-2 text-sm text-white outline-none focus:border-accent"
                />
                {busy ? (
                  <button onClick={stop} className="btn-ghost px-3" aria-label="Stop">
                    <Square size={16} />
                  </button>
                ) : (
                  <button
                    onClick={() => send(input)}
                    disabled={!input.trim()}
                    className="btn-primary px-3 disabled:opacity-50"
                    aria-label="Send"
                  >
                    <Send size={16} />
                  </button>
                )}
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function Bubble({
  role,
  children,
}: {
  role: "user" | "assistant";
  children: React.ReactNode;
}) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm ${
          isUser
            ? "bg-accent text-white"
            : "border border-line bg-canvas text-gray-200"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function ProviderButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
        active
          ? "border-accent bg-accent/15 text-white"
          : "border-line bg-canvas text-gray-400 hover:text-white"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function QuickChip({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center gap-1 rounded-full border border-line bg-canvas px-3 py-1 text-xs text-gray-300 transition-colors hover:border-accent/60 hover:text-white disabled:opacity-40"
    >
      {children}
    </button>
  );
}
