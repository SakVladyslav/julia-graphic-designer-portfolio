import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";

import App from "./App.tsx";

import "./index.scss";

const rootElement = document.getElementById("root");

if (rootElement === null) {
  console.error("Root element #root not found");
} else {
  const app = (
    <StrictMode>
      <App />
    </StrictMode>
  );

  if (rootElement.childElementCount === 0) {
    createRoot(rootElement).render(app);
  } else {
    hydrateRoot(rootElement, app);
  }
}
