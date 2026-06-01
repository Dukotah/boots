"use client";

import Editor from "@monaco-editor/react";

export function CodeEditor({
  value,
  onChange,
  language = "javascript",
}: {
  value: string;
  onChange: (value: string) => void;
  language?: string;
}) {
  return (
    <Editor
      height="100%"
      language={language}
      theme="vs-dark"
      value={value}
      onChange={(v) => onChange(v ?? "")}
      options={{
        fontSize: 14,
        fontFamily: "var(--font-mono)",
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        padding: { top: 14 },
        lineNumbersMinChars: 3,
        tabSize: 2,
        automaticLayout: true,
        smoothScrolling: true,
        cursorBlinking: "smooth",
      }}
      loading={
        <div className="flex h-full items-center justify-center text-sm text-gray-500">
          Loading editor…
        </div>
      }
    />
  );
}
