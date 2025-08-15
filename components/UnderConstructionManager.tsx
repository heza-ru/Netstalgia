'use client'

import { useState, useEffect } from 'react'
import UnderConstruction from './UnderConstruction'

interface UnderConstructionManagerProps {
    onClose?: () => void
}

// Different construction scenarios
const CONSTRUCTION_SCENARIOS = [
    {
        id: 'guestbook-full',
        trigger: 'guestbook-overflow',
        title: 'Guestbook Under Maintenance',
        message: 'GUESTBOOK TEMPORARILY OFFLINE',
        excuse: 'Sorry! Our guestbook is full and we\'re upgrading to a bigger database. We went from 100 entries to 200 entries! Technology is amazing!',
        variant: 'popup' as const,
        showWorker: true,
        showExcuse: true
    },
    {
        id: 'chat-room',
        trigger: 'chat-link-click',
        title: 'Chat Room Coming Soon',
        message: 'CHAT ROOM UNDER CONSTRUCTION',
        excuse: 'Our IRC chat room is being built! We\'re installing mIRC and setting up the server. Check back next week!',
        variant: 'page' as const,
        showWorker: true,
        showExcuse: true
    },
    {
        id: 'download-section',
        trigger: 'download-click',
        title: 'Downloads Unavailable',
        message: 'DOWNLOAD SECTION OFFLINE',
        excuse: 'Downloads are temporarily disabled. Our 56k connection can\'t handle the traffic! Try again during off-peak hours (3 AM - 6 AM).',
        variant: 'section' as const,
        showWorker: true,
        showExcuse: true
    },
    {
        id: 'member-area',
        trigger: 'members-only',
        title: 'Members Area',
        message: 'MEMBERS ONLY AREA',
        excuse: 'This exclusive section is for premium members only! Sign up for our mailing list to get access. No spam, we promise!',
        variant: 'popup' as const,
        showWorker: false,
        showExcuse: true
    },
    {
        id: 'photo-gallery',
        trigger: 'photos-click',
        title: 'Photo Gallery Loading',
        message: 'PHOTO GALLERY LOADING',
        excuse: 'Please wait while our 1.44MB floppy disk loads all 12 photos! Each photo is a whopping 50KB!',
        variant: 'section' as const,
        showWorker: true,
        showExcuse: true
    },
    {
        id: 'java-applet',
        trigger: 'java-required',
        title: 'Java Required',
        message: 'JAVA APPLET LOADING',
        excuse: 'This cool Java applet requires Java 1.1 or higher. Please download the latest Java plugin from Sun Microsystems!',
        variant: 'popup' as const,
        showWorker: false,
        showExcuse: true
    }
]

export default function UnderConstructionManager({ onClose }: UnderConstructionManagerProps) {
    const [activeScenario, setActiveScenario] = useState<typeof CONSTRUCTION_SCENARIOS[0] | null>(null)
    const [showRandomConstruction, setShowRandomConstruction] = useState(false)

    useEffect(() => {
        // Listen for construction triggers
        const handleConstructionTrigger = (event: CustomEvent) => {
            const { trigger, customMessage, customExcuse } = event.detail

            const scenario = CONSTRUCTION_SCENARIOS.find(s => s.trigger === trigger)
            if (scenario) {
                setActiveScenario({
                    ...scenario,
                    message: customMessage || scenario.message,
                    excuse: customExcuse || scenario.excuse
                })
            }
        }

        // Random construction popup (very low probability)
        const randomConstructionTimer = setInterval(() => {
            if (Math.random() < 0.002) { // 0.2% chance every 30 seconds
                const randomScenario = CONSTRUCTION_SCENARIOS[Math.floor(Math.random() * CONSTRUCTION_SCENARIOS.length)]
                setActiveScenario(randomScenario)
            }
        }, 30000)

        // Listen for specific construction events
        window.addEventListener('constructionTrigger', handleConstructionTrigger as EventListener)

        return () => {
            window.removeEventListener('constructionTrigger', handleConstructionTrigger as EventListener)
            clearInterval(randomConstructionTimer)
        }
    }, [])

    const handleClose = () => {
        setActiveScenario(null)
        onClose?.()
    }

    if (!activeScenario) {
        return null
    }

    return (
        <>
            <UnderConstruction
                text={activeScenario.message}
                variant={activeScenario.variant}
                showWorker={activeScenario.showWorker}
                showExcuse={activeScenario.showExcuse}
                animated={true}
            />

            {/* Close button for popups and pages */}
            {(activeScenario.variant === 'popup' || activeScenario.variant === 'page') && (
                <div
                    onClick={handleClose}
                    style={{
                        position: 'fixed',
                        top: activeScenario.variant === 'popup' ? 'calc(50% - 120px)' : '20px',
                        right: activeScenario.variant === 'popup' ? 'calc(50% - 140px)' : '20px',
                        background: '#ff0000',
                        color: '#ffffff',
                        border: '2px outset #cdc7bb',
                        padding: '4px 8px',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        zIndex: 1001,
                        fontFamily: 'MS Sans Serif, Arial, sans-serif'
                    }}
                >
                    ✕ CLOSE
                </div>
            )}
        </>
    )
}

// Utility functions to trigger construction scenarios
export const triggerConstruction = (
    trigger: string,
    customMessage?: string,
    customExcuse?: string
) => {
    const event = new CustomEvent('constructionTrigger', {
        detail: { trigger, customMessage, customExcuse }
    })
    window.dispatchEvent(event)
}

// Pre-defined trigger functions for common scenarios
export const constructionTriggers = {
    guestbookFull: () => triggerConstruction('guestbook-overflow'),
    chatRoom: () => triggerConstruction('chat-link-click'),
    downloads: () => triggerConstruction('download-click'),
    membersOnly: () => triggerConstruction('members-only'),
    photoGallery: () => triggerConstruction('photos-click'),
    javaApplet: () => triggerConstruction('java-required'),

    // Custom trigger
    custom: (message: string, excuse: string, variant: 'popup' | 'page' | 'section' = 'popup') => {
        const event = new CustomEvent('constructionTrigger', {
            detail: {
                trigger: 'custom',
                customMessage: message,
                customExcuse: excuse
            }
        })
        window.dispatchEvent(event)
    }
}