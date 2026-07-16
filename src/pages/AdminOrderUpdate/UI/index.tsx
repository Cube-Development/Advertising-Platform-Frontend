import { SuspenseLoader } from "@shared/ui";
import { OrderUpdate } from "@widgets/adminPanel";
import { Suspense } from "react";

export const AdminOrderUpdatePage = () => {
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <OrderUpdate />
    </Suspense>
  );
};
