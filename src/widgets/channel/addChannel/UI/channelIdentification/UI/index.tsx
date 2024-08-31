import {
  IAddChannelIdentification,
  IChannelLink,
  useChannelVerifyMutation,
  useCreateCodeQuery,
} from "@entities/channel";
import { platformTypes } from "@entities/platform";
import { ArrowLongHorizontalIcon, InfoIcon } from "@shared/assets";
import { MyButton, SpinnerLoaderSmall, useToast } from "@shared/ui";
import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface ChannelIdentificationProps {
  onChangeStep: (newStep: number) => void;
  currentPlatform: IChannelLink;
  setCurrentPlatform: (platform: IChannelLink) => void;
  setInserCode: (code: string) => void;
  channel_id?: string;
}

export const ChannelIdentification: FC<ChannelIdentificationProps> = ({
  onChangeStep,
  currentPlatform,
  setCurrentPlatform,
  setInserCode,
  channel_id,
}) => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAddChannelIdentification>();

  const [currentLink, setCurrentLink] = useState<string>("");
  const { data: code } = useCreateCodeQuery("", {
    skip: channel_id || currentLink ? true : undefined,
  });

  const [channelVerify, { isLoading, error, isSuccess }] =
    useChannelVerifyMutation();

  const onSubmit: SubmitHandler<IAddChannelIdentification> = (data) => {
    if (code) {
      const formData = {
        ...data,
        platform: currentPlatform.id,
        verification_code: code.verification_code,
      };
      channelVerify(formData)
        .unwrap()
        .then((data) => {
          setInserCode(formData.url);
          setCurrentLink(data.insertion_code);
          onChangeStep(2);
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
    }
  };

  const changePlatform = (platform: IChannelLink) => {
    setCurrentPlatform(platform);
    reset();
  };

  const isValidURL = (url: string) => {
    // Регулярное выражение для проверки URL
    const pattern = /^(https?:\/\/)?[\w-]+(\.[\w-]+)+([/?#].*)?$/;
    return pattern.test(url);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.wrapper}>
      <div className={styles.form}>
        <div className={styles.form__row}>
          <div className={styles.form__text}>
            <p>{t("add_platform.identification.info.title")}</p>
            <InfoIcon />
          </div>
          <div className={styles.choose_platform}>
            {platformTypes.map((platform, index) => (
              <MyButton
                key={index}
                type="button"
                className={`${styles.platform__btn} ${currentPlatform.type === platform.type ? styles.active : ""}`}
                onClick={() => changePlatform(platform)}
              >
                {t(platform.name)}
              </MyButton>
            ))}
          </div>
        </div>

        <div className={styles.form__row}>
          <div className={styles.form__text}>
            <p>{t("add_platform.identification.link.title")}</p>
            <InfoIcon />
          </div>
          <div className={styles.paste_link}>
            <input
              {...register("url", {
                required: t("add_platform.identification.link.requerd"),
                validate: {
                  validURL: (value) =>
                    isValidURL(value) ||
                    t("add_platform.identification.link.invalid"),
                },
              })}
              placeholder={
                errors["url"]
                  ? errors["url"].message
                  : t(currentPlatform.default_value)
              }
              className={`${styles.platform__input} ${errors["url"] && styles.form_error}`}
              // value={currentLink}
              disabled={!!currentLink}
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
  );
};
