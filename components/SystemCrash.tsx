'use client'

import { useState, useEffect } from 'react'

interface SystemCrashProps {
  onRestart: () => void
  crashReason?: string
  triggerSource?: string
}

// Authentic Windows 95/98 BSOD error codes and messages
const AUTHENTIC_ERRORS = [
  {
    code: "0E",
    address: "0028:C001E36",
    module: "VXD VMM(01)",
    offset: "00010E36",
    description: "FATAL EXCEPTION: General Protection Fault"
  },
  {
    code: "0D",
    address: "0028:C0025F42",
    module: "VXD VWIN32(01)",
    offset: "00005F42",
    description: "FATAL EXCEPTION: Stack Fault"
  },
  {
    code: "06",
    address: "0028:C002A1B8",
    module: "VXD SHELL(01)",
    offset: "0000A1B8",
    description: "FATAL EXCEPTION: Invalid Opcode"
  },
  {
    code: "0C",
    address: "0028:C0031D74",
    module: "VXD KERNEL32(01)",
    offset: "00001D74",
    description: "FATAL EXCEPTION: Stack Overflow"
  }
]

const CRASH_REASONS = [
  "User clicked suspicious popup advertisement",
  "Attempted to download 'FREE_SCREENSAVER.EXE'",
  "Opened email attachment 'ILOVEYOU.VBS'",
  "Installed Bonzi Buddy without reading EULA",
  "Clicked 'You are visitor #1,000,000!'",
  "Downloaded 'TOTALLY_NOT_A_VIRUS.EXE'",
  "Accepted ActiveX control from unknown source",
  "Tried to run 'CRACK_FOR_WINZIP.EXE'",
  "Clicked 'Congratulations! You've won!' banner",
  "Installed CometCursor and 47 other toolbars"
]

const SYSTEM_SPECS = [
  "Intel Pentium 133 MHz",
  "16 MB RAM (8 MB available)",
  "1.2 GB Hard Drive (98% full)",
  "Creative Sound Blaster 16",
  "Diamond Stealth 64 Video (2MB)",
  "US Robotics 56K Sportster Modem"
]

const LOADED_DRIVERS = [
  "HIMEM.SYS",
  "EMM386.EXE",
  "SMARTDRV.EXE",
  "MOUSE.COM",
  "MSCDEX.EXE",
  "DOSKEY.COM",
  "ANSI.SYS",
  "SETVER.EXE"
]

const VIRUS_SIGNATURES = [
  "BONZI.EXE - Purple gorilla malware",
  "HOTBAR.DLL - Advertising spyware",
  "COMETCURSOR.VXD - Cursor animation malware",
  "GATOR.EXE - Data mining trojan",
  "WEATHERBUG.DLL - System resource hog",
  "KAZAA_CODEC.EXE - P2P bundled malware",
  "BEARSHARE.DLL - File sharing trojan",
  "LIMEWIRE_PRO.EXE - Fake premium version",
  "FROSTWIRE.DLL - Network worm",
  "MORPHEUS.EXE - Spyware bundle"
]

// Legacy constants for compatibility
const CRASH_MESSAGES = [
  "FATAL ERROR: NEWBIE DETECTED",
  "ILLEGAL OPERATION: CLICKING SUSPICIOUS ADS",
  "GENERAL PROTECTION FAULT: TRUSTING THE INTERNET",
  "SYSTEM EXCEPTION: INSUFFICIENT 90s EXPERIENCE",
  "MEMORY VIOLATION: BRAIN.EXE NOT RESPONDING",
  "BLUE SCREEN OF DEATH: ROOKIE MISTAKE"
]

const INSULTS_90S = [
  "N00B ALERT! You wouldn't survive a DAY browsing the information superhighway in '96!",
  "What a LAMER! Back in my day we knew better than to click EVERY popup!",
  "RTFM, SCRIPT KIDDIE! This is why we can't have nice things on the world wide web!",
  "You just got PWNED by a popup! Your AOL trial CD is in the mail, NEWBIE!",
  "EPIC FAIL, WANNABE! You'd probably fall for the dancing hamster virus too!",
  "Way to go, NOOB! You just downloaded about 50 trojans to your Pentium 133!",
  "ROFL! Another victim of popup ads! Bet you still use Internet Explorer 3.0!",
  "L0L! You just proved you're a total LAMEZOR! Stick to FreeCell, kiddo!"
]

export default function SystemCrash({ onRestart, crashReason, triggerSource }: SystemCrashProps) {
  const [currentError, setCurrentError] = useState(AUTHENTIC_ERRORS[0])
  const [crashReason_internal, setCrashReason] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const [phase, setPhase] = useState(0) // 0: initial, 1: bsod, 2: scan, 3: restart
  const [scanProgress, setScanProgress] = useState(0)
  const [foundViruses, setFoundViruses] = useState<string[]>([])
  const [bootProgress, setBootProgress] = useState('')

  useEffect(() => {
    // Select random error and crash reason
    const randomError = AUTHENTIC_ERRORS[Math.floor(Math.random() * AUTHENTIC_ERRORS.length)]
    const randomReason = crashReason || CRASH_REASONS[Math.floor(Math.random() * CRASH_REASONS.length)]

    setCurrentError(randomError)
    setCrashReason(randomReason)

    // Play crash sound
    playCrashSound()

    // Phase progression with more realistic timing
    const timer1 = setTimeout(() => setPhase(1), 1000)  // Show BSOD
    const timer2 = setTimeout(() => setPhase(2), 5000)  // Start virus scan
    const timer3 = setTimeout(() => setPhase(3), 12000) // Start restart sequence
    const timer4 = setTimeout(onRestart, 18000)         // Complete restart

    // Cursor blink
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 530) // Slightly irregular for authenticity

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
      clearInterval(cursorInterval)
    }
  }, [onRestart, crashReason])

  // Virus scan simulation
  useEffect(() => {
    if (phase === 2) {
      const scanInterval = setInterval(() => {
        setScanProgress(prev => {
          const newProgress = prev + Math.random() * 15 + 5
          if (newProgress >= 100) {
            clearInterval(scanInterval)
            return 100
          }

          // Add viruses as we scan
          if (newProgress > prev + 10 && foundViruses.length < VIRUS_SIGNATURES.length) {
            const newVirus = VIRUS_SIGNATURES[foundViruses.length]
            setFoundViruses(current => [...current, newVirus])
          }

          return newProgress
        })
      }, 200)

      return () => clearInterval(scanInterval)
    }
  }, [phase, foundViruses.length])

  // Boot sequence simulation
  useEffect(() => {
    if (phase === 3) {
      const bootMessages = [
        "Checking system integrity...",
        "Loading HIMEM.SYS...",
        "Loading EMM386.EXE...",
        "Initializing DOS drivers...",
        "Starting Windows 95...",
        "Loading Registry...",
        "Initializing desktop...",
        "System ready."
      ]

      let messageIndex = 0
      const bootInterval = setInterval(() => {
        if (messageIndex < bootMessages.length) {
          setBootProgress(bootMessages[messageIndex])
          messageIndex++
        } else {
          clearInterval(bootInterval)
        }
      }, 800)

      return () => clearInterval(bootInterval)
    }
  }, [phase])

  const playCrashSound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()

      // Create a harsh crash sound
      const oscillator1 = audioContext.createOscillator()
      const oscillator2 = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator1.connect(gainNode)
      oscillator2.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator1.frequency.setValueAtTime(200, audioContext.currentTime)
      oscillator2.frequency.setValueAtTime(150, audioContext.currentTime)

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)

      oscillator1.start(audioContext.currentTime)
      oscillator2.start(audioContext.currentTime)
      oscillator1.stop(audioContext.currentTime + 0.5)
      oscillator2.stop(audioContext.currentTime + 0.5)
    } catch (error) {
      console.log('💥 *CRASH SOUND*')
    }
  }

  return (
    <div className="crash-screen" style={{
      position: 'fixed',
      inset: 0,
      background: '#000080',
      color: '#ffffff',
      fontFamily: 'Consolas, Monaco, "Courier New", monospace',
      fontSize: '14px',
      lineHeight: '1.2',
      padding: '20px',
      overflow: 'auto',
      zIndex: 9999,
      imageRendering: 'pixelated'
    }}>
      <div className="crash-text" style={{ whiteSpace: 'pre-wrap' }}>
        {phase >= 0 && (
          <>
            {`Microsoft Windows
Copyright (C) Microsoft Corp 1981-1998.

A fatal exception ${currentError.code} has occurred at ${currentError.address} in VXD ${currentError.module} +
${currentError.offset}. The current application will be terminated.

${currentError.description}

*  Press any key to terminate the current application.
*  Press CTRL+ALT+DEL again to restart your computer. You will
   lose any unsaved information in all open applications.

System Information:
═══════════════════════════════════════════════════════════════
Computer:        ${SYSTEM_SPECS[0]}
Memory:          ${SYSTEM_SPECS[1]}
Storage:         ${SYSTEM_SPECS[2]}
Sound:           ${SYSTEM_SPECS[3]}
Video:           ${SYSTEM_SPECS[4]}
Modem:           ${SYSTEM_SPECS[5]}

Error Details:
Cause:           ${crashReason_internal}
Source:          ${triggerSource || 'User interaction'}
System ID:       NETSTALGIA_BBS_v1.0
Date:            ${new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit'
            })}
Time:            ${new Date().toLocaleTimeString('en-US', {
              hour12: false,
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            })}

Loaded Drivers:
${LOADED_DRIVERS.map(driver => `  ${driver}`).join('\n')}

`}
          </>
        )}

        {phase >= 1 && (
          <>
            {`
Press any key to continue...

`}
          </>
        )}

        {phase >= 2 && (
          <>
            {`
═══════════════════════════════════════════════════════════════
NORTON ANTIVIRUS 95 - EMERGENCY SCAN INITIATED
═══════════════════════════════════════════════════════════════

Scanning system for malicious software...
Progress: ${Math.floor(scanProgress)}%

Threats detected:
${foundViruses.map((virus, index) => `[${index + 1}] ${virus}`).join('\n')}

${scanProgress >= 100 ? `
Scan complete. ${foundViruses.length} threats found.
Quarantining infected files...
Updating virus definitions...
` : ''}
`}
          </>
        )}

        {phase >= 3 && (
          <>
            {`
═══════════════════════════════════════════════════════════════
SYSTEM RESTART SEQUENCE
═══════════════════════════════════════════════════════════════

Restarting computer...

${bootProgress}

`}
            <span className="crash-cursor" style={{
              animation: 'crashCursor 1s linear infinite'
            }}>
              {showCursor ? '█' : ' '}
            </span>
          </>
        )}
      </div>

      <style jsx>{`
        @keyframes crashCursor {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  )
} 