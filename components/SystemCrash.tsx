'use client'

import { useState, useEffect } from 'react'

interface SystemCrashProps {
  onRestart: () => void
}

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

export default function SystemCrash({ onRestart }: SystemCrashProps) {
  const [currentMessage, setCurrentMessage] = useState('')
  const [currentInsult, setCurrentInsult] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const [phase, setPhase] = useState(0) // 0: crash, 1: insult, 2: restart

  useEffect(() => {
    const crashMsg = CRASH_MESSAGES[Math.floor(Math.random() * CRASH_MESSAGES.length)]
    const insult = INSULTS_90S[Math.floor(Math.random() * INSULTS_90S.length)]
    
    setCurrentMessage(crashMsg)
    setCurrentInsult(insult)

    // Phase progression
    const timer1 = setTimeout(() => setPhase(1), 3000)
    const timer2 = setTimeout(() => setPhase(2), 8000)
    const timer3 = setTimeout(onRestart, 12000)

    // Cursor blink
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearInterval(cursorInterval)
    }
  }, [onRestart])

  return (
    <div className="crash-screen">
      <div className="crash-text">
{`
Windows Protection Error

A fatal exception 0E has occurred at 0028:C001E36 in VXD VMM(01) +
00010E36. The current application will be terminated.

*  Press any key to terminate the current application.
*  Press CTRL+ALT+DEL again to restart your computer. You will
   lose any unsaved information in all open applications.

Error Details:
${currentMessage}

System ID: NETSTALGIA_BBS_v1.0
Date: ${new Date().toLocaleDateString('en-US', { 
  year: 'numeric', 
  month: '2-digit', 
  day: '2-digit' 
})}
Time: ${new Date().toLocaleTimeString('en-US', { 
  hour12: false,
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit'
})}

`}
        {phase >= 1 && (
          <>
{`
═══════════════════════════════════════════════════════════════

REALITY CHECK FROM THE SYSADMIN:

${currentInsult}

You just clicked "YES" on a random popup like it's 1997 and you
still believe those "You are the 1,000,000th visitor!" messages!

This is exactly why we had so many viruses back in the day!
Bonzi Buddy, anyone? How about that purple gorilla that "helped"
you browse the web?

Back in the REAL 90s, we had to deal with:
• 56k dial-up (and we LIKED it!)
• Popup hell with NO blockers
• Viruses in EVERY download
• ICQ spam and NetBus trojans
• "Free" screensavers with malware
• Chain emails about Bill Gates giving away money

You kids today with your popup blockers and antivirus software
don't know how good you have it! We survived the wild west of
the internet with nothing but Norton Antivirus 95 and prayer!

`}
          </>
        )}
        
        {phase >= 2 && (
          <>
{`
═══════════════════════════════════════════════════════════════

SYSTEM RECOVERY INITIATED...

Scanning for viruses... 47 threats found!
• BONZI.EXE
• HOTBAR.DLL  
• COMETCURSOR.VXD
• GATOR.EXE
• KAZAALITE_CODEC.EXE
• WEATHERBUG.DLL
• And 41 other malicious programs...

Restoring system to last known good configuration...
Loading HIMEM.SYS...
Loading EMM386.EXE...
Initializing Windows 95 OSR2...

`}
            <span className="crash-cursor">{showCursor ? '█' : ' '}</span>
          </>
        )}
      </div>
    </div>
  )
} 