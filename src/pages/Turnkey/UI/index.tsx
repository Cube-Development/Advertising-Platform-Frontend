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

import { useClearCookiesOnPage } from "@shared/hooks";
import { SuspenseLoader } from "@shared/ui";
import React, { Suspense } from "react";

// Ленивые импорты компонентов
const Top = React.lazy(() =>
  import("@widgets/turnkey")
    .then((module) => ({ default: module.Top }))
    .catch(() => {
      // При ошибке перезагружаем страницу
      window.location.reload();
      return { default: () => null };
    }),
);
const Partners = React.lazy(() =>
  import("@widgets/turnkey")
    .then((module) => ({ default: module.Partners }))
    .catch(() => {
      // При ошибке перезагружаем страницу
      window.location.reload();
      return { default: () => null };
    }),
);
const Steps = React.lazy(() =>
  import("@widgets/turnkey")
    .then((module) => ({ default: module.Steps }))
    .catch(() => {
      // При ошибке перезагружаем страницу
      window.location.reload();
      return { default: () => null };
    }),
);
const Customers = React.lazy(() =>
  import("@widgets/turnkey")
    .then((module) => ({ default: module.Customers }))
    .catch(() => {
      // При ошибке перезагружаем страницу
      window.location.reload();
      return { default: () => null };
    }),
);

export const TurnkeyPage = () => {
  useClearCookiesOnPage();
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <Top />
      {/* <Partners /> */}
      <Steps />
      {/* <Customers /> */}
    </Suspense>
  );
};
