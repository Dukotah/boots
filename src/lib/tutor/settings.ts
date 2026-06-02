"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AnthropicModel, LocalModelId, TutorProvider } from "./types";

type TutorSettingsState = {
  provider: TutorProvider;
  // BYOK: stored only in this browser's localStorage, sent only to Anthropic.
  anthropicKey: string;
  anthropicModel: AnthropicModel;
  localModel: LocalModelId;

  setProvider: (p: TutorProvider) => void;
  setAnthropicKey: (k: string) => void;
  setAnthropicModel: (m: AnthropicModel) => void;
  setLocalModel: (m: LocalModelId) => void;

  isConfigured: () => boolean;
};

export const useTutorSettings = create<TutorSettingsState>()(
  persist(
    (set, get) => ({
      // This is the on-device tutor entry point, so default to the local model
      // (which just needs a one-time download). Learners can switch to BYOK.
      provider: "local",
      anthropicKey: "",
      anthropicModel: "claude-haiku-4-5-20251001",
      // Smallest model by default: on phones, memory — not download — is the
      // real limit, and the 0.5B is the most likely to actually run.
      localModel: "Qwen2.5-0.5B-Instruct-q4f16_1-MLC",

      setProvider: (provider) => set({ provider }),
      setAnthropicKey: (anthropicKey) => set({ anthropicKey }),
      setAnthropicModel: (anthropicModel) => set({ anthropicModel }),
      setLocalModel: (localModel) => set({ localModel }),

      isConfigured: () => {
        const s = get();
        if (s.provider === "anthropic") return s.anthropicKey.trim().length > 0;
        return true; // local model just needs a (one-time) download
      },
    }),
    { name: "cantrip-tutor-settings" },
  ),
);
