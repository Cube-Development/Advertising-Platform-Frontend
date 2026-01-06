import {
  IAddChannelData,
  IAddChannelDataPreview,
  IIdentificationParams,
  PLATFORM_PARAMETERS,
  useGetChannelByIdForBloggerQuery,
} from "@entities/channel";
import { platformTypes } from "@entities/platform";
import { IFormat } from "@entities/project";
import { useFindLanguage } from "@entities/user";
import { PAGE_ANIMATION } from "@shared/config";
import { useClearCookiesOnPage } from "@shared/hooks";
import { USER_LANGUAGES_LIST } from "@shared/languages";
import { QueryParams } from "@shared/utils";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { scroller } from "react-scroll";
import { AddOrganization } from "./add-organization";
import { ChannelAccept } from "./channel-accept";
import { ChannelDescription } from "./channel-description";
import { ChannelIdentification } from "./channel-identification";
import { ChannelStepTabs } from "./channel-steps-bar";
import styles from "./styles.module.scss";

interface AddChannelBlockProps {}

export const AddChannelBlock: FC<AddChannelBlockProps> = () => {
  useClearCookiesOnPage();
  const language = useFindLanguage();
  const { channel_id, add_channel } = QueryParams();
  const stepStart = {
    step: channel_id ? 2 : 1,
    completedStep: channel_id ? 1 : 0,
  };
  const identification = {
    link: "",
    platform: platformTypes[0],
  };

  const [currentStep, setCurrentStep] = useState(stepStart);
  const [currentVariant, setCurrentVariant] = useState<
    typeof PAGE_ANIMATION.animationLeft
  >(PAGE_ANIMATION.animationRight);
  const [identificationParams, setIdentificationParams] =
    useState<IIdentificationParams>(identification);

  const { data: channel, isLoading } = useGetChannelByIdForBloggerQuery(
    {
      channel_id: channel_id!,
      language: language?.id || USER_LANGUAGES_LIST[0].id,
    },
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
      setIdentificationParams({
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
      platform: identificationParams.platform.name,
      link: identificationParams.link,
      ...newData,
    });
  };

  const handleSetIdentificationParams = (newData: IIdentificationParams) => {
    setIdentificationParams(newData);
  };

  const handleReset = () => {
    setIdentificationParams(identification);
    setDataPreview({});
    setCurrentStep({
      step: 1,
      completedStep: 0,
    });
  };

  const handleScroll = () => {
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
    handleScroll();
  };

  return (
    <div className="container" style={{ minHeight: "100vh" }}>
      <div className={styles.wrapper} id="add_channel_top">
        <ChannelStepTabs
          channel_id={channel_id!}
          step={currentStep}
          onChangeStep={handleOnChangeStep}
        />
        <ChannelIdentification
          identificationParams={identificationParams}
          setIdentificationParams={handleSetIdentificationParams}
          onChangeStep={handleOnChangeStep}
          setValue={setValue}
          step={currentStep.step}
          variant={currentVariant}
          isEdit={!!channel}
          defaultValue={channel?.url}
        />
        <ChannelDescription
          currentPlatform={identificationParams.platform}
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
        />
        <AddOrganization
          onChangeStep={handleOnChangeStep}
          step={currentStep.step}
          variant={currentVariant}
          channel_id={channel_id || ""}
          isEdit={!!channel}
          data={formState}
        />
      </div>
    </div>
  );
};
