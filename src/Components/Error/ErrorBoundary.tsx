import React, { ReactNode } from "react";



// Define props and state types

interface ErrorBoundaryProps {

  children: ReactNode;

}



interface ErrorBoundaryState {

  hasError: boolean;

  error: Error | null;

}



// Example error logger

function logErrorToMyService(error: Error, errorInfo: React.ErrorInfo) {

  console.error("Logging error:", error, errorInfo);

}



class ErrorBoundary extends React.Component<

  ErrorBoundaryProps,

  ErrorBoundaryState

> {

  constructor(props: ErrorBoundaryProps) {

    super(props);

    this.state = { hasError: false, error: null };

  }



  static getDerivedStateFromError(error: Error): ErrorBoundaryState {

    return { hasError: true, error };

  }



  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {

    logErrorToMyService(error, errorInfo);

  }



  render() {

    if (this.state.hasError) {

      return (

        <div className="error-boundary">

          <h1 className="error">There is an error</h1>

          <p>{this.state.error?.message || "Unexpected error occurred."}</p>

        </div>

      );

    }



    return this.props.children;

  }

}



export default ErrorBoundary;

