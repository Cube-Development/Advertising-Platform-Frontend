import {
  channelParameterData,
  useGetChannelAgesQuery,
  useGetChannelLanguagesQuery,
  useGetChannelRegionsQuery,
  useGetCompanyCategoriesQuery,
} from "@entities/channel";
import {
  catalogBarFilter,
  getAIParametersReq,
  getCatalogReq,
  getTAParametersReq,
  IFilterSearch,
  useGetAIParametersQuery,
  useGetTAParametersQuery,
} from "@entities/project";
import { AiFilter, RecomTargetCard } from "@features/catalog";
import {
  BarSubfilter,
  SelectDescription,
  SelectOptions,
  SelectSex,
} from "@features/other";
import { ArrowSmallVerticalIcon, QualityIcon } from "@shared/assets";
import { accordionTypes, Languages } from "@shared/config";
import { pageFilter } from "@shared/routing";
import { FC, useEffect, useRef, useState } from "react";
import {
  useForm,
  UseFormGetValues,
  UseFormReset,
  UseFormSetValue,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
  ScrollArea,
} from "@shared/ui";

interface CatalogSearchProps {
  setValue: UseFormSetValue<getCatalogReq>;
  reset: UseFormReset<getCatalogReq>;
  getValues: UseFormGetValues<getCatalogReq>;
  catalogFilter: catalogBarFilter;
  changeCatalogfilter: (filter: catalogBarFilter) => void;
}

export const CatalogSearch: FC<CatalogSearchProps> = ({
  setValue,
  reset,
  getValues,
  catalogFilter,
  changeCatalogfilter,
}) => {
  const { t, i18n } = useTranslation();
  const language = Languages.find((lang) => {
    return i18n.language === lang.name;
  });
  const contentRes = {
    language: language?.id || Languages[0].id,
    page: 1,
  };
  const accordionRefs = useRef<Array<HTMLDivElement | null>>([]);
  const { data: categories } = useGetCompanyCategoriesQuery(contentRes);
  const { data: ages } = useGetChannelAgesQuery(contentRes);
  const { data: regions } = useGetChannelRegionsQuery(contentRes);
  const { data: languages } = useGetChannelLanguagesQuery(contentRes);
  const [text, setText] = useState<string>("");
  const { watch: watchAI, setValue: setValueAI } = useForm<getAIParametersReq>({
    defaultValues: {
      prompt: "",
    },
  });
  const { filter } = getValues();

  const { watch: watchTA, setValue: setValueTA } = useForm<getTAParametersReq>({
    defaultValues: {
      category: filter?.business,
      region: filter?.region,
      language: filter?.language,
    },
  });

  const formFieldsAI = watchAI();
  const formFieldsTA = watchTA();

  const { data: AIParameters, isLoading: isLoadingAIParameters } =
    useGetAIParametersQuery({ prompt: text }, { skip: !text.length });

  const { data: TAParameters, isLoading: isLoadingTAParameters } =
    useGetTAParametersQuery(
      { ...formFieldsTA },
      {
        skip:
          !formFieldsTA.category.length ||
          (!!formFieldsTA.language.length && !formFieldsTA.region.length),
      },
    );

  const [recommendationCard, setRecCard] = useState<IFilterSearch | null>(null);
  const [recommendationCards, setRecCards] = useState<IFilterSearch[] | null>(
    null,
  );

  useEffect(() => {
    if (TAParameters) {
      const repackCards = TAParameters.map((card) => {
        // const filteredCategories = categories?.contents || [];
        // const filteredAge = ages?.contents || [];
        // const filteredRegion = regions?.contents || [];
        // const filteredLanguage = languages?.contents || [];
        const filteredCategories =
          categories?.contents.filter((item) =>
            card.category.includes(item.id),
          ) || [];
        const filteredAge =
          ages?.contents.filter((item) => card.age.includes(item.id)) || [];
        const filteredRegion =
          regions?.contents.filter((item) => card.region.includes(item.id)) ||
          [];
        const filteredLanguage =
          languages?.contents.filter((item) =>
            card.language.includes(item.id),
          ) || [];
        return {
          ...card,
          category: filteredCategories,
          age: filteredAge,
          region: filteredRegion,
          language: filteredLanguage,
        };
      });
      setRecCards(repackCards);
    }
  }, [TAParameters]);

  const resetRecommendationCard = () => {
    setRecCard(null);
    setRecCards(null);
    reset();
  };

  const handleUseRecommendionCard = (card: IFilterSearch) => {
    if (card === recommendationCard) {
      resetRecommendationCard();
    } else {
      setRecCard(card);
      const newFilter = { ...filter };
      newFilter.business = card?.category.map((item) => item.id);
      newFilter.age = card?.age.map((item) => item.id);
      newFilter.language = card?.language.map((item) => item.id);
      newFilter.region = card?.region.map((item) => item.id);
      newFilter.male = card?.male;
      newFilter.female = card?.female;
      setValue("filter", newFilter);
    }
  };

  const handleAIClick = () => {
    setText(formFieldsAI.prompt);
  };

  useEffect(() => {
    setValueTA(channelParameterData.category, filter?.business);
    setValueTA(channelParameterData.region, filter?.region);
    setValueTA(channelParameterData.language, filter?.language);
  }, [filter]);

  useEffect(() => {
    if (AIParameters) {
      setValueTA(channelParameterData.category, AIParameters?.category);
      setValueTA(channelParameterData.region, AIParameters?.region);
      setValueTA(channelParameterData.language, AIParameters?.language);
    }
  }, [AIParameters]);

  useEffect(() => {
    reset();
    if (catalogFilter === catalogBarFilter.parameters) {
      setValueTA(channelParameterData.category, filter?.business);
      setValueTA(channelParameterData.region, filter?.region);
      setValueTA(channelParameterData.language, filter?.language);
    }
  }, [catalogFilter]);

  useEffect(() => {
    accordionRefs.current.forEach((ref, index) => {
      if (ref) {
        console.log("ref", ref);
        const observer = new MutationObserver(() => {
          const state = ref.getAttribute("data-state");
          const icon = ref.querySelector(`.${styles.arrow} svg`);
          if (state === accordionTypes.open) {
            ref.classList.add(styles.active);
            if (icon) icon.classList.add("icon__white");
            if (icon) icon.classList.add("rotate__down");
            if (icon) icon.classList.remove("active__icon");
            if (icon) icon.classList.remove("rotate");
          } else {
            ref.classList.remove(styles.active);
            if (icon) icon.classList.add("active__icon");
            if (icon) icon.classList.add("rotate");
            if (icon) icon.classList.remove("icon__white");
            if (icon) icon.classList.remove("rotate__down");
          }
        });
        observer.observe(ref, {
          attributes: true,
          attributeFilter: ["data-state"],
        });
        return () => observer.disconnect();
      }
    });
  }, [recommendationCards]);

  return (
    <>
      <div className={styles.wrapper}>
        <BarSubfilter
          resetValues={resetRecommendationCard}
          page={pageFilter.catalog}
          changeCatalogFilter={changeCatalogfilter}
          catalogFilter={catalogFilter}
        />
        <div className={styles.options}>
          {recommendationCards ? (
            <Accordion type="single" collapsible>
              <AccordionItem
                value={`item-TA-Cards-BIG`}
                ref={(el) => (accordionRefs.current[0] = el)}
                className={styles.item}
              >
                <AccordionTrigger className={styles.trigger}>
                  <div className={styles.title}>
                    <QualityIcon />
                    <p>{t("catalog.recommendation.title")}</p>
                  </div>
                  <div className={styles.arrow}>
                    <ArrowSmallVerticalIcon className="active__icon rotate" />
                  </div>
                </AccordionTrigger>
                <AccordionContent className={styles.content}>
                  {recommendationCards.map((card, index) => (
                    <RecomTargetCard
                      key={index}
                      card={card}
                      onChange={handleUseRecommendionCard}
                      isChooseed={recommendationCard === card}
                    />
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ) : (
            <></>
          )}
          {catalogFilter === catalogBarFilter.parameters ? (
            <>
              <SelectOptions
                onChange={setValue}
                getValues={getValues}
                options={categories?.contents || []}
                single={false}
                type={channelParameterData.business}
                textData={"catalog.category"}
                isRow={true}
                isCatalog={true}
                defaultValues={filter.business}
              />
              <SelectOptions
                onChange={setValue}
                getValues={getValues}
                options={ages?.contents || []}
                single={false}
                type={channelParameterData.age}
                textData={"catalog.age"}
                isRow={true}
                isCatalog={true}
                defaultValues={filter.age}
              />
              <SelectSex
                onChange={setValue}
                getValues={getValues}
                title={"catalog.sex.title"}
                isRow={true}
                isCatalog={true}
                defaultValues={filter.male}
              />
              <SelectOptions
                onChange={setValue}
                getValues={getValues}
                options={languages?.contents || []}
                single={false}
                type={channelParameterData.language}
                textData={"catalog.languages"}
                isRow={true}
                isCatalog={true}
                defaultValues={filter.language}
              />
              <SelectOptions
                onChange={setValue}
                getValues={getValues}
                options={regions?.contents || []}
                single={false}
                type={channelParameterData.region}
                textData={"catalog.region"}
                isRow={true}
                isCatalog={true}
                defaultValues={filter.region}
              />
            </>
          ) : (
            <>
              <SelectDescription
                onChange={setValueAI}
                type={channelParameterData.prompt}
                title={"catalog.ai.title"}
                placeholder={"catalog.ai.default_input"}
              />
              <AiFilter
                isLoading={isLoadingAIParameters}
                onChange={handleAIClick}
              />
            </>
          )}
          {/* {recommendationCards ? (
            <div className={styles.recommendation}>
              <div className={styles.recommendation__title}>
                <QualityIcon />
                <p>{t("catalog.recommendation.title")}</p>
              </div>
              <div className={styles.recommendation__cards}>
                {recommendationCards.map((card, index) => (
                  <RecomTargetCard
                    key={index}
                    card={card}
                    onChange={handleUseRecommendionCard}
                    isChooseed={recommendationCard === card}
                  />
                ))}
              </div>
            </div>
          ) : (
            <></>
          )} */}
        </div>
      </div>
    </>
  );
};
