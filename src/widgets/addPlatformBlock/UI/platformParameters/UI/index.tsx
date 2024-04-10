import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { SelectOptions } from "@features/selectOptions";
import { SelectSex } from "@features/selectSex";
import { SelectDescription } from "@features/selectDescription";
import { FormatPrice } from "@features/accommPrice";
import { SelectPrice } from "@features/selectPrice/UI";
import { SelectSymbol } from "@features/selectSymbols";
import { CreatePlatform } from "@features/createPlatform";
import { platformData } from "@shared/config/platformData";
import {
  IAddChannelData,
  IAddPlatformBlur,
  IPlatformLink,
} from "@shared/types/platform";
import { Languages } from "@shared/config/languages";
import {
  useGetChannelAgesQuery,
  useGetChannelCategoriesQuery,
  useGetChannelFormatsQuery,
  useGetChannelLanguagesQuery,
  useGetChannelRegionsQuery,
} from "@shared/store/services/contentService";
import { MyButton } from "@shared/ui";
import { useCreateChannelMutation } from "@shared/store/services/channelService";
import { AccountsLoader } from "@shared/ui/accountsLoader";

interface PlatformParametersProps {
  blur: IAddPlatformBlur;
  onChangeBlur: (newBlur: IAddPlatformBlur) => void;
  currentPlatform: IPlatformLink;
  inserCode: string;
}

export const PlatformParameters: FC<PlatformParametersProps> = ({
  blur,
  onChangeBlur,
  currentPlatform,
  inserCode,
}) => {
  const { t, i18n } = useTranslation();
  const language = Languages.find((lang) => {
    return i18n.language === lang.name;
  });

  const {
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<IAddChannelData>({
    defaultValues: {
      insertion_code: inserCode,
      male: 50,
      female: 50,
      category: undefined,
      description: undefined,
      text_limit: 4096,
      region: [],
      language: [],
      age: [],
      format: [],
    },
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const [createChannel, { isLoading, error }] = useCreateChannelMutation();

  const onSubmit: SubmitHandler<IAddChannelData> = (data) => {
    if (
      inserCode &&
      data.age.length > 0 &&
      data.category &&
      data.description &&
      data.language.length > 0 &&
      data.region.length > 0 &&
      data.format.length > 0
    ) {
      createChannel(data)
        .unwrap()
        .then((data) => {
          console.log(data.status);
          setIsModalOpen(true);
          onChangeBlur({ link: true, parameters: true });
        })
        .catch((error) =>
          console.error("Ошибка при добавлении канала...", error),
        );
    } else {
      alert("Заполните все поля...");
    }
  };

  const contentRes = {
    language: language?.id || Languages[0].id,
    page: 1,
  };
  const formatsRes = { ...contentRes, platform: currentPlatform.id };
  const { data: formats } = useGetChannelFormatsQuery(formatsRes);

  const { data: ages } = useGetChannelAgesQuery(contentRes);
  const { data: channelCategories } = useGetChannelCategoriesQuery(contentRes);
  const { data: languages } = useGetChannelLanguagesQuery(contentRes);
  const { data: regions } = useGetChannelRegionsQuery(contentRes);

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
                options={channelCategories?.contents || []}
                single={true}
                type={platformData.category}
                textData={"add_platform.category"}
              />
              <SelectOptions
                onChange={setValue}
                options={languages?.contents || []}
                single={false}
                type={platformData.language}
                textData={"add_platform.languages"}
              />
              <SelectOptions
                onChange={setValue}
                options={regions?.contents || []}
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
                options={ages?.contents || []}
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
                onChange={setValue}
                getValues={getValues}
                formats={formats?.contents}
                AccommPrice={FormatPrice}
                type={platformData.format}
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

              <MyButton className={`${styles.button} ${error && styles.error}`}>
                {isLoading ? <AccountsLoader /> : t("add_platform_btn.create")}
              </MyButton>
            </div>
          </div>
        )}
      </form>

      <CreatePlatform isModalOpen={isModalOpen} onChange={handleCloseModal} />
    </div>
  );
};
