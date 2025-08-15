'use client'

import { useEffect } from 'react'

interface CrashTriggerProps {
    onCrash: (reason: string, source: string) => void
}

// Crash trigger conditions and their probabilities
const CRASH_TRIGGERS = [
    {
        condition: 'popup-yes-click',
        probability: 0.8, // 80% chance
        reason: 'User clicked YES on suspicious popup advertisement',
        source: 'Popup Advertisement'
    },
    {
        condition: 'multiple-popups',
        probability: 0.6, // 60% chance after 3+ popups
        reason: 'System overwhelmed by multiple popup windows',
        source: 'Popup Cascade'
    },
    {
        condition: 'rapid-clicking',
        probability: 0.3, // 30% chance with rapid clicking
        reason: 'Excessive clicking detected - possible bot behavior',
        source: 'Click Counter'
    },
    {
        condition: 'easter-egg-overload',
        probability: 0.4, // 40% chance after many easter eggs
        reason: 'System resources exhausted by easter egg effects',
        source: 'Easter Egg System'
    },
    {
        condition: 'suspicious-download',
        probability: 0.9, // 90% chance
        reason: 'Attempted to download FREE_SCREENSAVER.EXE',
        source: 'File Download'
    },
    {
        condition: 'konami-code-spam',
        probability: 0.5, // 50% chance with repeated konami codes
        reason: 'Konami code buffer overflow detected',
        source: 'Keyboard Input'
    }
]

export default function CrashTrigger({ onCrash }: CrashTriggerProps) {
    useEffect(() => {
        // Track various crash-inducing behaviors
        let popupCount = 0
        let clickCount = 0
        let easterEggCount = 0
        let konamiCount = 0
        let lastClickTime = 0

        const handlePopupClick = (event: CustomEvent) => {
            const { action } = event.detail

            if (action === 'yes' || action === 'ok' || action === 'download') {
                const trigger = CRASH_TRIGGERS.find(t => t.condition === 'popup-yes-click')
                if (trigger && Math.random() < trigger.probability) {
                    onCrash(trigger.reason, trigger.source)
                    return
                }
            }

            popupCount++
            if (popupCount >= 3) {
                const trigger = CRASH_TRIGGERS.find(t => t.condition === 'multiple-popups')
                if (trigger && Math.random() < trigger.probability) {
                    onCrash(trigger.reason, trigger.source)
                    return
                }
            }
        }

        const handleRapidClicking = () => {
            const now = Date.now()
            if (now - lastClickTime < 100) { // Clicks faster than 100ms
                clickCount++
                if (clickCount >= 10) {
                    const trigger = CRASH_TRIGGERS.find(t => t.condition === 'rapid-clicking')
                    if (trigger && Math.random() < trigger.probability) {
                        onCrash(trigger.reason, trigger.source)
                        return
                    }
                }
            } else {
                clickCount = 0
            }
            lastClickTime = now
        }

        const handleEasterEgg = () => {
            easterEggCount++
            if (easterEggCount >= 5) {
                const trigger = CRASH_TRIGGERS.find(t => t.condition === 'easter-egg-overload')
                if (trigger && Math.random() < trigger.probability) {
                    onCrash(trigger.reason, trigger.source)
                    return
                }
            }
        }

        const handleKonamiCode = () => {
            konamiCount++
            if (konamiCount >= 3) {
                const trigger = CRASH_TRIGGERS.find(t => t.condition === 'konami-code-spam')
                if (trigger && Math.random() < trigger.probability) {
                    onCrash(trigger.reason, trigger.source)
                    return
                }
            }
        }

        const handleSuspiciousDownload = (event: CustomEvent) => {
            const { filename } = event.detail
            const suspiciousPatterns = [
                'free', 'crack', 'keygen', 'serial', 'patch', 'hack',
                'screensaver', 'codec', 'player', 'toolbar', 'bonus'
            ]

            const isSuspicious = suspiciousPatterns.some(pattern =>
                filename.toLowerCase().includes(pattern)
            )

            if (isSuspicious) {
                const trigger = CRASH_TRIGGERS.find(t => t.condition === 'suspicious-download')
                if (trigger && Math.random() < trigger.probability) {
                    onCrash(`Attempted to download ${filename}`, trigger.source)
                    return
                }
            }
        }

        // Add event listeners
        window.addEventListener('popupClick', handlePopupClick as EventListener)
        window.addEventListener('click', handleRapidClicking)
        window.addEventListener('easterEgg', handleEasterEgg as EventListener)
        window.addEventListener('konamiCode', handleKonamiCode as EventListener)
        window.addEventListener('suspiciousDownload', handleSuspiciousDownload as EventListener)

        // Random crash timer (very low probability)
        const randomCrashTimer = setInterval(() => {
            if (Math.random() < 0.001) { // 0.1% chance every 30 seconds
                const randomTrigger = CRASH_TRIGGERS[Math.floor(Math.random() * CRASH_TRIGGERS.length)]
                onCrash('Random system instability detected', 'System Timer')
            }
        }, 30000)

        return () => {
            window.removeEventListener('popupClick', handlePopupClick as EventListener)
            window.removeEventListener('click', handleRapidClicking)
            window.removeEventListener('easterEgg', handleEasterEgg as EventListener)
            window.removeEventListener('konamiCode', handleKonamiCode as EventListener)
            window.removeEventListener('suspiciousDownload', handleSuspiciousDownload as EventListener)
            clearInterval(randomCrashTimer)
        }
    }, [onCrash])

    // This component doesn't render anything
    return null
}

// Utility function to trigger crashes manually
export const triggerCrash = (condition: string, customReason?: string) => {
    const trigger = CRASH_TRIGGERS.find(t => t.condition === condition)
    if (trigger && Math.random() < trigger.probability) {
        const event = new CustomEvent('forceCrash', {
            detail: {
                reason: customReason || trigger.reason,
                source: trigger.source
            }
        })
        window.dispatchEvent(event)
        return true
    }
    return false
}

// Export crash trigger conditions for use in other components
export { CRASH_TRIGGERS }