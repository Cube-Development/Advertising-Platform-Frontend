import { platformType } from "@shared/config/platformFilter";
import { MyButton, MyInput } from "@shared/ui";
import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface FormDataIden {
  platform: platformType;
  link: string;
}

export const PlatformIdentification: FC = () => {
  const [isVisible, setVisible] = useState(true);
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormDataIden>();

  const onSubmit: SubmitHandler<FormDataIden> = (data) => {
    console.log(data);
    setVisible(false);
  };

  return (
    <div className="container sidebar">
      <form onSubmit={handleSubmit(onSubmit)} className={styles.wrapper}>
        <div className={`${styles.top} ${isVisible || styles.complite}`}>
          <span>1</span>
          <p>{t("add_platform.identification")}</p>
        </div>

        {isVisible && (
          <>
            <div className={styles.form}>
              <div>
                <p>{t("add_platform.choose_platform")}</p>
                <div>
                  <MyButton
                    className={`${styles.platform__btn} ${getValues("platform") === platformType.telegram ? styles.platform__active : ""}`}
                    onClick={() => setValue("platform", platformType.telegram)}
                  >
                    {t("add_platform_btn.telegram")}
                  </MyButton>
                  <MyButton
                    className={`${styles.platform__btn} ${getValues("platform") === platformType.instagram ? styles.platform__active : ""}`}
                    onClick={() => setValue("platform", platformType.instagram)}
                  >
                    {t("add_platform_btn.instagram")}
                  </MyButton>
                  <MyButton
                    className={`${styles.platform__btn} ${getValues("platform") === platformType.youtube ? styles.platform__active : ""}`}
                    onClick={() => setValue("platform", platformType.youtube)}
                  >
                    {t("add_platform_btn.youtube")}
                  </MyButton>
                </div>
              </div>

              <div>
                <p>{t("add_platform.paste_link")}</p>
                <div>
                  <input
                    className={styles.platform__input}
                    {...register("link", { required: "Это поле обязательно" })}
                    placeholder="Https//t.me/channel_name..."
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
