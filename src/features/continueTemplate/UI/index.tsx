import { ArrowLongHorizontalIcon } from "@shared/assets";
import { MyButton } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

export const ContinueTemplate: FC = () => {
  const { t } = useTranslation();
  return (
    <MyButton buttons_type="button__white" className={styles.button}>
      {t(`order_btn.continue`)}
      <ArrowLongHorizontalIcon className="active__icon" />
    </MyButton>
  );
};
