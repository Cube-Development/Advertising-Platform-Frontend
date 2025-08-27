// import { Channels } from "@widgets/adminPanel";
// import { FC } from "react";

// export const AdminChannelsPage: FC = () => {
//   return <Channels />;
// };

import { SuspenseLoader } from "@shared/ui";
import React, { Suspense } from "react";

const Channels = React.lazy(() =>
  import("@widgets/adminPanel")
    .then((module) => ({
      default: module.Channels,
    }))
    .catch(() => {
      // При ошибке перезагружаем страницу
      window.location.reload();
      return { default: () => null };
    }),
);

export const AdminChannelsPage = () => {
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <Channels />
    </Suspense>
  );
};
