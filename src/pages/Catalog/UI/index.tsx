// import { CatalogBlock } from "@widgets/catalog";
// import { FC } from "react";

// export const CatalogPage: FC = () => {
//   return <CatalogBlock />;
// };

import { SuspenseLoader } from "@shared/ui";
import React, { Suspense } from "react";

// Ленивый импорт компонента CatalogBlock
const CatalogBlock = React.lazy(() =>
  import("@widgets/catalog").then((module) => ({
    default: module.CatalogBlock,
  })),
);

export const CatalogPage = () => {
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <CatalogBlock />
    </Suspense>
  );
};
