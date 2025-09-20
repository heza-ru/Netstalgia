'use client'

import { useState, useEffect, useRef } from 'react'

interface ChatMessage {
  id: string
  user: string
  message: string
  timestamp: Date
  type: 'user' | 'system' | 'action'
  color: string
}

export default function ChatRoom90s() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [username, setUsername] = useState('')
  const [isConnected, setIsConnected] = useState(false)
  const [userCount, setUserCount] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const colors = ['#ff00ff', '#00ffff', '#ffff00', '#00ff00', '#ff8000', '#ff0080', '#8000ff', '#0080ff']
  const chatUsers = ['CoolKid95', 'WebMaster', 'DancingBaby', 'RetroGamer', 'NetSurfer', 'DialUpKing', 'PixelArt', 'Y2KSurvivor']

  useEffect(() => {
    // Initialize with welcome messages
    const welcomeMessages: ChatMessage[] = [
      {
        id: '1',
        user: 'SYSTEM',
        message: 'Welcome to NETSTALGIA CHAT ROOM! Type your name and press ENTER to join!',
        timestamp: new Date(),
        type: 'system',
        color: '#00ff00'
      },
      {
        id: '2',
        user: 'SYSTEM',
        message: 'Remember: Be nice, no spam, and have fun! This is the 90s!',
        timestamp: new Date(),
        type: 'system',
        color: '#00ff00'
      }
    ]
    setMessages(welcomeMessages)
    setUserCount(Math.floor(Math.random() * 15) + 5)
  }, [])

  useEffect(() => {
    // Simulate other users chatting
    if (isConnected) {
      const interval = setInterval(() => {
        const randomUser = chatUsers[Math.floor(Math.random() * chatUsers.length)]
        const randomMessages = [
          'ASL? (Age, Sex, Location)',
          'Anyone here from California?',
          'Check out my homepage!',
          'Has anyone tried the new Netscape?',
          'I just got a 56K modem! SO FAST!',
          'Anyone want to trade MP3s?',
          'ICQ me: 12345678',
          'Windows 95 is the best!',
          'I miss the dancing baby!',
          'Anyone remember Prodigy?',
          'I just downloaded Winamp!',
          'My computer has 32MB RAM!',
          'Anyone want to play Doom?',
          'I just got email!',
          'This chat room is awesome!',
          'Anyone else staying up late?',
          'I love the 90s internet!',
          'Anyone want to be my friend?',
          'I just learned HTML!',
          'This is so cool!'
        ]
        
        const newMsg: ChatMessage = {
          id: Date.now().toString(),
          user: randomUser,
          message: randomMessages[Math.floor(Math.random() * randomMessages.length)],
          timestamp: new Date(),
          type: 'user',
          color: colors[Math.floor(Math.random() * colors.length)]
        }
        
        setMessages(prev => [...prev, newMsg])
        setUserCount(prev => Math.max(5, prev + (Math.random() > 0.7 ? 1 : -1)))
      }, Math.random() * 8000 + 3000) // Random interval between 3-11 seconds
      
      return () => clearInterval(interval)
    }
  }, [isConnected])

  useEffect(() => {
    // Auto-scroll to bottom
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleConnect = () => {
    if (username.trim()) {
      setIsConnected(true)
      const joinMessage: ChatMessage = {
        id: Date.now().toString(),
        user: 'SYSTEM',
        message: `${username} has joined the chat room!`,
        timestamp: new Date(),
        type: 'system',
        color: '#00ff00'
      }
      setMessages(prev => [...prev, joinMessage])
    }
  }

  const handleSendMessage = () => {
    if (newMessage.trim() && username.trim()) {
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        user: username,
        message: newMessage,
        timestamp: new Date(),
        type: 'user',
        color: colors[Math.floor(Math.random() * colors.length)]
      }
      setMessages(prev => [...prev, userMessage])
      setNewMessage('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (!isConnected) {
        handleConnect()
      } else {
        handleSendMessage()
      }
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div style={{
      background: '#000080',
      color: '#ffffff',
      border: '2px solid #ffffff',
      padding: '16px',
      fontFamily: 'Courier New, monospace',
      maxHeight: '400px',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Chat Header */}
      <div style={{
        background: '#008080',
        color: '#ffffff',
        padding: '8px',
        marginBottom: '10px',
        textAlign: 'center',
        border: '1px solid #ffffff'
      }}>
        <div style={{ fontSize: '14px', fontWeight: 'bold' }}>
          🌐 NETSTALGIA CHAT ROOM 🌐
        </div>
        <div style={{ fontSize: '10px' }}>
          Users Online: {userCount} | Status: {isConnected ? 'CONNECTED' : 'DISCONNECTED'}
        </div>
      </div>

      {/* Chat Messages */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        background: '#000080',
        border: '1px solid #ffffff',
        padding: '8px',
        marginBottom: '10px',
        maxHeight: '250px',
        fontSize: '11px'
      }}>
        {messages.map((msg) => (
          <div key={msg.id} style={{
            marginBottom: '4px',
            display: 'flex',
            flexWrap: 'wrap'
          }}>
            <span style={{ color: '#ffffff', fontWeight: 'bold', marginRight: '4px' }}>
              [{formatTime(msg.timestamp)}]
            </span>
            <span style={{ color: msg.color, fontWeight: 'bold', marginRight: '4px' }}>
              {msg.user}:
            </span>
            <span style={{ color: '#ffffff' }}>
              {msg.message}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      {!isConnected ? (
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Enter your username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={handleKeyPress}
            style={{
              flex: 1,
              padding: '4px 8px',
              border: '2px inset #ffffff',
              background: '#ffffff',
              color: '#000080',
              fontFamily: 'Courier New, monospace',
              fontSize: '11px'
            }}
          />
          <button
            onClick={handleConnect}
            style={{
              padding: '4px 12px',
              background: '#008080',
              color: '#ffffff',
              border: '2px outset #008080',
              cursor: 'pointer',
              fontFamily: 'Courier New, monospace',
              fontSize: '11px'
            }}
          >
            JOIN
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ fontSize: '10px', color: '#00ff00' }}>
            {username}:
          </span>
          <input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            style={{
              flex: 1,
              padding: '4px 8px',
              border: '2px inset #ffffff',
              background: '#ffffff',
              color: '#000080',
              fontFamily: 'Courier New, monospace',
              fontSize: '11px'
            }}
          />
          <button
            onClick={handleSendMessage}
            style={{
              padding: '4px 12px',
              background: '#008080',
              color: '#ffffff',
              border: '2px outset #008080',
              cursor: 'pointer',
              fontFamily: 'Courier New, monospace',
              fontSize: '11px'
            }}
          >
            SEND
          </button>
        </div>
      )}

      {/* Chat Rules */}
      <div style={{
        fontSize: '9px',
        color: '#00ff00',
        marginTop: '8px',
        textAlign: 'center',
        borderTop: '1px solid #ffffff',
        paddingTop: '4px'
      }}>
        Chat Rules: Be nice • No spam • Have fun • This is the 90s!
      </div>
    </div>
  )
}
