import { useCreateCartLiteMutation } from "@entities/project";
import { ENUM_PATHS } from "@shared/routing";
import { Button, Card } from "@shared/ui";
import { ArrowRight, Loader } from "lucide-react";
import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { useConfigurator } from "../model/useConfigurator";
import { BudgetSlider } from "./BudgetSlider";
import { CategoryGrid } from "./CategoryGrid";
import { ForecastCard } from "./ForecastCard";
import { SearchInput } from "./SearchInput";
import { SettingsAccordion } from "./SettingsAccordion";

export const ConfiguratorForm = memo(function ConfiguratorForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    setValue,
    formState,
    regionsData,
    languagesData,
    accordionOpen,
    setAccordionOpen,
    search,
    setSearch,
    filteredCategories,
    forecastMln,
    forecastBonus,
  } = useConfigurator();

  const [createCartLite, { isLoading }] = useCreateCartLiteMutation();

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

  const handleFormSubmit = async () => {
    try {
      if (isLoading) return;
      await createCartLite({
        category_ids: [Number(formState.categoryIdx)],
        budget: formState.budget,
        regions: formState.region,
        language_ids: formState.language,
      }).unwrap();

      navigate(ENUM_PATHS.CART);
    } catch (e) {
      console.error("Failed to create cart lite:", e);
    }
  };

  return (
    <Card className="relative rounded-3xl bg-white p-6 p-6 md:p-10 ring-0 flex flex-col gap-4 border-[#1AB5C5]/10 shadow-[0_30px_80px_-20px_rgba(15,42,77,0.18),0_8px_24px_-8px_rgba(15,42,77,0.06)]">
      {/* glow — чистый CSS, не зависит от state */}
      <div className="absolute -top-3 -right-3 w-24 h-24 rounded-full pointer-events-none bg-[radial-gradient(circle,#1AB5C525_0%,transparent_70%)] blur-[8px]" />

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
        activeCategoryIdx={formState.categoryIdx}
        search={search}
        onSelect={handleCategorySelect}
      />

      {/* forecast */}
      <ForecastCard
        forecastMln={forecastMln}
        forecastBonus={forecastBonus}
        hasCategory={formState.categoryIdx !== null}
      />

      {/* divider */}
      <div className="h-px bg-[#0F2A4D]/[0.06]" />

      {/* budget */}
      <BudgetSlider budget={formState.budget} onChange={handleBudgetChange} />

      {/* accordion */}
      <SettingsAccordion
        open={accordionOpen}
        onToggle={handleToggleAccordion}
        region={formState.region}
        language={formState.language}
        regionsOptions={regionsData}
        languagesOptions={languagesData}
        setValue={setValue}
      />

      {/* CTA */}
      <Button
        onClick={handleFormSubmit}
        disabled={isLoading}
        size={"xl"}
        variant={"primary"}
        className="flex gap-3"
      >
        <span className="relative z-10">
          {t("main_advertiser.cta.configurator.buttonText")}
        </span>
        {isLoading ? (
          <Loader size={18} className="relative z-10 animate-spin" />
        ) : (
          <ArrowRight
            size={18}
            className="relative z-10 transition-transform group-hover:translate-x-1"
          />
        )}
      </Button>

      {/* trust line */}
      {/* <div className="flex items-center justify-center gap-2 text-[12px] font-medium text-[#0F2A4D]/55">
        <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-[#22C55E] shadow-[0_0_0_3px_rgba(34,197,94,0.18)]" />
        {t("main_advertiser.cta.configurator.trustLine")}
      </div> */}
    </Card>
  );
});
