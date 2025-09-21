'use client'

import { useState, useEffect, useCallback } from 'react'

interface Song {
  id: string
  title: string
  artist: string
  duration: string
  genre: string
  year: string
  isPlaying: boolean
}

export default function MusicPlayer90s() {
  const [currentSong, setCurrentSong] = useState<Song | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(50)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [playlist, setPlaylist] = useState<Song[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showPlaylist, setShowPlaylist] = useState(false)

  const songs: Song[] = [
    { id: '1', title: 'Macarena', artist: 'Los Del Rio', duration: '3:45', genre: 'Dance', year: '1995', isPlaying: false },
    { id: '2', title: 'Wannabe', artist: 'Spice Girls', duration: '2:53', genre: 'Pop', year: '1996', isPlaying: false },
    { id: '3', title: 'MMMBop', artist: 'Hanson', duration: '4:28', genre: 'Pop Rock', year: '1997', isPlaying: false },
    { id: '4', title: 'Tubthumping', artist: 'Chumbawamba', duration: '4:38', genre: 'Alternative', year: '1997', isPlaying: false },
    { id: '5', title: 'Barbie Girl', artist: 'Aqua', duration: '3:17', genre: 'Eurodance', year: '1997', isPlaying: false },
    { id: '6', title: 'Bitter Sweet Symphony', artist: 'The Verve', duration: '5:57', genre: 'Britpop', year: '1997', isPlaying: false },
    { id: '7', title: 'My Heart Will Go On', artist: 'Celine Dion', duration: '4:40', genre: 'Pop Ballad', year: '1997', isPlaying: false },
    { id: '8', title: 'I Want It That Way', artist: 'Backstreet Boys', duration: '3:33', genre: 'Pop', year: '1999', isPlaying: false },
    { id: '9', title: 'Believe', artist: 'Cher', duration: '3:59', genre: 'Dance Pop', year: '1998', isPlaying: false },
    { id: '10', title: 'Smooth', artist: 'Santana ft. Rob Thomas', duration: '4:54', genre: 'Rock', year: '1999', isPlaying: false }
  ]

  useEffect(() => {
    setPlaylist(songs)
    setCurrentSong(songs[0])
    setDuration(parseTimeToSeconds(songs[0].duration))
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying && currentSong) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          const newTime = prev + 1
          if (newTime >= duration) {
            setIsPlaying(false)
            return 0
          }
          return newTime
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, duration])

  const parseTimeToSeconds = (timeStr: string): number => {
    const [minutes, seconds] = timeStr.split(':').map(Number)
    return minutes * 60 + seconds
  }

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const togglePlay = () => {
    if (currentSong) {
      setIsPlaying(!isPlaying)
    }
  }

  const nextSong = useCallback(() => {
    const nextIndex = (currentIndex + 1) % playlist.length
    setCurrentIndex(nextIndex)
    setCurrentSong(playlist[nextIndex])
    setCurrentTime(0)
    setDuration(parseTimeToSeconds(playlist[nextIndex].duration))
  }, [currentIndex, playlist])

  useEffect(() => {
    if (currentTime >= duration && isPlaying) {
      setIsPlaying(false)
      nextSong()
    }
  }, [currentTime, duration, isPlaying, nextSong])

  const prevSong = () => {
    const prevIndex = currentIndex === 0 ? playlist.length - 1 : currentIndex - 1
    setCurrentIndex(prevIndex)
    setCurrentSong(playlist[prevIndex])
    setCurrentTime(0)
    setDuration(parseTimeToSeconds(playlist[prevIndex].duration))
  }

  const selectSong = (index: number) => {
    setCurrentIndex(index)
    setCurrentSong(playlist[index])
    setCurrentTime(0)
    setDuration(parseTimeToSeconds(playlist[index].duration))
    setIsPlaying(false)
  }

  const getProgressPercentage = () => {
    return duration > 0 ? (currentTime / duration) * 100 : 0
  }

  return (
    <div style={{
      background: '#000080',
      color: '#ffffff',
      border: '2px solid #ffffff',
      padding: '16px',
      fontFamily: 'Courier New, monospace',
      maxWidth: '400px'
    }}>
      {/* Player Header */}
      <div style={{
        background: '#008080',
        color: '#ffffff',
        padding: '8px',
        marginBottom: '12px',
        textAlign: 'center',
        border: '1px solid #ffffff'
      }}>
        <div style={{ fontSize: '14px', fontWeight: 'bold' }}>
          🎵 WINAMP 2.95 🎵
        </div>
        <div style={{ fontSize: '10px' }}>
          The best MP3 player on the web!
        </div>
      </div>

      {/* Now Playing */}
      {currentSong && (
        <div style={{
          background: '#000080',
          border: '1px solid #ffffff',
          padding: '12px',
          marginBottom: '12px'
        }}>
          <div style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '4px' }}>
            NOW PLAYING:
          </div>
          <div style={{ fontSize: '11px', color: '#ffff00', marginBottom: '2px' }}>
            {currentSong.title}
          </div>
          <div style={{ fontSize: '10px', color: '#00ffff', marginBottom: '4px' }}>
            by {currentSong.artist} ({currentSong.year})
          </div>
          <div style={{ fontSize: '9px', color: '#ffffff' }}>
            Genre: {currentSong.genre}
          </div>
        </div>
      )}

      {/* Progress Bar */}
      <div style={{ marginBottom: '12px' }}>
        <div style={{
          width: '100%',
          height: '12px',
          background: '#ffffff',
          border: '1px inset #ffffff',
          position: 'relative'
        }}>
          <div style={{
            width: `${getProgressPercentage()}%`,
            height: '100%',
            background: '#00ff00',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: '#000080',
              fontSize: '8px',
              fontWeight: 'bold'
            }}>
              {getProgressPercentage().toFixed(0)}%
            </div>
          </div>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '9px',
          marginTop: '2px'
        }}>
          <span>{formatTime(currentTime)}</span>
          <span>{currentSong?.duration || '0:00'}</span>
        </div>
      </div>

      {/* Controls */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '8px',
        marginBottom: '12px'
      }}>
        <button
          onClick={prevSong}
          style={{
            padding: '4px 8px',
            background: '#008080',
            color: '#ffffff',
            border: '2px outset #008080',
            cursor: 'pointer',
            fontFamily: 'Courier New, monospace',
            fontSize: '10px'
          }}
        >
          ⏮
        </button>
        <button
          onClick={togglePlay}
          style={{
            padding: '6px 12px',
            background: '#008080',
            color: '#ffffff',
            border: '2px outset #008080',
            cursor: 'pointer',
            fontFamily: 'Courier New, monospace',
            fontSize: '12px',
            fontWeight: 'bold'
          }}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
        <button
          onClick={nextSong}
          style={{
            padding: '4px 8px',
            background: '#008080',
            color: '#ffffff',
            border: '2px outset #008080',
            cursor: 'pointer',
            fontFamily: 'Courier New, monospace',
            fontSize: '10px'
          }}
        >
          ⏭
        </button>
      </div>

      {/* Volume Control */}
      <div style={{ marginBottom: '12px' }}>
        <div style={{ fontSize: '10px', marginBottom: '4px' }}>
          Volume: {volume}%
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          style={{
            width: '100%',
            height: '12px',
            background: '#ffffff',
            border: '1px inset #ffffff'
          }}
        />
      </div>

      {/* Playlist Toggle */}
      <button
        onClick={() => setShowPlaylist(!showPlaylist)}
        style={{
          width: '100%',
          padding: '6px',
          background: '#008080',
          color: '#ffffff',
          border: '2px outset #008080',
          cursor: 'pointer',
          fontFamily: 'Courier New, monospace',
          fontSize: '10px',
          marginBottom: '8px'
        }}
      >
        {showPlaylist ? 'HIDE PLAYLIST' : 'SHOW PLAYLIST'}
      </button>

      {/* Playlist */}
      {showPlaylist && (
        <div style={{
          background: '#000080',
          border: '1px solid #ffffff',
          maxHeight: '150px',
          overflowY: 'auto',
          fontSize: '9px'
        }}>
          {playlist.map((song, index) => (
            <div
              key={song.id}
              onClick={() => selectSong(index)}
              style={{
                padding: '4px 8px',
                cursor: 'pointer',
                background: index === currentIndex ? '#008080' : 'transparent',
                borderBottom: '1px solid #ffffff'
              }}
            >
              <div style={{ fontWeight: 'bold' }}>
                {song.title}
              </div>
              <div style={{ color: '#00ffff' }}>
                {song.artist} • {song.duration}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Equalizer Visual */}
      <div style={{
        marginTop: '12px',
        display: 'flex',
        justifyContent: 'center',
        gap: '2px',
        height: '30px',
        alignItems: 'end'
      }}>
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            style={{
              width: '4px',
              height: `${Math.random() * 20 + 5}px`,
              background: isPlaying ? '#00ff00' : '#008080',
              border: '1px solid #ffffff'
            }}
          />
        ))}
      </div>

      {/* Status */}
      <div style={{
        fontSize: '9px',
        textAlign: 'center',
        marginTop: '8px',
        color: '#00ff00'
      }}>
        Status: {isPlaying ? 'PLAYING' : 'STOPPED'} • Track {currentIndex + 1} of {playlist.length}
      </div>
    </div>
  )
}
