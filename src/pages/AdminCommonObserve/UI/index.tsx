import { SuspenseLoader } from "@shared/ui";
import { CommonObserve } from "@widgets/adminPanel";
import { Suspense } from "react";

export const AdminCommonObservePage = () => {
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <CommonObserve />
    </Suspense>
  );
};
