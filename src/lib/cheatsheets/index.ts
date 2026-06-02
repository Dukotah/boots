import type { CheatSheet } from "./types";
import { javascriptCheatsheet } from "./javascript";
import { pythonCheatsheet } from "./python";
import { sqlCheatsheet } from "./sql";

export const CHEATSHEETS: CheatSheet[] = [
  javascriptCheatsheet,
  pythonCheatsheet,
  sqlCheatsheet,
];

export function getCheatsheet(slug: string): CheatSheet | undefined {
  return CHEATSHEETS.find((c) => c.slug === slug);
}

export type { CheatSheet } from "./types";
