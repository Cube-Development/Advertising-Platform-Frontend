import { SuspenseLoader } from "@shared/ui";
import React, { Suspense } from "react";

// Ленивый импорт компонента ChannelInfo
const ChannelInfo = React.lazy(() =>
  import("@widgets/channel")
    .then((module) => ({
      default: module.ChannelInfo,
    }))
    .catch(() => {
      // При ошибке перезагружаем страницу
      window.location.reload();
      return { default: () => null };
    }),
);

export const ChannelPage = () => {
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <ChannelInfo />
    </Suspense>
  );
};
