import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
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
import { platformData } from "@shared/config/platformData";
import { IAddPlatformBlur } from "@shared/types/platform";

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

const accommList = [
  { accomm: "1 час в топе 24 часа в ленте" },
  { accomm: "2 час в топе 24 часа в ленте" },
  { accomm: "3 час в топе 24 часа в ленте" },
];

interface PlatformParametersProps {
  blur: IAddPlatformBlur;
  onChangeBlur: (newBlur: IAddPlatformBlur) => void;
}

export const PlatformParameters: FC<PlatformParametersProps> = ({
  blur,
  onChangeBlur,
}) => {
  const { t } = useTranslation();
  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IAddPLatformData>();

  const onSubmit: SubmitHandler<IAddPLatformData> = (data) => {
    console.log(data);
    onChangeBlur({ link: true, parameters: true });
  };

  return (
    <div className="container sidebar">
      <form onSubmit={handleSubmit(onSubmit)} className={styles.wrapper}>
        <div className={`${styles.top} ${blur.parameters && styles.complite}`}>
          <span>2</span>
          <p>{t("add_platform.channel_info")}</p>
        </div>
        {blur.parameters || (
          <div className={styles.form}>
            <div className={styles.form__top}>
              <SelectOptions
                onChange={setValue}
                options={options.category}
                single={true}
                type={platformData.category}
                textData={"add_platform.category"}
              />
              <SelectOptions
                onChange={setValue}
                options={options.languages}
                single={false}
                type={platformData.languages}
                textData={"add_platform.languages"}
              />
              <SelectOptions
                onChange={setValue}
                options={options.region}
                single={false}
                type={platformData.region}
                textData={"add_platform.region"}
              />
              <SelectSex
                onChange={setValue}
                title={"add_platform.sex.title"}
                text={"add_platform.sex.text"}
              />
              <SelectOptions
                onChange={setValue}
                options={options.age}
                single={false}
                type={platformData.age}
                textData={"add_platform.age"}
              />
            </div>
            <div className={styles.form__bottom}>
              <SelectDescription
                onChange={setValue}
                title={"add_platform.description.title"}
                text={"add_platform.description.text"}
                placeholder={"add_platform.default_input"}
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
          </div>
        )}
      </form>

      {blur.parameters && (
        <div className={styles.send}>
          <CreatePlatform />
        </div>
      )}
    </div>
  );
};
