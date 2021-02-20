import React, { Component } from 'react'
import { ErrorFallback } from './ErrorFallback'

type ErrorBoundaryProps = {
  children?: any
  FallbackComponent?: React.FC<FallbackProps>
  onError?(error: Error, componentStack: string): void
}

type FallbackProps = ErrorInfo & {
  error: Error
}

type ErrorInfo = {
  componentStack: string
}

type State = {
  error?: Error
  info?: ErrorInfo
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, State> {
  static defaultProps: {}

  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      error: undefined,
      info: undefined,
    }
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    const { onError } = this.props

    if (typeof onError === 'function') {
      try {
        onError.call(this, error, info ? info.componentStack : '')
      } catch (ignoredError) {
        console.log('ignoredError :', ignoredError)
      }
    }

    this.setState({ error, info })
  }

  render() {
    const { children, FallbackComponent } = this.props
    const { error, info } = this.state

    if (error && FallbackComponent) {
      return (
        <FallbackComponent
          componentStack={info ? info.componentStack : ''}
          error={error}
        />
      )
    }

    return children || null
  }
}

ErrorBoundary.defaultProps = {
  FallbackComponent: ErrorFallback,
}
