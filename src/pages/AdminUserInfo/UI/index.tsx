// import { UserInfo } from "@widgets/adminPanel";
// import { FC } from "react";

// export const AdminUserInfoPage: FC = () => {
//   return <UserInfo />;
// };

import { SuspenseLoader } from "@shared/ui";
import React, { Suspense } from "react";

// Ленивый импорт компонента UserInfo
const UserInfo = React.lazy(() =>
  import("@widgets/adminPanel")
    .then((module) => ({
      default: module.UserInfo,
    }))
    .catch(() => {
      // При ошибке перезагружаем страницу
      window.location.reload();
      return { default: () => null };
    }),
);

export const AdminUserInfoPage = () => {
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <UserInfo />
    </Suspense>
  );
};
