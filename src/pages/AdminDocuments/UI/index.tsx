import { SuspenseLoader } from "@shared/ui";
import React, { Suspense } from "react";

// Ленивый импорт для Complaints
const Documents = React.lazy(() =>
  import("@widgets/adminPanel").then((module) => ({
    default: module.Documents,
  })),
);

export const AdminDocumentsPage = () => {
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <Documents />
    </Suspense>
  );
};
