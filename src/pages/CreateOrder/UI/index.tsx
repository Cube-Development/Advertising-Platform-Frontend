// import { CreateOrderBlock } from "@widgets/createOrder";
// import { FC } from "react";

// export const CreateOrderPage: FC = () => {
//   return <CreateOrderBlock />;
// };

import { SuspenseLoader } from "@shared/ui";
import React, { Suspense } from "react";

// Ленивый импорт компонента CreateOrderBlock
const CreateOrderBlock = React.lazy(() =>
  import("@widgets/createOrder").then((module) => ({
    default: module.CreateOrderBlock,
  })),
);

export const CreateOrderPage = () => {
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <CreateOrderBlock />
    </Suspense>
  );
};
