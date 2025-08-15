'use client'

import { useState, useEffect } from 'react'

interface HitCounterProps {
  className?: string
}

interface HitStats {
  totalHits: number
  todayHits: number
  weekHits: number
  monthHits: number
  lastHit: string
  peakDay: string
  peakHits: number
  averageDaily: number
}

const HIT_STORAGE_KEY = 'netstalgia-hits'
const HIT_STATS_KEY = 'netstalgia-hit-stats'
const DAILY_HITS_KEY = 'netstalgia-daily-hits'

export default function HitCounter({ className = '' }: HitCounterProps) {
  const [count, setCount] = useState(0)
  const [stats, setStats] = useState<HitStats | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [showDetailedStats, setShowDetailedStats] = useState(false)

  useEffect(() => {
    initializeHitTracking()

    // Simulate random hits from other visitors
    const interval = setInterval(() => {
      incrementHitCount(false)
    }, Math.random() * 120000 + 60000) // 1-3 minutes

    return () => clearInterval(interval)
  }, [])

  const initializeHitTracking = () => {
    const now = new Date()
    const today = now.toDateString()

    // Load or initialize hit count
    const savedCount = localStorage.getItem(HIT_STORAGE_KEY)
    const initialCount = savedCount ? parseInt(savedCount) : Math.floor(Math.random() * 10000) + 1000

    // Load or initialize daily hits tracking
    const dailyHitsData = localStorage.getItem(DAILY_HITS_KEY)
    let dailyHits: Record<string, number> = {}

    if (dailyHitsData) {
      dailyHits = JSON.parse(dailyHitsData)
    }

    // Initialize today's hits if not exists
    if (!dailyHits[today]) {
      dailyHits[today] = 0
    }

    // Load or initialize hit stats
    const savedStats = localStorage.getItem(HIT_STATS_KEY)
    let hitStats: HitStats

    if (savedStats) {
      hitStats = JSON.parse(savedStats)
    } else {
      hitStats = {
        totalHits: initialCount,
        todayHits: dailyHits[today],
        weekHits: 0,
        monthHits: 0,
        lastHit: now.toLocaleString(),
        peakDay: today,
        peakHits: dailyHits[today],
        averageDaily: 0
      }
    }

    // Check if user has visited before today
    const hasVisitedToday = localStorage.getItem(`visited-${today}`)
    if (!hasVisitedToday) {
      incrementHitCount(true)
      localStorage.setItem(`visited-${today}`, 'true')
    } else {
      setCount(initialCount)
      setStats(hitStats)
    }
  }

  const incrementHitCount = (isUserHit: boolean = false) => {
    const now = new Date()
    const today = now.toDateString()

    // Load current data
    const currentCount = parseInt(localStorage.getItem(HIT_STORAGE_KEY) || '0')
    const dailyHitsData = JSON.parse(localStorage.getItem(DAILY_HITS_KEY) || '{}')
    const currentStats = JSON.parse(localStorage.getItem(HIT_STATS_KEY) || '{}')

    // Increment counts
    const newCount = currentCount + (isUserHit ? Math.floor(Math.random() * 3) + 1 : 1)
    dailyHitsData[today] = (dailyHitsData[today] || 0) + 1

    // Calculate statistics
    const todayHits = dailyHitsData[today]
    const weekHits = calculateWeekHits(dailyHitsData)
    const monthHits = calculateMonthHits(dailyHitsData)
    const { peakDay, peakHits } = findPeakDay(dailyHitsData)
    const averageDaily = calculateAverageDaily(dailyHitsData)

    const updatedStats: HitStats = {
      totalHits: newCount,
      todayHits,
      weekHits,
      monthHits,
      lastHit: now.toLocaleString(),
      peakDay,
      peakHits,
      averageDaily
    }

    // Save to localStorage
    localStorage.setItem(HIT_STORAGE_KEY, newCount.toString())
    localStorage.setItem(DAILY_HITS_KEY, JSON.stringify(dailyHitsData))
    localStorage.setItem(HIT_STATS_KEY, JSON.stringify(updatedStats))

    // Update state
    setCount(newCount)
    setStats(updatedStats)

    // Trigger animation for user hits
    if (isUserHit) {
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 1500)
    }
  }

  const calculateWeekHits = (dailyHits: Record<string, number>): number => {
    const now = new Date()
    let weekHits = 0

    for (let i = 0; i < 7; i++) {
      const date = new Date(now)
      date.setDate(date.getDate() - i)
      const dateString = date.toDateString()
      weekHits += dailyHits[dateString] || 0
    }

    return weekHits
  }

  const calculateMonthHits = (dailyHits: Record<string, number>): number => {
    const now = new Date()
    let monthHits = 0

    for (let i = 0; i < 30; i++) {
      const date = new Date(now)
      date.setDate(date.getDate() - i)
      const dateString = date.toDateString()
      monthHits += dailyHits[dateString] || 0
    }

    return monthHits
  }

  const findPeakDay = (dailyHits: Record<string, number>): { peakDay: string, peakHits: number } => {
    let peakDay = ''
    let peakHits = 0

    Object.entries(dailyHits).forEach(([date, hits]) => {
      if (hits > peakHits) {
        peakHits = hits
        peakDay = date
      }
    })

    return { peakDay, peakHits }
  }

  const calculateAverageDaily = (dailyHits: Record<string, number>): number => {
    const days = Object.keys(dailyHits).length
    const totalHits = Object.values(dailyHits).reduce((sum, hits) => sum + hits, 0)
    return days > 0 ? Math.round(totalHits / days) : 0
  }

  const formatNumber = (num: number) => {
    return num.toString().padStart(6, '0')
  }

  const getDigitStyle = (digit: string, index: number) => ({
    display: 'inline-block',
    width: '14px',
    height: '18px',
    background: 'linear-gradient(180deg, #000000 0%, #001100 100%)',
    color: '#ff0000',
    textAlign: 'center' as const,
    fontFamily: 'Courier New, monospace',
    fontSize: '13px',
    fontWeight: 'bold',
    border: '1px solid #330000',
    borderRadius: '2px',
    margin: '0 1px',
    lineHeight: '18px',
    textShadow: '0 0 3px #ff0000',
    boxShadow: isAnimating ? '0 0 8px #ff0000' : 'inset 0 1px 2px rgba(0,0,0,0.5)',
    transform: isAnimating ? 'rotateX(180deg)' : 'rotateX(0deg)',
    transition: 'transform 0.3s ease-in-out'
  })

  return (
    <div className={`hit-counter ${className}`} style={{
      border: '3px outset #cdc7bb',
      padding: '10px',
      background: '#ecece0',
      textAlign: 'center',
      marginBottom: '12px',
      imageRendering: 'pixelated'
    }}>
      <div style={{
        fontSize: '11px',
        fontWeight: 'bold',
        color: '#000080',
        marginBottom: '6px'
      }}>
        ★ HIT COUNTER ★
      </div>

      {/* LED Display */}
      <div style={{
        background: 'linear-gradient(180deg, #000000 0%, #001100 100%)',
        border: '2px inset #cdc7bb',
        padding: '8px',
        marginBottom: '8px',
        borderRadius: '3px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '2px',
          marginBottom: '4px'
        }}>
          {formatNumber(count).split('').map((digit, index) => (
            <div key={index} style={getDigitStyle(digit, index)}>
              {digit}
            </div>
          ))}
        </div>

        <div style={{
          fontSize: '8px',
          color: '#ff0000',
          textShadow: '0 0 2px #ff0000'
        }}>
          TOTAL HITS
        </div>
      </div>

      {/* Quick Stats */}
      {stats && (
        <div style={{
          fontSize: '9px',
          marginBottom: '6px',
          color: '#000080'
        }}>
          <div>Today: {stats.todayHits} | Week: {stats.weekHits}</div>
          <div>Avg/Day: {stats.averageDaily}</div>
        </div>
      )}

      {/* Toggle detailed stats */}
      <button
        onClick={() => setShowDetailedStats(!showDetailedStats)}
        className="win95-button"
        style={{ fontSize: '8px', padding: '2px 6px', marginBottom: '6px' }}
      >
        {showDetailedStats ? 'HIDE' : 'STATS'}
      </button>

      {/* Detailed Statistics */}
      {showDetailedStats && stats && (
        <div style={{
          background: '#ffffff',
          border: '1px inset #cdc7bb',
          padding: '6px',
          fontSize: '8px',
          textAlign: 'left',
          marginBottom: '6px'
        }}>
          <div style={{ fontWeight: 'bold', marginBottom: '3px', color: '#000080' }}>
            📊 HIT STATISTICS
          </div>
          <div>Total Hits: {stats.totalHits.toLocaleString()}</div>
          <div>Today: {stats.todayHits}</div>
          <div>This Week: {stats.weekHits}</div>
          <div>This Month: {stats.monthHits}</div>
          <div>Peak Day: {stats.peakHits} hits</div>
          <div>Average/Day: {stats.averageDaily}</div>
          <div style={{ fontSize: '7px', color: '#808080', marginTop: '3px' }}>
            Last Hit: {stats.lastHit}
          </div>
        </div>
      )}

      <div style={{
        fontSize: '8px',
        color: '#008000',
        marginBottom: '2px'
      }}>
        SINCE 1999
      </div>

      <div className="blink" style={{
        fontSize: '8px',
        color: '#ff0000',
        fontWeight: 'bold'
      }}>
        ★ AUTHENTIC HITS! ★
      </div>
    </div>
  )
} 