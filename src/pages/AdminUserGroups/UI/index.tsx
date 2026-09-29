import { SuspenseLoader } from "@shared/ui";
import React, { Suspense } from "react";

const UserGroups = React.lazy(() =>
  import("@widgets/adminPanel")
    .then((module) => ({ default: module.UserGroups }))
    .catch(() => {
      window.location.reload();
      return { default: () => null };
    }),
);

export const AdminUserGroupsPage = () => {
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <UserGroups />
    </Suspense>
  );
};
