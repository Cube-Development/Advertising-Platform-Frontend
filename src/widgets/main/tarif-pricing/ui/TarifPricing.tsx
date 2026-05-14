import { Button, Card, cn, CustomHeading } from "@shared/ui";
import { CupStar } from "@solar-icons/react";
import { useLayoutEffect } from "react";
import { applyFlip } from "../lib/flip";
import { useTranslation } from "react-i18next";
import { usePricingLogic } from "../model/usePricingLogic";
import { BudgetSlider } from "./BudgetSlider";
import { FeatureCard } from "./FeatureCard";

export default function TarifPricing() {
  const { t } = useTranslation();
  const {
    stepIdx,
    budget,
    leftColumn,
    rightColumn,
    cardRefs,
    rectsBefore,
    pendingFlip,
    handleBudgetChange,
  } = usePricingLogic();

  useLayoutEffect(() => {
    if (!pendingFlip.current) return;
    pendingFlip.current = false;
    applyFlip(cardRefs.current, rectsBefore.current);
  });

  const setCardRef = (id: string) => (el: HTMLDivElement | null) => {
    cardRefs.current[id] = el;
  };

  return (
    <section className="container flex flex-col gap-6 lg:gap-10 px-4 sm:px-6 lg:px-0">
      <CustomHeading
        title={t("main_advertiser.tarif_pricing.title")}
        subtitle={t("main_advertiser.tarif_pricing.subtitle")}
      />
      <div className="w-full max-w-[860px] mx-auto flex flex-col gap-4 sm:gap-6 lg:gap-10">
        <BudgetSlider
          stepIdx={stepIdx}
          budget={budget}
          leftCount={leftColumn.length}
          rightCount={rightColumn.length}
          onBudgetChange={handleBudgetChange}
        />

        <div className="grid gap-4 md:grid-cols-2">
          {/* Left — Included */}
          <div>
            <div className="flex items-center gap-1.5 mb-2.5 justify-center">
              <div
                className="w-2.5 h-2.5 rounded-full animate-pulse"
                style={{ background: "#0badc2" }}
              />
              <p className="text-[10px] sm:text-xs font-semibold text-[hsl(187,30%,15%)] uppercase tracking-widest">
                {t("main_advertiser.tarif_pricing.labels.included")}
              </p>
            </div>
            <div className="space-y-2">
              {leftColumn.map((f) => (
                <Card
                  key={f.id}
                  ref={setCardRef(f.id)}
                  data-card-id={f.id}
                  className={cn(
                    "p-2.5 grid grid-cols-[auto_1fr_auto] items-center gap-2 ring-0 border-none rounded-2xl",
                    "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
                  )}
                  style={{ willChange: "transform" }}
                >
                  <FeatureCard feature={f} variant="active" />
                </Card>
              ))}
              {leftColumn.length === 0 && (
                <div className="text-sm text-[hsl(187,20%,52%)] text-center py-6 border border-dashed border-[hsl(187,25%,88%)] rounded-lg">
                  {t("main_advertiser.tarif_pricing.emptyStates.locked")}
                </div>
              )}
            </div>
          </div>

          {/* Right — Locked */}
          <div>
            <div className="flex items-center gap-1.5 mb-2.5 justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-[hsl(187,20%,52%)]/40" />
              <p className="text-[10px] sm:text-xs font-semibold text-[hsl(187,20%,52%)] uppercase tracking-widest">
                <span className="hidden sm:inline">
                  {t("main_advertiser.tarif_pricing.labels.locked")}
                </span>
                <span className="sm:hidden">
                  {t("main_advertiser.tarif_pricing.labels.lockedMobile")}
                </span>
              </p>
            </div>
            <div className="space-y-2">
              {rightColumn.map((f) => (
                <Card
                  key={f.id}
                  ref={setCardRef(f.id)}
                  data-card-id={f.id}
                  className={cn(
                    "p-2.5 grid grid-cols-[auto_1fr_auto] items-center gap-2 ring-0 border-none rounded-2xl",
                    "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
                  )}
                  style={{ willChange: "transform" }}
                >
                  <FeatureCard feature={f} variant="locked" />
                </Card>
              ))}
              {rightColumn.length === 0 && (
                <div className="py-6 border border-dashed border-[hsl(187,25%,88%)] rounded-lg flex flex-row items-center justify-center gap-1">
                  <p className="text-md font-semibold text-[#0badc2]">
                    {t("main_advertiser.tarif_pricing.emptyStates.unlocked")}
                  </p>
                  <CupStar weight={"Bold"} size={40} color="#0badc2" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            className="px-4 sm:px-6 h-auto py-2 sm:py-2.5 text-xs sm:text-sm rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 border-0 w-full sm:w-auto"
            style={{
              background:
                "linear-gradient(45deg, #0badc2 23.91%, #0aa5be 75.06%)",
            }}
          >
            {t("main_advertiser.tarif_pricing.buttonText")}
          </Button>
          <p className="text-xs text-[hsl(187,20%,52%)] mt-2">
            {t("main_advertiser.tarif_pricing.trustLine")}
          </p>
        </div>
      </div>
    </section>
  );
}
