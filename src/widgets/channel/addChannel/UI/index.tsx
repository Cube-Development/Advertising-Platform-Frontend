import {
  IAddChannelData,
  IAddChannelDataPreview,
  IIndetificationParams,
  PLATFORM_PARAMETERS,
  useGetChannelByIdQuery,
} from "@entities/channel";
import { platformTypes } from "@entities/platform";
import { IFormat } from "@entities/project";
import { Languages, PAGE_ANIMATION } from "@shared/config";
import { QueryParams } from "@shared/utils";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { scroller } from "react-scroll";
import { ChannelAccept } from "./channelAccept";
import { ChannelDescription } from "./channelDescription";
import { ChannelIdentification } from "./channelIdentification";
import { ChannelTop } from "./channelTop";
import styles from "./styles.module.scss";

interface AddChannelBlockProps {}

export const AddChannelBlock: FC<AddChannelBlockProps> = () => {
  const { t, i18n } = useTranslation();
  const language = Languages.find((lang) => {
    return i18n.language === lang.name;
  });
  const { channel_id, add_channel } = QueryParams();
  const stepStart = {
    step: channel_id ? 2 : 1,
    completedStep: channel_id ? 1 : 0,
  };
  const indetification = {
    link: "",
    platform: platformTypes[0],
  };

  const [currentStep, setCurrentStep] = useState(stepStart);
  const [currentVariant, setCurrentVariant] = useState<
    typeof PAGE_ANIMATION.animationLeft
  >(PAGE_ANIMATION.animationRight);
  const [indetificationParams, setIndetificationParams] =
    useState<IIndetificationParams>(indetification);

  const { data: channel, isLoading } = useGetChannelByIdQuery(
    { channel_id: channel_id!, language: language?.id || Languages[0].id },
    { skip: !channel_id || currentStep.step !== 2 },
  );

  let defaultValues = {
    insertion_code: "",
    male: PLATFORM_PARAMETERS.defaultSexMale,
    female: 100 - PLATFORM_PARAMETERS.defaultSexMale,
    category: undefined,
    description: undefined,
    text_limit: PLATFORM_PARAMETERS.defaultTextLimit,
    region: [],
    language: [],
    age: [],
    format: [],
  };

  const { handleSubmit, setValue, getValues, watch, reset } =
    useForm<IAddChannelData>({
      defaultValues: defaultValues,
    });

  const formState = watch();

  useEffect(() => {
    if (channel) {
      setIndetificationParams({
        link: channel.url,
        platform:
          platformTypes.find((item) => item.id === channel.platform) ||
          platformTypes[0],
      });
      reset({
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
      });
    }
  }, [channel, reset]);

  const [dataPreview, setDataPreview] = useState<IAddChannelDataPreview>({});

  const handleSetDataPreview = (newData: IAddChannelDataPreview) => {
    setDataPreview({
      platform: indetificationParams.platform.name,
      link: indetificationParams.link,
      ...newData,
    });
  };

  const handleSetIndetificationParams = (newData: IIndetificationParams) => {
    setIndetificationParams(newData);
  };

  const handleReset = () => {
    setIndetificationParams(indetification);
    setDataPreview({});
    setCurrentStep({
      step: 1,
      completedStep: 0,
    });
  };

  const handleScrool = () => {
    scroller.scrollTo("add_channel_top", {
      offset: -100,
    });
  };

  const handleOnChangeStep = (newStep: number) => {
    let newCompletedStep = currentStep.completedStep;
    if (newStep > currentStep.step) {
      setCurrentVariant(PAGE_ANIMATION.animationLeft);
      if (newStep >= currentStep.completedStep + 1) {
        newCompletedStep = newStep - 1;
      }
    } else {
      setCurrentVariant(PAGE_ANIMATION.animationRight);
    }
    setCurrentStep({
      step: newStep,
      completedStep: newCompletedStep,
    });
    handleScrool();
  };
  console.log(!!channel, channel);
  return (
    <div className="container" style={{ minHeight: "100vh" }}>
      <div className={styles.wrapper} id="add_channel_top">
        <ChannelTop
          channel_id={channel_id!}
          step={currentStep}
          onChangeStep={handleOnChangeStep}
        />
        <ChannelIdentification
          indetificationParams={indetificationParams}
          setIndetificationParams={handleSetIndetificationParams}
          onChangeStep={handleOnChangeStep}
          setValue={setValue}
          step={currentStep.step}
          variant={currentVariant}
          isEdit={!!channel}
          defaultValue={channel?.url}
        />
        <ChannelDescription
          currentPlatform={indetificationParams.platform}
          onChangeStep={handleOnChangeStep}
          isEdit={!!channel}
          step={currentStep.step}
          variant={currentVariant}
          setValue={setValue}
          formState={formState}
          handleChangeFormData={handleSetDataPreview}
        />
        <ChannelAccept
          onChangeStep={handleOnChangeStep}
          step={currentStep.step}
          variant={currentVariant}
          dataPreview={dataPreview}
          handleSubmit={handleSubmit}
          channel_id={channel_id || ""}
          isEdit={!!channel}
        />
      </div>
    </div>
  );
};
