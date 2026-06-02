import type { CheatSheet } from "./types";
import { htmlCheatsheet } from "./html";
import { cssCheatsheet } from "./css";
import { javascriptCheatsheet } from "./javascript";
import { pythonCheatsheet } from "./python";
import { sqlCheatsheet } from "./sql";
import { gitCheatsheet } from "./git";

export const CHEATSHEETS: CheatSheet[] = [
  htmlCheatsheet,
  cssCheatsheet,
  javascriptCheatsheet,
  pythonCheatsheet,
  sqlCheatsheet,
  gitCheatsheet,
];

export function getCheatsheet(slug: string): CheatSheet | undefined {
  return CHEATSHEETS.find((c) => c.slug === slug);
}

export type { CheatSheet } from "./types";
