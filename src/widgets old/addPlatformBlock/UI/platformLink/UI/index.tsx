import { InfoIcon } from "@shared/assets";
import { platformTypes } from "@shared/config/postFilter";
import {
  useChannelVerifyMutation,
  useCreateCodeQuery,
} from "@shared/store/services/channelService";
import {
  IAddChannelIdentification,
  IAddPlatformBlur,
  IPlatformLink,
} from "@shared/types/platform";
import { MyButton } from "@shared/ui";
import { useToast } from "@shared/ui/shadcn-ui/ui/use-toast";
import { SpinnerLoaderSmall } from "@shared/ui/spinnerLoader";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface PlatformLinkProps {
  blur: IAddPlatformBlur;
  onChangeBlur: (newBlur: IAddPlatformBlur) => void;
  currentPlatform: IPlatformLink;
  setCurrentPlatform: (platform: IPlatformLink) => void;
  setInserCode: (code: string) => void;
  channel_id?: string;
}

export const PlatformLink: FC<PlatformLinkProps> = ({
  blur,
  onChangeBlur,
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

  const { data: code } = useCreateCodeQuery("", {
    skip: channel_id ? true : undefined,
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
          setInserCode(data.insertion_code);
          onChangeBlur({ link: true, parameters: false });
          // toast({
          //   variant: "success",
          //   title: t("toasts.add_platform.link.success"),
          // });
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

  const changePlatform = (platform: IPlatformLink) => {
    setCurrentPlatform(platform);
    reset();
  };

  const isValidURL = (url: string) => {
    // Регулярное выражение для проверки URL
    const pattern = /^(https?:\/\/)?[\w-]+(\.[\w-]+)+([/?#].*)?$/;
    return pattern.test(url);
  };

  return (
    <div className="container sidebar">
      <form onSubmit={handleSubmit(onSubmit)} className={styles.wrapper}>
        <div className={`${styles.top} ${blur.link && styles.complete}`}>
          <span>1</span>
          <p>{t("add_platform.identification")}</p>
        </div>

        {blur.link || (
          <>
            <div className={styles.form}>
              <div className={styles.form__row}>
                <div className={styles.form__text}>
                  <p>{t("add_platform.choose_platform")}</p>
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
                  <p>{t("add_platform.paste_link")}</p>
                  <InfoIcon />
                </div>
                <div className={styles.paste_link}>
                  <input
                    {...register("url", {
                      required: t("add_platform.link_requerd"),
                      validate: {
                        validURL: (value) =>
                          isValidURL(value) || t("add_platform.link_invalid"),
                      },
                    })}
                    placeholder={
                      errors["url"]
                        ? errors["url"].message
                        : t(currentPlatform.default_value)
                    }
                    className={`${styles.platform__input} ${errors["url"] && styles.form_error}`}
                  />
                  {isLoading ? (
                    <div>
                      <SpinnerLoaderSmall />
                    </div>
                  ) : (
                    <MyButton
                      type="submit"
                      className={`${styles.submit__btn} ${isSuccess && styles.submit__checked} ${error && styles.submit__error}`}
                    >
                      {!isSuccess &&
                        !error &&
                        !isLoading &&
                        t("add_platform_btn.check")}
                      {error && t("add_platform_btn.checked_error")}
                      {isSuccess && t("add_platform_btn.checked")}
                    </MyButton>
                  )}
                </div>
              </div>
            </div>
            <div className={`${styles.top} ${styles.blur}`}>
              <span>2</span>
              <p>{t("add_platform.channel_info")}</p>
            </div>
          </>
        )}
      </form>
    </div>
  );
};
