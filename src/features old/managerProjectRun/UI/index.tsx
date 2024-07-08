import { FC } from "react";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { MyButton } from "@shared/ui";
import { ArrowLongHorizontalIcon } from "@shared/assets";

interface ManagerProjectRunProps {}

export const ManagerProjectRun: FC<ManagerProjectRunProps> = () => {
  const { t } = useTranslation();
  return (
    <MyButton className={styles.button}>
      <p>{t("orders_manager.card.run_btn")}</p>
      <ArrowLongHorizontalIcon className="default__icon__white" />
    </MyButton>
  );
};
