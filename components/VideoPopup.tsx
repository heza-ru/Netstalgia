'use client'

import { useState, useEffect, useRef } from 'react'

interface VideoPopupProps {
  isOpen: boolean
  videoSrc: string
  title: string
  onClose: () => void
  secretCode?: string
}

// Fallback videos for when assets don't exist
const FALLBACK_VIDEOS = {
  konami: {
    title: '🎮 KONAMI CODE ACTIVATED! 🎮',
    content: 'The legendary cheat code sequence!\n↑↑↓↓←→←→BA\n\nUnlocks 30 lives in Contra!\nThe most famous cheat in gaming history!'
  },
  contra: {
    title: '🔫 CONTRA - 30 LIVES! 🔫',
    content: 'UP UP DOWN DOWN LEFT RIGHT LEFT RIGHT B A START\n\nThe Konami Code gives you 30 lives!\nNow you can beat the alien invasion!'
  },
  nintendo: {
    title: '🎮 NINTENDO POWER! 🎮',
    content: 'The ultimate gaming magazine!\nTips, tricks, and cheat codes!\n\nNow you\'re playing with power!'
  },
  doom: {
    title: '👹 DOOM - GOD MODE! 👹',
    content: 'IDDQD - God Mode Activated!\nIDKFA - All weapons and ammo!\nIDCLIP - Walk through walls!\n\nRip and tear!'
  },
  default: {
    title: '🎮 SECRET CODE ACTIVATED! 🎮',
    content: 'You found a secret!\nThis unlocks special 90s gaming memories!\n\nKeep exploring for more codes!'
  }
}

export default function VideoPopup({ isOpen, videoSrc, title, onClose, secretCode }: VideoPopupProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const [showFallback, setShowFallback] = useState(false)
  const [videoEnded, setVideoEnded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (isOpen) {
      setIsPlaying(false)
      setVideoError(false)
      setShowFallback(false)
      setVideoEnded(false)

      // Auto-show fallback after 2 seconds if video doesn't load
      const fallbackTimer = setTimeout(() => {
        setShowFallback(true)
      }, 2000)

      // Try to play video automatically when opened
      if (videoRef.current) {
        videoRef.current.currentTime = 0 // Start from beginning
        videoRef.current.play().catch(() => {
          // If autoplay fails, show fallback
          setShowFallback(true)
        })
      }

      return () => clearTimeout(fallbackTimer)
    }
  }, [isOpen, videoSrc])

  const getFallbackContent = () => {
    const codeKey = secretCode?.toLowerCase() || 'default'
    return FALLBACK_VIDEOS[codeKey as keyof typeof FALLBACK_VIDEOS] || FALLBACK_VIDEOS.default
  }

  if (!isOpen) return null

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10000
    }}>
      <div style={{
        background: '#ecece0',
        border: '4px outset #cdc7bb',
        padding: '20px',
        borderRadius: '8px',
        maxWidth: '90vw',
        maxHeight: '90vh',
        boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.2), 4px 4px 8px rgba(0,0,0,0.3)',
        position: 'relative'
      }}>
        {/* Title Bar */}
        <div style={{
          background: 'linear-gradient(45deg, #000080 0%, #0066cc 50%, #000080 100%)',
          color: 'white',
          padding: '8px 16px',
          margin: '-20px -20px 16px -20px',
          borderRadius: '4px 4px 0 0',
          fontSize: '14px',
          fontWeight: 'bold',
          textAlign: 'center',
          borderBottom: '2px outset #cdc7bb'
        }}>
          🎮 {title} 🎮
        </div>

        {/* Enhanced Video Container */}
        <div style={{
          border: '3px inset #cdc7bb',
          background: '#000000',
          borderRadius: '4px',
          overflow: 'hidden',
          marginBottom: '16px',
          minHeight: '300px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {videoError || showFallback ? (
            <div style={{
              color: '#ffffff',
              textAlign: 'center',
              padding: '30px',
              fontSize: '14px',
              fontFamily: 'Courier New, monospace',
              lineHeight: '1.6'
            }}>
              <div style={{
                fontSize: '32px',
                marginBottom: '16px',
                animation: 'blink 1s infinite'
              }}>
                {secretCode === 'konami' ? '🎮' :
                  secretCode === 'contra' ? '🔫' :
                    secretCode === 'nintendo' ? '🎮' :
                      secretCode === 'doom' ? '👹' : '🎮'}
              </div>
              <div style={{
                fontSize: '16px',
                fontWeight: 'bold',
                marginBottom: '16px',
                color: '#00ff00'
              }}>
                {getFallbackContent().title}
              </div>
              <div style={{
                fontSize: '12px',
                whiteSpace: 'pre-line',
                color: '#ffffff',
                background: 'rgba(0,255,0,0.1)',
                padding: '12px',
                border: '1px solid #00ff00',
                borderRadius: '4px'
              }}>
                {getFallbackContent().content}
              </div>
              <div style={{
                fontSize: '10px',
                marginTop: '12px',
                opacity: 0.7,
                color: '#ffff00'
              }}>
                🌟 SECRET CODE ACTIVATED! 🌟
              </div>
            </div>
          ) : (
            <video
              ref={videoRef}
              src={videoSrc}
              controls
              autoPlay
              muted={false}
              style={{
                width: '100%',
                maxWidth: '640px',
                height: 'auto',
                display: 'block'
              }}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onError={() => setVideoError(true)}
              onLoadStart={() => setShowFallback(false)}
              onEnded={() => {
                setVideoEnded(true)
                setIsPlaying(false)
                // Auto-close after 3 seconds when video ends
                setTimeout(() => {
                  onClose()
                }, 3000)
              }}
              onLoadedData={() => {
                // Ensure video plays when loaded
                if (videoRef.current && isOpen) {
                  videoRef.current.play().catch(() => setShowFallback(true))
                }
              }}
            />
          )}
        </div>

        {/* Controls */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{
            fontSize: '12px',
            color: '#666666',
            fontStyle: 'italic'
          }}>
            {videoEnded ? '✅ Video Complete!' :
              isPlaying ? '▶️ Playing...' :
                videoError || showFallback ? '🎮 Secret Activated!' : '⏸️ Paused'}
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'linear-gradient(45deg, #cdc7bb 0%, #ecece0 50%, #cdc7bb 100%)',
              border: '2px outset #cdc7bb',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 'bold',
              color: '#000000',
              boxShadow: 'inset 1px 1px 2px rgba(255,255,255,0.5), 1px 1px 2px rgba(0,0,0,0.2)'
            }}
          >
            CLOSE
          </button>
        </div>

        {/* Decorative corner elements */}
        <div style={{
          position: 'absolute',
          top: '8px',
          left: '8px',
          width: '16px',
          height: '16px',
          background: 'linear-gradient(45deg, #cdc7bb 0%, #ecece0 50%, #cdc7bb 100%)',
          border: '1px solid #896b4f',
          transform: 'rotate(45deg)'
        }}></div>
        <div style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          width: '16px',
          height: '16px',
          background: 'linear-gradient(45deg, #cdc7bb 0%, #ecece0 50%, #cdc7bb 100%)',
          border: '1px solid #896b4f',
          transform: 'rotate(45deg)'
        }}></div>
      </div>
    </div>
  )
} 