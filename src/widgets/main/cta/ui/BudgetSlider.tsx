import { memo, useMemo } from "react";
import {
  MIN_BUDGET,
  MAX_BUDGET,
  BUDGET_RANGE,
  AXIS_LABELS,
} from "../model/constants";
import { CustomSlider } from "@shared/ui";
import { useTranslation } from "react-i18next";

interface Props {
  budget: number;
  onChange: (v: number) => void;
}

/** Статичны — рендерятся один раз */
const AxisLabels = memo(function AxisLabels() {
  const { t } = useTranslation();
  return (
    <div className="relative h-4 mt-1">
      {AXIS_LABELS.map((point) => {
        const pct = ((point.value - MIN_BUDGET) / BUDGET_RANGE) * 100;
        return (
          <span
            key={point.value}
            className="absolute -translate-x-1/2 text-[10px] sm:text-xs font-semibold whitespace-nowrap text-[hsl(187,20%,52%)] opacity-70"
            style={{ left: `${pct}%` }}
          >
            {t(point.label)}
          </span>
        );
      })}
    </div>
  );
});

export const BudgetSlider = memo(function BudgetSlider({
  budget,
  onChange,
}: Props) {
  const { t } = useTranslation();
  const formatted = useMemo(() => budget.toLocaleString("ru-RU"), [budget]);

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5 gap-2">
        <span className="text-xs sm:text-sm font-medium text-[hsl(187,20%,52%)]">
          {t("main_advertiser.cta.budgetSlider.title")}
        </span>
        <div className="px-2.5 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm font-semibold text-white rounded-full whitespace-nowrap bg-[linear-gradient(45deg,#0badc2_23.91%,#0aa5be_75.06%)]">
          {formatted} {t("main_advertiser.cta.budgetSlider.currency")}
        </div>
      </div>

      <div className="relative pt-1 px-1">
        <CustomSlider
          min={MIN_BUDGET}
          max={MAX_BUDGET}
          step={100_000}
          value={budget}
          onChange={onChange}
          className="w-full mt-2 mb-2"
        />
        <AxisLabels />
      </div>
    </div>
  );
});
