import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";

import "./index.scss";

const rootElement = document.getElementById("root");

if (rootElement === null) {
  console.error("Root element #root not found");
} else {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
