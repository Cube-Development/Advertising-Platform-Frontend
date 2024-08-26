import {
  channelData,
  useGetChannelAgesQuery,
  useGetChannelLanguagesQuery,
  useGetChannelRegionsQuery,
  useGetCompanyCategoriesQuery,
} from "@entities/channel";
import {
  IFilterSearch,
  catalogBarFilter,
  getCatalogReq,
} from "@entities/project";
import { AiFilter, RecomTargetCard } from "@features/catalog";
import {
  BarSubfilter,
  SelectDescription,
  SelectOptions,
  SelectSex,
} from "@features/other";
import { CancelIcon2, ParametersIcon, QualityIcon } from "@shared/assets";
import { AIRecommendCARDS, BREAKPOINT, Languages } from "@shared/config";
import { pageFilter } from "@shared/routing";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
  ScrollArea,
} from "@shared/ui";
import { FC, useEffect, useState } from "react";
import {
  UseFormGetValues,
  UseFormReset,
  UseFormSetValue,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
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

  const resetRecommendationCard = () => {
    setRecCard(null);
    setRecCards(null);
    reset();
    // console.log("resetRecommendationCard");
  };

  const handleUseRecommendionCard = (card: IFilterSearch) => {
    if (card === recommendationCard) {
      resetRecommendationCard();
    } else {
      setRecCard(card);
      const newFilter = { ...filter };
      newFilter.business = card.business.map((item) => item.id);
      newFilter.age = card.age.map((item) => item.id);
      newFilter.language = card.language.map((item) => item.id);
      newFilter.region = card.region.map((item) => item.id);
      newFilter.male = card.male;
      newFilter.female = card.female;
      setValue("filter", newFilter);
    }
  };

  const getAIRecommendationCards = () => {
    setRecCards(AIRecommendCARDS);
  };

  useEffect(() => {
    console.log(filter);
    // setRecCards(RecommendCARDS);
  }, [filter]);

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
              {catalogFilter === catalogBarFilter.parameters ? (
                <>
                  <SelectOptions
                    onChange={setValue}
                    getValues={getValues}
                    options={categories?.contents || []}
                    single={false}
                    type={channelData.business}
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
                    type={channelData.age}
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
                    type={channelData.language}
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
                    type={channelData.region}
                    textData={"catalog.region"}
                    isRow={true}
                    isCatalog={true}
                    defaultValues={filter.region}
                  />
                </>
              ) : (
                <>
                  <SelectDescription
                    onChange={setValue}
                    type={channelData.description}
                    title={"catalog.ai.title"}
                    placeholder={"catalog.ai.default_input"}
                  />
                  <AiFilter onChange={getAIRecommendationCards} />
                </>
              )}
              {recommendationCards ? (
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
              )}
            </div>
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
};
