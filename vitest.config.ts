import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
  },
  // Use React's automatic JSX runtime so component tests (.tsx) don't need
  // `React` in scope. The unit tests are plain .ts, so this only matters once
  // we render components — esbuild otherwise defaults to the classic runtime.
  esbuild: {
    jsx: "automatic",
    jsxImportSource: "react",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
