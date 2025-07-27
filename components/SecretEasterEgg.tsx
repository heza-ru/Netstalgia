'use client'

import { useState, useEffect } from 'react'

interface SecretEasterEggProps {
  onTrigger: () => void
}

export default function SecretEasterEgg({ onTrigger }: SecretEasterEggProps) {
  const [keySequence, setKeySequence] = useState<string[]>([])
  const [showSecret, setShowSecret] = useState(false)

  const secretCodes = [
    ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'],
    ['KeyK', 'KeyO', 'KeyN', 'KeyA', 'KeyM', 'KeyI'],
    ['KeyC', 'KeyO', 'KeyN', 'KeyT', 'KeyR', 'KeyA'],
    ['KeyN', 'KeyI', 'KeyN', 'KeyT', 'KeyE', 'KeyN', 'KeyD', 'KeyO']
  ]

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const newSequence = [...keySequence, event.code]
      setKeySequence(newSequence.slice(-10)) // Keep last 10 keys

      // Check for secret codes
      secretCodes.forEach(code => {
        if (newSequence.slice(-code.length).join(',') === code.join(',')) {
          setShowSecret(true)
          onTrigger()
          
          // Show secret message
          setTimeout(() => {
            alert('🎉 SECRET CODE ACTIVATED! 🎉\n\nYou found the hidden Konami Code!\n\n+30 LIVES!\n\nThis website is now 100% more awesome!')
            setShowSecret(false)
          }, 100)
        }
      })
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [keySequence, onTrigger])

  if (!showSecret) return null

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      background: 'linear-gradient(45deg, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff)',
      border: '5px solid #000000',
      padding: '20px',
      zIndex: 9999,
      textAlign: 'center',
      fontFamily: 'MS Sans Serif, Arial, sans-serif',
      fontSize: '14px',
      fontWeight: 'bold',
      color: '#000000',
      textShadow: '2px 2px 4px rgba(255,255,255,0.8)',
      animation: 'secretPulse 0.5s infinite'
    }}>
      <div style={{fontSize: '18px', marginBottom: '10px'}}>
        🎉 SECRET EASTER EGG! 🎉
      </div>
      <div style={{fontSize: '12px'}}>
        You found the hidden code!<br/>
        +30 LIVES!<br/>
        +1000 POINTS!<br/>
        +UNLIMITED POWERS!
      </div>
      
      <style jsx>{`
        @keyframes secretPulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.1); }
        }
      `}</style>
    </div>
  )
} 