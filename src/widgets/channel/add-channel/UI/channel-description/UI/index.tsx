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
import { useFindLanguage } from "@entities/user";
import { FormatPrice, SelectPrice, SelectSymbol } from "@features/channel";
import { SelectDescription, SelectOptions, SelectSex } from "@features/other";
import { BREAKPOINT, PAGE_ANIMATION } from "@shared/config";
import { useWindowWidth } from "@shared/hooks";
import { USER_LANGUAGES_LIST } from "@shared/languages/config";
import { MyButton, useToast } from "@shared/ui";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { FC } from "react";
import { UseFormSetValue } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface ChannelDescriptionProps {
  step: number;
  variant: typeof PAGE_ANIMATION.animationLeft;
  currentPlatform: IChannelLink;
  isEdit: boolean;
  formState: IAddChannelData;
  setValue: UseFormSetValue<IAddChannelData>;
  onChangeStep: (newStep: number) => void;
  handleChangeFormData: (newData: IAddChannelDataPreview) => void;
}

export const ChannelDescription: FC<ChannelDescriptionProps> = ({
  step,
  variant,
  currentPlatform,
  isEdit,
  formState,
  setValue,
  onChangeStep,
  handleChangeFormData,
}) => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const language = useFindLanguage();

  const screen = useWindowWidth();
  const contentRes = {
    language: language?.id || USER_LANGUAGES_LIST[0].id,
    page: 1,
  };
  const formatsRes = { ...contentRes, platform: currentPlatform.id };
  const { data: formats } = useGetChannelFormatsQuery(formatsRes);
  const { data: ages } = useGetChannelAgesQuery(contentRes);
  const { data: channelCategories } = useGetChannelCategoriesQuery(contentRes);
  const { data: languages } = useGetChannelLanguagesQuery(contentRes);
  const { data: regions } = useGetChannelRegionsQuery(contentRes);

  const onSubmit = () => {
    if (
      formState?.age.length > 0 &&
      formState?.category &&
      formState?.description &&
      formState?.language.length > 0 &&
      formState?.region.length > 0 &&
      formState?.format &&
      formState?.format.length > 0
    ) {
      const newCat = (channelCategories?.contents || []).find(
        (item) => item.id === formState?.category,
      )!;

      // setCat(newCat);
      const newData: IAddChannelDataPreview = {
        ...formState,
        category: [newCat],
        language: (languages?.contents || [])
          .filter((item) => formState?.language.includes(item.id))
          .sort((a, b) => a.id - b.id),
        age: (ages?.contents || [])
          .filter((item) => formState?.age.includes(item.id))
          .sort((a, b) => a.id - b.id),
        region: (regions?.contents || [])
          .filter((item) => formState?.region.includes(item.id))
          .sort((a, b) => a.id - b.id),
        format: (formState?.format || [])
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
                  onChangeOption={setValue}
                  options={channelCategories?.contents || []}
                  typeParameter={channelParameterData.category}
                  textData={"add_platform.description.category"}
                  defaultValue={
                    formState?.category ? [formState?.category] : []
                  }
                  isRow={screen <= BREAKPOINT.LG}
                  single={true}
                  searchable={true}
                  disabled={isEdit}
                />
                <SelectOptions
                  onChangeOption={setValue}
                  options={languages?.contents || []}
                  typeParameter={channelParameterData.language}
                  textData={"add_platform.description.languages"}
                  defaultValue={formState?.language}
                  isRow={screen <= BREAKPOINT.LG}
                />
                <SelectOptions
                  onChangeOption={setValue}
                  options={regions?.contents || []}
                  typeParameter={channelParameterData.region}
                  textData={"add_platform.description.region"}
                  defaultValue={formState?.region}
                  isRow={screen <= BREAKPOINT.LG}
                />
                <SelectOptions
                  onChangeOption={setValue}
                  options={ages?.contents || []}
                  typeParameter={channelParameterData.age}
                  textData={"add_platform.description.age"}
                  defaultValue={formState?.age}
                  isRow={screen <= BREAKPOINT.LG}
                />
                <SelectSex
                  onChange={setValue}
                  typeMan={channelParameterData.male}
                  typeWoman={channelParameterData.female}
                  title={"add_platform.description.sex.title"}
                  text={"add_platform.description.sex.text"}
                  defaultValues={formState?.male}
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
                  defaultValues={formState?.description}
                />
                <SelectPrice
                  onChange={setValue}
                  formState={formState}
                  formats={formats?.contents || []}
                  AccommPrice={FormatPrice}
                  type={channelParameterData.format}
                  title={"add_platform.description.price.title"}
                  text={"add_platform.description.price.text"}
                  info={"add_platform.description.price.info"}
                  defaultValues={formState?.format}
                />
                <SelectSymbol
                  onChange={setValue}
                  type={"text_limit"}
                  title={"add_platform.description.symbol.title"}
                  text={"add_platform.description.symbol.text"}
                  defaultValues={formState?.text_limit}
                  isRow={screen <= BREAKPOINT.LG}
                />
              </div>
            </div>
            <div className="flex justify-center">
              <div className="grid grid-cols-2 gap-2">
                <MyButton
                  type="button"
                  buttons_type="button__white"
                  onClick={() => onChangeStep(step - 1)}
                  className="grid grid-cols-[max-content,1fr] "
                >
                  <ArrowLeft className="text-[var(--Personal-colors-main)]" />
                  <p>{t("add_platform_btn.prev")}</p>
                </MyButton>
                <MyButton
                  type="button"
                  onClick={() => onSubmit()}
                  className="grid grid-cols-[1fr,max-content]"
                >
                  <p>{t("add_platform_btn.next")}</p>
                  <ArrowRight className="text-white" />
                </MyButton>
              </div>
            </div>
          </form>
        </motion.div>
      )}
    </>
  );
};
