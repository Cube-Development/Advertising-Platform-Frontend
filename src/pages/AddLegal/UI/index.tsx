// import { AddLegalForm, AddLegalTop } from "@widgets/wallet";
// import { FC } from "react";

// export const AddLegalPage: FC = () => {
//   return (
//     <>
//       <AddLegalTop />
//       <AddLegalForm />
//     </>
//   );
// };

import { useClearCookiesOnPage } from "@shared/hooks";
import { SuspenseLoader } from "@shared/ui";
import React, { Suspense } from "react";

// Ленивый импорт для AddLegalTop и AddLegalForm
const AddLegalTop = React.lazy(() =>
  import("@widgets/wallet").then((module) => ({ default: module.AddLegalTop })),
);

const AddLegalForm = React.lazy(() =>
  import("@widgets/wallet").then((module) => ({
    default: module.AddLegalForm,
  })),
);

export const AddLegalPage = () => {
  useClearCookiesOnPage();
  return (
    <>
      <Suspense fallback={<SuspenseLoader />}>
        <AddLegalTop />
        <AddLegalForm />
      </Suspense>
    </>
  );
};
