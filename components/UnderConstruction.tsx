'use client'

import { useState, useEffect } from 'react'

interface UnderConstructionProps {
  text?: string
  animated?: boolean
  variant?: 'banner' | 'page' | 'popup' | 'section'
  showWorker?: boolean
  showExcuse?: boolean
}

// Authentic 90s construction messages
const CONSTRUCTION_MESSAGES = [
  "UNDER CONSTRUCTION",
  "SITE UNDER CONSTRUCTION",
  "PARDON OUR DUST!",
  "COMING SOON!",
  "WORK IN PROGRESS",
  "UNDER RENOVATION",
  "BUILDING IN PROGRESS",
  "CONSTRUCTION ZONE",
  "WEBSITE UNDER CONSTRUCTION",
  "PLEASE EXCUSE OUR MESS!"
]

// Authentic 90s construction excuses and messages
const CONSTRUCTION_EXCUSES = [
  "Sorry! This page is still being built. Check back soon!",
  "Oops! Our webmaster is still working on this section.",
  "This page is under construction. Please be patient!",
  "Coming Soon! We're adding cool new content here.",
  "Under Construction! Our HTML elves are hard at work.",
  "Page Not Ready! Still coding this in Notepad.",
  "Work in Progress! Adding more animated GIFs soon.",
  "Construction Zone! Hard hats required beyond this point.",
  "Building in Progress! Our 56k modem is uploading files.",
  "Pardon Our Dust! Upgrading from HTML 2.0 to 3.0!",
  "Site Maintenance! Defragmenting our 1GB hard drive.",
  "Under Renovation! Installing more <BLINK> tags.",
  "Coming Soon! Just need to finish this in FrontPage 98.",
  "Work Zone! Our Pentium 133 is compiling the code.",
  "Construction Alert! Adding more visitor counters."
]

// Construction worker ASCII art variations
const WORKER_GRAPHICS = [
  `    👷‍♂️
   /|\\
   / \\`,
  `  🚧 👷‍♂️ 🚧
    /|\\
    / \\`,
  `👷‍♂️ 🔨
 /|\\
 / \\`,
  `  🏗️
 👷‍♂️ 🔧
  /|\\
  / \\`
]

export default function UnderConstruction({
  text,
  animated = true,
  variant = 'banner',
  showWorker = true,
  showExcuse = false
}: UnderConstructionProps) {
  const [currentMessage, setCurrentMessage] = useState(text || CONSTRUCTION_MESSAGES[0])
  const [currentExcuse, setCurrentExcuse] = useState('')
  const [currentWorker, setCurrentWorker] = useState(0)
  const [showCursor, setShowCursor] = useState(true)
  const [blinkState, setBlinkState] = useState(true)

  useEffect(() => {
    // Rotate construction messages if no specific text provided
    if (!text) {
      const messageInterval = setInterval(() => {
        setCurrentMessage(CONSTRUCTION_MESSAGES[Math.floor(Math.random() * CONSTRUCTION_MESSAGES.length)])
      }, 3000)

      return () => clearInterval(messageInterval)
    }
  }, [text])

  useEffect(() => {
    // Set random excuse if requested
    if (showExcuse) {
      setCurrentExcuse(CONSTRUCTION_EXCUSES[Math.floor(Math.random() * CONSTRUCTION_EXCUSES.length)])
    }
  }, [showExcuse])

  useEffect(() => {
    if (!animated) return

    // Animate worker graphics
    const workerInterval = setInterval(() => {
      setCurrentWorker(prev => (prev + 1) % WORKER_GRAPHICS.length)
    }, 1000)

    // Cursor blink
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)

    // Text blink
    const blinkInterval = setInterval(() => {
      setBlinkState(prev => !prev)
    }, 800)

    return () => {
      clearInterval(workerInterval)
      clearInterval(cursorInterval)
      clearInterval(blinkInterval)
    }
  }, [animated])

  // Render different variants
  if (variant === 'page') {
    return (
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'linear-gradient(45deg, #ffff00 0%, #ff6600 25%, #ffff00 50%, #ff6600 75%, #ffff00 100%)',
        backgroundSize: '40px 40px',
        animation: animated ? 'constructionMove 2s linear infinite' : 'none',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Consolas, Monaco, Courier New, monospace',
        zIndex: 1000
      }}>
        {/* Construction Header */}
        <div style={{
          background: '#000000',
          color: '#ffff00',
          padding: '20px',
          border: '5px solid #ff6600',
          marginBottom: '20px',
          textAlign: 'center',
          fontSize: '24px',
          fontWeight: 'bold',
          textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
          opacity: blinkState ? 1 : 0.7
        }}>
          🚧 {currentMessage} 🚧
        </div>

        {/* Worker Animation */}
        {showWorker && (
          <div style={{
            background: '#ffffff',
            border: '3px solid #000000',
            padding: '20px',
            marginBottom: '20px',
            fontSize: '16px',
            fontFamily: 'Courier New, monospace',
            whiteSpace: 'pre-line',
            textAlign: 'center'
          }}>
            {WORKER_GRAPHICS[currentWorker]}
          </div>
        )}

        {/* Excuse Message */}
        {showExcuse && (
          <div style={{
            background: '#ffffff',
            border: '2px solid #000000',
            padding: '15px',
            maxWidth: '500px',
            fontSize: '14px',
            textAlign: 'center',
            marginBottom: '20px'
          }}>
            {currentExcuse}
          </div>
        )}

        {/* Construction Details */}
        <div style={{
          background: '#ecece0',
          border: '2px inset #cdc7bb',
          padding: '15px',
          fontSize: '12px',
          textAlign: 'center',
          maxWidth: '400px'
        }}>
          <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
            🏗️ CONSTRUCTION DETAILS 🏗️
          </div>
          <div>Webmaster: webmaster@netstalgia.com</div>
          <div>Started: {new Date().toLocaleDateString()}</div>
          <div>Progress: {Math.floor(Math.random() * 60) + 20}%</div>
          <div>ETA: Soon™</div>
          <div style={{ marginTop: '8px', fontSize: '10px', color: '#808080' }}>
            Best viewed with Netscape Navigator 4.0+
          </div>
        </div>

        <style jsx>{`
          @keyframes constructionMove {
            0% { background-position: 0 0; }
            100% { background-position: 40px 40px; }
          }
        `}</style>
      </div>
    )
  }

  if (variant === 'popup') {
    return (
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: '#ecece0',
        border: '3px outset #cdc7bb',
        padding: '20px',
        zIndex: 1000,
        fontFamily: 'MS Sans Serif, Arial, sans-serif',
        fontSize: '12px',
        minWidth: '300px',
        boxShadow: '4px 4px 8px rgba(0,0,0,0.5)'
      }}>
        {/* Title Bar */}
        <div style={{
          background: 'linear-gradient(90deg, #000080, #0000ff)',
          color: '#ffffff',
          padding: '4px 8px',
          margin: '-20px -20px 15px -20px',
          fontSize: '11px',
          fontWeight: 'bold',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span>🚧 Under Construction</span>
          <span style={{ cursor: 'pointer' }}>✕</span>
        </div>

        {/* Content */}
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#ff6600',
            marginBottom: '10px',
            opacity: blinkState ? 1 : 0.7
          }}>
            {currentMessage}
          </div>

          {showWorker && (
            <div style={{
              fontSize: '14px',
              fontFamily: 'Courier New, monospace',
              whiteSpace: 'pre-line',
              marginBottom: '10px'
            }}>
              {WORKER_GRAPHICS[currentWorker]}
            </div>
          )}

          <div style={{ fontSize: '11px', marginBottom: '15px' }}>
            {currentExcuse || "This section is currently under construction."}
          </div>

          <button
            className="win95-button"
            style={{ padding: '4px 12px', fontSize: '11px' }}
          >
            OK
          </button>
        </div>
      </div>
    )
  }

  if (variant === 'section') {
    return (
      <div style={{
        background: 'linear-gradient(45deg, #ffff00, #ff6600)',
        border: '3px solid #000000',
        padding: '15px',
        margin: '10px 0',
        textAlign: 'center',
        fontFamily: 'MS Sans Serif, Arial, sans-serif',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Animated background pattern */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.1) 10px, rgba(0,0,0,0.1) 20px)',
          animation: animated ? 'constructionStripes 2s linear infinite' : 'none'
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#000000',
            textShadow: '1px 1px 2px rgba(255,255,255,0.8)',
            marginBottom: '8px',
            opacity: blinkState ? 1 : 0.7
          }}>
            🚧 {currentMessage} 🚧
          </div>

          {showWorker && (
            <div style={{
              fontSize: '12px',
              fontFamily: 'Courier New, monospace',
              whiteSpace: 'pre-line',
              marginBottom: '8px'
            }}>
              {WORKER_GRAPHICS[currentWorker]}
            </div>
          )}

          {showExcuse && (
            <div style={{
              fontSize: '10px',
              color: '#000000',
              fontWeight: 'bold'
            }}>
              {currentExcuse}
            </div>
          )}
        </div>

        <style jsx>{`
          @keyframes constructionStripes {
            0% { transform: translateX(0); }
            100% { transform: translateX(20px); }
          }
        `}</style>
      </div>
    )
  }

  // Default banner variant
  return (
    <div style={{
      background: 'linear-gradient(45deg, #ffff00, #ff6600, #ffff00)',
      border: '3px solid #000000',
      padding: '8px 16px',
      margin: '8px 0',
      textAlign: 'center',
      fontFamily: 'MS Sans Serif, Arial, sans-serif',
      fontWeight: 'bold',
      fontSize: '12px',
      color: '#000000',
      textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
      animation: animated ? 'constructionBlink 1s infinite' : 'none',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Blinking text */}
      <span style={{ opacity: blinkState ? 1 : 0.7 }}>
        🚧 {currentMessage} 🚧
      </span>

      {animated && showCursor && (
        <span style={{ animation: 'cursorBlink 1s infinite' }}>|</span>
      )}

      {/* Small worker icon */}
      {showWorker && (
        <span style={{
          position: 'absolute',
          right: '8px',
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: '16px'
        }}>
          👷‍♂️
        </span>
      )}

      <style jsx>{`
        @keyframes constructionBlink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0.8; }
        }
        
        @keyframes cursorBlink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  )
} 