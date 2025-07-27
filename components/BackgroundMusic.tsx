'use client'
import { useState, useRef, useEffect } from 'react'

interface WinampPlayerProps {
  onPlay?: () => void
  onPause?: () => void
}

export default function WinampPlayer({ onPlay, onPause }: WinampPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState({ x: window.innerWidth - 320, y: window.innerHeight - 200 })
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [visualizerBars, setVisualizerBars] = useState<number[]>([])
  const [isMinimized, setIsMinimized] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const playerRef = useRef<HTMLDivElement>(null)

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play()
      setIsPlaying(true)
      onPlay?.()
    }
  }

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
      onPause?.()
    }
  }

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      setIsPlaying(false)
      onPause?.()
    }
  }

  const handleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (playerRef.current) {
      const rect = playerRef.current.getBoundingClientRect()
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      })
      setIsDragging(true)
    }
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, dragOffset])

  // Animate visualizer when playing
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setVisualizerBars(Array.from({ length: 20 }, () => Math.random() * 30 + 5))
      }, 100)
      return () => clearInterval(interval)
    } else {
      setVisualizerBars(Array.from({ length: 20 }, () => 5))
    }
  }, [isPlaying])

  // Set initial volume and try autoplay
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5
      // Try to start playing automatically after a delay
      setTimeout(() => {
        if (audioRef.current && !isPlaying) {
          audioRef.current.play().then(() => {
            setIsPlaying(true)
          }).catch(() => {
            // Autoplay blocked, user will need to click play
            console.log('Autoplay blocked by browser policy')
          })
        }
      }, 2000)
    }
  }, [isPlaying])

  return (
                <div
        ref={playerRef}
        onMouseDown={handleMouseDown}
        style={{
          position: 'fixed',
          left: position.x,
          top: position.y,
          zIndex: 1000,
          cursor: isDragging ? 'grabbing' : 'grab',
          userSelect: 'none'
        }}
      >
        <div className="win95-window" style={{
          width: isMinimized ? '200px' : '250px',
          background: '#ecece0',
          border: isDragging ? '3px solid #000080' : '3px outset #cdc7bb',
          fontFamily: 'Consolas, Monaco, Courier New, monospace',
          boxShadow: isDragging ? '0 0 10px rgba(0,0,128,0.5)' : 'none',
          imageRendering: 'pixelated'
        }}>
        {/* Title Bar */}
        <div className="win95-titlebar" style={{
          background: '#000080',
          color: '#ffffff',
          padding: '4px 8px',
          fontSize: '10px',
          fontWeight: 'bold',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: 'Courier New, monospace',
          letterSpacing: '1px'
        }}>
          <span>WinAmp v2.95</span>
          <div style={{ display: 'flex', gap: '2px' }}>
            <button 
              onClick={handleMinimize}
              style={{
                background: '#ecece0',
                border: '2px outset #cdc7bb',
                width: '16px',
                height: '16px',
                fontSize: '8px',
                cursor: 'pointer',
                fontFamily: 'Courier New, monospace',
                fontWeight: 'bold'
              }}
            >
              {isMinimized ? '□' : '_'}
            </button>
            <button style={{
              background: '#ecece0',
              border: '2px outset #cdc7bb',
              width: '16px',
              height: '16px',
              fontSize: '8px',
              cursor: 'pointer',
              fontFamily: 'Courier New, monospace',
              fontWeight: 'bold'
            }}>□</button>
            <button style={{
              background: '#ecece0',
              border: '2px outset #cdc7bb',
              width: '16px',
              height: '16px',
              fontSize: '8px',
              cursor: 'pointer',
              fontFamily: 'Courier New, monospace',
              fontWeight: 'bold'
            }}>×</button>
          </div>
        </div>

        {/* Player Content */}
        <div style={{ padding: isMinimized ? '8px' : '12px', background: '#ecece0' }}>
          {/* Track Info */}
          <div style={{
            background: '#000000',
            color: '#00ff00',
            padding: '6px',
            marginBottom: '6px',
            fontSize: '10px',
            fontFamily: 'Consolas, Monaco, Courier New, monospace',
            textAlign: 'center',
            border: '2px inset #cdc7bb',
            letterSpacing: '0.3px',
            lineHeight: '1.3'
          }}>
            <div style={{ marginBottom: '2px' }}>
              {isPlaying ? '▶ PLAYING' : '⏸ PAUSED'}
            </div>
            <div style={{ fontSize: '9px' }}>
              HAMSTERDANCE.MID
            </div>
            <div style={{ fontSize: '8px', color: '#ffff00' }}>
              128 KBPS • 2.3 MB • 3:45
            </div>
          </div>

          {/* Visualizer - Only show when not minimized */}
          {!isMinimized && (
            <div style={{
              background: '#000000',
              height: '30px',
              marginBottom: '6px',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              padding: '3px',
              border: '2px inset #cdc7bb'
            }}>
              {visualizerBars.slice(0, 15).map((height, i) => (
                <div
                  key={i}
                  style={{
                    width: '4px',
                    height: `${Math.floor(height * 0.8)}px`,
                    background: isPlaying ? '#00ff00' : '#333333',
                    margin: '0 1px',
                    transition: 'none',
                    imageRendering: 'pixelated'
                  }}
                />
              ))}
            </div>
          )}

          {/* Controls */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '4px',
            marginBottom: '6px'
          }}>
            <button
              onClick={handlePlay}
              className="win95-button"
              style={{
                background: '#ecece0',
                border: '2px outset #cdc7bb',
                padding: '3px 6px',
                fontSize: '10px',
                cursor: 'pointer',
                fontFamily: 'Consolas, Monaco, Courier New, monospace',
                letterSpacing: '0.3px',
                fontWeight: 'bold'
              }}
            >
              ▶ PLAY
            </button>
            <button
              onClick={handlePause}
              className="win95-button"
              style={{
                background: '#ecece0',
                border: '2px outset #cdc7bb',
                padding: '3px 6px',
                fontSize: '10px',
                cursor: 'pointer',
                fontFamily: 'Consolas, Monaco, Courier New, monospace',
                letterSpacing: '0.3px',
                fontWeight: 'bold'
              }}
            >
              ⏸ PAUSE
            </button>
            <button
              onClick={handleStop}
              className="win95-button"
              style={{
                background: '#ecece0',
                border: '2px outset #cdc7bb',
                padding: '3px 6px',
                fontSize: '10px',
                cursor: 'pointer',
                fontFamily: 'Consolas, Monaco, Courier New, monospace',
                letterSpacing: '0.3px',
                fontWeight: 'bold'
              }}
            >
              ⏹ STOP
            </button>
          </div>

          {/* Status */}
          <div style={{
            fontSize: '9px',
            textAlign: 'center',
            color: '#000080',
            fontWeight: 'bold',
            fontFamily: 'Consolas, Monaco, Courier New, monospace',
            letterSpacing: '0.3px'
          }}>
            {isPlaying ? 'NOW PLAYING: HAMSTERDANCE.MID' : 'READY'}
          </div>
        </div>
      </div>

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src="/assets/hamster dance.mp3"
        preload="auto"
        autoPlay
        muted
        onEnded={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onLoadedData={() => {
          if (audioRef.current) {
            audioRef.current.volume = 0.5
            // Try to unmute and play after a short delay
            setTimeout(() => {
              if (audioRef.current) {
                audioRef.current.muted = false
                audioRef.current.play().catch(() => {
                  // If autoplay fails, keep muted and let user control
                  console.log('Autoplay blocked by browser')
                })
              }
            }, 1000)
          }
        }}
      />
    </div>
  )
} 