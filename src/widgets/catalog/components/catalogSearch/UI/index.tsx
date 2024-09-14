import {
  channelData,
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
import { QualityIcon } from "@shared/assets";
import { Languages } from "@shared/config";
import { pageFilter } from "@shared/routing";
import { FC, useEffect, useState } from "react";
import {
  useForm,
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
      category: [],
      region: [],
      language: [],
    },
  });

  const formFieldsAI = watchAI();
  const formFieldsTA = watchTA();
  const {
    data: AIParameters,
    isLoading: isLoadingAIParameters,
    isSuccess,
  } = useGetAIParametersQuery({ prompt: text }, { skip: !text.length });

  const { data: TAParameters, isLoading: isLoadingTAParameters } =
    useGetTAParametersQuery(
      { ...formFieldsTA },
      {
        skip:
          !isSuccess ||
          !formFieldsTA.category.length ||
          !formFieldsTA.region.length ||
          !formFieldsTA.language.length,
      },
    );

  const [recommendationCard, setRecCard] = useState<IFilterSearch | null>(null);
  const [recommendationCards, setRecCards] = useState<IFilterSearch[] | null>(
    null,
  );

  useEffect(() => {
    if (AIParameters) {
      setValueTA(channelData.category, AIParameters?.category);
      setValueTA(channelData.region, AIParameters?.region);
      setValueTA(channelData.language, AIParameters?.language);
    }
  }, [AIParameters]);

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

  const { filter } = getValues();

  const resetRecommendationCard = () => {
    setRecCard(null);
    // setRecCards(null);
    // reset();
    // console.log("resetRecommendationCard");
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
    console.log(filter);
    // setRecCards(RecommendCARDS);
  }, [filter]);

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
                onChange={setValueAI}
                type={channelData.prompt}
                title={"catalog.ai.title"}
                placeholder={"catalog.ai.default_input"}
              />
              <AiFilter
                isLoading={isLoadingAIParameters}
                onChange={handleAIClick}
              />
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
    </>
  );
};
