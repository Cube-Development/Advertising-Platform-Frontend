import {
  IAddChannelData,
  IAddPlatformBlur,
  IChannelLink,
  PLATFORM_PARAMETERS,
  channelData,
  useCreateChannelMutation,
  useEditChannelMutation,
  useGetChannelAgesQuery,
  useGetChannelByIdQuery,
  useGetChannelCategoriesQuery,
  useGetChannelFormatsQuery,
  useGetChannelLanguagesQuery,
  useGetChannelRegionsQuery,
} from "@entities/channel";
import { IFormat } from "@entities/project";
import {
  CreateChannel,
  FormatPrice,
  SelectPrice,
  SelectSymbol,
} from "@features/channel";
import { SelectDescription, SelectOptions, SelectSex } from "@features/other";
import { ArrowLongHorizontalIcon } from "@shared/assets";
import { Languages } from "@shared/config/languages";
import { MyButton, ToastAction, useToast } from "@shared/ui";
import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface ChannelDescriptionProps {
  onChangeStep: (newStep: number) => void;
  currentPlatform: IChannelLink;
  inserCode: string;
  channel_id: string;
}

export const ChannelDescription: FC<ChannelDescriptionProps> = ({
  onChangeStep,
  currentPlatform,
  inserCode,
  channel_id,
}) => {
  const { toast } = useToast();
  const { t, i18n } = useTranslation();
  const language = Languages.find((lang) => {
    return i18n.language === lang.name;
  });
  const { data: channel } = useGetChannelByIdQuery(
    { channel_id: channel_id, language: language?.id || Languages[0].id },
    { skip: !channel_id },
  );

  let defaultValues;
  channel
    ? (defaultValues = {
        male: channel?.male,
        female: channel?.female,
        category: channel?.category?.id,
        description: channel?.description,
        text_limit: channel?.text_limit,
        region: channel?.region?.map((item) => item?.id),
        language: channel?.language?.map((item) => item?.id),
        age: channel?.age?.map((item) => item?.id),
        format: channel?.format?.map((format: IFormat) => ({
          name: format?.format,
          price: format?.price,
        })),
      })
    : (defaultValues = {
        insertion_code: inserCode,
        male: PLATFORM_PARAMETERS.defaultSexMale,
        female: 100 - PLATFORM_PARAMETERS.defaultSexMale,
        category: undefined,
        description: undefined,
        text_limit: PLATFORM_PARAMETERS.defaultTextLimit,
        region: [],
        language: [],
        age: [],
        format: [],
      });
  const { handleSubmit, setValue, getValues } = useForm<IAddChannelData>({
    defaultValues: defaultValues,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const [createChannel, { isLoading, error }] = useCreateChannelMutation();
  const [editChannel] = useEditChannelMutation();

  const onSubmit: SubmitHandler<IAddChannelData> = (data) => {
    onChangeStep(3);
    // if (
    //   data.age.length > 0 &&
    //   data.category &&
    //   data.description &&
    //   data.language.length > 0 &&
    //   data.region.length > 0 &&
    //   data.format &&
    //   data.format.length > 0
    // ) {
    //   if (channel) {
    //     const { ...editData } = data;
    //     editChannel({ ...editData, channel_id: channel.id })
    //       .unwrap()
    //       .then(() => {
    //         setIsModalOpen(true);
    //         onChangeStep(3);
    //         toast({
    //           variant: "success",
    //           title: t("toasts.add_platform.edit.success"),
    //         });
    //       })
    //       .catch(() => {
    //         toast({
    //           variant: "error",
    //           title: t("toasts.add_platform.edit.error"),
    //           action: <ToastAction altText="Ok">Ok</ToastAction>,
    //         });
    //       });
    //   } else {
    //     createChannel(data)
    //       .unwrap()
    //       .then(() => {
    //         setIsModalOpen(true);
    //         onChangeStep(3);
    //         toast({
    //           variant: "success",
    //           title: t("toasts.add_platform.create.success"),
    //         });
    //       })
    //       .catch(() => {
    //         toast({
    //           variant: "error",
    //           title: t("toasts.add_platform.create.error"),
    //           action: <ToastAction altText="Ok">Ok</ToastAction>,
    //         });
    //       });
    //   }
    // } else {
    //   toast({
    //     variant: "default",
    //     title: t("toasts.add_platform.parameters.alert"),
    //   });
    // }
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

  const handleBack = () => {
    onChangeStep(1);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.wrapper}>
        <div className={styles.form}>
          <div className={styles.form__top}>
            <SelectOptions
              onChange={setValue}
              options={channelCategories?.contents || []}
              single={true}
              type={channelData.category}
              textData={"add_platform.description.category"}
              defaultValues={channel?.category}
            />
            <SelectOptions
              onChange={setValue}
              options={languages?.contents || []}
              single={false}
              type={channelData.language}
              textData={"add_platform.description.languages"}
              defaultValues={defaultValues.language}
            />
            <SelectOptions
              onChange={setValue}
              options={regions?.contents || []}
              single={false}
              type={channelData.region}
              textData={"add_platform.description.region"}
              defaultValues={defaultValues.region}
            />
            <SelectSex
              onChange={setValue}
              title={"add_platform.description.sex.title"}
              text={"add_platform.description.sex.text"}
              defaultValues={defaultValues.male}
            />
            <SelectOptions
              onChange={setValue}
              options={ages?.contents || []}
              single={false}
              type={channelData.age}
              textData={"add_platform.description.age"}
              defaultValues={defaultValues.age}
            />
          </div>
          <div className={styles.form__bottom}>
            <SelectDescription
              onChange={setValue}
              type={channelData.description}
              title={"add_platform.description.description.title"}
              text={"add_platform.description.description.text"}
              placeholder={"add_platform.description.description.default_value"}
              defaultValues={defaultValues.description}
            />
            <SelectPrice
              onChange={setValue}
              getValues={getValues}
              formats={formats?.contents}
              AccommPrice={FormatPrice}
              type={channelData.format}
              title={"add_platform.description.price.title"}
              text={"add_platform.description.price.text"}
              info={"add_platform.description.price.info"}
              defaultValues={defaultValues.format}
            />
            <SelectSymbol
              onChange={setValue}
              type={"text_limit"}
              title={"add_platform.description.symbol.title"}
              text={"add_platform.description.symbol.text"}
              defaultValues={defaultValues.text_limit}
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
            <MyButton type="submit">
              <p>{t("add_platform_btn.next")}</p>
              <ArrowLongHorizontalIcon className="icon__white" />
            </MyButton>
          </div>
        </div>
      </form>

      <CreateChannel isModalOpen={isModalOpen} onChange={handleCloseModal} />
    </>
  );
};
