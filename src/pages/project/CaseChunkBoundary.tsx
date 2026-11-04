import { Component, type ErrorInfo, type ReactNode } from "react";

import NotFoundPage from "../not-found/NotFoundPage";

interface CaseChunkBoundaryProps {
  children: ReactNode;
}

interface CaseChunkBoundaryState {
  failed: boolean;
}

export default class CaseChunkBoundary extends Component<
  CaseChunkBoundaryProps,
  CaseChunkBoundaryState
> {
  state: CaseChunkBoundaryState = { failed: false };

  static getDerivedStateFromError(): CaseChunkBoundaryState {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error("Failed to load the project case page", error, info);
  }

  render(): ReactNode {
    if (this.state.failed) {
      return <NotFoundPage reload />;
    }

    return this.props.children;
  }
}
