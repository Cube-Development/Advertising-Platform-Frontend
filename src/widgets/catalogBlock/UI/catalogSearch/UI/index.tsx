import { AiFilter } from "@features/aiFilter";
import { BarProfileFilter } from "@features/barProfileFilter/UI";
import { RecommendationCard } from "@features/recommendationCard";
import { SelectDescription } from "@features/selectDescription";
import { SelectOptions } from "@features/selectOptions";
import { SelectSex } from "@features/selectSex";
import { QualityIcon } from "@shared/assets";
import { catalogFilter } from "@shared/config/catalogFilter";
import { Languages } from "@shared/config/languages";
import { AIRecommendCARDS } from "@shared/config/mockDATA";
import { pageFilter } from "@shared/config/pageFilter";
import { platformData } from "@shared/config/platformData";
import { useAppSelector } from "@shared/store";
import { getCatalogReq } from "@shared/store/services/catalogService";
import {
  useGetChannelAgesQuery,
  useGetChannelLanguagesQuery,
  useGetChannelRegionsQuery,
  useGetCompanyCategoriesQuery,
} from "@shared/store/services/contentService";
import { IFilterSearch } from "@shared/types/filterSearch";
import { FC, useEffect, useState } from "react";
import {
  UseFormGetValues,
  UseFormReset,
  UseFormSetValue,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface CatalogSearchProps {
  setValue: UseFormSetValue<getCatalogReq>;
  reset: UseFormReset<getCatalogReq>;
  getValues: UseFormGetValues<getCatalogReq>;
}

export const CatalogSearch: FC<CatalogSearchProps> = ({
  setValue,
  reset,
  getValues,
}) => {
  const [recommendationCard, setRecCard] = useState<IFilterSearch | null>(null);
  const [recommendationCards, setRecCards] = useState<IFilterSearch[] | null>(
    null,
  );

  const { catalogFilter: catfilter } = useAppSelector((state) => state.filter);

  const { t, i18n } = useTranslation();
  const language = Languages.find((lang) => {
    return i18n.language === lang.name;
  });

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
    console.log("resetRecommendationCard");
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

  useEffect(() => {
    console.log(filter);
    // setRecCards(RecommendCARDS);
  }, [filter]);

  const getAIRecommendationCards = () => {
    setRecCards(AIRecommendCARDS);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <BarProfileFilter
          resetValues={resetRecommendationCard}
          page={pageFilter.catalog}
        />
        <div className={styles.options}>
          {catfilter === catalogFilter.parameters ? (
            <>
              <SelectOptions
                onChange={setValue}
                getValues={getValues}
                options={categories?.contents || []}
                single={false}
                type={platformData.business}
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
                type={platformData.age}
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
                type={platformData.language}
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
                type={platformData.region}
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
                type={platformData.description}
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
                  <RecommendationCard
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
    </>
  );
};
