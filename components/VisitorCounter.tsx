'use client'

import { useState, useEffect } from 'react'

const STORAGE_KEY = 'netstalgia-visitors'

export default function VisitorCounter() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    // Load and increment count
    const stored = localStorage.getItem(STORAGE_KEY)
    const currentCount = stored ? parseInt(stored, 10) : Math.floor(Math.random() * 5000) + 1337
    const newCount = currentCount + Math.floor(Math.random() * 3) + 1
    
    setCount(newCount)
    localStorage.setItem(STORAGE_KEY, newCount.toString())

    // Slowly increment to simulate other visitors
    const interval = setInterval(() => {
      setCount(prev => {
        const incremented = prev + Math.floor(Math.random() * 2)
        localStorage.setItem(STORAGE_KEY, incremented.toString())
        return incremented
      })
    }, 45000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="mb-4 pixelated-window" style={{imageRendering: 'pixelated'}}>
      <div className="counter-display pixelated-text">
        <div className="font-small mb-1 pixelated-small">* VISITORS *</div>
        <div className="font-normal pixelated-text">
          {count.toString().padStart(8, '0')}
        </div>
        <div className="font-small mt-1 blink pixelated-small">
          YOU ARE VISITOR #{count}
        </div>
      </div>
      
      <div className="center mt-2 font-small">
        <div className="text-web-blue">⭐ SINCE 1996 ⭐</div>
        <div className="text-web-red blink">BEST VIEWED WITH NETSCAPE!</div>
        <div className="text-web-green">POWERED BY PERL CGI!</div>
      </div>
    </div>
  )
} 