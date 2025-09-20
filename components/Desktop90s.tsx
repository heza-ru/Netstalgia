'use client'

import { useState, useEffect } from 'react'
import ChatRoom90s from './ChatRoom90s'
import MusicPlayer90s from './MusicPlayer90s'
import Screensaver90s from './Screensaver90s'
import TriviaQuiz90s from './TriviaQuiz90s'
import Tamagotchi90s from './Tamagotchi90s'
import TVChannel90s from './TVChannel90s'

interface DesktopIcon {
  id: string
  name: string
  icon: string
  x: number
  y: number
  isOpen: boolean
  type: 'program' | 'folder' | 'file'
  window?: {
    width: number
    height: number
    content: string
    isMinimized: boolean
  }
}

interface WindowState {
  id: string
  title: string
  content: JSX.Element
  x: number
  y: number
  width: number
  height: number
  originalWidth: number
  originalHeight: number
  originalX: number
  originalY: number
  isMinimized: boolean
  isMaximized: boolean
  zIndex: number
  isDragging: boolean
  isResizing: boolean
  dragStartX: number
  dragStartY: number
}

export default function Desktop90s() {
  const [icons, setIcons] = useState<DesktopIcon[]>([
    { id: '1', name: 'My Computer', icon: '💻', x: 30, y: 30, isOpen: false, type: 'folder' },
    { id: '2', name: 'Recycle Bin', icon: '🗑️', x: 30, y: 120, isOpen: false, type: 'folder' },
    { id: '3', name: 'Internet Explorer', icon: '🌐', x: 30, y: 210, isOpen: false, type: 'program' },
    { id: '4', name: 'Notepad', icon: '📝', x: 30, y: 300, isOpen: false, type: 'program' },
    { id: '5', name: 'Solitaire', icon: '🃏', x: 30, y: 390, isOpen: false, type: 'program' },
    { id: '6', name: 'Paint', icon: '🎨', x: 140, y: 30, isOpen: false, type: 'program' },
    { id: '7', name: 'Winamp', icon: '🎵', x: 140, y: 120, isOpen: false, type: 'program' },
    { id: '8', name: 'ICQ', icon: '💬', x: 140, y: 210, isOpen: false, type: 'program' },
    { id: '9', name: 'My Documents', icon: '📁', x: 140, y: 300, isOpen: false, type: 'folder' },
    { id: '10', name: 'Games', icon: '🎮', x: 140, y: 390, isOpen: false, type: 'folder' },
    { id: '11', name: 'Dancing Baby', icon: '👶', x: 250, y: 30, isOpen: false, type: 'program' },
    { id: '12', name: 'System Info', icon: '⚙️', x: 250, y: 120, isOpen: false, type: 'program' },
    { id: '13', name: 'Calculator', icon: '🧮', x: 250, y: 210, isOpen: false, type: 'program' },
    { id: '14', name: 'Media Player', icon: '📺', x: 250, y: 300, isOpen: false, type: 'program' },
    { id: '15', name: 'File Manager', icon: '📂', x: 250, y: 390, isOpen: false, type: 'program' },
    { id: '16', name: 'Terminal', icon: '💻', x: 360, y: 30, isOpen: false, type: 'program' },
    { id: '17', name: 'Chat Room', icon: '💭', x: 360, y: 120, isOpen: false, type: 'program' },
    { id: '18', name: 'Music Player', icon: '🎶', x: 360, y: 210, isOpen: false, type: 'program' },
    { id: '19', name: 'Screensaver', icon: '🖼️', x: 360, y: 300, isOpen: false, type: 'program' },
    { id: '20', name: 'Trivia Quiz', icon: '❓', x: 360, y: 390, isOpen: false, type: 'program' },
    { id: '21', name: 'Tamagotchi', icon: '🐾', x: 470, y: 30, isOpen: false, type: 'program' },
    { id: '22', name: 'TV Channel', icon: '📺', x: 470, y: 120, isOpen: false, type: 'program' }
  ])
  
  const [windows, setWindows] = useState<WindowState[]>([])
  const [nextZIndex, setNextZIndex] = useState(1000)
  
  const [taskbar, setTaskbar] = useState<DesktopIcon[]>([])
  const [showStartMenu, setShowStartMenu] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null)
  const [showContextMenu, setShowContextMenu] = useState<{x: number, y: number} | null>(null)
  const [desktopWallpaper, setDesktopWallpaper] = useState('default')
  const [showProperties, setShowProperties] = useState<string | null>(null)
  const [draggedIcon, setDraggedIcon] = useState<string | null>(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [showTaskManager, setShowTaskManager] = useState(false)
  const [showControlPanel, setShowControlPanel] = useState(false)
  const [desktopFiles, setDesktopFiles] = useState<Array<{id: string, name: string, type: string, content?: string}>>([])
  const [showFileDialog, setShowFileDialog] = useState(false)
  const [fileDialogType, setFileDialogType] = useState<'open' | 'save' | null>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      const draggingWindow = windows.find(w => w.isDragging)
      const resizingWindow = windows.find(w => w.isResizing)
      
      if (draggingWindow) {
        handleDrag(e as any, draggingWindow.id)
      }
      
      if (resizingWindow) {
        handleResize(e as any, resizingWindow.id)
      }
    }

    const handleGlobalMouseUp = () => {
      const draggingWindow = windows.find(w => w.isDragging)
      const resizingWindow = windows.find(w => w.isResizing)
      
      if (draggingWindow) {
        stopDrag(draggingWindow.id)
      }
      
      if (resizingWindow) {
        stopResize(resizingWindow.id)
      }
    }

    document.addEventListener('mousemove', handleGlobalMouseMove)
    document.addEventListener('mouseup', handleGlobalMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove)
      document.removeEventListener('mouseup', handleGlobalMouseUp)
    }
  }, [windows])

  const generateProgramContent = (icon: DesktopIcon): JSX.Element => {
    switch (icon.name) {
      case 'Internet Explorer':
        return (
          <div style={{ padding: '0px', height: '100%', background: '#ffffff', display: 'flex', flexDirection: 'column' }}>
            {/* Browser Toolbar */}
            <div style={{ 
              background: '#c0c0c0', 
              border: '2px inset #c0c0c0', 
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <button style={{
                background: 'linear-gradient(180deg, #ffffff 0%, #c0c0c0 100%)',
                border: '2px outset #c0c0c0',
                padding: '2px 8px',
                cursor: 'pointer',
                fontSize: '10px'
              }}>Back</button>
              <button style={{
                background: 'linear-gradient(180deg, #ffffff 0%, #c0c0c0 100%)',
                border: '2px outset #c0c0c0',
                padding: '2px 8px',
                cursor: 'pointer',
                fontSize: '10px'
              }}>Forward</button>
              <button style={{
                background: 'linear-gradient(180deg, #ffffff 0%, #c0c0c0 100%)',
                border: '2px outset #c0c0c0',
                padding: '2px 8px',
                cursor: 'pointer',
                fontSize: '10px'
              }}>Stop</button>
              <button style={{
                background: 'linear-gradient(180deg, #ffffff 0%, #c0c0c0 100%)',
                border: '2px outset #c0c0c0',
                padding: '2px 8px',
                cursor: 'pointer',
                fontSize: '10px'
              }}>Refresh</button>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ fontSize: '10px' }}>Address:</span>
                <input 
                  type="text" 
                  defaultValue="http://www.geocities.com/90s-site"
                  style={{
                    flex: 1,
                    border: '2px inset #c0c0c0',
                    padding: '2px 4px',
                    fontSize: '10px',
                    fontFamily: 'Courier New, monospace'
                  }}
                />
                <button style={{
                  background: 'linear-gradient(180deg, #ffffff 0%, #c0c0c0 100%)',
                  border: '2px outset #c0c0c0',
                  padding: '2px 8px',
                  cursor: 'pointer',
                  fontSize: '10px'
                }}>Go</button>
              </div>
            </div>

            {/* Bookmarks Bar */}
            <div style={{ 
              background: '#c0c0c0', 
              border: '1px solid #808080', 
              padding: '2px 4px',
              display: 'flex',
              gap: '4px'
            }}>
              {['GeoCities', 'Yahoo!', 'AOL', 'HotBot', 'AltaVista'].map((bookmark, index) => (
                <button key={index} style={{
                  background: 'linear-gradient(180deg, #ffffff 0%, #c0c0c0 100%)',
                  border: '1px outset #c0c0c0',
                  padding: '1px 6px',
                  cursor: 'pointer',
                  fontSize: '9px'
                }}>
                  {bookmark}
                </button>
              ))}
            </div>

            {/* Browser Content */}
            <div style={{ 
              flex: 1, 
              padding: '16px', 
              overflow: 'auto',
              background: '#ffffff'
            }}>
              <div style={{ background: '#e0e0e0', padding: '12px', marginBottom: '16px', border: '2px inset #c0c0c0' }}>
                <strong>🌐 Welcome to the World Wide Web!</strong>
              </div>
              
              <div style={{ fontSize: '14px', lineHeight: '1.6', color: '#000000' }}>
                <div style={{ marginBottom: '8px' }}>📡 <strong>Connection Status:</strong> Dial-up 28.8k bps</div>
                <div style={{ marginBottom: '8px' }}>⏱️ <strong>Page Load Time:</strong> 30 seconds</div>
                <div style={{ marginBottom: '8px' }}>📧 <strong>Email:</strong> "You've got mail!"</div>
                <div style={{ marginBottom: '8px' }}>👶 <strong>Trending:</strong> Dancing baby gifs everywhere!</div>
                <div style={{ marginBottom: '8px' }}>🚧 <strong>Status:</strong> Under construction signs</div>
                <div style={{ marginBottom: '8px' }}>🌈 <strong>Effects:</strong> Rainbow text effects</div>
                <div style={{ marginBottom: '8px' }}>🔤 <strong>Font:</strong> Comic Sans everywhere</div>
                
                <div style={{ 
                  background: '#ffff00', 
                  padding: '8px', 
                  margin: '16px 0',
                  border: '2px solid #000000'
                }}>
                  <strong>🎯 Hot Links:</strong>
                  <div style={{ marginTop: '4px' }}>
                    <a href="#" style={{ color: '#0000ff', textDecoration: 'underline', fontSize: '12px' }}>
                      • Netscape Navigator (Better than IE!)
                    </a><br/>
                    <a href="#" style={{ color: '#0000ff', textDecoration: 'underline', fontSize: '12px' }}>
                      • Download Netscape Communicator
                    </a><br/>
                    <a href="#" style={{ color: '#0000ff', textDecoration: 'underline', fontSize: '12px' }}>
                      • Visit GeoCities Homepage
                    </a><br/>
                    <a href="#" style={{ color: '#0000ff', textDecoration: 'underline', fontSize: '12px' }}>
                      • Check out Angelfire
                    </a>
                  </div>
                </div>
                
                <div style={{ 
                  background: '#ffcccc', 
                  padding: '8px', 
                  margin: '16px 0',
                  border: '2px solid #ff0000'
                }}>
                  <strong>⚠️ Browser Warning:</strong><br/>
                  This page requires Netscape Navigator 3.0 or higher for optimal viewing.
                </div>
              </div>
            </div>
          </div>
        )
      
      case 'Notepad':
        return (
          <div style={{ padding: '0px', height: '100%', background: '#ffffff', display: 'flex', flexDirection: 'column' }}>
            {/* Menu Bar */}
            <div style={{ 
              background: '#c0c0c0', 
              border: '2px inset #c0c0c0', 
              padding: '2px',
              display: 'flex',
              gap: '4px'
            }}>
              <button style={{
                background: 'linear-gradient(180deg, #ffffff 0%, #c0c0c0 100%)',
                border: '2px outset #c0c0c0',
                padding: '2px 6px',
                cursor: 'pointer',
                fontSize: '9px'
              }}>File</button>
              <button style={{
                background: 'linear-gradient(180deg, #ffffff 0%, #c0c0c0 100%)',
                border: '2px outset #c0c0c0',
                padding: '2px 6px',
                cursor: 'pointer',
                fontSize: '9px'
              }}>Edit</button>
              <button style={{
                background: 'linear-gradient(180deg, #ffffff 0%, #c0c0c0 100%)',
                border: '2px outset #c0c0c0',
                padding: '2px 6px',
                cursor: 'pointer',
                fontSize: '9px'
              }}>Search</button>
              <button style={{
                background: 'linear-gradient(180deg, #ffffff 0%, #c0c0c0 100%)',
                border: '2px outset #c0c0c0',
                padding: '2px 6px',
                cursor: 'pointer',
                fontSize: '9px'
              }}>Help</button>
            </div>

            {/* Toolbar */}
            <div style={{ 
              background: '#c0c0c0', 
              border: '1px solid #808080', 
              padding: '2px',
              display: 'flex',
              gap: '2px'
            }}>
              <button style={{
                background: 'linear-gradient(180deg, #ffffff 0%, #c0c0c0 100%)',
                border: '1px outset #c0c0c0',
                padding: '1px 4px',
                cursor: 'pointer',
                fontSize: '8px'
              }}>New</button>
              <button style={{
                background: 'linear-gradient(180deg, #ffffff 0%, #c0c0c0 100%)',
                border: '1px outset #c0c0c0',
                padding: '1px 4px',
                cursor: 'pointer',
                fontSize: '8px'
              }}>Open</button>
              <button style={{
                background: 'linear-gradient(180deg, #ffffff 0%, #c0c0c0 100%)',
                border: '1px outset #c0c0c0',
                padding: '1px 4px',
                cursor: 'pointer',
                fontSize: '8px'
              }}>Save</button>
              <div style={{ width: '1px', background: '#808080', margin: '0 2px' }}></div>
              <button style={{
                background: 'linear-gradient(180deg, #ffffff 0%, #c0c0c0 100%)',
                border: '1px outset #c0c0c0',
                padding: '1px 4px',
                cursor: 'pointer',
                fontSize: '8px'
              }}>Cut</button>
              <button style={{
                background: 'linear-gradient(180deg, #ffffff 0%, #c0c0c0 100%)',
                border: '1px outset #c0c0c0',
                padding: '1px 4px',
                cursor: 'pointer',
                fontSize: '8px'
              }}>Copy</button>
              <button style={{
                background: 'linear-gradient(180deg, #ffffff 0%, #c0c0c0 100%)',
                border: '1px outset #c0c0c0',
                padding: '1px 4px',
                cursor: 'pointer',
                fontSize: '8px'
              }}>Paste</button>
              <div style={{ width: '1px', background: '#808080', margin: '0 2px' }}></div>
              <button style={{
                background: 'linear-gradient(180deg, #ffffff 0%, #c0c0c0 100%)',
                border: '1px outset #c0c0c0',
                padding: '1px 4px',
                cursor: 'pointer',
                fontSize: '8px'
              }}>Find</button>
            </div>

            {/* Status Bar */}
            <div style={{ 
              background: '#c0c0c0', 
              border: '1px solid #808080', 
              padding: '2px 4px',
              fontSize: '8px',
              display: 'flex',
              justifyContent: 'space-between'
            }}>
              <span>Ln 1, Col 1</span>
              <span>Ready</span>
            </div>

            {/* Text Area */}
            <textarea 
              style={{
                flex: 1,
                border: '2px inset #c0c0c0',
                background: '#ffffff',
                fontFamily: 'Courier New, monospace',
                fontSize: '12px',
                padding: '8px',
                resize: 'none',
                outline: 'none'
              }}
              placeholder="Type your 90s thoughts here..."
              defaultValue={`Dear Diary,

Today I discovered the most radical website ever! 
It has:
- Dancing baby gifs
- Rainbow text effects  
- Under construction signs
- Auto-playing MIDI files
- Popup ads everywhere!

This is so totally tubular! 

Keyboard Shortcuts:
- Ctrl+N: New file
- Ctrl+O: Open file
- Ctrl+S: Save file
- Ctrl+A: Select all
- Ctrl+Z: Undo
- F3: Find next

- A 90s kid`}
              onKeyDown={(e) => {
                if (e.ctrlKey) {
                  switch(e.key) {
                    case 's':
                      e.preventDefault()
                      alert('File saved! (This is a demo)')
                      break
                    case 'o':
                      e.preventDefault()
                      alert('Open file dialog would appear here')
                      break
                    case 'n':
                      e.preventDefault()
                      if (confirm('Create new file? Current content will be lost.')) {
                        e.currentTarget.value = ''
                      }
                      break
                    case 'a':
                      e.preventDefault()
                      e.currentTarget.select()
                      break
                  }
                }
                if (e.key === 'F3') {
                  e.preventDefault()
                  alert('Find next - feature would be implemented here')
                }
              }}
            />
          </div>
        )
      
      case 'Solitaire':
        return (
          <div style={{ padding: '0px', height: '100%', background: '#008000', display: 'flex', flexDirection: 'column' }}>
            {/* Menu Bar */}
            <div style={{ 
              background: '#c0c0c0', 
              border: '2px inset #c0c0c0', 
              padding: '2px',
              display: 'flex',
              gap: '4px'
            }}>
              <button style={{
                background: 'linear-gradient(180deg, #ffffff 0%, #c0c0c0 100%)',
                border: '2px outset #c0c0c0',
                padding: '2px 6px',
                cursor: 'pointer',
                fontSize: '9px'
              }}>Game</button>
              <button style={{
                background: 'linear-gradient(180deg, #ffffff 0%, #c0c0c0 100%)',
                border: '2px outset #c0c0c0',
                padding: '2px 6px',
                cursor: 'pointer',
                fontSize: '9px'
              }}>Help</button>
            </div>

            {/* Game Area */}
            <div style={{ 
              flex: 1,
              padding: '8px',
              background: '#008000',
              position: 'relative'
            }}>
              {/* Top Row - Stock, Waste, and Foundation */}
              <div style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '16px',
                height: '80px'
              }}>
                {/* Stock Pile */}
                <div style={{ 
                  width: '60px',
                  height: '80px',
                  border: '2px solid #ffffff',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#ffffff',
                  cursor: 'pointer'
                }} onClick={() => alert('🃏 Drawing from stock pile!')}>
                  <span style={{ fontSize: '20px' }}>🂠</span>
                </div>

                {/* Waste Pile */}
                <div style={{ 
                  width: '60px',
                  height: '80px',
                  border: '2px solid #ffffff',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#ffffff',
                  cursor: 'pointer'
                }} onClick={() => alert('🃏 Waste pile clicked!')}>
                  <span style={{ fontSize: '20px' }}>🂡</span>
                </div>

                {/* Foundation Piles */}
                <div style={{ display: 'flex', gap: '8px' }}>
                  {['♠️', '♥️', '♣️', '♦️'].map((suit, i) => (
                    <div
                      key={i}
                      style={{ 
                        width: '60px',
                        height: '80px',
                        border: '2px solid #ffffff',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: '#ffffff',
                        cursor: 'pointer'
                      }}
                      onClick={() => alert(`🃏 Foundation pile for ${suit} clicked!`)}
                    >
                      <span style={{ fontSize: '20px' }}>{suit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tableau (7 columns) */}
              <div style={{ 
                display: 'flex',
                gap: '8px',
                justifyContent: 'space-between'
              }}>
                {[1, 2, 3, 4, 5, 6, 7].map((column, i) => (
                  <div
                    key={i}
                    style={{ 
                      width: '60px',
                      minHeight: '120px',
                      border: '2px solid #ffffff',
                      borderRadius: '4px',
                      background: '#ffffff',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      padding: '4px'
                    }}
                    onClick={() => alert(`🃏 Column ${column} clicked!`)}
                  >
                    {/* Face down cards */}
                    {i < 4 && (
                      <div style={{ 
                        fontSize: '16px',
                        marginBottom: '2px',
                        transform: `translateY(${i * 2}px)`
                      }}>
                        🂠
                      </div>
                    )}
                    
                    {/* Face up cards */}
                    <div style={{ 
                      fontSize: '16px',
                      color: i % 2 === 0 ? '#ff0000' : '#000000'
                    }}>
                      {i === 0 && '🂡'}
                      {i === 1 && '🂢'}
                      {i === 2 && '🂣'}
                      {i === 3 && '🂤'}
                      {i === 4 && '🂥'}
                      {i === 5 && '🂦'}
                      {i === 6 && '🂧'}
                    </div>
                  </div>
                ))}
              </div>

              {/* Game Instructions */}
              <div style={{
                position: 'absolute',
                bottom: '8px',
                left: '8px',
                right: '8px',
                background: 'rgba(0, 0, 0, 0.7)',
                color: '#ffffff',
                padding: '8px',
                borderRadius: '4px',
                fontSize: '10px',
                textAlign: 'center'
              }}>
                <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>How to Play:</div>
                <div>• Click stock pile to draw cards</div>
                <div>• Move cards to foundation piles (A to K)</div>
                <div>• Build tableau in descending order, alternating colors</div>
                <div>• Double-click cards to auto-move to foundation</div>
              </div>
            </div>

            {/* Status Bar */}
            <div style={{ 
              background: '#c0c0c0',
              border: '1px solid #808080',
              padding: '2px 8px',
              fontSize: '8px',
              display: 'flex',
              justifyContent: 'space-between'
            }}>
              <span>Score: 0</span>
              <span>Time: 00:00</span>
              <span>Moves: 0</span>
            </div>
          </div>
        )
      
      case 'Paint':
        return (
          <div style={{ padding: '0px', height: '100%', background: '#ffffff', display: 'flex', flexDirection: 'column' }}>
            {/* Menu Bar */}
            <div style={{ 
              background: '#c0c0c0', 
              border: '2px inset #c0c0c0', 
              padding: '2px',
              display: 'flex',
              gap: '4px'
            }}>
              <button style={{
                background: 'linear-gradient(180deg, #ffffff 0%, #c0c0c0 100%)',
                border: '2px outset #c0c0c0',
                padding: '2px 6px',
                cursor: 'pointer',
                fontSize: '9px'
              }}>File</button>
              <button style={{
                background: 'linear-gradient(180deg, #ffffff 0%, #c0c0c0 100%)',
                border: '2px outset #c0c0c0',
                padding: '2px 6px',
                cursor: 'pointer',
                fontSize: '9px'
              }}>Edit</button>
              <button style={{
                background: 'linear-gradient(180deg, #ffffff 0%, #c0c0c0 100%)',
                border: '2px outset #c0c0c0',
                padding: '2px 6px',
                cursor: 'pointer',
                fontSize: '9px'
              }}>View</button>
              <button style={{
                background: 'linear-gradient(180deg, #ffffff 0%, #c0c0c0 100%)',
                border: '2px outset #c0c0c0',
                padding: '2px 6px',
                cursor: 'pointer',
                fontSize: '9px'
              }}>Image</button>
              <button style={{
                background: 'linear-gradient(180deg, #ffffff 0%, #c0c0c0 100%)',
                border: '2px outset #c0c0c0',
                padding: '2px 6px',
                cursor: 'pointer',
                fontSize: '9px'
              }}>Options</button>
              <button style={{
                background: 'linear-gradient(180deg, #ffffff 0%, #c0c0c0 100%)',
                border: '2px outset #c0c0c0',
                padding: '2px 6px',
                cursor: 'pointer',
                fontSize: '9px'
              }}>Help</button>
            </div>

            {/* Toolbar */}
            <div style={{ 
              background: '#c0c0c0', 
              border: '1px solid #808080', 
              padding: '4px',
              display: 'flex',
              gap: '4px',
              flexWrap: 'wrap'
            }}>
              {/* Drawing Tools */}
              {[
                { tool: '🖊️', name: 'Pencil', size: '16px' },
                { tool: '🖌️', name: 'Brush', size: '20px' },
                { tool: '🖍️', name: 'Marker', size: '24px' },
                { tool: '📏', name: 'Line', size: '16px' },
                { tool: '🔲', name: 'Rectangle', size: '16px' },
                { tool: '⭕', name: 'Circle', size: '16px' },
                { tool: '🪣', name: 'Fill', size: '16px' },
                { tool: '✏️', name: 'Text', size: '16px' }
              ].map((item, i) => (
                <button
                  key={i}
                  style={{
                    background: 'linear-gradient(180deg, #ffffff 0%, #c0c0c0 100%)',
                    border: '2px outset #c0c0c0',
                    padding: '2px 4px',
                    cursor: 'pointer',
                    fontSize: item.size,
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  title={item.name}
                >
                  {item.tool}
                </button>
              ))}
            </div>

            {/* Color Palette */}
            <div style={{ 
              background: '#c0c0c0', 
              border: '1px solid #808080', 
              padding: '4px',
              display: 'flex',
              gap: '2px',
              alignItems: 'center'
            }}>
              <span style={{ fontSize: '8px', marginRight: '8px' }}>Colors:</span>
              {['#000000', '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffffff'].map((color, i) => (
                <button
                  key={i}
                  style={{
                    background: color,
                    border: '1px solid #000000',
                    width: '20px',
                    height: '20px',
                    cursor: 'pointer'
                  }}
                  title={color}
                />
              ))}
            </div>

            {/* Canvas */}
            <div style={{ 
              flex: 1,
              background: '#ffffff',
              border: '2px inset #c0c0c0',
              margin: '8px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <canvas
                id="paint-canvas"
                width="100%"
                height="100%"
                style={{
                  width: '100%',
                  height: '100%',
                  cursor: 'crosshair',
                  background: '#ffffff'
                }}
                onMouseDown={(e) => {
                  const canvas = e.currentTarget
                  const rect = canvas.getBoundingClientRect()
                  const ctx = canvas.getContext('2d')
                  if (ctx) {
                    ctx.beginPath()
                    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top)
                    ctx.strokeStyle = '#000000'
                    ctx.lineWidth = 2
                  }
                }}
                onMouseMove={(e) => {
                  const canvas = e.currentTarget
                  const rect = canvas.getBoundingClientRect()
                  const ctx = canvas.getContext('2d')
                  if (ctx && e.buttons === 1) {
                    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top)
                    ctx.stroke()
                  }
                }}
                onMouseUp={() => {
                  const canvas = document.getElementById('paint-canvas') as HTMLCanvasElement
                  if (canvas) {
                    const ctx = canvas.getContext('2d')
                    if (ctx) {
                      ctx.beginPath()
                    }
                  }
                }}
              />
              
              {/* Canvas Instructions */}
              <div style={{
                position: 'absolute',
                bottom: '8px',
                right: '8px',
                background: 'rgba(255, 255, 255, 0.8)',
                padding: '4px 8px',
                border: '1px solid #000000',
                fontSize: '10px'
              }}>
                Click and drag to draw!
              </div>
            </div>

            {/* Status Bar */}
            <div style={{ 
              background: '#c0c0c0', 
              border: '1px solid #808080', 
              padding: '2px 4px',
              fontSize: '8px',
              display: 'flex',
              justifyContent: 'space-between'
            }}>
              <span>Ready</span>
              <span>Position: 0, 0</span>
            </div>
          </div>
        )
      
      case 'Winamp':
        return (
          <div style={{ padding: '0px', height: '100%', background: '#000000', display: 'flex', flexDirection: 'column' }}>
            {/* Winamp Title Bar */}
            <div style={{ 
              background: 'linear-gradient(90deg, #0066cc 0%, #0099ff 50%, #0066cc 100%)',
              color: 'white',
              padding: '2px 4px',
              fontSize: '10px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span>Winamp</span>
              <span>v2.95</span>
            </div>

            {/* Main Player */}
            <div style={{ 
              background: '#c0c0c0',
              border: '2px inset #c0c0c0',
              padding: '8px',
              flex: 1,
              display: 'flex',
              flexDirection: 'column'
            }}>
              {/* Display */}
              <div style={{ 
                background: '#000000',
                color: '#00ff00',
                padding: '8px',
                marginBottom: '8px',
                fontFamily: 'Courier New, monospace',
                fontSize: '12px',
                border: '2px inset #000000',
                minHeight: '40px'
              }}>
                <div id="winamp-track" style={{ color: '#ffffff' }}>Rick Roll - Never Gonna Give You Up</div>
                <div id="winamp-time" style={{ color: '#00ff00' }}>0:00 / 3:33</div>
              </div>

              {/* Control Buttons */}
              <div style={{ 
                display: 'flex',
                justifyContent: 'center',
                gap: '4px',
                marginBottom: '8px'
              }}>
                {[
                  { icon: '⏮️', name: 'Previous' },
                  { icon: '⏪', name: 'Rewind' },
                  { icon: '▶️', name: 'Play' },
                  { icon: '⏸️', name: 'Pause' },
                  { icon: '⏹️', name: 'Stop' },
                  { icon: '⏩', name: 'Forward' },
                  { icon: '⏭️', name: 'Next' }
                ].map((btn, i) => (
                  <button
                    key={i}
                    style={{
                      background: 'linear-gradient(180deg, #ffffff 0%, #c0c0c0 100%)',
                      border: '2px outset #c0c0c0',
                      padding: '4px 6px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      width: '32px',
                      height: '28px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    title={btn.name}
                    onClick={() => {
                      const trackDisplay = document.getElementById('winamp-track')
                      const timeDisplay = document.getElementById('winamp-time')
                      
                      if (btn.name === 'Play') {
                        if (trackDisplay && timeDisplay) {
                          trackDisplay.style.color = '#00ff00'
                          timeDisplay.textContent = '1:23 / 3:33'
                          alert('🎵 Playing: Never Gonna Give You Up!')
                        }
                      } else if (btn.name === 'Stop') {
                        if (trackDisplay && timeDisplay) {
                          trackDisplay.style.color = '#ffffff'
                          timeDisplay.textContent = '0:00 / 3:33'
                        }
                      } else {
                        alert(`🎵 ${btn.name} button clicked!`)
                      }
                    }}
                  >
                    {btn.icon}
                  </button>
                ))}
              </div>

              {/* Volume Control */}
              <div style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '8px'
              }}>
                <span style={{ fontSize: '10px', color: '#000000' }}>Volume:</span>
                <div style={{ 
                  background: '#ffffff',
                  border: '2px inset #c0c0c0',
                  width: '100px',
                  height: '16px',
                  position: 'relative'
                }}>
                  <div style={{
                    background: '#00ff00',
                    height: '100%',
                    width: '80%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    paddingRight: '4px',
                    fontSize: '8px',
                    color: '#000000'
                  }}>
                    80%
                  </div>
                </div>
              </div>

              {/* Playlist */}
              <div style={{ 
                background: '#ffffff',
                border: '2px inset #c0c0c0',
                padding: '4px',
                flex: 1,
                overflow: 'auto'
              }}>
                <div style={{ 
                  background: '#000080',
                  color: '#ffffff',
                  padding: '2px 4px',
                  fontSize: '10px',
                  marginBottom: '4px'
                }}>
                  Playlist
                </div>
                {[
                  'Rick Roll - Never Gonna Give You Up',
                  'Hamster Dance - The Hampsterdance Song',
                  'Macarena - Los Del Rio',
                  'Cotton Eye Joe - Rednex',
                  'Barbie Girl - Aqua',
                  'Blue - Eiffel 65',
                  'Mambo No. 5 - Lou Bega'
                ].map((track, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '2px 4px',
                      fontSize: '9px',
                      cursor: 'pointer',
                      border: '1px solid transparent',
                      color: i === 0 ? '#0000ff' : '#000000'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#000080'
                      e.currentTarget.style.color = '#ffffff'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent'
                      e.currentTarget.style.color = i === 0 ? '#0000ff' : '#000000'
                    }}
                    onClick={() => {
                      const trackDisplay = document.getElementById('winamp-track')
                      if (trackDisplay) {
                        trackDisplay.textContent = track
                        trackDisplay.style.color = '#00ff00'
                      }
                      alert(`🎵 Now playing: ${track}`)
                    }}
                  >
                    {i + 1}. {track}
                  </div>
                ))}
              </div>

              {/* EQ */}
              <div style={{ 
                background: '#333333',
                border: '2px inset #000000',
                padding: '4px',
                marginTop: '4px'
              }}>
                <div style={{ color: '#00ff00', fontSize: '8px', marginBottom: '2px' }}>EQ</div>
                <div style={{ 
                  display: 'flex',
                  gap: '2px',
                  alignItems: 'flex-end',
                  height: '20px'
                }}>
                  {[8, 6, 4, 7, 9, 5, 3, 6, 8, 10].map((height, i) => (
                    <div
                      key={i}
                      style={{
                        background: '#00ff00',
                        width: '8px',
                        height: `${height * 2}px`,
                        border: '1px solid #000000'
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )
      
      case 'ICQ':
        return (
          <div style={{ padding: '0px', height: '100%', background: '#ffffff', display: 'flex', flexDirection: 'column' }}>
            {/* ICQ Title Bar */}
            <div style={{ 
              background: 'linear-gradient(90deg, #00aaff 0%, #66ccff 50%, #00aaff 100%)',
              color: 'white',
              padding: '4px 8px',
              fontSize: '12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span>ICQ 99b</span>
              <span>UIN: 123456789</span>
            </div>

            {/* Status Bar */}
            <div style={{ 
              background: '#c0c0c0',
              border: '1px solid #808080',
              padding: '2px 8px',
              fontSize: '10px',
              display: 'flex',
              justifyContent: 'space-between'
            }}>
              <span style={{ color: '#008000' }}>🟢 Online</span>
              <span>Friends: 42 | Messages: 1,337</span>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, display: 'flex' }}>
              {/* Contact List */}
              <div style={{ 
                width: '200px',
                background: '#f0f0f0',
                border: '1px solid #808080',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div style={{ 
                  background: '#000080',
                  color: '#ffffff',
                  padding: '4px',
                  fontSize: '10px'
                }}>
                  Friends List
                </div>
                <div style={{ flex: 1, overflow: 'auto', padding: '4px' }}>
                  {[
                    { name: 'CoolGuy92', status: 'online', message: 'Hey dude!' },
                    { name: 'WebMaster', status: 'away', message: 'BRB' },
                    { name: 'ChatGirl', status: 'online', message: 'What\'s up?' },
                    { name: 'TechNerd', status: 'busy', message: 'Working...' },
                    { name: 'MusicLover', status: 'online', message: 'Check this song!' },
                    { name: 'GameBoy', status: 'offline', message: 'Last seen 2h ago' }
                  ].map((contact, i) => (
                    <div
                      key={i}
                      style={{
                        padding: '4px',
                        fontSize: '9px',
                        cursor: 'pointer',
                        border: '1px solid transparent',
                        background: contact.status === 'online' ? '#e8f5e8' : '#f5f5f5',
                        marginBottom: '2px'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#d0e8ff'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = contact.status === 'online' ? '#e8f5e8' : '#f5f5f5'
                      }}
                      onClick={() => {
                        alert(`💬 Opening chat with ${contact.name}!\n\n${contact.name}: ${contact.message}`)
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span style={{ 
                          color: contact.status === 'online' ? '#008000' : 
                                 contact.status === 'away' ? '#ffaa00' :
                                 contact.status === 'busy' ? '#ff0000' : '#808080'
                        }}>
                          {contact.status === 'online' ? '🟢' :
                           contact.status === 'away' ? '🟡' :
                           contact.status === 'busy' ? '🔴' : '⚫'}
                        </span>
                        <span style={{ fontWeight: 'bold' }}>{contact.name}</span>
                      </div>
                      <div style={{ fontSize: '8px', color: '#666666', marginTop: '2px' }}>
                        {contact.message}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chat Area */}
              <div style={{ 
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                background: '#ffffff'
              }}>
                {/* Chat Header */}
                <div style={{ 
                  background: '#e0e0e0',
                  padding: '8px',
                  borderBottom: '1px solid #808080',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}>
                  💬 Welcome to ICQ!
                </div>

                {/* Chat Messages */}
                <div style={{ 
                  flex: 1,
                  padding: '8px',
                  overflow: 'auto',
                  background: '#ffffff'
                }}>
                  <div style={{ fontSize: '10px', marginBottom: '8px' }}>
                    <span style={{ color: '#008000', fontWeight: 'bold' }}>CoolGuy92:</span>
                    <span style={{ marginLeft: '8px' }}>Hey dude! Check out this cool website!</span>
                  </div>
                  <div style={{ fontSize: '10px', marginBottom: '8px' }}>
                    <span style={{ color: '#008000', fontWeight: 'bold' }}>ChatGirl:</span>
                    <span style={{ marginLeft: '8px' }}>What's up? Anyone want to chat?</span>
                  </div>
                  <div style={{ fontSize: '10px', marginBottom: '8px' }}>
                    <span style={{ color: '#008000', fontWeight: 'bold' }}>MusicLover:</span>
                    <span style={{ marginLeft: '8px' }}>Check this song! 🎵</span>
                  </div>
                  <div style={{ fontSize: '10px', marginBottom: '8px' }}>
                    <span style={{ color: '#008000', fontWeight: 'bold' }}>TechNerd:</span>
                    <span style={{ marginLeft: '8px' }}>Working on my homepage... so many popup ads!</span>
                  </div>
                </div>

                {/* Message Input */}
                <div style={{ 
                  background: '#f0f0f0',
                  padding: '8px',
                  borderTop: '1px solid #808080',
                  display: 'flex',
                  gap: '4px'
                }}>
                  <input
                    type="text"
                    placeholder="Type your message here..."
                    style={{
                      flex: 1,
                      border: '2px inset #c0c0c0',
                      padding: '4px',
                      fontSize: '10px',
                      fontFamily: 'Arial, sans-serif'
                    }}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        const message = e.currentTarget.value
                        if (message.trim()) {
                          alert(`💬 Message sent: "${message}"`)
                          e.currentTarget.value = ''
                        }
                      }
                    }}
                  />
                  <button style={{
                    background: 'linear-gradient(180deg, #ffffff 0%, #c0c0c0 100%)',
                    border: '2px outset #c0c0c0',
                    padding: '4px 8px',
                    cursor: 'pointer',
                    fontSize: '10px'
                  }}>
                    Send
                  </button>
                </div>
              </div>
            </div>

            {/* Features Bar */}
            <div style={{ 
              background: '#c0c0c0',
              border: '1px solid #808080',
              padding: '4px',
              display: 'flex',
              gap: '4px',
              justifyContent: 'center'
            }}>
              {[
                { icon: '🌸', name: 'Send Flower' },
                { icon: '📁', name: 'Send File' },
                { icon: '🎵', name: 'Music' },
                { icon: '🎮', name: 'Games' },
                { icon: '💌', name: 'Message' },
                { icon: '🔍', name: 'Find' }
              ].map((feature, i) => (
                <button
                  key={i}
                  style={{
                    background: 'linear-gradient(180deg, #ffffff 0%, #c0c0c0 100%)',
                    border: '1px outset #c0c0c0',
                    padding: '2px 6px',
                    cursor: 'pointer',
                    fontSize: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '2px'
                  }}
                  title={feature.name}
                  onClick={() => alert(`🌸 ${feature.name} feature clicked!`) }
                >
                  {feature.icon}
                </button>
              ))}
            </div>
          </div>
        )
      
      case 'Dancing Baby':
        return (
          <div style={{ padding: '12px', height: '100%', background: '#ffffff', textAlign: 'center' }}>
            <div style={{ background: '#000080', color: 'white', padding: '6px', marginBottom: '12px', fontSize: '14px' }}>
              👶 Dancing Baby Viewer
            </div>
            <div style={{ 
              width: '160px', 
              height: '120px', 
              margin: '0 auto 12px auto',
              border: '2px solid #000000',
              background: '#000000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <img
                src="/assets/dancing-baby.gif"
                alt="Dancing Baby"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  imageRendering: 'pixelated'
                }}
              />
            </div>
            <div style={{ fontSize: '14px', color: '#000000', lineHeight: '1.4' }}>
              👶 THE DANCING BABY! 👶<br />
              AS SEEN ON ALLY MCBEAL!<br />
              <div style={{ marginTop: '8px', fontSize: '12px' }}>
                (Ooga chaka ooga chaka!)
              </div>
            </div>
          </div>
        )
      
      case 'System Info':
        return (
          <div style={{ padding: '12px', height: '100%', background: '#ffffff' }}>
            <div style={{ background: '#000080', color: 'white', padding: '6px', marginBottom: '12px', fontSize: '14px' }}>
              ⚙️ System Information
            </div>
            <div style={{ fontSize: '14px', lineHeight: '1.5', color: '#000000' }}>
              <div style={{ background: '#e0e0e0', padding: '8px', marginBottom: '12px', border: '1px solid #c0c0c0' }}>
                <strong>Windows 95</strong>
              </div>
              <div style={{ marginBottom: '8px' }}>Computer: Pentium 133MHz</div>
              <div style={{ marginBottom: '8px' }}>Memory: 32MB RAM</div>
              <div style={{ marginBottom: '8px' }}>Disk Space: 2.1GB free</div>
              <div style={{ marginBottom: '8px' }}>Graphics: SVGA 640x480</div>
              <div style={{ marginBottom: '8px' }}>Sound: Sound Blaster 16</div>
              <div style={{ marginBottom: '8px' }}>Network: 28.8k Modem</div>
              <div style={{ marginBottom: '8px' }}>Uptime: 2 days, 14 hours</div>
            </div>
          </div>
        )
      
      case 'Calculator':
        return (
          <div style={{ padding: '0px', height: '100%', background: '#ffffff', display: 'flex', flexDirection: 'column' }}>
            {/* Menu Bar */}
            <div style={{ 
              background: '#c0c0c0', 
              border: '2px inset #c0c0c0', 
              padding: '2px',
              display: 'flex',
              gap: '4px'
            }}>
              <button style={{
                background: 'linear-gradient(180deg, #ffffff 0%, #c0c0c0 100%)',
                border: '2px outset #c0c0c0',
                padding: '2px 6px',
                cursor: 'pointer',
                fontSize: '9px'
              }}>Edit</button>
              <button style={{
                background: 'linear-gradient(180deg, #ffffff 0%, #c0c0c0 100%)',
                border: '2px outset #c0c0c0',
                padding: '2px 6px',
                cursor: 'pointer',
                fontSize: '9px'
              }}>View</button>
              <button style={{
                background: 'linear-gradient(180deg, #ffffff 0%, #c0c0c0 100%)',
                border: '2px outset #c0c0c0',
                padding: '2px 6px',
                cursor: 'pointer',
                fontSize: '9px'
              }}>Help</button>
            </div>

            {/* Display */}
            <div style={{ 
              background: '#c0c0c0', 
              border: '2px inset #c0c0c0', 
              padding: '8px', 
              margin: '8px',
              textAlign: 'right', 
              fontSize: '16px', 
              fontFamily: 'Courier New, monospace', 
              color: '#000000',
              minHeight: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end'
            }}>
              <span id="calc-display">0</span>
            </div>

            {/* Calculator Buttons */}
            <div style={{ 
              padding: '8px', 
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: '4px'
            }}>
              {/* Row 1 */}
              <div style={{ display: 'flex', gap: '4px' }}>
                {['C', 'CE', 'Back', '÷'].map((btn, i) => (
                  <button
                    key={i}
                    style={{
                      flex: 1,
                      background: btn === 'C' || btn === 'CE' ? '#ffcccc' : '#c0c0c0',
                      border: '2px outset #c0c0c0',
                      padding: '8px',
                      fontSize: '12px',
                      cursor: 'pointer',
                      color: '#000000',
                      fontWeight: 'bold'
                    }}
                    onClick={() => {
                      const display = document.getElementById('calc-display')
                      if (display) {
                        if (btn === 'C' || btn === 'CE') {
                          display.textContent = '0'
                        } else if (btn === 'Back') {
                          const current = display.textContent || '0'
                          display.textContent = current.length > 1 ? current.slice(0, -1) : '0'
                        } else if (btn === '÷') {
                          display.textContent += ' ÷ '
                        }
                      }
                    }}
                  >
                    {btn}
                  </button>
                ))}
              </div>

              {/* Row 2 */}
              <div style={{ display: 'flex', gap: '4px' }}>
                {['7', '8', '9', '×'].map((btn, i) => (
                  <button
                    key={i}
                    style={{
                      flex: 1,
                      background: '#c0c0c0',
                      border: '2px outset #c0c0c0',
                      padding: '8px',
                      fontSize: '12px',
                      cursor: 'pointer',
                      color: '#000000',
                      fontWeight: 'bold'
                    }}
                    onClick={() => {
                      const display = document.getElementById('calc-display')
                      if (display) {
                        const current = display.textContent || '0'
                        if (current === '0') {
                          display.textContent = btn
                        } else {
                          display.textContent += btn
                        }
                      }
                    }}
                  >
                    {btn}
                  </button>
                ))}
              </div>

              {/* Row 3 */}
              <div style={{ display: 'flex', gap: '4px' }}>
                {['4', '5', '6', '-'].map((btn, i) => (
                  <button
                    key={i}
                    style={{
                      flex: 1,
                      background: '#c0c0c0',
                      border: '2px outset #c0c0c0',
                      padding: '8px',
                      fontSize: '12px',
                      cursor: 'pointer',
                      color: '#000000',
                      fontWeight: 'bold'
                    }}
                    onClick={() => {
                      const display = document.getElementById('calc-display')
                      if (display) {
                        const current = display.textContent || '0'
                        if (current === '0') {
                          display.textContent = btn
                        } else {
                          display.textContent += btn
                        }
                      }
                    }}
                  >
                    {btn}
                  </button>
                ))}
              </div>

              {/* Row 4 */}
              <div style={{ display: 'flex', gap: '4px' }}>
                {['1', '2', '3', '+'].map((btn, i) => (
                  <button
                    key={i}
                    style={{
                      flex: 1,
                      background: '#c0c0c0',
                      border: '2px outset #c0c0c0',
                      padding: '8px',
                      fontSize: '12px',
                      cursor: 'pointer',
                      color: '#000000',
                      fontWeight: 'bold'
                    }}
                    onClick={() => {
                      const display = document.getElementById('calc-display')
                      if (display) {
                        const current = display.textContent || '0'
                        if (current === '0') {
                          display.textContent = btn
                        } else {
                          display.textContent += btn
                        }
                      }
                    }}
                  >
                    {btn}
                  </button>
                ))}
              </div>

              {/* Row 5 */}
              <div style={{ display: 'flex', gap: '4px' }}>
                {['0', '0', '.', '='].map((btn, i) => (
                  <button
                    key={i}
                    style={{
                      flex: 1,
                      background: btn === '=' ? '#ccccff' : '#c0c0c0',
                      border: '2px outset #c0c0c0',
                      padding: '8px',
                      fontSize: '12px',
                      cursor: 'pointer',
                      color: '#000000',
                      fontWeight: 'bold'
                    }}
                    onClick={() => {
                      const display = document.getElementById('calc-display')
                      if (display) {
                        if (btn === '=') {
                          try {
                            const expression = (display.textContent || '0').replace(/×/g, '*').replace(/÷/g, '/')
                            const result = Function(`"use strict"; return (${expression})`)()
                            display.textContent = result.toString()
                          } catch (e) {
                            display.textContent = 'Error'
                          }
                        } else {
                          const current = display.textContent || '0'
                          if (current === '0') {
                            display.textContent = btn
                          } else {
                            display.textContent += btn
                          }
                        }
                      }
                    }}
                  >
                    {btn}
                  </button>
                ))}
              </div>
            </div>

            {/* Status Bar */}
            <div style={{ 
              background: '#c0c0c0', 
              border: '1px solid #808080', 
              padding: '2px 4px',
              fontSize: '8px',
              color: '#000000'
            }}>
              Calculator v1.0 - Ready
            </div>
          </div>
        )
      
      case 'Media Player':
        return (
          <div style={{ padding: '12px', height: '100%', background: '#000000', color: '#00ff00' }}>
            <div style={{ background: '#000080', color: 'white', padding: '6px', marginBottom: '12px', fontSize: '14px' }}>
              📺 Windows Media Player
            </div>
            <div style={{ fontFamily: 'Courier New, monospace', fontSize: '12px', lineHeight: '1.4' }}>
              <div style={{ background: '#333333', padding: '8px', marginBottom: '12px', border: '1px solid #666666' }}>
                <div style={{ color: '#00ff00' }}>▶️ Now Playing:</div>
                <div style={{ color: '#ffffff' }}>Never Gonna Give You Up.mp3</div>
              </div>
              <div style={{ marginBottom: '8px' }}>Volume: ████████░░ 80%</div>
              <div style={{ marginBottom: '8px' }}>Position: ████░░░░░░ 40%</div>
              <div style={{ marginBottom: '12px' }}>EQ: ████████████████</div>
              <div style={{ fontSize: '10px', color: '#888888' }}>
                Time: 1:20 / 3:33<br />
                Bitrate: 128kbps<br />
                Frequency: 44.1kHz<br />
                Channels: Stereo
              </div>
            </div>
          </div>
        )
      
      case 'File Manager':
        return (
          <div style={{ padding: '12px', height: '100%', background: '#ffffff' }}>
            <div style={{ background: '#000080', color: 'white', padding: '6px', marginBottom: '12px', fontSize: '14px' }}>
              📂 File Manager
            </div>
            <div style={{ display: 'flex', height: 'calc(100% - 60px)' }}>
              <div style={{ width: '50%', border: '1px solid #c0c0c0', padding: '8px', marginRight: '4px' }}>
                <div style={{ background: '#000080', color: 'white', padding: '4px', marginBottom: '8px', fontSize: '12px' }}>
                  C:\
                </div>
                <div style={{ fontSize: '12px', lineHeight: '1.4', color: '#000000' }}>
                  <div style={{ marginBottom: '4px' }}>📁 Windows</div>
                  <div style={{ marginBottom: '4px' }}>📁 Program Files</div>
                  <div style={{ marginBottom: '4px' }}>📁 My Documents</div>
                  <div style={{ marginBottom: '4px' }}>📁 Desktop</div>
                  <div style={{ marginBottom: '4px' }}>📄 autoexec.bat</div>
                  <div style={{ marginBottom: '4px' }}>📄 config.sys</div>
                </div>
              </div>
              <div style={{ width: '50%', border: '1px solid #c0c0c0', padding: '8px' }}>
                <div style={{ background: '#000080', color: 'white', padding: '4px', marginBottom: '8px', fontSize: '12px' }}>
                  A:\
                </div>
                <div style={{ fontSize: '12px', lineHeight: '1.4', color: '#000000' }}>
                  <div style={{ marginBottom: '4px' }}>💿 Floppy Disk</div>
                  <div style={{ marginBottom: '4px' }}>📄 game.exe</div>
                  <div style={{ marginBottom: '4px' }}>📄 readme.txt</div>
                  <div style={{ marginBottom: '4px' }}>📄 setup.exe</div>
                </div>
              </div>
            </div>
          </div>
        )
      
      case 'Terminal':
        return (
          <div style={{ padding: '12px', height: '100%', background: '#000000', color: '#00ff00', fontFamily: 'Courier New, monospace' }}>
            <div style={{ background: '#000080', color: 'white', padding: '6px', marginBottom: '12px', fontSize: '14px' }}>
              💻 MS-DOS Prompt
            </div>
            <div style={{ fontSize: '12px', lineHeight: '1.4' }}>
              <div style={{ marginBottom: '4px' }}>C:\WINDOWS&gt; dir</div>
              <div style={{ marginBottom: '4px' }}>Volume in drive C is MS-DOS_6</div>
              <div style={{ marginBottom: '4px' }}>Directory of C:\WINDOWS</div>
              <div style={{ marginBottom: '4px' }}></div>
              <div style={{ marginBottom: '4px' }}>COMMAND    COM     94,282 06-19-93  6:00a</div>
              <div style={{ marginBottom: '4px' }}>CONFIG     SYS     1,234  06-19-93  6:00a</div>
              <div style={{ marginBottom: '4px' }}>AUTOEXEC   BAT     2,345  06-19-93  6:00a</div>
              <div style={{ marginBottom: '4px' }}>WINDOWS    &lt;DIR&gt;   06-19-93  6:00a</div>
              <div style={{ marginBottom: '4px' }}>GAMES      &lt;DIR&gt;   06-19-93  6:00a</div>
              <div style={{ marginBottom: '4px' }}></div>
              <div style={{ marginBottom: '4px' }}>5 file(s) 97,861 bytes</div>
              <div style={{ marginBottom: '4px' }}>2 dir(s) 1,234,567 bytes free</div>
              <div style={{ marginBottom: '4px' }}></div>
              <div style={{ marginBottom: '4px', color: '#ffffff' }}>C:\WINDOWS&gt; _</div>
            </div>
          </div>
        )
      
      case 'Chat Room':
        return (
          <div style={{ padding: '16px', height: '100%', background: '#ffffff', overflow: 'hidden' }}>
            <div style={{ background: '#000080', color: 'white', padding: '8px', marginBottom: '16px', fontSize: '16px' }}>
              💭 90s Chat Room
            </div>
            <div style={{ height: 'calc(100% - 80px)', overflow: 'hidden' }}>
              <ChatRoom90s />
            </div>
          </div>
        )
      
      case 'Music Player':
        return (
          <div style={{ padding: '16px', height: '100%', background: '#ffffff', overflow: 'hidden' }}>
            <div style={{ background: '#000080', color: 'white', padding: '8px', marginBottom: '16px', fontSize: '16px' }}>
              🎶 90s Music Player
            </div>
            <div style={{ height: 'calc(100% - 80px)', overflow: 'hidden' }}>
              <MusicPlayer90s />
            </div>
          </div>
        )
      
      case 'Screensaver':
        return (
          <div style={{ padding: '16px', height: '100%', background: '#ffffff', overflow: 'hidden' }}>
            <div style={{ background: '#000080', color: 'white', padding: '8px', marginBottom: '16px', fontSize: '16px' }}>
              🖼️ Flying Toasters
            </div>
            <div style={{ height: 'calc(100% - 80px)', overflow: 'hidden' }}>
              <Screensaver90s />
            </div>
          </div>
        )
      
      case 'Trivia Quiz':
        return (
          <div style={{ padding: '16px', height: '100%', background: '#ffffff', overflow: 'hidden' }}>
            <div style={{ background: '#000080', color: 'white', padding: '8px', marginBottom: '16px', fontSize: '16px' }}>
              ❓ 90s Trivia Quiz
            </div>
            <div style={{ height: 'calc(100% - 80px)', overflow: 'hidden' }}>
              <TriviaQuiz90s />
            </div>
          </div>
        )
      
      case 'Tamagotchi':
        return (
          <div style={{ padding: '0px', height: '100%', background: '#ffffff', display: 'flex', flexDirection: 'column' }}>
            {/* Tamagotchi Title Bar */}
            <div style={{ 
              background: 'linear-gradient(90deg, #ff69b4 0%, #ffb6c1 50%, #ff69b4 100%)',
              color: 'white',
              padding: '4px 8px',
              fontSize: '12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span>🐾 Tamagotchi v2.0</span>
              <span>Pet: Baby</span>
            </div>

            {/* Pet Status */}
            <div style={{ 
              background: '#f0f0f0',
              border: '1px solid #808080',
              padding: '4px 8px',
              fontSize: '10px',
              display: 'flex',
              justifyContent: 'space-between'
            }}>
              <span>Age: 2 days</span>
              <span>Generation: 1</span>
              <span>Weight: 50g</span>
            </div>

            {/* Main Pet Area */}
            <div style={{ 
              flex: 1,
              padding: '8px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              background: '#ffffff'
            }}>
              {/* Pet Display */}
              <div style={{ 
                background: '#000000',
                border: '3px solid #333333',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '16px',
                width: '200px',
                height: '160px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}>
                {/* Pet Character */}
                <div style={{ 
                  fontSize: '48px',
                  marginBottom: '8px',
                  animation: 'pulse 2s ease-in-out infinite'
                }}>
                  👶
                </div>
                
                {/* Pet Name */}
                <div style={{ 
                  color: '#00ff00',
                  fontSize: '10px',
                  fontFamily: 'Courier New, monospace',
                  marginBottom: '4px'
                }}>
                  BABY
                </div>
                
                {/* Status Indicators */}
                <div style={{ 
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  fontSize: '8px',
                  color: '#00ff00'
                }}>
                  🟢
                </div>
                
                {/* Care Meters */}
                <div style={{ 
                  position: 'absolute',
                  bottom: '8px',
                  left: '8px',
                  right: '8px',
                  display: 'flex',
                  gap: '4px'
                }}>
                  <div style={{ fontSize: '6px', color: '#00ff00' }}>H:</div>
                  <div style={{ 
                    background: '#00ff00',
                    height: '4px',
                    width: '20px',
                    border: '1px solid #00ff00'
                  }}></div>
                  <div style={{ fontSize: '6px', color: '#ffff00' }}>F:</div>
                  <div style={{ 
                    background: '#ffff00',
                    height: '4px',
                    width: '20px',
                    border: '1px solid #ffff00'
                  }}></div>
                  <div style={{ fontSize: '6px', color: '#ff0000' }}>P:</div>
                  <div style={{ 
                    background: '#ff0000',
                    height: '4px',
                    width: '20px',
                    border: '1px solid #ff0000'
                  }}></div>
                </div>
              </div>

              {/* Care Buttons */}
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '8px',
                width: '100%',
                maxWidth: '300px'
              }}>
                {[
                  { icon: '🍼', name: 'Feed', action: 'feed' },
                  { icon: '🎮', name: 'Play', action: 'play' },
                  { icon: '💊', name: 'Medicine', action: 'medicine' },
                  { icon: '💡', name: 'Light', action: 'light' },
                  { icon: '🧹', name: 'Clean', action: 'clean' },
                  { icon: '📞', name: 'Call', action: 'call' }
                ].map((button, i) => (
                  <button
                    key={i}
                    style={{
                      background: 'linear-gradient(180deg, #ffffff 0%, #c0c0c0 100%)',
                      border: '2px outset #c0c0c0',
                      padding: '8px 4px',
                      cursor: 'pointer',
                      fontSize: '20px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '2px',
                      borderRadius: '4px'
                    }}
                    onClick={() => {
                      const responses = {
                        feed: '🍼 Feeding your pet... +5 Happiness!',
                        play: '🎮 Playing with your pet... +3 Happiness!',
                        medicine: '💊 Giving medicine... Pet feels better!',
                        light: '💡 Turning on light... Pet is happy!',
                        clean: '🧹 Cleaning up... Pet is clean and happy!',
                        call: '📞 Calling your pet... Pet responds with joy!'
                      }
                      alert(responses[button.action as keyof typeof responses])
                    }}
                  >
                    <span>{button.icon}</span>
                    <span style={{ fontSize: '8px', color: '#000000' }}>{button.name}</span>
                  </button>
                ))}
              </div>

              {/* Pet Stats */}
              <div style={{ 
                marginTop: '16px',
                padding: '8px',
                background: '#f0f0f0',
                border: '2px inset #c0c0c0',
                width: '100%',
                maxWidth: '300px'
              }}>
                <div style={{ fontSize: '10px', fontWeight: 'bold', marginBottom: '4px' }}>Pet Statistics:</div>
                <div style={{ fontSize: '8px', lineHeight: '1.4' }}>
                  <div>❤️ Happiness: 85% (Very Happy)</div>
                  <div>🍽️ Hunger: 30% (Not Hungry)</div>
                  <div>😴 Sleepiness: 20% (Awake)</div>
                  <div>🏥 Health: 95% (Excellent)</div>
                  <div>🎂 Age: 2 days old</div>
                  <div>🏆 Discipline: 60%</div>
                </div>
              </div>
            </div>

            {/* Bottom Status */}
            <div style={{ 
              background: '#c0c0c0',
              border: '1px solid #808080',
              padding: '4px 8px',
              fontSize: '8px',
              display: 'flex',
              justifyContent: 'space-between'
            }}>
              <span>Ready</span>
              <span>Last care: 5 minutes ago</span>
            </div>
          </div>
        )
      
      case 'TV Channel':
        return (
          <div style={{ padding: '16px', height: '100%', background: '#ffffff', overflow: 'hidden' }}>
            <div style={{ background: '#000080', color: 'white', padding: '8px', marginBottom: '16px', fontSize: '16px' }}>
              📺 TV Channel Surfer
            </div>
            <div style={{ height: 'calc(100% - 80px)', overflow: 'hidden' }}>
              <TVChannel90s />
            </div>
          </div>
        )
      
      case 'My Computer Folder':
        return (
          <div style={{ padding: '0px', height: '100%', background: '#ffffff', display: 'flex', flexDirection: 'column' }}>
            {/* Menu Bar */}
            <div style={{ 
              background: '#c0c0c0', 
              border: '2px inset #c0c0c0', 
              padding: '2px',
              display: 'flex',
              gap: '4px'
            }}>
              <button style={{
                background: 'linear-gradient(180deg, #ffffff 0%, #c0c0c0 100%)',
                border: '2px outset #c0c0c0',
                padding: '2px 6px',
                cursor: 'pointer',
                fontSize: '9px'
              }}>File</button>
              <button style={{
                background: 'linear-gradient(180deg, #ffffff 0%, #c0c0c0 100%)',
                border: '2px outset #c0c0c0',
                padding: '2px 6px',
                cursor: 'pointer',
                fontSize: '9px'
              }}>Edit</button>
              <button style={{
                background: 'linear-gradient(180deg, #ffffff 0%, #c0c0c0 100%)',
                border: '2px outset #c0c0c0',
                padding: '2px 6px',
                cursor: 'pointer',
                fontSize: '9px'
              }}>View</button>
              <button style={{
                background: 'linear-gradient(180deg, #ffffff 0%, #c0c0c0 100%)',
                border: '2px outset #c0c0c0',
                padding: '2px 6px',
                cursor: 'pointer',
                fontSize: '9px'
              }}>Tools</button>
              <button style={{
                background: 'linear-gradient(180deg, #ffffff 0%, #c0c0c0 100%)',
                border: '2px outset #c0c0c0',
                padding: '2px 6px',
                cursor: 'pointer',
                fontSize: '9px'
              }}>Help</button>
            </div>

            {/* Toolbar */}
            <div style={{ 
              background: '#c0c0c0', 
              border: '1px solid #808080', 
              padding: '2px',
              display: 'flex',
              gap: '2px'
            }}>
              <button style={{
                background: 'linear-gradient(180deg, #ffffff 0%, #c0c0c0 100%)',
                border: '1px outset #c0c0c0',
                padding: '1px 4px',
                cursor: 'pointer',
                fontSize: '8px'
              }}>Up</button>
              <div style={{ width: '1px', background: '#808080', margin: '0 2px' }}></div>
              <button style={{
                background: 'linear-gradient(180deg, #ffffff 0%, #c0c0c0 100%)',
                border: '1px outset #c0c0c0',
                padding: '1px 4px',
                cursor: 'pointer',
                fontSize: '8px'
              }}>Cut</button>
              <button style={{
                background: 'linear-gradient(180deg, #ffffff 0%, #c0c0c0 100%)',
                border: '1px outset #c0c0c0',
                padding: '1px 4px',
                cursor: 'pointer',
                fontSize: '8px'
              }}>Copy</button>
              <button style={{
                background: 'linear-gradient(180deg, #ffffff 0%, #c0c0c0 100%)',
                border: '1px outset #c0c0c0',
                padding: '1px 4px',
                cursor: 'pointer',
                fontSize: '8px'
              }}>Paste</button>
              <div style={{ width: '1px', background: '#808080', margin: '0 2px' }}></div>
              <button style={{
                background: 'linear-gradient(180deg, #ffffff 0%, #c0c0c0 100%)',
                border: '1px outset #c0c0c0',
                padding: '1px 4px',
                cursor: 'pointer',
                fontSize: '8px'
              }}>Properties</button>
            </div>

            {/* Address Bar */}
            <div style={{ 
              background: '#c0c0c0', 
              border: '1px solid #808080', 
              padding: '2px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <span style={{ fontSize: '8px' }}>Address:</span>
              <div style={{
                flex: 1,
                background: '#ffffff',
                border: '2px inset #c0c0c0',
                padding: '2px 4px',
                fontSize: '9px',
                fontFamily: 'Courier New, monospace'
              }}>
                C:\
              </div>
            </div>

            {/* Drive List */}
            <div style={{ 
              flex: 1,
              padding: '8px',
              overflow: 'auto',
              background: '#ffffff'
            }}>
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                gap: '8px'
              }}>
                {/* Hard Drives */}
                {[
                  { icon: '💽', name: 'Local Disk (C:)', size: '2.1 GB free of 4.0 GB', type: 'Hard Disk' },
                  { icon: '💽', name: 'Local Disk (D:)', size: '1.8 GB free of 2.0 GB', type: 'Hard Disk' },
                  { icon: '💿', name: 'CD-ROM (E:)', size: 'No disc', type: 'CD-ROM Drive' },
                  { icon: '💿', name: 'CD-ROM (F:)', size: 'No disc', type: 'CD-ROM Drive' },
                  { icon: '💾', name: '3½ Floppy (A:)', size: 'No disc', type: 'Floppy Disk' },
                  { icon: '💾', name: '5¼ Floppy (B:)', size: 'No disc', type: 'Floppy Disk' }
                ].map((drive, i) => (
                  <div
                    key={i}
                    style={{
                      background: '#f0f0f0',
                      border: '2px outset #c0c0c0',
                      padding: '8px',
                      textAlign: 'center',
                      cursor: 'pointer',
                      fontSize: '10px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#e0e0e0'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#f0f0f0'
                    }}
                    onClick={() => {
                      alert(`💽 Opening ${drive.name}\nType: ${drive.type}\n${drive.size}`)
                    }}
                  >
                    <div style={{ fontSize: '24px', marginBottom: '4px' }}>{drive.icon}</div>
                    <div style={{ fontWeight: 'bold', marginBottom: '2px' }}>{drive.name}</div>
                    <div style={{ fontSize: '8px', color: '#666666' }}>{drive.type}</div>
                    <div style={{ fontSize: '8px', color: '#666666', marginTop: '2px' }}>{drive.size}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Status Bar */}
            <div style={{ 
              background: '#c0c0c0', 
              border: '1px solid #808080', 
              padding: '2px 4px',
              fontSize: '8px',
              display: 'flex',
              justifyContent: 'space-between'
            }}>
              <span>6 objects</span>
              <span>System Properties</span>
            </div>
          </div>
        )
      
      case 'Recycle Bin Folder':
        return (
          <div style={{ padding: '0px', height: '100%', background: '#ffffff', display: 'flex', flexDirection: 'column' }}>
            {/* Menu Bar */}
            <div style={{ 
              background: '#c0c0c0', 
              border: '2px inset #c0c0c0', 
              padding: '2px',
              display: 'flex',
              gap: '4px'
            }}>
              <button style={{
                background: 'linear-gradient(180deg, #ffffff 0%, #c0c0c0 100%)',
                border: '2px outset #c0c0c0',
                padding: '2px 6px',
                cursor: 'pointer',
                fontSize: '9px'
              }}>File</button>
              <button style={{
                background: 'linear-gradient(180deg, #ffffff 0%, #c0c0c0 100%)',
                border: '2px outset #c0c0c0',
                padding: '2px 6px',
                cursor: 'pointer',
                fontSize: '9px'
              }}>Edit</button>
              <button style={{
                background: 'linear-gradient(180deg, #ffffff 0%, #c0c0c0 100%)',
                border: '2px outset #c0c0c0',
                padding: '2px 6px',
                cursor: 'pointer',
                fontSize: '9px'
              }}>View</button>
              <button style={{
                background: 'linear-gradient(180deg, #ffffff 0%, #c0c0c0 100%)',
                border: '2px outset #c0c0c0',
                padding: '2px 6px',
                cursor: 'pointer',
                fontSize: '9px'
              }}>Help</button>
            </div>

            {/* Toolbar */}
            <div style={{ 
              background: '#c0c0c0', 
              border: '1px solid #808080', 
              padding: '2px',
              display: 'flex',
              gap: '2px'
            }}>
              <button style={{
                background: 'linear-gradient(180deg, #ffffff 0%, #c0c0c0 100%)',
                border: '1px outset #c0c0c0',
                padding: '1px 4px',
                cursor: 'pointer',
                fontSize: '8px'
              }}>Restore</button>
              <button style={{
                background: 'linear-gradient(180deg, #ffffff 0%, #c0c0c0 100%)',
                border: '1px outset #c0c0c0',
                padding: '1px 4px',
                cursor: 'pointer',
                fontSize: '8px'
              }}>Empty</button>
              <div style={{ width: '1px', background: '#808080', margin: '0 2px' }}></div>
              <button style={{
                background: 'linear-gradient(180deg, #ffffff 0%, #c0c0c0 100%)',
                border: '1px outset #c0c0c0',
                padding: '1px 4px',
                cursor: 'pointer',
                fontSize: '8px'
              }}>Properties</button>
            </div>

            {/* Content */}
            <div style={{ 
              flex: 1,
              padding: '8px',
              overflow: 'auto',
              background: '#ffffff'
            }}>
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
                gap: '8px'
              }}>
                {[
                  { icon: '📄', name: 'old_homepage.html', size: '15 KB', date: '12/25/1999' },
                  { icon: '🖼️', name: 'dancing_baby.gif', size: '245 KB', date: '12/24/1999' },
                  { icon: '📄', name: 'resume.doc', size: '32 KB', date: '12/23/1999' },
                  { icon: '🎵', name: 'hamster_dance.mid', size: '128 KB', date: '12/22/1999' },
                  { icon: '📄', name: 'temp_file.txt', size: '2 KB', date: '12/21/1999' }
                ].map((file, i) => (
                  <div
                    key={i}
                    style={{
                      background: '#f0f0f0',
                      border: '2px outset #c0c0c0',
                      padding: '8px',
                      textAlign: 'center',
                      cursor: 'pointer',
                      fontSize: '9px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#e0e0e0'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#f0f0f0'
                    }}
                    onClick={() => {
                      alert(`🗑️ Deleted File: ${file.name}\nSize: ${file.size}\nDeleted: ${file.date}\n\nRight-click to restore or permanently delete.`)
                    }}
                  >
                    <div style={{ fontSize: '20px', marginBottom: '4px' }}>{file.icon}</div>
                    <div style={{ fontWeight: 'bold', marginBottom: '2px', wordBreak: 'break-word' }}>{file.name}</div>
                    <div style={{ fontSize: '8px', color: '#666666' }}>{file.size}</div>
                    <div style={{ fontSize: '8px', color: '#666666', marginTop: '2px' }}>{file.date}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Status Bar */}
            <div style={{ 
              background: '#c0c0c0', 
              border: '1px solid #808080', 
              padding: '2px 4px',
              fontSize: '8px',
              display: 'flex',
              justifyContent: 'space-between'
            }}>
              <span>5 objects</span>
              <span>Ready</span>
            </div>
          </div>
        )
      
      default:
        return (
          <div style={{ padding: '8px', height: '100%', background: '#ffffff', textAlign: 'center' }}>
            <div style={{ background: '#000080', color: 'white', padding: '4px', marginBottom: '8px', fontSize: '10px' }}>
              {icon.icon} {icon.name}
            </div>
            <div style={{ fontSize: '10px', marginTop: '20px' }}>
              This is a {icon.type} window.<br />
              <div style={{ marginTop: '8px', fontSize: '9px', color: '#666666' }}>
                (Simulated 90s interface)
              </div>
            </div>
          </div>
        )
    }
  }

  const handleIconClick = (icon: DesktopIcon) => {
    if (icon.type === 'program') {
      // Check if window already exists
      const existingWindow = windows.find(w => w.id === icon.id)
      if (existingWindow) {
        // Bring to front
        setWindows(prev => prev.map(w => 
          w.id === icon.id 
            ? { ...w, isMinimized: false, zIndex: nextZIndex }
            : w
        ))
        setNextZIndex(prev => prev + 1)
      } else {
        // Create new window
        const newWindow: WindowState = {
          id: icon.id,
          title: icon.name,
          content: generateProgramContent(icon),
          x: 50 + (windows.length * 20),
          y: 50 + (windows.length * 20),
          width: 600,
          height: 500,
          originalWidth: 600,
          originalHeight: 500,
          originalX: 50 + (windows.length * 20),
          originalY: 50 + (windows.length * 20),
          isMinimized: false,
          isMaximized: false,
          zIndex: nextZIndex,
          isDragging: false,
          isResizing: false,
          dragStartX: 0,
          dragStartY: 0
        }
        setWindows(prev => [...prev, newWindow])
        setNextZIndex(prev => prev + 1)
      }
      
      // Add to taskbar if not already there
      if (!taskbar.find(t => t.id === icon.id)) {
        setTaskbar(prev => [...prev, { ...icon, isOpen: true }])
      }
    } else {
      // Handle folder opening
      const folderContent = generateProgramContent({ ...icon, name: `${icon.name} Folder` })
      const existingWindow = windows.find(w => w.id === icon.id)
      if (existingWindow) {
        setWindows(prev => prev.map(w => 
          w.id === icon.id 
            ? { ...w, isMinimized: false, zIndex: nextZIndex }
            : w
        ))
        setNextZIndex(prev => prev + 1)
      } else {
        const newWindow: WindowState = {
          id: icon.id,
          title: icon.name,
          content: folderContent,
          x: 50 + (windows.length * 20),
          y: 50 + (windows.length * 20),
          width: 600,
          height: 500,
          originalWidth: 600,
          originalHeight: 500,
          originalX: 50 + (windows.length * 20),
          originalY: 50 + (windows.length * 20),
          isMinimized: false,
          isMaximized: false,
          zIndex: nextZIndex,
          isDragging: false,
          isResizing: false,
          dragStartX: 0,
          dragStartY: 0
        }
        setWindows(prev => [...prev, newWindow])
        setNextZIndex(prev => prev + 1)
      }
      
      if (!taskbar.find(t => t.id === icon.id)) {
        setTaskbar(prev => [...prev, { ...icon, isOpen: true }])
      }
    }
  }

  const handleTaskbarClick = (icon: DesktopIcon) => {
    const window = windows.find(w => w.id === icon.id)
    if (window) {
      if (window.isMinimized) {
        // Restore window
        setWindows(prev => prev.map(w => 
          w.id === icon.id 
            ? { ...w, isMinimized: false, zIndex: nextZIndex }
            : w
        ))
        setNextZIndex(prev => prev + 1)
      } else {
        // Bring to front
        setWindows(prev => prev.map(w => 
          w.id === icon.id 
            ? { ...w, zIndex: nextZIndex }
            : w
        ))
        setNextZIndex(prev => prev + 1)
      }
    }
  }

  const closeWindow = (windowId: string) => {
    setWindows(prev => prev.filter(w => w.id !== windowId))
    setTaskbar(prev => prev.filter(t => t.id !== windowId))
  }

  const minimizeWindow = (windowId: string) => {
    setWindows(prev => prev.map(w => 
      w.id === windowId 
        ? { ...w, isMinimized: true }
        : w
    ))
  }

  const maximizeWindow = (windowId: string) => {
    setWindows(prev => prev.map(w => 
      w.id === windowId 
        ? { 
            ...w, 
            isMaximized: !w.isMaximized,
            ...(w.isMaximized ? {
              x: w.originalX,
              y: w.originalY,
              width: w.originalWidth,
              height: w.originalHeight
            } : {
              originalX: w.x,
              originalY: w.y,
              originalWidth: w.width,
              originalHeight: w.height,
              x: 0,
              y: 0,
              width: 800,
              height: 600
            })
          }
        : w
    ))
  }

  const startDrag = (e: React.MouseEvent, windowId: string) => {
    e.preventDefault()
    const window = windows.find(w => w.id === windowId)
    if (window && !window.isMaximized) {
      setWindows(prev => prev.map(w => 
        w.id === windowId 
          ? { 
              ...w, 
              isDragging: true,
              dragStartX: e.clientX - w.x,
              dragStartY: e.clientY - w.y
            }
          : w
      ))
    }
  }

  const handleDrag = (e: React.MouseEvent, windowId: string) => {
    const window = windows.find(w => w.id === windowId)
    if (window && window.isDragging && !window.isMaximized) {
      setWindows(prev => prev.map(w => 
        w.id === windowId 
          ? { 
              ...w, 
              x: Math.max(0, Math.min(e.clientX - w.dragStartX, 800 - w.width)),
              y: Math.max(0, Math.min(e.clientY - w.dragStartY, 600 - w.height))
            }
          : w
      ))
    }
  }

  const stopDrag = (windowId: string) => {
    setWindows(prev => prev.map(w => 
      w.id === windowId 
        ? { ...w, isDragging: false }
        : w
    ))
  }

  const startResize = (e: React.MouseEvent, windowId: string) => {
    e.preventDefault()
    e.stopPropagation()
    const window = windows.find(w => w.id === windowId)
    if (window && !window.isMaximized) {
      setWindows(prev => prev.map(w => 
        w.id === windowId 
          ? { 
              ...w, 
              isResizing: true,
              dragStartX: e.clientX,
              dragStartY: e.clientY
            }
          : w
      ))
    }
  }

  const handleResize = (e: React.MouseEvent, windowId: string) => {
    const window = windows.find(w => w.id === windowId)
    if (window && window.isResizing && !window.isMaximized) {
      const newWidth = Math.max(300, Math.min(800, window.width + (e.clientX - window.dragStartX)))
      const newHeight = Math.max(200, Math.min(600, window.height + (e.clientY - window.dragStartY)))
      
      setWindows(prev => prev.map(w => 
        w.id === windowId 
          ? { 
              ...w, 
              width: newWidth,
              height: newHeight,
              dragStartX: e.clientX,
              dragStartY: e.clientY
            }
          : w
      ))
    }
  }

  const stopResize = (windowId: string) => {
    setWindows(prev => prev.map(w => 
      w.id === windowId 
        ? { ...w, isResizing: false }
        : w
    ))
  }

  const bringToFront = (windowId: string) => {
    setWindows(prev => prev.map(w => 
      w.id === windowId 
        ? { ...w, zIndex: nextZIndex, isMinimized: false }
        : w
    ))
    setNextZIndex(prev => prev + 1)
  }

  const handleDesktopRightClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setShowContextMenu({ x: e.clientX, y: e.clientY })
    setSelectedIcon(null)
  }

  const handleIconRightClick = (e: React.MouseEvent, icon: DesktopIcon) => {
    e.preventDefault()
    e.stopPropagation()
    setSelectedIcon(icon.id)
    setShowContextMenu({ x: e.clientX, y: e.clientY })
  }

  const handleContextMenuAction = (action: string, iconId?: string) => {
    switch (action) {
      case 'refresh':
        // Refresh desktop
        break
      case 'properties':
        setShowProperties(iconId || 'desktop')
        break
      case 'new':
        // Create new folder/file
        break
      case 'arrange':
        // Arrange icons
        break
      case 'open':
        if (iconId) {
          const icon = icons.find(i => i.id === iconId)
          if (icon) handleIconClick(icon)
        }
        break
      case 'delete':
        if (iconId) {
          setIcons(prev => prev.filter(i => i.id !== iconId))
        }
        break
    }
    setShowContextMenu(null)
  }

  const handleStartMenuClick = () => {
    setShowStartMenu(!showStartMenu)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' })
  }

  return (
    <div 
      style={{
        background: 'linear-gradient(45deg, #008080 0%, #004040 100%)',
        minHeight: '700px',
        height: '700px',
        width: '100%',
        position: 'relative',
        border: '3px solid #ffffff',
        fontFamily: 'Courier New, monospace',
        color: '#ffffff',
        overflow: 'hidden',
        boxShadow: '4px 4px 8px rgba(0,0,0,0.3)'
      }}
      onContextMenu={handleDesktopRightClick}
      onClick={() => {
        setShowContextMenu(null)
        setSelectedIcon(null)
      }}
    >
      {/* Desktop Icons */}
      <div style={{ position: 'relative', height: '620px' }}>
        {icons.map((icon) => (
          <div
            key={icon.id}
            onClick={() => handleIconClick(icon)}
            onContextMenu={(e) => handleIconRightClick(e, icon)}
            onMouseDown={() => setSelectedIcon(icon.id)}
            onMouseUp={() => setSelectedIcon(null)}
            style={{
              position: 'absolute',
              left: icon.x,
              top: icon.y,
              width: '80px',
              height: '80px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              background: selectedIcon === icon.id ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
              border: selectedIcon === icon.id ? '1px dashed #ffffff' : '1px solid transparent',
              padding: '6px'
            }}
          >
            <div style={{ fontSize: '32px', marginBottom: '4px' }}>
              {icon.icon}
            </div>
            <div style={{
              fontSize: '12px',
              textAlign: 'center',
              color: '#ffffff',
              textShadow: '1px 1px 0 #000000',
              lineHeight: '1.2'
            }}>
              {icon.name}
            </div>
          </div>
        ))}
      </div>

      {/* Taskbar */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '40px',
        background: '#c0c0c0',
        border: '2px outset #c0c0c0',
        display: 'flex',
        alignItems: 'center',
        padding: '0 4px'
      }}>
        {/* Start Button */}
        <button
          onClick={handleStartMenuClick}
          style={{
            background: showStartMenu ? '#808080' : '#c0c0c0',
            border: '2px outset #c0c0c0',
            padding: '6px 16px',
            cursor: 'pointer',
            fontFamily: 'Courier New, monospace',
            fontSize: '14px',
            color: '#000000',
            fontWeight: 'bold'
          }}
        >
          Start
        </button>

        {/* Taskbar Programs */}
        <div style={{ display: 'flex', gap: '4px', marginLeft: '8px' }}>
          {taskbar.map((icon) => (
            <button
              key={icon.id}
              onClick={() => handleTaskbarClick(icon)}
              style={{
                background: '#c0c0c0',
                border: '2px outset #c0c0c0',
                padding: '6px 12px',
                cursor: 'pointer',
                fontFamily: 'Courier New, monospace',
                fontSize: '12px',
                color: '#000000',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span>{icon.icon}</span>
              <span>{icon.name}</span>
            </button>
          ))}
        </div>

        {/* System Tray */}
        <div style={{
          marginLeft: 'auto',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '0 8px'
        }}>
          <div style={{ fontSize: '14px', color: '#000000' }}>
            {formatDate(currentTime)}
          </div>
          <div style={{
            background: '#c0c0c0',
            border: '2px inset #c0c0c0',
            padding: '4px 12px',
            fontSize: '14px',
            color: '#000000',
            fontWeight: 'bold'
          }}>
            {formatTime(currentTime)}
          </div>
        </div>
      </div>

      {/* Start Menu */}
      {showStartMenu && (
        <div style={{
          position: 'absolute',
          bottom: '44px',
          left: '4px',
          width: '250px',
          background: '#c0c0c0',
          border: '2px outset #c0c0c0',
          zIndex: 1000
        }}>
          <div style={{
            padding: '6px',
            background: '#000080',
            color: '#ffffff',
            fontSize: '14px',
            fontWeight: 'bold'
          }}>
            Programs
          </div>
          <div style={{ padding: '4px' }}>
            {[
              { name: 'Accessories', icon: '📁' },
              { name: 'Games', icon: '🎮' },
              { name: 'Internet Tools', icon: '🌐' },
              { name: 'Multimedia', icon: '🎵' },
              { name: 'System Tools', icon: '⚙️' },
              { name: 'Office Suite', icon: '📊' },
              { name: 'Utilities', icon: '🔧' }
            ].map((item, index) => (
              <div
                key={index}
                style={{
                  padding: '4px 12px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  color: '#000000',
                  border: '1px solid transparent',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#000080'
                  e.currentTarget.style.color = '#ffffff'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = '#000000'
                }}
                onClick={() => {
                  if (item.name === 'System Tools') {
                    setShowTaskManager(true)
                    setShowStartMenu(false)
                  } else if (item.name === 'Utilities') {
                    setShowControlPanel(true)
                    setShowStartMenu(false)
                  }
                }}
              >
                <span>{item.icon}</span>
                {item.name}
              </div>
            ))}
          </div>
          
          <div style={{
            borderTop: '1px solid #808080',
            margin: '4px 0'
          }}></div>
          
          <div style={{
            padding: '6px',
            background: '#000080',
            color: '#ffffff',
            fontSize: '14px',
            fontWeight: 'bold'
          }}>
            Settings
          </div>
          <div style={{ padding: '4px' }}>
            {[
              { name: 'Control Panel', icon: '⚙️', action: () => setShowControlPanel(true) },
              { name: 'Task Manager', icon: '📊', action: () => setShowTaskManager(true) },
              { name: 'Display Properties', icon: '🖥️', action: () => setShowProperties('desktop') },
              { name: 'System Properties', icon: '💻', action: () => setShowProperties('system') }
            ].map((item, index) => (
              <div
                key={index}
                style={{
                  padding: '4px 12px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  color: '#000000',
                  border: '1px solid transparent',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#000080'
                  e.currentTarget.style.color = '#ffffff'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = '#000000'
                }}
                onClick={() => {
                  item.action()
                  setShowStartMenu(false)
                }}
              >
                <span>{item.icon}</span>
                {item.name}
              </div>
            ))}
          </div>
          
          <div style={{
            borderTop: '1px solid #808080',
            margin: '4px 0'
          }}></div>
          
          <div style={{
            padding: '6px',
            background: '#000080',
            color: '#ffffff',
            fontSize: '14px',
            fontWeight: 'bold'
          }}>
            Shutdown
          </div>
          <div style={{ padding: '4px' }}>
            <div
              style={{
                padding: '4px 12px',
                cursor: 'pointer',
                fontSize: '12px',
                color: '#000000',
                border: '1px solid transparent',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#ff0000'
                e.currentTarget.style.color = '#ffffff'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = '#000000'
              }}
              onClick={() => {
                if (confirm('Are you sure you want to shut down?')) {
                  alert('System shutdown initiated... Just kidding! This is a web app! 😄')
                }
                setShowStartMenu(false)
              }}
            >
              <span>🔌</span>
              Shutdown
            </div>
          </div>
          <div style={{
            padding: '6px',
            background: '#000080',
            color: '#ffffff',
            fontSize: '14px',
            fontWeight: 'bold',
            borderTop: '1px solid #808080'
          }}>
            Documents
          </div>
          <div style={{
            padding: '6px',
            background: '#000080',
            color: '#ffffff',
            fontSize: '14px',
            fontWeight: 'bold'
          }}>
            Settings
          </div>
          <div style={{
            padding: '6px',
            background: '#000080',
            color: '#ffffff',
            fontSize: '14px',
            fontWeight: 'bold'
          }}>
            Find
          </div>
          <div style={{
            padding: '6px',
            background: '#000080',
            color: '#ffffff',
            fontSize: '14px',
            fontWeight: 'bold'
          }}>
            Help
          </div>
          <div style={{
            padding: '6px',
            background: '#000080',
            color: '#ffffff',
            fontSize: '14px',
            fontWeight: 'bold'
          }}>
            Run...
          </div>
          <div style={{
            padding: '6px',
            background: '#000080',
            color: '#ffffff',
            fontSize: '14px',
            fontWeight: 'bold',
            borderTop: '1px solid #808080'
          }}>
            Shut Down...
          </div>
        </div>
      )}

      {/* Windows */}
      {windows.filter(w => !w.isMinimized).map((window) => (
        <div
          key={window.id}
          style={{
            position: 'absolute',
            left: window.x,
            top: window.y,
            width: window.width,
            height: window.height,
            zIndex: window.zIndex,
            background: '#c0c0c0',
            border: '2px outset #c0c0c0',
            display: 'flex',
            flexDirection: 'column'
          }}
          onClick={() => bringToFront(window.id)}
        >
          {/* Window Title Bar */}
          <div 
            style={{
              background: '#000080',
              color: 'white',
              padding: '4px 8px',
              fontSize: '14px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: window.isMaximized ? 'default' : 'move',
              userSelect: 'none'
            }}
            onMouseDown={(e) => startDrag(e, window.id)}
          >
            <span>{window.title}</span>
            <div style={{ display: 'flex', gap: '2px' }}>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  minimizeWindow(window.id)
                }}
                style={{
                  background: 'linear-gradient(180deg, #ffffff 0%, #c0c0c0 100%)',
                  border: '2px outset #c0c0c0',
                  width: '24px',
                  height: '22px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  color: '#000000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'inset 1px 1px 2px rgba(255,255,255,0.5)'
                }}
                title="Minimize Window"
              >
                _
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  maximizeWindow(window.id)
                }}
                style={{
                  background: 'linear-gradient(180deg, #ffffff 0%, #c0c0c0 100%)',
                  border: '2px outset #c0c0c0',
                  width: '24px',
                  height: '22px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  color: '#000000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'inset 1px 1px 2px rgba(255,255,255,0.5)'
                }}
                title="Maximize Window"
              >
                □
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  closeWindow(window.id)
                }}
                style={{
                  background: 'linear-gradient(180deg, #ffffff 0%, #c0c0c0 100%)',
                  border: '2px outset #c0c0c0',
                  width: '24px',
                  height: '22px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  color: '#000000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'inset 1px 1px 2px rgba(255,255,255,0.5)'
                }}
                title="Close Window"
              >
                ×
              </button>
            </div>
          </div>
          
          {/* Window Content */}
          <div style={{ 
            flex: 1, 
            overflow: 'hidden',
            background: '#ffffff'
          }}>
            {window.content}
          </div>
          
          {/* Resize Handle */}
          {!window.isMaximized && (
            <div
              style={{
                position: 'absolute',
                bottom: '0',
                right: '0',
                width: '12px',
                height: '12px',
                background: '#c0c0c0',
                border: '1px outset #c0c0c0',
                cursor: 'nw-resize'
              }}
              onMouseDown={(e) => startResize(e, window.id)}
              title="Resize Window"
            />
          )}
        </div>
      ))}

      {/* Task Manager */}
      {showTaskManager && (
        <div style={{
          position: 'absolute',
          top: '100px',
          left: '100px',
          width: '500px',
          height: '400px',
          background: '#c0c0c0',
          border: '2px outset #c0c0c0',
          zIndex: 2000,
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{
            background: '#000080',
            color: 'white',
            padding: '4px 8px',
            fontSize: '14px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span>Task Manager</span>
            <button
              onClick={() => setShowTaskManager(false)}
              style={{
                background: 'linear-gradient(180deg, #ffffff 0%, #c0c0c0 100%)',
                border: '2px outset #c0c0c0',
                width: '24px',
                height: '22px',
                fontSize: '14px',
                cursor: 'pointer',
                fontWeight: 'bold',
                color: '#000000'
              }}
            >
              ×
            </button>
          </div>
          <div style={{ padding: '16px', flex: 1 }}>
            <h3 style={{ fontSize: '16px', marginBottom: '16px', color: '#000000' }}>Running Processes</h3>
            <div style={{ 
              background: '#ffffff', 
              border: '2px inset #c0c0c0', 
              padding: '8px',
              height: '250px',
              overflow: 'auto'
            }}>
              {windows.map(window => (
                <div key={window.id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '4px 8px',
                  borderBottom: '1px solid #c0c0c0',
                  fontSize: '12px'
                }}>
                  <span>{window.title}</span>
                  <span style={{ color: '#008000' }}>
                    {window.isMinimized ? 'Minimized' : 'Running'}
                  </span>
                </div>
              ))}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '4px 8px',
                borderBottom: '1px solid #c0c0c0',
                fontSize: '12px'
              }}>
                <span>System Idle Process</span>
                <span style={{ color: '#008000' }}>99% CPU</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '4px 8px',
                borderBottom: '1px solid #c0c0c0',
                fontSize: '12px'
              }}>
                <span>Windows Explorer</span>
                <span style={{ color: '#008000' }}>5% CPU</span>
              </div>
            </div>
            <div style={{ marginTop: '16px', textAlign: 'center' }}>
              <button
                onClick={() => setShowTaskManager(false)}
                style={{
                  background: 'linear-gradient(180deg, #ffffff 0%, #c0c0c0 100%)',
                  border: '2px outset #c0c0c0',
                  padding: '4px 16px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Control Panel */}
      {showControlPanel && (
        <div style={{
          position: 'absolute',
          top: '50px',
          left: '50px',
          width: '600px',
          height: '500px',
          background: '#c0c0c0',
          border: '2px outset #c0c0c0',
          zIndex: 2000,
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{
            background: '#000080',
            color: 'white',
            padding: '4px 8px',
            fontSize: '14px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span>Control Panel</span>
            <button
              onClick={() => setShowControlPanel(false)}
              style={{
                background: 'linear-gradient(180deg, #ffffff 0%, #c0c0c0 100%)',
                border: '2px outset #c0c0c0',
                width: '24px',
                height: '22px',
                fontSize: '14px',
                cursor: 'pointer',
                fontWeight: 'bold',
                color: '#000000'
              }}
            >
              ×
            </button>
          </div>
          <div style={{ padding: '16px', flex: 1 }}>
            <h3 style={{ fontSize: '16px', marginBottom: '16px', color: '#000000' }}>System Settings</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{
                background: '#ffffff',
                border: '2px inset #c0c0c0',
                padding: '12px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>🖥️</div>
                <div style={{ fontSize: '12px', marginBottom: '8px' }}>Display</div>
                <button style={{
                  background: 'linear-gradient(180deg, #ffffff 0%, #c0c0c0 100%)',
                  border: '2px outset #c0c0c0',
                  padding: '2px 8px',
                  cursor: 'pointer',
                  fontSize: '10px'
                }}>
                  Settings
                </button>
              </div>
              <div style={{
                background: '#ffffff',
                border: '2px inset #c0c0c0',
                padding: '12px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>🔊</div>
                <div style={{ fontSize: '12px', marginBottom: '8px' }}>Sounds</div>
                <button style={{
                  background: 'linear-gradient(180deg, #ffffff 0%, #c0c0c0 100%)',
                  border: '2px outset #c0c0c0',
                  padding: '2px 8px',
                  cursor: 'pointer',
                  fontSize: '10px'
                }}>
                  Settings
                </button>
              </div>
              <div style={{
                background: '#ffffff',
                border: '2px inset #c0c0c0',
                padding: '12px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>🕒</div>
                <div style={{ fontSize: '12px', marginBottom: '8px' }}>Date/Time</div>
                <button style={{
                  background: 'linear-gradient(180deg, #ffffff 0%, #c0c0c0 100%)',
                  border: '2px outset #c0c0c0',
                  padding: '2px 8px',
                  cursor: 'pointer',
                  fontSize: '10px'
                }}>
                  Settings
                </button>
              </div>
              <div style={{
                background: '#ffffff',
                border: '2px inset #c0c0c0',
                padding: '12px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>🖱️</div>
                <div style={{ fontSize: '12px', marginBottom: '8px' }}>Mouse</div>
                <button style={{
                  background: 'linear-gradient(180deg, #ffffff 0%, #c0c0c0 100%)',
                  border: '2px outset #c0c0c0',
                  padding: '2px 8px',
                  cursor: 'pointer',
                  fontSize: '10px'
                }}>
                  Settings
                </button>
              </div>
            </div>
            <div style={{ marginTop: '16px', textAlign: 'center' }}>
              <button
                onClick={() => setShowControlPanel(false)}
                style={{
                  background: 'linear-gradient(180deg, #ffffff 0%, #c0c0c0 100%)',
                  border: '2px outset #c0c0c0',
                  padding: '4px 16px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Context Menu */}
      {showContextMenu && (
        <div
          style={{
            position: 'fixed',
            left: showContextMenu.x,
            top: showContextMenu.y,
            background: '#c0c0c0',
            border: '2px outset #c0c0c0',
            zIndex: 10000,
            minWidth: '150px'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {selectedIcon ? (
            // Icon context menu
            <>
              <div style={{ padding: '4px 8px', fontSize: '12px', color: '#000000', cursor: 'pointer' }}
                   onClick={() => handleContextMenuAction('open', selectedIcon)}>
                Open
              </div>
              <div style={{ padding: '4px 8px', fontSize: '12px', color: '#000000', cursor: 'pointer' }}
                   onClick={() => handleContextMenuAction('properties', selectedIcon)}>
                Properties
              </div>
              <div style={{ borderTop: '1px solid #808080' }}></div>
              <div style={{ padding: '4px 8px', fontSize: '12px', color: '#000000', cursor: 'pointer' }}
                   onClick={() => handleContextMenuAction('delete', selectedIcon)}>
                Delete
              </div>
            </>
          ) : (
            // Desktop context menu
            <>
              <div style={{ padding: '4px 8px', fontSize: '12px', color: '#000000', cursor: 'pointer' }}
                   onClick={() => handleContextMenuAction('refresh')}>
                Refresh
              </div>
              <div style={{ borderTop: '1px solid #808080' }}></div>
              <div style={{ padding: '4px 8px', fontSize: '12px', color: '#000000', cursor: 'pointer' }}
                   onClick={() => handleContextMenuAction('new')}>
                New
              </div>
              <div style={{ padding: '4px 8px', fontSize: '12px', color: '#000000', cursor: 'pointer' }}
                   onClick={() => handleContextMenuAction('arrange')}>
                Arrange Icons
              </div>
              <div style={{ borderTop: '1px solid #808080' }}></div>
              <div style={{ padding: '4px 8px', fontSize: '12px', color: '#000000', cursor: 'pointer' }}
                   onClick={() => handleContextMenuAction('properties', 'desktop')}>
                Properties
              </div>
            </>
          )}
        </div>
      )}

      {/* Properties Window */}
      {showProperties && (
        <div style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '300px',
          height: '200px',
          background: '#c0c0c0',
          border: '2px outset #c0c0c0',
          zIndex: 10000,
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{ background: '#000080', color: 'white', padding: '4px', fontSize: '12px' }}>
            Properties
          </div>
          <div style={{ padding: '12px', flex: 1, fontSize: '12px', color: '#000000' }}>
            <div style={{ marginBottom: '8px' }}>
              <strong>{showProperties === 'desktop' ? 'Desktop Properties' : 'Icon Properties'}</strong>
            </div>
            <div style={{ marginBottom: '4px' }}>Type: {showProperties === 'desktop' ? 'Desktop' : 'Application'}</div>
            <div style={{ marginBottom: '4px' }}>Size: {showProperties === 'desktop' ? '1.2GB' : '2.5MB'}</div>
            <div style={{ marginBottom: '4px' }}>Created: 06/19/93 6:00a</div>
            <div style={{ marginBottom: '4px' }}>Modified: 06/19/93 6:00a</div>
          </div>
          <div style={{ padding: '8px', textAlign: 'right' }}>
            <button 
              style={{ background: '#c0c0c0', border: '2px outset #c0c0c0', padding: '4px 12px', fontSize: '12px' }}
              onClick={() => setShowProperties(null)}
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Desktop Info */}
      <div style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        background: 'rgba(0, 0, 0, 0.7)',
        padding: '12px',
        fontSize: '14px',
        border: '1px solid #ffffff'
      }}>
        <div style={{ fontWeight: 'bold', marginBottom: '6px' }}>
          Windows 95 Desktop
        </div>
        <div>Icons: {icons.length}</div>
        <div>Open Programs: {taskbar.length}</div>
        <div>Open Windows: {windows.filter(w => !w.isMinimized).length}</div>
        <div>Memory: 32MB RAM</div>
        <div>CPU: Pentium 133MHz</div>
      </div>
    </div>
  )
}
