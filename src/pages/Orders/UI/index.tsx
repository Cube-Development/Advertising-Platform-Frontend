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

import React, { Suspense } from "react";
import { roles } from "@entities/user";
import { useAppSelector } from "@shared/hooks";

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
  const { role } = useAppSelector((state) => state.user);

  return (
    <Suspense fallback={<div>Loading orders...</div>}>
      {role === roles.advertiser ? (
        <AdvOrders />
      ) : (
        role === roles.manager && <ManagerOrders />
      )}
    </Suspense>
  );
};
