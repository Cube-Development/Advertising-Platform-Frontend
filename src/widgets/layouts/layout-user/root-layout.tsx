import { Outlet, ScrollRestoration } from "react-router-dom";
import { LanguageDetector } from "@entities/user";
import { Toaster } from "@shared/ui";
import { MainLayout } from "./main-layout";
import { useVoiceAgentGlobalObserver } from "@widgets/voice-agent/model/hooks/use-voice-agent-state-observer";

export const RootLayout = () => {
  useVoiceAgentGlobalObserver();

  return (
    <MainLayout>
      <Outlet />
      <Toaster />
      <LanguageDetector />
      <ScrollRestoration />
    </MainLayout>
  );
};
