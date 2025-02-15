// import { roles } from "@entities/user";
// import { useAppSelector } from "@shared/hooks";
// import { AdvOrders, ManagerOrders } from "@widgets/project";
// import { FC } from "react";

// export const OrdersPage: FC = () => {
//   const { role } = useAppSelector((state) => state.user);

//   return (
//     <>
//       {role === roles.advertiser ? (
//         <AdvOrders />
//       ) : (
//         role === roles.manager && <ManagerOrders />
//       )}
//     </>
//   );
// };

import { roles } from "@entities/user";
import { useAppSelector, useClearCookiesOnPage } from "@shared/hooks";
import { SuspenseLoader } from "@shared/ui";
import React, { Suspense } from "react";

// Ленивые импорты компонентов
const AdvOrders = React.lazy(() =>
  import("@widgets/project").then((module) => ({ default: module.AdvOrders })),
);
const ManagerOrders = React.lazy(() =>
  import("@widgets/project").then((module) => ({
    default: module.ManagerOrders,
  })),
);

export const OrdersPage = () => {
  useClearCookiesOnPage();
  const { role } = useAppSelector((state) => state.user);

  return (
    <Suspense fallback={<SuspenseLoader />}>
      {role === roles.advertiser ? (
        <AdvOrders />
      ) : (
        role === roles.manager && <ManagerOrders />
      )}
    </Suspense>
  );
};
