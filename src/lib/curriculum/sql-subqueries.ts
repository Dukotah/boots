import type { Module } from "./types";

// SQL Subqueries — queries inside queries: scalar, correlated, and derived
// tables. Runs in-browser via sql.js; graded by result-set comparison.
const EMPLOYEES = `
CREATE TABLE employees (id INTEGER, name TEXT, dept TEXT, salary INTEGER);
INSERT INTO employees VALUES (1, 'Ada', 'Eng',   120);
INSERT INTO employees VALUES (2, 'Sam', 'Eng',    90);
INSERT INTO employees VALUES (3, 'Lee', 'Sales',  80);
INSERT INTO employees VALUES (4, 'Kim', 'Sales', 110);
INSERT INTO employees VALUES (5, 'Jo',  'Eng',   100);
`;

export const sqlSubqueries: Module = {
  slug: "sql-subqueries",
  title: "SQL Subqueries",
  description:
    "Queries inside queries. Use scalar subqueries to compare against an aggregate, correlated subqueries for per-group logic, and derived tables to query a result.",
  emoji: "🔍",
  gradient: "from-orange-400/20 to-rose-500/10",
  language: "sql",
  tagline:
    "Learn SQL subqueries: scalar subqueries, IN, correlated subqueries, and derived tables (subquery in FROM).",
  keywords: ["sql subquery", "correlated subquery", "sql nested query", "sql derived table"],
  lessons: [
    {
      slug: "above-average",
      title: "Scalar Subquery",
      blurb: "Compare against an aggregate.",
      xp: 45,
      setup: EMPLOYEES,
      content: `# Scalar Subquery

A subquery in \`WHERE\` can return a single value to compare against:

\`\`\`sql
SELECT name FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);
\`\`\`

The \`employees\` table has: \`id\`, \`name\`, \`dept\`, \`salary\`.

## Your task
Return the \`name\` of every employee who earns **more than the company average**
salary.`,
      starterCode: `-- Employees earning above the company average
`,
      solution: `SELECT name FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);`,
      tests: [{ name: "Returns above-average earners", code: "" }],
    },
    {
      slug: "equals-max",
      title: "Top Earner",
      blurb: "Match the maximum.",
      xp: 45,
      setup: EMPLOYEES,
      content: `# Top Earner

Use a scalar subquery to find rows matching an aggregate exactly:

\`\`\`sql
SELECT name FROM employees
WHERE salary = (SELECT MAX(salary) FROM employees);
\`\`\`

## Your task
Return the \`name\` of the employee with the highest salary.`,
      starterCode: `-- The highest-paid employee
`,
      solution: `SELECT name FROM employees WHERE salary = (SELECT MAX(salary) FROM employees);`,
      tests: [{ name: "Returns the top earner", code: "" }],
    },
    {
      slug: "in-subquery",
      title: "IN a Subquery",
      blurb: "Filter by a set of values.",
      xp: 50,
      setup: EMPLOYEES,
      content: `# IN a Subquery

A subquery can return a **list** of values for \`IN\`:

\`\`\`sql
SELECT name FROM employees
WHERE dept IN (SELECT dept FROM employees WHERE salary >= 110);
\`\`\`

## Your task
Return the \`name\` of every employee who works in a department that has at least
one employee earning \`110\` or more.`,
      starterCode: `-- Employees in departments that have a 110+ earner
`,
      solution: `SELECT name FROM employees WHERE dept IN (SELECT dept FROM employees WHERE salary >= 110);`,
      tests: [{ name: "Returns employees in high-earning depts", code: "" }],
    },
    {
      slug: "derived-table",
      title: "Derived Table",
      blurb: "Query a subquery's result.",
      xp: 55,
      setup: EMPLOYEES,
      content: `# Derived Table

A subquery in \`FROM\` acts like a temporary table you can query:

\`\`\`sql
SELECT MAX(total) FROM (
  SELECT dept, SUM(salary) AS total FROM employees GROUP BY dept
);
\`\`\`

## Your task
Find the largest **department total salary**. Group by \`dept\` to get each
department's total, then return the maximum of those totals.`,
      starterCode: `-- The biggest department-wide salary total
`,
      solution: `SELECT MAX(total) FROM (SELECT dept, SUM(salary) AS total FROM employees GROUP BY dept);`,
      tests: [{ name: "Returns the largest department total", code: "" }],
    },
  ],
};
