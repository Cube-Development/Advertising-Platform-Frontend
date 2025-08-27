// import {
//   Cta,
//   Customers,
//   HowItWorks,
//   Partners,
//   Services,
//   Turnkey,
//   WhyChooseUs,
// } from "@widgets/mainPages";
// import { FC } from "react";

// export const MainPage: FC = () => {
//   const page = "main_page_advertiser";

//   return (
//     <>
//       <Cta page={page} />
//       <Services page={page} />
//       <Partners page={page} />
//       <HowItWorks page={page} />
//       <WhyChooseUs page={page} />
//       <Turnkey page={page} />
//       <Customers page={page} />
//     </>
//   );
// };

import { useClearCookiesOnPage } from "@shared/hooks";
import { SuspenseLoader } from "@shared/ui";
import React, { Suspense } from "react";

// Ленивый импорт всех компонентов
const Cta = React.lazy(() =>
  import("@widgets/mainPages")
    .then((module) => ({ default: module.Cta }))
    .catch(() => {
      // При ошибке перезагружаем страницу
      window.location.reload();
      return { default: () => null };
    }),
);
const Services = React.lazy(() =>
  import("@widgets/mainPages")
    .then((module) => ({ default: module.Services }))
    .catch(() => {
      // При ошибке перезагружаем страницу
      window.location.reload();
      return { default: () => null };
    }),
);
const Partners = React.lazy(() =>
  import("@widgets/mainPages")
    .then((module) => ({ default: module.Partners }))
    .catch(() => {
      // При ошибке перезагружаем страницу
      window.location.reload();
      return { default: () => null };
    }),
);
const HowItWorks = React.lazy(() =>
  import("@widgets/mainPages")
    .then((module) => ({
      default: module.HowItWorks,
    }))
    .catch(() => {
      // При ошибке перезагружаем страницу
      window.location.reload();
      return { default: () => null };
    }),
);
const WhyChooseUs = React.lazy(() =>
  import("@widgets/mainPages")
    .then((module) => ({
      default: module.WhyChooseUs,
    }))
    .catch(() => {
      // При ошибке перезагружаем страницу
      window.location.reload();
      return { default: () => null };
    }),
);
const Turnkey = React.lazy(() =>
  import("@widgets/mainPages")
    .then((module) => ({ default: module.Turnkey }))
    .catch(() => {
      // При ошибке перезагружаем страницу
      window.location.reload();
      return { default: () => null };
    }),
);
const Customers = React.lazy(() =>
  import("@widgets/mainPages")
    .then((module) => ({
      default: module.Customers,
    }))
    .catch(() => {
      // При ошибке перезагружаем страницу
      window.location.reload();
      return { default: () => null };
    }),
);

export const MainPage = () => {
  useClearCookiesOnPage();
  const page = "main_page_advertiser";

  return (
    <>
      <Suspense fallback={<SuspenseLoader />}>
        <Cta page={page} />
        <Services page={page} />
        <Partners page={page} />
        <HowItWorks page={page} />
        <WhyChooseUs page={page} />
        <Turnkey page={page} />
        {/* <Customers page={page} /> */}
      </Suspense>
    </>
  );
};
