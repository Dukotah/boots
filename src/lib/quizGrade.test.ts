import { describe, it, expect } from "vitest";
import { gradeQuiz } from "./quizGrade";
import type { QuizQuestion } from "@/lib/curriculum/types";

const q = (answer: number): QuizQuestion => ({
  prompt: "?",
  options: ["a", "b", "c"],
  answer,
});

describe("gradeQuiz", () => {
  const questions = [q(0), q(2), q(1)];

  it("passes only when every answer matches the key", () => {
    expect(gradeQuiz(questions, [0, 2, 1])).toEqual({ valid: true, allPass: true });
  });

  it("fails when any answer is wrong", () => {
    expect(gradeQuiz(questions, [0, 2, 0])).toEqual({ valid: true, allPass: false });
  });

  it("rejects a submission whose length doesn't match the question count", () => {
    expect(gradeQuiz(questions, [0, 2])).toEqual({ valid: false });
  });

  it("rejects non-array submissions", () => {
    expect(gradeQuiz(questions, "0,2,1")).toEqual({ valid: false });
    expect(gradeQuiz(questions, null)).toEqual({ valid: false });
  });

  it("rejects submissions containing non-numbers", () => {
    expect(gradeQuiz(questions, [0, "2", 1])).toEqual({ valid: false });
  });

  it("never passes an empty question set (nothing to prove)", () => {
    expect(gradeQuiz([], [])).toEqual({ valid: true, allPass: false });
  });
});
