'use client'

import { useState, useEffect } from 'react'

interface BannerAd {
  id: string
  text: string
  color: string
  bgColor: string
  borderColor: string
  link: string
  isAnimated: boolean
}

interface BannerAdsProps {
  className?: string
}

export default function BannerAds({ className = '' }: BannerAdsProps) {
  const [currentAd, setCurrentAd] = useState(0)
  const [clickCount, setClickCount] = useState(0)

  const bannerAds: BannerAd[] = [
    {
      id: 'free-email',
      text: 'FREE EMAIL!',
      color: '#ffffff',
      bgColor: '#ff0000',
      borderColor: '#000000',
      link: 'https://web.archive.org/web/19961219120000/http://www.hotmail.com/',
      isAnimated: true
    },
    {
      id: 'download-now',
      text: 'DOWNLOAD NOW!',
      color: '#ffffff',
      bgColor: '#0000ff',
      borderColor: '#ffff00',
      link: 'https://web.archive.org/web/19961219120000/http://www.download.com/',
      isAnimated: false
    },
    {
      id: 'visit-sponsors',
      text: 'VISIT OUR SPONSORS!',
      color: '#000000',
      bgColor: '#ffff00',
      borderColor: '#ff0000',
      link: 'https://web.archive.org/web/19961219120000/http://www.geocities.com/',
      isAnimated: true
    },
    {
      id: 'best-netscape',
      text: 'BEST VIEWED WITH NETSCAPE',
      color: '#ffffff',
      bgColor: '#008000',
      borderColor: '#00ff00',
      link: 'https://web.archive.org/web/19961219120000/http://www.netscape.com/',
      isAnimated: false
    },
    {
      id: 'free-hosting',
      text: 'FREE HOSTING!',
      color: '#ffffff',
      bgColor: '#ff00ff',
      borderColor: '#000000',
      link: 'https://web.archive.org/web/19961219120000/http://www.angelfire.com/',
      isAnimated: true
    },
    {
      id: 'win-money',
      text: 'WIN FREE MONEY!',
      color: '#000000',
      bgColor: '#00ff00',
      borderColor: '#ff0000',
      link: 'https://web.archive.org/web/19961219120000/http://www.lottery.com/',
      isAnimated: true
    },
    {
      id: 'hot-singles',
      text: 'HOT SINGLES IN YOUR AREA!',
      color: '#ffffff',
      bgColor: '#ff6600',
      borderColor: '#ff0000',
      link: 'https://web.archive.org/web/19961219120000/http://www.match.com/',
      isAnimated: false
    },
    {
      id: 'enlarge-browser',
      text: 'ENLARGE YOUR... BROWSER!',
      color: '#ffffff',
      bgColor: '#800080',
      borderColor: '#ffff00',
      link: 'https://web.archive.org/web/19961219120000/http://www.microsoft.com/',
      isAnimated: true
    }
  ]

  useEffect(() => {
    // Rotate banner ads every 8 seconds
    const interval = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % bannerAds.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [bannerAds.length])

  const handleBannerClick = (ad: BannerAd) => {
    setClickCount(prev => prev + 1)
    
    // Trigger random easter egg instead of alert
    const easterEggs = [
      'snake-game',
      'cursor-trail',
      'tetris-game',
      'pong-game',
      'starfield-effect',
      'rainbow-text',
      'matrix-effect'
    ]
    
    const randomEasterEgg = easterEggs[Math.floor(Math.random() * easterEggs.length)]
    
    // Dispatch custom event for easter egg
    const event = new CustomEvent('triggerEasterEgg', {
      detail: { type: randomEasterEgg, source: 'banner-ad' }
    })
    window.dispatchEvent(event)
  }

  const currentBanner = bannerAds[currentAd]

  return (
    <>
      {/* Single Banner Ad */}
      <div className={`banner-ad ${className}`} style={{
        width: '100%',
        height: '60px',
        background: currentBanner.bgColor,
        border: `3px solid ${currentBanner.borderColor}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        marginTop: '8px',
        position: 'relative',
        overflow: 'hidden'
      }} onClick={() => handleBannerClick(currentBanner)}>
        
        {/* Animated background pattern for some ads */}
        {currentBanner.isAnimated && (
          <div style={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            background: `repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 10px,
              rgba(255,255,255,0.1) 10px,
              rgba(255,255,255,0.1) 20px
            )`,
            animation: 'bannerMove 2s linear infinite reverse'
          }} />
        )}
        
        <div style={{
          color: currentBanner.color,
          fontSize: '14px',
          fontWeight: 'bold',
          textAlign: 'center',
          textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
          fontFamily: 'Arial, sans-serif',
          zIndex: 1,
          position: 'relative'
        }}>
          {currentBanner.text}
        </div>
        
        {/* Click here indicator */}
        <div style={{
          position: 'absolute',
          bottom: '4px',
          right: '8px',
          fontSize: '8px',
          color: currentBanner.color,
          opacity: 0.7
        }}>
          CLICK HERE!
        </div>
      </div>

      <style jsx>{`
        @keyframes bannerMove {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .banner-ad:hover {
          transform: scale(1.02);
          transition: transform 0.2s ease-in-out;
        }
        
        .banner-ad:active {
          transform: scale(0.98);
        }
      `}</style>
    </>
  )
} 