import type { CheatSheet } from "./types";

export const sqlCheatsheet: CheatSheet = {
  slug: "sql",
  title: "SQL Cheat Sheet",
  language: "SQL",
  emoji: "🗄️",
  description:
    "A quick-reference SQL cheat sheet covering SELECT, WHERE, JOINs, GROUP BY, aggregates, and more.",
  keywords: [
    "sql cheat sheet",
    "sql cheatsheet",
    "sql syntax reference",
    "sql query examples",
  ],
  sections: [
    {
      title: "Querying",
      items: [
        { code: "SELECT * FROM users;", desc: "Select every column from a table." },
        { code: "SELECT name, age FROM users;", desc: "Select only specific columns." },
        {
          code: "SELECT name AS full_name FROM users;",
          desc: "Rename a column in the output using an alias.",
        },
        {
          code: "SELECT DISTINCT country FROM users;",
          desc: "Return only unique values for a column.",
        },
        {
          code: "SELECT * FROM users LIMIT 10;",
          desc: "Return at most the first 10 rows.",
        },
        {
          code: "SELECT * FROM users LIMIT 10 OFFSET 20;",
          desc: "Skip 20 rows, then return the next 10 (pagination).",
        },
      ],
    },
    {
      title: "Filtering",
      items: [
        {
          code: "SELECT * FROM users WHERE age > 18;",
          desc: "Keep only rows matching a condition.",
        },
        {
          code: "SELECT * FROM users WHERE age >= 18 AND country = 'US';",
          desc: "Combine conditions that must all be true.",
        },
        {
          code: "SELECT * FROM users WHERE country = 'US' OR country = 'UK';",
          desc: "Match rows where either condition is true.",
        },
        {
          code: "SELECT * FROM users WHERE country IN ('US', 'UK', 'CA');",
          desc: "Match any value in a list.",
        },
        {
          code: "SELECT * FROM users WHERE age BETWEEN 18 AND 65;",
          desc: "Match values within an inclusive range.",
        },
        {
          code: "SELECT * FROM users WHERE name LIKE 'A%';",
          desc: "Pattern match; % is any string, _ is one character.",
        },
        {
          code: "SELECT * FROM users WHERE email IS NULL;",
          desc: "Match rows where a value is missing.",
        },
        {
          code: "SELECT * FROM users WHERE email IS NOT NULL;",
          desc: "Match rows where a value is present.",
        },
      ],
    },
    {
      title: "Sorting",
      items: [
        {
          code: "SELECT * FROM users ORDER BY age;",
          desc: "Sort rows in ascending order (default).",
        },
        {
          code: "SELECT * FROM users ORDER BY age DESC;",
          desc: "Sort rows in descending order.",
        },
        {
          code: "SELECT * FROM users ORDER BY country, age DESC;",
          desc: "Sort by multiple columns in priority order.",
        },
        {
          code: "SELECT * FROM users ORDER BY age DESC LIMIT 5;",
          desc: "Get the top 5 rows by a sorted column.",
        },
      ],
    },
    {
      title: "Aggregates",
      items: [
        { code: "SELECT COUNT(*) FROM users;", desc: "Count the number of rows." },
        {
          code: "SELECT COUNT(DISTINCT country) FROM users;",
          desc: "Count distinct non-null values.",
        },
        { code: "SELECT SUM(amount) FROM orders;", desc: "Add up all values in a column." },
        { code: "SELECT AVG(age) FROM users;", desc: "Compute the average of a column." },
        { code: "SELECT MIN(price) FROM products;", desc: "Find the smallest value." },
        { code: "SELECT MAX(price) FROM products;", desc: "Find the largest value." },
      ],
    },
    {
      title: "Grouping",
      items: [
        {
          code: "SELECT country, COUNT(*) FROM users GROUP BY country;",
          desc: "Aggregate rows into groups by a column.",
        },
        {
          code: "SELECT country, AVG(age) FROM users GROUP BY country;",
          desc: "Apply an aggregate per group.",
        },
        {
          code: "SELECT country, COUNT(*) FROM users GROUP BY country HAVING COUNT(*) > 100;",
          desc: "Filter groups after aggregation with HAVING.",
        },
        {
          code: "SELECT country, COUNT(*) AS n FROM users GROUP BY country ORDER BY n DESC;",
          desc: "Group, then sort by the aggregate result.",
        },
      ],
    },
    {
      title: "Joins",
      items: [
        {
          code: "SELECT * FROM orders JOIN users ON orders.user_id = users.id;",
          desc: "Inner join: rows with matches in both tables.",
        },
        {
          code: "SELECT * FROM users LEFT JOIN orders ON users.id = orders.user_id;",
          desc: "Left join: all left rows, matched right rows or NULLs.",
        },
        {
          code: "SELECT * FROM orders RIGHT JOIN users ON orders.user_id = users.id;",
          desc: "Right join: all right rows, matched left rows or NULLs.",
        },
        {
          code: "SELECT u.name, o.total FROM users u JOIN orders o ON u.id = o.user_id;",
          desc: "Use table aliases to keep joins readable.",
        },
        {
          code: "SELECT * FROM a CROSS JOIN b;",
          desc: "Cross join: every combination of rows.",
        },
      ],
    },
    {
      title: "Modifying Data",
      items: [
        {
          code: "INSERT INTO users (name, age) VALUES ('Ada', 36);",
          desc: "Insert a single new row.",
        },
        {
          code: "INSERT INTO users (name, age) VALUES ('Ada', 36), ('Grace', 40);",
          desc: "Insert multiple rows at once.",
        },
        {
          code: "UPDATE users SET age = 37 WHERE name = 'Ada';",
          desc: "Update matching rows; always use WHERE.",
        },
        {
          code: "DELETE FROM users WHERE id = 5;",
          desc: "Delete matching rows.",
        },
        {
          code: "DELETE FROM users;",
          desc: "Delete all rows in a table (no WHERE).",
        },
      ],
    },
    {
      title: "Tables",
      items: [
        {
          code: "CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT NOT NULL, age INTEGER);",
          desc: "Create a table with column definitions.",
        },
        {
          code: "CREATE TABLE IF NOT EXISTS logs (msg TEXT);",
          desc: "Create a table only if it does not already exist.",
        },
        {
          code: "ALTER TABLE users ADD COLUMN email TEXT;",
          desc: "Add a new column to an existing table.",
        },
        {
          code: "CREATE INDEX idx_users_name ON users (name);",
          desc: "Create an index to speed up lookups.",
        },
        {
          code: "DROP TABLE users;",
          desc: "Delete a table and all its data.",
        },
        {
          code: "DROP TABLE IF EXISTS users;",
          desc: "Drop a table only if it exists.",
        },
      ],
    },
  ],
};
