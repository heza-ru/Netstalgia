'use client'

import { useState, useEffect } from 'react'

interface CursorTrailProps {
  isActive: boolean
  onClose: () => void
}

interface TrailPoint {
  id: number
  x: number
  y: number
  opacity: number
  scale: number
  rotation: number
  color: string
}

export default function CursorTrail({ isActive, onClose }: CursorTrailProps) {
  const [trailPoints, setTrailPoints] = useState<TrailPoint[]>([])
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [pointId, setPointId] = useState(0)

  const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ff6600', '#ff0066']

  useEffect(() => {
    if (!isActive) return

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
      
      // Add new trail point
      const newPoint: TrailPoint = {
        id: pointId,
        x: e.clientX,
        y: e.clientY,
        opacity: 1,
        scale: 1,
        rotation: Math.random() * 360,
        color: colors[Math.floor(Math.random() * colors.length)]
      }
      
      setTrailPoints(prev => [...prev, newPoint])
      setPointId(prev => prev + 1)
      
      // Remove old points after animation
      setTimeout(() => {
        setTrailPoints(prev => prev.filter(point => point.id !== newPoint.id))
      }, 1000)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isActive, pointId])

  if (!isActive) return null

  return (
    <>
      {/* Cursor trail points */}
      {trailPoints.map((point) => (
        <div
          key={point.id}
          style={{
            position: 'fixed',
            left: point.x - 10,
            top: point.y - 10,
            width: '20px',
            height: '20px',
            pointerEvents: 'none',
            zIndex: 10000,
            opacity: point.opacity,
            transform: `scale(${point.scale}) rotate(${point.rotation}deg)`,
            transition: 'all 1s ease-out'
          }}
        >
          {/* Sparkle effect */}
          <div style={{
            width: '100%',
            height: '100%',
            background: `radial-gradient(circle, ${point.color} 0%, transparent 70%)`,
            borderRadius: '50%',
            animation: 'sparkle 1s ease-out forwards'
          }} />
          
          {/* Cross sparkle */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '4px',
            height: '20px',
            background: point.color,
            transform: 'translate(-50%, -50%)',
            borderRadius: '2px'
          }} />
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '20px',
            height: '4px',
            background: point.color,
            transform: 'translate(-50%, -50%)',
            borderRadius: '2px'
          }} />
        </div>
      ))}

      {/* Close button */}
      <div style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 10001,
        background: '#ecece0',
        border: '3px outset #cdc7bb',
        padding: '8px',
        cursor: 'pointer',
        fontFamily: 'MS Sans Serif, Arial, sans-serif',
        fontSize: '10px'
      }} onClick={onClose}>
        ✕ CURSOR TRAIL
      </div>

      <style jsx>{`
        @keyframes sparkle {
          0% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
          100% {
            opacity: 0;
            transform: scale(0.5) rotate(180deg);
          }
        }
      `}</style>
    </>
  )
} 