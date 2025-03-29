import {
  channelStatus,
  IAddChannelData,
  IAddChannelIdentification,
  IChannelLink,
  IIdentificationParams,
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
  identificationParams: IIdentificationParams;
  setValue: UseFormSetValue<IAddChannelData>;
  onChangeStep: (newStep: number) => void;
  setIdentificationParams: (params: IIdentificationParams) => void;
}

export const ChannelIdentification: FC<ChannelIdentificationProps> = ({
  step,
  defaultValue,
  variant,
  isEdit,
  identificationParams,
  setValue,
  onChangeStep,
  setIdentificationParams,
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
    skip: isEdit || identificationParams.link ? true : undefined,
  });

  const [channelVerify, { isLoading, error, isSuccess }] =
    useChannelVerifyMutation();

  const onSubmit: SubmitHandler<IAddChannelIdentification> = (data) => {
    if (isEdit) {
      onChangeStep(2);
    } else if (code && !identificationParams.link) {
      if (isLoading) return;
      const formData = {
        ...data,
        platform: identificationParams.platform.id,
        verification_code: code.verification_code,
      };
      const newPlatform = {
        ...identificationParams,
        link: formData.url,
        checked: true,
      };
      channelVerify(formData)
        .unwrap()
        .then((data) => {
          setValue("insertion_code", data.insertion_code);
          onChangeStep(2);
          setIdentificationParams(newPlatform);
          toast({
            variant: "success",
            title: t("toasts.add_platform.link.success"),
          });
        })
        .catch((error) => {
          if (error.status === 400) {
            let text = "toasts.add_platform.link.alert";
            if (error?.data?.code === channelStatus.moderation) {
              text = "toasts.add_platform.link.channelStatus.moderation";
            } else if (error?.data?.code === channelStatus.active) {
              text = "toasts.add_platform.link.channelStatus.active";
            } else if (error?.data?.code === channelStatus.inactive) {
              text = "toasts.add_platform.link.channelStatus.inactive";
            } else if (error?.data?.code === channelStatus.banned) {
              text = "toasts.add_platform.link.channelStatus.banned";
            } else if (error?.data?.code === channelStatus.moderationReject) {
              text = "toasts.add_platform.link.channelStatus.moderationReject";
            } else if (error?.data?.code === channelStatus.remoderation) {
              text = "toasts.add_platform.link.channelStatus.remoderation";
            } else if (error?.data?.code === channelStatus.invalidUrl) {
              text = "toasts.add_platform.link.channelStatus.invalidUrl";
            } else {
              text = "toasts.add_platform.link.alert";
            }
            toast({
              variant: "error",
              title: t(text),
            });
          } else {
            let text = "toasts.add_platform.link.error";
            toast({
              variant: "error",
              title: t(text),
            });
          }
        });
    } else if (identificationParams.link) {
      onChangeStep(2);
    }
  };

  const changePlatform = (platform: IChannelLink) => {
    const newPlatform = { ...identificationParams, platform: platform };
    setIdentificationParams(newPlatform);
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
                      className={`${styles.platform__btn} ${identificationParams.platform.type === platform.type ? styles.active : ""}`}
                      onClick={() => changePlatform(platform)}
                      disabled={identificationParams.checked || isEdit}
                    >
                      {t(platform.name)}
                    </MyButton>
                  ))}
                </div>
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
                            "add_platform.identification.link.required",
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
                        : t(identificationParams.platform.default_value)
                    }
                    className={`${styles.platform__input} ${errors["url"] && styles.form_error}`}
                    onChange={handleChangeLink}
                    value={text}
                    disabled={identificationParams.checked || isEdit}
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
