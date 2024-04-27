import { ArrowLongHorizontalIcon } from "@shared/assets";
import { MyButton } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface ManagerNewProjectStartProps {}

export const ManagerNewProjectStart: FC<ManagerNewProjectStartProps> = () => {
  const { t } = useTranslation();
  return (
    <MyButton className={styles.button}>
      <p>{t("orders_manager.card.start_btn")}</p>
      <ArrowLongHorizontalIcon className="default__icon__white" />
    </MyButton>
  );
};
