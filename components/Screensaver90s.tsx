'use client'

import { useState, useEffect, useRef } from 'react'

interface FlyingToaster {
  id: string
  x: number
  y: number
  speed: number
  direction: number
  size: number
}

export default function Screensaver90s() {
  const [toasters, setToasters] = useState<FlyingToaster[]>([])
  const [isActive, setIsActive] = useState(false)
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>()

  useEffect(() => {
    if (isActive) {
      // Create initial toasters
        const containerWidth = containerRef.current?.clientWidth || window.innerWidth || 800
        const containerHeight = containerRef.current?.clientHeight || window.innerHeight || 600
        
        const initialToasters: FlyingToaster[] = Array.from({ length: 8 }, (_, i) => ({
          id: `toaster-${i}`,
          x: Math.random() * containerWidth,
          y: Math.random() * containerHeight,
          speed: Math.random() * 2 + 1,
          direction: Math.random() * Math.PI * 2,
          size: Math.random() * 20 + 20
        }))
      setToasters(initialToasters)

      // Start animation
      const animate = () => {
        setToasters(prev => prev.map(toaster => {
          let newX = toaster.x + Math.cos(toaster.direction) * toaster.speed
          let newY = toaster.y + Math.sin(toaster.direction) * toaster.speed

          // Bounce off walls
          const containerWidth = containerRef.current?.clientWidth || window.innerWidth || 800
          const containerHeight = containerRef.current?.clientHeight || window.innerHeight || 600

          if (newX < 0 || newX > containerWidth - toaster.size) {
            toaster.direction = Math.PI - toaster.direction
            newX = Math.max(0, Math.min(containerWidth - toaster.size, newX))
          }
          if (newY < 0 || newY > containerHeight - toaster.size) {
            toaster.direction = -toaster.direction
            newY = Math.max(0, Math.min(containerHeight - toaster.size, newY))
          }

          return {
            ...toaster,
            x: newX,
            y: newY
          }
        }))

        animationRef.current = requestAnimationFrame(animate)
      }

      animationRef.current = requestAnimationFrame(animate)

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
        }
      }
    }
  }, [isActive])

  const handleMouseMove = () => {
    if (isActive) {
      setIsActive(false)
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }

  const handleKeyPress = () => {
    if (isActive) {
      setIsActive(false)
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }

  const startScreensaver = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    
    const newTimeoutId = setTimeout(() => {
      setIsActive(true)
    }, 5000) // 5 seconds of inactivity

    setTimeoutId(newTimeoutId)
  }

  useEffect(() => {
    // Start screensaver timeout
    startScreensaver()

    // Add event listeners
    const handleMouseMoveEvent = () => handleMouseMove()
    const handleKeyPressEvent = () => handleKeyPress()

    document.addEventListener('mousemove', handleMouseMoveEvent)
    document.addEventListener('keydown', handleKeyPressEvent)

    return () => {
      document.removeEventListener('mousemove', handleMouseMoveEvent)
      document.removeEventListener('keydown', handleKeyPressEvent)
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [])

  if (!isActive) {
    return (
      <div style={{
        background: '#000080',
        color: '#ffffff',
        border: '2px solid #ffffff',
        padding: '16px',
        fontFamily: 'Courier New, monospace',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '16px', marginBottom: '12px' }}>
          🖥️ FLYING TOASTERS SCREENSAVER 🖥️
        </div>
        <div style={{ fontSize: '12px', marginBottom: '16px' }}>
          The legendary screensaver from the 90s!
        </div>
        <button
          onClick={startScreensaver}
          style={{
            background: '#008080',
            color: '#ffffff',
            border: '2px outset #008080',
            padding: '8px 16px',
            cursor: 'pointer',
            fontFamily: 'Courier New, monospace',
            fontSize: '12px'
          }}
        >
          START SCREENSAVER
        </button>
        <div style={{ fontSize: '10px', marginTop: '12px', opacity: 0.7 }}>
          Move your mouse or press any key to exit
        </div>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: '#000000',
        zIndex: 9999,
        cursor: 'none',
        overflow: 'hidden'
      }}
      onMouseMove={handleMouseMove}
      onKeyDown={handleKeyPress}
      tabIndex={0}
    >
      {/* Flying Toasters */}
      {toasters.map((toaster) => (
        <div
          key={toaster.id}
          style={{
            position: 'absolute',
            left: toaster.x,
            top: toaster.y,
            width: toaster.size,
            height: toaster.size,
            fontSize: toaster.size,
            animation: 'float 3s ease-in-out infinite'
          }}
        >
          🍞
        </div>
      ))}

      {/* Screensaver Info */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        color: '#ffffff',
        fontFamily: 'Courier New, monospace',
        fontSize: '14px',
        textAlign: 'center',
        opacity: 0.7
      }}>
        <div>FLYING TOASTERS</div>
        <div style={{ fontSize: '10px', marginTop: '4px' }}>
          Move mouse or press any key to exit
        </div>
      </div>

      {/* Stars Background */}
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={`star-${i}`}
          style={{
            position: 'absolute',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: '2px',
            height: '2px',
            background: '#ffffff',
            borderRadius: '50%',
            animation: `twinkle ${Math.random() * 3 + 1}s infinite`
          }}
        />
      ))}

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
