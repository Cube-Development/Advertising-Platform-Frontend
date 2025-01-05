// import { Complaints } from "@widgets/adminPanel";
// import { FC } from "react";

// export const AdminComplaintsPage: FC = () => {
//   return <Complaints />;
// };

import React, { Suspense } from "react";

// Ленивый импорт для Complaints
const Complaints = React.lazy(() =>
  import("@widgets/adminPanel").then((module) => ({
    default: module.Complaints,
  })),
);

export const AdminComplaintsPage = () => {
  return (
    <Suspense fallback={<div>Loading Complaints...</div>}>
      <Complaints />
    </Suspense>
  );
};
