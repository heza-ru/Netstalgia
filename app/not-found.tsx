import React from 'react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="retro-border p-8 bg-black bg-opacity-50 text-center max-w-md">
        <h1 className="text-6xl glow-text text-neon-pink mb-4">404</h1>
        <h2 className="text-2xl text-neon-yellow mb-4">Page Not Found!</h2>
        <div className="text-neon-green text-sm mb-6">
          <div className="blink">⚠️ ERROR 404: FILE NOT FOUND ⚠️</div>
          <div className="mt-2">
            The page you're looking for has vanished into cyberspace!
          </div>
        </div>
        <div className="space-y-2 text-xs">
          <div className="text-neon-blue">
            🔍 Did you check your URL for typos?
          </div>
          <div className="text-neon-yellow">
            📡 Is your internet connection working?
          </div>
          <div className="text-neon-pink">
            💾 Have you tried turning it off and on again?
          </div>
        </div>
        <div className="mt-6">
          <a 
            href="/" 
            className="retro-button inline-block"
          >
            🏠 Back to Homepage
          </a>
        </div>
        <div className="mt-4 text-xs text-neon-green">
          <div className="blink">✨ The web was a simpler place in 1999 ✨</div>
        </div>
      </div>
    </div>
  )
} 