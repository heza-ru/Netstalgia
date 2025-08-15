'use client'

import { useState, useEffect } from 'react'

interface EasterEggModalProps {
  onClose: () => void
}

export default function EasterEggModal({ onClose }: EasterEggModalProps) {
  const [showJumpScare, setShowJumpScare] = useState(false)

  useEffect(() => {
    // 30% chance for jump scare
    if (Math.random() < 0.3) {
      const timer = setTimeout(() => {
        setShowJumpScare(true)
        setTimeout(onClose, 2000)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [onClose])

  if (showJumpScare) {
    return (
      <div style={{ position: 'fixed', inset: 0, zIndex: 50, background: '#000000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontSize: '72px' }}>👻</div>
        <div style={{ position: 'absolute', bottom: '40px', textAlign: 'center', color: '#ffffff' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold' }}>BOO!</div>
          <div style={{ fontSize: '14px' }}>GOT YOU! 😱</div>
        </div>
      </div>
    )
  }

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 50, background: 'rgba(0, 0, 0, 0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onClick={onClose}
    >
      <div
        className="win95-window-enhanced"
        style={{ padding: '0px', maxWidth: '320px', margin: '16px' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Enhanced Title Bar */}
        <div className="win95-titlebar-enhanced" style={{ marginBottom: '0px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div style={{
              width: '16px',
              height: '16px',
              background: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'16\' height=\'16\' viewBox=\'0 0 16 16\'><rect width=\'16\' height=\'16\' fill=\'%23c0c0c0\'/><rect x=\'2\' y=\'2\' width=\'12\' height=\'12\' fill=\'%23000080\'/><rect x=\'4\' y=\'4\' width=\'8\' height=\'8\' fill=\'%23ffffff\'/></svg>")',
              imageRendering: 'pixelated'
            }}></div>
            <span style={{ fontSize: '11px' }}>🎉 SECRET DISCOVERED!</span>
          </div>
          <div style={{ display: 'flex', gap: '2px' }}>
            <button onClick={onClose} className="win95-control-button">✕</button>
          </div>
        </div>

        {/* Enhanced Content Area */}
        <div className="win95-content" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>🕺</div>

          <div style={{ marginBottom: '12px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '12px' }}>CONGRATULATIONS!</div>
            <div style={{ fontSize: '10px', marginBottom: '4px' }}>
              You found the dancing baby secret!
            </div>
            <div style={{ color: '#ff0000', fontSize: '10px', marginBottom: '4px' }}>
              🏆 ACHIEVEMENT UNLOCKED 🏆
            </div>
            <div style={{ fontWeight: 'bold', fontSize: '11px' }}>
              "BABY WHISPERER"
            </div>
          </div>

          <div className="inset-chrome" style={{ fontSize: '9px', color: '#000000', marginBottom: '12px', lineHeight: '1.3', textAlign: 'left' }}>
            FUN FACT: The dancing baby was one of the first viral memes!
            It appeared on Ally McBeal in 1997!
          </div>

          <button onClick={onClose} className="win95-button-enhanced" style={{ width: '100%', fontSize: '11px' }}>
            TOTALLY RADICAL! 🤘
          </button>
        </div>
      </div>
    </div>
  )
} 