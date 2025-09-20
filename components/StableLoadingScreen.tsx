'use client'

import { useState, useEffect } from 'react'

interface StableLoadingScreenProps {
  onComplete: () => void
  minDuration?: number
}

export default function StableLoadingScreen({ onComplete, minDuration = 3000 }: StableLoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)

  const loadingSteps = [
    { text: 'Initializing Windows 95...', duration: 800 },
    { text: 'Loading SYSTEM.DLL...', duration: 600 },
    { text: 'Connecting to Internet...', duration: 1000 },
    { text: 'Dialing ISP...', duration: 1200 },
    { text: 'Negotiating with server...', duration: 800 },
    { text: 'Downloading webpage...', duration: 600 },
    { text: 'Rendering 90s graphics...', duration: 700 },
    { text: 'Loading dancing baby...', duration: 500 },
    { text: 'Spawning popup ads...', duration: 400 },
    { text: 'Ready to surf!', duration: 300 }
  ]

  useEffect(() => {
    let isMounted = true
    let progressInterval: NodeJS.Timeout
    let stepTimeout: NodeJS.Timeout
    let startTime = Date.now()

    const updateProgress = () => {
      if (!isMounted) return
      
      const elapsed = Date.now() - startTime
      const baseProgress = Math.min((elapsed / minDuration) * 100, 95)
      const stepProgress = (currentStep / loadingSteps.length) * 5
      const totalProgress = Math.min(baseProgress + stepProgress, 100)
      
      setProgress(totalProgress)
    }

    const nextStep = () => {
      if (!isMounted) return
      
      if (currentStep < loadingSteps.length - 1) {
        setCurrentStep(prev => prev + 1)
      } else {
        // Final step completed
        const elapsed = Date.now() - startTime
        const remainingTime = Math.max(0, minDuration - elapsed)
        
        setTimeout(() => {
          if (isMounted) {
            setProgress(100)
            setTimeout(onComplete, 200)
          }
        }, remainingTime)
      }
    }

    // Start progress updates
    progressInterval = setInterval(updateProgress, 50)
    
    // Start step progression
    stepTimeout = setTimeout(nextStep, loadingSteps[currentStep]?.duration || 500)

    return () => {
      isMounted = false
      clearInterval(progressInterval)
      clearTimeout(stepTimeout)
    }
  }, [currentStep, minDuration, onComplete])

  const handleRetry = () => {
    setError(null)
    setProgress(0)
    setCurrentStep(0)
    setRetryCount(prev => prev + 1)
  }

  // Simulate occasional errors for authenticity
  useEffect(() => {
    if (Math.random() < 0.1 && retryCount < 2) {
      const errorTimeout = setTimeout(() => {
        setError('Connection timeout. Retrying...')
        setTimeout(handleRetry, 2000)
      }, Math.random() * 2000 + 1000)
      
      return () => clearTimeout(errorTimeout)
    }
  }, [retryCount])

  if (error) {
    return (
      <div style={{
        background: '#000080',
        color: '#ffffff',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Courier New, monospace',
        padding: '20px'
      }}>
        <div style={{ fontSize: '24px', marginBottom: '20px' }}>
          ⚠️ CONNECTION ERROR ⚠️
        </div>
        <div style={{ fontSize: '16px', marginBottom: '20px', textAlign: 'center' }}>
          {error}
        </div>
        <div style={{ fontSize: '12px', opacity: 0.7 }}>
          This is authentic 90s internet experience!
        </div>
      </div>
    )
  }

  return (
    <div style={{
      background: '#000080',
      color: '#ffffff',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Courier New, monospace',
      padding: '20px'
    }}>
      {/* Windows 95 Boot Screen */}
      <div style={{
        background: '#000080',
        border: '2px solid #ffffff',
        padding: '40px',
        textAlign: 'center',
        maxWidth: '500px',
        width: '100%'
      }}>
        <div style={{ fontSize: '32px', marginBottom: '20px' }}>
          🌐 NETSTALGIA BBS 🌐
        </div>
        
        <div style={{ fontSize: '16px', marginBottom: '30px' }}>
          {loadingSteps[currentStep]?.text || 'Loading...'}
        </div>

        {/* Progress Bar */}
        <div style={{
          width: '100%',
          height: '20px',
          background: '#ffffff',
          border: '2px inset #ffffff',
          marginBottom: '20px',
          position: 'relative'
        }}>
          <div style={{
            width: `${progress}%`,
            height: '100%',
            background: '#008000',
            transition: 'width 0.1s ease',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: '#000080',
              fontSize: '10px',
              fontWeight: 'bold'
            }}>
              {Math.round(progress)}%
            </div>
          </div>
        </div>

        {/* Modem Status */}
        <div style={{ fontSize: '12px', marginBottom: '10px' }}>
          📞 Modem Status: {progress < 50 ? 'DIALING' : 'CONNECTED'}
        </div>
        
        {/* Speed Indicator */}
        <div style={{ fontSize: '12px', marginBottom: '10px' }}>
          ⚡ Connection Speed: {progress < 30 ? '14.4K' : progress < 70 ? '28.8K' : '56K'}
        </div>

        {/* Fun Facts */}
        <div style={{ fontSize: '10px', opacity: 0.7, marginTop: '20px' }}>
          {progress < 25 && 'Did you know? The first website went live in 1991!'}
          {progress >= 25 && progress < 50 && 'Fun fact: Windows 95 had a hidden pinball game!'}
          {progress >= 50 && progress < 75 && 'Trivia: The dancing baby was created in 1996!'}
          {progress >= 75 && 'Almost ready! Get ready for the 90s experience!'}
        </div>

        {/* Loading Animation */}
        <div style={{
          marginTop: '20px',
          fontSize: '20px',
          animation: 'blink 1s infinite'
        }}>
          {currentStep % 4 === 0 && '⠋'}
          {currentStep % 4 === 1 && '⠙'}
          {currentStep % 4 === 2 && '⠹'}
          {currentStep % 4 === 3 && '⠸'}
        </div>
      </div>

      {/* Footer */}
      <div style={{ fontSize: '10px', marginTop: '20px', opacity: 0.6 }}>
        Best viewed with Netscape Navigator 3.0+ • 800x600 resolution recommended
      </div>
    </div>
  )
}
