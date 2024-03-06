import { FC, useState, useEffect } from "react";
import {
  SubmitHandler,
  useForm,
  UseFormRegister,
  Control,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { SelectOptions } from "@features/selectOptions";
import { IAddPLatformData, IOptions } from "@shared/types/common";
import { SelectSex } from "@features/selectSex";
import { SelectDescription } from "@features/selectDescription";
import { AccommPrice } from "@features/accommPrice";
import { SelectPrice } from "@features/selectPrice/UI";
import { SelectSymbol } from "@features/selectSymbols";
import { SavePlatform } from "@features/savePlatform";
import { CreatePlatform } from "@features/createPlatform";

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

export const PlatformInfo: FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedAge, setSelectedAge] = useState("");
  const [isVisible, setVisible] = useState(true);

  useEffect(() => {
    setSelectedCategory(options.category[0].value);
    setSelectedLanguage(options.languages[0].value);
    setSelectedRegion(options.region[0].value);
    setSelectedAge(options.age[0].value);
  }, []);

  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IAddPLatformData>();

  const onSubmit: SubmitHandler<IAddPLatformData> = (data) => {
    console.log(data);
    setVisible(false);
  };

  return (
    <div className="container sidebar">
      <form onSubmit={handleSubmit(onSubmit)} className={styles.wrapper}>
        <div className={`${styles.top} ${isVisible || styles.complite}`}>
          <span>2</span>
          <p>{t("add_platform.channel_info")}</p>
        </div>
        {isVisible && (
          <div className={styles.form}>
            <SelectOptions
              onChange={setValue}
              options={options.category}
              single={true}
              type={"category"}
              defaultValue={"add_platform.default_value"}
              title={"add_platform.category.title"}
              text={"add_platform.category.text"}
            />
            <SelectOptions
              onChange={setValue}
              options={options.languages}
              single={false}
              type={"languages"}
              defaultValue={"add_platform.default_value"}
              title={"add_platform.languages.title"}
              text={"add_platform.languages.text"}
            />
            <SelectOptions
              onChange={setValue}
              options={options.region}
              single={false}
              type={"region"}
              defaultValue={"add_platform.default_value"}
              title={"add_platform.region.title"}
              text={"add_platform.region.text"}
            />
            <SelectSex
              onChange={setValue}
              register={register}
              title={"add_platform.sex.title"}
              text={"add_platform.sex.text"}
            />
            <SelectOptions
              onChange={setValue}
              options={options.age}
              single={false}
              type={"age"}
              defaultValue={"add_platform.default_value"}
              title={"add_platform.age.title"}
              text={"add_platform.age.text"}
            />
            <SelectDescription
              onChange={setValue}
              title={"add_platform.description.title"}
              text={"add_platform.description.text"}
            />
            <SelectPrice
              accomms={accommList}
              AccommPrice={AccommPrice}
              title={"add_platform.price.title"}
              text={"add_platform.price.text"}
              info={"add_platform.price.info"}
            />
            <SelectSymbol
              onChange={setValue}
              type={"text_limit"}
              title={"add_platform.symbol.title"}
              text={"add_platform.symbol.text"}
            />
            <SavePlatform />
          </div>
        )}
      </form>

      {isVisible || (
        <div className={styles.send}>
          <CreatePlatform />
        </div>
      )}
    </div>
  );
};
