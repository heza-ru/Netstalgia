'use client'

import { useState, useEffect } from 'react'

interface MailNotificationProps {
  className?: string
}

interface EmailMessage {
  from: string
  subject: string
  preview: string
  time: string
  isRead: boolean
  priority: 'normal' | 'high' | 'low'
  hasAttachment: boolean
}

// Authentic 90s email messages
const EMAIL_MESSAGES: EmailMessage[] = [
  {
    from: 'mom@aol.com',
    subject: 'Dinner is ready!',
    preview: 'Come downstairs right now! The meatloaf is getting cold and your father is waiting...',
    time: '2:30 PM',
    isRead: false,
    priority: 'high',
    hasAttachment: false
  },
  {
    from: 'friend@hotmail.com',
    subject: 'FW: FW: FW: FUNNY JOKE!!!',
    preview: 'You HAVE to read this! It\'s SO funny! Forward to 10 friends or bad luck for 7 years...',
    time: '1:45 PM',
    isRead: false,
    priority: 'normal',
    hasAttachment: false
  },
  {
    from: 'webmaster@geocities.com',
    subject: 'Your homepage has been updated',
    preview: 'Congratulations! Your GeoCities homepage now has a visitor counter and new animated GIFs...',
    time: '12:15 PM',
    isRead: false,
    priority: 'normal',
    hasAttachment: false
  },
  {
    from: 'noreply@cdnow.com',
    subject: 'Your CD order has shipped!',
    preview: 'Great news! Your order for "Backstreet Boys - Millennium" has been shipped via USPS...',
    time: '11:30 AM',
    isRead: false,
    priority: 'normal',
    hasAttachment: true
  },
  {
    from: 'admin@school.edu',
    subject: 'Computer lab rules reminder',
    preview: 'Please remember: No downloading MP3s, no ICQ during class, and always log off Netscape...',
    time: '10:00 AM',
    isRead: false,
    priority: 'normal',
    hasAttachment: false
  },
  {
    from: 'billgates@microsoft.com',
    subject: 'Forward this email for $1000!',
    preview: 'Microsoft is testing email tracking! Forward this to everyone you know and Bill Gates will...',
    time: '9:15 AM',
    isRead: false,
    priority: 'high',
    hasAttachment: false
  },
  {
    from: 'crush@yahoo.com',
    subject: 'Do you like me? Check yes or no',
    preview: 'Hey, I was wondering if you wanted to go to the mall this weekend? The new Goo Goo Dolls...',
    time: '8:45 AM',
    isRead: false,
    priority: 'high',
    hasAttachment: false
  },
  {
    from: 'virus@suspicious.com',
    subject: 'I LOVE YOU',
    preview: 'kindly check the attached LOVELETTER for you. This email contains a special message...',
    time: '7:30 AM',
    isRead: false,
    priority: 'normal',
    hasAttachment: true
  }
]

// Different mail client styles
const MAIL_CLIENTS = [
  {
    name: 'AOL Mail',
    icon: '📧',
    color: '#000080',
    sound: 'You\'ve Got Mail!',
    branding: 'America Online - Making the Internet Easy!'
  },
  {
    name: 'Outlook Express',
    icon: '📮',
    color: '#800080',
    sound: 'New Mail Notification',
    branding: 'Microsoft Outlook Express 5.0'
  },
  {
    name: 'Netscape Mail',
    icon: '✉️',
    color: '#008000',
    sound: 'Mail Alert',
    branding: 'Netscape Communicator Mail & News'
  },
  {
    name: 'Eudora',
    icon: '📬',
    color: '#ff6600',
    sound: 'Eudora Mail Alert',
    branding: 'Eudora Pro 4.0 - Qualcomm Inc.'
  }
]

export default function MailNotification({ className = '' }: MailNotificationProps) {
  const [showNotification, setShowNotification] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [showMailClient, setShowMailClient] = useState(false)
  const [currentMessages, setCurrentMessages] = useState<EmailMessage[]>([])
  const [currentClient, setCurrentClient] = useState(MAIL_CLIENTS[0])
  const [notificationCount, setNotificationCount] = useState(0)

  useEffect(() => {
    // Initialize with random messages and client
    const randomClient = MAIL_CLIENTS[Math.floor(Math.random() * MAIL_CLIENTS.length)]
    setCurrentClient(randomClient)

    // Select 2-4 random messages
    const messageCount = Math.floor(Math.random() * 3) + 2
    const shuffledMessages = [...EMAIL_MESSAGES].sort(() => Math.random() - 0.5)
    setCurrentMessages(shuffledMessages.slice(0, messageCount))

    // Show first notification after 25-45 seconds
    const initialDelay = Math.random() * 20000 + 25000
    const timer = setTimeout(() => {
      setShowNotification(true)
      setIsVisible(true)
      setNotificationCount(1)
      playMailSound()
    }, initialDelay)

    return () => clearTimeout(timer)
  }, [])

  // Additional random notifications
  useEffect(() => {
    if (notificationCount > 0 && notificationCount < 3) {
      const additionalTimer = setTimeout(() => {
        if (!showNotification) {
          // Add new message and show notification again
          const newMessage = EMAIL_MESSAGES[Math.floor(Math.random() * EMAIL_MESSAGES.length)]
          setCurrentMessages(prev => [newMessage, ...prev.slice(0, 3)])
          setShowNotification(true)
          setIsVisible(true)
          setNotificationCount(prev => prev + 1)
          playMailSound()
        }
      }, Math.random() * 60000 + 30000) // 30-90 seconds

      return () => clearTimeout(additionalTimer)
    }
  }, [notificationCount, showNotification])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => setShowNotification(false), 300)
  }

  const handleCheckMail = () => {
    setShowMailClient(true)
    handleClose()
  }

  const handleCloseMailClient = () => {
    setShowMailClient(false)
  }

  const handleReadMail = (index: number) => {
    setCurrentMessages(prev =>
      prev.map((msg, i) => i === index ? { ...msg, isRead: true } : msg)
    )

    // Trigger easter egg occasionally
    if (Math.random() < 0.3) {
      const easterEggs = ['snake-game', 'cursor-trail', 'starfield-effect']
      const randomEasterEgg = easterEggs[Math.floor(Math.random() * easterEggs.length)]

      const event = new CustomEvent('triggerEasterEgg', {
        detail: { type: randomEasterEgg, source: 'mail-client' }
      })
      window.dispatchEvent(event)
    }
  }

  const playMailSound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()

      // Create classic "You've Got Mail" sound
      const oscillator1 = audioContext.createOscillator()
      const oscillator2 = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator1.connect(gainNode)
      oscillator2.connect(gainNode)
      gainNode.connect(audioContext.destination)

      // Create a pleasant notification sound
      oscillator1.frequency.setValueAtTime(800, audioContext.currentTime)
      oscillator1.frequency.setValueAtTime(600, audioContext.currentTime + 0.1)
      oscillator1.frequency.setValueAtTime(800, audioContext.currentTime + 0.2)

      oscillator2.frequency.setValueAtTime(400, audioContext.currentTime)
      oscillator2.frequency.setValueAtTime(300, audioContext.currentTime + 0.1)
      oscillator2.frequency.setValueAtTime(400, audioContext.currentTime + 0.2)

      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)

      oscillator1.start(audioContext.currentTime)
      oscillator2.start(audioContext.currentTime)
      oscillator1.stop(audioContext.currentTime + 0.3)
      oscillator2.stop(audioContext.currentTime + 0.3)
    } catch (error) {
      console.log('📧 *MAIL NOTIFICATION SOUND*')
    }
  }

  if (!showNotification && !showMailClient) return null

  return (
    <>
      {/* Mail Notification Popup */}
      {showNotification && (
        <div className={`mail-notification ${className}`} style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) ${isVisible ? 'scale(1)' : 'scale(0.8)'}`,
          zIndex: 10000,
          transition: 'transform 0.3s ease-in-out',
          opacity: isVisible ? 1 : 0
        }}>
          {/* Enhanced notification window */}
          <div style={{
            background: '#ecece0',
            border: '4px outset #cdc7bb',
            padding: '16px',
            minWidth: '350px',
            boxShadow: '4px 4px 8px rgba(0,0,0,0.3)',
            fontFamily: 'MS Sans Serif, Arial, sans-serif'
          }}>
            {/* Title bar */}
            <div style={{
              background: `linear-gradient(90deg, ${currentClient.color}, #000080)`,
              color: '#ffffff',
              padding: '4px 8px',
              margin: '-16px -16px 12px -16px',
              fontSize: '12px',
              fontWeight: 'bold',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span>{currentClient.icon} {currentClient.sound}</span>
              <button
                onClick={handleClose}
                style={{
                  background: '#cdc7bb',
                  border: '2px outset #cdc7bb',
                  padding: '2px 6px',
                  fontSize: '10px',
                  cursor: 'pointer',
                  color: '#000000'
                }}
              >
                ✕
              </button>
            </div>

            {/* Icon and message */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '16px'
            }}>
              <div style={{
                fontSize: '32px',
                color: currentClient.color
              }}>
                {currentClient.icon}
              </div>
              <div>
                <div style={{
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: '#000080',
                  marginBottom: '4px'
                }}>
                  {currentClient.sound}
                </div>
                <div style={{
                  fontSize: '11px',
                  color: '#000000'
                }}>
                  You have {currentMessages.filter(m => !m.isRead).length} new messages waiting.
                </div>
              </div>
            </div>

            {/* Enhanced email preview */}
            <div style={{
              background: '#ffffff',
              border: '2px inset #cdc7bb',
              padding: '8px',
              marginBottom: '16px',
              fontSize: '10px',
              maxHeight: '120px',
              overflowY: 'auto'
            }}>
              <div style={{ color: '#000080', fontWeight: 'bold', marginBottom: '6px' }}>
                📬 Latest Messages:
              </div>
              {currentMessages.slice(0, 3).map((msg, index) => (
                <div key={index} style={{
                  marginBottom: '6px',
                  paddingBottom: '4px',
                  borderBottom: index < 2 ? '1px dotted #cdc7bb' : 'none'
                }}>
                  <div style={{
                    fontWeight: 'bold',
                    color: msg.isRead ? '#808080' : '#000000',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    {msg.priority === 'high' && '🔥'}
                    {msg.hasAttachment && '📎'}
                    From: {msg.from}
                  </div>
                  <div style={{ color: '#000080', fontSize: '9px' }}>
                    Subject: {msg.subject}
                  </div>
                  <div style={{ color: '#808080', fontSize: '8px' }}>
                    {msg.time} - {msg.preview.substring(0, 50)}...
                  </div>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div style={{
              display: 'flex',
              gap: '8px',
              justifyContent: 'flex-end'
            }}>
              <button
                onClick={handleClose}
                style={{
                  background: '#cdc7bb',
                  border: '2px outset #cdc7bb',
                  padding: '4px 12px',
                  fontSize: '10px',
                  cursor: 'pointer',
                  color: '#000000'
                }}
              >
                Later
              </button>
              <button
                onClick={handleCheckMail}
                style={{
                  background: '#cdc7bb',
                  border: '2px outset #cdc7bb',
                  padding: '4px 12px',
                  fontSize: '10px',
                  cursor: 'pointer',
                  color: '#000000',
                  fontWeight: 'bold'
                }}
              >
                📧 Check Mail
              </button>
            </div>

            {/* Client branding */}
            <div style={{
              fontSize: '8px',
              color: '#808080',
              textAlign: 'center',
              marginTop: '8px',
              borderTop: '1px solid #cdc7bb',
              paddingTop: '4px'
            }}>
              {currentClient.branding}
            </div>
          </div>

          <style jsx>{`
            @keyframes mailPulse {
              0% { transform: translate(-50%, -50%) scale(1); }
              50% { transform: translate(-50%, -50%) scale(1.05); }
              100% { transform: translate(-50%, -50%) scale(1); }
            }
            
            .mail-notification {
              animation: mailPulse 2s ease-in-out infinite;
            }
          `}</style>
        </div>
      )}

      {/* Full Mail Client Interface */}
      {showMailClient && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
          zIndex: 10001,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div style={{
            background: '#ecece0',
            border: '3px outset #cdc7bb',
            width: '80%',
            maxWidth: '600px',
            height: '70%',
            maxHeight: '500px',
            fontFamily: 'MS Sans Serif, Arial, sans-serif',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* Mail Client Title Bar */}
            <div style={{
              background: `linear-gradient(90deg, ${currentClient.color}, #000080)`,
              color: '#ffffff',
              padding: '6px 12px',
              fontSize: '12px',
              fontWeight: 'bold',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span>{currentClient.icon} {currentClient.name} - Inbox</span>
              <button
                onClick={handleCloseMailClient}
                style={{
                  background: '#cdc7bb',
                  border: '2px outset #cdc7bb',
                  padding: '2px 8px',
                  fontSize: '11px',
                  cursor: 'pointer',
                  color: '#000000'
                }}
              >
                ✕
              </button>
            </div>

            {/* Mail Client Toolbar */}
            <div style={{
              background: '#ecece0',
              border: '1px solid #cdc7bb',
              padding: '4px 8px',
              fontSize: '10px',
              display: 'flex',
              gap: '8px'
            }}>
              <button className="win95-button" style={{ fontSize: '9px', padding: '2px 6px' }}>
                📧 New
              </button>
              <button className="win95-button" style={{ fontSize: '9px', padding: '2px 6px' }}>
                📤 Send
              </button>
              <button className="win95-button" style={{ fontSize: '9px', padding: '2px 6px' }}>
                🗑️ Delete
              </button>
              <button className="win95-button" style={{ fontSize: '9px', padding: '2px 6px' }}>
                📁 Folders
              </button>
            </div>

            {/* Mail List */}
            <div style={{
              flex: 1,
              background: '#ffffff',
              border: '2px inset #cdc7bb',
              margin: '8px',
              overflow: 'auto'
            }}>
              {/* Mail Headers */}
              <div style={{
                background: '#cdc7bb',
                padding: '4px 8px',
                fontSize: '10px',
                fontWeight: 'bold',
                borderBottom: '1px solid #808080',
                display: 'grid',
                gridTemplateColumns: '30px 150px 200px 80px 60px',
                gap: '8px'
              }}>
                <div>📧</div>
                <div>From</div>
                <div>Subject</div>
                <div>Time</div>
                <div>Size</div>
              </div>

              {/* Mail Items */}
              {currentMessages.map((msg, index) => (
                <div
                  key={index}
                  onClick={() => handleReadMail(index)}
                  style={{
                    padding: '4px 8px',
                    fontSize: '10px',
                    borderBottom: '1px solid #e0e0e0',
                    display: 'grid',
                    gridTemplateColumns: '30px 150px 200px 80px 60px',
                    gap: '8px',
                    cursor: 'pointer',
                    background: msg.isRead ? '#f0f0f0' : '#ffffff',
                    fontWeight: msg.isRead ? 'normal' : 'bold'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#0000ff'
                    e.currentTarget.style.color = '#ffffff'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = msg.isRead ? '#f0f0f0' : '#ffffff'
                    e.currentTarget.style.color = '#000000'
                  }}
                >
                  <div>
                    {msg.priority === 'high' && '🔥'}
                    {msg.hasAttachment && '📎'}
                    {!msg.isRead && '📧'}
                    {msg.isRead && '📭'}
                  </div>
                  <div style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {msg.from}
                  </div>
                  <div style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {msg.subject}
                  </div>
                  <div>{msg.time}</div>
                  <div>{Math.floor(Math.random() * 50) + 5}KB</div>
                </div>
              ))}
            </div>

            {/* Status Bar */}
            <div style={{
              background: '#ecece0',
              border: '1px inset #cdc7bb',
              padding: '4px 8px',
              fontSize: '9px',
              color: '#000000',
              display: 'flex',
              justifyContent: 'space-between'
            }}>
              <div>
                {currentMessages.filter(m => !m.isRead).length} unread, {currentMessages.length} total
              </div>
              <div>
                Connected to {currentClient.name.toLowerCase().replace(' ', '.')}.com
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
} 