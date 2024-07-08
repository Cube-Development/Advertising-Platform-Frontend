import { ArrowLongHorizontalIcon } from "@shared/assets";
import { MyButton } from "@shared/ui";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

export const AcceptProject: FC = () => {
  const { t } = useTranslation();
  return (
    <MyButton buttons_type="button__blue" className={styles.button}>
      {t(`order_btn.accept`)}
      <ArrowLongHorizontalIcon className="default__icon__white" />
    </MyButton>
  );
};
