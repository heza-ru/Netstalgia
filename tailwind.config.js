/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'neon-pink': '#ff00ff',
        'neon-green': '#00ff00',
        'neon-blue': '#00ffff',
        'neon-yellow': '#ffff00',
        'retro-purple': '#8b00ff',
        'retro-orange': '#ff6600',
      },
      fontFamily: {
        'pixel': ['Courier New', 'monospace'],
        'comic': ['Comic Sans MS', 'cursive'],
      },
      animation: {
        'blink': 'blink 1s linear infinite',
        'marquee': 'marquee 15s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        blink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        glow: {
          '0%': { textShadow: '0 0 5px #ff00ff, 0 0 10px #ff00ff, 0 0 15px #ff00ff' },
          '100%': { textShadow: '0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 30px #ff00ff' },
        },
      },
    },
  },
  plugins: [],
} 