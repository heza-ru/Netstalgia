'use client'

import { useState, useEffect } from 'react'

interface VisitorStats {
  totalVisitors: number
  uniqueVisitors: number
  pageViews: number
  lastVisit: string
  firstVisit: string
  sessionStart: string
  returningVisitor: boolean
  visitCount: number
  timeOnSite: number
}

const STORAGE_KEY = 'netstalgia-visitors'
const STATS_KEY = 'netstalgia-visitor-stats'
const SESSION_KEY = 'netstalgia-session'

export default function VisitorCounter() {
  const [count, setCount] = useState(0)
  const [stats, setStats] = useState<VisitorStats | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [showStats, setShowStats] = useState(false)

  useEffect(() => {
    initializeVisitorTracking()

    // Slowly increment to simulate other visitors
    const interval = setInterval(() => {
      setCount(prev => {
        const incremented = prev + Math.floor(Math.random() * 2)
        localStorage.setItem(STORAGE_KEY, incremented.toString())
        return incremented
      })
    }, 45000)

    // Update time on site every minute
    const timeInterval = setInterval(() => {
      updateTimeOnSite()
    }, 60000)

    return () => {
      clearInterval(interval)
      clearInterval(timeInterval)
    }
  }, [])

  const initializeVisitorTracking = () => {
    const now = new Date()
    const nowString = now.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })

    // Load or initialize total visitor count
    const stored = localStorage.getItem(STORAGE_KEY)
    const currentCount = stored ? parseInt(stored, 10) : Math.floor(Math.random() * 5000) + 1337

    // Load or initialize visitor stats
    const storedStats = localStorage.getItem(STATS_KEY)
    let visitorStats: VisitorStats

    if (storedStats) {
      visitorStats = JSON.parse(storedStats)
      // Check if this is a new session (more than 30 minutes since last visit)
      const lastVisitTime = new Date(visitorStats.lastVisit).getTime()
      const timeDiff = now.getTime() - lastVisitTime
      const isNewSession = timeDiff > 30 * 60 * 1000 // 30 minutes

      if (isNewSession) {
        visitorStats.visitCount += 1
        visitorStats.returningVisitor = true
        visitorStats.sessionStart = nowString
        visitorStats.timeOnSite = 0
      }

      visitorStats.lastVisit = nowString
      visitorStats.pageViews += 1
    } else {
      // First time visitor
      visitorStats = {
        totalVisitors: currentCount,
        uniqueVisitors: 1,
        pageViews: 1,
        lastVisit: nowString,
        firstVisit: nowString,
        sessionStart: nowString,
        returningVisitor: false,
        visitCount: 1,
        timeOnSite: 0
      }
    }

    // Increment total visitor count for new visitors
    const newCount = currentCount + (visitorStats.returningVisitor ? 0 : Math.floor(Math.random() * 3) + 1)
    visitorStats.totalVisitors = newCount

    setCount(newCount)
    setStats(visitorStats)

    localStorage.setItem(STORAGE_KEY, newCount.toString())
    localStorage.setItem(STATS_KEY, JSON.stringify(visitorStats))
    localStorage.setItem(SESSION_KEY, nowString)

    // Trigger animation for new visitors
    if (!visitorStats.returningVisitor) {
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 2000)
    }
  }

  const updateTimeOnSite = () => {
    if (!stats) return

    const sessionStart = localStorage.getItem(SESSION_KEY)
    if (sessionStart) {
      const startTime = new Date(sessionStart).getTime()
      const currentTime = Date.now()
      const timeOnSite = Math.floor((currentTime - startTime) / 60000) // minutes

      const updatedStats = { ...stats, timeOnSite }
      setStats(updatedStats)
      localStorage.setItem(STATS_KEY, JSON.stringify(updatedStats))
    }
  }

  const formatNumber = (num: number) => {
    return num.toString().padStart(8, '0')
  }

  const getDigitStyle = (digit: string, index: number) => ({
    display: 'inline-block',
    width: '14px',
    height: '20px',
    background: 'linear-gradient(180deg, #000000 0%, #001100 100%)',
    color: '#00ff00',
    textAlign: 'center' as const,
    fontFamily: 'Courier New, monospace',
    fontSize: '14px',
    fontWeight: 'bold',
    border: '1px solid #003300',
    borderRadius: '2px',
    margin: '0 1px',
    lineHeight: '20px',
    textShadow: '0 0 3px #00ff00',
    boxShadow: isAnimating ? '0 0 8px #00ff00' : 'inset 0 1px 2px rgba(0,0,0,0.5)',
    transform: isAnimating ? 'scale(1.1)' : 'scale(1)',
    transition: 'all 0.3s ease-in-out'
  })

  return (
    <div className="mb-4 pixelated-window" style={{
      imageRendering: 'pixelated',
      padding: '12px',
      background: '#ecece0'
    }}>
      {/* LED-style counter display */}
      <div style={{
        background: 'linear-gradient(180deg, #000000 0%, #001100 100%)',
        border: '3px inset #cdc7bb',
        padding: '12px',
        textAlign: 'center',
        marginBottom: '8px',
        borderRadius: '4px'
      }}>
        <div style={{
          fontSize: '10px',
          fontWeight: 'bold',
          color: '#00ff00',
          marginBottom: '6px',
          textShadow: '0 0 3px #00ff00'
        }}>
          ★ VISITOR COUNTER ★
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '2px',
          marginBottom: '8px'
        }}>
          {formatNumber(count).split('').map((digit, index) => (
            <div key={index} style={getDigitStyle(digit, index)}>
              {digit}
            </div>
          ))}
        </div>

        <div style={{
          fontSize: '9px',
          color: '#00ff00',
          marginBottom: '4px',
          textShadow: '0 0 2px #00ff00'
        }}>
          {stats?.returningVisitor ?
            `WELCOME BACK! VISIT #${stats.visitCount}` :
            `YOU ARE VISITOR #${count}`
          }
        </div>

        <div className="blink" style={{
          fontSize: '8px',
          color: '#ffff00',
          textShadow: '0 0 2px #ffff00'
        }}>
          ● LIVE COUNTER ●
        </div>
      </div>

      {/* Statistics toggle button */}
      <div style={{ textAlign: 'center', marginBottom: '8px' }}>
        <button
          onClick={() => setShowStats(!showStats)}
          className="win95-button"
          style={{ fontSize: '10px', padding: '2px 8px' }}
        >
          {showStats ? '📊 HIDE STATS' : '📊 VIEW STATS'}
        </button>
      </div>

      {/* Detailed statistics */}
      {showStats && stats && (
        <div style={{
          background: '#ffffff',
          border: '2px inset #cdc7bb',
          padding: '8px',
          fontSize: '9px',
          marginBottom: '8px'
        }}>
          <div style={{ fontWeight: 'bold', marginBottom: '4px', color: '#000080' }}>
            📈 VISITOR STATISTICS
          </div>
          <table style={{ width: '100%', fontSize: '8px' }}>
            <tbody>
              <tr>
                <td>Total Visitors:</td>
                <td style={{ textAlign: 'right', fontWeight: 'bold' }}>{stats.totalVisitors.toLocaleString()}</td>
              </tr>
              <tr>
                <td>Page Views:</td>
                <td style={{ textAlign: 'right', fontWeight: 'bold' }}>{stats.pageViews}</td>
              </tr>
              <tr>
                <td>Your Visits:</td>
                <td style={{ textAlign: 'right', fontWeight: 'bold' }}>{stats.visitCount}</td>
              </tr>
              <tr>
                <td>Time on Site:</td>
                <td style={{ textAlign: 'right', fontWeight: 'bold' }}>{stats.timeOnSite} min</td>
              </tr>
              <tr>
                <td>First Visit:</td>
                <td style={{ textAlign: 'right', fontSize: '7px' }}>{stats.firstVisit}</td>
              </tr>
              <tr>
                <td>Last Visit:</td>
                <td style={{ textAlign: 'right', fontSize: '7px' }}>{stats.lastVisit}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Classic 90s footer */}
      <div className="center font-small">
        <div className="text-web-blue" style={{ fontSize: '10px' }}>⭐ SINCE 1996 ⭐</div>
        <div className="text-web-red blink" style={{ fontSize: '9px' }}>BEST VIEWED WITH NETSCAPE!</div>
        <div className="text-web-green" style={{ fontSize: '9px' }}>POWERED BY PERL CGI!</div>
      </div>
    </div>
  )
} 