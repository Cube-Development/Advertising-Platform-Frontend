import { SuspenseLoader } from "@shared/ui";
import { Mailing } from "@widgets/adminPanel";
import { Suspense } from "react";

export const AdminMailingPage = () => {
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <Mailing />
    </Suspense>
  );
};
