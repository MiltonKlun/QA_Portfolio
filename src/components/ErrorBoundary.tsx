import { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    } else {
      window.location.reload();
    }
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[400px] flex flex-col items-center justify-center p-8 text-center bg-background rounded-2xl border border-danger/20">
          <div className="w-16 h-16 rounded-full bg-danger/10 flex items-center justify-center mb-6 animate-pulse">
            <AlertTriangle className="w-8 h-8 text-danger" />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-foreground">
            Something went wrong
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md">
            The application encountered an unexpected error. This is exactly why QA is essential!
          </p>
          <div className="flex gap-4">
            <Button
              onClick={this.handleReset}
              variant="default"
              className="bg-danger hover:bg-danger/90 text-white"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
            <Button
              variant="outline"
              onClick={() => (window.location.href = "/")}
            >
              <Home className="mr-2 h-4 w-4" />
              Return Home
            </Button>
          </div>
          {process.env.NODE_ENV === "development" && this.state.error && (
            <div className="mt-8 p-4 bg-muted rounded-lg text-left overflow-auto max-w-full text-xs font-mono text-muted-foreground">
              {this.state.error.toString()}
            </div>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
