import { FC } from "react";
import styles from "./styles.module.scss";
import { MyButton } from "@shared/ui";
import { useTranslation } from "react-i18next";
import { ArrowLongHorizontalIcon } from "@shared/assets";

interface SendToBotProps {}

export const SendToBot: FC<SendToBotProps> = () => {
  const { t } = useTranslation();
  return (
    <MyButton className={styles.button}>
      <p>{t("orders_manager.subcard.send_btn")}</p>
      <ArrowLongHorizontalIcon className="icon__white" />
    </MyButton>
  );
};
