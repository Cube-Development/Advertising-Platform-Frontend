import { SuspenseLoader } from "@shared/ui";
import { ManageProjects } from "@widgets/adminPanel";
import { Suspense } from "react";

export const AdminManageProjectsPage = () => {
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <ManageProjects />
    </Suspense>
  );
};
