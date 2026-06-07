import type { Module } from "./types";

// Command Line & Terminal Basics — a conceptual/practical all-quiz module
// for learners who have never used a terminal, taking them from "what is this
// black window?" to confident everyday use of the command line on any platform.
export const terminalBasics: Module = {
  slug: "terminal-basics",
  title: "Command Line & Terminal Basics",
  description:
    "Demystify the terminal: understand what it is, how the file system works, navigate and manage files without a mouse, run programs, chain commands, and handle permissions — all the skills you need to feel at home on any command line in 2026.",
  emoji: "⌨️",
  gradient: "from-slate-500/20 to-zinc-500/10",
  tagline:
    "Go from 'what is that black window?' to confidently navigating, managing files, and running programs in a terminal on any OS.",
  keywords: [
    "command line basics",
    "terminal for beginners",
    "how to use terminal",
    "bash commands",
    "command line tutorial",
    "terminal navigation",
    "shell commands",
    "learn terminal",
    "command prompt basics",
    "linux command line",
  ],
  lessons: [
    {
      slug: "what-is-a-terminal",
      title: "What Is a Terminal?",
      blurb: "Understand what the terminal is, why it exists, and why developers reach for it daily.",
      xp: 20,
      kind: "quiz",
      content: `# What Is a Terminal?

A **terminal** (also called a *command line*, *shell*, or *console*) is a
text-based interface to your computer. Instead of clicking icons, you type
instructions and read replies — all in plain text.

Under the hood, the terminal runs a **shell**: a program that reads your typed
commands, asks the operating system to carry them out, and prints the result.
The most common shells in 2026 are:

- **Bash** — the default on most Linux distributions and macOS (before Catalina).
- **Zsh** — the default on macOS Catalina and later; Bash-compatible with extras.
- **PowerShell** — the default on Windows; cross-platform since version 7.
- **Fish** — a friendlier alternative with better autocomplete, popular on Linux
  and macOS desktops.

**Why bother?** GUIs are great for things you do occasionally. The terminal is
faster for things you do repeatedly — renaming 500 files, starting a server,
searching a million-line log, automating a daily backup. Once you're comfortable
here, you can also control remote servers and developer tools that have no GUI.

The terminal isn't going away; if anything, cloud, DevOps, and AI tooling in
2026 lean on it more than ever. Think of it as the steering wheel under the hood
of your computer.`,
      questions: [
        {
          prompt: "What does a 'shell' do?",
          options: [
            "It renders the graphical windows and icons on your desktop",
            "It reads your typed commands, asks the OS to execute them, and returns output",
            "It compiles source code into an executable binary",
          ],
          answer: 1,
          explanation:
            "The shell is the interpreter between you and the operating system: you type a command, the shell passes it to the OS, the OS does the work, and the shell prints the result.",
        },
        {
          prompt: "Which shell is the default on macOS Catalina and later?",
          options: [
            "Bash",
            "PowerShell",
            "Zsh",
          ],
          answer: 2,
          explanation:
            "Apple switched the default from Bash to Zsh starting with macOS Catalina (10.15). Zsh is Bash-compatible but adds smarter tab completion, themes, and plugins.",
        },
        {
          prompt: "Why do developers prefer the terminal for many tasks over a GUI?",
          options: [
            "GUIs are illegal on servers",
            "The terminal is faster and scriptable for repetitive tasks — renaming files, starting servers, automating backups",
            "Terminals use less battery than clicking",
          ],
          answer: 1,
          explanation:
            "Speed and automation are the core advantage. One command can rename 10,000 files; doing that by hand in a GUI would take hours. Scripting compounds the benefit.",
        },
      ],
      explanation:
        "The terminal is a text interface to your OS via a shell. It's faster for repetitive work and essential for servers, DevOps, and developer tooling — a foundational skill worth the investment.",
    },
    {
      slug: "file-system-and-paths",
      title: "File System & Paths",
      blurb: "Learn how files and folders are organised and how to describe any location with a path.",
      xp: 20,
      kind: "quiz",
      content: `# File System & Paths

Every file on your computer lives at a specific **path** — an address that
describes where to find it in the directory tree.

## The directory tree

The file system is a tree. At the top is the **root**:

- On Linux/macOS: \`/\` (a single forward slash).
- On Windows: a drive letter like \`C:\\\`.

Everything else — folders, files, more folders — branches from that root.

## Absolute vs relative paths

An **absolute path** starts from the root and is unambiguous regardless of
where you currently are:

- Linux/macOS: \`/home/alice/projects/app/index.js\`
- Windows: \`C:\\Users\\Alice\\projects\\app\\index.js\`

A **relative path** is relative to your current location (your **working
directory**):

- \`projects/app/index.js\` — go into \`projects\`, then \`app\`, then the file.
- \`../config.json\` — go *up* one level (\`..\ means parent), then the file.
- \`./notes.txt\` — \`.\` means "here" (the current directory).

## Special shorthand

- \`~\` — your home directory (\`/home/alice\` or \`C:\\Users\\Alice\`).
- \`..\` — the parent directory.
- \`.\` — the current directory.

Knowing the difference between absolute and relative paths is the single most
important foundation for working in a terminal without getting lost.`,
      questions: [
        {
          prompt: "What does `..` mean in a file path?",
          options: [
            "The root of the file system",
            "The parent directory (one level up)",
            "A hidden file",
          ],
          answer: 1,
          explanation:
            "`..` always means 'go up one directory.' So `../../config.json` means 'go up two levels, then find config.json.' It works the same on Linux, macOS, and Windows shells.",
        },
        {
          prompt: "Which of the following is an absolute path on Linux or macOS?",
          options: [
            "projects/app/index.js",
            "../config.json",
            "/home/alice/projects/app/index.js",
          ],
          answer: 2,
          explanation:
            "An absolute path starts from the root (`/` on Unix-like systems). The other two are relative paths — they depend on where you currently are in the tree.",
        },
        {
          prompt: "What does the `~` shorthand expand to in a terminal?",
          options: [
            "The root of the file system (`/`)",
            "Your home directory (e.g. `/home/alice` or `C:\\Users\\Alice`)",
            "The current working directory",
          ],
          answer: 1,
          explanation:
            "`~` is a shell shorthand for your home directory. `cd ~` always takes you home regardless of where you are, and `~/Downloads` is a portable way to reference your Downloads folder.",
        },
      ],
      explanation:
        "The file system is a tree rooted at `/` (or a drive letter on Windows). Absolute paths start from the root; relative paths start from where you are. `..` goes up, `.` stays here, `~` goes home.",
    },
    {
      slug: "navigating-directories",
      title: "Navigating Directories",
      blurb: "Master `pwd`, `ls`, and `cd` — the three commands you'll use every single session.",
      xp: 20,
      kind: "quiz",
      content: `# Navigating Directories

Three commands handle nearly all navigation:

## pwd — where am I?

\`pwd\` (print working directory) tells you your current location. Run it whenever
you're lost:

\`\`\`
$ pwd
/home/alice/projects
\`\`\`

## ls — what's here?

\`ls\` lists the contents of a directory. Useful flags:

- \`ls -l\` — long format (permissions, size, date).
- \`ls -a\` — show *all* files, including hidden ones (names starting with \`.\`).
- \`ls -lh\` — long format with human-readable sizes (KB, MB, GB).

On Windows PowerShell, the equivalent is \`Get-ChildItem\` (aliased as \`ls\` or \`dir\`).

## cd — change directory

\`cd\` moves you to another directory:

- \`cd projects\` — go into \`projects\` (relative).
- \`cd /var/log\` — go to an absolute path.
- \`cd ..\` — go up one level.
- \`cd ~\` — go home.
- \`cd -\` — go back to the *previous* directory (like a Back button — very handy).

## Tab completion

Press **Tab** after typing the start of a path and the shell auto-completes it.
If there's more than one match, press Tab twice to see the options. This is not
optional — every experienced terminal user uses Tab constantly to avoid typos and
speed up navigation.`,
      questions: [
        {
          prompt: "You're lost in a deep directory tree. Which command instantly tells you your current location?",
          options: [
            "ls",
            "pwd",
            "cd",
          ],
          answer: 1,
          explanation:
            "`pwd` (print working directory) prints the full absolute path of wherever you are right now. It's the 'you are here' marker on the map.",
        },
        {
          prompt: "What does `cd -` do?",
          options: [
            "Deletes the current directory",
            "Takes you to the root directory",
            "Returns you to the previous directory you were in — like a browser Back button",
          ],
          answer: 2,
          explanation:
            "`cd -` is one of the most underrated shortcuts. It swaps between your current and previous directories, which is great when you're working across two locations.",
        },
        {
          prompt: "Which `ls` flag shows hidden files (files whose names start with a dot)?",
          options: [
            "ls -l",
            "ls -a",
            "ls -h",
          ],
          answer: 1,
          explanation:
            "`ls -a` includes all entries, including hidden ones. On Unix-like systems, a file or folder whose name starts with `.` is hidden from regular `ls` by convention — configuration files like `.gitignore` live here.",
        },
      ],
      explanation:
        "`pwd` shows where you are, `ls` shows what's around you, and `cd` moves you. Add Tab completion for speed and `cd -` to bounce back, and you can navigate any file system confidently.",
    },
    {
      slug: "creating-and-managing-files",
      title: "Creating & Managing Files",
      blurb: "Create, copy, move, rename, and delete files and directories from the command line.",
      xp: 22,
      kind: "quiz",
      content: `# Creating & Managing Files

Once you can navigate, you need to create and organise files.

## Creating files and directories

- \`touch filename.txt\` — create an empty file (or update its timestamp if it
  already exists). Available on Linux/macOS; on Windows, use \`New-Item filename.txt\`.
- \`mkdir foldername\` — make a new directory.
- \`mkdir -p a/b/c\` — make nested directories in one shot (the \`-p\` flag creates
  parents as needed).

## Copying

- \`cp source.txt dest.txt\` — copy a file.
- \`cp -r source/ dest/\` — copy a directory and everything inside it (\`-r\` for
  recursive).

## Moving and renaming

\`mv\` does double duty — it moves *and* renames (they're the same operation):

- \`mv old.txt new.txt\` — rename a file.
- \`mv file.txt ~/Documents/\` — move a file to another directory.

## Deleting

- \`rm file.txt\` — delete a file. **There is no Recycle Bin.** It's gone.
- \`rm -r folder/\` — delete a directory and all its contents. Use carefully.
- \`rm -i file.txt\` — interactive mode: asks "are you sure?" before each deletion.
  A good habit for anything important.

## The golden rule

\`rm\` is permanent and instant. Before you run \`rm -r\`, make absolutely sure
you're deleting the right thing. A typo in the wrong place can wipe out hours of
work. When in doubt, move to a temp folder first instead of deleting immediately.`,
      questions: [
        {
          prompt: "Which command creates the nested directory structure `projects/app/src` in one step, even if `projects` doesn't exist yet?",
          options: [
            "mkdir projects/app/src",
            "mkdir -p projects/app/src",
            "touch projects/app/src",
          ],
          answer: 1,
          explanation:
            "`mkdir -p` creates all intermediate directories as needed. Without `-p`, `mkdir projects/app/src` would fail if `projects` or `projects/app` don't already exist.",
        },
        {
          prompt: "You want to rename `report_draft.txt` to `report_final.txt`. Which command does this?",
          options: [
            "cp report_draft.txt report_final.txt",
            "mv report_draft.txt report_final.txt",
            "rename report_draft.txt report_final.txt",
          ],
          answer: 1,
          explanation:
            "`mv` is used for both moving and renaming on Unix-like systems. Renaming is just moving a file to the same directory with a new name.",
        },
        {
          prompt: "After running `rm important.txt`, what is the quickest way to get the file back?",
          options: [
            "Check the Recycle Bin / Trash",
            "Run `undo` in the terminal",
            "There is no automatic recovery — `rm` permanently deletes the file",
          ],
          answer: 2,
          explanation:
            "`rm` bypasses the Recycle Bin entirely and there's no `undo`. That's why careful double-checking (or `rm -i` for interactive confirmation) before deleting is a critical habit.",
        },
      ],
      explanation:
        "`touch` and `mkdir` create; `cp` copies; `mv` moves and renames; `rm` permanently deletes. The key habit: verify before you delete, because `rm` has no undo.",
    },
    {
      slug: "reading-and-searching-files",
      title: "Reading & Searching Files",
      blurb: "View file contents, search for text, and find files without opening a GUI.",
      xp: 22,
      kind: "quiz",
      content: `# Reading & Searching Files

You don't always need a text editor. Several commands let you read and search
files straight from the terminal.

## Viewing file contents

- \`cat file.txt\` — print the whole file to the screen. Great for small files.
- \`less file.txt\` — open a scrollable viewer. Press **q** to quit, **/** to search,
  **n** to find the next match. The gold standard for reading logs.
- \`head -n 20 file.txt\` — print the first 20 lines.
- \`tail -n 20 file.txt\` — print the last 20 lines.
- \`tail -f logfile.log\` — *follow* a file live as new lines are appended — a
  daily tool for watching server logs in real time.

## Searching inside files with grep

\`grep\` searches file contents for a pattern:

\`\`\`
grep "error" app.log          # find lines containing "error"
grep -i "error" app.log       # case-insensitive
grep -r "TODO" ./src/         # search recursively through a directory
grep -n "error" app.log       # show line numbers
\`\`\`

## Finding files with find

\`find\` locates files by name, type, size, or date:

\`\`\`
find . -name "*.json"          # all JSON files under here
find /var/log -name "*.log" -mtime -1  # log files modified in the last day
\`\`\`

On Windows PowerShell, \`Select-String\` is the \`grep\` equivalent, and
\`Get-ChildItem -Recurse\` replaces \`find\`.`,
      questions: [
        {
          prompt: "You're watching a server that writes to `server.log` in real time. Which command streams new lines as they appear?",
          options: [
            "cat server.log",
            "tail -f server.log",
            "less server.log",
          ],
          answer: 1,
          explanation:
            "`tail -f` (follow) keeps the file open and prints each new line as it's written. It's the standard way to watch live logs — press Ctrl+C to stop.",
        },
        {
          prompt: "Which command searches all files under `./src/` for the text 'TODO', including in subdirectories?",
          options: [
            "grep 'TODO' ./src/main.js",
            "grep -r 'TODO' ./src/",
            "find ./src/ -name 'TODO'",
          ],
          answer: 1,
          explanation:
            "`grep -r` (recursive) walks the entire directory tree below the given path and searches every file. Without `-r`, grep only searches files you name explicitly.",
        },
        {
          prompt: "A file is thousands of lines long. Which command is best for scrollably reading it in the terminal?",
          options: [
            "cat bigfile.txt — it prints everything at once",
            "less bigfile.txt — it's a scrollable pager you can search and quit",
            "head bigfile.txt — it reads the file from the beginning",
          ],
          answer: 1,
          explanation:
            "`less` is a pager: it loads just enough to fill your screen, lets you scroll up and down, and lets you search with `/`. `cat` floods the terminal; `head` only shows the top.",
        },
      ],
      explanation:
        "`cat` for small files, `less` for scrolling, `tail -f` for live logs. `grep` searches inside files; `grep -r` recurses directories. These four tools cover 90% of file-reading tasks.",
    },
    {
      slug: "pipes-redirection-and-environment",
      title: "Pipes, Redirection & Environment Variables",
      blurb: "Connect commands together with pipes, send output to files, and understand environment variables.",
      xp: 25,
      kind: "quiz",
      content: `# Pipes, Redirection & Environment Variables

The terminal's real power comes from *composing* small commands into powerful
pipelines.

## Pipes (\`|\`)

A **pipe** takes the output of one command and feeds it as input to the next:

\`\`\`
cat app.log | grep "error" | sort | uniq -c
\`\`\`

Read left to right: "print the log, keep only error lines, sort them, count
unique occurrences." You've just written a mini analytics query in one line.

## Redirection

- \`command > file.txt\` — write output to a file (overwrites).
- \`command >> file.txt\` — append output to a file.
- \`command 2> errors.txt\` — redirect *error* output (stderr) to a file.
- \`command < input.txt\` — feed a file as input to a command.

## Environment variables

The shell has a set of named variables that programs read to configure
themselves. Examples:

- \`HOME\` — your home directory.
- \`PATH\` — a colon-separated list of directories the shell searches for
  executable programs when you type a command.
- \`EDITOR\` — the default text editor.

Viewing and setting them:

\`\`\`
echo $HOME            # print a variable (bash/zsh use $)
export MY_VAR=hello   # set a variable for this session
printenv              # list all environment variables
\`\`\`

The \`PATH\` variable is especially important: if you install a tool and the shell
can't find it, the fix is usually adding its directory to \`PATH\`.`,
      questions: [
        {
          prompt: "What does the `|` (pipe) operator do?",
          options: [
            "It writes a command's output to a file",
            "It connects the output of one command to the input of the next",
            "It runs two commands at the same time in parallel",
          ],
          answer: 1,
          explanation:
            "The pipe chains commands: the stdout of the left side becomes the stdin of the right side. This lets you compose focused single-purpose tools into powerful one-liners.",
        },
        {
          prompt: "You want to save the output of `ls -l` to a file called `listing.txt` without overwriting an existing `listing.txt`. Which redirection is correct?",
          options: [
            "ls -l > listing.txt",
            "ls -l >> listing.txt",
            "ls -l | listing.txt",
          ],
          answer: 1,
          explanation:
            "`>>` appends to the file. `>` would overwrite it from scratch. The pipe (`|`) passes output to another command, not to a file.",
        },
        {
          prompt: "You install a new tool but typing its name gives 'command not found'. The most common cause is:",
          options: [
            "The tool needs to be compiled first",
            "The tool's directory isn't listed in the `PATH` environment variable",
            "The terminal window needs to be restarted",
          ],
          answer: 1,
          explanation:
            "The shell searches the directories in `PATH` to find executables. If the tool's directory isn't there, the shell can't find it. Adding the directory to `PATH` (usually in `~/.bashrc` or `~/.zshrc`) is the fix.",
        },
      ],
      explanation:
        "Pipes chain commands; `>` writes output to files, `>>` appends. Environment variables — especially `PATH` — control how the shell and programs behave. Mastering pipes unlocks the real power of the command line.",
    },
    {
      slug: "permissions-processes-and-next-steps",
      title: "Permissions, Processes & Next Steps",
      blurb: "Capstone: understand file permissions, manage running processes, and map your path forward.",
      xp: 25,
      kind: "quiz",
      content: `# Permissions, Processes & Next Steps

Two more fundamentals before you're fully grounded: who can do what to a file,
and how to manage programs that are running.

## File permissions (Linux/macOS)

Every file has three permission sets — **owner, group, others** — each with
three bits: **read (r), write (w), execute (x)**.

\`ls -l\` shows them as a 10-character string, e.g.:

\`\`\`
-rwxr-xr--  1 alice devs 4096 Jun  7 2026 deploy.sh
\`\`\`

- \`-rwx\` — owner (alice) can read, write, execute.
- \`r-x\` — group (devs) can read and execute.
- \`r--\` — everyone else can only read.

\`chmod\` changes permissions; \`chown\` changes ownership. A common pattern is
\`chmod +x script.sh\` to make a script executable.

\`sudo\` runs a command as the superuser (root). Use it only when necessary;
running everything as root is a security risk.

## Processes

- \`ps aux\` — list all running processes (their PID, CPU, memory, command).
- \`top\` or \`htop\` — live resource monitor (htop is friendlier, install separately).
- \`kill PID\` — send a termination signal to a process by its ID.
- \`kill -9 PID\` — force-kill if the normal signal is ignored.
- \`Ctrl+C\` — interrupt (stop) a command running in the foreground. This is your
  first line of defence when something hangs.
- \`Ctrl+Z\` — suspend a foreground job; \`bg\` resumes it in the background.

## Where to go from here

You now have the core vocabulary. Good next paths:

- **Shell scripting** — automate anything repetitive with a Bash/Zsh script.
- **Git from the command line** — the canonical way to use version control.
- **SSH** — log into remote servers as if you were sitting in front of them.
- **Package managers** — \`apt\`/\`brew\`/\`winget\` to install tools in one command.

The terminal rewards practice. Open one daily, use Tab completion aggressively,
and look up \`man <command>\` (the manual) whenever you're curious about a flag.`,
      questions: [
        {
          prompt: "A script `backup.sh` gives 'Permission denied' when you try to run it. What's the most likely fix?",
          options: [
            "Delete the file and recreate it",
            "Run `chmod +x backup.sh` to add execute permission",
            "Move the file to the home directory",
          ],
          answer: 1,
          explanation:
            "By default, new files are not executable. `chmod +x` adds the execute bit for the owner (and optionally group/others), allowing the shell to run it as a program.",
        },
        {
          prompt: "A program freezes in your terminal. What's the fastest way to stop it?",
          options: [
            "Close the entire terminal window",
            "Type `stop` and press Enter",
            "Press Ctrl+C to send an interrupt signal to the foreground process",
          ],
          answer: 2,
          explanation:
            "Ctrl+C sends SIGINT to the running process, which cleanly stops it. It's the standard 'cancel this' key in any Unix-like terminal, and should always be the first thing you try.",
        },
        {
          prompt: "Which command shows all currently running processes and their resource usage in a live, updating view?",
          options: [
            "ps aux",
            "top (or htop)",
            "ls -l /proc",
          ],
          answer: 1,
          explanation:
            "`top` is a real-time process monitor built into virtually every Unix-like system. `htop` is a friendlier version. `ps aux` gives a static snapshot — useful, but not live.",
        },
      ],
      explanation:
        "Permissions control who can read, write, or execute files; `chmod +x` makes scripts runnable. Ctrl+C stops a hung process; `top` shows you what's running. With navigation, file management, pipes, and these fundamentals, you're ready for shell scripting, Git, and SSH.",
    },
  ],
};
