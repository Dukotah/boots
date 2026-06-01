import type { Module } from "./types";

// Git & GitHub — version-control concepts taught through small, gradeable JS
// exercises (commands, status parsing, remotes), all auto-graded in the browser.
export const gitGithub: Module = {
  slug: "git-github",
  title: "Git & GitHub",
  description:
    "Version control is non-negotiable for every developer. Learn the core Git workflow — staging, commits, branches, and remotes — through hands-on exercises.",
  emoji: "🌳",
  gradient: "from-orange-400/20 to-amber-500/10",
  tagline:
    "Learn Git and GitHub: staging, commits, branches, logs, and remotes — the version-control workflow every developer needs.",
  keywords: ["learn git", "github tutorial", "git commit", "git branches"],
  lessons: [
    {
      slug: "commit-command",
      title: "Making a Commit",
      blurb: "Build a git commit command.",
      xp: 30,
      content: `# Making a Commit

A **commit** saves a snapshot of your staged changes with a message. The command:

\`\`\`bash
git commit -m "your message"
\`\`\`

## Your task
Write \`commitCommand(message)\` that returns the full commit command string with
the message wrapped in double quotes — e.g. \`commitCommand("init")\` →
\`git commit -m "init"\`.`,
      starterCode: `function commitCommand(message) {
  // return: git commit -m "message"
}
`,
      solution: `function commitCommand(message) {
  return 'git commit -m "' + message + '"';
}`,
      tests: [
        { name: '"init"', code: `assertEquals(commitCommand("init"), 'git commit -m "init"');` },
        { name: '"fix bug"', code: `assertEquals(commitCommand("fix bug"), 'git commit -m "fix bug"');` },
      ],
    },
    {
      slug: "staged-files",
      title: "Reading git status",
      blurb: "Which files are staged?",
      xp: 35,
      content: `# Reading git status

\`git status\` shows which files are **staged** (ready to commit) vs unstaged.
Here each file is an object \`{ file, staged }\`.

## Your task
Write \`stagedFiles(files)\` that returns an array of just the file names where
\`staged\` is \`true\`, in order.`,
      starterCode: `function stagedFiles(files) {
  // return the names of the staged files
}
`,
      solution: `function stagedFiles(files) {
  return files.filter((f) => f.staged).map((f) => f.file);
}`,
      tests: [
        {
          name: "returns staged names",
          code: `assertEquals(stagedFiles([{ file: "a.js", staged: true }, { file: "b.js", staged: false }, { file: "c.js", staged: true }]), ["a.js", "c.js"]);`,
        },
        { name: "none staged → []", code: `assertEquals(stagedFiles([{ file: "x", staged: false }]), []);` },
      ],
    },
    {
      slug: "valid-branch",
      title: "Valid Branch Names",
      blurb: "Branches can't contain spaces.",
      xp: 30,
      content: `# Valid Branch Names

Git branch names can't be empty and can't contain spaces (use \`-\` or \`/\`
instead, like \`feature/login\`).

## Your task
Write \`isValidBranch(name)\` that returns \`true\` only if \`name\` is non-empty and
contains no spaces.`,
      starterCode: `function isValidBranch(name) {
  // non-empty and no spaces
}
`,
      solution: `function isValidBranch(name) {
  return name.length > 0 && !name.includes(" ");
}`,
      tests: [
        { name: '"feature/login" → true', code: `assertEquals(isValidBranch("feature/login"), true);` },
        { name: '"my branch" → false', code: `assertEquals(isValidBranch("my branch"), false);` },
        { name: "empty → false", code: `assertEquals(isValidBranch(""), false);` },
      ],
    },
    {
      slug: "latest-commit",
      title: "Reading the Log",
      blurb: "Find the most recent commit.",
      xp: 35,
      content: `# Reading the Log

\`git log\` lists commits oldest-to-newest in our array. The **latest** commit is
the last element.

## Your task
Write \`latestCommit(commits)\` that returns the \`message\` of the last commit, or
\`null\` if there are no commits.`,
      starterCode: `function latestCommit(commits) {
  // return the last commit's message, or null
}
`,
      solution: `function latestCommit(commits) {
  if (commits.length === 0) return null;
  return commits[commits.length - 1].message;
}`,
      tests: [
        {
          name: "returns last message",
          code: `assertEquals(latestCommit([{ message: "init" }, { message: "add feature" }]), "add feature");`,
        },
        { name: "empty → null", code: `assertEquals(latestCommit([]), null);` },
      ],
    },
    {
      slug: "remote-url",
      title: "GitHub Remotes",
      blurb: "Build a repo's clone URL.",
      xp: 30,
      content: `# GitHub Remotes

A **remote** is a hosted copy of your repo (e.g. on GitHub). Its HTTPS clone URL
looks like:

\`\`\`
https://github.com/<user>/<repo>.git
\`\`\`

## Your task
Write \`remoteUrl(user, repo)\` that returns the GitHub HTTPS clone URL — e.g.
\`remoteUrl("dukotah", "boots")\` → \`https://github.com/dukotah/boots.git\`.`,
      starterCode: `function remoteUrl(user, repo) {
  // return https://github.com/user/repo.git
}
`,
      solution: `function remoteUrl(user, repo) {
  return "https://github.com/" + user + "/" + repo + ".git";
}`,
      tests: [
        {
          name: "builds the URL",
          code: `assertEquals(remoteUrl("dukotah", "boots"), "https://github.com/dukotah/boots.git");`,
        },
        {
          name: "works for any repo",
          code: `assertEquals(remoteUrl("torvalds", "linux"), "https://github.com/torvalds/linux.git");`,
        },
      ],
    },
  ],
};
