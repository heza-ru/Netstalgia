'use client'

import { useState, useEffect } from 'react'
import CursorTrail from './CursorTrail'
import SnakeGame from './SnakeGame'

interface EasterEggManagerProps {
  className?: string
}

export default function EasterEggManager({ className = '' }: EasterEggManagerProps) {
  const [activeEasterEgg, setActiveEasterEgg] = useState<string | null>(null)
  const [easterEggCount, setEasterEggCount] = useState(0)

  useEffect(() => {
    const handleEasterEgg = (event: CustomEvent) => {
      const { type, source } = event.detail
      setActiveEasterEgg(type)
      setEasterEggCount(prev => prev + 1)
      
      // Auto-close some effects after a delay
      if (type === 'cursor-trail' || type === 'starfield-effect' || type === 'rainbow-text' || type === 'matrix-effect') {
        setTimeout(() => {
          setActiveEasterEgg(null)
        }, 10000) // 10 seconds
      }
    }

    window.addEventListener('triggerEasterEgg', handleEasterEgg as EventListener)
    return () => window.removeEventListener('triggerEasterEgg', handleEasterEgg as EventListener)
  }, [])

  const closeEasterEgg = () => {
    setActiveEasterEgg(null)
  }

  const renderEasterEgg = () => {
    switch (activeEasterEgg) {
      case 'cursor-trail':
        return <CursorTrail isActive={true} onClose={closeEasterEgg} />
      
      case 'snake-game':
        return <SnakeGame isActive={true} onClose={closeEasterEgg} />
      
      case 'tetris-game':
        return (
          <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10000,
            background: '#ecece0',
            border: '4px outset #cdc7bb',
            padding: '16px',
            fontFamily: 'MS Sans Serif, Arial, sans-serif'
          }}>
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
              <span>🧩 TETRIS GAME v1.0</span>
              <button onClick={closeEasterEgg} style={{
                background: '#cdc7bb',
                border: '2px outset #cdc7bb',
                padding: '2px 6px',
                fontSize: '10px',
                cursor: 'pointer',
                color: '#000000'
              }}>✕</button>
            </div>
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <div style={{ fontSize: '16px', marginBottom: '20px' }}>🎮 TETRIS COMING SOON! 🎮</div>
              <div style={{ fontSize: '12px', color: '#808080' }}>
                This Tetris game is under construction!<br/>
                Try clicking other banner ads for more games!
              </div>
            </div>
          </div>
        )
      
      case 'pong-game':
        return (
          <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10000,
            background: '#ecece0',
            border: '4px outset #cdc7bb',
            padding: '16px',
            fontFamily: 'MS Sans Serif, Arial, sans-serif'
          }}>
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
              <span>🏓 PONG GAME v1.0</span>
              <button onClick={closeEasterEgg} style={{
                background: '#cdc7bb',
                border: '2px outset #cdc7bb',
                padding: '2px 6px',
                fontSize: '10px',
                cursor: 'pointer',
                color: '#000000'
              }}>✕</button>
            </div>
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <div style={{ fontSize: '16px', marginBottom: '20px' }}>🏓 PONG COMING SOON! 🏓</div>
              <div style={{ fontSize: '12px', color: '#808080' }}>
                This Pong game is under construction!<br/>
                Try clicking other banner ads for more games!
              </div>
            </div>
          </div>
        )
      
      case 'starfield-effect':
        return (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: '#000000',
            zIndex: 9999,
            pointerEvents: 'none'
          }}>
            {Array.from({ length: 100 }, (_, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: '2px',
                  height: '2px',
                  background: '#ffffff',
                  animation: `starfield ${2 + Math.random() * 3}s linear infinite`
                }}
              />
            ))}
            <div style={{
              position: 'fixed',
              top: '20px',
              right: '20px',
              zIndex: 10001,
              background: '#ecece0',
              border: '3px outset #cdc7bb',
              padding: '8px',
              cursor: 'pointer',
              fontFamily: 'MS Sans Serif, Arial, sans-serif',
              fontSize: '10px',
              pointerEvents: 'auto'
            }} onClick={closeEasterEgg}>
              ✕ STARFIELD
            </div>
            <style jsx>{`
              @keyframes starfield {
                0% { transform: translateY(0px); opacity: 1; }
                100% { transform: translateY(-100vh); opacity: 0; }
              }
            `}</style>
          </div>
        )
      
      case 'rainbow-text':
        return (
          <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10000,
            background: '#ecece0',
            border: '4px outset #cdc7bb',
            padding: '16px',
            fontFamily: 'MS Sans Serif, Arial, sans-serif',
            textAlign: 'center'
          }}>
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
              <span>🌈 RAINBOW TEXT EFFECT</span>
              <button onClick={closeEasterEgg} style={{
                background: '#cdc7bb',
                border: '2px outset #cdc7bb',
                padding: '2px 6px',
                fontSize: '10px',
                cursor: 'pointer',
                color: '#000000'
              }}>✕</button>
            </div>
            <div style={{
              fontSize: '24px',
              fontWeight: 'bold',
              animation: 'rainbow 2s linear infinite'
            }}>
              🌈 RAINBOW TEXT! 🌈
            </div>
            <div style={{ fontSize: '12px', marginTop: '12px', color: '#808080' }}>
              This effect makes text rainbow colored!<br/>
              (Actually, it's just this popup...)
            </div>
            <style jsx>{`
              @keyframes rainbow {
                0% { color: #ff0000; }
                16% { color: #ff8000; }
                33% { color: #ffff00; }
                50% { color: #00ff00; }
                66% { color: #0080ff; }
                83% { color: #8000ff; }
                100% { color: #ff0000; }
              }
            `}</style>
          </div>
        )
      
      case 'matrix-effect':
        return (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: '#000000',
            zIndex: 9999,
            fontFamily: 'Courier New, monospace',
            fontSize: '12px',
            color: '#00ff00',
            overflow: 'hidden'
          }}>
            {Array.from({ length: 50 }, (_, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: `${Math.random() * 100}%`,
                  top: '-20px',
                  animation: `matrix ${3 + Math.random() * 4}s linear infinite`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              >
                {Array.from({ length: 20 }, (_, j) => (
                  <div key={j} style={{ opacity: Math.random() }}>
                    {String.fromCharCode(0x30A0 + Math.random() * 96)}
                  </div>
                ))}
              </div>
            ))}
            <div style={{
              position: 'fixed',
              top: '20px',
              right: '20px',
              zIndex: 10001,
              background: '#000000',
              border: '2px solid #00ff00',
              padding: '8px',
              cursor: 'pointer',
              fontFamily: 'Courier New, monospace',
              fontSize: '10px',
              color: '#00ff00',
              pointerEvents: 'auto'
            }} onClick={closeEasterEgg}>
              ✕ MATRIX
            </div>
            <style jsx>{`
              @keyframes matrix {
                0% { transform: translateY(0px); opacity: 1; }
                100% { transform: translateY(100vh); opacity: 0; }
              }
            `}</style>
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <>
      {activeEasterEgg && renderEasterEgg()}
      
      {/* Easter egg counter display */}
      {easterEggCount > 0 && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          background: '#ecece0',
          border: '3px outset #cdc7bb',
          padding: '8px',
          fontFamily: 'MS Sans Serif, Arial, sans-serif',
          fontSize: '10px',
          zIndex: 10002
        }}>
          🎉 Easter Eggs Found: {easterEggCount}
        </div>
      )}
    </>
  )
} 