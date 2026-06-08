"use client";

// Account management page — GDPR/CCPA data rights.
// - Export my data: assembles a JSON snapshot from the Zustand store +
//   Supabase profile (if configured) and downloads it to the browser.
// - Delete my account: confirmation modal → DELETE /api/account/delete.
//
// Both actions degrade gracefully when Supabase is unconfigured.

import { useState } from "react";
import { Download, Trash2, AlertTriangle, X, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/store/useGameStore";
import { useMounted } from "@/hooks/useMounted";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { getSupabaseBrowserClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { SITE } from "@/lib/site";
import { PageSkeleton } from "@/components/PageSkeleton";

// ── helpers ───────────────────────────────────────────────────────────────────

/** Pull the Supabase profile row for the signed-in user, or null if not available. */
async function fetchRemoteProfile(userId: string) {
  const sb = getSupabaseBrowserClient();
  if (!sb) return null;
  const { data } = await sb
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();
  return data ?? null;
}

/** Trigger a JSON download in the browser without any server roundtrip. */
function downloadJson(filename: string, data: unknown) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// ── page ──────────────────────────────────────────────────────────────────────

export default function AccountPage() {
  const mounted = useMounted();

  // Pull the minimum store fields needed for the export bundle.
  const user = useGameStore((s) => s.user);
  const xp = useGameStore((s) => s.xp);
  const gold = useGameStore((s) => s.gold);
  const streak = useGameStore((s) => s.streak);
  const completed = useGameStore((s) => s.completed);
  const achievements = useGameStore((s) => s.achievements);
  const activeDays = useGameStore((s) => s.activeDays);
  const cosmetics = useGameStore((s) => s.cosmetics);
  const equipped = useGameStore((s) => s.equipped);
  const talents = useGameStore((s) => s.talents);
  const guildId = useGameStore((s) => s.guildId);
  const guildName = useGameStore((s) => s.guildName);
  const goal = useGameStore((s) => s.goal);
  const reviews = useGameStore((s) => s.reviews);
  const rev = useGameStore((s) => s.rev);

  const [exportStatus, setExportStatus] = useState<"idle" | "loading" | "done">("idle");
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState("");
  const [deleteStatus, setDeleteStatus] = useState<"idle" | "loading" | "error">("idle");
  const modalTrapRef = useFocusTrap<HTMLDivElement>(deleteOpen);

  if (!mounted) {
    return <PageSkeleton maxW="max-w-2xl" rows={2} />;
  }

  // ── Export ─────────────────────────────────────────────────────────────────

  async function handleExport() {
    setExportStatus("loading");

    // Always include the local Zustand snapshot.
    const localSnapshot = {
      exportedAt: new Date().toISOString(),
      source: SITE.name,
      userId: user?.id ?? null,
      email: user?.email ?? null,
      progress: {
        xp,
        gold,
        streak,
        completed,
        achievements,
        activeDays,
        cosmetics,
        equipped,
        talents,
        guildId,
        guildName,
        goal,
        reviews,
        rev,
      },
    };

    // If Supabase is configured and the user is signed in, also include the
    // server-side profile row so the export is authoritative.
    let remoteProfile: unknown = null;
    if (isSupabaseConfigured && user?.id) {
      remoteProfile = await fetchRemoteProfile(user.id);
    }

    const bundle = {
      ...localSnapshot,
      remoteProfile,
    };

    const handle = user?.email?.split("@")[0] ?? "cantrip";
    downloadJson(`${handle}-cantrip-data.json`, bundle);
    setExportStatus("done");
    setTimeout(() => setExportStatus("idle"), 3000);
  }

  // ── Delete ─────────────────────────────────────────────────────────────────

  async function handleDelete() {
    if (deleteConfirm.trim().toUpperCase() !== "DELETE") return;
    setDeleteStatus("loading");

    try {
      const res = await fetch("/api/account/delete", { method: "DELETE" });
      const json = (await res.json()) as { ok?: boolean; skipped?: boolean; error?: string };

      if (json.skipped) {
        // Supabase not configured — clear local store only.
        useGameStore.getState().reset();
        // In a real Supabase setup, signOut here too; in local-only mode just
        // redirect to home so state is gone.
        window.location.href = "/";
        return;
      }

      if (!res.ok || json.error) {
        throw new Error(json.error ?? "Unknown error");
      }

      // Sign out locally and redirect — account is gone.
      const sb = getSupabaseBrowserClient();
      if (sb) await sb.auth.signOut();
      window.location.href = "/?deleted=1";
    } catch (err) {
      console.error("[account/delete]", err);
      setDeleteStatus("error");
    }
  }

  const deleteReady = deleteConfirm.trim().toUpperCase() === "DELETE";

  // ── render ─────────────────────────────────────────────────────────────────

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Account & Data</h1>
        <p className="mt-1 text-sm text-gray-400">
          Manage your account data. You have the right to export or delete everything
          {SITE.name} holds about you.
        </p>
      </div>

      {/* Identity summary */}
      {user && (
        <div className="rounded-xl border border-line bg-surface px-5 py-4">
          <p className="text-xs uppercase tracking-wide text-gray-400 mb-1">Signed in as</p>
          <p className="font-medium text-white">{user.email}</p>
          <p className="text-xs text-gray-400 mt-0.5">ID: {user.id}</p>
        </div>
      )}

      {/* Export */}
      <div className="card space-y-3">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/15">
            <Download size={18} className="text-accent-soft" />
          </div>
          <div>
            <h2 className="font-semibold text-white">Export my data</h2>
            <p className="mt-1 text-sm text-gray-400">
              Download a JSON file containing your full progress snapshot — XP, gold,
              streak, completed lessons, achievements, cosmetics, talents, and all
              other gameplay state. Includes your server profile when you're signed in.
            </p>
          </div>
        </div>

        <button
          onClick={handleExport}
          disabled={exportStatus === "loading"}
          className="flex items-center gap-2 rounded-lg border border-line bg-surface px-4 py-2 text-sm font-medium text-gray-200 transition hover:border-accent/50 hover:text-white disabled:opacity-50"
        >
          {exportStatus === "loading" ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Download size={14} />
          )}
          {exportStatus === "done"
            ? "Downloaded!"
            : exportStatus === "loading"
              ? "Preparing…"
              : "Export as JSON"}
        </button>
      </div>

      {/* Delete */}
      <div className="rounded-xl border border-red-900/40 bg-red-950/20 px-5 py-5 space-y-3">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-900/30">
            <Trash2 size={18} className="text-red-400" />
          </div>
          <div>
            <h2 className="font-semibold text-red-300">Delete my account</h2>
            <p className="mt-1 text-sm text-gray-400">
              Permanently erase your {SITE.name} account and all associated data from
              our servers. This action is irreversible. Your local browser progress
              is also cleared.
            </p>
          </div>
        </div>

        <button
          onClick={() => setDeleteOpen(true)}
          className="flex items-center gap-2 rounded-lg border border-red-800/50 bg-red-900/20 px-4 py-2 text-sm font-medium text-red-300 transition hover:border-red-700 hover:bg-red-900/40 hover:text-red-200"
        >
          <Trash2 size={14} />
          Delete my account
        </button>
      </div>

      {/* Delete confirmation modal */}
      <AnimatePresence>
        {deleteOpen && (
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setDeleteOpen(false);
                setDeleteConfirm("");
                setDeleteStatus("idle");
              }
            }}
          >
            <motion.div
              ref={modalTrapRef}
              key="modal-panel"
              role="dialog"
              aria-modal="true"
              aria-labelledby="delete-modal-title"
              tabIndex={-1}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  setDeleteOpen(false);
                  setDeleteConfirm("");
                  setDeleteStatus("idle");
                }
              }}
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              className="relative w-full max-w-md rounded-2xl border border-red-900/40 bg-surface p-6 shadow-2xl"
            >
              <button
                onClick={() => {
                  setDeleteOpen(false);
                  setDeleteConfirm("");
                  setDeleteStatus("idle");
                }}
                aria-label="Close delete confirmation dialog"
                className="absolute right-4 top-4 text-gray-500 hover:text-gray-200 transition"
              >
                <X size={18} aria-hidden="true" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-900/40">
                  <AlertTriangle size={20} className="text-red-400" aria-hidden="true" />
                </div>
                <h3 id="delete-modal-title" className="text-lg font-bold text-white">Confirm deletion</h3>
              </div>

              <p className="text-sm text-gray-400 mb-4">
                This will permanently delete your account and all data from {SITE.name}.
                There is no undo. Type{" "}
                <span className="font-mono font-semibold text-red-300">DELETE</span> to
                confirm.
              </p>

              <label htmlFor="delete-confirm" className="sr-only">
                Type DELETE to confirm account deletion
              </label>
              <input
                id="delete-confirm"
                type="text"
                value={deleteConfirm}
                onChange={(e) => {
                  setDeleteConfirm(e.target.value);
                  setDeleteStatus("idle");
                }}
                placeholder="Type DELETE to confirm"
                className="w-full rounded-lg border border-line bg-canvas px-3 py-2 text-sm text-white placeholder:text-gray-600 focus:border-red-700 focus:outline-none mb-4"
              />

              {deleteStatus === "error" && (
                <p className="mb-3 rounded-lg bg-red-900/30 px-3 py-2 text-sm text-red-300">
                  Deletion failed. Please try again or contact support.
                </p>
              )}

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    setDeleteOpen(false);
                    setDeleteConfirm("");
                    setDeleteStatus("idle");
                  }}
                  className="rounded-lg border border-line px-4 py-2 text-sm text-gray-300 hover:text-white transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={!deleteReady || deleteStatus === "loading"}
                  className="flex items-center gap-2 rounded-lg bg-red-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {deleteStatus === "loading" ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <Trash2 size={14} />
                  )}
                  {deleteStatus === "loading" ? "Deleting…" : "Delete permanently"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
