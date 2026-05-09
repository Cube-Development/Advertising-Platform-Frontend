import { Button, Card } from "@shared/ui";
import { ArrowRight } from "lucide-react";
import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useConfigurator } from "../model/useConfigurator";
import { BudgetSlider } from "./BudgetSlider";
import { CategoryGrid } from "./CategoryGrid";
import { ForecastCard } from "./ForecastCard";
import { SearchInput } from "./SearchInput";
import { SettingsAccordion } from "./SettingsAccordion";

export const ConfiguratorForm = memo(function ConfiguratorForm() {
  const { t } = useTranslation();
  const {
    setValue,
    categoryIdx,
    budget,
    region,
    language,
    regionsData,
    languagesData,
    accordionOpen,
    setAccordionOpen,
    search,
    setSearch,
    filteredCategories,
    forecastMln,
    forecastBonus,
    isFormValid,
    handleSubmit,
  } = useConfigurator();

  const handleToggleAccordion = useCallback(() => {
    setAccordionOpen((v) => !v);
  }, [setAccordionOpen]);

  const handleBudgetChange = useCallback(
    (v: number) => setValue("budget", v),
    [setValue],
  );

  const handleCategorySelect = useCallback(
    (idx: number | null) => setValue("categoryIdx", idx),
    [setValue],
  );

  return (
    <Card
      className="relative rounded-3xl bg-white p-4 lg:p-6 ring-0 flex flex-col gap-4 border-[#1AB5C5]/10 shadow-[0_30px_80px_-20px_rgba(15,42,77,0.18),0_8px_24px_-8px_rgba(15,42,77,0.06)]"
    >
      {/* glow — чистый CSS, не зависит от state */}
      <div
        className="absolute -top-3 -right-3 w-24 h-24 rounded-full pointer-events-none bg-[radial-gradient(circle,#1AB5C525_0%,transparent_70%)] blur-[8px]"
      />

      {/* header */}
      <div className="relative">
        <div className="text-lg sm:text-[22px] font-bold leading-tight text-[#0F2A4D]">
          {t("main_advertiser.cta.configurator.title")}
        </div>
      </div>

      {/* search */}
      <SearchInput value={search} onChange={setSearch} />

      {/* categories */}
      <CategoryGrid
        filteredCategories={filteredCategories}
        activeCategoryIdx={categoryIdx}
        search={search}
        onSelect={handleCategorySelect}
      />

      {/* forecast */}
      <ForecastCard
        forecastMln={forecastMln}
        forecastBonus={forecastBonus}
        hasCategory={categoryIdx !== null}
      />

      {/* divider */}
      <div className="h-px bg-[#0F2A4D]/[0.06]" />

      {/* budget */}
      <BudgetSlider
        budget={budget}
        onChange={handleBudgetChange}
      />

      {/* accordion */}
      <SettingsAccordion
        open={accordionOpen}
        onToggle={handleToggleAccordion}
        region={region}
        language={language}
        regionsOptions={regionsData}
        languagesOptions={languagesData}
        setValue={setValue}
      />

      {/* CTA */}
      <Button
        onClick={() => handleSubmit((data) => {
          console.log("Campaign form data:", data);
          alert(t("main_advertiser.cta.configurator.alertSuccess"));
        })}
        disabled={!isFormValid}
        className="group relative w-full h-auto py-3.5 sm:py-4 rounded-2xl text-white font-bold text-sm sm:text-[16px] flex items-center justify-center gap-2 border-0 hover:-translate-y-0.5 active:translate-y-0 transition-all overflow-hidden disabled:opacity-50 disabled:hover:translate-y-0 bg-[linear-gradient(135deg,#1AB5C5_0%,#16C7D4_100%)] shadow-[0_16px_36px_-8px_#1AB5C565,inset_0_1px_0_rgba(255,255,255,0.25)]"
      >
        <span className="relative z-10">{t("main_advertiser.cta.configurator.buttonText")}</span>
        <ArrowRight
          size={18}
          className="relative z-10 transition-transform group-hover:translate-x-1"
        />
      </Button>

      {/* trust line */}
      <div className="flex items-center justify-center gap-2 text-[12px] font-medium text-[#0F2A4D]/55">
        <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-[#22C55E] shadow-[0_0_0_3px_rgba(34,197,94,0.18)]" />
        {t("main_advertiser.cta.configurator.trustLine")}
      </div>
    </Card>
  );
})
