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
} from "@shared/assets";
import { accordionTypes, BREAKPOINT, Languages } from "@shared/config";
import { useWindowWidth } from "@shared/hooks";
import { pageFilter } from "@shared/routing";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  DialogTitle,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
  ScrollArea,
} from "@shared/ui";
import { Loader } from "lucide-react";
import { FC, useEffect, useRef, useState } from "react";
import { useForm, UseFormReset, UseFormSetValue } from "react-hook-form";
import { useTranslation } from "react-i18next";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import styles from "./styles.module.scss";
import recomAnimation from "/animated/recom_lottie.gif";

interface ParametersFilterProps {
  setValue: UseFormSetValue<getCatalogReq>;
  reset: UseFormReset<getCatalogReq>;
  formState: getCatalogReq;
  catalogFilter: catalogBarFilter;
  changeCatalogFilter: (filter: catalogBarFilter) => void;
}

export const ParametersFilter: FC<ParametersFilterProps> = ({
  setValue,
  reset,
  formState,
  catalogFilter,
  changeCatalogFilter,
}) => {
  const { t, i18n } = useTranslation();
  const language = Languages.find((lang) => {
    return i18n.language === lang.name;
  });
  const screen = useWindowWidth();
  const [recommendationCard, setRecCard] = useState<IFilterSearch | null>(null);
  const [recommendationCards, setRecCards] = useState<IFilterSearch[] | null>(
    null,
  );
  const accordionRefs = useRef<Array<HTMLDivElement | null>>([]);

  const contentRes = {
    language: language?.id || Languages[0].id,
    page: 1,
  };

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
  const { data: AIParameters, isLoading: isLoadingAIParameters } =
    useGetAIParametersQuery({ prompt: text }, { skip: !text.length });

  const {
    data: TAParameters,
    isLoading: isLoadingTAParameters,
    isFetching: isFetchingTAParaments,
  } = useGetTAParametersQuery(
    { ...formFieldsTA },
    {
      skip:
        !formFieldsTA.category.length ||
        (!!formFieldsTA.language.length && !formFieldsTA.region.length) ||
        isRecom === true,
    },
  );

  const resetRecommendationCard = () => {
    setRecCard(null);
    setRecCards(null);
    reset();
  };

  const handleUseRecommendionCard = (card: IFilterSearch) => {
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
    // setTimeout(() => {
    //   setOpenAccordion("");
    // }, 300);
    setTimeout(() => {
      setIsOpen(false);
    }, 300);
  }, [isRecom, recommendationCard]);

  useEffect(() => {
    if (TAParameters) {
      const repackCards = TAParameters.map((card) => {
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
    }
  }, [AIParameters]);

  useEffect(() => {
    reset();
    if (catalogFilter === catalogBarFilter.parameters) {
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

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger className="h-full">
        <div className={styles.button}>
          <ParametersIcon />
          {screen >= BREAKPOINT.MD && <p>{t("catalog.search.parameters")}</p>}
        </div>
      </DrawerTrigger>
      <DrawerContent className={styles.parameters}>
        <DialogTitle className="sr-only"></DialogTitle>
        <div className={styles.top}>
          <p className={`gradient_color ${styles.title}`}>
            {t("catalog.search.parameters")}
          </p>
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
              {recommendationCards && (
                <Accordion
                  type="single"
                  collapsible
                  className={`${styles.accordion} ${recommendationCard && styles.selected}`}
                  value={openAccordion}
                  onValueChange={handleAccordionChange}
                >
                  <AccordionItem
                    value={`item-TA-Cards-LITTLE`}
                    ref={(el) => (accordionRefs.current[0] = el)}
                    className={styles.item}
                  >
                    <AccordionTrigger className={styles.trigger}>
                      <div className={styles.title}>
                        {isFetchingTAParaments || isLoadingTAParameters ? (
                          <div className="grid justify-center items-center">
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
                              <img
                                src={recomAnimation}
                                alt="recom_lottie_gif"
                              />
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
                          onChange={handleUseRecommendionCard}
                          isChooseed={recommendationCard === card}
                        />
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )}
              {!recommendationCards &&
                (isLoadingTAParameters || isFetchingTAParaments) && (
                  <div className="grid justify-center items-center">
                    <Loader
                      className="animate-spin"
                      stroke="#4772e6"
                      width={30}
                      height={30}
                    />
                  </div>
                )}
              {catalogFilter === catalogBarFilter.parameters ? (
                <>
                  <SelectOptions
                    onChangeOption={setValue}
                    formState={formState}
                    options={categories?.contents || []}
                    single={false}
                    type={channelParameterData.business}
                    textData={"catalog.category"}
                    isRow={true}
                    isCatalog={true}
                    defaultValue={formState?.filter?.business}
                  />
                  <SelectOptions
                    onChangeOption={setValue}
                    formState={formState}
                    options={regions?.contents || []}
                    single={false}
                    type={channelParameterData.region}
                    textData={"catalog.region"}
                    isRow={true}
                    isCatalog={true}
                    defaultValue={formState?.filter?.region}
                  />
                  <SelectOptions
                    onChangeOption={setValue}
                    formState={formState}
                    options={languages?.contents || []}
                    single={false}
                    type={channelParameterData.language}
                    textData={"catalog.languages"}
                    isRow={true}
                    isCatalog={true}
                    defaultValue={formState?.filter?.language}
                  />
                  <SelectSex
                    onChange={setValue}
                    formState={formState}
                    title={"catalog.sex.title"}
                    isRow={true}
                    isCatalog={true}
                    defaultValues={formState?.filter?.male}
                  />
                  <SelectOptions
                    onChangeOption={setValue}
                    formState={formState}
                    options={ages?.contents || []}
                    single={false}
                    type={channelParameterData.age}
                    textData={"catalog.age"}
                    isRow={true}
                    isCatalog={true}
                    defaultValue={formState?.filter?.age}
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
                    isLoading={isLoadingAIParameters}
                    onChange={handleAIClick}
                  />
                </>
              )}
            </div>
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
};
