// import { ChannelInfo } from "@widgets/channel";
// import { FC } from "react";

// export const ChannelPage: FC = () => {
//   return <ChannelInfo />;
// };

import React, { Suspense } from "react";

// Ленивый импорт компонента ChannelInfo
const ChannelInfo = React.lazy(() =>
  import("@widgets/channel").then((module) => ({
    default: module.ChannelInfo,
  })),
);

export const ChannelPage = () => {
  return (
    <Suspense fallback={<div>Loading Channel...</div>}>
      <ChannelInfo />
    </Suspense>
  );
};
