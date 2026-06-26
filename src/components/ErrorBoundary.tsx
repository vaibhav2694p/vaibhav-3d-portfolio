import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 z-[9999] bg-cyber-black flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl font-bold neon-text mb-4">VP.</h1>
          <p className="text-gray-400 mb-6">Something went wrong — please refresh the page.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-neon-cyan/20 text-neon-cyan rounded-lg border border-neon-cyan/30 hover:bg-neon-cyan/30 transition-colors"
          >
            Reload
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
