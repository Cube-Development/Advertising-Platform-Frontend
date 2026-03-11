import { DollarIcon, EyeIcon, HistogramIcon, SubsIcon } from "@shared/assets";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  MyButton,
  Separator,
} from "@shared/ui";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { EffectiveCartModal } from "./EffectiveCartModal";

export interface EffectiveCartCardProps {
  title: string;
  titleColor: string;
  type: "optimal" | "economy";
  budget: number;
  budgetDiff: number;
  metrics: {
    reach: { value: string; diff: number };
    cpv: { value: string; diff: number };
    subscribers: { value: string; diff: number };
    er: { value: string; diff: number };
  };
}

interface MetricRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  diff: number;
}

const MetricRow: FC<MetricRowProps> = ({ icon, label, value, diff }) => {
  const isNegative = diff < 0;
  const colorClass = isNegative ? "text-red-400" : "text-[#71c371]";
  const formattedDiff = (diff > 0 ? "+" : "") + diff + "%";

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-1.5 text-[#7aabb5]">
        <div className="flex items-center justify-center w-5 h-5">{icon}</div>
        <span className="text-[10px]">{label}</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="font-semibold  text-[10px]">{value}</span>
        <span className={`font-medium text-[8px] ${colorClass}`}>
          {formattedDiff}
        </span>
      </div>
    </div>
  );
};

export const EffectiveCartCard: FC<EffectiveCartCardProps> = (props) => {
  const { t } = useTranslation();
  const { title, titleColor, budget, budgetDiff, metrics } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isPositive = budgetDiff > 0;
  const colorClass = isPositive ? "text-red-400" : "text-[#71c371]";
  const formattedDiff = (isPositive ? "+" : "") + budgetDiff.toLocaleString();

  return (
    <Card className="pt-4">
      <CardHeader className="mb-4 p-0 px-5">
        <div className="grid justify-start">
          <div
            className={`rounded-xl px-4 py-1.5 text-[12px] font-medium text-white ${titleColor}`}
          >
            {title}
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-5">
        <div className="mb-4 flex items-baseline gap-2">
          <span className="text-[12px] font-medium">
            {t("cart.effective.card.budget")}
          </span>
          <span className="text-[12px] font-semibold">
            {budget.toLocaleString()} {t("cart.effective.card.currency")}
          </span>
          <span className={`text-[8px] ${colorClass}`}>{formattedDiff}</span>
        </div>

        <div className="grid grid-cols-2 gap-y-4 gap-x-4 mb-5">
          <MetricRow
            icon={<EyeIcon />}
            label={t("cart.effective.card.metrics.reach")}
            value={metrics.reach.value}
            diff={metrics.reach.diff}
          />
          <MetricRow
            icon={
              <DollarIcon className="w-3.5 h-3.5 text-[var(--Personal-color-main)]" />
            }
            label={t("cart.effective.card.metrics.cpv")}
            value={metrics.cpv.value}
            diff={metrics.cpv.diff}
          />
          <MetricRow
            icon={<SubsIcon />}
            label={t("cart.effective.card.metrics.subscribers")}
            value={metrics.subscribers.value}
            diff={metrics.subscribers.diff}
          />
          <MetricRow
            icon={
              <HistogramIcon className="w-3.5 h-3.5 text-[var(--Personal-color-main)]" />
            }
            label={t("cart.effective.card.metrics.er")}
            value={metrics.er.value}
            diff={metrics.er.diff}
          />
        </div>

        <Separator />
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-4 px-5 pb-4">
        <MyButton
          buttons_type="button__white"
          onClick={() => setIsModalOpen(true)}
        >
          {t("cart.effective.card.buttons.details")}
        </MyButton>
        <MyButton>{t("cart.effective.card.buttons.replace")}</MyButton>
      </CardFooter>

      <EffectiveCartModal
        {...props}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Card>
  );
};
