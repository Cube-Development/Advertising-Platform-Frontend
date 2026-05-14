import { Card, cn, CustomSlider } from "@shared/ui";
import { formatBudget } from "../lib/format";
import { AXIS_LABELS, STEPS } from "../model/constants";
import { useTranslation } from "react-i18next";

interface BudgetSliderProps {
  stepIdx: number;
  budget: number;
  leftCount: number;
  rightCount: number;
  onBudgetChange: (newIdx: number) => void;
}

export function BudgetSlider({
  stepIdx,
  budget,
  leftCount,
  rightCount,
  onBudgetChange,
}: BudgetSliderProps) {
  const { t } = useTranslation();
  const budgetMin = STEPS[0];
  const budgetMax = STEPS[STEPS.length - 1];
  const range = budgetMax - budgetMin;

  return (
    <Card
      className={cn(
        "px-6 lg:px-10 gap-0 border-none ring-0 shadow-sm rounded-2xl py-4 sm:py-5",
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
      )}
    >
      <div className="flex items-center justify-between mb-1.5 gap-2">
        <span className="text-xs sm:text-sm font-medium text-[hsl(187,20%,52%)]">
          {t("main_advertiser.tarif_pricing.budgetSlider.title")}
        </span>
        <div
          className="px-2.5 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm font-semibold text-white rounded-full whitespace-nowrap"
          style={{
            background:
              "linear-gradient(45deg, #0badc2 23.91%, #0aa5be 75.06%)",
          }}
        >
          {formatBudget(budget)}
        </div>
      </div>

      {/* Slider track */}
      <div className="relative mt-4 mb-2">
        <CustomSlider
          min={0}
          max={STEPS.length - 1}
          step={1}
          value={stepIdx}
          onChange={onBudgetChange}
        />

        {/* Axis labels */}
        <div className="relative h-5 mt-2">
          {AXIS_LABELS.map((point) => {
            const pct = ((point.value - budgetMin) / range) * 100;
            return (
              <span
                key={point.value}
                className="absolute text-[10px] sm:text-xs text-[hsl(187,20%,52%)] -translate-x-1/2 font-semibold whitespace-nowrap"
                style={{ left: `${pct}%` }}
              >
                {t(point.label)}
              </span>
            );
          })}
        </div>
      </div>

      {/* Summary */}
      <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-[hsl(187,25%,88%)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-0">
        <div className="text-xs sm:text-sm text-[hsl(187,20%,52%)]">
          {t("main_advertiser.tarif_pricing.budgetSlider.included")}{" "}
          <span className="font-semibold text-[hsl(187,30%,15%)]">
            {leftCount}
          </span>{" "}
          {t("main_advertiser.tarif_pricing.budgetSlider.outOf")}{" "}
          {leftCount + rightCount}
        </div>
        <div className="text-xs sm:text-sm text-[hsl(187,20%,52%)]">
          {t("main_advertiser.tarif_pricing.budgetSlider.locked")}{" "}
          <span className="font-semibold text-[hsl(187,30%,15%)]">
            {rightCount}
          </span>
        </div>
      </div>
    </Card>
  );
}
