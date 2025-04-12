import * as Sentry from "@sentry/react";
import "@shared/config/i18n";
import * as ReactDOM from "react-dom/client";
import { registerSW } from "virtual:pwa-register";
import App from "./app";
import "./shared/styles/global.scss";

registerSW({
  immediate: true,
});

Sentry.init({
  dsn: "https://665b49aebfd7a0ac234d3eb11b015971@o4508579606364160.ingest.de.sentry.io/4508579732979792",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],
  // Performance Monitoring
  tracesSampleRate: 10 * 60 * 5, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  // tracePropagationTargets: [
  //   "localhost",
  //   /https:\/\/ad\.cubinc\.uz\/advblog\/api/,
  // ],
  // Session Replay
  replaysSessionSampleRate: 0, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
