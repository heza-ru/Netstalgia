# 🌟 NETSTALGIA 🌟

**A nostalgic journey back to the 1990s internet experience!**

Welcome to Netstalgia, a fully functional Next.js web application that recreates the authentic feel of browsing the World Wide Web in the late 1990s. Complete with dial-up loading screens, dancing baby GIFs, popup ads, and all the retro charm you remember!

## ✨ Features

### 🎨 **Authentic 90s Aesthetic**
- **Authentic Windows 95 UI elements** with proper outset/inset borders
- **Neon color palettes** (hot pink, electric blue, bright green, yellow)
- **Animated starfield background** with authentic CRT scanlines
- **Retro typography** using Press Start 2P and Courier Prime fonts
- **Under Construction** badges and blinking text everywhere!

### 📱 **Core Components**

#### 🏠 **Home Page (`/`)**
- **Authentic dial-up loading screen** with realistic connection simulation
- **Status messages**: "Dialing Internet Provider...", "Handshaking with Modem...", etc.
- **Windows 95-style progress indicators** with proper system styling
- **Famous Dancing Baby** (ASCII art + emoji animation) as the centerpiece
- **Triple-click easter egg** on the dancing baby with random surprises!

#### 📝 **Interactive Guestbook**
- **Sign the guestbook** with name and message fields
- **LocalStorage persistence** - your messages stay even after refresh!
- **Clean, minimalist interface** with authentic 90s form styling
- **Chronological display** of entries

#### 💸 **Popup Advertisement System**
- **Automatic popup spawning** every 20 seconds (limited to 3 concurrent)
- **Cheesy 90s ad content**: "Win Free Money!", "Punch the Monkey!", "Y2K Protection!"
- **Authentic popup behavior** - some ads come back even after closing!
- **Windows 95-style** popup windows with proper title bars

#### 🎵 **Background Music Player**
- **Winamp-style interface** with retro controls
- **Fake MIDI music display** ("HAMSTERDANCE.MID")
- **Visual spectrum analyzer** with animated bars
- **Authentic 90s player styling**

#### 🎰 **Additional Features**
- **Visitor counter** with incrementing numbers (stored in localStorage)
- **Hot Links sidebar** with classic 90s websites
- **Web ring navigation** simulator
- **Blinking text** and marquee animations
- **Easter egg achievement system**

## 🚀 **Getting Started**

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation & Setup

1. **Clone or download this project**
2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser and visit:**
   ```
   http://localhost:3000
   ```

5. **Enjoy the 90s nostalgia!** 🎉

## 🛠 **Tech Stack**

- **Next.js 14** with App Router
- **React 18** with modern hooks and functional components
- **TypeScript** for type safety
- **Tailwind CSS** with custom 90s-themed extensions
- **CSS animations** for authentic retro effects
- **LocalStorage** for data persistence

## 📁 **Project Structure**

```
Netstalgia/
├── app/
│   ├── globals.css          # Authentic 90s styling
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Main home page
├── components/
│   ├── LoadingScreen.tsx    # Dial-up loading simulation
│   ├── DancingBaby.tsx      # Interactive dancing baby
│   ├── Guestbook.tsx        # Sign & view guestbook
│   ├── PopupAds.tsx         # Popup advertisement system
│   ├── VisitorCounter.tsx   # Animated visitor counter
│   ├── BackgroundMusic.tsx  # MIDI music player simulation
│   └── EasterEggModal.tsx   # Secret surprise modal
└── README.md               # This file!
```

## 🎯 **Component Architecture**

### 🔧 **Clean, Focused Components**
Each component has a single responsibility:
- **LoadingScreen**: Handles dial-up simulation and progress
- **DancingBaby**: Manages click detection and easter egg triggering
- **PopupAds**: Controls popup spawning and authentic 90s behavior
- **Guestbook**: Handles form submission and local storage
- **VisitorCounter**: Manages visitor counting with persistence
- **BackgroundMusic**: Simulates MIDI player interface

### 🎨 **Authentic 90s Styling**
- **Windows 95 UI elements** with proper outset/inset borders
- **Consistent neon color scheme** throughout all components
- **Period-accurate fonts** and typography
- **CRT monitor effects** with scanlines and background starfield
- **Authentic popup window behavior** matching 90s browsers

## 🌐 **Browser Compatibility**
Optimized for modern browsers but designed to look like it was made for:
- Netscape Navigator 4.0+
- Internet Explorer 3.0+
- 800x600 screen resolution
- 256-color displays

## 🔥 **Performance Optimizations**
- **Simplified state management** with minimal re-renders
- **Efficient localStorage usage** with proper error handling
- **Limited concurrent popups** to prevent browser overload
- **Optimized CSS animations** for smooth performance
- **Clean component lifecycle** management

## 🎨 **Customization**

### Adding Your Own Assets
Replace the placeholder files in `public/assets/` with:
- `dancing-baby.gif` - The actual famous dancing baby GIF
- `under-construction.gif` - Animated construction banner
- `background-music.mid` - Classic 90s MIDI file

### Styling Modifications
Edit `app/globals.css` to customize:
- Color palettes (neon colors defined in CSS variables)
- Animations and effects
- Typography and fonts
- Background patterns

## 🎭 **Easter Eggs & Secrets**
- **Triple-click the dancing baby** for a surprise!
- **70% chance of achievement unlock**
- **30% chance of jump scare**
- **Popup ads sometimes return** even after closing (authentic 90s behavior!)
- **Visitor counter slowly increments** to simulate other visitors

## 🤝 **Contributing**
Feel free to contribute more 90s features:
- Additional retro sound effects
- More popup ad templates
- Extra easter eggs and secrets
- Historical web elements

## 📜 **License**
This project is open source and available under the MIT License.

## 🙏 **Credits**
- Inspired by the golden age of the World Wide Web (1995-2000)
- Dancing baby meme from the late 1990s
- Retro aesthetic from Geocities, Angelfire, and early personal websites
- Built with modern tools to recreate vintage experiences

---

**Made with ❤️ and HTML 3.2 vibes**

*© 1999 Netstalgia Productions - Last updated: Never!*

🌟 **Remember: This website is best viewed in 800x600 resolution with Internet Explorer!** 🌟
