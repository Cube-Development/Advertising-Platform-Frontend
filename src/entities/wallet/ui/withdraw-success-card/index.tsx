import { FC } from "react";
import styles from "./styles.module.scss";
import { cn } from "@shared/ui";
import { useTranslation } from "react-i18next";
import { FileSmileBoldIcon } from "@shared/assets";

export const WithdrawSuccessCard: FC = ({}) => {
  const { t } = useTranslation();
  return (
    <div className={cn(styles.wrapper, "frame")}>
      <div className={styles.icon}>
        <FileSmileBoldIcon />
      </div>
      <p>{t("wallet.withdraw.success.title")}</p>
      <span>{t("wallet.withdraw.success.text")}</span>
    </div>
  );
};
