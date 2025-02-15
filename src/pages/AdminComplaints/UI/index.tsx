// import { Complaints } from "@widgets/adminPanel";
// import { FC } from "react";

// export const AdminComplaintsPage: FC = () => {
//   return <Complaints />;
// };

import { SuspenseLoader } from "@shared/ui";
import React, { Suspense } from "react";

// Ленивый импорт для Complaints
const Complaints = React.lazy(() =>
  import("@widgets/adminPanel").then((module) => ({
    default: module.Complaints,
  })),
);

export const AdminComplaintsPage = () => {
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <Complaints />
    </Suspense>
  );
};
