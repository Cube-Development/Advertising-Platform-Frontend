import { SuspenseLoader } from "@shared/ui";
import { ProjectComplete } from "@widgets/adminPanel";
import { Suspense } from "react";

export const AdminProjectCompletePage = () => {
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <ProjectComplete />
    </Suspense>
  );
};
