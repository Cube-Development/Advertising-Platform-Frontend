import { SuspenseLoader } from "@shared/ui";
import React, { Suspense } from "react";

// Ленивый импорт для Complaints
const Organization = React.lazy(() =>
  import("@widgets/adminPanel").then((module) => ({
    default: module.Organization,
  })),
);

export const AdminOrganizationPage = () => {
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <Organization />
    </Suspense>
  );
};
