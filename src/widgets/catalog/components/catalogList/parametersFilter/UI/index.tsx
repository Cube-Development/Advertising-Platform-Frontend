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
  getCatalogReq,
  getTAParametersReq,
  ICatalogFilter,
  IFilterSearch,
  useGetTAParametersQuery,
} from "@entities/project";
import { useFindLanguage } from "@entities/user";
import { RecomTargetCard } from "@features/catalog";
import { BarSubFilter, SelectOptions, SelectSex } from "@features/other";
import {
  ArrowSmallVerticalIcon,
  CancelIcon2,
  ParametersIcon,
} from "@shared/assets";
import { BREAKPOINT, ENUM_ACCORDION_TYPES } from "@shared/config";
import { useWindowWidth } from "@shared/hooks";
import { USER_LANGUAGES_LIST } from "@shared/languages";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
  ScrollArea,
} from "@shared/ui";
import { AiChatFilter } from "@widgets/catalog/components/ai-chat-filter";
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
  catalogFilter: CATALOG_FILTER;
  changeCatalogFilter: (filter: CATALOG_FILTER) => void;
}

export const ParametersFilter: FC<ParametersFilterProps> = ({
  setValue,
  reset,
  formState,
  catalogFilter,
  changeCatalogFilter,
}) => {
  const { t } = useTranslation();
  const language = useFindLanguage();
  const screen = useWindowWidth();
  const [recommendationCard, setRecCard] = useState<IFilterSearch | null>(null);
  const [recommendationCards, setRecCards] = useState<IFilterSearch[] | null>(
    null,
  );
  const accordionRefs = useRef<Array<HTMLDivElement | null>>([]);

  const contentRes = {
    language: language?.id || USER_LANGUAGES_LIST[0].id,
    page: 1,
  };

  const { data: categories } = useGetCompanyCategoriesQuery(contentRes);
  const { data: ages } = useGetChannelAgesQuery(contentRes);
  const { data: regions } = useGetChannelRegionsQuery(contentRes);
  const { data: languages } = useGetChannelLanguagesQuery(contentRes);

  const { watch: watchTA, setValue: setValueTA } = useForm<getTAParametersReq>({
    defaultValues: {
      category: formState?.filter?.business,
      region: formState?.filter?.region,
      language: formState?.filter?.language,
    },
  });

  const [isRecom, setIsRecom] = useState<boolean>(false);

  const formFieldsTA = watchTA();

  const {
    data: TAParameters,
    isLoading: isLoadingTAParameters,
    isFetching: isFetchingTAParameters,
  } = useGetTAParametersQuery(
    { ...formFieldsTA },
    {
      // skip:
      //   !formFieldsTA.category.length ||
      //   (!!formFieldsTA.language.length && !formFieldsTA.region.length) ||
      //   isRecom === true,
      skip: true,
    },
  );

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

  useEffect(() => {
    setValueTA(channelParameterData.category, formState?.filter?.business);
    setValueTA(channelParameterData.region, formState?.filter?.region);
    setValueTA(channelParameterData.language, formState?.filter?.language);
  }, [formState?.filter]);

  // Сбрасывает фильтры при смене табы
  // useEffect(() => {
  //   reset();
  //   if (catalogFilter === CATALOG_FILTER.PARAMETERS) {
  //     setValueTA(channelParameterData.category, formState?.filter?.business);
  //     setValueTA(channelParameterData.region, formState?.filter?.region);
  //     setValueTA(channelParameterData.language, formState?.filter?.language);
  //   }
  // }, [catalogFilter]);

  useEffect(() => {
    accordionRefs.current.forEach((ref) => {
      if (ref) {
        const observer = new MutationObserver(() => {
          const state = ref.getAttribute("data-state");
          const icon = ref.querySelector(`.${styles.arrow} svg`);
          if (state === ENUM_ACCORDION_TYPES.OPEN) {
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

  const handleAiFind = (value: ICatalogFilter) => {
    setValue("filter", { ...formState?.filter, ...value });
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger className="h-full">
        <div className={styles.button}>
          <ParametersIcon />
          {screen >= BREAKPOINT.MD && <p>{t("catalog.search.parameters")}</p>}
        </div>
      </DrawerTrigger>
      <DrawerContent className={styles.parameters}>
        <DrawerDescription className="sr-only"></DrawerDescription>
        <div className={styles.top}>
          <DrawerTitle className={`gradient_color ${styles.title}`}>
            {t("catalog.search.parameters")}
          </DrawerTitle>
          <DrawerClose className={styles.close}>
            <div>
              <CancelIcon2 />
            </div>
          </DrawerClose>
        </div>
        <ScrollArea className="h-[calc(100svh_-_80px)]">
          <div className={styles.wrapper}>
            <BarSubFilter
              tab={catalogFilter}
              changeTab={changeCatalogFilter}
              tab_list={CATALOG_FILTER_TABS_LIST}
              // resetValues={resetRecommendationCard}
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
                        {isFetchingTAParameters || isLoadingTAParameters ? (
                          <div className="grid items-center justify-center">
                            <Loader
                              className="animate-spin"
                              stroke="#0BADC2"
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
                      stroke="#0BADC2"
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
                    onChangeOption={setValue}
                    options={categories?.contents || []}
                    typeParameter={channelParameterData.business}
                    textData={"catalog.category"}
                    defaultValue={formState?.filter?.business}
                    isRow={true}
                    searchable={true}
                  />
                  <SelectOptions
                    data={formState?.filter}
                    typeData={channelData.filter}
                    onChangeOption={setValue}
                    options={regions?.contents || []}
                    typeParameter={channelParameterData.region}
                    textData={"catalog.region"}
                    isRow={true}
                    defaultValue={formState?.filter?.region}
                  />
                  <SelectOptions
                    data={formState?.filter}
                    typeData={channelData.filter}
                    onChangeOption={setValue}
                    options={languages?.contents || []}
                    typeParameter={channelParameterData.language}
                    textData={"catalog.languages"}
                    isRow={true}
                    defaultValue={formState?.filter?.language}
                  />
                  <SelectSex
                    data={formState?.filter}
                    typeData={channelData.filter}
                    onChange={setValue}
                    typeMan={channelParameterData.male}
                    typeWoman={channelParameterData.female}
                    title={"catalog.sex.title"}
                    defaultValues={formState?.filter?.male}
                    isRow={true}
                    iconsAboveSlider={true}
                    showResetCheckbox={true}
                  />
                  <SelectOptions
                    data={formState?.filter}
                    typeData={channelData.filter}
                    onChangeOption={setValue}
                    options={ages?.contents || []}
                    typeParameter={channelParameterData.age}
                    textData={"catalog.age"}
                    isRow={true}
                    defaultValue={formState?.filter?.age}
                  />
                </>
              ) : (
                <AiChatFilter handleFind={handleAiFind} />
              )}
            </div>
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
};
