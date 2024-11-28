import {
  channelParameterData,
  IAddChannelData,
  IAddChannelDataPreview,
  IChannelLink,
  useGetChannelAgesQuery,
  useGetChannelCategoriesQuery,
  useGetChannelFormatsQuery,
  useGetChannelLanguagesQuery,
  useGetChannelRegionsQuery,
} from "@entities/channel";
import { FormatPrice, SelectPrice, SelectSymbol } from "@features/channel";
import { SelectDescription, SelectOptions, SelectSex } from "@features/other";
import { ArrowLongHorizontalIcon } from "@shared/assets";
import { BREAKPOINT, PAGE_ANIMATION } from "@shared/config";
import { Languages } from "@shared/config/languages";
import { IOption } from "@shared/types";
import { MyButton, useToast } from "@shared/ui";
import { motion } from "framer-motion";
import { FC, useEffect, useState } from "react";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface ChannelDescriptionProps {
  step: number;
  variant: typeof PAGE_ANIMATION.animationLeft;
  currentPlatform: IChannelLink;
  isEdit: boolean;
  data: IAddChannelData;
  setValue: UseFormSetValue<IAddChannelData>;
  getValues: UseFormGetValues<IAddChannelData>;
  onChangeStep: (newStep: number) => void;
  handleChangeFormData: (newData: IAddChannelDataPreview) => void;
}

export const ChannelDescription: FC<ChannelDescriptionProps> = ({
  step,
  variant,
  currentPlatform,
  isEdit,
  data,
  setValue,
  getValues,
  onChangeStep,
  handleChangeFormData,
}) => {
  const { toast } = useToast();
  const { t, i18n } = useTranslation();
  const language = Languages.find((lang) => {
    return i18n.language === lang.name;
  });

  const [screen, setScreen] = useState<number>(window.innerWidth);
  const [cat, setCat] = useState<IOption | undefined>(undefined);
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

  const handleBack = () => {
    onChangeStep(1);
  };

  useEffect(() => {
    const handleResize = () => {
      setScreen(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const onSubmit = () => {
    if (
      data.age.length > 0 &&
      data.category &&
      data.description &&
      data.language.length > 0 &&
      data.region.length > 0 &&
      data.format &&
      data.format.length > 0
    ) {
      const newCat = (channelCategories?.contents || []).find(
        (item) => item.id === data.category,
      )!;

      setCat(newCat);
      const newData: IAddChannelDataPreview = {
        ...data,
        category: [newCat],
        language: (languages?.contents || [])
          .filter((item) => data.language.includes(item.id))
          .sort((a, b) => a.id - b.id),
        age: (ages?.contents || [])
          .filter((item) => data.age.includes(item.id))
          .sort((a, b) => a.id - b.id),
        region: (regions?.contents || [])
          .filter((item) => data.region.includes(item.id))
          .sort((a, b) => a.id - b.id),
        format: (data.format || [])
          .map((defaultFormat) => {
            const formatItem = (formats?.contents || []).find(
              (format) => format.id === defaultFormat.name,
            )!;
            return { price: defaultFormat.price, ...formatItem };
          })
          .sort((a, b) => a.id - b.id),
      };
      handleChangeFormData(newData);
      onChangeStep(3);
    } else {
      toast({
        variant: "default",
        title: t("toasts.add_platform.parameters.alert"),
      });
    }
  };
  return (
    <>
      {step === 2 && (
        <motion.div initial="hidden" animate="visible" variants={variant}>
          <form className={styles.wrapper}>
            <div className={styles.form}>
              <div className={styles.form__top}>
                <SelectOptions
                  onChange={setValue}
                  options={channelCategories?.contents || []}
                  single={true}
                  type={channelParameterData.category}
                  textData={"add_platform.description.category"}
                  defaultValues={
                    (channelCategories?.contents || []).find(
                      (item) => item.id === data.category,
                    )! || cat
                  }
                  isRow={screen <= BREAKPOINT.LG}
                  isDisabled={isEdit}
                />
                <SelectOptions
                  onChange={setValue}
                  options={languages?.contents || []}
                  single={false}
                  type={channelParameterData.language}
                  textData={"add_platform.description.languages"}
                  defaultValues={data.language}
                  isRow={screen <= BREAKPOINT.LG}
                />
                <SelectOptions
                  onChange={setValue}
                  options={regions?.contents || []}
                  single={false}
                  type={channelParameterData.region}
                  textData={"add_platform.description.region"}
                  defaultValues={data.region}
                  isRow={screen <= BREAKPOINT.LG}
                />
                <SelectOptions
                  onChange={setValue}
                  options={ages?.contents || []}
                  single={false}
                  type={channelParameterData.age}
                  textData={"add_platform.description.age"}
                  defaultValues={data.age}
                  isRow={screen <= BREAKPOINT.LG}
                />
                <SelectSex
                  onChange={setValue}
                  title={"add_platform.description.sex.title"}
                  text={"add_platform.description.sex.text"}
                  defaultValues={data.male}
                  isRow={screen <= BREAKPOINT.LG}
                />
              </div>
              <div className={styles.form__bottom}>
                <SelectDescription
                  onChange={setValue}
                  type={channelParameterData.description}
                  title={"add_platform.description.description.title"}
                  text={"add_platform.description.description.text"}
                  placeholder={
                    "add_platform.description.description.default_value"
                  }
                  defaultValues={data.description}
                />
                <SelectPrice
                  onChange={setValue}
                  getValues={getValues}
                  formats={formats?.contents || []}
                  AccommPrice={FormatPrice}
                  type={channelParameterData.format}
                  title={"add_platform.description.price.title"}
                  text={"add_platform.description.price.text"}
                  info={"add_platform.description.price.info"}
                  defaultValues={data.format}
                />
                <SelectSymbol
                  onChange={setValue}
                  type={"text_limit"}
                  title={"add_platform.description.symbol.title"}
                  text={"add_platform.description.symbol.text"}
                  defaultValues={data.text_limit}
                  isRow={screen <= BREAKPOINT.LG}
                />
              </div>
            </div>
            <div className={styles.btns__wrapper}>
              <div className={styles.btns}>
                <MyButton
                  type="button"
                  buttons_type="button__white"
                  className={styles.prev}
                  onClick={() => handleBack()}
                >
                  <ArrowLongHorizontalIcon className="active__icon" />
                  <p>{t("add_platform_btn.prev")}</p>
                </MyButton>
                <MyButton type="button" onClick={() => onSubmit()}>
                  <p>{t("add_platform_btn.next")}</p>
                  <ArrowLongHorizontalIcon className="icon__white" />
                </MyButton>
              </div>
            </div>
          </form>
        </motion.div>
      )}
    </>
  );
};
