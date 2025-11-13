import { ENUM_ROLES } from "@entities/user";
import { useClearCookiesOnPage } from "@shared/hooks";
import { SuspenseLoader } from "@shared/ui";
import React, { Suspense } from "react";

// Ленивый импорт всех компонентов
const CalculateIncome = React.lazy(() =>
  import("@widgets/mainPages")
    .then((module) => ({
      default: module.CalculateIncome,
    }))
    .catch(() => {
      // При ошибке перезагружаем страницу
      window.location.reload();
      return { default: () => null };
    }),
);
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

export const MainBloggerPage = () => {
  useClearCookiesOnPage();
  const page = "main_page_blogger";

  return (
    <Suspense fallback={<SuspenseLoader />}>
      <Cta role={ENUM_ROLES.BLOGGER} />
      <Services page={page} />
      <Partners page={page} />
      <div></div>
      <HowItWorks page={page} />
      <WhyChooseUs page={page} />
      <CalculateIncome page={page} />
      {/* <Customers page={page} /> */}
    </Suspense>
  );
};
