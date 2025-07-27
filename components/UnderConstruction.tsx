'use client'

import { useState, useEffect } from 'react'

interface UnderConstructionProps {
  text?: string
  animated?: boolean
}

export default function UnderConstruction({ text = "UNDER CONSTRUCTION", animated = true }: UnderConstructionProps) {
  const [currentChar, setCurrentChar] = useState(0)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    if (!animated) return

    const charInterval = setInterval(() => {
      setCurrentChar(prev => (prev + 1) % (text.length + 1))
    }, 200)

    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)

    return () => {
      clearInterval(charInterval)
      clearInterval(cursorInterval)
    }
  }, [text, animated])

  const displayText = animated ? text.slice(0, currentChar) : text

  return (
    <div style={{
      background: 'linear-gradient(45deg, #ffff00, #ff6600, #ffff00)',
      border: '3px solid #000000',
      padding: '8px 16px',
      margin: '8px 0',
      textAlign: 'center',
      fontFamily: 'MS Sans Serif, Arial, sans-serif',
      fontWeight: 'bold',
      fontSize: '12px',
      color: '#000000',
      textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
      animation: animated ? 'constructionBlink 1s infinite' : 'none'
    }}>
      {displayText}
      {animated && showCursor && '|'}
      
      <style jsx>{`
        @keyframes constructionBlink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0.7; }
        }
      `}</style>
    </div>
  )
} 