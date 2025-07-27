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
      <div style={{position: 'fixed', inset: 0, zIndex: 50, background: '#000000', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{fontSize: '72px'}}>👻</div>
        <div style={{position: 'absolute', bottom: '40px', textAlign: 'center', color: '#ffffff'}}>
          <div style={{fontSize: '24px', fontWeight: 'bold'}}>BOO!</div>
          <div style={{fontSize: '14px'}}>GOT YOU! 😱</div>
        </div>
      </div>
    )
  }

  return (
    <div 
      style={{position: 'fixed', inset: 0, zIndex: 50, background: 'rgba(0, 0, 0, 0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}
      onClick={onClose}
    >
      <div 
        className="win95-window"
        style={{padding: '8px', maxWidth: '300px', margin: '16px'}}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title Bar */}
        <div className="win95-titlebar" style={{marginBottom: '8px'}}>
          <span style={{fontSize: '11px'}}>🎉 SECRET DISCOVERED!</span>
          <button onClick={onClose} className="win95-button" style={{padding: '1px 4px', fontSize: '10px'}}>✕</button>
        </div>
        
        {/* Content */}
        <div style={{textAlign: 'center'}}>
          <div style={{fontSize: '32px', marginBottom: '8px'}}>🕺</div>
          
          <div style={{marginBottom: '12px'}}>
            <div style={{fontWeight: 'bold', marginBottom: '8px', fontSize: '12px'}}>CONGRATULATIONS!</div>
            <div style={{fontSize: '10px', marginBottom: '4px'}}>
              You found the dancing baby secret!
            </div>
            <div style={{color: '#ff0000', fontSize: '10px', marginBottom: '4px'}}>
              🏆 ACHIEVEMENT UNLOCKED 🏆
            </div>
            <div style={{fontWeight: 'bold', fontSize: '11px'}}>
              "BABY WHISPERER"
            </div>
          </div>
          
          <div style={{fontSize: '9px', color: '#808080', marginBottom: '12px', lineHeight: '1.3'}}>
            FUN FACT: The dancing baby was one of the first viral memes!
            It appeared on Ally McBeal in 1997!
          </div>
          
          <button onClick={onClose} className="win95-button" style={{width: '100%', fontSize: '11px'}}>
            TOTALLY RADICAL! 🤘
          </button>
        </div>
      </div>
    </div>
  )
} 