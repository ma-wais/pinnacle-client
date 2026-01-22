import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./lib/AuthContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);

// Runtime API base: preferred source for API calls at runtime.
// If you later want to override, you can set `window.API_BASE` before the app mounts.
// Priority: explicit window override -> Vite build-time `VITE_API_URL` ->
// development default (localhost) -> production fallback (Render URL)
const viteBase = (import.meta as any).env?.VITE_API_URL || "";
const devDefault = "http://localhost:4000";
const prodFallback = "https://pinnacle-server-u941.onrender.com";
(window as any).API_BASE =
  (window as any).API_BASE ||
  viteBase ||
  ((import.meta as any).env?.MODE === "development"
    ? devDefault
    : prodFallback);
