import {
  IAddChannelData,
  IAddPlatformBlur,
  IChannelLink,
  PLATFORM_PARAMETERS,
  channelData,
  useCreateChannelMutation,
  useEditChannelMutation,
  useGetChannelAgesQuery,
  useGetChannelByIdQuery,
  useGetChannelCategoriesQuery,
  useGetChannelFormatsQuery,
  useGetChannelLanguagesQuery,
  useGetChannelRegionsQuery,
} from "@entities/channel";
import { IFormat } from "@entities/project";
import {
  CreateChannel,
  FormatPrice,
  SelectPrice,
  SelectSymbol,
} from "@features/channel";
import { SelectDescription, SelectOptions, SelectSex } from "@features/other";
import { ArrowLongHorizontalIcon } from "@shared/assets";
import { Languages } from "@shared/config/languages";
import { MyButton, ToastAction, useToast } from "@shared/ui";
import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface ChannelAcceptProps {
  onChangeStep: (newStep: number) => void;
}

export const ChannelAccept: FC<ChannelAcceptProps> = ({ onChangeStep }) => {
  const { t } = useTranslation();
  const handleBack = () => {
    onChangeStep(2);
  };
  return (
    <form action="" className={styles.wrapper}>
      <div className={styles.form}>
        <div className={styles.form__row}>
          <span>{t("add_platform.accept.platform.title").toUpperCase()}</span>
          <p>text</p>
        </div>
        <div className={styles.form__row}>
          <span>{t("add_platform.accept.link.title").toUpperCase()}</span>
          <p>text</p>
        </div>
        <div className={styles.form__row}>
          <span>{t("add_platform.accept.category.title").toUpperCase()}</span>
          <p>text</p>
        </div>
        <div className={styles.form__row}>
          <span>{t("add_platform.accept.region.title").toUpperCase()}</span>
          <p>text</p>
        </div>
        <div className={styles.form__row}>
          <span>{t("add_platform.accept.languages.title").toUpperCase()}</span>
          <p>text</p>
        </div>
        <div className={styles.form__row}>
          <span>{t("add_platform.accept.age.title").toUpperCase()}</span>
          <p>text</p>
        </div>
        <div className={styles.form__row}>
          <span>{t("add_platform.accept.sex.title").toUpperCase()}</span>
          <p>text</p>
        </div>
        <div className={styles.form__row}>
          <span>
            {t("add_platform.accept.description.title").toUpperCase()}
          </span>
          <p>text</p>
        </div>
        <div className={styles.form__row}>
          <span>{t("add_platform.accept.price.title").toUpperCase()}</span>
          <p>text</p>
        </div>
        <div className={styles.form__row}>
          <span>{t("add_platform.accept.symbol.title").toUpperCase()}</span>
          <p>text</p>
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
  );
};
