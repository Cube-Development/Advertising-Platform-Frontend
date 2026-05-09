import { SuspenseLoader } from "@shared/ui";
import { OrderTransfer } from "@widgets/adminPanel";
import { Suspense } from "react";

export const AdminOrderTransferPage = () => {
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <OrderTransfer />
    </Suspense>
  );
};
