'use client'

import { useState, useEffect } from 'react'

interface VideoPopupProps {
  isOpen: boolean
  videoSrc: string
  title: string
  onClose: () => void
}

export default function VideoPopup({ isOpen, videoSrc, title, onClose }: VideoPopupProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [videoError, setVideoError] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsPlaying(false)
      setVideoError(false)
    }
  }, [isOpen])

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

        {/* Video Container */}
        <div style={{
          border: '3px inset #cdc7bb',
          background: '#000000',
          borderRadius: '4px',
          overflow: 'hidden',
          marginBottom: '16px',
          minHeight: '200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {videoError ? (
            <div style={{
              color: '#ffffff',
              textAlign: 'center',
              padding: '20px',
              fontSize: '14px'
            }}>
              <div style={{fontSize: '24px', marginBottom: '8px'}}>🎮</div>
              <div>Video could not be loaded</div>
              <div style={{fontSize: '12px', marginTop: '8px', opacity: 0.7}}>
                {title} - Secret Code Activated!
              </div>
            </div>
          ) : (
                      <video
            src={videoSrc}
            controls
            autoPlay
            muted
            style={{
              width: '100%',
              maxWidth: '640px',
              height: 'auto',
              display: 'block'
            }}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onError={() => setVideoError(true)}
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
            {isPlaying ? '▶️ Playing...' : '⏸️ Paused'}
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