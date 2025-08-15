'use client'

import { useState, useEffect } from 'react'

interface GitHubRansomwareScreenProps {
    onStarred: () => void
    onEscape?: () => void
}

export default function GitHubRansomwareScreen({ onStarred, onEscape }: GitHubRansomwareScreenProps) {
    const [countdown, setCountdown] = useState(300) // 5 minutes
    const [isBlinking, setIsBlinking] = useState(false)

    useEffect(() => {
        if (countdown > 0) {
            const timer = setInterval(() => {
                setCountdown(prev => prev - 1)
            }, 1000)

            return () => clearInterval(timer)
        }
    }, [countdown])

    useEffect(() => {
        const blinkTimer = setInterval(() => {
            setIsBlinking(prev => !prev)
        }, 500)

        return () => clearInterval(blinkTimer)
    }, [])

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }

    const handleStar = () => {
        window.open('https://github.com/heza-ru/Netstalgia', '_blank')
        onStarred()
    }

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: '#000080',
            color: '#ffffff',
            fontFamily: 'Courier New, monospace',
            fontSize: '14px',
            zIndex: 99999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            boxSizing: 'border-box',
            overflow: 'hidden'
        }}>
            {/* Skull ASCII Art */}
            <pre style={{
                color: isBlinking ? '#ff0000' : '#ffffff',
                fontSize: '12px',
                lineHeight: '1',
                textAlign: 'center',
                marginBottom: '20px',
                fontFamily: 'Courier New, monospace'
            }}>
                {`
    ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
    ░░░░░░░░░░░░░▄▄▄▄▄▄▄▄▄▄▄▄░░░░░░░░░░░░░
    ░░░░░░░░░░▄▄█░░░░░░░░░░░░█▄▄░░░░░░░░░░
    ░░░░░░░░▄█░░░░░░░░░░░░░░░░░░█▄░░░░░░░░
    ░░░░░░▄█░░░░░░▄▄▄░░░░▄▄▄░░░░█▄░░░░░░░
    ░░░░░█░░░░░░░█░░░█░░░█░░░█░░░░█░░░░░░░
    ░░░░█░░░░░░░░░▀▀▀░░░░░▀▀▀░░░░░█░░░░░░
    ░░░█░░░░░░░░░░░░░░░░░░░░░░░░░░░█░░░░░
    ░░█░░░░░░░░░░░░░░░░░░░░░░░░░░░░█░░░░
    ░█░░░░░░░░░░░░░░░░░░░░░░░░░░░░░█░░░
    ░█░░░░░░░░░░░░░▄▄▄▄▄▄▄░░░░░░░░█░░░
    ░█░░░░░░░░░░░░█░░░░░░░█░░░░░░░░█░░░
    ░█░░░░░░░░░░░░█░░░░░░░█░░░░░░░░█░░░
    ░░█░░░░░░░░░░░░▀▀▀▀▀▀▀░░░░░░░░█░░░░
    ░░░█░░░░░░░░░░░░░░░░░░░░░░░░░░█░░░░░
    ░░░░█▄░░░░░░░░░░░░░░░░░░░░░░▄█░░░░░░
    ░░░░░░█▄▄░░░░░░░░░░░░░░░░▄▄█░░░░░░░░
    ░░░░░░░░░▀▀█▄▄▄▄▄▄▄▄▄▄▄█▀▀░░░░░░░░░░
    ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
`}
            </pre>

            <div style={{
                textAlign: 'center',
                maxWidth: '800px',
                lineHeight: '1.4'
            }}>
                <h1 style={{
                    color: isBlinking ? '#ff0000' : '#ffff00',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    marginBottom: '20px',
                    textShadow: '2px 2px 0px #000000'
                }}>
                    🔒 SYSTEM LOCKED BY GITHUB-STAR RANSOMWARE 🔒
                </h1>

                <div style={{
                    background: '#ff0000',
                    color: '#ffffff',
                    padding: '15px',
                    border: '3px solid #ffffff',
                    marginBottom: '20px',
                    fontSize: '16px',
                    fontWeight: 'bold'
                }}>
                    ⚠️ YOUR SYSTEM HAS BEEN ENCRYPTED! ⚠️
                </div>

                <p style={{ marginBottom: '15px', fontSize: '14px' }}>
                    All your files have been encrypted with military-grade 90s encryption!
                </p>

                <p style={{ marginBottom: '15px', fontSize: '14px' }}>
                    Your documents, photos, databases, and other important files are no longer accessible.
                </p>

                <div style={{
                    background: '#800000',
                    color: '#ffff00',
                    padding: '15px',
                    border: '2px solid #ffff00',
                    marginBottom: '20px',
                    fontSize: '18px',
                    fontWeight: 'bold'
                }}>
                    TIME REMAINING: {formatTime(countdown)}
                </div>

                <p style={{ marginBottom: '15px', fontSize: '14px' }}>
                    To decrypt your files, you must star the Netstalgia repository on GitHub:
                </p>

                <div style={{
                    background: '#000000',
                    color: '#00ff00',
                    padding: '10px',
                    border: '2px solid #00ff00',
                    marginBottom: '20px',
                    fontFamily: 'Courier New, monospace',
                    fontSize: '12px'
                }}>
                    https://github.com/heza-ru/Netstalgia
                </div>

                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '20px',
                    flexWrap: 'wrap'
                }}>
                    <button
                        onClick={handleStar}
                        style={{
                            background: 'linear-gradient(45deg, #00ff00, #008000)',
                            color: '#000000',
                            border: '3px outset #00ff00',
                            padding: '15px 30px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            fontFamily: 'MS Sans Serif, Arial, sans-serif',
                            minWidth: '200px'
                        }}
                    >
                        ⭐ STAR REPOSITORY ⭐
                    </button>

                    {onEscape && (
                        <button
                            onClick={onEscape}
                            style={{
                                background: 'linear-gradient(45deg, #666666, #333333)',
                                color: '#ffffff',
                                border: '3px outset #666666',
                                padding: '15px 30px',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                fontFamily: 'MS Sans Serif, Arial, sans-serif',
                                minWidth: '200px'
                            }}
                        >
                            🔓 ESCAPE (CHEAT)
                        </button>
                    )}
                </div>

                <div style={{
                    marginTop: '30px',
                    fontSize: '12px',
                    color: '#cccccc',
                    lineHeight: '1.6'
                }}>
                    <p>⚠️ WARNING: Do not attempt to remove this software or restart your computer!</p>
                    <p>⚠️ This will result in permanent data loss!</p>
                    <p>⚠️ Only starring the repository will decrypt your files!</p>
                    <br />
                    <p style={{ color: '#ff0000', fontSize: '10px' }}>
                        (This is obviously fake - your files are safe! But please do star the repo! 😄)
                    </p>
                </div>
            </div>
        </div>
    )
}