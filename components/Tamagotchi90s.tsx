'use client'

import { useState, useEffect } from 'react'

interface Tamagotchi {
  name: string
  happiness: number
  hunger: number
  energy: number
  age: number
  isAlive: boolean
  stage: 'egg' | 'baby' | 'child' | 'teen' | 'adult'
  lastFed: Date
  lastPlayed: Date
  lastSlept: Date
}

export default function Tamagotchi90s() {
  const [tamagotchi, setTamagotchi] = useState<Tamagotchi>({
    name: 'Pixel',
    happiness: 100,
    hunger: 100,
    energy: 100,
    age: 0,
    isAlive: true,
    stage: 'egg',
    lastFed: new Date(),
    lastPlayed: new Date(),
    lastSlept: new Date()
  })
  const [showMessage, setShowMessage] = useState('')
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setTamagotchi(prev => {
        if (!prev.isAlive) return prev

        const now = new Date()
        const timeSinceFed = (now.getTime() - prev.lastFed.getTime()) / 1000 / 60 // minutes
        const timeSincePlayed = (now.getTime() - prev.lastPlayed.getTime()) / 1000 / 60
        const timeSinceSlept = (now.getTime() - prev.lastSlept.getTime()) / 1000 / 60

        let newHunger = Math.max(0, prev.hunger - timeSinceFed * 0.5)
        let newHappiness = Math.max(0, prev.happiness - timeSincePlayed * 0.3)
        let newEnergy = Math.max(0, prev.energy - timeSinceSlept * 0.2)

        // Check if dead
        if (newHunger <= 0 || newHappiness <= 0 || newEnergy <= 0) {
          setShowMessage('😢 Your Tamagotchi has died! Press RESET to try again.')
          return { ...prev, isAlive: false }
        }

        // Age up
        let newAge = prev.age + 0.1
        let newStage = prev.stage

        if (newAge >= 1 && prev.stage === 'egg') {
          newStage = 'baby'
          setShowMessage('🎉 Your Tamagotchi hatched! It\'s a baby!')
        } else if (newAge >= 3 && prev.stage === 'baby') {
          newStage = 'child'
          setShowMessage('🌟 Your Tamagotchi grew up! It\'s a child now!')
        } else if (newAge >= 7 && prev.stage === 'child') {
          newStage = 'teen'
          setShowMessage('🔥 Your Tamagotchi is a teenager! So cool!')
        } else if (newAge >= 12 && prev.stage === 'teen') {
          newStage = 'adult'
          setShowMessage('👑 Your Tamagotchi is now an adult! Amazing!')
        }

        return {
          ...prev,
          hunger: newHunger,
          happiness: newHappiness,
          energy: newEnergy,
          age: newAge,
          stage: newStage
        }
      })
    }, 2000) // Update every 2 seconds

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => setShowMessage(''), 3000)
      return () => clearTimeout(timer)
    }
  }, [showMessage])

  const feed = () => {
    if (!tamagotchi.isAlive) return
    setTamagotchi(prev => ({
      ...prev,
      hunger: Math.min(100, prev.hunger + 30),
      lastFed: new Date()
    }))
    setShowMessage('🍎 Yummy! Thanks for the food!')
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const play = () => {
    if (!tamagotchi.isAlive) return
    setTamagotchi(prev => ({
      ...prev,
      happiness: Math.min(100, prev.happiness + 25),
      energy: Math.max(0, prev.energy - 10),
      lastPlayed: new Date()
    }))
    setShowMessage('🎮 Fun! Let\'s play more!')
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const sleep = () => {
    if (!tamagotchi.isAlive) return
    setTamagotchi(prev => ({
      ...prev,
      energy: Math.min(100, prev.energy + 40),
      lastSlept: new Date()
    }))
    setShowMessage('😴 Zzz... Good night!')
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const reset = () => {
    setTamagotchi({
      name: 'Pixel',
      happiness: 100,
      hunger: 100,
      energy: 100,
      age: 0,
      isAlive: true,
      stage: 'egg',
      lastFed: new Date(),
      lastPlayed: new Date(),
      lastSlept: new Date()
    })
    setShowMessage('🔄 New Tamagotchi created! Take good care of it!')
  }

  const getTamagotchiEmoji = () => {
    if (!tamagotchi.isAlive) return '💀'
    
    switch (tamagotchi.stage) {
      case 'egg': return '🥚'
      case 'baby': return '👶'
      case 'child': return '🧒'
      case 'teen': return '👦'
      case 'adult': return '🧑'
      default: return '🥚'
    }
  }

  const getStatusColor = (value: number) => {
    if (value > 70) return '#00ff00'
    if (value > 40) return '#ffff00'
    return '#ff0000'
  }

  const getStatusEmoji = (value: number) => {
    if (value > 70) return '😊'
    if (value > 40) return '😐'
    return '😢'
  }

  return (
    <div style={{
      background: '#000080',
      color: '#ffffff',
      border: '2px solid #ffffff',
      padding: '16px',
      fontFamily: 'Courier New, monospace',
      maxWidth: '300px',
      textAlign: 'center'
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
          🐾 TAMAGOTCHI 90s 🐾
        </div>
        <div style={{ fontSize: '10px' }}>
          Virtual Pet Simulator
        </div>
      </div>

      {/* Tamagotchi Display */}
      <div style={{
        background: '#000080',
        border: '2px solid #ffffff',
        padding: '16px',
        marginBottom: '12px',
        minHeight: '120px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          fontSize: '48px',
          marginBottom: '8px',
          transform: isAnimating ? 'scale(1.2)' : 'scale(1)',
          transition: 'transform 0.3s ease'
        }}>
          {getTamagotchiEmoji()}
        </div>
        
        <div style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '4px' }}>
          {tamagotchi.name}
        </div>
        
        <div style={{ fontSize: '10px', color: '#00ffff' }}>
          Stage: {tamagotchi.stage.toUpperCase()} • Age: {tamagotchi.age.toFixed(1)}
        </div>
      </div>

      {/* Status Bars */}
      <div style={{ marginBottom: '12px' }}>
        <div style={{ marginBottom: '6px' }}>
          <div style={{ fontSize: '10px', marginBottom: '2px' }}>
            Happiness {getStatusEmoji(tamagotchi.happiness)}: {Math.round(tamagotchi.happiness)}%
          </div>
          <div style={{
            width: '100%',
            height: '8px',
            background: '#ffffff',
            border: '1px inset #ffffff'
          }}>
            <div style={{
              width: `${tamagotchi.happiness}%`,
              height: '100%',
              background: getStatusColor(tamagotchi.happiness)
            }} />
          </div>
        </div>

        <div style={{ marginBottom: '6px' }}>
          <div style={{ fontSize: '10px', marginBottom: '2px' }}>
            Hunger 🍎: {Math.round(tamagotchi.hunger)}%
          </div>
          <div style={{
            width: '100%',
            height: '8px',
            background: '#ffffff',
            border: '1px inset #ffffff'
          }}>
            <div style={{
              width: `${tamagotchi.hunger}%`,
              height: '100%',
              background: getStatusColor(tamagotchi.hunger)
            }} />
          </div>
        </div>

        <div style={{ marginBottom: '6px' }}>
          <div style={{ fontSize: '10px', marginBottom: '2px' }}>
            Energy ⚡: {Math.round(tamagotchi.energy)}%
          </div>
          <div style={{
            width: '100%',
            height: '8px',
            background: '#ffffff',
            border: '1px inset #ffffff'
          }}>
            <div style={{
              width: `${tamagotchi.energy}%`,
              height: '100%',
              background: getStatusColor(tamagotchi.energy)
            }} />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '8px',
        marginBottom: '12px'
      }}>
        <button
          onClick={feed}
          disabled={!tamagotchi.isAlive}
          style={{
            padding: '6px',
            background: tamagotchi.isAlive ? '#008080' : '#404040',
            color: '#ffffff',
            border: '2px outset #008080',
            cursor: tamagotchi.isAlive ? 'pointer' : 'not-allowed',
            fontFamily: 'Courier New, monospace',
            fontSize: '10px'
          }}
        >
          FEED 🍎
        </button>
        <button
          onClick={play}
          disabled={!tamagotchi.isAlive}
          style={{
            padding: '6px',
            background: tamagotchi.isAlive ? '#008080' : '#404040',
            color: '#ffffff',
            border: '2px outset #008080',
            cursor: tamagotchi.isAlive ? 'pointer' : 'not-allowed',
            fontFamily: 'Courier New, monospace',
            fontSize: '10px'
          }}
        >
          PLAY 🎮
        </button>
        <button
          onClick={sleep}
          disabled={!tamagotchi.isAlive}
          style={{
            padding: '6px',
            background: tamagotchi.isAlive ? '#008080' : '#404040',
            color: '#ffffff',
            border: '2px outset #008080',
            cursor: tamagotchi.isAlive ? 'pointer' : 'not-allowed',
            fontFamily: 'Courier New, monospace',
            fontSize: '10px'
          }}
        >
          SLEEP 😴
        </button>
        <button
          onClick={reset}
          style={{
            padding: '6px',
            background: '#800080',
            color: '#ffffff',
            border: '2px outset #800080',
            cursor: 'pointer',
            fontFamily: 'Courier New, monospace',
            fontSize: '10px'
          }}
        >
          RESET 🔄
        </button>
      </div>

      {/* Message Display */}
      {showMessage && (
        <div style={{
          background: '#008000',
          border: '1px solid #ffffff',
          padding: '8px',
          fontSize: '10px',
          marginBottom: '8px'
        }}>
          {showMessage}
        </div>
      )}

      {/* Instructions */}
      <div style={{
        fontSize: '9px',
        color: '#ffffff',
        textAlign: 'center',
        borderTop: '1px solid #ffffff',
        paddingTop: '8px'
      }}>
        Take care of your Tamagotchi!<br />
        Feed, play, and let it sleep regularly!
      </div>
    </div>
  )
}
