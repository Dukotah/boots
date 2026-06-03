import { NextResponse } from "next/server";
import { isGithubAppConfigured } from "@/lib/github/app";
import { getAuthedGithubLink } from "@/lib/github/link";
import { getSupabaseServerClient } from "@/lib/supabase/server";

// Connection status (GET) + target-repo selection (POST) for the GitHub journey.
export const runtime = "nodejs";
export const dynamic = "force-dynamic"; // per-request: depends on the auth cookie

export async function GET() {
  const appSlug = process.env.NEXT_PUBLIC_GITHUB_APP_SLUG ?? null;
  if (!isGithubAppConfigured) {
    return NextResponse.json({ configured: false });
  }
  const link = await getAuthedGithubLink();
  return NextResponse.json({
    configured: true,
    appSlug,
    signedIn: Boolean(link),
    connected: Boolean(link?.installationId),
    login: link?.login ?? null,
    repo: link?.repo ?? null,
  });
}

const REPO_RE = /^[A-Za-z0-9._-]{1,100}$/;

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const repo = (body as { repo?: unknown } | null)?.repo;
  if (typeof repo !== "string" || !REPO_RE.test(repo)) {
    return NextResponse.json({ error: "Invalid repo name" }, { status: 400 });
  }
  const link = await getAuthedGithubLink();
  if (!link) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }
  const sb = getSupabaseServerClient();
  if (!sb) return NextResponse.json({ error: "No backend" }, { status: 503 });

  // RLS ("users update own profile") guarantees we can only write our own row.
  await sb
    .from("profiles")
    .update({ github_repo: repo })
    .eq("id", link.userId);

  return NextResponse.json({ ok: true, repo });
}

// Disconnect: clear the GitHub link. (The user should also uninstall the App in
// their GitHub settings to fully revoke access.)
export async function DELETE() {
  const link = await getAuthedGithubLink();
  if (!link) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }
  const sb = getSupabaseServerClient();
  if (!sb) return NextResponse.json({ error: "No backend" }, { status: 503 });

  await sb
    .from("profiles")
    .update({
      github_login: null,
      github_installation_id: null,
      github_repo: null,
    })
    .eq("id", link.userId);

  return NextResponse.json({ ok: true });
}
