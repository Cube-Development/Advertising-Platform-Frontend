import ReactDOM from "react-dom/client";
import * as React from "react";
import App from './app';
// import './index.css';
import './shared/styles/global.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
