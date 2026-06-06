"use client";

import { useEffect, useRef, useCallback } from "react";

const FOCUSABLE_SELECTORS = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
  "details > summary",
].join(", ");

/**
 * Dependency-free focus trap for modal overlays and drawers.
 *
 * Usage:
 *   const trapRef = useFocusTrap(open);
 *   <div ref={trapRef} role="dialog" ...>...</div>
 *
 * While `active` is true the hook:
 *   1. Moves focus to the first focusable element inside the container.
 *   2. Loops Tab / Shift+Tab so focus never leaves the container.
 *   3. On deactivate, returns focus to whatever element was focused before
 *      the trap became active.
 */
export function useFocusTrap<T extends HTMLElement = HTMLElement>(
  active: boolean,
) {
  const containerRef = useRef<T>(null);
  // Remember the element that had focus before the trap was activated.
  const previousFocusRef = useRef<Element | null>(null);

  // Stable handler so the event listener can be removed cleanly.
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key !== "Tab") return;
    const container = containerRef.current;
    if (!container) return;

    const focusable = Array.from(
      container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS),
    ).filter((el) => !el.closest("[disabled]") && el.offsetParent !== null);

    if (focusable.length === 0) {
      e.preventDefault();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey) {
      // Shift+Tab: wrap from first → last.
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      // Tab: wrap from last → first.
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }, []);

  useEffect(() => {
    if (!active) return;

    // Capture the previously-focused element before we steal focus.
    previousFocusRef.current = document.activeElement;

    // Move focus into the container on the next tick so the element is
    // painted and visible before focus() is called.
    const raf = requestAnimationFrame(() => {
      const container = containerRef.current;
      if (!container) return;
      const firstFocusable = container.querySelector<HTMLElement>(
        FOCUSABLE_SELECTORS,
      );
      if (firstFocusable) {
        firstFocusable.focus();
      } else {
        // Fall back to focusing the container itself so it at least receives
        // keyboard events (requires tabIndex="-1" on the container).
        container.focus();
      }
    });

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", handleKeyDown);
      // Restore focus to the element that was active before the trap.
      const prev = previousFocusRef.current;
      if (prev && (prev as HTMLElement).focus) {
        (prev as HTMLElement).focus();
      }
    };
  }, [active, handleKeyDown]);

  return containerRef;
}
