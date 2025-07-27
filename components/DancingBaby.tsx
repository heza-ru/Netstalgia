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

  return (
    <div className="center">
      <div 
        className="dancing-baby"
        onClick={handleClick}
        style={{ cursor: 'pointer' }}
      >
        <img 
          src="/assets/dancing-baby.gif" 
          alt="Famous Dancing Baby from 1996" 
          style={{ 
            border: '2px outset #c0c0c0',
            background: '#ffffff',
            padding: '4px'
          }}
        />
        
        {showSparkles && (
          <div className="ascii-art" style={{color: '#ffff00'}}>
{`
    * * * * * * * * *
    * SPARKLES! *
    * * * * * * * * *
`}
          </div>
        )}
        
        <div className="font-small text-web-purple mt-2">
          * FAMOUS DANCING BABY FROM 1996! *
        </div>
        <div className="font-small text-web-blue">
          * TRIPLE CLICK FOR EASTER EGG! *
        </div>
      </div>
    </div>
  )
} 