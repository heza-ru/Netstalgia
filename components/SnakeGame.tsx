'use client'

import { useState, useEffect, useCallback } from 'react'

interface SnakeGameProps {
  isActive: boolean
  onClose: () => void
}

interface Position {
  x: number
  y: number
}

export default function SnakeGame({ isActive, onClose }: SnakeGameProps) {
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }])
  const [food, setFood] = useState<Position>({ x: 15, y: 15 })
  const [direction, setDirection] = useState<'up' | 'down' | 'left' | 'right'>('right')
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  const boardSize = 20
  const cellSize = 15

  const generateFood = useCallback(() => {
    const newFood = {
      x: Math.floor(Math.random() * boardSize),
      y: Math.floor(Math.random() * boardSize)
    }
    setFood(newFood)
  }, [])

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }])
    setDirection('right')
    setScore(0)
    setGameOver(false)
    setIsPaused(false)
    generateFood()
  }

  const moveSnake = useCallback(() => {
    if (gameOver || isPaused) return

    setSnake(prevSnake => {
      const newSnake = [...prevSnake]
      const head = { ...newSnake[0] }

      switch (direction) {
        case 'up':
          head.y = (head.y - 1 + boardSize) % boardSize
          break
        case 'down':
          head.y = (head.y + 1) % boardSize
          break
        case 'left':
          head.x = (head.x - 1 + boardSize) % boardSize
          break
        case 'right':
          head.x = (head.x + 1) % boardSize
          break
      }

      // Check collision with self
      if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true)
        return prevSnake
      }

      newSnake.unshift(head)

      // Check if food eaten
      if (head.x === food.x && head.y === food.y) {
        setScore(prev => prev + 10)
        generateFood()
      } else {
        newSnake.pop()
      }

      return newSnake
    })
  }, [direction, food, gameOver, isPaused, generateFood])

  useEffect(() => {
    if (!isActive) return

    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          setDirection(prev => prev !== 'down' ? 'up' : prev)
          break
        case 'ArrowDown':
          setDirection(prev => prev !== 'up' ? 'down' : prev)
          break
        case 'ArrowLeft':
          setDirection(prev => prev !== 'right' ? 'left' : prev)
          break
        case 'ArrowRight':
          setDirection(prev => prev !== 'left' ? 'right' : prev)
          break
        case ' ':
          setIsPaused(prev => !prev)
          break
        case 'r':
          resetGame()
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isActive])

  useEffect(() => {
    if (!isActive) return

    const gameLoop = setInterval(moveSnake, 150)
    return () => clearInterval(gameLoop)
  }, [moveSnake, isActive])

  if (!isActive) return null

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 10000,
      background: '#ecece0',
      border: '4px outset #cdc7bb',
      padding: '16px',
      fontFamily: 'MS Sans Serif, Arial, sans-serif'
    }}>
      {/* Title bar */}
      <div style={{
        background: '#000080',
        color: '#ffffff',
        padding: '4px 8px',
        margin: '-16px -16px 12px -16px',
        fontSize: '12px',
        fontWeight: 'bold',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <span>🐍 SNAKE GAME v1.0</span>
        <button
          onClick={onClose}
          style={{
            background: '#cdc7bb',
            border: '2px outset #cdc7bb',
            padding: '2px 6px',
            fontSize: '10px',
            cursor: 'pointer',
            color: '#000000'
          }}
        >
          ✕
        </button>
      </div>

      {/* Game board */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${boardSize}, ${cellSize}px)`,
        gridTemplateRows: `repeat(${boardSize}, ${cellSize}px)`,
        gap: '1px',
        background: '#000000',
        border: '2px inset #cdc7bb',
        marginBottom: '12px'
      }}>
        {Array.from({ length: boardSize * boardSize }, (_, i) => {
          const x = i % boardSize
          const y = Math.floor(i / boardSize)
          const isSnake = snake.some(segment => segment.x === x && segment.y === y)
          const isFood = food.x === x && food.y === y
          const isHead = snake[0]?.x === x && snake[0]?.y === y

          return (
            <div
              key={i}
              style={{
                width: cellSize,
                height: cellSize,
                background: isHead ? '#00ff00' : isSnake ? '#008000' : isFood ? '#ff0000' : '#000000',
                border: isHead ? '1px solid #ffffff' : 'none'
              }}
            />
          )
        })}
      </div>

      {/* Game info */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '12px',
        fontSize: '10px'
      }}>
        <div>Score: {score}</div>
        <div>Length: {snake.length}</div>
        <div>{isPaused ? 'PAUSED' : gameOver ? 'GAME OVER' : 'PLAYING'}</div>
      </div>

      {/* Controls */}
      <div style={{
        fontSize: '8px',
        color: '#808080',
        textAlign: 'center',
        marginBottom: '8px'
      }}>
        Arrow Keys: Move | Space: Pause | R: Reset
      </div>

      {/* Buttons */}
      <div style={{
        display: 'flex',
        gap: '8px',
        justifyContent: 'center'
      }}>
        <button
          onClick={resetGame}
          style={{
            background: '#cdc7bb',
            border: '2px outset #cdc7bb',
            padding: '4px 12px',
            fontSize: '10px',
            cursor: 'pointer',
            color: '#000000'
          }}
        >
          New Game
        </button>
        <button
          onClick={() => setIsPaused(prev => !prev)}
          style={{
            background: '#cdc7bb',
            border: '2px outset #cdc7bb',
            padding: '4px 12px',
            fontSize: '10px',
            cursor: 'pointer',
            color: '#000000'
          }}
        >
          {isPaused ? 'Resume' : 'Pause'}
        </button>
      </div>
    </div>
  )
} 