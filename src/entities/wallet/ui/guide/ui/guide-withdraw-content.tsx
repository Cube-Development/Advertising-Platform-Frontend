import { FC } from "react";
import { useTranslation } from "react-i18next";
import { GUIDE_WITHDRAW_STEPS_LIST, IGuideStep, IGuideSubstep } from "../model";
import { GuideNote } from "./guide-note";
import { GuideStep } from "./guide-step";

export const GuideWithdrawContent: FC = () => {
  const { t } = useTranslation();
  const steps = t("wallet.guide.withdraw.steps", {
    returnObjects: true,
  }) as (Pick<IGuideStep, "title" | "description"> & {
    substeps: Pick<IGuideSubstep, "title" | "description" | "info">[];
  })[];
  const STEPS = steps?.map((step, index) => {
    let substeps: IGuideSubstep[] = [];
    if (step?.substeps?.length) {
      substeps = step?.substeps?.map((substep, ind) => {
        return {
          ...substep,
          ...GUIDE_WITHDRAW_STEPS_LIST?.[index]?.substeps?.[ind]!,
        };
      });
    }
    return {
      ...step,
      ...GUIDE_WITHDRAW_STEPS_LIST?.[index],
      ...(substeps?.length ? { substeps: substeps } : {}),
    };
  }) as IGuideStep[];

  return (
    <div className="space-y-4 frame">
      {/* Header */}
      <div className="space-y-2 text-center">
        <h1 className="font-bold text-gray-900 text-md ">
          {t("wallet.guide.withdraw.title")}
        </h1>
        <p className="text-sm text-gray-600 ">
          {t("wallet.guide.withdraw.description")}
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
        title={t("wallet.guide.withdraw.note.title")}
        description={t("wallet.guide.withdraw.note.description")}
      />
    </div>
  );
};
