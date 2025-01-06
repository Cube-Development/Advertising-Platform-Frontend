// import { FC } from "react";
// import {
//   CalculateIncome,
//   Cta,
//   Customers,
//   HowItWorks,
//   Partners,
//   Services,
//   WhyChooseUs,
// } from "@widgets/mainPages";

// export const MainBloggerPage: FC = () => {
//   const page = "main_page_blogger";
//   return (
//     <>
//       <Cta page={page} />
//       <Services page={page} />
//       <Partners page={page} />
//       <HowItWorks page={page} />
//       <WhyChooseUs page={page} />
//       <CalculateIncome page={page} />
//       <Customers page={page} />
//     </>
//   );
// };

import { SuspenseLoader } from "@shared/ui";
import React, { Suspense } from "react";

// Ленивый импорт всех компонентов
const CalculateIncome = React.lazy(() =>
  import("@widgets/mainPages").then((module) => ({
    default: module.CalculateIncome,
  })),
);
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
const Customers = React.lazy(() =>
  import("@widgets/mainPages").then((module) => ({
    default: module.Customers,
  })),
);

export const MainBloggerPage = () => {
  const page = "main_page_blogger";

  return (
    <Suspense fallback={<SuspenseLoader />}>
      <Cta page={page} />
      <Services page={page} />
      <Partners page={page} />
      <HowItWorks page={page} />
      <WhyChooseUs page={page} />
      <CalculateIncome page={page} />
      <Customers page={page} />
    </Suspense>
  );
};
