'use client'

import { useState, useEffect } from 'react'

interface WebRingProps {
  className?: string
}

interface WebSite {
  name: string
  url: string
  description: string
  category: string
  established: string
  hits: number
  isActive: boolean
}

export default function WebRing({ className = '' }: WebRingProps) {
  const [memberCount] = useState(Math.floor(Math.random() * 500) + 100)
  const [currentSite, setCurrentSite] = useState(Math.floor(Math.random() * 100) + 1)
  const [selectedSite, setSelectedSite] = useState<WebSite | null>(null)
  const [showDropdown, setShowDropdown] = useState(false)
  const [showSiteInfo, setShowSiteInfo] = useState(false)
  const [ringStats, setRingStats] = useState({
    totalHits: 0,
    activeMembers: 0,
    newToday: 0
  })

  // Comprehensive database of authentic 90s websites and references
  const authenticSites: WebSite[] = [
    // Search Engines & Portals
    { name: 'Yahoo! Directory', url: 'http://www.yahoo.com', description: 'The Ultimate Web Directory!', category: 'Search', established: '1994', hits: 15420, isActive: true },
    { name: 'AltaVista Search', url: 'http://www.altavista.com', description: 'The Most Powerful Search Engine!', category: 'Search', established: '1995', hits: 12350, isActive: true },
    { name: 'Lycos Spider Search', url: 'http://www.lycos.com', description: 'Fetch the Web!', category: 'Search', established: '1994', hits: 9870, isActive: true },
    { name: 'Excite Web Search', url: 'http://www.excite.com', description: 'Get Excited About the Web!', category: 'Search', established: '1995', hits: 8640, isActive: true },
    { name: 'WebCrawler', url: 'http://www.webcrawler.com', description: 'Crawling the Web Since 1994!', category: 'Search', established: '1994', hits: 7230, isActive: true },
    { name: 'HotBot Search', url: 'http://www.hotbot.com', description: 'The Hottest Search on the Net!', category: 'Search', established: '1996', hits: 6540, isActive: true },

    // Free Hosting Services
    { name: 'GeoCities Neighborhood', url: 'http://www.geocities.com', description: 'Build Your Own Homepage!', category: 'Hosting', established: '1995', hits: 25680, isActive: true },
    { name: 'Angelfire Community', url: 'http://www.angelfire.com', description: 'Free Web Pages for Everyone!', category: 'Hosting', established: '1996', hits: 18920, isActive: true },
    { name: 'Tripod Homepage', url: 'http://www.tripod.com', description: 'Your Place on the Web!', category: 'Hosting', established: '1995', hits: 14750, isActive: true },
    { name: 'Xoom.com', url: 'http://www.xoom.com', description: 'Free Web Space & Email!', category: 'Hosting', established: '1996', hits: 11230, isActive: true },
    { name: 'FortuneCity', url: 'http://www.fortunecity.com', description: 'Build Your Fortune Online!', category: 'Hosting', established: '1997', hits: 8960, isActive: true },

    // Online Services
    { name: 'America Online', url: 'http://www.aol.com', description: 'You\'ve Got Mail!', category: 'Service', established: '1991', hits: 45230, isActive: true },
    { name: 'CompuServe Classic', url: 'http://www.compuserve.com', description: 'The Original Online Service!', category: 'Service', established: '1979', hits: 32140, isActive: true },
    { name: 'Prodigy Internet', url: 'http://www.prodigy.com', description: 'Bringing Families Online!', category: 'Service', established: '1988', hits: 28750, isActive: true },
    { name: 'MSN Network', url: 'http://www.msn.com', description: 'Microsoft Network Portal!', category: 'Service', established: '1995', hits: 22340, isActive: true },
    { name: 'WebTV Network', url: 'http://www.webtv.net', description: 'Internet on Your TV!', category: 'Service', established: '1996', hits: 15680, isActive: true },

    // Entertainment & Media
    { name: 'MTV Online', url: 'http://www.mtv.com', description: 'Music Television on the Web!', category: 'Entertainment', established: '1995', hits: 35420, isActive: true },
    { name: 'CNN Interactive', url: 'http://www.cnn.com', description: 'Breaking News Online!', category: 'News', established: '1995', hits: 42150, isActive: true },
    { name: 'ESPN SportsZone', url: 'http://espn.sportszone.com', description: 'The Ultimate Sports Site!', category: 'Sports', established: '1995', hits: 28960, isActive: true },
    { name: 'Disney Online', url: 'http://www.disney.com', description: 'The Magic Kingdom Online!', category: 'Entertainment', established: '1996', hits: 31240, isActive: true },
    { name: 'Warner Bros. Online', url: 'http://www.warnerbros.com', description: 'Hollywood Comes to the Web!', category: 'Entertainment', established: '1996', hits: 19870, isActive: true },

    // Technology & Software
    { name: 'Netscape Communications', url: 'http://home.netscape.com', description: 'The Web Browser Company!', category: 'Technology', established: '1994', hits: 38750, isActive: true },
    { name: 'Microsoft Corporation', url: 'http://www.microsoft.com', description: 'Where Do You Want to Go Today?', category: 'Technology', established: '1995', hits: 41230, isActive: true },
    { name: 'Apple Computer', url: 'http://www.apple.com', description: 'Think Different!', category: 'Technology', established: '1996', hits: 24680, isActive: true },
    { name: 'Sun Microsystems', url: 'http://www.sun.com', description: 'The Network is the Computer!', category: 'Technology', established: '1995', hits: 18540, isActive: true },

    // Gaming & Fun
    { name: 'id Software', url: 'http://www.idsoftware.com', description: 'Makers of DOOM and Quake!', category: 'Gaming', established: '1996', hits: 22340, isActive: true },
    { name: 'Nintendo Power', url: 'http://www.nintendo.com', description: 'Now You\'re Playing with Power!', category: 'Gaming', established: '1996', hits: 26780, isActive: true },
    { name: 'Sega of America', url: 'http://www.sega.com', description: 'Genesis Does What Nintendon\'t!', category: 'Gaming', established: '1996', hits: 19650, isActive: true },
    { name: 'The Palace', url: 'http://www.thepalace.com', description: 'Avatar Chat Rooms!', category: 'Social', established: '1995', hits: 15420, isActive: true },

    // Personal & Community Sites
    { name: 'Jenny\'s Awesome Homepage', url: 'http://geocities.com/jenny90s', description: 'My Life in the 90s!', category: 'Personal', established: '1997', hits: 1250, isActive: true },
    { name: 'Mike\'s Radical Web Page', url: 'http://angelfire.com/mikeradical', description: 'Totally Tubular Site!', category: 'Personal', established: '1998', hits: 890, isActive: true },
    { name: 'Sarah\'s Cool Corner', url: 'http://tripod.com/sarahcool', description: 'The Coolest Site Ever!', category: 'Personal', established: '1997', hits: 1420, isActive: true },
    { name: 'Dave\'s Gaming Paradise', url: 'http://geocities.com/davegames', description: 'All About Video Games!', category: 'Gaming', established: '1998', hits: 2340, isActive: true },
    { name: 'Lisa\'s Music Mania', url: 'http://angelfire.com/lisamusic', description: 'The Best Music on the Web!', category: 'Music', established: '1997', hits: 1680, isActive: true },

    // Defunct/Inactive Sites (for authenticity)
    { name: 'Pathfinder (Time Warner)', url: 'http://www.pathfinder.com', description: 'The Web\'s Premier Destination!', category: 'Portal', established: '1994', hits: 15420, isActive: false },
    { name: 'Pointcast Network', url: 'http://www.pointcast.com', description: 'Push Technology Revolution!', category: 'News', established: '1996', hits: 8750, isActive: false },
    { name: 'Magellan Internet Guide', url: 'http://www.mckinley.com', description: 'Your Guide to the Internet!', category: 'Directory', established: '1995', hits: 6540, isActive: false }
  ]

  useEffect(() => {
    // Initialize ring statistics
    const activeMembers = authenticSites.filter(site => site.isActive).length
    const totalHits = authenticSites.reduce((sum, site) => sum + site.hits, 0)
    const newToday = Math.floor(Math.random() * 5) + 1

    setRingStats({
      totalHits,
      activeMembers,
      newToday
    })

    // Set initial selected site
    const activeSites = authenticSites.filter(site => site.isActive)
    const randomSite = activeSites[Math.floor(Math.random() * activeSites.length)]
    setSelectedSite(randomSite)
  }, [])

  const handleNavigation = (direction: 'prev' | 'next' | 'random') => {
    const activeSites = authenticSites.filter(site => site.isActive)
    let newSite: WebSite

    if (direction === 'random') {
      newSite = activeSites[Math.floor(Math.random() * activeSites.length)]
    } else {
      const currentIndex = selectedSite ? activeSites.findIndex(site => site.name === selectedSite.name) : 0
      let newIndex: number

      if (direction === 'next') {
        newIndex = (currentIndex + 1) % activeSites.length
      } else {
        newIndex = currentIndex === 0 ? activeSites.length - 1 : currentIndex - 1
      }

      newSite = activeSites[newIndex]
    }

    setSelectedSite(newSite)
    setCurrentSite(Math.floor(Math.random() * memberCount) + 1)

    // Play navigation sound
    playNavigationSound()

    // Trigger easter egg occasionally (25% chance)
    if (Math.random() < 0.25) {
      const easterEggs = ['snake-game', 'cursor-trail', 'starfield-effect']
      const randomEasterEgg = easterEggs[Math.floor(Math.random() * easterEggs.length)]

      const event = new CustomEvent('triggerEasterEgg', {
        detail: { type: randomEasterEgg, source: 'web-ring' }
      })
      window.dispatchEvent(event)
    }
  }

  const playNavigationSound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.frequency.setValueAtTime(600, audioContext.currentTime)
      oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.1)

      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.1)
    } catch (error) {
      console.log('🔊 *BEEP* Web ring navigation!')
    }
  }

  const handleSiteSelect = (site: WebSite) => {
    setSelectedSite(site)
    setShowDropdown(false)
    playNavigationSound()
  }

  const getRandomFamousSite = () => {
    const famousSites = authenticSites.filter(site =>
      ['Search', 'Service', 'Technology', 'Entertainment'].includes(site.category) && site.isActive
    )
    return famousSites[Math.floor(Math.random() * famousSites.length)]
  }

  return (
    <div className={`web-ring ${className}`} style={{
      border: '3px outset #cdc7bb',
      padding: '12px',
      background: '#ecece0',
      textAlign: 'center',
      marginBottom: '12px',
      imageRendering: 'pixelated'
    }}>
      {/* Enhanced Web Ring Header */}
      <div style={{
        background: 'linear-gradient(90deg, #000080, #0000ff, #000080)',
        color: '#ffffff',
        padding: '4px 8px',
        margin: '-12px -12px 8px -12px',
        fontSize: '11px',
        fontWeight: 'bold',
        textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
      }}>
        🌐 AUTHENTIC 90s WEB RING 🌐
      </div>

      {/* Current Site Display */}
      {selectedSite && (
        <div style={{
          background: '#ffffff',
          border: '2px inset #cdc7bb',
          padding: '6px',
          margin: '8px 0',
          fontSize: '9px',
          textAlign: 'left'
        }}>
          <div style={{ fontWeight: 'bold', color: '#000080', marginBottom: '2px' }}>
            📍 NOW VIEWING:
          </div>
          <div style={{ color: '#008000', fontWeight: 'bold' }}>
            {selectedSite.name}
          </div>
          <div style={{ color: '#000000', fontSize: '8px' }}>
            {selectedSite.description}
          </div>
          <div style={{ color: '#808080', fontSize: '7px', marginTop: '2px' }}>
            Category: {selectedSite.category} | Est. {selectedSite.established} | Hits: {selectedSite.hits.toLocaleString()}
          </div>
        </div>
      )}

      {/* Enhanced Navigation Buttons */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '4px',
        marginBottom: '8px',
        flexWrap: 'wrap'
      }}>
        <button
          onClick={() => handleNavigation('prev')}
          className="win95-button"
          style={{
            fontSize: '9px',
            padding: '3px 8px',
            minWidth: '50px'
          }}
        >
          ⬅️ PREV
        </button>

        <button
          onClick={() => handleNavigation('random')}
          className="win95-button"
          style={{
            fontSize: '9px',
            padding: '3px 8px',
            minWidth: '60px',
            background: '#ffff00',
            color: '#000000'
          }}
        >
          🎲 RANDOM
        </button>

        <button
          onClick={() => handleNavigation('next')}
          className="win95-button"
          style={{
            fontSize: '9px',
            padding: '3px 8px',
            minWidth: '50px'
          }}
        >
          NEXT ➡️
        </button>
      </div>

      {/* Famous Sites Dropdown */}
      <div style={{ position: 'relative', marginBottom: '8px' }}>
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="win95-button"
          style={{
            fontSize: '8px',
            padding: '2px 6px',
            background: '#00ff00',
            color: '#000000'
          }}
        >
          🌟 FAMOUS SITES ▼
        </button>

        {showDropdown && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#ffffff',
            border: '2px outset #cdc7bb',
            zIndex: 100,
            minWidth: '200px',
            maxHeight: '150px',
            overflowY: 'auto',
            fontSize: '8px'
          }}>
            {authenticSites
              .filter(site => site.isActive && ['Search', 'Service', 'Technology', 'Entertainment'].includes(site.category))
              .slice(0, 10)
              .map((site, index) => (
                <div
                  key={index}
                  onClick={() => handleSiteSelect(site)}
                  style={{
                    padding: '4px 8px',
                    cursor: 'pointer',
                    borderBottom: '1px solid #cdc7bb',
                    textAlign: 'left',
                    background: index % 2 === 0 ? '#f0f0f0' : '#ffffff'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#0000ff'
                    e.currentTarget.style.color = '#ffffff'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = index % 2 === 0 ? '#f0f0f0' : '#ffffff'
                    e.currentTarget.style.color = '#000000'
                  }}
                >
                  <div style={{ fontWeight: 'bold' }}>{site.name}</div>
                  <div style={{ fontSize: '7px', color: '#808080' }}>
                    {site.category} | {site.hits.toLocaleString()} hits
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Ring Statistics */}
      <div style={{
        background: '#000000',
        color: '#00ff00',
        border: '1px solid #008000',
        padding: '4px',
        margin: '8px 0',
        fontSize: '8px',
        fontFamily: 'Courier New, monospace'
      }}>
        <div>RING STATS: {ringStats.activeMembers} ACTIVE | {ringStats.totalHits.toLocaleString()} TOTAL HITS</div>
        <div>NEW TODAY: {ringStats.newToday} | SITE #{currentSite} OF {memberCount}</div>
      </div>

      {/* Site Info Toggle */}
      <button
        onClick={() => setShowSiteInfo(!showSiteInfo)}
        className="win95-button"
        style={{ fontSize: '8px', padding: '2px 6px', marginBottom: '6px' }}
      >
        {showSiteInfo ? '📊 HIDE INFO' : '📊 SITE INFO'}
      </button>

      {/* Detailed Site Information */}
      {showSiteInfo && selectedSite && (
        <div style={{
          background: '#ffffff',
          border: '2px inset #cdc7bb',
          padding: '6px',
          margin: '6px 0',
          fontSize: '8px',
          textAlign: 'left'
        }}>
          <div style={{ fontWeight: 'bold', color: '#000080', marginBottom: '4px' }}>
            📋 SITE DETAILS
          </div>
          <table style={{ width: '100%', fontSize: '7px' }}>
            <tbody>
              <tr>
                <td>Name:</td>
                <td style={{ fontWeight: 'bold' }}>{selectedSite.name}</td>
              </tr>
              <tr>
                <td>URL:</td>
                <td style={{ color: '#0000ff' }}>{selectedSite.url}</td>
              </tr>
              <tr>
                <td>Category:</td>
                <td>{selectedSite.category}</td>
              </tr>
              <tr>
                <td>Established:</td>
                <td>{selectedSite.established}</td>
              </tr>
              <tr>
                <td>Total Hits:</td>
                <td style={{ color: '#008000', fontWeight: 'bold' }}>{selectedSite.hits.toLocaleString()}</td>
              </tr>
              <tr>
                <td>Status:</td>
                <td style={{ color: selectedSite.isActive ? '#008000' : '#ff0000' }}>
                  {selectedSite.isActive ? '🟢 ACTIVE' : '🔴 INACTIVE'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Join the Ring */}
      <div style={{
        background: 'linear-gradient(45deg, #ff0000, #ffff00, #ff0000)',
        border: '2px outset #cdc7bb',
        padding: '4px',
        margin: '6px 0',
        cursor: 'pointer',
        fontSize: '9px',
        fontWeight: 'bold',
        color: '#000000',
        textShadow: '1px 1px 2px rgba(255,255,255,0.8)'
      }} onClick={() => {
        const event = new CustomEvent('triggerEasterEgg', {
          detail: { type: 'matrix-effect', source: 'web-ring-join' }
        })
        window.dispatchEvent(event)
      }}>
        🚀 JOIN THE RING! 🚀
        <div style={{ fontSize: '7px', marginTop: '2px' }}>
          Click here to add your site!
        </div>
      </div>

      {/* Ring Master Info */}
      <div style={{
        fontSize: '7px',
        color: '#808080',
        marginTop: '6px',
        borderTop: '1px solid #cdc7bb',
        paddingTop: '4px'
      }}>
        <div>🔧 Ring Master: webmaster@netstalgia.com</div>
        <div>📅 Established: 1999 | 🔄 Last Updated: Never!</div>
        <div>💾 Powered by Perl CGI & 56k Modem</div>
      </div>

      <style jsx>{`
        .web-ring:hover {
          border-color: #0000ff;
          box-shadow: 0 0 8px #0000ff;
        }
      `}</style>
    </div>
  )
} 