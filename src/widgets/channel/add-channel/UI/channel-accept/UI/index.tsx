import { IAddChannelData, IAddChannelDataPreview } from "@entities/channel";
import { ArrowLongHorizontalIcon } from "@shared/assets";
import { PAGE_ANIMATION } from "@shared/config";
import { MyButton } from "@shared/ui";
import { motion } from "framer-motion";
import { FC } from "react";
import { SubmitHandler, UseFormHandleSubmit } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useChannelAccept } from "../../../model";
import styles from "./styles.module.scss";

interface ChannelAcceptProps {
  step: number;
  isEdit: boolean;
  variant: typeof PAGE_ANIMATION.animationLeft;
  channel_id: string;
  dataPreview: IAddChannelDataPreview;
  onChangeStep: (newStep: number) => void;
  handleSubmit: UseFormHandleSubmit<IAddChannelData, IAddChannelData>;
}

export const ChannelAccept: FC<ChannelAcceptProps> = ({
  step,
  isEdit,
  variant,
  channel_id,
  dataPreview,
  onChangeStep,
  handleSubmit,
}) => {
  const { t } = useTranslation();
  const handleBack = () => {
    onChangeStep(2);
  };

  const { channelAccept } = useChannelAccept({ channel_id, isEdit });

  const onSubmit: SubmitHandler<IAddChannelData> = (data) => {
    channelAccept(data);
    onChangeStep(4);
    // navigate(ENUM_PATHS.MY_CHANNELS);
  };

  return (
    <>
      {step === 3 && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={variant}
          className={styles.wrapper}
        >
          <p
            className={`gradient_color ${styles.title}`}
            dangerouslySetInnerHTML={{
              __html: t("add_platform.accept.title"),
            }}
          />
          <form
            action=""
            className={styles.form__wrapper}
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className={styles.form}>
              <div className={styles.form__row}>
                <span>
                  {t("add_platform.accept.platform.title").toUpperCase()}
                </span>
                <p>{t(dataPreview?.platform || "")}</p>
              </div>
              <div className={styles.form__row}>
                <span>{t("add_platform.accept.link.title").toUpperCase()}</span>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={dataPreview?.link}
                  className="truncate max-w-[100%]"
                >
                  {dataPreview?.link}
                </a>
              </div>
              <div className={styles.form__row}>
                <span>
                  {t("add_platform.accept.category.title").toUpperCase()}
                </span>
                <p>{dataPreview?.category?.[0]?.name}</p>
              </div>
              <div className={styles.form__row}>
                <span>
                  {t("add_platform.accept.region.title").toUpperCase()}
                </span>
                <p>
                  {dataPreview?.region
                    ?.map((region) => region?.name)
                    .join(", ")}
                </p>
              </div>
              <div className={styles.form__row}>
                <span>
                  {t("add_platform.accept.languages.title").toUpperCase()}
                </span>
                <p>
                  {dataPreview?.language
                    ?.map((language) => language?.name.split(" ")[1])
                    .join(", ")}
                </p>
              </div>
              <div className={styles.form__row}>
                <span>{t("add_platform.accept.age.title").toUpperCase()}</span>
                <p>{dataPreview?.age?.map((age) => age?.name).join(", ")}</p>
              </div>
              <div className={styles.form__row}>
                <span>{t("add_platform.accept.sex.title").toUpperCase()}</span>
                <p>
                  {dataPreview?.male} % / {dataPreview?.female} %
                </p>
              </div>
              <div className={styles.form__row}>
                <span>
                  {t("add_platform.accept.description.title").toUpperCase()}
                </span>
                <p>{dataPreview?.description}</p>
              </div>
              <div className={styles.form__row}>
                <span>
                  {t("add_platform.accept.price.title").toUpperCase()}
                </span>
                <div className={styles.price__wrapper}>
                  {dataPreview?.format?.map((format, index) => (
                    <div key={index} className={styles.price__row}>
                      <p className={styles.format}>{format?.big}</p>
                      <p className={styles.price}>
                        {format?.price.toLocaleString()} {t("symbol")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.form__row}>
                <span>
                  {t("add_platform.accept.symbol.title").toUpperCase()}
                </span>
                <p>{dataPreview?.text_limit}</p>
              </div>
            </div>
            <div className={styles.btns__wrapper}>
              <div className={styles.btns}>
                <MyButton
                  type="button"
                  buttons_type="button__white"
                  className={styles.prev}
                  onClick={() => handleBack()}
                >
                  <ArrowLongHorizontalIcon className="active__icon" />
                  <p>{t("add_platform_btn.back")}</p>
                </MyButton>
                <MyButton type="submit">
                  <p>{t("add_platform_btn.send")}</p>
                  <ArrowLongHorizontalIcon className="icon__white" />
                </MyButton>
              </div>
            </div>
          </form>
        </motion.div>
      )}
    </>
  );
};
