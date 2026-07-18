import { SuspenseLoader } from "@shared/ui";
import { OrderPublish } from "@widgets/adminPanel";
import { Suspense } from "react";

export const AdminOrderPublishPage = () => {
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <OrderPublish />
    </Suspense>
  );
};
