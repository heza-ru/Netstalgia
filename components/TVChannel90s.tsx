'use client'

import { useState, useEffect } from 'react'

interface TVChannel {
  number: string
  name: string
  show: string
  description: string
  emoji: string
  isSecret: boolean
}

export default function TVChannel90s() {
  const [currentChannel, setCurrentChannel] = useState(0)
  const [isOn, setIsOn] = useState(true)
  const [volume, setVolume] = useState(50)
  const [showChannelInfo, setShowChannelInfo] = useState(true)

  const channels: TVChannel[] = [
    { number: '2', name: 'CBS', show: 'Friends', description: 'The one where they all hang out at Central Perk', emoji: '☕', isSecret: false },
    { number: '3', name: 'ABC', show: 'Home Improvement', description: 'Tim Taylor and his power tools', emoji: '🔨', isSecret: false },
    { number: '4', name: 'NBC', show: 'Seinfeld', description: 'A show about nothing', emoji: '🍕', isSecret: false },
    { number: '5', name: 'FOX', show: 'The Simpsons', description: 'D\'oh! It\'s Springfield\'s favorite family', emoji: '🍩', isSecret: false },
    { number: '6', name: 'MTV', show: 'Total Request Live', description: 'The hottest music videos and Carson Daly', emoji: '🎵', isSecret: false },
    { number: '7', name: 'Nickelodeon', show: 'Rugrats', description: 'Babies having adventures', emoji: '👶', isSecret: false },
    { number: '8', name: 'Cartoon Network', show: 'Powerpuff Girls', description: 'Sugar, spice, and everything nice', emoji: '💪', isSecret: false },
    { number: '9', name: 'Discovery', show: 'MythBusters', description: 'Science is awesome!', emoji: '🧪', isSecret: false },
    { number: '10', name: 'HBO', show: 'The Sopranos', description: 'Family business in New Jersey', emoji: '🍝', isSecret: false },
    { number: '11', name: 'CNN', show: 'Breaking News', description: 'News 24/7', emoji: '📺', isSecret: false },
    { number: '12', name: 'ESPN', show: 'SportsCenter', description: 'Sports highlights and analysis', emoji: '⚽', isSecret: false },
    { number: '13', name: 'Weather Channel', show: 'Local Weather', description: 'Sunny with a chance of rain', emoji: '⛅', isSecret: false },
    { number: '14', name: 'QVC', show: 'Shopping Network', description: 'Buy now, pay later!', emoji: '💍', isSecret: false },
    { number: '15', name: 'Comedy Central', show: 'South Park', description: 'Cartman and the gang', emoji: '🤣', isSecret: false },
    { number: '16', name: 'TNT', show: 'NBA Basketball', description: 'I love this game!', emoji: '🏀', isSecret: false },
    { number: '17', name: 'USA Network', show: 'Law & Order', description: 'Dun dun!', emoji: '⚖️', isSecret: false },
    { number: '18', name: 'TBS', show: 'Married... with Children', description: 'Bundy family antics', emoji: '👨‍👩‍👧‍👦', isSecret: false },
    { number: '19', name: 'TLC', show: 'Trading Spaces', description: 'Home makeover reality show', emoji: '🏠', isSecret: false },
    { number: '20', name: 'VH1', show: 'Behind the Music', description: 'Rock star documentaries', emoji: '🎸', isSecret: false },
    { number: '99', name: 'SECRET', show: 'Y2K Conspiracy', description: 'The millennium bug is coming!', emoji: '🐛', isSecret: true }
  ]

  useEffect(() => {
    if (isOn) {
      const interval = setInterval(() => {
        setCurrentChannel(prev => (prev + 1) % channels.length)
      }, 8000) // Auto-change every 8 seconds
      return () => clearInterval(interval)
    }
  }, [isOn, channels.length])

  const changeChannel = (direction: 'up' | 'down') => {
    if (direction === 'up') {
      setCurrentChannel(prev => (prev + 1) % channels.length)
    } else {
      setCurrentChannel(prev => prev === 0 ? channels.length - 1 : prev - 1)
    }
  }

  const togglePower = () => {
    setIsOn(!isOn)
  }

  const getCurrentChannel = () => channels[currentChannel]

  const getSignalQuality = () => {
    if (!isOn) return 0
    return Math.floor(Math.random() * 30) + 70 // 70-100%
  }

  const getNoiseLevel = () => {
    if (!isOn) return 100
    return Math.floor(Math.random() * 20) + 5 // 5-25%
  }

  return (
    <div style={{
      background: '#000080',
      color: '#ffffff',
      border: '2px solid #ffffff',
      padding: '16px',
      fontFamily: 'Courier New, monospace',
      maxWidth: '400px'
    }}>
      {/* Header */}
      <div style={{
        background: '#008080',
        color: '#ffffff',
        padding: '8px',
        marginBottom: '12px',
        textAlign: 'center',
        border: '1px solid #ffffff'
      }}>
        <div style={{ fontSize: '14px', fontWeight: 'bold' }}>
          📺 90s TV CHANNEL SURFER 📺
        </div>
        <div style={{ fontSize: '10px' }}>
          Experience 90s television!
        </div>
      </div>

      {/* TV Screen */}
      <div style={{
        background: isOn ? '#000000' : '#404040',
        border: '3px inset #ffffff',
        padding: '16px',
        marginBottom: '12px',
        minHeight: '200px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}>
        {isOn ? (
          <>
            {/* Channel Info */}
            <div style={{
              position: 'absolute',
              top: '8px',
              left: '8px',
              background: 'rgba(0, 0, 0, 0.8)',
              padding: '4px 8px',
              fontSize: '10px',
              border: '1px solid #ffffff'
            }}>
              CH {getCurrentChannel().number} - {getCurrentChannel().name}
            </div>

            {/* Show Display */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>
                {getCurrentChannel().emoji}
              </div>
              <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>
                {getCurrentChannel().show}
              </div>
              <div style={{ fontSize: '11px', opacity: 0.8 }}>
                {getCurrentChannel().description}
              </div>
            </div>

            {/* Signal Quality */}
            <div style={{
              position: 'absolute',
              bottom: '8px',
              right: '8px',
              background: 'rgba(0, 0, 0, 0.8)',
              padding: '4px 8px',
              fontSize: '9px',
              border: '1px solid #ffffff'
            }}>
              Signal: {getSignalQuality()}%<br />
              Noise: {getNoiseLevel()}%
            </div>

            {/* Static Effect */}
            {getNoiseLevel() > 15 && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><defs><filter id='noise'><feTurbulence baseFrequency='0.9' numOctaves='4'/><feColorMatrix values='0 0 0 0 0, 0 0 0 0 0, 0 0 0 0 0, 0 0 0 1 0'/></filter></defs><rect width='100' height='100' filter='url(%23noise)' opacity='0.1'/></svg>")`,
                pointerEvents: 'none',
                opacity: 0.3
              }} />
            )}
          </>
        ) : (
          <div style={{ textAlign: 'center', opacity: 0.5 }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>
              📺
            </div>
            <div style={{ fontSize: '12px' }}>
              TV IS OFF
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '8px',
        marginBottom: '12px'
      }}>
        <button
          onClick={togglePower}
          style={{
            padding: '8px',
            background: isOn ? '#008000' : '#800000',
            color: '#ffffff',
            border: '2px outset #008080',
            cursor: 'pointer',
            fontFamily: 'Courier New, monospace',
            fontSize: '10px',
            fontWeight: 'bold'
          }}
        >
          {isOn ? 'ON' : 'OFF'}
        </button>
        <button
          onClick={() => changeChannel('down')}
          style={{
            padding: '8px',
            background: '#008080',
            color: '#ffffff',
            border: '2px outset #008080',
            cursor: 'pointer',
            fontFamily: 'Courier New, monospace',
            fontSize: '10px'
          }}
        >
          CH -
        </button>
        <button
          onClick={() => changeChannel('up')}
          style={{
            padding: '8px',
            background: '#008080',
            color: '#ffffff',
            border: '2px outset #008080',
            cursor: 'pointer',
            fontFamily: 'Courier New, monospace',
            fontSize: '10px'
          }}
        >
          CH +
        </button>
      </div>

      {/* Volume Control */}
      <div style={{ marginBottom: '12px' }}>
        <div style={{ fontSize: '10px', marginBottom: '4px' }}>
          Volume: {volume}%
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          style={{
            width: '100%',
            height: '12px',
            background: '#ffffff',
            border: '1px inset #ffffff'
          }}
        />
      </div>

      {/* Channel List */}
      <button
        onClick={() => setShowChannelInfo(!showChannelInfo)}
        style={{
          width: '100%',
          padding: '6px',
          background: '#008080',
          color: '#ffffff',
          border: '2px outset #008080',
          cursor: 'pointer',
          fontFamily: 'Courier New, monospace',
          fontSize: '10px',
          marginBottom: '8px'
        }}
      >
        {showChannelInfo ? 'HIDE CHANNEL LIST' : 'SHOW CHANNEL LIST'}
      </button>

      {showChannelInfo && (
        <div style={{
          background: '#000080',
          border: '1px solid #ffffff',
          maxHeight: '150px',
          overflowY: 'auto',
          fontSize: '9px'
        }}>
          {channels.map((channel, index) => (
            <div
              key={channel.number}
              onClick={() => setCurrentChannel(index)}
              style={{
                padding: '4px 8px',
                cursor: 'pointer',
                background: index === currentChannel ? '#008080' : 'transparent',
                borderBottom: '1px solid #ffffff',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <span style={{ fontWeight: 'bold' }}>CH {channel.number}</span>
                <span style={{ marginLeft: '8px' }}>{channel.name}</span>
              </div>
              <div style={{ fontSize: '12px' }}>
                {channel.emoji}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Fun Facts */}
      <div style={{
        fontSize: '9px',
        textAlign: 'center',
        marginTop: '8px',
        color: '#ffffff',
        borderTop: '1px solid #ffffff',
        paddingTop: '8px'
      }}>
        {getCurrentChannel().isSecret && (
          <div style={{ color: '#ff0000', fontWeight: 'bold' }}>
            🚨 SECRET CHANNEL DISCOVERED! 🚨
          </div>
        )}
        <div>Remember: No remote control needed!</div>
        <div>Just click the buttons like in the 90s!</div>
      </div>
    </div>
  )
}
