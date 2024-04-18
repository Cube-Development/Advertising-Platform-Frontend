import { FC } from "react";
import styles from "./styles.module.scss";
import { BarProfileFilter } from "@features/barProfileFilter/UI";
import { pageFilter } from "@shared/config/pageFilter";
import { SelectOptions } from "@features/selectOptions";
import { SelectSex } from "@features/selectSex";
import { useTranslation } from "react-i18next";
import {
  UseFormGetValues,
  UseFormReset,
  UseFormSetValue,
} from "react-hook-form";
import { QualityIcon } from "@shared/assets";
import { useAppSelector } from "@shared/store";
import { catalogFilter } from "@shared/config/catalogFilter";
import { SelectDescription } from "@features/selectDescription";
import { AiFilter } from "@features/aiFilter";
import { platformData } from "@shared/config/platformData";
import { getCatalogReq } from "@shared/store/services/catalogService";
import {
  useGetChannelAgesQuery,
  useGetChannelLanguagesQuery,
  useGetChannelRegionsQuery,
  useGetCompanyCategoriesQuery,
} from "@shared/store/services/contentService";
import { Languages } from "@shared/config/languages";

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
  const { catalogFilter: filter } = useAppSelector((state) => state.filter);

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

  return (
    <div className={styles.wrapper}>
      <BarProfileFilter resetValues={reset} page={pageFilter.catalog} />
      <div className={styles.options}>
        {filter === catalogFilter.parameters ? (
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
            />
            <SelectSex
              onChange={setValue}
              getValues={getValues}
              title={"catalog.sex.title"}
              isRow={true}
              isCatalog={true}
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
            />
          </>
        ) : (
          <>
            <SelectDescription
              onChange={setValue}
              title={"catalog.ai.title"}
              placeholder={"catalog.ai.default_input"}
            />
            <AiFilter />
          </>
        )}
        <div className={styles.recomendation}>
          <QualityIcon />
          <p>{t("catalog.recomendation")}</p>
        </div>
      </div>
    </div>
  );
};
