import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette — deep slate canvas, violet accent, emerald success.
        canvas: "#0a0a12",
        surface: "#12121f",
        "surface-2": "#1a1a2e",
        line: "#2a2a40",
        accent: {
          DEFAULT: "#8b5cf6",
          soft: "#a78bfa",
          deep: "#6d28d9",
        },
        success: "#34d399",
        gold: "#fbbf24",
        danger: "#fb7185",
      },
      fontFamily: {
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        glow: "0 0 24px -4px rgba(139, 92, 246, 0.5)",
        "glow-success": "0 0 24px -4px rgba(52, 211, 153, 0.45)",
      },
      keyframes: {
        "pop-in": {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        "pop-in": "pop-in 0.25s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
