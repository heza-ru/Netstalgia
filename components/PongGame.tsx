'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

interface PongGameProps {
    isActive: boolean
    onClose: () => void
}

interface Position {
    x: number
    y: number
}

interface Ball extends Position {
    dx: number
    dy: number
    speed: number
}

interface Paddle extends Position {
    width: number
    height: number
    speed: number
}

export default function PongGame({ isActive, onClose }: PongGameProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const animationRef = useRef<number>()

    const CANVAS_WIDTH = 400
    const CANVAS_HEIGHT = 300
    const PADDLE_WIDTH = 10
    const PADDLE_HEIGHT = 60
    const BALL_SIZE = 8
    const WINNING_SCORE = 5

    const [leftPaddle, setLeftPaddle] = useState<Paddle>({
        x: 20,
        y: CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2,
        width: PADDLE_WIDTH,
        height: PADDLE_HEIGHT,
        speed: 5
    })

    const [rightPaddle, setRightPaddle] = useState<Paddle>({
        x: CANVAS_WIDTH - 30,
        y: CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2,
        width: PADDLE_WIDTH,
        height: PADDLE_HEIGHT,
        speed: 5
    })

    const [ball, setBall] = useState<Ball>({
        x: CANVAS_WIDTH / 2,
        y: CANVAS_HEIGHT / 2,
        dx: 3,
        dy: 2,
        speed: 3
    })

    const [leftScore, setLeftScore] = useState(0)
    const [rightScore, setRightScore] = useState(0)
    const [gameState, setGameState] = useState<'playing' | 'paused' | 'gameOver'>('playing')
    const [winner, setWinner] = useState<'left' | 'right' | null>(null)
    const [keys, setKeys] = useState<Set<string>>(new Set())

    const resetBall = useCallback(() => {
        setBall({
            x: CANVAS_WIDTH / 2,
            y: CANVAS_HEIGHT / 2,
            dx: Math.random() > 0.5 ? 3 : -3,
            dy: (Math.random() - 0.5) * 4,
            speed: 3
        })
    }, [])

    const resetGame = () => {
        setLeftScore(0)
        setRightScore(0)
        setGameState('playing')
        setWinner(null)
        setLeftPaddle(prev => ({ ...prev, y: CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2 }))
        setRightPaddle(prev => ({ ...prev, y: CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2 }))
        resetBall()
    }

    // Keyboard controls
    useEffect(() => {
        if (!isActive) return

        const handleKeyDown = (e: KeyboardEvent) => {
            setKeys(prev => new Set(prev).add(e.key))

            if (e.key === 'p' || e.key === 'P') {
                setGameState(prev => prev === 'paused' ? 'playing' : 'paused')
            }
            if (e.key === 'r' || e.key === 'R') {
                resetGame()
            }
        }

        const handleKeyUp = (e: KeyboardEvent) => {
            setKeys(prev => {
                const newKeys = new Set(prev)
                newKeys.delete(e.key)
                return newKeys
            })
        }

        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('keyup', handleKeyUp)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('keyup', handleKeyUp)
        }
    }, [isActive])

    // Game loop
    useEffect(() => {
        if (!isActive || gameState !== 'playing') return

        const gameLoop = () => {
            // Move paddles based on keys
            setLeftPaddle(prev => {
                let newY = prev.y
                if (keys.has('w') || keys.has('W')) {
                    newY = Math.max(0, prev.y - prev.speed)
                }
                if (keys.has('s') || keys.has('S')) {
                    newY = Math.min(CANVAS_HEIGHT - prev.height, prev.y + prev.speed)
                }
                return { ...prev, y: newY }
            })

            setRightPaddle(prev => {
                let newY = prev.y
                if (keys.has('ArrowUp')) {
                    newY = Math.max(0, prev.y - prev.speed)
                }
                if (keys.has('ArrowDown')) {
                    newY = Math.min(CANVAS_HEIGHT - prev.height, prev.y + prev.speed)
                }
                return { ...prev, y: newY }
            })

            // Move ball
            setBall(prev => {
                let newX = prev.x + prev.dx
                let newY = prev.y + prev.dy
                let newDx = prev.dx
                let newDy = prev.dy

                // Ball collision with top/bottom walls
                if (newY <= BALL_SIZE / 2 || newY >= CANVAS_HEIGHT - BALL_SIZE / 2) {
                    newDy = -newDy
                    newY = newY <= BALL_SIZE / 2 ? BALL_SIZE / 2 : CANVAS_HEIGHT - BALL_SIZE / 2
                }

                // Ball collision with left paddle
                if (newX - BALL_SIZE / 2 <= leftPaddle.x + leftPaddle.width &&
                    newX + BALL_SIZE / 2 >= leftPaddle.x &&
                    newY >= leftPaddle.y &&
                    newY <= leftPaddle.y + leftPaddle.height &&
                    newDx < 0) {
                    newDx = -newDx
                    newX = leftPaddle.x + leftPaddle.width + BALL_SIZE / 2
                    // Add spin based on where ball hits paddle
                    const hitPos = (newY - leftPaddle.y) / leftPaddle.height - 0.5
                    newDy += hitPos * 2
                }

                // Ball collision with right paddle
                if (newX + BALL_SIZE / 2 >= rightPaddle.x &&
                    newX - BALL_SIZE / 2 <= rightPaddle.x + rightPaddle.width &&
                    newY >= rightPaddle.y &&
                    newY <= rightPaddle.y + rightPaddle.height &&
                    newDx > 0) {
                    newDx = -newDx
                    newX = rightPaddle.x - BALL_SIZE / 2
                    // Add spin based on where ball hits paddle
                    const hitPos = (newY - rightPaddle.y) / rightPaddle.height - 0.5
                    newDy += hitPos * 2
                }

                // Ball goes off left side (right player scores)
                if (newX < 0) {
                    setRightScore(prev => {
                        const newScore = prev + 1
                        if (newScore >= WINNING_SCORE) {
                            setWinner('right')
                            setGameState('gameOver')
                        }
                        return newScore
                    })
                    setTimeout(resetBall, 1000)
                    return { ...prev, x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 2, dx: 3, dy: 0 }
                }

                // Ball goes off right side (left player scores)
                if (newX > CANVAS_WIDTH) {
                    setLeftScore(prev => {
                        const newScore = prev + 1
                        if (newScore >= WINNING_SCORE) {
                            setWinner('left')
                            setGameState('gameOver')
                        }
                        return newScore
                    })
                    setTimeout(resetBall, 1000)
                    return { ...prev, x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 2, dx: -3, dy: 0 }
                }

                // Limit ball speed
                const maxSpeed = 8
                if (Math.abs(newDx) > maxSpeed) newDx = newDx > 0 ? maxSpeed : -maxSpeed
                if (Math.abs(newDy) > maxSpeed) newDy = newDy > 0 ? maxSpeed : -maxSpeed

                return { ...prev, x: newX, y: newY, dx: newDx, dy: newDy }
            })

            animationRef.current = requestAnimationFrame(gameLoop)
        }

        animationRef.current = requestAnimationFrame(gameLoop)

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
        }
    }, [isActive, gameState, keys, leftPaddle, rightPaddle, resetBall])

    // Canvas rendering
    useEffect(() => {
        if (!isActive) return

        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const render = () => {
            // Clear canvas
            ctx.fillStyle = '#000000'
            ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

            // Draw center line
            ctx.strokeStyle = '#ffffff'
            ctx.lineWidth = 2
            ctx.setLineDash([5, 5])
            ctx.beginPath()
            ctx.moveTo(CANVAS_WIDTH / 2, 0)
            ctx.lineTo(CANVAS_WIDTH / 2, CANVAS_HEIGHT)
            ctx.stroke()
            ctx.setLineDash([])

            // Draw paddles
            ctx.fillStyle = '#ffffff'
            ctx.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height)
            ctx.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height)

            // Draw ball
            ctx.beginPath()
            ctx.arc(ball.x, ball.y, BALL_SIZE / 2, 0, Math.PI * 2)
            ctx.fill()

            // Draw scores
            ctx.font = '24px Courier New, monospace'
            ctx.textAlign = 'center'
            ctx.fillText(leftScore.toString(), CANVAS_WIDTH / 4, 40)
            ctx.fillText(rightScore.toString(), (CANVAS_WIDTH * 3) / 4, 40)

            // Draw game state messages
            if (gameState === 'paused') {
                ctx.font = '20px Courier New, monospace'
                ctx.fillText('PAUSED', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2)
                ctx.font = '12px Courier New, monospace'
                ctx.fillText('Press P to resume', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 25)
            }

            if (gameState === 'gameOver') {
                ctx.font = '20px Courier New, monospace'
                ctx.fillText(`${winner?.toUpperCase()} WINS!`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2)
                ctx.font = '12px Courier New, monospace'
                ctx.fillText('Press R to restart', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 25)
            }

            requestAnimationFrame(render)
        }

        render()
    }, [isActive, leftPaddle, rightPaddle, ball, leftScore, rightScore, gameState, winner])

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
                <span>🏓 PONG v1.0</span>
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

            {/* Game canvas */}
            <canvas
                ref={canvasRef}
                width={CANVAS_WIDTH}
                height={CANVAS_HEIGHT}
                style={{
                    border: '2px inset #cdc7bb',
                    display: 'block',
                    marginBottom: '12px'
                }}
            />

            {/* Game info */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '8px',
                fontSize: '10px'
            }}>
                <div>Left: {leftScore}</div>
                <div>First to {WINNING_SCORE} wins!</div>
                <div>Right: {rightScore}</div>
            </div>

            {/* Controls */}
            <div style={{
                fontSize: '8px',
                color: '#808080',
                textAlign: 'center',
                marginBottom: '8px',
                lineHeight: '1.2'
            }}>
                Left Player: W/S | Right Player: ↑/↓ | P: Pause | R: Reset
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
                    onClick={() => setGameState(prev => prev === 'paused' ? 'playing' : 'paused')}
                    disabled={gameState === 'gameOver'}
                    style={{
                        background: gameState === 'gameOver' ? '#999' : '#cdc7bb',
                        border: '2px outset #cdc7bb',
                        padding: '4px 12px',
                        fontSize: '10px',
                        cursor: gameState === 'gameOver' ? 'not-allowed' : 'pointer',
                        color: '#000000'
                    }}
                >
                    {gameState === 'paused' ? 'Resume' : 'Pause'}
                </button>
            </div>
        </div>
    )
}