'use client'

import { useState, useEffect } from 'react'

interface PopupAd {
  id: string
  title: string
  content: string
  style: string
  x: number
  y: number
}

interface PopupAdsProps {
  onSystemCrash: () => void
}

const AD_TEMPLATES = [
  {
    title: 'CONGRATULATIONS! YOU HAVE WON!',
    content: '* YOU ARE VISITOR #1,000,000! *\n\nCLICK HERE TO CLAIM YOUR\n$1000 CASH PRIZE!\n\nACT NOW - LIMITED TIME OFFER!\n\n(Definitely not a scam!)',
    style: 'lottery'
  },
  {
    title: 'FREE SCREENSAVERS DOWNLOAD!',
    content: '* DOWNLOAD FREE SCREENSAVERS! *\n\n• Flying Toasters\n• 3D Maze\n• Starfield Simulation\n• After Dark Collection\n• Mystify Your Mind\n\nNO VIRUSES GUARANTEED!\n(Terms and conditions apply)',
    style: 'download'
  },
  {
    title: 'PUNCH THE MONKEY!',
    content: '* PUNCH THE MONKEY! *\n\nWIN A FREE PALM PILOT!\n\nYOU HAVE 10 SECONDS!\n\nCLICK NOW TO WIN!\n\n(Monkey punching skills required)',
    style: 'game'
  },
  {
    title: 'FREE MP3 DOWNLOADS!',
    content: '* UNLIMITED MP3 DOWNLOADS! *\n\nBEAT THE RIAA!\n100% LEGAL & ANONYMOUS!\n\nDOWNLOAD NAPSTER 2.0 NOW!\n\n(Your hard drive will thank you)',
    style: 'pirate'
  },
  {
    title: 'Y2K BUG PROTECTION!',
    content: '* Y2K BUG ALERT! *\n\nPROTECT YOUR COMPUTER!\nFIX MILLENNIUM BUG!\n\nDOWNLOAD NOW - FREE!\n\n(Save your precious files!)',
    style: 'warning'
  },
  {
    title: 'BONZI BUDDY IS BACK!',
    content: '* YOUR VIRTUAL FRIEND! *\n\nHELPS YOU BROWSE THE WEB!\nTELLS JOKES & SINGS SONGS!\n\nDOWNLOAD BONZI BUDDY 4.0!\n\n(He definitely won\'t spy on you)',
    style: 'cute'
  },
  {
    title: 'MAKE MONEY FAST!',
    content: '* WORK FROM HOME! *\n\n$5000/WEEK GUARANTEED!\nNO EXPERIENCE REQUIRED!\n\nCLICK HERE TO START!\n\n(This is totally legitimate)',
    style: 'money'
  },
  {
    title: 'FREE AOL TRIAL!',
    content: '* GET 1000 FREE HOURS! *\n\nAMERICA ONLINE TRIAL\nNO CREDIT CARD REQUIRED!\n\nSIGN UP NOW - LIMITED TIME!\n\n(You\'ve got mail!)',
    style: 'isp'
  },
  {
    title: 'WIN A FREE COMPUTER!',
    content: '* SURVEY COMPLETION REWARD! *\n\nCOMPLETE 3 SIMPLE SURVEYS\nWIN A BRAND NEW PC!\n\nCLICK HERE TO START!\n\n(Only 2 minutes required)',
    style: 'survey'
  },
  {
    title: 'FREE GAMES DOWNLOAD!',
    content: '* 1000+ FREE GAMES! *\n\n• Doom Shareware\n• Wolfenstein 3D\n• Commander Keen\n• Duke Nukem\n• Jazz Jackrabbit\n\nDOWNLOAD NOW - FREE!\n\n(Your boss will never know)',
    style: 'games'
  },
  {
    title: 'VIRUS SCAN ALERT!',
    content: '* VIRUS DETECTED ON YOUR PC! *\n\nDOWNLOAD FREE ANTIVIRUS!\nPROTECT YOUR FILES NOW!\n\nCLICK TO SCAN!\n\n(Your computer is at risk!)',
    style: 'virus'
  },
  {
    title: 'FREE EMAIL ACCOUNT!',
    content: '* GET FREE EMAIL NOW! *\n\nHOTMAIL - 2MB STORAGE\nYAHOO MAIL - 6MB STORAGE\n\nSIGN UP - NO CREDIT CARD!\n\n(Stay connected!)',
    style: 'email'
  },
  {
    title: 'FREE WEB HOSTING!',
    content: '* FREE WEB HOSTING! *\n\nGEOCITIES - 15MB SPACE\nANGELFIRE - 20MB SPACE\n\nBUILD YOUR HOMEPAGE!\n\n(Everyone can be a webmaster!)',
    style: 'hosting'
  },
  {
    title: 'FREE CHAT ROOMS!',
    content: '* CHAT WITH FRIENDS! *\n\nAOL CHAT ROOMS\nYAHOO CHAT\nMSN CHAT\n\nJOIN NOW - FREE!\n\n(Make new friends online!)',
    style: 'chat'
  },
  {
    title: 'FREE SCREENSAVER!',
    content: '* DOWNLOAD SCREENSAVER! *\n\n• Matrix Digital Rain\n• Flying Windows\n• 3D Pipes\n• Starfield\n• Mystify\n\nSAVE YOUR MONITOR!\n\n(Free download!)',
    style: 'screensaver'
  }
]

export default function PopupAds({ onSystemCrash }: PopupAdsProps) {
  const [popups, setPopups] = useState<PopupAd[]>([])

  useEffect(() => {
    const createPopup = () => {
      if (popups.length >= 4) return // Allow more concurrent popups for chaos
      
      const template = AD_TEMPLATES[Math.floor(Math.random() * AD_TEMPLATES.length)]
      const popup: PopupAd = {
        id: Date.now().toString(),
        title: template.title,
        content: template.content,
        style: template.style,
        x: Math.random() * (window.innerWidth - 320),
        y: Math.random() * (window.innerHeight - 280)
      }
      
      setPopups(prev => [...prev, popup])
    }

    // First popup after 30 seconds (reduced frequency)
    const firstTimer = setTimeout(createPopup, 30000)
    
    // Much less frequent popups - every 60 seconds instead of 30
    const interval = setInterval(createPopup, 60000)

    return () => {
      clearTimeout(firstTimer)
      clearInterval(interval)
    }
  }, [popups.length])

  const closePopup = (id: string) => {
    setPopups(prev => prev.filter(popup => popup.id !== id))
    
    // 25% chance popup comes back (authentic 90s behavior!)
    if (Math.random() < 0.25) {
      setTimeout(() => {
        const template = AD_TEMPLATES[Math.floor(Math.random() * AD_TEMPLATES.length)]
        const newPopup: PopupAd = {
          id: Date.now().toString(),
          title: '⚠️ URGENT: ' + template.title,
          content: template.content + '\n\nYOU CANNOT ESCAPE THE ADS!\nTHIS IS YOUR FINAL WARNING!',
          style: template.style,
          x: Math.random() * (window.innerWidth - 320),
          y: Math.random() * (window.innerHeight - 280)
        }
        setPopups(prev => [...prev, newPopup])
      }, 3000)
    }
  }

  const handleYesClick = () => {
    // Trigger system crash when user clicks YES
    onSystemCrash()
  }

  const getPopupStyle = (style: string) => {
    switch (style) {
      case 'lottery':
        return {
          titlebar: { background: 'linear-gradient(45deg, #ff0000, #ffff00, #ff0000)', color: '#ffffff' },
          content: { background: 'linear-gradient(45deg, #ffffcc, #ffccff)', border: '3px outset #ff6600' },
          button: { background: 'linear-gradient(45deg, #ffff00, #ff6600)', color: '#000000' }
        }
      case 'download':
        return {
          titlebar: { background: 'linear-gradient(45deg, #00ff00, #00ffff, #00ff00)', color: '#000000' },
          content: { background: 'linear-gradient(45deg, #ccffff, #ccffcc)', border: '3px outset #00cc00' },
          button: { background: 'linear-gradient(45deg, #00ff00, #00cc00)', color: '#000000' }
        }
      case 'game':
        return {
          titlebar: { background: 'linear-gradient(45deg, #ff6600, #ffff00, #ff6600)', color: '#000000' },
          content: { background: 'linear-gradient(45deg, #ffcc99, #ffffcc)', border: '3px outset #ff6600' },
          button: { background: 'linear-gradient(45deg, #ff6600, #ff3300)', color: '#ffffff' }
        }
      case 'pirate':
        return {
          titlebar: { background: 'linear-gradient(45deg, #000000, #666666, #000000)', color: '#00ff00' },
          content: { background: 'linear-gradient(45deg, #003300, #006600)', border: '3px outset #00ff00', color: '#00ff00' },
          button: { background: 'linear-gradient(45deg, #00ff00, #00cc00)', color: '#000000' }
        }
      case 'warning':
        return {
          titlebar: { background: 'linear-gradient(45deg, #ff0000, #ff6600, #ff0000)', color: '#ffffff' },
          content: { background: 'linear-gradient(45deg, #ffcccc, #ffcc99)', border: '3px outset #ff0000' },
          button: { background: 'linear-gradient(45deg, #ff0000, #cc0000)', color: '#ffffff' }
        }
      case 'cute':
        return {
          titlebar: { background: 'linear-gradient(45deg, #ff99cc, #ffccff, #ff99cc)', color: '#000000' },
          content: { background: 'linear-gradient(45deg, #ffccff, #ff99cc)', border: '3px outset #ff99cc' },
          button: { background: 'linear-gradient(45deg, #ff99cc, #ff6699)', color: '#000000' }
        }
      case 'money':
        return {
          titlebar: { background: 'linear-gradient(45deg, #ffff00, #ffcc00, #ffff00)', color: '#000000' },
          content: { background: 'linear-gradient(45deg, #ffffcc, #ffcc99)', border: '3px outset #ffcc00' },
          button: { background: 'linear-gradient(45deg, #ffff00, #ffcc00)', color: '#000000' }
        }
      case 'isp':
        return {
          titlebar: { background: 'linear-gradient(45deg, #0066cc, #0099ff, #0066cc)', color: '#ffffff' },
          content: { background: 'linear-gradient(45deg, #ccddff, #99ccff)', border: '3px outset #0066cc' },
          button: { background: 'linear-gradient(45deg, #0066cc, #003399)', color: '#ffffff' }
        }
      case 'survey':
        return {
          titlebar: { background: 'linear-gradient(45deg, #9900cc, #cc66ff, #9900cc)', color: '#ffffff' },
          content: { background: 'linear-gradient(45deg, #ffccff, #cc99ff)', border: '3px outset #9900cc' },
          button: { background: 'linear-gradient(45deg, #cc66ff, #9900cc)', color: '#ffffff' }
        }
      case 'games':
        return {
          titlebar: { background: 'linear-gradient(45deg, #00cc00, #66ff66, #00cc00)', color: '#000000' },
          content: { background: 'linear-gradient(45deg, #ccffcc, #99ff99)', border: '3px outset #00cc00' },
          button: { background: 'linear-gradient(45deg, #00cc00, #009900)', color: '#ffffff' }
        }
      case 'virus':
        return {
          titlebar: { background: 'linear-gradient(45deg, #cc0000, #ff3333, #cc0000)', color: '#ffffff' },
          content: { background: 'linear-gradient(45deg, #ffcccc, #ff9999)', border: '3px outset #cc0000' },
          button: { background: 'linear-gradient(45deg, #ff3333, #cc0000)', color: '#ffffff' }
        }
      case 'email':
        return {
          titlebar: { background: 'linear-gradient(45deg, #009900, #00cc00, #009900)', color: '#ffffff' },
          content: { background: 'linear-gradient(45deg, #ccffcc, #99ff99)', border: '3px outset #009900' },
          button: { background: 'linear-gradient(45deg, #00cc00, #009900)', color: '#ffffff' }
        }
      case 'hosting':
        return {
          titlebar: { background: 'linear-gradient(45deg, #ff6600, #ff9933, #ff6600)', color: '#ffffff' },
          content: { background: 'linear-gradient(45deg, #ffcc99, #ff9966)', border: '3px outset #ff6600' },
          button: { background: 'linear-gradient(45deg, #ff9933, #ff6600)', color: '#ffffff' }
        }
      case 'chat':
        return {
          titlebar: { background: 'linear-gradient(45deg, #cc66ff, #ff99ff, #cc66ff)', color: '#000000' },
          content: { background: 'linear-gradient(45deg, #ffccff, #ff99ff)', border: '3px outset #cc66ff' },
          button: { background: 'linear-gradient(45deg, #ff99ff, #cc66ff)', color: '#000000' }
        }
      case 'screensaver':
        return {
          titlebar: { background: 'linear-gradient(45deg, #0066cc, #3399ff, #0066cc)', color: '#ffffff' },
          content: { background: 'linear-gradient(45deg, #ccddff, #99ccff)', border: '3px outset #0066cc' },
          button: { background: 'linear-gradient(45deg, #3399ff, #0066cc)', color: '#ffffff' }
        }
      default:
        return {
          titlebar: { background: 'linear-gradient(45deg, #ff0000, #ffff00, #ff0000)', color: '#ffffff' },
          content: { background: 'linear-gradient(45deg, #ffffcc, #ffccff)', border: '3px outset #ff6600' },
          button: { background: 'linear-gradient(45deg, #ffff00, #ff6600)', color: '#000000' }
        }
    }
  }

  return (
    <>
      {popups.map((popup) => {
        const popupStyle = getPopupStyle(popup.style)
        return (
          <div
            key={popup.id}
            className="popup-container win95-window pixelated-window"
            style={{ 
              left: popup.x, 
              top: popup.y,
              width: '300px',
              animation: 'popupBounce 0.5s ease-out',
              border: '3px outset #c0c0c0',
              boxShadow: '4px 4px 8px rgba(0,0,0,0.5)',
              imageRendering: 'pixelated'
            }}
          >
            {/* Title bar with dynamic styling */}
            <div className="win95-titlebar pixelated-titlebar" style={{...popupStyle.titlebar, fontFamily: 'Consolas, Monaco, Courier New, monospace', letterSpacing: '0.5px'}}>
              <span style={{fontSize: '12px', fontWeight: 'bold'}} className="blink pixelated-text">
                * URGENT MESSAGE! DO NOT IGNORE! *
              </span>
              <button
                onClick={() => closePopup(popup.id)}
                className="win95-button"
                style={{padding: '1px 4px', fontSize: '10px', background: '#ff6666'}}
              >
                X
              </button>
            </div>
            
            {/* Content with dynamic styling */}
            <div style={{padding: '12px', ...popupStyle.content}}>
              <h3 style={{
                fontWeight: 'bold', 
                color: '#ff0000', 
                marginBottom: '8px', 
                fontSize: '13px', 
                textAlign: 'center',
                textShadow: '2px 2px 4px #000000',
                fontFamily: 'Consolas, Monaco, Courier New, monospace',
                letterSpacing: '0.3px'
              }} className="blink pixelated-title">
                {popup.title}
              </h3>
              <div style={{
                fontSize: '11px', 
                whiteSpace: 'pre-line', 
                color: popupStyle.content.color || '#000000', 
                marginBottom: '12px', 
                textAlign: 'center',
                lineHeight: '1.4',
                border: '2px inset #c0c0c0',
                padding: '8px',
                background: '#ffffff',
                fontFamily: 'Consolas, Monaco, Courier New, monospace',
                letterSpacing: '0.2px'
              }}>
                {popup.content}
              </div>
              
              {/* Dynamic buttons */}
              <div style={{display: 'flex', flexDirection: 'column', gap: '6px'}}>
                <button 
                  onClick={handleYesClick}
                  className="win95-button pixelated-button" 
                  style={{
                    width: '100%', 
                    fontSize: '12px', 
                    fontWeight: 'bold',
                    ...popupStyle.button,
                    border: '3px outset #ffff00',
                    fontFamily: 'Consolas, Monaco, Courier New, monospace',
                    letterSpacing: '0.3px'
                  }}
                >
                  * YES! I WANT THIS NOW! CLICK HERE! *
                </button>
                <button 
                  onClick={() => closePopup(popup.id)}
                  className="win95-button pixelated-button"
                  style={{
                    width: '100%', 
                    fontSize: '10px',
                    background: '#cccccc',
                    color: '#666666',
                    fontFamily: 'Consolas, Monaco, Courier New, monospace',
                    letterSpacing: '0.2px'
                  }}
                >
                  No thanks (you'll regret this)
                </button>
              </div>
              
              {/* Extra obnoxious elements */}
              <div style={{
                marginTop: '8px', 
                textAlign: 'center', 
                fontSize: '8px',
                color: '#ff0000'
              }} className="blink">
                * THIS OFFER EXPIRES IN 30 SECONDS! *
              </div>
            </div>
          </div>
        )
      })}
      
      <style jsx>{`
        @keyframes popupBounce {
          0% { 
            transform: scale(0.3) translateY(-100px) rotate(-5deg); 
            opacity: 0; 
          }
          50% { 
            transform: scale(1.1) translateY(20px) rotate(2deg); 
            opacity: 0.8; 
          }
          100% { 
            transform: scale(1) translateY(0) rotate(0deg); 
            opacity: 1; 
          }
        }
      `}</style>
    </>
  )
} 