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
import {
  ArrowSmallVerticalIcon,
  CancelIcon2,
  ParametersIcon,
  QualityIcon,
} from "@shared/assets";
import { accordionTypes, BREAKPOINT, Languages } from "@shared/config";
import { pageFilter } from "@shared/routing";
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
import { FC, useEffect, useRef, useState } from "react";
import {
  useForm,
  UseFormGetValues,
  UseFormReset,
  UseFormSetValue,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import { EffectCoverflow, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./styles.module.scss";

interface ParametersFilterProps {
  setValue: UseFormSetValue<getCatalogReq>;
  reset: UseFormReset<getCatalogReq>;
  getValues: UseFormGetValues<getCatalogReq>;
  catalogFilter: catalogBarFilter;
  changeCatalogFilter: (filter: catalogBarFilter) => void;
}

export const ParametersFilter: FC<ParametersFilterProps> = ({
  setValue,
  reset,
  getValues,
  catalogFilter,
  changeCatalogFilter,
}) => {
  const { t, i18n } = useTranslation();
  const language = Languages.find((lang) => {
    return i18n.language === lang.name;
  });
  const [screen, setScreen] = useState<number>(window.innerWidth);
  const [recommendationCard, setRecCard] = useState<IFilterSearch | null>(null);
  const [recommendationCards, setRecCards] = useState<IFilterSearch[] | null>(
    null,
  );
  const accordionRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const handleResize = () => {
      setScreen(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const contentRes = {
    language: language?.id || Languages[0].id,
    page: 1,
  };

  const { data: categories } = useGetCompanyCategoriesQuery(contentRes);
  const { data: ages } = useGetChannelAgesQuery(contentRes);
  const { data: regions } = useGetChannelRegionsQuery(contentRes);
  const { data: languages } = useGetChannelLanguagesQuery(contentRes);
  const { filter } = getValues();

  const [text, setText] = useState<string>("");

  const { watch: watchAI, setValue: setValueAI } = useForm<getAIParametersReq>({
    defaultValues: {
      prompt: "",
    },
  });

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
      console.log(repackCards);
      setRecCards(repackCards);
    }
  }, [TAParameters]);

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
    <Drawer>
      <DrawerTrigger className="h-full">
        <div className={styles.button}>
          <ParametersIcon />
          {screen >= BREAKPOINT.MD && <p>Параметры</p>}
        </div>
      </DrawerTrigger>
      <DrawerContent className={styles.parameters}>
        <div className={styles.top}>
          <p className={styles.title}>Параметры</p>
          <DrawerClose className={styles.close}>
            <div>
              <CancelIcon2 />
            </div>
          </DrawerClose>
        </div>
        <ScrollArea className="h-[calc(100svh_-_80px)]">
          <div className={styles.wrapper}>
            <BarSubfilter
              resetValues={resetRecommendationCard}
              page={pageFilter.catalog}
              catalogFilter={catalogFilter}
              changeCatalogFilter={changeCatalogFilter}
            />
            <div className={styles.options}>
              {recommendationCards ? (
                <Accordion type="single" collapsible>
                  <AccordionItem
                    value={`item-TA-Cards-LITTLE`}
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
                  <div className="swipper__carousel">
                    <Swiper
                      className="swipper__wrapper"
                      modules={[Navigation, EffectCoverflow]}
                      spaceBetween={10}
                      slidesPerView={1.1}
                      breakpoints={{
                        768: {
                          slidesPerView: 2.1,
                          spaceBetween: 15,
                        },
                        576: {
                          slidesPerView: 1.7,
                        },
                        375: {
                          slidesPerView: 1.3,
                          spaceBetween: 10,
                        },
                      }}
                    >
                      {recommendationCards?.map((card, index) => (
                        <SwiperSlide key={index}>
                          <RecomTargetCard
                            key={index}
                            card={card}
                            onChange={handleUseRecommendionCard}
                            isChooseed={recommendationCard === card}
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </div>
              ) : (
                <></>
              )} */}
            </div>
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
};
