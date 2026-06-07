import type { Module } from "./types";

// Portfolio Games — five classic game-logic implementations that prove
// algorithmic thinking: minimax, board simulation, flood-fill, win detection,
// and step-based movement. Each lesson produces a pure-JS module that belongs
// in any technical portfolio.
export const portfolioGames: Module = {
  slug: "portfolio-games",
  title: "Game Logic",
  description:
    "Implement the brains behind five iconic games — no DOM, no framework, just sharp algorithms. Minimax, flood-fill, win detection, and more: exactly what interviewers love to ask about.",
  emoji: "🎮",
  gradient: "from-violet-400/20 to-fuchsia-500/10",
  tagline: "build classic game engines that impress in any interview",
  language: "js",
  keywords: [
    "game logic javascript",
    "tic-tac-toe minimax",
    "2048 algorithm",
    "minesweeper javascript",
    "connect four javascript",
    "snake game logic",
    "portfolio projects",
  ],
  lessons: [
    // ─── 1. Tic-Tac-Toe minimax ─────────────────────────────────────────────
    {
      slug: "tic-tac-toe-minimax",
      title: "Tic-Tac-Toe: Minimax AI",
      blurb: "Build an unbeatable AI using the minimax algorithm.",
      xp: 50,
      language: "js",
      content: `## What you're building

A pure-logic Tic-Tac-Toe engine with an AI opponent that **never loses**.

The board is a 9-element array of \`"X"\`, \`"O"\`, or \`null\`.
You will implement:

- \`checkWinner(board)\` — returns \`"X"\`, \`"O"\`, \`"draw"\`, or \`null\`.
- \`minimax(board, isMaximizing)\` — recursive best-move scorer (X maximises, O minimises).
- \`bestMove(board)\` — returns the index (0-8) of the optimal move for \`"X"\`.

## Requirements

- \`checkWinner\` must detect all 8 winning lines (3 rows, 3 cols, 2 diagonals).
- \`minimax\` must return \`+10\` for an X win, \`-10\` for an O win, \`0\` for a draw (or ongoing with no moves).
- \`bestMove\` returns the index that maximises the minimax score for X.
- All functions are pure — no side-effects, no mutation of the input board.

## Stretch goals

- Add depth-discounting so the AI prefers faster wins.
- Add alpha-beta pruning to speed up the search.

## What this proves

Minimax is the foundation of chess engines, checkers solvers, and adversarial AI.
Implementing it from scratch demonstrates recursion, game-tree search, and backtracking — core interview topics.`,
      starterCode: `function checkWinner(board) {
  // TODO: check all 8 lines; return "X", "O", "draw", or null
  return null;
}

function minimax(board, isMaximizing) {
  // TODO: recursive minimax; base cases: X win → 10, O win → -10, draw → 0
  return 0;
}

function bestMove(board) {
  // TODO: try every empty cell, return the index with the highest minimax score
  return -1;
}
`,
      solution: `function checkWinner(board) {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6],
  ];
  for (const [a,b,c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
  }
  if (board.every(cell => cell !== null)) return "draw";
  return null;
}

function minimax(board, isMaximizing) {
  const result = checkWinner(board);
  if (result === "X") return 10;
  if (result === "O") return -10;
  if (result === "draw") return 0;
  const empty = board.map((v,i)=>v===null?i:null).filter(i=>i!==null);
  if (empty.length === 0) return 0;
  if (isMaximizing) {
    let best = -Infinity;
    for (const i of empty) {
      const next = board.slice(); next[i] = "X";
      best = Math.max(best, minimax(next, false));
    }
    return best;
  } else {
    let best = Infinity;
    for (const i of empty) {
      const next = board.slice(); next[i] = "O";
      best = Math.min(best, minimax(next, true));
    }
    return best;
  }
}

function bestMove(board) {
  const empty = board.map((v,i)=>v===null?i:null).filter(i=>i!==null);
  let bestScore = -Infinity;
  let move = empty[0];
  for (const i of empty) {
    const next = board.slice(); next[i] = "X";
    const score = minimax(next, false);
    if (score > bestScore) { bestScore = score; move = i; }
  }
  return move;
}
`,
      tests: [
        {
          name: "checkWinner detects row win",
          code: `const board = ["X","X","X",null,null,null,null,null,null];
assertEquals(checkWinner(board), "X");`,
        },
        {
          name: "checkWinner detects diagonal win",
          code: `const board = ["O",null,null,null,"O",null,null,null,"O"];
assertEquals(checkWinner(board), "O");`,
        },
        {
          name: "checkWinner detects draw",
          code: `const board = ["X","O","X","X","X","O","O","X","O"];
assertEquals(checkWinner(board), "draw");`,
        },
        {
          name: "bestMove blocks opponent win",
          code: `// O is about to win at index 2; X must block it
const board = ["O","O",null,"X","X",null,null,null,null];
const move = bestMove(board);
// X should take index 2 to block O's top-row win
assertEquals(move, 2);`,
        },
      ],
      hints: [
        "List the 8 winning lines as an array of [a,b,c] index triples and loop over them.",
        "In minimax, the base case fires before trying moves: check checkWinner first.",
        "For bestMove, clone the board with board.slice() before placing X so you don't mutate the original.",
      ],
    },

    // ─── 2. 2048 row merge ───────────────────────────────────────────────────
    {
      slug: "2048-move-merge",
      title: "2048: Slide & Merge",
      blurb: "Implement the single-row merge that powers the whole 2048 game.",
      xp: 40,
      language: "js",
      content: `## What you're building

The entire 2048 game reduces to one operation: **sliding a row left**.
Get that right and you can apply it four ways (left, right, up, down) to drive the full board.

You will implement:

- \`slideLeft(row)\` — takes a 4-element array of numbers (zeros = empty), returns the merged row slid left.
- \`applyMove(board, direction)\` — takes a 4×4 board (array of 4 rows) and a direction (\`"left"\`, \`"right"\`, \`"up"\`, \`"down"\`), returns the new board after one move.

## Requirements

**slideLeft rules (canonical 2048 behaviour):**
1. Compact all non-zero tiles to the left, leaving zeros on the right.
2. Merge adjacent equal tiles (left-to-right, first match wins); merged tile doubles.
3. A tile produced by merging cannot merge again in the same move.
4. Fill remaining spots with zeros so the row stays 4 elements long.

**applyMove:**
- \`"left"\`: slideLeft each row.
- \`"right"\`: reverse, slideLeft, reverse each row.
- \`"up"\`: transpose, apply left, transpose back.
- \`"down"\`: transpose, apply right, transpose back.

## Stretch goals

- Add a \`score\` accumulator that sums merged tile values.
- Detect a "game over" state (no valid moves remain).

## What this proves

Row/column transformations, immutable data manipulation, and translating a visual game mechanic into clean logic — all classic array-manipulation interview fodder.`,
      starterCode: `function slideLeft(row) {
  // TODO: compact, merge, pad to length 4
  return [0, 0, 0, 0];
}

function applyMove(board, direction) {
  // TODO: apply slideLeft in the correct orientation
  return board;
}
`,
      solution: `function slideLeft(row) {
  const tiles = row.filter(v => v !== 0);
  const merged = [];
  let i = 0;
  while (i < tiles.length) {
    if (i + 1 < tiles.length && tiles[i] === tiles[i + 1]) {
      merged.push(tiles[i] * 2);
      i += 2;
    } else {
      merged.push(tiles[i]);
      i += 1;
    }
  }
  while (merged.length < 4) merged.push(0);
  return merged;
}

function transpose(board) {
  return board[0].map((_, col) => board.map(row => row[col]));
}

function applyMove(board, direction) {
  if (direction === "left")  return board.map(row => slideLeft(row));
  if (direction === "right") return board.map(row => slideLeft(row.slice().reverse()).reverse());
  if (direction === "up") {
    const t = transpose(board);
    return transpose(t.map(row => slideLeft(row)));
  }
  if (direction === "down") {
    const t = transpose(board);
    return transpose(t.map(row => slideLeft(row.slice().reverse()).reverse()));
  }
  return board;
}
`,
      tests: [
        {
          name: "slideLeft compacts and merges",
          code: `const result = slideLeft([0, 2, 2, 4]);
assertEquals(result[0], 4);
assertEquals(result[1], 4);
assertEquals(result[2], 0);
assertEquals(result[3], 0);`,
        },
        {
          name: "slideLeft does not double-merge",
          code: `// [2,2,2,2] → [4,4,0,0], not [8,0,0,0]
const result = slideLeft([2, 2, 2, 2]);
assertEquals(result[0], 4);
assertEquals(result[1], 4);
assertEquals(result[2], 0);`,
        },
        {
          name: "applyMove left slides all rows",
          code: `const board = [
  [0,0,2,2],
  [4,0,4,0],
  [0,0,0,8],
  [0,0,0,0],
];
const next = applyMove(board, "left");
assertEquals(next[0][0], 4);
assertEquals(next[1][0], 8);
assertEquals(next[2][0], 8);`,
        },
        {
          name: "applyMove right slides all rows",
          code: `const board = [
  [2,2,0,0],
  [0,0,0,0],
  [4,4,4,4],
  [0,0,0,0],
];
const next = applyMove(board, "right");
assertEquals(next[0][3], 4);
assertEquals(next[2][2], 8);
assertEquals(next[2][3], 8);`,
        },
      ],
      hints: [
        "Filter out zeros first so you only work with live tiles.",
        "Use a separate index variable that advances by 2 on a merge, 1 otherwise.",
        "For 'right', reverse the row, slideLeft, then reverse the result back.",
        "Transpose swaps rows and columns — use it to turn 'up'/'down' into 'left'/'right'.",
      ],
    },

    // ─── 3. Minesweeper board + reveal ──────────────────────────────────────
    {
      slug: "minesweeper-reveal",
      title: "Minesweeper: Board & Reveal",
      blurb: "Generate a mine field and implement the flood-fill reveal.",
      xp: 50,
      language: "js",
      content: `## What you're building

The core engine of Minesweeper — board generation and the satisfying **flood-fill reveal** that opens a whole region with a single click.

You will implement:

- \`createBoard(rows, cols, mines)\` — returns a 2-D grid where each cell is \`{ mine: bool, adjacent: number, revealed: false }\`.
- \`reveal(board, row, col)\` — mutates the board in place: reveals the cell; if \`adjacent === 0\` and not a mine, recursively reveals all 8 neighbours. Returns \`"boom"\` if the cell is a mine, otherwise \`"ok"\`.

## Requirements

- Mine positions must be spread across the grid (no duplicates, no out-of-bounds).
- \`adjacent\` is the count of mines in the 8 surrounding cells (0-8).
- \`reveal\` stops recursing at already-revealed cells (prevents infinite loops).
- Revealing a mine returns \`"boom"\` without marking it revealed.
- Revealing a cell with \`adjacent > 0\` reveals only that cell (no flood fill).
- Revealing a cell with \`adjacent === 0\` flood-fills all contiguous zero-adjacent, non-mine neighbours.

## Stretch goals

- Add a \`flag(board, row, col)\` toggle.
- Detect and return a "win" state (all non-mine cells are revealed).

## What this proves

2-D array manipulation, BFS/DFS flood-fill, and neighbour-coordinate iteration — three patterns that appear constantly in grid-based interview problems.`,
      starterCode: `function createBoard(rows, cols, mineCount) {
  // Build a rows×cols grid of { mine: false, adjacent: 0, revealed: false }
  // Place mineCount mines at random (unique) positions
  // Compute adjacent counts for every non-mine cell
  // TODO: implement
  return [];
}

function reveal(board, row, col) {
  // Reveal cell at (row, col). If mine → return "boom".
  // If adjacent === 0 → flood-fill neighbours (BFS or DFS, your choice).
  // TODO: implement
  return "ok";
}
`,
      solution: `function createBoard(rows, cols, mineCount) {
  const board = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({ mine: false, adjacent: 0, revealed: false }))
  );
  // Place mines
  const positions = [];
  const total = rows * cols;
  for (let i = 0; i < total && positions.length < mineCount; i++) positions.push(i);
  // Fisher-Yates shuffle then take first mineCount
  for (let i = positions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [positions[i], positions[j]] = [positions[j], positions[i]];
  }
  for (let k = 0; k < mineCount; k++) {
    const r = Math.floor(positions[k] / cols);
    const c = positions[k] % cols;
    board[r][c].mine = true;
  }
  // Compute adjacency
  const dirs = [-1,0,1];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r][c].mine) continue;
      let count = 0;
      for (const dr of dirs) for (const dc of dirs) {
        if (dr === 0 && dc === 0) continue;
        const nr = r + dr; const nc = c + dc;
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc].mine) count++;
      }
      board[r][c].adjacent = count;
    }
  }
  return board;
}

function reveal(board, row, col) {
  const cell = board[row][col];
  if (cell.mine) return "boom";
  if (cell.revealed) return "ok";
  cell.revealed = true;
  if (cell.adjacent === 0) {
    const rows = board.length; const cols = board[0].length;
    const dirs = [-1,0,1];
    const stack = [[row, col]];
    const seen = new Set([row + "," + col]);
    let limit = rows * cols;
    while (stack.length > 0 && limit-- > 0) {
      const [r, c] = stack.pop();
      for (const dr of dirs) for (const dc of dirs) {
        if (dr === 0 && dc === 0) continue;
        const nr = r + dr; const nc = c + dc;
        const key = nr + "," + nc;
        if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;
        if (seen.has(key)) continue;
        seen.add(key);
        const nb = board[nr][nc];
        if (nb.mine || nb.revealed) continue;
        nb.revealed = true;
        if (nb.adjacent === 0) stack.push([nr, nc]);
      }
    }
  }
  return "ok";
}
`,
      tests: [
        {
          name: "createBoard produces correct dimensions",
          code: `const board = createBoard(4, 5, 3);
assertEquals(board.length, 4);
assertEquals(board[0].length, 5);`,
        },
        {
          name: "createBoard places exactly N mines",
          code: `const board = createBoard(5, 5, 6);
let mineCount = 0;
for (const row of board) for (const cell of row) if (cell.mine) mineCount++;
assertEquals(mineCount, 6);`,
        },
        {
          name: "reveal returns boom on mine",
          code: `// Build a tiny board manually: one mine at (0,0)
const board = [[{ mine: true, adjacent: 0, revealed: false }]];
assertEquals(reveal(board, 0, 0), "boom");`,
        },
        {
          name: "reveal flood-fills zero-adjacent region",
          code: `// 1×3 board: all zeros, no mines
const board = [
  [{ mine:false, adjacent:0, revealed:false },
   { mine:false, adjacent:0, revealed:false },
   { mine:false, adjacent:0, revealed:false }],
];
reveal(board, 0, 0);
assertEquals(board[0][0].revealed, true);
assertEquals(board[0][1].revealed, true);
assertEquals(board[0][2].revealed, true);`,
        },
      ],
      hints: [
        "Build the grid first, then place mines using a shuffle so positions are guaranteed unique.",
        "Loop over all 8 neighbours with two nested loops over [-1, 0, 1].",
        "Use a stack (DFS) or queue (BFS) for flood-fill and a Set to track visited keys so you never revisit a cell.",
      ],
    },

    // ─── 4. Connect Four win check ───────────────────────────────────────────
    {
      slug: "connect-four-win",
      title: "Connect Four: Win Detection",
      blurb: "Drop discs and detect a four-in-a-row win in any direction.",
      xp: 40,
      language: "js",
      content: `## What you're building

The critical piece of any Connect Four implementation: **detecting a win** after each disc drop.

You will implement:

- \`dropDisc(board, col, player)\` — drops player's disc (\`1\` or \`2\`) into the lowest empty row of \`col\`. Returns \`true\` if the drop succeeded, \`false\` if the column is full.
- \`checkWin(board, row, col)\` — returns \`true\` if the disc just placed at \`(row, col)\` completes a run of four for that player in any direction (horizontal, vertical, either diagonal).

The board is a 6-row × 7-col 2-D array, initialised to zeros.

## Requirements

- \`dropDisc\` must place the disc in the **lowest empty row** (gravity).
- \`checkWin\` checks exactly four directions: horizontal (0°), vertical (90°), and both diagonals (45°, 135°).
- A win is any run of **4 consecutive identical non-zero values** passing through \`(row, col)\`.
- Do not mutate test fixtures outside of the functions — use \`board[r][c]\` assignment only inside \`dropDisc\`.

## Stretch goals

- Detect a draw (board full, no winner).
- Implement a \`minimax\` evaluator for the full 7-column game.

## What this proves

Direction-vector scanning — a pattern that recurs in Boggle, word-search, and any "n-in-a-row" problem — plus boundary-safe grid traversal.`,
      starterCode: `function dropDisc(board, col, player) {
  // Find the lowest empty row in this column and place player's disc.
  // Return true on success, false if column is full.
  return false;
}

function checkWin(board, row, col) {
  // Check all 4 directions through (row, col) for a run of 4.
  // Return true if any direction contains 4-in-a-row for board[row][col].
  return false;
}
`,
      solution: `function dropDisc(board, col, player) {
  const rows = board.length;
  for (let r = rows - 1; r >= 0; r--) {
    if (board[r][col] === 0) {
      board[r][col] = player;
      return true;
    }
  }
  return false;
}

function checkWin(board, row, col) {
  const player = board[row][col];
  if (!player) return false;
  const rows = board.length;
  const cols = board[0].length;
  const directions = [[0,1],[1,0],[1,1],[1,-1]];
  for (const [dr, dc] of directions) {
    let count = 1;
    for (let step = 1; step < 4; step++) {
      const r = row + dr * step; const c = col + dc * step;
      if (r < 0 || r >= rows || c < 0 || c >= cols || board[r][c] !== player) break;
      count++;
    }
    for (let step = 1; step < 4; step++) {
      const r = row - dr * step; const c = col - dc * step;
      if (r < 0 || r >= rows || c < 0 || c >= cols || board[r][c] !== player) break;
      count++;
    }
    if (count >= 4) return true;
  }
  return false;
}
`,
      tests: [
        {
          name: "dropDisc places in lowest empty row",
          code: `const board = Array.from({length:6}, () => Array(7).fill(0));
dropDisc(board, 3, 1);
assertEquals(board[5][3], 1);
dropDisc(board, 3, 2);
assertEquals(board[4][3], 2);`,
        },
        {
          name: "dropDisc returns false when column full",
          code: `const board = Array.from({length:6}, () => Array(7).fill(0));
for (let i = 0; i < 6; i++) board[i][0] = 1;
assertEquals(dropDisc(board, 0, 2), false);`,
        },
        {
          name: "checkWin detects horizontal four",
          code: `const board = Array.from({length:6}, () => Array(7).fill(0));
board[5][0] = 1; board[5][1] = 1; board[5][2] = 1; board[5][3] = 1;
assertEquals(checkWin(board, 5, 1), true);`,
        },
        {
          name: "checkWin detects vertical four",
          code: `const board = Array.from({length:6}, () => Array(7).fill(0));
board[2][4] = 2; board[3][4] = 2; board[4][4] = 2; board[5][4] = 2;
assertEquals(checkWin(board, 3, 4), true);`,
        },
      ],
      hints: [
        "Walk the column from the bottom row upward until you find board[r][col] === 0.",
        "For each direction vector [dr,dc], count tiles in both the positive and negative direction from (row,col).",
        "Remember to count the origin cell itself — start count at 1, not 0.",
      ],
    },

    // ─── 5. Snake step logic ─────────────────────────────────────────────────
    {
      slug: "snake-step",
      title: "Snake: Step Logic",
      blurb: "Drive the snake one tick at a time — movement, growth, and collision.",
      xp: 60,
      language: "js",
      content: `## What you're building

The game loop of Snake, distilled to a single pure function: **one tick of movement**.

You will implement a \`SnakeGame\` class with:

- \`constructor(rows, cols, startPos)\` — initialise the snake at \`startPos\` (\`[row,col]\`), facing \`"right"\`, on a \`rows×cols\` grid. Place the first food randomly (not on the snake).
- \`changeDirection(dir)\` — change heading to \`"up"\`, \`"down"\`, \`"left"\`, or \`"right"\`. Ignore reversal (can't go right while facing left).
- \`step()\` — advance one tick. Returns \`"ate"\` (snake grew), \`"dead"\` (wall or self collision), or \`"ok"\` (normal move).

The snake is stored as an array of \`[row,col]\` segments, head first.

## Requirements

- On each step, compute the new head position based on current direction.
- If new head is out of bounds or overlaps the snake body → \`"dead"\`.
- If new head is on food → grow (keep the tail, add new head), place new food not on the snake, return \`"ate"\`.
- Otherwise → normal move (add new head, remove tail), return \`"ok"\`.
- \`changeDirection\` must reject direct reversals: up↔down, left↔right.

## Stretch goals

- Expose \`getScore()\` (food eaten count).
- Detect a "win" state (snake fills the entire grid).

## What this proves

Queue-based body management, edge detection, and state-machine transitions — plus the ability to model a real-time game loop as pure, testable logic that's decoupled from any rendering layer.`,
      starterCode: `class SnakeGame {
  constructor(rows, cols, startPos) {
    this.rows = rows;
    this.cols = cols;
    this.snake = [startPos]; // array of [row,col], head first
    this.dir = "right";
    this.food = this._placeFood();
  }

  _placeFood() {
    // Return a [row,col] that is not on the snake
    // TODO: implement (keep it simple — iterate until you find a free cell)
    return [0, 0];
  }

  changeDirection(dir) {
    // Update this.dir, but reject direct reversals
    // TODO: implement
  }

  step() {
    // Compute the next head position, handle collisions, food, and normal move
    // Return "dead", "ate", or "ok"
    // TODO: implement
    return "ok";
  }
}
`,
      solution: `class SnakeGame {
  constructor(rows, cols, startPos) {
    this.rows = rows;
    this.cols = cols;
    this.snake = [startPos];
    this.dir = "right";
    this.food = this._placeFood();
  }

  _placeFood() {
    const snakeSet = new Set(this.snake.map(([r,c]) => r + "," + c));
    const free = [];
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        if (!snakeSet.has(r + "," + c)) free.push([r,c]);
      }
    }
    if (free.length === 0) return null;
    return free[Math.floor(Math.random() * free.length)];
  }

  changeDirection(dir) {
    const opposites = { up:"down", down:"up", left:"right", right:"left" };
    if (opposites[dir] !== this.dir) this.dir = dir;
  }

  step() {
    const [hr, hc] = this.snake[0];
    const deltas = { up:[-1,0], down:[1,0], left:[0,-1], right:[0,1] };
    const [dr, dc] = deltas[this.dir];
    const nr = hr + dr; const nc = hc + dc;
    // Wall collision
    if (nr < 0 || nr >= this.rows || nc < 0 || nc >= this.cols) return "dead";
    // Self collision — exclude the tail since it will move away (unless eating)
    const body = this.snake.slice(0, this.snake.length - 1);
    if (body.some(([r,c]) => r === nr && c === nc)) return "dead";
    // Food check
    if (this.food && this.food[0] === nr && this.food[1] === nc) {
      this.snake.unshift([nr, nc]); // grow
      this.food = this._placeFood();
      return "ate";
    }
    // Normal move
    this.snake.unshift([nr, nc]);
    this.snake.pop();
    return "ok";
  }
}
`,
      tests: [
        {
          name: "step moves snake right by default",
          code: `const g = new SnakeGame(10, 10, [5, 5]);
// Force food away so we get "ok"
g.food = [0, 0];
const result = g.step();
assert(result === "ok" || result === "ate");
assertEquals(g.snake[0][1], 6); // moved right`,
        },
        {
          name: "step returns dead on wall collision",
          code: `const g = new SnakeGame(5, 5, [2, 4]);
g.food = [0, 0];
// Facing right, already at last column — next step is out of bounds
const result = g.step();
assertEquals(result, "dead");`,
        },
        {
          name: "step returns ate and grows snake",
          code: `const g = new SnakeGame(10, 10, [5, 4]);
g.food = [5, 5]; // food is directly to the right
const before = g.snake.length;
const result = g.step();
assertEquals(result, "ate");
assertEquals(g.snake.length, before + 1);`,
        },
        {
          name: "changeDirection rejects reversal",
          code: `const g = new SnakeGame(10, 10, [5, 5]);
g.dir = "right";
g.changeDirection("left"); // reversal — must be ignored
assertEquals(g.dir, "right");
g.changeDirection("up");   // valid — must apply
assertEquals(g.dir, "up");`,
        },
      ],
      hints: [
        "Store the snake as an array with the head at index 0; unshift adds to the front, pop removes from the back.",
        "For self-collision, only check against body segments that will actually still be there after the move — i.e. all but the last tail cell.",
        "Keep a Set of occupied positions (stringified) for fast food placement.",
      ],
    },
  ],
};
