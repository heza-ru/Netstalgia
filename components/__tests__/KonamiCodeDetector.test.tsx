/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from '@testing-library/react'
import KonamiCodeDetector from '../KonamiCodeDetector'

// Mock the handlers
const mockKonamiActivated = jest.fn()
const mockTextCodeActivated = jest.fn()

describe('KonamiCodeDetector', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    afterEach(() => {
        // Clean up any event listeners
        document.removeEventListener('keydown', jest.fn())
    })

    it('should detect the complete Konami code sequence', () => {
        render(
            <KonamiCodeDetector
                onKonamiActivated={mockKonamiActivated}
                onTextCodeActivated={mockTextCodeActivated}
            />
        )

        // Simulate the Konami code sequence: ↑↑↓↓←→←→BA
        const konamiSequence = [
            'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
            'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
            'KeyB', 'KeyA'
        ]

        konamiSequence.forEach(key => {
            fireEvent.keyDown(document, { code: key })
        })

        expect(mockKonamiActivated).toHaveBeenCalledWith('konami')
        expect(mockKonamiActivated).toHaveBeenCalledTimes(1)
    })

    it('should detect text-based secret codes', () => {
        render(
            <KonamiCodeDetector
                onKonamiActivated={mockKonamiActivated}
                onTextCodeActivated={mockTextCodeActivated}
            />
        )

        // Type "CONTRA"
        const contraText = 'CONTRA'
        contraText.split('').forEach(char => {
            fireEvent.keyDown(document, { key: char })
        })

        expect(mockTextCodeActivated).toHaveBeenCalledWith('CONTRA', expect.any(String))
        expect(mockTextCodeActivated).toHaveBeenCalledTimes(1)
    })

    it('should reset Konami sequence on non-Konami keys', () => {
        render(
            <KonamiCodeDetector
                onKonamiActivated={mockKonamiActivated}
                onTextCodeActivated={mockTextCodeActivated}
            />
        )

        // Start Konami sequence
        fireEvent.keyDown(document, { code: 'ArrowUp' })
        fireEvent.keyDown(document, { code: 'ArrowUp' })

        // Interrupt with non-Konami key
        fireEvent.keyDown(document, { key: 'x' })

        // Continue with rest of sequence - should not trigger
        const restOfSequence = [
            'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight',
            'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'
        ]

        restOfSequence.forEach(key => {
            fireEvent.keyDown(document, { code: key })
        })

        expect(mockKonamiActivated).not.toHaveBeenCalled()
    })

    it('should handle backspace to clear typed text', () => {
        render(
            <KonamiCodeDetector
                onKonamiActivated={mockKonamiActivated}
                onTextCodeActivated={mockTextCodeActivated}
            />
        )

        // Type partial text
        fireEvent.keyDown(document, { key: 'C' })
        fireEvent.keyDown(document, { key: 'O' })
        fireEvent.keyDown(document, { key: 'N' })

        // Backspace
        fireEvent.keyDown(document, { key: 'Backspace' })

        // Continue typing - should not trigger CONTRA
        fireEvent.keyDown(document, { key: 'T' })
        fireEvent.keyDown(document, { key: 'R' })
        fireEvent.keyDown(document, { key: 'A' })

        expect(mockTextCodeActivated).not.toHaveBeenCalled()
    })

    it('should detect multiple different secret codes', () => {
        render(
            <KonamiCodeDetector
                onKonamiActivated={mockKonamiActivated}
                onTextCodeActivated={mockTextCodeActivated}
            />
        )

        // Type "NINTENDO"
        'NINTENDO'.split('').forEach(char => {
            fireEvent.keyDown(document, { key: char })
        })

        expect(mockTextCodeActivated).toHaveBeenCalledWith('NINTENDO', expect.any(String))

        // Clear and type "DOOM"
        fireEvent.keyDown(document, { key: 'Enter' }) // Clear text

        'DOOM'.split('').forEach(char => {
            fireEvent.keyDown(document, { key: char })
        })

        expect(mockTextCodeActivated).toHaveBeenCalledWith('DOOM', expect.any(String))
        expect(mockTextCodeActivated).toHaveBeenCalledTimes(2)
    })
})