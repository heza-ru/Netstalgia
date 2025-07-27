'use client'

import { useState, useEffect } from 'react'

interface ClickCounterProps {
  target: string
  onMilestone?: (count: number) => void
}

export default function ClickCounter({ target, onMilestone }: ClickCounterProps) {
  const [clickCount, setClickCount] = useState(0)
  const [showAchievement, setShowAchievement] = useState(false)

  const milestones = [10, 25, 50, 100, 250, 500, 1000]
  const achievements = [
    'CLICKING NOOB!',
    'CLICKING APPRENTICE!',
    'CLICKING MASTER!',
    'CLICKING LEGEND!',
    'CLICKING GOD!',
    'CLICKING OVERLORD!',
    'CLICKING DEITY!'
  ]

  const handleClick = () => {
    const newCount = clickCount + 1
    setClickCount(newCount)

    // Check for milestones
    const milestoneIndex = milestones.indexOf(newCount)
    if (milestoneIndex !== -1) {
      setShowAchievement(true)
      onMilestone?.(newCount)
      
      setTimeout(() => {
        alert(`🏆 ACHIEVEMENT UNLOCKED! 🏆\n\n${achievements[milestoneIndex]}\n\nYou clicked ${target} ${newCount} times!\n\nYou're a clicking champion!`)
        setShowAchievement(false)
      }, 100)
    }
  }

  return (
    <div 
      onClick={handleClick}
      style={{
        cursor: 'pointer',
        padding: '4px 8px',
        border: '2px outset #cdc7bb',
        background: '#ecece0',
        display: 'inline-block',
        margin: '4px',
        fontFamily: 'MS Sans Serif, Arial, sans-serif',
        fontSize: '10px',
        color: '#000080',
        userSelect: 'none'
      }}
    >
      {target}: {clickCount} clicks
      {showAchievement && (
        <div style={{
          position: 'absolute',
          top: '-30px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'linear-gradient(45deg, #ffff00, #ff6600)',
          border: '2px solid #000000',
          padding: '4px 8px',
          fontSize: '8px',
          fontWeight: 'bold',
          color: '#000000',
          whiteSpace: 'nowrap',
          zIndex: 1000,
          animation: 'achievementPop 0.5s ease-out'
        }}>
          🏆 ACHIEVEMENT! 🏆
          
          <style jsx>{`
            @keyframes achievementPop {
              0% { transform: translateX(-50%) scale(0); opacity: 0; }
              50% { transform: translateX(-50%) scale(1.2); opacity: 1; }
              100% { transform: translateX(-50%) scale(1); opacity: 1; }
            }
          `}</style>
        </div>
      )}
    </div>
  )
} 