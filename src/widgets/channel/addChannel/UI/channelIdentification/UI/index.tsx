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
