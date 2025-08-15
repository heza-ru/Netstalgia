'use client'

import { useState } from 'react'

export default function Windows95ChromeTest() {
    const [showDialog, setShowDialog] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [selectedOption, setSelectedOption] = useState('option1')
    const [checkboxValue, setCheckboxValue] = useState(false)
    const [radioValue, setRadioValue] = useState('radio1')

    return (
        <div style={{ padding: '20px', background: 'var(--win95-light)', minHeight: '100vh' }}>
            <h1 style={{ marginBottom: '20px' }}>Windows 95 Chrome Test</h1>

            {/* Window Chrome Test */}
            <div className="win95-window-enhanced" style={{ marginBottom: '20px', width: '400px' }}>
                <div className="win95-titlebar-enhanced">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <div style={{
                            width: '16px',
                            height: '16px',
                            background: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'16\' height=\'16\' viewBox=\'0 0 16 16\'><rect width=\'16\' height=\'16\' fill=\'%23c0c0c0\'/><rect x=\'2\' y=\'2\' width=\'12\' height=\'12\' fill=\'%23000080\'/><rect x=\'4\' y=\'4\' width=\'8\' height=\'8\' fill=\'%23ffffff\'/></svg>")',
                            imageRendering: 'pixelated'
                        }}></div>
                        <span>Test Window</span>
                    </div>
                    <div style={{ display: 'flex', gap: '2px' }}>
                        <div className="win95-control-button">_</div>
                        <div className="win95-control-button">□</div>
                        <div className="win95-control-button">×</div>
                    </div>
                </div>

                <div className="win95-content">
                    <p style={{ marginBottom: '12px' }}>This is a test of the enhanced Windows 95 chrome styling.</p>

                    {/* Button Tests */}
                    <div style={{ marginBottom: '12px' }}>
                        <button className="win95-button-enhanced" onClick={() => setShowDialog(true)}>
                            Show Dialog
                        </button>
                        <button className="win95-button-enhanced">
                            Regular Button
                        </button>
                        <button className="win95-button-enhanced" disabled>
                            Disabled Button
                        </button>
                    </div>

                    {/* Input Tests */}
                    <div style={{ marginBottom: '12px' }}>
                        <label style={{ display: 'block', marginBottom: '4px' }}>Text Input:</label>
                        <input
                            className="win95-input-enhanced"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Type here..."
                            style={{ width: '200px' }}
                        />
                    </div>

                    {/* Select Test */}
                    <div style={{ marginBottom: '12px' }}>
                        <label style={{ display: 'block', marginBottom: '4px' }}>Select Dropdown:</label>
                        <select
                            className="retro-select"
                            value={selectedOption}
                            onChange={(e) => setSelectedOption(e.target.value)}
                            style={{ width: '150px' }}
                        >
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                        </select>
                    </div>

                    {/* Checkbox and Radio Tests */}
                    <div style={{ marginBottom: '12px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                            <input
                                type="checkbox"
                                className="win95-checkbox"
                                checked={checkboxValue}
                                onChange={(e) => setCheckboxValue(e.target.checked)}
                            />
                            Checkbox Option
                        </label>

                        <label style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                            <input
                                type="radio"
                                name="radioTest"
                                className="win95-radio"
                                value="radio1"
                                checked={radioValue === 'radio1'}
                                onChange={(e) => setRadioValue(e.target.value)}
                            />
                            Radio Option 1
                        </label>

                        <label style={{ display: 'flex', alignItems: 'center' }}>
                            <input
                                type="radio"
                                name="radioTest"
                                className="win95-radio"
                                value="radio2"
                                checked={radioValue === 'radio2'}
                                onChange={(e) => setRadioValue(e.target.value)}
                            />
                            Radio Option 2
                        </label>
                    </div>

                    {/* Progress Bar Test */}
                    <div style={{ marginBottom: '12px' }}>
                        <label style={{ display: 'block', marginBottom: '4px' }}>Progress Bar:</label>
                        <div className="win95-progress">
                            <div className="win95-progress-bar" style={{ width: '65%' }}>
                                65%
                            </div>
                        </div>
                    </div>

                    {/* Group Box Test */}
                    <div className="win95-groupbox">
                        <div className="win95-groupbox-label">Settings</div>
                        <div style={{ padding: '8px' }}>
                            <p>This is content inside a group box with proper Windows 95 styling.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Dialog Test */}
            {showDialog && (
                <div className="win95-modal">
                    <div className="win95-modal-dialog">
                        <div className="win95-titlebar-enhanced">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <div style={{
                                    width: '16px',
                                    height: '16px',
                                    background: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'16\' height=\'16\' viewBox=\'0 0 16 16\'><rect width=\'16\' height=\'16\' fill=\'%23c0c0c0\'/><rect x=\'2\' y=\'2\' width=\'12\' height=\'12\' fill=\'%23000080\'/><rect x=\'4\' y=\'4\' width=\'8\' height=\'8\' fill=\'%23ffffff\'/></svg>")',
                                    imageRendering: 'pixelated'
                                }}></div>
                                <span>Test Dialog</span>
                            </div>
                            <div style={{ display: 'flex', gap: '2px' }}>
                                <button className="win95-control-button" onClick={() => setShowDialog(false)}>×</button>
                            </div>
                        </div>

                        <div className="win95-content">
                            <p style={{ marginBottom: '16px' }}>This is a modal dialog with perfect Windows 95 chrome styling!</p>

                            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                                <button className="win95-button-enhanced" onClick={() => setShowDialog(false)}>
                                    OK
                                </button>
                                <button className="win95-button-enhanced" onClick={() => setShowDialog(false)}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Panel Chrome Test */}
            <div className="panel-chrome" style={{ marginBottom: '20px', width: '300px' }}>
                <h3 style={{ marginBottom: '8px' }}>Panel Chrome</h3>
                <p>This panel uses the panel-chrome utility class for a subtle raised effect.</p>
            </div>

            {/* Inset Chrome Test */}
            <div className="inset-chrome" style={{ marginBottom: '20px', width: '300px' }}>
                <h3 style={{ marginBottom: '8px' }}>Inset Chrome</h3>
                <p>This panel uses the inset-chrome utility class for a sunken effect.</p>
            </div>

            {/* Popup Chrome Test */}
            <div className="popup-chrome" style={{ position: 'relative', width: '250px', padding: '12px' }}>
                <h3 style={{ marginBottom: '8px' }}>Popup Chrome</h3>
                <p>This uses popup-chrome styling with enhanced drop shadow.</p>
            </div>
        </div>
    )
}