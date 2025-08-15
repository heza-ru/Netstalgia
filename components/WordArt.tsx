'use client'

import { useState, useEffect } from 'react'

interface WordArtProps {
    children: React.ReactNode
    style?: 'random' | 'impact' | 'comic' | 'creepy' | 'metal' | 'playful' | 'street' | 'friendly' | '3d' | 'neon' | 'fire'
    probability?: number // Chance of applying WordArt (0-1)
}

const WORDART_STYLES = [
    'wordart-impact',
    'wordart-comic',
    'wordart-creepy',
    'wordart-metal',
    'wordart-playful',
    'wordart-street',
    'wordart-friendly',
    'wordart-3d',
    'wordart-neon',
    'wordart-fire'
]

const RANDOM_STYLES = [
    'wordart-random-1',
    'wordart-random-2',
    'wordart-random-3',
    'wordart-random-4',
    'wordart-random-5'
]

export default function WordArt({ children, style = 'random', probability = 0.3 }: WordArtProps) {
    const [appliedStyle, setAppliedStyle] = useState<string>('')
    const [shouldApply, setShouldApply] = useState(false)

    useEffect(() => {
        // Randomly decide whether to apply WordArt
        const apply = Math.random() < probability
        setShouldApply(apply)

        if (apply) {
            let selectedStyle = ''

            if (style === 'random') {
                // 70% chance for subtle random styles, 30% for dramatic styles
                if (Math.random() < 0.7) {
                    selectedStyle = RANDOM_STYLES[Math.floor(Math.random() * RANDOM_STYLES.length)]
                } else {
                    selectedStyle = WORDART_STYLES[Math.floor(Math.random() * WORDART_STYLES.length)]
                }
            } else {
                selectedStyle = `wordart-${style}`
            }

            setAppliedStyle(selectedStyle)
        }
    }, [style, probability])

    if (!shouldApply) {
        return <>{children}</>
    }

    return (
        <span className={appliedStyle}>
            {children}
        </span>
    )
}

// Utility function to randomly apply WordArt to text
export const randomWordArt = (text: string, probability: number = 0.2): JSX.Element => {
    return <WordArt probability={probability}>{text}</WordArt>
}

// Pre-configured WordArt components for common use cases
export const WordArtTitle = ({ children }: { children: React.ReactNode }) => (
    <WordArt style="random" probability={0.6}>{children}</WordArt>
)

export const WordArtHeader = ({ children }: { children: React.ReactNode }) => (
    <WordArt style="random" probability={0.4}>{children}</WordArt>
)

export const WordArtAccent = ({ children }: { children: React.ReactNode }) => (
    <WordArt style="random" probability={0.3}>{children}</WordArt>
)