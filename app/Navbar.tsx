'use client'

import { useRouter } from 'next/navigation'

const NAV_LINKS = [
  { label: 'HOME', page: 'home' },
  { label: 'DOWNLOADS', page: 'downloads' },
  { label: 'WEB TOYS', page: 'webtoys' },
  { label: 'ABOUT', page: 'about' },
  { label: 'GUESTBOOK', page: 'guestbook' }
]

export default function Navbar({ currentPage, setCurrentPage }: { currentPage: string, setCurrentPage: (page: string) => void }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '8px 16px',
      background: 'linear-gradient(180deg, #cdc7bb 0%, #ecece0 50%, #cdc7bb 100%)',
      border: '3px outset #cdc7bb',
      marginBottom: '12px',
      boxShadow: 'inset 1px 1px 2px rgba(255,255,255,0.5), 1px 1px 2px rgba(0,0,0,0.2)',
      borderRadius: '4px'
    }}>
      {/* 90s-style navigation with icons and text */}
      {NAV_LINKS.map(link => (
        <div key={link.page} style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
          padding: '8px 12px',
          border: currentPage === link.page ? '3px outset #ffff00' : '2px outset #cdc7bb',
          background: currentPage === link.page ? '#ffff00' : 'linear-gradient(45deg, #ecece0 0%, #cdc7bb 50%, #ecece0 100%)',
          borderRadius: '4px',
          minWidth: '120px',
          boxShadow: currentPage === link.page ? 'inset 1px 1px 2px rgba(0,0,0,0.3), 2px 2px 4px rgba(0,0,0,0.2)' : 'inset 1px 1px 2px rgba(255,255,255,0.5), 1px 1px 2px rgba(0,0,0,0.2)'
        }}
        onClick={() => setCurrentPage(link.page)}
        >
          {/* Icon */}
          <div style={{
            width: '24px',
            height: '24px',
            background: currentPage === link.page ? 
              'linear-gradient(45deg, #ff6600 0%, #ffff00 50%, #ff6600 100%)' :
              'linear-gradient(45deg, #cdc7bb 0%, #ecece0 50%, #cdc7bb 100%)',
            border: '2px outset #cdc7bb',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            fontWeight: 'bold',
            color: currentPage === link.page ? '#000080' : '#896b4f',
            textShadow: currentPage === link.page ? '1px 1px 2px rgba(255,255,255,0.8)' : '1px 1px 1px rgba(0,0,0,0.3)',
            flexShrink: 0
          }}>
            {link.page === 'home' && '🏠'}
            {link.page === 'downloads' && '💾'}
            {link.page === 'webtoys' && '🎮'}
            {link.page === 'guestbook' && '📝'}
            {link.page === 'about' && 'ℹ️'}
          </div>
          {/* Text */}
          <div style={{
            fontSize: '11px',
            fontWeight: 'bold',
            fontFamily: 'Courier New, monospace',
            color: currentPage === link.page ? '#000080' : '#000000',
            textAlign: 'left',
            textShadow: currentPage === link.page ? '1px 1px 2px #ff0000' : 'none',
            letterSpacing: '0.5px',
            whiteSpace: 'nowrap'
          }}>
            {link.label}
          </div>
        </div>
      ))}
    </div>
  )
} 