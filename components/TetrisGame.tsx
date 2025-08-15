'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

interface TetrisGameProps {
    isActive: boolean
    onClose: () => void
}

// Tetris piece shapes
const TETRIS_PIECES = {
    I: [
        [[1, 1, 1, 1]],
        [[1], [1], [1], [1]]
    ],
    O: [
        [[1, 1], [1, 1]]
    ],
    T: [
        [[0, 1, 0], [1, 1, 1]],
        [[1, 0], [1, 1], [1, 0]],
        [[1, 1, 1], [0, 1, 0]],
        [[0, 1], [1, 1], [0, 1]]
    ],
    S: [
        [[0, 1, 1], [1, 1, 0]],
        [[1, 0], [1, 1], [0, 1]]
    ],
    Z: [
        [[1, 1, 0], [0, 1, 1]],
        [[0, 1], [1, 1], [1, 0]]
    ],
    J: [
        [[1, 0, 0], [1, 1, 1]],
        [[1, 1], [1, 0], [1, 0]],
        [[1, 1, 1], [0, 0, 1]],
        [[0, 1], [0, 1], [1, 1]]
    ],
    L: [
        [[0, 0, 1], [1, 1, 1]],
        [[1, 0], [1, 0], [1, 1]],
        [[1, 1, 1], [1, 0, 0]],
        [[1, 1], [0, 1], [0, 1]]
    ]
}

const PIECE_COLORS = {
    I: '#00ffff', // Cyan
    O: '#ffff00', // Yellow
    T: '#800080', // Purple
    S: '#00ff00', // Green
    Z: '#ff0000', // Red
    J: '#0000ff', // Blue
    L: '#ffa500'  // Orange
}

interface Piece {
    type: keyof typeof TETRIS_PIECES
    rotation: number
    x: number
    y: number
}

export default function TetrisGame({ isActive, onClose }: TetrisGameProps) {
    const BOARD_WIDTH = 10
    const BOARD_HEIGHT = 20
    const CELL_SIZE = 20

    const [board, setBoard] = useState<(string | null)[][]>(() =>
        Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(null))
    )
    const [currentPiece, setCurrentPiece] = useState<Piece | null>(null)
    const [nextPiece, setNextPiece] = useState<keyof typeof TETRIS_PIECES>('T')
    const [score, setScore] = useState(0)
    const [lines, setLines] = useState(0)
    const [level, setLevel] = useState(1)
    const [gameOver, setGameOver] = useState(false)
    const [isPaused, setIsPaused] = useState(false)
    const gameLoopRef = useRef<NodeJS.Timeout>()

    const getRandomPiece = (): keyof typeof TETRIS_PIECES => {
        const pieces = Object.keys(TETRIS_PIECES) as (keyof typeof TETRIS_PIECES)[]
        return pieces[Math.floor(Math.random() * pieces.length)]
    }

    const createNewPiece = (type: keyof typeof TETRIS_PIECES): Piece => ({
        type,
        rotation: 0,
        x: Math.floor(BOARD_WIDTH / 2) - 1,
        y: 0
    })

    const getPieceShape = (piece: Piece) => {
        return TETRIS_PIECES[piece.type][piece.rotation]
    }

    const isValidPosition = (piece: Piece, board: (string | null)[][], offsetX = 0, offsetY = 0) => {
        const shape = getPieceShape(piece)

        for (let y = 0; y < shape.length; y++) {
            for (let x = 0; x < shape[y].length; x++) {
                if (shape[y][x]) {
                    const newX = piece.x + x + offsetX
                    const newY = piece.y + y + offsetY

                    if (newX < 0 || newX >= BOARD_WIDTH || newY >= BOARD_HEIGHT) {
                        return false
                    }

                    if (newY >= 0 && board[newY][newX]) {
                        return false
                    }
                }
            }
        }
        return true
    }

    const placePiece = (piece: Piece, board: (string | null)[][]) => {
        const newBoard = board.map(row => [...row])
        const shape = getPieceShape(piece)

        for (let y = 0; y < shape.length; y++) {
            for (let x = 0; x < shape[y].length; x++) {
                if (shape[y][x]) {
                    const boardY = piece.y + y
                    const boardX = piece.x + x
                    if (boardY >= 0) {
                        newBoard[boardY][boardX] = piece.type
                    }
                }
            }
        }
        return newBoard
    }

    const clearLines = (board: (string | null)[][]) => {
        const newBoard = board.filter(row => row.some(cell => cell === null))
        const clearedLines = BOARD_HEIGHT - newBoard.length

        while (newBoard.length < BOARD_HEIGHT) {
            newBoard.unshift(Array(BOARD_WIDTH).fill(null))
        }

        return { newBoard, clearedLines }
    }

    const spawnNewPiece = useCallback(() => {
        const newPiece = createNewPiece(nextPiece)
        setNextPiece(getRandomPiece())

        if (!isValidPosition(newPiece, board)) {
            setGameOver(true)
            return null
        }

        return newPiece
    }, [nextPiece, board])

    const movePiece = (direction: 'left' | 'right' | 'down') => {
        if (!currentPiece || gameOver || isPaused) return

        const offsetX = direction === 'left' ? -1 : direction === 'right' ? 1 : 0
        const offsetY = direction === 'down' ? 1 : 0

        if (isValidPosition(currentPiece, board, offsetX, offsetY)) {
            setCurrentPiece(prev => prev ? { ...prev, x: prev.x + offsetX, y: prev.y + offsetY } : null)
        } else if (direction === 'down') {
            // Piece can't move down, place it
            const newBoard = placePiece(currentPiece, board)
            const { newBoard: clearedBoard, clearedLines } = clearLines(newBoard)

            setBoard(clearedBoard)
            setLines(prev => prev + clearedLines)
            setScore(prev => prev + clearedLines * 100 * level + 10)
            setLevel(Math.floor(lines / 10) + 1)

            const nextPieceObj = spawnNewPiece()
            setCurrentPiece(nextPieceObj)
        }
    }

    const rotatePiece = () => {
        if (!currentPiece || gameOver || isPaused) return

        const newRotation = (currentPiece.rotation + 1) % TETRIS_PIECES[currentPiece.type].length
        const rotatedPiece = { ...currentPiece, rotation: newRotation }

        if (isValidPosition(rotatedPiece, board)) {
            setCurrentPiece(rotatedPiece)
        }
    }

    const hardDrop = () => {
        if (!currentPiece || gameOver || isPaused) return

        let dropDistance = 0
        while (isValidPosition(currentPiece, board, 0, dropDistance + 1)) {
            dropDistance++
        }

        const droppedPiece = { ...currentPiece, y: currentPiece.y + dropDistance }
        const newBoard = placePiece(droppedPiece, board)
        const { newBoard: clearedBoard, clearedLines } = clearLines(newBoard)

        setBoard(clearedBoard)
        setLines(prev => prev + clearedLines)
        setScore(prev => prev + clearedLines * 100 * level + dropDistance * 2)
        setLevel(Math.floor(lines / 10) + 1)

        const nextPieceObj = spawnNewPiece()
        setCurrentPiece(nextPieceObj)
    }

    const resetGame = () => {
        setBoard(Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(null)))
        setScore(0)
        setLines(0)
        setLevel(1)
        setGameOver(false)
        setIsPaused(false)
        setNextPiece(getRandomPiece())
        setCurrentPiece(createNewPiece(getRandomPiece()))
    }

    // Keyboard controls
    useEffect(() => {
        if (!isActive) return

        const handleKeyPress = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'ArrowLeft':
                    e.preventDefault()
                    movePiece('left')
                    break
                case 'ArrowRight':
                    e.preventDefault()
                    movePiece('right')
                    break
                case 'ArrowDown':
                    e.preventDefault()
                    movePiece('down')
                    break
                case 'ArrowUp':
                    e.preventDefault()
                    rotatePiece()
                    break
                case ' ':
                    e.preventDefault()
                    hardDrop()
                    break
                case 'p':
                    setIsPaused(prev => !prev)
                    break
                case 'r':
                    resetGame()
                    break
            }
        }

        window.addEventListener('keydown', handleKeyPress)
        return () => window.removeEventListener('keydown', handleKeyPress)
    }, [currentPiece, board, gameOver, isPaused, isActive])

    // Game loop
    useEffect(() => {
        if (!isActive || gameOver || isPaused) {
            if (gameLoopRef.current) {
                clearInterval(gameLoopRef.current)
            }
            return
        }

        const speed = Math.max(50, 500 - (level - 1) * 50)
        gameLoopRef.current = setInterval(() => {
            movePiece('down')
        }, speed)

        return () => {
            if (gameLoopRef.current) {
                clearInterval(gameLoopRef.current)
            }
        }
    }, [currentPiece, board, level, gameOver, isPaused, isActive])

    // Initialize game
    useEffect(() => {
        if (isActive && !currentPiece && !gameOver) {
            setCurrentPiece(createNewPiece(getRandomPiece()))
        }
    }, [isActive])

    const renderBoard = () => {
        const displayBoard = board.map(row => [...row])

        // Add current piece to display board
        if (currentPiece) {
            const shape = getPieceShape(currentPiece)
            for (let y = 0; y < shape.length; y++) {
                for (let x = 0; x < shape[y].length; x++) {
                    if (shape[y][x]) {
                        const boardY = currentPiece.y + y
                        const boardX = currentPiece.x + x
                        if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
                            displayBoard[boardY][boardX] = currentPiece.type
                        }
                    }
                }
            }
        }

        return displayBoard.map((row, y) => (
            <div key={y} style={{ display: 'flex' }}>
                {row.map((cell, x) => (
                    <div
                        key={x}
                        style={{
                            width: CELL_SIZE,
                            height: CELL_SIZE,
                            border: '1px solid #333',
                            background: cell ? PIECE_COLORS[cell as keyof typeof PIECE_COLORS] : '#000',
                            boxSizing: 'border-box'
                        }}
                    />
                ))}
            </div>
        ))
    }

    const renderNextPiece = () => {
        const shape = TETRIS_PIECES[nextPiece][0]
        return (
            <div style={{ display: 'inline-block' }}>
                {shape.map((row, y) => (
                    <div key={y} style={{ display: 'flex' }}>
                        {row.map((cell, x) => (
                            <div
                                key={x}
                                style={{
                                    width: 15,
                                    height: 15,
                                    border: '1px solid #333',
                                    background: cell ? PIECE_COLORS[nextPiece] : '#000',
                                    boxSizing: 'border-box'
                                }}
                            />
                        ))}
                    </div>
                ))}
            </div>
        )
    }

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
            fontFamily: 'MS Sans Serif, Arial, sans-serif',
            maxHeight: '90vh',
            overflow: 'auto'
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
                <span>🧩 TETRIS v1.0</span>
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

            <div style={{ display: 'flex', gap: '16px' }}>
                {/* Game board */}
                <div style={{
                    border: '2px inset #cdc7bb',
                    background: '#000',
                    padding: '2px'
                }}>
                    {renderBoard()}
                </div>

                {/* Side panel */}
                <div style={{ minWidth: '120px' }}>
                    {/* Next piece */}
                    <div style={{
                        border: '2px inset #cdc7bb',
                        padding: '8px',
                        marginBottom: '8px',
                        background: '#ffffff'
                    }}>
                        <div style={{ fontSize: '10px', fontWeight: 'bold', marginBottom: '4px' }}>NEXT:</div>
                        {renderNextPiece()}
                    </div>

                    {/* Stats */}
                    <div style={{
                        border: '2px inset #cdc7bb',
                        padding: '8px',
                        marginBottom: '8px',
                        background: '#ffffff',
                        fontSize: '10px'
                    }}>
                        <div>Score: {score}</div>
                        <div>Lines: {lines}</div>
                        <div>Level: {level}</div>
                        <div style={{ marginTop: '4px', fontWeight: 'bold' }}>
                            {gameOver ? 'GAME OVER' : isPaused ? 'PAUSED' : 'PLAYING'}
                        </div>
                    </div>

                    {/* Controls */}
                    <div style={{
                        border: '2px inset #cdc7bb',
                        padding: '8px',
                        marginBottom: '8px',
                        background: '#ffffff',
                        fontSize: '8px',
                        lineHeight: '1.2'
                    }}>
                        <div>← → Move</div>
                        <div>↓ Soft Drop</div>
                        <div>↑ Rotate</div>
                        <div>Space: Hard Drop</div>
                        <div>P: Pause</div>
                        <div>R: Reset</div>
                    </div>

                    {/* Buttons */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <button
                            onClick={resetGame}
                            style={{
                                background: '#cdc7bb',
                                border: '2px outset #cdc7bb',
                                padding: '4px 8px',
                                fontSize: '10px',
                                cursor: 'pointer',
                                color: '#000000'
                            }}
                        >
                            New Game
                        </button>
                        <button
                            onClick={() => setIsPaused(prev => !prev)}
                            disabled={gameOver}
                            style={{
                                background: gameOver ? '#999' : '#cdc7bb',
                                border: '2px outset #cdc7bb',
                                padding: '4px 8px',
                                fontSize: '10px',
                                cursor: gameOver ? 'not-allowed' : 'pointer',
                                color: '#000000'
                            }}
                        >
                            {isPaused ? 'Resume' : 'Pause'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}