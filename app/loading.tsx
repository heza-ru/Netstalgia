import React from 'react'

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="retro-border p-8 bg-gray-800">
        <div className="text-center">
          <h1 className="text-2xl glow-text text-neon-green mb-4 font-pixel">
            NETSTALGIA
          </h1>
          <div className="text-sm text-neon-yellow">
            Loading the most radical website...
          </div>
          <div className="mt-4 flex justify-center space-x-2">
            <div className="w-3 h-3 bg-neon-green rounded-full blink"></div>
            <div className="w-3 h-3 bg-neon-yellow rounded-full blink" style={{ animationDelay: '0.3s' }}></div>
            <div className="w-3 h-3 bg-neon-pink rounded-full blink" style={{ animationDelay: '0.6s' }}></div>
          </div>
        </div>
      </div>
    </div>
  )
} 