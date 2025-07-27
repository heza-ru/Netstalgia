'use client'

import { useState, useEffect } from 'react'

interface MailNotificationProps {
  className?: string
}

export default function MailNotification({ className = '' }: MailNotificationProps) {
  const [showNotification, setShowNotification] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Show notification after 30 seconds
    const timer = setTimeout(() => {
      setShowNotification(true)
      setIsVisible(true)
    }, 30000)

    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => setShowNotification(false), 300)
  }

  const handleCheckMail = () => {
    // Trigger easter egg instead of alert
    const easterEggs = ['snake-game', 'cursor-trail', 'starfield-effect', 'rainbow-text']
    const randomEasterEgg = easterEggs[Math.floor(Math.random() * easterEggs.length)]
    
    const event = new CustomEvent('triggerEasterEgg', {
      detail: { type: randomEasterEgg, source: 'mail-notification' }
    })
    window.dispatchEvent(event)
    handleClose()
  }

  if (!showNotification) return null

  return (
    <div className={`mail-notification ${className}`} style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: `translate(-50%, -50%) ${isVisible ? 'scale(1)' : 'scale(0.8)'}`,
      zIndex: 10000,
      transition: 'transform 0.3s ease-in-out',
      opacity: isVisible ? 1 : 0
    }}>
      {/* AOL-style notification window */}
      <div style={{
        background: '#ecece0',
        border: '4px outset #cdc7bb',
        padding: '16px',
        minWidth: '300px',
        boxShadow: '4px 4px 8px rgba(0,0,0,0.3)',
        fontFamily: 'MS Sans Serif, Arial, sans-serif'
      }}>
        {/* Title bar */}
        <div style={{
          background: '#000080',
          color: '#ffffff',
          padding: '4px 8px',
          margin: '-16px -16px 12px -16px',
          fontSize: '12px',
          fontWeight: 'bold',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span>📧 You've Got Mail!</span>
          <button
            onClick={handleClose}
            style={{
              background: '#cdc7bb',
              border: '2px outset #cdc7bb',
              padding: '2px 6px',
              fontSize: '10px',
              cursor: 'pointer',
              color: '#000000'
            }}
          >
            ✕
          </button>
        </div>

        {/* Icon and message */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '16px'
        }}>
          <div style={{
            fontSize: '32px',
            color: '#ff0000'
          }}>
            📧
          </div>
          <div>
            <div style={{
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#000080',
              marginBottom: '4px'
            }}>
              You've Got Mail!
            </div>
            <div style={{
              fontSize: '11px',
              color: '#000000'
            }}>
              You have 3 new messages waiting.
            </div>
          </div>
        </div>

        {/* Email preview */}
        <div style={{
          background: '#ffffff',
          border: '2px inset #cdc7bb',
          padding: '8px',
          marginBottom: '16px',
          fontSize: '10px'
        }}>
          <div style={{ color: '#000080', fontWeight: 'bold', marginBottom: '4px' }}>
            Latest Message:
          </div>
          <div style={{ color: '#000000' }}>
            From: mom@aol.com<br/>
            Subject: "Dinner is ready!"<br/>
            Time: 2:30 PM EST
          </div>
        </div>

        {/* Buttons */}
        <div style={{
          display: 'flex',
          gap: '8px',
          justifyContent: 'flex-end'
        }}>
          <button
            onClick={handleClose}
            style={{
              background: '#cdc7bb',
              border: '2px outset #cdc7bb',
              padding: '4px 12px',
              fontSize: '10px',
              cursor: 'pointer',
              color: '#000000'
            }}
          >
            Close
          </button>
          <button
            onClick={handleCheckMail}
            style={{
              background: '#cdc7bb',
              border: '2px outset #cdc7bb',
              padding: '4px 12px',
              fontSize: '10px',
              cursor: 'pointer',
              color: '#000000',
              fontWeight: 'bold'
            }}
          >
            Check Mail
          </button>
        </div>

        {/* AOL branding */}
        <div style={{
          fontSize: '8px',
          color: '#808080',
          textAlign: 'center',
          marginTop: '8px',
          borderTop: '1px solid #cdc7bb',
          paddingTop: '4px'
        }}>
          America Online - Making the Internet Easy!
        </div>
      </div>

      {/* Sound effect simulation */}
      <audio id="mailSound" style={{ display: 'none' }}>
        <source src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT" />
      </audio>

      <style jsx>{`
        @keyframes mailPulse {
          0% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.05); }
          100% { transform: translate(-50%, -50%) scale(1); }
        }
        
        .mail-notification {
          animation: mailPulse 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
} 