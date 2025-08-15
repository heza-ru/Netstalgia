'use client'

import { useEffect, useState } from 'react'

export default function CRTEffects() {
    const [isActive, setIsActive] = useState(true)

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            // Toggle CRT effects with 'C' key
            if (e.key === 'c' || e.key === 'C') {
                setIsActive(prev => !prev)
            }
        }

        const handleEasterEggActivation = (e: CustomEvent) => {
            if (e.detail.type === 'crt-effect') {
                setIsActive(true)

                // Auto-disable after 15 seconds
                setTimeout(() => {
                    setIsActive(false)
                }, 15000)
            }
        }

        document.addEventListener('keydown', handleKeyPress)
        window.addEventListener('triggerEasterEgg', handleEasterEggActivation as EventListener)

        return () => {
            document.removeEventListener('keydown', handleKeyPress)
            window.removeEventListener('triggerEasterEgg', handleEasterEggActivation as EventListener)
        }
    }, [])

    // Apply CRT class to body when active
    useEffect(() => {
        if (isActive) {
            document.body.classList.add('crt-mode-active')
        } else {
            document.body.classList.remove('crt-mode-active')
        }

        return () => {
            document.body.classList.remove('crt-mode-active')
        }
    }, [isActive])

    if (!isActive) {
        return (
            <div
                onClick={() => setIsActive(true)}
                style={{
                    position: 'fixed',
                    top: '10px',
                    right: '10px',
                    background: '#333333',
                    color: '#cccccc',
                    padding: '4px 8px',
                    fontSize: '12px',
                    fontFamily: 'Courier New, monospace',
                    border: '1px solid #666666',
                    zIndex: 10001,
                    imageRendering: 'pixelated',
                    cursor: 'pointer',
                    userSelect: 'none',
                    opacity: 0.7
                }}
                title="Click to turn on CRT mode or press 'C' key"
            >
                CRT MODE OFF - CLICK TO TURN ON
            </div>
        )
    }

    return (
        <>
            {/* Enhanced CRT Scanlines Overlay */}
            <div className="crt-scanlines-enhanced" />

            {/* Enhanced CRT Flicker Effect */}
            <div className="crt-flicker-enhanced" />

            {/* Enhanced CRT Curvature Effect */}
            <div className="crt-curvature-enhanced" />

            {/* CRT Phosphor Glow Effect */}
            <div className="crt-phosphor-glow" />

            {/* Aggressive RGB Sub-pixel Effects */}
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none',
                    zIndex: 9996,
                    background: `
                        repeating-linear-gradient(
                            90deg,
                            transparent,
                            transparent 0.5px,
                            rgba(255, 0, 0, 0.04) 0.5px,
                            rgba(255, 0, 0, 0.04) 1px,
                            transparent 1px,
                            transparent 1.5px,
                            rgba(0, 255, 0, 0.04) 1.5px,
                            rgba(0, 255, 0, 0.04) 2px,
                            transparent 2px,
                            transparent 2.5px,
                            rgba(0, 0, 255, 0.04) 2.5px,
                            rgba(0, 0, 255, 0.04) 3px
                        )
                    `
                }}
            />

            {/* Aggressive CRT Noise Effect */}
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none',
                    zIndex: 9995,
                    background: `
                        url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><defs><filter id='noise'><feTurbulence baseFrequency='1.2' numOctaves='6' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter></defs><rect width='100%' height='100%' filter='url(%23noise)' opacity='0.06'/></svg>")
                    `,
                    animation: 'aggressiveCrtNoise 0.15s steps(12, end) infinite'
                }}
            />

            {/* CRT Bloom Effect */}
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none',
                    zIndex: 9994,
                    background: `
                        radial-gradient(
                            circle at 25% 25%,
                            rgba(255, 255, 255, 0.02) 0%,
                            transparent 30%
                        ),
                        radial-gradient(
                            circle at 75% 75%,
                            rgba(255, 255, 255, 0.02) 0%,
                            transparent 30%
                        )
                    `,
                    filter: 'blur(1px)'
                }}
            />

            {/* CRT Barrel Distortion Simulation */}
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none',
                    zIndex: 9993,
                    background: `
                        linear-gradient(
                            0deg,
                            rgba(0, 0, 0, 0.15) 0%,
                            transparent 5%,
                            transparent 95%,
                            rgba(0, 0, 0, 0.15) 100%
                        ),
                        linear-gradient(
                            90deg,
                            rgba(0, 0, 0, 0.15) 0%,
                            transparent 5%,
                            transparent 95%,
                            rgba(0, 0, 0, 0.15) 100%
                        )
                    `,
                    borderRadius: '12px'
                }}
            />

            {/* Status indicator with toggle button */}
            <div
                onClick={() => setIsActive(false)}
                style={{
                    position: 'fixed',
                    top: '10px',
                    right: '10px',
                    background: '#000000',
                    color: '#00ff00',
                    padding: '4px 8px',
                    fontSize: '12px',
                    fontFamily: 'Courier New, monospace',
                    border: '1px solid #00ff00',
                    zIndex: 10001,
                    imageRendering: 'pixelated',
                    textShadow: '0 0 2px #00ff00',
                    cursor: 'pointer',
                    userSelect: 'none'
                }}
                title="Click to turn off CRT mode or press 'C' key"
            >
                CRT MODE ON - CLICK TO TURN OFF
            </div>
        </>
    )
}