"use client";

import { useEffect, useState } from "react";
import { Github, Check, ExternalLink, Loader2 } from "lucide-react";
import { DEFAULT_JOURNAL_REPO } from "@/lib/github/journal";

type Status = {
  configured: boolean;
  appSlug?: string | null;
  signedIn?: boolean;
  connected?: boolean;
  login?: string | null;
  repo?: string | null;
};

type Repo = { name: string; fullName: string; private: boolean };

export function GithubJournalCard() {
  const [status, setStatus] = useState<Status | null>(null);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/github")
      .then((r) => r.json())
      .then((s: Status) => setStatus(s))
      .catch(() => setStatus({ configured: false }));
  }, []);

  // Once connected, load the repos the installation can write to.
  useEffect(() => {
    if (!status?.connected) return;
    fetch("/api/github/repos")
      .then((r) => r.json())
      .then((d: { repos?: Repo[] }) => setRepos(d.repos ?? []))
      .catch(() => setRepos([]));
  }, [status?.connected]);

  // Hidden entirely until the operator has registered the GitHub App.
  if (!status || !status.configured) return null;

  const installUrl = status.appSlug
    ? `https://github.com/apps/${status.appSlug}/installations/new`
    : null;

  async function saveRepo(repo: string) {
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch("/api/github", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repo }),
      });
      if (res.ok) {
        setStatus((s) => (s ? { ...s, repo } : s));
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }
    } finally {
      setSaving(false);
    }
  }

  async function disconnect() {
    await fetch("/api/github", { method: "DELETE" }).catch(() => {});
    setStatus((s) => (s ? { ...s, connected: false, login: null, repo: null } : s));
    setRepos([]);
  }

  return (
    <div className="card mt-8">
      <div className="flex items-center gap-2">
        <Github size={18} className="text-white" />
        <h2 className="text-lg font-semibold text-white">GitHub journey</h2>
        {status.connected && (
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-success/15 px-2 py-0.5 text-[11px] font-semibold text-success">
            <Check size={12} /> Connected
          </span>
        )}
      </div>

      <p className="mt-1 text-sm text-gray-400">
        Commit your solutions and a live progress README to a repo you own as you
        learn — your contribution graph reflects real work, which recruiters love.
      </p>

      {!status.connected ? (
        <div className="mt-4">
          {installUrl ? (
            <a href={installUrl} className="btn-primary w-fit">
              <Github size={15} /> Connect GitHub
            </a>
          ) : (
            <p className="text-sm text-gray-500">
              GitHub App not fully configured.
            </p>
          )}
          <p className="mt-2 text-xs text-gray-500">
            You choose exactly one repo Boots can write to. Revoke anytime in your
            GitHub settings.
          </p>
        </div>
      ) : (
        <div className="mt-4">
          <p className="text-sm text-gray-300">
            Linked as{" "}
            <span className="font-mono text-white">@{status.login}</span>
          </p>

          <label className="mt-3 block text-xs font-medium text-gray-400">
            Journey repo
          </label>
          <div className="mt-1 flex items-center gap-2">
            <select
              value={status.repo ?? ""}
              onChange={(e) => saveRepo(e.target.value)}
              disabled={saving}
              className="flex-1 rounded-lg border border-line bg-canvas/60 px-3 py-2 text-sm text-white"
            >
              <option value="" disabled>
                {repos.length ? "Choose a repo…" : `e.g. ${DEFAULT_JOURNAL_REPO}`}
              </option>
              {repos.map((r) => (
                <option key={r.fullName} value={r.name}>
                  {r.fullName}
                  {r.private ? " (private)" : ""}
                </option>
              ))}
            </select>
            {saving && <Loader2 size={16} className="animate-spin text-gray-400" />}
            {saved && <Check size={16} className="text-success" />}
          </div>

          {repos.length === 0 && (
            <div className="mt-3 flex flex-col gap-1.5">
              <a
                href={`https://github.com/new?name=${DEFAULT_JOURNAL_REPO}&description=My+coding+journey`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs text-accent-soft hover:underline"
              >
                <ExternalLink size={12} /> Create a “{DEFAULT_JOURNAL_REPO}” repo
              </a>
              {installUrl && (
                <a
                  href={installUrl}
                  className="inline-flex items-center gap-1 text-xs text-accent-soft hover:underline"
                >
                  <ExternalLink size={12} /> Add a repo to the installation
                </a>
              )}
            </div>
          )}
          <div className="mt-3 flex items-center justify-between">
            <p className="text-xs text-gray-500">
              New commits land here each time you complete a lesson.
            </p>
            <button
              onClick={disconnect}
              className="text-xs text-gray-500 hover:text-danger"
            >
              Disconnect
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
