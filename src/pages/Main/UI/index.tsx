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

import React, { Suspense } from "react";

// Ленивый импорт всех компонентов
const Cta = React.lazy(() =>
  import("@widgets/mainPages").then((module) => ({ default: module.Cta })),
);
const Services = React.lazy(() =>
  import("@widgets/mainPages").then((module) => ({ default: module.Services })),
);
const Partners = React.lazy(() =>
  import("@widgets/mainPages").then((module) => ({ default: module.Partners })),
);
const HowItWorks = React.lazy(() =>
  import("@widgets/mainPages").then((module) => ({
    default: module.HowItWorks,
  })),
);
const WhyChooseUs = React.lazy(() =>
  import("@widgets/mainPages").then((module) => ({
    default: module.WhyChooseUs,
  })),
);
const Turnkey = React.lazy(() =>
  import("@widgets/mainPages").then((module) => ({ default: module.Turnkey })),
);
const Customers = React.lazy(() =>
  import("@widgets/mainPages").then((module) => ({
    default: module.Customers,
  })),
);

export const MainPage = () => {
  const page = "main_page_advertiser";

  return (
    <>
      <Suspense fallback={<div>Loading page...</div>}>
        <Cta page={page} />
        <Services page={page} />
        <Partners page={page} />
        <HowItWorks page={page} />
        <WhyChooseUs page={page} />
        <Turnkey page={page} />
        <Customers page={page} />
      </Suspense>
    </>
  );
};
