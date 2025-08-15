'use client'

import { useEffect } from 'react'

export default function PixelatedCursorTrail() {
    useEffect(() => {
        let trailElements: HTMLElement[] = []
        let mouseX = 0
        let mouseY = 0
        let isTrailActive = false

        const createTrailElement = (x: number, y: number) => {
            const trail = document.createElement('div')
            trail.className = 'pixelated-cursor-trail'

            // Create 8x8 pixel block
            trail.style.left = `${Math.floor(x / 8) * 8}px`
            trail.style.top = `${Math.floor(y / 8) * 8}px`
            trail.style.width = '8px'
            trail.style.height = '8px'
            trail.style.position = 'fixed'
            trail.style.pointerEvents = 'none'
            trail.style.zIndex = '9999'
            trail.style.imageRendering = 'pixelated'
            trail.style.imageRendering = 'crisp-edges'

            // Random colors for variety
            const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff']
            const randomColor = colors[Math.floor(Math.random() * colors.length)]
            trail.style.background = randomColor
            trail.style.border = `1px solid ${randomColor}`
            trail.style.boxShadow = `0 0 2px ${randomColor}`

            document.body.appendChild(trail)
            trailElements.push(trail)

            // Remove after animation
            setTimeout(() => {
                if (trail.parentNode) {
                    trail.parentNode.removeChild(trail)
                }
                const index = trailElements.indexOf(trail)
                if (index > -1) {
                    trailElements.splice(index, 1)
                }
            }, 1000)
        }

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX
            mouseY = e.clientY

            if (isTrailActive && Math.random() > 0.7) {
                createTrailElement(mouseX, mouseY)
            }
        }

        const handleKeyPress = (e: KeyboardEvent) => {
            // Toggle cursor trail with 'T' key
            if (e.key === 't' || e.key === 'T') {
                isTrailActive = !isTrailActive

                if (isTrailActive) {
                    // Create initial burst of particles
                    for (let i = 0; i < 5; i++) {
                        setTimeout(() => {
                            createTrailElement(
                                mouseX + (Math.random() - 0.5) * 20,
                                mouseY + (Math.random() - 0.5) * 20
                            )
                        }, i * 100)
                    }
                }
            }
        }

        // Easter egg activation
        const handleEasterEggActivation = (e: CustomEvent) => {
            if (e.detail.type === 'cursor-trail') {
                isTrailActive = true

                // Create burst effect
                for (let i = 0; i < 10; i++) {
                    setTimeout(() => {
                        createTrailElement(
                            mouseX + (Math.random() - 0.5) * 40,
                            mouseY + (Math.random() - 0.5) * 40
                        )
                    }, i * 50)
                }

                // Auto-disable after 10 seconds
                setTimeout(() => {
                    isTrailActive = false
                }, 10000)
            }
        }

        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('keydown', handleKeyPress)
        window.addEventListener('triggerEasterEgg', handleEasterEggActivation as EventListener)

        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('keydown', handleKeyPress)
            window.removeEventListener('triggerEasterEgg', handleEasterEggActivation as EventListener)

            // Clean up any remaining trail elements
            trailElements.forEach(element => {
                if (element.parentNode) {
                    element.parentNode.removeChild(element)
                }
            })
        }
    }, [])

    return null // This component doesn't render anything visible
}