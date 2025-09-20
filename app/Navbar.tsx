'use client'

import { useRouter } from 'next/navigation'

const NAV_LINKS = [
  { label: 'HOME', page: 'home' },
  { label: 'DOWNLOADS', page: 'downloads' },
  { label: 'DESKTOP', page: 'desktop' },
  { label: 'BBS', page: 'bbs' },
  { label: 'ABOUT', page: 'about' },
  { label: 'GUESTBOOK', page: 'guestbook' }
]

export default function Navbar({ currentPage, setCurrentPage }: { currentPage: string, setCurrentPage: (page: string) => void }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: '8px 10px',
      background: 'linear-gradient(180deg, #cdc7bb 0%, #ecece0 50%, #cdc7bb 100%)',
      border: '3px outset #cdc7bb',
      marginBottom: '12px',
      boxShadow: 'inset 1px 1px 2px rgba(255,255,255,0.5), 1px 1px 2px rgba(0,0,0,0.2)',
      borderRadius: '6px',
      gap: '4px',
      flexWrap: 'wrap',
      overflowX: 'auto'
    }}>
      {/* 90s-style navigation with icons and text */}
      {NAV_LINKS.map(link => (
        <div key={link.page} style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          cursor: 'pointer',
          padding: '8px 6px',
          border: currentPage === link.page ? '2px outset #ffff00' : '2px outset #cdc7bb',
          background: currentPage === link.page ?
            'linear-gradient(45deg, #ffff00 0%, #ffcc00 50%, #ffff00 100%)' :
            'linear-gradient(45deg, #ecece0 0%, #cdc7bb 50%, #ecece0 100%)',
          borderRadius: '4px',
          minWidth: '60px',
          maxWidth: '80px',
          boxShadow: currentPage === link.page ?
            'inset 1px 1px 2px rgba(0,0,0,0.3), 2px 2px 4px rgba(0,0,0,0.2)' :
            'inset 1px 1px 2px rgba(255,255,255,0.5), 1px 1px 2px rgba(0,0,0,0.2)',
          transition: 'all 0.2s ease',
          transform: currentPage === link.page ? 'scale(1.05)' : 'scale(1)',
          flex: '1 1 auto'
        }}
          onClick={() => setCurrentPage(link.page)}
        >
          {/* Icon */}
          <div style={{
            width: '20px',
            height: '20px',
            background: currentPage === link.page ?
              'linear-gradient(45deg, #ff6600 0%, #ffff00 50%, #ff6600 100%)' :
              'linear-gradient(45deg, #cdc7bb 0%, #ecece0 50%, #cdc7bb 100%)',
            border: '1px outset #cdc7bb',
            borderRadius: '3px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '10px',
            fontWeight: 'bold',
            color: currentPage === link.page ? '#000080' : '#896b4f',
            textShadow: currentPage === link.page ? '1px 1px 2px rgba(255,255,255,0.8)' : '1px 1px 1px rgba(0,0,0,0.3)',
            flexShrink: 0
          }}>
            {link.page === 'home' && '🏠'}
            {link.page === 'downloads' && '💾'}
            {link.page === 'desktop' && '🖥️'}
            {link.page === 'bbs' && '📡'}
            {link.page === 'guestbook' && '📝'}
            {link.page === 'about' && 'ℹ️'}
          </div>
          {/* Text */}
          <div style={{
            fontSize: '9px',
            fontWeight: 'bold',
            fontFamily: 'MS Sans Serif, Arial, sans-serif',
            color: currentPage === link.page ? '#000080' : '#000000',
            textAlign: 'center',
            textShadow: currentPage === link.page ? '1px 1px 1px #ff0000' : 'none',
            letterSpacing: '0.3px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '100%'
          }}>
            {link.label}
          </div>
        </div>
      ))}
    </div>
  )
} 