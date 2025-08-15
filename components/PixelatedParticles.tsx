'use client'

import { useEffect, useState } from 'react'

interface Particle {
    id: number
    x: number
    y: number
    vx: number
    vy: number
    color: string
    size: number
    life: number
    maxLife: number
}

export default function PixelatedParticles() {
    const [particles, setParticles] = useState<Particle[]>([])

    const createParticle = (x: number, y: number, type: 'sparkle' | 'explosion' | 'float' = 'sparkle') => {
        const colors = ['#ffff00', '#ff0000', '#00ff00', '#0000ff', '#ff00ff', '#00ffff', '#ffffff']

        // Snap to 8x8 pixel grid for authentic low-res effect
        const gridX = Math.floor(x / 8) * 8
        const gridY = Math.floor(y / 8) * 8

        const particle: Particle = {
            id: Date.now() + Math.random(),
            x: gridX,
            y: gridY,
            vx: Math.floor((Math.random() - 0.5) * (type === 'explosion' ? 16 : 4)) / 2, // Chunky movement
            vy: Math.floor((Math.random() - 0.5) * (type === 'explosion' ? 16 : 4)) / 2 - (type === 'float' ? 2 : 0),
            color: colors[Math.floor(Math.random() * colors.length)],
            size: type === 'explosion' ? Math.floor(Math.random() * 3 + 2) * 4 : Math.floor(Math.random() * 2 + 1) * 4, // 4px, 8px, 12px, etc.
            life: type === 'explosion' ? 60 : 120,
            maxLife: type === 'explosion' ? 60 : 120
        }
        return particle
    }

    const createParticleBurst = (x: number, y: number, count: number, type: 'sparkle' | 'explosion' | 'float' = 'sparkle') => {
        const newParticles: Particle[] = []
        for (let i = 0; i < count; i++) {
            newParticles.push(createParticle(
                x + (Math.random() - 0.5) * 20,
                y + (Math.random() - 0.5) * 20,
                type
            ))
        }
        setParticles(prev => [...prev, ...newParticles])
    }

    useEffect(() => {
        const handleEasterEggActivation = (e: CustomEvent) => {
            const rect = document.body.getBoundingClientRect()
            const centerX = window.innerWidth / 2
            const centerY = window.innerHeight / 2

            switch (e.detail.type) {
                case 'starfield-effect':
                    // Create floating particles across the screen
                    for (let i = 0; i < 20; i++) {
                        setTimeout(() => {
                            createParticleBurst(
                                Math.random() * window.innerWidth,
                                Math.random() * window.innerHeight,
                                3,
                                'float'
                            )
                        }, i * 200)
                    }
                    break

                case 'matrix-effect':
                    // Create cascading particles
                    for (let i = 0; i < 10; i++) {
                        setTimeout(() => {
                            createParticleBurst(
                                Math.random() * window.innerWidth,
                                0,
                                5,
                                'float'
                            )
                        }, i * 300)
                    }
                    break

                case 'explosion-effect':
                    createParticleBurst(centerX, centerY, 15, 'explosion')
                    break

                case 'hover-particles':
                    // Create particles at specific hover location
                    const hoverX = e.detail.x || centerX
                    const hoverY = e.detail.y || centerY
                    createParticleBurst(hoverX, hoverY, 5, 'sparkle')
                    break

                default:
                    createParticleBurst(centerX, centerY, 8, 'sparkle')
            }
        }

        const handleClick = (e: MouseEvent) => {
            // Random chance to create particles on click
            if (Math.random() > 0.8) {
                createParticleBurst(e.clientX, e.clientY, 3, 'sparkle')
            }
        }

        window.addEventListener('triggerEasterEgg', handleEasterEggActivation as EventListener)
        document.addEventListener('click', handleClick)

        // Animation loop - slower for chunky movement
        const animationInterval = setInterval(() => {
            setParticles(prev => {
                return prev
                    .map(particle => ({
                        ...particle,
                        x: Math.floor((particle.x + particle.vx) / 2) * 2, // Snap to 2px grid for chunky movement
                        y: Math.floor((particle.y + particle.vy) / 2) * 2,
                        vy: particle.vy + 0.2, // stronger gravity for more dramatic effect
                        life: particle.life - 1
                    }))
                    .filter(particle => particle.life > 0)
            })
        }, 32) // ~30fps for more authentic chunky animation

        return () => {
            window.removeEventListener('triggerEasterEgg', handleEasterEggActivation as EventListener)
            document.removeEventListener('click', handleClick)
            clearInterval(animationInterval)
        }
    }, [])

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 9999 }}>
            {particles.map(particle => (
                <div
                    key={particle.id}
                    className="pixelated-particle"
                    style={{
                        position: 'absolute',
                        left: `${particle.x}px`,
                        top: `${particle.y}px`,
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                        background: particle.color,
                        opacity: particle.life / particle.maxLife,
                        imageRendering: 'pixelated' as const,
                        border: `1px solid ${particle.color}`,
                        boxShadow: `
                            0 0 0 1px ${particle.color},
                            0 0 ${particle.size}px ${particle.color}40
                        `,
                        transform: `scale(${Math.floor((particle.life / particle.maxLife) * 3) + 1})` // Chunky scaling
                    }}
                />
            ))}
        </div>
    )
}