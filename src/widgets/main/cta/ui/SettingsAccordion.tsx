import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@shared/ui";
import { ChevronDown, Settings } from "lucide-react";
import { memo } from "react";
import { SelectOptions } from "@features/other";
import type { IOption } from "@shared/types";
import type { UseFormSetValue } from "react-hook-form";
import type { ConfiguratorFormValues } from "../model/types";
import { useTranslation } from "react-i18next";

interface Props {
  open: boolean;
  onToggle: () => void;
  region: number[];
  language: number[];
  regionsOptions: IOption[];
  languagesOptions: IOption[];
  setValue: UseFormSetValue<ConfiguratorFormValues>;
}

export const SettingsAccordion = memo(function SettingsAccordion({
  open,
  onToggle,
  region,
  language,
  regionsOptions,
  languagesOptions,
  setValue,
}: Props) {
  const { t } = useTranslation();
  const value = open ? "settings" : "";

  const summaryParts = [
    region.length
      ? `${region.length} ${t("main_advertiser.cta.settings.regionShorthand")}`
      : t("main_advertiser.cta.settings.allRegions"),
    language.length
      ? `${language.length} ${t("main_advertiser.cta.settings.languageShorthand")}`
      : t("main_advertiser.cta.settings.allLanguages"),
  ];

  return (
    <Accordion
      type="single"
      collapsible
      value={value}
      onValueChange={(v) => {
        const shouldBeOpen = v === "settings";
        if (shouldBeOpen !== open) onToggle();
      }}
      className={`w-full rounded-2xl overflow-hidden transition-all border border-[#0F2A4D]/[0.07] ${
        open ? "bg-[#FAFCFD]" : "bg-white"
      }`}
    >
      <AccordionItem value="settings" className="border-none">
        <AccordionTrigger className="w-full flex items-center justify-between p-3 sm:p-3.5 hover:no-underline [&>svg]:hidden">
          <div className="flex items-center gap-2 sm:gap-3">
            <div
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center shrink-0 text-[#1AB5C5] ${
                open ? "bg-[#1AB5C5]/[0.13]" : "bg-[#1AB5C5]/[0.06]"
              }`}
            >
              <Settings size={16} />
            </div>
            <div className="text-left min-w-0">
              <div className="text-[13px] sm:text-[14px] font-semibold leading-tight text-[#0F2A4D]">
                {t("main_advertiser.cta.settings.additionalParams")}
              </div>
              <div className="text-[11px] sm:text-[12px] font-medium mt-0.5 truncate text-[#0F2A4D]/45">
                {open
                  ? t("main_advertiser.cta.settings.collapse")
                  : summaryParts.join(" · ")}
              </div>
            </div>
          </div>
          <div
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center shrink-0 text-[#1AB5C5] ${
              open ? "bg-[#1AB5C5]/[0.13]" : "bg-[#1AB5C5]/[0.06]"
            }`}
          >
            <ChevronDown size={16} className={`${open ? "rotate-180" : ""}`} />
          </div>
        </AccordionTrigger>

        <AccordionContent className="px-3 sm:px-3.5 pb-3 sm:pb-3.5 pt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
            <SelectOptions
              onChangeOption={setValue as UseFormSetValue<any>}
              options={regionsOptions}
              typeParameter="region"
              textData="catalog.region"
              defaultValue={region}
              isRow={true}
              showButtonClear={false}
              showListClear={false}
            />
            <SelectOptions
              onChangeOption={setValue as UseFormSetValue<any>}
              options={languagesOptions}
              typeParameter="language"
              textData="catalog.languages"
              defaultValue={language}
              isRow={true}
              showButtonClear={false}
              showListClear={false}
            />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
});
