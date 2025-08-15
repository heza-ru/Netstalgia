# Project Structure

## Directory Organization

```
netstalgia/
├── app/                    # Next.js App Router directory
│   ├── globals.css        # Global styles with authentic 90s CSS
│   ├── layout.tsx         # Root layout with metadata and HTML structure
│   ├── loading.tsx        # Loading UI component
│   ├── Navbar.tsx         # Navigation component
│   ├── not-found.tsx      # 404 page
│   └── page.tsx           # Main home page component
├── components/            # Reusable React components
│   ├── BackgroundMusic.tsx    # Winamp-style music player
│   ├── BannerAds.tsx         # Rotating banner advertisements
│   ├── BBSFeatures.tsx       # BBS-style feature list
│   ├── ClickCounter.tsx      # Click tracking component
│   ├── CursorTrail.tsx       # Animated cursor effects
│   ├── DancingBaby.tsx       # Interactive dancing baby centerpiece
│   ├── EasterEggManager.tsx  # Easter egg coordination
│   ├── EasterEggModal.tsx    # Easter egg popup modal
│   ├── Guestbook.tsx         # Interactive guestbook
│   ├── HitCounter.tsx        # Animated hit counter
│   ├── LoadingScreen.tsx     # Dial-up loading simulation
│   ├── MailNotification.tsx  # "You've Got Mail" popup
│   ├── MarqueeText.tsx       # Scrolling marquee text
│   ├── PopupAds.tsx          # Popup advertisement system
│   ├── SecretEasterEgg.tsx   # Hidden easter egg features
│   ├── SnakeGame.tsx         # Embedded Snake game
│   ├── Starfield.tsx         # Animated starfield background
│   ├── SystemCrash.tsx       # Blue screen of death simulation
│   ├── UnderConstruction.tsx # Under construction badges
│   ├── VideoPopup.tsx        # Video popup windows
│   ├── VisitorCounter.tsx    # Visitor statistics display
│   └── WebRing.tsx           # Web ring navigation
├── public/                # Static assets
│   └── assets/           # Images, GIFs, audio files
└── Configuration Files
    ├── next.config.js    # Next.js configuration (static export)
    ├── tailwind.config.js # Tailwind CSS with 90s theme
    ├── tsconfig.json     # TypeScript configuration
    ├── package.json      # Dependencies and scripts
    └── netlify.toml      # Netlify deployment config
```

## Component Architecture Patterns

### Component Naming Convention
- **PascalCase** for all component files and exports
- **Descriptive names** that reflect 90s web elements
- **Props interfaces** named `ComponentNameProps`

### Component Structure Pattern
```typescript
'use client' // For client-side components

import { useState, useEffect } from 'react'

interface ComponentProps {
  // TypeScript interface for props
}

export default function ComponentName({ prop }: ComponentProps) {
  // Component logic with hooks
  return (
    // JSX with authentic 90s styling
  )
}
```

### Styling Patterns
- **Inline styles** for Windows 95 system colors and borders
- **CSS classes** from globals.css for common 90s elements
- **Style objects** for dynamic popup positioning and colors
- **Pixelated styling** with monospace fonts throughout

## File Organization Rules

### App Directory (`app/`)
- **layout.tsx**: Root layout with metadata, fonts, and HTML structure
- **page.tsx**: Main home page with all component orchestration
- **globals.css**: All global styles, 90s color variables, animations
- **Navbar.tsx**: Navigation component (if multi-page)

### Components Directory (`components/`)
- **One component per file** with matching filename
- **Self-contained components** with their own state management
- **Props interfaces** defined in the same file
- **Client-side components** marked with `'use client'`

### Public Assets (`public/assets/`)
- **Images**: GIFs, badges, icons in period-appropriate formats
- **Audio**: MIDI files, dial-up sounds, notification sounds
- **Placeholder assets**: SVG data URIs for missing files

## State Management Patterns

### Local State (useState)
- Component-specific UI state (visibility, animations, counters)
- Form inputs and user interactions
- Temporary display states

### Persistent State (localStorage)
- Guestbook entries with timestamps
- Visitor counters and statistics
- User preferences and settings
- Easter egg achievements

### Prop Drilling
- Callback functions for cross-component communication
- Event handlers passed down from parent components
- Shared state lifted to common parent when needed

## Import/Export Conventions
- **Default exports** for all components
- **Named exports** for utility functions or constants
- **Relative imports** for local components
- **Absolute imports** for external dependencies