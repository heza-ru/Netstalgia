'use client'

import { useEffect } from 'react'

export default function PixelatedHoverEffects() {
    useEffect(() => {
        // Apply pixelated hover effects to various interactive elements
        const applyPixelatedHover = () => {
            // Apply to buttons
            const buttons = document.querySelectorAll('button, .win95-button, .chunky-button')
            buttons.forEach(button => {
                if (!button.classList.contains('pixelated-hover-applied')) {
                    button.classList.add('chunky-button', 'pixelated-hover-applied')
                }
            })

            // Apply to links
            const links = document.querySelectorAll('a')
            links.forEach(link => {
                if (!link.classList.contains('pixelated-hover-applied')) {
                    link.classList.add('pixelated-link', 'pixelated-hover-applied')
                }
            })

            // Apply to images
            const images = document.querySelectorAll('img')
            images.forEach(img => {
                if (!img.classList.contains('pixelated-hover-applied')) {
                    img.classList.add('pixelated-image', 'pixelated-hover-applied')
                }
            })

            // Apply to interactive divs (like dancing baby, counters, etc.)
            const interactiveElements = document.querySelectorAll(
                '.dancing-baby, .counter-display, .retro-border, .win95-window, [onclick], [role="button"]'
            )
            interactiveElements.forEach(element => {
                if (!element.classList.contains('pixelated-hover-applied')) {
                    element.classList.add('pixelated-hover', 'pixelated-hover-applied')
                }
            })
        }

        // Apply effects initially
        applyPixelatedHover()

        // Re-apply when new elements are added to the DOM
        const observer = new MutationObserver(() => {
            applyPixelatedHover()
        })

        observer.observe(document.body, {
            childList: true,
            subtree: true
        })

        // Add special hover effects for specific elements
        const addSpecialHoverEffects = () => {
            // Dancing baby special effect
            const dancingBaby = document.querySelector('.dancing-baby')
            if (dancingBaby && !dancingBaby.hasAttribute('data-special-hover')) {
                dancingBaby.setAttribute('data-special-hover', 'true')

                dancingBaby.addEventListener('mouseenter', () => {
                    // Create particle burst on hover
                    const rect = dancingBaby.getBoundingClientRect()
                    const centerX = rect.left + rect.width / 2
                    const centerY = rect.top + rect.height / 2

                    const event = new CustomEvent('triggerEasterEgg', {
                        detail: {
                            type: 'hover-particles',
                            x: centerX,
                            y: centerY
                        }
                    })
                    window.dispatchEvent(event)
                })
            }

            // Web ring special effects
            const webRingLinks = document.querySelectorAll('.webring a')
            webRingLinks.forEach(link => {
                if (!link.hasAttribute('data-special-hover')) {
                    link.setAttribute('data-special-hover', 'true')

                    link.addEventListener('mouseenter', () => {
                        // Add rainbow border effect
                        const htmlLink = link as HTMLElement
                        htmlLink.style.animation = 'rainbowBorder 0.5s ease-in-out'
                        htmlLink.style.border = '2px solid'
                        htmlLink.style.borderImage = 'linear-gradient(45deg, #ff0000, #ff8000, #ffff00, #80ff00, #00ff00, #00ff80, #00ffff, #0080ff, #0000ff, #8000ff, #ff00ff, #ff0080) 1'
                    })

                    link.addEventListener('mouseleave', () => {
                        const htmlLink = link as HTMLElement
                        htmlLink.style.animation = ''
                        htmlLink.style.border = ''
                    })
                }
            })

            // Counter displays special effects
            const counters = document.querySelectorAll('.counter-display')
            counters.forEach(counter => {
                if (!counter.hasAttribute('data-special-hover')) {
                    counter.setAttribute('data-special-hover', 'true')

                    counter.addEventListener('mouseenter', () => {
                        const htmlCounter = counter as HTMLElement
                        htmlCounter.style.textShadow = '0 0 8px #00ff00, 0 0 16px #00ff00'
                        htmlCounter.style.transform = 'scale(1.1)'
                    })

                    counter.addEventListener('mouseleave', () => {
                        const htmlCounter = counter as HTMLElement
                        htmlCounter.style.textShadow = ''
                        htmlCounter.style.transform = ''
                    })
                }
            })
        }

        // Apply special effects initially and on DOM changes
        addSpecialHoverEffects()

        const specialEffectsObserver = new MutationObserver(() => {
            addSpecialHoverEffects()
        })

        specialEffectsObserver.observe(document.body, {
            childList: true,
            subtree: true
        })

        return () => {
            observer.disconnect()
            specialEffectsObserver.disconnect()
        }
    }, [])

    return null // This component doesn't render anything visible
}