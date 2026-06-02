import type { CheatSheet } from "./types";

export const gitCheatsheet: CheatSheet = {
  slug: "git",
  title: "Git Cheat Sheet",
  language: "Git",
  emoji: "🔧",
  description:
    "A quick-reference Git cheat sheet covering the everyday commands: commit, branch, merge, push, pull, stash, and undo.",
  keywords: [
    "git cheat sheet",
    "git commands",
    "git reference",
    "common git commands",
  ],
  sections: [
    {
      title: "Setup & Config",
      items: [
        { code: "git init", desc: "Create a new empty Git repository in the current directory." },
        { code: "git clone <url>", desc: "Copy a remote repository, including its full history, to your machine." },
        { code: 'git config --global user.name "Your Name"', desc: "Set the author name used on all your commits." },
        { code: 'git config --global user.email "you@example.com"', desc: "Set the author email used on all your commits." },
        { code: "git config --list", desc: "Show all current Git configuration values." },
      ],
    },
    {
      title: "Staging & Committing",
      items: [
        { code: "git status", desc: "Show staged, unstaged, and untracked files." },
        { code: "git add <file>", desc: "Stage a specific file for the next commit." },
        { code: "git add .", desc: "Stage all changes in the current directory and below." },
        { code: 'git commit -m "message"', desc: "Commit the staged changes with a message." },
        { code: 'git commit -am "message"', desc: "Stage all tracked, modified files and commit in one step (skips new files)." },
      ],
    },
    {
      title: "Branching & Merging",
      items: [
        { code: "git branch", desc: "List local branches; the current one is marked with an asterisk." },
        { code: "git branch <name>", desc: "Create a new branch without switching to it." },
        { code: "git checkout -b <name>", desc: "Create a new branch and switch to it." },
        { code: "git switch <name>", desc: "Switch to an existing branch (modern alternative to checkout)." },
        { code: "git merge <name>", desc: "Merge the named branch into the current branch." },
        { code: "git branch -d <name>", desc: "Delete a branch that has already been merged." },
      ],
    },
    {
      title: "Remotes",
      items: [
        { code: "git remote -v", desc: "List configured remote repositories and their URLs." },
        { code: "git push", desc: "Upload local commits to the tracked remote branch." },
        { code: "git push -u origin <branch>", desc: "Push a branch and set it to track origin for future pushes." },
        { code: "git pull", desc: "Fetch changes from the remote and merge them into the current branch." },
        { code: "git fetch", desc: "Download remote changes without merging them into your work." },
      ],
    },
    {
      title: "Inspecting History",
      items: [
        { code: "git log --oneline", desc: "Show commit history as a compact one-line-per-commit list." },
        { code: "git diff", desc: "Show unstaged changes compared to the last commit." },
        { code: "git diff --staged", desc: "Show changes that are staged for the next commit." },
        { code: "git show <commit>", desc: "Show the details and diff of a specific commit." },
        { code: "git blame <file>", desc: "Show who last changed each line of a file and when." },
      ],
    },
    {
      title: "Undoing Changes",
      items: [
        { code: "git restore <file>", desc: "Discard unstaged changes in a file (working tree changes are lost)." },
        { code: "git restore --staged <file>", desc: "Unstage a file while keeping its changes in the working tree." },
        { code: "git reset --soft <commit>", desc: "Move HEAD back but keep changes staged." },
        { code: "git reset --hard <commit>", desc: "Reset to a commit and discard all changes — destructive, work is lost." },
        { code: "git revert <commit>", desc: "Create a new commit that undoes a previous commit (safe for shared history)." },
        { code: "git checkout -- <file>", desc: "Discard local changes to a file (older syntax; changes are lost)." },
      ],
    },
    {
      title: "Stashing",
      items: [
        { code: "git stash", desc: "Temporarily shelve uncommitted changes and clean the working tree." },
        { code: 'git stash push -m "message"', desc: "Stash changes with a descriptive label." },
        { code: "git stash list", desc: "List all stashed change sets." },
        { code: "git stash pop", desc: "Reapply the most recent stash and remove it from the list." },
        { code: "git stash drop", desc: "Delete the most recent stash without applying it." },
      ],
    },
    {
      title: "Tags",
      items: [
        { code: "git tag", desc: "List all tags in the repository." },
        { code: "git tag <name>", desc: "Create a lightweight tag pointing at the current commit." },
        { code: 'git tag -a <name> -m "message"', desc: "Create an annotated tag with a message and metadata." },
        { code: "git push origin <name>", desc: "Push a single tag to the remote." },
        { code: "git push --tags", desc: "Push all local tags to the remote." },
      ],
    },
    {
      title: "Useful Extras",
      items: [
        { code: ".gitignore", desc: "List file patterns Git should never track, one per line." },
        { code: "git cherry-pick <commit>", desc: "Apply a single commit from another branch onto the current one." },
        { code: "git rebase <branch>", desc: "Reapply your commits on top of another branch for a linear history." },
        { code: "git rebase -i <commit>", desc: "Interactively reorder, squash, or edit commits — avoid on shared history." },
        { code: "git reflog", desc: "Show a log of where HEAD has been, useful for recovering lost commits." },
      ],
    },
  ],
};
