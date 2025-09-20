import type { Metadata, Viewport } from 'next'
import React from 'react'
import './globals.css'
import ErrorBoundary from '../components/ErrorBoundary'

export const metadata: Metadata = {
  title: 'NETSTALGIA BBS',
  description: 'A nostalgic journey back to the 1990s internet experience! Complete with dial-up loading, dancing baby, popup ads, and authentic 90s web design.',
  keywords: ['90s', 'retro', 'nostalgia', 'web', 'vintage', 'internet', 'geocities', 'angelfire', 'dancing baby', 'dial-up', 'netscape'],
  authors: [{ name: 'Netstalgia Productions' }],
  robots: 'index, follow',
  openGraph: {
    title: 'NETSTALGIA - Welcome to the 90s Web! ',
    description: 'Experience the authentic 90s internet with dial-up loading, dancing baby easter eggs, and popup ads!',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🕰️</text></svg>" />
      </head>
      <body className="scanlines">
        <ErrorBoundary>
          <div id="app-root">
            {children}
          </div>
        </ErrorBoundary>
        <div id="popup-root"></div>
      </body>
    </html>
  )
} 