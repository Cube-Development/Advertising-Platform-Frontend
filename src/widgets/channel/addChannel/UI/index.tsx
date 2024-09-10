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
import { QueryParams } from "@shared/functions";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ChannelAccept } from "./channelAccept";
import { ChannelDescription } from "./channelDescription";
import { ChannelIdentification } from "./channelIdentification";
import { ChannelTop } from "./channelTop";
import styles from "./styles.module.scss";
import { scroller } from "react-scroll";

interface AddChannelBlockProps {}

export const AddChannelBlock: FC<AddChannelBlockProps> = () => {
  const { t, i18n } = useTranslation();
  const language = Languages.find((lang) => {
    return i18n.language === lang.name;
  });
  const { channel_id, add_channel } = QueryParams();
  const stepStart = {
    step: 1,
    completedStep: 0,
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

  const { data: channel } = useGetChannelByIdQuery(
    { channel_id: channel_id!, language: language?.id || Languages[0].id },
    { skip: !channel_id || currentStep.step !== 2 },
  );

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
      });

  const { handleSubmit, setValue, getValues, watch } = useForm<IAddChannelData>(
    {
      defaultValues: defaultValues,
    },
  );
  const formFields = watch();
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
    setCurrentStep(stepStart);
  };

  const handleScrool = () => {
    scroller.scrollTo("add_channel_top", {
      offset: -100,
    });
  };

  return (
    <div className="container sidebar" style={{ minHeight: "100vh" }}>
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
          channel_id={channel_id!}
          step={currentStep.step}
          variant={currentVariant}
        />
        <ChannelDescription
          currentPlatform={indetificationParams.platform}
          onChangeStep={handleOnChangeStep}
          channel_id={channel_id!}
          step={currentStep.step}
          variant={currentVariant}
          setValue={setValue}
          getValues={getValues}
          data={formFields}
          handleChangeFormData={handleSetDataPreview}
        />
        <ChannelAccept
          onChangeStep={handleOnChangeStep}
          step={currentStep.step}
          variant={currentVariant}
          dataPreview={dataPreview}
          handleSubmit={handleSubmit}
          channel_id={channel_id!}
          handleReset={handleReset}
        />
      </div>
    </div>
  );
};
