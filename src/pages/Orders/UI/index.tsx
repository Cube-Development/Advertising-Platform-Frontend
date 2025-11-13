import { ENUM_ROLES } from "@entities/user";
import { useAppSelector, useClearCookiesOnPage } from "@shared/hooks";
import { SuspenseLoader } from "@shared/ui";
import React, { Suspense } from "react";

// Ленивые импорты компонентов
const AdvOrders = React.lazy(() =>
  import("@widgets/project")
    .then((module) => ({ default: module.AdvOrders }))
    .catch(() => {
      // При ошибке перезагружаем страницу
      window.location.reload();
      return { default: () => null };
    }),
);
const ManagerOrders = React.lazy(() =>
  import("@widgets/project")
    .then((module) => ({
      default: module.ManagerOrders,
    }))
    .catch(() => {
      // При ошибке перезагружаем страницу
      window.location.reload();
      return { default: () => null };
    }),
);

const AgencyOrders = React.lazy(() =>
  import("@widgets/project")
    .then((module) => ({
      default: module.AgencyOrders,
    }))
    .catch(() => {
      // При ошибке перезагружаем страницу
      window.location.reload();
      return { default: () => null };
    }),
);

export const OrdersPage = () => {
  useClearCookiesOnPage();
  const { role } = useAppSelector((state) => state.user);

  return (
    <Suspense fallback={<SuspenseLoader />}>
      {role === ENUM_ROLES.ADVERTISER ? (
        <AdvOrders />
      ) : role === ENUM_ROLES.MANAGER ? (
        <ManagerOrders />
      ) : (
        <AgencyOrders />
      )}
    </Suspense>
  );
};
