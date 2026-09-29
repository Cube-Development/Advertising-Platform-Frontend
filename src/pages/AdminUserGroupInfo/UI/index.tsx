import { SuspenseLoader } from "@shared/ui";
import React, { Suspense } from "react";

const UserGroupInfo = React.lazy(() =>
  import("@widgets/adminPanel")
    .then((module) => ({ default: module.UserGroupInfo }))
    .catch(() => {
      window.location.reload();
      return { default: () => null };
    }),
);

export const AdminUserGroupInfoPage = () => {
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <UserGroupInfo />
    </Suspense>
  );
};
