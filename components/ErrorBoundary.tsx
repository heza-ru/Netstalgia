'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo
    })
    
    // Log error for debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div style={{
          background: '#000080',
          color: '#ffffff',
          padding: '20px',
          border: '2px solid #ffffff',
          margin: '20px',
          fontFamily: 'Courier New, monospace',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', marginBottom: '10px' }}>
            💥 SYSTEM ERROR 💥
          </div>
          <div style={{ fontSize: '14px', marginBottom: '20px' }}>
            An unexpected error occurred. This is authentic 90s behavior!
          </div>
          <button
            onClick={() => this.setState({ hasError: false, error: undefined, errorInfo: undefined })}
            style={{
              background: '#008080',
              color: '#ffffff',
              border: '2px outset #008080',
              padding: '8px 16px',
              cursor: 'pointer',
              fontFamily: 'Courier New, monospace'
            }}
          >
            TRY AGAIN
          </button>
          <div style={{ fontSize: '10px', marginTop: '10px', opacity: 0.7 }}>
            Error: {this.state.error?.message || 'Unknown error'}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
