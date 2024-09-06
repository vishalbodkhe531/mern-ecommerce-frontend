import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./AppRoutes.tsx";
import "./styles/app.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
