import { FC, useEffect, useState } from "react";
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
    { label: "Категория 1", value: "1" },
    { label: "Другая категория", value: "2" },
    { label: "Бизнес", value: "3" },
    { label: "Искусство", value: "4" },
    { label: "Спорт", value: "5" },
    { label: "Музыка", value: "6" },
    { label: "Наука", value: "7" },
    { label: "Технологии", value: "8" },
  ],
  languages: [
    { label: "Русский", value: "0" },
    { label: "Spanish", value: "1" },
    { label: "French", value: "2" },
    { label: "German", value: "3" },
    { label: "Chinese", value: "4" },
    { label: "Japanese", value: "5" },
    { label: "Korean", value: "6" },
    { label: "Italian", value: "7" },
    { label: "Portuguese", value: "8" },
    { label: "Arabic", value: "9" },
    { label: "Hindi", value: "10" },
    { label: "Turkish", value: "11" },
  ],
  region: [
    { label: "Москва", value: "0" },
    { label: "Санкт-Петербург", value: "1" },
    { label: "Краснодар", value: "2" },
    { label: "Екатеринбург", value: "3" },
    { label: "Новосибирск", value: "4" },
    { label: "Казань", value: "5" },
    { label: "Нижний Новгород", value: "6" },
    { label: "Челябинск", value: "7" },
    { label: "Самара", value: "8" },
    { label: "Уфа", value: "9" },
    { label: "Ростов-на-Дону", value: "10" },
    { label: "Омск", value: "11" },
    { label: "Украина", value: "12" },
  ],
  sex: [
    { label: "Мужчины", value: "male" },
    { label: "Женщины", value: "female" },
  ],
  age: [
    { label: "18-24", value: "0" },
    { label: "25-34", value: "1" },
    { label: "35-44", value: "2" },
    { label: "45-54", value: "3" },
    { label: "55-64", value: "4" },
    { label: "65+", value: "5" },
  ],
};

const accommList = [
  { accomm: "1 час в топе 24 часа в ленте" },
  { accomm: "2 час в топе 24 часа в ленте" },
  { accomm: "3 час в топе 24 часа в ленте" },
];

export const CatalogSearch: FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedAge, setSelectedAge] = useState("");

  const { catalogFilter: filter } = useAppSelector(
    (state) => state.filterReducer,
  );

  useEffect(() => {
    setSelectedCategory(options.category[0].value);
    setSelectedLanguage(options.languages[0].value);
    setSelectedRegion(options.region[0].value);
    setSelectedAge(options.age[0].value);
  }, []);

  const { t } = useTranslation();
  const {
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
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
              single={true}
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
            <SelectSex onChange={setValue} title={"catalog.sex.title"} />
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
