// import { AddChannelBlock } from "@widgets/channel";
// import { FC } from "react";

// export const AddChannelPage: FC = () => {
//   return <AddChannelBlock />;
// };

import React, { Suspense } from "react";

// Ленивый импорт компонента AddChannelBlock
const AddChannelBlock = React.lazy(() =>
  import("@widgets/channel").then((module) => ({
    default: module.AddChannelBlock,
  })),
);

export const AddChannelPage = () => {
  return (
    <Suspense fallback={<div>Loading Add Channel...</div>}>
      <AddChannelBlock />
    </Suspense>
  );
};
