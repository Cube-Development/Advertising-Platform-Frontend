import { FC } from "react";
import styles from "./styles.module.scss";
import { cn } from "@shared/ui";
import { useTranslation } from "react-i18next";

export const TopupSuccessCard: FC = ({}) => {
  const { t } = useTranslation();
  return (
    <div className={cn("frame", styles.wrapper)}>
      <p>{t("wallet.topup.success.title")}</p>
      <span>{t("wallet.topup.success.text")}</span>
    </div>
  );
};
