import { FC } from "react";
import { useTranslation } from "react-i18next";
import { GUIDE_TOPUP_STEPS_LIST, IGuideStep } from "../model";
import { GuideNote } from "./guide-note";
import { GuideStep } from "./guide-step";

export const GuideTopupContent: FC = () => {
  const { t } = useTranslation();
  const steps = t("wallet.guide.topup.steps", {
    returnObjects: true,
  }) as Pick<IGuideStep, "title" | "description">[];

  const STEPS = steps?.map((step, index) => {
    return {
      ...step,
      ...GUIDE_TOPUP_STEPS_LIST?.[index],
    };
  });

  return (
    <div className="space-y-4 frame">
      {/* Header */}
      <div className="space-y-2 text-center">
        <h1 className="font-bold text-gray-900 text-md ">
          {t("wallet.guide.topup.title")}
        </h1>
        <p className="text-sm text-gray-600 ">
          {t("wallet.guide.topup.description")}
        </p>
      </div>

      {/* Steps */}
      <div className="grid grid-flow-row gap-2.5">
        {STEPS.map((step, index) => (
          <GuideStep key={step.title} step={step} index={index + 1} />
        ))}
      </div>

      {/* Footer note */}
      <GuideNote
        title={t("wallet.guide.topup.note.title")}
        description={t("wallet.guide.topup.note.description")}
      />
    </div>
  );
};
