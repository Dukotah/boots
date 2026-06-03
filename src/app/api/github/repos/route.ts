import { NextResponse } from "next/server";
import {
  isGithubAppConfigured,
  getInstallationToken,
  listInstallationRepos,
} from "@/lib/github/app";
import { getAuthedGithubLink } from "@/lib/github/link";

// Repos the user's installation can write to (for the repo picker in the UI).
export const runtime = "nodejs";
export const dynamic = "force-dynamic"; // per-request: depends on auth + GitHub

export async function GET() {
  if (!isGithubAppConfigured) {
    return NextResponse.json({ repos: [] });
  }
  const link = await getAuthedGithubLink();
  if (!link?.installationId) {
    return NextResponse.json({ repos: [] });
  }
  const token = await getInstallationToken(link.installationId);
  if (!token) return NextResponse.json({ repos: [] });

  const repos = await listInstallationRepos(token);
  return NextResponse.json({ repos, selected: link.repo });
}
