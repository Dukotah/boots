// Minimal Resend client (fetch-based, no SDK dependency). Sends transactional
// lifecycle email. Degrades gracefully: when RESEND_API_KEY is absent, send() is
// a no-op that reports { skipped } so callers never break.

const API_KEY = process.env.RESEND_API_KEY;
const FROM = process.env.EMAIL_FROM ?? "Cantrip <onboarding@resend.dev>";

export const isEmailConfigured = Boolean(API_KEY);

export async function sendEmail(input: {
  to: string;
  subject: string;
  html: string;
}): Promise<{ ok: boolean; skipped?: boolean }> {
  if (!isEmailConfigured) return { ok: false, skipped: true };
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: input.to,
        subject: input.subject,
        html: input.html,
      }),
    });
    return { ok: res.ok };
  } catch {
    return { ok: false };
  }
}
