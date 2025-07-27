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

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [showCursor, setShowCursor] = useState(true)
  const [dialAttempt, setDialAttempt] = useState(1)
  const [status, setStatus] = useState('Initializing...')
  const [audioStarted, setAudioStarted] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const forcePlayAudio = () => {
    if (audioRef.current) {
      // Set volume and other properties
      audioRef.current.volume = 0.5
      audioRef.current.muted = false
      
      // Try to play with different strategies
      const playPromise = audioRef.current.play()
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setAudioStarted(true)
            console.log('Dialup audio started successfully')
          })
          .catch((error) => {
            console.log('Audio play failed:', error)
            // Try alternative approach
            setTimeout(() => {
              if (audioRef.current) {
                audioRef.current.play().catch(console.log)
              }
            }, 100)
          })
      }
    }
  }

  useEffect(() => {
    // Multiple attempts to start audio
    const audioAttempts = [
      () => forcePlayAudio(), // Immediate
      () => setTimeout(forcePlayAudio, 100), // After 100ms
      () => setTimeout(forcePlayAudio, 500), // After 500ms
      () => setTimeout(forcePlayAudio, 1000), // After 1s
      () => setTimeout(forcePlayAudio, 2000), // After 2s
    ]

    // Execute all attempts
    audioAttempts.forEach(attempt => attempt())

    // Also try on any user interaction
    const handleAnyInteraction = () => {
      if (!audioStarted && audioRef.current) {
        audioRef.current.play().catch(console.log)
      }
    }

    // Listen for any user interaction
    document.addEventListener('click', handleAnyInteraction, { once: true })
    document.addEventListener('keydown', handleAnyInteraction, { once: true })
    document.addEventListener('touchstart', handleAnyInteraction, { once: true })
    document.addEventListener('mousedown', handleAnyInteraction, { once: true })

    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < DIAL_UP_MESSAGES.length - 1) {
          return prev + 1
        } else {
          clearInterval(stepInterval)
          setTimeout(() => {
            onComplete()
          }, 2000)
          return prev
        }
      })
    }, 1500)

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev < 100) {
          return prev + 2
        } else {
          clearInterval(progressInterval)
          return prev
        }
      })
    }, 100)

    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)

    const statusInterval = setInterval(() => {
      setStatus(prev => {
        if (prev === 'Initializing...') return 'Dialing...'
        if (prev === 'Dialing...') return 'Connecting...'
        if (prev === 'Connecting...') return 'Authenticating...'
        if (prev === 'Authenticating...') return 'Connected!'
        return prev
      })
    }, 2000)

    const dialAttemptInterval = setInterval(() => {
      setDialAttempt(prev => {
        if (prev < 5) return prev + 1
        return prev
      })
    }, 3000)

    return () => {
      clearInterval(stepInterval)
      clearInterval(progressInterval)
      clearInterval(cursorInterval)
      clearInterval(statusInterval)
      clearInterval(dialAttemptInterval)
      
      // Clean up event listeners
      document.removeEventListener('click', handleAnyInteraction)
      document.removeEventListener('keydown', handleAnyInteraction)
      document.removeEventListener('touchstart', handleAnyInteraction)
      document.removeEventListener('mousedown', handleAnyInteraction)
    }
  }, [onComplete, audioStarted])

  return (
    <div className="crash-screen" style={{background: '#000080'}}>
      {/* Windows 95 Dial-Up Connection Window */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '400px',
        background: '#c0c0c0',
        border: '3px outset #c0c0c0',
        fontFamily: 'MS Sans Serif, Microsoft Sans Serif, Arial, sans-serif',
        fontSize: '11px',
        color: '#000000',
        zIndex: 10000
      }}>
        {/* Title Bar */}
        <div style={{
          background: 'linear-gradient(90deg, #000080, #0000ff)',
          color: 'white',
          padding: '2px 4px',
          fontWeight: 'bold',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '11px'
        }}>
          <span>Dialing Progress</span>
          <div style={{display: 'flex', gap: '2px'}}>
            <div style={{
              width: '16px',
              height: '14px',
              background: '#c0c0c0',
              border: '1px outset #c0c0c0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '8px'
            }}>_</div>
            <div style={{
              width: '16px',
              height: '14px',
              background: '#c0c0c0',
              border: '1px outset #c0c0c0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '8px'
            }}>□</div>
            <div style={{
              width: '16px',
              height: '14px',
              background: '#c0c0c0',
              border: '1px outset #c0c0c0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '8px'
            }}>×</div>
          </div>
        </div>

        {/* Window Content */}
        <div style={{padding: '12px'}}>
          {/* Dialup GIF - Stretches end to end */}
          <div style={{
            marginBottom: '12px',
            background: '#ffffff',
            border: '2px inset #c0c0c0',
            padding: '8px'
          }}>
            <img 
              src="/assets/dialup.gif" 
              alt="Dial-up Connection" 
              style={{
                width: '100%',
                height: 'auto',
                display: 'block'
              }}
            />
          </div>

          {/* Connect to My Connection - Single line beneath GIF */}
          <div style={{marginBottom: '12px'}}>
            <div style={{
              background: '#ffffff',
              border: '2px inset #c0c0c0',
              padding: '4px 8px',
              fontSize: '11px',
              display: 'flex',
              alignItems: 'center'
            }}>
              <span style={{fontWeight: 'bold', marginRight: '8px'}}>Connect to:</span>
              <span>My Connection</span>
            </div>
          </div>

          {/* Action Section */}
          <div style={{marginBottom: '12px'}}>
            <div style={{fontWeight: 'bold', marginBottom: '4px'}}>Action:</div>
            <div style={{
              background: '#ffffff',
              border: '2px inset #c0c0c0',
              padding: '4px 8px',
              fontSize: '11px'
            }}>
              Dialing Attempt {dialAttempt} OF 5
            </div>
          </div>

          {/* Status Section */}
          <div style={{marginBottom: '12px'}}>
            <div style={{fontWeight: 'bold', marginBottom: '4px'}}>Status:</div>
            <div style={{
              background: '#ffffff',
              border: '2px inset #c0c0c0',
              padding: '4px 8px',
              fontSize: '11px',
              minHeight: '20px'
            }}>
              {status}
              {showCursor && <span style={{color: '#000000'}}>█</span>}
            </div>
          </div>

          {/* Connection Details */}
          <div style={{
            background: '#f0f0f0',
            border: '2px inset #c0c0c0',
            padding: '8px',
            fontSize: '10px',
            fontFamily: 'Courier New, MS Sans Serif, monospace'
          }}>
            <div style={{marginBottom: '4px'}}>
              <strong>Modem:</strong> US Robotics 56K V.90
            </div>
            <div style={{marginBottom: '4px'}}>
              <strong>Phone Number:</strong> 1-800-555-INTERNET
            </div>
            <div style={{marginBottom: '4px'}}>
              <strong>Connection Speed:</strong> 33.6 Kbps
            </div>
            <div style={{marginBottom: '4px'}}>
              <strong>Protocol:</strong> PPP
            </div>
            <div>
              <strong>Compression:</strong> MPPC
            </div>
          </div>

          {/* Buttons */}
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
              minWidth: '60px'
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
              minWidth: '60px'
            }}>
              Details
            </button>
          </div>
        </div>
      </div>

      {/* Audio Element */}
      <audio ref={audioRef} loop preload="auto" autoPlay muted={false}>
        <source src="/assets/dialup.mp3" type="audio/mpeg" />
        <source src="/assets/dialup.wav" type="audio/wav" />
        Your browser does not support the audio element.
      </audio>
    </div>
  )
} 