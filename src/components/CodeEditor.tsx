"use client";

import Editor from "@monaco-editor/react";
import { useRef } from "react";
import type { editor as MonacoEditor, IPosition } from "monaco-editor";

export function CodeEditor({
  value,
  onChange,
  language = "javascript",
  registerInsert,
}: {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  // Called once the editor mounts with a function that inserts text at the
  // cursor. Lets a parent (e.g. the code-block tray) drop snippets in on tap.
  registerInsert?: (insert: (text: string) => void) => void;
}) {
  const editorRef = useRef<MonacoEditor.IStandaloneCodeEditor | null>(null);
  const monacoRef = useRef<typeof import("monaco-editor") | null>(null);

  // Respect users who prefer reduced motion (photosensitivity, focus).
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  // Insert `text` at `position` (or the current cursor if omitted). Goes through
  // executeEdits so it's a single undoable step and fires onChange to keep React
  // state in sync — no separate setValue needed.
  function insertText(text: string, position?: IPosition) {
    const editor = editorRef.current;
    const monaco = monacoRef.current;
    if (!editor || !monaco) return;
    const pos = position ?? editor.getPosition();
    if (!pos) return;
    const range = new monaco.Range(
      pos.lineNumber,
      pos.column,
      pos.lineNumber,
      pos.column,
    );
    editor.executeEdits("code-blocks", [
      { range, text, forceMoveMarkers: true },
    ]);
    editor.pushUndoStop();
    editor.focus();
  }

  return (
    // Wrapper owns the drop target so blocks dragged from the tray land in the
    // editor. dragover must preventDefault for a drop event to fire at all.
    <div
      className="h-full"
      onDragOver={(e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "copy";
      }}
      onDrop={(e) => {
        const text = e.dataTransfer.getData("text/plain");
        if (!text) return;
        e.preventDefault();
        const editor = editorRef.current;
        // Drop the snippet exactly where the cursor was released, falling back to
        // the current cursor if the point isn't over editable text.
        const target = editor?.getTargetAtClientPoint(e.clientX, e.clientY);
        insertText(text, target?.position ?? undefined);
      }}
    >
      <Editor
        height="100%"
        language={language}
        theme="vs-dark"
        value={value}
        onChange={(v) => onChange(v ?? "")}
        onMount={(editor, monaco) => {
          editorRef.current = editor;
          monacoRef.current = monaco;
          registerInsert?.((text) => insertText(text));
        }}
        options={{
          fontSize: 14,
          fontFamily: "var(--font-mono)",
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          padding: { top: 14 },
          lineNumbersMinChars: 3,
          tabSize: 2,
          automaticLayout: true,
          smoothScrolling: !reduced,
          cursorBlinking: reduced ? "solid" : "smooth",
        }}
        loading={
          <div
            role="status"
            aria-label="Loading code editor"
            className="flex h-full items-center justify-center text-sm text-gray-500"
          >
            Loading editor…
          </div>
        }
      />
    </div>
  );
}
