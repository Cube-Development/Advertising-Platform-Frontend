// import { Users } from "@widgets/adminPanel";
// import { FC } from "react";

// export const AdminUsersPage: FC = () => {
//   return <Users />;
// };

import { SuspenseLoader } from "@shared/ui";
import React, { Suspense } from "react";

// Ленивый импорт компонента Users
const Users = React.lazy(() =>
  import("@widgets/adminPanel").then((module) => ({ default: module.Users })),
);

export const AdminUsersPage = () => {
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <Users />
    </Suspense>
  );
};
