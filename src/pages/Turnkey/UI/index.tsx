// import { Customers, Partners, Steps, Top } from "@widgets/turnkey";
// import { FC } from "react";

// export const TurnkeyPage: FC = () => {
//   return (
//     <>
//       <Top />
//       <Partners />
//       <Steps />
//       <Customers />
//     </>
//   );
// };

import { SuspenseLoader } from "@shared/ui";
import React, { Suspense } from "react";

// Ленивые импорты компонентов
const Top = React.lazy(() =>
  import("@widgets/turnkey").then((module) => ({ default: module.Top })),
);
const Partners = React.lazy(() =>
  import("@widgets/turnkey").then((module) => ({ default: module.Partners })),
);
const Steps = React.lazy(() =>
  import("@widgets/turnkey").then((module) => ({ default: module.Steps })),
);
const Customers = React.lazy(() =>
  import("@widgets/turnkey").then((module) => ({ default: module.Customers })),
);

export const TurnkeyPage = () => {
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <Top />
      <Partners />
      <Steps />
      <Customers />
    </Suspense>
  );
};
