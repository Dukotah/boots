"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import type { editor as MonacoEditor, IPosition } from "monaco-editor";

// Load the Monaco wrapper only on the client, in its own async chunk. This keeps
// the ~Monaco editor bundle out of the initial JS of every page that mounts a
// CodeEditor (lessons, playground, visualizer) — it streams in on first render.
const Editor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div
      role="status"
      aria-label="Loading code editor"
      className="flex h-full items-center justify-center text-sm text-gray-500"
    >
      Loading editor…
    </div>
  ),
});

export function CodeEditor({
  value,
  onChange,
  language = "javascript",
  registerInsert,
  registerHighlight,
}: {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  registerInsert?: (insert: (text: string) => void) => void;
  // Called once with a function that highlights a line range for a moment.
  registerHighlight?: (highlight: (startLine: number, endLine: number) => void) => void;
}) {
  const editorRef = useRef<MonacoEditor.IStandaloneCodeEditor | null>(null);
  const monacoRef = useRef<typeof import("monaco-editor") | null>(null);
  const lastPosRef = useRef<IPosition | null>(null);
  const decorationsRef = useRef<string[]>([]);
  const clearTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  function insertText(text: string, position?: IPosition) {
    const editor = editorRef.current;
    const monaco = monacoRef.current;
    if (!editor || !monaco) return;
    const pos = position ?? lastPosRef.current ?? editor.getPosition();
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

  function highlightLines(startLine: number, endLine: number) {
    const editor = editorRef.current;
    const monaco = monacoRef.current;
    if (!editor || !monaco) return;

    if (clearTimerRef.current) clearTimeout(clearTimerRef.current);

    decorationsRef.current = editor.deltaDecorations(decorationsRef.current, [
      {
        range: new monaco.Range(startLine, 1, endLine, 1),
        options: {
          isWholeLine: true,
          className: "hint-highlight-line",
          linesDecorationsClassName: "hint-highlight-gutter",
        },
      },
    ]);

    editor.revealLinesInCenterIfOutsideViewport(startLine, endLine);

    clearTimerRef.current = setTimeout(() => {
      if (editorRef.current) {
        decorationsRef.current = editorRef.current.deltaDecorations(
          decorationsRef.current,
          [],
        );
      }
    }, 3000);
  }

  return (
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
          editor.onDidChangeCursorPosition((e) => {
            lastPosRef.current = e.position;
          });
          registerInsert?.((text) => insertText(text));
          registerHighlight?.((s, e) => highlightLines(s, e));
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
