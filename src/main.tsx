import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./app";
import "./shared/styles/global.scss";
import "@shared/config/i18n";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
