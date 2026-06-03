"use client";

// A palette of bite-sized code "blocks" for beginners. Drag a block onto the
// editor, or tap it to drop it in at the cursor — so a young learner assembles
// the answer instead of facing a blank page. Purely an assist; the editor stays
// fully editable and grading is unchanged.

export function BlockTray({
  blocks,
  onInsert,
}: {
  blocks: string[];
  onInsert: (text: string) => void;
}) {
  if (blocks.length === 0) return null;

  return (
    <div className="mt-5 border-t border-line pt-4">
      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
        🧱 Code blocks
      </p>
      <p className="mb-3 text-xs text-gray-500">
        Drag a block into the editor, or tap it to drop it in where your cursor
        is. Add them in order to build your answer.
      </p>
      <div className="flex flex-wrap gap-2">
        {blocks.map((block, i) => (
          <button
            key={i}
            type="button"
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData("text/plain", block);
              e.dataTransfer.effectAllowed = "copy";
            }}
            onClick={() => onInsert(block)}
            title="Tap to add, or drag into the editor"
            className="cursor-grab rounded-lg border border-accent/40 bg-accent/10 px-2.5 py-1.5 font-mono text-xs text-accent-soft transition hover:border-accent hover:bg-accent/20 active:cursor-grabbing"
          >
            {block.trim() === "" ? "␣" : block}
          </button>
        ))}
      </div>
    </div>
  );
}
