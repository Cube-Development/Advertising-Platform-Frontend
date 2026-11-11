import { RootLayout } from "@widgets/layouts";
import { AnalyticsRouteTracker } from "../analytics/route-tracker";
import { ChatActions } from "../chat-actions";

/**
 * Элемент корневого маршрута. Трекер аналитики — первым: эффекты идут в порядке дерева, и контекст с
 * page() должны сработать раньше эффектов страницы — иначе события при её монтировании получат путь и
 * pv прошлой страницы (как в blogix: провайдер раньше children)
 */
export const RootElement = () => (
  <>
    <AnalyticsRouteTracker />
    <RootLayout />
    <ChatActions />
  </>
);
