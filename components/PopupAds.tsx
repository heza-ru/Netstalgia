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
  },
  // NEW AUTHENTIC 90s AD TEMPLATES
  {
    title: 'REAL PLAYER GOLD!',
    content: '* STREAMING MEDIA REVOLUTION! *\n\nWATCH VIDEOS ONLINE!\nLISTEN TO RADIO STATIONS!\n\nDOWNLOAD REALPLAYER NOW!\n\n(Buffering... Please wait...)',
    style: 'media'
  },
  {
    title: 'WINAMP SKINS GALORE!',
    content: '* CUSTOMIZE YOUR PLAYER! *\n\n1000+ WINAMP SKINS!\n• Alien\n• Matrix\n• Tribal\n• Metallic\n\nIT REALLY WHIPS THE LLAMA\'S ASS!\n\n(Download now!)',
    style: 'skins'
  },
  {
    title: 'BEANIE BABY COLLECTOR!',
    content: '* RARE BEANIE BABIES! *\n\nPRINCESS BEAR - $5000!\nPEANUT THE ELEPHANT!\nTABASCO THE BULL!\n\nCOLLECT THEM ALL!\n\n(Investment opportunity!)',
    style: 'collectibles'
  },
  {
    title: 'POKEMON CARD TRADING!',
    content: '* GOTTA CATCH \'EM ALL! *\n\nHOLOGRAPHIC CHARIZARD!\nFIRST EDITION CARDS!\nJAPANESE IMPORTS!\n\nTRADE ONLINE NOW!\n\n(Ash approved!)',
    style: 'pokemon'
  },
  {
    title: 'TAMAGOTCHI VIRTUAL PET!',
    content: '* YOUR DIGITAL COMPANION! *\n\nFEED, PLAY, AND CARE!\nDON\'T LET IT DIE!\n\nORDER YOUR TAMAGOTCHI!\n\n(Batteries not included)',
    style: 'tamagotchi'
  },
  {
    title: 'DIAL-UP INTERNET SPEED!',
    content: '* BLAZING FAST 56K! *\n\nUPGRADE FROM 28.8K!\nDOWNLOAD FASTER!\nSURF THE WEB!\n\nCALL 1-800-DIALUP!\n\n(Connection not guaranteed)',
    style: 'dialup'
  },
  {
    title: 'CD-ROM GAMES 50-PACK!',
    content: '* 50 GAMES ON ONE CD! *\n\n• Solitaire Collection\n• Minesweeper Pro\n• Pinball Madness\n• Tetris Clone\n\nHOURS OF ENTERTAINMENT!\n\n(Requires Windows 95)',
    style: 'cdrom'
  },
  {
    title: 'LEARN HTML IN 24 HOURS!',
    content: '* BECOME A WEBMASTER! *\n\nCREATE YOUR OWN WEBSITE!\nHTML, CSS, JAVASCRIPT!\n\nBOOK + CD-ROM COMBO!\n\n(Geocities ready!)',
    style: 'education'
  },
  {
    title: 'FLOPPY DISK STORAGE!',
    content: '* 100-PACK FLOPPY DISKS! *\n\n1.44MB EACH!\nHIGH DENSITY!\nIBM COMPATIBLE!\n\nSTORE YOUR FILES!\n\n(Lifetime warranty!)',
    style: 'storage'
  },
  {
    title: 'ENCARTA ENCYCLOPEDIA!',
    content: '* MICROSOFT ENCARTA 99! *\n\nMILLIONS OF ARTICLES!\nMULTIMEDIA CONTENT!\nVIRTUAL TOURS!\n\nKNOWLEDGE AT YOUR FINGERTIPS!\n\n(4 CD-ROM set)',
    style: 'encyclopedia'
  },
  {
    title: 'DANCING BABY SCREENSAVER!',
    content: '* THE FAMOUS DANCING BABY! *\n\nAS SEEN ON ALLY MCBEAL!\n3D ANIMATED!\nMUSIC INCLUDED!\n\nDOWNLOAD NOW!\n\n(Cha-cha-cha!)',
    style: 'dancingbaby'
  },
  {
    title: 'INTERNET EXPLORER 4.0!',
    content: '* BROWSE THE WEB BETTER! *\n\nACTIVE DESKTOP!\nCHANNEL BAR!\nFASTER RENDERING!\n\nUPGRADE FROM NETSCAPE!\n\n(The browser wars!)',
    style: 'browser'
  },
  {
    title: 'MIDI MUSIC COLLECTION!',
    content: '* 10,000 MIDI FILES! *\n\nCLASSIC ROCK!\nPOP HITS!\nVIDEO GAME THEMES!\n\nTINY FILE SIZES!\n\n(Perfect for websites!)',
    style: 'midi'
  },
  {
    title: 'WEBCAM TECHNOLOGY!',
    content: '* CONNECTIX QUICKCAM! *\n\nVIDEO CHAT ONLINE!\n320x240 RESOLUTION!\nUSB CONNECTION!\n\nSEE AND BE SEEN!\n\n(Future is here!)',
    style: 'webcam'
  },
  {
    title: 'DOOM LEVEL EDITOR!',
    content: '* CREATE CUSTOM LEVELS! *\n\nDOOM WAD EDITOR!\nUNLIMITED POSSIBILITIES!\nSHARE WITH FRIENDS!\n\nBUILD YOUR NIGHTMARE!\n\n(Demons not included)',
    style: 'doomeditor'
  },
  {
    title: 'QUAKE CLAN RECRUITMENT!',
    content: '* JOIN [FRAG] CLAN! *\n\nPRO QUAKE PLAYERS!\nTOURNAMENT READY!\nTEAMSPEAK REQUIRED!\n\nAPPLY NOW!\n\n(Rocket launcher skills needed)',
    style: 'clan'
  },
  {
    title: 'STARCRAFT STRATEGY GUIDE!',
    content: '* MASTER ALL 3 RACES! *\n\nTERRAN TACTICS!\nZERG RUSH STRATEGIES!\nPROTOSS BUILDS!\n\nDOMINATE BATTLE.NET!\n\n(Spawn more overlords!)',
    style: 'strategy'
  },
  {
    title: 'WINDOWS 98 UPGRADE!',
    content: '* UPGRADE FROM WINDOWS 95! *\n\nUSB SUPPORT!\nFAT32 FILE SYSTEM!\nINTERNET EXPLORER 4!\n\nORDER YOUR COPY!\n\n(Blue screen not included)',
    style: 'windows98'
  },
  {
    title: 'DIGITAL CAMERA REVOLUTION!',
    content: '* KODAK DC40 CAMERA! *\n\n756x504 RESOLUTION!\n48 PHOTOS STORAGE!\nSERIAL CONNECTION!\n\nNO MORE FILM!\n\n(Batteries sold separately)',
    style: 'camera'
  },
  {
    title: 'PENTIUM II PROCESSOR!',
    content: '* BLAZING 300MHz SPEED! *\n\nMMX TECHNOLOGY!\n512KB CACHE!\nSLOT 1 DESIGN!\n\nUPGRADE YOUR PC!\n\n(Faster than Pentium!)',
    style: 'processor'
  },
  // ADDITIONAL AUTHENTIC 90s REFERENCES
  {
    title: 'IOMEGA ZIP DRIVE!',
    content: '* 100MB REMOVABLE STORAGE! *\n\nBEAT THE FLOPPY!\nPARALLEL PORT CONNECTION!\nPC & MAC COMPATIBLE!\n\nSTORE YOUR LIFE!\n\n(Click of death not included)',
    style: 'storage'
  },
  {
    title: 'SOUND BLASTER 16!',
    content: '* 16-BIT AUDIO QUALITY! *\n\nWAVETABLE SYNTHESIS!\nFULL DUPLEX!\nGAME PORT INCLUDED!\n\nHEAR THE DIFFERENCE!\n\n(IRQ conflicts sold separately)',
    style: 'audio'
  },
  {
    title: 'VOODOO GRAPHICS CARD!',
    content: '* 3D ACCELERATION! *\n\nGLIDE API SUPPORT!\nQUAKE READY!\n4MB TEXTURE MEMORY!\n\nFEEL THE POWER!\n\n(AGP slot required)',
    style: 'graphics'
  }
]

export default function PopupAds({ onSystemCrash }: PopupAdsProps) {
  const [popups, setPopups] = useState<PopupAd[]>([])

  // Authentic 90s popup sound effects
  const playPopupSound = () => {
    try {
      // Create authentic 90s popup sound using Web Audio API
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      // Windows 95 style popup sound (ascending beep)
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
      oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.1)

      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.2)
    } catch (error) {
      console.log('Audio not supported:', error)
    }
  }

  const playCloseSound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      // Windows 95 style close sound (descending beep)
      oscillator.frequency.setValueAtTime(600, audioContext.currentTime)
      oscillator.frequency.exponentialRampToValueAtTime(300, audioContext.currentTime + 0.15)

      gainNode.gain.setValueAtTime(0.08, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.15)
    } catch (error) {
      console.log('Audio not supported:', error)
    }
  }

  const playErrorSound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      // Windows 95 error sound (harsh beep)
      oscillator.frequency.setValueAtTime(200, audioContext.currentTime)
      oscillator.type = 'square'

      gainNode.gain.setValueAtTime(0.15, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.3)
    } catch (error) {
      console.log('Audio not supported:', error)
    }
  }

  // Create urgent popup that's extra annoying
  const createUrgentPopup = () => {
    const urgentTemplates = [
      {
        title: '🚨 SYSTEM CRITICAL ERROR! 🚨',
        content: '⚠️ IMMEDIATE ACTION REQUIRED! ⚠️\n\nYOUR COMPUTER IS AT RISK!\nVIRUSES DETECTED: 47\nTROJANS DETECTED: 23\nSPYWARE DETECTED: 156\n\nCLICK YES TO CLEAN NOW!\n\n(This is definitely not fake)',
        style: 'virus'
      },
      {
        title: '💰 LAST CHANCE - $1,000,000! 💰',
        content: '🎰 FINAL LOTTERY DRAWING! 🎰\n\nYOU ARE THE WINNER!\nPRIZE: $1,000,000 CASH!\nTIME REMAINING: 00:00:30\n\nCLICK YES BEFORE TIME RUNS OUT!\n\n(Definitely not a scam)',
        style: 'lottery'
      },
      {
        title: '🔥 COMPUTER OVERHEATING! 🔥',
        content: '🌡️ TEMPERATURE CRITICAL! 🌡️\n\nCPU: 97°C (DANGER!)\nHARD DRIVE: 89°C (FAILING!)\nRAM: 76°C (UNSTABLE!)\n\nCLICK YES TO COOL DOWN!\n\n(Your computer will explode)',
        style: 'warning'
      }
    ]

    const template = urgentTemplates[Math.floor(Math.random() * urgentTemplates.length)]
    const urgentPopup: PopupAd = {
      id: Date.now().toString() + '_urgent',
      title: template.title,
      content: template.content,
      style: template.style,
      x: (window.innerWidth - 320) / 2, // Center for maximum annoyance
      y: (window.innerHeight - 280) / 2
    }

    setPopups(prev => [...prev, urgentPopup])

    // Play multiple error sounds for urgency
    playErrorSound()
    setTimeout(() => playErrorSound(), 200)
    setTimeout(() => playErrorSound(), 400)
  }

  useEffect(() => {
    const createPopup = () => {
      console.log('createPopup called, current popups:', popups.length)
      if (popups.length >= 4) {
        console.log('Max popups reached, not creating new popup')
        return // Allow more concurrent popups for chaos
      }

      const template = AD_TEMPLATES[Math.floor(Math.random() * AD_TEMPLATES.length)]
      console.log('Creating popup with template:', template.title)

      // Enhanced positioning algorithm - more realistic 90s popup behavior
      const getRealisticPosition = () => {
        const popupWidth = 320
        const popupHeight = 280
        const safeWidth = window.innerWidth - popupWidth
        const safeHeight = window.innerHeight - popupHeight

        // 90s popups often appeared in specific patterns
        const positionTypes = [
          'center', 'top-left', 'top-right', 'bottom-left', 'bottom-right',
          'cascade', 'random', 'edge'
        ]
        const positionType = positionTypes[Math.floor(Math.random() * positionTypes.length)]

        switch (positionType) {
          case 'center':
            return {
              x: (window.innerWidth - popupWidth) / 2 + (Math.random() - 0.5) * 100,
              y: (window.innerHeight - popupHeight) / 2 + (Math.random() - 0.5) * 100
            }
          case 'top-left':
            return { x: Math.random() * 200, y: Math.random() * 150 }
          case 'top-right':
            return { x: safeWidth - Math.random() * 200, y: Math.random() * 150 }
          case 'bottom-left':
            return { x: Math.random() * 200, y: safeHeight - Math.random() * 150 }
          case 'bottom-right':
            return { x: safeWidth - Math.random() * 200, y: safeHeight - Math.random() * 150 }
          case 'cascade':
            // Cascade effect - each popup slightly offset from previous
            const offset = popups.length * 30
            return {
              x: Math.min(100 + offset, safeWidth - 50),
              y: Math.min(100 + offset, safeHeight - 50)
            }
          case 'edge':
            // Sometimes popups appeared at screen edges (annoying!)
            const edge = Math.random() < 0.5 ? 'horizontal' : 'vertical'
            if (edge === 'horizontal') {
              return {
                x: Math.random() < 0.5 ? 0 : safeWidth,
                y: Math.random() * safeHeight
              }
            } else {
              return {
                x: Math.random() * safeWidth,
                y: Math.random() < 0.5 ? 0 : safeHeight
              }
            }
          default:
            return { x: Math.random() * safeWidth, y: Math.random() * safeHeight }
        }
      }

      const position = getRealisticPosition()

      const popup: PopupAd = {
        id: Date.now().toString(),
        title: template.title,
        content: template.content,
        style: template.style,
        x: Math.max(0, Math.min(position.x, window.innerWidth - 320)),
        y: Math.max(0, Math.min(position.y, window.innerHeight - 280))
      }

      console.log('Adding popup to state:', popup)
      setPopups(prev => {
        const newPopups = [...prev, popup]
        console.log('New popups array:', newPopups)

        // Play popup sound when new popup appears
        playPopupSound()

        return newPopups
      })
    }

    // Enhanced timing algorithm - more realistic 90s popup behavior
    const getRandomDelay = (isFirst = false) => {
      if (isFirst) {
        // First popup appears sooner for better user experience
        return 10000 + Math.random() * 10000 // 10-20 seconds
      }
      // 90s popups had unpredictable timing
      const baseDelay = 30000 // 30 seconds base
      const variation = Math.random() * 20000 // ±20 seconds variation
      const urgencyMultiplier = popups.length > 2 ? 0.7 : 1 // More popups = faster spawning
      return (baseDelay + variation) * urgencyMultiplier
    }

    // First popup with shorter delay for better UX (immediate for testing)
    const firstTimer = setTimeout(() => {
      console.log('Creating first popup...')
      createPopup()
    }, 5000) // 5 seconds for testing

    // Variable interval timing - more authentic chaos
    let intervalTimer: NodeJS.Timeout
    const scheduleNextPopup = () => {
      intervalTimer = setTimeout(() => {
        createPopup()

        // Enhanced chaos: 15% chance of creating multiple popups at once
        if (Math.random() < 0.15 && popups.length < 3) {
          setTimeout(() => createPopup(), 200)
          if (Math.random() < 0.5) {
            setTimeout(() => createPopup(), 400)
          }
        }

        // 10% chance of creating an urgent popup
        if (Math.random() < 0.1) {
          setTimeout(() => createUrgentPopup(), 1000)
        }

        scheduleNextPopup() // Schedule the next one with new random timing
      }, getRandomDelay(false))
    }

    scheduleNextPopup()

    return () => {
      clearTimeout(firstTimer)
      clearTimeout(intervalTimer)
    }
  }, [popups.length])

  const closePopup = (id: string) => {
    // Play close sound
    playCloseSound()

    setPopups(prev => prev.filter(popup => popup.id !== id))

    // Enhanced resurrection behavior - 25% chance popup comes back
    if (Math.random() < 0.25) {
      setTimeout(() => {
        const template = AD_TEMPLATES[Math.floor(Math.random() * AD_TEMPLATES.length)]

        // Enhanced positioning for resurrected popups - more annoying locations
        const annoyingPositions = [
          { x: 0, y: 0 }, // Top-left corner
          { x: window.innerWidth - 320, y: 0 }, // Top-right corner
          { x: 0, y: window.innerHeight - 280 }, // Bottom-left corner
          { x: window.innerWidth - 320, y: window.innerHeight - 280 }, // Bottom-right corner
          { x: (window.innerWidth - 320) / 2, y: (window.innerHeight - 280) / 2 } // Dead center
        ]
        const position = annoyingPositions[Math.floor(Math.random() * annoyingPositions.length)]

        const newPopup: PopupAd = {
          id: Date.now().toString(),
          title: '👻 POPUP RESURRECTION: ' + template.title,
          content: template.content + '\n\n👻 I\'M BAAAACK!\n🚫 YOU CANNOT ESCAPE THE ADS!\n⚠️ THIS IS YOUR FINAL WARNING!\n💀 RESISTANCE IS FUTILE!',
          style: template.style,
          x: Math.max(0, Math.min(position.x, window.innerWidth - 320)),
          y: Math.max(0, Math.min(position.y, window.innerHeight - 280))
        }

        setPopups(prev => [...prev, newPopup])

        // Play error sound for resurrection
        playErrorSound()
      }, 2000 + Math.random() * 3000) // 2-5 seconds delay
    }
  }

  const handleYesClick = (clickedPopup: PopupAd) => {
    // Enhanced cascading popup effects before system crash
    const cascadeCount = Math.floor(Math.random() * 3) + 2 // 2-4 cascade popups

    for (let i = 0; i < cascadeCount; i++) {
      setTimeout(() => {
        const template = AD_TEMPLATES[Math.floor(Math.random() * AD_TEMPLATES.length)]
        const cascadePopup: PopupAd = {
          id: Date.now().toString() + '_cascade_' + i,
          title: '🚨 SYSTEM ALERT: ' + template.title,
          content: template.content + '\n\n⚠️ WARNING: SYSTEM OVERLOAD!\n⚠️ MULTIPLE PROCESSES DETECTED!\n⚠️ CLICK YES TO CONTINUE!',
          style: template.style,
          x: Math.min(clickedPopup.x + (i * 40), window.innerWidth - 320),
          y: Math.min(clickedPopup.y + (i * 40), window.innerHeight - 280)
        }

        setPopups(prev => [...prev, cascadePopup])

        // Play popup sound effect
        playPopupSound()
      }, i * 500) // Stagger the cascade
    }

    // Trigger system crash after cascade completes
    setTimeout(() => {
      onSystemCrash()
    }, cascadeCount * 500 + 1000)
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
      // NEW 90s AD STYLES
      case 'media':
        return {
          titlebar: { background: 'linear-gradient(45deg, #ff3300, #ff6600, #ff3300)', color: '#ffffff' },
          content: { background: 'linear-gradient(45deg, #ffcccc, #ffddcc)', border: '3px outset #ff3300' },
          button: { background: 'linear-gradient(45deg, #ff6600, #ff3300)', color: '#ffffff' }
        }
      case 'skins':
        return {
          titlebar: { background: 'linear-gradient(45deg, #cc00cc, #ff33ff, #cc00cc)', color: '#ffffff' },
          content: { background: 'linear-gradient(45deg, #ffccff, #ffddff)', border: '3px outset #cc00cc' },
          button: { background: 'linear-gradient(45deg, #ff33ff, #cc00cc)', color: '#ffffff' }
        }
      case 'collectibles':
        return {
          titlebar: { background: 'linear-gradient(45deg, #ffcc00, #ffff33, #ffcc00)', color: '#000000' },
          content: { background: 'linear-gradient(45deg, #ffffcc, #ffffdd)', border: '3px outset #ffcc00' },
          button: { background: 'linear-gradient(45deg, #ffff33, #ffcc00)', color: '#000000' }
        }
      case 'pokemon':
        return {
          titlebar: { background: 'linear-gradient(45deg, #ffcc00, #ff0000, #ffcc00)', color: '#ffffff' },
          content: { background: 'linear-gradient(45deg, #ffffcc, #ffcccc)', border: '3px outset #ff0000' },
          button: { background: 'linear-gradient(45deg, #ff0000, #cc0000)', color: '#ffffff' }
        }
      case 'tamagotchi':
        return {
          titlebar: { background: 'linear-gradient(45deg, #ff99cc, #ffccff, #ff99cc)', color: '#000000' },
          content: { background: 'linear-gradient(45deg, #ffccff, #ffffcc)', border: '3px outset #ff99cc' },
          button: { background: 'linear-gradient(45deg, #ffccff, #ff99cc)', color: '#000000' }
        }
      case 'dialup':
        return {
          titlebar: { background: 'linear-gradient(45deg, #0033cc, #0066ff, #0033cc)', color: '#ffffff' },
          content: { background: 'linear-gradient(45deg, #ccddff, #cceeff)', border: '3px outset #0033cc' },
          button: { background: 'linear-gradient(45deg, #0066ff, #0033cc)', color: '#ffffff' }
        }
      case 'cdrom':
        return {
          titlebar: { background: 'linear-gradient(45deg, #666666, #999999, #666666)', color: '#ffffff' },
          content: { background: 'linear-gradient(45deg, #dddddd, #eeeeee)', border: '3px outset #666666' },
          button: { background: 'linear-gradient(45deg, #999999, #666666)', color: '#ffffff' }
        }
      case 'education':
        return {
          titlebar: { background: 'linear-gradient(45deg, #003366, #0066cc, #003366)', color: '#ffffff' },
          content: { background: 'linear-gradient(45deg, #ccddff, #ddeeff)', border: '3px outset #003366' },
          button: { background: 'linear-gradient(45deg, #0066cc, #003366)', color: '#ffffff' }
        }
      case 'storage':
        return {
          titlebar: { background: 'linear-gradient(45deg, #333333, #666666, #333333)', color: '#ffffff' },
          content: { background: 'linear-gradient(45deg, #cccccc, #dddddd)', border: '3px outset #333333' },
          button: { background: 'linear-gradient(45deg, #666666, #333333)', color: '#ffffff' }
        }
      case 'encyclopedia':
        return {
          titlebar: { background: 'linear-gradient(45deg, #006600, #00cc00, #006600)', color: '#ffffff' },
          content: { background: 'linear-gradient(45deg, #ccffcc, #ddffdd)', border: '3px outset #006600' },
          button: { background: 'linear-gradient(45deg, #00cc00, #006600)', color: '#ffffff' }
        }
      case 'dancingbaby':
        return {
          titlebar: { background: 'linear-gradient(45deg, #ff6699, #ffccdd, #ff6699)', color: '#000000' },
          content: { background: 'linear-gradient(45deg, #ffccdd, #ffddee)', border: '3px outset #ff6699' },
          button: { background: 'linear-gradient(45deg, #ffccdd, #ff6699)', color: '#000000' }
        }
      case 'browser':
        return {
          titlebar: { background: 'linear-gradient(45deg, #0066cc, #3399ff, #0066cc)', color: '#ffffff' },
          content: { background: 'linear-gradient(45deg, #ccddff, #ddeeff)', border: '3px outset #0066cc' },
          button: { background: 'linear-gradient(45deg, #3399ff, #0066cc)', color: '#ffffff' }
        }
      case 'midi':
        return {
          titlebar: { background: 'linear-gradient(45deg, #cc3300, #ff6633, #cc3300)', color: '#ffffff' },
          content: { background: 'linear-gradient(45deg, #ffcccc, #ffdddd)', border: '3px outset #cc3300' },
          button: { background: 'linear-gradient(45deg, #ff6633, #cc3300)', color: '#ffffff' }
        }
      case 'webcam':
        return {
          titlebar: { background: 'linear-gradient(45deg, #9900cc, #cc33ff, #9900cc)', color: '#ffffff' },
          content: { background: 'linear-gradient(45deg, #ffccff, #ffddff)', border: '3px outset #9900cc' },
          button: { background: 'linear-gradient(45deg, #cc33ff, #9900cc)', color: '#ffffff' }
        }
      case 'doomeditor':
        return {
          titlebar: { background: 'linear-gradient(45deg, #cc0000, #ff3333, #cc0000)', color: '#ffffff' },
          content: { background: 'linear-gradient(45deg, #330000, #660000)', border: '3px outset #cc0000', color: '#ffffff' },
          button: { background: 'linear-gradient(45deg, #ff3333, #cc0000)', color: '#ffffff' }
        }
      case 'clan':
        return {
          titlebar: { background: 'linear-gradient(45deg, #003300, #006600, #003300)', color: '#00ff00' },
          content: { background: 'linear-gradient(45deg, #001100, #002200)', border: '3px outset #006600', color: '#00ff00' },
          button: { background: 'linear-gradient(45deg, #006600, #003300)', color: '#00ff00' }
        }
      case 'strategy':
        return {
          titlebar: { background: 'linear-gradient(45deg, #663300, #cc6600, #663300)', color: '#ffffff' },
          content: { background: 'linear-gradient(45deg, #ffcc99, #ffddaa)', border: '3px outset #663300' },
          button: { background: 'linear-gradient(45deg, #cc6600, #663300)', color: '#ffffff' }
        }
      case 'windows98':
        return {
          titlebar: { background: 'linear-gradient(45deg, #0066cc, #3399ff, #0066cc)', color: '#ffffff' },
          content: { background: 'linear-gradient(45deg, #ccddff, #ddeeff)', border: '3px outset #0066cc' },
          button: { background: 'linear-gradient(45deg, #3399ff, #0066cc)', color: '#ffffff' }
        }
      case 'camera':
        return {
          titlebar: { background: 'linear-gradient(45deg, #ffcc00, #ffff33, #ffcc00)', color: '#000000' },
          content: { background: 'linear-gradient(45deg, #ffffcc, #ffffdd)', border: '3px outset #ffcc00' },
          button: { background: 'linear-gradient(45deg, #ffff33, #ffcc00)', color: '#000000' }
        }
      case 'processor':
        return {
          titlebar: { background: 'linear-gradient(45deg, #666666, #999999, #666666)', color: '#ffffff' },
          content: { background: 'linear-gradient(45deg, #cccccc, #dddddd)', border: '3px outset #666666' },
          button: { background: 'linear-gradient(45deg, #999999, #666666)', color: '#ffffff' }
        }
      case 'audio':
        return {
          titlebar: { background: 'linear-gradient(45deg, #cc3300, #ff6600, #cc3300)', color: '#ffffff' },
          content: { background: 'linear-gradient(45deg, #ffcccc, #ffddcc)', border: '3px outset #cc3300' },
          button: { background: 'linear-gradient(45deg, #ff6600, #cc3300)', color: '#ffffff' }
        }
      case 'graphics':
        return {
          titlebar: { background: 'linear-gradient(45deg, #003366, #0066cc, #003366)', color: '#ffffff' },
          content: { background: 'linear-gradient(45deg, #ccddff, #ddeeff)', border: '3px outset #003366' },
          button: { background: 'linear-gradient(45deg, #0066cc, #003366)', color: '#ffffff' }
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
              position: 'fixed',
              left: popup.x,
              top: popup.y,
              width: '300px',
              zIndex: 100,
              animation: 'popupBounce 0.5s ease-out',
              border: '3px outset #c0c0c0',
              boxShadow: '4px 4px 8px rgba(0,0,0,0.5)',
              imageRendering: 'pixelated',
              pointerEvents: 'auto'
            }}
          >
            {/* Title bar with dynamic styling */}
            <div className="win95-titlebar pixelated-titlebar" style={{ ...popupStyle.titlebar, fontFamily: 'Consolas, Monaco, Courier New, monospace', letterSpacing: '0.5px' }}>
              <span style={{ fontSize: '12px', fontWeight: 'bold' }} className="blink pixelated-text">
                * URGENT MESSAGE! DO NOT IGNORE! *
              </span>
              <button
                onClick={() => closePopup(popup.id)}
                className="win95-button"
                style={{ padding: '1px 4px', fontSize: '10px', background: '#ff6666' }}
              >
                X
              </button>
            </div>

            {/* Content with dynamic styling */}
            <div style={{ padding: '12px', ...popupStyle.content }}>
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
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <button
                  onClick={() => handleYesClick(popup)}
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