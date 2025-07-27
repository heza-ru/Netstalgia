'use client'

import { useState, useEffect } from 'react'

interface Star {
  x: number
  y: number
  size: number
  speed: number
  opacity: number
}

export default function Starfield() {
  const [stars, setStars] = useState<Star[]>([])

  useEffect(() => {
    // Generate initial stars
    const initialStars: Star[] = Array.from({ length: 50 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.8 + 0.2
    }))
    setStars(initialStars)

    // Animate stars
    const interval = setInterval(() => {
      setStars(prevStars => 
        prevStars.map(star => ({
          ...star,
          y: star.y + star.speed,
          opacity: star.opacity > 0 ? star.opacity - 0.01 : 1
        })).map(star => 
          star.y > window.innerHeight ? { ...star, y: -10, opacity: 1 } : star
        )
      )
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: -1,
      overflow: 'hidden'
    }}>
      {stars.map((star, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            left: `${star.x}px`,
            top: `${star.y}px`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            background: '#ffffff',
            borderRadius: '50%',
            opacity: star.opacity,
            boxShadow: `0 0 ${star.size * 2}px #ffffff`
          }}
        />
      ))}
    </div>
  )
} 