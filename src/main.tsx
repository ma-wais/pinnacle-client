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
(window as any).API_BASE =
  (window as any).API_BASE || "https://pinnacle-server-u941.onrender.com";
