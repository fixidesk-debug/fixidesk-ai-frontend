import React from "react";

type Props = { children: React.ReactNode };
type State = { hasError: boolean };

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: unknown) {
    // Report to monitoring here if needed
    const sanitizedError = error instanceof Error ? error.message.replace(/[\r\n]/g, ' ') : 'Unknown error';
    console.error("App error:", sanitizedError);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen grid place-items-center p-8 text-center">
          <div>
            <h1 className="text-2xl font-semibold mb-2">Something went wrong</h1>
            <p className="text-muted-foreground">Please refresh the page or try again later.</p>
          </div>
        </div>
      );
    }
    return this.props.children as React.ReactElement;
  }
}


