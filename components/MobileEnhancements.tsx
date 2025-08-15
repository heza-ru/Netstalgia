'use client'

import { useEffect, useState } from 'react'

export default function MobileEnhancements() {
    const [isMobile, setIsMobile] = useState(false)
    const [isLandscape, setIsLandscape] = useState(false)

    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth <= 768
            const landscape = window.innerWidth > window.innerHeight

            setIsMobile(mobile)
            setIsLandscape(landscape)

            // Add mobile class to body
            if (mobile) {
                document.body.classList.add('mobile-device')
            } else {
                document.body.classList.remove('mobile-device')
            }

            // Add landscape class
            if (landscape && mobile) {
                document.body.classList.add('mobile-landscape')
            } else {
                document.body.classList.remove('mobile-landscape')
            }
        }

        // Check on mount
        checkMobile()

        // Check on resize
        window.addEventListener('resize', checkMobile)
        window.addEventListener('orientationchange', () => {
            // Delay to allow orientation change to complete
            setTimeout(checkMobile, 100)
        })

        return () => {
            window.removeEventListener('resize', checkMobile)
            window.removeEventListener('orientationchange', checkMobile)
        }
    }, [])

    useEffect(() => {
        if (isMobile) {
            // Disable cursor trail on mobile for performance
            const cursorTrailElements = document.querySelectorAll('.pixelated-cursor-trail')
            cursorTrailElements.forEach(element => {
                (element as HTMLElement).style.display = 'none'
            })

            // Reduce CRT effects intensity on mobile
            const crtElements = document.querySelectorAll('.crt-scanlines-enhanced, .crt-flicker-enhanced')
            crtElements.forEach(element => {
                (element as HTMLElement).style.opacity = '0.5'
            })

            // Add touch event handlers for better mobile interaction
            const addTouchFeedback = () => {
                const interactiveElements = document.querySelectorAll(
                    '.dancing-baby, .win95-button, .chunky-button, .counter-display, a'
                )

                interactiveElements.forEach(element => {
                    if (!element.hasAttribute('data-touch-enhanced')) {
                        element.setAttribute('data-touch-enhanced', 'true')

                        element.addEventListener('touchstart', () => {
                            element.classList.add('touch-active')
                        })

                        element.addEventListener('touchend', () => {
                            setTimeout(() => {
                                element.classList.remove('touch-active')
                            }, 150)
                        })
                    }
                })
            }

            // Apply touch feedback initially and on DOM changes
            addTouchFeedback()

            const observer = new MutationObserver(addTouchFeedback)
            observer.observe(document.body, {
                childList: true,
                subtree: true
            })

            return () => observer.disconnect()
        }
    }, [isMobile])

    // Mobile-specific easter egg adjustments
    useEffect(() => {
        if (isMobile) {
            const handleMobileEasterEgg = (e: CustomEvent) => {
                // Reduce particle count on mobile for performance
                if (e.detail.type === 'starfield-effect') {
                    // Override with mobile-optimized version
                    const mobileEvent = new CustomEvent('triggerEasterEgg', {
                        detail: {
                            type: 'mobile-starfield-effect',
                            source: e.detail.source,
                            particleCount: 5 // Reduced from default
                        }
                    })
                    window.dispatchEvent(mobileEvent)
                    e.stopPropagation()
                }
            }

            window.addEventListener('triggerEasterEgg', handleMobileEasterEgg as EventListener)

            return () => {
                window.removeEventListener('triggerEasterEgg', handleMobileEasterEgg as EventListener)
            }
        }
    }, [isMobile])

    // Prevent zoom on double tap for iOS
    useEffect(() => {
        if (isMobile) {
            let lastTouchEnd = 0

            const preventZoom = (e: TouchEvent) => {
                const now = Date.now()
                if (now - lastTouchEnd <= 300) {
                    e.preventDefault()
                }
                lastTouchEnd = now
            }

            document.addEventListener('touchend', preventZoom, { passive: false })

            return () => {
                document.removeEventListener('touchend', preventZoom)
            }
        }
    }, [isMobile])

    // Show mobile-specific help text
    useEffect(() => {
        if (isMobile) {
            const originalAlert = window.alert
            window.alert = (message: string) => {
                if (message.includes('SECRET HELP MENU')) {
                    const mobileMessage = message.replace(
                        'Keyboard Shortcuts:',
                        'Mobile Controls:\n• Tap elements for interaction\n• Long press for context menus\n• Swipe for navigation\n\nKeyboard Shortcuts (if available):'
                    )
                    originalAlert(mobileMessage)
                } else {
                    originalAlert(message)
                }
            }

            return () => {
                window.alert = originalAlert
            }
        }
    }, [isMobile])

    return null // This component doesn't render anything visible
}