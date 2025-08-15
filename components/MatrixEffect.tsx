'use client'

import { useState, useEffect, useRef } from 'react'

interface MatrixEffectProps {
    isActive: boolean
    onClose: () => void
}

// Matrix characters - mix of Japanese katakana, numbers, and symbols
const MATRIX_CHARS = [
    // Japanese Katakana
    'ア', 'イ', 'ウ', 'エ', 'オ', 'カ', 'キ', 'ク', 'ケ', 'コ',
    'サ', 'シ', 'ス', 'セ', 'ソ', 'タ', 'チ', 'ツ', 'テ', 'ト',
    'ナ', 'ニ', 'ヌ', 'ネ', 'ノ', 'ハ', 'ヒ', 'フ', 'ヘ', 'ホ',
    'マ', 'ミ', 'ム', 'メ', 'モ', 'ヤ', 'ユ', 'ヨ', 'ラ', 'リ',
    'ル', 'レ', 'ロ', 'ワ', 'ヲ', 'ン',
    // Numbers and symbols
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    '!', '@', '#', '$', '%', '^', '&', '*', '(', ')',
    '-', '_', '=', '+', '[', ']', '{', '}', '|', '\\',
    ';', ':', '"', "'", '<', '>', ',', '.', '?', '/'
]

interface MatrixColumn {
    x: number
    y: number
    speed: number
    chars: string[]
    opacity: number[]
}

export default function MatrixEffect({ isActive, onClose }: MatrixEffectProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const animationRef = useRef<number>()
    const columnsRef = useRef<MatrixColumn[]>([])
    const [showCloseButton, setShowCloseButton] = useState(false)

    useEffect(() => {
        if (!isActive) return

        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        resizeCanvas()
        window.addEventListener('resize', resizeCanvas)

        // Initialize matrix columns
        const columnWidth = 20
        const numColumns = Math.floor(canvas.width / columnWidth)

        columnsRef.current = Array.from({ length: numColumns }, (_, i) => ({
            x: i * columnWidth,
            y: Math.random() * canvas.height,
            speed: Math.random() * 3 + 1,
            chars: Array.from({ length: 30 }, () =>
                MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]
            ),
            opacity: Array.from({ length: 30 }, (_, j) => Math.max(0, 1 - j * 0.05))
        }))

        // Show close button after 2 seconds
        const closeButtonTimer = setTimeout(() => {
            setShowCloseButton(true)
        }, 2000)

        // Auto-close after 10 seconds
        const autoCloseTimer = setTimeout(() => {
            onClose()
        }, 10000)

        // Animation loop
        const animate = () => {
            // Clear canvas with slight trail effect
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            // Draw matrix columns
            columnsRef.current.forEach(column => {
                column.chars.forEach((char, i) => {
                    const y = column.y + i * 20

                    if (y > canvas.height) {
                        // Reset column when it goes off screen
                        column.y = -600
                        column.speed = Math.random() * 3 + 1
                        column.chars = Array.from({ length: 30 }, () =>
                            MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]
                        )
                    }

                    // Set character color and opacity
                    const opacity = column.opacity[i] || 0
                    if (i === 0) {
                        // Leading character is bright white
                        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
                    } else if (i < 5) {
                        // Next few characters are bright green
                        ctx.fillStyle = `rgba(0, 255, 0, ${opacity})`
                    } else {
                        // Trailing characters are darker green
                        ctx.fillStyle = `rgba(0, 150, 0, ${opacity * 0.7})`
                    }

                    // Draw character
                    ctx.font = '16px Courier New, monospace'
                    ctx.fillText(char, column.x, y)

                    // Occasionally change character
                    if (Math.random() < 0.02) {
                        column.chars[i] = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]
                    }
                })

                // Move column down
                column.y += column.speed
            })

            animationRef.current = requestAnimationFrame(animate)
        }

        animate()

        // Cleanup
        return () => {
            window.removeEventListener('resize', resizeCanvas)
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
            clearTimeout(closeButtonTimer)
            clearTimeout(autoCloseTimer)
        }
    }, [isActive, onClose])

    if (!isActive) return null

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 9999,
            background: '#000000'
        }}>
            <canvas
                ref={canvasRef}
                style={{
                    display: 'block',
                    width: '100%',
                    height: '100%'
                }}
            />

            {/* Matrix-style close button */}
            {showCloseButton && (
                <div style={{
                    position: 'fixed',
                    top: '20px',
                    right: '20px',
                    zIndex: 10001,
                    background: '#000000',
                    border: '2px solid #00ff00',
                    padding: '8px 12px',
                    cursor: 'pointer',
                    fontFamily: 'Courier New, monospace',
                    fontSize: '12px',
                    color: '#00ff00',
                    textShadow: '0 0 10px #00ff00',
                    boxShadow: '0 0 20px rgba(0, 255, 0, 0.3)',
                    transition: 'all 0.3s ease'
                }}
                    onClick={onClose}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#003300'
                        e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 255, 0, 0.5)'
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#000000'
                        e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 255, 0, 0.3)'
                    }}
                >
                    ✕ EXIT MATRIX
                </div>
            )}

            {/* Matrix-style info display */}
            <div style={{
                position: 'fixed',
                bottom: '20px',
                left: '20px',
                zIndex: 10001,
                background: 'rgba(0, 0, 0, 0.8)',
                border: '1px solid #00ff00',
                padding: '8px 12px',
                fontFamily: 'Courier New, monospace',
                fontSize: '10px',
                color: '#00ff00',
                textShadow: '0 0 5px #00ff00'
            }}>
                <div>MATRIX DIGITAL RAIN v1.0</div>
                <div style={{ opacity: 0.7 }}>Press Ctrl+M to exit</div>
            </div>
        </div>
    )
}