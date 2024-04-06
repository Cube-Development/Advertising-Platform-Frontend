import { MyButton } from "@shared/ui";
import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { InfoIcon } from "@shared/assets";
import { IAddPlatformBlur, IPlatformLink } from "@shared/types/platform";
import { platformFilter, platformTypes } from "@shared/config/postFilter";
import { platformData } from "@shared/config/platformData";

interface FormDataIden {
  platform: platformFilter;
  link: string;
}

interface PlatformLinkProps {
  blur: IAddPlatformBlur;
  onChangeBlur: (newBlur: IAddPlatformBlur) => void;
}

export const PlatformLink: FC<PlatformLinkProps> = ({ blur, onChangeBlur }) => {
  // const [isVisible, setVisible] = useState(true);
  const [currentPlatform, setPlatform] = useState<IPlatformLink>(
    platformTypes[0],
  );
  const { t } = useTranslation();
  const {
    reset,
    register,
    handleSubmit,
    unregister,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormDataIden>();

  const onSubmit: SubmitHandler<FormDataIden> = (data) => {
    console.log(data);
    onChangeBlur({ link: true, parameters: false });
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    console.log("registe link", newValue);
    register(platformData.link, { value: newValue });
    console.log(getValues());
  };

  const changePlatform = (platform: IPlatformLink) => {
    console.log("registe", platform.type);
    unregister(platformData.platform);
    register(platformData.platform, { value: platform.type });
    console.log(getValues());
    setPlatform(platform);
    reset();
  };

  return (
    <div className="container sidebar">
      <form onSubmit={handleSubmit(onSubmit)} className={styles.wrapper}>
        <div className={`${styles.top} ${blur.link && styles.complite}`}>
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
                    className={`${styles.platform__input}`}
                    onChange={handleInput}
                    placeholder={t(currentPlatform.default_value)}
                  />

                  <MyButton
                    type="submit"
                    className={`${styles.platform__btn} ${styles.check}`}
                  >
                    {t("add_platform_btn.check")}
                  </MyButton>
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
