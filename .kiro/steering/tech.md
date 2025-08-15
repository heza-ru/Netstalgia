# Technology Stack

## Framework & Core Technologies
- **Next.js 14** with App Router architecture
- **React 18** with functional components and modern hooks
- **TypeScript** for type safety and better development experience
- **Tailwind CSS** with extensive custom 90s-themed styling

## Build System & Commands
```bash
# Development
npm run dev          # Start development server on localhost:3000

# Production Build
npm run build        # Build for production
npm run start        # Start production server

# Static Export (for Netlify/GitHub Pages)
npm run export       # Generate static export
npm run netlify      # Netlify-specific build

# Code Quality
npm run lint         # Run ESLint
```

## Deployment Configuration
- **Static Export**: Configured for deployment to Netlify, Vercel, or GitHub Pages
- **netlify.toml**: Deployment configuration for Netlify
- **next.config.js**: Configured with `output: 'export'` for static generation

## Styling Architecture
- **CSS Variables**: Authentic 90s web colors (not modern neon)
- **Windows 95 System Colors**: Proper outset/inset borders and system styling
- **Custom Animations**: Blink effects, marquee text, rainbow text
- **Pixelated Styling**: Monospace fonts (Consolas, Monaco, Courier New) for authentic feel
- **Responsive Design**: Optimized for desktop but works on mobile

## State Management
- **React Hooks**: useState, useEffect, useRef for component state
- **localStorage**: Client-side persistence for guestbook entries and counters
- **No External State Library**: Keeps dependencies minimal and authentic to the era

## Key Dependencies
```json
{
  "next": "14.0.4",
  "react": "^18",
  "react-dom": "^18",
  "typescript": "^5",
  "tailwindcss": "^3.3.0",
  "eslint": "^8",
  "eslint-config-next": "14.0.4"
}
```

## Development Guidelines
- Use functional components with hooks (no class components)
- TypeScript interfaces for all props and complex objects
- Client-side components marked with `'use client'` directive
- Authentic 90s styling over modern design patterns
- localStorage for data persistence (no external databases)
- Minimal external dependencies to maintain simplicity