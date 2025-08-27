// import { CreateOrderBlock } from "@widgets/createOrder";
// import { FC } from "react";

// export const CreateOrderPage: FC = () => {
//   return <CreateOrderBlock />;
// };

import { SuspenseLoader } from "@shared/ui";
import React, { Suspense } from "react";

// Ленивый импорт компонента CreateOrderBlock
const CreateOrderBlock = React.lazy(() =>
  import("@widgets/createOrder")
    .then((module) => ({
      default: module.CreateOrderBlock,
    }))
    .catch(() => {
      // При ошибке перезагружаем страницу
      window.location.reload();
      return { default: () => null };
    }),
);

export const CreateOrderPage = () => {
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <CreateOrderBlock />
    </Suspense>
  );
};
