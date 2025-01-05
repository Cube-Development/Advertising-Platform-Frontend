// import { Reviews } from "@widgets/adminPanel";
// import { FC } from "react";

// export const AdminReviewsPage: FC = () => {
//   return <Reviews />;
// };

import React, { Suspense } from "react";

// Ленивый импорт компонента Reviews
const Reviews = React.lazy(() =>
  import("@widgets/adminPanel").then((module) => ({ default: module.Reviews })),
);

export const AdminReviewsPage = () => {
  return (
    <Suspense fallback={<div>Loading Reviews...</div>}>
      <Reviews />
    </Suspense>
  );
};
