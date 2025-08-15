'use client'

import { useState, useEffect } from 'react'

interface ClickCounterProps {
  target: string
  onMilestone?: (count: number) => void
  persistKey?: string
  showStats?: boolean
}

interface ClickStats {
  totalClicks: number
  todayClicks: number
  averagePerSession: number
  bestDay: string
  bestDayClicks: number
  firstClick: string
  lastClick: string
  clicksPerMinute: number
  sessionClicks: number
}

export default function ClickCounter({
  target,
  onMilestone,
  persistKey,
  showStats = false
}: ClickCounterProps) {
  const [clickCount, setClickCount] = useState(0)
  const [stats, setStats] = useState<ClickStats | null>(null)
  const [showAchievement, setShowAchievement] = useState(false)
  const [showDetailedStats, setShowDetailedStats] = useState(false)
  const [sessionStart] = useState(Date.now())
  const [recentClicks, setRecentClicks] = useState<number[]>([])

  const storageKey = persistKey || `click-counter-${target.toLowerCase().replace(/\s+/g, '-')}`
  const statsKey = `${storageKey}-stats`
  const dailyKey = `${storageKey}-daily`

  const milestones = [10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000]
  const achievements = [
    'CLICKING NOOB!',
    'CLICKING APPRENTICE!',
    'CLICKING ENTHUSIAST!',
    'CLICKING MASTER!',
    'CLICKING EXPERT!',
    'CLICKING LEGEND!',
    'CLICKING GOD!',
    'CLICKING OVERLORD!',
    'CLICKING DEITY!',
    'CLICKING IMMORTAL!'
  ]

  useEffect(() => {
    loadClickData()
  }, [])

  const loadClickData = () => {
    const savedCount = localStorage.getItem(storageKey)
    const savedStats = localStorage.getItem(statsKey)
    const today = new Date().toDateString()

    if (savedCount) {
      setClickCount(parseInt(savedCount))
    }

    if (savedStats) {
      const parsedStats = JSON.parse(savedStats)
      setStats(parsedStats)
    } else {
      // Initialize stats
      const initialStats: ClickStats = {
        totalClicks: 0,
        todayClicks: 0,
        averagePerSession: 0,
        bestDay: today,
        bestDayClicks: 0,
        firstClick: '',
        lastClick: '',
        clicksPerMinute: 0,
        sessionClicks: 0
      }
      setStats(initialStats)
    }
  }

  const playClickSound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.frequency.setValueAtTime(1000, audioContext.currentTime)
      oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.05)

      gainNode.gain.setValueAtTime(0.05, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.05)
    } catch (error) {
      // Fallback for browsers without Web Audio API
      console.log('🔊 *CLICK*')
    }
  }

  const updateStats = (newCount: number) => {
    if (!stats) return

    const now = new Date()
    const today = now.toDateString()
    const nowString = now.toLocaleString()

    // Load daily clicks
    const dailyData = JSON.parse(localStorage.getItem(dailyKey) || '{}')
    dailyData[today] = (dailyData[today] || 0) + 1

    // Calculate clicks per minute
    const sessionTime = (Date.now() - sessionStart) / 60000 // minutes
    const sessionClicks = stats.sessionClicks + 1
    const clicksPerMinute = sessionTime > 0 ? Math.round(sessionClicks / sessionTime) : 0

    // Find best day
    let bestDay = stats.bestDay
    let bestDayClicks = stats.bestDayClicks
    Object.entries(dailyData).forEach(([date, clicks]) => {
if (clicks as number > bestDayClicks) {
        bestDay = date
        bestDayClicks = clicks as number
      }
    })

    const updatedStats: ClickStats = {
      totalClicks: newCount,
      todayClicks: dailyData[today],
      averagePerSession: Math.round(newCount / Math.max(1, Object.keys(dailyData).length)),
      bestDay,
      bestDayClicks,
      firstClick: stats.firstClick || nowString,
      lastClick: nowString,
      clicksPerMinute,
      sessionClicks
    }

    setStats(updatedStats)
    localStorage.setItem(statsKey, JSON.stringify(updatedStats))
    localStorage.setItem(dailyKey, JSON.stringify(dailyData))
  }

  const handleClick = () => {
    const newCount = clickCount + 1
    setClickCount(newCount)
    localStorage.setItem(storageKey, newCount.toString())

    // Play click sound
    playClickSound()

    // Update recent clicks for rate calculation
    const now = Date.now()
    setRecentClicks(prev => [...prev.filter(time => now - time < 60000), now])

    // Update statistics
    updateStats(newCount)

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

  const getClickRate = () => {
    return recentClicks.length
  }

  return (
    <div style={{ position: 'relative', display: 'inline-block', margin: '4px' }}>
      <div
        onClick={handleClick}
        style={{
          cursor: 'pointer',
          padding: '6px 10px',
          border: '2px outset #cdc7bb',
          background: clickCount > 0 ? '#e0ffe0' : '#ecece0',
          display: 'inline-block',
          fontFamily: 'Consolas, Monaco, Courier New, monospace',
          fontSize: '10px',
          color: '#000080',
          userSelect: 'none',
          transition: 'all 0.1s ease',
          transform: showAchievement ? 'scale(1.05)' : 'scale(1)',
          boxShadow: clickCount > 100 ? '0 0 4px #00ff00' : 'none'
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.border = '2px inset #cdc7bb'
          e.currentTarget.style.background = '#d0d0d0'
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.border = '2px outset #cdc7bb'
          e.currentTarget.style.background = clickCount > 0 ? '#e0ffe0' : '#ecece0'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.border = '2px outset #cdc7bb'
          e.currentTarget.style.background = clickCount > 0 ? '#e0ffe0' : '#ecece0'
        }}
      >
        <div style={{ fontWeight: 'bold', marginBottom: '2px' }}>
          🖱️ {target}
        </div>
        <div style={{ fontSize: '12px', color: '#008000' }}>
          {clickCount.toLocaleString()} clicks
        </div>
        {getClickRate() > 5 && (
          <div style={{ fontSize: '8px', color: '#ff0000' }}>
            🔥 {getClickRate()}/min
          </div>
        )}
      </div>

      {/* Achievement popup */}
      {showAchievement && (
        <div style={{
          position: 'absolute',
          top: '-35px',
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
          animation: 'achievementPop 0.5s ease-out',
          borderRadius: '3px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
        }}>
          🏆 ACHIEVEMENT! 🏆
        </div>
      )}

      {/* Detailed stats toggle */}
      {showStats && stats && (
        <div style={{ marginTop: '4px' }}>
          <button
            onClick={() => setShowDetailedStats(!showDetailedStats)}
            className="win95-button"
            style={{ fontSize: '8px', padding: '2px 6px' }}
          >
            {showDetailedStats ? '📊 HIDE' : '📊 STATS'}
          </button>

          {showDetailedStats && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: '0',
              background: '#ffffff',
              border: '2px outset #cdc7bb',
              padding: '8px',
              fontSize: '8px',
              zIndex: 100,
              minWidth: '200px',
              boxShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}>
              <div style={{ fontWeight: 'bold', marginBottom: '4px', color: '#000080' }}>
                📊 {target.toUpperCase()} STATS
              </div>
              <div>Total Clicks: {stats.totalClicks.toLocaleString()}</div>
              <div>Today: {stats.todayClicks}</div>
              <div>This Session: {stats.sessionClicks}</div>
              <div>Rate: {stats.clicksPerMinute}/min</div>
              <div>Best Day: {stats.bestDayClicks} clicks</div>
              <div>Average/Session: {stats.averagePerSession}</div>
              {stats.firstClick && (
                <div style={{ fontSize: '7px', color: '#808080', marginTop: '4px' }}>
                  First: {stats.firstClick}
                </div>
              )}
              <div style={{ fontSize: '7px', color: '#808080' }}>
                Last: {stats.lastClick}
              </div>
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        @keyframes achievementPop {
          0% { transform: translateX(-50%) scale(0); opacity: 0; }
          50% { transform: translateX(-50%) scale(1.2); opacity: 1; }
          100% { transform: translateX(-50%) scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  )
} 