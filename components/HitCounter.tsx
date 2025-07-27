'use client'

import { useState, useEffect } from 'react'

interface HitCounterProps {
  className?: string
}

export default function HitCounter({ className = '' }: HitCounterProps) {
  const [count, setCount] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    // Load count from localStorage or start with random number
    const savedCount = localStorage.getItem('hitCounter')
    const initialCount = savedCount ? parseInt(savedCount) : Math.floor(Math.random() * 10000) + 1000
    setCount(initialCount)

    // Increment count on first visit
    const hasVisited = localStorage.getItem('hasVisited')
    if (!hasVisited) {
      const newCount = initialCount + Math.floor(Math.random() * 10) + 1
      setCount(newCount)
      localStorage.setItem('hitCounter', newCount.toString())
      localStorage.setItem('hasVisited', 'true')
      
      // Trigger animation
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 1000)
    }
  }, [])

  const formatNumber = (num: number) => {
    return num.toString().padStart(6, '0')
  }

  const getDigitStyle = (digit: string, index: number) => ({
    display: 'inline-block',
    width: '12px',
    height: '16px',
    background: '#000000',
    color: '#00ff00',
    textAlign: 'center' as const,
    fontFamily: 'Courier New, monospace',
    fontSize: '12px',
    fontWeight: 'bold',
    border: '1px solid #00ff00',
    margin: '0 1px',
    lineHeight: '16px',
    transform: isAnimating ? 'rotateX(180deg)' : 'rotateX(0deg)',
    transition: 'transform 0.3s ease-in-out',
    animation: isAnimating ? 'flipDigit 0.3s ease-in-out' : 'none'
  })

  return (
    <div className={`hit-counter ${className}`} style={{
      border: '3px outset #cdc7bb',
      padding: '8px',
      background: '#ecece0',
      textAlign: 'center',
      marginBottom: '12px'
    }}>
      <div style={{
        fontSize: '10px',
        fontWeight: 'bold',
        color: '#000080',
        marginBottom: '4px'
      }}>
        * VISITOR COUNTER *
      </div>
      
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '4px',
        marginBottom: '4px'
      }}>
        {formatNumber(count).split('').map((digit, index) => (
          <div
            key={index}
            style={getDigitStyle(digit, index)}
          >
            {digit}
          </div>
        ))}
      </div>
      
      <div style={{
        fontSize: '8px',
        color: '#008000',
        marginBottom: '4px'
      }}>
        SINCE 1999
      </div>
      
      <div style={{
        fontSize: '8px',
        color: '#ff0000',
        fontWeight: 'bold'
      }}>
        * REAL VISITORS! *
      </div>
      
      <style jsx>{`
        @keyframes flipDigit {
          0% { transform: rotateX(0deg); }
          50% { transform: rotateX(90deg); }
          100% { transform: rotateX(0deg); }
        }
        
        .hit-counter:hover {
          border-color: #00ff00;
          box-shadow: 0 0 8px #00ff00;
        }
      `}</style>
    </div>
  )
} 