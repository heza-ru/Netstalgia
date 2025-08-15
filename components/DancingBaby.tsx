'use client'

import { useState, useRef, useEffect } from 'react'

interface DancingBabyProps {
  onTripleClick: () => void
}

export default function DancingBaby({ onTripleClick }: DancingBabyProps) {
  const [clickCount, setClickCount] = useState(0)
  const [showSparkles, setShowSparkles] = useState(false)
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleClick = () => {
    setClickCount(prev => prev + 1)

    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current)
    }

    clickTimeoutRef.current = setTimeout(() => {
      setClickCount(0)
    }, 1000)

    if (clickCount === 2) {
      onTripleClick()
      setClickCount(0)
    }
  }

  useEffect(() => {
    if (clickCount > 0) {
      setShowSparkles(true)
      const timer = setTimeout(() => setShowSparkles(false), 500)
      return () => clearTimeout(timer)
    }
  }, [clickCount])

  const handleEnhancedClick = () => {
    handleClick()

    // Trigger pixelated particle effect on click
    const customEvent = new CustomEvent('triggerEasterEgg', {
      detail: { type: 'sparkle-effect', source: 'dancing-baby-click' }
    })
    window.dispatchEvent(customEvent)

    // Increment click counter
    const clickEvent = new CustomEvent('incrementClickCounter', {
      detail: { target: 'Dancing Baby' }
    })
    window.dispatchEvent(clickEvent)
  }

  return (
    <div className="center">
      <div
        className="dancing-baby pixelated-hover pixelated-border-3d crt-glow"
        onClick={handleEnhancedClick}
        style={{
          cursor: 'pointer',
          transition: 'none',
          imageRendering: 'pixelated'
        }}
      >
<img
          src="/assets/dancing-baby.gif"
          alt="Famous Dancing Baby from 1996"
          className="scale-pixel-2x"
          style={{
            border: 'none',
            background: '#ffffff',
            padding: '4px',
            imageRendering: 'pixelated'
          }}
        />

        {showSparkles && (
          <div className="ascii-art pixelated-text crt-glow" style={{
            color: '#ffff00',
            textShadow: '0 0 4px #ffff00',
            animation: 'pixelatedSparkle 0.5s steps(4, end) infinite'
          }}>
            {`
    ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦
    ✦ PIXELATED SPARKLES! ✦
    ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦
`}
          </div>
        )}

        <div className="pixelated-text text-web-purple mt-2" style={{
          textShadow: '1px 1px 0 #000000'
        }}>
          ★ FAMOUS DANCING BABY FROM 1996! ★
        </div>
        <div className="pixelated-small text-web-blue blink" style={{
          textShadow: '1px 1px 0 #000000'
        }}>
          ★ TRIPLE CLICK FOR EASTER EGG! ★
        </div>

        {clickCount > 0 && (
          <div className="pixelated-small" style={{
            color: '#ff0000',
            marginTop: '4px',
            textShadow: '0 0 2px #ff0000'
          }}>
            CLICKS: {clickCount}/3
          </div>
        )}
      </div>
    </div>
  )
} 