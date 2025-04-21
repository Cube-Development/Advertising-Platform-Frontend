import {
  channelData,
  channelParameterData,
  useGetChannelAgesQuery,
  useGetChannelLanguagesQuery,
  useGetChannelRegionsQuery,
  useGetCompanyCategoriesQuery,
} from "@entities/channel";
import {
  CATALOG_FILTER,
  CATALOG_FILTER_TABS_LIST,
  getAIParametersReq,
  getCatalogReq,
  getTAParametersReq,
  IFilterSearch,
  useGetAIParametersQuery,
  useGetTAParametersQuery,
} from "@entities/project";
import { useFindLanguage } from "@entities/user";
import { AiFilter, RecomTargetCard } from "@features/catalog";
import {
  BarSubfilter,
  SelectDescription,
  SelectOptions,
  SelectSex,
} from "@features/other";
import { ArrowSmallVerticalIcon } from "@shared/assets";
import { accordionTypes, Languages } from "@shared/config";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@shared/ui";
import { Loader } from "lucide-react";
import { FC, useEffect, useRef, useState } from "react";
import { useForm, UseFormReset, UseFormSetValue } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import recomAnimation from "/animated/recom_lottie.gif";

interface CatalogSearchProps {
  setValue: UseFormSetValue<getCatalogReq>;
  reset: UseFormReset<getCatalogReq>;
  formState: getCatalogReq;
  catalogFilter: CATALOG_FILTER;
  changeCatalogFilter: (filter: CATALOG_FILTER) => void;
}

export const CatalogSearch: FC<CatalogSearchProps> = ({
  setValue,
  reset,
  formState,
  catalogFilter,
  changeCatalogFilter,
}) => {
  const { t } = useTranslation();
  const language = useFindLanguage();
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

  const { watch: watchTA, setValue: setValueTA } = useForm<getTAParametersReq>({
    defaultValues: {
      category: formState?.filter?.business,
      region: formState?.filter?.region,
      language: formState?.filter?.language,
    },
  });

  const [isRecom, setIsRecom] = useState<boolean>(false);

  const formFieldsAI = watchAI();
  const formFieldsTA = watchTA();

  const {
    data: AIParameters,
    isLoading: isLoadingAIParameters,
    isFetching: isFetchingAIParameters,
  } = useGetAIParametersQuery({ prompt: text }, { skip: !text.length });

  const {
    data: TAParameters,
    isLoading: isLoadingTAParameters,
    isFetching: isFetchingTAParameters,
  } = useGetTAParametersQuery(
    { ...formFieldsTA },
    {
      skip:
        !formFieldsTA.category.length ||
        (!!formFieldsTA.language.length && !formFieldsTA.region.length) ||
        isRecom === true,
    },
  );

  const [recommendationCard, setRecCard] = useState<IFilterSearch | null>(null);
  const [recommendationCards, setRecCards] = useState<IFilterSearch[] | null>(
    null,
  );

  useEffect(() => {
    if (!recommendationCard) {
      return;
    }

    const isEqualArrays = (arr1: number[], arr2: number[]) =>
      arr1?.length === arr2?.length && arr1?.every((val) => arr2.includes(val));

    if (
      !isEqualArrays(
        formState.filter.age,
        recommendationCard?.age?.map((item) => item.id),
      ) ||
      !isEqualArrays(
        formState.filter.business,
        recommendationCard?.category?.map((item) => item.id),
      ) ||
      !isEqualArrays(
        formState.filter.language,
        recommendationCard?.language?.map((item) => item.id),
      ) ||
      !isEqualArrays(
        formState.filter.region,
        recommendationCard?.region?.map((item) => item.id),
      ) ||
      formState.filter.male !== recommendationCard?.male ||
      formState.filter.female !== recommendationCard?.female
    ) {
      setRecCard(null);
    }
  }, [formState.filter]);

  console.log("recommendationCard", recommendationCard);

  useEffect(() => {
    if (TAParameters) {
      const repackCards = TAParameters.map((card) => {
        const filteredCategories =
          categories?.contents.filter((item) =>
            card?.category.includes(item.id),
          ) || [];
        const filteredAge =
          ages?.contents.filter((item) => card?.age.includes(item.id)) || [];
        const filteredRegion =
          regions?.contents.filter((item) => card?.region.includes(item.id)) ||
          [];
        const filteredLanguage =
          languages?.contents.filter((item) =>
            card?.language.includes(item.id),
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

  const handleUseRecommendationCard = (card: IFilterSearch) => {
    if (card === recommendationCard) {
      setIsRecom(false);
    } else {
      setIsRecom(true);
      setRecCard(card);
    }
  };

  useEffect(() => {
    if (isRecom && recommendationCard) {
      const newFilter = { ...formState?.filter };

      newFilter.business = recommendationCard.category?.map((item) => item.id);
      newFilter.age = recommendationCard.age?.map((item) => item.id);
      newFilter.language = recommendationCard.language?.map((item) => item.id);
      newFilter.region = recommendationCard.region?.map((item) => item.id);
      newFilter.male = recommendationCard.male;
      newFilter.female = recommendationCard.female;

      setValue("filter", newFilter);
    } else if (!isRecom) {
      resetRecommendationCard();
    }
    setTimeout(() => {
      setOpenAccordion("");
    }, 500);
  }, [isRecom, recommendationCard]);

  const handleAIClick = () => {
    setText(formFieldsAI.prompt);
  };

  useEffect(() => {
    setValueTA(channelParameterData.category, formState?.filter?.business);
    setValueTA(channelParameterData.region, formState?.filter?.region);
    setValueTA(channelParameterData.language, formState?.filter?.language);
  }, [formState?.filter]);

  useEffect(() => {
    if (AIParameters) {
      setValueTA(channelParameterData.category, AIParameters?.category);
      setValueTA(channelParameterData.region, AIParameters?.region);
      setValueTA(channelParameterData.language, AIParameters?.language);
      setOpenAccordion("item-TA-Cards-BIG");
    }
  }, [AIParameters]);

  useEffect(() => {
    reset();
    if (catalogFilter === CATALOG_FILTER.PARAMETERS) {
      setValueTA(channelParameterData.category, formState?.filter?.business);
      setValueTA(channelParameterData.region, formState?.filter?.region);
      setValueTA(channelParameterData.language, formState?.filter?.language);
    }
  }, [catalogFilter]);

  useEffect(() => {
    accordionRefs.current.forEach((ref) => {
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

  const [openAccordion, setOpenAccordion] = useState<string | undefined>(
    undefined,
  );

  const handleAccordionChange = (value: string) => {
    setOpenAccordion(openAccordion === value ? undefined : value);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <BarSubfilter
          tab={catalogFilter}
          changeTab={changeCatalogFilter}
          tab_list={CATALOG_FILTER_TABS_LIST}
          resetValues={resetRecommendationCard}
        />
        <div className={styles.options}>
          {recommendationCards && (
            <Accordion
              type="single"
              collapsible
              className={`${styles.accordion} ${recommendationCard && styles.selected}`}
              value={openAccordion}
              onValueChange={handleAccordionChange}
            >
              <AccordionItem
                value={`item-TA-Cards-BIG`}
                ref={(el) => (accordionRefs.current[0] = el)}
                className={styles.item}
              >
                <AccordionTrigger className={styles.trigger}>
                  <div className={styles.title}>
                    {isFetchingTAParameters || isLoadingTAParameters ? (
                      <div className="grid items-center justify-center">
                        <Loader
                          className="animate-spin"
                          stroke="#4772e6"
                          width={20}
                          height={20}
                        />
                      </div>
                    ) : (
                      <>
                        <div className={styles.trigger__lottie}>
                          <img src={recomAnimation} alt="recom_lottie_gif" />
                        </div>
                        <p>{t("catalog.recommendation.title")}</p>
                      </>
                    )}
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
                      onChange={handleUseRecommendationCard}
                      isChosen={recommendationCard === card}
                    />
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}
          {!recommendationCards &&
            (isLoadingTAParameters || isFetchingTAParameters) && (
              <div className="grid items-center justify-center">
                <Loader
                  className="animate-spin"
                  stroke="#4772e6"
                  width={30}
                  height={30}
                />
              </div>
            )}
          {catalogFilter === CATALOG_FILTER.PARAMETERS ? (
            <>
              <SelectOptions
                data={formState?.filter}
                typeData={channelData.filter}
                typeParameter={channelParameterData.business}
                onChangeOption={setValue}
                options={categories?.contents || []}
                textData={"catalog.category"}
                defaultValue={formState?.filter?.business}
                isRow={true}
                searchable={true}
              />
              <SelectOptions
                data={formState?.filter}
                typeData={channelData.filter}
                typeParameter={channelParameterData.region}
                onChangeOption={setValue}
                options={regions?.contents || []}
                textData={"catalog.region"}
                defaultValue={formState?.filter.region}
                isRow={true}
              />
              <SelectOptions
                data={formState?.filter}
                typeData={channelData.filter}
                onChangeOption={setValue}
                options={languages?.contents || []}
                typeParameter={channelParameterData.language}
                textData={"catalog.languages"}
                defaultValue={formState?.filter.language}
                isRow={true}
              />
              <SelectSex
                data={formState?.filter}
                typeData={channelData.filter}
                onChange={setValue}
                typeMan={channelParameterData.male}
                typeWoman={channelParameterData.female}
                title={"catalog.sex.title"}
                defaultValues={formState?.filter.male}
                isRow={true}
                iconsAboveSlider={true}
                showResetCheckbox={true}
              />
              <SelectOptions
                data={formState?.filter}
                typeData={channelData.filter}
                typeParameter={channelParameterData.age}
                onChangeOption={setValue}
                options={ages?.contents || []}
                defaultValue={formState?.filter.age}
                textData={"catalog.age"}
                isRow={true}
              />
            </>
          ) : (
            <>
              <SelectDescription
                onChange={setValueAI}
                type={channelParameterData.prompt}
                title={"catalog.ai.title"}
                placeholder={"catalog.ai.default_input"}
                isCatalog
              />
              <AiFilter
                isLoading={isLoadingAIParameters || isFetchingAIParameters}
                onChange={handleAIClick}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};
