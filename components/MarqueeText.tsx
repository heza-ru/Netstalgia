'use client'

import { useState, useEffect } from 'react'

interface MarqueeTextProps {
  text: string
  speed?: number
  direction?: 'left' | 'right'
  color?: string
  size?: number
}

export default function MarqueeText({ 
  text, 
  speed = 50, 
  direction = 'left', 
  color = '#ff0000',
  size = 12 
}: MarqueeTextProps) {
  const [position, setPosition] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(prev => {
        if (direction === 'left') {
          return prev <= -100 ? 100 : prev - 1
        } else {
          return prev >= 100 ? -100 : prev + 1
        }
      })
    }, speed)

    return () => clearInterval(interval)
  }, [speed, direction])

  return (
    <div style={{
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      border: '2px outset #cdc7bb',
      background: '#ecece0',
      padding: '4px',
      margin: '8px 0'
    }}>
      <div style={{
        transform: `translateX(${position}%)`,
        color: color,
        fontSize: `${size}px`,
        fontWeight: 'bold',
        fontFamily: 'MS Sans Serif, Arial, sans-serif',
        textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
        whiteSpace: 'nowrap'
      }}>
        {text}
      </div>
    </div>
  )
} 