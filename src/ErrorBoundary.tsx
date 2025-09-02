import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: (error: Error) => ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}


export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };


  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: any) {

    // Log to your telemetry here if desired
    console.error("ErrorBoundary caught:", error, info);

  }



  render() {

    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback(this.state.error!);

      return (
        <div className="error">
          <h2>Something went wrong.</h2>
          <pre>{this.state.error?.message}</pre>
          <button onClick={() => this.setState({ hasError: false, error: undefined })}>
            Try again
          </button>
        </div>
      );

    }

    return this.props.children;

  }

}





