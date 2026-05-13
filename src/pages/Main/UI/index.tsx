import { ENUM_ROLES } from "@entities/user";
import { useClearCookiesOnPage } from "@shared/hooks";
import { SuspenseLoader } from "@shared/ui";
import React, { Suspense } from "react";
import { useTranslation } from "react-i18next";
import { WORKFLOW_STEPS } from "@widgets/main/workflow/model/constants";
import { CARD_DATA } from "@widgets/main/choose-us/model/constants";

// Ленивый импорт всех компонентов
const Cta = React.lazy(() =>
  import("@widgets/main").then((module) => ({ default: module.Cta })),
);

const WorkWithUs = React.lazy(() =>
  import("@widgets/main").then((module) => ({ default: module.WorkWithUs })),
);

const Workflow = React.lazy(() =>
  import("@widgets/main").then((module) => ({ default: module.Workflow })),
);

const ChooseUs = React.lazy(() =>
  import("@widgets/main").then((module) => ({ default: module.ChooseUs })),
);

const TarifPricing = React.lazy(() =>
  import("@widgets/main").then((module) => ({ default: module.TarifPricing })),
);

export const MainPage = () => {
  const { t } = useTranslation();

  return (
    <Suspense fallback={<SuspenseLoader />}>
      {/* 1. CTA */}
      <div className="grid gap-10 sm:gap-12 lg:gap-16 my-10">
        <Cta />

        {/* 2. WORK WITH US */}
        <WorkWithUs />

        {/* 3. WORK FLOW */}
        <Workflow
          title={t("main_advertiser.workflow.title")}
          subtitle={t("main_advertiser.workflow.subtitle")}
          steps={WORKFLOW_STEPS}
        />

        {/* 4. CHOOSE US */}
        <ChooseUs
          title={t("main_advertiser.choose_us.title")}
          subTitle={t("main_advertiser.choose_us.subtitle")}
          cards={CARD_DATA}
        />

        {/* 5. TARIF */}
        <TarifPricing />
      </div>
    </Suspense>
  );
};
