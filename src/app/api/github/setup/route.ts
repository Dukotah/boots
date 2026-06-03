import { NextResponse } from "next/server";
import {
  isGithubAppConfigured,
  getInstallationOwner,
} from "@/lib/github/app";
import { getSupabaseServerClient } from "@/lib/supabase/server";

// GitHub redirects here after a user installs the App (Setup URL). We persist the
// installation id + owner login onto the signed-in user's profile, then bounce
// them back to /profile. Requires an active session (the install is initiated
// from a signed-in state, so the auth cookie is present).
export const runtime = "nodejs";

function backTo(origin: string, status: string): NextResponse {
  return NextResponse.redirect(new URL(`/profile?github=${status}`, origin));
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const installationId = Number(url.searchParams.get("installation_id"));

  if (!isGithubAppConfigured || !installationId) {
    return backTo(url.origin, "error");
  }

  const sb = getSupabaseServerClient();
  if (!sb) return backTo(url.origin, "error");

  const {
    data: { user },
  } = await sb.auth.getUser();
  if (!user) return backTo(url.origin, "signin");

  const owner = await getInstallationOwner(installationId);

  await sb
    .from("profiles")
    .update({
      github_installation_id: installationId,
      github_login: owner,
    })
    .eq("id", user.id);

  return backTo(url.origin, "connected");
}
