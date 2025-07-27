'use client'

import { useState, useEffect } from 'react'

interface BBSFeaturesProps {
  className?: string
}

interface UserStats {
  username: string
  calls: number
  lastCall: string
  timeOnline: string
  messages: number
  files: number
  level: string
  credits: number
  timeLimit: number
}

interface BBSMessage {
  id: number
  author: string
  subject: string
  date: string
  board: string
  content?: string
}

interface BBSFile {
  name: string
  size: string
  description: string
  downloads: number
  uploader: string
  date: string
}

export default function BBSFeatures({ className = '' }: BBSFeaturesProps) {
  const [userStats, setUserStats] = useState<UserStats>({
    username: 'GUEST',
    calls: Math.floor(Math.random() * 1000) + 1,
    lastCall: new Date().toLocaleDateString(),
    timeOnline: '00:15:32',
    messages: Math.floor(Math.random() * 50) + 1,
    files: Math.floor(Math.random() * 20) + 1,
    level: 'NEWBIE',
    credits: 1000,
    timeLimit: 60
  })

  const [currentTime, setCurrentTime] = useState(new Date())
  const [systemLoad, setSystemLoad] = useState(0)
  const [selectedBoard, setSelectedBoard] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [showMessage, setShowMessage] = useState(false)
  const [showDownload, setShowDownload] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [showUpload, setShowUpload] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [chatMessage, setChatMessage] = useState('')
  const [chatHistory, setChatHistory] = useState<string[]>([])
  const [onlineUsers, setOnlineUsers] = useState<string[]>(['SYSOP', 'CODER', 'GAMER', 'MUSIC'])

  const bbsMessages: BBSMessage[] = [
    { id: 1, author: 'SYSOP', subject: 'Welcome to NETSTALGIA BBS!', date: '12/15/99', board: 'ANNOUNCEMENTS', content: 'Welcome to the coolest BBS on the web! Check out our file areas and message boards.' },
    { id: 2, author: 'CODER', subject: 'New games uploaded!', date: '12/14/99', board: 'GENERAL', content: 'Just uploaded DOOM.EXE and WOLF3D.EXE to Area 1. Check them out!' },
    { id: 3, author: 'WEBMASTER', subject: 'Site updates coming soon', date: '12/13/99', board: 'TECHNICAL', content: 'Planning to add more file areas and improve the chat system.' },
    { id: 4, author: 'GAMER', subject: 'Anyone play DOOM?', date: '12/12/99', board: 'GAMING', content: 'Looking for DOOM deathmatch partners. My handle is GAMER.' },
    { id: 5, author: 'MUSIC', subject: 'Best MIDI files collection', date: '12/11/99', board: 'MUSIC', content: 'Uploaded 50+ MIDI files to Area 3. Includes classic game music!' }
  ]

  const bbsFiles: BBSFile[] = [
    { name: 'DOOM.EXE', size: '2.3MB', description: 'DOOM v1.9 Shareware', downloads: 342156, uploader: 'SYSOP', date: '12/10/99' },
    { name: 'WOLF3D.EXE', size: '1.8MB', description: 'Wolfenstein 3D', downloads: 287432, uploader: 'CODER', date: '12/09/99' },
    { name: 'KEEN.EXE', size: '500KB', description: 'Commander Keen', downloads: 156789, uploader: 'GAMER', date: '12/08/99' },
    { name: 'TETRIS.EXE', size: '200KB', description: 'Tetris Clone', downloads: 98765, uploader: 'MUSIC', date: '12/07/99' },
    { name: 'PKZIP.EXE', size: '150KB', description: 'PKZIP v2.04g', downloads: 234567, uploader: 'SYSOP', date: '12/06/99' },
    { name: 'WINZIP.EXE', size: '800KB', description: 'WinZip v6.3', downloads: 198765, uploader: 'WEBMASTER', date: '12/05/99' }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
      setSystemLoad(Math.floor(Math.random() * 80) + 20)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleBoardClick = (board: string) => {
    setSelectedBoard(board)
    setShowMessage(true)
    setTimeout(() => setShowMessage(false), 3000)
  }

  const handleFileClick = (fileName: string) => {
    setSelectedFile(fileName)
    setShowDownload(true)
    setTimeout(() => setShowDownload(false), 3000)
  }

  const handleUserLevelUp = () => {
    const levels = ['NEWBIE', 'REGULAR', 'ELITE', 'SYSOP']
    const currentIndex = levels.indexOf(userStats.level)
    if (currentIndex < levels.length - 1) {
      setUserStats(prev => ({
        ...prev,
        level: levels[currentIndex + 1],
        calls: prev.calls + 1,
        credits: prev.credits + 500
      }))
    }
  }

  const handleLogin = () => {
    if (loginUsername && loginPassword) {
      setUserStats(prev => ({
        ...prev,
        username: loginUsername.toUpperCase(),
        credits: prev.credits + 1000
      }))
      setIsLoggedIn(true)
      setShowLogin(false)
      setLoginUsername('')
      setLoginPassword('')
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserStats(prev => ({
      ...prev,
      username: 'GUEST'
    }))
  }

  const handleChatMessage = () => {
    if (chatMessage.trim()) {
      setChatHistory(prev => [...prev, `${userStats.username}: ${chatMessage}`])
      setChatMessage('')
    }
  }

  const handleFileUpload = () => {
    setShowUpload(true)
    setTimeout(() => setShowUpload(false), 3000)
  }

  return (
    <div className={`bbs-features ${className}`}>
      {/* BBS Header */}
      <div style={{
        background: '#000080',
        color: '#ffffff',
        padding: '8px 12px',
        border: '2px outset #cdc7bb',
        marginBottom: '12px',
        fontFamily: 'Courier New, monospace',
        fontSize: '12px'
      }}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div>
            <strong>NETSTALGIA BBS v2.1</strong> | 
            <span style={{marginLeft: '8px'}}>Node: 1/1</span> | 
            <span style={{marginLeft: '8px'}}>Baud: 56K</span>
          </div>
          <div>
            {currentTime.toLocaleTimeString()} | 
            <span style={{marginLeft: '8px'}}>Load: {systemLoad}%</span>
          </div>
        </div>
      </div>

      {/* User Stats Panel */}
      <div style={{
        background: '#ecece0',
        border: '3px outset #cdc7bb',
        padding: '12px',
        marginBottom: '12px',
        fontFamily: 'Courier New, monospace',
        fontSize: '11px'
      }}>
        <div style={{
          background: '#000080',
          color: '#ffffff',
          padding: '4px 8px',
          marginBottom: '8px',
          fontWeight: 'bold'
        }}>
          USER STATISTICS
        </div>
        
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px'}}>
          <div>
            <strong>Username:</strong> {userStats.username}<br/>
            <strong>Calls:</strong> {userStats.calls}<br/>
            <strong>Last Call:</strong> {userStats.lastCall}<br/>
            <strong>Time Online:</strong> {userStats.timeOnline}<br/>
            <strong>Credits:</strong> {userStats.credits}
          </div>
          <div>
            <strong>Messages:</strong> {userStats.messages}<br/>
            <strong>Files:</strong> {userStats.files}<br/>
            <strong>Level:</strong> <span style={{cursor: 'pointer', color: '#000080', textDecoration: 'underline'}} onClick={handleUserLevelUp}>{userStats.level}</span><br/>
            <strong>Status:</strong> ONLINE<br/>
            <strong>Time Left:</strong> {userStats.timeLimit} min
          </div>
        </div>
        
        <div style={{marginTop: '8px', display: 'flex', gap: '8px', flexWrap: 'wrap'}}>
          <button
            onClick={() => setShowLogin(true)}
            style={{
              background: '#ecece0',
              border: '2px outset #cdc7bb',
              padding: '4px 8px',
              fontSize: '10px',
              cursor: 'pointer',
              fontFamily: 'Courier New, monospace'
            }}
          >
            {isLoggedIn ? 'LOGOUT' : 'LOGIN'}
          </button>
          <button
            onClick={() => setShowChat(true)}
            style={{
              background: '#ecece0',
              border: '2px outset #cdc7bb',
              padding: '4px 8px',
              fontSize: '10px',
              cursor: 'pointer',
              fontFamily: 'Courier New, monospace'
            }}
          >
            CHAT
          </button>
          <button
            onClick={handleFileUpload}
            style={{
              background: '#ecece0',
              border: '2px outset #cdc7bb',
              padding: '4px 8px',
              fontSize: '10px',
              cursor: 'pointer',
              fontFamily: 'Courier New, monospace'
            }}
          >
            UPLOAD
          </button>
        </div>
      </div>

      {/* Message Boards */}
      <div style={{
        background: '#ecece0',
        border: '3px outset #cdc7bb',
        padding: '12px',
        marginBottom: '12px',
        fontFamily: 'Courier New, monospace',
        fontSize: '11px'
      }}>
        <div style={{
          background: '#000080',
          color: '#ffffff',
          padding: '4px 8px',
          marginBottom: '8px',
          fontWeight: 'bold'
        }}>
          MESSAGE BOARDS
        </div>
        
        <div style={{marginBottom: '8px'}}>
          <strong>Boards:</strong> 
          <span style={{cursor: 'pointer', color: '#000080', textDecoration: 'underline'}} onClick={() => handleBoardClick('ANNOUNCEMENTS')}>ANNOUNCEMENTS</span> | 
          <span style={{cursor: 'pointer', color: '#000080', textDecoration: 'underline'}} onClick={() => handleBoardClick('GENERAL')}>GENERAL</span> | 
          <span style={{cursor: 'pointer', color: '#000080', textDecoration: 'underline'}} onClick={() => handleBoardClick('TECHNICAL')}>TECHNICAL</span> | 
          <span style={{cursor: 'pointer', color: '#000080', textDecoration: 'underline'}} onClick={() => handleBoardClick('GAMING')}>GAMING</span> | 
          <span style={{cursor: 'pointer', color: '#000080', textDecoration: 'underline'}} onClick={() => handleBoardClick('MUSIC')}>MUSIC</span>
        </div>
        
        <div style={{fontSize: '10px'}}>
          {bbsMessages.map(msg => (
            <div key={msg.id} style={{
              borderBottom: '1px solid #cdc7bb',
              padding: '4px 0',
              display: 'flex',
              justifyContent: 'space-between'
            }}>
              <span style={{color: '#000080', fontWeight: 'bold'}}>{msg.board}</span>
              <span>{msg.subject}</span>
              <span style={{color: '#666666'}}>{msg.author}</span>
              <span style={{color: '#666666'}}>{msg.date}</span>
            </div>
          ))}
        </div>
      </div>

      {/* File Downloads */}
      <div style={{
        background: '#ecece0',
        border: '3px outset #cdc7bb',
        padding: '12px',
        marginBottom: '12px',
        fontFamily: 'Courier New, monospace',
        fontSize: '11px'
      }}>
        <div style={{
          background: '#000080',
          color: '#ffffff',
          padding: '4px 8px',
          marginBottom: '8px',
          fontWeight: 'bold'
        }}>
          FILE DOWNLOADS
        </div>
        
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '10px'}}>
          <div>
            <strong>Games:</strong><br/>
            <span style={{cursor: 'pointer', color: '#000080', textDecoration: 'underline'}} onClick={() => handleFileClick('DOOM.EXE')}>• DOOM.EXE (2.3MB)</span><br/>
            <span style={{cursor: 'pointer', color: '#000080', textDecoration: 'underline'}} onClick={() => handleFileClick('WOLF3D.EXE')}>• WOLF3D.EXE (1.8MB)</span><br/>
            <span style={{cursor: 'pointer', color: '#000080', textDecoration: 'underline'}} onClick={() => handleFileClick('COMMANDER_KEEN.EXE')}>• COMMANDER_KEEN.EXE (500KB)</span><br/>
            <span style={{cursor: 'pointer', color: '#000080', textDecoration: 'underline'}} onClick={() => handleFileClick('TETRIS.EXE')}>• TETRIS.EXE (200KB)</span>
          </div>
          <div>
            <strong>Utilities:</strong><br/>
            <span style={{cursor: 'pointer', color: '#000080', textDecoration: 'underline'}} onClick={() => handleFileClick('PKZIP.EXE')}>• PKZIP.EXE (150KB)</span><br/>
            <span style={{cursor: 'pointer', color: '#000080', textDecoration: 'underline'}} onClick={() => handleFileClick('WINZIP.EXE')}>• WINZIP.EXE (800KB)</span><br/>
            <span style={{cursor: 'pointer', color: '#000080', textDecoration: 'underline'}} onClick={() => handleFileClick('NORTON.EXE')}>• NORTON.EXE (2.1MB)</span><br/>
            <span style={{cursor: 'pointer', color: '#000080', textDecoration: 'underline'}} onClick={() => handleFileClick('SCANDISK.EXE')}>• SCANDISK.EXE (300KB)</span>
          </div>
        </div>
      </div>

      {/* System Info */}
      <div style={{
        background: '#ecece0',
        border: '3px outset #cdc7bb',
        padding: '12px',
        fontFamily: 'Courier New, monospace',
        fontSize: '11px'
      }}>
        <div style={{
          background: '#000080',
          color: '#ffffff',
          padding: '4px 8px',
          marginBottom: '8px',
          fontWeight: 'bold'
        }}>
          SYSTEM INFORMATION
        </div>
        
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '10px'}}>
          <div>
            <strong>Hardware:</strong><br/>
            • CPU: Intel 486DX2-66MHz<br/>
            • RAM: 8MB EDO<br/>
            • HDD: 540MB IDE<br/>
            • MODEM: US Robotics 56K
          </div>
          <div>
            <strong>Software:</strong><br/>
            • OS: MS-DOS 6.22<br/>
            • BBS: Wildcat! 4.0<br/>
            • Network: TCP/IP<br/>
            • Uptime: 99.9%
          </div>
        </div>
      </div>

      {/* Notification Popups */}
      {showMessage && selectedBoard && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: '#ecece0',
          border: '3px outset #cdc7bb',
          padding: '16px',
          zIndex: 1000,
          fontFamily: 'Courier New, monospace',
          fontSize: '12px',
          maxWidth: '400px'
        }}>
          <div style={{
            background: '#000080',
            color: '#ffffff',
            padding: '4px 8px',
            marginBottom: '8px',
            fontWeight: 'bold'
          }}>
            BBS MESSAGE BOARD
          </div>
          <div style={{marginBottom: '8px'}}>
            <strong>Board:</strong> {selectedBoard}
          </div>
          <div style={{marginBottom: '8px'}}>
            <strong>Messages:</strong> {Math.floor(Math.random() * 50) + 10}
          </div>
          <div style={{marginBottom: '8px'}}>
            <strong>Last Post:</strong> {new Date().toLocaleDateString()}
          </div>
          <div style={{fontSize: '10px', color: '#666666'}}>
            Click to read messages or post new message...
          </div>
        </div>
      )}

      {showDownload && selectedFile && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: '#ecece0',
          border: '3px outset #cdc7bb',
          padding: '16px',
          zIndex: 1000,
          fontFamily: 'Courier New, monospace',
          fontSize: '12px',
          maxWidth: '400px'
        }}>
          <div style={{
            background: '#000080',
            color: '#ffffff',
            padding: '4px 8px',
            marginBottom: '8px',
            fontWeight: 'bold'
          }}>
            BBS FILE DOWNLOAD
          </div>
          <div style={{marginBottom: '8px'}}>
            <strong>File:</strong> {selectedFile}
          </div>
          <div style={{marginBottom: '8px'}}>
            <strong>Size:</strong> {selectedFile.includes('DOOM') ? '2.3MB' : selectedFile.includes('WOLF') ? '1.8MB' : selectedFile.includes('KEEN') ? '500KB' : selectedFile.includes('TETRIS') ? '200KB' : selectedFile.includes('PKZIP') ? '150KB' : selectedFile.includes('WINZIP') ? '800KB' : selectedFile.includes('NORTON') ? '2.1MB' : '300KB'}
          </div>
          <div style={{marginBottom: '8px'}}>
            <strong>Status:</strong> DOWNLOADING...
          </div>
          <div style={{fontSize: '10px', color: '#666666'}}>
            Estimated time: 5-10 minutes (56K modem)
          </div>
        </div>
      )}

      {/* Login Popup */}
      {showLogin && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: '#ecece0',
          border: '3px outset #cdc7bb',
          padding: '16px',
          zIndex: 1000,
          fontFamily: 'Courier New, monospace',
          fontSize: '12px',
          minWidth: '300px'
        }}>
          <div style={{
            background: '#000080',
            color: '#ffffff',
            padding: '4px 8px',
            marginBottom: '8px',
            fontWeight: 'bold'
          }}>
            BBS LOGIN
          </div>
          <div style={{marginBottom: '8px'}}>
            <strong>Username:</strong><br/>
            <input
              type="text"
              value={loginUsername}
              onChange={(e) => setLoginUsername(e.target.value)}
              style={{
                width: '100%',
                padding: '4px',
                border: '2px inset #cdc7bb',
                fontFamily: 'Courier New, monospace',
                fontSize: '11px'
              }}
              placeholder="Enter username"
            />
          </div>
          <div style={{marginBottom: '8px'}}>
            <strong>Password:</strong><br/>
            <input
              type="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '4px',
                border: '2px inset #cdc7bb',
                fontFamily: 'Courier New, monospace',
                fontSize: '11px'
              }}
              placeholder="Enter password"
            />
          </div>
          <div style={{display: 'flex', gap: '8px', justifyContent: 'center'}}>
            <button
              onClick={handleLogin}
              style={{
                background: '#ecece0',
                border: '2px outset #cdc7bb',
                padding: '4px 12px',
                fontSize: '11px',
                cursor: 'pointer',
                fontFamily: 'Courier New, monospace'
              }}
            >
              LOGIN
            </button>
            <button
              onClick={() => setShowLogin(false)}
              style={{
                background: '#ecece0',
                border: '2px outset #cdc7bb',
                padding: '4px 12px',
                fontSize: '11px',
                cursor: 'pointer',
                fontFamily: 'Courier New, monospace'
              }}
            >
              CANCEL
            </button>
          </div>
        </div>
      )}

      {/* Chat Popup */}
      {showChat && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: '#ecece0',
          border: '3px outset #cdc7bb',
          padding: '16px',
          zIndex: 1000,
          fontFamily: 'Courier New, monospace',
          fontSize: '12px',
          minWidth: '400px',
          maxHeight: '400px'
        }}>
          <div style={{
            background: '#000080',
            color: '#ffffff',
            padding: '4px 8px',
            marginBottom: '8px',
            fontWeight: 'bold',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span>BBS CHAT ROOM</span>
            <button
              onClick={() => setShowChat(false)}
              style={{
                background: '#ecece0',
                border: '2px outset #cdc7bb',
                padding: '2px 6px',
                fontSize: '10px',
                cursor: 'pointer',
                fontFamily: 'Courier New, monospace'
              }}
            >
              X
            </button>
          </div>
          <div style={{
            height: '200px',
            border: '2px inset #cdc7bb',
            padding: '8px',
            marginBottom: '8px',
            overflowY: 'auto',
            background: '#ffffff',
            fontSize: '10px'
          }}>
            <div style={{marginBottom: '4px', color: '#666666'}}>
              <strong>Online Users:</strong> {onlineUsers.join(', ')}
            </div>
            {chatHistory.map((msg, index) => (
              <div key={index} style={{marginBottom: '2px'}}>
                {msg}
              </div>
            ))}
          </div>
          <div style={{display: 'flex', gap: '8px'}}>
            <input
              type="text"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleChatMessage()}
              style={{
                flex: 1,
                padding: '4px',
                border: '2px inset #cdc7bb',
                fontFamily: 'Courier New, monospace',
                fontSize: '11px'
              }}
              placeholder="Type message..."
            />
            <button
              onClick={handleChatMessage}
              style={{
                background: '#ecece0',
                border: '2px outset #cdc7bb',
                padding: '4px 8px',
                fontSize: '11px',
                cursor: 'pointer',
                fontFamily: 'Courier New, monospace'
              }}
            >
              SEND
            </button>
          </div>
        </div>
      )}

      {/* Upload Popup */}
      {showUpload && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: '#ecece0',
          border: '3px outset #cdc7bb',
          padding: '16px',
          zIndex: 1000,
          fontFamily: 'Courier New, monospace',
          fontSize: '12px',
          minWidth: '300px'
        }}>
          <div style={{
            background: '#000080',
            color: '#ffffff',
            padding: '4px 8px',
            marginBottom: '8px',
            fontWeight: 'bold'
          }}>
            BBS FILE UPLOAD
          </div>
          <div style={{marginBottom: '8px'}}>
            <strong>File Upload Successful!</strong>
          </div>
          <div style={{marginBottom: '8px', fontSize: '10px'}}>
            Your file has been uploaded to the BBS.<br/>
            It will be reviewed by the SYSOP.<br/>
            Thank you for contributing!
          </div>
          <div style={{textAlign: 'center'}}>
            <button
              onClick={() => setShowUpload(false)}
              style={{
                background: '#ecece0',
                border: '2px outset #cdc7bb',
                padding: '4px 12px',
                fontSize: '11px',
                cursor: 'pointer',
                fontFamily: 'Courier New, monospace'
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  )
} 