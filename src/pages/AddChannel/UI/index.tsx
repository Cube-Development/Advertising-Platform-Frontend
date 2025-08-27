// import { AddChannelBlock } from "@widgets/channel";
// import { FC } from "react";

// export const AddChannelPage: FC = () => {
//   return <AddChannelBlock />;
// };

import { SuspenseLoader } from "@shared/ui";
import React, { Suspense } from "react";

// Ленивый импорт компонента AddChannelBlock
const AddChannelBlock = React.lazy(() =>
  import("@widgets/channel")
    .then((module) => ({
      default: module.AddChannelBlock,
    }))
    .catch(() => {
      window.location.reload();
      return { default: () => null };
    }),
);

export const AddChannelPage = () => {
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <AddChannelBlock />
    </Suspense>
  );
};
