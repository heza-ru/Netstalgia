'use client'

import { useState } from 'react'

interface WebRingProps {
  className?: string
}

export default function WebRing({ className = '' }: WebRingProps) {
  const [memberCount] = useState(Math.floor(Math.random() * 500) + 100)
  const [currentSite] = useState(Math.floor(Math.random() * 100) + 1)

  const fakeSites = [
    'Cool 90s Site',
    'Radical Homepage',
    'Awesome Web Page',
    'Totally Tubular Site',
    'Epic 90s Website',
    'Super Cool Page',
    'Mega Awesome Site',
    'Ultra Radical Homepage',
    'The Best Site Ever',
    'Coolest Page on the Web'
  ]

  const handleNavigation = (direction: 'prev' | 'next' | 'random') => {
    // Trigger random easter egg instead of alert
    const easterEggs = ['snake-game', 'cursor-trail', 'starfield-effect', 'rainbow-text']
    const randomEasterEgg = easterEggs[Math.floor(Math.random() * easterEggs.length)]
    
    // Dispatch custom event for easter egg
    const event = new CustomEvent('triggerEasterEgg', {
      detail: { type: randomEasterEgg, source: 'web-ring' }
    })
    window.dispatchEvent(event)
  }

  return (
    <div className={`web-ring ${className}`} style={{
      border: '3px outset #cdc7bb',
      padding: '12px',
      background: '#ecece0',
      textAlign: 'center',
      marginBottom: '12px'
    }}>
      {/* Web Ring Logo */}
      <div style={{
        fontSize: '12px',
        fontWeight: 'bold',
        color: '#000080',
        marginBottom: '8px'
      }}>
        🌐 90s WEB RING 🌐
      </div>

      {/* Navigation Buttons */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '8px',
        marginBottom: '8px',
        flexWrap: 'wrap'
      }}>
        <button
          onClick={() => handleNavigation('prev')}
          style={{
            background: '#cdc7bb',
            border: '2px outset #cdc7bb',
            padding: '4px 8px',
            fontSize: '9px',
            cursor: 'pointer',
            color: '#000000',
            fontWeight: 'bold'
          }}
        >
          &lt;&lt; PREV
        </button>
        
        <button
          onClick={() => handleNavigation('random')}
          style={{
            background: '#cdc7bb',
            border: '2px outset #cdc7bb',
            padding: '4px 8px',
            fontSize: '9px',
            cursor: 'pointer',
            color: '#000000',
            fontWeight: 'bold'
          }}
        >
          RANDOM
        </button>
        
        <button
          onClick={() => handleNavigation('next')}
          style={{
            background: '#cdc7bb',
            border: '2px outset #cdc7bb',
            padding: '4px 8px',
            fontSize: '9px',
            cursor: 'pointer',
            color: '#000000',
            fontWeight: 'bold'
          }}
        >
          NEXT &gt;&gt;
        </button>
      </div>

      {/* Ring Info */}
      <div style={{
        fontSize: '8px',
        color: '#008000',
        marginBottom: '4px'
      }}>
        Site {currentSite} of {memberCount} members
      </div>

      {/* Ring Stats */}
      <div style={{
        fontSize: '8px',
        color: '#ff0000',
        marginBottom: '4px'
      }}>
        * {memberCount} COOL SITES! *
      </div>

      {/* Join Link */}
      <div style={{
        fontSize: '8px',
        color: '#0000ff',
        textDecoration: 'underline',
        cursor: 'pointer'
      }} onClick={() => {
        // Trigger easter egg instead of alert
        const event = new CustomEvent('triggerEasterEgg', {
          detail: { type: 'matrix-effect', source: 'web-ring-join' }
        })
        window.dispatchEvent(event)
      }}>
        JOIN THE RING!
      </div>

      {/* Ring Master Info */}
      <div style={{
        fontSize: '7px',
        color: '#808080',
        marginTop: '4px',
        borderTop: '1px solid #cdc7bb',
        paddingTop: '4px'
      }}>
        Ring Master: webmaster@netstalgia.com<br/>
        Established: 1999<br/>
        Last Updated: Never!
      </div>

      <style jsx>{`
        .web-ring:hover {
          border-color: #0000ff;
          box-shadow: 0 0 8px #0000ff;
        }
        
        .web-ring button:hover {
          background: #ecece0;
          border-color: #808080;
        }
        
        .web-ring button:active {
          border-style: inset;
        }
      `}</style>
    </div>
  )
} 