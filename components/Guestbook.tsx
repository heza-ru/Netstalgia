'use client'

import { useState, useEffect } from 'react'

interface GuestEntry {
  id: string
  name: string
  message: string
  timestamp: string
}

const STORAGE_KEY = 'netstalgia-guestbook'

export default function Guestbook() {
  const [entries, setEntries] = useState<GuestEntry[]>([])
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!name.trim() || !message.trim()) return

    const newEntry: GuestEntry = {
      id: Date.now().toString(),
      name: name.trim(),
      message: message.trim(),
      timestamp: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: '2-digit'
      })
    }

    saveEntries([newEntry, ...entries])
    setName('')
    setMessage('')
  }

  return (
    <div className="pixelated-window" style={{imageRendering: 'pixelated'}}>
      <h2 className="font-normal text-web-purple center mb-3 pixelated-title">
        * SIGN MY GUESTBOOK! *
      </h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-2">
          <label className="font-small text-web-blue">
            YOUR NAME:
          </label>
          <br />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="retro-input"
            style={{width: '100%'}}
            maxLength={25}
            placeholder="Enter name..."
          />
        </div>
        
        <div className="mb-2">
          <label className="font-small text-web-blue">
            MESSAGE:
          </label>
          <br />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="retro-input"
            style={{width: '100%', resize: 'none'}}
            rows={3}
            maxLength={150}
            placeholder="Leave a message..."
          />
        </div>
        
        <button 
          type="submit" 
          className="win95-button"
          style={{width: '100%'}}
          disabled={!name.trim() || !message.trim()}
        >
          SIGN GUESTBOOK
        </button>
      </form>

      {/* Entries */}
      <div style={{maxHeight: '200px', overflowY: 'auto'}}>
        {entries.length === 0 ? (
          <div className="center font-small text-web-red">
            BE THE FIRST TO SIGN!
          </div>
        ) : (
          entries.map((entry) => (
            <div key={entry.id} className="guestbook-entry">
              <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '4px'}}>
                <div className="font-small" style={{fontWeight: 'bold', color: '#000080'}}>
                  {entry.name}
                </div>
                <div className="font-small text-web-gray">
                  {entry.timestamp}
                </div>
              </div>
              <div className="font-small" style={{wordWrap: 'break-word'}}>
                {entry.message}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="center font-small text-web-red mt-3">
        <div className="blink">THANKS FOR VISITING! 🎉</div>
      </div>
    </div>
  )
} 