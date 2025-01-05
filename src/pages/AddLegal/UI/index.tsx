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
  return (
    <>
      <Suspense fallback={<div>Loading AddLegalTop...</div>}>
        <AddLegalTop />
      </Suspense>
      <Suspense fallback={<div>Loading AddLegalForm...</div>}>
        <AddLegalForm />
      </Suspense>
    </>
  );
};
