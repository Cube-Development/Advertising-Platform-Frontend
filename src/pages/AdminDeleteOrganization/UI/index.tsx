import { SuspenseLoader } from "@shared/ui";
import { DeleteOrganization } from "@widgets/adminPanel";
import { Suspense } from "react";

export const AdminDeleteOrganizationPage = () => {
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <DeleteOrganization />
    </Suspense>
  );
};
