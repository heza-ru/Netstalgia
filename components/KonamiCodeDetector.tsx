'use client'

import { useEffect, useRef, useState } from 'react'

interface KonamiCodeDetectorProps {
    onKonamiActivated: (code: string) => void
    onTextCodeActivated: (code: string, text: string) => void
}

// Classic Konami Code sequence
const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA']

// Additional secret codes for 90s authenticity
const SECRET_CODES = [
    { text: 'CONTRA', title: 'CONTRA - 30 LIVES CHEAT!', videoSrc: '/assets/contra.mp4' },
    { text: 'NINTENDO', title: 'NINTENDO POWER!', videoSrc: '/assets/nintendo.mp4' },
    { text: 'MORTAL KOMBAT', title: 'MORTAL KOMBAT - FATALITY!', videoSrc: '/assets/mk.mp4' },
    { text: 'STREET FIGHTER', title: 'STREET FIGHTER - HADOKEN!', videoSrc: '/assets/sf.mp4' },
    { text: 'DOOM', title: 'DOOM - IDDQD GOD MODE!', videoSrc: '/assets/doom.mp4' },
    { text: 'QUAKE', title: 'QUAKE - ROCKET LAUNCHER!', videoSrc: '/assets/quake.mp4' },
    { text: 'WARCRAFT', title: 'WARCRAFT - CHEAT ENABLED!', videoSrc: '/assets/warcraft.mp4' },
    { text: 'STARCRAFT', title: 'STARCRAFT - SHOW ME THE MONEY!', videoSrc: '/assets/starcraft.mp4' },
    { text: 'GOLDENEYE', title: 'GOLDENEYE 007 - INVINCIBILITY!', videoSrc: '/assets/goldeneye.mp4' },
    { text: 'MARIO', title: 'SUPER MARIO - WARP ZONE!', videoSrc: '/assets/mario.mp4' }
]

export default function KonamiCodeDetector({ onKonamiActivated, onTextCodeActivated }: KonamiCodeDetectorProps) {
    const [konamiSequence, setKonamiSequence] = useState<string[]>([])
    const [typedText, setTypedText] = useState('')
    const [lastKeyTime, setLastKeyTime] = useState(0)
    const sequenceTimeoutRef = useRef<NodeJS.Timeout | null>(null)

    // Reset sequence if too much time passes between keys
    const resetSequenceTimer = () => {
        if (sequenceTimeoutRef.current) {
            clearTimeout(sequenceTimeoutRef.current)
        }

        sequenceTimeoutRef.current = setTimeout(() => {
            setKonamiSequence([])
        }, 2000) // Reset after 2 seconds of inactivity
    }

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const currentTime = Date.now()
            setLastKeyTime(currentTime)

            // Handle Konami Code sequence detection
            if (KONAMI_CODE.includes(event.code)) {
                setKonamiSequence(prev => {
                    const newSequence = [...prev, event.code]

                    // Keep only the last 10 keys (length of Konami code)
                    if (newSequence.length > KONAMI_CODE.length) {
                        newSequence.shift()
                    }

                    // Check if sequence matches Konami code
                    if (newSequence.length === KONAMI_CODE.length &&
                        newSequence.join(',') === KONAMI_CODE.join(',')) {
                        onKonamiActivated('konami')
                        return [] // Reset sequence
                    }

                    return newSequence
                })

                resetSequenceTimer()
            } else {
                // Non-Konami key resets the sequence
                setKonamiSequence([])
            }

            // Handle text-based secret codes
            if (event.key.length === 1 && /[A-Za-z]/.test(event.key)) {
                setTypedText(prev => {
                    const newText = (prev + event.key.toUpperCase()).slice(-20) // Keep last 20 characters

                    // Check for secret codes
                    for (const secretCode of SECRET_CODES) {
                        if (newText.includes(secretCode.text)) {
                            onTextCodeActivated(secretCode.text, secretCode.title)
                            return '' // Reset typed text
                        }
                    }

                    return newText
                })
            }

            // Clear typed text on backspace
            if (event.key === 'Backspace') {
                setTypedText(prev => prev.slice(0, -1))
            }

            // Clear typed text on Enter or Escape
            if (event.key === 'Enter' || event.key === 'Escape') {
                setTypedText('')
            }
        }

        // Add event listener
        window.addEventListener('keydown', handleKeyDown)

        // Cleanup
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            if (sequenceTimeoutRef.current) {
                clearTimeout(sequenceTimeoutRef.current)
            }
        }
    }, [onKonamiActivated, onTextCodeActivated])

    // This component only handles keyboard events, no visual output
    return null
}

// Export the secret codes for use in other components
export { SECRET_CODES }