'use client'

import { useEffect } from 'react'

export default function MobilePopupFix() {
    useEffect(() => {
        const fixMobilePopups = () => {
            const popups = document.querySelectorAll('.popup-container, .win95-popup')

            popups.forEach(popup => {
                const htmlPopup = popup as HTMLElement
                const rect = htmlPopup.getBoundingClientRect()

                // Check if popup extends beyond viewport
                const viewportWidth = window.innerWidth
                const viewportHeight = window.innerHeight

                // Fix horizontal positioning
                if (rect.right > viewportWidth) {
                    htmlPopup.style.left = Math.max(10, viewportWidth - rect.width - 10) + 'px'
                }
                if (rect.left < 0) {
                    htmlPopup.style.left = '10px'
                }

                // Fix vertical positioning - prevent extending below viewport
                if (rect.bottom > viewportHeight) {
                    htmlPopup.style.top = Math.max(10, viewportHeight - rect.height - 10) + 'px'
                }
                if (rect.top < 0) {
                    htmlPopup.style.top = '10px'
                }

                // Add mobile-specific styles
                if (window.innerWidth <= 768) {
                    htmlPopup.style.maxWidth = '90vw'
                    htmlPopup.style.maxHeight = '70vh'
                    htmlPopup.style.overflow = 'auto'
                    htmlPopup.style.fontSize = '10px'

                    // Fix content inside popup
                    const content = htmlPopup.querySelector('.win95-content')
                    if (content) {
                        const htmlContent = content as HTMLElement
                        htmlContent.style.padding = '6px'
                        htmlContent.style.fontSize = '10px'
                        htmlContent.style.lineHeight = '1.3'
                    }

                    // Fix buttons inside popup
                    const buttons = htmlPopup.querySelectorAll('.win95-button, .win95-button-enhanced')
                    buttons.forEach(button => {
                        const htmlButton = button as HTMLElement
                        htmlButton.style.padding = '3px 8px'
                        htmlButton.style.fontSize = '10px'
                        htmlButton.style.margin = '1px'
                        htmlButton.style.minWidth = '60px'
                    })

                    // Fix title bar
                    const titlebar = htmlPopup.querySelector('.win95-titlebar')
                    if (titlebar) {
                        const htmlTitlebar = titlebar as HTMLElement
                        htmlTitlebar.style.padding = '2px 4px'
                        htmlTitlebar.style.fontSize = '10px'
                    }
                }
            })
        }

        // Fix popups on load
        fixMobilePopups()

        // Fix popups when new ones are added
        const observer = new MutationObserver(() => {
            setTimeout(fixMobilePopups, 100) // Small delay to ensure popup is rendered
        })

        observer.observe(document.body, {
            childList: true,
            subtree: true
        })

        // Fix popups on resize
        const handleResize = () => {
            setTimeout(fixMobilePopups, 100)
        }

        window.addEventListener('resize', handleResize)

        return () => {
            observer.disconnect()
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return null
}