import { Outlet, ScrollRestoration } from "react-router-dom";
import { LanguageDetector } from "@entities/user";
import { useIsChatRoute } from "@shared/lib/chat-route";
import { AdrasPlugin, Toaster } from "@shared/ui";
import { MainLayout } from "./main-layout";

export const RootLayout = () => {
  // ИИ-чат живёт только на главных страницах рекламодателя и блогера.
  // Размонтирование убирает <adras-plugin> из DOM целиком: загрузчик в
  // index.html не несёт data-org, поэтому виджет сам себя обратно не вставит.
  const isChatRoute = useIsChatRoute();

  return (
    <MainLayout>
      <Outlet />
      <Toaster />
      <LanguageDetector />
      <ScrollRestoration />
      {isChatRoute && <AdrasPlugin />}
    </MainLayout>
  );
};
