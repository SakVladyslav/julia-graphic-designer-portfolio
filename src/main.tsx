import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";

import App from "./App.tsx";

import { loadProjectCasePage } from "./pages/project/loadProjectCasePage.ts";

import "./index.scss";

async function start(): Promise<void> {
  const projectCase = loadProjectCasePage();
  let caseChunkFailed = false;
  if (window.location.pathname.includes("/projects/")) {
    try {
      await projectCase;
    } catch (error) {
      caseChunkFailed = true;
      console.error("Failed to mount the project case page", error);
    }
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

  if (caseChunkFailed) {
    rootElement.replaceChildren();
    createRoot(rootElement).render(app);
    return;
  }

  if (rootElement.childElementCount === 0) {
    createRoot(rootElement).render(app);
    return;
  }

  hydrateRoot(rootElement, app);
}

void start();
