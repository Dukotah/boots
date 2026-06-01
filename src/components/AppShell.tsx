"use client";

/**
 * AppShell – the persistent chrome around every authenticated page.
 *
 * Includes:
 *   - AuthProvider (wires Supabase session → useGameStore)
 *   - Navbar
 *   - Sidebar slot (optional, for Dashboard / Achievements nav)
 *   - Main content area
 *   - LevelUpToast (global, so it fires regardless of which page is active)
 *
 * Usage in app/layout.tsx:
 *
 *   import { AppShell } from "@/components/AppShell";
 *   ...
 *   <AppShell>{children}</AppShell>
 *
 * If you want to opt individual pages OUT of the shell (e.g. the landing
 * page has its own full-bleed layout), move AppShell down to a nested
 * layout instead of the root.
 */

import { Navbar } from "@/components/Navbar";
import { LevelUpToast } from "@/components/LevelUpToast";
import { AuthProvider } from "@/components/AuthProvider";

type AppShellProps = {
  children: React.ReactNode;
  /** Optional sidebar node (pass a nav component, leave empty for no sidebar) */
  sidebar?: React.ReactNode;
};

export function AppShell({ children, sidebar }: AppShellProps) {
  return (
    <AuthProvider>
      {/* Global level-up toast – rendered once at the shell level */}
      <LevelUpToast />

      <div className="min-h-screen flex flex-col">
        <Navbar />

        <div className="flex flex-1">
          {sidebar && (
            <aside className="hidden md:flex flex-col w-56 shrink-0 border-r border-white/10 py-6 px-4 gap-2">
              {sidebar}
            </aside>
          )}

          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </AuthProvider>
  );
}
