// import { Channels } from "@widgets/adminPanel";
// import { FC } from "react";

// export const AdminChannelsPage: FC = () => {
//   return <Channels />;
// };

import React, { Suspense } from "react";

const Channels = React.lazy(() =>
  import("@widgets/adminPanel").then((module) => ({
    default: module.Channels,
  })),
);

export const AdminChannelsPage = () => {
  return (
    <Suspense fallback={<div>Loading Channels...</div>}>
      <Channels />
    </Suspense>
  );
};
