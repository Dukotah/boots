import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TestResults } from "./TestResults";
import type { TestResult } from "@/workers/codeRunner";

const pass = (name: string): TestResult => ({ name, pass: true, logs: [] });
const fail = (name: string, error: string): TestResult => ({
  name,
  pass: false,
  error,
  logs: [],
});

describe("TestResults", () => {
  it("prompts to run when hasRun is false", () => {
    render(<TestResults results={[]} hasRun={false} />);
    expect(screen.getByText(/Run your code to see test results/i)).toBeInTheDocument();
  });

  it("shows the passing count when all tests pass", () => {
    render(
      <TestResults results={[pass("adds"), pass("subtracts")]} hasRun />,
    );
    // Both test names render.
    expect(screen.getByText("adds")).toBeInTheDocument();
    expect(screen.getByText("subtracts")).toBeInTheDocument();
  });

  it("renders an expected-vs-actual diff for a structured assertion failure", () => {
    render(
      <TestResults
        results={[fail("adds", "Expected 5 but got 4")]}
        hasRun
      />,
    );
    expect(screen.getByText("5")).toBeInTheDocument(); // expected
    expect(screen.getByText("4")).toBeInTheDocument(); // actual
  });

  it("falls back to the raw error when it isn't an expected/actual shape", () => {
    render(
      <TestResults
        results={[fail("boom", "ReferenceError: x is not defined")]}
        hasRun
      />,
    );
    expect(
      screen.getByText(/ReferenceError: x is not defined/),
    ).toBeInTheDocument();
  });
});
