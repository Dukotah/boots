// Server-side helpers for reading the signed-in user's GitHub journey link off
// their profile row. Centralizes the Supabase auth + profile lookup the GitHub
// API routes share. Returns null when there's no backend or no session.

import { getSupabaseServerClient } from "@/lib/supabase/server";

export type GithubLink = {
  userId: string;
  username: string | null;
  login: string | null;
  installationId: number | null;
  repo: string | null;
  xp: number;
  streak: number;
  completed: string[];
};

export async function getAuthedGithubLink(): Promise<GithubLink | null> {
  const sb = getSupabaseServerClient();
  if (!sb) return null;

  const {
    data: { user },
  } = await sb.auth.getUser();
  if (!user) return null;

  const { data } = await sb
    .from("profiles")
    .select(
      "username, xp, streak, completed, github_login, github_installation_id, github_repo",
    )
    .eq("id", user.id)
    .maybeSingle();

  const row = (data ?? {}) as {
    username?: string | null;
    xp?: number;
    streak?: number;
    completed?: string[];
    github_login?: string | null;
    github_installation_id?: number | null;
    github_repo?: string | null;
  };

  return {
    userId: user.id,
    username: row.username ?? null,
    login: row.github_login ?? null,
    installationId: row.github_installation_id ?? null,
    repo: row.github_repo ?? null,
    xp: row.xp ?? 0,
    streak: row.streak ?? 0,
    completed: row.completed ?? [],
  };
}
