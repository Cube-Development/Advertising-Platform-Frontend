import { SuspenseLoader } from "@shared/ui";
import React, { Suspense } from "react";

const Accounting = React.lazy(() =>
  import("@widgets/adminPanel")
    .then((module) => ({
      default: module.Accounting,
    }))
    .catch(() => {
      // При ошибке перезагружаем страницу
      window.location.reload();
      return { default: () => null };
    }),
);

export const AdminAccountingPage = () => {
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <Accounting />
    </Suspense>
  );
};
