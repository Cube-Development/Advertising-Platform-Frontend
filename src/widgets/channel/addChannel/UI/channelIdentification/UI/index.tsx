import verificationAnimation from "/animated/verification_lottie.gif";
import {
  IAddChannelData,
  IAddChannelIdentification,
  IChannelLink,
  IIndetificationParams,
  useChannelVerifyMutation,
  useCreateCodeQuery,
} from "@entities/channel";
import { platformTypes } from "@entities/platform";
import { ArrowLongHorizontalIcon } from "@shared/assets";
import { PAGE_ANIMATION } from "@shared/config";
import {
  InfoTooltip,
  MyButton,
  SpinnerLoaderSmall,
  useToast,
} from "@shared/ui";
import { motion } from "framer-motion";
import { FC, useEffect, useState } from "react";
import { SubmitHandler, useForm, UseFormSetValue } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface ChannelIdentificationProps {
  step: number;
  defaultValue: string | undefined;
  variant: typeof PAGE_ANIMATION.animationLeft;
  isEdit: boolean;
  indetificationParams: IIndetificationParams;
  setValue: UseFormSetValue<IAddChannelData>;
  onChangeStep: (newStep: number) => void;
  setIndetificationParams: (params: IIndetificationParams) => void;
}

export const ChannelIdentification: FC<ChannelIdentificationProps> = ({
  step,
  defaultValue,
  variant,
  isEdit,
  indetificationParams,
  setValue,
  onChangeStep,
  setIndetificationParams,
}) => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAddChannelIdentification>();

  const { data: code } = useCreateCodeQuery("", {
    skip: isEdit || indetificationParams.link ? true : undefined,
  });

  const [channelVerify, { isLoading, error, isSuccess }] =
    useChannelVerifyMutation();

  const onSubmit: SubmitHandler<IAddChannelIdentification> = (data) => {
    if (isEdit) {
      onChangeStep(2);
    } else if (code && !indetificationParams.link) {
      if (isLoading) return;
      const formData = {
        ...data,
        platform: indetificationParams.platform.id,
        verification_code: code.verification_code,
      };
      const newPlatform = {
        ...indetificationParams,
        link: formData.url,
        checked: true,
      };
      channelVerify(formData)
        .unwrap()
        .then((data) => {
          setValue("insertion_code", data.insertion_code);
          onChangeStep(2);
          setIndetificationParams(newPlatform);
          toast({
            variant: "success",
            title: t("toasts.add_platform.link.success"),
          });
        })
        .catch((error) => {
          if (error.status === 400) {
            toast({
              variant: "error",
              title: t("toasts.add_platform.link.alert"),
            });
          } else {
            toast({
              variant: "error",
              title: t("toasts.add_platform.link.error"),
            });
          }
        });
    } else if (indetificationParams.link) {
      onChangeStep(2);
    }
  };

  const changePlatform = (platform: IChannelLink) => {
    const newPlatform = { ...indetificationParams, platform: platform };
    setIndetificationParams(newPlatform);
    reset();
  };

  const isValidURL = (url: string) => {
    // Регулярное выражение для проверки URL
    const pattern = /^(https?:\/\/)?[\w-]+(\.[\w-]+)+([/?#].*)?$/;
    return pattern.test(url);
  };

  const handleChangeLink = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLink = e.target.value;
    setText(newLink);
  };

  const [text, setText] = useState(defaultValue || "");

  useEffect(() => {
    if (defaultValue) {
      setText(defaultValue);
    }
  }, [defaultValue]);

  return (
    <>
      {step == 1 && (
        <motion.div initial="hidden" animate="visible" variants={variant}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.wrapper}>
            <div className={styles.form}>
              <div className={styles.form__row}>
                <div className={styles.form__text}>
                  <p>{t("add_platform.identification.info.title")}</p>
                  <InfoTooltip
                    text={t("add_platform.identification.info.text")}
                  />
                </div>
                <div className={styles.choose_platform}>
                  {platformTypes.map((platform, index) => (
                    <MyButton
                      key={index}
                      type="button"
                      className={`${styles.platform__btn} ${indetificationParams.platform.type === platform.type ? styles.active : ""}`}
                      onClick={() => changePlatform(platform)}
                      disabled={indetificationParams.checked || isEdit}
                    >
                      {t(platform.name)}
                    </MyButton>
                  ))}
                </div>
              </div>

              <div className="flex justify-center items-center">
                <p className="lg:text-[56px] md:text-[48px] mobile-xl:text-[32px] text-[24px] font-semibold mobile-xl:leading-normal leading-none">
                  {code?.verification_code}
                </p>
              </div>

              <div className="mobile-xl:mt-0 -mt-4 grid mobile-xl:grid-cols-[auto,1fr] grid-flow-row items-center mobile-xl:justify-start justify-center mobile-xl:justify-items-start justify-items-center mobile-xl:gap-4 gap-2">
                <div className="flex justify-center items-center lg:w-[100px] md:w-[80px] mobile-xl:w-[70px] w-[60px] lg:h-[100px] md:h-[80px] mobile-xl:h-[70px] h-[60px]">
                  <img
                    src={verificationAnimation}
                    alt="isLoading..."
                    className="object-contain w-full h-full"
                  />
                </div>
                <p className="gradient_color lg:text-lg md:text-sm mobile-xl:text-xs text-[10px] mobile-xl:font-medium font-semibold mobile-xl:text-start text-center">
                  {t("add_platform.identification.link.verification")}
                </p>
              </div>

              <div className={styles.form__row}>
                <div className={styles.form__text}>
                  <p>{t("add_platform.identification.link.title")}</p>
                  <InfoTooltip
                    text={t("add_platform.identification.link.text")}
                  />
                </div>
                <div className={styles.paste_link}>
                  <input
                    {...(isEdit
                      ? {}
                      : register("url", {
                          required: t(
                            "add_platform.identification.link.requerd",
                          ),
                          validate: {
                            validURL: (value) =>
                              isValidURL(value) ||
                              t("add_platform.identification.link.invalid"),
                          },
                        }))}
                    placeholder={
                      errors["url"]
                        ? errors["url"].message
                        : t(indetificationParams.platform.default_value)
                    }
                    className={`${styles.platform__input} ${errors["url"] && styles.form_error}`}
                    onChange={handleChangeLink}
                    value={text}
                    disabled={indetificationParams.checked || isEdit}
                  />
                </div>
              </div>
            </div>
            {isLoading ? (
              <div>
                <SpinnerLoaderSmall />
              </div>
            ) : (
              <div className={styles.next__btn}>
                <MyButton type="submit">
                  <p>{t("add_platform_btn.next")}</p>
                  <ArrowLongHorizontalIcon className="icon__white" />
                </MyButton>
              </div>
            )}
          </form>
        </motion.div>
      )}
    </>
  );
};
