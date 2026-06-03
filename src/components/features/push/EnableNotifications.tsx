"use client";

import { useEffect, useState } from "react";
import { Bell, BellOff, Check } from "lucide-react";

const VAPID = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

// base64url VAPID key → Uint8Array for PushManager.subscribe.
function urlBase64ToUint8Array(base64: string): Uint8Array {
  const padding = "=".repeat((4 - (base64.length % 4)) % 4);
  const b64 = (base64 + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(b64);
  const out = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
  return out;
}

export function EnableNotifications() {
  const [supported, setSupported] = useState(false);
  const [state, setState] = useState<"idle" | "on" | "denied" | "busy">("idle");

  useEffect(() => {
    const ok =
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      "PushManager" in window &&
      Boolean(VAPID);
    setSupported(ok);
    if (ok && Notification.permission === "granted") setState("on");
    if (ok && Notification.permission === "denied") setState("denied");
  }, []);

  // Hidden unless push is actually available + configured.
  if (!supported) return null;

  async function enable() {
    setState("busy");
    try {
      const perm = await Notification.requestPermission();
      if (perm !== "granted") {
        setState("denied");
        return;
      }
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID!) as BufferSource,
      });
      await fetch("/api/push/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sub),
      });
      setState("on");
    } catch {
      setState("idle");
    }
  }

  if (state === "on") {
    return (
      <p className="mt-4 flex items-center gap-2 text-sm text-success">
        <Check size={15} /> Streak reminders are on.
      </p>
    );
  }

  return (
    <button
      onClick={enable}
      disabled={state === "busy" || state === "denied"}
      className="btn-ghost mt-4 text-sm disabled:opacity-50"
    >
      {state === "denied" ? <BellOff size={15} /> : <Bell size={15} />}
      {state === "denied"
        ? "Notifications blocked"
        : state === "busy"
          ? "Enabling…"
          : "Enable streak reminders"}
    </button>
  );
}
