// Server-only GitHub App client. Mints a short-lived App JWT (RS256) from the
// app's private key, exchanges it for a per-installation token, and commits files
// via the Contents API. Dependency-free (Node crypto + fetch) to keep the bundle
// lean and the trust surface small.
//
// Configuration (all server-side; never exposed to the browser):
//   GITHUB_APP_ID            — the numeric App ID
//   GITHUB_APP_PRIVATE_KEY   — the app's PEM private key (literal \n allowed)
// The public install slug lives in NEXT_PUBLIC_GITHUB_APP_SLUG (client-side).
//
// Like the Supabase/Stripe clients, everything degrades gracefully: when the env
// is absent, `isGithubAppConfigured` is false and callers skip the integration.

import crypto from "node:crypto";

const APP_ID = process.env.GITHUB_APP_ID;
const PRIVATE_KEY_RAW = process.env.GITHUB_APP_PRIVATE_KEY;

/** True when the GitHub App credentials are present and the integration is usable. */
export const isGithubAppConfigured = Boolean(APP_ID && PRIVATE_KEY_RAW);

const API = "https://api.github.com";

function privateKey(): string {
  const raw = PRIVATE_KEY_RAW ?? "";
  // Env vars often store PEM newlines escaped as literal "\n".
  return raw.includes("\\n") ? raw.replace(/\\n/g, "\n") : raw;
}

function b64url(input: Buffer | string): string {
  return Buffer.from(input)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

/** Mint a ~9-minute App JWT used to obtain installation tokens. */
function mintAppJwt(): string {
  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const payload = b64url(
    JSON.stringify({ iat: now - 60, exp: now + 540, iss: APP_ID }),
  );
  const data = `${header}.${payload}`;
  const signature = crypto
    .createSign("RSA-SHA256")
    .update(data)
    .sign(privateKey());
  return `${data}.${b64url(signature)}`;
}

async function gh(
  path: string,
  token: string,
  init?: RequestInit,
): Promise<Response> {
  return fetch(`${API}${path}`, {
    ...init,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "cantrip-coding-journey",
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });
}

/** Exchange the App JWT for a short-lived installation access token. */
export async function getInstallationToken(
  installationId: number,
): Promise<string | null> {
  if (!isGithubAppConfigured) return null;
  const res = await gh(
    `/app/installations/${installationId}/access_tokens`,
    mintAppJwt(),
    { method: "POST" },
  );
  if (!res.ok) return null;
  const data = (await res.json()) as { token?: string };
  return data.token ?? null;
}

/** The account (owner login) a given installation belongs to. */
export async function getInstallationOwner(
  installationId: number,
): Promise<string | null> {
  if (!isGithubAppConfigured) return null;
  const res = await gh(`/app/installations/${installationId}`, mintAppJwt());
  if (!res.ok) return null;
  const data = (await res.json()) as { account?: { login?: string } };
  return data.account?.login ?? null;
}

export type RepoRef = { name: string; fullName: string; private: boolean };

/** Repos this installation can write to (what the user selected at install). */
export async function listInstallationRepos(token: string): Promise<RepoRef[]> {
  const res = await gh(`/installation/repositories?per_page=100`, token);
  if (!res.ok) return [];
  const data = (await res.json()) as {
    repositories?: { name: string; full_name: string; private: boolean }[];
  };
  return (data.repositories ?? []).map((r) => ({
    name: r.name,
    fullName: r.full_name,
    private: r.private,
  }));
}

function encodePath(path: string): string {
  return path
    .split("/")
    .map((seg) => encodeURIComponent(seg))
    .join("/");
}

/**
 * Create or update a file in a repo (one commit). Looks up the current blob SHA
 * first so updates don't 409. Returns true on success.
 */
export async function commitFile(input: {
  token: string;
  owner: string;
  repo: string;
  path: string;
  content: string;
  message: string;
}): Promise<boolean> {
  const url = `/repos/${input.owner}/${input.repo}/contents/${encodePath(input.path)}`;

  // Existing file? Grab its SHA so the PUT is treated as an update.
  let sha: string | undefined;
  const existing = await gh(url, input.token);
  if (existing.ok) {
    const data = (await existing.json()) as { sha?: string };
    sha = data.sha;
  }

  const put = await gh(url, input.token, {
    method: "PUT",
    body: JSON.stringify({
      message: input.message,
      content: Buffer.from(input.content, "utf8").toString("base64"),
      sha,
    }),
  });
  return put.ok;
}
