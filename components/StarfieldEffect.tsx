'use client'

import { useState, useEffect, useRef } from 'react'

interface StarfieldEffectProps {
    isActive: boolean
    onClose: () => void
}

interface Star {
    x: number
    y: number
    z: number
    prevX: number
    prevY: number
    speed: number
    color: string
    size: number
}

export default function StarfieldEffect({ isActive, onClose }: StarfieldEffectProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const animationRef = useRef<number>()
    const starsRef = useRef<Star[]>([])
    const [showCloseButton, setShowCloseButton] = useState(false)
    const [warpSpeed, setWarpSpeed] = useState(1)

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

        // Initialize stars
        const numStars = 800
        const centerX = canvas.width / 2
        const centerY = canvas.height / 2

        starsRef.current = Array.from({ length: numStars }, () => {
            const angle = Math.random() * Math.PI * 2
            const distance = Math.random() * 1000
            return {
                x: centerX + Math.cos(angle) * distance,
                y: centerY + Math.sin(angle) * distance,
                z: Math.random() * 1000,
                prevX: 0,
                prevY: 0,
                speed: Math.random() * 2 + 0.5,
                color: ['#ffffff', '#ffff99', '#99ccff', '#ff9999'][Math.floor(Math.random() * 4)],
                size: Math.random() * 2 + 1
            }
        })

        // Show close button after 2 seconds
        const closeButtonTimer = setTimeout(() => {
            setShowCloseButton(true)
        }, 2000)

        // Auto-close after 10 seconds
        const autoCloseTimer = setTimeout(() => {
            onClose()
        }, 10000)

        // Gradually increase warp speed
        const warpTimer = setInterval(() => {
            setWarpSpeed(prev => Math.min(prev + 0.1, 3))
        }, 500)

        // Animation loop
        const animate = () => {
            // Clear canvas
            ctx.fillStyle = 'rgba(0, 0, 20, 0.1)'
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            const centerX = canvas.width / 2
            const centerY = canvas.height / 2

            starsRef.current.forEach(star => {
                // Store previous position for trail effect
                star.prevX = star.x
                star.prevY = star.y

                // Move star towards viewer
                star.z -= star.speed * warpSpeed

                // Reset star if it's too close
                if (star.z <= 0) {
                    const angle = Math.random() * Math.PI * 2
                    const distance = Math.random() * 1000
                    star.x = centerX + Math.cos(angle) * distance
                    star.y = centerY + Math.sin(angle) * distance
                    star.z = 1000
                    star.color = ['#ffffff', '#ffff99', '#99ccff', '#ff9999'][Math.floor(Math.random() * 4)]
                }

                // Calculate screen position
                const screenX = (star.x - centerX) * (200 / star.z) + centerX
                const screenY = (star.y - centerY) * (200 / star.z) + centerY

                // Calculate previous screen position for trail
                const prevScreenX = (star.prevX - centerX) * (200 / (star.z + star.speed * warpSpeed)) + centerX
                const prevScreenY = (star.prevY - centerY) * (200 / (star.z + star.speed * warpSpeed)) + centerY

                // Only draw if star is on screen
                if (screenX >= 0 && screenX <= canvas.width && screenY >= 0 && screenY <= canvas.height) {
                    // Calculate star size based on distance
                    const size = (1 - star.z / 1000) * star.size * 3
                    const opacity = Math.max(0, 1 - star.z / 1000)

                    // Draw star trail for warp effect
                    if (warpSpeed > 1.5) {
                        ctx.strokeStyle = `${star.color}${Math.floor(opacity * 100).toString(16).padStart(2, '0')}`
                        ctx.lineWidth = size * 0.5
                        ctx.beginPath()
                        ctx.moveTo(prevScreenX, prevScreenY)
                        ctx.lineTo(screenX, screenY)
                        ctx.stroke()
                    }

                    // Draw star
                    ctx.fillStyle = `${star.color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`
                    ctx.beginPath()
                    ctx.arc(screenX, screenY, size, 0, Math.PI * 2)
                    ctx.fill()

                    // Add glow effect for bright stars
                    if (size > 2) {
                        ctx.shadowColor = star.color
                        ctx.shadowBlur = size * 2
                        ctx.beginPath()
                        ctx.arc(screenX, screenY, size * 0.5, 0, Math.PI * 2)
                        ctx.fill()
                        ctx.shadowBlur = 0
                    }
                }
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
            clearInterval(warpTimer)
        }
    }, [isActive, onClose, warpSpeed])

    if (!isActive) return null

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 9999,
            background: 'radial-gradient(ellipse at center, #001122 0%, #000000 100%)'
        }}>
            <canvas
                ref={canvasRef}
                style={{
                    display: 'block',
                    width: '100%',
                    height: '100%'
                }}
            />

            {/* 90s-style close button */}
            {showCloseButton && (
                <div style={{
                    position: 'fixed',
                    top: '20px',
                    right: '20px',
                    zIndex: 10001,
                    background: '#ecece0',
                    border: '3px outset #cdc7bb',
                    padding: '8px 12px',
                    cursor: 'pointer',
                    fontFamily: 'MS Sans Serif, Arial, sans-serif',
                    fontSize: '10px',
                    color: '#000000',
                    boxShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                    transition: 'all 0.2s ease'
                }}
                    onClick={onClose}
                    onMouseDown={(e) => {
                        e.currentTarget.style.border = '3px inset #cdc7bb'
                    }}
                    onMouseUp={(e) => {
                        e.currentTarget.style.border = '3px outset #cdc7bb'
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.border = '3px outset #cdc7bb'
                    }}
                >
                    ✕ STARFIELD
                </div>
            )}

            {/* Warp speed indicator */}
            <div style={{
                position: 'fixed',
                bottom: '20px',
                left: '20px',
                zIndex: 10001,
                background: 'rgba(236, 236, 224, 0.9)',
                border: '2px outset #cdc7bb',
                padding: '8px 12px',
                fontFamily: 'MS Sans Serif, Arial, sans-serif',
                fontSize: '10px',
                color: '#000000'
            }}>
                <div>🚀 STARFIELD SCREENSAVER v2.0</div>
                <div>Warp Speed: {warpSpeed.toFixed(1)}</div>
                <div style={{ opacity: 0.7 }}>Press S to exit</div>
            </div>

            {/* 90s-style decorative elements */}
            <div style={{
                position: 'fixed',
                top: '50%',
                left: '20px',
                transform: 'translateY(-50%)',
                zIndex: 10000,
                opacity: 0.3,
                fontSize: '12px',
                color: '#ffffff',
                fontFamily: 'Courier New, monospace',
                writingMode: 'vertical-rl',
                textOrientation: 'mixed'
            }}>
                STARFIELD • WARP DRIVE • ENGAGE
            </div>

            <div style={{
                position: 'fixed',
                top: '50%',
                right: '20px',
                transform: 'translateY(-50%)',
                zIndex: 10000,
                opacity: 0.3,
                fontSize: '12px',
                color: '#ffffff',
                fontFamily: 'Courier New, monospace',
                writingMode: 'vertical-lr',
                textOrientation: 'mixed'
            }}>
                HYPERSPACE • NAVIGATION • ACTIVE
            </div>
        </div>
    )
}