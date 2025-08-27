// import { Transactions } from "@widgets/adminPanel";
// import { FC } from "react";

// export const AdminTransactionsPage: FC = () => {
//   return <Transactions />;
// };

import { SuspenseLoader } from "@shared/ui";
import React, { Suspense } from "react";

// Ленивый импорт компонента Transactions
const Transactions = React.lazy(() =>
  import("@widgets/adminPanel")
    .then((module) => ({
      default: module.Transactions,
    }))
    .catch(() => {
      // При ошибке перезагружаем страницу
      window.location.reload();
      return { default: () => null };
    }),
);

export const AdminTransactionsPage = () => {
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <Transactions />
    </Suspense>
  );
};
