// import { ComplaintInfo } from "@widgets/adminPanel";
// import { FC } from "react";

// export const AdminComplaintInfoPage: FC = () => {
//   return <ComplaintInfo />;
// };

import { SuspenseLoader } from "@shared/ui";
import React, { Suspense } from "react";

// Ленивый импорт для ComplaintInfo
const ComplaintInfo = React.lazy(() =>
  import("@widgets/adminPanel").then((module) => ({
    default: module.ComplaintInfo,
  })),
);

export const AdminComplaintInfoPage = () => {
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <ComplaintInfo />
    </Suspense>
  );
};
