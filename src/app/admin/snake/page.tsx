'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Position = { x: number; y: number };

const GRID_SIZE = 20;
const INITIAL_SNAKE: Position[] = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION: Direction = 'RIGHT';
const GAME_SPEED = 150;

export default function SnakePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/login');
    } else {
      setIsAuthenticated(true);
      const savedHighScore = localStorage.getItem('snakeHighScore');
      if (savedHighScore) {
        setHighScore(parseInt(savedHighScore));
      }
    }
    setLoading(false);
  }, [router]);

  const generateFood = useCallback((): Position => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }, [snake]);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood({ x: 15, y: 15 });
    setDirection(INITIAL_DIRECTION);
    setGameOver(false);
    setScore(0);
    setIsPaused(false);
    setGameStarted(true);
  };

  const checkCollision = (head: Position): boolean => {
    // Wall collision
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
      return true;
    }
    // Self collision
    return snake.some(segment => segment.x === head.x && segment.y === head.y);
  };

  const moveSnake = useCallback(() => {
    if (gameOver || isPaused || !gameStarted) return;

    setSnake(prevSnake => {
      const head = prevSnake[0];
      let newHead: Position;

      switch (direction) {
        case 'UP':
          newHead = { x: head.x, y: head.y - 1 };
          break;
        case 'DOWN':
          newHead = { x: head.x, y: head.y + 1 };
          break;
        case 'LEFT':
          newHead = { x: head.x - 1, y: head.y };
          break;
        case 'RIGHT':
          newHead = { x: head.x + 1, y: head.y };
          break;
      }

      if (checkCollision(newHead)) {
        setGameOver(true);
        if (score > highScore) {
          setHighScore(score);
          localStorage.setItem('snakeHighScore', score.toString());
        }
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      // Check if food eaten
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore(prev => prev + 10);
        setFood(generateFood());
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameOver, isPaused, gameStarted, score, highScore, generateFood]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!gameStarted) {
        if (e.key === ' ' || e.key === 'Enter') {
          resetGame();
        }
        return;
      }

      if (e.key === ' ') {
        setIsPaused(prev => !prev);
        return;
      }

      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'DOWN') setDirection('UP');
          break;
        case 'ArrowDown':
          if (direction !== 'UP') setDirection('DOWN');
          break;
        case 'ArrowLeft':
          if (direction !== 'RIGHT') setDirection('LEFT');
          break;
        case 'ArrowRight':
          if (direction !== 'LEFT') setDirection('RIGHT');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction, gameStarted]);

  useEffect(() => {
    const gameLoop = setInterval(moveSnake, GAME_SPEED);
    return () => clearInterval(gameLoop);
  }, [moveSnake]);

  const renderGrid = () => {
    const grid = [];
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        const isSnake = snake.some(segment => segment.x === x && segment.y === y);
        const isHead = snake[0].x === x && snake[0].y === y;
        const isFood = food.x === x && food.y === y;

        let char = '·';
        if (isFood) char = '◉';
        else if (isHead) char = '●';
        else if (isSnake) char = '█';

        grid.push(
          <span key={`${x}-${y}`} style={{ color: isFood ? '#ff0000' : isSnake ? '#00ff00' : '#666' }}>
            {char}
          </span>
        );
      }
      grid.push(<br key={`br-${y}`} />);
    }
    return grid;
  };

  if (loading) {
    return (
      <main className="pb-3 p-3">
        <div className="mx-auto" style={{ maxWidth: '1200px' }}>
          <p className="text-center">Chargement...</p>
        </div>
      </main>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <main className="pb-3 p-3">
      <div className="mx-auto" style={{ maxWidth: '900px' }}>
        <section className="mb-3">
          <div className="card card-tertiary">
            <div className="card-header">
              <div className="card-title-wrapper">
                <span className="card-icon">🐍</span>
                <span className="card-title">Snake Game - Admin Only</span>
              </div>
              <div className="card-controls">
                <button className="card-control-btn">_</button>
                <button className="card-control-btn">□</button>
                <button className="card-control-btn">✕</button>
              </div>
            </div>
            <div className="card-body text-center">
              <div className="row g-2 mb-3">
                <div className="col-6">
                  <div className="card h-100">
                    <div className="card-body">
                      <p className="mb-0 small">Score</p>
                      <h3 className="mb-0">{score}</h3>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="card h-100">
                    <div className="card-body">
                      <p className="mb-0 small">High Score</p>
                      <h3 className="mb-0">{highScore}</h3>
                    </div>
                  </div>
                </div>
              </div>

              <div
                style={{
                  backgroundColor: '#000',
                  padding: '20px',
                  fontFamily: 'monospace',
                  fontSize: '16px',
                  lineHeight: '1',
                  border: '4px solid #c0c0c0',
                  display: 'inline-block',
                  letterSpacing: '2px',
                }}
              >
                {!gameStarted ? (
                  <div style={{ color: '#00ff00', textAlign: 'center', padding: '150px 50px' }}>
                    <p>SNAKE GAME</p>
                    <p>Press SPACE or ENTER to start</p>
                    <p style={{ fontSize: '12px', marginTop: '20px' }}>
                      Use Arrow Keys to move
                    </p>
                  </div>
                ) : gameOver ? (
                  <div style={{ color: '#ff0000', textAlign: 'center', padding: '150px 50px' }}>
                    <p>GAME OVER!</p>
                    <p>Final Score: {score}</p>
                    {score > highScore && <p>NEW HIGH SCORE!</p>}
                    <p style={{ fontSize: '12px', marginTop: '20px' }}>
                      Press SPACE to restart
                    </p>
                  </div>
                ) : isPaused ? (
                  <div style={{ color: '#ffff00', textAlign: 'center', padding: '150px 50px' }}>
                    <p>PAUSED</p>
                    <p style={{ fontSize: '12px', marginTop: '20px' }}>
                      Press SPACE to resume
                    </p>
                  </div>
                ) : (
                  renderGrid()
                )}
              </div>

              <div className="mt-3">
                <p className="mb-2">
                  <strong>Controls:</strong> Arrow Keys to move | Space to Pause
                </p>
                <div className="d-flex justify-content-center" style={{ gap: '10px' }}>
                  <button className="btn btn-primary border-dark" onClick={resetGame}>
                    <span className="btn-text">🔄 New Game</span>
                  </button>
                  <button className="btn btn-primary" onClick={() => setIsPaused(prev => !prev)}>
                    <span className="btn-text">{isPaused ? '▶️ Resume' : '⏸️ Pause'}</span>
                  </button>
                  <a href="/admin" className="btn btn-primary">
                    <span className="btn-text">⬅️ Back to Dashboard</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
