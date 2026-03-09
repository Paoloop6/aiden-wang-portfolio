import { useEffect, useCallback, useRef, useState } from "react";

type Direction = "up" | "down" | "left" | "right";
type GamePhase = "menu" | "playing" | "paused" | "gameOver";
type GameMode = "classic" | "speed" | "infinite";

interface Position {
  x: number;
  y: number;
}

const GRID_SIZE = 20;
const INITIAL_SNAKE: Position[] = [
  { x: 10, y: 10 },
  { x: 9, y: 10 },
  { x: 8, y: 10 },
];

const GAME_MODES: { id: GameMode; name: string; desc: string }[] = [
  { id: "classic", name: "Classic", desc: "Normal snake with levels & obstacles" },
  { id: "speed", name: "Speed", desc: "Fast-paced gameplay" },
  { id: "infinite", name: "Infinite", desc: "No walls - wrap around edges" },
];

function getRandomPosition(occupied: Position[]): Position {
  let pos: Position;
  let attempts = 0;
  do {
    pos = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
    attempts++;
    if (attempts > 1000) break;
  } while (occupied.some((o) => o.x === pos.x && o.y === pos.y));
  return pos;
}

function generateObstacles(level: number, snake: Position[], food: Position): Position[] {
  if (level < 2) return [];
  const count = Math.min((level - 1) * 3, 15);
  const obstacles: Position[] = [];
  const occupied = [...snake, food];
  for (let i = 0; i < count; i++) {
    const pos = getRandomPosition([...occupied, ...obstacles]);
    obstacles.push(pos);
  }
  return obstacles;
}

export function SnakeGame() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<GamePhase>("menu");
  const [gameMode, setGameMode] = useState<GameMode>("classic");
  const [highScore] = useState(() =>
    parseInt(localStorage.getItem("snakeHighScore") || "0")
  );

  const snakeRef = useRef<Position[]>([...INITIAL_SNAKE]);
  const foodRef = useRef<Position>({ x: 15, y: 10 });
  const dirRef = useRef<Direction>("right");
  const nextDirRef = useRef<Direction>("right");
  const scoreRef = useRef(0);
  const levelRef = useRef(1);
  const obstaclesRef = useRef<Position[]>([]);
  const speedRef = useRef(150);
  const highScoreRef = useRef(highScore);
  const gameModeRef = useRef<GameMode>("classic");

  const [displayState, setDisplayState] = useState({
    snake: [...INITIAL_SNAKE],
    food: { x: 15, y: 10 },
    score: 0,
    level: 1,
    obstacles: [] as Position[],
    highScore,
  });

  const startGame = useCallback(() => {
    const mode = gameModeRef.current;
    snakeRef.current = [...INITIAL_SNAKE];
    foodRef.current = getRandomPosition([...INITIAL_SNAKE]);
    dirRef.current = "right";
    nextDirRef.current = "right";
    scoreRef.current = 0;
    levelRef.current = 1;
    obstaclesRef.current = [];
    speedRef.current = mode === "speed" ? 80 : 150;
    setDisplayState({
      snake: [...INITIAL_SNAKE],
      food: foodRef.current,
      score: 0,
      level: 1,
      obstacles: [],
      highScore: highScoreRef.current,
    });
    setPhase("playing");
  }, []);

  const endGame = useCallback(() => {
    const hs = Math.max(scoreRef.current, highScoreRef.current);
    highScoreRef.current = hs;
    localStorage.setItem("snakeHighScore", String(hs));
    setDisplayState((prev) => ({ ...prev, highScore: hs }));
    setPhase("gameOver");
  }, []);

  const tick = useCallback(() => {
    const snake = snakeRef.current;
    const food = foodRef.current;
    const mode = gameModeRef.current;
    const head = { ...snake[0] };
    const dir = nextDirRef.current;
    dirRef.current = dir;

    switch (dir) {
      case "up": head.y -= 1; break;
      case "down": head.y += 1; break;
      case "left": head.x -= 1; break;
      case "right": head.x += 1; break;
    }

    if (mode === "infinite") {
      head.x = ((head.x % GRID_SIZE) + GRID_SIZE) % GRID_SIZE;
      head.y = ((head.y % GRID_SIZE) + GRID_SIZE) % GRID_SIZE;
    } else if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
      endGame();
      return;
    }

    if (snake.some((s) => s.x === head.x && s.y === head.y)) {
      endGame();
      return;
    }

    if (obstaclesRef.current.some((o) => o.x === head.x && o.y === head.y)) {
      endGame();
      return;
    }

    const newSnake = [head, ...snake];
    if (head.x === food.x && head.y === food.y) {
      const newScore = scoreRef.current + 10;
      scoreRef.current = newScore;
      const newLevel = Math.floor(newScore / 50) + 1;
      levelRef.current = newLevel;
      const newObs = newLevel !== levelRef.current
        ? generateObstacles(newLevel, newSnake, food)
        : obstaclesRef.current;
      if (newLevel > Math.floor((newScore - 10) / 50) + 1) {
        obstaclesRef.current = generateObstacles(newLevel, newSnake, food);
      }
      const allOcc = [...newSnake, ...obstaclesRef.current];
      const newFood = getRandomPosition(allOcc);
      foodRef.current = newFood;
      snakeRef.current = newSnake;
      speedRef.current = mode === "speed"
        ? Math.max(40, 80 - (newLevel - 1) * 10)
        : Math.max(80, 150 - (newLevel - 1) * 15);
    } else {
      newSnake.pop();
      snakeRef.current = newSnake;
    }

    setDisplayState({
      snake: [...snakeRef.current],
      food: { ...foodRef.current },
      score: scoreRef.current,
      level: levelRef.current,
      obstacles: [...obstaclesRef.current],
      highScore: highScoreRef.current,
    });
  }, [endGame]);

  useEffect(() => {
    if (phase !== "playing") return;
    let running = true;
    let timeout: ReturnType<typeof setTimeout>;

    const loop = () => {
      if (!running) return;
      tick();
      timeout = setTimeout(loop, speedRef.current);
    };
    timeout = setTimeout(loop, speedRef.current);

    return () => {
      running = false;
      clearTimeout(timeout);
    };
  }, [phase, tick]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "p" || e.key === "P" || e.key === "Escape") {
        if (phase === "playing") { setPhase("paused"); return; }
        if (phase === "paused") { setPhase("playing"); return; }
      }
      if (phase !== "playing") return;
      const keyDirs: Record<string, Direction> = {
        ArrowUp: "up", ArrowDown: "down", ArrowLeft: "left", ArrowRight: "right",
        w: "up", W: "up", s: "down", S: "down", a: "left", A: "left", d: "right", D: "right",
      };
      if (keyDirs[e.key]) {
        e.preventDefault();
        const dir = keyDirs[e.key];
        const opp: Record<Direction, Direction> = { up: "down", down: "up", left: "right", right: "left" };
        if (dir !== opp[dirRef.current]) {
          nextDirRef.current = dir;
        }
      }
    },
    [phase]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const cellSize = 18;
  const boardSize = cellSize * GRID_SIZE;

  if (phase === "menu") {
    return (
      <div
        ref={containerRef}
        className="flex flex-col items-center justify-center p-6 bg-black rounded-md w-full"
        style={{ minHeight: 360, fontFamily: "monospace" }}
      >
        <h2 className="text-3xl font-bold text-green-400 mb-2" data-testid="text-snake-title">
          SNAKE
        </h2>
        <p className="text-xs text-gray-500 mb-4">Arrow keys / WASD to move | P to pause</p>
        <p className="text-cyan-400 text-sm mb-3">SELECT MODE:</p>
        <div className="grid grid-cols-1 gap-2 mb-4 w-full max-w-xs">
          {GAME_MODES.map((mode) => (
            <button
              key={mode.id}
              onClick={() => { setGameMode(mode.id); gameModeRef.current = mode.id; }}
              className="text-left px-3 py-2 text-sm border transition-colors"
              style={{
                fontFamily: "monospace",
                backgroundColor: gameMode === mode.id ? "#0f0" : "#222",
                color: gameMode === mode.id ? "#000" : "#0f0",
                borderColor: gameMode === mode.id ? "#0f0" : "#333",
              }}
              data-testid={`button-mode-${mode.id}`}
            >
              <strong>{mode.name}</strong>
              <span className="block text-xs opacity-70">{mode.desc}</span>
            </button>
          ))}
        </div>
        <button
          onClick={startGame}
          className="px-8 py-2 text-lg font-bold border-2 border-green-400 text-green-400 transition-colors"
          style={{ fontFamily: "monospace", backgroundColor: "transparent" }}
          data-testid="button-start-snake"
        >
          START GAME
        </button>
        {displayState.highScore > 0 && (
          <p className="text-yellow-400 text-sm mt-3" data-testid="text-snake-highscore">
            High Score: {displayState.highScore}
          </p>
        )}
      </div>
    );
  }

  if (phase === "gameOver") {
    return (
      <div
        ref={containerRef}
        className="flex flex-col items-center justify-center p-6 bg-black rounded-md w-full"
        style={{ minHeight: 360, fontFamily: "monospace" }}
      >
        <h2 className="text-3xl font-bold text-red-400 mb-2" data-testid="text-snake-gameover">
          GAME OVER
        </h2>
        <p className="text-green-400 text-xl mb-1">Score: {displayState.score}</p>
        <p className="text-yellow-400 text-sm mb-1">High Score: {displayState.highScore}</p>
        <p className="text-gray-500 text-sm mb-4">Level: {displayState.level}</p>
        <div className="flex gap-3">
          <button
            onClick={startGame}
            className="px-6 py-2 text-sm font-bold border border-green-400 text-green-400"
            style={{ fontFamily: "monospace", backgroundColor: "transparent" }}
            data-testid="button-restart-snake"
          >
            PLAY AGAIN
          </button>
          <button
            onClick={() => setPhase("menu")}
            className="px-6 py-2 text-sm font-bold border border-gray-500 text-gray-400"
            style={{ fontFamily: "monospace", backgroundColor: "transparent" }}
            data-testid="button-menu-snake"
          >
            MENU
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center bg-black rounded-md w-full p-3"
      style={{ fontFamily: "monospace" }}
      onTouchStart={(e) => {
        const t = e.touches[0];
        touchStart.current = { x: t.clientX, y: t.clientY };
      }}
      onTouchEnd={(e) => {
        if (touchStart.current && phase === "playing") {
          const t = e.changedTouches[0];
          const dx = t.clientX - touchStart.current.x;
          const dy = t.clientY - touchStart.current.y;
          if (Math.abs(dx) > Math.abs(dy)) {
            const dir = dx > 0 ? "right" : "left";
            const opp: Record<Direction, Direction> = { up: "down", down: "up", left: "right", right: "left" };
            if (dir !== opp[dirRef.current]) nextDirRef.current = dir;
          } else {
            const dir = dy > 0 ? "down" : "up";
            const opp: Record<Direction, Direction> = { up: "down", down: "up", left: "right", right: "left" };
            if (dir !== opp[dirRef.current]) nextDirRef.current = dir;
          }
          touchStart.current = null;
        }
      }}
    >
      <div className="flex items-center justify-between w-full mb-2 px-1" style={{ maxWidth: boardSize }}>
        <span className="text-green-400 text-sm" data-testid="text-snake-score">
          Score: {displayState.score}
        </span>
        <span className="text-gray-500 text-xs">Lvl {displayState.level}</span>
        <button
          onClick={() => setPhase(phase === "paused" ? "playing" : "paused")}
          className="text-gray-400 text-xs border border-gray-600 px-2 py-0.5"
          style={{ fontFamily: "monospace" }}
          data-testid="button-pause-snake"
        >
          {phase === "paused" ? "RESUME" : "PAUSE"}
        </button>
      </div>

      <div
        className="relative border border-gray-700 mx-auto"
        style={{ width: boardSize, height: boardSize, backgroundColor: "#111" }}
      >
        {phase === "paused" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-10">
            <p className="text-green-400 text-2xl font-bold">PAUSED</p>
          </div>
        )}

        {displayState.obstacles.map((obs, i) => (
          <div
            key={`obs-${i}`}
            className="absolute"
            style={{
              left: obs.x * cellSize, top: obs.y * cellSize,
              width: cellSize, height: cellSize, backgroundColor: "#666",
            }}
          />
        ))}

        {displayState.snake.map((seg, i) => (
          <div
            key={`seg-${i}`}
            className="absolute"
            style={{
              left: seg.x * cellSize, top: seg.y * cellSize,
              width: cellSize, height: cellSize,
              backgroundColor: i === 0 ? "#0f0" : "#0a0",
              borderRadius: i === 0 ? 2 : 0,
            }}
          />
        ))}

        <div
          className="absolute"
          style={{
            left: displayState.food.x * cellSize, top: displayState.food.y * cellSize,
            width: cellSize, height: cellSize,
            backgroundColor: "#f00", borderRadius: "50%",
          }}
        />
      </div>

      <p className="text-gray-600 text-xs mt-2">
        {phase === "paused" ? "Press P to resume" : "P to pause | Swipe on mobile"}
      </p>
    </div>
  );
}
