'use client'

import { useState, useEffect } from 'react'

interface GuestEntry {
  id: string
  name: string
  email?: string
  website?: string
  location?: string
  message: string
  timestamp: string
  fullTimestamp: string
  ipAddress?: string
  browser?: string
}

interface ValidationErrors {
  name?: string
  message?: string
  email?: string
  website?: string
}

const STORAGE_KEY = 'netstalgia-guestbook'

// Authentic 90s validation messages with Windows 95 dialog styling
const ERROR_MESSAGES = {
  nameRequired: 'ERROR: Name field cannot be empty! Please enter your name.',
  nameLength: 'ERROR: Name too long! Maximum 25 characters allowed.',
  messageRequired: 'ERROR: Message field cannot be empty! Please leave a message.',
  messageLength: 'ERROR: Message too long! Maximum 300 characters allowed.',
  emailInvalid: 'ERROR: Invalid email format! Please use format: user@domain.com',
  websiteInvalid: 'ERROR: Invalid website URL! Please use format: http://www.site.com',
  profanity: 'ERROR: Inappropriate content detected! Please keep it family-friendly.',
  serverError: 'ERROR: Server connection failed! Please try again later.',
  tooManyEntries: 'ERROR: Too many entries from this location! Please wait before posting again.'
}

// Enhanced profanity filter for 90s authenticity
const BLOCKED_WORDS = ['spam', 'hack', 'virus', 'scam', 'porn', 'xxx', 'warez', 'crack', 'serial']

const VISITOR_LOCATIONS = [
  'Cyberspace', 'The Information Superhighway', 'World Wide Web',
  'Internet Explorer 3.0', 'Netscape Navigator 4.0', 'AOL Keyword',
  'GeoCities Neighborhood', 'Angelfire Community', 'Tripod Homepage', 'Xoom.com',
  'CompuServe Forum', 'Prodigy Classic', 'MSN Zone', 'WebTV Network',
  'Lycos HotBot', 'AltaVista Search', 'Yahoo! Directory', 'Excite Portal',
  'HotMail Inbox', 'ICQ Chat Room', 'IRC Channel', 'Usenet Newsgroup'
]

// Fake 90s IP addresses for authenticity
const FAKE_IPS = [
  '192.168.1.100', '10.0.0.50', '172.16.0.25', '203.45.67.89',
  '198.162.1.45', '209.85.143.99', '64.233.160.0', '216.58.194.174'
]

// 90s Browser strings
const BROWSERS = [
  'Netscape Navigator 4.08',
  'Internet Explorer 4.0',
  'Internet Explorer 5.0',
  'Netscape Communicator 4.7',
  'Opera 3.62',
  'Mosaic 3.0',
  'WebTV 2.5'
]

export default function Guestbook() {
  const [entries, setEntries] = useState<GuestEntry[]>([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // Load entries from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        setEntries(JSON.parse(saved))
      } catch (error) {
        console.error('Failed to load guestbook:', error)
      }
    }
  }, [])

  // Save entries to localStorage
  const saveEntries = (newEntries: GuestEntry[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newEntries))
    setEntries(newEntries)
  }

  // Enhanced 90s form validation with additional checks
  const validateForm = (): ValidationErrors => {
    const newErrors: ValidationErrors = {}

    // Name validation with enhanced checks
    if (!name.trim()) {
      newErrors.name = ERROR_MESSAGES.nameRequired
    } else if (name.trim().length > 25) {
      newErrors.name = ERROR_MESSAGES.nameLength
    } else if (name.trim().length < 2) {
      newErrors.name = 'ERROR: Name too short! Minimum 2 characters required.'
    } else if (!/^[a-zA-Z0-9\s\-_\.]+$/.test(name.trim())) {
      newErrors.name = 'ERROR: Invalid characters in name! Use letters, numbers, spaces, hyphens, underscores, and periods only.'
    }

    // Message validation with enhanced profanity detection
    if (!message.trim()) {
      newErrors.message = ERROR_MESSAGES.messageRequired
    } else if (message.trim().length > 300) {
      newErrors.message = ERROR_MESSAGES.messageLength
    } else if (message.trim().length < 5) {
      newErrors.message = 'ERROR: Message too short! Minimum 5 characters required.'
    } else {
      // Enhanced blocked words check
      const messageWords = message.toLowerCase().split(/\s+/)
      const hasBlockedWord = messageWords.some(word =>
        BLOCKED_WORDS.some(blocked => word.includes(blocked))
      )
      if (hasBlockedWord) {
        newErrors.message = ERROR_MESSAGES.profanity
      }

      // Check for excessive caps (90s spam detection)
      const capsCount = (message.match(/[A-Z]/g) || []).length
      if (capsCount > message.length * 0.7 && message.length > 10) {
        newErrors.message = 'ERROR: Too much CAPS LOCK! Please use normal capitalization.'
      }

      // Check for repeated characters (90s spam detection)
      if (/(.)\1{4,}/.test(message)) {
        newErrors.message = 'ERROR: Too many repeated characters! Please write normally.'
      }
    }

    // Enhanced email validation (optional)
    if (email.trim() && !isValidEmail(email.trim())) {
      newErrors.email = ERROR_MESSAGES.emailInvalid
    }

    // Enhanced website validation (optional)
    if (website.trim() && !isValidWebsite(website.trim())) {
      newErrors.website = ERROR_MESSAGES.websiteInvalid
    }

    // Check for too many recent entries (spam protection)
    const recentEntries = entries.filter(entry => {
      const entryTime = new Date(entry.fullTimestamp).getTime()
      const now = Date.now()
      return now - entryTime < 60000 // 1 minute
    })

    if (recentEntries.length >= 3) {
      newErrors.message = ERROR_MESSAGES.tooManyEntries
    }

    return newErrors
  }

  const isValidEmail = (email: string): boolean => {
    // Simple 90s-era email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const isValidWebsite = (website: string): boolean => {
    // 90s-era website validation (must start with http://)
    return website.startsWith('http://') || website.startsWith('https://')
  }

  const getRandomLocation = (): string => {
    return VISITOR_LOCATIONS[Math.floor(Math.random() * VISITOR_LOCATIONS.length)]
  }

  const getRandomIP = (): string => {
    return FAKE_IPS[Math.floor(Math.random() * FAKE_IPS.length)]
  }

  const getRandomBrowser = (): string => {
    return BROWSERS[Math.floor(Math.random() * BROWSERS.length)]
  }

  const playSubmitSound = () => {
    // Create authentic 90s form submission sound
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
      oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1)

      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.1)
    } catch (error) {
      // Fallback for browsers without Web Audio API
      console.log('🔊 *BEEP* Form submitted!')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})

    // Validate form
    const validationErrors = validateForm()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setIsSubmitting(false)
      return
    }

    // Simulate 90s-era form processing delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000))

    const now = new Date()
    const newEntry: GuestEntry = {
      id: Date.now().toString(),
      name: name.trim(),
      email: email.trim() || undefined,
      website: website.trim() || undefined,
      location: getRandomLocation(),
      message: message.trim(),
      timestamp: now.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: '2-digit'
      }),
      fullTimestamp: now.toLocaleString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }),
      ipAddress: getRandomIP(),
      browser: getRandomBrowser()
    }

    // Play authentic 90s form submission sound
    playSubmitSound()

    saveEntries([newEntry, ...entries])

    // Reset form
    setName('')
    setEmail('')
    setWebsite('')
    setMessage('')
    setIsSubmitting(false)
    setShowSuccess(true)

    // Hide success message after 3 seconds
    setTimeout(() => setShowSuccess(false), 3000)
  }

  return (
    <div className="pixelated-window" style={{
      imageRendering: 'pixelated',
      padding: '12px',
      margin: '8px',
      background: '#ecece0'
    }}>
      {/* Windows 95 style title bar */}
      <div className="pixelated-titlebar" style={{
        margin: '-12px -12px 8px -12px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <span>📝 Guestbook - Sign Here!</span>
        <span style={{ fontSize: '10px' }}>v1.0</span>
      </div>

      <h2 className="font-normal text-web-purple center mb-3 pixelated-title blink">
        ★ SIGN MY GUESTBOOK! ★
      </h2>

      {/* Success Message */}
      {showSuccess && (
        <div style={{
          background: '#008000',
          color: '#ffffff',
          border: '2px outset #cdc7bb',
          padding: '8px',
          margin: '8px 0',
          textAlign: 'center',
          fontWeight: 'bold'
        }}>
          ✓ SUCCESS! Your message has been added to the guestbook!
        </div>
      )}

      {/* Error Display */}
      {Object.keys(errors).length > 0 && (
        <div style={{
          background: '#ff0000',
          color: '#ffffff',
          border: '2px outset #cdc7bb',
          padding: '8px',
          margin: '8px 0'
        }}>
          <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>⚠ FORM ERRORS:</div>
          {Object.values(errors).map((error, index) => (
            <div key={index} style={{ fontSize: '11px', marginBottom: '2px' }}>
              • {error}
            </div>
          ))}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-4">
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            <tr>
              <td style={{ padding: '4px', verticalAlign: 'top', width: '80px' }}>
                <label className="font-small text-web-blue" style={{ fontWeight: 'bold' }}>
                  NAME:
                </label>
              </td>
              <td style={{ padding: '4px' }}>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="retro-input"
                  style={{
                    width: '100%',
                    border: errors.name ? '2px inset #ff0000' : '2px inset #cdc7bb'
                  }}
                  maxLength={25}
                  placeholder="Enter your name..."
                />
                <div style={{ fontSize: '10px', color: '#808080', marginTop: '2px' }}>
                  {name.length}/25 characters
                </div>
              </td>
            </tr>

            <tr>
              <td style={{ padding: '4px', verticalAlign: 'top' }}>
                <label className="font-small text-web-blue" style={{ fontWeight: 'bold' }}>
                  EMAIL:
                </label>
              </td>
              <td style={{ padding: '4px' }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="retro-input"
                  style={{
                    width: '100%',
                    border: errors.email ? '2px inset #ff0000' : '2px inset #cdc7bb'
                  }}
                  placeholder="user@domain.com (optional)"
                />
              </td>
            </tr>

            <tr>
              <td style={{ padding: '4px', verticalAlign: 'top' }}>
                <label className="font-small text-web-blue" style={{ fontWeight: 'bold' }}>
                  WEBSITE:
                </label>
              </td>
              <td style={{ padding: '4px' }}>
                <input
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="retro-input"
                  style={{
                    width: '100%',
                    border: errors.website ? '2px inset #ff0000' : '2px inset #cdc7bb'
                  }}
                  placeholder="http://www.yoursite.com (optional)"
                />
              </td>
            </tr>

            <tr>
              <td style={{ padding: '4px', verticalAlign: 'top' }}>
                <label className="font-small text-web-blue" style={{ fontWeight: 'bold' }}>
                  MESSAGE:
                </label>
              </td>
              <td style={{ padding: '4px' }}>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="retro-input"
                  style={{
                    width: '100%',
                    resize: 'none',
                    border: errors.message ? '2px inset #ff0000' : '2px inset #cdc7bb'
                  }}
                  rows={4}
                  maxLength={300}
                  placeholder="Leave your message here..."
                />
                <div style={{ fontSize: '10px', color: '#808080', marginTop: '2px' }}>
                  {message.length}/300 characters
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div style={{ textAlign: 'center', marginTop: '12px' }}>
          <button
            type="submit"
            className="win95-button"
            style={{
              padding: '6px 20px',
              fontSize: '12px',
              fontWeight: 'bold',
              minWidth: '120px'
            }}
            disabled={isSubmitting || !name.trim() || !message.trim()}
          >
            {isSubmitting ? '⏳ SUBMITTING...' : '📝 SIGN GUESTBOOK'}
          </button>
        </div>
      </form>

      {/* Entries Header */}
      <div style={{
        background: '#000080',
        color: '#ffffff',
        padding: '4px 8px',
        margin: '8px -12px 8px -12px',
        fontWeight: 'bold',
        fontSize: '12px'
      }}>
        📖 GUESTBOOK ENTRIES ({entries.length} total)
      </div>

      {/* Entries */}
      <div style={{
        maxHeight: '300px',
        overflowY: 'auto',
        border: '2px inset #cdc7bb',
        background: '#ffffff',
        padding: '8px'
      }}>
        {entries.length === 0 ? (
          <div className="center font-small text-web-red" style={{ padding: '20px' }}>
            <div className="blink">🌟 BE THE FIRST TO SIGN! 🌟</div>
            <div style={{ marginTop: '8px', fontSize: '10px', color: '#808080' }}>
              Your message will appear here after submission
            </div>
          </div>
        ) : (
          entries.map((entry, index) => (
            <div key={entry.id} className="guestbook-entry" style={{
              background: index % 2 === 0 ? '#f0f0f0' : '#ffffff',
              border: '1px solid #cdc7bb',
              margin: '4px 0',
              padding: '8px'
            }}>
              {/* Entry Header */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '6px',
                borderBottom: '1px dotted #808080',
                paddingBottom: '4px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="font-small" style={{
                    fontWeight: 'bold',
                    color: '#000080',
                    fontSize: '12px'
                  }}>
                    👤 {entry.name}
                  </span>
                  {entry.email && (
                    <span style={{ fontSize: '10px', color: '#008000' }}>
                      📧 {entry.email}
                    </span>
                  )}
                  {entry.website && (
                    <a
                      href={entry.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: '10px', color: '#0000ff' }}
                    >
                      🌐 Homepage
                    </a>
                  )}
                </div>
                <div className="font-small" style={{
                  color: '#808080',
                  fontSize: '10px'
                }}>
                  #{entries.length - index}
                </div>
              </div>

              {/* Message */}
              <div className="font-small" style={{
                wordWrap: 'break-word',
                marginBottom: '6px',
                lineHeight: '1.4',
                fontSize: '11px'
              }}>
                {entry.message}
              </div>

              {/* Entry Footer */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '9px',
                color: '#606060',
                borderTop: '1px dotted #c0c0c0',
                paddingTop: '4px'
              }}>
                <div>
                  📅 {entry.fullTimestamp}
                </div>
                <div>
                  📍 {entry.location}
                </div>
              </div>

              {/* Technical Info */}
              <div style={{
                fontSize: '8px',
                color: '#808080',
                marginTop: '2px',
                fontFamily: 'Courier New, monospace'
              }}>
                IP: {entry.ipAddress} | Browser: {entry.browser}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Statistics */}
      <div style={{
        background: '#ecece0',
        border: '1px solid #cdc7bb',
        padding: '6px',
        margin: '8px 0',
        fontSize: '10px',
        textAlign: 'center'
      }}>
        📊 Total Entries: {entries.length} |
        Last Entry: {entries.length > 0 ? entries[0].timestamp : 'None'} |
        Guestbook Version: 1.0
      </div>

      {/* Footer */}
      <div className="center font-small text-web-red" style={{ marginTop: '8px' }}>
        <div className="blink">✨ THANKS FOR VISITING MY HOMEPAGE! ✨</div>
        <div style={{ fontSize: '9px', color: '#808080', marginTop: '4px' }}>
          Powered by Authentic 90s Technology™
        </div>
      </div>
    </div>
  )
} 