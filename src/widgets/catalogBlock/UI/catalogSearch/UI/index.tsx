import { FC, useState } from "react";
import styles from "./styles.module.scss";
import { BarProfileFilter } from "@features/barProfileFilter/UI";
import { pageFilter } from "@shared/config/pageFilter";
import { SelectOptions } from "@features/selectOptions";
import { SelectSex } from "@features/selectSex";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { IAddPLatformData, IOptions } from "@shared/types/common";
import { QualityIcon } from "@shared/assets";
import { useAppSelector } from "@shared/store";
import { catalogFilter } from "@shared/config/catalogFilter";
import { SelectDescription } from "@features/selectDescription";
import { AiFilter } from "@features/aiFilter";
import { platformData } from "@shared/config/platformData";

const options: IOptions = {
  category: [
    { name: "Категория 1", id: 1 },
    { name: "Другая категория", id: 2 },
    { name: "Бизнес", id: 3 },
    { name: "Искусство", id: 4 },
    { name: "Спорт", id: 5 },
    { name: "Музыка", id: 6 },
    { name: "Наука", id: 7 },
    { name: "Технологии", id: 8 },
  ],
  languages: [
    { name: "Русский", id: 0 },
    { name: "Spanish", id: 1 },
    { name: "French", id: 2 },
    { name: "German", id: 3 },
    { name: "Chinese", id: 4 },
    { name: "Japanese", id: 5 },
    { name: "Korean", id: 6 },
    { name: "Italian", id: 7 },
    { name: "Portuguese", id: 8 },
    { name: "Arabic", id: 9 },
    { name: "Hindi", id: 10 },
    { name: "Turkish", id: 11 },
  ],
  region: [
    { name: "Москва", id: 0 },
    { name: "Санкт-Петербург", id: 1 },
    { name: "Краснодар", id: 2 },
    { name: "Екатеринбург", id: 3 },
    { name: "Новосибирск", id: 4 },
    { name: "Казань", id: 5 },
    { name: "Нижний Новгород", id: 6 },
    { name: "Челябинск", id: 7 },
    { name: "Самара", id: 8 },
    { name: "Уфа", id: 9 },
    { name: "Ростов-на-Дону", id: 10 },
    { name: "Омск", id: 11 },
    { name: "Украина", id: 12 },
  ],
  age: [
    { name: "18-24", id: 0 },
    { name: "25-34", id: 1 },
    { name: "35-44", id: 2 },
    { name: "45-54", id: 3 },
    { name: "55-64", id: 4 },
    { name: "65+", id: 5 },
  ],
};

export const CatalogSearch: FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedAge, setSelectedAge] = useState("");

  const { catalogFilter: filter } = useAppSelector((state) => state.filter);

  const { t } = useTranslation();
  const {
    reset,
    setValue,
    formState: { errors },
    getValues,
  } = useForm<IAddPLatformData>();

  return (
    <div className={styles.wrapper}>
      <BarProfileFilter resetValues={reset} page={pageFilter.catalog} />
      <div className={styles.options}>
        {filter === catalogFilter.parameters ? (
          <>
            <SelectOptions
              onChange={setValue}
              options={options.category}
              single={false}
              type={platformData.category}
              textData={"catalog.category"}
              isRow={true}
            />
            <SelectOptions
              onChange={setValue}
              options={options.age}
              single={false}
              type={platformData.age}
              textData={"catalog.age"}
              isRow={true}
            />
            <SelectSex
              onChange={setValue}
              title={"catalog.sex.title"}
              isRow={true}
            />
            <SelectOptions
              onChange={setValue}
              options={options.languages}
              single={false}
              type={platformData.languages}
              textData={"catalog.languages"}
              isRow={true}
            />
            <SelectOptions
              onChange={setValue}
              options={options.region}
              single={false}
              type={platformData.region}
              textData={"catalog.region"}
              isRow={true}
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
