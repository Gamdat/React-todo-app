import React  from "react";


class ErrorBoundary extends
 React.Component {
    constructor(props) {
        super(props);
        this.state = {hasError: false};
    
    }

    static getDerivedStateFromError(error) {
return { hasError: true};
    }

    componentDidCatch(error, errorinfo) {
        logErrorToMyService(  error, errorInfo);

    }

    render() {
        if (this.state.hasError) {
            <div className="">
              return <h1 className="error">There is an error</h1>
                <p>{this.state.error?.message || "Unexpected error occured."}</p>
            </div>
            
        }
        return this.props.children
    }
}
export default ErrorBoundary;