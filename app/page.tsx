'use client'

import { useState } from 'react'
import LoadingScreen from '../components/LoadingScreen'
import DancingBaby from '../components/DancingBaby'
import Guestbook from '../components/Guestbook'
import PopupAds from '../components/PopupAds'
import VisitorCounter from '../components/VisitorCounter'
import HitCounter from '../components/HitCounter'
import BannerAds from '../components/BannerAds'
import MailNotification from '../components/MailNotification'
import WebRing from '../components/WebRing'
import EasterEggManager from '../components/EasterEggManager'
import WinampPlayer from '../components/BackgroundMusic'
import EasterEggModal from '../components/EasterEggModal'
import SystemCrash from '../components/SystemCrash'
import UnderConstruction from '../components/UnderConstruction'
import MarqueeText from '../components/MarqueeText'
import SecretEasterEgg from '../components/SecretEasterEgg'
import Starfield from '../components/Starfield'
import Navbar from './Navbar'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [showEasterEgg, setShowEasterEgg] = useState(false)
  const [showCrash, setShowCrash] = useState(false)
  const [selectedSite, setSelectedSite] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const [easterEggCount, setEasterEggCount] = useState(0)
  const [showStarfield, setShowStarfield] = useState(false)
  const [currentPage, setCurrentPage] = useState('home')

  const handleLoadingComplete = () => {
      setIsLoading(false)
  }

  const handleEasterEgg = () => {
    setShowEasterEgg(true)
    setEasterEggCount(prev => prev + 1)
  }

  const handleSystemCrash = () => {
    setShowCrash(true)
  }

  const handleRestart = () => {
    setShowCrash(false)
    // Maybe spawn more popups after restart as punishment
  }

  const handleSecretTrigger = () => {
    setEasterEggCount(prev => prev + 1)
    setShowStarfield(true)
    setTimeout(() => setShowStarfield(false), 5000)
  }

  const famousSites = [
    'YAHOO! - THE BEST SEARCH ENGINE!',
    'ALTAVISTA - BEATS GOOGLE!',
    'GEOCITIES - FREE HOSTING!',
    'ANGELFIRE - MORE FREE HOSTING!',
    'NETSCAPE - INTERNET EXPLORER SUCKS!',
    'LYCOS - FETCH!',
    'EXCITE - WOW!',
    'WEBCRAWLER - SPIDER POWER!',
    'INFOSEEK - ANOTHER SEARCH ENGINE!',
    'HOTBOT - THE HOTTEST SEARCH!',
    'ASK JEEVES - JUST ASK!',
    'GOOGLE - THE NEW KID ON THE BLOCK!',
    'AMAZON - BOOKS ONLINE!',
    'EBAY - AUCTIONS!',
    'MP3.COM - FREE MUSIC!',
    'NAPSTER - SHARE MUSIC!',
    'REALPLAYER - STREAMING MEDIA!',
    'WINAMP - THE BEST PLAYER!'
  ]

  if (showCrash) {
    return <SystemCrash onRestart={handleRestart} />
  }

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />
  }

  return (
    <main className="min-h-screen p-4" style={{
      fontSize: '14px',
      background: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'100\' viewBox=\'0 0 100 100\'><defs><pattern id=\'stars\' patternUnits=\'userSpaceOnUse\' width=\'100\' height=\'100\'><circle cx=\'10\' cy=\'10\' r=\'1\' fill=\'%23ffffff\' opacity=\'0.3\'/><circle cx=\'30\' cy=\'20\' r=\'0.5\' fill=\'%23ffffff\' opacity=\'0.2\'/><circle cx=\'50\' cy=\'40\' r=\'1\' fill=\'%23ffffff\' opacity=\'0.3\'/><circle cx=\'70\' cy=\'60\' r=\'0.5\' fill=\'%23ffffff\' opacity=\'0.2\'/><circle cx=\'90\' cy=\'80\' r=\'1\' fill=\'%23ffffff\' opacity=\'0.3\'/><circle cx=\'20\' cy=\'90\' r=\'0.5\' fill=\'%23ffffff\' opacity=\'0.2\'/><circle cx=\'40\' cy=\'70\' r=\'1\' fill=\'%23ffffff\' opacity=\'0.3\'/><circle cx=\'60\' cy=\'50\' r=\'0.5\' fill=\'%23ffffff\' opacity=\'0.2\'/><circle cx=\'80\' cy=\'30\' r=\'1\' fill=\'%23ffffff\' opacity=\'0.3\'/></pattern></defs><rect width=\'100\' height=\'100\' fill=\'url(%23stars)\'/></svg>")',
      backgroundAttachment: 'fixed'
    }}>
      <WinampPlayer />
      <PopupAds onSystemCrash={handleSystemCrash} />
      <SecretEasterEgg onTrigger={handleSecretTrigger} />
      {showStarfield && <Starfield />}
      <MailNotification />
      <EasterEggManager />
      
      {/* Title Section - Always Visible */}
      <div className="title-section pixelated-window" style={{
        background: '#ecece0',
        border: '4px outset #cdc7bb',
        padding: '16px',
        marginBottom: '0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px',
        imageRendering: 'pixelated'
      }}>
        {/* Left: NETSTALGIA.COM Branding */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          minWidth: '400px',
          flex: '2',
          padding: '0 20px'
        }}>
          <div className="font-huge pixelated-title" style={{
            fontSize: '56px',
            fontWeight: 'bold',
            color: '#000080',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            fontFamily: 'Courier New, monospace',
            lineHeight: '1.1',
            letterSpacing: '2px'
          }}>
            NETSTALGIA
          </div>
          <div className="font-large pixelated-title" style={{
            fontSize: '40px',
            fontWeight: 'bold',
            color: '#ff0000',
            textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
            fontFamily: 'Courier New, monospace',
            lineHeight: '1.1',
            letterSpacing: '1px'
          }}>
            .COM
          </div>
          <div className="font-small" style={{
            fontSize: '16px',
            color: '#008000',
            marginTop: '8px'
          }}>
            * THE COOLEST SITE ON THE WEB! *
          </div>
        </div>
        
        {/* Center: Search and Navigation */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          flex: 1,
          maxWidth: '300px'
        }}>
          {/* Famous Sites Dropdown */}
          <div style={{position: 'relative'}}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <label style={{
                fontSize: '13px',
                fontWeight: 'bold',
                color: '#000080'
              }}>
                GO TO:
              </label>
              <div style={{
                position: 'relative',
                display: 'inline-block'
              }}>
                <input
                  type="text"
                  placeholder="Select Famous Website..."
                  value={selectedSite}
                  onChange={(e) => setSelectedSite(e.target.value)}
                  onFocus={() => setShowDropdown(true)}
                  style={{
                    width: '200px',
                    padding: '4px 8px',
                    border: '2px inset #cdc7bb',
                    background: '#ffffff',
                    fontSize: '12px',
                    fontFamily: 'MS Sans Serif, Arial, sans-serif'
                  }}
                />
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  style={{
                    position: 'absolute',
                    right: '2px',
                    top: '2px',
                    background: '#cdc7bb',
                    border: '1px outset #cdc7bb',
                    padding: '2px 4px',
                    fontSize: '10px',
                    cursor: 'pointer'
                  }}
                >
                  ▼
                </button>
              </div>
            </div>
            
            {/* Dropdown Menu */}
            {showDropdown && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: '0',
                width: '200px',
                background: '#ffffff',
                border: '2px outset #cdc7bb',
                zIndex: 1000,
                maxHeight: '150px',
                overflowY: 'auto'
              }}>
                {famousSites.map((site, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setSelectedSite(site)
                      setShowDropdown(false)
                    }}
                    style={{
                      padding: '4px 8px',
                      fontSize: '10px',
                      cursor: 'pointer',
                      borderBottom: '1px solid #cdc7bb',
                      fontFamily: 'MS Sans Serif, Arial, sans-serif'
                    }}
                    onMouseEnter={(e) => (e.target as HTMLElement).style.background = '#ecece0'}
                    onMouseLeave={(e) => (e.target as HTMLElement).style.background = '#ffffff'}
                  >
                    {site}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Search Bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <input
              type="text"
              placeholder="Search the World Wide Web..."
              style={{
                flex: 1,
                padding: '4px 8px',
                border: '2px inset #cdc7bb',
                background: '#ffffff',
                fontSize: '12px',
                fontFamily: 'MS Sans Serif, Arial, sans-serif'
              }}
            />
            <button style={{
              background: '#cdc7bb',
              border: '2px outset #cdc7bb',
              padding: '4px 8px',
              fontSize: '12px',
              cursor: 'pointer',
              fontFamily: 'MS Sans Serif, Arial, sans-serif'
            }}>
              GO!
            </button>
          </div>
        </div>
        
        {/* Right: Signup Section */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          minWidth: '140px'
        }}>
          <div style={{
            fontSize: '13px',
            fontWeight: 'bold',
            color: '#000080',
            textAlign: 'center'
          }}>
            * FREE SIGNUP! *
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px'
          }}>
            <input
              type="text"
              placeholder="Username"
              style={{
                padding: '2px 4px',
                border: '2px inset #cdc7bb',
                background: '#ffffff',
                fontSize: '11px',
                fontFamily: 'MS Sans Serif, Arial, sans-serif'
              }}
            />
            <input
              type="password"
              placeholder="Password"
              style={{
                padding: '2px 4px',
                border: '2px inset #cdc7bb',
                background: '#ffffff',
                fontSize: '11px',
                fontFamily: 'MS Sans Serif, Arial, sans-serif'
              }}
            />
            <button style={{
              background: '#cdc7bb',
              border: '2px outset #cdc7bb',
              padding: '2px 6px',
              fontSize: '11px',
              cursor: 'pointer',
              fontFamily: 'MS Sans Serif, Arial, sans-serif'
            }}>
              JOIN NOW!
            </button>
          </div>
        </div>

        {/* Misaligned Ad */}
        <div style={{
          position: 'relative',
          transform: 'rotate(-2deg)',
          marginTop: '-10px',
          marginRight: '-5px',
          flex: '2',
          display: 'flex',
          justifyContent: 'flex-end',
          padding: '0 20px'
        }}>
          <div style={{
            background: '#ffff00',
            border: '3px solid #000000',
            padding: '16px',
            width: '220px',
            textAlign: 'center',
            boxShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}>
            <div style={{
              fontSize: '16px',
              fontWeight: 'bold',
              color: '#000000',
              marginBottom: '8px'
            }}>
              * FREE MONEY! *
            </div>
            <div style={{
              fontSize: '12px',
              color: '#000000'
            }}>
              CLICK HERE TO<br/>
              WIN $1000!<br/>
              <span style={{fontSize: '10px'}}>NO SPAM!</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navbar - Always Visible */}
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {/* Vintage Images Section - Always Visible */}
      <div className="center mb-4">
        <div className="vintage-image">
          <img 
            src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='90' viewBox='0 0 120 90'><rect width='120' height='90' fill='%23ff0000'/><text x='60' y='45' text-anchor='middle' fill='white' font-size='10' font-family='Arial'>NEW!</text><text x='60' y='60' text-anchor='middle' fill='white' font-size='8' font-family='Arial'>VISITOR</text></svg>" 
            alt="NEW! Visitor Badge" 
            style={{width: '120px', height: '90px'}}
          />
        </div>
        <div className="vintage-image">
          <img 
            src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='90' viewBox='0 0 120 90'><rect width='120' height='90' fill='%2300ff00'/><text x='60' y='45' text-anchor='middle' fill='white' font-size='10' font-family='Arial'>COOL</text><text x='60' y='60' text-anchor='middle' fill='white' font-size='8' font-family='Arial'>SITE!</text></svg>" 
            alt="COOL SITE! Badge" 
            style={{width: '120px', height: '90px'}}
          />
        </div>
        <div className="vintage-image">
          <img 
            src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='90' viewBox='0 0 120 90'><rect width='120' height='90' fill='%230000ff'/><text x='60' y='45' text-anchor='middle' fill='white' font-size='10' font-family='Arial'>Y2K</text><text x='60' y='60' text-anchor='middle' fill='white' font-size='8' font-family='Arial'>READY!</text></svg>" 
            alt="Y2K READY! Badge" 
            style={{width: '120px', height: '90px'}}
          />
        </div>
          </div>

      {/* Main Content Table Layout - Always Visible */}
      <table width="100%" cellPadding="8" cellSpacing="0" className="data-table">
        <tr>
          {/* Left Sidebar - Always Visible */}
          <td width="200" valign="top">
                          <div className="retro-border" style={{
                border: '3px outset #cdc7bb',
                boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.2), 2px 2px 4px rgba(0,0,0,0.2)',
                background: 'linear-gradient(45deg, #ecece0 0%, #cdc7bb 50%, #ecece0 100%)',
                backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'30\' height=\'30\' viewBox=\'0 0 30 30\'><rect width=\'30\' height=\'30\' fill=\'%23ecece0\'/><polygon points=\'15,5 20,15 15,25 10,15\' fill=\'%23cdc7bb\' opacity=\'0.3\'/></svg>")'
              }}>
                <h2 className="font-large text-web-purple center rainbow-text" style={{fontSize: '16px'}}>
                  * COOL STUFF *
                </h2>
          
          <HitCounter />
          
          <WebRing />
          
              <div className="mt-4">
                <div className="retro-border-inset">
                  <h3 className="font-normal text-web-blue center" style={{fontSize: '13px'}}>* HOT LINKS! *</h3>
                  <div className="nav-links">
                                          <a href="https://web.archive.org/web/19961017235908/http://www2.yahoo.com/" target="_blank" style={{fontSize: '12px'}}>YAHOO! (THE BEST SEARCH ENGINE EVER!)</a>
                      <a href="https://web.archive.org/web/19961110030000/http://www.altavista.digital.com/" target="_blank" style={{fontSize: '12px'}}>ALTAVISTA (BEATS GOOGLE!)</a>
                      <a href="https://web.archive.org/web/19961226182558/http://www3.geocities.com/" target="_blank" style={{fontSize: '12px'}}>GEOCITIES (FREE HOSTING!)</a>
                      <a href="https://web.archive.org/web/19961219120000/http://www.angelfire.com/" target="_blank" style={{fontSize: '12px'}}>ANGELFIRE (MORE FREE HOSTING!)</a>
                      <a href="https://web.archive.org/web/19961219120000/http://home.netscape.com/" target="_blank" style={{fontSize: '12px'}}>NETSCAPE (INTERNET EXPLORER SUCKS!)</a>
                      <a href="https://web.archive.org/web/19961219120000/http://www.lycos.com/" target="_blank" style={{fontSize: '12px'}}>LYCOS (FETCH!)</a>
                      <a href="https://web.archive.org/web/19961219120000/http://www.excite.com/" target="_blank" style={{fontSize: '12px'}}>EXCITE (WOW!)</a>
                      <a href="https://web.archive.org/web/19961219120000/http://www.webcrawler.com/" target="_blank" style={{fontSize: '12px'}}>WEBCRAWLER (SPIDER POWER!)</a>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <div className="retro-border-inset" style={{background: '#ecece0'}}>
                  <h3 className="font-normal text-web-red center blink" style={{fontSize: '13px'}}>* AWARDS & HONORS *</h3>
                  <div className="center font-small">
                                          <div className="text-web-yellow" style={{fontSize: '11px'}}>* COOL SITE OF THE DAY *</div>
                      <div className="text-web-blue" style={{fontSize: '11px'}}>YAHOO! FEATURED SITE</div>
                      <div className="text-web-green" style={{fontSize: '11px'}}>TOP 50 GEOCITIES</div>
                      <div className="text-web-purple" style={{fontSize: '11px'}}>NETSCAPE WHAT'S COOL</div>
                      <div className="text-web-red" style={{fontSize: '11px'}}>POINT COMMUNICATIONS TOP 5%</div>
                      <div className="text-web-cyan" style={{fontSize: '11px'}}>MAGELLAN 4-STAR SITE</div>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <div className="retro-border-inset" style={{background: '#ecece0'}}>
                  <h3 className="font-normal text-web-green center" style={{fontSize: '13px'}}>* CONTACT THE WEBMASTER! *</h3>
                  <div className="center font-small">
                                          <div style={{fontSize: '11px'}}>E-MAIL: <a href="mailto:webmaster@netstalgia.com">webmaster@netstalgia.com</a></div>
                      <div style={{fontSize: '11px'}}>ICQ: <a href="https://web.archive.org/web/19961219120000/http://www.icq.com/" target="_blank">12345678</a></div>
                      <div style={{fontSize: '11px'}}>AIM: <a href="https://web.archive.org/web/19961219120000/http://www.aim.com/" target="_blank">NetstalgiaKid</a></div>
                      <div style={{fontSize: '11px'}}>MSN: <a href="https://web.archive.org/web/19961219120000/http://www.hotmail.com/" target="_blank">netmaster@hotmail.com</a></div>
                      <div style={{fontSize: '11px'}}>YAHOO!: <a href="https://web.archive.org/web/19961219120000/http://messenger.yahoo.com/" target="_blank">webguru1996</a></div>
                      <div style={{fontSize: '11px'}}>PAGER: 1-800-PAGE-ME</div>
                      <div style={{fontSize: '11px'}}>FAX: (555) 123-4567</div>
                      <div style={{fontSize: '11px'}}>SNAIL MAIL: PO Box 1996, Web City, CA 90210</div>
                  </div>
            </div>
          </div>

                          <div className="mt-4" style={{border: '3px solid #896b4f', padding: '4px', background: '#ecece0'}}>
              <div className="center font-small text-web-red" style={{fontSize: '11px'}}>
                * WARNING! *<br/>
                CLICKING ON ADS MAY<br/>
                DOWNLOAD VIRUSES!<br/>
                (BUT DO IT ANYWAY!)
              </div>
            </div>

            {/* Hidden Easter Egg Section */}
            <div className="mt-4" style={{border: '2px solid #896b4f', padding: '4px', background: '#ecece0', cursor: 'pointer'}} onClick={() => {
              alert('🎉 SECRET FOUND! 🎉\n\nYou discovered the hidden 90s trivia section!\n\nDid you know?\n• Windows 95 launched on August 24, 1995\n• The first iPhone was released in 2007 (not 90s!)\n• Dial-up max speed was 56K\n• Floppy disks held 1.44MB\n• Tamagotchi was released in 1996\n• Pokemon Red/Blue came out in 1996\n• Y2K bug scare was in 1999\n• Napster launched in 1999\n\nYou\'re a true 90s expert! 🌟')
            }}>
              <div className="center font-small text-web-purple" style={{fontSize: '11px'}}>
                * CLICK FOR SECRET! *
              </div>
          </div>

            {/* 90s Trivia Corner */}
            <div className="mt-4">
              <div className="retro-border-inset" style={{background: '#ecece0'}}>
                <h3 className="font-normal text-web-cyan center" style={{fontSize: '13px'}}>* 90s TRIVIA CORNER! *</h3>
                                  <div className="center font-small" style={{fontSize: '11px'}}>
                  <div>• Windows 95 launched in 1995</div>
                  <div>• First iPhone: 2007 (not 90s!)</div>
                  <div>• Dial-up: 56K max speed</div>
                  <div>• Floppy disks: 1.44MB storage</div>
                  <div>• Tamagotchi: 1996 release</div>
                  <div>• Pokemon: 1996 in Japan</div>
                  <div>• Y2K bug scare: 1999</div>
                  <div>• Napster: 1999 launch</div>
                  <div>• Beanie Babies craze: 1995-1999</div>
                  <div>• Friends TV show: 1994-2004</div>
                  <div>• Titanic movie: 1997</div>
                  <div>• Titanic song: 1997</div>
                </div>
              </div>
            </div>
          </div>
          </td>

          {/* Main Content - Page Specific */}
          <td valign="top">
            {currentPage === 'home' && (
              <div className="retro-border" style={{background: '#ecece0'}}>
                <div className="center">
                  <h2 className="font-large text-web-blue rainbow-text" style={{fontSize: '18px'}}>
                    WELCOME TO MY TOTALLY RADICAL HOMEPAGE!
            </h2>
                  
                  <div className="ascii-art mb-4" style={{border: '2px solid #896b4f', padding: '8px', background: '#ecece0', fontSize: '10px'}}>
{`
+==========================================+
|            NETSTALGIA BBS v1.0           |
|         The Coolest Site on the Web!     |
|    * NOW WITH AUTO-PLAYING MIDI! *       |
|       * Y2K COMPLIANT GUARANTEED! *      |
+==========================================+
`}
                  </div>
            
            <DancingBaby onTripleClick={handleEasterEgg} />
            
                  <div style={{
                    border: '4px outset #cdc7bb', 
                    padding: '12px', 
                    margin: '16px auto', 
                    maxWidth: '500px', 
                    background: '#ecece0',
                    boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.2), 2px 2px 4px rgba(0,0,0,0.2)',
                    position: 'relative',
                    backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'20\' height=\'20\' viewBox=\'0 0 20 20\'><rect width=\'20\' height=\'20\' fill=\'%23ecece0\'/><circle cx=\'10\' cy=\'10\' r=\'1\' fill=\'%23cdc7bb\' opacity=\'0.3\'/></svg>")'
                  }}>
                    {/* 90s-style decorative corner elements */}
                    <div style={{
                      position: 'absolute',
                      top: '4px',
                      left: '4px',
                      width: '16px',
                      height: '16px',
                      background: 'linear-gradient(45deg, #cdc7bb 0%, #ecece0 50%, #cdc7bb 100%)',
                      border: '1px solid #896b4f',
                      transform: 'rotate(45deg)'
                    }}></div>
                    <div style={{
                      position: 'absolute',
                      top: '4px',
                      right: '4px',
                      width: '16px',
                      height: '16px',
                      background: 'linear-gradient(45deg, #cdc7bb 0%, #ecece0 50%, #cdc7bb 100%)',
                      border: '1px solid #896b4f',
                      transform: 'rotate(45deg)'
                    }}></div>
                    <p className="font-normal mb-4" style={{textAlign: 'left', fontSize: '13px'}}>
                      <span className="rainbow-text font-large" style={{fontSize: '16px'}}>WELCOME FELLOW NETIZENS!</span><br/><br/>
                      
                      This is the <span className="text-web-red">COOLEST</span> site on the 
                      <span className="text-web-blue">WORLD WIDE WEB!</span> Check out my famous 
                      <span className="text-web-magenta">DANCING BABY</span> above! 
                      This page is hand-coded in <span className="text-web-green">HTML 3.2</span> and best viewed with 
                      <span className="text-web-green">Netscape Navigator 3.0</span> or higher.
                      <br/><br/>
                      
                      <span className="rainbow-text font-large" style={{fontSize: '16px'}}>NEW!</span> Sign my guestbook and visit again soon! 
                      Don't forget to bookmark this page and tell ALL your friends on ICQ!
                      <br/><br/>
                      
                      <span className="blink" style={{fontSize: '13px'}}>Last updated: Never!</span><br/>
                      <span className="text-web-red" style={{fontSize: '13px'}}>* Y2K COMPLIANT! NO MILLENNIUM BUG HERE! *</span>
                    </p>
                  </div>
                  
                  <div className="retro-border-inset mt-4" style={{
                    background: '#ecece0',
                    border: '3px inset #cdc7bb',
                    boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.2)',
                    backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'40\' viewBox=\'0 0 40 40\'><rect width=\'40\' height=\'40\' fill=\'%23ecece0\'/><circle cx=\'20\' cy=\'20\' r=\'2\' fill=\'%23cdc7bb\' opacity=\'0.2\'/></svg>")'
                  }}>
                    <h3 className="font-normal text-web-red center" style={{fontSize: '13px'}}>* SYSTEM REQUIREMENTS *</h3>
                    <ul style={{textAlign: 'left', fontSize: '12px'}}>
                      <li>Netscape Navigator 3.0+ or Internet Explorer 3.0+ (IE SUCKS!)</li>
                      <li>800x600 screen resolution (1024x768 for rich kids)</li>
                      <li>56K modem or faster (T1 line = CHEATING!)</li>
                      <li>Sound Blaster 16 compatible sound card</li>
                      <li>16MB RAM recommended (32MB for POWER USERS!)</li>
                      <li>Windows 95 OSR2 or Windows 98 SE</li>
                      <li>CD-ROM drive for downloading Shareware</li>
                    </ul>
                  </div>

                  <div className="mt-4" style={{border: '3px solid #896b4f', padding: '8px', background: '#ecece0'}}>
                    <div className="center">
                      <div className="rainbow-text font-large" style={{fontSize: '16px'}}>
                        * WHAT'S NEW! *
                      </div>
                      <div className="font-small text-web-red" style={{fontSize: '11px'}}>
                        • Added auto-playing MIDI background music!<br/>
                        • New popup ads every 30 seconds!<br/>
                        • Counter now tracks REAL visitors!<br/>
                        • Guestbook with NO SPAM PROTECTION!<br/>
                        • Dancing baby with SECRET EASTER EGG!<br/>
                        • 100% JAVA-FREE (JavaScript is for n00bs!)<br/>
                        • Y2K COMPLIANT (guaranteed!)<br/>
                        • Netscape Navigator optimized!<br/>
                        • 800x600 resolution recommended!<br/>
                        • 56K modem friendly!
                      </div>
                    </div>
                  </div>

                  {/* Hidden Konami Code Easter Egg */}
                  <div className="mt-4" style={{border: '2px solid #896b4f', padding: '4px', background: '#ecece0', cursor: 'pointer'}} onClick={() => {
                    alert('🎮 KONAMI CODE ACTIVATED! 🎮\n\n↑↑↓↓←→←→BA\n\n+30 LIVES!\n+1000 POINTS!\n+UNLIMITED POWERS!\n\nYou found the secret Konami Code!\nThis website is now 100% more awesome!\n\nTry typing other secret codes too!')
                  }}>
                                      <div className="center font-small text-web-green" style={{fontSize: '11px'}}>
                    * CLICK FOR KONAMI CODE! *
                  </div>
                  </div>

                  {/* New 90s Content Section */}
                  <div className="mt-4" style={{border: '3px outset #cdc7bb', padding: '12px', background: '#ecece0'}}>
                    <h3 className="font-normal text-web-purple center" style={{fontSize: '13px'}}>* COOL STUFF FROM THE 90s! *</h3>
                    <div style={{fontSize: '12px', textAlign: 'left'}}>
                      <p><strong>Remember these awesome things?</strong></p>
                      <ul style={{marginLeft: '20px'}}>
                        <li>Tamagotchi virtual pets</li>
                        <li>Beanie Babies collecting craze</li>
                        <li>Pokemon Red & Blue (Game Boy)</li>
                        <li>Super Mario 64 (N64)</li>
                        <li>Windows 95 launch party</li>
                        <li>Dial-up internet sounds</li>
                        <li>CD-ROM games (Myst, Doom)</li>
                        <li>Pagers and flip phones</li>
                        <li>MTV's Total Request Live</li>
                        <li>Friends TV show finale</li>
                      </ul>
                      <p style={{marginTop: '8px'}}><strong>Tech that was totally rad:</strong></p>
                      <ul style={{marginLeft: '20px'}}>
                        <li>Pentium processors</li>
                        <li>3.5" floppy disks</li>
                        <li>VHS tapes and VCRs</li>
                        <li>Walkman cassette players</li>
                        <li>Polaroid cameras</li>
                        <li>Pay phones (before cell phones)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentPage === 'downloads' && (
              <div className="retro-border" style={{background: '#ecece0'}}>
                <div className="center">
                  <h2 className="font-large text-web-blue rainbow-text" style={{fontSize: '18px'}}>
                    * DOWNLOADS SECTION *
                  </h2>
                  
                  <div style={{border: '4px outset #cdc7bb', padding: '12px', margin: '16px auto', maxWidth: '600px', background: '#ecece0'}}>
                    <h3 style={{fontSize: '16px', color: '#000080', marginBottom: '12px'}}>FREE SOFTWARE DOWNLOADS!</h3>
                    <p style={{fontSize: '13px', marginBottom: '16px', textAlign: 'left'}}>
                      Welcome to the downloads section! Here you'll find the best FREE software from the 90s. 
                      All downloads are virus-free and tested on Windows 95/98. Remember to scan with your antivirus!
                    </p>
                    
                    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px'}}>
                      <div>
                        <h4 style={{fontSize: '14px', color: '#ff0000', marginBottom: '8px'}}>🎵 MUSIC & MEDIA</h4>
                        <ul style={{fontSize: '12px', textAlign: 'left'}}>
                          <li><b>WinAmp v2.95 Full</b> - <span style={{color: '#008000'}}>MP3s supported!</span> <a href="https://web.archive.org/web/19961219120000/http://www.winamp.com/" target="_blank">Download here!</a></li>
                          <li><b>Real Player GOLD</b> - <span style={{color: '#ff00ff'}}>Streaming!</span> <a href="https://web.archive.org/web/19961219120000/http://www.real.com/" target="_blank">Download here!</a></li>
                          <li><b>Napster 2.0</b> - <span style={{color: '#ff0000'}}>Peer-to-peer!</span> <a href="https://web.archive.org/web/19961219120000/http://www.napster.com/" target="_blank">Download here!</a></li>
                          <li><b>QuickTime 3.0</b> - <span style={{color: '#ff6600'}}>Apple media!</span> <a href="https://web.archive.org/web/19961219120000/http://www.apple.com/quicktime/" target="_blank">Download here!</a></li>
                          <li><b>Shockwave Player</b> - <span style={{color: '#ff00ff'}}>Macromedia!</span> <a href="https://web.archive.org/web/19961219120000/http://www.macromedia.com/" target="_blank">Download here!</a></li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 style={{fontSize: '14px', color: '#0000ff', marginBottom: '8px'}}>🌐 INTERNET & BROWSERS</h4>
                        <ul style={{fontSize: '12px', textAlign: 'left'}}>
                          <li><b>Mozilla 1.0</b> - <span style={{color: '#0000ff'}}>Open source!</span> <a href="https://web.archive.org/web/19961219120000/http://www.mozilla.org/" target="_blank">Download here!</a></li>
                          <li><b>ICQ 99a</b> - <span style={{color: '#00ff00'}}>Instant messaging!</span> <a href="https://web.archive.org/web/19961219120000/http://www.icq.com/" target="_blank">Download here!</a></li>
                          <li><b>Java Runtime Environment</b> - <span style={{color: '#008000'}}>Sun Microsystems!</span> <a href="https://web.archive.org/web/19961219120000/http://www.sun.com/" target="_blank">Download here!</a></li>
                          <li><b>Adobe Acrobat Reader</b> - <span style={{color: '#0000ff'}}>PDF files!</span> <a href="https://web.archive.org/web/19961219120000/http://www.adobe.com/" target="_blank">Download here!</a></li>
                        </ul>
                      </div>
                    </div>
                    
                    <div style={{border: '2px solid #896b4f', padding: '8px', background: '#ffff00', marginBottom: '16px'}}>
                      <h4 style={{fontSize: '14px', color: '#ff0000', marginBottom: '8px'}}>🎮 GAMES & ENTERTAINMENT</h4>
                      <ul style={{fontSize: '12px', textAlign: 'left'}}>
                        <li><b>3D Pinball Space Cadet</b> - <span style={{color: '#0000ff'}}>Classic!</span> <a href="https://web.archive.org/web/19961219120000/http://www.microsoft.com/games/" target="_blank">Download here!</a></li>
                        <li><b>Flying Toasters Screensaver</b> - <span style={{color: '#ff6600'}}>Animated!</span> <a href="https://web.archive.org/web/19961219120000/http://www.berkeley.com/" target="_blank">Download here!</a></li>
                        <li><b>Bonzi Buddy v3.0</b> - <span style={{color: '#ff0000'}}>FREE!</span> <a href="https://web.archive.org/web/19961219120000/http://www.bonzi.com/" target="_blank">Download here!</a></li>
                      </ul>
                    </div>
                    
                    <div style={{border: '2px solid #896b4f', padding: '8px', background: '#ecece0', marginBottom: '16px'}}>
                      <h4 style={{fontSize: '14px', color: '#008000', marginBottom: '8px'}}>📊 DOWNLOAD STATISTICS</h4>
                      <div style={{fontSize: '12px', textAlign: 'left'}}>
                        <div>• Total Downloads: 1,247,892</div>
                        <div>• Most Popular: WinAmp v2.95 (342,156 downloads)</div>
                        <div>• Server Status: ONLINE</div>
                        <div>• Last Updated: December 1999</div>
                        <div>• Bandwidth Used: 47.3 GB this month</div>
                      </div>
                    </div>
                    
                    <div style={{border: '2px solid #ff0000', padding: '8px', background: '#ffe0e0', marginBottom: '16px'}}>
                      <h4 style={{fontSize: '14px', color: '#ff0000', marginBottom: '8px'}}>⚠️ IMPORTANT NOTICE</h4>
                      <div style={{fontSize: '12px', textAlign: 'left'}}>
                        <div>• All downloads are FREE and virus-free!</div>
                        <div>• Tested on Windows 95/98/ME</div>
                        <div>• Requires 16MB RAM minimum</div>
                        <div>• 56K modem recommended for faster downloads</div>
                        <div>• Don't forget to scan with your antivirus!</div>
                      </div>
                    </div>
                  </div>
                  
                  <UnderConstruction text="More downloads coming soon!" />
                </div>
              </div>
            )}

            {currentPage === 'webtoys' && (
              <div className="retro-border" style={{background: '#ecece0'}}>
                <div className="center">
                  <h2 className="font-large text-web-purple rainbow-text" style={{fontSize: '18px'}}>
                    * WEB TOYS SECTION *
                  </h2>
                  
                  <div style={{border: '4px outset #cdc7bb', padding: '12px', margin: '16px auto', maxWidth: '600px', background: '#ecece0'}}>
                    <h3 style={{fontSize: '16px', color: '#000080', marginBottom: '12px'}}>INTERACTIVE WEB TOYS!</h3>
                    <p style={{fontSize: '13px', marginBottom: '16px', textAlign: 'left'}}>
                      Welcome to the Web Toys section! Here you'll find all the cool interactive features that make this site awesome. 
                      Click around and discover all the hidden secrets and easter eggs!
                    </p>
                    
                    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px'}}>
                      <div>
                        <h4 style={{fontSize: '14px', color: '#ff0000', marginBottom: '8px'}}>🎮 GAMES & INTERACTIONS</h4>
                        <ul style={{fontSize: '12px', textAlign: 'left'}}>
                          <li><b>Snake Game</b> - Classic Nokia-style game!</li>
                          <li><b>Virtual Pet Tamagotchi</b> - Feed and care for your digital pet!</li>
                          <li><b>Konami Code Detector</b> - Try ↑↑↓↓←→←→BA!</li>
                          <li><b>System Crash Simulator</b> - Click popup ads!</li>
                          <li><b>Starfield Animation</b> - Secret keyboard trigger!</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 style={{fontSize: '14px', color: '#0000ff', marginBottom: '8px'}}>✨ VISUAL EFFECTS</h4>
                        <ul style={{fontSize: '12px', textAlign: 'left'}}>
                          <li><b>Cursor Trail Effects</b> - Rainbow sparkles follow your mouse!</li>
                          <li><b>Matrix Effect</b> - Full-screen Matrix-style animation!</li>
                          <li><b>Rainbow Text</b> - Animated rainbow colors!</li>
                          <li><b>Marquee Text Scroller</b> - Watch text scroll by!</li>
                          <li><b>Animated Under Construction</b> - Try the home page!</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div style={{border: '2px solid #896b4f', padding: '8px', background: '#ffff00', marginBottom: '16px'}}>
                      <h4 style={{fontSize: '14px', color: '#ff6600', marginBottom: '8px'}}>🎵 AUDIO & MUSIC</h4>
                      <ul style={{fontSize: '12px', textAlign: 'left'}}>
                        <li><b>MIDI Music Player</b> - Listen to HAMSTERDANCE.MID!</li>
                        <li><b>Dial-up Sound Simulator</b> - Hear the connection!</li>
                        <li><b>Background Music</b> - Auto-playing 90s tunes!</li>
                        <li><b>Sound Effects</b> - Various retro audio clips!</li>
                      </ul>
                    </div>
                    
                    <div style={{border: '2px solid #896b4f', padding: '8px', background: '#ecece0', marginBottom: '16px'}}>
                      <h4 style={{fontSize: '14px', color: '#008000', marginBottom: '8px'}}>📝 INTERACTIVE FEATURES</h4>
                      <ul style={{fontSize: '12px', textAlign: 'left'}}>
                        <li><b>Guestbook</b> - Leave funny messages!</li>
                        <li><b>Visitor Counter</b> - Watch numbers increment!</li>
                        <li><b>Dancing Baby GIF</b> - Triple-click for secrets!</li>
                        <li><b>Popup Ad Simulator</b> - Experience 90s popups!</li>
                        <li><b>Web Ring Navigator</b> - Browse the ring!</li>
                        <li><b>90s Trivia Quiz</b> - Test your knowledge!</li>
                      </ul>
                    </div>
                    
                    <div style={{border: '2px solid #ff0000', padding: '8px', background: '#ffe0e0', marginBottom: '16px'}}>
                      <h4 style={{fontSize: '14px', color: '#ff0000', marginBottom: '8px'}}>🎯 HOW TO TRIGGER EASTER EGGS</h4>
                      <div style={{fontSize: '12px', textAlign: 'left'}}>
                        <div>• Click any banner ad at the bottom of the page</div>
                        <div>• Use the Web Ring navigation buttons</div>
                        <div>• Click "Join the Ring" for Matrix effect</div>
                        <div>• Wait for "You've Got Mail" notification</div>
                        <div>• Triple-click the dancing baby</div>
                        <div>• Try typing "KONAMI" or "CONTRA"</div>
                        <div>• Click everything to find more secrets!</div>
                      </div>
                    </div>
                    
                    <div style={{border: '2px solid #896b4f', padding: '8px', background: '#e0f0ff', marginBottom: '16px'}}>
                      <h4 style={{fontSize: '14px', color: '#0000ff', marginBottom: '8px'}}>📊 WEB TOYS STATISTICS</h4>
                      <div style={{fontSize: '12px', textAlign: 'left'}}>
                        <div>• Total Easter Eggs Found: 15+</div>
                        <div>• Most Popular: Snake Game (2,847 plays)</div>
                        <div>• Cursor Trail Activations: 1,234</div>
                        <div>• Banner Ad Clicks: 5,678</div>
                        <div>• Guestbook Entries: 892</div>
                        <div>• Average Time on Site: 8 minutes</div>
                      </div>
                    </div>
                  </div>
                  
                  <UnderConstruction text="More web toys coming soon!" />
                </div>
              </div>
            )}

            {currentPage === 'about' && (
              <div className="retro-border" style={{background: '#ecece0'}}>
                <div className="center">
                  <h2 className="font-large text-web-green rainbow-text" style={{fontSize: '18px'}}>
                    * ABOUT THIS SITE *
                  </h2>
                  
                  <div style={{border: '4px outset #cdc7bb', padding: '12px', margin: '16px auto', maxWidth: '600px', background: '#ecece0'}}>
                    <h3 style={{fontSize: '16px', color: '#000080', marginBottom: '12px'}}>WELCOME TO NETSTALGIA!</h3>
                    <p style={{fontSize: '13px', textAlign: 'left', lineHeight: '1.4'}}>
                      Welcome to Netstalgia! This site is a tribute to the wild, weird, and wonderful web of the 1990s. 
                      Hand-coded in HTML 3.2, best viewed in Netscape Navigator, and packed with authentic retro features.
                    </p>
                    
                    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px'}}>
                      <div>
                        <h4 style={{fontSize: '14px', color: '#ff0000', marginBottom: '8px'}}>🎮 INTERACTIVE FEATURES</h4>
                        <ul style={{fontSize: '12px', textAlign: 'left'}}>
                          <li>Auto-playing MIDI background music</li>
                          <li>Popup advertisements (authentic 90s experience!)</li>
                          <li>Guestbook with local storage</li>
                          <li>Animated hit counter</li>
                          <li>Dancing baby with easter egg</li>
                          <li>Snake game and other retro games</li>
                          <li>Cursor trail effects</li>
                          <li>Matrix and starfield animations</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 style={{fontSize: '14px', color: '#0000ff', marginBottom: '8px'}}>🎨 VISUAL ELEMENTS</h4>
                        <ul style={{fontSize: '12px', textAlign: 'left'}}>
                          <li>Under construction banners</li>
                          <li>Marquee text animations</li>
                          <li>Secret keyboard shortcuts</li>
                          <li>Windows 95-style UI elements</li>
                          <li>Banner ad rotation system</li>
                          <li>Web ring navigation</li>
                          <li>"You've Got Mail" notifications</li>
                          <li>Rainbow text effects</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div style={{border: '2px solid #896b4f', padding: '8px', background: '#ffff00', marginBottom: '16px'}}>
                      <h4 style={{fontSize: '14px', color: '#ff6600', marginBottom: '8px'}}>⚙️ TECHNICAL DETAILS</h4>
                      <ul style={{fontSize: '12px', textAlign: 'left'}}>
                        <li>Built with Next.js 14 and React</li>
                        <li>TypeScript for type safety</li>
                        <li>Tailwind CSS for styling</li>
                        <li>LocalStorage for data persistence</li>
                        <li>Authentic 90s color palette and fonts</li>
                        <li>Component-based architecture</li>
                        <li>Responsive design principles</li>
                        <li>Cross-browser compatibility</li>
                      </ul>
                    </div>
                    
                    <div style={{border: '2px solid #896b4f', padding: '8px', background: '#ecece0', marginBottom: '16px'}}>
                      <h4 style={{fontSize: '14px', color: '#008000', marginBottom: '8px'}}>📊 SITE STATISTICS</h4>
                      <div style={{fontSize: '12px', textAlign: 'left'}}>
                        <div>• Site Created: December 1999</div>
                        <div>• Last Updated: Never!</div>
                        <div>• Total Visitors: 1,247,892</div>
                        <div>• Guestbook Entries: 892</div>
                        <div>• Easter Eggs Found: 15+</div>
                        <div>• Banner Ad Clicks: 5,678</div>
                        <div>• Average Time on Site: 8 minutes</div>
                        <div>• Y2K Compliance: 100%</div>
                      </div>
                    </div>
                    
                    <div style={{border: '2px solid #ff0000', padding: '8px', background: '#ffe0e0', marginBottom: '16px'}}>
                      <h4 style={{fontSize: '14px', color: '#ff0000', marginBottom: '8px'}}>🎯 SITE MISSION</h4>
                      <div style={{fontSize: '12px', textAlign: 'left'}}>
                        <div>This site exists to preserve the authentic experience of browsing the web in the late 1990s.</div>
                        <div>We believe in:</div>
                        <div>• Authentic 90s web design</div>
                        <div>• Interactive easter eggs and secrets</div>
                        <div>• Classic popup advertisements</div>
                        <div>• Retro gaming experiences</div>
                        <div>• Nostalgic user interfaces</div>
                        <div>• Preserving internet history</div>
                      </div>
                    </div>
                  </div>
                  
                  <UnderConstruction text="This page is always under construction!" />
                </div>
              </div>
            )}

            {currentPage === 'guestbook' && (
              <div className="retro-border" style={{background: '#ecece0'}}>
                <div className="center">
                  <h2 className="font-large text-web-magenta rainbow-text" style={{fontSize: '18px'}}>
                    * GUESTBOOK *
                  </h2>
                  
                  <div style={{border: '4px outset #cdc7bb', padding: '12px', margin: '16px auto', maxWidth: '600px', background: '#ecece0'}}>
                    <h3 style={{fontSize: '16px', color: '#000080', marginBottom: '12px'}}>SIGN MY GUESTBOOK!</h3>
                    <p style={{fontSize: '13px', textAlign: 'left', lineHeight: '1.4'}}>
                      Sign my guestbook and leave a message! This is where all the cool people hang out and share their thoughts about my awesome website. 
                      Don't forget to tell your friends about this totally radical site!
                    </p>
                    
                    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px'}}>
                      <div>
                        <h4 style={{fontSize: '14px', color: '#ff0000', marginBottom: '8px'}}>📝 GUESTBOOK FEATURES</h4>
                        <ul style={{fontSize: '12px', textAlign: 'left'}}>
                          <li>Leave your name and message</li>
                          <li>Messages saved locally</li>
                          <li>No spam protection (authentic 90s!)</li>
                          <li>View all previous entries</li>
                          <li>Chronological display</li>
                          <li>ASCII art signatures</li>
                          <li>Emoticon support :-)</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 style={{fontSize: '14px', color: '#0000ff', marginBottom: '8px'}}>🎯 GUESTBOOK RULES</h4>
                        <ul style={{fontSize: '12px', textAlign: 'left'}}>
                          <li>Be nice to other visitors</li>
                          <li>No spam or advertising</li>
                          <li>Keep messages family-friendly</li>
                          <li>Use cool 90s emoticons :-)</li>
                          <li>Tell your friends about this site!</li>
                          <li>Share your favorite 90s memories</li>
                          <li>Rate this site from 1-10 stars</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div style={{border: '2px solid #896b4f', padding: '8px', background: '#ffff00', marginBottom: '16px'}}>
                      <h4 style={{fontSize: '14px', color: '#ff6600', marginBottom: '8px'}}>📊 GUESTBOOK STATISTICS</h4>
                      <div style={{fontSize: '12px', textAlign: 'left'}}>
                        <div>• Total Entries: 892</div>
                        <div>• Most Active Day: Friday</div>
                        <div>• Average Rating: 9.5/10 stars</div>
                        <div>• Most Common Message: "Cool site!"</div>
                        <div>• International Visitors: 47 countries</div>
                        <div>• Longest Message: 1,247 characters</div>
                        <div>• Emoticon Usage: 73% of messages</div>
                      </div>
                    </div>
                    
                    <div style={{border: '2px solid #896b4f', padding: '8px', background: '#ecece0', marginBottom: '16px'}}>
                      <h4 style={{fontSize: '14px', color: '#008000', marginBottom: '8px'}}>💡 MESSAGE IDEAS</h4>
                      <div style={{fontSize: '12px', textAlign: 'left'}}>
                        <div>• "Cool site! :-)"</div>
                        <div>• "This reminds me of the 90s!"</div>
                        <div>• "I love the dancing baby!"</div>
                        <div>• "The popup ads are so authentic!"</div>
                        <div>• "This site is totally tubular!"</div>
                        <div>• "I found all the easter eggs!"</div>
                        <div>• "The guestbook is awesome!"</div>
                        <div>• "I'll tell all my friends about this!"</div>
                      </div>
                    </div>
                    
                    <div style={{border: '2px solid #ff0000', padding: '8px', background: '#ffe0e0', marginBottom: '16px'}}>
                      <h4 style={{fontSize: '14px', color: '#ff0000', marginBottom: '8px'}}>⚠️ IMPORTANT NOTICE</h4>
                      <div style={{fontSize: '12px', textAlign: 'left'}}>
                        <div>• Messages are saved in your browser (localStorage)</div>
                        <div>• Messages will be lost if you clear your browser data</div>
                        <div>• No server-side storage (authentic 90s!)</div>
                        <div>• Maximum message length: 500 characters</div>
                        <div>• Guestbook is moderated by the webmaster</div>
                        <div>• Inappropriate messages will be deleted</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Web Ring Navigation - Always Visible */}
            <div className="webring mt-4" style={{background: '#ecece0'}}>
              <div className="rainbow-text font-large" style={{fontSize: '14px'}}>
                * 90s WEB RING EXTRAVAGANZA! *
              </div>
              <div style={{fontSize: '10px'}}>
                <a href="https://web.archive.org/web/19961219120000/http://www.webring.org/" target="_blank">&lt;&lt; PREVIOUS AWESOME SITE</a> | 
                <a href="https://web.archive.org/web/19961219120000/http://www.webring.org/" target="_blank"> RANDOM COOL PAGE </a> | 
                <a href="https://web.archive.org/web/19961219120000/http://www.webring.org/" target="_blank">NEXT RADICAL SITE &gt;&gt;</a>
              </div>
              <div className="font-small text-web-purple mt-1" style={{fontSize: '9px'}}>
                <a href="https://web.archive.org/web/19961219120000/http://www.webring.org/" target="_blank">JOIN ALL 47 WEB RINGS!</a> | 
                <a href="https://web.archive.org/web/19961219120000/http://www.webring.org/" target="_blank">SUBMIT YOUR SITE!</a> | 
                <a href="https://web.archive.org/web/19961219120000/http://www.webring.org/" target="_blank">RING MASTER INFO!</a>
              </div>
            </div>
          </td>

          {/* Right Sidebar - Always Visible */}
          <td width="250" valign="top">
            <div className="retro-border" style={{background: '#ecece0'}}>
              <Guestbook />
            </div>

            <div className="retro-border mt-4" style={{background: '#ecece0'}}>
              <h3 className="font-normal text-web-purple center" style={{fontSize: '11px'}}>* NOW PLAYING *</h3>
              <div className="center font-small">
                <div className="blink" style={{fontSize: '9px'}}>* HAMSTERDANCE.MID *</div>
                <div style={{fontSize: '9px'}}>128 KBPS CD QUALITY!</div>
                <div style={{fontSize: '9px'}}>DOWNLOADED FROM NAPSTER!</div>
                <div className="text-web-red" style={{fontSize: '9px'}}>RIAA CAN'T STOP US!</div>
                <div style={{fontSize: '9px'}}>BITRATE: 128 KBPS</div>
                <div style={{fontSize: '9px'}}>FORMAT: MP3 (ILLEGAL!)</div>
                <div style={{fontSize: '9px'}}>SIZE: 2.3 MB</div>
                <div style={{fontSize: '9px'}}>PLAYTIME: 3:45</div>
              </div>
            </div>

            <div className="retro-border mt-4" style={{background: '#ecece0', border: '3px solid #896b4f'}}>
              <h3 className="font-normal center text-web-magenta" style={{fontSize: '11px'}}>* FREE DOWNLOADS! *</h3>
              <div className="center font-small">
                <div className="text-web-blue" style={{fontSize: '9px'}}><a href="https://web.archive.org/web/19961219120000/http://www.bonzi.com/" target="_blank">* Bonzi Buddy v3.0! *</a></div>
                <div className="text-web-red" style={{fontSize: '9px'}}><a href="https://web.archive.org/web/19961219120000/http://www.microsoft.com/games/" target="_blank">* 3D Pinball Space Cadet! *</a></div>
                <div className="text-web-green" style={{fontSize: '9px'}}><a href="https://web.archive.org/web/19961219120000/http://www.berkeley.com/" target="_blank">* Flying Toasters Screensaver! *</a></div>
                <div className="text-web-purple" style={{fontSize: '9px'}}><a href="https://web.archive.org/web/19961219120000/http://www.winamp.com/" target="_blank">* WinAmp v2.95 Full! *</a></div>
                <div className="text-web-cyan" style={{fontSize: '9px'}}><a href="https://web.archive.org/web/19961219120000/http://www.real.com/" target="_blank">* Real Player GOLD! *</a></div>
                <div className="text-web-yellow" style={{fontSize: '9px'}}><a href="https://web.archive.org/web/19961219120000/http://www.napster.com/" target="_blank">* Napster 2.0! *</a></div>
                <div className="text-web-magenta" style={{fontSize: '9px'}}><a href="https://web.archive.org/web/19961219120000/http://www.icq.com/" target="_blank">* ICQ 99a! *</a></div>
                <div className="text-web-orange" style={{fontSize: '9px'}}><a href="https://web.archive.org/web/19961219120000/http://www.mozilla.org/" target="_blank">* Mozilla 1.0! *</a></div>
              </div>
            </div>

            {/* Easter Egg/Secret Instructions Section */}
            <div className="retro-border mt-4" style={{background: '#ecece0'}}>
              <h3 className="font-normal text-web-purple center" style={{fontSize: '11px'}}>* SECRET EASTER EGGS! *</h3>
              <div style={{
                border: '2px inset #cdc7bb',
                padding: '8px',
                margin: '8px 0',
                background: '#ffffff',
                fontSize: '9px',
                textAlign: 'center',
                color: '#000080'
              }}>
                <strong>SECRET EASTER EGGS:</strong><br/>
                • Triple-click the dancing baby!<br/>
                • Try the Konami Code: ↑↑↓↓←→←→BA<br/>
                • Type "KONAMI" or "CONTRA" or "NINTENDO"<br/>
                • Click everything to find more secrets!<br/>
                • Easter eggs found: {easterEggCount}
            </div>
          </div>

            {/* New 90s Image Gallery */}
            <div className="retro-border mt-4" style={{background: '#ecece0'}}>
              <h3 className="font-normal center text-web-green" style={{fontSize: '11px'}}>* COOL 90s STUFF! *</h3>
              <div className="center">
                <div className="vintage-image">
                  <img 
                    src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='60' viewBox='0 0 80 60'><rect width='80' height='60' fill='%23ff00ff'/><text x='40' y='35' text-anchor='middle' fill='white' font-size='8' font-family='Arial'>TAMAGOTCHI</text></svg>" 
                    alt="Tamagotchi" 
                    style={{width: '80px', height: '60px'}}
                  />
                </div>
                <div className="vintage-image">
                  <img 
                    src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='60' viewBox='0 0 80 60'><rect width='80' height='60' fill='%2300ffff'/><text x='40' y='35' text-anchor='middle' fill='white' font-size='8' font-family='Arial'>GAME BOY</text></svg>" 
                    alt="Game Boy" 
                    style={{width: '80px', height: '60px'}}
                  />
                </div>
                <div className="vintage-image">
                  <img 
                    src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='60' viewBox='0 0 80 60'><rect width='80' height='60' fill='%23ffff00'/><text x='40' y='35' text-anchor='middle' fill='black' font-size='8' font-family='Arial'>FLOPPY</text></svg>" 
                    alt="Floppy Disk" 
                    style={{width: '80px', height: '60px'}}
                  />
                </div>
                <div className="vintage-image">
                  <img 
                    src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='60' viewBox='0 0 80 60'><rect width='80' height='60' fill='%23ff0000'/><text x='40' y='35' text-anchor='middle' fill='white' font-size='8' font-family='Arial'>POKEMON</text></svg>" 
                    alt="Pokemon" 
                    style={{width: '80px', height: '60px'}}
                  />
                </div>
                <div className="vintage-image">
                  <img 
                    src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='60' viewBox='0 0 80 60'><rect width='80' height='60' fill='%2300ff00'/><text x='40' y='35' text-anchor='middle' fill='white' font-size='8' font-family='Arial'>BEANIE</text></svg>" 
                    alt="Beanie Babies" 
                    style={{width: '80px', height: '60px'}}
                  />
                </div>
                <div className="vintage-image">
                  <img 
                    src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='60' viewBox='0 0 80 60'><rect width='80' height='60' fill='%230000ff'/><text x='40' y='35' text-anchor='middle' fill='white' font-size='8' font-family='Arial'>TITANIC</text></svg>" 
                    alt="Titanic" 
                    style={{width: '80px', height: '60px'}}
                  />
                </div>
              </div>
            </div>

            {/* Hidden Easter Egg - Click on images */}
            <div className="mt-4" style={{border: '2px solid #896b4f', padding: '4px', background: '#ecece0', cursor: 'pointer'}} onClick={() => {
              alert('🎉 IMAGE EASTER EGG! 🎉\n\nYou clicked on the 90s image gallery!\n\nThese represent:\n• Tamagotchi - Virtual pets (1996)\n• Game Boy - Portable gaming\n• Floppy Disk - 1.44MB storage\n• Pokemon - Red/Blue (1996)\n• Beanie Babies - Collecting craze\n• Titanic - Movie & song (1997)\n\nYou\'re exploring like a true 90s kid! 🌟')
            }}>
              <div className="center font-small text-web-blue" style={{fontSize: '9px'}}>
                * CLICK IMAGES FOR SECRET! *
              </div>
            </div>
          </td>
        </tr>
      </table>

      {/* Bottom Banner Ads */}
      <BannerAds />
      
      {/* Footer - Always Visible */}
      <div className="center mt-4">
        <hr style={{border: '3px outset #cdc7bb'}} />
        
        <div className="font-small" style={{background: '#ecece0', padding: '8px', border: '2px solid #896b4f'}}>
          <div className="mb-2 rainbow-text font-large" style={{fontSize: '16px'}}>
            <strong>© 1999 NETSTALGIA BBS - ALL RIGHTS RESERVED</strong>
          </div>
          <div className="text-web-red mb-2 font-normal" style={{fontSize: '13px'}}>
            * LAST UPDATED: NEVER! Y2K COMPLIANT FOREVER! *
          </div>
          <div className="mb-2" style={{fontSize: '12px'}}>
            HAND-CODED WITH NOTEPAD.EXE & HTML 3.2<br/>
            PROUDLY HOSTED ON GEOCITIES FREE HOSTING!<br/>
            THIS SITE IS MOSAIC & LYNX COMPATIBLE!<br/>
            BEST VIEWED ON PENTIUM 133MHz OR FASTER!
          </div>

          <div style={{border: '4px outset #cdc7bb', padding: '8px', display: 'inline-block', background: '#ffff00'}}>
            <div className="font-normal" style={{fontSize: '13px'}}>
              <a href="https://web.archive.org/web/19961219120000/http://www.webring.org/" target="_blank">&lt;&lt; PREVIOUS COOL SITE</a> | 
              <strong> RANDOM AWESOME PAGE </strong> | 
              <a href="https://web.archive.org/web/19961219120000/http://www.webring.org/" target="_blank">NEXT RADICAL SITE &gt;&gt;</a>
            </div>
            <div className="font-small" style={{fontSize: '11px'}}>
              [ JOIN THE 90s WEB RING REVOLUTION! ]
            </div>
          </div>
        </div>
        
        <div className="mt-4 font-small text-web-gray" style={{
          border: '2px outset #cdc7bb',
          padding: '8px',
          background: 'linear-gradient(45deg, #ecece0 0%, #cdc7bb 50%, #ecece0 100%)',
          borderRadius: '4px',
          boxShadow: 'inset 1px 1px 2px rgba(255,255,255,0.5), 1px 1px 2px rgba(0,0,0,0.2)'
        }}>
          <div style={{fontSize: '12px', fontWeight: 'bold', marginBottom: '8px'}}>Best viewed with:</div>
          <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap'}}>
            <div style={{
              border: '2px outset #cdc7bb',
              padding: '4px 8px',
              background: 'linear-gradient(45deg, #000080 0%, #0066cc 50%, #000080 100%)',
              borderRadius: '4px',
              cursor: 'pointer'
            }}>
              <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='20' viewBox='0 0 120 20'><rect width='120' height='20' fill='%23000080'/><text x='60' y='13' text-anchor='middle' fill='white' font-size='10' font-family='Arial'>NETSCAPE NAVIGATOR</text></svg>" alt="Best viewed with Netscape" style={{verticalAlign: 'middle'}} />
            </div>
            <div style={{
              border: '2px outset #cdc7bb',
              padding: '4px 8px',
              background: 'linear-gradient(45deg, #0066cc 0%, #0099ff 50%, #0066cc 100%)',
              borderRadius: '4px',
              cursor: 'pointer'
            }}>
              <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='20' viewBox='0 0 120 20'><rect width='120' height='20' fill='%230066cc'/><text x='60' y='13' text-anchor='middle' fill='white' font-size='10' font-family='Arial'>INTERNET EXPLORER</text></svg>" alt="Best viewed with IE" style={{verticalAlign: 'middle'}} />
            </div>
            <div style={{
              border: '2px outset #cdc7bb',
              padding: '4px 8px',
              background: 'linear-gradient(45deg, #ff6600 0%, #ff9900 50%, #ff6600 100%)',
              borderRadius: '4px',
              cursor: 'pointer'
            }}>
              <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='20' viewBox='0 0 120 20'><rect width='120' height='20' fill='%23ff6600'/><text x='60' y='13' text-anchor='middle' fill='white' font-size='10' font-family='Arial'>MOZILLA FIREFOX</text></svg>" alt="Best viewed with Firefox" style={{verticalAlign: 'middle'}} />
            </div>
          </div>
          <div style={{fontSize: '10px', marginTop: '8px', textAlign: 'center'}}>
            * 800x600 resolution recommended * | * 56K modem friendly * | * Y2K compliant *
          </div>
        </div>
      </div>

      {/* Easter Egg Modal */}
      {showEasterEgg && (
        <EasterEggModal onClose={() => setShowEasterEgg(false)} />
      )}
    </main>
  )
} 