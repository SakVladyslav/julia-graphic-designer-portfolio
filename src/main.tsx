import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";

import App from "./App.tsx";

import "./index.scss";

async function start(): Promise<void> {
  if (window.location.pathname.includes("/projects/")) {
    await import("./pages/project/ProjectCasePage");
  }

  const rootElement = document.getElementById("root");
  if (rootElement === null) {
    console.error("Root element #root not found");
    return;
  }

  const app = (
    <StrictMode>
      <App />
    </StrictMode>
  );

  if (rootElement.childElementCount === 0) {
    createRoot(rootElement).render(app);
    return;
  }

  hydrateRoot(rootElement, app);
}

void start();
