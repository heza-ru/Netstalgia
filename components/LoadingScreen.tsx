'use client'

import { useState, useEffect, useRef } from 'react'

interface LoadingScreenProps {
  onComplete: () => void
}

const DIAL_UP_MESSAGES = [
  'Initializing modem...',
  'Dialing Internet Service Provider...',
  'Handshaking with modem...',
  'Negotiating connection speed...',
  'Establishing PPP connection...',
  'Verifying username and password...',
  'Registering on network...',
  'Connection established successfully!'
]

// Realistic connection speeds and their probabilities (90s era)
const CONNECTION_SPEEDS = [
  { speed: '14.4 Kbps', probability: 0.15, multiplier: 2.5 },
  { speed: '28.8 Kbps', probability: 0.25, multiplier: 2.0 },
  { speed: '33.6 Kbps', probability: 0.35, multiplier: 1.5 },
  { speed: '56K V.90', probability: 0.20, multiplier: 1.0 },
  { speed: '56K V.92', probability: 0.05, multiplier: 0.8 }
]

// Audio fallback sources for maximum compatibility
const AUDIO_SOURCES = [
  { src: '/assets/dialup.mp3', type: 'audio/mpeg' },
  { src: '/assets/dialup.wav', type: 'audio/wav' },
  { src: '/assets/dialup.ogg', type: 'audio/ogg' }
]

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [showCursor, setShowCursor] = useState(true)
  const [dialAttempt, setDialAttempt] = useState(1)
  const [status, setStatus] = useState('Initializing...')
  const [audioStarted, setAudioStarted] = useState(false)
  const [connectionSpeed, setConnectionSpeed] = useState('33.6 Kbps')
  const [speedMultiplier, setSpeedMultiplier] = useState(1.5)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Enhanced audio loading with multiple fallback strategies
  const tryPlayAudio = async (sourceIndex: number = 0): Promise<boolean> => {
    if (!audioRef.current || sourceIndex >= AUDIO_SOURCES.length) {
      console.log('Audio playback failed - no more sources to try')
      return false
    }

    const source = AUDIO_SOURCES[sourceIndex]
    audioRef.current.src = source.src
    audioRef.current.volume = 0.4
    audioRef.current.muted = false
    audioRef.current.loop = true

    try {
      await audioRef.current.play()
      setAudioStarted(true)
      console.log(`Dialup audio started successfully with source: ${source.src}`)
      return true
    } catch (error) {
      console.log(`Audio source ${sourceIndex} failed:`, error)

      // Try next source after a brief delay
      if (sourceIndex < AUDIO_SOURCES.length - 1) {
        setTimeout(() => {
          tryPlayAudio(sourceIndex + 1)
        }, 200)
      }
      return false
    }
  }

  const initializeAudio = () => {
    // Multiple initialization strategies
    const strategies = [
      () => tryPlayAudio(0), // Immediate attempt
      () => setTimeout(() => tryPlayAudio(0), 100), // Delayed attempt
      () => setTimeout(() => tryPlayAudio(0), 500), // Further delayed
    ]

    strategies.forEach(strategy => strategy())

    // User interaction fallback
    const handleUserInteraction = () => {
      if (!audioStarted) {
        tryPlayAudio(0)
      }
    }

    // Listen for any user interaction to enable audio
    const events = ['click', 'keydown', 'touchstart', 'mousedown']
    events.forEach(event => {
      document.addEventListener(event, handleUserInteraction, { once: true })
    })

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleUserInteraction)
      })
    }
  }

  // Simulate realistic connection speed selection
  const selectConnectionSpeed = () => {
    const random = Math.random()
    let cumulativeProbability = 0

    for (const speed of CONNECTION_SPEEDS) {
      cumulativeProbability += speed.probability
      if (random <= cumulativeProbability) {
        setConnectionSpeed(speed.speed)
        setSpeedMultiplier(speed.multiplier)
        return
      }
    }

    // Fallback to most common speed
    setConnectionSpeed('33.6 Kbps')
    setSpeedMultiplier(1.5)
  }

  useEffect(() => {
    // Initialize connection speed simulation
    selectConnectionSpeed()

    // Initialize audio with enhanced fallback system
    const cleanupAudio = initializeAudio()

    // Variable timing based on connection speed (faster for better UX)
    const baseStepDelay = 400  // Reduced from 1200 to 400
    const baseProgressDelay = 30  // Reduced from 80 to 30
    const stepDelay = Math.floor(baseStepDelay * speedMultiplier)
    const progressDelay = Math.floor(baseProgressDelay * speedMultiplier)

    // Realistic step progression with variable timing
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < DIAL_UP_MESSAGES.length - 1) {
          return prev + 1
        } else {
          clearInterval(stepInterval)
          // Final delay before completion varies by connection speed (reduced for faster loading)
          const completionDelay = Math.floor(500 * speedMultiplier)  // Reduced from 2000 to 500
          setTimeout(() => {
            onComplete()
          }, completionDelay)
          return prev
        }
      })
    }, stepDelay)

    // Progress bar that moves at realistic speeds
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev < 100) {
          // Slower connections have more variable progress speeds
          const increment = speedMultiplier > 2 ? Math.random() * 1.5 + 0.5 : 2
          return Math.min(prev + increment, 100)
        } else {
          clearInterval(progressInterval)
          return prev
        }
      })
    }, progressDelay)

    // Blinking cursor effect
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)

    // Status updates with realistic timing
    const statusInterval = setInterval(() => {
      setStatus(prev => {
        if (prev === 'Initializing...') return 'Dialing...'
        if (prev === 'Dialing...') return 'Connecting...'
        if (prev === 'Connecting...') return 'Authenticating...'
        if (prev === 'Authenticating...') return 'Connected!'
        return prev
      })
    }, Math.floor(2000 * speedMultiplier))

    // Dial attempt counter (slower connections may retry more)
    const dialAttemptInterval = setInterval(() => {
      setDialAttempt(prev => {
        const maxAttempts = speedMultiplier > 2 ? 7 : 5
        if (prev < maxAttempts) return prev + 1
        return prev
      })
    }, Math.floor(3000 * speedMultiplier))

    // Cleanup function
    return () => {
      clearInterval(stepInterval)
      clearInterval(progressInterval)
      clearInterval(cursorInterval)
      clearInterval(statusInterval)
      clearInterval(dialAttemptInterval)

      // Clean up audio event listeners
      cleanupAudio()
    }
  }, [onComplete, speedMultiplier])

  return (
    <div className="loading-screen-container" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: '#000080',
      zIndex: 99999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      boxSizing: 'border-box',
      overflow: 'hidden'
    }}>
      {/* Enhanced Windows 95 Dial-Up Connection Window */}
      <div className="loading-window" style={{
        width: '420px',
        maxWidth: '95vw',
        height: 'auto',
        maxHeight: '90vh',
        overflow: 'visible',
        background: '#c0c0c0',
        border: '2px outset #c0c0c0',
        boxShadow: '2px 2px 4px rgba(0,0,0,0.3)',
        position: 'relative'
      }}>
        {/* Enhanced Title Bar with perfect Windows 95 styling */}
        <div style={{
          background: 'linear-gradient(90deg, #000080 0%, #0040c0 50%, #000080 100%)',
          color: 'white',
          padding: '3px 6px',
          fontWeight: 'bold',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '11px',
          borderBottom: '1px solid #808080',
          textShadow: '1px 1px 1px rgba(0, 0, 0, 0.7)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div style={{
              width: '16px',
              height: '16px',
              background: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'16\' height=\'16\' viewBox=\'0 0 16 16\'><rect width=\'16\' height=\'16\' fill=\'%23c0c0c0\'/><rect x=\'2\' y=\'2\' width=\'12\' height=\'12\' fill=\'%23000080\'/><rect x=\'4\' y=\'4\' width=\'8\' height=\'8\' fill=\'%23ffffff\'/></svg>")',
              imageRendering: 'pixelated'
            }}></div>
            <span>Dialing Progress</span>
          </div>
          <div style={{ display: 'flex', gap: '2px' }}>
            <div style={{
              width: '16px',
              height: '14px',
              background: '#c0c0c0',
              border: '1px outset #c0c0c0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '8px',
              color: '#000000',
              cursor: 'pointer'
            }}>_</div>
            <div style={{
              width: '16px',
              height: '14px',
              background: '#c0c0c0',
              border: '1px outset #c0c0c0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '8px',
              color: '#000000',
              cursor: 'pointer'
            }}>□</div>
            <div style={{
              width: '16px',
              height: '14px',
              background: '#c0c0c0',
              border: '1px outset #c0c0c0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '8px',
              color: '#000000',
              cursor: 'pointer'
            }}>×</div>
          </div>
        </div>

        {/* Enhanced Window Content */}
        <div style={{
          padding: '8px',
          background: '#c0c0c0',
          fontFamily: 'MS Sans Serif, Microsoft Sans Serif, Arial, sans-serif',
          fontSize: '11px',
          color: '#000000'
        }}>
          {/* Enhanced Dialup Animation Area */}
          <div style={{
            marginBottom: '12px',
            minHeight: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#ffffff',
            border: '2px inset #c0c0c0',
            padding: '4px'
          }}>
            <img
              src="/assets/dialup.gif"
              alt="Dial-up Connection"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                imageRendering: 'pixelated'
              }}
              onError={(e) => {
                // Fallback to animated text if GIF doesn't exist
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
                target.parentElement!.innerHTML = `
                  <div style="font-family: Courier New, monospace; font-size: 12px; text-align: center; animation: blink 1s infinite;">
                    📞 CONNECTING... 📞<br/>
                    <div style="margin-top: 8px;">
                      ${Array(Math.floor(progress / 10)).fill('█').join('')}${Array(10 - Math.floor(progress / 10)).fill('░').join('')}
                    </div>
                  </div>
                `
              }}
            />
          </div>

          {/* Enhanced Connection Info */}
          <div style={{
            border: '2px inset #c0c0c0',
            padding: '12px 8px 8px 8px',
            margin: '8px 0',
            position: 'relative',
            background: '#c0c0c0',
            marginBottom: '12px'
          }}>
            <div style={{
              position: 'absolute',
              top: '-6px',
              left: '8px',
              background: '#c0c0c0',
              padding: '0 4px',
              fontFamily: 'MS Sans Serif, Microsoft Sans Serif, Arial, sans-serif',
              fontSize: '11px',
              color: '#000000'
            }}>Connect to</div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'default',
              fontFamily: 'MS Sans Serif, Microsoft Sans Serif, Arial, sans-serif',
              fontSize: '11px',
              color: '#000000'
            }}>
              <span>My Connection ({connectionSpeed})</span>
            </div>
          </div>

          {/* Action Section with Enhanced Progress */}
          <div style={{
            border: '2px inset #c0c0c0',
            padding: '12px 8px 8px 8px',
            margin: '8px 0',
            position: 'relative',
            background: '#c0c0c0',
            marginBottom: '12px'
          }}>
            <div style={{
              position: 'absolute',
              top: '-6px',
              left: '8px',
              background: '#c0c0c0',
              padding: '0 4px',
              fontFamily: 'MS Sans Serif, Microsoft Sans Serif, Arial, sans-serif',
              fontSize: '11px',
              color: '#000000'
            }}>Action</div>
            <div style={{
              cursor: 'default',
              fontFamily: 'MS Sans Serif, Microsoft Sans Serif, Arial, sans-serif',
              fontSize: '11px',
              color: '#000000',
              marginBottom: '8px'
            }}>
              Dialing Attempt {dialAttempt} OF {speedMultiplier > 2 ? 7 : 5}
            </div>

            {/* Enhanced Windows 95 progress bar */}
            <div style={{
              background: '#ffffff',
              border: '2px inset #c0c0c0',
              height: '20px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                height: '100%',
                background: 'linear-gradient(90deg, #000080, #0000ff)',
                width: `${progress}%`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '11px',
                fontWeight: 'bold',
                textShadow: '1px 1px 1px rgba(0, 0, 0, 0.5)',
                transition: 'width 0.3s ease'
              }}>
                {progress > 20 ? `${Math.floor(progress)}%` : ''}
              </div>
            </div>
          </div>

          {/* Enhanced Status Section */}
          <div style={{
            border: '2px inset #c0c0c0',
            padding: '12px 8px 8px 8px',
            margin: '8px 0',
            position: 'relative',
            background: '#c0c0c0',
            marginBottom: '12px'
          }}>
            <div style={{
              position: 'absolute',
              top: '-6px',
              left: '8px',
              background: '#c0c0c0',
              padding: '0 4px',
              fontFamily: 'MS Sans Serif, Microsoft Sans Serif, Arial, sans-serif',
              fontSize: '11px',
              color: '#000000'
            }}>Status</div>
            <div style={{
              minHeight: '20px',
              fontFamily: 'Courier New, monospace',
              cursor: 'default',
              fontSize: '11px',
              color: '#000000',
              display: 'flex',
              alignItems: 'center'
            }}>
              {DIAL_UP_MESSAGES[currentStep]}
              {showCursor && <span style={{ color: '#000000', marginLeft: '2px' }}>█</span>}
            </div>
          </div>

          {/* Enhanced Connection Details */}
          <div style={{
            border: '2px inset #c0c0c0',
            padding: '12px 8px 8px 8px',
            margin: '8px 0',
            position: 'relative',
            background: '#c0c0c0'
          }}>
            <div style={{
              position: 'absolute',
              top: '-6px',
              left: '8px',
              background: '#c0c0c0',
              padding: '0 4px',
              fontFamily: 'MS Sans Serif, Microsoft Sans Serif, Arial, sans-serif',
              fontSize: '11px',
              color: '#000000'
            }}>Connection Details</div>
            <div style={{ fontSize: '10px', fontFamily: 'Courier New, MS Sans Serif, monospace' }}>
              <div style={{ marginBottom: '4px' }}>
                <strong>Modem:</strong> US Robotics 56K V.90
              </div>
              <div style={{ marginBottom: '4px' }}>
                <strong>Phone Number:</strong> 1-800-555-INTERNET
              </div>
              <div style={{ marginBottom: '4px' }}>
                <strong>Connection Speed:</strong> {connectionSpeed}
              </div>
              <div style={{ marginBottom: '4px' }}>
                <strong>Protocol:</strong> PPP
              </div>
              <div style={{ marginBottom: '4px' }}>
                <strong>Compression:</strong> MPPC
              </div>
              <div>
                <strong>Status:</strong> {status}
              </div>
            </div>
          </div>

          {/* Enhanced Buttons */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            marginTop: '12px'
          }}>
            <button style={{
              background: '#c0c0c0',
              border: '2px outset #c0c0c0',
              padding: '4px 12px',
              fontFamily: 'MS Sans Serif, Microsoft Sans Serif, Arial, sans-serif',
              fontSize: '11px',
              color: '#000000',
              cursor: 'pointer',
              margin: '2px',
              minWidth: '75px',
              textAlign: 'center'
            }}>
              Cancel
            </button>
            <button style={{
              background: '#c0c0c0',
              border: '2px outset #c0c0c0',
              padding: '4px 12px',
              fontFamily: 'MS Sans Serif, Microsoft Sans Serif, Arial, sans-serif',
              fontSize: '11px',
              color: '#000000',
              cursor: 'pointer',
              margin: '2px',
              minWidth: '75px',
              textAlign: 'center'
            }}>
              Details
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Audio Element with multiple sources */}
      <audio ref={audioRef} loop preload="auto" style={{ display: 'none' }}>
        {AUDIO_SOURCES.map((source, index) => (
          <source key={index} src={source.src} type={source.type} />
        ))}
        Your browser does not support the audio element.
      </audio>
    </div>
  )
} 