import { FC } from "react";
import { useTranslation } from "react-i18next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Card,
} from "@shared/ui";
import { EffectiveCartCard, EffectiveCartCardProps } from "./EffectiveCartCard";
import { ChevronDown, Activity } from "lucide-react";

export const EffectiveCart: FC = () => {
  const { t } = useTranslation();

  const OPTIMAL_CART: EffectiveCartCardProps = {
    title: t("cart.effective.card.title_optimal"),
    titleColor: "bg-[#71c371]",
    type: "optimal",
    budget: 920000,
    budgetDiff: 30000,
    metrics: {
      reach: { value: "145.000", diff: 18.5 },
      cpv: { value: `1.600 ${t("cart.effective.card.currency")}`, diff: -20.0 },
      subscribers: { value: "68.000", diff: 12.0 },
      er: { value: "32%", diff: 45.0 },
    },
  };

  const ECONOMY_CART: EffectiveCartCardProps = {
    title: t("cart.effective.card.title_economy"),
    titleColor: "bg-[#FFA04F]",
    type: "economy",
    budget: 710000,
    budgetDiff: -180000,
    metrics: {
      reach: { value: "118.000", diff: -3.2 },
      cpv: { value: `2.100 ${t("cart.effective.card.currency")}`, diff: 1.5 },
      subscribers: { value: "55.000", diff: -2.0 },
      er: { value: "24%", diff: 2.1 },
    },
  };

  return (
    <Card>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="effective-carts" className="border-b-0">
          <AccordionTrigger className="px-6 py-4 grid grid-cols-[1fr_auto] gap-1 hover:no-underline flex items-center justify-between [&[data-state=open]>svg]:rotate-180">
            <div className="grid sm:grid-cols-[1fr_auto] items-center gap-2">
              <span className="text-base font-semibold">
                {t("cart.effective.main.title")}
              </span>
              <span className="rounded-lg bg-[#e8fbe8] px-3 py-1 text-[10px] font-medium text-[#71c371]">
                {t("cart.effective.main.selected_count", { count: 2 })}
              </span>
            </div>

            <ChevronDown className="w-5 h-5 text-muted-foreground m-2" />
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <div className="mb-6 rounded-xl bg-[#e8fbe8]/40 border border-[#71c371]/20 p-4 flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#71c371]/10 flex items-center justify-center text-[#71c371]">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#4a6b4a] mb-1">
                  {t("cart.effective.main.proven_title")}
                </h4>
                <p className="text-[11px] text-[#5c7a5c] leading-relaxed">
                  {t("cart.effective.main.proven_desc")}
                </p>
              </div>
            </div>
            <p className="text-[11px] mb-6 font-medium">
              {t("cart.effective.main.optimization_summary", {
                reach: OPTIMAL_CART.metrics.reach.diff,
                er: OPTIMAL_CART.metrics.er.diff,
              })}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <EffectiveCartCard {...OPTIMAL_CART} />
              <EffectiveCartCard {...ECONOMY_CART} />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};
