'use client'

import { useState, useEffect } from 'react'

interface GitHubStarRansomwareProps {
    onStarred: () => void
    onRansomwareTriggered: () => void
}

export default function GitHubStarRansomware({ onStarred, onRansomwareTriggered }: GitHubStarRansomwareProps) {
    const [showInitialPopup, setShowInitialPopup] = useState(false)

    useEffect(() => {
        // Show initial popup after 30 seconds
        const timer = setTimeout(() => {
            setShowInitialPopup(true)
        }, 30000)

        return () => clearTimeout(timer)
    }, [])

    const handleIgnore = () => {
        setShowInitialPopup(false)
        // Trigger ransomware screen after 2 seconds
        setTimeout(() => {
            onRansomwareTriggered()
        }, 2000)
    }

    const handleStar = () => {
        window.open('https://github.com/heza-ru/Netstalgia', '_blank')
        setShowInitialPopup(false)
        onStarred()
    }

    if (showInitialPopup) {
        return (
            <div style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 10000,
                maxWidth: '90vw',
                maxHeight: '90vh'
            }}>
                <div style={{
                    background: '#cdc7bb',
                    border: 'none',
                    boxShadow: `
            -2px -2px 0 0 #ffffff,
            -3px -3px 0 0 #ecece0,
            2px 2px 0 0 #a0947e,
            3px 3px 0 0 #896b4f,
            4px 4px 8px rgba(0, 0, 0, 0.4)
          `,
                    fontFamily: 'MS Sans Serif, Microsoft Sans Serif, Arial, sans-serif',
                    fontSize: '11px',
                    color: '#000000',
                    width: '400px',
                    maxWidth: '90vw'
                }}>
                    {/* Title Bar */}
                    <div style={{
                        background: 'linear-gradient(90deg, #000080 0%, #0040c0 50%, #000080 100%)',
                        color: 'white',
                        padding: '3px 6px',
                        fontWeight: 'bold',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontSize: '11px',
                        textShadow: '1px 1px 1px rgba(0, 0, 0, 0.7)'
                    }}>
                        <span>⭐ GitHub Star Request</span>
                        <button
                            onClick={handleIgnore}
                            style={{
                                width: '16px',
                                height: '14px',
                                background: '#cdc7bb',
                                border: '1px outset #cdc7bb',
                                fontSize: '8px',
                                color: '#000000',
                                cursor: 'pointer',
                                fontWeight: 'bold'
                            }}
                        >
                            ×
                        </button>
                    </div>

                    {/* Content */}
                    <div style={{
                        padding: '15px',
                        textAlign: 'center'
                    }}>
                        <div style={{
                            fontSize: '32px',
                            marginBottom: '10px'
                        }}>
                            ⭐
                        </div>

                        <h3 style={{
                            margin: '0 0 15px 0',
                            fontSize: '12px',
                            fontWeight: 'bold'
                        }}>
                            Enjoying the 90s nostalgia?
                        </h3>

                        <p style={{
                            margin: '0 0 15px 0',
                            fontSize: '11px',
                            lineHeight: '1.4'
                        }}>
                            If you're having fun with this authentic 90s web experience,
                            please consider starring our GitHub repository!
                        </p>

                        <p style={{
                            margin: '0 0 20px 0',
                            fontSize: '10px',
                            color: '#666666',
                            fontStyle: 'italic'
                        }}>
                            It helps other people discover this nostalgic project!
                        </p>

                        <div style={{
                            display: 'flex',
                            gap: '10px',
                            justifyContent: 'center',
                            flexWrap: 'wrap'
                        }}>
                            <button
                                onClick={handleStar}
                                style={{
                                    background: '#cdc7bb',
                                    border: 'none',
                                    boxShadow: `
                    -1px -1px 0 0 #ffffff,
                    -2px -2px 0 0 #ecece0,
                    1px 1px 0 0 #a0947e,
                    2px 2px 0 0 #896b4f
                  `,
                                    padding: '6px 16px',
                                    fontSize: '11px',
                                    color: '#000000',
                                    cursor: 'pointer',
                                    fontFamily: 'MS Sans Serif, Microsoft Sans Serif, Arial, sans-serif',
                                    minWidth: '80px'
                                }}
                            >
                                ⭐ Yes, Star It!
                            </button>

                            <button
                                onClick={handleIgnore}
                                style={{
                                    background: '#cdc7bb',
                                    border: 'none',
                                    boxShadow: `
                    -1px -1px 0 0 #ffffff,
                    -2px -2px 0 0 #ecece0,
                    1px 1px 0 0 #a0947e,
                    2px 2px 0 0 #896b4f
                  `,
                                    padding: '6px 16px',
                                    fontSize: '11px',
                                    color: '#000000',
                                    cursor: 'pointer',
                                    fontFamily: 'MS Sans Serif, Microsoft Sans Serif, Arial, sans-serif',
                                    minWidth: '80px'
                                }}
                            >
                                Maybe Later
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return null
}