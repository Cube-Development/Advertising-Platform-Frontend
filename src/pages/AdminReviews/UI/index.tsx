// import { Reviews } from "@widgets/adminPanel";
// import { FC } from "react";

// export const AdminReviewsPage: FC = () => {
//   return <Reviews />;
// };

import { SuspenseLoader } from "@shared/ui";
import React, { Suspense } from "react";

// Ленивый импорт компонента Reviews
const Reviews = React.lazy(() =>
  import("@widgets/adminPanel").then((module) => ({ default: module.Reviews })),
);

export const AdminReviewsPage = () => {
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <Reviews />
    </Suspense>
  );
};
